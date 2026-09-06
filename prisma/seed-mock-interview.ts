import {
  Difficulty,
  ExperienceLevel,
  InterviewType,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

const starterQuestions = [
  {
    title: "What are the most important skills for this role?",
    tag: "fundamentals",
    explanation: "Explain the core skills for the category and connect them to practical work.",
    sampleAnswer: "I would start by identifying the skills most closely connected to the role's goals. I would then give a practical example of how I have used those skills and explain how I keep improving them.",
  },
  {
    title: "How would you approach a new problem in this field?",
    tag: "problem-solving",
    explanation: "Describe a structured process for understanding, solving, and validating a new problem.",
    sampleAnswer: "I would clarify the goal, gather the relevant facts, break the problem into smaller parts, and compare possible approaches. I would choose the simplest reliable solution, validate the result, and document what I learned.",
  },
  {
    title: "How do you measure success in this role?",
    tag: "measurement",
    explanation: "Connect success measures to outcomes, quality, and stakeholder expectations.",
    sampleAnswer: "I would agree on the expected outcome first, then choose a small set of useful measures for quality, speed, and business impact. I would review them regularly and adjust the approach when the evidence shows a better path.",
  },
  {
    title: "Tell me about a challenge you faced in this area.",
    tag: "behavioral",
    explanation: "Use a specific situation, explain your actions, and finish with the result and lesson.",
    sampleAnswer: "I would describe the situation and the result that was needed, explain the actions I took and why, then share the outcome. I would close with the lesson and what I would do differently next time.",
  },
  {
    title: "How do you keep your knowledge current in this field?",
    tag: "learning",
    explanation: "Show a consistent learning habit and explain how you apply new knowledge.",
    sampleAnswer: "I combine documentation, reliable industry sources, hands-on practice, and conversations with experienced colleagues. I retain new knowledge by applying it to a small project and checking the result against the original goal.",
  },
];

async function main() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { name: "asc" },
  });

  let created = 0;
  let skipped = 0;

  for (const category of categories) {
    if (category._count.questions > 0) {
      skipped += 1;
      continue;
    }

    const subcategory = await prisma.subcategory.upsert({
      where: {
        categoryId_slug: { categoryId: category.id, slug: "general" },
      },
      update: {},
      create: {
        name: "General",
        slug: "general",
        categoryId: category.id,
      },
    });

    for (let index = 0; index < starterQuestions.length; index += 1) {
      const starter = starterQuestions[index];
      const slug = `${category.slug}-mock-${starter.tag}`;
      const question = starter.title.replace("this role", `${category.name} roles`).replace("this field", category.name);

      await prisma.interviewQuestion.upsert({
        where: { slug },
        update: { isPublished: true },
        create: {
          question,
          slug,
          categoryId: category.id,
          subcategoryId: subcategory.id,
          experienceLevel: ExperienceLevel.FRESHER,
          difficulty: index < 2 ? Difficulty.EASY : index < 4 ? Difficulty.MEDIUM : Difficulty.HARD,
          interviewType: index === 3 ? InterviewType.BEHAVIORAL : InterviewType.TECHNICAL,
          shortDescription: `A basic ${category.name} interview question.`,
          explanation: starter.explanation,
          sampleAnswer: starter.sampleAnswer,
          detailedAnswer: starter.sampleAnswer,
          keyPoints: ["Clarify the goal", "Give a specific example", "Explain your reasoning", "Share the result"],
          commonMistakes: ["Giving only a definition", "Skipping the example", "Not explaining the outcome"],
          followUpQuestions: ["What trade-offs would you consider?", "How would you measure the result?"],
          tags: [category.slug, starter.tag],
          isPublished: true,
          seoTitle: question,
          seoDescription: `Practice answering this basic ${category.name} interview question.`,
        },
      });
      created += 1;
    }
  }

  console.log(`Created or enabled ${created} starter questions; skipped ${skipped} categories that already have questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
