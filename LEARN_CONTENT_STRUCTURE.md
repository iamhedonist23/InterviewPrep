# Learn Detailed Topic Pages - Content Structure & Data Flow

## Overview
When you visit `/learn/dsa-fundamentals/hash-tables-maps`, here's exactly where the content comes from:

---

## Data Flow: Seed File → Database → Detailed Page

### 1️⃣ SEED FILE STRUCTURE (Seed Template)
**File:** `prisma/seed-dsa.ts`

```typescript
// Example: Hash Tables Topic
{
  title: "Hash Tables – The Magic of Key‑Value Storage",
  slug: "hash-tables",
  shortDescription: "HashMap implementation, collisions, and complexity.",
  estimatedMinutes: 22,
  sections: [
    { 
      title: "The Hash Function – Mapping Keys to Indices", 
      content: "A hash table uses a hash function to map a key to an integer index..." 
    },
    { 
      title: "Collision Resolution – Chaining vs Open Addressing", 
      content: "**Chaining**: each bucket is a linked list of entries..." 
    },
    { 
      title: "Load Factor and Resizing", 
      content: "The load factor is entries / buckets..." 
    },
    { 
      title: "Real‑World Applications", 
      content: "Hash tables are ubiquitous: caches (Redis)..." 
    }
  ]
}
```

### 2️⃣ DATABASE MODELS

When `npm run seed` executes, the seed data is parsed and stored in these Prisma models:

#### **StudyTopic** (Main topic record)
```prisma
model StudyTopic {
  id                 String    @id @default(cuid())
  categoryId         String    // Which category (e.g., "DSA")
  moduleId           String    // Which module (e.g., "Trees and Hash Tables")
  title              String    // "Hash Tables – The Magic of Key‑Value Storage"
  slug               String    // "hash-tables"
  shortDescription   String?   // "HashMap implementation, collisions..."
  estimatedMinutes   Int?      // 22
  isPublished        Boolean   @default(false)
  sortOrder          Int       @default(0)
  
  // Relationships
  category           StudyCategory  @relation(fields: [categoryId], references: [id])
  module             StudyModule    @relation(fields: [moduleId], references: [id])
  sections           StudyTopicSection[]  // ← All sections for this topic
  examples           StudyExample[]       // ← Code examples
  exercises          StudyExercise[]      // ← Practice exercises
  questionRelations  StudyTopicQuestionRelation[]  // ← Linked interview Qs
}
```

#### **StudyTopicSection** (Each detailed section)
```prisma
model StudyTopicSection {
  id       String    @id @default(cuid())
  topicId  String    // Links back to the topic
  title    String    // "The Hash Function – Mapping Keys to Indices"
  content  String    // "A hash table uses a hash function..."
  sortOrder Int      @default(0)
  
  topic    StudyTopic @relation(fields: [topicId], references: [id], onDelete: Cascade)
}
```

#### **StudyExample** (Code examples)
```prisma
model StudyExample {
  id           String   @id @default(cuid())
  topicId      String   // Links to topic
  language     String   // "Java" or "Python" or "JavaScript"
  code         String   // The actual code
  explanation  String?  // What this code demonstrates
  sortOrder    Int      @default(0)
  
  topic        StudyTopic @relation(fields: [topicId], references: [id], onDelete: Cascade)
}
```

#### **StudyExercise** (Practice questions)
```prisma
model StudyExercise {
  id           String   @id @default(cuid())
  topicId      String   // Links to topic
  question     String   // "What is the difference between chaining..."
  difficulty   String   // "EASY", "MEDIUM", "HARD"
  hint         String?  // Optional hint to reveal
  solution     String?  // Complete solution to reveal
  explanation  String?  // Why this is the answer
  sortOrder    Int      @default(0)
  
  topic        StudyTopic @relation(fields: [topicId], references: [id], onDelete: Cascade)
}
```

#### **StudyTopicQuestionRelation** (Links to interview questions)
```prisma
model StudyTopicQuestionRelation {
  id         String   @id @default(cuid())
  topicId    String   // Links to topic
  questionId String   // Links to an InterviewQuestion
  sortOrder  Int      @default(0)
  
  topic      StudyTopic         @relation(fields: [topicId], references: [id], onDelete: Cascade)
  question   InterviewQuestion  @relation(fields: [questionId], references: [id], onDelete: Cascade)
}
```

---

## 3️⃣ PAGE LOADING QUERY

