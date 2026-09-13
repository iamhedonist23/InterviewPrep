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

const modules: ModuleSeed[] = [
  {
    title: "Unit I: Multithreading",
    slug: "unit-i-multithreading",
    description: "Understand Java multithreading, thread creation, lifecycle, priorities, and synchronization.",
    topics: [
      {
        title: "1.1 Introduction to Multithreading",
        slug: "introduction-to-multithreading",
        description: "Learn how multiple threads execute within one process, why concurrency improves responsiveness, and how shared memory affects design.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Multithreading allows more than one thread of execution to make progress within a Java process. Threads can share objects and resources, which makes communication efficient but also creates the need for coordination when mutable state is shared.\n\nDetailed study: A process may contain several threads that share the same heap while each thread has its own execution stack. Concurrency is useful for responsive applications and independent work, but shared mutable objects create coordination problems. Distinguish concurrency, parallelism, and asynchronous execution: concurrency is about multiple activities making progress, parallelism is simultaneous execution on multiple cores, and asynchronous design separates initiating work from waiting for its completion. A correct design identifies ownership of mutable state, limits shared data, and defines how results and failures are communicated." },
          { title: "How it works", content: "The JVM and operating system schedule threads. Concurrency may be interleaved on one processor or executed in parallel on multiple cores. A useful design separates independent work while minimizing shared mutable state.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nclass Task extends Thread {\n    public void run() {\n        System.out.println(\"Worker running\");\n    }\n    public static void main(String[] args) {\n        new Task().start();\n        System.out.println(\"Main continues\");\n    }\n}\n```\nThe relative output order is not guaranteed." },
          { title: "Common pitfalls", content: "Do not assume a fixed scheduling order or confuse concurrency with guaranteed parallel execution. Avoid using arbitrary delays as synchronization." },
          { title: "Interview and exam focus", content: "Explain process versus thread, shared memory, responsiveness, concurrency, and race conditions.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create two independent tasks, start them together, and document which output orderings are possible.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "1.2 Creating Threads",
        slug: "creating-threads",
        description: "Create threads with Thread and Runnable, understand start versus run, and choose an appropriate design.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "The material presents extending Thread and implementing Runnable as the two basic ways to create a thread. Runnable separates the task from the execution object and allows the class to extend another class.\n\nDetailed study: Thread creation should be separated from task definition whenever possible. Extending Thread couples the task to the execution mechanism, while Runnable represents work independently and can be reused by different execution strategies. The essential distinction is that start() asks the runtime to schedule a new thread and eventually invoke run(); run() itself is just a normal method call. Thread objects also expose useful operations such as join(), interrupt(), getState(), getName(), and isAlive()." },
          { title: "How it works", content: "Put work in run(), but invoke start() to create a new thread. Calling run() directly is an ordinary method call on the current thread. With Runnable, pass the task object to a Thread and call start().\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nclass PrintTask implements Runnable {\n    public void run() {\n        System.out.println(\"Worker is running\");\n    }\n}\nThread t = new Thread(new PrintTask());\nt.start();\n```" },
          { title: "Common pitfalls", content: "Calling run() instead of start() does not create a new thread. Avoid unnecessary inheritance when a Runnable task is sufficient." },
          { title: "Interview and exam focus", content: "Compare Thread and Runnable, explain start versus run, and explain why Runnable improves separation of work from execution.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Implement the same task with Thread and Runnable and compare reuse and class-design flexibility.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "1.3 Thread Life Cycle",
        slug: "thread-life-cycle",
        description: "Understand the major states and transitions a Java thread passes through during execution.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A thread progresses through lifecycle states from creation to execution, possible blocking or waiting, and termination. The container of thread execution is the JVM together with the operating system scheduler.\n\nDetailed study: The lifecycle can be understood as NEW, RUNNABLE, temporary WAITING/TIMED_WAITING/BLOCKED conditions, and TERMINATED. A thread can be BLOCKED while waiting to acquire a monitor, WAITING after operations such as wait() or join(), and TIMED_WAITING for operations such as sleep() or timed join(). These states describe what the thread is doing from the JVM perspective; they do not guarantee a specific operating-system scheduling timeline. Once a thread terminates, calling start() again throws IllegalThreadStateException." },
          { title: "How it works", content: "start() moves a newly created thread into execution eligibility. During execution it may block or wait and later resume. Once run() finishes, the thread terminates and cannot be started again.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nThread t = new Thread(() -> System.out.println(\"work\"));\nSystem.out.println(t.getState());\nt.start();\n```" },
          { title: "Common pitfalls", content: "Do not assume an instantaneous state will remain unchanged. A terminated thread cannot be restarted." },
          { title: "Interview and exam focus", content: "Know the lifecycle concept, start(), waiting/blocking, and termination.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Observe a thread before start, while it is delayed, and after completion; explain every observed state.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "1.4 Thread Priorities",
        slug: "thread-priorities",
        description: "Learn Java thread priority constants and how priority can influence scheduling without guaranteeing execution order.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Thread priority is a scheduling hint. Java defines MIN_PRIORITY, NORM_PRIORITY, and MAX_PRIORITY, with normal priority representing the default level.\n\nDetailed study: Java defines priority values from Thread.MIN_PRIORITY through Thread.MAX_PRIORITY, with Thread.NORM_PRIORITY as the default. Priority is a scheduling hint rather than a correctness mechanism. Operating-system policies and JVM implementations can affect how priorities are interpreted, so code should never depend on priority for mutual exclusion, ordering, fairness, or completion. If work must happen after another task, use explicit coordination such as join(), synchronization, or higher-level concurrency utilities." },
          { title: "How it works", content: "setPriority() requests a priority and getPriority() reads it. Scheduling decisions remain environment-dependent, so priority should not be used to enforce correctness.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nThread t = new Thread(() -> System.out.println(\"worker\"));\nt.setPriority(Thread.MAX_PRIORITY);\nSystem.out.println(t.getPriority());\nt.start();\n```" },
          { title: "Common pitfalls", content: "Never depend on priority to guarantee which thread executes first or how much CPU time a thread receives." },
          { title: "Interview and exam focus", content: "Explain the priority constants, getPriority(), setPriority(), and why priority is not synchronization.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Run two workloads with different priorities several times and explain why the results are not deterministic.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "1.5 Thread Synchronization",
        slug: "thread-synchronization",
        description: "Understand race conditions, synchronized methods and blocks, mutual exclusion, and safe access to shared state.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "Synchronization protects critical sections when multiple threads access shared mutable state. Without coordination, operations such as value++ can be interleaved and lose updates.\n\nDetailed study: Synchronization solves two related problems: mutual exclusion and memory visibility. A synchronized instance method locks the current object, while a synchronized static method locks the Class object. A synchronized block lets the programmer choose the lock object and keep the critical section small. Compound operations such as count++ are not atomic merely because the field is an integer. Deadlock can occur when threads acquire multiple locks in different orders, so consistent lock ordering and minimizing lock scope are important." },
          { title: "How it works", content: "A synchronized method or block acquires an object's monitor. Only one thread at a time can hold that monitor, and synchronization also provides the required visibility coordination for protected operations.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nclass Counter {\n    private int value;\n    public synchronized void increment() {\n        value++;\n    }\n    public synchronized int getValue() {\n        return value;\n    }\n}\n```" },
          { title: "Common pitfalls", content: "Avoid inconsistent locking strategies and lock-order cycles. Protect the same shared state with a consistent synchronization policy." },
          { title: "Interview and exam focus", content: "Explain race condition, critical section, monitor, synchronized method versus block, and deadlock risk.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Run many threads against an unsafe counter, observe the wrong total, then protect the update and compare results.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
    ],
  },
  {
    title: "Unit II: Collection Framework",
    slug: "unit-ii-collection-framework",
    description: "Use Java collections to store, search, traverse, sort, and manage groups of objects.",
    topics: [
      {
        title: "2.1 Collection Framework",
        slug: "collection-framework",
        description: "Understand the overall collection architecture, its interfaces, implementations, algorithms, and design choices.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "The Collection Framework provides interfaces, implementations, and algorithms for storing and manipulating groups of objects. It lets application code choose data structures according to behavior instead of building every structure from scratch.\n\nDetailed study: The collection framework provides standard interfaces and implementations for groups of objects. List normally preserves positional order and allows duplicates; Set models uniqueness; Map associates keys with values and is not a subtype of Collection. Choosing an implementation depends on operations such as indexed access, insertion, lookup, ordering, uniqueness, and memory overhead. Collection classes also differ in synchronization behavior, so thread safety should be chosen deliberately instead of assumed." },
          { title: "How it works", content: "List models ordered elements, Set models uniqueness, Queue models processing order, and Map models key-value associations. The Collections utility class provides common algorithms such as sorting and searching.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nList<String> names = new ArrayList<>();\nnames.add(\"Amit\");\nnames.add(\"Riya\");\nSystem.out.println(names);\n```" },
          { title: "Common pitfalls", content: "Choosing a collection only because it is familiar can produce incorrect ordering or poor performance." },
          { title: "Interview and exam focus", content: "Compare List, Set, Queue, and Map and explain why Map does not extend Collection.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Implement the same small data problem with a List, Set, and Map and explain the semantic difference.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.2 Collection Interface",
        slug: "collection-interface",
        description: "Learn the common operations provided by Collection and how List, Set, and Queue build on it.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Collection is the root abstraction for the main group-oriented collection interfaces. It defines common operations such as add, remove, contains, size, isEmpty, clear, and traversal.\n\nDetailed study: Collection is the root interface for many groups of elements and provides operations such as add(), remove(), contains(), size(), isEmpty(), clear(), iterator(), and toArray(). Its contracts describe behavior rather than implementation. Some operations are optional and may throw UnsupportedOperationException. Equality and hashing matter because operations such as contains() and remove() generally rely on equals(), while hash-based implementations additionally rely on a compatible hashCode() implementation." },
          { title: "How it works", content: "Concrete classes provide the storage behavior while callers can program against Collection or a more specific interface. This makes implementations replaceable.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nCollection<String> c = new ArrayList<>();\nc.add(\"Java\");\nc.add(\"JDBC\");\nSystem.out.println(c.contains(\"Java\"));\n```" },
          { title: "Common pitfalls", content: "Do not assume all Collection implementations preserve order or permit duplicates." },
          { title: "Interview and exam focus", content: "Know the common Collection methods and distinguish Collection from Map.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Write a method accepting Collection<String> and call it with both ArrayList and HashSet.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.3 ArrayList",
        slug: "arraylist",
        description: "Use ArrayList for ordered, index-based, dynamically sized collections and understand its common operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "ArrayList is a dynamically sized List backed by array-style storage. It preserves element order, supports duplicates, and provides indexed access.\n\nDetailed study: ArrayList is a resizable-array implementation of List. It provides fast positional get() and set() operations, while insertion or removal near the beginning or middle can require shifting elements. Its capacity grows as elements are added, so pre-sizing can reduce repeated resizing when the approximate size is known. ArrayList is unsynchronized and permits null values. It is usually a strong default for read-heavy list workloads where frequent indexed access matters." },
          { title: "How it works", content: "Appending elements is efficient in normal use, while inserting or removing elements in the middle can require shifting later elements. Capacity can grow as needed.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nArrayList<String> list = new ArrayList<>();\nlist.add(\"A\");\nlist.add(\"B\");\nlist.add(1, \"X\");\nSystem.out.println(list); // [A, X, B]\n```" },
          { title: "Common pitfalls", content: "Repeated middle insertions can be costly. ArrayList is not automatically synchronized." },
          { title: "Interview and exam focus", content: "Compare ArrayList with Vector and LinkedList and explain its normal use cases.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a student list supporting add, indexed lookup, update, and remove.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.4 Vector",
        slug: "vector",
        description: "Understand Vector as a growable array collection, its synchronized methods, and how it differs from ArrayList.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Vector is a growable array collection with synchronized methods. It is a legacy List implementation with historical use in older Java programs.\n\nDetailed study: Vector is a legacy growable-array implementation whose individual methods are synchronized. This historical synchronization does not automatically make a multi-operation workflow atomic: a sequence such as contains() followed by remove() can still require external coordination. Vector also exposes capacity-related behavior inherited from its legacy design. For modern code, ArrayList is normally preferred when external synchronization is unnecessary, while concurrent collections are preferred when true concurrent access is required." },
          { title: "How it works", content: "Vector expands its internal storage as elements are added and exposes operations such as add, get, remove, and size. Its synchronization is part of the type's legacy design.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nVector<Integer> v = new Vector<>();\nv.add(10);\nv.add(20);\nSystem.out.println(v.get(0));\n```" },
          { title: "Common pitfalls", content: "Do not select Vector automatically just because it is synchronized. Concurrency requirements should be evaluated at the application level." },
          { title: "Interview and exam focus", content: "Compare Vector and ArrayList, especially synchronization and historical design.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Rewrite a Vector example using ArrayList and explain which differences matter to the caller.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.5 Generics",
        slug: "generics",
        description: "Use generic types to provide compile-time type safety, reusable collections, and cleaner APIs.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "Generics express the element or value type a class, interface, or method operates on. They provide compile-time checking and reduce unsafe casts.\n\nDetailed study: Generics provide compile-time type safety and reduce explicit casts. A List<String> communicates that the list is intended to contain String values, while List<Object> is not a supertype of List<String>; generic types are invariant. Bounded type parameters such as <T extends Number> constrain usable types. Wildcards express variance at API boundaries: ? extends T is useful for reading values as T, while ? super T is useful for safely adding T values. Type erasure means most generic type arguments are not available as ordinary runtime type information." },
          { title: "How it works", content: "A declaration such as List<String> restricts the collection to String values at compile time. Generic types use reference-type arguments, so primitive values use wrapper types when needed.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nList<String> names = new ArrayList<>();\nnames.add(\"Amit\");\nString name = names.get(0);\n```" },
          { title: "Common pitfalls", content: "Raw types discard useful type checks. Do not assume List<String> can be assigned to List<Object>." },
          { title: "Interview and exam focus", content: "Explain type parameters, type safety, raw types, and why generics improve API clarity.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a generic Box<T> and a generic method that accepts a List<T>.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.6 Iterator",
        slug: "iterator",
        description: "Traverse collections safely with Iterator and understand hasNext, next, and remove.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Iterator provides a standard traversal abstraction independent of a collection's internal representation. Its core methods are hasNext(), next(), and remove().\n\nDetailed study: Iterator provides a uniform traversal mechanism through hasNext() and next(), with remove() available when supported. Its fail-fast behavior in common collections is a debugging aid rather than a concurrency guarantee. Modifying a collection structurally while iterating through it can cause ConcurrentModificationException. If removal is required during traversal, use Iterator.remove() where supported, or use the collection APIs designed for bulk removal. For concurrent collections, use their documented weakly consistent or snapshot-style iteration semantics." },
          { title: "How it works", content: "hasNext() checks for another element, next() advances the cursor, and remove() can remove the last element returned when supported.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nIterator<String> it = names.iterator();\nwhile (it.hasNext()) {\n    System.out.println(it.next());\n}\n```" },
          { title: "Common pitfalls", content: "Calling next() without another element causes an exception. Direct structural modification during iteration can invalidate traversal." },
          { title: "Interview and exam focus", content: "Explain Iterator traversal and why iterator-based removal is safer than arbitrary structural modification during traversal.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Traverse a HashSet and remove selected values using Iterator.remove().\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.7 Comparable",
        slug: "comparable",
        description: "Define a natural ordering for objects using Comparable and implement compareTo correctly.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Comparable defines a type's natural ordering through compareTo(). It is useful when one ordering is the natural default for a domain object.\n\nDetailed study: Comparable defines a natural ordering through compareTo(T). A comparison should return a negative value, zero, or a positive value according to ordering rather than relying on the exact magnitude. Ideally, compareTo returning zero should agree with equals(), especially for sorted collections, because TreeSet and TreeMap use ordering to determine duplicates and key equivalence. Natural ordering is appropriate when a type has one obvious default order; otherwise Comparator is usually more flexible." },
          { title: "How it works", content: "compareTo() communicates whether this object is less than, equal to, or greater than another object. Sorting and ordered collections can use that comparison.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nclass Student implements Comparable<Student> {\n    int marks;\n    Student(int marks) { this.marks = marks; }\n    public int compareTo(Student other) {\n        return Integer.compare(this.marks, other.marks);\n    }\n}\n```" },
          { title: "Common pitfalls", content: "An inconsistent comparison rule can lead to surprising ordering or set behavior. Design the natural ordering deliberately." },
          { title: "Interview and exam focus", content: "Compare Comparable and Comparator and explain the contract of compareTo().\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a Student natural ordering by marks and sort a list of students.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.8 TreeSet",
        slug: "treeset",
        description: "Store unique elements in sorted order with TreeSet and understand ordering and set operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "TreeSet stores unique elements in sorted order. It is useful when uniqueness and ordered traversal are both required.\n\nDetailed study: TreeSet is a sorted Set backed by a tree-based structure. Elements are ordered by their natural ordering or by a Comparator supplied at construction. Basic lookup, insertion, and removal are logarithmic in the number of elements. Because uniqueness is determined through ordering comparison, two distinct objects may be treated as duplicates when compareTo() or compare() returns zero. TreeSet is therefore different from HashSet, where equality and hashing determine membership." },
          { title: "How it works", content: "Ordering is used to position elements and determine ordering relationships. TreeSet also supports navigational operations such as first, last, higher, and lower.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nTreeSet<Integer> set = new TreeSet<>();\nset.add(30); set.add(10); set.add(20);\nSystem.out.println(set);\nSystem.out.println(set.first());\nSystem.out.println(set.higher(10));\n```" },
          { title: "Common pitfalls", content: "TreeSet does not preserve insertion order. The comparison rule must match the intended notion of uniqueness." },
          { title: "Interview and exam focus", content: "Compare TreeSet and HashSet and explain why ordering changes the choice.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Store unique marks and demonstrate first, last, higher, and lower.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.9 HashSet",
        slug: "hashset",
        description: "Store unique elements without relying on insertion order and understand hashing-based membership operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "HashSet represents a set of unique elements using hashing-based storage. It is useful for membership-oriented operations where sorted order is not the requirement.\n\nDetailed study: HashSet stores unique elements using hashing and does not promise iteration order. Average-case add(), contains(), and remove() are expected to be near constant time when hash distribution is healthy. Correct behavior depends on stable equals() and hashCode() implementations while an object is stored. If fields used by equals/hashCode are changed after insertion, lookup can fail because the object may now belong to a different logical bucket." },
          { title: "How it works", content: "Hash-based placement narrows the candidates and equality checks determine whether an equivalent element is already present. Correct equals and hashCode behavior is therefore important.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nSet<String> set = new HashSet<>();\nset.add(\"Java\");\nset.add(\"Java\");\nset.add(\"JDBC\");\nSystem.out.println(set.size()); // 2\n```" },
          { title: "Common pitfalls", content: "Do not rely on iteration order. Mutable equality-relevant state can make stored objects difficult to find or remove." },
          { title: "Interview and exam focus", content: "Explain uniqueness, hashing, equals(), hashCode(), and the difference from sorted sets.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a set of student IDs, add duplicates, and test membership and removal.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.10 HashMap",
        slug: "hashmap",
        description: "Store key-value pairs with HashMap and understand lookup, insertion, replacement, removal, and iteration.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "HashMap stores key-value associations. Keys are unique according to the map's equality rules, while values may repeat. It is a natural choice for lookup by key.\n\nDetailed study: HashMap stores key-value mappings and permits one null key and multiple null values. Average lookup and insertion are expected to be near constant time with a good hash distribution. Keys should have stable equals() and hashCode() behavior while present in the map. Modern implementations can transform heavily collided buckets into tree structures under suitable conditions. HashMap does not guarantee iteration order, so ordering requirements should be handled explicitly." },
          { title: "How it works", content: "put() inserts or replaces an association, get() retrieves a value, containsKey() tests key presence, remove() deletes an entry, and entrySet() supports key-value traversal.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nMap<Integer, String> students = new HashMap<>();\nstudents.put(101, \"Amit\");\nstudents.put(102, \"Riya\");\nSystem.out.println(students.get(101));\n```" },
          { title: "Common pitfalls", content: "Do not assume insertion or sorted order. Keys should have stable equality and hashing behavior while stored." },
          { title: "Interview and exam focus", content: "Explain HashMap versus Hashtable and TreeMap and discuss equals/hashCode for keys.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a student lookup by ID and demonstrate insertion, replacement, lookup, removal, and iteration.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.11 Hashtable",
        slug: "hashtable",
        description: "Understand Hashtable as a synchronized key-value collection and compare its characteristics with HashMap.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Hashtable is a legacy key-value collection whose methods are synchronized. It predates the modern collections design and has distinct historical behavior.\n\nDetailed study: Hashtable is a legacy synchronized Map implementation that does not permit null keys or null values. Its synchronized individual methods do not make compound sequences automatically atomic. It is mainly important for understanding older Java APIs and differences from HashMap. Modern applications normally choose HashMap for non-concurrent use or a java.util.concurrent map when concurrent access is required." },
          { title: "How it works", content: "Operations are coordinated through synchronization built into the type. Hashtable also has restrictions on null keys and values that differ from HashMap.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nHashtable<Integer, String> table = new Hashtable<>();\ntable.put(1, \"Amit\");\ntable.put(2, \"Riya\");\nSystem.out.println(table.get(1));\n```" },
          { title: "Common pitfalls", content: "Do not treat Hashtable as the universal solution for concurrent maps. Choose the data structure according to the actual concurrency requirement." },
          { title: "Interview and exam focus", content: "Compare Hashtable and HashMap, including synchronization and null handling.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Convert a Hashtable example to HashMap and document the behavioral differences.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "2.12 TreeMap",
        slug: "treemap",
        description: "Store key-value pairs in sorted key order and use navigational operations provided by TreeMap.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "TreeMap stores key-value pairs in sorted key order. It is useful when ordered keys and navigational queries are important.\n\nDetailed study: TreeMap maintains mappings in sorted key order using natural ordering or a Comparator. Operations such as get(), put(), and remove() are logarithmic because the map is tree based. Like TreeSet, key identity in the sorted structure is determined by comparison, so comparator consistency with equals matters. TreeMap is useful when sorted traversal, range queries, first/last keys, or navigation operations are part of the requirement." },
          { title: "How it works", content: "TreeMap uses key ordering and provides methods such as firstKey, lastKey, higherKey, and lowerKey. Traversal therefore follows key order rather than insertion order.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nTreeMap<Integer, String> map = new TreeMap<>();\nmap.put(103, \"Priya\");\nmap.put(101, \"Amit\");\nmap.put(102, \"Rahul\");\nSystem.out.println(map);\n```" },
          { title: "Common pitfalls", content: "Do not expect insertion order. The key comparison rule must be compatible with the desired map semantics." },
          { title: "Interview and exam focus", content: "Compare TreeMap with HashMap and explain when sorted navigation is valuable.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a score map keyed by ID and demonstrate firstKey, lastKey, higherKey, and lowerKey.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
    ],
  },
  {
    title: "Unit III: Java Database Connectivity",
    slug: "unit-iii-jdbc",
    description: "Connect Java applications to relational databases, execute SQL, process results, and use JDBC metadata and statements.",
    topics: [
      {
        title: "3.1 Introduction to JDBC",
        slug: "introduction-to-jdbc",
        description: "Understand JDBC as the standard Java API for database connectivity and the normal database access workflow.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "JDBC is the standard Java API for communicating with relational databases. It provides a consistent programming model for connections, SQL execution, result processing, and resource management.\n\nDetailed study: JDBC is Java’s standard API for communicating with relational databases. The normal flow is obtain a connection, create a statement object, execute SQL, process results, and close resources. Statement is suitable for fixed SQL, PreparedStatement represents parameterized SQL, and CallableStatement invokes stored procedures. Database resources are external resources, so try-with-resources is preferred. Production applications also need transaction boundaries, connection pooling, validation, and careful exception handling." },
          { title: "How it works", content: "The usual flow is connection -> statement -> execution -> result processing -> cleanup. Database-specific drivers provide the communication implementation behind the standard JDBC interfaces.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nConnection con = DriverManager.getConnection(url, user, password);\nPreparedStatement ps = con.prepareStatement(\"SELECT id, name FROM student\");\nResultSet rs = ps.executeQuery();\n```" },
          { title: "Common pitfalls", content: "Do not leave connections open or place real credentials directly in source code. Separate data access from presentation in larger applications." },
          { title: "Interview and exam focus", content: "Know Connection, Statement, PreparedStatement, ResultSet, Driver, and the normal JDBC workflow.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Write a small database reader that connects, queries, prints rows, and closes every resource.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.2 JDBC Architecture",
        slug: "jdbc-architecture",
        description: "Trace communication between the Java application, JDBC API, driver manager, driver, and database.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JDBC architecture connects application code to a database through standard interfaces and a database-specific driver. The major pieces are the application, JDBC API, DriverManager, driver, and DBMS.\n\nDetailed study: JDBC separates application code from database-specific driver implementations. Application code uses interfaces such as Connection, Statement, PreparedStatement, ResultSet, and DatabaseMetaData, while the driver translates JDBC operations into the database protocol. The driver manager or a DataSource provides connections. This abstraction lets the same Java programming model work with different relational database systems, while SQL dialect differences still need consideration at the application boundary." },
          { title: "How it works", content: "Application code calls JDBC interfaces. DriverManager manages available drivers and connection establishment. The selected driver translates JDBC operations into database-specific communication and returns results through JDBC types.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```text\nApplication -> JDBC API -> DriverManager -> JDBC Driver -> Database\n                                      <- JDBC results <-\n```" },
          { title: "Common pitfalls", content: "Do not confuse the JDBC API with the driver. The API defines the programming contract; the driver performs database-specific communication." },
          { title: "Interview and exam focus", content: "Draw the architecture and explain the responsibility of every component.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Trace one SELECT request from a Java method call to the database and back to a ResultSet.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.3 JDBC Drivers",
        slug: "jdbc-drivers",
        description: "Understand the four JDBC driver categories and the role of a driver in translating JDBC operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A JDBC driver enables Java code to communicate with a particular database. The material classifies drivers into four categories according to their communication path.\n\nDetailed study: The traditional JDBC driver classification includes Type 1 bridge drivers, Type 2 native-API drivers, Type 3 middleware drivers, and Type 4 pure Java drivers. Type 4 drivers became the common model because they communicate directly with the database protocol without requiring native client libraries. In current applications, the driver is normally supplied as a dependency and registered through the JDBC infrastructure rather than manually loading a class in every operation." },
          { title: "How it works", content: "Type 1 uses a bridge, Type 2 uses native database libraries, Type 3 uses middleware, and Type 4 communicates directly with the database protocol. The material presents Type 4 as the common modern approach.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```text\nApplication -> JDBC API -> Type 4 Driver -> Database\n```" },
          { title: "Common pitfalls", content: "Do not confuse driver categories with JDBC interfaces. Older driver categories have historical deployment and portability limitations." },
          { title: "Interview and exam focus", content: "Compare Type 1, Type 2, Type 3, and Type 4 by native dependencies, middleware, portability, and communication path.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a four-row driver comparison and explain why a direct pure-Java driver is convenient.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.4 Establishing Database Connection",
        slug: "establishing-database-connection",
        description: "Create and close database connections using DriverManager and Connection.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A Connection represents an active communication link between Java code and a database. DriverManager.getConnection() is used to establish that link.\n\nDetailed study: A JDBC connection represents a session with the database and is normally obtained through DriverManager or, in production systems, a DataSource. Connection acquisition can be expensive, which is why connection pools are common in server applications. Credentials should not be hard-coded into source code. Close ResultSet, Statement, and Connection resources reliably, preferably with try-with-resources, and use transactions when multiple statements must succeed or fail as one logical operation." },
          { title: "How it works", content: "The application supplies a JDBC URL and credentials, receives a Connection, performs database operations, and closes the connection when finished.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nConnection con = DriverManager.getConnection(\n    \"jdbc:mysql://localhost:3306/studentdb\",\n    \"root\",\n    \"password\");\ntry {\n    // database work\n} finally {\n    con.close();\n}\n```" },
          { title: "Common pitfalls", content: "Do not leak connections. Avoid embedding production credentials in source code." },
          { title: "Interview and exam focus", content: "Explain DriverManager.getConnection(), JDBC URLs, Connection, and cleanup.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Implement successful and failed connection handling and document what happens in each case.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.5 Executing SQL Query",
        slug: "executing-sql-query",
        description: "Execute SELECT and data-modification statements and understand executeQuery, executeUpdate, and execute.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JDBC provides different execution methods for SQL operations. SELECT operations normally produce a ResultSet, while INSERT, UPDATE, and DELETE normally produce an affected-row count.\n\nDetailed study: Statement execution depends on the SQL operation. executeQuery() is intended for queries that return a ResultSet, commonly SELECT; executeUpdate() is used for INSERT, UPDATE, DELETE, and DDL operations that return an update count; execute() handles cases where the result type may vary. SQL should be parameterized when input values are involved. Never concatenate untrusted user input into SQL simply to build a query string." },
          { title: "How it works", content: "executeQuery() returns ResultSet, executeUpdate() returns an integer count for updates and relevant DDL, and execute() returns a boolean indicating the type of first result.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nPreparedStatement ps = con.prepareStatement(\n    \"UPDATE student SET name=? WHERE id=?\");\nps.setString(1, \"Amit\");\nps.setInt(2, 101);\nint count = ps.executeUpdate();\n```" },
          { title: "Common pitfalls", content: "Use the execution method that matches the SQL operation. Parameterize user-controlled values instead of concatenating them into SQL." },
          { title: "Interview and exam focus", content: "Explain executeQuery(), executeUpdate(), execute(), and their return values.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Write examples for SELECT, INSERT, UPDATE, and DELETE and identify the expected result type for each.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.6 Processing Results (ResultSet)",
        slug: "processing-results-resultset",
        description: "Read rows returned by a SELECT statement using ResultSet and its getter methods.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "ResultSet represents rows returned by a query. A cursor moves through the result and typed getter methods retrieve column values.\n\nDetailed study: ResultSet represents rows returned by a query and maintains a cursor initially positioned before the first row. Calling next() advances the cursor and returns whether a row is available. Values can be read by column index or column label using methods such as getInt(), getString(), and getDate(). ResultSet behavior can depend on its type and concurrency mode. Always process rows before closing the statement/connection and avoid keeping database resources open longer than necessary." },
          { title: "How it works", content: "The normal pattern is while (rs.next()) followed by getInt(), getString(), and similar methods. Columns can be accessed by index or label.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nwhile (rs.next()) {\n    int id = rs.getInt(\"id\");\n    String name = rs.getString(\"name\");\n    System.out.println(id + \" \" + name);\n}\n```" },
          { title: "Common pitfalls", content: "Advance the cursor before reading a row and close the result and associated statement when finished." },
          { title: "Interview and exam focus", content: "Explain the ResultSet cursor, next(), typed getters, and the difference between row results and update counts.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Map every returned row into a small Student object and explain the mapping.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.7 Metadata",
        slug: "jdbc-metadata",
        description: "Inspect database and result-set structure using DatabaseMetaData and ResultSetMetaData.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Metadata describes database structure, driver information, or the structure of a query result. JDBC exposes it through DatabaseMetaData and ResultSetMetaData." },
          { title: "How it works", content: "DatabaseMetaData comes from Connection.getMetaData(). ResultSetMetaData comes from ResultSet.getMetaData() and exposes column count, names, and type information." },
          { title: "Worked example", content: "```java\nDatabaseMetaData db = con.getMetaData();\nSystem.out.println(db.getDatabaseProductName());\nResultSetMetaData rsmd = rs.getMetaData();\nSystem.out.println(rsmd.getColumnCount());\n```" },
          { title: "Common pitfalls", content: "Metadata describes structure and capabilities; it is not the actual row data." },
          { title: "Interview and exam focus", content: "Compare DatabaseMetaData and ResultSetMetaData and give a use for each." },
          { title: "Practice task", content: "Write a utility that prints every column name and type for a query result." },
        ],
      },
      {
        title: "3.8 PreparedStatement",
        slug: "preparedstatement",
        description: "Use parameterized SQL with PreparedStatement for safer, reusable database operations.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "PreparedStatement represents a parameterized SQL statement. It separates SQL structure from values and is the preferred approach in the material for parameterized operations.\n\nDetailed study: PreparedStatement represents parameterized SQL using placeholders such as ?. Values are supplied with methods such as setString(), setInt(), and setDate(). Parameterization separates SQL structure from values, reduces SQL injection risk, and can allow the database or driver to reuse prepared execution plans. It is also easier to read than manual string concatenation. Clear parameter binding, correct SQL types, and proper resource management are still required." },
          { title: "How it works", content: "Create the statement with ? placeholders, bind values with setter methods such as setInt and setString, and execute it. Parameter positions are one-based.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nPreparedStatement ps = con.prepareStatement(\n    \"SELECT * FROM student WHERE id = ?\");\nps.setInt(1, 101);\nResultSet rs = ps.executeQuery();\n```" },
          { title: "Common pitfalls", content: "Avoid string concatenation for user-controlled SQL values. Remember that JDBC parameter indexes start at 1." },
          { title: "Interview and exam focus", content: "Explain Statement versus PreparedStatement and how parameterization helps security and reuse.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Implement a registration insert using PreparedStatement and test input containing quotes and special characters.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "3.9 CallableStatement",
        slug: "callablestatement",
        description: "Execute stored procedures and work with IN, OUT, and INOUT parameters using CallableStatement.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "CallableStatement is designed to execute stored procedures. It supports input, output, and input-output parameters.\n\nDetailed study: CallableStatement is used to invoke stored procedures and functions. Parameters may be IN, OUT, or INOUT depending on the database procedure contract. The application registers output parameters before execution and retrieves them afterward. Stored-procedure support can be database-specific, so portability should be considered. CallableStatement is particularly useful when business logic already resides in database procedures or when database-side operations return structured outputs." },
          { title: "How it works", content: "Create a call with Connection.prepareCall(), bind IN values, register OUT values, execute, and retrieve returned values.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nCallableStatement cs = con.prepareCall(\"{call InsertStudent(?, ?)}\");\ncs.setInt(1, 105);\ncs.setString(2, \"Riya\");\ncs.execute();\n```" },
          { title: "Common pitfalls", content: "Do not confuse CallableStatement with normal parameterized SQL. It targets stored procedure calls." },
          { title: "Interview and exam focus", content: "Explain IN, OUT, INOUT and compare CallableStatement with PreparedStatement.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a stored procedure with an OUT value and call it from Java.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
    ],
  },
  {
    title: "Unit IV: Introduction to Servlets",
    slug: "unit-iv-servlets",
    description: "Build server-side Java applications with Servlets, understand lifecycle, HTTP methods, and request handling.",
    topics: [
      {
        title: "4.1 Introduction to Servlets",
        slug: "introduction-to-servlets",
        description: "Understand the servlet request-response model and the role of a servlet container.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "A Servlet is a server-side Java component that receives client requests and produces responses inside a servlet container. It is commonly used with the HTTP request-response model.\n\nDetailed study: A servlet is a server-side Java component that processes requests and creates responses, commonly through the HTTP programming model. A servlet container manages its lifecycle, maps URLs, creates request and response objects, and invokes the appropriate methods. A single servlet instance may handle many requests concurrently, so instance fields must not be used as request-specific mutable storage unless access is safely coordinated. This concurrency model is central to servlet design." },
          { title: "How it works", content: "The container loads and initializes the servlet, dispatches requests, and eventually destroys it. A servlet instance may handle multiple requests using different threads, so shared mutable fields require care.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\n@WebServlet(\"/hello\")\npublic class HelloServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req,\n                         HttpServletResponse resp) throws IOException {\n        resp.setContentType(\"text/plain\");\n        resp.getWriter().println(\"Hello\");\n    }\n}\n```" },
          { title: "Common pitfalls", content: "Do not keep request-specific mutable data in shared servlet fields. Distinguish the servlet class from the container that manages it." },
          { title: "Interview and exam focus", content: "Explain servlet, container, request, response, and multi-request handling.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a greeting servlet and another servlet that returns a request parameter.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "4.2 Deploying a Simple Servlet",
        slug: "deploying-a-simple-servlet",
        description: "Create, map, deploy, and access a simple servlet using annotation or deployment configuration.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Servlet deployment makes a servlet reachable through a servlet container. The material presents annotation-based URL mapping and deployment configuration.\n\nDetailed study: Servlet deployment requires a servlet container such as Tomcat, a compiled servlet class, and URL mapping. Mapping can be declared with @WebServlet or through the deployment descriptor. An HTTP request reaches the container, the container resolves the mapping, invokes the servlet, and sends the generated response back to the client. A production deployment also needs dependency management, correct application packaging, logging, error handling, and configuration externalization." },
          { title: "How it works", content: "A servlet normally extends HttpServlet, implements request handlers, and receives a mapping such as @WebServlet(\"/HelloServlet\"). The container routes matching requests to the class.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\n@WebServlet(\"/HelloServlet\")\npublic class HelloServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req,\n                         HttpServletResponse resp) throws IOException {\n        resp.getWriter().println(\"Hello, Welcome to Servlet\");\n    }\n}\n```" },
          { title: "Common pitfalls", content: "Correct Java code is not enough if the class is not deployed or mapped correctly. Keep container and API configuration consistent." },
          { title: "Interview and exam focus", content: "Explain @WebServlet versus web.xml and the role of the servlet container.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Deploy a simple servlet and trace the browser request through URL mapping to doGet().\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "4.3 Servlet Life Cycle",
        slug: "servlet-life-cycle",
        description: "Understand loading, initialization, request processing, and destruction managed by the servlet container.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "The servlet lifecycle describes loading, initialization, request processing, and destruction under the control of the servlet container.\n\nDetailed study: The servlet lifecycle is controlled by the container: it loads and instantiates the servlet, calls init() once for initialization, invokes service() for requests, and eventually calls destroy() before removing the servlet. HttpServlet normally dispatches HTTP methods from service() to methods such as doGet() and doPost(). Because multiple requests may execute concurrently on the same servlet instance, initialization and shared fields need careful design." },
          { title: "How it works", content: "init() is for initialization, request methods such as doGet/doPost handle client work, and destroy() is for cleanup. The container controls when these stages occur.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\npublic void init() { /* one-time setup */ }\nprotected void doGet(HttpServletRequest req,\n                     HttpServletResponse resp) { /* request */ }\npublic void destroy() { /* cleanup */ }\n```" },
          { title: "Common pitfalls", content: "Do not assume init() runs once per request. Avoid shared mutable request state in instance fields." },
          { title: "Interview and exam focus", content: "Explain init, service/request handling, and destroy, including what belongs in each stage.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Add logging to lifecycle methods and send multiple requests to identify which methods repeat.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "4.4 GET Request",
        slug: "get-request",
        description: "Handle HTTP GET requests with doGet and retrieve request parameters.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "GET is commonly used to request a resource, with query parameters represented in the URL. In a servlet, GET requests are handled by doGet().\n\nDetailed study: GET requests are commonly used to retrieve resources and can carry parameters in the URL query string. In HttpServlet, doGet() receives HttpServletRequest and HttpServletResponse. Request parameters are read with getParameter(), while response headers, status, content type, and body are controlled through HttpServletResponse. GET should generally be safe and idempotent for retrieval operations; sensitive data should not be placed casually in URLs because URLs may be logged or cached." },
          { title: "How it works", content: "The container supplies HttpServletRequest and HttpServletResponse. getParameter() retrieves named request values.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nprotected void doGet(HttpServletRequest request,\n                     HttpServletResponse response) throws IOException {\n    String name = request.getParameter(\"name\");\n    response.getWriter().println(\"Hello \" + name);\n}\n```" },
          { title: "Common pitfalls", content: "GET data can appear in URLs and should not be treated as private. Validate every incoming value." },
          { title: "Interview and exam focus", content: "Compare GET and POST and explain doGet() and request parameter access.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a GET endpoint accepting name and course and return a formatted response.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "4.5 POST Request",
        slug: "post-request",
        description: "Handle HTTP POST requests with doPost and process submitted request data.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "POST is commonly used to submit data to the server. In a servlet, doPost() processes the request and retrieves submitted parameters.\n\nDetailed study: POST requests commonly carry form or request-body data for operations that create or change server state. In a servlet, doPost() reads submitted parameters or body content and then performs validation and processing. Successful form submissions often use the Post/Redirect/Get pattern so a browser refresh does not repeat the submission. Input should be validated on the server regardless of client-side validation, and authentication/authorization checks belong on the server side." },
          { title: "How it works", content: "The client sends form data in the request body. The servlet validates the data, performs processing, and sends a response.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nprotected void doPost(HttpServletRequest request,\n                      HttpServletResponse response) throws IOException {\n    String email = request.getParameter(\"email\");\n    response.getWriter().println(\"Received: \" + email);\n}\n```" },
          { title: "Common pitfalls", content: "POST does not automatically make data secure. Use appropriate transport security and validate server-side." },
          { title: "Interview and exam focus", content: "Explain doPost(), form submission, request parameters, and the practical distinction from GET.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a registration form using POST and reject missing required values.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "4.6 Request Object",
        slug: "request-object",
        description: "Use HttpServletRequest to inspect parameters, headers, attributes, method information, and request data.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "HttpServletRequest represents the incoming client request. It provides access to parameters, headers, attributes, the request method, and other request information.\n\nDetailed study: HttpServletRequest exposes information about an incoming HTTP request, including parameters, headers, cookies, HTTP method, URI, session, and request attributes. Important methods include getParameter(), getParameterMap(), getHeader(), getCookies(), getMethod(), getRequestURI(), getSession(), and setAttribute(). Request attributes are useful for passing server-side objects between components during one request, while parameters represent client-supplied input and therefore must be treated as untrusted data." },
          { title: "How it works", content: "Methods such as getParameter(), getParameterValues(), getParameterNames(), getHeader(), and getMethod() expose different parts of the request.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nString method = request.getMethod();\nString userAgent = request.getHeader(\"User-Agent\");\nString name = request.getParameter(\"name\");\n```" },
          { title: "Common pitfalls", content: "Request data is untrusted input. Validate it before using it in application logic or database operations." },
          { title: "Interview and exam focus", content: "Distinguish request parameters, headers, attributes, and method information.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a diagnostic servlet that prints selected request metadata and explain the origin of each value.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
    ],
  },
  {
    title: "Unit V: Handling Form Data",
    slug: "unit-v-form-data",
    description: "Process HTML form submissions, combine Servlets with JDBC, chain requests, and manage client state.",
    topics: [
      {
        title: "5.1 Accessing Data from HTML Form",
        slug: "accessing-data-from-html-form",
        description: "Receive form fields in a servlet using request parameters and process submitted user data.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "An HTML form sends named fields to a server endpoint. The action chooses the target and the method determines how the request is sent.\n\nDetailed study: HTML form data is submitted as named fields, and a servlet reads those values using request.getParameter(\"fieldName\"). Multiple values for the same name can be accessed with getParameterValues(). The server should validate required fields, length, format, and business rules before processing them. A missing parameter returns null, so code should not immediately call methods on the result. Character encoding should also be configured correctly when processing text input." },
          { title: "How it works", content: "getParameter() reads one submitted value, getParameterValues() handles multiple values, and getParameterNames() exposes submitted parameter names. A field needs a name attribute to be addressed by these APIs.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```html\n<form action=\"FormDataServlet\" method=\"post\">\n  <input type=\"text\" name=\"name\">\n  <input type=\"email\" name=\"email\">\n  <input type=\"submit\" value=\"Submit\">\n</form>\n```" },
          { title: "Common pitfalls", content: "A field without a name is not available through normal named parameter lookup. Client-side validation is not a substitute for server-side validation." },
          { title: "Interview and exam focus", content: "Explain action, method, name, getParameter(), and getParameterValues().\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a student registration form and validate every received parameter in the servlet.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "5.2 Using JDBC in Servlet",
        slug: "using-jdbc-in-servlet",
        description: "Connect servlet request processing to relational database operations using JDBC.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A servlet can combine HTTP request handling with JDBC database operations. This creates a request-to-database-to-response workflow.\n\nDetailed study: A servlet can receive form input, invoke JDBC, and produce a response, but database code should ideally be separated into a DAO or service layer. The request flow is input validation, business operation, database interaction, transaction handling, and response generation. PreparedStatement should be used for parameterized SQL. Connections and statements must be closed reliably, and connection pooling is preferable to creating a brand-new physical connection for every request." },
          { title: "How it works", content: "Read and validate request parameters, create a parameterized SQL statement, execute it, process the result, and generate the HTTP response. The material recommends PreparedStatement for parameterized values.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nString name = request.getParameter(\"name\");\nPreparedStatement ps = con.prepareStatement(\n    \"INSERT INTO student(name) VALUES(?)\");\nps.setString(1, name);\nint rows = ps.executeUpdate();\n```" },
          { title: "Common pitfalls", content: "Do not place large amounts of database logic directly in servlet methods in larger applications. Always clean up database resources." },
          { title: "Interview and exam focus", content: "Explain the request -> JDBC -> response flow and why PreparedStatement is preferred for submitted values.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a registration servlet that inserts a student and reports success only when the expected row count is returned.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "5.3 Servlet Chaining",
        slug: "servlet-chaining",
        description: "Pass processing from one servlet or resource to another using RequestDispatcher forward and include.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Servlet chaining passes request processing from one servlet or resource to another. It can divide a larger workflow into smaller stages.\n\nDetailed study: Servlet chaining passes processing from one servlet or web component to another. RequestDispatcher.forward() transfers control internally without asking the browser to issue a second request, while include() incorporates another resource’s output into the current response. Request attributes can carry server-side data between components. Chaining is useful for separating responsibilities, but excessive forwarding can make control flow difficult to understand, so clear controller/service/view boundaries are preferable." },
          { title: "How it works", content: "RequestDispatcher provides forward() and include(). forward transfers processing to another resource, while include incorporates another resource's output into the current response.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nRequestDispatcher rd = request.getRequestDispatcher(\"SecondServlet\");\nrd.forward(request, response);\n```" },
          { title: "Common pitfalls", content: "Understand forward versus include and avoid creating chains so complex that request flow becomes difficult to trace." },
          { title: "Interview and exam focus", content: "Explain RequestDispatcher, forward(), include(), and common uses of chaining.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a validation servlet that forwards valid requests to a second servlet for response generation.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "5.4 Cookies",
        slug: "cookies",
        description: "Use HTTP cookies to store small pieces of client-associated state and understand common cookie operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Cookies are small pieces of client-associated state that can be sent back with later HTTP requests. Servlets can create and read Cookie objects.\n\nDetailed study: Cookies store small pieces of state associated with a client and are sent back by the browser on subsequent matching requests. A servlet can create a Cookie and add it to the response, then read cookies from HttpServletRequest. Important attributes include Max-Age, Path, Domain, Secure, and HttpOnly. Authentication-related cookies require special care: Secure and HttpOnly reduce exposure, while SameSite policies help mitigate some cross-site request risks." },
          { title: "How it works", content: "The server adds a cookie to the response. The client stores it and may send it in subsequent requests, allowing the application to recognize client-associated state.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nCookie c = new Cookie(\"username\", \"Amit\");\nresponse.addCookie(c);\nCookie[] cookies = request.getCookies();\n```" },
          { title: "Common pitfalls", content: "Do not put sensitive information into cookies without appropriate protection. Configure lifetime and security properties deliberately." },
          { title: "Interview and exam focus", content: "Compare cookies and sessions and explain where each piece of state is maintained.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a preference cookie, read it on a later request, and trace the two request-response cycles.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "5.5 Session Management",
        slug: "session-management",
        description: "Maintain user-specific state across requests using HttpSession and session attributes.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "HttpSession maintains user-specific state across multiple HTTP requests. It solves the problem that HTTP requests are independent by themselves.\n\nDetailed study: HTTP is stateless, so HttpSession provides server-side state associated with a client session. Common operations include setAttribute(), getAttribute(), removeAttribute(), invalidate(), and getId(). Session identifiers must be protected because possession of a valid identifier can provide access to session state. Applications should invalidate sessions at logout and avoid storing unnecessary sensitive information in them. Session management is different from cookies: cookies are client-side storage, while HttpSession state is maintained by the server." },
          { title: "How it works", content: "Store values with setAttribute(), retrieve them with getAttribute(), remove them with removeAttribute(), and end the session with invalidate(). The session identifier associates later requests with the same session.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```java\nHttpSession session = request.getSession();\nsession.setAttribute(\"username\", \"Amit\");\nString user = (String) session.getAttribute(\"username\");\n```" },
          { title: "Common pitfalls", content: "Avoid storing unbounded data in session state. Session state should not be confused with authorization policy." },
          { title: "Interview and exam focus", content: "Explain session ID, HttpSession, attributes, timeout, invalidate(), and cookies versus sessions.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a two-servlet flow where one stores a username in session and another displays it.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
    ],
  },
  {
    title: "Unit VI: JavaServer Pages",
    slug: "unit-vi-jsp",
    description: "Understand JSP execution, scripting elements, directives, sessions, database access, and JavaBeans integration.",
    topics: [
      {
        title: "6.1 Introduction to JSP",
        slug: "introduction-to-jsp",
        description: "Understand JSP as a server-side presentation technology built on servlet processing.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "JSP is a server-side technology for generating dynamic web content. A JSP page is translated into servlet code and executed by the JSP container.\n\nDetailed study: JSP is a server-side view technology designed to generate dynamic web responses. A JSP page is translated into a servlet-like implementation by the JSP container and then executed. JSP provides implicit objects and standard actions for common web tasks. For maintainable applications, JSP is best treated primarily as a presentation layer, with business logic and database access placed in servlets, services, or JavaBeans rather than embedded throughout page markup." },
          { title: "How it works", content: "When requested for the first time or after modification, the page is translated and compiled into a servlet. Subsequent requests can execute the generated servlet until the page changes.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```jsp\n<html>\n<body>\nCurrent user: <%= \"Amit\" %>\n</body>\n</html>\n```" },
          { title: "Common pitfalls", content: "Keep substantial business and database logic out of presentation pages. Treat JSP primarily as a presentation technology in the architecture described by the material." },
          { title: "Interview and exam focus", content: "Explain the relationship between JSP and Servlets and why translation into a servlet matters.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a simple JSP page and identify which parts are presentation and which would belong in application logic.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "6.2 JSP Scripting Elements",
        slug: "jsp-scripting-elements",
        description: "Use JSP expression, scriptlet, and declaration elements and understand how they map into generated servlet code.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JSP scripting elements embed Java constructs in a JSP page. The three forms are expression, scriptlet, and declaration.\n\nDetailed study: JSP scripting elements traditionally include declarations, scriptlets, and expressions. A declaration defines class-level members, a scriptlet embeds Java statements into the generated implementation, and an expression evaluates a value for output. These features explain how older JSP pages work, but excessive scriptlet usage mixes presentation and business logic and makes testing harder. Expression Language and tag libraries are generally cleaner for view-oriented code." },
          { title: "How it works", content: "An expression <%= ... %> emits a value. A scriptlet <% ... %> contains statements that become request-processing code. A declaration <%! ... %> creates members of the generated servlet class.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```jsp\n<%! int square(int n) { return n * n; } %>\nSquare of 5 = <%= square(5) %>\n```" },
          { title: "Common pitfalls", content: "Large amounts of scriptlet code make presentation difficult to maintain. Understand where each element is placed in generated servlet code." },
          { title: "Interview and exam focus", content: "Compare expression, scriptlet, and declaration by syntax, purpose, and generated location.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Write a page using all three forms and explain which code executes per request and which becomes a class member.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "6.3 JSP Directives",
        slug: "jsp-directives",
        description: "Configure JSP translation with page, include, and taglib directives.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JSP directives provide translation-time instructions to the JSP container. The material covers page, include, and taglib directives.\n\nDetailed study: JSP directives provide instructions to the JSP container and include page, include, and taglib directives. The page directive controls attributes such as content type, imports, session behavior, and error handling. The include directive can include static content during translation, while the taglib directive makes custom or standard tag libraries available. Directives affect page translation/configuration rather than behaving like ordinary request-time statements." },
          { title: "How it works", content: "The page directive controls page-level settings. The include directive includes another file during translation. The taglib directive declares a tag library such as JSTL.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```jsp\n<%@ page import=\"java.util.Date\" %>\n<%@ include file=\"header.jsp\" %>\n<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>\n```" },
          { title: "Common pitfalls", content: "Do not confuse the include directive with request-time forwarding. Directives configure translation rather than directly generating normal response output." },
          { title: "Interview and exam focus", content: "Explain all three directive types and their processing stage.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Create a reusable header file and include it in a JSP page, then explain the translation effect.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "6.4 Sessions in JSP",
        slug: "sessions-in-jsp",
        description: "Maintain user-specific information across multiple JSP requests with the session implicit object.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JSP exposes session as an implicit object when session support is enabled. It provides convenient access to HttpSession-style user state.\n\nDetailed study: JSP exposes session as an implicit HttpSession object when session support is enabled. Attributes can be stored and retrieved directly for user-specific state, and the session can be invalidated when the user logs out. Typical applications include authentication state, shopping carts, preferences, and multi-step workflows. Because session state consumes server resources and is associated with a session identifier, applications should store only necessary information and apply appropriate session timeout and security settings." },
          { title: "How it works", content: "Use session.setAttribute() and session.getAttribute() to maintain values across requests. The session can be invalidated when state should be discarded.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```jsp\n<%\nsession.setAttribute(\"username\", \"Amit\");\nString user = (String) session.getAttribute(\"username\");\n%>\nWelcome <%= user %>\n```" },
          { title: "Common pitfalls", content: "Do not store sensitive or unbounded data casually in session state. Manage session lifetime deliberately." },
          { title: "Interview and exam focus", content: "Explain the JSP session implicit object and its relationship with HttpSession.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Build a two-page JSP flow that stores and displays a username through the session.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "6.5 Using JDBC in JSP",
        slug: "using-jdbc-in-jsp",
        description: "Understand database access from JSP and the recommended separation between presentation and database logic.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JSP can perform JDBC operations, but the material recommends separating database logic from presentation through Servlets or JavaBeans for maintainability.\n\nDetailed study: JDBC can technically be used directly inside JSP, but this mixes data-access logic with presentation. A typical flow is obtain a connection, prepare parameterized SQL, execute it, iterate through ResultSet, render values, and close resources. This is useful for learning the integration, but maintainable applications should delegate database work to backend components and pass prepared data to the JSP view. This separation improves testing, reuse, security, and readability." },
          { title: "How it works", content: "A direct example imports JDBC classes, obtains a connection, executes a PreparedStatement, iterates through ResultSet, and renders values. The architectural lesson is to keep data access away from presentation where possible.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules." },
          { title: "Worked example", content: "```jsp\n<%@ page import=\"java.sql.*\" %>\n<% \nPreparedStatement ps = con.prepareStatement(\"SELECT * FROM student\");\nResultSet rs = ps.executeQuery();\nwhile (rs.next()) {\n    out.println(rs.getString(\"name\"));\n}\n%>\n```" },
          { title: "Common pitfalls", content: "Embedding credentials and large database operations in view code makes testing and maintenance harder. Close resources reliably." },
          { title: "Interview and exam focus", content: "Explain the direct JDBC-in-JSP flow and why the material recommends separating presentation and data access.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution." },
          { title: "Practice task", content: "Refactor a direct JSP database example into a Java component and leave the JSP responsible for rendering.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail." },
        ],
      },
      {
        title: "6.6 JavaBeans in JSP",
        slug: "javabeans-in-jsp",
        description: "Use reusable JavaBean components with JSP action tags for cleaner presentation and reusable data handling.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "JavaBeans are reusable Java classes that encapsulate properties through private fields and public getters and setters. They can keep data handling separate from presentation code.\n\nDetailed study: A JavaBean is a reusable Java class following conventions such as private properties, public getters/setters, and commonly a public no-argument constructor. JSP supports bean actions such as jsp:useBean, jsp:setProperty, and jsp:getProperty. Beans help move data and reusable behavior out of page markup. A clean design keeps persistence and complex business rules outside the bean used by the view, especially as an application grows.\n\nDetailed study: JavaBeans are convention-based components rather than a special language construct. A bean property is normally exposed through a getter/setter pair, while the object itself can carry reusable state for a web application. The conventional no-argument constructor allows frameworks and JSP actions to instantiate the bean. In a maintainable design, the bean should have a clear responsibility and should not become a container for database connections or unrelated business logic." },
          { title: "How it works", content: "A typical bean follows conventions such as a public no-argument constructor, properties, getters/setters, and commonly Serializable. JSP action tags can create or locate the bean and access its properties.\n\nImplementation focus: Trace the lifecycle from input or operation to the underlying Java object/API. Pay attention to ownership, state changes, contracts, failure modes, and whether an operation is atomic, ordered, synchronized, or dependent on comparison/equality rules.\n\nImplementation focus: The JSP container resolves the bean class, creates or locates the object in the requested scope, and uses the property accessors requested by JSP actions. The common scopes are page, request, session, and application; choosing a wider scope increases object lifetime and sharing, so state should be placed in the narrowest scope that satisfies the use case." },
          { title: "Worked example", content: "```java\npublic class Student implements Serializable {\n    private String name;\n    public Student() {}\n    public void setName(String name) { this.name = name; }\n    public String getName() { return name; }\n}\n```\n```jsp\n<jsp:useBean id=\"student\" class=\"Student\" />\n<jsp:setProperty name=\"student\" property=\"name\" value=\"Amit\" />\n<jsp:getProperty name=\"student\" property=\"name\" />\n```" },
          { title: "Common pitfalls", content: "Do not put complex business workflows into simple property-holder beans. Understand JavaBean conventions separately from general Java object design." },
          { title: "Interview and exam focus", content: "Explain JavaBean conventions and the roles of useBean, setProperty, and getProperty.\n\nDeeper interview angle: Be ready to explain not only what the API does, but why it exists, what happens internally at a high level, when to choose an alternative, and which edge cases can produce incorrect behavior. A strong answer should include one concrete example and one production-oriented caution.\n\nDeeper interview angle: Know the bean conventions, property introspection idea, no-argument constructor, Serializable convention, JSP action tags, and bean scopes. Be able to explain why a JavaBean is different from a plain POJO only by conventions and expected framework interoperability, not by inheritance from a special superclass." },
          { title: "Practice task", content: "Create a Student bean with several properties and use it from JSP action tags.\n\nExtension exercise: Build a small example that demonstrates the normal case, an invalid or boundary case, and the behavior under realistic usage. Record the expected result, then explain why the result follows from the API contract rather than from an accidental implementation detail.\n\nExtension exercise: Create a Student bean with id, name, and email properties. Use JSP actions to create it, assign values, read the values, and compare page scope with session scope. Then move database access out of the bean and explain why presentation, business logic, and persistence should remain separate." },
        ],
      },
    ],
  },
];

const advancedJavaCategory: CategorySeed = {
  name: "Advanced Java",
  slug: "advanced-java",
  description: "A structured Advanced Java curriculum covering multithreading, the Collection Framework, JDBC, Servlets, form processing, cookies, sessions, JSP, and JavaBeans with explanations, examples, pitfalls, interview questions, and practice tasks.",
  icon: "JAVA",
  sortOrder: 1,
  paths: [
    {
      name: "Advanced",
      slug: "advanced",
      description: "Practical Advanced Java preparation for academic study, interview revision, and hands-on server-side Java development.",
      level: StudyLevel.ADVANCED,
      modules,
    },
  ],
};

async function ensureCategory(categorySeed: CategorySeed) {
  const category = await prisma.studyCategory.upsert({
    where: { slug: categorySeed.slug },
    update: { name: categorySeed.name, description: categorySeed.description, icon: categorySeed.icon, sortOrder: categorySeed.sortOrder, isPublished: true },
    create: { name: categorySeed.name, slug: categorySeed.slug, description: categorySeed.description, icon: categorySeed.icon, sortOrder: categorySeed.sortOrder, isPublished: true },
  });

  for (let pathIndex = 0; pathIndex < categorySeed.paths.length; pathIndex += 1) {
    const pathSeed = categorySeed.paths[pathIndex];
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: category.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: pathIndex },
      create: { categoryId: category.id, name: pathSeed.name, slug: pathSeed.slug, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: pathIndex },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex += 1) {
      const moduleSeed = pathSeed.modules[moduleIndex];
      const studyModule = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, isPublished: true, sortOrder: moduleIndex },
        create: { studyPathId: path.id, title: moduleSeed.title, slug: moduleSeed.slug, description: moduleSeed.description, isPublished: true, sortOrder: moduleIndex },
      });

      for (let topicIndex = 0; topicIndex < (moduleSeed.topics ?? []).length; topicIndex += 1) {
        const topicSeed = moduleSeed.topics![topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: category.id, slug: topicSlug } },
          update: { title: topicSeed.title, moduleId: studyModule.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: topicIndex },
          create: { categoryId: category.id, moduleId: studyModule.id, title: topicSeed.title, slug: topicSlug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: topicIndex, prerequisiteIds: [], relatedTopicIds: [] },
        });

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex += 1) {
          const section = topicSeed.sections![sectionIndex];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${sectionIndex}` },
            update: { title: section.title, content: section.content, sortOrder: sectionIndex },
            create: { id: `${topic.id}-section-${sectionIndex}`, topicId: topic.id, title: section.title, content: section.content, sortOrder: sectionIndex },
          });
        }
      }
    }
  }
}

async function main() {
  await ensureCategory(advancedJavaCategory);
  const moduleCount = modules.length;
  const topicCount = modules.reduce((total, module) => total + (module.topics?.length ?? 0), 0);
  console.log(`Advanced Java seed completed: ${moduleCount} modules, ${topicCount} topics`);
}

main()
  .catch((error) => {
    console.error("Advanced Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
