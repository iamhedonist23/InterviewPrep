// ---- 200+ TypeScript Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["TypeScript", "TypeScript"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["TypeScript", "What is TypeScript and what are its main features?", "typescript-overview", "Define TypeScript and list its key features.", "TypeScript is a strongly typed, object-oriented, compiled language that builds on JavaScript. It is a superset of JavaScript, adding static typing, interfaces, generics, enums, and advanced type features. Key features: static type checking, type inference, ES6+ support, tooling (autocompletion, refactoring), and compatibility with plain JavaScript."],
  ["TypeScript", "What is the difference between TypeScript and JavaScript?", "typescript-vs-javascript", "Compare TypeScript and JavaScript.", "JavaScript is a dynamically typed language; TypeScript adds static typing. TypeScript code is transpiled to JavaScript, so it runs wherever JavaScript runs. TypeScript provides better tooling, catches errors at compile time, and supports modern features with ES target compilation."],
  ["TypeScript", "How do you install and compile TypeScript?", "install-compile", "Explain installation and compilation.", "Install globally: `npm install -g typescript`. Compile: `tsc file.ts`. Use `tsc --watch` for watch mode. For projects, create `tsconfig.json` with `tsc --init`."],
  ["TypeScript", "What is a type annotation?", "type-annotation", "Explain type annotations.", "Type annotations are explicit declarations of the type of a variable, parameter, or return value. Example: `let name: string = \"John\";` They help the compiler enforce type safety."],
  ["TypeScript", "What is type inference?", "type-inference", "Explain type inference.", "TypeScript infers types when not explicitly annotated. It uses the initial value or usage context to determine the type. Example: `let x = 10;` infers `number`."],
  ["TypeScript", "What are the basic types in TypeScript?", "basic-types", "List primitive types.", "Basic types: `string`, `number`, `boolean`, `null`, `undefined`, `void`, `never`, `any`, `unknown`, `object`, `bigint`, `symbol`. Also arrays (`T[]` or `Array<T>`), tuples, enums."],
  ["TypeScript", "What is the `any` type and when should you use it?", "any-type", "Explain `any`.", "`any` disables type checking for a variable, allowing any value. Use it only when migrating from JS or when you truly don't know the type. Prefer `unknown` over `any` for type safety."],
  ["TypeScript", "What is the `unknown` type and how does it differ from `any`?", "unknown-vs-any", "Compare `unknown` and `any`.", "`unknown` is a safe counterpart of `any`. You cannot assign `unknown` to anything else without a type check (type narrowing). It forces validation before use. `any` bypasses all checks."],
  ["TypeScript", "What is the `void` type?", "void-type", "Explain `void`.", "`void` indicates that a function does not return a value. It's used for functions with no `return` or `return;`. Variables of type `void` can only be assigned `undefined` or `null`."],
  ["TypeScript", "What is the `never` type?", "never-type", "Explain `never`.", "`never` represents values that never occur. It is used for functions that throw an error or have infinite loops, and for type guards that exhaust all possibilities."],
  ["TypeScript", "What are union types?", "union-types", "Explain union types.", "A union type allows a value to be one of several types: `string | number`. Use type narrowing (e.g., `typeof`, `in`, `instanceof`) to work with specific members."],
  ["TypeScript", "What are intersection types?", "intersection-types", "Explain intersection types.", "An intersection type combines multiple types into one: `TypeA & TypeB`. The resulting object has all members from both types. Useful for mixing interfaces."],
  ["TypeScript", "What is type narrowing?", "type-narrowing", "Explain type narrowing.", "Type narrowing is the process of refining a variable's type within a conditional branch. TypeScript uses `typeof`, `instanceof`, `in`, truthiness, and user-defined type guards to narrow."],
  ["TypeScript", "What is a type guard?", "type-guard", "Explain type guards.", "A type guard is an expression that performs a runtime check to guarantee the type of a variable in a scope. Examples: `typeof`, `instanceof`, `in`, user-defined functions with `value is Type` return type."],
  ["TypeScript", "What is the `as` keyword for type assertions?", "as-keyword", "Explain type assertions.", "`as` is used to tell the compiler to treat a value as a specific type. Example: `let x = 'hello' as any;` or `let y = x as string;`. It does not change runtime behavior."],
  ["TypeScript", "What is the difference between `interface` and `type`?", "interface-vs-type", "Compare interface and type alias.", "Interfaces can be extended and implemented; type aliases can represent primitives, unions, tuples, etc. Interfaces are generally preferred for object types; type aliases for complex types. Both can be used similarly, but interfaces support declaration merging."],
  ["TypeScript", "What is an enum and how is it used?", "enum", "Explain enums.", "Enums define a set of named constants. Numeric enums auto-increment; string enums are more readable. Example: `enum Color { Red, Green, Blue }`. Use for fixed sets of values."],
  ["TypeScript", "What are literal types?", "literal-types", "Explain literal types.", "Literal types allow specifying exact values: `type Direction = 'up' | 'down' | 'left' | 'right'`. They are often used in union types with strings, numbers, or booleans."],
  ["TypeScript", "What is the `keyof` operator?", "keyof-operator", "Explain `keyof`.", "`keyof T` returns a union of string literal types that are the keys of type T. Useful for generics and type-safe property access."],
  ["TypeScript", "What is the `typeof` operator in TypeScript?", "typeof-operator-ts", "Explain `typeof`.", "In TypeScript, `typeof` can be used in a type context to capture the type of a variable or property: `type T = typeof obj;`. It is used for type inference from existing values."],

  // ==================== FUNCTIONS (15) ====================
  ["TypeScript", "How do you type function parameters and return types?", "function-typing", "Explain function type annotations.", "Parameters: `function greet(name: string): string { ... }`. Return type is optional but recommended. Arrow functions: `const add = (a: number, b: number): number => a + b;`"],
  ["TypeScript", "What are optional parameters?", "optional-parameters", "Explain optional parameters.", "Optional parameters are denoted with `?`: `function greet(name?: string) { ... }`. They must come after required parameters. Default parameters can also be used."],
  ["TypeScript", "What are rest parameters?", "rest-parameters", "Explain rest parameters.", "Rest parameters capture multiple arguments into an array: `function sum(...nums: number[]): number { ... }`. They must be the last parameter."],
  ["TypeScript", "What is function overloading?", "function-overloading", "Explain overloading.", "TypeScript supports overload signatures (multiple function type definitions) for a single implementation. Example: `function format(value: number): string; function format(value: string): string;` then implementation with `function format(value: any): string { ... }`."],
  ["TypeScript", "What is the `this` type and how do you handle it?", "this-type", "Explain `this` typing.", "You can specify the `this` context using a fake parameter: `function log(this: SomeClass) { ... }`. For callbacks, use arrow functions to preserve `this`, or use `this` parameter."],
  ["TypeScript", "What are call signatures in object types?", "call-signatures", "Explain call signatures.", "Call signatures define the signature of a function within an object type: `{ (x: number): string }`. Used for describing functions or constructors."],
  ["TypeScript", "What is the `Function` type?", "function-type", "Explain `Function`.", "`Function` is a global type that describes any function. It's not type-safe; prefer `(...args: any[]) => any` or a specific signature."],
  ["TypeScript", "What are generic functions?", "generic-functions", "Explain generics in functions.", "Generic functions allow working with a variety of types while maintaining type safety: `function identity<T>(arg: T): T { return arg; }`."],
  ["TypeScript", "What is the difference between `function` and `arrow function` in terms of `this`?", "function-vs-arrow-this", "Compare `this` binding.", "Regular functions have their own `this` that depends on how they are called. Arrow functions capture the `this` from the surrounding lexical scope. In TypeScript, you can annotate `this` for regular functions."],
  ["TypeScript", "How do you define a function type with multiple overloads?", "overloads-definition", "Explain overloads.", "Write multiple function signatures above the implementation, then the implementation signature must be compatible with all. The compiler selects the appropriate overload based on arguments."],
  ["TypeScript", "What are `void` and `never` as return types?", "void-never-return", "Explain return types.", "`void` means a function returns `undefined` or `null`; `never` means the function never returns (throws error or infinite loop). `void` functions can still return `undefined`."],
  ["TypeScript", "How do you use default parameters with types?", "default-parameters", "Explain default parameters.", "Default parameters can be typed: `function greet(name: string = 'World'): string { ... }`. The default value must match the type."],
  ["TypeScript", "What are type predicates in function return types?", "type-predicates", "Explain type predicates.", "A type predicate is a return type of `value is Type` used in type guard functions. Example: `function isString(value: any): value is string { return typeof value === 'string'; }`."],
  ["TypeScript", "What is the `parameters` utility type?", "parameters-type", "Explain `Parameters<T>`.", "`Parameters<T>` is a utility type that extracts the parameter types of a function type as a tuple: `type Params = Parameters<typeof myFunc>;`."],
  ["TypeScript", "What is the `ReturnType` utility type?", "returntype-type", "Explain `ReturnType<T>`.", "`ReturnType<T>` extracts the return type of a function type: `type Result = ReturnType<typeof myFunc>;`."],

  // ==================== INTERFACES & CLASSES (15) ====================
  ["TypeScript", "How do you define an interface?", "interface-definition", "Explain interface syntax.", "Use `interface Name { field: type; method(): void; }`. Interfaces can extend others with `extends`. They describe the shape of an object."],
  ["TypeScript", "What is the difference between an interface and a class?", "interface-vs-class", "Compare interface and class.", "An interface defines a contract (shape) without implementation. A class implements the contract and provides actual logic. Classes can implement interfaces."],
  ["TypeScript", "How do you implement an interface in a class?", "implement-interface", "Explain `implements`.", "Use `class MyClass implements MyInterface { ... }`. The class must provide all properties and methods declared in the interface."],
  ["TypeScript", "What are optional properties and readonly properties in interfaces?", "optional-readonly", "Explain optional and readonly.", "Optional: `field?: type;`. Readonly: `readonly field: type;`. Readonly properties cannot be changed after initialization."],
  ["TypeScript", "How do you define a class in TypeScript?", "class-definition-ts", "Explain class syntax.", "Classes: `class ClassName { property: type; constructor(prop: type) { ... } method() { ... } }`. Access modifiers: `public` (default), `private`, `protected`, `readonly`."],
  ["TypeScript", "What is the `private` keyword in TypeScript?", "private-keyword", "Explain `private`.", "`private` restricts access to the class itself. TypeScript's private is compile-time; it does not exist in JavaScript (unless using `#` for ES private fields)."],
  ["TypeScript", "What is the difference between `private` and `#` (ES private fields)?", "private-vs-hash", "Compare compile-time and runtime privacy.", "TypeScript `private` is a compile-time check; `#` is a true private field in JavaScript (ES2022) that is enforced at runtime. Use `#` for runtime privacy."],
  ["TypeScript", "What are abstract classes?", "abstract-classes", "Explain abstract classes.", "Abstract classes cannot be instantiated directly. They can have abstract methods (without implementation) that must be implemented by subclasses. Use `abstract` keyword."],
  ["TypeScript", "What is the `super` keyword?", "super-keyword", "Explain `super`.", "`super` is used to call the constructor or methods of the parent class. In a derived class constructor, `super()` must be called before using `this`."],
  ["TypeScript", "How does inheritance work in TypeScript?", "inheritance", "Explain inheritance.", "Use `extends` to inherit from a base class. Subclasses can override methods, call parent with `super`. Typescript supports single inheritance."],
  ["TypeScript", "What are static properties and methods?", "static-members", "Explain static members.", "Static members belong to the class itself, not instances. Declared with `static`. Accessed via `ClassName.property`."],
  ["TypeScript", "What is the `this` type in a class?", "this-type-class", "Explain polymorphic `this`.", "In a class, `this` can be used as a type to refer to the current class type. It allows fluent interfaces and polymorphic return types."],
  ["TypeScript", "What are index signatures in interfaces?", "index-signatures", "Explain index signatures.", "Index signatures define properties that can be accessed using a string or number: `{ [key: string]: type }`. They allow flexible property names."],
  ["TypeScript", "What is declaration merging for interfaces?", "declaration-merging", "Explain merging.", "TypeScript merges multiple interface declarations with the same name into one. This is useful for extending existing types (e.g., augmenting global types)."],
  ["TypeScript", "How do you use `implements` vs `extends`?", "implements-vs-extends", "Compare the two.", "`extends` is used for class inheritance (subclassing). `implements` is used for class to implement an interface. A class can extend one class and implement multiple interfaces."],

  // ==================== GENERICS (15) ====================
  ["TypeScript", "What are generics and why are they useful?", "generics-overview", "Explain generics.", "Generics allow creating reusable components that work with a variety of types, while preserving type safety. They enable creating components that are both flexible and type-safe."],
  ["TypeScript", "How do you write a generic function?", "generic-function", "Show generic function syntax.", "`function identity<T>(arg: T): T { return arg; }`. You can call with explicit type `identity<number>(5)` or let TypeScript infer."],
  ["TypeScript", "What are generic constraints?", "generic-constraints", "Explain constraints.", "Constraints restrict the types that a generic can accept. Use `extends` keyword: `function f<T extends SomeType>(arg: T) { ... }`. It ensures T has certain properties."],
  ["TypeScript", "How do you use multiple type parameters?", "multiple-type-params", "Explain multiple generics.", "`function swap<T, U>(a: T, b: U): [U, T] { return [b, a]; }`."],
  ["TypeScript", "What are generic interfaces?", "generic-interfaces", "Explain generic interfaces.", "Interfaces can be generic: `interface Box<T> { value: T; }`. Implementations can specify the type."],
  ["TypeScript", "What are generic classes?", "generic-classes", "Explain generic classes.", "Classes can be generic: `class Container<T> { private data: T; constructor(value: T) { this.data = value; } }`."],
  ["TypeScript", "What is the `keyof` constraint with generics?", "keyof-generic", "Explain `keyof` in generics.", "You can use `keyof` to constrain a generic type to keys of another type: `function getProperty<T, K extends keyof T>(obj: T, key: K) { return obj[key]; }`."],
  ["TypeScript", "What are generic type aliases?", "generic-type-aliases", "Explain generic type aliases.", "Type aliases can be generic: `type Box<T> = { value: T };`."],
  ["TypeScript", "What is the `infer` keyword in conditional types?", "infer-keyword", "Explain `infer`.", "`infer` is used in conditional types to infer a type variable: `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`."],
  ["TypeScript", "What are mapped types with generics?", "mapped-types", "Explain mapped types.", "Mapped types transform existing types: `type Readonly<T> = { readonly [P in keyof T]: T[P] };`. They leverage generics and `keyof`."],
  ["TypeScript", "What are conditional types?", "conditional-types", "Explain conditional types.", "Conditional types select a type based on a condition: `T extends U ? X : Y`. They are often used with `infer` for advanced type manipulations."],
  ["TypeScript", "What is the `instanceof` type guard with generics?", "instanceof-generic", "Explain `instanceof`.", "`instanceof` is used to narrow types, but with generics, it's often used to check instances of classes. It is a runtime check."],
  ["TypeScript", "How do you use generics with `extends` in class inheritance?", "generic-class-extends", "Explain extending generic classes.", "You can extend a generic class: `class MyClass<T> extends BaseClass<T> { ... }`. The derived class can fix or propagate the type parameter."],
  ["TypeScript", "What is the difference between generic functions and union types?", "generic-vs-union", "Compare generics and unions.", "Generics capture the actual type used, preserving the relationship between arguments and return. Unions allow only common behavior; generics are more precise."],
  ["TypeScript", "What are higher-order types with generics?", "higher-order-types", "Explain higher-order types.", "Higher-order types are types that take other types as parameters, often using generics. They are used to create new types from existing ones (e.g., `Partial<T>`, `Readonly<T>`)."],

  // ==================== ADVANCED TYPES (15) ====================
  ["TypeScript", "What are utility types? Give examples.", "utility-types", "Explain utility types.", "Utility types are built-in types that transform other types: `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<T>`, `Parameters<T>`, `Record<K, T>`."],
  ["TypeScript", "What is `Partial<T>`?", "partial-type", "Explain `Partial`.", "`Partial<T>` makes all properties in T optional. Useful for update operations."],
  ["TypeScript", "What is `Pick<T, K>`?", "pick-type", "Explain `Pick`.", "`Pick<T, K>` constructs a type by picking a set of properties K from T."],
  ["TypeScript", "What is `Omit<T, K>`?", "omit-type", "Explain `Omit`.", "`Omit<T, K>` constructs a type by removing properties K from T. It's the opposite of Pick."],
  ["TypeScript", "What is `Record<K, T>`?", "record-type", "Explain `Record`.", "`Record<K, T>` creates an object type with keys K and values T. Example: `Record<string, number>`."],
  ["TypeScript", "What is `Exclude<T, U>`?", "exclude-type", "Explain `Exclude`.", "`Exclude<T, U>` excludes types in U from T."],
  ["TypeScript", "What is `Extract<T, U>`?", "extract-type", "Explain `Extract`.", "`Extract<T, U>` extracts types that are assignable to U from T."],
  ["TypeScript", "What is `NonNullable<T>`?", "nonnullable-type", "Explain `NonNullable`.", "`NonNullable<T>` removes `null` and `undefined` from T."],
  ["TypeScript", "What are tuple types?", "tuple-types", "Explain tuples.", "Tuples are fixed-length arrays with specific types: `[string, number]`. They can be read-only: `readonly [string, number]`. Also, optional elements and rest elements are supported."],
  ["TypeScript", "What are const assertions?", "const-assertions", "Explain `as const`.", "`as const` tells TypeScript to infer the narrowest type (literal) for a value. It makes objects readonly, arrays tuples, and string literals literal types."],
  ["TypeScript", "What are template literal types?", "template-literal-types", "Explain template literal types.", "Template literal types are string literal types based on template strings: `type Greeting = `Hello ${string}`;`. They can be used with unions for pattern matching."],
  ["TypeScript", "What are conditional types with `infer`?", "infer-conditional", "Explain `infer` in conditional types.", "`infer` allows you to extract a type variable from a type. Example: `type ElementType<T> = T extends (infer U)[] ? U : never;`."],
  ["TypeScript", "What are distributive conditional types?", "distributive-conditional", "Explain distributivity.", "Conditional types distribute over union types if the checked type is a bare type parameter. Example: `T extends U ? X : Y` with T being a union."],
  ["TypeScript", "What are mapped type modifiers?", "mapped-modifiers", "Explain modifiers.", "Mapped types can add `readonly` or `?` modifiers, or remove them using `-readonly` or `-?`. Example: `{ -readonly [P in keyof T]: T[P] }` removes readonly."],
  ["TypeScript", "What is the `unique symbol` type?", "unique-symbol", "Explain `unique symbol`.", "`unique symbol` is a primitive type that represents a unique symbol. It can only be created with `Symbol()`. Used for nominal typing."],

  // ==================== MODULES & NAMESPACES (10) ====================
  ["TypeScript", "How do you export and import in TypeScript?", "export-import", "Explain module syntax.", "Use `export` and `import`. ES modules: `export const x = 1; import { x } from './module';`. Also `export default`. TypeScript supports ES modules and CommonJS."],
  ["TypeScript", "What is the difference between `export =` and `export default`?", "export-vs-default", "Compare module exports.", "`export default` exports a single value as default import. `export =` is for CommonJS compatibility; it exports the entire module object. Usually `export default` is preferred."],
  ["TypeScript", "What are ambient declarations (declare)?", "ambient-declarations", "Explain `declare`.", "`declare` is used to define variables, functions, or modules that are provided by the runtime environment. It tells TypeScript to expect them but not emit code."],
  ["TypeScript", "What are `.d.ts` files?", "dts-files", "Explain declaration files.", "`.d.ts` files are declaration files containing type information only. They are used to describe the shape of existing JavaScript libraries. They don't contain implementation."],
  ["TypeScript", "What is `@types`?", "types-packages", "Explain `@types`.", "`@types` are packages from DefinitelyTyped containing type definitions for JavaScript libraries. Install with `npm install @types/library`."],
  ["TypeScript", "What is a namespace in TypeScript?", "namespace", "Explain namespaces.", "Namespaces are internal modules used to group related code and avoid naming collisions. They are older and less used now; prefer ES modules."],
  ["TypeScript", "What is the difference between a namespace and a module?", "namespace-vs-module", "Compare namespace and module.", "Namespaces are TypeScript-specific and compile to IIFEs; modules are ES standard and are file-based. Modules are recommended for modern code."],
  ["TypeScript", "How do you use external modules with TypeScript?", "external-modules", "Explain module resolution.", "TypeScript supports `node` and `classic` module resolution. With Node.js, it looks for `node_modules`. Use `module: commonjs` or `esnext` in tsconfig."],
  ["TypeScript", "What is the `resolveJsonModule` option?", "resolve-json", "Explain JSON imports.", "`resolveJsonModule` allows importing JSON files as modules: `import data from './data.json';`. Must also enable `esModuleInterop`."],
  ["TypeScript", "What are path aliases in TypeScript?", "path-aliases", "Explain path mapping.", "In `tsconfig.json`, you can define `paths` to map import paths: `\"@/*\": [\"src/*\"]`. Requires `baseUrl`. Useful for avoiding relative imports."],

  // ==================== CONFIGURATION & COMPILER (10) ====================
  ["TypeScript", "What is `tsconfig.json` and what are its common options?", "tsconfig", "Explain configuration file.", "`tsconfig.json` is the configuration file for TypeScript projects. Common options: `compilerOptions` (target, module, strict, outDir, rootDir, esModuleInterop, etc.), `include`, `exclude`, `extends`."],
  ["TypeScript", "What is the `strict` flag?", "strict-flag", "Explain `strict`.", "`strict` enables a set of strict type-checking options: `noImplicitAny`, `noImplicitThis`, `strictNullChecks`, `strictFunctionTypes`, `strictPropertyInitialization`, etc. Recommended for new projects."],
  ["TypeScript", "What is `strictNullChecks`?", "strict-null-checks", "Explain `strictNullChecks`.", "When enabled, `null` and `undefined` are not assignable to other types unless explicitly allowed (e.g., `string | null`). It prevents many runtime errors."],
  ["TypeScript", "What is `noImplicitAny`?", "no-implicit-any", "Explain `noImplicitAny`.", "`noImplicitAny` raises an error when TypeScript cannot infer a type and uses `any` implicitly. Encourages explicit typing."],
  ["TypeScript", "What are the `target` and `module` options?", "target-module", "Explain target and module.", "`target` specifies the JavaScript language version (e.g., ES5, ES2015). `module` specifies the module system (e.g., CommonJS, ES2015, ESNext)."],
  ["TypeScript", "What is the `outDir` and `rootDir`?", "outdir-rootdir", "Explain output directories.", "`outDir` is the output directory for compiled JavaScript files. `rootDir` is the root directory of input files. They help structure the output."],
  ["TypeScript", "What is the `sourceMap` option?", "sourcemap", "Explain source maps.", "`sourceMap` generates `.map` files that map the JavaScript back to the original TypeScript source for debugging."],
  ["TypeScript", "What are `lib` options?", "lib-options", "Explain libs.", "`lib` specifies the standard library definitions to include (e.g., `[\"dom\", \"es2015\"]`). This affects available global types."],
  ["TypeScript", "What is the `types` and `typeRoots` options?", "types-roots", "Explain type definitions.", "`typeRoots` specifies directories where TypeScript looks for type definitions. `types` specifies which type definition packages to include."],
  ["TypeScript", "How do you exclude files from compilation?", "exclude-files", "Explain `exclude`.", "Use `exclude` in `tsconfig.json` to ignore files or folders. Alternatively, use `skipLibCheck` to skip type checking of declaration files."],

  // ==================== TOOLING & LINTING (10) ====================
  ["TypeScript", "What is TSLint and how does it differ from ESLint?", "tslint-vs-eslint", "Compare linters.", "TSLint is deprecated; ESLint with `@typescript-eslint` is the recommended linter for TypeScript. ESLint offers more rules, better performance, and supports JavaScript as well."],
  ["TypeScript", "How do you set up ESLint with TypeScript?", "eslint-setup", "Explain ESLint configuration.", "Install `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`. Extend `plugin:@typescript-eslint/recommended` in ESLint config. Use with `eslint` command."],
  ["TypeScript", "What is Prettier and how does it integrate with TypeScript?", "prettier", "Explain Prettier.", "Prettier is an opinionated code formatter. It supports TypeScript out of the box. Used with ESLint to format and lint code."],
  ["TypeScript", "What is the TypeScript compiler API?", "compiler-api", "Explain the compiler API.", "The compiler API allows programmatic interaction with TypeScript, enabling custom transformers, linters, and code generation tools. It's used by tools like `ts-morph`."],
  ["TypeScript", "What is `ts-node`?", "ts-node", "Explain ts-node.", "`ts-node` is a runtime for TypeScript that executes `.ts` files directly without pre-compilation. Useful for development and scripts."],
  ["TypeScript", "What is `tsc --watch`?", "watch-mode", "Explain watch mode.", "`tsc --watch` runs the compiler in watch mode, recompiling on file changes. Speeds up development."],
  ["TypeScript", "What is the `--noEmit` option?", "noemit", "Explain `--noEmit`.", "`--noEmit` tells the compiler to not emit any output (no .js files). Useful for type checking only, e.g., in CI."],
  ["TypeScript", "What is `typescript-eslint`?", "typescript-eslint", "Explain the tool.", "`typescript-eslint` is a monorepo that provides a parser (`@typescript-eslint/parser`) and a plugin (`@typescript-eslint/eslint-plugin`) for running ESLint on TypeScript code."],
  ["TypeScript", "What is `ts-morph`?", "ts-morph", "Explain ts-morph.", "`ts-morph` is a wrapper around the TypeScript compiler API that simplifies AST manipulation. Useful for code generation and refactoring."],
  ["TypeScript", "What is the difference between `type` and `interface` in terms of performance?", "type-vs-interface-performance", "Compare performance.", "Both are compile-time constructs; runtime performance is identical. However, interfaces are generally faster to check and may be more efficient for large types."],

  // ==================== DECORATORS (5) ====================
  ["TypeScript", "What are decorators in TypeScript?", "decorators", "Explain decorators.", "Decorators are a special declaration that can be attached to classes, methods, properties, or parameters. They are functions that modify or enhance the behavior of the target. Decorators are experimental and require `experimentalDecorators` flag."],
  ["TypeScript", "What are the types of decorators?", "decorator-types", "List decorator types.", "Class decorators, Method decorators, Property decorators, Parameter decorators, and Accessor decorators. Each receives different arguments."],
  ["TypeScript", "How do you use a class decorator?", "class-decorator", "Explain class decorator.", "A class decorator is applied to the constructor. It can be used to modify the class, add properties, or wrap the constructor. Example: `@sealed class MyClass { ... }`."],
  ["TypeScript", "What is the `experimentalDecorators` flag?", "experimental-decorators", "Explain the flag.", "Decorators are a Stage 3 proposal; TypeScript requires `experimentalDecorators: true` in tsconfig to enable them. They are used in frameworks like Angular and NestJS."],
  ["TypeScript", "What is the difference between a decorator and a mixin?", "decorator-vs-mixin", "Compare the two.", "A decorator enhances a class (or member) declaratively. A mixin is a pattern to compose classes by combining behaviors. Decorators can be used to implement mixins in TypeScript."],

  // ==================== REACT WITH TYPESCRIPT (10) ====================
  ["TypeScript", "How do you type React functional components?", "react-fc", "Explain typing components.", "Use `React.FC<Props>` or `const MyComponent: React.FC<Props> = (props) => { ... }`. Alternatively, define `function MyComponent(props: Props): JSX.Element`. Use `children` type if needed."],
  ["TypeScript", "How do you type `useState`?", "usestate-ts", "Explain useState typing.", "TypeScript infers state type from initial value. For empty initial values, use generics: `const [state, setState] = useState<string | null>(null);`."],
  ["TypeScript", "How do you type `useEffect`?", "useeffect-ts", "Explain useEffect typing.", "`useEffect` accepts a function and a dependency array. TypeScript infers the return type as `void` or a cleanup function. Use `useEffect(() => { ... }, [deps])`."],
  ["TypeScript", "How do you type events in React?", "react-events", "Explain event typing.", "Use React event types: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`, `React.FormEvent<HTMLFormElement>`, etc."],
  ["TypeScript", "How do you type props with children?", "children-prop", "Explain children typing.", "Use `React.PropsWithChildren<Props>` or explicitly `children?: React.ReactNode`. For required children, use `React.PropsWithChildren<Props>` with required children."],
  ["TypeScript", "How do you type custom hooks?", "custom-hooks-ts", "Explain typing hooks.", "Custom hooks are functions that return values. Type the return type explicitly. Use generics if the hook is generic."],
  ["TypeScript", "How do you type React Context?", "context-ts", "Explain Context typing.", "Create context with `createContext<MyType>(defaultValue)`. Use `useContext<MyType>(MyContext)`. Provider expects the correct type."],
  ["TypeScript", "How do you type `useReducer`?", "usereducer-ts", "Explain useReducer typing.", "`useReducer` takes a reducer function with a defined state and action type. Use discriminated unions for actions. Example: `type Action = { type: 'increment' } | { type: 'decrement' }`."],
  ["TypeScript", "How do you type `useRef`?", "useref-ts", "Explain useRef typing.", "For DOM refs: `useRef<HTMLInputElement>(null)`. For mutable values: `useRef<number>(0)`."],
  ["TypeScript", "How do you use React with TypeScript for third-party libraries?", "react-third-party", "Explain library types.", "Most libraries have `@types` or built-in types. Use `@types/react`, `@types/react-dom`, etc. For missing types, declare modules with `declare module 'lib'`."],

  // ==================== SCENARIO-BASED (20) ====================
  ["TypeScript", "How would you type a function that accepts a key and returns a value from an object?", "typed-key-access", "Explain typing dynamic property access.", "Use generics and `keyof`: `function getValue<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }`."],
  ["TypeScript", "How would you type a function that merges two objects?", "merge-function", "Explain typing merge.", "Use intersection: `function merge<T, U>(a: T, b: U): T & U { return { ...a, ...b }; }`."],
  ["TypeScript", "How would you type a Redux action creator?", "redux-action-ts", "Explain typing actions.", "Use discriminated unions for actions: `type Action = { type: 'ADD'; payload: number } | { type: 'REMOVE'; id: string }`. Action creators return typed actions."],
  ["TypeScript", "How would you handle a function that may return a value or throw an error?", "result-type", "Explain typing fallible operations.", "Use union types: `function risky(): Result | Error`. Or use `try/catch`. In functional style, use `Either` or `Option` types."],
  ["TypeScript", "How would you type a class that can be instantiated with different types?", "generic-class-scenario", "Explain generic class scenario.", "Use a generic class: `class Container<T> { private data: T; constructor(data: T) { this.data = data; } get(): T { return this.data; } }`."],
  ["TypeScript", "How would you type an API response with unknown structure?", "api-response-ts", "Explain typing unknown responses.", "Use `unknown` and validate with type guards or Zod, Yup, etc. Example: `function isUser(data: any): data is User { ... }`."],
  ["TypeScript", "How would you type a configuration object with optional and required properties?", "config-object", "Explain optional/required typing.", "Use `interface Config { required: string; optional?: number; }`. Use `Partial<Config>` for partial updates."],
  ["TypeScript", "How would you type a higher-order component (HOC) in React?", "hoc-ts", "Explain typing HOCs.", "Use generics: `function withLoading<T extends object>(Component: React.ComponentType<T>): React.FC<T & { loading?: boolean }> { ... }`."],
  ["TypeScript", "How would you implement a type-safe event emitter?", "event-emitter", "Explain event emitter typing.", "Use generics with mapped types: `type Events = { 'click': (arg: number) => void; ... }`. Emitter: `on<K extends keyof Events>(event: K, handler: Events[K])`."],
  ["TypeScript", "How would you type a polymorphic component in React?", "polymorphic-component", "Explain polymorphic component typing.", "Use generics for the element type: `interface Props<T extends React.ElementType> { as?: T; children: React.ReactNode; }`. Use `React.ComponentPropsWithoutRef<T>` to merge props."],
  ["TypeScript", "How would you type a function that filters an array and returns the filtered type?", "filter-type", "Explain filter typing.", "Use type guard in filter: `array.filter((item): item is Type => condition)`. This narrows the result type."],
  ["TypeScript", "How would you type a deep readonly object?", "deep-readonly", "Explain deep readonly.", "Use mapped types recursively: `type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]>; }`."],
  ["TypeScript", "How would you type a function that wraps another function and adds logging?", "wrapper-function", "Explain logging wrapper.", "Use generics: `function log<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> { ... }`."],
  ["TypeScript", "How would you type a dictionary with specific keys and values?", "dictionary-type", "Explain dictionary typing.", "Use `Record<string, number>` or `{ [key: string]: number }`. For fixed keys, use `{ key1: number; key2: number }`."],
  ["TypeScript", "How would you handle circular dependencies in types?", "circular-types", "Explain circular typing.", "Use interfaces recursively: `interface Node { children: Node[]; }`. Or use `type` with object."],
  ["TypeScript", "How would you type a function that takes a tuple and returns the same tuple?", "tuple-return", "Explain tuple function typing.", "Use generic tuple type: `function reverse<T extends [any, ...any[]]>(tuple: T): T { return tuple.reverse() as T; }`."],
  ["TypeScript", "How would you type a dynamic import?", "dynamic-import", "Explain dynamic import typing.", "`const module = await import('./module')` returns a promise. TypeScript infers the module type. Use `typeof import('./module')` for the type."],
  ["TypeScript", "How would you type a function with a variable number of arguments of the same type?", "rest-args-typing", "Explain rest arguments.", "Use rest parameters: `function sum(...nums: number[]): number { ... }`. For arbitrary tuple, use generic."],
  ["TypeScript", "How would you handle migrating a JavaScript project to TypeScript?", "migration-strategy", "Explain migration.", "Start with `tsconfig.json` with `allowJs: true`, `checkJs: false`. Gradually convert files. Enable strict options incrementally. Use `any` temporarily. Add `@ts-check` for JSDoc."],
  ["TypeScript", "How would you type a utility that extracts the value type of a promise?", "promise-value", "Explain extracting promise type.", "Use conditional types: `type Awaited<T> = T extends Promise<infer U> ? U : T;`. (Built-in in ES2022: `Awaited<T>`)."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain TypeScript concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing TypeScript commands without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "typescript" },
    update: { name: "TypeScript", group: "Technology", description: "TypeScript interview questions." },
    create: { name: "TypeScript", slug: "typescript", group: "Technology", description: "TypeScript interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "typescript" } },
    update: {},
    create: { name: "TypeScript", slug: "typescript", categoryId: category.id },
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
        tags: ["TypeScript"],
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
        tags: ["TypeScript"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} TypeScript questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");