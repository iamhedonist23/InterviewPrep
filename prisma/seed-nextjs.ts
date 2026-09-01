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

async function seedNextJsCategory() {
  const nextJsCategory = {
    name: "Next.js Fundamentals",
    slug: "nextjs-fundamentals",
    description: "Understand routing, rendering, server/client boundaries, and modern app structure in Next.js.",
    icon: "NX",
    sortOrder: 7,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Start with next-gen web app structure and rendering concepts.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Next.js Basics",
            slug: "nextjs-basics",
            description: "Core concepts of routing and rendering in Next.js.",
            topics: [
              {
                title: "Pages and Routing",
                slug: "nextjs-pages-routing",
                shortDescription: "Map routes to files and components in a Next.js app.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Routing model", content: "File system routing." },
                  { title: "Dynamic routes", content: "[slug]." },
                  { title: "Nested layouts", content: "layout.tsx." },
                  { title: "Rendering strategies", content: "SSG, SSR, CSR." },
                  { title: "Route groups and special files", content: "(group), loading, error." }
                ]
              },
              {
                title: "Server and Client Components",
                slug: "nextjs-server-client",
                shortDescription: "Understand the boundary between server and browser execution.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Server components", content: "Run on server, no JS sent." },
                  { title: "Client components", content: "'use client'." },
                  { title: "Composing", content: "Pass server components as children." },
                  { title: "Data fetching in server components", content: "Async/await." },
                  { title: "Why the split exists", content: "Bundle size, security." }
                ]
              },
              {
                title: "API Routes",
                slug: "nextjs-api-routes",
                shortDescription: "Build backend endpoints within a Next.js app.",
                estimatedMinutes: 18,
                sections: [
                  { title: "File-based routing for APIs", content: "route.ts." },
                  { title: "Handling requests", content: "GET, POST." },
                  { title: "Reading query params", content: "URL parsing." },
                  { title: "Route handlers vs Server Actions", content: "Different use cases." },
                  { title: "When to use API routes", content: "External clients." }
                ]
              },
            ],
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Data fetching, caching, and middleware.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Data Fetching and Caching",
            slug: "nextjs-data-fetching",
            description: "Fetch strategies and revalidation.",
            topics: [
              {
                title: "fetch and caching",
                slug: "nextjs-fetch-cache",
                shortDescription: "Using fetch with cache options.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Cache control", content: "force-cache, no-store." },
                  { title: "Revalidation", content: "revalidate, revalidatePath." },
                  { title: "Server Actions", content: "Mutate data." }
                ]
              },
              {
                title: "Middleware",
                slug: "nextjs-middleware",
                shortDescription: "Run code before requests.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What middleware can do", content: "Redirect, rewrite, auth." },
                  { title: "Matcher", content: "Specify paths." },
                  { title: "Conditional logic", content: "Based on request." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Advanced patterns: image optimization, internationalization, and more.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Optimization and Deployment",
            slug: "nextjs-optimization",
            description: "Image optimization, ISR, and edge.",
            topics: [
              {
                title: "Image Optimization",
                slug: "nextjs-image",
                shortDescription: "Next/Image component.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Automatic optimization", content: "Resize, lazy load." },
                  { title: "Configuration", content: "Domains." }
                ]
              },
              {
                title: "Incremental Static Regeneration",
                slug: "nextjs-isr",
                shortDescription: "Update static content after build.",
                estimatedMinutes: 20,
                sections: [
                  { title: "ISR with revalidate", content: "Background revalidation." },
                  { title: "On-demand ISR", content: "revalidatePath." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common Next.js interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Next.js Interview Topics",
            slug: "nextjs-interview",
            description: "Frequently asked Next.js topics.",
            topics: [
              {
                title: "Rendering Methods",
                slug: "nextjs-interview-rendering",
                shortDescription: "SSR, SSG, ISR, CSR.",
                estimatedMinutes: 18,
                sections: [
                  { title: "SSR", content: "Server-side rendering." },
                  { title: "SSG", content: "Static site generation." },
                  { title: "ISR", content: "Incremental static regeneration." },
                  { title: "CSR", content: "Client-side rendering." }
                ]
              },
              {
                title: "Server Actions",
                slug: "nextjs-interview-server-actions",
                shortDescription: "Mutating data without API routes.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Use server", content: "Directives." },
                  { title: "Progressive enhancement", content: "Forms." }
                ]
              }
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(nextJsCategory);
  console.log("✓ Next.js Fundamentals category seeded");
}

async function main() {
  await seedNextJsCategory();
}

main()
  .catch((error) => {
    console.error("Next.js seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });