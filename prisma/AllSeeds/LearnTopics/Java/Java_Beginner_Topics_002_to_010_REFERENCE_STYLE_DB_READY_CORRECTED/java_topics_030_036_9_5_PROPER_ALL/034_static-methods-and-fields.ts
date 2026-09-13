import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 34/356
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
  title: "static methods and fields",
  slug: "static-methods-and-fields",
  description: "Understand Java's static members as class-level members, including class state, static initialization, access rules, method hiding, static final constants, lifecycle, mutable global state, thread-safety concerns, and practical design choices.",
  estimatedMinutes: 55,
  sections: [
    {
      title: "What static means",
      content: "A `static` field or method belongs to the class rather than to each individual object.\n\n```java\nclass Counter {\n    static int total;\n    int value;\n}\n```\n\nEvery `Counter` object has its own `value`, but there is one `total` associated with the class.\n\n```java\nCounter a = new Counter();\nCounter b = new Counter();\n\na.value = 10;\nb.value = 20;\nCounter.total = 2;\n```\n\nThe key question is ownership:\n\n- instance field → state associated with one object;\n- static field → state associated with the class.\n\nThis is why static members can be accessed through the class name:\n\n```java\nCounter.total\n```\n\nrather than requiring a particular object.",
    },
    {
      title: "Instance state versus class state",
      content: "Consider:\n\n```java\nclass User {\n    static int userCount;\n    String name;\n\n    User(String name) {\n        this.name = name;\n        userCount++;\n    }\n}\n```\n\nCreating objects:\n\n```java\nUser a = new User(\"A\");\nUser b = new User(\"B\");\n```\n\nproduces:\n\n```text\na.name -> \"A\"\nb.name -> \"B\"\n\nUser.userCount -> 2\n```\n\n`name` belongs to each object. `userCount` is shared.\n\nThis distinction is useful for counters, configuration, caches, registries, utility state, and constants. But shared state also creates coupling. Changing a static field from one part of a program changes what other code observes.\n\nStatic therefore means shared class-level ownership, not automatically \"better performance\" or \"global variable that should be used everywhere.\" ",
    },
    {
      title: "Why a static method cannot directly use instance fields",
      content: "A static method has no particular object associated with its invocation.\n\n```java\nclass User {\n    String name;\n\n    static void printName() {\n        // System.out.println(name); // compile-time error\n    }\n}\n```\n\nWhich user's `name` should the method read? There is no implicit `this` object in a static method.\n\nAn instance method does have an object:\n\n```java\nvoid printName() {\n    System.out.println(name);\n}\n```\n\nConceptually, the compiler can treat an instance field access as being relative to the current object.\n\nA static method can still work with an instance if one is explicitly supplied:\n\n```java\nstatic void printName(User user) {\n    System.out.println(user.name);\n}\n```\n\nThe important distinction is not that static methods \"cannot access objects.\" They can. They simply do not have an implicit receiver object.",
    },
    {
      title: "Static initialization and class initialization",
      content: "Static fields can have initialization expressions:\n\n```java\nclass Config {\n    static String environment = loadEnvironment();\n}\n```\n\nJava initializes static state as part of class initialization before the class is used in ways that require initialization.\n\nA class can also use a static initializer:\n\n```java\nclass Config {\n    static {\n        System.out.println(\"initializing\");\n    }\n}\n```\n\nStatic initialization is associated with the class, not with each object creation.\n\nThis matters when static initialization performs meaningful work such as loading configuration, constructing caches, or registering components. Heavy or failure-prone static initialization can make startup behavior harder to reason about.\n\nFor learning, separate these concepts:\n\n- declaring a static member;\n- initializing its value;\n- initializing the class;\n- constructing individual objects.\n\nThey occur at different conceptual levels.",
    },
    {
      title: "Static methods and method dispatch",
      content: "Static methods are not overridden in the same way as instance methods.\n\n```java\nclass Parent {\n    static void show() {\n        System.out.println(\"parent\");\n    }\n}\n\nclass Child extends Parent {\n    static void show() {\n        System.out.println(\"child\");\n    }\n}\n```\n\nThis is method hiding, not runtime overriding.\n\nThe method selected for a static call is tied to the reference/class through which the method is accessed rather than being dynamically dispatched based on the runtime object in the way an overridden instance method is.\n\nThat is one reason static methods should generally be called through the class name:\n\n```java\nParent.show();\nChild.show();\n```\n\nrather than through an object reference.\n\nIf a design requires polymorphic behavior, an instance method is usually the appropriate mechanism.",
    },
    {
      title: "static final and constants",
      content: "A common pattern is:\n\n```java\nclass Limits {\n    static final int MAX_RETRIES = 3;\n}\n```\n\n`static` means one class-level field. `final` means the field cannot be reassigned after initialization.\n\nFor a compile-time constant, Java has additional constant-variable rules, and primitive or `String` constants can be used in places where compile-time constants are required.\n\nDo not assume every `static final` field is a compile-time constant:\n\n```java\nstatic final Integer VALUE = Integer.valueOf(10);\n```\n\nThe field is final, but that does not make it a primitive/String constant variable.\n\nAlso remember that `static final` does not make an object immutable:\n\n```java\nstatic final List<String> NAMES = new ArrayList<>();\n```\n\nThe reference cannot be reassigned, but the list can still be mutated unless the list itself is made unmodifiable.",
    },
    {
      title: "Mutable static state and thread safety",
      content: "A static mutable field is shared state:\n\n```java\nclass Metrics {\n    static int count;\n}\n```\n\nEvery thread and every object in the same class-loading context can observe that state.\n\nThat creates concurrency concerns. This is not safe merely because the field is static:\n\n```java\nMetrics.count++;\n```\n\nThe increment involves reading, adding, and writing. Multiple threads can interfere.\n\nThe solution depends on the requirement: synchronization, atomic classes, concurrent collections, immutable state, or redesign may be appropriate.\n\nStatic mutable state can also make tests order-dependent. One test can change a shared field and influence another test.\n\nThis is why static state should be used deliberately. Shared state is sometimes appropriate, but it increases coupling and makes lifecycle, concurrency, and testing more important.",
    },
    {
      title: "When static is a good fit",
      content: "Static members are natural when behavior or data does not conceptually belong to a particular object.\n\nExamples include:\n\n```java\nMath.max(10, 20);\n```\n\nutility-style operations where no object state is required, and constants such as:\n\n```java\nTimeUnit.SECONDS\n```\n\nThe better question is not \"can this be static?\" but:\n\n**Does this operation require the state or identity of a particular object?**\n\nIf yes, an instance method is usually a better model.\n\nIf no, static may be appropriate.\n\nAvoid turning business logic into a collection of static methods merely because they are convenient to call. Static code can make dependency substitution, testing, and lifecycle management harder when the operation actually depends on external state or collaborators.",
    },
    {
      title: "Common misconceptions",
      content: "**Static means one copy per object.**\n\nNo. A static field is associated with the class, not each object.\n\n**Static means global across every JVM situation.**\n\nNot necessarily. Static state is associated with the class and its class-loading context. Class loaders can create separate class identities.\n\n**Static methods are overridden.**\n\nInstance methods are overridden. Static methods are hidden.\n\n**static final means immutable.**\n\nIt prevents reassignment of the field, not mutation of the referenced object.\n\n**Static is always faster.**\n\nDo not choose static based on a blanket performance claim. Correct ownership, coupling, testability, and semantics are more important.",
    },
    {
      title: "Practice: predict the state",
      content: "Consider:\n\n```java\nclass Counter {\n    static int total;\n    int value;\n\n    Counter() {\n        total++;\n        value = total;\n    }\n}\n```\n\nPredict:\n\n```java\nCounter a = new Counter();\nCounter b = new Counter();\n\nSystem.out.println(a.value);\nSystem.out.println(b.value);\nSystem.out.println(Counter.total);\n```\n\nThen change `total` from `static` to an instance field and predict again.\n\nThis exercise demonstrates the difference between state owned by the class and state owned by each object.\n\nFor deeper practice, add a static method and ask which fields it can access directly. Then add an instance method and compare the available state.",
    },
  ],
};

export default topic;

export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 33,
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