import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
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
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            seoDescription: topicSeed.description,
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

async function seedJavaCategory() {
  const javaCategory: CategorySeed = {
    name: "Java (Core)",
    slug: "java-core",
    description: "Master Core Java from basics to advanced: OOP, Collections, Exceptions, I/O, Concurrency, Generics, and more.",
    icon: "JAVA",
    sortOrder: 0,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn Java syntax, OOP fundamentals, and essential APIs.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Java Fundamentals",
            slug: "java-fundamentals",
            description: "Variables, data types, operators, control flow, arrays, and strings.",
            topics: [
{
  title: "Java overview and use cases",
  slug: "java-overview-and-use-cases",
  description:
    "A practical introduction to Java as a programming language, JVM-based runtime platform, and production ecosystem. Covers source compilation, bytecode, JVM execution, portability, major use cases, strengths, trade-offs, and the mental model expected in Java interviews.",
  estimatedMinutes: 30,
  sections: [
    {
      title: "What Java actually is",
      content: `Java is both a programming language and part of a runtime platform built around the Java Virtual Machine (JVM).

As a language, Java defines things such as classes, objects, interfaces, generics, exceptions, methods, expressions, primitive types, and the rules for how source code is written and compiled.

As a platform, Java provides the JVM and a large standard library. The JVM is responsible for loading Java bytecode and executing it on a particular operating system and CPU architecture.

This distinction matters because Java source code is not normally compiled directly into machine code for one operating system. A Java compiler such as javac normally translates source code into bytecode stored in .class files.

A simplified flow looks like this:

Java source code → javac compiler → Java bytecode (.class) → JVM → Machine instructions executed by the computer

The JVM therefore acts as the runtime layer between Java bytecode and the underlying machine.

This is the foundation behind Java's well-known portability model. A class file produced on one operating system can generally be used on another operating system when a compatible JVM is available.

However, "write once, run anywhere" does not mean that every Java application is automatically completely portable. Java code may still depend on operating-system paths, native libraries, environment variables, file permissions, fonts, external commands, or other platform-specific behavior. The Java language and standard APIs reduce many portability problems; they do not eliminate every system dependency.`
    },
    {
      title: "From .java file to running program",
      content: `Consider a very small program:

\`\`\`
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}
\`\`\`

When the file is saved as Hello.java, javac can compile it:

\`\`\`
javac Hello.java
\`\`\`

The compiler produces Hello.class. That class file contains Java bytecode rather than ordinary source code.

When you run:

\`\`\`
java Hello
\`\`\`

the JVM starts the application and loads the Hello class. It identifies the main method and begins execution from:

\`\`\`
public static void main(String[] args)
\`\`\`

The runtime process is more involved than simply "the JVM reads the file and runs it." Class loading, linking, initialization, bytecode execution, memory management, and runtime optimization all participate in executing a real Java application.

Modern JVMs can interpret bytecode and also use Just-In-Time (JIT) compilation to turn frequently executed code into optimized native machine instructions while the application is running.

That is why a better mental model is:

\`\`\`
source code → compilation → bytecode → class loading/linking/initialization → JVM execution → runtime optimization
\`\`\`

The exact implementation details depend on the JVM implementation and version, so implementation-specific behavior should not be confused with the Java language specification.`
    },
    {
      title: "JDK, JVM, and JRE: understand the difference",
      content: `These three terms are frequently confused in interviews.

JVM means Java Virtual Machine. It is the runtime engine that executes Java bytecode. The JVM specification describes the behavior a conforming implementation must provide, while concrete JVMs such as HotSpot contain implementation details and optimizations.

JDK means Java Development Kit. It is the development package used to build Java applications. It includes the tools needed by developers, including the Java compiler and runtime-related tools.

JRE traditionally meant the Java Runtime Environment: the pieces required to run Java applications. In modern Java distributions, the old standalone JRE packaging is no longer the normal way Java is distributed, so describing "install the JRE" as the universal modern setup is misleading.

For an interview, a useful distinction is:

- JVM: executes bytecode.
- JDK: provides the development tools and runtime needed to develop and run Java applications.
- JRE: a historical/runtime-oriented term that is useful for understanding older Java documentation and terminology.

The important idea is that JVM is the execution engine, while JDK is the developer-facing toolkit around the Java platform.`
    },
    {
      title: "Why Java became widely used",
      content: `Java became popular because several useful properties came together rather than because of one feature.

First, Java introduced a relatively strong portability story through bytecode and the JVM. Developers could target the Java platform instead of writing a completely separate implementation for every operating system.

Second, Java uses static typing. Many mistakes can therefore be detected by the compiler before the application runs.

Third, Java provides automatic memory management through garbage collection. Developers normally do not manually free ordinary Java objects as they would in a language with explicit memory-management APIs.

Fourth, the standard library is broad. Networking, collections, concurrency, I/O, dates and times, security-related APIs, reflection, and many other capabilities are available through the platform.

Fifth, Java developed a large ecosystem of frameworks, libraries, build tools, monitoring tools, testing tools, IDE support, and production experience.

This combination made Java particularly attractive for large systems where maintainability, team productivity, operational tooling, and long-term ecosystem support matter.

There are trade-offs. Java applications can have significant runtime and memory overhead compared with some lower-level approaches, startup time can matter for certain workloads, and the ecosystem is large enough that developers can easily make poor technology choices if they do not understand the underlying platform.`
    },
    {
      title: "Where Java is commonly used",
      content: `Java is particularly common in server-side and enterprise software.

Backend services often use Java for APIs, business logic, authentication, payment processing, order management, messaging, and data access.

Large enterprise systems have historically used Java because the language, libraries, frameworks, testing ecosystem, and operational tooling support long-lived codebases and large engineering teams.

Financial and transaction-heavy systems may use Java where predictable runtime behavior, concurrency support, mature libraries, and strong tooling are important. The fact that a system is written in Java does not automatically make it suitable for every financial workload; architecture and workload characteristics still determine the design.

Java is also used in data-processing and infrastructure tooling. The JVM ecosystem includes technologies for distributed processing, messaging, build systems, observability, and developer tooling.

Android is another important part of Java's history. Java was heavily used for Android application development for many years. Modern Android development also uses Kotlin extensively, so "Java is the Android language" is no longer an accurate description of the current Android ecosystem.

Java can also be used for desktop applications, command-line tools, test automation, embedded environments, and other applications. The correct question is not simply "Can Java do this?" but whether Java's runtime characteristics, ecosystem, libraries, deployment model, and team expertise fit the particular problem.`
    },
    {
      title: "Java's main strengths",
      content: `Java's strengths are especially visible in long-running production systems.

**1 — Strong static typing**

Types are checked by the compiler and runtime rules. This can catch many incorrect assumptions before production.

**2 — Mature concurrency support**

Java provides threads, executors, locks, concurrent collections, synchronization primitives, and newer concurrency features. This makes the platform suitable for applications that need to perform many tasks concurrently.

**3 — Automatic memory management**

Garbage collection removes much of the need for manual object lifetime management. Developers still need to understand allocation, object reachability, garbage collection behavior, and memory pressure.

**4 — Large ecosystem**

There are mature libraries and frameworks for web applications, databases, testing, observability, messaging, security, serialization, and many other areas.

**5 — Strong tooling**

Java has extensive IDE support, debuggers, profilers, monitoring tools, build systems, and testing frameworks.

**6 — Runtime optimization**

The JVM can profile running code and optimize frequently executed paths using JIT compilation. This allows long-running applications to achieve strong performance without requiring developers to manually compile every hot path.

These strengths explain why Java remains useful for large backend systems even though newer languages offer different syntax or programming models.`
    },
    {
      title: "Java trade-offs and when it may not be the best choice",
      content: `A good interview answer should not describe Java as universally "fast," "slow," "easy," or "heavy."

Java applications run on a managed runtime, so there is runtime machinery involved in class loading, garbage collection, JIT compilation, and other services. That can be a major advantage for productivity and runtime optimization, but it can also matter for startup time, memory usage, and operational tuning.

For very small utilities where a native executable with almost no runtime overhead is important, another technology may be a better fit.

For applications requiring direct control over memory layout, hardware instructions, or deterministic resource management, lower-level languages may provide capabilities that Java intentionally abstracts away.

For systems where rapid scripting and minimal ceremony are the main goals, a scripting language may be more convenient.

On the other hand, for a large backend service, Java's ecosystem and runtime can be a strong advantage.

The correct engineering decision depends on:

- workload and traffic pattern
- latency and throughput requirements
- startup-time requirements
- memory constraints
- deployment environment
- library and framework availability
- operational and monitoring requirements
- team expertise
- long-term maintenance cost

This is a more useful way to discuss Java than simply claiming that one language is "better" than another.`
    },
    {
      title: "A complete practical example",
      content: `Suppose a company needs an HTTP backend that receives an order, validates it, stores it in a database, and publishes an event to another service.

Java could be a reasonable choice because the JVM ecosystem provides mature support for HTTP servers, database access, connection pooling, serialization, concurrency, testing, metrics, logging, and distributed-system tooling.

The Java language would handle the application logic:

\`\`\`
class OrderService {
    public void createOrder(Order order) {
        validate(order);
        save(order);
        publishOrderCreated(order);
    }
}
\`\`\`

The actual production system would be much more complicated than this example. It would need transaction boundaries, failure handling, timeouts, retries, observability, authentication, database constraints, idempotency, and possibly message-delivery guarantees.

This illustrates an important point: Java is not the architecture. Java is the language and runtime platform used to implement an architecture.

A strong Java developer therefore needs to understand both language features and the runtime behavior behind them.`
    },
    {
      title: "Common misconceptions and interview traps",
      content: `**1 — "Java is completely platform independent."**

Better answer: Java bytecode is designed to be portable across compatible JVM implementations, but the application can still contain operating-system-specific dependencies.

**2 — "JVM and Java are the same thing."**

They are not. Java is the language and platform ecosystem; the JVM is the virtual machine specification/runtime mechanism that executes Java bytecode.

**3 — "javac executes Java code."**

javac compiles Java source code into bytecode. The JVM executes the resulting bytecode.

**4 — "The JVM always interprets bytecode."**

Not as a complete modern description. JVM implementations can use interpretation and JIT compilation, along with other runtime optimizations.

**5 — "Garbage collection means Java never has memory problems."**

False. Java applications can still run out of heap memory, retain objects unnecessarily, create excessive allocation pressure, leak resources such as files or connections, or experience long/expensive garbage-collection activity.

**6 — "Java is only for enterprise applications."**

False. Java is used for services, tools, data processing, infrastructure, automation, and many other kinds of software.

**7 — "JRE is always something I install separately."**

This reflects older Java distribution terminology. Modern Java distributions generally provide the JDK as the primary developer installation, and the historical standalone JRE model is no longer the normal packaging model.`
    },
    {
      title: "Interview-ready answer",
      content: `If an interviewer asks, "What is Java and where is it used?", a strong answer could be:

"Java is a statically typed, general-purpose programming language and runtime platform centered around the JVM. Java source code is normally compiled into platform-independent bytecode, which a compatible JVM loads and executes. This gives Java a strong portability model while still allowing the JVM implementation to optimize execution using techniques such as JIT compilation.

Java is widely used for backend and enterprise systems, financial applications, data-processing systems, infrastructure tooling, and many long-lived production applications. Its main strengths are the mature ecosystem, automatic memory management, strong concurrency support, extensive libraries, and excellent development and operational tooling.

The trade-off is that applications run on a managed runtime, so memory usage, startup time, garbage collection, and JVM behavior can matter depending on the workload. I would therefore choose Java based on the application's requirements and the ecosystem available for the problem rather than simply saying that Java is fast or platform independent."`
    },
    {
      title: "Practice questions",
      content: `1. What is the difference between Java the language and the JVM?

2. What happens when you compile Hello.java with javac?

3. Why does Java use bytecode instead of normally compiling source directly to one operating system's machine code?

4. Explain the relationship between JDK, JVM, and the historical JRE terminology.

5. What does "write once, run anywhere" actually mean, and what are its limitations?

6. Why can a Java application still have a memory leak even though Java has garbage collection?

7. What is JIT compilation and why can it improve performance in long-running applications?

8. Give three situations where Java is a strong choice and one situation where another technology may be more appropriate.

9. Is Java itself responsible for application architecture, or is it simply one part of the technology stack?

10. Explain the complete path from a .java source file to code executing on a CPU.

A useful hands-on exercise is to create Hello.java and run the compilation and execution commands:

\`\`\`
javac Hello.java
java Hello
\`\`\`

Then inspect the generated .class file and explain each stage without using the vague statement "Java just converts code into machine code."`
    },
  ],
},
              {
                title: "Variables and Data Types – Storing and Representing Data",
                slug: "variables-datatypes",
                description: "Primitive types, reference types, type casting, and wrappers.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Primitive Types", content: `Java has 8 primitive types: \`byte\` (8 bits), \`short\` (16), \`int\` (32), \`long\` (64), \`float\` (32), \`double\` (64), \`char\` (16‑bit Unicode), \`boolean\` (true/false). They are stored directly on the stack (or in registers) and are fast. Choose the smallest type that fits your data to save memory.` },
                  { title: "Reference Types", content: `Classes, interfaces, arrays, and enums are reference types. They are stored on the heap, and variables hold a reference (memory address). The default value for reference types is \`null\`. Unlike primitives, they can be \`null\` and support methods.` },
                  { title: "Wrapper Classes – Boxing and Unboxing", content: `Each primitive has a wrapper class: \`Byte\`, \`Short\`, \`Integer\`, \`Long\`, \`Float\`, \`Double\`, \`Character\`, \`Boolean\`. Autoboxing automatically converts \`int\` to \`Integer\` and vice versa. This is needed for collections (which store objects). Beware of \`null\` when unboxing – it throws \`NullPointerException\`.` },
                  { title: "Type Casting", content: `Widening (implicit) casts: \`int\` to \`long\` – safe. Narrowing (explicit) casts: \`long\` to \`int\` – may lose data (truncation). Use \`(type)\` to cast. For objects, upcasting is implicit; downcasting requires an explicit cast and may fail with \`ClassCastException\`.` },
                ],
              },
              {
                title: "Operators and Control Flow – Directing Program Logic",
                slug: "operators-controlflow",
                description: "Arithmetic, logical, bitwise, and conditional statements.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Operators", content: `Arithmetic (\`+\`, \`-\`, \`*\`, \`/\`, \`%\`), assignment (\`=\`, \`+=\`, etc.), comparison (\`==\`, \`!=\`, \`<\`, \`>\`), logical (\`&&\`, \`||\`, \`!\`), bitwise (\`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`), ternary (\`condition ? expr1 : expr2\`). Know the precedence and use parentheses for clarity.` },
                  { title: "if‑else and switch", content: `\`if (condition) { ... } else if { ... } else { ... }\` – for branching. \`switch\` works with \`int\`, \`String\`, \`enum\`, and \`char\`. Use \`break\` to avoid fall‑through. In modern Java, switch expressions (with \`->\`) return a value and are more concise.` },
                  { title: "Loops", content: `\`for (init; condition; update) { ... }\` – traditional. \`while (condition) { ... }\` – pre‑test. \`do { ... } while (condition);\` – post‑test. \`for (Type var : array/collection)\` – enhanced for‑each, which is safer and more readable.` },
                  { title: "break, continue, and return", content: `\`break\` exits the nearest loop/switch. \`continue\` skips to the next iteration. \`return\` exits a method. Use labels (e.g., \`outerLoop:\`) with \`break\`/\`continue\` to control nested loops.` },
                ],
              },
              {
                title: "Arrays and Strings – The Foundation of Data Handling",
                slug: "arrays-strings",
                description: "Declare, initialize, and manipulate arrays and Strings.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Arrays", content: `\`int[] arr = new int[5];\` or \`int[] arr = {1,2,3};\`. Zero‑based indexing, \`length\` property (not method). Arrays are fixed size; to grow, use \`ArrayList\`. Multidimensional arrays: \`int[][] matrix = new int[3][3];\`. Jagged arrays (sub‑arrays of different lengths) are allowed.` },
                  { title: "String Basics – Immutable and Pooled", content: `Strings are immutable – every method that changes a string creates a new object. They are stored in the String Pool (interned) for reusability. Common methods: \`length()\`, \`charAt()\`, \`substring()\`, \`indexOf()\`, \`equals()\`, \`compareTo()\`, \`toLowerCase()\`, \`toUpperCase()\`, \`trim()\`.` },
                  { title: "StringBuilder and StringBuffer – Mutable Strings", content: `\`StringBuilder\` is faster (non‑synchronized) and \`StringBuffer\` is thread‑safe (synchronized). Use \`StringBuilder\` for concatenation in loops to avoid creating many intermediate strings.` },
                ],
              },
            ],
          },
          {
            title: "Object-Oriented Programming – The Heart of Java",
            slug: "oop-basics",
            description: "Classes, objects, constructors, methods, and OOP principles.",
            topics: [
              {
                title: "Classes and Objects – Blueprints and Instances",
                slug: "classes-objects",
                description: "Define classes, create objects, and understand references.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Class Definition", content: `A class is a template: \`public class Car { String model; int year; void drive() { System.out.println("Driving!"); } }\`.` },
                  { title: "Creating Objects", content: `\`Car myCar = new Car();\` – \`new\` allocates memory and calls the constructor. The variable holds a reference to the object.` },
                  { title: "Instance vs Static", content: `Instance members belong to each object; static members belong to the class (shared). Use \`static\` for constants, utility methods, and counters. Access static members via the class name.` },
                  { title: "The 'this' Keyword", content: `Refers to the current instance. Used to disambiguate fields from parameters with the same name (e.g., \`this.model = model;\`). Also used to call another constructor (\`this(...)\`).` },
                ],
              },
              {
                title: "Constructors and Methods – Initialization and Behavior",
                slug: "constructors-methods",
                description: "Overloading, parameter passing, and method signatures.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Constructors", content: `Same name as class, no return type. Default constructor is provided if none defined. Overload constructors to provide flexibility. Use \`this()\` to call another constructor from the same class.` },
                  { title: "Method Overloading", content: `Multiple methods with the same name but different parameters (number, type, or order). Resolved at compile time. Return type alone is not sufficient to overload.` },
                  { title: "Pass by Value", content: `Java is pass‑by‑value: primitives pass the value; objects pass the reference by value (i.e., the reference is copied). Changes to the object's state affect the original, but reassigning the reference does not.` },
                  { title: "Return Types", content: `\`void\` for no return. Method must return a value compatible with the declared type. Use \`return\` early to exit.` },
                ],
              },
              {
                title: "Inheritance and Polymorphism – IS‑A and Many Forms",
                slug: "inheritance-polymorphism",
                description: "Extend classes, override methods, and runtime polymorphism.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Inheritance", content: `\`class Child extends Parent\` – child inherits fields/methods (except \`private\`). Java supports single inheritance (one parent) to avoid diamond problem. Use \`super\` to access parent members.` },
                  { title: "Method Overriding", content: `Subclass redefines a method with the same signature. Use \`@Override\` annotation (optional but helps detect errors). Runtime polymorphism: the actual method called depends on the object's runtime type.` },
                  { title: "The `super` Keyword", content: `\`super()\` calls the parent constructor (must be first statement). \`super.method()\` calls parent's version.` },
                  { title: "The `Object` Class", content: `All classes implicitly extend \`Object\`. It provides \`toString()\`, \`equals()\`, \`hashCode()\`, and \`getClass()\`. Override them as needed.` },
                ],
              },
              {
                title: "Encapsulation and Abstraction – Hiding Complexity",
                slug: "encapsulation-abstraction",
                description: "Access modifiers, abstract classes, and interfaces.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Access Modifiers", content: `\`private\` (only in class), \`default\` (package‑private), \`protected\` (package + subclasses), \`public\` (everywhere). Use \`private\` for fields and \`public\` for methods to enforce encapsulation.` },
                  { title: "Getters and Setters", content: `Encapsulate fields with accessors. This allows validation (e.g., \`setAge\` checks age range) and future changes without breaking client code.` },
                  { title: "Abstract Classes", content: `Cannot be instantiated; may contain abstract methods (no body). Used to provide common functionality to subclasses.` },
                  { title: "Interfaces", content: `Define a contract: methods without implementation (until default/static methods in Java 8). A class can implement multiple interfaces, overcoming single inheritance limitation.` },
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
        description: "Collections, exceptions, I/O, lambda expressions, and streams.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Java Collections Framework",
            slug: "collections",
            description: "List, Set, Map, Queue – implementations and use cases.",
            topics: [
              {
                title: "List Implementations – Ordered, Indexed Collections",
                slug: "list-impl",
                description: "ArrayList, LinkedList, Vector, Stack.",
                estimatedMinutes: 24,
                sections: [
                  { title: "ArrayList", content: `Resizable array – \`get(index)\` is O(1), \`add\` at end is amortised O(1), insertion/removal in middle is O(n). Good for random access and iteration.` },
                  { title: "LinkedList", content: `Doubly‑linked list – insertion/removal at ends is O(1), random access is O(n). Good for frequent insertions/removals at the beginning or middle when you have a reference.` },
                  { title: "Vector", content: `Synchronized version of \`ArrayList\` – legacy, avoid in new code. Use \`Collections.synchronizedList()\` if needed.` },
                  { title: "Stack", content: `LIFO – extends \`Vector\`. Use \`Deque\` (\`ArrayDeque\`) instead for better performance.` },
                ],
              },
              {
                title: "Set Implementations – Unique Elements",
                slug: "set-impl",
                description: "HashSet, LinkedHashSet, TreeSet.",
                estimatedMinutes: 18,
                sections: [
                  { title: "HashSet", content: `Hash‑based, O(1) average, no ordering. Uses \`hashCode()\` and \`equals()\`.` },
                  { title: "LinkedHashSet", content: `Maintains insertion order (via linked list) – O(1) but extra memory.` },
                  { title: "TreeSet", content: `Sorted (natural or \`Comparator\`) – O(log n) operations. Uses \`Comparable\` or \`Comparator\`.` },
                ],
              },
              {
                title: "Map Implementations – Key‑Value Storage",
                slug: "map-impl",
                description: "HashMap, LinkedHashMap, TreeMap, Hashtable, ConcurrentHashMap.",
                estimatedMinutes: 24,
                sections: [
                  { title: "HashMap", content: `Hash‑based, O(1) average, allows one \`null\` key, not thread‑safe. Use \`ConcurrentHashMap\` for concurrency.` },
                  { title: "LinkedHashMap", content: `Preserves insertion order (or access order if configured). Useful for LRU caches.` },
                  { title: "TreeMap", content: `Sorted keys (natural or \`Comparator\`) – O(log n). Implements \`NavigableMap\`.` },
                  { title: "Hashtable", content: `Synchronized, legacy, no \`null\` keys/values – deprecated. Use \`HashMap\` with \`Collections.synchronizedMap()\` if needed.` },
                  { title: "ConcurrentHashMap", content: `Thread‑safe, high concurrency via lock striping. Does not allow \`null\` keys or values.` },
                ],
              },
              {
                title: "Iterators and Comparable/Comparator",
                slug: "iterators-comparator",
                description: "Traverse collections and custom sorting.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Iterator and ListIterator", content: `\`Iterator\` allows forward traversal and safe removal. \`ListIterator\` adds backward traversal and modification.` },
                  { title: "Comparable – Natural Order", content: `Interface \`Comparable<T>\` with \`compareTo()\`. Used for default sorting (e.g., \`Collections.sort(list)\`).` },
                  { title: "Comparator – Custom Order", content: `\`Comparator<T>\` with \`compare()\`. Use for multiple sorting criteria or for classes that don't implement \`Comparable\`. Pass to \`Collections.sort(list, comparator)\`.` },
                ],
              },
            ],
          },
          {
            title: "Exception Handling – Graceful Error Management",
            slug: "exceptions",
            description: "Checked and unchecked exceptions, try‑catch‑finally, custom exceptions.",
            topics: [
              {
                title: "Exception Hierarchy – `Throwable` and its Children",
                slug: "exception-hierarchy",
                description: "Throwable, Exception, RuntimeException, Error.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Checked vs Unchecked", content: `Checked exceptions (subclasses of \`Exception\` except \`RuntimeException\`) must be caught or declared (\`throws\`). They represent recoverable conditions (e.g., \`IOException\`). Unchecked (\`RuntimeException\`) represent programming errors (e.g., \`NullPointerException\`).` },
                  { title: "Error", content: `\`Error\` and its subclasses are for serious issues (e.g., \`OutOfMemoryError\`) that applications usually shouldn't try to catch.` },
                ],
              },
              {
                title: "Handling Exceptions",
                slug: "exception-handling",
                description: "try, catch, finally, try‑with‑resources.",
                estimatedMinutes: 20,
                sections: [
                  { title: "try‑catch", content: `Wrap code that may throw. Catch specific exceptions from most to least specific. Use multi‑catch (Java 7+) for unrelated exceptions: \`catch (IOException | SQLException e)\`.` },
                  { title: "finally", content: `Always executes (unless \`System.exit()\`). Used for cleanup (closing resources).` },
                  { title: "try‑with‑resources", content: `Automatically closes resources that implement \`AutoCloseable\`. Example: \`try (BufferedReader br = new BufferedReader(new FileReader(...))) { ... }\`.` },
                ],
              },
              {
                title: "Custom Exceptions",
                slug: "custom-exceptions",
                description: "Extend Exception or RuntimeException.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Creating a Custom Exception", content: `\`\`\`
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) { super(msg); }
}
\`\`\`
Use checked or unchecked based on whether the caller should handle it.` },
                  { title: "Throwing and Catching", content: `\`throw new InsufficientFundsException("Not enough balance");\` and catch as usual.` },
                ],
              },
            ],
          },
          {
            title: "Lambda Expressions and Streams – Functional Programming",
            slug: "lambda-streams",
            description: "Functional programming in Java 8+.",
            topics: [
              {
                title: "Lambda Expressions – Anonymous Functions",
                slug: "lambda-expressions",
                description: "Functional interfaces and lambda syntax.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Syntax", content: `\`(parameters) -> expression\` or \`(parameters) -> { statements; }\`. Example: \`(a, b) -> a + b\`.` },
                  { title: "Functional Interfaces", content: `Interfaces with a single abstract method: \`Predicate<T>\`, \`Consumer<T>\`, \`Function<T,R>\`, \`Supplier<T>\`. Annotated with \`@FunctionalInterface\` (optional).` },
                  { title: "Method References", content: `\`::\` – shorthand for lambdas. Types: \`Class::staticMethod\`, \`obj::instanceMethod\`, \`Class::instanceMethod\`, \`Class::new\`.` },
                ],
              },
              {
                title: "Stream API – Processing Collections Declaratively",
                slug: "stream-api",
                description: "Pipeline operations for collections.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Creating Streams", content: `\`collection.stream()\`, \`Stream.of()\`, \`Arrays.stream()\`, \`IntStream.range()\`.` },
                  { title: "Intermediate Operations", content: `\`filter\`, \`map\`, \`sorted\`, \`distinct\`, \`limit\`, \`skip\` – they return a new stream and are lazy.` },
                  { title: "Terminal Operations", content: `\`collect\`, \`forEach\`, \`reduce\`, \`anyMatch\`, \`allMatch\`, \`count\` – they produce a result or side effect and trigger processing.` },
                  { title: "Parallel Streams", content: `\`parallelStream()\` – uses the Fork/Join pool. Only use for CPU‑bound operations on large datasets; avoid shared mutable state.` },
                ],
              },
            ],
          },
          {
            title: "I/O and NIO – Reading and Writing Data",
            slug: "io-nio",
            description: "File I/O, byte/character streams, and NIO channels.",
            topics: [
              {
                title: "Byte and Character Streams",
                slug: "io-streams",
                description: "InputStream, OutputStream, Reader, Writer.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Byte Streams", content: `\`InputStream\`/\`OutputStream\` for binary data. \`FileInputStream\`, \`FileOutputStream\`, \`BufferedInputStream\`.` },
                  { title: "Character Streams", content: `\`Reader\`/\`Writer\` for text. \`FileReader\`, \`FileWriter\`, \`BufferedReader\`, \`PrintWriter\`. Use \`BufferedReader\` for efficient reading.` },
                  { title: "Serialization", content: `\`Serializable\` interface – marks a class as serializable. Use \`ObjectOutputStream\`/\`ObjectInputStream\`. Beware of versioning (\`serialVersionUID\`).` },
                ],
              },
              {
                title: "NIO (New I/O) – Channels and Buffers",
                slug: "nio",
                description: "Channels, Buffers, and Path/Files API.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Path and Files", content: `\`java.nio.file.Path\` and \`Files\` utility class. Methods: \`Files.readAllLines()\`, \`Files.write()\`, \`Files.copy()\`, \`Files.delete()\`, \`Files.exists()\`.` },
                  { title: "Channels and Buffers", content: `\`FileChannel\`, \`ByteBuffer\` – for high‑performance I/O. More complex than streams but more efficient.` },
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
        description: "Concurrency, generics, reflection, annotations, memory management, design patterns, and new Java features.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Concurrency and Multithreading",
            slug: "concurrency",
            description: "Threads, synchronization, and concurrent utilities.",
            topics: [
              {
                title: "Thread Basics – Creating and Running Threads",
                slug: "thread-basics",
                description: "Creating threads, Thread class, Runnable interface.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Extending Thread", content: `\`class MyThread extends Thread { public void run() { ... } }\`. Then \`new MyThread().start()\`.` },
                  { title: "Implementing Runnable", content: `Preferred because Java doesn't allow multiple inheritance. Use \`new Thread(new MyRunnable()).start()\`.` },
                  { title: "ExecutorService – Thread Pools", content: `\`Executors.newFixedThreadPool(10)\`, \`newCachedThreadPool()\`, \`newScheduledThreadPool()\`. Submit \`Runnable\` or \`Callable\` tasks.` },
                ],
              },
              {
                title: "Synchronization – Protecting Shared Data",
                slug: "synchronization",
                description: "synchronized, volatile, Lock, atomic classes.",
                estimatedMinutes: 24,
                sections: [
                  { title: "synchronized", content: `Method or block – uses intrinsic lock. Ensures atomicity and visibility. Example: \`public synchronized void increment() { count++; }\`.` },
                  { title: "volatile", content: `Ensures visibility (reads/writes go to main memory) but not atomicity. Used for flags.` },
                  { title: "ReentrantLock", content: `More flexible than \`synchronized\`: \`tryLock()\`, \`lockInterruptibly()\`, and fairness policy. Use with \`try/finally\` to unlock.` },
                  { title: "Atomic Classes", content: `\`AtomicInteger\`, \`AtomicReference\`, etc. Provide lock‑free thread‑safe operations.` },
                ],
              },
              {
                title: "Concurrent Collections",
                slug: "concurrent-collections",
                description: "ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue.",
                estimatedMinutes: 20,
                sections: [
                  { title: "ConcurrentHashMap", content: `Thread‑safe, high concurrency via lock striping. Does not allow \`null\` keys or values.` },
                  { title: "CopyOnWriteArrayList", content: `Thread‑safe for read‑heavy scenarios; writes create a new copy.` },
                  { title: "BlockingQueue", content: `\`LinkedBlockingQueue\`, \`ArrayBlockingQueue\` – support \`put()\` (block if full) and \`take()\` (block if empty).` },
                ],
              },
            ],
          },
          {
            title: "Generics and Type System",
            slug: "generics",
            description: "Type parameters, wildcards, type erasure.",
            topics: [
              {
                title: "Generic Classes and Methods",
                slug: "generic-classes",
                description: "Defining and using generics.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Class Definition", content: `\`class Box<T> { private T value; public T get() { return value; } }\`` },
                  { title: "Generic Methods", content: `\`public static <T> T getFirst(List<T> list) { return list.get(0); }\`` },
                ],
              },
              {
                title: "Bounded Types and Wildcards",
                slug: "wildcards",
                description: "Upper and lower bounds, ? extends T, ? super T.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Upper Bounded", content: `\`? extends Number\` – for reading (producer).` },
                  { title: "Lower Bounded", content: `\`? super Integer\` – for writing (consumer).` },
                  { title: "Unbounded", content: `\`?\` – when you don't care about the type.` },
                  { title: "PECS – Producer Extends, Consumer Super", content: `Use \`extends\` when you get values out (read), \`super\` when you put values in (write).` },
                ],
              },
              {
                title: "Type Erasure – How Generics Are Implemented",
                slug: "type-erasure",
                description: "How generics work at runtime.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Erasure Process", content: `The compiler removes generic type parameters and replaces them with their bounds (or \`Object\`). This ensures backward compatibility with pre‑generics code.` },
                  { title: "Bridge Methods", content: `Synthetic methods generated to preserve polymorphism in overridden generic methods.` },
                ],
              },
            ],
          },
          {
            title: "Reflection and Annotations – Metaprogramming",
            slug: "reflection-annotations",
            description: "Introspection, dynamic invocation, and metadata.",
            topics: [
              {
                title: "Reflection API",
                slug: "reflection",
                description: "Inspect classes, methods, fields at runtime.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Class Object", content: `\`Class.forName()\`, \`obj.getClass()\`, \`SomeClass.class\`.` },
                  { title: "Accessing Methods", content: `\`Method.invoke()\` – call methods dynamically.` },
                  { title: "Accessing Fields", content: `\`Field.setAccessible(true)\` to access private fields.` },
                ],
              },
              {
                title: "Annotations – Metadata",
                slug: "annotations",
                description: "Built‑in and custom annotations, retention policy.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Built‑in", content: `\`@Override\`, \`@Deprecated\`, \`@SuppressWarnings\`.` },
                  { title: "Custom Annotations", content: `\`@interface MyAnnotation { String value(); }\`` },
                  { title: "Retention", content: `\`RetentionPolicy.SOURCE\` (discarded), \`CLASS\` (in bytecode, not runtime), \`RUNTIME\` (available at runtime).` },
                ],
              },
            ],
          },
          // --- CORRECTED MODULE: Memory Management and Garbage Collection ---
          {
            title: "Memory Management and Garbage Collection",
            slug: "memory-gc",
            description: "Heap, stack, garbage collectors, and performance tuning.",
            topics: [
              {
                title: "Heap and Stack – Memory Areas",
                slug: "heap-stack",
                description: "Heap vs stack memory allocation.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Heap and Stack", content: `Heap stores all objects; stack stores primitives and references. The stack is per‑thread, heap is shared.` },
                  { title: "Garbage Collection Basics", content: `GC reclaims memory of unreachable objects. Major collectors: Serial, Parallel, CMS, G1, ZGC. G1 is the default on most JVMs.` },
                  { title: "Generations", content: `Young (Eden + Survivor), Old (Tenured). Most objects die young; minor GCs are fast, major GCs (full) are expensive.` },
                  { title: "Tuning GC", content: `Use flags like \`-Xmx\` (max heap), \`-XX:+UseG1GC\`, \`-XX:MaxGCPauseMillis\`. Monitor GC logs.` },
                  { title: "Memory Leaks", content: `Unintentional object retention; use profilers like JProfiler or VisualVM.` },
                ],
              },
            ],
          },
          {
            title: "Java Memory Model (JMM)",
            slug: "jmm",
            description: "Happens‑before relationships, visibility, and ordering.",
            topics: [
              {
                title: "The JMM",
                slug: "jmm-details",
                description: "Defines rules for how threads see memory changes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The JMM", content: `Defines rules for how threads see memory changes. Without synchronization, writes may not be visible to other threads.` },
                  { title: "Happens‑Before", content: `If action A happens‑before B, then A's effects are visible to B. Rules: \`synchronized\`, \`volatile\`, \`Thread.start()\`, \`Thread.join()\`.` },
                  { title: "Safe Publication", content: `Publishing an object safely ensures all threads see a consistent state. Use \`volatile\` or a concurrent collection.` },
                ],
              },
            ],
          },
          {
            title: "Records, Sealed Classes, and Pattern Matching (Java 14‑21)",
            slug: "new-features",
            description: "Modern Java features for data modelling and pattern matching.",
            topics: [
              {
                title: "Records – Immutable Data Carriers",
                slug: "records",
                description: "Record classes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Records", content: `\`record Point(int x, int y) { }\` – generates constructor, accessors, \`equals()\`, \`hashCode()\`, \`toString()\`. Great for DTOs and value objects.` },
                  { title: "Sealed Classes", content: `\`sealed class Shape permits Circle, Square { }\` – only permitted classes can extend. Useful for exhaustive \`switch\`.` },
                  { title: "Pattern Matching for `instanceof`", content: `\`if (obj instanceof String s) { ... }\` – combines type check and variable declaration.` },
                  { title: "Switch Expressions", content: `\`String result = switch (day) { case MONDAY -> "Work"; default -> "Relax"; };\` – returns a value and is more concise.` },
                ],
              },
            ],
          },
          {
            title: "Java Modules (JPMS) – Modularity",
            slug: "modules",
            description: "Project Jigsaw, module descriptors, and encapsulation.",
            topics: [
              {
                title: "What are Modules?",
                slug: "module-info",
                description: "Java modules and module descriptors.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What are Modules?", content: `Introduced in Java 9, modules allow you to group packages and define their dependencies. A \`module-info.java\` declares required modules and exports packages.` },
                  { title: "Module Descriptor", content: `\`module com.example.app { requires java.sql; exports com.example.api; }\`` },
                  { title: "Benefits", content: `Strong encapsulation, reliable configuration, improved security.` },
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
        description: "Common Core Java interview questions, tricky topics, and coding problems.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-concepts-interview",
            description: "OOP, equals/hashCode, immutability, and exceptions.",
            topics: [
              {
                title: "OOP Principles",
                slug: "oop-principles",
                description: "Encapsulation, inheritance, polymorphism, abstraction.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Explain each with examples", content: `**Encapsulation** – bundling data with methods, hiding internal state (via \`private\` fields and getters/setters). **Inheritance** – IS‑A relationship (e.g., \`Dog extends Animal\`). **Polymorphism** – overloading (compile‑time) and overriding (runtime). **Abstraction** – hiding complexity via abstract classes/interfaces.` },
                ],
              },
              {
                title: "equals() and hashCode() Contract",
                slug: "equals-hashcode",
                description: "Why override both, and the contract.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Contract", content: `If \`a.equals(b)\` then \`a.hashCode() == b.hashCode()\`. Always override both. Use \`Objects.hash()\` for consistent implementation.` },
                  { title: "Common Mistakes", content: `Only overriding \`equals()\` leads to broken hash maps (keys not found). Not checking \`null\` or type in \`equals()\` causes \`ClassCastException\`.` },
                ],
              },
              {
                title: "Immutability",
                slug: "immutability",
                description: "How to create immutable classes, benefits.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Rules", content: `Make class \`final\`, fields \`final\`, no setters, return defensive copies (for mutable fields).` },
                  { title: "Benefits", content: `Thread‑safe, safe for caching, easier reasoning.` },
                ],
              },
            ],
          },
          {
            title: "Collections and Concurrency",
            slug: "collections-concurrency-interview",
            description: "Common questions on collections and thread safety.",
            topics: [
              {
                title: "ArrayList vs LinkedList",
                slug: "arraylist-vs-linkedlist",
                description: "When to use each.",
                estimatedMinutes: 16,
                sections: [
                  { title: "ArrayList", content: `Random access fast; insert/delete in middle slow.` },
                  { title: "LinkedList", content: `Insert/delete fast; random access slow.` },
                ],
              },
              {
                title: "HashMap vs ConcurrentHashMap",
                slug: "hashmap-vs-concurrenthashmap",
                description: "Thread‑safety and performance.",
                estimatedMinutes: 18,
                sections: [
                  { title: "HashMap", content: `Non‑thread‑safe; fast.` },
                  { title: "ConcurrentHashMap", content: `Thread‑safe; uses lock striping.` },
                ],
              },
              {
                title: "Synchronized vs ReentrantLock",
                slug: "synchronized-vs-lock",
                description: "Pros and cons of each.",
                estimatedMinutes: 16,
                sections: [
                  { title: "synchronized", content: `Simple, built‑in, but less flexible.` },
                  { title: "ReentrantLock", content: `More control, \`tryLock\`, fairness, condition.` },
                ],
              },
            ],
          },
          {
            title: "Design Patterns and Best Practices",
            slug: "design-patterns-interview",
            description: "Singleton, Factory, Builder, Observer, and more.",
            topics: [
              {
                title: "Singleton Pattern",
                slug: "singleton",
                description: "Ensure only one instance.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Eager Initialization", content: `\`private static final Singleton INSTANCE = new Singleton();\`` },
                  { title: "Lazy Initialization", content: `Double‑checked locking with \`volatile\`.` },
                  { title: "Enum Singleton", content: `Recommended – serialization‑safe.` },
                ],
              },
              {
                title: "Factory Pattern",
                slug: "factory",
                description: "Centralise object creation.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Simple Factory", content: `static method returning appropriate subclass.` },
                  { title: "Factory Method", content: `Subclasses decide which class to instantiate.` },
                ],
              },
              {
                title: "Observer Pattern",
                slug: "observer",
                description: "One‑to‑many notification.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Concept", content: `Subject maintains list of observers; notifies them on state change.` },
                  { title: "Java Implementation", content: `\`java.util.Observer\` (deprecated), use \`PropertyChangeListener\` or custom.` },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(javaCategory);
  console.log("✅ Java (Core) category seeded (ultra‑detailed)");
}

async function main() {
  await seedJavaCategory();
}

main()
  .catch((error) => {
    console.error("Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });