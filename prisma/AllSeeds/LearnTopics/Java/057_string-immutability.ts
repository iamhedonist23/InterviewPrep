import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 57/356
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
  title: "String immutability",
  slug: "string-immutability",
  description: "`String immutability` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`String` is immutable: once a `String` object has been created, its character sequence cannot be changed. Operations such as `concat`, `replace`, `toUpperCase`, and `substring` therefore return a `String` representing the new value instead of modifying the original object.\\n\\nThis is why the following code does not change `text`:"
    },
    {
      title: "Practical perspective",
      content: "`String` immutability simplifies sharing. The same string object can be referenced from multiple places without one caller unexpectedly changing its contents. It also works naturally with hashing and the string pool because the value does not change after construction.\\n\\nImmutability does not mean every operation is free. Repeatedly creating many strings can create allocation and copying overhead, which is why `StringBuilder` is useful for repeated construction."
    },
    {
      title: "Example",
      content: "String text = \\\"Java\\\";\\n\\ntext.concat(\\\" 21\\\");\\n\\nSystem.out.println(text); // Java\\n\\ntext = text.concat(\\\" 21\\\");\\n\\nSystem.out.println(text); // Java 21"
    },
    {
      title: "Practice",
      content: "Predict the output before running the example. Then build a long string in a loop and compare the code with a `StringBuilder` implementation."
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
  sortOrder = 56,
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