**File:** `lib/study.ts` - `getPublishedTopic()` function

```typescript
export async function getPublishedTopic(categorySlug: string, topicSlug: string) {
  return prisma.studyTopic.findFirst({
    where: {
      slug: topicSlug,              // "hash-tables"
      isPublished: true,
      category: { slug: categorySlug, isPublished: true },
      module: { isPublished: true, studyPath: { isPublished: true } },
    },
    include: {
      category: true,               // ✅ Category data (DSA)
      module: { include: { studyPath: true } },  // ✅ Module & Path
      sections: { orderBy: { sortOrder: "asc" } },  // ✅ ALL sections
      examples: { orderBy: { sortOrder: "asc" } },  // ✅ ALL examples
      exercises: { orderBy: { sortOrder: "asc" } }, // ✅ ALL exercises
      questionRelations: {          // ✅ Interview questions
        include: { 
          question: { 
            select: { id, question, slug, isPublished } 
          } 
        },
        orderBy: { sortOrder: "asc" }
      },
    },
  });
}
```

This single query loads **everything** needed for the page in one database call!

---

## 4️⃣ DETAILED TOPIC PAGE RENDERING

**File:** `app/learn/[category]/[topic]/page.tsx`

```jsx
export default async function LearnTopicPage({ params }: Props) {
  const { category, topic } = await params;
  
  // ✅ Load ALL topic data with sections, examples, exercises
  const item = await getPublishedTopic(category, topic);
  
  return (
    <section>
      {/* HEADER */}
      <h1>{item.title}</h1>
      <p>{item.shortDescription}</p>
      <span>{item.estimatedMinutes} min read</span>
      
      {/* SECTIONS (from StudyTopicSection) */}
      {item.sections.map(section => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>  {/* ← Content from seed file */}
        </div>
      ))}
      
      {/* CODE EXAMPLES (from StudyExample) */}
      {item.examples.length > 0 && (
        <div>
          <h2>Code examples</h2>
          {item.examples.map(example => (
            <pre>
              <code>{example.code}</code>  {/* ← Code from seed file */}
            </pre>
          ))}
        </div>
      )}
      
      {/* EXERCISES (from StudyExercise) */}
      {item.exercises.length > 0 && (
        <div>
          <h2>Knowledge check</h2>
          {item.exercises.map(exercise => (
            <StudyExercise exercise={exercise} />
            {/* Shows question, hint, solution */}
          ))}
        </div>
      )}
      
      {/* INTERVIEW QUESTIONS (from StudyTopicQuestionRelation) */}
      {item.questionRelations.length > 0 && (
        <div>
          <h2>Ready to practice?</h2>
          {item.questionRelations.map(relation => (
            <Link href={`/questions/${relation.question.slug}`}>
              {relation.question.question}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
```

---

## 5️⃣ CONTENT STRUCTURE ON THE PAGE

When you visit `/learn/dsa-fundamentals/hash-tables-maps`, you see:

```
┌─────────────────────────────────────────────┐
│ Breadcrumb: Home / Learn / DSA / Hash Tables │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Level Badge: Beginner                        │
│ Estimated Time: 22 min read                  │
│ Title: Hash Tables – The Magic of Key...     │
│ Short Description: HashMap implementation... │
│                                              │
│ [Start Topic] [Save for Later]               │
└─────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ The Hash Function – Mapping Keys to Indices│  ← section[0].title
├────────────────────────────────────────────┤
│ A hash table uses a hash function to map   │  ← section[0].content
│ a key to an integer index in an array...   │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ Collision Resolution – Chaining vs...      │  ← section[1].title
├────────────────────────────────────────────┤
│ **Chaining**: each bucket is a linked      │  ← section[1].content
│ list of entries...                         │
└────────────────────────────────────────────┘

[... more sections ...]

┌────────────────────────────────────────────┐
│ CODE EXAMPLES                               │
├────────────────────────────────────────────┤
│ Language: Java                              │
│ ┌──────────────────────────────────────┐   │
│ │ HashMap<String, Integer> map = ...   │   │  ← example[0].code
│ │ map.put("key", 42);                  │   │
│ └──────────────────────────────────────┘   │
│ This creates a HashMap...                  │  ← example[0].explanation
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ KNOWLEDGE CHECK                             │
├────────────────────────────────────────────┤
│ Q: What is the difference between...       │  ← exercise[0].question
│ [Show Hint]  [Show Solution]               │
│ Difficulty: EASY                           │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ READY TO PRACTICE?                         │
├────────────────────────────────────────────┤
│ → What is the difference between HashMap   │  ← question[0].question
│   and Hashtable?                           │
│                                            │
│ → Why is hashCode() important?             │  ← question[1].question
│                                            │
│ [Practice Interview Questions →]           │
└────────────────────────────────────────────┘
```

