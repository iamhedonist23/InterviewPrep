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
              { title: "What is Java?", content: "Java is a high-level, class-based, object-oriented programming language... (keep existing content)" },
              { title: "JVM and Bytecode", content: "..." },
              { title: "JDK, JRE, and JVM", content: "..." },
              { title: "Your first program", content: "..." },
              { title: "Compiling and running", content: "..." },
            ],
          },
          // ... (keep all existing beginner topics: Variables and Data Types, Control Flow, etc.)
        ],
      },
      {
        title: "Object-Oriented Programming Basics",
        description: "Understand OOP principles in Java",
        topics: [
          // ... existing topics: Classes and Objects, Constructors and Methods
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
          // ... existing: Inheritance, Polymorphism, Encapsulation, Abstraction
        ],
      },
      {
        title: "Java Collections",
        description: "Working with collections framework",
        topics: [
          // ... existing: ArrayList, LinkedList, HashMap, HashSet, TreeMap/TreeSet
        ],
      },
      {
        title: "Exception Handling",
        description: "Error handling and exceptions",
        topics: [
          // ... existing: Try-Catch-Finally, Exception Hierarchy, Custom Exceptions
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
          // ... existing: Stream API, Comparators and Sorting
        ],
      },
      {
        title: "Concurrency and Multithreading",
        description: "Concurrent programming",
        topics: [
          // ... existing: Threads Basics, Synchronization, Concurrent Collections
        ],
      },
      {
        title: "Generics and Type System",
        description: "Understanding generics",
        topics: [
          // ... existing: Generics Introduction, Bounded Wildcards, Type Erasure
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
          // ... existing: equals/hashCode, Immutable Objects, Design Patterns, Memory Management, Serialization
        ],
      },
      {
        title: "Performance and Optimization",
        description: "Performance tuning and best practices",
        topics: [
          // ... existing: String Performance, Collection Performance
        ],
      },
    ],
  },
];

// ... (rest of the seed function remains unchanged)