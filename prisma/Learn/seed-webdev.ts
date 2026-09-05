import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

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

        const sections = [...(topicSeed.sections ?? []), ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedWebDevCategory() {
  const webDevCategory: CategorySeed = {
    name: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    description: "Cover the browser, HTTP, frontend/backend responsibilities, and end-to-end application flow.",
    icon: "WEB",
    sortOrder: 9,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Develop a clear understanding of how web apps are built and delivered.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Web Foundations – How the Web Works",
            slug: "web-foundations",
            description: "The core concepts behind the web as a platform.",
            topics: [
              {
                title: "HTTP and Browser Basics – The Request‑Response Cycle",
                slug: "http-browser-basics",
                shortDescription: "Understand the flow of requests, responses, and rendered pages.",
                estimatedMinutes: 28,
                sections: [
                  { title: "The Browser Lifecycle", content: "A browser fetches resources (HTML, CSS, JS, images) via HTTP, parses HTML into a DOM tree, applies CSS styles, executes JavaScript, and renders pixels. This process happens for each page load." },
                  { title: "HTTP Methods and Status Codes", content: "Methods: `GET` (retrieve), `POST` (create), `PUT` (replace), `PATCH` (partial update), `DELETE` (remove). Status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)." },
                  { title: "Headers and Cookies", content: "Headers carry metadata: `Content‑Type`, `Accept`, `Authorization`, `Cache‑Control`. Cookies store small pieces of data on the client, used for sessions and tracking." },
                  { title: "DNS and Connection Setup", content: "DNS resolves domain names to IP addresses. Then a TCP connection is established (with TLS for HTTPS). The browser sends the HTTP request over this connection." },
                  { title: "Caching Headers – `Cache‑Control`, `ETag`", content: "`Cache‑Control` tells the browser how to cache responses (e.g., `max‑age=3600`). `ETag` is a validation token – the browser sends it in `If‑None‑Match` to check if the resource changed." },
                ],
              },
              {
                title: "HTML and CSS Essentials – Structure and Style",
                slug: "html-css-essentials",
                shortDescription: "Structure pages with HTML and style with CSS.",
                estimatedMinutes: 28,
                sections: [
                  { title: "HTML Structure – Semantic Elements", content: "Use semantic tags: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. This improves SEO and accessibility." },
                  { title: "CSS Box Model – The Foundation", content: "Every element is a box: content + padding + border + margin. `box‑sizing: border‑box` makes sizing predictable by including padding and border in the width." },
                  { title: "Flexbox – One‑Dimensional Layout", content: "`display: flex` – arranges items in a row or column. Properties: `justify‑content` (main axis), `align‑items` (cross axis), `flex‑wrap`, `gap`." },
                  { title: "Grid Layout – Two‑Dimensional Layout", content: "`display: grid` – defines rows and columns. Use `grid‑template‑columns`, `grid‑template‑rows`, `gap`, and `grid‑area` for complex layouts." },
                  { title: "Cascading and Specificity", content: "CSS rules are applied based on specificity (inline > ID > class > element) and source order. `!important` overrides everything, but use it sparingly." },
                ],
              },
              {
                title: "JavaScript in the Browser – Interactivity",
                slug: "javascript-browser",
                shortDescription: "Interact with the DOM and handle events.",
                estimatedMinutes: 26,
                sections: [
                  { title: "DOM Manipulation", content: "`document.querySelector`, `textContent`, `innerHTML`, `setAttribute`, `classList`. Manipulate the DOM to update the page dynamically." },
                  { title: "Events – User Interaction", content: "`addEventListener` handles clicks, input, submit, scroll, etc. Use event delegation to attach a listener to a parent." },
                  { title: "Event Bubbling and Delegation", content: "Events bubble up from the target to the root. Delegation attaches one listener to a parent, reducing the number of listeners." },
                  { title: "Fetching Data – `fetch` API", content: "`fetch('/api/data').then(res => res.json()).then(data => ...)` – asynchronously retrieves data from the server." },
                  { title: "The Event Loop – Concurrency Model", content: "JavaScript uses an event loop: call stack → microtasks (Promises) → macrotasks (setTimeout). This explains the order of execution." },
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
        description: "Cross‑browser, performance, tooling, and modern features.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Web Techniques",
            slug: "advanced-web",
            description: "Performance, compatibility, build tools, and modern CSS.",
            topics: [
              {
                title: "Performance Optimization – Core Web Vitals",
                slug: "web-performance",
                shortDescription: "Lazy loading, code splitting, critical CSS, Core Web Vitals.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Lazy Loading", content: "Load images, iframes, and scripts only when needed. Use `loading='lazy'` for images and `import()` for JavaScript." },
                  { title: "Code Splitting", content: "Split your JavaScript bundle into multiple chunks loaded on demand. Use dynamic imports: `import('./module').then(...)`." },
                  { title: "Critical Rendering Path – Optimising CSS/JS", content: "In‑line critical CSS for above‑the‑fold content. Defer non‑critical JavaScript with `async` or `defer`." },
                  { title: "Core Web Vitals – LCP, FID, CLS", content: "**LCP** – Largest Contentful Paint (<2.5s). **FID** – First Input Delay (<100ms). **CLS** – Cumulative Layout Shift (<0.1). Use Lighthouse to measure." },
                ],
              },
              {
                title: "Cross‑Browser Testing – Making It Work Everywhere",
                slug: "cross-browser",
                shortDescription: "Polyfills, feature detection, and testing tools.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Feature Detection – `Modernizr`", content: "Detect features at runtime and provide fallbacks. Example: `if ('fetch' in window) { ... }`." },
                  { title: "Polyfills – Backporting Modern Features", content: "Use `core‑js` or `polyfill.io` to provide missing features in older browsers." },
                  { title: "BrowserStack – Cloud Testing", content: "Test your site on real browsers and devices using BrowserStack or Sauce Labs." },
                ],
              },
              {
                title: "Build Tools – Webpack, Vite, ESBuild",
                slug: "build-tools",
                shortDescription: "Bundling, transpiling, and optimising assets.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Webpack – The Classic Bundler", content: "Entry, output, loaders (babel, css), plugins (HTML, copy). Highly configurable but complex." },
                  { title: "Vite – The Modern Build Tool", content: "Uses native ES modules for fast development. Builds with Rollup. Faster than Webpack for most projects." },
                  { title: "ESBuild – Super‑Fast Bundler", content: "Written in Go, extremely fast. Used by Vite under the hood." },
                  { title: "Transpiling with Babel", content: "Convert modern JavaScript (ES6+) to older versions for compatibility. Use presets like `@babel/preset‑env`." },
                ],
              },
              {
                title: "Modern CSS – Container Queries and `:has()`",
                slug: "modern-css",
                shortDescription: "Container queries, :has(), CSS nesting, and new features.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Container Queries – Style Based on Container Size", content: "`@container (min-width: 400px) { ... }` – style an element based on its parent's size, not the viewport." },
                  { title: "`:has()` – The Parent Selector", content: "`div:has(p)` – selects a div that contains a paragraph. Very useful for component styling." },
                  { title: "CSS Nesting – Native Nesting", content: "`.parent { .child { ... } }` – reduces the need for preprocessors like Sass." },
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
        description: "Web security, service workers, modern APIs, HTTP/2, HTTP/3, WebSockets, WebRTC, and accessibility.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Security and Progressive Web Apps",
            slug: "security-pwa",
            description: "Web security, service workers, and modern communication.",
            topics: [
              {
                title: "Web Security – XSS, CSRF, CSP, HTTPS",
                slug: "web-security",
                shortDescription: "Common vulnerabilities and mitigation.",
                estimatedMinutes: 28,
                sections: [
                  { title: "XSS – Cross‑Site Scripting", content: "Prevent by output encoding (escaping) and using `textContent` instead of `innerHTML`. Use CSP to block inline scripts." },
                  { title: "CSRF – Cross‑Site Request Forgery", content: "Use anti‑CSRF tokens, SameSite cookies, and `Origin`/`Referer` checks." },
                  { title: "Content Security Policy (CSP)", content: "`Content‑Security‑Policy` header restricts which resources can be loaded. Use `script‑src 'self'` to prevent inline scripts." },
                  { title: "HTTPS – Encrypting Traffic", content: "Always use HTTPS. Obtain certificates via Let's Encrypt. Enforce HTTPS with HSTS (Strict‑Transport‑Security)." },
                ],
              },
              {
                title: "Service Workers and PWAs – Offline First",
                slug: "service-workers",
                shortDescription: "Offline support and caching.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Service Worker Lifecycle", content: "Install → Activate → Fetch. During install, cache static assets. On fetch, serve from cache or network." },
                  { title: "Cache API – Storing Assets", content: "Use `caches.open('v1')` and `cache.addAll(urls)` to store assets. Serve from cache on fetch." },
                  { title: "Push Notifications – Web Push", content: "Use the Push API with a service worker to send notifications even when the app is closed." },
                ],
              },
              {
                title: "HTTP/2 and HTTP/3 – Faster, More Efficient",
                slug: "http2-http3",
                shortDescription: "Multiplexing, server push, and QUIC.",
                estimatedMinutes: 24,
                sections: [
                  { title: "HTTP/2 – Multiplexing and Server Push", content: "Multiple requests over a single connection. Reduces latency. Server push pre‑loads resources. Implemented in modern browsers." },
                  { title: "HTTP/3 – Built on QUIC", content: "Uses UDP instead of TCP, reducing connection establishment time. Improves performance on unreliable networks." },
                  { title: "How to Enable", content: "Use a CDN or server that supports HTTP/2 and HTTP/3 (Cloudflare, Nginx with QUIC)." },
                ],
              },
              {
                title: "WebSockets and WebRTC – Real‑Time Communication",
                slug: "websockets-webrtc",
                shortDescription: "Bidirectional communication and peer‑to‑peer.",
                estimatedMinutes: 24,
                sections: [
                  { title: "WebSockets – Persistent Connections", content: "Full‑duplex communication over a single TCP connection. Use `new WebSocket('ws://...')` for real‑time chat, live data." },
                  { title: "WebRTC – Peer‑to‑Peer Audio/Video", content: "Enables real‑time audio, video, and data sharing between browsers without a server. Uses `RTCPeerConnection`. Great for video calls." },
                  { title: "Security Considerations", content: "Use `wss://` (secure) for WebSockets. For WebRTC, use TURN/STUN servers for NAT traversal." },
                ],
              },
              {
                title: "Accessibility (a11y) – Inclusive Design",
                slug: "accessibility",
                shortDescription: "WCAG, ARIA, keyboard navigation, and semantic HTML.",
                estimatedMinutes: 26,
                sections: [
                  { title: "WCAG – Web Content Accessibility Guidelines", content: "Four principles: Perceivable, Operable, Understandable, Robust. Aim for level AA conformance." },
                  { title: "ARIA – Accessible Rich Internet Applications", content: "Use ARIA attributes (`role`, `aria‑label`, `aria‑expanded`) when semantic HTML is insufficient. But prefer semantic HTML first." },
                  { title: "Keyboard Navigation", content: "Ensure all interactive elements are reachable with Tab. Use `:focus` styles. Provide skip links." },
                  { title: "Semantic HTML", content: "Use the correct HTML elements – buttons for actions, links for navigation, headings for structure." },
                ],
              },
              {
                title: "Internationalization (i18n) – Global Reach",
                slug: "i18n",
                shortDescription: "Support multiple languages and locales.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Locale and Language Detection", content: "Detect user language from `navigator.language` or URL path (e.g., `/en/about`)." },
                  { title: "Translation Files", content: "Store translations in JSON files (e.g., `en.json`, `fr.json`). Use libraries like `i18next` or `vue‑i18n`." },
                  { title: "Date, Time, and Number Formatting", content: "Use `Intl.DateTimeFormat` and `Intl.NumberFormat` for locale‑sensitive formatting." },
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
        description: "Common web development interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Web Concepts",
            slug: "web-core-interview",
            description: "HTTP, DOM, events, performance, security.",
            topics: [
              {
                title: "CORS – Cross‑Origin Resource Sharing",
                slug: "web-cors",
                shortDescription: "Security mechanism for cross‑origin requests.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is CORS", content: "A browser security mechanism that restricts requests from one origin to another unless allowed by the server." },
                  { title: "Preflight Requests – OPTIONS", content: "For non‑simple requests (e.g., with custom headers), the browser sends an `OPTIONS` request to check permissions." },
                  { title: "Handling CORS on the Server", content: "Set `Access‑Control‑Allow‑Origin`, `Access‑Control‑Allow‑Methods`, `Access‑Control‑Allow‑Headers`." },
                ],
              },
              {
                title: "DOM and Events – Propagation and Delegation",
                slug: "web-dom-events",
                shortDescription: "Event phases and delegation.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Event Phases", content: "Capture → Target → Bubble. `addEventListener` can listen on capture or bubble." },
                  { title: "Event Delegation", content: "Attach a single listener to a parent to handle events from children. Improves performance and works for dynamically added elements." },
                ],
              },
              {
                title: "Performance and Optimization",
                slug: "web-perf-interview",
                shortDescription: "LCP, FID, CLS, lazy loading, code splitting.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Core Web Vitals", content: "Explain LCP (loading), FID (interactivity), CLS (stability) and how to optimise them." },
                  { title: "Rendering Optimisations", content: "Use `will‑change`, `transform` for animations, reduce DOM size." },
                ],
              },
              {
                title: "Security",
                slug: "web-security-interview",
                shortDescription: "XSS, CSRF, CSP, HTTPS.",
                estimatedMinutes: 20,
                sections: [
                  { title: "XSS Prevention", content: "Output encoding, CSP, `textContent` over `innerHTML`." },
                  { title: "CSRF Prevention", content: "CSRF tokens, SameSite cookies, `Origin` header." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(webDevCategory);
  console.log("✅ Web Development Fundamentals category seeded (ultra‑detailed)");
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