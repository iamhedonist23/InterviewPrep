import { PrismaClient, StudyLevel } from "@prisma/client";
const prisma = new PrismaClient();

type TopicSeed = { title: string; slug: string; description: string; estimatedMinutes: number; sections?: Array<{ title: string; content: string }> };
type ModuleSeed = { title: string; slug: string; description: string; topics?: TopicSeed[] };
type PathSeed = { name: string; slug: string; description: string; level: StudyLevel; modules: ModuleSeed[] };
type CategorySeed = { name: string; slug: string; description: string; icon: string; sortOrder: number };

const categorySeed: CategorySeed = {
  name: "Redis",
  slug: "redis",
  description: "Learn Redis from foundations through data structures, modeling, performance, scripting, operations, replication, scaling, and practical application design.",
  icon: "⚡",
  sortOrder: 1,
};

const path0: PathSeed = {
  name: "Redis Foundations",
  slug: "redis-foundations",
  description: "Core Redis concepts, setup, keys, memory, and persistence.",
  level: StudyLevel.BEGINNER,
  modules: [
    {
      title: "Redis Foundations",
      slug: "redis-foundations-module",
      description: "Core Redis concepts, setup, keys, memory, and persistence.",
      topics: [
        {
          title: "What Redis Is",
          slug: "what-redis-is",
          description: "Redis fundamentals and where its key-oriented, in-memory model fits in an application architecture.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "Redis is best understood as a high-speed, key-oriented data system in which the application chooses a data structure that matches the operations it performs. Its in-memory working set makes short, direct operations very fast, while persistence and replication can be added when the workload needs recovery or redundancy. The important design idea is not simply “keep data in RAM”; it is to shape the stored representation around the application's questions. A counter, membership test, recent-event feed, ranking, and mutable object each have different access patterns, so they can use different Redis structures. Redis therefore often complements a primary database instead of replacing it. Durable business records, complex relationships, and arbitrary analytical queries may belong elsewhere, while Redis can handle caches, counters, temporary state, queues, rankings, and fast lookups. Good Redis design starts by listing the reads and writes the application must perform, then selecting structures and keys that make those operations direct." },
            { title: "Example", content: "A course platform can keep the authoritative course catalog in a database while using Redis for `cache:course:42`, a string counter such as `views:course:42`, a set such as `course:42:learners`, and a sorted set for popular courses. Each structure exists because it answers a different question efficiently." },
            { title: "Practical use", content: "Use Redis when low-latency access and simple, predictable operations are more important than arbitrary querying. Treat it as one component of the architecture and explicitly decide which data is authoritative, which data is derived, and which data may safely expire." },
          ],
        },
        {
          title: "Getting Started",
          slug: "getting-started",
          description: "Redis server, client interaction, basic commands, server inspection, and logical databases.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "A Redis deployment has a server process that owns the data and clients that communicate with it using commands. A beginner should first learn the request/response cycle rather than memorizing a long command list: connect, write a value, read it, inspect server information, and understand the logical database context. The classic command-line workflow uses `redis-cli`, while the server listens on the default port discussed by the supplied material, 6379. Logical database numbers provide separate key namespaces within one instance, but they are not equivalent to separate machines or independent Redis deployments. For learning, start with tiny experiments and observe the result of every command. This builds an accurate mental model for later topics such as TTL, transactions, scanning, and persistence." },
            { title: "Example", content: "Start with `SET greeting \"hello\"` and then `GET greeting`. Next inspect server information with `INFO`, and, where logical databases are enabled in the deployment, switch context with `SELECT 1` and verify that a key created there is separate from the same key name in database 0." },
            { title: "Practical use", content: "Use a disposable development instance for experiments. Keep a small command transcript while learning so that you can connect each command to the resulting state rather than treating Redis as a black box." },
          ],
        },
        {
          title: "Keys and Values",
          slug: "keys-and-values",
          description: "Key naming, value representation, namespaces, and the access-pattern mindset.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "A Redis key is the address through which an application reaches a stored value. Redis does not interpret a colon as a namespace operator, but names such as `user:42`, `cart:user:42`, and `cache:product:900` create a human-readable convention. Good names are predictable, sufficiently descriptive, and not unnecessarily long because key bytes also consume memory. Values can be scalar text or serialized application data, but Redis generally does not infer the application's object schema from a generic value. This makes the access-pattern rule essential: if an application frequently asks for users by email, storing only `user:<id>` objects is not enough to make email lookup direct. A separate lookup structure can map email to ID. The same principle applies to every alternate query. Instead of expecting Redis to discover relationships by scanning unrelated keys, model those relationships explicitly." },
            { title: "Example", content: "For a customer service application, use `customer:804` for the main record and `customer:lookup:email` for an email-to-ID mapping. A login request first resolves the email to `804`, then reads `customer:804`." },
            { title: "Practical use", content: "Define a key naming convention before a Redis-backed feature grows. Document the owner and lifecycle of each key family, especially whether it is authoritative, derived, temporary, or a lookup index." },
          ],
        },
        {
          title: "Memory and Persistence",
          slug: "memory-and-persistence",
          description: "Memory planning plus snapshot and append-oriented persistence trade-offs.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "Redis's fast working set depends on memory, so capacity planning must consider much more than the number of keys. Key bytes, value bytes, data-structure overhead, collection cardinality, replicas, client buffers, and temporary work can all contribute to RAM usage. Persistence changes the failure model: a snapshot captures state at a point in time, while an append-oriented approach records changes so state can be reconstructed. The two approaches have different write overhead, recovery characteristics, and amounts of recent data that may be exposed after a failure. Persistence should therefore follow business recovery requirements. Losing a few minutes of a disposable cache may be acceptable; losing committed business state may not be. Persistence also does not remove the need for capacity planning because the live working set still has to fit comfortably in memory." },
            { title: "Example", content: "Suppose a service keeps 2 million session keys averaging 1.5 KB each. The rough payload alone is several gigabytes, before Redis overhead, fragmentation, replicas, and operational headroom. A snapshot may protect a recovery point, but it does not make the live dataset smaller." },
            { title: "Practical use", content: "Estimate average and worst-case object sizes, measure real memory usage, leave operational headroom, and test restoration. Treat persistence settings as part of the recovery design rather than as a generic performance toggle." },
          ],
        },
      ],
    },
  ],
};

