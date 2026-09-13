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
 {
 name: "Beginner",
 slug: "beginner",
 description: "Learn Java syntax, OOP fundamentals, and essential APIs.",
 level: StudyLevel.BEGINNER,
 modules: [
 {
 title: "Java Control Flow and Methods",
 slug: "java-control-flow-and-methods",
 description: "Loops, arrays, type inference, the Java platform, methods, parameters, recursion, and core class design.",
 topics: [
{
 title: "while loop",
 slug: "while-loop",
 description: `A while loop is Java's basic loop for situations where the program should keep repeating a block of code as long as a condition remains true. The important idea is that the condition is checked before every iteration. That means the body can execute zero times.`,
 estimatedMinutes: 21,
 sections: [
 {
 title: "Concept and mental model",
 content: `A while loop is Java's basic loop for situations where the program should keep repeating a block of code as long as a condition remains true. The important idea is that the condition is checked before every iteration. That means the body can execute zero times.

Basic shape:

\`\`\`java
while (condition) {
    // repeated work
}
\`\`\`

The condition must produce a boolean value. Java does not treat numbers such as 0 and 1 as boolean values, so this is valid:

\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
\`\`\`

The sequence is: evaluate count < 5, execute the body if true, update count, then evaluate the condition again. The update is not part of the while syntax; it is something you normally put in the body. Forgetting it is a classic source of infinite loops.

Why the condition comes first matters. This program prints nothing:

\`\`\`java
int value = 10;
while (value < 5) {
    System.out.println(value);
    value++;
}
\`\`\`

The condition is false on the first check, so the body is skipped.

A while loop is especially natural when the number of iterations is not known in advance:

\`\`\`java
Scanner scanner = new Scanner(System.in);
String input;
while (!(input = scanner.nextLine()).equals("quit")) {
    System.out.println("You entered: " + input);
}
\`\`\`

The loop is controlled by a changing state. A useful mental model is:

1. Establish the initial state.
2. Ask whether the state still satisfies the continuation condition.
3. Perform one unit of work.
4. Move the state forward.
5. Repeat.

The loop variable does not have to be an integer. You can loop while a queue is non-empty, a connection is alive, a retry count is below a limit, or a parser has not reached the end of input.

For example:

\`\`\`java
Queue<String> jobs = new ArrayDeque<>();
while (!jobs.isEmpty()) {
    String job = jobs.remove();
    process(job);
}
\`\`\`

The condition and the state transition should be easy to understand together. If a reader cannot tell what makes the condition eventually false, the loop deserves another look.

Infinite loops are sometimes intentional:

\`\`\`java
while (true) {
    handleRequest();
}
\`\`\`

A server or event loop may deliberately run until the process is terminated. In ordinary application logic, however, an accidental infinite loop can consume CPU continuously.

Common mistakes include:

\`\`\`java
int i = 0;
while (i < 10) {
    System.out.println(i);
}
\`\`\`

There is no i++, so the condition never changes.

Another error is changing the variable in the wrong direction:

\`\`\`java
int i = 10;
while (i > 0) {
    System.out.println(i);
    i++;
}
\`\`\`

This moves farther away from termination.

Be careful with floating-point loop counters:

\`\`\`java
double x = 0.0;
while (x != 1.0) {
    x += 0.1;
}
\`\`\`

Exact equality is a poor termination condition for many floating-point calculations because decimal fractions such as 0.1 are not generally represented exactly in binary floating point. Prefer a bounded iteration count or a tolerance when appropriate.

Nested while loops are useful but can become expensive:

\`\`\`java
int row = 0;
while (row < 1000) {
    int column = 0;
    while (column < 1000) {
        work(row, column);
        column++;
    }
    row++;
}
\`\`\`

The body of the inner loop can run up to one million times. When analyzing performance, count how many times the innermost work actually executes.

break and continue can change the normal flow. break exits the nearest loop; continue skips the remainder of the current iteration and begins the next condition check.

\`\`\`java
int attempts = 0;
while (attempts < 5) {
    attempts++;
    if (tryOperation()) {
        break;
    }
}
\`\`\`

A while loop is not inherently slower than a for loop. For equivalent compiled logic, the main difference is readability and the way the loop state is expressed. Use while when the loop is naturally condition/state driven, and for when initialization, condition, and update form one obvious counting construct.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
int count = 0;
while (count < 5) {
    System.out.println(count);
    count++;
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `A while loop is Java's basic loop for situations where the program should keep repeating a block of code as long as a condition remains true. - The important idea is that the condition is checked before every iteration. - Basic shape: while (condition) { // repeated work } The condition must produce a boolean value. - Java does not treat numbers such as 0 and 1 as boolean values, so this is valid: int count = 0; while (count < 5) { System.out.println(count); count++; } The sequence is: evaluate count < 5, execute the body if true, update count, then evaluate the condition again.`
 },
 {
 title: "Practice",
 content: `- Write a loop that prints powers of two until the value exceeds one million.
- Write a loop that repeatedly reads input until "exit" is entered.
- Deliberately create an infinite loop and explain why it never terminates.
- Rewrite a simple for loop as while and compare which version communicates intent better.`
 }
 ],
 },
{
 title: "do-while loop",
 slug: "do-while-loop",
 description: `A do-while loop is a post-test loop: the body executes first, and only afterward is the condition checked. Therefore the body always executes at least once.`,
 estimatedMinutes: 16,
 sections: [
 {
 title: "Concept and mental model",
 content: `A do-while loop is a post-test loop: the body executes first, and only afterward is the condition checked. Therefore the body always executes at least once.

Basic syntax:

\`\`\`java
do {
    // work
} while (condition);
\`\`\`

The semicolon after the condition is part of the statement. Forgetting it produces a compilation error.

Compare these two loops:

\`\`\`java
int value = 10;
while (value < 5) {
    System.out.println("while");
}
do {
    System.out.println("do-while");
} while (value < 5);
\`\`\`

The while body runs zero times because the condition is initially false. The do-while body runs once because the condition is checked after the body.

This makes do-while particularly useful when an operation must happen once before the program can decide whether to repeat. A menu is a classic example:

\`\`\`java
int choice;
do {
    printMenu();
    choice = scanner.nextInt();
    handle(choice);
} while (choice != 0);
\`\`\`

The user must see the menu at least once.

The execution model is:

1. Enter the loop.
2. Execute the entire body.
3. Evaluate the boolean condition.
4. If true, return to the body.
5. If false, finish.

The condition still controls repetition, but it does not control the first execution.

A common misconception is that do-while is simply a stylistic variation of while. They are equivalent only when you deliberately reproduce the same control flow. A direct conversion can change behavior because while can skip the body.

For example, validation often fits naturally:

\`\`\`java
String name;
do {
    System.out.print("Name: ");
    name = scanner.nextLine().trim();
} while (name.isEmpty());
\`\`\`

This guarantees at least one input attempt.

You should still ensure the body can eventually make the condition false. This is just as important as with while loops.

\`\`\`java
int number = 1;
do {
    System.out.println(number);
    number++;
} while (number <= 5);
\`\`\`

The variable is initialized before the loop, changed inside it, and checked afterward.

A subtle issue appears when the body throws an exception. If execution fails before reaching the condition, the condition is never evaluated. The language rule about the body running once does not mean the body must successfully complete.

do-while loops can be nested:

\`\`\`java
int row = 0;
do {
    int column = 0;
    do {
        System.out.println(row + "," + column);
        column++;
    } while (column < 3);
    row++;
} while (row < 2);
\`\`\`

As with nested while loops, reason about the total number of iterations and the state changes separately.

Use braces even for one-line bodies in production code. They make later changes safer and reduce ambiguity.

A useful design question is: "Does the operation have to happen before I can know whether I should repeat?" If yes, do-while is often the clearest construct. If the operation should be skipped when the condition is initially false, use while.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
int value = 10;
do {
    System.out.println("runs once");
} while (value < 5);
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `A do-while loop is a post-test loop: the body executes first, and only afterward is the condition checked. - Therefore the body always executes at least once. - Basic syntax: do { // work } while (condition); The semicolon after the condition is part of the statement. - Compare these two loops: int value = 10; while (value < 5) { System.out.println("while"); } do { System.out.println("do-while"); } while (value < 5); The while body runs zero times because the condition is initially false.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A common misconception is that do-while is simply a stylistic variation of while. - A subtle issue appears when the body throws an exception.`
 },
 {
 title: "Practice",
 content: `- Build a menu that repeats until the user selects Exit.
- Validate an integer until it is within a specified range.
- Write both while and do-while versions of the same input validation and test them with invalid and valid first inputs.`
 }
 ],
 },
{
 title: "break and continue",
 slug: "break-and-continue",
 description: `break and continue are control-flow statements used inside loops. They are not conditions themselves; they alter what happens after the current point in an iteration.`,
 estimatedMinutes: 18,
 sections: [
 {
 title: "Concept and mental model",
 content: `break and continue are control-flow statements used inside loops. They are not conditions themselves; they alter what happens after the current point in an iteration.

break immediately terminates the nearest enclosing loop.

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 6) {
        break;
    }
    System.out.println(i);
}
\`\`\`

This prints 1 through 5. Once i becomes 6, break transfers control to the statement after the loop.

continue does something different. It skips the remaining statements in the current iteration and proceeds to the next iteration.

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    System.out.println(i);
}
\`\`\`

This prints the odd numbers.

The difference is important:
- break means "the loop is finished."
- continue means "this iteration is finished."

In a while loop, continue can be subtle because the update may be below it:

\`\`\`java
int i = 0;
while (i < 10) {
    if (i == 5) {
        continue;
    }
    i++;
}
\`\`\`

This is an infinite loop. When i reaches 5, continue skips i++, so i remains 5 forever.

A safer structure is to update state before continuing:

\`\`\`java
int i = 0;
while (i < 10) {
    i++;
    if (i == 5) {
        continue;
    }
    System.out.println(i);
}
\`\`\`

break is often useful for searching:

\`\`\`java
int found = -1;
for (int i = 0; i < values.length; i++) {
    if (values[i] == target) {
        found = i;
        break;
    }
}
\`\`\`

Once the target is found, further scanning is unnecessary.

continue can simplify filtering:

\`\`\`java
for (Order order : orders) {
    if (order.isCancelled()) {
        continue;
    }
    process(order);
}
\`\`\`

The code says directly: cancelled orders do not enter the main processing path.

Java also supports labeled break and continue. Labels are useful when nested loops need to be exited or skipped at a level other than the nearest loop.

\`\`\`java
outer:
for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        if (matrix[row][column] == target) {
            break outer;
        }
    }
}
\`\`\`

Here break outer exits both loops. Without the label, break would exit only the inner loop.

Labeled continue can jump to the next iteration of an outer loop:

\`\`\`java
outer:
for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        if (invalid(matrix[row][column])) {
            continue outer;
        }
    }
    processRow(row);
}
\`\`\`

Labels are legitimate Java syntax, but excessive use can make control flow difficult to follow. Often extracting a method is clearer.

break and continue affect only loops. A break inside a switch exits the switch statement, which is a different context from breaking a loop. Modern switch expressions have additional rules, so do not assume every break has the same meaning in every construct.

Neither break nor continue automatically performs cleanup of arbitrary resources. If a loop contains resource-management code, use try-with-resources or appropriate structured cleanup.

A strong way to use these statements is to make the condition describe the normal path and use break/continue for exceptional paths. If a loop contains many jumps, consider whether the algorithm can be expressed more clearly through helper methods, guard clauses, or a different data structure.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 6) break;
    if (i % 2 == 0) continue;
    System.out.println(i);
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `break and continue are control-flow statements used inside loops. - They are not conditions themselves; they alter what happens after the current point in an iteration. - break immediately terminates the nearest enclosing loop. - for (int i = 1; i <= 10; i++) { if (i == 6) { break; } System.out.println(i); } This prints 1 through 5.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `The difference is important: break means "the loop is finished"; continue means "this iteration is finished."

A common mistake with continue is forgetting that it skips the statements that follow it in the current iteration. In a while loop, that can also skip the update that makes the loop progress.

For example:

\`\`\`java
int i = 0;

while (i < 10) {
    if (i == 5) {
        continue;
    }
    i++;
}
\`\`\`

This loop never terminates because when i becomes 5, continue skips i++, so i remains 5 forever.`
 },
 {
 title: "Practice",
 content: `- Search an array and stop at the first matching value.
- Print numbers from 1 to 100 but skip multiples of 3.
- In a nested matrix search, stop all processing once a target is found.
- Create a while loop with continue and identify exactly which state update must happen before continue.`
 }
 ],
 },
{
 title: "Arrays",
 slug: "arrays",
 description: `An array in Java is an object that stores a fixed number of values of one component type. The array length is established when the array is created and cannot be changed afterward.`,
 estimatedMinutes: 21,
 sections: [
 {
 title: "Concept and mental model",
 content: `An array in Java is an object that stores a fixed number of values of one component type. The array length is established when the array is created and cannot be changed afterward.

A simple array:

\`\`\`java
int[] scores = new int[5];
\`\`\`

This creates an array with five int elements. The valid indexes are 0 through 4.

The length is available through the array's length field:

\`\`\`java
System.out.println(scores.length);
\`\`\`

Unlike String, an array uses length rather than length().

Elements are accessed by index:

\`\`\`java
scores[0] = 90;
scores[1] = 85;
System.out.println(scores[0]);
\`\`\`

Java checks array bounds at runtime. Accessing scores[5] throws ArrayIndexOutOfBoundsException because index 5 is outside the valid range.

Array creation also initializes elements to default values. Numeric primitive elements start at zero, boolean elements start at false, char elements start at '', and reference elements start as null.

For example:

\`\`\`java
String[] names = new String[3];
\`\`\`

All three elements initially contain null.

An array can also be initialized directly:

\`\`\`java
int[] numbers = {10, 20, 30, 40};
\`\`\`

The compiler determines the length from the initializer. You cannot later append an element to this array.

A key distinction is that an array variable is a reference variable. The array itself is an object, while the variable stores a reference to that object.

\`\`\`java
int[] a = {1, 2, 3};
int[] b = a;
b[0] = 99;
System.out.println(a[0]); // 99
\`\`\`

Both variables refer to the same array. Assigning an array variable does not copy the elements.

To copy the elements, use an explicit copying operation such as Arrays.copyOf:

\`\`\`java
int[] original = {1, 2, 3};
int[] copy = Arrays.copyOf(original, original.length);
copy[0] = 100;
\`\`\`

The original remains unchanged.

Arrays can be passed to methods:

\`\`\`java
static void printAll(int[] values) {
    for (int value : values) {
        System.out.println(value);
    }
}
\`\`\`

The method receives a copy of the reference value. It can modify the array object through that reference, but reassigning the parameter does not reassign the caller's variable.

\`\`\`java
static void change(int[] values) {
    values[0] = 50;
    values = new int[] {9, 9, 9};
}
\`\`\`

The caller sees the first modification but does not suddenly point to the new array.

The enhanced for loop is convenient:

\`\`\`java
for (int score : scores) {
    System.out.println(score);
}
\`\`\`

The loop variable is not an index. For primitive arrays, changing the variable does not change the array:

\`\`\`java
for (int score : scores) {
    score++;
}
\`\`\`

The array elements are unchanged.

For reference arrays, the situation is different because the loop variable contains a reference:

\`\`\`java
for (Person person : people) {
    person.setName("Updated");
}
\`\`\`

The referenced Person objects can be modified, but assigning person to another object does not replace the array element.

Arrays are covariant for reference types:

\`\`\`java
String[] strings = new String[2];
Object[] objects = strings;
\`\`\`

This assignment is allowed. But the runtime array remembers that it is actually a String[]:

\`\`\`java
objects[0] = Integer.valueOf(10);
\`\`\`

This throws ArrayStoreException.

This is one reason generic collections are often preferable when flexible containers are needed.

Arrays are efficient and predictable for indexed access, but fixed length is a major design characteristic. If the collection must grow and shrink dynamically, ArrayList is usually more appropriate.

Use arrays when:
- the size is fixed or naturally bounded;
- indexed access is important;
- primitive storage matters;
- you need a simple low-level data structure.

Important edge cases:
- \`new int[0]\` is a valid zero-length array.
- A null array reference causes NullPointerException when accessed.
- \`array.length\` is not a method call.
- Multidimensional arrays are actually arrays whose elements can themselves be arrays.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
int[] scores = {90, 85, 95};
for (int score : scores) {
    System.out.println(score);
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `An array in Java is an object that stores a fixed number of values of one component type. - The array length is established when the array is created and cannot be changed afterward. - A simple array: int[] scores = new int[5]; This creates an array with five int elements. - The length is available through the array's length field: System.out.println(scores.length); Unlike String, an array uses length rather than length().`
 },
 {
 title: "Practice",
 content: `- Find the minimum and maximum element.
- Reverse an array in place.
- Copy an array without using a collection.
- Compare aliasing (\`b = a\`) with copying (\`Arrays.copyOf\`).
- Demonstrate ArrayStoreException using String[] assigned to Object[].`
 }
 ],
 },
{
 title: "Multidimensional arrays",
 slug: "multidimensional-arrays",
 description: `Java does not have a separate primitive "matrix" type. A multidimensional array is an array whose elements are themselves arrays. This model explains an important Java feature: rows can have different lengths.`,
 estimatedMinutes: 18,
 sections: [
 {
 title: "Concept and mental model",
 content: `Java does not have a separate primitive "matrix" type. A multidimensional array is an array whose elements are themselves arrays. This model explains an important Java feature: rows can have different lengths.

A rectangular-looking array:

\`\`\`java
int[][] matrix = new int[3][4];
\`\`\`

creates an outer array containing three int[] rows, each containing four integers.

Access uses two indexes:

\`\`\`java
matrix[1][2] = 42;
System.out.println(matrix[1][2]);
\`\`\`

The expression matrix[1] first retrieves a row array. Then [2] indexes that row.

Because Java arrays are arrays of arrays, this is valid:

\`\`\`java
int[][] data = new int[3][];
data[0] = new int[2];
data[1] = new int[5];
data[2] = new int[1];
\`\`\`

This is a jagged array. The rows do not need to have the same length.

You can initialize one directly:

\`\`\`java
int[][] values = {
    {1, 2, 3},
    {4, 5},
    {6, 7, 8, 9}
};
\`\`\`

Then values.length is 3, while values[0].length is 3, values[1].length is 2, and values[2].length is 4.

This is why nested loops should usually use the length of the current row:

\`\`\`java
for (int row = 0; row < values.length; row++) {
    for (int column = 0; column < values[row].length; column++) {
        System.out.println(values[row][column]);
    }
}
\`\`\`

Using values[0].length for every row is unsafe for jagged arrays.

There is also a difference between partially creating the outer array and creating all rows:

\`\`\`java
int[][] matrix = new int[3][];
\`\`\`

At this point, matrix.length is 3, but matrix[0] is null. Therefore matrix[0][0] causes NullPointerException until the row is initialized.

A common matrix operation is traversal:

\`\`\`java
static int sum(int[][] matrix) {
    int total = 0;
    for (int[] row : matrix) {
        for (int value : row) {
            total += value;
        }
    }
    return total;
}
\`\`\`

The enhanced for loop is often easier to read because each row is an array.

Nested arrays also demonstrate reference semantics. Assigning a row aliases it:

\`\`\`java
int[][] a = {{1, 2}, {3, 4}};
int[] row = a[0];
row[0] = 99;
\`\`\`

a[0][0] is now 99.

Similarly:

\`\`\`java
int[][] b = a;
\`\`\`

does not deep-copy the matrix. Both variables refer to the same outer array.

Even copying the outer array is only a shallow copy:

\`\`\`java
int[][] copy = Arrays.copyOf(a, a.length);
\`\`\`

The outer array is new, but its row references still point to the same row arrays. A deep copy requires copying every row:

\`\`\`java
int[][] deepCopy = new int[a.length][];
for (int i = 0; i < a.length; i++) {
    deepCopy[i] = Arrays.copyOf(a[i], a[i].length);
}
\`\`\`

Multidimensional arrays are useful for grids, tables, game boards, adjacency lists, and other hierarchical structures. But if you need mathematical matrix operations, specialized libraries or data structures may be more appropriate.

An important performance consideration is that a 2D Java array is not necessarily one contiguous rectangular memory block. It is an object graph: one outer array plus row arrays. This can affect memory overhead and locality compared with a flat one-dimensional representation.

For a large numeric matrix, a flat representation can sometimes be useful:

\`\`\`java
int rows = 1000;
int columns = 1000;
int[] flat = new int[rows * columns];
\`\`\`

The logical coordinate (r, c) can be mapped to:

\`\`\`java
int index = r * columns + c;
\`\`\`

This reduces the number of array objects and can improve locality, but it makes indexing logic more manual.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
int[][] values = {
    {1, 2, 3},
    {4, 5},
    {6, 7, 8, 9}
};
for (int[] row : values) {
    for (int value : row) {
        System.out.println(value);
    }
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Java does not have a separate primitive "matrix" type. - A multidimensional array is an array whose elements are themselves arrays. - This model explains an important Java feature: rows can have different lengths. - A rectangular-looking array: int[][] matrix = new int[3][4]; creates an outer array containing three int[] rows, each containing four integers.`
 },
 {
 title: "Practice",
 content: `- Traverse a jagged array safely.
- Calculate row sums and column sums for a rectangular matrix.
- Implement a deep copy and show why a shallow copy is different.
- Store a game board using int[][] and update selected cells.`
 }
 ],
 },
{
 title: "var local variable type inference",
 slug: "var-local-variable-type-inference",
 description: `Java's var feature provides local variable type inference. It allows the compiler to infer the declared type of a local variable from its initializer.`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `Java's var feature provides local variable type inference. It allows the compiler to infer the declared type of a local variable from its initializer.

Instead of:

\`\`\`java
ArrayList<String> names = new ArrayList<String>();
\`\`\`

you can write:

\`\`\`java
var names = new ArrayList<String>();
\`\`\`

The variable still has a real static type. var does not make Java dynamically typed.

After compilation, the compiler knows that names is an ArrayList<String>. The programmer simply did not spell that type out on the left-hand side.

This works:

\`\`\`java
var count = 10;
count = 20;
\`\`\`

The inferred type is int.

It does not mean count can later hold a String:

count = "hello"; // compilation error

The initializer is therefore essential:

\`\`\`java
var message = "hello";
\`\`\`

The inferred type is String.

This is not allowed:

\`\`\`java
var value;
\`\`\`

There is no initializer from which the compiler can infer a type.

It is also not allowed to initialize with null alone:

\`\`\`java
var value = null;
\`\`\`

The compiler cannot infer a useful variable type from the null literal.

var is for local variables, including local variables inside methods, loops, and try-with-resources declarations where the syntax permits it. It is not a replacement for field declarations, method parameter types, or method return types.

For example:

\`\`\`java
class Example {
    var field = 10; // not allowed as a field
}
\`\`\`

The feature is especially useful when the initializer makes the type obvious or when the type name is long:

\`\`\`java
var customerRepository = new CustomerRepository(database);
\`\`\`

But it can hurt readability when the initializer hides the important type:

\`\`\`java
var result = createSomething();
\`\`\`

If the reader must inspect several methods to understand what result is, an explicit type may communicate intent better.

var does not erase generic information:

\`\`\`java
var names = new ArrayList<String>();
\`\`\`

The inferred type includes the generic argument. Therefore:

names.add("Alice"); // valid
names.add(10);      // compilation error

Diamond syntax and var are related but different features:

\`\`\`java
var list = new ArrayList<String>();
\`\`\`

Here var infers the variable type from the object creation expression, while the diamond operator <> lets the constructor infer generic type arguments from context.

var can also infer an interface or concrete type depending on the initializer. For example:

\`\`\`java
var list = new ArrayList<String>();
\`\`\`

The variable's inferred type is ArrayList<String>, not List<String>. If you want the abstraction expressed explicitly, this may be clearer:

\`\`\`java
List<String> list = new ArrayList<>();
\`\`\`

That distinction matters when choosing APIs and communicating design intent.

A subtle issue occurs with anonymous classes and inferred types. var can preserve a type that is awkward or impossible to spell conveniently in ordinary source syntax, but this should be used carefully because the code can become less obvious to readers.

var is a compile-time feature. There is no special "var object" at runtime and no runtime dynamic type lookup caused by var.

This distinction is important:

\`\`\`java
var x = new Dog();
\`\`\`

does not mean x is dynamically typed. The compiler infers Dog as the static type of x. Normal Java assignment, overload resolution, access checking, and method invocation rules then apply to that type.

A useful style rule is: use var when the initializer clearly communicates the type and reduces visual noise; use an explicit type when the declared abstraction or type is important to understanding the code.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
var names = new ArrayList<String>();
names.add("Alice");
// names.add(10); // compile-time error
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Java's var feature provides local variable type inference. - It allows the compiler to infer the declared type of a local variable from its initializer. - Instead of: ArrayList<String> names = new ArrayList<String>(); you can write: var names = new ArrayList<String>(); The variable still has a real static type. - After compilation, the compiler knows that names is an ArrayList<String>.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A subtle issue occurs with anonymous classes and inferred types.`
 },
 {
 title: "Practice",
 content: `- Predict the inferred type for primitive, String, ArrayList<String>, and interface-returning expressions.
- Try invalid cases such as \`var x;\` and \`var x = null\`.
- Compare \`List<String> list = new ArrayList<>();\` with \`var list = new ArrayList<String>();\` and explain the API-design difference.`
 }
 ],
 },
{
 title: "JDK vs JRE vs JVM",
 slug: "jdk-vs-jre-vs-jvm",
 description: `JDK, JRE, and JVM describe related parts of the Java platform, but their relationship is often taught using an old slogan that can be misleading on modern Java installations.`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `JDK, JRE, and JVM describe related parts of the Java platform, but their relationship is often taught using an old slogan that can be misleading on modern Java installations.

The JVM is the virtual machine specification and its implementations are responsible for executing Java class files. It provides the execution environment in which Java bytecode runs.

The JDK is the Java Development Kit. It is the practical developer distribution containing the tools needed to develop Java programs, including the Java launcher and compiler and many other development utilities.

Historically, the JRE was described as a separately distributed runtime containing a JVM plus the Java class libraries needed to run applications. Modern JDK distributions no longer generally ship a separately installable JRE in the old Java 8 sense.

So avoid relying on the simplistic diagram:

JVM < JRE < JDK

as if it described the packaging of every modern Java release.

A better mental model is:
- JVM: the execution engine/specification for Java class files.
- Java runtime libraries: the APIs your application uses at runtime.
- JDK: the developer toolkit containing the compiler, launcher, packaging/debugging tools, and runtime components.

A normal development workflow might involve:

javac Hello.java

This compiles source code to class files.

Then:

java Hello

launches the application using a JVM.

The \`java\` launcher and \`javac\` compiler are JDK tools.

Check your installation with:

java -version
javac -version

The commands can reveal an important practical problem: \`java\` may be available while \`javac\` is missing. That usually means the PATH points to a runtime installation or an incomplete environment rather than a full JDK.

The JDK also contains tools such as javadoc, jar, jdb, javap, and other utilities depending on the distribution and release.

The JVM itself does not define Java source syntax. It executes class files according to the JVM specification. The Java compiler is responsible for translating Java source into bytecode.

This distinction becomes important when discussing other JVM languages. Languages such as Kotlin, Scala, and Groovy can compile to JVM-compatible class files. The JVM does not require the source language to be Java.

The JDK version also matters. A newer JDK can compile source using newer language features, while runtime compatibility depends on the generated class-file version and the target runtime.

For example, running a class compiled for a newer Java release on an older JVM can result in an UnsupportedClassVersionError.

The module system introduced in Java 9 also changed how the Java platform is organized. The old JRE mental model should therefore be treated as historical context rather than a complete description of modern Java installations.

A useful troubleshooting sequence is:

1. \`java -version\` — which runtime launcher is being used?
2. \`javac -version\` — is a compiler available?
3. \`where java\` / \`which java\` — which executable is selected?
4. \`where javac\` / \`which javac\` — which compiler is selected?
5. Inspect JAVA_HOME and PATH if multiple JDKs are installed.

A JDK is a development environment, not simply "a compiler." It includes runtime components and a collection of tools used to build, inspect, package, debug, document, and run Java software.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
System.out.println(System.getProperty("java.version"));
// javac -version
// java -version
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `JDK, JRE, and JVM describe related parts of the Java platform, but their relationship is often taught using an old slogan that can be misleading on modern Java installations. - The JVM is the virtual machine specification and its implementations are responsible for executing Java class files. - It provides the execution environment in which Java bytecode runs. - It is the practical developer distribution containing the tools needed to develop Java programs, including the Java launcher and compiler and many other development utilities.`
 },
 {
 title: "Practice",
 content: `- Install a modern JDK and record the outputs of java -version and javac -version.
- Find the actual executable selected by your operating system.
- Compile a class with a newer JDK and investigate what happens when an older JVM attempts to run it.
- Explain why the JVM can run languages other than Java.`
 }
 ],
 },
{
 title: "main method",
 slug: "main-method",
 description: `The main method is the conventional entry point used by the Java launcher when starting a traditional Java application.`,
 estimatedMinutes: 18,
 sections: [
 {
 title: "Concept and mental model",
 content: `The main method is the conventional entry point used by the Java launcher when starting a traditional Java application.

The familiar form is:

\`\`\`java
public static void main(String[] args) {
    System.out.println("Hello");
}
\`\`\`

Each part communicates something important.

\`public\` historically makes the method accessible to the launcher from outside the class.

\`static\` means the launcher can invoke the method without first creating an instance of the class.

\`void\` means the method does not return a value to its caller.

\`main\` is the conventional method name recognized by the launcher.

\`String[] args\` receives command-line arguments.

For example:

\`\`\`java
public class App {
    public static void main(String[] args) {
        for (String arg : args) {
            System.out.println(arg);
        }
    }
}
\`\`\`

Run:

java App one two three

The program receives three strings. Command-line arguments are strings even if they look numeric:

java App 42

args[0] is \`"42"\`, not the integer 42. Convert explicitly:

int value = Integer.parseInt(args[0]);

The array may be empty, so code should not assume args[0] exists.

A common mistake is confusing the source file name, class name, and entry point. If the class is:

public class App { ... }

the conventional launch command is:

java App

The launcher locates the class, loads it, initializes it according to JVM execution rules, and invokes the appropriate main entry point supported by the Java release being used.

\`main\` is not a constructor. It is an ordinary static method with a special conventional role for application startup.

You can have overloaded main methods:

public static void main(String[] args) { ... }
public static void main(int value) { ... }

The launcher does not choose arbitrary overloads based on your preference. The supported launcher entry-point signature rules determine which method is an entry point. Calling the overloaded version yourself is ordinary method invocation.

The parameter can also be written using varargs:

public static void main(String... args) {
}

String... is represented as a String[] parameter at the method level, so this is a common alternative spelling.

A static main method cannot directly access an instance field:

class App {
    int value = 10;

    public static void main(String[] args) {
        // System.out.println(value); // compilation error
    }
}

An object is required:

App app = new App();
System.out.println(app.value);

The main method is often best kept small. In production applications, it commonly performs startup wiring and delegates real work to other classes:

public static void main(String[] args) {
    Application application = Application.create(args);
    application.run();
}

This separation makes the application easier to test.

Modern Java releases have evolved the details of what launchable main declarations can look like, so documentation for the specific Java version should be consulted when using newer entry-point forms. For a broad compatibility target, the classic public static void main(String[] args) form remains the clearest choice.

A useful debugging sequence is:
- confirm the class name passed to java;
- confirm the class is on the classpath/module path;
- confirm a recognized main entry point exists;
- check the exact Java version used to launch it.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
public static void main(String[] args) {
    for (String arg : args) {
        System.out.println(arg);
    }
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `The main method is the conventional entry point used by the Java launcher when starting a traditional Java application. - The familiar form is: public static void main(String[] args) { System.out.println("Hello"); } Each part communicates something important. - \`public\` historically makes the method accessible to the launcher from outside the class. - \`static\` means the launcher can invoke the method without first creating an instance of the class.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A common mistake is confusing the source file name, class name, and entry point.`
 },
 {
 title: "Practice",
 content: `- Write a program that prints every command-line argument.
- Safely handle missing arguments.
- Convert an argument to int and handle NumberFormatException.
- Move application logic out of main into a separate class and explain why this improves testability.`
 }
 ],
 },
{
 title: "Defining and calling methods",
 slug: "defining-and-calling-methods",
 description: `A method is a named block of behavior associated with a class. Methods allow a program to divide a large problem into smaller operations with clear inputs, outputs, and responsibilities.`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `A method is a named block of behavior associated with a class. Methods allow a program to divide a large problem into smaller operations with clear inputs, outputs, and responsibilities.

A simple method:

\`\`\`java
static int add(int a, int b) {
    return a + b;
}
\`\`\`

Calling it:

\`\`\`java
int result = add(3, 4);
\`\`\`

A method declaration contains several concepts: modifiers, return type, method name, parameter list, and body.

The return type tells the compiler what value the method produces. A method that does not return a value uses void.

\`\`\`java
static void printGreeting(String name) {
    System.out.println("Hello, " + name);
}
\`\`\`

A return statement in a non-void method must provide a compatible value on every path that can complete normally:

\`\`\`java
static int absolute(int value) {
    if (value >= 0) {
        return value;
    }
    return -value;
}
\`\`\`

This would be invalid if the compiler could identify a path that reaches the end without returning an int.

Methods can call other methods:

\`\`\`java
static int square(int value) {
    return value * value;
}
static int sumOfSquares(int a, int b) {
    return square(a) + square(b);
}
\`\`\`

Each call creates a new method invocation context. Local variables in one invocation are distinct from locals in another invocation.

Methods can be instance methods or static methods.

\`\`\`java
class Counter {
    private int count;
    void increment() {
        count++;
    }
}
\`\`\`

To call an instance method, you need an object:

\`\`\`java
Counter counter = new Counter();
counter.increment();
\`\`\`

A static method belongs to the class rather than a particular object:

\`\`\`java
Math.abs(-5);
\`\`\`

Inside an instance method, \`this\` refers to the current object. Static methods do not have a current instance and therefore cannot directly use \`this\`.

Method names can be reused through overloading when parameter lists differ, but return type alone cannot distinguish methods:

\`\`\`java
int calculate(int x)
double calculate(int x) // invalid as an overload
\`\`\`

Methods may be declared in classes and interfaces, subject to Java's language rules. A method is not a standalone top-level function in ordinary Java source.

A method call is an expression when it produces a value. For example:

\`\`\`java
int total = calculatePrice(quantity);
\`\`\`

The returned value can be stored, passed to another method, or used in a larger expression:

\`\`\`java
System.out.println(Math.max(a, b));
\`\`\`

A method can also return an object reference. The reference is a value; returning it does not necessarily copy the object.

Good method design focuses on one clear responsibility. A method that validates input, updates a database, formats HTML, logs ten different messages, and sends an email is difficult to reason about and test.

Parameter names are local to the method. They do not need to match the argument variable names used at the call site:

\`\`\`java
int price = 100;
int tax = 20;
int total = add(price, tax);
\`\`\`

The method receives argument values according to Java's pass-by-value rules.

Method calls form a call chain. If main calls process, and process calls validate, the active execution can be thought of as:

main -> process -> validate

When validate returns, execution continues in process at the call site.

This model becomes important when debugging stack traces. A stack trace shows the chain of active method invocations leading to an exception.

Methods also create an API boundary. Public methods are part of a class's externally visible contract, so naming, parameters, return types, and exceptions should be designed deliberately.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
static int add(int a, int b) {
    return a + b;
}
int result = add(3, 4);
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `A method is a named block of behavior associated with a class. - Methods allow a program to divide a large problem into smaller operations with clear inputs, outputs, and responsibilities. - A simple method: static int add(int a, int b) { return a + b; } Calling it: int result = add(3, 4); A method declaration contains several concepts: modifiers, return type, method name, parameter list, and body. - The return type tells the compiler what value the method produces.`
 },
 {
 title: "Practice",
 content: `- Write methods for min, max, average, and validation.
- Convert duplicated code into a helper method.
- Trace a three-method call chain and predict the order of printed messages.
- Create both static and instance methods and explain why their invocation differs.`
 }
 ],
 },
{
 title: "Method parameters and return values",
 slug: "method-parameters-and-return-values",
 description: `Method parameters define the inputs a method expects, while a return value communicates a result back to the caller.`,
 estimatedMinutes: 21,
 sections: [
 {
 title: "Concept and mental model",
 content: `Method parameters define the inputs a method expects, while a return value communicates a result back to the caller.

Example:

\`\`\`java
static int multiply(int a, int b) {
    return a * b;
}
\`\`\`

Here a and b are formal parameters. In:

\`\`\`java
int result = multiply(6, 7);
\`\`\`

6 and 7 are arguments.

The distinction matters when discussing method declarations versus calls.

Parameters are local variables belonging to a particular method invocation. Their values are initialized from the corresponding arguments according to Java's pass-by-value semantics.

A primitive argument:

\`\`\`java
int x = 10;
int result = doubleValue(x);
\`\`\`

does not allow the called method to replace the caller's x. The method receives a copy of the primitive value.

Reference values work differently in appearance but are still passed by value. If a method receives a reference to an object, it receives a copy of that reference. It can use that copied reference to modify the same object.

Return values have a declared static type:

\`\`\`java
static String formatName(String first, String last) {
    return first + " " + last;
}
\`\`\`

The returned String can be assigned to a variable or used directly.

\`\`\`java
String name = formatName("Ada", "Lovelace");
System.out.println(formatName("Grace", "Hopper"));
\`\`\`

A method can return null when its return type is a reference type, unless the program's design forbids it:

\`\`\`java
static User findUser(String id) {
    return database.find(id);
}
\`\`\`

Callers then need to understand whether null is possible. In modern APIs, Optional or another explicit result type may sometimes communicate absence more clearly.

A void method has no value to assign:

\`\`\`java
static void log(String message) {
    System.out.println(message);
}
\`\`\`

\`return;\` can still be used in a void method to exit early:

\`\`\`java
static void printPositive(int value) {
    if (value <= 0) {
        return;
    }
    System.out.println(value);
}
\`\`\`

For non-void methods, every normal completion path must return a value of a compatible type.

Methods can return arrays and other objects:

\`\`\`java
static int[] createRange(int size) {
    int[] result = new int[size];
    for (int i = 0; i < size; i++) {
        result[i] = i;
    }
    return result;
}
\`\`\`

Returning the array returns a reference to the array object. It does not copy the array.

Parameters can have generic types:

\`\`\`java
static <T> T first(List<T> values) {
    return values.get(0);
}
\`\`\`

This lets the compiler preserve the relationship between the input element type and the returned value.

Varargs provide a convenient syntax for a variable number of arguments:

\`\`\`java
static int sum(int... values) {
    int total = 0;
    for (int value : values) {
        total += value;
    }
    return total;
}
\`\`\`

The method can be called as sum(), sum(1), or sum(1, 2, 3). At the method level, the varargs parameter is an array.

A parameter can be declared final:

\`\`\`java
static void process(final int count) {
    // count = 10; // compilation error
}
\`\`\`

This prevents reassignment of the parameter variable. For a reference parameter, final does not make the referenced object immutable.

The compiler checks argument compatibility. Passing a double to an int parameter is not automatically a narrowing conversion:

\`\`\`java
void accept(int value) {}
double x = 3.5;
// accept(x); // compilation error
\`\`\`

An explicit conversion is required, with the usual possibility of information loss:

\`\`\`java
accept((int) x);
\`\`\`

Autoboxing and unboxing can also participate in method invocation:

\`\`\`java
void accept(Integer value) {}
\`\`\`

accept(10); // int is boxed to Integer

Overload resolution can make parameter behavior more complex when multiple methods accept related types. Explicit types and unambiguous APIs improve readability.

Good parameter design avoids unnecessarily large parameter lists. If a method requires ten unrelated arguments, a dedicated value object may make the contract easier to understand.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
static int multiply(int a, int b) {
    return a * b;
}
int result = multiply(6, 7);
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Method parameters define the inputs a method expects, while a return value communicates a result back to the caller. - Example: static int multiply(int a, int b) { return a * b; } Here a and b are formal parameters. - In: int result = multiply(6, 7); 6 and 7 are arguments. - The distinction matters when discussing method declarations versus calls.`
 },
 {
 title: "Practice",
 content: `- Write methods returning primitive values, objects, arrays, and void.
- Demonstrate that a returned array is still mutable by the caller.
- Write a varargs method and inspect what it receives.
- Add final parameters and explain exactly what final protects.`
 }
 ],
 },
{
 title: "Pass-by-value in Java",
 slug: "pass-by-value-in-java",
 description: `Java is pass-by-value. This statement applies to both primitive values and object references.`,
 estimatedMinutes: 20,
 sections: [
 {
 title: "Concept and mental model",
 content: `Java is pass-by-value. This statement applies to both primitive values and object references.

The source of confusion is that Java passes a reference value when the argument is an object. It does not pass the caller's variable itself.

Consider:

\`\`\`java
static void change(int x) {
    x = 99;
}
int value = 10;
change(value);
System.out.println(value); // 10
\`\`\`

The method receives a copy of 10. Reassigning x cannot change value in the caller.

Now consider an object:

\`\`\`java
class Person {
    String name;
}
static void changeName(Person person) {
    person.name = "Alice";
}
Person p = new Person();
p.name = "Bob";
changeName(p);
System.out.println(p.name); // Alice
\`\`\`

This works because the copied reference still identifies the same Person object. The method changes the object through its local copy of the reference.

But reassigning the parameter does not change the caller's reference:

\`\`\`java
static void replace(Person person) {
    person = new Person();
    person.name = "Charlie";
}
Person p = new Person();
p.name = "Bob";
replace(p);
System.out.println(p.name); // Bob
\`\`\`

The local parameter now refers to a different object, but the caller's p still refers to the original object.

A useful conceptual picture is:

caller variable p
        |
        v
   Person object

At the method call, Java copies the reference value:

caller p --------+
                 |
parameter person-+----> same Person object

Both variables initially point to the same object. They are separate variables containing equal reference values.

This is why saying "objects are passed by reference" is misleading in Java. The object itself is not passed by reference in the language's parameter-passing model. A reference value is passed by value.

Arrays follow the same rule:

\`\`\`java
static void update(int[] values) {
    values[0] = 100;
}
int[] data = {1, 2, 3};
update(data);
\`\`\`

data[0] is now 100 because both references identify the same array.

But:

\`\`\`java
static void replace(int[] values) {
    values = new int[] {9, 9, 9};
}
\`\`\`

does not replace the caller's array.

This distinction becomes important when designing APIs. If a method is intended to mutate an object, document that side effect. If mutation is undesirable, use immutable objects or defensive copies where appropriate.

Strings are a useful example because String is immutable:

\`\`\`java
static void attempt(String text) {
    text = text.toUpperCase();
}
String value = "hello";
attempt(value);
\`\`\`

The caller's value remains "hello". The method reassigns its local parameter to a different String reference. It cannot modify the original String object because String does not expose mutation operations.

A method can indirectly change caller-visible state through shared mutable objects, fields, static state, collections, arrays, or external resources. Pass-by-value does not mean "nothing can change"; it means the method receives copies of argument values.

A particularly useful experiment is:

\`\`\`java
static void test(Person p) {
    p.name = "Changed";
    p = new Person();
    p.name = "New object";
}
\`\`\`

The first assignment affects the original object. The reassignment does not affect the caller. This single example usually resolves most confusion.

Pass-by-value also explains why a method cannot implement a C++-style "swap two caller variables" simply by reassigning parameters:

\`\`\`java
static void swap(Person a, Person b) {
    Person temp = a;
    a = b;
    b = temp;
}
\`\`\`

The caller's variables are unchanged.

If you need to communicate multiple results, return a composite object, record, array, or another explicit result rather than trying to change the caller's local variable bindings.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
static void replace(Person person) {
    person = new Person();
}
Person p = new Person();
replace(p); // p still refers to the original object
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `This statement applies to both primitive values and object references. - The source of confusion is that Java passes a reference value when the argument is an object. - It does not pass the caller's variable itself. - Consider: static void change(int x) { x = 99; } int value = 10; change(value); System.out.println(value); // 10 The method receives a copy of 10.`
 },
 {
 title: "Practice",
 content: `- Predict the result of primitive reassignment, object mutation, object reassignment, and array mutation.
- Implement a failed swap method and explain why it fails.
- Rewrite the swap operation so that the caller receives the new values explicitly.`
 }
 ],
 },
{
 title: "Method overloading",
 slug: "method-overloading",
 description: `Method overloading means declaring multiple methods with the same name but different parameter lists within a class or related inheritance context.`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `Method overloading means declaring multiple methods with the same name but different parameter lists within a class or related inheritance context.

Examples:

\`\`\`java
static int add(int a, int b) {
    return a + b;
}
static double add(double a, double b) {
    return a + b;
}
\`\`\`

The methods have the same name but different parameter types.

Return type alone cannot create an overload:

\`\`\`java
int parse(String value) { ... }
double parse(String value) { ... } // invalid
\`\`\`

The compiler needs the argument list to distinguish the invocation.

Overloading can also differ by parameter count:

print(String value)
print(String value, int width)

and by parameter types:

print(int value)
print(long value)

The compiler chooses a method at compile time based on the static types of the arguments and Java's overload-resolution rules.

This creates an important difference between overloading and overriding. Overloading is about selecting among methods with different parameter lists; overriding is about a subclass providing a new implementation of an inherited method with the same signature.

A classic example:

\`\`\`java
void process(Object value) {
    System.out.println("Object");
}
void process(String value) {
    System.out.println("String");
}
String text = "hello";
Object reference = text;
\`\`\`

process(text);      // String overload
process(reference); // Object overload

The runtime object is a String in both cases, but overload selection uses the compile-time type of the expression.

Null can make overloads ambiguous:

\`\`\`java
void process(String value) {}
void process(Integer value) {}
\`\`\`

// process(null); // ambiguous

Both reference types can accept null, and neither is more specific than the other in this pair.

Primitive widening, boxing, and varargs can also affect overload selection. Rather than memorizing an oversimplified one-line priority rule, understand that the compiler searches applicable methods according to Java's formal invocation phases and chooses the most specific applicable method.

For example:

\`\`\`java
void test(long value) {
    System.out.println("long");
}
void test(Integer value) {
    System.out.println("Integer");
}
test(10);
\`\`\`

The compiler considers conversion possibilities under the invocation rules. Small examples like this are excellent experiments because the selected overload may not match an intuitive "boxing always wins" or "widening always wins" slogan.

Overloading can improve APIs when the alternatives represent the same conceptual operation:

\`\`\`java
String.valueOf(10);
String.valueOf(true);
String.valueOf('a');
\`\`\`

But too many overloads can make APIs difficult to understand, especially when combinations of null, boxing, generics, and varargs create ambiguity.

Constructors can also be overloaded:

\`\`\`java
class User {
    User(String name) {}
    User(String name, int age) {}
}
\`\`\`

Constructors are not methods, but constructor overloading follows related parameter-list principles.

Static methods can be overloaded. Static versus instance status does not itself distinguish an overload if the parameter lists are otherwise identical.

Generic methods can be overloaded in some cases, but type erasure places restrictions on which generic signatures can coexist. For example, two methods whose generic parameterizations erase to the same signature cannot simply be declared as separate overloads.

Good overload design keeps the methods semantically consistent. If \`read(String)\` and \`read(Path)\` perform radically different operations, a different name may be clearer.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
static void test(long value) {
    System.out.println("long");
}
static void test(Integer value) {
    System.out.println("Integer");
}
test(10);
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Method overloading means declaring multiple methods with the same name but different parameter lists within a class or related inheritance context. - Examples: static int add(int a, int b) { return a + b; } static double add(double a, double b) { return a + b; } The methods have the same name but different parameter types. - Return type alone cannot create an overload: int parse(String value) { ... - } // invalid The compiler needs the argument list to distinguish the invocation.`
 },
 {
 title: "Practice",
 content: `- Build an overloaded \`format\` API for int, double, and String.
- Test overload selection with int, long, Integer, Object, null, and varargs.
- Explain why two methods differing only by return type cannot coexist.
- Compare overload resolution with overriding using a small inheritance example.`
 }
 ],
 },
{
 title: "Recursion",
 slug: "recursion",
 description: `Recursion occurs when a method calls itself directly or indirectly. A recursive algorithm solves a problem by reducing it to a smaller version of the same problem.`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `Recursion occurs when a method calls itself directly or indirectly. A recursive algorithm solves a problem by reducing it to a smaller version of the same problem.

Every useful recursion needs a termination condition, usually called a base case, and a recursive step that moves toward that condition.

Example:

\`\`\`java
static int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
\`\`\`

For factorial(4), the calls conceptually become:

factorial(4)
4 * factorial(3)
4 * 3 * factorial(2)
4 * 3 * 2 * factorial(1)
4 * 3 * 2 * 1

Then the calls return in reverse order.

The base case is essential. Without it:

\`\`\`java
static int bad(int n) {
    return bad(n - 1);
}
\`\`\`

the calls continue until the JVM cannot create another stack frame and a StackOverflowError occurs.

Recursion does not magically store every call in a special recursion structure. Method invocations use the JVM's execution model and each active invocation has its own local state. The exact memory layout is JVM implementation dependent, but deeply nested recursion can exhaust the thread's available stack.

A recursive method should reduce the problem. In factorial, n becomes n - 1. In binary search, the search interval becomes smaller. If the recursive call does not move toward termination, the algorithm is broken.

Tree traversal is a natural use case:

\`\`\`java
void visit(Node node) {
    if (node == null) {
        return;
    }
    visit(node.left);
    process(node);
    visit(node.right);
}
\`\`\`

Each node defines smaller subproblems: its left subtree and right subtree.

Recursion can also model divide-and-conquer algorithms. Merge sort divides an array into smaller portions, solves each portion, then combines the results.

However, recursion is not automatically better than iteration. A simple loop is often clearer and avoids deep call chains.

Tail recursion is a form where the recursive call is the final operation. Some languages optimize tail calls, but Java does not generally guarantee tail-call elimination. Therefore converting a recursive Java algorithm to tail-recursive form should not be expected to remove stack usage.

Mutual recursion occurs when method A calls B and B eventually calls A:

isEven(n) -> isOdd(n) -> isEven(n - 1)

The same termination principles apply.

Recursion and mutable state can interact badly. If a recursive method modifies shared state, each level can observe changes made by other levels. Prefer passing the necessary state explicitly when that makes the algorithm easier to reason about.

A useful debugging technique is to trace one small input by hand. For recursive methods, write down:
- arguments at each call;
- the base case;
- what remains after the recursive call returns;
- the order in which calls return.

For example, a recursive sum:

\`\`\`java
static int sum(int[] values, int index) {
    if (index == values.length) {
        return 0;
    }
    return values[index] + sum(values, index + 1);
}
\`\`\`

The expression after the recursive call is important. Each frame remembers its own index and waits for the deeper call to produce a result.

When a recursive algorithm has overlapping subproblems, naive recursion can become exponentially expensive. Fibonacci is the classic example:

fib(n) = fib(n-1) + fib(n-2)

The same values are recomputed repeatedly. Memoization or dynamic programming can reduce the work substantially.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
static int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Recursion occurs when a method calls itself directly or indirectly. - A recursive algorithm solves a problem by reducing it to a smaller version of the same problem. - Every useful recursion needs a termination condition, usually called a base case, and a recursive step that moves toward that condition. - Example: static int factorial(int n) { if (n <= 1) { return 1; } return n * factorial(n - 1); } For factorial(4), the calls conceptually become: factorial(4) 4 * factorial(3) 4 * 3 * factorial(2) 4 * 3 * 2 * factorial(1) 4 * 3 * 2 * 1 Then the calls return in reverse order.`
 },
 {
 title: "Practice",
 content: `- Implement factorial recursively and iteratively.
- Traverse a binary tree recursively.
- Trace a recursive sum for a three-element array.
- Measure how recursive Fibonacci grows compared with an iterative or memoized version.
- Explain why Java does not guarantee tail-call optimization.`
 }
 ],
 },
{
 title: "static methods and fields",
 slug: "static-methods-and-fields",
 description: `The static modifier means a member belongs to the class rather than to a particular object instance.`,
 estimatedMinutes: 20,
 sections: [
 {
 title: "Concept and mental model",
 content: `The static modifier means a member belongs to the class rather than to a particular object instance.

A static field:

\`\`\`java
class Configuration {
    static String environment = "production";
}
\`\`\`

The field is accessed through the class:

Configuration.environment

An instance field is associated with each object:

\`\`\`java
class User {
    String name;
}
\`\`\`

Two User objects have independent name fields. A static field is associated with the class's static state.

Static methods are called without an instance:

\`\`\`java
Math.max(10, 20);
\`\`\`

A static method does not have a \`this\` reference because it is not invoked with a current object instance.

This means a static method cannot directly access an instance field:

\`\`\`java
class Counter {
    int count;
    static void printCount() {
        // System.out.println(count); // compilation error
    }
}
\`\`\`

It can access static fields:

\`\`\`java
class Counter {
    static int total;
    static void incrementTotal() {
        total++;
    }
}
\`\`\`

A static method can still work with objects when an object is supplied as a parameter:

\`\`\`java
static void print(User user) {
    System.out.println(user.name);
}
\`\`\`

Static does not mean "global variable" in exactly the same sense as languages that have process-wide globals. Java static state is associated with a class as defined by the JVM's class-loading model. In particular, different class loaders can load separate copies of the same class, so "one static field in the entire JVM" is an oversimplification.

Static initialization happens when the class is initialized according to JVM rules. A static field initializer can therefore have observable startup behavior:

\`\`\`java
class Settings {
    static String value = loadSettings();
}
\`\`\`

The call to loadSettings occurs as part of class initialization when the class is initialized.

Static fields are commonly used for constants:

\`\`\`java
static final int MAX_RETRIES = 3;
\`\`\`

But mutable static fields should be treated carefully because they create shared state. In concurrent programs, unsynchronized mutation can create data races.

Static methods are often appropriate for stateless utility operations:

Math.sqrt(value)

They are also useful as factories:

\`\`\`java
User user = User.create(...);
\`\`\`

However, excessive static design can make dependencies implicit and testing harder. An instance-based service can make dependencies explicit through constructors.

Static nested classes are different from inner classes. A static nested class does not require an enclosing instance:

\`\`\`java
class Outer {
    static class Nested {}
}
Outer.Nested value = new Outer.Nested();
\`\`\`

An ordinary inner class holds an association with an enclosing Outer instance and therefore has different semantics.

Static imports can shorten calls:

\`\`\`java
import static java.lang.Math.max;
int result = max(a, b);
\`\`\`

Use them sparingly when they improve readability.

A common mistake is thinking static methods are polymorphic in the same way as instance methods. Static methods are hidden rather than dynamically overridden. Method selection for a static call follows compile-time rules associated with the reference/class being used.

Another important issue is initialization order. Static fields and static initialization blocks execute as part of class initialization, in the order specified by the class initialization rules. Complex static initialization can create hard-to-debug startup failures.

A static field holding a mutable collection is especially risky:

\`\`\`java
static final List<String> names = new ArrayList<>();
\`\`\`

final prevents reassignment of the field, but it does not prevent modifications to the list:

\`\`\`java
names.add("Alice");
\`\`\`

This illustrates why \`static final\` does not automatically mean deeply immutable.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
class Counter {
    static int total;
    int value;
    static void incrementTotal() {
        total++;
    }
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `The static modifier means a member belongs to the class rather than to a particular object instance. - A static field: class Configuration { static String environment = "production"; } The field is accessed through the class: Configuration.environment An instance field is associated with each object: class User { String name; } Two User objects have independent name fields. - A static field is associated with the class's static state. - Static methods are called without an instance: Math.max(10, 20); A static method does not have a \`this\` reference because it is not invoked with a current object instance.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A common mistake is thinking static methods are polymorphic in the same way as instance methods.`
 },
 {
 title: "Practice",
 content: `- Create a class with both static and instance fields and observe the difference between two objects.
- Demonstrate why static methods cannot use this.
- Create a static final list and explain what final protects.
- Investigate class initialization with a static field that prints when initialized.`
 }
 ],
 },
{
 title: "final variables and methods",
 slug: "final-variables-and-methods",
 description: `The final keyword means "cannot be reassigned" in the context where it is applied, but exactly what it prevents depends on whether it is applied to a variable, method, or class.`,
 estimatedMinutes: 20,
 sections: [
 {
 title: "Concept and mental model",
 content: `The final keyword means "cannot be reassigned" in the context where it is applied, but exactly what it prevents depends on whether it is applied to a variable, method, or class.

For a variable:

\`\`\`java
final int max = 10;
\`\`\`

you cannot assign another value to max after initialization.

max = 20; // compilation error

A final variable must be definitely assigned before it is used. It can be initialized at declaration or, for a local variable, through a valid assignment path before use.

\`\`\`java
final int value;
value = calculate();
System.out.println(value);
\`\`\`

This is valid if the compiler can prove value is assigned exactly as required by Java's definite-assignment rules.

For a reference:

\`\`\`java
final Person person = new Person();
\`\`\`

the variable cannot be made to refer to another Person:

person = new Person(); // compilation error

But the object can still be mutable:

\`\`\`java
person.name = "Alice";
\`\`\`

Therefore final reference does not mean immutable object.

A common pattern is:

\`\`\`java
static final int MAX_RETRIES = 3;
\`\`\`

Static final fields are commonly used for constants. Naming conventions usually use uppercase words separated by underscores.

A final parameter cannot be reassigned inside the method:

\`\`\`java
void process(final int count) {
    // count = 10;
}
\`\`\`

For a reference parameter, final protects the parameter variable, not the referenced object.

A final field can be initialized in a constructor:

\`\`\`java
class User {
    private final String id;
    User(String id) {
        this.id = id;
    }
}
\`\`\`

Each User receives its own id, but after construction that field cannot be reassigned.

Blank final fields are useful for immutable object design because the constructor establishes required state.

Final methods cannot be overridden by subclasses:

\`\`\`java
class Parent {
    final void validate() {}
}
class Child extends Parent {
    // void validate() {} // compilation error
}
\`\`\`

This can be useful when a base class must guarantee a particular algorithm step cannot be replaced by subclasses.

A final class cannot be subclassed:

\`\`\`java
final class SecurityToken {}
class SpecialToken extends SecurityToken {} // compilation error
\`\`\`

String is a familiar final class in the Java platform. Its immutability is a separate property from final class declaration, although final prevents subclass-based alteration of the class's behavior.

Final and immutability should not be confused. To make an object truly immutable, all observable state must be protected from mutation, including mutable fields reachable through accessors. A final List field can still reference a mutable list.

For example:

\`\`\`java
final class Basket {
    private final List<String> items = new ArrayList<>();
    public List<String> getItems() {
        return items;
    }
}
\`\`\`

The field cannot be reassigned, but callers can mutate the returned list. An immutable design may instead return an unmodifiable view or defensive copy depending on the requirements.

Final also appears in switch-related and pattern-related language features in ways that should be understood from the specific Java version, but the core concept remains restriction of reassignment or inheritance/overriding where applicable.

Final local variables can be useful when a value should not accidentally change:

\`\`\`java
final int timeout = configuration.timeout();
\`\`\`

They can make reasoning easier, although marking every local variable final is not automatically better.

The compiler's definite-assignment rules are an important part of final local variables. This can fail:

\`\`\`java
final int value;
if (condition) {
    value = 10;
}
System.out.println(value); // may be unassigned
\`\`\`

The compiler requires every normal path reaching the use to assign value.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
final int max = 10;
// max = 20; // compile-time error
final List<String> names = new ArrayList<>();
names.add("Alice"); // allowed
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `The final keyword means "cannot be reassigned" in the context where it is applied, but exactly what it prevents depends on whether it is applied to a variable, method, or class. - For a variable: final int max = 10; you cannot assign another value to max after initialization. - max = 20; // compilation error A final variable must be definitely assigned before it is used. - It can be initialized at declaration or, for a local variable, through a valid assignment path before use.`
 },
 {
 title: "Practice",
 content: `- Create a final reference to a mutable object and demonstrate the distinction between reassignment and mutation.
- Build an immutable-style class with final fields.
- Create a final method and try overriding it.
- Compare final, static final, and final instance fields.`
 }
 ],
 },
{
 title: "Packages and imports",
 slug: "packages-and-imports",
 description: `A package gives a class a fully qualified name and provides a namespace for organizing types. For example:`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `A package gives a class a fully qualified name and provides a namespace for organizing types. For example:

\`\`\`java
package com.example.billing;
public class Invoice {
}
\`\`\`

The fully qualified class name is:

com.example.billing.Invoice

Packages help avoid naming collisions. Two different packages can each contain a class named User.

A source file's package declaration, when present, appears near the top:

\`\`\`java
package com.example.app;
import java.util.List;
public class Main {
}
\`\`\`

The import declaration lets source code refer to a type without repeatedly writing its fully qualified name:

\`\`\`java
import java.util.List;
List<String> names;
\`\`\`

Without the import:

\`\`\`java
java.util.List<String> names;
\`\`\`

Importing does not copy a class into your program. It is a source-level convenience for resolving type names.

java.lang is automatically available by simple name, which is why you can write String, System, Math, and Object without importing them.

Types in the same package can generally be referred to without an import, subject to the normal accessibility rules.

Wildcard imports:

\`\`\`java
import java.util.*;
\`\`\`

make types in that package available by simple name, but they do not recursively import subpackages. \`java.util.*\` does not import \`java.util.concurrent.*\`.

Static imports let you refer to static members without the qualifying class name:

\`\`\`java
import static java.lang.Math.PI;
double circumference = 2 * PI * radius;
\`\`\`

They can improve readability for a small set of well-known constants or methods, but too many static imports can make the source harder to understand.

A package name does not itself guarantee a particular directory structure at runtime, but Java build tools and conventional source layouts map package names to directories because it makes source organization and class-file lookup predictable.

For example, a conventional project might use:

src/main/java/com/example/app/Main.java

with:

\`\`\`java
package com.example.app;
\`\`\`

The compiler produces class files that retain the binary name information. The runtime uses class loaders and class paths/module paths to locate class definitions.

A class can be referenced by its fully qualified name:

\`\`\`java
com.example.billing.Invoice invoice =
new com.example.billing.Invoice();
\`\`\`

This is sometimes useful when two imported types have the same simple name.

For example:

java.util.Date
java.sql.Date

cannot both be imported under the same simple name without ambiguity. Fully qualifying one use resolves the conflict.

Packages also interact with access control. Package-private members are accessible to code in the same package, so package boundaries can be part of a class's encapsulation design.

Java's module system adds another layer. A package belongs to a module in a modular application, and module exports determine whether packages are accessible across module boundaries. Therefore package visibility and module readability are related but not identical concepts.

A common misconception is that an import controls runtime dependency loading. It does not. Import is a compile-time source construct. Runtime class loading occurs when the JVM needs a class definition according to the execution and class-loading rules.

Another misconception is that package names are security boundaries by themselves. Package naming organizes types and participates in access rules, but a package declaration is not a complete security mechanism.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
package com.example.app;
import java.util.List;
public class Main {
    List<String> names;
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `A package gives a class a fully qualified name and provides a namespace for organizing types. - For example: package com.example.billing; public class Invoice { } The fully qualified class name is: com.example.billing.Invoice Packages help avoid naming collisions. - Two different packages can each contain a class named User. - A source file's package declaration, when present, appears near the top: package com.example.app; import java.util.List; public class Main { } The import declaration lets source code refer to a type without repeatedly writing its fully qualified name: import java.util.List; List<String> names; Without the import: java.util.List<String> names; Importing does not copy a class into your program.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A common misconception is that an import controls runtime dependency loading. - Another misconception is that package names are security boundaries by themselves.`
 },
 {
 title: "Practice",
 content: `- Create two classes with the same simple name in different packages.
- Use fully qualified names to resolve a collision.
- Demonstrate that wildcard imports do not include subpackages.
- Compare an import with runtime class loading.
- Explore package-private access with two classes in the same package and one in a different package.`
 }
 ],
 },
{
 title: "Access modifiers",
 slug: "access-modifiers",
 description: `Access modifiers control where classes and members can be referenced. The main access levels are public, protected, package-private (no modifier), and private.`,
 estimatedMinutes: 19,
 sections: [
 {
 title: "Concept and mental model",
 content: `Access modifiers control where classes and members can be referenced. The main access levels are public, protected, package-private (no modifier), and private.

A public member can be accessed wherever the containing type is accessible, subject to other language and module rules.

A private member is accessible only within the class that declares it.

Package-private means no modifier is written:

\`\`\`java
class Account {
    String id;
}
\`\`\`

The member is accessible to code in the same package, but not ordinary code in another package.

Protected is more subtle. A protected member is accessible to code in the same package, and it is also accessible in subclasses under Java's protected-access rules. The subclass case is not simply "any subclass anywhere can use it through any object"; the exact qualifying expression matters.

Example:

\`\`\`java
class Parent {
    protected int value;
}
class Child extends Parent {
    void test(Child other) {
        System.out.println(value);
        System.out.println(other.value);
    }
}
\`\`\`

Understanding protected becomes especially important when inheritance crosses package boundaries.

Top-level classes have fewer choices than members. A top-level class can be public or package-private; private and protected top-level classes are not permitted as ordinary top-level class declarations.

A public top-level class traditionally has a source-file naming convention requiring the file name to correspond to the public class name. Modern Java source execution and special source-file modes introduce additional details, so distinguish the normal compilation convention from every possible launch mode.

Access modifiers are a design tool, not merely compiler decoration.

Good encapsulation usually keeps fields private:

\`\`\`java
class BankAccount {
    private BigDecimal balance;
    public BigDecimal getBalance() {
        return balance;
    }
}
\`\`\`

This prevents outside code from directly assigning arbitrary state. Behavior can then enforce invariants:

\`\`\`java
public void withdraw(BigDecimal amount) {
    if (amount.signum() < 0) {
        throw new IllegalArgumentException("Negative amount");
    }
    // ...
}
\`\`\`

If balance were public, callers could bypass validation.

Private methods are useful for implementation details:

\`\`\`java
public void process() {
    validate();
    execute();
}
private void validate() {}
private void execute() {}
\`\`\`

This keeps the public API smaller.

Access control also affects inheritance. A private method is not overridden by a subclass because it is not inherited as an accessible member in the ordinary sense. A subclass can declare another method with the same name and signature, but it is not overriding the private method.

Public APIs should be intentionally small. Every public method potentially becomes part of the contract that callers depend on.

Package-private access is particularly useful in modular code because a package can expose a small public facade while keeping implementation classes package-private.

Access modifiers do not make data immutable. A private mutable field can still be changed by methods in the class, and a public getter can expose a mutable object if it returns the internal reference directly.

Similarly, reflection and module boundaries introduce additional considerations, but normal Java access checking should be understood first.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
class Account {
    private BigDecimal balance;
    public BigDecimal getBalance() {
        return balance;
    }
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Access modifiers control where classes and members can be referenced. - The main access levels are public, protected, package-private (no modifier), and private. - A public member can be accessed wherever the containing type is accessible, subject to other language and module rules. - A private member is accessible only within the class that declares it.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `Protected is more subtle.`
 },
 {
 title: "Practice",
 content: `- Build a class with public, protected, package-private, and private members.
- Test access from the same package and another package.
- Demonstrate protected access from a subclass in another package.
- Explain why private fields plus controlled methods improve invariants.`
 }
 ],
 },
{
 title: "Object-oriented programming basics",
 slug: "object-oriented-programming-basics",
 description: `Object-oriented programming in Java organizes software around objects, their state, and their behavior. Java is strongly object-oriented in its class-based design, although it also has primitives and supports functional programming features.`,
 estimatedMinutes: 21,
 sections: [
 {
 title: "Concept and mental model",
 content: `Object-oriented programming in Java organizes software around objects, their state, and their behavior. Java is strongly object-oriented in its class-based design, although it also has primitives and supports functional programming features.

A class defines a type:

\`\`\`java
class Account {
    private BigDecimal balance;
    void deposit(BigDecimal amount) {
        balance = balance.add(amount);
    }
}
\`\`\`

An object is an instance of that class:

\`\`\`java
Account account = new Account();
\`\`\`

The object has state, while methods define operations that can act on that state.

Four concepts are commonly used to introduce OOP:
- encapsulation;
- abstraction;
- inheritance;
- polymorphism.

These are useful concepts, but they should not be treated as four independent checkboxes. Real Java designs often combine them.

Encapsulation means controlling how state and behavior are exposed. Private fields plus methods are a common mechanism.

Abstraction means exposing the essential contract while hiding implementation details. An interface can describe what a service does without specifying how it does it:

\`\`\`java
interface PaymentProcessor {
    Receipt process(Payment payment);
}
\`\`\`

Different implementations can satisfy that contract.

Polymorphism means code can operate through a common type while the concrete object determines which overridden instance method implementation runs.

\`\`\`java
PaymentProcessor processor = new StripePaymentProcessor();
processor.process(payment);
\`\`\`

If another implementation is substituted, the caller can remain unchanged.

Inheritance creates an is-a relationship:

\`\`\`java
class Animal {}
class Dog extends Animal {}
\`\`\`

Dog is an Animal. But inheritance should not be used merely to reuse code. If the relationship is not conceptually an is-a relationship, composition is often safer.

Composition means one object contains or uses another:

\`\`\`java
class OrderService {
    private final PaymentProcessor processor;
    OrderService(PaymentProcessor processor) {
        this.processor = processor;
    }
}
\`\`\`

This design allows the dependency to be replaced without changing OrderService's core behavior.

OOP also depends heavily on object identity and state. Two objects can contain equal values but still be distinct objects:

\`\`\`java
User a = new User("Alice");
User b = new User("Alice");
\`\`\`

They may be equal according to equals while still being separate object instances.

The \`==\` operator on references checks whether two references identify the same object, while equals is a method whose contract can define logical equality.

Good OOP design is not "make everything a class." Some values are better represented as records, enums, immutable value types, collections, or simple functions/methods.

A useful design process is:
1. Identify the domain concept.
2. Decide what state it owns.
3. Decide which invariants must always hold.
4. Decide which operations are valid.
5. Expose only the necessary contract.
6. Prefer composition when behavior is assembled from independent parts.
7. Use inheritance when substitutability is genuinely intended.

A common beginner mistake is creating a class whose fields are public and then putting all business logic elsewhere. That may technically use classes but provides little encapsulation.

Another mistake is deep inheritance hierarchies. Each inherited layer can make behavior harder to predict. Interfaces and composition often produce flatter designs.

OOP becomes especially powerful when combined with dependency inversion. Instead of hard-coding a concrete database or payment provider, depend on an interface and inject an implementation.

The result is easier testing and replacement:

\`\`\`java
OrderService service =
new OrderService(new FakePaymentProcessor());
\`\`\`

The same class can receive a production processor later.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
interface PaymentProcessor {
    Receipt process(Payment payment);
}
class OrderService {
    private final PaymentProcessor processor;
    OrderService(PaymentProcessor processor) {
        this.processor = processor;
    }
}
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `Object-oriented programming in Java organizes software around objects, their state, and their behavior. - Java is strongly object-oriented in its class-based design, although it also has primitives and supports functional programming features. - A class defines a type: class Account { private BigDecimal balance; void deposit(BigDecimal amount) { balance = balance.add(amount); } } An object is an instance of that class: Account account = new Account(); The object has state, while methods define operations that can act on that state. - Four concepts are commonly used to introduce OOP: - encapsulation; - abstraction; - inheritance; - polymorphism.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A common beginner mistake is creating a class whose fields are public and then putting all business logic elsewhere. - Another mistake is deep inheritance hierarchies.`
 },
 {
 title: "Practice",
 content: `- Design a small library system using classes and interfaces.
- Identify where encapsulation protects invariants.
- Replace one inheritance relationship with composition and compare the two designs.
- Create two implementations of an interface and demonstrate runtime polymorphism.`
 }
 ],
 },
{
 title: "Classes and objects",
 slug: "classes-and-objects",
 description: `A class is a Java type definition. It describes fields, methods, constructors, nested types, and other members. An object is a runtime instance of a class.`,
 estimatedMinutes: 21,
 sections: [
 {
 title: "Concept and mental model",
 content: `A class is a Java type definition. It describes fields, methods, constructors, nested types, and other members. An object is a runtime instance of a class.

Example:

\`\`\`java
class Person {
    String name;
    int age;
    void introduce() {
        System.out.println(name + " is " + age);
    }
}
\`\`\`

Creating an object:

\`\`\`java
Person person = new Person();
\`\`\`

The variable person contains a reference to a Person object. The object contains its instance state.

Assigning another variable creates an alias:

\`\`\`java
Person other = person;
other.name = "Alice";
\`\`\`

person.name is also "Alice" because both references identify the same object.

This is different from creating another object:

\`\`\`java
Person second = new Person();
\`\`\`

Now person and second refer to different instances.

Object identity and equality are therefore separate concepts. \`==\` on references checks identity:

person == other // true
person == second // false

Logical equality is normally defined with equals:

person.equals(second)

unless the class inherits Object's identity-based implementation or overrides it.

Fields belong either to each object as instance fields or to the class as static fields. Instance fields give each object its own state.

Methods can read and modify instance state:

\`\`\`java
class Counter {
    private int value;
    void increment() {
        value++;
    }
    int getValue() {
        return value;
    }
}
\`\`\`

Two counters maintain separate values.

Object construction involves more than simply allocating memory. When an object is created, Java's initialization process includes superclass initialization and the initialization of instance state before the constructor body completes. The exact order matters when fields depend on earlier initialization.

For example:

\`\`\`java
class Parent {
    Parent() {
        System.out.println("parent constructor");
    }
}
class Child extends Parent {
    private int value = initialize();
    Child() {
        System.out.println("child constructor");
    }
    private int initialize() {
        System.out.println("child field");
        return 10;
    }
}
\`\`\`

A Child construction demonstrates superclass construction before the subclass's instance initialization and constructor body.

An object can contain references to other objects:

\`\`\`java
class Order {
    private Customer customer;
    private List<Item> items;
}
\`\`\`

This creates an object graph. Real applications are usually collections of connected objects rather than isolated instances.

Objects can become unreachable. Java's garbage collector may reclaim objects that are no longer reachable from the live object graph, but programmers should not treat garbage collection as deterministic resource cleanup.

This is why resources such as files, sockets, and database connections should be closed explicitly, commonly using try-with-resources.

A class can also expose immutable objects. If all observable state is established during construction and never changes, instances can be safely shared in many situations.

Records are another Java feature for concise data-oriented classes, but ordinary classes remain useful when custom behavior, invariants, inheritance, or more complex lifecycle behavior is needed.

A common mistake is confusing a reference variable with the object itself. The variable can be null:

\`\`\`java
Person person = null;
\`\`\`

There is no Person object associated with that reference. Calling person.introduce() throws NullPointerException.

Another mistake is assuming \`new\` always creates an entirely independent deep object. If a constructor receives an existing mutable object and stores its reference, the new object may share internal state with the caller.

Good constructors and APIs decide explicitly whether to retain, copy, or wrap mutable inputs.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
class Person {
    String name;
    int age;
}
Person first = new Person();
Person second = first;
second.name = "Alice";
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `It describes fields, methods, constructors, nested types, and other members. - Example: class Person { String name; int age; void introduce() { System.out.println(name + " is " + age); } } Creating an object: Person person = new Person(); The variable person contains a reference to a Person object. - Assigning another variable creates an alias: Person other = person; other.name = "Alice"; person.name is also "Alice" because both references identify the same object. - This is different from creating another object: Person second = new Person(); Now person and second refer to different instances.`
 },
 {
 title: "Common mistakes and edge cases",
 content: `A common mistake is confusing a reference variable with the object itself. - Another mistake is assuming \`new\` always creates an entirely independent deep object.`
 },
 {
 title: "Practice",
 content: `- Create two instances and demonstrate independent instance state.
- Create two references to one object and demonstrate aliasing.
- Compare == and equals.
- Trace the initialization order of a superclass and subclass.
- Build a small object graph and identify which references keep each object reachable.`
 }
 ],
 },
{
 title: "Constructors",
 slug: "constructors",
 description: `A constructor is a special class member used during object creation to establish the initial state of a new instance. It has the same name as the class and no return type.`,
 estimatedMinutes: 25,
 sections: [
 {
 title: "Concept and mental model",
 content: `A constructor is a special class member used during object creation to establish the initial state of a new instance. It has the same name as the class and no return type.

Example:

\`\`\`java
class User {
    private final String name;
    User(String name) {
        this.name = name;
    }
}
\`\`\`

Create the object with:

\`\`\`java
User user = new User("Alice");
\`\`\`

The constructor receives the argument and initializes the object's state.

A constructor is not an ordinary method. It is invoked as part of object creation and cannot be called like:

user.User(); // invalid

Constructors can be overloaded:

\`\`\`java
User() {
    this("Unknown");
}
User(String name) {
    this.name = name;
}
\`\`\`

\`this(...)\` invokes another constructor in the same class. It must be the first statement in the constructor body.

A constructor can invoke a superclass constructor with \`super(...)\`:

\`\`\`java
class Admin extends User {
    Admin(String name) {
        super(name);
    }
}
\`\`\`

A constructor cannot explicitly invoke both this(...) and super(...), because one constructor invocation must be the first statement. If a constructor does not explicitly invoke another constructor in the same class, the compiler inserts an appropriate superclass-constructor invocation when the language rules permit it.

The compiler can provide a default constructor only under specific conditions: if a class declares no constructor, a default constructor is implicitly provided. Its accessibility is based on the class and language rules; it is not automatically public merely because the class is public.

If you declare any constructor yourself, the compiler does not add the no-argument constructor automatically.

This surprises beginners:

\`\`\`java
class User {
    User(String name) {}
}
new User(); // compilation error
\`\`\`

If a no-argument constructor is required, declare it explicitly.

Constructor initialization order becomes important with inheritance. When a subclass object is created, superclass construction occurs before the subclass constructor body completes. Instance field initializers and instance initialization blocks also participate in the initialization sequence.

For example:

\`\`\`java
class Parent {
    private int parentValue = initializeParent();
    Parent() {
        System.out.println("Parent constructor");
    }
    private int initializeParent() {
        System.out.println("Parent field");
        return 1;
    }
}
class Child extends Parent {
    private int childValue = initializeChild();
    Child() {
        System.out.println("Child constructor");
    }
    private int initializeChild() {
        System.out.println("Child field");
        return 2;
    }
}
\`\`\`

Creating Child produces an order reflecting superclass initialization before subclass instance initialization and constructor execution.

Constructors should establish class invariants. If a User must always have a non-null identifier, validate it at construction:

\`\`\`java
User(String id) {
    this.id = Objects.requireNonNull(id);
}
\`\`\`

This prevents invalid instances from being created.

Be careful with constructors that perform heavy external work. A constructor that opens network connections, performs complex queries, or starts threads can make object creation unpredictable and difficult to test. Often a factory or explicit initialization operation is a better design when construction has substantial side effects.

Constructors can accept mutable objects. Decide whether the class should retain the reference or make a defensive copy.

\`\`\`java
class Report {
    private final List<String> lines;
    Report(List<String> lines) {
        this.lines = List.copyOf(lines);
    }
}
\`\`\`

Now later changes to the caller's list do not change Report's internal list.

Constructor visibility is also a design tool:
- public constructors allow general creation;
- package-private constructors restrict creation to the package;
- protected constructors can support inheritance patterns;
- private constructors can restrict direct instantiation and support certain factory/singleton designs.

A class with only static utility methods may use a private constructor to prevent accidental instantiation, although modern API design should also consider whether a utility class is actually the right abstraction.

Constructors do not participate in overriding because constructors are not inherited. A subclass has its own constructors, and superclass constructors are invoked as part of subclass construction.

A constructor may throw an exception if construction cannot establish a valid object. Callers should then understand that no usable instance has been produced.`
 },
 {
 title: "Runnable example",
 content: `\`\`\`java
class User {
    private final String name;
    User(String name) {
        this.name = name;
    }
}
User user = new User("Alice");
\`\`\``
 },
 {
 title: "Key takeaways",
 content: `A constructor is a special class member used during object creation to establish the initial state of a new instance. - It has the same name as the class and no return type. - Example: class User { private final String name; User(String name) { this.name = name; } } Create the object with: User user = new User("Alice"); The constructor receives the argument and initializes the object's state. - It is invoked as part of object creation and cannot be called like: user.User(); // invalid Constructors can be overloaded: User() { this("Unknown"); } User(String name) { this.name = name; } \`this(...)\` invokes another constructor in the same class.`
 },
 {
 title: "Practice",
 content: `- Create overloaded constructors using this(...).
- Create a subclass and trace super-constructor and field-initialization order.
- Demonstrate the difference between an implicit default constructor and an explicitly declared no-argument constructor.
- Validate constructor arguments and explain which class invariant the validation protects.
- Test defensive copying when a constructor receives a mutable List.`
 }
 ],
 }
 ],
 },
 ],
 },
 ],
 };

 await ensureCategory(javaCategory);
 console.log("✅ Java (Core) category seeded (detailed learning topics 021-040)");
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
