import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

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

        const sections = [...topicSeed.sections, ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedCSFundamentalsCategory() {
  const category: CategorySeed = {
    name: "Computer Science Fundamentals",
    slug: "cs-fundamentals",
    description: "Master the core of computer science: algorithms, data structures, operating systems, networking, databases, architecture, and theory.",
    icon: "CS",
    sortOrder: 24,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the building blocks: binary, logic, basic algorithms, and data structures.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Foundations",
            slug: "foundations",
            description: "Number systems, logic gates, and introductory computer organisation.",
            topics: [
              {
                title: "Number Systems and Binary – The Language of Computers",
                slug: "binary",
                shortDescription: "Binary, octal, hexadecimal, and conversions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why Binary?", content: "Computers use binary (base‑2) because their hardware is built from switches that have two states: on (1) and off (0). This simplicity makes circuits reliable and easy to design. Everything you see on a computer – text, images, videos – is eventually represented as sequences of 0s and 1s." },
                  { title: "Binary, Octal, and Hexadecimal", content: "While binary is the native language, octal (base‑8) and hexadecimal (base‑16) are used as shorthand because they align nicely with binary (2³ and 2⁴). For example, the binary `1010 1111` is `AF` in hex, which is easier for humans to read." },
                  { title: "Converting Between Bases", content: "To convert from binary to decimal, multiply each bit by 2 raised to its position (rightmost is 0). E.g., `1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 11₁₀`. To convert decimal to binary, repeatedly divide by 2 and record remainders. Octal ↔ binary is direct: each octal digit is 3 bits; hex ↔ binary is 4 bits." },
                  { title: "Binary Arithmetic", content: "Adding binary is like decimal: 0+0=0, 0+1=1, 1+1=10 (carry 1). Subtraction uses borrowing. Multiplication is repeated addition. These operations are implemented in hardware (ALU)." },
                  { title: "Two's Complement – Representing Negatives", content: "To represent signed integers, computers use two's complement. The most significant bit (MSB) is the sign bit (0=positive, 1=negative). To negate a number, invert all bits and add 1. This makes addition of positive and negative numbers straightforward." },
                ],
              },
              {
                title: "Boolean Logic and Gates – The Building Blocks of Digital Circuits",
                slug: "boolean-logic",
                shortDescription: "AND, OR, NOT, XOR, and logic circuits.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Boolean Algebra?", content: "Boolean algebra is a branch of mathematics dealing with true/false values (1/0). It's the foundation of digital logic. Operations: AND (both true), OR (at least one true), NOT (invert), XOR (exactly one true)." },
                  { title: "Logic Gates", content: "Gates are physical implementations of Boolean operations. **AND** gate outputs 1 only if all inputs are 1. **OR** outputs 1 if any input is 1. **NOT** inverts. **NAND** is NOT AND, **NOR** is NOT OR, **XOR** is exclusive OR. NAND and NOR are 'universal' gates – any circuit can be built using only them." },
                  { title: "Truth Tables", content: "A truth table lists all possible input combinations and their output. Example for AND: | A | B | Output |, | 0 | 0 | 0 |, | 0 | 1 | 0 |, | 1 | 0 | 0 |, | 1 | 1 | 1 |. Truth tables are used to verify circuit designs." },
                  { title: "Combinational Logic – Circuits Without Memory", content: "Combinational logic produces outputs based solely on current inputs. Examples: **Half Adder** – adds two bits (sum and carry). **Full Adder** – adds three bits (two inputs plus carry‑in). **Multiplexer** – selects one of many inputs. **Decoder** – converts binary code to one‑hot." },
                  { title: "Building a Simple ALU", content: "The Arithmetic Logic Unit (ALU) uses combinational logic to perform operations like addition, subtraction, AND, OR, etc. It's a key part of the CPU." },
                ],
              },
              {
                title: "Basic Data Structures – Storing and Organising Data",
                slug: "basic-ds",
                shortDescription: "Arrays, linked lists, stacks, queues.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Arrays – The Simplest Structure", content: "An array is a contiguous block of memory that stores elements of the same type. Access by index is O(1) because you can calculate the address directly. Insertion/deletion at the end is O(1), but at the middle is O(n) because elements must be shifted. Arrays are used for matrices, buffers, and look‑up tables." },
                  { title: "Linked Lists – Dynamic Chains", content: "A linked list is a sequence of nodes, each containing data and a pointer to the next node. Insertion/deletion at the beginning is O(1), but random access is O(n). A doubly linked list also has a pointer to the previous node, enabling traversal backwards." },
                  { title: "Stacks – LIFO (Last In, First Out)", content: "A stack is like a stack of plates: you can only add or remove from the top. Operations: push (add), pop (remove), peek (see top). Used in function call stacks, undo/redo, and expression evaluation (e.g., parsing parentheses). Can be implemented with arrays or linked lists." },
                  { title: "Queues – FIFO (First In, First Out)", content: "A queue is like a line of people: the first one in is the first one out. Operations: enqueue (add to back), dequeue (remove from front), peek. Used in scheduling, BFS, and buffering. Implemented with arrays (circular buffer) or linked lists." },
                  { title: "When to Use Which?", content: "Use arrays for fast random access and when size is fixed. Use linked lists for frequent insertions/deletions at ends. Use stacks for nested structures (e.g., recursion, parsing). Use queues for ordering (e.g., request handling)." },
                ],
              },
            ],
          },
          {
            title: "Algorithms Basics",
            slug: "algorithms-basics",
            description: "Sorting, searching, and complexity analysis.",
            topics: [
              {
                title: "Big O Notation – Measuring Efficiency",
                slug: "big-o",
                shortDescription: "Time and space complexity.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Big O?", content: "Big O describes the upper bound of an algorithm's growth rate as the input size (n) increases. It ignores constants and lower‑order terms. For example, an algorithm with 2n² + 3n + 1 steps is O(n²). This helps compare algorithms independently of hardware." },
                  { title: "Common Complexity Classes", content: "O(1): constant – array access. O(log n): logarithmic – binary search. O(n): linear – scanning an array. O(n log n): linearithmic – merge sort. O(n²): quadratic – nested loops. O(2ⁿ): exponential – naive Fibonacci. O(n!): factorial – travelling salesman (brute force)." },
                  { title: "How to Analyze", content: "Count the number of operations. A single loop from 0 to n is O(n). Nested loops multiply: O(n²). Sequential loops add: O(n + m) = O(max(n,m)). Recursion can be analyzed with recurrence relations." },
                  { title: "Space Complexity", content: "Space complexity is the extra memory used (not counting the input). Example: O(1) for a few variables, O(n) for an array of size n, O(n²) for a DP table. Recursion stack depth also counts." },
                ],
              },
              {
                title: "Searching Algorithms",
                slug: "searching",
                shortDescription: "Linear and binary search.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Linear Search – Simple but Inefficient", content: "Linear search checks each element from the beginning until the target is found or the end is reached. Works on unsorted data. Worst‑case O(n), average O(n). It's useful for small datasets or when data is unsorted." },
                  { title: "Binary Search – Divide and Conquer", content: "Binary search works on sorted arrays. It compares the target with the middle element. If equal, done. If target is smaller, search the left half; otherwise, the right half. This reduces the search space by half each step, giving O(log n) time. It can be implemented recursively or iteratively." },
                ],
              },
              {
                title: "Sorting Algorithms – Ordering Data",
                slug: "sorting",
                shortDescription: "Bubble, insertion, selection, merge, quick sort.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Bubble Sort – The Naïve Sort", content: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if out of order. Each pass 'bubbles' the largest element to the end. O(n²) worst/average, O(n) best (already sorted). It's stable and in‑place, but rarely used in practice." },
                  { title: "Insertion Sort – Like Sorting Cards", content: "Insertion sort builds the final sorted array one element at a time. It takes an element from the unsorted part and inserts it into its correct position among the sorted part. O(n²) worst, O(n) best (nearly sorted). Stable and in‑place; often used as the base case for recursive sorts." },
                  { title: "Merge Sort – Divide and Conquer", content: "Merge sort divides the array in half, recursively sorts each half, and then merges the two sorted halves. O(n log n) in all cases, stable, but requires O(n) extra space. It's good for linked lists and for large datasets where worst‑case performance matters." },
                  { title: "Quick Sort – In‑Place and Fast", content: "Quick sort picks a pivot, partitions the array so elements less than pivot are on the left and greater on the right, then recursively sorts the partitions. Average O(n log n), worst O(n²) if pivot is bad. In‑place (O(log n) stack). Unstable. Randomising pivot avoids worst case." },
                ],
              },
            ],
          },
          // ---- NEW BEGINNER TOPIC ----
          {
            title: "Heaps and Priority Queues",
            slug: "heaps",
            description: "Binary heaps and their applications.",
            topics: [
              {
                title: "Binary Heap – A Tree‑Based Structure",
                slug: "binary-heap",
                shortDescription: "Heap property, insert, extract‑min/max.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is a Heap?", content: "A binary heap is a complete binary tree (all levels filled except possibly the last) that satisfies the heap property: in a min‑heap, each node is <= its children; in a max‑heap, each node >= its children. Heaps are used for priority queues." },
                  { title: "Array Representation", content: "Because a heap is complete, it can be stored compactly in an array: parent of i is at floor((i-1)/2), left child at 2i+1, right at 2i+2. This makes operations efficient." },
                  { title: "Insert and Extract", content: "Insert: place at end, then bubble‑up (swap with parent until heap property restored). O(log n). Extract‑min/max: return root, replace with last element, bubble‑down (swap with smaller/larger child). O(log n)." },
                  { title: "Heapify – Building a Heap", content: "Building a heap from an array can be done in O(n) by applying bubble‑down from the last internal node up. This is used in heap sort." },
                  { title: "Priority Queue Applications", content: "Heaps are used in Dijkstra's algorithm, Huffman coding, job scheduling, and heap sort." },
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
        description: "Operating systems, networking, databases, and advanced data structures.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Operating Systems",
            slug: "os",
            description: "Processes, threads, memory management, and file systems.",
            topics: [
              {
                title: "Processes and Threads – The Unit of Execution",
                slug: "processes-threads",
                shortDescription: "Concepts, scheduling, and synchronization.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What is a Process?", content: "A process is a program in execution. It has its own address space, code, data, and system resources. The OS manages processes via a Process Control Block (PCB)." },
                  { title: "Threads – Lightweight Processes", content: "Threads are units of execution within a process. They share the process's address space, making context switching faster. They are ideal for parallelizing tasks (e.g., multiple web requests)." },
                  { title: "Scheduling Algorithms", content: "**FCFS (First‑Come First‑Served)**: simple but can cause convoy effect. **SJF (Shortest Job First)**: optimal average waiting time, but requires knowing job lengths. **Round Robin**: preemptive, fair, good for interactive systems. **Priority**: lower priority processes may starve." },
                  { title: "Synchronization – Preventing Race Conditions", content: "When multiple threads access shared data, race conditions occur. Use **mutexes** (binary semaphores) to provide mutual exclusion. **Semaphores** can also count. **Monitors** (in Java, C#) provide higher‑level synchronization." },
                ],
              },
              {
                title: "Memory Management – Managing Resources",
                slug: "memory-management",
                shortDescription: "Paging, segmentation, virtual memory, and caching.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Paging – Fixed‑Size Frames", content: "Paging divides physical memory into fixed‑size frames and logical memory into pages. A page table maps virtual pages to physical frames. This eliminates external fragmentation and simplifies allocation." },
                  { title: "Segmentation – Variable‑Size Units", content: "Segmentation divides memory into variable‑sized segments (code, data, stack). It allows sharing and protection, but suffers from external fragmentation." },
                  { title: "Virtual Memory – Illusion of Infinite Memory", content: "Virtual memory allows programs to use more memory than physically available by swapping pages to disk (paging out). Demand paging loads pages on demand. The MMU (Memory Management Unit) handles address translation." },
                  { title: "Cache Memory – Speeding Up Access", content: "Cache is small, fast memory between CPU and main memory. It exploits locality: temporal (recently used data) and spatial (nearby data). Cache levels (L1, L2, L3) and replacement policies (LRU, FIFO, random) affect performance." },
                ],
              },
              {
                title: "File Systems – Storing Data Persistently",
                slug: "file-systems",
                shortDescription: "Directory structures, allocation, and protection.",
                estimatedMinutes: 22,
                sections: [
                  { title: "File System Design", content: "File systems manage storage on disks. **Contiguous allocation** (fast, but fragmentation). **Linked allocation** (no fragmentation, but poor random access). **Indexed allocation** (uses index blocks, e.g., FAT, ext4)." },
                  { title: "Directories", content: "Directories map file names to file metadata. **Single‑level** (all files in one directory). **Two‑level** (user directories). **Hierarchical** (tree) allows grouping and is standard." },
                  { title: "Inodes and Journaling", content: "An inode stores metadata (size, permissions, location of data blocks). Journaling file systems (e.g., ext4, NTFS) log changes before committing, improving recovery after crashes." },
                ],
              },
              {
                title: "Deadlocks – The Ultimate Standstill",
                slug: "deadlocks",
                shortDescription: "Conditions, detection, avoidance, and recovery.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is a Deadlock?", content: "A deadlock occurs when two or more processes are each waiting for a resource held by another, forming a cycle. Example: Process A holds file1, waits for file2; Process B holds file2, waits for file1." },
                  { title: "Four Necessary Conditions", content: "**Mutual exclusion**, **Hold and wait**, **No preemption**, **Circular wait**. All four must be present." },
                  { title: "Deadlock Prevention", content: "Break one of the four conditions: e.g., require processes to request all resources at once (eliminates hold‑and‑wait), or allow preemption." },
                  { title: "Deadlock Avoidance (Banker's Algorithm)", content: "The OS checks if granting a resource would lead to an unsafe state. If not, it grants; otherwise, the process waits." },
                  { title: "Deadlock Detection and Recovery", content: "Use a wait‑for graph to detect cycles. Recovery: kill one process (abort), or preempt resources." },
                ],
              },
            ],
          },
          {
            title: "Computer Networks",
            slug: "networks",
            description: "OSI model, TCP/IP, routing, and application protocols.",
            topics: [
              {
                title: "OSI and TCP/IP Models – Layers of Communication",
                slug: "osi-tcpip",
                shortDescription: "Layers and their functions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "OSI 7 Layers", content: "Physical (bits), Data Link (frames), Network (packets), Transport (segments), Session, Presentation, Application. Each layer adds headers." },
                  { title: "TCP/IP 4 Layers", content: "Link (physical+data link), Internet (network), Transport, Application. This is the practical model used in the Internet." },
                  { title: "Encapsulation", content: "Data is wrapped with headers at each layer (e.g., TCP header, IP header) before being transmitted." },
                ],
              },
              {
                title: "IP and Routing",
                slug: "ip-routing",
                shortDescription: "IP addressing, subnetting, routing protocols.",
                estimatedMinutes: 26,
                sections: [
                  { title: "IP Addressing", content: "IPv4 uses 32‑bit addresses (dotted decimal). Classes A, B, C, D. CIDR (Classless Inter‑Domain Routing) uses prefix length (e.g., /24). IPv6 uses 128‑bit to solve address exhaustion." },
                  { title: "Subnetting", content: "Dividing a network into smaller subnetworks. Helps with routing efficiency and security." },
                  { title: "Routing Protocols", content: "**RIP** (distance vector, hop count). **OSPF** (link state, Dijkstra). **BGP** (path vector, inter‑domain routing)." },
                ],
              },
              {
                title: "Transport Layer – Reliable vs Unreliable",
                slug: "transport",
                shortDescription: "TCP vs UDP, flow control, congestion control.",
                estimatedMinutes: 26,
                sections: [
                  { title: "TCP – Reliable, Connection‑Oriented", content: "TCP provides reliable, ordered delivery with flow control (sliding window) and congestion control (slow start, additive increase). It uses a three‑way handshake to establish a connection and a four‑way handshake to close." },
                  { title: "UDP – Unreliable, Connectionless", content: "UDP is simple, fast, and does not guarantee delivery or order. Used for streaming, VoIP, DNS, where speed is more important than reliability." },
                  { title: "Flow Control vs Congestion Control", content: "Flow control prevents the receiver from being overwhelmed (using window size). Congestion control prevents the network from being overwhelmed (using algorithms like Reno, Cubic)." },
                ],
              },
              {
                title: "DNS and HTTP – Application Layer",
                slug: "dns-http",
                shortDescription: "Domain name resolution and web protocols.",
                estimatedMinutes: 24,
                sections: [
                  { title: "DNS – The Phonebook of the Internet", content: "DNS resolves domain names (e.g., google.com) to IP addresses. It uses a hierarchical, distributed database. Queries go from client to recursive resolver, then to root, TLD, and authoritative nameservers." },
                  { title: "HTTP/HTTPS", content: "HTTP is the protocol for web transfers. Methods: GET, POST, PUT, DELETE. Status codes (200, 404, 500). HTTPS adds TLS encryption for security. HTTP/2 and HTTP/3 improve performance with multiplexing and QUIC." },
                ],
              },
            ],
          },
          {
            title: "Databases – Managing Structured Data",
            slug: "db",
            description: "Relational model, SQL, normalization, indexing, and transactions.",
            topics: [
              {
                title: "Relational Database Design",
                slug: "rdbms",
                shortDescription: "Tables, keys, normalization, and ER modeling.",
                estimatedMinutes: 26,
                sections: [
                  { title: "The Relational Model", content: "Data is organised in tables (relations) with rows (tuples) and columns (attributes). Primary keys uniquely identify rows. Foreign keys link tables." },
                  { title: "Entity‑Relationship (ER) Modeling", content: "ER diagrams represent entities, attributes, and relationships. They are used to design databases." },
                  { title: "Normalization – Removing Redundancy", content: "Normalization reduces data redundancy and anomalies. **1NF**: atomic columns. **2NF**: no partial dependency. **3NF**: no transitive dependency. **BCNF**: stronger." },
                ],
              },
              {
                title: "SQL and Query Optimization",
                slug: "sql-optimization",
                shortDescription: "Joins, subqueries, indexing, and query plans.",
                estimatedMinutes: 24,
                sections: [
                  { title: "SQL – Structured Query Language", content: "SQL is used to manage and query relational databases. Basic commands: SELECT, INSERT, UPDATE, DELETE. Joins combine tables (INNER, LEFT, RIGHT, FULL). Subqueries nest queries." },
                  { title: "Indexes – Speeding Up Queries", content: "Indexes are data structures (B‑tree, hash) that speed up lookups. They are used on columns that are frequently searched or joined." },
                  { title: "Query Execution Plans", content: "The database optimizer chooses how to execute a query (e.g., which index to use). Use EXPLAIN to analyze." },
                ],
              },
              {
                title: "Transactions and Concurrency – ACID and Isolation",
                slug: "db-transactions",
                shortDescription: "ACID, isolation levels, locking, and deadlocks.",
                estimatedMinutes: 26,
                sections: [
                  { title: "ACID Properties", content: "**Atomicity**: all or nothing. **Consistency**: data remains valid. **Isolation**: concurrent transactions don't interfere. **Durability**: committed data persists." },
                  { title: "Isolation Levels", content: "**Read Uncommitted**: dirty reads possible. **Read Committed**: no dirty reads. **Repeatable Read**: no non‑repeatable reads. **Serializable**: strongest, prevents phantoms." },
                  { title: "Concurrency Control", content: "Locking (pessimistic) and timestamp‑based (optimistic). Two‑phase locking (2PL) ensures serializability. Deadlocks can occur." },
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
        description: "Computer architecture, theory of computation, compilers, and distributed systems.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Computer Architecture",
            slug: "architecture",
            description: "CPU, instruction sets, pipelining, memory hierarchy, and parallelism.",
            topics: [
              {
                title: "CPU Design – The Brain of the Computer",
                slug: "cpu-design",
                shortDescription: "ALU, control unit, registers, instruction cycle.",
                estimatedMinutes: 26,
                sections: [
                  { title: "CPU Components", content: "**ALU**: Arithmetic Logic Unit (performs arithmetic and logic). **Control Unit**: fetches, decodes, and executes instructions. **Registers**: fast storage for temporary data. **Cache**: quick access to frequently used data." },
                  { title: "Instruction Cycle", content: "1. Fetch instruction from memory. 2. Decode instruction. 3. Execute (ALU operation or memory access). 4. Write back result." },
                  { title: "RISC vs CISC", content: "RISC (Reduced Instruction Set Computer): simple instructions, fixed length, easier to pipeline. CISC (Complex Instruction Set Computer): complex instructions, variable length, but more work per instruction. Modern CPUs often use a hybrid (micro‑ops)." },
                ],
              },
              {
                title: "Pipelining and Hazards",
                slug: "pipelining",
                shortDescription: "Instruction pipelining, data/control hazards, and forwarding.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Pipelining?", content: "Pipelining overlaps execution stages (fetch, decode, execute, memory, writeback) to increase throughput. It's like an assembly line." },
                  { title: "Hazards", content: "**Data hazards**: instruction depends on previous result (solved by forwarding or stalling). **Control hazards**: branches cause uncertainty (solved by branch prediction). **Structural hazards**: hardware resource conflicts." },
                  { title: "Superscalar and Out‑of‑Order Execution", content: "Superscalar can issue multiple instructions per cycle. Out‑of‑order execution reorders instructions to improve efficiency." },
                ],
              },
              {
                title: "Memory Hierarchy – Speeding Up Access",
                slug: "memory-hierarchy",
                shortDescription: "Registers, cache, main memory, secondary storage.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Memory Pyramid", content: "From fast and small (registers) to slow and large (disk). Each level serves as a cache for the next." },
                  { title: "Cache Design", content: "Cache is divided into lines (blocks). **Direct‑mapped**: each memory block maps to exactly one cache line. **Fully associative**: any block can go anywhere. **Set‑associative**: compromise, most common." },
                  { title: "Replacement Policies", content: "When cache is full, choose which line to evict: **LRU** (least recently used), **FIFO**, **Random**." },
                ],
              },
            ],
          },
          {
            title: "Theory of Computation – The Limits of Computing",
            slug: "toc",
            description: "Automata, formal languages, computability, and complexity.",
            topics: [
              {
                title: "Automata Theory – Recognising Patterns",
                slug: "automata",
                shortDescription: "DFA, NFA, regular expressions, and context‑free grammars.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Finite Automata", content: "A finite automaton has states, transitions, and accepts/rejects input. **DFA** (deterministic) has exactly one transition per input. **NFA** (non‑deterministic) can have multiple; they are equivalent in power." },
                  { title: "Regular Languages and Regular Expressions", content: "Languages accepted by finite automata are regular. Regular expressions (e.g., `(a|b)*`) describe these languages. Pumping lemma proves a language is not regular." },
                  { title: "Context‑Free Grammars (CFG)", content: "CFG consists of production rules (e.g., S → aSb | ε). They generate context‑free languages, which are accepted by pushdown automata. Used to describe programming language syntax." },
                ],
              },
              {
                title: "Turing Machines – The Universal Model",
                slug: "turing",
                shortDescription: "Turing machine model, decidability, and halting problem.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Turing Machine", content: "A Turing machine has an infinite tape, a head that reads/writes, and a set of states. It is a simple but powerful model of computation. Any computable function can be computed by some Turing machine (Church‑Turing thesis)." },
                  { title: "Decidability", content: "A problem is decidable if there is a Turing machine that halts with a yes/no answer for all inputs. Many problems are undecidable, e.g., the halting problem." },
                  { title: "The Halting Problem", content: "There is no Turing machine that can decide whether another Turing machine will halt on a given input. This is proven by diagonalisation." },
                ],
              },
              {
                title: "Complexity Classes – P, NP, and Beyond",
                slug: "complexity",
                shortDescription: "P, NP, NP‑complete, and NP‑hard.",
                estimatedMinutes: 26,
                sections: [
                  { title: "P and NP", content: "**P**: problems solvable in polynomial time. **NP**: problems whose solutions can be verified in polynomial time. It's unknown whether P = NP." },
                  { title: "NP‑Complete and NP‑Hard", content: "NP‑complete problems are the hardest in NP; if one is solved in polynomial time, all NP problems are solved (P=NP). Example: SAT, TSP. NP‑hard is at least as hard as NP‑complete." },
                  { title: "Reductions", content: "A reduction shows problem A can be transformed to problem B. If B is easy, A is easy. Used to prove NP‑completeness." },
                ],
              },
            ],
          },
          {
            title: "Compiler Design – Translating Code",
            slug: "compilers",
            description: "Lexical analysis, parsing, semantic analysis, code generation.",
            topics: [
              {
                title: "Lexical Analysis – Tokenising Input",
                slug: "lexical",
                shortDescription: "Tokens, lexemes, and regular expressions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The Lexer", content: "Lexer scans source code and produces tokens (keywords, identifiers, literals, operators). Uses regular expressions and finite automata." },
                  { title: "Error Handling", content: "If an invalid token is encountered, the lexer reports an error and may recover (skip to next valid token)." },
                ],
              },
              {
                title: "Parsing – Building Syntax Trees",
                slug: "parsing",
                shortDescription: "Syntax analysis, parse trees, and grammar.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Top‑Down Parsing", content: "Start from the start symbol and expand (predictive parsing, recursive descent). Requires LL(1) grammars." },
                  { title: "Bottom‑Up Parsing", content: "Start from tokens and reduce to the start symbol (shift‑reduce). LR, SLR, LALR parsers are powerful." },
                ],
              },
            ],
          },
          {
            title: "Distributed Systems – Coordination at Scale",
            slug: "distributed",
            description: "Consensus, replication, and fault tolerance.",
            topics: [
              {
                title: "CAP Theorem – The Trade‑off",
                slug: "cap",
                shortDescription: "Consistency, Availability, Partition tolerance.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is CAP?", content: "In a distributed system, you can have at most two of: Consistency (all nodes see same data), Availability (every request gets a response), and Partition tolerance (system continues despite network partitions). Since partitions are inevitable, choose between CP (consistency) and AP (availability)." },
                  { title: "CP vs AP Systems", content: "CP systems (e.g., HBase) sacrifice availability for consistency. AP systems (e.g., Cassandra) sacrifice consistency for availability." },
                ],
              },
              {
                title: "Consensus Algorithms – Agreement Among Nodes",
                slug: "consensus",
                shortDescription: "Paxos, Raft, and Byzantine fault tolerance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why Consensus?", content: "Distributed systems need agreement on values (e.g., leader election, commit decisions)." },
                  { title: "Raft – Understandable Consensus", content: "Raft uses leader election, log replication, and safety. It's designed to be easy to understand and implement. Used in etcd." },
                  { title: "Byzantine Fault Tolerance", content: "Byzantine faults include malicious nodes. PBFT (Practical Byzantine Fault Tolerance) can tolerate up to 1/3 faulty nodes." },
                ],
              },
              {
                title: "Replication and Consistency",
                slug: "replication",
                shortDescription: "Master‑slave, multi‑master, quorums.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Replication Strategies", content: "**Master‑slave**: one primary for writes, replicas for reads. **Multi‑master**: writes to any node, conflict resolution needed. **Quorum**: read/write from a subset (e.g., W + R > N for consistency)." },
                  { title: "Eventual Consistency", content: "In systems like Dynamo, writes propagate asynchronously; consistency is achieved eventually. Used when availability is paramount." },
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
        description: "Common CS fundamentals questions, problem‑solving, and design.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core CS Concepts",
            slug: "core-cs-interview",
            description: "Data structures, algorithms, OS, networking, DB.",
            topics: [
              {
                title: "Data Structures and Algorithms",
                slug: "ds-algo-interview",
                shortDescription: "Arrays, trees, graphs, DP.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Arrays and Strings", content: "Two‑pointer, sliding window, prefix sums." },
                  { title: "Trees", content: "BST, traversals (in‑order, pre‑order, post‑order), BFS/DFS, LCA, diameter." },
                  { title: "Graphs", content: "Dijkstra, topological sort, cycle detection, union‑find." },
                  { title: "Dynamic Programming", content: "Memoization vs tabulation, knapsack, LIS, edit distance." },
                ],
              },
              {
                title: "Operating Systems",
                slug: "os-interview",
                shortDescription: "Process, threads, memory, deadlocks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Deadlock Conditions", content: "Mutual exclusion, hold and wait, no preemption, circular wait." },
                  { title: "Memory Management", content: "Paging, segmentation, virtual memory, page replacement (LRU, FIFO)." },
                  { title: "Scheduling", content: "FCFS, SJF, Round Robin, Priority." },
                ],
              },
              {
                title: "Networking",
                slug: "networking-interview",
                shortDescription: "TCP/IP, DNS, HTTP, and security.",
                estimatedMinutes: 22,
                sections: [
                  { title: "TCP vs UDP", content: "Reliability vs speed." },
                  { title: "DNS", content: "Resolution process." },
                  { title: "HTTP/HTTPS", content: "Methods, status codes, TLS." },
                  { title: "Network Security", content: "Firewalls, VPN, encryption." },
                ],
              },
              {
                title: "Databases",
                slug: "db-interview",
                shortDescription: "SQL, indexing, normalization, ACID.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Indexes", content: "B‑tree, hash, covering." },
                  { title: "Normalization", content: "Purpose and levels (1NF, 2NF, 3NF, BCNF)." },
                  { title: "Transactions", content: "ACID, isolation levels." },
                ],
              },
            ],
          },
          {
            title: "Problem Solving",
            slug: "problem-solving-cs",
            description: "Practice with common CS problems.",
            topics: [
              {
                title: "Design a LRU Cache",
                slug: "lru-cache",
                shortDescription: "Use a hash map and doubly linked list.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Data Structures", content: "HashMap for O(1) get, doubly linked list for order." },
                  { title: "Operations", content: "get and put in O(1)." },
                  { title: "Implementation", content: "Use a dummy head/tail for easy insertion/deletion." },
                ],
              },
              {
                title: "Implement a Thread‑safe Blocking Queue",
                slug: "blocking-queue",
                shortDescription: "Producer‑consumer with bounded queue.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Synchronization", content: "Use locks or semaphores." },
                  { title: "Conditions", content: "Wait for not full and not empty." },
                ],
              },
              {
                title: "Design a Distributed Key‑Value Store",
                slug: "distributed-kv",
                shortDescription: "Consistent hashing, replication, and quorums.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Consistent Hashing", content: "Distribute keys across nodes, virtual nodes for load balancing." },
                  { title: "Replication", content: "Replicate data on N nodes for fault tolerance." },
                  { title: "Quorums", content: "W + R > N for strong consistency." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Computer Science Fundamentals category seeded (ultra‑detailed)");
}

async function main() {
  await seedCSFundamentalsCategory();
}

main()
  .catch((error) => {
    console.error("CS Fundamentals seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });