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
                  { title: "The browser lifecycle", content: "A browser fetches resources, parses HTML, applies CSS, executes JavaScript, and renders a view. Understanding this lifecycle is essential for debugging and performance optimization." },
                  { title: "HTTP methods and status codes", content: "HTTP defines request methods (GET, POST, PUT, PATCH, DELETE) and status codes that classify responses: 2xx success, 3xx redirect, 4xx client error, 5xx server error." },
                  { title: "Headers and cookies", content: "Headers carry metadata like content type and authentication tokens. Cookies persist small pieces of data on the client, commonly used for sessions.\n\nExample:\nSet-Cookie: session_id=abc123; HttpOnly; Secure" },
                  { title: "DNS and connection setup", content: "Before a request is sent, the browser resolves the domain name to an IP address via DNS, then establishes a TCP connection (and a TLS handshake for HTTPS) before the HTTP exchange begins." },
                  { title: "Caching headers", content: "Cache-Control and ETag headers tell the browser (and intermediary caches) how long a response can be reused without re-fetching, balancing freshness against performance." },
                ],
              },
              {
                title: "HTML and CSS Essentials",
                slug: "html-css-essentials",
                shortDescription: "Structure pages with HTML and style with CSS.",
                estimatedMinutes: 20,
                sections: [
                  { title: "HTML structure", content: "HTML provides semantic meaning to content. Headings, lists, forms, and sections make pages accessible and maintainable, and help screen readers and search engines understand the page." },
                  { title: "The CSS box model", content: "Every element is a box with content, padding, border, and margin. Understanding how these stack determines an element's actual rendered size and spacing." },
                  { title: "Flexbox", content: "Flexbox arranges items in a single row or column, distributing space and aligning items easily.\n\nExample:\n.container { display: flex; justify-content: space-between; align-items: center; }" },
                  { title: "Grid layout", content: "CSS Grid arranges items in two dimensions (rows and columns) simultaneously, ideal for full page layouts.\n\nExample:\n.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }" },
                  { title: "Cascading and specificity", content: "When multiple CSS rules target the same element, specificity (ID > class > element) and source order determine which rule wins, explaining why some styles seem to be 'ignored'." },
                ],
              },
              {
                title: "JavaScript in the Browser",
                slug: "javascript-browser",
                shortDescription: "Interact with the DOM and handle events.",
                estimatedMinutes: 20,
                sections: [
                  { title: "DOM manipulation", content: "The DOM is a programmatic tree representation of the page. JavaScript can query elements, change attributes, and trigger reflows.\n\nExample:\nconst el = document.querySelector('.title');\nel.textContent = 'Updated!';" },
                  { title: "Events", content: "User interactions (click, input, scroll) fire events. Listeners (callback functions) respond to those events and update the page.\n\nExample:\nbutton.addEventListener('click', () => alert('Clicked!'));" },
                  { title: "Event bubbling and delegation", content: "Events bubble up from the target element through its ancestors. Event delegation attaches one listener to a parent to handle events from many children, improving performance for dynamic lists." },
                  { title: "Fetching data", content: "The fetch API makes asynchronous HTTP requests from the browser.\n\nExample:\nfetch('/api/users').then(res => res.json()).then(data => console.log(data));" },
                  { title: "The event loop", content: "JavaScript is single-threaded but handles async operations (timers, network requests) via the event loop, which processes the call stack, then microtasks (Promises), then macrotasks (setTimeout) in that priority order." },
                ],
              },
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
