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
  title: "Literals",
  slug: "literals",
  description: "Detailed, interview-ready explanation with Java rules, practical examples, edge cases, common mistakes, and real-world guidance.",
  estimatedMinutes: 25,
  sections: [
    { title: "Core explanation", content: "A Java literal is a value written directly in source code. Examples include `42`, `3.14`, `'A'`, `true`, `\"Java\"`, and `null`. The important detail is that a literal has a type as well as a value. An unsuffixed integer literal is normally an `int`, a decimal floating-point literal is normally a `double`, a character literal is a `char`, a string literal is a `String`, and `null` is the null reference literal. Those types affect assignment, arithmetic, overload resolution, and conversion rules." },
    { title: "Integer literal forms", content: "Java supports decimal, hexadecimal (`0x`), binary (`0b`), and octal integer literals. Underscores can improve readability, such as `1_000_000`. Integer literals are normally `int`; use `L` for a `long` value when the number is outside the `int` range or when the intended type should be explicit. Prefer uppercase `L` because lowercase `l` can look like `1`." },
    { title: "Floating-point, character, string, and boolean literals", content: "A decimal floating-point literal such as `2.5` is a `double` by default. Add `f` for a `float`. Character literals use single quotes and represent a UTF-16 code unit; escape sequences such as `'\\n'` are valid. String literals use double quotes and create `String` values. Boolean literals are only `true` and `false`; Java does not convert `0` or `1` into booleans." },
    { title: "Conversion traps", content: "Literal types interact with narrowing conversion. `byte b = 10;` compiles because the constant value is representable as a byte, while `byte b = 128;` does not. Likewise, `long x = 3_000_000_000L;` is valid, but `long x = 3_000_000_000;` fails because the unsuffixed decimal integer literal is treated as `int`. The suffix changes the literal's type; it is not just documentation." },
    { title: "Examples", content: "```java\nint count = 42;\nlong population = 8_000_000_000L;\nint hex = 0xFF;\nint binary = 0b1010;\ndouble price = 19.99;\nfloat ratio = 0.75f;\nchar grade = 'A';\nString name = \"Java\";\nboolean active = true;\nString missing = null;\n```" },
    { title: "Interview traps", content: "With `var x = 10`, the inferred type is `int`, not a generic number. With overloaded methods, the literal type can determine which overload is selected. `null` can be passed to reference-type parameters but cannot be assigned to a primitive. String pooling is related to string literals, but it is a separate runtime concept from the definition of a literal." }
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
      sortOrder: 10,
    },
    create: {
      categoryId: category.id,
      moduleId: module.id,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 10,
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
