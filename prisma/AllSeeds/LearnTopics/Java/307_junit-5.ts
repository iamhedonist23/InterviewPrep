import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 307/356
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
  title: "JUnit 5",
  slug: "junit-5",
  description: "`JUnit 5` is taught as a Java concept through its language/runtime behavior, practical use, and the edge cases that matter when the code is changed or used in production.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "Core explanation",
      content: "JUnit 5 is a Java testing platform whose programming model is centered on the Jupiter test engine and annotations such as `@Test`, `@BeforeEach`, `@AfterEach`, and parameterized-test support. A test method executes a small scenario and uses assertions to verify observable behavior.\\n\\nThe value of a unit test is not the annotation itself; it is the executable contract. A useful test fails when the production behavior violates a requirement and passes when the requirement is satisfied."
    },
    {
      title: "Practical perspective",
      content: "Keep test setup focused. Shared mutable state, reliance on execution order, real network calls, and uncontrolled time can make tests flaky. Use lifecycle hooks for genuine setup/cleanup rather than hiding the actual scenario in large fixtures.\\n\\nJUnit 5 also supports tags, parameterized tests, nested tests, extensions, and other features, but the basic discipline remains the same: arrange the state, perform the operation, and assert the behavior."
    },
    {
      title: "Example",
      content: "@Test\\nvoid calculatesTotal() {\\n    Order order = new Order(List.of(10, 20, 30));\\n\\n    int total = order.total();\\n\\n    assertEquals(60, total);\\n}"
    },
    {
      title: "Practice",
      content: "Write a JUnit 5 test for one business rule. Introduce a one-line bug into the production method and verify that the test catches it."
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
  sortOrder = 306,
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
