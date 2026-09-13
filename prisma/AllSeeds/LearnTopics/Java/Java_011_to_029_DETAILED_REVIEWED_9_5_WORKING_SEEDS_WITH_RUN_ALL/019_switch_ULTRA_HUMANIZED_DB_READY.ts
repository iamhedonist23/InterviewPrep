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
  title: "switch",
  slug: "switch",
  description: "Detailed, interview-ready explanation with Java rules, practical examples, edge cases, common mistakes, and real-world guidance.",
  estimatedMinutes: 25,
  sections: [
    { title: "Core explanation", content: "`switch` selects behavior based on a selector value. Traditional colon-style cases can fall through into later cases until control leaves the switch. Modern Java also supports arrow cases and switch expressions that produce values. These forms make selection code more expressive and reduce accidental fall-through." },
    { title: "Traditional fall-through", content: "With `case X:`, matching a case does not automatically stop execution. `break`, `return`, `throw`, or another control transfer is normally needed when fall-through is not intended. Fall-through can be deliberate when multiple labels share behavior, but accidental fall-through is a common bug." },
    { title: "Modern switch expressions", content: "Arrow cases such as `case 1 ->` do not fall through. A switch expression can be assigned to a variable or returned from a method. When a block is used inside an arrow case, `yield` supplies the expression result. Enum switches are particularly useful because the possible values form a known set." },
    { title: "Example", content: "```java\nString dayType = switch (day) {\n    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> \"weekday\";\n    case SATURDAY, SUNDAY -> \"weekend\";\n};\n```" },
    { title: "Common traps", content: "Do not assume every switch case automatically stops. Distinguish a switch statement from a switch expression because only the latter produces a value. Also state the Java version when discussing newer switch features, especially pattern matching and `null` handling, because feature availability has changed across releases." }
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
      sortOrder: 18,
    },
    create: {
      categoryId: category.id,
      moduleId: module.id,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 18,
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
