import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};
type ModuleSeed = { title: string; slug: string; description: string; topics?: TopicSeed[] };
type PathSeed = { name: string; slug: string; description: string; level: StudyLevel; modules: ModuleSeed[] };
type CategorySeed = { name: string; slug: string; description: string; icon: string; sortOrder: number; paths: PathSeed[] };

async function ensureCategory(category: CategorySeed) {
  const createdCategory = await prisma.studyCategory.upsert({
    where: { slug: category.slug },
    update: { name: category.name, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
    create: { name: category.name, slug: category.slug, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
  });
  for (const pathSeed of category.paths) {
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: createdCategory.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
      create: { categoryId: createdCategory.id, name: pathSeed.name, slug: pathSeed.slug, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
    });
    for (const moduleSeed of pathSeed.modules) {
      const module = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
        create: { studyPathId: path.id, title: moduleSeed.title, slug: moduleSeed.slug, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
      });
      for (const topicSeed of moduleSeed.topics ?? []) {
        const savedTopic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: createdCategory.id, slug: topicSeed.slug } },
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 3 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 3, prerequisiteIds: [], relatedTopicIds: [] },
        });
        for (let index = 0; index < (topicSeed.sections ?? []).length; index += 1) {
          const section = topicSeed.sections![index];
          await prisma.studyTopicSection.upsert({
            where: { id: `${savedTopic.id}-section-${index}` },
            update: { title: section.title, content: section.content, sortOrder: index },
            create: { id: `${savedTopic.id}-section-${index}`, topicId: savedTopic.id, title: section.title, content: section.content, sortOrder: index },
          });
        }
      }
    }
  }
}

export const topic: TopicSeed = {
  title: "Java program structure",
  slug: "java-program-structure",
  description: "A practical guide to Java program structure, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 25,
  sections: [
    {
      title: "The basic structure of a Java program",
      content: `At a high level, a Java program is made up of types—classes, interfaces, records, enums, and annotations—that work together. Classes commonly contain fields, constructors, methods, nested types, and initialization logic.

A minimal executable class can look like this:

\`\`\`java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}
\`\`\`

The class declaration defines the type. The main method is the conventional entry point used by the Java launcher for a standalone application.`
    },
    {
      title: "Package declarations",
      content: `A package groups related types and provides a namespace.

For example:

\`\`\`java
package com.example.orders;

class OrderService {
}
\`\`\`

The package declaration normally appears at the beginning of the source file before imports and type declarations.

Packages are more than folders. They participate in Java's type naming and access-control model. The fully qualified name of a type includes its package name.`
    },
    {
      title: "Imports",
      content: `An import lets source code refer to a type by its simple name instead of repeatedly writing its fully qualified name.

For example:

\`\`\`java
import java.util.ArrayList;

class Example {
    ArrayList<String> names = new ArrayList<>();
}
\`\`\`

The import does not copy a class into the program and does not control which library is packaged at runtime. It is primarily a source-level naming convenience.`
    },
    {
      title: "Classes, fields, constructors, and methods",
      content: `A class can contain state and behavior.

A field represents state associated with the class or an object. A constructor establishes an object's initial state. A method represents an operation.

For example, an Order class might have an id field, a constructor that requires the id, and a calculateTotal method.

Good structure separates responsibilities. A class that validates requests, talks directly to several databases, formats HTTP responses, and publishes messages may become difficult to test and maintain even though the Java syntax is valid.`
    },
    {
      title: "The main method",
      content: `The traditional launcher entry point is:

public static void main(String[] args)

public makes the method accessible to the launcher, static means it can be invoked without creating an instance of the class, void means it returns no value, and String[] args receives command-line arguments.

The parameter name args is not special. The type and method signature are what matter for the conventional application entry point.`
    },
    {
      title: "Source file and public type rules",
      content: `Java source files have naming rules that matter when a public top-level class is declared. A public class named Hello is normally stored in Hello.java.

This rule is about the relationship between the source file and the public top-level type. It is separate from the general idea that every Java source file can contain only one class; a source file can contain multiple top-level declarations subject to Java's access and file-name rules.`
    },
    {
      title: "Interview-ready understanding",
      content: `When explaining Java program structure, describe the hierarchy rather than memorizing keywords: package organizes names, imports simplify references, types define program structure, fields hold state, constructors initialize objects, methods provide behavior, and main is the conventional entry point for a launched application.

Then explain how this structure supports maintainability and access control in a real codebase.`
    },
    {
      title: "Practice",
      content: `Create a small Order class with a private id field, a constructor, and a method that prints the order id. Put it in a named package and import it from another class.

Then explain which parts belong to source organization and which parts affect runtime behavior.`
    },
  ],
};

async function seedJavaTopic() {
  const javaCategory: CategorySeed = {
    name: "Java (Core)",
    slug: "java-core",
    description: "Master Core Java from basics to advanced: OOP, Collections, Exceptions, I/O, Concurrency, Generics, and more.",
    icon: "JAVA",
    sortOrder: 0,
    paths: [{
      name: "Beginner",
      slug: "beginner",
      description: "Learn Java syntax, OOP fundamentals, and essential APIs.",
      level: StudyLevel.BEGINNER,
      modules: [{
        title: "Java Fundamentals",
        slug: "java-fundamentals",
        description: "Variables, data types, operators, control flow, arrays, and strings.",
        topics: [topic],
      }],
    }],
  };
  await ensureCategory(javaCategory);
  console.log("Java topic seeded successfully: 4");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
