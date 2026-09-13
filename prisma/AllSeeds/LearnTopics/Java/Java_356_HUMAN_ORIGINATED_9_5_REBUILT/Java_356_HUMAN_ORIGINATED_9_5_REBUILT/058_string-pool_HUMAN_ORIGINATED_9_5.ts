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
    title: "String pool",
    slug: "string-pool",
    description: "Detailed, human-oriented explanation of String pool. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "The string intern pool is a JVM-managed mechanism that allows identical interned string values to share a canonical String instance. String literals are interned, so identical literals in the same program can refer to the same pooled String."}, {"title": "Concrete Java example", "content": "String a = \"Java\";\nString b = \"Java\";\nString c = new String(\"Java\");\nSystem.out.println(a == b); // true\nSystem.out.println(a == c); // false\nSystem.out.println(a.equals(c)); // true"}, {"title": "How Java actually behaves", "content": "`==` compares reference identity, not string contents. `intern()` can return the canonical pooled representation, but pooling every dynamically generated string indiscriminately can increase memory pressure and is usually unnecessary. The physical storage details of the pool are implementation-specific; the language/API guarantee is about interned identity behavior."}, {"title": "Edge cases and interview traps", "content": "Do not use `==` for ordinary String value comparison. Do not describe the pool as simply \"a special heap area\" without qualification; modern JVM implementation details are not the language contract."}, {"title": "Production guidance", "content": "Use literals and ordinary String values normally. Use intern only when there is a measured reason and a clear understanding of the workload."}, {"title": "Interview-ready explanation", "content": "A strong answer for String pool should define the concept, state the Java rule or API contract, walk through the example, and finish with the most important limitation or edge case. Avoid broad claims that are not guaranteed by the Java specification or API."}, {"title": "Practice questions", "content": "1. Define String pool precisely.\n2. What does Java or the JDK guarantee?\n3. Walk through the example.\n4. What is an important edge case?\n5. What is a common production misuse?"}],
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
