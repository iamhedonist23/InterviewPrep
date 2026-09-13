import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 249/356
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
  title: "JFR Java Flight Recorder",
  slug: "jfr-java-flight-recorder",
  description: "`JFR Java Flight Recorder` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "Java Flight Recorder (JFR) is a low-overhead event-recording system in the JDK for observing JVM and application behavior. A recording can capture events related to CPU activity, allocation, garbage collection, threads, locks, I/O, exceptions, and other runtime activity depending on configuration.\\n\\nJFR is valuable because it connects symptoms to timelines. Instead of only seeing that CPU was high, you can investigate which methods, threads, or runtime events were active during the problematic interval."
    },
    {
      title: "Practical perspective",
      content: "In production troubleshooting, start with the question you are trying to answer and choose an appropriate recording configuration. JFR is particularly useful for intermittent performance problems because the recording can preserve evidence that a debugger attached after the incident would miss.\\n\\nUse JFR together with metrics, logs, and application traces. A recording is evidence, not an automatic root-cause statement; the events still need to be interpreted in the context of the application."
    },
    {
      title: "Example",
      content: "# Example command-line workflow\\njcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr\\njcmd <pid> JFR.check\\n"
    },
    {
      title: "Practice",
      content: "Record a short JFR session for a CPU-intensive test program. Inspect CPU and allocation-related events and explain what evidence each one provides."
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
  sortOrder = 248,
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
