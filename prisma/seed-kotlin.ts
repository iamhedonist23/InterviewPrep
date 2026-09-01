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

async function seedKotlinCategory() {
  const kotlinCategory = {
    name: "Kotlin Fundamentals",
    slug: "kotlin-fundamentals",
    description: "Learn Kotlin syntax, null safety, data classes, and common JVM language patterns.",
    icon: "KT",
    sortOrder: 11,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build a strong Kotlin base for JVM and Android development.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Kotlin Basics",
            slug: "kotlin-basics",
            description: "The most important Kotlin concepts for interviews and development.",
            topics: [
              {
                title: "Null Safety and Data Classes",
                slug: "kotlin-null-safety-data-classes",
                shortDescription: "Handle nullable values and model data cleanly.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Null safety", content: "Kotlin tracks nullability in the type system: a type like String cannot hold null, while String? explicitly allows it. This catches null pointer issues at compile time instead of runtime." },
                  { title: "Safe calls and Elvis operator", content: "The safe call operator ?. returns null instead of throwing if the receiver is null; the Elvis operator ?: supplies a default value in that case.\n\nExample:\nval length = name?.length ?: 0" },
                  { title: "The !! operator", content: "!! forcibly asserts a nullable value is non-null, throwing a NullPointerException if it's actually null — use sparingly, only when you're certain the value can't be null." },
                  { title: "Data classes", content: "Data classes reduce boilerplate when creating simple value objects, automatically generating equals(), hashCode(), toString(), and copy().\n\nExample:\ndata class User(val name: String, val age: Int)\nval older = user.copy(age = user.age + 1)" },
                  { title: "Destructuring declarations", content: "Data classes support destructuring, letting you unpack their properties into separate variables in one line.\n\nExample:\nval (name, age) = user" },
                ],
              },
              {
                title: "Functions and Extension Functions",
                slug: "kotlin-functions",
                shortDescription: "First-class functions and functional programming patterns.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Function types", content: "Kotlin treats functions as first-class values. Higher-order functions take or return functions, enabling functional patterns like map and filter." },
                  { title: "Lambda expressions", content: "Example:\nval doubled = listOf(1, 2, 3).map { it * 2 }\nval sum: (Int, Int) -> Int = { a, b -> a + b }" },
                  { title: "Default and named arguments", content: "Parameters can have default values, and calls can name arguments explicitly, reducing the need for method overloading.\n\nExample:\nfun greet(name: String, greeting: String = \"Hello\") = \"$greeting, $name!\"\ngreet(name = \"Ana\")" },
                  { title: "Extension functions", content: "Extension functions let you add methods to existing classes (even ones you don't own) without inheritance, keeping code clean and organized.\n\nExample:\nfun String.shout() = this.uppercase() + \"!\"\n\"hi\".shout() // \"HI!\"" },
                  { title: "Infix functions", content: "A function marked infix can be called without a dot or parentheses, useful for building readable DSL-like syntax (e.g. 1 to 2 creates a Pair)." },
                ],
              },
              {
                title: "Coroutines Basics",
                slug: "kotlin-coroutines",
                shortDescription: "Lightweight concurrency for async operations.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What coroutines are", content: "Coroutines are lightweight threads that can be suspended and resumed without blocking the underlying OS thread. They simplify async code compared to nested callbacks." },
                  { title: "suspend functions", content: "A function marked suspend can pause execution without blocking the thread, and can only be called from another suspend function or a coroutine.\n\nExample:\nsuspend fun fetchUser(id: Int): User {\n    delay(1000) // non-blocking\n    return api.getUser(id)\n}" },
                  { title: "Launching coroutines", content: "launch starts a coroutine that doesn't return a result (fire-and-forget); async starts one that returns a Deferred<T> result you can await later.\n\nExample:\nCoroutineScope(Dispatchers.Main).launch {\n    val user = fetchUser(1)\n    updateUi(user)\n}" },
                  { title: "Dispatchers", content: "Dispatchers.Main runs on the UI thread, Dispatchers.IO is optimized for blocking I/O work (network, disk), and Dispatchers.Default is optimized for CPU-intensive work." },
                  { title: "Structured concurrency", content: "Coroutines launched within a CoroutineScope are automatically canceled together when that scope is canceled (e.g. when a screen is destroyed), preventing leaked background work." },
                ],
              },
            ],
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Deeper Kotlin: generics, delegation, and more.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Advanced Kotlin Features",
            slug: "advanced-kotlin",
            description: "Generics, delegation, and type system.",
            topics: [
              {
                title: "Generics and Variance",
                slug: "kotlin-generics-variance",
                shortDescription: "Type parameters, in/out projections.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Generic classes and functions", content: "Kotlin supports generics just like Java, but with additional variance annotations.\n\nExample:\nclass Box<T>(val item: T)" },
                  { title: "Declaration-site variance", content: "The 'in' and 'out' annotations on type parameters define variance at declaration site: out for producer (covariant), in for consumer (contravariant).\n\nExample:\ninterface Producer<out T> { fun produce(): T }" },
                  { title: "Type projections", content: "Using star projections (Box<*>) or explicit bounds when you don't know the exact type." },
                  { title: "reified types", content: "With inline functions and reified type parameters, you can access the actual type at runtime, e.g. for type checks and casting.\n\nExample:\ninline fun <reified T> isType(value: Any) = value is T" },
                  { title: "Type-safe builders", content: "Kotlin's DSL capabilities rely on higher-order functions with receivers, enabling type-safe HTML or SQL builders." },
                ],
              },
              {
                title: "Delegation",
                slug: "kotlin-delegation",
                shortDescription: "Class delegation and property delegation.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Class delegation", content: "The 'by' keyword lets you delegate implementation of an interface to another object, reducing boilerplate.\n\nExample:\nclass CountingSet<T>(val inner: MutableSet<T>) : MutableSet<T> by inner" },
                  { title: "Property delegation", content: "Property delegates (lazy, observable, vetoable) allow you to reuse access logic for properties.\n\nExample:\nval lazyValue: String by lazy { compute() }" },
                  { title: "Custom delegates", content: "You can create your own property delegates by implementing getValue and setValue, useful for shared preferences or database fields." },
                  { title: "Delegation vs inheritance", content: "Delegation offers composition over inheritance, making code more flexible and easier to test." },
                ],
              },
            ],
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Kotlin for functional programming and DSLs.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Functional Patterns",
            slug: "functional-patterns",
            description: "Higher-order functions, monads, and effect handling.",
            topics: [
              {
                title: "Functional Programming in Kotlin",
                slug: "kotlin-functional",
                shortDescription: "Immutable data, higher-order functions, and monads.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Immutability", content: "Prefer val over var and use immutable collections (listOf, mapOf) to avoid side effects." },
                  { title: "Higher-order functions", content: "Kotlin's standard library uses higher-order functions extensively: filter, map, fold, etc." },
                  { title: "Monads and Arrow", content: "Libraries like Arrow bring functional constructs like Either, Option, and IO to Kotlin, enabling pure functional programming." },
                  { title: "Tail recursion", content: "The tailrec modifier optimizes recursive functions into loops, avoiding stack overflow." },
                ],
              },
            ],
          }
        ],
      },
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
                estimatedMinutes: 18,
                sections: [
                  { title: "Safe calls and Elvis", content: "Explain with examples how ?. and ?: handle null safely." },
                  { title: "Lateinit and lazy", content: "Difference between lateinit var and lazy initialization." },
                  { title: "Type inference and smart casts", content: "Kotlin's smart casts automatically cast after a type check." },
                ],
              },
              {
                title: "Coroutines in Practice",
                slug: "kotlin-interview-coroutines",
                shortDescription: "Structured concurrency, cancellation, and error handling.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Structured concurrency", content: "How scopes ensure coroutines are cancelled properly." },
                  { title: "Exception handling", content: "Using CoroutineExceptionHandler and try-catch." },
                  { title: "Flows", content: "Cold streams, flow operators, and state flows." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(kotlinCategory);
  console.log("✓ Kotlin Fundamentals category seeded");
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