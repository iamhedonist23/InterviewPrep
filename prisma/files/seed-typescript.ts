import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: StudyLevel;
  modules: ModuleSeed[];
};

async function ensureCategory(category: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
}) {
  const createdCategory = await prisma.studyCategory.upsert({
    where: { slug: category.slug },
    update: { name: category.name, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
    create: {
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      isPublished: true,
      sortOrder: category.sortOrder,
    },
  });

  for (const pathSeed of category.paths) {
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: createdCategory.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
      create: {
        categoryId: createdCategory.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: 0,
      },
    });

    for (const moduleSeed of pathSeed.modules) {
      const module = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          isPublished: true,
          sortOrder: 0,
        },
      });

      for (const topicSeed of moduleSeed.topics) {
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: createdCategory.id, slug: topicSeed.slug } },
          update: {
            title: topicSeed.title,
            moduleId: module.id,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        for (let index = 0; index < topicSeed.sections.length; index += 1) {
          const section = topicSeed.sections[index];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${index}` },
            update: { title: section.title, content: section.content, sortOrder: index },
            create: {
              id: `${topic.id}-section-${index}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: index,
            },
          });
        }
      }
    }
  }
}

async function seedTypeScriptCategory() {
  const typeScriptCategory = {
    name: "TypeScript Fundamentals",
    slug: "typescript-fundamentals",
    description: "Learn type safety, interfaces, generics, and practical TypeScript patterns for modern apps.",
    icon: "TS",
    sortOrder: 5,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Strengthen static typing and safer application design.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "TypeScript Basics",
            slug: "typescript-basics",
            description: "Understand types and compile-time safety.",
            topics: [
              {
                title: "Types and Interfaces",
                slug: "typescript-types-interfaces",
                shortDescription: "Describe data shapes and function contracts.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Why type safety matters", content: "TypeScript helps catch mismatches early, at compile time instead of runtime. This reduces production bugs and makes larger codebases easier to refactor with confidence." },
                  { title: "Interfaces", content: "Interfaces describe the shape of an object and help unify contracts between callers and implementations.\n\nExample:\ninterface User {\n  id: number;\n  name: string;\n  email?: string; // optional\n}" },
                  { title: "Type aliases vs interfaces", content: "type aliases can describe primitives, unions, and tuples in addition to object shapes; interfaces are limited to object/class shapes but support declaration merging. In practice, either works for most object shapes." },
                  { title: "Readonly and optional properties", content: "readonly prevents reassignment after creation; the ? suffix marks a property as optional.\n\nExample:\ninterface Config {\n  readonly apiUrl: string;\n  timeout?: number;\n}" },
                  { title: "Type inference", content: "TypeScript infers types automatically from initial values, so explicit annotations aren't always required — but adding them for function signatures improves readability and catches mistakes at call sites." },
                  { title: "any vs unknown", content: "any disables type checking entirely and should be avoided. unknown also accepts any value but forces you to narrow the type before using it, keeping type safety intact." }
                ]
              },
              {
                title: "Union and Intersection Types",
                slug: "typescript-union-intersection",
                shortDescription: "Combine types to express complex constraints.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Union types", content: "A union type (A | B) means the value is either type A or type B. Discriminated unions help narrow the type in conditionals.\n\nExample:\ntype Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; side: number };" },
                  { title: "Narrowing with discriminants", content: "Switching on a common literal property (like kind) lets TypeScript infer which variant of the union you're working with inside each branch.\n\nExample:\nfunction area(s: Shape) {\n  switch (s.kind) {\n    case 'circle': return Math.PI * s.radius ** 2;\n    case 'square': return s.side * s.side;\n  }\n}" },
                  { title: "Intersection types", content: "An intersection type (A & B) means the value has all properties of both A and B. Intersections are useful for combining smaller interfaces into a richer shape.\n\nExample:\ntype Timestamped = { createdAt: Date };\ntype Post = { title: string } & Timestamped;" },
                  { title: "Type guards", content: "typeof, instanceof, and custom type predicate functions (value is Type) narrow a broader type down to a specific one within a conditional block." },
                  { title: "Common pitfalls", content: "Overusing broad unions without discriminants forces manual type checks everywhere they're used; adding a literal discriminant field early usually pays off." }
                ]
              },
              {
                title: "Generics",
                slug: "typescript-generics",
                shortDescription: "Write reusable code that works with any type.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Generic functions", content: "A generic function uses type parameters to express that its behavior is the same regardless of the type used, while preserving type safety.\n\nExample:\nfunction firstItem<T>(items: T[]): T | undefined {\n  return items[0];\n}" },
                  { title: "Generic interfaces and classes", content: "Interfaces and classes can also take type parameters, useful for containers like a typed API response wrapper or a generic Stack<T>." },
                  { title: "Type constraints", content: "Type constraints (T extends U) limit which types can be used, enabling you to rely on certain properties existing on T.\n\nExample:\nfunction getLength<T extends { length: number }>(item: T) {\n  return item.length;\n}" },
                  { title: "Default type parameters", content: "Generics can specify a default type (T = string), used when the caller doesn't explicitly provide one." },
                  { title: "Utility types", content: "Built-in utility types like Partial<T>, Pick<T, K>, Omit<T, K>, and Record<K, V> transform existing types instead of redefining them from scratch." }
                ]
              },
              {
                title: "Enums and Literal Types",
                slug: "typescript-enums-literals",
                shortDescription: "Express restricted sets of values.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Enums", content: "Enums name a set of related constants, making code more readable and preventing invalid values.\n\nExample:\nenum Status { Pending, Active, Closed }\nlet s: Status = Status.Active;" },
                  { title: "Literal types", content: "Literal types narrow a value to a single constant. Combined with unions, they model state machines and finite option sets.\n\nExample:\ntype Direction = 'up' | 'down' | 'left' | 'right';" },
                  { title: "Enums vs union of literals", content: "String literal unions are often preferred over enums in modern TypeScript because they produce no extra runtime code and integrate more naturally with plain JavaScript objects." },
                  { title: "const assertions", content: "The as const assertion locks an object or array literal's types down to their exact literal values instead of widening them, useful for building literal-type unions from data." },
                  { title: "Exhaustiveness checking", content: "Using a never-typed default case in a switch statement causes a compile error if a new variant is added to a union but not handled, catching missed cases early." }
                ]
              }
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(typeScriptCategory);
  console.log("✓ TypeScript Fundamentals category seeded");
}

async function main() {
  await seedTypeScriptCategory();
}

main()
  .catch((error) => {
    console.error("TypeScript seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
