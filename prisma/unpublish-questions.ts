/**
 * prisma/unpublish-questions.ts
 *
 * Hides InterviewQuestion rows from the public "Interview Questions" pages
 * by setting isPublished = false, WITHOUT deleting the rows. This preserves
 * everything that references a question via a required foreign key:
 *   - InterviewAnswer   (user's saved answers)
 *   - PracticeResponse  (practice session history)
 *   - SavedQuestion     (bookmarks)
 *   - StudyTopicQuestionRelation
 *
 * Use this instead of deleting whenever you just want questions to stop
 * SHOWING UP, not to permanently remove them and their history.
 *
 * USAGE
 *   Dry run (just shows what would be affected):
 *     npx tsx prisma/unpublish-questions.ts --slugs slug-one,slug-two
 *     npx tsx prisma/unpublish-questions.ts --category "Presales"
 *     npx tsx prisma/unpublish-questions.ts --all
 *
 *   Actually apply:
 *     npx tsx prisma/unpublish-questions.ts --all --confirm
 *     npx tsx prisma/unpublish-questions.ts --category "Presales" --confirm
 *     npx tsx prisma/unpublish-questions.ts --slugs slug-one,slug-two --confirm
 *
 * To re-publish later, use --republish alongside the same filters.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function parseArgs() {
  const args = process.argv.slice(2);
  const isConfirmed = args.includes("--confirm");
  const republish = args.includes("--republish");
  const all = args.includes("--all");

  const categoryFlagIndex = args.indexOf("--category");
  const category = categoryFlagIndex >= 0 ? args[categoryFlagIndex + 1] : null;

  const slugsFlagIndex = args.indexOf("--slugs");
  const slugs = slugsFlagIndex >= 0 ? args[slugsFlagIndex + 1].split(",").map(s => s.trim()) : null;

  return { isConfirmed, republish, all, category, slugs };
}

async function main() {
  const { isConfirmed, republish, all, category, slugs } = parseArgs();

  if (!all && !category && !slugs) {
    console.log("Specify one of: --all, --category \"Name\", or --slugs slug-a,slug-b");
    process.exit(1);
  }

  const where: Record<string, unknown> = {};
  if (category) {
    const cat = await prisma.category.findUnique({ where: { name: category } });
    if (!cat) {
      console.log(`No category found named "${category}". Check the exact name (case-sensitive).`);
      process.exit(1);
    }
    where.categoryId = cat.id;
  }
  if (slugs) {
    where.slug = { in: slugs };
  }

  const targetPublishState = republish ? true : false;
  where.isPublished = !targetPublishState; // only touch rows that will actually change

  const matches = await prisma.interviewQuestion.findMany({
    where,
    select: { id: true, slug: true, question: true },
  });

  console.log(`${republish ? "Rows to RE-PUBLISH" : "Rows to UNPUBLISH"}: ${matches.length}`);
  matches.slice(0, 10).forEach(m => console.log(`  - ${m.slug}`));
  if (matches.length > 10) console.log(`  ...and ${matches.length - 10} more`);

  if (matches.length === 0) {
    console.log("Nothing to change.");
    return;
  }

  if (!isConfirmed) {
    console.log("\nDRY RUN - no rows were changed. Re-run with --confirm to apply.");
    return;
  }

  const result = await prisma.interviewQuestion.updateMany({
    where: { id: { in: matches.map(m => m.id) } },
    data: { isPublished: targetPublishState },
  });

  console.log(`\nUpdated ${result.count} rows. isPublished = ${targetPublishState}`);
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
