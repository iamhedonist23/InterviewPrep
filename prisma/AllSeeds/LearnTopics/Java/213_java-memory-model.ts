import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 213/356
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
  title: "Java Memory Model",
  slug: "java-memory-model",
  description: "`Java Memory Model` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "The Java Memory Model (JMM) defines how Java threads interact through memory. It describes when writes by one thread become visible to another and which reorderings are allowed. The JMM is the foundation for understanding `volatile`, `synchronized`, locks, final-field guarantees, atomics, and happens-before relationships.\\n\\nA program that works in one run is not necessarily correctly synchronized. Without a happens-before relationship, another thread may observe stale values or observe operations in an order that the source-code reading alone does not establish."
    },
    {
      title: "Practical perspective",
      content: "The practical question is not 'does the variable live in heap or stack?' but 'what synchronization or publication rule makes this state safely visible?' Lock acquisition/release, volatile accesses, thread start/join, and other defined synchronization actions establish ordering relationships.\\n\\nFor production concurrency bugs, reason from the JMM guarantees instead of relying on assumptions about CPU caches or a particular JVM's current behavior."
    },
    {
      title: "Example",
      content: "class Holder {\\n    private int value;\\n\\n    synchronized void set(int value) {\\n        this.value = value;\\n    }\\n\\n    synchronized int get() {\\n        return value;\\n    }\\n}"
    },
    {
      title: "Practice",
      content: "Take a shared variable accessed by two threads. Identify whether a happens-before relationship exists. Then add synchronization and explain exactly which actions are ordered."
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
  sortOrder = 212,
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
