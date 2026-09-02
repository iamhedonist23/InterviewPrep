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

async function seedPythonCategory() {
  const pythonCategory = {
    name: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Understand Python syntax, collection types, functions, and common interview-ready patterns.",
    icon: "PY",
    sortOrder: 4,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build strong Python fundamentals for interviews and day-to-day coding.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Python Basics",
            slug: "python-basics",
            description: "Core Python concepts and mental models.",
            topics: [
              {
                title: "Variables and Functions",
                slug: "python-variables-functions",
                shortDescription: "Define values and reusable logic in Python.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Variables", content: "Python variables are dynamic references to values. The same variable can point to a different object later; the language keeps the data model simple and expressive.\n\nExample:\nx = 5\nx = \"now a string\"" },
                  { title: "Functions", content: "Functions let you group reusable instructions. Python supports positional, keyword, default, and variable arguments, making functions highly expressive.\n\nExample:\ndef greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"" },
                  { title: "*args and **kwargs", content: "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict, enabling flexible function signatures.\n\nExample:\ndef total(*numbers, **options):\n    result = sum(numbers)\n    return -result if options.get('negate') else result" },
                  { title: "Scope and closures", content: "Python uses LEGB scoping (Local, Enclosing, Global, Built-in). Nested functions can 'close over' variables from an enclosing scope, forming closures." },
                  { title: "Lambda expressions", content: "Lambdas define small anonymous functions inline, often used with sorted(), map(), and filter().\n\nExample:\nsorted(people, key=lambda p: p['age'])" },
                  { title: "Common gotchas", content: "Mutable default arguments (def f(items=[])) are created once and shared across calls, causing surprising bugs — use None and initialize inside the function instead." }
                ]
              },
              {
                title: "Collections and Iteration",
                slug: "python-collections-iteration",
                shortDescription: "Work with lists, tuples, dicts, and sets.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Lists vs tuples", content: "Lists are mutable sequences for ordered data. Tuples are immutable, suitable as dictionary keys and for protection against modification.\n\nExample:\npoint = (3, 4)  # tuple\nnums = [1, 2, 3]  # list, mutable" },
                  { title: "Dictionaries and sets", content: "Dictionaries map keys to values. Sets store unique elements. Both are built on hash tables for fast average O(1) lookups.\n\nExample:\nages = {\"alice\": 30, \"bob\": 25}\nunique_ids = {1, 2, 2, 3}  # {1, 2, 3}" },
                  { title: "Iterating collections", content: "for loops iterate directly over items; enumerate() adds an index; zip() pairs elements from multiple iterables together.\n\nExample:\nfor i, name in enumerate([\"a\", \"b\"]):\n    print(i, name)" },
                  { title: "Slicing", content: "Slicing (sequence[start:stop:step]) extracts sub-sequences from lists, tuples, and strings without mutating the original.\n\nExample:\nnums[1:4]     # elements at index 1,2,3\nnums[::-1]    # reversed copy" },
                  { title: "Dictionary methods", content: ".get() avoids KeyError by returning a default, .items()/.keys()/.values() give iterable views, and dict comprehensions build dictionaries concisely." },
                  { title: "Choosing the right collection", content: "Use a list for ordered, mutable sequences; a tuple for fixed, hashable groupings; a set for uniqueness and fast membership tests; a dict for key-based lookups." }
                ]
              },
              {
                title: "List Comprehensions",
                slug: "python-list-comprehensions",
                shortDescription: "Create and filter collections with concise syntax.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Basic comprehensions", content: "Comprehensions apply an expression to each element. They are faster and more readable than an equivalent for-loop with append.\n\nExample:\nsquares = [x * x for x in range(10)]" },
                  { title: "Nested and filtered", content: "Comprehensions can include conditions and nested loops, handling complex transformations in one line.\n\nExample:\nevens = [x for x in range(20) if x % 2 == 0]\npairs = [(x, y) for x in range(3) for y in range(3)]" },
                  { title: "Dict and set comprehensions", content: "The same syntax extends to dictionaries and sets using {} instead of [].\n\nExample:\nsquare_map = {x: x*x for x in range(5)}\nunique_lengths = {len(w) for w in words}" },
                  { title: "Generator expressions", content: "Wrapping a comprehension in () instead of [] creates a generator expression, which produces values lazily instead of building the whole list in memory at once." },
                  { title: "Readability limits", content: "Comprehensions are best for simple transformations. Once logic requires multiple conditions or side effects, a regular loop is usually clearer." }
                ]
              },
              {
                title: "String Operations",
                slug: "python-string-operations",
                shortDescription: "Manipulate and format text effectively.",
                estimatedMinutes: 16,
                sections: [
                  { title: "String methods", content: "Python strings have many built-in methods: split, join, replace, find, strip, and more.\n\nExample:\n\"a,b,c\".split(\",\")       # ['a', 'b', 'c']\n\", \".join([\"a\", \"b\"])   # 'a, b'" },
                  { title: "Formatting", content: "f-strings, .format(), and % formatting each have their use. f-strings are modern and expressive.\n\nExample:\nname = \"Ada\"\nf\"Hello, {name}! {2 + 2=}\"" },
                  { title: "Immutability", content: "Strings are immutable — every method that appears to modify a string actually returns a new one, leaving the original unchanged." },
                  { title: "String vs bytes", content: "str represents Unicode text; bytes represents raw binary data. Encode a str to bytes and decode bytes back to str when working with files or networks." },
                  { title: "Common interview patterns", content: "Reversing a string (s[::-1]), checking palindromes, and counting character frequency with collections.Counter are frequent building blocks in coding interview questions." }
                ]
              }
            ],
          },
          {
            title: "Advanced Python",
            slug: "advanced-python",
            description: "Decorators, generators, and object-oriented patterns.",
            topics: [
              {
                title: "Decorators",
                slug: "python-decorators",
                shortDescription: "Modify function behavior without changing the function.",
                estimatedMinutes: 20,
                sections: [
                  { title: "How decorators work", content: "A decorator is a function that takes a function as input and returns a modified version. They enable elegant cross-cutting concerns.\n\nExample:\ndef shout(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs).upper()\n    return wrapper\n\n@shout\ndef greet():\n    return \"hello\"" },
                  { title: "functools.wraps", content: "Wrapping a function loses its original name and docstring unless you apply functools.wraps to the wrapper, which preserves that metadata for debugging and introspection." },
                  { title: "Decorators with arguments", content: "A decorator factory is a function that returns a decorator, allowing you to parameterize behavior.\n\nExample:\ndef repeat(times):\n    def decorator(fn):\n        def wrapper(*a, **k):\n            for _ in range(times):\n                fn(*a, **k)\n        return wrapper\n    return decorator" },
                  { title: "Common patterns", content: "Caching (functools.lru_cache), timing, logging, retries, and authentication checks are typical use cases for decorators." },
                  { title: "Class-based decorators", content: "A class implementing __call__ can also act as a decorator, useful when the decorator needs to maintain state across calls." }
                ]
              },
              {
                title: "Generators and Iterators",
                slug: "python-generators-iterators",
                shortDescription: "Produce values lazily for memory-efficient iteration.",
                estimatedMinutes: 18,
                sections: [
                  { title: "The yield keyword", content: "A function containing yield becomes a generator function; calling it returns a generator object that produces values one at a time, pausing state between calls.\n\nExample:\ndef countdown(n):\n    while n > 0:\n        yield n\n        n -= 1" },
                  { title: "Iterators protocol", content: "An iterable implements __iter__; an iterator implements __next__ and raises StopIteration when exhausted. Generators automatically satisfy this protocol." },
                  { title: "Memory efficiency", content: "Generators produce values on demand instead of building an entire collection in memory, making them ideal for large or infinite sequences." },
                  { title: "yield from", content: "yield from delegates iteration to a sub-generator or iterable, simplifying generator composition." },
                  { title: "When to use generators", content: "Reach for generators when processing streams of data, large files, or pipelines where you don't need every value in memory simultaneously." }
                ]
              }
            ]
          }
        ],
      },
    ],
  };

  await ensureCategory(pythonCategory);
  console.log("✓ Python Fundamentals category seeded");
}

async function main() {
  await seedPythonCategory();
}

main()
  .catch((error) => {
    console.error("Python seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