const path1: PathSeed = {
  name: "Core Data Structures",
  slug: "redis-data-structures",
  description: "Strings, hashes, lists, sets, sorted sets, and structure selection.",
  level: StudyLevel.INTERMEDIATE,
  modules: [
    {
      title: "Core Data Structures",
      slug: "redis-data-structures-module",
      description: "Strings, hashes, lists, sets, sorted sets, and structure selection.",
      topics: [
        {
          title: "Strings",
          slug: "strings",
          description: "Scalar values, serialized objects, counters, ranges, append operations, and bit-oriented storage.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "Strings are the simplest Redis value type and are useful whenever the application can treat a value as one scalar or one serialized unit. Typical uses include flags, tokens, counters, cached API responses, compact serialized objects, and byte-oriented data. A string is especially convenient when the application normally reads or replaces the whole value. If individual fields change independently, repeatedly decoding and rewriting a large serialized object may be less attractive than a hash. Numeric strings can participate in atomic increment operations, making them useful for counters without an application-side read-modify-write race. Strings also support operations such as length, ranges, append, and bit manipulation. The important boundary is representation: a value stored as `\"Maya\"` is not a numeric counter simply because another command can operate on strings that contain numbers." },
            { title: "Example", content: "A news site can store `article:900:views` as a numeric string and increment it as visits arrive. It can separately store `cache:article:900` as a serialized response with a TTL. The two keys have different purposes even though both use the string type." },
            { title: "Practical use", content: "Choose strings for whole-value access, counters, cache entries, and naturally byte-oriented data. Avoid treating serialized formats as arbitrary strings when field-level mutation or structured querying is a frequent requirement." },
          ],
        },
        {
          title: "Hashes",
          slug: "hashes",
          description: "Field-value objects, partial updates, lookup maps, and consistency implications of secondary indexes.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "A Redis hash stores multiple field-value pairs under one top-level key, making it a natural representation for objects whose fields are accessed independently. Instead of replacing an entire serialized customer object when only the city changes, an application can update the city field directly. Hashes also work well as compact lookup maps, such as email-to-user-ID mappings, and as grouped collections where the top-level key identifies the owner. The major modeling benefit is locality: related fields can live together while individual fields remain addressable. The major risk appears when a hash is used as a manually maintained index. Whenever an indexed attribute changes, the application must remove the old mapping and create the new one. If that update is missed, reads can follow stale references. Hashes therefore simplify field updates but do not eliminate consistency responsibilities." },
            { title: "Example", content: "Store `employee:301` with fields `name`, `team`, `level`, and `office`. If the employee moves teams, update only `team`. Separately, `employee:lookup:email` can map `arjun@example.test` to `301` without duplicating the employee object." },
            { title: "Practical use", content: "Use hashes for independently updated object fields and simple lookup maps. Define rules for creation, updates, deletion, and index repair so secondary mappings cannot silently drift from the primary object." },
          ],
        },
        {
          title: "Lists",
          slug: "lists",
          description: "Ordered collections, recent-item feeds, bounded lists, queues, blocking consumption, and batching.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "Lists represent ordered sequences and are useful when position matters. They fit recent-item feeds, activity histories, and simple producer-consumer queues. A common pattern is to add a new item at one end and retain only a bounded number of entries so the structure cannot grow without limit. For queues, producers add jobs while workers remove them from the opposite side, creating FIFO behavior when the chosen operations are consistent. Blocking list operations can let workers wait for work instead of repeatedly polling an empty queue. Lists often store identifiers rather than full objects; this keeps the list small and lets the application retrieve the current object separately. That design introduces network round trips, so multi-key retrieval and pipelining become important when many IDs must be resolved. A list is therefore strongest when order is central and the required window or queue semantics are clear." },
            { title: "Example", content: "For a learning dashboard, keep the latest 25 lesson events in `activity:user:73`. Add new event IDs to the front and trim old entries. When the user opens the dashboard, retrieve the IDs and then fetch the corresponding event data efficiently." },
            { title: "Practical use", content: "Use lists for ordered data, especially recent-N windows and simple queues. Always define a retention limit for feeds and a failure strategy for queues if jobs cannot simply disappear after a worker failure." },
          ],
        },
        {
          title: "Sets",
          slug: "sets",
          description: "Unique membership, set algebra, tags, permissions, and relationship modeling.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "A Redis set stores unique members, so membership rather than position is the central operation. This makes sets a strong fit for permissions, tags, group membership, feature enrollment, and relationship lists where duplicates have no meaning. Set algebra adds another advantage: intersections answer “members common to both groups,” unions combine memberships, and differences express exclusion. Because the structure represents uniqueness directly, the application does not need to sort or deduplicate a list just to answer a membership question. Sets can also serve as feature rollout groups, such as a set of user IDs allowed to try a new checkout flow. The modeling question is whether the application cares about order. If order is essential, a list or sorted set may be more appropriate. If the primary questions are “is this member present?” or “what members are shared?” a set is usually a natural representation." },
            { title: "Example", content: "Keep `team:platform` and `team:security` as sets of employee IDs. Their intersection gives employees who belong to both teams. A separate `feature:fast-checkout` set can contain user IDs enrolled in a rollout." },
            { title: "Practical use", content: "Use sets when uniqueness and membership are the main requirements. If you later need ordering or a numeric score, reconsider the structure instead of forcing the set to simulate a ranking." },
          ],
        },
        {
          title: "Sorted Sets",
          slug: "sorted-sets",
          description: "Unique members with numeric scores, ranking, score ranges, and dynamic ordering.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "A sorted set combines unique members with numeric scores. The score determines ordering, which makes the structure particularly useful for leaderboards, reputation, popularity, priorities, and other ranked views. Unlike a manually maintained position number, the rank is derived from the current score, so updating a member's score naturally changes its position. Applications can also query ranges based on score or retrieve members by rank. The design should distinguish the member identity from the score meaning: a member might be a player ID while the score is points, or an item ID while the score represents a popularity calculation. Ties and score-update rules should be defined at the application level so the displayed ranking is deterministic when required. Sorted sets are valuable because the data structure itself captures the relationship between an entity and the number used to order it." },
            { title: "Example", content: "A coding game keeps `leaderboard:weekly` with players and scores: player 17 → 1840, player 22 → 2115, player 31 → 1975. When player 17 earns points, only the score needs to change; the ordering is recalculated by Redis's sorted-set machinery." },
            { title: "Practical use", content: "Use sorted sets when the application repeatedly asks for top-N members, rank, or score ranges. Keep the score definition stable and document how ties are displayed to users." },
          ],
        },
        {
          title: "Choosing the Right Data Structure",
          slug: "choosing-the-right-data-structure",
          description: "A practical decision process for selecting Redis structures from application operations.",
          estimatedMinutes: 20,
          sections: [
            { title: "Detailed explanation", content: "Structure selection should begin with the application's dominant operations, not with the names of Redis data types. A scalar value or complete cache entry points toward a string. Independently mutable object fields point toward a hash. Ordered recent data or a simple queue points toward a list. Unique membership and set algebra point toward a set. Member-plus-score ranking points toward a sorted set. The same application can and often should use several structures at once. A profile may be a hash, its recent actions a list, permissions a set, and reputation a sorted-set member. A common mistake is to force all data for one entity into one large structure even when the required operations are fundamentally different. Good modeling also considers lifecycle, cardinality, update frequency, consistency, and network access. The best structure is the one that makes the important operations direct while keeping state understandable and maintainable." },
            { title: "Example", content: "For a fitness application: `profile:user:7` can be a hash, `recent:workouts:7` a list, `badges:user:7` a set, and `ranking:weekly` a sorted set. No single structure is responsible for every feature." },
            { title: "Practical use", content: "Write down the top five read and write operations before designing keys. For each, identify the desired latency, collection size, ordering requirement, uniqueness requirement, and update pattern, then choose the simplest matching structure." },
          ],
        },
      ],
    },
  ],
};

