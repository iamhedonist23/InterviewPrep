// ---- 200+ Next.js Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["Next.js", "Next.js"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["Next.js", "What is Next.js and why is it used?", "nextjs-overview", "Define Next.js and its purpose.", "Next.js is a React framework that enables server-side rendering (SSR), static site generation (SSG), and other performance optimizations. It provides a full-stack solution with file-based routing, API routes, and built-in CSS/Sass support. It is used to build production-ready React applications with SEO, performance, and developer experience in mind."],
  ["Next.js", "How does Next.js differ from plain React?", "nextjs-vs-react", "Compare Next.js with React.", "React is a UI library; Next.js is a framework built on React. Next.js adds SSR, SSG, ISR, file-based routing, API routes, middleware, and image optimization out-of-the-box. React alone requires additional libraries for routing, SSR, and SEO."],
  ["Next.js", "What is the difference between SSR, SSG, and CSR?", "ssr-ssg-csr", "Explain rendering strategies.", "SSR (Server-Side Rendering): HTML is generated on each request. SSG (Static Site Generation): HTML is generated at build time and reused. CSR (Client-Side Rendering): HTML is minimal and content is rendered in the browser. Next.js supports all three."],
  ["Next.js", "What is the App Router in Next.js 13+?", "app-router", "Explain the App Router.", "The App Router is a new routing system introduced in Next.js 13, based on file conventions in the `app/` directory. It supports layouts, nested routes, loading states, error boundaries, and server components by default. It replaces the Pages Router for new applications."],
  ["Next.js", "What is the Pages Router?", "pages-router", "Explain the Pages Router.", "The Pages Router is the original routing system in Next.js, based on files in the `pages/` directory. Each file maps to a route. It supports `getStaticProps`, `getServerSideProps`, and `getStaticPaths`. It's still supported but not recommended for new projects."],
  ["Next.js", "What are Server Components in Next.js?", "server-components", "Explain React Server Components.", "Server Components are React components that run only on the server, not in the browser. They can be async and directly access backend resources. They reduce client-side JavaScript and improve performance. The App Router uses them by default."],
  ["Next.js", "What are Client Components?", "client-components", "Explain Client Components.", "Client Components are React components that run in the browser and can use client-side features like hooks, event handlers, and browser APIs. In the App Router, use the `'use client'` directive to mark them."],
  ["Next.js", "What is the difference between Server and Client Components?", "server-vs-client-components", "Compare component types.", "Server Components run only on the server, are async, and can't use client hooks. Client Components run in the browser and can use hooks and interactivity. Server Components reduce client JavaScript and are the default."],
  ["Next.js", "What is `getStaticProps`?", "getstaticprops", "Explain the function.", "`getStaticProps` is a function used in the Pages Router to fetch data at build time (SSG). It runs on the server during build and passes props to the page component. It's used for static pages that don't change often."],
  ["Next.js", "What is `getServerSideProps`?", "getserversideprops", "Explain the function.", "`getServerSideProps` is used in the Pages Router to fetch data on each request (SSR). It runs on the server for every request and is useful for dynamic content that needs fresh data."],
  ["Next.js", "What is `getStaticPaths`?", "getstaticpaths", "Explain the function.", "`getStaticPaths` is used with `getStaticProps` to define dynamic routes that should be pre-rendered. It returns an array of paths to generate at build time. It is used for SSG with dynamic routes."],
  ["Next.js", "What is Incremental Static Regeneration (ISR)?", "isr", "Explain ISR.", "ISR allows updating static pages after build without a full rebuild. Use `revalidate` in `getStaticProps` to set a time window after which the page can be regenerated on request. Combines benefits of SSG and SSR."],
  ["Next.js", "How do you create a new Next.js application?", "create-next-app", "Explain project creation.", "Use `npx create-next-app@latest` or `yarn create next-app`. It sets up a new project with the App Router by default. You can choose options like TypeScript, ESLint, Tailwind CSS, etc."],
  ["Next.js", "What is the `next.config.js` file?", "next-config", "Explain the configuration file.", "`next.config.js` is the configuration file for Next.js. It can be used to set environment variables, configure redirects, rewrites, headers, image domains, webpack, and many other options."],
  ["Next.js", "How do you handle environment variables in Next.js?", "env-variables", "Explain environment variables.", "Use `.env.local`, `.env.development`, `.env.production` files. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Server-side only variables (no prefix) are available in Node.js."],
  ["Next.js", "What is the `next/link` component?", "next-link", "Explain the Link component.", "`<Link>` is a built-in component for client-side navigation. It prefetches pages for performance. Use it with the `href` prop. It replaces `<a>` tags for internal navigation."],
  ["Next.js", "What is the `next/image` component?", "next-image", "Explain the Image component.", "`<Image>` is an optimized image component that lazy loads images, resizes them automatically, and supports modern formats. It improves performance and Core Web Vitals."],
  ["Next.js", "What are API routes in Next.js?", "api-routes", "Explain API routes.", "API routes allow you to build serverless API endpoints within your Next.js app. In the Pages Router, they are in `pages/api/`. In the App Router, use Route Handlers (`route.ts`). They are executed on the server."],
  ["Next.js", "How do you deploy a Next.js application?", "deployment", "Explain deployment options.", "Next.js can be deployed on Vercel (recommended), Netlify, AWS, or any Node.js hosting. Use `next build` and `next start` for production. For static exports, use `next export`."],
  ["Next.js", "What is the `next/head` component?", "next-head", "Explain the Head component.", "`<Head>` allows you to modify the `<head>` section of a page, adding title, meta tags, etc. It's used for SEO and is rendered on the server for SSR pages."],

  // ==================== ROUTING (20) ====================
  ["Next.js", "How does file-based routing work in the Pages Router?", "pages-routing", "Explain Pages routing.", "In the `pages` directory, each `.js`, `.jsx`, `.tsx` file becomes a route. `pages/index.js` maps to `/`. `pages/about.js` maps to `/about`. Dynamic routes use `[param].js`."],
  ["Next.js", "How does file-based routing work in the App Router?", "app-routing", "Explain App routing.", "In the `app` directory, a `page.js` file defines a route. Nested folders create nested routes. Use `page.js` for the main UI, `layout.js` for shared layout, `loading.js` for loading UI, `error.js` for errors, and `not-found.js` for 404."],
  ["Next.js", "What are dynamic routes in Next.js?", "dynamic-routes", "Explain dynamic routes.", "Dynamic routes allow you to create pages based on parameters. In Pages Router: `[id].js`. In App Router: `[id]/page.js`. The param is available via `useRouter()` or `params` in server components."],
  ["Next.js", "What is the `useRouter` hook?", "useRouter", "Explain the hook.", "`useRouter` is a hook from `next/router` that gives access to the router object, including `pathname`, `query`, `push`, `replace`, and other methods. It's used in Client Components for programmatic navigation and accessing route parameters."],
  ["Next.js", "What are catch-all routes and optional catch-all routes?", "catch-all-routes", "Explain catch-all routes.", "Catch-all routes match any path. In Pages Router: `[...slug].js`. In App Router: `[...slug]/page.js`. Optional catch-all: `[[...slug]].js` or `[[...slug]]/page.js`."],
  ["Next.js", "What is a layout in the App Router?", "layout", "Explain layouts.", "A layout is a component that wraps pages and is shared across multiple routes. It preserves state, is not re-rendered on navigation, and can be nested. Define a `layout.js` in any folder."],
  ["Next.js", "What is a `loading.js` file?", "loading", "Explain loading UI.", "`loading.js` defines a loading UI that is shown automatically when the route is fetching data (using Suspense). It's placed alongside `page.js`."],
  ["Next.js", "What is a `error.js` file?", "error", "Explain error boundaries.", "`error.js` defines an error boundary for a route segment. It catches errors in the layout and its child pages. It receives the error and a reset function. It's used for client-side errors."],
  ["Next.js", "What is a `global-error.js` file?", "global-error", "Explain global error.", "`global-error.js` is a special error file that wraps the entire application. It must include an `html` and `body` tag. It catches errors not caught by `error.js`."],
  ["Next.js", "What is a `not-found.js` file?", "not-found", "Explain 404 handling.", "`not-found.js` is shown when a route is not found. It can be triggered by calling `notFound()` in a page. It's placed alongside `page.js`."],
  ["Next.js", "What is middleware in Next.js?", "middleware", "Explain middleware.", "Middleware runs before a request is completed. It can modify the request, rewrite the URL, redirect, or add headers. Use a `middleware.ts` file at the root (or in `src`). It runs on the Edge runtime."],
  ["Next.js", "How do you redirect in Next.js?", "redirects", "Explain redirects.", "Use `redirect()` in Server Components or Server Actions. For API routes, use `res.redirect()`. In `next.config.js`, define permanent redirects using `redirects`."],
  ["Next.js", "How do you rewrite URLs in Next.js?", "rewrites", "Explain rewrites.", "Rewrites map an incoming request path to a different destination path. They are defined in `next.config.js` under `rewrites`. Useful for proxying to external APIs."],
  ["Next.js", "What are route handlers (API routes) in the App Router?", "route-handlers", "Explain route handlers.", "Route handlers are server-side functions defined in `app/api/route.ts` that handle HTTP requests. They export named functions for `GET`, `POST`, etc., and return `Response` objects. They replace `pages/api`."],
  ["Next.js", "What is the difference between `pages/api` and App Router route handlers?", "api-vs-route-handlers", "Compare API approaches.", "`pages/api` uses Express-like request/response. Route handlers use the Web Request/Response API and are more aligned with modern standards. Route handlers also support middleware and edge runtime."],
  ["Next.js", "What is the `cookies` function in Server Components?", "cookies-function", "Explain cookies handling.", "In Server Components, use `cookies()` from `next/headers` to read and set cookies. It's only available in Server Components and Route Handlers."],
  ["Next.js", "What is the `headers` function?", "headers-function", "Explain headers handling.", "`headers()` from `next/headers` allows reading request headers in Server Components and Route Handlers. It's read-only."],
  ["Next.js", "How do you handle authentication in Next.js?", "authentication", "Explain authentication approaches.", "Use middleware for route protection. Store session/token in cookies. Use Server Components to check authentication on the server. For client-side, use context or Zustand. Popular libraries: NextAuth.js, Auth.js, Clerk."],
  ["Next.js", "What is the `useSearchParams` hook?", "useSearchParams", "Explain the hook.", "`useSearchParams` is a hook from `next/navigation` that returns a read-only version of the URL search parameters. It's used in Client Components."],
  ["Next.js", "What is the `usePathname` hook?", "usePathname", "Explain the hook.", "`usePathname` returns the current URL pathname as a string. It's used in Client Components for navigation detection."],

  // ==================== DATA FETCHING (15) ====================
  ["Next.js", "How do you fetch data in Server Components?", "fetch-server-components", "Explain data fetching in Server Components.", "In Server Components, you can use `fetch` directly with `async/await`. Next.js extends `fetch` with caching and revalidation options (e.g., `cache: 'force-cache'`, `next: { revalidate: 60 }`)."],
  ["Next.js", "What is the `fetch` caching behavior in Next.js?", "fetch-caching", "Explain fetch caching.", "By default, `fetch` in Server Components uses a 'force-cache' strategy (cached indefinitely). Use `cache: 'no-store'` to disable caching (SSR). Use `next: { revalidate: seconds }` for ISR."],
  ["Next.js", "What is the `unstable_cache` function?", "unstable-cache", "Explain `unstable_cache`.", "`unstable_cache` is a utility from `next/cache` that caches the result of a function. It's useful for caching complex data fetching logic across requests. It supports revalidation and tags."],
  ["Next.js", "What are Server Actions in Next.js?", "server-actions", "Explain Server Actions.", "Server Actions are functions that run on the server and can be called from Client Components. They are defined with `'use server'`. They are used for mutations (forms, data updates) and automatically handle revalidation."],
  ["Next.js", "How do you use `useFormState` with Server Actions?", "useFormState", "Explain `useFormState`.", "`useFormState` is a hook that allows you to manage form state when using Server Actions. It returns the current state and a function to trigger the action, handling pending states and errors."],
  ["Next.js", "What is `useFormStatus`?", "useFormStatus", "Explain the hook.", "`useFormStatus` provides information about the pending state of a form submission. It is used within a form to show loading indicators."],
  ["Next.js", "What is the `revalidatePath` function?", "revalidatePath", "Explain `revalidatePath`.", "`revalidatePath` is used in Server Actions to revalidate the data for a specific path, updating the cache. Example: `revalidatePath('/posts')`."],
  ["Next.js", "What is the `revalidateTag` function?", "revalidateTag", "Explain `revalidateTag`.", "`revalidateTag` revalidates all cache entries associated with a given tag. Tags can be set in `fetch` options: `next: { tags: ['posts'] }`."],
  ["Next.js", "How do you fetch data in Client Components?", "fetch-client-components", "Explain client-side data fetching.", "Use `useEffect` with `fetch` or libraries like React Query, SWR, or TanStack Query. Also, you can use Server Components to fetch data and pass it as props to Client Components."],
  ["Next.js", "What are the data fetching methods in the Pages Router?", "pages-data-fetching", "Explain `getStaticProps`, `getServerSideProps`, `getStaticPaths`.", "`getStaticProps`: fetch at build time (SSG). `getServerSideProps`: fetch on each request (SSR). `getStaticPaths`: define dynamic paths for SSG. They are used in page components."],
  ["Next.js", "What is the difference between SSG and ISR?", "ssg-vs-isr", "Compare SSG and ISR.", "SSG generates HTML at build time; ISR allows re-generating a page after the initial build at a configured revalidation interval, updating it incrementally without a full rebuild."],
  ["Next.js", "How do you handle loading states in Next.js?", "loading-states", "Explain loading handling.", "In the App Router, use `loading.js` for automatic Suspense fallback. In Pages Router, use `router.events` or state management. Also use `React.Suspense` manually."],
  ["Next.js", "How do you handle errors in data fetching?", "data-fetching-errors", "Explain error handling.", "Use try/catch in Server Components. In the Pages Router, use `getStaticProps` and `getServerSideProps` errors with `notFound` or `redirect`. In App Router, use `error.js` boundaries."],
  ["Next.js", "What is the `notFound()` function?", "notFound-function", "Explain `notFound()`.", "`notFound()` is a function that triggers a 404 response and renders the closest `not-found.js` file. It is used in Server Components and Server Actions."],
  ["Next.js", "What is the `redirect()` function?", "redirect-function", "Explain `redirect()`.", "`redirect()` performs a server-side redirect to a specified URL. It can be used in Server Components, Server Actions, and Route Handlers. It throws a redirect error that must be caught."],

  // ==================== PERFORMANCE & OPTIMIZATION (15) ====================
  ["Next.js", "How does Next.js optimize performance?", "performance-optimization", "List optimization features.", "Next.js optimizes via: Image optimization (`next/image`), automatic code splitting, lazy loading, prefetching (`next/link`), static generation (SSG), incremental static regeneration (ISR), server components, and efficient bundling with Turbopack."],
  ["Next.js", "What is code splitting in Next.js?", "code-splitting", "Explain code splitting.", "Next.js automatically splits code per route, so each page loads only what it needs. It also supports dynamic imports with `next/dynamic` for component-level code splitting."],
  ["Next.js", "What is the `next/dynamic` function?", "dynamic-import", "Explain dynamic imports.", "`next/dynamic` allows lazy loading React components, reducing initial bundle size. It supports loading components with SSR disabled or with loading fallbacks."],
  ["Next.js", "How do you optimize images in Next.js?", "image-optimization", "Explain image optimization.", "Use `next/image` for automatic optimization: lazy loading, responsive resizing, webp/avif formats, and placeholder blur. Configure image domains in `next.config.js`."],
  ["Next.js", "What is Font Optimization in Next.js?", "font-optimization", "Explain font loading.", "Next.js automatically optimizes Google Fonts by preloading and reducing layout shift. Use `@next/font` for self-hosted fonts."],
  ["Next.js", "What is Script Optimization in Next.js?", "script-optimization", "Explain script loading.", "Use `next/script` to load third-party scripts with strategies: `afterInteractive`, `lazyOnload`, `beforeInteractive`."],
  ["Next.js", "What is the `useMemo` and `useCallback` relationship in Next.js?", "memoization", "Explain memoization.", "They are React hooks used in Client Components. Next.js does not alter their behavior; they are used to prevent unnecessary re-renders and recalculations."],
  ["Next.js", "How do you configure `webpack` in Next.js?", "webpack-config", "Explain webpack customization.", "In `next.config.js`, use `webpack` function to modify the webpack configuration. Add rules, plugins, or aliases. Next.js also supports `swc` for faster compilation."],
  ["Next.js", "What is the Edge Runtime?", "edge-runtime", "Explain Edge Runtime.", "The Edge Runtime runs your code on CDN edge servers (Vercel). It's used for Middleware, Edge API Routes, and Edge Functions. It has lower latency and supports Web APIs, but limited Node.js features."],
  ["Next.js", "What is the difference between the Node.js runtime and Edge Runtime?", "node-vs-edge", "Compare runtimes.", "Node.js runtime is full-featured, supports all Node.js APIs. Edge Runtime is V8-based, lightweight, and runs on the edge; it supports only Web APIs and some Node.js APIs. Edge is faster but more limited."],
  ["Next.js", "How do you enable gzip compression?", "gzip-compression", "Explain compression.", "Next.js automatically compresses static assets with gzip. For dynamic responses, ensure your server (or Vercel) enables compression. You can also use `compression` middleware."],
  ["Next.js", "What is the `maxDuration` for serverless functions?", "maxDuration", "Explain timeout limit.", "On Vercel, serverless functions have a maximum execution time (e.g., 10s for Hobby). You can set `maxDuration` in `next.config.js` or per route to increase timeout."],
  ["Next.js", "How do you analyze bundle sizes?", "bundle-analyzer", "Explain bundle analysis.", "Use `@next/bundle-analyzer` plugin. Add it to `next.config.js` and run `ANALYZE=true next build`. It generates visual reports of bundle sizes."],
  ["Next.js", "What are the best practices for performance in Next.js?", "performance-best-practices", "List best practices.", "Use SSG where possible, enable ISR for dynamic content. Lazy load images and components. Use the App Router for better performance. Prefetch links. Minimize client-side JavaScript by using Server Components."],
  ["Next.js", "What is the `useOptimistic` hook?", "useOptimistic", "Explain the hook.", "`useOptimistic` is a React hook that allows you to optimistically update UI while awaiting a server action. It's used in Client Components with Server Actions to provide instant feedback."],

  // ==================== DEPLOYMENT & OPERATIONS (10) ====================
  ["Next.js", "How do you build a Next.js application for production?", "build-production", "Explain build process.", "Run `next build` to create a production build. It generates optimized static files and server-side logic. Then `next start` runs the production server."],
  ["Next.js", "What is `next export` and when to use it?", "next-export", "Explain static export.", "`next export` generates a fully static site from a Next.js app. It disables server-side features (SSR, API routes). Used for hosting on static hosting (e.g., S3, Netlify)."],
  ["Next.js", "How do you deploy Next.js on Vercel?", "vercel-deployment", "Explain Vercel deployment.", "Connect your Git repository. Vercel automatically detects Next.js and builds it. Uses the Vercel Edge Network for optimal performance. Supports preview deployments and environment variables."],
  ["Next.js", "How do you deploy Next.js on a custom server?", "custom-server", "Explain custom deployment.", "You can use `next start` with Node.js. For containers, use a Docker image. Ensure you set `NODE_ENV=production`. Or use a custom server with Express, but it's not recommended."],
  ["Next.js", "What are environment variables in production?", "env-production", "Explain env usage.", "Environment variables are set on the hosting platform. `NEXT_PUBLIC_` variables are embedded at build time. Server-side variables are available at runtime. Use `.env.production` for defaults."],
  ["Next.js", "How do you handle secrets in Next.js?", "secrets", "Explain handling secrets.", "Never hardcode secrets. Use environment variables without `NEXT_PUBLIC_` prefix. They are only accessible on the server (API routes, Server Components). In Vercel, add them in the dashboard."],
  ["Next.js", "What is the `next build` output?", "build-output", "Explain build output.", "The build output includes `.next` directory with static files, server bundles, and generated pages. It contains `server` (server-side code), `static` (client assets), and `cache` (build cache)."],
  ["Next.js", "How do you monitor a Next.js application?", "monitoring", "Explain monitoring.", "Use Vercel Analytics or third-party tools (Datadog, Sentry, New Relic). For custom metrics, use `next/script` to inject monitoring scripts. Also use `next.logging`."],
  ["Next.js", "What is the `next start` command?", "next-start", "Explain starting production server.", "`next start` starts the production server. It serves the built application, handles dynamic routes, and serves static files. It's used in production environments."],
  ["Next.js", "How do you configure health checks for Next.js?", "health-checks", "Explain health checks.", "Create a route handler at `/api/health` that returns 200 OK. For serverless, ensure it responds quickly. For custom servers, add a health endpoint."],

  // ==================== ADVANCED PATTERNS (15) ====================
  ["Next.js", "What is the `next.config.js` redirects and rewrites?", "redirects-rewrites", "Explain redirects/rewrites.", "Redirects send users to another path. Rewrites map a request to another internal path without changing the URL. They are defined as arrays in `next.config.js`."],
  ["Next.js", "How do you use `next/headers` and `next/cookies`?", "headers-cookies", "Explain headers/cookies API.", "In Server Components and Route Handlers, use `cookies()` from `next/headers` to read cookies. Use `headers()` to read request headers. They are read-only."],
  ["Next.js", "What are intercepting routes?", "intercepting-routes", "Explain intercepting routes.", "Intercepting routes allow you to load a route from another route, often used for modals. Use the `(..)` convention in App Router: e.g., `(.)` for same level, `(..)` for parent, etc."],
  ["Next.js", "What are parallel routes?", "parallel-routes", "Explain parallel routes.", "Parallel routes allow rendering multiple pages simultaneously in the same layout using slots. Use `@folder` notation in the App Router, e.g., `app/@analytics/page.js`."],
  ["Next.js", "What are route groups in the App Router?", "route-groups", "Explain route groups.", "Route groups are folders with parentheses (e.g., `(auth)`) that group routes without affecting the URL path. They are used for organizing files and applying layouts to specific groups."],
  ["Next.js", "What is the `useSelectedLayoutSegment` hook?", "useSelectedLayoutSegment", "Explain the hook.", "`useSelectedLayoutSegment` returns the active segment of a layout. Useful for highlighting navigation items. It's used in Client Components."],
  ["Next.js", "What is the `useSelectedLayoutSegments` hook?", "useSelectedLayoutSegments", "Explain the hook.", "Returns an array of active segments. Useful for breadcrumb generation."],
  ["Next.js", "What is the `not-found` file in the App Router?", "not-found-app", "Explain the 404 file.", "`not-found.js` is a file that renders a 404 page for a route. It can be placed in any segment. It's shown when `notFound()` is called or no route matches."],
  ["Next.js", "What is the `error` file in the App Router?", "error-app", "Explain error boundaries.", "`error.js` defines a React error boundary for a route. It catches runtime errors and displays a fallback UI. It's a Client Component."],
  ["Next.js", "What is the `loading` file?", "loading-app", "Explain loading UI.", "`loading.js` wraps a route in a Suspense boundary and shows a fallback during data fetching. It's automatically used with `use` or `fetch` in Server Components."],
  ["Next.js", "How do you implement a custom 404 page?", "custom-404", "Explain 404 custom.", "Create `pages/404.js` in Pages Router, or `app/not-found.js` in App Router. It will be shown for 404 errors."],
  ["Next.js", "How do you implement a custom 500 page?", "custom-500", "Explain 500 custom.", "Create `pages/_error.js` or `pages/500.js` in Pages Router. In App Router, use `app/global-error.js` for 500 errors."],
  ["Next.js", "What is the `useRouter` hook in App Router?", "useRouter-app", "Explain `useRouter` in App Router.", "In the App Router, `useRouter` is from `next/navigation`. It provides `push`, `replace`, `prefetch`, `back`, and `forward` methods. It's used in Client Components."],
  ["Next.js", "What is the `redirect` function in Server Actions?", "redirect-server-actions", "Explain redirect in actions.", "Inside Server Actions, use `redirect` to perform a server-side redirect after mutation. It throws a special error, so it should be called at the end of the action."],
  ["Next.js", "What are the differences between `next/router` and `next/navigation`?", "router-vs-navigation", "Compare routing hooks.", "`next/router` is for Pages Router; `next/navigation` is for App Router. `next/navigation` supports more features like `usePathname`, `useSearchParams`, and is async."],

  // ==================== TESTING (10) ====================
  ["Next.js", "How do you test Next.js applications?", "testing-overview", "Explain testing approaches.", "Use Jest with React Testing Library for unit/integration tests. Use `@testing-library/react` for components. For end-to-end, use Cypress or Playwright. Next.js provides examples and support for testing."],
  ["Next.js", "How do you test API routes?", "testing-api-routes", "Explain API testing.", "Test API routes using `supertest` or `jest` with `createMocks` from `next-test-api-route-handler`. In App Router, test Route Handlers similarly."],
  ["Next.js", "How do you test Server Components?", "testing-server-components", "Explain testing Server Components.", "Use `@testing-library/react` with `render` and `unstable_render`. Server Components cannot be tested in the browser; use the `react-dom/server` for SSR testing."],
  ["Next.js", "How do you test Client Components?", "testing-client-components", "Explain testing Client Components.", "Use React Testing Library with `render` from `@testing-library/react`. Mock hooks and dependencies as needed. Use `jest.mock` for external modules."],
  ["Next.js", "How do you test data fetching in Pages Router?", "testing-data-fetching", "Explain testing data fetching.", "Mock `getStaticProps` and `getServerSideProps` in Jest. Test the logic by calling the function and asserting on the returned props."],
  ["Next.js", "How do you test Server Actions?", "testing-server-actions", "Explain testing Server Actions.", "Test Server Actions as normal async functions. Mock `revalidatePath` and `redirect` if needed. Use `jest.spyOn` to check calls."],
  ["Next.js", "What is the `@testing-library/react` approach for Next.js?", "testing-library", "Explain using Testing Library.", "Write tests that interact with components as users would. Use `render`, `fireEvent`, `screen`. Use `jest` for assertions and mocking."],
  ["Next.js", "How do you test redirects and routing?", "testing-redirects", "Explain testing routing.", "For Pages Router, use `next-router-mock` to mock the router. For App Router, use `next/navigation` mocks. Test that `redirect` and `push` are called appropriately."],
  ["Next.js", "What is the `next/jest` preset?", "next-jest", "Explain the preset.", "`next/jest` provides a preset for Jest that configures the environment, handles CSS, images, and other transformations. Use `jest.config.js` with `preset: 'next/jest'`."],
  ["Next.js", "How do you run tests in CI/CD?", "ci-cd-testing", "Explain CI testing.", "In CI, run `npm test` or `yarn test`. Use `--watchAll=false` to exit after tests. Also run `next build` to catch build errors."],

  // ==================== SECURITY (10) ====================
  ["Next.js", "How do you secure a Next.js application?", "security-overview", "Explain security measures.", "Use environment variables for secrets. Enable CSP headers. Validate user input. Use Server Components to avoid exposing sensitive data. Use HTTPS. Implement authentication and authorization."],
  ["Next.js", "How do you prevent XSS in Next.js?", "xss-prevention", "Explain XSS protection.", "React escapes content by default. Use `dangerouslySetInnerHTML` with caution and sanitize. Use CSP (Content Security Policy) headers. Validate and sanitize user input."],
  ["Next.js", "How do you protect API routes?", "api-security", "Explain API security.", "Validate authentication tokens (JWT) in Route Handlers. Use middleware for global auth. Use rate limiting (e.g., `upstash` or `express-rate-limit`). Avoid exposing internal errors."],
  ["Next.js", "What is CSRF protection in Next.js?", "csrf-protection", "Explain CSRF.", "CSRF attacks are mitigated by using SameSite cookies. For Server Actions, Next.js automatically adds a CSRF token. Ensure you use HTTPS."],
  ["Next.js", "How do you handle authentication in middleware?", "auth-middleware", "Explain auth middleware.", "In `middleware.ts`, check for authentication (e.g., verify JWT in cookie). Redirect to login if not authenticated. Use `NextResponse.redirect`."],
  ["Next.js", "What are security headers and how to add them?", "security-headers", "Explain headers.", "Add security headers like `X-Frame-Options`, `X-Content-Type-Options`, and `Content-Security-Policy` via `next.config.js` `headers` function or middleware."],
  ["Next.js", "How do you handle environment variables securely?", "secure-env", "Explain secure env.", "Do not commit `.env` files to Git. Use `.env.local` for local development. In production, use the hosting platform's environment variable management."],
  ["Next.js", "How do you prevent SQL injection in Next.js?", "sql-injection", "Explain prevention.", "Use parameterized queries with database libraries (Prisma, Knex). Never concatenate user input into SQL strings."],
  ["Next.js", "How do you handle file uploads securely?", "secure-uploads", "Explain secure uploads.", "Validate file type and size. Store files in a secure location (cloud storage). Use random filenames. Avoid executing uploaded files."],
  ["Next.js", "What is the `next/security` package?", "next-security", "Explain security package.", "There is no official `next/security` package. Security is handled via headers, middleware, and best practices."],

  // ==================== SCENARIO-BASED (20) ====================
  ["Next.js", "How would you build a blog with Next.js using SSG?", "blog-ssg", "Explain building a blog.", "Use `getStaticProps` to fetch posts from a CMS or Markdown files. Use `getStaticPaths` to generate individual post pages. Use `next/image` for images. Use ISR with `revalidate` for updates."],
  ["Next.js", "How would you implement a search feature?", "search-implementation", "Explain search.", "Use a search engine (Algolia, Elasticsearch). Fetch results on the server or client. Use `useDebounce` for client-side. Use Server Actions for form submission."],
  ["Next.js", "How would you handle forms in Next.js?", "forms", "Explain form handling.", "Use Server Actions for mutations. Use `useFormState` for error handling. For client-side validation, use `react-hook-form`. Use `useFormStatus` for loading states."],
  ["Next.js", "How would you implement authentication with NextAuth.js?", "nextauth", "Explain NextAuth integration.", "Install `next-auth`. Configure providers (GitHub, Google). Create API route `pages/api/auth/[...nextauth].js` or App Router route handler. Use `useSession` hook for client-side."],
  ["Next.js", "How would you implement an e-commerce product page with dynamic routes?", "ecommerce-product", "Explain product page.", "Use dynamic routes (`[id]/page.js`). Fetch product data using `fetch` in Server Component. Use `generateStaticParams` (App Router) or `getStaticPaths` for pre-rendering. Handle not found with `notFound()`."],
  ["Next.js", "How would you implement a shopping cart with Next.js?", "shopping-cart", "Explain cart implementation.", "Store cart data in cookies or database. Use Server Actions to add/remove items. Use `cookies()` to read/write in Server Components. For client-side, use Zustand or Context."],
  ["Next.js", "How would you implement pagination with Next.js?", "pagination", "Explain pagination.", "Use query parameters (`?page=2`). Fetch data based on page. In Server Component, use `searchParams` to get page number. Use `useRouter` for navigation."],
  ["Next.js", "How would you implement a dark mode toggle?", "dark-mode", "Explain dark mode.", "Use `next-themes` library. Or use context with local storage. Apply CSS classes to the `body`."],
  ["Next.js", "How would you implement internationalization (i18n)?", "i18n", "Explain i18n.", "Use `next-intl` or `next-i18next`. Configure locales in `next.config.js`. Use dynamic routes for language. Use `useRouter` for locale detection."],
  ["Next.js", "How would you implement a real-time chat with Next.js?", "real-time-chat", "Explain real-time chat.", "Use WebSockets via `socket.io` or Pusher. For serverless, use Vercel's Edge functions or WebSocket services. Use Server Components for initial state, Client Components for real-time updates."],
  ["Next.js", "How would you implement a payment flow (e.g., Stripe)?", "payment-flow", "Explain payment integration.", "Use Stripe Checkout or Elements. Use API routes for creating payment intents. Use Server Actions for webhook handling. Handle redirects and success/failure pages."],
  ["Next.js", "How would you implement a dashboard with authentication?", "dashboard-auth", "Explain dashboard security.", "Protect the `/dashboard` route using middleware. Check session in middleware, redirect to login if unauthenticated. Use Server Components to fetch user data."],
  ["Next.js", "How would you handle large datasets and performance in Next.js?", "large-datasets", "Explain handling large data.", "Use pagination or infinite scrolling. Use virtualization libraries (react-window). Use ISR or caching to avoid server overload. Use Edge Functions for fast responses."],
  ["Next.js", "How would you implement a contact form with email sending?", "contact-form", "Explain contact form.", "Use Server Action to send email via Nodemailer or SendGrid. Validate input with Zod. Handle errors and return success message with `useFormState`."],
  ["Next.js", "How would you implement a multi-step form?", "multi-step-form", "Explain multi-step form.", "Use state to manage current step. Store form data in state or URL params. Submit at the end using Server Action. Use `useRouter` for navigation."],
  ["Next.js", "How would you implement a live preview for CMS content?", "live-preview", "Explain preview mode.", "Use Next.js Preview Mode (`preview = true`). In `getStaticProps`, check if preview mode is enabled and fetch draft content. Use `useRouter` to toggle."],
  ["Next.js", "How would you handle file downloads in Next.js?", "file-download", "Explain file downloads.", "Use Route Handlers to stream files. Set `Content-Disposition` attachment. Use `fs` or cloud storage to read the file."],
  ["Next.js", "How would you implement a progress bar for navigation?", "progress-bar", "Explain progress bar.", "Use `next/router` events (`routeChangeStart`, `routeChangeComplete`). Show a loading bar component. For App Router, use `useRouter` and `usePathname` to detect changes."],
  ["Next.js", "How would you implement SEO meta tags dynamically?", "seo-meta", "Explain dynamic SEO.", "Use `next/head` in Pages Router or `Head` from `next/head` in App Router. For dynamic tags, use `metadata` export in Server Components (App Router) for easier management."],
  ["Next.js", "How would you handle multiple environments (dev, staging, prod)?", "environments", "Explain environment handling.", "Use `NODE_ENV` and custom environment variables. Use `.env.development`, `.env.production`. For staging, use a separate branch and environment variables."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Next.js concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Next.js features without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "nextjs" },
    update: { name: "Next.js", group: "Technology", description: "Next.js interview questions." },
    create: { name: "Next.js", slug: "nextjs", group: "Technology", description: "Next.js interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "nextjs" } },
    update: {},
    create: { name: "Next.js", slug: "nextjs", categoryId: category.id },
  });

  for (let topicIndex = 0; topicIndex < topics.length; topicIndex += 1) {
    const [, question, slug, shortDescription, sampleAnswer] = topics[topicIndex];
    const commonMistakes = buildCommonMistakes(question);
    const followUpQuestions = [
      topics[(topicIndex + 1) % topics.length][1],
      topics[(topicIndex + 2) % topics.length][1],
      topics[(topicIndex + 3) % topics.length][1],
    ];
    await prisma.interviewQuestion.upsert({
      where: { slug },
      update: {
        question,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["Next.js"],
        isPublished: true,
      },
      create: {
        question,
        slug,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["Next.js"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Next.js questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");