import { prisma } from "@/lib/prisma";

const JAVA_TOPICS = [
  {
    level: "BEGINNER",
    modules: [
      {
        title: "Java Fundamentals",
        description: "Learn the basics of Java programming",
        topics: [
          {
            title: "Introduction to Java",
            slug: "intro-java",
            description: "What is Java? History, features, JVM, and why Java is used",
            estimatedMinutes: 16,
            sections: [
              {
                title: "What is Java?",
                content: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is intended to let application developers write once and run anywhere (WORA).\n\nKey characteristics:\n• Platform-independent (bytecode runs on JVM)\n• Object-oriented (everything is an object)\n• Secure (Java security model protects against malicious code)\n• Robust (strong type checking, memory management)\n• Multithreaded (built-in support for concurrent programming)",
              },
              {
                title: "JVM and Bytecode",
                content: "The Java Virtual Machine (JVM) is an abstract computing machine that enables a computer to run Java programs and programs written in other languages that are compiled to Java bytecode.\n\nHow it works:\n1. You write Java code (.java files)\n2. Java compiler converts it to bytecode (.class files)\n3. JVM interprets/executes the bytecode\n4. This bytecode can run on any platform with a JVM installed",
              },
              {
                title: "JDK, JRE, and JVM",
                content: "The JDK (Java Development Kit) includes the compiler and tools needed to develop Java programs. The JRE (Java Runtime Environment) contains the JVM and libraries needed to run compiled programs. The JVM is the engine that actually executes bytecode. Developers need the JDK; end users only need the JRE (or JVM in modern distributions).",
              },
              {
                title: "Your first program",
                content: "Every Java application needs a class with a main method as its entry point.\n\nExample:\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
              },
              {
                title: "Compiling and running",
                content: "javac HelloWorld.java compiles the source into HelloWorld.class bytecode. java HelloWorld then launches the JVM, loads that class, and executes main. Modern tooling (Maven, Gradle) automates this for larger projects.",
              },
            ],
          },
          {
            title: "Variables and Data Types",
            slug: "variables-data-types",
            description: "Primitive types, wrapper classes, type casting",
            estimatedMinutes: 20,
            sections: [
              {
                title: "Primitive Data Types",
                content: "Java has 8 primitive data types:\n\nNumeric:\n• byte: 8-bit integer (-128 to 127)\n• short: 16-bit integer (-32,768 to 32,767)\n• int: 32-bit integer (most commonly used)\n• long: 64-bit integer (append L to literals)\n• float: 32-bit floating point (append F to literals)\n• double: 64-bit floating point (default for decimals)\n\nOther:\n• boolean: true or false\n• char: 16-bit Unicode character",
              },
              {
                title: "Reference Types",
                content: "Reference types point to objects in memory. They include:\n• Classes\n• Interfaces\n• Arrays\n• Enums\n\nUnlike primitive types, reference types are created using the 'new' keyword and their default value is null.",
              },
              {
                title: "Wrapper classes and autoboxing",
                content: "Each primitive has a corresponding wrapper class (int → Integer, double → Double). Autoboxing automatically converts between them, needed for collections which only store objects.\n\nExample:\nInteger boxed = 5;       // autoboxing\nint unboxed = boxed;      // auto-unboxing\nList<Integer> nums = new ArrayList<>(); // must be Integer, not int",
              },
              {
                title: "Type casting",
                content: "Widening (implicit) casting converts a smaller type to a larger one safely, e.g. int to long. Narrowing (explicit) casting converts a larger type to a smaller one and may lose data, requiring an explicit cast.\n\nExample:\ndouble d = 9.7;\nint i = (int) d;  // narrowing, i = 9 (truncated)",
              },
              {
                title: "Constants with final",
                content: "The final keyword marks a variable as unmodifiable after initialization, used for constants.\n\nExample:\nfinal double PI_APPROX = 3.14159;",
              },
            ],
          },
          {
            title: "Control Flow Statements",
            slug: "control-flow",
            description: "if-else, switch, loops (for, while, do-while)",
            estimatedMinutes: 18,
            sections: [
              {
                title: "if / else if / else",
                content: "Conditional branching evaluates a boolean expression and executes different code paths.\n\nExample:\nif (score >= 90) {\n    grade = \"A\";\n} else if (score >= 80) {\n    grade = \"B\";\n} else {\n    grade = \"C\";\n}",
              },
              {
                title: "switch statements and expressions",
                content: "switch compares a value against multiple cases. Modern Java (14+) supports switch expressions with arrow syntax that return a value directly and don't fall through.\n\nExample:\nString dayType = switch (day) {\n    case \"SAT\", \"SUN\" -> \"Weekend\";\n    default -> \"Weekday\";\n};",
              },
              {
                title: "for and enhanced for loops",
                content: "A standard for loop uses init/condition/update; an enhanced for-each loop iterates directly over elements of an array or Collection.\n\nExample:\nfor (int i = 0; i < 5; i++) { System.out.println(i); }\nfor (String name : names) { System.out.println(name); }",
              },
              {
                title: "while and do-while loops",
                content: "while checks the condition before each iteration (may run zero times); do-while checks after, guaranteeing at least one execution.\n\nExample:\nint n = 0;\ndo { n++; } while (n < 5);",
              },
              {
                title: "break, continue, and labels",
                content: "break exits a loop entirely; continue skips to the next iteration. Labeled breaks/continues let you control outer loops from within nested loops.",
              },
            ],
          },
        ],
      },
      {
        title: "Object-Oriented Programming Basics",
        description: "Understand OOP principles in Java",
        topics: [
          {
            title: "Classes and Objects",
            slug: "classes-objects",
            description: "Blueprint and instances",
            estimatedMinutes: 20,
            sections: [
              {
                title: "Defining a class",
                content: "A class is a blueprint describing fields (state) and methods (behavior).\n\nExample:\npublic class Car {\n    String model;\n    int year;\n\n    void drive() {\n        System.out.println(model + \" is driving\");\n    }\n}",
              },
              {
                title: "Creating objects", content: "An object is created from a class using the new keyword, allocating memory and running a constructor.\n\nExample:\nCar myCar = new Car();\nmyCar.model = \"Civic\";\nmyCar.drive();",
              },
              {
                title: "Instance vs static members", content: "Instance fields/methods belong to each object individually; static members belong to the class itself and are shared across all instances.\n\nExample:\nstatic int totalCars = 0; // shared counter",
              },
              {
                title: "The 'this' keyword", content: "'this' refers to the current object instance, commonly used to disambiguate a field from a parameter with the same name inside a method or constructor." },
              {
                title: "Object equality", content: "== compares references (whether two variables point to the same object), while .equals() compares logical equality and can be overridden to compare field values instead." },
            ],
          },
          {
            title: "Constructors and Methods",
            slug: "constructors-methods",
            description: "Initialization and behavior",
            estimatedMinutes: 18,
            sections: [
              {
                title: "What constructors do", content: "A constructor initializes a newly created object. It shares the class name and has no return type.\n\nExample:\npublic Car(String model) {\n    this.model = model;\n}",
              },
              {
                title: "Constructor overloading", content: "A class can define multiple constructors with different parameter lists, letting objects be created in different ways." },
              {
                title: "The default constructor", content: "If no constructor is defined, Java provides a no-argument default constructor automatically. Defining any constructor removes this automatic default." },
              {
                title: "Method signatures and overloading", content: "A method's signature is its name plus parameter types. Overloading defines multiple methods with the same name but different parameters, resolved at compile time." },
              {
                title: "Return types and void", content: "A method declares the type of value it returns, or void if it returns nothing. return exits the method immediately, optionally with a value." },
            ],
          },
        ],
      },
    ],
  },
  {
    level: "INTERMEDIATE",
    modules: [
      {
        title: "Object-Oriented Programming",
        description: "Master OOP concepts",
        topics: [
          {
            title: "Inheritance",
            slug: "inheritance",
            description: "Extending classes and method overriding",
            estimatedMinutes: 22,
            sections: [
              { title: "extends and superclasses", content: "A class inherits fields and methods from another using extends, forming an is-a relationship.\n\nExample:\nclass Animal { void eat() { System.out.println(\"eating\"); } }\nclass Dog extends Animal { void bark() { System.out.println(\"woof\"); } }" },
              { title: "Method overriding", content: "A subclass can redefine a method inherited from its superclass using the @Override annotation, providing specialized behavior while keeping the same signature." },
              { title: "The super keyword", content: "super calls the superclass's constructor or an overridden method from within a subclass.\n\nExample:\nclass Dog extends Animal {\n    @Override void eat() { super.eat(); System.out.println(\"happily\"); }\n}" },
              { title: "Single inheritance and Object", content: "Java supports single inheritance for classes (one direct superclass), though a class can implement multiple interfaces. Every class implicitly extends Object." },
              { title: "final classes and methods", content: "Marking a class or method final prevents it from being extended or overridden, useful for locking down critical implementation details." },
            ],
          },
          {
            title: "Polymorphism",
            slug: "polymorphism",
            description: "Method overloading and overriding",
            estimatedMinutes: 18,
            sections: [
              { title: "Compile-time polymorphism", content: "Method overloading achieves compile-time polymorphism: the compiler picks which overload to call based on argument types at compile time." },
              { title: "Runtime polymorphism", content: "Method overriding achieves runtime polymorphism: the JVM decides which overridden method to run based on the object's actual runtime type, not its declared type.\n\nExample:\nAnimal a = new Dog();\na.eat(); // runs Dog's eat() if overridden" },
              { title: "Upcasting and downcasting", content: "Upcasting (subclass to superclass reference) is implicit and safe. Downcasting requires an explicit cast and can throw ClassCastException if the object isn't actually that subtype." },
              { title: "instanceof checks", content: "instanceof checks an object's runtime type before downcasting, avoiding ClassCastException.\n\nExample:\nif (a instanceof Dog d) { d.bark(); } // pattern variable, Java 16+" },
              { title: "Why polymorphism matters", content: "Polymorphism lets code work with a general type (like a list of Animal) while each object behaves according to its specific subclass, enabling flexible, extensible designs." },
            ],
          },
          {
            title: "Encapsulation",
            slug: "encapsulation",
            description: "Access modifiers and data hiding",
            estimatedMinutes: 16,
            sections: [
              { title: "Access modifiers", content: "private restricts access to within the class, (package-)default to the same package, protected to the package plus subclasses, and public to everywhere." },
              { title: "Why hide data", content: "Marking fields private and exposing controlled access through getters/setters lets a class validate input, change internal representation later, and protect invariants." },
              { title: "Getters and setters", content: "Example:\nprivate int age;\npublic int getAge() { return age; }\npublic void setAge(int age) {\n    if (age < 0) throw new IllegalArgumentException();\n    this.age = age;\n}" },
              { title: "Immutable fields", content: "Combining private with final and no setter creates fields that can only be set once, in the constructor, supporting immutable object design." },
              { title: "Package-private cohesion", content: "Default (package-private) access is a middle ground, allowing tightly related classes in the same package to collaborate without exposing internals publicly." },
            ],
          },
          {
            title: "Abstraction",
            slug: "abstraction",
            description: "Abstract classes and interfaces",
            estimatedMinutes: 20,
            sections: [
              { title: "Abstract classes", content: "An abstract class cannot be instantiated directly and can contain both abstract methods (no body) and concrete methods.\n\nExample:\nabstract class Shape {\n    abstract double area();\n    void describe() { System.out.println(\"Area: \" + area()); }\n}" },
              { title: "Interfaces", content: "An interface defines a contract of method signatures that implementing classes must fulfill. Since Java 8, interfaces can also include default and static methods with implementations." },
              { title: "Abstract class vs interface", content: "A class can extend only one abstract class but implement multiple interfaces. Abstract classes suit closely related types sharing state; interfaces suit unrelated types sharing behavior." },
              { title: "Default and static interface methods", content: "Example:\ninterface Greetable {\n    default void greet() { System.out.println(\"Hello!\"); }\n}" },
              { title: "Why abstraction matters", content: "Abstraction lets calling code depend on a contract rather than a concrete implementation, making systems easier to extend and test (e.g. programming against a List interface, not ArrayList directly)." },
            ],
          },
        ],
      },
      {
        title: "Java Collections",
        description: "Working with collections framework",
        topics: [
          {
            title: "ArrayList",
            slug: "arraylist",
            description: "Dynamic arrays and common operations",
            estimatedMinutes: 16,
            sections: [
              { title: "What ArrayList provides", content: "ArrayList is a resizable array implementation of the List interface, allowing duplicates and maintaining insertion order.\n\nExample:\nList<String> names = new ArrayList<>();\nnames.add(\"Alice\");\nnames.get(0);" },
              { title: "Common operations", content: "add, get, set, remove, size, contains, and indexOf are the core operations. Iteration works via for-each or an Iterator." },
              { title: "Time complexity", content: "get/set by index is O(1). add at the end is amortized O(1) (occasional resize copies all elements, O(n)). add/remove in the middle is O(n) due to shifting elements." },
              { title: "ArrayList vs array", content: "Unlike a plain array, ArrayList grows dynamically and only stores objects (autoboxing primitives), trading a small performance cost for flexibility." },
              { title: "Common pitfalls", content: "Removing elements while iterating with a for-each loop throws ConcurrentModificationException; use an Iterator's remove() method or removeIf() instead." },
            ],
          },
          {
            title: "LinkedList",
            slug: "linkedlist",
            description: "Linked list implementation and use cases",
            estimatedMinutes: 16,
            sections: [
              { title: "What LinkedList provides", content: "Java's LinkedList is a doubly linked list implementing both the List and Deque interfaces, allowing efficient insertion/removal at both ends." },
              { title: "When to prefer it", content: "LinkedList shines for frequent insertions/removals at the beginning or middle when you already have a reference to the node position; ArrayList wins for random access." },
              { title: "Using it as a Deque", content: "Example:\nDeque<Integer> stack = new LinkedList<>();\nstack.push(1);\nstack.pop();" },
              { title: "Time complexity", content: "Adding/removing at the head or tail is O(1). Accessing an arbitrary index is O(n) since it must traverse from an end." },
              { title: "Memory overhead", content: "Each node stores extra references (previous, next) beyond the data, so LinkedList uses more memory per element than ArrayList's backing array." },
            ],
          },
          {
            title: "HashMap",
            slug: "hashmap",
            description: "Hash tables and key-value storage",
            estimatedMinutes: 20,
            sections: [
              { title: "What HashMap provides", content: "HashMap stores key-value pairs with average O(1) get/put, using each key's hashCode() to determine its bucket." },
              { title: "Basic usage", content: "Example:\nMap<String, Integer> ages = new HashMap<>();\nages.put(\"Alice\", 30);\nint age = ages.getOrDefault(\"Bob\", 0);" },
              { title: "hashCode and equals contract", content: "Keys must correctly implement hashCode() and equals() consistently — two equal objects must have the same hashCode — or lookups will silently fail to find matching keys." },
              { title: "Handling collisions", content: "When multiple keys hash to the same bucket, HashMap chains them in a list (or a balanced tree for large buckets, since Java 8), keeping worst-case lookups from degrading too badly." },
              { title: "No guaranteed order", content: "HashMap does not guarantee iteration order. Use LinkedHashMap for insertion order or TreeMap for sorted key order when order matters." },
            ],
          },
          {
            title: "HashSet",
            slug: "hashset",
            description: "Unique elements and hash-based storage",
            estimatedMinutes: 14,
            sections: [
              { title: "What HashSet provides", content: "HashSet stores unique elements backed internally by a HashMap, giving average O(1) add, remove, and contains checks." },
              { title: "Basic usage", content: "Example:\nSet<String> tags = new HashSet<>();\ntags.add(\"java\");\ntags.add(\"java\"); // ignored, already present" },
              { title: "Set operations", content: "retainAll, addAll, and removeAll implement intersection, union, and difference between sets respectively." },
              { title: "Requires equals/hashCode", content: "Just like HashMap keys, elements stored in a HashSet must implement equals() and hashCode() correctly to detect duplicates properly." },
              { title: "LinkedHashSet and TreeSet", content: "LinkedHashSet preserves insertion order; TreeSet keeps elements sorted (via natural ordering or a Comparator) at the cost of O(log n) operations instead of O(1)." },
            ],
          },
          {
            title: "TreeMap and TreeSet",
            slug: "treemap-treeset",
            description: "Sorted collections",
            estimatedMinutes: 16,
            sections: [
              { title: "Sorted order guarantee", content: "TreeMap and TreeSet keep their elements sorted at all times, implemented internally as a red-black tree, giving O(log n) insert, delete, and lookup." },
              { title: "Natural ordering vs Comparator", content: "By default, elements are sorted by their natural ordering (via Comparable). Supplying a custom Comparator to the constructor overrides that ordering." },
              { title: "Useful navigation methods", content: "firstKey/lastKey, floorKey/ceilingKey, and headMap/tailMap let you query ranges and neighbors efficiently, something HashMap cannot do." },
              { title: "Example", content: "TreeMap<Integer, String> scores = new TreeMap<>();\nscores.put(90, \"A\");\nscores.put(70, \"C\");\nscores.firstKey(); // 70" },
              { title: "When to choose", content: "Choose TreeMap/TreeSet when you need sorted iteration or range queries; choose HashMap/HashSet when you only need fast lookups and don't care about order." },
            ],
          },
        ],
      },
      {
        title: "Exception Handling",
        description: "Error handling and exceptions",
        topics: [
          {
            title: "Try-Catch-Finally",
            slug: "try-catch-finally",
            description: "Exception handling basics",
            estimatedMinutes: 18,
            sections: [
              { title: "Basic try-catch", content: "Code that might throw an exception goes in a try block; catch blocks handle specific exception types.\n\nExample:\ntry {\n    int x = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero\");\n}" },
              { title: "Multiple catch blocks", content: "You can catch different exception types separately, or combine them with | in a single catch clause when the handling logic is the same." },
              { title: "The finally block", content: "finally always runs after try/catch, whether or not an exception occurred, and is used for cleanup like closing resources." },
              { title: "Try-with-resources", content: "Resources implementing AutoCloseable are automatically closed at the end of the block, even if an exception is thrown.\n\nExample:\ntry (BufferedReader br = new BufferedReader(new FileReader(\"f.txt\"))) {\n    System.out.println(br.readLine());\n}" },
              { title: "Common pitfalls", content: "Catching a broad Exception (or Throwable) hides specific bugs and should generally be avoided in favor of catching the specific exceptions you expect." },
            ],
          },
          {
            title: "Exception Hierarchy",
            slug: "exception-hierarchy",
            description: "Checked and unchecked exceptions",
            estimatedMinutes: 16,
            sections: [
              { title: "Throwable, Error, and Exception", content: "Throwable is the root of all errors and exceptions. Error represents serious problems (like OutOfMemoryError) that applications typically shouldn't try to catch. Exception represents recoverable conditions." },
              { title: "Checked exceptions", content: "Checked exceptions (subclasses of Exception other than RuntimeException) must be either caught or declared with 'throws' in the method signature — the compiler enforces this, e.g. IOException." },
              { title: "Unchecked (runtime) exceptions", content: "RuntimeException and its subclasses (NullPointerException, ArrayIndexOutOfBoundsException) don't require explicit handling, typically indicating programming bugs rather than recoverable conditions." },
              { title: "Declaring exceptions", content: "Example:\npublic void readFile(String path) throws IOException {\n    // may throw IOException\n}" },
              { title: "Choosing checked vs unchecked", content: "Use checked exceptions for conditions a caller can reasonably recover from (a missing file); use unchecked exceptions for programming errors that indicate bugs (invalid arguments, null references)." },
            ],
          },
          {
            title: "Custom Exceptions",
            slug: "custom-exceptions",
            description: "Creating your own exceptions",
            estimatedMinutes: 14,
            sections: [
              { title: "Why create custom exceptions", content: "Custom exceptions communicate domain-specific error conditions clearly (e.g. InsufficientFundsException) instead of relying on generic exceptions." },
              { title: "Extending Exception", content: "Example:\npublic class InsufficientFundsException extends Exception {\n    public InsufficientFundsException(String message) {\n        super(message);\n    }\n}" },
              { title: "Checked vs unchecked custom exceptions", content: "Extend Exception for a checked custom exception (callers must handle it) or RuntimeException for an unchecked one (callers may choose to handle it)." },
              { title: "Adding context", content: "Custom exceptions can carry extra fields (like an account ID or error code) beyond the message, giving catch blocks more information to act on." },
              { title: "Exception chaining", content: "Passing an original exception as the 'cause' to a new exception's constructor preserves the original stack trace for debugging while translating to a more meaningful exception type." },
            ],
          },
        ],
      },
    ],
  },
  {
    level: "ADVANCED",
    modules: [
      {
        title: "Advanced Collections",
        description: "Deep dive into collections",
        topics: [
          {
            title: "Stream API",
            slug: "stream-api",
            description: "Functional programming with streams",
            estimatedMinutes: 24,
            sections: [
              { title: "What streams are", content: "A Stream represents a sequence of elements supporting functional-style operations (map, filter, reduce) that can be chained and are evaluated lazily." },
              { title: "Creating streams", content: "Example:\nList<Integer> nums = List.of(1, 2, 3, 4, 5);\nStream<Integer> s = nums.stream();" },
              { title: "map and filter", content: "map transforms each element; filter keeps only elements matching a predicate.\n\nExample:\nList<Integer> evenSquares = nums.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * n)\n    .collect(Collectors.toList());" },
              { title: "reduce and collect", content: "reduce combines elements into a single result (like a sum); collect gathers results into a collection using a Collector such as toList(), toSet(), or groupingBy()." },
              { title: "Intermediate vs terminal operations", content: "Intermediate operations (map, filter, sorted) are lazy and return a new stream; terminal operations (collect, forEach, reduce, count) trigger the actual processing and produce a result or side effect." },
              { title: "Parallel streams", content: "Calling parallelStream() (or .parallel()) processes elements concurrently across threads, useful for CPU-bound work on large datasets but risky with shared mutable state." },
            ],
          },
          {
            title: "Comparators and Sorting",
            slug: "comparators-sorting",
            description: "Custom sorting with Comparator",
            estimatedMinutes: 16,
            sections: [
              { title: "Comparable vs Comparator", content: "Comparable defines a class's natural ordering via compareTo(), implemented by the class itself. Comparator defines external, swappable ordering logic without modifying the class." },
              { title: "Implementing Comparable", content: "Example:\nclass Person implements Comparable<Person> {\n    int age;\n    public int compareTo(Person other) { return Integer.compare(age, other.age); }\n}" },
              { title: "Using Comparator with lambdas", content: "Example:\nlist.sort(Comparator.comparing(Person::getName));\nlist.sort(Comparator.comparing(Person::getAge).reversed());" },
              { title: "Chaining comparators", content: "thenComparing() adds a secondary sort key used to break ties from the primary comparator, useful for multi-field sorting like last name then first name." },
              { title: "Sorting collections", content: "Collections.sort(list) sorts a List in place; Collections.sort(list, comparator) uses a custom order; streams offer .sorted() for a non-mutating sorted copy." },
            ],
          },
        ],
      },
      {
        title: "Concurrency and Multithreading",
        description: "Concurrent programming",
        topics: [
          {
            title: "Threads Basics",
            slug: "threads-basics",
            description: "Creating and running threads",
            estimatedMinutes: 20,
            sections: [
              { title: "What a thread is", content: "A thread is an independent path of execution within a program, allowing multiple tasks to run concurrently, sharing the same process memory." },
              { title: "Creating threads", content: "Example:\nThread t = new Thread(() -> System.out.println(\"Running\"));\nt.start();" },
              { title: "Runnable vs extending Thread", content: "Implementing Runnable (and passing it to a Thread) is generally preferred over extending Thread directly, since Java only allows single inheritance and Runnable decouples the task from thread management." },
              { title: "Thread lifecycle", content: "A thread moves through New, Runnable, Running, Blocked/Waiting, and Terminated states, managed by the JVM's thread scheduler." },
              { title: "ExecutorService", content: "Rather than managing raw threads manually, ExecutorService pools and reuses threads for submitted tasks.\n\nExample:\nExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(() -> doWork());\npool.shutdown();" },
            ],
          },
          {
            title: "Synchronization",
            slug: "synchronization",
            description: "Thread safety and locks",
            estimatedMinutes: 22,
            sections: [
              { title: "Race conditions", content: "A race condition occurs when multiple threads access and modify shared data concurrently without coordination, producing unpredictable results." },
              { title: "The synchronized keyword", content: "synchronized on a method or block ensures only one thread at a time can execute that code on a given lock (object monitor).\n\nExample:\npublic synchronized void increment() { count++; }" },
              { title: "Locks (ReentrantLock)", content: "java.util.concurrent.locks.ReentrantLock offers more flexibility than synchronized, including tryLock() with timeout and explicit lock/unlock control." },
              { title: "volatile keyword", content: "volatile ensures a variable's value is always read from and written to main memory, guaranteeing visibility across threads, though it does not provide atomicity for compound operations." },
              { title: "Deadlocks", content: "A deadlock happens when two or more threads wait on locks held by each other, freezing indefinitely. Consistent lock ordering across the codebase helps prevent this." },
            ],
          },
          {
            title: "Concurrent Collections",
            slug: "concurrent-collections",
            description: "Thread-safe collections",
            estimatedMinutes: 16,
            sections: [
              { title: "Why regular collections fail", content: "ArrayList and HashMap are not thread-safe; concurrent modification from multiple threads can corrupt internal state or throw ConcurrentModificationException." },
              { title: "ConcurrentHashMap", content: "ConcurrentHashMap allows safe concurrent reads and writes without locking the entire map, using finer-grained internal locking for much better throughput than a synchronized HashMap." },
              { title: "CopyOnWriteArrayList", content: "CopyOnWriteArrayList creates a fresh copy of its backing array on every write, making reads lock-free and safe — ideal for read-heavy, write-rare scenarios." },
              { title: "BlockingQueue", content: "BlockingQueue implementations (like LinkedBlockingQueue) support thread-safe producer-consumer patterns, blocking when the queue is full (on put) or empty (on take)." },
              { title: "Choosing a concurrent collection", content: "Match the collection to the access pattern: ConcurrentHashMap for key-value access, CopyOnWriteArrayList for read-heavy lists, BlockingQueue for producer-consumer pipelines." },
            ],
          },
        ],
      },
      {
        title: "Generics and Type System",
        description: "Understanding generics",
        topics: [
          {
            title: "Generics Introduction",
            slug: "generics-intro",
            description: "Type parameters and generic classes",
            estimatedMinutes: 18,
            sections: [
              { title: "Why generics exist", content: "Generics let classes and methods operate on typed parameters, catching type mismatches at compile time instead of relying on unsafe casts at runtime." },
              { title: "Generic classes", content: "Example:\nclass Box<T> {\n    private T value;\n    public void set(T value) { this.value = value; }\n    public T get() { return value; }\n}" },
              { title: "Generic methods", content: "A method can declare its own type parameter independent of the class it's in.\n\nExample:\npublic static <T> T first(List<T> list) { return list.get(0); }" },
              { title: "Multiple type parameters", content: "A class or method can take several type parameters, such as Map<K, V>, to describe relationships between multiple generic types." },
              { title: "Compile-time only", content: "Generic type information exists only at compile time and is erased at runtime (type erasure) — this is why you can't create a generic array or check 'instanceof List<String>' directly." },
            ],
          },
          {
            title: "Bounded Wildcards",
            slug: "bounded-wildcards",
            description: "Upper and lower bounds",
            estimatedMinutes: 16,
            sections: [
              { title: "Wildcard basics", content: "The ? wildcard represents an unknown type, used when a method doesn't need to know the exact generic type, only that it satisfies certain constraints." },
              { title: "Upper bounded wildcards", content: "? extends T allows reading elements as type T from a collection of T or its subtypes, but not adding to it (except null).\n\nExample:\ndouble sum(List<? extends Number> list) { ... }" },
              { title: "Lower bounded wildcards", content: "? super T allows adding elements of type T (or its subtypes) into a collection, since the collection's actual type is T or a supertype.\n\nExample:\nvoid addNumbers(List<? super Integer> list) { list.add(1); }" },
              { title: "PECS mnemonic", content: "Producer Extends, Consumer Super: use extends when you only read from a structure, and super when you only write to it." },
              { title: "Unbounded wildcards", content: "List<?> represents a list of some unknown type, useful when a method only calls type-independent operations like size() or clear()." },
            ],
          },
          {
            title: "Type Erasure",
            slug: "type-erasure",
            description: "How generics work at runtime",
            estimatedMinutes: 14,
            sections: [
              { title: "What erasure means", content: "The compiler removes (erases) generic type parameters after compile-time checking, replacing them with their bound (or Object) in the bytecode — so List<String> and List<Integer> share the same runtime class." },
              { title: "Why Java chose erasure", content: "Type erasure preserves backward compatibility with pre-generics Java code and avoids duplicating bytecode for every type parameter combination." },
              { title: "Consequences", content: "You cannot create a generic array (new T[10]), use instanceof with a parameterized type, or overload methods that differ only by generic type parameter, because that type information doesn't exist at runtime." },
              { title: "Bridge methods", content: "The compiler generates synthetic 'bridge methods' to preserve polymorphism when a generic method is overridden with a more specific type, working around the effects of erasure." },
              { title: "Workarounds", content: "Passing a Class<T> token as a parameter, or using reflection, lets code access type information at runtime that erasure would otherwise hide." },
            ],
          },
        ],
      },
    ],
  },
  {
    level: "INTERVIEW_PREP",
    modules: [
      {
        title: "Interview Concepts",
        description: "Concepts frequently asked in interviews",
        topics: [
          {
            title: "equals() and hashCode()",
            slug: "equals-hashcode",
            description: "Critical for collections and equality",
            estimatedMinutes: 18,
            sections: [
              { title: "The contract", content: "If two objects are equal according to equals(), they must return the same hashCode(). The reverse isn't required — unequal objects may share a hash code (a collision)." },
              { title: "Default behavior", content: "Object's default equals() compares references (same as ==) and hashCode() is based on the object's memory address, unless overridden." },
              { title: "Overriding equals()", content: "Example:\n@Override\npublic boolean equals(Object o) {\n    if (this == o) return true;\n    if (!(o instanceof Person p)) return false;\n    return age == p.age && name.equals(p.name);\n}" },
              { title: "Overriding hashCode()", content: "Example:\n@Override\npublic int hashCode() {\n    return Objects.hash(name, age);\n}" },
              { title: "Why it matters for collections", content: "HashMap and HashSet rely on a correct equals/hashCode pair to find and deduplicate keys — breaking the contract causes silently 'missing' entries or duplicate keys that should have matched." },
            ],
          },
          {
            title: "Immutable Objects",
            slug: "immutable-objects",
            description: "Creating and benefits of immutability",
            estimatedMinutes: 16,
            sections: [
              { title: "What makes an object immutable", content: "An immutable object's state cannot change after construction: fields are private and final, the class is often final itself, and no setters exist." },
              { title: "Example", content: "public final class Point {\n    private final int x, y;\n    public Point(int x, int y) { this.x = x; this.y = y; }\n    public int getX() { return x; }\n    public int getY() { return y; }\n}" },
              { title: "Defensive copies", content: "If a constructor accepts a mutable object (like a List or Date), copy it internally rather than storing the reference directly, preventing external code from mutating your 'immutable' object later." },
              { title: "Benefits", content: "Immutable objects are inherently thread-safe (no synchronization needed), safe to share and cache, and make reasoning about code easier since state never changes unexpectedly." },
              { title: "Records", content: "Since Java 16, the record keyword generates an immutable data class automatically, including constructor, accessors, equals, hashCode, and toString.\n\nExample:\nrecord Point(int x, int y) {}" },
            ],
          },
          {
            title: "Design Patterns",
            slug: "design-patterns",
            description: "Singleton, Factory, Observer patterns",
            estimatedMinutes: 24,
            sections: [
              { title: "Singleton pattern", content: "Ensures a class has only one instance and provides a global access point.\n\nExample:\npublic class Config {\n    private static final Config INSTANCE = new Config();\n    private Config() {}\n    public static Config getInstance() { return INSTANCE; }\n}" },
              { title: "Factory pattern", content: "A factory method creates objects without exposing the exact instantiation logic to the caller, useful when the concrete type to create depends on input.\n\nExample:\nstatic Shape createShape(String type) {\n    return switch (type) { case \"circle\" -> new Circle(); default -> new Square(); };\n}" },
              { title: "Observer pattern", content: "Defines a one-to-many dependency: when a subject's state changes, all registered observers are notified automatically. This underlies event listeners and reactive UIs." },
              { title: "Builder pattern", content: "Builds a complex object step by step through chained method calls, avoiding constructors with many parameters.\n\nExample:\nPerson p = new Person.Builder().name(\"Ana\").age(30).build();" },
              { title: "Why patterns matter in interviews", content: "Interviewers often ask you to recognize which pattern fits a scenario, or to implement a simple version — focus on the problem each pattern solves, not just memorizing the code." },
            ],
          },
          {
            title: "Memory Management and GC",
            slug: "memory-gc",
            description: "Garbage collection and memory leaks",
            estimatedMinutes: 18,
            sections: [
              { title: "Heap and stack", content: "Objects live on the heap and are managed by the garbage collector; method calls and local primitive variables/references live on the stack, automatically reclaimed when a method returns." },
              { title: "How garbage collection works", content: "The JVM's garbage collector automatically reclaims memory for objects that are no longer reachable from any active reference (root), freeing developers from manual memory deallocation." },
              { title: "Generational GC", content: "Most JVM garbage collectors divide the heap into young and old generations, since most objects die young — this lets frequent, fast minor collections handle short-lived objects, with less frequent major collections for long-lived ones." },
              { title: "Memory leaks in Java", content: "Even with GC, memory leaks happen when objects remain reachable unintentionally — for example, static collections that keep growing, or listeners that are never unregistered." },
              { title: "Avoiding leaks", content: "Unregister listeners, close resources (or use try-with-resources), avoid unbounded static caches, and consider WeakReference for caches where entries should be collectible when no longer strongly referenced." },
            ],
          },
          {
            title: "Serialization",
            slug: "serialization",
            description: "Serializable interface and ObjectStream",
            estimatedMinutes: 14,
            sections: [
              { title: "What serialization is", content: "Serialization converts an object's state into a byte stream that can be stored or transmitted, and deserialization reconstructs the object from that stream." },
              { title: "The Serializable interface", content: "A class must implement the marker interface Serializable to be eligible; it has no methods but signals to the JVM that instances can be converted to bytes.\n\nExample:\nclass User implements Serializable { String name; int age; }" },
              { title: "transient fields", content: "Marking a field transient excludes it from serialization, useful for sensitive data (passwords) or fields that can't or shouldn't be serialized (like a live socket connection)." },
              { title: "serialVersionUID", content: "This field versions a serializable class; mismatches between the serialized version and the current class definition during deserialization throw InvalidClassException." },
              { title: "Modern alternatives", content: "Java's built-in serialization has known security and versioning pitfalls; many modern systems prefer JSON (Jackson/Gson) or Protocol Buffers for cross-service data exchange instead." },
            ],
          },
        ],
      },
      {
        title: "Performance and Optimization",
        description: "Performance tuning and best practices",
        topics: [
          {
            title: "String Performance",
            slug: "string-performance",
            description: "String, StringBuffer, StringBuilder",
            estimatedMinutes: 16,
            sections: [
              { title: "String immutability", content: "Strings in Java are immutable — every concatenation with + creates a new String object, which becomes expensive inside loops with many iterations." },
              { title: "StringBuilder", content: "StringBuilder is a mutable sequence of characters, ideal for building strings incrementally without creating many intermediate objects.\n\nExample:\nStringBuilder sb = new StringBuilder();\nfor (String s : parts) sb.append(s);\nString result = sb.toString();" },
              { title: "StringBuilder vs StringBuffer", content: "StringBuffer is the thread-safe (synchronized) equivalent of StringBuilder. Prefer StringBuilder in single-threaded code for better performance, since synchronization has overhead." },
              { title: "The String pool", content: "String literals are interned in a shared pool, so identical literals reuse the same object; strings created with 'new String(...)' bypass the pool and create a distinct object even with the same content." },
              { title: "Practical guidance", content: "Use + for a handful of known concatenations (the compiler often optimizes this to StringBuilder automatically); use StringBuilder explicitly inside loops or when building large strings dynamically." },
            ],
          },
          {
            title: "Collection Performance",
            slug: "collection-performance",
            description: "Time complexity and choosing the right collection",
            estimatedMinutes: 18,
            sections: [
              { title: "ArrayList vs LinkedList", content: "ArrayList gives O(1) indexed access and amortized O(1) append but O(n) middle insertion; LinkedList gives O(1) insertion at known positions but O(n) indexed access." },
              { title: "HashMap vs TreeMap", content: "HashMap gives average O(1) operations without ordering guarantees; TreeMap gives O(log n) operations but keeps keys sorted, supporting range queries." },
              { title: "HashSet vs TreeSet vs LinkedHashSet", content: "HashSet is fastest (O(1)) but unordered; LinkedHashSet preserves insertion order at similar speed; TreeSet is sorted but slower (O(log n))." },
              { title: "Choosing initial capacity", content: "Pre-sizing an ArrayList or HashMap with an expected capacity avoids repeated internal resizing/rehashing as elements are added, improving performance for large, known-size collections." },
              { title: "General guidance", content: "Default to ArrayList and HashMap unless you have a specific reason (frequent middle insertions, or a need for sorted order) to choose something else — they cover the vast majority of use cases efficiently." },
            ],
          },
        ],
      },
    ],
  },
];

