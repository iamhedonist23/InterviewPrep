import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 27/356
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
  title: "JDK vs JRE vs JVM",
  slug: "jdk-vs-jre-vs-jvm",
  description: "`JDK vs JRE vs JVM` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`JVM` is the runtime engine that loads classes and executes Java bytecode. `JRE` is the conceptual runtime environment consisting of the JVM plus the libraries and runtime components needed to run Java applications. `JDK` is the development kit: it includes the runtime plus developer tools such as `javac`, `javadoc`, `jdb`, and other JDK utilities.\\n\\nModern Java distributions do not always package these concepts as three separately installed products. The terminology is still useful because it explains the roles: the JVM executes, the runtime provides what an application needs to run, and the JDK provides what a developer needs to build and diagnose applications."
    },
    {
      title: "Practical perspective",
      content: "When installing Java for development, verify the JDK rather than assuming a `java` command alone means the compiler is installed. `java -version` checks the runtime command; `javac -version` checks the compiler.\\n\\nIn production, an application may need only the runtime components, although modern container images and distributions often package a JDK because its size and diagnostic tools are acceptable or operationally useful."
    },
    {
      title: "Example",
      content: "java -version\\njavac -version"
    },
    {
      title: "Practice",
      content: "Install a JDK and run both commands. Explain why `java -version` and `javac -version` answer different questions."
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
  sortOrder = 26,
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
