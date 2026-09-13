import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 319/356
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
  title: "Optional best practices",
  slug: "optional-best-practices",
  description: "`Optional best practices` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`Optional best practices` is part of Java's functional programming model. Its behavior depends on types, lambda/method-reference targets, stream pipeline semantics, evaluation timing, and side effects.\\n\\nA useful way to learn `Optional best practices` is to trace one value through the operation: what enters, what is produced, when the code runs, and whether the operation can short-circuit or reorder work."
    },
    {
      title: "Practical perspective",
      content: "In production, clarity matters more than using a stream or lambda simply because it is available. Avoid hidden side effects, understand ordering requirements, and be cautious with parallel execution when the operation depends on shared mutable state.\\n\\nFor `Optional best practices`, test empty input, null handling where applicable, and any ordering or exception behavior that the surrounding API relies on."
    },
    {
      title: "Example",
      content: "Optional<String> name = Optional.ofNullable(findName());\\n\\nname.ifPresent(System.out::println);"
    },
    {
      title: "Practice",
      content: "Create a small collection example using `Optional best practices`. Predict the result before execution, then change one operation or input and explain why the behavior changes."
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
  sortOrder = 318,
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
