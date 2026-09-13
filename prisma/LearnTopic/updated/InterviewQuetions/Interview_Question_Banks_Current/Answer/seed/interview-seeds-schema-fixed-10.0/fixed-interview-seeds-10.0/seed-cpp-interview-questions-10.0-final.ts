import { PrismaClient, ExperienceLevel, Difficulty, InterviewType } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORY = {
  name: "C++ Developer",
  slug: "cpp-developer",
};

const SUBCATEGORIES = [
  {
    "name": "C++ Fundamentals",
    "slug": "cpp-fundamentals"
  },
  {
    "name": "I/O, Exceptions & Systems",
    "slug": "io-exceptions-systems"
  },
  {
    "name": "Memory, Pointers & Resource Management",
    "slug": "memory-pointers-resource-management"
  },
  {
    "name": "Modern C++ & Templates",
    "slug": "modern-cpp-templates"
  },
  {
    "name": "OOP & Language Fundamentals",
    "slug": "oop-language-fundamentals"
  },
  {
    "name": "STL & Standard Library",
    "slug": "stl-standard-library"
  }
];

const questions = [
  {
    "question": "What are virtual functions?",
    "slug": "what-are-virtual-functions",
    "shortDescription": "[REPORTED] C++ interview question covering What are virtual functions?. Source classification is preserved.",
    "sampleAnswer": "A virtual function enables dynamic dispatch. When a derived class overrides a virtual function, a call through a base reference or pointer can select the implementation associated with the object’s dynamic type. The language defines the dispatch semantics; compilers commonly implement them with a vtable and a hidden vptr. Virtual dispatch is the standard C++ mechanism for runtime polymorphism.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: A virtual function enables dynamic dispatch. When a derived class overrides a virtual function, a call through a base reference or pointer can select the implementation associated with the object’s dynamic type. The language defines the dispatch semantics; compilers commonly implement them with a vtable and a hidden vptr. Virtual dispatch is the standard C++ mechanism for runtime polymorphism.\n\nExample: struct Base { virtual void show(){ std::cout << “Base”; } }; struct Derived: Base { void show() override { std::cout << “Derived”; } }; Base& b = d; b.show(); // Derived\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is virtual inheritance?",
    "slug": "what-is-virtual-inheritance",
    "shortDescription": "[REPORTED] C++ interview question covering What is virtual inheritance?. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions",
      "Inheritance"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the difference between call by reference and call by value?",
    "slug": "what-is-the-difference-between-call-by-reference-and-call-by-value",
    "shortDescription": "[REPORTED] C++ interview question covering What is the difference between call by reference and call by value?. Source classification is preserved.",
    "sampleAnswer": "C++ supports pass-by-value and reference parameters. A value parameter receives its own value, while a reference parameter aliases the caller’s object and can modify it unless the reference is const. const T& is commonly used to avoid copying while preventing modification.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: C++ supports pass-by-value and reference parameters. A value parameter receives its own value, while a reference parameter aliases the caller’s object and can modify it unless the reference is const. const T& is commonly used to avoid copying while preventing modification.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is an inline function?",
    "slug": "what-is-an-inline-function",
    "shortDescription": "[REPORTED] C++ interview question covering What is an inline function?. Source classification is preserved.",
    "sampleAnswer": "inline permits a function to be defined in multiple translation units under the C++ One Definition Rule when the definitions are equivalent, which is why it is common for functions defined in headers. It is also historically associated with an optimization hint, but modern compilers decide independently whether to inline a call. Therefore inline does not guarantee machine-code inlining.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: inline permits a function to be defined in multiple translation units under the C++ One Definition Rule when the definitions are equivalent, which is why it is common for functions defined in headers. It is also historically associated with an optimization hint, but modern compilers decide independently whether to inline a call. Therefore inline does not guarantee machine-code inlining.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "io-exceptions-systems",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the difference between C and C++?",
    "slug": "what-is-the-difference-between-c-and-c",
    "shortDescription": "[COMMON] C++ interview question covering What is the difference between C and C++?. Source classification is preserved.",
    "sampleAnswer": "C is primarily procedural and gives direct, low-level control over memory and data representation. C++ supports procedural programming as well but adds classes, inheritance, polymorphism, templates, exceptions, RAII, the standard library, and modern resource-management facilities. C++ also retains much of C’s low-level capability, which is why it is widely used when both abstraction and performance are important.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: C is primarily procedural and gives direct, low-level control over memory and data representation. C++ supports procedural programming as well but adds classes, inheritance, polymorphism, templates, exceptions, RAII, the standard library, and modern resource-management facilities. C++ also retains much of C’s low-level capability, which is why it is widely used when both abstraction and performance are important.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "cpp-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a pure virtual function?",
    "slug": "what-is-a-pure-virtual-function",
    "shortDescription": "[COMMON] C++ interview question covering What is a pure virtual function?. Source classification is preserved.",
    "sampleAnswer": "A virtual function enables dynamic dispatch. When a derived class overrides a virtual function, a call through a base reference or pointer can select the implementation associated with the object’s dynamic type. The language defines the dispatch semantics; compilers commonly implement them with a vtable and a hidden vptr. Virtual dispatch is the standard C++ mechanism for runtime polymorphism.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: A virtual function enables dynamic dispatch. When a derived class overrides a virtual function, a call through a base reference or pointer can select the implementation associated with the object’s dynamic type. The language defines the dispatch semantics; compilers commonly implement them with a vtable and a hidden vptr. Virtual dispatch is the standard C++ mechanism for runtime polymorphism.\n\nExample: struct Base { virtual void show(){ std::cout << “Base”; } }; struct Derived: Base { void show() override { std::cout << “Derived”; } }; Base& b = d; b.show(); // Derived\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a constructor?",
    "slug": "what-is-a-constructor",
    "shortDescription": "[COMMON] C++ interview question covering What is a constructor?. Source classification is preserved.",
    "sampleAnswer": "A constructor initializes an object’s state and establishes its invariants. Constructors can be overloaded and are selected according to the argument list. Initialization of bases and members happens before the constructor body, following the class declaration order for members.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: A constructor initializes an object’s state and establishes its invariants. Constructors can be overloaded and are selected according to the argument list. Initialization of bases and members happens before the constructor body, following the class declaration order for members.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Constructors",
      "Const Correctness"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a copy assignment operator?",
    "slug": "what-is-a-copy-assignment-operator",
    "shortDescription": "[COMMON] C++ interview question covering What is a copy assignment operator?. Source classification is preserved.",
    "sampleAnswer": "The copy assignment operator assigns an existing object from another existing object, commonly T& operator=(const T&). Unlike a copy constructor, both objects already exist. A resource-owning implementation must handle self-assignment, release or replace the old resource safely, and maintain a valid state if an operation fails.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: The copy assignment operator assigns an existing object from another existing object, commonly T& operator=(const T&). Unlike a copy constructor, both objects already exist. A resource-owning implementation must handle self-assignment, release or replace the old resource safely, and maintain a valid state if an operation fails.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is const correctness?",
    "slug": "what-is-const-correctness",
    "shortDescription": "[COMMON] C++ interview question covering What is const correctness?. Source classification is preserved.",
    "sampleAnswer": "Const correctness means expressing which objects and operations are allowed to modify state. A const member function promises not to modify the object’s ordinary state, and const references/pointers can provide read-only access. Good const correctness prevents accidental mutation and lets APIs work with genuinely const objects.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: Const correctness means expressing which objects and operations are allowed to modify state. A const member function promises not to modify the object’s ordinary state, and const references/pointers can provide read-only access. Good const correctness prevents accidental mutation and lets APIs work with genuinely const objects.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Const Correctness"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the difference between malloc and calloc?",
    "slug": "what-is-the-difference-between-malloc-and-calloc",
    "shortDescription": "[REPORTED] C++ interview question covering What is the difference between malloc and calloc?. Source classification is preserved.",
    "sampleAnswer": "malloc allocates a requested number of bytes without initializing the storage. calloc allocates an array-like block and initializes all allocated bytes to zero. Both return a pointer or NULL on failure and are released with free. In C++, these functions are usually avoided for ordinary object ownership in favor of RAII containers and smart pointers.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: malloc allocates a requested number of bytes without initializing the storage. calloc allocates an array-like block and initializes all allocated bytes to zero. Both return a pointer or NULL on failure and are released with free. In C++, these functions are usually avoided for ordinary object ownership in favor of RAII containers and smart pointers.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Dynamic Memory"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the difference between new and malloc?",
    "slug": "what-is-the-difference-between-new-and-malloc",
    "shortDescription": "[REPORTED] C++ interview question covering What is the difference between new and malloc?. Source classification is preserved.",
    "sampleAnswer": "new is a C++ language operation that allocates storage and initializes an object, invoking constructors for class types. delete destroys the object and releases its storage. malloc is a C library allocation function that returns raw storage and does not call C++ constructors. Consequently, new must be matched with delete and malloc with free; mixing these allocation families is undefined behavior.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: new is a C++ language operation that allocates storage and initializes an object, invoking constructors for class types. delete destroys the object and releases its storage. malloc is a C library allocation function that returns raw storage and does not call C++ constructors. Consequently, new must be matched with delete and malloc with free; mixing these allocation families is undefined behavior.\n\nExample: Widget* a = new Widget; delete a; int* b = static_cast<int*>(std::malloc(sizeof(int))); std::free(b);\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Dynamic Memory"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is virtual memory?",
    "slug": "what-is-virtual-memory",
    "shortDescription": "[REPORTED] C++ interview question covering What is virtual memory?. Source classification is preserved.",
    "sampleAnswer": "Virtual memory is an operating-system mechanism that gives processes a virtual address space and maps virtual addresses to physical memory or other backing storage. It provides isolation and allows the OS to manage memory beyond a process’s immediately resident physical pages. Exact implementation is platform-dependent.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: Virtual memory is an operating-system mechanism that gives processes a virtual address space and maps virtual addresses to physical memory or other backing storage. It provides isolation and allows the OS to manage memory beyond a process’s immediately resident physical pages. Exact implementation is platform-dependent.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions",
      "Memory Management"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Explain how memory is allocated when code runs.",
    "slug": "explain-how-memory-is-allocated-when-code-runs",
    "shortDescription": "[REPORTED] C++ interview question covering Explain how memory is allocated when code runs. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Memory Management"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Explain copy constructors and object copying.",
    "slug": "explain-copy-constructors-and-object-copying",
    "shortDescription": "[REPORTED] C++ interview question covering Explain copy constructors and object copying. Source classification is preserved.",
    "sampleAnswer": "A copy constructor initializes a new object from another object of the same type, commonly Class(const Class&). The compiler can generate one automatically, performing memberwise copy. If a class owns a raw resource, memberwise copying may produce two objects referring to the same resource, so a resource-owning class must define an appropriate copy policy or, preferably, use RAII members that follow the Rule of Zero.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: A copy constructor initializes a new object from another object of the same type, commonly Class(const Class&). The compiler can generate one automatically, performing memberwise copy. If a class owns a raw resource, memberwise copying may produce two objects referring to the same resource, so a resource-owning class must define an appropriate copy policy or, preferably, use RAII members that follow the Rule of Zero.\n\nExample: class Buffer { std::string data; public: Buffer(const Buffer& other) : data(other.data) {} };\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Constructors",
      "Const Correctness"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the difference between new/delete and malloc/free?",
    "slug": "what-is-the-difference-between-new-delete-and-malloc-free",
    "shortDescription": "[COMMON] C++ interview question covering What is the difference between new/delete and malloc/free?. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Dynamic Memory"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Why must new be paired with delete and malloc with free?",
    "slug": "why-must-new-be-paired-with-delete-and-malloc-with-free",
    "shortDescription": "[COMMON] C++ interview question covering Why must new be paired with delete and malloc with free?. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Dynamic Memory"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What happens if you use delete on memory allocated with malloc?",
    "slug": "what-happens-if-you-use-delete-on-memory-allocated-with-malloc",
    "shortDescription": "[COMMON] C++ interview question covering What happens if you use delete on memory allocated with malloc?. Source classification is preserved.",
    "sampleAnswer": "These allocation families must not be mixed. Memory returned by malloc/calloc/realloc is released with free; objects allocated with new are released with delete, and arrays from new[] with delete[]. Mixing them is undefined behavior.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: These allocation families must not be mixed. Memory returned by malloc/calloc/realloc is released with free; objects allocated with new are released with delete, and arrays from new[] with delete[]. Mixing them is undefined behavior.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Memory Management",
      "Dynamic Memory"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What happens if you use free on memory allocated with new?",
    "slug": "what-happens-if-you-use-free-on-memory-allocated-with-new",
    "shortDescription": "[COMMON] C++ interview question covering What happens if you use free on memory allocated with new?. Source classification is preserved.",
    "sampleAnswer": "These allocation families must not be mixed. Memory returned by malloc/calloc/realloc is released with free; objects allocated with new are released with delete, and arrays from new[] with delete[]. Mixing them is undefined behavior.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: These allocation families must not be mixed. Memory returned by malloc/calloc/realloc is released with free; objects allocated with new are released with delete, and arrays from new[] with delete[]. Mixing them is undefined behavior.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Memory Management"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Why should a polymorphic base class usually have a virtual destructor?",
    "slug": "why-should-a-polymorphic-base-class-usually-have-a-virtual-destructor",
    "shortDescription": "[COMMON] C++ interview question covering Why should a polymorphic base class usually have a virtual destructor?. Source classification is preserved.",
    "sampleAnswer": "A base-class destructor should generally be virtual when the class is intended to be used polymorphically and objects may be deleted through a base pointer. Then deleting a Derived object through Base* invokes the derived destructor before the base destructor. Without a virtual base destructor, deleting a derived object through a base pointer is undefined behavior. A virtual destructor is therefore primarily an object-lifetime and ownership-safety requirement for polymorphic bases.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: A base-class destructor should generally be virtual when the class is intended to be used polymorphically and objects may be deleted through a base pointer. Then deleting a Derived object through Base* invokes the derived destructor before the base destructor. Without a virtual base destructor, deleting a derived object through a base pointer is undefined behavior. A virtual destructor is therefore primarily an object-lifetime and ownership-safety requirement for polymorphic bases.\n\nExample: struct Base { virtual ~Base() = default; virtual void run() = 0; }; struct Derived : Base { ~Derived() override = default; void run() override {} }; Base* p = new Derived; delete p;\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions",
      "Destructors"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Why is RAII important in modern C++?",
    "slug": "why-is-raii-important-in-modern-c",
    "shortDescription": "[COMMON] C++ interview question covering Why is RAII important in modern C++?. Source classification is preserved.",
    "sampleAnswer": "RAII, Resource Acquisition Is Initialization, binds resource ownership to an object’s lifetime. The constructor acquires or establishes ownership and the destructor releases it. This makes cleanup deterministic even when functions return early or exceptions are thrown. std::vector, std::string, and std::unique_ptr are common examples.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: RAII, Resource Acquisition Is Initialization, binds resource ownership to an object’s lifetime. The constructor acquires or establishes ownership and the destructor releases it. This makes cleanup deterministic even when functions return early or exceptions are thrown. std::vector, std::string, and std::unique_ptr are common examples.\n\nExample: std::unique_ptr<FILE, decltype(&fclose)> f(std::fopen(“data.txt”,“r”), &fclose); // fclose runs automatically\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "How does weak_ptr break a shared_ptr cycle?",
    "slug": "how-does-weak-ptr-break-a-shared-ptr-cycle",
    "shortDescription": "[COMMON] C++ interview question covering How does weak_ptr break a shared_ptr cycle?. Source classification is preserved.",
    "sampleAnswer": "std::weak_ptr is a non-owning observer of an object managed by std::shared_ptr. It does not increase the reference count and can be converted temporarily to shared_ptr through lock() if the object is still alive. It is particularly useful for breaking shared_ptr ownership cycles.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: std::weak_ptr is a non-owning observer of an object managed by std::shared_ptr. It does not increase the reference count and can be converted temporarily to shared_ptr through lock() if the object is still alive. It is particularly useful for breaking shared_ptr ownership cycles.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "shared_ptr"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is an lvalue?",
    "slug": "what-is-an-lvalue",
    "shortDescription": "[COMMON] C++ interview question covering What is an lvalue?. Source classification is preserved.",
    "sampleAnswer": "An lvalue generally identifies an object with a persistent location, while an rvalue is an expression representing a value/category suitable for being moved from in many contexts. C++‘s value categories are more precise than simply ’has an address’ versus ‘temporary’. Understanding them is essential for references and move semantics.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: An lvalue generally identifies an object with a persistent location, while an rvalue is an expression representing a value/category suitable for being moved from in many contexts. C++‘s value categories are more precise than simply ’has an address’ versus ‘temporary’. Understanding them is essential for references and move semantics.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Is std::move itself moving an object?",
    "slug": "is-std-move-itself-moving-an-object",
    "shortDescription": "[COMMON] C++ interview question covering Is std::move itself moving an object?. Source classification is preserved.",
    "sampleAnswer": "std::move does not itself move an object. It is essentially a cast that converts an expression to an xvalue so overload resolution can select move operations. The object’s move constructor or move assignment operator performs the actual resource transfer.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: std::move does not itself move an object. It is essentially a cast that converts an expression to an xvalue so overload resolution can select move operations. The object’s move constructor or move assignment operator performs the actual resource transfer.\n\nExample: std::string a = “large text”; std::string b = std::move(a); // std::move enables move overload; it does not itself move\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Move Semantics"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the Rule of Five?",
    "slug": "what-is-the-rule-of-five",
    "shortDescription": "[COMMON] C++ interview question covering What is the Rule of Five?. Source classification is preserved.",
    "sampleAnswer": "The Rule of Five concerns destructor, copy constructor, copy assignment, move constructor, and move assignment for resource-managing classes. The Rule of Zero recommends avoiding manual resource-management special members by storing resources in RAII types such as std::vector, std::string, and std::unique_ptr, allowing the compiler-generated operations to be correct.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: The Rule of Five concerns destructor, copy constructor, copy assignment, move constructor, and move assignment for resource-managing classes. The Rule of Zero recommends avoiding manual resource-management special members by storing resources in RAII types such as std::vector, std::string, and std::unique_ptr, allowing the compiler-generated operations to be correct.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "cpp-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Questions focused mainly on virtual functions and virtual destructors.",
    "slug": "questions-focused-mainly-on-virtual-functions-and-virtual-destructors",
    "shortDescription": "[REPORTED] C++ interview question covering Questions focused mainly on virtual functions and virtual destructors. Source classification is preserved.",
    "sampleAnswer": "A base-class destructor should generally be virtual when the class is intended to be used polymorphically and objects may be deleted through a base pointer. Then deleting a Derived object through Base* invokes the derived destructor before the base destructor. Without a virtual base destructor, deleting a derived object through a base pointer is undefined behavior. A virtual destructor is therefore primarily an object-lifetime and ownership-safety requirement for polymorphic bases.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: A base-class destructor should generally be virtual when the class is intended to be used polymorphically and objects may be deleted through a base pointer. Then deleting a Derived object through Base* invokes the derived destructor before the base destructor. Without a virtual base destructor, deleting a derived object through a base pointer is undefined behavior. A virtual destructor is therefore primarily an object-lifetime and ownership-safety requirement for polymorphic bases.\n\nExample: struct Base { virtual ~Base() = default; virtual void run() = 0; }; struct Derived : Base { ~Derived() override = default; void run() override {} }; Base* p = new Derived; delete p;\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions",
      "Destructors"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What happens when the virtual keyword is used?",
    "slug": "what-happens-when-the-virtual-keyword-is-used",
    "shortDescription": "[REPORTED] C++ interview question covering What happens when the virtual keyword is used?. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Explain polymorphism.",
    "slug": "explain-polymorphism",
    "shortDescription": "[REPORTED] C++ interview question covering Explain polymorphism. Source classification is preserved.",
    "sampleAnswer": "Polymorphism allows one interface to represent different implementations. Compile-time polymorphism includes overloading and templates; runtime polymorphism commonly uses virtual functions and overriding through a base pointer or reference.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: Polymorphism allows one interface to represent different implementations. Compile-time polymorphism includes overloading and templates; runtime polymorphism commonly uses virtual functions and overriding through a base pointer or reference.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Polymorphism"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "How does runtime polymorphism work?",
    "slug": "how-does-runtime-polymorphism-work",
    "shortDescription": "[COMMON] C++ interview question covering How does runtime polymorphism work?. Source classification is preserved.",
    "sampleAnswer": "Polymorphism allows one interface to represent different implementations. Compile-time polymorphism includes overloading and templates; runtime polymorphism commonly uses virtual functions and overriding through a base pointer or reference.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: Polymorphism allows one interface to represent different implementations. Compile-time polymorphism includes overloading and templates; runtime polymorphism commonly uses virtual functions and overriding through a base pointer or reference.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Polymorphism"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a vtable?",
    "slug": "what-is-a-vtable",
    "shortDescription": "[COMMON] C++ interview question covering What is a vtable?. Source classification is preserved.",
    "sampleAnswer": "A vtable/vptr is the common compiler implementation model for virtual dispatch, not a layout mandated by the C++ standard. A polymorphic object commonly contains or is associated with a hidden pointer to a table of virtual-function targets. The exact representation, number of tables, and object layout are implementation-dependent.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: A vtable/vptr is the common compiler implementation model for virtual dispatch, not a layout mandated by the C++ standard. A polymorphic object commonly contains or is associated with a hidden pointer to a table of virtual-function targets. The exact representation, number of tables, and object layout are implementation-dependent.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "cpp-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "vector vs list?",
    "slug": "vector-vs-list",
    "shortDescription": "[COMMON] C++ interview question covering vector vs list?. Source classification is preserved.",
    "sampleAnswer": "std::vector stores elements contiguously and provides fast random access, excellent cache locality, and amortized O(1) push_back. std::list is a linked list with O(1) insertion/erasure at a known position but poor locality and no random access. In practice vector is usually the default sequence container unless list-specific semantics are required.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: std::vector stores elements contiguously and provides fast random access, excellent cache locality, and amortized O(1) push_back. std::list is a linked list with O(1) insertion/erasure at a known position but poor locality and no random access. In practice vector is usually the default sequence container unless list-specific semantics are required.\n\nExample: std::vector v{1,2,3}; // contiguous storage and fast indexing std::list l{1,2,3}; // linked nodes\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "vector",
      "list"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "set vs multiset?",
    "slug": "set-vs-multiset",
    "shortDescription": "[COMMON] C++ interview question covering set vs multiset?. Source classification is preserved.",
    "sampleAnswer": "map and set enforce unique keys/elements, while multimap and multiset permit multiple equivalent keys/elements. All ordered associative containers provide logarithmic complexity requirements for key operations.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: map and set enforce unique keys/elements, while multimap and multiset permit multiple equivalent keys/elements. All ordered associative containers provide logarithmic complexity requirements for key operations.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "emplace_back() vs push_back()?",
    "slug": "emplace-back-vs-push-back",
    "shortDescription": "[COMMON] C++ interview question covering emplace_back() vs push_back()?. Source classification is preserved.",
    "sampleAnswer": "vector::push_back appends an element. Its complexity is amortized O(1), although an individual operation can be O(n) when capacity must grow and existing elements are moved/copied. Reallocation can also invalidate pointers, references, and iterators to elements.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: vector::push_back appends an element. Its complexity is amortized O(1), although an individual operation can be O(n) when capacity must grow and existing elements are moved/copied. Reallocation can also invalidate pointers, references, and iterators to elements.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is the difference between lower_bound and upper_bound?",
    "slug": "what-is-the-difference-between-lower-bound-and-upper-bound",
    "shortDescription": "[COMMON] C++ interview question covering What is the difference between lower_bound and upper_bound?. Source classification is preserved.",
    "sampleAnswer": "lower_bound returns the first position whose value is not less than the target; upper_bound returns the first position whose value is greater than the target. Together they are useful for finding insertion ranges and counting equivalent values in sorted ranges.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: lower_bound returns the first position whose value is not less than the target; upper_bound returns the first position whose value is greater than the target. Together they are useful for finding insertion ranges and counting equivalent values in sorted ranges.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "How would you find duplicates using STL?",
    "slug": "how-would-you-find-duplicates-using-stl",
    "shortDescription": "[COMMON] C++ interview question covering How would you find duplicates using STL?. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a function template?",
    "slug": "what-is-a-function-template",
    "shortDescription": "[COMMON] C++ interview question covering What is a function template?. Source classification is preserved.",
    "sampleAnswer": "Templates let C++ write type-generic code that is instantiated for concrete types. Function templates generalize functions; class templates generalize types. They enable compile-time polymorphism and can provide strong type safety and performance without virtual dispatch.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: Templates let C++ write type-generic code that is instantiated for concrete types. Function templates generalize functions; class templates generalize types. They enable compile-time polymorphism and can provide strong type safety and performance without virtual dispatch.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Templates"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Why use templates?",
    "slug": "why-use-templates",
    "shortDescription": "[COMMON] C++ interview question covering Why use templates?. Source classification is preserved.",
    "sampleAnswer": "Templates let C++ write type-generic code that is instantiated for concrete types. Function templates generalize functions; class templates generalize types. They enable compile-time polymorphism and can provide strong type safety and performance without virtual dispatch.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: Templates let C++ write type-generic code that is instantiated for concrete types. Function templates generalize functions; class templates generalize types. They enable compile-time polymorphism and can provide strong type safety and performance without virtual dispatch.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Templates"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Full specialization vs partial specialization?",
    "slug": "full-specialization-vs-partial-specialization",
    "shortDescription": "[COMMON] C++ interview question covering Full specialization vs partial specialization?. Source classification is preserved.",
    "sampleAnswer": "Template specialization provides an alternate implementation for particular template arguments. Full specialization defines behavior for a complete set of template arguments; partial specialization is available for class templates and matches a family of types. Specialization is useful when a generic implementation needs type-specific behavior.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: Template specialization provides an alternate implementation for particular template arguments. Full specialization defines behavior for a complete set of template arguments; partial specialization is available for class templates and matches a family of types. Specialization is useful when a generic implementation needs type-specific behavior.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "io-exceptions-systems",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is type deduction?",
    "slug": "what-is-type-deduction",
    "shortDescription": "[COMMON] C++ interview question covering What is type deduction?. Source classification is preserved.",
    "sampleAnswer": "auto deduces a type from an initializer using rules related to template argument deduction, with important differences such as top-level cv/reference handling. decltype instead determines a type based on the exact expression form and preserves reference information in cases where auto would not.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: auto deduces a type from an initializer using rules related to template argument deduction, with important differences such as top-level cv/reference handling. decltype instead determines a type based on the exact expression form and preserves reference information in cases where auto would not.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "io-exceptions-systems",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "When would you prefer templates over runtime polymorphism?",
    "slug": "when-would-you-prefer-templates-over-runtime-polymorphism",
    "shortDescription": "[COMMON] C++ interview question covering When would you prefer templates over runtime polymorphism?. Source classification is preserved.",
    "sampleAnswer": "Templates let C++ write type-generic code that is instantiated for concrete types. Function templates generalize functions; class templates generalize types. They enable compile-time polymorphism and can provide strong type safety and performance without virtual dispatch.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: Templates let C++ write type-generic code that is instantiated for concrete types. Function templates generalize functions; class templates generalize types. They enable compile-time polymorphism and can provide strong type safety and performance without virtual dispatch.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Templates",
      "Polymorphism"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a constant reference?",
    "slug": "what-is-a-constant-reference",
    "shortDescription": "[REPORTED] C++ interview question covering What is a constant reference?. Source classification is preserved.",
    "sampleAnswer": "A const reference, such as const std::string&, provides read-only access to an existing object without making a copy. It can also bind to temporary values. It is a common C++ parameter type when a function needs efficient read-only access.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: A const reference, such as const std::string&, provides read-only access to an existing object without making a copy. It can also bind to temporary values. It is a common C++ parameter type when a function needs efficient read-only access.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Const Correctness"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "What is a pointer?",
    "slug": "what-is-a-pointer",
    "shortDescription": "[COMMON] C++ interview question covering What is a pointer?. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Pointers"
    ],
    "subcategorySlug": "memory-pointers-resource-management",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Design an Array class using C++ features.",
    "slug": "design-an-array-class-using-c-features",
    "shortDescription": "[REPORTED] C++ interview question covering Design an Array class using C++ features. Source classification is preserved.",
    "sampleAnswer": "A custom array class should encapsulate its buffer, size, and capacity and implement correct construction, destruction, copying, moving, indexing, and resizing. If it owns dynamic memory, the class must maintain the appropriate Rule of Five or, preferably, delegate ownership to a standard RAII container. In production, std::vector is normally preferred.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: A custom array class should encapsulate its buffer, size, and capacity and implement correct construction, destruction, copying, moving, indexing, and resizing. If it owns dynamic memory, the class must maintain the appropriate Rule of Five or, preferably, delegate ownership to a standard RAII container. In production, std::vector is normally preferred.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Reverse a linked list.",
    "slug": "reverse-a-linked-list",
    "shortDescription": "[REPORTED] C++ interview question covering Reverse a linked list. Source classification is preserved.",
    "sampleAnswer": "Reverse the links iteratively using previous, current, and next pointers. Save current->next, point current->next to previous, then advance. The new head is previous. Complexity is O(n) time and O(1) auxiliary space.",
    "detailedAnswer": "Source classification: [REPORTED]\n\nAnswer: Reverse the links iteratively using previous, current, and next pointers. Save current->next, point current->next to previous, then advance. The new head is previous. Complexity is O(n) time and O(1) auxiliary space.\n\nExample: Node* prev=nullptr; Node* cur=head; while(cur){ Node* next=cur->next; cur->next=prev; prev=cur; cur=next; } head=prev;\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [REPORTED] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "list"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Reverse a singly linked list.",
    "slug": "reverse-a-singly-linked-list",
    "shortDescription": "[COMMON] C++ interview question covering Reverse a singly linked list. Source classification is preserved.",
    "sampleAnswer": "This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: This question is part of the supplied C++ interview bank. A strong interview answer should define the concept precisely, explain how it works in C++, state when it is useful, mention an important limitation or edge case, and give a small practical example. The exact source supports the question/topic; the detailed explanation below is an interview-preparation expansion rather than a claim that every follow-up detail was explicitly reported by the cited interview.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "list"
    ],
    "subcategorySlug": "stl-standard-library",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Predict the output of code involving constructors/destructors.",
    "slug": "predict-the-output-of-code-involving-constructors-destructors",
    "shortDescription": "[COMMON] C++ interview question covering Predict the output of code involving constructors/destructors. Source classification is preserved.",
    "sampleAnswer": "A constructor initializes an object and establishes its class invariants; a destructor runs when the object’s lifetime ends and releases owned resources. Constructors can be overloaded because they have different parameter lists. Destructors cannot be overloaded because a type has one destructor signature and destruction is tied to object lifetime.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: A constructor initializes an object and establishes its class invariants; a destructor runs when the object’s lifetime ends and releases owned resources. Constructors can be overloaded because they have different parameter lists. Destructors cannot be overloaded because a type has one destructor signature and destruction is tied to object lifetime.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Constructors",
      "Destructors",
      "Const Correctness"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Predict the output of code involving virtual functions.",
    "slug": "predict-the-output-of-code-involving-virtual-functions",
    "shortDescription": "[COMMON] C++ interview question covering Predict the output of code involving virtual functions. Source classification is preserved.",
    "sampleAnswer": "A virtual function enables dynamic dispatch. When a derived class overrides a virtual function, a call through a base reference or pointer can select the implementation associated with the object’s dynamic type. The language defines the dispatch semantics; compilers commonly implement them with a vtable and a hidden vptr. Virtual dispatch is the standard C++ mechanism for runtime polymorphism.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: A virtual function enables dynamic dispatch. When a derived class overrides a virtual function, a call through a base reference or pointer can select the implementation associated with the object’s dynamic type. The language defines the dispatch semantics; compilers commonly implement them with a vtable and a hidden vptr. Virtual dispatch is the standard C++ mechanism for runtime polymorphism.\n\nExample: struct Base { virtual void show(){ std::cout << “Base”; } }; struct Derived: Base { void show() override { std::cout << “Derived”; } }; Base& b = d; b.show(); // Derived\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Virtual Functions"
    ],
    "subcategorySlug": "oop-language-fundamentals",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  },
  {
    "question": "Predict the output of code involving pointer/reference and const combinations.",
    "slug": "predict-the-output-of-code-involving-pointer-reference-and-const-combinations",
    "shortDescription": "[COMMON] C++ interview question covering Predict the output of code involving pointer/reference and const combinations. Source classification is preserved.",
    "sampleAnswer": "For output-prediction questions, trace evaluation order, object lifetime, overload/virtual dispatch, pointer values, and undefined behavior. The key interview skill is not merely guessing the printed output but identifying whether the C++ standard actually defines a single result.",
    "detailedAnswer": "Source classification: [COMMON]\n\nAnswer: For output-prediction questions, trace evaluation order, object lifetime, overload/virtual dispatch, pointer values, and undefined behavior. The key interview skill is not merely guessing the printed output but identifying whether the C++ standard actually defines a single result.\n\nExample: Use a small class/function that demonstrates the concept directly, then test the important edge case discussed in the interview.\n\nInterview Tip: Start with the direct definition, then explain the mechanism, why it matters, and one practical example. If the interviewer asks a comparison, answer both sides and finish with when you would choose each. For coding/output questions, explain the approach, complexity, and edge cases before presenting code.\n\nWhat Interviewer Is Testing: C++ language fundamentals, object lifetime, memory/resource ownership, OOP reasoning, modern C++ knowledge, STL understanding, and your ability to reason about code rather than memorize definitions.\n\nKey Points to Remember: Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.\n\nCommon Follow-up Questions: Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?\n\nCommon Mistakes: ",
    "explanation": "Interview-ready guidance for this C++ question. Source classification [COMMON] is retained; the supplied source does not claim that COMMON questions are company-specific reports.",
    "keyPoints": "Distinguish language guarantees from common compiler implementations. Be precise about undefined behavior, ownership, lifetime, constness, value categories, virtual dispatch, and STL complexity guarantees.",
    "commonMistakes": "",
    "followUpQuestions": "Why does this happen? What happens internally? What is the complexity? What is the edge case? How does modern C++ solve it? What happens if the object is destroyed or the allocation fails?",
    "tags": [
      "C++",
      "C++ Developer",
      "C++ Interview",
      "Object-Oriented Programming",
      "STL",
      "Modern C++",
      "Pointers",
      "Const Correctness"
    ],
    "subcategorySlug": "modern-cpp-templates",
    experienceLevel: ExperienceLevel.MID_LEVEL,
    difficulty: Difficulty.MEDIUM,
    interviewType: InterviewType.TECHNICAL
  }
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: CATEGORY.slug },
    update: { name: CATEGORY.name },
    create: {
      group: "Technology", name: CATEGORY.name, slug: CATEGORY.slug },
  });

  const subcategoryMap = new Map<string, string>();

  for (const subcategory of SUBCATEGORIES) {
    const created = await prisma.subcategory.upsert({
      where: {
        categoryId_slug: {
          categoryId: category.id,
          slug: subcategory.slug,
        },
      },
      update: { name: subcategory.name },
      create: {
        name: subcategory.name,
        slug: subcategory.slug,
        categoryId: category.id,
      },
    });
    subcategoryMap.set(subcategory.slug, created.id);
  }

  for (const item of questions) {
    const subcategoryId = subcategoryMap.get(item.subcategorySlug);
    if (!subcategoryId) throw new Error(`Missing subcategory: ${item.subcategorySlug}`);

    await prisma.interviewQuestion.upsert({
      where: { slug: item.slug },
      update: {
        question: item.question,
        categoryId: category.id,
        subcategoryId,
        experienceLevel: item.experienceLevel,
        difficulty: item.difficulty,
        interviewType: item.interviewType,
        shortDescription: item.shortDescription,
        explanation: item.explanation,
        sampleAnswer: item.sampleAnswer,
        detailedAnswer: item.detailedAnswer,
        keyPoints: item.keyPoints,
        commonMistakes: item.commonMistakes,
        followUpQuestions: item.followUpQuestions,
        tags: item.tags,
        isPublished: true,
      },
      create: {
        question: item.question,
        slug: item.slug,
        categoryId: category.id,
        subcategoryId,
        experienceLevel: item.experienceLevel,
        difficulty: item.difficulty,
        interviewType: item.interviewType,
        shortDescription: item.shortDescription,
        explanation: item.explanation,
        sampleAnswer: item.sampleAnswer,
        detailedAnswer: item.detailedAnswer,
        keyPoints: item.keyPoints,
        commonMistakes: item.commonMistakes,
        followUpQuestions: item.followUpQuestions,
        tags: item.tags,
        isPublished: true,
      },
    });
  }

  console.log(`C++ interview seed completed successfully: ${questions.length} questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
