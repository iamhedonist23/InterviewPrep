import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 162/356
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
  title: "volatile",
  slug: "volatile",
  description: "`volatile` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`volatile` tells the Java Memory Model that reads and writes of a field have special visibility and ordering semantics. A write to a volatile variable becomes visible to subsequent volatile reads according to the happens-before rules, so it is useful for simple state flags shared between threads.\\n\\nFor example, a worker can repeatedly read a volatile `running` flag and another thread can set it to `false`. Without an appropriate synchronization mechanism, a plain field does not provide the same cross-thread visibility guarantee."
    },
    {
      title: "Practical perspective",
      content: "`volatile` does not make a compound operation atomic. `count++` is a read-modify-write sequence, so multiple threads can still lose updates even when `count` is volatile. Use an atomic class, lock, or another coordination mechanism when the operation requires atomicity.\\n\\nA volatile field is therefore a tool for a particular memory-visibility problem, not a general replacement for synchronization."
    },
    {
      title: "Example",
      content: "class Worker implements Runnable {\\n    private volatile boolean running = true;\\n\\n    public void stop() {\\n        running = false;\\n    }\\n\\n    public void run() {\\n        while (running) {\\n            // do work\\n        }\\n    }\\n}"
    },
    {
      title: "Practice",
      content: "Change the example so `running` is a plain field and reason about the visibility guarantee. Then replace a shared `volatile int count` increment with `AtomicInteger` and explain why the second version is different."
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
  sortOrder = 161,
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
