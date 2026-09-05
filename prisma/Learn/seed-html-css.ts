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

async function seedHtmlCssCategory() {
  const category: CategorySeed = {
    name: "HTML & CSS",
    slug: "html-css",
    description: "Master the foundational technologies of the web: HTML for structure and CSS for styling and layout.",
    icon: "HTML",
    sortOrder: 18,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn HTML structure, semantic elements, and CSS basics including selectors, the box model, and fundamental layout.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "HTML Foundations",
            slug: "html-foundations",
            description: "Create structured web pages with HTML.",
            topics: [
              {
                title: "HTML Document Structure – The Skeleton of the Web",
                slug: "html-structure",
                shortDescription: "DOCTYPE, html, head, body, and basic tags.",
                estimatedMinutes: 24,
                sections: [
                  { title: "DOCTYPE and Basic Document Structure", content: "Every HTML document must start with `<!DOCTYPE html>` to tell browsers to use standards mode. The `<html>` tag wraps the entire page. The `<head>` contains machine‑readable information (charset, title, viewport, meta tags, links to stylesheets, and scripts). The `<body>` holds the visible content." },
                  { title: "Essential Tags – The Building Blocks", content: "**Headings**: `<h1>` to `<h6>` – define hierarchy. **Paragraphs**: `<p>`. **Links**: `<a href>` – hyperlinks. **Images**: `<img src alt>` – self‑closing. **Lists**: `<ul>` (unordered), `<ol>` (ordered), `<li>` (items). **Divisions and Spans**: `<div>` (block) and `<span>` (inline) – used as styling hooks." },
                  { title: "Attributes – Adding Context", content: "Attributes give elements extra meaning. Common ones: `id` (unique identifier), `class` (multiple styling hooks), `style` (inline CSS), `title` (tooltip), `data-*` (custom data), `aria-*` (accessibility). Always use them thoughtfully." },
                  { title: "Meta Tags and SEO Basics", content: "`<meta charset=\"UTF-8\">` for character encoding. `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` for responsive design. `<meta name=\"description\" content=\"...\">` for SEO. `<meta property=\"og:title\" content=\"...\">` for social sharing. These help search engines and social platforms understand your page." },
                ],
              },
              {
                title: "Semantic HTML – Meaningful Structure",
                slug: "semantic-html",
                shortDescription: "Use semantic tags for better accessibility and SEO.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Why Semantics Matter", content: "Semantic HTML uses tags that convey meaning – they tell browsers, screen readers, and search engines what content is and how it relates. This improves accessibility (screen readers can navigate), SEO (search engines understand content), and maintainability (code is self‑documenting)." },
                  { title: "Common Semantic Tags", content: "`<header>` – introductory content or navigation. `<nav>` – navigation links. `<main>` – the main content (only once per page). `<article>` – self‑contained composition. `<section>` – thematic grouping. `<aside>` – tangential content. `<footer>` – footer. `<figure>` and `<figcaption>` – illustrations with captions. `<time>` – machine‑readable dates. `<mark>` – highlighted text." },
                  { title: "Non‑semantic vs Semantic", content: "Use `<div>` and `<span>` only for styling hooks; use semantic tags for structure and meaning. For example, a blog post should be an `<article>`, not a `<div>` with a class `post`." },
                  { title: "Landmark Roles and Accessibility", content: "Even with semantic HTML, you can add ARIA roles to reinforce meaning: `role=\"banner\"`, `role=\"navigation\"`, `role=\"main\"`, `role=\"complementary\"`, `role=\"contentinfo\"`. This helps screen readers navigate quickly." },
                ],
              },
              {
                title: "Forms and Inputs – User Interaction",
                slug: "html-forms",
                shortDescription: "Build interactive forms with various input types.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Form Structure", content: "`<form>` with `action` (where to send) and `method` (GET/POST). Include `<fieldset>` for grouping related controls and `<legend>` for a caption. This improves both visual grouping and accessibility." },
                  { title: "Input Types", content: "text, password, email, number, date, checkbox, radio, file, submit, reset, button. Also `tel`, `url`, `search`, `color`, `range`. Use `name` for form data and `id` for labels. Different types provide different mobile keyboards and validation." },
                  { title: "Labels and Accessibility", content: "Always associate a label with an input using `<label for=\"inputId\">`. This makes the label clickable and helps screen readers. If a label is not feasible, use `aria-label` or `aria-labelledby`." },
                  { title: "HTML5 Validation", content: "Use built‑in validation: `required` (field must be filled), `pattern` (regex), `min`/`max` (numbers), `minlength`/`maxlength`, and `type` (email, url, etc.). This provides instant feedback without JavaScript." },
                ],
              },
            ],
          },
          {
            title: "CSS Basics – Styling the Web",
            slug: "css-basics",
            description: "Style web pages with selectors, colors, typography, and the box model.",
            topics: [
              {
                title: "CSS Syntax and Selectors – Targeting Elements",
                slug: "css-selectors",
                shortDescription: "Basic selectors, combinators, and specificity.",
                estimatedMinutes: 26,
                sections: [
                  { title: "CSS Syntax and Inclusion", content: "Syntax: `selector { property: value; }`. Include styles via external `<link rel=\"stylesheet\" href=\"style.css\">`, internal `<style>` in `<head>`, or inline `style` attribute. External is best for maintainability." },
                  { title: "Selectors", content: "**Element** (`p`), **Class** (`.class`), **ID** (`#id`), **Attribute** (`[type=\"text\"]`), **Pseudo‑classes** (`:hover`, `:nth-child`, `:focus`), **Pseudo‑elements** (`::before`, `::after`, `::first‑line`). Pseudo‑elements create virtual elements." },
                  { title: "Combinators", content: "**Descendant** (space) – any descendant. **Child** (`>`) – direct child. **Adjacent sibling** (`+`) – next sibling. **General sibling** (`~`) – all following siblings. Combine selectors to be precise." },
                  { title: "Specificity – The Tie‑Breaker", content: "When multiple rules apply, specificity decides: inline styles (1000), ID (100), class/attribute/pseudo‑class (10), element/pseudo‑element (1). Calculate and compare. When tied, source order wins. Use `!important` sparingly – it overrides everything, but makes debugging harder." },
                  { title: "The Cascade – How Rules Compose", content: "Cascade order: user agent styles → author styles (your styles) → user styles (browser custom) → `!important` reverse order. Also, inheritance: some properties (like `color`, `font`) are inherited from parent to child." },
                ],
              },
              {
                title: "The Box Model – Everything Is a Box",
                slug: "box-model",
                shortDescription: "Content, padding, border, margin, and box‑sizing.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Box Model Components", content: "Every element is a box: **Content** (text/images), **Padding** (space inside), **Border** (line around padding), **Margin** (space outside). These four layers affect spacing and sizing." },
                  { title: "Box‑Sizing – The Game‑Changer", content: "`box-sizing: content-box` (default) – width/height only content. `box-sizing: border-box` – width/height includes padding and border. This makes sizing predictable and is recommended for all elements (`* { box-sizing: border-box; }`)." },
                  { title: "Margin Collapse", content: "Vertical margins of adjacent block elements collapse – the larger margin wins. This is intentional and prevents double spacing. Inline elements and floats do not collapse. Padding and borders never collapse." },
                  { title: "Visualising the Box Model", content: "Use browser DevTools to inspect elements and see the box model. Adjust padding, border, margin to control spacing." },
                ],
              },
              {
                title: "Colors and Typography – The Visual Layer",
                slug: "colors-typography",
                shortDescription: "CSS colors, fonts, text styling, and web fonts.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Colors – RGB, HSL, and More", content: "Use **named colors** (`red`), **hexadecimal** (`#ff0000`), **RGB** (`rgb(255,0,0)`), **RGBA** (`rgba(255,0,0,0.5)`) for opacity, **HSL** (`hsl(0,100%,50%)`), and **HSLA**. HSL is intuitive – hue (0‑360), saturation, lightness. Use a consistent color system (e.g., a palette)." },
                  { title: "Typography – Fonts and Text", content: "`font-family` – list fallbacks (e.g., `'Helvetica Neue', Arial, sans-serif`). `font-size` – use `rem` for relative sizing (root em), `em` for contextual, `px` for fixed. `font-weight` – 100‑900. `line-height` – 1.5 for readability. `letter-spacing` for spacing. `text-align`, `text-decoration`, `text‑transform`." },
                  { title: "Web Fonts – Custom Typography", content: "Use Google Fonts with `<link>` or `@import`. Example: `@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');`. Then use `font-family: 'Open Sans', sans-serif;`. Also use `font-display: swap;` to avoid invisible text during load." },
                ],
              },
              {
                title: "Display and Positioning – Layout Control",
                slug: "display-position",
                shortDescription: "Block, inline, inline‑block, and positioning schemes.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Display Property", content: "`block` – full width, new line. `inline` – no width, no new line. `inline‑block` – inline but with block properties. `none` – removes element (space collapses). `flex` and `grid` – modern layout (see later)." },
                  { title: "Positioning – Place Elements Precisely", content: "`static` – default. `relative` – shifted relative to normal position (keeps space). `absolute` – removed from flow, positioned relative to nearest positioned ancestor. `fixed` – relative to viewport. `sticky` – hybrid, becomes fixed when scrolling past." },
                  { title: "Z‑Index – Stacking Order", content: "Controls the stack order of positioned elements. Higher `z-index` appears on top. Only works on positioned elements (relative, absolute, fixed, sticky). Creates a new stacking context." },
                ],
              },
              {
                title: "Flexbox – One‑Dimensional Layout",
                slug: "flexbox-basics",
                shortDescription: "Introduction to flexible box layout.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Flex Container – The Parent", content: "`display: flex` turns a container into a flex container. **Main axis** is the primary direction (row by default), **cross axis** is perpendicular." },
                  { title: "Flex Items Properties", content: "`flex-grow` – how much extra space an item takes (proportion). `flex-shrink` – how it shrinks. `flex-basis` – initial size. `flex` shorthand (e.g., `flex: 1` = `1 1 0%`). `align-self` – override cross‑axis alignment per item." },
                  { title: "Alignment and Justification", content: "`justify-content` – align along main axis (flex‑start, flex‑end, center, space‑between, space‑around, space‑evenly). `align-items` – along cross axis (stretch, flex‑start, flex‑end, center, baseline). `align-content` – multi‑line cross‑axis alignment." },
                  { title: "Flex Wrap – Multi‑Line Flex", content: "`flex-wrap: wrap` allows items to flow onto multiple lines. Combined with `align-content` for spacing between lines." },
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
        description: "Deep dive into CSS Grid, responsive design, animations, and advanced selectors.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Layout",
            slug: "advanced-layout",
            description: "CSS Grid, responsive design, and modern layout patterns.",
            topics: [
              {
                title: "CSS Grid – Two‑Dimensional Layout",
                slug: "css-grid",
                shortDescription: "Two‑dimensional layout with rows and columns.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Grid Container – Defining the Grid", content: "`display: grid` creates a grid. `grid-template-columns` and `grid-template-rows` define columns and rows using values like `1fr` (fraction), `200px`, `auto`, `minmax(100px, 1fr)`. Use `gap` (or `row‑gap`, `column‑gap`) for spacing." },
                  { title: "Grid Items – Placement", content: "Place items explicitly with `grid-row` and `grid-column` (start/end). Example: `grid-column: 1 / 3` spans from column line 1 to 3. Or use `grid-area` with named areas." },
                  { title: "Named Grid Lines and Areas", content: "Name grid lines with brackets: `grid-template-columns: [main‑start] 1fr [main‑end]`. Or name areas with `grid-template-areas: \"header header\" \"sidebar main\"`. Then assign items with `grid-area: header`." },
                  { title: "Auto‑placement and Implicit Grid", content: "Items not explicitly placed are automatically placed into the grid. `grid-auto-rows` and `grid-auto-columns` define the size of implicitly created tracks. Use `auto‑fill` and `auto‑fit` with `repeat()` for responsive columns (e.g., `repeat(auto‑fill, minmax(200px, 1fr))`)." },
                  { title: "Grid vs Flexbox – When to Use", content: "Grid is for page‑level layout (rows and columns). Flexbox is for components (one‑dimensional alignment). Use both together – Grid for overall structure, Flexbox for inner alignment." },
                ],
              },
              {
                title: "Responsive Web Design – Adapting to All Screens",
                slug: "responsive-design",
                shortDescription: "Media queries, fluid layouts, and responsive images.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Media Queries – The Cornerstone", content: "`@media (max-width: 768px) { ... }` applies styles when the viewport is <= 768px. Also `min-width`, `orientation` (portrait/landscape), `resolution` (DPI), `prefers‑color‑scheme` (dark/light)." },
                  { title: "Mobile‑First vs Desktop‑First", content: "**Mobile‑First**: start with styles for small screens, then add `min-width` breakpoints to enhance for larger. This is generally recommended as it forces performance and simplicity. **Desktop‑First**: start with large, then `max-width` breakpoints." },
                  { title: "Fluid Layouts – Elastic and Flexible", content: "Use `%` for widths, `vw`/`vh` for viewport‑relative sizing, `calc()` for calculations. `clamp(min, preferred, max)` is perfect for responsive typography and sizing (e.g., `font-size: clamp(1rem, 2vw, 2rem)`)." },
                  { title: "Responsive Images – `srcset` and `picture`", content: "`srcset` provides different images for different resolutions. `sizes` tells the browser the layout size. The `picture` element allows art direction (different crops for different screens). Example: `<source srcset=\"large.jpg\" media=\"(min-width: 800px)\">`." },
                  { title: "Container Queries – The Future", content: "Container queries style elements based on their parent container's size, not the viewport. `@container (min-width: 400px) { ... }`. This enables truly reusable components." },
                ],
              },
              {
                title: "Transitions and Animations – Motion on the Web",
                slug: "transitions-animations",
                shortDescription: "Smooth state changes and keyframe animations.",
                estimatedMinutes: 24,
                sections: [
                  { title: "CSS Transitions – Smooth State Changes", content: "`transition: property duration timing‑function delay`. Example: `transition: background 0.3s ease`. Works on hover, focus, or any state change. Common timing functions: `ease`, `linear`, `ease‑in`, `ease‑out`, `cubic‑bezier()`." },
                  { title: "CSS Animations – Keyframes", content: "Define `@keyframes slideIn { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }`. Apply with `animation: slideIn 1s ease forwards;`. Use `animation-iteration-count`, `direction`, `fill-mode` (forwards, backwards, both)." },
                  { title: "Performance – Animate Only `opacity` and `transform`", content: "These are GPU‑accelerated and don't cause layout reflows. Avoid animating `width`, `height`, `top`, `left`, `margin` – they force repaints and can cause jank." },
                ],
              },
              {
                title: "CSS Variables – Custom Properties",
                slug: "css-variables",
                shortDescription: "Reusable values and theming with CSS custom properties.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Declaration and Usage", content: "Define `--primary-color: #3498db;` in a selector (often `:root` for global). Use with `var(--primary-color)`. Provide a fallback: `var(--primary-color, #000)`." },
                  { title: "Theming with Variables", content: "Change variable values at different breakpoints or with different classes. For example, add a `.dark` class to the body and override `--bg: #222;`." },
                  { title: "Scope and Inheritance", content: "Variables inherit from parent elements. Define them on a container to scope them to that component." },
                ],
              },
              {
                title: "BEM Methodology – Scalable CSS Naming",
                slug: "bem",
                shortDescription: "Block, Element, Modifier naming convention.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What is BEM?", content: "**Block** – standalone component (`.card`). **Element** – part of a block (`.card__title`). **Modifier** – variant of a block or element (`.card--large`). This naming reduces specificity conflicts and makes code self‑documenting." },
                  { title: "Benefits", content: "Improves code readability, maintainability, and reduces specificity conflicts. It's a great system for large teams and projects." },
                ],
              },
            ],
          },
          {
            title: "HTML5 APIs and Accessibility",
            slug: "html5-apis",
            description: "HTML5 features, multimedia, and ARIA.",
            topics: [
              {
                title: "HTML5 Semantics and APIs",
                slug: "html5-apis",
                shortDescription: "Audio, video, canvas, local storage, and geolocation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Audio and Video", content: "`<audio>` and `<video>` with `src`, `controls`, `autoplay`, `loop`. Use `<source>` elements for multiple formats (MP4, WebM, Ogg). Include fallback text." },
                  { title: "Canvas – Drawing with JavaScript", content: "`<canvas>` provides a drawing surface. Use JavaScript to draw shapes, images, and animations. Great for games, data visualisation, and dynamic graphics." },
                  { title: "Local Storage – Client‑Side Data", content: "`localStorage` and `sessionStorage` store key‑value pairs. `localStorage` persists across sessions; `sessionStorage` is per‑tab. Useful for preferences, cart items, and offline data." },
                  { title: "Geolocation – Accessing User Location", content: "`navigator.geolocation.getCurrentPosition()` gets the user's latitude/longitude. Always ask for permission and handle errors." },
                ],
              },
              {
                title: "Accessibility – Building Inclusive Sites",
                slug: "accessibility",
                shortDescription: "Make websites accessible for all users.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Why Accessibility Matters", content: "Accessibility (a11y) ensures people with disabilities (visual, auditory, motor, cognitive) can use your site. It's a legal requirement in many places and improves usability for everyone." },
                  { title: "Semantic HTML – The First Line of Defense", content: "Use the right tags for content – screen readers rely on them. For example, use `<button>` not `<div>` for interactive elements." },
                  { title: "ARIA – Accessible Rich Internet Applications", content: "ARIA adds extra semantics. `role` (e.g., `role=\"button\"`), `aria‑label`, `aria‑labelledby`, `aria‑describedby`, `aria‑hidden`, `aria‑expanded`, `aria‑controls`. Use ARIA only when semantic HTML doesn't suffice." },
                  { title: "Keyboard Navigation", content: "Ensure all interactive elements are reachable with the Tab key. Use `tabindex` for custom order. Handle `Enter` and `Space` for buttons and links." },
                  { title: "Focus Management", content: "Maintain a visible focus indicator. Use `:focus` styles. Manage focus when modals open/close (trap focus inside the modal). Provide skip links for keyboard users." },
                  { title: "Color Contrast and Design", content: "Ensure text has sufficient contrast (at least 4.5:1 for normal text, 3:1 for large). Use tools like WebAIM Contrast Checker." },
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
        description: "CSS architectures, preprocessors, performance optimization, advanced animations, and new CSS features.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "CSS Architectures and Frameworks",
            slug: "css-architectures",
            description: "BEM, OOCSS, SMACSS, CSS‑in‑JS, and frameworks.",
            topics: [
              {
                title: "OOCSS and SMACSS – Structured CSS",
                slug: "oocss-smacss",
                shortDescription: "Object‑Oriented CSS and Scalable and Modular Architecture.",
                estimatedMinutes: 22,
                sections: [
                  { title: "OOCSS – Reusable Objects", content: "Separate structure (layout) from skin (visual). Separate container from content. Example: `.card` (structure) and `.card--primary` (skin)." },
                  { title: "SMACSS – Categorisation", content: "Categorise CSS into: **Base** (default styles), **Layout** (grid/containers), **Module** (components), **State** (`.is‑active`), **Theme** (theming). This helps organisation." },
                ],
              },
              {
                title: "CSS‑in‑JS – Styling with JavaScript",
                slug: "css-in-js",
                shortDescription: "Styling with JavaScript libraries (Styled‑Components, Emotion).",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is CSS‑in‑JS?", content: "Write CSS in JavaScript using tagged template literals. Styles are scoped to the component, preventing class name collisions. Example: `const Button = styled.button` with ``. Dynamic theming is easy." },
                  { title: "Pros and Cons", content: "Pros: scoped styles, no global conflicts, dynamic styles, easier to share styles with JS. Cons: runtime overhead, larger bundles, learning curve, and less familiar to traditional developers." },
                ],
              },
              {
                title: "CSS Frameworks – Bootstrap and Tailwind",
                slug: "css-frameworks",
                shortDescription: "Utility‑first and component‑based frameworks.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Bootstrap – Component Library", content: "Bootstrap provides pre‑built components (buttons, modals, navbars) with a grid system. It's great for rapid prototyping. Customise via Sass variables." },
                  { title: "Tailwind CSS – Utility‑First", content: "Tailwind provides low‑level utility classes (`.p‑4`, `.text‑center`, `.bg‑blue‑500`) that you compose to build custom designs. It promotes consistency and speeds up development. Requires a build step." },
                  { title: "When to Use Which", content: "Bootstrap is good for quick prototypes and when you need a consistent design system out‑of‑the‑box. Tailwind is best when you want full design control and don't want to fight framework styles." },
                ],
              },
            ],
          },
          {
            title: "Preprocessors (SASS/SCSS)",
            slug: "sass",
            description: "Variables, nesting, mixins, functions, and inheritance.",
            topics: [
              {
                title: "SASS Basics – Supercharged CSS",
                slug: "sass-basics",
                shortDescription: "Variables, nesting, partials, and imports.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Variables and Nesting", content: "`$primary-color: #333;` – reuse values. Nesting: `nav { ul { li { ... } } }` mirrors HTML structure, keeping code organised." },
                  { title: "Partials and Import", content: "Break CSS into partials `_file.scss` and `@import` them. This modular approach improves maintainability." },
                ],
              },
              {
                title: "Advanced SASS – Mixins, Functions, and More",
                slug: "sass-advanced",
                shortDescription: "Mixins, functions, extends, and control directives.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Mixins – Reusable Chunks", content: "`@mixin border-radius($radius) { border-radius: $radius; }` and `@include border-radius(10px);`. Mixins can accept parameters and produce CSS." },
                  { title: "Functions – Computing Values", content: "`@function rem($px) { @return $px / 16px * 1rem; }` – returns computed values for calculations." },
                  { title: "Extend / Inheritance", content: "`@extend .error` shares styles between selectors. Be careful with output size – it can bloat CSS." },
                  { title: "Control Directives", content: "`@if`, `@each`, `@for` allow dynamic generation. Useful for generating utility classes or theme variants." },
                ],
              },
            ],
          },
          {
            title: "Performance Optimization",
            slug: "css-performance",
            description: "Critical CSS, code splitting, lazy loading, and image optimization.",
            topics: [
              {
                title: "Critical CSS – First Paint Speed",
                slug: "critical-css",
                shortDescription: "Inline above‑the‑fold styles for faster perceived load.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Critical CSS?", content: "Critical CSS is the minimal CSS needed to render the above‑the‑fold (visible) content. Inline it in the `<head>` to avoid render‑blocking. Use tools like Critical, Penthouse, or in‑line‑critical." },
                ],
              },
              {
                title: "Image Optimization",
                slug: "image-optimization",
                shortDescription: "Reduce image file size without sacrificing quality.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Formats and Tools", content: "Use WebP or AVIF for modern browsers (smaller than JPEG/PNG). Tools: ImageOptim, Squoosh, sharp (Node). Also use `srcset` and `sizes` for responsive images." },
                  { title: "Lazy Loading", content: "Add `loading=\"lazy\"` to images and iframes. This defers loading off‑screen images, improving initial load time." },
                ],
              },
              {
                title: "CSS Containment and `will‑change`",
                slug: "css-performance-advanced",
                shortDescription: "Optimise rendering with containment and hints.",
                estimatedMinutes: 20,
                sections: [
                  { title: "CSS Containment", content: "`contain: layout style paint` tells the browser that certain parts are isolated, reducing recalc costs. `content-visibility: auto` skips off‑screen rendering." },
                  { title: "`will‑change` – Hinting for Animation", content: "`will-change: transform, opacity` tells the browser to prepare for an animation, reducing jank. Use sparingly – overuse can cause memory issues." },
                ],
              },
            ],
          },
          {
            title: "Advanced Animations and Modern CSS Features",
            slug: "advanced-animations",
            description: "3D transforms, scroll‑driven animations, and new CSS features.",
            topics: [
              {
                title: "3D Transforms – Adding Depth",
                slug: "3d-transforms",
                shortDescription: "`perspective`, `rotateX`, `rotateY`, `translateZ`.",
                estimatedMinutes: 22,
                sections: [
                  { title: "3D Properties", content: "`transform-style: preserve-3d` – maintain 3D hierarchy. `perspective` – depth. `backface-visibility` – hide back of element. Common uses: 3D carousels, flip cards, parallax." },
                ],
              },
              {
                title: "Scroll‑Driven Animations",
                slug: "scroll-animations",
                shortDescription: "Animation linked to scroll position.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Intersection Observer", content: "Trigger animations when elements enter the viewport – used for reveal effects." },
                  { title: "CSS Scroll‑Driven Animations (New)", content: "New specification allows animations to be driven by scroll progress. Example: `animation-timeline: scroll()`." },
                ],
              },
              {
                title: "New CSS Features – The Future of CSS",
                slug: "new-css",
                shortDescription: "`:has()`, `@scope`, `@property`, nesting, and more.",
                estimatedMinutes: 24,
                sections: [
                  { title: "`:has()` – Parent Selector", content: "`div:has(p)` selects a div that contains a paragraph. Very powerful for component styling." },
                  { title: "CSS Nesting – Like Preprocessors", content: "Native nesting: `.parent { .child { ... } }` – reduces preprocessor need." },
                  { title: "`@property` – Custom Properties with Types", content: "Define typed custom properties: `@property --color { syntax: '<color>'; inherits: false; initial-value: red; }`. Enables transitions and animations on custom properties." },
                  { title: "`@scope` – Scoped Styles", content: "`@scope (.card) { ... }` limits styles to a specific scope, avoiding global conflicts." },
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
        description: "Common HTML and CSS interview questions, challenges, and best practices.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core HTML & CSS",
            slug: "core-html-css",
            description: "Box model, specificity, positioning, selectors, and semantic HTML.",
            topics: [
              {
                title: "Box Model and Layout",
                slug: "box-model-interview",
                shortDescription: "Explain the box model, margin collapse, and box‑sizing.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Box Model", content: "Describe content, padding, border, margin. Explain how `box-sizing` affects width/height calculation." },
                  { title: "Margin Collapse", content: "When adjacent block margins collapse and when they don't." },
                ],
              },
              {
                title: "Positioning and Layout",
                slug: "positioning-interview",
                shortDescription: "Explain static, relative, absolute, fixed, sticky.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Position Values", content: "Define each and give examples of usage." },
                  { title: "Stacking Context", content: "What creates a new stacking context and how `z-index` works." },
                ],
              },
              {
                title: "Flexbox vs Grid",
                slug: "flex-vs-grid",
                shortDescription: "When to use Flexbox vs CSS Grid.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Flexbox", content: "One‑dimensional layout – ideal for components, navigation, aligning items." },
                  { title: "Grid", content: "Two‑dimensional layout – ideal for page structure, complex layouts." },
                ],
              },
              {
                title: "Semantic HTML and Accessibility",
                slug: "semantic-accessibility-interview",
                shortDescription: "Why semantic HTML matters and ARIA.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Semantic HTML", content: "Improves SEO, accessibility, and maintainability." },
                  { title: "ARIA", content: "When to use and best practices." },
                  { title: "Focus Management", content: "How to handle focus for accessibility." },
                ],
              },
            ],
          },
          {
            title: "Practical Coding Challenges",
            slug: "practical-challenges",
            description: "Common frontend interview coding tasks.",
            topics: [
              {
                title: "Center a Div – Multiple Ways",
                slug: "center-div",
                shortDescription: "Multiple ways to center an element.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Flexbox", content: "`display: flex; justify-content: center; align-items: center;`" },
                  { title: "Grid", content: "`display: grid; place-items: center;`" },
                  { title: "Position + Transform", content: "`position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`" },
                ],
              },
              {
                title: "Create a Responsive Navbar",
                slug: "responsive-nav",
                shortDescription: "Design a mobile‑first navigation that collapses on small screens.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Approach", content: "Use Flexbox for the desktop layout, a hamburger menu for mobile, and media queries." },
                  { title: "Implementation", content: "Use `@media` and JavaScript to toggle visibility." },
                ],
              },
              {
                title: "Build a Card Component",
                slug: "card-component",
                shortDescription: "Create a reusable card with image, title, description, and button.",
                estimatedMinutes: 18,
                sections: [
                  { title: "HTML", content: "Semantic `<article>` with `<img>`, `<h3>`, `<p>`, `<a>`." },
                  { title: "CSS", content: "Box model, flex/grid, hover effects, transitions." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ HTML & CSS category seeded (ultra‑detailed)");
}

async function main() {
  await seedHtmlCssCategory();
}

main()
  .catch((error) => {
    console.error("HTML & CSS seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });