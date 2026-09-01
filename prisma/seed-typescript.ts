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
                  { title: "Why type safety matters", content: "Catch mistakes early." },
                  { title: "Interfaces", content: "Describe object shapes." },
                  { title: "Type aliases", content: "Primitives, unions, tuples." },
                  { title: "Readonly and optional", content: "readonly, ?." },
                  { title: "Type inference", content: "Automatic type detection." },
                  { title: "any vs unknown", content: "Avoid any." }
                ]
              },
              {
                title: "Union and Intersection Types",
                slug: "typescript-union-intersection",
                shortDescription: "Combine types to express complex constraints.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Union types", content: "A | B." },
                  { title: "Discriminated unions", content: "Literal property for narrowing." },
                  { title: "Intersection types", content: "A & B." },
                  { title: "Type guards", content: "typeof, instanceof." },
                  { title: "Common pitfalls", content: "Overuse." }
                ]
              },
              {
                title: "Generics",
                slug: "typescript-generics",
                shortDescription: "Write reusable code that works with any type.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Generic functions", content: "<T>." },
                  { title: "Generic interfaces", content: "Container types." },
                  { title: "Type constraints", content: "extends." },
                  { title: "Default type parameters", content: "T = string." },
                  { title: "Utility types", content: "Partial, Pick, Omit." }
                ]
              },
              {
                title: "Enums and Literal Types",
                slug: "typescript-enums-literals",
                shortDescription: "Express restricted sets of values.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Enums", content: "Named constants." },
                  { title: "Literal types", content: "Union of string literals." },
                  { title: "Enums vs union", content: "Prefer union." },
                  { title: "const assertions", content: "as const." },
                  { title: "Exhaustiveness checking", content: "never default." }
                ]
              }
            ],
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Advanced types, conditional types, mapped types.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced TypeScript Types",
            slug: "typescript-advanced-types",
            description: "Conditional, mapped, and template literal types.",
            topics: [
              {
                title: "Conditional Types",
                slug: "typescript-conditional",
                shortDescription: "Types that depend on a condition.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Syntax", content: "T extends U ? X : Y." },
                  { title: "Infer keyword", content: "Extract inner types." },
                  { title: "Distributive conditional types", content: "Union distribution." }
                ]
              },
              {
                title: "Mapped Types",
                slug: "typescript-mapped",
                shortDescription: "Transform properties of a type.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Basic mapped", content: "{ [P in K]: T[P] }." },
                  { title: "Modifiers", content: "readonly, ?." },
                  { title: "Key remapping", content: "as clause." }
                ]
              },
              {
                title: "Template Literal Types",
                slug: "typescript-template-literal",
                shortDescription: "Build strings from types.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Syntax", content: "`${T}`." },
                  { title: "Use cases", content: "Event names, CSS properties." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Type manipulation, decorators, and module resolution.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Type System Deep Dive",
            slug: "typescript-type-system",
            description: "Recursive types, branded types, type-level programming.",
            topics: [
              {
                title: "Recursive Types",
                slug: "typescript-recursive",
                shortDescription: "Self-referential types.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Definition", content: "interface TreeNode { children: TreeNode[] }." },
                  { title: "Recursive conditional", content: "DeepReadonly." }
                ]
              },
              {
                title: "Branded Types",
                slug: "typescript-branded",
                shortDescription: "Nominal typing with brands.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Branding", content: "type UserId = string & { __brand: 'UserId' }." },
                  { title: "Type guards", content: "asserts." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common TypeScript interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "TypeScript Interview Topics",
            slug: "typescript-interview",
            description: "Frequently asked TypeScript topics.",
            topics: [
              {
                title: "Keyof and Lookup Types",
                slug: "typescript-keyof",
                shortDescription: "Using keyof and indexed access.",
                estimatedMinutes: 18,
                sections: [
                  { title: "keyof", content: "Union of property names." },
                  { title: "Lookup types", content: "T[K]." }
                ]
              },
              {
                title: "Type Guards and Assertions",
                slug: "typescript-type-guards",
                shortDescription: "is, asserts.",
                estimatedMinutes: 16,
                sections: [
                  { title: "User-defined type guards", content: "function isString(x: any): x is string." },
                  { title: "Assertion functions", content: "asserts x is string." }
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