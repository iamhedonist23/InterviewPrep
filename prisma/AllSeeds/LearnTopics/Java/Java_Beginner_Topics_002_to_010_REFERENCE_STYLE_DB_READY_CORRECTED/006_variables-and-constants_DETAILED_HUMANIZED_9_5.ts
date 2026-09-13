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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 5 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 5, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Variables and constants",
  slug: "variables-and-constants",
  description: "A practical guide to Variables and constants, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 25,
  sections: [
    {
      title: "What a variable represents",
      content: `A variable gives a program a name through which it can access a value of a particular type. In Java, the declaration gives the compiler information about the variable's type and name.

For example:

\`\`\`java
int age = 30;
String name = "Asha";
\`\`\`

The type determines what values can be assigned and what operations are available through the variable.`
    },
    {
      title: "Local variables, fields, and parameters",
      content: `Java variables appear in different contexts.

A local variable belongs to a method, constructor, or block. A parameter receives a value supplied to a method or constructor. A field belongs to a class or object.

These categories have different initialization rules and lifetimes. In particular, local variables do not receive the same automatic default initialization as fields; a local variable must be definitely assigned before it is read.`
    },
    {
      title: "final and constants",
      content: `The final modifier prevents a variable from being assigned a new value after its initialization.

For a primitive, this means the primitive value cannot be reassigned. For a reference, final prevents the reference from being changed to point to another object; it does not automatically make the referenced object immutable.

For example:

\`\`\`java
final int maxRetries = 3;
\`\`\`

A conventional Java constant is usually a static final field, such as:

\`\`\`java
static final int DEFAULT_TIMEOUT_SECONDS = 30;
\`\`\`

Whether an object itself is immutable is a separate question.`
    },
    {
      title: "Initialization and default values",
      content: `Instance and static fields receive default values when they are created or initialized by the JVM. For example, an int field defaults to 0 and a reference field defaults to null.

Local variables are different. Java's definite-assignment rules require a local variable to be assigned before it is read.

This distinction is a common interview trap because developers sometimes assume every variable is automatically initialized to a default value.`
    },
    {
      title: "Scope and lifetime",
      content: `Scope answers where a variable name can be referenced. Lifetime answers how long the associated state exists.

A local variable is normally limited to its enclosing method or block. An instance field exists as part of an object. A static field belongs to the class-level state.

Understanding scope prevents accidental shadowing and makes it easier to reason about which value a piece of code is actually reading.`
    },
    {
      title: "Shadowing",
      content: `A declaration can hide another declaration with the same name in an inner scope.

For example, a method parameter named name can shadow an instance field named name. The this.name expression can be used when the instance field is intended.

Shadowing is legal but excessive use can make code harder to read. Clear names are usually preferable to relying heavily on this disambiguation.`
    },
    {
      title: "Interview-ready understanding",
      content: `Explain variables through three ideas: type, storage, and scope. Then explain final precisely: it prevents reassignment of the variable, but for references it does not make the referenced object immutable.

A strong answer also distinguishes local-variable initialization from field default values.`
    },
    {
      title: "Practice",
      content: `Write a class with an instance field, a static final constant, a method parameter, and a local variable.

Then create a small example where a final reference points to a mutable object and demonstrate why final does not mean immutable.`
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
  console.log("Java topic seeded successfully: 6");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
