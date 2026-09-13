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
    title: "ConcurrentHashMap internals",
    slug: "concurrenthashmap-internals",
    description: "Detailed, human-oriented explanation of ConcurrentHashMap internals. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "ConcurrentHashMap is a concurrent hash table whose implementation is designed so multiple threads can operate on different portions of the map concurrently. Modern JDK implementations use techniques such as CAS and synchronized blocks around contended bins; the exact internal layout is an implementation detail rather than part of the public contract."}, {"title": "Concrete Java example", "content": "ConcurrentHashMap<String, Integer> counts = new ConcurrentHashMap<>();\ncounts.compute(\"java\", (k, v) -> v == null ? 1 : v + 1);\ncounts.compute(\"java\", (k, v) -> v == null ? 1 : v + 1);\nSystem.out.println(counts.get(\"java\")); // 2"}, {"title": "How Java actually behaves", "content": "A hash spreads keys across bins. Reads can proceed without taking a global map lock, while updates coordinate only the relevant internal state. Operations such as compute and merge are designed for atomic per-key updates. The map does not permit null keys or values because null cannot represent an unambiguous concurrent result."}, {"title": "Edge cases and interview traps", "content": "Do not describe the current implementation as a fixed number of segments or as simple lock striping. Those explanations belong to older implementations. Also do not infer that every multi-key operation is atomic just because individual map operations are thread-safe."}, {"title": "Production guidance", "content": "Use the atomic map methods when a read-modify-write operation must be coordinated. If your invariant spans several keys or several data structures, you need a broader synchronization/design strategy."}, {"title": "Interview-ready explanation", "content": "A strong answer for ConcurrentHashMap internals should define the concept, state the Java rule or API contract, walk through the example, and finish with the most important limitation or edge case. Avoid broad claims that are not guaranteed by the Java specification or API."}, {"title": "Practice questions", "content": "1. Define ConcurrentHashMap internals precisely.\n2. What does Java or the JDK guarantee?\n3. Walk through the example.\n4. What is an important edge case?\n5. What is a common production misuse?"}],
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
