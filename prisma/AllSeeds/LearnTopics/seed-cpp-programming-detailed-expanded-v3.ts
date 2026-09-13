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
};

const categorySeed: CategorySeed = {
  name: "C++ Programming",
  slug: "cpp-programming",
  description: "A structured learning path covering C++ fundamentals, object-oriented programming, generic programming, STL, memory, files, exceptions, concurrency, and system-level topics.",
  icon: "💻",
  sortOrder: 1,
};

const paths: PathSeed[] = [
{
  name: "Beginner",
  slug: "beginner",
  description: "Learn C++ at the beginner level with progressive, practical lessons focused on understanding and writing code.",
  level: StudyLevel.BEGINNER,
  modules: [
    {
      title: "C++ Foundations",
      slug: "c-foundations",
      description: "Learn c++ foundations through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Overview",
          slug: "01-overview",
          description: "Understand the C++ language, its programming styles, core ecosystem, and the mental model needed for writing reliable programs.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "C++ is easiest to understand when you separate three layers: the language rules, the standard library, and the toolchain that turns source code into a running program. The language gives you types, expressions, classes, templates, object lifetime, and control flow. The library gives you ready-made facilities such as strings, containers, algorithms, streams, smart pointers, and time utilities. The compiler and linker turn those pieces into executable machine code.\n\nC++ also supports several styles at once. Procedural code is useful for straightforward transformations, object-oriented design is useful when state and invariants belong together, and generic programming is useful when the same algorithm should work with many types. Good C++ design is not about using every feature; it is about choosing the smallest abstraction that makes the program clear and safe.\n\nA strong beginner mental model is to ask four questions for every program: What data exists? Who owns that data? What operations are allowed? How long does each object remain valid? These questions become increasingly important as you move from simple variables to classes, dynamic resources, templates, and concurrency.\n\nA useful way to make this model concrete is to follow one value through the whole program. A value starts with a type, is stored in an object, is passed through expressions or functions, and eventually reaches an output or another component. The compiler uses the type information to reject many invalid operations before the program runs, while runtime behavior still depends on object lifetime, resource ownership, and program logic. C++ therefore rewards deliberate design rather than treating syntax as the main goal.\n\nThe language also gives programmers choices that have different costs. A direct value is often simpler than a pointer, a standard container is usually safer than manual allocation, and a small class can be preferable to a large inheritance hierarchy. Learning C++ means learning these trade-offs gradually. Start with values and functions, then introduce references, classes, templates, and lower-level facilities when the problem actually benefits from them."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string item = \"Keyboard\";\n    int quantity = 3;\n\n    std::cout << item << \" x \" << quantity << '\\n';\n    return 0;\n}\n```\nThis small program shows the three core pieces working together: a type-safe object, a standard-library string, and formatted output."
            },
            {
              title: "Practical use",
              content: "Use this foundation to decide whether a problem is best represented with functions, classes, templates, or a combination of them."
            }
          ]
        },
        {
          title: "Environment Setup",
          slug: "02-environment-setup",
          description: "Learn the C++ development workflow, compilers, source files, linking, build tools, and how to work with diagnostics.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "A C++ program passes through a toolchain rather than running directly from the source file. The compiler parses the source, checks types and language rules, and generates machine-oriented output. Multiple translation units can then be combined by the linker. Headers commonly provide declarations needed while compiling a source file, while definitions are compiled into one or more translation units.\n\nWhen learning, keep the workflow deliberately small: create one `.cpp` file, compile it, read the first useful diagnostic, correct the program, and run it. Compiler messages are part of the learning process. A warning can indicate a conversion, unused value, or other suspicious behavior even when the program technically compiles.\n\nAs projects grow, a build system such as CMake can record source files, compiler options, libraries, and build targets. The important concept is that a successful build is a repeatable process rather than a collection of commands remembered by hand.\n\nThe important part of setup is understanding what happens between editing a `.cpp` file and seeing output. The preprocessor handles directives such as includes, the compiler translates each translation unit and checks language rules, and the linker resolves references between compiled units and libraries. A failure at each stage has a different character: preprocessing problems involve directives and included content, compiler problems involve source-language rules and types, and linker problems often involve missing or mismatched definitions.\n\nFor learning, compile small programs frequently. Use a modern language standard such as C++17 or newer when your project allows it, and enable useful warnings. Warnings often expose suspicious conversions, unreachable logic, or other mistakes before they become runtime bugs. A repeatable build command also matters because it makes experiments reproducible instead of depending on IDE-specific settings."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int temperature = 24;\n    std::cout << \"Temperature: \" << temperature << \" C\\n\";\n    return 0;\n}\n```\nCompile it as a single translation unit first. Once it works, move the temperature logic into another source file to understand the compile-and-link workflow."
            },
            {
              title: "Practical use",
              content: "Practice compiling one file, then two files, and deliberately introduce a compiler error so you learn to read diagnostics."
            }
          ]
        },
        {
          title: "Basic Syntax",
          slug: "03-basic-syntax",
          description: "Learn declarations, statements, expressions, blocks, identifiers, includes, main(), and the syntax conventions used throughout C++.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "C++ syntax describes how declarations, expressions, statements, functions, and blocks are assembled into a valid program. Braces establish blocks, semicolons terminate many statements, and identifiers are case-sensitive. The compiler uses this structure to determine what each piece of source code means.\n\nIt is useful to distinguish syntax from semantics. A syntactically valid expression can still perform the wrong operation. For example, an arithmetic expression may compile but use integer division when a fractional result was intended. Learning C++ therefore requires asking not only “does this compile?” but also “what does this expression actually evaluate to?”\n\nFormatting is not merely cosmetic. Consistent indentation makes ownership, nesting, conditions, and lifetime boundaries visible. This becomes especially valuable when reading templates, exception paths, or deeply nested control flow.\n\nC++ syntax is easier to learn when you see a program as a hierarchy. A translation unit contains declarations and definitions; functions contain statements; statements contain expressions; and blocks group related statements. Braces therefore do more than improve formatting: they define the structure of control flow and can introduce a narrower scope.\n\nDeclarations tell the compiler what an entity is, while definitions provide the entity itself where required. For example, a function can be declared before `main` and defined later. Expressions produce values or perform operations, while statements use those expressions to control program behavior. Once these roles are clear, compiler diagnostics become easier to interpret because you can ask whether the problem is a missing declaration, invalid expression, malformed statement, or incorrect block structure.\n\nUse consistent indentation, meaningful names, and small functions from the beginning. These habits make syntax errors and logical mistakes much easier to locate."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int boxes = 7;\n    int itemsPerBox = 12;\n    int total = boxes * itemsPerBox;\n\n    std::cout << \"Total items: \" << total << '\\n';\n    return 0;\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use clean syntax and formatting as the base for every later C++ topic."
            }
          ]
        },
        {
          title: "Comments in C++",
          slug: "04-comments-in-c",
          description: "Learn how to write useful comments that explain intent, constraints, invariants, and non-obvious design decisions.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Comments are part of the communication layer of a C++ program. The compiler does not execute them, so their value comes from helping another developer understand intent, constraints, invariants, or non-obvious decisions.\n\nThe most useful comments explain why the code has a particular shape. A comment such as “increment i” adds little because the statement already shows that. A comment explaining that an index is intentionally retained because it corresponds to an external record is much more valuable.\n\nComments should not become a second, outdated version of the program. If implementation changes, a comment that describes old behavior can actively mislead the reader. Prefer clear names and simple code first, then use comments for the reasoning that cannot be inferred easily from the code itself.\n\nComments are most useful when they preserve knowledge that the code alone cannot easily communicate. Examples include why a limit exists, why an unusual algorithm was selected, what external constraint a function assumes, or what invariant must remain true. Comments should not replace clear naming or structure; if the code is difficult to understand because a function is enormous, adding many comments is usually less effective than splitting the function.\n\nComments can also become dangerous when they describe behavior that is no longer true. Treat important comments as part of the maintenance responsibility of the code. When an assumption changes, update the comment at the same time.\n\nFor public APIs, documentation comments can describe parameters, return values, ownership expectations, exceptions, and constraints. For internal code, short comments should usually explain intent. A reader should be able to understand what the program does from the code and use comments to understand why a non-obvious choice was made."
            },
            {
              title: "Example",
              content: "```cpp\n// Explain why the cache limit exists rather than repeating what the syntax does.\nconstexpr int CacheLimit = 250;\n```\nThe comment adds design intent; the constant supplies the actual value."
            },
            {
              title: "Practical use",
              content: "Document invariants and non-obvious design decisions in production code."
            }
          ]
        }
      ]
    },
    {
      title: "Types and Variables",
      slug: "types-and-variables",
      description: "Learn types and variables through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Data Types",
          slug: "05-data-types",
          description: "Understand built-in types, enumerations, aliases, numeric representation, and how type choice affects program behavior.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "A type determines what values an object can represent and which operations are valid for those values. Built-in types such as integers, floating-point values, `bool`, and character types provide the foundation, while classes, structures, enumerations, arrays, and templates allow richer models.\n\nDo not assume that every numeric type has the same size on every platform. When exact representation matters, choose an appropriate fixed-width type such as `std::int32_t`, and when storage size itself matters, inspect it with `sizeof`. Type selection should reflect meaning and range rather than habit.\n\nEnumerations are particularly useful when a variable represents a finite set of states. `enum class` keeps enumerator names scoped and reduces accidental conversions, making state-heavy programs easier to reason about.\n\nA type is not merely a label; it determines what values an object can represent, which operations are meaningful, and how expressions involving that object are interpreted. Choosing a type is therefore part of program design. An integer is appropriate for counts, a Boolean for a true/false state, and a floating-point type for measurements where approximate numeric representation is acceptable.\n\nC++ also distinguishes signed and unsigned integer types, and their ranges depend on the implementation and type width. When an exact representation size matters, fixed-width types from `<cstdint>` can make the requirement explicit. Character handling also deserves care because `char` represents a character-sized object but its signedness is implementation-dependent, while wider character facilities have their own semantics.\n\nUser-defined types such as `enum class`, `struct`, and `class` allow the program to express domain concepts directly. Stronger types can prevent invalid combinations and make interfaces easier to understand, which is often more valuable than choosing a type merely because it is convenient."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nenum class DeliveryStatus { Waiting, Packed, Sent };\n\nint main() {\n    DeliveryStatus status = DeliveryStatus::Packed;\n\n    if (status == DeliveryStatus::Packed) {\n        std::cout << \"Ready for dispatch\\n\";\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Choose types based on meaning, range, precision, and portability requirements."
            }
          ]
        },
        {
          title: "Variable Types",
          slug: "06-variable-types",
          description: "Learn variables, initialization, assignment, type deduction, value categories, and the foundations of object state.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "A variable gives a name to an object with a particular type and lifetime. Initialization establishes its starting state; assignment changes the value of an already-existing object. These are different operations and should not be mentally merged.\n\nModern C++ offers several initialization forms. Brace initialization is often a good default because it makes narrowing conversions harder to introduce silently. Type deduction with `auto` can reduce repetition when the initializer already makes the intended type obvious, but it should not be used when hiding the type would make the code harder to understand.\n\nC++ also distinguishes expressions by value category. An lvalue generally identifies an existing object, while an rvalue is commonly a temporary result. This distinction becomes important with references, move semantics, and overload resolution. Understanding it gradually is more useful than memorizing isolated definitions.\n\nInitialization and assignment should be treated as different operations. Initialization creates an object with its initial state, while assignment changes an already existing object. This distinction becomes especially important for classes because construction can acquire resources or establish invariants that ordinary assignment does not reproduce.\n\nBrace initialization is a useful default because it makes many narrowing conversions ill-formed instead of silently accepting them. For example, placing a fractional value into an integer with braces requires the programmer to confront the conversion. This reduces accidental data loss.\n\nThe lvalue/rvalue distinction becomes more important as C++ grows more advanced. An lvalue generally denotes an identifiable object, while an rvalue commonly represents a temporary result. References can bind to lvalues, and rvalue references enable move operations that transfer resources from temporary objects. You do not need to master move semantics immediately, but understanding that objects have identity, values have types, and temporaries have lifetimes prepares you for efficient modern C++."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int attempts{3};\n    double price{149.50};\n    bool available{true};\n\n    std::cout << attempts << ' ' << price << ' ' << available << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Initialize objects deliberately and use `auto` when it improves readability rather than hiding an important type."
            }
          ]
        },
        {
          title: "Variable Scope",
          slug: "07-variable-scope",
          description: "Understand scope, lifetime, shadowing, and how limiting visibility makes programs easier to reason about.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Scope answers where a name can be used; lifetime answers how long the associated object exists. These concepts are related but not identical. A name can go out of scope while an object remains alive through another owner, and an object can have a lifetime that begins and ends inside a very small scope.\n\nKeeping variables in the narrowest useful scope reduces accidental dependencies. If a value is needed only inside one loop, declaring it outside the entire function makes its possible uses larger than necessary. Small scopes also make resource lifetime easier to visualize.\n\nBe careful with shadowing, where an inner declaration uses the same name as an outer declaration. It is legal C++, but excessive shadowing can make it difficult to determine which object an expression refers to.\n\nScope answers where a name is visible; lifetime answers how long the associated object exists. These ideas are related but not identical. A local variable can be visible only inside a block and exist for that block's execution, while a static object can have a much longer lifetime even though access to its name may be limited.\n\nNarrow scope is usually easier to reason about because fewer parts of the program can interact with a variable. If a variable is only needed inside one loop, declare it there. If state is shared across several functions, consider whether it should instead be represented by an object passed through an explicit interface.\n\nShadowing is legal, but repeated reuse of the same name in nested scopes can make debugging difficult because the reader must constantly determine which object is being referenced. Good scope design reduces accidental coupling and makes ownership and lifetime easier to see. In larger programs, namespaces and class scope further organize names without requiring everything to be global."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint limit = 100;\n\nvoid inspect() {\n    int current = 40;\n\n    if (current < limit) {\n        int remaining = limit - current;\n        std::cout << remaining << '\\n';\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Keep variables close to their use and avoid unnecessary shared scope."
            }
          ]
        },
        {
          title: "Constants And Literals",
          slug: "08-constants-and-literals",
          description: "Learn literals, constants, const correctness, constexpr, and how named values improve readability and safety.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Literals are values written directly in source code, while named constants give those values meaning. A number such as `18` may be correct but ambiguous; a constant such as `MaximumRetries` communicates why that number exists.\n\n`const` expresses that an object should not be modified through that object. `constexpr` goes further by allowing an expression to participate in compile-time evaluation when the initializer satisfies the rules. Compile-time constants can improve readability and can be required in contexts where a constant expression is needed.\n\nPay attention to literal types. An integer literal, floating-point literal, character literal, and string literal have different types and semantics. Suffixes can also influence the type of a literal, which matters when overload resolution or numeric conversions are involved.\n\nLiterals are raw values written directly in source code, while named constants give those values meaning. The difference matters because `500` alone tells the reader very little, whereas `MaxConnections` communicates intent. Named constants also provide a single place to change a policy value.\n\n`const` expresses that an object should not be modified through that object, while `constexpr` communicates that a value can participate in constant-expression evaluation when its initializer satisfies the language rules. `const` is therefore primarily about immutability through an interface, whereas `constexpr` also concerns compile-time evaluation.\n\nLiteral suffixes can influence type, especially for large integers and floating-point values. Hexadecimal and other bases are useful for bit masks and low-level values. String literals are arrays of characters with special language rules, and character literals represent individual characters. Learning to recognize the type of a literal helps prevent surprising conversions when expressions combine values of different types."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nconstexpr double ServiceCharge = 0.025;\n\nint main() {\n    double amount = 800.0;\n    double charge = amount * ServiceCharge;\n\n    std::cout << charge << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Replace unexplained numeric literals with meaningful named constants."
            }
          ]
        },
        {
          title: "Modifier Types",
          slug: "09-modifier-types",
          description: "Understand qualifiers and modifiers including const, volatile, mutable, and qualified pointer declarations.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Type qualifiers and related modifiers change how objects can be accessed or how declarations behave. `const` is the most common example: it communicates that an object should not be changed through a particular access path.\n\nPointer declarations deserve careful reading. `const int*` means the pointed-to integer is treated as const through that pointer, while `int* const` means the pointer itself cannot be reseated. Both can be combined when neither the pointer nor the pointed-to value should be modified through that declaration.\n\n`volatile` has a specialized low-level purpose for objects whose values may change outside ordinary compiler-visible execution, such as certain hardware interfaces. It does not make ordinary multithreaded access safe. For threads, synchronization primitives and atomic operations are the relevant tools.\n\nType qualifiers become easier to understand when you ask what is being restricted: the object, the pointer, or the way the program observes a value. `const int` means the integer cannot be modified through that const object. `const int*` means the pointed-to integer cannot be modified through that pointer, while `int* const` means the pointer itself cannot be reseated.\n\n`volatile` has a specialized purpose. It tells the implementation that accesses to an object are significant and may change outside ordinary optimization assumptions. This can matter for certain hardware or memory-mapped interfaces, but it does not make compound operations atomic and does not replace mutexes or atomics for thread synchronization.\n\n`mutable` is mainly useful for class members that represent internal state such as a cache or bookkeeping value. The key lesson is to read qualifiers precisely and decide whether the protected entity is data, an address, or an observation mechanism. Clear declarations make interfaces safer because the compiler can enforce intended restrictions."
            },
            {
              title: "Example",
              content: "```cpp\nint value = 10;\nconst int* readOnly = &value;\nint* const fixedAddress = &value;\n```\nThe first pointer cannot modify `value` through `readOnly`; the second pointer cannot be redirected to another integer."
            },
            {
              title: "Practical use",
              content: "Use qualifiers to communicate which part of an object or pointer may be modified."
            }
          ]
        },
        {
          title: "Storage Classes",
          slug: "10-storage-classes",
          description: "Understand storage duration, linkage, static, extern, and the modern role of auto and other storage-related concepts.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Storage-related concepts in C++ are easier to understand through lifetime and linkage than by memorizing old keyword definitions. `static` can mean different things depending on where it appears: it can give namespace-scope entities internal linkage or preserve the state of a local variable between calls.\n\n`extern` is commonly used when a declaration refers to a definition provided elsewhere. In modern projects, namespaces and well-designed headers/source files usually provide a clearer organization than a large collection of global variables.\n\nThe modern meaning of `auto` is primarily type deduction. For example, `auto count = 12;` asks the compiler to deduce the type from the initializer. `register` is obsolete as a practical optimization request; modern compilers make optimization decisions themselves.\n\nModern C++ makes some older storage-class terminology less central, so it is more useful to focus on the underlying ideas: storage duration, linkage, and visibility. Storage duration describes how long an object exists. Linkage describes whether a name can refer to the same entity across translation units. Scope describes where the name can be used in source code.\n\nA function-local `static` object has static storage duration and retains its value between calls. Namespace-scope `static` can restrict linkage, while `extern` can declare an entity whose definition is provided elsewhere. The modern `auto` keyword is primarily used for type deduction, allowing the compiler to determine the variable's type from its initializer.\n\nAvoid using global state merely because it is easy to access. Shared mutable state creates hidden dependencies and makes testing harder. Prefer objects with clear ownership and explicit interfaces. Understanding storage duration is particularly important when references or pointers outlive the objects they refer to."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint nextRequestId() {\n    static int id = 500;\n    return ++id;\n}\n\nint main() {\n    std::cout << nextRequestId() << '\\n';\n    std::cout << nextRequestId() << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use static local state sparingly and prefer explicit objects when state is part of application design."
            }
          ]
        }
      ]
    },
    {
      title: "Operators and Control Flow",
      slug: "operators-and-control-flow",
      description: "Learn operators and control flow through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Operators",
          slug: "11-operators",
          description: "Master arithmetic, relational, logical, bitwise, assignment, conditional, member-access, and pointer operators.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Operators are the vocabulary used to form expressions. Arithmetic operators transform numbers, relational operators compare values, logical operators combine conditions, bitwise operators manipulate individual bits, and member-access operators navigate objects.\n\nPrecedence controls how an expression is grouped, but relying heavily on precedence makes code harder to review. Parentheses are inexpensive and often make intent explicit. Short-circuit evaluation is also important: `A && B` does not need to evaluate `B` when `A` is false, while `A || B` can skip `B` when `A` is true.\n\nNumeric conversions deserve special attention. Integer division discards the fractional part, while mixing signed and unsigned values can produce surprising comparisons or conversions. Make the intended type visible rather than hoping implicit conversions do exactly what you expect.\n\nOperators are expressions with defined type and evaluation rules, so understanding them requires more than memorizing symbols. Arithmetic operators produce numeric results, relational operators produce Boolean results, logical operators combine conditions, and bitwise operators manipulate individual bits. Member-access operators such as `.` and `->` connect expressions to object members, while `::` selects names from a namespace or class scope.\n\nConversions happen during expressions, and this is where many subtle bugs begin. Integer division discards the fractional part, signed and unsigned operands can interact in surprising ways, and a smaller destination type can lose information. Parentheses are often a better communication tool than relying on precedence tables.\n\nShort-circuit evaluation is also important. In `a && b`, `b` is evaluated only when necessary, and in `a || b`, `b` is skipped when `a` is already true. This can both improve efficiency and protect expressions that require a prior condition. Read complex expressions from left to right and make the intended evaluation order obvious."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int successful = 18;\n    int total = 20;\n\n    double rate = 100.0 * successful / total;\n    bool accepted = rate >= 90.0;\n\n    std::cout << rate << \"% accepted=\" << accepted << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use parentheses and explicit conversions when they make numeric or Boolean intent clearer."
            }
          ]
        },
        {
          title: "Loop Types",
          slug: "12-loop-types",
          description: "Learn while, do-while, for, range-based for, nested loops, break, continue, and how to reason about termination.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Loops repeatedly execute a block while some condition or iteration policy remains true. The key skill is not memorizing `for` versus `while`; it is identifying the state that changes and proving that the loop will eventually stop when it should.\n\nA `for` loop is natural when initialization, condition, and update form one clear iteration pattern. `while` works well when the update or stopping condition is more event-driven. `do-while` is useful when the body must execute before the first condition check. Range-based `for` is often the clearest choice when traversing a standard container.\n\nNested loops multiply work. A loop over `n` elements inside another loop over `n` elements can require roughly `n²` iterations. That may be perfectly appropriate for a small grid but problematic for a large dataset, so correctness and performance should both be considered.\n\nA loop should be understood as a state transition rather than simply a repeated block. At each iteration, the program has some state, evaluates a condition or obtains the next element, performs work, and updates state so that the loop can eventually terminate. If the update does not move the state toward the termination condition, an unintended infinite loop can result.\n\n`while` is natural when repetition depends primarily on a condition, `for` is convenient when initialization, condition, and update form one compact iteration pattern, and `do-while` is appropriate when the body must execute before the condition is checked. Range-based `for` is usually the clearest choice when traversing a standard collection.\n\nNested loops require additional reasoning because their work multiplies. A loop over 1,000 records containing another loop over 1,000 records may perform roughly one million inner iterations. `break` and `continue` are useful control tools, but they should make the loop easier to understand rather than hide complicated flow."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int value = 1;\n\n    while (value <= 16) {\n        std::cout << value << ' ';\n        value *= 2;\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use the loop form that makes initialization, termination, and progress easiest to verify."
            }
          ]
        },
        {
          title: "Decision-Making Statements",
          slug: "13-decision-making-statements",
          description: "Learn if, else, switch, conditional expressions, validation, branching, and clear decision-making design.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "Decision statements choose a path based on a condition. An `if` statement is appropriate for general Boolean logic, while `switch` is useful when one expression is matched against discrete cases.\n\nA good conditional structure validates assumptions at the boundary of the program and then allows the main logic to operate on trusted state. This reduces repeated checks and makes the normal path easier to read.\n\nWith `switch`, remember that cases can fall through unless control is stopped or intentional fall-through syntax is used. The conditional operator is useful for short value selection, but once it contains nested or complicated expressions, a normal `if` statement is usually clearer.\n\nDecision-making is fundamentally about partitioning possible program states. A condition should answer a clear question, such as whether an amount is valid, whether a record exists, or whether a retry limit has been reached. When several conditions are combined, write them so their business meaning is visible rather than constructing a dense Boolean expression that requires mental decoding.\n\n`if` is flexible for ranges and unrelated conditions. `switch` is useful when one expression is compared against discrete cases. Remember that ordinary `switch` cases can fall through unless control is stopped, commonly with `break` or an explicit return. The conditional operator is useful for a small value selection but becomes harder to read when nested.\n\nValidation should happen before unsafe operations. For example, check that an index is within the valid range before indexing, and verify input state before converting or using it. Good decisions are not only about choosing the correct branch; they also make invalid states difficult to reach."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int option = 2;\n\n    switch (option) {\n        case 1:\n            std::cout << \"Create\\n\";\n            break;\n        case 2:\n            std::cout << \"Update\\n\";\n            break;\n        default:\n            std::cout << \"Unknown option\\n\";\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Build validation and state-dependent behavior with clear branches and exhaustive cases."
            }
          ]
        }
      ]
    },
    {
      title: "Functions",
      slug: "functions",
      description: "Learn functions through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Functions",
          slug: "14-functions",
          description: "Understand function declarations, definitions, parameters, return values, references, pointers, overloads, defaults, and decomposition.",
          estimatedMinutes: 30,
          sections: [
            {
              title: "Detailed explanation",
              content: "A function gives a name and boundary to a unit of behavior. A useful function has a clear input contract, a predictable result or side effect, and a responsibility that can be understood without reading the entire program.\n\nPassing by value gives the function its own parameter object. Passing by reference lets the function work directly with an existing object, while `const` references are commonly used to avoid copying a larger object without allowing modification. Pointers are useful when address semantics or an optional target are meaningful.\n\nOverloading lets several functions share a name when their parameter lists distinguish them. Keep overload sets coherent: callers should be able to predict which operation a particular call represents. Default arguments can simplify APIs, but excessive defaults can make behavior less obvious.\n\nA function is a contract between its caller and implementation. The declaration communicates the function's name, parameters, and return type, while the definition supplies the behavior. A good function has a focused responsibility and a clear relationship between its inputs, outputs, side effects, and failure behavior.\n\nPassing by value is appropriate when a copy is cheap or when the function should work with its own value. A reference allows direct access to an existing object, while a const reference can avoid copying a larger object without allowing modification. Pointers are useful when nullability or explicit address semantics are meaningful. These choices communicate intent to both the compiler and the reader.\n\nFunction decomposition also improves debugging. If a program has separate functions for parsing, validation, calculation, and output, a defect can be isolated to a smaller region. Overloading should be used when several operations are genuinely the same conceptual operation with different parameter types. Avoid creating overload sets that force readers to guess which behavior a call represents."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\ndouble calculateDiscount(double price, double rate) {\n    return price * rate;\n}\n\nint main() {\n    std::cout << calculateDiscount(1200.0, 0.10) << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Break larger programs into small functions with focused responsibilities and clear contracts."
            }
          ]
        }
      ]
    }
  ]
},
{
  name: "Intermediate",
  slug: "intermediate",
  description: "Learn C++ at the intermediate level with progressive, practical lessons focused on understanding and writing code.",
  level: StudyLevel.INTERMEDIATE,
  modules: [
    {
      title: "Functions and Numeric Programming",
      slug: "functions-and-numeric-programming",
      description: "Learn functions and numeric programming through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Numbers",
          slug: "15-numbers",
          description: "Learn integer and floating-point arithmetic, math facilities, random generation, precision, overflow, and numeric comparisons.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Numeric programming requires understanding both representation and operations. Integer arithmetic is exact only within the representable range, while floating-point values approximate real numbers and can accumulate rounding error.\n\nFor floating-point comparisons, exact equality is often inappropriate. A tolerance-based comparison is usually better when the values come from calculations. The correct tolerance depends on the scale and meaning of the values, so there is no universal epsilon that works for every problem.\n\nFor random values, modern C++ provides engines and distributions through `<random>`. Separating the random engine from the distribution makes the desired range and statistical behavior explicit. Numeric code should also consider overflow, signed/unsigned conversions, and the required precision.\n\nNumeric programming requires attention to representation, range, and precision. Integers represent whole values exactly within their supported range, but signed overflow has language-level consequences that should not be treated like ordinary wraparound. Unsigned types have modular arithmetic behavior, yet mixing signed and unsigned values can produce unexpected comparisons or conversions.\n\nFloating-point values are approximations. A decimal such as 0.1 generally cannot be represented exactly in binary floating-point, so calculations can accumulate small differences. For this reason, comparing two floating-point results with `==` is often inappropriate when the values come from independent calculations. A tolerance-based comparison is usually better, with the tolerance chosen for the scale and requirements of the problem.\n\nFor random values, modern `<random>` facilities separate the random engine from the distribution. This makes the intended range and distribution explicit. For mathematical operations, `<cmath>` provides reusable functions. Always choose a numeric type according to the domain requirement rather than defaulting automatically to `int` or `double`."
            },
            {
              title: "Example",
              content: "```cpp\n#include <cmath>\n#include <iostream>\n\nint main() {\n    double width = 8.0;\n    double height = 15.0;\n\n    double diagonal = std::sqrt(width * width + height * height);\n    std::cout << diagonal << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use appropriate numeric types and tolerant comparisons when calculations involve floating-point values."
            }
          ]
        }
      ]
    },
    {
      title: "Arrays, Strings and Memory Access",
      slug: "arrays-strings-and-memory-access",
      description: "Learn arrays, strings and memory access through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Arrays",
          slug: "16-arrays",
          description: "Understand built-in arrays, indexing, bounds, contiguous storage, std::array, std::vector, and array traversal.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "An array stores a fixed number of elements of one type in contiguous memory. Its indexing begins at zero, so an array containing `N` elements has valid indexes from `0` through `N - 1`.\n\nThe most important array rule is bounds safety. C++ does not automatically stop an out-of-range built-in array access. Reading or writing outside the object is undefined behavior and can corrupt unrelated data or cause unpredictable failures.\n\nFor modern C++, `std::array` is often preferable when the size is fixed and should be part of the type, while `std::vector` is a better fit for a dynamically sized sequence. These containers integrate naturally with standard algorithms and provide clearer interfaces than manually managed arrays.\n\nAn array's most important property is contiguous storage with a fixed number of elements. Indexing translates naturally into an offset from the first element, which is why array access is efficient. The same property also explains why an out-of-range index is dangerous: the language does not automatically turn an invalid index into a safe access to another element.\n\nWhen an array is passed to a function, it commonly decays to a pointer to its first element, so the function usually needs a separate element count. This is why a parameter such as `const int values[]` does not by itself preserve the array's size. `std::array` keeps the size as part of the type, while `std::vector` manages a dynamically sized contiguous sequence.\n\nThink of array operations as simple algorithms: traversal, search, aggregation, transformation, and update. For each algorithm, define the valid index range first. When using multidimensional arrays, decide what each dimension represents and keep the row/column interpretation consistent throughout the program."
            },
            {
              title: "Example",
              content: "```cpp\n#include <array>\n#include <iostream>\n\nint main() {\n    std::array<int, 5> scores{71, 86, 92, 64, 88};\n\n    int total = 0;\n    for (int score : scores) {\n        total += score;\n    }\n\n    std::cout << \"Total: \" << total << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Prefer `std::array` for fixed-size collections and `std::vector` for dynamically sized sequences."
            }
          ]
        },
        {
          title: "Strings",
          slug: "17-strings",
          description: "Learn C-style strings, null termination, std::string, searching, slicing, modification, and input behavior.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "C++ supports both C-style null-terminated character sequences and the higher-level `std::string` abstraction. A C-style string depends on a terminating `\\0`, so its buffer must always have room for the characters plus that terminator.\n\n`std::string` manages its own storage and provides operations such as searching, slicing, appending, comparison, and size queries. This removes much of the manual capacity bookkeeping that makes C-style strings error-prone.\n\nInput style also matters. `operator>>` reads formatted tokens and normally stops at whitespace, while `std::getline` reads an entire line. Mixing the two requires understanding the newline left in the input stream so that the next line read behaves as intended.\n\nStrings are a common source of confusion because C++ supports both C-style null-terminated character sequences and the safer, richer `std::string` abstraction. A C-style string is not merely an array of characters; it must contain a terminating `\\0` before functions that expect a null-terminated sequence can safely determine its length.\n\n`std::string` manages its own storage and provides operations such as concatenation, searching, substring extraction, comparison, and size queries. This makes it the preferred representation for most ordinary text in modern C++. Input also needs deliberate handling: `operator>>` normally reads a token and stops at whitespace, while `std::getline` reads an entire line. Switching between the two requires attention to the newline remaining in the input stream.\n\nCapacity is a correctness issue when using character buffers. Any operation that writes into a fixed buffer must account for the terminating null character and available space. For APIs, use `const std::string&` when a read-only reference is appropriate, or pass by value when taking ownership or intentionally making a copy is useful."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string orderCode = \"ORD-7284\";\n    auto dash = orderCode.find('-');\n\n    std::string prefix = orderCode.substr(0, dash);\n    std::cout << prefix << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Prefer `std::string` for normal text handling and learn C-style strings mainly for interoperability and low-level work."
            }
          ]
        },
        {
          title: "Pointers",
          slug: "18-pointers",
          description: "Understand pointers, addresses, dereferencing, nullability, pointer arithmetic, pointer safety, and ownership boundaries.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "A pointer is an object whose value represents an address or pointer value. The address-of operator obtains a pointer to an object, and dereferencing a valid pointer accesses the pointed-to object.\n\nThe difficult part of pointer programming is not the syntax; it is validity. Before dereferencing, the pointer must identify a suitable live object, the access must respect the type and permissions, and the object must remain alive for the duration of the access. A null pointer does not identify a usable object.\n\nPointer arithmetic has a defined relationship with array elements. It should not be treated as general integer arithmetic. In modern C++, raw pointers are often best used for non-owning access or low-level interfaces, while ownership is represented by RAII types such as `std::unique_ptr`.\n\nPointers become manageable when you separate three ideas: the pointer object, the address stored in it, and the lifetime of the object at that address. `int* p` creates a pointer object capable of storing the address of an `int`; `&value` obtains an address; and `*p` accesses the object at that address. These operations are simple individually, but correctness depends on whether the address is valid at the moment of dereference.\n\nA pointer can be null, point to a valid object, point one past the end of an array for certain comparison/iteration purposes, or become dangling after the target's lifetime ends. Only some of these states permit dereferencing. Pointer arithmetic is meaningful within an array because the compiler knows the element type and therefore the step size.\n\nModern C++ uses raw pointers mainly for non-owning relationships or low-level interfaces. When a pointer represents ownership, smart pointers make that ownership explicit. `unique_ptr` communicates exclusive ownership, `shared_ptr` shared ownership, and `weak_ptr` non-owning observation of shared ownership. This reduces the number of manual lifetime decisions a program must get right."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nvoid addBonus(int* score) {\n    if (score != nullptr) {\n        *score += 5;\n    }\n}\n\nint main() {\n    int score = 80;\n    addBonus(&score);\n    std::cout << score << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use raw pointers primarily for non-owning or low-level access and make ownership explicit elsewhere."
            }
          ]
        },
        {
          title: "References",
          slug: "19-references",
          description: "Learn references, const references, reference parameters, lifetime rules, and how references differ from pointers.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "A reference is an alias to an existing object rather than a separate nullable handle. An ordinary reference is initialized when it is created and is normally expected to remain associated with that object.\n\nReferences are particularly useful for function parameters. A non-const reference communicates that the function may modify the caller's object. A `const` reference communicates that the function only observes the object and can often avoid a copy.\n\nPointers and references are not interchangeable. A pointer can represent “no object” with `nullptr` and can be changed to point elsewhere. A normal reference expresses that a valid object is required. Choosing between them is therefore part of designing a function's contract.\n\nA reference is best viewed as an alias to an existing object rather than a small pointer with different syntax. An ordinary lvalue reference must bind to an object when it is initialized, and using the reference accesses the original object directly. This makes references convenient for function parameters when a function requires an existing object.\n\nA const reference is especially useful for read-only access to larger objects because it avoids a copy while preventing modification through that reference. A non-const reference communicates that the function may modify the caller's object. These are interface decisions, not just syntax choices.\n\nReferences have important lifetime rules. Returning a reference is safe only when the referred object will continue to exist after the function returns. Returning a reference to a local variable creates a dangling reference because the local object's lifetime ends when the function exits. Unlike ordinary pointers, references are not normally nullable or reseatable. When absence is meaningful, a pointer or another explicit optional representation may communicate the design better. Rvalue references add another dimension by enabling move operations for resource-owning objects."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nvoid applyFee(double& amount) {\n    amount += 25.0;\n}\n\nint main() {\n    double total = 500.0;\n    applyFee(total);\n    std::cout << total << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use references when a function requires an existing object and pointers when nullability or explicit address semantics matter."
            }
          ]
        }
      ]
    },
    {
      title: "Input, Structures and Classes",
      slug: "input-structures-and-classes",
      description: "Learn input, structures and classes through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Date And Time",
          slug: "20-date-and-time",
          description: "Understand durations, time points, clocks, elapsed-time measurement, and the foundations of modern C++ time handling.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Time programming becomes clearer when three ideas are separated: a time point answers “when?”, a duration answers “how long?”, and a clock answers “according to which source of time?”.\n\nFor measuring elapsed execution time, `std::chrono::steady_clock` is usually appropriate because it is intended for monotonic interval measurement. A wall-clock time can change because of clock synchronization or calendar adjustments, so it is not the same thing as an elapsed-time measurement.\n\nCalendar operations introduce additional concerns such as time zones, formatting, daylight-saving rules, and representation. Keep internal calculations in well-defined time units and convert to presentation formats only where needed.\n\nTime APIs become easier when you distinguish a duration, a time point, and a clock. A duration answers how much time passed, a time point answers when an event occurred relative to a clock, and a clock supplies the time points. Mixing these concepts can produce confusing code, especially when converting between units.\n\nFor measuring elapsed time, `std::chrono::steady_clock` is generally appropriate because it is intended for monotonic interval measurement. A wall-clock time can change because of synchronization or system adjustments, so it is not always suitable for measuring how long an operation took.\n\nCalendar dates introduce additional concerns such as time zones, daylight-saving changes, formatting, and parsing. Treat a timestamp as a specific point in time and convert it to a human-readable representation only at the appropriate boundary. For learning, first become comfortable with durations and elapsed-time measurement; then move to calendar operations. This prevents treating every date/time problem as if it were simply an integer count of seconds."
            },
            {
              title: "Example",
              content: "```cpp\n#include <chrono>\n#include <iostream>\n#include <thread>\n\nint main() {\n    auto start = std::chrono::steady_clock::now();\n\n    std::this_thread::sleep_for(std::chrono::milliseconds(50));\n\n    auto elapsed = std::chrono::steady_clock::now() - start;\n    std::cout << std::chrono::duration_cast<std::chrono::milliseconds>(elapsed).count()\n              << \" ms\\n\";\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use `steady_clock` for elapsed-time measurements and keep duration calculations separate from calendar formatting."
            }
          ]
        },
        {
          title: "Basic Input/Output",
          slug: "21-basic-input-output",
          description: "Learn standard streams, formatted input/output, line input, stream state, errors, and numeric formatting.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "C++ stream I/O uses objects such as `std::cin`, `std::cout`, `std::cerr`, and `std::clog` to communicate with standard input and output channels. The `>>` operator extracts formatted values, while `<<` inserts formatted output.\n\nInput should be treated as fallible. If extraction fails because the user enters text where a number is expected, the stream enters a failure state. Robust programs detect that state, recover or reject the input, and avoid continuing with an invalid value.\n\nLine-oriented input is useful when spaces belong to the data. Formatting manipulators such as `std::fixed` and `std::setprecision` control numeric presentation without changing the underlying stored value.\n\nStreams provide a typed interface between the program and external input/output sources. `std::cin` extracts values from standard input, `std::cout` writes normal output, and `std::cerr` is commonly used for errors. The stream operators perform conversions according to the destination type, which is convenient but means the program must still check whether extraction succeeded.\n\nA common input pattern is to initialize a variable, prompt the user, extract into it, and verify the stream state. If extraction fails, the variable should not be treated as though valid input was received. After a failed extraction, recovery may require clearing the error state and discarding invalid characters before trying again.\n\nFormatted output is also part of the interface. `<iomanip>` can control precision, width, and formatting. Line-oriented input with `getline` should be chosen when spaces are meaningful. Mixing token extraction and line extraction is a common beginner issue because the newline left in the stream may be consumed immediately by the next `getline`. Understanding the stream as a sequence of characters makes this behavior predictable."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    int quantity{};\n\n    std::cout << \"Enter quantity: \";\n    if (std::cin >> quantity) {\n        std::cout << \"Accepted: \" << quantity << '\\n';\n    } else {\n        std::cerr << \"Invalid number\\n\";\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Validate input states and distinguish token input from line input."
            }
          ]
        },
        {
          title: "Data Structures",
          slug: "22-data-structures",
          description: "Learn structures, member access, arrays of records, passing structures, aliases, and choosing struct versus class.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "A structure groups related pieces of data into one user-defined type. This is useful whenever several values describe one conceptual entity, such as a measurement, product, or configuration record.\n\nMember access uses `.` for an object and `->` for a pointer to an object. Structures can be passed by value, pointer, or reference. For read-only access to a larger structure, a `const` reference is often a good default because it avoids copying while documenting that the function will not modify the object.\n\nC++ `struct` and `class` are both capable of containing data and functions. The important default difference is access: `struct` members are public by default, while `class` members are private by default. Choose the form that communicates whether the type is primarily an open data aggregate or an encapsulated abstraction.\n\nA structure is useful when several pieces of data represent one logical entity. Instead of maintaining separate arrays such as `ids`, `names`, and `prices`, a record type can keep the related fields together. This improves readability because the relationship between values is represented directly in the type.\n\nPassing a structure by value creates a copy, which is simple but may be more expensive for larger objects. Passing by const reference allows inspection without copying, while passing by non-const reference permits modification. A pointer can also be used when nullability or pointer semantics are required. For a pointer to a structure, `->` provides member access through the pointer.\n\n`struct` and `class` are both capable of containing data and functions. Their most visible default difference is access: members of a struct are public by default, while members of a class are private by default. Choose based on design intent. Simple data aggregates often work well as structs, while classes are useful when operations and invariants should control how state changes."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n#include <string>\n\nstruct Sensor {\n    int id;\n    std::string location;\n    double reading;\n};\n\nint main() {\n    Sensor sensor{17, \"Warehouse-A\", 23.8};\n    std::cout << sensor.location << \": \" << sensor.reading << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Model related data as structures when an aggregate representation is clearer than separate variables."
            }
          ]
        },
        {
          title: "Classes And Objects",
          slug: "23-classes-and-objects",
          description: "Understand classes, objects, constructors, destructors, access control, copying, this, static members, and object invariants.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "A class defines a type whose objects combine state and behavior. Constructors establish an initial valid state, member functions provide operations, and destructors participate in resource cleanup when an object's lifetime ends.\n\nA class becomes useful when it can protect invariants. For example, if an account balance must follow certain rules, exposing the balance as public data allows every caller to bypass those rules. A controlled operation such as `deposit()` or `withdraw()` keeps the rule near the state it protects.\n\nC++ object design also includes copying, moving, `this`, static members, and friendship. These features become easier to understand once you first establish a clear ownership and lifetime model for the object.\n\nA class is a type definition that describes state and behavior; an object is a concrete instance with its own lifetime and state. The real value of a class is not simply grouping variables and methods. It is the ability to establish rules about valid state and expose operations that preserve those rules.\n\nConstructors are responsible for establishing the initial state of an object. A well-designed constructor should leave the object usable according to the class invariant. Destructors run when an object's lifetime ends and are the foundation of RAII: resources can be tied to object lifetime so cleanup happens automatically.\n\nCopy and move behavior becomes important when a class owns resources. The compiler can generate special member functions in many cases, but resource-owning classes must be designed carefully so copying does not accidentally duplicate ownership or create double release. Static members belong to the class rather than each object, while the `this` pointer identifies the current object in non-static member functions. Keep public interfaces small and protect state when unrestricted modification could violate invariants."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nclass Wallet {\n    double balance{};\n\npublic:\n    explicit Wallet(double opening) : balance(opening) {}\n\n    void addMoney(double amount) {\n        if (amount > 0) balance += amount;\n    }\n\n    double getBalance() const {\n        return balance;\n    }\n};\n\nint main() {\n    Wallet wallet{250.0};\n    wallet.addMoney(75.0);\n    std::cout << wallet.getBalance() << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use classes to protect invariants and make valid operations explicit."
            }
          ]
        }
      ]
    },
    {
      title: "Inheritance and Object Design",
      slug: "inheritance-and-object-design",
      description: "Learn inheritance and object design through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Inheritance",
          slug: "24-inheritance",
          description: "Learn inheritance, base/derived relationships, public inheritance, multiple inheritance, composition, and substitutability.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Inheritance creates a relationship between a base type and a derived type. Public inheritance is most appropriate when a derived object genuinely satisfies the interface expectations of the base type.\n\nThe most important design question is whether substitution makes sense. If callers can use a derived object anywhere the base is expected without violating assumptions, inheritance may be appropriate. If the relationship is simply that one object contains or uses another, composition is usually clearer.\n\nMultiple inheritance can be useful for combining independent interfaces, but it can also create ambiguity and diamond-shaped hierarchies. C++ provides virtual inheritance for some such cases, yet a simpler composition-based design is often preferable when polymorphic substitution is not required.\n\nInheritance is strongest when the derived type can genuinely be substituted for the base type. Public inheritance communicates an is-a relationship: code that expects the base abstraction should be able to use the derived object without violating the base contract. If that relationship does not hold, composition is often a better design.\n\nA derived object contains a base-class subobject, and access to inherited members is controlled by access specifiers. Multiple inheritance can combine independent capabilities, but it can also introduce ambiguity when several inheritance paths contain the same base. Virtual inheritance can address particular diamond-shaped layouts, but it adds complexity and should not be used merely because the language supports it.\n\nInheritance also interacts with object lifetime and polymorphism. If a base class is used polymorphically, virtual functions allow calls through a base pointer or reference to reach the derived implementation. A polymorphic base normally needs a virtual destructor so deleting a derived object through a base pointer performs the correct destruction sequence. Prefer simple hierarchies and use composition when it expresses the relationship more naturally."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nclass Vehicle {\npublic:\n    void start() const {\n        std::cout << \"Vehicle started\\n\";\n    }\n};\n\nclass DeliveryVan : public Vehicle {\npublic:\n    void load() const {\n        std::cout << \"Loading packages\\n\";\n    }\n};\n\nint main() {\n    DeliveryVan van;\n    van.start();\n    van.load();\n}\n```"
            },
            {
              title: "Practical use",
              content: "Choose inheritance for genuine substitutability; otherwise consider composition."
            }
          ]
        },
        {
          title: "Overloading: Operators And Functions",
          slug: "25-overloading-operators-and-functions",
          description: "Understand function overloading and operator overloading, overload resolution, intuitive operator semantics, and limitations.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Function overloading allows a family of operations to share one name when their parameter types or counts distinguish the calls. The compiler resolves an overload using the arguments and the language's conversion rules.\n\nOperator overloading extends the same idea to user-defined types. A `Point` can reasonably support addition because adding two points can have an intuitive meaning. An operator should not be overloaded merely because the syntax is available; its behavior should match what readers naturally expect.\n\nOperator precedence does not change when an operator is overloaded. The overloaded function still participates in the normal expression grammar, so parentheses may be needed when the intended grouping is not obvious.\n\nFunction overloading is compile-time selection among functions with the same name but different parameter lists. The compiler considers the arguments at the call site and chooses a viable overload. Overloads work best when the functions represent the same conceptual operation and differ only in the type or number of inputs.\n\nOperator overloading extends this idea to user-defined types. A `Point` can define `operator+` so adding two points reads naturally, but the operator should preserve a meaning that users can reasonably predict. Operator precedence and the number of operands are determined by the language; an overload does not let you invent a new precedence rule.\n\nBe careful with conversions because implicit conversions can make an overload set ambiguous or select an unexpected function. When an operation is complex or has surprising side effects, a named function is often clearer than an overloaded operator. Good operator design improves readability; clever operator design can make ordinary code difficult to understand."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nclass Score {\n    int value;\n\npublic:\n    explicit Score(int v) : value(v) {}\n\n    Score operator+(const Score& other) const {\n        return Score(value + other.value);\n    }\n\n    int get() const { return value; }\n};\n\nint main() {\n    Score a{40};\n    Score b{15};\n    Score total = a + b;\n\n    std::cout << total.get() << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Overload functions and operators only when the resulting interface is predictable."
            }
          ]
        },
        {
          title: "Polymorphism",
          slug: "26-polymorphism",
          description: "Learn runtime and compile-time polymorphism, virtual functions, pure virtual functions, abstract classes, and virtual destructors.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Polymorphism means that one interface can represent multiple concrete implementations. In C++, runtime polymorphism is commonly implemented with virtual functions and base-class references or pointers.\n\nA pure virtual function defines a required operation without providing a normal base implementation. A class containing such a function is abstract and is intended to describe a capability rather than be instantiated directly.\n\nWhen a base class is used polymorphically, its destructor is commonly virtual so that destroying a derived object through a base pointer invokes the correct destructor chain. Compile-time polymorphism also exists through templates and overloads; the key difference is when the implementation choice is resolved.\n\nPolymorphism separates the interface a caller depends on from the concrete implementation that performs the work. With runtime polymorphism, a base class exposes virtual operations and derived classes provide specialized behavior. A base reference or pointer can then refer to different derived objects while the caller uses the same interface.\n\nA pure virtual function makes a class abstract, meaning the class represents a contract rather than a directly constructible concrete object. The derived class must implement the required operations before it can be instantiated. The `override` keyword is valuable because it asks the compiler to verify that a derived function really overrides a virtual base function.\n\nRuntime polymorphism has a cost and a design trade-off: the call target is selected dynamically, and the program becomes dependent on a class hierarchy. Templates provide another form of polymorphism where behavior is selected during compilation. Choose runtime polymorphism when substitution and dynamic behavior are central; use templates or ordinary functions when the required behavior can be determined statically."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nclass Report {\npublic:\n    virtual void generate() const = 0;\n    virtual ~Report() = default;\n};\n\nclass SalesReport : public Report {\npublic:\n    void generate() const override {\n        std::cout << \"Generating sales report\\n\";\n    }\n};\n\nint main() {\n    SalesReport report;\n    Report& view = report;\n    view.generate();\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use runtime polymorphism when different implementations must satisfy one common contract."
            }
          ]
        },
        {
          title: "Data Abstraction",
          slug: "27-data-abstraction",
          description: "Understand abstraction as stable interfaces that hide implementation details and reduce unnecessary coupling.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Abstraction focuses on exposing what a caller needs while hiding implementation details that the caller should not depend on. A good abstraction gives a stable interface while allowing the implementation behind that interface to change.\n\nFor example, a `CoffeeMachine::brew()` operation can hide the sequence of heating, grinding, and dispensing. A caller should not need to know the internal order unless that order is part of the public contract.\n\nAbstraction is successful when it reduces unnecessary knowledge and coupling. Hiding every detail is not automatically good design; the interface still needs to expose enough meaningful operations for clients to use the type correctly.\n\nAbstraction is about reducing the amount of implementation detail a user must understand. A good abstraction exposes operations that match the problem domain and hides steps that callers should not need to manage. The caller of a `CoffeeMachine::brew()` operation should not have to know how water is heated or beans are ground.\n\nThe quality of an abstraction depends on its boundary. If the interface exposes too many implementation details, clients become coupled to internal choices. If it hides information that callers genuinely need, the abstraction becomes frustrating or forces awkward workarounds. A stable abstraction therefore provides the smallest useful interface while preserving important guarantees.\n\nAbstraction and encapsulation are related but not identical. Abstraction emphasizes what the user needs to know, while encapsulation emphasizes controlling access to state and behavior. A class can provide abstraction through a few public methods and use private helpers to implement them. When the internal representation changes but callers do not, the abstraction has successfully reduced coupling."
            },
            {
              title: "Example",
              content: "```cpp\nclass Printer {\npublic:\n    void printDocument() {\n        preparePaper();\n        printPages();\n    }\n\nprivate:\n    void preparePaper() { /* internal step */ }\n    void printPages() { /* internal step */ }\n};\n```\nThe caller needs the public operation, not the internal sequence."
            },
            {
              title: "Practical use",
              content: "Design public APIs around useful capabilities and keep implementation details private."
            }
          ]
        },
        {
          title: "Data Encapsulation",
          slug: "28-data-encapsulation",
          description: "Learn encapsulation, private state, invariants, controlled mutation, and behavior-oriented class design.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Encapsulation is about keeping state and the operations that protect that state together while controlling how external code can change it. Private members are useful because they prevent callers from directly creating invalid combinations of state.\n\nA setter for every private field is not automatically encapsulation. If a value has business rules, an operation that expresses the rule is usually stronger. For example, `withdraw(amount)` can reject an invalid amount and enforce balance constraints, while a public `setBalance()` would bypass the intended invariant.\n\nAbstraction and encapsulation overlap but answer different questions. Abstraction asks what the user needs to know; encapsulation asks how state and behavior are packaged and protected.\n\nEncapsulation is valuable when a type must protect an invariant. An invariant is a rule that should remain true for a valid object, such as a balance that cannot become negative under a particular business policy or a temperature setting that must stay within an accepted range. If every field is public, any caller can potentially violate that rule.\n\nA common weak design is to make fields private but expose unrestricted setters for every field. This technically restricts direct access but may not protect the domain rules. Behavior-oriented methods are often stronger because they can validate the requested operation before changing state. For example, `withdraw(amount)` can reject an invalid withdrawal instead of allowing callers to assign an arbitrary balance.\n\nEncapsulation also makes future changes safer. If the representation of a class changes, callers that depend only on the public behavior can remain unchanged. This is one reason classes are useful beyond simply grouping variables. They establish a controlled boundary around state and define how other parts of the program are allowed to interact with it."
            },
            {
              title: "Example",
              content: "```cpp\nclass Temperature {\n    double celsius{20.0};\n\npublic:\n    void setCelsius(double value) {\n        if (value >= -50.0 && value <= 60.0) {\n            celsius = value;\n        }\n    }\n\n    double getCelsius() const {\n        return celsius;\n    }\n};\n```\nThe class prevents callers from directly assigning an invalid temperature."
            },
            {
              title: "Practical use",
              content: "Protect important invariants with behavior-oriented methods instead of unrestricted setters."
            }
          ]
        },
        {
          title: "Interfaces",
          slug: "29-interfaces",
          description: "Learn interface-like abstractions using pure virtual functions, dependency inversion, substitution, and focused capabilities.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "C++ has no dedicated `interface` keyword in the traditional sense. An interface-like design is commonly represented by an abstract class containing pure virtual functions and a virtual destructor.\n\nThe value of this pattern is dependency inversion. Code that needs to perform a payment can depend on a `PaymentGateway` capability instead of knowing whether the implementation uses a wallet, card provider, or test fake.\n\nSmall interfaces are easier to implement and test. If one interface contains unrelated responsibilities, implementations may be forced to provide meaningless operations. Designing around focused capabilities keeps dependencies narrow.\n\nAn interface represents a capability that client code can depend on without depending on one implementation. C++ expresses interface-like designs commonly through abstract classes containing pure virtual functions. The important part is the contract: what operations exist, what their inputs mean, and what behavior callers can rely on.\n\nA small interface is easier to implement, test, and replace. For example, a payment consumer can depend on a `PaymentGateway` abstraction while production uses one gateway and tests use a fake implementation. This reduces the need for tests to perform real external operations.\n\nInterface design should also consider ownership and lifetime. If a method receives a pointer, reference, or smart pointer, the interface should make it clear whether null is allowed and who owns the object. Virtual destructors matter for polymorphic interfaces because implementations may be destroyed through a base pointer. Good interfaces depend on stable capabilities rather than leaking internal implementation details."
            },
            {
              title: "Example",
              content: "```cpp\nclass MessageSender {\npublic:\n    virtual bool send(const std::string& message) = 0;\n    virtual ~MessageSender() = default;\n};\n\nclass ConsoleSender : public MessageSender {\npublic:\n    bool send(const std::string& message) override {\n        std::cout << message << '\\n';\n        return true;\n    }\n};\n```\nClient code can depend on `MessageSender` instead of a concrete sender."
            },
            {
              title: "Practical use",
              content: "Use small abstract interfaces to reduce coupling and make alternative implementations testable."
            }
          ]
        }
      ]
    }
  ]
},
{
  name: "Advanced",
  slug: "advanced",
  description: "Learn C++ at the advanced level with progressive, practical lessons focused on understanding and writing code.",
  level: StudyLevel.ADVANCED,
  modules: [
    {
      title: "Files, Exceptions and Memory",
      slug: "files-exceptions-and-memory",
      description: "Learn files, exceptions and memory through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Files And Streams",
          slug: "30-files-and-streams",
          description: "Learn C++ file streams, reading, writing, persistence, open modes, failure handling, and RAII-based resource management.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "File streams connect C++ programs to persistent storage. `std::ifstream` is commonly used for reading, `std::ofstream` for writing, and `std::fstream` when both directions are required.\n\nOpening a file is a fallible operation. A program should check the stream state before assuming the file is usable. It should also distinguish between replacing existing content and adding new content because the chosen open mode changes the file's behavior.\n\nRAII makes file handling safer: a stream object owns the open resource for its lifetime and releases it automatically when it leaves scope. This is an important example of a broader C++ principle: resource cleanup should be attached to object lifetime whenever practical.\n\nFile streams are objects that connect program operations to persistent storage. `ifstream` is primarily for reading, `ofstream` for writing, and `fstream` supports both. Opening a stream can fail, so a program should treat successful construction/opening as a condition to verify rather than assuming the file is available.\n\nRAII is especially useful for files. The stream object's lifetime controls the resource, so when the object leaves scope its destructor closes the underlying stream. This reduces the chance of forgetting cleanup on an error path. The same principle applies to other resources such as locks and dynamically acquired handles.\n\nText files are human-readable and convenient for simple records, but their format must be defined if the program will read the data later. Binary files preserve bytes directly but introduce portability and representation concerns. For either form, handle malformed data and I/O failures deliberately. A robust file operation is not simply 'open, read, close'; it defines what happens when opening fails, input is incomplete, storage is unavailable, or the data does not match the expected format."
            },
            {
              title: "Example",
              content: "```cpp\n#include <fstream>\n#include <iostream>\n#include <string>\n\nint main() {\n    std::ofstream out(\"notes.txt\");\n\n    if (!out) {\n        std::cerr << \"Unable to open file\\n\";\n        return 1;\n    }\n\n    out << \"C++ study session\\n\";\n\n    std::ifstream in(\"notes.txt\");\n    std::string line;\n\n    while (std::getline(in, line)) {\n        std::cout << line << '\\n';\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Practice reading and writing files while handling missing files, malformed data, and resource lifetime."
            }
          ]
        },
        {
          title: "Exception Handling",
          slug: "31-exception-handling",
          description: "Understand throw, try, catch, standard exceptions, stack unwinding, and how RAII interacts with failures.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Exceptions provide a separate control path for failures that should not be handled as ordinary successful results. Code can `throw` an exception at the failure point and catch it at a level that knows how to respond.\n\nThe major benefit of exceptions in C++ is their interaction with object lifetime. During stack unwinding, local objects are destroyed, so RAII-managed resources are cleaned up even when execution leaves a scope unexpectedly.\n\nCatch standard exceptions by `const` reference when appropriate. Avoid using exceptions as routine loop-control mechanisms. For expected outcomes that are frequent and ordinary, a status value or another explicit result representation can be clearer.\n\nExceptions provide a separate path for reporting failures that cannot be handled naturally at the immediate point of detection. `throw` transfers control, and a matching `catch` receives the exception. Catching standard exceptions by `const` reference avoids unnecessary copying and preserves polymorphic behavior.\n\nThe most important connection is between exceptions and RAII. During stack unwinding, local objects whose lifetimes end are destroyed automatically. If those objects own resources, their destructors can perform cleanup even when an exception interrupts normal control flow. This is why resource ownership should be represented by objects instead of scattered manual cleanup instructions.\n\nExceptions should communicate genuinely exceptional or failure conditions rather than ordinary branching. A parser may use a status value when invalid input is expected frequently, while a resource failure or violated precondition may justify an exception depending on the API design. Catch exceptions at a layer that can actually handle the failure. Catching everything too early and continuing can hide the original problem and leave the program in an invalid state."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n#include <stdexcept>\n\ndouble divide(double a, double b) {\n    if (b == 0.0) {\n        throw std::invalid_argument(\"division by zero\");\n    }\n    return a / b;\n}\n\nint main() {\n    try {\n        std::cout << divide(10.0, 2.0) << '\\n';\n    } catch (const std::exception& ex) {\n        std::cerr << ex.what() << '\\n';\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use exceptions for exceptional failure paths and let RAII perform cleanup during stack unwinding."
            }
          ]
        },
        {
          title: "Dynamic Memory",
          slug: "32-dynamic-memory",
          description: "Learn dynamic allocation, new/delete, smart pointers, ownership, lifetime, leaks, and why RAII is preferred.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Dynamic memory allows storage to be created at runtime and to outlive the scope in which the allocation request was made. Traditional C++ provides `new` and `delete`, including separate forms for arrays.\n\nThe critical rule is matching ownership and lifetime. Memory obtained with `new` must be released correctly, and array allocation must use the corresponding array deletion form. Failure to follow these rules can produce leaks, invalid deletion, or use-after-free bugs.\n\nModern C++ generally prefers RAII abstractions. `std::make_unique` expresses exclusive ownership, while containers such as `std::vector` manage dynamic sequences without requiring the programmer to manually call `delete`. Manual allocation is still relevant for low-level code, but it should be justified rather than used by default.\n\nDynamic memory exists because some objects need storage whose size or lifetime cannot conveniently be determined at compile time. `new` creates an object dynamically and `delete` releases it; arrays allocated with `new[]` require `delete[]`. Mismatching these forms is incorrect because the allocation and deallocation mechanisms must correspond.\n\nThe harder problem is ownership. A raw pointer does not by itself tell you who is responsible for deletion, how long the object remains alive, or whether multiple pointers refer to the same resource. This ambiguity produces leaks, double deletion, and use-after-free bugs. Modern C++ addresses this by expressing ownership with RAII types such as `std::unique_ptr` and `std::shared_ptr`.\n\nFor collections, `std::vector` should usually be preferred over manual dynamic arrays because it manages capacity, lifetime, and element destruction automatically. Manual allocation is still worth learning because it explains how ownership works and is required for some low-level interfaces. Whenever dynamic storage appears, immediately ask: who owns it, when does ownership begin, what happens if an operation fails, and exactly when is it released?"
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n#include <memory>\n\nint main() {\n    auto score = std::make_unique<int>(95);\n    std::cout << *score << '\\n';\n}\n```\nThe owning object automatically releases the allocated integer when it leaves scope."
            },
            {
              title: "Practical use",
              content: "Prefer RAII containers and smart pointers over manual `new`/`delete` in ordinary application code."
            }
          ]
        }
      ]
    },
    {
      title: "Organization and Generic Programming",
      slug: "organization-and-generic-programming",
      description: "Learn organization and generic programming through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Namespaces",
          slug: "33-namespaces",
          description: "Understand namespaces, qualified names, using declarations, name collisions, and organization of larger codebases.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Namespaces provide a naming boundary so unrelated components can use similar names without colliding. A namespace-qualified name makes ownership of an identifier explicit.\n\nFor example, `inventory::findProduct()` communicates that the function belongs to the inventory domain. This is especially useful in large projects and when integrating third-party libraries.\n\nA `using` declaration can bring one selected name into scope, while a broad `using namespace` directive can expose many names and increase collision risk. Broad directives are particularly undesirable in header files because they affect every source file that includes the header.\n\nNamespaces organize names so unrelated components can use descriptive identifiers without colliding. A namespace is not a runtime container; it is primarily a compile-time naming mechanism. `billing::tax` clearly identifies which `tax` function is intended and makes large codebases easier to navigate.\n\nNested namespaces can express a hierarchy, and modern C++ supports compact nested namespace syntax. A using declaration can bring one specific name into scope, while a using directive can introduce many names. Broad using directives are especially risky in header files because they affect every source file that includes that header and can create unexpected ambiguities.\n\nNamespaces also help separate public API from implementation details. A library can expose a documented namespace for consumers while keeping internal helpers in an implementation-oriented namespace. Combine namespaces with classes, modules/source files, and clear interfaces rather than using global variables as a substitute for organization. The goal is not merely avoiding duplicate names; it is making ownership of an API and the meaning of each identifier obvious."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nnamespace inventory {\n    int available(int stock, int reserved) {\n        return stock - reserved;\n    }\n}\n\nint main() {\n    std::cout << inventory::available(120, 17) << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Use namespaces to make ownership of names explicit and reduce collisions in larger systems."
            }
          ]
        },
        {
          title: "Templates",
          slug: "34-templates",
          description: "Learn function and class templates, generic programming, type requirements, instantiation, and modern template design.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Templates let C++ express algorithms and data structures in terms of operations and types rather than one concrete type. A function template can compare two values without writing separate implementations for integers, floating-point values, or other compatible types.\n\nThe compiler generally generates a specialization when the template is used with a particular set of template arguments. This means generic code can remain strongly typed and can often be optimized without runtime type dispatch.\n\nA useful template-design question is: what operations does the algorithm actually require? Modern C++ concepts can make those requirements explicit. Good generic code is not code that accepts absolutely anything; it is code whose required capabilities are clear and correctly constrained.\n\nTemplates allow one piece of code to describe an algorithm or type in terms of requirements rather than one concrete data type. A function template such as `larger` can work with integers, floating-point values, or user-defined types as long as the required comparison operation is valid.\n\nTemplate code is generally instantiated when the compiler needs a concrete specialization. This provides compile-time type checking and often allows the compiler to optimize aggressively. The trade-off is that template diagnostics can become complex when the required operations are not available or when several conversions interact.\n\nGeneric programming becomes clearer when you think in terms of capabilities. Instead of asking 'what type is this?', ask 'what operations must this type support?' Modern C++ concepts can express such requirements more clearly. Templates are also the foundation of standard containers such as `std::vector<T>` and algorithms that operate over ranges. Use templates when the same behavior genuinely applies to multiple types; do not introduce templates simply to make a small piece of code look more abstract."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\ntemplate <typename T>\nT larger(T a, T b) {\n    return (a < b) ? b : a;\n}\n\nint main() {\n    std::cout << larger(12, 19) << '\\n';\n    std::cout << larger(4.5, 2.7) << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Write generic algorithms around the operations they actually require."
            }
          ]
        }
      ]
    },
    {
      title: "Preprocessor and System Programming",
      slug: "preprocessor-and-system-programming",
      description: "Learn preprocessor and system programming through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Preprocessor",
          slug: "35-preprocessor",
          description: "Understand preprocessing, includes, macros, conditional compilation, include guards, and safer modern alternatives.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "The preprocessor performs textual and conditional processing before normal C++ compilation. It handles directives such as `#include`, `#define`, and conditional compilation.\n\nMacros are powerful but bypass many normal language checks because substitution happens before the compiler sees the final C++ expression. A function-like macro can therefore evaluate an argument more than once, creating bugs when the argument has side effects.\n\nPrefer typed C++ facilities such as `constexpr`, inline functions, templates, and normal constants when they express the requirement. The preprocessor remains useful for include guards, platform-specific compilation, and build configuration, but modern C++ usually keeps macro logic small and localized.\n\nThe preprocessor operates before the main C++ compilation stage. It handles directives such as `#include`, macro definitions, and conditional compilation. Because macros are textual substitutions, they do not behave like typed variables or functions and can create problems that ordinary C++ expressions would prevent.\n\nFor example, a macro can accidentally evaluate an argument more than once, interact strangely with operator precedence, or expose names globally within the translation unit. Prefer `constexpr` for named compile-time values, inline functions for ordinary computations, and templates for generic behavior when those features express the requirement better.\n\nConditional compilation remains useful for platform-specific code and build configurations. Header inclusion also requires protection against repeated inclusion, commonly through include guards or supported alternatives. The most useful mental model is that preprocessor output becomes input to the compiler. If a macro or conditional directive changes the source before compilation, the compiler can only diagnose the resulting program. Keeping preprocessing simple makes the actual C++ easier to reason about."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\n#define ENABLE_DIAGNOSTICS\n\nint main() {\n#ifdef ENABLE_DIAGNOSTICS\n    std::cout << \"Diagnostics enabled\\n\";\n#endif\n}\n```\nFor ordinary values or computations, prefer typed C++ features such as `constexpr` or functions instead of macros."
            },
            {
              title: "Practical use",
              content: "Use macros only where preprocessing is genuinely required; prefer typed C++ alternatives otherwise."
            }
          ]
        },
        {
          title: "Signal Handling",
          slug: "36-signal-handling",
          description: "Learn the fundamentals and limitations of asynchronous process signals and safe signal-handling patterns.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Signals are asynchronous notifications delivered to a process. That makes them fundamentally different from an ordinary function call: a signal can arrive at a point in execution that the program did not explicitly request.\n\nSignal handlers therefore have strict constraints. Complex operations, allocation, and arbitrary library calls should not be performed casually from a handler. A safer pattern is to record a minimal notification and let the normal program flow perform cleanup and shutdown.\n\nThe important learning goal is to understand the boundary between asynchronous notification and ordinary program logic. Treating a signal handler as a normal callback can introduce subtle correctness problems.\n\nSignals are different from ordinary function calls because they can arrive asynchronously relative to the program's normal control flow. A signal handler may interrupt execution at a point where many library operations or application invariants are not safe to manipulate. This is why signal handlers should perform only carefully permitted, minimal work.\n\nA common design is to record a simple shutdown request and let the normal execution path notice it. The main loop can then close files, release resources, stop worker threads, and perform other ordinary cleanup in a controlled context. Trying to perform complex cleanup directly inside an asynchronous handler can introduce subtle problems.\n\nSignal behavior can also vary by platform and signal type, so portable code should rely only on guarantees that apply to the environment being targeted. For learning, focus first on the distinction between asynchronous notification and normal function invocation. Once that distinction is clear, the restrictions on what a handler should do become much easier to understand."
            },
            {
              title: "Example",
              content: "```cpp\n#include <csignal>\n#include <iostream>\n\nvolatile std::sig_atomic_t stopRequested = 0;\n\nvoid handleSignal(int) {\n    stopRequested = 1;\n}\n\nint main() {\n    std::signal(SIGINT, handleSignal);\n\n    std::cout << \"Press Ctrl+C to request shutdown.\\n\";\n\n    while (!stopRequested) {\n        // Normal work would happen here.\n    }\n\n    std::cout << \"Shutdown requested.\\n\";\n}\n```"
            },
            {
              title: "Practical use",
              content: "Keep signal handling minimal and let ordinary program flow perform cleanup and shutdown."
            }
          ]
        },
        {
          title: "Multithreading",
          slug: "37-multithreading",
          description: "Understand threads, joining, atomics, mutexes, races, deadlocks, synchronization, and concurrency design.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "Multithreading allows independent execution flows to run concurrently. `std::thread` can start a function on another thread, and `join()` waits for that thread to finish.\n\nThe difficult part is shared state. If two threads modify the same object without appropriate synchronization, the program can contain a data race and therefore have undefined behavior. A mutex can protect a critical section, while atomics are useful for certain individual shared values when their semantics are sufficient.\n\nConcurrency also introduces deadlocks, starvation, contention, and lifetime problems. Keep critical sections small, make ownership explicit, and prefer immutable data or message-passing designs when they reduce synchronization requirements.\n\nA thread is an independent path of execution within a process, but threads share many resources. That sharing is powerful because threads can cooperate on common data, but it creates synchronization requirements whenever mutable state can be accessed concurrently.\n\nA data race occurs when conflicting accesses happen without the synchronization required by the language. The result is not merely 'one thread wins'; unsynchronized access can produce undefined behavior. A mutex creates a critical section in which related operations are protected. `std::lock_guard` and `std::scoped_lock` use RAII so the lock is released automatically when the guard leaves scope.\n\n`join()` establishes that the creating thread waits for completion. Detached threads require much more careful lifetime reasoning because the creator no longer has the same direct synchronization relationship with the thread. Modern C++ also provides atomics, condition variables, futures, and task-oriented facilities. Prefer the simplest concurrency model that solves the problem, keep shared mutable state small, and make ownership and shutdown behavior explicit."
            },
            {
              title: "Example",
              content: "```cpp\n#include <atomic>\n#include <iostream>\n#include <thread>\n\nint main() {\n    std::atomic<int> completed{0};\n\n    std::thread a([&] { ++completed; });\n    std::thread b([&] { ++completed; });\n\n    a.join();\n    b.join();\n\n    std::cout << completed.load() << '\\n';\n}\n```"
            },
            {
              title: "Practical use",
              content: "Practice concurrency by identifying shared state first, then choosing atomics, mutexes, or message passing."
            }
          ]
        }
      ]
    },
    {
      title: "Web, STL and Standard Library",
      slug: "web-stl-and-standard-library",
      description: "Learn web, stl and standard library through explanations, examples, and practical exercises.",
      topics: [
        {
          title: "Web Programming",
          slug: "38-web-programming",
          description: "Learn C++ web-programming fundamentals through HTTP/CGI concepts, request handling, validation, and security boundaries.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "C++ can participate in web systems at several levels, from low-level HTTP handling to modern framework or service implementations. The supplied material focuses on the older CGI model, which is useful for learning how a web server can invoke a program and provide request information.\n\nThe durable concepts are the HTTP request/response model, headers, request methods, query/body data, cookies, and server-side validation. External input should always be treated as untrusted.\n\nSecurity requirements are especially important around file uploads, paths, commands, authentication, and output encoding. Modern production C++ web systems commonly use HTTP libraries, frameworks, reverse proxies, and structured service architectures rather than implementing a complete web stack manually.\n\nThe supplied material uses CGI as the historical model for connecting a C++ program to a web server. Although modern applications more commonly use frameworks, HTTP libraries, or service architectures, the underlying concepts remain useful. A request contains a method, target information, headers, and possibly a body; the response contains status information, headers, and a body.\n\nGET and POST should not be thought of merely as two different ways to submit a form. They have different semantics and are used differently by clients, caches, and servers. Cookies can associate small pieces of state with a client, but they should never be treated as inherently trustworthy input.\n\nSecurity is part of web programming from the beginning. External input must be validated, output must be encoded appropriately, uploaded files must be constrained, and file paths must not be accepted blindly from users. Authentication and authorization answer different questions: who is the caller, and what is that caller allowed to do? Even when using a modern framework, these underlying concepts remain essential."
            },
            {
              title: "Example",
              content: "```cpp\n#include <iostream>\n\nint main() {\n    std::cout << \"Content-Type: text/plain\\n\\n\";\n    std::cout << \"Inventory request received\\n\";\n}\n```\nThis demonstrates the basic shape of a classic CGI response; modern applications normally use an HTTP framework or library instead."
            },
            {
              title: "Practical use",
              content: "Learn HTTP fundamentals and treat all external request data as untrusted."
            }
          ]
        },
        {
          title: "Stl Tutorial",
          slug: "39-stl-tutorial",
          description: "Master the STL mental model of containers, iterators, algorithms, ranges, and choosing appropriate standard containers.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "The STL is built around a powerful separation of responsibilities: containers manage collections, iterators describe positions or ranges, and algorithms operate on those ranges.\n\nA `std::vector` is often a strong default sequence container because its elements are contiguous and it works efficiently with many algorithms. Other containers exist because different access, insertion, ordering, or lookup requirements call for different trade-offs.\n\nThe important shift is to think in terms of operations rather than hand-written loops. If `std::sort`, `std::find`, `std::count`, or another standard algorithm expresses the intent directly, using it usually makes the program shorter and easier to verify.\n\nThe STL is easiest to learn as a relationship among containers, iterators, and algorithms. A container manages a collection of objects, an iterator identifies positions or ranges within that collection, and an algorithm performs an operation over an iterator range. This separation allows the same algorithm to work with many different containers.\n\n`std::vector` is often a strong default sequence container because its elements are contiguous and it provides efficient iteration and random access. `std::list` and `std::deque` have different structural properties, while associative containers such as `map` and `set` organize data around keys and ordering. Unordered containers use hashing and provide different performance characteristics.\n\nAlgorithms such as `sort`, `find`, `count`, and transformations often express intent more clearly than custom loops. Iterator invalidation is an important advanced topic: operations that change a container can invalidate iterators or references to its elements. Learn not only which container to choose, but also what happens to references and iterators when the container changes."
            },
            {
              title: "Example",
              content: "```cpp\n#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> values{42, 7, 19, 7, 31};\n\n    std::sort(values.begin(), values.end());\n\n    for (int value : values) {\n        std::cout << value << ' ';\n    }\n}\n```"
            },
            {
              title: "Practical use",
              content: "Learn containers, iterators, and algorithms as one connected STL model."
            }
          ]
        },
        {
          title: "Standard Library",
          slug: "40-standard-library",
          description: "Explore major C++ standard-library facilities and learn when to reuse library components instead of building custom solutions.",
          estimatedMinutes: 35,
          sections: [
            {
              title: "Detailed explanation",
              content: "The C++ standard library is a collection of reusable facilities rather than a single monolithic feature. It covers input/output, strings, containers, algorithms, memory management, time, random generation, exceptions, utilities, and more.\n\nA productive C++ developer learns to search the standard library before implementing common functionality from scratch. Using `std::vector` instead of a custom dynamic array, `std::sort` instead of a hand-written sorting routine, or `std::unique_ptr` instead of manual ownership can eliminate entire categories of bugs.\n\nThe standard library also provides consistent interfaces. Once you understand concepts such as iterators, ranges, RAII, callable objects, and value semantics, many seemingly different facilities start to feel like variations of the same design patterns.\n\nThe standard library is a major part of practical C++ because it provides tested building blocks for common tasks. Instead of implementing a dynamic array, string abstraction, sorting routine, hash table, smart pointer, or file stream from scratch, use the standard facility when it matches the requirement.\n\nLearning the library also teaches modern C++ design. `std::vector` demonstrates managed dynamic storage, `std::string` manages text, `<algorithm>` provides reusable operations, `<memory>` provides ownership abstractions, `<chrono>` models time, and `<random>` separates engines from distributions. These facilities reinforce a consistent principle: resource management and common behavior should be expressed through reusable types and algorithms.\n\nA practical learning habit is to recognize a problem before writing code. If you need a growable sequence, investigate `vector`; if you need key/value lookup, investigate `map` or `unordered_map`; if you need sorting, investigate `<algorithm>`; if you need exclusive ownership, investigate `unique_ptr`. Using the standard library reduces custom code and gives future readers familiar abstractions."
            },
            {
              title: "Example",
              content: "```cpp\n#include <algorithm>\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> values{9, 2, 8, 4};\n\n    std::sort(values.begin(), values.end());\n\n    for (int value : values) {\n        std::cout << value << ' ';\n    }\n}\n```\nThe program combines a standard container, an algorithm, iterators supplied by `begin()`/`end()`, and stream output."
            },
            {
              title: "Practical use",
              content: "Before writing custom infrastructure, check whether the standard library already provides a reliable solution."
            }
          ]
        }
      ]
    }
  ]
}
];


async function main() {
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

  for (const pathSeed of paths) {
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
        isPublished: true,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
      },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
      const moduleSeed = pathSeed.modules[moduleIndex];

      const studyModule = await prisma.studyModule.upsert({
        where: {
          studyPathId_slug: {
            studyPathId: path.id,
            slug: moduleSeed.slug,
          },
        },
        update: {
          title: moduleSeed.title,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
      });

      for (let topicIndex = 0; topicIndex < (moduleSeed.topics ?? []).length; topicIndex++) {
        const topicSeed = moduleSeed.topics![topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;

        const topic = await prisma.studyTopic.upsert({
          where: {
            categoryId_slug: {
              categoryId: category.id,
              slug: topicSlug,
            },
          },
          update: {
            moduleId: studyModule.id,
            title: topicSeed.title,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
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

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex++) {
          const section = topicSeed.sections![sectionIndex];
          const sectionId = `${topic.id}-section-${sectionIndex}`;

          await prisma.studyTopicSection.upsert({
            where: { id: sectionId },
            update: {
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
            create: {
              id: sectionId,
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

  console.log("C++ Programming seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("C++ Programming seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
