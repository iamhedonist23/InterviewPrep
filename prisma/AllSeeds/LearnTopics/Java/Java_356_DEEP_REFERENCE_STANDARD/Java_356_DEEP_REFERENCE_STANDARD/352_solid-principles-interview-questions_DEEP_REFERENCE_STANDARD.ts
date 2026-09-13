import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

async function seed() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: "java" },
    update: {
      name: "Java",
      description: "Deep, topic-specific Java learning from beginner fundamentals through advanced JVM, concurrency, performance, security, databases, testing, modern Java, and interview review.",
      icon: "JAVA",
      isPublished: true,
      sortOrder: 0,
    },
    create: {
      name: "Java",
      slug: "java",
      description: "Deep, topic-specific Java learning from beginner fundamentals through advanced JVM, concurrency, performance, security, databases, testing, modern Java, and interview review.",
      icon: "JAVA",
      isPublished: true,
      sortOrder: 0,
    },
  });

  const path = await prisma.studyPath.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "interview-prep" } },
    update: {
      name: "Interview Prep",
      description: "Java interview prep learning path.",
      level: StudyLevel.INTERVIEW_PREP,
      isPublished: true,
      sortOrder: 0,
    },
    create: {
      categoryId: category.id,
      name: "Interview Prep",
      slug: "interview-prep",
      description: "Java interview prep learning path.",
      level: StudyLevel.INTERVIEW_PREP,
      isPublished: true,
      sortOrder: 0,
    },
  });

  const module = await prisma.studyModule.upsert({
    where: { studyPathId_slug: { studyPathId: path.id, slug: "interview-review" } },
    update: {
      title: "Interview Review",
      description: "Deep, practical Java study covering interview review.",
      isPublished: true,
      sortOrder: 0,
    },
    create: {
      studyPathId: path.id,
      title: "Interview Review",
      slug: "interview-review",
      description: "Deep, practical Java study covering interview review.",
      isPublished: true,
      sortOrder: 0,
    },
  });

  const topic: TopicSeed = {
    title: "SOLID principles interview questions",
    slug: "solid-principles-interview-questions",
    description: "Deep, topic-specific explanation of SOLID principles interview questions, including the Java rule, how it behaves, practical usage, edge cases, common interview traps, and hands-on reasoning.",
    estimatedMinutes: 24,
    sections: [
      { title: "What the concept actually means", content: `\`SOLID principles interview questions\` is a Java concept whose correct use depends on its language, library, compiler, or JVM contract. The important goal is to understand the rule, observe it in code, and know the boundary where the rule changes.

The name alone is not the full definition. A strong understanding connects \`SOLID principles interview questions\` to the part of Java that gives it meaning: source-language rules, compiler type checking, library contracts, JVM execution, memory visibility, external I/O, or a design constraint. The same distinction matters in interviews because a definition without the governing rule usually breaks as soon as the interviewer changes the example.` },
      { title: "How it works", content: `Start by identifying the inputs, the Java rule that applies, and the observable result.

For \`SOLID principles interview questions\`, reason in this order:

1. What does the source code declare or request?
2. What does the compiler check or infer?
3. What does the runtime/library actually do?
4. What value, state change, exception, or side effect should the developer observe?
5. Which part is guaranteed by Java's specification and which part may depend on the JDK/JVM implementation?

This model prevents a common mistake: treating an implementation detail as if it were a language guarantee.` },
      { title: "Detailed example", content: `The following example is intentionally small enough to reason about line by line.

\`\`\`java
Path path = Path.of("data.txt");

Files.writeString(path, "Hello, Java");

String text = Files.readString(path);
System.out.println(text);
\`\`\`

Read the example by identifying the declared types, the operation being performed, and the point where Java applies the rule behind \`SOLID principles interview questions\`. Do not memorize the output alone. Explain why that output follows from the language or API contract.` },
      { title: "Important rules and edge cases", content: `For \`SOLID principles interview questions\`, distinguish specification guarantees from implementation details, then consider readability, correctness, failure behavior, compatibility, and performance in the surrounding application.

For difficult follow-up questions, change one assumption at a time. Change the declared type, the runtime object, the input value, the thread, the exception path, or the collection implementation and then predict what changes.

Also check boundary cases such as null values, empty input, duplicate values, overflow or precision, invalid state, resource failure, concurrency, and API version differences whenever they are relevant to \`SOLID principles interview questions\`.` },
      { title: "Practical use in real Java code", content: `Use \`SOLID principles interview questions\` because it expresses a real requirement, not because the feature exists.

In production, evaluate readability, ownership, failure handling, compatibility, performance, and maintainability. If \`SOLID principles interview questions\` interacts with an external resource or another thread, include the failure and timing behavior in the design rather than documenting only the happy path.

A good implementation should make the important invariant visible. If another developer can change one line and silently violate that invariant, the code needs a clearer boundary or validation.` },
      { title: "Common mistakes and misconceptions", content: `**Mistake 1:** memorizing a definition without knowing the rule that produces the behavior.

**Mistake 2:** assuming a small example proves a universal rule. Java behavior can change with static type, runtime type, overload resolution, nullability, input shape, thread interleaving, or implementation version.

**Mistake 3:** confusing similar concepts. When \`SOLID principles interview questions\` has a commonly confused neighbor, explicitly compare what is selected at compile time, what happens at runtime, and what contract each API provides.

**Mistake 4:** ignoring the failure path. Production-quality Java explanations include what happens when input is invalid, a resource is unavailable, or an operation cannot complete.` },
      { title: "Interview-ready explanation", content: `A concise but technically strong interview answer for \`SOLID principles interview questions\` should follow this structure:

**Direct answer:** State the defining rule in one or two sentences.

**How it works:** Explain the compiler, runtime, or library mechanism that makes the rule observable.

**Example:** Give a small Java example and explain the important line rather than only showing code.

**Trade-off or edge case:** Mention one limitation, common trap, or version-sensitive detail.

**Practical use:** Explain where you would use it in a real codebase.

For \`SOLID principles interview questions\`, avoid vague claims such as "Java handles it automatically" unless you can immediately explain what Java is actually doing.` },
      { title: "Practice and follow-up questions", content: `1. Define \`SOLID principles interview questions\` without using only its name as the definition.
2. Show the smallest Java example that demonstrates its most important rule.
3. What does the compiler determine, and what is decided at runtime?
4. What changes if the input/type/runtime condition is changed?
5. What is one common misconception about \`SOLID principles interview questions\`?
6. What failure or edge case would you test?
7. Where would you use this in production, and where would you avoid it?
8. Which nearby Java concept is most often confused with it, and how would you distinguish them?

Before running the example, predict the result. Then change one meaningful line and explain the new result.` }
    ],
  };

  const savedTopic = await prisma.studyTopic.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: topic.slug } },
    update: {
      title: topic.title,
      moduleId: module.id,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 352,
    },
    create: {
      categoryId: category.id,
      moduleId: module.id,
      title: topic.title,
      slug: topic.slug,
      seoDescription: topic.description,
      estimatedMinutes: topic.estimatedMinutes,
      isPublished: true,
      sortOrder: 352,
      prerequisiteIds: [],
      relatedTopicIds: [],
    },
  });

  for (let index = 0; index < topic.sections.length; index += 1) {
    const section = topic.sections[index];
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

  console.log(`Seeded: ${topic.title}`);
}

seed()
  .catch((error) => {
    console.error("Java topic seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
