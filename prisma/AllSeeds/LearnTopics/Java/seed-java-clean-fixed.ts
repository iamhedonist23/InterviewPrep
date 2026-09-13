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
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });
        const sections = [...(topicSeed.sections ?? [])];
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

async function seedJavaCategory() {
  const javaCategory: CategorySeed = {
    name: "Java (Core)",
    slug: "java-core",
    description: "Source-aligned Java curriculum based on the original Java curriculum, covering the source's 21-day progression from Java fundamentals and OOP through applets, AWT, networking, exceptions, multithreading, streams, native methods, JVM internals, and its language/API appendices. Some APIs and browser technologies reflect the historical Java release described by the source.",
    icon: "JAVA",
    sortOrder: 0,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the Java language, object model, syntax, objects, arrays, classes, and methods through Days 1–7.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Day 1: An Introduction to Java Programming",
            slug: "day-1-an-introduction-to-java-programming",
            description: "Source-aligned module based on Day 1 of : An Introduction to Java Programming.",
            topics: [
              {
                title: "What Is Java?",
                slug: "day-1-what-is-java",
                description: "Learn What Is Java? as presented in Day 1 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Java as a language and platform", content: "The source introduces What Is Java? by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Java as a language and platform**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                  { title: "Java compiler and interpreter", content: "The source introduces What Is Java? by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Java compiler and interpreter**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                  { title: "Applications and applets", content: "The source introduces What Is Java? by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Applications and applets**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                ],
              },
              {
                title: "Java’s Past, Present, and Future",
                slug: "day-1-java-s-past-present-and-future",
                description: "Learn Java’s Past, Present, and Future as presented in Day 1 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Java's origins and evolution in the source's historical context", content: "The source introduces Java’s Past, Present, and Future by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Java's origins and evolution in the source's historical context**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                ],
              },
              {
                title: "Why Learn Java?",
                slug: "day-1-why-learn-java",
                description: "Learn Why Learn Java? as presented in Day 1 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Platform independence", content: "The source introduces Why Learn Java? by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Platform independence**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                  { title: "Object-oriented programming", content: "The source introduces Why Learn Java? by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Object-oriented programming**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                  { title: "Ease of learning", content: "The source introduces Why Learn Java? by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Ease of learning**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                ],
              },
              {
                title: "Getting Started with Programming in Java",
                slug: "day-1-getting-started-with-programming-in-java",
                description: "Learn Getting Started with Programming in Java as presented in Day 1 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Getting the software", content: "The source introduces Getting Started with Programming in Java by connecting the idea to Java's original design goals and the way a Java program is developed and executed. For **Getting the software**, focus on the relationship between source code, the Java development tools, and the runtime environment rather than treating Java as only a syntax set. The book presents these ideas as the foundation for understanding why Java programs can be moved between supported environments." },
                  { title: "Creating a Java application", content: "The source introduces **Creating a Java application** as part of its treatment of **Getting Started with Programming in Java**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Creating a Java applet", content: "The book's Day 1 treatment of **Creating a Java applet** is part of its original browser-applet programming model. The source explains how **Getting Started with Programming in Java** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
            ],
          },
          {
            title: "Day 2: Object-Oriented Programming and Java",
            slug: "day-2-object-oriented-programming-and-java",
            description: "Source-aligned module based on Day 2 of : Object-Oriented Programming and Java.",
            topics: [
              {
                title: "Thinking in Objects: An Analogy",
                slug: "day-2-thinking-in-objects-an-analogy",
                description: "Learn Thinking in Objects: An Analogy as presented in Day 2 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Modeling a problem with objects", content: "In this part of the source, **Modeling a problem with objects** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Thinking in Objects: An Analogy** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Objects and Classes",
                slug: "day-2-objects-and-classes",
                description: "Learn Objects and Classes as presented in Day 2 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Objects", content: "In this part of the source, **Objects** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Objects and Classes** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "In this part of the source, **Classes** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Objects and Classes** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Class definitions", content: "In this part of the source, **Class definitions** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Objects and Classes** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Behavior and Attributes",
                slug: "day-2-behavior-and-attributes",
                description: "Learn Behavior and Attributes as presented in Day 2 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Attributes", content: "In this part of the source, **Attributes** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Behavior and Attributes** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Behavior", content: "In this part of the source, **Behavior** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Behavior and Attributes** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Creating a class", content: "In this part of the source, **Creating a class** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Behavior and Attributes** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Inheritance, Interfaces, and Packages",
                slug: "day-2-inheritance-interfaces-and-packages",
                description: "Learn Inheritance, Interfaces, and Packages as presented in Day 2 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 32,
                sections: [
                  { title: "Inheritance", content: "In this part of the source, **Inheritance** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Inheritance, Interfaces, and Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Creating a class hierarchy", content: "In this part of the source, **Creating a class hierarchy** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Inheritance, Interfaces, and Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "How inheritance works", content: "In this part of the source, **How inheritance works** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Inheritance, Interfaces, and Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Single and multiple inheritance", content: "In this part of the source, **Single and multiple inheritance** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Inheritance, Interfaces, and Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Interfaces and packages", content: "In this part of the source, **Interfaces and packages** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Inheritance, Interfaces, and Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Creating a Subclass",
                slug: "day-2-creating-a-subclass",
                description: "Learn Creating a Subclass as presented in Day 2 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Extending a class", content: "In this part of the source, **Extending a class** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Creating a Subclass** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Overriding inherited behavior", content: "In this part of the source, **Overriding inherited behavior** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Creating a Subclass** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
            ],
          },
          {
            title: "Day 3: Java Basics",
            slug: "day-3-java-basics",
            description: "Source-aligned module based on Day 3 of : Java Basics.",
            topics: [
              {
                title: "Statements and Expressions",
                slug: "day-3-statements-and-expressions",
                description: "Learn Statements and Expressions as presented in Day 3 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Statements", content: "The source treats **Statements** as one of the language-level building blocks used inside Java methods. Study how **Statements and Expressions** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Expressions", content: "The source treats **Expressions** as one of the language-level building blocks used inside Java methods. Study how **Statements and Expressions** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Variables and Data Types",
                slug: "day-3-variables-and-data-types",
                description: "Learn Variables and Data Types as presented in Day 3 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 27,
                sections: [
                  { title: "Declaring variables", content: "The source treats **Declaring variables** as one of the language-level building blocks used inside Java methods. Study how **Variables and Data Types** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Variable names", content: "The source treats **Variable names** as one of the language-level building blocks used inside Java methods. Study how **Variables and Data Types** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Variable types", content: "The source treats **Variable types** as one of the language-level building blocks used inside Java methods. Study how **Variables and Data Types** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Assigning values", content: "The source treats **Assigning values** as one of the language-level building blocks used inside Java methods. Study how **Variables and Data Types** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Comments",
                slug: "day-3-comments",
                description: "Learn Comments as presented in Day 3 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Comment forms and purpose", content: "The source treats **Comment forms and purpose** as one of the language-level building blocks used inside Java methods. Study how **Comments** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Literals",
                slug: "day-3-literals",
                description: "Learn Literals as presented in Day 3 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Number literals", content: "The source treats **Number literals** as one of the language-level building blocks used inside Java methods. Study how **Literals** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Boolean literals", content: "The source treats **Boolean literals** as one of the language-level building blocks used inside Java methods. Study how **Literals** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Character literals", content: "The source treats **Character literals** as one of the language-level building blocks used inside Java methods. Study how **Literals** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "String literals", content: "The source treats **String literals** as one of the language-level building blocks used inside Java methods. Study how **Literals** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Expressions and Operators",
                slug: "day-3-expressions-and-operators",
                description: "Learn Expressions and Operators as presented in Day 3 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 39,
                sections: [
                  { title: "Arithmetic", content: "The source treats **Arithmetic** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Assignment", content: "The source treats **Assignment** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Increment and decrement", content: "The source treats **Increment and decrement** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Comparisons", content: "The source treats **Comparisons** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Logical operators", content: "The source treats **Logical operators** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Bitwise operators", content: "The source treats **Bitwise operators** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Operator precedence", content: "The source treats **Operator precedence** as one of the language-level building blocks used inside Java methods. Study how **Expressions and Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "String Arithmetic",
                slug: "day-3-string-arithmetic",
                description: "Learn String Arithmetic as presented in Day 3 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "String concatenation", content: "The source treats **String concatenation** as one of the language-level building blocks used inside Java methods. Study how **String Arithmetic** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "The += operator", content: "The source treats **The += operator** as one of the language-level building blocks used inside Java methods. Study how **String Arithmetic** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
            ],
          },
          {
            title: "Day 4: Working with Objects",
            slug: "day-4-working-with-objects",
            description: "Source-aligned module based on Day 4 of : Working with Objects.",
            topics: [
              {
                title: "Creating New Objects",
                slug: "day-4-creating-new-objects",
                description: "Learn Creating New Objects as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Using new", content: "The source explains **Using new** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Creating New Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "What new does", content: "The source explains **What new does** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Creating New Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "Memory-management perspective", content: "The source explains **Memory-management perspective** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Creating New Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                ],
              },
              {
                title: "Accessing and Setting Variables",
                slug: "day-4-accessing-and-setting-variables",
                description: "Learn Accessing and Setting Variables as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Getting values", content: "The source treats **Getting values** as one of the language-level building blocks used inside Java methods. Study how **Accessing and Setting Variables** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Changing values", content: "The source treats **Changing values** as one of the language-level building blocks used inside Java methods. Study how **Accessing and Setting Variables** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Class variables", content: "The source treats **Class variables** as one of the language-level building blocks used inside Java methods. Study how **Accessing and Setting Variables** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Calling Methods",
                slug: "day-4-calling-methods",
                description: "Learn Calling Methods as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Instance methods", content: "The source uses **Instance methods** to show how Java classes package reusable behavior. Study **Calling Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Class methods", content: "The source uses **Class methods** to show how Java classes package reusable behavior. Study **Calling Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "References to Objects",
                slug: "day-4-references-to-objects",
                description: "Learn References to Objects as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Object references", content: "The source explains **Object references** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **References to Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "Reference behavior", content: "In this part of the source, **Reference behavior** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **References to Objects** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Casting and Converting",
                slug: "day-4-casting-and-converting",
                description: "Learn Casting and Converting as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Casting primitive types", content: "The source explains **Casting primitive types** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Casting and Converting**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "Casting objects", content: "The source explains **Casting objects** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Casting and Converting**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "Primitive/object conversion", content: "The source explains **Primitive/object conversion** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Casting and Converting**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                ],
              },
              {
                title: "Comparing and Copying Objects",
                slug: "day-4-comparing-and-copying-objects",
                description: "Learn Comparing and Copying Objects as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Comparing objects", content: "The source explains **Comparing objects** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Comparing and Copying Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "Copying objects", content: "The source explains **Copying objects** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Comparing and Copying Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "clone()", content: "The source explains **clone()** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Comparing and Copying Objects**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                ],
              },
              {
                title: "Determining the Class of an Object",
                slug: "day-4-determining-the-class-of-an-object",
                description: "Learn Determining the Class of an Object as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "getClass()", content: "The source explains **getClass()** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Determining the Class of an Object**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "instanceof", content: "The source explains **instanceof** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Determining the Class of an Object**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                ],
              },
              {
                title: "The Java Class Libraries",
                slug: "day-4-the-java-class-libraries",
                description: "Learn The Java Class Libraries as presented in Day 4 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Using library classes", content: "The source explains **Using library classes** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **The Java Class Libraries**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                  { title: "Exploring API documentation", content: "The source explains **Exploring API documentation** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **The Java Class Libraries**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                ],
              },
            ],
          },
          {
            title: "Day 5: Arrays, Conditionals, and Loops",
            slug: "day-5-arrays-conditionals-and-loops",
            description: "Source-aligned module based on Day 5 of : Arrays, Conditionals, and Loops.",
            topics: [
              {
                title: "Arrays",
                slug: "day-5-arrays",
                description: "Learn Arrays as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Declaring array variables", content: "The source treats **Declaring array variables** as one of the language-level building blocks used inside Java methods. Study how **Arrays** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Creating array objects", content: "For **Creating array objects**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Arrays**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Accessing elements", content: "For **Accessing elements**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Arrays**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Changing elements", content: "For **Changing elements**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Arrays**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Multidimensional arrays", content: "For **Multidimensional arrays**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Arrays**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                ],
              },
              {
                title: "Block Statements",
                slug: "day-5-block-statements",
                description: "Learn Block Statements as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Blocks and lexical scope", content: "The source treats **Blocks and lexical scope** as one of the language-level building blocks used inside Java methods. Study how **Block Statements** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "if Conditionals",
                slug: "day-5-if-conditionals",
                description: "Learn if Conditionals as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "if and else", content: "For **if and else**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **if Conditionals**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Conditional operator", content: "The source treats **Conditional operator** as one of the language-level building blocks used inside Java methods. Study how **if Conditionals** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "switch Conditionals",
                slug: "day-5-switch-conditionals",
                description: "Learn switch Conditionals as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "switch selection", content: "For **switch selection**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **switch Conditionals**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "case and default", content: "For **case and default**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **switch Conditionals**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                ],
              },
              {
                title: "for Loops",
                slug: "day-5-for-loops",
                description: "Learn for Loops as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 18,
                sections: [
                  { title: "for initialization, test, update", content: "For **for initialization, test, update**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **for Loops**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Looping over ranges", content: "For **Looping over ranges**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **for Loops**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                ],
              },
              {
                title: "while and do Loops",
                slug: "day-5-while-and-do-loops",
                description: "Learn while and do Loops as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "while loops", content: "For **while loops**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **while and do Loops**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "do...while loops", content: "For **do...while loops**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **while and do Loops**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                ],
              },
              {
                title: "Breaking Out of Loops",
                slug: "day-5-breaking-out-of-loops",
                description: "Learn Breaking Out of Loops as presented in Day 5 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "break", content: "For **break**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Breaking Out of Loops**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Labeled loops", content: "For **Labeled loops**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Breaking Out of Loops**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                ],
              },
            ],
          },
          {
            title: "Day 6: Creating Classes and Applications in Java",
            slug: "day-6-creating-classes-and-applications-in-java",
            description: "Source-aligned module based on Day 6 of : Creating Classes and Applications in Java.",
            topics: [
              {
                title: "Defining Classes",
                slug: "day-6-defining-classes",
                description: "Learn Defining Classes as presented in Day 6 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Class declarations", content: "The source introduces **Class declarations** as part of its treatment of **Defining Classes**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Class members", content: "The source introduces **Class members** as part of its treatment of **Defining Classes**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Instance and Class Variables",
                slug: "day-6-instance-and-class-variables",
                description: "Learn Instance and Class Variables as presented in Day 6 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Instance variables", content: "The source treats **Instance variables** as one of the language-level building blocks used inside Java methods. Study how **Instance and Class Variables** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Constants", content: "The source treats **Constants** as one of the language-level building blocks used inside Java methods. Study how **Instance and Class Variables** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Class variables", content: "The source treats **Class variables** as one of the language-level building blocks used inside Java methods. Study how **Instance and Class Variables** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Creating Methods",
                slug: "day-6-creating-methods",
                description: "Learn Creating Methods as presented in Day 6 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 31,
                sections: [
                  { title: "Defining methods", content: "The source uses **Defining methods** to show how Java classes package reusable behavior. Study **Creating Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "this keyword", content: "The source uses **this keyword** to show how Java classes package reusable behavior. Study **Creating Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Variable scope", content: "The source treats **Variable scope** as one of the language-level building blocks used inside Java methods. Study how **Creating Methods** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Passing arguments", content: "The source uses **Passing arguments** to show how Java classes package reusable behavior. Study **Creating Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Class methods", content: "The source uses **Class methods** to show how Java classes package reusable behavior. Study **Creating Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "Creating Java Applications",
                slug: "day-6-creating-java-applications",
                description: "Learn Creating Java Applications as presented in Day 6 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Application structure", content: "The source introduces **Application structure** as part of its treatment of **Creating Java Applications**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "main()", content: "The source introduces **main()** as part of its treatment of **Creating Java Applications**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Command-Line Arguments",
                slug: "day-6-command-line-arguments",
                description: "Learn Command-Line Arguments as presented in Day 6 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Passing arguments", content: "The source uses **Passing arguments** to show how Java classes package reusable behavior. Study **Command-Line Arguments** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Handling arguments in a Java program", content: "The source uses **Handling arguments in a Java program** to show how Java classes package reusable behavior. Study **Command-Line Arguments** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
            ],
          },
          {
            title: "Day 7: More About Methods",
            slug: "day-7-more-about-methods",
            description: "Source-aligned module based on Day 7 of : More About Methods.",
            topics: [
              {
                title: "Method Overloading",
                slug: "day-7-method-overloading",
                description: "Learn Method Overloading as presented in Day 7 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Same method name with different arguments", content: "The source uses **Same method name with different arguments** to show how Java classes package reusable behavior. Study **Method Overloading** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Choosing the matching method", content: "The source uses **Choosing the matching method** to show how Java classes package reusable behavior. Study **Method Overloading** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "Constructor Methods",
                slug: "day-7-constructor-methods",
                description: "Learn Constructor Methods as presented in Day 7 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Basic constructors", content: "The source uses **Basic constructors** to show how Java classes package reusable behavior. Study **Constructor Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Calling another constructor", content: "The source uses **Calling another constructor** to show how Java classes package reusable behavior. Study **Constructor Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Overloading constructors", content: "The source uses **Overloading constructors** to show how Java classes package reusable behavior. Study **Constructor Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "Overriding Methods",
                slug: "day-7-overriding-methods",
                description: "Learn Overriding Methods as presented in Day 7 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Creating overriding methods", content: "The source uses **Creating overriding methods** to show how Java classes package reusable behavior. Study **Overriding Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Calling the original method", content: "The source uses **Calling the original method** to show how Java classes package reusable behavior. Study **Overriding Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Overriding constructors", content: "The source uses **Overriding constructors** to show how Java classes package reusable behavior. Study **Overriding Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "Finalizer Methods",
                slug: "day-7-finalizer-methods",
                description: "Learn Finalizer Methods as presented in Day 7 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Finalization concept and lifecycle context", content: "The source uses **Finalization concept and lifecycle context** to show how Java classes package reusable behavior. Study **Finalizer Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Study the source book's applets, graphics, animation, events, AWT interfaces, windows, and networking from Days 8–14.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Day 8: Java Applet Basics",
            slug: "day-8-java-applet-basics",
            description: "Source-aligned module based on Day 8 of : Java Applet Basics.",
            topics: [
              {
                title: "Applets and Applications",
                slug: "day-8-applets-and-applications",
                description: "Learn Applets and Applications as presented in Day 8 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "How applets and applications differ", content: "The book's Day 8 treatment of **How applets and applications differ** is part of its original browser-applet programming model. The source explains how **Applets and Applications** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Applet execution model", content: "The book's Day 8 treatment of **Applet execution model** is part of its original browser-applet programming model. The source explains how **Applets and Applications** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
              {
                title: "Creating Applets",
                slug: "day-8-creating-applets",
                description: "Learn Creating Applets as presented in Day 8 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Major applet activities", content: "The book's Day 8 treatment of **Major applet activities** is part of its original browser-applet programming model. The source explains how **Creating Applets** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "A simple applet", content: "The book's Day 8 treatment of **A simple applet** is part of its original browser-applet programming model. The source explains how **Creating Applets** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
              {
                title: "Including an Applet on a Web Page",
                slug: "day-8-including-an-applet-on-a-web-page",
                description: "Learn Including an Applet on a Web Page as presented in Day 8 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The APPLET tag", content: "The book's Day 8 treatment of **The APPLET tag** is part of its original browser-applet programming model. The source explains how **Including an Applet on a Web Page** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Testing the result", content: "The book's Day 8 treatment of **Testing the result** is part of its original browser-applet programming model. The source explains how **Including an Applet on a Web Page** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Making applets available to the web", content: "The book's Day 8 treatment of **Making applets available to the web** is part of its original browser-applet programming model. The source explains how **Including an Applet on a Web Page** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
              {
                title: "More About the APPLET Tag",
                slug: "day-8-more-about-the-applet-tag",
                description: "Learn More About the APPLET Tag as presented in Day 8 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "ALIGN", content: "The book's Day 8 treatment of **ALIGN** is part of its original browser-applet programming model. The source explains how **More About the APPLET Tag** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "HSPACE and VSPACE", content: "The book's Day 8 treatment of **HSPACE and VSPACE** is part of its original browser-applet programming model. The source explains how **More About the APPLET Tag** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "CODE and CODEBASE", content: "The book's Day 8 treatment of **CODE and CODEBASE** is part of its original browser-applet programming model. The source explains how **More About the APPLET Tag** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
              {
                title: "Passing Parameters to Applets",
                slug: "day-8-passing-parameters-to-applets",
                description: "Learn Passing Parameters to Applets as presented in Day 8 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Applet parameters and retrieval", content: "The book's Day 8 treatment of **Applet parameters and retrieval** is part of its original browser-applet programming model. The source explains how **Passing Parameters to Applets** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
            ],
          },
          {
            title: "Day 9: Graphics, Fonts, and Color",
            slug: "day-9-graphics-fonts-and-color",
            description: "Source-aligned module based on Day 9 of : Graphics, Fonts, and Color.",
            topics: [
              {
                title: "The Graphics Class",
                slug: "day-9-the-graphics-class",
                description: "Learn The Graphics Class as presented in Day 9 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Graphics object", content: "The source approaches **Graphics object** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **The Graphics Class**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Coordinate system", content: "The source approaches **Coordinate system** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **The Graphics Class**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
              {
                title: "Drawing and Filling",
                slug: "day-9-drawing-and-filling",
                description: "Learn Drawing and Filling as presented in Day 9 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 31,
                sections: [
                  { title: "Lines", content: "The source approaches **Lines** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Drawing and Filling**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Rectangles", content: "The source approaches **Rectangles** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Drawing and Filling**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Polygons", content: "The source approaches **Polygons** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Drawing and Filling**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Ovals", content: "The source approaches **Ovals** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Drawing and Filling**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Arcs", content: "The source approaches **Arcs** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Drawing and Filling**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
              {
                title: "Graphics Examples and Clearing",
                slug: "day-9-graphics-examples-and-clearing",
                description: "Learn Graphics Examples and Clearing as presented in Day 9 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Simple graphics example", content: "The source approaches **Simple graphics example** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Graphics Examples and Clearing**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Copying and clearing", content: "The source approaches **Copying and clearing** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Graphics Examples and Clearing**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
              {
                title: "Text and Fonts",
                slug: "day-9-text-and-fonts",
                description: "Learn Text and Fonts as presented in Day 9 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Creating Font objects", content: "The source approaches **Creating Font objects** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Text and Fonts**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Drawing text", content: "The source approaches **Drawing text** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Text and Fonts**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Font information", content: "The source approaches **Font information** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Text and Fonts**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
              {
                title: "Color",
                slug: "day-9-color",
                description: "Learn Color as presented in Day 9 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Color objects", content: "The source approaches **Color objects** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Color**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Current colors", content: "The source approaches **Current colors** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Color**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Color example", content: "The source approaches **Color example** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Color**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
            ],
          },
          {
            title: "Day 10: Simple Animation and Threads",
            slug: "day-10-simple-animation-and-threads",
            description: "Source-aligned module based on Day 10 of : Simple Animation and Threads.",
            topics: [
              {
                title: "Creating Animation in Java",
                slug: "day-10-creating-animation-in-java",
                description: "Learn Creating Animation in Java as presented in Day 10 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Painting and repainting", content: "The source approaches **Painting and repainting** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Creating Animation in Java**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Starting and stopping applet execution", content: "The book's Day 10 treatment of **Starting and stopping applet execution** is part of its original browser-applet programming model. The source explains how **Creating Animation in Java** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Putting the pieces together", content: "The source connects **Putting the pieces together** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Creating Animation in Java**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
              {
                title: "Threads: What They Are and Why You Need Them",
                slug: "day-10-threads-what-they-are-and-why-you-need-them",
                description: "Learn Threads: What They Are and Why You Need Them as presented in Day 10 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The animation timing problem", content: "The source connects **The animation timing problem** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Threads: What They Are and Why You Need Them**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Using a thread for repeated work", content: "The source connects **Using a thread for repeated work** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Threads: What They Are and Why You Need Them**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Fixing the digital clock example", content: "The source connects **Fixing the digital clock example** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Threads: What They Are and Why You Need Them**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
              {
                title: "Reducing Animation Flicker",
                slug: "day-10-reducing-animation-flicker",
                description: "Learn Reducing Animation Flicker as presented in Day 10 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 27,
                sections: [
                  { title: "Why flicker occurs", content: "The source connects **Why flicker occurs** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Reducing Animation Flicker**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Overriding update", content: "The source connects **Overriding update** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Reducing Animation Flicker**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Avoiding unnecessary clearing", content: "The source connects **Avoiding unnecessary clearing** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Reducing Animation Flicker**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Redrawing only what is needed", content: "The source approaches **Redrawing only what is needed** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Reducing Animation Flicker**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
            ],
          },
          {
            title: "Day 11: More Animation, Images, and Sound",
            slug: "day-11-more-animation-images-and-sound",
            description: "Source-aligned module based on Day 11 of : More Animation, Images, and Sound.",
            topics: [
              {
                title: "Retrieving and Using Images",
                slug: "day-11-retrieving-and-using-images",
                description: "Learn Retrieving and Using Images as presented in Day 11 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Getting images", content: "The source introduces **Getting images** as part of its treatment of **Retrieving and Using Images**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Drawing images", content: "The source approaches **Drawing images** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Retrieving and Using Images**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Modifying images", content: "The source introduces **Modifying images** as part of its treatment of **Retrieving and Using Images**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Creating Animation Using Images",
                slug: "day-11-creating-animation-using-images",
                description: "Learn Creating Animation Using Images as presented in Day 11 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Image-based animation", content: "The source connects **Image-based animation** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Creating Animation Using Images**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Neko example", content: "The source connects **Neko example** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Creating Animation Using Images**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
              {
                title: "Retrieving and Using Sounds",
                slug: "day-11-retrieving-and-using-sounds",
                description: "Learn Retrieving and Using Sounds as presented in Day 11 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Loading and playing sound", content: "The source introduces **Loading and playing sound** as part of its treatment of **Retrieving and Using Sounds**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Sun’s Animator Applet",
                slug: "day-11-sun-s-animator-applet",
                description: "Learn Sun’s Animator Applet as presented in Day 11 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Animator concept and example", content: "The book's Day 11 treatment of **Animator concept and example** is part of its original browser-applet programming model. The source explains how **Sun’s Animator Applet** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
              {
                title: "Double-Buffering",
                slug: "day-11-double-buffering",
                description: "Learn Double-Buffering as presented in Day 11 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Why buffering reduces flicker", content: "The source connects **Why buffering reduces flicker** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Double-Buffering**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Checkers example", content: "The source connects **Checkers example** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Double-Buffering**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
            ],
          },
          {
            title: "Day 12: Managing Simple Events and Interactivity",
            slug: "day-12-managing-simple-events-and-interactivity",
            description: "Source-aligned module based on Day 12 of : Managing Simple Events and Interactivity.",
            topics: [
              {
                title: "Mouse Clicks",
                slug: "day-12-mouse-clicks",
                description: "Learn Mouse Clicks as presented in Day 12 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 18,
                sections: [
                  { title: "mouseDown and mouseUp", content: "The source introduces **mouseDown and mouseUp** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "Spots example", content: "The source introduces **Spots example** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                ],
              },
              {
                title: "Mouse Movements",
                slug: "day-12-mouse-movements",
                description: "Learn Mouse Movements as presented in Day 12 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "mouseDrag and mouseMove", content: "The source introduces **mouseDrag and mouseMove** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "mouseEnter and mouseExit", content: "The source introduces **mouseEnter and mouseExit** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "Drawing-lines example", content: "The source approaches **Drawing-lines example** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Mouse Movements**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                ],
              },
              {
                title: "Keyboard Events",
                slug: "day-12-keyboard-events",
                description: "Learn Keyboard Events as presented in Day 12 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "keyDown", content: "The source introduces **keyDown** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "Default keys", content: "The source introduces **Default keys** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "Character input", content: "The source introduces **Character input** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                ],
              },
              {
                title: "Modifier Keys and Event Handling",
                slug: "day-12-modifier-keys-and-event-handling",
                description: "Learn Modifier Keys and Event Handling as presented in Day 12 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Testing modifier keys", content: "The source introduces **Testing modifier keys** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "AWT event handler", content: "The source introduces **AWT event handler** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                ],
              },
            ],
          },
          {
            title: "Day 13: The Java Abstract Windowing Toolkit",
            slug: "day-13-the-java-abstract-windowing-toolkit",
            description: "Source-aligned module based on Day 13 of : The Java Abstract Windowing Toolkit.",
            topics: [
              {
                title: "AWT Overview",
                slug: "day-13-awt-overview",
                description: "Learn AWT Overview as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Purpose of AWT", content: "The source presents **Purpose of AWT** as part of the AWT component and layout model. With **AWT Overview**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Component-based user interfaces", content: "In this part of the source, **Component-based user interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **AWT Overview** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Basic User Interface Components",
                slug: "day-13-basic-user-interface-components",
                description: "Learn Basic User Interface Components as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 36,
                sections: [
                  { title: "Labels", content: "In this part of the source, **Labels** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Basic User Interface Components** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Buttons", content: "In this part of the source, **Buttons** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Basic User Interface Components** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Checkboxes", content: "In this part of the source, **Checkboxes** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Basic User Interface Components** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Radio buttons", content: "In this part of the source, **Radio buttons** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Basic User Interface Components** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Choice menus", content: "In this part of the source, **Choice menus** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Basic User Interface Components** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Text fields", content: "In this part of the source, **Text fields** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Basic User Interface Components** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Panels and Layout",
                slug: "day-13-panels-and-layout",
                description: "Learn Panels and Layout as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Panels", content: "The source presents **Panels** as part of the AWT component and layout model. With **Panels and Layout**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Layout managers", content: "The source presents **Layout managers** as part of the AWT component and layout model. With **Panels and Layout**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Insets", content: "The source presents **Insets** as part of the AWT component and layout model. With **Panels and Layout**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                ],
              },
              {
                title: "Handling UI Actions and Events",
                slug: "day-13-handling-ui-actions-and-events",
                description: "Learn Handling UI Actions and Events as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "UI actions", content: "The source introduces **UI actions** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                  { title: "Event processing", content: "The source introduces **Event processing** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                ],
              },
              {
                title: "Nesting Panels and Components",
                slug: "day-13-nesting-panels-and-components",
                description: "Learn Nesting Panels and Components as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Nested panels", content: "The source presents **Nested panels** as part of the AWT component and layout model. With **Nesting Panels and Components**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Events in nested panels", content: "The source introduces **Events in nested panels** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                ],
              },
              {
                title: "More UI Components",
                slug: "day-13-more-ui-components",
                description: "Learn More UI Components as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 27,
                sections: [
                  { title: "Text areas", content: "The source introduces **Text areas** as part of its treatment of **More UI Components**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Scrolling lists", content: "The source presents **Scrolling lists** as part of the AWT component and layout model. With **More UI Components**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Scrollbars and sliders", content: "The source presents **Scrollbars and sliders** as part of the AWT component and layout model. With **More UI Components**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Canvases", content: "The source presents **Canvases** as part of the AWT component and layout model. With **More UI Components**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                ],
              },
              {
                title: "Complete RGB to HSB Converter Example",
                slug: "day-13-complete-rgb-to-hsb-converter-example",
                description: "Learn Complete RGB to HSB Converter Example as presented in Day 13 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 32,
                sections: [
                  { title: "Applet layout", content: "The book's Day 13 treatment of **Applet layout** is part of its original browser-applet programming model. The source explains how **Complete RGB to HSB Converter Example** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Panel layout", content: "The source presents **Panel layout** as part of the AWT component and layout model. With **Complete RGB to HSB Converter Example**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Subpanels", content: "The source presents **Subpanels** as part of the AWT component and layout model. With **Complete RGB to HSB Converter Example**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Handling actions", content: "The source introduces **Handling actions** as part of its treatment of **Complete RGB to HSB Converter Example**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Updating the result", content: "The source introduces **Updating the result** as part of its treatment of **Complete RGB to HSB Converter Example**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
            ],
          },
          {
            title: "Day 14: Windows, Networking, and Other Tidbits",
            slug: "day-14-windows-networking-and-other-tidbits",
            description: "Source-aligned module based on Day 14 of : Windows, Networking, and Other Tidbits.",
            topics: [
              {
                title: "Windows, Menus, and Dialog Boxes",
                slug: "day-14-windows-menus-and-dialog-boxes",
                description: "Learn Windows, Menus, and Dialog Boxes as presented in Day 14 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 32,
                sections: [
                  { title: "Frames", content: "The source presents **Frames** as part of the AWT component and layout model. With **Windows, Menus, and Dialog Boxes**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Menus", content: "The source presents **Menus** as part of the AWT component and layout model. With **Windows, Menus, and Dialog Boxes**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Dialog boxes", content: "The source presents **Dialog boxes** as part of the AWT component and layout model. With **Windows, Menus, and Dialog Boxes**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "File dialogs", content: "The source presents **File dialogs** as part of the AWT component and layout model. With **Windows, Menus, and Dialog Boxes**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                  { title: "Window events", content: "The source introduces **Window events** as an event-driven interaction problem. Study which event method receives the user action, what information is supplied with the event, and what state the program changes in response. The examples are useful for understanding the general event-handler pattern even though the specific event API belongs to the source's original Java environment." },
                ],
              },
              {
                title: "AWT Windows in Stand-Alone Applications",
                slug: "day-14-awt-windows-in-stand-alone-applications",
                description: "Learn AWT Windows in Stand-Alone Applications as presented in Day 14 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Using windows outside an applet", content: "The book's Day 14 treatment of **Using windows outside an applet** is part of its original browser-applet programming model. The source explains how **AWT Windows in Stand-Alone Applications** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
              {
                title: "Networking in Java",
                slug: "day-14-networking-in-java",
                description: "Learn Networking in Java as presented in Day 14 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 31,
                sections: [
                  { title: "Creating links inside applets", content: "The book's Day 14 treatment of **Creating links inside applets** is part of its original browser-applet programming model. The source explains how **Networking in Java** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Opening web connections", content: "The source explains **Opening web connections** using the networking facilities available in its Java release. Study **Networking in Java** as a sequence: identify the remote resource or endpoint, open the connection, obtain the appropriate stream or socket, and process the data. The examples also illustrate the difference between simply opening a resource and building an interactive networked program." },
                  { title: "openStream()", content: "The source explains **openStream()** using the networking facilities available in its Java release. Study **Networking in Java** as a sequence: identify the remote resource or endpoint, open the connection, obtain the appropriate stream or socket, and process the data. The examples also illustrate the difference between simply opening a resource and building an interactive networked program." },
                  { title: "URLConnection", content: "The source explains **URLConnection** using the networking facilities available in its Java release. Study **Networking in Java** as a sequence: identify the remote resource or endpoint, open the connection, obtain the appropriate stream or socket, and process the data. The examples also illustrate the difference between simply opening a resource and building an interactive networked program." },
                  { title: "Sockets", content: "The source explains **Sockets** using the networking facilities available in its Java release. Study **Networking in Java** as a sequence: identify the remote resource or endpoint, open the connection, obtain the appropriate stream or socket, and process the data. The examples also illustrate the difference between simply opening a resource and building an interactive networked program." },
                ],
              },
              {
                title: "Other Applet Hints",
                slug: "day-14-other-applet-hints",
                description: "Learn Other Applet Hints as presented in Day 14 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "showStatus", content: "The book's Day 14 treatment of **showStatus** is part of its original browser-applet programming model. The source explains how **Other Applet Hints** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Applet information", content: "The book's Day 14 treatment of **Applet information** is part of its original browser-applet programming model. The source explains how **Other Applet Hints** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                  { title: "Communication between applets", content: "The book's Day 14 treatment of **Communication between applets** is part of its original browser-applet programming model. The source explains how **Other Applet Hints** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Explore access control, packages, interfaces, exceptions, multithreading, streams, native methods, and JVM internals from Days 15–21.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Day 15: Modifiers",
            slug: "day-15-modifiers",
            description: "Source-aligned module based on Day 15 of : Modifiers.",
            topics: [
              {
                title: "Method and Variable Access Control",
                slug: "day-15-method-and-variable-access-control",
                description: "Learn Method and Variable Access Control as presented in Day 15 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The four levels of protection", content: "The source treats **The four levels of protection** as one of the language-level building blocks used inside Java methods. Study how **Method and Variable Access Control** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Instance-variable access conventions", content: "The source treats **Instance-variable access conventions** as one of the language-level building blocks used inside Java methods. Study how **Method and Variable Access Control** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Class Variables and Methods",
                slug: "day-15-class-variables-and-methods",
                description: "Learn Class Variables and Methods as presented in Day 15 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Static/class members", content: "The source treats **Static/class members** as one of the language-level building blocks used inside Java methods. Study how **Class Variables and Methods** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "The final Modifier",
                slug: "day-15-the-final-modifier",
                description: "Learn The final Modifier as presented in Day 15 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "final classes", content: "The source uses **final classes** to control how classes, methods, and variables can be accessed or extended. For **The final Modifier**, compare what code is allowed to see or override and why a modifier changes the design of a class. The protection discussion is especially useful for understanding encapsulation and the boundaries between collaborating classes." },
                  { title: "final variables", content: "The source treats **final variables** as one of the language-level building blocks used inside Java methods. Study how **The final Modifier** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "final methods", content: "The source uses **final methods** to show how Java classes package reusable behavior. Study **The final Modifier** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "abstract Methods and Classes",
                slug: "day-15-abstract-methods-and-classes",
                description: "Learn abstract Methods and Classes as presented in Day 15 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Abstract methods", content: "The source uses **Abstract methods** to show how Java classes package reusable behavior. Study **abstract Methods and Classes** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Abstract classes", content: "The source uses **Abstract classes** to show how Java classes package reusable behavior. Study **abstract Methods and Classes** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
            ],
          },
          {
            title: "Day 16: Packages and Interfaces",
            slug: "day-16-packages-and-interfaces",
            description: "Source-aligned module based on Day 16 of : Packages and Interfaces.",
            topics: [
              {
                title: "Packages",
                slug: "day-16-packages",
                description: "Learn Packages as presented in Day 16 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Programming in the large", content: "In this part of the source, **Programming in the large** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Programming in the small", content: "In this part of the source, **Programming in the small** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Hiding classes", content: "In this part of the source, **Hiding classes** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Packages** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Interfaces",
                slug: "day-16-interfaces",
                description: "Learn Interfaces as presented in Day 16 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Programming in the large", content: "In this part of the source, **Programming in the large** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Interfaces** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Programming in the small", content: "In this part of the source, **Programming in the small** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Interfaces** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
            ],
          },
          {
            title: "Day 17: Exceptions",
            slug: "day-17-exceptions",
            description: "Source-aligned module based on Day 17 of : Exceptions.",
            topics: [
              {
                title: "Exceptions in Large Programs",
                slug: "day-17-exceptions-in-large-programs",
                description: "Learn Exceptions in Large Programs as presented in Day 17 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Programming in the large", content: "The source presents **Programming in the large** as part of Java's structured approach to abnormal conditions. Study **Exceptions in Large Programs** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                  { title: "Exception propagation and handling", content: "The source presents **Exception propagation and handling** as part of Java's structured approach to abnormal conditions. Study **Exceptions in Large Programs** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                ],
              },
              {
                title: "Exceptions in Small Programs",
                slug: "day-17-exceptions-in-small-programs",
                description: "Learn Exceptions in Small Programs as presented in Day 17 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Programming in the small", content: "The source presents **Programming in the small** as part of Java's structured approach to abnormal conditions. Study **Exceptions in Small Programs** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                  { title: "try and catch", content: "The source presents **try and catch** as part of Java's structured approach to abnormal conditions. Study **Exceptions in Small Programs** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                ],
              },
              {
                title: "Limitations Placed on the Programmer",
                slug: "day-17-limitations-placed-on-the-programmer",
                description: "Learn Limitations Placed on the Programmer as presented in Day 17 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Compiler-enforced exception handling", content: "The source presents **Compiler-enforced exception handling** as part of Java's structured approach to abnormal conditions. Study **Limitations Placed on the Programmer** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                  { title: "throws", content: "The source presents **throws** as part of Java's structured approach to abnormal conditions. Study **Limitations Placed on the Programmer** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                ],
              },
              {
                title: "finally Clause",
                slug: "day-17-finally-clause",
                description: "Learn finally Clause as presented in Day 17 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Cleanup with finally", content: "The source uses **Cleanup with finally** to control how classes, methods, and variables can be accessed or extended. For **finally Clause**, compare what code is allowed to see or override and why a modifier changes the design of a class. The protection discussion is especially useful for understanding encapsulation and the boundaries between collaborating classes." },
                ],
              },
            ],
          },
          {
            title: "Day 18: Multithreading",
            slug: "day-18-multithreading",
            description: "Source-aligned module based on Day 18 of : Multithreading.",
            topics: [
              {
                title: "The Problem with Parallelism",
                slug: "day-18-the-problem-with-parallelism",
                description: "Learn The Problem with Parallelism as presented in Day 18 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Shared state and interleaving", content: "The source introduces **Shared state and interleaving** as part of its treatment of **The Problem with Parallelism**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Thinking Multithreaded",
                slug: "day-18-thinking-multithreaded",
                description: "Learn Thinking Multithreaded as presented in Day 18 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Concurrent activities", content: "The source connects **Concurrent activities** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Thinking Multithreaded**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Points about Points", content: "The source connects **Points about Points** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Thinking Multithreaded**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Protecting a class variable", content: "The source treats **Protecting a class variable** as one of the language-level building blocks used inside Java methods. Study how **Thinking Multithreaded** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Creating and Using Threads",
                slug: "day-18-creating-and-using-threads",
                description: "Learn Creating and Using Threads as presented in Day 18 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 27,
                sections: [
                  { title: "Thread creation", content: "The source connects **Thread creation** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Creating and Using Threads**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Runnable interface", content: "In this part of the source, **Runnable interface** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Creating and Using Threads** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "ThreadTester", content: "The source connects **ThreadTester** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Creating and Using Threads**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "NamedThreadTester", content: "The source connects **NamedThreadTester** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Creating and Using Threads**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
              {
                title: "Knowing When a Thread Has Stopped",
                slug: "day-18-knowing-when-a-thread-has-stopped",
                description: "Learn Knowing When a Thread Has Stopped as presented in Day 18 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Observing thread completion", content: "The source connects **Observing thread completion** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Knowing When a Thread Has Stopped**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
              {
                title: "Thread Scheduling",
                slug: "day-18-thread-scheduling",
                description: "Learn Thread Scheduling as presented in Day 18 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Preemptive versus nonpreemptive scheduling", content: "The source connects **Preemptive versus nonpreemptive scheduling** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Thread Scheduling**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                  { title: "Testing a scheduler", content: "The source connects **Testing a scheduler** with repeated painting and the need to keep animation work separate from ordinary event processing. In **Thread Scheduling**, follow the sequence of starting work, updating state, requesting a repaint, and stopping the work. The flicker discussion highlights that visual quality depends not only on drawing commands but also on how frames are cleared and redrawn." },
                ],
              },
            ],
          },
          {
            title: "Day 19: Streams",
            slug: "day-19-streams",
            description: "Source-aligned module based on Day 19 of : Streams.",
            topics: [
              {
                title: "Input Streams",
                slug: "day-19-input-streams",
                description: "Learn Input Streams as presented in Day 19 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 38,
                sections: [
                  { title: "InputStream abstraction", content: "The source uses **InputStream abstraction** to control how classes, methods, and variables can be accessed or extended. For **Input Streams**, compare what code is allowed to see or override and why a modifier changes the design of a class. The protection discussion is especially useful for understanding encapsulation and the boundaries between collaborating classes." },
                  { title: "ByteArrayInputStream", content: "For **ByteArrayInputStream**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Input Streams**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "FileInputStream", content: "The source treats **FileInputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Input Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "FilterInputStream", content: "The source treats **FilterInputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Input Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "PipedInputStream", content: "The source treats **PipedInputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Input Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "SequenceInputStream", content: "The source treats **SequenceInputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Input Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "StringBufferInputStream", content: "The source treats **StringBufferInputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Input Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                ],
              },
              {
                title: "Output Streams",
                slug: "day-19-output-streams",
                description: "Learn Output Streams as presented in Day 19 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 30,
                sections: [
                  { title: "OutputStream abstraction", content: "The source uses **OutputStream abstraction** to control how classes, methods, and variables can be accessed or extended. For **Output Streams**, compare what code is allowed to see or override and why a modifier changes the design of a class. The protection discussion is especially useful for understanding encapsulation and the boundaries between collaborating classes." },
                  { title: "ByteArrayOutputStream", content: "For **ByteArrayOutputStream**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Output Streams**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "FileOutputStream", content: "The source treats **FileOutputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Output Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "FilterOutputStream", content: "The source treats **FilterOutputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Output Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "PipedOutputStream", content: "The source treats **PipedOutputStream** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Output Streams**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                ],
              },
              {
                title: "Related Stream Classes",
                slug: "day-19-related-stream-classes",
                description: "Learn Related Stream Classes as presented in Day 19 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Composing stream objects", content: "The source treats **Composing stream objects** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Related Stream Classes**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                  { title: "Input/output roles", content: "The source treats **Input/output roles** as a stream abstraction: data is read from or written to a source or destination through a common interface. For **Related Stream Classes**, learn what the stream represents, which operations it provides, and how specialized streams can wrap or connect to other streams. The book's examples are deliberately concrete, showing how byte-oriented input and output can be composed." },
                ],
              },
            ],
          },
          {
            title: "Day 20: Native Methods and Libraries",
            slug: "day-20-native-methods-and-libraries",
            description: "Source-aligned module based on Day 20 of : Native Methods and Libraries.",
            topics: [
              {
                title: "Disadvantages of Native Methods",
                slug: "day-20-disadvantages-of-native-methods",
                description: "Learn Disadvantages of Native Methods as presented in Day 20 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Portability and maintenance costs", content: "The source uses **Portability and maintenance costs** to show how Java classes package reusable behavior. Study **Disadvantages of Native Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "The Illusion of Required Efficiency",
                slug: "day-20-the-illusion-of-required-efficiency",
                description: "Learn The Illusion of Required Efficiency as presented in Day 20 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 24,
                sections: [
                  { title: "When native code is considered", content: "The source introduces **When native code is considered** as part of its treatment of **The Illusion of Required Efficiency**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Built-in optimizations", content: "The source discusses **Built-in optimizations** in the context of connecting Java code with native implementations. With **The Illusion of Required Efficiency**, distinguish the Java declaration from the native implementation and understand the build/linking steps the source describes. The chapter also argues that native code should not be treated as automatically necessary: first understand the performance problem and the optimizations already available." },
                  { title: "Simple optimization tricks", content: "The source discusses **Simple optimization tricks** in the context of connecting Java code with native implementations. With **The Illusion of Required Efficiency**, distinguish the Java declaration from the native implementation and understand the build/linking steps the source describes. The chapter also argues that native code should not be treated as automatically necessary: first understand the performance problem and the optimizations already available." },
                ],
              },
              {
                title: "Writing Native Methods",
                slug: "day-20-writing-native-methods",
                description: "Learn Writing Native Methods as presented in Day 20 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "Example class", content: "The source uses **Example class** to show how Java classes package reusable behavior. Study **Writing Native Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Generating header and stub files", content: "The source uses **Generating header and stub files** to show how Java classes package reusable behavior. Study **Writing Native Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Creating the native implementation", content: "The source uses **Creating the native implementation** to show how Java classes package reusable behavior. Study **Writing Native Methods** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "A Native Library",
                slug: "day-20-a-native-library",
                description: "Learn A Native Library as presented in Day 20 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Linking the library", content: "The source discusses **Linking the library** in the context of connecting Java code with native implementations. With **A Native Library**, distinguish the Java declaration from the native implementation and understand the build/linking steps the source describes. The chapter also argues that native code should not be treated as automatically necessary: first understand the performance problem and the optimizations already available." },
                  { title: "Using the library", content: "The source discusses **Using the library** in the context of connecting Java code with native implementations. With **A Native Library**, distinguish the Java declaration from the native implementation and understand the build/linking steps the source describes. The chapter also argues that native code should not be treated as automatically necessary: first understand the performance problem and the optimizations already available." },
                ],
              },
            ],
          },
          {
            title: "Day 21: Under the Hood",
            slug: "day-21-under-the-hood",
            description: "Source-aligned module based on Day 21 of : Under the Hood.",
            topics: [
              {
                title: "The Big Picture",
                slug: "day-21-the-big-picture",
                description: "Learn The Big Picture as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Why the Java execution model is useful", content: "The source introduces **Why the Java execution model is useful** as part of its treatment of **The Big Picture**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "The Java Virtual Machine",
                slug: "day-21-the-java-virtual-machine",
                description: "Learn The Java Virtual Machine as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 27,
                sections: [
                  { title: "JVM overview", content: "The source uses **JVM overview** to explain what happens below Java source code. Study **The Java Virtual Machine** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Fundamental parts", content: "The source uses **Fundamental parts** to explain what happens below Java source code. Study **The Java Virtual Machine** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Constant pool", content: "The source uses **Constant pool** to explain what happens below Java source code. Study **The Java Virtual Machine** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Limitations", content: "The source uses **Limitations** to explain what happens below Java source code. Study **The Java Virtual Machine** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                ],
              },
              {
                title: "Bytecodes in More Detail",
                slug: "day-21-bytecodes-in-more-detail",
                description: "Learn Bytecodes in More Detail as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 31,
                sections: [
                  { title: "Bytecode interpreter", content: "The source uses **Bytecode interpreter** to explain what happens below Java source code. Study **Bytecodes in More Detail** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Just-in-time compiler", content: "The source uses **Just-in-time compiler** to explain what happens below Java source code. Study **Bytecodes in More Detail** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "java2c translator", content: "The source uses **java2c translator** to explain what happens below Java source code. Study **Bytecodes in More Detail** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Bytecodes themselves", content: "The source uses **Bytecodes themselves** to explain what happens below Java source code. Study **Bytecodes in More Detail** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "quick bytecodes", content: "The source uses **quick bytecodes** to explain what happens below Java source code. Study **Bytecodes in More Detail** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                ],
              },
              {
                title: "The .class File Format",
                slug: "day-21-the-class-file-format",
                description: "Learn The .class File Format as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "Class-file structure", content: "The source uses **Class-file structure** to explain what happens below Java source code. Study **The .class File Format** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                ],
              },
              {
                title: "Method Signatures",
                slug: "day-21-method-signatures",
                description: "Learn Method Signatures as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 15,
                sections: [
                  { title: "How methods are represented", content: "The source uses **How methods are represented** to show how Java classes package reusable behavior. Study **Method Signatures** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "The Garbage Collector",
                slug: "day-21-the-garbage-collector",
                description: "Learn The Garbage Collector as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 23,
                sections: [
                  { title: "The memory-reclamation problem", content: "The source uses **The memory-reclamation problem** to explain what happens below Java source code. Study **The Garbage Collector** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Garbage collection solution", content: "The source uses **Garbage collection solution** to explain what happens below Java source code. Study **The Garbage Collector** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Parallel garbage collector", content: "The source uses **Parallel garbage collector** to explain what happens below Java source code. Study **The Garbage Collector** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                ],
              },
              {
                title: "The Security Story",
                slug: "day-21-the-security-story",
                description: "Learn The Security Story as presented in Day 21 of , with the source's concepts, terminology, examples, and practical mental model.",
                estimatedMinutes: 19,
                sections: [
                  { title: "Why security matters", content: "The source uses **Why security matters** to explain what happens below Java source code. Study **The Security Story** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                  { title: "Security model", content: "The source uses **Security model** to explain what happens below Java source code. Study **The Security Story** by tracing the path from Java source to class files and execution, then identify the runtime structures or services involved. The chapter is especially useful for building a mental model of bytecode, the virtual machine, memory management, and the security architecture described by the source." },
                ],
              },
            ],
          },
          {
            title: "Appendix A: Language Summary",
            slug: "language-summary",
            description: "Source-aligned module based on Appendix A: Language Summary in .",
            topics: [
              {
                title: "Reserved Words",
                slug: "appendix-language-summary-reserved-words",
                description: "Learn Reserved Words as summarized in Appendix A of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Java reserved words", content: "The source introduces **Java reserved words** as part of its treatment of **Reserved Words**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Comments",
                slug: "appendix-language-summary-comments",
                description: "Learn Comments as summarized in Appendix A of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Comment syntax", content: "The source treats **Comment syntax** as one of the language-level building blocks used inside Java methods. Study how **Comments** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Literals",
                slug: "appendix-language-summary-literals",
                description: "Learn Literals as summarized in Appendix A of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Literal forms", content: "The source treats **Literal forms** as one of the language-level building blocks used inside Java methods. Study how **Literals** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Variable Declaration and Assignment",
                slug: "appendix-language-summary-variable-declaration-and-assignment",
                description: "Learn Variable Declaration and Assignment as summarized in Appendix A of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Variable declarations", content: "The source treats **Variable declarations** as one of the language-level building blocks used inside Java methods. Study how **Variable Declaration and Assignment** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                  { title: "Variable assignment", content: "The source treats **Variable assignment** as one of the language-level building blocks used inside Java methods. Study how **Variable Declaration and Assignment** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Operators",
                slug: "appendix-language-summary-operators",
                description: "Learn Operators as summarized in Appendix A of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Operator summary", content: "The source treats **Operator summary** as one of the language-level building blocks used inside Java methods. Study how **Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Objects and Arrays",
                slug: "appendix-language-summary-objects-and-arrays",
                description: "Learn Objects and Arrays as summarized in Appendix A of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Object syntax", content: "For **Object syntax**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Objects and Arrays**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                  { title: "Array syntax", content: "For **Array syntax**, the source focuses on controlling data and execution with the basic Java constructs introduced in the first week. With **Objects and Arrays**, practice the smallest example first, then trace how the condition, index, loop variable, or block scope changes as execution proceeds. The important learning outcome is being able to predict the program's behavior and choose the construct that expresses the intended control flow clearly." },
                ],
              },
              {
                title: "Loops and Conditionals",
                slug: "appendix-language-summary-loops-and-conditionals",
                description: "Learn Loops and Conditionals as summarized in Appendix A of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Loop constructs", content: "The source introduces **Loop constructs** as part of its treatment of **Loops and Conditionals**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                  { title: "Conditional constructs", content: "The source introduces **Conditional constructs** as part of its treatment of **Loops and Conditionals**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Class, Method, and Constructor Definitions",
                slug: "appendix-language-summary-class-method-and-constructor-definitions",
                description: "Learn Class, Method, and Constructor Definitions as summarized in Appendix A of .",
                estimatedMinutes: 22,
                sections: [
                  { title: "Class definitions", content: "The source uses **Class definitions** to show how Java classes package reusable behavior. Study **Class, Method, and Constructor Definitions** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Method definitions", content: "The source uses **Method definitions** to show how Java classes package reusable behavior. Study **Class, Method, and Constructor Definitions** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                  { title: "Constructor definitions", content: "The source uses **Constructor definitions** to show how Java classes package reusable behavior. Study **Class, Method, and Constructor Definitions** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "Packages, Interfaces, and Importing",
                slug: "appendix-language-summary-packages-interfaces-and-importing",
                description: "Learn Packages, Interfaces, and Importing as summarized in Appendix A of .",
                estimatedMinutes: 22,
                sections: [
                  { title: "Package syntax", content: "In this part of the source, **Package syntax** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Packages, Interfaces, and Importing** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Interface syntax", content: "In this part of the source, **Interface syntax** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Packages, Interfaces, and Importing** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Importing classes", content: "In this part of the source, **Importing classes** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Packages, Interfaces, and Importing** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Exceptions and Guarding",
                slug: "appendix-language-summary-exceptions-and-guarding",
                description: "Learn Exceptions and Guarding as summarized in Appendix A of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Exception syntax", content: "The source presents **Exception syntax** as part of Java's structured approach to abnormal conditions. Study **Exceptions and Guarding** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                  { title: "Guarding code with exception handling", content: "The source presents **Guarding code with exception handling** as part of Java's structured approach to abnormal conditions. Study **Exceptions and Guarding** by following where an exceptional condition is generated, how it propagates, and where a handler takes responsibility for it. The examples emphasize that exception handling is part of program structure, not merely an output message or debugging trick." },
                ],
              },
            ],
          },
          {
            title: "Appendix B: Class Hierarchy Diagrams",
            slug: "class-hierarchy-diagrams",
            description: "Source-aligned module based on Appendix B: Class Hierarchy Diagrams in .",
            topics: [
              {
                title: "Understanding the Class Hierarchies",
                slug: "appendix-class-hierarchy-diagrams-understanding-the-class-hierarchies",
                description: "Learn Understanding the Class Hierarchies as summarized in Appendix B of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Purpose of the diagrams", content: "The source approaches **Purpose of the diagrams** through Java's early AWT graphics model. Learn the coordinate system, the drawing operation, and the state carried by the graphics context before looking at the example in **Understanding the Class Hierarchies**. The examples build visual output incrementally, so trace what is drawn, where it is drawn, and how repainting affects the final image." },
                  { title: "Reading superclass and interface relationships", content: "In this part of the source, **Reading superclass and interface relationships** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Understanding the Class Hierarchies** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
            ],
          },
          {
            title: "Appendix C: The Java Class Library",
            slug: "java-class-library",
            description: "Source-aligned module based on Appendix C: The Java Class Library in .",
            topics: [
              {
                title: "java.lang",
                slug: "appendix-java-class-library-java-lang",
                description: "Learn java.lang as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.lang** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The source introduces **Classes** as part of its treatment of **java.lang**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "java.util",
                slug: "appendix-java-class-library-java-util",
                description: "Learn java.util as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.util** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The source introduces **Classes** as part of its treatment of **java.util**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "java.io",
                slug: "appendix-java-class-library-java-io",
                description: "Learn java.io as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.io** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The source introduces **Classes** as part of its treatment of **java.io**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "java.net",
                slug: "appendix-java-class-library-java-net",
                description: "Learn java.net as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.net** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The source introduces **Classes** as part of its treatment of **java.net**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "java.awt",
                slug: "appendix-java-class-library-java-awt",
                description: "Learn java.awt as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.awt** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The source presents **Classes** as part of the AWT component and layout model. With **java.awt**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                ],
              },
              {
                title: "java.awt.image",
                slug: "appendix-java-class-library-java-awt-image",
                description: "Learn java.awt.image as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.awt.image** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The source presents **Classes** as part of the AWT component and layout model. With **java.awt.image**, identify the UI component, how it is placed or configured, and how user actions reach the program. The complete examples show how several components can be composed into a larger interface rather than used in isolation." },
                ],
              },
              {
                title: "java.awt.peer",
                slug: "appendix-java-class-library-java-awt-peer",
                description: "Learn java.awt.peer as summarized in Appendix C of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Package role", content: "In this part of the source, **Package role** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.awt.peer** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "java.applet",
                slug: "appendix-java-class-library-java-applet",
                description: "Learn java.applet as summarized in Appendix C of .",
                estimatedMinutes: 18,
                sections: [
                  { title: "Interfaces", content: "In this part of the source, **Interfaces** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **java.applet** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                  { title: "Classes", content: "The book's Day 21 treatment of **Classes** is part of its original browser-applet programming model. The source explains how **java.applet** fits into the applet lifecycle, HTML embedding model, or parameter mechanism used by Java at the time. Treat this material as source-faithful historical Java content: the terminology and browser integration reflect the era in which the source was written." },
                ],
              },
            ],
          },
          {
            title: "Appendix D: How Java Differs from C and C++",
            slug: "java-vs-c-cpp",
            description: "Source-aligned module based on Appendix D: How Java Differs from C and C++ in .",
            topics: [
              {
                title: "Pointers",
                slug: "appendix-java-vs-c-cpp-pointers",
                description: "Learn Pointers as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Pointer model differences", content: "The source compares Java with C and C++ in **Pointer model differences** to highlight language and runtime design differences. Within **Pointers**, focus on the programming consequence of each difference: how Java handles memory, types, arrays, strings, operators, control flow, and arguments. These comparisons are useful for understanding why Java code looks familiar to C/C++ programmers while behaving differently in important areas." },
                ],
              },
              {
                title: "Arrays",
                slug: "appendix-java-vs-c-cpp-arrays",
                description: "Learn Arrays as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Array behavior differences", content: "In this part of the source, **Array behavior differences** is explained through the object-oriented model used throughout Java. A useful mental model is to treat **Arrays** as a way of organizing state and behavior so that larger programs can be built from cooperating classes and objects. Pay attention to the distinction between what an object knows (its attributes/state) and what it can do (its behavior/methods), and to how relationships between classes affect reuse and design." },
                ],
              },
              {
                title: "Strings",
                slug: "appendix-java-vs-c-cpp-strings",
                description: "Learn Strings as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "String representation differences", content: "The source introduces **String representation differences** as part of its treatment of **Strings**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Memory Management",
                slug: "appendix-java-vs-c-cpp-memory-management",
                description: "Learn Memory Management as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Automatic memory management", content: "The source explains **Automatic memory management** from the perspective of working with Java objects after they have been defined. The key distinction is between an object and the reference held in a variable: creating, accessing, comparing, copying, or converting objects depends on understanding that distinction. When studying **Memory Management**, trace which object exists, which reference points to it, and what operation is being performed on the reference or object." },
                ],
              },
              {
                title: "Data Types",
                slug: "appendix-java-vs-c-cpp-data-types",
                description: "Learn Data Types as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Primitive type differences", content: "The source treats **Primitive type differences** as one of the language-level building blocks used inside Java methods. Study how **Data Types** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Operators",
                slug: "appendix-java-vs-c-cpp-operators",
                description: "Learn Operators as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Operator differences", content: "The source treats **Operator differences** as one of the language-level building blocks used inside Java methods. Study how **Operators** is written syntactically, what value or effect it produces, and how it participates in a larger expression or statement. The examples are intentionally small: use them to reason about evaluation order, values, types, and the effect of each operator instead of memorizing isolated syntax." },
                ],
              },
              {
                title: "Control Flow",
                slug: "appendix-java-vs-c-cpp-control-flow",
                description: "Learn Control Flow as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Boolean conditions and control flow", content: "The source introduces **Boolean conditions and control flow** as part of its treatment of **Control Flow**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
              {
                title: "Arguments",
                slug: "appendix-java-vs-c-cpp-arguments",
                description: "Learn Arguments as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Command-line argument differences", content: "The source uses **Command-line argument differences** to show how Java classes package reusable behavior. Study **Arguments** by identifying the method's inputs, return value or side effects, the object on which it operates, and the scope of its variables. Constructor examples emphasize initialization and method examples emphasize how objects collaborate through calls." },
                ],
              },
              {
                title: "Other Differences",
                slug: "appendix-java-vs-c-cpp-other-differences",
                description: "Learn Other Differences as summarized in Appendix D of .",
                estimatedMinutes: 14,
                sections: [
                  { title: "Other language and runtime differences", content: "The source introduces **Other language and runtime differences** as part of its treatment of **Other Differences**. Focus on the definition, the mechanics shown in the examples, and the relationship to the surrounding Java concepts. A good study approach is to reproduce the smallest example, change one input or condition, and explain why the result changes." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(javaCategory);
  console.log("✅ Java (Core) category seeded from ");
}

async function main() {
  await seedJavaCategory();
}

main()
  .catch((error) => {
    console.error("Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
