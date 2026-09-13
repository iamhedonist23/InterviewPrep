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

 const sections = topicSeed.sections ?? [];
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
 description: "Master Core Java from basics to advanced: OOP, Collections, Exceptions, I/O, Concurrency, Generics, and more.",
 icon: "JAVA",
 sortOrder: 0,
 paths: [
 // -------------------- BEGINNER --------------------
 {
 name: "Beginner",
 slug: "beginner",
 description: "Learn Java syntax, OOP fundamentals, and essential APIs.",
 level: StudyLevel.BEGINNER,
 modules: [
 {
 title: "Java Fundamentals",
 slug: "java-fundamentals",
 description: "Variables, data types, operators, control flow, arrays, and strings.",
 topics: [
 {
 title: "Java overview and use cases",
 slug: "java-overview-and-use-cases",
 description: "Java is a statically-typed, object-oriented language that runs on the JVM instead of directly on hardware — and that one design choice explains almost everything else about it.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "When Java was designed, its core promise was 'write once, run anywhere.' Instead of compiling your code straight into machine instructions for one specific CPU/OS combination (like C does), Java compiles to an intermediate form called bytecode, which is then executed by the Java Virtual Machine (JVM). As long as a JVM exists for a platform, your compiled program runs there unchanged. This architecture gives Java four practical strengths that explain where you'll see it used today: 1. Platform independence — the same .class file runs on Windows, Linux, macOS, or inside a Docker container, because the JVM handles the platform-specific translation. 2. Automatic memory management — Java's garbage collector reclaims memory for objects you're no longer using, so you don't manually allocate/free memory like in C/C++. This eliminates a huge class of bugs (dangling pointers, double-frees, memory leaks from forgotten frees). 3. A mature ecosystem — decades of libraries and frameworks (Spring, Hibernate, Kafka clients) exist specifically because Java has been an enterprise standard for so long. 4. Strong static typing — the compiler catches type errors before your code ever runs, which matters enormously once a codebase grows past a few thousand lines and multiple people are editing it. In practice, you'll find Java powering large enterprise backends (banking, insurance, logistics systems), Android apps, and big-data infrastructure — Hadoop, Kafka, and Spark are all JVM-based projects. The JVM itself has also become a platform other languages build on: Kotlin and Scala both compile to the same bytecode and can freely call Java libraries.\ \ A useful way to think about Java is to separate three things that are often casually called “Java.” The Java language defines the source-level rules you write. The JVM defines the execution environment for compiled class files. The JDK is the collection of tools used to develop and run Java applications. Keeping those layers separate makes later topics such as class loading, garbage collection, and JIT compilation much easier to understand.\ \ The JVM is also more than a portability trick. It gives the runtime information about the program while it is executing. A long-running service can observe which methods are actually hot, optimize those paths, collect unused objects, and adapt some optimizations based on observed behavior. That is very different from a traditional compile-once-to-one-machine model.\ \ There are limits to “write once, run anywhere.” The bytecode can be portable while the surrounding environment is not. File paths, native libraries, operating-system signals, environment variables, time zones, character encodings, and CPU-specific behavior can still matter. Good Java engineering therefore means portable application logic plus deliberate handling of platform-dependent boundaries.\ \ Try this experiment: compile the same HelloWorld class on one machine, copy the class file to another machine with a compatible Java runtime, and run it there. Then inspect it with `javap -c HelloWorld`. You will see JVM instructions rather than Windows or Linux machine instructions. That small experiment makes the language/JVM distinction concrete."
 },
 {
 title: "Runnable example",
 content: "```java\n// A minimal Java program — this alone shows the platform-independence idea:\npublic class HelloWorld {\n public static void main(String[] args) {\n System.out.println(\"Hello, World!\");\n }\n}\n\n// Compile once: javac HelloWorld.java -> produces HelloWorld.class (bytecode)\n// Run anywhere: java HelloWorld -> runs on any machine with a JVM installed\n```"
 },
 {
 title: "Key takeaways",
 content: "- Java compiles to bytecode, not native machine code — the JVM executes that bytecode on any platform - Garbage collection removes the need for manual memory management - Java is statically typed, so many errors are caught before the program ever runs - It dominates enterprise backends, Android development, and big-data tooling (Hadoop, Kafka, Spark)"
 },
 {
 title: "Practice",
 content: "Try to explain in your own words why a compiled .class file can run unmodified on both Windows and Linux, when a compiled C program generally cannot."
 },
 ],
 },
 {
 title: "Installing Java and checking the version",
 slug: "installing-java-and-checking-the-version",
 description: "Before writing any Java code, you need a JDK installed and your system configured so the `java` and `javac` commands are available from any terminal.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "A JDK (Java Development Kit) is what you install to write and run Java code — it bundles the compiler, the runtime, and development tools together. There are several free distributions built from the same open-source OpenJDK project: Eclipse Temurin (formerly AdoptOpenJDK), Amazon Corretto, and Oracle's own OpenJDK builds are all common choices, and functionally they behave the same for everyday development. After installing, two pieces of setup matter: setting the JAVA_HOME environment variable to point at your JDK's installation folder, and adding $JAVA_HOME/bin to your system PATH so the `java` and `javac` executables can be found from any terminal without typing the full path. Once that's done, you verify everything worked with two commands: `java -version` shows which runtime you have, and `javac -version` shows which compiler you have. These can technically report different versions if you have multiple JDKs installed and your PATH happens to resolve to different ones for the runtime vs the compiler — a real (if uncommon) source of confusing bugs, so it's worth checking both when something feels off. One more thing worth knowing as you learn: since Java 9, a new version is released every six months, but only some versions are 'LTS' (Long-Term Support) — 8, 11, 17, and 21 are the LTS releases that companies actually build production systems on, since they get years of security patches. As a learner, installing the latest LTS version is the safe default choice.\ \ The installation process is easier to understand if you separate “finding a Java executable” from “choosing a Java development environment.” `JAVA_HOME` is a convention used by tools to identify the JDK installation; the shell's `PATH` determines which executable is actually found when you type `java` or `javac`. They are related, but they are not the same thing.\ \ With multiple JDKs installed, always diagnose the actual executable being selected. On Windows, `where java` and `where javac` can reveal which files are being found. On Linux/macOS, `which java` and `which javac` provide the corresponding clue. This is often more useful than staring at JAVA_HOME because a PATH entry can point somewhere unexpected.\ \ A project can also deliberately pin a Java version instead of relying on whatever happens to be globally installed. Build tools such as Maven and Gradle can enforce a target language/runtime level, while environment managers can switch installed JDKs. In a team, reproducibility matters more than simply having “Java installed.”\ \ A useful exercise is to install two JDK versions, inspect `java -version`, `javac -version`, and the resolved executable paths, then change PATH ordering and observe what changes. This teaches configuration behavior rather than just memorizing commands."
 },
 {
 title: "Runnable example",
 content: "```bash\n# Terminal commands to verify your installation\njava -version\njavac -version\n\n# Check where JAVA_HOME points\necho $JAVA_HOME # macOS/Linux\necho %JAVA_HOME% # Windows\n```"
 },
 {
 title: "Key takeaways",
 content: "- A JDK includes the compiler (javac), the runtime (JVM), and development tools - JAVA_HOME + PATH configuration makes 'java' and 'javac' available from any terminal - java -version and javac -version verify your runtime and compiler versions - LTS releases (8, 11, 17, 21) are what real projects target — install the latest LTS as a learner"
 },
 ],
 },
 {
 title: "Java source code compilation and execution",
 slug: "java-source-code-compilation-and-execution",
 description: "Understanding what happens between writing a .java file and seeing output on screen is the foundation for understanding almost every other Java concept.",
 estimatedMinutes: 16,
 sections: [
 {
 title: "Concept and mental model",
 content: "There are three distinct stages between your source code and a running program, and each one matters for different reasons. Stage 1 — Compilation. Running `javac HelloWorld.java` invokes the Java compiler. It checks your code for syntax errors and type errors, then — if everything is valid — produces a `.class` file. This file doesn't contain native machine code; it contains bytecode, a platform-neutral set of instructions designed for the JVM, not for any specific CPU. Stage 2 — Class loading. When you run `java HelloWorld`, the JVM's class loader finds the `.class` file and loads it into memory. Before executing anything, it runs the bytecode through a verifier that checks the code is safe — no illegal type casts, no corrupted stack operations, nothing that could crash the JVM or violate memory safety. This verification step is part of why Java is considered a 'safe' language to run untrusted code in, historically (think: old Java applets). Stage 3 — Execution. The JVM's execution engine starts running the bytecode. Initially it interprets instructions one at a time, which is straightforward but relatively slow. For code that runs frequently — a 'hot' method called thousands of times — the JIT (Just-In-Time) compiler kicks in and compiles that specific method directly into native machine code, caching it for reuse. This is why long-running Java applications (like a web server) often get measurably faster after running for a little while — the JIT has had time to identify and optimize the hot paths. The takeaway: this two-stage design (compile to portable bytecode, then JIT-compile hot code to native instructions at runtime) is what gives Java both 'runs anywhere' portability and genuinely competitive runtime performance.\ \ The compilation/execution pipeline becomes much clearer when you distinguish compiler work from JVM work. `javac` performs lexical analysis, parsing, name and type analysis, flow checks, and class-file generation. It does not need to execute your program to decide that `int x = \"hello\";` is invalid. The resulting class file contains JVM bytecode plus metadata such as constant-pool entries, field and method descriptions, and attributes.\ \ When the launcher starts a class, the JVM does not simply “read the file and run main.” The runtime may load the requested class, link it, and initialize it according to JVM rules. Linking includes verification and preparation, with symbolic resolution performed as required. Initialization is a separate phase in which class initialization code, including static field initialization and static initializer blocks, can run. A class being present on disk is therefore not equivalent to saying its initialization code has already executed.\ \ Consider three failures at different points. A syntax/type error such as `int x = \"hello\";` stops compilation. A missing dependency can lead to a class-loading or linking failure such as `ClassNotFoundException` or `NoClassDefFoundError`. An expression such as `10 / 0` with integer operands can compile successfully and then fail while executing. Learning to identify the phase of failure makes debugging much faster.\ \ You can inspect the generated instructions with `javap -c HelloWorld`. For a tiny program, find the `main` method and identify the instructions associated with loading the string, obtaining `System.out`, and invoking `println`. The exact instruction sequence is less important than learning that source-level statements become JVM instructions and symbolic references.\ \ JIT compilation is also not simply “Java first interprets everything, then compiles everything.” Modern JVMs use adaptive compilation strategies, profiling, optimization, and deoptimization. Hot code can be compiled while the application continues running. Some optimizations rely on runtime observations and can later be invalidated if those assumptions stop being true. This is why JVM performance should be measured with realistic workloads rather than inferred from the source code alone.\ \ Try three experiments: introduce a compile-time type error; compile a program that references a class that is missing from the runtime classpath; and compile a program containing a runtime arithmetic failure. For each, ask: did the failure happen in the compiler, class loading/linking, or execution? That mental model is one of the most useful foundations for Java debugging."
 },
 {
 title: "Runnable example",
 content: "```java\n// HelloWorld.java\npublic class HelloWorld {\n public static void main(String[] args) {\n System.out.println(\"Hello, World!\");\n }\n}\n\n// Step 1: javac HelloWorld.java -> creates HelloWorld.class (bytecode)\n// Step 2 & 3: java HelloWorld -> JVM loads, verifies, and executes the bytecode\n```"
 },
 {
 title: "Key takeaways",
 content: "- javac compiles source code into portable bytecode, not native machine code - The JVM loads and verifies bytecode for safety before running it - Execution starts as interpretation, then the JIT compiler optimizes frequently-run ('hot') code into native instructions - This is exactly what gives Java both portability and strong runtime speed"
 },
 ],
 },
 {
 title: "Java program structure",
 slug: "java-program-structure",
 description: "Every Java source file follows a predictable structure — learning the rules the compiler enforces will save you from confusing errors later.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "A Java file has a required order: an optional `package` declaration comes first (declaring which package this file's classes belong to), then any number of `import` statements (bringing in classes from other packages), and then your actual class/interface/enum/record declarations. You can define multiple top-level types in a single file, but only one of them can be `public`. And if there is a public type in the file, the file name must exactly match that type's name, including capitalization — `public class Main` must live in a file named `Main.java`, or the compiler will reject it. This isn't just a style convention; it's a hard rule the compiler checks. Inside a class, you'll typically see fields (the data each object holds), constructors (special methods that set up a new object), regular methods (behavior), and sometimes nested classes or initializer blocks. The `main` method is the conventional starting point of a program — it's the method the JVM looks for and calls first — but not every class needs one; only the class you actually launch with `java ClassName` needs a `main` method. As a modern convenience: since Java 11, you can skip the separate compile step entirely for quick single-file programs and just run `java HelloWorld.java` directly — the JVM compiles it in memory and runs it immediately. This is great for learning and quick scripts, though real projects still use a proper build process.\ \ The source-file structure is easier to remember when you understand why the compiler needs each part. The package declaration establishes the package of the declarations in the compilation unit. Imports give the compiler convenient simple names for types or static members. Type declarations then define the program's actual types. Imports do not cause classes to be loaded at runtime; they are primarily source-level name-resolution aids.\ \ A source file can contain more than one top-level type. The familiar filename rule applies when a top-level type is public: the source filename conventionally corresponds to that public type's simple name. This is why `public class Main` is normally placed in `Main.java`; the compiler and build tools can then map source files and types predictably.\ \ A class containing `main` is not automatically “the Java program.” A Java application can contain hundreds of classes, and only the class selected by the launcher needs to provide an accepted entry point. Libraries commonly contain no main method at all because another application invokes them.\ \ The single-file source launcher is useful for learning because it removes build ceremony, but it does not change the underlying Java language. For larger projects, explicit compilation, dependency management, tests, packaging, and reproducible builds remain important."
 },
 {
 title: "Runnable example",
 content: "```java\npackage com.example.app;\n\nimport java.util.List;\n\npublic class Main { // must match filename: Main.java\n private int counter;\n\n public Main() {\n this.counter = 0;\n }\n\n public static void main(String[] args) {\n System.out.println(\"App started\");\n }\n}\n\nclass Helper { // non-public, allowed in the same file\n // ...\n}\n```"
 },
 {
 title: "Key takeaways",
 content: "- File structure order: package declaration -> imports -> class/interface/enum/record declarations - Only one public top-level type per file, and the filename must exactly match it - main() is the program's entry point, but only required in the class you actually run - Java 11+ lets you run a single .java file directly without a separate compile step, useful for learning"
 },
 ],
 },
 {
 title: "Keywords and identifiers",
 slug: "keywords-and-identifiers",
 description: "Identifiers are the names you choose for variables, methods, and classes — but Java has strict rules about what makes a name valid.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "An identifier is any name you give to a variable, method, class, or package. Java's rules are: it must start with a letter, underscore (_), or dollar sign ($) — never a digit. After that first character, it can contain letters, digits, underscores, and dollar signs in any combination. Identifiers are case-sensitive, so `total` and `Total` are two completely different names. And an identifier can never be exactly the same as a reserved keyword. It's worth learning the difference between 'keywords' and 'reserved words,' because it explains some odd edge cases you might run into. Words like `class`, `if`, `public`, and `static` are true keywords with fixed syntactic meaning. But `true`, `false`, and `null` are technically 'reserved literals' rather than keywords in the formal language spec — practically, this distinction rarely matters, since you still can't use any of them as a variable name either way. A more genuinely useful edge case to know: `var` (introduced in Java 10) is a 'reserved type name,' not a keyword. That means you can't create a class named `var`, but you actually can still use `var` as the name of a regular variable in most situations — a quirk that surprises a lot of learners. Style-wise, while `$` and `_` are technically legal in identifiers, both are discouraged in everyday code: the compiler uses `$` internally for naming inner classes, and a single underscore `_` alone has actually been made illegal as an identifier since Java 9 (it's reserved for future language features).\ \ Java identifiers are defined using Unicode-aware rules rather than merely the ASCII letters shown in most beginner examples. This means the language can represent identifiers using a broader set of characters than `A-Z` and `a-z`. In production code, however, conventional ASCII-style names such as `customerCount` and `calculateTotal` are usually easier for teams to read and maintain.\ \ There are several different categories of words in the language. Keywords have syntactic meaning. Boolean and null literals are literals, not ordinary keywords. `var` is a reserved type name used in local variable type inference. These distinctions matter because the compiler treats them differently even though the practical lesson is often simply “don't use language-reserved words as names.”\ \ The underscore rule is especially useful to test. Before Java 9, `_` could be used alone as an identifier. Since Java 9, a lone underscore is reserved and cannot be used as an identifier. `$` remains legal, but application code normally avoids it because generated code frequently uses dollar signs in synthetic or nested names.\ \ Try deliberately writing identifiers that start with digits, use keywords, use `_`, and use `var` in different contexts. Compare the compiler errors. Seeing which names are rejected in which contexts is more memorable than memorizing a list."
 },
 {
 title: "Runnable example",
 content: "```java\nint totalCount; // valid identifier\nint _tempValue; // valid but discouraged style\nint 2ndPlace; // ILLEGAL - starts with a digit\nint class; // ILLEGAL - 'class' is a reserved keyword\n\nvar var = 5; // legal! 'var' is a reserved TYPE name, not a keyword\nSystem.out.println(var);\n```"
 },
 {
 title: "Key takeaways",
 content: "- Identifiers start with a letter, _, or $, then can include letters/digits/_/$; they're case-sensitive - Keywords (class, if, static...) can never be used as identifiers - true, false, and null are reserved literals — also can't be used as identifiers - A lone underscore _ has been illegal as an identifier since Java 9"
 },
 ],
 },
 {
 title: "Variables and constants",
 slug: "variables-and-constants",
 description: "Java has four distinct kinds of variables that behave differently in terms of scope, default values, and storage — knowing which is which prevents a lot of early confusion.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "The four categories are: local variables (declared inside a method or block — these live temporarily while that method runs, and Java requires you to give them a value before using them, since they get no automatic default), instance variables (fields that belong to a specific object — every object gets its own copy, and Java automatically initializes them to a default value like 0, false, or null if you don't set one), static variables (fields that belong to the class itself rather than any individual object — there's exactly one shared copy no matter how many objects you create), and method parameters (which behave like local variables scoped to that one method call). For constants — values that should never change — Java doesn't have a dedicated `const` keyword like some languages. Instead, the idiomatic pattern is combining two keywords: `static` (one shared copy) and `final` (can only be assigned once). By convention, constant names are written in UPPER_SNAKE_CASE: `public static final int MAX_RETRIES = 3;` An important nuance to internalize early: `final` only prevents *reassigning the variable itself*. If that variable holds a reference to a mutable object, like a `List`, the object itself can still be changed — you just can't point the variable at a *different* object afterward. This is a subtlety that trips up a lot of learners who assume `final` makes everything about the object immutable, when it only locks the reference.\ \ It helps to separate scope, lifetime, and storage instead of treating them as synonyms. A local variable is visible only within its declaration scope. A parameter is local to a particular method or constructor invocation. An instance field belongs to an object, while a static field belongs to a class identity. The JVM's physical representation is an implementation detail, so “locals live on the stack” should be treated as a simplified model rather than a Java language guarantee.\ \ Initialization rules are also different. Fields receive default values as part of object/class initialization, while local variables must satisfy Java's definite-assignment rules before use. This is why `int x; System.out.println(x);` is rejected even though an instance field of type int would receive zero as its default.\ \ `final` deserves a second distinction: a final variable has a restricted assignment rule, while a constant variable is a more specific language concept involving a final variable of primitive or String type initialized with a constant expression. Such compile-time constants can be inlined into client class files. That is why changing a public library constant can require dependent code to be recompiled.\ \ For mutable objects, final does not imply deep immutability. `final List<String> names` prevents assigning another list to `names`, but it does not prevent `names.add(...)`. If true immutability is required, the object's own design must prevent state changes."
 },
 {
 title: "Runnable example",
 content: "```java\npublic class Config {\n public static final int MAX_RETRIES = 3; // constant: shared + unchangeable\n private int instanceCounter; // instance variable, defaults to 0\n private static int globalCounter; // static variable, shared by all objects\n\n public void process() {\n int localVar = 10; // local variable - MUST be initialized before use\n }\n}\n\nfinal List<String> names = new ArrayList<>();\nnames.add(\"Ana\"); // fine - the LIST is still mutable\n// names = new ArrayList<>(); // ILLEGAL - can't reassign a final variable\n```"
 },
 {
 title: "Key takeaways",
 content: "- Four variable kinds: local, instance, static, and parameters — each with different scope/lifetime - Local variables must be explicitly initialized; instance/static fields get automatic defaults - Java constants use 'public static final', not a dedicated const keyword - final freezes the variable's reference, not the internal state of the object it points to"
 },
 ],
 },
 {
 title: "Primitive data types",
 slug: "primitive-data-types",
 description: "Java has exactly eight primitive types, and unlike many languages, their sizes are fixed by the language spec rather than depending on the machine you're running on.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "The eight primitives split into a few groups. Whole numbers: `byte` (8 bits, holds -128 to 127), `short` (16 bits), `int` (32 bits — the default and most commonly used integer type), and `long` (64 bits, for very large numbers — literals need an `L` suffix, like `10000000000L`). Decimal numbers: `float` (32 bits, needs an `f` suffix, rarely used today because of limited precision) and `double` (64 bits — the default choice for decimals). And two more: `char` (16 bits, representing a single character as a UTF-16 code unit) and `boolean` (true or false). Because these sizes are fixed by the Java specification — not left up to the platform, the way `int` in C can vary — a Java program behaves identically on every machine when it comes to how numbers overflow or wrap around. This consistency is part of the 'write once, run anywhere' promise. A detail worth learning early: default values only apply to *fields* (instance or static variables) — numeric fields default to 0, `boolean` defaults to `false`, `char` defaults to a null character. Local variables inside a method get no automatic default at all; you must assign them a value before you can use them, or the compiler will refuse to compile. One more useful fact: `char` in Java is unsigned, while `byte` and `short` are signed. When you do arithmetic mixing these smaller types, Java automatically promotes them to `int` first — this is why adding two `byte` values and assigning the result back into a `byte` variable requires an explicit cast, which we'll cover in the type-casting lesson.\ \ Primitive types are worth understanding at the bit level because many later Java rules are consequences of their defined ranges and conversions. `byte`, `short`, `int`, and `long` use two's-complement signed integer representations conceptually, while `char` is an unsigned 16-bit UTF-16 code unit. Floating-point types follow IEEE-style floating-point semantics and therefore do not represent every decimal value exactly.\ \ The `char` point is particularly important. A Java `char` is not guaranteed to represent an entire Unicode character as users perceive it. Some Unicode code points, including many emoji, require a surrogate pair of two UTF-16 code units. APIs that operate on Unicode text therefore sometimes need code-point-aware operations rather than assuming one `char` equals one user-visible character.\ \ Integer arithmetic also has a defined promotion behavior. A `byte` plus a `byte` produces an `int`, not a `byte`. Overflow of an integer operation is not automatically converted into an exception; the result wraps according to the type's arithmetic rules. Floating-point arithmetic has different behavior, including values such as positive/negative infinity and NaN.\ \ Try `System.out.println('A' + 1);`, then try adding two bytes. Next compare a large integer converted to double and back. These experiments reveal why primitive conversion rules matter beyond syntax."
 },
 {
 title: "Runnable example",
 content: "```java\nbyte age = 25;\nshort year = 2026;\nint population = 8_000_000;\nlong worldPopulation = 8_000_000_000L; // L suffix required for large values\nfloat price = 19.99f; // f suffix required\ndouble pi = 3.14159265358979;\nchar grade = 'A';\nboolean isActive = true;\n```"
 },
 {
 title: "Key takeaways",
 content: "- 8 primitives: byte, short, int, long, float, double, char, boolean - Sizes are fixed by the language spec, guaranteeing identical behavior across platforms - Fields get automatic default values; local variables do not and must be explicitly assigned - char is unsigned; byte/short are signed — arithmetic on them promotes to int automatically"
 },
 {
 title: "Practice",
 content: "What happens if you write `int total = 3_000_000_000;`? Try it and see what error the compiler gives, then figure out which type would actually hold that value."
 },
 ],
 },
 {
 title: "Reference types",
 slug: "reference-types",
 description: "Unlike primitives, a reference-type variable doesn't hold the actual object — it holds a pointer to where that object lives on the heap. This single idea explains a lot of Java's behavior.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Classes, interfaces, arrays, and enums are all reference types. When you write `Point p1 = new Point();`, `p1` doesn't contain the Point object directly — it contains a reference (essentially an address) pointing to where that object was allocated on the heap. This matters enormously when you assign one reference variable to another. `Point p2 = p1;` copies the reference, not the object — now both `p1` and `p2` point to the exact same object in memory. If you change a field through `p2`, and then look at `p1`, you'll see the same change, because there was only ever one object; you just have two names pointing at it. This is completely different from primitives, where assignment copies the actual value. This also explains one of the most common early confusions in Java: the difference between `==` and `.equals()`. For reference types, `==` checks whether two variables point to the exact same object in memory (reference/identity equality) — not whether the objects have the same content. To compare content, you use `.equals()`, which a class can override to define what 'equal' means for its own data. This is exactly why two separately-created `String` objects with identical text can be `==`-unequal but `.equals()`-equal. Finally, a reference variable can hold the special value `null`, meaning it points to nothing at all. Calling a method or accessing a field through a `null` reference throws a `NullPointerException` at runtime — one of the most frequently encountered exceptions in real Java programs, and a big part of why defensive null-checking (and, in modern Java, `Optional`) exists.\ \ A Java reference should be thought of as a managed reference value, not as a raw C-style pointer. Java does not expose the object's memory address, pointer arithmetic, or direct memory access. The JVM decides how references and objects are physically represented. The useful programming-level fact is that a reference can identify an object, or be null.\ \ Aliasing is the key consequence. If two variables contain references to the same mutable object, there are two aliases for one piece of state. That is why a mutation through one variable can be observed through the other. Bugs involving unexpected shared state are often aliasing bugs rather than “copying” bugs.\ \ Identity and equality should also be kept separate. `==` on references asks whether the references identify the same object. `equals` is a method whose meaning is determined by the class. A well-designed value type generally overrides it to compare logical state and implements a compatible `hashCode`.\ \ Try making two `String` objects with identical text, compare them using `==` and `equals`, then assign one reference to another and mutate a custom mutable object through one alias. These experiments build the mental model needed later for pass-by-value, collections, and object-oriented design."
 },
 {
 title: "Runnable example",
 content: "```java\nclass Point { int x, y; }\n\nPoint p1 = new Point();\np1.x = 5;\nPoint p2 = p1; // copies the REFERENCE, not the object\np2.x = 10;\nSystem.out.println(p1.x); // prints 10 - p1 and p2 point to the same object!\n\nString a = new String(\"hi\");\nString b = new String(\"hi\");\nSystem.out.println(a == b); // false - two different objects\nSystem.out.println(a.equals(b)); // true - same content\n```"
 },
 {
 title: "Key takeaways",
 content: "- A reference variable stores a pointer to a heap object, not the object itself - Assigning one reference to another copies the pointer, so both variables share the same object - == compares identity (same object); .equals() compares content - A null reference points to nothing — using it throws NullPointerException"
 },
 ],
 },
 {
 title: "Type casting",
 slug: "type-casting",
 description: "Casting means treating a value as a different type — but the mechanics are quite different depending on whether you're casting a primitive or an object.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "For primitives, casting converts the actual numeric value from one representation to another. `(int) 3.99` produces `3` — it truncates the decimal, it does not round. Casting a larger type down to a smaller one, like `long` to `int`, can silently lose information if the value doesn't fit — this is a real bug source when working with very large numbers, because there's no automatic error; the value just quietly wraps around to something unexpected. For object references, casting works completely differently: it doesn't convert any data at all. It's really an assertion — you're telling the compiler 'trust me, I know this object is actually of this more specific type.' `Object o = \"hello\"; String s = (String) o;` works because `o` genuinely does refer to a String underneath. But if the object isn't actually compatible with the type you're casting to, the JVM throws a `ClassCastException` at runtime — the compiler can't always catch this in advance, because the real type of an object is only fully known while the program is running. The safe pattern before doing a risky downcast is to check first with `instanceof`. Modern Java (16+) even lets you combine the check and the cast in one step with pattern-matching `instanceof`, which both tests the type and gives you a ready-to-use variable of that type if the check passes — no separate explicit cast needed afterward.\ \ Primitive casting and reference casting should never be mentally merged into one operation. A primitive cast asks Java to convert a value from one primitive type to another. A reference cast asks the runtime to verify that an existing object is compatible with a requested reference type; it does not transform the object into another class.\ \ Narrowing numeric conversion can produce surprising results. For floating point to integer conversion, the fractional part is discarded according to Java's conversion rules. For integral narrowing, only the target type's representable bits/value range remain, which can produce a result very different from the original number. The conversion itself does not validate that the original value was “reasonable.”\ \ Reference downcasts are different because the runtime object has an actual class identity. `Object value = Integer.valueOf(5); String s = (String) value;` cannot succeed because the object is an Integer. `instanceof` can test compatibility before a cast, and pattern matching can combine the test with a narrowed variable.\ \ A useful exercise is to create one object through a superclass reference and several unrelated objects through `Object` references. Predict which casts compile, which are rejected by the compiler, and which compile but fail with `ClassCastException` at runtime."
 },
 {
 title: "Runnable example",
 content: "```java\n// Primitive casting\ndouble price = 9.99;\nint whole = (int) price; // 9 - truncates, doesn't round\n\n// Reference casting\nObject o = \"hello\";\nif (o instanceof String s) { // pattern-matching instanceof (Java 16+)\n System.out.println(s.length()); // 's' is already a String here, no separate cast needed\n}\n\nObject number = Integer.valueOf(5);\n// String bad = (String) number; // compiles fine, but THROWS ClassCastException at runtime\n```"
 },
 {
 title: "Key takeaways",
 content: "- Primitive casts convert the value's numeric representation and can lose data (truncation, overflow) - Object casts don't convert data — they assert a runtime type, checked when the code actually runs - An invalid object cast throws ClassCastException at runtime, not a compile error - instanceof (especially pattern-matching instanceof) is the safe way to check before casting"
 },
 ],
 },
 {
 title: "Widening vs narrowing conversion",
 slug: "widening-vs-narrowing-conversion",
 description: "Java automatically converts between compatible types in some cases (widening) but requires you to explicitly ask for it in others (narrowing) — understanding why clarifies a lot of confusing compiler errors.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Widening conversion moves a value into a type that can hold a larger range of values — for example `byte -> int -> long -> double`. Because a larger type can always represent everything the smaller type could, Java performs this conversion automatically, with no cast required. (One caveat: converting a very large `long` or `int` to `float`/`double` can lose some precision for the exact digits, even though the overall magnitude fits — floating-point types trade exactness for range.) Narrowing conversion is the reverse — moving a value into a type with a smaller range, like `double -> int` or `int -> byte`. Since this can genuinely lose information (a decimal gets truncated, or a large number can overflow and wrap into something unexpected), Java refuses to do this automatically. You must write an explicit cast to acknowledge you understand the risk. Here's a nuance that confuses a lot of learners: `byte smallNum = 100;` compiles just fine even though `100` is technically an `int` literal — because the compiler can look at that specific constant and verify at compile time that it safely fits inside a `byte`. But if you write `int x = 100; byte smallNum = x;`, that fails to compile without an explicit cast — even though `x` happens to hold the exact same value — because the compiler only tracks that `x` is declared as an `int`, not what specific value it currently holds. This connects to something you'll notice constantly in arithmetic: when you do math with `byte`, `short`, or `char` values, Java automatically promotes them to `int` first before performing the operation. That's why `byte a = 5, b = 10; byte c = a + b;` fails to compile — `a + b` actually produces an `int`, and assigning an `int` back into a `byte` variable is a narrowing conversion that needs an explicit cast.\ \ The phrase “widening is safe” needs one important qualification: a wider integer type can represent every value of a smaller integer type, but floating-point types do not necessarily preserve every integer exactly. A `long` can be widened to `double` without an overflow of magnitude, yet some low-order integer bits may no longer be represented exactly.\ \ Constant expressions receive special treatment because the compiler can prove their value. `byte b = 100;` is accepted because the constant expression is representable as a byte. A normal `int` variable is different: `int x = 100; byte b = x;` is rejected because the variable's declared type does not guarantee that every possible int value fits.\ \ Binary numeric promotion explains many apparently strange arithmetic errors. Smaller integral operands are promoted before arithmetic, so the result of `byte + byte` is an int. This protects ordinary arithmetic from repeatedly overflowing tiny types but means an explicit conversion is needed when storing the result back into a smaller type.\ \ Try values close to the byte boundary, then use a large long such as `9_007_199_254_740_993L` and convert it to double. Comparing the original and converted values demonstrates the difference between range and precision."
 },
 {
 title: "Runnable example",
 content: "```java\nint i = 100;\nlong l = i; // widening - automatic, always safe\ndouble d = l; // widening - automatic\n\ndouble price = 9.99;\nint whole = (int) price; // narrowing - explicit cast required, loses .99\n\nbyte fitsAtCompileTime = 100; // OK - compiler verifies 100 fits in a byte\n\nbyte b1 = 5, b2 = 10;\n// byte sum = b1 + b2; // COMPILE ERROR - b1+b2 is an int\nbyte sum = (byte) (b1 + b2); // fixed with an explicit cast\n```"
 },
 {
 title: "Key takeaways",
 content: "- Widening (small -> large type) happens automatically because no data can be lost - Narrowing (large -> small type) always requires an explicit cast, since data can be lost - Constant expressions that clearly fit get special-cased implicit narrowing by the compiler - Arithmetic on byte/short/char automatically promotes the result to int"
 },
 ],
 },
 {
 title: "Literals",
 slug: "literals",
 description: "A literal is a fixed value written directly into your code — and Java offers more flexible ways to write numbers and text than most learners initially realize.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Integer literals can be written in several bases: decimal is the default (`42`), hexadecimal starts with `0x` (`0x2A`), octal starts with a leading zero (`052`), and binary starts with `0b` (`0b101010`, added in Java 7). If a literal needs to be a `long`, you must append an `L` (uppercase is preferred over lowercase `l`, which looks too much like the digit `1`). Since Java 7, you can also insert underscores anywhere in the middle of a numeric literal purely for human readability — `1_000_000` is exactly the same value as `1000000`, just easier to read at a glance. Decimal literals default to `double`; if you specifically want a `float`, you need an `f` or `F` suffix (`2.5f`). Scientific notation works too: `1.5e3` means 1.5 × 10³. Character literals use single quotes and support escape sequences for special characters — `'\\n'` for newline, `'\\t'` for tab, and `'\\u0041'` for a specific Unicode character by its code point. String literals use double quotes, and one modern feature worth knowing is the text block, introduced in Java 15, using triple double-quotes (`\"\"\"`). Text blocks let you write multi-line strings — like embedded JSON, SQL, or HTML — without needing to escape every quote and manually insert `\\n` at every line break, which makes embedded structured text dramatically more readable.\ \ Literal syntax is not merely cosmetic. The literal's type participates in overload resolution, arithmetic, assignment compatibility, and constant expressions. For example, `1` is an int literal, `1L` is a long literal, and `1.0` is a double literal. That means changing a suffix can change which overloaded method is selected.\ \ Integer literals also have an interesting boundary case: decimal literals can represent the positive value `2147483648` in the special context of the unary minus, allowing `-2147483648` to be represented as an int even though the positive value is outside the int range. Understanding this avoids confusion when exploring minimum integer values.\ \ Underscores improve readability but follow placement rules. They cannot be placed arbitrarily around decimal points, suffixes, or the beginning/end of a numeric literal. Text blocks also have their own indentation and newline processing rules, so they should not be treated as identical to manually concatenating quoted strings.\ \ Experiment by passing `1`, `1L`, `1.0`, and `1.0f` to overloaded methods. Then inspect text-block indentation and the exact resulting string. This demonstrates that literal syntax affects program semantics."
 },
 {
 title: "Runnable example",
 content: "```java\nint hex = 0x1A;\nint oct = 012;\nint bin = 0b1010;\nlong big = 10_000_000_000L; // underscores for readability, L suffix required\nfloat f = 2.5f;\ndouble sci = 1.5e3; // 1500.0\nchar unicodeChar = '\\u0041'; // 'A'\n\nString json = \"\"\"\n {\n \"name\": \"Java\"\n }\n \"\"\";\n```"
 },
 {
 title: "Key takeaways",
 content: "- Integer literals can be written in decimal, hex (0x), octal (leading 0), or binary (0b) - Underscores can be inserted in numeric literals purely for readability - float literals need an 'f' suffix; decimal literals default to double - Text blocks (Java 15+) make multi-line strings like JSON/SQL much easier to write and read"
 },
 ],
 },
 {
 title: "Operators",
 slug: "operators",
 description: "Java's operators cover arithmetic, comparisons, logic, and bit manipulation — and a few of them behave in ways that surprise people coming from other languages.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "The main groups are: arithmetic (`+ - * / %`), relational/comparison (`== != < > <= >=`), logical (`&& || !`), bitwise (`& | ^ ~ << >> >>>`), assignment (`= += -=` and similar shorthand), and the ternary operator (`condition ? valueIfTrue : valueIfFalse`). A few behaviors are worth memorizing early because they cause real bugs. First, dividing two integers truncates the result instead of rounding — `7 / 2` gives `3`, not `3.5`. To get a decimal answer, at least one operand needs to be a `float` or `double`. Second, the modulo operator (`%`) on negative numbers in Java follows the sign of the number being divided (the dividend) — so `-7 % 2` is `-1`, which surprises people expecting a purely positive remainder like in some other languages. Another crucial distinction: `&&` and `||` are 'short-circuiting' — if the left side of `&&` is already false, Java doesn't even bother evaluating the right side, since the overall result is already determined. This isn't just an optimization; it's a safety feature you'll rely on constantly, like in `if (obj != null && obj.isValid())` — the right side only runs if `obj` is confirmed non-null, avoiding a crash. The single-character versions `&` and `|`, when used on booleans, always evaluate both sides regardless, so they don't offer this protection. Finally, the two right-shift operators differ on negative numbers: `>>` preserves the sign bit (arithmetic shift), while `>>>` always fills with zeros (logical shift) — they produce identical results for positive numbers but diverge for negative ones.\ \ Operators become easier once you distinguish value computation from evaluation order. Precedence determines how an expression is grouped syntactically, while short-circuit operators determine whether part of the expression is evaluated at all. These are different ideas.\ \ For example, `a != null && a.isValid()` relies on left-to-right evaluation and short-circuiting. If the first operand is false, the second operand is not evaluated. The bitwise `&` operator used with booleans does not have that short-circuit behavior. This difference can affect correctness, not merely performance.\ \ Integer division and remainder follow Java's integer arithmetic rules. Division truncates toward zero, and the remainder has a sign related to the dividend. Shift operators are also type-sensitive: for an int, only the low five bits of the shift distance are used; for a long, the low six bits are used. This surprises developers who expect a shift by 32 on an int to behave like a shift by 32.\ \ Try expressions involving negative numbers, large shift distances, and methods with side effects on the right side of `&&` and `&`. Observe which calls happen. These experiments make operator semantics concrete."
 },
 {
 title: "Runnable example",
 content: "```java\nSystem.out.println(7 / 2); // 3 - integer division truncates\nSystem.out.println(7.0 / 2); // 3.5 - one operand is a double\nSystem.out.println(-7 % 2); // -1 - follows the sign of the dividend\n\nString s = null;\nif (s != null && s.length() > 0) {\n // safe! short-circuiting means s.length() never runs if s is null\n}\n\nint negative = -8;\nSystem.out.println(negative >> 1); // -4 - sign-preserving shift\nSystem.out.println(negative >>> 1); // large positive number - zero-fill shift\n```"
 },
 {
 title: "Key takeaways",
 content: "- Integer division truncates toward zero; use a double/float operand for decimal results - % follows the sign of the dividend, not the divisor - &&/|| short-circuit and skip evaluating the right side when the result is already known - >> preserves the sign bit; >>> always fills with zeros"
 },
 {
 title: "Practice",
 content: "Predict the output of `System.out.println(5 % -3);` before running it, then check whether your prediction matches Java's actual behavior."
 },
 ],
 },
 {
 title: "Operator precedence",
 slug: "operator-precedence",
 description: "When an expression mixes multiple operators, Java follows a fixed order for which one runs first — but the practical lesson is knowing when to stop relying on memory and just add parentheses.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Java evaluates complex expressions using a strict precedence table: things like `++`/`--` and method calls happen first, then unary operators (like unary minus), then multiplication/division/modulo, then addition/subtraction, then shifts, then comparisons, then bitwise operators, then logical operators, then the ternary operator, and finally assignment (which happens last and groups right-to-left). Rather than memorizing the entire table, it's more useful to know the handful of cases that actually cause real confusion. Addition and subtraction bind more tightly than the shift operators, so `1 + 2 << 3` is evaluated as `(1 + 2) << 3`, giving `24` — not `1 + (2 << 3)`, which some people expect. Bitwise `&`, `|`, and `^` sit at a lower precedence than comparison operators like `==`, which surprises people who assume `&` behaves 'just like `&&`' in terms of where it sits relative to comparisons. The practical, professional-level takeaway is this: precedence rules are well-defined and consistent, but relying on someone (including future-you) correctly remembering them while reading code is asking for trouble. Adding explicit parentheses costs absolutely nothing at runtime — the compiler handles it — but it makes intent immediately obvious to any reader. Experienced developers use parentheses defensively for anything beyond the simplest arithmetic, precisely because ambiguity in a shared codebase is a real liability.\ \ Precedence answers “how is this expression grouped?” It does not mean the compiler is executing operators strictly from left to right. Associativity then determines grouping when operators of the same precedence occur together. Parentheses override the default grouping and communicate intent directly.\ \ One useful way to learn precedence is to compare a deliberately ambiguous expression with its parenthesized equivalent. For example, `1 + 2 << 3` groups the addition before the shift. Likewise, equality operators have a different precedence relationship to bitwise operators than logical operators do. The fact that an expression is legal does not make it a good expression to leave unexplained.\ \ Do not confuse precedence with short-circuit behavior. In `a && b || c`, precedence groups it as `(a && b) || c`, while evaluation still proceeds left-to-right with short-circuiting. Both grouping and evaluation rules matter.\ \ A practical exercise is to take five expressions from production code and add parentheses that make the intended grouping obvious. If the added parentheses reveal that the original expression was difficult to understand, that is useful feedback about readability."
 },
 {
 title: "Runnable example",
 content: "```java\nint result = 1 + 2 << 3; // evaluates as (1+2) << 3 = 24 - easy to misread!\nint clearer = (1 + 2) << 3; // same value, but the intent is obvious\n\nboolean x = true, y = false;\nboolean tricky = x == true & y == false; // works, but hard to read at a glance\nboolean clear = (x == true) & (y == false); // identical result, much clearer\n```"
 },
 {
 title: "Key takeaways",
 content: "- Rough order (highest to lowest): postfix/unary > multiplicative > additive > shift > relational > equality > bitwise > logical > ternary > assignment - Addition/subtraction bind tighter than shift operators, which is a common misread - Assignment groups right-to-left, enabling chained assignments like a = b = c = 5 - Use parentheses defensively — they cost nothing at runtime and remove all ambiguity for readers"
 },
 ],
 },
 {
 title: "Expressions and statements",
 slug: "expressions-and-statements",
 description: "Every line of Java code is either an expression (something that produces a value) or a statement (something that performs an action) — understanding the difference explains a lot of syntax rules.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "An expression is anything that evaluates to a value: `2 + 3`, `x++`, `isValid()`, and `a > b` are all expressions, because each one can be substituted with the value it produces. A statement is a complete, standalone instruction that performs an action — an `if` block, a `for` loop, a variable declaration, or an 'expression statement,' which is simply an expression used purely for its side effect and ended with a semicolon. Not every expression is allowed to become a standalone statement on its own. Java only permits specific kinds as expression statements: assignments (`x = 5;`), increment/decrement (`x++;`), method calls (`doWork();`), and object creation (`new Foo();`). This is why writing `x + 1;` alone as a line of code is a compile error — the compiler recognizes that this computes a value and then throws it away for no reason, and disallows that pattern structurally, whereas `x++;` is fine because incrementing has a meaningful side effect. This distinction directly explains why the ternary operator can be embedded inside an assignment (`int max = a > b ? a : b;`) but an `if` statement cannot be used the same way — the ternary is an expression that produces a value you can assign, while `if`/`else` is purely a control-flow statement that never produces a usable value of its own.\ \ The expression/statement distinction explains why Java syntax feels different from languages where almost everything can produce a value. An expression has a type and a value (or can complete abruptly), while statements organize execution. Java deliberately restricts which expressions can appear as expression statements so that meaningless discarded computations are not silently accepted.\ \ The distinction becomes more interesting with modern Java. A switch expression produces a value, while a traditional if statement controls execution. A method invocation is an expression because it has a return type, yet it can also be used as a statement when its result is intentionally ignored. An assignment is itself an expression and therefore has a value, which explains constructs such as `while ((line = reader.readLine()) != null)`.\ \ The rules also help explain why declarations and control-flow constructs cannot simply be nested anywhere an expression is expected. Learning to ask “does this construct produce a value?” is often more useful than memorizing isolated syntax restrictions."
 },
 {
 title: "Runnable example",
 content: "```java\n// Expressions - each one produces a value\nint sum = 2 + 3;\nboolean valid = isValid();\nint max = (a > b) ? a : b; // the ternary operator IS an expression\n\n// Statements - perform an action, don't themselves produce a usable value\nif (valid) { doSomething(); }\nfor (int i = 0; i < 10; i++) { }\nx++; // valid expression statement\n// x + 1; // COMPILE ERROR - a bare expression can't stand alone as a statement\n```"
 },
 {
 title: "Key takeaways",
 content: "- Expressions evaluate to a value; statements perform an action or control the flow - Only a specific set of expressions (assignment, ++/--, calls, object creation) can stand alone as statements - Because the ternary operator is an expression, it can be embedded in an assignment; if/else cannot"
 },
 ],
 },
 {
 title: "Input and output",
 slug: "input-and-output",
 description: "Java gives you a few layers for reading console input and writing console output — knowing which tool fits which situation will save you from a very common early bug.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Output is straightforward: `System.out` is a stream connected to your console, offering `print` (no newline), `println` (adds a newline), and `printf` (formatted output using placeholders like `%d` for integers, `%s` for strings, and `%.2f` for a decimal with two places). There's also `System.err`, a separate stream for error messages, kept distinct so error output can be redirected independently from regular output when running programs from a shell. For input, the most beginner-friendly tool is `java.util.Scanner`, which wraps a source (usually `System.in`, the keyboard) and provides convenient methods like `nextInt()`, `nextDouble()`, and `nextLine()` to read typed values directly, doing the parsing work for you. Here's the classic bug worth knowing before you hit it yourself: methods like `nextInt()` and `nextDouble()` read the number itself, but they leave the trailing newline character (from when the user pressed Enter) still sitting unread in the input. If you then call `nextLine()` expecting to read the *next* full line of text, it instead immediately returns an empty string — because it just consumed that leftover newline character. The standard fix is to insert an extra `scanner.nextLine();` call right after reading a number, purely to absorb that leftover newline before reading actual text input.\ \ Console I/O is built around streams. `System.in` is standard input, `System.out` is standard output, and `System.err` is standard error. They are streams rather than magical keyboard/printer APIs, which is why they can be redirected, wrapped, replaced in tests, or connected to other sources.\ \ `Scanner` is convenient because it combines tokenization and parsing. `BufferedReader` is more focused on reading characters/lines and is often preferable when you want predictable line-oriented behavior or higher throughput. Neither is universally “better”; the correct choice depends on whether convenience or control/performance matters.\ \ The newline issue with `nextInt()` and `nextLine()` is really a cursor-position issue. `nextInt()` consumes the integer token but does not consume the line separator that terminates the line. `nextLine()` then reads from the current cursor position up to the next line separator, which can result in an empty string.\ \ Try reading input with both Scanner and BufferedReader from the same sample input. Print the values returned by each operation and track what input remains. This makes the behavior much less mysterious."
 },
 {
 title: "Runnable example",
 content: "```java\nScanner sc = new Scanner(System.in);\n\nSystem.out.print(\"Enter age: \");\nint age = sc.nextInt();\nsc.nextLine(); // absorbs the leftover newline character - without this, the next line breaks!\n\nSystem.out.print(\"Enter name: \");\nString name = sc.nextLine(); // now correctly reads the actual name\n\nSystem.out.printf(\"%s is %d years old%n\", name, age);\n```"
 },
 {
 title: "Key takeaways",
 content: "- System.out/System.err handle output; System.in is the raw input stream, usually wrapped by Scanner - Scanner provides typed reading methods: nextInt(), nextDouble(), nextLine(), etc. - nextInt()/nextDouble() leave a trailing newline unread, which breaks a following nextLine() call - Fix by calling an extra sc.nextLine() to consume the leftover newline before reading text"
 },
 {
 title: "Common mistakes",
 content: "- Calling nextInt() followed immediately by nextLine() and being confused why the string comes back empty"
 },
 ],
 },
 {
 title: "Scanner",
 slug: "scanner",
 description: "Scanner is the go-to tool for reading input in beginner Java programs — it's convenient, but it's worth understanding how it works and when it's not the best choice.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Scanner can read from many different sources — the keyboard (`System.in`), a file, or even a plain String — which makes it flexible for learning and testing. Internally, it works by using regular-expression-based tokenizing: it scans forward through the input looking for the next 'token' (by default, tokens are separated by whitespace), checks that the token matches what you asked for (like a valid integer for `nextInt()`), and only then moves its internal position forward past it. If the next token doesn't match — say you call `nextInt()` but the user typed letters — Scanner throws an `InputMismatchException`. Because of this regex-based scanning under the hood, Scanner is noticeably slower than more low-level input tools like `BufferedReader`. For simple console programs and learning exercises this difference is completely irrelevant, but if you ever process very large input files or need maximum performance, a `BufferedReader` paired with manual parsing is the faster choice. A few practical habits worth building: use `hasNext()`, `hasNextInt()`, and similar methods to check whether more input is available (and of the right type) *before* trying to read it, which avoids exceptions entirely. Also, always close a `Scanner` that's reading from a file (ideally using try-with-resources) to release the file handle — but be careful not to close a `Scanner` wrapping `System.in`, since doing so closes standard input for the rest of your program too, which will break any later attempt to read more console input.\ \ Scanner's convenience comes from doing several jobs for you: locating tokens, matching them against patterns, converting them into requested types, and maintaining the current input position. Its delimiter pattern determines where tokens end. Changing the delimiter therefore changes what methods such as `next()` and `nextInt()` see as the next token.\ \ The `hasNextX()` methods are useful, but they do not make every input program automatically robust. Real applications often need validation, clear error messages, recovery from malformed input, and explicit handling of end-of-input. Catching `InputMismatchException` may be appropriate when invalid user input is expected; checking first may be clearer in other cases.\ \ Closing a Scanner closes its underlying resource. This is helpful for files but can be surprising with `System.in`, because standard input is shared process-wide. A good application decides who owns a resource before deciding who should close it.\ \ For a performance experiment, process a large generated input file with Scanner and with buffered line-based parsing. Measure both with a realistic workload rather than relying on a single tiny benchmark. The lesson is not “Scanner is bad”; it is that abstraction convenience has a cost profile."
 },
 {
 title: "Runnable example",
 content: "```java\nScanner sc = new Scanner(System.in);\nwhile (sc.hasNextInt()) {\n int n = sc.nextInt();\n System.out.println(\"Got: \" + n);\n}\n\n// Reading from a file - close it properly with try-with-resources\ntry (Scanner fileScanner = new Scanner(new File(\"data.txt\"))) {\n while (fileScanner.hasNextLine()) {\n process(fileScanner.nextLine());\n }\n}\n```"
 },
 {
 title: "Key takeaways",
 content: "- Scanner can read from the keyboard, files, or even plain strings - It tokenizes input using regex matching, which is convenient but slower than raw buffered reading - hasNext()/hasNextInt() let you safely check for more input before consuming it - Close file-based Scanners properly, but avoid closing one wrapping System.in"
 },
 ],
 },
 {
 title: "Comments and documentation comments",
 slug: "comments-and-documentation-comments",
 description: "Java has three comment styles, and one of them isn't just for humans — it's structured input that a tool can turn into real API documentation.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "The three styles are single-line comments (`// this explains one line`), multi-line comments (`/* this can span several lines */`), and documentation comments (`/** this is a Javadoc comment */`). That third style is special: when placed directly above a class, method, field, or constructor, a tool called Javadoc can parse it and automatically generate readable HTML documentation for your code. Javadoc comments support special tags that structure the documentation: `@param` describes a method parameter, `@return` describes what a method gives back, `@throws` documents an exception the method might throw, `@since` notes which version introduced this code, and `@deprecated` marks something as outdated (often alongside the separate `@Deprecated` annotation, which specifically triggers a compiler warning wherever the deprecated code is used). As a learner, the most important habit to build isn't memorizing every tag — it's developing judgment about *when* a comment adds value. A good comment explains *why* something is done a certain way, especially when the reasoning isn't obvious from the code itself. A comment that just restates what the code plainly already shows (`i++; // increment i`) adds noise rather than clarity. Public methods that other developers will call from outside your code deserve solid Javadoc; small private helper methods usually don't need much commenting at all if their names and logic are already clear.\ \ Comments are part of the source text, but different comment forms have different consumers. Ordinary comments are primarily for human readers and tools that preserve source. Javadoc comments have a structured relationship with API documentation generation. Modern Javadoc can also use links and inline code formatting to make documentation navigable.\ \ Good documentation describes contracts that a caller needs to know: what an argument means, what a return value represents, what exceptions indicate, thread-safety expectations, nullability assumptions, side effects, and important preconditions. These are things that may not be obvious from a method name.\ \ Comments become dangerous when they become stale. If a comment says “this method retries three times” while the code now retries five times, the comment is actively misleading. Prefer expressive names and tests for behavior, and use comments to capture intent or constraints that code alone cannot communicate.\ \ A useful exercise is to take one overly commented method and remove comments that merely narrate syntax. Then add documentation for the method's actual contract. The result is usually shorter but more valuable."
 },
 {
 title: "Runnable example",
 content: "```java\n/**\n * Calculates compound interest.\n *\n * @param principal the initial amount invested\n * @param rate annual interest rate as a decimal (e.g., 0.05 for 5%)\n * @param years number of years to compound\n * @return the final amount after compounding\n */\npublic double compoundInterest(double principal, double rate, int years) {\n return principal * Math.pow(1 + rate, years);\n}\n```"
 },
 {
 title: "Key takeaways",
 content: "- // for single-line, /* */ for multi-line, /** */ for Javadoc (tool-parsed documentation) - Javadoc tags include @param, @return, @throws, @since, and @deprecated - Good comments explain 'why', not restate what the code already makes obvious - Public APIs deserve solid documentation; simple internal helpers usually don't need much"
 },
 ],
 }
],
 },
 {
 title: "Object-Oriented Programming – The Heart of Java",
 slug: "oop-basics",
 description: "Classes, objects, constructors, methods, and OOP principles.",
 topics: [
 {
 title: "if, else if, and else",
 slug: "if-else-if-and-else",
 description: "An if/else-if/else chain runs its branches in order and stops at the first one that matches — a simple rule, but the order you write your conditions in actually matters a lot.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "Java checks the conditions in an if/else-if/else chain from top to bottom and executes the block belonging to the *first* condition that evaluates to true — every condition after that is skipped entirely, even if it would also have been true. This ordering behavior causes a genuinely common mistake when conditions overlap in range. Imagine grading scores: if you write `if (score >= 60) grade = \"Pass\"; else if (score >= 90) grade = \"Excellent\";`, a score of 95 will incorrectly get graded as just \"Pass\" — because 95 also satisfies `score >= 60`, and that's the first condition checked, so the \"Excellent\" branch never even gets evaluated. The fix is to always check the *most specific* (narrowest) condition first, then work down to the broadest. A second subtlety worth learning as a habit rather than memorizing as a rule: without curly braces, an `if` only controls the single statement immediately following it. If you later come back and add a second line to that block without adding braces, it silently falls *outside* the if — it will run every time, regardless of the condition, which is a bug that's genuinely easy to introduce during a quick edit. The professional habit is to always use braces `{}` around if/else bodies, even for a single statement, specifically so future edits are safe by default. One more thing worth knowing: Java's `if` condition must be a genuine `boolean` expression. Unlike some C-family languages where a nonzero integer is treated as 'true,' Java simply won't compile `if (someInt)` — this removes an entire category of bugs from the language by design.\ \ An if/else chain is not a collection of independent conditions. It is an ordered decision procedure. Once one condition succeeds, the remaining branches are skipped. That means ordering is part of the program's logic, not just formatting.\ \ For range-based decisions, write the ranges so that they are mutually understandable. Checking the narrowest or highest-priority range first is common, but sometimes a decision table is clearer. For complex business rules, extracting named predicates or using a dedicated strategy can be easier to maintain than a long chain.\ \ Braces protect against a class of maintenance errors. Without braces, only one statement belongs to the branch. A later edit can accidentally make a new statement unconditional. This is why brace usage is a practical safety convention rather than merely a style preference.\ \ Java's strict boolean conditions are another deliberate language choice. `if (count)` is rejected because integers are not implicitly converted to booleans. The programmer must state the intended condition, such as `count != 0` or `count > 0`."
 },
 {
 title: "Runnable example",
 content: "```java\nint score = 95;\n\n// BUG: order matters - broad conditions checked first swallow the specific ones\nif (score >= 60) {\n System.out.println(\"Pass\"); // wrongly matches 95 first!\n} else if (score >= 90) {\n System.out.println(\"Excellent\"); // unreachable for any score 90+\n}\n\n// Correct: most specific condition first\nif (score >= 90) {\n System.out.println(\"Excellent\");\n} else if (score >= 60) {\n System.out.println(\"Pass\");\n} else {\n System.out.println(\"Fail\");\n}\n```"
 },
 {
 title: "Key takeaways",
 content: "- The chain runs top-to-bottom; only the first true condition's block executes - Overlapping range checks must go from most specific to least specific, or broad ones swallow narrow ones - Always use braces {} around if/else bodies, even single statements, to keep future edits safe - Java requires a real boolean condition — you can't use an int as a stand-in for true/false"
 },
 {
 title: "Practice",
 content: "Rewrite this buggy chain so all three grades are reachable: `if (score >= 50) print('Pass'); else if (score >= 80) print('Merit'); else if (score >= 95) print('Distinction');`"
 },
 ],
 },
 {
 title: "switch",
 slug: "switch",
 description: "The switch statement has changed a lot in modern Java — the old fall-through behavior that caused so many bugs is now optional, and switch can do much more than it used to.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "The classic `switch` (the only form that existed before Java 14) works by jumping straight to the matching `case` label and then continuing to execute every case *after* it too, unless you explicitly write `break`. This 'fall-through' behavior is one of the most notorious sources of subtle bugs in C-family languages — forgetting a single `break` silently changes your program's behavior. It's occasionally used intentionally, to let several case labels share the exact same code, but that's the exception rather than the rule. Java 14 introduced a much better alternative: the switch *expression*, written with an arrow (`case X -> ...`). With this form, each case is completely isolated — no fall-through at all, by default — and the entire construct can directly produce a value you assign to a variable or return. If a particular case needs multiple statements to compute its result, you use the `yield` keyword to specify what value that block produces. You can also combine several case labels with commas in one line: `case MONDAY, TUESDAY -> ...`. There's a genuine safety benefit here too: when you switch over an `enum`, the compiler can verify you've handled every possible value (this is called exhaustiveness checking) — if you later add a new value to that enum and forget to handle it in your switch expression, the compiler will flag it, catching a bug the old switch statement never could. Java 21 pushed this even further with pattern matching for switch — you can switch based on an object's actual type, and even pull apart ('deconstruct') a record's fields directly in the case label, optionally combined with a `when` clause for extra conditions. This turns switch into a genuinely powerful tool for matching against different kinds of data, much closer to what you'd find in modern functional languages.\ \ Modern switch is best understood as two related ideas: a statement that controls execution and an expression that produces a value. The arrow form removes accidental fall-through and makes the value-producing nature explicit. A block inside a switch expression uses `yield` because `return` would return from the enclosing method instead.\ \ Exhaustiveness is particularly valuable with enums and sealed hierarchies. Instead of assuming “there will probably never be another case,” the compiler can require the expression to account for all permitted possibilities. That turns an incomplete decision into something the compiler can help detect.\ \ Pattern matching adds another dimension: the selector can be examined by type and bound to a variable of the matched type. Record patterns can go further by extracting component values. Guard conditions can then refine the match. The result is more expressive than the old integer/string-like switch examples.\ \ When teaching switch, compare the same business rule in old fall-through syntax and modern arrow syntax. Then add a new enum constant and see how an exhaustive switch expression reacts. This demonstrates why modern switch is not merely shorter syntax."
 },
 {
 title: "Runnable example",
 content: "```java\n// Old style - fall-through risk if you forget 'break'\nswitch (day) {\n case MONDAY:\n case TUESDAY:\n System.out.println(\"Early week\");\n break; // required to stop here\n default:\n System.out.println(\"Other\");\n}\n\n// Modern switch expression (Java 14+) - no fall-through, produces a value\nString result = switch (day) {\n case MONDAY, TUESDAY -> \"Early week\";\n case WEDNESDAY -> {\n String s = \"Midweek\";\n yield s; // 'yield' hands back the value from a multi-line block\n }\n default -> \"Other\";\n};\n\n// Pattern matching switch (Java 21+)\nString describe(Object obj) {\n return switch (obj) {\n case Integer i when i > 0 -> \"positive int\";\n case Integer i -> \"non-positive int\";\n case String s -> \"string of length \" + s.length();\n default -> \"unknown\";\n };\n}\n```"
 },
 {
 title: "Key takeaways",
 content: "- Classic switch statement falls through to later cases unless you break - Switch expressions (Java 14+) use -> syntax, never fall through, and can directly produce a value - yield returns a value from a multi-statement block inside a switch expression - Switching over an enum is compiler-checked for exhaustiveness, catching missed cases early - Java 21 pattern matching lets switch match against types and deconstruct records, with optional 'when' guards"
 },
 ],
 },
 {
 title: "for loop",
 slug: "for-loop",
 description: "Java has two forms of the for loop — the classic counter-based version and the simpler for-each version — and each has situations where it's clearly the better choice.",
 estimatedMinutes: 15,
 sections: [
 {
 title: "Concept and mental model",
 content: "The classic `for` loop follows the pattern `for (initialization; condition; update)`, giving you full control over exactly how the loop variable starts, when it stops, and how it changes each time. Any of the three parts can technically be left empty — `for (;;)` is a perfectly valid way to write an infinite loop — and you can even initialize or update multiple variables at once using commas. The enhanced for loop, often called 'for-each,' was added to make iterating over collections and arrays simpler: `for (String s : list)` reads each item in turn without you having to manage an index variable yourself. Under the hood, this is really just convenient shorthand — for a collection, it automatically calls the collection's iterator and repeatedly asks it for the next item until there isn't one left. The important limitation to learn early: a for-each loop doesn't give you direct access to the index of the current item, and — more importantly — you cannot safely add or remove items from the collection you're looping over while using for-each. Doing so throws a `ConcurrentModificationException`, because the loop detects that the collection changed unexpectedly while it was mid-iteration. If you genuinely need to remove items while looping, use the collection's `Iterator` directly and call its own `remove()` method, or simply use the convenient `removeIf()` method that many collections provide. As a performance note worth knowing: for-each is efficient for every common collection type, including `LinkedList`. But if you instead write a classic indexed loop using `get(i)` on a `LinkedList`, each call has to walk through the list from one end to reach that index, which makes the whole loop far slower overall than it would be for an `ArrayList`. This is a good practical reason to reach for for-each by default unless you specifically need the index.\ \ A classic for loop combines initialization, continuation, and update in one header. That makes it particularly suitable when the loop has an explicit counter or index. A for-each loop instead expresses the intent “process each element,” which is often easier to read and less error-prone.\ \ The enhanced for loop is translated differently depending on the source. Arrays can be traversed using array indexing semantics, while Iterable values are traversed through an iterator. This distinction matters when reasoning about removal, iterator state, and performance characteristics.\ \ `ConcurrentModificationException` is also commonly misunderstood. It does not mean that another thread necessarily modified the collection. Many standard collection iterators are fail-fast and detect structural modification that violates the iterator's expected state. The behavior is a debugging aid, not a general concurrency guarantee.\ \ For performance, choose the traversal mechanism based on the data structure. An indexed loop over an ArrayList can be reasonable when an index is needed. An indexed loop over LinkedList can repeatedly pay traversal cost. For-each avoids coupling the algorithm to random-access assumptions.\ \ Try writing the same operation three ways: indexed ArrayList traversal, for-each traversal, and explicit Iterator traversal. Then add removal behavior. Seeing which version naturally expresses the operation is a better lesson than memorizing that one loop is always “faster.”"
 },
 {
 title: "Runnable example",
 content: "```java\n// Classic for loop - full control over the loop variable\nfor (int i = 0, j = 10; i < j; i++, j--) {\n System.out.println(i + \",\" + j);\n}\n\n// Enhanced for-each - simple iteration\nList<String> names = new ArrayList<>(List.of(\"Amy\", \"Bo\", \"Cy\"));\nfor (String name : names) {\n System.out.println(name);\n}\n\n// WRONG - modifying the list during for-each throws ConcurrentModificationException\n// for (String name : names) { if (name.equals(\"Bo\")) names.remove(name); }\n\n// CORRECT - safe removal during iteration\nnames.removeIf(n -> n.equals(\"Bo\"));\n```"
 },
 {
 title: "Key takeaways",
 content: "- Classic for(init;cond;update) gives full control; every part is technically optional - For-each is simpler shorthand for iterating collections/arrays, using the collection's iterator internally - Adding/removing items from a collection during for-each throws ConcurrentModificationException - Use Iterator.remove() or Collection.removeIf() to safely modify a collection while iterating - For-each stays efficient even on LinkedList; indexed get(i) loops on LinkedList are much slower"
 },
 ],
 }
],
 },
 ],
 },

 // -------------------- INTERMEDIATE --------------------
 {
 name: "Intermediate",
 slug: "intermediate",
 description: "Collections, exceptions, I/O, lambda expressions, and streams.",
 level: StudyLevel.INTERMEDIATE,
 modules: [
 {
 title: "Java Collections Framework",
 slug: "collections",
 description: "List, Set, Map, Queue – implementations and use cases.",
 topics: [],
 },
 {
 title: "Exception Handling – Graceful Error Management",
 slug: "exceptions",
 description: "Checked and unchecked exceptions, try‑catch‑finally, custom exceptions.",
 topics: [],
 },
 {
 title: "Lambda Expressions and Streams – Functional Programming",
 slug: "lambda-streams",
 description: "Functional programming in Java 8+.",
 topics: [],
 },
 {
 title: "I/O and NIO – Reading and Writing Data",
 slug: "io-nio",
 description: "File I/O, byte/character streams, and NIO channels.",
 topics: [],
 },
 ],
 },

 // -------------------- ADVANCED --------------------
 {
 name: "Advanced",
 slug: "advanced",
 description: "Concurrency, generics, reflection, annotations, memory management, design patterns, and new Java features.",
 level: StudyLevel.ADVANCED,
 modules: [
 {
 title: "Concurrency and Multithreading",
 slug: "concurrency",
 description: "Threads, synchronization, and concurrent utilities.",
 topics: [],
 },
 {
 title: "Generics and Type System",
 slug: "generics",
 description: "Type parameters, wildcards, type erasure.",
 topics: [],
 },
 {
 title: "Reflection and Annotations – Metaprogramming",
 slug: "reflection-annotations",
 description: "Introspection, dynamic invocation, and metadata.",
 topics: [],
 },
 // --- CORRECTED MODULE: Memory Management and Garbage Collection ---
 {
 title: "Memory Management and Garbage Collection",
 slug: "memory-gc",
 description: "Heap, stack, garbage collectors, and performance tuning.",
 topics: [],
 },
 {
 title: "Java Memory Model (JMM)",
 slug: "jmm",
 description: "Happens‑before relationships, visibility, and ordering.",
 topics: [],
 },
 {
 title: "Records, Sealed Classes, and Pattern Matching (Java 14‑21)",
 slug: "new-features",
 description: "Modern Java features for data modelling and pattern matching.",
 topics: [],
 },
 {
 title: "Java Modules (JPMS) – Modularity",
 slug: "modules",
 description: "Project Jigsaw, module descriptors, and encapsulation.",
 topics: [],
 },
 ],
 },

 // -------------------- INTERVIEW PREP --------------------
 {
 name: "Interview Prep",
 slug: "interview-prep",
 description: "Common Core Java interview questions, tricky topics, and coding problems.",
 level: StudyLevel.INTERVIEW_PREP,
 modules: [
 {
 title: "Core Concepts",
 slug: "core-concepts-interview",
 description: "OOP, equals/hashCode, immutability, and exceptions.",
 topics: [],
 },
 {
 title: "Collections and Concurrency",
 slug: "collections-concurrency-interview",
 description: "Common questions on collections and thread safety.",
 topics: [],
 },
 {
 title: "Design Patterns and Best Practices",
 slug: "design-patterns-interview",
 description: "Singleton, Factory, Builder, Observer, and more.",
 topics: [],
 },
 ],
 },
 ],
 };

 await ensureCategory(javaCategory);
 console.log("✅ Java (Core) category seeded (deep learning topics 001-020)");
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