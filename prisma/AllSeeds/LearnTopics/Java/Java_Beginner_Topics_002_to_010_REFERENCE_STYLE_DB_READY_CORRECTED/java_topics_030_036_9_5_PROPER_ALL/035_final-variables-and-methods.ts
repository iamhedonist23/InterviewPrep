import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 35/356
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
  title: "final variables and methods",
  slug: "final-variables-and-methods",
  description: "Learn what final actually guarantees for local variables, parameters, fields, references, methods, and classes, including definite assignment, blank final fields, immutability misconceptions, inheritance, and practical design implications.",
  estimatedMinutes: 50,
  sections: [
    {
      title: "What final means",
      content: "`final` means that a particular declaration cannot be changed in the way that declaration allows.\n\nThe exact meaning depends on what is declared:\n\n- final variable → cannot be assigned more than once;\n- final parameter → cannot be reassigned inside the method;\n- final field → cannot be reassigned after valid initialization;\n- final method → cannot be overridden;\n- final class → cannot be subclassed.\n\nThe word is the same, but the language rule applies to different things.\n\nFor example:\n\n```java\nfinal int count = 10;\n// count = 20; // compile-time error\n```\n\nThe simplest mental model is **final restricts reassignment or inheritance at the declaration level.** It does not automatically mean \"immutable\" in every context.",
    },
    {
      title: "Final local variables",
      content: "A final local variable must be assigned exactly once.\n\n```java\nfinal int max = 100;\n// max = 200; // error\n```\n\nJava also supports a blank final local variable that is assigned later, provided the compiler can prove it is definitely assigned before use:\n\n```java\nfinal int value;\n\nif (condition) {\n    value = 10;\n} else {\n    value = 20;\n}\n\nSystem.out.println(value);\n```\n\nThis is called definite assignment.\n\nThe compiler analyzes the control flow. If there is a path where the final variable could be used without being assigned, compilation fails.\n\nFinal therefore is not simply \"must have a value on the same line.\" It means the variable must receive one valid assignment before use and cannot subsequently be assigned again.",
    },
    {
      title: "Final references are not immutable objects",
      content: "This is one of the most important distinctions:\n\n```java\nfinal List<String> names = new ArrayList<>();\n\nnames.add(\"Java\"); // allowed\n// names = new ArrayList<>(); // not allowed\n```\n\n`final` applies to the reference variable. It prevents the variable from being redirected to another list. It does not prevent the existing list from changing.\n\nConceptually:\n\n```text\nnames ─────────> List object\nfinal reference     mutable state\n```\n\nYou can mutate the object through the final reference if the object's API permits mutation.\n\nTherefore:\n\n**final reference != immutable object**\n\nTrue immutability requires the object's state itself to be protected from change, usually through class design, defensive copying, unmodifiable views, or immutable value types.",
    },
    {
      title: "Final parameters",
      content: "A final parameter prevents reassignment inside the method:\n\n```java\nstatic void process(final User user) {\n    // user = new User(); // error\n}\n```\n\nBut the object can still be mutated:\n\n```java\nstatic void process(final User user) {\n    user.setName(\"Updated\");\n}\n```\n\nWhether final parameters improve readability is a design choice. They can communicate that a parameter variable is not intended to be reassigned, but modern Java code often relies on clear method structure rather than adding `final` everywhere.\n\nThe important semantic point is precise: `final` constrains the parameter variable, not the object referenced by it.",
    },
    {
      title: "Final fields and constructor initialization",
      content: "A final instance field can be assigned during declaration or constructor initialization.\n\n```java\nclass User {\n    private final String id;\n\n    User(String id) {\n        this.id = id;\n    }\n}\n```\n\nEach `User` object receives its own final `id`.\n\nA final field is useful when an object's essential state should be fixed after construction.\n\nJava's definite-assignment rules require every constructor path to initialize a final instance field before construction completes.\n\nThis is one reason final fields work well with immutable objects:\n\n```java\nfinal class User {\n    private final String id;\n    private final String name;\n\n    User(String id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n}\n```\n\nBut final fields alone do not guarantee deep immutability. If a final field refers to a mutable collection, that collection can still change unless it is protected.",
    },
    {
      title: "Final methods and inheritance",
      content: "A final instance method cannot be overridden by a subclass:\n\n```java\nclass Parent {\n    final void validate() {\n        // required validation\n    }\n}\n```\n\nA subclass can inherit the method, but it cannot provide another implementation with the same signature.\n\nThis is useful when a class wants to guarantee part of its behavior while still allowing extension elsewhere.\n\n```java\nclass Report {\n    final void generate() {\n        validate();\n        build();\n        save();\n    }\n\n    void validate() {}\n    void build() {}\n    void save() {}\n}\n```\n\nThe final method can define an invariant sequence while overridable methods customize individual steps.\n\nFinal methods are about inheritance behavior, not object immutability.",
    },
    {
      title: "Final classes",
      content: "A final class cannot be subclassed:\n\n```java\nfinal class SecurityToken {\n}\n```\n\nThis can be useful when inheritance would violate the class's design assumptions.\n\nA final class is not automatically immutable. For example:\n\n```java\nfinal class User {\n    private List<String> roles = new ArrayList<>();\n}\n```\n\nThe class cannot be extended, but its own `roles` list can still change.\n\nConversely, a class does not have to be final to have immutable instances, although making an immutable class final can simplify the design by preventing subclasses from introducing mutable behavior that violates the intended contract.",
    },
    {
      title: "final, finally, and finalize",
      content: "These names look similar but mean different things.\n\n**`final`** is a Java language modifier:\n\n```java\nfinal int value = 10;\n```\n\n**`finally`** is part of exception handling:\n\n```java\ntry {\n    work();\n} finally {\n    cleanup();\n}\n```\n\n**`finalize()`** was an old object-finalization mechanism and should not be treated as a modern resource-management technique. Modern Java programs should use explicit resource management such as try-with-resources.\n\nRemembering the spelling is not enough. They belong to completely different language/runtime concepts.",
    },
    {
      title: "Does final improve performance?",
      content: "It is a mistake to treat `final` as a universal performance optimization.\n\nA compiler or JVM may use many forms of analysis and optimization, but developers should primarily use final to express correctness and design intent.\n\nExamples where final can communicate useful intent:\n\n- a value must not be reassigned;\n- an object field is fixed after construction;\n- a method must not be overridden;\n- a class must not be subclassed.\n\nIf performance matters, measure the actual program rather than assuming that adding final automatically makes code faster.\n\nThe strongest benefit of final is usually **making certain changes illegal**, which can reduce accidental mutation and make designs easier to reason about.",
    },
    {
      title: "Common mistakes",
      content: "### Confusing final references with immutable objects\n\nA final reference can point to a mutable object.\n\n### Assuming final fields are always compile-time constants\n\nA final instance field initialized in a constructor is not the same thing as a compile-time constant.\n\n### Thinking final methods cannot be called\n\nThey can be called normally. They simply cannot be overridden.\n\n### Thinking final classes cannot have mutable state\n\nThey can. Final controls inheritance, not internal mutability.\n\n### Adding final without understanding ownership\n\nUse it when the restriction communicates a useful invariant. Avoid treating modifiers as decoration that automatically improves code.",
    },
    {
      title: "Practice: identify what is protected",
      content: "For each declaration, identify exactly what `final` prevents:\n\n```java\nfinal int x = 10;\nfinal List<String> names = new ArrayList<>();\nfinal class Account {}\nclass Parent {\n    final void save() {}\n}\n```\n\nThen answer:\n\n1. Can `x` be assigned again?\n2. Can `names` be assigned a new list?\n3. Can the contents of `names` change?\n4. Can `Account` be subclassed?\n5. Can a subclass override `save()`?\n\nIf you can answer all five without running the code, you understand that `final` has different effects depending on what it modifies.",
    },
  ],
};

export default topic;

export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 34,
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