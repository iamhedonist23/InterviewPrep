import { PrismaClient, StudyLevel } from "@prisma/client";

/**
 * DB-ready Java topic seed: 30/356
 *
 * Deep learning edition: explains method parameters and return values
 * from first principles, including invocation flow, primitive values,
 * object references, mutation vs reassignment, varargs, overloads,
 * API design, misconceptions, and prediction-based practice.
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
  title: "Method parameters and return values",
  slug: "method-parameters-and-return-values",
  description: "Learn how Java methods receive arguments, create parameter variables, return values, handle primitive and object references, use varargs, interact with overload resolution, and form clear API contracts.",
  estimatedMinutes: 45,
  sections: [
    {
      title: "What a method really does",
      content: "A Java method is a named operation that receives values, performs some work, and may produce a value for its caller.\n\n```java\nstatic int calculateTotal(int price, int quantity) {\n    return price * quantity;\n}\n\nint total = calculateTotal(50, 3);\n```\n\nThere are three different things to notice here:\n\n- `calculateTotal` is the method name.\n- `price` and `quantity` are parameters declared by the method.\n- `50` and `3` are arguments supplied by the caller.\n- `int` before the method name is the return type.\n- `return price * quantity` sends a value back to the caller.\n\nThe important mental model is that a method creates a boundary between the caller and the method body. The caller supplies values through the parameter list; the method works with its own parameter variables; and a returned value crosses the boundary in the other direction.\n\nFor example:\n\n```java\nint price = 50;\nint quantity = 3;\n\nint total = calculateTotal(price, quantity);\n```\n\nThe method does not somehow reach into the caller and use the caller's local variables directly. The values of the arguments are used to initialize the parameters for this particular invocation.\n\nThat distinction becomes especially important when the argument is an object reference.",
    },
    {
      title: "Parameter vs argument",
      content: "The terms parameter and argument describe two different locations in the program.\n\nA **parameter** appears in the method declaration:\n\n```java\nstatic int add(int first, int second) {\n    return first + second;\n}\n```\n\n`first` and `second` are parameters.\n\nAn **argument** appears when the method is called:\n\n```java\nint result = add(10, 20);\n```\n\n`10` and `20` are arguments.\n\nAn argument can be any expression whose resulting value is acceptable for the corresponding parameter:\n\n```java\nadd(10, 20);\nadd(x, y);\nadd(getPrice(), quantity);\nadd(5 + 5, 20);\n```\n\nJava evaluates those argument expressions before the method executes. Conceptually:\n\n```java\nint result = add(getPrice(), quantity);\n```\n\nmeans:\n\n1. Evaluate `getPrice()`.\n2. Evaluate `quantity`.\n3. Use those resulting values for the method parameters.\n4. Execute the method.\n5. Receive its return value.\n6. Assign that value to `result`.\n\nThinking in terms of values crossing a method boundary makes parameter behavior much easier to reason about than thinking of parameters as aliases for the caller's variables.",
    },
    {
      title: "What happens during a method call",
      content: "Consider:\n\n```java\nstatic int multiply(int a, int b) {\n    int result = a * b;\n    return result;\n}\n\nint x = 4;\nint y = 5;\nint answer = multiply(x, y);\n```\n\nWhen `multiply(x, y)` is invoked, Java does not move the variables `x` and `y` themselves into the method. Their current values are used as the arguments.\n\nA useful conceptual trace is:\n\n```text\nCaller\nx = 4\ny = 5\n   |\n   | argument values\n   v\nmultiply\na = 4\nb = 5\nresult = 20\n   |\n   | return 20\n   v\nanswer = 20\n```\n\nThe parameter variables `a` and `b` belong to that invocation. If the method is called again, a new invocation has its own parameter variables.\n\nThis is also why changing a primitive parameter does not change the caller's variable:\n\n```java\nstatic void change(int value) {\n    value = 99;\n}\n\nint number = 10;\nchange(number);\n\nSystem.out.println(number); // 10\n```\n\n`value` and `number` are different variables. The method changed its local parameter, not the caller's variable.",
    },
    {
      title: "Primitive parameters",
      content: "Primitive arguments such as `int`, `long`, `double`, `boolean`, and `char` are passed as values.\n\n```java\nstatic void increase(int value) {\n    value++;\n}\n\nint count = 10;\nincrease(count);\n\nSystem.out.println(count); // 10\n```\n\nThe method receives the value `10`. Incrementing its parameter changes only that parameter.\n\nIf the method returns the new value, the caller can explicitly receive it:\n\n```java\nstatic int increase(int value) {\n    return value + 1;\n}\n\nint count = 10;\ncount = increase(count);\n\nSystem.out.println(count); // 11\n```\n\nThis is a useful API design pattern: instead of trying to change the caller's primitive variable, the method calculates a result and the caller decides what to do with it.\n\nJava may also perform allowed compile-time conversions when selecting a method. For example:\n\n```java\nstatic void save(long id) {\n}\n\nint id = 10;\nsave(id); // int can be widened to long\n```\n\nBut unrelated types are not automatically converted:\n\n```java\n// save(\"10\"); // compile-time error\n```\n\nThe exact conversions that Java permits are part of overload resolution and method invocation rules.",
    },
    {
      title: "Object references: the part that causes confusion",
      content: "Objects require a different mental model.\n\nSuppose:\n\n```java\nclass Account {\n    double balance;\n}\n\nstatic void deposit(Account account, double amount) {\n    account.balance += amount;\n}\n\nAccount account = new Account();\naccount.balance = 100;\n\ndeposit(account, 50);\n```\n\nAfter the call, the balance is `150`.\n\nWhy? The key is that the value stored in `account` is a **reference to an object**. Java passes that reference value to the method. The parameter receives a copy of the reference, and both references identify the same object.\n\nConceptually:\n\n```text\nCaller\n\naccount ────────────────┐\n                        |\n                        v\n                    Account object\n                    balance = 100\n\n\nInside deposit\n\nparameter account ──────┘\n```\n\nThere are two reference variables, but one object.\n\nTherefore this changes the shared object:\n\n```java\naccount.balance = 150;\n```\n\nThe caller can observe the changed state because both references reach the same object.\n\nThis does **not** mean Java passes the object itself by reference. Java is always pass-by-value. In this case, the value being copied happens to be an object reference.",
    },
    {
      title: "Mutation and reassignment are different",
      content: "This distinction is one of the most important rules to understand in Java.\n\nConsider:\n\n```java\nstatic void update(Account account) {\n    account.balance = 500;   // mutation\n    account = new Account(); // reassignment\n    account.balance = 1000;  // mutation of the new object\n}\n\nAccount original = new Account();\noriginal.balance = 100;\n\nupdate(original);\n\nSystem.out.println(original.balance); // 500\n```\n\nWhy is the result `500`?\n\nAt the beginning, both the caller's variable and the parameter point to the original object.\n\n```text\ncaller account ────────┐\n                       v\n                    Object A\n                    balance=100\n                       ^\n                       |\nparameter account ──────┘\n```\n\nWhen the method executes:\n\n```java\naccount.balance = 500;\n```\n\nit mutates Object A. The caller sees that mutation.\n\nThen:\n\n```java\naccount = new Account();\n```\n\nchanges only the parameter so it points somewhere else:\n\n```text\ncaller account ───────> Object A\n                         balance=500\n\nparameter account ─────> Object B\n                         balance=0\n```\n\nThe caller's variable was never reassigned.\n\nThis is the cleanest way to remember the rule:\n\n**A method can mutate an object reached through a copied reference, but reassigning the parameter does not reassign the caller's reference variable.**",
    },
    {
      title: "Return values",
      content: "A non-`void` method promises to produce a value of its declared return type.\n\n```java\nstatic int square(int value) {\n    return value * value;\n}\n\nint result = square(5); // 25\n```\n\nThe return value can be:\n\n```java\nint a = square(5);\nprint(square(6));\nint b = square(square(2));\n```\n\nThe important point is that `return` does two things:\n\n1. It ends the current method invocation.\n2. It supplies a value to the caller when the method has a non-`void` return type.\n\nJava's compiler checks that a non-`void` method does not reach the end without returning an appropriate value.\n\n```java\nstatic int absolute(int value) {\n    if (value >= 0) {\n        return value;\n    }\n\n    return -value;\n}\n```\n\nA `void` method has no value to return:\n\n```java\nstatic void log(String message) {\n    System.out.println(message);\n}\n```\n\nIt may still use:\n\n```java\nreturn;\n```\n\nto exit early:\n\n```java\nstatic void process(Account account) {\n    if (account == null) {\n        return;\n    }\n\n    // process account\n}\n```\n\nA method's return type is part of its contract, but it cannot be used by itself to distinguish overloaded methods. These declarations are illegal:\n\n```java\n// int getValue()\n// double getValue()\n```\n\nif their parameter lists are otherwise identical.",
    },
    {
      title: "Returning objects",
      content: "A method can return a reference to an object just as it can return a primitive value.\n\n```java\nstatic Account createAccount() {\n    Account account = new Account();\n    account.balance = 100;\n    return account;\n}\n\nAccount account = createAccount();\n```\n\nThe returned value is the reference to the `Account` object.\n\nThis has an important consequence:\n\n```java\nstatic Account createAccount() {\n    Account account = new Account();\n    return account;\n}\n```\n\nThe local variable `account` disappears when the method invocation finishes, but the object can continue to exist because the caller now has a reference to it.\n\nReturning an object does not copy the entire object into the caller. The returned value is a reference to that object.\n\nThis is why APIs often return meaningful domain objects:\n\n```java\nrecord PriceBreakdown(double subtotal, double tax, double total) {}\n\nstatic PriceBreakdown calculatePrice(double subtotal, double tax) {\n    return new PriceBreakdown(subtotal, tax, subtotal + tax);\n}\n```\n\nA structured return type can communicate the result much more clearly than returning an array whose positions have to be remembered.",
    },
    {
      title: "null and reference parameters",
      content: "A reference parameter can receive `null`:\n\n```java\nstatic void printName(String name) {\n    System.out.println(name.length());\n}\n\nprintName(null);\n```\n\nThis compiles because `null` is compatible with `String`. The problem occurs when the method tries to dereference the null reference:\n\n```java\nname.length();\n```\n\nThat causes a `NullPointerException`.\n\nThe compiler knows the parameter is a `String`, but ordinary Java compilation does not generally prove that the reference can never be null.\n\nA method should therefore make its null behavior clear. For example:\n\n```java\nstatic int lengthOrZero(String text) {\n    if (text == null) {\n        return 0;\n    }\n\n    return text.length();\n}\n```\n\nWhether `null` should be accepted, rejected, or treated specially is an API design decision. In production code, silently accepting `null` can sometimes hide bugs, while explicitly rejecting invalid input can make failures easier to diagnose.",
    },
    {
      title: "Varargs: variable number of arguments",
      content: "Varargs allow a method to accept zero or more arguments of the same type.\n\n```java\nstatic int sum(int... values) {\n    int total = 0;\n\n    for (int value : values) {\n        total += value;\n    }\n\n    return total;\n}\n```\n\nThese calls are valid:\n\n```java\nsum();\nsum(10);\nsum(10, 20, 30);\n```\n\nInside the method, `values` behaves as an array. Conceptually, a call such as:\n\n```java\nsum(10, 20, 30);\n```\n\nprovides an array containing those values to the method.\n\nYou can also provide an existing array:\n\n```java\nint[] numbers = {10, 20, 30};\nsum(numbers);\n```\n\nThe varargs parameter must be the final parameter:\n\n```java\nstatic void log(String category, String... messages) {\n}\n```\n\nso this is not valid:\n\n```java\n// static void log(String... messages, String category)\n```\n\nThere is also an important edge case:\n\n```java\nsum();                 // values is an empty array\nsum((int[]) null);     // values is null\n```\n\nThe second call is allowed because the cast explicitly supplies a null `int[]`. Code that assumes `values` is never null could therefore fail.\n\nVarargs are useful when a variable number of homogeneous values is genuinely part of the operation. They are not a substitute for a meaningful object when an operation requires many unrelated pieces of information.",
    },
    {
      title: "Parameter type conversion and overload resolution",
      content: "When Java sees a method call, it must determine which method should receive the arguments. This becomes especially important when multiple methods have the same name.\n\n```java\nstatic void print(int value) {\n    System.out.println(\"int\");\n}\n\nstatic void print(long value) {\n    System.out.println(\"long\");\n}\n\nprint(10); // int\n```\n\nThe literal `10` is an `int`, so the `int` overload is the natural match.\n\nJava considers applicable methods using its language rules for method invocation conversions and overload resolution. Widening a primitive can make another overload applicable:\n\n```java\nprint(10L); // long\n```\n\nReference overloads can create a similar situation:\n\n```java\nstatic void send(Object value) {\n}\n\nstatic void send(String value) {\n}\n\nsend(\"hello\"); // String overload\n```\n\nThe compiler uses the compile-time type of the argument expression when selecting an overload.\n\nVarargs are also considered during overload resolution, but ordinary fixed-arity matches are preferred when applicable. This is why:\n\n```java\nstatic void log(String message) {\n}\n\nstatic void log(String... messages) {\n}\n\nlog(\"hello\");\n```\n\nselects the fixed-arity `String` method.\n\nUnderstanding parameters therefore also means understanding that the compiler is not merely counting arguments. It examines argument expressions, parameter types, permitted conversions, and the available overloads.",
    },
    {
      title: "Designing method parameters well",
      content: "A method signature is an API contract. Good parameters make correct usage obvious.\n\nThis:\n\n```java\ncreateUser(String firstName, String lastName, String email, boolean active);\n```\n\ncan be perfectly reasonable when the values are simple and stable.\n\nBut if an operation accumulates many related fields:\n\n```java\ncreateUser(\n    String firstName,\n    String lastName,\n    String email,\n    String phone,\n    String country,\n    boolean active,\n    boolean sendWelcomeEmail\n);\n```\n\na request object may communicate the domain concept better:\n\n```java\nrecord CreateUserRequest(\n    String firstName,\n    String lastName,\n    String email,\n    String phone,\n    String country,\n    boolean active,\n    boolean sendWelcomeEmail\n) {}\n\nstatic User createUser(CreateUserRequest request) {\n    // ...\n}\n```\n\nThis is not a rule that every method should have one parameter. The right design depends on the domain.\n\nGood parameter design generally aims for:\n\n- meaningful names;\n- types that express the expected data;\n- a small number of parameters when practical;\n- no unnecessary duplication;\n- explicit handling of invalid or missing values;\n- a contract callers can understand without reading implementation details.\n\nThe same principle applies to return values. Prefer a meaningful result type when callers need several related results.",
    },
    {
      title: "Common mistakes and misconceptions",
      content: "### “Java passes objects by reference”\n\nThis is the most common wording mistake. Java passes values. For an object argument, the value is a reference to the object.\n\n### “Changing the parameter changes the caller variable”\n\nNot for a reassignment:\n\n```java\nstatic void replace(Account account) {\n    account = new Account();\n}\n```\n\nThe caller's variable still points to the original object.\n\n### “A final parameter makes the object immutable”\n\nIt does not:\n\n```java\nstatic void update(final Account account) {\n    account.balance = 500; // allowed\n    // account = new Account(); // not allowed\n}\n```\n\n`final` prevents reassignment of the parameter variable. It does not automatically make the referenced object immutable.\n\n### “A method returning an object returns a copy”\n\nNormally, the returned value is a reference to the object. The object is not automatically cloned.\n\n### “void means the method does nothing”\n\nA `void` method can mutate objects, write files, update databases, print output, send network requests, or perform many other side effects. `void` only means there is no returned value.\n\nThese distinctions matter because method signatures describe the values crossing the API boundary, while object mutation describes what the method does with values it receives.",
    },
    {
      title: "A complete example",
      content: "Consider a small order calculation:\n\n```java\nrecord Order(double price, int quantity) {}\n\nstatic double calculateSubtotal(Order order) {\n    return order.price() * order.quantity();\n}\n\nstatic double applyDiscount(double subtotal, double percentage) {\n    return subtotal - (subtotal * percentage / 100);\n}\n\nstatic double calculateTotal(Order order, double discountPercentage) {\n    double subtotal = calculateSubtotal(order);\n    return applyDiscount(subtotal, discountPercentage);\n}\n```\n\nA caller can write:\n\n```java\nOrder order = new Order(100, 3);\n\ndouble total = calculateTotal(order, 10);\nSystem.out.println(total); // 270.0\n```\n\nSeveral parameter and return-value concepts are working together:\n\n1. `order` is an object reference passed by value.\n2. `discountPercentage` is a primitive value.\n3. `calculateSubtotal` returns a `double`.\n4. `calculateTotal` receives an object and a primitive.\n5. The returned `double` becomes an argument to another method.\n6. Each method has its own local variables and parameters.\n\nThis style also makes the code easier to test. Each calculation can be tested independently instead of putting the entire operation into one large method.",
    },
    {
      title: "How to read a method when learning or debugging",
      content: "When you encounter an unfamiliar method, use a consistent mental process.\n\nStart with the signature:\n\n```java\nstatic PriceBreakdown calculatePrice(Order order, double taxRate)\n```\n\nAsk:\n\n1. What operation does the name suggest?\n2. What values must the caller provide?\n3. Which parameters are primitives?\n4. Which parameters are references?\n5. Can any parameter be `null`?\n6. Can the method mutate an object supplied by the caller?\n7. What type does it return?\n8. What does that returned value represent?\n9. What happens for invalid input?\n10. Which overload, if any, is actually being called?\n\nThen trace the data through the method.\n\nThis approach is more useful than memorizing isolated definitions because it lets you predict behavior in unfamiliar code. The central question is always:\n\n**What values enter the method, what does the method do with them, and what value or side effect comes back out?**",
    },
    {
      title: "Practice: predict before running",
      content: "### Exercise 1 — primitive parameter\n\n```java\nstatic void change(int value) {\n    value = 50;\n}\n\nint number = 10;\nchange(number);\n\nSystem.out.println(number);\n```\n\nThe answer is `10`. The parameter is a separate local variable initialized with the value `10`.\n\n### Exercise 2 — object mutation\n\n```java\nstatic void change(Account account) {\n    account.balance = 50;\n}\n\nAccount account = new Account();\naccount.balance = 10;\n\nchange(account);\n\nSystem.out.println(account.balance);\n```\n\nThe answer is `50`. The parameter contains a copied reference to the same object.\n\n### Exercise 3 — mutation followed by reassignment\n\n```java\nstatic void change(Account account) {\n    account.balance = 50;\n    account = new Account();\n    account.balance = 100;\n}\n\nAccount account = new Account();\naccount.balance = 10;\n\nchange(account);\n\nSystem.out.println(account.balance);\n```\n\nThe answer is `50`. The first assignment mutates the caller-visible object. The later assignments operate on the newly created object referenced only by the local parameter.\n\n### Exercise 4 — varargs\n\n```java\nstatic int count(int... values) {\n    return values.length;\n}\n```\n\nPredict:\n\n```java\ncount();\ncount(1, 2, 3);\ncount(new int[] {1, 2});\n```\n\nThe results are `0`, `3`, and `2`.\n\nIf you can explain *why* each answer occurs rather than merely remembering it, you understand the underlying parameter model.",
    },
  ],
};

export default topic;

export async function seedTopic(
  categoryId: string,
  moduleId: string,
  sortOrder = 29,
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