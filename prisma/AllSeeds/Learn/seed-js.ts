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

async function seedJavaScriptCategory() {
  const jsCategory: CategorySeed = {
    name: "JavaScript Fundamentals",
    slug: "javascript-fundamentals",
    description: "Master JavaScript from the ground up: syntax, scope, closures, prototypes, async, and modern ES6+ features.",
    icon: "JS",
    sortOrder: 13,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the core building blocks of JavaScript: variables, types, functions, and control flow.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "JavaScript Essentials",
            slug: "js-essentials",
            description: "The foundational concepts every JavaScript developer must know.",
            topics: [
              {
                title: "Variables and Data Types – The Building Blocks",
                slug: "variables-data-types",
                shortDescription: "Learn how to declare variables and work with primitive types.",
                estimatedMinutes: 24,
                sections: [
                  { title: "var, let, const – Declaring Variables", content: "`var` is function‑scoped and hoisted (initialized to `undefined`). `let` and `const` are block‑scoped and are not initialized until execution reaches the declaration (temporal dead zone). `const` prevents reassignment but does not prevent object mutation. **Modern best practice**: use `const` by default, `let` when you need to reassign, and avoid `var` entirely in new code." },
                  { title: "Primitive Types", content: "JavaScript has 7 primitive types: `string`, `number`, `boolean`, `undefined`, `null`, `symbol` (ES6), and `bigint` (ES2020). `typeof` returns the type. `undefined` means a variable has been declared but not assigned; `null` is an intentional absence of value – it's an object (historical bug)." },
                  { title: "Type Coercion – The Silent Converter", content: "JavaScript is loosely typed. The `+` operator can coerce strings to numbers if one operand is a string. Other operators like `-`, `*`, `/` coerce to numbers. This can cause surprises: `'5' - 3` → `2`, but `'5' + 3` → `'53'`. Use explicit conversion with `Number()`, `String()`, `Boolean()` to avoid bugs." },
                  { title: "Dynamic Typing – Flexible but Risky", content: "A variable can hold any type and can be reassigned to another type. This is powerful but can lead to runtime errors if you assume a type. Use `typeof` and `instanceof` to check types defensively." },
                  { title: "Truthiness and Falsy Values", content: "Falsy values: `false`, `0`, `''`, `null`, `undefined`, `NaN`. Everything else is truthy. Be careful with `if (someValue)` – empty arrays and empty objects are truthy, which often surprises beginners." },
                ],
              },
              {
                title: "Functions and Scope – Reusable Logic",
                slug: "functions-scope",
                shortDescription: "Declare and use functions, understand scoping rules.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Function Declarations vs Expressions", content: "`function name() {}` – declarations are hoisted (can be called before definition). `const f = function() {}` – expressions are not hoisted. Arrow functions `() => {}` are a shorter syntax and do not have their own `this`." },
                  { title: "Parameters and Arguments", content: "Default parameters: `function greet(name = 'Guest')`. Rest parameters: `(...args)` collects all remaining arguments into an array. The `arguments` object (array‑like) is available in non‑arrow functions." },
                  { title: "Scope – Where Variables Live", content: "**Global scope** – accessible everywhere. **Function scope** – variables declared with `var` inside a function are local. **Block scope** – `let` and `const` are block‑scoped (inside `{}`). Lexical scoping means inner functions can access variables from outer scopes." },
                  { title: "Closures – Functions with Memory", content: "A closure is a function that remembers its lexical scope even when executed outside that scope. Used for data privacy (module pattern), currying, and event handlers. Example: `function counter() { let count = 0; return () => ++count; }`." },
                ],
              },
              {
                title: "Control Flow – Directing the Program",
                slug: "control-flow",
                shortDescription: "Use conditionals and loops to control program flow.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Conditionals", content: "`if (condition) { ... } else if { ... } else { ... }`. `switch` compares a value against multiple cases. Use `break` to prevent fall‑through. Ternary: `condition ? expr1 : expr2`." },
                  { title: "Loops", content: "`for (let i = 0; i < n; i++)`, `while`, `do‑while`. `for...in` iterates over enumerable property names (use with caution). `for...of` iterates over iterable values (arrays, strings, maps, sets)." },
                  { title: "break, continue, and Error Handling", content: "`break` exits a loop; `continue` skips to the next iteration. `try/catch/finally` handles synchronous errors. `throw` raises a custom error." },
                ],
              },
              {
                title: "Arrays and Objects – Data Collections",
                slug: "arrays-objects",
                shortDescription: "Work with collections and structured data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Array Basics", content: "Create arrays with `[]` or `new Array()`. Access by index, `length` property. Methods: `push`/`pop` (end), `shift`/`unshift` (beginning), `splice` (insert/delete), `slice` (copy)." },
                  { title: "Iterating Arrays", content: "`for` loop, `for...of`, `forEach`, `map`, `filter`, `reduce`. Functional methods are preferred for readability and chaining." },
                  { title: "Object Basics", content: "Objects are collections of key‑value pairs. Create with `{}`. Access with dot notation or bracket notation (for dynamic keys). `Object.keys()`, `values()`, `entries()` for iteration." },
                  { title: "Spread and Rest", content: "`...` spreads array/object properties. Rest parameters `(...args)` collect remaining arguments into an array. Also used in destructuring." },
                ],
              },
              {
                title: "DOM Manipulation – Interacting with the Page",
                slug: "dom-manipulation",
                shortDescription: "Interact with HTML pages using the Document Object Model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Selecting Elements", content: "`document.getElementById`, `querySelector`, `querySelectorAll`, `getElementsByClassName`. `querySelector` returns the first match; `querySelectorAll` returns a NodeList (array‑like)." },
                  { title: "Changing Content and Styles", content: "`textContent` (safe), `innerHTML` (inserts HTML). `setAttribute` and `classList` for classes. `style` for inline CSS." },
                  { title: "Creating and Removing Elements", content: "`document.createElement`, `appendChild`, `removeChild`, `insertBefore`. Use `element.remove()` in modern browsers." },
                  { title: "Events – User Interaction", content: "`addEventListener` attaches handlers. Types: `click`, `input`, `submit`, `scroll`, etc. Event delegation: attach a single listener to a parent to handle events from children (via bubbling). `event.target` is the actual element, `event.currentTarget` is the listener's element." },
                  { title: "Event Object", content: "`preventDefault()` stops default behavior (e.g., form submission). `stopPropagation()` prevents bubbling." },
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
        description: "Dive into advanced functions, objects, prototypes, and asynchronous programming.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Functions and Objects",
            slug: "advanced-functions-objects",
            description: "Closures, higher-order functions, this binding, and prototypes.",
            topics: [
              {
                title: "Closures in Depth – The Power of Lexical Scoping",
                slug: "closures-depth",
                shortDescription: "How closures work and their practical uses.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Definition", content: "A closure is a function that retains access to its parent's scope even after the parent function has returned. This is a fundamental concept in JavaScript." },
                  { title: "Practical Uses", content: "Data encapsulation (private variables), function factories (create functions with different configurations), currying (fixing arguments), memoization (caching results), and event handlers that need to capture state." },
                  { title: "Loop Pitfall with `var`", content: "In a `for` loop using `var`, all closures share the same final value. Use `let` (which creates a new binding per iteration) or an IIFE to capture the current value." },
                  { title: "Memory Considerations", content: "Closures keep outer variables alive, which can lead to memory leaks if not managed properly (e.g., event listeners that aren't removed)." },
                ],
              },
              {
                title: "The 'this' Keyword – Context Matters",
                slug: "this-keyword",
                shortDescription: "Understand how this is determined in different contexts.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Default Binding", content: "In non‑strict mode, `this` refers to the global object (`window` in browsers). In strict mode, it's `undefined`." },
                  { title: "Implicit Binding", content: "When a function is called as a method (`obj.method()`), `this` refers to the object." },
                  { title: "Explicit Binding", content: "`call`, `apply`, `bind` set `this` explicitly. `call` and `apply` invoke the function immediately; `bind` returns a new function." },
                  { title: "Arrow Functions – Lexical `this`", content: "Arrow functions do not have their own `this`; they inherit `this` from the enclosing scope. Useful for callbacks where you want to preserve the surrounding context." },
                  { title: "Common Mistakes", content: "Losing `this` when extracting a method: `const fn = obj.method; fn()` – `this` becomes global. Fix with `bind` or arrow functions." },
                ],
              },
              {
                title: "Prototypes and Inheritance – The Prototypal Chain",
                slug: "prototypes-inheritance",
                shortDescription: "JavaScript's prototype-based inheritance model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Prototype Chain", content: "Every object has an internal `[[Prototype]]` link (accessible via `__proto__` or `Object.getPrototypeOf()`). When accessing a property, the chain is traversed until found or the end is reached." },
                  { title: "Constructor Functions", content: "`function Person(name) { this.name = name; }` – the `Person.prototype` becomes the prototype of instances created with `new Person()`." },
                  { title: "ES6 Classes – Syntactic Sugar", content: "`class Person { constructor(name) { this.name = name; } }` – works the same way under the hood, but provides a cleaner syntax." },
                  { title: "Inheritance with `extends` and `super`", content: "`class Employee extends Person { constructor(name, title) { super(name); this.title = title; } }`." },
                  { title: "Prototype Methods vs Instance Methods", content: "Methods on the prototype are shared; instance methods (assigned to `this` in constructor) are per‑object. Generally, put methods on the prototype to save memory." },
                ],
              },
              {
                title: "Asynchronous JavaScript – Callbacks, Promises, async/await",
                slug: "async-js",
                shortDescription: "Callbacks, Promises, and async/await.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Callbacks – The Foundation", content: "Functions passed as arguments to be executed later. Used in event handlers, `setTimeout`, and old APIs. **Callback hell** – deeply nested callbacks that are hard to read." },
                  { title: "Promises – A Better Way", content: "A promise represents a future value. States: `pending`, `fulfilled`, `rejected`. Methods: `.then()`, `.catch()`, `.finally()`. Promises chain and handle errors cleanly." },
                  { title: "Promise Chaining", content: "Return a promise from `.then()` to chain. Values passed along the chain." },
                  { title: "async/await – Synchronous‑Style Async", content: "`async` functions always return a promise. `await` pauses the function until the promise settles. Use `try/catch` for error handling. This makes async code more readable." },
                  { title: "Error Handling", content: "Always handle rejections. Use `.catch()` or `try/catch`. Unhandled rejections cause issues in Node.js and browsers; use `process.on('unhandledRejection')` or the `unhandledrejection` event." },
                ],
              },
              {
                title: "The Event Loop – Concurrency Model",
                slug: "event-loop",
                shortDescription: "Understand how JavaScript handles concurrency.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Call Stack", content: "Tracks function execution – pushes frames, pops when returning. Synchronous code runs immediately." },
                  { title: "Task Queue (Macrotasks)", content: "`setTimeout`, `setInterval`, I/O events. They are added to the task queue and processed after the stack is empty." },
                  { title: "Microtasks", content: "Promise callbacks (`then`, `catch`, `finally`), `MutationObserver`, `queueMicrotask`. They run after the current stack but before the next macrotask." },
                  { title: "Execution Order", content: "Synchronous code → microtasks → macrotasks. This ordering is why `Promise.resolve().then(...)` runs before `setTimeout(...)`." },
                  { title: "Common Interview Question", content: "Order of `console.log` with `setTimeout`, `Promise.resolve`, and synchronous code – know the priority." },
                ],
              },
            ],
          },
          // New: Generators and Iterators
          {
            title: "Generators and Iterators",
            slug: "generators-iterators",
            description: "Iterable protocols and generator functions.",
            topics: [
              {
                title: "Iterators and Iterables",
                slug: "iterators",
                shortDescription: "The iteration protocol and built‑in iterables.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Iterable Protocol", content: "An object is iterable if it has a `Symbol.iterator` method that returns an iterator. Built‑in iterables: arrays, strings, maps, sets." },
                  { title: "Iterator Protocol", content: "An iterator has a `next()` method that returns `{ value, done }`. `done` is true when the iteration is complete." },
                  { title: "Custom Iterators", content: "You can implement your own iterator by defining `Symbol.iterator` and returning an object with `next()`." },
                ],
              },
              {
                title: "Generator Functions – `function*`",
                slug: "generators",
                shortDescription: "Generate values lazily with `yield`.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What are Generators?", content: "A generator is a function that can be paused and resumed. Defined with `function*`. Uses `yield` to emit values." },
                  { title: "Iterating Generators", content: "`yield` returns an iterator. You can use `for...of` or manually call `next()`." },
                  { title: "`yield*` – Delegating", content: "`yield*` delegates iteration to another generator or iterable." },
                  { title: "Use Cases", content: "Lazy sequences, infinite streams, and asynchronous flow control (though async/await is now preferred)." },
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
        description: "Deep dive into ES6+ features, functional programming, modules, performance, and modern JavaScript.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Modern JavaScript (ES6+)",
            slug: "modern-js",
            description: "Destructuring, spread/rest, template literals, classes, and more.",
            topics: [
              {
                title: "Destructuring – Unpacking Values",
                slug: "destructuring",
                shortDescription: "Extract values from arrays or objects into variables.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Array Destructuring", content: "`const [first, second] = arr;` – works with rest: `[first, ...rest]`." },
                  { title: "Object Destructuring", content: "`const { name, age } = obj;` – rename: `{ name: fullName }`." },
                  { title: "Default Values and Nesting", content: "`const { name = 'Anonymous' } = obj;` – nested destructuring works as well." },
                ],
              },
              {
                title: "Spread and Rest – `...` Operator",
                slug: "spread-rest",
                shortDescription: "Use ... to expand or collect elements.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Spread for Arrays", content: "`[...arr1, ...arr2]` – concatenate or copy." },
                  { title: "Spread for Objects", content: "`{ ...obj1, ...obj2 }` – merge objects (later properties overwrite earlier)." },
                  { title: "Rest Parameters", content: "`function f(...args) { ... }` – collects remaining arguments." },
                ],
              },
              {
                title: "Modules – `import` / `export`",
                slug: "modules",
                shortDescription: "Organize code with ES modules.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Export", content: "Named exports: `export const name = ...; export function ...`. Default export: `export default ...`." },
                  { title: "Import", content: "`import { name } from './module'`; `import * as module`; `import defaultExport`." },
                  { title: "Dynamic Imports", content: "`import('./module').then(...)` – allows code splitting and lazy loading." },
                  { title: "CommonJS vs ES Modules", content: "`require`/`module.exports` are CommonJS (used in Node.js). ES modules are the standard for browsers and modern Node.js." },
                ],
              },
              // New: Optional Chaining, Nullish Coalescing, Private Fields
              {
                title: "Modern Operators – `?.`, `??`, and Private Fields",
                slug: "modern-operators",
                shortDescription: "Optional chaining, nullish coalescing, and private class fields.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Optional Chaining (`?.`)", content: "Safely access nested properties: `obj?.prop?.nested` – returns `undefined` if any part is `null`/`undefined` instead of throwing." },
                  { title: "Nullish Coalescing (`??`)", content: "Returns the right‑hand side only if the left‑hand side is `null` or `undefined`. Unlike `||`, it doesn't treat `0` or `''` as falsy." },
                  { title: "Private Class Fields (`#`)", content: "`class MyClass { #privateField = 42; #method() {} }` – truly private, not accessible outside the class." },
                ],
              },
              // New: Top‑level await
              {
                title: "Top‑level await",
                slug: "top-level-await",
                shortDescription: "Use `await` at the top level of modules.",
                estimatedMinutes: 14,
                sections: [
                  { title: "What is Top‑level await?", content: "In modules, you can use `await` without wrapping in an async function. This is useful for dynamic imports and initialisation. Supported in Node.js (ES modules) and modern browsers." },
                  { title: "When to Use", content: "Loading configuration, initialising a database connection, or dynamic imports. Be aware that it blocks module execution." },
                ],
              },
              // New: WeakMap, WeakSet, Proxies, Reflect
              {
                title: "WeakMap, WeakSet, Proxies, and Reflect",
                slug: "weakmap-proxy",
                shortDescription: "Advanced data structures and metaprogramming.",
                estimatedMinutes: 24,
                sections: [
                  { title: "WeakMap and WeakSet", content: "Hold references to objects weakly – they don't prevent garbage collection. Keys must be objects. Useful for caching and avoiding memory leaks." },
                  { title: "Proxy – Intercept Operations", content: "Create a wrapper that intercepts property access, assignment, function calls, etc. `const p = new Proxy(target, handler)`." },
                  { title: "Reflect – Low‑level Operations", content: "`Reflect` provides methods that correspond to proxy traps (e.g., `Reflect.get`, `Reflect.set`). Useful for implementing proxies or calling internal methods." },
                ],
              },
              {
                title: "Functional Programming",
                slug: "functional-programming",
                shortDescription: "Use map, filter, reduce, and pure functions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Pure Functions", content: "Given same input, always return same output; no side effects. Predictable and testable." },
                  { title: "Immutability", content: "Avoid mutating data – create new copies. Use `Object.assign`, spread, or libraries like Immer." },
                  { title: "Higher‑Order Functions", content: "Functions that accept or return functions. Examples: `map`, `filter`, `reduce`, `curry`." },
                  { title: "Composition", content: "Combine simple functions to build complex behavior. `compose(f, g)(x) = f(g(x))`." },
                ],
              },
              {
                title: "Performance Optimization",
                slug: "performance",
                shortDescription: "Write efficient JavaScript and avoid common pitfalls.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Memory Management", content: "Avoid global variables, closures, and event listeners that keep references. Use `WeakMap` for caches." },
                  { title: "Debouncing and Throttling", content: "Limit function calls for events like scroll or resize – debounce for input, throttle for scroll." },
                  { title: "Lazy Loading", content: "Load resources only when needed – dynamic imports for code splitting." },
                  { title: "Profiling", content: "Use Chrome DevTools performance tab and memory tab to find bottlenecks." },
                  { title: "V8 Optimization", content: "Understand hidden classes, inline caching, and avoid deoptimizations (e.g., changing object shape)." },
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
        description: "Common JavaScript interview questions, tricky concepts, and coding problems.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "js-core-concepts",
            description: "Questions on scope, hoisting, closures, and this.",
            topics: [
              {
                title: "Hoisting – Moving Declarations to the Top",
                slug: "hoisting",
                shortDescription: "How var, let, const, and function declarations are hoisted.",
                estimatedMinutes: 18,
                sections: [
                  { title: "var Hoisting", content: "`var` declarations are hoisted and initialized with `undefined`. You can access them before declaration." },
                  { title: "let/const Hoisting", content: "Hoisted but enter a temporal dead zone (TDZ). Access before declaration throws `ReferenceError`." },
                  { title: "Function Declarations", content: "Hoisted entirely – can be called before definition." },
                  { title: "Function Expressions", content: "Only the variable is hoisted, not the assignment." },
                ],
              },
              {
                title: "Equality and Coercion – `==` vs `===`",
                slug: "equality-coercion",
                shortDescription: "Strict vs loose equality, truthy/falsy.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Strict Equality (`===`)", content: "Compares value and type – no coercion. Always preferred." },
                  { title: "Loose Equality (`==`)", content: "Coerces operands to the same type – can produce surprising results (e.g., `'0' == false`)." },
                  { title: "Falsy Values", content: "`false, 0, '', null, undefined, NaN`. `Object.is()` is like `===` but treats `NaN` as equal and `+0`/`-0` differently." },
                ],
              },
              {
                title: "Closures and Scope – Common Traps",
                slug: "closures-scope-interview",
                shortDescription: "Examples and common pitfalls.",
                estimatedMinutes: 22,
                sections: [
                  { title: "How Closures Work", content: "Inner function retains outer scope." },
                  { title: "Module Pattern", content: "Use IIFE or closures to create private state." },
                  { title: "Loop with `var`", content: "All callbacks share the same final value. Fix with `let` or IIFE." },
                ],
              },
            ],
          },
          {
            title: "Coding Problems",
            slug: "js-coding-problems",
            description: "Commonly asked coding challenges.",
            topics: [
              {
                title: "Array Manipulation",
                slug: "array-challenges",
                shortDescription: "Flatten, dedupe, groupBy, etc.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Flatten Array", content: "Recursive or iterative `flat` (ES2019)." },
                  { title: "Remove Duplicates", content: "Using `Set`, `filter`, or `reduce`." },
                  { title: "Group By", content: "`reduce` to group objects by a key." },
                ],
              },
              {
                title: "Asynchronous Patterns",
                slug: "async-patterns",
                shortDescription: "Promises, async/await, concurrency.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Parallel vs Sequential", content: "`Promise.all` vs `for...of` with `await`." },
                  { title: "Retry Logic", content: "Retry with exponential backoff." },
                  { title: "Async Queue", content: "Process tasks in order with concurrency limit." },
                ],
              },
              {
                title: "Object and Prototype Questions",
                slug: "prototype-challenges",
                shortDescription: "Implement inheritance, mixins, or polyfills.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Implement Object.create", content: "Write a polyfill for `Object.create`." },
                  { title: "Class Inheritance", content: "Extend classes and override methods." },
                  { title: "Mixins", content: "Combine multiple objects using composition." },
                ],
              },
              // New: Debounce, Throttle, Promise polyfill
              {
                title: "Debounce, Throttle, and Promise Polyfill",
                slug: "debounce-throttle-promise",
                shortDescription: "Implement common utility functions.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Debounce", content: "Delay execution until after a pause. Used for search inputs." },
                  { title: "Throttle", content: "Limit execution to once per interval. Used for scroll events." },
                  { title: "Promise Polyfill", content: "Implement a basic Promise with `then`, `catch`, and `resolve`/`reject`." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(jsCategory);
  console.log("✅ JavaScript Fundamentals category seeded (ultra‑detailed)");
}

async function main() {
  await seedJavaScriptCategory();
}

main()
  .catch((error) => {
    console.error("JavaScript seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });