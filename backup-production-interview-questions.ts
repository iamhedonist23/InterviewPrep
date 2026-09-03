import { writeFile } from "node:fs/promises";
import { prisma } from "@/lib/prisma";

async function main() {
  const questions = await prisma.interviewQuestion.findMany({
    include: { category: true, subcategory: true },
    orderBy: { createdAt: "asc" },
  });
  await writeFile(
    "production-interview-questions-backup.json",
    JSON.stringify(questions, null, 2),
    "utf8",
  );
  console.log(`Backed up ${questions.length} production interview questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
