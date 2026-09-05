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

function buildUltraExplanation(topic: TopicSeed, module: ModuleSeed, path: PathSeed) {
  const title = topic.title;
  const subject = topic.description;
  const lowerTitle = title.toLowerCase();
  const categoryName = path.name; // not directly available, but we can use module title to infer DB
  let deepDive = `Study ${title} as a practical database skill, not as a memorised command. Start with the problem it solves: ${subject}. The critical questions are: what is the performance impact, what are the consistency guarantees, and when should you avoid this feature?`;

  if (lowerTitle.includes("index")) {
    deepDive += " Indexes are data structures (B‑tree, Hash, GiST, GIN) that speed up reads but slow down writes. They add storage overhead. Choose indexes based on query patterns—use `EXPLAIN` to verify. Covering indexes can eliminate table access. Avoid over‑indexing; each index must be justified.";
  } else if (lowerTitle.includes("query optimization") || lowerTitle.includes("explain")) {
    deepDive += " Query optimization involves understanding the query plan (EXPLAIN ANALYZE). Look for sequential scans, nested loops, and misestimated row counts. Use statistics (ANALYZE), tune work_mem, and consider rewriting queries with joins, subqueries, or CTEs.";
  } else if (lowerTitle.includes("transaction") || lowerTitle.includes("acid")) {
    deepDive += " Transactions ensure ACID properties. Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) affect consistency vs performance. Use explicit BEGIN/COMMIT. Understand MVCC (Multi‑Version Concurrency Control) and how it affects visibility and locks.";
  } else if (lowerTitle.includes("json") || lowerTitle.includes("jsonb")) {
    deepDive += " JSON/JSONB in PostgreSQL allow storing semi‑structured data. JSONB is binary, indexed, and faster for querying. Use `->`, `->>`, `@>`, `?` operators. Combine with GIN indexes for efficient search. Use JSONB for variable schemas or when data is flexible.";
  } else if (lowerTitle.includes("cte") || lowerTitle.includes("window")) {
    deepDive += " CTEs (Common Table Expressions) with `WITH` help structure complex queries. Recursive CTEs for hierarchical data. Window functions (ROW_NUMBER, RANK, LAG, LEAD) perform calculations across rows without grouping, enabling moving averages and ranking.";
  } else if (lowerTitle.includes("lock")) {
    deepDive += " Locking in PostgreSQL: table‑level (ACCESS SHARE, ROW EXCLUSIVE, etc.) and row‑level (SELECT FOR UPDATE). Deadlocks occur when two transactions wait on each other. Use `NOWAIT` or `SKIP LOCKED` to avoid waiting. Keep transactions short to reduce lock contention.";
  } else if (lowerTitle.includes("aggregation") && (lowerTitle.includes("mongodb") || lowerTitle.includes("collection"))) {
    deepDive += " MongoDB's aggregation pipeline is a powerful framework for data processing. Stages: `$match`, `$group`, `$project`, `$sort`, `$lookup` (joins). Optimise by using indexes in early stages. Use `$facet` for multi‑faceted aggregates.";
  } else if (lowerTitle.includes("schema design") && lowerTitle.includes("mongodb")) {
    deepDive += " MongoDB schema design: embed related data (denormalise) for read‑heavy, or reference (normalise) for write‑heavy. Consider the access patterns. Use embedding when the relationship is one‑to‑many and the 'many' side is always accessed together. Otherwise, use references and application‑side joins.";
  } else if (lowerTitle.includes("caching") && lowerTitle.includes("redis")) {
    deepDive += " Redis is an in‑memory data store used for caching. Patterns: cache‑aside, read‑through, write‑through. Use TTL to expire stale data. Consider invalidation strategies. Beware of cache stampedes—use locking or probabilistic early expiration.";
  } else if (lowerTitle.includes("pub/sub") && lowerTitle.includes("redis")) {
    deepDive += " Redis Pub/Sub is a lightweight messaging pattern. Publishers send to channels, subscribers receive. Does not persist messages—use Streams for persistence. Use for real‑time notifications, but consider backpressure and subscriber failures.";
  } else if (lowerTitle.includes("distributed lock") && lowerTitle.includes("redis")) {
    deepDive += " Redis distributed locks (Redlock) are used for mutual exclusion across services. Use `SETNX` with TTL and release with Lua scripts. Understand the trade‑offs: clock drift, network partitions. Redlock aims to be more fault‑tolerant but still controversial.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core concept in one sentence.\n2. Write a simple example query or command.\n3. Experiment with performance using EXPLAIN or monitoring.\n4. Compare with alternative approaches.\n5. Identify common pitfalls and best practices.\n\n### Interview‑ready checklist\n- Explain the concept without relying on memorised syntax.\n- Describe a real‑world scenario where you used it.\n- Mention performance implications and trade‑offs.\n- Show how you would debug or optimise it.\n- Discuss how it fits into the broader database ecosystem.\n\n### Practice task\nCreate a small practical exercise for **${title}** inside the **${module.title}** module of the **${path.name}** path. Write a sample query or code, then modify it to demonstrate an edge case or performance issue. Document your observations.`;
}

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

        const sections = [
          ...(topicSeed.sections ?? []),
          { title: "Ultra Explanation and Interview Guide", content: buildUltraExplanation(topicSeed, moduleSeed, pathSeed) },
        ];
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

async function seedDatabaseCategories() {
  // ---------- PostgreSQL ----------
  const postgresCategory: CategorySeed = {
    name: "PostgreSQL",
    slug: "postgresql",
    description: "Master PostgreSQL from basics to advanced: queries, indexing, transactions, JSON, CTEs, window functions, EXPLAIN, and locking.",
    icon: "POSTGRES",
    sortOrder: 1,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Core PostgreSQL topics for developers and DBAs.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Core PostgreSQL",
            slug: "core",
            description: "Basic and advanced SQL features.",
            topics: [
              {
                title: "PostgreSQL Basics – Data Types, Schemas, and Queries",
                slug: "pg-basics",
                description: "Fundamental database operations.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Data Types", content: "Numeric, text, date/time, boolean, arrays, JSON." },
                  { title: "Schemas", content: "Organise objects logically; search path." },
                  { title: "CRUD Operations", content: "INSERT, SELECT, UPDATE, DELETE with WHERE, JOIN, GROUP BY." },
                ],
              },
              {
                title: "Indexes in PostgreSQL – B‑tree, Hash, GIN, GiST, BRIN",
                slug: "pg-indexes",
                description: "Creating and choosing indexes for performance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Index Types", content: "B‑tree (default), Hash (equality), GIN (full‑text, JSON), GiST (geometric), BRIN (large tables with natural ordering)." },
                  { title: "Index Management", content: "CREATE INDEX, DROP INDEX, REINDEX, and monitoring index usage." },
                  { title: "Partial and Expression Indexes", content: "Index on a subset of rows or on an expression (e.g., LOWER(name))." },
                ],
              },
              {
                title: "Query Optimization and EXPLAIN",
                slug: "pg-explain",
                description: "Understanding and tuning query plans.",
                estimatedMinutes: 24,
                sections: [
                  { title: "EXPLAIN and EXPLAIN ANALYZE", content: "View the query plan and actual execution times." },
                  { title: "Plan Nodes", content: "Seq Scan, Index Scan, Index Only Scan, Bitmap Heap Scan, Nested Loop, Hash Join, Merge Join." },
                  { title: "Statistics and Configuration", content: "ANALYZE, work_mem, effective_cache_size, random_page_cost." },
                ],
              },
              {
                title: "Transactions and Isolation Levels",
                slug: "pg-transactions",
                description: "ACID, MVCC, and concurrency control.",
                estimatedMinutes: 22,
                sections: [
                  { title: "ACID Properties", content: "Atomicity, Consistency, Isolation, Durability." },
                  { title: "Isolation Levels", content: "Read Uncommitted, Read Committed, Repeatable Read, Serializable. Default is Read Committed." },
                  { title: "MVCC", content: "Multi‑version concurrency control eliminates reader‑writer locks." },
                ],
              },
              {
                title: "JSON and JSONB – Document Store in PostgreSQL",
                slug: "pg-json",
                description: "Storing and querying semi‑structured data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JSON vs JSONB", content: "JSON stores raw text; JSONB is parsed and binary, supports indexing." },
                  { title: "Operators", content: "-> (get field), ->> (get as text), @> (contains), ? (key exists)." },
                  { title: "Indexing JSONB", content: "GIN indexes for full document search." },
                ],
              },
              {
                title: "Common Table Expressions (CTE) and Recursive Queries",
                slug: "pg-cte",
                description: "WITH clauses for complex queries.",
                estimatedMinutes: 20,
                sections: [
                  { title: "CTE Basics", content: "Define a temporary result set within a query." },
                  { title: "Recursive CTE", content: "`WITH RECURSIVE` for hierarchical data (e.g., organizational charts)." },
                ],
              },
              {
                title: "Window Functions – Advanced Analytics",
                slug: "pg-window",
                description: "ROW_NUMBER, RANK, LAG, LEAD, and moving aggregates.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Syntax", content: "`OVER (PARTITION BY ... ORDER BY ...)`." },
                  { title: "Common Functions", content: "ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD()." },
                ],
              },
              {
                title: "Locking and Concurrency Control",
                slug: "pg-locks",
                description: "Table‑level and row‑level locks, deadlocks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Lock Types", content: "Access Share, Row Share, Row Exclusive, Exclusive, etc." },
                  { title: "Row‑level Locks", content: "SELECT ... FOR UPDATE, FOR SHARE." },
                  { title: "Deadlocks", content: "Detection and prevention; `NOWAIT` and `SKIP LOCKED`." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // ---------- MySQL ----------
  const mysqlCategory: CategorySeed = {
    name: "MySQL",
    slug: "mysql",
    description: "Master MySQL: fundamentals, indexing, query optimization, transactions, and advanced features like stored procedures and triggers.",
    icon: "MYSQL",
    sortOrder: 2,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Core MySQL topics for developers and DBAs.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Core MySQL",
            slug: "core",
            description: "Essential MySQL features.",
            topics: [
              {
                title: "MySQL Basics – Storage Engines, Data Types, and Queries",
                slug: "mysql-basics",
                description: "InnoDB, MyISAM, CRUD operations.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Storage Engines", content: "InnoDB (default, ACID), MyISAM (read‑heavy), Memory." },
                  { title: "Data Types", content: "INT, VARCHAR, TEXT, DATE, TIMESTAMP." },
                  { title: "Basic DML", content: "INSERT, SELECT, UPDATE, DELETE with JOINs and subqueries." },
                ],
              },
              {
                title: "Indexing in MySQL – B‑tree, Full‑text, Hash",
                slug: "mysql-indexes",
                description: "Creating effective indexes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Index Types", content: "PRIMARY KEY, UNIQUE, INDEX (B‑tree), FULLTEXT, SPATIAL." },
                  { title: "Composite Indexes", content: "Left‑most prefix rule." },
                  { title: "Covering Indexes", content: "Index contains all selected columns." },
                ],
              },
              {
                title: "Query Optimization and EXPLAIN",
                slug: "mysql-explain",
                description: "Understanding the query execution plan.",
                estimatedMinutes: 22,
                sections: [
                  { title: "EXPLAIN Output", content: "type (ALL, index, range, ref, eq_ref, const), possible_keys, key, rows." },
                  { title: "Optimizing Joins", content: "Use indexes on join columns." },
                  { title: "Subqueries vs Joins", content: "Optimize with EXISTS or JOIN." },
                ],
              },
              {
                title: "Transactions and Isolation in InnoDB",
                slug: "mysql-transactions",
                description: "ACID, MVCC, and lock modes.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Transaction Support", content: "InnoDB provides ACID. Use START TRANSACTION, COMMIT, ROLLBACK." },
                  { title: "Isolation Levels", content: "READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ (default), SERIALIZABLE." },
                  { title: "Locking", content: "Row‑level locks, gap locks (RR), next‑key locks." },
                ],
              },
              {
                title: "Stored Procedures, Triggers, and Views",
                slug: "mysql-procedures",
                description: "Server‑side code and automation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Stored Procedures", content: "CREATE PROCEDURE, call, parameter modes (IN, OUT, INOUT)." },
                  { title: "Triggers", content: "BEFORE/AFTER INSERT/UPDATE/DELETE." },
                  { title: "Views", content: "Read‑only or updatable views." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // ---------- MongoDB ----------
  const mongoCategory: CategorySeed = {
    name: "MongoDB",
    slug: "mongodb",
    description: "Master MongoDB: documents, collections, aggregation, indexes, transactions, and schema design.",
    icon: "MONGODB",
    sortOrder: 3,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Core MongoDB topics for developers.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Core MongoDB",
            slug: "core",
            description: "NoSQL document database features.",
            topics: [
              {
                title: "Documents and Collections – Structure and CRUD",
                slug: "mongo-basics",
                description: "BSON, collections, insert/find/update/delete.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Documents", content: "JSON‑like BSON documents; dynamic schema." },
                  { title: "Collections", content: "Group of documents; analogous to tables." },
                  { title: "CRUD", content: "insertOne, insertMany, find, updateOne, updateMany, deleteOne, deleteMany." },
                ],
              },
              {
                title: "Aggregation Pipeline – Querying at Scale",
                slug: "mongo-aggregation",
                description: "Stage‑based data processing.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Core Stages", content: "$match, $project, $group, $sort, $limit, $skip, $unwind, $lookup." },
                  { title: "Group Operators", content: "$sum, $avg, $min, $max, $push, $addToSet." },
                  { title: "Optimization", content: "Use $match early; indexes on filtered fields." },
                ],
              },
              {
                title: "Indexes in MongoDB – Single, Compound, Multikey, Text, Geospatial",
                slug: "mongo-indexes",
                description: "Indexing strategies for query performance.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Index Types", content: "Single field, compound, multikey (arrays), text, geospatial." },
                  { title: "Index Properties", content: "Unique, sparse, TTL." },
                  { title: "Using explain()", content: "Analyze query plans." },
                ],
              },
              {
                title: "Transactions in MongoDB (Multi‑Document ACID)",
                slug: "mongo-transactions",
                description: "ACID guarantees across multiple documents.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Transaction Support", content: "Available in replica sets (4.0+) and sharded clusters (4.2+)." },
                  { title: "Using Transactions", content: "`startSession`, `startTransaction`, `commitTransaction`." },
                  { title: "Limitations", content: "Performance overhead; avoid long‑running transactions." },
                ],
              },
              {
                title: "Schema Design – Embedding vs Referencing",
                slug: "mongo-schema",
                description: "Modeling relationships for performance.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Embedding", content: "Denormalize, good for one‑to‑many and read‑heavy." },
                  { title: "Referencing", content: "Normalize, good for many‑to‑many and write‑heavy." },
                  { title: "Patterns", content: "One‑to‑few, one‑to‑many, many‑to‑many." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // ---------- Redis ----------
  const redisCategory: CategorySeed = {
    name: "Redis",
    slug: "redis",
    description: "Master Redis: caching, data structures, TTL, Pub/Sub, distributed locks, and more.",
    icon: "REDIS",
    sortOrder: 4,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Core Redis topics for developers and architects.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Core Redis",
            slug: "core",
            description: "Essential Redis features.",
            topics: [
              {
                title: "Caching with Redis – Strategies and Eviction",
                slug: "redis-caching",
                description: "Cache‑aside, read‑through, write‑through, and eviction policies.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Cache Patterns", content: "Cache‑aside (lazy loading), read‑through (cache as primary), write‑through (synchronous write)." },
                  { title: "Eviction Policies", content: "LRU, LFU, TTL, random." },
                  { title: "Cache Invalidation", content: "When data changes, invalidate or update cache." },
                ],
              },
              {
                title: "Data Structures – Strings, Hashes, Lists, Sets, Sorted Sets",
                slug: "redis-data-structures",
                description: "Using the right structure for the job.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Strings", content: "Text, integers, binary; operations: SET, GET, INCR, APPEND." },
                  { title: "Hashes", content: "Field‑value pairs; HSET, HGET, HINCRBY." },
                  { title: "Lists", content: "Ordered sequences; LPUSH, RPUSH, LPOP, RPOP, LRANGE." },
                  { title: "Sets", content: "Unordered unique; SADD, SREM, SISMEMBER, SUNION." },
                  { title: "Sorted Sets", content: "With scores; ZADD, ZRANGE, ZRANK, ZREVRANK." },
                ],
              },
              {
                title: "TTL and Expiration – Automatic Cleanup",
                slug: "redis-ttl",
                description: "Setting time‑to‑live for keys.",
                estimatedMinutes: 18,
                sections: [
                  { title: "EXPIRE Command", content: "Set expiry in seconds; PEXPIRE for milliseconds." },
                  { title: "TTL Inspection", content: "TTL, PTTL commands." },
                  { title: "Persistence", content: "Expired keys are removed from memory but can be persisted if RDB/AOF." },
                ],
              },
              {
                title: "Pub/Sub – Messaging Pattern",
                slug: "redis-pubsub",
                description: "Publish‑subscribe for real‑time notifications.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Channels", content: "Publish to channel, subscribers receive." },
                  { title: "Pattern Subscriptions", content: "PSUBSCRIBE for glob patterns." },
                  { title: "Limitations", content: "No message persistence; use Streams for persistent messaging." },
                ],
              },
              {
                title: "Distributed Locks with Redis (Redlock)",
                slug: "redis-locks",
                description: "Mutual exclusion across distributed systems.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Simple Lock", content: "SET key value NX PX ttl." },
                  { title: "Redlock Algorithm", content: "Lock across multiple independent Redis nodes." },
                  { title: "Trade‑offs", content: "Clock drift, network partitions, retries." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Seed all categories
  await ensureCategory(postgresCategory);
  await ensureCategory(mysqlCategory);
  await ensureCategory(mongoCategory);
  await ensureCategory(redisCategory);
  console.log("✅ All database categories seeded (PostgreSQL, MySQL, MongoDB, Redis)");
}

async function main() {
  await seedDatabaseCategories();
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });