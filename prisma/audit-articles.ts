import { PrismaClient } from "@prisma/client";
import { articleSeeds } from "../generated-article-seed";
import * as fs from "node:fs";
import * as path from "node:path";

const prisma = new PrismaClient();
const backupPath = path.join(process.cwd(), "prisma", "article-cleanup-backup.json");
const reportPath = path.join(process.cwd(), "prisma", "article-cleanup-report.json");

async function run() {
  const databaseArticles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      categoryId: true,
      author: true,
      featuredImage: true,
      seoTitle: true,
      seoDescription: true,
      isPublished: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { slug: "asc" },
  });
  const seedSlugs = new Set(articleSeeds.map((article) => article.slug));
  const databaseSlugs = new Set(databaseArticles.map((article) => article.slug));
  const removalCandidates = databaseArticles.filter((article) => !seedSlugs.has(article.slug));
  const newArticles = articleSeeds.filter((article) => !databaseSlugs.has(article.slug));
  const existingSeedArticles = articleSeeds.filter((article) => databaseSlugs.has(article.slug));
  const report = {
    generatedAt: new Date().toISOString(),
    seedArticles: articleSeeds.length,
    databaseArticles: databaseArticles.length,
    existingSeedArticles: existingSeedArticles.length,
    newArticles: newArticles.length,
    removalCandidates: removalCandidates.length,
    removalCandidateSlugs: removalCandidates.map((article) => article.slug),
  };
  fs.writeFileSync(backupPath, JSON.stringify(removalCandidates, null, 2), "utf8");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`Seed articles: ${report.seedArticles}`);
  console.log(`Database articles: ${report.databaseArticles}`);
  console.log(`Existing seed articles to update: ${report.existingSeedArticles}`);
  console.log(`New articles to insert: ${report.newArticles}`);
  console.log(`Database articles absent from new seed: ${report.removalCandidates}`);
  console.log(`Backup: ${backupPath}`);
  console.log(`Report: ${reportPath}`);
  if (removalCandidates.length) {
    console.log("Removal candidates:");
    for (const article of removalCandidates) console.log(`- ${article.slug} | ${article.title}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
