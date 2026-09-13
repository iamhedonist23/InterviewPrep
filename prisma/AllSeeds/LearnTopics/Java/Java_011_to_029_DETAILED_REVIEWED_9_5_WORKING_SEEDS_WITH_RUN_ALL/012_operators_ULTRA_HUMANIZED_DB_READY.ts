import { PrismaClient } from "@prisma/client";
import { StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

export const topic: TopicSeed = {
  title: "Operators",
  slug: "operators",
  description: "Detailed, interview-ready explanation with Java rules, practical examples, edge cases, common mistakes, and real-world guidance.",
  estimatedMinutes: 25,
  sections: [
    { title: "Core explanation", content: "An operator is Java syntax that performs an operation on one or more operands. Java has arithmetic, relational, equality, logical, bitwise, shift, assignment, unary, and conditional operators. The operator symbol alone is not enough to predict the result: operand types, numeric promotion, short-circuiting, and evaluation order also matter." },
    { title: "Arithmetic and unary operators", content: "`+`, `-`, `*`, `/`, and `%` operate on numeric values. Integer division discards the fractional part, so `5 / 2` is `2`. `%` returns the remainder. Prefix and postfix `++`/`--` both change a variable, but they produce different values when used inside a larger expression." },
    { title: "Equality and logical operators", content: "`==` compares primitive values, but for object references it compares whether the references identify the same object. `equals()` is normally used for logical object equality when the class defines it correctly. `&&` and `||` short-circuit, so the right operand may never be evaluated." },
    { title: "String concatenation and bitwise operators", content: "`+` concatenates when a `String` participates. Because evaluation is left-to-right, `1 + 2 + \"3\"` produces `\"33\"`, while `\"1\" + 2 + 3` produces `\"123\"`. Integral bitwise and shift operators such as `&`, `|`, `^`, `~`, `<<`, `>>`, and `>>>` work at the bit level and are different from boolean short-circuit operators." },
    { title: "Examples", content: "```java\nint a = 10;\nint b = 3;\n\nSystem.out.println(a / b);       // 3\nSystem.out.println(a % b);       // 1\nSystem.out.println(1 + 2 + \"3\"); // 33\nSystem.out.println(\"1\" + 2 + 3); // 123\n\nString x = new String(\"Java\");\nString y = new String(\"Java\");\nSystem.out.println(x == y);      // false\nSystem.out.println(x.equals(y)); // true\n```" },
    { title: "Interview traps", content: "Do not say `==` always compares object values; for references it compares identity. Do not treat `&&` and `&` as interchangeable. Also remember that compound assignment such as `byte b = 1; b += 2;` includes an implicit narrowing conversion that plain `b = b + 2` does not." }
  ],
};

async function seed() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: "java-core" },
    update: {
      name: "Java (Core)",
      description: "Master Java from fundamentals through advanced JVM concepts, collections, concurrency, functional programming, I/O, and interview preparation.",
      icon: "JAVA",
      isPublished: true,
      sortOrder: 0,
    },
    create: {
      name: "Java (Core)",
      slug: "java-core",
      description: "Master Java from fundamentals through advanced JVM concepts, collections, concurrency, functional programming, I/O, and interview preparation.",
      icon: "JAVA",
      isPublished: true,
      sortOrder: 0,
    },
  });

  const path = await prisma.studyPath.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "beginner" } },
    update: {
      name: "Beginner",
      description: "Build a strong foundation in Java language fundamentals and the JVM platform.",
      level: StudyLevel.BEGINNER,
      isPublished: true,
      sortOrder: 0,
    },
    create: {
      categoryId: category.id,
      name: "Beginner",
      slug: "beginner",
      description: "Build a strong foundation in Java language fundamentals and the JVM platform.",
      level: StudyLevel.BEGINNER,
      isPublished: true,
      sortOrder: 0,
    },
  });

  const module = await prisma.studyModule.upsert({
    where: { studyPathId_slug: { studyPathId: path.id, slug: "java-fundamentals" } },
    update: {
      title: "Java Fundamentals",
      description: "Understand Java language fundamentals, syntax, control flow, methods, and the JVM platform.",
      isPublished: true,
      sortOrder: 0,
    },
    create: {
      studyPathId: path.id,
      title: "Java Fundamentals",
      slug: "java-fundamentals",
      description: "Understand Java language fundamentals, syntax, control flow, methods, and the JVM platform.",
      isPublished: true,
      sortOrder: 0,
    },
  });

  const savedTopic = await prisma.studyTopic.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: topic.slug } },
    update: {
      title: topic.title,
      moduleId: module.id,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 11,
    },
    create: {
      categoryId: category.id,
      moduleId: module.id,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 11,
      prerequisiteIds: [],
      relatedTopicIds: [],
    },
  });

  for (let index = 0; index < topic.sections.length; index += 1) {
    const section = topic.sections[index];
    await prisma.studyTopicSection.upsert({
      where: { id: `${savedTopic.id}-section-${index}` },
      update: { title: section.title, content: section.content, sortOrder: index },
      create: {
        id: `${savedTopic.id}-section-${index}`,
        topicId: savedTopic.id,
        title: section.title,
        content: section.content,
        sortOrder: index,
      },
    });
  }

  console.log(`Seeded Java topic: ${topic.title}`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
