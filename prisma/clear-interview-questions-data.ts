import { PrismaClient } from "@prisma/client";

async function clearInterviewQuestionData(prisma: PrismaClient) {
  // Delete interview-question related records in dependency order.
  await prisma.practiceResponse.deleteMany({});
  await prisma.savedQuestion.deleteMany({});
  await prisma.interviewAnswer.deleteMany({});
  await prisma.studyTopicQuestionRelation.deleteMany({});
  await prisma.interviewQuestion.deleteMany({});
  await prisma.subcategory.deleteMany({});
  await prisma.aiQuestionDraft.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Interview question data removed successfully.");
}

async function main() {
  const prisma = new PrismaClient();

  try {
    await clearInterviewQuestionData(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Failed to clear interview question data:", error);
    process.exit(1);
  });
}