const path2: PathSeed = {
  name: "Data Modeling and Performance",
  slug: "redis-data-modeling-performance",
  description: "Access-pattern modeling, complexity, references, networking, and transactions.",
  level: StudyLevel.INTERMEDIATE,
  modules: [
    {
      title: "Data Modeling and Performance",
      slug: "redis-data-modeling-performance-module",
      description: "Access-pattern modeling, complexity, references, networking, and transactions.",
      topics: [
        {
          title: "Big O Notation",
          slug: "big-o-notation",
          description: "How command complexity grows with collection size and why asymptotic cost matters.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Big O notation describes how an operation's work grows as the relevant amount of data grows. It is a planning tool, not a precise stopwatch. Constant-style O(1) behavior is attractive for direct membership or simple access; O(log N) grows slowly and commonly appears in ordered operations; O(N) means the work can grow in proportion to the collection or keyspace. Some commands have terms such as O(log N + M), where N is the search structure and M is the number of returned or processed elements. Sorting-style work may contain additional factors. The most important Redis lesson is to identify what N actually represents. A command that is harmless on a collection of 50 items may become a production problem on 20 million items. Complexity should therefore be evaluated together with cardinality, frequency, command blocking behavior, and network cost." },
            { title: "Example", content: "If a request scans a collection of 8 million members, the fact that each comparison is cheap does not make the operation harmless. A direct lookup that remains roughly constant-style is usually far safer for a hot request path than repeatedly traversing millions of elements." },
            { title: "Practical use", content: "For every hot command, ask what grows: number of keys, members, returned results, or sorted items. Combine Big O reasoning with production measurements and worst-case cardinality rather than relying on a benchmark with tiny data." },
          ],
        },
        {
          title: "Pseudo Multi-Key Queries",
          slug: "pseudo-multi-key-queries",
          description: "How to build explicit lookup structures when applications need alternate access paths.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Redis is primarily organized around keys and explicit structures rather than arbitrary relational predicates. When the application needs multiple ways to find the same object, model each important access path deliberately. Keep one canonical object key, then add a compact mapping from an alternate identifier to that canonical key. For example, a user can live at `user:42` while `user:lookup:email` maps an email address to `42`. The lookup path becomes deterministic: resolve the identifier, then fetch the object. This avoids storing two full copies of the user. The trade-off is consistency work because every alternate index is derived state. Creation, updates, renames, deletion, and repair must all be designed. This pattern is powerful precisely because it turns an implicit query into an explicit data structure. It should be used for access patterns that are important enough to justify the additional state." },
            { title: "Example", content: "A support system needs tickets by ticket ID and by external reference. Store the ticket once at `ticket:8821`; maintain `ticket:lookup:external` so `EXT-5519` resolves to `8821`. The application does not need to search every ticket key." },
            { title: "Practical use", content: "Create indexes only for real application queries. Document index ownership and recovery rules, and consider how stale mappings will be detected and repaired." },
          ],
        },
        {
          title: "References and Indexes",
          slug: "references-and-indexes",
          description: "ID references, manually maintained indexes, stale data, and cleanup design.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "References store identifiers that point to objects held elsewhere. This is useful for recent-item lists, relationship sets, category membership, and manual indexes because the full object is stored once. The design resembles normalized data modeling: one canonical record plus multiple lightweight access paths. The advantage is reduced duplication and easier object updates. The cost is that references can become broken or stale. If `product:88` is deleted while `featured:products` still contains `88`, a later read encounters a dangling reference. Likewise, changing an email requires the old email mapping to be removed and the new one to be created. Every derived reference therefore needs a lifecycle. In critical workflows, updates to the object and its indexes may need transactional or scripted treatment. References are not automatically maintained by Redis just because they look like relationships; the application owns their correctness." },
            { title: "Example", content: "`recent:orders:42` might contain order IDs 700, 701, and 705, while `order:700`, `order:701`, and `order:705` hold the details. Deleting order 701 requires a policy for removing or tolerating its old reference." },
            { title: "Practical use", content: "For each index, specify who writes it, when it changes, how deletion works, and how repair is performed. Keep the indexed value compact so derived structures do not become a second copy of the entire dataset." },
          ],
        },
        {
          title: "Round Trips",
          slug: "round-trips",
          description: "Network latency, multi-key commands, pipelining, batch sizing, and throughput.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "A Redis command is executed on a server, but the client and server still have to communicate. When latency between them is nontrivial, repeatedly sending one command, waiting, and sending the next can dominate the cost of otherwise fast operations. Multi-key commands can retrieve or update several independent values in one request when the data model allows it. Pipelining goes further by allowing a client to send a batch of commands without waiting for each individual response. The server still executes the commands, but the client avoids repeated network waits. Batch size is a trade-off: tiny batches leave network savings unused, while huge batches can increase memory usage and response bursts. Pipelining does not automatically make commands atomic; it is primarily a communication optimization. Transactions and scripts solve different problems." },
            { title: "Example", content: "An importer must write 50,000 small counters. Sending 50,000 request/response cycles can be dominated by latency. Sending commands in controlled pipeline batches can reduce network waiting while keeping memory use bounded." },
            { title: "Practical use", content: "Measure request latency and throughput before and after batching. Start with moderate batch sizes, watch client/server memory, and do not confuse reduced round trips with transactional semantics." },
          ],
        },
        {
          title: "Transactions",
          slug: "transactions",
          description: "Atomic commands, MULTI/EXEC, DISCARD, ordering, WATCH, optimistic concurrency, and retries.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Redis commands are individually atomic, but some business operations require several changes to be treated as one coordinated unit. `MULTI` queues commands and `EXEC` executes the queued sequence in order; `DISCARD` abandons a queued transaction. This is useful when several related updates should not be interleaved with other Redis command execution. `WATCH` provides optimistic concurrency control: the client watches keys, reads the current state, calculates a new value, queues its write, and attempts `EXEC`. If a watched key changed before execution, the transaction attempt can fail, allowing the application to retry or abort. This pattern is useful for conditional updates but can suffer from contention if many clients repeatedly modify the same hot key. Retry limits and backoff should therefore be part of the design. Transactions provide coordination semantics; they are not a replacement for durable business transactions in a relational system." },
            { title: "Example", content: "Suppose a seat inventory value is 1. Two clients read it. With optimistic concurrency, each watches the relevant key before calculating its update. If one client changes the key first, the other's transaction attempt detects the conflict instead of blindly overwriting the newer state." },
            { title: "Practical use", content: "Use a transaction when multiple Redis updates form one logical operation. Use WATCH for conditional read-modify-write behavior, and use a small retry policy so contention cannot create an uncontrolled retry storm." },
          ],
        },
      ],
    },
  ],
};

