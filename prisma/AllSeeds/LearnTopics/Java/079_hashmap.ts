import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 79/356
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
  title: "HashMap",
  slug: "hashmap",
  description: "`HashMap` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "`HashMap<K,V>` stores key/value mappings using hashing. On a lookup such as `map.get(key)`, Java derives a hash from the key, uses that information to select a bucket, and then checks candidate entries using key equality. Hashing narrows the search; `equals()` determines whether a candidate key is logically the requested key.\\n\\nThis is why a custom key must obey the `equals()`/`hashCode()` contract. If two keys are equal but produce different hash codes, the map can place them in different buckets and fail to find an entry that should match."
    },
    {
      title: "Practical perspective",
      content: "`HashMap` provides expected constant-time lookup and insertion under normal hashing assumptions, but it is not a guarantee that every operation always takes O(1). Collisions, resizing, and the current implementation affect actual behavior. Modern Java implementations can treeify sufficiently large collision bins under certain conditions.\\n\\n`HashMap` permits one `null` key and multiple `null` values, does not guarantee iteration order, and is not safe for concurrent structural modification without external coordination. Use `ConcurrentHashMap` or another appropriate design when multiple threads need concurrent access."
    },
    {
      title: "Example",
      content: "Map<String, Integer> counts = new HashMap<>();\\n\\ncounts.put(\\\"java\\\", 1);\\ncounts.put(\\\"java\\\", 2);\\n\\nSystem.out.println(counts.get(\\\"java\\\")); // 2\\nSystem.out.println(counts.containsKey(\\\"java\\\")); // true"
    },
    {
      title: "Practice",
      content: "Create a custom `EmployeeKey` with `id` and use it in a `HashMap`. First implement only `equals()`, then implement both `equals()` and `hashCode()` and observe the lookup behavior."
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
  sortOrder = 78,
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
