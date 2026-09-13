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
          { title: "Concept and mental model", content: "A Java application can have several threads making progress independently inside the same process. The important mental model is that threads share the process's heap and other process resources, while each thread has its own execution stack and program counter. That makes communication through shared objects possible, but it also means two threads can observe or modify the same state at overlapping times.\n\nConcurrency and parallelism are related but not identical. Concurrency means multiple activities are in progress during the same period; parallelism means work is actually executing simultaneously on different execution resources. Asynchronous programming is another idea: it describes how a caller can start work without waiting synchronously for the result. A design can be concurrent without being parallel and asynchronous without creating a new thread for every operation.\n\nThe central engineering question is ownership: who is allowed to change a piece of state, and what guarantees exist when another thread observes it? Prefer immutable data, thread confinement, message passing, or well-defined synchronization before introducing shared mutable state." },
          { title: "How it works", content: "Calling `start()` asks the JVM to create a new execution path and eventually invoke `run()` on that thread. The operating system and JVM scheduler decide when it actually runs, so the order between independent threads is generally nondeterministic.\n\nEach thread maintains its own call stack, while objects allocated in the heap can be shared. This is why a local variable inside `run()` is normally thread-local, while an instance field on a shared object may be observed by several threads. Correctness therefore depends on the memory-visibility and synchronization rules, not on the order seen during one test run." },
          { title: "Worked example", content: "```java\nclass Task extends Thread {\n    public void run() {\n        System.out.println(\"Worker running\");\n    }\n    public static void main(String[] args) {\n        new Task().start();\n        System.out.println(\"Main continues\");\n    }\n}\n```\nThe relative output order is not guaranteed." },
          { title: "Common pitfalls", content: "Do not assume a fixed scheduling order or confuse concurrency with guaranteed parallel execution. Avoid using arbitrary delays as synchronization." },
          { title: "Interview and exam focus", content: "Interviewers commonly test three distinctions: process versus thread, concurrency versus parallelism, and `start()` versus `run()`. A strong answer should also explain why shared mutable state creates races and why adding a thread does not automatically make a program faster.\n\nA useful production example is a web server handling many independent requests. The key design question is not simply “how many threads?” but whether the work is CPU-bound or I/O-bound, how tasks are bounded, and how shared state is protected." },
          { title: "Practice task", content: "Build two tasks that update separate local variables and observe that they do not need synchronization. Then let both tasks update one shared counter and run the program repeatedly. Explain why a race can appear and identify the exact shared state that requires coordination." },
        ],
      },
      {
        title: "1.2 Creating Threads",
        slug: "creating-threads",
        description: "Create threads with Thread and Runnable, understand start versus run, and choose an appropriate design.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "There are two separate ideas in thread creation: defining the work and choosing how that work will execute. Extending `Thread` combines those responsibilities. Implementing `Runnable` describes the work independently, which makes the task easier to reuse and lets the class keep another superclass.\n\nThe most important rule is simple: `start()` creates a new thread of execution; `run()` does not. Calling `run()` directly is just a normal method call on the current thread. This distinction explains many beginner mistakes because both forms compile and both execute the method body, but only one changes the execution model." },
          { title: "How it works", content: "With `Runnable`, a task object is passed to a `Thread`, and `start()` causes the new thread to execute that task. In modern applications, tasks are often submitted to an `ExecutorService` instead of creating raw threads manually. That gives the application control over thread reuse, queueing, shutdown, and resource limits.\n\nThread creation itself is therefore usually not the abstraction you want at scale. The useful design boundary is “what work should happen?” versus “how should the application schedule that work?”" },
          { title: "Worked example", content: "```java\nclass PrintTask implements Runnable {\n    public void run() {\n        System.out.println(\"Worker is running\");\n    }\n}\nThread t = new Thread(new PrintTask());\nt.start();\n```" },
          { title: "Common pitfalls", content: "Calling run() instead of start() does not create a new thread. Avoid unnecessary inheritance when a Runnable task is sufficient." },
          { title: "Interview and exam focus", content: "Be prepared to explain why `Runnable` is often preferred to extending `Thread`, what `start()` actually changes, and what happens when `run()` is called directly. A strong candidate also knows that `Runnable` does not itself represent a thread; it represents work that can be executed by one." },
          { title: "Practice task", content: "Write the same task once as a `Runnable`, execute it with a `Thread`, and then execute a similar task through an executor. Compare ownership, reuse, shutdown, and the number of threads created." },
        ],
      },
      {
        title: "1.3 Thread Life Cycle",
        slug: "thread-life-cycle",
        description: "Understand the major states and transitions a Java thread passes through during execution.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A Java thread is not simply “running or stopped.” Its `Thread.State` describes several important conditions: `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, and `TERMINATED`. `RUNNABLE` includes a thread that is ready to run and one that is actually executing; Java does not expose a separate `RUNNING` state.\n\n`BLOCKED` means the thread is waiting to acquire a monitor lock. `WAITING` represents an indefinite wait for another action, while `TIMED_WAITING` has a time limit. `TERMINATED` means execution has finished. A thread begins in `NEW`, becomes eligible for execution after `start()`, and cannot be started again after termination." },
          { title: "How it works", content: "The state transitions are driven by operations such as `start()`, monitor acquisition, `wait()`, `join()`, and `sleep()`. A state observed through `getState()` is only a snapshot; another thread can change state immediately afterward.\n\nFor example, a thread sleeping for 500 milliseconds is normally in `TIMED_WAITING`, while a thread trying to enter a synchronized block held by another thread can be `BLOCKED`. These states are diagnostic information, not a synchronization mechanism." },
          { title: "Worked example", content: "```java\nThread t = new Thread(() -> System.out.println(\"work\"));\nSystem.out.println(t.getState());\nt.start();\n```" },
          { title: "Common pitfalls", content: "Do not assume an instantaneous state will remain unchanged. A terminated thread cannot be restarted." },
          { title: "Interview and exam focus", content: "Know all six Java states and, more importantly, be able to distinguish `BLOCKED`, `WAITING`, and `TIMED_WAITING`. A common trap is saying that `RUNNABLE` means the thread is definitely using CPU at that instant." },
          { title: "Practice task", content: "Create a worker that sleeps, another that waits for a lock, and a main thread that calls `join()`. Sample `getState()` at several points and explain why the observed state is only a momentary snapshot." },
        ],
      },
      {
        title: "1.4 Thread Priorities",
        slug: "thread-priorities",
        description: "Learn Java thread priority constants and how priority can influence scheduling without guaranteeing execution order.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Thread priority is a scheduling hint, not a business rule. Java defines `MIN_PRIORITY`, `NORM_PRIORITY`, and `MAX_PRIORITY`, with normal priority as the default. A higher priority does not mean “run first,” “finish first,” or “receive exactly more CPU time.”\n\nThe reason is that actual scheduling involves the JVM and operating system. Different environments can interpret priorities differently, and modern systems may provide weaker practical guarantees than a programmer expects. If correctness depends on ordering, use explicit coordination such as `join()`, locks, latches, futures, or executors." },
          { title: "How it works", content: "`setPriority()` changes the requested priority and `getPriority()` reads the current value. The priority must remain within Java's permitted range, otherwise the API rejects the request.\n\nThe important execution model is that priority participates in scheduling decisions but does not create a happens-before relationship, mutual exclusion, or deterministic ordering. A program that works only because one thread “usually runs first” is relying on an accident." },
          { title: "Worked example", content: "```java\nThread t = new Thread(() -> System.out.println(\"worker\"));\nt.setPriority(Thread.MAX_PRIORITY);\nSystem.out.println(t.getPriority());\nt.start();\n```" },
          { title: "Common pitfalls", content: "Never depend on priority to guarantee which thread executes first or how much CPU time a thread receives." },
          { title: "Interview and exam focus", content: "The classic interview question is: “Can thread priority guarantee execution order?” The correct answer is no. Also distinguish priority from synchronization: priority affects scheduling preference, while synchronization establishes coordination and memory-visibility guarantees." },
          { title: "Practice task", content: "Run two competing workloads with different priorities several times. Instead of trying to prove that one always wins, document the variability and explain why the Java API does not promise a fixed result." },
        ],
      },
      {
        title: "1.5 Thread Synchronization",
        slug: "thread-synchronization",
        description: "Understand race conditions, synchronized methods and blocks, mutual exclusion, and safe access to shared state.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "Synchronization is needed when multiple threads access shared mutable state and at least one operation can conflict with another. A race condition occurs when the result depends on an uncontrolled interleaving of operations. `value++` is a useful example: reading the value, adding one, and writing the result is a compound operation, not one indivisible action.\n\nJava's `synchronized` construct provides mutual exclusion around a monitor and establishes the required memory-visibility relationship for synchronized access. A synchronized instance method locks the receiver; a synchronized static method locks the `Class` object. A synchronized block lets you choose the lock and keep the protected region smaller." },
          { title: "How it works", content: "Suppose two threads execute `value++` at the same time. Both can read 10 before either writes 11, causing one increment to be lost. Synchronizing the critical section forces one thread to complete the protected operation before the other enters it.\n\nSynchronization must be designed around the state being protected. Locking an unrelated object does not protect the state. Multiple locks also introduce deadlock risk if threads acquire them in inconsistent orders. For simple counters or specialized workloads, atomic classes or higher-level concurrency utilities may be a better fit." },
          { title: "Worked example", content: "```java\nclass Counter {\n    private int value;\n    public synchronized void increment() {\n        value++;\n    }\n    public synchronized int getValue() {\n        return value;\n    }\n}\n```" },
          { title: "Common pitfalls", content: "Avoid inconsistent locking strategies and lock-order cycles. Protect the same shared state with a consistent synchronization policy." },
          { title: "Interview and exam focus", content: "Be ready to explain race condition, atomicity, visibility, monitor, and deadlock separately. A strong interview answer does not say “synchronized makes everything thread-safe”; it explains exactly which state is protected and which compound operations are made indivisible." },
          { title: "Practice task", content: "Start many threads against an unsynchronized counter and compare the result with a synchronized implementation. Then identify where the critical section begins and ends and discuss whether an `AtomicInteger` would express the requirement more directly." },
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
          { title: "Concept and mental model", content: "The Collections Framework is an abstraction layer for common data structures and algorithms. The most important interfaces describe behavior: `List` models ordered elements, `Set` models uniqueness, `Queue` models elements waiting for processing, and `Map` models key-value associations. `Map` is deliberately separate from `Collection` because a mapping is not itself a collection of values in the same sense.\n\nThe implementation should be chosen from the required operations. If you need indexed access, an array-backed list is usually a natural fit. If you need fast membership checks, hashing may be appropriate. If you need sorted traversal or range navigation, a tree-based structure may be preferable." },
          { title: "How it works", content: "Interfaces such as `List` and `Set` let application code depend on behavior rather than a concrete storage mechanism. Implementations then provide different performance, ordering, memory, and concurrency characteristics.\n\nFor example, replacing `ArrayList` with `LinkedList` is not automatically an optimization; it changes the performance profile and may make some workloads worse. Likewise, `HashSet` and `TreeSet` both represent sets but define membership through different mechanisms and provide different ordering guarantees." },
          { title: "Worked example", content: "```java\nList<String> names = new ArrayList<>();\nnames.add(\"Amit\");\nnames.add(\"Riya\");\nSystem.out.println(names);\n```" },
          { title: "Common pitfalls", content: "Choosing a collection only because it is familiar can produce incorrect ordering or poor performance." },
          { title: "Interview and exam focus", content: "Interview questions often ask “Which collection should you choose?” The strongest answer starts with required operations and guarantees, then discusses complexity and trade-offs instead of naming a favorite class." },
          { title: "Practice task", content: "Take one problem—student records—and implement it once as a `List`, once as a `Set`, and once as a `Map`. Explain what each representation makes easy and what information or guarantees it changes." },
        ],
      },
      {
        title: "2.2 Collection Interface",
        slug: "collection-interface",
        description: "Learn the common operations provided by Collection and how List, Set, and Queue build on it.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`Collection<E>` is the common abstraction behind the main element-oriented collection types. It provides operations such as `add`, `remove`, `contains`, `size`, `isEmpty`, `clear`, and iteration. The interface describes a contract; it does not promise that every implementation has the same ordering, complexity, or concurrency behavior.\n\nSome collection operations are optional, so an implementation may reject mutation with `UnsupportedOperationException`. This is why “it implements Collection” does not mean every operation is guaranteed to be supported in every implementation." },
          { title: "How it works", content: "When a method accepts `Collection<String>` instead of `ArrayList<String>`, the method states only the behavior it actually needs. The caller can provide an `ArrayList`, `HashSet`, or another compatible collection.\n\nOperations such as `contains()` and `remove()` rely on equality semantics. That makes `equals()` part of collection correctness, while hash-based implementations additionally depend on the `hashCode()` contract." },
          { title: "Worked example", content: "```java\nCollection<String> c = new ArrayList<>();\nc.add(\"Java\");\nc.add(\"JDBC\");\nSystem.out.println(c.contains(\"Java\"));\n```" },
          { title: "Common pitfalls", content: "Do not assume all Collection implementations preserve order or permit duplicates." },
          { title: "Interview and exam focus", content: "Explain why programming to an interface improves flexibility, and distinguish `Collection` from `Collections` and `Map`. Also mention that interface-level guarantees do not erase implementation-specific complexity or ordering behavior." },
          { title: "Practice task", content: "Write a method that accepts `Collection<String>` and test it with an `ArrayList` and a `HashSet`. Then identify which assumptions the method is allowed to make and which it must not make." },
        ],
      },
      {
        title: "2.3 ArrayList",
        slug: "arraylist",
        description: "Use ArrayList for ordered, index-based, dynamically sized collections and understand its common operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`ArrayList` is a resizable-array implementation of `List`. It preserves insertion order, permits duplicates and `null`, and provides constant-time positional access in normal use. Its storage is array-based, so inserting or removing elements near the middle requires later elements to shift.\n\nThe distinction between size and capacity matters. Size is the number of stored elements; capacity is the amount of backing storage currently available before another resize may be required. Pre-sizing can reduce growth work when the approximate number of elements is known." },
          { title: "How it works", content: "An append normally places an element at the next free position. If the backing array has insufficient capacity, a larger array is allocated and elements are copied. Inserting at index zero shifts existing elements, which is why repeated front insertions are not its strength.\n\n`ArrayList` is unsynchronized. In a concurrent program, choose an explicit concurrency strategy rather than assuming the collection protects itself." },
          { title: "Worked example", content: "```java\nArrayList<String> list = new ArrayList<>();\nlist.add(\"A\");\nlist.add(\"B\");\nlist.add(1, \"X\");\nSystem.out.println(list); // [A, X, B]\n```" },
          { title: "Common pitfalls", content: "Repeated middle insertions can be costly. ArrayList is not automatically synchronized." },
          { title: "Interview and exam focus", content: "Know the normal complexity profile: indexed `get` is fast, appending is amortized efficient, and middle insertion/removal can be linear because of shifting. Also know why `ArrayList` is generally preferred over the legacy `Vector` for ordinary single-threaded list usage." },
          { title: "Practice task", content: "Create a list of 100,000 elements and compare the conceptual cost of reading by index with repeatedly inserting at the beginning. Explain the difference using the backing-array model." },
        ],
      },
      {
        title: "2.4 Vector",
        slug: "vector",
        description: "Understand Vector as a growable array collection, its synchronized methods, and how it differs from ArrayList.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`Vector` is a legacy growable-array implementation of `List`. Its methods are synchronized, which reflects its historical design, but method-level synchronization should not be mistaken for complete thread-safe workflows.\n\nFor example, a sequence such as `if (!vector.contains(x)) vector.add(x)` contains multiple operations. Another thread can change the vector between them. If the invariant spans multiple operations, the application still needs a coordination strategy." },
          { title: "How it works", content: "`Vector` grows its backing storage as elements are added and exposes the usual list operations. Synchronization around individual methods can protect each method call, but it does not automatically make an entire business operation atomic.\n\nModern code generally uses `ArrayList` for ordinary list workloads and selects a concurrent collection or explicit locking strategy when concurrency is the actual requirement." },
          { title: "Worked example", content: "```java\nVector<Integer> v = new Vector<>();\nv.add(10);\nv.add(20);\nSystem.out.println(v.get(0));\n```" },
          { title: "Common pitfalls", content: "Do not select Vector automatically just because it is synchronized. Concurrency requirements should be evaluated at the application level." },
          { title: "Interview and exam focus", content: "The useful interview comparison is not “Vector is synchronized, ArrayList is not.” Go one step further: explain why synchronized individual methods do not guarantee atomic compound actions and why legacy synchronization is not the same as a modern concurrency design." },
          { title: "Practice task", content: "Take a check-then-add operation and show why synchronizing only `contains()` and `add()` separately does not guarantee uniqueness. Then design a correct alternative." },
        ],
      },
      {
        title: "2.5 Generics",
        slug: "generics",
        description: "Use generic types to provide compile-time type safety, reusable collections, and cleaner APIs.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "Generics let a type or method express the kind of values it operates on at compile time. `List<String>` tells the compiler that the list's elements are strings, which prevents many invalid operations before the program runs and removes many explicit casts.\n\nGeneric types are invariant: a `List<String>` is not a `List<Object>`, even though `String` is an `Object`. Wildcards provide controlled flexibility. `? extends T` is useful when an API consumes a producer of T values, while `? super T` is useful when it consumes T values. This is the idea behind the practical PECS rule: Producer Extends, Consumer Super." },
          { title: "How it works", content: "Java implements generics primarily through type erasure. The compiler inserts the necessary casts and checks, while ordinary runtime objects generally do not retain their generic argument as directly inspectable type information. This explains restrictions such as not being able to write `new T()` in a generic class without another construction strategy.\n\nGenerics therefore provide strong compile-time modeling without turning every generic type argument into a distinct runtime class." },
          { title: "Worked example", content: "```java\nList<String> names = new ArrayList<>();\nnames.add(\"Amit\");\nString name = names.get(0);\n```" },
          { title: "Common pitfalls", content: "Raw types discard useful type checks. Do not assume List<String> can be assigned to List<Object>." },
          { title: "Interview and exam focus", content: "Be prepared for `List<Object>` versus `List<String>`, raw types, bounded wildcards, type erasure, and the difference between `? extends` and `? super`. A strong answer should use a concrete producer/consumer example rather than reciting PECS alone." },
          { title: "Practice task", content: "Implement `copy(List<? extends Number> source, List<? super Number> target)` and explain why the source can be read safely while the target can accept `Number` values." },
        ],
      },
      {
        title: "2.6 Iterator",
        slug: "iterator",
        description: "Traverse collections safely with Iterator and understand hasNext, next, and remove.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "An `Iterator` gives callers a standard way to traverse a collection without exposing the collection's internal storage. `hasNext()` asks whether another element exists, `next()` advances to it and returns it, and `remove()` can remove the last element returned when the iterator supports removal.\n\nThe iterator is a cursor-like abstraction, not a snapshot by default. Its behavior therefore depends on the collection and on whether the collection is modified while traversal is in progress." },
          { title: "How it works", content: "Many general-purpose collection iterators are fail-fast: if the collection is structurally modified outside the iterator during traversal, the iterator may throw `ConcurrentModificationException`. This is a best-effort bug detector, not a guarantee of thread safety.\n\nWhen removal is required during traversal, `Iterator.remove()` communicates the modification through the iterator itself. For concurrent collections, the iteration contract is different and must be read from that collection's documentation." },
          { title: "Worked example", content: "```java\nIterator<String> it = names.iterator();\nwhile (it.hasNext()) {\n    System.out.println(it.next());\n}\n```" },
          { title: "Common pitfalls", content: "Calling next() without another element causes an exception. Direct structural modification during iteration can invalidate traversal." },
          { title: "Interview and exam focus", content: "Know why `next()` can throw `NoSuchElementException`, why direct structural modification can invalidate a traversal, and why fail-fast behavior should never be used as a concurrency-control mechanism." },
          { title: "Practice task", content: "Traverse a list and remove every value matching a condition using `Iterator.remove()`. Then repeat with direct `list.remove()` inside the loop and explain the behavioral difference." },
        ],
      },
      {
        title: "2.7 Comparable",
        slug: "comparable",
        description: "Define a natural ordering for objects using Comparable and implement compareTo correctly.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`Comparable<T>` gives a class a natural ordering through `compareTo`. The method communicates whether the receiver should sort before, equal to, or after the argument; callers should rely on the sign of the result, not an exact value.\n\nA good natural ordering is stable and meaningful for the domain. It should normally be consistent with `equals`, especially because sorted collections use comparison to determine whether elements or keys are equivalent for their purposes." },
          { title: "How it works", content: "Sorting algorithms and sorted collections can call `compareTo` repeatedly to determine ordering. A result of zero is particularly important: `TreeSet` and `TreeMap` use ordering equivalence, so two objects that are not equal according to `equals` can still be treated as the same element/key if their comparison returns zero.\n\nUse `Comparator` when the type needs multiple legitimate orderings or when the natural ordering is not obvious." },
          { title: "Worked example", content: "```java\nclass Student implements Comparable<Student> {\n    int marks;\n    Student(int marks) { this.marks = marks; }\n    public int compareTo(Student other) {\n        return Integer.compare(this.marks, other.marks);\n    }\n}\n```" },
          { title: "Common pitfalls", content: "An inconsistent comparison rule can lead to surprising ordering or set behavior. Design the natural ordering deliberately." },
          { title: "Interview and exam focus", content: "Interviewers often ask Comparable versus Comparator and whether `compareTo() == 0` must mean `equals() == true`. The nuanced answer is that consistency is strongly recommended for sorted collections, even though Java's general Comparable contract does not require equality in every domain." },
          { title: "Practice task", content: "Define a `Student` natural ordering by ID, then create a separate `Comparator` by marks. Explain why one belongs to the type and the other belongs to a particular use case." },
        ],
      },
      {
        title: "2.8 TreeSet",
        slug: "treeset",
        description: "Store unique elements in sorted order with TreeSet and understand ordering and set operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`TreeSet` represents a sorted set. It guarantees uniqueness according to its ordering and provides navigational operations such as `first`, `last`, `higher`, `lower`, and range views.\n\nThe important mental model is that ordering is not merely for display. It is part of the set's membership behavior. If the comparator returns zero for two objects, the tree considers them equivalent for set purposes, even if their `equals()` methods say otherwise." },
          { title: "How it works", content: "`TreeSet` is tree-based, so common search, insertion, and removal operations are logarithmic in the number of elements. Traversal follows the comparator or natural ordering rather than insertion order.\n\nThis makes it a good choice when you need both uniqueness and sorted navigation. If you only need membership checks and do not need order, a hash-based set may be simpler and typically faster on average." },
          { title: "Worked example", content: "```java\nTreeSet<Integer> set = new TreeSet<>();\nset.add(30); set.add(10); set.add(20);\nSystem.out.println(set);\nSystem.out.println(set.first());\nSystem.out.println(set.higher(10));\n```" },
          { title: "Common pitfalls", content: "TreeSet does not preserve insertion order. The comparison rule must match the intended notion of uniqueness." },
          { title: "Interview and exam focus", content: "Explain TreeSet versus HashSet in terms of ordering, membership semantics, and complexity. A particularly valuable interview example is two distinct objects whose comparator returns zero." },
          { title: "Practice task", content: "Create a `TreeSet` with a comparator that considers students equal when their marks match. Add two students with different IDs but the same marks and explain why only one remains." },
        ],
      },
      {
        title: "2.9 HashSet",
        slug: "hashset",
        description: "Store unique elements without relying on insertion order and understand hashing-based membership operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`HashSet` represents uniqueness using hash-based lookup. It does not promise insertion order, and its performance depends on the quality and stability of the elements' `equals()` and `hashCode()` implementations.\n\nThe key invariant is: if two objects are equal according to `equals()`, they must have the same hash code. The reverse is not required; collisions are expected and are resolved by equality checks." },
          { title: "How it works", content: "A hash set uses an object's hash information to narrow the search area and then uses equality to determine whether an equivalent element is already present. If fields used by `equals()` and `hashCode()` are changed while the object is stored, the object can become difficult to locate because its logical bucket relationship has changed.\n\nThat is why immutable keys or stable equality-relevant state are especially valuable in hash-based collections." },
          { title: "Worked example", content: "```java\nSet<String> set = new HashSet<>();\nset.add(\"Java\");\nset.add(\"Java\");\nset.add(\"JDBC\");\nSystem.out.println(set.size()); // 2\n```" },
          { title: "Common pitfalls", content: "Do not rely on iteration order. Mutable equality-relevant state can make stored objects difficult to find or remove." },
          { title: "Interview and exam focus", content: "Be ready to explain the `equals()`/`hashCode()` contract, why iteration order must not be relied upon, and why mutating a key-like object while it is stored can cause surprising lookup failures." },
          { title: "Practice task", content: "Create a small mutable class whose equality depends on one field. Add an instance to a `HashSet`, change that field, and test `contains()` and `remove()`. Explain the result." },
        ],
      },
      {
        title: "2.10 HashMap",
        slug: "hashmap",
        description: "Store key-value pairs with HashMap and understand lookup, insertion, replacement, removal, and iteration.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "`HashMap` stores associations between keys and values. Keys are unique according to the map's equality and hashing rules, while multiple keys can map to equal values. It permits one `null` key and multiple `null` values.\n\nThe most important design rule is that a key's equality-relevant state should remain stable while the key is stored. Otherwise the map may no longer find the entry through the key even though the entry still exists internally." },
          { title: "How it works", content: "A lookup uses the key's hash information to narrow the candidate area and then equality to identify the matching key. Modern Java implementations can use tree structures for heavily collided buckets under appropriate conditions, but the API contract remains centered on hashing and equality rather than on a guaranteed internal layout.\n\n`HashMap` does not guarantee iteration order. If deterministic insertion order is required, choose an implementation that explicitly provides it rather than relying on observed behavior." },
          { title: "Worked example", content: "```java\nMap<Integer, String> students = new HashMap<>();\nstudents.put(101, \"Amit\");\nstudents.put(102, \"Riya\");\nSystem.out.println(students.get(101));\n```" },
          { title: "Common pitfalls", content: "Do not assume insertion or sorted order. Keys should have stable equality and hashing behavior while stored." },
          { title: "Interview and exam focus", content: "Explain `put()` replacement semantics, `containsKey()` versus `get()`, `HashMap` versus `Hashtable`, and why mutable keys are dangerous. Also know that `HashMap` itself is not a general-purpose concurrent map." },
          { title: "Practice task", content: "Build a frequency counter with `HashMap<String,Integer>`. Then replace the manual `get`/`put` logic with `merge` and explain why the latter better expresses the update operation." },
        ],
      },
      {
        title: "2.11 Hashtable",
        slug: "hashtable",
        description: "Understand Hashtable as a synchronized key-value collection and compare its characteristics with HashMap.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`Hashtable` is a legacy synchronized `Map` implementation. It rejects `null` keys and values and reflects an older Java collection design.\n\nIts synchronization applies to individual methods, not automatically to a multi-step business operation. That distinction matters because “every method is synchronized” does not mean a sequence of methods is atomic." },
          { title: "How it works", content: "A `Hashtable` operation coordinates access through the object's synchronization. This can serialize callers and impose synchronization overhead even when the application does not need the legacy behavior.\n\nModern applications normally use `HashMap` for ordinary non-concurrent maps and a purpose-built concurrent map when multiple threads need coordinated access. `Hashtable` remains important mainly for legacy code and interviews." },
          { title: "Worked example", content: "```java\nHashtable<Integer, String> table = new Hashtable<>();\ntable.put(1, \"Amit\");\ntable.put(2, \"Riya\");\nSystem.out.println(table.get(1));\n```" },
          { title: "Common pitfalls", content: "Do not treat Hashtable as the universal solution for concurrent maps. Choose the data structure according to the actual concurrency requirement." },
          { title: "Interview and exam focus", content: "Know the historical differences: synchronization, `null` handling, and the relationship to the older `Dictionary` API. The stronger answer also explains why `ConcurrentHashMap` is a different design rather than simply “a newer Hashtable.”" },
          { title: "Practice task", content: "Take a legacy Hashtable example and rewrite it with `HashMap`. List every behavior that changes, especially `null` handling and concurrency assumptions, before deciding whether the replacement is safe." },
        ],
      },
      {
        title: "2.12 TreeMap",
        slug: "treemap",
        description: "Store key-value pairs in sorted key order and use navigational operations provided by TreeMap.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`TreeMap` stores key-value mappings in sorted key order. Its value is greatest when callers need ordered traversal or navigation such as `firstKey`, `lastKey`, `higherKey`, `lowerKey`, and range views.\n\nAs with `TreeSet`, ordering is part of the key-equivalence model. If the comparator considers two distinct keys equal, the later mapping can replace the earlier mapping even if the keys are not equal according to `equals()`." },
          { title: "How it works", content: "A tree structure lets the map locate keys by repeatedly comparing the search key with nodes, producing logarithmic basic operations. Traversal naturally follows the comparator's ordering.\n\nUse `HashMap` when the primary requirement is key lookup without ordering. Use `TreeMap` when sorted keys or range navigation are actual requirements, because the ordering structure has a cost." },
          { title: "Worked example", content: "```java\nTreeMap<Integer, String> map = new TreeMap<>();\nmap.put(103, \"Priya\");\nmap.put(101, \"Amit\");\nmap.put(102, \"Rahul\");\nSystem.out.println(map);\n```" },
          { title: "Common pitfalls", content: "Do not expect insertion order. The key comparison rule must be compatible with the desired map semantics." },
          { title: "Interview and exam focus", content: "Compare HashMap and TreeMap by ordering, average/typical complexity, navigation, and key-equivalence semantics. A strong answer explains why a comparator that ignores part of a key can cause entries to replace each other." },
          { title: "Practice task", content: "Create a `TreeMap<Integer,String>` and demonstrate `floorKey`, `ceilingKey`, `higherKey`, and `lowerKey`. Then use a custom comparator and explain how it changes key ordering." },
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
          { title: "Concept and mental model", content: "JDBC is Java's standard API for working with relational databases. It gives application code a common programming model—connections, statements, prepared statements, result sets, transactions, and metadata—while a database-specific driver handles the protocol details.\n\nThe normal flow is deliberate: obtain a connection, prepare a statement, execute SQL, process the result, and release resources. In production, that flow is usually wrapped in a data-access layer and a connection pool rather than creating a new physical database connection for every request." },
          { title: "How it works", content: "The JDBC interfaces hide most driver-specific communication. A `Connection` represents a database session, a `PreparedStatement` represents parameterized SQL, and a `ResultSet` represents returned rows.\n\nResource lifetime matters because database connections and cursors are external resources. Try-with-resources is therefore more than style: it makes cleanup predictable when execution or result processing fails." },
          { title: "Worked example", content: "```java\nConnection con = DriverManager.getConnection(url, user, password);\nPreparedStatement ps = con.prepareStatement(\"SELECT id, name FROM student\");\nResultSet rs = ps.executeQuery();\n```" },
          { title: "Common pitfalls", content: "Do not leave connections open or place real credentials directly in source code. Separate data access from presentation in larger applications." },
          { title: "Interview and exam focus", content: "Be ready to describe the full JDBC flow and explain why `PreparedStatement` is preferred for user-supplied values. Also distinguish SQL execution from transaction management; executing two statements does not automatically make them one atomic business operation." },
          { title: "Practice task", content: "Implement a small repository method that reads students, closes every JDBC resource, and converts each row into a domain object. Test both a successful query and a failure during execution." },
        ],
      },
      {
        title: "3.2 JDBC Architecture",
        slug: "jdbc-architecture",
        description: "Trace communication between the Java application, JDBC API, driver manager, driver, and database.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JDBC separates application code from database-specific communication. The application uses standard JDBC interfaces; a driver implements the database-specific part of that contract. `DriverManager` can locate and use registered drivers, while `DataSource` is commonly preferred in managed applications.\n\nThis separation is valuable because the application can keep the same Java-side programming model even when the database vendor changes, although SQL dialect differences can still affect portability." },
          { title: "How it works", content: "A typical request travels from application code to a JDBC interface, through a driver, across the database protocol, and back as JDBC results. The driver is responsible for translating the API calls into the database's communication protocol.\n\nIn server applications, a `DataSource` backed by a connection pool often sits at the connection boundary. The pool reuses physical connections while presenting connection handles to application code." },
          { title: "Worked example", content: "```text\nApplication -> JDBC API -> DriverManager -> JDBC Driver -> Database\n                                      <- JDBC results <-\n```" },
          { title: "Common pitfalls", content: "Do not confuse the JDBC API with the driver. The API defines the programming contract; the driver performs database-specific communication." },
          { title: "Interview and exam focus", content: "Draw the architecture and identify which component owns each responsibility. A common trap is saying that JDBC itself “is the driver”; JDBC is the API contract, while the driver supplies database-specific implementation." },
          { title: "Practice task", content: "Trace one `PreparedStatement.executeQuery()` call from the Java method to the database and back to `ResultSet`. Write one responsibility for each layer." },
        ],
      },
      {
        title: "3.3 JDBC Drivers",
        slug: "jdbc-drivers",
        description: "Understand the four JDBC driver categories and the role of a driver in translating JDBC operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A JDBC driver is the implementation that lets Java communicate with a particular database. The historical classification uses four types: Type 1 bridge, Type 2 native-API, Type 3 middleware, and Type 4 direct Java/database-protocol drivers.\n\nFor modern development, the most relevant idea is that a database driver is normally supplied as a dependency and integrated with the JDBC infrastructure. The four-type classification is still useful for exams and for understanding why older deployment models had more portability and installation concerns." },
          { title: "How it works", content: "Type 1 translated JDBC through another database interface, Type 2 depended on native client libraries, Type 3 used a middleware server, and Type 4 communicates directly with the database protocol from Java. Type 4 became the common model because it simplifies deployment and avoids native client dependencies.\n\nThe driver does not change the Java application into a database-specific API; it implements the standard interfaces while handling vendor-specific communication underneath." },
          { title: "Worked example", content: "```text\nApplication -> JDBC API -> Type 4 Driver -> Database\n```" },
          { title: "Common pitfalls", content: "Do not confuse driver categories with JDBC interfaces. Older driver categories have historical deployment and portability limitations." },
          { title: "Interview and exam focus", content: "Know the four historical types and their communication paths. If asked which model is common today, explain the practical advantages of Type 4 rather than treating the classification as a list to memorize." },
          { title: "Practice task", content: "Create a comparison table for all four driver types with native dependencies, middleware, portability, and communication path. Then explain why Type 4 is usually the practical choice." },
        ],
      },
      {
        title: "3.4 Establishing Database Connection",
        slug: "establishing-database-connection",
        description: "Create and close database connections using DriverManager and Connection.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A JDBC `Connection` represents a database session from the application's point of view. It can carry transaction state, create statements, and expose metadata. Connection creation can be relatively expensive, which is why application servers commonly use connection pools.\n\n`DriverManager.getConnection()` is straightforward for small programs. In production, `DataSource` is often a better boundary because configuration and pooling can be managed separately from business logic." },
          { title: "How it works", content: "Connection acquisition can fail for several independent reasons: an invalid URL, unavailable database, authentication failure, network problem, or driver/configuration issue. Once acquired, the connection must be released even when SQL execution throws an exception.\n\nTry-with-resources expresses this ownership clearly. A pool may return a connection handle to the application, and closing that handle normally returns the underlying connection to the pool rather than destroying the physical connection." },
          { title: "Worked example", content: "```java\nConnection con = DriverManager.getConnection(\n    \"jdbc:mysql://localhost:3306/studentdb\",\n    \"root\",\n    \"password\");\ntry {\n    // database work\n} finally {\n    con.close();\n}\n```" },
          { title: "Common pitfalls", content: "Do not leak connections. Avoid embedding production credentials in source code." },
          { title: "Interview and exam focus", content: "Explain `DriverManager` versus `DataSource`, connection pooling, cleanup, and transaction boundaries. Never describe a JDBC connection as something that should remain open forever for convenience without a deliberate pooling/ownership strategy." },
          { title: "Practice task", content: "Write connection code using try-with-resources. Then list what should happen if authentication fails, if SQL fails after the connection is opened, and if closing the resource also reports an error." },
        ],
      },
      {
        title: "3.5 Executing SQL Query",
        slug: "executing-sql-query",
        description: "Execute SELECT and data-modification statements and understand executeQuery, executeUpdate, and execute.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JDBC exposes several execution methods because SQL statements can produce different kinds of results. `executeQuery()` is intended for statements returning a `ResultSet`, `executeUpdate()` returns an update count for data-modification and relevant DDL operations, and `execute()` handles cases where the first result may be either a result set or an update count.\n\nThe SQL itself is separate from how JDBC transports parameters and results. For dynamic values, parameterized statements should be used rather than concatenating user input into SQL." },
          { title: "How it works", content: "With `PreparedStatement`, placeholders are bound before execution. The database receives the SQL structure separately from the parameter values according to the driver's protocol.\n\n`executeUpdate()` returning zero is not necessarily an error; it can simply mean that no rows matched the update condition. Conversely, a nonzero count does not by itself prove that the business operation was correct. Application code still needs validation and transaction rules." },
          { title: "Worked example", content: "```java\nPreparedStatement ps = con.prepareStatement(\n    \"UPDATE student SET name=? WHERE id=?\");\nps.setString(1, \"Amit\");\nps.setInt(2, 101);\nint count = ps.executeUpdate();\n```" },
          { title: "Common pitfalls", content: "Use the execution method that matches the SQL operation. Parameterize user-controlled values instead of concatenating them into SQL." },
          { title: "Interview and exam focus", content: "Know the return types and intended use of `executeQuery`, `executeUpdate`, and `execute`. Also explain why SQL injection is a data-boundary problem rather than merely a string-formatting problem." },
          { title: "Practice task", content: "Implement one SELECT, one UPDATE, and one INSERT with `PreparedStatement`. For each, document the expected return type and what a zero affected-row count means." },
        ],
      },
      {
        title: "3.6 Processing Results (ResultSet)",
        slug: "processing-results-resultset",
        description: "Read rows returned by a SELECT statement using ResultSet and its getter methods.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A `ResultSet` exposes rows returned by a query through a cursor. The cursor begins before the first row, so `next()` must successfully advance it before column values are read.\n\nColumn getters such as `getInt`, `getString`, and `getDate` convert database values into Java representations. Columns can be addressed by index or label; labels are often easier to maintain when query projections change." },
          { title: "How it works", content: "The common loop is `while (rs.next())`. Each successful call positions the cursor on one row. When no row remains, `next()` returns false and the loop ends.\n\nThe result set is associated with the statement that produced it, and resource lifetime must be managed carefully. Closing the statement or connection can invalidate associated results depending on the JDBC driver's behavior and result-set configuration." },
          { title: "Worked example", content: "```java\nwhile (rs.next()) {\n    int id = rs.getInt(\"id\");\n    String name = rs.getString(\"name\");\n    System.out.println(id + \" \" + name);\n}\n```" },
          { title: "Common pitfalls", content: "Advance the cursor before reading a row and close the result and associated statement when finished." },
          { title: "Interview and exam focus", content: "Explain the initial cursor position, `next()`, typed getters, null handling, and why result-set resources must not outlive their owning database resources. Also know that a JDBC `ResultSet` is not simply a Java `List` already loaded into memory." },
          { title: "Practice task", content: "Map each row of a query into a `Student` object. Include a nullable database column and show how the code distinguishes SQL `NULL` from a legitimate Java default value." },
        ],
      },
      {
        title: "3.7 Metadata",
        slug: "jdbc-metadata",
        description: "Inspect database and result-set structure using DatabaseMetaData and ResultSetMetaData.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JDBC metadata describes the database, driver, capabilities, or structure of a particular query result. `DatabaseMetaData` answers questions about the database environment; `ResultSetMetaData` describes the columns exposed by a `ResultSet`.\n\nMetadata is therefore information about data and capabilities, not the row data itself. This distinction is useful when building tools, diagnostics, migration utilities, or generic result processors." },
          { title: "How it works", content: "`Connection.getMetaData()` returns `DatabaseMetaData`, while `ResultSet.getMetaData()` describes the columns in that result. The latter can report column count, labels, names, SQL types, precision, and other structural information.\n\nMetadata can vary by database and driver, so portable code should use documented capabilities rather than assuming every database reports every optional detail identically." },
          { title: "Worked example", content: "```java\nDatabaseMetaData db = con.getMetaData();\nSystem.out.println(db.getDatabaseProductName());\nResultSetMetaData rsmd = rs.getMetaData();\nSystem.out.println(rsmd.getColumnCount());\n```" },
          { title: "Common pitfalls", content: "Metadata describes structure and capabilities; it is not the actual row data." },
          { title: "Interview and exam focus", content: "Know the difference between `DatabaseMetaData` and `ResultSetMetaData`, and give a practical use for each. A good answer mentions driver/database capability differences rather than treating metadata as a perfectly uniform schema API." },
          { title: "Practice task", content: "Write a diagnostic utility that prints a query's column label, Java-facing type information, and SQL type. Test it with a query containing two different column types." },
        ],
      },
      {
        title: "3.8 PreparedStatement",
        slug: "preparedstatement",
        description: "Use parameterized SQL with PreparedStatement for safer, reusable database operations.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "`PreparedStatement` separates SQL structure from parameter values. A statement such as `SELECT ... WHERE id = ?` is prepared once and receives values through typed setter methods.\n\nThis is important for security because parameter values are not treated as pieces of SQL syntax. It also improves readability and can enable driver/database optimizations for repeated execution. Parameterization does not replace authorization or input validation; it solves a specific SQL-boundary problem." },
          { title: "How it works", content: "Parameter indexes start at one. A caller creates the prepared statement, binds each value with methods such as `setInt` or `setString`, and then executes it.\n\nThe same prepared statement can often be reused with different parameter values, which is especially useful for batch or repeated operations. Resource management still matters, and the application should choose an appropriate SQL type and transaction boundary." },
          { title: "Worked example", content: "```java\nPreparedStatement ps = con.prepareStatement(\n    \"SELECT * FROM student WHERE id = ?\");\nps.setInt(1, 101);\nResultSet rs = ps.executeQuery();\n```" },
          { title: "Common pitfalls", content: "Avoid string concatenation for user-controlled SQL values. Remember that JDBC parameter indexes start at 1." },
          { title: "Interview and exam focus", content: "Explain why `PreparedStatement` is safer than concatenating values into SQL, why indexes are one-based, and what `executeUpdate()` tells you. Avoid the oversimplification that prepared statements “encrypt” SQL or make every database operation safe by themselves." },
          { title: "Practice task", content: "Create a login-style lookup using `PreparedStatement` and test it with input containing quotes and SQL metacharacters. Explain why the input remains a value rather than becoming part of the SQL grammar." },
        ],
      },
      {
        title: "3.9 CallableStatement",
        slug: "callablestatement",
        description: "Execute stored procedures and work with IN, OUT, and INOUT parameters using CallableStatement.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`CallableStatement` is JDBC's API for invoking database stored procedures and functions. The Java code interacts with parameters while the database executes the stored routine.\n\nParameters can be `IN`, `OUT`, or `INOUT`. The distinction matters because an `OUT` parameter has no input value to bind, while an `INOUT` parameter carries an input value and can return a changed value. Stored procedures can be useful in systems that deliberately keep part of the business logic close to the database, but they can also reduce portability when heavily vendor-specific." },
          { title: "How it works", content: "A typical flow is `prepareCall`, bind input values, register output parameters, execute, and then read the outputs. Output parameter registration includes the expected JDBC SQL type so the driver knows how to retrieve the result.\n\nResult sets and update counts can also be returned by stored procedures, so real-world calls may need to process more than a single scalar output." },
          { title: "Worked example", content: "```java\nCallableStatement cs = con.prepareCall(\"{call InsertStudent(?, ?)}\");\ncs.setInt(1, 105);\ncs.setString(2, \"Riya\");\ncs.execute();\n```" },
          { title: "Common pitfalls", content: "Do not confuse CallableStatement with normal parameterized SQL. It targets stored procedure calls." },
          { title: "Interview and exam focus", content: "Explain CallableStatement versus PreparedStatement, and IN/OUT/INOUT parameters. A strong answer also discusses the portability and transaction implications of putting logic in stored procedures." },
          { title: "Practice task", content: "Design a stored procedure that accepts a student ID and returns both a status code and a generated message. Call it from Java and document the parameter lifecycle." },
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
          { title: "Concept and mental model", content: "A servlet is a server-side Java component managed by a servlet container. The container receives an HTTP request, selects the mapped servlet, creates request/response objects, invokes the appropriate handler, and sends the resulting response to the client.\n\nThe crucial concurrency fact is that a servlet instance can handle many requests over time, commonly with different threads. Request-specific data should therefore live in local variables or request-scoped structures, not in mutable servlet instance fields." },
          { title: "How it works", content: "The container owns servlet lifecycle and request dispatch. A servlet normally extends `HttpServlet` and implements methods such as `doGet` or `doPost`.\n\nA single servlet object can serve many requests, so code such as `private String currentUser;` is unsafe when that field represents one request's data. Two requests can overwrite the same field. Local variables, request attributes, sessions, or other appropriate scopes keep state associated with the correct request." },
          { title: "Worked example", content: "```java\n@WebServlet(\"/hello\")\npublic class HelloServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req,\n                         HttpServletResponse resp) throws IOException {\n        resp.setContentType(\"text/plain\");\n        resp.getWriter().println(\"Hello\");\n    }\n}\n```" },
          { title: "Common pitfalls", content: "Do not keep request-specific mutable data in shared servlet fields. Distinguish the servlet class from the container that manages it." },
          { title: "Interview and exam focus", content: "Explain servlet versus servlet container, request versus response, and why servlets must be written with concurrent request handling in mind. A common interview trap is assuming a new servlet object is created for every request." },
          { title: "Practice task", content: "Create a servlet that handles two simultaneous requests and deliberately demonstrate why request data belongs in local variables rather than instance fields." },
        ],
      },
      {
        title: "4.2 Deploying a Simple Servlet",
        slug: "deploying-a-simple-servlet",
        description: "Create, map, deploy, and access a simple servlet using annotation or deployment configuration.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Deployment connects a servlet class to an HTTP URL inside a servlet container. The application must contain the servlet code, required API/deployment metadata, and a mapping that tells the container which requests should reach which servlet.\n\nURL mapping can be declared with `@WebServlet` or deployment configuration. The important mental model is that the browser does not call the Java class directly; the container receives the HTTP request and performs the mapping." },
          { title: "How it works", content: "A request such as `/app/HelloServlet` reaches the container. The container uses the application's context and servlet mapping to select the servlet, creates or reuses the managed servlet instance, and invokes the appropriate lifecycle/request method.\n\nDeployment failures can occur even when the Java source compiles—for example, an incorrect mapping, missing dependency, incompatible container/API namespace, or packaging error." },
          { title: "Worked example", content: "```java\n@WebServlet(\"/HelloServlet\")\npublic class HelloServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req,\n                         HttpServletResponse resp) throws IOException {\n        resp.getWriter().println(\"Hello, Welcome to Servlet\");\n    }\n}\n```" },
          { title: "Common pitfalls", content: "Correct Java code is not enough if the class is not deployed or mapped correctly. Keep container and API configuration consistent." },
          { title: "Interview and exam focus", content: "Know the difference between compilation and deployment. A strong answer explains context path, servlet mapping, container responsibility, and why `@WebServlet` is different from a browser URL by itself." },
          { title: "Practice task", content: "Deploy one servlet with annotation-based mapping. Then intentionally change the URL mapping and document the difference between a compile-time success and a deployment/request-time failure." },
        ],
      },
      {
        title: "4.3 Servlet Life Cycle",
        slug: "servlet-life-cycle",
        description: "Understand loading, initialization, request processing, and destruction managed by the servlet container.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "The servlet lifecycle is controlled by the container rather than by application code calling `new` for every request. The major lifecycle stages are loading/instantiation, initialization through `init`, request handling through service methods, and destruction through `destroy`.\n\nInitialization is intended for setup that belongs to the servlet instance. Request handling is repeated and must be safe under concurrent use. Destruction is the place to release servlet-owned resources that the application explicitly owns." },
          { title: "How it works", content: "For an HTTP servlet, the container receives a request and routes it through `service`, which dispatches to methods such as `doGet` or `doPost`. `init` runs as part of lifecycle initialization, normally once for a servlet instance, while `destroy` is called when the container removes the instance.\n\nDo not use `init` as a substitute for per-request work or `destroy` as a guarantee that an external system will always observe graceful shutdown; deployment environments can terminate processes abruptly." },
          { title: "Worked example", content: "```java\npublic void init() { /* one-time setup */ }\nprotected void doGet(HttpServletRequest req,\n                     HttpServletResponse resp) { /* request */ }\npublic void destroy() { /* cleanup */ }\n```" },
          { title: "Common pitfalls", content: "Do not assume init() runs once per request. Avoid shared mutable request state in instance fields." },
          { title: "Interview and exam focus", content: "Explain `init()`, `service()`, `doGet()/doPost()`, and `destroy()` in order. The common trap is claiming `service()` is called only once or that a new servlet instance is necessarily created for every request." },
          { title: "Practice task", content: "Add logging to each lifecycle method and send several requests. Record which methods execute once and which execute repeatedly, then explain why." },
        ],
      },
      {
        title: "4.4 GET Request",
        slug: "get-request",
        description: "Handle HTTP GET requests with doGet and retrieve request parameters.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "HTTP GET is normally used to retrieve a representation or perform a safe read-like operation. Parameters are commonly placed in the URL query string, which makes them visible in browser history, logs, bookmarks, and monitoring systems.\n\nA GET request should generally be safe and idempotent from the application's design perspective: repeating it should not create an additional business side effect. This is a protocol-level design concern, not a Java-specific rule." },
          { title: "How it works", content: "A servlet receives GET requests through `doGet`. Query parameters can be read from the request, validated, used to perform a read operation, and written to the response.\n\nBecause the URL can be cached or logged, sensitive secrets should not be placed in query parameters simply because the servlet can read them there. Authentication and authorization still apply to GET endpoints." },
          { title: "Worked example", content: "```java\nprotected void doGet(HttpServletRequest request,\n                     HttpServletResponse response) throws IOException {\n    String name = request.getParameter(\"name\");\n    response.getWriter().println(\"Hello \" + name);\n}\n```" },
          { title: "Common pitfalls", content: "GET data can appear in URLs and should not be treated as private. Validate every incoming value." },
          { title: "Interview and exam focus", content: "Compare GET and POST by semantics, visibility of parameters, caching/bookmarking, and appropriate use cases. Avoid the simplistic claim that GET is “secure” because it does not modify the database." },
          { title: "Practice task", content: "Create a GET endpoint that accepts a student ID and returns a student record. Test a valid ID, a missing parameter, and a non-numeric ID and define the expected HTTP responses." },
        ],
      },
      {
        title: "4.5 POST Request",
        slug: "post-request",
        description: "Handle HTTP POST requests with doPost and process submitted request data.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "HTTP POST is commonly used when the request carries data that the server should process, such as creating a resource or submitting a form. Unlike GET, POST request data is normally carried in the request body rather than the URL query string.\n\nPOST does not automatically mean “secure” or “non-cacheable” in every situation. Transport security comes from HTTPS, and application semantics determine whether a POST is safe, repeatable, or idempotent." },
          { title: "How it works", content: "A servlet handles POST through `doPost`. Form fields can be read from the request, validated, processed, and followed by a response or redirect.\n\nFor a successful form submission that creates a resource, the Post/Redirect/Get pattern can prevent accidental duplicate submissions when users refresh the result page. Server-side validation remains mandatory even if the browser performs client-side validation." },
          { title: "Worked example", content: "```java\nprotected void doPost(HttpServletRequest request,\n                      HttpServletResponse response) throws IOException {\n    String email = request.getParameter(\"email\");\n    response.getWriter().println(\"Received: \" + email);\n}\n```" },
          { title: "Common pitfalls", content: "POST does not automatically make data secure. Use appropriate transport security and validate server-side." },
          { title: "Interview and exam focus", content: "Know why POST is suitable for form submission, how request bodies differ from query parameters, and why POST itself does not prevent SQL injection, CSRF, or other application vulnerabilities." },
          { title: "Practice task", content: "Build a registration POST endpoint with required-field validation. Test missing data, malformed data, and a valid submission, then decide when the response should be an error versus a redirect." },
        ],
      },
      {
        title: "4.6 Request Object",
        slug: "request-object",
        description: "Use HttpServletRequest to inspect parameters, headers, attributes, method information, and request data.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "`HttpServletRequest` represents information supplied by the client and the servlet container about one HTTP request. It exposes parameters, headers, cookies, attributes, method, URI, session access, and other request metadata.\n\nTreat request data as untrusted input. A request parameter is not a typed business object simply because Java returns it as a `String`. Parsing, validation, authorization, and size/format constraints belong at appropriate application boundaries." },
          { title: "How it works", content: "Parameters come from the client's submitted data, headers describe the HTTP request, and attributes are server-side objects associated with the request during processing. Request attributes are different from parameters: a parameter originates from the client, while an attribute is placed into the request by server-side code or another component.\n\nThis distinction becomes important during servlet forwarding and chaining, where one component can place a server-side object into the request for another component to consume." },
          { title: "Worked example", content: "```java\nString method = request.getMethod();\nString userAgent = request.getHeader(\"User-Agent\");\nString name = request.getParameter(\"name\");\n```" },
          { title: "Common pitfalls", content: "Request data is untrusted input. Validate it before using it in application logic or database operations." },
          { title: "Interview and exam focus", content: "Be ready to distinguish `getParameter`, `getAttribute`, headers, cookies, and sessions. A frequent trap is treating `getAttribute(\"x\")` as if it retrieves an HTML form field; it does not." },
          { title: "Practice task", content: "Create a servlet that reads one request parameter, adds a server-side request attribute, and forwards to another servlet. Log both values and explain where each originated." },
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
          { title: "Concept and mental model", content: "HTML form data becomes servlet request parameters when the browser submits the form. The `name` attribute of an input is the key the server receives; the visible label or element ID does not automatically become the parameter name.\n\nThe server must treat every field as untrusted text until it has been parsed and validated. Required fields, length limits, numeric ranges, allowed values, and cross-field rules should be enforced server-side even when the browser has validation attributes." },
          { title: "How it works", content: "`request.getParameter(\"email\")` returns the submitted value as a string, or `null` when the parameter is absent. Multiple values for the same field can be accessed with `getParameterValues`.\n\nEncoding matters: the browser, request content type, and server must agree on how form data is represented. Validation should happen before the value reaches SQL, business logic, or output rendering." },
          { title: "Worked example", content: "```html\n<form action=\"FormDataServlet\" method=\"post\">\n  <input type=\"text\" name=\"name\">\n  <input type=\"email\" name=\"email\">\n  <input type=\"submit\" value=\"Submit\">\n</form>\n```" },
          { title: "Common pitfalls", content: "A field without a name is not available through normal named parameter lookup. Client-side validation is not a substitute for server-side validation." },
          { title: "Interview and exam focus", content: "Explain `name` versus `id`, `getParameter` versus `getParameterValues`, missing parameters, and server-side validation. Do not claim that HTML `required` or JavaScript validation is a security boundary." },
          { title: "Practice task", content: "Create a form containing text, number, checkbox, and multi-select fields. Submit valid and invalid combinations and document exactly what `getParameter` and `getParameterValues` return." },
        ],
      },
      {
        title: "5.2 Using JDBC in Servlet",
        slug: "using-jdbc-in-servlet",
        description: "Connect servlet request processing to relational database operations using JDBC.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Combining JDBC with a servlet creates a complete request-to-database path: HTTP input arrives at the servlet, the servlet validates it, a data-access operation executes SQL, and the result becomes an HTTP response.\n\nThe important design lesson is separation of responsibilities. The servlet should coordinate the request, not become a large class containing SQL, connection management, validation, HTML generation, and business rules all mixed together." },
          { title: "How it works", content: "A safe flow is request -> validation -> service/data-access method -> `PreparedStatement` -> result mapping -> response. Connections and statements should be managed with try-with-resources or an application-managed data-access abstraction.\n\nIn a production server, connections should normally come from a pool. Holding a database connection while performing unrelated response work increases resource pressure and can reduce throughput under load." },
          { title: "Worked example", content: "```java\nString name = request.getParameter(\"name\");\nPreparedStatement ps = con.prepareStatement(\n    \"INSERT INTO student(name) VALUES(?)\");\nps.setString(1, name);\nint rows = ps.executeUpdate();\n```" },
          { title: "Common pitfalls", content: "Do not place large amounts of database logic directly in servlet methods in larger applications. Always clean up database resources." },
          { title: "Interview and exam focus", content: "Explain why JDBC code should not be mixed indiscriminately into servlet presentation logic. Interviewers may also ask where connection pooling, transactions, validation, and exception translation belong." },
          { title: "Practice task", content: "Build a servlet that accepts a student ID, queries the database with `PreparedStatement`, maps the row to a Java object, and returns a response. Test missing ID, invalid ID, no row, and successful lookup." },
        ],
      },
      {
        title: "5.3 Servlet Chaining",
        slug: "servlet-chaining",
        description: "Pass processing from one servlet or resource to another using RequestDispatcher forward and include.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "Servlet chaining means passing request processing from one server-side component to another, commonly with `RequestDispatcher.forward()` or `include()`. Forwarding transfers responsibility for the response to another resource, while including inserts another resource's output into the current response.\n\nThe request object can carry server-side attributes across the chain. This makes chaining useful for separating controller logic from rendering, but it also requires a clear ownership model so components do not overwrite each other's state unexpectedly." },
          { title: "How it works", content: "With `forward`, the browser normally does not make a second HTTP request; the container dispatches internally. Because the response has not been committed, the target resource can generate the final response.\n\nWith `include`, the current response continues and the included resource contributes content. Request attributes are a convenient way to pass server-side data between components during either dispatch pattern." },
          { title: "Worked example", content: "```java\nRequestDispatcher rd = request.getRequestDispatcher(\"SecondServlet\");\nrd.forward(request, response);\n```" },
          { title: "Common pitfalls", content: "Understand forward versus include and avoid creating chains so complex that request flow becomes difficult to trace." },
          { title: "Interview and exam focus", content: "Know forward versus include and the difference between an internal dispatch and a browser redirect. A common trap is saying `forward()` changes the browser's URL; a redirect does that, while forwarding normally does not." },
          { title: "Practice task", content: "Create a controller servlet that validates a request and forwards a Java object through a request attribute to a rendering servlet. Then replace the forward with a redirect and explain the behavioral differences." },
        ],
      },
      {
        title: "5.4 Cookies",
        slug: "cookies",
        description: "Use HTTP cookies to store small pieces of client-associated state and understand common cookie operations.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A cookie is small client-associated state that a server asks the browser to store and return on later requests to the applicable scope. Cookies are useful for preferences, identifiers, and session mechanisms, but the client controls whether and how they are returned.\n\nA cookie is not inherently secret. Sensitive values should not be stored directly in client-visible cookies unless the design explicitly protects them. Security attributes such as `Secure`, `HttpOnly`, and an appropriate `SameSite` policy reduce specific risks but do not replace authentication or authorization design." },
          { title: "How it works", content: "The server sends a cookie through a `Set-Cookie` response header. The browser later includes matching cookies in the `Cookie` request header. Attributes such as path, domain, expiration/max-age, and security flags influence when and how the browser sends the cookie.\n\nCookies are therefore part of the HTTP protocol boundary, not a server-side variable. Their size and scope are limited, and users or privacy tools may delete or restrict them." },
          { title: "Worked example", content: "```java\nCookie c = new Cookie(\"username\", \"Amit\");\nresponse.addCookie(c);\nCookie[] cookies = request.getCookies();\n```" },
          { title: "Common pitfalls", content: "Do not put sensitive information into cookies without appropriate protection. Configure lifetime and security properties deliberately." },
          { title: "Interview and exam focus", content: "Explain session cookies versus persistent cookies, `HttpOnly`, `Secure`, `SameSite`, and why a cookie should not be treated as trusted input. Also distinguish storing an identifier in a cookie from storing the actual server-side session state there." },
          { title: "Practice task", content: "Create a preference cookie and a session-identifier example. Inspect the request/response headers and identify which data is client-visible and which state remains on the server." },
        ],
      },
      {
        title: "5.5 Session Management",
        slug: "session-management",
        description: "Maintain user-specific state across requests using HttpSession and session attributes.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "HTTP is stateless: one request does not automatically remember what happened in the previous request. Session management adds a way to associate multiple requests with one logical client interaction.\n\nA common servlet approach uses an opaque session identifier, often carried in a cookie, while the actual session attributes remain server-side. The identifier should not itself be treated as proof that a user is authorized for every action; authorization still depends on the authenticated server-side state and application rules." },
          { title: "How it works", content: "`request.getSession()` obtains or creates a session, while `getSession(false)` can retrieve an existing session without creating one. Attributes stored in the session are available across requests associated with that session.\n\nSession lifetime, timeout, invalidation, concurrent requests, and authentication changes all matter. After authentication, applications should use a session-management strategy that prevents session fixation and should invalidate sessions on logout when appropriate." },
          { title: "Worked example", content: "```java\nHttpSession session = request.getSession();\nsession.setAttribute(\"username\", \"Amit\");\nString user = (String) session.getAttribute(\"username\");\n```" },
          { title: "Common pitfalls", content: "Avoid storing unbounded data in session state. Session state should not be confused with authorization policy." },
          { title: "Interview and exam focus", content: "Explain session versus cookie, `getSession()` versus `getSession(false)`, timeout, invalidation, and why session state is not automatically thread-confined to one request. A strong answer also mentions session fixation as a security concern." },
          { title: "Practice task", content: "Implement login/logout using session state. Test an unauthenticated request, successful login, access to a protected page, logout, and an expired/invalid session." },
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
          { title: "Concept and mental model", content: "JSP is a server-side view technology that lets a web application generate dynamic responses from a template-like page. Conceptually, a JSP is translated into a servlet by the container and then follows the servlet execution model.\n\nThis means JSP does not create a second runtime model separate from servlets. The important architectural question is what belongs in the view and what belongs in controllers/services/data-access components. Modern applications should avoid placing substantial business logic or database code directly inside JSP pages." },
          { title: "How it works", content: "The container translates JSP source into servlet-oriented code, compiles it when necessary, and executes that generated servlet to produce a response. JSP lifecycle behavior therefore depends on the container's JSP engine.\n\nExpression Language and tag libraries are generally preferable to large scriptlet blocks because they keep presentation concerns separate from Java control flow." },
          { title: "Worked example", content: "```jsp\n<html>\n<body>\nCurrent user: <%= \"Amit\" %>\n</body>\n</html>\n```" },
          { title: "Common pitfalls", content: "Keep substantial business and database logic out of presentation pages. Treat JSP primarily as a presentation technology in the architecture described by the material." },
          { title: "Interview and exam focus", content: "Explain JSP versus servlet, translation into servlet form, and why JSP is best treated as a presentation technology. A common interview trap is saying JSP executes directly as HTML in the browser; it does not." },
          { title: "Practice task", content: "Create a JSP that receives a request attribute containing a student object and renders only presentation fields. Keep database access out of the JSP and explain the separation." },
        ],
      },
      {
        title: "6.2 JSP Scripting Elements",
        slug: "jsp-scripting-elements",
        description: "Use JSP expression, scriptlet, and declaration elements and understand how they map into generated servlet code.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JSP historically provides declarations, scriptlets, and expressions for embedding Java-related code in a page. A declaration defines class-level members, a scriptlet inserts statements into the generated servlet's service processing, and an expression evaluates a value for output.\n\nThese features are important for understanding legacy JSP code, but large scriptlet blocks make presentation code difficult to test, review, and maintain. Expression Language and tag libraries are generally clearer for modern view logic." },
          { title: "How it works", content: "The container translates scripting elements into parts of the generated servlet. A declaration can become a field or method-level construct, while scriptlets become executable servlet code and expressions become output operations.\n\nBecause the generated servlet can handle concurrent requests, class-level state introduced through declarations can create the same shared-state problems as servlet instance fields. Presentation code should therefore avoid mutable shared state." },
          { title: "Worked example", content: "```jsp\n<%! int square(int n) { return n * n; } %>\nSquare of 5 = <%= square(5) %>\n```" },
          { title: "Common pitfalls", content: "Large amounts of scriptlet code make presentation difficult to maintain. Understand where each element is placed in generated servlet code." },
          { title: "Interview and exam focus", content: "Know the difference among `<%! ... %>`, `<% ... %>`, and `<%= ... %>`, but also be ready to explain why modern JSP development generally favors EL and JSTL over scriptlets." },
          { title: "Practice task", content: "Take a small JSP containing a scriptlet loop and refactor it so the controller prepares the data and the JSP only renders it. Explain which responsibility moved where." },
        ],
      },
      {
        title: "6.3 JSP Directives",
        slug: "jsp-directives",
        description: "Configure JSP translation with page, include, and taglib directives.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JSP directives provide translation-time instructions to the JSP engine. The main directives are `page`, `include`, and `taglib`. They influence how the JSP is translated, what libraries are available, and how the generated servlet is configured.\n\nThis is different from an ordinary request-time expression: a directive changes how the page is processed rather than simply printing a value." },
          { title: "How it works", content: "The `page` directive can configure items such as content type, imports, and error-page behavior. The `include` directive performs a translation-time inclusion of another resource, while `<jsp:include>` is a request-time action. `taglib` makes a tag library available to the page.\n\nUnderstanding translation-time versus request-time inclusion is particularly useful when debugging changes and understanding generated JSP behavior." },
          { title: "Worked example", content: "```jsp\n<%@ page import=\"java.util.Date\" %>\n<%@ include file=\"header.jsp\" %>\n<%@ taglib uri=\"http://java.sun.com/jsp/jstl/core\" prefix=\"c\" %>\n```" },
          { title: "Common pitfalls", content: "Do not confuse the include directive with request-time forwarding. Directives configure translation rather than directly generating normal response output." },
          { title: "Interview and exam focus", content: "Interviewers often ask directive versus action. The clearest answer compares `<%@ include %>` with `<jsp:include>` and explains when the included content is processed." },
          { title: "Practice task", content: "Create one page using a translation-time include and another using a request-time include. Change the included resource and observe when each version reflects the change." },
        ],
      },
      {
        title: "6.4 Sessions in JSP",
        slug: "sessions-in-jsp",
        description: "Maintain user-specific information across multiple JSP requests with the session implicit object.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "A JSP can access the HTTP session because the JSP environment exposes standard implicit objects, including `session` when session tracking is enabled. The session lets related requests share server-side state.\n\nThe same session rules still apply: session data belongs to a logical client interaction, is not automatically immutable, and may be accessed by concurrent requests from the same client. JSP should read session state for presentation rather than become the place where authentication or business rules are implemented." },
          { title: "How it works", content: "A value can be stored with `session.setAttribute()` and retrieved later with `session.getAttribute()`. Session creation and lookup behavior should be deliberate, especially on pages where creating a new session is unnecessary.\n\nSession expiration or invalidation means code must tolerate missing attributes. Treating every session value as guaranteed to exist leads to brittle views." },
          { title: "Worked example", content: "```jsp\n<%\nsession.setAttribute(\"username\", \"Amit\");\nString user = (String) session.getAttribute(\"username\");\n%>\nWelcome <%= user %>\n```" },
          { title: "Common pitfalls", content: "Do not store sensitive or unbounded data casually in session state. Manage session lifetime deliberately." },
          { title: "Interview and exam focus", content: "Explain JSP session versus request scope, how session attributes survive across requests, and why logout or timeout can make an expected attribute disappear." },
          { title: "Practice task", content: "Create a JSP that displays a logged-in user's name from session scope and handles the missing-session case gracefully. Then invalidate the session and verify the view behavior." },
        ],
      },
      {
        title: "6.5 Using JDBC in JSP",
        slug: "using-jdbc-in-jsp",
        description: "Understand database access from JSP and the recommended separation between presentation and database logic.",
        estimatedMinutes: 22,
        sections: [
          { title: "Concept and mental model", content: "JDBC can technically be called from JSP, but mixing database access with presentation creates tight coupling and makes resource handling harder to reason about. The better architecture is for a controller/service/data-access layer to retrieve data and pass a prepared result to the JSP.\n\nThis topic is valuable partly because it shows what not to do. A page that opens a connection, executes SQL, loops through a result set, and emits HTML in the same file combines transport, persistence, business logic, and presentation." },
          { title: "How it works", content: "If legacy code does use JDBC in a JSP, it still needs `PreparedStatement`, proper resource cleanup, error handling, and a clear transaction strategy. But the cleaner flow is request -> controller/service -> repository -> domain data -> JSP view.\n\nKeeping JDBC outside the JSP also makes the same data-access logic reusable from other entry points such as APIs, background jobs, or tests." },
          { title: "Worked example", content: "```jsp\n<%@ page import=\"java.sql.*\" %>\n<% \nPreparedStatement ps = con.prepareStatement(\"SELECT * FROM student\");\nResultSet rs = ps.executeQuery();\nwhile (rs.next()) {\n    out.println(rs.getString(\"name\"));\n}\n%>\n```" },
          { title: "Common pitfalls", content: "Embedding credentials and large database operations in view code makes testing and maintenance harder. Close resources reliably." },
          { title: "Interview and exam focus", content: "Explain why JDBC-in-JSP is discouraged and what responsibilities should move to a DAO/repository or service. Interviewers often want architectural reasoning rather than merely a syntactically correct JDBC snippet." },
          { title: "Practice task", content: "Refactor a JSP containing JDBC code into a servlet/controller plus repository method. Compare the before-and-after responsibilities and identify which layer now owns connections and SQL." },
        ],
      },
      {
        title: "6.6 JavaBeans in JSP",
        slug: "javabeans-in-jsp",
        description: "Use reusable JavaBean components with JSP action tags for cleaner presentation and reusable data handling.",
        estimatedMinutes: 30,
        sections: [
          { title: "Concept and mental model", content: "A JavaBean is a Java class following conventions that make it easy for tools and frameworks to create and access its properties. Traditional bean conventions include a public no-argument constructor, private properties, and public getters/setters.\n\nIn JSP, beans can be exposed and accessed through standard mechanisms, but the important architectural idea is that the bean represents data or reusable component state; it should not become a hidden place for database access or request-specific global state." },
          { title: "How it works", content: "JSP bean actions can create or locate a bean and expose it under a scoped name. Property access can then read or write values through the bean's accessor methods.\n\nThe scope determines lifetime: page, request, session, or application. Choosing a wider scope increases sharing and lifetime, so mutable beans in session or application scope require careful concurrency and lifecycle design." },
          { title: "Worked example", content: "```java\npublic class Student implements Serializable {\n    private String name;\n    public Student() {}\n    public void setName(String name) { this.name = name; }\n    public String getName() { return name; }\n}\n```\n```jsp\n<jsp:useBean id=\"student\" class=\"Student\" />\n<jsp:setProperty name=\"student\" property=\"name\" value=\"Amit\" />\n<jsp:getProperty name=\"student\" property=\"name\" />\n```" },
          { title: "Common pitfalls", content: "Do not put complex business workflows into simple property-holder beans. Understand JavaBean conventions separately from general Java object design." },
          { title: "Interview and exam focus", content: "Know JavaBean conventions, JSP bean scope, and the difference between a bean as a data/component object and a framework entity such as an EJB. Also explain why application-scope mutable beans can create shared-state problems." },
          { title: "Practice task", content: "Create a `StudentBean` with name and marks properties, expose it in request scope, and render it from JSP. Then move it to session scope and explain what additional concurrency/lifetime considerations appear." },
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
