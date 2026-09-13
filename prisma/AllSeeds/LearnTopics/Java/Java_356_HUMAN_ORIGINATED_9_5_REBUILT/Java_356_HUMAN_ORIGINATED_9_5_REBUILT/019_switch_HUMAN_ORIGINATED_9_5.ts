import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

async function seed() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: "java" },
    update: { name: "Java", description: "Human-oriented Java curriculum with topic-specific explanations, concrete examples, edge cases, production guidance, and interview preparation.", icon: "JAVA", isPublished: true, sortOrder: 0 },
    create: { name: "Java", slug: "java", description: "Human-oriented Java curriculum with topic-specific explanations, concrete examples, edge cases, production guidance, and interview preparation.", icon: "JAVA", isPublished: true, sortOrder: 0 },
  });

  const path = await prisma.studyPath.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "beginner" } },
    update: { name: "Beginner", description: "Java learning path.", level: StudyLevel.BEGINNER, isPublished: true, sortOrder: 0 },
    create: { categoryId: category.id, name: "Beginner", slug: "beginner", description: "Java learning path.", level: StudyLevel.BEGINNER, isPublished: true, sortOrder: 0 },
  });

  const module = await prisma.studyModule.upsert({
    where: { studyPathId_slug: { studyPathId: path.id, slug: "java-fundamentals" } },
    update: { title: "Java Fundamentals", description: "Topic-specific Java study.", isPublished: true, sortOrder: 0 },
    create: { studyPathId: path.id, title: "Java Fundamentals", slug: "java-fundamentals", description: "Topic-specific Java study.", isPublished: true, sortOrder: 0 },
  });

  const topic: TopicSeed = {
    title: "switch",
    slug: "switch",
    description: "Detailed, human-oriented explanation of switch. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "switch controls the execution path of Java code. The important rule is which condition is evaluated, when the body executes, and how control transfers when the statement completes, breaks, or continues."}, {"title": "A concrete Java example", "content": "int i = 0;\nwhile (i < 3) {\n    System.out.println(i);\n    i++;\n}"}, {"title": "How the mechanism behaves", "content": "Control-flow statements evaluate boolean conditions and execute blocks according to the specified order. Boundary conditions such as zero iterations, fall-through, nested loops, and unreachable branches are more important than memorizing syntax."}, {"title": "Edge cases and common mistakes", "content": "Watch for off-by-one errors, accidental infinite loops, switch fall-through, and confusing break with continue. In modern switch, arrow labels and expression forms have different completion behavior from traditional colon labels."}, {"title": "Using it in production", "content": "Prefer simple control flow that makes invariants visible. Extract complicated conditions into named methods and avoid deeply nested branches when a clearer design is available."}, {"title": "Interview-ready explanation", "content": "A strong interview answer for switch should start with the precise definition, identify the Java rule or API contract, explain the example, and then mention one edge case and one trade-off. If asked a follow-up, explain the condition under which the original statement changes."}, {"title": "Practice questions", "content": "1. What is the execution order of switch?\n2. What happens for an empty/boundary input?\n3. Show a common bug.\n4. How would you make the control flow clearer?"}],
  };

  const savedTopic = await prisma.studyTopic.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: topic.slug } },
    update: { title: topic.title, moduleId: module.id, seoDescription: topic.description, estimatedMinutes: topic.estimatedMinutes, isPublished: true, sortOrder: 0 },
    create: { categoryId: category.id, moduleId: module.id, title: topic.title, slug: topic.slug, seoDescription: topic.description, estimatedMinutes: topic.estimatedMinutes, isPublished: true, sortOrder: 0, prerequisiteIds: [], relatedTopicIds: [] },
  });

  for (let index = 0; index < topic.sections.length; index += 1) {
    const section = topic.sections[index];
    await prisma.studyTopicSection.upsert({
      where: { id: `${savedTopic.id}-section-${index}` },
      update: { title: section.title, content: section.content, sortOrder: index },
      create: { id: `${savedTopic.id}-section-${index}`, topicId: savedTopic.id, title: section.title, content: section.content, sortOrder: index },
    });
  }

  console.log(`Seeded: ${topic.title}`);
}

seed()
  .catch((error) => {
    console.error("Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