const path3: PathSeed = {
  name: "Safe Operations and Data Lifecycle",
  slug: "redis-safe-operations",
  description: "Keyspace discovery, expiration, queues, pub/sub, diagnostics, and sorting.",
  level: StudyLevel.INTERMEDIATE,
  modules: [
    {
      title: "Safe Operations and Data Lifecycle",
      slug: "redis-safe-operations-module",
      description: "Keyspace discovery, expiration, queues, pub/sub, diagnostics, and sorting.",
      topics: [
        {
          title: "KEYS Anti-Pattern",
          slug: "keys-anti-pattern",
          description: "Why whole-keyspace discovery can block work and how explicit structures and SCAN help.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "A whole-keyspace pattern search is convenient during small experiments but dangerous as a normal production request. A broad `KEYS` operation may inspect a very large number of keys in one server-side operation, so its work grows with the entire keyspace rather than the small result the application actually wants. On a busy instance, such work can delay unrelated commands. The deeper design problem is often missing data modeling: if the application repeatedly asks for “all records belonging to X,” it should usually maintain an explicit collection of IDs for X. For operational discovery, `SCAN` provides incremental iteration and avoids demanding one giant traversal. Even then, scanning is still work; it is not a free query engine. The safe principle is to model common application queries directly and reserve broad discovery for controlled administrative tasks." },
            { title: "Example", content: "Instead of searching millions of keys for all alerts belonging to tenant 91, maintain `alerts:tenant:91` containing alert IDs. A request can read that structure directly. An operator who truly needs to inspect cache keys can use incremental scanning outside the hot request path." },
            { title: "Practical use", content: "Audit production code for broad keyspace commands. Replace repeated discovery with explicit indexes or owner collections, and use incremental scans for maintenance jobs that genuinely require discovery." },
          ],
        },
        {
          title: "Expiration and TTL",
          slug: "expiration-and-ttl",
          description: "Temporary data, relative and absolute expiration, cache-aside behavior, and lifecycle design.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Expiration gives temporary data an explicit lifetime. A cache entry, session, reset token, or rate-limit record can be created with a TTL so the application does not need a separate cleanup process for every expired item. Relative expiration expresses a duration, while absolute expiration expresses a target time. TTL inspection helps diagnose whether an entry is approaching expiry, and removing expiration is possible when the application's lifecycle changes. Expiration should be part of the data model, not an afterthought: a cache without a lifecycle can grow indefinitely, while a business record given an accidental short TTL can disappear unexpectedly. Cache-aside is a common pattern: read the cache, use it on a hit, and on a miss load the authoritative source, store the result, attach a suitable lifetime, and return it. TTLs should reflect freshness requirements and acceptable recomputation cost." },
            { title: "Example", content: "A product recommendation response may be cached under `cache:recommendations:42` for 120 seconds. A password-reset token might have a much shorter lifetime. The two keys both expire, but their durations come from different business rules." },
            { title: "Practical use", content: "For every expiring key, document why it expires, what happens after a miss, and whether expiration should be refreshed on access. Never use TTL as a substitute for backup or durable storage." },
          ],
        },
        {
          title: "Simple Queues",
          slug: "simple-queues",
          description: "List-based work queues, blocking consumption, and reliability boundaries.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "A list can implement a lightweight work queue by placing jobs at one end and consuming them from the other. This is attractive for small systems because the data model is easy to understand and blocking consumption can let workers wait efficiently for new jobs. However, a basic list queue does not automatically provide every reliability feature that a production job system may require. If a worker removes a job and crashes before processing it, the application needs a recovery design. Retries, acknowledgments, dead-letter handling, visibility timeouts, scheduling, and idempotency may all matter depending on the workload. The right question is not whether Redis can hold jobs, but whether the delivery semantics match the business requirement. For transient internal work, a simple list may be enough; for critical workflows, additional structures or a dedicated messaging system may be appropriate." },
            { title: "Example", content: "A thumbnail service can put `resize:img:501`, `resize:img:502`, and `resize:img:503` into a queue. Workers block while waiting for work, take jobs, process them, and record completion according to the application's reliability policy." },
            { title: "Practical use", content: "Define what happens when a worker dies after claiming a job. If losing a job is unacceptable, design acknowledgment/retry behavior before adopting a simple list as the final production queue." },
          ],
        },
        {
          title: "Publish / Subscribe",
          slug: "publish-subscribe",
          description: "Channels, publishers, subscribers, pattern subscriptions, and delivery-model trade-offs.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Pub/sub is a broadcast communication model. A publisher sends a message to a channel, and all currently interested subscribers receive it. Pattern subscriptions can allow a subscriber to listen to families of channel names. This is useful for real-time notifications such as dashboard updates, lightweight application events, or live status signals. The important architectural distinction is delivery semantics: pub/sub is not the same as a durable work queue. A subscriber that is not listening at the relevant time may not receive a transient message, so pub/sub should not automatically be chosen for events that must be recoverable. Queue consumers typically compete for work, while pub/sub intentionally broadcasts one event to multiple listeners. Channel naming should reflect event ownership and domain boundaries so subscribers do not needlessly receive unrelated traffic." },
            { title: "Example", content: "A deployment dashboard subscribes to `ops:events` and receives messages such as “service restarted.” A notification service and a monitoring UI can both listen to the same channel because both are interested in the event." },
            { title: "Practical use", content: "Use pub/sub for low-latency notifications where transient delivery is acceptable. If every event must be replayable or acknowledged, choose a durable event/queue design instead of assuming pub/sub provides persistence." },
          ],
        },
        {
          title: "MONITOR",
          slug: "monitor",
          description: "Command-level diagnostics, useful investigations, and operational overhead.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "`MONITOR` is an operational diagnostic tool that exposes commands arriving at the Redis server. It can be useful when an application behaves differently from what its developers expect. For example, an engineer may believe a page performs one cache lookup but discover a loop issuing hundreds of requests. Command visibility can reveal unexpected key names, repeated reads, accidental polling, or inefficient client behavior. The tool should be used carefully because observing command traffic itself introduces overhead and can produce a large stream. It is therefore a debugging instrument rather than a normal application logging mechanism. When using it, reproduce a narrow test case, inspect the command pattern, and stop the diagnostic session once the behavior is understood." },
            { title: "Example", content: "A profile endpoint unexpectedly becomes slow. During a controlled reproduction, command monitoring reveals that the client fetches the same profile key repeatedly instead of caching the first result locally. The investigation then moves to the application code rather than blaming Redis blindly." },
            { title: "Practical use", content: "Use command-level monitoring for short, targeted investigations. Avoid leaving high-volume diagnostic streams running during normal production traffic, especially on busy instances." },
          ],
        },
        {
          title: "Slow Log",
          slug: "slow-log",
          description: "Finding expensive commands and turning latency symptoms into measurable investigations.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "The slow log helps separate general latency symptoms from specific expensive Redis operations. It records commands whose server-side execution exceeds a configured threshold, giving engineers evidence about which operations deserve inspection. A useful investigation connects application latency to a command, then asks why that command is expensive: is a collection unexpectedly large, is the command doing more work than intended, or is the access pattern poorly modeled? The slow log focuses on server execution time, so it should be combined with client-side measurements when diagnosing end-to-end latency. A network delay, client queue, or overloaded application can be slow even when Redis command execution is short. Conversely, a single expensive command can block other work because Redis command processing is sensitive to long-running operations." },
            { title: "Example", content: "If an API's p95 latency rises, inspect slow commands and discover a sort over an unexpectedly large collection. The next step is to inspect cardinality and determine whether the result can be precomputed, bounded, indexed, or cached." },
            { title: "Practical use", content: "Set a threshold appropriate to the workload, review slow entries during incidents, and correlate them with application traces. Optimize the command and its data model rather than merely raising the threshold." },
          ],
        },
        {
          title: "SORT",
          slug: "sort",
          description: "Sorting list/set values, limiting output, descending and lexical ordering, and cached sort results.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Redis can sort values from structures such as lists and sets, including cases where ordering is based on related data. Sorting is useful when the application needs a temporary ordered view rather than maintaining a permanent ranking structure. Result limits can keep a large response small, and descending order is useful for top-N displays. Lexicographic sorting is appropriate when the values represent names or other strings rather than numeric quantities. More complex sorting may use IDs in one structure and attributes stored elsewhere, which can increase the amount of work and data lookup involved. If the same expensive sorted result is requested repeatedly and can tolerate some staleness, caching the result under a separate key with expiration can move the cost away from every request. The choice between SORT and a sorted set depends on whether ordering is a derived operation or a primary maintained access pattern." },
            { title: "Example", content: "Suppose a list contains product IDs and the application needs the ten products with the highest current rating. If this computation is rare, sorting may be acceptable; if it is a constant hot-path query, maintaining a sorted set may be a better model." },
            { title: "Practical use", content: "Use SORT for occasional derived ordering and bounded results. For repeatedly accessed rankings, consider storing the ordering directly in a sorted set or caching a computed result with an explicit freshness policy." },
          ],
        },
        {
          title: "SCAN",
          slug: "scan",
          description: "Cursor-based incremental iteration, COUNT hints, duplicate handling, changing keyspaces, and HSCAN/SSCAN/ZSCAN.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "`SCAN` provides incremental iteration through the keyspace using a cursor. The client starts from cursor 0, receives another cursor plus a batch of results, and continues until Redis returns cursor 0 again. The requested `COUNT` is a hint, not a promise that exactly that many items will appear. A batch may even contain no matching items while the returned cursor is nonzero, so an empty response is not proof that iteration has finished. Iteration can also expose duplicates and is not an immutable snapshot when keys are added or removed during the scan. These properties mean the application should make processing idempotent or otherwise tolerate repeated observations when necessary. The same incremental pattern is available for hashes, sets, and sorted sets through their corresponding scan commands. SCAN is therefore safer for large maintenance jobs than demanding a complete keyspace traversal at once, but it still consumes server resources." },
            { title: "Example", content: "A maintenance worker needs to find cache keys matching `cache:session:*`. It repeatedly scans with a moderate count hint, processes returned keys, and continues until the cursor becomes zero. It does not stop merely because one batch is empty." },
            { title: "Practical use", content: "Use SCAN for controlled discovery and maintenance. Make the processing safe to repeat, bound the work per iteration, and avoid turning a full keyspace scan into a synchronous user request." },
          ],
        },
      ],
    },
  ],
};

