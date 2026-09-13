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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 4 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 4, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Keywords and identifiers",
  slug: "keywords-and-identifiers",
  description: "A practical guide to Keywords and identifiers, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 20,
  sections: [
    {
      title: "What keywords are",
      content: `Keywords are words that Java itself has claimed for the language grammar, so you cannot freely reuse them as names. They cannot normally be used as ordinary identifiers.

Examples include class, public, private, static, final, if, else, return, new, extends, implements, and throw.

Some contextual keywords are treated differently because their special meaning depends on where they appear. Modern Java also has language words associated with features such as modules and records that should be understood in context rather than memorized as one undifferentiated list.`
    },
    {
      title: "What identifiers are",
      content: `An identifier is a name chosen by the programmer for a program element such as a variable, method, class, interface, package component, or field.

For example:

\`\`\`java
int employeeCount;
String employeeName;
\`\`\`

employeeCount and employeeName are identifiers.

Identifiers have lexical rules about which characters can be used and where. Java also distinguishes identifiers from literals, operators, separators, and keywords.`
    },
    {
      title: "Naming conventions",
      content: `Java's naming conventions are not the same thing as compiler requirements.

Classes and interfaces commonly use PascalCase, methods and variables commonly use lowerCamelCase, constants commonly use UPPER_SNAKE_CASE, and packages commonly use lowercase names.

Following conventions improves readability because another developer can infer what kind of declaration they are looking at without reading every surrounding line.`
    },
    {
      title: "Keywords cannot be used as normal names",
      content: `A declaration such as:

\`\`\`java
int class = 10;
\`\`\`

is invalid because class is a Java keyword.

The compiler rejects the source before execution. This is different from a poor naming choice that is legal but confusing.

When an identifier conflicts with a reserved language word, choose a descriptive alternative rather than trying to work around the language grammar.`
    },
    {
      title: "Common naming mistakes",
      content: `Names such as x, data, temp, value, and obj are sometimes appropriate for very small scopes, but they become weak choices when the meaning is important.

A method named process() may hide what it actually does. A name such as calculateInvoiceTotal() communicates intent more directly.

Good naming is part of maintainability. It reduces the amount of surrounding code a reader must inspect to understand a piece of logic.`
    },
    {
      title: "Interview-ready understanding",
      content: `A clear interview explanation is: keywords are language-defined words that have special grammatical meaning, while identifiers are programmer-defined names for program elements.

Then give one example of each and mention that naming conventions improve readability even though many conventions are not compiler-enforced.`
    },
    {
      title: "Practice",
      content: `Create examples containing valid and invalid identifiers. Include a keyword used incorrectly, a valid class name, a valid method name, and a constant name.

For each one, explain whether the issue is a Java language rule or simply a style convention.`
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
  console.log("Java topic seeded successfully: 5");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
