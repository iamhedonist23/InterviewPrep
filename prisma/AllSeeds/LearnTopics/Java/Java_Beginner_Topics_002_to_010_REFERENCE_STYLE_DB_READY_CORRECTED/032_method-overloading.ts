import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 32/356
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
  title: "Method overloading",
  slug: "method-overloading",
  description: "Learn how Java uses method overloading to provide multiple methods with the same name, how the compiler chooses an applicable overload, how primitive conversions and reference types affect the choice, and where ambiguity appears.",
  estimatedMinutes: 50,
  sections: [
    {
      title: "What overloading means",
      content: "Method overloading means declaring multiple methods with the same name but different parameter lists.\n\n```java\nstatic int add(int a, int b) {\n    return a + b;\n}\n\nstatic double add(double a, double b) {\n    return a + b;\n}\n```\n\nThe caller can use the same meaningful operation name while supplying different types of input.\n\n```java\nadd(2, 3);       // int version\nadd(2.5, 3.5);   // double version\n```\n\nThe compiler chooses the overload based on the argument expressions and the available method signatures.\n\nA critical rule is that **return type alone cannot overload a method**:\n\n```java\n// int getValue()\n// double getValue()\n```\n\nThese have the same name and parameter list, so they conflict.",
    },
    {
      title: "What makes two methods different",
      content: "The parameter list includes the number, types, and order of parameters.\n\nThese are overloads:\n\n```java\nvoid print(int value)\nvoid print(long value)\nvoid print(int value, int count)\nvoid print(String value)\n```\n\nChanging only parameter names is not enough:\n\n```java\n// void print(int x)\n// void print(int y)\n```\n\nThose describe the same signature for overloading purposes.\n\nChanging only the return type is also not enough.\n\nThis matters because overload resolution must be deterministic. The compiler needs to know which method declaration a call refers to without using the eventual return assignment as the primary selector.",
    },
    {
      title: "How the compiler chooses an overload",
      content: "Consider:\n\n```java\nstatic void show(int value) {\n    System.out.println(\"int\");\n}\n\nstatic void show(long value) {\n    System.out.println(\"long\");\n}\n\nshow(10);\n```\n\nThe integer literal `10` is an `int`, so the `int` overload is the natural applicable method.\n\nWith:\n\n```java\nshow(10L);\n```\n\nthe argument is a `long`, so the `long` overload is selected.\n\nJava considers language-defined method invocation conversions. Widening can make another overload applicable:\n\n```java\nstatic void show(long value) {\n}\n\nint x = 10;\nshow(x); // int can widen to long\n```\n\nBut Java does not freely convert unrelated types such as `String` to `int`.\n\nThe important learning point is that overload selection is a compile-time process based on the types and forms of the arguments.",
    },
    {
      title: "Primitive overloads and widening",
      content: "Primitive overloads become interesting when several widening conversions are possible.\n\n```java\nstatic void test(long value) {\n    System.out.println(\"long\");\n}\n\nstatic void test(double value) {\n    System.out.println(\"double\");\n}\n\ntest(10);\n```\n\nAn `int` can widen to both `long` and `double`, but `long` is the more specific widening step for this call, so the `long` overload is chosen.\n\nDo not generalize this into \"Java always chooses the numerically closest type.\" Overload resolution has defined phases and rules. When overloads become complicated, reason from the actual parameter types and permitted conversions rather than intuition.\n\nA particularly useful practice is to change one literal:\n\n```java\ntest(10);   // int\ntest(10L);  // long\ntest(10.0); // double\n```\n\nand observe how the compile-time type changes the selected overload.",
    },
    {
      title: "Reference overloads",
      content: "Overloading also works with reference types:\n\n```java\nstatic void send(Object value) {\n    System.out.println(\"Object\");\n}\n\nstatic void send(String value) {\n    System.out.println(\"String\");\n}\n\nsend(\"hello\"); // String\n```\n\nA `String` argument can be used where `Object` is expected, but the `String` overload is more specific.\n\nThe compile-time type of the expression matters:\n\n```java\nObject value = \"hello\";\nsend(value);\n```\n\nNow the compile-time type is `Object`, so the `Object` overload is selected.\n\nThis is a useful distinction:\n\n- The actual object at runtime is still a `String`.\n- Overload resolution occurs using compile-time information.\n- Runtime polymorphism is a separate mechanism.\n\nConfusing overload resolution with overriding is a common source of incorrect predictions.",
    },
    {
      title: "Overloading is not overriding",
      content: "Overloading happens when multiple methods with the same name have different parameter lists.\n\nOverriding happens when a subclass provides a new implementation for an inherited instance method with the same signature.\n\nFor example:\n\n```java\nclass Parent {\n    void speak() {\n        System.out.println(\"parent\");\n    }\n}\n\nclass Child extends Parent {\n    @Override\n    void speak() {\n        System.out.println(\"child\");\n    }\n}\n```\n\nThat is overriding.\n\nBy contrast:\n\n```java\nvoid speak()\nvoid speak(String message)\n```\n\nis overloading.\n\nA useful shortcut is:\n\n**Overloading is resolved at compile time; overriding participates in runtime method dispatch for instance methods.**\n\nKeeping these mechanisms separate prevents many Java method-resolution mistakes.",
    },
    {
      title: "Varargs and ambiguous calls",
      content: "Varargs can participate in overload resolution:\n\n```java\nstatic void log(String message) {\n    System.out.println(\"one\");\n}\n\nstatic void log(String... messages) {\n    System.out.println(\"many\");\n}\n\nlog(\"hello\"); // fixed-arity method\n```\n\nThe fixed-arity method is preferred when it is applicable.\n\nOverloads can also become ambiguous. For example:\n\n```java\nstatic void test(Integer value) {}\nstatic void test(String value) {}\n\n// test(null); // ambiguous\n```\n\n`null` is compatible with both `Integer` and `String`, and neither reference type is more specific than the other.\n\nThis is one reason excessive overloading can hurt API readability. A family of overloads should make valid calls obvious rather than forcing callers to understand complicated compiler rules.",
    },
    {
      title: "Good use of overloading",
      content: "Overloading works best when methods represent the same conceptual operation.\n\nFor example:\n\n```java\nsave(User user);\nsave(User user, boolean validate);\n```\n\nThe shared name communicates that both methods perform the same broad operation.\n\nIt becomes harder to read when unrelated behavior is hidden behind the same name:\n\n```java\nprocess(String value);\nprocess(File file);\nprocess(Connection connection);\n```\n\nThis may be valid Java, but the API could become difficult to understand if the operations have very different semantics.\n\nA good overload family usually has:\n\n- one clear conceptual operation;\n- predictable parameter differences;\n- behavior that remains consistent across overloads;\n- no surprising conversions;\n- limited ambiguity.\n\nOverloading is a readability tool, not a reason to create as many signatures as possible.",
    },
    {
      title: "Practice: predict the selected method",
      content: "Predict each result before compiling:\n\n```java\nstatic void show(int x) {\n    System.out.println(\"int\");\n}\n\nstatic void show(long x) {\n    System.out.println(\"long\");\n}\n\nshow(1);\nshow(1L);\n```\n\nNow:\n\n```java\nstatic void show(Object x) {\n    System.out.println(\"object\");\n}\n\nstatic void show(String x) {\n    System.out.println(\"string\");\n}\n\nObject value = \"Java\";\nshow(value);\nshow(\"Java\");\n```\n\nFinally:\n\n```java\nstatic void test(Integer x) {}\nstatic void test(String x) {}\n\n// test(null);\n```\n\nThe last call fails because both overloads are applicable and neither is more specific.\n\nIf you can explain each result using the argument's compile-time type and overload rules, you understand overloading rather than merely recognizing its syntax.",
    },
  ],
};

export default topic;

export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 31,
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