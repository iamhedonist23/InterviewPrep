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
    title: "ResultSet handling",
    slug: "resultset-handling",
    description: "Detailed, human-oriented explanation of ResultSet handling. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "ResultSet handling is a JDBC/database integration concept. The explanation should distinguish Java-side resource management from database-side transactional semantics and should make connection, statement, result-set, error, and transaction boundaries explicit."}, {"title": "A concrete Java example", "content": "try (Connection connection = dataSource.getConnection();\n     PreparedStatement ps = connection.prepareStatement(\"select id, name from users where id = ?\")) {\n    ps.setLong(1, 42L);\n    try (ResultSet rs = ps.executeQuery()) {\n        if (rs.next()) System.out.println(rs.getString(\"name\"));\n    }\n}"}, {"title": "How the mechanism behaves", "content": "For ResultSet handling, explain the JDBC object lifecycle and the database behavior behind the API call. SQL execution, transaction isolation, connection pooling, and resource cleanup are related but distinct concerns."}, {"title": "Edge cases and common mistakes", "content": "Never build SQL by concatenating untrusted input. Do not assume closing a Statement always means the database transaction is committed. Do not leak connections from a pool, and do not leave ResultSet/Statement resources open."}, {"title": "Using it in production", "content": "Use DataSource/pooling, PreparedStatement, explicit transaction boundaries, timeouts where supported, and try-with-resources. Monitor pool saturation and connection leak detection."}, {"title": "Interview-ready explanation", "content": "A strong interview answer for ResultSet handling should start with the precise definition, identify the Java rule or API contract, explain the example, and then mention one edge case and one trade-off. If asked a follow-up, explain the condition under which the original statement changes."}, {"title": "Practice questions", "content": "1. What contract does ResultSet handling provide?\n2. What happens on failure?\n3. Where is the transaction boundary?\n4. What is the production failure mode?"}],
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
