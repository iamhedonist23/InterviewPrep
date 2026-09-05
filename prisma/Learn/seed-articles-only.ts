import { PrismaClient } from "@prisma/client";
import { articleSeeds } from "../article-seed";

const prisma = new PrismaClient();
const technologyTerms = ["java", "python", "javascript", "typescript", "react", "angular", "vue", "nodejs", "spring-boot", "kotlin", "android", "ios", "swift", "docker", "kubernetes", "aws", "azure", "gcp", "devops", "cicd", "microservices", "system-design", "data-structures", "algorithms", "sql", "nosql", "mongodb", "postgresql", "graphql", "rest-api", "security", "artificial-intelligence", "machine-learning", "data-science", "blockchain", "git", "linux", "networking", "cloud-native", "serverless", "testing", "qa"];

async function run() {
  const softwareDeveloper = await prisma.category.upsert({
    where: { slug: "software-developer" },
    update: {},
    create: { name: "Software Developer", slug: "software-developer", group: "Technology", description: "Focused Software Developer interview preparation." },
    select: { id: true },
  });
  const fresher = await prisma.category.upsert({
    where: { slug: "fresher" },
    update: {},
    create: { name: "Fresher", slug: "fresher", group: "General", description: "Focused Fresher interview preparation." },
    select: { id: true },
  });
  let updated = 0;
  let created = 0;
  for (const article of articleSeeds) {
    const categoryId = technologyTerms.some((term) => article.slug.includes(term)) ? softwareDeveloper.id : fresher.id;
    const existing = await prisma.article.findUnique({ where: { slug: article.slug }, select: { id: true } });
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { ...article, categoryId, isPublished: true, publishedAt: new Date() },
      create: { ...article, categoryId, isPublished: true, publishedAt: new Date() },
    });
    if (existing) updated++;
    else created++;
  }
  console.log(`Article seed complete: ${created} created, ${updated} updated, ${articleSeeds.length} processed.`);
}
run().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
