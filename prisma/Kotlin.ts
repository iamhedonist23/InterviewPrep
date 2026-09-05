// ---- 200+ Kotlin Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["Kotlin", "Kotlin"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["Kotlin", "What is Kotlin and what are its main features?", "kotlin-overview", "Define Kotlin and list its key features.", "Kotlin is a modern, statically typed programming language developed by JetBrains. It is fully interoperable with Java and runs on the JVM. Key features: concise syntax, null safety (nullability in type system), extension functions, data classes, coroutines for concurrency, smart casts, and functional programming support."],
  ["Kotlin", "How does Kotlin differ from Java?", "kotlin-vs-java", "Compare Kotlin and Java.", "Kotlin is more concise (less boilerplate), null-safe by default, supports coroutines for async, extension functions, smart casts, and has a more modern type system. Java is more verbose, has checked exceptions, and older. Both are interoperable."],
  ["Kotlin", "How do you declare variables in Kotlin?", "variable-declaration", "Explain variable declaration.", "Use `val` for immutable (read-only) variables, and `var` for mutable. Kotlin infers the type, but you can explicitly specify: `val name: String = \"John\"`. Immutability is recommended."],
  ["Kotlin", "What is type inference in Kotlin?", "type-inference", "Explain type inference.", "Kotlin can infer the type of a variable from its initializer. Example: `val x = 10` infers `Int`. This reduces verbosity."],
  ["Kotlin", "What are the basic data types in Kotlin?", "basic-types", "List Kotlin data types.", "Numbers: Int, Long, Double, Float, Short, Byte. Other: Char, Boolean, String, Unit (void), Any (like Object), Nothing (no value)."],
  ["Kotlin", "What is the `Any` type?", "any-type", "Explain `Any`.", "`Any` is the root of the Kotlin class hierarchy (like `Object` in Java). All classes inherit from `Any`."],
  ["Kotlin", "What is the `Unit` type?", "unit-type", "Explain `Unit`.", "`Unit` is a type that represents the absence of a meaningful value. It is used as the return type of functions that don't return anything (like `void` in Java). It has exactly one value: `Unit`."],
  ["Kotlin", "What is the `Nothing` type?", "nothing-type", "Explain `Nothing`.", "`Nothing` is a type that has no values. It is used for functions that never return (e.g., `throw` expression). It is a subtype of all types."],
  ["Kotlin", "What is null safety in Kotlin?", "null-safety", "Explain null safety.", "Kotlin's type system distinguishes nullable and non-nullable types. By default, types are non-nullable (e.g., `String`). To allow null, use `?` (e.g., `String?`). The compiler enforces null checks."],
  ["Kotlin", "What are safe call operators (`?.`) and Elvis operator (`?:`)?", "safe-call-elvis", "Explain null-handling operators.", "`?.` safely accesses a member of a nullable object; returns null if the object is null. `?:` (Elvis) returns the left side if non-null, else the right side. Example: `val length = str?.length ?: 0`."],
  ["Kotlin", "What is the `!!` operator?", "not-null-assertion", "Explain `!!`.", "`!!` is the not-null assertion operator. It forces a nullable expression to be non-null, throwing a `NullPointerException` if it is null. Should be used sparingly."],
  ["Kotlin", "What is a string template in Kotlin?", "string-templates", "Explain string interpolation.", "String templates allow embedding expressions inside strings using `$` for simple variables and `${}` for expressions. Example: `\"Hello $name\"`."],
  ["Kotlin", "How do you create a range in Kotlin?", "ranges", "Explain ranges.", "Use `..` to create a range: `1..10`. Also use `downTo`, `step`, `until`. Ranges are used in loops and checks (`in`)."],
  ["Kotlin", "What is the `when` expression?", "when-expression", "Explain `when`.", "`when` is a powerful control-flow expression (like `switch` but more flexible). It can check types, conditions, and ranges. It can be used as an expression or statement."],
  ["Kotlin", "What is the difference between `==` and `===` in Kotlin?", "equals-vs-references", "Compare structural and referential equality.", "`==` checks structural equality (calls `equals()`). `===` checks referential equality (same object reference). For primitives, `===` works like `==`."],
  ["Kotlin", "What are smart casts?", "smart-casts", "Explain smart casts.", "Kotlin automatically casts a variable when you check its type with `is` (or `!is`). For example, after `if (x is String)`, `x` is treated as `String` in the block."],
  ["Kotlin", "How do you handle exceptions in Kotlin?", "exception-handling", "Explain exception handling.", "Use `try`, `catch`, `finally`. All exceptions are unchecked. Kotlin does not have checked exceptions. You can also use `try` as an expression."],
  ["Kotlin", "What are annotations in Kotlin?", "annotations", "Explain annotations.", "Annotations are metadata attached to code. Use `@` prefix. Kotlin supports custom annotations and has predefined ones: `@Deprecated`, `@JvmStatic`, `@JvmOverloads`, etc."],
  ["Kotlin", "What is a package in Kotlin?", "packages", "Explain packages.", "Kotlin files begin with `package` declaration. Packages organize code and control visibility. They are similar to Java packages."],
  ["Kotlin", "What is the `import` keyword used for?", "import", "Explain imports.", "`import` is used to bring types, functions, or properties from other packages into the current file. Kotlin also supports `import` aliases (`as`)."],

  // ==================== OOP (20) ====================
  ["Kotlin", "How do you define a class in Kotlin?", "class-definition", "Explain class syntax.", "Use `class` keyword followed by the class name. The primary constructor is defined in the class header: `class Person(val name: String, var age: Int)`. It can have properties and methods."],
  ["Kotlin", "What is a primary constructor?", "primary-constructor", "Explain primary constructor.", "The primary constructor is declared in the class header. It can have default values and visibility modifiers. The init block runs after the primary constructor."],
  ["Kotlin", "What is a secondary constructor?", "secondary-constructor", "Explain secondary constructor.", "Secondary constructors are defined with `constructor` keyword inside the class body. They must delegate to the primary constructor (using `this`) if one exists."],
  ["Kotlin", "What is an `init` block?", "init-block", "Explain `init`.", "An `init` block is executed when an instance is created, after the primary constructor. It can contain initialization logic and property checks."],
  ["Kotlin", "What are properties in Kotlin?", "properties", "Explain properties.", "Properties are fields with getters and setters. Declared with `val` (read-only) or `var` (mutable). They are accessed using dot notation. You can customize getters and setters."],
  ["Kotlin", "What is a data class?", "data-class", "Explain data class.", "A data class is a class that primarily holds data. It automatically generates `toString`, `equals`, `hashCode`, `copy`, and component functions. Declared with `data class User(val name: String, val age: Int)`."],
  ["Kotlin", "What is a sealed class?", "sealed-class", "Explain sealed class.", "A sealed class restricts subclasses to a known set. It is used for representing restricted hierarchies (e.g., state). Use `sealed class` and declare subclasses in the same file."],
  ["Kotlin", "What is an enum class?", "enum-class", "Explain enum class.", "Enum classes represent a fixed set of constants. They can have properties and methods. Example: `enum class Color { RED, GREEN, BLUE }`."],
  ["Kotlin", "What is an object declaration (singleton)?", "object-declaration", "Explain object.", "An object is a singleton instance. It is declared with `object` keyword. Example: `object AppConfig { val version = \"1.0\" }`. Access via `AppConfig.version`."],
  ["Kotlin", "What is a companion object?", "companion-object", "Explain companion object.", "A companion object is a singleton object inside a class, used to hold static members. It is declared with `companion object`. It can have properties and methods."],
  ["Kotlin", "What is the difference between `object` and `companion object`?", "object-vs-companion", "Compare singleton and static.", "`object` is a top-level singleton. `companion object` is a singleton tied to a specific class, providing static-like members for that class."],
  ["Kotlin", "What is inheritance in Kotlin?", "inheritance", "Explain inheritance.", "Kotlin uses `open` modifier for classes and methods to allow inheritance. Use `:` to inherit: `class Dog : Animal()`. Classes are final by default."],
  ["Kotlin", "What is the `abstract` keyword?", "abstract-keyword", "Explain abstract classes.", "An abstract class cannot be instantiated. It may have abstract methods (without implementation). Declared with `abstract`."],
  ["Kotlin", "What is an interface in Kotlin?", "interface", "Explain interfaces.", "An interface defines a contract with methods and properties. It can have default implementations (since Kotlin 1.3). Classes can implement multiple interfaces."],
  ["Kotlin", "What is the difference between an interface and an abstract class?", "interface-vs-abstract", "Compare interface and abstract class.", "Interfaces can have properties but no state (no backing fields). Abstract classes can hold state. Classes can implement multiple interfaces but extend only one abstract class."],
  ["Kotlin", "What is the `override` keyword?", "override", "Explain override.", "`override` is used to indicate that a method or property overrides a superclass or implements an interface. It is mandatory in Kotlin."],
  ["Kotlin", "What is the `super` keyword?", "super-keyword-kotlin", "Explain `super`.", "`super` is used to access superclass members. It can also be used with generics (`super<T>`)."],
  ["Kotlin", "What is a visibility modifier in Kotlin?", "visibility-modifiers", "List visibility modifiers.", "`private` (class only), `protected` (class and subclasses), `internal` (module-wide), `public` (everywhere). Default is `public`."],
  ["Kotlin", "What is the `lateinit` keyword?", "lateinit", "Explain `lateinit`.", "`lateinit` is used for non-nullable properties that are initialized after the constructor (e.g., dependency injection). It must be `var` and cannot be primitive."],
  ["Kotlin", "What is the `by` keyword used for?", "by-keyword", "Explain `by`.", "`by` is used for delegation (property delegation and class delegation). It enables the delegate pattern, e.g., `class MyList<T>(impl: MutableList<T> = mutableListOf()) : MutableList<T> by impl`."],

  // ==================== FUNCTIONS & LAMBDAS (20) ====================
  ["Kotlin", "How do you define a function in Kotlin?", "function-definition", "Explain function syntax.", "Use `fun` keyword: `fun add(a: Int, b: Int): Int = a + b`. Functions can be top-level, not just inside classes."],
  ["Kotlin", "What are default and named arguments?", "default-named-arguments", "Explain default and named arguments.", "Default arguments allow you to omit parameters: `fun greet(name: String = \"World\")`. Named arguments allow you to specify argument names: `greet(name = \"John\")`."],
  ["Kotlin", "What are varargs (variable-length arguments)?", "varargs", "Explain varargs.", "Use `vararg` keyword to pass a variable number of arguments. Inside the function, they are treated as an array. Example: `fun sum(vararg numbers: Int): Int { ... }`."],
  ["Kotlin", "What is an infix function?", "infix-function", "Explain infix functions.", "An infix function is called using infix notation (without dot and parentheses). It must be a member or extension function with one parameter. Example: `infix fun Int.add(x: Int) = this + x`; then `1 add 2`."],
  ["Kotlin", "What is an extension function?", "extension-function", "Explain extension functions.", "Extension functions add new functionality to existing classes without inheritance. Example: `fun String.reverse(): String = this.reversed()`."],
  ["Kotlin", "What is a higher-order function?", "higher-order-function", "Explain higher-order functions.", "A higher-order function takes a function as a parameter or returns a function. Kotlin supports functional programming with these: `fun repeat(times: Int, action: (Int) -> Unit) { ... }`."],
  ["Kotlin", "What is a lambda expression?", "lambda", "Explain lambdas.", "A lambda is an anonymous function: `{ x, y -> x + y }`. It can be passed to higher-order functions."],
  ["Kotlin", "What is the difference between a lambda and an anonymous function?", "lambda-vs-anonymous", "Compare lambda and anonymous function.", "Both are function literals. Lambdas cannot specify return type (inferred) and use `->`. Anonymous functions allow explicit return type and `return` statements."],
  ["Kotlin", "What is the `it` keyword in lambdas?", "it-keyword", "Explain `it`.", "When a lambda has a single parameter, you can omit the parameter and use `it` as the implicit name. Example: `list.filter { it > 0 }`."],
  ["Kotlin", "What is a suspend function?", "suspend-function", "Explain suspend functions.", "A suspend function is a function that can be paused and resumed, used in coroutines. It is marked with `suspend` and can be called only from a coroutine or another suspend function."],
  ["Kotlin", "What are inline functions and when to use them?", "inline-functions", "Explain inline functions.", "`inline` functions are expanded at the call site, reducing overhead for lambdas. Useful for high-order functions to avoid object allocation. Example: `inline fun repeat(times: Int, action: (Int) -> Unit)`."],
  ["Kotlin", "What is the `noinline` modifier?", "noinline", "Explain `noinline`.", "When an inline function has multiple lambda parameters, you can mark some as `noinline` to prevent them from being inlined."],
  ["Kotlin", "What is the `crossinline` modifier?", "crossinline", "Explain `crossinline`.", "`crossinline` ensures that a lambda passed to an inline function does not return non-locally (i.e., cannot use `return`). Used for inline functions with lambdas."],
  ["Kotlin", "What is a tailrec function?", "tailrec", "Explain `tailrec`.", "`tailrec` marks a function as tail-recursive. The compiler optimizes it into a loop, reducing stack usage. It must call itself as the last operation."],
  ["Kotlin", "What is the `return` statement in a lambda?", "return-in-lambda", "Explain `return` behavior.", "In a lambda, `return` returns from the enclosing function unless qualified. Use `return@label` to return from the lambda itself."],
  ["Kotlin", "What is the `run`, `with`, `apply`, `let`, `also` functions?", "scope-functions-kotlin", "List scope functions.", "`let` (context as `it`, returns result), `run` (context as `this`, returns result), `with` (takes object, returns result), `apply` (context as `this`, returns object), `also` (context as `it`, returns object). They are used for scoping and chaining."],
  ["Kotlin", "What is a type alias?", "type-alias", "Explain type alias.", "`typealias` creates an alias for an existing type, useful for long generic types or functional types. Example: `typealias Predicate<T> = (T) -> Boolean`."],
  ["Kotlin", "What is a `package-level` function?", "package-function", "Explain top-level functions.", "Kotlin allows functions at the top level of a file (outside a class). They are static methods when compiled to Java."],
  ["Kotlin", "What are generics in functions?", "generic-functions-kotlin", "Explain generic functions.", "Functions can be generic: `fun <T> identity(value: T): T = value`. Type parameters are specified before the return type."],
  ["Kotlin", "What is the `reified` keyword?", "reified", "Explain `reified`.", "`reified` allows you to use a generic type at runtime (type erasure bypass). It is used in inline functions: `inline fun <reified T> isInstance(value: Any) = value is T`."],

  // ==================== COLLECTIONS (15) ====================
  ["Kotlin", "What are the main collection types in Kotlin?", "collection-types", "List collection types.", "List (ordered, mutable/immutable), Set (unique, mutable/immutable), Map (key-value, mutable/immutable). Also `Array` and `Sequence`."],
  ["Kotlin", "What is the difference between `List` and `MutableList`?", "list-vs-mutablelist", "Compare read-only and mutable.", "`List` is read-only (no mutating operations). `MutableList` extends `List` and adds mutating functions like `add`, `remove`. Both are interfaces."],
  ["Kotlin", "How do you create a list in Kotlin?", "list-creation", "Explain list creation.", "Use `listOf` for immutable, `mutableListOf` for mutable. Also `arrayListOf`, `LinkedList` etc."],
  ["Kotlin", "What is the difference between `listOf` and `emptyList()`?", "listof-vs-emptylist", "Compare creation.", "`listOf` returns a list with elements; `emptyList()` returns an empty read-only list. Both are immutable."],
  ["Kotlin", "What are the common collection operations in Kotlin?", "collection-operations", "List common operations.", "`map`, `filter`, `reduce`, `fold`, `forEach`, `any`, `all`, `count`, `find`, `groupBy`, `sorted`, `distinct`, `chunked`, `windowed`."],
  ["Kotlin", "What is the difference between `map` and `flatMap`?", "map-vs-flatmap", "Compare mapping operations.", "`map` applies a transformation to each element, returning a list of results. `flatMap` applies a transformation that returns a collection, and flattens the results into a single list."],
  ["Kotlin", "What is a `Sequence` and how does it differ from `List`?", "sequence-vs-list", "Compare lazy vs eager.", "Sequences are lazily evaluated; operations are performed only when needed. Lists are eager. Sequences are useful for large data to avoid intermediate collections."],
  ["Kotlin", "What is the `associateBy` function?", "associateby", "Explain `associateBy`.", "`associateBy` transforms a collection into a map by using a key selector. Example: `people.associateBy { it.id }`."],
  ["Kotlin", "What is the `partition` function?", "partition", "Explain `partition`.", "`partition` splits a collection into two lists based on a predicate: one for true, one for false."],
  ["Kotlin", "What is the `groupBy` function?", "groupby", "Explain `groupBy`.", "`groupBy` groups elements by a key selector, returning a map of key to list of elements."],
  ["Kotlin", "What is the `fold` and `reduce` difference?", "fold-vs-reduce", "Compare reduction functions.", "`reduce` uses the first element as initial accumulator; `fold` takes an explicit initial value. Both combine elements."],
  ["Kotlin", "What is the `chunked` function?", "chunked", "Explain `chunked`.", "`chunked` splits a collection into chunks of a given size."],
  ["Kotlin", "What is the `windowed` function?", "windowed", "Explain `windowed`.", "`windowed` creates sliding windows over a collection."],
  ["Kotlin", "How do you convert between collections?", "collection-conversion", "Explain conversion.", "Use `toList`, `toSet`, `toMutableList`, `toMap` etc. Also `asSequence` to convert to sequence."],
  ["Kotlin", "What is `distinct` and `distinctBy`?", "distinct", "Explain distinct operations.", "`distinct` returns a list with unique elements. `distinctBy` uses a selector to determine uniqueness."],

  // ==================== COROUTINES (15) ====================
  ["Kotlin", "What are coroutines in Kotlin?", "coroutines-overview", "Explain coroutines.", "Coroutines are lightweight threads for asynchronous programming. They suspend execution without blocking threads. They are used for async/await, concurrency, and reactive streams."],
  ["Kotlin", "What is a `CoroutineScope`?", "coroutinescope", "Explain CoroutineScope.", "A CoroutineScope defines the lifecycle of coroutines. It provides a structured concurrency context. Common scopes: `GlobalScope` (not recommended), `lifecycleScope`, `viewModelScope`."],
  ["Kotlin", "What is the difference between `launch` and `async`?", "launch-vs-async-kotlin", "Compare coroutine builders.", "`launch` starts a coroutine that does not return a result (fire-and-forget). `async` returns a `Deferred` that can be awaited for a result."],
  ["Kotlin", "What is `Deferred`?", "deferred", "Explain Deferred.", "`Deferred` is a non-blocking cancellable future for coroutines. It is returned by `async`. Use `await()` to get the result."],
  ["Kotlin", "What is the `suspend` keyword?", "suspend", "Explain suspend.", "`suspend` marks a function that can be paused and resumed. It can be called only from a coroutine or another suspend function."],
  ["Kotlin", "What are dispatchers in coroutines?", "dispatchers", "Explain dispatchers.", "Dispatchers determine the thread(s) used: `Dispatchers.Main` (UI), `Dispatchers.IO` (network/disk), `Dispatchers.Default` (CPU-heavy), `Dispatchers.Unconfined`."],
  ["Kotlin", "What is `withContext`?", "withcontext", "Explain `withContext`.", "`withContext` switches the context of a coroutine. It is used to change dispatchers within a coroutine. Example: `withContext(Dispatchers.IO) { ... }`."],
  ["Kotlin", "What is a `Job`?", "job", "Explain Job.", "A `Job` represents a coroutine that can be cancelled. It is returned by `launch`. You can `join()` to wait for completion, and `cancel()` to stop."],
  ["Kotlin", "What is structured concurrency?", "structured-concurrency", "Explain structured concurrency.", "Structured concurrency ensures that coroutines are properly scoped and cancel together. It prevents leaks by tying coroutine lifecycles to their parent scope."],
  ["Kotlin", "What are `Flow` and `StateFlow`?", "flow-stateflow", "Explain Flow types.", "`Flow` is a cold asynchronous stream that emits multiple values. `StateFlow` is a hot flow that holds a state value and emits updates. `SharedFlow` is a hot flow for multiple subscribers."],
  ["Kotlin", "What is the difference between `Flow` and `LiveData`?", "flow-vs-livedata-kotlin", "Compare stream types.", "Flow is more powerful, supports operators (map, filter), backpressure, and is part of coroutines. LiveData is lifecycle-aware but simpler. Flow can be converted to LiveData."],
  ["Kotlin", "What are channels in Kotlin?", "channels", "Explain channels.", "Channels are communication primitives for passing data between coroutines. They can be buffered. Example: `Channel<Int>()`, then `send` and `receive`."],
  ["Kotlin", "What is a `Produce` and `Consume` pattern?", "produce-consume", "Explain producer-consumer.", "Use `produce` and `consumer` functions to build producers and consumers with channels. `produce` creates a producer coroutine; `consumeEach` consumes."],
  ["Kotlin", "How do you handle cancellation of coroutines?", "cancellation", "Explain cancellation.", "Coroutines cancel cooperatively. You can check `isActive` or use `ensureActive()`. Use `withTimeout` or `withTimeoutOrNull` to limit execution."],
  ["Kotlin", "What is the `kotlinx.coroutines` library?", "kotlinx-coroutines", "Explain the library.", "This is the official coroutine library that provides coroutines, flows, channels, and dispatchers. It is imported as `org.jetbrains.kotlinx:kotlinx-coroutines-core`."],

  // ==================== GENERICS & ADVANCED TYPES (10) ====================
  ["Kotlin", "What are generic constraints?", "generic-constraints", "Explain constraints.", "Generic type parameters can be constrained with `T : UpperBound`. Example: `fun <T : Number> sum(list: List<T>): T { ... }`."],
  ["Kotlin", "What is type variance: `in` and `out`?", "variance", "Explain `in` and `out`.", "`out` declares a type parameter as covariant (producer). `in` declares it as contravariant (consumer). Example: `interface Source<out T> { fun next(): T }`."],
  ["Kotlin", "What is `star projection` (`*`)?", "star-projection", "Explain star projection.", "Star projection (`Type<*>`) means unknown type. For `out` types, it's `Any?`; for `in` types, it's `Nothing`."],
  ["Kotlin", "What is `reified` and how does it work?", "reified-detail", "Explain `reified` in depth.", "`reified` allows you to use the generic type at runtime inside an inline function. It avoids type erasure. Example: `inline fun <reified T> isA(value: Any) = value is T`."],
  ["Kotlin", "What are type aliases used for?", "type-alias-detail", "Explain type alias usage.", "Type aliases provide an alternative name for an existing type. They are useful for simplifying complex types: `typealias MyMap = Map<String, List<Int>>`."],
  ["Kotlin", "What is a `sealed class` vs `enum`?", "sealed-vs-enum", "Compare sealed class and enum.", "Enum classes are for fixed constants. Sealed classes define a restricted hierarchy of subclasses, each with its own state. More flexible."],
  ["Kotlin", "What is the `data` class and its limitations?", "data-class-limitations", "Explain data class limitations.", "Data classes cannot be abstract, open, or inner. They cannot extend other classes (but can implement interfaces). They are intended for data holders."],
  ["Kotlin", "What is `inline` class?", "inline-class", "Explain inline class.", "Inline classes wrap a single value and are optimized at runtime. They are declared with `@JvmInline value class`. Example: `@JvmInline value class UserId(val value: String)`."],
  ["Kotlin", "What is a `typealias` for function types?", "typealias-function", "Explain function type alias.", "You can alias function types: `typealias Predicate<T> = (T) -> Boolean`. This improves readability."],
  ["Kotlin", "What is `Nothing` in generics?", "nothing-generic", "Explain `Nothing`.", "`Nothing` is a subtype of all types and can be used in generic variance to indicate that a type parameter is never used (e.g., `List<Nothing>` is always empty)."],

  // ==================== INTEROPERABILITY (10) ====================
  ["Kotlin", "How does Kotlin interoperate with Java?", "java-interop", "Explain interop.", "Kotlin can call Java code and vice versa. Kotlin compiles to JVM bytecode. It uses nullability annotations to handle null safety. Java libraries can be used seamlessly."],
  ["Kotlin", "What are the annotations for Java interop?", "interop-annotations", "List interop annotations.", "`@JvmStatic` (generate static method), `@JvmOverloads` (generate overloads for default args), `@JvmField` (expose field), `@JvmName` (rename generated method)."],
  ["Kotlin", "How do you call Kotlin functions from Java?", "call-kotlin-from-java", "Explain calling Kotlin from Java.", "Kotlin top-level functions become static methods in a class named `FileNameKt`. You can call them as `FileNameKt.function()`."],
  ["Kotlin", "How do you call Java code from Kotlin?", "call-java-from-kotlin", "Explain calling Java from Kotlin.", "Java methods and classes are used directly. Kotlin handles nullability: Java types are platform types (treated as nullable)."],
  ["Kotlin", "What are platform types?", "platform-types", "Explain platform types.", "Platform types come from Java and have no nullability information. They are denoted with `!` (e.g., `String!`). The Kotlin compiler doesn't enforce null-safety on these; it's the developer's responsibility."],
  ["Kotlin", "How do you handle Java checked exceptions in Kotlin?", "checked-exceptions", "Explain exception handling.", "Kotlin doesn't have checked exceptions. You can catch them normally, but you don't have to declare them."],
  ["Kotlin", "What is the `kotlin-stdlib`?", "kotlin-stdlib", "Explain standard library.", "The standard library includes core functions, collections, and IO. It is a dependency for Kotlin applications."],
  ["Kotlin", "How do you use `lombok` with Kotlin?", "lombok-kotlin", "Explain Lombok interop.", "Lombok is not recommended with Kotlin; Kotlin's data classes and features cover similar needs. If used, you may need `@JvmDefault` and plugins."],
  ["Kotlin", "What is the `kotlin.reflect` API?", "kotlin-reflect", "Explain reflection.", "Kotlin's reflection API allows inspecting classes, functions, and properties at runtime. It is part of `kotlin-reflect` library."],
  ["Kotlin", "How do you generate getters/setters for Java interop?", "jvm-properties", "Explain property mapping.", "Properties compile to getters and setters (e.g., `getName`, `setName`). Use `@JvmField` to expose as a field directly."],

  // ==================== DSL & BUILDING TOOLS (5) ====================
  ["Kotlin", "What is a DSL (Domain Specific Language) in Kotlin?", "dsl", "Explain DSL.", "Kotlin allows building type-safe DSLs using lambdas and extension functions. Examples: Gradle build scripts, Anko, HTML builders."],
  ["Kotlin", "How do you build a DSL?", "build-dsl", "Explain DSL creation.", "Use higher-order functions with receivers (`fun create(block: Builder.() -> Unit)`) to define a context. Use lambdas with receiver for fluent APIs."],
  ["Kotlin", "What is Kotlin Script (.kts)?", "kotlin-script", "Explain .kts.", "Kotlin scripts are executable Kotlin files with `.kts` extension. They are used for scripting and Gradle build scripts."],
  ["Kotlin", "What is the `kotlin-gradle-plugin`?", "kotlin-gradle-plugin", "Explain Gradle plugin.", "The Gradle plugin for Kotlin builds Kotlin projects. It compiles Kotlin code, manages dependencies, and integrates with Java."],
  ["Kotlin", "How do you configure Kotlin in a Gradle build?", "kotlin-gradle-config", "Explain configuration.", "Apply plugin: `kotlin` or `kotlin-android`. Set `kotlinOptions` (JVM target, free compiler args, etc.). Use `implementation` for dependencies."],

  // ==================== BEST PRACTICES (10) ====================
  ["Kotlin", "What are the best practices for using `null`?", "null-best-practices", "Explain null handling.", "Prefer non-nullable types. Use safe call `?.`, Elvis `?:`, and `let` for scoping. Avoid `!!`. Use `lateinit` cautiously."],
  ["Kotlin", "When to use `val` vs `var`?", "val-vs-var-practice", "Explain immutability.", "Prefer `val` for immutability. Use `var` only when state must change. This reduces bugs and improves readability."],
  ["Kotlin", "What is the preference for data classes?", "data-class-practice", "Explain data class usage.", "Use data classes for simple data holders. Avoid inheriting from them. Use `copy` for modifications."],
  ["Kotlin", "How to use extensions functions wisely?", "extensions-best-practices", "Explain extension usage.", "Use extensions for adding functionality to classes you don't control. Avoid overusing to prevent confusion."],
  ["Kotlin", "What is the recommendation for function parameters?", "function-params-practice", "Explain parameter ordering.", "Place required parameters first, then optional with default values. Use named arguments for readability."],
  ["Kotlin", "How to handle exceptions in Kotlin?", "exception-best-practices", "Explain exception handling.", "Use `try` as expression. Prefer returning `Result<T>` or `sealed class` for expected errors. Avoid throwing for control flow."],
  ["Kotlin", "What is the use of `when` over `if-else`?", "when-vs-if", "Compare `when` and `if`.", "Use `when` for multiple conditions. It is more readable and powerful, supporting patterns, ranges, and types."],
  ["Kotlin", "What is the recommended package structure?", "package-structure", "Explain package organization.", "Organize by feature/module, not by layer. Use `kotlin` package naming. Keep packages small and focused."],
  ["Kotlin", "How to use coroutines effectively?", "coroutines-best-practices", "Explain coroutine guidelines.", "Use structured concurrency with `viewModelScope` or `lifecycleScope`. Avoid `GlobalScope`. Use appropriate dispatchers. Handle cancellation."],
  ["Kotlin", "What are the performance tips for Kotlin?", "performance-tips", "List performance tips.", "Prefer `inline` functions for lambdas. Use sequences for large collections. Avoid reflection. Use primitive arrays when needed."],

  // ==================== SCENARIO-BASED (20) ====================
  ["Kotlin", "How would you implement a singleton in Kotlin?", "singleton-scenario", "Explain singleton.", "Use `object` declaration: `object MySingleton { fun doSomething() }`."],
  ["Kotlin", "How would you implement a builder pattern?", "builder-pattern", "Explain builder.", "Use `apply` or `also` with a class that has mutable properties. Or use a DSL with `block` receiver."],
  ["Kotlin", "How would you handle a list of nullable values?", "list-nullable", "Explain handling nullable list.", "Use `filterNotNull()` to remove nulls. Or use `mapNotNull` for transformation."],
  ["Kotlin", "How would you parse JSON in Kotlin?", "json-parsing-kotlin", "Explain JSON parsing.", "Use `kotlinx.serialization` or `Gson`/`Moshi`. Define data classes and use `Json.decodeFromString<MyClass>(json)`."],
  ["Kotlin", "How would you make a retrofit call with coroutines?", "retrofit-coroutines", "Explain Retrofit with coroutines.", "Define a suspend function in the API interface. Call it from a coroutine with `withContext(Dispatchers.IO)`."],
  ["Kotlin", "How would you handle a delayed task?", "delayed-task", "Explain delay.", "Use `delay(millis)` in a coroutine. For UI, use `lifecycleScope.launch { delay(1000); ... }`."],
  ["Kotlin", "How would you implement a lazy property?", "lazy-property", "Explain lazy initialization.", "Use `val lazyValue: Type by lazy { ... }`. The block runs once when accessed."],
  ["Kotlin", "How would you create an observable property?", "observable-property", "Explain delegated properties.", "Use `Delegates.observable` or `Delegates.vetoable`. Example: `var name: String by Delegates.observable(\"old\") { prop, old, new -> ... }`."],
  ["Kotlin", "How would you handle backpressure in a Flow?", "flow-backpressure", "Explain Flow backpressure.", "Use `buffer()`, `conflate()`, or `collectLatest` to handle slow collectors. Also use `flatMapConcat`."],
  ["Kotlin", "How would you combine multiple Flows?", "combine-flows", "Explain Flow combination.", "Use `combine` to combine the latest values of multiple flows. Also `zip` for pairwise."],
  ["Kotlin", "How would you implement a custom DSL for HTML?", "html-dsl", "Explain HTML DSL.", "Use functions with receivers: `fun html(block: HTML.() -> Unit)` and inside use tags like `head { ... }`."],
  ["Kotlin", "How would you handle a dependency injection (DI) in Kotlin?", "di-kotlin", "Explain DI.", "Use Koin (DSL) or Dagger/Hilt. Example with Koin: `val module = module { single { Repository(get()) } }`."],
  ["Kotlin", "How would you test a suspend function?", "test-suspend", "Explain testing suspend.", "Use `runTest { ... }` from `kotlinx-coroutines-test`. It handles virtual time."],
  ["Kotlin", "How would you implement a retry mechanism for API calls?", "retry-mechanism", "Explain retry.", "Use `retryWhen` on a Flow or `runCatching` with a loop. Or use `kotlinx-coroutines` `retry` function."],
  ["Kotlin", "How would you create a custom annotation?", "custom-annotation", "Explain custom annotation.", "Use `annotation class MyAnnotation(val value: String)`. Apply with `@MyAnnotation(\"hello\")`."],
  ["Kotlin", "How would you handle multiple exceptions in a `when`?", "when-exception", "Explain exception handling.", "Use `try { ... } catch (e: Exception) { when (e) { is IOException -> ... is NullPointerException -> ... } }`."],
  ["Kotlin", "How would you parse a string with regex?", "regex-scenario", "Explain regex usage.", "Use `Regex(\"pattern\").findAll(input)`. Use `toRegex()` extension: `\"pattern\".toRegex()`."],
  ["Kotlin", "How would you sort a list with custom comparator?", "sort-custom", "Explain custom sorting.", "Use `sortedWith(compareBy { it.property })` or `sortedBy { it.age }`."],
  ["Kotlin", "How would you implement a thread-safe singleton?", "thread-safe-singleton", "Explain thread-safe singleton.", "Use `object` declaration (thread-safe). Or use `@Volatile` and `synchronized` for lazy initialization."],
  ["Kotlin", "How would you implement a logging framework with extension functions?", "logging-extension", "Explain logging extension.", "Create extension functions for `Any` or a specific class to log: `fun Any.log(message: String) = Log.d(this::class.simpleName, message)`."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Kotlin concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Kotlin features without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "kotlin" },
    update: { name: "Kotlin", group: "Technology", description: "Kotlin interview questions." },
    create: { name: "Kotlin", slug: "kotlin", group: "Technology", description: "Kotlin interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "kotlin" } },
    update: {},
    create: { name: "Kotlin", slug: "kotlin", categoryId: category.id },
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
        tags: ["Kotlin"],
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
        tags: ["Kotlin"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Kotlin questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");