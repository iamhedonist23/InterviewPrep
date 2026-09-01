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
                  { title: "Routing model", content: "Next.js uses the file system to define routes. A folder structure maps directly to URL paths, keeping app organization intuitive. In the App Router, app/about/page.tsx maps to /about." },
                  { title: "Dynamic routes", content: "Bracketed folder names create dynamic segments.\n\nExample:\napp/blog/[slug]/page.tsx  // matches /blog/anything\n\nexport default function Post({ params }: { params: { slug: string } }) {\n  return <h1>{params.slug}</h1>;\n}" },
                  { title: "Nested layouts", content: "A layout.tsx file wraps all pages within its folder (and nested folders) with shared UI (like a navbar), persisting across navigations without re-rendering." },
                  { title: "Rendering strategies", content: "Next.js supports multiple rendering strategies: static generation (built at build time), server-side rendering (rendered per request), and client-side rendering. The right one depends on whether content is static, personalized, or interactive." },
                  { title: "Route groups and special files", content: "Parentheses folders like (marketing) group routes without affecting the URL. Special files like loading.tsx and error.tsx automatically handle loading and error states per route segment." },
                ],
              },
              {
                title: "Server and Client Components",
                slug: "nextjs-server-client",
                shortDescription: "Understand the boundary between server and browser execution.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Server components", content: "Server components run only on the server and can access databases, secrets, and the filesystem directly. They are the default in the App Router (Next.js 13+) and send zero JavaScript to the browser for that component." },
                  { title: "Client components", content: "Components marked with the 'use client' directive at the top of the file run in the browser and can use React hooks, state, and browser-only APIs.\n\nExample:\n'use client';\nimport { useState } from 'react';\nexport default function Counter() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n+1)}>{n}</button>;\n}" },
                  { title: "Composing server and client", content: "Server components can render client components as children, but client components cannot directly import and render server components — instead, pass server-rendered content down as children props." },
                  { title: "Data fetching in server components", content: "Server components can fetch data directly with async/await at the top level, without useEffect or client-side loading states.\n\nExample:\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/data').then(r => r.json());\n  return <div>{data.title}</div>;\n}" },
                  { title: "Why the split exists", content: "Splitting server and client components reduces the JavaScript bundle shipped to the browser and keeps sensitive logic (API keys, database queries) off the client entirely." },
                ],
              },
              {
                title: "API Routes",
                slug: "nextjs-api-routes",
                shortDescription: "Build backend endpoints within a Next.js app.",
                estimatedMinutes: 18,
                sections: [
                  { title: "File-based routing for APIs", content: "In the App Router, a route.ts file inside app/api/hello/ becomes an HTTP endpoint responding at /api/hello, exporting functions named after HTTP methods (GET, POST, etc.)." },
                  { title: "Handling requests", content: "Example:\nexport async function GET(request: Request) {\n  return Response.json({ message: 'Hello' });\n}\n\nexport async function POST(request: Request) {\n  const body = await request.json();\n  return Response.json({ received: body });\n}" },
                  { title: "Reading query params and headers", content: "The Request object's URL can be parsed with the built-in URL class to extract search params, and headers are accessible via request.headers.get('...')." },
                  { title: "Route handlers vs Server Actions", content: "Route handlers create traditional REST-style endpoints; Server Actions ('use server' functions) let you call server-side logic directly from a form or client component without manually building a fetch call." },
                  { title: "When to use API routes", content: "Use API routes for endpoints consumed by external clients (mobile apps, webhooks) or when you need a stable REST contract; prefer Server Actions for internal form submissions within the same app." },
                ],
              },
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
