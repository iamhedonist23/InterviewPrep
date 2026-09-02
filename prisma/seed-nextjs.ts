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

async function seedNextJsCategory() {
  const nextJsCategory: CategorySeed = {
    name: "Next.js Fundamentals",
    slug: "nextjs-fundamentals",
    description: "Understand routing, rendering, server/client boundaries, and modern app structure in Next.js.",
    icon: "NX",
    sortOrder: 7,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Start with next-gen web app structure and rendering concepts.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Next.js Basics – The App Router",
            slug: "nextjs-basics",
            description: "Core concepts of routing and rendering in Next.js.",
            topics: [
              {
                title: "Pages and Routing – File‑System Based",
                slug: "nextjs-pages-routing",
                shortDescription: "Map routes to files and components in a Next.js app.",
                estimatedMinutes: 26,
                sections: [
                  { title: "File‑System Routing Model", content: "Next.js uses the file system to define routes. In the App Router (the modern default), each folder in the `app/` directory represents a segment of the URL path. For example, `app/about/page.tsx` maps to `/about`. This model makes routing intuitive and eliminates the need for a separate routing configuration." },
                  { title: "Dynamic Routes – `[slug]`", content: "Create dynamic routes with square brackets: `app/blog/[slug]/page.tsx`. This matches any URL like `/blog/hello-world`. The `params` object contains the dynamic segments. Example: `export default function Page({ params }: { params: { slug: string } }) { return <h1>{params.slug}</h1>; }`." },
                  { title: "Nested Layouts – `layout.tsx`", content: "A `layout.tsx` file wraps all pages in its folder and subfolders with shared UI (e.g., a navbar). Layouts persist across navigations and can be nested. The root layout wraps the entire app." },
                  { title: "Rendering Strategies – SSG, SSR, CSR", content: "Next.js supports multiple rendering strategies:\n- **Static Site Generation (SSG)**: pages are built at build time – ideal for content that doesn't change often.\n- **Server‑Side Rendering (SSR)**: pages are rendered on each request – good for dynamic, personalised content.\n- **Client‑Side Rendering (CSR)**: data is fetched on the client – suitable for interactive content." },
                  { title: "Route Groups and Special Files", content: "Route groups (folder names in parentheses, e.g., `(marketing)`) group routes without affecting the URL. Special files: `loading.tsx` (loading UI), `error.tsx` (error UI), `not-found.tsx` (404 UI)." },
                ],
              },
              {
                title: "Server and Client Components – The Split",
                slug: "nextjs-server-client",
                shortDescription: "Understand the boundary between server and browser execution.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Server Components – The Default", content: "By default, Next.js components are Server Components. They run on the server, can access database and file system directly, and send zero JavaScript to the browser. This reduces bundle size and improves performance." },
                  { title: "Client Components – `'use client'`", content: "Add `'use client'` at the top of a component to make it a Client Component. These run in the browser and can use React hooks (`useState`, `useEffect`), browser APIs, and event handlers." },
                  { title: "Composing Server and Client", content: "Server Components can render Client Components as children. However, Client Components cannot directly import Server Components – instead, pass server‑rendered content as `children` props." },
                  { title: "Data Fetching in Server Components", content: "Server Components can use `async/await` directly at the top level: `export default async function Page() { const data = await fetch('...'); return <div>{data}</div>; }`. This is clean and avoids client‑side waterfalls." },
                  { title: "Why the Split Exists", content: "The split reduces the JavaScript bundle sent to the client, keeps sensitive logic (API keys, database queries) on the server, and enables faster initial load and better SEO." },
                ],
              },
              {
                title: "API Routes – Backend in Next.js",
                slug: "nextjs-api-routes",
                shortDescription: "Build backend endpoints within a Next.js app.",
                estimatedMinutes: 22,
                sections: [
                  { title: "File‑Based Routing for APIs", content: "In the App Router, `app/api/hello/route.ts` becomes `/api/hello`. Export named functions for HTTP methods: `export async function GET(request: Request) { ... }`." },
                  { title: "Handling Requests", content: "```typescript\nexport async function GET(request: Request) {\n  return Response.json({ message: 'Hello' });\n}\n\nexport async function POST(request: Request) {\n  const body = await request.json();\n  return Response.json({ received: body });\n}\n```" },
                  { title: "Reading Query Params and Headers", content: "Parse the URL with `new URL(request.url)` to get search params. Access headers via `request.headers.get('...')`." },
                  { title: "Route Handlers vs Server Actions", content: "Route handlers are traditional REST endpoints. Server Actions (`'use server'`) let you call server‑side logic directly from forms or client components without building a fetch call. Use Route Handlers for external APIs, and Server Actions for form submissions and mutations." },
                  { title: "When to Use API Routes", content: "Use API routes for endpoints consumed by external clients (mobile apps, webhooks) or when you need a stable REST contract. Prefer Server Actions for internal form submissions within the same app." },
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
        description: "Data fetching, caching, middleware, and authentication.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Data Fetching and Caching",
            slug: "nextjs-data-fetching",
            description: "Fetch strategies and revalidation.",
            topics: [
              {
                title: "fetch and Caching – Controlling Behaviour",
                slug: "nextjs-fetch-cache",
                shortDescription: "Using fetch with cache options.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Cache Control – `force-cache` and `no-store`", content: "By default, `fetch` inside Server Components uses `force-cache` (cached indefinitely). Use `{ cache: 'no-store' }` to disable caching (always fresh). Use `{ next: { revalidate: 60 } }` for ISR (revalidate every 60 seconds)." },
                  { title: "Revalidation – `revalidate` and `revalidatePath`", content: "`revalidateTag(tag)` invalidates cached data by tag. `revalidatePath(path)` revalidates a specific route. These are used in Server Actions and Route Handlers." },
                  { title: "Server Actions – Mutations", content: "Server Actions are asynchronous functions marked with `'use server'`. They run on the server and can mutate data. Use them in forms with the `action` prop: `<form action={createPost}>`." },
                  { title: "Data Fetching Patterns", content: "For parallel data fetching, use `Promise.all`. For sequential dependencies, use `await` in order. Use `Suspense` with `loading.tsx` for streaming." },
                ],
              },
              {
                title: "Middleware – Intercepting Requests",
                slug: "nextjs-middleware",
                shortDescription: "Run code before requests.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What Middleware Can Do", content: "Middleware runs before a request is completed. It can: redirect, rewrite, add headers, perform authentication checks, and more. It runs on the Edge Runtime." },
                  { title: "Matcher – Specifying Paths", content: "Use `config.matcher` to limit where middleware runs: `matcher: ['/dashboard/:path*', '/api/:path*']`." },
                  { title: "Conditional Logic", content: "In middleware, you can inspect `request.nextUrl`, cookies, and headers. Example: `if (request.nextUrl.pathname.startsWith('/admin')) { return NextResponse.redirect(new URL('/login', request.url)); }`." },
                  { title: "Authentication Middleware", content: "A common use case: check for a session cookie; if not present, redirect to login. Use with NextAuth.js or custom JWT." },
                ],
              },
              {
                title: "Authentication – NextAuth.js",
                slug: "nextjs-auth",
                shortDescription: "Implement authentication with NextAuth.js.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is NextAuth.js?", content: "NextAuth.js is a complete open‑source authentication solution for Next.js. It supports OAuth providers (Google, GitHub), email/password (with database), and JWT sessions." },
                  { title: "Setting Up", content: "Install `next-auth` and add `auth.ts` with providers. Wrap your app with `SessionProvider`." },
                  { title: "Using Session", content: "Use `useSession()` in Client Components, or `auth()` in Server Components to get the current session." },
                  { title: "Protecting Routes", content: "Use middleware to protect routes, or check `session` in Server Components and redirect." },
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
        description: "Advanced patterns: image optimization, internationalization, metadata, edge runtime, and deployment.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Optimization and Advanced Features",
            slug: "nextjs-optimization",
            description: "Image optimization, ISR, metadata, and i18n.",
            topics: [
              {
                title: "Image Optimization – Next/Image",
                slug: "nextjs-image",
                shortDescription: "Next/Image component.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Automatic Optimization", content: "`next/image` automatically resizes, compresses, and lazy‑loads images. It serves modern formats (WebP/AVIF) when supported." },
                  { title: "Configuration", content: "Specify allowed domains in `next.config.js`: `images: { remotePatterns: [{ protocol: 'https', hostname: 'example.com' }] }`." },
                  { title: "Usage", content: "`<Image src=\"/hero.jpg\" alt=\"Hero\" width={1200} height={600} priority />`. Use `priority` for above‑the‑fold images." },
                ],
              },
              {
                title: "Incremental Static Regeneration (ISR)",
                slug: "nextjs-isr",
                shortDescription: "Update static content after build.",
                estimatedMinutes: 24,
                sections: [
                  { title: "ISR with `revalidate`", content: "In a page, use `export const revalidate = 60;` to revalidate the page every 60 seconds. This generates new static content in the background." },
                  { title: "On‑demand ISR", content: "Use `revalidatePath` or `revalidateTag` in Server Actions or Route Handlers to trigger revalidation on demand (e.g., after a CMS update)." },
                ],
              },
              {
                title: "Metadata and SEO – `metadata` API",
                slug: "nextjs-metadata",
                shortDescription: "Manage SEO metadata.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Static Metadata", content: "Export `export const metadata = { title: 'My Page', description: '...' }` from a layout or page." },
                  { title: "Dynamic Metadata", content: "Use `generateMetadata({ params })` to generate metadata dynamically based on route parameters." },
                  { title: "Open Graph and Twitter Cards", content: "Add Open Graph and Twitter metadata for social sharing: `openGraph: { title: '...', images: [...] }`." },
                ],
              },
              {
                title: "Internationalization (i18n)",
                slug: "nextjs-i18n",
                shortDescription: "Support multiple languages.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Routing with i18n", content: "Use sub‑path routing (`/en/about`, `/fr/about`). Configure `i18n` in `next.config.js`." },
                  { title: "Middleware for i18n", content: "Middleware can detect the user's preferred language and redirect to the correct locale." },
                  { title: "Translations", content: "Use libraries like `next‑international` or `next‑i18next` to manage translation files." },
                ],
              },
              {
                title: "Edge Runtime and Deployment",
                slug: "nextjs-edge",
                shortDescription: "Deploy to Vercel and Edge Runtime.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Edge Runtime", content: "Some routes can run on the Edge (Vercel's global network) for lower latency. Use `export const runtime = 'edge'` in a route or middleware." },
                  { title: "Deploy to Vercel", content: "Vercel is the official platform. Connect your Git repo, and it deploys automatically. Configure environment variables in the Vercel dashboard." },
                  { title: "Environment Variables", content: "Use `.env.local` for development. `NEXT_PUBLIC_*` variables are exposed to the browser; others are server‑only." },
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
        description: "Common Next.js interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Next.js Concepts",
            slug: "nextjs-core-interview",
            description: "Rendering, data fetching, and server/client components.",
            topics: [
              {
                title: "Rendering Methods",
                slug: "nextjs-interview-rendering",
                shortDescription: "SSR, SSG, ISR, CSR.",
                estimatedMinutes: 22,
                sections: [
                  { title: "SSR", content: "Server‑Side Rendering: page is rendered on each request. Good for dynamic, personalised content. Use `export const dynamic = 'force-dynamic'`." },
                  { title: "SSG", content: "Static Site Generation: page is built at build time. Good for static content. Use `export const dynamic = 'force-static'`." },
                  { title: "ISR", content: "Incremental Static Regeneration: static with background updates. Use `revalidate`." },
                  { title: "CSR", content: "Client‑Side Rendering: data fetched on the client. Use `useEffect` or data fetching libraries." },
                ],
              },
              {
                title: "Server Actions",
                slug: "nextjs-interview-server-actions",
                shortDescription: "Mutating data without API routes.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What are Server Actions", content: "Functions marked with `'use server'` that run on the server, called directly from forms or client components. They simplify mutations." },
                  { title: "Progressive Enhancement", content: "Server Actions work with `<form action>` even without JavaScript, providing progressive enhancement." },
                ],
              },
              {
                title: "Middleware and Caching",
                slug: "nextjs-interview-middleware",
                shortDescription: "Middleware, caching strategies.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Middleware", content: "Used for auth, redirects, and rewrites. Runs on the Edge." },
                  { title: "Caching", content: "`fetch` caching, `revalidatePath`, `revalidateTag`. Understand the default behaviour." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(nextJsCategory);
  console.log("✅ Next.js Fundamentals category seeded (ultra‑detailed)");
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