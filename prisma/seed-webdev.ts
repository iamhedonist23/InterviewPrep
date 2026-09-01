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

async function seedWebDevCategory() {
  const webDevCategory = {
    name: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    description: "Cover the browser, HTTP, frontend/backend responsibilities, and end-to-end application flow.",
    icon: "WEB",
    sortOrder: 9,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Develop a clear understanding of how web apps are built and delivered.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Web Foundations",
            slug: "web-foundations",
            description: "The core concepts behind the web as a platform.",
            topics: [
              {
                title: "HTTP and Browser Basics",
                slug: "http-browser-basics",
                shortDescription: "Understand the flow of requests, responses, and rendered pages.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The browser lifecycle", content: "Fetch, parse, render." },
                  { title: "HTTP methods and status codes", content: "GET, POST, 2xx, 4xx." },
                  { title: "Headers and cookies", content: "Metadata, sessions." },
                  { title: "DNS and connection setup", content: "Resolve domain, TCP/TLS." },
                  { title: "Caching headers", content: "Cache-Control." }
                ]
              },
              {
                title: "HTML and CSS Essentials",
                slug: "html-css-essentials",
                shortDescription: "Structure pages with HTML and style with CSS.",
                estimatedMinutes: 20,
                sections: [
                  { title: "HTML structure", content: "Semantic elements." },
                  { title: "CSS box model", content: "Content, padding, border, margin." },
                  { title: "Flexbox", content: "One-dimensional layout." },
                  { title: "Grid layout", content: "Two-dimensional layout." },
                  { title: "Cascading and specificity", content: "CSS rules priority." }
                ]
              },
              {
                title: "JavaScript in the Browser",
                slug: "javascript-browser",
                shortDescription: "Interact with the DOM and handle events.",
                estimatedMinutes: 20,
                sections: [
                  { title: "DOM manipulation", content: "querySelector, textContent." },
                  { title: "Events", content: "click, input." },
                  { title: "Event bubbling", content: "Delegation." },
                  { title: "Fetching data", content: "fetch API." },
                  { title: "The event loop", content: "Call stack, micro/macro tasks." }
                ]
              },
            ],
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Cross-browser, performance, and tooling.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Web Techniques",
            slug: "advanced-web",
            description: "Performance, compatibility, and build tools.",
            topics: [
              {
                title: "Performance Optimization",
                slug: "web-performance",
                shortDescription: "Lazy loading, code splitting, critical CSS.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Lazy loading", content: "Images, scripts." },
                  { title: "Code splitting", content: "Dynamic imports." },
                  { title: "Critical rendering path", content: "Optimize CSS/JS." }
                ]
              },
              {
                title: "Cross-Browser Testing",
                slug: "cross-browser",
                shortDescription: "Polyfills, feature detection.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Feature detection", content: "Modernizr." },
                  { title: "Polyfills", content: "Core-js." },
                  { title: "BrowserStack", content: "Testing across browsers." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Web security, service workers, and modern APIs.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Security and PWA",
            slug: "web-security-pwa",
            description: "Web security, service workers, and performance.",
            topics: [
              {
                title: "Web Security",
                slug: "web-security",
                shortDescription: "XSS, CSRF, CSP, HTTPS.",
                estimatedMinutes: 20,
                sections: [
                  { title: "XSS", content: "Prevent injection." },
                  { title: "CSRF", content: "Tokens." },
                  { title: "CSP", content: "Content Security Policy." }
                ]
              },
              {
                title: "Service Workers and PWAs",
                slug: "service-workers",
                shortDescription: "Offline support and caching.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Service worker lifecycle", content: "Install, activate." },
                  { title: "Cache API", content: "Store assets." },
                  { title: "Push notifications", content: "Web Push." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common web development interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Web Interview Topics",
            slug: "web-interview",
            description: "Frequently asked web topics.",
            topics: [
              {
                title: "CORS",
                slug: "web-cors",
                shortDescription: "Cross-origin resource sharing.",
                estimatedMinutes: 16,
                sections: [
                  { title: "What is CORS", content: "Security mechanism." },
                  { title: "Preflight requests", content: "OPTIONS." },
                  { title: "Handling CORS", content: "Server headers." }
                ]
              },
              {
                title: "DOM and Events",
                slug: "web-dom-events",
                shortDescription: "Event propagation, delegation.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Event phases", content: "Capture, target, bubble." },
                  { title: "Event delegation", content: "Performance." }
                ]
              }
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(webDevCategory);
  console.log("✓ Web Development Fundamentals category seeded");
}

async function main() {
  await seedWebDevCategory();
}

main()
  .catch((error) => {
    console.error("Web Development seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });