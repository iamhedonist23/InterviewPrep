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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 7 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 7, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Reference types",
  slug: "reference-types",
  description: "A practical guide to Reference types, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 30,
  sections: [
    {
      title: "What a reference type means",
      content: `A reference-type variable should be thought of as a way to reach an object, not as the object itself. Its value can also be null, meaning it currently refers to no object.

Classes, interfaces, arrays, enums, records, and other object-based types are reference types.

For example:

\`\`\`java
String name = "Asha";
\`\`\`

The variable name refers to a String object. The variable itself is not the String object's complete storage.`
    },
    {
      title: "References and objects",
      content: `A reference and an object are different concepts.

Consider:

\`\`\`java
Person first = new Person();
Person second = first;
\`\`\`

There is one Person object and two references to it. If the object has mutable state, changing it through first can be observed through second because both references point to the same object.

Once this distinction is clear, a lot of otherwise confusing Java behavior becomes easier to predict.`
    },
    {
      title: "null",
      content: `null means that a reference does not currently refer to an object.

Calling an instance method through a null reference normally results in NullPointerException:

\`\`\`java
String name = null;
name.length();
\`\`\`

The compiler allows this because the type is valid. The failure occurs at runtime when the dereference is attempted.

Good Java code establishes clear nullability expectations and validates external or optional values at appropriate boundaries.`
    },
    {
      title: "Assignment and parameter passing",
      content: `Java is always pass-by-value. For a reference type, the value being copied is the reference.

If a method receives a Person reference and changes a field on that Person object, the caller can observe the object mutation. But if the method assigns its parameter to a different Person object, that reassignment does not change the caller's reference.

This distinction explains many confusing interview questions about "pass-by-reference" in Java.`
    },
    {
      title: "Mutable vs immutable objects",
      content: `Reference types can point to mutable or immutable objects.

String is immutable: operations that appear to change a String actually produce another String value.

A mutable object can have its internal state changed after construction. Sharing mutable objects across components can therefore create coupling and concurrency risks.

Immutability often simplifies reasoning because an object can be shared without worrying that another piece of code will change its state.`
    },
    {
      title: "Reference equality vs logical equality",
      content: `The == operator compares references when used with reference types. It answers whether two references identify the same object.

The equals method is used for logical equality when the class defines it appropriately.

For example, two distinct String objects can contain the same characters while == is false and equals returns true.

Using == when value equality is intended is a common Java bug and interview trap.`
    },
    {
      title: "Garbage collection and reachability",
      content: `Java objects become eligible for garbage collection when they are no longer reachable through the application's live object graph.

Assigning null to a reference does not immediately free the object. It only changes that particular reference.

Garbage collection is automatic, but resource management is not solved completely by GC. Files, sockets, database connections, and other external resources should be managed explicitly, commonly with try-with-resources.`
    },
    {
      title: "Interview-ready understanding",
      content: `Explain reference types using three ideas: references point to objects, references can be null, and multiple references can point to the same mutable object.

Then distinguish Java's pass-by-value rule, == reference comparison, and equals logical comparison.`
    },
    {
      title: "Practice",
      content: `Create two references to one mutable object and change the object through one reference. Then create two separate objects with the same logical value and compare them using == and equals.

Finally, pass a reference into a method and demonstrate both object mutation and parameter reassignment.`
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
  console.log("Java topic seeded successfully: 8");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
