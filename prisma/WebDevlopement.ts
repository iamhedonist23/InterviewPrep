// ---- 200+ Web Development Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["Web Development", "Web Development"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["Web Development", "What is web development and what are its main areas?", "web-dev-overview", "Define web development and its domains.", "Web development is the process of building websites and web applications. It includes frontend (client-side), backend (server-side), and full-stack. Frontend deals with UI/UX, HTML, CSS, JavaScript; backend handles databases, APIs, and business logic."],
  ["Web Development", "What is the difference between a website and a web application?", "website-vs-webapp", "Compare website and web app.", "A website is typically static or informational (e.g., blog, brochure). A web application is interactive and performs functions (e.g., Gmail, Facebook). Web apps involve user authentication, data processing, and state management."],
  ["Web Development", "What is the role of a web browser?", "browser-role", "Explain browser function.", "A browser renders HTML, CSS, and JavaScript, and handles HTTP requests. It parses the DOM, applies styles, executes scripts, and manages networking, caching, and security."],
  ["Web Development", "What is the client-server model?", "client-server-model", "Explain client-server.", "The client (browser) sends requests to a server; the server processes them and returns responses (HTML, JSON, etc.). This model underpins web communication via HTTP/HTTPS."],
  ["Web Development", "What is HTTP and how does it work?", "http-overview", "Explain HTTP.", "HTTP (Hypertext Transfer Protocol) is an application-layer protocol for transmitting hypermedia. It uses a request-response model with methods (GET, POST, PUT, DELETE). HTTPS adds encryption via TLS/SSL."],
  ["Web Development", "What is the difference between HTTP and HTTPS?", "http-vs-https", "Compare secure and insecure protocols.", "HTTPS is HTTP with encryption (TLS/SSL). It ensures data integrity, confidentiality, and authentication. It prevents man-in-the-middle attacks and is mandatory for modern web."],
  ["Web Development", "What is a URL?", "url", "Define URL.", "A URL (Uniform Resource Locator) is a reference to a resource on the web. It consists of protocol, domain, path, query parameters, and fragment."],
  ["Web Development", "What is DNS?", "dns", "Explain DNS.", "DNS (Domain Name System) translates human-readable domain names (e.g., google.com) to IP addresses. It is a distributed hierarchical system."],
  ["Web Development", "What is HTML and what is its purpose?", "html-overview", "Explain HTML.", "HTML (Hypertext Markup Language) is the standard markup language for creating web pages. It structures content using elements (tags) and defines the page skeleton."],
  ["Web Development", "What is CSS and what is its purpose?", "css-overview", "Explain CSS.", "CSS (Cascading Style Sheets) is a stylesheet language for describing the presentation of a document written in HTML. It controls layout, colors, fonts, and responsiveness."],
  ["Web Development", "What is JavaScript and what is its role in web development?", "javascript-role", "Explain JavaScript.", "JavaScript is a high-level, dynamic programming language that enables interactivity on web pages. It is executed in the browser (client-side) and on servers (Node.js)."],
  ["Web Development", "What is the DOM?", "dom-definition", "Explain DOM.", "The DOM (Document Object Model) is a programming interface for web documents. It represents the page as a tree of objects, allowing scripts to dynamically change content, structure, and style."],
  ["Web Development", "What is responsive web design?", "responsive-design", "Explain responsive design.", "Responsive web design ensures a website looks and functions well on all devices (desktop, tablet, mobile). It uses fluid grids, flexible images, and CSS media queries."],
  ["Web Development", "What is the difference between frontend and backend?", "frontend-vs-backend", "Compare frontend and backend.", "Frontend is everything the user sees and interacts with (HTML, CSS, JS). Backend is server-side logic, databases, and APIs (Node.js, Python, Java)."],
  ["Web Development", "What is a web server?", "web-server", "Define web server.", "A web server (e.g., Apache, Nginx) is software that listens for HTTP requests and serves web pages or APIs. It can host static files or forward requests to application servers."],
  ["Web Development", "What is an API?", "api-definition", "Define API.", "API (Application Programming Interface) is a set of rules and protocols for building and interacting with software. In web, REST APIs use HTTP to exchange data (usually JSON)."],
  ["Web Development", "What is JSON?", "json", "Explain JSON.", "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is language-independent and easy for humans and machines to read/write. Used extensively in web APIs."],
  ["Web Development", "What is AJAX?", "ajax", "Explain AJAX.", "AJAX (Asynchronous JavaScript and XML) allows web pages to update asynchronously by exchanging data with a server behind the scenes. It uses `XMLHttpRequest` or `fetch` and is fundamental for modern SPAs."],
  ["Web Development", "What is a Single Page Application (SPA)?", "spa", "Define SPA.", "An SPA is a web application that loads a single HTML page and dynamically updates content using JavaScript. It offers a smooth user experience like a desktop app. Frameworks: React, Vue, Angular."],
  ["Web Development", "What is a Progressive Web App (PWA)?", "pwa", "Explain PWA.", "PWAs are web applications that use modern web capabilities to deliver an app-like experience. They are installable, offline-capable (service workers), and provide push notifications."],

  // ==================== HTML (15) ====================
  ["Web Development", "What are the basic HTML5 semantic elements?", "html5-semantic", "List semantic elements.", "Semantic elements clearly describe their meaning: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<figcaption>`, `<time>`, `<mark>`. They improve SEO and accessibility."],
  ["Web Development", "What is the difference between `<div>` and `<span>`?", "div-vs-span", "Compare inline and block.", "`<div>` is a block-level element used for grouping larger content. `<span>` is an inline element used for styling small pieces of text. Both are generic containers."],
  ["Web Development", "What is the difference between `<blockquote>` and `<q>`?", "blockquote-vs-q", "Compare quote elements.", "`<blockquote>` is for long quotations, displayed as a block. `<q>` is for short inline quotations that automatically get quotation marks."],
  ["Web Development", "What is the purpose of the `alt` attribute in images?", "alt-attribute", "Explain alt.", "The `alt` attribute provides alternative text for images. It is crucial for accessibility (screen readers) and displays when the image fails to load."],
  ["Web Development", "How do you create a hyperlink in HTML?", "hyperlink", "Explain `<a>` tag.", "Use `<a href=\"url\">link text</a>`. Attributes include `target` (e.g., `_blank` for new tab), `rel` (security), and `title`."],
  ["Web Development", "What is the `doctype` declaration?", "doctype", "Explain DOCTYPE.", "`<!DOCTYPE html>` is the document type declaration for HTML5. It tells the browser to render in standards mode, avoiding quirks mode."],
  ["Web Development", "What are data attributes in HTML?", "data-attributes", "Explain `data-*` attributes.", "Data attributes allow storing custom data on elements: `data-user-id=\"123\"`. They can be accessed in JavaScript via `dataset`."],
  ["Web Development", "What is the `<meta>` tag used for?", "meta-tag", "Explain meta.", "The `<meta>` tag provides metadata about the HTML document, such as character set (`charset=\"UTF-8\"`), viewport settings, description, keywords, and Open Graph tags for social sharing."],
  ["Web Development", "What is the difference between `<script>` and `<link>`?", "script-vs-link", "Compare external resources.", "`<script>` loads JavaScript (can be external or inline). `<link>` loads external resources like CSS stylesheets, icons, and preconnect."],
  ["Web Development", "What is the `defer` and `async` attribute in `<script>`?", "defer-async", "Explain script loading.", "`async`: script loads asynchronously and executes as soon as possible. `defer`: script loads asynchronously but executes after the HTML parsing is complete. Both prevent render blocking."],
  ["Web Development", "What is the `picture` element?", "picture-element", "Explain `<picture>`.", "`<picture>` allows serving different image sources based on device conditions (e.g., screen width, DPR). It contains `<source>` children with `media` and `srcset` attributes."],
  ["Web Development", "What is the `srcset` attribute?", "srcset", "Explain responsive images.", "`srcset` provides a list of image URLs with their widths (e.g., `srcset=\"img-320.jpg 320w, img-640.jpg 640w\"`). The browser chooses the best fit for the viewport."],
  ["Web Development", "What are iframes and how do you use them?", "iframe", "Explain iframe.", "`<iframe>` embeds another HTML page within the current page. It can have `src`, `width`, `height`, `sandbox` (security), and `loading` attributes."],
  ["Web Development", "What is the `form` element and its common attributes?", "form-element", "Explain forms.", "`<form>` is used for user input. Attributes: `action` (URL to submit), `method` (GET/POST), `enctype` (for file uploads), `novalidate`, `target`. Contains inputs, buttons, labels."],
  ["Web Development", "What are input types in HTML5?", "input-types", "List input types.", "Text, password, email, number, tel, date, time, datetime-local, color, range, checkbox, radio, file, submit, reset, button, hidden, and search."],

  // ==================== CSS (20) ====================
  ["Web Development", "What are the ways to include CSS in HTML?", "include-css", "Explain CSS inclusion.", "Inline (using `style` attribute), internal (`<style>` in `<head>`), and external (via `<link>`). External is recommended for maintainability."],
  ["Web Development", "What is the difference between class and ID selectors?", "class-vs-id", "Compare selectors.", "ID (`#id`) is unique and can only be used once per page; class (`.class`) can be applied to multiple elements. Classes have lower specificity than IDs."],
  ["Web Development", "What is the CSS box model?", "box-model", "Explain box model.", "The box model consists of: content, padding, border, and margin. Total width = width + padding + border + margin (if `box-sizing: content-box`). Use `box-sizing: border-box` to include padding and border in width."],
  ["Web Development", "What is the difference between `display: block`, `inline`, and `inline-block`?", "display-values", "Compare display values.", "`block`: takes full width, new line. `inline`: only as wide as content, no width/height. `inline-block`: inline but can have width/height and margins."],
  ["Web Development", "What is the `position` property and its values?", "position-property", "Explain positioning.", "`static` (default), `relative` (relative to normal position), `absolute` (relative to nearest positioned ancestor), `fixed` (relative to viewport), `sticky` (hybrid of relative and fixed)."],
  ["Web Development", "What is flexbox and why is it useful?", "flexbox", "Explain flexbox.", "Flexbox is a one-dimensional layout model for distributing space along a row or column. It makes alignment, direction, and ordering easy. Properties: `display:flex`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`."],
  ["Web Development", "What is CSS Grid?", "css-grid", "Explain grid.", "Grid is a two-dimensional layout system for creating complex layouts. It defines rows and columns, and items can be placed precisely. Properties: `display:grid`, `grid-template-columns`, `grid-template-rows`, `gap`."],
  ["Web Development", "What are pseudo-classes and pseudo-elements? Give examples.", "pseudo-classes-elements", "Explain pseudo selectors.", "Pseudo-classes (`:hover`, `:focus`, `:nth-child`) select elements in a specific state. Pseudo-elements (`::before`, `::after`, `::first-line`) style parts of an element."],
  ["Web Development", "What is the `z-index` property?", "z-index", "Explain z-index.", "`z-index` controls the stacking order of positioned elements. Higher values are closer to the user. It only works on positioned elements (relative, absolute, fixed, sticky)."],
  ["Web Development", "What is the difference between `visibility: hidden` and `display: none`?", "visibility-vs-display", "Compare hiding methods.", "`visibility: hidden` hides the element but preserves its space. `display: none` removes the element entirely from the layout."],
  ["Web Development", "What is CSS specificity?", "specificity", "Explain specificity.", "Specificity determines which CSS rule applies when multiple rules match. Hierarchy: inline styles > IDs > classes/attributes/pseudo-classes > elements/pseudo-elements. Universal selector has 0 specificity."],
  ["Web Development", "What are media queries?", "media-queries", "Explain media queries.", "Media queries allow applying CSS based on device characteristics (viewport width, orientation, resolution). Example: `@media (max-width: 768px) { ... }`."],
  ["Web Development", "What is a CSS preprocessor and why use one?", "css-preprocessor", "Explain preprocessors.", "Preprocessors (Sass, Less) extend CSS with variables, nesting, mixins, functions, and file imports. They reduce repetition and improve maintainability."],
  ["Web Development", "What is the `rem` unit?", "rem-unit", "Explain rem.", "`rem` is relative to the root (`html`) font-size. It scales consistently and is often preferred over `em` for global sizing."],
  ["Web Development", "What is the difference between `em` and `rem`?", "em-vs-rem", "Compare relative units.", "`em` is relative to the font-size of the parent element; `rem` is relative to the root font-size. `rem` avoids compounding issues."],
  ["Web Development", "How do you center a div?", "center-div", "Explain centering methods.", "Using flexbox: `display: flex; justify-content: center; align-items: center;`. Using grid: `display: grid; place-items: center;`. Using `margin: auto` on a block with fixed width."],
  ["Web Development", "What is the `object-fit` property?", "object-fit", "Explain object-fit.", "`object-fit` controls how an `<img>` or `<video>` resizes to fit its container. Values: `fill`, `contain`, `cover`, `none`, `scale-down`. Useful for image cropping."],
  ["Web Development", "What is the `transform` property?", "transform", "Explain transforms.", "`transform` applies 2D or 3D transformations: `rotate`, `scale`, `translate`, `skew`, and `matrix`. It does not affect layout (like position changes)."],
  ["Web Development", "What are CSS animations?", "css-animations", "Explain animations.", "Animations are defined with `@keyframes` and applied using `animation` property (name, duration, timing, delay, iteration-count). They allow complex, multi-step animations."],
  ["Web Development", "What is the `transition` property?", "transition", "Explain transitions.", "Transitions smoothly change property values over time. They require a property, duration, timing function, and delay. Example: `transition: opacity 0.3s ease`."],

  // ==================== JAVASCRIPT (30) ====================
  ["Web Development", "What are the data types in JavaScript?", "js-data-types", "List JS types.", "Primitives: `string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`. Object: `object` (including arrays, functions, dates)."],
  ["Web Development", "What is the difference between `let`, `const`, and `var`?", "var-let-const", "Compare variable declarations.", "`var` is function-scoped and hoisted; `let` and `const` are block-scoped and not hoisted. `const` cannot be reassigned; `let` can."],
  ["Web Development", "What is hoisting in JavaScript?", "hoisting", "Explain hoisting.", "Hoisting moves declarations to the top of their scope during compilation. Variables declared with `var` are hoisted but initialized as `undefined`. Functions are fully hoisted."],
  ["Web Development", "What are arrow functions and how do they differ from regular functions?", "arrow-functions", "Explain arrow functions.", "Arrow functions (`() => {}`) have a shorter syntax, do not have their own `this`, and cannot be used as constructors. They inherit `this` from the surrounding scope."],
  ["Web Development", "What is the `this` keyword in JavaScript?", "this-keyword", "Explain `this`.", "`this` refers to the execution context. In a method, it refers to the object; in a function, to the global object (or `undefined` in strict mode); in an event handler, to the element."],
  ["Web Development", "What are closures?", "closures", "Explain closures.", "A closure is a function that remembers its lexical scope even when the function is executed outside that scope. It enables private variables and functional programming patterns."],
  ["Web Development", "What is the event loop in JavaScript?", "event-loop", "Explain event loop.", "The event loop handles asynchronous operations. It processes the call stack and task queue (microtasks and macrotasks). It allows non-blocking I/O in JavaScript."],
  ["Web Development", "What is the difference between `==` and `===`?", "double-vs-triple-equals", "Compare equality operators.", "`==` performs type coercion; `===` checks strict equality (both value and type). Always prefer `===` to avoid bugs."],
  ["Web Development", "What is the `typeof` operator?", "typeof", "Explain `typeof`.", "`typeof` returns the type of an operand: `typeof 5 === 'number'`. It has quirks: `typeof null === 'object'`, `typeof [] === 'object'`."],
  ["Web Development", "What is the spread operator?", "spread-operator", "Explain spread.", "`...` spreads an iterable (array, object, string) into individual elements. Used to copy arrays/objects, merge, or pass elements as arguments."],
  ["Web Development", "What is destructuring in JavaScript?", "destructuring", "Explain destructuring.", "Destructuring extracts values from arrays or objects into distinct variables: `const { name } = person;` or `const [first, second] = arr;`."],
  ["Web Development", "What is a Promise?", "promise", "Explain Promise.", "A Promise represents the eventual completion (or failure) of an asynchronous operation. It has states: pending, fulfilled, rejected. Methods: `.then()`, `.catch()`, `.finally()`."],
  ["Web Development", "What is `async/await`?", "async-await", "Explain async/await.", "`async` functions return a Promise. `await` pauses execution until the Promise resolves. It makes asynchronous code look synchronous."],
  ["Web Development", "What is the difference between `try/catch` and `.catch()`?", "try-catch-vs-catch", "Compare error handling.", "`try/catch` is used in `async/await`. `.catch()` is used on Promises. Both handle exceptions, but `try/catch` is more flexible with multiple operations."],
  ["Web Development", "What is a callback function?", "callback", "Define callback.", "A callback is a function passed as an argument to another function to be executed later. Used in event handlers, `setTimeout`, and array methods."],
  ["Web Development", "What is the `fetch` API?", "fetch-api", "Explain `fetch`.", "`fetch` is a modern API for making network requests. It returns a Promise that resolves to a `Response` object. Example: `fetch(url).then(res => res.json())`."],
  ["Web Development", "What is the difference between `localStorage`, `sessionStorage`, and cookies?", "storage-comparison", "Compare storage mechanisms.", "`localStorage`: persists until deleted, across sessions. `sessionStorage`: persists only for the current tab. Cookies: sent with every request, limited size (4KB), can be set with expiry."],
  ["Web Development", "What is the `window` object?", "window-object", "Explain `window`.", "`window` is the global object in browsers, representing the browser window. It provides properties and methods: `document`, `alert`, `setTimeout`, `innerHeight`, etc."],
  ["Web Development", "What is the difference between `innerHTML` and `textContent`?", "innerhtml-vs-textcontent", "Compare properties.", "`innerHTML` sets/get HTML content (parses tags). `textContent` sets/get plain text (ignores HTML). Use `textContent` for safety to avoid XSS."],
  ["Web Development", "What is `event.preventDefault()`?", "prevent-default", "Explain preventing default.", "`preventDefault()` stops the default action of an event (e.g., form submission, link navigation). It does not stop event propagation."],
  ["Web Development", "What is `event.stopPropagation()`?", "stop-propagation", "Explain stopping propagation.", "`stopPropagation()` prevents the event from bubbling up the DOM tree, so ancestors do not receive the event."],
  ["Web Development", "What are Web Workers?", "web-workers", "Explain Web Workers.", "Web Workers run JavaScript in the background on a separate thread. They are used for heavy computations without blocking the UI. They have no DOM access."],
  ["Web Development", "What is the `map()` method in JavaScript?", "map-method", "Explain `Array.map()`.", "`map()` creates a new array by applying a function to each element of the original array. It does not mutate the original."],
  ["Web Development", "What is the difference between `forEach` and `map`?", "foreach-vs-map", "Compare array methods.", "`forEach` iterates and performs an action but does not return a new array. `map` returns a new array. Use `map` when you need to transform."],
  ["Web Development", "What is the `filter()` method?", "filter-method", "Explain `filter`.", "`filter()` creates a new array with elements that pass a test condition. Example: `arr.filter(x => x > 10)`."],
  ["Web Development", "What is the `reduce()` method?", "reduce-method", "Explain `reduce`.", "`reduce()` applies a function against an accumulator and each element to reduce to a single value. Example: `arr.reduce((sum, x) => sum + x, 0)`."],
  ["Web Development", "What is `Object.keys()` and `Object.entries()`?", "object-keys-entries", "Explain object methods.", "`Object.keys(obj)` returns an array of enumerable property keys. `Object.entries(obj)` returns an array of `[key, value]` pairs."],
  ["Web Development", "What is the `new` keyword?", "new-keyword", "Explain `new`.", "`new` creates an instance of a user-defined object type or built-in object. It sets `this` to the new object, and the constructor runs."],
  ["Web Development", "What is a module in JavaScript?", "js-modules", "Explain modules.", "Modules allow splitting code into separate files. Use `export` and `import` (ES modules). They are scoped and support tree-shaking."],
  ["Web Development", "What is the `console` object and its methods?", "console-object", "Explain `console`.", "`console` provides methods for logging: `log`, `error`, `warn`, `info`, `table`, `group`, `time`, `count`. Used for debugging."],

  // ==================== DOM & EVENTS (15) ====================
  ["Web Development", "What is the DOM tree?", "dom-tree", "Explain DOM tree.", "The DOM tree is a hierarchical representation of the document, with nodes (elements, attributes, text). The root is `document`."],
  ["Web Development", "How do you select elements in the DOM?", "dom-selectors", "List selection methods.", "`document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()`, `document.getElementsByClassName()`, `document.getElementsByTagName()`."],
  ["Web Development", "What is the difference between `querySelector` and `querySelectorAll`?", "querySelector-vs-all", "Compare methods.", "`querySelector` returns the first matching element; `querySelectorAll` returns a static NodeList of all matching elements."],
  ["Web Development", "How do you create and append a new element?", "dom-creation", "Explain element creation.", "Use `document.createElement('div')` to create, then `parent.appendChild(newElement)` to append. Also `parent.insertBefore`, `parent.append`."],
  ["Web Development", "What is event bubbling and event capturing?", "event-bubbling-capturing", "Explain event phases.", "Event propagation has three phases: capturing (top-down), target, and bubbling (bottom-up). Bubbling is the default."],
  ["Web Development", "What is event delegation?", "event-delegation", "Explain event delegation.", "Event delegation is attaching an event listener to a parent element to handle events on its children. It leverages bubbling and improves performance."],
  ["Web Development", "How do you add an event listener?", "addEventListener", "Explain `addEventListener`.", "`element.addEventListener('click', handler, options)`. Options include `capture`, `once`, `passive`."],
  ["Web Development", "What is the difference between `onclick` and `addEventListener`?", "onclick-vs-addeventlistener", "Compare event attachment.", "`onclick` is a property that can only have one handler; `addEventListener` allows multiple handlers and more control."],
  ["Web Development", "What is the `target` property in an event object?", "event-target", "Explain event target.", "`event.target` is the element that triggered the event. `event.currentTarget` is the element the listener is attached to."],
  ["Web Development", "What is `mousedown` vs `click`?", "mousedown-vs-click", "Compare events.", "`mousedown` fires when button is pressed; `click` fires on a full press-and-release. `click` is used for most interactions."],
  ["Web Development", "What is `DOMContentLoaded` event?", "domcontentloaded", "Explain DOMContentLoaded.", "This event fires when the initial HTML is fully parsed and the DOM is ready, without waiting for stylesheets, images, etc."],
  ["Web Development", "What is the `load` event?", "load-event", "Explain load.", "The `load` event fires when the entire page (all resources) is fully loaded. It is slower than `DOMContentLoaded`."],
  ["Web Development", "What is `Intersection Observer`?", "intersection-observer", "Explain Intersection Observer.", "A browser API that asynchronously observes changes in the intersection of a target element with an ancestor or the viewport. Used for lazy loading, infinite scroll."],
  ["Web Development", "What is `MutationObserver`?", "mutation-observer", "Explain MutationObserver.", "A browser API that observes changes to the DOM (added/removed nodes, attributes). Used for reacting to dynamic content."],
  ["Web Development", "What is the `resize` event?", "resize-event", "Explain resize.", "The `resize` event fires when the window or element size changes. Often used with throttling for performance."],

  // ==================== PERFORMANCE (10) ====================
  ["Web Development", "How do you optimize website performance?", "web-performance", "Explain optimization techniques.", "Minify CSS/JS, use compression (gzip), optimize images, lazy load, use CDN, reduce HTTP requests, enable caching, use critical CSS, and defer non-critical JS."],
  ["Web Development", "What is the Critical Rendering Path?", "critical-rendering-path", "Explain CRP.", "The CRP is the sequence of steps the browser takes to render a page: DOM, CSSOM, render tree, layout, paint. Optimize by reducing blocking resources."],
  ["Web Development", "What is Lighthouse?", "lighthouse", "Explain Lighthouse.", "Lighthouse is an open-source tool by Google for auditing web app performance, accessibility, SEO, and best practices. It provides scores and actionable recommendations."],
  ["Web Development", "What is Core Web Vitals?", "core-web-vitals", "Explain Core Web Vitals.", "A set of metrics: LCP (largest contentful paint), FID (first input delay), CLS (cumulative layout shift). They measure loading, interactivity, and visual stability."],
  ["Web Development", "What is LCP and how to improve it?", "lcp", "Explain LCP.", "LCP measures loading of the largest visible element. Improve by optimizing images, using a CDN, and reducing server response times."],
  ["Web Development", "What is CLS and how to prevent it?", "cls", "Explain CLS.", "CLS measures unexpected layout shifts. Prevent by setting size attributes on images, reserving space for ads, and avoiding dynamically injected content."],
  ["Web Development", "What is FID and how to improve it?", "fid", "Explain FID.", "FID measures first interaction delay. Improve by reducing main-thread work, using a web worker, and optimizing JavaScript."],
  ["Web Development", "What is tree shaking?", "tree-shaking", "Explain tree shaking.", "Tree shaking is a dead code elimination technique used with ES modules to remove unused exports, reducing bundle size."],
  ["Web Development", "What is code splitting?", "code-splitting", "Explain code splitting.", "Code splitting breaks the bundle into smaller chunks, loaded on demand. Reduces initial load time."],
  ["Web Development", "What is lazy loading?", "lazy-loading", "Explain lazy loading.", "Lazy loading defers loading of resources (images, scripts) until they are needed (e.g., near the viewport), reducing initial page weight."],

  // ==================== ACCESSIBILITY (10) ====================
  ["Web Development", "What is web accessibility and why is it important?", "accessibility-overview", "Explain accessibility.", "Accessibility (a11y) ensures websites are usable by people with disabilities (visual, motor, cognitive). It is legally required in many countries and improves UX for all."],
  ["Web Development", "What are ARIA attributes?", "aria-attributes", "Explain ARIA.", "ARIA (Accessible Rich Internet Applications) provides attributes to enhance accessibility when native HTML is insufficient. Examples: `role`, `aria-label`, `aria-expanded`."],
  ["Web Development", "What is the `alt` attribute for images?", "alt-accessibility", "Explain alt for accessibility.", "`alt` provides a text alternative for screen readers. It must describe the image content or be empty (`alt=\"\"`) for decorative images."],
  ["Web Development", "What is semantic HTML and why is it important for accessibility?", "semantic-html", "Explain semantic HTML.", "Semantic HTML uses elements that convey meaning (e.g., `<button>` instead of `<div role=\"button\">`). It improves screen reader navigation and SEO."],
  ["Web Development", "How do you make a page keyboard navigable?", "keyboard-accessibility", "Explain keyboard navigation.", "Ensure all interactive elements are reachable via Tab and focusable. Use `tabindex` carefully. Provide focus indicators (outline) and handle Enter/Space for custom controls."],
  ["Web Development", "What is color contrast and why is it important?", "color-contrast", "Explain contrast.", "Sufficient contrast between text and background ensures readability for users with low vision. WCAG requires a contrast ratio of at least 4.5:1."],
  ["Web Development", "What are landmarks in HTML?", "landmarks", "Explain landmarks.", "Landmarks (e.g., `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) define page sections, helping screen readers navigate quickly."],
  ["Web Development", "What is the `aria-live` attribute?", "aria-live", "Explain `aria-live`.", "`aria-live` indicates that content will change dynamically (e.g., notifications). It makes screen readers announce updates. Values: `off`, `polite`, `assertive`."],
  ["Web Development", "What is the `role` attribute?", "role", "Explain `role`.", "`role` defines the semantic meaning of an element (e.g., `role=\"button\"`). Use it sparingly when native HTML is not suitable."],
  ["Web Development", "What is the focus order and how to control it?", "focus-order", "Explain focus order.", "Focus order is the sequence in which elements gain focus. It should follow DOM order. Use `tabindex` to modify, but avoid positive values."],

  // ==================== SECURITY (10) ====================
  ["Web Development", "What is XSS and how do you prevent it?", "xss-prevention", "Explain XSS.", "Cross-Site Scripting injects malicious scripts. Prevent by escaping user input, using `textContent` instead of `innerHTML`, and applying Content Security Policy (CSP)."],
  ["Web Development", "What is CSRF and how do you prevent it?", "csrf-prevention", "Explain CSRF.", "Cross-Site Request Forgery tricks the user into making unintended requests. Prevent using anti-CSRF tokens, SameSite cookies, and validating referer."],
  ["Web Development", "What is SQL injection?", "sql-injection", "Explain SQL injection.", "SQL injection occurs when user input is improperly sanitized in SQL queries. Prevent by using parameterized queries and ORMs."],
  ["Web Development", "What is the Content Security Policy (CSP)?", "csp", "Explain CSP.", "CSP is a security header that restricts resources (scripts, styles) that can be loaded. It mitigates XSS and data injection."],
  ["Web Development", "What are secure HTTP headers?", "security-headers", "List security headers.", "`X-Frame-Options` (clickjacking), `X-Content-Type-Options` (MIME sniffing), `Strict-Transport-Security` (HSTS), `X-XSS-Protection` (deprecated)."],
  ["Web Development", "What is HTTPS and why is it mandatory?", "https-security", "Explain HTTPS.", "HTTPS encrypts data in transit, preventing eavesdropping, tampering, and man-in-the-middle. It is required for modern web (SEO, trust)."],
  ["Web Development", "What is CORS and how does it work?", "cors", "Explain CORS.", "CORS (Cross-Origin Resource Sharing) is a security mechanism that restricts cross-origin requests. The server sends `Access-Control-Allow-Origin` headers."],
  ["Web Development", "What is the `SameSite` cookie attribute?", "samesite", "Explain SameSite.", "`SameSite` prevents cross-site request forgery by controlling when cookies are sent. Values: `Strict`, `Lax`, `None`. `SameSite=Lax` is default in modern browsers."],
  ["Web Development", "What is clickjacking and how to prevent it?", "clickjacking", "Explain clickjacking.", "Clickjacking hides a legitimate button under an invisible overlay. Prevent with `X-Frame-Options: DENY` or `frame-ancestors` CSP directive."],
  ["Web Development", "How do you handle password storage securely?", "password-storage", "Explain password storage.", "Never store plaintext passwords. Use strong hashing (bcrypt, Argon2) with salt. Use HTTPS to protect passwords in transit."],

  // ==================== HTTP & NETWORK (10) ====================
  ["Web Development", "What are the common HTTP status codes?", "http-status-codes", "List status codes.", "1xx: informational, 2xx: success (200 OK, 201 Created), 3xx: redirection (301 Moved, 304 Not Modified), 4xx: client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx: server error (500 Internal Server Error, 502 Bad Gateway)."],
  ["Web Development", "What is the difference between GET and POST?", "get-vs-post", "Compare methods.", "GET retrieves data, is idempotent, and parameters are in the URL (limited size). POST sends data, is non-idempotent, and data is in the body. GET should not be used for sensitive data."],
  ["Web Development", "What are HTTP headers?", "http-headers", "Explain headers.", "Headers provide additional information in requests and responses. Common: `Content-Type`, `Authorization`, `Cache-Control`, `User-Agent`, `Accept`."],
  ["Web Development", "What is caching in HTTP and how does it work?", "http-caching", "Explain caching.", "Caching stores responses to reduce requests. Controlled by `Cache-Control`, `Expires`, `ETag`, `Last-Modified` headers. Browser caching and CDN caching are common."],
  ["Web Development", "What is the `Cache-Control` header?", "cache-control", "Explain Cache-Control.", "`Cache-Control` directives: `public`, `private`, `no-cache`, `no-store`, `max-age`, `must-revalidate`. It controls caching behavior."],
  ["Web Development", "What is a cookie and how is it used?", "cookie", "Explain cookies.", "Cookies are small pieces of data sent from the server and stored in the browser. They are used for session management, tracking, and preferences."],
  ["Web Development", "What is a session?", "session", "Explain session.", "A session is a server-side store of user data, identified by a session ID stored in a cookie. It persists across requests."],
  ["Web Development", "What is the difference between HTTP/1.1 and HTTP/2?", "http1-vs-http2", "Compare HTTP versions.", "HTTP/2 introduces multiplexing (multiple requests over one connection), header compression, server push, and binary framing. It improves performance."],
  ["Web Development", "What is WebSocket?", "websocket", "Explain WebSocket.", "WebSocket is a full-duplex communication protocol over a single TCP connection. It enables real-time, bidirectional communication (e.g., chat, gaming)."],
  ["Web Development", "What is the difference between WebSocket and HTTP?", "websocket-vs-http", "Compare protocols.", "HTTP is request-response, stateless, and one-way. WebSocket is persistent, bidirectional, and stateful. Use WebSocket for real-time, HTTP for traditional APIs."],

  // ==================== FRAMEWORKS & TOOLS (10) ====================
  ["Web Development", "What is React?", "react-overview", "Explain React.", "React is a JavaScript library for building UI components. It uses a virtual DOM and JSX, and is component-based. It is maintained by Facebook."],
  ["Web Development", "What is Angular?", "angular", "Explain Angular.", "Angular is a TypeScript-based web application framework by Google. It provides a full-featured MVC architecture, dependency injection, routing, and forms."],
  ["Web Development", "What is Vue.js?", "vuejs", "Explain Vue.js.", "Vue.js is a progressive JavaScript framework for building UIs. It is lightweight, easy to learn, and offers reactive data binding and component-based architecture."],
  ["Web Development", "What is Node.js?", "nodejs", "Explain Node.js.", "Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing JavaScript to run on the server. It is event-driven and non-blocking, ideal for I/O-heavy applications."],
  ["Web Development", "What is Express.js?", "expressjs", "Explain Express.js.", "Express.js is a minimal and flexible Node.js web framework for building REST APIs and web applications. It provides routing, middleware, and HTTP utilities."],
  ["Web Development", "What is a build tool and why use one?", "build-tools", "Explain build tools.", "Build tools (Webpack, Vite, Parcel) bundle assets, transpile code, and optimize for production. They handle modules, minification, and hot reloading."],
  ["Web Development", "What is a package manager?", "package-manager", "Explain package managers.", "Package managers (npm, yarn, pnpm) manage dependencies, install packages, and handle versioning. They simplify third-party library integration."],
  ["Web Development", "What is TypeScript and why is it used?", "typescript-web", "Explain TypeScript.", "TypeScript is a superset of JavaScript that adds static typing. It improves code quality, tooling, and catch errors early."],
  ["Web Development", "What is GraphQL and how does it differ from REST?", "graphql-vs-rest", "Compare GraphQL and REST.", "GraphQL allows clients to request exactly the data they need in a single query. REST uses multiple endpoints. GraphQL reduces over-fetching and under-fetching."],
  ["Web Development", "What is a CDN and why is it used?", "cdn-web", "Explain CDN.", "CDN (Content Delivery Network) is a distributed network of servers that deliver static content (images, CSS, JS) to users from the nearest server, reducing latency."],

  // ==================== DEPLOYMENT & ENVIRONMENTS (10) ====================
  ["Web Development", "What is the difference between development and production environments?", "dev-vs-prod", "Compare environments.", "Development: debugging, hot reloading, un-minified code, dev tools. Production: optimized, minified, compressed, no debugging, performance-focused."],
  ["Web Development", "What is a staging environment?", "staging", "Explain staging.", "Staging is a pre-production environment that mirrors production. It is used for final testing before deployment."],
  ["Web Development", "What is a hosting service?", "hosting", "Explain hosting.", "Hosting is a service that makes websites accessible on the internet. Types: shared, VPS, dedicated, cloud (AWS, GCP, Azure), and serverless."],
  ["Web Development", "What is domain registration?", "domain", "Explain domain registration.", "Domain registration is the process of reserving a domain name (e.g., example.com) through a registrar. It must be renewed periodically."],
  ["Web Development", "What is a CI/CD pipeline?", "ci-cd", "Explain CI/CD.", "CI/CD (Continuous Integration/Continuous Deployment) automates building, testing, and deploying code. It ensures faster and more reliable releases."],
  ["Web Development", "What is containerization (Docker) in web development?", "docker", "Explain Docker.", "Docker packages applications and dependencies into containers, ensuring consistency across environments. It simplifies deployment and scaling."],
  ["Web Development", "What is serverless architecture?", "serverless", "Explain serverless.", "Serverless (e.g., AWS Lambda) runs code without managing servers. It scales automatically and charges per execution. Great for APIs and event-driven workloads."],
  ["Web Development", "What is a reverse proxy and when to use it?", "reverse-proxy-web", "Explain reverse proxy.", "A reverse proxy (e.g., Nginx) forwards client requests to backend servers. It provides load balancing, SSL termination, caching, and security."],
  ["Web Development", "What is a static site generator?", "ssg-web", "Explain SSG.", "Static site generators (e.g., Gatsby, Hugo) generate HTML pages at build time from templates and content. They are fast and secure."],
  ["Web Development", "What is a headless CMS?", "headless-cms", "Explain headless CMS.", "A headless CMS provides content via API, decoupling the backend from the frontend. It allows flexible delivery to web, mobile, and other channels."],

  // ==================== SCENARIO-BASED (30) ====================
  ["Web Development", "How would you optimize a slow-loading webpage?", "optimize-slow-page", "Explain optimization steps.", "Audit with Lighthouse. Minify CSS/JS, compress images, enable caching, use a CDN, defer scripts, lazy load below-fold content, and reduce redirects."],
  ["Web Development", "How would you make a website accessible?", "make-accessible", "Explain accessibility implementation.", "Use semantic HTML, add `alt` text, ensure keyboard navigation, maintain color contrast, use ARIA when needed, and test with screen readers."],
  ["Web Development", "How would you implement a responsive navigation bar?", "responsive-nav", "Explain responsive navbar.", "Use flexbox or grid for layout. Use a hamburger icon for mobile with a media query to show/hide the menu. Toggle with JavaScript."],
  ["Web Development", "How would you build a real-time chat application?", "real-time-chat", "Explain chat implementation.", "Use WebSockets (Socket.io). Manage user connections, broadcast messages, and store message history in a database. Implement authentication."],
  ["Web Development", "How would you implement infinite scroll?", "infinite-scroll", "Explain infinite scroll.", "Use Intersection Observer to detect when the user scrolls to the bottom. Fetch and append more data. Use a loading indicator."],
  ["Web Development", "How would you implement a search autocomplete feature?", "autocomplete", "Explain autocomplete.", "Use debouncing on input events. Fetch suggestions from an API or local data. Display a dropdown list with highlighted matches."],
  ["Web Development", "How would you handle file uploads in a web application?", "file-upload", "Explain file upload handling.", "Use `<input type=\"file\">`. Send to server via `FormData` and AJAX. Validate file type/size. Provide progress feedback and error handling."],
  ["Web Development", "How would you implement a dark mode toggle?", "dark-mode-toggle", "Explain dark mode.", "Use CSS custom properties. Store user preference in `localStorage`. Toggle a class on the `<body>` and update styles. Respect system preference with `prefers-color-scheme`."],
  ["Web Development", "How would you build a multi-step form?", "multi-step-form", "Explain multi-step form.", "Use state to track current step. Each step is a component. Store form data in state and validate before advancing. Submit all at the final step."],
  ["Web Development", "How would you implement pagination on a product listing page?", "pagination", "Explain pagination.", "Use query parameters (`?page=2`). Fetch data from server with offset/limit. Render page numbers and navigation buttons."],
  ["Web Development", "How would you handle client-side caching for API responses?", "client-caching", "Explain client caching.", "Use `localStorage` or `sessionStorage` with expiry timestamps. Alternatively, use Service Workers for more control. Implement cache invalidation."],
  ["Web Development", "How would you implement a countdown timer?", "countdown-timer", "Explain countdown.", "Use `setInterval` to update the display. Calculate remaining time from a target date. Clear interval when timer ends."],
  ["Web Development", "How would you integrate a third-party payment gateway?", "payment-gateway", "Explain payment integration.", "Use the gateway's API (Stripe, PayPal). Create a checkout session, redirect user, handle webhooks for success/failure."],
  ["Web Development", "How would you implement OAuth2 login (e.g., Google)?", "oauth2", "Explain OAuth2 implementation.", "Redirect to the provider's authorization URL, receive an authorization code, exchange for access token, and fetch user info."],
  ["Web Development", "How would you handle session persistence across browser tabs?", "session-persistence", "Explain session sharing.", "Use `localStorage` or `sessionStorage` with a shared key. Use BroadcastChannel API for cross-tab communication."],
  ["Web Development", "How would you prevent a form from being submitted twice?", "prevent-double-submit", "Explain prevention.", "Disable the submit button after click. Use a flag or a debounce. Also, use idempotency tokens on the server."],
  ["Web Development", "How would you implement a modal window?", "modal", "Explain modal implementation.", "Use a backdrop, position fixed, centered content. Control visibility with state. Trap focus inside modal. Close on Escape key and backdrop click."],
  ["Web Development", "How would you implement a drag-and-drop feature?", "drag-and-drop", "Explain drag-and-drop.", "Use HTML5 Drag and Drop API or a library (react-dnd). Handle `dragstart`, `dragover`, `drop` events. Update state on drop."],
  ["Web Development", "How would you build a SPA with routing?", "spa-routing", "Explain SPA routing.", "Use the History API (`pushState`, `popstate`) or a routing library (React Router). Map URLs to components."],
  ["Web Development", "How would you handle errors in a web application?", "error-handling-web", "Explain error handling.", "Use try/catch for async operations. Show user-friendly error messages. Log errors to a monitoring service. Use global error handlers (`window.onerror`)."],
  ["Web Development", "How would you improve the SEO of a web app?", "seo", "Explain SEO improvements.", "Use semantic HTML, proper heading hierarchy, meta descriptions, Open Graph tags, sitemap, and SSR/SSG for dynamic content."],
  ["Web Development", "How would you implement Web Analytics?", "analytics", "Explain analytics.", "Use a script (Google Analytics, Mixpanel). Track page views, events, and user interactions. Use a privacy-compliant approach."],
  ["Web Development", "How would you set up a development environment for a team?", "dev-env-setup", "Explain dev environment.", "Use a version control system (Git). Use package managers. Use Docker for consistency. Use ESLint and Prettier for code quality."],
  ["Web Development", "How would you test a web application?", "testing-web", "Explain testing approaches.", "Use unit tests (Jest), integration tests, and end-to-end tests (Cypress, Playwright). Test across browsers and devices."],
  ["Web Development", "How would you handle internationalization (i18n)?", "i18n-web", "Explain i18n.", "Use libraries like i18next. Store translations in JSON files. Detect user locale. Use placeholders for dynamic content."],
  ["Web Development", "How would you secure a REST API?", "secure-api", "Explain API security.", "Use HTTPS, JWT authentication, rate limiting, input validation, CORS restrictions, and environment variables for secrets."],
  ["Web Development", "How would you implement a push notification system?", "push-notifications", "Explain push notifications.", "Use Service Workers and Push API. Register a service worker, subscribe to push notifications, send payloads from the server."],
  ["Web Development", "How would you handle offline support?", "offline-support", "Explain offline functionality.", "Use Service Workers to cache assets (App Shell). Cache API responses. Use `CacheStorage` and `IndexedDB` for data persistence."],
  ["Web Development", "How would you design a dashboard with real-time data?", "dashboard-real-time", "Explain real-time dashboard.", "Use WebSockets or Server-Sent Events for real-time updates. Use a charting library (Chart.js, D3). Polling as a fallback."],
  ["Web Development", "How would you migrate a legacy web app to modern technologies?", "migration", "Explain migration strategy.", "Incrementally rewrite modules. Use a reverse proxy to route old/new. Use feature flags. Gradually replace and test. Maintain backward compatibility."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain web development concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing web development concepts without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "web-development" },
    update: { name: "Web Development", group: "Technology", description: "Web Development interview questions." },
    create: { name: "Web Development", slug: "web-development", group: "Technology", description: "Web Development interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "web-development" } },
    update: {},
    create: { name: "Web Development", slug: "web-development", categoryId: category.id },
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
        tags: ["Web Development"],
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
        tags: ["Web Development"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Web Development questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");