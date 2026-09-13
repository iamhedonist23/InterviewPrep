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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 6 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 6, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Primitive data types",
  slug: "primitive-data-types",
  description: "A practical guide to Primitive data types, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 30,
  sections: [
    {
      title: "The eight primitive types",
      content: `Java has eight primitive types: byte, short, int, long, float, double, char, and boolean. You will see them everywhere, but they are not interchangeable; each has its own range and behavior.

Integral types are byte, short, int, and long. Floating-point types are float and double. char represents a UTF-16 code unit. boolean represents true or false.

These types are fundamentally different from reference types because primitive variables directly represent primitive values rather than references to objects.`
    },
    {
      title: "Integral types",
      content: `byte is 8-bit signed, short is 16-bit signed, int is 32-bit signed, and long is 64-bit signed.

int is the normal choice for general integer calculations unless the range or API requires another type.

A long literal can use an L suffix when needed:

\`\`\`java
long population = 8_000_000_000L;
\`\`\`

Without the suffix, an integer literal such as 8_000_000_000 is not an int literal and must fit the rules for the literal's type.`
    },
    {
      title: "Floating-point types",
      content: `float is a 32-bit IEEE 754 floating-point type and double is a 64-bit IEEE 754 floating-point type.

double is normally preferred for general floating-point calculations because it provides greater precision.

Floating-point arithmetic is approximate. It should not be treated as exact decimal arithmetic for money. Financial calculations commonly use BigDecimal when decimal precision and rounding rules matter.`
    },
    {
      title: "char and Unicode",
      content: `char is a 16-bit UTF-16 code unit, not a universal "character" type.

Some Unicode code points require two char values represented as a surrogate pair. This is why code that assumes one char equals one user-visible character can fail for some text.

For ordinary text processing, String and the appropriate Unicode-aware APIs are generally more suitable than treating char as a complete human character.`
    },
    {
      title: "boolean",
      content: `boolean has two logical values: true and false.

Java does not define boolean as an integer type, so expressions such as if (1) are invalid.

Use boolean to represent conditions and state that is genuinely binary. Avoid encoding several unrelated meanings into one boolean when an enum or richer domain model would make the state clearer.`
    },
    {
      title: "Numeric literals and overflow",
      content: `Java supports readable numeric literals with underscores, such as:

\`\`\`java
int timeout = 1_000;
long distance = 9_000_000_000L;
\`\`\`

Integer overflow is possible because primitive integer arithmetic uses fixed-width types. For example, adding one to Integer.MAX_VALUE wraps around to Integer.MIN_VALUE.

This matters in production when processing counters, sizes, timestamps, or external numeric input.`
    },
    {
      title: "Wrappers and autoboxing",
      content: `Each primitive type has a corresponding wrapper class, such as Integer for int and Long for long.

Autoboxing lets Java convert between a primitive and its wrapper in many contexts:

\`\`\`java
Integer count = 10;
int value = count;
\`\`\`

The conversion is convenient but not free. A wrapper reference can be null, and unboxing a null wrapper causes a NullPointerException. Wrappers are also objects and can introduce allocation or memory overhead depending on the situation.`
    },
    {
      title: "Interview-ready understanding",
      content: `A good interview answer groups the primitives instead of reciting a list. Explain integral, floating-point, char, and boolean categories, then mention fixed-width overflow, floating-point precision, and the difference between primitives and wrappers.

A common trap is saying char is a full Unicode character. It is a UTF-16 code unit.`
    },
    {
      title: "Practice",
      content: `Write examples using int, long, double, char, and boolean. Demonstrate integer overflow and a floating-point precision surprise.

Then compare int with Integer and explain what happens when an Integer containing null is unboxed.`
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
  console.log("Java topic seeded successfully: 7");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
