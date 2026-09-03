import { PrismaClient } from "@prisma/client";
import { articleSeeds } from "../generated-article-seed";
import * as fs from "node:fs";
import * as path from "node:path";

const prisma = new PrismaClient();
const backupPath = path.join(process.cwd(), "prisma", "article-cleanup-backup.json");

async function run() {
  const confirmed = process.argv.includes("--confirm");
  const seedSlugs = new Set(articleSeeds.map((article) => article.slug));
  const articles = await prisma.article.findMany({ orderBy: { slug: "asc" } });
  const removalCandidates = articles.filter((article) => !seedSlugs.has(article.slug));

  console.log(`Seed articles: ${articleSeeds.length}`);
  console.log(`Database articles: ${articles.length}`);
  console.log(`Removal candidates: ${removalCandidates.length}`);

  if (!removalCandidates.length) {
    console.log("Nothing to clean up.");
    return;
  }

  fs.writeFileSync(backupPath, JSON.stringify(removalCandidates, null, 2), "utf8");
  console.log(`Backup written to: ${backupPath}`);

  if (!confirmed) {
    console.log("DRY RUN - no articles were deleted.");
    console.log("Re-run with --confirm to delete only these candidates.");
    return;
  }

  const result = await prisma.article.deleteMany({
    where: { id: { in: removalCandidates.map((article) => article.id) } },
  });
  console.log(`Deleted ${result.count} articles.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
