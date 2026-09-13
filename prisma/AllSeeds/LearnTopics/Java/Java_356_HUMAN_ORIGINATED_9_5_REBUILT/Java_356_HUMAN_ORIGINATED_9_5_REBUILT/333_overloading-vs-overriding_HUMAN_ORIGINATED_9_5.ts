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
    title: "Overloading vs overriding",
    slug: "overloading-vs-overriding",
    description: "Detailed, human-oriented explanation of Overloading vs overriding. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "Overloading vs overriding is a Java concept with a defined language, API, or runtime contract. Learn the exact construct involved, what Java guarantees, how the operation behaves for normal and boundary inputs, and which implementation details must not be mistaken for language guarantees."}, {"title": "A concrete Java example", "content": "class Account {\n    private final String id;\n    Account(String id) { this.id = id; }\n    String id() { return id; }\n}\n\nAccount account = new Account(\"A-100\");\nSystem.out.println(account.id());"}, {"title": "How the mechanism behaves", "content": "With Overloading vs overriding, separate compile-time rules from runtime behavior. Identify the inputs, outputs, state changes, exceptions, ordering, and lifecycle involved. If a detail depends on a particular JDK implementation, JVM, operating system, or configuration, state that explicitly."}, {"title": "Edge cases and common mistakes", "content": "The main interview trap for Overloading vs overriding is replacing the actual contract with a slogan. Explain the preconditions, observable result, failure mode, and one edge case. Do not claim that a feature is always faster, safer, immutable, thread-safe, or O(1) without conditions."}, {"title": "Using it in production", "content": "Use Overloading vs overriding when it makes the required behavior clear and correct. In production, review lifecycle, error handling, concurrency, performance, compatibility, and observability relevant to the concept."}, {"title": "Interview-ready explanation", "content": "A strong interview answer for Overloading vs overriding should start with the precise definition, identify the Java rule or API contract, explain the example, and then mention one edge case and one trade-off. If asked a follow-up, explain the condition under which the original statement changes."}, {"title": "Practice questions", "content": "1. Define Overloading vs overriding precisely.\n2. What Java rule or API contract controls it?\n3. Walk through the example.\n4. What is an important edge case?\n5. What is a common misconception?\n6. What would you verify before using it in production?"}],
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
