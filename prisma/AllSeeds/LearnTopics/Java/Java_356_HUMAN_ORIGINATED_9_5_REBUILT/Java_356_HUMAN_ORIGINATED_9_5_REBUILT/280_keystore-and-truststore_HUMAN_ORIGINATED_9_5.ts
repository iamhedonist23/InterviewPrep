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
    title: "KeyStore and TrustStore",
    slug: "keystore-and-truststore",
    description: "Detailed, human-oriented explanation of KeyStore and TrustStore. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "KeyStore and TrustStore is a Java security concept/API where correctness includes both the Java API contract and the security properties of the surrounding protocol or storage design. The safe explanation must distinguish confidentiality, integrity, authenticity, randomness, key management, and trust."}, {"title": "A concrete Java example", "content": "MessageDigest digest = MessageDigest.getInstance(\"SHA-256\");\nbyte[] hash = digest.digest(\"hello\".getBytes(StandardCharsets.UTF_8));"}, {"title": "How the mechanism behaves", "content": "For KeyStore and TrustStore, identify the security primitive or trust decision involved and explain what it does not provide. A hash is not encryption; a digital signature is not confidentiality; a truststore is not a password store; and a secure random generator is not interchangeable with a general-purpose PRNG."}, {"title": "Edge cases and common mistakes", "content": "Avoid inventing algorithms, modes, key sizes, or protocol defaults as universal best practice. Never store plaintext passwords, never build SQL with untrusted string concatenation, and never deserialize untrusted Java object streams without a deliberate security design."}, {"title": "Using it in production", "content": "Use standard JDK APIs with current provider support, explicit algorithms where appropriate, secure key storage, certificate validation, secret rotation, and dependency/runtime updates. Security claims should be reviewed against current platform guidance."}, {"title": "Interview-ready explanation", "content": "A strong interview answer for KeyStore and TrustStore should start with the precise definition, identify the Java rule or API contract, explain the example, and then mention one edge case and one trade-off. If asked a follow-up, explain the condition under which the original statement changes."}, {"title": "Practice questions", "content": "1. What security property does KeyStore and TrustStore provide?\n2. What does it not provide?\n3. What is the main misuse?\n4. How would you deploy it safely?"}],
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
