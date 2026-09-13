import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
 title: string;
 slug: string;
 description: string;
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

const modules: ModuleSeed[] = [
 {
 title: "Introduction",
 slug: "introduction",
 description: "Learn introduction with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "DSA SCOPE",
 slug: "introduction-what-this-guide-covers",
 description: "Understand the scope of data structures and algorithms with clear concepts, explanations, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic provides implementations and explanations in language-independent\npseudocode.",
 },
 {
 title: "Detailed explanation",
 content: "This topic provides implementations and explanations in language-independent\npseudocode. The pseudocode is intended to be portable to mainstream imperative\nlanguages such as C++, C#, and Java.\n\nThis explanation uses Big-O notation as an abstract way of discussing\nruntime. This lets the reader reason about how an algorithm scales without\ndepending on a particular processor, compiler, or machine.\n\nA useful distinction is:\n\nCorrectness: Does the algorithm produce the intended result?\nEfficiency: How does its work grow as the input grows?\nSpace: How much additional storage does it require?\nSuitability: Is the data structure/algorithm appropriate for the workload?\n\nIt is also important to remember that that implementation details can affect actual\nperformance. Compiler optimization, runtime behavior, memory management,\nand language implementation can change observed execution time even when\ntwo algorithms have the same theoretical complexity.",
 },
 {
 title: "Practice",
 content: "Trace a small example of what this topic covers by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "ASSUMED KNOWLEDGE",
 slug: "introduction-assumed-knowledge",
 description: "Understand assumed knowledge with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, assumed Knowledge is a practical DSA idea that helps you choose, implement, or analyze a solution.",
 },
 {
 title: "Detailed explanation",
 content: "Before going further, it helps to be comfortable with:\n\n1. Big-O notation\n2. An imperative programming language\n3. Basic object-oriented concepts",
 },
 {
 title: "Practice",
 content: "Trace a small example of assumed knowledge by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "BIG-O NOTATION",
 slug: "introduction-big-o-notation",
 description: "Understand big-o notation with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, big-O describes the growth of an algorithm as input size increases.",
 },
 {
 title: "Detailed explanation",
 content: "Big-O describes the growth of an algorithm as input size increases.\n\nCommon complexity classes:\n\n**O(1) — Constant**\nThe amount of work does not depend on input size.\n\n**Example:** Adding to the tail of a linked list when a tail reference is maintained.\n\n**O(log n) — Logarithmic**\nThe problem is repeatedly reduced to a smaller portion.\n\n**Example:** Searching a reasonably balanced BST.\n\n**O(n) — Linear**\nWork grows proportionally with the number of input elements.\n\n**Example:** Scanning every element of a list.\n\n**O(n log n)**\nCommon for divide-and-conquer sorting approaches.\n\n**O(n²) — Quadratic**\nWork grows roughly with the square of input size.\n\n**Example:** Bubble sort and insertion sort in their expensive cases.\n\n**O(n³) — Cubic**\nUsually undesirable except for very small problem sizes.\n\n**O(2ⁿ) — Exponential**\nGrowth is extremely fast and is generally unsuitable for large inputs.\n\nThe key idea is growth rate. For sufficiently large n, an algorithm with a\nslower-growing complexity can outperform one with a faster-growing complexity\neven when the latter initially appears competitive on small inputs.\n\nBig-O is also a communication tool. Saying “this solution is O(n log n)”\ncommunicates an important scalability property much more quickly than describing\nevery implementation detail.\n\nA useful habit is to review loops and recursive calls when trying\nto improve runtime.",
 },
 {
 title: "Complexity",
 content: "O(1) — Constant",
 },
 {
 title: "Practice",
 content: "Trace a small example of big-o notation by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "IMPERATIVE PROGRAMMING",
 slug: "introduction-imperative-programming",
 description: "Understand imperative programming with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, the algorithms use imperative thinking: variables are changed, loops are\nexecuted, branches are selected, and procedures operate on mutable data.",
 },
 {
 title: "Detailed explanation",
 content: "The algorithms use imperative thinking: variables are changed, loops are\nexecuted, branches are selected, and procedures operate on mutable data.\n\nWhen translating the pseudocode:\n\n- references in a managed language may correspond to pointers in C++;\n- memory-management behavior differs between languages;\n- language syntax must be adapted;\n- the underlying algorithmic logic should remain recognizable.\n\nOne important practical point is that Java and C# normally execute on managed\nruntimes with garbage collection, whereas C++ commonly requires explicit\nattention to pointer and memory management.",
 },
 {
 title: "Practice",
 content: "Trace a small example of imperative programming by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "OBJECT-ORIENTED CONCEPTS",
 slug: "introduction-object-oriented-concepts",
 description: "Understand object-oriented concepts with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, these concepts are especially useful when translating data-structure designs\ninto object-oriented implementations.",
 },
 {
 title: "Detailed explanation",
 content: "Before going further, it helps to be comfortable with:\n\n- inheritance\n- encapsulation\n- polymorphism\n- interfaces\n\nThese concepts are especially useful when translating data-structure designs\ninto object-oriented implementations.",
 },
 {
 title: "Practice",
 content: "Trace a small example of object-oriented concepts by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "PSEUDOCODE",
 slug: "introduction-pseudocode",
 description: "Understand pseudocode with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic use a consistent pseudocode style.",
 },
 {
 title: "Detailed explanation",
 content: "This topic use a consistent pseudocode style.\n\nA typical algorithm has:\n\nalgorithm AlgorithmName(arguments)\nPre: conditions that must be true before execution\nPost: result/state expected after execution\n ...\nend AlgorithmName\n\nImportant rules:\n\nPreconditions\nState what must be true before the algorithm starts. Examples include\nnon-null input or a collection containing enough elements.\n\nPostconditions\nDescribe what the algorithm guarantees after it completes.\n\nParameter types\nAre often inferred from context instead of being written explicitly.\n\nExplicit block endings\nConstructs such as loops are explicitly ended, making nested algorithms\neasier to read.\n\n“yield”\nShould be understood as returning successive values as part of a sequence,\nrather than terminating the algorithm in the same way as a normal return.\n\nWhen translating an algorithm into production code, preconditions should not be\nignored. They must be validated or represented using the target language’s\nerror-handling approach.",
 },
 {
 title: "Practice",
 content: "Trace a small example of pseudocode by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "WORKING THROUGH EXAMPLES",
 slug: "introduction-working-through-examples",
 description: "Understand working through examples with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a major study technique recommended by This topic is tracing algorithms manually.",
 },
 {
 title: "Detailed explanation",
 content: "A major study technique recommended by This topic is tracing algorithms manually.\n\nFor an iterative algorithm:\n\n1. Identify every important variable.\n2. Create a trace table.\n3. Give each variable its own column.\n4. Execute the algorithm statement by statement.\n5. Record every meaningful mutation.\n\nFor data structures, also draw the structure. For example:\n\nLinked list:\n HEAD -> [value | next] -> [value | next] -> NULL\n\nTree:\nroot\n / \\\nleft right\n\nFor recursive algorithms, additionally record:\n\n- which method calls which;\n- the input passed to each call;\n- where each call returns;\n- what value is returned.\n\nThis is more reliable than attempting to hold a complicated sequence of state\nchanges entirely in your head.",
 },
 {
 title: "Practice",
 content: "Trace a small example of working through examples by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "STUDY STRUCTURE AND ORDER",
 slug: "introduction-guide-structure-and-study-order",
 description: "Understand a practical order for studying data structures and algorithms.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic divides its material into:.",
 },
 {
 title: "Detailed explanation",
 content: "This topic divides its material into:\n\nPART I — Data Structures\nPART II — Algorithms\n\nData-structure chapters concentrate on operations such as insertion, deletion,\nand searching.\n\nAlgorithm chapters cover sorting, numeric problems, searching, and strings.\n\nThe chapters are sufficiently independent that they do not have to be read in\na strict linear order. However, understanding the basic structures before the\nalgorithms makes many later examples easier to follow.",
 },
 {
 title: "Practice",
 content: "Choose a small DSA problem, identify the data structure involved, trace the solution by hand, and then implement it.",
 },
 ],
 },
 {
 title: "TESTING",
 slug: "introduction-testing",
 description: "Understand testing with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, unit testing is treated here as as an important part of algorithm development.",
 },
 {
 title: "Detailed explanation",
 content: "Unit testing is treated here as as an important part of algorithm development.\n\nA good algorithm should be tested against:\n\n- normal cases;\n- empty cases;\n- boundary cases;\n- unusual cases;\n- failure cases;\n- cases that exercise tricky branches.\n\nA useful approach is to break a difficult problem into smaller problems and\ntest those pieces systematically.",
 },
 {
 title: "Practice",
 content: "Trace a small example of testing by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "IMPLEMENTATION NOTES",
 slug: "introduction-code-implementation-notes",
 description: "Understand practical implementation details that matter when translating an algorithm into code.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic describes its algorithms in pseudocode and discusses a corresponding\nadapt details to the target language.",
 },
 {
 title: "Detailed explanation",
 content: "This topic describes its algorithms in pseudocode and discusses a corresponding\nadapt details to the target language.\n\nThe central goal is not to copy syntax. The goal is to preserve:\n\ninput assumptions\nstate transitions\nalgorithmic invariants\noutput guarantees\ncomplexity characteristics",
 },
 {
 title: "Practice",
 content: "Take one algorithm from this module, write the pseudocode first, then translate it into your programming language of choice.",
 },
 ],
 },
 {
 title: "FINAL STUDY GUIDANCE",
 slug: "introduction-final-study-guidance",
 description: "Understand final study guidance with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, the strongest study rule in This topic is:.",
 },
 {
 title: "Detailed explanation",
 content: "The strongest study rule in This topic is:\n\nUnderstand the algorithm abstractly first, then trace it manually.\n\nDo not start by memorizing code. First understand:\n\nWhat problem does this solve?\nWhy does this data structure fit the problem?\nWhat state does the algorithm maintain?\nWhat happens at each iteration/recursive call?\nWhat happens in edge cases?\nWhat is the runtime?",
 },
 {
 title: "Practice",
 content: "Trace a small example of final study guidance by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Linked Lists",
 slug: "linked-lists",
 description: "Learn linked lists with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "LINKED LISTS",
 slug: "linked-lists-linked-lists",
 description: "Understand linked lists with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nA linked list is a sequence of nodes connected by references.\n\nA singly linked node contains:\n\nvalue\nnext reference\n\nConceptually:\n\n [10 | next] -> [20 | next] -> [30 | NULL]\n\nThis topic’s linked-list implementation keeps references to both the head and tail.\n\nImportant characteristics stated in This topic:\n\ninsertion at the head/tail: O(1)\nsearching: O(n)\ngeneral deletion: O(n)\nrandom insertion in a singly linked list: O(n)\n\nThe reason insertion at an end can be constant time is that the list already\nmaintains a reference to the appropriate endpoint.\n\nA linked list grows dynamically. Unlike a fixed-size array, it does not require\nmoving the entire collection simply because the number of elements increased.",
 },
 {
 title: "Practice",
 content: "Trace a small example of linked lists by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SINGLY LINKED LIST",
 slug: "linked-lists-singly-linked-list",
 description: "Understand singly linked list with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, each node knows only the next node.",
 },
 {
 title: "Detailed explanation",
 content: "Each node knows only the next node.\n\nExample:\n\nHEAD\n |\nv\n [10] -> [45] -> [60] -> [12] -> NULL\n ^\nTAIL\n\nThe structure is naturally forward-oriented.",
 },
 {
 title: "Practice",
 content: "Trace a small example of singly linked list by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INSERTION",
 slug: "linked-lists-insertion",
 description: "Understand insertion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, to append a value:.",
 },
 {
 title: "Detailed explanation",
 content: "To append a value:\n\nCase 1 — Empty list\nThe new node becomes both head and tail.\n\nCase 2 — Non-empty list\nConnect the old tail to the new node and move tail to the new node.\n\nConceptual algorithm:\n\nnewNode = Node(value)\n\nif head is null:\nhead = newNode\ntail = newNode\nelse:\ntail.next = newNode\ntail = newNode\n\nComplexity:\nO(1) when inserting at the maintained head/tail positions.\n\nRandom insertion is different. If the required insertion point is in the\nmiddle and its predecessor is not already known, the list must be traversed.",
 },
 {
 title: "Complexity",
 content: "O(1) when inserting at the maintained head/tail positions.",
 },
 {
 title: "Practice",
 content: "Trace a small example of insertion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SEARCHING",
 slug: "linked-lists-searching",
 description: "Understand searching with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, search is performed by starting at head and moving through next references.",
 },
 {
 title: "Detailed explanation",
 content: "Search is performed by starting at head and moving through next references.\n\nExample:\n\n 10 -> 45 -> 60 -> 12\n\nSearching for 60:\n\ncompare 10\ncompare 45\ncompare 60\nmatch\n\nSearching for a missing value requires reaching NULL.\n\nComplexity:\nO(n)\n\nThere is no direct indexed access comparable to an array because finding the\nelement at position i requires walking through earlier nodes.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of searching by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DELETION",
 slug: "linked-lists-deletion",
 description: "Understand deletion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, deletion must handle several cases:.",
 },
 {
 title: "Detailed explanation",
 content: "Deletion must handle several cases:\n\n1. Empty list.\n2. Only one node exists.\n3. Removing the head.\n4. Removing the tail.\n5. Removing an interior node.\n6. Requested value is absent.\n\nFor a singly linked list, removing an interior node requires access to the\npredecessor because the predecessor’s next reference must be changed.\n\nExample:\n\nBefore:\n A -> B -> C -> D\n\nRemove C:\n\n A -> B -> D\n\nThe B node must be found so that:\n\nB.next = C.next\n\nIf deletion is always from the head, it becomes O(1).\n\nGeneral value-based deletion remains O(n) because locating the target/predecessor\nmay require traversal.",
 },
 {
 title: "Practice",
 content: "Trace a small example of deletion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "TRAVERSAL",
 slug: "linked-lists-traversal",
 description: "Understand traversal with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, forward traversal starts at head.",
 },
 {
 title: "Detailed explanation",
 content: "Forward traversal starts at head.\n\ncurrent = head\nwhile current != null:\nprocess current.value\ncurrent = current.next\n\nThe traversal ends when current becomes null.\n\nComplexity:\nO(n)\n\nThis topic use the idea of “yielding” each value while traversing so that the\ncaller can consume the sequence.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of traversal by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "REVERSE TRAVERSAL",
 slug: "linked-lists-reverse-traversal",
 description: "Understand reverse traversal with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a singly linked list does not have backward references.",
 },
 {
 title: "Detailed explanation",
 content: "A singly linked list does not have backward references.\n\nTherefore, if we start at tail and want to move backward, we repeatedly have\nto search from head for the node whose next reference points to the current\nnode.\n\nThat makes the operation expensive:\n\nfinding one predecessor: O(n)\ndoing it repeatedly: O(n^2)\n\nThis is one of the main motivations for a doubly linked list when reverse\nnavigation is important.",
 },
 {
 title: "Practice",
 content: "Trace a small example of reverse traversal by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DOUBLY LINKED LIST",
 slug: "linked-lists-doubly-linked-list",
 description: "Understand doubly linked list with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a doubly linked node has:.",
 },
 {
 title: "Detailed explanation",
 content: "A doubly linked node has:\n\nvalue\nnext\nprevious\n\nConceptually:\n\n NULL <- [10] <-> [45] <-> [60] <-> [12] -> NULL\n\nThe additional previous reference consumes more memory, but it provides\nbidirectional navigation.\n\nSearching and forward traversal are conceptually similar to singly linked lists.",
 },
 {
 title: "Practice",
 content: "Trace a small example of doubly linked list by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INSERTION",
 slug: "linked-lists-insertion",
 description: "Understand insertion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, when adding to the tail, the new node must be connected in both directions.",
 },
 {
 title: "Detailed explanation",
 content: "When adding to the tail, the new node must be connected in both directions.\n\nConceptually:\n\nnew.previous = oldTail\noldTail.next = new\ntail = new\n\nFor the first node, head and tail both reference the new node.\n\nInsertion at an endpoint remains O(1) with maintained head/tail references.",
 },
 {
 title: "Practice",
 content: "Trace a small example of insertion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DELETION",
 slug: "linked-lists-deletion",
 description: "Understand deletion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, the same broad cases apply as with singly linked lists, but removing an\ninterior node is easier because the node already knows its predecessor and\nsuccessor.",
 },
 {
 title: "Detailed explanation",
 content: "The same broad cases apply as with singly linked lists, but removing an\ninterior node is easier because the node already knows its predecessor and\nsuccessor.\n\nFor:\n\n A <-> B <-> C\n\nremoving B means reconnecting:\n\nA.next = C\nC.previous = A\n\nRemoving the head also requires setting the new head’s previous reference to\nnull. Removing the tail requires setting the new tail’s next reference to null.",
 },
 {
 title: "Practice",
 content: "Trace a small example of deletion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "REVERSE TRAVERSAL",
 slug: "linked-lists-reverse-traversal",
 description: "Understand reverse traversal with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, reverse traversal is straightforward:.",
 },
 {
 title: "Detailed explanation",
 content: "Reverse traversal is straightforward:\n\ncurrent = tail\n\nwhile current != null:\nprocess current.value\ncurrent = current.previous\n\nComplexity:\nO(n)\n\nThis is substantially simpler than reverse traversal of a singly linked list.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of reverse traversal by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "LINKED-LIST SUMMARY",
 slug: "linked-lists-linked-list-summary",
 description: "Understand linked-list summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, use a linked list when:.",
 },
 {
 title: "Detailed explanation",
 content: "Use a linked list when:\n\n- the number of elements is not known in advance;\n- frequent endpoint insertion/deletion is required;\n- dynamic growth is useful;\n- random indexed access is not the primary requirement.\n\nAvoid relying on linked lists when:\n\n- indexed access is frequent;\n- searching is frequent and no additional indexing structure exists;\n- random insertion requires repeated traversal.\n\nSingly linked lists are appropriate for simpler forward-only operations.\nDoubly linked lists are more flexible when both forward and backward traversal\nare required.",
 },
 {
 title: "Practice",
 content: "Trace a small example of linked-list summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Binary Search Tree",
 slug: "binary-search-tree",
 description: "Learn binary search tree with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "BINARY SEARCH TREE",
 slug: "binary-search-tree-binary-search-tree",
 description: "Understand binary search tree with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nA Binary Search Tree (BST) is a tree organized around an ordering rule.\n\nFor a node with value x, This topic defines the ordering as:\n\nleft subtree: values < x\nright subtree: values >= x\n\nThe same rule applies recursively to every node.\n\nExample:\n\n 23\n / \\\n 14 31\n / \\\n 7 17\n \\\n 9\n\nThe major attraction is efficient ordered searching when the tree remains\nreasonably balanced.\n\nExpected/ideal behavior discussed by This topic:\n\ninsertion: O(log n)\nlookup: O(log n)\ndeletion: O(log n)\n\nBut this is conditional on tree shape.\n\nA pathological tree can become:\n\n 1\n \\\n 2\n \\\n 3\n \\\n 4\n\nThis is effectively a linked list and operations become O(n).",
 },
 {
 title: "Practice",
 content: "Trace a small example of binary search tree by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INSERTION",
 slug: "binary-search-tree-insertion",
 description: "Understand insertion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, insertion follows the ordering rule.",
 },
 {
 title: "Detailed explanation",
 content: "Insertion follows the ordering rule.\n\nStarting at the root:\n\nif value < current.value:\ngo left\notherwise:\ngo right\n\nWhen the required child reference is empty, create the node there.\n\nThis topic presents insertion using a small outer operation plus a recursive\nnode-insertion routine.\n\nWhy recursion fits:\nA subtree is itself a tree, so the same insertion rule can be applied to\nthe selected subtree.\n\nAt every node the algorithm makes a binary choice:\n\nleft OR right\n\nThis is the “binary chop” idea responsible for logarithmic behavior in a\nreasonably balanced tree.",
 },
 {
 title: "Practice",
 content: "Trace a small example of insertion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SEARCHING",
 slug: "binary-search-tree-searching",
 description: "Understand searching with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, search has four fundamental cases:.",
 },
 {
 title: "Detailed explanation",
 content: "Search has four fundamental cases:\n\n1. Empty tree:\nvalue does not exist.\n\n2. Current node equals target:\nvalue found.\n\n3. Target is smaller:\nsearch left subtree.\n\n4. Target is larger:\nsearch right subtree.\n\nBecause each comparison eliminates one side of the current tree, a balanced\ntree can search in O(log n).\n\nIn an unbalanced tree the number of visited nodes may be O(n).",
 },
 {
 title: "Practice",
 content: "Trace a small example of searching by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DELETION",
 slug: "binary-search-tree-deletion",
 description: "Understand deletion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, bST deletion is more complicated because removing a node must preserve the\nordering property.",
 },
 {
 title: "Detailed explanation",
 content: "BST deletion is more complicated because removing a node must preserve the\nordering property.\n\nImportant cases:\n\nCase 1 — Leaf node\nA node with no children can simply be disconnected from its parent.\n\nCase 2 — Only right child\nReplace the deleted node with its right subtree.\n\nCase 3 — Only left child\nReplace the deleted node with its left subtree.\n\nCase 4 — Two children\nA replacement value must be chosen so the BST ordering remains valid.\nThis topic’s approach uses the largest value from the left subtree.\n\nFor the two-child case:\n\n1. Find the largest node in the left subtree.\n2. Copy its value into the node being deleted.\n3. Remove the original occurrence of that replacement value.\n\nThis works because the largest value in the left subtree is still smaller than\nthe deleted node’s right-subtree values.",
 },
 {
 title: "Practice",
 content: "Trace a small example of deletion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "FINDING THE PARENT",
 slug: "binary-search-tree-finding-the-parent",
 description: "Understand finding the parent with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, some tree operations require the parent of a node.",
 },
 {
 title: "Detailed explanation",
 content: "Some tree operations require the parent of a node.\n\nStarting from the root:\n\nif target belongs to left subtree:\ncurrent parent becomes current node\nmove left\n\notherwise:\ncurrent parent becomes current node\nmove right\n\nThe parent is therefore the node immediately above the target in the search\npath.",
 },
 {
 title: "Practice",
 content: "Trace a small example of finding the parent by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "ATTAINING A REFERENCE TO A NODE",
 slug: "binary-search-tree-attaining-a-reference-to-a-node",
 description: "Understand attaining a reference to a node with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, sometimes an algorithm needs the actual node reference instead of only knowing\nwhether a value exists.",
 },
 {
 title: "Detailed explanation",
 content: "Sometimes an algorithm needs the actual node reference instead of only knowing\nwhether a value exists.\n\nThe search process can be adapted to return the node encountered when:\n\ncurrent.value == target\n\nIf traversal reaches an empty reference, no such node exists.",
 },
 {
 title: "Practice",
 content: "Trace a small example of attaining a reference to a node by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SMALLEST AND LARGEST VALUES",
 slug: "binary-search-tree-smallest-and-largest-values",
 description: "Understand smallest and largest values with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, because the BST is ordered:.",
 },
 {
 title: "Detailed explanation",
 content: "Because the BST is ordered:\n\nsmallest = repeatedly follow left children\nlargest = repeatedly follow right children\n\nFor a non-empty tree, the smallest value is at the leftmost node and the largest\nvalue is at the rightmost node.\n\nComplexity is proportional to tree height.",
 },
 {
 title: "Practice",
 content: "Trace a small example of smallest and largest values by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "TREE TRAVERSALS",
 slug: "binary-search-tree-tree-traversals",
 description: "Understand tree traversals with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, traversal means visiting all nodes in a defined order.",
 },
 {
 title: "Detailed explanation",
 content: "Traversal means visiting all nodes in a defined order.\n\nAll complete traversals visit n nodes, so their basic runtime is O(n).",
 },
 {
 title: "Practice",
 content: "Trace a small example of tree traversals by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "PREORDER",
 slug: "binary-search-tree-preorder",
 description: "Understand preorder with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, order:.",
 },
 {
 title: "Detailed explanation",
 content: "Order:\n\nRoot\nLeft subtree\nRight subtree\n\nFor each node:\n\nprocess current\ntraverse left\ntraverse right\n\nUseful when the root must be handled before its descendants.",
 },
 {
 title: "Practice",
 content: "Trace a small example of preorder by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "POSTORDER",
 slug: "binary-search-tree-postorder",
 description: "Understand postorder with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, order:.",
 },
 {
 title: "Detailed explanation",
 content: "Order:\n\nLeft subtree\nRight subtree\nRoot\n\nFor each node:\n\ntraverse left\ntraverse right\nprocess current\n\nThis naturally supports operations where children must be processed before\ntheir parent.",
 },
 {
 title: "Practice",
 content: "Trace a small example of postorder by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INORDER",
 slug: "binary-search-tree-inorder",
 description: "Understand inorder with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, order:.",
 },
 {
 title: "Detailed explanation",
 content: "Order:\n\nLeft subtree\nRoot\nRight subtree\n\nFor a BST, inorder traversal produces the values in sorted order.\n\nThis property is especially important for ordered sets backed by a tree.",
 },
 {
 title: "Practice",
 content: "Trace a small example of inorder by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "BREADTH-FIRST",
 slug: "binary-search-tree-breadth-first",
 description: "Understand breadth-first with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, breadth-first traversal visits one depth level at a time.",
 },
 {
 title: "Detailed explanation",
 content: "Breadth-first traversal visits one depth level at a time.\n\nTypical order:\n\nroot\nall nodes at depth 1\nall nodes at depth 2\n ...\n\nA queue is used to remember nodes that still need to be visited.\n\nProcess:\n\n1. Start with root.\n2. Visit it.\n3. Enqueue its left child if present.\n4. Enqueue its right child if present.\n5. Dequeue the next node.\n6. Repeat.\n\nfrom shallow levels to deeper levels.",
 },
 {
 title: "Practice",
 content: "Trace a small example of breadth-first by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "BST SUMMARY",
 slug: "binary-search-tree-bst-summary",
 description: "Understand bst summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, bSTs are useful when data has an ordering relation and you need insertion,\nlookup, and deletion.",
 },
 {
 title: "Detailed explanation",
 content: "BSTs are useful when data has an ordering relation and you need insertion,\nlookup, and deletion.\n\nThe critical warning is balance.\n\nBalanced-ish BST:\noperations can be O(log n)\n\nHighly unbalanced BST:\noperations can become O(n)\n\nThis topic use AVL trees later as the self-balancing alternative.",
 },
 {
 title: "Practice",
 content: "Trace a small example of bst summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Heap",
 slug: "heap",
 description: "Learn heap with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "HEAP",
 slug: "heap-heap",
 description: "Understand heap with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nA heap is a tree-shaped structure with a special parent/child ordering rule.\n\nTwo forms are emphasized:\n\nMIN HEAP\nParent value <= child values.\nThe smallest value is at the root.\n\nMAX HEAP\nParent value >= child values.\nThe largest value is at the root.\n\nThis topic primarily assumes a min-heap unless stated otherwise.\n\nA major difference from a BST is representation. A heap is generally represented\nusing an array.\n\nFor a node at array index i:\n\nparent index = (i - 1) / 2\nleft child = 2*i + 1\nright child = 2*i + 2\n\nInteger division is assumed when computing an index.\n\nExample concept:\n\narray index:\n 0\n / \\\n 1 2\n / \\ / \\\n 3 4 5 6\n\nThis allows a complete binary-tree shape to be represented without explicit\nnode objects and child references.",
 },
 {
 title: "Practice",
 content: "Trace a small example of heap by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INSERTION",
 slug: "heap-insertion",
 description: "Understand insertion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, insertion has two conceptual phases:.",
 },
 {
 title: "Detailed explanation",
 content: "Insertion has two conceptual phases:\n\n1. Put the new value into the next free array position.\n2. Restore heap ordering.\n\nFor a min heap, if the inserted value is smaller than its parent, swap them.\n\nContinue moving upward until:\n\n- the value reaches the root, or\n- its parent is smaller/equal.\n\nThis is often called “bubble up” or “heapify upward”.\n\nRuntime:\nO(log n)\n\nThe initial placement is O(1); the possible upward correction traverses at most\nthe tree height.\n\nFor a max heap, the comparison is reversed.",
 },
 {
 title: "Complexity",
 content: "O(log n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of insertion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DELETION",
 slug: "heap-deletion",
 description: "Understand deletion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, deletion requires maintaining the heap property after removing an element.",
 },
 {
 title: "Detailed explanation",
 content: "Deletion requires maintaining the heap property after removing an element.\n\nThis topic describes a general value-removal process:\n\n1. Find the index of the requested value.\n2. Reduce the logical count.\n3. Move the last heap value into the removed value’s position.\n4. Restore heap ordering.\n\nFor a min heap, if the replacement value is greater than one of its children,\nthe smaller child is promoted.\n\nContinue downward until heap order is restored.\n\nImportant memory note:\nIf the backing array contains references to objects, a removed slot should not\nunnecessarily retain a reference to the removed object. In a garbage-collected\nenvironment, clearing an obsolete reference can allow the object to become\neligible for collection.",
 },
 {
 title: "Practice",
 content: "Trace a small example of deletion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SEARCHING",
 slug: "heap-searching",
 description: "Understand searching with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a heap is not ordered enough to support ordinary BST-style logarithmic lookup.",
 },
 {
 title: "Detailed explanation",
 content: "A heap is not ordered enough to support ordinary BST-style logarithmic lookup.\n\nTherefore, searching for an arbitrary value generally means scanning the\narray.\n\nRuntime:\nO(n)\n\nThis topic relates this to a breadth-first view of the heap because the array\nstores the tree in level order.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of searching by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "TRAVERSAL",
 slug: "heap-traversal",
 description: "Understand traversal with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, traversal is naturally supported by walking the array or interpreting the\narray as a level-order representation of the tree.",
 },
 {
 title: "Detailed explanation",
 content: "Traversal is naturally supported by walking the array or interpreting the\narray as a level-order representation of the tree.\n\nThe important distinction is:\n\nHeap ordering gives fast access to the extreme element\nbut does NOT provide arbitrary-value search in O(log n).",
 },
 {
 title: "Practice",
 content: "Trace a small example of traversal by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "HEAP SUMMARY",
 slug: "heap-heap-summary",
 description: "Understand heap summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, heaps are useful when you need quick access to the smallest or largest element\ndepending on heap type.",
 },
 {
 title: "Detailed explanation",
 content: "Heaps are useful when you need quick access to the smallest or largest element\ndepending on heap type.\n\nTypical characteristics:\n\ninsertion: O(log n)\nsearch for arbitrary value: O(n)\nremoval of a located element: requires repair and may take O(log n)\nroot/extreme access: O(1)\n\nHeaps are particularly useful as the backing structure for priority queues.",
 },
 {
 title: "Practice",
 content: "Trace a small example of heap summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Sets",
 slug: "sets",
 description: "Learn sets with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "SETS",
 slug: "sets-sets",
 description: "Understand sets with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nA set is a collection of unique objects.\n\nThe defining property is uniqueness:\n\n {6, 2, 9}\n\ncontains each member only once.\n\nSets can be:\n\nunordered\nordered\n\nThe key implementation requirement is that membership checking must be efficient\nbecause insertion first needs to determine whether the value already exists.",
 },
 {
 title: "Practice",
 content: "Trace a small example of sets by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SET FUNDAMENTALS AND OPERATIONS",
 slug: "sets-set-fundamentals-and-operations",
 description: "Understand set fundamentals and operations with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic discusses set operations including union and intersection.",
 },
 {
 title: "Detailed explanation",
 content: "This topic discusses set operations including union and intersection.\n\nUNION\nThe union of two sets contains every distinct item present in either set.\n\nExample:\n\n A = {1,2,3}\n B = {3,4,5}\n\n A union B = {1,2,3,4,5}\n\nINTERSECTION\nThe intersection contains values present in both sets.\n\n A intersection B = {3}\n\nThis topic’s intersection algorithm deliberately iterates through the smaller\nset. This is an important optimization: once all elements of the smaller set\nhave been checked, no additional intersection members can exist.\n\nThe stated runtime is linear in the size of the smaller set, assuming membership\nchecks and insertion have favorable complexity.",
 },
 {
 title: "Practice",
 content: "Trace a small example of set fundamentals and operations by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "UNORDERED SET AND INSERTION",
 slug: "sets-unordered-set-and-insertion",
 description: "Understand unordered set and insertion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, an unordered set does not promise a meaningful ordering of its members.",
 },
 {
 title: "Detailed explanation",
 content: "An unordered set does not promise a meaningful ordering of its members.\n\nA hash table is a natural backing structure because it provides:\n\ninsertion: approximately O(1)\nlookup: approximately O(1)\n\nThe exact performance depends on the quality of hashing and collision behavior.\n\nSet insertion works conceptually as:\n\nif item is not already present:\nadd item\notherwise:\ndo nothing\n\nUniqueness is therefore enforced by the membership check.",
 },
 {
 title: "Practice",
 content: "Trace a small example of unordered set and insertion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "ORDERED SET",
 slug: "sets-ordered-set",
 description: "Understand ordered set with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, an ordered set still contains unique elements, but it additionally maintains\nan ordering relation.",
 },
 {
 title: "Detailed explanation",
 content: "An ordered set still contains unique elements, but it additionally maintains\nan ordering relation.\n\nThis topic describes an ordered set as being backed by a tree. In the version\ndescribed in This topic, the implementation moved from a BST to an AVL tree because\nAVL trees maintain balance.\n\nThe ordered output can be produced using inorder traversal.\n\nBecause inorder traversal of a BST-like ordered tree yields values in sorted\norder, the set can expose members in their defined order.",
 },
 {
 title: "Practice",
 content: "Trace a small example of ordered set by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SET SUMMARY",
 slug: "sets-set-summary",
 description: "Understand set summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, use an unordered set when:.",
 },
 {
 title: "Detailed explanation",
 content: "Use an unordered set when:\n\n- uniqueness matters;\n- order does not matter;\n- fast membership is important.\n\nUse an ordered set when:\n\n- uniqueness matters;\n- ordered iteration is also important.\n\nThe backing data structure should be chosen based on the operations the\napplication performs most frequently.",
 },
 {
 title: "Practice",
 content: "Trace a small example of set summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Queues",
 slug: "queues",
 description: "Learn queues with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "QUEUES",
 slug: "queues-queues",
 description: "Understand queues with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nA queue follows FIFO:\n\nFirst In, First Out\n\nThe first item inserted is the first item removed.\n\nCore operations:\n\nEnqueue\nAdd to the back.\n\nDequeue\n Remove and return the front.\n\nPeek\nReturn the front without removing it.\n\nExample:\n\nEnqueue(10)\nEnqueue(12)\nEnqueue(9)\n\nQueue:\n front -> 10, 12, 9 <- back\n\nDequeue() returns 10.",
 },
 {
 title: "Practice",
 content: "Trace a small example of queues by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "STANDARD QUEUE",
 slug: "queues-standard-queue",
 description: "Understand standard queue with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a standard queue can be efficiently implemented using a singly linked list.",
 },
 {
 title: "Detailed explanation",
 content: "A standard queue can be efficiently implemented using a singly linked list.\n\nWhy?\n\nEnqueue:\n add at tail -> O(1)\n\nDequeue:\n remove at head -> O(1)\n\nSearching remains:\n\nO(n)\n\nbecause the queue does not provide direct arbitrary-value lookup.\n\nThe queue abstraction intentionally restricts access to the front for removal\nand inspection.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of standard queue by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "PRIORITY QUEUE",
 slug: "queues-priority-queue",
 description: "Understand priority queue with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a priority queue changes the rule.",
 },
 {
 title: "Detailed explanation",
 content: "A priority queue changes the rule.\n\nA standard queue orders by arrival time.\n\nA priority queue orders by a comparison rule representing priority.\n\nThe item with the highest priority is served first.\n\nA heap is a natural implementation.\n\nFor example:\n\nmin-priority queue:\nsmaller value = higher priority\n\nmax-priority queue:\nlarger value = higher priority\n\nWith a heap, the highest-priority element is at the root, allowing efficient\naccess and insertion/removal operations.",
 },
 {
 title: "Practice",
 content: "Trace a small example of priority queue by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DOUBLE-ENDED QUEUE (DEQUE)",
 slug: "queues-double-ended-queue-deque",
 description: "Understand double-ended queue (deque) with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a deque allows operations at both ends.",
 },
 {
 title: "Detailed explanation",
 content: "A deque allows operations at both ends.\n\nCommon operations:\n\nEnqueueFront\nEnqueueBack\nDequeueFront\nDequeueBack\nPeekFront\nPeekBack\n\nUnlike a priority queue, a deque does not reorder elements according to a\npriority comparison. The programmer chooses which end to use.\n\nA doubly linked list is a natural backing structure because both endpoints can\nbe manipulated efficiently.\n\nEndpoint operations can be O(1).\n\nAn array can also back a deque, but dynamic resizing can introduce O(n) work\nwhen the array needs to grow or shrink.",
 },
 {
 title: "Practice",
 content: "Trace a small example of double-ended queue (deque) by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "QUEUE SUMMARY",
 slug: "queues-queue-summary",
 description: "Understand queue summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, standard queue:\nFIFO\nenqueue at back\ndequeue at front\nendpoint operations can be O(1).",
 },
 {
 title: "Detailed explanation",
 content: "Standard queue:\nFIFO\nenqueue at back\ndequeue at front\nendpoint operations can be O(1)\n\nPriority queue:\nservice order is determined by priority\nheap is a suitable backing structure\n\nDeque:\noperations available at both front and back\ndoubly linked list is a natural dynamic backing structure",
 },
 {
 title: "Practice",
 content: "Trace a small example of queue summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "AVL Tree",
 slug: "avl-tree",
 description: "Learn avl tree with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "AVL TREE",
 slug: "avl-tree-avl-tree",
 description: "Understand avl tree with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nAn AVL tree is a self-balancing binary search tree.\n\nThe main motivation is the weakness of a normal BST: insertion order can produce\na very tall tree.\n\nAVL maintains a height-balance condition:\n\nthe heights of left and right subtrees differ by no more than 1\n\nIf an operation breaks this condition, rotations are used to restore balance.\n\nThis keeps the tree height logarithmic and allows efficient ordered operations.",
 },
 {
 title: "Practice",
 content: "Trace a small example of avl tree by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "TREE ROTATIONS",
 slug: "avl-tree-tree-rotations",
 description: "Understand tree rotations with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a rotation changes tree shape while preserving BST ordering.",
 },
 {
 title: "Detailed explanation",
 content: "A rotation changes tree shape while preserving BST ordering.\n\nThere are two basic rotations:\n\nLEFT ROTATION\nRIGHT ROTATION\n\nA left rotation promotes the node’s right child and moves the old node beneath\nit as the new left child.\n\nA right rotation is the mirror image: the left child is promoted and the old\nnode becomes the new right child.\n\nOnly references/pointers need to change.\n\nThis topic emphasizes that rotation itself is O(1).\n\nRotations are important because they reduce excessive tree height without\ndestroying the sorted relationship between nodes.",
 },
 {
 title: "Practice",
 content: "Trace a small example of tree rotations by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "TREE REBALANCING",
 slug: "avl-tree-tree-rebalancing",
 description: "Understand tree rebalancing with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, for every node, compare:.",
 },
 {
 title: "Detailed explanation",
 content: "For every node, compare:\n\nheight(left subtree) - height(right subtree)\n\nValid AVL balance:\n\n -1, 0, +1\n\nIf the difference is greater than +1, the tree is too heavy on the left.\n\nIf the difference is less than -1, the tree is too heavy on the right.\n\nThis topic use four conceptual imbalance patterns:\n\nLEFT-LEFT\nrepaired with a right rotation\n\nRIGHT-RIGHT\nrepaired with a left rotation\n\nLEFT-RIGHT\nrepaired with a left rotation on the child,\nfollowed by a right rotation\n\nRIGHT-LEFT\nrepaired with a right rotation on the child,\nfollowed by a left rotation\n\nThe double rotations are combinations of the two basic rotations.",
 },
 {
 title: "Practice",
 content: "Trace a small example of tree rebalancing by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INSERTION",
 slug: "avl-tree-insertion",
 description: "Understand insertion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, aVL insertion starts exactly like BST insertion.",
 },
 {
 title: "Detailed explanation",
 content: "AVL insertion starts exactly like BST insertion.\n\nSteps:\n\n1. Descend through the tree using the BST ordering rule.\n2. Insert the new node.\n3. Travel back toward the root.\n4. Recalculate heights.\n5. Detect any balance violation.\n6. Apply the required rotation(s).\n\nThis topic’s recursive insertion calls the balancing check as it unwinds.\n\nThis is a useful pattern:\n\ndescend to modify structure\nthen unwind to repair structure\n\nBecause AVL maintains balance, insertion remains logarithmic with respect to\ntree size.",
 },
 {
 title: "Practice",
 content: "Trace a small example of insertion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "DELETION",
 slug: "avl-tree-deletion",
 description: "Understand deletion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, aVL deletion begins like BST deletion.",
 },
 {
 title: "Detailed explanation",
 content: "AVL deletion begins like BST deletion.\n\nCases include:\n\n- leaf;\n- only left child;\n- only right child;\n- two children.\n\nAfter removal, the algorithm must walk back through the affected path and check\nbalance.\n\nUnlike a normal BST, deletion may create imbalance farther up the tree.\n\nTherefore:\n\nremove node\nupdate affected structure\nmove upward\nrecalculate heights\nrotate if necessary\n\nThis topic tracks the path so it can perform balance checks while moving back\ntoward the root.",
 },
 {
 title: "Practice",
 content: "Trace a small example of deletion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "AVL SUMMARY",
 slug: "avl-tree-avl-summary",
 description: "Understand avl summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, aVL is a smarter BST in the sense that it actively controls height.",
 },
 {
 title: "Detailed explanation",
 content: "AVL is a “smarter” BST in the sense that it actively controls height.\n\nImportant distinction:\n\nBST:\nordering guaranteed\nbalance not guaranteed\n\nAVL:\nordering guaranteed\nbalance actively maintained\n\nThis difference is why AVL can preserve logarithmic behavior for search,\ninsertion, and deletion rather than allowing a pathological linear chain.\n\n============================================================\nPART II — ALGORITHMS\n============================================================",
 },
 {
 title: "Practice",
 content: "Trace a small example of avl summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Sorting",
 slug: "sorting",
 description: "Learn sorting with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "SORTING",
 slug: "sorting-sorting",
 description: "Understand sorting with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nSorting rearranges a collection into a chosen order, such as ascending order.\n\nThis topic presents multiple approaches because no single sorting algorithm is\nbest for every situation.\n\nImportant factors include:\n\n- runtime;\n- memory behavior;\n- implementation complexity;\n- recursion;\n- input characteristics;\n- key structure.",
 },
 {
 title: "Practice",
 content: "Trace a small example of sorting by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "BUBBLE SORT",
 slug: "sorting-bubble-sort",
 description: "Understand bubble sort with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, bubble sort repeatedly compares elements and swaps them when they are in the\nwrong relative order.",
 },
 {
 title: "Detailed explanation",
 content: "Bubble sort repeatedly compares elements and swaps them when they are in the\nwrong relative order.\n\nA simple conceptual form uses nested loops.\n\nFor every outer pass:\n\ncompare pairs\nswap out-of-order elements\n\nThis topic presents it as a very simple but inefficient sorting technique.\n\nTypical complexity:\nO(n^2)\n\nWhy quadratic?\nThere can be approximately n comparisons for each of approximately n\nouter iterations.\n\nUse:\nMostly educational or for very small/simple cases.\n\nDo not select it for large datasets when a more efficient method is available.",
 },
 {
 title: "Complexity",
 content: "O(n^2)",
 },
 {
 title: "Practice",
 content: "Trace a small example of bubble sort by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "MERGE SORT",
 slug: "sorting-merge-sort",
 description: "Understand merge sort with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, merge sort uses divide and conquer.",
 },
 {
 title: "Detailed explanation",
 content: "Merge sort uses divide and conquer.\n\nHigh-level process:\n\n1. Split the list into two roughly equal parts.\n2. Recursively sort the left part.\n3. Recursively sort the right part.\n4. Merge the two sorted parts.\n\nThe base case is a list of one element because a single element is already\nsorted.\n\nExample:\n\n [4,75,74,2,54]\n\nSplit:\n\n [4,75] [74,2,54]\n\nContinue splitting until single elements exist.\n\nThen merge sorted pieces:\n\n [4] + [75] -> [4,75]\n\n [2] + [54] -> [2,54]\n\n [74] + [2,54] -> [2,54,74]\n\nFinally:\n\n [4,75] + [2,54,74]\n -> [2,4,54,74,75]\n\nThe important operation is merging two already ordered sequences.\n\nComplexity:\nO(n log n)\n\nThe logarithmic factor comes from repeatedly halving the input. The linear\nfactor comes from processing/merging elements at each level.",
 },
 {
 title: "Complexity",
 content: "O(n log n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of merge sort by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "QUICK SORT",
 slug: "sorting-quick-sort",
 description: "Understand quick sort with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, quick sort is another divide-and-conquer approach.",
 },
 {
 title: "Detailed explanation",
 content: "Quick sort is another divide-and-conquer approach.\n\nCore idea:\n\n1. Choose a pivot.\n2. Partition values into:\nless than pivot\nequal to pivot\ngreater than pivot\n3. Recursively sort the less and greater groups.\n4. Concatenate:\nsorted less + equal + sorted greater\n\nThis topic demonstrates a median-style pivot strategy.\n\nPivot selection matters greatly.\n\nGood partitioning:\nsubproblems remain reasonably balanced\n -> approximately O(n log n)\n\nPoor partitioning:\none side contains almost everything\n -> can degrade toward O(n^2)\n\nTherefore pivot selection is a major practical consideration.",
 },
 {
 title: "Practice",
 content: "Trace a small example of quick sort by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INSERTION SORT",
 slug: "sorting-insertion-sort",
 description: "Understand insertion sort with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, insertion sort can be understood by imagining sorting playing cards in your\nhand.",
 },
 {
 title: "Detailed explanation",
 content: "Insertion sort can be understood by imagining sorting playing cards in your\nhand.\n\nMaintain a sorted prefix.\n\nFor each next value:\n\n1. Hold the current value.\n2. Move larger values to the right.\n3. Insert the held value into the correct gap.\n\nExample:\n\n [4, 75, 74, 2, 54]\n\nAfter considering 4 and 75:\n [4,75]\n\nInsert 74:\nmove 75\n [4,74,75]\n\nInsert 2:\nshift larger values\n [2,4,74,75]\n\nContinue with 54:\n [2,4,54,74,75]\n\nTypical worst-case complexity:\nO(n^2)\n\nInsertion sort is conceptually simple and can be attractive for small or\nnearly ordered collections, even though its general worst-case complexity is\nquadratic.",
 },
 {
 title: "Complexity",
 content: "O(n^2)",
 },
 {
 title: "Practice",
 content: "Trace a small example of insertion sort by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SHELL SORT",
 slug: "sorting-shell-sort",
 description: "Understand shell sort with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, shell sort can be viewed as an improvement over insertion sort.",
 },
 {
 title: "Detailed explanation",
 content: "Shell sort can be viewed as an improvement over insertion sort.\n\nInstead of initially comparing only neighboring positions, it compares values\nseparated by a gap.\n\nThe gap is gradually reduced.\n\nApproach:\n\ninitial increment = list size / 2\nperform gap-based insertion-style sorting\nreduce increment\nrepeat until increment becomes zero\n\nThis topic gives a complexity of approximately:\n\nO(n log^2 n)\n\nfor its discussed approach.\n\nThe key intuition is that distant elements can be moved closer to their correct\nlocations before the final small-gap insertion pass.",
 },
 {
 title: "Complexity",
 content: "O(n log^2 n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of shell sort by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "RADIX SORT",
 slug: "sorting-radix-sort",
 description: "Understand radix sort with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, radix sort is different from comparison sorting.",
 },
 {
 title: "Detailed explanation",
 content: "Radix sort is different from comparison sorting.\n\nIt groups values into buckets based on individual digits/keys.\n\nFor decimal integers there are ten possible digit keys:\n\n 0 through 9\n\nThis topic describes processing keys from the least significant digit upward.\n\nFor example, for:\n\n 102\n\nthe digit keys are:\n\nones = 2\ntens = 0\nhundreds = 1\n\nTo isolate a digit:\n\nkey = (number / keyPosition) % 10\n\nFor tens:\n\nkeyPosition = 10\n\nFor 1290:\n\n (1290 / 10) % 10 = 9\n\nThe algorithm repeatedly:\n\n1. places each value into the bucket corresponding to the current digit;\n2. reads buckets from smallest key to largest;\n3. reconstructs the list;\n4. moves to the next digit position.\n\nThis topic’s basic version works on positive integers and requires knowledge of\nthe largest key/digit position.\n\nA queue is a natural bucket representation because values can be retained in\ntheir arrival order during each digit pass.",
 },
 {
 title: "Practice",
 content: "Trace a small example of radix sort by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SORTING SUMMARY",
 slug: "sorting-sorting-summary",
 description: "Understand sorting summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, comparison:.",
 },
 {
 title: "Detailed explanation",
 content: "Comparison:\n\n Bubble sort -> simple, O(n^2)\n Merge sort -> divide/conquer, O(n log n)\n Quick sort -> divide/conquer, typically O(n log n), pivot-sensitive\n Insertion sort -> simple, O(n^2) worst case\n Shell sort -> gap-based insertion improvement\n Radix sort -> digit/key based bucket approach\n\nThe important lesson is not simply “memorize the fastest algorithm”.\n\nInstead ask:\n\nWhat kind of data do I have?\nWhat operations are available?\nHow large can the input become?\nIs the algorithm recursive?\nWhat memory does it need?\nWhat happens in the worst case?",
 },
 {
 title: "Practice",
 content: "Trace a small example of sorting summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Numeric Algorithms",
 slug: "numeric-algorithms",
 description: "Learn numeric algorithms with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "NUMERIC ALGORITHMS",
 slug: "numeric-algorithms-numeric-algorithms",
 description: "Understand numeric algorithms with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nThis chapter demonstrates that algorithmic thinking is useful for mathematical\nproblems as well as data structures.",
 },
 {
 title: "Practice",
 content: "Trace a small example of numeric algorithms by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "PRIMALITY TEST",
 slug: "numeric-algorithms-primality-test",
 description: "Understand primality test with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a prime number has no positive divisors other than the relevant trivial factors.",
 },
 {
 title: "Detailed explanation",
 content: "A prime number has no positive divisors other than the relevant trivial factors.\n\nExamples of primes include:\n\n 2, 5, 7, 13\n\nThis topic points out the usefulness of sqrt(n) as a divisor-search boundary:\nif a number has a non-trivial factorization, one of the factors is at most\nsqrt(n).\n\nThe conceptual optimization is therefore:\n\ntest possible factors only up to sqrt(n)\n\nThis topic’s pseudocode explores products involving the input and values up to\nthis square-root bound.\n\nImportant edge case:\nvalues below 2 are not prime.",
 },
 {
 title: "Practice",
 content: "Trace a small example of primality test by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "BASE CONVERSION",
 slug: "numeric-algorithms-base-conversion",
 description: "Understand base conversion with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic demonstrates conversion from decimal to binary and also covers analogous\nconversion ideas for octal and hexadecimal.",
 },
 {
 title: "Detailed explanation",
 content: "This topic demonstrates conversion from decimal to binary and also covers analogous\nconversion ideas for octal and hexadecimal.\n\nFor decimal-to-binary conversion:\n\n1. Divide n by 2.\n2. Record the remainder.\n3. Replace n with integer quotient.\n4. Repeat until n becomes zero.\n5. Reverse the collected remainders.\n\nWhy reverse?\n\nThe first remainder is the least significant digit, while the last remainder\ncollected is the most significant digit.\n\nExample structure:\n\nn\nremainder = n % 2\nn = n / 2\n\nThis topic’s trace uses 742 as an example and shows the successive quotients and\nremainders.\n\nThis technique generalizes:\n\nbase B:\ndigit = n % B\nn = n / B\n\nThen reverse the collected digits.",
 },
 {
 title: "Practice",
 content: "Trace a small example of base conversion by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "GREATEST COMMON DIVISOR",
 slug: "numeric-algorithms-greatest-common-divisor",
 description: "Understand greatest common divisor with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic use Euclid’s algorithm.",
 },
 {
 title: "Detailed explanation",
 content: "This topic use Euclid’s algorithm.\n\nFor integers m and n:\n\nif n == 0:\nanswer = m\notherwise:\nGCD(m,n) = GCD(n, m % n)\n\nExample:\n\nGCD(15,9)\n -> GCD(9,6)\n -> GCD(6,3)\n -> GCD(3,0)\n -> 3\n\nThe power of the algorithm is that the problem becomes smaller after each\nremainder operation.\n\nNote:\nThis topic use the phrase “greatest common denominator” in places, but the\nmathematical operation described is the greatest common divisor (GCD).",
 },
 {
 title: "Practice",
 content: "Trace a small example of greatest common divisor by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "MAXIMUM VALUE FOR N DIGITS IN BASE B",
 slug: "numeric-algorithms-maximum-value-for-n-digits-in-base-b",
 description: "Understand maximum value for n digits in base b with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, for a base B number containing N digits, the maximum representable value is:.",
 },
 {
 title: "Detailed explanation",
 content: "For a base B number containing N digits, the maximum representable value is:\n\nB^N - 1\n\nExamples:\n\nBase 10, four digits:\n\n 10^4 - 1 = 9999\n\nBase 2, four digits:\n\n 2^4 - 1 = 15\nbinary representation: 1111\n\nBase 16, six digits:\n\n 16^6 - 1\nrepresentation: FFFFFF\n\nThis topic use a base enumeration concept:\n\nBinary = 2\nOctal = 8\nDecimal = 10\nHexadecimal = 16\n\nUsing named enumeration values makes algorithms easier to understand than\nscattering raw numeric constants throughout the code.",
 },
 {
 title: "Practice",
 content: "Trace a small example of maximum value for n digits in base b by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "FACTORIAL",
 slug: "numeric-algorithms-factorial",
 description: "Understand factorial with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, factorial is written:.",
 },
 {
 title: "Detailed explanation",
 content: "Factorial is written:\n\nn!\n\nFor non-negative integers:\n\nn! = n * (n-1) * ... * 2 * 1\n\nThe base cases are:\n\n 0! = 1\n 1! = 1\n\nThis topic presents an iterative solution.\n\nConceptual algorithm:\n\nfactorial = 1\n\nfor i from 2 to n:\nfactorial = factorial * i\n\n return factorial\n\nExample:\n\n 5!\n = 1 * 2 * 3 * 4 * 5\n = 120\n\nThis topic chooses iteration even though factorial has a naturally recursive\nmathematical definition because the iterative form avoids recursive-call\noverhead.",
 },
 {
 title: "Practice",
 content: "Trace a small example of factorial by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "NUMERIC SUMMARY",
 slug: "numeric-algorithms-numeric-summary",
 description: "Understand numeric summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, the main lesson is that algorithms are domain-independent problem-solving tools.",
 },
 {
 title: "Detailed explanation",
 content: "The main lesson is that algorithms are domain-independent problem-solving tools.\n\nThe same ideas used for data structures—loops, recursion, reduction of problem\nsize, state tracking, complexity analysis—also solve mathematical problems.",
 },
 {
 title: "Practice",
 content: "Trace a small example of numeric summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Searching",
 slug: "searching",
 description: "Learn searching with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "SEARCHING",
 slug: "searching-searching",
 description: "Understand searching with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nSearching means locating a requested item in a collection.\n\nThis topic emphasizes that search performance is heavily influenced by the\nunderlying data structure.\n\nExamples:\n\n linked list -> generally O(n)\n array scan -> O(n)\n hash table -> approximately O(1) lookup\n balanced BST/AVL -> O(log n)\n\nTherefore, improving search often means changing the data representation rather\nthan merely changing the search loop.",
 },
 {
 title: "Practice",
 content: "Trace a small example of searching by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SEQUENTIAL SEARCH",
 slug: "searching-sequential-search",
 description: "Understand sequential search with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, sequential search examines elements from the beginning until:.",
 },
 {
 title: "Detailed explanation",
 content: "Sequential search examines elements from the beginning until:\n\n- a match is found; or\n- the collection ends.\n\nConceptual algorithm:\n\nindex = 0\n\nwhile index < count and list[index] != target:\nindex++\n\nif index < count:\n return index\n\n return -1\n\nComplexity:\nO(n)\n\nBest case:\ntarget is near the beginning.\n\nWorst case:\ntarget is absent or at the end.\n\nIt requires no ordering assumption.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of sequential search by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "PROBABILITY SEARCH",
 slug: "searching-probability-search",
 description: "Understand probability search with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, probability search is a variation of sequential search for non-uniform access\npatterns.",
 },
 {
 title: "Detailed explanation",
 content: "Probability search is a variation of sequential search for non-uniform access\npatterns.\n\nThe idea:\n\nFrequently requested values should gradually move toward the beginning.\n\nAfter finding an item, swap it with its predecessor if it is not already first.\n\nExample:\n\nBefore:\n\n [A, B, C, D]\n\nSearch for C:\n\n [A, B, C, D]\n\nAfter successful search:\n\n [A, C, B, D]\n\nSearch for C again:\n\n [C, A, B, D]\n\nThe theoretical worst-case complexity remains O(n), but when some items are\nrequested much more frequently than others, the average scanning effort can\nimprove because popular values migrate toward earlier positions.",
 },
 {
 title: "Practice",
 content: "Trace a small example of probability search by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SEARCHING SUMMARY",
 slug: "searching-searching-summary",
 description: "Understand searching summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, the most important lesson is:.",
 },
 {
 title: "Detailed explanation",
 content: "The most important lesson is:\n\nSearch complexity is not independent of data structure.\n\nIf an application performs searches constantly, selecting the right structure\ncan be more important than micro-optimizing a linear scan.",
 },
 {
 title: "Practice",
 content: "Trace a small example of searching summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Strings",
 slug: "strings",
 description: "Learn strings with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "STRINGS",
 slug: "strings-strings",
 description: "Understand strings with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nThis topic treats strings as a major algorithmic area because string operations\nare extremely common in software.\n\nA string can be viewed conceptually as an indexed sequence of characters:\n\nindex: 0 1 2 3\nvalue: T E S T\n\nThis makes many string algorithms similar to array-processing algorithms.",
 },
 {
 title: "Practice",
 content: "Trace a small example of strings by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "REVERSING THE ORDER OF WORDS",
 slug: "strings-reversing-the-order-of-words",
 description: "Understand reversing the order of words with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this algorithm is NOT simply character reversal.",
 },
 {
 title: "Detailed explanation",
 content: "This algorithm is NOT simply character reversal.\n\nFor:\n\n \"one two three\"\n\nthe desired result is conceptually:\n\n \"three two one\"\n\nThis topic assumes words are separated by whitespace.\n\nA right-to-left scan can identify each word:\n\n1. Start from the end.\n2. Skip whitespace.\n3. Find the start of the current word.\n4. Append that word to a result buffer.\n5. Continue toward the beginning.\n\nThis approach is useful because the operation is about word boundaries, not\nindividual character order.\n\nThis topic use markers such as start/last positions and a string buffer.\n\nImportant edge considerations:\n\n- leading whitespace;\n- trailing whitespace;\n- multiple whitespace characters;\n- punctuation attached to words.",
 },
 {
 title: "Practice",
 content: "Trace a small example of reversing the order of words by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "PALINDROME DETECTION",
 slug: "strings-palindrome-detection",
 description: "Understand palindrome detection with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a palindrome reads the same forward and backward after applying This topic’s\nnormalization rules.",
 },
 {
 title: "Detailed explanation",
 content: "A palindrome reads the same forward and backward after applying This topic’s\nnormalization rules.\n\nThis topic demonstrates:\n\n- removing whitespace/punctuation;\n- normalizing case;\n- comparing characters from both ends.\n\nTwo pointers are used:\n\nleft = first character\nright = last character\n\nRepeat:\n\ncompare word[left] and word[right]\nmove left toward the center\nmove right toward the center\n\nIf a mismatch occurs, the string is not a palindrome.\n\nExample:\n\n \"Never odd or even\"\n\nAfter normalization:\n\n \"NEVERODDOREVEN\"\n\nThe left/right comparison proceeds inward.\n\nComplexity:\nO(n)\n\nThis two-pointer pattern is a very important general string/array technique.",
 },
 {
 title: "Complexity",
 content: "O(n)",
 },
 {
 title: "Practice",
 content: "Trace a small example of palindrome detection by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "WORD COUNTING",
 slug: "strings-word-counting",
 description: "Understand word counting with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, counting words is more subtle than simply counting spaces.",
 },
 {
 title: "Detailed explanation",
 content: "Counting words is more subtle than simply counting spaces.\n\nThis topic identifies three useful state variables:\n\nindex\nwordCount\ninWord\n\nThe algorithm must handle:\n\n- leading whitespace;\n- multiple spaces between words;\n- trailing whitespace;\n- an input containing only whitespace;\n- the final word not being followed by whitespace.\n\nCore idea:\n\nwhitespace separates words.\n\nWhen transitioning from being inside a word to whitespace, a word has just\nended, so the count is increased.\n\nThe boolean state avoids counting multiple whitespace characters as multiple\nwords.\n\nExample:\n\n \" Ben ate hay \"\n\nstill contains:\n\n 3 words\n\nnot a count based simply on the number of spaces.",
 },
 {
 title: "Practice",
 content: "Trace a small example of word counting by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "REPEATED-WORD COUNTING",
 slug: "strings-repeated-word-counting",
 description: "Understand repeated-word counting with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic combines string splitting with an unordered set.",
 },
 {
 title: "Detailed explanation",
 content: "This topic combines string splitting with an unordered set.\n\nProcess:\n\n1. Split the sentence into words.\n2. Normalize/strip punctuation from each word.\n3. Insert normalized words into a set.\n4. Count total words.\n5. Count unique words.\n6. Difference:\n\nrepeated count = total words - unique words\n\nExample:\n\n \"test test test\"\n\ntotal = 3\nunique = 1\nrepeated count = 2\n\nThis topic specifically strips punctuation so that values such as:\n\n \"test\"\n \"test!\"\n\ncan be treated as the same word.\n\nThis example demonstrates how one data structure can simplify another algorithm:\nthe set provides uniqueness automatically.",
 },
 {
 title: "Practice",
 content: "Trace a small example of repeated-word counting by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "FIRST MATCHING CHARACTER BETWEEN TWO STRINGS",
 slug: "strings-first-matching-character-between-two-strings",
 description: "Understand first matching character between two strings with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, the problem is to determine whether any character from one string occurs in\nthe other string.",
 },
 {
 title: "Detailed explanation",
 content: "The problem is to determine whether any character from one string occurs in\nthe other string.\n\nThe basic approach uses nested loops:\n\nfor each character in word:\nfor each character in match:\ncompare them\n\nWhitespace/punctuation handling is considered so the comparison is performed\non meaningful characters.\n\nIf a match is found, return the corresponding index.\n\nIf the complete comparison finishes without a match:\n\n return -1\n\nComplexity:\nO(n^2)\n\nThis is a straightforward baseline approach. Faster approaches could be\nconstructed using additional data structures, but This topic presents the simple\ndouble-loop design.",
 },
 {
 title: "Complexity",
 content: "O(n^2)",
 },
 {
 title: "Practice",
 content: "Trace a small example of first matching character between two strings by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "STRING SUMMARY",
 slug: "strings-string-summary",
 description: "Understand string summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, string algorithms often reduce to:.",
 },
 {
 title: "Detailed explanation",
 content: "String algorithms often reduce to:\n\n- indexed character access;\n- pointer movement;\n- state tracking;\n- normalization;\n- sets;\n- nested scanning.\n\nThe broader lesson is to inspect the exact structure of the input and identify\nthe smallest amount of state required to solve the problem cleanly.",
 },
 {
 title: "Practice",
 content: "Trace a small example of string summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Algorithm Walkthrough",
 slug: "algorithm-walkthrough",
 description: "Learn algorithm walkthrough with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "APPENDIX A - ALGORITHM WALKTHROUGH",
 slug: "algorithm-walkthrough-appendix-a-algorithm-walkthrough",
 description: "Understand appendix a - algorithm walkthrough with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nThis topic recommends tracing algorithms rather than merely reading them.\n\nA trace combines:\n\n1. a visual representation of the data structure;\n2. a table containing important variable values.",
 },
 {
 title: "Practice",
 content: "Trace a small example of appendix a - algorithm walkthrough by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Translation Walkthrough",
 slug: "translation-walkthrough",
 description: "Learn translation walkthrough with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "APPENDIX B - TRANSLATION WALKTHROUGH",
 slug: "translation-walkthrough-appendix-b-translation-walkthrough",
 description: "Understand appendix b - translation walkthrough with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nThis topic demonstrates how pseudocode can be translated into an imperative\nlanguage using a primality-testing example.\n\nThe translation process is generally mechanical:\n\npseudocode algorithm\n |\nv\nidentify variables\n |\nv\ntranslate conditions\n |\nv\ntranslate loops\n |\nv\ntranslate method calls\n |\nv\nenforce preconditions\n |\nv\nproduce target-language implementation\n\nImportant considerations:\n\n- pseudocode types may be implicit;\n- target languages require explicit syntax;\n- utility methods may have to be supplied;\n- preconditions may need validation;\n- exception handling may be required.\n\nThis topic emphasizes that the algorithm’s conceptual structure should survive\ntranslation even though syntax changes.",
 },
 {
 title: "Practice",
 content: "Trace a small example of appendix b - translation walkthrough by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Recursive vs Iterative Solutions",
 slug: "recursive-vs-iterative-solutions",
 description: "Learn recursive vs iterative solutions with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "APPENDIX C - RECURSIVE VS ITERATIVE SOLUTIONS",
 slug: "recursive-vs-iterative-solutions-appendix-c-recursive-vs-iterative-solutions",
 description: "Understand appendix c - recursive vs iterative solutions with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nRecursion means a method calls itself.\n\nA recursive algorithm generally has:\n\n1. one or more base cases;\n2. a recursive case.\n\nEvery recursive call must make progress toward a base case.\n\nIf it does not, recursion may continue indefinitely until stack resources are\nexhausted.\n\nIteration uses loops instead:\n\nfor\nwhile\ndo-while\netc.",
 },
 {
 title: "Practice",
 content: "Trace a small example of appendix c - recursive vs iterative solutions by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Testing",
 slug: "testing",
 description: "Learn testing with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "APPENDIX D - TESTING",
 slug: "testing-appendix-d-testing",
 description: "Understand appendix d - testing with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nTesting is presented as an essential part of software development.\n\nUnit tests provide a safety net. When an algorithm changes, existing tests can\nreveal regressions.",
 },
 {
 title: "Practice",
 content: "Trace a small example of appendix d - testing by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Pseudocode Reference",
 slug: "pseudocode-reference",
 description: "Learn pseudocode reference with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "APPENDIX E - PSEUDOCODE SYMBOL DEFINITIONS",
 slug: "pseudocode-reference-appendix-e-pseudocode-symbol-definitions",
 description: "Understand appendix e - pseudocode symbol definitions with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nThis topic use the following important symbols/keywords:\n\n <- Assignment\n = Equality\n <= Less than or equal to\n < Less than\n >= Greater than or equal to\n > Greater than\n != Inequality\nNULL/∅ Null / no reference\nand Logical AND\nor Logical OR\nwhitespace\nOne occurrence of whitespace\nyield Produce a value as part of a returned sequence\n\nWhen reading the pseudocode, distinguish assignment from comparison.\n\nExample:\n\nx <- 10\n\nmeans:\n\nassign 10 to x\n\nwhereas:\n\nx = 10\n\nmeans:\n\ncompare x with 10 for equality.",
 },
 {
 title: "Practice",
 content: "Trace a small example of appendix e - pseudocode symbol definitions by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
 {
 title: "Interview & Revision",
 slug: "interview-and-revision",
 description: "Learn interview & revision with clear concepts, examples, implementation thinking, and complexity analysis.",
 topics: [
 {
 title: "ITERATIVE ALGORITHMS",
 slug: "interview-and-revision-iterative-algorithms",
 description: "Understand iterative algorithms with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, for an iterative algorithm:.",
 },
 {
 title: "Detailed explanation",
 content: "For an iterative algorithm:\n\n1. Draw the input structure.\n2. Identify variables that change.\n3. Create one table column for each important variable.\n4. Execute statements in order.\n5. Record state after each important mutation.\n\nThis topic demonstrates this using palindrome detection.\n\nFor a palindrome example, the trace tracks variables such as:\n\nvalue\nword\nleft\nright\n\nA table might conceptually look like:\n\nword left right\nNEVERODDOREVEN 0 13\n 1 12\n 2 11\n ...\n\nThe exact point is not the table format itself. The point is to make hidden\nstate changes visible.",
 },
 {
 title: "Practice",
 content: "Trace a small example of iterative algorithms by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "RECURSIVE ALGORITHMS",
 slug: "interview-and-revision-recursive-algorithms",
 description: "Understand recursive algorithms with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, recursive algorithms require tracking call relationships.",
 },
 {
 title: "Detailed explanation",
 content: "Recursive algorithms require tracking call relationships.\n\nThis topic demonstrates Fibonacci.\n\nA recursive algorithm normally has:\n\nbase case(s)\nrecursive case\n\nFor Fibonacci, the recursive case creates multiple calls.\n\nThe important trace is a call tree:\n\nFibonacci(n)\n -> Fibonacci(n-1)\n -> Fibonacci(n-2)\n\nEach call eventually reaches a base case and returns a value to its caller.\n\nWhen tracing recursion, record:\n\ncall order\nparameters\nbase-case returns\n return destination\nresulting value\n\nDrawing the call tree is often clearer than trying to fit every recursive\nstate into one flat table.",
 },
 {
 title: "Practice",
 content: "Trace a small example of recursive algorithms by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SUMMARY",
 slug: "interview-and-revision-summary",
 description: "Understand summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, use trace tables for iterative algorithms.",
 },
 {
 title: "Detailed explanation",
 content: "Use trace tables for iterative algorithms.\n\nUse call diagrams plus trace information for recursive algorithms.\n\nThis technique helps with:\n\ncorrectness\ndebugging\nunderstanding variable mutations\nidentifying repeated work\nspotting opportunities for optimization",
 },
 {
 title: "Practice",
 content: "Trace a small example of summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "ACTIVATION RECORDS",
 slug: "interview-and-revision-activation-records",
 description: "Understand activation records with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, each method invocation requires runtime state.",
 },
 {
 title: "Detailed explanation",
 content: "Each method invocation requires runtime state.\n\nThis topic describes an activation record as information placed on the call\nstack to support a method call.\n\nConceptually it contains information such as:\n\n- actual parameters;\n- return address;\n- space for local variables;\n- execution context.\n\nWhen a method returns, this state is unwound.\n\nWith recursion:\n\ncall 1\n -> call 2\n -> call 3\n -> call 4\n ...\n\nmany activation records can exist simultaneously.\n\nTherefore recursive algorithms can consume significant stack space.\n\nThis topic use Fibonacci to illustrate this.\n\nNaive recursive Fibonacci performs repeated work and grows very rapidly.\nAn iterative Fibonacci implementation can compute the sequence in linear time\ninstead of the much faster-growing naive recursive behavior.\n\nThe lesson is not “never use recursion”.\n\nThe lesson is:\n\nUnderstand the cost of recursive calls before using them.",
 },
 {
 title: "Practice",
 content: "Trace a small example of activation records by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "NATURALLY RECURSIVE PROBLEMS",
 slug: "interview-and-revision-naturally-recursive-problems",
 description: "Understand naturally recursive problems with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, some structures are inherently recursive.",
 },
 {
 title: "Detailed explanation",
 content: "Some structures are inherently recursive.\n\nTrees are the clearest example:\n\na node contains references to child nodes,\nand each child is itself another tree/subtree.\n\nTherefore recursive tree algorithms are often natural and readable.\n\nMerge sort and quick sort are also naturally recursive because they repeatedly\nsolve smaller versions of the same problem.\n\nBy contrast, a simple linked-list traversal does not necessarily benefit from\nrecursion; an iterative loop may be shorter and easier to control.",
 },
 {
 title: "Practice",
 content: "Trace a small example of naturally recursive problems by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "SUMMARY",
 slug: "interview-and-revision-summary",
 description: "Understand summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, recursion can improve readability when the problem itself is recursive.",
 },
 {
 title: "Detailed explanation",
 content: "Recursion can improve readability when the problem itself is recursive.\n\nIteration often provides:\n\n- lower call overhead;\n- easier control of stack usage;\n- predictable loop-based execution.\n\nUse recursion deliberately, especially for algorithms with large branching\nor poor growth characteristics.\n\nCompiler/runtime optimizations may change the practical behavior, so actual\nperformance should be measured where important.",
 },
 {
 title: "Practice",
 content: "Trace a small example of summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "WHAT CONSTITUTES A UNIT TEST?",
 slug: "interview-and-revision-what-constitutes-a-unit-test",
 description: "Understand what constitutes a unit test? with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a unit test should focus on one atomic behavior.",
 },
 {
 title: "Detailed explanation",
 content: "A unit test should focus on one atomic behavior.\n\nGood unit test:\n\n- small;\n- focused;\n- understandable;\n- fast;\n- explicit about expected behavior.\n\nIf a test verifies many unrelated properties simultaneously, failures become\nharder to diagnose.\n\nTests should also execute quickly because a very slow suite is less likely to\nbe run frequently.",
 },
 {
 title: "Practice",
 content: "Trace a small example of what constitutes a unit test? by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "WHEN SHOULD I WRITE TESTS?",
 slug: "interview-and-revision-when-should-i-write-tests",
 description: "Understand when should i write tests? with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, this topic discusses Test-Driven Development (TDD).",
 },
 {
 title: "Detailed explanation",
 content: "This topic discusses Test-Driven Development (TDD).\n\nThe core TDD cycle is:\n\nRED\nWrite a test that fails.\n\nGREEN\nWrite enough implementation to make it pass.\n\nREFACTOR\nImprove structure/readability while keeping the test passing.\n\nThis encourages incremental development because each step has a small,\nexplicit objective.",
 },
 {
 title: "Practice",
 content: "Trace a small example of when should i write tests? by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "HOW SERIOUSLY SHOULD I VIEW MY TEST SUITE?",
 slug: "interview-and-revision-how-seriously-should-i-view-my-test-suite",
 description: "Understand how seriously should i view my test suite? with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, tests should be treated as real project assets.",
 },
 {
 title: "Detailed explanation",
 content: "Tests should be treated as real project assets.\n\nThat means:\n\n- clean naming;\n- maintainable structure;\n- source control;\n- clear intent;\n- consistent quality.\n\nA test suite is not disposable code.",
 },
 {
 title: "Practice",
 content: "Trace a small example of how seriously should i view my test suite? by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "THE THREE A’S",
 slug: "interview-and-revision-the-three-as",
 description: "Understand the three a’s with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, a popular structure described by This topic is:.",
 },
 {
 title: "Detailed explanation",
 content: "A popular structure described by This topic is:\n\nASSEMBLE\nCreate the objects and input state required by the test.\n\nACT\nPerform the operation being tested.\n\nASSERT\nVerify the expected result/state.\n\nExample concept:\n\nAssemble:\ncreate object\n\nAct:\ncall method\n\nAssert:\nverify expected property/value\n\nThis gives tests a predictable and readable structure.",
 },
 {
 title: "Practice",
 content: "Trace a small example of the three a’s by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "STRUCTURING TESTS",
 slug: "interview-and-revision-structuring-tests",
 description: "Understand structuring tests with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, test organization should resemble good production-code organization.",
 },
 {
 title: "Detailed explanation",
 content: "Test organization should resemble good production-code organization.\n\nFor example:\n\nPerson\nPersonTest\n\nTests can be separated from production code and placed in their own test\nproject/module.\n\nThe important point is that test code deserves deliberate architecture too.",
 },
 {
 title: "Practice",
 content: "Trace a small example of structuring tests by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "CODE COVERAGE",
 slug: "interview-and-revision-code-coverage",
 description: "Understand code coverage with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, code coverage indicates how much production code is executed by tests.",
 },
 {
 title: "Detailed explanation",
 content: "Code coverage indicates how much production code is executed by tests.\n\nHigh coverage can be useful, but coverage is an indicator rather than a proof\nthat software is correct.\n\nA test suite can execute many lines without checking the right outcomes.\n\nTherefore:\n\ncoverage helps measure testing breadth,\nassertions and test quality determine whether behavior is actually verified.",
 },
 {
 title: "Practice",
 content: "Trace a small example of code coverage by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "TESTING SUMMARY",
 slug: "interview-and-revision-testing-summary",
 description: "Understand testing summary with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, testing protects software against regressions and edge-case failures.",
 },
 {
 title: "Detailed explanation",
 content: "Testing protects software against regressions and edge-case failures.\n\nFor algorithmic code, tests should deliberately include:\n\n- empty input;\n- one-element input;\n- minimum/maximum values;\n- duplicates;\n- missing values;\n- boundary positions;\n- unusual ordering;\n- invalid input where applicable.",
 },
 {
 title: "Practice",
 content: "Trace a small example of testing summary by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "MASTER COMPLEXITY CHEAT SHEET",
 slug: "interview-and-revision-master-complexity-cheat-sheet",
 description: "Understand master complexity cheat sheet with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nLinked List\nendpoint insertion with head/tail references: O(1)\nsearch: O(n)\ngeneral deletion by value: O(n)\nrandom insertion when predecessor is unknown: O(n)\nsingly linked reverse traversal using predecessor search: O(n^2)\n\nBST\n search: O(log n) when reasonably balanced; O(n) worst shape\n insertion: O(log n) when reasonably balanced; O(n) worst shape\n deletion: O(log n) when reasonably balanced; O(n) worst shape\ntraversal: O(n)\n\nHeap\nroot/extreme access: O(1)\ninsertion: O(log n)\narbitrary search: O(n)\nrepair after deletion: O(log n) after target position is known\n\nUnordered Set\nlookup: approximately O(1)\ninsertion: approximately O(1)\n\nOrdered Set / AVL-backed\nlookup: O(log n)\ninsertion: O(log n)\ndeletion: O(log n)\ntraversal/output: O(n)\n\nQueue\nenqueue: O(1)\ndequeue: O(1)\npeek: O(1)\nsearch: O(n)\n\nDeque\nfront insertion: O(1)\nback insertion: O(1)\nfront deletion: O(1)\nback deletion: O(1)\n\nSorting\nBubble sort: O(n^2)\nMerge sort: O(n log n)\nQuick sort: typically O(n log n), can degrade toward O(n^2)\nInsertion sort: O(n^2) worst case\nShell sort: approximately O(n log^2 n) for the approach discussed here\nRadix sort: depends on number of digits/keys and bucket processing\n\nSearching\nSequential: O(n)\nProbability search: O(n) worst case, can improve practical access for\nfrequently searched values\n\nStrings\nPalindrome two-pointer method: O(n)\nRepeated-word counting: dependent on splitting/set implementation\nFirst matching character using nested loops: O(n^2)",
 },
 {
 title: "Practice",
 content: "Trace a small example of master complexity cheat sheet by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INTERVIEW-FOCUSED TAKEAWAYS",
 slug: "interview-and-revision-interview-focused-takeaways",
 description: "Understand interview-focused takeaways with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\n1. Why can linked-list insertion be O(1)?\n Because the structure can maintain direct references to the head and tail.\n Random insertion can still be O(n) when the predecessor must be located.\n\n2. Why can a BST be O(log n)?\n A reasonably balanced tree eliminates roughly half of the remaining search\n space at each level.\n\n3. Why can a BST become O(n)?\n If nodes become arranged as a long chain, tree height becomes n.\n\n4. Why use AVL instead of a plain BST?\n AVL explicitly maintains balance so tree height stays logarithmic.\n\n5. Why is heap search O(n)?\n Heap order only guarantees a parent/child relationship. It does not provide\n the complete left-smaller/right-larger ordering of a BST.\n\n6. Why is a heap good for a priority queue?\n The highest-priority item can be maintained at the root while insertion and\n removal repair the heap in logarithmic time.\n\n7. Why is inorder traversal special for a BST?\n It visits values in sorted order.\n\n8. Why does merge sort achieve O(n log n)?\n There are logarithmically many levels of splitting and linear work per level\n during merging.\n\n9. Why can quick sort become O(n^2)?\n Poor pivot choices can create highly unbalanced partitions repeatedly.\n\n10. Why does radix sort not work like comparison sorting?\nIt groups values by digit/key rather than repeatedly comparing arbitrary\npairs of values.\n\n11. Why can sequential search not beat O(n) in the general case?\nWithout additional structure, a missing target may require inspecting every\nelement.\n\n12. What is the advantage of probability search?\nIt adapts the list order so frequently accessed values tend to appear\nearlier.\n\n13. Why does palindrome detection use two pointers?\nA palindrome is defined by matching symmetric positions, so the two ends\ncan move toward the center.\n\n14. Why is a set useful for repeated-word counting?\nA set automatically stores unique normalized words.\n\n15. Why should recursive algorithms have a base case?\nThe base case terminates recursion and prevents unbounded calls.\n\n16. What is the cost of recursive calls?\nEach call requires runtime call state/activation-record information and\nconsumes stack space while the call chain remains active.\n\n17. What is the Red-Green-Refactor cycle?\nRed = failing test, Green = make it pass, Refactor = improve structure\nwithout changing the tested behavior.\n\n18. What is the Three A’s pattern?\n Assemble -> Act -> Assert.",
 },
 {
 title: "Practice",
 content: "Trace a small example of interview-focused takeaways by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "INTERVIEW-READY DSA CHECKLIST",
 slug: "interview-and-revision-interview-ready-dsa-checklist",
 description: "Understand interview-ready dsa checklist with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nBefore considering a topic complete, make sure you can answer these questions\nin your own words:\n\n1. What problem does this data structure or algorithm solve?\n2. What is the core idea behind it?\n3. What is the simplest example?\n4. What is the best, average, and worst-case behavior when relevant?\n5. What edge cases should be tested?\n6. What alternative could be used?\n7. Why would you choose one approach over another?\n8. Can you implement the basic version without copying code?\n\nA strong interview answer usually has this shape:\n\nProblem\n ->\nIdea\n ->\nExample\n ->\nImplementation\n ->\nComplexity\n ->\nEdge cases\n ->\nTrade-offs",
 },
 {
 title: "Practice",
 content: "Trace a small example of interview-ready dsa checklist by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 {
 title: "FINAL REVISION CHECKLIST",
 slug: "interview-and-revision-final-revision-checklist",
 description: "Understand final revision checklist with a clear concept, detailed explanation, and practical reasoning.",
 estimatedMinutes: 10,
 sections: [
 {
 title: "Concept",
 content: "In simple terms, ============================================================.",
 },
 {
 title: "Detailed explanation",
 content: "============================================================\n\nBefore publishing or using This topic for interview preparation:\n\n [ ] I can explain each topic without reading the definition.\n [ ] I can draw linked lists, BSTs, heaps, queues, and AVL trees.\n [ ] I can trace recursive calls on paper.\n [ ] I know the important complexity trade-offs.\n [ ] I can explain why an algorithm works, not just what it does.\n [ ] I know the important edge cases.\n [ ] I can implement the basic algorithms in my target language.\n [ ] I can compare two approaches and justify the choice.\n\nThe goal is not to memorize DSA. The goal is to develop the habit of looking\nat a problem, identifying the important operations, choosing a suitable\nstructure or algorithm, and explaining the trade-off clearly.",
 },
 {
 title: "Practice",
 content: "Trace a small example of final revision checklist by hand, explain each important state change, and then implement the basic version yourself.",
 },
 ],
 },
 ],
 },
];

