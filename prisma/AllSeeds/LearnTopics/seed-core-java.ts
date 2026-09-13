import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{
    title: string;
    content: string;
  }>;
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

const modules: ModuleSeed[] = [
  {
    title: "Java Basics",
    slug: "java-basics",
    description: "Core Java language foundations: setup, syntax, types, variables, arrays, methods, packages, and the JVM model.",
    topics: [
      {
        title: "Java overview and use cases",
        slug: "java-overview-and-use-cases",
        description: "Java is a statically-typed, object-oriented language that runs on the JVM instead of directly on hardware — and that one design choice explains almost everything else about it. When Java was designed, its core...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java is a statically-typed, object-oriented language that runs on the JVM instead of directly on hardware — and that one design choice explains almost everything else about it. When Java was designed, its core promise was 'write once, run anywhere.' Instead of compiling your code straight into machine instructions for one specific CPU/OS combination (like C does), Java compiles to an intermediate form called bytecode, which is then executed by the Java Virtual Machine (JVM). As long as a JVM exists for a platform, your compiled program runs there unchanged.

This architecture gives Java four practical strengths that explain where you'll see it used today:

1. Platform independence — the same .class file runs on Windows, Linux, macOS, or inside a Docker container, because the JVM handles the platform-specific translation.

2. Automatic memory management — Java's garbage collector reclaims memory for objects you're no longer using, so you don't manually allocate/free memory like in C/C++. This eliminates a huge class of bugs (dangling pointers, double-frees, memory leaks from forgotten frees).

3. A mature ecosystem — decades of libraries and frameworks (Spring, Hibernate, Kafka clients) exist specifically because Java has been an enterprise standard for so long.

4. Strong static typing — the compiler catches type errors before your code ever runs, which matters enormously once a codebase grows past a few thousand lines and multiple people are editing it. In practice, you'll find Java powering large enterprise backends (banking, insurance, logistics systems), Android apps, and big-data infrastructure — Hadoop, Kafka, and Spark are all JVM-based projects. The JVM itself has also become a platform other languages build on: Kotlin and Scala both compile to the same bytecode and can freely call Java libraries.`
          },
          {
            title: "How it works",
            content: `Java is best understood as a language plus a runtime model. You write source code in Java syntax, the compiler checks that source against Java's type system and produces bytecode, and the JVM loads and executes that bytecode. The important point is that the JVM provides the platform-specific execution layer, so application code does not need a separate native binary for every operating system. This is the practical meaning behind Java's portability model.

Java's design also shifts several responsibilities from the application developer to the runtime. Memory for objects is managed by the JVM's garbage collector, while the compiler and runtime enforce type rules that help catch many mistakes early. At the same time, Java remains a general-purpose language: the same core language is used for command-line programs, backend services, desktop tools, and large frameworks.

When learning Java, do not treat 'platform independent' as meaning 'there is no platform dependency at all.' The JVM, operating system, native libraries, file paths, environment variables, and external services can still differ. The useful mental model is that Java standardizes the bytecode and language level while the runtime hides much of the underlying machine-specific work.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// A minimal Java program — this alone shows the platform-independence idea:
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
// Compile once:       javac HelloWorld.java        -> produces HelloWorld.class (bytecode)
// Run anywhere:       java HelloWorld              -> runs on any machine with a JVM installed
\`\`\``
          },
          {
            title: "Practice",
            content: `Try to explain in your own words why a compiled .class file can run unmodified on both Windows and Linux, when a compiled C program generally cannot.`
          }
        ]
      },
      {
        title: "Installing Java and checking the version",
        slug: "installing-java-and-checking-the-version",
        description: "Before writing any Java code, you need a JDK installed and your system configured so the `java` and `javac` commands are available from any terminal. A JDK (Java Development Kit) is what you install to write and run...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Before writing any Java code, you need a JDK installed and your system configured so the \`java\` and \`javac\` commands are available from any terminal. A JDK (Java Development Kit) is what you install to write and run Java code — it bundles the compiler, the runtime, and development tools together. There are several free distributions built from the same open-source OpenJDK project: Eclipse Temurin (formerly AdoptOpenJDK), Amazon Corretto, and Oracle's own OpenJDK builds are all common choices, and functionally they behave the same for everyday development.

After installing, two pieces of setup matter: setting the JAVA_HOME environment variable to point at your JDK's installation folder, and adding $JAVA_HOME/bin to your system PATH so the \`java\` and \`javac\` executables can be found from any terminal without typing the full path. Once that's done, you verify everything worked with two commands: \`java -version\` shows which runtime you have, and \`javac -version\` shows which compiler you have. These can technically report different versions if you have multiple JDKs installed and your PATH happens to resolve to different ones for the runtime vs the compiler — a real (if uncommon) source of confusing bugs, so it's worth checking both when something feels off.

One more thing worth knowing as you learn: since Java 9, a new version is released every six months, but only some versions are 'LTS' (Long-Term Support) — 8, 11, 17, and 21 are the LTS releases that companies actually build production systems on, since they get years of security patches. As a learner, installing the latest LTS version is the safe default choice.`
          },
          {
            title: "How it works",
            content: `The JDK is the correct starting point for development because it contains the tools required to compile Java source code as well as the runtime needed to execute programs. The \`java\` command launches a Java application, while \`javac\` compiles source files. Keeping these roles distinct helps when diagnosing setup problems: a working runtime does not necessarily mean the compiler is available.

Environment configuration matters because command-line tools are normally discovered through \`PATH\`. \`JAVA_HOME\` is commonly used by development tools and build systems to identify the JDK installation. If the terminal reports that a command is not recognized, the first checks should be the installed JDK location, the environment variables, and whether the terminal was restarted after a configuration change.

Version checking is more than a one-time installation test. Java projects often depend on a particular language level and runtime behavior, so knowing the exact JDK version is important when reproducing builds, investigating compiler errors, or matching a production environment.`
          },
          {
            title: "Example",
            content: `\`\`\`java
# Terminal commands to verify your installation
java -version
javac -version
# Check where JAVA_HOME points
echo $JAVA_HOME     # macOS/Linux
echo %JAVA_HOME%    # Windows
\`\`\``
          },
        ]
      },
      {
        title: "Java source code compilation and execution",
        slug: "java-source-code-compilation-and-execution",
        description: "Understanding what happens between writing a .java file and seeing output on screen is the foundation for understanding almost every other Java concept. There are three distinct stages between your source code and a...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Understanding what happens between writing a .java file and seeing output on screen is the foundation for understanding almost every other Java concept. There are three distinct stages between your source code and a running program, and each one matters for different reasons. Stage 1 — Compilation.

Running \`javac HelloWorld.java\` invokes the Java compiler. It checks your code for syntax errors and type errors, then — if everything is valid — produces a \`.class\` file. This file doesn't contain native machine code; it contains bytecode, a platform-neutral set of instructions designed for the JVM, not for any specific CPU.

Stage 2 — Class loading. When you run \`java HelloWorld\`, the JVM's class loader finds the \`.class\` file and loads it into memory. Before executing anything, it runs the bytecode through a verifier that checks the code is safe — no illegal type casts, no corrupted stack operations, nothing that could crash the JVM or violate memory safety.

This verification step is part of why Java is considered a 'safe' language to run untrusted code in, historically (think: old Java applets). Stage 3 — Execution. The JVM's execution engine starts running the bytecode.

Initially it interprets instructions one at a time, which is straightforward but relatively slow. For code that runs frequently — a 'hot' method called thousands of times — the JIT (Just-In-Time) compiler kicks in and compiles that specific method directly into native machine code, caching it for reuse. This is why long-running Java applications (like a web server) often get measurably faster after running for a little while — the JIT has had time to identify and optimize the hot paths.

The takeaway: this two-stage design (compile to portable bytecode, then JIT-compile hot code to native instructions at runtime) is what gives Java both 'runs anywhere' portability and genuinely competitive runtime performance.`
          },
          {
            title: "How it works",
            content: `Java separates compilation from execution. A source file such as \`HelloWorld.java\` contains human-readable Java code. \`javac\` parses the source, performs compile-time checks, and produces bytecode in a class file. The \`java\` launcher then starts the JVM and asks it to load the required class and invoke the entry point.

This separation explains why a source-code change normally requires another compilation before the changed behavior can be observed. It also explains why a compiler error and a runtime exception are different categories of problems. A compiler error prevents valid bytecode from being produced, while a runtime exception occurs after execution has already started.

In a larger application there may be many compiled classes and dependencies rather than one class file. The JVM uses the classpath or module system to locate those classes. Understanding this basic pipeline makes later topics such as packages, class loading, JAR files, and build tools much easier to understand.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
// Step 1: javac HelloWorld.java         -> creates HelloWorld.class (bytecode)
// Step 2 & 3: java HelloWorld           -> JVM loads, verifies, and executes the bytecode
\`\`\``
          },
        ]
      },
      {
        title: "Java program structure",
        slug: "java-program-structure",
        description: "Every Java source file follows a predictable structure — learning the rules the compiler enforces will save you from confusing errors later. A Java file has a required order: an optional `package` declaration comes...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Every Java source file follows a predictable structure — learning the rules the compiler enforces will save you from confusing errors later. A Java file has a required order: an optional \`package\` declaration comes first (declaring which package this file's classes belong to), then any number of \`import\` statements (bringing in classes from other packages), and then your actual class/interface/enum/record declarations. You can define multiple top-level types in a single file, but only one of them can be \`public\`.

And if there is a public type in the file, the file name must exactly match that type's name, including capitalization — \`public class Main\` must live in a file named \`Main.java\`, or the compiler will reject it. This isn't just a style convention; it's a hard rule the compiler checks. Inside a class, you'll typically see fields (the data each object holds), constructors (special methods that set up a new object), regular methods (behavior), and sometimes nested classes or initializer blocks.

The \`main\` method is the conventional starting point of a program — it's the method the JVM looks for and calls first — but not every class needs one; only the class you actually launch with \`java ClassName\` needs a \`main\` method. As a modern convenience: since Java 11, you can skip the separate compile step entirely for quick single-file programs and just run \`java HelloWorld.java\` directly — the JVM compiles it in memory and runs it immediately. This is great for learning and quick scripts, though real projects still use a proper build process.`
          },
          {
            title: "How it works",
            content: `A Java source file is organized into declarations that the compiler can understand: an optional package declaration, import declarations, type declarations such as classes, and members inside those types. The braces define the boundaries of classes, methods, constructors, and control-flow blocks. Learning this structure prevents the common beginner mistake of treating Java as a script where statements can simply appear anywhere in the file.

For a basic executable program, one class contains a \`main\` method. The method body contains the statements that should run when the program starts. Other methods can then be called from that entry point, allowing a program to grow without putting every instruction into one large method.

The structure also has a direct relationship with visibility and organization. A public top-level class normally determines the expected source-file name, packages determine the class's namespace, and imports make other types easier to reference. These rules are not cosmetic; the compiler uses them to resolve names and validate the program.`
          },
          {
            title: "Example",
            content: `\`\`\`java
package com.example.app;
import java.util.List;
public class Main {                  // must match filename: Main.java
    private int counter;
    public Main() {
        this.counter = 0;
    }
    public static void main(String[] args) {
        System.out.println("App started");
    }
}
class Helper {                        // non-public, allowed in the same file
    // ...
}
\`\`\``
          },
        ]
      },
      {
        title: "Keywords and identifiers",
        slug: "keywords-and-identifiers",
        description: "Identifiers are the names you choose for variables, methods, and classes — but Java has strict rules about what makes a name valid. An identifier is any name you give to a variable, method, class, or package. Java's...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Identifiers are the names you choose for variables, methods, and classes — but Java has strict rules about what makes a name valid. An identifier is any name you give to a variable, method, class, or package. Java's rules are: it must start with a letter, underscore (_), or dollar sign ($) — never a digit.

After that first character, it can contain letters, digits, underscores, and dollar signs in any combination. Identifiers are case-sensitive, so \`total\` and \`Total\` are two completely different names. And an identifier can never be exactly the same as a reserved keyword.

It's worth learning the difference between 'keywords' and 'reserved words,' because it explains some odd edge cases you might run into. Words like \`class\`, \`if\`, \`public\`, and \`static\` are true keywords with fixed syntactic meaning. But \`true\`, \`false\`, and \`null\` are technically 'reserved literals' rather than keywords in the formal language spec — practically, this distinction rarely matters, since you still can't use any of them as a variable name either way.

A more genuinely useful edge case to know: \`var\` (introduced in Java 10) is a 'reserved type name,' not a keyword. That means you can't create a class named \`var\`, but you actually can still use \`var\` as the name of a regular variable in most situations — a quirk that surprises a lot of learners. Style-wise, while \`$\` and \`_\` are technically legal in identifiers, both are discouraged in everyday code: the compiler uses \`$\` internally for naming inner classes, and a single underscore \`_\` alone has actually been made illegal as an identifier since Java 9 (it's reserved for future language features).`
          },
          {
            title: "How it works",
            content: `Keywords are reserved words that have predefined meaning in the Java language, such as \`class\`, \`if\`, \`static\`, and \`return\`. They cannot be reused as ordinary names because the compiler needs to recognize them as part of the language grammar. Identifiers are the names developers choose for classes, methods, variables, packages, and other program elements.

The important distinction is that an identifier is not meaningful merely because of its spelling. Its meaning comes from the declaration and scope in which it appears. For example, the identifier \`count\` can be a local variable in one method and an unrelated field in another class. The compiler resolves each use according to Java's naming and scope rules.

Good naming is therefore part of correctness and maintainability, not just style. Names should communicate the role of a value or operation, while avoiding names that are easily confused with keywords or with unrelated concepts. Consistent naming becomes especially valuable once classes contain many fields and methods.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int totalCount;          // valid identifier
int _tempValue;           // valid but discouraged style
int 2ndPlace;             // ILLEGAL - starts with a digit
int class;                // ILLEGAL - 'class' is a reserved keyword
var var = 5;          // legal! 'var' is a reserved TYPE name, not a keyword
System.out.println(var);
\`\`\``
          },
        ]
      },
      {
        title: "Variables and constants",
        slug: "variables-and-constants",
        description: "Java has four distinct kinds of variables that behave differently in terms of scope, default values, and storage — knowing which is which prevents a lot of early confusion. The four categories are: local variables...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java has four distinct kinds of variables that behave differently in terms of scope, default values, and storage — knowing which is which prevents a lot of early confusion. The four categories are: local variables (declared inside a method or block — these live temporarily while that method runs, and Java requires you to give them a value before using them, since they get no automatic default), instance variables (fields that belong to a specific object — every object gets its own copy, and Java automatically initializes them to a default value like 0, false, or null if you don't set one), static variables (fields that belong to the class itself rather than any individual object — there's exactly one shared copy no matter how many objects you create), and method parameters (which behave like local variables scoped to that one method call).

For constants — values that should never change — Java doesn't have a dedicated \`const\` keyword like some languages. Instead, the idiomatic pattern is combining two keywords: \`static\` (one shared copy) and \`final\` (can only be assigned once). By convention, constant names are written in UPPER_SNAKE_CASE: \`public static final int MAX_RETRIES = 3;\` An important nuance to internalize early: \`final\` only prevents *reassigning the variable itself*.

If that variable holds a reference to a mutable object, like a \`List\`, the object itself can still be changed — you just can't point the variable at a *different* object afterward. This is a subtlety that trips up a lot of learners who assume \`final\` makes everything about the object immutable, when it only locks the reference.`
          },
          {
            title: "How it works",
            content: `A variable is a named storage location whose value can change during program execution. Java requires a variable to have a declared or inferred type, which tells the compiler what kinds of values can be assigned and what operations are valid. Local variables, instance fields, and static fields are all variables, but their lifetime and ownership are different.

A \`final\` variable introduces a different rule: after the variable has been assigned, it cannot be assigned a new value. For primitive types, that means the primitive value cannot change. For a reference variable, \`final\` prevents the reference from being redirected to another object; it does not automatically make the referenced object immutable. This distinction is one of the most important details to understand when discussing constants.

A conventional constant is commonly expressed with \`static final\` because one immutable reference or value is shared at the class level. Initialization must follow Java's definite-assignment rules, and a local variable must be assigned before it is read. These rules allow the compiler to detect many initialization mistakes before execution.`
          },
          {
            title: "Example",
            content: `\`\`\`java
public class Config {
    public static final int MAX_RETRIES = 3; // constant: shared + unchangeable
    private int instanceCounter;              // instance variable, defaults to 0
    private static int globalCounter;          // static variable, shared by all objects
    public void process() {
        int localVar = 10; // local variable - MUST be initialized before use
    }
}
final List<String> names = new ArrayList<>();
names.add("Ana");   // fine - the LIST is still mutable
// names = new ArrayList<>(); // ILLEGAL - can't reassign a final variable
\`\`\``
          },
        ]
      },
      {
        title: "Primitive data types",
        slug: "primitive-data-types",
        description: "Java has exactly eight primitive types, and unlike many languages, their sizes are fixed by the language spec rather than depending on the machine you're running on. The eight primitives split into a few groups....",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java has exactly eight primitive types, and unlike many languages, their sizes are fixed by the language spec rather than depending on the machine you're running on. The eight primitives split into a few groups. Whole numbers: \`byte\` (8 bits, holds -128 to 127), \`short\` (16 bits), \`int\` (32 bits — the default and most commonly used integer type), and \`long\` (64 bits, for very large numbers — literals need an \`L\` suffix, like \`10000000000L\`).

Decimal numbers: \`float\` (32 bits, needs an \`f\` suffix, rarely used today because of limited precision) and \`double\` (64 bits — the default choice for decimals). And two more: \`char\` (16 bits, representing a single character as a UTF-16 code unit) and \`boolean\` (true or false). Because these sizes are fixed by the Java specification — not left up to the platform, the way \`int\` in C can vary — a Java program behaves identically on every machine when it comes to how numbers overflow or wrap around.

This consistency is part of the 'write once, run anywhere' promise. A detail worth learning early: default values only apply to *fields* (instance or static variables) — numeric fields default to 0, \`boolean\` defaults to \`false\`, \`char\` defaults to a null character. Local variables inside a method get no automatic default at all; you must assign them a value before you can use them, or the compiler will refuse to compile.

One more useful fact: \`char\` in Java is unsigned, while \`byte\` and \`short\` are signed. When you do arithmetic mixing these smaller types, Java automatically promotes them to \`int\` first — this is why adding two \`byte\` values and assigning the result back into a \`byte\` variable requires an explicit cast, which we'll cover in the type-casting lesson.`
          },
          {
            title: "How it works",
            content: `Java's primitive types represent basic values directly rather than object instances. The numeric primitives include integer types such as \`byte\`, \`short\`, \`int\`, and \`long\`, floating-point types \`float\` and \`double\`, plus \`char\` for a UTF-16 code unit and \`boolean\` for logical values. Each type has defined rules for storage size, range, promotion, and operations.

Choosing a primitive is not only about how much memory it uses. The type also affects arithmetic behavior. For example, integer division discards the fractional part, and smaller integer types are often promoted to \`int\` during expressions. Floating-point arithmetic follows different precision and rounding rules, so it should not be treated as exact decimal arithmetic.

Java can also represent primitive values through wrapper classes such as \`Integer\` and \`Double\` when an object is required. That distinction becomes important with collections and generic types, which work with reference types rather than primitives.`
          },
          {
            title: "Example",
            content: `\`\`\`java
byte age = 25;
short year = 2026;
int population = 8_000_000;
long worldPopulation = 8_000_000_000L; // L suffix required for large values
float price = 19.99f;                   // f suffix required
double pi = 3.14159265358979;
char grade = 'A';
boolean isActive = true;
\`\`\``
          },
          {
            title: "Practice",
            content: `What happens if you write \`int total = 3_000_000_000;\`? Try it and see what error the compiler gives, then figure out which type would actually hold that value.`
          }
        ]
      },
      {
        title: "Reference types",
        slug: "reference-types",
        description: "Unlike primitives, a reference-type variable doesn't hold the actual object — it holds a pointer to where that object lives on the heap. This single idea explains a lot of Java's behavior. Classes, interfaces,...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Unlike primitives, a reference-type variable doesn't hold the actual object — it holds a pointer to where that object lives on the heap. This single idea explains a lot of Java's behavior. Classes, interfaces, arrays, and enums are all reference types.

When you write \`Point p1 = new Point();\`, \`p1\` doesn't contain the Point object directly — it contains a reference (essentially an address) pointing to where that object was allocated on the heap. This matters enormously when you assign one reference variable to another. \`Point p2 = p1;\` copies the reference, not the object — now both \`p1\` and \`p2\` point to the exact same object in memory. If you change a field through \`p2\`, and then look at \`p1\`, you'll see the same change, because there was only ever one object; you just have two names pointing at it.

This is completely different from primitives, where assignment copies the actual value. This also explains one of the most common early confusions in Java: the difference between \`==\` and \`.equals()\`. For reference types, \`==\` checks whether two variables point to the exact same object in memory (reference/identity equality) — not whether the objects have the same content.

To compare content, you use \`.equals()\`, which a class can override to define what 'equal' means for its own data. This is exactly why two separately-created \`String\` objects with identical text can be \`==\`-unequal but \`.equals()\`-equal. Finally, a reference variable can hold the special value \`null\`, meaning it points to nothing at all.

Calling a method or accessing a field through a \`null\` reference throws a \`NullPointerException\` at runtime — one of the most frequently encountered exceptions in real Java programs, and a big part of why defensive null-checking (and, in modern Java, \`Optional\`) exists.`
          },
          {
            title: "How it works",
            content: `A reference variable does not contain the object's fields directly. Instead, it holds a reference value that can be used to locate an object managed by the JVM. This is why two variables can refer to the same object: copying the reference creates another reference to the same object rather than a duplicate object.

The distinction between a reference and an object explains several common behaviors. Assigning one reference variable to another does not clone the object. Mutating the object through either reference can therefore be visible through the other reference. Reassigning one variable, however, changes only that variable's reference and does not automatically change the other variable.

A reference can also be \`null\`, meaning it does not currently refer to an object. Attempting to invoke an instance method or access an instance field through \`null\` causes a \`NullPointerException\`. The right mental model is therefore 'a typed reference to an object,' not 'the object itself.'`
          },
          {
            title: "Example",
            content: `\`\`\`java
class Point { int x, y; }
Point p1 = new Point();
p1.x = 5;
Point p2 = p1;      // copies the REFERENCE, not the object
p2.x = 10;
System.out.println(p1.x); // prints 10 - p1 and p2 point to the same object!
String a = new String("hi");
String b = new String("hi");
System.out.println(a == b);            // false - two different objects
System.out.println(a.equals(b));       // true - same content
\`\`\``
          },
        ]
      },
      {
        title: "Type casting",
        slug: "type-casting",
        description: "Casting means treating a value as a different type — but the mechanics are quite different depending on whether you're casting a primitive or an object. For primitives, casting converts the actual numeric value from...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Casting means treating a value as a different type — but the mechanics are quite different depending on whether you're casting a primitive or an object. For primitives, casting converts the actual numeric value from one representation to another. \`(int) 3.99\` produces \`3\` — it truncates the decimal, it does not round. Casting a larger type down to a smaller one, like \`long\` to \`int\`, can silently lose information if the value doesn't fit — this is a real bug source when working with very large numbers, because there's no automatic error; the value just quietly wraps around to something unexpected.

For object references, casting works completely differently: it doesn't convert any data at all. It's really an assertion — you're telling the compiler 'trust me, I know this object is actually of this more specific type.' \`Object o = "hello"; String s = (String) o;\` works because \`o\` genuinely does refer to a String underneath. But if the object isn't actually compatible with the type you're casting to, the JVM throws a \`ClassCastException\` at runtime — the compiler can't always catch this in advance, because the real type of an object is only fully known while the program is running.

The safe pattern before doing a risky downcast is to check first with \`instanceof\`. Modern Java (16+) even lets you combine the check and the cast in one step with pattern-matching \`instanceof\`, which both tests the type and gives you a ready-to-use variable of that type if the check passes — no separate explicit cast needed afterward.`
          },
          {
            title: "How it works",
            content: `Casting tells the compiler to treat a value as another compatible type according to Java's conversion rules. Some casts are widening conversions and are performed automatically because the target type can represent all values of the source type. Other casts are narrowing conversions and require explicit syntax because information can be lost.

Casting references follows a different idea. A reference can be upcast to a superclass or interface type without an explicit cast because the object is still an instance of that broader type. A downcast to a more specific type requires an explicit cast and is only valid when the actual object is compatible with the target type. An invalid runtime downcast results in \`ClassCastException\`.

The safest way to reason about a cast is to ask two questions: what is the compile-time type of the expression, and what is the actual runtime type of the value? The compiler primarily uses the first question for static checking, while runtime type compatibility matters for reference downcasts.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Primitive casting
double price = 9.99;
int whole = (int) price;         // 9 - truncates, doesn't round
// Reference casting
Object o = "hello";
if (o instanceof String s) {   // pattern-matching instanceof (Java 16+)
    System.out.println(s.length()); // 's' is already a String here, no separate cast needed
}
Object number = Integer.valueOf(5);
// String bad = (String) number; // compiles fine, but THROWS ClassCastException at runtime
\`\`\``
          },
        ]
      },
      {
        title: "Widening vs narrowing conversion",
        slug: "widening-vs-narrowing-conversion",
        description: "Java automatically converts between compatible types in some cases (widening) but requires you to explicitly ask for it in others (narrowing) — understanding why clarifies a lot of confusing compiler errors. Widening...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java automatically converts between compatible types in some cases (widening) but requires you to explicitly ask for it in others (narrowing) — understanding why clarifies a lot of confusing compiler errors. Widening conversion moves a value into a type that can hold a larger range of values — for example \`byte -> int -> long -> double\`. Because a larger type can always represent everything the smaller type could, Java performs this conversion automatically, with no cast required. (One caveat: converting a very large \`long\` or \`int\` to \`float\`/\`double\` can lose some precision for the exact digits, even though the overall magnitude fits — floating-point types trade exactness for range.) Narrowing conversion is the reverse — moving a value into a type with a smaller range, like \`double -> int\` or \`int -> byte\`.

Since this can genuinely lose information (a decimal gets truncated, or a large number can overflow and wrap into something unexpected), Java refuses to do this automatically. You must write an explicit cast to acknowledge you understand the risk. Here's a nuance that confuses a lot of learners: \`byte smallNum = 100;\` compiles just fine even though \`100\` is technically an \`int\` literal — because the compiler can look at that specific constant and verify at compile time that it safely fits inside a \`byte\`.

But if you write \`int x = 100; byte smallNum = x;\`, that fails to compile without an explicit cast — even though \`x\` happens to hold the exact same value — because the compiler only tracks that \`x\` is declared as an \`int\`, not what specific value it currently holds. This connects to something you'll notice constantly in arithmetic: when you do math with \`byte\`, \`short\`, or \`char\` values, Java automatically promotes them to \`int\` first before performing the operation. That's why \`byte a = 5, b = 10; byte c = a + b;\` fails to compile — \`a + b\` actually produces an \`int\`, and assigning an \`int\` back into a \`byte\` variable is a narrowing conversion that needs an explicit cast.`
          },
          {
            title: "How it works",
            content: `Widening conversion moves a value to a type with a broader representable range or compatible representation, such as \`int\` to \`long\`. Java can perform many primitive widening conversions automatically because the conversion is considered safe with respect to range. The target may still have a different representation, such as when an integer becomes a floating-point value, so 'widening' should not be confused with 'perfectly exact in every mathematical sense.'

Narrowing conversion moves toward a type with less range or precision, such as \`long\` to \`int\`. Java requires an explicit cast for these cases because the result may overflow, truncate, or lose precision. The compiler makes the programmer acknowledge that trade-off rather than silently accepting it.

These rules are especially important inside expressions. Binary numeric promotion can convert operands before an operation is performed, and the final assignment may then require another conversion. Understanding the conversion chain is often more useful than memorizing isolated cast examples.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int i = 100;
long l = i;           // widening - automatic, always safe
double d = l;         // widening - automatic
double price = 9.99;
int whole = (int) price;      // narrowing - explicit cast required, loses .99
byte fitsAtCompileTime = 100;        // OK - compiler verifies 100 fits in a byte
byte b1 = 5, b2 = 10;
// byte sum = b1 + b2;     // COMPILE ERROR - b1+b2 is an int
byte sum = (byte) (b1 + b2); // fixed with an explicit cast
\`\`\``
          },
        ]
      },
      {
        title: "Literals",
        slug: "literals",
        description: "A literal is a fixed value written directly into your code — and Java offers more flexible ways to write numbers and text than most learners initially realize. Integer literals can be written in several bases:...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `A literal is a fixed value written directly into your code — and Java offers more flexible ways to write numbers and text than most learners initially realize. Integer literals can be written in several bases: decimal is the default (\`42\`), hexadecimal starts with \`0x\` (\`0x2A\`), octal starts with a leading zero (\`052\`), and binary starts with \`0b\` (\`0b101010\`, added in Java 7). If a literal needs to be a \`long\`, you must append an \`L\` (uppercase is preferred over lowercase \`l\`, which looks too much like the digit \`1\`).

Since Java 7, you can also insert underscores anywhere in the middle of a numeric literal purely for human readability — \`1_000_000\` is exactly the same value as \`1000000\`, just easier to read at a glance. Decimal literals default to \`double\`; if you specifically want a \`float\`, you need an \`f\` or \`F\` suffix (\`2.5f\`). Scientific notation works too: \`1.5e3\` means 1.5 × 10³.

Character literals use single quotes and support escape sequences for special characters — \`'\n'\` for newline, \`'\t'\` for tab, and \`'\u0041'\` for a specific Unicode character by its code point. String literals use double quotes, and one modern feature worth knowing is the text block, introduced in Java 15, using triple double-quotes (\`"""\`). Text blocks let you write multi-line strings — like embedded JSON, SQL, or HTML — without needing to escape every quote and manually insert \`\n\` at every line break, which makes embedded structured text dramatically more readable.`
          },
          {
            title: "How it works",
            content: `A literal is a value written directly in source code rather than obtained from a variable or method call. Integer literals such as \`42\`, floating-point literals such as \`3.14\`, character literals such as \`'A'\`, string literals such as \`"hello"\`, boolean literals, and the \`null\` literal are all examples. The compiler gives each literal a type and applies context-specific conversion rules.

Integer literals deserve special attention because an unsuffixed integer literal is normally treated as an \`int\` when it fits. Suffixes such as \`L\` can explicitly request a \`long\` literal, while \`F\` can mark a \`float\` literal. Hexadecimal, binary, and octal forms are also available for integer values.

String literals are reference values and participate in Java's string pool behavior, while \`null\` represents the absence of an object reference and therefore cannot be used as a primitive value. These details matter when overload resolution, comparisons, and assignments depend on the exact literal type.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int hex = 0x1A;
int oct = 012;
int bin = 0b1010;
long big = 10_000_000_000L;               // underscores for readability, L suffix required
float f = 2.5f;
double sci = 1.5e3;                       // 1500.0
char unicodeChar = '\u0041';              // 'A'
String json = """
{
    name: "Java"
}
""";
\`\`\``
          },
        ]
      },
      {
        title: "Operators",
        slug: "operators",
        description: "Java's operators cover arithmetic, comparisons, logic, and bit manipulation — and a few of them behave in ways that surprise people coming from other languages. The main groups are: arithmetic (`+ - * / %`),...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java's operators cover arithmetic, comparisons, logic, and bit manipulation — and a few of them behave in ways that surprise people coming from other languages. The main groups are: arithmetic (\`+ - * / %\`), relational/comparison (\`== != < > <= >=\`), logical (\`&& || !\`), bitwise (\`& | ^ ~ << >> >>>\`), assignment (\`= += -=\` and similar shorthand), and the ternary operator (\`condition ? valueIfTrue : valueIfFalse\`). A few behaviors are worth memorizing early because they cause real bugs.

First, dividing two integers truncates the result instead of rounding — \`7 / 2\` gives \`3\`, not \`3.5\`. To get a decimal answer, at least one operand needs to be a \`float\` or \`double\`. Second, the modulo operator (\`%\`) on negative numbers in Java follows the sign of the number being divided (the dividend) — so \`-7 % 2\` is \`-1\`, which surprises people expecting a purely positive remainder like in some other languages.

Another crucial distinction: \`&&\` and \`||\` are 'short-circuiting' — if the left side of \`&&\` is already false, Java doesn't even bother evaluating the right side, since the overall result is already determined. This isn't just an optimization; it's a safety feature you'll rely on constantly, like in \`if (obj != null && obj.isValid())\` — the right side only runs if \`obj\` is confirmed non-null, avoiding a crash. The single-character versions \`&\` and \`|\`, when used on booleans, always evaluate both sides regardless, so they don't offer this protection.

Finally, the two right-shift operators differ on negative numbers: \`>>\` preserves the sign bit (arithmetic shift), while \`>>>\` always fills with zeros (logical shift) — they produce identical results for positive numbers but diverge for negative ones.`
          },
          {
            title: "How it works",
            content: `Operators are the language constructs that combine values or change program state. Arithmetic operators perform numeric calculations, relational and equality operators produce boolean results, logical operators combine boolean conditions, assignment operators update variables, and unary operators work on a single operand. Java also provides bitwise and shift operators for integer-level operations and the conditional operator for compact value selection.

The same symbol can behave differently depending on operand types. The \`+\` operator performs numeric addition for numeric operands but string concatenation when string operands participate in the expression. Likewise, \`&&\` and \`||\` use short-circuit evaluation, meaning the right-hand side may not execute when the left-hand side already determines the result.

When an expression becomes complex, understanding both the operator's result type and its evaluation behavior is important. Increment operators, assignments, method calls, and object creation can have side effects, so an expression can be both a value-producing construct and a change to program state.`
          },
          {
            title: "Example",
            content: `\`\`\`java
System.out.println(7 / 2);          // 3 - integer division truncates
System.out.println(7.0 / 2);        // 3.5 - one operand is a double
System.out.println(-7 % 2);         // -1 - follows the sign of the dividend
String s = null;
if (s != null && s.length() > 0) {
    // safe! short-circuiting means s.length() never runs if s is null
}
int negative = -8;
System.out.println(negative >> 1); // -4 - sign-preserving shift
System.out.println(negative >>> 1); // large positive number - zero-fill shift
\`\`\``
          },
          {
            title: "Practice",
            content: `Predict the output of \`System.out.println(5 % -3);\` before running it, then check whether your prediction matches Java's actual behavior.`
          }
        ]
      },
      {
        title: "Operator precedence",
        slug: "operator-precedence",
        description: "When an expression mixes multiple operators, Java follows a fixed order for which one runs first — but the practical lesson is knowing when to stop relying on memory and just add parentheses. Java evaluates complex...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `When an expression mixes multiple operators, Java follows a fixed order for which one runs first — but the practical lesson is knowing when to stop relying on memory and just add parentheses. Java evaluates complex expressions using a strict precedence table: things like \`++\`/\`--\` and method calls happen first, then unary operators (like unary minus), then multiplication/division/modulo, then addition/subtraction, then shifts, then comparisons, then bitwise operators, then logical operators, then the ternary operator, and finally assignment (which happens last and groups right-to-left).

Rather than memorizing the entire table, it's more useful to know the handful of cases that actually cause real confusion. Addition and subtraction bind more tightly than the shift operators, so \`1 + 2 << 3\` is evaluated as \`(1 + 2) << 3\`, giving \`24\` — not \`1 + (2 << 3)\`, which some people expect. Bitwise \`&\`, \`|\`, and \`^\` sit at a lower precedence than comparison operators like \`==\`, which surprises people who assume \`&\` behaves 'just like \`&&\`' in terms of where it sits relative to comparisons.

The practical, professional-level takeaway is this: precedence rules are well-defined and consistent, but relying on someone (including future-you) correctly remembering them while reading code is asking for trouble. Adding explicit parentheses costs absolutely nothing at runtime — the compiler handles it — but it makes intent immediately obvious to any reader. Experienced developers use parentheses defensively for anything beyond the simplest arithmetic, precisely because ambiguity in a shared codebase is a real liability.`
          },
          {
            title: "How it works",
            content: `Operator precedence defines how Java groups operators when parentheses are absent. For example, multiplication is evaluated before addition, so \`2 + 3 * 4\` is grouped as \`2 + (3 * 4)\`. Precedence determines grouping, while associativity determines how operators of the same precedence are grouped.

Precedence does not mean every subexpression is executed before another in an arbitrary way. Java still follows its evaluation rules, including left-to-right evaluation of operands in many expressions. Short-circuit logical operators can additionally prevent an operand from being evaluated at all. This is why precedence, evaluation order, and side effects should be considered separately.

In production code, parentheses are often the best way to make intent explicit even when the language rules would produce the same result without them. This is especially useful around boolean conditions, shifts, bitwise operations, and mixed arithmetic. The goal is not merely to satisfy the compiler but to make the expression unambiguous to another developer.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int result = 1 + 2 << 3;          // evaluates as (1+2) << 3 = 24 - easy to misread!
int clearer = (1 + 2) << 3;       // same value, but the intent is obvious
boolean x = true, y = false;
boolean tricky = x == true & y == false; // works, but hard to read at a glance
boolean clear = (x == true) & (y == false); // identical result, much clearer
\`\`\``
          },
        ]
      },
      {
        title: "Expressions and statements",
        slug: "expressions-and-statements",
        description: "Every line of Java code is either an expression (something that produces a value) or a statement (something that performs an action) — understanding the difference explains a lot of syntax rules. An expression is...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Every line of Java code is either an expression (something that produces a value) or a statement (something that performs an action) — understanding the difference explains a lot of syntax rules. An expression is anything that evaluates to a value: \`2 + 3\`, \`x++\`, \`isValid()\`, and \`a > b\` are all expressions, because each one can be substituted with the value it produces. A statement is a complete, standalone instruction that performs an action — an \`if\` block, a \`for\` loop, a variable declaration, or an 'expression statement,' which is simply an expression used purely for its side effect and ended with a semicolon.

Not every expression is allowed to become a standalone statement on its own. Java only permits specific kinds as expression statements: assignments (\`x = 5;\`), increment/decrement (\`x++;\`), method calls (\`doWork();\`), and object creation (\`new Foo();\`). This is why writing \`x + 1;\` alone as a line of code is a compile error — the compiler recognizes that this computes a value and then throws it away for no reason, and disallows that pattern structurally, whereas \`x++;\` is fine because incrementing has a meaningful side effect.

This distinction directly explains why the ternary operator can be embedded inside an assignment (\`int max = a > b ? a : b;\`) but an \`if\` statement cannot be used the same way — the ternary is an expression that produces a value you can assign, while \`if\`/\`else\` is purely a control-flow statement that never produces a usable value of its own.`
          },
          {
            title: "How it works",
            content: `An expression is a construct that produces a value, while a statement is a complete instruction that performs an action or controls execution. Arithmetic such as \`a + b\`, a method call, a comparison, and a conditional expression are examples of expressions. Declarations, \`if\` blocks, loops, and many expression statements are statements.

This distinction explains why some expressions can appear by themselves and others cannot. An assignment, increment, method invocation, or object creation has a useful side effect, so Java permits it as an expression statement. A bare calculation whose result is immediately discarded is not generally accepted as a statement because it has no observable purpose.

Expressions can be nested inside larger expressions, which is how Java builds compact calculations and conditions. Statements provide the surrounding control structure. Thinking in these two layers makes syntax such as \`int x = condition ? a : b;\` easier to understand: the declaration is a statement containing an expression that computes the value assigned to \`x\`.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Expressions - each one produces a value
int sum = 2 + 3;
boolean valid = isValid();
int max = (a > b) ? a : b;   // the ternary operator IS an expression
// Statements - perform an action, don't themselves produce a usable value
if (valid) { doSomething(); }
for (int i = 0; i < 10; i++) { }
x++;         // valid expression statement
// x + 1;    // COMPILE ERROR - a bare expression can't stand alone as a statement
\`\`\``
          },
        ]
      },
      {
        title: "Input and output",
        slug: "input-and-output",
        description: "Java gives you a few layers for reading console input and writing console output — knowing which tool fits which situation will save you from a very common early bug. Output is straightforward: `System.out` is a...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java gives you a few layers for reading console input and writing console output — knowing which tool fits which situation will save you from a very common early bug. Output is straightforward: \`System.out\` is a stream connected to your console, offering \`print\` (no newline), \`println\` (adds a newline), and \`printf\` (formatted output using placeholders like \`%d\` for integers, \`%s\` for strings, and \`%.2f\` for a decimal with two places). There's also \`System.err\`, a separate stream for error messages, kept distinct so error output can be redirected independently from regular output when running programs from a shell.

For input, the most beginner-friendly tool is \`java.util.Scanner\`, which wraps a source (usually \`System.in\`, the keyboard) and provides convenient methods like \`nextInt()\`, \`nextDouble()\`, and \`nextLine()\` to read typed values directly, doing the parsing work for you. Here's the classic bug worth knowing before you hit it yourself: methods like \`nextInt()\` and \`nextDouble()\` read the number itself, but they leave the trailing newline character (from when the user pressed Enter) still sitting unread in the input.

If you then call \`nextLine()\` expecting to read the *next* full line of text, it instead immediately returns an empty string — because it just consumed that leftover newline character. The standard fix is to insert an extra \`scanner.nextLine();\` call right after reading a number, purely to absorb that leftover newline before reading actual text input.`
          },
          {
            title: "How it works",
            content: `Console input and output are simple but important examples of Java's stream-based I/O model. Standard output is represented by \`System.out\` and is commonly used with \`print\` or \`println\`. Standard input is represented by \`System.in\`, which supplies bytes that higher-level classes can interpret as characters or values.

Output formatting becomes important when a program needs predictable text rather than simple debugging messages. \`printf\` supports formatted values, while \`println\` is convenient for line-oriented output. Input requires more attention because the raw input stream does not automatically know whether the user intends an integer, floating-point number, or line of text. A class such as \`Scanner\` can provide that higher-level parsing.

Resource ownership is another important concept. Streams can hold operating-system resources, so larger applications should close resources when appropriate, preferably with try-with-resources. Even for console programs, separating input parsing from business logic makes the code easier to test and maintain.`
          },
          {
            title: "Example",
            content: `\`\`\`java
Scanner sc = new Scanner(System.in);
System.out.print("Enter age: ");
int age = sc.nextInt();
sc.nextLine(); // absorbs the leftover newline character - without this, the next line breaks!
System.out.print("Enter name: ");
String name = sc.nextLine(); // now correctly reads the actual name
System.out.printf("%s is %d years old%n", name, age);
\`\`\``
          },
          {
            title: "Common mistakes",
            content: `- - Calling nextInt() followed immediately by nextLine() and being confused why the string comes back empty`
          }
        ]
      },
      {
        title: "Scanner",
        slug: "scanner",
        description: "Scanner is the go-to tool for reading input in beginner Java programs — it's convenient, but it's worth understanding how it works and when it's not the best choice. Scanner can read from many different sources — the...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Scanner is the go-to tool for reading input in beginner Java programs — it's convenient, but it's worth understanding how it works and when it's not the best choice. Scanner can read from many different sources — the keyboard (\`System.in\`), a file, or even a plain String — which makes it flexible for learning and testing. Internally, it works by using regular-expression-based tokenizing: it scans forward through the input looking for the next 'token' (by default, tokens are separated by whitespace), checks that the token matches what you asked for (like a valid integer for \`nextInt()\`), and only then moves its internal position forward past it.

If the next token doesn't match — say you call \`nextInt()\` but the user typed letters — Scanner throws an \`InputMismatchException\`. Because of this regex-based scanning under the hood, Scanner is noticeably slower than more low-level input tools like \`BufferedReader\`. For simple console programs and learning exercises this difference is completely irrelevant, but if you ever process very large input files or need maximum performance, a \`BufferedReader\` paired with manual parsing is the faster choice.

A few practical habits worth building: use \`hasNext()\`, \`hasNextInt()\`, and similar methods to check whether more input is available (and of the right type) *before* trying to read it, which avoids exceptions entirely. Also, always close a \`Scanner\` that's reading from a file (ideally using try-with-resources) to release the file handle — but be careful not to close a \`Scanner\` wrapping \`System.in\`, since doing so closes standard input for the rest of your program too, which will break any later attempt to read more console input.`
          },
          {
            title: "How it works",
            content: `Scanner is a convenience class for reading tokens and values from an input source. When connected to \`System.in\`, it can parse integers, floating-point numbers, booleans, and strings using methods such as \`nextInt()\` and \`nextLine()\`. It is useful for learning because it hides much of the low-level byte-to-character parsing work.

One common issue is mixing token-oriented methods with \`nextLine()\`. Methods such as \`nextInt()\` consume the numeric token but can leave the line separator behind, so a following \`nextLine()\` may immediately read the remainder of the current line. The solution is to understand exactly what each method consumes rather than assuming all input methods behave identically.

Scanner also performs parsing and validation, so invalid input can result in an input mismatch exception. For simple command-line exercises this is acceptable, but production applications often use more controlled parsing and validation. The important learning goal is understanding that input is text that must be converted into typed values.`
          },
          {
            title: "Example",
            content: `\`\`\`java
Scanner sc = new Scanner(System.in);
while (sc.hasNextInt()) {
    int n = sc.nextInt();
    System.out.println("Got: " + n);
}
// Reading from a file - close it properly with try-with-resources
try (Scanner fileScanner = new Scanner(new File("data.txt"))) {
    while (fileScanner.hasNextLine()) {
        process(fileScanner.nextLine());
    }
}
\`\`\``
          },
        ]
      },
      {
        title: "Comments and documentation comments",
        slug: "comments-and-documentation-comments",
        description: "Java has three comment styles, and one of them isn't just for humans — it's structured input that a tool can turn into real API documentation. The three styles are single-line comments (`// this explains one line`),...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java has three comment styles, and one of them isn't just for humans — it's structured input that a tool can turn into real API documentation. The three styles are single-line comments (\`// this explains one line\`), multi-line comments (\`/* this can span several lines */\`), and documentation comments (\`/** this is a Javadoc comment */\`). That third style is special: when placed directly above a class, method, field, or constructor, a tool called Javadoc can parse it and automatically generate readable HTML documentation for your code.

Javadoc comments support special tags that structure the documentation: \`@param\` describes a method parameter, \`@return\` describes what a method gives back, \`@throws\` documents an exception the method might throw, \`@since\` notes which version introduced this code, and \`@deprecated\` marks something as outdated (often alongside the separate \`@Deprecated\` annotation, which specifically triggers a compiler warning wherever the deprecated code is used). As a learner, the most important habit to build isn't memorizing every tag — it's developing judgment about *when* a comment adds value.

A good comment explains *why* something is done a certain way, especially when the reasoning isn't obvious from the code itself. A comment that just restates what the code plainly already shows (\`i++; // increment i\`) adds noise rather than clarity. Public methods that other developers will call from outside your code deserve solid Javadoc; small private helper methods usually don't need much commenting at all if their names and logic are already clear.`
          },
          {
            title: "How it works",
            content: `Comments are ignored by the compiler as executable instructions, but they communicate intent to humans and tools. Single-line comments use \`//\`, block comments use \`/* ... */\`, and documentation comments use \`/** ... */\`. The last form can be processed by Javadoc to generate API documentation.

Useful comments explain decisions, constraints, or non-obvious behavior rather than repeating what the code already says. For example, a comment that says 'increment i' adds little value when the statement is \`i++\`. A comment explaining why an unusual algorithm is required can prevent a future maintainer from accidentally removing an important behavior.

Documentation comments are especially valuable on public classes and methods because they become part of the developer-facing API. Tags such as \`@param\`, \`@return\`, and \`@throws\` describe contracts and expectations. Good documentation should match the actual behavior of the code; stale comments are worse than missing comments because they actively mislead readers.`
          },
          {
            title: "Example",
            content: `\`\`\`java
/**
* Calculates compound interest.
*
* @param principal the initial amount invested
* @param rate annual interest rate as a decimal (e.g., 0.05 for 5%)
* @param years number of years to compound
* @return the final amount after compounding
*/
public double compoundInterest(double principal, double rate, int years) {
    return principal * Math.pow(1 + rate, years);
}
\`\`\``
          },
        ]
      },
      {
        title: "Arrays",
        slug: "arrays",
        description: "An array is a fixed-size, indexed container — and even though it can hold primitives, the array itself is always an object living on the heap. When you write `int[] arr = new int[5];`, Java allocates a 5-element...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `An array is a fixed-size, indexed container — and even though it can hold primitives, the array itself is always an object living on the heap. When you write \`int[] arr = new int[5];\`, Java allocates a 5-element block on the heap, and \`arr\` is a reference variable pointing at it — just like any other object reference. Every element starts at a default value (0, null, or false depending on the element type).

The array's \`length\` is a public field, not a method — a small but very common source of typos for people used to \`String.length()\` or \`List.size()\`. Arrays are strictly fixed-size: once created, that size can never change. 'Resizing' an array in practice actually means creating a brand-new, larger array and copying the old elements into it — and that's exactly what \`ArrayList\` does internally every time it needs to grow beyond its current capacity.

One genuinely interesting Java quirk worth knowing: arrays are covariant, meaning \`String[]\` is treated as a kind of \`Object[]\`. So \`Object[] objs = new String[3];\` compiles just fine. But if you then try to store something incompatible, like \`objs[0] = 42;\` (compiles too, since an \`int\` autoboxes to \`Object\`), the JVM throws an \`ArrayStoreException\` at runtime, because it remembers the array's real element type is \`String\`.

This runtime safety net exists specifically because array covariance is allowed at compile time but isn't actually type-safe — generics (covered later) deliberately avoid this exact problem. Compared to \`ArrayList\` and other collections, arrays are more memory-efficient for fixed-size numeric data, especially primitives, since collections of primitives require boxing them into wrapper objects. But collections offer dynamic resizing and a far richer set of built-in operations, which is why they're the default choice in most everyday application code.`
          },
          {
            title: "How it works",
            content: `An array stores a fixed number of values of one component type. The array object has a length determined when it is created, and elements are accessed using zero-based indexes. This gives constant-time indexed access, but it also means the program must respect the valid range from \`0\` through \`length - 1\`.

Arrays are objects in Java even when their elements are primitives. A variable such as \`int[] values\` therefore holds a reference to an array object. Creating an array initializes its elements to their default values, such as zero for numeric primitives and \`null\` for reference elements.

The fixed length is both a strength and a limitation. It makes the memory layout and indexing model simple, but it means an array cannot grow when more elements are needed. That is why collections such as \`ArrayList\` are commonly used for dynamically sized data. Arrays remain fundamental because they are efficient, predictable, and form the basis for many other data structures.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int[] nums = new int[5];         // all elements default to 0
String[] names = {"Al", "Bo"};    // array literal shorthand
System.out.println(nums.length); // field, not a method!
Object[] objs = new String[3];
objs[0] = "ok";                    // fine
try {
    objs[1] = 42;                    // compiles... but throws at runtime
} catch (ArrayStoreException e) {
    System.out.println("Caught: " + e);
}
\`\`\``
          },
        ]
      },
      {
        title: "Multidimensional arrays",
        slug: "multidimensional-arrays",
        description: "Java doesn't have true multidimensional arrays — a 2D array is really an array of array references, and understanding that unlocks a useful feature: jagged rows. Unlike languages with a single contiguous block for a...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java doesn't have true multidimensional arrays — a 2D array is really an array of array references, and understanding that unlocks a useful feature: jagged rows. Unlike languages with a single contiguous block for a 2D grid, Java implements \`int[][] grid\` as an array whose elements are themselves references to separate \`int[]\` arrays. Each row is its own independently allocated object on the heap.

This 'array of arrays' model is a genuinely important mental model shift, and it directly explains a feature you'll use often: jagged arrays, where each row can have a completely different length. Because rows are separate objects, you don't need to specify every dimension up front. You can declare \`new int[3][]\` — three rows, but with lengths left unspecified — and then assign each row its own array of whatever length you need afterward.

That flexibility wouldn't make sense with a true fixed-size grid. Iterating requires nested loops (or nested for-each loops for cleaner syntax), and a common beginner mistake is assuming every row has the same length as the first one — always check \`row.length\` per row rather than assuming a single, uniform column count for the whole grid, unless you specifically created it as a rectangular array.`
          },
          {
            title: "How it works",
            content: `Java does not have a separate built-in matrix type. A multidimensional array is an array whose elements are themselves arrays. In a two-dimensional structure, the first index selects a row array and the second index selects an element inside that row.

This model explains why Java arrays can be jagged. Each row is a separate array object, so different rows can have different lengths. A declaration such as \`int[][] values\` creates a reference to an array of \`int[]\` references; the inner arrays are then created separately or through the combined allocation syntax.

Traversal normally uses nested loops, with the outer loop selecting each row and the inner loop visiting elements in that row. When code assumes every row has the same length, it is effectively treating the structure as rectangular. When rows may differ, the correct inner bound is each row's own \`length\`. Understanding this object-of-arrays model is more useful than memorizing a special '2D array' rule.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int[][] rectangular = new int[3][4]; // 3 rows, 4 columns each - uniform
int[][] jagged = new int[3][];
jagged[0] = new int[]{1};
jagged[1] = new int[]{1, 2, 3};
jagged[2] = new int[]{1, 2};
for (int[] row : jagged) {
    System.out.println(row.length); // varies: 1, 3, 2
}
int[][] matrix = {     // literal syntax
    {1, 2, 3},
    {4, 5, 6}
};
\`\`\``
          },
        ]
      },
      {
        title: "var local variable type inference",
        slug: "var-local-variable-type-inference",
        description: "var lets the compiler figure out a variable's type from its initializer — but this is compile-time inference, not the dynamic typing you might know from other languages. Introduced in Java 10, `var` tells the...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `var lets the compiler figure out a variable's type from its initializer — but this is compile-time inference, not the dynamic typing you might know from other languages. Introduced in Java 10, \`var\` tells the compiler: look at what I'm assigning, and figure out the type yourself. Critically, that inferred type is locked in permanently at compile time — \`var x = 5;\` makes \`x\` a genuine \`int\` forever, exactly as if you'd written \`int x = 5;\` yourself. \`x = "hello";\` afterward is still a compile error, because the type was fixed the moment it was inferred.

This is very different from dynamic typing in languages like Python, where a variable's type can change at runtime. \`var\` is intentionally limited to local variables — you can use it for a variable inside a method, a for-loop counter, or a try-with-resources variable, but never for a field, a method parameter, or a return type. This keeps class APIs explicit and stable, since anyone reading a class definition should be able to see its contract clearly without needing to trace through initializer expressions.

There are a few hard restrictions: \`var\` requires an initializer (you can't write \`var x;\` with nothing to infer from), and it can't be initialized directly with \`null\` or with something inherently ambiguous like a bare lambda expression, because the compiler needs enough information from the right-hand side to pin down a concrete type. As a style question, the general guidance is: use \`var\` when the right-hand side already makes the type obvious (\`var list = new ArrayList<String>();\` — clearly an ArrayList), and avoid it when it would hide useful information (\`var result = process(data);\` leaves the reader guessing what \`process\` even returns).`
          },
          {
            title: "How it works",
            content: `The \`var\` keyword asks the compiler to infer the static type of a local variable from its initializer. It does not make Java dynamically typed. After compilation, the variable still has a specific type, and the compiler uses that type for method calls, assignments, and overload resolution.

Because inference needs evidence, a \`var\` declaration must have an initializer. It is intended for local variables and local variables in loops, not for fields, method parameters, or method return types. A declaration such as \`var name = "Alice"\` therefore has the inferred type \`String\`, not a generic 'unknown' type.

The main design question is readability. \`var\` can remove repetitive type names when the initializer already makes the type obvious, especially with long generic types. It can also make code harder to understand when the initializer hides the type or uses a factory method with an unfamiliar return type. Good use of \`var\` balances reduced noise with clear intent.`
          },
          {
            title: "Example",
            content: `\`\`\`java
var list = new ArrayList<String>(); // inferred as ArrayList<String>
var count = 0;                       // inferred as int
for (var i = 0; i < 10; i++) { }          // fine inside for loops
// var name;                // ILLEGAL - nothing to infer from
// var x = null;            // ILLEGAL - can't infer a type from null
var x = 5;
// x = "hello";             // COMPILE ERROR - x is permanently typed as int
\`\`\``
          },
        ]
      },
      {
        title: "JDK vs JRE vs JVM",
        slug: "jdk-vs-jre-vs-jvm",
        description: "These three acronyms describe three nested layers of increasing scope: the engine that runs your code, the environment needed to execute it, and the full toolkit needed to build it. The **JVM** (Java Virtual Machine)...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `These three acronyms describe three nested layers of increasing scope: the engine that runs your code, the environment needed to execute it, and the full toolkit needed to build it. The **JVM** (Java Virtual Machine) is the engine that actually executes bytecode. It handles loading classes, verifying that bytecode is safe, managing memory through garbage collection, and JIT-compiling frequently used code into native instructions.

The JVM is technically a specification, and different implementations exist — HotSpot is the default one shipped with OpenJDK, but others like GraalVM exist too. The **JRE** (Java Runtime Environment) is the JVM plus the standard class libraries — things like \`java.lang\`, \`java.util\`, and \`java.io\` — that any compiled Java program relies on to actually run. It has everything needed to *run* an existing Java application, but no compiler, so it can't be used to build one.

The **JDK** (Java Development Kit) is the full package: the JRE plus the compiler (\`javac\`), a debugger, the \`jar\` packaging tool, the \`javadoc\` documentation generator, and other development tools. This is what you install to actually write and compile Java code. A useful fact for context: since Java 11, standalone JRE-only distributions were discontinued industry-wide — today, essentially everyone just installs a full JDK, even if all they need is to run an existing application, since it's simpler to maintain one unified distribution.

The cleanest way to remember the relationship: JVM sits inside the JRE, and the JRE sits inside the JDK — each layer adds more capability on top of the one before it.`
          },
          {
            title: "How it works",
            content: `These three terms describe different layers of the Java execution environment. The JVM is the execution engine that loads and runs Java bytecode. The runtime environment historically described by the JRE consists of the JVM plus the libraries and components needed to run Java applications. The JDK is the development kit that includes the tools required to build Java programs, including the compiler and other development utilities.

For modern Java distributions, the separate JRE packaging model is less prominent than it was in older Java releases. The practical development distinction is simpler: developers install a JDK, and the JDK provides the runtime needed to execute applications. This avoids treating the three names as three completely separate products that must always be installed independently.

The conceptual distinction still matters in interviews because it tests whether you understand compilation versus execution. \`javac\` belongs to the development side, while the JVM is responsible for executing the resulting bytecode.`
          },
        ]
      },
      {
        title: "main method",
        slug: "main-method",
        description: "The exact signature of the main method — public static void main(String[] args) — isn't arbitrary; each keyword solves a specific problem the JVM needs solved. Consider each part of `public static void main(String[]...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `The exact signature of the main method — public static void main(String[] args) — isn't arbitrary; each keyword solves a specific problem the JVM needs solved. Consider each part of \`public static void main(String[] args)\` individually. \`public\` — the JVM, which is external to your class, needs to be able to call this method, so it can't be more restrictive than that. \`static\` — the JVM calls \`main\` before any object of your class has been created, so the method must be callable without needing an instance to exist first. \`void\` — the return value isn't used to communicate anything back to the operating system; if you need to signal an exit code, you use \`System.exit(int)\` explicitly instead. \`String[] args\` — command-line arguments are handed to your program as an array of strings, with no automatic type conversion, so if you expect a number, you'll need to parse it yourself with something like \`Integer.parseInt(args[0])\`.

A few lesser-known but perfectly legal variations exist: you can write \`String... args\` (varargs) instead of \`String[] args\` — functionally identical, since varargs really is just an array under the hood. You can also write \`String args[]\` with C-style brackets after the parameter name (legal, but not idiomatic Java style). And the order of \`public\` and \`static\` doesn't actually matter to the compiler — \`static public void main\` compiles just as well, even though \`public static\` is what everyone conventionally writes.

It's also worth knowing that a class doesn't need a \`main\` method at all to compile successfully — it's only required in whichever class you plan to actually launch directly with \`java ClassName\`.`
          },
          {
            title: "How it works",
            content: `The \`main\` method is the conventional entry point for a standalone Java application launched by the Java launcher. The familiar form \`public static void main(String[] args)\` has four important pieces. \`public\` makes the method accessible to the launcher, \`static\` allows it to be invoked without first creating an instance of the class, \`void\` means it does not return a value to the launcher, and the \`String[]\` parameter receives command-line arguments.

The arguments array is simply data supplied when the application starts. For example, launching a program with additional words after the class name places those words into \`args\`. The program can then parse or validate them as needed.

The \`main\` method is not magic application logic; it is a starting point. Good programs often keep it small and delegate real work to methods and classes. That makes the entry point easy to understand and keeps business logic independently testable.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Standard signature
public static void main(String[] args) { }
// Legal variations you might encounter
public static void main(String... args) { }       // varargs - functionally the same
static public void main(String[] args) { }         // modifier order doesn't matter to the compiler
\`\`\``
          },
        ]
      },
      {
        title: "Defining and calling methods",
        slug: "defining-and-calling-methods",
        description: "A method's 'signature' consists of its name and parameter types — and understanding that precisely explains a strict rule about overloading that trips up a lot of learners. A method declaration is made up of...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `A method's 'signature' consists of its name and parameter types — and understanding that precisely explains a strict rule about overloading that trips up a lot of learners. A method declaration is made up of modifiers (access level, \`static\`, \`final\`, etc.), a return type, a name, a list of parameters, and an optional list of exceptions it might throw, followed by its body. The method *signature* specifically refers to just the name plus the parameter types and their order — the return type is deliberately excluded from the signature.

This exclusion has a very concrete consequence worth learning early: you cannot have two methods in the same class with the exact same name and exact same parameter list but different return types. That's a compile error, not valid overloading, because the compiler (and the calling code) would have no reliable way to tell which one you meant based purely on the call site. So \`int getValue()\` and \`String getValue()\` can never coexist — but \`int getValue()\` and \`int getValue(String key)\` can, because their parameter lists genuinely differ.

When you call an overloaded method, Java decides which version to run at compile time, based on the types of the arguments you pass. It follows a specific priority order: it first looks for an exact type match, then a match reachable only by widening a primitive type (like passing an \`int\` where a \`long\` is expected), then a match requiring autoboxing (like passing an \`int\` where an \`Integer\` is expected), and only as a last resort, a matching varargs method. This ordering is exactly why, if both an \`int\` overload and a \`long\` overload exist, calling with a plain \`int\` argument picks the \`int\` version — the exact match always wins first.`
          },
          {
            title: "How it works",
            content: `A method packages a reusable operation behind a name, parameter list, and return type. A declaration tells the compiler the method's contract, while a method call supplies arguments and transfers control into the method body. This separation allows the same operation to be reused from multiple places without copying its implementation.

A method can be instance-based or static. Instance methods operate in the context of an object and can directly access that object's instance state. Static methods belong to the class and do not have an implicit object context. The choice should reflect whether the operation requires object state.

Method calls create a new execution context with their own local variables and parameters. When a method returns, control goes back to the calling location, optionally carrying a return value. Breaking a large operation into focused methods improves readability and gives each piece a clear responsibility, which is one of the simplest ways to make Java code easier to test.`
          },
          {
            title: "Example",
            content: `\`\`\`java
void process(int x) { }
void process(String s) { }     // valid - different parameter types
// int process(int x) { }      // INVALID - identical signature to void process(int x), differs on
ly in return type
void show(int x)     { System.out.println("int"); }
void show(long x)    { System.out.println("long"); }
void show(Integer x) { System.out.println("Integer"); }
show(5); // prints "int" - exact match wins over widening or boxing
\`\`\``
          },
        ]
      },
      {
        title: "Method parameters and return values",
        slug: "method-parameters-and-return-values",
        description: "Varargs let a method accept any number of arguments of one type, and while Java can only ever return one value directly, there are clean idiomatic ways to bundle multiple results together. A varargs parameter,...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Varargs let a method accept any number of arguments of one type, and while Java can only ever return one value directly, there are clean idiomatic ways to bundle multiple results together. A varargs parameter, written as \`Type... name\`, lets callers pass zero, one, or many arguments of that type without you needing to overload the method for every possible count. Internally, the compiler simply treats the parameter as an array — inside the method body, \`name\` behaves exactly like \`Type[]\`.

You can even pass an actual array directly to a varargs method instead of listing individual values. The only syntax rule: a varargs parameter must be the last one in the parameter list, and a method can have at most one. For return values, Java only ever lets a method return one value of one declared type — there's no built-in way to return multiple values directly, unlike some languages that support tuples.

When you genuinely need to hand back several related pieces of information, the cleanest modern option is a \`record\` (available since Java 16), which gives you a small, self-documenting, immutable data carrier with almost no boilerplate. Older alternatives include returning an array or \`List\` (only sensible if the values are all the same type) or a small dedicated class. One structural rule the compiler strictly enforces: every possible path through a non-void method must end in a \`return\` (or throw an exception) — if there's any way execution could fall off the end of the method without returning a value, that's a compile error, caught well before you ever run the program.`
          },
          {
            title: "How it works",
            content: `Parameters are the named inputs a method receives, while a return value is the result a non-void method sends back to its caller. Java checks the argument types against the declared parameter types during compilation. A method can have zero parameters, several parameters, or a varargs parameter for a variable number of arguments.

Varargs syntax such as \`int... values\` is handled as an array inside the method. The parameter must be the last parameter, and a method can have only one varargs parameter. This is convenient when the caller naturally has a variable number of values but the method still wants normal indexed array access internally.

A method returns one value directly. When several related results are needed, Java code commonly groups them into an object or record rather than trying to simulate multiple independent return channels. A non-void method must also return a compatible value on every possible path, unless that path cannot continue because it throws an exception.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Varargs
int sum(int... nums) {
    int total = 0;
    for (int n : nums) total += n;
    return total;
}
sum(1, 2, 3);          // works
sum(new int[]{1,2,3}); // also works - varargs IS an array under the hood
// Returning multiple values idiomatically with a record (Java 16+)
record MinMax(int min, int max) {}
MinMax findRange(int[] arr) {
    int min = arr[0], max = arr[0];
    for (int v : arr) { if (v < min) min = v; if (v > max) max = v; }
    return new MinMax(min, max);
}
\`\`\``
          },
        ]
      },
      {
        title: "Pass-by-value in Java",
        slug: "pass-by-value-in-java",
        description: "This is one of the most commonly misunderstood ideas in Java: the language is always pass-by-value, even when it looks like it's passing objects by reference. Java is strictly pass-by-value, with no exceptions —...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `This is one of the most commonly misunderstood ideas in Java: the language is always pass-by-value, even when it looks like it's passing objects by reference. Java is strictly pass-by-value, with no exceptions — there is no true pass-by-reference in Java at all. The confusion comes entirely from what exactly gets copied when the value being passed happens to be a reference.

With primitives, this is intuitive: the actual number is copied, so changing the parameter inside the method has zero effect on the caller's original variable. With objects, what gets copied is the *reference itself* — a handle pointing to the object on the heap — not the object. So the method receives its own independent copy of that handle, but both the caller's copy and the method's copy point to the exact same underlying object.

This is precisely why calling a mutating method on that parameter (like \`list.add(...)\`) is visible back in the caller — you're mutating the one shared object through a valid pointer to it — while *reassigning* the parameter variable itself to point somewhere new only changes the method's own local copy and is completely invisible to the caller. A great way to prove this to yourself is the classic 'failed swap' example: writing a method that tries to swap two object references by reassigning its parameters will not actually swap the caller's variables.

If Java genuinely passed references by reference, reassigning a parameter would rebind the caller's variable too — but it never does, which conclusively demonstrates that the reference itself is passed by value.`
          },
          {
            title: "How it works",
            content: `Java uses pass-by-value for method arguments. For a primitive argument, the value itself is copied into the parameter, so assigning a new value to the parameter cannot change the caller's variable. For a reference argument, the value being copied is the reference. The caller and the parameter therefore hold separate copies of the reference that can point to the same object.

This explains the behavior that often causes confusion. If the method mutates the shared object through its parameter, the caller can observe that mutation because both references identify the same object. If the method reassigns the parameter to a different object, only the parameter's copy of the reference changes, so the caller's reference is unaffected.

The classic failed-swap example makes the rule clear. A method cannot swap the caller's two reference variables simply by reassigning its own parameters. The method would need to return the new values or mutate a shared holder object.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Mutating through a reference IS visible to the caller - same shared object
void addItem(List<String> list) {
    list.add("new");
}
List<String> myList = new ArrayList<>();
addItem(myList);
System.out.println(myList); // [new] - the caller sees the change!
// Reassigning the parameter is NOT visible - only rebinds the local copy
void reassign(List<String> list) {
    list = new ArrayList<>(List.of("replaced"));
}
List<String> original = new ArrayList<>(List.of("original"));
reassign(original);
System.out.println(original); // [original] - completely unchanged!
\`\`\``
          },
          {
            title: "Common mistakes",
            content: `- - Saying 'Java passes objects by reference' — it actually passes the reference by value - - Assuming reassigning a parameter inside a method changes what the caller's variable points to - OOP Fundamentals`
          }
        ]
      },
      {
        title: "Recursion",
        slug: "recursion",
        description: "Recursion is a method calling itself with a base case that eventually stops it — but in Java specifically, deep recursion carries a real risk you should understand before relying on it heavily. A recursive method...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Recursion is a method calling itself with a base case that eventually stops it — but in Java specifically, deep recursion carries a real risk you should understand before relying on it heavily. A recursive method solves a problem by calling itself on a smaller version of that problem, always with a base case that stops the recursion from continuing forever. Every method call — recursive or not — pushes a new stack frame onto the current thread's call stack, holding that specific call's local variables and where to return to once it finishes.

That frame only gets removed once the call returns, which is the mechanical reason recursion has a real memory cost tied directly to how deep it goes. This becomes a genuine, practical concern in Java specifically, because the default thread stack size is relatively small (often somewhere around 512KB to 1MB, depending on the JVM and platform). Recursing tens of thousands of levels deep — say, processing a deeply nested JSON structure or a very long linked list recursively — can exhaust that stack space and throw a \`StackOverflowError\`.

Here's an important thing to know that surprises people coming from functional-programming backgrounds: Java does not perform tail-call optimization. Even if you carefully write a recursive method so the recursive call is the very last thing it does (a 'tail-recursive' shape), the JVM still allocates a brand-new stack frame for every single call — it doesn't collapse them into a loop the way some languages do. This means the common trick of 'just write it tail-recursively and it magically becomes efficient' simply doesn't apply in Java.

If you're worried about depth, converting deep recursion into an explicit loop is generally the safe, reliable fix.`
          },
          {
            title: "How it works",
            content: `Recursion occurs when a method solves a problem by calling itself on a smaller or simpler version of that problem. A correct recursive design needs a base case that stops further calls and a recursive case that moves toward that base case. Without those two parts, the call chain may continue until the JVM cannot allocate another stack frame, producing \`StackOverflowError\`.

Each recursive call has its own parameters and local variables. This creates a chain of stack frames, which is why recursion has a memory cost proportional to the depth of the call chain. When the deepest call reaches its base case, it returns and the previous frame resumes, causing the calls to unwind in reverse order.

Recursion is especially natural for tree structures, divide-and-conquer algorithms, and problems that are recursively defined. It is not automatically better than iteration. If the recursion can become very deep or provides no conceptual benefit, a loop is often safer and easier to reason about.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Simple, safe recursion - bounded, shallow depth
int factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}
// RISKY with large n - Java does NOT optimize tail calls
long sumTo(long n, long acc) {
    if (n == 0) return acc;
    return sumTo(n - 1, acc + n); // still uses a new stack frame every call
}
// sumTo(10_000_000, 0) will very likely throw StackOverflowError
// Iterative version - constant, safe stack usage
long sumToIterative(long n) {
    long acc = 0;
    for (long i = 1; i <= n; i++) acc += i;
    return acc;
}
\`\`\``
          },
        ]
      },
      {
        title: "Packages and imports",
        slug: "packages-and-imports",
        description: "Packages do more than organize files into folders — they create real namespaces and even a genuine access-control boundary that imports have no effect on whatsoever. Packages give you namespacing, letting two...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Packages do more than organize files into folders — they create real namespaces and even a genuine access-control boundary that imports have no effect on whatsoever. Packages give you namespacing, letting two completely different libraries each have their own \`Logger\` class without conflicting, as long as they live in different packages. Less obviously, packages also directly affect access control: 'package-private' access (the default, when you write no access modifier at all) makes a member visible only to other classes within the same package — this is a genuine encapsulation boundary enforced by the compiler, not just an organizational habit.

The package declaration you write at the top of a file must correspond to the actual folder structure the compiled class lives in — \`com.example.util.Helper\` must be compiled to \`com/example/util/Helper.class\` somewhere on the classpath. This is enforced by how class loading works, not merely a stylistic convention you're free to ignore. \`import\` statements, by contrast, exist purely for your convenience while writing code — they let you refer to a class by its short name instead of typing its full path every time.

Critically, imports leave absolutely no trace in the compiled bytecode: the compiler resolves every reference to its fully qualified name at compile time and bakes that in directly, so imports carry zero runtime cost or footprint. One convenience worth knowing: \`import static\` lets you import a static member directly so you can use it unqualified — \`import static java.lang.Math.sqrt;\` then lets you write \`sqrt(4)\` instead of \`Math.sqrt(4)\`. It's genuinely handy for things like test assertions (\`assertEquals\`, \`assertTrue\`), but overusing it broadly can hurt readability by hiding where a method actually comes from.

Also worth noting: everything in \`java.lang\` — \`String\`, \`Object\`, \`Integer\`, and so on — is automatically available in every file without any import at all.`
          },
          {
            title: "How it works",
            content: `A package gives related Java types a namespace and also participates in access control. Two classes with the same simple name can coexist when they belong to different packages because their fully qualified names are different. The package declaration therefore becomes part of a type's identity.

The \`import\` statement is mainly a source-code convenience. It lets you write \`List\` instead of \`java.util.List\` after the compiler has resolved the imported name. An import does not make a class public, does not grant extra permissions, and does not create a runtime dependency by itself. \`java.lang\` types are automatically available without explicit imports.

Packages also define the boundary used by package-private members. A member with no explicit access modifier is accessible to other classes in the same package. This makes package design relevant to encapsulation, not merely directory organization.`
          },
          {
            title: "Example",
            content: `\`\`\`java
package com.example.util;
import java.util.List;                    // regular import
import static java.lang.Math.sqrt;         // static import
public class MathHelper {
    public double hypotenuse(double a, double b) {
        return sqrt(a*a + b*b); // unqualified, thanks to the static import
    }
}
\`\`\``
          },
        ]
      }
    ]
  },
  {
    title: "Control Flow",
    slug: "control-flow",
    description: "Conditional logic and loop constructs used to control program execution.",
    topics: [
      {
        title: "if, else if, and else",
        slug: "if-else-if-and-else",
        description: "An if/else-if/else chain runs its branches in order and stops at the first one that matches — a simple rule, but the order you write your conditions in actually matters a lot. Java checks the conditions in an...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `An if/else-if/else chain runs its branches in order and stops at the first one that matches — a simple rule, but the order you write your conditions in actually matters a lot. Java checks the conditions in an if/else-if/else chain from top to bottom and executes the block belonging to the *first* condition that evaluates to true — every condition after that is skipped entirely, even if it would also have been true. This ordering behavior causes a genuinely common mistake when conditions overlap in range.

Imagine grading scores: if you write \`if (score >= 60) grade = "Pass"; else if (score >= 90) grade = "Excellent";\`, a score of 95 will incorrectly get graded as just "Pass" — because 95 also satisfies \`score >= 60\`, and that's the first condition checked, so the "Excellent" branch never even gets evaluated. The fix is to always check the *most specific* (narrowest) condition first, then work down to the broadest. A second subtlety worth learning as a habit rather than memorizing as a rule: without curly braces, an \`if\` only controls the single statement immediately following it.

If you later come back and add a second line to that block without adding braces, it silently falls *outside* the if — it will run every time, regardless of the condition, which is a bug that's genuinely easy to introduce during a quick edit. The professional habit is to always use braces \`{}\` around if/else bodies, even for a single statement, specifically so future edits are safe by default. One more thing worth knowing: Java's \`if\` condition must be a genuine \`boolean\` expression.

Unlike some C-family languages where a nonzero integer is treated as 'true,' Java simply won't compile \`if (someInt)\` — this removes an entire category of bugs from the language by design.`
          },
          {
            title: "How it works",
            content: `The \`if\` statement chooses whether a block executes based on a boolean condition. An \`else if\` chain evaluates conditions in order and stops when one condition is true, while \`else\` provides the fallback block when none of the preceding conditions matched.

Because conditions are expressions that produce boolean values, they can combine comparisons and logical operators. Short-circuit operators such as \`&&\` and \`||\` are particularly useful when the second condition should only be evaluated when the first condition makes it safe or necessary.

The important design issue is not just syntax but decision structure. Overly long \`if\` chains can become difficult to maintain when many cases are independent. At that point, a \`switch\`, a lookup structure, or polymorphism may express the same decision more clearly. For interview questions, be ready to distinguish condition evaluation from block execution and to identify unreachable or contradictory branches.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int score = 95;
// BUG: order matters - broad conditions checked first swallow the specific ones
if (score >= 60) {
    System.out.println("Pass");       // wrongly matches 95 first!
} else if (score >= 90) {
    System.out.println("Excellent"); // unreachable for any score 90+
}
// Correct: most specific condition first
if (score >= 90) {
    System.out.println("Excellent");
} else if (score >= 60) {
    System.out.println("Pass");
} else {
    System.out.println("Fail");
}
\`\`\``
          },
          {
            title: "Practice",
            content: `Rewrite this buggy chain so all three grades are reachable: \`if (score >= 50) print('Pass'); else if (score >= 80) print('Merit'); else if (score >= 95) print('Distinction');\``
          }
        ]
      },
      {
        title: "switch",
        slug: "switch",
        description: "The switch statement has changed a lot in modern Java — the old fall-through behavior that caused so many bugs is now optional, and switch can do much more than it used to. The classic `switch` (the only form that...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `The switch statement has changed a lot in modern Java — the old fall-through behavior that caused so many bugs is now optional, and switch can do much more than it used to. The classic \`switch\` (the only form that existed before Java 14) works by jumping straight to the matching \`case\` label and then continuing to execute every case *after* it too, unless you explicitly write \`break\`. This 'fall-through' behavior is one of the most notorious sources of subtle bugs in C-family languages — forgetting a single \`break\` silently changes your program's behavior.

It's occasionally used intentionally, to let several case labels share the exact same code, but that's the exception rather than the rule. Java 14 introduced a much better alternative: the switch *expression*, written with an arrow (\`case X -> ...\`). With this form, each case is completely isolated — no fall-through at all, by default — and the entire construct can directly produce a value you assign to a variable or return.

If a particular case needs multiple statements to compute its result, you use the \`yield\` keyword to specify what value that block produces. You can also combine several case labels with commas in one line: \`case MONDAY, TUESDAY -> ...\`. There's a genuine safety benefit here too: when you switch over an \`enum\`, the compiler can verify you've handled every possible value (this is called exhaustiveness checking) — if you later add a new value to that enum and forget to handle it in your switch expression, the compiler will flag it, catching a bug the old switch statement never could.

Java 21 pushed this even further with pattern matching for switch — you can switch based on an object's actual type, and even pull apart ('deconstruct') a record's fields directly in the case label, optionally combined with a \`when\` clause for extra conditions. This turns switch into a genuinely powerful tool for matching against different kinds of data, much closer to what you'd find in modern functional languages.`
          },
          {
            title: "How it works",
            content: `The \`switch\` statement selects behavior based on one selector value and a set of cases. In the traditional form, a matching case begins execution and can continue into later cases unless \`break\` or another control-flow construct stops it. This fall-through behavior is useful in deliberate grouping but is a frequent source of bugs.

Modern Java also supports switch expressions, which produce a value. Arrow-style cases make accidental fall-through less likely, while \`yield\` can return a value from a block-style case. The language has also expanded switch capabilities over time, so the exact syntax available depends on the Java version being targeted.

When choosing switch, think about the kind of decision being modeled. It is well suited to a finite set of discrete alternatives. If the logic depends on complex ranges or unrelated conditions, \`if\` chains may be clearer.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Old style - fall-through risk if you forget 'break'
switch (day) {
    case MONDAY:
    case TUESDAY:
    System.out.println("Early week");
    break; // required to stop here
    default:
    System.out.println("Other");
}
// Modern switch expression (Java 14+) - no fall-through, produces a value
String result = switch (day) {
    case MONDAY, TUESDAY -> "Early week";
    case WEDNESDAY -> {
        String s = "Midweek";
        yield s; // 'yield' hands back the value from a multi-line block
    }
    default -> "Other";
};
// Pattern matching switch (Java 21+)
String describe(Object obj) {
    return switch (obj) {
        case Integer i when i > 0 -> "positive int";
        case Integer i -> "non-positive int";
        case String s -> "string of length " + s.length();
        default -> "unknown";
    };
}
\`\`\``
          },
        ]
      },
      {
        title: "for loop",
        slug: "for-loop",
        description: "Java has two forms of the for loop — the classic counter-based version and the simpler for-each version — and each has situations where it's clearly the better choice. The classic `for` loop follows the pattern `for...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java has two forms of the for loop — the classic counter-based version and the simpler for-each version — and each has situations where it's clearly the better choice. The classic \`for\` loop follows the pattern \`for (initialization; condition; update)\`, giving you full control over exactly how the loop variable starts, when it stops, and how it changes each time. Any of the three parts can technically be left empty — \`for (;;)\` is a perfectly valid way to write an infinite loop — and you can even initialize or update multiple variables at once using commas.

The enhanced for loop, often called 'for-each,' was added to make iterating over collections and arrays simpler: \`for (String s : list)\` reads each item in turn without you having to manage an index variable yourself. Under the hood, this is really just convenient shorthand — for a collection, it automatically calls the collection's iterator and repeatedly asks it for the next item until there isn't one left. The important limitation to learn early: a for-each loop doesn't give you direct access to the index of the current item, and — more importantly — you cannot safely add or remove items from the collection you're looping over while using for-each.

Doing so throws a \`ConcurrentModificationException\`, because the loop detects that the collection changed unexpectedly while it was mid-iteration. If you genuinely need to remove items while looping, use the collection's \`Iterator\` directly and call its own \`remove()\` method, or simply use the convenient \`removeIf()\` method that many collections provide. As a performance note worth knowing: for-each is efficient for every common collection type, including \`LinkedList\`.

But if you instead write a classic indexed loop using \`get(i)\` on a \`LinkedList\`, each call has to walk through the list from one end to reach that index, which makes the whole loop far slower overall than it would be for an \`ArrayList\`. This is a good practical reason to reach for for-each by default unless you specifically need the index.`
          },
          {
            title: "How it works",
            content: `A \`for\` loop is designed for repeated execution where initialization, continuation, and update can be expressed together. The classic form has three parts: the initialization runs once, the condition is checked before each iteration, and the update runs after the loop body. This makes counted loops easy to read because the control variables are visible in one place.

The loop variable normally changes according to the update expression, but Java does not require it to increase by one. You can count down, use different step sizes, or update multiple variables when the problem requires it. The condition determines whether another iteration is allowed, so a mistake there can create an infinite loop or skip the intended final value.

The enhanced \`for\` loop is a different form intended for traversing arrays and iterable collections without explicit index management. Use the classic form when you need an index or custom update logic, and the enhanced form when you simply need each element.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Classic for loop - full control over the loop variable
for (int i = 0, j = 10; i < j; i++, j--) {
    System.out.println(i + "," + j);
}
// Enhanced for-each - simple iteration
List<String> names = new ArrayList<>(List.of("Amy", "Bo", "Cy"));
for (String name : names) {
    System.out.println(name);
}
// WRONG - modifying the list during for-each throws ConcurrentModificationException
// for (String name : names) { if (name.equals("Bo")) names.remove(name); }
// CORRECT - safe removal during iteration
names.removeIf(n -> n.equals("Bo"));
\`\`\``
          },
        ]
      },
      {
        title: "while loop",
        slug: "while-loop",
        description: "A while loop checks its condition before every iteration, which makes it the natural choice whenever you don't know in advance how many times you'll need to loop. A `while` loop is a pre-test loop: Java checks the...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `A while loop checks its condition before every iteration, which makes it the natural choice whenever you don't know in advance how many times you'll need to loop. A \`while\` loop is a pre-test loop: Java checks the condition first, and only enters the loop body if it's true. That means the body might not run at all if the condition is already false the first time it's checked — this is a key difference from \`do-while\`, which always runs the body at least once.

You'll reach for \`while\` naturally whenever the number of iterations depends on something happening at runtime rather than a simple counter — reading lines from a file until you hit the end, retrying a network call until it succeeds or you give up, or processing items in a queue until it's empty. In fact, a \`for\` loop is really just a \`while\` loop with the setup and update steps folded into the header syntax; the choice between them is mostly about which one communicates your intent more clearly.

Use \`for\` when there's an obvious counter; use \`while\` when the loop is driven by a condition instead. The classic beginner mistake with \`while\` loops is forgetting to update whatever variable the condition depends on, which creates an infinite loop. Because the update step isn't baked into the loop syntax the way it is with \`for\`, it's easier to accidentally leave it out, especially once the loop body grows and the state-changing line gets buried among other logic.`
          },
          {
            title: "How it works",
            content: `A \`while\` loop repeats a block as long as its condition remains true. The condition is evaluated before the body, which means the body may execute zero times. This makes \`while\` a natural fit when the number of iterations is not known in advance and depends on some changing state or external input.

The loop must have a path that changes the state relevant to its condition. If nothing can make the condition false, the loop can run indefinitely. This is not inherently wrong—servers and event-processing loops may intentionally run for the lifetime of a process—but accidental infinite loops are usually caused by forgetting an update.

When reading a \`while\` loop, identify the initial condition, the state changed inside the body, and the condition that eventually stops the loop. This three-part mental model makes debugging much easier than simply tracing individual iterations.`
          },
          {
            title: "Example",
            content: `\`\`\`java
// Pre-test: might run zero times if connected is already true
int retries = 0;
while (retries < maxRetries && !connected) {
    connected = tryConnect();
    retries++;
}
// Driven by a condition, not a fixed counter
String line;
while ((line = reader.readLine()) != null) {
    process(line);
}
\`\`\``
          },
        ]
      },
      {
        title: "do-while loop",
        slug: "do-while-loop",
        description: "do-while flips the order of a while loop: it runs the body first and checks the condition afterward, guaranteeing at least one execution. `do-while` is a post-test loop — the body always executes at least once before...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `do-while flips the order of a while loop: it runs the body first and checks the condition afterward, guaranteeing at least one execution. \`do-while\` is a post-test loop — the body always executes at least once before the condition is even evaluated. Syntactically, it requires a semicolon after the closing \`while(condition)\`, which is easy to forget the first time you write one. The clearest real-world case for \`do-while\` is anything where you need a result from the body before you can meaningfully check whether to continue.

The textbook example is a menu-driven program: you have to display the menu and read the user's choice at least once before you can check 'did they choose to quit?' A regular \`while\` loop would need something to check *before* the first pass even happens, which doesn't exist yet. In everyday practice, \`do-while\` is the least commonly used of the three loop types, simply because most iteration naturally fits a pre-test model where you want to check the condition before doing anything. But recognizing the specific situation where you genuinely need 'run once, then decide whether to continue' will save you from writing an awkward workaround with a regular \`while\` loop and a duplicated priming step before it.`
          },
          {
            title: "How it works",
            content: `A \`do-while\` loop differs from \`while\` because the body executes before the condition is tested. Therefore the body always runs at least once. This is useful for operations such as displaying a menu, accepting input, and then deciding whether the user should be prompted again.

The condition appears at the bottom of the loop, which changes the control-flow reasoning. The first execution is unconditional with respect to that loop condition; only subsequent executions depend on it. Developers should therefore ensure that running the body once is valid even when the eventual condition would be false.

The same state-transition principle used with \`while\` applies here: something inside the loop normally changes the state used by the condition. A \`do-while\` is preferable when 'perform once, then decide whether to repeat' is the natural requirement. Otherwise, a normal \`while\` may communicate the intent more directly.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int choice;
do {
    System.out.println("1. Add 2. Remove          3. Quit");
    choice = scanner.nextInt();
    handle(choice);
} while (choice != 3); // the menu always shows at least once
\`\`\``
          },
        ]
      },
      {
        title: "break and continue",
        slug: "break-and-continue",
        description: "break and continue give you fine-grained control over loop execution, and labeled versions of both let you control outer loops from deep inside nested ones. `break` exits the nearest enclosing loop (or `switch`)...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `break and continue give you fine-grained control over loop execution, and labeled versions of both let you control outer loops from deep inside nested ones. \`break\` exits the nearest enclosing loop (or \`switch\`) immediately. \`continue\` skips the rest of the current iteration and jumps straight to the next one — for a \`for\` loop, that means running the update step and then re-checking the condition. Both, by default, only affect the loop they're directly written inside. That default becomes a real limitation with nested loops.

Imagine searching a 2D grid for a value: once you find it in the inner loop, a plain \`break\` only stops the inner loop — the outer loop keeps running unnecessarily. Java's solution, instead of a \`goto\` (which the language deliberately doesn't have), is a labeled break or continue: you put a label before the outer loop, and \`break outerLabel;\` exits that specific loop directly, jumping out of every level of nesting in between in one step. Labeled break/continue is a legitimate, idiomatic Java feature for this exact nested-search pattern — it's not a hack.

That said, it's used sparingly in real code, because heavily nested loops with labeled jumps can get hard to follow. A common alternative that's often cleaner: extract the nested search into its own method and simply \`return\` as soon as you find what you're looking for — \`return\` naturally exits every level of nesting at once, without needing a label at all.`
          },
          {
            title: "How it works",
            content: `The \`break\` statement exits the nearest enclosing loop or switch immediately. The \`continue\` statement skips the remainder of the current loop iteration and proceeds to the next iteration's condition or update phase, depending on the loop form.

These statements are control-flow shortcuts, so their effect is easiest to understand by identifying the exact construct they target. A \`break\` inside a nested loop exits the inner loop, not all loops surrounding it. Java also supports labeled \`break\` and \`continue\` for explicitly targeting an outer loop, although labels should be used sparingly because they can make control flow harder to follow.

A common mistake is using \`continue\` before the state update needed to make a loop progress. That can create an infinite loop. The safest approach is to verify what code will be skipped and whether the next iteration still has a path toward termination.`
          },
          {
            title: "Example",
            content: `\`\`\`java
int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};
int target = 5;
outer:
for (int i = 0; i < grid.length; i++) {
    for (int j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == target) {
            break outer; // exits BOTH loops immediately
        }
    }
}
// Often cleaner: extract to a method and just return
boolean contains(int[][] g, int target) {
    for (int[] row : g) {
        for (int v : row) {
            if (v == target) return true; // exits everything naturally
        }
    }
    return false;
}
\`\`\``
          },
        ]
      }
    ]
  },
  {
    title: "OOP Fundamentals",
    slug: "oop-fundamentals",
    description: "Object-oriented building blocks: overloading, static and final members, access control, classes, objects, and constructors.",
    topics: [
      {
        title: "Method overloading",
        slug: "method-overloading",
        description: "Overloading lets you give several methods the same name as long as their parameter lists differ — and the compiler decides which one to call using a well-defined priority order. Overloading means defining multiple...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Overloading lets you give several methods the same name as long as their parameter lists differ — and the compiler decides which one to call using a well-defined priority order. Overloading means defining multiple methods in the same class with the same name but different parameter lists — different types, different number of parameters, or a different order. It's resolved entirely at compile time based on the types of the arguments you pass, which is why it's sometimes called 'compile-time polymorphism,' in contrast to overriding, which is resolved at runtime instead.

The compiler works through a specific sequence of phases when deciding which overload matches your call: it first checks for an exact type match with no conversion needed at all; if there isn't one, it allows widening primitive conversions (like \`int\` to \`long\`); if still nothing matches, it allows autoboxing/unboxing; and only as an absolute last resort will it consider a varargs method. Java always picks the single most specific applicable method — if two overloads are equally applicable and neither is clearly more specific, the compiler refuses to guess and reports an 'ambiguous method call' error instead.

One tricky case worth knowing: passing \`null\` directly as an argument can be genuinely ambiguous if two overloads take unrelated reference types, like \`foo(String)\` and \`foo(Integer)\` — the compiler can't tell which one you mean, and you'll need an explicit cast like \`foo((String) null)\` to clarify your intent.`
          },
          {
            title: "How it works",
            content: `Method overloading allows multiple methods in the same class to use the same name when their parameter lists are different. The compiler chooses the applicable overload at compile time based on the number, order, and types of the arguments. The return type alone is not enough to distinguish two methods, so changing only the return type creates a duplicate method signature.

Overload resolution follows Java's conversion rules. An exact type match is generally preferred, followed by compatible widening conversions and other applicable mechanisms such as boxing and varargs. This is why adding an overload can sometimes change which method a previously valid call selects. Calls involving \`null\` can also become ambiguous when multiple reference-type overloads are equally specific.

Overloading is useful when operations are conceptually the same but accept different inputs. The overloads should remain semantically consistent; creating many unrelated meanings behind one method name can make APIs harder to understand.`
          },
          {
            title: "Example",
            content: `\`\`\`java
void print(int x) { System.out.println("int: " + x); }
void print(double x) { System.out.println("double: " + x); }
void print(String x) { System.out.println("String: " + x); }
print(5);       // "int: 5"
print(5.0);     // "double: 5.0"
print("hi");    // "String: hi"
void ambiguous(String s) {}
void ambiguous(Integer i) {}
// ambiguous(null); // COMPILE ERROR - ambiguous! Needs an explicit cast to disambiguate
\`\`\``
          },
        ]
      },
      {
        title: "static methods and fields",
        slug: "static-methods-and-fields",
        description: "static members belong to the class itself rather than any individual object — useful for shared state and utility methods, but easy to misuse if you're not careful. A `static` member belongs to the class as a whole,...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `static members belong to the class itself rather than any individual object — useful for shared state and utility methods, but easy to misuse if you're not careful. A \`static\` member belongs to the class as a whole, not to any specific object of that class. There's exactly one copy, shared by every instance, loaded into memory once when the class is first loaded — no matter how many objects you create afterward, or even if you create none at all.

This has a direct consequence for static methods: since there's no guaranteed instance behind a static method call, a static method has no \`this\` reference and therefore cannot directly access instance (non-static) fields or call instance methods — there might be zero objects of that class in existence when the static method runs. It can, however, freely use other static members, and it can operate on a specific instance if one is explicitly passed in as a parameter. Static members shine for a handful of legitimate use cases: constants (paired with \`final\`), utility methods that don't need any object state (\`Math.sqrt()\`, \`Integer.parseInt()\` are all static), and shared counters or caches meant to be common across every instance.

But mutable static fields are effectively global state, and that comes with real downsides — they make unit tests harder to write reliably (since state can leak between tests unless carefully reset) and create hidden coupling between unrelated parts of a codebase that both happen to touch the same static field. As you grow as a Java developer, you'll notice modern, testable designs lean toward passing dependencies explicitly (dependency injection) rather than reaching for shared static state.`
          },
          {
            title: "How it works",
            content: `A \`static\` member belongs to the class rather than to an individual object. A static field therefore represents shared state, while a static method can be called without an instance. This is why utility methods such as \`Math.sqrt()\` can operate without a particular \`Math\` object.

A static method has no implicit \`this\` reference because there is no required current instance. It can directly access other static members, but it cannot directly read an instance field or call an instance method without first being given an object. An instance method, by contrast, can access both instance and static members.

Static mutable fields should be treated carefully because they behave like shared global state within the application. They can introduce hidden coupling and make tests order-dependent. \`static final\` constants and genuinely stateless utility operations are much easier to reason about than arbitrary shared mutable state.`
          },
          {
            title: "Example",
            content: `\`\`\`java
class Counter {
    static int totalInstances = 0;           // shared across ALL Counter objects
    int id;
    Counter() {
        id = ++totalInstances;                // an instance method CAN touch static state
    }
    static int getTotal() {
        return totalInstances;                // fine - static accessing static
        // return id;                        // COMPILE ERROR - no 'this' available here
    }
}
\`\`\``
          },
        ]
      },
      {
        title: "final variables and methods",
        slug: "final-variables-and-methods",
        description: "final means something slightly different depending on whether you apply it to a variable, a method, or a class — worth learning all three uses distinctly. On a **variable**, `final` means it can be assigned exactly...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `final means something slightly different depending on whether you apply it to a variable, a method, or a class — worth learning all three uses distinctly. On a **variable**, \`final\` means it can be assigned exactly once and never reassigned afterward. For object references, this only locks the reference itself — it says nothing about whether the object it points to can still be changed internally.

A \`final\` local variable also plays a special role with lambdas and anonymous classes: only a \`final\` (or 'effectively final,' meaning never reassigned even without the keyword) local variable can be used inside one, because the closure captures its value at creation time, and allowing later reassignment would create confusion about which value the closure should actually see. On a **method**, \`final\` prevents any subclass from overriding it. This is used when a base class needs to guarantee that a specific piece of behavior can never be changed by a subclass — protecting an invariant the rest of the class relies on staying exactly as written.

On a **class**, \`final\` prevents it from being subclassed at all. \`String\` and all the primitive wrapper classes like \`Integer\` are \`final\` for exactly this reason — it guarantees their behavior (including their immutability) can never be subtly altered by an unexpected subclass, which is important both for correctness and for the strong optimization assumptions the JVM can make about them.`
          },
          {
            title: "How it works",
            content: `The \`final\` modifier means different things depending on what it is applied to. A final variable can be assigned only once. A final method cannot be overridden by a subclass. A final class cannot be subclassed. These are compile-time constraints that communicate and enforce design intent.

For references, \`final\` freezes the variable's reference, not necessarily the object. A \`final List<String>\` can still have elements added if the list itself is mutable; the variable simply cannot be pointed to a different list. This distinction is essential when discussing immutability.

Final fields also interact with object initialization. They must be definitely assigned, either at the declaration, in an initializer, or in every applicable constructor path. Using \`final\` can make state easier to reason about because the compiler prevents accidental reassignment, but it does not automatically make a complete object immutable.`
          },
          {
            title: "Example",
            content: `\`\`\`java
final int MAX = 100;
// MAX = 200; // COMPILE ERROR - can't reassign a final variable
final List<String> list = new ArrayList<>();
list.add("ok"); // fine - mutating the object, not reassigning the reference
// list = new ArrayList<>(); // COMPILE ERROR
class Base {
    final void criticalMethod() { /* cannot ever be overridden */ }
}
// class Sub extends Base { void criticalMethod() {} } // COMPILE ERROR
final class ImmutablePoint { /* cannot be subclassed at all, just like String */ }
\`\`\``
          },
        ]
      },
      {
        title: "Access modifiers",
        slug: "access-modifiers",
        description: "Java has exactly four access levels forming a clear widening hierarchy — and one of them, protected, has a genuinely subtle rule about how it behaves across packages. The four levels, from most to least restrictive,...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Java has exactly four access levels forming a clear widening hierarchy — and one of them, protected, has a genuinely subtle rule about how it behaves across packages. The four levels, from most to least restrictive, are: \`private\` (visible only inside the declaring class, including any nested classes within it), package-private (no modifier at all — visible to any class in the same package), \`protected\` (package-private, plus visible to subclasses even in a different package, with a real nuance below), and \`public\` (visible from anywhere).

The nuance with \`protected\` is genuinely subtle and worth learning carefully: it grants access to subclasses in a different package, but only when you access the member through a reference of the subclass's own type (or a further subtype) — not through a plain reference typed as the original superclass. In practice, if class \`B extends A\` lives in a different package than \`A\`, code inside \`B\` can access \`A\`'s protected member through \`this\` or through another \`B\`-typed variable, but not through a variable simply typed as \`A\` from outside \`A\`'s own package.

This restriction exists specifically to prevent \`protected\` access from leaking to anyone who merely holds a reference to the superclass — it's meant to be usable only within the actual inheritance relationship. A closely related rule about overriding: when you override a method, you're only ever allowed to widen its access level, never narrow it. Overriding a \`protected\` method with a \`private\` one, for example, is a compile error — because that would silently break the guarantee that code holding a superclass reference can always call that method, regardless of which actual subtype the object turns out to be at runtime.`
          },
          {
            title: "How it works",
            content: `Java's access modifiers control which code can see a class or member. \`public\` provides the broadest normal visibility, \`private\` restricts access to the declaring class, \`protected\` permits access within the package and provides additional rules for subclasses, and package-private access applies when no modifier is written.

The protected rule is especially important in cross-package inheritance. A subclass can access inherited protected members through the appropriate subclass context, but code in another package cannot simply treat protected access as public access to any superclass instance. This is why a simplistic 'protected means subclasses can access it anywhere' explanation is incomplete.

Access control is part of encapsulation. Keeping implementation details private and exposing a smaller public API reduces coupling and gives a class more freedom to change internally. When overriding a method, the subclass cannot reduce the visibility of the inherited method because callers that could access the superclass method must remain able to access the override.`
          },
          {
            title: "Example",
            content: `\`\`\`java
package pkgA;
public class A {
    protected void greet() { System.out.println("hi"); }
}
package pkgB;
import pkgA.A;
public class B extends A {
    void test(A a, B b) {
        this.greet();     // OK - via the subclass instance
        b.greet();        // OK - via a B-typed reference
        // a.greet();       // COMPILE ERROR - via a plain A-typed reference from outside pkgA
    }
}
// Overriding can widen access, never narrow it
class Base { protected void method() {} }
class Sub extends Base {
    // private void method() {} // COMPILE ERROR - narrows protected to private
    public void method() {}      // OK - widening is always allowed
}
\`\`\``
          },
        ]
      },
      {
        title: "Object-oriented programming basics",
        slug: "object-oriented-programming-basics",
        description: "Encapsulation, inheritance, polymorphism, and abstraction are the four pillars of OOP — and each one maps to a specific, concrete Java feature worth connecting explicitly. **Encapsulation** means bundling data...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Encapsulation, inheritance, polymorphism, and abstraction are the four pillars of OOP — and each one maps to a specific, concrete Java feature worth connecting explicitly. **Encapsulation** means bundling data together with the methods that operate on it, while restricting direct access to that internal state. In Java this is achieved with \`private\` fields exposed through carefully controlled \`public\` getters and setters, or more compactly through \`record\` types for simple, immutable data carriers. **Inheritance** lets one class acquire the fields and methods of another using \`extends\`, modeling 'is-a' relationships and enabling code reuse.

Java deliberately allows only single inheritance for classes (one direct superclass) while allowing a class to implement multiple interfaces — a design choice made specifically to avoid the classic 'diamond problem' ambiguity that complicates languages permitting full multiple inheritance of classes. **Polymorphism** is the ability for a single interface or reference type to behave differently depending on the actual underlying implementation. Java expresses this in two distinct ways: overloading (multiple methods with the same name but different parameters, resolved at compile time) and overriding (a subclass providing its own version of an inherited method, resolved dynamically at runtime based on the object's actual type). **Abstraction** means exposing only the essential behavior of something while hiding the implementation details behind it.

Java achieves this through \`abstract\` classes and \`interface\`s, letting other code depend on a contract rather than a specific concrete implementation — this is exactly why well-designed code prefers to work with the \`List\` interface rather than committing directly to \`ArrayList\`, since it keeps the door open to swap implementations later without touching the calling code.`
          },
          {
            title: "How it works",
            content: `Object-oriented programming organizes software around objects that combine state and behavior. Encapsulation keeps related data and operations together while controlling direct access. Abstraction exposes the important contract without requiring callers to know implementation details. Inheritance allows a class to derive from another class, and polymorphism lets code work with a general type while the actual implementation varies.

These ideas map directly to Java features. Private fields and methods support encapsulation; interfaces and abstract classes provide contracts and abstraction; \`extends\` and \`implements\` express inheritance relationships; and method overriding provides runtime polymorphic behavior. Java allows a class to extend one class but can implement multiple interfaces, which encourages composition of capabilities without multiple class inheritance.

The most important practical lesson is that OOP is not merely about creating many classes. Good object-oriented design assigns responsibilities clearly, protects invariants, and lets callers depend on stable abstractions. A class should expose what other code needs while keeping unnecessary implementation details private.`
          },
        ]
      },
      {
        title: "Classes and objects",
        slug: "classes-and-objects",
        description: "A class is a blueprint that exists once at compile time; an object is a concrete instance built from that blueprint at runtime — and the exact order operations happen in during object creation matters more than you'd...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `A class is a blueprint that exists once at compile time; an object is a concrete instance built from that blueprint at runtime — and the exact order operations happen in during object creation matters more than you'd expect. A class describes what fields and behavior its instances will have, while an object is an actual, independent entity built from that blueprint and allocated on the heap when the program runs. You can create as many objects from one class as you like, each with its own separate copy of instance fields, while all of them share the exact same method implementations and class-level metadata.

Object creation with \`new\` follows a specific, learnable sequence: first, memory is allocated on the heap for the object's fields; second, every field is set to its default value (0, null, or false) as a starting baseline; third, field initializers and instance initializer blocks run in the exact order they appear in the source code; and finally, the constructor's own body executes. One detail that ties this together: if a constructor doesn't explicitly start with a call to \`this(...)\` or \`super(...)\`, the compiler automatically inserts a call to the superclass's no-argument constructor as the very first thing that happens — meaning the entire superclass construction process (including its own field initializers) completes before the subclass's own field initializers even begin.

This ordering explains a subtle but real bug pattern worth remembering: calling an overridable method from inside a constructor is risky, because if a subclass overrides that method, its override will run during the superclass's construction phase — potentially before the subclass has initialized any of its own fields yet, leading the override to operate on incomplete, default state without any obvious warning.`
          },
          {
            title: "How it works",
            content: `A class defines the structure and behavior that its instances can have, while an object is a runtime instance of that class. Instance fields belong to each object, so two objects created from the same class can hold different state. Instance methods are defined by the class and can operate on whichever object is the receiver of the call.

Creating an object with \`new\` involves more than simply allocating memory. The object receives default field values, initialization logic is applied, and a constructor runs to establish the intended initial state. Understanding this sequence is useful when fields have initializers or initializer blocks.

References make object usage flexible. A variable can have a superclass or interface type while referring to a more specific object, which is the foundation for polymorphism. The class describes the available contract at compile time, while the actual object determines which overridden instance implementation executes at runtime.`
          },
          {
            title: "Example",
            content: `\`\`\`java
class Base {
    Base() {
        System.out.println("Base constructor");
        init(); // risky - calls a potentially-overridden method during construction
    }
    void init() { System.out.println("Base init"); }
}
class Sub extends Base {
    private String name = "ready"; // not yet assigned when Base() runs!
    Sub() {
        System.out.println("Sub constructor, name=" + name);
    }
    @Override
    void init() {
        System.out.println("Sub init, name=" + name); // prints null - field not initialized yet!
    }
}
// new Sub() prints: Base constructor -> Sub init, name=null -> Sub constructor, name=ready
\`\`\``
          },
        ]
      },
      {
        title: "Constructors",
        slug: "constructors",
        description: "Constructors have a few strict rules around chaining and defaults that Java enforces — knowing them upfront avoids some genuinely confusing compile errors later. A constructor shares its name with the class, has no...",
        estimatedMinutes: 15,
        sections: [
          {
            title: "What it means",
            content: `Constructors have a few strict rules around chaining and defaults that Java enforces — knowing them upfront avoids some genuinely confusing compile errors later. A constructor shares its name with the class, has no return type at all (not even \`void\`), and can be overloaded to support multiple ways of creating an object. If a class defines no constructors whatsoever, the compiler automatically supplies a single, public, no-argument default constructor that does essentially nothing but call the superclass's constructor.

The important catch: this free default constructor only appears when you define *zero* constructors yourself — the moment you write even one constructor of your own, that automatic one disappears entirely, and you'll need to write a no-arg constructor explicitly if you still want one. Constructors can chain to each other in two directions: \`this(...)\` calls a different constructor within the *same* class (useful for avoiding duplicated setup logic across several overloaded constructors), and \`super(...)\` calls a constructor in the *parent* class.

Both must be the very first statement in the constructor if used, and you can never use both \`this(...)\` and \`super(...)\` together in the same constructor, since that would attempt two separate, conflicting initialization paths for the same object. If you write neither, the compiler quietly inserts a call to the parent's no-argument constructor for you. This has a real, practical consequence worth remembering: if a superclass only defines constructors that require arguments — with no no-argument constructor available at all — then every single subclass constructor *must* explicitly call \`super(...)\` with matching arguments.

The compiler's usual automatic insertion of a no-arg \`super()\` call simply fails to compile in that situation, since there's no such constructor to call, forcing you to write the chain explicitly.`
          },
          {
            title: "How it works",
            content: `A constructor initializes a newly created object. It has the same name as its class and no return type, and it runs as part of object creation. If a class declares no constructor, Java may provide a default no-argument constructor, but that automatic constructor disappears once the class declares another constructor.

Constructor chaining is central to inheritance. A constructor can call another constructor in the same class with \`this(...)\`, or it can invoke a superclass constructor with \`super(...)\`. A constructor invocation must occur as the first statement in the constructor body. If no explicit superclass constructor call is written, Java attempts to invoke the superclass's no-argument constructor.

Constructors should establish valid initial state rather than performing unrelated work. In a class hierarchy, each constructor is responsible for initializing its own part of the object, while constructor chaining ensures superclass initialization occurs before subclass-specific initialization. This is why a missing accessible superclass no-argument constructor can cause a subclass constructor to fail at compile time.`
          },
          {
            title: "Example",
            content: `\`\`\`java
class Vehicle {
    String type;
    Vehicle(String type) { this.type = type; } // no no-arg constructor exists here
}
class Car extends Vehicle {
    int wheels;
    Car(String type) {
        super(type);        // REQUIRED - there's no implicit super() possible
        this.wheels = 4;
    }
    Car() {
        this("sedan");       // chains to the other Car constructor above
    }
}
// class Motorbike extends Vehicle { Motorbike() {} } // COMPILE ERROR - missing required super(
type) call
\`\`\``
          },
        ]
      }
    ]
  }
];

