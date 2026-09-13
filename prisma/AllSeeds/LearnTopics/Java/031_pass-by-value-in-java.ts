import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 31/356
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
  title: "Pass-by-value in Java",
  slug: "pass-by-value-in-java",
  description: "`Pass-by-value in Java` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "Java is always pass-by-value. For a primitive, the value itself is copied into the parameter. For an object, the value being copied is the reference to that object. The method receives its own copy of that reference, so it can mutate the object through the reference, but assigning the parameter to a different object does not change the caller's variable.\\n\\nThat distinction explains why this code can change an object's state but cannot replace the caller's reference:"
    },
    {
      title: "Practical perspective",
      content: "Do not describe Java as 'pass-by-reference for objects.' That wording causes confusion because the reference value is what is passed by value. This also explains why swapping two object parameters does not swap the caller's variables.\\n\\nFor immutable objects such as `String`, a method cannot mutate the string's contents, so a reassignment simply changes the local parameter. For mutable objects, the copied reference can still reach the same object."
    },
    {
      title: "Example",
      content: "class Box {\\n    int value;\\n}\\n\\nstatic void change(Box box) {\\n    box.value = 10;       // changes the shared object\\n    box = new Box();      // changes only the local parameter\\n    box.value = 20;\\n}\\n\\nBox b = new Box();\\nb.value = 1;\\nchange(b);\\n\\nSystem.out.println(b.value); // 10"
    },
    {
      title: "Practice",
      content: "Write a method that tries to swap two object references. Then write another method that changes a field of one object. Predict both results before running them."
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
  sortOrder = 30,
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
