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
    title: "volatile",
    slug: "volatile",
    description: "Detailed, human-oriented explanation of volatile. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "`volatile` establishes visibility and ordering guarantees for a field between threads, but it does not make compound operations such as `count++` atomic. A write to a volatile variable is visible to subsequent reads under the Java Memory Model’s happens-before rules."}, {"title": "Concrete Java example", "content": "class Worker {\n    private volatile boolean running = true;\n\n    void stop() { running = false; }\n    void run() {\n        while (running) {\n            // do work\n        }\n    }\n}"}, {"title": "How Java actually behaves", "content": "Volatile is useful for simple state flags and publication patterns where the required invariants fit its guarantees. `count++` is a read-modify-write sequence, so multiple threads can lose updates even when count is volatile. AtomicInteger or synchronization is needed when the update itself must be atomic."}, {"title": "Edge cases and interview traps", "content": "Do not describe volatile as a lightweight replacement for synchronized in all cases. It does not provide mutual exclusion and does not make a sequence of operations indivisible."}, {"title": "Production guidance", "content": "Use volatile when you need visibility/order for an independently readable state variable. Use locks or atomic classes when you need atomic compound state transitions."}, {"title": "Interview-ready explanation", "content": "A strong answer for volatile should define the concept, state the Java rule or API contract, walk through the example, and finish with the most important limitation or edge case. Avoid broad claims that are not guaranteed by the Java specification or API."}, {"title": "Practice questions", "content": "1. Define volatile precisely.\n2. What does Java or the JDK guarantee?\n3. Walk through the example.\n4. What is an important edge case?\n5. What is a common production misuse?"}],
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
