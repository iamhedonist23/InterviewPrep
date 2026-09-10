/**
 * prisma/cleanup-old-questions.ts
 *
 * Deletes the old angle-suffixed InterviewQuestion rows that are no longer
 * produced by the updated seed.ts (which now creates one row per real
 * question instead of one row per question x situational-angle).
 *
 * SAFE BY DEFAULT:
 *   - Runs as a DRY RUN unless you pass --confirm
 *   - Writes a full JSON backup of every row it's about to touch, before
 *     touching anything
 *   - Writes a redirect map (old slug -> new slug) so you can 301 redirect
 *     old URLs instead of letting them 404
 *
 * USAGE
 *   1. Make sure you have already run the updated seed at least once:
 *        npx prisma db seed
 *   2. Dry run first (default - makes no changes):
 *        npx tsx prisma/cleanup-old-questions.ts
 *   3. Review the printed summary and the generated files:
 *        prisma/cleanup-backup.json      <- full backup of rows to be deleted
 *        prisma/redirect-map.json        <- { "old-slug": "new-slug" } pairs
 *   4. When you're confident, actually delete:
 *        npx tsx prisma/cleanup-old-questions.ts --confirm
 */

import { PrismaClient } from "@prisma/client";
import { topics, slugify } from "./question-data";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const isConfirmed = process.argv.includes("--confirm");

  // The exact set of slugs the CURRENT seed.ts will create/keep.
  // Anything in the database NOT in this set is a leftover from the old
  // angle-multiplied seed and is safe to remove.
  const keepSlugs = new Set(topics.map(([, baseQuestion]) => slugify(baseQuestion)));

  console.log(`Canonical (keep) slugs from current seed: ${keepSlugs.size}`);

  const allQuestions = await prisma.interviewQuestion.findMany({
    select: { id: true, slug: true, question: true, categoryId: true, isPublished: true },
  });

  console.log(`Total InterviewQuestion rows in database: ${allQuestions.length}`);

  const toDelete = allQuestions.filter(q => !keepSlugs.has(q.slug));
  const toKeep = allQuestions.filter(q => keepSlugs.has(q.slug));

  console.log(`Rows matching current seed (will be kept):   ${toKeep.length}`);
  console.log(`Rows NOT in current seed (candidates for deletion): ${toDelete.length}`);

  if (toDelete.length === 0) {
    console.log("Nothing to clean up. Exiting.");
    return;
  }

  // ---- 1. Back up everything we're about to delete, in full ----
  const backupPath = path.join(__dirname, "cleanup-backup.json");
  fs.writeFileSync(backupPath, JSON.stringify(toDelete, null, 2), "utf-8");
  console.log(`Backup of ${toDelete.length} rows written to: ${backupPath}`);

  // ---- 2. Build a best-effort redirect map: old slug -> new canonical slug ----
  // Old slugs look like: "<base-question-slug>-<angle-slug>"
  // We match each old slug to the canonical slug it *starts with*, so a
  // visitor hitting the old URL lands on the consolidated page that has
  // the real content, instead of a 404.
  const canonicalSlugList = Array.from(keepSlugs).sort((a, b) => b.length - a.length);
  const redirectMap: Record<string, string> = {};
  let unmatched = 0;

  for (const row of toDelete) {
    const match = canonicalSlugList.find(canonical => row.slug.startsWith(canonical + "-") || row.slug === canonical);
    if (match) {
      redirectMap[row.slug] = match;
    } else {
      unmatched++;
    }
  }

  const redirectPath = path.join(__dirname, "redirect-map.json");
  fs.writeFileSync(redirectPath, JSON.stringify(redirectMap, null, 2), "utf-8");
  console.log(`Redirect map (${Object.keys(redirectMap).length} entries) written to: ${redirectPath}`);
  if (unmatched > 0) {
    console.log(`Warning: ${unmatched} old slugs could not be matched to a canonical slug and were not added to the redirect map. Review these manually in the backup file.`);
  }

  // ---- 3. Dry run vs actual delete ----
  if (!isConfirmed) {
    console.log("\nDRY RUN - no rows were deleted.");
    console.log("Review cleanup-backup.json and redirect-map.json, then re-run with --confirm to actually delete.");
    return;
  }

  console.log(`\n--confirm passed. Deleting ${toDelete.length} rows...`);
  const idsToDelete = toDelete.map(q => q.id);

  // Delete in batches to avoid overly large single queries.
  const BATCH_SIZE = 500;
  let deletedCount = 0;
  for (let i = 0; i < idsToDelete.length; i += BATCH_SIZE) {
    const batch = idsToDelete.slice(i, i + BATCH_SIZE);
    const result = await prisma.interviewQuestion.deleteMany({ where: { id: { in: batch } } });
    deletedCount += result.count;
    console.log(`  Deleted ${deletedCount} / ${idsToDelete.length}`);
  }

  console.log(`\nDone. Deleted ${deletedCount} rows.`);
  console.log("Next steps:");
  console.log("  1. Add the entries from redirect-map.json to your redirect config (next.config.js redirects() or middleware).");
  console.log("  2. Re-deploy so the sitemap only lists the current, canonical question slugs.");
  console.log("  3. Submit the updated sitemap in Google Search Console.");
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
