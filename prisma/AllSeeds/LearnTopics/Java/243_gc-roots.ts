import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 243/356
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
  title: "GC roots",
  slug: "gc-roots",
  description: "`GC roots` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`GC roots` belongs to the JVM/runtime side of Java rather than being only a surface-level language feature. The right explanation connects the topic to class loading, bytecode execution, memory, garbage collection, JIT compilation, or runtime diagnostics as appropriate.\\n\\nSeparate what the Java specification guarantees from what a particular JVM such as HotSpot commonly does internally. That distinction matters when reasoning about portability and production behavior."
    },
    {
      title: "Practical perspective",
      content: "For `GC roots`, production diagnosis should be evidence-driven. Use the appropriate runtime metrics, diagnostic command, profiler, JFR recording, thread dump, or heap information rather than inferring a root cause from one symptom.\\n\\nRuntime details can change across Java versions and JVM implementations, so document version-sensitive assumptions when they matter."
    },
    {
      title: "Practice",
      content: "Make `GC roots` observable with a small Java program or diagnostic command. Record one concrete result, change the workload or runtime condition, and explain what the evidence tells you—and what it does not prove."
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
  sortOrder = 242,
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
