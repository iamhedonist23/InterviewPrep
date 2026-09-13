import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

async function seed() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: "java" },
    update: { name: "Java", description: "Human-oriented Java curriculum with topic-specific explanations, concrete examples, edge cases, production guidance, and interview preparation.", icon: "JAVA", isPublished: true, sortOrder: 0 },
    create: { name: "Java", slug: "java", description: "Human-oriented Java curriculum with topic-specific explanations, concrete examples, edge cases, production guidance, and interview preparation.", icon: "JAVA", isPublished: true, sortOrder: 0 },
  });

  const path = await prisma.studyPath.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "beginner" } },
    update: { name: "Beginner", description: "Java learning path.", level: StudyLevel.BEGINNER, isPublished: true, sortOrder: 0 },
    create: { categoryId: category.id, name: "Beginner", slug: "beginner", description: "Java learning path.", level: StudyLevel.BEGINNER, isPublished: true, sortOrder: 0 },
  });

  const module = await prisma.studyModule.upsert({
    where: { studyPathId_slug: { studyPathId: path.id, slug: "java-fundamentals" } },
    update: { title: "Java Fundamentals", description: "Topic-specific Java study.", isPublished: true, sortOrder: 0 },
    create: { studyPathId: path.id, title: "Java Fundamentals", slug: "java-fundamentals", description: "Topic-specific Java study.", isPublished: true, sortOrder: 0 },
  });

  const topic: TopicSeed = {
    title: "Scanner",
    slug: "scanner",
    description: "Detailed, human-oriented explanation of Scanner. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "`java.util.Scanner` is a token-oriented parser that can read primitive values and strings from a `Readable` or input stream. It splits input using a delimiter pattern, which is whitespace by default, and its next-type methods convert tokens to requested types."}, {"title": "Concrete Java example", "content": "try (Scanner scanner = new Scanner(System.in)) {\n    int age = scanner.nextInt();\n    scanner.nextLine(); // consume the remainder of the line\n    String name = scanner.nextLine();\n    System.out.println(name + \" is \" + age);\n}"}, {"title": "How Java actually behaves", "content": "Scanner performs parsing rather than merely returning raw characters. `hasNextInt()` can be used to check whether the next token can be parsed as an int before calling `nextInt()`. `nextLine()` advances past the current line separator and returns the remaining line content. When an InputStream is used, Scanner converts bytes to characters using the selected charset."}, {"title": "Edge cases and interview traps", "content": "Do not treat Scanner as a high-performance general-purpose parser. Do not mix token methods and line methods without understanding the delimiter and line-boundary behavior. A failed numeric parse leaves the offending token available, so recovery code must consume or otherwise handle it."}, {"title": "Production guidance", "content": "Scanner is excellent for teaching, command-line tools, and modest input volumes. For large files or competitive-programming-style high-volume input, a buffered or custom parser may be more appropriate. Specify a charset when the source encoding matters."}, {"title": "Interview-ready explanation", "content": "A strong answer for Scanner should define the concept, state the Java rule or API contract, walk through the example, and finish with the most important limitation or edge case. Avoid broad claims that are not guaranteed by the Java specification or API."}, {"title": "Practice questions", "content": "1. What does Scanner tokenize?\n2. What is the default delimiter?\n3. Why can nextInt() followed by nextLine() return an empty string?\n4. What does hasNextInt() protect you from?\n5. How does Scanner handle charset conversion?"}],
  };

  const savedTopic = await prisma.studyTopic.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: topic.slug } },
    update: { title: topic.title, moduleId: module.id, seoDescription: topic.description, estimatedMinutes: topic.estimatedMinutes, isPublished: true, sortOrder: 0 },
    create: { categoryId: category.id, moduleId: module.id, title: topic.title, slug: topic.slug, seoDescription: topic.description, estimatedMinutes: topic.estimatedMinutes, isPublished: true, sortOrder: 0, prerequisiteIds: [], relatedTopicIds: [] },
  });

  for (let index = 0; index < topic.sections.length; index += 1) {
    const section = topic.sections[index];
    await prisma.studyTopicSection.upsert({
      where: { id: `${savedTopic.id}-section-${index}` },
      update: { title: section.title, content: section.content, sortOrder: index },
      create: { id: `${savedTopic.id}-section-${index}`, topicId: savedTopic.id, title: section.title, content: section.content, sortOrder: index },
    });
  }

  console.log(`Seeded: ${topic.title}`);
}

seed()
  .catch((error) => {
    console.error("Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
