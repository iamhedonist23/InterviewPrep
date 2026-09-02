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

async function seedDSACategory() {
  const dsaCategory = {
    name: "DSA Fundamentals",
    slug: "dsa-fundamentals",
    description: "Review the most common data structures and algorithm patterns used in coding interviews.",
    icon: "DSA",
    sortOrder: 3,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Core algorithm and data-structure thinking for technical interviews.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Core Structures",
            slug: "core-structures",
            description: "The most common structures and how they behave.",
            topics: [
              {
                title: "Arrays and Strings",
                slug: "arrays-strings",
                shortDescription: "Indexed data and sequential processing patterns.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Why arrays matter", content: "Arrays are simple, fast for indexed access (O(1)), and the basis for many algorithm patterns. Strings are often treated as arrays of characters during interviews." },
                  { title: "Two-pointer pattern", content: "Two pointers move through a sequence (from ends inward, or both forward at different speeds) to solve problems in O(n) instead of O(n^2).\n\nExample (two-sum on sorted array):\nleft, right = 0, len(arr) - 1\nwhile left < right:\n    s = arr[left] + arr[right]\n    if s == target: return [left, right]\n    elif s < target: left += 1\n    else: right -= 1" },
                  { title: "Sliding window", content: "A sliding window tracks a contiguous subrange, expanding and shrinking it to satisfy a condition, useful for subarray/substring problems.\n\nExample (max sum of size-k window):\nwindow_sum = sum(arr[:k])\nbest = window_sum\nfor i in range(k, len(arr)):\n    window_sum += arr[i] - arr[i-k]\n    best = max(best, window_sum)" },
                  { title: "Prefix sums", content: "Precomputing cumulative sums allows range-sum queries in O(1) after O(n) preprocessing, instead of recomputing the sum each time." },
                  { title: "In-place manipulation", content: "Many array problems (reverse, rotate, remove duplicates from sorted array) can be solved without extra space by swapping or overwriting elements as you traverse." },
                  { title: "Interview strategy", content: "Start by clarifying whether the array is sorted, whether duplicates exist, and the required time/space complexity — these constraints usually point directly at the right pattern." }
                ]
              },
              {
                title: "Big O Complexity",
                slug: "big-o",
                shortDescription: "Measure time and space complexity cleanly.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What Big O measures", content: "Big O describes the growth rate of an algorithm's time or space as the input size grows. It abstracts away constant factors and lower-order terms to focus on scaling." },
                  { title: "Common complexity classes", content: "O(1) constant, O(log n) logarithmic (binary search), O(n) linear, O(n log n) (efficient sorting), O(n^2) quadratic (nested loops), O(2^n) exponential (brute-force subsets)." },
                  { title: "Analyzing loops", content: "A single loop over n elements is O(n). Nested loops multiply: a loop inside a loop over the same n is O(n^2). Sequential (non-nested) loops add: O(n) + O(m) stays O(n+m)." },
                  { title: "Amortized analysis", content: "Some operations are usually cheap but occasionally expensive (like dynamic array resizing). Amortized analysis averages the cost over many operations, showing append is O(1) amortized even though occasional resizes are O(n)." },
                  { title: "Space complexity", content: "Space complexity counts extra memory used relative to input size, including recursion stack frames — a recursive solution can be time-efficient but space-expensive." },
                  { title: "Common trade-offs", content: "A hash lookup gives average O(1) time at the cost of O(n) space; a nested loop uses O(1) extra space but O(n^2) time. The best solution depends on the given constraints." }
                ]
              },
              {
                title: "Hash Tables and Maps",
                slug: "hash-tables-maps",
                shortDescription: "Fast lookups and grouping with key-value storage.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Hash table mechanics", content: "A hash table uses a hash function to map keys to array indices (buckets). Collisions, where two keys hash to the same bucket, are handled through chaining (linked lists per bucket) or open addressing (probing for the next free slot)." },
                  { title: "When to use", content: "Hash tables are ideal for membership tests, frequency counting, and caching because of average O(1) lookup, insert, and delete time." },
                  { title: "Frequency counting pattern", content: "A very common interview pattern counts occurrences of items using a hash map.\n\nExample:\ncounts = {}\nfor x in nums:\n    counts[x] = counts.get(x, 0) + 1" },
                  { title: "Two-sum with a hash map", content: "Storing seen values with their indices lets you find a complementary pair in a single O(n) pass instead of O(n^2).\n\nExample:\nseen = {}\nfor i, x in enumerate(nums):\n    if target - x in seen:\n        return [seen[target - x], i]\n    seen[x] = i" },
                  { title: "Worst-case behavior", content: "A poorly distributed hash function can degrade all operations to O(n) if too many keys collide into the same bucket, which is why good hash functions matter." }
                ]
              },
              {
                title: "Linked Lists",
                slug: "linked-lists",
                shortDescription: "Sequential data with dynamic insertion and deletion.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Structure", content: "A linked list is a chain of nodes, each holding data and a reference to the next. There's no array indexing; you traverse by following pointers." },
                  { title: "Trade-offs", content: "Linked lists are good for O(1) insertion/deletion at a known position but slow (O(n)) for random access. Arrays are the opposite: O(1) access, O(n) insertion in the middle." },
                  { title: "Reversing a linked list", content: "A classic interview problem: iterate while re-pointing each node's next to the previous node.\n\nExample:\nprev = None\nwhile head:\n    nxt = head.next\n    head.next = prev\n    prev = head\n    head = nxt" },
                  { title: "Fast and slow pointers", content: "Two pointers moving at different speeds detect cycles (Floyd's algorithm) and find the middle of a list in a single pass." },
                  { title: "Singly vs doubly linked", content: "A doubly linked list adds a previous pointer, enabling O(1) backward traversal and easier deletion, at the cost of extra memory per node." }
                ]
              }
            ],
          },
          {
            title: "Intermediate Structures",
            slug: "intermediate-structures",
            description: "Trees, graphs, and specialized structures.",
            topics: [
              {
                title: "Binary Trees",
                slug: "binary-trees",
                shortDescription: "Hierarchical data with at most two children per node.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Tree basics", content: "A binary tree has a root and child nodes, each with at most two children (left and right). Leaves have no children. Height and balance affect algorithm performance." },
                  { title: "Tree traversal", content: "In-order (left, node, right), pre-order (node, left, right), and post-order (left, right, node) traversals visit nodes in different sequences, each useful for different problems.\n\nExample (in-order, recursive):\ndef inorder(node):\n    if not node: return []\n    return inorder(node.left) + [node.val] + inorder(node.right)" },
                  { title: "Binary search trees", content: "A BST keeps left children smaller and right children larger than their parent, enabling O(log n) search, insert, and delete on a balanced tree." },
                  { title: "Level-order traversal (BFS)", content: "Visiting nodes level by level uses a queue, processing all nodes at the current depth before moving to the next." },
                  { title: "Balanced vs unbalanced", content: "A degenerate tree (essentially a linked list) gives O(n) operations; self-balancing trees like AVL or red-black trees maintain O(log n) height automatically." }
                ]
              },
              {
                title: "Graphs",
                slug: "graphs",
                shortDescription: "Connected nodes with directed or undirected edges.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Graph representation", content: "Graphs can be represented as adjacency lists (a map from node to its neighbors, space-efficient for sparse graphs) or adjacency matrices (a grid of connections, fast edge lookups but O(n^2) space)." },
                  { title: "DFS and BFS", content: "Depth-first search explores as far as possible along each branch before backtracking (using recursion or a stack); breadth-first search explores level by level (using a queue). Each is suited to different problems: BFS finds shortest paths in unweighted graphs." },
                  { title: "Detecting cycles", content: "In a directed graph, tracking nodes in the current recursion path (not just visited) detects back edges that indicate cycles." },
                  { title: "Weighted shortest paths", content: "Dijkstra's algorithm finds shortest paths from a source in graphs with non-negative weights, using a priority queue to always expand the closest unvisited node." },
                  { title: "Topological sort", content: "For a directed acyclic graph, a topological sort orders nodes so every edge points forward — useful for task scheduling with dependencies." }
                ]
              }
            ]
          }
        ],
      },
    ],
  };

  await ensureCategory(dsaCategory);
  console.log("✓ DSA Fundamentals category seeded");
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
