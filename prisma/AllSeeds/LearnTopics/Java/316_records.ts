import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 316/356
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
  title: "Records",
  slug: "records",
  description: "`Records` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "A Java record is a compact way to declare a class whose primary purpose is to model data. A declaration such as `record Point(int x, int y) {}` automatically provides private final component fields, a canonical constructor, accessors named after the components, and implementations of `equals()`, `hashCode()`, and `toString()` based on the record components.\\n\\nA record is still a class. It can implement interfaces, declare methods, and contain validation in its compact constructor. It is not simply a mutable data-transfer-object syntax shortcut."
    },
    {
      title: "Practical perspective",
      content: "Records are useful when the identity of the value is naturally represented by its components. They reduce boilerplate and make the intended value semantics obvious. However, record immutability is shallow: if a component refers to a mutable object, that object can still change.\\n\\nDo not use a record merely because a class has fields. If the type has mutable identity, complex inheritance requirements, or lifecycle behavior that does not fit record semantics, a normal class may be clearer."
    },
    {
      title: "Example",
      content: "record Point(int x, int y) {\\n    public Point {\\n        if (x < 0 || y < 0) {\\n            throw new IllegalArgumentException(\\\"coordinates must be non-negative\\\");\\n        }\\n    }\\n}\\n\\nPoint p = new Point(10, 20);\\nSystem.out.println(p.x());"
    },
    {
      title: "Practice",
      content: "Create a record with two components and compare two instances with the same values. Then put a mutable object inside a record and explain why the record itself does not make that nested object immutable."
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
  sortOrder = 315,
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
