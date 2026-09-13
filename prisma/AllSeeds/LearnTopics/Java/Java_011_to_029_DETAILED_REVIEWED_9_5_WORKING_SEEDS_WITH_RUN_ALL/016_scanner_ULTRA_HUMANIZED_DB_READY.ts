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
  title: "Scanner",
  slug: "scanner",
  description: "Detailed, interview-ready explanation with Java rules, practical examples, edge cases, common mistakes, and real-world guidance.",
  estimatedMinutes: 25,
  sections: [
    { title: "Core explanation", content: "`Scanner` reads input and breaks it into tokens using a delimiter pattern. By default, whitespace separates tokens. Methods such as `next()`, `nextInt()`, and `nextDouble()` read tokens, while `nextLine()` reads the remainder of the current line. That distinction explains the classic `nextInt()` followed by `nextLine()` problem." },
    { title: "nextInt versus nextLine", content: "If the input contains `25` followed by Enter, `nextInt()` reads the integer token but does not consume the line in the same way `nextLine()` does. A subsequent `nextLine()` can therefore return the empty remainder of that line. The fix is to deliberately consume the remaining line or use line input consistently and parse it." },
    { title: "Validation and exceptions", content: "`hasNextInt()` can be used before `nextInt()` when the input format is uncertain. A token that cannot be converted to the requested numeric type can cause `InputMismatchException`. End-of-input also matters in non-interactive programs, so input loops should have a clear termination condition." },
    { title: "Resource ownership", content: "Closing a `Scanner` closes its underlying input stream. Closing a scanner around `System.in` is fine when the entire application is finished reading, but it can break another component that expects the standard input stream to remain open. Think about ownership before closing shared resources." },
    { title: "Example", content: "```java\nScanner scanner = new Scanner(System.in);\n\nSystem.out.print(\"Age: \");\nint age = scanner.nextInt();\nscanner.nextLine();\n\nSystem.out.print(\"Name: \");\nString name = scanner.nextLine();\n\nSystem.out.println(name + \" is \" + age);\n```" },
    { title: "Performance perspective", content: "`Scanner` favors convenience and parsing features rather than maximum throughput. That is usually a good trade-off for interactive programs. For very large input, buffered reading plus explicit parsing can reduce overhead. The strong interview answer is contextual: do not claim `Scanner` is universally bad or universally slow." }
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
      sortOrder: 15,
    },
    create: {
      categoryId: category.id,
      moduleId: module.id,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 15,
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
