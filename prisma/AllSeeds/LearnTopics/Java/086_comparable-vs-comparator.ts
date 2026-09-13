import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 86/356
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
  title: "Comparable vs Comparator",
  slug: "comparable-vs-comparator",
  description: "`Comparable vs Comparator` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`Comparable vs Comparator` is a Java Collections Framework concept whose behavior is defined by a particular contract. To use it correctly, start with the operation the program needs—lookup, insertion order, uniqueness, sorted order, queue behavior, or mutation control—and then connect that requirement to the collection's implementation.\\n\\nFor example, two collections may both expose `add()` but have very different meanings. A set uses equality or comparison to determine duplicates; an ordered map has different iteration semantics from a hash map; a priority queue exposes the highest-priority element through `peek()`/`poll()` rather than promising that iteration is sorted.\\n\\nThe implementation matters because it explains performance characteristics, but the API contract comes first."
    },
    {
      title: "Practical perspective",
      content: "In production, choose `Comparable vs Comparator` based on actual access patterns rather than habit. Check expected time complexity, memory overhead, ordering requirements, equality/comparison behavior, and whether multiple threads will access the structure.\\n\\nBe especially careful when mutable objects participate in hashing or ordering. A collection can remain internally valid while lookups become surprising because the state used to locate an element has changed."
    },
    {
      title: "Practice",
      content: "Build a small program demonstrating `Comparable vs Comparator` with the operation it is designed for. Include one boundary case such as a duplicate, missing key, ordering change, or mutation. Explain the observed result from the collection's contract."
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
  sortOrder = 85,
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
