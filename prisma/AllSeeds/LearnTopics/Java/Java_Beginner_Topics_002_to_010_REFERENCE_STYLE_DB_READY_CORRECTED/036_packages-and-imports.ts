import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 36/356
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
  title: "Packages and imports",
  slug: "packages-and-imports",
  description: "Learn how Java packages organize and identify types, how imports affect source-level name resolution, how access control interacts with packages, how package names relate to directories, and how packages differ from modules and dependencies.",
  estimatedMinutes: 55,
  sections: [
    {
      title: "Why packages exist",
      content: "A Java program can contain thousands of classes. Packages provide a namespace for grouping related types and avoiding name collisions.\n\nA class can declare:\n\n```java\npackage com.example.payment;\n```\n\nIts fully qualified name becomes:\n\n```text\ncom.example.payment.PaymentService\n```\n\nAnother package could contain a different class also named `PaymentService`.\n\nThe package is therefore part of a type's identity. Two classes with the same simple name can coexist when their fully qualified names differ.\n\nPackages also participate in access control and provide a natural organization boundary for a codebase.",
    },
    {
      title: "Package declaration versus folder structure",
      content: "A source file can begin with:\n\n```java\npackage com.example.model;\n```\n\nIn conventional Java projects, the source file is stored in a matching directory structure:\n\n```text\nsrc/\n  main/\n    java/\n      com/\n        example/\n          model/\n            User.java\n```\n\nThe directory layout is important to build tools and class-file organization, but the `package` declaration is the language-level declaration of the package.\n\nChanging a package declaration without moving files can cause build or classpath problems because tools generally expect the conventional relationship between package names and directories.\n\nA useful distinction is:\n\n- package declaration → Java source-level namespace;\n- directory structure → conventional physical organization used by compilers/build tools.",
    },
    {
      title: "What import actually does",
      content: "Suppose a class has the fully qualified name:\n\n```java\njava.util.ArrayList\n```\n\nWithout an import, you can write:\n\n```java\njava.util.ArrayList<String> names =\n    new java.util.ArrayList<>();\n```\n\nWith:\n\n```java\nimport java.util.ArrayList;\n```\n\nyou can write:\n\n```java\nArrayList<String> names = new ArrayList<>();\n```\n\nThe import does not copy the class into your package and does not load the class into memory.\n\nIt is primarily a source-level name-resolution convenience. The compiler can resolve the simple name `ArrayList` to `java.util.ArrayList`.\n\nThis distinction is important because importing a type does not mean the type is physically moved or duplicated.",
    },
    {
      title: "Wildcard imports and subpackages",
      content: "You can import all accessible types from a package:\n\n```java\nimport java.util.*;\n```\n\nThis does **not** import subpackages.\n\nFor example:\n\n```text\njava.util\njava.util.concurrent\n```\n\nare separate packages. Importing `java.util.*` does not make classes in `java.util.concurrent` available by simple name.\n\nWildcard imports also do not mean that every class from the package is eagerly loaded. They are primarily a source-level naming mechanism.\n\nMany teams prefer explicit imports because they make dependencies visible and reduce confusion when names collide.",
    },
    {
      title: "Name collisions",
      content: "Two packages can contain classes with the same simple name:\n\n```java\ncom.example.api.User\ncom.example.model.User\n```\n\nIf both are imported:\n\n```java\nimport com.example.api.User;\nimport com.example.model.User;\n```\n\na simple `User` reference becomes ambiguous.\n\nYou can resolve the situation by using a fully qualified name for one of them:\n\n```java\ncom.example.api.User apiUser;\ncom.example.model.User modelUser;\n```\n\nThis is one reason imports should improve readability rather than hide important distinctions.\n\nStatic imports can create similar naming confusion if unrelated methods or constants have identical names.",
    },
    {
      title: "Static imports",
      content: "A static import lets you refer to static members without qualifying them with the class name.\n\nWithout static import:\n\n```java\nMath.max(10, 20);\n```\n\nWith:\n\n```java\nimport static java.lang.Math.max;\n\nmax(10, 20);\n```\n\nStatic imports can make tests and mathematical code concise, but excessive use can hide where a method or constant comes from.\n\nFor example, a call such as:\n\n```java\nassertEquals(expected, actual);\n```\n\nis often readable because its meaning is obvious in the surrounding test. In other contexts, qualification can improve clarity.\n\nUse static imports when they make the code easier to read, not simply because they remove characters.",
    },
    {
      title: "Packages and access control",
      content: "Packages interact with Java access modifiers.\n\nA package-private class or member has no explicit `public`, `protected`, or `private` modifier and is accessible only within the same package.\n\n```java\nclass InternalParser {\n}\n```\n\nCode in another package cannot directly use that class.\n\nThis gives packages a useful encapsulation boundary. A package can expose public types while keeping implementation details package-private.\n\n`protected` has more nuanced rules involving the same package and subclass access, so it should not be reduced to \"visible to the package and children\" without considering the access context.\n\nPackages therefore are not merely folders. They can affect which code is allowed to access which declarations.",
    },
    {
      title: "Packages are not modules",
      content: "A package and a module solve different problems.\n\nA package groups types into a namespace:\n\n```java\npackage com.example.orders;\n```\n\nA Java module is a larger unit declared with `module-info.java`:\n\n```java\nmodule com.example.orders {\n    exports com.example.orders.api;\n}\n```\n\nA module can contain multiple packages.\n\nThe module system adds stronger dependency and encapsulation rules at the module level. Packages still exist inside modules.\n\nA useful hierarchy is:\n\n```text\nmodule\n ├── package\n │    ├── class\n │    └── class\n └── package\n      └── class\n```\n\nThis distinction becomes important when moving from small Java applications to modular applications and libraries.",
    },
    {
      title: "Classpath, module path, and dependencies",
      content: "An import does not itself provide a dependency.\n\nIf you write:\n\n```java\nimport org.example.SomeLibrary;\n```\n\nthe library must still be available to the compiler and runtime through the project's dependency configuration and classpath/module path.\n\nThink of the process as separate concerns:\n\n1. **Import:** tells the compiler which simple name you intend to use.\n2. **Compilation environment:** must contain the referenced type.\n3. **Runtime environment:** must contain the required class/module when the program runs.\n4. **Dependency management:** build tools such as Maven or Gradle normally arrange those artifacts.\n\nThis explains why an IDE may accept an import in source editing while a build still fails if the dependency is missing or incorrectly scoped.",
    },
    {
      title: "A realistic package structure",
      content: "A medium-sized application might use packages such as:\n\n```text\ncom.example.orders.api\ncom.example.orders.service\ncom.example.orders.repository\ncom.example.orders.domain\n```\n\nFor example:\n\n```java\npackage com.example.orders.service;\n\nimport com.example.orders.domain.Order;\nimport com.example.orders.repository.OrderRepository;\n\npublic class OrderService {\n    private final OrderRepository repository;\n\n    public OrderService(OrderRepository repository) {\n        this.repository = repository;\n    }\n\n    public Order find(long id) {\n        return repository.findById(id);\n    }\n}\n```\n\nThe package tells you where the class belongs conceptually. Imports tell you which other types are referenced by simple name.\n\nGood package structure should reflect meaningful boundaries rather than simply creating a package for every tiny class.",
    },
    {
      title: "Common misconceptions",
      content: "**\"Import loads the class.\"**\n\nImport is primarily a source-level naming mechanism. Class loading is a separate runtime concern.\n\n**\"java.util.* imports java.util.concurrent.*.\"**\n\nIt does not. Subpackages are independent packages.\n\n**\"The package is just the folder.\"**\n\nThe package is a Java namespace and part of a type's fully qualified name. The folder layout conventionally mirrors it.\n\n**\"Packages and modules are the same.\"**\n\nThey are not. A module can contain multiple packages and provides a larger dependency/encapsulation boundary.\n\n**\"If the IDE knows the import, the application has the dependency.\"**\n\nNot necessarily. The compiler/runtime still need the required artifact in the appropriate environment.",
    },
    {
      title: "Practice: resolve names",
      content: "Suppose you have:\n\n```java\ncom.example.api.User\ncom.example.model.User\n```\n\nAnswer:\n\n1. What is the fully qualified name of each class?\n2. Why can both classes exist?\n3. What happens if both are imported and you write `User`?\n4. How can you use both in the same source file?\n5. Does importing `com.example.*` also import `com.example.api.*`?\n\nThen create:\n\n```text\ncom.example.orders.service\ncom.example.orders.repository\n```\n\nand place one class in each package. Import the repository from the service and explain which part is package organization and which part is source-level name resolution.\n\nIf you can explain the difference between package, import, dependency, and module, you have the foundation needed for larger Java projects.",
    },
  ],
};

export default topic;

export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 35,
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