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
          update: { title: topicSeed.title, moduleId: module.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 1 },
          create: { categoryId: createdCategory.id, moduleId: module.id, title: topicSeed.title, slug: topicSeed.slug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: 1, prerequisiteIds: [], relatedTopicIds: [] },
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
  title: "Installing Java and checking the version",
  slug: "installing-java-and-checking-the-version",
  description: "A practical guide to Installing Java and checking the version, including the Java rules, examples, edge cases, common mistakes, and interview considerations that matter when writing real Java code.",
  estimatedMinutes: 15,
  sections: [
    {
      title: "What you actually install",
      content: `Installing Java usually means installing a JDK (Java Development Kit), not just a compiler. A modern JDK provides the Java runtime together with development tools such as javac and java.

On a development machine, the JDK is the practical choice because you need to compile, run, test, and troubleshoot applications—not just execute an already-built program. The exact package name and installation method depend on the operating system and JDK distribution.

A useful way to keep these concepts straight is: the JDK is the developer toolkit, javac is the Java compiler, and java is the launcher used to start a Java application.`
    },
    {
      title: "Checking the Java installation",
      content: `After installation, the first useful check is the Java runtime version:

\`\`\`text
java -version
\`\`\`

Then check the compiler:

\`\`\`text
javac -version
\`\`\`

These commands answer slightly different questions. java confirms that a Java runtime launcher is available on the PATH. javac confirms that the compiler from a JDK is available.

If java works but javac does not, the machine may have only a runtime available, or the JDK's bin directory may not be configured correctly.`
    },
    {
      title: "PATH and JAVA_HOME",
      content: `PATH determines which executable the shell finds when you type commands such as java and javac.

JAVA_HOME is commonly used by build tools and development environments to identify a JDK installation. It should point to the JDK installation directory rather than to the bin directory.

A common mistake is having multiple JDK installations and assuming the IDE, terminal, Maven, and Gradle are all using the same one. They may resolve Java from different locations.

When debugging a version problem, check the actual executable being selected as well as \`\`\`text
java -version
\`\`\` and \`\`\`text
javac -version
\`\`\`.`
    },
    {
      title: "JDK version matters",
      content: `Java applications can depend on a particular language level, bytecode version, library API, or runtime behavior. Therefore, knowing only that Java is installed is not enough.

For example, a project may require Java 17 while a machine is using Java 21, or a build may compile with one release level while tests run on another JDK.

Build configuration should make the intended Java version explicit. This reduces the classic situation where code works on one developer machine but fails in CI or production because the selected JDK is different.`
    },
    {
      title: "Practical troubleshooting",
      content: `If \`\`\`text
java -version
\`\`\` reports an unexpected version, inspect PATH ordering and the JDK installation selected by the IDE or build tool.

If javac is not found, verify that a JDK is installed and that its bin directory is available to the shell.

If compilation succeeds but execution fails with an unsupported class version error, the runtime is generally older than the Java version used to produce the class file.

When something behaves differently across machines, first find the exact JDK used for compilation and the exact runtime used to launch the application. Do not assume they are the same.`
    },
    {
      title: "Interview-ready understanding",
      content: `A concise way to explain this in an interview is: Java development normally requires a JDK. I verify the runtime with \`\`\`text
java -version
\`\`\` and the compiler with \`\`\`text
javac -version
\`\`\`. I also make sure the project's configured JDK matches the version expected by the build and deployment environment.

The bigger lesson is that the Java version is part of the build itself, not just a detail of the developer's machine. A working installation is not enough; the project should consistently use a known Java version.`
    },
    {
      title: "Practice",
      content: `Install a JDK and verify both commands:

\`\`\`text
java -version
\`\`\`
\`\`\`text
javac -version
\`\`\`

Then install or configure a second JDK and deliberately change which one your terminal selects. Observe how the reported versions change.

Finally, explain why a project can fail even when Java is installed correctly.`
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
  console.log("Java topic seeded successfully: 2");
}

seedJavaTopic().catch((error) => {
  console.error("Java topic seed failed:", error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