const path4: PathSeed = {
  name: "Scripting and Administration",
  slug: "redis-scripting-administration",
  description: "Lua, configuration, security, memory planning, replication, and backups.",
  level: StudyLevel.ADVANCED,
  modules: [
    {
      title: "Scripting and Administration",
      slug: "redis-scripting-administration-module",
      description: "Lua, configuration, security, memory planning, replication, and backups.",
      topics: [
        {
          title: "Lua Scripting",
          slug: "lua-scripting",
          description: "Server-side conditional logic, EVAL/EVALSHA, KEYS versus ARGV, atomicity, and script performance.",
          estimatedMinutes: 25,
          sections: [
            { title: "Detailed explanation", content: "Lua scripting lets application logic execute close to the Redis data it operates on. This is useful when a business operation needs a read, a condition, and one or more writes to happen together without multiple client/server round trips. `EVAL` executes a script, while a loaded script can later be invoked through its SHA identifier with `EVALSHA`. Script inputs are separated into `KEYS` for Redis keys and `ARGV` for ordinary values. This distinction is important for clarity and for deployments where Redis needs to understand key placement. A focused script can implement operations such as “decrease inventory only when enough stock exists.” Scripts execute atomically relative to other Redis commands, but that strength has a cost: a long-running script can delay unrelated work. Lua should therefore contain narrow, predictable logic rather than large scans or entire application workflows. Script management commands are operational tools and should be used deliberately." },
            { title: "Example", content: "For stock key `stock:keyboard`, a script can read the current quantity, compare it with the requested amount, decrement only when sufficient stock exists, and return success or failure. The client sends the requested quantity as an argument instead of embedding it into the script source." },
            { title: "Practical use", content: "Use scripts for compact read-check-write operations that need atomic behavior or fewer round trips. Keep them short, test them with edge cases, and monitor their execution time." },
          ],
        },
        {
          title: "Configuration",
          slug: "configuration",
          description: "Configuration files, runtime settings, inspection, controlled changes, and operational discipline.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Redis configuration controls how the server behaves and should be managed as an operational artifact rather than as a collection of ad-hoc experiments. A configuration file provides reproducible settings, while runtime configuration commands can inspect or change supported options. Inspection is useful during troubleshooting because the effective runtime state may differ from what an engineer assumes is configured. Production changes should have a reason, an expected effect, a validation plan, and a rollback path. Settings related to persistence, memory, logging, networking, and security can have significant consequences, so changing one value should be evaluated in the context of the workload. Configuration management also needs version awareness because the supplied material discusses an older Redis generation and some commands or deployment practices may differ in current releases." },
            { title: "Example", content: "An operations team notices that logging behavior differs between environments. Instead of changing values repeatedly by trial and error, it compares the effective configuration, records the intended setting, applies the change in a controlled environment, validates the behavior, and then promotes it." },
            { title: "Practical use", content: "Keep configuration under change control where practical. Document defaults, environment-specific overrides, restart requirements, and validation checks, and always verify settings against the Redis version actually deployed." },
          ],
        },
        {
          title: "Authentication and Command Security",
          slug: "authentication-and-command-security",
          description: "Authentication versus authorization, administrative commands, command restrictions, and defense in depth.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Authentication answers who is connecting; authorization answers what that identity is allowed to do. The supplied material describes an older password-oriented security model and defensive techniques such as restricting dangerous administrative commands. These ideas are useful for understanding the security boundary, but command renaming alone should never be treated as a complete protection mechanism. A secure deployment should combine authentication with network isolation, least privilege, protected administrative access, and careful exposure of the Redis port. Destructive operations deserve special attention because an operator or compromised client with broad permissions can remove large portions of the dataset. Security settings should also be reviewed when Redis is upgraded because modern releases may provide different and more granular mechanisms than the older model described by the material." },
            { title: "Example", content: "A production service should not expose Redis directly to the public internet. Application clients receive only the permissions they need, while administrative access is restricted to trusted operational paths. A destructive command is not considered safe merely because its default name has been changed." },
            { title: "Practical use", content: "Treat network reachability, authentication, authorization, encryption where appropriate, and administrative access as separate controls. Review security configuration during deployment and upgrades rather than relying on a single command-level trick." },
          ],
        },
        {
          title: "Size Limitations and Memory Planning",
          slug: "size-limitations-and-memory-planning",
          description: "Dataset sizing, overhead, replication cost, temporary memory, and headroom.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Memory planning starts with the actual shape of the dataset. Two Redis deployments with the same number of keys can have completely different footprints because values, key names, fields, members, replicas, allocator overhead, and temporary buffers vary. Estimate average and worst-case object sizes, expected cardinality, growth rate, and replica count. Then add headroom for operational bursts rather than filling RAM to an absolute limit. Large collections deserve special attention because a single request may create a large response or a long-running operation even when the overall key count looks reasonable. Expiration can control temporary data growth, but it should not be used to hide an incorrectly sized authoritative dataset. Capacity planning should be validated with representative load tests and memory measurements, because theoretical payload calculations omit implementation overhead." },
            { title: "Example", content: "If a service expects 5 million keys, estimate the distribution of key and value sizes instead of multiplying 5 million by one average without checking extremes. Then account for replicas and traffic bursts before selecting machine memory." },
            { title: "Practical use", content: "Track memory utilization, fragmentation, key/value size distributions, and growth rate. Define an alert threshold that leaves time to scale or evict safe temporary data before the instance reaches an unsafe condition." },
          ],
        },
        {
          title: "Replication",
          slug: "replication",
          description: "Primary-replica copying, read scaling, replication lag, redundancy, and why replicas are not backups.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Replication creates additional live copies of Redis data by propagating changes from a primary to replicas. Replicas can improve redundancy and may serve reads in architectures where slightly stale results are acceptable. They do not automatically eliminate replication lag: after a primary changes from one value to another, a replica may temporarily expose the previous state. Applications that require read-after-write consistency should therefore be deliberate about where reads go. Replication also is not the same as backup. If an accidental deletion reaches the primary and is replicated, the replicas can reproduce the same bad state. A backup provides a historical recovery point, while replication primarily provides another live copy. Failover is another separate concern: having a replica does not by itself define how clients discover and promote a replacement primary when the original fails." },
            { title: "Example", content: "A read-heavy catalog service may send writes to the primary and distribute cache-friendly reads across replicas. If a user changes a preference and immediately reads it back, the application must account for the possibility that a replica has not received the update yet." },
            { title: "Practical use", content: "Use replicas for redundancy and appropriate read scaling, but document acceptable staleness and failover behavior. Pair replication with independent backups when historical recovery is required." },
          ],
        },
        {
          title: "Backups",
          slug: "backups",
          description: "Recovery points, snapshot copying, off-host storage, and separating backup from replication.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A backup is designed to recover data from an earlier safe state. That makes it fundamentally different from a live replica. Snapshot files can be copied to another machine, backup system, or object-storage environment so that a host failure does not destroy both the active dataset and its only recovery copy. Backup frequency should follow the recovery point objective: if losing an hour is unacceptable, a daily backup is insufficient. Recovery point quality is not enough by itself; the team must also know how to restore, validate the recovered dataset, and return the application to service. A replica may assist with persistence work in some architectures, but it should not be considered the historical backup policy. Backup retention, off-host storage, encryption, access control, and restoration testing are part of the complete recovery design." },
            { title: "Example", content: "A subscription service keeps periodic snapshots and copies them outside the Redis host. If the host is lost, the team can create a replacement instance and restore from the most recent safe snapshot instead of depending on a surviving local disk." },
            { title: "Practical use", content: "Define RPO and RTO, store backups away from the primary host, protect backup access, retain multiple recovery points when needed, and perform restoration drills rather than assuming that a successful backup job guarantees recovery." },
          ],
        },
      ],
    },
  ],
};

