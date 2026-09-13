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
    title: "Operators",
    slug: "operators",
    description: "Detailed, human-oriented explanation of Operators. Covers the Java rule or API contract, concrete code, runtime behavior, edge cases, common misconceptions, production considerations, and interview preparation.",
    estimatedMinutes: 20,
    sections: [{"title": "What it is and why it matters", "content": "Java operators are syntax forms that combine or transform operands to produce a value or perform an assignment. They include arithmetic, unary, relational, equality, logical, bitwise, shift, assignment, conditional, and type-related operators. The important point is that the result is determined by the operand types and the operator rules; operators are part of Java expressions, not a feature of the Stream API or functional programming."}, {"title": "Concrete Java example", "content": "int a = 10;\nint b = 3;\nSystem.out.println(a / b);    // 3: integer division\nSystem.out.println(a % b);    // 1: remainder\nSystem.out.println(10.0 / b); // 3.3333333333333335"}, {"title": "How Java actually behaves", "content": "Binary numeric operators apply Java numeric promotion before the operation. For example, byte and short operands are promoted to int for most arithmetic operations. The result of integer division is truncated toward zero, while division involving a floating-point operand produces a floating-point result. Increment and decrement also have a sequencing difference: ++x increments before the value is used, while x++ yields the old value and then increments."}, {"title": "Edge cases and interview traps", "content": "Do not confuse == with equals() for objects, &&/|| with &/| for boolean expressions, or >> with >>> for signed right shifts. Another common trap is assuming compound assignment is exactly equivalent to its expanded form: byte b = 1; b += 1 compiles because compound assignment includes an implicit narrowing conversion, while b = b + 1 does not compile without a cast."}, {"title": "Production guidance", "content": "Prefer parentheses when precedence is not immediately obvious, avoid clever expressions with multiple side effects, and do not rely on overflow being detected for primitive integer arithmetic. If overflow matters, choose an appropriate wider type or an exact arithmetic API such as Math.addExact."}, {"title": "Interview-ready explanation", "content": "A strong answer for Operators should define the concept, state the Java rule or API contract, walk through the example, and finish with the most important limitation or edge case. Avoid broad claims that are not guaranteed by the Java specification or API."}, {"title": "Practice questions", "content": "1. Why is 10 / 3 equal to 3?\n2. What is the difference between ++i and i++?\n3. Why does byte + byte produce int?\n4. Why does && short-circuit but & does not?\n5. What is the difference between >> and >>>?\n6. Why is == usually wrong for comparing String values?"}],
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
