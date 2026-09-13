import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 342/356
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
  title: "CompletableFuture interview questions",
  slug: "completablefuture-interview-questions",
  description: "`CompletableFuture interview questions` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`CompletableFuture interview questions` addresses a specific part of Java concurrency: coordinating work or shared state when multiple threads can execute at overlapping times. The important question is what guarantee the feature provides—mutual exclusion, visibility, atomicity, task scheduling, coordination, cancellation, or a combination.\\n\\nStart by identifying the shared state and the race that could occur without coordination. Then identify the Java rule that prevents that race. This keeps concurrency reasoning grounded in guarantees rather than thread-count folklore."
    },
    {
      title: "Practical perspective",
      content: "Use `CompletableFuture interview questions` only when its guarantee matches the problem. Consider interruption, cancellation, shutdown, contention, exception propagation, and whether the protected operation can block.\\n\\nA common production failure is solving one problem while creating another—for example, adding a lock for correctness and then holding it during slow I/O, which turns a correctness boundary into a throughput bottleneck."
    },
    {
      title: "Example",
      content: "CompletableFuture.supplyAsync(this::loadUser)\\n    .thenApply(this::toResponse)\\n    .exceptionally(this::fallback);"
    },
    {
      title: "Practice",
      content: "Create a two-thread example involving `CompletableFuture interview questions`. Run it repeatedly, identify the shared state or coordination point, and explain what guarantee makes the corrected version safe. Then remove that guarantee and predict the failure mode."
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
  sortOrder = 341,
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
