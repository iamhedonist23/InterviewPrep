import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 332/356
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
  title: "Checked vs unchecked exception design",
  slug: "checked-vs-unchecked-exception-design",
  description: "`Checked vs unchecked exception design` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`Checked vs unchecked exception design` belongs to Java's exception model and controls how abnormal conditions are represented, propagated, caught, or translated.\\n\\nTrace the call stack: where is the failure detected, which layer can recover, where should context be added, and where should the original cause be preserved? That is more useful than memorizing exception syntax."
    },
    {
      title: "Practical perspective",
      content: "For `Checked vs unchecked exception design`, catch an exception only when the current layer can do something useful with it. Preserve causes when translating exceptions, and do not hide failures with empty catch blocks."
    },
    {
      title: "Example",
      content: "try {\\n    process();\\n} catch (IOException e) {\\n    throw new ServiceException(\\\"Unable to process request\\\", e);\\n}"
    },
    {
      title: "Practice",
      content: "Create a small failure scenario for `Checked vs unchecked exception design`. Trace the thrown exception, handler, cleanup, and final result. Then change the handler and explain how propagation changes."
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
  sortOrder = 331,
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
