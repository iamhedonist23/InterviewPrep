import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics?: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: StudyLevel;
  modules: ModuleSeed[];
};

type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
};

async function ensureCategory(category: CategorySeed) {
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

      const topics = moduleSeed.topics ?? [];
      for (const topicSeed of topics) {
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

        const sections = topicSeed.sections ?? [];
        for (let index = 0; index < sections.length; index += 1) {
          const section = sections[index];
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
  const typeScriptCategory: CategorySeed = {
    name: "TypeScript Fundamentals",
    slug: "typescript-fundamentals",
    description: "Learn type safety, interfaces, generics, and practical TypeScript patterns for modern apps.",
    icon: "TS",
    sortOrder: 5,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Strengthen static typing and safer application design.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "TypeScript Basics – The Foundation",
            slug: "typescript-basics",
            description: "Understand types and compile-time safety.",
            topics: [
              {
                title: "Types and Interfaces – Shaping Your Data",
                slug: "typescript-types-interfaces",
                shortDescription: "Describe data shapes and function contracts.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Why Type Safety Matters", content: "TypeScript catches errors at compile time, preventing runtime surprises. It provides better IDE support, refactoring confidence, and self‑documenting code." },
                  { title: "Interfaces – Object Contracts", content: "`interface User { id: number; name: string; email?: string; }` – defines the shape of an object. `readonly` properties can't be reassigned." },
                  { title: "Type Aliases – Flexible Naming", content: "`type ID = string | number;` – can describe primitives, unions, tuples, and more. Interfaces are preferred for object shapes due to declaration merging." },
                  { title: "Readonly and Optional Properties", content: "`readonly` prevents mutation. `?` marks a property as optional. This enforces immutability and clarifies API boundaries." },
                  { title: "Type Inference – Let TypeScript Work for You", content: "TypeScript infers types from initial values. Explicit annotations are still useful for function signatures and complex types." },
                  { title: "any vs unknown – Handling Uncertainty", content: "`any` disables type checking – avoid it. `unknown` is safer – you must narrow it (via `typeof`, `instanceof`, or type guards) before using it." },
                ],
              },
              {
                title: "Union and Intersection Types – Combining Types",
                slug: "typescript-union-intersection",
                shortDescription: "Combine types to express complex constraints.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Union Types – A | B", content: "A value can be one of several types. Use `typeof` or `in` to narrow. Example: `type Status = 'pending' | 'approved' | 'rejected'`." },
                  { title: "Discriminated Unions – Tagged Unions", content: "Use a common literal property to distinguish between union members. Example: `type Circle = { kind: 'circle'; radius: number }; type Square = { kind: 'square'; side: number };` – switch on `kind`." },
                  { title: "Intersection Types – A & B", content: "Combine multiple types into one. Useful for merging interfaces. Example: `type Timestamped = { createdAt: Date } & Post`." },
                  { title: "Type Guards – Narrowing Types", content: "`typeof`, `instanceof`, `in`, and user‑defined type predicates (`value is Type`) let you narrow unions." },
                  { title: "Common Pitfalls", content: "Overusing unions without discriminants leads to excessive type‑checking. Use `switch` with `never` for exhaustiveness." },
                ],
              },
              {
                title: "Generics – Reusable, Type‑Safe Components",
                slug: "typescript-generics",
                shortDescription: "Write reusable code that works with any type.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Generic Functions – <T>", content: "`function first<T>(items: T[]): T { return items[0]; }` – preserves the type relationship between input and output." },
                  { title: "Generic Interfaces – Container Types", content: "`interface Box<T> { value: T; }` – allows creating a `Box<string>` or `Box<number>`." },
                  { title: "Type Constraints – `extends`", content: "`function getLength<T extends { length: number }>(item: T) { return item.length; }` – restricts allowed types." },
                  { title: "Default Type Parameters", content: "`type Wrapper<T = string> = { value: T };` – provides a default type." },
                  { title: "Utility Types – Built‑in Transformations", content: "`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>` – use these to transform existing types." },
                ],
              },
              {
                title: "Enums and Literal Types – Restricted Sets",
                slug: "typescript-enums-literals",
                shortDescription: "Express restricted sets of values.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Enums – Named Constants", content: "`enum Status { Pending, Active, Closed }` – numeric or string enums. String enums are more readable." },
                  { title: "Literal Types – Exact Values", content: "`type Direction = 'up' | 'down' | 'left' | 'right';` – a union of string literals." },
                  { title: "Enums vs Union of Literals", content: "Union of literals is often preferred – it's simpler, has no runtime overhead, and works with `typeof` and `in`." },
                  { title: "const Assertions – Literal Inference", content: "`const config = { endpoint: '/api' } as const;` – makes properties readonly and infers literal types." },
                  { title: "Exhaustiveness Checking", content: "Use a `never` default in a `switch` statement to ensure all union cases are handled." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Advanced types, conditional types, mapped types, and utility types.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced TypeScript Types",
            slug: "typescript-advanced-types",
            description: "Conditional, mapped, template literal, and utility types.",
            topics: [
              {
                title: "Conditional Types – Types That Branch",
                slug: "typescript-conditional",
                shortDescription: "Types that depend on a condition.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Syntax – T extends U ? X : Y", content: "If `T` is assignable to `U`, the type is `X`, else `Y`. Example: `type IsString<T> = T extends string ? true : false`." },
                  { title: "The `infer` Keyword – Extract Types", content: "`infer` lets you capture a type from a condition. Example: `type ElementType<T> = T extends (infer U)[] ? U : never`." },
                  { title: "Distributive Conditional Types", content: "When `T` is a union, the conditional applies to each member separately. This is powerful for type transformations." },
                  { title: "Built‑in Conditional Utilities", content: "`Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<T>`, `Parameters<T>`." },
                ],
              },
              {
                title: "Mapped Types – Transforming Properties",
                slug: "typescript-mapped",
                shortDescription: "Transform properties of a type.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Basic Mapped Type – { [P in K]: T[P] }", content: "Example: `type Readonly<T> = { readonly [P in keyof T]: T[P] };`." },
                  { title: "Modifiers – `readonly` and `?`", content: "Add or remove `readonly` and optional modifiers using `-readonly` and `-?`." },
                  { title: "Key Remapping – `as` Clause", content: "`type Getters<T> = { [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P] };` – transforms property names." },
                  { title: "Utility Types Based on Mapped Types", content: "`Pick<T, K>`, `Omit<T, K>`, `Partial<T>`, `Required<T>` are all mapped types under the hood." },
                ],
              },
              {
                title: "Template Literal Types – String Manipulation",
                slug: "typescript-template-literal",
                shortDescription: "Build strings from types.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Syntax – `${T}`", content: "`` `${'get' | 'set'}${Capitalize<keyof T>}` `` – creates a union of strings like `getUser` and `setUser`." },
                  { title: "Built‑in String Manipulation", content: "`Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize` – transform string literal types." },
                  { title: "Use Cases", content: "Event names, CSS property names, API route generation, and more." },
                ],
              },
              {
                title: "Advanced Utility Types – Deep Dive",
                slug: "typescript-advanced-utilities",
                shortDescription: "Awaited, Omit, Pick, Exclude, Extract, NonNullable, ReturnType.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Awaited – Unwrap Promises", content: "`type Awaited<T> = T extends PromiseLike<infer U> ? U : T;` – extracts the resolved type of a promise." },
                  { title: "Omit and Pick", content: "`Omit<T, K>` – creates a type without keys K. `Pick<T, K>` – selects only keys K." },
                  { title: "Exclude and Extract", content: "`Exclude<T, U>` – removes types from T that are assignable to U. `Extract<T, U>` – keeps only those assignable to U." },
                  { title: "NonNullable", content: "`NonNullable<T>` – removes `null` and `undefined` from a union." },
                  { title: "ReturnType and Parameters", content: "`ReturnType<T>` – the return type of a function type. `Parameters<T>` – tuple of parameter types." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- ADVANCED --------------------
      {
        name: "Advanced",
        slug: "advanced",
        description: "Type manipulation, decorators, module resolution, and modern features.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Type System Deep Dive",
            slug: "typescript-type-system",
            description: "Recursive types, branded types, type-level programming, and more.",
            topics: [
              {
                title: "Recursive Types – Self‑Referential",
                slug: "typescript-recursive",
                shortDescription: "Self-referential types.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Definition", content: "`interface TreeNode { value: number; children: TreeNode[]; }` – defines a tree structure." },
                  { title: "Recursive Conditional Types", content: "Use `infer` to extract nested types. Example: `DeepReadonly<T>` – recursively makes all properties readonly." },
                ],
              },
              {
                title: "Branded Types – Nominal Typing",
                slug: "typescript-branded",
                shortDescription: "Nominal typing with brands.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Branding", content: "`type UserId = string & { __brand: 'UserId' };` – prevents assigning a plain string." },
                  { title: "Type Guards with `asserts`", content: "`function assertIsUserId(value: string): asserts value is UserId { ... }` – tells TypeScript to narrow." },
                ],
              },
              {
                title: "Variadic Tuple Types – Flexible Tuples",
                slug: "typescript-variadic-tuples",
                shortDescription: "Spread and rest in tuple types.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Spread Syntax in Tuples", content: "`type Tuple = [string, ...number[]];` – a tuple starting with a string, followed by any number of numbers." },
                  { title: "Leading and Middle Rest", content: "`type Leading = [...number[], string];` – a tuple ending with a string." },
                  { title: "Use Cases", content: "Generic function arguments, typed `concat`, and mapped types over tuples." },
                ],
              },
              {
                title: "Decorators – Metadata and Annotations",
                slug: "typescript-decorators",
                shortDescription: "Decorators (experimental and new).",
                estimatedMinutes: 22,
                sections: [
                  { title: "What are Decorators?", content: "Functions that modify classes, methods, or properties. Used in frameworks like Angular and NestJS." },
                  { title: "Experimental Decorators (Stage 2)", content: "`@log` on a method – wraps the method to add logging. Requires `experimentalDecorators: true`." },
                  { title: "New Decorators (Stage 3)", content: "The new proposal changes the API. Supports `context` and allows decorating classes, methods, fields, and accessors." },
                  { title: "Use Cases", content: "Logging, validation, dependency injection, and performance monitoring." },
                ],
              },
              {
                title: "Modern Features – `satisfies`, `using`, `import` Types",
                slug: "typescript-modern",
                shortDescription: "satisfies, using declarations, import types.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The `satisfies` Operator", content: "Ensures an expression matches a type without widening it. Example: `const config = { port: 3000 } satisfies { port: number };`." },
                  { title: "`using` Declarations – Explicit Resource Management", content: "`using` automatically disposes of resources (like `using` in C#). Example: `using file = openFile();`." },
                  { title: "`import` Types – Importing Types Only", content: "`import type { User } from './models';` – imports only the type, not the runtime value. Reduces bundle size." },
                ],
              },
              {
                title: "Declaration Merging and Module Augmentation",
                slug: "typescript-declaration-merging",
                shortDescription: "Combine declarations and extend external modules.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Declaration Merging – Interface Merging", content: "Multiple interfaces with the same name are merged. Example: `interface User { name: string; } interface User { age: number; }` results in `User` having both." },
                  { title: "Namespace Merging", content: "Namespaces also merge, allowing you to add new exports." },
                  { title: "Module Augmentation – Extending External Modules", content: "`declare module 'express' { ... }` – adds new methods or properties to an existing module." },
                  { title: "Use Cases", content: "Extending third‑party libraries, adding custom properties to `window`." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERVIEW PREP --------------------
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common TypeScript interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "typescript-core-interview",
            description: "Types, interfaces, generics, and utility types.",
            topics: [
              {
                title: "keyof and Lookup Types",
                slug: "typescript-keyof",
                shortDescription: "Using keyof and indexed access.",
                estimatedMinutes: 20,
                sections: [
                  { title: "keyof – Union of Property Names", content: "`keyof T` gives a union of all property keys of T." },
                  { title: "Lookup Types – T[K]", content: "`T[K]` returns the type of property K." },
                  { title: "Practical Use", content: "Creating type‑safe functions that access object properties." },
                ],
              },
              {
                title: "Type Guards and Assertions",
                slug: "typescript-type-guards",
                shortDescription: "is, asserts, and narrowing.",
                estimatedMinutes: 20,
                sections: [
                  { title: "User‑defined Type Guards – `is`", content: "`function isString(value: unknown): value is string { return typeof value === 'string'; }`." },
                  { title: "Assertion Functions – `asserts`", content: "`function assertIsNumber(value: unknown): asserts value is number { if (typeof value !== 'number') throw new Error(); }`." },
                  { title: "`in` Operator", content: "Checks if a property exists in an object. Useful for union narrowing." },
                ],
              },
              {
                title: "Advanced Utility Types in Practice",
                slug: "typescript-utilities-practice",
                shortDescription: "When to use each utility type.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Partial and Required", content: "`Partial<T>` makes all properties optional; `Required<T>` makes them required." },
                  { title: "Pick and Omit", content: "Pick selects specific properties; Omit removes properties." },
                  { title: "Record", content: "`Record<K, T>` creates an object type with keys K and values T." },
                ],
              },
              {
                title: "Infer and Conditional Types",
                slug: "typescript-infer",
                shortDescription: "Using infer and conditional types.",
                estimatedMinutes: 18,
                sections: [
                  { title: "infer with ReturnType", content: "`ReturnType<T>` uses `infer` to capture the return type of a function." },
                  { title: "Inferring Arrays and Tuples", content: "`type ElementType<T> = T extends (infer U)[] ? U : never;`." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(typeScriptCategory);
  console.log("✅ TypeScript Fundamentals category seeded (ultra‑detailed)");
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