async function seedJavaLearningPath() {
  try {
    // Create Java category
    const category = await prisma.studyCategory.upsert({
      where: { slug: "java" },
      update: {},
      create: {
        name: "Java",
        slug: "java",
        description: "Master Java programming from basics to advanced concepts",
        sortOrder: 0,
        isPublished: true,
      },
    });

    console.log(`✓ Created Java category`);

    // Create paths and modules
    for (const pathData of JAVA_TOPICS) {
      const path = await prisma.studyPath.upsert({
        where: {
          categoryId_level: {
            categoryId: category.id,
            level: pathData.level as any,
          },
        },
        update: {},
        create: {
          categoryId: category.id,
          name: pathData.level === "BEGINNER" ? "Beginner" : pathData.level === "INTERMEDIATE" ? "Intermediate" : pathData.level === "ADVANCED" ? "Advanced" : "Interview Prep",
          slug: pathData.level.toLowerCase().replace(/_/g, "-"),
          level: pathData.level as any,
          description: `Java ${pathData.level === "BEGINNER" ? "Basics" : pathData.level === "INTERMEDIATE" ? "Intermediate Concepts" : pathData.level === "ADVANCED" ? "Advanced Topics" : "Interview Preparation"}`,
          isPublished: true,
          sortOrder: pathData.level === "BEGINNER" ? 0 : pathData.level === "INTERMEDIATE" ? 1 : pathData.level === "ADVANCED" ? 2 : 3,
        },
      });

      console.log(`✓ Created ${pathData.level} learning path`);

      // Create modules
      for (let moduleIdx = 0; moduleIdx < pathData.modules.length; moduleIdx++) {
        const moduleData = pathData.modules[moduleIdx];
        const module = await prisma.studyModule.upsert({
          where: {
            studyPathId_slug: {
              studyPathId: path.id,
              slug: moduleData.title.toLowerCase().replace(/\s+/g, "-"),
            },
          },
          update: {},
          create: {
            studyPathId: path.id,
            title: moduleData.title,
            slug: moduleData.title.toLowerCase().replace(/\s+/g, "-"),
            description: moduleData.description,
            isPublished: true,
            sortOrder: moduleIdx,
          },
        });

        console.log(`  ✓ Created module: ${moduleData.title}`);

        // Create topics
        for (let topicIdx = 0; topicIdx < moduleData.topics.length; topicIdx++) {
          const topicData = moduleData.topics[topicIdx];
          const topic = await prisma.studyTopic.upsert({
            where: { categoryId_slug: { categoryId: category.id, slug: topicData.slug } },
            update: {},
            create: {
              moduleId: module.id,
              categoryId: category.id,
              title: topicData.title,
              slug: topicData.slug,
              shortDescription: topicData.description,
              estimatedMinutes: topicData.estimatedMinutes || 10,
              isPublished: true,
              sortOrder: topicIdx,
              prerequisiteIds: [],
              relatedTopicIds: [],
            },
          });

          // Add sections if provided
          if (topicData.sections) {
            for (let secIdx = 0; secIdx < topicData.sections.length; secIdx++) {
              const section = topicData.sections[secIdx];
              const sectionId = `${topic.id}-section-${secIdx}`;
              await prisma.studyTopicSection.upsert({
                where: { id: sectionId },
                update: {
                  title: section.title,
                  content: section.content,
                  sortOrder: secIdx,
                },
                create: {
                  id: sectionId,
                  topicId: topic.id,
                  title: section.title,
                  content: section.content,
                  sortOrder: secIdx,
                },
              });
            }
          }

          console.log(`    ✓ Created topic: ${topicData.title}`);
        }
      }
    }

    console.log("\n✅ Java learning path seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding Java learning path:", error);
    throw error;
  }
}

seedJavaLearningPath()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