const coreJavaCategory: CategorySeed = {
  name: "Core Java",
  slug: "core-java",
  description: "A structured Core Java curriculum covering Java fundamentals, control flow, arrays, methods, packages, the JVM model, and object-oriented programming with explanations, examples, and practice tasks.",
  icon: "JAVA",
  sortOrder: 1,
  paths: [
    {
      name: "Core Java",
      slug: "core-java",
      description: "Build a strong Core Java foundation from language basics through object-oriented programming.",
      level: StudyLevel.BEGINNER,
      modules,
    },
  ],
};

async function ensureCategory(categorySeed: CategorySeed) {
  const category = await prisma.studyCategory.upsert({
    where: { slug: categorySeed.slug },
    update: {
      name: categorySeed.name,
      description: categorySeed.description,
      icon: categorySeed.icon,
      sortOrder: categorySeed.sortOrder,
      isPublished: true,
    },
    create: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      sortOrder: categorySeed.sortOrder,
      isPublished: true,
    },
  });
  for (let pathIndex = 0; pathIndex < categorySeed.paths.length; pathIndex += 1) {
    const pathSeed = categorySeed.paths[pathIndex];
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: category.id, slug: pathSeed.slug } },
      update: {
        name: pathSeed.name,
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
      for (let topicIndex = 0; topicIndex < (moduleSeed.topics ?? []).length; topicIndex += 1) {
        const topicSeed = moduleSeed.topics![topicIndex];
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
        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex += 1) {
          const section = topicSeed.sections![sectionIndex];
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
}

async function main() {
  await ensureCategory(coreJavaCategory);
  const moduleCount = modules.length;
  const topicCount = modules.reduce((total, module) => total + (module.topics?.length ?? 0), 0);
  const sectionCount = modules.reduce((total, module) => total + (module.topics ?? []).reduce((topicTotal, topic) => topicTotal + (topic.sections?.length ?? 0), 0), 0);
  console.log(`Core Java seed completed: ${moduleCount} modules, ${topicCount} topics, ${sectionCount} sections`);
}

main()
  .catch((error) => {
    console.error("Core Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

