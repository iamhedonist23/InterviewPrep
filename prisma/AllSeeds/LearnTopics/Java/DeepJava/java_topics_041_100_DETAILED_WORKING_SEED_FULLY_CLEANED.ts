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
    update: {
      name: category.name,
      description: category.description,
      icon: category.icon,
      isPublished: true,
      sortOrder: category.sortOrder,
    },
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
      update: {
        name: pathSeed.name,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: 0,
      },
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
        update: {
          title: moduleSeed.title,
          description: moduleSeed.description,
          isPublished: true,
          sortOrder: 0,
        },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          isPublished: true,
          sortOrder: 0,
        },
      });

      for (const topicSeed of moduleSeed.topics ?? []) {
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

        for (let index = 0; index < (topicSeed.sections ?? []).length; index += 1) {
          const section = topicSeed.sections![index];

          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${index}` },
            update: {
              title: section.title,
              content: section.content,
              sortOrder: index,
            },
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
    description: "Deep Core Java learning content for topics 041-100.",
    icon: "JAVA",
    sortOrder: 0,
    paths: [
      //  BEGINNER 
      {
        name: "Beginner",
        slug: "beginner",
        description: "OOP, exception handling, and strings.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Object-Oriented Programming",
            slug: "object-oriented-programming",
            description: "Classes, inheritance, overriding, polymorphism, abstraction, interfaces, Object, equality, nested classes, enums, and composition.",
            topics: [
              {
                title: "This Keyword",
                slug: "this-keyword",
                description: " Understand `this` as the reference to the current object during an instance method, constructor, or instance initializer.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "this keyword is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Understand `this` as the reference to the current object during an instance method, constructor, or instance initializer.\n• Explain field/parameter shadowing, constructor delegation with `this(...)`, passing the current object, returning `this` for fluent APIs, and why `this` is unavailable in static context.\n• Distinguish the source-level meaning of `this` from implementation-specific claims about machine registers or memory addresses.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving this keyword, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass User {\n    private final String name;\n\n    User(String name) {\n        this.name = name;\n    }\n\n    User rename(String name) {\n        return new User(name);\n    }\n\n    void print() {\n        System.out.println(this.name);\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with this keyword is to remember the surface syntax but\nforget the contract behind it.\n\n• Understand `this` as the reference to the current object during an instance method, constructor, or instance initializer.\n• Explain field/parameter shadowing, constructor delegation with `this(...)`, passing the current object, returning `this` for fluent APIs, and why `this` is unavailable in static context.\n• Distinguish the source-level meaning of `this` from implementation-specific claims about machine registers or memory addresses.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining this keyword using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where this keyword matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain this keyword to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember this keyword as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor this keyword, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Encapsulation",
                slug: "encapsulation",
                description: " Treat encapsulation as control of state and behavior, not merely private fields plus getters and setters.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Encapsulation is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Treat encapsulation as control of state and behavior, not merely private fields plus getters and setters.\n• Explain invariants, validation, behavior-oriented APIs, representation hiding, mutable collection leaks, defensive copies, unmodifiable views, and why final references are not automatically immutable.\n• Show how a class can own valid state transitions and evolve its internal representation without breaking callers.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Encapsulation, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass BankAccount {\n    private long cents;\n\n    BankAccount(long cents) {\n        if (cents < 0) throw new IllegalArgumentException(\"negative balance\");\n        this.cents = cents;\n    }\n\n    void deposit(long amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"amount\");\n        cents += amount;\n    }\n\n    long balance() {\n        return cents;\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Encapsulation is to remember the surface syntax but\nforget the contract behind it.\n\n• Treat encapsulation as control of state and behavior, not merely private fields plus getters and setters.\n• Explain invariants, validation, behavior-oriented APIs, representation hiding, mutable collection leaks, defensive copies, unmodifiable views, and why final references are not automatically immutable.\n• Show how a class can own valid state transitions and evolve its internal representation without breaking callers.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Encapsulation using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Encapsulation matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Encapsulation to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Encapsulation as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Encapsulation, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Inheritance",
                slug: "inheritance",
                description: " Explain extends, the is-a relationship, inherited members, constructor order, superclass state, overriding, protected/private access, and single class inheritance.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Inheritance is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain extends, the is-a relationship, inherited members, constructor order, superclass state, overriding, protected/private access, and single class inheritance.\n• Explain why inheritance is a coupling mechanism rather than simply a code-reuse feature.\n• Cover substitutability, fragile base classes, composition as an alternative, and important constructor/initialization consequences.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Inheritance, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass Vehicle {\n    void move() {\n        System.out.println(\"moving\");\n    }\n}\n\nclass Car extends Vehicle {\n    void drive() {\n        System.out.println(\"driving\");\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Inheritance is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain extends, the is-a relationship, inherited members, constructor order, superclass state, overriding, protected/private access, and single class inheritance.\n• Explain why inheritance is a coupling mechanism rather than simply a code-reuse feature.\n• Cover substitutability, fragile base classes, composition as an alternative, and important constructor/initialization consequences.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Inheritance using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Inheritance matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Inheritance to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Inheritance as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Inheritance, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Method Overriding",
                slug: "method-overriding",
                description: " Explain overriding as a subclass implementation of an inherited instance method with a compatible signature.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Method overriding is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain overriding as a subclass implementation of an inherited instance method with a compatible signature.\n• Cover @Override, access rules, return-type covariance, checked-exception restrictions, dynamic dispatch, and why fields/static/private methods do not behave like overridden instance methods.\n• Show how overriding interacts with constructors and why calling overridable methods during construction is risky.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Method overriding, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass Animal {\n    void sound() {\n        System.out.println(\"animal\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() {\n        System.out.println(\"woof\");\n    }\n}\n\nAnimal a = new Dog();\na.sound();\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Method overriding is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain overriding as a subclass implementation of an inherited instance method with a compatible signature.\n• Cover @Override, access rules, return-type covariance, checked-exception restrictions, dynamic dispatch, and why fields/static/private methods do not behave like overridden instance methods.\n• Show how overriding interacts with constructors and why calling overridable methods during construction is risky.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Method overriding using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Method overriding matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Method overriding to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Method overriding as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Method overriding, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Polymorphism",
                slug: "polymorphism",
                description: " Explain polymorphism as using a common type while allowing concrete implementations to vary.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Polymorphism is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain polymorphism as using a common type while allowing concrete implementations to vary.\n• Separate compile-time overload selection from runtime dispatch of overridable instance methods.\n• Cover interface-based design, substitutability, casting, instanceof, and why polymorphism reduces type-based conditional logic.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Polymorphism, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ninterface Payment {\n    void pay(long cents);\n}\n\nclass CardPayment implements Payment {\n    public void pay(long cents) {\n        System.out.println(\"card: \" + cents);\n    }\n}\n\nPayment payment = new CardPayment();\npayment.pay(5000);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Polymorphism is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain polymorphism as using a common type while allowing concrete implementations to vary.\n• Separate compile-time overload selection from runtime dispatch of overridable instance methods.\n• Cover interface-based design, substitutability, casting, instanceof, and why polymorphism reduces type-based conditional logic.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Polymorphism using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Polymorphism matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Polymorphism to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Polymorphism as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Polymorphism, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Abstraction",
                slug: "abstraction",
                description: " Explain abstraction as exposing the concepts and operations clients need while hiding unnecessary implementation details.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Abstraction is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain abstraction as exposing the concepts and operations clients need while hiding unnecessary implementation details.\n• Compare abstraction with encapsulation and show how interfaces and abstract classes create contracts.\n• Discuss abstraction quality: too little abstraction leaks implementation; too much abstraction adds indirection without useful variation.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Abstraction, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ninterface Storage {\n    void save(String value);\n}\n\nclass MemoryStorage implements Storage {\n    public void save(String value) {\n        System.out.println(\"stored: \" + value);\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Abstraction is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain abstraction as exposing the concepts and operations clients need while hiding unnecessary implementation details.\n• Compare abstraction with encapsulation and show how interfaces and abstract classes create contracts.\n• Discuss abstraction quality: too little abstraction leaks implementation; too much abstraction adds indirection without useful variation.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Abstraction using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Abstraction matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Abstraction to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Abstraction as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Abstraction, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Abstract Classes",
                slug: "abstract-classes",
                description: " Explain abstract classes, abstract methods, concrete methods, constructors, fields, and the restrictions on instantiation.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "abstract classes is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain abstract classes, abstract methods, concrete methods, constructors, fields, and the restrictions on instantiation.\n• Compare abstract classes with interfaces and show when shared state or implementation makes an abstract base class appropriate.\n• Cover method implementation requirements, subclass obligations, and design pitfalls around inheritance.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving abstract classes, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nabstract class Report {\n    abstract String render();\n\n    void print() {\n        System.out.println(render());\n    }\n}\n\nclass SalesReport extends Report {\n    @Override\n    String render() {\n        return \"sales\";\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with abstract classes is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain abstract classes, abstract methods, concrete methods, constructors, fields, and the restrictions on instantiation.\n• Compare abstract classes with interfaces and show when shared state or implementation makes an abstract base class appropriate.\n• Cover method implementation requirements, subclass obligations, and design pitfalls around inheritance.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining abstract classes using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where abstract classes matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain abstract classes to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember abstract classes as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor abstract classes, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Interfaces",
                slug: "interfaces",
                description: " Explain an interface as a contract/type that classes can implement and clients can depend upon.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Interfaces is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain an interface as a contract/type that classes can implement and clients can depend upon.\n• Cover abstract/default/static/private interface methods, multiple interface inheritance, functional interfaces, constants, and implementation obligations.\n• Explain default-method conflicts and why interfaces are central to loose coupling and testable APIs.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Interfaces, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ninterface Logger {\n    void log(String message);\n\n    default void warn(String message) {\n        log(\"WARN: \" + message);\n    }\n}\n\nclass ConsoleLogger implements Logger {\n    public void log(String message) {\n        System.out.println(message);\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Interfaces is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain an interface as a contract/type that classes can implement and clients can depend upon.\n• Cover abstract/default/static/private interface methods, multiple interface inheritance, functional interfaces, constants, and implementation obligations.\n• Explain default-method conflicts and why interfaces are central to loose coupling and testable APIs.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Interfaces using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Interfaces matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Interfaces to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Interfaces as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Interfaces, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Super Keyword",
                slug: "super-keyword",
                description: " Explain super as access to the immediate superclass context.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "super keyword is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain super as access to the immediate superclass context.\n• Cover super(), superclass constructor invocation, super.method(), super.field, constructor ordering, and why a superclass constructor runs before subclass construction.\n• Distinguish super from casting to a superclass and explain limitations such as private members.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving super keyword, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass Parent {\n    Parent() {\n        System.out.println(\"parent\");\n    }\n\n    void work() {\n        System.out.println(\"parent work\");\n    }\n}\n\nclass Child extends Parent {\n    Child() {\n        super();\n    }\n\n    @Override\n    void work() {\n        super.work();\n        System.out.println(\"child work\");\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with super keyword is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain super as access to the immediate superclass context.\n• Cover super(), superclass constructor invocation, super.method(), super.field, constructor ordering, and why a superclass constructor runs before subclass construction.\n• Distinguish super from casting to a superclass and explain limitations such as private members.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining super keyword using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where super keyword matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain super keyword to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember super keyword as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor super keyword, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Object Class",
                slug: "object-class",
                description: " Explain that ordinary Java classes ultimately participate in the Object hierarchy.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Object class is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain that ordinary Java classes ultimately participate in the Object hierarchy.\n• Cover toString, equals, hashCode, getClass, wait/notify/notifyAll at a conceptual level, and why overriding Object methods affects collections and debugging.\n• Explain the equals/hashCode contract and why identity and logical equality are different.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Object class, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass User {\n    private final int id;\n\n    User(int id) {\n        this.id = id;\n    }\n\n    @Override\n    public String toString() {\n        return \"User{id=\" + id + \"}\";\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Object class is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain that ordinary Java classes ultimately participate in the Object hierarchy.\n• Cover toString, equals, hashCode, getClass, wait/notify/notifyAll at a conceptual level, and why overriding Object methods affects collections and debugging.\n• Explain the equals/hashCode contract and why identity and logical equality are different.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Object class using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Object class matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Object class to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Object class as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Object class, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Equals And Hashcode Basics",
                slug: "equals-and-hashcode-basics",
                description: " Explain identity versus logical equality and the contracts of equals and hashCode.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "equals and hashCode basics is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain identity versus logical equality and the contracts of equals and hashCode.\n• Cover reflexive, symmetric, transitive, consistent, and non-null equality requirements; equal objects must have equal hash codes.\n• Explain why mutable keys are dangerous in hash-based collections and why overriding only one of equals/hashCode is incorrect.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving equals and hashCode basics, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nfinal class User {\n    private final int id;\n\n    User(int id) {\n        this.id = id;\n    }\n\n    @Override\n    public boolean equals(Object other) {\n        if (this == other) return true;\n        if (!(other instanceof User u)) return false;\n        return id == u.id;\n    }\n\n    @Override\n    public int hashCode() {\n        return Integer.hashCode(id);\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with equals and hashCode basics is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain identity versus logical equality and the contracts of equals and hashCode.\n• Cover reflexive, symmetric, transitive, consistent, and non-null equality requirements; equal objects must have equal hash codes.\n• Explain why mutable keys are dangerous in hash-based collections and why overriding only one of equals/hashCode is incorrect.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining equals and hashCode basics using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where equals and hashCode basics matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain equals and hashCode basics to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember equals and hashCode basics as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor equals and hashCode basics, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Nested And Inner Classes",
                slug: "nested-and-inner-classes",
                description: " Distinguish static nested classes from non-static inner classes.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Nested and inner classes is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Distinguish static nested classes from non-static inner classes.\n• Explain the enclosing-instance relationship, access to enclosing members, construction syntax, anonymous/local classes, and the memory/lifetime implications of retaining an outer instance.\n• Show when a nested type improves locality and encapsulation.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Nested and inner classes, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass Outer {\n    private int value = 10;\n\n    static class Helper {\n        int add(int a, int b) {\n            return a + b;\n        }\n    }\n\n    class Inner {\n        int value() {\n            return Outer.this.value;\n        }\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Nested and inner classes is to remember the surface syntax but\nforget the contract behind it.\n\n• Distinguish static nested classes from non-static inner classes.\n• Explain the enclosing-instance relationship, access to enclosing members, construction syntax, anonymous/local classes, and the memory/lifetime implications of retaining an outer instance.\n• Show when a nested type improves locality and encapsulation.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Nested and inner classes using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Nested and inner classes matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Nested and inner classes to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Nested and inner classes as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Nested and inner classes, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Enums",
                slug: "enums",
                description: " Explain enum types as restricted sets of named instances rather than integer constants.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Enums is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain enum types as restricted sets of named instances rather than integer constants.\n• Cover fields, constructors, methods, switch, valueOf, values, identity, equality, and enum-specific behavior.\n• Explain why enums are useful for domain states and why adding enum constants can affect switch logic and persistence formats.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Enums, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nenum OrderStatus {\n    NEW,\n    PAID,\n    SHIPPED;\n\n    boolean terminal() {\n        return this == SHIPPED;\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Enums is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain enum types as restricted sets of named instances rather than integer constants.\n• Cover fields, constructors, methods, switch, valueOf, values, identity, equality, and enum-specific behavior.\n• Explain why enums are useful for domain states and why adding enum constants can affect switch logic and persistence formats.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Enums using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Enums matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Enums to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Enums as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Enums, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Composition Vs Inheritance",
                slug: "composition-vs-inheritance",
                description: " Compare has-a composition with is-a inheritance.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Composition vs inheritance is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Compare has-a composition with is-a inheritance.\n• Explain coupling, substitutability, reuse, delegation, extension points, and why composition is often easier to evolve.\n• Show a practical design where a service receives a collaborator rather than extending a base class.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Composition vs inheritance, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ninterface Formatter {\n    String format(String value);\n}\n\nclass ReportService {\n    private final Formatter formatter;\n\n    ReportService(Formatter formatter) {\n        this.formatter = formatter;\n    }\n\n    String report(String value) {\n        return formatter.format(value);\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Composition vs inheritance is to remember the surface syntax but\nforget the contract behind it.\n\n• Compare has-a composition with is-a inheritance.\n• Explain coupling, substitutability, reuse, delegation, extension points, and why composition is often easier to evolve.\n• Show a practical design where a service receives a collaborator rather than extending a base class.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Composition vs inheritance using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Composition vs inheritance matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Composition vs inheritance to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Composition vs inheritance as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Composition vs inheritance, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Tostring",
                slug: "tostring",
                description: " Explain Object.toString and why overriding it improves diagnostics, logging, and debugging.",
                estimatedMinutes: 25,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "toString is an important Java topic in the OOP area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Object.toString and why overriding it improves diagnostics, logging, and debugging.\n• Cover the default representation, readable output, sensitive data, recursive object graphs, collections, and the distinction between toString and serialization.\n• Discuss records and generated representations conceptually, while avoiding assumptions that every toString is suitable for production logs.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving toString, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nfinal class User {\n    private final long id;\n    private final String name;\n\n    User(long id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n\n    @Override\n    public String toString() {\n        return \"User{id=\" + id + \", name='\" + name + \"'}\";\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with toString is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Object.toString and why overriding it improves diagnostics, logging, and debugging.\n• Cover the default representation, readable output, sensitive data, recursive object graphs, collections, and the distinction between toString and serialization.\n• Discuss records and generated representations conceptually, while avoiding assumptions that every toString is suitable for production logs.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining toString using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where toString matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain toString to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember toString as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor toString, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
            ],
          },
          {
            title: "Exception Handling",
            slug: "exception-handling",
            description: "How Java exceptions are represented, propagated, caught, declared, created, and managed safely.",
            topics: [
              {
                title: "Exception Handling Basics",
                slug: "exception-handling-basics",
                description: " Explain exceptions as abnormal control flow represented by Throwable objects.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Exception handling basics is an important Java topic in the Exceptions area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain exceptions as abnormal control flow represented by Throwable objects.\n• Cover Throwable, Exception, RuntimeException, Error, propagation, stack traces, and why exceptions should represent exceptional conditions rather than normal loop control.\n• Explain that handling an exception means deciding where recovery, translation, logging, or termination belongs.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Exception handling basics, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ntry {\n    int value = Integer.parseInt(\"abc\");\n    System.out.println(value);\n} catch (NumberFormatException ex) {\n    System.out.println(\"Invalid number\");\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Exception handling basics is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain exceptions as abnormal control flow represented by Throwable objects.\n• Cover Throwable, Exception, RuntimeException, Error, propagation, stack traces, and why exceptions should represent exceptional conditions rather than normal loop control.\n• Explain that handling an exception means deciding where recovery, translation, logging, or termination belongs.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Exception handling basics using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Exception handling basics matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Exception handling basics to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Exception handling basics as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Exception handling basics, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Try, Catch, And Finally",
                slug: "try-catch-and-finally",
                description: " Explain try as the protected region, catch as type-specific recovery/translation, and finally as cleanup that normally executes when control leaves the construct.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "try, catch, and finally is an important Java topic in the Exceptions area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain try as the protected region, catch as type-specific recovery/translation, and finally as cleanup that normally executes when control leaves the construct.\n• Cover catch ordering, multiple catches, return behavior, exception masking, and why try-with-resources is preferred for AutoCloseable resources.\n• Explain that finally is not an absolute guarantee under abrupt JVM/process termination.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving try, catch, and finally, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ntry {\n    System.out.println(\"work\");\n} catch (RuntimeException ex) {\n    System.out.println(\"recover\");\n} finally {\n    System.out.println(\"cleanup\");\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with try, catch, and finally is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain try as the protected region, catch as type-specific recovery/translation, and finally as cleanup that normally executes when control leaves the construct.\n• Cover catch ordering, multiple catches, return behavior, exception masking, and why try-with-resources is preferred for AutoCloseable resources.\n• Explain that finally is not an absolute guarantee under abrupt JVM/process termination.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining try, catch, and finally using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where try, catch, and finally matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain try, catch, and finally to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember try, catch, and finally as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor try, catch, and finally, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Throw And Throws",
                slug: "throw-and-throws",
                description: " Explain `throw` as raising a particular exception object and `throws` as part of a method declaration's exception contract.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "throw and throws is an important Java topic in the Exceptions area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain `throw` as raising a particular exception object and `throws` as part of a method declaration's exception contract.\n• Cover checked exception propagation, multiple throws types, exception causes, and why `throws` does not itself execute an exception.\n• Show how exception translation can preserve the original cause.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving throw and throws, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic void validate(int age) {\n    if (age < 0) {\n        throw new IllegalArgumentException(\"age\");\n    }\n}\n\nstatic void load() throws java.io.IOException {\n    throw new java.io.IOException(\"I/O failed\");\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with throw and throws is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain `throw` as raising a particular exception object and `throws` as part of a method declaration's exception contract.\n• Cover checked exception propagation, multiple throws types, exception causes, and why `throws` does not itself execute an exception.\n• Show how exception translation can preserve the original cause.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining throw and throws using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where throw and throws matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain throw and throws to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember throw and throws as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor throw and throws, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Checked Vs Unchecked Exceptions",
                slug: "checked-vs-unchecked-exceptions",
                description: " Explain checked exceptions as checked by the compiler through catch-or-declare rules, and unchecked exceptions as RuntimeException subclasses plus Error categories that do not use that requirement.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Checked vs unchecked exceptions is an important Java topic in the Exceptions area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain checked exceptions as checked by the compiler through catch-or-declare rules, and unchecked exceptions as RuntimeException subclasses plus Error categories that do not use that requirement.\n• Discuss recoverability, API design, abstraction boundaries, and why 'checked = recoverable, unchecked = programmer error' is useful but not an absolute law.\n• Cover exception translation and preserving causes.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Checked vs unchecked exceptions, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic void read() throws java.io.IOException {\n    // caller must catch or declare this checked exception\n}\n\nstatic void validate(String value) {\n    if (value == null) {\n        throw new NullPointerException(\"value\");\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Checked vs unchecked exceptions is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain checked exceptions as checked by the compiler through catch-or-declare rules, and unchecked exceptions as RuntimeException subclasses plus Error categories that do not use that requirement.\n• Discuss recoverability, API design, abstraction boundaries, and why 'checked = recoverable, unchecked = programmer error' is useful but not an absolute law.\n• Cover exception translation and preserving causes.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Checked vs unchecked exceptions using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Checked vs unchecked exceptions matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Checked vs unchecked exceptions to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Checked vs unchecked exceptions as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Checked vs unchecked exceptions, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Custom Exceptions",
                slug: "custom-exceptions",
                description: " Explain when a custom exception adds meaningful domain information and when it merely creates unnecessary types.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Custom exceptions is an important Java topic in the Exceptions area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain when a custom exception adds meaningful domain information and when it merely creates unnecessary types.\n• Cover checked versus unchecked custom exceptions, constructors, causes, messages, and API boundaries.\n• Show how callers can catch a stable domain exception without depending on a low-level library exception.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Custom exceptions, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass InsufficientFundsException extends Exception {\n    InsufficientFundsException(String message) {\n        super(message);\n    }\n}\n\nclass Account {\n    void withdraw(long amount) throws InsufficientFundsException {\n        if (amount > 100) {\n            throw new InsufficientFundsException(\"balance too low\");\n        }\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Custom exceptions is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain when a custom exception adds meaningful domain information and when it merely creates unnecessary types.\n• Cover checked versus unchecked custom exceptions, constructors, causes, messages, and API boundaries.\n• Show how callers can catch a stable domain exception without depending on a low-level library exception.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Custom exceptions using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Custom exceptions matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Custom exceptions to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Custom exceptions as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Custom exceptions, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Try-With-Resources",
                slug: "try-with-resources",
                description: " Explain try-with-resources and AutoCloseable/Closeable as Java's structured resource-cleanup mechanism.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "try-with-resources is an important Java topic in the Exceptions area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain try-with-resources and AutoCloseable/Closeable as Java's structured resource-cleanup mechanism.\n• Cover declaration syntax, reverse-order closing, exceptions during close, suppressed exceptions, and the difference from manually calling close in finally.\n• Explain why resources such as files, sockets, database statements, and streams should be closed deterministically.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving try-with-resources, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ntry (var input = new java.io.StringReader(\"hello\")) {\n    char[] buffer = new char[5];\n    input.read(buffer);\n    System.out.println(buffer);\n} catch (java.io.IOException ex) {\n    throw new RuntimeException(ex);\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with try-with-resources is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain try-with-resources and AutoCloseable/Closeable as Java's structured resource-cleanup mechanism.\n• Cover declaration syntax, reverse-order closing, exceptions during close, suppressed exceptions, and the difference from manually calling close in finally.\n• Explain why resources such as files, sockets, database statements, and streams should be closed deterministically.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining try-with-resources using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where try-with-resources matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain try-with-resources to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember try-with-resources as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor try-with-resources, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
            ],
          },
          {
            title: "Strings and Text Processing",
            slug: "strings",
            description: "String immutability, pooling, mutable builders, buffers, comparisons, and common text operations.",
            topics: [
              {
                title: "String Basics",
                slug: "string-basics",
                description: " Explain String as a final, immutable sequence of characters represented by the Java platform.",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "String basics is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain String as a final, immutable sequence of characters represented by the Java platform.\n• Cover literals, construction, concatenation, equality, length, Unicode/UTF-16 code units, and common APIs.\n• Explain why `==` is not the correct general String-content comparison.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving String basics, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nString first = \"hello\";\nString second = new String(\"hello\");\n\nSystem.out.println(first.equals(second));\nSystem.out.println(first.length());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with String basics is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain String as a final, immutable sequence of characters represented by the Java platform.\n• Cover literals, construction, concatenation, equality, length, Unicode/UTF-16 code units, and common APIs.\n• Explain why `==` is not the correct general String-content comparison.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining String basics using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where String basics matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain String basics to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember String basics as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor String basics, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "String Immutability",
                slug: "string-immutability",
                description: " Explain why String operations return new values rather than modifying an existing String.",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "String immutability is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain why String operations return new values rather than modifying an existing String.\n• Cover references, aliases, security/value semantics, thread sharing, concatenation, and why immutability simplifies reasoning.\n• Show the difference between rebinding a variable and changing an object.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving String immutability, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nString text = \"hello\";\nString upper = text.toUpperCase();\n\nSystem.out.println(text);\nSystem.out.println(upper);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with String immutability is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain why String operations return new values rather than modifying an existing String.\n• Cover references, aliases, security/value semantics, thread sharing, concatenation, and why immutability simplifies reasoning.\n• Show the difference between rebinding a variable and changing an object.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining String immutability using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where String immutability matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain String immutability to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember String immutability as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor String immutability, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "String Pool",
                slug: "string-pool",
                description: " Explain string literals, interning, canonical shared instances, and why the pool is an implementation mechanism with defined language/API behavior around literals and intern().",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "String pool is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain string literals, interning, canonical shared instances, and why the pool is an implementation mechanism with defined language/API behavior around literals and intern().\n• Contrast `==` and equals using literals and explicit new String objects.\n• Explain why code should not rely on pooling for ordinary value comparison and discuss intern() trade-offs.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving String pool, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nString a = \"java\";\nString b = \"java\";\nString c = new String(\"java\");\n\nSystem.out.println(a == b);\nSystem.out.println(a == c);\nSystem.out.println(a.equals(c));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with String pool is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain string literals, interning, canonical shared instances, and why the pool is an implementation mechanism with defined language/API behavior around literals and intern().\n• Contrast `==` and equals using literals and explicit new String objects.\n• Explain why code should not rely on pooling for ordinary value comparison and discuss intern() trade-offs.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining String pool using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where String pool matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain String pool to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember String pool as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor String pool, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Stringbuilder",
                slug: "stringbuilder",
                description: " Explain StringBuilder as a mutable character sequence useful for repeated modifications.",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "StringBuilder is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain StringBuilder as a mutable character sequence useful for repeated modifications.\n• Cover append, insert, delete, capacity, growth, toString, chaining, and why it can reduce intermediate String allocation in construction-heavy code.\n• Explain that StringBuilder is not synchronized and should not be treated as a shared thread-safe buffer.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving StringBuilder, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nStringBuilder builder = new StringBuilder();\n\nbuilder.append(\"Java\");\nbuilder.append(' ');\nbuilder.append(\"rocks\");\n\nString result = builder.toString();\nSystem.out.println(result);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with StringBuilder is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain StringBuilder as a mutable character sequence useful for repeated modifications.\n• Cover append, insert, delete, capacity, growth, toString, chaining, and why it can reduce intermediate String allocation in construction-heavy code.\n• Explain that StringBuilder is not synchronized and should not be treated as a shared thread-safe buffer.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining StringBuilder using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where StringBuilder matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain StringBuilder to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember StringBuilder as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor StringBuilder, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Stringbuffer",
                slug: "stringbuffer",
                description: " Explain StringBuffer as a mutable character sequence with synchronized methods.",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "StringBuffer is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain StringBuffer as a mutable character sequence with synchronized methods.\n• Compare it with StringBuilder, discuss historical reasons, synchronization overhead conceptually, and when legacy APIs may still expose it.\n• Explain that synchronization of methods does not automatically make a larger multi-step application protocol correct.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving StringBuffer, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nStringBuffer buffer = new StringBuffer();\nbuffer.append(\"hello\");\nbuffer.append(' ');\nbuffer.append(\"world\");\n\nSystem.out.println(buffer);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with StringBuffer is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain StringBuffer as a mutable character sequence with synchronized methods.\n• Compare it with StringBuilder, discuss historical reasons, synchronization overhead conceptually, and when legacy APIs may still expose it.\n• Explain that synchronization of methods does not automatically make a larger multi-step application protocol correct.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining StringBuffer using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where StringBuffer matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain StringBuffer to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember StringBuffer as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor StringBuffer, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "String Vs Stringbuilder Vs Stringbuffer",
                slug: "string-vs-stringbuilder-vs-stringbuffer",
                description: " Compare immutable String with mutable StringBuilder and synchronized StringBuffer.",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "String vs StringBuilder vs StringBuffer is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Compare immutable String with mutable StringBuilder and synchronized StringBuffer.\n• Explain allocation behavior, readability, thread-sharing considerations, API expectations, and why the best choice depends on the workload.\n• Show a practical rule: use String for values, StringBuilder for local mutable construction, and StringBuffer mainly where a legacy/shared synchronized buffer contract specifically calls for it.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving String vs StringBuilder vs StringBuffer, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nString text = \"a\" + \"b\";\n\nStringBuilder builder = new StringBuilder();\nbuilder.append(\"a\").append(\"b\");\n\nStringBuffer buffer = new StringBuffer();\nbuffer.append(\"a\").append(\"b\");\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with String vs StringBuilder vs StringBuffer is to remember the surface syntax but\nforget the contract behind it.\n\n• Compare immutable String with mutable StringBuilder and synchronized StringBuffer.\n• Explain allocation behavior, readability, thread-sharing considerations, API expectations, and why the best choice depends on the workload.\n• Show a practical rule: use String for values, StringBuilder for local mutable construction, and StringBuffer mainly where a legacy/shared synchronized buffer contract specifically calls for it.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining String vs StringBuilder vs StringBuffer using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where String vs StringBuilder vs StringBuffer matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain String vs StringBuilder vs StringBuffer to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember String vs StringBuilder vs StringBuffer as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor String vs StringBuilder vs StringBuffer, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Common String Methods",
                slug: "common-string-methods",
                description: " Teach length, isEmpty, isBlank, charAt, substring, indexOf, contains, startsWith, endsWith, equals, equalsIgnoreCase, replace, split, join, trim, strip, repeat, and case conversion.",
                estimatedMinutes: 20,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Common String methods is an important Java topic in the Strings area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Teach length, isEmpty, isBlank, charAt, substring, indexOf, contains, startsWith, endsWith, equals, equalsIgnoreCase, replace, split, join, trim, strip, repeat, and case conversion.\n• Explain index boundaries, substring ranges, regex behavior in split/replaceAll, null handling, and locale-sensitive case conversion.\n• Emphasize reading API contracts rather than assuming method names behave identically.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Common String methods, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nString text = \"  Java programming  \";\n\nSystem.out.println(text.strip());\nSystem.out.println(text.contains(\"Java\"));\nSystem.out.println(text.substring(2, 6));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Common String methods is to remember the surface syntax but\nforget the contract behind it.\n\n• Teach length, isEmpty, isBlank, charAt, substring, indexOf, contains, startsWith, endsWith, equals, equalsIgnoreCase, replace, split, join, trim, strip, repeat, and case conversion.\n• Explain index boundaries, substring ranges, regex behavior in split/replaceAll, null handling, and locale-sensitive case conversion.\n• Emphasize reading API contracts rather than assuming method names behave identically.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Common String methods using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Common String methods matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Common String methods to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Common String methods as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Common String methods, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
            ],
          },
        ],
      },
      //  INTERMEDIATE 
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Collections, streams, and generics.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Java Collections Framework",
            slug: "collections",
            description: "Collection interfaces, implementations, ordering, hashing, queues, sorting, mutability, and utility operations.",
            topics: [
              {
                title: "Collections Framework Overview",
                slug: "collections-framework-overview",
                description: " Explain the framework as contracts plus implementations rather than one single collection class.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Collections Framework overview is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain the framework as contracts plus implementations rather than one single collection class.\n• Cover Collection, List, Set, Queue, Deque, Map, iterators, algorithms, generics, ordering, equality, and mutability.\n• Explain why selecting an interface first and implementation second improves API design.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Collections Framework overview, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<String> names = new ArrayList<>();\nnames.add(\"Alice\");\nnames.add(\"Bob\");\n\nfor (String name : names) {\n    System.out.println(name);\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Collections Framework overview is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain the framework as contracts plus implementations rather than one single collection class.\n• Cover Collection, List, Set, Queue, Deque, Map, iterators, algorithms, generics, ordering, equality, and mutability.\n• Explain why selecting an interface first and implementation second improves API design.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Collections Framework overview using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Collections Framework overview matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Collections Framework overview to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Collections Framework overview as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Collections Framework overview, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "List Interface",
                slug: "list-interface",
                description: " Explain List as an ordered collection with positional access and duplicate elements allowed.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "List interface is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain List as an ordered collection with positional access and duplicate elements allowed.\n• Cover get/set/add/remove, indexing, iteration, equality, subList views, unmodifiable lists, and complexity expectations.\n• Compare ArrayList and LinkedList without reducing the decision to a simplistic O(1) versus O(n) slogan.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving List interface, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<String> names = new ArrayList<>();\nnames.add(\"Alice\");\nnames.add(\"Bob\");\nnames.add(1, \"Sam\");\n\nSystem.out.println(names);\nSystem.out.println(names.get(1));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with List interface is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain List as an ordered collection with positional access and duplicate elements allowed.\n• Cover get/set/add/remove, indexing, iteration, equality, subList views, unmodifiable lists, and complexity expectations.\n• Compare ArrayList and LinkedList without reducing the decision to a simplistic O(1) versus O(n) slogan.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining List interface using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where List interface matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain List interface to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember List interface as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor List interface, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Arraylist",
                slug: "arraylist",
                description: " Explain ArrayList as a resizable-array List implementation.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "ArrayList is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain ArrayList as a resizable-array List implementation.\n• Cover size versus capacity, growth, contiguous backing storage conceptually, indexed access, shifting after insertion/removal, iteration, memory locality, and amortized append behavior.\n• Discuss nulls, thread safety, fail-fast iterators as a debugging aid rather than a synchronization guarantee, and when ArrayList is a strong default.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving ArrayList, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<Integer> values = new ArrayList<>();\nfor (int i = 0; i < 5; i++) {\n    values.add(i);\n}\n\nvalues.remove(2);\nSystem.out.println(values);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with ArrayList is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain ArrayList as a resizable-array List implementation.\n• Cover size versus capacity, growth, contiguous backing storage conceptually, indexed access, shifting after insertion/removal, iteration, memory locality, and amortized append behavior.\n• Discuss nulls, thread safety, fail-fast iterators as a debugging aid rather than a synchronization guarantee, and when ArrayList is a strong default.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining ArrayList using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where ArrayList matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain ArrayList to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember ArrayList as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor ArrayList, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Linkedlist",
                slug: "linkedlist",
                description: " Explain LinkedList as a doubly linked list implementing List and Deque.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "LinkedList is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain LinkedList as a doubly linked list implementing List and Deque.\n• Cover node links, traversal cost, indexed access, insertion/removal when a node position is already known, locality and allocation costs, and why those theoretical benefits do not automatically make it faster.\n• Explain why ArrayDeque is often a better deque/stack/queue choice.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving LinkedList, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nLinkedList<String> list = new LinkedList<>();\nlist.add(\"A\");\nlist.add(\"B\");\nlist.addFirst(\"START\");\nlist.addLast(\"END\");\n\nSystem.out.println(list);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with LinkedList is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain LinkedList as a doubly linked list implementing List and Deque.\n• Cover node links, traversal cost, indexed access, insertion/removal when a node position is already known, locality and allocation costs, and why those theoretical benefits do not automatically make it faster.\n• Explain why ArrayDeque is often a better deque/stack/queue choice.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining LinkedList using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where LinkedList matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain LinkedList to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember LinkedList as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor LinkedList, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Vector And Stack",
                slug: "vector-and-stack",
                description: " Explain Vector and Stack as legacy synchronized collection classes.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Vector and Stack is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Vector and Stack as legacy synchronized collection classes.\n• Cover Stack's LIFO API, its inheritance from Vector, synchronization history, and why Deque/ArrayDeque is generally preferred for new stack usage.\n• Explain that synchronized collection methods do not automatically make a sequence of operations atomic.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Vector and Stack, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nStack<Integer> stack = new Stack<>();\nstack.push(10);\nstack.push(20);\n\nSystem.out.println(stack.pop());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Vector and Stack is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Vector and Stack as legacy synchronized collection classes.\n• Cover Stack's LIFO API, its inheritance from Vector, synchronization history, and why Deque/ArrayDeque is generally preferred for new stack usage.\n• Explain that synchronized collection methods do not automatically make a sequence of operations atomic.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Vector and Stack using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Vector and Stack matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Vector and Stack to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Vector and Stack as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Vector and Stack, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Set Interface",
                slug: "set-interface",
                description: " Explain Set as a collection that does not permit duplicate elements according to the set's equality/order semantics.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Set interface is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Set as a collection that does not permit duplicate elements according to the set's equality/order semantics.\n• Compare HashSet, LinkedHashSet, and TreeSet and explain that 'duplicate' depends on the implementation's equality/ordering contract.\n• Cover set operations conceptually and the importance of equals/hashCode or comparator consistency.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Set interface, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nSet<String> values = new HashSet<>();\nvalues.add(\"A\");\nvalues.add(\"A\");\nvalues.add(\"B\");\n\nSystem.out.println(values);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Set interface is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Set as a collection that does not permit duplicate elements according to the set's equality/order semantics.\n• Compare HashSet, LinkedHashSet, and TreeSet and explain that 'duplicate' depends on the implementation's equality/ordering contract.\n• Cover set operations conceptually and the importance of equals/hashCode or comparator consistency.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Set interface using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Set interface matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Set interface to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Set interface as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Set interface, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Hashset",
                slug: "hashset",
                description: " Explain HashSet using hashing and an internal map-based representation conceptually.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "HashSet is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain HashSet using hashing and an internal map-based representation conceptually.\n• Cover hashCode/equals, buckets, collisions, average versus worst-case complexity, mutable keys/elements, null handling, iteration order, and resizing.\n• Explain why correct equals/hashCode is essential and why order must not be assumed.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving HashSet, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nSet<String> ids = new HashSet<>();\nids.add(\"A\");\nids.add(\"B\");\nids.add(\"A\");\n\nSystem.out.println(ids.contains(\"B\"));\nSystem.out.println(ids.size());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with HashSet is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain HashSet using hashing and an internal map-based representation conceptually.\n• Cover hashCode/equals, buckets, collisions, average versus worst-case complexity, mutable keys/elements, null handling, iteration order, and resizing.\n• Explain why correct equals/hashCode is essential and why order must not be assumed.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining HashSet using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where HashSet matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain HashSet to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember HashSet as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor HashSet, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Linkedhashset",
                slug: "linkedhashset",
                description: " Explain LinkedHashSet as a hash-based set with linked ordering information.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "LinkedHashSet is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain LinkedHashSet as a hash-based set with linked ordering information.\n• Cover insertion order, extra memory, typical operation behavior, equality/hash semantics, and use cases where deterministic iteration is valuable.\n• Explain that ordering is an iteration guarantee, not sorting.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving LinkedHashSet, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nSet<String> values = new LinkedHashSet<>();\nvalues.add(\"B\");\nvalues.add(\"A\");\nvalues.add(\"C\");\n\nSystem.out.println(values);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with LinkedHashSet is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain LinkedHashSet as a hash-based set with linked ordering information.\n• Cover insertion order, extra memory, typical operation behavior, equality/hash semantics, and use cases where deterministic iteration is valuable.\n• Explain that ordering is an iteration guarantee, not sorting.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining LinkedHashSet using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where LinkedHashSet matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain LinkedHashSet to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember LinkedHashSet as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor LinkedHashSet, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Treeset",
                slug: "treeset",
                description: " Explain TreeSet as a sorted NavigableSet backed by a tree-based structure.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "TreeSet is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain TreeSet as a sorted NavigableSet backed by a tree-based structure.\n• Cover natural ordering, Comparator, logarithmic navigation operations, range views, first/last/lower/higher, and ordering consistency with equals.\n• Highlight the subtle rule that TreeSet uniqueness is determined by compareTo/Comparator returning zero, which can differ from equals.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving TreeSet, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nNavigableSet<Integer> values = new TreeSet<>();\nvalues.add(30);\nvalues.add(10);\nvalues.add(20);\n\nSystem.out.println(values);\nSystem.out.println(values.ceiling(15));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with TreeSet is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain TreeSet as a sorted NavigableSet backed by a tree-based structure.\n• Cover natural ordering, Comparator, logarithmic navigation operations, range views, first/last/lower/higher, and ordering consistency with equals.\n• Highlight the subtle rule that TreeSet uniqueness is determined by compareTo/Comparator returning zero, which can differ from equals.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining TreeSet using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where TreeSet matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain TreeSet to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember TreeSet as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor TreeSet, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Map Interface",
                slug: "map-interface",
                description: " Explain Map as key-to-value association rather than a Collection subtype.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Map interface is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Map as key-to-value association rather than a Collection subtype.\n• Cover key uniqueness, value duplicates, get/getOrDefault, containsKey, put, remove, views, compute methods, merge, and iteration.\n• Compare HashMap, LinkedHashMap, TreeMap, and concurrent maps according to ordering, performance, and concurrency requirements.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Map interface, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nMap<String, Integer> counts = new HashMap<>();\ncounts.put(\"java\", 2);\ncounts.merge(\"java\", 1, Integer::sum);\n\nSystem.out.println(counts);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Map interface is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Map as key-to-value association rather than a Collection subtype.\n• Cover key uniqueness, value duplicates, get/getOrDefault, containsKey, put, remove, views, compute methods, merge, and iteration.\n• Compare HashMap, LinkedHashMap, TreeMap, and concurrent maps according to ordering, performance, and concurrency requirements.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Map interface using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Map interface matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Map interface to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Map interface as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Map interface, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Hashmap",
                slug: "hashmap",
                description: " Explain HashMap's hash-table model, hashing, buckets, collisions, resizing, load factor concept, treeified collision bins in modern implementations, and average expected performance.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "HashMap is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain HashMap's hash-table model, hashing, buckets, collisions, resizing, load factor concept, treeified collision bins in modern implementations, and average expected performance.\n• Cover null keys, mutable keys, equals/hashCode, iteration order, capacity, and why implementation details should not be treated as API guarantees.\n• Explain computeIfAbsent, merge, and getOrDefault for safe map updates.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving HashMap, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nMap<String, Integer> counts = new HashMap<>();\ncounts.merge(\"java\", 1, Integer::sum);\ncounts.merge(\"java\", 1, Integer::sum);\n\nSystem.out.println(counts.get(\"java\"));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with HashMap is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain HashMap's hash-table model, hashing, buckets, collisions, resizing, load factor concept, treeified collision bins in modern implementations, and average expected performance.\n• Cover null keys, mutable keys, equals/hashCode, iteration order, capacity, and why implementation details should not be treated as API guarantees.\n• Explain computeIfAbsent, merge, and getOrDefault for safe map updates.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining HashMap using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where HashMap matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain HashMap to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember HashMap as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor HashMap, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Linkedhashmap",
                slug: "linkedhashmap",
                description: " Explain LinkedHashMap as a HashMap-like map with linked iteration ordering.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "LinkedHashMap is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain LinkedHashMap as a HashMap-like map with linked iteration ordering.\n• Cover insertion-order and access-order modes, iteration behavior, extra memory, and its classic use in bounded LRU-style caches.\n• Explain that cache correctness still requires eviction policy, concurrency strategy, and synchronization appropriate to the application.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving LinkedHashMap, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nLinkedHashMap<String, Integer> map =\n    new LinkedHashMap<>(16, 0.75f, true);\n\nmap.put(\"A\", 1);\nmap.put(\"B\", 2);\nmap.get(\"A\");\n\nSystem.out.println(map);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with LinkedHashMap is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain LinkedHashMap as a HashMap-like map with linked iteration ordering.\n• Cover insertion-order and access-order modes, iteration behavior, extra memory, and its classic use in bounded LRU-style caches.\n• Explain that cache correctness still requires eviction policy, concurrency strategy, and synchronization appropriate to the application.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining LinkedHashMap using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where LinkedHashMap matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain LinkedHashMap to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember LinkedHashMap as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor LinkedHashMap, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Treemap",
                slug: "treemap",
                description: " Explain TreeMap as a sorted NavigableMap.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "TreeMap is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain TreeMap as a sorted NavigableMap.\n• Cover natural ordering, Comparator, logarithmic operations, range queries, first/last keys, floor/ceiling/lower/higher, and comparator consistency.\n• Explain that key uniqueness is determined by ordering comparison rather than a separate equals call.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving TreeMap, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nNavigableMap<Integer, String> map = new TreeMap<>();\nmap.put(20, \"B\");\nmap.put(10, \"A\");\nmap.put(30, \"C\");\n\nSystem.out.println(map);\nSystem.out.println(map.floorEntry(25));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with TreeMap is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain TreeMap as a sorted NavigableMap.\n• Cover natural ordering, Comparator, logarithmic operations, range queries, first/last keys, floor/ceiling/lower/higher, and comparator consistency.\n• Explain that key uniqueness is determined by ordering comparison rather than a separate equals call.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining TreeMap using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where TreeMap matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain TreeMap to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember TreeMap as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor TreeMap, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Hashtable",
                slug: "hashtable",
                description: " Explain Hashtable as a legacy synchronized Map implementation.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Hashtable is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Hashtable as a legacy synchronized Map implementation.\n• Cover its historical synchronization, prohibition of null keys/values, Enumeration/Map APIs, and why it is usually not the preferred modern choice.\n• Distinguish synchronized legacy APIs from modern concurrent designs such as ConcurrentHashMap.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Hashtable, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nHashtable<String, Integer> table = new Hashtable<>();\ntable.put(\"A\", 1);\ntable.put(\"B\", 2);\n\nSystem.out.println(table.get(\"A\"));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Hashtable is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Hashtable as a legacy synchronized Map implementation.\n• Cover its historical synchronization, prohibition of null keys/values, Enumeration/Map APIs, and why it is usually not the preferred modern choice.\n• Distinguish synchronized legacy APIs from modern concurrent designs such as ConcurrentHashMap.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Hashtable using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Hashtable matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Hashtable to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Hashtable as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Hashtable, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Queue And Deque",
                slug: "queue-and-deque",
                description: " Explain Queue as a structure for processing elements according to a queue discipline and Deque as a double-ended queue.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Queue and Deque is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Queue as a structure for processing elements according to a queue discipline and Deque as a double-ended queue.\n• Cover add/offer, remove/poll, element/peek, and why the exception-returning versus special-value-returning pairs matter.\n• Show FIFO, LIFO, and bounded-queue considerations without assuming every Queue is FIFO.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Queue and Deque, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nQueue<String> queue = new ArrayDeque<>();\nqueue.offer(\"A\");\nqueue.offer(\"B\");\n\nSystem.out.println(queue.poll());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Queue and Deque is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Queue as a structure for processing elements according to a queue discipline and Deque as a double-ended queue.\n• Cover add/offer, remove/poll, element/peek, and why the exception-returning versus special-value-returning pairs matter.\n• Show FIFO, LIFO, and bounded-queue considerations without assuming every Queue is FIFO.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Queue and Deque using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Queue and Deque matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Queue and Deque to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Queue and Deque as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Queue and Deque, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Priorityqueue",
                slug: "priorityqueue",
                description: " Explain PriorityQueue as a heap-based priority structure, not a sorted List.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "PriorityQueue is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain PriorityQueue as a heap-based priority structure, not a sorted List.\n• Cover head semantics, Comparator/natural order, offer/poll/peek, lack of sorted iteration, complexity, and mutable-priority pitfalls.\n• Explain why changing an element's priority after insertion without removing/reinserting it can violate the intended behavior.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving PriorityQueue, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nPriorityQueue<Integer> queue = new PriorityQueue<>();\nqueue.offer(30);\nqueue.offer(10);\nqueue.offer(20);\n\nSystem.out.println(queue.poll());\nSystem.out.println(queue.poll());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with PriorityQueue is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain PriorityQueue as a heap-based priority structure, not a sorted List.\n• Cover head semantics, Comparator/natural order, offer/poll/peek, lack of sorted iteration, complexity, and mutable-priority pitfalls.\n• Explain why changing an element's priority after insertion without removing/reinserting it can violate the intended behavior.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining PriorityQueue using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where PriorityQueue matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain PriorityQueue to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember PriorityQueue as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor PriorityQueue, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Arraydeque",
                slug: "arraydeque",
                description: " Explain ArrayDeque as a resizable-array Deque designed for efficient insertion/removal at both ends.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "ArrayDeque is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain ArrayDeque as a resizable-array Deque designed for efficient insertion/removal at both ends.\n• Cover queue and stack use, null prohibition, circular-buffer concept, amortized behavior, and why it is commonly preferred over Stack for LIFO work.\n• Show how one type supports addFirst/addLast/removeFirst/removeLast and their Queue/Deque equivalents.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving ArrayDeque, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nDeque<String> deque = new ArrayDeque<>();\ndeque.addLast(\"A\");\ndeque.addLast(\"B\");\ndeque.addFirst(\"START\");\n\nSystem.out.println(deque.removeFirst());\nSystem.out.println(deque.removeLast());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with ArrayDeque is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain ArrayDeque as a resizable-array Deque designed for efficient insertion/removal at both ends.\n• Cover queue and stack use, null prohibition, circular-buffer concept, amortized behavior, and why it is commonly preferred over Stack for LIFO work.\n• Show how one type supports addFirst/addLast/removeFirst/removeLast and their Queue/Deque equivalents.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining ArrayDeque using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where ArrayDeque matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain ArrayDeque to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember ArrayDeque as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor ArrayDeque, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Comparable Vs Comparator",
                slug: "comparable-vs-comparator",
                description: " Explain Comparable as a type's natural ordering and Comparator as an external ordering strategy.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Comparable vs Comparator is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain Comparable as a type's natural ordering and Comparator as an external ordering strategy.\n• Cover compareTo/compare, sorting, TreeSet/TreeMap consequences, consistency with equals, null ordering, and multiple sort strategies.\n• Explain why Comparator composition is often preferable to modifying a domain class solely for one UI/report order.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Comparable vs Comparator, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<String> names = new ArrayList<>(\n    List.of(\"Bob\", \"Alice\", \"Carol\")\n);\n\nnames.sort(Comparator.comparingInt(String::length)\n    .thenComparing(Comparator.naturalOrder()));\n\nSystem.out.println(names);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Comparable vs Comparator is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain Comparable as a type's natural ordering and Comparator as an external ordering strategy.\n• Cover compareTo/compare, sorting, TreeSet/TreeMap consequences, consistency with equals, null ordering, and multiple sort strategies.\n• Explain why Comparator composition is often preferable to modifying a domain class solely for one UI/report order.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Comparable vs Comparator using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Comparable vs Comparator matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Comparable vs Comparator to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Comparable vs Comparator as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Comparable vs Comparator, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Sorting Collections",
                slug: "sorting-collections",
                description: " Explain sorting through List.sort, Collections.sort, Comparator, natural ordering, and stream sorted.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Sorting collections is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain sorting through List.sort, Collections.sort, Comparator, natural ordering, and stream sorted.\n• Cover stable sorting, comparator correctness, ascending/descending order, multi-key sorting, null handling, and the difference between sorting a collection and producing a sorted stream.\n• Discuss complexity at a high level and why comparator cost can dominate large sorts.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Sorting collections, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<Integer> values = new ArrayList<>(List.of(5, 1, 4, 2));\n\nvalues.sort(Comparator.naturalOrder());\n\nSystem.out.println(values);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Sorting collections is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain sorting through List.sort, Collections.sort, Comparator, natural ordering, and stream sorted.\n• Cover stable sorting, comparator correctness, ascending/descending order, multi-key sorting, null handling, and the difference between sorting a collection and producing a sorted stream.\n• Discuss complexity at a high level and why comparator cost can dominate large sorts.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Sorting collections using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Sorting collections matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Sorting collections to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Sorting collections as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Sorting collections, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Unmodifiable Vs Immutable Collections",
                slug: "unmodifiable-vs-immutable-collections",
                description: " Explain the difference between an unmodifiable view and a truly immutable collection/snapshot.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Unmodifiable vs immutable collections is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain the difference between an unmodifiable view and a truly immutable collection/snapshot.\n• Cover Collections.unmodifiableList, List.of, List.copyOf, aliases, backing collection changes, null restrictions in factory methods, and shallow immutability.\n• Explain why an immutable collection can still contain mutable elements.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Unmodifiable vs immutable collections, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<String> source = new ArrayList<>();\nsource.add(\"A\");\n\nList<String> view = Collections.unmodifiableList(source);\nList<String> copy = List.copyOf(source);\n\nsource.add(\"B\");\n\nSystem.out.println(view);\nSystem.out.println(copy);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Unmodifiable vs immutable collections is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain the difference between an unmodifiable view and a truly immutable collection/snapshot.\n• Cover Collections.unmodifiableList, List.of, List.copyOf, aliases, backing collection changes, null restrictions in factory methods, and shallow immutability.\n• Explain why an immutable collection can still contain mutable elements.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Unmodifiable vs immutable collections using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Unmodifiable vs immutable collections matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Unmodifiable vs immutable collections to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Unmodifiable vs immutable collections as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Unmodifiable vs immutable collections, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Collections Utility Methods",
                slug: "collections-utility-methods",
                description: " Explain the Collections utility class as a set of algorithms, wrappers, factories/helpers, and search/sort operations.",
                estimatedMinutes: 24,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Collections utility methods is an important Java topic in the Collections area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain the Collections utility class as a set of algorithms, wrappers, factories/helpers, and search/sort operations.\n• Cover sort, binarySearch, reverse, rotate, shuffle, frequency, min/max, copy, fill, disjoint, synchronized wrappers, checked wrappers, and unmodifiable wrappers.\n• Explain preconditions such as sorted input for binarySearch and the difference between synchronized access and atomic compound operations.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Collections utility methods, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<Integer> values = new ArrayList<>(List.of(3, 1, 2));\n\nCollections.sort(values);\nCollections.reverse(values);\n\nSystem.out.println(values);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Collections utility methods is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain the Collections utility class as a set of algorithms, wrappers, factories/helpers, and search/sort operations.\n• Cover sort, binarySearch, reverse, rotate, shuffle, frequency, min/max, copy, fill, disjoint, synchronized wrappers, checked wrappers, and unmodifiable wrappers.\n• Explain preconditions such as sorted input for binarySearch and the difference between synchronized access and atomic compound operations.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Collections utility methods using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Collections utility methods matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Collections utility methods to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Collections utility methods as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Collections utility methods, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
            ],
          },
          {
            title: "Streams and Collectors",
            slug: "streams",
            description: "Stream transformations, flattening, and collector composition.",
            topics: [
              {
                title: "Map Vs Flatmap",
                slug: "map-vs-flatmap",
                description: " Explain map as one input element producing one output element, while flatMap replaces each element with a stream and flattens the resulting streams.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "map vs flatMap is an important Java topic in the Streams area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain map as one input element producing one output element, while flatMap replaces each element with a stream and flattens the resulting streams.\n• Use nested collections to show the cardinality difference and explain Optional.map/flatMap conceptually.\n• Cover nulls, stream consumption, and why flatMap is useful for one-to-many transformations.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving map vs flatMap, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nList<List<String>> groups = List.of(\n    List.of(\"A\", \"B\"),\n    List.of(\"C\")\n);\n\nList<String> flat = groups.stream()\n    .flatMap(List::stream)\n    .toList();\n\nSystem.out.println(flat);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with map vs flatMap is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain map as one input element producing one output element, while flatMap replaces each element with a stream and flattens the resulting streams.\n• Use nested collections to show the cardinality difference and explain Optional.map/flatMap conceptually.\n• Cover nulls, stream consumption, and why flatMap is useful for one-to-many transformations.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining map vs flatMap using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where map vs flatMap matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain map vs flatMap to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember map vs flatMap as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor map vs flatMap, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Mapping And Collectingandthen",
                slug: "mapping-and-collectingandthen",
                description: " Explain downstream Collectors.mapping as a way to transform values inside another collector.",
                estimatedMinutes: 22,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "mapping and collectingAndThen is an important Java topic in the Streams area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain downstream Collectors.mapping as a way to transform values inside another collector.\n• Explain collectingAndThen as a finishing transformation applied after a collector has accumulated its result.\n• Compare these with Stream.map and show where collector composition makes grouped/partitioned results easier to express.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving mapping and collectingAndThen, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nMap<String, List<Integer>> result =\n    List.of(\"java\", \"go\", \"rust\").stream()\n        .collect(Collectors.groupingBy(\n            String::length,\n            Collectors.mapping(String::length, Collectors.toList())\n        ));\n\nSystem.out.println(result);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with mapping and collectingAndThen is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain downstream Collectors.mapping as a way to transform values inside another collector.\n• Explain collectingAndThen as a finishing transformation applied after a collector has accumulated its result.\n• Compare these with Stream.map and show where collector composition makes grouped/partitioned results easier to express.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining mapping and collectingAndThen using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where mapping and collectingAndThen matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain mapping and collectingAndThen to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember mapping and collectingAndThen as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor mapping and collectingAndThen, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
            ],
          },
          {
            title: "Generics",
            slug: "generics",
            description: "Generic declarations, bounds, wildcards, PECS, and type erasure.",
            topics: [
              {
                title: "Generic Classes And Methods",
                slug: "generic-classes-and-methods",
                description: " Explain generic type parameters as compile-time constraints that make reusable code type-safe without forcing casts.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Generic classes and methods is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain generic type parameters as compile-time constraints that make reusable code type-safe without forcing casts.\n• Cover generic classes, generic methods, type inference, bounded parameters, static members, and why primitives cannot be used directly as type arguments.\n• Explain how generic APIs improve correctness while being subject to type erasure at runtime.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Generic classes and methods, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass Box<T> {\n    private T value;\n\n    void set(T value) {\n        this.value = value;\n    }\n\n    T get() {\n        return value;\n    }\n}\n\nBox<String> box = new Box<>();\nbox.set(\"hello\");\nSystem.out.println(box.get());\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Generic classes and methods is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain generic type parameters as compile-time constraints that make reusable code type-safe without forcing casts.\n• Cover generic classes, generic methods, type inference, bounded parameters, static members, and why primitives cannot be used directly as type arguments.\n• Explain how generic APIs improve correctness while being subject to type erasure at runtime.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Generic classes and methods using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Generic classes and methods matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Generic classes and methods to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Generic classes and methods as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Generic classes and methods, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Generic Interfaces",
                slug: "generic-interfaces",
                description: " Explain how interfaces can declare type parameters and how implementations choose, preserve, or specialize those parameters.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Generic interfaces is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain how interfaces can declare type parameters and how implementations choose, preserve, or specialize those parameters.\n• Cover implementing generic interfaces with concrete types, generic implementations, inheritance, and use through interface references.\n• Show how generic interfaces model reusable contracts such as repositories, functions, comparators, and containers.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Generic interfaces, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\ninterface Repository<T> {\n    void save(T value);\n    T find();\n}\n\nclass StringRepository implements Repository<String> {\n    private String value;\n\n    public void save(String value) {\n        this.value = value;\n    }\n\n    public String find() {\n        return value;\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Generic interfaces is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain how interfaces can declare type parameters and how implementations choose, preserve, or specialize those parameters.\n• Cover implementing generic interfaces with concrete types, generic implementations, inheritance, and use through interface references.\n• Show how generic interfaces model reusable contracts such as repositories, functions, comparators, and containers.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Generic interfaces using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Generic interfaces matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Generic interfaces to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Generic interfaces as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Generic interfaces, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Type Parameters",
                slug: "type-parameters",
                description: " Explain type parameters as placeholders for types and distinguish a type parameter from a concrete type argument.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Type parameters is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain type parameters as placeholders for types and distinguish a type parameter from a concrete type argument.\n• Cover class, method, and constructor type parameters, naming conventions, bounds, inference, scope, and shadowing.\n• Explain why generic types are invariant and how bounds/wildcards solve different API-design problems.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Type parameters, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic <T> T first(List<T> values) {\n    return values.get(0);\n}\n\nList<String> names = List.of(\"Alice\", \"Bob\");\nString first = first(names);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Type parameters is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain type parameters as placeholders for types and distinguish a type parameter from a concrete type argument.\n• Cover class, method, and constructor type parameters, naming conventions, bounds, inference, scope, and shadowing.\n• Explain why generic types are invariant and how bounds/wildcards solve different API-design problems.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Type parameters using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Type parameters matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Type parameters to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Type parameters as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Type parameters, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Bounded Type Parameters",
                slug: "bounded-type-parameters",
                description: " Explain bounds using extends for upper constraints and show how bounds provide members that are safe to call.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Bounded type parameters is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain bounds using extends for upper constraints and show how bounds provide members that are safe to call.\n• Cover multiple bounds, type-variable bounds, recursive bounds, and how bounds differ from wildcards.\n• Use Number/Comparable examples to show why a bound can increase what generic code knows about T.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Bounded type parameters, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic <T extends Number> double twice(T value) {\n    return value.doubleValue() * 2;\n}\n\nSystem.out.println(twice(10));\nSystem.out.println(twice(2.5));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Bounded type parameters is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain bounds using extends for upper constraints and show how bounds provide members that are safe to call.\n• Cover multiple bounds, type-variable bounds, recursive bounds, and how bounds differ from wildcards.\n• Use Number/Comparable examples to show why a bound can increase what generic code knows about T.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Bounded type parameters using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Bounded type parameters matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Bounded type parameters to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Bounded type parameters as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Bounded type parameters, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Wildcards",
                slug: "wildcards",
                description: " Explain wildcard types as unknown type arguments and why they are useful at API boundaries.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Wildcards is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain wildcard types as unknown type arguments and why they are useful at API boundaries.\n• Cover unbounded wildcards, upper/lower bounds, capture, read/write restrictions, and why List<?> is different from raw List.\n• Show the relationship between invariance and wildcard flexibility.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Wildcards, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic void printAll(List<?> values) {\n    for (Object value : values) {\n        System.out.println(value);\n}\n\nprintAll(List.of(\"A\", \"B\"));\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Wildcards is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain wildcard types as unknown type arguments and why they are useful at API boundaries.\n• Cover unbounded wildcards, upper/lower bounds, capture, read/write restrictions, and why List<?> is different from raw List.\n• Show the relationship between invariance and wildcard flexibility.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Wildcards using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Wildcards matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Wildcards to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Wildcards as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Wildcards, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Upper Bounded Wildcards",
                slug: "upper-bounded-wildcards",
                description: " Explain `? extends T` as an unknown subtype of T.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Upper bounded wildcards is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain `? extends T` as an unknown subtype of T.\n• Cover safe reading as T, restricted writing, covariance-like use-site flexibility, and why it is suitable for producers.\n• Show why List<Integer> can be passed to a List<? extends Number> parameter while List<Number> cannot be treated as List<Integer>.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Upper bounded wildcards, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic double sum(List<? extends Number> values) {\n    double total = 0;\n    for (Number value : values) {\n        total += value.doubleValue();\n    }\n    return total;\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Upper bounded wildcards is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain `? extends T` as an unknown subtype of T.\n• Cover safe reading as T, restricted writing, covariance-like use-site flexibility, and why it is suitable for producers.\n• Show why List<Integer> can be passed to a List<? extends Number> parameter while List<Number> cannot be treated as List<Integer>.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Upper bounded wildcards using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Upper bounded wildcards matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Upper bounded wildcards to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Upper bounded wildcards as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Upper bounded wildcards, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Lower Bounded Wildcards",
                slug: "lower-bounded-wildcards",
                description: " Explain `? super T` as an unknown supertype of T.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Lower bounded wildcards is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain `? super T` as an unknown supertype of T.\n• Cover why T values can safely be added, why reads are only safely typed as Object, and the relationship to consumers.\n• Use a method that accepts Integers through List<? super Integer> and explain why List<Number> and List<Object> both work.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Lower bounded wildcards, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic void addDefaults(List<? super Integer> values) {\n    values.add(10);\n    values.add(20);\n}\n\nList<Number> numbers = new ArrayList<>();\naddDefaults(numbers);\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Lower bounded wildcards is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain `? super T` as an unknown supertype of T.\n• Cover why T values can safely be added, why reads are only safely typed as Object, and the relationship to consumers.\n• Use a method that accepts Integers through List<? super Integer> and explain why List<Number> and List<Object> both work.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Lower bounded wildcards using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Lower bounded wildcards matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Lower bounded wildcards to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Lower bounded wildcards as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Lower bounded wildcards, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Pecs Principle",
                slug: "pecs-principle",
                description: " Explain PECS as Producer Extends, Consumer Super.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "PECS principle is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain PECS as Producer Extends, Consumer Super.\n• Derive the rule from type safety rather than treating it as a memorization trick.\n• Show producer APIs, consumer APIs, copy operations, and cases where a wildcard is unnecessary because the exact type parameter is part of the method's relationship.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving PECS principle, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nstatic <T> void copy(\n    List<? super T> destination,\n    List<? extends T> source) {\n\n    for (T value : source) {\n        destination.add(value);\n    }\n}\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with PECS principle is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain PECS as Producer Extends, Consumer Super.\n• Derive the rule from type safety rather than treating it as a memorization trick.\n• Show producer APIs, consumer APIs, copy operations, and cases where a wildcard is unnecessary because the exact type parameter is part of the method's relationship.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining PECS principle using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where PECS principle matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain PECS principle to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember PECS principle as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor PECS principle, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.\n\n\n==============================================================================",
                  },
                ],
              },
              {
                title: "Type Erasure",
                slug: "type-erasure",
                description: " Explain type erasure as the mechanism by which generic type information is primarily enforced at compile time and erased from ordinary runtime class representations.",
                estimatedMinutes: 28,
                sections: [
                  {
                    title: "Concept and mental model",
                    content: "Type erasure is an important Java topic in the Generics area. The goal is not to memorize a one-line definition, but to understand what problem the feature solves, what Java guarantees, how the compiler and runtime participate, and where the feature can be misused.\n\nA useful learning sequence is:\n\n    concept -> mental model -> syntax -> behavior -> edge cases -> design consequences\n\nThe examples below are deliberately small so that the language rule is visible. In production code, the same rule appears inside larger classes, services, collections, and APIs.",
                  },
                  {
                    title: "What you should be able to do",
                    content: "• Explain type erasure as the mechanism by which generic type information is primarily enforced at compile time and erased from ordinary runtime class representations.\n• Cover erased bounds, bridge methods, non-reifiable types, restrictions on generic arrays, instanceof limitations, raw types, heap pollution, and why casts may appear in bytecode.\n• Distinguish language guarantees from JVM implementation details and explain why reflection can expose generic Signature metadata even though ordinary runtime object types do not retain T in the same way.",
                  },
                  {
                    title: "How to reason about this topic",
                    content: "When analyzing code involving Type erasure, separate three questions.\n\n1. What does the Java language permit?\n\nThe compiler applies Java's grammar, typing, access, conversion, inheritance,\ngeneric, exception, and method-resolution rules as appropriate to the feature.\n\n2. What does the runtime object/state actually contain?\n\nThe declared type of a variable is not always the same as the runtime class of\nthe object it refers to. Likewise, compile-time generic information and\nruntime representation are not identical concepts.\n\n3. What is guaranteed by the API contract versus merely common in an implementation?\n\nThis distinction is especially important for collections, strings, the JVM,\nand performance. A current HotSpot implementation detail should not be taught\nas though it were a universal Java-language guarantee.",
                  },
                  {
                    title: "Runnable example",
                    content: "```java\nclass Box<T> {\n    T value;\n\n    T get() {\n        return value;\n    }\n}\n\nBox<String> box = new Box<>();\nbox.value = \"hello\";\nString value = box.get();\n```\n\nRead the example in this order:\n\n- Identify the declarations and their declared types.\n- Identify which operation demonstrates the topic.\n- Ask what the compiler can determine before execution.\n- Ask what state exists at runtime.\n- Predict the output or failure before running it.\n\nA useful learning habit is to modify one line at a time rather than copying\nthe whole example. For example, deliberately change an access modifier, a\ngeneric argument, an overridden method, an ordering rule, or an exception\ncondition and observe whether the failure is compile-time or runtime.",
                  },
                  {
                    title: "Important rules, edge cases, and design consequences",
                    content: "The most common mistake with Type erasure is to remember the surface syntax but\nforget the contract behind it.\n\n• Explain type erasure as the mechanism by which generic type information is primarily enforced at compile time and erased from ordinary runtime class representations.\n• Cover erased bounds, bridge methods, non-reifiable types, restrictions on generic arrays, instanceof limitations, raw types, heap pollution, and why casts may appear in bytecode.\n• Distinguish language guarantees from JVM implementation details and explain why reflection can expose generic Signature metadata even though ordinary runtime object types do not retain T in the same way.\n\nFor production-quality code, also ask:\n\n    - What happens with null?\n    - What happens with an empty input?\n    - What happens at a boundary value?\n    - Is state mutable after insertion/registration?\n    - Does equality or ordering participate in the feature?\n    - Is there an alias to mutable state?\n    - Is the operation thread-safe, or merely individually synchronized?\n    - Is an observed ordering actually guaranteed by the API?\n    - Is a behavior specified by Java, or just common in one JVM?\n    - Can an exception lose its original cause?\n    - Can a public API expose more implementation detail than intended?\n\nThese questions are more useful than memorizing isolated interview rules.",
                  },
                  {
                    title: "Common mistakes",
                    content: "1. Explaining Type erasure using a slogan without showing the actual Java behavior.\n\n2. Treating implementation details as language guarantees.\n\n3. Ignoring the declared type of an expression and assuming the runtime object\n   automatically changes what the compiler permits.\n\n4. Ignoring mutability and aliases when a reference to an object is shared.\n\n5. Measuring complexity using only Big-O while ignoring constants, allocation,\n   memory locality, comparator cost, object layout, or workload.\n\n6. Writing an API that is technically legal but exposes too much internal\n   representation.\n\nA strong Java developer can explain both the happy path and the failure path.",
                  },
                  {
                    title: "Practice",
                    content: "Exercise 1:\nRewrite the core example from memory without looking at the solution.\n\nExercise 2:\nCreate one deliberately incorrect version and predict whether the compiler\nrejects it or whether it fails at runtime.\n\nExercise 3:\nCreate a realistic application example where Type erasure matters. Explain why\nyour design uses the feature instead of merely demonstrating its syntax.\n\nExercise 4:\nWrite down one Java-language guarantee and one implementation-dependent\nassumption you should NOT make.\n\nExpected learning outcome:\n\nYou should be able to explain Type erasure to another developer using a concrete\nexample, explain the relevant Java rule, identify at least one edge case, and\nchoose an appropriate design rather than simply repeating a definition.",
                  },
                  {
                    title: "Final mental model",
                    content: "Do not remember Type erasure as an isolated keyword/class/method.\n\nRemember the relationship between:\n\n    caller\n       |\n       v\n    Java type system / API contract\n       |\n       v\n    compiler checks\n       |\n       v\n    generated class files\n       |\n       v\n    runtime behavior and object state\n\nFor Type erasure, the most important skill is predicting behavior before executing\nthe program and being able to justify that prediction from Java's rules.\n\nOfficial reference basis:\n    Java Language Specification (Java SE 26), Java Virtual Machine\n    Specification/class-file documentation where runtime mechanics matter, and\n    Java SE API documentation for library types.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(javaCategory);
  console.log("Java topics 041-100 seeded successfully.");
}

async function main() {
  try {
    await seedJavaCategory();
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Java seed failed:", error);
  process.exit(1);
});
