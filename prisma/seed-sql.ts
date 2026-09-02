import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
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

async function seedSQLCategory() {
  const sqlCategory: CategorySeed = {
    name: "SQL Fundamentals",
    slug: "sql-fundamentals",
    description: "Learn SQL from table design to joins, grouping, filtering, and query planning.",
    icon: "SQL",
    sortOrder: 1,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Start with the SQL basics that show up in interviews and day-to-day data work.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Core SQL – The Foundation",
            slug: "core-sql",
            description: "Create and query tables, select data, and filter results.",
            topics: [
              {
                title: "SELECT and WHERE – Retrieving Data",
                slug: "select-where",
                shortDescription: "Retrieve rows with filters and column selection.",
                estimatedMinutes: 26,
                sections: [
                  { title: "SELECT – Projecting Columns", content: "`SELECT column1, column2 FROM table` – returns only specified columns. Use `*` for all columns, but avoid it in production for performance and clarity. You can use expressions: `SELECT price * 1.1 AS price_with_tax`." },
                  { title: "WHERE – Filtering Rows", content: "`WHERE` filters rows before any aggregation. Supports comparison (`=`, `!=`, `<`, `>`), logical (`AND`, `OR`, `NOT`), and `IN`, `BETWEEN`, `LIKE`, `IS NULL`. Example: `WHERE age >= 18 AND status = 'active'`." },
                  { title: "Pattern Matching with LIKE and ILIKE", content: "`LIKE` uses `%` (any characters) and `_` (single character). `ILIKE` is case‑insensitive (PostgreSQL). Example: `WHERE name LIKE 'J%'` – names starting with 'J'. For complex patterns, use regular expressions." },
                  { title: "Sorting and Limiting – ORDER BY, LIMIT", content: "`ORDER BY column ASC|DESC` – sorts results. `LIMIT n` restricts rows; `OFFSET` skips rows (for pagination). Example: `SELECT * FROM products ORDER BY price DESC LIMIT 10 OFFSET 20`." },
                  { title: "Logical Order of Operations – Interview Mindset", content: "The logical order is: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`. This helps you understand why you can't use a column alias in `WHERE` (it's evaluated before `SELECT`)." },
                  { title: "Common Mistakes – NULL and Aliases", content: "`NULL` is not equal to anything, including itself. Use `IS NULL` / `IS NOT NULL`. You cannot use a column alias in `WHERE`; it's only available in `ORDER BY` and later clauses." },
                ],
              },
              {
                title: "JOINs – Combining Tables",
                slug: "joins",
                shortDescription: "Combine rows from multiple tables using key relationships.",
                estimatedMinutes: 28,
                sections: [
                  { title: "INNER JOIN – Matching Rows", content: "Returns rows where the join condition matches on both sides. Example: `SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.id`. Rows without a match are excluded." },
                  { title: "LEFT JOIN – All Left Rows", content: "Keeps every row from the left table, and fills right‑side columns with `NULL` when no match exists. Useful for finding customers without orders." },
                  { title: "RIGHT JOIN and FULL OUTER JOIN", content: "`RIGHT JOIN` is the mirror of `LEFT`; `FULL OUTER JOIN` returns matches plus unmatched rows from both sides (supported in PostgreSQL, SQL Server)." },
                  { title: "Self Joins – Joining a Table to Itself", content: "Use when a table references itself (e.g., employees with manager_id). Use aliases: `SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id`." },
                  { title: "Joining More Than Two Tables", content: "Chain joins: `SELECT * FROM a JOIN b ON ... JOIN c ON ...`. Order can affect performance; the optimizer usually rearranges, but it's good to know." },
                  { title: "Common Pitfalls – Cartesian Product and Duplicates", content: "Forgetting a join condition creates a Cartesian product (all row combinations). Duplicate rows can appear when one‑to‑many relationships are joined; use `DISTINCT` or `GROUP BY` if needed." },
                ],
              },
              {
                title: "GROUP BY and Aggregates – Summarizing Data",
                slug: "group-by-aggregates",
                shortDescription: "Summarize data with COUNT, SUM, AVG, and grouping.",
                estimatedMinutes: 24,
                sections: [
                  { title: "GROUP BY – Partitioning Rows", content: "Groups rows that have the same values in the specified columns. Used with aggregate functions: `SELECT department, COUNT(*) FROM employees GROUP BY department`." },
                  { title: "HAVING – Filtering Groups", content: "Filters groups after aggregation (unlike `WHERE`, which filters rows). Example: `SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 50000`." },
                  { title: "Common Aggregate Functions", content: "`COUNT(*)` (all rows), `COUNT(column)` (non‑null values), `SUM`, `AVG`, `MIN`, `MAX`, and `STRING_AGG` (PostgreSQL) or `GROUP_CONCAT` (MySQL) to concatenate values." },
                  { title: "Grouping by Multiple Columns", content: "Group by several columns: `SELECT year, month, SUM(sales) FROM sales GROUP BY year, month` – gives monthly totals per year." },
                  { title: "COUNT(*) vs COUNT(column)", content: "`COUNT(*)` counts all rows including NULLs. `COUNT(column)` counts only non‑NULL values. This matters when you need to check missing data." },
                  { title: "Interview Framing – Top N per Group", content: "Often asked: find the top 3 employees per department. Use `ROW_NUMBER()` with `PARTITION BY` (covered later)." },
                ],
              },
              {
                title: "Subqueries and CTEs – Nested Logic",
                slug: "subqueries-ctes",
                shortDescription: "Write complex queries with nested logic and common table expressions.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Scalar Subqueries – Single Value", content: "A subquery that returns a single value (one row, one column). Used in `SELECT`, `WHERE`, `HAVING`. Example: `SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)`." },
                  { title: "Subqueries in FROM – Derived Tables", content: "A subquery in `FROM` acts as a temporary table. Must have an alias. Example: `SELECT * FROM (SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department) AS dept_stats WHERE avg_sal > 60000`." },
                  { title: "EXISTS and IN – Existence Checks", content: "`EXISTS` tests whether a subquery returns rows; can short‑circuit, often faster than `IN` for large datasets. `IN` checks equality against a list or subquery result." },
                  { title: "CTEs – Common Table Expressions (WITH)", content: "`WITH cte_name AS (SELECT ...) SELECT * FROM cte_name`. Improves readability and allows reuse. Example: `WITH high_salaries AS (SELECT * FROM employees WHERE salary > 100000) SELECT * FROM high_salaries`." },
                  { title: "Recursive CTEs – Hierarchical Data", content: "Useful for traversing trees (org charts, category trees). A recursive CTE references itself. Example (PostgreSQL): `WITH RECURSIVE org_tree AS (SELECT id, name, manager_id FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id FROM employees e JOIN org_tree ot ON e.manager_id = ot.id) SELECT * FROM org_tree`." },
                  { title: "When to Choose – CTE vs Subquery", content: "Use CTEs for readability and reuse; use subqueries for simple, single‑use logic. The optimizer often treats them similarly." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Optimize queries and handle real-world data scenarios.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Intermediate SQL – Performance and Analytics",
            slug: "intermediate-sql",
            description: "Indexes, performance, window functions, and advanced joins.",
            topics: [
              {
                title: "Indexes and Query Performance – Speeding Up Reads",
                slug: "indexes-query-performance",
                shortDescription: "Speed up data retrieval with proper indexing strategies.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Why Indexes Matter – Avoiding Full Table Scans", content: "Without an index, the database performs a full table scan (O(n)) – fine for small tables but catastrophic for large ones. Indexes create a sorted lookup structure (usually a B‑tree) that allows O(log n) access." },
                  { title: "Index Types – Single‑Column, Composite, Unique, Partial", content: "**Single‑column**: simplest. **Composite**: multiple columns; order matters (e.g., (last_name, first_name) helps queries with last_name). **Unique**: enforces uniqueness. **Partial**: indexes only a subset (e.g., WHERE active = true)." },
                  { title: "EXPLAIN – Reading the Execution Plan", content: "`EXPLAIN` (or `EXPLAIN ANALYZE`) shows how the database will execute the query. Look for: sequential scans (bad for large tables), index scans (good), and join methods (nested loop, hash, merge)." },
                  { title: "When Indexes Hurt – Write Overhead", content: "Every index adds overhead to `INSERT`, `UPDATE`, and `DELETE` because the index must be updated. Over‑indexing can degrade write performance." },
                  { title: "Covering Indexes – Index‑Only Scans", content: "An index that contains all columns needed by a query, allowing the database to answer the query directly from the index without touching the table." },
                  { title: "Practical Tuning – Index Columns in WHERE, JOIN, ORDER BY", content: "Index columns used in `WHERE`, `JOIN`, `ORDER BY`, and `GROUP BY`. Avoid indexing low‑cardinality columns (e.g., boolean). Use partial indexes for targeted queries." },
                ],
              },
              {
                title: "Window Functions – Advanced Analytics",
                slug: "window-functions",
                shortDescription: "Perform row-by-row calculations while maintaining context.",
                estimatedMinutes: 28,
                sections: [
                  { title: "ROW_NUMBER and RANK – Ordering Rows", content: "`ROW_NUMBER()` assigns a unique sequential number within a partition. `RANK()` leaves gaps on ties; `DENSE_RANK()` does not. Example: `SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rank FROM employees`." },
                  { title: "OVER and PARTITION BY – Defining the Window", content: "`OVER` defines the window. `PARTITION BY` splits rows into groups for independent calculations. `ORDER BY` defines ordering within each partition (for ranking and running totals)." },
                  { title: "Aggregate Window Functions – Running Totals and Moving Averages", content: "`SUM() OVER (ORDER BY date)` gives running totals. `AVG() OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` gives a 7‑day moving average." },
                  { title: "LAG and LEAD – Access Previous/Next Rows", content: "`LAG(column, offset)` gets a value from a previous row; `LEAD` gets from a following row. Useful for comparing current period to previous period (e.g., month‑over‑month change)." },
                  { title: "Top‑N per Group – Filtering Window Results", content: "Combine `ROW_NUMBER()` with `PARTITION BY`, then filter in an outer query: `SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn FROM employees) t WHERE rn <= 3`." },
                  { title: "Window Functions vs GROUP BY", content: "`GROUP BY` reduces the result set to one row per group. Window functions keep all rows while adding aggregate context to each row. Choose based on whether you need the detail rows." },
                ],
              },
              {
                title: "Advanced JOINs – Beyond INNER and LEFT",
                slug: "advanced-joins",
                shortDescription: "Anti‑join, semi‑join, and LATERAL joins.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Anti‑Join – Finding What's Not There", content: "Use `LEFT JOIN` with `IS NULL` to find rows without matches. Example: `SELECT customers.* FROM customers LEFT JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL` – customers with no orders." },
                  { title: "Semi‑Join – Existence Check", content: "Use `EXISTS` or `IN` to check existence without returning columns from the right table. Example: `SELECT * FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id)`." },
                  { title: "LATERAL Joins – Subquery per Row", content: "`LATERAL` allows a subquery to reference columns from the left side. Useful for top‑N per group. Example (PostgreSQL): `SELECT * FROM departments, LATERAL (SELECT * FROM employees WHERE employees.department_id = departments.id ORDER BY salary DESC LIMIT 3) AS top_employees`." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- ADVANCED --------------------
      {
        name: "Advanced",
        slug: "advanced",
        description: "Transaction isolation, locking, JSON, and advanced query tuning.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Transactions and Concurrency – ACID and Isolation",
            slug: "sql-transactions",
            description: "ACID, isolation levels, deadlocks, and locking.",
            topics: [
              {
                title: "ACID Properties – The Guarantees",
                slug: "sql-acid",
                shortDescription: "Atomicity, Consistency, Isolation, Durability.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Atomicity – All or Nothing", content: "A transaction is a unit of work. If any part fails, the entire transaction is rolled back. This ensures no partial updates." },
                  { title: "Consistency – Data Integrity", content: "Transactions leave the database in a consistent state, respecting all constraints (foreign keys, unique, check)." },
                  { title: "Isolation – Concurrency Control", content: "Concurrent transactions should not interfere with each other. Isolation levels control trade‑offs between consistency and performance." },
                  { title: "Durability – Persistence", content: "Once committed, changes persist even after a system crash (provided the database guarantees durability)." },
                ],
              },
              {
                title: "Isolation Levels – Balancing Consistency and Performance",
                slug: "sql-isolation-levels",
                shortDescription: "Read uncommitted, read committed, repeatable read, serializable.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Read Uncommitted – Dirty Reads", content: "Allows seeing uncommitted changes. Lowest isolation, highest concurrency, but risky." },
                  { title: "Read Committed – No Dirty Reads", content: "Only committed data is visible. Prevents dirty reads. Most common level." },
                  { title: "Repeatable Read – No Non‑Repeatable Reads", content: "Same row read twice yields same values. Phantom reads (new rows appearing) may still occur." },
                  { title: "Serializable – Strongest Isolation", content: "Prevents all anomalies, but may reduce concurrency. Equivalent to serial execution." },
                  { title: "Phantom Reads and Locking", content: "Phantom reads occur when a query sees new rows inserted by another transaction. Serializable prevents this with range locks." },
                ],
              },
              {
                title: "JSON and JSONB in SQL (PostgreSQL)",
                slug: "json-sql",
                shortDescription: "Store and query JSON data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JSON vs JSONB", content: "`JSON` stores text; `JSONB` stores binary (indexable, faster queries). Use `JSONB` for most use cases." },
                  { title: "Querying JSON", content: "`->` returns JSON, `->>` returns text. Example: `SELECT data->>'name' FROM users WHERE data->>'age' > '18'`." },
                  { title: "Indexing JSONB", content: "Use GIN indexes on JSONB columns for fast key/value searches." },
                ],
              },
            ],
          },
          {
            title: "Query Tuning and Optimization",
            slug: "query-tuning",
            description: "Advanced tuning with execution plans, statistics, and hints.",
            topics: [
              {
                title: "Reading Execution Plans – EXPLAIN ANALYZE",
                slug: "explain-analyze",
                shortDescription: "Understanding the plan and cost.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is an Execution Plan", content: "The database's strategy for executing a query: scan methods (sequential, index), join methods (nested loop, hash, merge), and estimated costs." },
                  { title: "Cost Units", content: "Cost is an arbitrary unit (often based on I/O and CPU). Lower is better. Use `EXPLAIN (ANALYZE, BUFFERS)` to see actual I/O." },
                  { title: "Scan Types – Seq Scan, Index Scan, Index Only Scan, Bitmap", content: "**Seq Scan**: full table scan (bad for large tables). **Index Scan**: uses an index. **Index Only Scan**: covers all needed columns. **Bitmap**: combines multiple indexes." },
                  { title: "Join Methods – Nested Loop, Hash Join, Merge Join", content: "**Nested Loop**: for small tables or indexed joins. **Hash**: builds a hash table of one input; good for equi‑joins. **Merge**: sorts both inputs; good for large sorted datasets." },
                ],
              },
              {
                title: "Statistics and Query Hints",
                slug: "stats-hints",
                shortDescription: "Using statistics and hints to influence the optimizer.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Table Statistics", content: "The optimizer uses statistics (row count, distribution) to estimate costs. Run `ANALYZE` to update them." },
                  { title: "Query Hints", content: "Some databases allow hints to force a specific plan (e.g., `/*+ USE_INDEX(table index) */`). Use sparingly; they can break with data changes." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERVIEW PREP --------------------
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common SQL interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-sql-interview",
            description: "Queries, joins, aggregations, and window functions.",
            topics: [
              {
                title: "Complex Queries – Nested, Self‑Joins, Date Functions",
                slug: "sql-interview-complex",
                shortDescription: "Nested queries, self-joins, date functions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Date Manipulation", content: "Use `DATEADD`, `DATEDIFF`, `EXTRACT`, `DATE_TRUNC`. Example: `SELECT * FROM orders WHERE order_date >= NOW() - INTERVAL '30 days'`." },
                  { title: "Self‑Join Use Cases", content: "Employee‑manager hierarchy, finding duplicates, or comparing rows within the same table." },
                  { title: "Correlated Subqueries", content: "A subquery that references the outer query. Example: `SELECT * FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department)`." },
                ],
              },
              {
                title: "Schema Design – Normalization and Indexing",
                slug: "sql-interview-schema",
                shortDescription: "Normalization, denormalization, indexing strategy.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Normal Forms – 1NF, 2NF, 3NF, BCNF", content: "1NF: atomic columns. 2NF: no partial dependency. 3NF: no transitive dependency. BCNF: stronger. Understand trade‑offs with performance." },
                  { title: "Denormalization – When and Why", content: "Sometimes you join data to reduce reads or simplify queries. Discuss when it's appropriate (e.g., reporting, read‑heavy workloads)." },
                  { title: "Indexing Strategy – Clustered vs Non‑clustered", content: "**Clustered** index determines physical order; only one per table. **Non‑clustered** is a separate structure. Choose based on query patterns." },
                ],
              },
              {
                title: "Window Functions and Performance",
                slug: "sql-interview-window",
                shortDescription: "Explain window functions and when to use them.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Window Functions", content: "`ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, and aggregates with `OVER`. Used for running totals, ranking, and comparing rows." },
                  { title: "Performance Considerations", content: "Window functions can be expensive on large datasets; use proper indexes and avoid unnecessary partitions." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(sqlCategory);
  console.log("✅ SQL Fundamentals category seeded (ultra‑detailed)");
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