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
                  { title: "What SELECT does", content: "SELECT chooses which columns to return from a table. WHERE filters rows before they are returned. Together they let you narrow the result to exactly the data you need.\n\nExample:\nSELECT first_name, last_name, email\nFROM users\nWHERE is_active = true;" },
                  { title: "Comparison and logical operators", content: "WHERE clauses combine comparison operators (=, !=, <, >, <=, >=) with logical operators (AND, OR, NOT). Parentheses control evaluation order, exactly like in math or code.\n\nExample:\nSELECT *\nFROM orders\nWHERE (status = 'pending' OR status = 'processing')\n  AND total_amount > 100;" },
              { title: "Pattern matching and NULLs", content: "LIKE and ILIKE match text patterns using % (any characters) and _ (single character). NULL means 'unknown' and must be tested with IS NULL / IS NOT NULL, never with = NULL.\n\nExample:\nSELECT name FROM products\nWHERE name LIKE 'Pro%' AND description IS NOT NULL;" },
                  { title: "Sorting and limiting results", content: "ORDER BY sorts rows by one or more columns, ascending (ASC, default) or descending (DESC). LIMIT and OFFSET page through results, useful for pagination.\n\nExample:\nSELECT title, price\nFROM books\nORDER BY price DESC\nLIMIT 10 OFFSET 20;" },
                  { title: "Interview mindset", content: "Interviewers often want you to explain how a query reads data, not just memorize syntax. Talk about the logical flow: FROM builds the row set, WHERE filters it, SELECT projects columns, ORDER BY sorts, LIMIT trims." },
                  { title: "Common mistakes", content: "Forgetting that WHERE runs before SELECT means you can't filter on a column alias defined in SELECT. Also watch for case sensitivity in string comparisons, which depends on the database's collation settings." }
                ]
              },
              {
                title: "JOINs",
                slug: "joins",
                shortDescription: "Combine rows from multiple tables using key relationships.",
                estimatedMinutes: 22,
                sections: [
                  { title: "INNER JOIN", content: "INNER JOIN keeps only rows that match on the join condition. It is the most common join for combining fact and dimension data.\n\nExample:\nSELECT o.id, u.name\nFROM orders o\nINNER JOIN users u ON o.user_id = u.id;" },
                  { title: "LEFT JOIN and RIGHT JOIN", content: "LEFT JOIN keeps all rows from the left table and adds matching data from the right table when available, using NULL for missing matches. RIGHT JOIN is the mirror image and is rarely used since you can rewrite it as a LEFT JOIN by swapping table order.\n\nExample:\nSELECT u.name, o.id AS order_id\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id;" },
                  { title: "FULL OUTER JOIN and CROSS JOIN", content: "FULL OUTER JOIN returns all rows from both tables, matching where possible and filling NULLs elsewhere. CROSS JOIN produces the Cartesian product, pairing every row from one table with every row from another." },
                  { title: "Self joins", content: "A self join joins a table to itself, useful for hierarchical data like employees and managers.\n\nExample:\nSELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;" },
                  { title: "Joining more than two tables", content: "Chain multiple JOIN clauses to pull in related data from several tables at once. Alias each table to keep column references unambiguous and the query readable." },
                  { title: "Common pitfalls", content: "A missing or wrong join condition silently produces a Cartesian product or duplicate rows. Always verify row counts after a join, especially with one-to-many relationships that can multiply results." }
                ]
              },
              {
                title: "GROUP BY and Aggregates",
                slug: "group-by-aggregates",
                shortDescription: "Summarize data with COUNT, SUM, AVG, and grouping.",
                estimatedMinutes: 20,
                sections: [
                  { title: "GROUP BY basics", content: "GROUP BY partitions rows into groups and lets you calculate aggregates per group. Every non-aggregated column in SELECT must appear in GROUP BY.\n\nExample:\nSELECT customer_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id;" },
                  { title: "HAVING vs WHERE", content: "HAVING filters groups after aggregation, the same way WHERE filters rows before aggregation. You cannot use aggregate functions in WHERE.\n\nExample:\nSELECT customer_id, SUM(total_amount) AS total_spent\nFROM orders\nGROUP BY customer_id\nHAVING SUM(total_amount) > 500;" },
                  { title: "Common aggregate functions", content: "COUNT counts rows, SUM and AVG operate on numeric columns, MIN/MAX find extremes, and STRING_AGG (or GROUP_CONCAT in MySQL) combines text values from a group into one string." },
                  { title: "Grouping by multiple columns", content: "You can group by several columns to get finer-grained summaries, such as sales per region per month.\n\nExample:\nSELECT region, EXTRACT(MONTH FROM order_date) AS month, SUM(total_amount)\nFROM orders\nGROUP BY region, EXTRACT(MONTH FROM order_date);" },
                  { title: "COUNT(*) vs COUNT(column)", content: "COUNT(*) counts all rows including NULLs. COUNT(column) only counts rows where that column is not NULL. This distinction matters when checking for missing data." },
                  { title: "Interview framing", content: "Aggregation questions often ask you to find 'top N per group' or 'customers above average spend' — these usually combine GROUP BY with a subquery or window function." }
                ]
              },
              {
                title: "Subqueries and CTEs",
                slug: "subqueries-ctes",
                shortDescription: "Write complex queries with nested logic and common table expressions.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Scalar and column subqueries", content: "A subquery is a query nested inside another. A scalar subquery returns a single value and can be used anywhere an expression is expected.\n\nExample:\nSELECT name FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);" },
                  { title: "Subqueries in FROM", content: "A subquery in FROM acts like a temporary, unnamed table (a derived table). It must be given an alias.\n\nExample:\nSELECT region, avg_total\nFROM (SELECT region, AVG(total_amount) AS avg_total FROM orders GROUP BY region) AS region_totals;" },
                  { title: "EXISTS and IN", content: "EXISTS checks whether a subquery returns any rows and is often faster than IN for large datasets since it can short-circuit. IN compares a value against a list or subquery result.\n\nExample:\nSELECT name FROM customers c\nWHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);" },
                  { title: "Common table expressions", content: "CTEs (WITH clauses) make complex queries readable by breaking them into named intermediate results that can be referenced multiple times in the same query.\n\nExample:\nWITH high_value AS (\n  SELECT customer_id, SUM(total_amount) AS total\n  FROM orders GROUP BY customer_id\n  HAVING SUM(total_amount) > 1000\n)\nSELECT c.name, hv.total\nFROM high_value hv JOIN customers c ON c.id = hv.customer_id;" },
                  { title: "Recursive CTEs", content: "A recursive CTE references itself to walk hierarchical or graph-like data, such as an org chart or category tree, until a base condition stops the recursion." },
                  { title: "When to choose which", content: "Use a CTE when a subquery is reused or when naming an intermediate step improves readability. Use a correlated subquery (one that references the outer query) when you need per-row filtering logic." }
                ]
              }
            ],
          },
          {
            title: "Intermediate SQL",
            slug: "intermediate-sql",
            description: "Optimize queries and handle real-world data scenarios.",
            topics: [
              {
                title: "Indexes and Query Performance",
                slug: "indexes-query-performance",
                shortDescription: "Speed up data retrieval with proper indexing strategies.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Why indexes matter", content: "An index creates a fast lookup path for columns you query frequently. Without indexes, databases scan every row (a full table scan), which is slow on large tables." },
                  { title: "Index types", content: "Single-column indexes speed up equality and range queries. Composite (multi-column) indexes help when multiple columns are used in filters together, but column order in the index matters." },
                  { title: "Reading an execution plan", content: "EXPLAIN (or EXPLAIN ANALYZE) shows how the database will execute a query: whether it uses an index scan or a sequential scan, estimated row counts, and join strategy.\n\nExample:\nEXPLAIN ANALYZE\nSELECT * FROM orders WHERE customer_id = 42;" },
                  { title: "When indexes hurt", content: "Every index adds overhead to INSERT, UPDATE, and DELETE since the index must also be updated. Over-indexing a write-heavy table can slow it down more than it speeds up reads." },
                  { title: "Covering indexes", content: "A covering index includes all the columns a query needs, letting the database answer the query directly from the index without touching the table at all." },
                  { title: "Practical tuning tips", content: "Index columns used in WHERE, JOIN, and ORDER BY clauses. Avoid wrapping indexed columns in functions (like LOWER(column)) unless you create a matching functional index." }
                ]
              },
              {
                title: "Window Functions",
                slug: "window-functions",
                shortDescription: "Perform row-by-row calculations while maintaining context.",
                estimatedMinutes: 22,
                sections: [
                  { title: "ROW_NUMBER and RANK", content: "Window functions calculate values within a partition of rows without collapsing them like GROUP BY does. ROW_NUMBER assigns a unique, sequential number; RANK handles ties by leaving gaps; DENSE_RANK ranks ties without gaps.\n\nExample:\nSELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS salary_rank\nFROM employees;" },
                  { title: "OVER and PARTITION BY", content: "The OVER clause defines the window. PARTITION BY creates independent groups (like GROUP BY, but rows stay ungrouped), and ORDER BY controls ranking or running calculations within each group.\n\nExample:\nSELECT department, name, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;" },
                  { title: "Aggregate window functions", content: "SUM, AVG, COUNT, MIN, and MAX can all be used as window functions to compute running totals or group statistics alongside individual rows.\n\nExample:\nSELECT order_date, amount,\n  SUM(amount) OVER (ORDER BY order_date) AS running_total\nFROM orders;" },
                  { title: "LAG and LEAD", content: "LAG and LEAD access values from a previous or following row within the same result set, useful for comparing a row to the one before or after it (e.g., month-over-month change)." },
                  { title: "Top-N per group", content: "A very common interview pattern combines ROW_NUMBER with PARTITION BY, then filters in an outer query (since window functions can't be used directly in WHERE), to get the top N rows per group.\n\nExample:\nSELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn\n  FROM employees\n) t WHERE rn <= 3;" },
                  { title: "Window functions vs GROUP BY", content: "GROUP BY collapses rows into one per group; window functions keep every row while still giving each access to group-level calculations. Choose window functions when you need both the detail and the aggregate side by side." }
                ]
              }
            ]
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
