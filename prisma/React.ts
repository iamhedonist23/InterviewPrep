// ---- 200+ React Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["React", "React"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["React", "What is React and what are its main features?", "react-overview", "Define React and list its key features.", "React is a JavaScript library for building user interfaces, particularly single‑page applications. It uses a component‑based architecture, virtual DOM for efficient updates, and unidirectional data flow. Key features: JSX, hooks, declarative UI, and support for server‑side rendering."],
  ["React", "What is the difference between React and React Native?", "react-vs-react-native", "Compare the two frameworks.", "React is for web applications, using HTML and CSS. React Native is for mobile apps, using native components (iOS/Android). Both share the same component model and JSX syntax, but React Native uses native rendering, not a DOM."],
  ["React", "What is JSX?", "jsx-definition", "Define JSX and its purpose.", "JSX (JavaScript XML) is a syntax extension that allows writing HTML‑like code inside JavaScript. It makes React component code more readable and maintainable. JSX is transpiled to `React.createElement()` calls by Babel."],
  ["React", "What is the difference between a functional component and a class component?", "functional-vs-class", "Compare the two component types.", "Functional components are plain JavaScript functions that return JSX. They can use hooks (since React 16.8). Class components extend `React.Component` and use lifecycle methods like `componentDidMount`. Hooks have largely replaced class components in modern React."],
  ["React", "What is the virtual DOM and how does it work?", "virtual-dom", "Explain the concept.", "The virtual DOM is a lightweight copy of the actual DOM. When state changes, React creates a new virtual DOM tree, compares it with the previous one (diffing), and calculates the minimal changes needed (reconciliation). It then applies these updates to the real DOM, improving performance."],
  ["React", "What is the difference between props and state?", "props-vs-state", "Compare the two.", "Props (short for properties) are read‑only data passed from parent to child. State is mutable, internal data managed by the component itself. Changes to state trigger re‑renders; props do not change within the component."],
  ["React", "What is the `key` prop and why is it important?", "key-prop", "Explain its role in lists.", "The `key` prop helps React identify which items have changed, been added, or removed in a list. It should be a unique identifier (e.g., an ID). Using array indexes as keys is discouraged because they can cause performance issues and bugs."],
  ["React", "How do you handle events in React?", "event-handling", "Explain synthetic events.", "React uses synthetic events, which are cross‑browser wrappers around native events. Event handlers are passed as props (e.g., `onClick`). To avoid losing `this` in class components, you bind the handler or use arrow functions."],
  ["React", "What is the `children` prop?", "children-prop", "Explain the special prop.", "`children` is a special prop that allows passing JSX elements between a component's opening and closing tags. It enables component composition and is used for layout components (like `Modal`, `Card`)."],
  ["React", "What is the difference between a controlled and uncontrolled component?", "controlled-vs-uncontrolled", "Compare form handling.", "A controlled component has its value controlled by React state (e.g., `value` prop and `onChange` handler). An uncontrolled component manages its own internal state (e.g., using a `ref`). Controlled components are recommended for better control and validation."],
  ["React", "How do you create a ref in React?", "ref-creation", "Explain `useRef` and `createRef`.", "In functional components, use `const ref = useRef(initialValue)`. In class components, use `React.createRef()`. Refs provide direct access to DOM nodes or React elements."],
  ["React", "What is the `useState` hook?", "usestate", "Explain the hook.", "`useState` is a Hook that lets you add state to functional components. It returns an array with the current state value and a setter function. Example: `const [count, setCount] = useState(0);`."],
  ["React", "What is the `useEffect` hook?", "useeffect", "Explain the side‑effect hook.", "`useEffect` lets you perform side effects in functional components (e.g., data fetching, subscriptions, DOM manipulation). It runs after the component renders. You can control when it runs with the dependency array."],
  ["React", "What is the `useContext` hook?", "usecontext", "Explain the context hook.", "`useContext` allows you to consume a React context without using a `Context.Consumer` wrapper. It accepts a context object created by `React.createContext()` and returns the current context value."],
  ["React", "What is the `useReducer` hook?", "usereducer", "Explain the reducer hook.", "`useReducer` is an alternative to `useState` for complex state logic. It takes a reducer function and an initial state, and returns the current state and a dispatch function. It’s similar to Redux's reducer pattern."],
  ["React", "What is the `useCallback` hook?", "usecallback", "Explain memoization of functions.", "`useCallback` returns a memoized version of a callback function that only changes if one of its dependencies changes. It helps prevent unnecessary re‑renders when passing callbacks to child components that rely on reference equality."],
  ["React", "What is the `useMemo` hook?", "usememo", "Explain memoization of values.", "`useMemo` memoizes the result of a computation and only recomputes when dependencies change. It optimizes expensive calculations and prevents unnecessary re‑calculations on every render."],
  ["React", "What is the `useRef` hook?", "useref", "Explain the ref hook.", "`useRef` returns a mutable ref object whose `.current` property persists for the entire lifetime of the component. It can hold a reference to a DOM element or any value that should not trigger re‑renders when changed."],
  ["React", "What is a custom hook?", "custom-hook", "Define custom hooks.", "A custom hook is a JavaScript function whose name starts with `use` and that may call other hooks. It allows you to extract and reuse component logic across multiple components (e.g., `useFetch`, `useLocalStorage`)."],
  ["React", "What are the rules of hooks?", "hooks-rules", "List the rules.", "1. Only call hooks at the top level, not inside loops, conditions, or nested functions. 2. Only call hooks from React function components or custom hooks. They ensure hooks are called in the same order every render."],

  // ==================== STATE MANAGEMENT (15) ====================
  ["React", "What is the Context API and when should you use it?", "context-api", "Explain context.", "The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It is useful for theme, authentication, or language preferences. Avoid using it for high‑frequency updates; use Redux or Zustand for complex state."],
  ["React", "What is Redux and how does it work with React?", "redux", "Explain Redux integration.", "Redux is a predictable state container for JavaScript apps. With React‑Redux, you connect your components to the Redux store using `useSelector` to read state and `useDispatch` to dispatch actions. Actions are dispatched to reducers, which update the state immutably."],
  ["React", "What is the difference between Redux and Context API?", "redux-vs-context", "Compare the two.", "Context API is built into React and is simpler, suitable for small to medium apps. Redux provides more advanced features like middleware (for side effects), time‑travel debugging, and is better for large applications with complex state logic. Redux also offers performance optimizations through selective subscriptions."],
  ["React", "What is a reducer in Redux?", "reducer-definition", "Define a reducer.", "A reducer is a pure function that takes the current state and an action, and returns a new state. It determines how the state changes in response to actions. Reducers must be pure (no side effects) and return a new state object."],
  ["React", "What are actions in Redux?", "actions-definition", "Define actions.", "Actions are plain JavaScript objects that describe what happened. They must have a `type` property (string) and can include a payload. Actions are dispatched to the store to trigger state updates."],
  ["React", "What is a store in Redux?", "store-definition", "Define the store.", "The store holds the entire state tree of your app. It provides methods to get state (`getState`), dispatch actions (`dispatch`), and subscribe to changes (`subscribe`). The store is created with `createStore` or `configureStore`."],
  ["React", "What is middleware in Redux? Give examples.", "redux-middleware", "Explain middleware.", "Middleware provides a way to intercept actions before they reach the reducer. They are used for logging, asynchronous operations (e.g., Redux Thunk, Redux Saga), and more. They enhance the store's dispatch function."],
  ["React", "What is Redux Thunk?", "redux-thunk", "Explain the middleware.", "Redux Thunk is a middleware that allows you to write action creators that return a function instead of an action object. The function receives `dispatch` and `getState`, enabling asynchronous logic (e.g., API calls) and conditional dispatches."],
  ["React", "What is Zustand and how does it differ from Redux?", "zustand", "Explain the state library.", "Zustand is a small, fast, and scalable state management library. It uses a simple API with hooks and does not require a provider. Unlike Redux, Zustand is less boilerplate‑heavy and is easier to learn, but lacks some advanced middleware and devtools."],
  ["React", "What is a selector in Redux?", "selector-definition", "Define selectors.", "Selectors are functions that derive data from the state. They compute derived data, allowing components to get exactly what they need. They can be memoized (using Reselect) to improve performance."],
  ["React", "What is the difference between `useSelector` and `useStore`?", "useselector-vs-usestore", "Compare the hooks.", "`useSelector` selects a part of the state and subscribes to updates. `useStore` returns the entire Redux store object, but using it directly is discouraged because it doesn't automatically re‑render when state changes."],
  ["React", "What is the `Provider` component in Redux?", "provider-definition", "Explain the provider.", "The `Provider` component makes the Redux store available to all nested components that are connected via `connect` or hooks. It is typically placed at the root of the app."],
  ["React", "What are the benefits of using a state management library?", "state-management-benefits", "List benefits.", "Centralized state improves predictability, easier debugging (time‑travel), better performance through selective updates, and cleaner separation of concerns. It simplifies data flow in large applications."],
  ["React", "What is the difference between `localStorage` and `Redux` for state persistence?", "localstorage-vs-redux", "Compare persistence options.", "Redux manages application state in memory. `localStorage` is a browser API for persistent storage. You can combine them (e.g., persist Redux state to localStorage using libraries like `redux-persist`)."],
  ["React", "What is `Recoil` and how does it compare to Redux?", "recoil", "Explain Recoil.", "Recoil is a state management library built by Facebook. It uses atoms and selectors, providing fine‑grained reactivity with minimal boilerplate. It integrates well with React's concurrent features and is simpler than Redux for many use cases."],

  // ==================== PERFORMANCE (15) ====================
  ["React", "How does React optimize performance?", "react-performance-optimization", "Explain optimization techniques.", "React uses the virtual DOM and reconciliation to minimize DOM updates. Additional techniques: `React.memo` to memoize components, `useCallback` and `useMemo` to prevent unnecessary re‑computations, code splitting with lazy loading, and using keys in lists."],
  ["React", "What is `React.memo` and when should you use it?", "react-memo", "Explain the higher‑order component.", "`React.memo` is a higher‑order component that memoizes a functional component. It re‑renders only when its props change (shallow comparison). Use it for components that render often with the same props to improve performance."],
  ["React", "What is the difference between `React.memo` and `useMemo`?", "memo-vs-usememo", "Compare the two.", "`React.memo` is used to memoize entire components (prevents re‑renders). `useMemo` is a hook that memoizes a value (result of a computation). They serve different purposes: component‑level vs value‑level memoization."],
  ["React", "What is the reconciliation algorithm?", "reconciliation", "Explain the diffing process.", "Reconciliation is the process by which React updates the DOM. It compares the new virtual DOM with the previous one and determines the minimal set of changes. React uses heuristics like component type and key to make the process efficient."],
  ["React", "What is a `key` and how does it affect reconciliation?", "key-reconciliation", "Explain the role of keys in diffing.", "Keys help React identify which items have changed, been added, or removed. Using a stable, unique key ensures efficient re‑ordering and prevents unnecessary re‑renders. Using index as a key can cause issues with state and animations."],
  ["React", "How do you lazy load components in React?", "lazy-loading", "Explain code splitting.", "Use `React.lazy()` with `Suspense` to dynamically import components. Example: `const MyComponent = React.lazy(() => import('./MyComponent'));`. This reduces the initial bundle size."],
  ["React", "What is the `Suspense` component?", "suspense", "Explain the fallback UI.", "`Suspense` is a component that wraps lazy‑loaded components and displays a fallback (like a loading spinner) while the component is being loaded. It also works with data fetching (experimental)."],
  ["React", "What is the difference between `useCallback` and `useMemo`?", "usecallback-vs-usememo", "Compare the hooks.", "`useCallback` memoizes a function, returning the same function instance unless dependencies change. `useMemo` memoizes a value, recomputing only when dependencies change. Use `useCallback` for callbacks passed to child components; use `useMemo` for expensive calculations."],
  ["React", "How can you avoid unnecessary re‑renders in React?", "avoid-renders", "Explain strategies.", "Use `React.memo` for component memoization, `useCallback` to stabilize function references, `useMemo` for expensive computations, and ensure that state updates are localized. Also, use `shouldComponentUpdate` in class components or `PureComponent`."],
  ["React", "What is the purpose of `React.StrictMode`?", "strict-mode", "Explain the tool.", "`React.StrictMode` is a wrapper that helps detect potential problems in your app. It runs additional checks (e.g., identifying unsafe lifecycle methods, legacy refs, and unexpected side effects) and doubles certain function calls to highlight side effects."],
  ["React", "What is the `useTransition` hook?", "usetransition", "Explain concurrent rendering.", "`useTransition` allows you to mark state updates as non‑urgent (transitions). It lets you keep the UI responsive during expensive updates by allowing concurrent rendering. It returns a `isPending` boolean and a `startTransition` function."],
  ["React", "What is the `useDeferredValue` hook?", "usedeferredvalue", "Explain deferred value.", "`useDeferredValue` returns a deferred version of a value that may be stale. It is used to keep the UI responsive by deferring the update of non‑critical parts of the UI (like search results) while the user types."],
  ["React", "What is `React.PureComponent`?", "purecomponent", "Explain the class component.", "`React.PureComponent` is a base class that implements `shouldComponentUpdate` with a shallow prop and state comparison. It prevents unnecessary re‑renders if props and state have not changed. It is similar to `React.memo` for functional components."],
  ["React", "What is the `useLayoutEffect` hook?", "uselayouteffect", "Explain the hook.", "`useLayoutEffect` runs synchronously after all DOM mutations, before the browser paints. It is used to read layout (e.g., dimensions) or to make changes that should be visible immediately. Avoid using it unless necessary, as it blocks painting."],
  ["React", "What is the `useImperativeHandle` hook?", "useimperativehandle", "Explain the hook.", "`useImperativeHandle` customizes the instance value that is exposed when using `ref` with `forwardRef`. It allows you to control which methods or properties are accessible to the parent component."],

  // ==================== ADVANCED PATTERNS (15) ====================
  ["React", "What is a higher‑order component (HOC)?", "hoc", "Define HOC.", "A higher‑order component is a function that takes a component and returns a new component with additional props or functionality. It is a pattern for reusing component logic (e.g., for authentication, logging)."],
  ["React", "What is the render props pattern?", "render-props", "Explain the pattern.", "Render props is a technique where a component accepts a function as a prop that returns JSX. The component calls that function with data, allowing the parent to define what to render. It is an alternative to HOCs for sharing logic."],
  ["React", "What are compound components?", "compound-components", "Explain the pattern.", "Compound components are a pattern where a set of components work together to form a more complex UI. They share state implicitly via context and allow flexible layouts (e.g., `Select` with `Option` children)."],
  ["React", "What is a portal in React?", "portal", "Explain portals.", "Portals allow rendering children into a DOM node outside the parent component's hierarchy (e.g., modals, tooltips). Use `ReactDOM.createPortal(children, domNode)`. This is useful for overflow and z‑index issues."],
  ["React", "What are error boundaries and how do they work?", "error-boundaries", "Explain error handling.", "Error boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI. They implement `componentDidCatch` (class components) or `getDerivedStateFromError`. They don't catch errors in event handlers or asynchronous code."],
  ["React", "What is the `forwardRef` function?", "forwardref", "Explain forwarding refs.", "`forwardRef` lets a component forward a `ref` it receives to a child component. It is used to expose DOM elements or component methods to a parent. This is common in reusable component libraries."],
  ["React", "What are fragments and why are they used?", "fragments", "Explain fragments.", "Fragments (using `<></>` or `React.Fragment`) allow grouping a list of children without adding extra nodes to the DOM. They are useful for returning multiple elements from a component without an unnecessary wrapper div."],
  ["React", "What is the `useDebugValue` hook?", "usedebugvalue", "Explain the hook.", "`useDebugValue` is used to display a label for custom hooks in React DevTools. It helps with debugging by providing a readable name or value."],
  ["React", "How do you create a context with a default value?", "context-default-value", "Explain.", "`React.createContext(defaultValue)` creates a context with a default value. The default is used when a component does not have a matching provider in the tree."],
  ["React", "What is the difference between `Context.Provider` and `Context.Consumer`?", "provider-vs-consumer", "Compare the two.", "`Context.Provider` is a component that supplies the context value to its descendants. `Context.Consumer` is a component that subscribes to context changes using a function as a child (render prop). Hooks like `useContext` have largely replaced `Consumer`."],
  ["React", "What is `React.cloneElement` and when would you use it?", "cloneelement", "Explain the API.", "`React.cloneElement` creates a copy of a React element with new props. It is used to add props to children dynamically (e.g., in compound components or higher‑order components)."],
  ["React", "What is the `children` prop and how can you map over it?", "children-map", "Explain manipulation.", "`children` can be a single element, an array, or `undefined`. You can use `React.Children.map` to iterate safely over children, even if it's a single element, and add props to each child."],
  ["React", "What are the pros and cons of using Redux vs Context API?", "redux-vs-context-pros-cons", "Discuss trade‑offs.", "Redux offers better performance for frequent updates (due to selective subscriptions) and a rich ecosystem (devtools, middleware). Context is simpler and built‑in, but re‑renders more broadly. Choose Redux for complex apps, Context for simpler state."],
  ["React", "How do you handle forms in React?", "react-forms", "Explain form handling.", "Forms can be controlled (state as source of truth) or uncontrolled (refs). Use controlled for validation and dynamic fields. Libraries like Formik, React Hook Form, or Final Form simplify form management and validation."],

  // ==================== ROUTING (10) ====================
  ["React", "What is React Router and why is it used?", "react-router", "Explain the library.", "React Router is a standard library for routing in React applications. It enables navigation between components, URL handling, and nested routes. It provides components like `BrowserRouter`, `Routes`, `Route`, and `Link`."],
  ["React", "What is the difference between `BrowserRouter` and `HashRouter`?", "browserrouter-vs-hashrouter", "Compare the two.", "`BrowserRouter` uses the HTML5 history API (pushState) and clean URLs (e.g., `/about`). `HashRouter` uses the hash part of the URL (e.g., `/#/about`). `BrowserRouter` requires server configuration to handle refresh; `HashRouter` works without server setup."],
  ["React", "What is the `Route` component and how does it work?", "route-component", "Explain routing.", "`Route` renders UI based on the current URL. It uses the `path` prop to match against the URL and renders its `element` prop. In React Router v6, `Route` must be used inside `Routes`."],
  ["React", "What is the `Link` component and how is it different from an `<a>` tag?", "link-vs-anchor", "Compare navigation.", "`Link` from React Router provides client‑side navigation without a full page refresh. It uses the `to` prop for the destination. An `<a>` tag causes a full page reload. Use `Link` for internal navigation."],
  ["React", "What is the `useNavigate` hook?", "usenavigate", "Explain the hook.", "`useNavigate` returns a function that lets you navigate programmatically (e.g., after form submission). It replaces the older `useHistory` hook. Example: `const navigate = useNavigate(); navigate('/dashboard');`."],
  ["React", "What is the `useParams` hook?", "useparams", "Explain the hook.", "`useParams` returns an object of key/value pairs from the current URL's dynamic parameters. Example: In a route `/users/:id`, `useParams()` returns `{ id: '123' }`."],
  ["React", "What is the `useLocation` hook?", "uselocation", "Explain the hook.", "`useLocation` returns the current location object, which contains `pathname`, `search`, `hash`, `state`, and `key`. Useful for getting query parameters or passing state via navigation."],
  ["React", "What is the difference between `Navigate` and `useNavigate`?", "navigate-vs-usenavigate", "Compare the two.", "`Navigate` is a component that changes the URL when rendered (used declaratively). `useNavigate` is a hook that returns a function for imperative navigation."],
  ["React", "How do you handle nested routes in React Router?", "nested-routes", "Explain nested routing.", "In React Router v6, nested routes are defined by nesting `<Route>` components inside a parent `<Route>`. The parent's element can render an `<Outlet>` where the child routes will be rendered."],
  ["React", "What is the `Outlet` component?", "outlet", "Explain the component.", "`Outlet` is a placeholder component used in route hierarchies. It renders the matched child route element. It is used in layout components to render nested routes."],

  // ==================== TESTING (10) ====================
  ["React", "What is Jest and how is it used with React?", "jest", "Explain the testing framework.", "Jest is a JavaScript testing framework developed by Facebook. It is commonly used with React for unit testing, snapshot testing, and mocking. It runs tests in parallel and provides a rich API for assertions."],
  ["React", "What is React Testing Library?", "react-testing-library", "Explain the library.", "React Testing Library is a set of helpers that encourage testing components as a user would interact with them. It focuses on querying the DOM by text, role, and other accessible attributes, rather than implementation details."],
  ["React", "What is the difference between unit testing and integration testing in React?", "unit-vs-integration-testing", "Compare test types.", "Unit testing tests individual components in isolation (often with mocks). Integration testing tests the interaction between multiple components or with external services. Both are important for a robust test suite."],
  ["React", "What are snapshots in Jest?", "snapshots", "Explain snapshot testing.", "Snapshot testing captures the rendered output of a component and saves it to a file. Subsequent tests compare the current output to the snapshot. It helps detect unintended changes but can be brittle if overused."],
  ["React", "How do you test asynchronous code in React?", "async-testing", "Explain async testing.", "Use `waitFor` and `findBy*` queries from React Testing Library to wait for asynchronous updates. For `useEffect` with API calls, mock the API using `jest.mock` and use `act` or `waitFor` to flush pending promises."],
  ["React", "What is the `render` function in React Testing Library?", "render-function", "Explain the utility.", "`render` mounts a component in a simulated DOM environment (jsdom) and provides utility methods like `getByText`, `getByRole`, and `container` to query the rendered output. It is used to set up tests."],
  ["React", "What is the `fireEvent` and `userEvent` utilities?", "fireevent-userevent", "Explain event simulation.", "`fireEvent` from RTL simulates DOM events (e.g., click, change). `userEvent` from `@testing-library/user-event` provides more realistic user interactions (keyboard, mouse), including events that fire in sequence."],
  ["React", "How do you mock a module in Jest?", "jest-mock", "Explain mocking.", "Use `jest.mock('module', () => { ... })` to replace a module with a mock implementation. For instance, mocking `axios` to return fake data for API calls."],
  ["React", "What is the `act` helper and when should you use it?", "act-helper", "Explain `act` from React.", "`act` ensures that all pending updates (state, effects) are flushed before making assertions. React Testing Library wraps most operations in `act` automatically, but you may need it for manual tests."],
  ["React", "What is the difference between `getBy` and `queryBy` in RTL?", "getby-vs-queryby", "Compare query methods.", "`getBy*` throws an error if the element is not found; `queryBy*` returns null. Use `getBy` when you expect the element to be present, `queryBy` when you want to test absence."],

  // ==================== SERVER‑SIDE RENDERING (10) ====================
  ["React", "What is server‑side rendering (SSR) and why use it?", "ssr", "Explain SSR.", "SSR generates the HTML for a page on the server and sends it to the client. It improves initial load performance, SEO, and works with slow networks. It is implemented with frameworks like Next.js or using `ReactDOMServer`."],
  ["React", "What is Next.js and how does it differ from plain React?", "nextjs", "Explain the framework.", "Next.js is a React framework that provides SSR, static site generation, file‑based routing, API routes, and more. It offers built‑in optimizations and is the recommended way to build production‑ready React applications."],
  ["React", "What is `ReactDOMServer.renderToString`?", "rendertostring", "Explain the function.", "`renderToString` converts a React component tree to an HTML string, which can be sent to the client as the initial page. It is used for SSR."],
  ["React", "What is the difference between SSR and CSR (Client‑Side Rendering)?", "ssr-vs-csr", "Compare the two.", "SSR renders the initial HTML on the server, improving SEO and first paint. CSR renders the app in the browser after loading the JavaScript, which can be slower on first load but faster after hydration."],
  ["React", "What is hydration in React?", "hydration", "Explain the process.", "Hydration is the process where React attaches event listeners and state to the server‑rendered HTML, making it interactive. It uses `ReactDOM.hydrateRoot` instead of `render`."],
  ["React", "What is `ReactDOM.hydrateRoot`?", "hydrateroot", "Explain the API.", "`hydrateRoot` is used to hydrate a container that has been rendered by React on the server. It should be used instead of `createRoot` for SSR."],
  ["React", "What is static site generation (SSG) in Next.js?", "ssg", "Explain SSG.", "SSG generates the HTML at build time. The pages are pre‑rendered and served as static files, providing excellent performance. Next.js supports SSG with `getStaticProps`."],
  ["React", "What is `getServerSideProps` in Next.js?", "getserversideprops", "Explain the function.", "`getServerSideProps` is a Next.js function that fetches data on the server on each request. It runs at request time and provides props to the page component. Used for dynamic content."],
  ["React", "What is `getStaticProps` in Next.js?", "getstaticprops", "Explain the function.", "`getStaticProps` fetches data at build time and generates static pages. It is used for pages that don't change frequently (like blog posts). In incremental static regeneration, it can be re‑run periodically."],
  ["React", "What is the difference between `getStaticProps` and `getServerSideProps`?", "getstaticprops-vs-getserversideprops", "Compare the two.", "`getStaticProps` runs at build time (or with ISR) and serves cached data. `getServerSideProps` runs on every request, providing fresh data but with more server load. Use SSG for static content, SSR for dynamic content."],

  // ==================== SECURITY & BEST PRACTICES (10) ====================
  ["React", "How do you prevent XSS attacks in React?", "xss-prevention", "Explain security measures.", "React escapes values embedded in JSX by default, which helps prevent XSS. However, you must avoid using `dangerouslySetInnerHTML` with untrusted content. Use libraries like DOMPurify to sanitize HTML if needed."],
  ["React", "What is `dangerouslySetInnerHTML` and why is it dangerous?", "dangerouslysetinnerhtml", "Explain the prop.", "`dangerouslySetInnerHTML` is a prop that allows injecting raw HTML into a component. It is dangerous because it can lead to XSS if the HTML is not sanitized. Use it only with trusted content and always sanitize."],
  ["React", "How do you handle authentication in React?", "react-authentication", "Explain authentication patterns.", "Common patterns: JWT tokens stored in `localStorage` or cookies. Use context or Redux to manage authentication state. Protect routes using a wrapper component or `useEffect` checks. Use `axios` interceptors to add tokens to requests."],
  ["React", "What are the best practices for folder structure in React?", "folder-structure", "Explain file organization.", "Organize by features (e.g., `features/auth/` with components, hooks, and styles). Group shared components in `components/`, pages in `pages/` (or `routes/`), utilities in `utils/`, and hooks in `hooks/`. Use index files for exports."],
  ["React", "How do you handle environment variables in React?", "env-variables", "Explain usage.", "Use `process.env.REACT_APP_*` variables (Create React App) or `import.meta.env.VITE_*` (Vite). Prefix with `REACT_APP_` to be accessible. Store sensitive keys only on the server."],
  ["React", "What is the benefit of using TypeScript with React?", "typescript-react", "Explain advantages.", "TypeScript adds static type checking, which catches bugs early, improves IDE support (autocomplete, refactoring), and enhances code maintainability. It is highly recommended for large projects."],
  ["React", "How do you handle errors in React?", "error-handling", "Explain error handling strategies.", "Use error boundaries for component‑level errors. For API errors, use try/catch with async/await or `.catch` and display user‑friendly messages. Use global error handlers via `window.onerror` or a central error tracking service."],
  ["React", "What is the difference between `development` and `production` builds in React?", "dev-vs-prod-build", "Compare builds.", "Development builds include helpful warnings, error messages, and source maps. Production builds are minified, optimized (tree‑shaking, dead code elimination), and exclude development‑only code."],
  ["React", "How do you manage dependencies in React projects?", "dependency-management", "Explain package management.", "Use `npm` or `yarn`. Keep dependencies up‑to‑date but test major upgrades. Use `package.json` and `package-lock.json` for deterministic installs. Use `devDependencies` for build tools, testing libraries, etc."],
  ["React", "What is the React Developer Tools and how do you use them?", "react-devtools", "Explain the browser extension.", "React DevTools is a browser extension that lets you inspect the React component tree, view props and state, profile performance, and debug. It is essential for development."],

  // ==================== SCENARIO‑BASED (20) ====================
  ["React", "How would you fetch data in a React component?", "fetch-data", "Explain data fetching patterns.", "Use `useEffect` with `fetch` or `axios`. Set loading and error states. For better practices, use libraries like React Query, SWR, or `useReducer` with actions. Also consider using `AbortController` to cancel requests on unmount."],
  ["React", "How do you optimize a React app that re‑renders frequently?", "optimize-frequent-renders", "Explain optimization techniques.", "Use `React.memo` for components that receive the same props. Use `useCallback` and `useMemo` to stabilize references. Move state down to only the components that need it. Use `useTransition` for non‑urgent updates. Also, consider using `shouldComponentUpdate` or `React.PureComponent`."],
  ["React", "How would you implement a search filter with debouncing?", "debouncing", "Explain debouncing in React.", "Use `setTimeout` inside `useEffect` with a cleanup function to cancel the timeout on each keystroke. Alternatively, use a custom `useDebounce` hook or a library like `lodash.debounce`."],
  ["React", "How do you handle forms with validation in React?", "form-validation", "Explain form validation.", "Use controlled components, track input values and errors in state. Validate on change or blur. Display error messages. For complex forms, use libraries like Formik, React Hook Form, or Yup for schema validation."],
  ["React", "How would you implement a modal in React?", "modal-implementation", "Explain modal creation.", "Use a portal to render the modal outside the main DOM hierarchy. Control its visibility with state. Manage keyboard (Escape key) and focus traps. Use a backdrop and close on outside click. Consider using libraries like `react‑modal`."],
  ["React", "How do you handle large lists in React?", "large-lists", "Explain virtualization.", "Use libraries like `react‑window` or `react‑virtualized` to render only the visible items, reducing DOM nodes. This improves performance for large data sets."],
  ["React", "How would you implement infinite scrolling?", "infinite-scroll", "Explain infinite scroll.", "Use `useEffect` to detect when the user scrolls near the bottom (using `getBoundingClientRect` or `IntersectionObserver`). Fetch more data and append to the list. Use a `useCallback` for the fetch function and a `useRef` for the sentinel element."],
  ["React", "How do you manage global state with context and reducers?", "global-state-context-reducer", "Explain the pattern.", "Create a context with `createContext`. Provide a state and dispatch function using `useReducer`. Wrap the app with the provider. Use `useContext` in child components to read state or dispatch actions."],
  ["React", "How do you implement a dark mode toggle in React?", "dark-mode", "Explain dark mode implementation.", "Use context or Redux to store the theme preference. Persist to `localStorage`. Apply CSS variables or classes to body. Toggle with a button. Use `useEffect` to listen for system preference changes."],
  // Fixed the file uploads entry with proper escaping
  ["React", "How do you handle file uploads in React?", "file-uploads", "Explain file upload.", "Use `<input type=\"file\">` with `onChange` to get the file. Use `FormData` to append the file and send via `fetch` or `axios`. Show upload progress and handle errors."],
  ["React", "How would you implement a drag‑and‑drop feature in React?", "drag-and-drop", "Explain drag‑and‑drop.", "Use native HTML5 drag‑and‑drop events (`onDragStart`, `onDragOver`, `onDrop`) or libraries like `react‑dnd` or `@dnd‑kit`. Manage the state of items and reorder them based on drop position."],
  ["React", "How do you handle session persistence in React?", "session-persistence", "Explain session management.", "Use `localStorage` or `sessionStorage` to persist user session data (e.g., token). On app load, check storage and restore state. Use context or Redux to make the session available globally."],
  ["React", "How do you implement a multi‑language app in React?", "i18n", "Explain internationalization.", "Use libraries like `react‑i18next`. Store translations in JSON files. Use a `useTranslation` hook to get the translation function. Change language via `i18n.changeLanguage`."],
  ["React", "How do you handle loading states in React?", "loading-states", "Explain loading state management.", "Use a loading state variable (e.g., `isLoading`). Set to `true` before an async operation and `false` after. Display a spinner or skeleton. For multiple requests, use a counter to track pending requests."],
  ["React", "How do you implement a responsive design in React?", "responsive-design", "Explain responsive design.", "Use CSS media queries, CSS Grid/Flexbox, and frameworks like Tailwind or Material‑UI. For React‑specific, use `useMediaQuery` hooks to conditionally render or adjust styles."],
  ["React", "How do you use React with a backend API?", "react-backend-api", "Explain API integration.", "Use `fetch` or `axios` to make HTTP requests. Use environment variables for base URLs. Handle authentication tokens. Use React Query or SWR for caching, refetching, and state management."],
  ["React", "How do you implement a breadcrumb navigation in React?", "breadcrumbs", "Explain breadcrumb implementation.", "Use React Router's `useLocation` and `match` to generate breadcrumbs from the current path. Map the path segments to names (e.g., from route config). Render a list of links."],
  ["React", "How do you handle permissions and roles in a React app?", "permissions", "Explain role‑based access control.", "Store user roles in state (context/Redux). Use a custom hook `useHasPermission` to check permissions. Conditionally render components or routes. Protect routes with wrapper components."],
  ["React", "How do you implement a notification system in React?", "notifications", "Explain toast/notification system.", "Use a context to manage notifications (list of messages). Provide `addNotification` and `removeNotification` functions. Use a `useEffect` to auto‑dismiss after a timeout. Render notifications in a fixed position."],
  ["React", "How do you optimize images in a React app?", "image-optimization", "Explain image optimization.", "Use modern formats like WebP. Use `srcSet` for responsive images. Lazy load images with `loading=\"lazy\"`. Use a CDN. In Next.js, use `next/image` for automatic optimization."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain React concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing React commands without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "react" },
    update: { name: "React", group: "Technology", description: "React interview questions." },
    create: { name: "React", slug: "react", group: "Technology", description: "React interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "react" } },
    update: {},
    create: { name: "React", slug: "react", categoryId: category.id },
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
        tags: ["React"],
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
        tags: ["React"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} React questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");