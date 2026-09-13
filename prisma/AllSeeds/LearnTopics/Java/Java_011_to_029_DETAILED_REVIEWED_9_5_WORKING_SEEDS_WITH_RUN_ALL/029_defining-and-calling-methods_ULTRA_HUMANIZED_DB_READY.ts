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
  title: "Defining and calling methods",
  slug: "defining-and-calling-methods",
  description: "Detailed, interview-ready explanation with Java rules, practical examples, edge cases, common mistakes, and real-world guidance.",
  estimatedMinutes: 25,
  sections: [
    { title: "Core explanation", content: "A method is a named unit of behavior declared in a class or interface. A method declaration can include modifiers, a return type, a name, parameters, and a body. Calling a method evaluates its arguments, transfers control to the method, executes the body, and returns a value when the method has a non-void return type. Methods are a central mechanism for reuse, decomposition, testing, and encapsulation." },
    { title: "Parameters and return values", content: "Parameters are local variables that receive the argument values supplied by the caller. Java is strictly pass-by-value. For a primitive, the primitive value is copied. For an object, the reference value is copied, so the method can mutate the referenced object but cannot replace the caller's reference by assigning a new object to its parameter." },
    { title: "Example", content: "```java\nstatic int add(int a, int b) {\n    return a + b;\n}\n\npublic static void main(String[] args) {\n    int result = add(10, 20);\n    System.out.println(result);\n}\n```" },
    { title: "Pass-by-value example", content: "```java\nstatic void change(int x) {\n    x = 100;\n}\n\nstatic void addItem(java.util.List<String> list) {\n    list.add(\"Java\");\n}\n\nint value = 10;\nchange(value);\n// value is still 10\n\nvar names = new java.util.ArrayList<String>();\naddItem(names);\n// names now contains \"Java\"\n```" },
    { title: "Overloading", content: "Java supports method overloading when parameter lists differ. Return type alone cannot distinguish overloaded methods. The compiler chooses an applicable overload using the argument types and method-invocation conversion rules, which is why literal types and numeric conversions can affect overload selection." },
    { title: "Interview traps", content: "Never describe Java as pass-by-reference. Also do not say two methods can be overloaded solely by changing the return type; they cannot. A strong answer defines a method, explains parameters and return values, gives an example, and then covers pass-by-value and overloading as common follow-up questions." }
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
      sortOrder: 28,
    },
    create: {
      categoryId: category.id,
      moduleId: module.id,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 28,
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
