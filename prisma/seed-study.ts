// Deep Learn content seed for EXISTING study categories/topics.
// IMPORTANT:
// - Does NOT create or delete StudyCategory records.
// - Does NOT create duplicate categories such as "JavaScript Fundamentals".
// - Enriches existing topics when their title/slug is recognized.
// - Preserves existing sections, examples and exercises.
// - Safe to re-run: deterministic section IDs are upserted.
//
// Run:
//   npx tsx prisma/studyseed_deep.ts
//
// The curriculum is intentionally topic-specific. Generic fallback sections
// are used only for existing topics that are not yet mapped below.

import { Difficulty, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SectionSeed = {
  key: string;
  title: string;
  content: string;
};

const section = (key: string, title: string, content: string): SectionSeed => ({
  key,
  title,
  content,
});

type ExampleSeed = {
  key: string;
  language: string;
  code: string;
  explanation: string;
};

const example = (key: string, language: string, code: string, explanation: string): ExampleSeed => ({
  key,
  language,
  code,
  explanation,
});

type ExerciseSeed = {
  key: string;
  question: string;
  difficulty: Difficulty;
  hint: string;
  solution: string;
  explanation: string;
};

const exercise = (
  key: string,
  question: string,
  difficulty: Difficulty,
  hint: string,
  solution: string,
  explanation: string,
): ExerciseSeed => ({ key, question, difficulty, hint, solution, explanation });

// Keyed by the same CURRICULUM topic key. Only hashmap is populated for now —
// see the end-of-run report for what's still pending for other topics.
const EXAMPLES: Record<string, ExampleSeed[]> = {
  hashmap: [
    example(
      "basic-usage",
      "java",
      'Map<String, Integer> stock = new HashMap<>();\nstock.put("apple", 50);\nstock.put("banana", 30);\nstock.put("apple", 65); // same key -> replaces the value, does not add a second entry\n\nSystem.out.println(stock.get("apple"));      // 65\nSystem.out.println(stock.get("cherry"));     // null (key not present)\nSystem.out.println(stock.containsKey("banana")); // true\nSystem.out.println(stock.size());            // 2',
      "put() with an already-used key overwrites the value rather than creating a duplicate entry — this is the most basic behavior to be able to predict correctly. get() on a missing key returns null, not an exception, so calling code should check for null or use getOrDefault().",
    ),
    example(
      "poor-hashcode-pitfall",
      "java",
      'class BadKey {\n  final String value;\n  BadKey(String value) { this.value = value; }\n\n  @Override\n  public boolean equals(Object other) {\n    return other instanceof BadKey && ((BadKey) other).value.equals(this.value);\n  }\n  // equals() overridden, but hashCode() was NOT overridden.\n}\n\nMap<BadKey, String> map = new HashMap<>();\nmap.put(new BadKey("a"), "first");\nSystem.out.println(map.get(new BadKey("a"))); // null, even though the values are "equal"!',
      "This compiles fine and looks reasonable, but silently fails: the two BadKey instances are equals() to each other, yet they get Object's default hashCode() (based on identity), so they land in different buckets and the map never even calls equals() to compare them. Whenever you override equals(), you must override hashCode() too — this is the single most common real-world HashMap bug.",
    ),
    example(
      "iterating-entries",
      "java",
      'Map<String, Integer> prices = new HashMap<>();\nprices.put("pen", 10);\nprices.put("book", 250);\n\nfor (Map.Entry<String, Integer> entry : prices.entrySet()) {\n  System.out.println(entry.getKey() + " -> " + entry.getValue());\n}\n// Output order is NOT guaranteed to match insertion order.',
      "entrySet() is the idiomatic way to iterate both keys and values together without a separate get() call per key. The comment matters as much as the code: never write logic that depends on HashMap's iteration order, since it's explicitly unspecified and can change between JVM versions or even between resizes of the same map.",
    ),
  ],
};

const EXERCISES: Record<string, ExerciseSeed[]> = {
  hashmap: [
    exercise(
      "predict-output",
      'What does this print?\n\nMap<Integer, String> map = new HashMap<>();\nmap.put(1, "one");\nmap.put(2, "two");\nmap.put(1, "ONE");\nSystem.out.println(map.size());\nSystem.out.println(map.get(1));',
      Difficulty.EASY,
      "Think about what happens when put() is called twice with the same key.",
      "2\nONE",
      "put(1, \"ONE\") does not add a third entry — key 1 already exists, so its value is simply replaced. size() stays 2 (keys 1 and 2), and get(1) returns the most recently set value.",
    ),
    exercise(
      "fix-the-bug",
      "A team stores custom Point objects (with x and y fields) as HashMap keys. They override equals() to compare x and y, but forget to override hashCode(). Users report that map.get(new Point(3, 4)) returns null even right after map.put(new Point(3, 4), \"treasure\") on what looks like the same coordinates. Why, and how do you fix it?",
      Difficulty.MEDIUM,
      "equals() and hashCode() have a contract — what happens if only one of them is overridden?",
      "Override hashCode() to be derived from the same fields used in equals() (e.g. return Objects.hash(x, y);).",
      "Two Point objects considered equal by equals() must return the same hashCode(), or HashMap will compute different bucket indexes for what should be 'the same' key, so get() looks in the wrong bucket entirely and never finds the entry. The two overrides must always be kept consistent with each other.",
    ),
    exercise(
      "choose-the-collection",
      "You need to log every unique IP address that has hit your API today, and at the end of the day report exactly how many times each one appeared. Which collection do you reach for, and why?",
      Difficulty.MEDIUM,
      "You need two things at once: fast membership/update per hit, and a running count per key.",
      "A HashMap<String, Integer> (or HashMap<String, AtomicInteger> under concurrent access), keyed by IP address, with the value incremented on each hit.",
      "The requirement is exactly a key -> running value relationship with no ordering or sorting need, which is precisely what HashMap is optimized for: average O(1) per update regardless of how many unique IPs accumulate over the day.",
    ),
    exercise(
      "explain-behavior",
      "Why is it considered unsafe to use a mutable object (like a plain, non-final List) as a HashMap key, even if you never intend to mutate it after inserting it?",
      Difficulty.HARD,
      "Think about what get() has to recompute every time it's called.",
      "Because nothing in the language prevents someone else (or future code) from mutating that object later, and if the mutation changes a field used in hashCode()/equals(), the entry becomes unreachable via get() using an equal key — the entry is still in the map, just in the wrong bucket for its now-changed hash.",
      "get(key) always recomputes hashCode() on the key you pass in right now, and looks in the bucket that hash currently maps to. If the stored key's hash changed after insertion (because it was mutated), the entry is still sitting in its original bucket, but a lookup for 'the same' key now computes a different bucket — so the entry becomes effectively lost even though it's still occupying memory.",
    ),
  ],
};

const COMMON_INTERVIEW =
  "Interview focus: explain the definition first, then the problem it solves, how it works internally, a practical example, trade-offs, and when you would or would not use it.";

const CURRICULUM: Record<string, SectionSeed[]> = {
  // ==========================================================================
  // JAVA COLLECTIONS
  // ==========================================================================

  hashmap: [
    section(
      "intro",
      "What is HashMap?",
      "HashMap is a Java Map implementation that stores data as key-value pairs. A key is used to locate its associated value. It is designed for fast average-case insertion, lookup, and removal when keys have a good hash distribution.\n\nThe important idea is that HashMap does not search every entry one by one. It uses a hash derived from the key to choose a bucket where the entry should be stored. This makes direct lookup much faster than a linear search in typical cases.\n\n" + COMMON_INTERVIEW
    ),
    section(
      "why",
      "Why do we need HashMap?",
      "Suppose an application needs to find a user's profile from a user ID. Searching an ArrayList from the first element until the ID is found becomes slower as the collection grows. A HashMap can use the ID as a key and usually locate the corresponding value in near constant average time.\n\nHashMap is useful whenever the relationship is naturally expressed as key -> value: userId -> User, productCode -> Product, countryCode -> Country, or configurationName -> Configuration."
    ),
    section(
      "hashing",
      "How hashing works",
      "Hashing converts a key into a hash value. HashMap uses the key's hashCode() as an important input when determining where an entry belongs. The hash is then processed and mapped to an internal bucket index.\n\nA good hash function distributes keys across buckets rather than concentrating many unrelated keys in one bucket. Poor distribution increases collisions and can reduce performance."
    ),
    section(
      "hashcode",
      "hashCode() and equals()",
      "HashMap depends on the contract between hashCode() and equals(). If two objects are equal according to equals(), they must return the same hash code. The reverse is not required: two different objects may have the same hash code.\n\nDuring lookup, the hash helps identify a candidate bucket, while equals() is used to determine whether the actual key matches. Breaking the equals/hashCode contract can make entries appear to disappear because a lookup may search the wrong logical location."
    ),
    section(
      "bucket",
      "What is a bucket?",
      "Internally, HashMap maintains an array-like table of buckets. An entry is associated with one bucket based on its processed hash. Multiple entries can occupy the same bucket when their hashes map to the same location.\n\nA bucket is therefore not necessarily one entry. Understanding this is important for understanding collisions, linked nodes, tree bins, and lookup performance."
    ),
    section(
      "collision",
      "What is a collision?",
      "A collision happens when different keys end up targeting the same bucket. A collision is normal and does not mean HashMap has failed. The implementation needs a way to store and distinguish those entries.\n\nThe key comparison still matters. Even if two keys produce the same hash, equals() determines whether they represent the same key."
    ),
    section(
      "collision-resolution",
      "How HashMap handles collisions",
      "Java HashMap can maintain multiple entries in a bucket. Historically, these could form a linked chain. In modern Java implementations, heavily populated buckets can be converted into a balanced tree structure under the implementation's treeification rules.\n\nThis means collision handling can remain manageable even when many entries land in the same bucket, provided the implementation can treeify the bin and the table has reached the required capacity."
    ),
    section(
      "put",
      "How put() works internally",
      "A simplified put flow is: calculate the key hash, determine the bucket, inspect entries already there, compare keys, and either replace the existing value for an equal key or add a new entry. If the table becomes too full according to its resizing threshold, the map may resize.\n\nThe exact internal algorithm is implementation-specific, so interviews should distinguish the conceptual flow from version-specific implementation details."
    ),
    section(
      "get",
      "How get() works internally",
      "A get operation calculates the key's hash, identifies the candidate bucket, then checks the entries in that bucket. It compares hashes and keys until it finds the matching key or determines that the key is absent.\n\nWith a good distribution, only a small number of entries need to be inspected, giving HashMap its expected average O(1) lookup behavior."
    ),
    section(
      "remove",
      "How remove() works internally",
      "remove() identifies the bucket from the key's hash, locates the matching key using hash and equality checks, and removes the entry. The structure of the remaining bucket is maintained according to the implementation.\n\nThe conceptual process is similar to get(), followed by unlinking or removing the matched node."
    ),
    section(
      "capacity",
      "Initial capacity and load factor",
      "Initial capacity controls the starting size of the internal table. Load factor controls how full the table is allowed to become before resizing is triggered. The commonly used default load factor is 0.75.\n\nA higher load factor can reduce memory usage but may increase collisions. A lower load factor can reduce collisions at the cost of a larger table. The correct choice depends on expected data size and access patterns."
    ),
    section(
      "resize",
      "Resizing and rehashing",
      "When the number of entries crosses the resize threshold, HashMap expands its table. Entries must then be redistributed according to the new table capacity. Resizing is relatively expensive compared with an individual average lookup, so a suitable initial capacity can reduce repeated growth for known large datasets.\n\nA useful interview distinction is that resizing does not mean hashCode() itself changes. The bucket mapping changes because the table size changes."
    ),
    section(
      "java8",
      "What changed in Java 8?",
      "Java 8 introduced tree bins for heavily populated buckets. Under appropriate conditions, a long collision chain can be represented using a tree structure, improving worst-case behavior compared with a long linked list.\n\nDo not memorize a single threshold without understanding the reason: treeification is intended to prevent pathological collision chains from degrading lookup behavior."
    ),
    section(
      "null",
      "Null keys and values",
      "HashMap permits a null key and multiple null values. A null key has special handling because there is no hashCode() method to invoke on null.\n\nWhether null is appropriate is a design decision. In business code, an explicit key may communicate intent more clearly than using null to represent a missing relationship."
    ),
    section(
      "mutable-key",
      "Why mutable keys are dangerous",
      "A key should not change in a way that affects equals() or hashCode() while it is stored in a HashMap. If the key's hash-related state changes after insertion, a later get() may calculate a different bucket and fail to find the entry.\n\nImmutable key types are therefore safer. Strings and well-designed value objects are common examples."
    ),
    section(
      "complexity",
      "Time and space complexity",
      "HashMap operations such as get(), put(), and remove() are commonly described as O(1) average-case operations under good hashing and appropriate table behavior. Worst-case behavior depends on collisions and implementation details.\n\nSpace complexity is O(n) for n stored mappings, plus internal table and node overhead."
    ),
    section(
      "thread-safety",
      "Is HashMap thread-safe?",
      "HashMap is not synchronized and should not be treated as a thread-safe shared mutable map. Multiple threads modifying the same map require external synchronization or a concurrent collection designed for that workload.\n\nConcurrentHashMap is a common alternative when concurrent access is required."
    ),
    section(
      "comparisons",
      "HashMap vs Hashtable vs ConcurrentHashMap",
      "HashMap is unsynchronized and permits null keys/values. Hashtable is a legacy synchronized map and does not permit null keys or values. ConcurrentHashMap is designed for concurrent access and provides stronger concurrency characteristics than simply synchronizing every operation on one legacy-style map.\n\nChoose based on the application's concurrency requirements rather than historical popularity."
    ),
    section(
      "real-world",
      "Real-world use cases",
      "Common uses include caching values by ID, indexing objects by unique identifiers, counting frequencies, grouping records, lookup tables, configuration maps, and building in-memory indexes.\n\nIf the application needs sorted keys, predictable insertion order, or concurrency-specific behavior, another Map implementation may be more appropriate."
    ),
    section(
      "mistakes",
      "Common mistakes",
      "Common mistakes include using mutable keys, overriding equals() without hashCode(), assuming HashMap preserves insertion order, assuming O(1) is guaranteed in every possible situation, and using HashMap for concurrent mutation without synchronization.\n\nAnother mistake is selecting HashMap when the actual requirement is ordering. LinkedHashMap or TreeMap may communicate that requirement more clearly."
    ),
    section(
      "interview",
      "HashMap interview checklist",
      "Be ready to explain: what HashMap stores; how hashing selects a bucket; hashCode()/equals(); collisions; collision handling; put/get/remove at a conceptual level; load factor; resizing; Java 8 treeification; complexity; null keys; mutable keys; thread safety; and differences between HashMap, LinkedHashMap, TreeMap, Hashtable, and ConcurrentHashMap.\n\nA strong answer separates stable concepts from Java-version-specific implementation details."
    ),
    section(
      "revision",
      "Quick revision",
      "HashMap = key-value lookup using hashing. hashCode() helps locate the bucket; equals() confirms key identity. Collisions are normal. Load factor controls when resizing occurs. Average get/put/remove are O(1) with good distribution. HashMap is not thread-safe. Avoid mutable keys.\n\nSelf-check: Can you explain why two different keys can share a hash, why equals() is still needed, and why changing a key after insertion can break lookup?"
    ),
  ],

  arraylist: [
    section("intro", "What is ArrayList?", "ArrayList is a resizable-array implementation of the List interface. It stores elements in an internal array-like structure and grows when additional capacity is required.\n\nIt is especially useful when indexed access and iteration are common and insertions/removals in the middle are relatively infrequent."),
    section("internal", "How ArrayList works internally", "ArrayList maintains an internal array of references. The logical size tells you how many elements are currently stored, while the internal capacity represents how much room is available before growth is necessary.\n\nThis distinction explains why adding an element is usually fast but occasionally more expensive when the backing array must grow."),
    section("add", "How add() works", "Appending an element usually places it at the next available position. If capacity is insufficient, ArrayList allocates a larger backing array and copies the existing references before adding the new element.\n\nThis occasional resize is why append is described as amortized O(1), rather than O(1) for every single call."),
    section("get", "How get() works", "get(index) can directly access the backing array position corresponding to the index, so indexed access is O(1) in the usual model.\n\nThis is one of the main advantages of ArrayList over LinkedList."),
    section("remove", "How remove() works", "Removing the last element is cheap. Removing an element from the middle requires subsequent elements to shift left to fill the gap, making middle removal O(n) in the general case."),
    section("capacity", "Size vs capacity", "size is the number of stored elements. Capacity is the amount of storage currently available in the backing structure before another growth operation is required.\n\nKnowing this helps explain memory behavior and why repeated growth can be avoided when an approximate collection size is known in advance."),
    section("complexity", "Time complexity", "get and set are O(1). Appending is amortized O(1). Inserting or removing near the beginning or middle is generally O(n) because elements may need to move. Searching by value is O(n)."),
    section("vs-linkedlist", "ArrayList vs LinkedList", "ArrayList is generally preferable for random access and cache-friendly iteration. LinkedList can make insertion/removal cheap when you already have the relevant node/position, but finding that position can itself require traversal.\n\nChoose based on access patterns rather than assuming LinkedList is faster for every insertion."),
    section("real-world", "Real-world use cases", "ArrayList is a strong default for ordered collections when frequent indexed access and iteration matter: result lists, DTO collections, UI data, API responses, and temporary processing collections are common examples."),
    section("interview", "ArrayList interview checklist", "Know internal array storage, size vs capacity, growth, amortized O(1) append, O(1) indexed access, O(n) middle insertion/removal, fail-fast iterator behavior as an implementation characteristic, and ArrayList vs LinkedList trade-offs."),
    section("revision", "Quick revision", "ArrayList = resizable array. get(index) is O(1). append is amortized O(1). Middle insert/remove is O(n). It is usually a strong default when reads and iteration dominate."),
  ],

  linkedlist: [
    section("intro", "What is LinkedList?", "Java LinkedList is a doubly linked list implementation of List and Deque. Each node stores a value and links to neighboring nodes.\n\nUnlike ArrayList, elements are not required to occupy adjacent positions in a backing array."),
    section("node", "Internal node structure", "A linked-list node conceptually contains the element plus references to the previous and next nodes. This structure allows nodes to be connected without shifting every later element when a known node is removed."),
    section("access", "Why indexed access is slower", "To access an arbitrary index, LinkedList generally has to traverse from one end toward the requested position. This makes indexed access O(n), even though insertion/removal at a known node can be efficient."),
    section("insert-remove", "Insertion and removal", "If the implementation already has the node or position, changing links can be O(1). But finding an arbitrary index can take O(n). Therefore, saying 'LinkedList insertion is O(1)' without specifying that the position is already known is incomplete."),
    section("deque", "LinkedList as a Deque", "LinkedList implements Deque, so it can be used for operations at both ends. For queue or stack behavior, dedicated implementations such as ArrayDeque are often a clearer and more efficient choice."),
    section("comparison", "LinkedList vs ArrayList", "ArrayList usually provides better random access and often better locality for iteration. LinkedList can be useful when node-oriented insertion/removal patterns dominate and the necessary position is already available."),
    section("interview", "Interview checklist", "Explain nodes, previous/next links, traversal cost, O(n) indexed access, O(1) link changes at a known position, memory overhead, and why ArrayDeque is often preferred for queue/stack use cases."),
    section("revision", "Quick revision", "LinkedList stores linked nodes. Indexed access is O(n). Link changes can be O(1) when the relevant position/node is already known. It is also a Deque implementation."),
  ],

  hashset: [
    section("intro", "What is HashSet?", "HashSet is a Set implementation backed by hashing. It stores unique elements and uses hashing to determine where elements belong.\n\nAdding an element that is considered equal to an existing element does not create a second logical set member."),
    section("uniqueness", "How uniqueness works", "HashSet relies on hashCode() and equals() to determine whether a logically equal element is already present. The same equals/hashCode contract that matters for HashMap keys matters here too."),
    section("null", "Null values", "HashSet permits a null element. The set still maintains uniqueness, so only one null can be present."),
    section("complexity", "Time complexity", "add, contains, and remove are generally O(1) average-case operations with good hashing. Performance depends on hash distribution and implementation behavior."),
    section("ordering", "Does HashSet preserve order?", "HashSet does not promise insertion order. If insertion order matters, LinkedHashSet is a better fit. If sorted order matters, TreeSet is a better fit."),
    section("interview", "Interview checklist", "Know uniqueness, hashing, equals/hashCode, null handling, lack of ordering guarantee, average complexity, and HashSet vs LinkedHashSet vs TreeSet."),
    section("revision", "Quick revision", "HashSet = unique elements using hashing. No guaranteed insertion order. hashCode()/equals() determine logical membership."),
  ],

  linkedhashset: [
    section("intro", "What is LinkedHashSet?", "LinkedHashSet is a Set implementation that combines hashing-based membership with a linked structure that preserves insertion order."),
    section("ordering", "Why insertion order is preserved", "In addition to the hashing structure used for efficient membership operations, LinkedHashSet maintains links that represent encounter/insertion order."),
    section("comparison", "HashSet vs LinkedHashSet", "HashSet does not promise insertion order. LinkedHashSet preserves insertion order and therefore has some additional memory and linkage overhead."),
    section("use", "When to use it", "Use LinkedHashSet when you need uniqueness and also need deterministic insertion order, such as de-duplicating user input while retaining the original sequence."),
    section("revision", "Quick revision", "LinkedHashSet = unique elements + insertion order."),
  ],

  treeset: [
    section("intro", "What is TreeSet?", "TreeSet is a sorted Set implementation based on a tree structure. It maintains elements according to their natural ordering or a supplied Comparator."),
    section("ordering", "How sorting works", "TreeSet needs a consistent ordering so it can locate elements and maintain sorted traversal. The ordering comes from Comparable or Comparator."),
    section("complexity", "Complexity", "Common operations such as add, remove, and contains are O(log n) in the balanced-tree model."),
    section("comparator", "Comparable vs Comparator", "Comparable defines a natural ordering on the element type. Comparator supplies an external ordering and is useful when multiple sorting strategies are needed."),
    section("mistakes", "Common mistakes", "An ordering that is inconsistent with equals can produce surprising Set behavior because TreeSet uses ordering comparisons to determine element equivalence."),
    section("revision", "Quick revision", "TreeSet = sorted unique elements, commonly O(log n) operations, driven by Comparable or Comparator."),
  ],

  treemap: [
    section("intro", "What is TreeMap?", "TreeMap is a sorted Map implementation that stores mappings ordered by key. It uses a tree-based structure and supports navigation operations such as firstKey, lastKey, floorKey, and ceilingKey."),
    section("ordering", "How keys are ordered", "Keys are ordered using their natural ordering or a Comparator supplied to the map. The ordering must be suitable for consistent map behavior."),
    section("complexity", "Complexity", "Basic operations such as get, put, and remove are O(log n) in the balanced-tree model."),
    section("navigation", "NavigableMap features", "TreeMap supports range and navigation operations that are useful when the application needs values around a particular key rather than exact lookup only."),
    section("comparison", "TreeMap vs HashMap", "HashMap is optimized for hash-based lookup without sorted-key guarantees. TreeMap provides sorted keys and navigation at O(log n) operation cost."),
    section("revision", "Quick revision", "TreeMap = sorted keys + navigation operations + O(log n) basic operations."),
  ],

  linkedhashmap: [
    section("intro", "What is LinkedHashMap?", "LinkedHashMap is a HashMap variant that maintains a linked ordering of entries. By default it can preserve insertion order; it can also be configured for access-order behavior."),
    section("ordering", "Insertion order vs access order", "Insertion-order mode keeps entries in the order they were added. Access-order mode can move recently accessed entries toward the end, which is useful for LRU-style cache patterns."),
    section("comparison", "HashMap vs LinkedHashMap", "LinkedHashMap provides predictable iteration order at some additional memory and linkage cost. HashMap does not provide the same ordering guarantee."),
    section("use", "Real-world uses", "Common uses include predictable API output ordering, preserving user input order while mapping values, and building simple access-order cache structures."),
    section("revision", "Quick revision", "LinkedHashMap = hash-based lookup + predictable linked order; access-order mode is useful for cache patterns."),
  ],

  "collections-framework": [
    section("intro", "What is the Java Collections Framework?", "The Collections Framework provides interfaces, implementations, algorithms, and utilities for representing and processing groups of objects. Core interfaces include List, Set, Queue, Deque, and Map."),
    section("interfaces", "List, Set, Queue, and Map", "List represents ordered collections that can contain duplicates. Set represents unique elements. Queue and Deque represent processing at one or both ends. Map represents key-value associations rather than being a subtype of Collection."),
    section("choosing", "How to choose a collection", "Choose based on the required behavior: random access, uniqueness, insertion order, sorted order, queue semantics, key-value lookup, concurrency, or memory characteristics. Avoid selecting an implementation only because it is familiar."),
    section("complexity", "Think in operations", "Interview questions often become easier when you compare operations: indexed get, contains, insertion, removal, ordering, and iteration. The best collection depends on which operations dominate the workload."),
    section("revision", "Quick revision", "List = ordered/duplicates; Set = uniqueness; Queue/Deque = processing order; Map = key-value lookup. Then select an implementation based on access and ordering requirements."),
  ],

  // ==========================================================================
  // JAVASCRIPT
  // ==========================================================================

  "variables-and-scope": [
    section("intro", "What is a variable?", "A variable is a named binding used to refer to a value. JavaScript provides let, const, and the older var declaration forms.\n\nUnderstanding variables requires separating the binding from the object or primitive value currently associated with it."),
    section("declarations", "let, const, and var", "Use const when a binding should not be reassigned and let when reassignment is required. var is function-scoped and has older hoisting semantics.\n\nconst does not freeze an object. It prevents reassignment of the binding."),
    section("scope", "Global, function, and block scope", "Scope controls where a binding can be resolved. let and const are block-scoped, while var is function-scoped. JavaScript also resolves names through lexical nesting from the current scope outward."),
    section("hoisting", "Hoisting", "Declarations are processed before normal statement execution, but different declarations have different initialization behavior. var is initialized with undefined during its setup phase, while let and const remain unavailable in the temporal dead zone until initialization is reached."),
    section("tdz", "Temporal Dead Zone", "The temporal dead zone is the period between entering a scope and executing a let/const declaration during which accessing that binding throws a ReferenceError. This is why 'let before declaration' is not simply undefined."),
    section("mutation", "Reassignment vs mutation", "Reassignment changes what a variable binding refers to. Mutation changes the contents of a mutable object or array. const prevents reassignment but does not prevent mutation of the referenced object."),
    section("revision", "Quick revision", "let/const are block-scoped; var is function-scoped. const prevents reassignment, not object mutation. let/const have a temporal dead zone before initialization."),
  ],

  "data-types-and-type-conversion": [
    section("intro", "JavaScript value types", "JavaScript has primitive values such as string, number, bigint, boolean, undefined, symbol, and null, plus objects. Arrays and functions are objects in the language's object model."),
    section("primitive", "Primitive vs object values", "Primitives are immutable values. Objects are mutable structured values and variables referring to them can share the same underlying object. This distinction explains many assignment and equality behaviors."),
    section("typeof", "typeof and its quirks", "typeof is useful for broad type checks, but typeof null returns 'object' for historical reasons and arrays also return 'object'. Array.isArray(value) is the appropriate way to detect arrays."),
    section("truthy", "Truthiness", "Falsy values include false, 0, -0, 0n, empty string, null, undefined, and NaN. Most other values are truthy, including empty arrays and empty objects."),
    section("conversion", "Explicit type conversion", "Number(), String(), and Boolean() explicitly convert values. Explicit conversion is often clearer than relying on implicit coercion because the transformation is visible in the code."),
    section("coercion", "Implicit coercion", "JavaScript operators can convert values automatically. Loose equality and arithmetic are common places where coercion matters. Understanding the operator's conversion rules is more reliable than memorizing isolated true/false examples."),
    section("revision", "Quick revision", "Know primitive types, object references, typeof quirks, truthy/falsy values, explicit conversion, and implicit coercion."),
  ],

  functions: [
    section("intro", "What is a function?", "A function packages reusable behavior. It can accept inputs through parameters and produce an output through return."),
    section("forms", "Function declarations, expressions, and arrows", "Function declarations have declaration-hoisting behavior. Function expressions assign function values to variables. Arrow functions provide concise syntax and lexical this behavior."),
    section("first-class", "Functions are first-class values", "A function can be stored in a variable, passed as an argument, returned from another function, or placed in an object. This enables callbacks, factories, composition, and higher-order functions."),
    section("parameters", "Parameters, defaults, and rest", "Parameters name the inputs a function accepts. Default parameters provide fallback values. Rest parameters collect remaining arguments into an array."),
    section("callbacks", "Callbacks and higher-order functions", "A callback is a function supplied to another function to be invoked later or as part of an operation. Functions that accept or return other functions are higher-order functions."),
    section("return", "Return values", "return ends the current function execution and optionally supplies a value to the caller. An async function is different because it always returns a Promise even when the source code appears to return a normal value."),
    section("revision", "Quick revision", "Functions are first-class values. Know declarations vs expressions vs arrows, parameters, return, callbacks, higher-order functions, defaults, and rest parameters."),
  ],

  closures: [
    section("intro", "What is a closure?", "A closure occurs when a function retains access to lexical bindings from the scope in which it was created. The outer function can finish, yet the returned or referenced inner function can continue to access those bindings."),
    section("lexical", "Lexical scope", "JavaScript resolves variable names based on where code is written. An inner function can search its own scope and then enclosing lexical scopes. This lexical relationship is the foundation of closures."),
    section("lifecycle", "What happens after the outer function returns?", "The outer function call finishes, but a captured environment remains reachable if a surviving function still references it. The runtime can therefore keep the relevant bindings alive."),
    section("private", "Closures for private state", "Closures can expose operations over internal state without exposing the state variable directly. Counter factories and module-like patterns are common examples."),
    section("callbacks", "Closures and callbacks", "Event handlers, timers, and array callbacks frequently close over surrounding variables. This is powerful, but it can also produce bugs when the captured binding is shared unexpectedly."),
    section("loops", "var vs let in loops", "var creates a function-scoped binding, so callbacks created in a loop can observe the same final value. let provides a distinct lexical binding for each relevant iteration, producing the expected per-iteration behavior."),
    section("memory", "Memory considerations", "Closures are not inherently a memory leak. The important question is reachability. If a long-lived object keeps a closure alive, the values captured by that closure can also remain reachable. Avoid unnecessary references in long-lived callbacks."),
    section("uses", "Real-world uses", "Closures appear in factories, event handlers, memoization, module patterns, callbacks, private state, and function generators."),
    section("revision", "Quick revision", "Closure = function + retained lexical access. Know lexical scope, returned functions, private state, callbacks, loop behavior, and memory reachability."),
  ],

  "equality-and-type-coercion": [
    section("strict", "Strict equality", "=== compares values without the loose-equality conversion process. Different primitive types generally do not compare equal."),
    section("loose", "Loose equality", "== can convert operands before comparing them. The conversion rules are defined by the language specification and can produce surprising results."),
    section("null", "null and undefined", "null == undefined is a special loose-equality case, while null === undefined is false. Avoid memorizing this as an arbitrary exception; recognize it as a specific language rule."),
    section("objects", "Objects and equality", "Objects are compared by identity rather than by recursively comparing their contents. Two separately created objects with the same properties are not strictly equal."),
    section("practice", "How to solve equality questions", "Identify the operator first. If it is ===, compare types and values. If it is ==, determine whether coercion occurs and evaluate the conversion steps. Explain the process rather than guessing."),
    section("revision", "Quick revision", "Prefer === for predictable comparisons. Understand object identity, null/undefined behavior, and loose-equality coercion."),
  ],

  "this-and-arrow-functions": [
    section("intro", "What is this?", "For ordinary functions, this is determined primarily by how the function is called. The same function can observe different this values under different call forms."),
    section("method", "this in object methods", "When a normal function is invoked as obj.method(), the receiver object is used as the method's this value. Extracting the method and calling it separately changes the call form."),
    section("arrow", "Arrow functions and lexical this", "Arrow functions do not create their own this. They capture this from the surrounding lexical context. This is useful for callbacks that should retain surrounding context."),
    section("bind", "call, apply, and bind", "call and apply invoke a normal function with an explicit this value. bind creates a new function with a fixed this value and can also pre-fill arguments."),
    section("mistakes", "Common mistakes", "A common mistake is assuming that this points to the object where the function was written. For ordinary functions, the call site matters. For arrows, lexical capture matters."),
    section("revision", "Quick revision", "Normal function this depends on invocation. Arrow this is lexical. call/apply invoke with explicit context; bind creates a bound function."),
  ],

  "promises-and-async-await": [
    section("async", "Why asynchronous code exists", "Network calls, timers, file operations, and other tasks may complete later. JavaScript needs a model that allows other work to continue while these operations are pending."),
    section("promise", "Promise states", "A Promise starts pending and settles as fulfilled or rejected. Once settled, it does not switch to another state. Promises provide a composable representation of future results."),
    section("then", "Promise chaining", "then() registers fulfillment/reaction logic and returns another Promise, allowing asynchronous operations to be composed. catch() handles rejection and finally() runs cleanup regardless of the outcome."),
    section("async-await", "async and await", "An async function returns a Promise. await pauses that async function until the awaited Promise settles; it does not freeze the entire JavaScript runtime."),
    section("errors", "Error handling", "Rejected promises should be handled deliberately. With async/await, try/catch is a common pattern. Always distinguish an HTTP response with a non-success status from a network-level fetch rejection."),
    section("parallel", "Promise.all and parallel work", "Independent asynchronous operations can often start together with Promise.all. Sequential awaits are appropriate when the second operation depends on the first."),
    section("mistakes", "Common mistakes", "Common mistakes include accidentally serializing independent requests, forgetting rejection handling, confusing a Promise with its resolved value, and assuming await blocks the entire runtime."),
    section("revision", "Quick revision", "Promise = future result. async functions return Promises. await pauses the current async function. Promise.all is useful for independent concurrent operations."),
  ],

  // ==========================================================================
  // SQL
  // ==========================================================================

  joins: [
    section("intro", "What is a SQL JOIN?", "A JOIN combines rows from two or more tables using a relationship between columns. Joins allow normalized data to be queried as a meaningful result set."),
    section("inner", "INNER JOIN", "INNER JOIN returns rows where the join condition matches on both sides. Rows without a matching partner are excluded."),
    section("left", "LEFT JOIN", "LEFT JOIN keeps every row from the left table and adds matching data from the right table when available. When no match exists, right-side columns are NULL."),
    section("right-full", "RIGHT JOIN and FULL JOIN", "RIGHT JOIN is the mirror of LEFT JOIN. FULL JOIN returns matching rows plus unmatched rows from both sides where supported by the database engine."),
    section("on-vs-where", "ON vs WHERE", "The ON clause defines how rows are matched. WHERE filters the resulting rows. With outer joins, moving a right-table condition from ON to WHERE can change the result by filtering out NULL-extended rows."),
    section("duplicates", "Why joins create duplicates", "If one row on the left matches many rows on the right, the result contains one row for each matching pair. This is not necessarily a bug; it reflects the relationship cardinality."),
    section("performance", "Join performance", "Indexes on join columns can help the database find matching rows efficiently. Actual performance depends on statistics, data distribution, join order, indexes, and the optimizer."),
    section("revision", "Quick revision", "INNER = matching rows. LEFT = all left rows + matches. Understand cardinality, ON vs WHERE, duplicates, and indexes."),
  ],

  indexes: [
    section("intro", "What is an index?", "A database index is an additional data structure that helps the database locate rows without scanning the entire table for every query."),
    section("tradeoff", "Index trade-offs", "Indexes can speed up reads but consume storage and add work to INSERT, UPDATE, and DELETE operations because the index must also be maintained."),
    section("columns", "Which columns benefit?", "Columns frequently used in selective WHERE predicates, JOIN conditions, ORDER BY, or certain grouping patterns may benefit from indexes. The right choice depends on query patterns and data distribution."),
    section("composite", "Composite indexes", "A composite index covers multiple columns. Column order matters because many database engines can efficiently use the leading portion of the index for relevant predicates."),
    section("explain", "EXPLAIN plans", "EXPLAIN or the database's execution-plan tools show how the optimizer intends to execute a query. Use the plan rather than guessing whether an index is helping."),
    section("revision", "Quick revision", "Indexes improve many read patterns but add storage and write overhead. Composite index order matters. Verify with execution plans."),
  ],

  transactions: [
    section("intro", "What is a transaction?", "A transaction groups related database operations into one logical unit. The goal is to keep the database consistent when several operations must succeed or fail together."),
    section("acid", "ACID", "Atomicity means all-or-nothing behavior. Consistency means transactions preserve defined database rules. Isolation controls interaction between concurrent transactions. Durability means committed data survives the relevant failures the database promises to handle."),
    section("commit", "COMMIT and ROLLBACK", "COMMIT makes a transaction's changes durable according to the database's guarantees. ROLLBACK discards changes that have not been committed."),
    section("isolation", "Isolation levels", "Isolation levels define how much one transaction can observe effects from other concurrent transactions. Higher isolation can reduce anomalies but may increase contention."),
    section("deadlocks", "Deadlocks", "A deadlock occurs when transactions wait on resources held by each other, forming a cycle. Databases typically detect deadlocks and abort one transaction so progress can continue."),
    section("revision", "Quick revision", "Transaction = logical unit of work. Know ACID, commit/rollback, isolation, concurrency anomalies, and deadlocks."),
  ],

  // ==========================================================================
  // REACT
  // ==========================================================================

  components: [
    section("intro", "What is a React component?", "A React component is a reusable unit of UI logic and presentation. Components receive inputs through props and can manage state or coordinate effects when necessary."),
    section("props", "Props", "Props are inputs supplied by a parent component. A child should treat props as read-only inputs rather than mutating them."),
    section("state", "State", "State represents data that can change over time and influence rendering. Updating state schedules React to render with the new state according to React's update model."),
    section("composition", "Composition", "React favors composition: build larger interfaces by combining smaller components. Passing children or renderable values often avoids rigid inheritance-style component hierarchies."),
    section("keys", "Keys in lists", "Keys help React identify list items across renders. Stable keys based on item identity are preferable to array indexes when items can be inserted, removed, or reordered."),
    section("revision", "Quick revision", "Components encapsulate UI behavior. Props are inputs; state is changing component data. Composition and stable list keys are fundamental patterns."),
  ],

  hooks: [
    section("intro", "What are React Hooks?", "Hooks are functions that let function components use React features such as state and effects. Hooks follow strict rules about where they can be called."),
    section("usestate", "useState", "useState provides state and a setter. State updates are scheduled by React and should be treated as immutable values when working with objects and arrays."),
    section("useeffect", "useEffect", "useEffect synchronizes a component with an external system such as a subscription, timer, browser API, or network interaction. It should not be used merely as a replacement for ordinary derived calculations."),
    section("dependencies", "Effect dependencies", "Dependencies describe values used by an effect that can change between renders. Missing dependencies can create stale closures; unnecessary dependencies can cause effects to rerun more often."),
    section("cleanup", "Effect cleanup", "An effect can return a cleanup function. Cleanup is important for subscriptions, timers, event listeners, and other resources that must be released when the effect is replaced or the component unmounts."),
    section("custom", "Custom Hooks", "A custom Hook extracts reusable stateful logic into a function whose name conventionally begins with use. It can compose other Hooks while keeping component code focused."),
    section("revision", "Quick revision", "Hooks provide reusable React capabilities. Understand useState, useEffect synchronization, dependency arrays, cleanup, stale closures, and custom Hooks."),
  ],

  "useeffect": [
    section("intro", "What problem does useEffect solve?", "useEffect is for synchronizing a component with systems outside React's rendering calculation, such as subscriptions, timers, DOM APIs, and external data sources."),
    section("render", "Rendering vs effects", "Rendering should calculate UI from current inputs and state. Effects run after rendering according to React's scheduling model and are intended for side effects or synchronization."),
    section("dependencies", "Dependency array", "The dependency array tells React which reactive values the effect uses. An empty array does not mean 'run only once in every possible environment'; it means the effect has no listed changing dependencies and React applies its lifecycle semantics accordingly."),
    section("cleanup", "Cleanup", "Cleanup runs before an effect is re-run when dependencies change and when the component is removed. It is essential for preventing stale subscriptions and timers."),
    section("mistakes", "Common mistakes", "Avoid using effects for values that can be calculated during render. Avoid missing dependencies and avoid creating effects that update state unnecessarily and cause render loops."),
    section("revision", "Quick revision", "useEffect is for synchronization with external systems, not for every piece of derived logic. Know dependencies, cleanup, stale closures, and render/effect separation."),
  ],
};

// ---------------------------------------------------------------------------
// DEPTH EXPANSION — purely additive.
//
// Every block below only calls .push(...) on an ALREADY-EXISTING array in
// CURRICULUM. Not one character of the original entries above is modified,
// reordered, or removed — this satisfies "preserve existing sections" while
// closing the specific depth gaps called out in the curriculum brief for
// each topic. Deterministic section keys mean re-running this seed upserts
// the same rows instead of creating duplicates.
//
// HashMap receives the deepest treatment because the brief explicitly names
// it the flagship "success criteria" topic. Other topics receive solid,
// non-generic depth appropriate to their scope, not padding.
// ---------------------------------------------------------------------------

CURRICULUM.hashmap.push(
  section(
    "prerequisites",
    "Prerequisites",
    "Before HashMap makes sense, be comfortable with: what an array index is, what an Object's hashCode() and equals() methods are for, and the general idea of a Map (a lookup from a key to a value). If any of those feel shaky, HashMap's internals will feel like memorized trivia instead of a mechanism you actually understand."
  ),
  section(
    "terminology",
    "Core terminology",
    "Table: the internal array HashMap uses to hold buckets. Bucket: one slot in that table, which can hold zero, one, or several entries. Node: the internal object that stores a key, a value, a cached hash, and a link to the next node in its bucket. Load factor: the fraction of the table that can fill up before a resize is triggered (commonly 0.75). Threshold: capacity multiplied by load factor \u2014 the actual entry count that triggers a resize. Treeify: converting a long chain of nodes in one bucket into a small balanced tree so lookups in that bucket stay fast even under heavy collisions."
  ),
  section(
    "put-diagram",
    "The put() flow, step by step",
    "put(key, value) can be read as a decision flow:\\n\\nput(key, value)\\n  -> compute hash from key.hashCode()\\n  -> spread/mix the hash bits\\n  -> map to a bucket index using (table length - 1) & hash\\n  -> is that bucket empty?\\n       yes -> insert a new node there, done\\n       no  -> walk the existing nodes in that bucket\\n              -> compare stored hash, then key.equals()\\n              -> found an equal key? replace its value\\n              -> reached the end without a match? append a new node\\n  -> entry count now over the threshold?\\n       yes -> resize the table and redistribute entries\\n       no  -> done\\n\\nEvery step here is conceptual. The exact code path (including exactly when treeification is checked) is implementation detail, not something the Java language itself guarantees word-for-word."
  ),
  section(
    "contains",
    "containsKey() and containsValue()",
    "containsKey(key) follows the same hash-then-bucket-then-equals() path as get(), just returning a boolean instead of the stored value \u2014 so it has the same average O(1) behavior. containsValue(value) is fundamentally different: there is no hash shortcut for an arbitrary value, so it has to scan every bucket and every node, making it O(n). A common interview trap is assuming containsValue() is as fast as containsKey() just because they look similar."
  ),
  section(
    "poor-hashcode",
    "Custom objects as keys, and what a poor hashCode() does to you",
    "Any class can be used as a HashMap key as long as it implements hashCode() and equals() consistently. The danger is a poor hashCode() implementation \u2014 for example, one that always returns the same constant. That doesn't break correctness (equals() still finds the right key eventually), but it destroys performance: every key lands in the same bucket, so HashMap degrades from average O(1) toward the O(n) or O(log n) behavior of whatever structure that one overloaded bucket falls back to. A good hashCode() spreads values across the full range of ints using as many of an object's meaningful fields as practical, exactly the way IDEs and libraries like java.util.Objects.hash() generate them."
  ),
  section(
    "memory",
    "Memory and scalability",
    "Each stored mapping costs more than just the key and value themselves: every node also carries a cached hash code and a reference to the next node in its bucket, and the table itself is sized ahead of actual usage (per the load factor) rather than exactly to the entry count. For a small map this overhead is irrelevant; for a map holding millions of entries, that per-node overhead and the periodically-doubling table can matter for both memory footprint and GC pause behavior. If you know the approximate final size ahead of time, providing an initial capacity avoids repeated resize-and-rehash cycles."
  ),
  section(
    "vs-linkedhashmap-treemap",
    "HashMap vs LinkedHashMap vs TreeMap vs ConcurrentHashMap, side by side",
    "HashMap: fastest average-case lookup, no ordering guarantee, not thread-safe. LinkedHashMap: same hashing performance as HashMap plus predictable iteration order (insertion order, or access order for LRU-style caches), at the cost of extra linkage memory. TreeMap: keeps keys sorted (natural order or a Comparator) and supports navigation like firstKey()/floorKey(), but every operation is O(log n) instead of O(1) average. ConcurrentHashMap: safe for concurrent reads and writes from multiple threads without external synchronization, using internal techniques far more granular than \"lock the whole map,\" but with slightly more overhead than a single-threaded HashMap on uncontended access. The interview-ready version of this: pick HashMap by default, LinkedHashMap when order matters, TreeMap when sorted/range access matters, ConcurrentHashMap when multiple threads mutate it."
  ),
  section(
    "scenario",
    "Real-world scenario: choosing a collection for 100,000 lookups",
    "Requirement: an API receives 100,000 product IDs and needs to check, for each one, whether that product exists in a catalog of similar size.\\n\\nReasoning: comparing each incoming ID against every catalog entry with an ArrayList would be roughly 100,000 x 100,000 comparisons in the worst case \u2014 far too slow. Loading the catalog into a HashMap keyed by product ID first turns each lookup into a single average O(1) operation, so the whole check becomes roughly 100,000 hash lookups instead of ten billion comparisons. This is the concrete reason HashMap exists: turning \"search\" into \"lookup\" whenever the data has a natural key."
  ),
  section(
    "spec-vs-impl",
    "Language contract vs. implementation detail",
    "The Java language and the Map interface guarantee: keys are unique, hashCode()/equals() drive lookup, iteration order is unspecified, and it is not thread-safe. They do NOT guarantee: a specific default capacity, a specific load factor, that collisions are resolved with a linked list versus a tree, or the exact point at which treeification happens \u2014 those are OpenJDK implementation choices that have already changed once (Java 8 added tree bins) and could change again. A strong interview answer keeps these two categories separate instead of presenting implementation trivia as if it were a language guarantee."
  ),
);

CURRICULUM.arraylist.push(
  section(
    "default-capacity",
    "Default capacity and creating with a known size",
    "An ArrayList created with no arguments starts with a small internal array and grows as elements are added. If the approximate final size is known ahead of time, constructing it with an initial capacity (e.g. new ArrayList<>(10_000)) avoids repeated grow-and-copy cycles, which matters when populating a large list in a hot code path."
  ),
  section(
    "insert-at-index",
    "add(index, value) and why it's more expensive than append",
    "Inserting at a specific index (other than the end) requires shifting every element from that index onward one position to the right to make room, then placing the new element. That shift is O(n) in the worst case, which is why repeatedly inserting near the front of a large ArrayList is a common, avoidable performance mistake."
  ),
  section(
    "other-ops",
    "set(), contains(), indexOf(), and clear()",
    "set(index, value) overwrites an existing slot directly and is O(1), unlike add(index, value). contains(value) and indexOf(value) both scan the list looking for a match using equals(), so they are O(n) \u2014 a common trap is calling contains() in a loop over a large ArrayList when a HashSet would turn that into O(1) membership checks. clear() removes all elements and is O(n) because every reference must be released so the garbage collector can reclaim the referenced objects."
  ),
  section(
    "iteration-fail-fast",
    "Iteration, Iterator, and fail-fast behavior",
    "for-each and Iterator both walk the list from index 0 to size-1. ArrayList's iterators are fail-fast: if the list is structurally modified (elements added or removed) while iterating with anything other than the Iterator's own remove(), a ConcurrentModificationException is thrown rather than allowing silently inconsistent behavior. This is a deliberate safety net, not a bug \u2014 the fix is to use Iterator.remove(), collect items to remove first, or iterate over a copy."
  ),
  section(
    "memory",
    "Memory overhead vs a raw array",
    "A plain array of primitives stores values directly and compactly. ArrayList<Integer> instead stores references to boxed Integer objects, so it carries per-element object overhead on top of the array itself. For very large collections of primitives where memory matters, a raw primitive array (or a specialized primitive collection library) can meaningfully reduce memory pressure compared to ArrayList."
  ),
  section(
    "when-not-to-use",
    "When ArrayList is the wrong choice",
    "Avoid ArrayList when the workload is dominated by insertions/removals at the front or middle of a large list (LinkedList or a Deque may fit better), when strict uniqueness is required (use a Set), when key-based lookup is the real requirement (use a Map), or when concurrent mutation from multiple threads is required without external synchronization (consider a concurrent collection instead)."
  ),
);

CURRICULUM.linkedlist.push(
  section(
    "head-tail",
    "Head, tail, and the doubly-linked structure",
    "LinkedList keeps a reference to the first node (head) and the last node (tail), and every node holds references to both its previous and next neighbor. That's what makes it a *doubly* linked list: you can walk it forwards from head or backwards from tail, and adding or removing at either end only means re-pointing a small, fixed number of references \u2014 no shifting of other elements is involved."
  ),
  section(
    "traversal",
    "Traversal in practice",
    "Because there's no backing array, there's no way to jump directly to \"index 500\" the way an array can. get(500) has to start walking from whichever end is closer (head or tail) and follow next/previous references 500 times. This is the direct, concrete reason indexed access is O(n) instead of O(1)."
  ),
  section(
    "cache-locality",
    "Memory overhead and cache locality",
    "Each LinkedList node is a separate object holding the value plus two references, and nothing guarantees those node objects sit near each other in memory. ArrayList's backing array, by contrast, is one contiguous block, which modern CPUs can read through very efficiently thanks to cache prefetching. In practice this means ArrayList iteration is often noticeably faster than LinkedList iteration even though both are described as O(n) \u2014 Big-O hides the real-world cost of cache misses."
  ),
  section(
    "arraydeque-comparison",
    "LinkedList vs ArrayDeque for stack/queue use",
    "LinkedList implements Deque, so it can technically be used as a stack or queue. In practice, ArrayDeque is usually the better choice for pure stack/queue workloads: it's backed by a resizable array (no per-node object overhead, better cache locality) and explicitly documents that it's likely faster than LinkedList for these use cases. LinkedList's Deque support is mainly a convenience, not a performance recommendation."
  ),
  section(
    "real-world",
    "Real-world usage",
    "LinkedList makes sense when you already hold a reference to the exact node you need to insert before/after or remove, and that pattern dominates your access \u2014 for example, certain LRU cache implementations, undo/redo history chains, or manipulating a playlist where you're always operating relative to a 'current' position. For general-purpose lists, queues, or stacks without that access pattern, ArrayList or ArrayDeque are almost always the better default."
  ),
);

CURRICULUM.hashset.push(
  section(
    "why",
    "Why HashSet exists",
    "Before HashSet, checking 'have I seen this value before?' against a List meant scanning every element with contains() \u2014 O(n) per check. HashSet reuses HashMap's hashing (in fact, it's backed by a HashMap internally, storing elements as keys with a dummy value) to make that check average O(1), which matters enormously once you're deduplicating or checking membership across thousands of items."
  ),
  section(
    "prerequisites",
    "Prerequisites",
    "HashSet only makes sense once HashMap's hashing/bucket/equals-hashCode model makes sense \u2014 HashSet is essentially a thin wrapper that reuses that exact mechanism for membership instead of key-value lookup."
  ),
  section(
    "internal",
    "How it's actually implemented",
    "HashSet is backed internally by a HashMap: each element you add becomes a key in that hidden map, paired with a fixed placeholder value. add(), contains(), and remove() on the set simply delegate to put(), containsKey(), and remove() on that internal map \u2014 which is exactly why HashSet inherits HashMap's average O(1) behavior, its lack of ordering guarantee, and its reliance on a correct equals()/hashCode() pair."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Storing mutable objects in a HashSet and then mutating a field used by equals()/hashCode() after insertion causes the same 'entry becomes unfindable' bug as a mutable HashMap key. Another common mistake: assuming HashSet iteration order matches insertion order (it doesn't \u2014 use LinkedHashSet if that's required)."
  ),
);

CURRICULUM.linkedhashset.push(
  section(
    "internal",
    "How ordering is implemented",
    "LinkedHashSet is backed by a LinkedHashMap internally (the same relationship HashSet has to HashMap), reusing its linked-entry mechanism to remember insertion order on top of hash-based membership checking."
  ),
  section(
    "complexity",
    "Complexity",
    "add, remove, and contains remain average O(1), same as HashSet \u2014 the linked-order bookkeeping adds a small constant overhead per operation, not a different complexity class."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Choosing LinkedHashSet 'just in case' when order is never actually relied upon wastes the small extra memory for no benefit \u2014 use plain HashSet unless a deterministic iteration order is an actual requirement of the feature."
  ),
);

CURRICULUM.treeset.push(
  section(
    "why",
    "Why TreeSet exists",
    "HashSet and LinkedHashSet can't answer questions like 'give me all values between 10 and 50' or 'what's the smallest value greater than X' efficiently. TreeSet keeps elements in sorted order using a balanced tree specifically so those range and navigation queries are possible at O(log n) instead of requiring a full scan and sort."
  ),
  section(
    "real-world",
    "Real-world usage",
    "TreeSet fits leaderboard-style 'top N' queries, range queries (find all timestamps in a window), and any case where you need the data to always be iterable in sorted order without re-sorting on every read."
  ),
  section(
    "null-handling",
    "Null handling",
    "Unlike HashSet, TreeSet does not permit a null element (in the natural-ordering case) because there's no way to compare null to another element to decide where it belongs in the tree \u2014 attempting to add null throws a NullPointerException."
  ),
);

CURRICULUM.treemap.push(
  section(
    "why",
    "Why TreeMap exists",
    "HashMap can't efficiently answer 'give me the entry with the key closest to X' or 'iterate all entries in key order.' TreeMap exists specifically for those sorted/range/navigation needs, trading HashMap's O(1) average lookup for guaranteed O(log n) operations plus real ordering guarantees."
  ),
  section(
    "real-world",
    "Real-world usage",
    "TreeMap fits time-series data keyed by timestamp where you need range queries, price-level order books, or any lookup table where you routinely need 'closest match' rather than only exact-key match."
  ),
  section(
    "null-handling",
    "Null handling",
    "TreeMap does not permit a null key under natural ordering, for the same reason TreeSet rejects null \u2014 there's no defined comparison result between null and a real key. Null values are still permitted."
  ),
);

CURRICULUM.linkedhashmap.push(
  section(
    "why",
    "Why LinkedHashMap exists",
    "HashMap's iteration order is unspecified and can change across resizes. Whenever an application needs predictable iteration \u2014 for reproducible API responses, for testing, or for LRU-style caches \u2014 LinkedHashMap exists specifically to add that guarantee on top of HashMap's hashing performance."
  ),
  section(
    "lru-example",
    "Building a simple LRU cache",
    "Constructing a LinkedHashMap with accessOrder=true moves an entry to the end of the iteration order every time it's read, not just when it's written. Overriding removeEldestEntry() to return true once the map exceeds a chosen size turns this into a working bounded LRU cache in a handful of lines \u2014 one of the most common LinkedHashMap interview/practical questions."
  ),
  section(
    "complexity",
    "Complexity",
    "get, put, and remove remain average O(1), identical to HashMap \u2014 the linked-order bookkeeping is a small constant overhead per operation, not a different complexity class."
  ),
);

CURRICULUM["collections-framework"].push(
  section(
    "hierarchy",
    "The interface hierarchy at a glance",
    "Iterable -> Collection -> {List, Set, Queue}. Map is deliberately NOT a Collection \u2014 it represents key-value pairs, not a group of single elements, which is a common point of confusion. Deque extends Queue and adds both-ends operations. Knowing this hierarchy is what lets you reason about which interface a given implementation actually satisfies."
  ),
  section(
    "thread-safety-overview",
    "Thread safety across the framework",
    "Most Collections Framework implementations (ArrayList, HashMap, HashSet, etc.) are NOT thread-safe by default. The framework provides Collections.synchronizedList()/synchronizedMap() wrappers for coarse-grained synchronization, and the java.util.concurrent package (ConcurrentHashMap, CopyOnWriteArrayList, etc.) provides purpose-built concurrent alternatives that scale far better than simply synchronizing every call."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Common mistakes: choosing an implementation from habit rather than from the actual access pattern, assuming any collection is thread-safe without checking, and using == instead of equals() when checking for membership/equality inside custom logic over collection elements."
  ),
);

CURRICULUM["variables-and-scope"].push(
  section(
    "why",
    "Why block scope was added",
    "Before let/const, var's function-scoping (and lack of a temporal dead zone) caused real bugs \u2014 most famously, loop variables captured by closures inside a loop body all sharing one final value. let and const were added specifically to give each block its own scope and to catch use-before-declaration as an error instead of silently returning undefined."
  ),
  section(
    "real-world",
    "Real-world impact",
    "This is why 'use let/const, avoid var' is standard modern practice: it converts an entire category of scope-related bugs (accidental global leakage, loop-closure bugs, unclear reassignment) into either compile-time-visible code or runtime errors, rather than silent incorrect behavior."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Assuming const makes an object immutable (it only prevents reassigning the binding, not mutating the object's contents) and assuming var and let behave the same way inside loops are the two most common mistakes at this stage."
  ),
);

CURRICULUM["data-types-and-type-conversion"].push(
  section(
    "why",
    "Why this matters beyond trivia",
    "Type coercion isn't just an interview quiz topic \u2014 it silently affects real comparisons ('5' == 5), real arithmetic ('5' + 5 vs '5' - 5), and real conditionals (if (someValue) on an unexpected falsy value like 0 or ''). Understanding the rules prevents an entire category of subtle production bugs."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Common mistakes: using == when === was intended, checking typeof value === 'object' to detect arrays (returns true, but so does null-adjacent confusion \u2014 use Array.isArray()), and treating 0 or an empty string as if they were only 'absent' values when they're legitimate, valid data."
  ),
  section(
    "real-world",
    "Real-world usage",
    "Form input validation, API response parsing, and conditional rendering all lean on truthy/falsy checks constantly \u2014 getting this wrong is one of the most common sources of 'works in my test, breaks in production with real data' bugs."
  ),
);

CURRICULUM.functions.push(
  section(
    "why",
    "Why first-class functions matter",
    "Treating functions as ordinary values is what makes callbacks, array methods like map/filter/reduce, event handlers, and dependency injection possible in JavaScript without any special language syntax \u2014 it's one function feature that unlocks a huge amount of the language's idiomatic style."
  ),
  section(
    "iife",
    "IIFEs and why they used to matter more",
    "An Immediately Invoked Function Expression ((function(){ ... })()) creates a private scope to avoid polluting the global scope \u2014 a common pre-ES6 pattern for module-like isolation. With block scope (let/const) and real ES modules now available, IIFEs are far less necessary, but recognizing the pattern in older code is still useful."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Common mistakes: forgetting that a regular function's this depends on how it's called (not where it's defined), relying on function declaration hoisting in ways that make code harder to follow, and using arrow functions as object methods where this is needed (arrow functions don't bind their own this, so they don't work as expected for that case)."
  ),
);

CURRICULUM.closures.push(
  section(
    "why",
    "Why closures exist",
    "Closures aren't a special feature bolted onto JavaScript \u2014 they're a direct consequence of lexical scoping plus functions being first-class values. Once a language lets you return a function from another function, and resolves variable names based on where code is written, closures fall out naturally. Understanding that helps 'why does this variable still exist?' stop feeling like magic."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "The classic mistake is the var-in-a-loop bug (all callbacks share the same final value of a function-scoped variable). A subtler one: assuming a closure copies a variable's value at creation time \u2014 it doesn't, it captures the binding, so later changes to that variable are visible inside the closure too."
  ),
);

CURRICULUM["equality-and-type-coercion"].push(
  section(
    "why",
    "Why two equality operators exist",
    "== was designed to be 'forgiving' by converting operands to compare them, intended to reduce friction for common comparisons. In practice, its conversion rules are complex enough to produce surprising results, which is why === (no conversion) became the recommended default in modern JavaScript style guides."
  ),
  section(
    "coercion-table",
    "A few concrete coercion results worth memorizing by reasoning, not rote",
    "'' == 0 is true (both coerce to 0). '0' == false is true (both coerce to 0). [] == false is true ([] becomes '' via toPrimitive, then '' becomes 0). NaN == NaN is false (NaN is never equal to anything, including itself \u2014 use Number.isNaN() to check). The pattern in all of these: figure out what each side becomes under the language's conversion rules, rather than memorizing the result in isolation."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Using == out of habit instead of intentionally, and forgetting that NaN === NaN is false (a classic bug source when checking for 'no valid number' with plain equality)."
  ),
);

CURRICULUM["this-and-arrow-functions"].push(
  section(
    "why",
    "Why arrow functions were introduced",
    "Before arrow functions, capturing the surrounding this inside a callback required workarounds like const self = this; or .bind(this). Arrow functions were added specifically to make 'this callback should just use whatever this already meant in this scope' the default, removing an entire category of that-vs-this boilerplate."
  ),
  section(
    "real-world",
    "Real-world usage",
    "This is exactly why arrow functions are the near-universal choice for callbacks inside class methods and React event handlers/hooks \u2014 you want this to keep referring to the surrounding component or instance, not to whatever called the callback."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Using an arrow function to define an object method (arrow functions don't get their own this, so this inside it refers to the outer scope, not the object) is the most common resulting mistake once developers over-apply the 'always use arrows' habit."
  ),
);

CURRICULUM["promises-and-async-await"].push(
  section(
    "event-loop",
    "The event loop, end to end",
    "Call Stack -> (async work handed to the browser/Node runtime) -> Web/Node APIs -> completed work is queued -> Task queue (macrotasks: setTimeout, I/O) and Microtask queue (Promise callbacks) -> once the call stack is empty, the event loop drains the ENTIRE microtask queue first, then takes exactly one macrotask, then checks microtasks again, and repeats. This ordering is exactly why a resolved Promise's .then() callback runs before a setTimeout(fn, 0) callback, even though both were scheduled 'to run later.'"
  ),
  section(
    "microtask-vs-macrotask",
    "Why this ordering trips people up in interviews",
    "console.log('A'); setTimeout(() => console.log('B'), 0); Promise.resolve().then(() => console.log('C')); console.log('D'); logs A, D, C, B \u2014 synchronous code always finishes first, then all pending microtasks (C) run before the next macrotask (B) gets a turn, no matter how short the setTimeout delay is."
  ),
  section(
    "real-world",
    "Real-world usage",
    "Understanding this ordering matters in practice when debugging why a UI update scheduled with setTimeout appears to 'lag behind' Promise-based state updates, or why a sequence of chained .then() calls all complete before a sibling timer fires even when the timer was scheduled first."
  ),
);

CURRICULUM.joins.push(
  section(
    "why",
    "Why joins exist",
    "Normalized database design deliberately splits related data across separate tables (customers, orders, products) to avoid duplication and update anomalies. JOINs exist to reconstruct the combined view an application actually needs to query \u2014 without them, normalization would make querying impractical."
  ),
  section(
    "self-join",
    "SELF JOIN",
    "A SELF JOIN joins a table to itself, using table aliases to distinguish the two 'copies.' It's the standard technique for hierarchical or relational-within-itself data, like finding an employee's manager when both employees and managers live in the same employees table."
  ),
  section(
    "scenario",
    "Real-world scenario",
    "Requirement: list every customer along with their most recent order, including customers who have never ordered anything.\\n\\nReasoning: an INNER JOIN would silently drop customers with zero orders, since INNER JOIN only keeps matching pairs. A LEFT JOIN from customers to orders keeps every customer row and fills order columns with NULL when there's no match \u2014 exactly the requirement."
  ),
);

CURRICULUM.indexes.push(
  section(
    "why",
    "Why indexes exist",
    "Without an index, finding a row means scanning the entire table (a full table scan) \u2014 fine for a few hundred rows, unacceptable for millions. An index is a separate, sorted (typically B-tree) structure that lets the database jump close to the matching rows instead of checking every row."
  ),
  section(
    "b-tree",
    "The B-tree concept, briefly",
    "Most default indexes are backed by a B-tree: a balanced tree structure where each lookup narrows the search space by comparing against a node's keys and following the appropriate branch, giving O(log n) lookups instead of O(n) scans \u2014 conceptually the same idea as TreeMap, applied at the database-storage level."
  ),
  section(
    "scenario",
    "Real-world scenario",
    "Requirement: a users table has a million rows, and login-by-email is slow.\\n\\nReasoning: without an index, every login checks email against all million rows. Adding an index on the email column lets the database use the B-tree to jump almost directly to the matching row, turning an O(n) scan into an O(log n) lookup \u2014 at the cost of slightly slower INSERTs, since the index has to be updated too."
  ),
);

CURRICULUM.transactions.push(
  section(
    "why",
    "Why transactions exist",
    "Consider transferring money between two accounts: debit one, credit the other. If the process crashes after the debit but before the credit, the money simply vanishes unless both operations are guaranteed to happen together. Transactions exist to make 'both, or neither' an enforceable guarantee instead of a hope."
  ),
  section(
    "anomalies",
    "Dirty read, non-repeatable read, and phantom read",
    "Dirty read: seeing another transaction's uncommitted change, which might later be rolled back. Non-repeatable read: reading the same row twice in one transaction and getting different values because another transaction committed a change in between. Phantom read: re-running the same query and seeing new rows appear because another transaction inserted matching rows in between. Each isolation level trades protection against some of these anomalies for more concurrency."
  ),
  section(
    "scenario",
    "Real-world scenario",
    "An e-commerce checkout needs to: verify stock, decrement stock, and create an order record. Wrapping these in one transaction ensures that if stock decrement fails (e.g. insufficient stock detected mid-transaction), the whole operation rolls back rather than leaving an order record for an item that was never actually reserved."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Common mistakes: holding a transaction open across a slow external call (like an HTTP request) and unnecessarily increasing lock contention, and choosing the highest isolation level 'to be safe' without considering the throughput cost."
  ),
);

CURRICULUM.components.push(
  section(
    "why",
    "Why component-based UI exists",
    "Before component models, UIs were often built as large, tangled scripts manipulating the DOM directly, making reuse and reasoning about state difficult. Components exist to make UI a function of well-defined inputs (props, state) so the same piece of UI logic can be reused, tested, and reasoned about in isolation."
  ),
  section(
    "rerender-triggers",
    "What actually causes a re-render",
    "A component re-renders when its own state changes, when its parent re-renders (by default, regardless of whether the props actually changed), or when a context value it consumes changes. A very common early misconception is that changing a prop's *value* is what triggers a re-render \u2014 what actually triggers it is the parent re-rendering and passing new props, whether or not those specific props changed."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Common mistakes: mutating state directly instead of creating a new object/array (React compares references, so an in-place mutation may not trigger a re-render at all), and using array index as a list key when items can be reordered or removed, which can cause React to mismatch state across items."
  ),
);

CURRICULUM.hooks.push(
  section(
    "rules",
    "The Rules of Hooks",
    "Hooks must be called at the top level of a component or custom Hook (never inside conditionals, loops, or nested functions), and only from React function components or other Hooks. This isn't an arbitrary style rule \u2014 React relies on Hooks being called in the exact same order on every render to correctly associate each useState/useEffect call with its stored state across renders."
  ),
  section(
    "why",
    "Why Hooks were introduced",
    "Before Hooks, sharing stateful logic between components required patterns like higher-order components or render props, both of which tend to produce deeply nested component trees ('wrapper hell'). Hooks let stateful logic be extracted into plain functions (custom Hooks) that compose naturally without adding component nesting."
  ),
  section(
    "mistakes",
    "Common mistakes",
    "Common mistakes: calling a Hook conditionally (violates the Rules of Hooks and can silently corrupt state association), and treating useEffect as a general-purpose 'run this after render' tool instead of specifically for synchronizing with something outside React."
  ),
);

CURRICULUM.useeffect.push(
  section(
    "stale-closures",
    "Stale closures in effects",
    "An effect closes over the props/state values from the render it was created in. If an effect reads a value but doesn't list it in the dependency array, the effect keeps using that original, now-stale value on subsequent renders instead of the current one \u2014 one of the most common sources of 'my effect is using an old value' bugs."
  ),
  section(
    "scenario",
    "Real-world scenario",
    "A component subscribes to a WebSocket in useEffect and needs to unsubscribe when the component unmounts or when the subscription target changes. Returning a cleanup function from the effect is what makes this correct \u2014 without it, old subscriptions pile up every time the effect re-runs, a classic memory/resource leak."
  ),
  section(
    "vs-usememo",
    "useEffect vs useMemo for derived values",
    "A value that can be computed directly from existing props/state (like a filtered list or a formatted string) should be calculated during render or wrapped in useMemo \u2014 not set via useState inside a useEffect. Using an effect for this adds an extra render cycle and a category of bugs around when that effect actually runs, for no benefit over a direct calculation."
  ),
);


function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function candidatesForTopic(title: string, slug: string): string[] {
  const titleKey = normalize(title);
  const slugKey = normalize(slug);

  const aliases: Record<string, string[]> = {
    hashmap: ["hashmap", "hashmaps"],
    arraylist: ["arraylist"],
    linkedlist: ["linkedlist"],
    hashset: ["hashset"],
    linkedhashset: ["linkedhashset"],
    treeset: ["treeset"],
    treemap: ["treemap"],
    linkedhashmap: ["linkedhashmap"],
    "collectionsframework": ["collectionsframework", "collectionframework", "collections"],
    "variablesandscope": ["variablesandscope", "scope", "variables"],
    "datatypesandtypeconversion": ["datatypesandtypeconversion", "datatypes", "typeconversion"],
    functions: ["functions", "javascriptfunctions"],
    closures: ["closures"],
    "equalityandtypecoercion": ["equalityandtypecoercion", "equality", "typecoercion"],
    "thisandarrowfunctions": ["thisandarrowfunctions", "this", "arrowfunctions"],
    "promisesandasyncawait": ["promisesandasyncawait", "promises", "asyncawait"],
    joins: ["joins", "sqljoins"],
    indexes: ["indexes", "databaseindexes", "sqlindexes"],
    transactions: ["transactions", "sqltransactions"],
    components: ["components", "reactcomponents"],
    hooks: ["hooks", "reacthooks"],
    useeffect: ["useeffect"],
  };

  const keys = Object.keys(CURRICULUM);

  const exact = keys.find((key) => {
    const values = [key, ...(aliases[key] ?? [])].map(normalize);
    return values.includes(titleKey) || values.includes(slugKey);
  });

  if (exact) return [exact];

  // Fuzzy recognition for names such as "HashMap Internals" or "Java HashMap".
  const fuzzy = keys.filter((key) => {
    const values = [key, ...(aliases[key] ?? [])].map(normalize);
    return values.some(
      (value) =>
        value.length >= 5 &&
        (titleKey.includes(value) ||
          slugKey.includes(value) ||
          value.includes(titleKey) ||
          value.includes(slugKey))
    );
  });

  return fuzzy.slice(0, 1);
}

function genericSections(title: string, description: string): SectionSeed[] {
  return [
    section(
      "what",
      `What is ${title}?`,
      `${title} is a concept in this learning path. Start by identifying what problem it solves, what its main responsibilities are, and what terminology is associated with it.\n\nExisting topic description: ${description || "No short description is currently stored."}`
    ),
    section(
      "why",
      "Why does it matter?",
      `The practical value of ${title} comes from understanding when it should be used and what problem it addresses. A good learner should be able to explain the concept in simple language before moving to implementation details.`
    ),
    section(
      "how",
      "How should you understand it?",
      `Break ${title} into smaller ideas: definition, inputs and outputs, internal behavior, common operations, limitations, and real-world usage. Compare it with related concepts so that you understand why one option is chosen over another.`
    ),
    section(
      "mistakes",
      "Common mistakes and edge cases",
      `When learning ${title}, do not rely only on memorized definitions. Check boundary conditions, invalid inputs, performance implications, lifecycle behavior, and interactions with related concepts.`
    ),
    section(
      "real-world",
      "Real-world usage",
      `${title} should be understood in the context of an application. Ask what requirement led to its use, what alternatives exist, and what trade-off the implementation introduces.`
    ),
    section(
      "interview",
      "Interview preparation",
      `${COMMON_INTERVIEW} For ${title}, be prepared to give a simple explanation, a practical example, an implementation detail, one comparison with a related concept, and one common mistake.`
    ),
    section(
      "revision",
      "Quick revision",
      `Before leaving this topic, explain ${title} aloud without reading the page. Then answer: What is it? Why is it needed? How does it work? When would you use it? What are its limitations?`
    ),
  ];
}

async function main() {
  console.log("Starting deep Learn content upgrade...");
  console.log("Existing categories/topics only. No categories will be created or deleted.");

  const topics = await prisma.studyTopic.findMany({
    where: {
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      shortDescription: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    orderBy: [
      { categoryId: "asc" },
      { sortOrder: "asc" },
    ],
  });

  let enriched = 0;
  let generic = 0;
  let sectionsWritten = 0;
  let examplesWritten = 0;
  let exercisesWritten = 0;

  for (const topic of topics) {
    const matched = candidatesForTopic(topic.title, topic.slug);
    const sections = matched.length
      ? CURRICULUM[matched[0]]
      : genericSections(topic.title, topic.shortDescription ?? "");

    if (matched.length) enriched += 1;
    else generic += 1;

    for (let index = 0; index < sections.length; index += 1) {
      const item = sections[index];

      await prisma.studyTopicSection.upsert({
        where: {
          id: `${topic.id}-deep-${item.key}`,
        },
        update: {
          title: item.title,
          content: item.content,
          sortOrder: 1000 + index,
        },
        create: {
          id: `${topic.id}-deep-${item.key}`,
          topicId: topic.id,
          title: item.title,
          content: item.content,
          sortOrder: 1000 + index,
        },
      });

      sectionsWritten += 1;
    }

    const topicExamples = matched.length ? (EXAMPLES[matched[0]] ?? []) : [];
    for (let index = 0; index < topicExamples.length; index += 1) {
      const item = topicExamples[index];
      await prisma.studyExample.upsert({
        where: { id: `${topic.id}-deep-example-${item.key}` },
        update: { language: item.language, code: item.code, explanation: item.explanation, sortOrder: 1000 + index },
        create: {
          id: `${topic.id}-deep-example-${item.key}`,
          topicId: topic.id,
          language: item.language,
          code: item.code,
          explanation: item.explanation,
          sortOrder: 1000 + index,
        },
      });
      examplesWritten += 1;
    }

    const topicExercises = matched.length ? (EXERCISES[matched[0]] ?? []) : [];
    for (let index = 0; index < topicExercises.length; index += 1) {
      const item = topicExercises[index];
      await prisma.studyExercise.upsert({
        where: { id: `${topic.id}-deep-exercise-${item.key}` },
        update: {
          question: item.question,
          difficulty: item.difficulty,
          hint: item.hint,
          solution: item.solution,
          explanation: item.explanation,
          sortOrder: 1000 + index,
        },
        create: {
          id: `${topic.id}-deep-exercise-${item.key}`,
          topicId: topic.id,
          question: item.question,
          difficulty: item.difficulty,
          hint: item.hint,
          solution: item.solution,
          explanation: item.explanation,
          sortOrder: 1000 + index,
        },
      });
      exercisesWritten += 1;
    }
  }

  console.log("Deep Learn content upgrade complete.");
  console.log({
    existingPublishedTopics: topics.length,
    topicSpecificTopics: enriched,
    genericTopics: generic,
    sectionsWritten,
    examplesWritten,
    exercisesWritten,
    categoriesCreated: 0,
    categoriesDeleted: 0,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
