// ---- 200+ System Design Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["System Design", "System Design"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["System Design", "What is system design and why is it important?", "system-design-overview", "Define system design and its significance.", "System design is the process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It involves trade-offs between scalability, performance, reliability, security, and cost. It's crucial for building robust, maintainable, and scalable software systems."],
  ["System Design", "What are the key characteristics of a scalable system?", "scalability-characteristics", "List scalability attributes.", "A scalable system handles increasing load gracefully. Key characteristics: horizontal scaling (adding more machines), vertical scaling (more powerful machines), load balancing, statelessness, efficient caching, database partitioning, and asynchronous processing."],
  ["System Design", "What is the difference between scalability and performance?", "scalability-vs-performance", "Compare the two.", "Performance is about speed: how quickly a system responds to a single request. Scalability is about handling growth: how the system performs under increasing load. A system can be fast but not scalable, and vice versa."],
  ["System Design", "What is availability and how is it measured?", "availability", "Explain availability.", "Availability is the percentage of time a system is operational and accessible. Measured as uptime / (uptime + downtime). High availability (HA) is often 99.99% (four nines) or 99.999% (five nines). It is achieved through redundancy, failover, and monitoring."],
  ["System Design", "What is the difference between availability and reliability?", "availability-vs-reliability", "Compare the two.", "Availability is about whether the system is up. Reliability is about whether the system performs correctly (no errors, data corruption). A system can be available but unreliable (returns wrong data)."],
  ["System Design", "What is a single point of failure (SPOF) and how to avoid it?", "spof", "Explain SPOF.", "SPOF is a component whose failure would bring down the entire system. Avoid by introducing redundancy: multiple servers, load balancers, database replicas, and failover mechanisms."],
  ["System Design", "What is the CAP theorem?", "cap-theorem", "Explain CAP theorem.", "CAP theorem states that in a distributed data store, you can have at most two of three guarantees: Consistency (all nodes see the same data), Availability (every request receives a response), and Partition tolerance (system continues despite network partitions). In practice, choose CP or AP."],
  ["System Design", "What is consistency in distributed systems?", "consistency", "Explain consistency models.", "Consistency ensures all nodes see the same data at the same time. Models: strong consistency (linearizability), eventual consistency (data becomes consistent over time), causal consistency, and read-your-writes."],
  ["System Design", "What is the difference between strong and eventual consistency?", "strong-vs-eventual", "Compare consistency models.", "Strong consistency guarantees immediate consistency for all reads after a write. Eventual consistency guarantees that all replicas will become consistent eventually, but reads may see stale data temporarily. Trade-off: availability vs consistency."],
  ["System Design", "What is a load balancer and how does it work?", "load-balancer", "Explain load balancer.", "A load balancer distributes incoming network traffic across multiple servers to prevent any single server from being overloaded. It can operate at layer 4 (transport) or layer 7 (application). Algorithms: round-robin, least connections, IP hash, etc."],
  ["System Design", "What are the types of load balancing algorithms?", "load-balancing-algorithms", "List common algorithms.", "Round-robin, weighted round-robin, least connections, least response time, IP hash, random, and consistent hashing. Each has its use case and trade-offs."],
  ["System Design", "What is a reverse proxy?", "reverse-proxy", "Explain reverse proxy.", "A reverse proxy sits in front of servers and forwards client requests to them. It provides load balancing, SSL termination, caching, and security (hiding backend servers). Examples: Nginx, HAProxy."],
  ["System Design", "What is a CDN and why is it used?", "cdn", "Explain CDN.", "A Content Delivery Network (CDN) is a geographically distributed network of proxy servers that deliver content to users based on their location. It reduces latency, offloads origin servers, and provides DDoS protection."],
  ["System Design", "What is horizontal vs vertical scaling?", "horizontal-vs-vertical", "Compare scaling methods.", "Vertical scaling (scale-up) adds more resources (CPU, RAM) to a single machine. Horizontal scaling (scale-out) adds more machines. Horizontal is more cost-effective and fault-tolerant but introduces complexity."],
  ["System Design", "What is a microservice?", "microservice", "Define microservice.", "Microservices is an architectural style where an application is composed of small, independently deployable services, each responsible for a specific business capability. They communicate via APIs and are decentralized."],
  ["System Design", "What is the difference between monolithic and microservice architecture?", "monolithic-vs-microservices", "Compare architectures.", "Monolithic: single codebase, single deployable unit, simpler but hard to scale and maintain. Microservices: multiple services, independent deployment, better scalability and team autonomy, but increased operational complexity."],
  ["System Design", "What is a database shard?", "sharding", "Explain sharding.", "Sharding is a horizontal partitioning strategy where data is split across multiple database instances (shards) based on a shard key (e.g., user ID). It improves scalability but complicates queries and joins."],
  ["System Design", "What is database replication?", "replication", "Explain replication.", "Replication copies data from one database server (master) to one or more replicas (slaves). It provides high availability, read scalability, and disaster recovery. Types: synchronous (strong consistency) and asynchronous (eventual consistency)."],
  ["System Design", "What is the difference between vertical and horizontal partitioning?", "vertical-vs-horizontal-partitioning", "Compare partitioning methods.", "Vertical partitioning splits tables by columns (e.g., separate profile and payment data). Horizontal partitioning (sharding) splits by rows based on a key. Both aim to reduce dataset size per server."],
  ["System Design", "What is a message queue and why is it used?", "message-queue", "Explain message queues.", "A message queue (e.g., RabbitMQ, Kafka) enables asynchronous communication between services by storing messages until they are consumed. It decouples producers and consumers, improves reliability, and allows load buffering."],

  // ==================== SCALABILITY (15) ====================
  ["System Design", "How do you estimate system capacity?", "capacity-estimation", "Explain capacity planning.", "Estimate traffic (QPS), storage (data growth), bandwidth, and memory. Use metrics: daily active users, average request size, read/write ratio. Calculate required resources and plan for scaling."],
  ["System Design", "What are the different scaling strategies?", "scaling-strategies", "List scaling strategies.", "Scale up (vertical), scale out (horizontal), functional partitioning (split by features), data partitioning (sharding), and caching. Often combine multiple strategies."],
  ["System Design", "What is the difference between stateless and stateful services?", "stateless-vs-stateful", "Compare service types.", "Stateless services do not store client session data; each request is independent. They are easier to scale horizontally. Stateful services store session data (e.g., in-memory) and require sticky sessions or distributed caches."],
  ["System Design", "How do you handle high write throughput?", "high-write-throughput", "Explain handling writes.", "Use write-ahead logs (WAL), batch inserts, asynchronous writes (queue), sharding, and caching (write-back). Use databases optimized for writes (e.g., Cassandra) and avoid locks."],
  ["System Design", "How do you handle high read throughput?", "high-read-throughput", "Explain handling reads.", "Use caching (CDN, Redis, in-memory), read replicas, denormalization, indexing, and content delivery networks. Use queries that limit data (projection, pagination)."],
  ["System Design", "What is the difference between synchronous and asynchronous communication?", "sync-vs-async", "Compare communication patterns.", "Synchronous: caller waits for the response (e.g., HTTP). Asynchronous: caller sends a message and continues without waiting (e.g., message queue, event-driven). Asynchronous improves scalability and resilience."],
  ["System Design", "What is a circuit breaker pattern?", "circuit-breaker", "Explain circuit breaker.", "A circuit breaker prevents cascading failures by stopping calls to a failing service. It has states: closed (normal), open (failing, short-circuits), half-open (testing recovery). Common in microservices (Resilience4j, Hystrix)."],
  ["System Design", "What is the bulkhead pattern?", "bulkhead", "Explain bulkhead.", "The bulkhead pattern isolates different parts of the system (e.g., thread pools, connections) to prevent failure in one part from affecting others. Named after ship compartments."],
  ["System Design", "What is a retry pattern with exponential backoff?", "retry-backoff", "Explain retry with backoff.", "Retry failed operations with increasing delays (e.g., 1s, 2s, 4s). Prevents overwhelming the system and gives time to recover. Jitter adds randomness to avoid thundering herd."],
  ["System Design", "How do you handle traffic spikes?", "traffic-spikes", "Explain handling spikes.", "Use auto-scaling, elastic load balancing, circuit breakers, rate limiting, and caching. Pre-warm caches and scale resources in advance. Use queue-based load leveling."],
  ["System Design", "What is the difference between scale-up and scale-out in databases?", "db-scale-up-vs-out", "Compare database scaling.", "Scale-up: upgrade server hardware (CPU, RAM). Scale-out: add more servers (sharding, replication). Scale-out is more cost-effective and provides higher availability."],
  ["System Design", "What is the \"fallacies of distributed computing\"?", "fallacies", "List the fallacies.", "1. The network is reliable. 2. Latency is zero. 3. Bandwidth is infinite. 4. The network is secure. 5. Topology doesn't change. 6. There is one administrator. 7. Transport cost is zero. 8. The network is homogeneous."],
  ["System Design", "What is the importance of idempotency?", "idempotency", "Explain idempotency.", "Idempotent operations can be safely repeated without changing the result. Important for retries in distributed systems to avoid duplicate processing (e.g., payment). Implement with idempotency keys."],
  ["System Design", "How do you design for failure?", "design-for-failure", "Explain failure design.", "Assume failures happen: network, hardware, software. Design redundancy, failover, graceful degradation, monitoring, and automatic recovery. Use health checks and circuit breakers."],
  ["System Design", "What is the difference between a forward proxy and a reverse proxy?", "forward-vs-reverse-proxy", "Compare proxies.", "Forward proxy: client-facing, used to bypass restrictions or anonymize. Reverse proxy: server-facing, used for load balancing, caching, security. Both sit between clients and servers."],

  // ==================== AVAILABILITY & RELIABILITY (15) ====================
  ["System Design", "How do you achieve high availability?", "high-availability", "Explain HA techniques.", "Use redundancy (multiple instances), load balancers, automatic failover, health checks, and geographic distribution (multi-AZ, multi-region). Implement active-passive or active-active setups."],
  ["System Design", "What is a disaster recovery plan?", "disaster-recovery", "Explain DR.", "Disaster recovery is a set of policies and procedures to recover data and infrastructure after a catastrophic event. Includes backups, replication, and failover to a different region. Measured by RTO (Recovery Time Objective) and RPO (Recovery Point Objective)."],
  ["System Design", "What is RTO and RPO?", "rto-rpo", "Explain RTO and RPO.", "RTO (Recovery Time Objective): maximum acceptable downtime after a disaster. RPO (Recovery Point Objective): maximum acceptable data loss (time since last backup). Both guide backup frequency and failover planning."],
  ["System Design", "What is a health check and how is it used?", "health-check", "Explain health checks.", "Health checks are probes that determine if a service is healthy (e.g., respond to /health). They are used by load balancers to route traffic only to healthy instances and by orchestrators to restart failing containers."],
  ["System Design", "What is failover and how does it work?", "failover", "Explain failover.", "Failover is the process of switching to a standby system when the primary fails. Can be manual or automatic. Types: active-passive (standby idle), active-active (both handle traffic)."],
  ["System Design", "What is the difference between active-passive and active-active?", "active-passive-vs-active-active", "Compare failover modes.", "Active-passive: one active node, one or more passive nodes that take over on failure. Active-active: all nodes are active and share traffic; if one fails, traffic is redistributed."],
  ["System Design", "What is a leader-follower replication pattern?", "leader-follower", "Explain replication pattern.", "Leader-follower: one node (leader) handles writes; followers replicate data and handle reads. If leader fails, a follower is elected new leader. Common in databases (PostgreSQL, MySQL)."],
  ["System Design", "What is the difference between synchronous and asynchronous replication?", "sync-vs-async-replication", "Compare replication modes.", "Synchronous: write is confirmed only after all replicas have written (strong consistency, but slower). Asynchronous: write is confirmed after leader writes; replicas get data later (faster, but risk data loss)."],
  ["System Design", "What is a split-brain scenario?", "split-brain", "Explain split-brain.", "Split-brain occurs when two nodes each believe they are the leader, causing data divergence. Prevented by using majority quorum, fencing, or consensus algorithms (Raft, Paxos)."],
  ["System Design", "What is a quorum?", "quorum", "Explain quorum.", "Quorum is the minimum number of nodes required to agree on an operation in a distributed system. Used in consensus algorithms to ensure consistency and avoid split-brain. Usually more than half of nodes."],
  ["System Design", "What is consensus in distributed systems?", "consensus", "Explain consensus.", "Consensus is the process of reaching agreement among multiple nodes on a value. Algorithms: Paxos, Raft, Zab. Used for leader election, distributed coordination (e.g., etcd, ZooKeeper)."],
  ["System Design", "What is a service-level agreement (SLA)?", "sla", "Explain SLA.", "SLA is a contract that defines the expected service quality (e.g., 99.9% availability, latency < 200ms). It includes metrics, penalties, and responsibilities. Guides system design."],
  ["System Design", "What is a service-level objective (SLO)?", "slo", "Explain SLO.", "SLO is a specific target within an SLA (e.g., 99.9% uptime). It defines measurable goals for system reliability and performance."],
  ["System Design", "What is a service-level indicator (SLI)?", "sli", "Explain SLI.", "SLI is a metric that measures the performance of a service (e.g., request latency, error rate). Used to monitor SLO compliance."],
  ["System Design", "How do you monitor system health?", "monitoring", "Explain monitoring.", "Use metrics (CPU, memory, latency, error rates), logging, and distributed tracing. Set up alerts for anomalies. Use tools like Prometheus, Grafana, ELK, Datadog."],

  // ==================== CACHING (10) ====================
  ["System Design", "What is caching and why is it important?", "caching-overview", "Explain caching.", "Caching stores frequently accessed data in a fast storage layer (e.g., Redis, Memcached) to reduce latency and database load. It improves read performance and reduces costs."],
  ["System Design", "What are the different caching strategies?", "caching-strategies", "List caching strategies.", "Cache-aside (lazy loading), Read-through, Write-through, Write-behind (write-back), and Refresh-ahead. Each has trade-offs in consistency and performance."],
  ["System Design", "What is cache-aside (lazy loading)?", "cache-aside", "Explain cache-aside.", "Cache-aside: application checks cache first; if miss, reads from database and writes to cache. The cache is not involved in writes (application updates database and invalidates/updates cache). Simple but may have stale data."],
  ["System Design", "What is write-through caching?", "write-through", "Explain write-through.", "Write-through: every write to database also writes to cache. Ensures cache is always up-to-date but adds latency to writes."],
  ["System Design", "What is write-back (write-behind) caching?", "write-back", "Explain write-back.", "Write-back: writes are first written to cache and later persisted to database asynchronously. Improves write performance but risks data loss if cache fails."],
  ["System Design", "What is cache invalidation and why is it difficult?", "cache-invalidation", "Explain invalidation.", "Cache invalidation is the process of removing or updating stale cache entries. It's difficult because it requires knowing when data changes and coordinating multiple caches. Common patterns: TTL, invalidation on write, and versioning."],
  ["System Design", "What is a cache stampede (thundering herd) problem?", "cache-stampede", "Explain stampede.", "When many clients simultaneously request a cache key that expires, they all hit the database, causing a load spike. Prevent using 'recompute with locking', 'stale-while-revalidate', or extend TTL."],
  ["System Design", "What is the difference between CDN and reverse proxy caching?", "cdn-vs-reverse-proxy-cache", "Compare caching layers.", "CDN caches static assets globally near users. Reverse proxy (like Varnish) caches dynamic responses at the edge of the application, reducing origin server load."],
  ["System Design", "What is distributed caching and when is it used?", "distributed-caching", "Explain distributed cache.", "Distributed caching (e.g., Redis Cluster) provides a shared cache across multiple servers. Used when cache data is too large for a single instance or when high availability is needed."],
  ["System Design", "How do you choose a cache replacement policy?", "cache-replacement", "Explain replacement policies.", "Common policies: LRU (least recently used), LFU (least frequently used), TTL (time-based). Choose based on access patterns and data size. Redis uses LRU by default."],

  // ==================== DATABASES (15) ====================
  ["System Design", "What is the difference between SQL and NoSQL databases?", "sql-vs-nosql", "Compare database types.", "SQL: relational, schema-defined, ACID, good for complex queries. NoSQL: non-relational, flexible schema, scales horizontally, eventual consistency. Use SQL for structured data, NoSQL for unstructured/high scale."],
  ["System Design", "What are the types of NoSQL databases?", "nosql-types", "List NoSQL types.", "Document stores (MongoDB), Key-value stores (Redis, DynamoDB), Column-family stores (Cassandra, HBase), Graph databases (Neo4j). Choose based on data model."],
  ["System Design", "What is database indexing and why is it important?", "database-indexing", "Explain indexing.", "Indexes speed up data retrieval at the cost of slower writes and storage. Use B-tree, hash, or bitmap indexes. Choose index based on query patterns."],
  ["System Design", "What is denormalization in databases?", "denormalization", "Explain denormalization.", "Denormalization adds redundant data to avoid joins, improving read performance. Used in analytics, reporting, and NoSQL. Increases storage and update complexity."],
  ["System Design", "What is a database connection pool?", "connection-pool", "Explain connection pool.", "A connection pool maintains a set of open database connections that can be reused by multiple clients. Reduces connection overhead and improves performance."],
  ["System Design", "What is a data warehouse?", "data-warehouse", "Explain data warehouse.", "A data warehouse is a centralized repository for historical data from multiple sources, used for reporting and analytics. Typically uses star/snowflake schema and ETL processes."],
  ["System Design", "What is the difference between OLTP and OLAP?", "oltp-vs-olap", "Compare workload types.", "OLTP (Online Transaction Processing): high volume of short transactions (e.g., order entry). OLAP (Online Analytical Processing): complex queries for analysis (e.g., BI reports). OLTP uses normalized schemas; OLAP uses denormalized."],
  ["System Design", "What is a database view and why use it?", "database-view", "Explain views.", "A view is a virtual table based on the result of a query. Used for security (limit access), simplifying complex queries, and providing abstraction."],
  ["System Design", "What is a stored procedure?", "stored-procedure", "Explain stored procedures.", "Stored procedures are precompiled SQL code stored in the database. They reduce network traffic, enforce business logic, but are harder to maintain and can reduce portability."],
  ["System Design", "What is the difference between JOIN and subquery?", "join-vs-subquery", "Compare query methods.", "JOIN combines rows from multiple tables based on a condition. Subquery is a query nested inside another. JOINS are generally more efficient for large datasets."],
  ["System Design", "What is database partitioning?", "database-partitioning", "Explain partitioning.", "Partitioning splits a table into smaller segments (partitions) by range, list, or hash. Improves query performance and maintenance (e.g., drop old partition)."],
  ["System Design", "What is the difference between sharding and partitioning?", "sharding-vs-partitioning", "Compare the two.", "Partitioning is within a single database instance. Sharding distributes partitions across multiple servers (horizontal scaling). Sharding is a form of distributed partitioning."],
  ["System Design", "What is a data lake?", "data-lake", "Explain data lake.", "A data lake stores vast amounts of raw data in its native format (structured, semi-structured). Used for big data analytics and machine learning. Unlike data warehouses, data is not processed before storage."],
  ["System Design", "What is the difference between a data lake and a data warehouse?", "lake-vs-warehouse", "Compare the two.", "Data lake: raw, unprocessed data, schema-on-read. Data warehouse: processed, structured data, schema-on-write. Lake is cheaper; warehouse is faster for queries."],
  ["System Design", "How do you choose a database for a given use case?", "choose-database", "Explain selection criteria.", "Consider: data model (structured/relational vs document/graph), consistency requirements, scaling needs (vertical/horizontal), read/write ratio, query complexity, and team expertise."],

  // ==================== MESSAGING & STREAMING (10) ====================
  ["System Design", "What is a message broker and what are its benefits?", "message-broker", "Explain message broker.", "A message broker (RabbitMQ, Kafka) is a software that enables communication between services via messages. Benefits: decoupling, reliability (persistence), load buffering, and asynchronous processing."],
  ["System Design", "What is the difference between a queue and a topic?", "queue-vs-topic", "Compare messaging patterns.", "A queue (point-to-point) sends each message to one consumer. A topic (publish-subscribe) broadcasts messages to all subscribers. Queues are for work distribution; topics for event notifications."],
  ["System Design", "What is Apache Kafka and how does it work?", "kafka", "Explain Kafka.", "Kafka is a distributed streaming platform. It stores streams of records in topics, partitioned across brokers. Producers write to partitions; consumers read from partitions. It offers high throughput, durability, and replayability."],
  ["System Design", "What is the difference between Kafka and RabbitMQ?", "kafka-vs-rabbitmq", "Compare messaging systems.", "Kafka: high throughput, persistent, ordered logs, ideal for event streaming. RabbitMQ: low latency, flexible routing, good for task queues. Kafka for data pipelines; RabbitMQ for RPC-style messaging."],
  ["System Design", "What is a dead-letter queue?", "dead-letter-queue", "Explain DLQ.", "A dead-letter queue is a queue for messages that cannot be processed (e.g., after repeated failures). It allows debugging and manual reprocessing."],
  ["System Design", "What is exactly-once delivery?", "exactly-once", "Explain exactly-once.", "Exactly-once delivery guarantees that a message is processed exactly once, avoiding duplicates. Achieved by idempotent consumers and transactional messaging (e.g., Kafka with idempotent producer)."],
  ["System Design", "What is the difference between at-least-once and at-most-once?", "at-least-vs-at-most", "Compare delivery semantics.", "At-least-once: message may be delivered more than once; requires idempotent processing. At-most-once: message may be lost; no retries. Exactly-once is the most reliable but hardest."],
  ["System Design", "What is event sourcing?", "event-sourcing", "Explain event sourcing.", "Event sourcing stores the state as a sequence of events (changes). The current state is derived by replaying events. Advantages: auditability, ability to reconstruct historical states. Often combined with CQRS."],
  ["System Design", "What is CQRS?", "cqrs", "Explain CQRS.", "CQRS (Command Query Responsibility Segregation) separates read and write models. Writes are commands (update state), reads are queries (get state). Allows optimization of each side separately and eventual consistency."],
  ["System Design", "What is the difference between event sourcing and CQRS?", "event-sourcing-vs-cqrs", "Compare patterns.", "Event sourcing is a persistence pattern (store events). CQRS is a pattern for separating read and write logic. They are often used together but can be used independently."],

  // ==================== MICROSERVICES (10) ====================
  ["System Design", "What are the benefits and challenges of microservices?", "microservices-pros-cons", "List benefits and challenges.", "Benefits: independent scaling, polyglot technology, team autonomy, faster deployment. Challenges: network latency, distributed transactions, service discovery, monitoring, and debugging."],
  ["System Design", "What is service discovery in microservices?", "service-discovery", "Explain service discovery.", "Service discovery allows services to find each other dynamically. Client-side (e.g., Netflix Ribbon) or server-side (e.g., AWS ALB). Tools: Eureka, Consul, Kubernetes Services."],
  ["System Design", "What is an API Gateway?", "api-gateway", "Explain API Gateway.", "An API Gateway is a single entry point for clients, routing requests to appropriate microservices. It handles authentication, rate limiting, logging, and caching. Examples: Kong, AWS API Gateway, Spring Cloud Gateway."],
  ["System Design", "What is the difference between API Gateway and Load Balancer?", "gateway-vs-loadbalancer", "Compare the two.", "Load balancer distributes traffic among instances of the same service. API Gateway is a higher-level entry point that routes to different services and applies cross-cutting concerns."],
  ["System Design", "What is a service mesh?", "service-mesh", "Explain service mesh.", "A service mesh (e.g., Istio, Linkerd) is a dedicated infrastructure layer for handling service-to-service communication. It provides observability, security, and traffic management without changing application code."],
  ["System Design", "What is the difference between service mesh and API Gateway?", "mesh-vs-gateway", "Compare patterns.", "API Gateway is an external entry point for clients; service mesh handles internal service communication. Both can handle security and traffic control, but service mesh is more fine-grained."],
  ["System Design", "What is distributed tracing in microservices?", "distributed-tracing", "Explain tracing.", "Distributed tracing tracks a request across multiple services by propagating a trace ID. It helps identify bottlenecks and errors. Tools: Jaeger, Zipkin."],
  ["System Design", "What is the difference between logging and tracing?", "logging-vs-tracing", "Compare observability tools.", "Logging records discrete events; tracing tracks the flow of a request across systems. Both are essential for debugging and monitoring."],
  ["System Design", "What is a container and how does it help with microservices?", "containers", "Explain containers.", "Containers (Docker) package an application and its dependencies, ensuring consistency across environments. They are lightweight and enable easy scaling and deployment."],
  ["System Design", "What is orchestration in microservices?", "orchestration", "Explain orchestration.", "Orchestration is managing containers (deployment, scaling, networking). Kubernetes is the de facto orchestrator. It automates container lifecycle and provides service discovery."],

  // ==================== DESIGN SCENARIOS (30) ====================
  ["System Design", "How would you design a URL shortener (like bit.ly)?", "design-url-shortener", "Explain URL shortener design.", "Use a service to generate a unique short code for each URL. Store mapping in a database with an index on short code. Use base62 encoding for IDs. Handle collisions with retry or pre-assigned IDs. Use caching for hot URLs and CDN for redirection."],
  ["System Design", "How would you design a chat system (like WhatsApp)?", "design-chat-system", "Explain chat system design.", "Use WebSockets for real-time messaging. Store messages in a database (NoSQL for scalability). Use message queues for offline messages. Implement push notifications. Use sharding by user ID for scalability. Support file sharing via CDN."],
  ["System Design", "How would you design a social media feed (like Twitter)?", "design-social-feed", "Explain feed design.", "Use a combination of push (fan-out) and pull models. Pre-generate feeds for active users. Store posts in a time-ordered list (Redis Sorted Sets). Use cache for top stories. Use event-driven architecture for updates."],
  ["System Design", "How would you design a ride-sharing app (like Uber)?", "design-ride-sharing", "Explain ride-sharing design.", "Use geospatial indexes (PostGIS) for location-based queries. Maintain driver availability status. Use a matching service (priority queues). Use WebSockets for real-time updates. Handle surge pricing with dynamic pricing algorithms."],
  ["System Design", "How would you design a video streaming platform (like Netflix)?", "design-video-streaming", "Explain video streaming design.", "Store videos in cloud storage (S3). Use CDN for delivery. Transcode videos to multiple bitrates. Use adaptive bitrate streaming (HLS). Use recommendation systems based on user history. Handle DRM and content licensing."],
  ["System Design", "How would you design an e-commerce website (like Amazon)?", "design-ecommerce", "Explain e-commerce design.", "Use microservices for product catalog, order, payment, inventory, and user services. Use caching for product details. Use distributed transactions (Saga pattern) for orders. Use a search engine (Elasticsearch). Use load balancers and CDN."],
  ["System Design", "How would you design a notification system?", "design-notification-system", "Explain notification system.", "Support multiple channels (email, SMS, push). Use a message queue to decouple producers from senders. Use templates for messages. Implement rate limiting and retry logic. Store notification logs for auditing."],
  ["System Design", "How would you design a file storage service (like Dropbox)?", "design-file-storage", "Explain file storage design.", "Store files in object storage (S3). Maintain metadata in a database (PostgreSQL). Use deduplication to save space. Support chunking for large files. Use CDN for downloads. Implement sync clients with delta sync."],
  ["System Design", "How would you design a search engine (like Google)?", "design-search-engine", "Explain search engine design.", "Use a web crawler to gather pages. Index documents using inverted index. Use a query processing engine (parsing, ranking). Use caching for popular queries. Support spell correction and synonyms. Use distributed indexing (Sharding)."],
  ["System Design", "How would you design a distributed cache (like Redis Cluster)?", "design-distributed-cache", "Explain distributed cache design.", "Use consistent hashing for partitioning. Support replication for fault tolerance. Use a gossip protocol for cluster management. Implement eviction policies (LRU). Use a client-side library for routing."],
  ["System Design", "How would you design a distributed file system (like HDFS)?", "design-hdfs", "Explain HDFS design.", "Use a master node (NameNode) for metadata. Data nodes store blocks. Replicate blocks for fault tolerance. Support large file streaming. Use a heartbeat mechanism for health monitoring."],
  ["System Design", "How would you design a key-value store (like DynamoDB)?", "design-key-value-store", "Explain key-value store design.", "Use consistent hashing for sharding. Use replication with quorum for consistency (tunable). Use vector clocks for conflict resolution. Implement failure detection via gossip. Support range queries with sorted keys."],
  ["System Design", "How would you design a distributed lock?", "design-distributed-lock", "Explain distributed lock design.", "Use Redis `SET NX EX` for simple locks. For robustness, use Redlock (multiple Redis instances). Use fencing tokens to prevent locks from persisting. Implement lease expiration and renewal."],
  ["System Design", "How would you design a payment system?", "design-payment-system", "Explain payment system design.", "Use idempotency keys to prevent double charges. Integrate with payment gateways (Stripe, PayPal). Use a state machine for order status. Store transactions in a transactional database. Implement webhooks for async callbacks."],
  ["System Design", "How would you design a stock trading system?", "design-stock-trading", "Explain stock trading system.", "Require low latency: use in-memory data structures (Redis). Use order books (priority queues). Use a message queue for order matching. Use a separate service for reporting. Ensure ACID transactions for order updates."],
  ["System Design", "How would you design a job scheduling system?", "design-job-scheduler", "Explain job scheduling.", "Use a database to store job definitions and schedules. Use a cron-like parser. Use a worker pool to execute jobs. Support retries and dead-letter handling. Use locking to avoid duplicate execution."],
  ["System Design", "How would you design a logging system (like ELK)?", "design-logging", "Explain logging system design.", "Use log shippers (Filebeat) to collect logs. Send to a message queue (Kafka). Process with logstash (transform, enrich). Store in Elasticsearch. Visualize with Kibana. Ensure scalability and high availability."],
  ["System Design", "How would you design a recommendation system?", "design-recommendation", "Explain recommendation engine.", "Use collaborative filtering (user-item) and content-based filtering. Use offline batch processing (Spark) to generate recommendations. Use a caching layer (Redis) for real-time serving. Use A/B testing for evaluation."],
  ["System Design", "How would you design a spam detection system?", "design-spam-detection", "Explain spam detection.", "Use machine learning (Naive Bayes, SVM) with features (content, metadata, frequency). Use a rules engine for quick filtering. Maintain a feedback loop for retraining. Use a message queue for async processing."],
  ["System Design", "How would you design a real-time analytics dashboard?", "design-real-time-dashboard", "Explain analytics dashboard.", "Use a stream processor (Kafka Streams, Flink) to aggregate data (counts, averages). Store in a time-series database (InfluxDB). Use WebSockets to push updates to the frontend. Use caching for aggregated results."],
  ["System Design", "How would you design a content delivery network (CDN)?", "design-cdn", "Explain CDN design.", "Use a global network of edge servers. Cache static content. Use DNS-based routing to the nearest edge. Use a pull or push model for content distribution. Invalidate cache efficiently (purge)."],
  ["System Design", "How would you design a load testing system?", "design-load-testing", "Explain load testing system.", "Use distributed agents to simulate users. Use a master to orchestrate tests. Collect metrics (latency, throughput). Support different scenarios (spike, stress). Use cloud resources for scalability."],
  ["System Design", "How would you design a geospatial indexing system?", "design-geospatial-index", "Explain geospatial indexing.", "Use a geohash or Quadtree to partition space. Store data in a distributed database with range queries. Use a spatial index (R-tree) for efficient nearest neighbor search. Support proximity queries."],
  ["System Design", "How would you design a rate limiter?", "design-rate-limiter", "Explain rate limiter design.", "Use token bucket or leaky bucket algorithm. Store counters in Redis with TTL. Use a distributed cache for cross-node coordination. Support per-user or per-IP limits. Return HTTP 429 when exceeded."],
  ["System Design", "How would you design a session management system?", "design-session-management", "Explain session management.", "Store session data in a distributed cache (Redis) or database. Use a session ID in cookies. Implement session expiry and renewal. Use sticky sessions or session replication for failover."],
  ["System Design", "How would you design a multi-tenant system?", "design-multi-tenant", "Explain multi-tenant design.", "Use a shared database with a tenant_id column (isolation via query filtering). Or use separate databases per tenant (stronger isolation). Use row-level security. Implement custom authentication per tenant."],
  ["System Design", "How would you design a data pipeline for ETL?", "design-etl-pipeline", "Explain ETL pipeline.", "Extract from sources (databases, APIs) using connectors. Transform using a processing framework (Spark, Apache Beam). Load into a data warehouse or data lake. Use orchestration (Airflow). Implement monitoring and error handling."],
  ["System Design", "How would you design a service for generating unique IDs?", "design-id-generation", "Explain unique ID generation.", "Use a centralized ID generator (Snowflake). Use a 64-bit ID with timestamp, datacenter ID, worker ID, and sequence. For high throughput, use a database with auto-increment, or use UUIDs (but they are not ordered)."],
  ["System Design", "How would you design a distributed configuration management system?", "design-config-management", "Explain config management.", "Use a key-value store (etcd, ZooKeeper). Store configuration as hierarchical keys. Use watch mechanisms to notify clients of changes. Use versioning and rollback. Implement security (ACLs)."],
  ["System Design", "How would you design a system for dynamic feature flags?", "design-feature-flags", "Explain feature flags.", "Store feature flags in a config service (Redis). Use a client SDK to evaluate flags. Support different targeting (percentage rollout). Use caching to reduce load. Provide an admin UI for management."],
  ["System Design", "How would you design a social graph (friends/ followers)?", "design-social-graph", "Explain social graph design.", "Use a graph database (Neo4j) or a relational database with adjacency lists. For large-scale, use distributed graph stores (JanusGraph). Support queries like friends-of-friends. Cache popular queries."],
  ["System Design", "How would you design a real-time bidding system (ads)?", "design-ad-bidding", "Explain ad bidding system.", "Requires low latency (milliseconds). Use in-memory caches for user profiles and ad inventory. Use a decision engine (machine learning). Use a message queue for event logging. Implement fraud detection."],
  ["System Design", "How would you design a video conferencing system (like Zoom)?", "design-video-conferencing", "Explain video conferencing design.", "Use WebRTC for peer-to-peer media. Use a media server for multiparty calls (SFU). Use signaling (WebSocket) for session management. Use selective forwarding to optimize bandwidth. Support recording and transcription."],
  ["System Design", "How would you design a collaborative document editing system (like Google Docs)?", "design-collaborative-editing", "Explain collaborative editing.", "Use Operational Transformation (OT) or CRDTs to resolve conflicts. Store document changes as deltas. Use a real-time sync mechanism (WebSockets). Use a persistent store for revisions. Support cursor presence."],
  ["System Design", "How would you design a time-series database (like InfluxDB)?", "design-time-series-db", "Explain time-series database design.", "Store data points as (timestamp, value, tags). Use a columnar storage format for compression. Partition by time (e.g., daily). Index tags for quick filtering. Support downsampling and retention policies."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain system design concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing system design patterns without explaining the trade‑offs.",
  "Ignoring security, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "system-design" },
    update: { name: "System Design", group: "Technology", description: "System Design interview questions." },
    create: { name: "System Design", slug: "system-design", group: "Technology", description: "System Design interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "system-design" } },
    update: {},
    create: { name: "System Design", slug: "system-design", categoryId: category.id },
  });

  for (let topicIndex = 0; topicIndex < topics.length; topicIndex += 1) {
    const [, question, slug, shortDescription, sampleAnswer] = topics[topicIndex];
    const commonMistakes = buildCommonMistakes(question);
    const followUpQuestions = [
      topics[(topicIndex + 1) % topics.length][1],
      topics[(topicIndex + 2) % topics.length][1],
      topics[(topicIndex + 3) % topics.length][1],
    ];
    await prisma.interviewQuestion.upsert({
      where: { slug },
      update: {
        question,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["System Design"],
        isPublished: true,
      },
      create: {
        question,
        slug,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription,
        explanation: buildWhyInterviewersAsk(question, shortDescription),
        sampleAnswer,
        detailedAnswer: sampleAnswer,
        keyPoints: [],
        commonMistakes,
        followUpQuestions,
        tags: ["System Design"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} System Design questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");