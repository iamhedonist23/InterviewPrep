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

async function seedDSACategory() {
  const dsaCategory: CategorySeed = {
    name: "Data Structures & Algorithms",
    slug: "dsa",
    description: "Master data structures and algorithms from basics to advanced: arrays, linked lists, trees, graphs, dynamic programming, and more.",
    icon: "DSA",
    sortOrder: 25,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build a strong foundation in complexity analysis, fundamental data structures, and basic algorithms.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Foundations",
            slug: "foundations",
            description: "Big O notation, complexity analysis, and problem-solving basics.",
            topics: [
              {
                title: "Big O Notation – The Language of Algorithm Efficiency",
                slug: "big-o",
                shortDescription: "Analyze time and space complexity.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Big O?", content: "Big O notation is the standard way to describe the efficiency of an algorithm. It focuses on how the runtime or memory usage grows as the input size (n) grows. We ignore constants and lower‑order terms because they become insignificant for large inputs. For example, an algorithm that takes 2n² + 3n + 5 steps is O(n²) – the n² term dominates. This allows you to compare algorithms independently of hardware and language." },
                  { title: "Common Complexity Classes – A Quick Guide", content: "**O(1)** – Constant time: array access. **O(log n)** – Logarithmic: binary search. **O(n)** – Linear: single loop. **O(n log n)** – Linearithmic: merge sort. **O(n²)** – Quadratic: nested loops. **O(2ⁿ)** – Exponential: naive Fibonacci. **O(n!)** – Factorial: brute‑force TSP. Each class has a different growth rate; knowing them helps you select the best algorithm for your constraints." },
                  { title: "Analyzing Loops and Recursion", content: "For loops, count the number of iterations. A single loop from 0 to n is O(n). Nested loops multiply – O(n²) if both go to n. If the inner loop depends on the outer (e.g., i from 0 to n, j from 0 to i), it's still O(n²) because 1+2+...+n = n(n+1)/2 ~ n²/2, which is O(n²). For recursion, solve recurrence relations (e.g., T(n) = 2T(n/2) + O(n) → O(n log n))." },
                  { title: "Space Complexity – The Memory Side", content: "Space complexity counts extra memory beyond the input. **O(1)** – using a few variables. **O(n)** – an auxiliary array of size n. **O(n²)** – a DP table. Recursion also uses stack space – a recursive binary search uses O(log n), while a naive recursive Fibonacci uses O(n) due to the call stack depth." },
                ],
              },
              {
                title: "Arrays and Strings – The Foundational Data Structures",
                slug: "arrays-strings",
                shortDescription: "Indexed data, common operations, and string manipulation.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Arrays – The Basics", content: "An array is a contiguous block of memory that stores elements of the same type. Access by index is O(1) because you can calculate the memory address directly. Insertion or deletion at the end is O(1) (amortized for dynamic arrays), but in the middle it's O(n) because elements must be shifted. Arrays are used in matrices, look‑up tables, and buffers." },
                  { title: "The Two‑Pointer Technique", content: "Two pointers often start at opposite ends or at the same position and move towards each other or in the same direction. This is used for: **Pair sum in a sorted array** – left/right pointers; **Palindrome check** – compare from both ends; **Remove duplicates from sorted array** – slow and fast pointers. All work in O(n) time and O(1) space." },
                  { title: "Sliding Window – Optimizing Subarray Queries", content: "The sliding window pattern maintains a subarray that satisfies a condition. For fixed‑size windows, compute the sum of the first window, then slide: add the next element and subtract the outgoing element. For variable‑size, expand the window until the condition is violated, then shrink. Classic problems: maximum sum subarray of size k, longest substring without repeating characters, and minimum window substring." },
                  { title: "Prefix Sums – Range Queries in O(1)", content: "Precompute cumulative sums: `prefix[i] = sum of arr[0..i]`. Then the sum from index i to j is `prefix[j] - prefix[i-1]` (with prefix[-1]=0). This turns range sum queries into O(1). Also used for subarray sum equals k and 2D prefix sums for matrices." },
                  { title: "Strings – Immutable but Powerful", content: "Strings are sequences of characters. They are often immutable (Java, Python), so concatenation in a loop is O(n²) – use `StringBuilder` or `.join()`. Common operations: palindrome check (two pointers), anagram (hash map), substring search (KMP, Rabin‑Karp), and pattern matching. Know the built‑in methods but also understand their complexity." },
                ],
              },
              {
                title: "Linked Lists – Pointers and Chains",
                slug: "linked-lists",
                shortDescription: "Singly, doubly, and circular linked lists.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is a Linked List?", content: "A linked list is a linear collection of nodes, where each node stores data and a reference (pointer) to the next node. In a doubly linked list, each node also points to the previous. The head points to the first node. You can only traverse by following pointers, so random access is O(n). However, insertion at the head is O(1), making linked lists great for stacks and queues." },
                  { title: "Operations and Their Costs", content: "**Insert at head**: O(1) – just update head. **Insert at tail**: O(1) if you maintain a tail pointer, else O(n). **Delete a node**: O(1) if you have a reference to the previous node (doubly linked); otherwise O(n) to find it. **Search**: O(n). **Reversal**: O(n) – in‑place." },
                  { title: "Reversing a Linked List – Classic Interview Problem", content: "Iterative approach: `prev = null; curr = head; while (curr != null) { next = curr.next; curr.next = prev; prev = curr; curr = next; }` Finally, `prev` is the new head. This is O(n) time and O(1) space." },
                  { title: "Cycle Detection – Floyd's Algorithm", content: "Use two pointers, slow and fast. Slow moves one step, fast moves two. If there is a cycle, they will meet. To find the cycle start, reset one pointer to head and move both one step at a time – the meeting point is the cycle start. This is O(n) and constant space." },
                ],
              },
              {
                title: "Stacks and Queues – LIFO and FIFO",
                slug: "stacks-queues",
                shortDescription: "LIFO and FIFO structures, implementations using arrays and linked lists.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Stack – Last In, First Out", content: "A stack is like a stack of plates: you add (push) and remove (pop) from the top. Operations: push, pop, peek (top). Used for function call stacks, undo/redo, expression parsing (balanced brackets), and DFS. Implement with arrays (fast, but fixed size) or linked lists (dynamic)." },
                  { title: "Queue – First In, First Out", content: "A queue is like a line of people: the first to arrive is served first. Operations: enqueue (add to back), dequeue (remove from front), peek (front). Used in scheduling, BFS, and buffering. Implement with a circular array (efficient) or linked list." },
                  { title: "Balanced Brackets – A Classic Stack Problem", content: "Given a string with parentheses, braces, and brackets, check if they are balanced. Iterate through characters: if opening, push; if closing, pop and match. If the stack is empty at the end, it's balanced. O(n) time and O(n) space." },
                ],
              },
            ],
          },
          {
            title: "Sorting and Searching",
            slug: "sorting-searching",
            description: "Basic sorting algorithms and search techniques.",
            topics: [
              {
                title: "Searching Algorithms – Finding What You Need",
                slug: "searching",
                shortDescription: "Linear and binary search.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Linear Search – Simple and Universal", content: "Check every element from the beginning until you find the target or reach the end. Works on unsorted data. O(n) worst‑case, O(1) space. It's fine for small datasets." },
                  { title: "Binary Search – Divide and Conquer", content: "Works on sorted arrays. Compare target with the middle element. If equal, done; if target is smaller, search the left half; otherwise, the right half. Each step halves the search space, giving O(log n). This is one of the most important algorithms in interviews." },
                ],
              },
              {
                title: "Bubble Sort and Insertion Sort – The O(n²) Sorts",
                slug: "bubble-insertion",
                shortDescription: "Basic O(n²) algorithms.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Bubble Sort – A Teaching Tool", content: "Repeatedly compare adjacent elements and swap if out of order. The largest element 'bubbles' to the end. O(n²) average, O(n) best (already sorted). Stable and in‑place. Rarely used in practice due to poor performance." },
                  { title: "Insertion Sort – Useful for Small Data", content: "Take each element from the unsorted part and insert it into its correct position in the sorted part. O(n²) worst, but O(n) if nearly sorted. Stable and in‑place. Often used as the base case for recursive sorts." },
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
        description: "Trees, graphs, hash tables, advanced sorting, recursion, dynamic programming, and string algorithms.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Trees and Hash Tables",
            slug: "trees-hash",
            description: "Binary trees, BSTs, balanced trees, and hash maps.",
            topics: [
              {
                title: "Binary Trees – Hierarchical Data",
                slug: "binary-trees",
                shortDescription: "Traversals (pre‑, in‑, post‑order), depth, height.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Tree Basics – A Family Tree Analogy", content: "A binary tree is a hierarchical structure where each node has at most two children – left and right. The root is the top node, leaves have no children. Depth is distance from root; height is the longest path to a leaf. Trees are used in file systems, HTML DOM, and decision trees." },
                  { title: "Traversals – Visiting Every Node", content: "Three depth‑first orders: **Pre‑order** (root, left, right) – used to copy a tree; **In‑order** (left, root, right) – gives sorted order in a BST; **Post‑order** (left, right, root) – used to delete a tree. **Level‑order** (BFS) uses a queue and visits layer by layer. All are O(n)." },
                  { title: "Height and Depth – Recursive Computation", content: "Height of a node = 0 if leaf, else 1 + max(height(left), height(right)). This is a classic recursive problem and O(n). Be careful with unbalanced trees – they can cause O(n²) in some algorithms." },
                ],
              },
              {
                title: "Binary Search Trees (BST) – Ordered Data",
                slug: "bst",
                shortDescription: "BST operations: insert, delete, search, and traversal.",
                estimatedMinutes: 26,
                sections: [
                  { title: "BST Property – The Golden Rule", content: "For every node, all keys in the left subtree are smaller, and all in the right subtree are larger. This enables O(log n) search, insert, and delete on average. However, if the tree becomes skewed (e.g., inserting sorted data), operations degrade to O(n). That's why balanced trees (AVL, Red‑Black) exist." },
                  { title: "Search and Insert", content: "Search: start at root, compare target; go left/right accordingly. Insert: follow the same path and attach the new node when you reach null. Both are O(height)." },
                  { title: "Delete – The Tricky Case", content: "Three cases: (1) leaf – simply remove; (2) one child – replace the node with its child; (3) two children – find the inorder successor (smallest in right subtree) or predecessor (largest in left), copy its value, then delete that successor/predecessor (which will have at most one child). This maintains the BST property." },
                  { title: "Validating a BST", content: "Use in‑order traversal and check if the sequence is strictly increasing. Alternatively, use a recursive range check: each node must be within (min, max). Start with (-∞, +∞) and update min/max for left/right children." },
                ],
              },
              {
                title: "Hash Tables – The Magic of Key‑Value Storage",
                slug: "hash-tables",
                shortDescription: "HashMap implementation, collisions, and complexity.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Hash Function – Mapping Keys to Indices", content: "A hash table uses a hash function to map a key to an integer index in an array. A good hash function distributes keys uniformly to minimize collisions. In many languages, objects have a built‑in `hashCode()` method." },
                  { title: "Collision Resolution – Chaining vs Open Addressing", content: "**Chaining**: each bucket is a linked list of entries. Collisions add to the list. Simple and handles deletions well. **Open Addressing**: when a collision occurs, probe for the next free slot (linear probing, quadratic, double hashing). Chaining is more common." },
                  { title: "Load Factor and Resizing", content: "The load factor is entries / buckets. When it exceeds a threshold (e.g., 0.75), the table resizes (usually doubles) and rehashes all entries. This ensures O(1) average operations. Resizing is expensive, so setting an appropriate initial capacity helps." },
                  { title: "Real‑World Applications", content: "Hash tables are ubiquitous: caches (Redis), symbol tables (compilers), counting frequencies, detecting duplicates, and implementing sets and maps." },
                ],
              },
            ],
          },
          {
            title: "Graphs and Advanced Sorting",
            slug: "graphs-advanced",
            description: "Graph representation, BFS, DFS, and advanced sorting.",
            topics: [
              {
                title: "Graph Representation – Adjacency List vs Matrix",
                slug: "graph-representation",
                shortDescription: "Adjacency list vs matrix.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Adjacency List – Sparse Graph Champion", content: "An array of lists where each vertex has a list of neighbours. Space O(V+E) – good for sparse graphs. Iterating over neighbours is fast. Edge lookup is O(degree) unless you use a HashSet." },
                  { title: "Adjacency Matrix – Dense Graph Choice", content: "A V×V matrix where `matrix[u][v]` indicates edge presence. Space O(V²) – good for dense graphs. Edge lookup O(1), but iterating neighbours requires scanning a whole row – O(V)." },
                ],
              },
              {
                title: "BFS and DFS – Graph Traversals",
                slug: "bfs-dfs",
                shortDescription: "Breadth‑first and depth‑first traversal.",
                estimatedMinutes: 24,
                sections: [
                  { title: "BFS – Shortest Path in Unweighted Graphs", content: "BFS explores level by level using a queue. Starting from a source, it visits neighbours, then their neighbours, etc. It finds the shortest path (in edges) and is used in social networks, web crawling." },
                  { title: "DFS – Deep Exploration", content: "DFS goes as deep as possible using recursion or an explicit stack. It's used for cycle detection, topological sorting, connected components, and pathfinding. Be careful with recursion depth on large graphs." },
                  { title: "Applications", content: "**Cycle detection**: undirected – check visited neighbours other than parent; directed – use recursion stack. **Connected components**: BFS/DFS from each unvisited node. **Topological sort**: Kahn's algorithm (BFS) or DFS post‑order on a DAG." },
                ],
              },
              {
                title: "Merge Sort and Quick Sort – The Efficient Sorts",
                slug: "merge-quick-sort",
                shortDescription: "Efficient divide‑and‑conquer sorts.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Merge Sort – Guaranteed O(n log n)", content: "Divide the array in half, recursively sort each half, then merge. It's stable and O(n log n) in all cases. The merge step uses O(n) extra space, making it a good choice for linked lists (can be done in O(1) extra space by changing links)." },
                  { title: "Quick Sort – In‑Place and Fast", content: "Choose a pivot, partition the array so elements < pivot come before and > after, then recursively sort the partitions. Average O(n log n), worst O(n²) if pivot is poor. In‑place (O(log n) stack). Randomizing the pivot usually avoids the worst case." },
                ],
              },
            ],
          },
          {
            title: "String Algorithms – Pattern Matching and More",
            slug: "string-algorithms",
            description: "String search and manipulation algorithms.",
            topics: [
              {
                title: "Knuth‑Morris‑Pratt (KMP) Algorithm",
                slug: "kmp",
                shortDescription: "Linear‑time pattern matching using prefix function.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why KMP?", content: "Naive pattern matching is O(n*m). KMP avoids backtracking by using a prefix table (LPS – longest proper prefix which is also suffix). The LPS indicates how many characters to skip after a mismatch. This makes KMP O(n+m)." },
                  { title: "Building the LPS Array", content: "Compute for the pattern: `lps[i]` = length of the longest proper prefix that is also suffix. Example: for 'ABAB', lps = [0,0,1,2]." },
                  { title: "Searching with LPS", content: "Traverse the text, and when a mismatch occurs, use `j = lps[j-1]` to continue without resetting `i`. This ensures linear time." },
                ],
              },
              {
                title: "Rabin‑Karp Algorithm",
                slug: "rabin-karp",
                shortDescription: "Rolling hash for efficient pattern matching.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Idea", content: "Use a rolling hash to compute the hash of each window of the text and compare it with the pattern's hash. If they match, verify the actual string to avoid collisions. This gives average O(n+m) but worst O(n*m) due to hash collisions." },
                  { title: "Rolling Hash", content: "Use a base (e.g., 101) and compute hash of each window in O(1) by subtracting the outgoing character and adding the incoming character. Avoid overflow by using a large prime modulus." },
                ],
              },
            ],
          },
          {
            title: "Recursion and Dynamic Programming",
            slug: "recursion-dp",
            description: "Recursive thinking, memoization, and tabulation.",
            topics: [
              {
                title: "Recursion – The Self‑Calling Function",
                slug: "recursion",
                shortDescription: "Base case and recursive case.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Understanding Recursion", content: "Recursion is a technique where a function calls itself on a smaller instance of the same problem. Must have a base case to stop. Examples: factorial, Fibonacci, tree traversals. Recursion can make code elegant but can lead to stack overflow if depth is large." },
                  { title: "Fibonacci – The Naive Disaster", content: "`F(n) = F(n-1) + F(n-2)` recomputes the same subproblems many times, leading to O(2ⁿ) time. This is the classic motivation for DP." },
                  { title: "Tail Recursion", content: "If the recursive call is the last operation, some compilers can optimise it to a loop. For example, a tail‑recursive factorial uses an accumulator: `fact(n, acc) = fact(n-1, acc*n)`." },
                ],
              },
              {
                title: "Dynamic Programming – Caching Subproblem Results",
                slug: "dynamic-programming",
                shortDescription: "Memoization (top‑down) and tabulation (bottom‑up).",
                estimatedMinutes: 28,
                sections: [
                  { title: "DP – The Big Idea", content: "Break the problem into overlapping subproblems and store their results (memoization). Or, fill a table iteratively (tabulation). DP works when the problem has optimal substructure and overlapping subproblems." },
                  { title: "Fibonacci with DP – From Exponential to Linear", content: "Memoized recursive: O(n) time and O(n) space. Tabulation: O(n) time and O(1) space (only keep last two values)." },
                  { title: "Knapsack Problem – Classic DP", content: "0/1 knapsack: maximise value with weight capacity. `dp[i][w] = max(dp[i-1][w], dp[i-1][w - wt[i]] + val[i])`. Optimise to 1D array (O(W) space)." },
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
        description: "Advanced data structures (Trie, Segment Tree, Fenwick Tree, Union‑Find, AVL, Red‑Black), advanced graph algorithms (MST, SCC, shortest path), and greedy algorithms.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Advanced Data Structures",
            slug: "advanced-ds",
            description: "Trie, Segment Tree, Fenwick Tree, Union‑Find, AVL, Red‑Black.",
            topics: [
              {
                title: "Trie – The Prefix Tree",
                slug: "trie",
                shortDescription: "Prefix tree for string operations.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is a Trie?", content: "A trie is a tree where each node represents a character, and the path from the root to a node represents a prefix. It's used for fast prefix searches, autocomplete, and spell checking. Insertion and search are O(L) where L is the length of the word." },
                  { title: "Insert and Search", content: "To insert a word, traverse characters; create nodes if missing; mark the last node as endOfWord. Search: traverse; if missing or not endOfWord, return false." },
                  { title: "Autocomplete", content: "Given a prefix, traverse to the node; then collect all words from that node using DFS. This is how search engines suggest queries." },
                ],
              },
              {
                title: "Segment Tree – Range Queries",
                slug: "segment-tree",
                shortDescription: "Range queries and updates.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is a Segment Tree?", content: "A segment tree is a binary tree that stores aggregate information (sum, min, max) for a segment of an array. It can answer range queries and point updates in O(log n)." },
                  { title: "Building and Querying", content: "Build recursively: split the array in half. Query: for a range, if the node's segment is fully inside, return its value; if outside, return neutral; otherwise recurse to children." },
                  { title: "Lazy Propagation – For Range Updates", content: "For range adds, store a lazy value at the node. When you need to go deeper, push the lazy value to children. This keeps updates O(log n)." },
                ],
              },
              {
                title: "Fenwick Tree (BIT) – Prefix Sums",
                slug: "fenwick",
                shortDescription: "Efficient prefix sum queries.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The Binary Indexed Tree", content: "A Fenwick tree supports prefix sum queries and point updates in O(log n). It uses an array where each index stores the sum of a range determined by the lowest set bit." },
                  { title: "Update and Query", content: "Update: while i <= n, tree[i] += delta; i += i & -i. Query: while i > 0, sum += tree[i]; i -= i & -i. The LSB tells you how many elements that index covers." },
                ],
              },
              {
                title: "Union‑Find (Disjoint Set)",
                slug: "union-find",
                shortDescription: "Set union and connectivity checks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is Union‑Find?", content: "Union‑Find (or Disjoint Set) keeps track of a partition of elements into disjoint sets. `find(x)` returns the representative of x's set; `union(x,y)` merges the sets. Used in Kruskal's algorithm and cycle detection." },
                  { title: "Path Compression and Union by Rank", content: "Without optimisations, find can be O(n). With path compression (make nodes point directly to the root) and union by rank (attach smaller to larger), the amortised time is nearly O(1) (inverse Ackermann)." },
                  { title: "Applications", content: "Kruskal's algorithm for MST, detecting cycles in undirected graphs, and dynamic connectivity problems." },
                ],
              },
              {
                title: "Balanced Trees – AVL and Red‑Black",
                slug: "balanced-trees",
                shortDescription: "Self‑balancing BSTs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why Balanced Trees?", content: "To guarantee O(log n) operations even when data is inserted in sorted order. AVL and Red‑Black trees maintain balance through rotations." },
                  { title: "AVL Trees", content: "Strictly balanced: for every node, the height difference between left and right subtrees is at most 1. Rotations (LL, RR, LR, RL) are performed to restore balance after insert/delete." },
                  { title: "Red‑Black Trees", content: "Less strict than AVL – nodes are coloured red or black. Properties: root is black, red nodes cannot have red children, every path from a node to null has the same number of black nodes. Used in Java TreeMap and C++ STL map." },
                ],
              },
            ],
          },
          {
            title: "Graph Algorithms – Shortest Paths, MST, and SCC",
            slug: "graph-algorithms",
            description: "Dijkstra, Bellman‑Ford, Floyd‑Warshall, Prim, Kruskal, Tarjan, Kosaraju.",
            topics: [
              {
                title: "Dijkstra's Algorithm – Shortest Path with Positive Weights",
                slug: "dijkstra",
                shortDescription: "Single‑source shortest path with non‑negative weights.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Greedy Approach", content: "Dijkstra uses a priority queue to always process the vertex with the smallest tentative distance. It relaxes edges (updates distances) and runs in O((V+E) log V) with a binary heap." },
                  { title: "Limitations", content: "Does not work with negative weights – use Bellman‑Ford. Used in GPS, network routing." },
                ],
              },
              {
                title: "Bellman‑Ford – Handling Negative Weights",
                slug: "bellman-ford",
                shortDescription: "Single‑source shortest path with negative weights.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Relaxation V‑1 Times", content: "Relax all edges V-1 times. After each pass, the shortest distances propagate. If a relaxation is possible on the V‑th pass, a negative cycle exists." },
                  { title: "Complexity", content: "O(V*E), slower but more general. Used in some routing protocols." },
                ],
              },
              {
                title: "Floyd‑Warshall – All‑Pairs Shortest Path",
                slug: "floyd-warshall",
                shortDescription: "All‑pairs shortest path.",
                estimatedMinutes: 22,
                sections: [
                  { title: "DP over Intermediate Vertices", content: "`dist[k][i][j]` = shortest path from i to j using only vertices 0..k as intermediates. Recurrence: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`. O(V³)." },
                  { title: "Use Cases", content: "Small graphs, transitive closure, finding negative cycles." },
                ],
              },
              {
                title: "Minimum Spanning Tree (MST) – Prim and Kruskal",
                slug: "mst",
                shortDescription: "Find a tree that connects all vertices with minimum total weight.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Kruskal's Algorithm", content: "Sort edges by weight, and add an edge if it doesn't create a cycle (using Union‑Find). O(E log E)." },
                  { title: "Prim's Algorithm", content: "Start from a vertex, grow the tree by adding the smallest edge that connects a vertex in the tree to a vertex outside. Use a priority queue. O(E log V)." },
                  { title: "Applications", content: "Network design, clustering." },
                ],
              },
              {
                title: "Strongly Connected Components (SCC) – Tarjan and Kosaraju",
                slug: "scc",
                shortDescription: "Find strongly connected components in a directed graph.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Kosaraju's Algorithm", content: "Do DFS on original graph to get finish order; reverse the graph; do DFS in decreasing finish order to find SCCs. O(V+E)." },
                  { title: "Tarjan's Algorithm", content: "Single DFS with lowlink values. O(V+E). Efficient and used in many libraries." },
                ],
              },
            ],
          },
          {
            title: "Greedy Algorithms – Making Locally Optimal Choices",
            slug: "greedy",
            description: "Activity selection, Huffman coding, coin change (canonical).",
            topics: [
              {
                title: "Activity Selection – Choose Maximum Non‑overlapping Intervals",
                slug: "activity-selection",
                shortDescription: "Schedule as many activities as possible.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The Greedy Choice", content: "Sort activities by finish time, then pick the earliest‑finishing activity that doesn't conflict. This yields the maximum number of activities." },
                  { title: "Proof of Optimality", content: "The earliest‑finishing activity always leaves the maximum remaining time for other activities." },
                ],
              },
              {
                title: "Huffman Coding – Optimal Prefix Codes",
                slug: "huffman",
                shortDescription: "Build an optimal prefix code for data compression.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Idea", content: "Build a binary tree where the most frequent characters have the shortest codes. Use a min‑heap to combine the two smallest frequencies." },
                  { title: "Algorithm", content: "Create a leaf for each character; repeatedly merge the two trees with the smallest frequencies; the final tree gives the codes." },
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
        description: "Common DSA interview questions, patterns, and problem‑solving strategies.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Problem Patterns",
            slug: "patterns",
            description: "Sliding window, two‑pointer, monotonic stack, etc.",
            topics: [
              {
                title: "Sliding Window",
                slug: "sliding-window",
                shortDescription: "Subarray/substring problems.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Fixed‑Size Window", content: "Compute the sum of the first window, then slide by adding the next element and subtracting the one that exits. O(n)." },
                  { title: "Variable‑Size Window", content: "Expand the window until a condition is met, then shrink from the left until the condition is broken. Used for 'longest substring without repeating'." },
                ],
              },
              {
                title: "Two‑Pointer",
                slug: "two-pointer",
                shortDescription: "From both ends or moving together.",
                estimatedMinutes: 18,
                sections: [
                  { title: "From Both Ends", content: "Pair sum, palindrome checks." },
                  { title: "Slow and Fast", content: "Cycle detection, finding middle, removing duplicates." },
                ],
              },
              {
                title: "Monotonic Stack",
                slug: "monotonic-stack",
                shortDescription: "Next greater/smaller element.",
                estimatedMinutes: 18,
                sections: [
                  { title: "The Concept", content: "Maintain a stack in increasing or decreasing order. Used to find next greater/smaller in O(n)." },
                ],
              },
            ],
          },
          {
            title: "Common Algorithms Questions",
            slug: "common-questions",
            description: "Trees, graphs, DP, and backtracking questions.",
            topics: [
              {
                title: "Tree Problems",
                slug: "tree-problems",
                shortDescription: "LCA, diameter, level order, and more.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Lowest Common Ancestor (LCA)", content: "Recursive approach: if root is null or equal to either node, return root; recurse left and right; if both non‑null, root is LCA." },
                  { title: "Diameter of a Tree", content: "Two BFS/DFS: first find the farthest node from any node; then find the farthest from that node – the distance is the diameter." },
                ],
              },
              {
                title: "Graph Problems",
                slug: "graph-problems",
                shortDescription: "Cycle detection, topological sort, connected components.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Cycle Detection", content: "Undirected: DFS with parent; directed: recursion stack." },
                  { title: "Topological Sort", content: "Kahn's algorithm or DFS with post‑order." },
                ],
              },
              {
                title: "Dynamic Programming Problems",
                slug: "dp-problems",
                shortDescription: "Knapsack, LIS, edit distance, and more.",
                estimatedMinutes: 28,
                sections: [
                  { title: "0/1 Knapsack", content: "Use DP table; recurrence `dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])`. Optimise to 1D." },
                  { title: "Longest Increasing Subsequence (LIS)", content: "O(n²) DP or O(n log n) with patience sorting." },
                  { title: "Edit Distance", content: "DP table `dp[i][j]`; recurrence if chars match else 1 + min of three operations." },
                ],
              },
            ],
          },
          {
            title: "Problem‑Solving Strategies",
            slug: "strategies",
            description: "Pattern recognition, brute force optimisation, and edge case handling.",
            topics: [
              {
                title: "From Brute Force to Optimised",
                slug: "optimization",
                shortDescription: "Identify bottlenecks and optimise.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Start Simple", content: "Implement brute‑force first to understand the problem." },
                  { title: "Look for Redundancy", content: "Use memoization, prefix sums, two‑pointers." },
                  { title: "Choose the Right Data Structure", content: "Hash map, heap, trie, etc." },
                ],
              },
              {
                title: "Edge Cases – Don't Forget Them",
                slug: "edge-cases",
                shortDescription: "Empty, single, duplicates, and negative values.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Input Bounds", content: "Test n=0, n=1, and maximum." },
                  { title: "Duplicates", content: "Check stability and counting." },
                  { title: "Negative Numbers", content: "Handle overflow and sign." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(dsaCategory);
  console.log("✅ DSA category seeded (ultra‑detailed)");
}

async function main() {
  await seedDSACategory();
}

main()
  .catch((error) => {
    console.error("DSA seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });