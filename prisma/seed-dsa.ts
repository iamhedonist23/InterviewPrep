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
                  { title: "Why arrays matter", content: "O(1) access." },
                  { title: "Two-pointer pattern", content: "Efficient O(n)." },
                  { title: "Sliding window", content: "Subarrays." },
                  { title: "Prefix sums", content: "Range queries." },
                  { title: "In-place manipulation", content: "Reverse, rotate." },
                  { title: "Interview strategy", content: "Clarify constraints." }
                ]
              },
              {
                title: "Big O Complexity",
                slug: "big-o",
                shortDescription: "Measure time and space complexity cleanly.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Big O", content: "Growth rate." },
                  { title: "Common classes", content: "O(1), O(n), O(n^2)." },
                  { title: "Analyzing loops", content: "Multiplication." },
                  { title: "Amortized analysis", content: "Resizing." },
                  { title: "Space complexity", content: "Extra memory." },
                  { title: "Trade-offs", content: "Time vs space." }
                ]
              },
              {
                title: "Hash Tables and Maps",
                slug: "hash-tables-maps",
                shortDescription: "Fast lookups and grouping with key-value storage.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Hash table mechanics", content: "Hash function, collisions." },
                  { title: "When to use", content: "Membership, counting." },
                  { title: "Frequency counting", content: "Count occurrences." },
                  { title: "Two-sum with a hash map", content: "O(n) solution." },
                  { title: "Worst-case behavior", content: "Collisions degrade." }
                ]
              },
              {
                title: "Linked Lists",
                slug: "linked-lists",
                shortDescription: "Sequential data with dynamic insertion and deletion.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Structure", content: "Node with next." },
                  { title: "Trade-offs", content: "Insertion vs access." },
                  { title: "Reversing a linked list", content: "Iterative." },
                  { title: "Fast and slow pointers", content: "Cycle detection." },
                  { title: "Singly vs doubly", content: "Extra pointer." }
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
                  { title: "Tree basics", content: "Root, leaves." },
                  { title: "Tree traversal", content: "In-order, pre-order." },
                  { title: "Binary search trees", content: "O(log n) search." },
                  { title: "Level-order traversal", content: "BFS." },
                  { title: "Balanced vs unbalanced", content: "Degenerate tree." }
                ]
              },
              {
                title: "Graphs",
                slug: "graphs",
                shortDescription: "Connected nodes with directed or undirected edges.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Graph representation", content: "Adjacency list/matrix." },
                  { title: "DFS and BFS", content: "Depth-first, breadth-first." },
                  { title: "Detecting cycles", content: "Back edges." },
                  { title: "Weighted shortest paths", content: "Dijkstra." },
                  { title: "Topological sort", content: "DAG ordering." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Dynamic programming, backtracking, and greedy.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Algorithm Design",
            slug: "algorithm-design",
            description: "DP, backtracking, and greedy.",
            topics: [
              {
                title: "Dynamic Programming",
                slug: "dynamic-programming",
                shortDescription: "Memoization, tabulation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Overlapping subproblems", content: "Fibonacci." },
                  { title: "Optimal substructure", content: "Knapsack." },
                  { title: "Memoization vs tabulation", content: "Top-down vs bottom-up." },
                  { title: "Common DP problems", content: "Coin change, LCS." }
                ]
              },
              {
                title: "Backtracking",
                slug: "backtracking",
                shortDescription: "Generate all possibilities, prune.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Recursive exploration", content: "N-Queens." },
                  { title: "Pruning", content: "Early exit." },
                  { title: "Subsets, permutations", content: "Classic problems." }
                ]
              },
              {
                title: "Greedy Algorithms",
                slug: "greedy",
                shortDescription: "Make locally optimal choices.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Activity selection", content: "Interval scheduling." },
                  { title: "Huffman coding", content: "Optimal prefix codes." },
                  { title: "Coin system", content: "If canonical." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Advanced data structures and graph algorithms.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Advanced Structures",
            slug: "advanced-structures",
            description: "Trie, segment tree, Fenwick tree.",
            topics: [
              {
                title: "Trie",
                slug: "trie",
                shortDescription: "String prefix matching.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Structure", content: "Nodes with children." },
                  { title: "Insert and search", content: "O(length)." },
                  { title: "Autocomplete", content: "Prefix search." }
                ]
              },
              {
                title: "Segment Tree",
                slug: "segment-tree",
                shortDescription: "Range queries, updates.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Build", content: "Recursive division." },
                  { title: "Query", content: "Range sum/min." },
                  { title: "Point update", content: "Propagate changes." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common DSA interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "DSA Interview Topics",
            slug: "dsa-interview",
            description: "Frequently asked DSA topics.",
            topics: [
              {
                title: "Sorting and Searching",
                slug: "dsa-interview-sort-search",
                shortDescription: "Binary search, merge sort, quick sort.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Binary search", content: "O(log n)." },
                  { title: "Merge sort", content: "O(n log n), stable." },
                  { title: "Quick sort", content: "In-place, pivot." }
                ]
              },
              {
                title: "Tree Problems",
                slug: "dsa-interview-trees",
                shortDescription: "Lowest common ancestor, subtree.",
                estimatedMinutes: 22,
                sections: [
                  { title: "LCA", content: "Using parent pointers or binary lifting." },
                  { title: "Diameter", content: "Two DFS." },
                  { title: "Inorder traversal", content: "BST property." }
                ]
              }
            ],
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