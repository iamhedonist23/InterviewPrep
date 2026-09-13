import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 28/356
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
  title: "main method",
  slug: "main-method",
  description: "`main method` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "The traditional Java application entry point is `public static void main(String[] args)`. `public` makes the method accessible to the launcher, `static` means the JVM can invoke it without first creating an instance, `void` means it does not return a value to the caller, and `String[] args` receives command-line arguments.\\n\\nThe method is not magic syntax: it is a method with a signature recognized by the Java launcher. The launcher starts the runtime, loads the class, and invokes the entry point."
    },
    {
      title: "Practical perspective",
      content: "Command-line arguments are always strings. If a program needs an integer, it must parse it explicitly. Also distinguish the `main` method from object construction: `main` is where application startup begins for a launched class; constructors are responsible for initializing instances.\\n\\nModern Java also has additional launch conveniences in newer releases, but the classic form remains important for normal Java applications, interview questions, and understanding the launcher."
    },
    {
      title: "Example",
      content: "public class App {\\n    public static void main(String[] args) {\\n        System.out.println(\\\"Argument count: \\\" + args.length);\\n\\n        if (args.length > 0) {\\n            System.out.println(\\\"First argument: \\\" + args[0]);\\n        }\\n    }\\n}"
    },
    {
      title: "Practice",
      content: "Run the class once with no arguments and once with two arguments. Explain why `args` is non-null but may contain zero elements."
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
  sortOrder = 27,
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
