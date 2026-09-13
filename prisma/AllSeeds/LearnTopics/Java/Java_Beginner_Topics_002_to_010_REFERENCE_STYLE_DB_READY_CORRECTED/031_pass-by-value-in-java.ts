import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 31/356
 *
 * Deep learning edition: first-principles explanation, execution model,
 * examples, edge cases, practical design, misconceptions, and practice.
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
  description: "Understand Java's parameter-passing model from first principles, including primitive values, object references, mutation versus reassignment, arrays, immutable objects, swapping, and the common misconception that Java passes objects by reference.",
  estimatedMinutes: 45,
  sections: [
    {
      title: "The rule in one sentence",
      content: "Java is always pass-by-value. The part that confuses people is that an object variable contains a reference value. When an object is passed to a method, that reference value is copied into the parameter.\n\nFor a primitive:\n\n```java\nint x = 10;\nchange(x);\n```\n\nthe value `10` is copied.\n\nFor an object:\n\n```java\nBox box = new Box();\nchange(box);\n```\n\nthe reference value stored in `box` is copied.\n\nThe important consequence is that the parameter and caller variable are separate variables. They may contain equal primitive values, or they may contain references that point to the same object. That distinction explains all of the behavior that follows.",
    },
    {
      title: "Primitive values are copied",
      content: "Consider:\n\n```java\nstatic void change(int value) {\n    value = 99;\n}\n\nint number = 10;\nchange(number);\n\nSystem.out.println(number); // 10\n```\n\nThe method receives its own parameter variable:\n\n```text\nCaller                  Method\n\nnumber = 10   ----copy-> value = 10\n                         value = 99\n```\n\nChanging `value` cannot change `number` because they are different variables.\n\nIf the method returns the new value, the caller can explicitly replace its variable:\n\n```java\nstatic int change(int value) {\n    return 99;\n}\n\nnumber = change(number);\n```\n\nNothing special happened to the caller's variable inside the method. The caller chose to assign the returned value to it.",
    },
    {
      title: "Object references are values too",
      content: "Now consider:\n\n```java\nclass Box {\n    int value;\n}\n\nstatic void change(Box box) {\n    box.value = 99;\n}\n\nBox b = new Box();\nb.value = 10;\n\nchange(b);\n\nSystem.out.println(b.value); // 99\n```\n\nAt first this looks like pass-by-reference, but it is not.\n\nThe variable `b` stores a reference value. Java copies that reference value into the parameter:\n\n```text\nCaller\n\nb ────────────────┐\n                  v\n               Box #1\n               value=10\n                  ^\n                  |\nparameter box ────┘\n```\n\nThere are two reference variables, but only one object.\n\nTherefore:\n\n```java\nbox.value = 99;\n```\n\nmutates Box #1, which the caller can still reach.\n\nThis is why the precise statement is: **Java passes the reference value by value.**",
    },
    {
      title: "Mutation versus reassignment",
      content: "The difference between mutation and reassignment is the heart of this topic.\n\n```java\nstatic void update(Box box) {\n    box.value = 20;     // mutation\n    box = new Box();    // reassignment\n    box.value = 30;     // mutation of a different object\n}\n\nBox b = new Box();\nb.value = 10;\n\nupdate(b);\n\nSystem.out.println(b.value); // 20\n```\n\nBefore the call, both variables reach the same object.\n\nAfter `box.value = 20`, that original object changes.\n\nAfter:\n\n```java\nbox = new Box();\n```\n\nonly the local parameter is redirected.\n\n```text\nCaller b ───────────> Box #1\n                      value=20\n\nMethod box ─────────> Box #2\n                      value=30\n```\n\nWhen the method returns, the local `box` variable disappears. The caller's `b` still points to Box #1.\n\nA useful debugging question is therefore not \"is this pass-by-reference?\" Ask: **is the method mutating the object, or is it reassigning its local reference?**",
    },
    {
      title: "Why swapping parameters does not swap caller variables",
      content: "A classic demonstration is:\n\n```java\nstatic void swap(Box first, Box second) {\n    Box temp = first;\n    first = second;\n    second = temp;\n}\n\nBox a = new Box();\nBox b = new Box();\n\nswap(a, b);\n```\n\nThe method only swaps its two local parameter variables.\n\nConceptually:\n\n```text\nBefore:\ncaller a ──> Box A\ncaller b ──> Box B\n\nInside method:\nfirst  ──> Box A\nsecond ──> Box B\n\nAfter swap:\nfirst  ──> Box B\nsecond ──> Box A\n\nCaller still:\na ──> Box A\nb ──> Box B\n```\n\nThe copied reference values can be exchanged locally, but Java provides no way for the method to reassign the caller's local variables through ordinary parameter passing.",
    },
    {
      title: "Arrays and immutable objects",
      content: "Arrays are objects, so the same rule applies:\n\n```java\nstatic void change(int[] values) {\n    values[0] = 100;\n}\n\nint[] numbers = {1, 2, 3};\nchange(numbers);\n\nSystem.out.println(numbers[0]); // 100\n```\n\nThe copied reference still reaches the same array.\n\nBut reassigning the array parameter does not replace the caller's array:\n\n```java\nstatic void replace(int[] values) {\n    values = new int[] {9, 9, 9};\n}\n```\n\nFor immutable objects such as `String`, the object cannot be changed through methods that mutate its contents because `String` itself is immutable:\n\n```java\nstatic void change(String text) {\n    text = \"changed\";\n}\n\nString value = \"original\";\nchange(value);\n\nSystem.out.println(value); // original\n```\n\nThe parameter was simply redirected to another `String` reference. The caller's variable was untouched.",
    },
    {
      title: "A reliable mental model",
      content: "Use this model whenever parameter behavior becomes confusing:\n\n1. Identify the value stored in the caller's variable.\n2. Java copies that value into the parameter.\n3. Ask what the copied value represents.\n4. If it is a primitive, changing the parameter changes only the parameter.\n5. If it is an object reference, both references may reach the same object.\n6. Mutating that object is visible through every reference to it.\n7. Reassigning the parameter changes only the parameter.\n\nThis model also works for arrays, collections, maps, and user-defined objects because they are all reference types.\n\nOnce this model is clear, there is no need to memorize separate rules for every class.",
    },
    {
      title: "Common misconceptions",
      content: "**\"Objects are passed by reference.\"**\n\nIncorrect as a description of Java's parameter-passing mechanism. The reference value is passed by value.\n\n**\"final makes an object immutable.\"**\n\nIncorrect. A final reference cannot be reassigned, but the object it refers to can still be mutable.\n\n**\"If a method changes an object, Java must have passed it by reference.\"**\n\nIncorrect. The method received a copied reference value that still points to the same object.\n\n**\"String proves Java passes objects differently.\"**\n\nNo. `String` is immutable, so its contents cannot be changed. The parameter-passing rule is unchanged.\n\n**\"Java cannot change anything through a parameter.\"**\n\nIt can mutate an object reachable through a reference parameter. What it cannot do is directly reassign the caller's variable.",
    },
    {
      title: "Practice: predict before running",
      content: "### Exercise 1\n\n```java\nstatic void update(int value) {\n    value = 50;\n}\nint x = 10;\nupdate(x);\nSystem.out.println(x);\n```\n\nResult: `10`.\n\n### Exercise 2\n\n```java\nstatic void update(Box box) {\n    box.value = 50;\n}\n```\n\nIf `box` refers to the caller's object, the caller sees `50` because the shared object was mutated.\n\n### Exercise 3\n\n```java\nstatic void update(Box box) {\n    box = new Box();\n    box.value = 50;\n}\n```\n\nThe caller's original object does not change because only the local parameter was reassigned.\n\n### Exercise 4\n\nWrite a method that attempts to swap two `int` variables and another that attempts to swap two `Box` references. Explain why neither changes the caller's variables.\n\nThe goal is not to memorize the output. Draw the variables and objects first, then predict the result.",
    },
  ],
};

export default topic;

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
};