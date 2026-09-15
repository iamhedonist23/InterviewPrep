import { PrismaClient } from "@prisma/client";

const HR_CATEGORY_SLUG = "behavioral-and-hr";

async function main() {
  const prisma = new PrismaClient();

  try {
    const category = await prisma.category.findUnique({
      where: { slug: HR_CATEGORY_SLUG },
      select: { id: true, name: true },
    });

    if (!category) {
      throw new Error(`Category not found: ${HR_CATEGORY_SLUG}`);
    }

    const questionCount = await prisma.interviewQuestion.count({
      where: { categoryId: category.id },
    });

    console.log(
      `Deleting ${questionCount} questions from ${category.name} (${HR_CATEGORY_SLUG}).`,
    );

    const result = await prisma.$transaction(async (transaction) => {
      return transaction.interviewQuestion.deleteMany({
        where: { categoryId: category.id },
      });
    });

    console.log(`Deleted ${result.count} HR interview questions.`);
    console.log("The HR category and subcategories were left unchanged.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Failed to delete HR interview questions:", error);
  process.exitCode = 1;
});