import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: StudyLevel;
  modules: ModuleSeed[];
};

async function ensureCategory(category: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
}) {
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

      for (const topicSeed of moduleSeed.topics) {
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: createdCategory.id, slug: topicSeed.slug } },
          update: {
            title: topicSeed.title,
            moduleId: module.id,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
          },
          create: {
            categoryId: createdCategory.id,
            moduleId: module.id,
            title: topicSeed.title,
            slug: topicSeed.slug,
            shortDescription: topicSeed.shortDescription,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: 0,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        for (let index = 0; index < topicSeed.sections.length; index += 1) {
          const section = topicSeed.sections[index];
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

async function seedSQLCategory() {
  const sqlCategory = {
    name: "SQL Fundamentals",
    slug: "sql-fundamentals",
    description: "Learn SQL from table design to joins, grouping, filtering, and query planning.",
    icon: "SQL",
    sortOrder: 1,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Start with the SQL basics that show up in interviews and day-to-day data work.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Core SQL",
            slug: "core-sql",
            description: "Create and query tables, select data, and filter results.",
            topics: [
              {
                title: "SELECT and WHERE",
                slug: "select-where",
                shortDescription: "Retrieve rows with filters and column selection.",
                estimatedMinutes: 20,
                sections: [
                  { title: "SELECT", content: "Choose columns." },
                  { title: "WHERE", content: "Filter rows." },
                  { title: "Pattern matching", content: "LIKE, ILIKE." },
                  { title: "Sorting and limiting", content: "ORDER BY, LIMIT." },
                  { title: "Interview mindset", content: "Logical order of operations." },
                  { title: "Common mistakes", content: "Alias in WHERE, NULL handling." }
                ]
              },
              {
                title: "JOINs",
                slug: "joins",
                shortDescription: "Combine rows from multiple tables using key relationships.",
                estimatedMinutes: 22,
                sections: [
                  { title: "INNER JOIN", content: "Match on join condition." },
                  { title: "LEFT JOIN", content: "All rows from left table." },
                  { title: "FULL OUTER JOIN", content: "All rows from both." },
                  { title: "Self joins", content: "Join table to itself." },
                  { title: "Joining more than two tables", content: "Chain joins." },
                  { title: "Common pitfalls", content: "Cartesian product, duplicates." }
                ]
              },
              {
                title: "GROUP BY and Aggregates",
                slug: "group-by-aggregates",
                shortDescription: "Summarize data with COUNT, SUM, AVG, and grouping.",
                estimatedMinutes: 20,
                sections: [
                  { title: "GROUP BY", content: "Partition rows into groups." },
                  { title: "HAVING", content: "Filter groups." },
                  { title: "Common aggregate functions", content: "COUNT, SUM, AVG." },
                  { title: "Grouping by multiple columns", content: "More granular summaries." },
                  { title: "COUNT(*) vs COUNT(column)", content: "Difference." },
                  { title: "Interview framing", content: "Top N per group." }
                ]
              },
              {
                title: "Subqueries and CTEs",
                slug: "subqueries-ctes",
                shortDescription: "Write complex queries with nested logic and common table expressions.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Scalar subqueries", content: "Single value." },
                  { title: "Subqueries in FROM", content: "Derived tables." },
                  { title: "EXISTS and IN", content: "Check existence." },
                  { title: "CTEs", content: "WITH clauses." },
                  { title: "Recursive CTEs", content: "Hierarchical data." },
                  { title: "When to choose", content: "Readability vs performance." }
                ]
              }
            ],
          },
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Optimize queries and handle real-world data scenarios.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Intermediate SQL",
            slug: "intermediate-sql",
            description: "Indexes, performance, window functions.",
            topics: [
              {
                title: "Indexes and Query Performance",
                slug: "indexes-query-performance",
                shortDescription: "Speed up data retrieval with proper indexing strategies.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Why indexes matter", content: "Avoid full table scans." },
                  { title: "Index types", content: "Single-column, composite." },
                  { title: "EXPLAIN", content: "Execution plan." },
                  { title: "When indexes hurt", content: "Write overhead." },
                  { title: "Covering indexes", content: "Include all needed columns." },
                  { title: "Practical tuning", content: "Index columns in WHERE, JOIN." }
                ]
              },
              {
                title: "Window Functions",
                slug: "window-functions",
                shortDescription: "Perform row-by-row calculations while maintaining context.",
                estimatedMinutes: 22,
                sections: [
                  { title: "ROW_NUMBER and RANK", content: "Number rows." },
                  { title: "OVER and PARTITION BY", content: "Define window." },
                  { title: "Aggregate window functions", content: "Running totals." },
                  { title: "LAG and LEAD", content: "Access previous/next rows." },
                  { title: "Top-N per group", content: "Filtered outer query." },
                  { title: "Window functions vs GROUP BY", content: "Detail vs aggregate." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Transaction isolation, locking, and advanced SQL patterns.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Transactions and Concurrency",
            slug: "sql-transactions",
            description: "ACID, isolation levels, deadlocks.",
            topics: [
              {
                title: "ACID Properties",
                slug: "sql-acid",
                shortDescription: "Atomicity, Consistency, Isolation, Durability.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Atomicity", content: "All or nothing." },
                  { title: "Consistency", content: "Maintain data integrity." },
                  { title: "Isolation", content: "Concurrent transactions." },
                  { title: "Durability", content: "Persistence after commit." }
                ]
              },
              {
                title: "Isolation Levels",
                slug: "sql-isolation-levels",
                shortDescription: "Read uncommitted, read committed, repeatable read, serializable.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Read Uncommitted", content: "Dirty reads." },
                  { title: "Read Committed", content: "No dirty reads." },
                  { title: "Repeatable Read", content: "Phantom reads possible." },
                  { title: "Serializable", content: "Strongest isolation." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common SQL interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "SQL Interview Topics",
            slug: "sql-interview",
            description: "Frequently asked SQL topics.",
            topics: [
              {
                title: "Complex Queries",
                slug: "sql-interview-complex",
                shortDescription: "Nested queries, self-joins, date functions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Date manipulation", content: "DATEADD, DATEDIFF." },
                  { title: "Self-join use cases", content: "Employee-manager." },
                  { title: "Correlated subqueries", content: "Row-by-row." }
                ]
              },
              {
                title: "Schema Design",
                slug: "sql-interview-schema",
                shortDescription: "Normalization, denormalization, indexing strategy.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Normal forms", content: "1NF, 2NF, 3NF." },
                  { title: "Denormalization", content: "When to denormalize." },
                  { title: "Indexing strategy", content: "Clustered vs non-clustered." }
                ]
              }
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(sqlCategory);
  console.log("✓ SQL Fundamentals category seeded");
}

async function main() {
  await seedSQLCategory();
}

main()
  .catch((error) => {
    console.error("SQL seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });