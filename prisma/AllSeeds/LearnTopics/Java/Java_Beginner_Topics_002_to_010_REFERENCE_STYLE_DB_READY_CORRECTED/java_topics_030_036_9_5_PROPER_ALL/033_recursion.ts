import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 33/356
 *
 * Deep learning edition: first-principles explanation, execution model,
 * examples, edge cases, practical design, misconceptions, and practice.
 */

const prisma = new PrismaClient();

export type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};

export const topic: TopicSeed = {
  title: "Recursion",
  slug: "recursion",
  description: "Learn recursion through the call stack and a clear base-case model, then build toward recursive data structures, tree traversal, backtracking, divide-and-conquer, memoization, debugging, and the trade-offs between recursion and iteration.",
  estimatedMinutes: 55,
  sections: [
    {
      title: "What recursion actually is",
      content: "Recursion occurs when a method solves a problem by calling itself with a smaller or simpler version of the same problem.\n\nA recursive method needs two parts:\n\n1. A **base case** that stops recursion.\n2. A **recursive case** that moves toward that base case.\n\nExample:\n\n```java\nstatic int factorial(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n\n    return n * factorial(n - 1);\n}\n```\n\nThe recursive call is not magic. It is an ordinary method invocation. The difference is that the method being invoked happens to have the same name.\n\nFor `factorial(4)`, the problem becomes:\n\n```text\nfactorial(4)\n  -> 4 * factorial(3)\n       -> 3 * factorial(2)\n            -> 2 * factorial(1)\n                 -> 1\n```\n\nThen the results return in the opposite direction.",
    },
    {
      title: "The call stack explains recursion",
      content: "Every method invocation needs its own local execution state. Java tracks active method calls using stack frames.\n\nFor:\n\n```java\nfactorial(3)\n```\n\nthe conceptual stack grows like:\n\n```text\nfactorial(1)\nfactorial(2)\nfactorial(3)\nmain\n```\n\n`factorial(1)` reaches the base case and returns. Then `factorial(2)` can finish, followed by `factorial(3)`.\n\nThis explains why recursive methods can use significant memory. Each unfinished call remains active until the deeper call returns.\n\nRecursion therefore has two dimensions:\n\n- **Correctness:** does every recursive path eventually reach a base case?\n- **Resource usage:** how many calls can be active at once?\n\nA mathematically correct recursive algorithm can still fail in practice if the recursion depth becomes too large.",
    },
    {
      title: "Base cases are not optional",
      content: "Without a valid base case, recursion does not know when to stop.\n\nThis is broken:\n\n```java\nstatic void countDown(int n) {\n    System.out.println(n);\n    countDown(n - 1);\n}\n```\n\nEventually the call continues until the stack cannot support another invocation, resulting in `StackOverflowError`.\n\nA base case must also be reachable.\n\nThis is logically wrong:\n\n```java\nstatic int bad(int n) {\n    if (n < 0) {\n        return 0;\n    }\n\n    return bad(n - 1);\n}\n```\n\nFor a positive `n`, the method eventually reaches `-1`, so this particular condition is reachable; but if the recursive transformation moved in the opposite direction, the same-looking condition could become unreachable.\n\nWhen reviewing recursion, always ask: **What input stops the method, and does every recursive path move toward it?**",
    },
    {
      title: "Tracing a recursive method",
      content: "Consider:\n\n```java\nstatic int sum(int n) {\n    if (n == 0) {\n        return 0;\n    }\n\n    return n + sum(n - 1);\n}\n```\n\nFor `sum(3)`:\n\n```text\nsum(3)\n= 3 + sum(2)\n= 3 + (2 + sum(1))\n= 3 + (2 + (1 + sum(0)))\n= 3 + (2 + (1 + 0))\n= 6\n```\n\nNotice that the method does not immediately know the final answer at each level. Each invocation waits for the deeper invocation to return.\n\nThis is a useful debugging technique: write each call as a separate line and mark where it pauses. Then trace the returns back upward.\n\nMany recursion bugs become obvious once the call stack is written out explicitly.",
    },
    {
      title: "Recursion over trees",
      content: "Recursion becomes especially natural when the data itself is recursive.\n\nA tree node can contain child nodes that are themselves trees:\n\n```java\nclass Node {\n    int value;\n    Node left;\n    Node right;\n}\n```\n\nA traversal can mirror that structure:\n\n```java\nstatic void print(Node node) {\n    if (node == null) {\n        return;\n    }\n\n    print(node.left);\n    System.out.println(node.value);\n    print(node.right);\n}\n```\n\nThe base case is a missing node. The recursive cases process the left and right subtrees.\n\nThis is a major reason recursion is valuable: the code structure can closely match the structure of the problem. Tree traversal, directory traversal, syntax trees, and nested structures often become simpler to express recursively than with manually managed stacks.",
    },
    {
      title: "Multiple recursive calls and growth",
      content: "Not all recursion makes one recursive call.\n\nFor example, a naive Fibonacci implementation:\n\n```java\nstatic int fib(int n) {\n    if (n <= 1) {\n        return n;\n    }\n\n    return fib(n - 1) + fib(n - 2);\n}\n```\n\ncreates a branching call tree.\n\n```text\nfib(4)\n├── fib(3)\n│   ├── fib(2)\n│   └── fib(1)\n└── fib(2)\n    ├── fib(1)\n    └── fib(0)\n```\n\nThe same smaller values are calculated repeatedly. This makes the naive algorithm exponentially expensive.\n\nThe problem is not recursion itself. The problem is repeated work.\n\nMemoization can store results:\n\n```java\nMap<Integer, Integer> memo = new HashMap<>();\n```\n\nso that each subproblem is solved once.\n\nThis distinction is important when evaluating recursive code: count both the maximum depth and the total number of calls.",
    },
    {
      title: "Backtracking",
      content: "Backtracking uses recursion to explore choices and undo them when a path cannot produce a solution.\n\nA simplified pattern looks like:\n\n```java\nvoid search(State state) {\n    if (isComplete(state)) {\n        recordSolution(state);\n        return;\n    }\n\n    for (Choice choice : choices(state)) {\n        apply(choice, state);\n        search(state);\n        undo(choice, state);\n    }\n}\n```\n\nThe recursive call explores one possible decision. After it returns, the method restores the previous state and tries another decision.\n\nThis pattern appears in permutations, combinations, maze solving, constraint problems, and many puzzle algorithms.\n\nThe critical correctness rule is that the state must be restored correctly. A missing `undo` step can cause one branch's changes to leak into another branch.",
    },
    {
      title: "Recursion versus iteration",
      content: "Many recursive algorithms can be rewritten using loops.\n\nA loop often has advantages when the problem is naturally sequential:\n\n```java\nstatic int factorial(int n) {\n    int result = 1;\n\n    for (int i = 2; i <= n; i++) {\n        result *= i;\n    }\n\n    return result;\n}\n```\n\nThe iterative version avoids growing the call stack.\n\nRecursion can be preferable when:\n\n- the problem has naturally nested structure;\n- a tree or graph traversal is easier to express recursively;\n- divide-and-conquer maps cleanly onto the problem;\n- backtracking is easier to read as nested decisions.\n\nIteration can be preferable when recursion depth could become large or when a simple loop communicates the algorithm more directly.\n\nDo not choose recursion simply because the recursive version is shorter. Choose it when the recursive structure improves clarity without creating unacceptable resource costs.",
    },
    {
      title: "Common recursion mistakes",
      content: "### Missing base case\n\nThe method never stops.\n\n### Base case is unreachable\n\nThe method has a stopping condition, but recursive calls never move toward it.\n\n### Wrong progress\n\nFor example, calling `work(n + 1)` when the base case requires reaching zero.\n\n### Excessive depth\n\nEven correct recursion can overflow the call stack for sufficiently deep input.\n\n### Shared mutable state\n\nRecursive algorithms that modify a shared object must carefully undo or isolate changes.\n\n### Repeated work\n\nBranching recursion can recompute identical subproblems. Memoization or dynamic programming may be needed.\n\nWhen debugging recursion, trace both the **argument values** and the **state being changed**. Looking only at the method's source code often hides the actual sequence of calls.",
    },
    {
      title: "Practice: trace and design",
      content: "### Exercise 1\n\nTrace:\n\n```java\nstatic int sum(int n) {\n    if (n == 0) return 0;\n    return n + sum(n - 1);\n}\n```\n\nPredict `sum(4)` before running it.\n\n### Exercise 2\n\nWrite a recursive method that prints a string in reverse.\n\n### Exercise 3\n\nWrite a recursive tree traversal and identify its base case.\n\n### Exercise 4\n\nTake a recursive solution and estimate:\n\n- maximum recursion depth;\n- number of calls;\n- extra memory used.\n\nThe goal is to learn to evaluate recursion as an execution process, not just as a method that happens to call itself.",
    },
  ],
};

export default topic;

export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 32,
) {
  const savedTopic = await prisma.studyTopic.upsert({
    where: {
      categoryId_slug: {
        categoryId,
        slug: topic.slug,
      },
    },
    update: {
      title: topic.title,
      moduleId,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder,
    },
    create: {
      categoryId,
      moduleId,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder,
      prerequisiteIds: [],
      relatedTopicIds: [],
    },
  });

  for (let index = 0; index < (topic.sections ?? []).length; index += 1) {
    const section = topic.sections![index];

    await prisma.studyTopicSection.upsert({
      where: { id: `${savedTopic.id}-section-${index}` },
      update: {
        title: section.title,
        content: section.content,
        sortOrder: index,
      },
      create: {
        id: `${savedTopic.id}-section-${index}`,
        topicId: savedTopic.id,
        title: section.title,
        content: section.content,
        sortOrder: index,
      },
    });
  }

  return savedTopic;
};