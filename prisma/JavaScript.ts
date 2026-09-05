// ---- 200+ JavaScript Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["JavaScript", "JavaScript"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["JavaScript", "What is JavaScript and what are its main features?", "js-overview", "Define JavaScript and list its key features.", "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is single-threaded, prototype-based, dynamic, and supports object-oriented, imperative, and functional programming styles. Key features: event-driven, asynchronous (callbacks, promises, async/await), closures, first-class functions, and dynamic typing."],
  ["JavaScript", "What is the difference between JavaScript and ECMAScript?", "js-vs-ecmascript", "Compare JavaScript and ECMAScript.", "ECMAScript is the specification that defines the core language. JavaScript is the implementation of that specification (most commonly in browsers and Node.js). ECMAScript versions (ES6, ES2015, etc.) define new language features that JavaScript engines adopt."],
  ["JavaScript", "What are the primitive data types in JavaScript?", "primitive-types", "List primitive types.", "Primitive types: `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`. Everything else is an object (including arrays, functions, and dates)."],
  ["JavaScript", "What is the difference between `null` and `undefined`?", "null-vs-undefined", "Compare null and undefined.", "`undefined` is the default value for uninitialized variables and missing properties. `null` is an intentional absence of any object value. `typeof null` returns `'object'` (a historic bug)."],
  ["JavaScript", "What is type coercion in JavaScript?", "type-coercion", "Explain type coercion.", "Type coercion is the automatic conversion of values from one data type to another (e.g., `'5' - 2` converts string to number). Coercion happens with operators like `==`, `+`, `-`, etc. Use `===` to avoid unexpected coercion."],
  ["JavaScript", "What is the difference between `==` and `===`?", "double-vs-triple-equals-js", "Compare equality operators.", "`==` performs type coercion before comparison; `===` checks both value and type (strict equality). Always prefer `===` for predictability."],
  ["JavaScript", "What is the `typeof` operator?", "typeof-operator", "Explain `typeof`.", "`typeof` returns a string indicating the type of the operand: `typeof 5` -> `'number'`, `typeof 'a'` -> `'string'`, `typeof function(){}` -> `'function'`. Caveat: `typeof null` -> `'object'`."],
  ["JavaScript", "How do you declare variables in JavaScript?", "variable-declaration-js", "Explain `var`, `let`, `const`.", "`var` is function-scoped and hoisted; `let` and `const` are block-scoped (ES6). `const` cannot be reassigned, but objects/arrays can be mutated. Prefer `const` by default, `let` when reassignment is needed."],
  ["JavaScript", "What is hoisting?", "hoisting-js", "Explain hoisting.", "Hoisting is the behavior of moving declarations (variables and functions) to the top of their scope during compilation. `var` declarations are hoisted and initialized with `undefined`; `let` and `const` are hoisted but not initialized (Temporal Dead Zone). Function declarations are fully hoisted."],
  ["JavaScript", "What are the different ways to create objects?", "object-creation", "List object creation methods.", "Object literals `{}`, `new Object()`, `Object.create()`, constructor functions, `class` syntax (ES6)."],
  ["JavaScript", "What is the `this` keyword?", "this-keyword-js", "Explain `this`.", "`this` refers to the execution context. In a method, it refers to the object; in a function (non-strict), to the global object (`window` in browser) or `undefined` in strict mode; in an arrow function, `this` is lexically inherited from the outer scope."],
  ["JavaScript", "What are the different ways to handle `this`?", "this-handling", "Explain ways to control `this`.", "Use arrow functions, `bind()`, `call()`, `apply()`, or capture `this` in a variable (e.g., `const self = this`)."],
  ["JavaScript", "What is a closure?", "closure-js", "Define closure.", "A closure is a function that remembers its lexical scope even when the function is executed outside that scope. It allows private variables and data encapsulation."],
  ["JavaScript", "What is the `scope` in JavaScript?", "scope-js", "Explain scope.", "Scope defines the visibility of variables. Types: global, function, block (with `let`/`const`). Lexical scope means nested functions have access to outer variables."],
  ["JavaScript", "What is the difference between function declaration and function expression?", "function-declaration-vs-expression", "Compare declaration and expression.", "Function declarations are hoisted and can be called before definition. Function expressions are not hoisted; they are created when the assignment is reached. Example: `function foo() {}` vs `const foo = function() {}`."],
  ["JavaScript", "What is an arrow function?", "arrow-function", "Explain arrow functions.", "Arrow functions are a concise syntax `() => {}`. They do not have their own `this`, `arguments`, `super`, or `new.target`. They are not suitable for methods that need dynamic `this`."],
  ["JavaScript", "What are the differences between arrow functions and regular functions?", "arrow-vs-regular", "Compare arrow and regular functions.", "Arrow functions cannot be used as constructors (no `new`), lack `arguments` object, do not have `this` binding, and cannot be named (anonymous). Regular functions have their own `this` and `arguments`."],
  ["JavaScript", "What is an IIFE (Immediately Invoked Function Expression)?", "iife", "Explain IIFE.", "IIFE is a function that is defined and invoked immediately: `(function(){ ... })()`. It creates a private scope, avoiding global pollution. Common before modules existed."],
  ["JavaScript", "What is the `arguments` object?", "arguments-object", "Explain `arguments`.", "Inside regular functions, `arguments` is an array-like object containing all arguments passed. It is not available in arrow functions. Use rest parameters (`...args`) for a better alternative."],
  ["JavaScript", "What are rest parameters and spread syntax?", "rest-spread", "Explain rest and spread.", "Rest parameters (`...args`) collect remaining arguments into an array. Spread syntax (`...iterable`) expands an iterable into individual elements. Used in function calls, array literals, and object literals."],

  // ==================== FUNCTIONS & SCOPE (15) ====================
  ["JavaScript", "What is higher-order function?", "higher-order", "Define higher-order function.", "A higher-order function is a function that takes a function as an argument or returns a function. Examples: `map`, `filter`, `reduce`, and function composition."],
  ["JavaScript", "What are callbacks?", "callbacks-js", "Explain callbacks.", "A callback is a function passed as an argument to another function, to be executed later. Used in asynchronous programming (e.g., event handlers, `setTimeout`)."],
  ["JavaScript", "What is the difference between synchronous and asynchronous code?", "sync-vs-async-js", "Compare synchronous and asynchronous.", "Synchronous code executes sequentially, blocking further execution until complete. Asynchronous code allows other tasks to run while waiting for I/O (like network requests), using callbacks, promises, or async/await."],
  ["JavaScript", "What is a promise?", "promise-js", "Explain Promise.", "A Promise represents the eventual completion (or failure) of an asynchronous operation. It has three states: pending, fulfilled, resolved, rejected. Methods: `.then()`, `.catch()`, `.finally()`."],
  ["JavaScript", "What is the difference between a callback and a promise?", "callback-vs-promise", "Compare callbacks and promises.", "Callbacks are passed as arguments; promises use chaining. Promises provide better error handling (`.catch`), avoid callback hell, and support composition (`Promise.all`, `Promise.race`)."],
  ["JavaScript", "What is `async/await`?", "async-await", "Explain async/await.", "`async` functions return a promise; `await` pauses execution until the promise resolves. It makes asynchronous code look synchronous and improves readability. Always wrap in `try/catch` for error handling."],
  ["JavaScript", "What is the event loop?", "event-loop-js", "Explain event loop.", "The event loop is a mechanism that handles asynchronous operations. It continuously checks the call stack and the task queue. When the stack is empty, it takes tasks from the queue and pushes them to the stack."],
  ["JavaScript", "What are microtasks and macrotasks?", "micro-macro-tasks", "Explain task types.", "Microtasks (promises, `queueMicrotask`) have higher priority and are executed after the current operation. Macrotasks (setTimeout, setInterval, I/O) are executed in the next event loop iteration."],
  ["JavaScript", "What is the `setTimeout` function and how does it work?", "setTimeout-js", "Explain `setTimeout`.", "`setTimeout(fn, delay)` schedules a function to be executed after a minimum delay. The delay is not guaranteed due to the event loop; it only specifies the earliest time."],
  ["JavaScript", "What is the `setInterval` function?", "setInterval", "Explain `setInterval`.", "`setInterval(fn, interval)` repeatedly executes a function every `interval` milliseconds. Use `clearInterval()` to stop."],
  ["JavaScript", "What is the `requestAnimationFrame`?", "requestAnimationFrame", "Explain requestAnimationFrame.", "`requestAnimationFrame` schedules a function to be called before the next repaint. It is optimized for animations, providing smooth 60fps rendering, and auto-pauses when tab is inactive."],
  ["JavaScript", "What is the `Promise.all` method?", "promise-all", "Explain `Promise.all`.", "`Promise.all(iterable)` takes an array of promises and returns a single promise that resolves when all input promises resolve, or rejects when any rejects. Used for parallel execution."],
  ["JavaScript", "What is the `Promise.race` method?", "promise-race", "Explain `Promise.race`.", "`Promise.race(iterable)` returns a promise that resolves/rejects as soon as the first promise in the iterable settles. Useful for timeouts."],
  ["JavaScript", "What is the `Promise.allSettled` method?", "promise-allSettled", "Explain `Promise.allSettled`.", "`Promise.allSettled(iterable)` waits for all promises to settle (resolve or reject) and returns an array of objects with status and value/reason. Useful for handling mixed outcomes."],
  ["JavaScript", "What is the `Promise.any` method?", "promise-any", "Explain `Promise.any`.", "`Promise.any(iterable)` resolves as soon as any promise resolves; if all reject, it rejects with an `AggregateError`. Used for redundancy."],

  // ==================== ES6+ FEATURES (20) ====================
  ["JavaScript", "What are the new features introduced in ES6 (ES2015)?", "es6-features", "List ES6 features.", "Features: `let`/`const`, arrow functions, classes, template literals, destructuring, default parameters, rest/spread, promises, modules (`import`/`export`), `Symbol`, `Map`/`Set`, `for...of`, and proxies."],
  ["JavaScript", "What are template literals?", "template-literals", "Explain template literals.", "Template literals use backticks (`` ` ``) and allow embedded expressions `${expr}`. They support multi-line strings and are used for string interpolation."],
  ["JavaScript", "What is destructuring?", "destructuring-js", "Explain destructuring.", "Destructuring extracts values from arrays or objects into distinct variables: `const { name, age } = person;` and `const [first, second] = arr;`. Supports defaults and nesting."],
  ["JavaScript", "What are default parameters?", "default-params", "Explain default parameters.", "Default parameters allow you to set default values for function parameters: `function greet(name = 'World') {}`. Evaluated at call time."],
  ["JavaScript", "What are `Map` and `Set`?", "map-set", "Explain Map and Set.", "`Map` stores key-value pairs where keys can be any type (object, function). `Set` stores unique values. Both are iterable and maintain insertion order."],
  ["JavaScript", "What is a `WeakMap` and `WeakSet`?", "weakmap-weakset", "Explain WeakMap and WeakSet.", "`WeakMap` holds weak references to keys (objects), allowing garbage collection if no other references. `WeakSet` similarly holds weak references to objects. Neither is iterable."],
  ["JavaScript", "What is `Symbol`?", "symbol", "Explain Symbol.", "`Symbol` is a unique and immutable primitive, often used as object property keys to avoid name collisions. `Symbol.iterator` is a well-known symbol."],
  ["JavaScript", "What are iterables and iterators?", "iterables-iterators", "Explain iterables.", "An iterable is an object that implements `Symbol.iterator` method, returning an iterator. An iterator has `next()` method returning `{ value, done }`. Built-in: arrays, strings, maps, sets."],
  ["JavaScript", "What is `for...of` loop?", "for-of", "Explain `for...of`.", "`for...of` iterates over iterable values (arrays, strings, maps, sets). Unlike `for...in` (which iterates over enumerable property keys), `for...of` gives values."],
  ["JavaScript", "What are generators?", "generators-js", "Explain generators.", "Generators are functions that can be paused and resumed, using `function*` and `yield`. They return an iterator. Useful for lazy sequences and cooperative multitasking."],
  ["JavaScript", "What is the `yield` keyword?", "yield", "Explain `yield`.", "`yield` pauses the generator function and returns a value. The next `next()` call resumes execution from that point."],
  ["JavaScript", "What are proxies?", "proxies", "Explain Proxies.", "Proxy allows intercepting operations on an object (get, set, delete, etc.) via traps. Used for metaprogramming, validation, and logging."],
  ["JavaScript", "What is `Reflect`?", "reflect", "Explain Reflect.", "`Reflect` is a built-in object with methods corresponding to proxy traps (e.g., `Reflect.get()`, `Reflect.set()`). Used to perform default operations in proxy handlers."],
  ["JavaScript", "What is `Object.assign()`?", "object-assign", "Explain `Object.assign`.", "`Object.assign(target, ...sources)` copies enumerable own properties from source objects to target. Used for shallow cloning and merging."],
  ["JavaScript", "What is `Object.freeze()`?", "object-freeze", "Explain `Object.freeze`.", "`Object.freeze(obj)` makes an object immutable (prevents adding/removing/changing properties). Returns the same object. Use `Object.isFrozen()` to check."],
  ["JavaScript", "What is `Object.seal()`?", "object-seal", "Explain `Object.seal`.", "`Object.seal(obj)` prevents adding/deleting properties but allows modifying existing ones. `Object.isSealed()` checks."],
  ["JavaScript", "What are getters and setters in ES6?", "getters-setters", "Explain getters and setters.", "Getters/setters are defined using `get` and `set` inside object literals or classes. They allow computed properties and validation."],
  ["JavaScript", "What is `Array.from()`?", "array-from", "Explain `Array.from`.", "`Array.from(iterable)` creates a new array from an iterable or array-like object. Supports a mapping function."],
  ["JavaScript", "What is `Array.of()`?", "array-of", "Explain `Array.of`.", "`Array.of(...items)` creates a new array from the arguments. It differs from `Array()` when given a single numeric argument."],
  ["JavaScript", "What are the differences between `for...in` and `for...of`?", "for-in-vs-for-of", "Compare loops.", "`for...in` iterates over enumerable property keys (including prototype chain). `for...of` iterates over iterable values. Prefer `for...of` for arrays; use `for...in` for object keys with `hasOwnProperty` check."],

  // ==================== PROTOTYPE & OOP (15) ====================
  ["JavaScript", "How does prototypal inheritance work in JavaScript?", "prototypal-inheritance", "Explain prototype inheritance.", "JavaScript objects have a prototype (internal `[[Prototype]]`). When accessing a property, the engine first checks the object, then its prototype, and so on up the prototype chain. Objects inherit from `Object.prototype` by default."],
  ["JavaScript", "What is `__proto__` and how is it different from `prototype`?", "proto-vs-prototype", "Compare __proto__ and prototype.", "`__proto__` is an accessor property for an object's prototype (deprecated, use `Object.getPrototypeOf()`). `prototype` is a property of constructor functions that defines the prototype for instances created with that constructor."],
  ["JavaScript", "What is `Object.create()`?", "object-create", "Explain `Object.create`.", "`Object.create(proto, propertiesObject)` creates a new object with the given prototype and optionally own properties. Used for prototypal inheritance without constructors."],
  ["JavaScript", "What are classes in JavaScript?", "classes-js", "Explain classes.", "ES6 classes are syntactic sugar over prototypal inheritance. They provide `class` keyword, `constructor`, `extends`, `super`, and static methods. Under the hood, they still use prototypes."],
  ["JavaScript", "What is the `extends` keyword?", "extends-keyword", "Explain `extends`.", "`extends` is used in class declarations to create a subclass. Example: `class Dog extends Animal`. The child class inherits methods and properties from the parent."],
  ["JavaScript", "What is the `super` keyword in classes?", "super-keyword", "Explain `super`.", "`super` is used to call the parent class constructor (`super()`) or access parent methods (`super.method()`). Required in child constructor before using `this`."],
  ["JavaScript", "What are static methods and properties?", "static-methods", "Explain static members.", "Static methods/properties are defined on the class itself, not instances. Declared with `static` keyword. Called as `ClassName.method()`."],
  ["JavaScript", "What is the difference between a class and a prototype?", "class-vs-prototype", "Compare class and prototype.", "Classes are a clearer, more OOP-friendly syntax. Prototypes are the underlying mechanism. Classes are not a new paradigm; they are syntactic sugar."],
  ["JavaScript", "What is a mixin?", "mixin-js", "Explain mixins.", "A mixin is a pattern to compose classes by mixing in methods from multiple sources. In JavaScript, use `Object.assign()` to copy methods to a class prototype."],
  ["JavaScript", "How do you check if an object has a property?", "hasOwnProperty", "Explain property checking.", "Use `obj.hasOwnProperty('prop')` to check own property. Use `'prop' in obj` to check prototype chain. For safety, use `Object.hasOwn(obj, 'prop')` (ES2022)."],
  ["JavaScript", "How do you get the prototype of an object?", "get-prototype", "Explain obtaining prototype.", "Use `Object.getPrototypeOf(obj)` (preferred) or `obj.__proto__` (deprecated)."],
  ["JavaScript", "What is `instanceof`?", "instanceof", "Explain `instanceof`.", "`instanceof` checks if the constructor's prototype appears anywhere in the object's prototype chain. Example: `arr instanceof Array`."],
  ["JavaScript", "What is `Object.getOwnPropertyNames()`?", "own-property-names", "Explain method.", "Returns an array of all own property keys (including non-enumerable) of an object. Use `Object.keys()` for enumerable only."],
  ["JavaScript", "What is the `new` keyword's behavior?", "new-keyword-behavior", "Explain `new`.", "`new` creates a new object, sets its prototype to the constructor's `prototype`, binds `this` to the new object, and returns the object (unless the constructor returns another object)."],
  ["JavaScript", "How do you create a constructor function?", "constructor-function", "Explain constructor functions.", "A constructor function is a regular function used with `new`. It initializes properties on `this`. Example: `function Person(name) { this.name = name; }`."],

  // ==================== DOM & EVENTS (15) ====================
  ["JavaScript", "What is the DOM?", "dom-js", "Define DOM.", "The Document Object Model (DOM) is a programming interface for HTML/XML documents. It represents the page as a tree of nodes, allowing scripts to dynamically access and update content, structure, and style."],
  ["JavaScript", "How do you select DOM elements?", "dom-selectors-js", "List selection methods.", "`document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()`, `document.getElementsByClassName()`, `document.getElementsByTagName()`, `document.getElementsByName()`."],
  ["JavaScript", "What is the difference between `querySelector` and `querySelectorAll`?", "querySelector-vs-all-js", "Compare methods.", "`querySelector` returns the first matching element; `querySelectorAll` returns a static NodeList of all matches. The latter is not live."],
  ["JavaScript", "How do you create and append an element?", "create-append-element", "Explain element creation.", "Use `document.createElement('div')`, then `parent.appendChild(child)` or `parent.append(child)` (multiple children). Also `insertBefore`, `insertAdjacentElement`."],
  ["JavaScript", "What is `innerHTML` vs `textContent`?", "innerhtml-vs-textcontent-js", "Compare properties.", "`innerHTML` parses HTML content, can be vulnerable to XSS. `textContent` sets plain text, safe. Use `textContent` for text, `innerHTML` only with trusted content."],
  ["JavaScript", "What are event listeners?", "event-listeners", "Explain event listeners.", "Event listeners allow responding to user interactions (click, keydown, etc.). Use `element.addEventListener('event', handler, options)`."],
  ["JavaScript", "What is event bubbling and capturing?", "event-bubbling-capturing-js", "Explain event phases.", "Event propagation has three phases: capturing (top to bottom), target, and bubbling (bottom to top). Bubbling is default."],
  ["JavaScript", "How do you stop event propagation?", "stop-propagation-js", "Explain stopping propagation.", "Use `event.stopPropagation()` to prevent bubbling. Use `event.stopImmediatePropagation()` to prevent other listeners on same element."],
  ["JavaScript", "How do you prevent default behavior?", "prevent-default-js", "Explain `preventDefault`.", "`event.preventDefault()` prevents the default action (e.g., link navigation, form submission). It does not stop propagation."],
  ["JavaScript", "What is event delegation?", "event-delegation-js", "Explain event delegation.", "Event delegation attaches a single listener to a parent element to handle events on its children. Uses bubbling. Improves performance and handles dynamic content."],
  ["JavaScript", "What is the difference between `mouseover` and `mouseenter`?", "mouseover-vs-mouseenter", "Compare mouse events.", "`mouseover` bubbles and triggers when entering child elements; `mouseenter` does not bubble and triggers only once when entering the element."],
  ["JavaScript", "How do you handle keyboard events?", "keyboard-events", "Explain keyboard handling.", "Use `keydown`, `keypress` (deprecated), `keyup`. Access `event.key` (character) and `event.code` (physical key). Use `event.preventDefault()` to prevent default actions (e.g., form submission on Enter)."],
  ["JavaScript", "What is the `DOMContentLoaded` event?", "domcontentloaded", "Explain `DOMContentLoaded`.", "Fires when the initial HTML is fully parsed and DOM is ready, without waiting for stylesheets, images, etc. Use for DOM manipulation."],
  ["JavaScript", "What is the `load` event?", "load-event-js", "Explain `load`.", "Fires when the entire page (all resources) is loaded. Useful for measuring performance."],
  ["JavaScript", "What is the `IntersectionObserver` API?", "intersection-observer-js", "Explain IntersectionObserver.", "A browser API that observes visibility of elements relative to the viewport. Used for lazy loading, infinite scroll, and ad impressions."],

  // ==================== MODULES (10) ====================
  ["JavaScript", "What are modules in JavaScript?", "modules-js", "Explain modules.", "Modules are a way to split code into separate files, each with its own scope. They use `export` and `import` statements (ES modules). Modules are loaded asynchronously, and they support tree-shaking."],
  ["JavaScript", "What is the difference between `export` and `export default`?", "export-vs-default", "Compare export types.", "`export` can be used multiple times per module (named exports). `export default` exports a single value as default. Import: `import { x } from './mod'` vs `import x from './mod'`."],
  ["JavaScript", "How do you import a module?", "import-js", "Explain import syntax.", "Use `import { named } from './module.js'`, `import default from './module.js'`, or `import * as all from './module.js'`. Also dynamic import: `const module = await import('./module.js')`."],
  ["JavaScript", "What is the difference between dynamic import and static import?", "dynamic-vs-static-import", "Compare import types.", "Static imports are hoisted and loaded before execution. Dynamic imports (`import()`) are asynchronous and load at runtime, enabling code splitting and lazy loading."],
  ["JavaScript", "What is the `module` type in `<script>`?", "script-module", "Explain script type module.", "Use `<script type=\"module\">` to use ES modules in browsers. They are deferred by default, and `import`/`export` are supported."],
  ["JavaScript", "What is the difference between Node.js modules and ES modules?", "node-vs-es-modules", "Compare module systems.", "Node.js uses CommonJS (`require`/`module.exports`) by default. ES modules (`import`/`export`) are the standard. Node.js now supports ES modules with `.mjs` extension or `\"type\": \"module\"` in package.json."],
  ["JavaScript", "What is a circular dependency and how to resolve it?", "circular-dependency", "Explain circular dependencies.", "Circular dependencies happen when two modules import each other. They can cause undefined values. Resolve by refactoring, using lazy imports, or restructuring."],
  ["JavaScript", "What is tree shaking in JavaScript?", "tree-shaking-js", "Explain tree shaking.", "Tree shaking is dead code elimination by bundlers (Webpack, Rollup) that removes unused exports from ES modules, reducing bundle size."],
  ["JavaScript", "What is a module bundler?", "module-bundler", "Explain bundlers.", "A module bundler (Webpack, Vite, Rollup) takes modules and dependencies and bundles them into a single file (or chunks). It handles code splitting, minification, and asset loading."],
  ["JavaScript", "What is the `import.meta` object?", "import-meta", "Explain `import.meta`.", "`import.meta` provides metadata about the module, like `import.meta.url` (the module's URL). Used for dynamic resolution."],

  // ==================== ERROR HANDLING (10) ====================
  ["JavaScript", "How do you handle errors in JavaScript?", "error-handling-js", "Explain error handling.", "Use `try/catch/finally` blocks for synchronous errors. For promises, use `.catch()` or `try/catch` with `async/await`. Also use `throw` to create custom errors."],
  ["JavaScript", "What is the `finally` block?", "finally-js", "Explain `finally`.", "`finally` is executed after `try` and `catch` (if any), regardless of whether an error occurred. Used for cleanup (closing files, etc.)."],
  ["JavaScript", "What is the `Error` object?", "error-object", "Explain Error.", "`Error` is the base class for errors. It has `name`, `message`, `stack` properties. Custom errors can extend `Error`."],
  ["JavaScript", "What is the difference between `throw` and `return`?", "throw-vs-return", "Compare throw and return.", "`throw` raises an exception that can be caught; `return` exits the function with a value. `throw` can be caught by `catch`; `return` just returns."],
  ["JavaScript", "How do you handle promise rejections?", "promise-rejections", "Explain handling promise rejections.", "Use `.catch()` on the promise, or use `try/catch` inside `async/await`. For unhandled rejections, use `unhandledRejection` event."],
  ["JavaScript", "What is `catch` in promise chaining?", "catch-js", "Explain `.catch()`.", "`.catch()` attaches a rejection handler. It returns a promise, so you can continue chaining. It catches errors from previous `.then` handlers."],
  ["JavaScript", "What is `finally` in promises?", "finally-promise", "Explain `.finally()`.", "`.finally()` attaches a handler that runs regardless of resolution, similar to `finally` in `try/catch`. Useful for cleanup."],
  ["JavaScript", "What is the `try` block with `finally` without `catch`?", "try-finally", "Explain `try-finally`.", "`try` can be followed by `finally` without `catch`. The `finally` block runs regardless; useful for closing resources even if error occurs."],
  ["JavaScript", "How do you create a custom error class?", "custom-error", "Explain custom error.", "Extend the `Error` class: `class MyError extends Error { constructor(message) { super(message); this.name = 'MyError'; } }`."],
  ["JavaScript", "What is the `Error.captureStackTrace` method?", "capture-stack-trace", "Explain `Error.captureStackTrace`.", "A Node.js method that captures the stack trace at the point of creation, used in custom error classes to improve debugging."],

  // ==================== PERFORMANCE (10) ====================
  ["JavaScript", "How do you optimize JavaScript performance?", "js-performance", "List performance optimization techniques.", "Minify and bundle code, use lazy loading, debounce/throttle event handlers, avoid memory leaks, use `requestAnimationFrame` for animations, optimize DOM updates (DocumentFragment), and use Web Workers for CPU-heavy tasks."],
  ["JavaScript", "What is debouncing and throttling?", "debouncing-throttling", "Explain debouncing and throttling.", "Debouncing delays function execution until after a quiet period; throttling limits execution rate (e.g., once per second). Used for scroll/resize events."],
  ["JavaScript", "What is the difference between debouncing and throttling?", "debounce-vs-throttle", "Compare debounce and throttle.", "Debouncing: execute after delay from last call; throttling: execute at most once per interval. Debouncing for input; throttling for scroll."],
  ["JavaScript", "What is a memory leak and how to prevent it?", "memory-leak-js", "Explain memory leaks.", "Memory leaks occur when objects are not garbage collected due to lingering references. Causes: accidental globals, unremoved event listeners, closures holding large data, and detached DOM nodes. Prevent by cleaning up listeners and clearing references."],
  ["JavaScript", "What is the difference between `performance.now()` and `Date.now()`?", "performance-now-vs-date-now", "Compare time measurement.", "`performance.now()` returns high-resolution, monotonic time (measured in milliseconds) from navigation start, suitable for performance measurements. `Date.now()` gives system time (affected by system clock adjustments)."],
  ["JavaScript", "How do you measure code execution time?", "measure-time", "Explain measuring time.", "Use `console.time('label')` and `console.timeEnd('label')` for simple timing. Use `performance.now()` for more precise measurement."],
  ["JavaScript", "What is the `requestIdleCallback` API?", "requestIdleCallback", "Explain requestIdleCallback.", "Schedules a function to run during idle periods, allowing non-critical tasks to run without affecting user interactions. Useful for analytics, prefetching."],
  ["JavaScript", "What is code splitting in JavaScript?", "code-splitting-js", "Explain code splitting.", "Code splitting divides the application bundle into smaller chunks loaded on demand. In JavaScript, use dynamic imports (`import()`) and bundler support (Webpack, Vite)."],
  ["JavaScript", "What is the `async/defer` attribute on `<script>` tags?", "async-defer", "Explain script loading.", "`async` loads script asynchronously and executes as soon as it's ready. `defer` loads script asynchronously but executes after HTML parsing. Both prevent render blocking."],
  ["JavaScript", "What is the `preload` and `prefetch` in JavaScript?", "preload-prefetch", "Explain resource hints.", "`rel=\"preload\"` tells the browser to load a resource early (for critical resources). `rel=\"prefetch\"` hints that a resource will be needed for future navigation, loaded after main resources."],

  // ==================== SECURITY (10) ====================
  ["JavaScript", "What are common security vulnerabilities in JavaScript?", "js-security", "List common vulnerabilities.", "XSS (cross-site scripting), CSRF, SQL injection (via backend), insecure direct object references, and insecure use of `eval()`, `innerHTML`, and `document.write`."],
  ["JavaScript", "What is XSS and how do you prevent it?", "xss-js", "Explain XSS prevention.", "XSS is injecting malicious scripts. Prevent by escaping user input (e.g., `textContent` instead of `innerHTML`), using CSP (Content Security Policy), and sanitizing data with libraries like DOMPurify."],
  ["JavaScript", "What is CSRF and how do you prevent it?", "csrf-js", "Explain CSRF prevention.", "CSRF tricks a user into making unintended requests. Prevent by using anti-CSRF tokens, SameSite cookies, and validating referer headers."],
  ["JavaScript", "What is the `eval()` function and why is it dangerous?", "eval-dangerous", "Explain `eval()` risks.", "`eval()` executes a string as code. It is dangerous because it can execute arbitrary code, leading to XSS. Avoid `eval()`; use JSON.parse for JSON."],
  ["JavaScript", "What is Content Security Policy (CSP)?", "csp-js", "Explain CSP.", "CSP is a security header that restricts resources (scripts, styles) that can be loaded, mitigating XSS and data injection. Configure via meta tag or server header."],
  ["JavaScript", "What is the `same-origin policy`?", "same-origin-policy", "Explain same-origin policy.", "The same-origin policy restricts interactions between different origins (protocol, domain, port). It prevents scripts from one origin from accessing data on another, protecting against CSRF and data theft."],
  ["JavaScript", "What is CORS and how does it work?", "cors-js", "Explain CORS.", "Cross-Origin Resource Sharing (CORS) is a mechanism that allows restricted resources from another origin. The server sends `Access-Control-Allow-Origin` headers. Browsers enforce it."],
  ["JavaScript", "What is the `Subresource Integrity` (SRI) attribute?", "sri", "Explain SRI.", "SRI ensures external resources (like scripts from CDNs) are not tampered with. Use `integrity` attribute with a hash. The browser checks the hash before executing."],
  ["JavaScript", "How do you store sensitive data in JavaScript?", "secure-storage", "Explain secure storage.", "Do not store sensitive data (passwords, tokens) in `localStorage` or `sessionStorage` as they are accessible to scripts. Use secure, HTTP-only cookies or server-side sessions. For tokens, consider using memory-only storage."],
  ["JavaScript", "What is the `X-Content-Type-Options` header?", "x-content-type", "Explain header.", "Prevents MIME type sniffing by setting `X-Content-Type-Options: nosniff`. This ensures that browsers follow the declared content type, reducing risk of XSS."],

  // ==================== TESTING (5) ====================
  ["JavaScript", "What are the common testing frameworks for JavaScript?", "js-testing-frameworks", "List testing frameworks.", "Unit testing: Jest, Mocha, Jasmine. E2E: Cypress, Playwright, Selenium. Assertion libraries: Chai, Expect."],
  ["JavaScript", "What is unit testing?", "unit-testing-js", "Explain unit testing.", "Unit testing verifies individual functions/components in isolation. It uses mocks and stubs. Jest is commonly used for React and Node.js."],
  ["JavaScript", "What is the difference between `describe` and `it` in testing?", "describe-it", "Explain test blocks.", "`describe` groups related tests, `it` (or `test`) defines an individual test case. Used in Mocha/Jest."],
  ["JavaScript", "What is mocking in JavaScript testing?", "mocking-js", "Explain mocking.", "Mocking replaces dependencies with fake implementations to isolate the code under test. Jest provides `jest.fn()`, `jest.mock()`."],
  ["JavaScript", "What is E2E testing?", "e2e-testing", "Explain end-to-end testing.", "E2E testing tests the entire application as a user would. Tools like Cypress simulate browser interactions. It covers integration and UI."],

  // ==================== BROWSER APIS (10) ====================
  ["JavaScript", "What is the `localStorage` API?", "localstorage-js", "Explain localStorage.", "`localStorage` allows storing key-value pairs with no expiration. Data persists across sessions. Use `setItem`, `getItem`, `removeItem`, `clear`. Synchronous, limited to ~5MB."],
  ["JavaScript", "What is the `sessionStorage` API?", "sessionstorage-js", "Explain sessionStorage.", "Similar to localStorage but data is cleared when the page session ends (tab closed). Same API."],
  ["JavaScript", "What is the difference between `localStorage` and `cookies`?", "localstorage-vs-cookies", "Compare storage mechanisms.", "`localStorage` stores data locally with larger storage (~5MB), sent only via JS. Cookies are smaller (4KB), sent with every HTTP request, and can be set with expiration. Cookies can be used for server-side."],
  ["JavaScript", "What is the `history` API?", "history-api", "Explain History API.", "The History API allows manipulating the browser history: `pushState`, `replaceState`, and `popstate` event. Used for SPA routing without page reload."],
  ["JavaScript", "What is the `fetch` API?", "fetch-api-js", "Explain Fetch API.", "`fetch` is a modern API for making network requests, returning a Promise. It supports `GET`, `POST`, etc., and provides `Response` object with methods like `.json()`, `.text()`."],
  ["JavaScript", "What are web workers?", "web-workers-js", "Explain Web Workers.", "Web Workers run scripts on background threads, allowing CPU-heavy tasks without blocking UI. They have no DOM access. Communicate via `postMessage` and `onmessage`."],
  ["JavaScript", "What is the `FileReader` API?", "filereader", "Explain FileReader.", "`FileReader` allows reading files asynchronously (text, data URL, ArrayBuffer). Used with `<input type=\"file\">`. Example: `reader.readAsText(file)`."],
  ["JavaScript", "What is the `Geolocation` API?", "geolocation", "Explain Geolocation.", "`navigator.geolocation` provides location data. Use `getCurrentPosition()` and `watchPosition()`. Requires user permission."],
  ["JavaScript", "What is the `Notification` API?", "notification-api", "Explain Notifications.", "`Notification` API allows sending desktop notifications. Requires permission and user interaction."],
  ["JavaScript", "What is the `Canvas` API?", "canvas-api", "Explain Canvas.", "Canvas provides a 2D drawing context using `<canvas>` element. Use `getContext('2d')` to draw shapes, text, and images."],

  // ==================== SCENARIO-BASED (20) ====================
  ["JavaScript", "How would you implement a debounce function?", "debounce-implementation", "Explain debounce implementation.", "Create a function that takes a function and delay. Returns a wrapper that clears previous timeout and sets a new one. Example: `function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); } }`."],
  ["JavaScript", "How would you implement a throttle function?", "throttle-implementation", "Explain throttle implementation.", "Create a function that takes a function and interval. Uses a flag to control execution rate. Example: `function throttle(fn, limit) { let inThrottle; return (...args) => { if (!inThrottle) { fn(...args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } } }`."],
  ["JavaScript", "How would you deep clone an object?", "deep-clone", "Explain deep cloning.", "Use `JSON.parse(JSON.stringify(obj))` for simple objects (ignores functions, dates). For robust, use `structuredClone(obj)` (modern) or a recursive function."],
  ["JavaScript", "How would you flatten a nested array?", "flatten-array", "Explain flattening.", "Use `arr.flat(Infinity)` (ES2019) or recursive reduce: `function flatten(arr) { return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []); }`."],
  ["JavaScript", "How would you group an array of objects by a property?", "group-array", "Explain grouping.", "Use `reduce`: `const groups = items.reduce((acc, item) => { (acc[item.category] = acc[item.category] || []).push(item); return acc; }, {});`."],
  ["JavaScript", "How would you memoize a function?", "memoize", "Explain memoization.", "Use a cache object: `function memoize(fn) { const cache = {}; return (...args) => { const key = JSON.stringify(args); if (cache[key] === undefined) cache[key] = fn(...args); return cache[key]; }; }`."],
  ["JavaScript", "How would you implement a Promise from scratch?", "promise-implementation", "Explain implementing Promise.", "Create a class with states, `then` and `catch` methods, that store callbacks and resolve/reject them."],
  ["JavaScript", "How would you implement a simple event emitter?", "event-emitter", "Explain event emitter.", "Create a class with `events` map. Methods: `on(event, listener)` adds listener, `emit(event, data)` calls all listeners."],
  ["JavaScript", "How would you implement a curry function?", "curry", "Explain currying.", "Currying transforms a function with multiple arguments into a sequence of functions. Use recursion: `function curry(fn) { return (...args) => args.length >= fn.length ? fn(...args) : (...more) => curry(fn)(...args, ...more); }`."],
  ["JavaScript", "How would you implement a debounced API call?", "debounce-api", "Explain debouncing API.", "Use debounce to delay API call on user input. Example: `const search = debounce(async (query) => { const res = await fetch(`/search?q=${query}`); ... }, 300);`"],
  ["JavaScript", "How would you implement infinite scroll?", "infinite-scroll-js", "Explain infinite scroll.", "Use IntersectionObserver on a sentinel element. When visible, fetch more data and append to the list."],
  ["JavaScript", "How would you implement a modal?", "modal-js", "Explain modal implementation.", "Create a backdrop div and modal div, toggle visibility with display/opacity, handle Escape key close, trap focus inside."],
  ["JavaScript", "How would you implement drag-and-drop?", "drag-drop-js", "Explain drag and drop.", "Use `mousedown`, `mousemove`, `mouseup` on element. Track offsets and update position. For HTML5 drag and drop, use `dragover`, `drop` events."],
  ["JavaScript", "How would you implement a timeout for a fetch request?", "fetch-timeout", "Explain fetch timeout.", "Use `Promise.race` with a timeout promise: `Promise.race([fetch(url), new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))])`."],
  ["JavaScript", "How would you handle duplicate requests?", "deduplicate-requests", "Explain request deduplication.", "Use a cache map with pending promises. If a request with the same key is in progress, return the existing promise."],
  ["JavaScript", "How would you implement a simple state management (like Redux)?", "state-management", "Explain state management.", "Create a store with `getState`, `dispatch(action)`, and `subscribe(listener)`. Use a reducer to update state."],
  ["JavaScript", "How would you implement a queue with concurrency limit?", "queue-concurrency", "Explain queue with concurrency.", "Use an array for tasks and a counter for running tasks. Process tasks when capacity available."],
  ["JavaScript", "How would you implement a retry logic with exponential backoff?", "retry-backoff-js", "Explain retry with backoff.", "Wrap async function in a loop with `await delay(backoff * attempt)` until success or max attempts."],
  ["JavaScript", "How would you implement a polling mechanism?", "polling", "Explain polling.", "Use `setInterval` or recursive `setTimeout` to fetch data periodically. Use `AbortController` to cancel on cleanup."],
  ["JavaScript", "How would you implement a virtual list for large data?", "virtual-list", "Explain virtual list.", "Render only visible items based on scroll position. Use `scrollTop` and `offsetHeight` to calculate visible range. Use a single container with padding to simulate full height."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain JavaScript concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing JavaScript features without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "javascript" },
    update: { name: "JavaScript", group: "Technology", description: "JavaScript interview questions." },
    create: { name: "JavaScript", slug: "javascript", group: "Technology", description: "JavaScript interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "javascript" } },
    update: {},
    create: { name: "JavaScript", slug: "javascript", categoryId: category.id },
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
        tags: ["JavaScript"],
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
        tags: ["JavaScript"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} JavaScript questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");