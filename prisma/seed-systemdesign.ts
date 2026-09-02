import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

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

        const sections = [...(topicSeed.sections ?? []), ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedSystemDesignCategory() {
  const systemDesignCategory: CategorySeed = {
    name: "System Design Fundamentals",
    slug: "system-design-fundamentals",
    description: "Learn how scalable systems are structured, partitioned, and reasoned about in production.",
    icon: "SD",
    sortOrder: 8,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Build the mental model for scalable service design.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Architecture Basics",
            slug: "architecture-basics",
            description: "High-level system thinking and trade-offs.",
            topics: [
              {
                title: "Scalability – Growing Without Breaking",
                slug: "scalability",
                shortDescription: "Design systems that absorb growth without collapsing.",
                estimatedMinutes: 28,
                sections: [
                  { title: "What Scalability Means", content: "Scalability is the ability of a system to handle increasing load (users, requests, data) without degrading performance or failing. It's not just about adding hardware; it's about designing systems that can grow gracefully." },
                  { title: "Vertical vs Horizontal Scaling", content: "**Vertical** (scale up): add more CPU/RAM to a single machine. Simple but has limits (hardware ceiling, cost). **Horizontal** (scale out): add more machines. Requires stateless services and load balancing, but offers near‑unlimited scale." },
                  { title: "Stateless Services – The Key to Horizontal Scaling", content: "A stateless service does not store session data locally between requests. Any instance can handle any request, making it easy to add/remove instances behind a load balancer." },
                  { title: "System Boundaries – Defining the Scope", content: "Understand users, traffic patterns (read‑heavy vs write‑heavy), data volume, and latency requirements. Estimate peak load: `requests/second = (daily active users × requests per user) / (86400 seconds)`." },
                  { title: "Estimating Scale – Back‑of‑the‑Envelope Math", content: "For 10M DAU, with 5 requests/day: 50M requests/day ≈ 580 requests/second. This helps decide if a single server suffices or if distributed architecture is needed." },
                ],
              },
              {
                title: "Load Balancing and Caching – Distributing Work",
                slug: "load-balancing-caching",
                shortDescription: "Distribute work and reduce database load.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Load Balancing – The Traffic Director", content: "A load balancer distributes incoming requests across multiple servers. Algorithms: **Round‑robin** (simple), **Least‑connections** (sends to least busy), **IP hash** (stickiness)." },
                  { title: "Health Checks and Failover", content: "Load balancers perform periodic health checks (HTTP, TCP). If a server fails, traffic is routed away, improving availability." },
                  { title: "Caching Layers – Speeding Up Reads", content: "Caches store frequently accessed data in memory (Redis, Memcached, CDN). They reduce database load and latency. Types: **Client‑side** (browser cache), **CDN** (edge), **Server‑side** (Redis), **Database** (query cache)." },
                  { title: "Cache Invalidation Strategies", content: "**TTL** (time‑based expiry) – simple but may serve stale data. **Write‑through** – writes go to cache and DB synchronously. **Write‑behind** – writes go to cache, asynchronously to DB. **Cache‑aside** – app checks cache, then DB on miss." },
                  { title: "CDNs – Content Delivery Networks", content: "CDNs serve static assets (images, JS, CSS) from edge servers close to users, reducing latency and origin load." },
                ],
              },
              {
                title: "Database Design – Choosing the Right Storage",
                slug: "system-design-database",
                shortDescription: "Choose between relational and NoSQL, and partition data.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Relational vs NoSQL – The Trade‑offs", content: "**Relational** (SQL): ACID transactions, complex joins, schema enforcement. Good for structured data and consistency. **NoSQL**: flexible schema, horizontal scaling, eventual consistency. Good for high‑volume, semi‑structured data." },
                  { title: "CAP Theorem – Consistency, Availability, Partition Tolerance", content: "In a distributed system, you can only have two of: **Consistency** (all nodes see the same data), **Availability** (every request gets a response), and **Partition tolerance** (system continues despite network splits). Since partitions are inevitable, choose between CP (consistency) and AP (availability)." },
                  { title: "Partitioning (Sharding) – Splitting Data", content: "Distribute data across multiple databases based on a shard key (e.g., user ID, geographical region). **Range sharding**: key ranges (simple but hot spots). **Hash sharding**: consistent hashing (distributes evenly)." },
                  { title: "Replication – Redundancy and Scalability", content: "Copy data to multiple nodes. **Leader‑follower** (master‑slave): writes to leader, reads from followers. Improves read scalability and fault tolerance." },
                  { title: "Choosing an Approach – Start Simple", content: "Start with a relational database (PostgreSQL, MySQL) with proper indexing. Only move to NoSQL or sharding when you hit a measured bottleneck." },
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
        description: "Message queues, microservices, eventual consistency, and distributed patterns.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Communication and Coordination",
            slug: "system-design-communication",
            description: "Message queues, pub/sub, and RPC.",
            topics: [
              {
                title: "Message Queues – Asynchronous Decoupling",
                slug: "message-queues",
                shortDescription: "Decouple producers and consumers.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Use Cases – Background Tasks, Buffering, Event‑Driven", content: "Queues enable async processing: order processing, email sending, log aggregation. They buffer bursts of traffic and decouple services." },
                  { title: "Queue Types – RabbitMQ, Kafka, SQS", content: "**RabbitMQ**: flexible routing, supports many protocols. **Kafka**: high‑throughput, durable, replay‑able logs (good for event streaming). **SQS**: managed, simple." },
                  { title: "Dead Letter Queues – Handling Failures", content: "Messages that fail processing (after retries) are sent to a DLQ for later analysis and manual intervention." },
                  { title: "Exactly‑Once vs At‑Least‑Once", content: "**At‑least‑once**: messages may be redelivered; consumers must be idempotent. **Exactly‑once**: guarantees no duplicates (difficult to achieve)." },
                ],
              },
              {
                title: "Microservices – Decentralized Architecture",
                slug: "microservices",
                shortDescription: "Decentralized services, API gateway.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Pros and Cons – Scalability vs Complexity", content: "**Pros**: independent deployment, team autonomy, technology diversity, scaling per service. **Cons**: network latency, distributed transactions, testing, monitoring, operational overhead." },
                  { title: "Service Discovery – Finding Services", content: "**Client‑side**: clients query a registry (e.g., Eureka) to find service instances. **Server‑side**: load balancer routes to services (e.g., Kubernetes)." },
                  { title: "API Gateway – The Front Door", content: "A single entry point that routes requests to appropriate services, handles authentication, rate limiting, and response aggregation." },
                  { title: "Communication Patterns – REST vs gRPC vs Messaging", content: "**REST** – simple, human‑readable. **gRPC** – fast, typed, supports streaming. **Messaging** – asynchronous (Kafka, RabbitMQ)." },
                ],
              },
            ],
          },
          {
            title: "Distributed Data Patterns",
            slug: "distributed-data",
            description: "Caching, sharding, and consistency patterns.",
            topics: [
              {
                title: "Consistent Hashing – Distributed Load Balancing",
                slug: "consistent-hashing",
                shortDescription: "Evenly distribute data across nodes.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is Consistent Hashing?", content: "A technique for distributing data across a set of nodes where adding/removing nodes only requires moving a fraction of the keys. Nodes are placed on a hash ring; keys map to the first node clockwise." },
                  { title: "Virtual Nodes – Load Balancing", content: "To avoid uneven distribution, each physical node is represented by multiple virtual nodes on the ring. This improves load balancing." },
                  { title: "Applications", content: "Distributed caches (Redis Cluster), databases (Cassandra), load balancers." },
                ],
              },
              {
                title: "Distributed Caching – Redis, Memcached",
                slug: "distributed-caching",
                shortDescription: "Cache strategies and invalidation.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Cache‑Aside Pattern", content: "App checks cache; on miss, reads from DB and writes to cache. Simple and widely used." },
                  { title: "Write‑Through and Write‑Behind", content: "**Write‑through**: writes go to cache and DB synchronously. **Write‑behind**: writes to cache, then asynchronously to DB (better performance, but risk of data loss)." },
                  { title: "Cache Eviction Policies – LRU, TTL, LFU", content: "**LRU** (Least Recently Used), **TTL** (time‑to‑live), **LFU** (least frequently used). Choose based on access patterns." },
                ],
              },
              {
                title: "Rate Limiting – Throttling Requests",
                slug: "rate-limiting",
                shortDescription: "Protect services from overload.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Algorithms – Token Bucket, Leaky Bucket, Fixed Window", content: "**Token bucket**: tokens added at fixed rate; each request consumes a token. Allows bursts. **Leaky bucket**: queue with constant outflow; smooths bursts. **Fixed window**: per‑window count (simple but spikes at boundaries)." },
                  { title: "Distributed Rate Limiting", content: "Use Redis with atomic increments (INCR) and expiry (TTL). For multi‑node, use a central store." },
                  { title: "Headers – Retry‑After", content: "When rate limited, return `429 Too Many Requests` with a `Retry‑After` header." },
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
        description: "Distributed consensus, event sourcing, data pipelines, and observability.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Distributed Systems and Consensus",
            slug: "distributed-systems",
            description: "Consensus, replication, and fault tolerance.",
            topics: [
              {
                title: "Consensus Algorithms – Paxos, Raft",
                slug: "consensus",
                shortDescription: "Agreement among nodes.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Why Consensus?", content: "In distributed systems, nodes need to agree on a value (e.g., leader election, log entries)." },
                  { title: "Raft – Understandable Consensus", content: "Raft uses a leader‑based approach: leader election, log replication, and safety. Designed for understandability, used in etcd and Consul." },
                  { title: "Paxos – The Classic", content: "More complex than Raft, but widely studied. Involves proposers, acceptors, learners." },
                ],
              },
              {
                title: "Event Sourcing and CQRS",
                slug: "event-sourcing-cqrs",
                shortDescription: "Store events, query via separate models.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Event Sourcing – State as Events", content: "Instead of storing the current state, store a sequence of events. The state can be reconstructed by replaying events. Provides audit trail and temporal queries." },
                  { title: "CQRS – Separate Read/Write Models", content: "Use different models for commands (writes) and queries (reads). Allows optimisation for each, and works well with event sourcing." },
                  { title: "Benefits and Trade‑offs", content: "Benefits: audit, scalability, flexibility. Trade‑offs: complexity, eventual consistency." },
                ],
              },
              {
                title: "Data Pipelines – Batch vs Streaming",
                slug: "data-pipelines",
                shortDescription: "Processing large data with Kafka, Spark, Flink.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Batch Processing – Spark, Hadoop", content: "Process large datasets in bulk (e.g., nightly jobs). Good for historical analysis and ETL." },
                  { title: "Streaming Processing – Kafka, Flink, Spark Streaming", content: "Process data in real‑time as it arrives. Low latency, but complex state management." },
                  { title: "Lambda Architecture – Batch + Speed", content: "Combine batch and streaming to provide both accurate and real‑time results." },
                  { title: "Kafka – The Event Streaming Platform", content: "Distributed log with partitions, producers, consumers. Used for decoupling services and event‑driven architectures." },
                ],
              },
              {
                title: "Observability – Monitoring, Logging, Tracing",
                slug: "observability",
                shortDescription: "Understand system behavior in production.",
                estimatedMinutes: 26,
                sections: [
                  { title: "The Three Pillars", content: "**Metrics** – numeric time‑series (CPU, latency). **Logs** – structured event records. **Traces** – request flow across services." },
                  { title: "Metrics and Alerting – Prometheus, Grafana", content: "Collect metrics with Prometheus; visualise with Grafana. Define SLIs (Service Level Indicators) and SLOs (Service Level Objectives)." },
                  { title: "Distributed Tracing – Jaeger, Zipkin", content: "Trace a request across services. Each service creates spans; trace ID propagates through headers." },
                  { title: "Logging – ELK, Loki", content: "Centralise logs for search and analysis. Use structured logging (JSON) for easier parsing." },
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
        description: "Common system design interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Design Problems",
            slug: "sd-interview",
            description: "Frequently asked design problems.",
            topics: [
              {
                title: "Design a URL Shortener",
                slug: "sd-url-shortener",
                shortDescription: "Hashing, scaling, caching, and database design.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Requirements", content: "Functional: shorten long URLs, redirect to original. Non‑functional: low latency, high availability, durable, handle millions of URLs." },
                  { title: "API Design", content: "POST /shorten (longUrl) -> shortCode; GET /{shortCode} -> redirect." },
                  { title: "Encoding", content: "Use Base62 (a‑z, A‑Z, 0‑9) to generate short codes. Collision handling: check if code already exists, generate new. Alternatively, use a unique ID generator (Snowflake) and encode." },
                  { title: "Database", content: "Key‑value store: DynamoDB or Redis (with persistence). Shard by shortCode hash. Use a relational DB for analytics." },
                  { title: "Caching", content: "Cache frequent redirects in Redis with TTL." },
                  { title: "Scaling", content: "Load balancers, multiple read replicas, CDN for static assets. Consider a separate service for analytics." },
                ],
              },
              {
                title: "Design a Chat System",
                slug: "sd-chat",
                shortDescription: "Real‑time messaging, presence.",
                estimatedMinutes: 32,
                sections: [
                  { title: "Requirements", content: "Real‑time messaging (1‑1, group), read receipts, online/offline, history." },
                  { title: "High‑Level Design", content: "Client → WebSocket Gateway → Message Service → Storage (Cassandra, Redis)." },
                  { title: "WebSocket Connections", content: "Use a load balancer with session affinity. Handle reconnections gracefully." },
                  { title: "Message Storage", content: "Cassandra for high write throughput. Use a time‑ordered partition (e.g., user_id + timestamp)." },
                  { title: "Presence", content: "Store online status in Redis with TTL. Update on connect/disconnect." },
                  { title: "Scaling", content: "Horizontal scaling of gateways and message services. Use Kafka for message queuing between services." },
                ],
              },
              {
                title: "Design a Rate Limiter",
                slug: "sd-rate-limiter",
                shortDescription: "Throttle requests based on IP/user.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Requirements", content: "Limit requests per user/IP per time window. Return 429 when exceeded." },
                  { title: "Algorithms", content: "Token bucket (allows bursts), Fixed window (simple), Sliding log (accurate)." },
                  { title: "Storage", content: "Use Redis with INCR and TTL. For distributed systems, use a central Redis cluster." },
                  { title: "Data Structure", content: "Key: user_id + window (e.g., `user:123:2024-01-01-10:00`). Value: count." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(systemDesignCategory);
  console.log("✅ System Design Fundamentals category seeded (ultra‑detailed)");
}

async function main() {
  await seedSystemDesignCategory();
}

main()
  .catch((error) => {
    console.error("System Design seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });