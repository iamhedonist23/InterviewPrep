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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 8 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 8, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Type casting",
  slug: "type-casting",
  description: "A practical guide to Type casting, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 30,
  sections: [
    {
      title: "What casting means",
      content: `Type casting is where you explicitly tell Java to treat a value as another compatible type. The important part is understanding what is actually being converted and what can go wrong.

Casting is especially important with numeric primitives and with references in an inheritance hierarchy.

The key question is not simply "can I cast this?" but whether the conversion is safe, whether information can be lost, and whether the runtime object actually has the target reference type.`
    },
    {
      title: "Primitive casting",
      content: `Primitive casting converts one primitive numeric type to another.

For example:

\`\`\`java
double price = 19.99;
int roundedDown = (int) price;
\`\`\`

The fractional part is discarded, so the result is 19.

Casting does not round to the nearest integer. It performs the conversion defined for the primitive types involved.

When narrowing from a wider integer type to a smaller one, the result can also lose high-order information.`
    },
    {
      title: "Reference upcasting",
      content: `Upcasting treats a more specific object as an instance of a more general type.

For example:

\`\`\`java
Dog dog = new Dog();
Animal animal = dog;
\`\`\`

No explicit cast is required because every Dog is an Animal when Dog extends Animal.

The object remains a Dog. Only the reference's compile-time view has become Animal, so methods available through the Animal reference are limited to what Animal exposes.`
    },
    {
      title: "Reference downcasting",
      content: `Downcasting attempts to treat a general reference as a more specific type:

\`\`\`java
Animal animal = new Dog();
Dog dog = (Dog) animal;
\`\`\`

This is valid because the actual object is a Dog.

But:

\`\`\`java
Animal animal = new Cat();
Dog dog = (Dog) animal;
\`\`\`

compiles because the types are related, but fails at runtime with ClassCastException.

A cast cannot change the object's actual runtime class. It only requests a different reference type.`
    },
    {
      title: "instanceof and pattern matching",
      content: `When the runtime type is uncertain, instanceof can test it before a downcast.

For example:

if (animal instanceof Dog dog) {
    dog.bark();
}

This combines the type test and the usable pattern variable.

If code is constantly checking concrete types and casting them back and forth, that is often a sign that the API could expose better polymorphic behavior instead.`
    },
    {
      title: "Casting does not fix incompatible types",
      content: `A cast cannot make unrelated types compatible just because the programmer wants them to be.

For primitives, Java defines specific numeric conversions. For references, the types must satisfy Java's casting-conversion rules.

If the actual runtime object does not match the requested reference type, the JVM can throw ClassCastException.

The safest approach is to understand the object model first and use casting only when the type relationship is meaningful.`
    },
    {
      title: "Common interview traps",
      content: `One common mistake is saying that casting changes the object. It does not.

Another is saying that downcasting always fails. It fails when the runtime object is not an instance of the target type.

A third mistake is confusing numeric conversion with reference casting. They are different mechanisms with different failure behavior.`
    },
    {
      title: "Interview-ready understanding",
      content: `A strong answer distinguishes primitive casting from reference casting. Primitive narrowing can lose information. Reference upcasting is normally safe, while downcasting requires the runtime object to actually be compatible with the target type.

Mention instanceof when the runtime type is uncertain and explain that a cast changes the reference's type view, not the object's actual class.`
    },
    {
      title: "Practice",
      content: `Create an Animal hierarchy with Dog and Cat. Demonstrate safe upcasting, successful downcasting, failed downcasting, and an instanceof check.

Then create an int-to-double widening conversion and a double-to-int narrowing conversion and explain what information is preserved or lost.`
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
  console.log("Java topic seeded successfully: 9");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