const path5: PathSeed = {
  name: "Scaling and Architecture",
  slug: "redis-scaling-architecture",
  description: "Partitioning, high availability, and complete application designs.",
  level: StudyLevel.ADVANCED,
  modules: [
    {
      title: "Scaling and Architecture",
      slug: "redis-scaling-architecture-module",
      description: "Partitioning, high availability, and complete application designs.",
      topics: [
        {
          title: "Scaling",
          slug: "scaling",
          description: "Vertical and horizontal scaling, partitioning, hashing, rebalancing, consistent hashing, and clustering.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Scaling can be vertical or horizontal. Vertical scaling increases the capacity of one machine, such as adding RAM or faster hardware. Horizontal scaling distributes data or work across multiple Redis instances. Partitioning assigns keys to different nodes, often using a hashing strategy. A naive modulo rule can create significant movement when the number of nodes changes because the divisor changes for many keys. Consistent-hashing concepts reduce movement during membership changes by placing nodes and keys into a shared logical space. Clustered deployments can provide structured partitioning, rebalancing, and failure handling, but distributed data introduces new concerns such as key placement, multi-key operations, and operational complexity. Scaling should therefore be driven by measured limits: memory, CPU, throughput, latency, dataset size, or availability requirements. Adding nodes without understanding the access pattern can simply move the bottleneck elsewhere." },
            { title: "Example", content: "With three independent instances, a simplistic `hash(key) % 3` rule distributes keys. Adding a fourth node changes the calculation to `% 4`, potentially remapping many keys. A partitioning strategy designed for membership changes can reduce the amount of movement." },
            { title: "Practical use", content: "Identify the actual bottleneck before scaling. When horizontal partitioning is required, define key distribution, rebalancing behavior, cross-node operation constraints, monitoring, and failure recovery before production rollout." },
          ],
        },
        {
          title: "High Availability",
          slug: "high-availability",
          description: "Failure tolerance, replicas, failover planning, and the distinction between redundancy and automatic recovery.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "High availability means the application can continue operating when a component fails. Replication supplies alternate copies, but failover is the mechanism and operational process that makes a surviving node usable as the replacement for a failed primary. Read replicas alone do not guarantee write availability because the application must know where to send writes after failure. A complete design considers failure detection, promotion, client discovery, data loss expectations, split-brain risks, and recovery procedures. The exact mechanisms depend on the Redis version and deployment architecture, so older material should not be copied blindly into a modern environment. High availability should also be tested under realistic failure conditions rather than inferred from the presence of a second server. The goal is not merely to have another copy; it is to have a controlled path from failure to a functioning service." },
            { title: "Example", content: "A checkout service has a primary and replicas. During a primary failure, the architecture needs a defined process for selecting a replacement, redirecting clients, and handling writes that may not have reached every replica before the failure." },
            { title: "Practical use", content: "Document the failover path, expected data-loss window, client behavior, monitoring signals, and rollback plan. Run failure drills so the operational procedure is as reliable as the topology." },
          ],
        },
        {
          title: "End-to-End Case Study: E-Commerce Platform",
          slug: "end-to-end-case-study-e-commerce-platform",
          description: "A cohesive Redis design for sessions, caching, carts, recent items, interests, rankings, lookups, and events.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "An e-commerce system demonstrates why Redis is usually modeled feature by feature. Sessions are temporary, so a serialized session value can use a TTL. Product responses are natural cache entries with a freshness window. A shopping cart benefits from a hash because product quantities can change independently. Recently viewed products need order, so a bounded list fits. User interests are unique memberships, making a set appropriate. Product popularity is naturally represented by a sorted set when the score is the ranking signal. Email-to-user lookup can be a compact hash mapping an alternate identifier to the canonical user ID. Notifications can use pub/sub when transient delivery is acceptable. The important architectural boundary is that Redis need not become the sole system of record. Durable orders and broad business data can remain in a primary database while Redis accelerates selected access paths." },
            { title: "Example", content: "For user 501: `session:501` stores temporary session state, `cart:501` is a hash of product IDs to quantities, `recent:501` stores recent product IDs, `interests:501` is a set, `popular-products` is a sorted set, and `cache:product:7001` stores a short-lived product response." },
            { title: "Practical use", content: "Design each key around one application question. Decide which values can be rebuilt, which must survive failures, how TTLs are chosen, and how derived indexes are repaired when the authoritative data changes." },
          ],
        },
        {
          title: "End-to-End Case Study: Online Game",
          slug: "end-to-end-case-study-online-game",
          description: "A cohesive model for player profiles, leaderboards, friends, recent matches, counters, and caching.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "An online game combines several Redis structures naturally. A player profile has independently changing fields such as level and coins, so a hash is convenient. A leaderboard needs a player member and a numeric score, making a sorted set appropriate. Friends are unique relationships, so a set fits. Recent matches are ordered and bounded, so a list can retain the latest match IDs. Daily metrics can use string counters when the event semantics permit atomic increments, while a set or bitmap-like model may be needed when the metric is specifically unique-user participation. A player cache can be stored as a string with expiration when the authoritative profile lives elsewhere. The design shows that one player can participate in multiple Redis structures without forcing those structures to duplicate the full profile." },
            { title: "Example", content: "Player 900 can have `player:900` as a hash, `friends:900` as a set, `matches:recent:900` as a bounded list, `leaderboard:weekly` as a sorted set containing player 900's score, and `cache:player:900` as a temporary serialized response." },
            { title: "Practical use", content: "Define which game events are authoritative and which are derived. Keep counters and rankings synchronized with their source events, bound recent collections, and use TTLs for data that becomes irrelevant after a known period." },
          ],
        },
        {
          title: "Data Modeling for Access Patterns",
          slug: "data-modeling-for-access-patterns",
          description: "Starting with application questions, mapping each question to a structure, and managing derived state.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Access-pattern modeling means designing Redis state from the questions the application must answer. Start by listing concrete operations such as “get user by ID,” “get user by email,” “show the latest orders,” “check permission,” and “show top users.” Then choose structures that make each operation direct. This can require multiple representations: one canonical object plus indexes, recent-item lists, membership sets, and rankings. The difficult part is not creating the first key; it is maintaining derived state as the authoritative object changes. Every additional index increases consistency responsibility. Data modeling should also consider whether results must be fresh, whether they can be rebuilt, how large collections can become, and whether operations may span multiple nodes in a scaled deployment. Redis rewards explicit design because the system does not automatically infer arbitrary secondary queries from generic application objects." },
            { title: "Example", content: "For a learning site, the questions might be: “find learner by email,” “show recent lessons,” “check enrolled courses,” and “rank learners by points.” These map naturally to an email lookup hash, list, set, and sorted set rather than one giant serialized profile." },
            { title: "Practical use", content: "Write access patterns as sentences before writing commands. For every sentence, identify the exact key or structure that answers it and the update path that keeps that structure correct." },
          ],
        },
        {
          title: "Performance Engineering",
          slug: "performance-engineering",
          description: "A systematic approach to complexity, memory, network, command selection, batching, and bounded data.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Redis performance engineering combines algorithmic cost, memory behavior, network latency, command selection, and data modeling. Start with hot paths and measure them. Then inspect whether the chosen structure gives the desired operation a reasonable complexity, whether collections are bounded, whether values are unnecessarily large, and whether the client sends commands one at a time. Pipelining and multi-key commands can reduce communication overhead, but they do not fix an inefficient data model. Long-running commands, broad scans, huge sorts, or large responses can affect unrelated requests because server work competes for processing time. Memory pressure can also increase latency and instability, so capacity and headroom belong in performance discussions. The best optimization is often to change the representation so the server can answer the question directly instead of repeatedly computing the answer." },
            { title: "Example", content: "If a dashboard performs 100 individual reads for every page view, first consider whether the access pattern can be consolidated or pipelined. If a request scans a huge collection to find a small subset, redesign the index instead of merely increasing server hardware." },
            { title: "Practical use", content: "Use a loop of measure → identify bottleneck → model the operation → change one variable → benchmark again. Track p95/p99 latency, throughput, memory, command cost, and collection cardinality." },
          ],
        },
      ],
    },
  ],
};

const path6: PathSeed = {
  name: "Applied Redis Design",
  slug: "redis-applied-design",
  description: "Access-pattern engineering, performance, debugging, and common mistakes.",
  level: StudyLevel.ADVANCED,
  modules: [
    {
      title: "Applied Redis Design",
      slug: "redis-applied-design-module",
      description: "Access-pattern engineering, performance, debugging, and common mistakes.",
      topics: [
        {
          title: "Debugging Workflow",
          slug: "debugging-workflow",
          description: "A repeatable method for diagnosing latency, stale values, cache behavior, indexes, persistence, and contention.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A disciplined Redis debugging workflow starts from the symptom and narrows the scope. If an API is slow, measure client-side latency and identify whether time is spent waiting on Redis, executing commands, or processing results. Slow-log data can reveal expensive server operations, while command monitoring can expose unexpected request patterns during controlled reproduction. If a value is stale, ask whether the read came from a lagging replica, whether a cache entry has an old TTL, or whether a manual index is out of date. If memory is rising, inspect key growth, collection sizes, value sizes, expiration behavior, and replicas. If a multi-step update is inconsistent, examine transaction boundaries, WATCH conflicts, and script logic. The workflow should resist vague conclusions such as “Redis is slow” and instead identify the exact command, key family, workload characteristic, or consistency assumption responsible for the symptom." },
            { title: "Example", content: "A product endpoint returns old data. The investigation checks whether the application hit `cache:product:55`, whether that key's TTL is longer than intended, whether the source record changed without cache invalidation, and whether a replica was queried before the update had propagated." },
            { title: "Practical use", content: "Create a repeatable incident checklist and capture evidence before changing settings. Correlate Redis metrics, application traces, command behavior, and dataset characteristics so the fix addresses the cause rather than the symptom." },
          ],
        },
        {
          title: "Common Redis Mistakes",
          slug: "common-redis-mistakes",
          description: "Typical modeling, performance, reliability, security, and operational mistakes and how to avoid them.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Common mistakes usually come from treating Redis as either a generic database or a magical cache. Modeling every object as one serialized string can make field updates expensive; creating duplicate full objects can create consistency problems; using global key discovery in request paths can create large blocking operations; and allowing recent-item collections to grow forever can consume memory. Other mistakes include assuming replicas are backups, ignoring replica staleness, sending thousands of commands one by one, writing long Lua scripts, and using TTLs without understanding what happens on a cache miss. Security mistakes include exposing Redis broadly or treating command renaming as sufficient protection. Scaling mistakes include partitioning without understanding key distribution or multi-key access. The common solution is deliberate design: define ownership, access patterns, lifecycle, complexity, consistency, and failure behavior for every important key family." },
            { title: "Example", content: "A service stores full customer objects under both customer ID and email, then updates only one copy. It also uses `KEYS` during every request to discover related records. The system now has both correctness and performance problems because the data model is fighting the workload." },
            { title: "Practical use", content: "Review Redis code for duplication, unbounded collections, global scans, sequential round trips, missing TTLs, unclear authority, weak security boundaries, and undefined failure behavior. Fix modeling problems before tuning individual commands." },
          ],
        },
        {
          title: "Command-to-Problem Mental Map",
          slug: "command-to-problem-mental-map",
          description: "Connecting common application problems to the Redis command families and structures that solve them.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A useful Redis mental map connects a business question to a structure and then to the command family that operates on it. Whole-value retrieval and counters lead toward strings. Field-level object changes lead toward hashes. Ordered sequences and simple queues lead toward lists. Membership and set algebra lead toward sets. Numeric ordering and rank lead toward sorted sets. Expiration answers lifecycle questions; transactions and WATCH address coordinated or conditional updates; Lua handles compact server-side read-check-write logic; pipelining addresses network round trips; SCAN addresses incremental discovery; slow log and MONITOR address diagnostics. This map is more valuable than memorizing isolated commands because it explains why a command belongs in a design. The final choice still depends on version, workload, cardinality, and consistency requirements." },
            { title: "Example", content: "“Show the top 20 learners” maps to a sorted set. “Is this learner enrolled?” maps to a set. “Update the learner's city” maps to a hash. “Cache the full dashboard response” maps to a string plus an expiration policy." },
            { title: "Practical use", content: "When learning a command, first write the problem it solves, the data structure it expects, its complexity, and its failure or lifecycle considerations. This prevents command memorization without modeling understanding." },
          ],
        },
        {
          title: "Practical Exercises",
          slug: "practical-exercises",
          description: "Learning exercises that apply strings, hashes, lists, sets, sorted sets, TTL, SCAN, and atomic updates.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Practical exercises turn Redis concepts into data-modeling decisions. A profile exercise tests whether field-level updates justify a hash. A recent-search exercise tests ordering and bounded retention with a list. A unique-attendee exercise tests set membership and cardinality. A leaderboard exercise tests sorted-set scores and rank. An alternate-login exercise tests a canonical object plus a lookup index. A temporary-token exercise tests TTL design. A large-keyspace exercise tests incremental scanning rather than global discovery. An atomic-stock exercise tests the difference between a client-side read-check-write sequence and a server-side atomic design. The goal is not merely to produce commands; it is to explain why the structure matches the requirement, what can go wrong, and how the model behaves as the dataset grows." },
            { title: "Example", content: "Design a webinar model with `attendees:<date>` as a set of user IDs, `leaderboard` as a sorted set of participant scores, `searches:user:<id>` as a bounded list, and reset tokens as expiring strings. Then explain what happens when data grows or a command is retried." },
            { title: "Practical use", content: "For each exercise, write the expected access pattern first, sketch the keys, then test the model with duplicate writes, missing keys, concurrent updates, expired values, and large collections." },
          ],
        },
      ],
    },
  ],
};

const path7: PathSeed = {
  name: "Practice and Revision",
  slug: "redis-practice-revision",
  description: "Design exercises, application scenarios, production review, and revision.",
  level: StudyLevel.ADVANCED,
  modules: [
    {
      title: "Practice and Revision",
      slug: "redis-practice-revision-module",
      description: "Design exercises, application scenarios, production review, and revision.",
      topics: [
        {
          title: "Design Scenario: Social Network",
          slug: "design-scenario-social-network",
          description: "A multi-structure design for profiles, friends, activity, reputation, and alternate lookups.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A social network demonstrates how several Redis structures can cooperate around one user. A profile can use a hash because fields change independently. Friends can use a set because membership is unique and relationship queries may need intersections. Recent activity can use a bounded list because order and recency matter. Reputation can be represented in a sorted set when the product needs rankings. An email lookup hash can provide an alternate access path without copying the profile. The important design principle is separation of concerns: each structure answers a specific question, while the user ID links the structures conceptually. Relationship indexes also need lifecycle rules. Removing a friendship should update the appropriate sets, deleting a user should clean derived references, and ranking scores should be updated according to clearly defined events." },
            { title: "Example", content: "For user 100: `user:100` stores profile fields, `friends:100` stores friend IDs, `activity:100` stores recent event IDs, and `reputation` contains member `100` with its score. `user:lookup:email` maps the login email to 100." },
            { title: "Practical use", content: "Model each social feature independently and define consistency rules between them. Bound activity history, avoid copying full profiles into relationship collections, and decide whether reputation is authoritative or derived." },
          ],
        },
        {
          title: "Design Scenario: Content Platform",
          slug: "design-scenario-content-platform",
          description: "A design combining caching, counters, tags, trending scores, and recent content.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A content platform often benefits from using Redis for acceleration rather than storing the entire publishing system there. Article responses can be cached as strings with TTLs. View counts can use numeric string counters when the event semantics permit atomic increments. Tags can use sets because an article's tag membership is unique. Trending content can use a sorted set where the score represents a popularity formula or recent activity measure. Recent articles can use a list when chronological order is the primary requirement. The design becomes more interesting when these structures have different freshness requirements: a cache may expire quickly, a counter may need longer retention, and a trend score may be recomputed or adjusted periodically. Keeping those lifecycles separate avoids the mistake of giving every key the same expiration policy." },
            { title: "Example", content: "An article page may read `cache:article:900` for the rendered response, increment `views:article:900`, maintain `tags:article:900`, update `trending:articles` with a score, and add the article ID to `recent:articles`." },
            { title: "Practical use", content: "Define the source of truth for article metadata and treat Redis structures as derived or accelerated views unless the business explicitly requires Redis to be authoritative. Rebuild or repair derived structures when necessary." },
          ],
        },
        {
          title: "Design Scenario: Support System",
          slug: "design-scenario-support-system",
          description: "A design for ticket references, agent skills, recent activity, urgency ranking, and permissions.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A support platform has several distinct questions: which tickets belong to a customer, which skills an agent has, what happened most recently on a ticket, which tickets are urgent, and whether an agent has a permission. Customer-to-ticket relationships can use a hash or list depending on whether the application needs keyed ticket metadata or simple order. Agent skills and permissions fit sets because membership is the important operation. Recent ticket activity fits a list because event order matters. Urgent-ticket ranking fits a sorted set when each ticket receives a numeric urgency score. These structures should reference ticket or agent IDs rather than duplicate complete objects. As with other derived indexes, ticket deletion, reassignment, permission changes, and urgency updates must keep the structures coherent." },
            { title: "Example", content: "`tickets:customer:44` can identify tickets for customer 44, `skills:agent:12` can contain `billing` and `refunds`, `activity:ticket:901` can keep recent event IDs, and `urgent:tickets` can rank ticket 901 by its current urgency score." },
            { title: "Practical use", content: "Choose the structure from the support workflow rather than from the entity name. Define how ticket closure removes or changes ranking state and how permission updates affect authorization checks." },
          ],
        },
        {
          title: "Performance Checklist",
          slug: "performance-checklist",
          description: "A production-oriented checklist for keys, structures, network, complexity, memory, TTL, concurrency, operations, and scaling.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "A production Redis review should cover keys, structures, network behavior, command complexity, memory, expiration, concurrency, operations, and scaling. Keys should be predictable and reasonably compact. Each structure should match its access pattern, and large collections should be bounded where the business permits. Hot paths should avoid unnecessary one-at-a-time round trips and consider batching or pipelining. Every expensive command should be evaluated in terms of N and M and the maximum collection size it can encounter. Memory planning should include replicas and operational headroom. Temporary data should have explicit lifetimes. Multi-step updates should have clear atomicity requirements, and retry loops should be bounded. Operations should have monitoring, slow-log review, backups, replication, and failure procedures. Finally, scaling plans should explain when one instance becomes insufficient and how keys and traffic will be redistributed." },
            { title: "Example", content: "Before launching a new cache feature, review its key pattern, maximum entry size, expected key count, TTL, miss behavior, command complexity, request batching, memory headroom, and failure mode. Then load-test the expected peak rather than only a small development dataset." },
            { title: "Practical use", content: "Turn this checklist into a deployment gate. Require owners to document the data model, lifecycle, capacity estimate, observability, recovery path, and scaling trigger for every important Redis-backed feature." },
          ],
        },
        {
          title: "Final Revision Notes",
          slug: "final-revision-notes",
          description: "A compact learning map tying Redis structures, access patterns, persistence, concurrency, performance, and scaling together.",
          estimatedMinutes: 30,
          sections: [
            { title: "Detailed explanation", content: "Redis becomes easier to reason about when the major ideas are connected. The core model is key-oriented access plus specialized data structures: strings for scalar or whole-value data, hashes for fields, lists for ordered sequences, sets for unique membership, and sorted sets for scored ordering. Performance depends on complexity, collection size, memory, and network round trips. Explicit indexes and references solve alternate access paths but introduce consistency responsibilities. TTL manages temporary lifecycle, while transactions, WATCH, and focused scripts address coordinated updates. SCAN supports incremental discovery, whereas broad keyspace commands should not become request-path query mechanisms. Replication provides live copies and possible read scaling; backups provide historical recovery. Horizontal scaling distributes data but introduces placement and rebalancing concerns. High availability requires more than a replica: it requires a defined failure and failover path. These principles form a reusable design framework across caches, games, social systems, content platforms, and support applications." },
            { title: "Example", content: "When facing a new requirement, ask four questions: What is the most important operation? Which structure represents it directly? How large can that structure become? What happens when the data is stale, expires, or the node fails? Those questions lead to a sound Redis design more reliably than memorizing commands." },
            { title: "Practical use", content: "Use the revision map as a design checklist, not just a command summary. For every Redis feature, be able to explain its structure, access pattern, complexity, lifecycle, consistency model, and recovery story." },
          ],
        },
      ],
    },
  ],
};

// The Prisma schema allows only one StudyPath per category and level.
// Therefore Redis is represented as one learning path containing multiple modules.
const paths: PathSeed[] = [
  {
    name: "Redis Learning Path",
    slug: "redis-learning-path",
    description: "A complete Redis learning path covering foundations, data structures, modeling, performance, safe operations, scripting, scaling, architecture, and practical application design.",
    level: StudyLevel.BEGINNER,
    modules: [
      ...path0.modules,
      ...path1.modules,
      ...path2.modules,
      ...path3.modules,
      ...path4.modules,
      ...path5.modules,
      ...path6.modules,
      ...path7.modules,
    ],
  },
];

async function main() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: categorySeed.slug },
    update: { name: categorySeed.name, description: categorySeed.description, icon: categorySeed.icon, isPublished: true, sortOrder: categorySeed.sortOrder },
    create: { name: categorySeed.name, slug: categorySeed.slug, description: categorySeed.description, icon: categorySeed.icon, isPublished: true, sortOrder: categorySeed.sortOrder },
  });

  let totalTopics = 0;
  let totalSections = 0;

  for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
    const pathSeed = paths[pathIndex];
    const path = await prisma.studyPath.upsert({
      where: { categoryId_slug: { categoryId: category.id, slug: pathSeed.slug } },
      update: { name: pathSeed.name, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: pathIndex },
      create: { categoryId: category.id, name: pathSeed.name, slug: pathSeed.slug, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: pathIndex },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
      const moduleSeed = pathSeed.modules[moduleIndex];
      const studyModule = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, sortOrder: moduleIndex, isPublished: true },
        create: { studyPathId: path.id, title: moduleSeed.title, slug: moduleSeed.slug, description: moduleSeed.description, sortOrder: moduleIndex, isPublished: true },
      });

      for (let topicIndex = 0; topicIndex < (moduleSeed.topics ?? []).length; topicIndex++) {
        const topicSeed = moduleSeed.topics![topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: category.id, slug: topicSlug } },
          update: { moduleId: studyModule.id, title: topicSeed.title, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: topicIndex, prerequisiteIds: [], relatedTopicIds: [] },
          create: { categoryId: category.id, moduleId: studyModule.id, title: topicSeed.title, slug: topicSlug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: topicIndex, prerequisiteIds: [], relatedTopicIds: [] },
        });

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex++) {
          const section = topicSeed.sections![sectionIndex];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${sectionIndex}` },
            update: { title: section.title, content: section.content, sortOrder: sectionIndex },
            create: { id: `${topic.id}-section-${sectionIndex}`, topicId: topic.id, title: section.title, content: section.content, sortOrder: sectionIndex },
          });
          totalSections++;
        }
        totalTopics++;
      }
    }
  }
  console.log(`Redis seed completed: ${totalTopics} topics and ${totalSections} sections.`);
}

main().catch((error) => { console.error("Redis seed failed:", error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
