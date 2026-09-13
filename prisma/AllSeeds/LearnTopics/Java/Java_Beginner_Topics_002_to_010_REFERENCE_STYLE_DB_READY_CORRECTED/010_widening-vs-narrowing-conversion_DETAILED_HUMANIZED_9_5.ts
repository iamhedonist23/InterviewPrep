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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 9 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 9, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Widening vs narrowing conversion",
  slug: "widening-vs-narrowing-conversion",
  description: "A practical guide to Widening vs narrowing conversion, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 30,
  sections: [
    {
      title: "The fundamental difference",
      content: `A widening conversion moves a value into a type that can generally accommodate the source value, so Java can often perform the conversion for you.

A narrowing conversion moves to a type with a smaller range or less precision and generally requires an explicit cast.

For example:

\`\`\`java
int count = 100;
long total = count;
\`\`\`

The int-to-long conversion is widening.

By contrast:

\`\`\`java
double price = 19.99;
int whole = (int) price;
\`\`\`

is narrowing and requires an explicit cast.`
    },
    {
      title: "Widening primitive conversions",
      content: `Java permits several widening numeric conversions automatically, such as int to long and int to double.

Because the target type can represent the source range in the relevant conversion model, an explicit cast is normally unnecessary.

However, widening does not always mean mathematically exact for floating-point targets. Converting a large long to double can lose integer precision because double has a finite significand.`
    },
    {
      title: "Narrowing primitive conversions",
      content: `Narrowing conversions require care because the target type may not represent every source value.

For example:

\`\`\`java
long value = 130L;
byte result = (byte) value;
\`\`\`

The byte range is much smaller than the long range, so the resulting value can differ from the original value because of the conversion rules.

Similarly, converting double to int discards the fractional part and can produce a value outside the int range according to Java's floating-to-integral conversion rules.`
    },
    {
      title: "Why explicit casts are required",
      content: `The explicit cast makes the potential information loss visible in the source code.

For example:

\`\`\`java
double average = 12.8;
int value = (int) average;
\`\`\`

The cast communicates that the programmer intentionally wants an integer result.

This is not merely syntax. It is a signal to reviewers that a representation change is taking place and that the consequences should have been considered.`
    },
    {
      title: "Promotion in arithmetic expressions",
      content: `Java also performs numeric promotion when evaluating expressions.

For example, byte and short operands are generally promoted to int for arithmetic operations:

\`\`\`java
byte a = 10;
byte b = 20;
int sum = a + b;
\`\`\`

The result of a + b is int, so assigning it directly to byte would require an additional conversion and may be rejected.

Understanding promotion prevents surprises when working with small integer types.`
    },
    {
      title: "Widening reference conversion",
      content: `Reference types also have widening conversions. A subclass reference can be assigned to a superclass or implemented interface reference.

For example:

\`\`\`java
ArrayList<String> names = new ArrayList<>();
List<String> list = names;
\`\`\`

The object remains an ArrayList, but the reference is viewed as List.

This is useful because code can depend on an abstraction instead of a concrete implementation.`
    },
    {
      title: "Common mistakes",
      content: `Do not assume every widening conversion preserves exact numeric information. Floating-point representation can still lose precision.

Do not assume a narrowing cast rounds values. Casting a positive double to int truncates the fractional portion.

Also distinguish widening and narrowing from boxing and unboxing. Converting int to Integer is boxing, not widening.`
    },
    {
      title: "Interview-ready understanding",
      content: `A concise explanation is: widening generally moves to a compatible type with a broader range and can often happen implicitly; narrowing moves to a more restrictive representation and normally requires an explicit cast because information may be lost.

Give one primitive example and one reference example, then mention numeric promotion as a related rule.`
    },
    {
      title: "Practice",
      content: `Predict the result of int-to-long, long-to-double, double-to-int, and long-to-byte conversions.

Then explain why byte + byte produces an int and why ArrayList<String> can be assigned to List<String> without an explicit cast.`
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
  console.log("Java topic seeded successfully: 10");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