const dsaCategory: CategorySeed = {
 name: "Data Structures & Algorithms",
 slug: "data-structures-algorithms",
 description: "Interview-focused Data Structures and Algorithms learning material with clear explanations and practical examples.",
 icon: "DSA",
 sortOrder: 0,
 paths: [
 {
 name: "DSA",
 slug: "dsa",
 description: "A structured path for learning and practicing Data Structures and Algorithms.",
 level: StudyLevel.INTERMEDIATE,
 modules,
 },
 ],
};

async function ensureCategory(categorySeed: CategorySeed) {
 const category = await prisma.studyCategory.upsert({
 where: { name: categorySeed.name },
 update: {
 name: categorySeed.name,
 slug: categorySeed.slug,
 description: categorySeed.description,
 icon: categorySeed.icon,
 isPublished: true,
 sortOrder: categorySeed.sortOrder,
 },
 create: {
 name: categorySeed.name,
 slug: categorySeed.slug,
 description: categorySeed.description,
 icon: categorySeed.icon,
 isPublished: true,
 sortOrder: categorySeed.sortOrder,
 },
 });

 for (let pathIndex = 0; pathIndex < categorySeed.paths.length; pathIndex += 1) {
 const pathSeed = categorySeed.paths[pathIndex];
 const path = await prisma.studyPath.upsert({
 where: {
 categoryId_level: {
 categoryId: category.id,
 level: pathSeed.level,
 },
 },
 update: {
 name: pathSeed.name,
 slug: pathSeed.slug,
 description: pathSeed.description,
 level: pathSeed.level,
 isPublished: true,
 sortOrder: pathIndex,
 },
 create: {
 categoryId: category.id,
 name: pathSeed.name,
 slug: pathSeed.slug,
 description: pathSeed.description,
 level: pathSeed.level,
 isPublished: true,
 sortOrder: pathIndex,
 },
 });

 for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex += 1) {
 const moduleSeed = pathSeed.modules[moduleIndex];
 const studyModule = await prisma.studyModule.upsert({
 where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
 update: {
 title: moduleSeed.title,
 description: moduleSeed.description,
 isPublished: true,
 sortOrder: moduleIndex,
 },
 create: {
 studyPathId: path.id,
 title: moduleSeed.title,
 slug: moduleSeed.slug,
 description: moduleSeed.description,
 isPublished: true,
 sortOrder: moduleIndex,
 },
 });

 for (let topicIndex = 0; topicIndex < moduleSeed.topics.length; topicIndex += 1) {
 const topicSeed = moduleSeed.topics[topicIndex];
 const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;
 const topic = await prisma.studyTopic.upsert({
 where: { categoryId_slug: { categoryId: category.id, slug: topicSlug } },
 update: {
 title: topicSeed.title,
 moduleId: studyModule.id,
 seoDescription: topicSeed.description,
 estimatedMinutes: topicSeed.estimatedMinutes,
 isPublished: true,
 sortOrder: topicIndex,
 },
 create: {
 categoryId: category.id,
 moduleId: studyModule.id,
 title: topicSeed.title,
 slug: topicSlug,
 seoDescription: topicSeed.description,
 estimatedMinutes: topicSeed.estimatedMinutes,
 isPublished: true,
 sortOrder: topicIndex,
 prerequisiteIds: [],
 relatedTopicIds: [],
 },
 });

 for (let sectionIndex = 0; sectionIndex < topicSeed.sections.length; sectionIndex += 1) {
 const section = topicSeed.sections[sectionIndex];
 await prisma.studyTopicSection.upsert({
 where: { id: `${topic.id}-section-${sectionIndex}` },
 update: {
 title: section.title,
 content: section.content,
 sortOrder: sectionIndex,
 },
 create: {
 id: `${topic.id}-section-${sectionIndex}`,
 topicId: topic.id,
 title: section.title,
 content: section.content,
 sortOrder: sectionIndex,
 },
 });
 }
 }
 }
 }
};

async function main() {
 await ensureCategory(dsaCategory);
 console.log(`DSA seed completed: ${modules.length} modules, ${106} topics, ${333} sections`);
}

main()
 .catch((error) => {
 console.error("DSA seed failed:", error);
 process.exit(1);
 })
 .finally(async () => {
 await prisma.$disconnect();
 });
