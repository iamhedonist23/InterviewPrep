import { PrismaClient } from "@prisma/client";

async function clearLearnData(prisma: PrismaClient) {
  // Delete learn-related records in child-to-parent order.
  await prisma.studyTopicQuestionRelation.deleteMany({});
  await prisma.studyProgress.deleteMany({});
  await prisma.savedStudyTopic.deleteMany({});
  await prisma.studyTopicSection.deleteMany({});
  await prisma.studyExample.deleteMany({});
  await prisma.studyExercise.deleteMany({});
  await prisma.studyTopic.deleteMany({});
  await prisma.studyModule.deleteMany({});
  await prisma.studyPath.deleteMany({});
  await prisma.studyCategory.deleteMany({});

  console.log("Learn section data removed successfully.");
}

async function main() {
  const prisma = new PrismaClient();

  try {
    await clearLearnData(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("Failed to clear learn section data:", error);
    process.exit(1);
  });
}
