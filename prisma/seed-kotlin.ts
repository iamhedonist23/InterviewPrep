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

async function seedKotlinCategory() {
  const kotlinCategory: CategorySeed = {
    name: "Kotlin Fundamentals",
    slug: "kotlin-fundamentals",
    description: "Learn Kotlin syntax, null safety, data classes, and common JVM language patterns.",
    icon: "KT",
    sortOrder: 11,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build a strong Kotlin base for JVM and Android development.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Kotlin Basics – The Essentials",
            slug: "kotlin-basics",
            description: "The most important Kotlin concepts for interviews and development.",
            topics: [
              {
                title: "Null Safety and Data Classes – Safer Code",
                slug: "kotlin-null-safety-data-classes",
                shortDescription: "Handle nullable values and model data cleanly.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Null Safety – The Type System Guards You", content: "Kotlin's type system distinguishes between nullable (`String?`) and non‑null (`String`) types. This design eliminates most `NullPointerException` errors at compile time. The compiler forces you to handle nullable values explicitly." },
                  { title: "Safe Call (`?.`) and Elvis (`?:`)", content: "`?.` returns `null` if the receiver is `null`, otherwise it proceeds. The Elvis operator `?:` provides a default value when the left‑hand side is `null`. Example: `val length = name?.length ?: 0`." },
                  { title: "The `!!` Operator – Use with Caution", content: "`!!` asserts that a nullable value is non‑null. If it's `null`, it throws a `NullPointerException`. Use it only when you're absolutely sure the value won't be `null`." },
                  { title: "Data Classes – Value Objects Made Easy", content: "Data classes automatically generate `equals()`, `hashCode()`, `toString()`, `copy()`, and destructuring. Example: `data class User(val name: String, val age: Int)`. `copy()` creates a new instance with updated fields." },
                  { title: "Destructuring Declarations", content: "Data classes let you unpack their properties into variables: `val (name, age) = user`. This works for any type that defines `componentN()` functions." },
                ],
              },
              {
                title: "Functions and Extension Functions – Reusable Logic",
                slug: "kotlin-functions",
                shortDescription: "First-class functions and functional programming patterns.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Function Types – Functions as Values", content: "Kotlin treats functions as first‑class citizens. You can assign functions to variables, pass them as arguments, and return them from functions. Example: `val sum: (Int, Int) -> Int = { a, b -> a + b }`." },
                  { title: "Lambda Expressions", content: "Lambdas are concise anonymous functions. `list.map { it * 2 }` uses a lambda. When there's a single parameter, you can refer to it as `it`." },
                  { title: "Default and Named Arguments", content: "Define default parameter values: `fun greet(name: String, greeting: String = \"Hello\") = \"$greeting, $name!\"`. Calls can use named arguments: `greet(name = \"Ana\")`." },
                  { title: "Extension Functions – Add Functions to Existing Types", content: "You can add new functions to a class without inheritance. Example: `fun String.shout() = this.uppercase() + \"!\"`. This is extremely powerful for building DSLs and utilities." },
                  { title: "Infix Functions – Readable Syntax", content: "Mark a function with `infix` to call it without a dot or parentheses. Example: `1 to 2` creates a `Pair`. Common in domain‑specific languages." },
                ],
              },
              {
                title: "Coroutines Basics – Lightweight Concurrency",
                slug: "kotlin-coroutines",
                shortDescription: "Lightweight concurrency for async operations.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What are Coroutines?", content: "Coroutines are lightweight threads that can be suspended and resumed without blocking the underlying OS thread. They simplify asynchronous code, making it look sequential." },
                  { title: "Suspend Functions", content: "A `suspend` function can pause execution without blocking a thread. It can be called only from another suspend function or a coroutine. Example: `suspend fun fetchUser(id: Int): User { delay(1000); return api.getUser(id) }`." },
                  { title: "Launch and Async", content: "`launch` starts a coroutine that doesn't return a result (fire‑and‑forget). `async` starts a coroutine that returns a `Deferred<T>` result, which you can `await` later. Use `launch` for background tasks, `async` for parallel computation." },
                  { title: "Dispatchers – Thread Pools", content: "`Dispatchers.Main` (UI thread), `Dispatchers.IO` (optimised for I/O), `Dispatchers.Default` (CPU‑intensive work). Choose the right dispatcher for the task." },
                  { title: "Structured Concurrency", content: "Coroutines launched within a `CoroutineScope` are automatically cancelled when the scope is cancelled. This prevents background leaks and ensures parent‑child cancellation propagation." },
                ],
              },
              // New: Sealed Classes and When
              {
                title: "Sealed Classes and `when` – Exhaustive Matching",
                slug: "sealed-when",
                shortDescription: "Define restricted class hierarchies and use exhaustive `when`.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Sealed Classes – Limited Subtypes", content: "A sealed class defines a closed set of subclasses. All subclasses must be declared in the same file. This enables exhaustive `when` expressions." },
                  { title: "Sealed Interfaces", content: "Sealed interfaces are also available, allowing multiple inheritance of sealed types." },
                  { title: "Exhaustive `when`", content: "When you use `when` on a sealed class, the compiler forces you to cover all subclasses, making your code safer." },
                  { title: "Example: `sealed class Result { data class Success(val data: String) : Result(); data class Error(val message: String) : Result() }`", content: "Then in a `when`, you handle both `Success` and `Error`." },
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
        description: "Deeper Kotlin: generics, delegation, collections, and scope functions.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Kotlin Features",
            slug: "advanced-kotlin",
            description: "Generics, delegation, and type system.",
            topics: [
              {
                title: "Generics and Variance – Type Parameters",
                slug: "kotlin-generics-variance",
                shortDescription: "Type parameters, in/out projections.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Generic Classes and Functions", content: "`class Box<T>(val item: T)` – generic types are erased at runtime, like Java." },
                  { title: "Declaration‑site Variance – `out` and `in`", content: "`out` marks a type as covariant (producer): you can read, but not write. `in` marks contravariant (consumer): you can write, but not read. This provides type safety." },
                  { title: "Type Projections", content: "`Box<*>` is a star projection – you don't know the exact type, but you can still read from it safely." },
                  { title: "Reified Types with `inline`", content: "`inline fun <reified T> isType(value: Any) = value is T` – reified allows you to access the actual type at runtime, which is otherwise erased." },
                  { title: "Type‑Safe Builders", content: "Using lambda with receiver (`fun buildString(builder: StringBuilder.() -> Unit)`) lets you create DSLs like HTML or SQL builders." },
                ],
              },
              {
                title: "Delegation – Composition by Default",
                slug: "kotlin-delegation",
                shortDescription: "Class delegation and property delegation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Class Delegation (`by`)", content: "`class CountingSet<T>(val inner: MutableSet<T>) : MutableSet<T> by inner` – the `by` keyword delegates all methods to `inner`. You can then override specific methods." },
                  { title: "Property Delegation", content: "`val lazyValue: String by lazy { compute() }` – lazy initialisation. Other built‑in delegates: `observable`, `vetoable`. You can also create custom delegates." },
                  { title: "Custom Delegates", content: "Implement `getValue` and `setValue` to create custom property delegates, useful for preferences or database fields." },
                  { title: "Delegation vs Inheritance", content: "Delegation favours composition over inheritance, making your code more flexible and easier to test." },
                ],
              },
              // New: Collections and Sequences
              {
                title: "Collections and Sequences – Efficient Data Processing",
                slug: "kotlin-collections",
                shortDescription: "List, Set, Map, and the power of sequences.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Immutable vs Mutable Collections", content: "Kotlin distinguishes between read‑only (`List<T>`) and mutable (`MutableList<T>`). Prefer immutable by default." },
                  { title: "Common Operations", content: "`filter`, `map`, `flatMap`, `groupBy`, `associate`, `partition`, `sorted`, `distinct`. These are extensions on collections." },
                  { title: "Sequences – Lazy Collections", content: "Sequences (`asSequence()`) process elements lazily – operations are deferred until a terminal operation (e.g., `toList()`, `sum()`) is called. This can improve performance for large data." },
                  { title: "Sequence vs List", content: "Use sequences when you have a large chain of operations (avoid intermediate collections). Lists are eager; sequences are lazy." },
                ],
              },
              // New: Scope Functions
              {
                title: "Scope Functions – `let`, `apply`, `run`, `with`, `also`",
                slug: "scope-functions",
                shortDescription: "Understand the five scope functions and when to use each.",
                estimatedMinutes: 24,
                sections: [
                  { title: "`let` – Execute a block on a non‑null object", content: "`val result = obj?.let { it.doSomething() }` – commonly used for null‑safe calls." },
                  { title: "`apply` – Configure an object", content: "`val user = User().apply { name = \"Alice\"; age = 30 }` – returns the receiver." },
                  { title: "`run` – Execute a block and return a result", content: "`val result = user.run { name.length }` – works with the receiver as `this`." },
                  { title: "`with` – Run block with receiver, but not an extension", content: "`with(user) { println(name) }` – takes the receiver as a parameter." },
                  { title: "`also` – Perform additional actions", content: "`user.also { log(it) }` – returns the receiver, useful for side effects." },
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
        description: "Kotlin for functional programming, DSLs, flows, and metaprogramming.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Functional Patterns and DSLs",
            slug: "functional-dsls",
            description: "Higher‑order functions, monads, and domain‑specific languages.",
            topics: [
              {
                title: "Functional Programming in Kotlin",
                slug: "kotlin-functional",
                shortDescription: "Immutable data, higher‑order functions, and monads.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Immutability", content: "Prefer `val` over `var`. Use immutable collections (`listOf`, `mapOf`). This leads to safer, more predictable code." },
                  { title: "Higher‑order Functions", content: "Kotlin's standard library is built on them: `filter`, `map`, `fold`, `takeWhile`, etc." },
                  { title: "Monads and Arrow", content: "Arrow is a functional library that provides `Either`, `Option`, `IO`, and other functional constructs, enabling pure functional programming." },
                  { title: "Tail Recursion (`tailrec`)", content: "Use `tailrec` on recursive functions to optimise them into loops, avoiding stack overflow." },
                ],
              },
              {
                title: "Flows and Channels – Reactive Streams",
                slug: "kotlin-flows",
                shortDescription: "Cold streams, flow operators, and channels.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Flows – Cold Asynchronous Streams", content: "`Flow` is a cold stream that emits values asynchronously. Like sequences, they are lazy and only start producing when collected." },
                  { title: "Flow Operators", content: "`map`, `filter`, `transform`, `buffer`, `conflate`, `catch`, `retry`. These are similar to collection operators." },
                  { title: "StateFlow and SharedFlow", content: "`StateFlow` is a hot stream that holds a state and emits current state to new collectors. `SharedFlow` is a broadcast stream." },
                  { title: "Channels – Hot Communication", content: "`Channel<T>` is a hot stream for producer‑consumer patterns, similar to blocking queues, but with suspend functions." },
                ],
              },
              // New: Type Aliases and Annotations
              {
                title: "Type Aliases and Annotations",
                slug: "type-aliases-annotations",
                shortDescription: "Create shorter names and add metadata.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Type Aliases – Shorthand for Complex Types", content: "`typealias UserMap = Map<String, User>` – makes code more readable." },
                  { title: "Annotations – Metadata", content: "`@Target`, `@Retention` define where annotations can be used. Custom annotations: `annotation class MyAnnotation`." },
                  { title: "Reflection", content: "Kotlin reflection (`KClass`, `KFunction`) allows inspecting classes and functions at runtime, similar to Java reflection." },
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
        description: "Common Kotlin interview questions and patterns.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Kotlin Interview Topics",
            slug: "kotlin-interview",
            description: "Topics that frequently come up in Kotlin interviews.",
            topics: [
              {
                title: "Null Safety and Type System",
                slug: "kotlin-interview-null",
                shortDescription: "How Kotlin avoids NullPointerException.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Safe calls and Elvis", content: "Explain with examples how `?.` and `?:` handle null safely." },
                  { title: "Lateinit and lazy", content: "`lateinit var` for mutable properties initialised later; `lazy` for read‑only properties initialised on first access." },
                  { title: "Smart Casts", content: "After a type check, Kotlin automatically casts the variable, eliminating explicit casting." },
                ],
              },
              {
                title: "Coroutines in Practice",
                slug: "kotlin-interview-coroutines",
                shortDescription: "Structured concurrency, cancellation, and error handling.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Structured Concurrency", content: "How scopes (`coroutineScope`, `supervisorScope`) ensure coroutines are cancelled properly." },
                  { title: "Exception Handling", content: "Using `CoroutineExceptionHandler` and `try/catch` inside coroutines." },
                  { title: "Flows", content: "Cold streams, flow operators, and StateFlow/SharedFlow for UI state management." },
                ],
              },
              {
                title: "Collections and Scope Functions",
                slug: "kotlin-interview-collections",
                shortDescription: "Common collection operations and scope functions.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Collection Operators", content: "`filter`, `map`, `groupBy`, `associate` – be able to explain and give examples." },
                  { title: "Scope Functions", content: "When to use `let`, `apply`, `run`, `with`, `also` – explain their differences and typical use cases." },
                ],
              },
              {
                title: "Sealed Classes and When",
                slug: "kotlin-interview-sealed",
                shortDescription: "Exhaustive `when` and sealed hierarchies.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Sealed Classes", content: "How they restrict inheritance and enable exhaustive `when`." },
                  { title: "When to Use Sealed Classes", content: "For modelling states (loading, success, error) or result types." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(kotlinCategory);
  console.log("✅ Kotlin Fundamentals category seeded (ultra‑detailed)");
}

async function main() {
  await seedKotlinCategory();
}

main()
  .catch((error) => {
    console.error("Kotlin seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });