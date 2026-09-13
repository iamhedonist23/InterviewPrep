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
};

const categorySeed: CategorySeed = {
  name: "System Design",
  slug: "system-design",
  description: "A detailed learning path covering system-design foundations, scalability, infrastructure, data, communication, asynchronous processing, real-time systems, reliability, security, media architecture, and complete design examples.",
  icon: "🏗️",
  sortOrder: 1,
};

const paths: PathSeed[] = [
  {
    name: "System Design Learning Path",
    slug: "system-design-learning-path",
    description: "A structured, learning-only system design path from foundational principles through scalable infrastructure, data architecture, reliability, real-time communication, media systems, and applied designs.",
    level: StudyLevel.BEGINNER,
    modules: [
      {
        title: "System Design Foundations",
        slug: "system-design-foundations",
        description: "Core principles: system design, modularization, abstraction, layering, scalability, performance, security, and resilience.",
        topics: [
          {
            title: "What System Design Means",
            slug: "what-system-design-means",
            description: "Understand system design as the disciplined process of turning product requirements into a reliable, scalable architecture.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "System design connects user behavior, workload, data, infrastructure, and operational constraints. Begin with what the system must accomplish, then identify quality targets such as latency, availability, durability, security, and growth. A useful design is not the one with the most components; it is the smallest architecture that can satisfy the stated requirements while leaving a practical path for growth. Think in flows: a request enters through an edge layer, reaches application logic, accesses data or cache, and may trigger asynchronous work.\n\nDeeper reasoning:\nA useful way to reason about a design is to trace one representative request from the client to the final state change, then identify every dependency on that path. Repeat the exercise for background work and failure recovery. This exposes unnecessary hops and makes the architecture explainable.",
              },
              {
                title: "Worked example",
                content: "Design a course platform where users read lessons, submit quizzes, and receive progress updates. The synchronous request can authenticate the learner, read the lesson, and record a quiz result. Thumbnail generation, analytics events, recommendation updates, and email notifications can happen later. This separation keeps the page responsive without losing secondary work.",
              },
              {
                title: "Practical application",
                content: "Start every design by writing functional requirements and measurable non-functional targets. Estimate traffic and data size before selecting infrastructure. For each major component, identify its dependency, bottleneck, failure behavior, and scaling strategy. This requirement-first approach prevents unnecessary technology choices.",
              },
            ],
          },
          {
            title: "Modularization",
            slug: "modularization",
            description: "Learn how to divide a large application into components with coherent responsibilities and controlled dependencies.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Modularization groups related behavior behind clear boundaries. A module should own a meaningful business capability rather than merely a few classes. Good boundaries reduce the amount of knowledge one component needs about another. They also make scaling more selective: a search workload can grow independently of order processing. However, every boundary adds communication, deployment, monitoring, and failure overhead, so fragmentation is not automatically an improvement.\n\nDeeper reasoning:\nBoundaries should follow ownership and change. If two components always need the same transaction and constantly call each other, separating them may create distributed complexity without real independence. A strong boundary reduces both conceptual coupling and operational coupling.",
              },
              {
                title: "Worked example",
                content: "Consider an online learning product with Identity, Course, Enrollment, Payment, Search, and Notification modules. The Enrollment module can expose an operation such as enroll(userId, courseId) without exposing its database tables. If Search later moves to a specialized index, the rest of the application continues using the same search contract.",
              },
              {
                title: "Practical application",
                content: "Choose boundaries around ownership and change patterns. Keep interfaces explicit, avoid shared mutable internals, and define who owns each piece of data. Measure the cost of remote calls before splitting a tightly coupled workflow into many networked services.",
              },
            ],
          },
          {
            title: "Abstraction",
            slug: "abstraction",
            description: "Understand how stable interfaces hide implementation details and reduce coupling.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Abstraction exposes what a component promises rather than how it performs the work. A client should depend on a stable contract such as createOrder or getUserProfile, while storage engines, caches, retries, and internal workers remain behind that contract. This lets implementations evolve without forcing every caller to change. Good abstraction also reduces cognitive load because each component can reason about a smaller surface area.\n\nDeeper reasoning:\nAn abstraction is valuable only when its contract captures the behavior callers actually depend on. If callers must understand storage quirks, retry rules, or provider-specific errors to use the abstraction correctly, the boundary is leaking implementation details.",
              },
              {
                title: "Worked example",
                content: "A document service can expose storeDocument(ownerId, content). Internally it may place large content in object storage, store metadata in a database, calculate a checksum, and emit a processing event. A caller only needs the result and the contract; it does not need to coordinate those internal steps.",
              },
              {
                title: "Practical application",
                content: "Keep abstractions honest. Do not hide important semantics such as eventual consistency, retry behavior, or partial failure. A small interface with clear guarantees is more useful than a generic interface that conceals too many special cases.",
              },
            ],
          },
          {
            title: "Layering",
            slug: "layering",
            description: "Learn how presentation, application, business, data-access, and storage responsibilities can be separated.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Layering separates concerns by responsibility. A presentation layer handles interaction, an application layer coordinates use cases, business logic enforces domain rules, a data-access layer translates persistence operations, and storage provides durable state. The exact number of layers can vary, but the principle is to prevent unrelated concerns from leaking into one another. This improves testing because each layer can be exercised with controlled dependencies.\n\nDeeper reasoning:\nLayering is especially useful when responsibilities have different reasons to change. User-interface changes should not require database changes, and storage changes should not rewrite domain rules. The layers should communicate through explicit contracts rather than shared assumptions.",
              },
              {
                title: "Worked example",
                content: "For a learning portal, a browser calls an API endpoint. The application layer validates the command and invokes EnrollmentService. That service applies enrollment rules and uses EnrollmentRepository to persist the result. The repository hides SQL details from the business logic, allowing the storage implementation to change without rewriting the enrollment rules.",
              },
              {
                title: "Practical application",
                content: "Avoid both extremes: direct database access from every layer and excessive layers that add no value. Keep dependency direction deliberate, define DTOs or contracts at boundaries, and test business rules without requiring a live database when possible.",
              },
            ],
          },
          {
            title: "Scalability",
            slug: "scalability",
            description: "Understand horizontal and vertical scaling and the state-management issues that appear when adding nodes.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Vertical scaling increases the resources of one machine, while horizontal scaling adds more machines or instances. Horizontal scaling is attractive when requests can be distributed and application nodes can operate independently. Stateful sessions make this harder because a request sent to a different node may not see local state. Shared state stores, signed tokens, or carefully controlled affinity can solve different versions of that problem.\n\nDeeper reasoning:\nScaling is ultimately about removing a limiting resource. If CPU is saturated, more application instances may help; if the database is saturated, adding application instances can make the problem worse. Always connect the scaling action to the measured bottleneck.",
              },
              {
                title: "Worked example",
                content: "Suppose a quiz API receives 2,000 requests per second. Instead of placing all traffic on one large server, run several stateless API instances behind a load balancer. Authentication state can live in a shared store or be represented by a verifiable token, while files are kept outside the application instances.",
              },
              {
                title: "Practical application",
                content: "Scale the actual bottleneck, not every component. Horizontal scaling requires attention to connection pools, shared state, data contention, deployment safety, and uneven traffic. A larger machine can be simpler when the workload still fits comfortably on one node.",
              },
            ],
          },
          {
            title: "Performance",
            slug: "performance",
            description: "Learn to reason about latency, throughput, resource utilization, and bottlenecks.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Latency measures how long an operation takes; throughput measures how much work completes per unit time. Performance depends on the entire critical path, including network hops, serialization, database queries, locks, CPU, memory, disk, and connection pools. Optimizing a small component has little value when another dependency dominates the request. Measure first, identify the bottleneck, then change the limiting resource.\n\nDeeper reasoning:\nPerformance should be reasoned about as a budget. If the end-to-end target is 300 ms, decide how much of that budget can be consumed by network calls, application work, storage, and serialization. This makes optimization concrete and prevents spending effort on insignificant portions of the path.",
              },
              {
                title: "Worked example",
                content: "An API averages 40 ms of application processing but waits 350 ms for a database query. Reducing JSON serialization from 5 ms to 2 ms barely changes end-to-end latency. Adding the right index or changing the query plan could remove most of the delay because the database is the dominant portion of the critical path.",
              },
              {
                title: "Practical application",
                content: "Track p50, p95, and p99 latency rather than only averages. Watch throughput, saturation, queue depth, database latency, cache hit rate, and error rate together. Performance improvements should be validated under realistic concurrency and data volume.",
              },
            ],
          },
          {
            title: "Security",
            slug: "security",
            description: "Learn how confidentiality, integrity, availability, authentication, authorization, and layered controls shape architecture.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Security is a system property rather than a single login feature. Confidentiality protects information from unauthorized disclosure, integrity protects it from unauthorized modification, and availability protects access for legitimate users. Architecture should combine transport protection, authentication, authorization, input validation, secret management, rate limiting, network boundaries, logging, and appropriate encryption. Each layer should assume another control might fail.\n\nDeeper reasoning:\nSecurity decisions should follow data and trust boundaries. Identify what enters the system from an untrusted client, where identity is established, where authorization is checked, and where sensitive data is stored or transmitted. Then make each boundary enforce the smallest required privilege.",
              },
              {
                title: "Worked example",
                content: "A user can successfully sign in to an accounting application, but that does not grant access to every invoice. Authentication establishes the identity; authorization checks whether that identity can access a particular invoice. The API can enforce ownership checks before returning the document and can record security-relevant actions for later investigation.",
              },
              {
                title: "Practical application",
                content: "Apply least privilege, validate untrusted input at boundaries, avoid embedding secrets in source code, and limit public endpoints. Security controls should be designed into data flows, not added only after the functional architecture is complete.",
              },
            ],
          },
          {
            title: "Fault Tolerance and Resilience",
            slug: "fault-tolerance-and-resilience",
            description: "Understand how systems continue useful work when servers, networks, dependencies, or deployments fail.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Fault tolerance means the system can continue operating despite selected component failures. Resilience is the broader ability to absorb faults, recover, and return to normal behavior. Common techniques include timeouts, bounded retries, exponential backoff with jitter, circuit breakers, replication, queues, fallbacks, and graceful degradation. The correct combination depends on whether the operation is critical, retryable, idempotent, and latency-sensitive.\n\nDeeper reasoning:\nResilience is about behavior under stress, not only normal operation. Define whether a dependency failure should block, retry, queue, degrade, or fail fast. Different operations can legitimately choose different behavior even inside the same application.",
              },
              {
                title: "Worked example",
                content: "If a recommendation provider becomes unavailable, a shopping application can temporarily show popular products instead of blocking checkout. A timeout prevents an indefinitely waiting request; a circuit breaker stops repeated calls to a failing dependency; a queue can preserve work that does not need immediate completion.",
              },
              {
                title: "Practical application",
                content: "Never add retries without considering amplification. If 1,000 callers each retry a failing dependency several times, the outage can become worse. Bound retry counts, add jitter, distinguish transient from permanent failures, and make repeated operations safe where possible.",
              },
            ],
          },
        ],
      },
      {
        title: "Edge and Infrastructure",
        slug: "edge-and-infrastructure",
        description: "Traffic entry and delivery infrastructure including DNS, load balancing, API gateways, and CDNs.",
        topics: [
          {
            title: "DNS",
            slug: "dns",
            description: "Understand name resolution, caching, TTL, and how DNS participates in service routing.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "DNS translates human-readable names into network destinations. A recursive resolver may answer from cache or follow the hierarchy toward authoritative servers. Caching reduces lookup work, while TTL controls how long a result may remain cached. DNS is therefore both a naming mechanism and an operational consideration: changing an address does not mean every client immediately forgets the previous answer.\n\nDeeper reasoning:\nDNS is cached at several layers, so operational changes must account for stale answers. Treat DNS records as part of the deployment plan, and make sure the application remains safe during the period when old and new destinations can both receive traffic.",
              },
              {
                title: "Worked example",
                content: "A learning website uses api.example.test for its API. A client asks a recursive resolver for the address. If the resolver has a valid cached answer, it can return it directly. Otherwise it obtains the answer from the appropriate authoritative path and caches it according to the record's TTL.",
              },
              {
                title: "Practical application",
                content: "Choose TTLs with change frequency and operational recovery in mind. Lower TTLs can make planned changes propagate sooner but increase lookup traffic. DNS should not be treated as an instantaneous failover mechanism unless the entire client and caching behavior has been considered.",
              },
            ],
          },
          {
            title: "Load Balancing",
            slug: "load-balancing",
            description: "Learn how load balancers distribute traffic, detect unhealthy nodes, and influence application scalability.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A load balancer spreads requests across backend instances and can stop sending traffic to unhealthy nodes. Common routing strategies include round robin, least connections, and client-derived hashing. The strategy should match workload characteristics. Health checks should test meaningful service readiness rather than only whether a process is listening on a port.\n\nDeeper reasoning:\nLoad balancing works best when backend instances have predictable health and similar capacity. When requests vary widely in cost, connection-aware or workload-aware routing can be more appropriate. Health checks should represent readiness to serve real traffic, not merely process liveness.",
              },
              {
                title: "Worked example",
                content: "An API runs on three identical instances. Round-robin routing distributes requests approximately A, B, C, A, B, C. If instance B fails its health check, the balancer removes it and routes new requests to A and C until B becomes healthy again.",
              },
              {
                title: "Practical application",
                content: "Keep application nodes as stateless as practical. If session affinity is used, understand the failure and rebalancing implications. Load balancing does not remove database bottlenecks; it can increase database pressure if more application instances share the same backend.",
              },
            ],
          },
          {
            title: "API Gateway",
            slug: "api-gateway",
            description: "Understand the role of an API gateway at the edge of a distributed application.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "An API gateway provides a controlled entry point between clients and internal services. It can perform routing, authentication, request validation, rate limiting, throttling, request identification, TLS termination, and observability. Centralizing common edge behavior prevents every backend service from independently implementing the same concerns, but the gateway itself must be horizontally scalable and carefully designed so it does not become a bottleneck.\n\nDeeper reasoning:\nAn API gateway is an edge policy boundary, not a place to move every business rule. Centralize cross-cutting concerns that truly apply at the edge, while keeping domain decisions in the service that owns the business data.",
              },
              {
                title: "Worked example",
                content: "A mobile application sends GET /courses/42. The gateway authenticates the request, checks the rate limit, attaches a request ID, and routes it to Course Service. A payment request can follow a different route and stricter policy without exposing internal service addresses to the client.",
              },
              {
                title: "Practical application",
                content: "Keep business rules out of the gateway when they belong to domain services. Make gateway failures observable, avoid storing unnecessary session state there, and size gateway capacity for peak connection and request rates.",
              },
            ],
          },
          {
            title: "CDN",
            slug: "cdn",
            description: "Learn how edge caching reduces latency and origin traffic for cacheable content.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A content delivery network stores cacheable objects at edge locations closer to users. A cache hit can be served without contacting the origin; a miss causes the edge to retrieve the object and may cache it for later requests. CDN effectiveness depends on cacheability, object popularity, freshness rules, and geographic distribution.\n\nDeeper reasoning:\nCDN performance depends heavily on cacheability. Public immutable assets are easier to cache than personalized responses. Cache keys, freshness rules, invalidation, and content versioning therefore matter as much as geographic edge placement.",
              },
              {
                title: "Worked example",
                content: "A training platform publishes a 1.5 MB JavaScript bundle and many lesson images. A learner in Singapore can receive cached assets from a nearby edge rather than fetching every object from an origin region elsewhere. The application servers can therefore spend more capacity on dynamic requests.",
              },
              {
                title: "Practical application",
                content: "Use explicit cache-control and invalidation strategies. Version static assets when possible so a new filename represents new content. Do not blindly cache private or user-specific responses at a shared edge.",
              },
            ],
          },
        ],
      },
      {
        title: "Data, Storage, and Performance",
        slug: "data-storage-and-performance",
        description: "Caching, database selection, replication, identifiers, media storage, distributed caches, sharding, read scaling, and consistency.",
        topics: [
          {
            title: "Caching",
            slug: "caching",
            description: "Learn cache-aside, write-through behavior, TTL, invalidation, hit rate, and thundering-herd protection.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Caching stores frequently used data closer to consumers so repeated work can be avoided. In cache-aside, the application reads the cache first and fills it after a miss. Write-through designs update the cache together with the backing store. TTLs limit how long entries remain usable. Cache design must explicitly address stale data, invalidation, eviction, hot keys, and concurrent misses.\n\nDeeper reasoning:\nCaching is an optimization layer, so the source of truth and stale-data policy must remain clear. A cache outage should normally degrade performance rather than destroy correctness. Treat cache misses as an expected path and protect the backing store from sudden miss storms.",
              },
              {
                title: "Worked example",
                content: "A course catalog request checks course:42 in cache. On a miss, the application reads the database, stores the result with a short expiration, and returns it. A price update can invalidate the corresponding cache key so the next read obtains the new value.",
              },
              {
                title: "Practical application",
                content: "Measure hit rate and backend load rather than assuming a cache is helping. A popular key that expires for thousands of clients at once can create a thundering herd. Jittered TTLs, request coalescing, early refresh, and controlled locking are possible mitigations.",
              },
            ],
          },
          {
            title: "Database Selection",
            slug: "database-selection",
            description: "Learn to choose relational, document, distributed wide-column, or distributed SQL storage from workload requirements.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Database selection should begin with access patterns, consistency needs, transaction requirements, data shape, scale, growth, and operational constraints. Relational systems are strong candidates for structured transactional workloads and relationships. Document stores fit flexible records in suitable workloads. Distributed wide-column systems can fit very large distributed access patterns. Distributed SQL systems aim to combine SQL-oriented semantics with distributed operation.\n\nDeeper reasoning:\nDatabase choice becomes clearer when you write the most important queries first. If the common query is difficult or expensive in the proposed model, the model is probably not aligned with the workload. Schema design and database selection should therefore be driven by access patterns together.",
              },
              {
                title: "Worked example",
                content: "An order system needs atomic inventory and payment-related state transitions and rich relationships, so a relational database may be a natural starting point. A telemetry workload with enormous append volume and predictable partitioned reads may justify a different storage model.",
              },
              {
                title: "Practical application",
                content: "List the top reads and writes before choosing a database. Ask how data will be indexed, partitioned, replicated, backed up, and restored. Technology popularity is not a substitute for matching the workload.",
              },
            ],
          },
          {
            title: "Replication",
            slug: "replication",
            description: "Understand multiple data copies, synchronous versus asynchronous replication, lag, and durability trade-offs.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Replication maintains additional copies of data so reads, availability, or durability can be improved. Synchronous replication waits for specified replicas before acknowledging a write, while asynchronous replication acknowledges earlier and allows replicas to catch up later. Replication is not the same as backup: a replication stream can reproduce accidental or malicious changes, whereas backups provide historical recovery points.\n\nDeeper reasoning:\nReplication improves availability or read capacity only when the application understands replica behavior. Lag, failover, stale reads, and recovery all change the semantics of the system. Historical backups are a separate control because replicas can reproduce unwanted changes.",
              },
              {
                title: "Worked example",
                content: "A primary database records a profile update and asynchronously sends the change to two replicas. A read routed immediately to a lagging replica might still see the previous value. If the product requires read-after-write behavior, recent reads can be routed to the primary or use a consistency-aware strategy.",
              },
              {
                title: "Practical application",
                content: "Monitor replication lag and define what happens when a replica falls behind. Choose synchronous guarantees only where the added latency and availability implications are acceptable. Plan backups independently from replication.",
              },
            ],
          },
          {
            title: "Distributed Unique ID Generation",
            slug: "distributed-unique-id-generation",
            description: "Learn why identifiers become a distributed coordination problem and how centralized, random, and time-structured approaches differ.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "A single counter is easy to reason about, but multiple writers need a strategy that prevents collisions without creating unacceptable coordination. Central database sequences provide strong uniqueness but may become a shared dependency. UUID-style identifiers avoid central allocation in many designs at the cost of larger values and possible index-locality concerns. Time-structured IDs can combine time, node identity, and a sequence component.\n\nDeeper reasoning:\nAn identifier is more than a unique number: it may influence ordering, indexing, privacy, and partitioning. A globally unique identifier that creates poor index locality or reveals sensitive timing may be technically correct but operationally undesirable.",
              },
              {
                title: "Worked example",
                content: "A media service has ten upload workers creating asset records concurrently. Instead of asking one central service for every integer, each worker can generate a globally unique identifier using a scheme designed for distributed generation. The identifier can be stored as the durable asset key while a human-readable filename remains separate.",
              },
              {
                title: "Practical application",
                content: "Evaluate uniqueness, ordering, size, privacy, generation cost, collision handling, and database indexing. Do not expose internal sequence information when it leaks sensitive business volume or ordering information.",
              },
            ],
          },
          {
            title: "Large File Uploads",
            slug: "large-file-uploads",
            description: "Learn direct-to-object-storage uploads, signed authorization, chunking, parallelism, checksums, and resumability.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Large uploads should avoid unnecessarily routing the full payload through application servers. A common pattern is for the application to authenticate the user and issue temporary, narrowly scoped upload authorization for object storage. The client uploads chunks, retries failed chunks, and finalizes the object after all parts succeed. This reduces application-server bandwidth and makes interrupted transfers cheaper to resume.\n\nDeeper reasoning:\nLarge-file architecture is mostly about moving bytes efficiently and recovering from partial failure. Authorization, upload state, checksums, chunk retries, and finalization should be designed as a state machine rather than as one giant request.",
              },
              {
                title: "Worked example",
                content: "For a 3 GB video, the client requests permission for an upload, receives short-lived authorization, and uploads multiple parts directly to storage. If part 12 fails, only that part is retried. Once all parts are present, the upload is finalized and metadata is recorded.",
              },
              {
                title: "Practical application",
                content: "Balance chunk size against request overhead and retry cost. Limit parallel uploads so clients and storage are not overwhelmed. Validate file type, size, destination ownership, expiration, and checksums. Never expose broad permanent storage credentials.",
              },
            ],
          },
          {
            title: "Object Storage",
            slug: "object-storage",
            description: "Understand why binary objects and transactional metadata are often separated.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Object storage is designed for large immutable or versioned blobs such as images, videos, documents, and backups. A transactional database can keep ownership, status, object key, dimensions, and timestamps while the binary bytes live in object storage. This separation avoids making a relational database carry large payloads and enables independent delivery and processing pipelines.\n\nDeeper reasoning:\nObject storage works especially well when binary payloads can be addressed independently of transactional metadata. This separation also enables different lifecycle, access-control, CDN, and processing policies for the bytes.",
              },
              {
                title: "Worked example",
                content: "A video record might contain videoId, ownerId, objectKey, duration, and processingStatus. The actual MP4 is stored under the object key. Workers can create transcoded versions and thumbnails as additional objects while the database tracks their status.",
              },
              {
                title: "Practical application",
                content: "Treat object keys as data identifiers rather than user-controlled filesystem paths. Control access with scoped authorization, validate metadata, consider lifecycle policies, and place frequently watched public assets behind a CDN.",
              },
            ],
          },
          {
            title: "Distributed Cache",
            slug: "distributed-cache",
            description: "Learn how caches are partitioned across nodes and how eviction and hot keys affect scalability.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A distributed cache spreads entries across multiple nodes so total memory and throughput exceed a single machine's practical capacity. A routing strategy maps keys to nodes. The design must account for eviction, expiration, node loss, rebalancing, and hot keys. A single extremely popular key can overload one node even when aggregate cache utilization looks healthy.\n\nDeeper reasoning:\nDistributed caching introduces cluster-level failure modes. Rebalancing, node loss, hot keys, and cache stampedes can turn a local optimization into a system-wide incident, so per-node telemetry is essential.",
              },
              {
                title: "Worked example",
                content: "A catalog cache hashes product IDs across three cache nodes. Most products distribute evenly, but a homepage key becomes extremely popular. Rather than allowing every request to hammer one node, the system can use local caching, controlled replication, or request coalescing for that hot value.",
              },
              {
                title: "Practical application",
                content: "Choose a partitioning strategy that minimizes unnecessary movement during scaling. Monitor per-node traffic and memory, not just cluster totals. Define what happens on a cache miss or node loss so the primary database is not suddenly overwhelmed.",
              },
            ],
          },
          {
            title: "Database Sharding",
            slug: "database-sharding",
            description: "Learn how horizontal data partitioning works, how shard keys influence access patterns, and why hotspots matter.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Sharding partitions a dataset across database nodes. Hash-based sharding can distribute records evenly, while range-based partitioning can make certain range queries natural. The shard key is critical because it determines where data and traffic land. A poor key can create hot shards, uneven storage, and expensive cross-shard operations.\n\nDeeper reasoning:\nSharding changes the application because routing becomes part of data access. The shard key should support the most important queries, and the design should have a credible plan for growth, migration, and cross-shard operations.",
              },
              {
                title: "Worked example",
                content: "A user service shards accounts using a stable user identifier. The application can route requests for a user directly to the responsible shard. If one customer organization generates a huge share of traffic and all its data lands together, the design may still produce a hot partition despite good average distribution.",
              },
              {
                title: "Practical application",
                content: "Select keys from real access patterns, not only from data cardinality. Plan how resharding works, how secondary indexes behave, and how cross-shard transactions or queries are handled.",
              },
            ],
          },
          {
            title: "Database Replicas and Read Scaling",
            slug: "database-replicas-and-read-scaling",
            description: "Learn how read replicas can increase read capacity and why replication lag affects consistency.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A primary can accept writes while replicas serve eligible reads. This can increase read throughput and isolate some read traffic from write workloads. The trade-off is that replicas may lag. Applications therefore need a policy for read-after-write behavior, stale data tolerance, and replica selection.\n\nDeeper reasoning:\nRead replicas are useful only for reads that can tolerate their consistency model. A common pattern is to keep the primary on paths that require immediate visibility while sending eligible read-heavy traffic to replicas.",
              },
              {
                title: "Worked example",
                content: "A profile update is committed on the primary. The user immediately requests the profile again. If the request goes to a replica that has not caught up, the response may contain the previous value. The application can route the user's recent reads to the primary or use a consistency-aware mechanism.",
              },
              {
                title: "Practical application",
                content: "Monitor lag and remove unhealthy replicas from read rotation. Do not send every read to replicas merely because they exist; classify reads by freshness requirements.",
              },
            ],
          },
          {
            title: "Consistency and Availability Trade-offs",
            slug: "consistency-and-availability-trade-offs",
            description: "Learn how consistency requirements should be tied to business impact rather than treated as a single global setting.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Consistency describes what different readers can observe about shared state, while availability concerns whether the system continues responding during failures. Stronger consistency often requires more coordination, which can increase latency or reduce operation during some failures. Eventual consistency permits temporary divergence while allowing systems to scale and operate with looser coordination.\n\nDeeper reasoning:\nConsistency is best specified as a business requirement. Saying 'strong consistency everywhere' can create unnecessary coordination, while 'eventual consistency everywhere' can violate critical invariants. Classify each workflow by the harm caused by stale or conflicting state.",
              },
              {
                title: "Worked example",
                content: "A bank balance generally needs stronger correctness guarantees than a social-media like count. If a like counter is briefly behind, the user experience may still be acceptable; if a payment balance is stale during a withdrawal, the consequences are much more serious.",
              },
              {
                title: "Practical application",
                content: "Classify data by business impact. For each workflow, define what stale data means, how long staleness is acceptable, and what operations require transactional guarantees. Consistency should be designed per operation or data domain when appropriate.",
              },
            ],
          },
        ],
      },
      {
        title: "Communication and Asynchronous Systems",
        slug: "communication-and-asynchronous-systems",
        description: "HTTP-family communication, queues, real-time protocols, webhooks, streams, analytics, notifications, and fan-out.",
        topics: [
          {
            title: "Message Queues",
            slug: "message-queues",
            description: "Understand producer-consumer decoupling, asynchronous work, backpressure, retries, and dead-letter handling.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A message queue buffers work between producers and consumers. This allows a user-facing request to finish without waiting for every secondary task and lets workers process jobs at their own rate. Queues also absorb short traffic bursts, but they do not create infinite capacity: if production continuously exceeds consumption, backlog grows until capacity or retention limits are reached.\n\nDeeper reasoning:\nQueue-based designs shift some complexity from request latency into delivery semantics. Once work becomes asynchronous, the system must define what happens if a message is duplicated, delayed, reordered, or permanently rejected. These semantics are part of the application contract.",
              },
              {
                title: "Worked example",
                content: "When a user uploads a document, the API stores it and publishes a processing job. Workers consume jobs to extract text, create previews, and run validation. If processing temporarily slows, the queue holds pending work instead of forcing every upload request to wait.",
              },
              {
                title: "Practical application",
                content: "Define retry limits, visibility or acknowledgement behavior, idempotency, ordering requirements, and dead-letter handling. Monitor queue depth and age, not just worker CPU. A growing backlog is a capacity signal, not merely a messaging metric.",
              },
            ],
          },
          {
            title: "Communication Protocols",
            slug: "communication-protocols",
            description: "Compare HTTP, HTTPS, gRPC, and WebSocket according to interaction style and system requirements.",
            estimatedMinutes: 22,
            sections: [
              {
                title: "Detailed explanation",
                content: "Communication protocols determine how components exchange information. HTTP is a common request-response foundation, HTTPS adds TLS protection, gRPC provides strongly defined service contracts and efficient binary communication, and WebSocket provides persistent bidirectional messaging. Protocol choice should follow interaction patterns, compatibility needs, latency expectations, streaming requirements, and operational tooling rather than fashion.\n\nDeeper reasoning:\nProtocol selection should consider both wire behavior and operational reality. A theoretically efficient protocol can still be a poor choice if clients cannot support it, debugging is difficult, or the communication pattern does not match the protocol's strengths.",
              },
              {
                title: "Worked example",
                content: "A public browser API can use HTTPS with conventional HTTP methods. Internal services with stable typed contracts can use gRPC. A collaborative editor can use WebSocket for ongoing two-way updates because waiting for a new HTTP request for every cursor or document event would be inefficient.",
              },
              {
                title: "Practical application",
                content: "Document timeout behavior, payload limits, versioning, and error semantics at every protocol boundary. A fast protocol does not compensate for poor data access or excessive network hops.",
              },
            ],
          },
          {
            title: "WebSocket",
            slug: "websocket",
            description: "Learn persistent bidirectional connections, connection scaling, routing, and reconnect behavior.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "WebSocket provides a persistent two-way channel after the connection is established. This is useful when a server needs to push updates without waiting for another client request. At scale, the hard problems become connection count, memory per connection, heartbeats, reconnect storms, message routing, and knowing which server owns a user's live connection.\n\nDeeper reasoning:\nA live connection is ephemeral. Important application state should therefore be durable or reconstructable outside the socket. Connection registries tell the system where to deliver now, while message history or state snapshots make recovery possible later.",
              },
              {
                title: "Worked example",
                content: "A collaborative quiz room keeps each participant connected to a WebSocket server. A connection registry records that user 501 is attached to node C. When another service publishes a room event, the message can be routed to node C, which pushes it to the user's open connection.",
              },
              {
                title: "Practical application",
                content: "Persist important messages independently of the live connection. On reconnect, authenticate again, determine the last acknowledged event, replay missed state when required, and then resume live delivery.",
              },
            ],
          },
          {
            title: "Server-Sent Events",
            slug: "server-sent-events",
            description: "Learn one-way server-to-client event delivery and when SSE is simpler than a bidirectional channel.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Server-Sent Events provide a long-lived HTTP connection through which a server can send a sequence of events to a client. The communication direction is naturally server to client, making SSE useful for notifications, progress streams, dashboards, and similar updates. It is simpler than a full bidirectional protocol when the client rarely needs to send live messages back.\n\nDeeper reasoning:\nSSE is most attractive when the dominant direction is server to client and ordinary HTTP infrastructure is desirable. Its simplicity comes from accepting that the client-to-server side is handled separately rather than through the same stream.",
              },
              {
                title: "Worked example",
                content: "A deployment dashboard opens an SSE stream. The server sends events when a release changes from queued to running to completed. The browser does not need to poll every few seconds just to discover whether the state changed.",
              },
              {
                title: "Practical application",
                content: "Define reconnection behavior, event identifiers, heartbeat behavior, proxy timeouts, and connection limits. Use WebSocket or another mechanism when frequent two-way interaction is central to the product.",
              },
            ],
          },
          {
            title: "Short Polling",
            slug: "short-polling",
            description: "Understand periodic request polling, its simplicity, and its cost at scale.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Short polling repeatedly asks a server whether new information exists. It is easy to implement because it uses ordinary request-response infrastructure, but every interval produces a request even when nothing has changed. At high client counts, idle polling can consume significant network, connection, and server resources.\n\nDeeper reasoning:\nPolling trades implementation simplicity for repeated work. The right interval is a product decision as well as a technical one: shorter intervals improve freshness but increase load, while longer intervals save resources but make changes appear later.",
              },
              {
                title: "Worked example",
                content: "A small internal dashboard asks GET /job-status every five seconds. With only a few operators, the simplicity may be acceptable. If hundreds of thousands of clients use the same approach, most requests may return unchanged state and create unnecessary load.",
              },
              {
                title: "Practical application",
                content: "Use short polling when update frequency and scale make the overhead acceptable. Increase the interval when freshness permits, add caching where appropriate, and move to event-driven delivery when idle traffic becomes a material cost.",
              },
            ],
          },
          {
            title: "Long Polling",
            slug: "long-polling",
            description: "Learn how long polling reduces empty responses while introducing open-request resource considerations.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "With long polling, the client sends a request and the server keeps it open until useful data arrives, a timeout occurs, or an error happens. The client then opens another request. This can reduce empty responses compared with short polling, but servers, proxies, and load balancers must handle many outstanding requests and clean timeout behavior.\n\nDeeper reasoning:\nLong polling reduces empty responses but still creates a large population of outstanding requests. Connection timeouts, proxy behavior, cancellation, and reconnect storms must therefore be designed explicitly.",
              },
              {
                title: "Worked example",
                content: "A support dashboard requests new ticket events. If no event exists, the server waits for up to 25 seconds. When a ticket changes, the server responds immediately and the client reconnects for the next event.",
              },
              {
                title: "Practical application",
                content: "Set finite timeouts, handle disconnects, and size connection resources for peak concurrency. Long polling is a transitional option when persistent event channels are unavailable or unnecessary.",
              },
            ],
          },
          {
            title: "Webhooks",
            slug: "webhooks",
            description: "Learn event callbacks, authenticity verification, retries, and idempotent event processing.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A webhook lets an external system notify your application when an event occurs. Instead of continuously asking a provider for state, your service exposes a callback endpoint. Because networks and providers can retry deliveries, webhook consumers must verify authenticity, validate payloads, and make processing idempotent.\n\nDeeper reasoning:\nA webhook endpoint is part of an integration boundary and should assume untrusted or repeated delivery. Verify authenticity before applying effects, acknowledge safely, and move slow processing behind an internal queue when necessary.",
              },
              {
                title: "Worked example",
                content: "A payment provider sends POST /callbacks/payment when a charge changes state. The receiver verifies the provider's signature, checks that the event ID has not already been processed, stores the event outcome, and triggers the appropriate business workflow.",
              },
              {
                title: "Practical application",
                content: "Assume duplicate and delayed delivery. Track event IDs where necessary, return appropriate acknowledgements, retry internal processing safely, and separate receipt of the webhook from slow downstream work.",
              },
            ],
          },
          {
            title: "Stream APIs",
            slug: "stream-apis",
            description: "Understand continuous event streams, ordering, replay, retention, and client recovery.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A stream API exposes a sequence of events rather than isolated request-response results. Designing one requires decisions about ordering, retention, replay, delivery guarantees, and how disconnected consumers resume. A stream may support operational telemetry, live analytics, activity feeds, or market-like updates where a sequence has meaning.\n\nDeeper reasoning:\nA stream is useful only when consumers can make sense of its ordering and retention model. Define whether a consumer needs every event, only the latest state, or the ability to replay a historical interval.",
              },
              {
                title: "Worked example",
                content: "A fleet-monitoring service emits vehicle temperature events. Consumers can subscribe to the stream and maintain dashboards. If a dashboard disconnects for two minutes, the system needs a defined policy: replay missed events, send a fresh snapshot, or accept the gap.",
              },
              {
                title: "Practical application",
                content: "Do not assume every consumer needs every historical event. Define retention and replay requirements explicitly. Partitioning, event keys, sequence numbers, and consumer offsets should align with the required ordering semantics.",
              },
            ],
          },
          {
            title: "Analytics Service",
            slug: "analytics-service",
            description: "Learn how event-driven analytics keeps reporting work off the critical application path.",
            estimatedMinutes: 20,
            sections: [
              {
                title: "Detailed explanation",
                content: "Analytics systems collect behavioral and operational events so they can be aggregated later. The main user request should not usually wait for a reporting database to finish writing every event. An event queue or stream can absorb events while consumers transform, aggregate, and store them for analysis.\n\nDeeper reasoning:\nAnalytics should be isolated from transactional correctness. Event schemas become long-lived contracts, so version them carefully and make consumers tolerant of delayed or duplicate events.",
              },
              {
                title: "Worked example",
                content: "When a learner opens lesson 700, the page response returns the lesson immediately. A lesson_viewed event is published asynchronously. Analytics consumers can aggregate views by lesson, course, device, or time window without adding that processing to the page latency.",
              },
              {
                title: "Practical application",
                content: "Define event schemas, retention, privacy boundaries, late-arriving event handling, and duplicate semantics. Keep analytics consumers isolated so a reporting outage does not unnecessarily block core transactions.",
              },
            ],
          },
          {
            title: "Notification Service",
            slug: "notification-service",
            description: "Learn multi-channel delivery, fan-out, retries, deduplication, preferences, and rate control.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Notification systems translate business events into user-facing messages through email, SMS, push, or in-app channels. Delivery providers can fail or respond slowly, so notifications are usually better handled asynchronously. A notification pipeline needs retry limits, deduplication, user preferences, and controls that prevent accidental message storms.\n\nDeeper reasoning:\nNotification delivery is a distributed workflow involving external providers and user preferences. The system should distinguish accepted-for-delivery from actually-delivered states and avoid turning provider outages into failures of the originating business transaction.",
              },
              {
                title: "Worked example",
                content: "When an order completes, the order service emits OrderCompleted. Email and push consumers process the event independently. If email is unavailable, the event remains available for retry without delaying the successful order transaction.",
              },
              {
                title: "Practical application",
                content: "Give each notification a stable deduplication identity when repeated delivery would be harmful. Respect opt-outs and quiet periods, batch low-priority messages, and monitor provider response rates and backlog age.",
              },
            ],
          },
          {
            title: "Search Service",
            slug: "search-service",
            description: "Learn why full-text search is different from simple database lookup and how indexing pipelines create eventual consistency.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Search often needs tokenization, ranking, filtering, typo handling, stemming, and specialized indexes. A primary database can remain the transactional source of truth while a separate indexing pipeline builds a search representation. This means search results can briefly lag behind transactional updates, so product behavior must tolerate that consistency window.\n\nDeeper reasoning:\nSearch is commonly a derived representation of primary data. Once that is recognized, indexing lag, reindexing, repair, and schema evolution become explicit operational concerns rather than surprising inconsistencies.",
              },
              {
                title: "Worked example",
                content: "When a course title changes, the course database is updated first. A change event is consumed by a search indexer, which updates the search document. A learner might see the old title in search for a short period while the index catches up.",
              },
              {
                title: "Practical application",
                content: "Define which fields are searchable, how changes reach the index, how failed indexing is retried, and how reindexing is performed. Do not make the search index the only source of critical transactional truth unless the architecture explicitly supports that choice.",
              },
            ],
          },
          {
            title: "Recommendation Service",
            slug: "recommendation-service",
            description: "Learn content-based, collaborative, hybrid, and asynchronous recommendation architectures.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Recommendation systems combine signals about users, items, and context to rank potentially useful choices. Content-based approaches use item similarity; collaborative approaches learn from behavior across users; hybrid systems combine several signals. Model computation and feature generation can be expensive, so large systems often update recommendations asynchronously and serve precomputed or cached results during user requests.\n\nDeeper reasoning:\nRecommendation serving and recommendation computation have different latency requirements. Heavy feature generation or model scoring can run asynchronously, while the request path retrieves a prepared candidate set and applies lightweight ranking or filtering.",
              },
              {
                title: "Worked example",
                content: "A learning platform observes that a learner repeatedly studies distributed systems and databases. Content features can suggest related topics. If many learners with similar activity also complete caching courses, collaborative signals can contribute another ranking feature.",
              },
              {
                title: "Practical application",
                content: "Separate online serving from offline or asynchronous computation. Define freshness requirements, cold-start behavior, feature availability, fallback recommendations, and cache strategy. Recommendation quality and infrastructure cost should be evaluated together.",
              },
            ],
          },
          {
            title: "Common Fan-Out Architecture",
            slug: "common-fan-out-architecture",
            description: "Understand how one business event can feed independent consumers without tightly coupling the originating transaction.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Fan-out publishes one event to multiple consumers, each responsible for its own side effect. This allows analytics, search, recommendations, notifications, and other secondary workloads to scale independently. The core transaction becomes less coupled to downstream availability, but the system must define delivery, retry, ordering, and duplicate behavior.\n\nDeeper reasoning:\nFan-out reduces coupling by letting consumers evolve independently, but it also multiplies delivery paths. Each consumer needs its own retry, monitoring, and failure policy so one broken consumer does not stall unrelated work.",
              },
              {
                title: "Worked example",
                content: "After an order is created, an OrderCreated event can feed an analytics consumer, a notification consumer, and a recommendation consumer. The order service does not need to call each consumer synchronously before confirming the order.",
              },
              {
                title: "Practical application",
                content: "Use durable event delivery for important side effects. Make consumers independently idempotent and observable. If a consumer is down, its backlog should be isolated rather than preventing unrelated consumers from progressing.",
              },
            ],
          },
        ],
      },
      {
        title: "Business and Coordination Services",
        slug: "business-and-coordination-services",
        description: "Payment workflows and distributed coordination patterns such as locks and resource isolation.",
        topics: [
          {
            title: "Payment Service",
            slug: "payment-service",
            description: "Learn why payment workflows require idempotency, timeout handling, reconciliation, and careful failure semantics.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Payments combine business state, external providers, and financial consequences. A request can time out after the provider has accepted it, so the client and server may not know the final outcome immediately. Idempotency keys prevent repeated requests from creating duplicate charges, while reconciliation resolves ambiguous states and mismatches between internal and provider records.\n\nDeeper reasoning:\nFinancial workflows require explicit state because network uncertainty creates ambiguous outcomes. Treat 'unknown' as a real state that can be reconciled rather than guessing success or failure after a timeout.",
              },
              {
                title: "Worked example",
                content: "A checkout request carries idempotency key pay-order-9001. The service records the key and its outcome. If the client retries because the network failed, the service returns the existing result instead of starting another independent charge. A background reconciliation process can compare internal records with provider records.",
              },
              {
                title: "Practical application",
                content: "Keep payment state transitions explicit. Distinguish authorization, capture, failure, refund, and unknown states as appropriate. Never treat a network timeout as proof that a financial operation did not happen.",
              },
            ],
          },
          {
            title: "Distributed Locking",
            slug: "distributed-locking",
            description: "Understand distributed coordination, lock ownership, leases, expiration, and when a lock is actually appropriate.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A distributed lock coordinates competing workers when duplicate execution would be harmful or wasteful. A robust lock needs ownership so one worker cannot accidentally release another worker's lock, an expiration or lease so a crashed owner does not hold it forever, and careful handling of renewal and network uncertainty. Locks should solve a specific correctness or coordination problem rather than being added automatically.\n\nDeeper reasoning:\nDistributed locks can prevent duplicate concurrent work, but they cannot magically make a multi-step operation atomic. If correctness can be achieved with database constraints or idempotent operations, those mechanisms may be easier to reason about than a lock.",
              },
              {
                title: "Worked example",
                content: "Two workers receive requests to generate the same expensive report. A lock keyed by report ID lets one worker become the active generator while the other waits or observes that work is already in progress. The lock expires if the owner disappears unexpectedly.",
              },
              {
                title: "Practical application",
                content: "Use atomic acquisition with an owner token where supported. Keep the protected critical section bounded and consider what happens if the lock expires while work is still running. If duplicate work is acceptable, idempotent processing may be safer and simpler than distributed locking.",
              },
            ],
          },
        ],
      },
      {
        title: "Operations and Reliability",
        slug: "operations-and-reliability",
        description: "Observability, reliability patterns, idempotency, asynchronous consistency, backpressure, and hot partitions.",
        topics: [
          {
            title: "Observability",
            slug: "observability",
            description: "Learn how logs, metrics, traces, alerts, and request identifiers make distributed behavior diagnosable.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Observability provides evidence about what a system is doing internally. Logs capture structured events, metrics show aggregate behavior over time, and distributed traces connect work across service boundaries. Request IDs and trace IDs make it possible to correlate a user action with downstream calls. Good observability measures both health and user-visible behavior.\n\nDeeper reasoning:\nObservability should connect symptoms to causes. A high error rate without request context is less useful than a trace that identifies the slow dependency and logs that carry the same correlation identifiers.",
              },
              {
                title: "Worked example",
                content: "A checkout request has trace ID t-812. The trace shows 25 ms in the gateway, 40 ms in the order service, 280 ms waiting on inventory, and 35 ms in payment preparation. The same trace ID appears in structured logs, allowing an operator to move from a latency symptom to the responsible dependency.",
              },
              {
                title: "Practical application",
                content: "Measure request rate, error rate, latency percentiles, queue depth, cache hit rate, database latency, saturation, and replication lag where relevant. Avoid logging secrets or unnecessary personal data. Alerts should indicate actionable conditions rather than every transient fluctuation.",
              },
            ],
          },
          {
            title: "Advanced Reliability Patterns",
            slug: "advanced-reliability-patterns",
            description: "Learn circuit breakers, bulkheads, graceful degradation, bounded retries, and failure isolation as complementary reliability techniques.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Advanced resilience patterns prevent one failing dependency from consuming all resources or turning a local fault into a system-wide outage. A circuit breaker can fail fast when a dependency is repeatedly unhealthy. Bulkheads isolate thread pools, connection pools, or queues by workload. Graceful degradation serves a reduced feature set. Bounded retries avoid infinite amplification.\n\nDeeper reasoning:\nReliability patterns work best in combination. Timeouts bound waiting, circuit breakers stop repeated calls, bulkheads isolate resources, and graceful degradation defines a useful fallback. None of these should replace clear ownership and correct state transitions.",
              },
              {
                title: "Worked example",
                content: "A marketplace uses separate resource pools for payment and recommendation calls. If recommendation becomes slow, its pool saturates without consuming every payment worker. A circuit breaker then stops new recommendation calls for a recovery period, while the product falls back to a generic ranking.",
              },
              {
                title: "Practical application",
                content: "Tune thresholds from measured behavior rather than arbitrary numbers. Combine timeouts with circuit breakers and bulkheads. Ensure fallback behavior is safe and does not silently violate business correctness.",
              },
            ],
          },
          {
            title: "Idempotency in Depth",
            slug: "idempotency-in-depth",
            description: "Learn how repeated requests arise in distributed systems and how idempotency prevents duplicate effects.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A request can be repeated because of client retries, timeouts, proxies, worker retries, or uncertain network outcomes. An idempotent operation produces the same intended business result when the same request is processed again. A practical design uses a stable request key, stores the resulting state, and returns the existing result when the key is seen again.\n\nDeeper reasoning:\nIdempotency is especially important when the caller cannot distinguish 'request failed' from 'response lost'. A stable key lets the server turn uncertain retries into a deterministic result.",
              },
              {
                title: "Worked example",
                content: "A checkout client sends clientRequestId ABC123. The server creates order 900 and records ABC123 with that result. If the first response is lost and the client sends ABC123 again, the server recognizes the prior request and returns order 900 instead of creating another order.",
              },
              {
                title: "Practical application",
                content: "Choose the idempotency key scope and retention period carefully. Store enough information to reproduce the prior response safely. Idempotency does not mean every internal step is magically safe; downstream calls may need their own deduplication or transactional strategy.",
              },
            ],
          },
          {
            title: "Data Consistency in Asynchronous Systems",
            slug: "data-consistency-in-asynchronous-systems",
            description: "Learn why independent consumers can observe different states temporarily and how to design acceptable consistency windows.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Asynchronous architectures intentionally allow components to progress at different speeds. After a business event is emitted, one consumer may finish immediately while another is delayed. This is acceptable when the product defines a consistency window and users can tolerate it. When a requirement demands immediate visibility, that path needs stronger synchronization or a different read strategy.\n\nDeeper reasoning:\nAsynchronous consistency should be measured as lag, not treated as an abstract idea. Event age and consumer backlog reveal whether the system is within the product's accepted freshness window.",
              },
              {
                title: "Worked example",
                content: "After an order is created, analytics may already contain the event while the search index still shows the old catalog state and notification remains queued. These differences are not necessarily failures; they become failures only when they violate an explicit business requirement.",
              },
              {
                title: "Practical application",
                content: "Define freshness targets per consumer. Monitor event lag and processing age. Provide repair or replay mechanisms so a failed consumer can catch up without requiring the originating transaction to be repeated.",
              },
            ],
          },
          {
            title: "Backpressure and Queue Sizing",
            slug: "backpressure-and-queue-sizing",
            description: "Learn how producer-consumer imbalance creates backlog and how simple capacity arithmetic guides scaling decisions.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Backpressure appears when producers generate work faster than consumers can process it. If producers create 8,000 jobs per second and consumers complete 5,000, the backlog grows by about 3,000 jobs per second. A finite queue can therefore be exhausted after a calculable interval. Queue depth alone is less informative than queue growth rate and age of the oldest work.\n\nDeeper reasoning:\nBackpressure is a conservation problem: if arrival rate stays above service rate, backlog must grow. Capacity calculations make that fact visible and provide a basis for deciding when to scale or shed work.",
              },
              {
                title: "Worked example",
                content: "If a queue can hold 9 million jobs and backlog grows steadily by 3,000 jobs per second, capacity would be exhausted in about 3,000 seconds, or 50 minutes, under those assumptions. Adding workers, improving processing efficiency, reducing incoming work, or prioritizing jobs can change the outcome.",
              },
              {
                title: "Practical application",
                content: "Monitor arrival rate, completion rate, depth, oldest-message age, retry volume, and worker saturation. Define overload behavior for low-priority work rather than allowing every workload to compete equally.",
              },
            ],
          },
          {
            title: "Hot Partitions",
            slug: "hot-partitions",
            description: "Learn why average distribution can look healthy while a small number of keys or entities overload individual partitions.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Partitioning distributes data by a routing key, but workload distribution is not always the same as data distribution. A celebrity account, popular product, or heavily accessed tenant can create a hot partition even when the shard function is mathematically balanced. Hotspots require workload-aware mitigation.\n\nDeeper reasoning:\nHotspots require workload-aware partitioning. A perfectly balanced hash can still fail if one entity receives a disproportionate fraction of traffic. Protecting hot entities may require replication or a different access path.",
              },
              {
                title: "Worked example",
                content: "A user database hashes user IDs across 16 partitions. Most users generate little traffic, but one public account receives a huge share of reads. All of that account's requests still target one partition, which becomes CPU-bound while the other partitions remain lightly loaded.",
              },
              {
                title: "Practical application",
                content: "Use caching, replicated hot values, request coalescing, workload splitting, or specialized routing when appropriate. Monitor per-partition traffic and latency rather than relying only on cluster-wide averages.",
              },
            ],
          },
        ],
      },
      {
        title: "Design Process and Validation",
        slug: "design-process-and-validation",
        description: "Requirements, estimation, reusable patterns, iterative architecture, testing, documentation, common mistakes, and review.",
        topics: [
          {
            title: "Requirement Gathering",
            slug: "requirement-gathering",
            description: "Learn to turn ambiguous product goals into functional requirements, non-functional requirements, assumptions, and measurable constraints.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Requirement gathering defines the problem before architecture is selected. Functional requirements describe behavior; non-functional requirements describe qualities such as latency, availability, durability, security, and scale. Assumptions should be written down because architecture decisions depend on them. Clear requirements prevent overbuilding and expose the trade-offs that actually matter.\n\nDeeper reasoning:\nRequirements are assumptions that can be measured and challenged. Explicitly separating must-have features from optional behavior prevents architecture from being shaped by features that may never be used.",
              },
              {
                title: "Worked example",
                content: "For a food-delivery platform, functional requirements might include restaurant browsing, ordering, driver assignment, and delivery tracking. Non-functional targets could specify an availability objective, a latency target for browsing, expected daily users, and tolerance for temporary tracking delays.",
              },
              {
                title: "Practical application",
                content: "Separate must-have behavior from optional features. Record expected traffic, peak multipliers, object sizes, geographic scope, retention, and consistency needs. Revisit assumptions when workload measurements change.",
              },
            ],
          },
          {
            title: "Capacity Estimation",
            slug: "capacity-estimation",
            description: "Learn to estimate request rate, peak load, storage growth, and bandwidth before committing to architecture.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Capacity estimation converts vague scale statements into approximate numbers. For example, 2 million daily users making 20 requests each produce 40 million requests per day, or roughly 463 requests per second on average. A peak multiplier can then estimate burst traffic. Similar arithmetic can estimate storage and network volume. These numbers are planning tools, not promises of exact production behavior.\n\nDeeper reasoning:\nEstimation does not need perfect numbers to be useful. Even rough arithmetic can reveal whether a single node, database, network link, or queue could plausibly handle the expected workload.",
              },
              {
                title: "Worked example",
                content: "If an application receives 50 million requests per day, the average rate is about 579 requests per second. If a design must handle an assumed 8x peak, the planning target becomes roughly 4,630 requests per second. If each response averages 12 KB, the payload bandwidth can then be estimated from the peak request rate.",
              },
              {
                title: "Practical application",
                content: "Use generous but explicit assumptions and label them. Estimate storage with indexes, replicas, backups, and growth included. Capacity planning should be revisited after real telemetry is available.",
              },
            ],
          },
          {
            title: "Design Patterns",
            slug: "design-patterns",
            description: "Learn reusable architectural patterns such as cache-aside, asynchronous processing, fan-out, replication, sharding, circuit breakers, and bulkheads.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "System design patterns are reusable responses to recurring problems. Cache-aside reduces repeated backend work, queues decouple slow tasks, fan-out separates consumers, replication provides copies, sharding partitions data, circuit breakers stop repeated calls to failing dependencies, and bulkheads isolate resource pools. Patterns are tools, not mandatory components.\n\nDeeper reasoning:\nPatterns are reusable only when their assumptions are understood. For example, cache-aside assumes a source of truth remains available, while sharding assumes requests can be routed using the chosen partition key. Learning the assumptions is more valuable than memorizing the pattern name.",
              },
              {
                title: "Worked example",
                content: "A marketplace uses cache-aside for popular product details, a queue for invoice generation, a fan-out event for analytics and notifications, and a circuit breaker around a recommendation provider. Each pattern exists because of a concrete workload or failure characteristic.",
              },
              {
                title: "Practical application",
                content: "Always state the problem a pattern solves and the cost it introduces. A queue adds eventual processing and operational complexity; sharding adds routing and cross-partition challenges; a circuit breaker requires sensible thresholds and recovery behavior.",
              },
            ],
          },
          {
            title: "Iterative Design",
            slug: "iterative-design",
            description: "Learn how to evolve a system from a simple architecture as measured workload and requirements grow.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A good architecture evolves in stages. A small product may start with a client, application server, and database. As traffic grows, a load balancer can distribute application instances; caching can reduce repeated reads; queues can move expensive work off the request path; replicas or sharding can address database constraints. The sequence should follow observed bottlenecks rather than speculation.\n\nDeeper reasoning:\nIterative architecture reduces premature complexity. A simple version can provide real measurements that guide the next change, making later distribution decisions evidence-based instead of speculative.",
              },
              {
                title: "Worked example",
                content: "Version one of a study portal uses one application and one database. When read traffic grows, a cache is introduced. When document processing becomes slow, jobs move to workers through a queue. When read capacity becomes the next bottleneck, replicas are evaluated.",
              },
              {
                title: "Practical application",
                content: "Keep the architecture understandable at each stage. Introduce a component only when it solves a known problem or provides a justified operational capability. Record why a component exists so future engineers can remove it when it is no longer useful.",
              },
            ],
          },
          {
            title: "Testing and Validation",
            slug: "testing-and-validation",
            description: "Learn how to validate functionality, load behavior, failure handling, and recovery.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Distributed systems need more than unit tests. Functional tests verify correctness; load tests expose capacity and latency behavior; failure tests reveal how the system behaves when dependencies disappear; recovery tests verify that service can return after faults. A backup that has never been restored is an assumption, not a proven recovery mechanism.\n\nDeeper reasoning:\nValidation should test both correctness and behavior under stress. A system that works at low load can still fail because of connection exhaustion, queue growth, replication lag, or retry amplification.",
              },
              {
                title: "Worked example",
                content: "A service is tested at expected peak traffic while measuring p95 latency and error rate. A database replica is then made unavailable, a queue backlog is introduced, and a dependency timeout is simulated. Finally, a restore procedure is exercised in an isolated environment and the recovered data is validated.",
              },
              {
                title: "Practical application",
                content: "Test realistic failure modes and define pass/fail criteria. Include degraded dependencies, delayed messages, duplicate events, network errors, and restart scenarios. Validate recovery time and data loss objectives where those requirements exist.",
              },
            ],
          },
          {
            title: "Documentation",
            slug: "documentation",
            description: "Learn what an architecture document should record and why trade-offs must be explicit.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Architecture documentation captures requirements, assumptions, APIs, data ownership, scaling expectations, failure modes, security decisions, consistency choices, and trade-offs. Good documentation explains not only what was selected but why alternatives were rejected. This preserves decision context and reduces repeated design work.\n\nDeeper reasoning:\nDocumentation is part of system reliability because future operators need to know why a dependency exists and what assumptions it relies on. Record decisions in terms that can be checked against production measurements.",
              },
              {
                title: "Worked example",
                content: "A media platform documents that direct-to-object-storage uploads were chosen because application servers should not carry multi-gigabyte payloads. It also records the trade-off: upload authorization and completion tracking become more complex, and the platform must monitor incomplete uploads.",
              },
              {
                title: "Practical application",
                content: "Keep diagrams and written contracts synchronized with implementation. Record assumptions that can expire, such as traffic forecasts or retention periods. Documentation should help an engineer operate and change the system, not merely describe boxes.",
              },
            ],
          },
          {
            title: "Common Design Mistakes",
            slug: "common-design-mistakes",
            description: "Learn recurring architectural mistakes involving premature technology choices, missing numbers, failure handling, hotspots, and incorrect use of synchronous or asynchronous work.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Common mistakes usually come from skipping reasoning steps. Choosing technologies before defining the workload can create unnecessary complexity. Ignoring numbers hides capacity problems. Ignoring failures produces fragile designs. Synchronous-everything increases coupling, while asynchronous-everything can make critical state transitions confusing. Lack of idempotency and observability makes retries and diagnosis much harder.\n\nDeeper reasoning:\nDesign mistakes are often symptoms of missing reasoning rather than missing technology. A useful review asks whether every component has a workload, failure, and operational justification.",
              },
              {
                title: "Worked example",
                content: "Instead of starting with a list of products, begin with requirements, workload, constraints, architecture, and then technology choices. If a service is expected to handle 10 million users, estimate request rate, peak traffic, storage, and bandwidth before deciding whether sharding or a queue is necessary.",
              },
              {
                title: "Practical application",
                content: "Review every component by asking what problem it solves, what happens when it fails, and how it scales. Look specifically for hot keys, hot partitions, unbounded retries, unbounded queues, and hidden synchronous dependencies.",
              },
            ],
          },
          {
            title: "System Design Review Checklist",
            slug: "system-design-review-checklist",
            description: "Learn a reusable checklist for reviewing functionality, scale, performance, reliability, data, asynchronous processing, real-time behavior, media, security, and observability.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A design review should examine the system from several angles. Functionality covers features, APIs, data models, and flows. Scale covers users, request rates, peaks, storage, and bandwidth. Reliability covers replication, failover, retries, timeouts, circuit breakers, recovery, and degradation. Data review covers indexes, partitioning, read/write patterns, and consistency. Async, real-time, media, security, and observability each need their own checks.\n\nDeeper reasoning:\nA checklist is valuable because distributed designs have many dimensions that are easy to forget. It should be the final verification layer after the architecture and trade-offs have already been reasoned through.",
              },
              {
                title: "Worked example",
                content: "Before launching a document platform, review whether uploads are authorized and resumable, whether processing jobs have retry and dead-letter behavior, whether search indexing can recover, whether CDN caching is safe, whether database backups have been restored successfully, and whether traces can identify slow requests.",
              },
              {
                title: "Practical application",
                content: "Use the checklist as a final pass, not as a substitute for design reasoning. Every checked item should have a concrete implementation or documented decision behind it.",
              },
            ],
          },
        ],
      },
      {
        title: "Applied System Designs",
        slug: "applied-system-designs",
        description: "End-to-end architecture studies for video, chat, e-commerce, URL shortening, notifications, and live dashboards.",
        topics: [
          {
            title: "Complete Example: Video Platform",
            slug: "complete-example-video-platform",
            description: "Study a complete video-platform architecture that combines storage, asynchronous processing, search, recommendations, and edge delivery.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A video platform has two very different paths: metadata and control operations are relatively small, while video bytes and processing workloads are large. A scalable design separates these concerns. The client reaches the application through an edge layer; metadata services manage ownership and state; uploads use temporary authorization to object storage; processing workers transcode and generate thumbnails; CDN infrastructure serves popular processed media.\n\nDeeper reasoning:\nThe video example demonstrates why data size changes architecture. Large media, transactional metadata, asynchronous processing, and global delivery have different resource profiles and should not be forced through one synchronous path.",
              },
              {
                title: "Worked example",
                content: "A creator requests an upload authorization, uploads a 1.2 GB video directly to object storage, and marks the upload complete. A queue triggers transcoding and moderation workers. Once processed objects are ready, metadata is updated and the CDN can serve playback assets. Search indexing and recommendation updates happen asynchronously.",
              },
              {
                title: "Practical application",
                content: "Keep large bytes off the synchronous API path. Track processing states such as uploading, processing, ready, and failed. Design for partial upload retries, worker retries, object lifecycle cleanup, and CDN cache behavior.",
              },
            ],
          },
          {
            title: "Complete Example: Chat System",
            slug: "complete-example-chat-system",
            description: "Study the architecture of a scalable chat system including live connections, message persistence, routing, and reconnect recovery.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Chat combines persistent connections with durable message state. WebSocket servers manage live connections, while a connection registry helps locate where a user is connected. Messages should have durable identifiers and persistence semantics independent of the live socket. Queues or messaging infrastructure can decouple routing and processing. Reconnect logic must recover missed messages rather than assuming connections are permanent.\n\nDeeper reasoning:\nChat systems illustrate the difference between connection state and message state. A socket can disappear at any time, so durable message identity and recovery rules are essential for reliable user experience.",
              },
              {
                title: "Worked example",
                content: "A sender creates message 8001 for conversation 44. The message service persists it and determines that the recipient is connected to WebSocket node B. Node B delivers it live. If the recipient disconnects, the next connection authenticates, identifies the last acknowledged message, requests missed messages, and then returns to live delivery.",
              },
              {
                title: "Practical application",
                content: "Plan for reconnect storms, duplicate delivery, ordering requirements, offline users, message retention, and connection-server failure. The live channel should be treated as a delivery mechanism, not the only copy of important state.",
              },
            ],
          },
          {
            title: "Complete Example: E-Commerce Platform",
            slug: "complete-example-e-commerce-platform",
            description: "Study how catalog, cart, order, payment, search, recommendation, cache, queues, and notifications fit into one business architecture.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "An e-commerce platform contains transactional and secondary workloads with different correctness needs. Catalog and order data need durable transactional handling, while analytics, recommendations, and many notifications can be asynchronous. The architecture therefore combines an edge layer, gateway, domain services, cache, primary data store, queues, object storage, and independent consumers.\n\nDeeper reasoning:\nE-commerce combines strict and relaxed consistency in one product. Order and payment state need strong protection, while analytics and recommendations can often tolerate delayed processing. Architecture should reflect those different business priorities.",
              },
              {
                title: "Worked example",
                content: "A customer submits an order. The order service validates inventory, creates the order, coordinates payment, and publishes an OrderCreated event. Notification and analytics consumers process the event independently. If notification is unavailable, the completed order does not need to be rolled back merely because a secondary side effect is delayed.",
              },
              {
                title: "Practical application",
                content: "Keep the critical transaction narrow. Use idempotency for retried order or payment requests, define inventory consistency carefully, and make secondary consumers independently retryable and observable.",
              },
            ],
          },
          {
            title: "Deep Example: URL Shortener",
            slug: "deep-example-url-shortener",
            description: "Study a complete URL-shortening design with identifier generation, caching, read-heavy traffic, and failure considerations.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A URL shortener maps a compact code to an original URL and redirects users when the code is requested. Creation traffic is usually much smaller than redirect traffic, so the architecture should optimize the read path. A durable mapping store provides the source of truth, while popular codes can be cached near the application or edge.\n\nDeeper reasoning:\nA URL shortener is a useful example of asymmetric traffic: creation is relatively small while redirects can be enormous. This naturally leads to a read-optimized architecture with aggressive caching and simple durable mappings.",
              },
              {
                title: "Worked example",
                content: "A creation request stores a generated identifier mapped to https://example.test/articles/large-topic and returns a short code such as xY7k. A redirect request first checks a distributed cache for xY7k. On a miss it reads the mapping store, fills the cache, and redirects the client.",
              },
              {
                title: "Practical application",
                content: "Use a collision-safe identifier strategy. Consider expiration, abuse controls, custom aliases, cache invalidation, analytics, and regional traffic. Because redirects can dominate traffic, edge caching and read scaling may matter more than optimizing creation.",
              },
            ],
          },
          {
            title: "Deep Example: Notification Platform",
            slug: "deep-example-notification-platform",
            description: "Study how a high-volume notification platform can separate event ingestion, preference checks, scheduling, and provider delivery.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A notification platform receives business events and turns them into messages across channels. The architecture should separate ingestion from delivery so a slow provider does not block event producers. A queue buffers work, preference and template services determine what should be sent, and channel workers communicate with external providers. Delivery results can feed retry and analytics flows.\n\nDeeper reasoning:\nA notification platform demonstrates why provider calls should be decoupled from event ingestion. The system can absorb bursts, apply preferences, retry transient failures, and isolate provider-specific limits from the rest of the application.",
              },
              {
                title: "Worked example",
                content: "An order-completed event enters the notification pipeline. The system checks whether the user allows email, renders a receipt template, places the job on an email queue, and a worker calls the provider. A transient provider failure schedules bounded retry with backoff; a permanently failing message moves to a review path.",
              },
              {
                title: "Practical application",
                content: "Partition work by channel or priority when necessary. Protect providers with rate limits, deduplicate repeated events, and track delivery states. Avoid sending notifications that violate user preferences even if an upstream event is duplicated.",
              },
            ],
          },
          {
            title: "Deep Example: Live Dashboard",
            slug: "deep-example-live-dashboard",
            description: "Study how a live operational dashboard can combine event streams, caching, WebSocket or SSE delivery, and resilient aggregation.",
            estimatedMinutes: 20,
            sections: [
              {
                title: "Detailed explanation",
                content: "A live dashboard needs fresh data without forcing every browser to poll aggressively. An ingestion pipeline receives events, aggregation workers compute useful summaries, and a real-time delivery layer pushes updates to connected clients. A snapshot or cache can provide initial state before live events begin.\n\nDeeper reasoning:\nA live dashboard demonstrates a snapshot-plus-stream model. A snapshot gives a consistent starting point, while live events keep the view fresh. This also makes reconnect behavior easier to reason about.",
              },
              {
                title: "Worked example",
                content: "A fleet dashboard receives vehicle telemetry through an ingestion stream. Aggregators maintain current counts and recent values. When a browser connects, it receives a current snapshot and then subscribes to live updates through SSE. If the connection drops, the client reconnects and receives a fresh snapshot before continuing.",
              },
              {
                title: "Practical application",
                content: "Define acceptable staleness and event ordering. Avoid sending every raw event to every browser if clients only need aggregates. Monitor connection counts, event rates, processing lag, and reconnect volume.",
              },
            ],
          },
        ],
      },
      {
        title: "Practice and Synthesis",
        slug: "practice-and-synthesis",
        description: "Hands-on exercises and a reusable mental model for applying system-design principles.",
        topics: [
          {
            title: "Practical Exercises",
            slug: "practical-exercises",
            description: "Practice system-design reasoning through progressively richer architecture exercises without relying on memorized solutions.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Practical exercises turn individual concepts into design judgment. Start with a small service and add constraints one at a time: more users, higher read traffic, larger objects, stricter consistency, regional failures, or bursty asynchronous work. The goal is to observe which component becomes the bottleneck and then introduce the smallest useful change.\n\nDeeper reasoning:\nExercises are most useful when constraints change between iterations. Add traffic, failures, larger objects, stricter consistency, or new regions and observe which original assumptions break.",
              },
              {
                title: "Worked example",
                content: "Exercise one: design a course catalog for 100,000 users. Exercise two: add 10 million daily reads and decide where caching belongs. Exercise three: add video uploads and move binary data to object storage. Exercise four: add live progress updates and compare polling, SSE, and WebSocket. Exercise five: simulate a database outage and document the degraded behavior.",
              },
              {
                title: "Practical application",
                content: "For each exercise, record requirements, estimates, APIs, data model, architecture, bottlenecks, failure modes, and trade-offs. After finishing, change one assumption and redesign only the affected portion.",
              },
            ],
          },
          {
            title: "Master System Design Mental Model",
            slug: "master-system-design-mental-model",
            description: "Build a reusable mental model that connects requirements, estimates, APIs, data, architecture, bottlenecks, reliability, security, and trade-offs.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "A compact mental model is: requirements -> workload -> constraints -> interfaces -> data model -> simple architecture -> bottleneck analysis -> scaling -> failure handling -> security -> observability -> trade-offs. The sequence keeps each decision connected to a reason. It also helps distinguish a necessary component from decorative complexity.\n\nDeeper reasoning:\nThe mental model is a debugging tool as much as a design tool. When an architecture feels confusing, return to requirements and trace one critical request until every component has a reason.",
              },
              {
                title: "Worked example",
                content: "Imagine a photo-sharing service. Requirements define upload, viewing, and sharing. Workload estimates show that reads dominate writes and photos are large. That leads toward CDN and object storage for media, a database for metadata, caching for popular objects, queues for image processing, and a real-time or notification path only where the product actually needs it.",
              },
              {
                title: "Practical application",
                content: "When stuck, return to the flow and ask one question at a time: what is the critical user path, what data does it need, what is slowest, what happens when it fails, and how will the system behave at peak load? This prevents premature jumping to infrastructure products.",
              },
            ],
          },
          {
            title: "Final Takeaway",
            slug: "final-takeaway",
            description: "Consolidate the core system-design principles into a practical learning framework for building understandable, scalable, and resilient systems.",
            estimatedMinutes: 21,
            sections: [
              {
                title: "Detailed explanation",
                content: "Strong system design is disciplined trade-off management. Start with user behavior and measurable requirements. Choose data models from access patterns. Scale only the constrained component. Keep large or slow work off critical paths when appropriate. Treat failure, security, and observability as first-class design concerns. Prefer simple architectures until real requirements justify additional distribution.\n\nDeeper reasoning:\nThe final synthesis is that scalable architecture is not a collection of products. It is a set of deliberate boundaries, data flows, capacity assumptions, failure behaviors, and trade-offs that fit the workload.",
              },
              {
                title: "Worked example",
                content: "A mature architecture for a learning platform may combine a CDN for static assets, a load balancer for stateless application instances, a cache for hot reads, a transactional database for core state, object storage for files, queues for background work, specialized indexes for search, and observability across every boundary. Each component has a reason and a defined failure behavior.",
              },
              {
                title: "Practical application",
                content: "The best designs are explainable. An engineer should be able to trace a request through the system, identify where data lives, estimate capacity, describe what happens during failure, and explain why each major architectural choice was made.",
              },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("Starting System Design database seed...");

  try {
    await prisma.$connect();
    console.log("Prisma connected successfully.");

    const before = await prisma.studyCategory.findUnique({
      where: { slug: categorySeed.slug },
      select: { id: true, slug: true, name: true },
    });

    console.log(
      before
        ? `Existing category found: ${before.name} (${before.id})`
        : `Category not found. It will be created: ${categorySeed.slug}`,
    );

    const category = await prisma.studyCategory.upsert({
      where: { slug: categorySeed.slug },
      update: {
        name: categorySeed.name,
        description: categorySeed.description,
        icon: categorySeed.icon,
        isPublished: true,
        sortOrder: categorySeed.sortOrder,
      },
      create: {
        name: categorySeed.name,
        slug: categorySeed.slug,
        description: categorySeed.description,
        icon: categorySeed.icon,
        isPublished: true,
        sortOrder: categorySeed.sortOrder,
      },
    });

    console.log(`Category ready: ${category.name} | id=${category.id}`);

    let topicCount = 0;
    let sectionCount = 0;
    let moduleCount = 0;

    for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
      const pathSeed = paths[pathIndex];

      console.log(`Path ${pathIndex + 1}/${paths.length}: ${pathSeed.name}`);

      const path = await prisma.studyPath.upsert({
        where: {
          categoryId_slug: {
            categoryId: category.id,
            slug: pathSeed.slug,
          },
        },
        update: {
          name: pathSeed.name,
          description: pathSeed.description,
          level: pathSeed.level,
          isPublished: true,
          sortOrder: pathIndex,
        },
        create: {
          categoryId: category.id,
          name: pathSeed.name,
          slug: pathSeed.slug,
          description: pathSeed.description,
          level: pathSeed.level,
          isPublished: true,
          sortOrder: pathIndex,
        },
      });

      for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
        const moduleSeed = pathSeed.modules[moduleIndex];

        const studyModule = await prisma.studyModule.upsert({
          where: {
            studyPathId_slug: {
              studyPathId: path.id,
              slug: moduleSeed.slug,
            },
          },
          update: {
            title: moduleSeed.title,
            description: moduleSeed.description,
            isPublished: true,
            sortOrder: moduleIndex,
          },
          create: {
            studyPathId: path.id,
            title: moduleSeed.title,
            slug: moduleSeed.slug,
            description: moduleSeed.description,
            isPublished: true,
            sortOrder: moduleIndex,
          },
        });

        moduleCount++;
        const topicsForModule = moduleSeed.topics ?? [];
        console.log(
          `  Module ${moduleIndex + 1}/${pathSeed.modules.length}: ${moduleSeed.title} -> ${topicsForModule.length} topics`,
        );

        for (let topicIndex = 0; topicIndex < topicsForModule.length; topicIndex++) {
          const topicSeed = topicsForModule[topicIndex];
          const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;

          const topic = await prisma.studyTopic.upsert({
            where: {
              categoryId_slug: {
                categoryId: category.id,
                slug: topicSlug,
              },
            },
            update: {
              title: topicSeed.title,
              moduleId: studyModule.id,
              seoDescription: topicSeed.description,
              estimatedMinutes: topicSeed.estimatedMinutes,
              isPublished: true,
              sortOrder: topicIndex,
              prerequisiteIds: [],
              relatedTopicIds: [],
            },
            create: {
              categoryId: category.id,
              moduleId: studyModule.id,
              title: topicSeed.title,
              slug: topicSlug,
              seoDescription: topicSeed.description,
              estimatedMinutes: topicSeed.estimatedMinutes,
              isPublished: true,
              sortOrder: topicIndex,
              prerequisiteIds: [],
              relatedTopicIds: [],
            },
          });

          topicCount++;
          console.log(`    Topic ${topicCount}: ${topic.title} [${topic.id}]`);

          const sections = topicSeed.sections ?? [];
          for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
            const section = sections[sectionIndex];

            await prisma.studyTopicSection.upsert({
              where: { id: `${topic.id}-section-${sectionIndex}` },
              update: {
                title: section.title,
                content: section.content,
                sortOrder: sectionIndex,
              },
              create: {
                id: `${topic.id}-section-${sectionIndex}`,
                topicId: topic.id,
                title: section.title,
                content: section.content,
                sortOrder: sectionIndex,
              },
            });

            sectionCount++;
          }
        }
      }
    }

    // Verify the exact records created by this seed using the same IDs/keys
    // used during insertion. This prevents a false "success" message.
    const dbCategory = await prisma.studyCategory.findUnique({
      where: { id: category.id },
      select: { id: true, slug: true, name: true },
    });

    const dbPathCount = await prisma.studyPath.count({
      where: { categoryId: category.id },
    });

    const dbModuleCount = await prisma.studyModule.count({
      where: {
        studyPath: {
          categoryId: category.id,
        },
      },
    });

    const dbTopicCount = await prisma.studyTopic.count({
      where: { categoryId: category.id },
    });

    const dbSectionCount = await prisma.studyTopicSection.count({
      where: {
        topic: {
          categoryId: category.id,
        },
      },
    });

    console.log("--------------------------------------------------");
    console.log("SYSTEM DESIGN SEED VERIFICATION");
    console.log("--------------------------------------------------");
    console.log(`Category : ${dbCategory?.name ?? "NOT FOUND"}`);
    console.log(`Category ID : ${category.id}`);
    console.log(`Category Slug : ${category.slug}`);
    console.log(`Paths : ${dbPathCount}`);
    console.log(`Modules : ${dbModuleCount}`);
    console.log(`Topics : ${dbTopicCount}`);
    console.log(`Sections : ${dbSectionCount}`);
    console.log("--------------------------------------------------");

    if (!dbCategory) {
      throw new Error("Verification failed: System Design category was not found after upsert.");
    }

    if (dbTopicCount === 0) {
      throw new Error(
        `Verification failed: 0 topics exist for category ${category.id}. The seed did not write topics to the database used by this Prisma client.`,
      );
    }

    if (dbTopicCount !== topicCount) {
      throw new Error(
        `Verification failed: seed processed ${topicCount} topics, but database contains ${dbTopicCount} topics for this category.`,
      );
    }

    console.log(`SUCCESS: ${topicCount} System Design topics inserted/updated successfully.`);
    console.log(`SUCCESS: ${sectionCount} sections inserted/updated successfully.`);
    console.log(`SUCCESS: ${moduleCount} modules inserted/updated successfully.`);
  } catch (error) {
    console.error("==================================================");
    console.error("SYSTEM DESIGN SEED FAILED");
    console.error("==================================================");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
