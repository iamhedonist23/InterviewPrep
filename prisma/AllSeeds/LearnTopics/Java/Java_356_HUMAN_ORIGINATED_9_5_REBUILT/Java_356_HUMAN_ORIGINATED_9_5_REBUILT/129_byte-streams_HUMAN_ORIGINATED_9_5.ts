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
    title: "Byte streams",
    slug: "byte-streams",
    description: "Detailed, human-oriented explanation of Byte streams. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "Byte streams is part of Java’s functional-programming facilities. The key is the type contract and when computation occurs, not the visual compactness of the lambda. Streams are lazy until a terminal operation, while functional interfaces describe a single abstract method target for lambdas and method references."}, {"title": "A concrete Java example", "content": "List<String> names = List.of(\"Asha\", \"Ravi\", \"Maya\");\nlong count = names.stream()\n        .filter(name -> name.length() > 4)\n        .count();\nSystem.out.println(count); // 2"}, {"title": "How the mechanism behaves", "content": "With Byte streams, distinguish declaration from execution. For streams, intermediate operations build a pipeline and terminal operations trigger traversal. For functional interfaces, parameter and return types determine whether a lambda is compatible. Side effects can make reasoning, parallel execution, and testing harder."}, {"title": "Edge cases and common mistakes", "content": "Do not assume streams are eager, parallel streams are automatically faster, or every lambda can throw checked exceptions without adaptation. For functional interfaces, remember that a default method does not count as the single abstract method."}, {"title": "Using it in production", "content": "Prefer pipelines and lambdas when they improve clarity. Avoid shared mutable state inside stream operations, and benchmark before replacing a straightforward loop with a more complicated parallel pipeline."}, {"title": "Interview-ready explanation", "content": "A strong interview answer for Byte streams should start with the precise definition, identify the Java rule or API contract, explain the example, and then mention one edge case and one trade-off. If asked a follow-up, explain the condition under which the original statement changes."}, {"title": "Practice questions", "content": "1. What is the contract of Byte streams?\n2. When does it execute?\n3. Show a minimal example.\n4. What is one edge case?\n5. What makes it unsafe or misleading in production?"}],
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
