import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
};
type ModuleSeed = { title: string; slug: string; description: string; topics?: TopicSeed[] };
type PathSeed = { name: string; slug: string; description: string; level: StudyLevel; modules: ModuleSeed[] };
type CategorySeed = { name: string; slug: string; description: string; icon: string; sortOrder: number; paths: PathSeed[] };

async function ensureCategory(category: CategorySeed) {
  const createdCategory = await prisma.studyCategory.upsert({
    where: { slug: category.slug },
    update: { name: category.name, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
    create: { name: category.name, slug: category.slug, description: category.description, icon: category.icon, isPublished: true, sortOrder: category.sortOrder },
  });
  for (const pathSeed of category.paths) {
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: createdCategory.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
      create: { categoryId: createdCategory.id, name: pathSeed.name, slug: pathSeed.slug, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: 0 },
    });
    for (const moduleSeed of pathSeed.modules) {
      const module = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
        create: { studyPathId: path.id, title: moduleSeed.title, slug: moduleSeed.slug, description: moduleSeed.description, isPublished: true, sortOrder: 0 },
      });
      for (const topicSeed of moduleSeed.topics ?? []) {
        const savedTopic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: createdCategory.id, slug: topicSeed.slug } },
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 2 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 2, prerequisiteIds: [], relatedTopicIds: [] },
        });
        for (let index = 0; index < (topicSeed.sections ?? []).length; index += 1) {
          const section = topicSeed.sections![index];
          await prisma.studyTopicSection.upsert({
            where: { id: `${savedTopic.id}-section-${index}` },
            update: { title: section.title, content: section.content, sortOrder: index },
            create: { id: `${savedTopic.id}-section-${index}`, topicId: savedTopic.id, title: section.title, content: section.content, sortOrder: index },
          });
        }
      }
    }
  }
}

export const topic: TopicSeed = {
  title: "Java source code compilation and execution",
  slug: "java-source-code-compilation-and-execution",
  description: "A practical guide to Java source code compilation and execution, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 25,
  sections: [
    {
      title: "What compilation actually does",
      content: `Java source code is written in .java files. The javac compiler reads the source, performs lexical and syntactic analysis, checks types and other language rules, and produces Java bytecode in .class files.

The result is not normally native machine code for one operating system. It is bytecode intended to be executed by a compatible JVM.

This separation is important because compilation errors happen before the application starts. Runtime errors such as NullPointerException happen after the compiled program has begun executing.`
    },
    {
      title: "A complete small example",
      content: `Consider this program:

\`\`\`java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}
\`\`\`

Save it as Hello.java. Compile it with:

\`\`\`text
javac Hello.java
\`\`\`

Then run the class with:

\`\`\`text
java Hello
\`\`\`

The compiler creates Hello.class. The java launcher starts the JVM, the class is loaded, and execution begins at the main method.`
    },
    {
      title: "Compilation and class files",
      content: `A .class file contains JVM bytecode and metadata needed by the runtime. It is not the same thing as the original .java source file.

A source file can produce more than one class file when it contains nested classes or multiple applicable type declarations. The output therefore should not be mentally reduced to "one source file equals one class file."

The compiler can also report errors without producing a usable class file for the failed compilation.`
    },
    {
      title: "What happens at runtime",
      content: `Starting a Java application involves more than simply reading bytecode. The JVM loads classes as needed, performs linking and initialization work, and executes bytecode.

Modern JVMs may interpret bytecode initially and use Just-In-Time compilation to optimize frequently executed code. Runtime profiling can help the JVM identify hot code paths.

This is why Java performance is often discussed in terms of both startup behavior and long-running optimized behavior.`
    },
    {
      title: "Compile-time errors vs runtime failures",
      content: `A compiler catches language-level problems such as an incompatible assignment or a reference to an unknown symbol.

A program can still compile and fail at runtime. For example:

\`\`\`java
String name = null;
System.out.println(name.length());
\`\`\`

The code is syntactically and type-correct, but executing name.length() when name is null causes a NullPointerException.

This distinction is easy to miss and comes up often in interviews: successful compilation proves that certain compile-time rules were satisfied; it does not prove that the program is logically correct or safe for every runtime input.`
    },
    {
      title: "Practical build perspective",
      content: `In a real project, you will rarely type javac for every source file yourself. Maven, Gradle, IDEs, and CI systems manage source sets, dependencies, compiler options, tests, packaging, and reproducible builds.

The same fundamental stages still exist: source is compiled into JVM-compatible artifacts, dependencies are resolved, and the resulting application is launched on a JVM.

When diagnosing a build issue, identify whether the failure occurs during dependency resolution, compilation, testing, packaging, class loading, or runtime execution.`
    },
    {
      title: "Interview-ready understanding",
      content: `A concise explanation is: javac compiles Java source into JVM bytecode stored in class files. The JVM loads and executes that bytecode, and modern JVMs can JIT-compile hot code into optimized native instructions.

Keep the boundary clear: javac compiles the source, while the JVM executes the bytecode that compilation produced.`
    },
    {
      title: "Practice",
      content: `Create Hello.java, compile it, inspect the generated class file, and run it.

Then introduce one compile-time error and one runtime error. Explain exactly which stage detects each problem and why.`
    },
  ],
};

async function seedJavaTopic() {
  const javaCategory: CategorySeed = {
    name: "Java (Core)",
    slug: "java-core",
    description: "Master Core Java from basics to advanced: OOP, Collections, Exceptions, I/O, Concurrency, Generics, and more.",
    icon: "JAVA",
    sortOrder: 0,
    paths: [{
      name: "Beginner",
      slug: "beginner",
      description: "Learn Java syntax, OOP fundamentals, and essential APIs.",
      level: StudyLevel.BEGINNER,
      modules: [{
        title: "Java Fundamentals",
        slug: "java-fundamentals",
        description: "Variables, data types, operators, control flow, arrays, and strings.",
        topics: [topic],
      }],
    }],
  };
  await ensureCategory(javaCategory);
  console.log("Java topic seeded successfully: 3");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
