import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 296/356
 *
 * This file intentionally follows the Docker seed's TopicSeed structure.
 * It is designed to be imported into a category/path/module seeder rather
 * than executed independently.
 */

const prisma = new PrismaClient();

export type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};

export const topic: TopicSeed = {
  title: "JDBC architecture",
  slug: "jdbc-architecture",
  description: "`JDBC architecture` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "JDBC is Java's standard API for interacting with relational databases through drivers. Application code typically works with interfaces such as `Connection`, `PreparedStatement`, and `ResultSet`, while a JDBC driver translates those operations into the database-specific protocol.\\n\\nThe abstraction lets application code use a largely consistent programming model even though PostgreSQL, MySQL, Oracle, SQL Server, and other databases have different wire protocols and capabilities."
    },
    {
      title: "Practical perspective",
      content: "A JDBC connection represents a database session and is an expensive resource compared with ordinary in-memory objects. Production applications commonly obtain connections from a `DataSource` and a connection pool rather than opening a new physical connection for every request.\\n\\nSQL parameters should be bound with `PreparedStatement`, resources should be closed deterministically, and transaction boundaries should be explicit when several operations must succeed or fail together."
    },
    {
      title: "Example",
      content: "try (Connection connection = dataSource.getConnection();\\n     PreparedStatement statement =\\n         connection.prepareStatement(\\\"select id, name from users where id = ?\\\")) {\\n\\n    statement.setLong(1, 42L);\\n\\n    try (ResultSet rs = statement.executeQuery()) {\\n        while (rs.next()) {\\n            System.out.println(rs.getString(\\\"name\\\"));\\n        }\\n    }\\n}"
    },
    {
      title: "Practice",
      content: "Trace the lifecycle of the connection, statement, and result set. Then modify the example to use a transaction containing two updates and explain where rollback belongs."
    }
  ],
};

export default topic;

/**
 * Optional standalone runner.
 * The main Java seed should normally import `topic` and pass it through
 * the same studyCategory -> studyPath -> studyModule -> studyTopic ->
 * studyTopicSection upsert flow as the Docker seed.
 */
export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 295,
) {
  const savedTopic = await prisma.studyTopic.upsert({
    where: {
      categoryId_slug: {
        categoryId,
        slug: topic.slug,
      },
    },
    update: {
      title: topic.title,
      moduleId,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder,
    },
    create: {
      categoryId,
      moduleId,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder,
      prerequisiteIds: [],
      relatedTopicIds: [],
    },
  });

  for (let index = 0; index < (topic.sections ?? []).length; index += 1) {
    const section = topic.sections![index];

    await prisma.studyTopicSection.upsert({
      where: { id: `${savedTopic.id}-section-${index}` },
      update: {
        title: section.title,
        content: section.content,
        sortOrder: index,
      },
      create: {
        id: `${savedTopic.id}-section-${index}`,
        topicId: savedTopic.id,
        title: section.title,
        content: section.content,
        sortOrder: index,
      },
    });
  }

  return savedTopic;
}
