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

async function seedReactCategory() {
  const reactCategory: CategorySeed = {
    name: "React Fundamentals",
    slug: "react-fundamentals",
    description: "Learn the component model, state, props, hooks, and rendering behavior in React.",
    icon: "REACT",
    sortOrder: 2,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand how React renders, updates, and reuses UI.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "React Basics – The Building Blocks",
            slug: "react-basics",
            description: "The building blocks of React components and rendering.",
            topics: [
              {
                title: "Components and Props – Reusable UI Pieces",
                slug: "components-props",
                shortDescription: "Break the UI into reusable functions and pass data via props.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is a React Component?", content: "A React component is a function or class that returns a piece of UI. It takes inputs (props) and returns React elements. Components can be nested, reused, and composed to build complex UIs." },
                  { title: "Props are Read‑Only – One‑Way Data Flow", content: "Props are immutable inputs from a parent component. A child must never modify props – it should treat them as read‑only. To communicate back, the parent passes callback functions as props." },
                  { title: "Composing Components", content: "Components can be composed by nesting them. The `children` prop allows passing arbitrary content:\n```jsx\nfunction Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}\n<Card><p>Inside the card</p></Card>\n```" },
                  { title: "Default and Typed Props", content: "Use default values: `function Button({ label = 'Click me' })` or `Button.defaultProps`. In TypeScript, define a props interface for type safety." },
                  { title: "Lists and Keys – Stable Identifiers", content: "When rendering lists, assign a unique `key` prop to each element. Keys help React track which items changed, were added, or removed. Avoid using array index as key if the list can reorder." },
                  { title: "Common Mistakes", content: "Using `index` as key (causes issues with reordering), mutating props, and forgetting that props are read‑only." },
                ],
              },
              {
                title: "State and Re‑rendering – Reactivity in Action",
                slug: "state-rerendering",
                shortDescription: "Learn how state changes trigger UI updates.",
                estimatedMinutes: 24,
                sections: [
                  { title: "State Lifecycle", content: "State is data that changes over time and affects rendering. Updating state schedules React to re‑render the component. React batches multiple state updates for performance." },
                  { title: "Immutability – Why It Matters", content: "React relies on reference changes to detect updates. Always create new objects/arrays when updating state:\n```jsx\nsetItems(prev => [...prev, newItem]); // correct\n// items.push(newItem); setItems(items); // wrong – mutates\n```" },
                  { title: "Batched Updates", content: "React batches state updates within the same event handler. Functional updates (`setCount(prev => prev + 1)`) guarantee you're working from the latest value." },
                  { title: "Lifting State Up", content: "When multiple sibling components share state, move that state to their closest common parent and pass it down via props with callback functions to update it." },
                  { title: "Derived State – Compute, Don't Store", content: "Avoid storing values in state that can be derived from existing props or state during render. This reduces sync bugs." },
                  { title: "Common Pitfalls", content: "Reading state immediately after setting it (it's asynchronous), and updating state in the render body causing infinite loops." },
                ],
              },
              {
                title: "JSX and Rendering – The Magic of JSX",
                slug: "jsx-rendering",
                shortDescription: "Write UI declaratively with JSX syntax.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JSX is Not HTML", content: "JSX is syntactic sugar for `React.createElement` calls. Use `className` instead of `class`, `htmlFor` instead of `for`. It's JavaScript – embed expressions with `{}`." },
                  { title: "Embedding Expressions", content: "Any JavaScript expression can be embedded in JSX using `{}`: `{user.name}`, `{2 + 2}`, `{isLoggedIn ? <Dashboard /> : <Login />}`." },
                  { title: "Conditional Rendering", content: "Use `&&` for short‑circuit, ternary for if‑else, and `switch` statements outside JSX. Also use `null` to render nothing." },
                  { title: "Fragments – Group Without Extra Nodes", content: "`<></>` or `<React.Fragment>` lets you group elements without adding an extra DOM node." },
                  { title: "Styling Approaches", content: "Inline styles (style attribute), CSS modules, styled‑components, or Tailwind. Choose based on project scale." },
                  { title: "How Rendering Works – Virtual DOM", content: "React builds a virtual DOM tree, diffs it against the previous tree (reconciliation), and applies the minimal DOM updates needed." },
                ],
              },
            ],
          },
          {
            title: "Hooks Deep Dive",
            slug: "hooks-deep-dive",
            description: "Master React's functional component model.",
            topics: [
              {
                title: "useState – The State Hook",
                slug: "usestate-hook",
                shortDescription: "Add state to function components.",
                estimatedMinutes: 20,
                sections: [
                  { title: "useState Basics", content: "Returns `[state, setState]`. Call it at the top level of your component. Example: `const [count, setCount] = useState(0)`." },
                  { title: "Multiple States", content: "Use separate `useState` calls for separate concerns. This keeps state predictable." },
                  { title: "Functional Updates", content: "When the new state depends on the previous, use the function form: `setCount(prev => prev + 1)`. This is safer with batching." },
                  { title: "Lazy Initial State", content: "If the initial state is expensive to compute, pass a function: `useState(() => computeInitialValue())`. This runs only once." },
                  { title: "State with Objects and Arrays", content: "Always create new objects/arrays (using spread or `Immer`) to trigger re‑renders." },
                  { title: "Common Mistakes", content: "Reading state immediately after setting (it's asynchronous), and mutating state directly." },
                ],
              },
              {
                title: "useEffect – Synchronising with the Outside",
                slug: "useeffect-hook",
                shortDescription: "Synchronize side effects with component lifecycle.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What useEffect Does", content: "`useEffect` runs after render for side effects like data fetching, subscriptions, timers, and manual DOM changes." },
                  { title: "Dependency Array – Control Execution", content: "`[]` – runs once after mount. `[dep]` – runs when `dep` changes. Omitting it runs after every render. Always list all reactive values used in the effect." },
                  { title: "Cleanup Functions", content: "Return a function to clean up subscriptions, timers, etc. Runs before the next effect and on unmount." },
                  { title: "Data Fetching Pattern", content: "Use an `async` function inside the effect, track loading/error states, and handle cancellation with an AbortController." },
                  { title: "Effects vs Event Handlers", content: "Effects are for synchronisation; user actions (clicks) should use event handlers. Don't use effects for derived state." },
                  { title: "Common Pitfalls", content: "Missing dependencies cause stale closures. Use the `exhaustive‑deps` ESLint rule to catch them." },
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
        description: "React performance, context, state management, and React 18 features.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "State Management and Context",
            slug: "react-state-context",
            description: "Sharing state across components.",
            topics: [
              {
                title: "Context API – Avoiding Prop Drilling",
                slug: "react-context",
                shortDescription: "Prop drilling alternative.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Creating Context", content: "`const ThemeContext = React.createContext('light')`" },
                  { title: "Provider and Consumer", content: "Wrap components with `ThemeContext.Provider` to provide a value. Use `useContext` to consume." },
                  { title: "useContext Hook", content: "`const theme = useContext(ThemeContext)` – simpler than `Consumer`." },
                  { title: "When to Use Context", content: "Themes, user authentication, language, etc. Not for every piece of state – use composition where possible." },
                  { title: "Optimizing Context", content: "Split context by domain to avoid unnecessary re‑renders. Memoize context values with `useMemo`." },
                ],
              },
              {
                title: "useReducer and Redux – Predictable State",
                slug: "react-usereducer-redux",
                shortDescription: "Predictable state updates.",
                estimatedMinutes: 24,
                sections: [
                  { title: "useReducer", content: "A hook for complex state logic with actions and a reducer function. Works like Redux but local." },
                  { title: "Redux Basics", content: "Global store, actions, reducers, dispatch. Centralised state management." },
                  { title: "Redux Toolkit", content: "Simplifies Redux setup with slices and built‑in middleware (Thunk)." },
                  { title: "Middleware", content: "Thunk for async actions, logger for debugging." },
                ],
              },
            ],
          },
          {
            title: "Performance Optimization",
            slug: "react-performance",
            description: "Memoization and rendering optimization.",
            topics: [
              {
                title: "React.memo and useMemo – Memoization",
                slug: "react-memo-usememo",
                shortDescription: "Prevent unnecessary re-renders.",
                estimatedMinutes: 20,
                sections: [
                  { title: "React.memo", content: "Wrap a component to memoize render output based on prop changes." },
                  { title: "useMemo", content: "Memoize expensive calculations to avoid recomputation on every render." },
                  { title: "useCallback", content: "Memoize callbacks so they don't change on every render (useful for child memoized components)." },
                  { title: "When to Use", content: "Don't over‑optimise – measure first. Use only for expensive computations or large lists." },
                ],
              },
              {
                title: "Virtualization and Code Splitting",
                slug: "react-virtualization-splitting",
                shortDescription: "Lazy load components and large lists.",
                estimatedMinutes: 18,
                sections: [
                  { title: "React.lazy", content: "Dynamically import components to reduce initial bundle size." },
                  { title: "Suspense", content: "Show a fallback UI while lazy components load." },
                  { title: "Windowed Lists", content: "Use `react‑window` or `react‑virtualized` to render only visible rows." },
                ],
              },
            ],
          },
          {
            title: "React 18 and Concurrent Features",
            slug: "react-18",
            description: "Concurrent rendering, transitions, and streaming.",
            topics: [
              {
                title: "Concurrent Rendering – The New Paradigm",
                slug: "concurrent-rendering",
                shortDescription: "Interruptible rendering for better UX.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Concurrent Rendering?", content: "React 18 introduced concurrent rendering, which allows rendering to be interrupted and resumed. This enables new features like transitions and suspense for data fetching." },
                  { title: "startTransition – Non‑Urgent Updates", content: "Mark updates as non‑urgent with `startTransition`. React will pause rendering these to keep the UI responsive." },
                  { title: "useTransition – Track Pending State", content: "Returns a pending flag and a transition function. Useful for loading indicators during transitions." },
                  { title: "useDeferredValue – Defer Updates", content: "Similar to debouncing, but built‑in. Returns a deferred value that may be stale during rapid updates." },
                ],
              },
              {
                title: "Suspense for Data Fetching",
                slug: "suspense-data",
                shortDescription: "Declarative data fetching with Suspense.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Suspense?", content: "A component that suspends rendering while data is loading. It shows a fallback UI." },
                  { title: "Using Suspense", content: "Wrap components in `<Suspense fallback={<Loading />}>`. Works with React Server Components and data fetching libraries." },
                  { title: "Error Boundaries with Suspense", content: "Combine with `ErrorBoundary` for graceful failure handling." },
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
        description: "Server components, advanced patterns, and modern React.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Advanced React Patterns",
            slug: "react-advanced-patterns",
            description: "Compound components, render props, HOCs, and hooks.",
            topics: [
              {
                title: "Compound Components – Flexible APIs",
                slug: "react-compound-components",
                shortDescription: "Share state between components.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Pattern", content: "A parent component manages state and passes it to children via context or `cloneElement`." },
                  { title: "Context in Compound Components", content: "Use Context to share state implicitly without prop drilling." },
                  { title: "Example", content: "Tabs, Accordion, Dropdown – where parent manages which child is active." },
                ],
              },
              {
                title: "Render Props and HOCs",
                slug: "react-render-props-hoc",
                shortDescription: "Code reuse patterns.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Render Props", content: "A component that takes a function as a prop to render its content." },
                  { title: "Higher‑Order Components (HOCs)", content: "A function that takes a component and returns an enhanced component." },
                  { title: "Custom Hooks", content: "The modern alternative – simpler and more composable." },
                ],
              },
              {
                title: "Forward Refs and Imperative Handles",
                slug: "forward-ref",
                shortDescription: "Pass refs to child components and expose methods.",
                estimatedMinutes: 18,
                sections: [
                  { title: "forwardRef", content: "`const MyInput = React.forwardRef((props, ref) => <input ref={ref} ... />)` – passes a ref to a child component." },
                  { title: "useImperativeHandle", content: "Customise the ref object exposed to parent: `useImperativeHandle(ref, () => ({ focus: () => ... }))`." },
                ],
              },
            ],
          },
          {
            title: "React Server Components (RSC)",
            slug: "rsc",
            description: "Server‑side rendering with streaming and zero‑bundle components.",
            topics: [
              {
                title: "What are Server Components?",
                slug: "server-components",
                shortDescription: "Components that run on the server and send no JavaScript to the client.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Server Components Model", content: "RSC allows components to run exclusively on the server, reducing bundle size. They can fetch data and access server resources directly." },
                  { title: "Client vs Server Components", content: "Server components cannot use hooks or state. Client components use `'use client'` directive. The boundary is defined by the developer." },
                  { title: "Streaming SSR", content: "Server components can stream HTML to the client, improving perceived performance." },
                  { title: "Data Fetching in RSC", content: "Use `async/await` directly in server components to fetch data." },
                ],
              },
            ],
          },
          {
            title: "Advanced Hooks and APIs",
            slug: "advanced-hooks",
            description: "useSyncExternalStore, useInsertionEffect, and more.",
            topics: [
              {
                title: "useSyncExternalStore",
                slug: "use-sync-external-store",
                shortDescription: "Subscribe to external stores (Redux, Zustand).",
                estimatedMinutes: 16,
                sections: [
                  { title: "What it Does", content: "Safely reads from external stores and forces re‑renders when the store changes." },
                  { title: "When to Use", content: "When integrating with non‑React state management libraries." },
                ],
              },
              {
                title: "useInsertionEffect",
                slug: "use-insertion-effect",
                shortDescription: "For inserting styles before DOM mutation.",
                estimatedMinutes: 14,
                sections: [
                  { title: "When to Use", content: "Primarily for CSS‑in‑JS libraries to insert styles without layout shifts." },
                ],
              },
            ],
          },
          {
            title: "Error Boundaries, Portals, and Strict Mode",
            slug: "boundaries-portals",
            description: "Graceful error handling, rendering outside the DOM tree, and debugging.",
            topics: [
              {
                title: "Error Boundaries – Catch JavaScript Errors",
                slug: "error-boundaries",
                shortDescription: "Catch errors in component trees.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What are Error Boundaries?", content: "Class components that implement `static getDerivedStateFromError` and `componentDidCatch`." },
                  { title: "Usage", content: "Wrap components with `<ErrorBoundary>` to show a fallback UI instead of crashing the whole app." },
                ],
              },
              {
                title: "Portals – Render Outside the Parent",
                slug: "portals",
                shortDescription: "Render components in a different DOM node.",
                estimatedMinutes: 16,
                sections: [
                  { title: "What are Portals?", content: "`ReactDOM.createPortal(child, container)` – renders a component in a DOM node outside the parent hierarchy." },
                  { title: "Use Cases", content: "Modals, tooltips, dropdowns – escape CSS overflow and stacking contexts." },
                ],
              },
              {
                title: "Strict Mode – Development Helper",
                slug: "strict-mode",
                shortDescription: "Identify potential issues in development.",
                estimatedMinutes: 14,
                sections: [
                  { title: "What is Strict Mode?", content: "`<React.StrictMode>` runs additional checks to detect unsafe lifecycles, deprecated APIs, and side‑effects." },
                  { title: "Double‑Rendering", content: "In strict mode, components are rendered twice in development to detect side effects." },
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
        description: "Common React interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core React Concepts",
            slug: "react-core-interview",
            description: "Components, state, props, hooks, and lifecycle.",
            topics: [
              {
                title: "Hooks – Rules and Usage",
                slug: "react-interview-hooks",
                shortDescription: "useState, useEffect, useContext, useReducer.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Rules of Hooks", content: "Only call hooks at the top level (not inside conditionals/loops). Only call hooks from React functions or custom hooks." },
                  { title: "Custom Hooks", content: "Reusable logic – e.g., `useFetch`, `useLocalStorage`. They can compose other hooks." },
                  { title: "useState vs useReducer", content: "useState for simple state; useReducer for complex state logic with multiple sub‑values." },
                ],
              },
              {
                title: "Virtual DOM and Reconciliation",
                slug: "react-interview-virtual-dom",
                shortDescription: "How React updates the DOM.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Virtual DOM", content: "A lightweight JavaScript representation of the real DOM. React uses it to calculate the minimal changes needed." },
                  { title: "Reconciliation", content: "The diffing algorithm compares the old and new virtual DOM trees. Keys help identify moved elements." },
                  { title: "Fiber Architecture", content: "React's new reconciliation engine that enables concurrent rendering and suspense." },
                ],
              },
              {
                title: "Rendering and Performance",
                slug: "react-interview-performance",
                shortDescription: "Re‑renders, memoization, and optimization.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What Triggers a Re‑render?", content: "State change, prop change, context change, parent re‑render." },
                  { title: "React.memo and useMemo", content: "Prevent unnecessary re‑renders. `React.memo` for components, `useMemo` for values." },
                  { title: "useCallback", content: "Stable function references to prevent child re‑renders." },
                ],
              },
            ],
          },
          {
            title: "Advanced Topics",
            slug: "react-interview-advanced",
            description: "Context, Redux, Server Components, and performance.",
            topics: [
              {
                title: "Context vs Redux",
                slug: "react-interview-context-redux",
                shortDescription: "When to use each.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Context", content: "Good for low‑frequency updates (themes, auth). Not for high‑frequency updates." },
                  { title: "Redux", content: "Predictable state management, better for complex state and frequent updates." },
                ],
              },
              {
                title: "React 18 Features",
                slug: "react-interview-18",
                shortDescription: "Concurrent features, Suspense, and Server Components.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Concurrent Rendering", content: "Interruptible rendering for better UX." },
                  { title: "Suspense", content: "Declarative data fetching." },
                  { title: "Server Components", content: "Zero‑bundle components that run on the server." },
                ],
              },
              {
                title: "Common Pitfalls",
                slug: "react-interview-pitfalls",
                shortDescription: "Stale closures, missing keys, and side effects.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Stale Closures in useEffect", content: "Effects close over values from the render. Missing dependencies cause stale closures." },
                  { title: "Keys in Lists", content: "Always use stable, unique keys. Avoid using array index." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(reactCategory);
  console.log("✅ React Fundamentals category seeded (ultra‑detailed)");
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