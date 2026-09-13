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
    title: "Input and output",
    slug: "input-and-output",
    description: "Detailed, human-oriented explanation of Input and output. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "Java input/output (I/O) is the set of APIs used to move data between a Java program and an external source or destination such as the console, a file, a socket, or another stream. At the API level, Java separates byte-oriented I/O (`InputStream`/`OutputStream`) from character-oriented I/O (`Reader`/`Writer`). Higher-level classes such as `Scanner`, `BufferedReader`, and `PrintStream` build more convenient behavior on top of these primitives."}, {"title": "Concrete Java example", "content": "Scanner scanner = new Scanner(System.in);\nSystem.out.print(\"Age: \");\nint age = scanner.nextInt();\nSystem.out.println(\"Age = \" + age);"}, {"title": "How Java actually behaves", "content": "`System.in` is an InputStream, while `System.out` is a PrintStream. `Scanner(InputStream)` converts bytes to characters using a charset and tokenizes the input; its default delimiter is whitespace. `BufferedReader` works with characters and reads lines, while `InputStreamReader` bridges bytes to characters and performs charset decoding. BufferedReader is specifically intended to reduce the cost of repeated reads from an underlying Reader."}, {"title": "Edge cases and interview traps", "content": "The classic Scanner trap is mixing nextInt() and nextLine(): nextInt() consumes the integer token but leaves the line separator, so the following nextLine() can return an empty string. Scanner also throws InputMismatchException when the next token cannot be converted to the requested primitive type. Closing a Scanner closes its underlying input source, so closing a Scanner wrapping System.in can make System.in unavailable to later code."}, {"title": "Production guidance", "content": "Choose the I/O abstraction based on the data and workload. For simple interactive programs, Scanner is convenient. For line-oriented or higher-volume text input, BufferedReader is often a better fit. For files, prefer NIO.2 APIs such as Files.newBufferedReader(path, charset) when appropriate. Always make charset choices explicit when exchanging text across systems rather than assuming every environment uses the same default charset."}, {"title": "Interview-ready explanation", "content": "A strong answer for Input and output should define the concept, state the Java rule or API contract, walk through the example, and finish with the most important limitation or edge case. Avoid broad claims that are not guaranteed by the Java specification or API."}, {"title": "Practice questions", "content": "1. What are System.in, System.out, and System.err?\n2. Why does nextInt() followed by nextLine() surprise developers?\n3. Scanner vs BufferedReader?\n4. InputStream vs Reader?\n5. Why does character encoding matter?\n6. What happens when a Scanner wrapping System.in is closed?"}],
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
