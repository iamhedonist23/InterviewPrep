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

async function seedReactCategory() {
  const reactCategory = {
    name: "React Fundamentals",
    slug: "react-fundamentals",
    description: "Learn the component model, state, props, hooks, and rendering behavior in React.",
    icon: "REACT",
    sortOrder: 2,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand how React renders, updates, and reuses UI.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "React Basics",
            slug: "react-basics",
            description: "The building blocks of React components and rendering.",
            topics: [
              {
                title: "Components and Props",
                slug: "components-props",
                shortDescription: "Break the UI into reusable functions and pass data via props.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What a component is", content: "A React component is a reusable renderable unit." },
                  { title: "Props are read-only", content: "Props should be treated as inputs." },
                  { title: "Composing components", content: "Nesting components via children." },
                  { title: "Default and typed props", content: "Using TypeScript for props." },
                  { title: "Lists and keys", content: "Stable keys for lists." },
                  { title: "Common mistakes", content: "Using index as key, mutating props." }
                ]
              },
              {
                title: "State and Re-rendering",
                slug: "state-rerendering",
                shortDescription: "Learn how state changes trigger UI updates.",
                estimatedMinutes: 20,
                sections: [
                  { title: "State lifecycle", content: "State updates trigger re-renders." },
                  { title: "Immutability", content: "Create new objects/arrays." },
                  { title: "Batched updates", content: "React batches state updates." },
                  { title: "Lifting state up", content: "Shared state to parent." },
                  { title: "Derived vs stored state", content: "Compute values when possible." },
                  { title: "Common pitfalls", content: "State asynchrony, infinite loops." }
                ]
              },
              {
                title: "JSX and Rendering",
                slug: "jsx-rendering",
                shortDescription: "Write UI declaratively with JSX syntax.",
                estimatedMinutes: 18,
                sections: [
                  { title: "JSX is not HTML", content: "JSX compiles to React.createElement." },
                  { title: "Embedding expressions", content: "{} for JavaScript expressions." },
                  { title: "Conditional rendering", content: "Ternary, &&." },
                  { title: "Fragments", content: "Group elements without extra nodes." },
                  { title: "Styling approaches", content: "Inline styles, CSS modules." },
                  { title: "How rendering works", content: "Virtual DOM and reconciliation." }
                ]
              }
            ],
          },
          {
            title: "Hooks Deep Dive",
            slug: "hooks-deep-dive",
            description: "Master React's functional component model.",
            topics: [
              {
                title: "useState Hook",
                slug: "usestate-hook",
                shortDescription: "Add state to function components.",
                estimatedMinutes: 18,
                sections: [
                  { title: "useState basics", content: "Returns state and setter." },
                  { title: "Multiple states", content: "Call useState multiple times." },
                  { title: "Functional updates", content: "Update based on previous value." },
                  { title: "Lazy initial state", content: "Pass function for expensive computation." },
                  { title: "State with objects and arrays", content: "Immutable updates." },
                  { title: "Common mistakes", content: "Asynchronous updates, no merge." }
                ]
              },
              {
                title: "useEffect Hook",
                slug: "useeffect-hook",
                shortDescription: "Synchronize side effects with component lifecycle.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What useEffect does", content: "Runs after render for side effects." },
                  { title: "Dependency array", content: "Controls when effect runs." },
                  { title: "Cleanup functions", content: "Return function for cleanup." },
                  { title: "Data fetching pattern", content: "Fetch in effect with cleanup." },
                  { title: "Effects vs event handlers", content: "Event handlers for user actions." },
                  { title: "Common pitfalls", content: "Missing dependencies, stale closures." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "React performance, context, and custom hooks.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "State Management and Context",
            slug: "react-state-context",
            description: "Sharing state across components.",
            topics: [
              {
                title: "Context API",
                slug: "react-context",
                shortDescription: "Prop drilling alternative.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Creating Context", content: "React.createContext." },
                  { title: "Provider and Consumer", content: "Wrap components." },
                  { title: "useContext hook", content: "Consume context in function components." },
                  { title: "When to use Context", content: "Themes, user auth." },
                  { title: "Optimizing Context", content: "Split contexts to avoid re-renders." }
                ]
              },
              {
                title: "useReducer and Redux",
                slug: "react-usereducer-redux",
                shortDescription: "Predictable state updates.",
                estimatedMinutes: 22,
                sections: [
                  { title: "useReducer", content: "Reducer function for complex state logic." },
                  { title: "Redux basics", content: "Actions, reducers, store." },
                  { title: "Redux Toolkit", content: "Simpler Redux setup." },
                  { title: "Middleware", content: "Thunk for async actions." }
                ]
              }
            ]
          },
          {
            title: "Performance Optimization",
            slug: "react-performance",
            description: "Memoization and rendering optimization.",
            topics: [
              {
                title: "React.memo and useMemo",
                slug: "react-memo-usememo",
                shortDescription: "Prevent unnecessary re-renders.",
                estimatedMinutes: 18,
                sections: [
                  { title: "React.memo", content: "Memoize component." },
                  { title: "useMemo", content: "Memoize expensive calculations." },
                  { title: "useCallback", content: "Memoize callbacks." },
                  { title: "When to use", content: "Don't over-optimize." }
                ]
              },
              {
                title: "Virtualization and Code Splitting",
                slug: "react-virtualization-splitting",
                shortDescription: "Lazy load components and large lists.",
                estimatedMinutes: 16,
                sections: [
                  { title: "React.lazy", content: "Dynamic import." },
                  { title: "Suspense", content: "Fallback UI." },
                  { title: "Windowed lists", content: "react-window." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Server-side rendering, hooks patterns, and more.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Advanced React Patterns",
            slug: "react-advanced-patterns",
            description: "Compound components, render props, HOCs.",
            topics: [
              {
                title: "Compound Components",
                slug: "react-compound-components",
                shortDescription: "Share state between components.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Pattern", content: "Parent component manages state." },
                  { title: "Context in compound components", content: "Use Context to share implicitly." }
                ]
              },
              {
                title: "Render Props and HOCs",
                slug: "react-render-props-hoc",
                shortDescription: "Code reuse patterns.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Render props", content: "Function as child." },
                  { title: "Higher-order components", content: "Enhance components." },
                  { title: "Custom hooks", content: "Modern alternative." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common React interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "React Interview Topics",
            slug: "react-interview",
            description: "Frequently asked React topics.",
            topics: [
              {
                title: "Hooks",
                slug: "react-interview-hooks",
                shortDescription: "useState, useEffect, useContext.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Rules of Hooks", content: "Only call at top level." },
                  { title: "Custom Hooks", content: "Reusable logic." }
                ]
              },
              {
                title: "Virtual DOM",
                slug: "react-interview-virtual-dom",
                shortDescription: "How React updates the DOM.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Reconciliation", content: "Diffing algorithm." },
                  { title: "Keys", content: "Importance in lists." }
                ]
              }
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(reactCategory);
  console.log("✓ React Fundamentals category seeded");
}

async function main() {
  await seedReactCategory();
}

main()
  .catch((error) => {
    console.error("React seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });