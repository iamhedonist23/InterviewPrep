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

async function seedPythonCategory() {
  const pythonCategory: CategorySeed = {
    name: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Understand Python syntax, collection types, functions, and common interview-ready patterns.",
    icon: "PY",
    sortOrder: 4,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build strong Python fundamentals for interviews and day-to-day coding.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Python Basics – The Foundation",
            slug: "python-basics",
            description: "Core Python concepts and mental models.",
            topics: [
              {
                title: "Variables and Functions – Dynamic and Expressive",
                slug: "python-variables-functions",
                shortDescription: "Define values and reusable logic in Python.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Variables – Dynamic References", content: "Python variables are dynamic references to objects. The same variable can point to a different type of object at different times. This flexibility makes Python easy to use but requires careful type awareness. Example: `x = 5; x = \"now a string\"` – `x` now references a string, not the integer." },
                  { title: "Functions – Reusable Logic", content: "Functions are defined with `def`. They support positional, keyword, default, and variable arguments. Example:\n```python\ndef greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"\n```\nFunctions can return any value, and `None` is the default return." },
                  { title: "*args and **kwargs – Flexible Signatures", content: "`*args` collects extra positional arguments into a tuple. `**kwargs` collects extra keyword arguments into a dict. This allows functions to handle variable numbers of arguments.\n```python\ndef total(*numbers, **options):\n    result = sum(numbers)\n    return -result if options.get('negate') else result\n```" },
                  { title: "Scope – LEGB Rule", content: "Python resolves names in this order: **L**ocal (inside function), **E**nclosing (outer functions), **G**lobal (module), **B**uilt‑in. Nested functions can access enclosing scope variables (closures)." },
                  { title: "Lambda Expressions – Anonymous Functions", content: "Lambdas are one‑line anonymous functions. Used with `sorted`, `map`, `filter`.\n```python\nsorted(people, key=lambda p: p['age'])\n```" },
                  { title: "Common Gotchas – Mutable Defaults", content: "Default arguments are evaluated once at definition, not per call. So `def f(items=[]):` will share the same list across calls. Use `None` and initialise inside:\n```python\ndef f(items=None):\n    items = items or []\n```" },
                ],
              },
              {
                title: "Collections and Iteration – Working with Data",
                slug: "python-collections-iteration",
                shortDescription: "Work with lists, tuples, dicts, and sets.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Lists vs Tuples – Mutable vs Immutable", content: "Lists are mutable (`[1, 2, 3]`). Tuples are immutable (`(1, 2, 3)`). Use tuples for fixed, hashable groupings (e.g., dictionary keys)." },
                  { title: "Dictionaries and Sets – Hash‑Based", content: "Dictionaries map keys to values (`{\"alice\": 30}`). Sets store unique elements (`{1, 2, 3}`). Both are O(1) average for lookups. Keys must be hashable (immutable)." },
                  { title: "Iterating Collections", content: "`for` loops iterate directly. `enumerate()` adds an index. `zip()` pairs elements from multiple iterables.\n```python\nfor i, name in enumerate([\"a\", \"b\"]):\n    print(i, name)\n```" },
                  { title: "Slicing – Sub‑Sequences", content: "`sequence[start:stop:step]` extracts sub‑sequences. `nums[::-1]` reverses. Works on lists, tuples, strings." },
                  { title: "Dictionary Methods", content: "`.get(key, default)` avoids `KeyError`. `.items()`, `.keys()`, `.values()` return iterable views. Dict comprehensions: `{x: x*x for x in range(5)}`." },
                  { title: "Choosing the Right Collection", content: "List: ordered, mutable. Tuple: fixed, hashable. Set: uniqueness, fast membership. Dict: key‑value lookups." },
                ],
              },
              {
                title: "List Comprehensions – Concise Transformations",
                slug: "python-list-comprehensions",
                shortDescription: "Create and filter collections with concise syntax.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Basic Comprehensions", content: "`[expr for item in iterable]` – faster and more readable than loops. Example: `[x*x for x in range(10)]`." },
                  { title: "Nested and Filtered", content: "`[expr for item in iterable if condition]`. Nested loops: `[(x, y) for x in range(3) for y in range(3)]`." },
                  { title: "Dict and Set Comprehensions", content: "`{x: x*x for x in range(5)}` and `{len(w) for w in words}`." },
                  { title: "Generator Expressions", content: "Use `()` instead of `[]` – lazy evaluation, memory‑efficient for large data." },
                  { title: "Readability Limits", content: "Keep comprehensions simple. Use loops for complex logic." },
                ],
              },
              {
                title: "String Operations – Text Manipulation",
                slug: "python-string-operations",
                shortDescription: "Manipulate and format text effectively.",
                estimatedMinutes: 20,
                sections: [
                  { title: "String Methods", content: "`split()`, `join()`, `replace()`, `find()`, `strip()`, `lower()`, `upper()`. Example: `\", \".join([\"a\", \"b\"])` → `'a, b'`." },
                  { title: "F‑strings – Modern Formatting", content: "`f\"Hello, {name}! {2 + 2=}\"` – evaluated at runtime. Also `.format()` and `%`." },
                  { title: "Immutability", content: "Strings are immutable; every method returns a new string." },
                  { title: "String vs Bytes", content: "`str` is Unicode; `bytes` is raw binary. Use `.encode()` and `.decode()`." },
                  { title: "Common Interview Patterns", content: "Reversing: `s[::-1]`. Palindromes: `s == s[::-1]`. Character frequency: `collections.Counter(s)`." },
                ],
              },
            ],
          },
          {
            title: "Core Language Features",
            slug: "python-core-features",
            description: "Essential features: decorators, generators, and basic classes.",
            topics: [
              {
                title: "Decorators – Wrapping Functions",
                slug: "python-decorators",
                shortDescription: "Modify function behavior without changing the function.",
                estimatedMinutes: 22,
                sections: [
                  { title: "How Decorators Work", content: "A decorator is a function that takes a function and returns a wrapped version. `@shout` is syntactic sugar for `greet = shout(greet)`." },
                  { title: "`functools.wraps` – Preserving Metadata", content: "Without `wraps`, the wrapper loses the original function's name and docstring. Use `@wraps` to preserve them." },
                  { title: "Decorators with Arguments", content: "A decorator factory returns a decorator: `@repeat(3)`." },
                  { title: "Common Patterns", content: "Caching (`@lru_cache`), timing, logging, retries, authentication." },
                  { title: "Class‑based Decorators", content: "A class with `__call__` can act as a decorator, useful for stateful decorators." },
                ],
              },
              {
                title: "Generators and Iterators – Lazy Evaluation",
                slug: "python-generators-iterators",
                shortDescription: "Produce values lazily for memory-efficient iteration.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The `yield` Keyword", content: "A function with `yield` becomes a generator. It yields values one at a time, pausing execution between calls." },
                  { title: "Iterator Protocol", content: "Iterable objects implement `__iter__`; iterators implement `__next__`. Generators satisfy both." },
                  { title: "Memory Efficiency", content: "Generators don't build full collections; they compute on the fly. Great for large files or infinite sequences." },
                  { title: "`yield from` – Delegation", content: "Delegates iteration to another generator or iterable." },
                  { title: "When to Use Generators", content: "Use for processing large data streams, pipelines, or when you don't need all values at once." },
                ],
              },
              {
                title: "Classes Basics – OOP in Python",
                slug: "python-classes-basics",
                shortDescription: "Define and use classes, methods, and simple inheritance.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Class Definition", content: "`class Dog:` – `__init__` is the constructor, `self` refers to the instance.\n```python\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f\"{self.name} says woof!\"\n```" },
                  { title: "Instance Methods", content: "Methods receive `self` (the instance) as the first argument." },
                  { title: "Class and Static Methods", content: "`@classmethod` receives the class (`cls`). `@staticmethod` receives neither (like a normal function)." },
                  { title: "Inheritance", content: "`class Child(Parent):` – use `super()` to call parent methods." },
                  { title: "`__str__` and `__repr__`", content: "`__str__` for user‑friendly output; `__repr__` for debugging." },
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
        description: "Dive into object‑oriented programming, modules, file handling, and more.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Object‑Oriented Python – Advanced",
            slug: "python-oop",
            description: "Advanced OOP: inheritance, polymorphism, magic methods, and dataclasses.",
            topics: [
              {
                title: "Inheritance and Polymorphism",
                slug: "python-inheritance-polymorphism",
                shortDescription: "Build class hierarchies and use polymorphism.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Inheritance Syntax", content: "`class Child(Parent):` – child inherits all methods and attributes." },
                  { title: "Overriding Methods", content: "Redefine parent methods in the child." },
                  { title: "`super()` – Call Parent Methods", content: "`super().__init__(...)` calls the parent constructor." },
                  { title: "Multiple Inheritance", content: "Python supports multiple inheritance. Method Resolution Order (MRO) determines the lookup order. Use `ClassName.__mro__` to inspect." },
                  { title: "Abstract Classes", content: "Use `ABC` and `@abstractmethod` from the `abc` module to define interfaces." },
                ],
              },
              {
                title: "Magic Methods (Dunder) – Customizing Objects",
                slug: "python-magic-methods",
                shortDescription: "Control object behavior with __init__, __add__, __len__, etc.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Common Magic Methods", content: "`__str__`, `__repr__`, `__len__`, `__getitem__`, `__setitem__`." },
                  { title: "Operator Overloading", content: "`__add__`, `__sub__`, `__eq__` – define behavior for `+`, `-`, `==`." },
                  { title: "Context Managers with `__enter__` and `__exit__`", content: "Enable `with` statements for resource management." },
                ],
              },
              {
                title: "Dataclasses – Less Boilerplate",
                slug: "python-dataclasses",
                shortDescription: "Simplify class definitions with `@dataclass`.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What are Dataclasses?", content: "`@dataclass` automatically generates `__init__`, `__repr__`, `__eq__`, and `__hash__`." },
                  { title: "Usage", content: "```python\nfrom dataclasses import dataclass\n\n@dataclass\nclass User:\n    name: str\n    age: int\n```" },
                  { title: "Frozen Dataclasses", content: "`@dataclass(frozen=True)` makes instances immutable." },
                ],
              },
            ],
          },
          {
            title: "Modules, Packages, and File I/O",
            slug: "python-modules-io",
            description: "Organise code and work with external data.",
            topics: [
              {
                title: "Modules and Imports",
                slug: "python-modules",
                shortDescription: "Import, create, and use modules.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Import Statements", content: "`import module`, `from module import name`, `import module as alias`." },
                  { title: "Creating Modules", content: "Any `.py` file is a module. `__name__ == '__main__'` guards execution when run directly." },
                  { title: "Packages", content: "A directory with `__init__.py` is a package. `__all__` defines what is imported with `from package import *`." },
                ],
              },
              {
                title: "File Operations",
                slug: "python-file-io",
                shortDescription: "Read and write text and binary files.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Opening Files", content: "`open()` with modes: `'r'` (read), `'w'` (write), `'a'` (append), `'b'` (binary), `'+'` (update)." },
                  { title: "Reading", content: "`read()`, `readline()`, `readlines()`. Use `with` for automatic closing." },
                  { title: "Writing", content: "`write()`, `writelines()`." },
                  { title: "Context Managers", content: "`with open(...) as f:` ensures the file is closed even if an error occurs." },
                ],
              },
              {
                title: "Working with JSON and CSV",
                slug: "python-json-csv",
                shortDescription: "Parse and generate common data formats.",
                estimatedMinutes: 18,
                sections: [
                  { title: "JSON Module", content: "`json.dump()` (to file), `json.load()` (from file), `json.dumps()` (to string), `json.loads()` (from string)." },
                  { title: "CSV Module", content: "`csv.reader`, `csv.writer`, `DictReader`, `DictWriter` for dictionary‑based access." },
                ],
              },
            ],
          },
          {
            title: "Exceptions and Context Managers",
            slug: "python-exceptions",
            description: "Handle errors and manage resources.",
            topics: [
              {
                title: "Exception Handling",
                slug: "python-exception-handling",
                shortDescription: "try, except, else, finally, and raise.",
                estimatedMinutes: 20,
                sections: [
                  { title: "`try`/`except`", content: "Catch specific exceptions. Multiple `except` blocks handle different types." },
                  { title: "`else` and `finally`", content: "`else` runs if no exception; `finally` always runs." },
                  { title: "Raising Exceptions", content: "`raise ValueError(\"message\")`." },
                  { title: "Custom Exceptions", content: "Subclass `Exception` to create domain‑specific errors." },
                ],
              },
              {
                title: "Context Managers – `with` Statement",
                slug: "python-context-managers",
                shortDescription: "Use with statement and create custom context managers.",
                estimatedMinutes: 18,
                sections: [
                  { title: "The `with` Statement", content: "Simplifies resource management (files, locks)." },
                  { title: "`contextlib` – `@contextmanager`", content: "A decorator that turns a generator into a context manager." },
                  { title: "Class‑based with `__enter__` and `__exit__`", content: "Full control over setup and teardown." },
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
        description: "Concurrency, metaprogramming, performance, modern Python, and packaging.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Concurrency",
            slug: "python-concurrency",
            description: "Threading, multiprocessing, asyncio.",
            topics: [
              {
                title: "Threading and Multiprocessing",
                slug: "python-threading-multiprocessing",
                shortDescription: "Parallelism and concurrency models.",
                estimatedMinutes: 28,
                sections: [
                  { title: "The GIL – Global Interpreter Lock", content: "The GIL prevents multiple Python threads from executing simultaneously in CPU‑bound code. Use `multiprocessing` for CPU‑bound tasks." },
                  { title: "`threading` – I/O‑Bound Tasks", content: "Threads are lightweight and useful for I/O‑bound operations (network, disk). Use `threading.Thread` and `Queue`." },
                  { title: "`multiprocessing` – True Parallelism", content: "Creates separate processes, each with its own GIL. Use `Process`, `Pool`, `Queue`." },
                  { title: "Synchronization", content: "Use `Lock`, `Semaphore`, `Event` to coordinate threads/processes." },
                ],
              },
              {
                title: "`asyncio` – Async I/O",
                slug: "python-asyncio",
                shortDescription: "Async/await and event loop.",
                estimatedMinutes: 26,
                sections: [
                  { title: "`async` and `await`", content: "`async def` defines a coroutine. `await` suspends until the awaited coroutine finishes." },
                  { title: "Event Loop", content: "The event loop runs coroutines. Use `asyncio.run()` to start." },
                  { title: "Tasks and Futures", content: "`asyncio.create_task()` schedules a coroutine for concurrent execution." },
                  { title: "Async Context Managers", content: "`async with` for resources that need async setup/teardown." },
                  { title: "Common Libraries", content: "`aiohttp` (HTTP), `asyncpg` (PostgreSQL)." },
                ],
              },
            ],
          },
          {
            title: "Modern Python Features (3.8+)",
            slug: "modern-python",
            description: "Pattern matching, walrus operator, f‑strings, and more.",
            topics: [
              {
                title: "Pattern Matching – `match`/`case`",
                slug: "pattern-matching",
                shortDescription: "Structural pattern matching similar to switch.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Pattern Matching?", content: "Introduced in Python 3.10, `match`/`case` allows matching against patterns (literals, sequences, mappings, classes)." },
                  { title: "Basic Usage", content: "```python\nmatch command:\n    case \"quit\":\n        print(\"Goodbye\")\n    case [\"move\", x, y]:\n        print(f\"Move to {x}, {y}\")\n```" },
                  { title: "Matching with Classes", content: "`case Point(x, y):` matches instances of `Point` and extracts attributes." },
                ],
              },
              {
                title: "Walrus Operator – `:=`",
                slug: "walrus",
                shortDescription: "Assignment expressions.",
                estimatedMinutes: 16,
                sections: [
                  { title: "What is the Walrus Operator?", content: "`:=` assigns a value and returns it. Useful in `if` statements and list comprehensions." },
                  { title: "Example", content: "```python\nif (n := len(data)) > 10:\n    print(f\"Data is long: {n}\")\n```" },
                ],
              },
              {
                title: "Enums – Named Constants",
                slug: "python-enums",
                shortDescription: "Define enumerated constants.",
                estimatedMinutes: 16,
                sections: [
                  { title: "What are Enums?", content: "`from enum import Enum` – defines a set of named values. Example: `class Color(Enum): RED = 1; GREEN = 2`." },
                  { title: "Benefits", content: "Type‑safe, self‑documenting, iterable." },
                ],
              },
            ],
          },
          {
            title: "Metaprogramming and Type Hints",
            slug: "python-metaprogramming",
            description: "Descriptors, metaclasses, type hints, and static analysis.",
            topics: [
              {
                title: "Descriptors – Controlling Attribute Access",
                slug: "python-descriptors-deep",
                shortDescription: "Custom descriptors and their uses.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Descriptor Protocol", content: "`__get__`, `__set__`, `__delete__` – allows custom attribute access." },
                  { title: "Data vs Non‑data Descriptors", content: "Data descriptors (with `__set__`) take precedence over instance attributes." },
                  { title: "Examples", content: "Type checking, lazy properties, and ORM field definitions." },
                ],
              },
              {
                title: "Metaclasses – Class Factories",
                slug: "python-metaclasses",
                shortDescription: "Customise class creation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What are Metaclasses?", content: "A metaclass is the class of a class. It controls how classes are created." },
                  { title: "Using `type`", content: "Create classes dynamically: `type('MyClass', (object,), {'attr': 42})`." },
                  { title: "Use Cases", content: "Singletons, ORMs (like SQLAlchemy), registries." },
                ],
              },
              {
                title: "Type Hints and Static Analysis",
                slug: "python-type-hints",
                shortDescription: "Use typing module and mypy.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Type Annotations", content: "`def f(x: int) -> str:` – type hints are optional but improve readability and enable static analysis." },
                  { title: "`typing` Module", content: "`List`, `Dict`, `Optional`, `Union`, `Tuple`, `Any`, `TypeVar`, `Protocol`, `TypedDict`." },
                  { title: "`mypy` – Static Type Checker", content: "Run `mypy` to catch type errors before runtime." },
                ],
              },
            ],
          },
          {
            title: "Packaging and Distribution",
            slug: "python-packaging",
            description: "Create and distribute Python packages.",
            topics: [
              {
                title: "`pyproject.toml` – The Modern Way",
                slug: "pyproject-toml",
                shortDescription: "Define project metadata and dependencies.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What is `pyproject.toml`?", content: "The standard format for packaging metadata (replaces `setup.py` and `setup.cfg`)." },
                  { title: "Example", content: "```toml\n[project]\nname = \"my-package\"\nversion = \"0.1.0\"\ndependencies = [\"requests\", \"numpy\"]\n```" },
                  { title: "Build Backends", content: "`setuptools`, `hatch`, `poetry`, `pdm`." },
                ],
              },
              {
                title: "Publishing to PyPI",
                slug: "pypi-publish",
                shortDescription: "Upload packages to the Python Package Index.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Building", content: "`python -m build` creates `dist/` with `.tar.gz` and `.whl`." },
                  { title: "Uploading", content: "`twine upload dist/*` – requires a PyPI token." },
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
        description: "Common Python interview questions and problem‑solving patterns.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Data Structures and Algorithms",
            slug: "python-dsa-interview",
            description: "Key structures and patterns.",
            topics: [
              {
                title: "Lists, Tuples, and Dicts",
                slug: "python-interview-collections",
                shortDescription: "When to use each, common operations.",
                estimatedMinutes: 20,
                sections: [
                  { title: "List Comprehensions vs Loops", content: "Comprehensions are faster and more readable for simple transformations." },
                  { title: "Dict Tricks", content: "`.get()`, `.setdefault()`, `collections.defaultdict`, `Counter`." },
                  { title: "Tuple Unpacking", content: "`a, b = b, a` – clean variable swapping." },
                ],
              },
              {
                title: "Two‑Pointer and Sliding Window",
                slug: "python-two-pointer-sliding",
                shortDescription: "Common algorithmic patterns.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Two‑pointer", content: "For sorted arrays, palindrome checks, and pair sums." },
                  { title: "Sliding Window", content: "Subarrays, substrings. Example: max sum subarray, longest substring without repeating." },
                ],
              },
              {
                title: "Recursion and Memoization",
                slug: "python-recursion-memo",
                shortDescription: "Recursive solutions with caching.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Recursive Functions", content: "Base case and recursive call." },
                  { title: "Memoization with `lru_cache`", content: "`@lru_cache` from `functools` – caches results automatically." },
                  { title: "Common Problems", content: "Fibonacci, factorial, tree traversal." },
                ],
              },
            ],
          },
          {
            title: "Python Language Features",
            slug: "python-language-interview",
            description: "Language‑specific questions and gotchas.",
            topics: [
              {
                title: "Mutable vs Immutable",
                slug: "python-mutable-immutable",
                shortDescription: "Understand object mutability and implications.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Immutable Types", content: "`int`, `str`, `tuple`, `frozenset` – cannot be changed." },
                  { title: "Mutable Types", content: "`list`, `dict`, `set` – can be modified." },
                  { title: "Pass by Assignment", content: "All variables are references. Mutability determines if changes affect the original object." },
                ],
              },
              {
                title: "Scope and Closures",
                slug: "python-scope-closures",
                shortDescription: "LEGB, closures, and nonlocal.",
                estimatedMinutes: 18,
                sections: [
                  { title: "LEGB Rule", content: "Local, Enclosing, Global, Built‑in." },
                  { title: "Closures", content: "Inner functions that capture outer variables." },
                  { title: "`nonlocal` and `global`", content: "Use to modify variables in outer scopes." },
                ],
              },
              {
                title: "Decorators and Context Managers",
                slug: "python-decorators-context-interview",
                shortDescription: "How they work and when to use.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Decorator Internals", content: "Function that returns a function wrapper." },
                  { title: "Common Built‑in Decorators", content: "`@staticmethod`, `@classmethod`, `@property`." },
                  { title: "Context Manager Implementation", content: "`with` statement, `__enter__`/`__exit__`." },
                ],
              },
            ],
          },
          {
            title: "Common Coding Problems",
            slug: "python-coding-problems",
            description: "Typical interview questions.",
            topics: [
              {
                title: "String and Array Problems",
                slug: "python-string-array-problems",
                shortDescription: "Reverse, anagram, palindrome, two‑sum.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Reverse String", content: "`s[::-1]`." },
                  { title: "Palindrome Check", content: "`s == s[::-1]`." },
                  { title: "Anagram", content: "`Counter(s1) == Counter(s2)`." },
                  { title: "Two‑sum", content: "Use a dict for O(n)." },
                ],
              },
              {
                title: "Object‑Oriented Design",
                slug: "python-ood-problems",
                shortDescription: "Design classes for parking lot, elevator, etc.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Design a Parking Lot", content: "Multiple levels, spots, vehicles. Use classes for `ParkingLot`, `Level`, `Spot`, `Vehicle`." },
                  { title: "Design an Elevator System", content: "Requests, scheduling, floors." },
                ],
              },
              {
                title: "System‑Level Questions",
                slug: "python-system-level",
                shortDescription: "Handling large data, concurrency, and scaling.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Processing Large Files", content: "Use generators and chunking." },
                  { title: "Parallel Processing", content: "`multiprocessing`, `concurrent.futures`." },
                  { title: "Caching", content: "`lru_cache` for expensive calls." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(pythonCategory);
  console.log("✅ Python Fundamentals category seeded (ultra‑detailed)");
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