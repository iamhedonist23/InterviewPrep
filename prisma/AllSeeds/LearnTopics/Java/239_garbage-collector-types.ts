import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 239/356
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
  title: "Garbage collector types",
  slug: "garbage-collector-types",
  description: "`Garbage collector types` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "Java garbage collectors reclaim heap objects that are no longer reachable from GC roots. Different collectors use different algorithms and make different trade-offs between throughput, pause-time goals, memory footprint, and implementation complexity.\\n\\nCollectors commonly encountered in modern Java include G1, ZGC, and Shenandoah, while other collectors exist for specialized workloads or legacy configurations. The important distinction is not simply their names; it is the workload and latency/throughput goal each collector is designed to address."
    },
    {
      title: "Practical perspective",
      content: "Choosing a collector should follow measurements and service-level goals. A latency-sensitive service may prioritize short pauses, while a batch workload may accept longer pauses for throughput. Heap size, allocation rate, object lifetime, CPU availability, and application behavior all influence the result.\\n\\nDo not assume a collector change automatically fixes an application memory leak. GC can reclaim unreachable objects; it cannot reclaim objects that the application still references."
    },
    {
      title: "Example",
      content: "System.out.println(\\n    java.lang.management.ManagementFactory\\n        .getMemoryMXBean()\\n        .getHeapMemoryUsage()\\n);"
    },
    {
      title: "Practice",
      content: "Run a Java program with a selected collector in a controlled environment and observe GC activity. Explain what problem the collector is solving and which metric you would use to evaluate the result."
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
  sortOrder = 238,
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