---

## 6️⃣ HOW TO ADD MORE CONTENT

### To add more sections to a topic:

Edit `prisma/seed-dsa.ts`:

```typescript
{
  title: "Hash Tables – The Magic of Key‑Value Storage",
  slug: "hash-tables",
  shortDescription: "HashMap implementation, collisions, and complexity.",
  estimatedMinutes: 22,
  sections: [
    // Existing sections...
    
    // NEW SECTION:
    {
      title: "Performance Considerations",
      content: "Best case O(1), average O(1), worst case O(n) if all hash to same bucket..."
    },
    {
      title: "When NOT to use Hash Tables",
      content: "When you need sorted order, or when memory is extremely limited..."
    }
  ]
}
```

Then run:
```bash
npm run seed
```

The new sections will automatically appear on the detailed page!

### To add code examples:

```typescript
// In prisma/seed-study.ts or similar
await prisma.studyExample.create({
  data: {
    topicId: hashTablesTopicId,
    language: "Java",
    code: `HashMap<String, Integer> scores = new HashMap<>();\nscores.put("Alice", 90);\nSystem.out.println(scores.get("Alice"));`,
    explanation: "This shows basic HashMap put and get operations.",
    sortOrder: 0
  }
});
```

### To add practice exercises:

```typescript
await prisma.studyExercise.create({
  data: {
    topicId: hashTablesTopicId,
    question: "What happens when two different keys produce the same hash?",
    difficulty: "EASY",
    hint: "It's called a collision.",
    solution: "A collision occurs when hash(key1) == hash(key2). The table handles this with chaining or open addressing.",
    explanation: "Understanding collisions is key to understanding hash tables.",
    sortOrder: 0
  }
});
```

---

## 7️⃣ HIERARCHY & RELATIONSHIPS

```
StudyCategory (e.g., "DSA Fundamentals")
  └─ StudyPath (e.g., "Beginner")
     └─ StudyModule (e.g., "Trees and Hash Tables")
        └─ StudyTopic (e.g., "Hash Tables – The Magic...")
           ├─ StudyTopicSection[] (multiple sections)
           │  ├─ "The Hash Function..."
           │  ├─ "Collision Resolution..."
           │  └─ "Real-World Applications"
           │
           ├─ StudyExample[] (multiple code examples)
           │  ├─ Java examples
           │  ├─ Python examples
           │  └─ JavaScript examples
           │
           ├─ StudyExercise[] (multiple practice questions)
           │  ├─ Easy exercises
           │  ├─ Medium exercises
           │  └─ Hard exercises
           │
           └─ StudyTopicQuestionRelation[] (linked interview questions)
              ├─ "What is HashMap?"
              ├─ "Difference between HashMap and Hashtable?"
              └─ "How does collision handling work?"
```

---

## 8️⃣ SECURITY & PUBLICATION

- ✅ Only **published** categories, paths, modules, and topics are shown
- ✅ Unpublished topics cannot be accessed even by direct URL
- ✅ All content is validated in the database query
- ✅ No sensitive data exposed

```typescript
// The query checks publication status at EVERY level
where: {
  slug: topicSlug,
  isPublished: true,  // ← Topic must be published
  category: { 
    slug: categorySlug, 
    isPublished: true  // ← Category must be published
  },
  module: { 
    isPublished: true,  // ← Module must be published
    studyPath: { 
      isPublished: true // ← Path must be published
    } 
  },
}
```

---

## Summary

| Component | From | Stored In | Rendered On Page |
|-----------|------|-----------|------------------|
| Title, Description | Seed file | StudyTopic | Header |
| Sections (detailed explanations) | Seed file | StudyTopicSection[] | Main content area |
| Code examples | Seed file or API | StudyExample[] | Code block section |
| Practice exercises | Admin interface or API | StudyExercise[] | Knowledge check section |
| Related interview questions | Interview question system | StudyTopicQuestionRelation[] | Ready to practice section |
| Navigation (prev/next) | Database tree | Computed in lib/study.ts | Bottom of page |

Each piece is **independently managed** and **loaded on demand** for optimal performance! 🚀
