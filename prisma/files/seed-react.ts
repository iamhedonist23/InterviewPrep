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
                  { title: "What a component is", content: "A React component is a reusable renderable unit. It receives props as input and returns UI based on those values and internal state.\n\nExample:\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}" },
                  { title: "Props are read-only", content: "Props should be treated as inputs. A child component should not mutate the props it receives; it should emit events (callback props) or update its own local state when needed." },
                  { title: "Composing components", content: "Complex UIs are built by nesting simpler components. The children prop lets a component wrap arbitrary content passed from its parent.\n\nExample:\nfunction Card({ children }) {\n  return <div className=\"card\">{children}</div>;\n}\n\n<Card><p>Inside the card</p></Card>" },
                  { title: "Default and typed props", content: "Default parameter values or defaultProps supply fallback values. In TypeScript, a props interface documents the expected shape and catches mismatches at compile time.\n\nExample:\ntype ButtonProps = { label: string; onClick: () => void };\nfunction Button({ label, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{label}</button>;\n}" },
                  { title: "Lists and keys", content: "Rendering arrays of components requires a stable, unique key prop so React can track which items changed, were added, or were removed between renders." },
                  { title: "Common mistakes", content: "Using array index as a key when the list can reorder causes subtle bugs. Mutating props directly, or forgetting that props flow one-way (parent to child), are frequent beginner errors." }
                ]
              },
              {
                title: "State and Re-rendering",
                slug: "state-rerendering",
                shortDescription: "Learn how state changes trigger UI updates.",
                estimatedMinutes: 20,
                sections: [
                  { title: "State lifecycle", content: "State is data that changes over time and affects rendering. Updating state schedules React to render the component again with the new value." },
                  { title: "Why immutability matters", content: "React relies on reference changes to detect updates. When updating arrays or objects, create a new copy instead of mutating the old one in place.\n\nExample:\nsetItems(prev => [...prev, newItem]); // correct\n// items.push(newItem); setItems(items); // wrong, same reference" },
                  { title: "Batched updates", content: "React batches multiple state updates triggered within the same event handler into a single re-render for performance. Functional updates (setState(prev => ...)) guarantee you're working from the latest value." },
                  { title: "Lifting state up", content: "When two sibling components need to share state, move that state to their closest common parent and pass it down via props, along with a callback to update it." },
                  { title: "Derived vs stored state", content: "Avoid storing values in state that can be computed from existing props or state during render; recomputing them avoids sync bugs and unnecessary state." },
                  { title: "Common pitfalls", content: "Reading state right after calling its setter still shows the old value because updates are asynchronous. Also, updating state inside the render body (not an event handler or effect) causes infinite render loops." }
                ]
              },
              {
                title: "JSX and Rendering",
                slug: "jsx-rendering",
                shortDescription: "Write UI declaratively with JSX syntax.",
                estimatedMinutes: 18,
                sections: [
                  { title: "JSX is not HTML", content: "JSX is syntactic sugar that compiles to React.createElement calls. It mixes XML-like syntax with JavaScript, making UI easy to read and compose.\n\nExample:\nconst el = <p className=\"note\">Hi</p>;\n// compiles roughly to:\n// React.createElement('p', { className: 'note' }, 'Hi')" },
                  { title: "Embedding expressions", content: "Curly braces {} embed any JavaScript expression inside JSX: variables, function calls, ternaries. Statements like if/for are not allowed directly, only expressions." },
                  { title: "Conditional rendering", content: "Use JavaScript expressions and operators to show/hide elements based on state or props.\n\nExample:\n{isLoggedIn ? <Dashboard /> : <LoginForm />}\n{hasError && <ErrorBanner />}" },
                  { title: "Fragments", content: "React.Fragment (or the <>...</> shorthand) groups multiple elements without adding an extra DOM node, useful when a component must return several siblings." },
                  { title: "Styling approaches", content: "JSX supports inline style objects, className with CSS files, CSS modules, and CSS-in-JS libraries. Inline styles use camelCase property names." },
                  { title: "How rendering actually works", content: "React builds a virtual DOM tree from JSX, diffs it against the previous tree (reconciliation), and applies the minimal set of real DOM updates needed." }
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
                  { title: "useState basics", content: "useState returns a state value and a setter function. Calling the setter schedules a re-render with the new value.\n\nExample:\nconst [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>{count}</button>" },
                  { title: "Multiple states", content: "You can call useState multiple times in a component. Each call creates an independent state variable, tracked by call order — which is why hooks can't be called conditionally." },
                  { title: "Functional updates", content: "Pass a function to the setter to update state based on the previous value safely, especially important when updates might be batched or triggered rapidly.\n\nExample:\nsetCount(prev => prev + 1);" },
                  { title: "Lazy initial state", content: "Passing a function to useState (instead of a value) runs that function only once, on the first render — useful when the initial value is expensive to compute." },
                  { title: "State with objects and arrays", content: "When state holds an object or array, always create a new object/array on update rather than mutating in place, so React detects the change." },
                  { title: "Common mistakes", content: "Forgetting that state updates are asynchronous and don't merge automatically (unlike class component setState) — each useState call manages one independent piece of state." }
                ]
              },
              {
                title: "useEffect Hook",
                slug: "useeffect-hook",
                shortDescription: "Synchronize side effects with component lifecycle.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What useEffect does", content: "useEffect runs code after render for side effects like fetching data, updating the DOM, or setting up subscriptions.\n\nExample:\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);" },
                  { title: "Dependency array", content: "The dependency array controls when the effect runs. Omitting it runs the effect after every render; an empty array runs it once after mount; a list of values reruns it whenever any value changes." },
                  { title: "Cleanup functions", content: "Returning a function from the effect defines cleanup logic, run before the next effect execution and on unmount — essential for unsubscribing listeners or clearing timers.\n\nExample:\nuseEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);" },
                  { title: "Data fetching pattern", content: "A common pattern fetches data in an effect, tracks loading/error state, and guards against updating state after the component unmounts using a cleanup flag or AbortController." },
                  { title: "Effects vs event handlers", content: "Logic that should run in response to a user action (a click) belongs in an event handler, not an effect. Effects synchronize with external systems after rendering, not for every state change caused by user interaction." },
                  { title: "Common pitfalls", content: "Missing dependencies cause stale closures (using old prop/state values). The exhaustive-deps ESLint rule helps catch this, though sometimes intentional omissions require a comment explaining why." }
                ]
              }
            ]
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
