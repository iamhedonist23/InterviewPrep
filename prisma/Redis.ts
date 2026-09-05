// ---- 200+ Redis Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["Redis", "Redis"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["Redis", "What is Redis and what are its main features?", "redis-overview", "Define Redis and list its key features.", "Redis (Remote Dictionary Server) is an in-memory data structure store, used as a database, cache, and message broker. It supports various data structures (strings, hashes, lists, sets, sorted sets, streams, etc.). Key features: in-memory performance, persistence (RDB/AOF), replication, Lua scripting, transactions, pub/sub, and high availability with Redis Sentinel and clustering."],
  ["Redis", "What is the difference between Redis and Memcached?", "redis-vs-memcached", "Compare Redis and Memcached.", "Redis is more feature-rich, supporting multiple data structures, persistence, replication, and transactions. Memcached is a simple key-value cache with no persistence. Redis is generally slower than Memcached for simple caching due to its rich feature set, but offers more flexibility."],
  ["Redis", "What data types does Redis support?", "redis-data-types", "List Redis data types.", "Redis supports: Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, HyperLogLogs, Geospatial indexes, and Streams. Each has specific commands."],
  ["Redis", "What is the default port for Redis?", "redis-port", "Specify the default Redis port.", "The default Redis port is 6379. For TLS-enabled connections, it's 6380."],
  ["Redis", "How do you start Redis?", "start-redis", "Explain starting Redis.", "Use the `redis-server` command. You can pass a configuration file (e.g., `redis-server /path/to/redis.conf`). To run as a daemon, set `daemonize yes` in the config."],
  ["Redis", "What is the Redis CLI and how do you use it?", "redis-cli", "Explain the command-line interface.", "The Redis CLI (`redis-cli`) is an interactive command-line tool to interact with Redis. Use `redis-cli -h host -p port -a password`. You can run commands directly or in interactive mode."],
  ["Redis", "What is the key naming convention in Redis?", "key-naming", "Explain best practices for keys.", "Keys are binary-safe strings. Use a consistent naming pattern like `object:id:field`, use delimiters like `:` or `.` to create namespaces. Avoid very long keys (memory overhead)."],
  ["Redis", "How does Redis handle memory management?", "redis-memory", "Explain memory management.", "Redis uses a single-threaded event loop and stores data in memory. It uses a memory allocator (jemalloc). You can set `maxmemory` and eviction policies (LRU, LFU, TTL, etc.) to manage memory."],
  ["Redis", "What is the maximum size of a Redis key?", "key-size-limit", "Explain key size limit.", "Redis keys can be up to 512 MB in size. Values can also be up to 512 MB for strings, but in practice, you should keep them small for performance."],
  ["Redis", "What is the difference between Redis and a traditional relational database?", "redis-vs-sql", "Compare Redis with SQL.", "Redis is in-memory and schema-less, with no SQL. It provides high throughput and low latency. SQL databases are disk-based, support complex queries, ACID transactions, and relationships. Redis is often used as a cache or for real-time analytics."],
  ["Redis", "What is Redis persistence and why is it important?", "redis-persistence", "Explain persistence.", "Persistence ensures data survives server restarts. Redis offers RDB (snapshots) and AOF (append-only file) persistence. RDB is a point-in-time snapshot; AOF logs every write operation. Both can be used together."],
  ["Redis", "What is the difference between RDB and AOF persistence?", "rdb-vs-aof", "Compare persistence methods.", "RDB creates compact binary snapshots at intervals; it's good for backups but may lose data if Redis crashes. AOF logs every write command; it's more durable (configurable fsync), but files can be larger and recovery slower. You can use both."],
  ["Redis", "What is a Redis transaction?", "redis-transactions", "Explain transactions.", "Transactions in Redis are a group of commands executed atomically using `MULTI`, `EXEC`, `DISCARD`, and `WATCH`. Commands are queued and then executed sequentially. No rollback; if a command fails, others may still execute."],
  ["Redis", "What is the `WATCH` command in Redis?", "watch-command", "Explain optimistic locking.", "`WATCH` allows you to monitor keys for changes before executing a transaction. If any watched key is modified before `EXEC`, the transaction is aborted. Used for optimistic locking."],
  ["Redis", "What is a Lua script in Redis and why use it?", "lua-scripting", "Explain Lua scripting.", "Lua scripts are executed atomically on the Redis server, reducing network round-trips and ensuring atomicity. They can combine multiple commands and logic. Use `EVAL` or `SCRIPT LOAD`."],
  ["Redis", "What is the Redis `INFO` command?", "info-command", "Explain the `INFO` command.", "`INFO` returns various server statistics: memory, CPU, clients, persistence, replication, keyspace, etc. It's essential for monitoring and debugging."],
  ["Redis", "How do you check the number of keys in a Redis database?", "dbsize-command", "Explain `DBSIZE`.", "Use `DBSIZE` to get the number of keys in the current database. For pattern-matched counting, use `KEYS` or `SCAN`."],
  ["Redis", "What is the `KEYS` command and its downside?", "keys-command", "Explain `KEYS`.", "`KEYS pattern` returns all keys matching a pattern. It's dangerous in production because it scans the entire keyspace and may block the server. Use `SCAN` for incremental iteration."],
  ["Redis", "What is the `SCAN` command?", "scan-command", "Explain `SCAN`.", "`SCAN` iterates over keys in a cursor-based manner, allowing incremental traversal without blocking. It returns a cursor and a list of keys. Use it for safe pattern matching."],
  ["Redis", "What is the purpose of the `SELECT` command?", "select-command", "Explain database selection.", "Redis supports multiple logical databases (0 to 15 by default). `SELECT index` switches to a specific database. This is useful for separating data, but often not recommended for large-scale applications; use key namespacing instead."],

  // ==================== DATA TYPES (30) ====================
  ["Redis", "What are the common operations on Redis Strings?", "string-operations", "Explain string commands.", "Basic commands: `SET`, `GET`, `DEL`, `INCR`, `DECR`, `APPEND`, `STRLEN`, `SETEX` (with expiry), `MSET`/`MGET` (multi). Strings are binary-safe."],
  ["Redis", "What are Redis Hashes and how do you use them?", "hash-data-type", "Explain Hashes.", "Hashes are map of field-value pairs, similar to objects. Commands: `HSET`, `HGET`, `HMSET`, `HMGET`, `HGETALL`, `HINCRBY`, `HDEL`, `HLEN`, `HEXISTS`. Useful for storing objects."],
  ["Redis", "What are Redis Lists and what are their operations?", "list-data-type", "Explain Lists.", "Lists are ordered collections of strings, implemented as linked lists. Commands: `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`, `LLEN`, `LINDEX`, `LSET`, `LREM`, `LTRIM`. Used for queues and stacks."],
  ["Redis", "What are Redis Sets and their operations?", "set-data-type", "Explain Sets.", "Sets are unordered collections of unique strings. Commands: `SADD`, `SREM`, `SMEMBERS`, `SISMEMBER`, `SCARD`, `SINTER`, `SUNION`, `SDIFF`, `SRANDMEMBER`. Useful for tagging, unique items."],
  ["Redis", "What are Redis Sorted Sets and how do they work?", "sorted-set-data-type", "Explain Sorted Sets.", "Sorted Sets are like sets but each member has a score, and members are ordered by score. Commands: `ZADD`, `ZREM`, `ZRANGE`, `ZREVRANGE`, `ZRANK`, `ZREVRANK`, `ZSCORE`, `ZINCRBY`, `ZCOUNT`, `ZUNIONSTORE`, `ZINTERSTORE`. Used for leaderboards, priority queues."],
  ["Redis", "What are Redis Bitmaps and how are they used?", "bitmap-data-type", "Explain Bitmaps.", "Bitmaps are arrays of bits (strings) supporting bitwise operations. Commands: `SETBIT`, `GETBIT`, `BITCOUNT`, `BITOP`, `BITPOS`. Used for analytics (e.g., daily active users)."],
  ["Redis", "What is HyperLogLog in Redis?", "hyperloglog-data-type", "Explain HyperLogLog.", "HyperLogLog is a probabilistic data structure for approximating cardinality (unique count) of a set. Commands: `PFADD`, `PFCOUNT`, `PFMERGE`. Memory efficient (uses ~12KB)."],
  ["Redis", "What are Redis Geospatial indexes?", "geo-data-type", "Explain Geospatial.", "Redis supports storing locations (longitude, latitude) and performing proximity queries. Commands: `GEOADD`, `GEOPOS`, `GEODIST`, `GEORADIUS`, `GEORADIUSBYMEMBER`. Uses Sorted Sets internally."],
  ["Redis", "What are Redis Streams?", "streams-data-type", "Explain Streams.", "Streams are append-only log-like data structures, supporting consumer groups. Commands: `XADD`, `XREAD`, `XREADGROUP`, `XACK`, `XGROUP`, `XINFO`. Used for messaging and event sourcing."],
  ["Redis", "What is the difference between Lists and Streams?", "list-vs-stream", "Compare Lists and Streams.", "Lists are simple ordered collections; Streams provide persistence, consumer groups, and message acknowledgment. Streams are ideal for message queues; Lists are for simple FIFO/LIFO."],
  ["Redis", "What is the difference between Sets and Sorted Sets?", "set-vs-sortedset", "Compare Sets and Sorted Sets.", "Sets are unordered and only support membership, intersection, union. Sorted Sets order elements by score, supporting range queries by score, ranking. Sorted Sets are more memory-intensive."],
  ["Redis", "How do you use `ZRANGEBYSCORE`?", "zrangebyscore-command", "Explain range query by score.", "`ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]` returns members with scores between min and max. Use `-inf` and `+inf` for unbounded."],
  ["Redis", "What are the time complexities of Redis commands?", "redis-time-complexities", "Explain command efficiency.", "Most commands are O(1) or O(log N). For example, `GET` O(1), `ZADD` O(log N), `LRANGE` O(N) for the range. Be mindful of commands with high complexity like `KEYS` O(N) or `SMEMBERS` O(N)."],
  ["Redis", "How do you set an expiry on a key?", "expire-command", "Explain TTL.", "Use `EXPIRE key seconds` or `PEXPIRE` (milliseconds). Use `TTL` or `PTTL` to check remaining time. `SET key value EX seconds` sets with expiry."],
  ["Redis", "What is the `SORT` command?", "sort-command", "Explain sorting.", "`SORT` sorts lists, sets, or sorted sets by their elements or by external keys (using BY). It can also store results. It's powerful but can be heavy."],
  ["Redis", "What is the `SETNX` command?", "setnx-command", "Explain set if not exists.", "`SETNX key value` sets the key only if it does not already exist. Returns 1 if set, 0 if not. Useful for distributed locking (but use Redlock or SET with NX/EX)."],
  ["Redis", "What is the `MSET` and `MGET` commands?", "mset-mget", "Explain multi-key operations.", "`MSET key1 value1 key2 value2 ...` sets multiple keys atomically. `MGET key1 key2 ...` gets multiple keys. Reduces round-trip time."],
  ["Redis", "What is the `INCR` and `DECR` commands?", "incr-decr", "Explain atomic increment/decrement.", "`INCR key` increments the integer value by 1. `DECR` decrements. There are `INCRBY`, `DECRBY` for arbitrary amounts. Atomic and fast."],
  ["Redis", "What is the `GETSET` command?", "getset-command", "Explain get-and-set.", "`GETSET key value` sets the key to a new value and returns the old value. Useful for resetting counters atomically."],
  ["Redis", "What is the `RENAME` command?", "rename-command", "Explain renaming keys.", "`RENAME key newkey` renames a key. It will overwrite `newkey` if it exists. Use `RENAMENX` to rename only if new key doesn't exist."],
  ["Redis", "What is the `TYPE` command?", "type-command", "Explain checking data type.", "`TYPE key` returns the data type of the value stored at key (string, list, set, zset, hash, stream, none)."],
  ["Redis", "What is the `OBJECT` command?", "object-command", "Explain inspecting objects.", "`OBJECT` subcommands: `ENCODING` (internal encoding), `IDLETIME` (idle time in seconds), `REFCOUNT` (reference count). Useful for debugging memory."],
  ["Redis", "What is the `DUMP` and `RESTORE` commands?", "dump-restore", "Explain serialization.", "`DUMP key` returns a serialized version of the value. `RESTORE key ttl serialized-value` reconstructs it. Used for migration."],
  ["Redis", "What is the `MIGRATE` command?", "migrate-command", "Explain key migration.", "`MIGRATE host port key destination-db timeout [COPY] [REPLACE]` atomically moves a key from one Redis instance to another. Useful for cluster rebalancing."],
  ["Redis", "What is the `EXISTS` command?", "exists-command", "Explain existence check.", "`EXISTS key [key ...]` returns the number of keys that exist (since Redis 3.0.3, returns count of existing keys)."],
  ["Redis", "What is the `RANDOMKEY` command?", "randomkey-command", "Explain random key selection.", "`RANDOMKEY` returns a random key from the database. Useful for sampling."],
  ["Redis", "What is the `FLUSHDB` and `FLUSHALL` commands?", "flush-commands", "Explain clearing data.", "`FLUSHDB` removes all keys in the current database. `FLUSHALL` removes all keys in all databases. Use with caution."],
  ["Redis", "What is the `CONFIG GET` and `CONFIG SET` commands?", "config-commands", "Explain runtime configuration.", "`CONFIG GET parameter` retrieves configuration values; `CONFIG SET parameter value` sets them at runtime (if allowed). Used for tuning."],
  ["Redis", "What is the `CLIENT` command?", "client-command", "Explain client management.", "`CLIENT LIST` lists connected clients; `CLIENT KILL` disconnects a client; `CLIENT SETNAME` sets client name; `CLIENT GETNAME` retrieves it."],

  // ==================== PERFORMANCE & OPTIMIZATION (15) ====================
  ["Redis", "How do you optimize Redis performance?", "redis-performance-optimization", "Explain optimization techniques.", "Use appropriate data structures. Keep keys and values small. Use pipelining for batch operations. Use connection pooling. Choose correct eviction policy. Use `SCAN` over `KEYS`. Monitor slow logs."],
  ["Redis", "What is pipelining in Redis?", "pipelining", "Explain pipelining.", "Pipelining allows sending multiple commands without waiting for each response, reducing round-trip latency. Responses are read after sending all commands."],
  ["Redis", "What is the Redis slow log?", "slowlog", "Explain slow log.", "The slow log records commands that exceed a specified execution time (`slowlog-log-slower-than`). Use `SLOWLOG GET` to view. It helps identify slow queries."],
  ["Redis", "How does Redis handle many connections?", "connections", "Explain connection handling.", "Redis uses a single-threaded event loop but can handle thousands of concurrent connections efficiently using I/O multiplexing (epoll, kqueue)."],
  ["Redis", "What is the `maxmemory` setting and eviction policies?", "maxmemory-eviction", "Explain memory limits.", "`maxmemory` sets the maximum memory Redis can use. When exceeded, Redis evicts keys based on policy: `noeviction`, `allkeys-lru`, `volatile-lru`, `allkeys-random`, `volatile-random`, `volatile-ttl`, etc."],
  ["Redis", "What is LRU and LFU eviction policies?", "lru-lfu", "Explain LRU and LFU.", "LRU (Least Recently Used) evicts keys that haven't been used recently. LFU (Least Frequently Used) evicts keys with the lowest frequency of access. Available in Redis 4.0+."],
  ["Redis", "What is the `redis-benchmark` tool?", "redis-benchmark", "Explain benchmarking.", "`redis-benchmark` is a tool to measure Redis performance with various commands and concurrency. Useful for capacity planning."],
  ["Redis", "What is the impact of large keys on Redis performance?", "large-keys", "Explain large key issues.", "Large keys (e.g., big lists, hashes) can cause memory fragmentation, slow operations (e.g., `HGETALL`), and long network transfer times. Split large keys into smaller chunks."],
  ["Redis", "What is memory fragmentation and how to mitigate it?", "memory-fragmentation", "Explain fragmentation.", "Memory fragmentation occurs when allocated memory is not contiguous, increasing RSS. Use the `jemalloc` allocator. Periodically restart or use `CONFIG SET` for tuning. In Redis 4.0+, `MEMORY PURGE` can help."],
  ["Redis", "What is the `MEMORY STATS` command?", "memory-stats", "Explain memory statistics.", "`MEMORY STATS` returns detailed memory usage breakdown: peak memory, fragmentation ratio, allocator stats, etc. Useful for debugging."],
  ["Redis", "How do you monitor Redis performance in production?", "monitoring-performance", "Explain monitoring practices.", "Use `INFO`, `SLOWLOG`, `MONITOR` (careful), `redis-cli --stat`, and external tools (Prometheus, Grafana, RedisInsight). Monitor latency, memory, hit rate, and connections."],
  ["Redis", "What is the hit rate and how to improve it?", "hit-rate", "Explain cache hit ratio.", "Hit rate = (total requests - misses) / total requests. Improve by increasing cache size, using appropriate eviction policies, and warming up caches."],
  ["Redis", "What is cache stampede and how to prevent it?", "cache-stampede", "Explain stampede effect.", "When many clients try to rebuild a cache simultaneously on expiry. Prevent using: 'recompute' with locking, or use 'stale-while-revalidate' (use stale data while updating)."],
  ["Redis", "What is the `CLIENT PAUSE` command?", "client-pause", "Explain pausing connections.", "`CLIENT PAUSE timeout` stops processing commands from clients for the given time (in milliseconds), allowing failover or maintenance with minimal data loss."],
  ["Redis", "How can you reduce latency in Redis?", "reduce-latency", "Explain latency reduction.", "Use pipelining, reduce round trips. Use persistent connections. Avoid large commands. Use efficient data structures. Optimize network (use local or AWS placement)."],

  // ==================== PERSISTENCE (10) ====================
  ["Redis", "What is RDB persistence and how does it work?", "rdb-persistence", "Explain RDB.", "RDB creates a point-in-time snapshot of the dataset, saved as a binary .rdb file. It's triggered by `SAVE` (blocking) or `BGSAVE` (fork). Good for backups, disaster recovery, and faster restarts."],
  ["Redis", "What is AOF persistence and how does it work?", "aof-persistence", "Explain AOF.", "AOF (Append Only File) logs every write operation to a file. On restart, Redis replays the log. It offers better durability; you can configure `appendfsync` (always, everysec, no)."],
  ["Redis", "What is the difference between `SAVE` and `BGSAVE`?", "save-vs-bgsave", "Compare save commands.", "`SAVE` blocks all other operations until the dump is complete. `BGSAVE` forks a child process to perform the save, allowing the parent to continue serving requests."],
  ["Redis", "What is the `appendfsync` option and its trade-offs?", "appendfsync", "Explain fsync options.", "`always` syncs every write (slowest but safest). `everysec` syncs once per second (good compromise). `no` lets the OS handle sync (fastest but may lose data)."],
  ["Redis", "How do you recover from AOF corruption?", "aof-corruption", "Explain recovery.", "Use `redis-check-aof` tool to fix the AOF file (remove invalid parts). Alternatively, use the last known good RDB snapshot if AOF is beyond repair."],
  ["Redis", "What are the pros and cons of RDB vs AOF?", "rdb-vs-aof-pros-cons", "Compare in detail.", "RDB: compact, faster for large datasets, but data loss on crash. AOF: more durable, but larger files, slower restarts. Use both for best of both worlds."],
  ["Redis", "What is the `BGREWRITEAOF` command?", "bgrewriteaof", "Explain AOF rewrite.", "`BGREWRITEAOF` rewrites the AOF file to be as small as possible, by removing duplicate commands and compacting. Runs in background."],
  ["Redis", "How do you configure Redis to use both RDB and AOF?", "both-persistence", "Explain configuration.", "Set `save` options for RDB and `appendonly yes` for AOF. On startup, if both exist, AOF is preferred (if enabled) as it is more complete."],
  ["Redis", "What is the Redis persistence trade-off between performance and durability?", "persistence-tradeoff", "Explain trade-offs.", "Higher durability (AOF `always`) reduces performance. RDB snapshots have less overhead but risk data loss. Choose based on application requirements."],
  ["Redis", "How do you backup Redis data?", "backup-redis", "Explain backup strategies.", "Use `BGSAVE` to create an RDB file and copy it. For AOF, copy the AOF file. Use Redis replication for off-site backup. Use cloud snapshots."],

  // ==================== REPLICATION & HIGH AVAILABILITY (10) ====================
  ["Redis", "What is Redis replication?", "replication-overview", "Explain replication.", "Replication allows data to be copied from a primary (master) to one or more replicas (slaves). It provides read scalability and data redundancy. Replicas can also be promoted to master in failover."],
  ["Redis", "How does Redis replication work?", "replication-how", "Explain process.", "Replica connects to master, sends `SYNC` (or `PSYNC`). Master forks a child to save RDB and sends it to replica. Replica loads the RDB, then master sends incremental updates (replication stream)."],
  ["Redis", "What is `PSYNC` and how is it different from `SYNC`?", "psync-vs-sync", "Explain partial sync.", "`SYNC` forces a full resync. `PSYNC` supports partial resync if the replica has a recent replication offset, reducing bandwidth and time."],
  ["Redis", "What is Redis Sentinel?", "sentinel", "Explain Sentinel.", "Redis Sentinel is a system for monitoring Redis instances, automatic failover, and configuration provider. It runs as separate processes and can detect failures and promote replicas."],
  ["Redis", "How does Redis Sentinel perform failover?", "sentinel-failover", "Explain failover.", "Sentinel quorum detects master failure, elects a new master among replicas, updates configurations, and notifies clients. Requires proper quorum settings."],
  ["Redis", "What is the role of `replica-priority` in Sentinel?", "replica-priority", "Explain priority.", "`replica-priority` (or `slave-priority`) sets the priority for promoting a replica to master. Lower values have higher priority. Useful to prefer certain replicas."],
  ["Redis", "What are the pros and cons of Redis Sentinel vs Redis Cluster?", "sentinel-vs-cluster", "Compare HA solutions.", "Sentinel provides high availability but does not support sharding (all data on one node). Cluster provides sharding and high availability, but is more complex."],
  ["Redis", "What is read-only replica and how to enable?", "readonly-replica", "Explain read-only.", "By default, replicas are read-only. You can set `replica-read-only yes` (default). You can also use `READONLY` command to allow reads on replicas in cluster mode."],
  ["Redis", "How do you monitor replication lag?", "replication-lag", "Explain lag monitoring.", "Use `INFO replication` to see `master_repl_offset` and `slave_repl_offset`. Lag is the difference. Use `MONITOR` on replica to see incoming commands."],
  ["Redis", "How do you perform a manual failover?", "manual-failover", "Explain manual failover.", "Use `REPLICAOF NO ONE` on a replica to make it master. On the old master, use `REPLICAOF new_master`. In Sentinel, use `SENTINEL failover`."],

  // ==================== CLUSTERING (10) ====================
  ["Redis", "What is Redis Cluster?", "cluster-overview", "Explain Redis Cluster.", "Redis Cluster is a distributed implementation that automatically shards data across multiple nodes. It provides high availability and scalability. Supports partitioning with hash slots (16384 slots)."],
  ["Redis", "How does Redis Cluster handle data distribution?", "cluster-hash-slots", "Explain hash slots.", "The keyspace is divided into 16,384 hash slots. Each key is assigned to a slot using a hash function. Nodes are responsible for a subset of slots."],
  ["Redis", "What is the difference between Redis Cluster and Sentinel?", "cluster-vs-sentinel", "Compare.", "Cluster offers sharding and high availability; Sentinel only provides HA without sharding. Cluster is more complex to set up and requires client support."],
  ["Redis", "How do you set up a Redis Cluster?", "cluster-setup", "Explain cluster creation.", "Start multiple Redis instances with `cluster-enabled yes`. Use `redis-cli --cluster create` to assign slots and set up replicas. Requires at least 3 masters."],
  ["Redis", "What is the `CLUSTER` command?", "cluster-command", "Explain cluster commands.", "Commands: `CLUSTER INFO` (cluster state), `CLUSTER NODES` (nodes info), `CLUSTER MEET` (add node), `CLUSTER FAILOVER` (manual failover), `CLUSTER REPLICATE` (set replica)."],
  ["Redis", "How does Redis Cluster handle failover?", "cluster-failover", "Explain cluster failover.", "If a master fails, its replicas will elect a new master. The cluster can continue with majority of nodes. `cluster-require-full-coverage` controls whether cluster accepts writes when not all slots are covered."],
  ["Redis", "What are the client requirements for Redis Cluster?", "cluster-client-requirements", "Explain client support.", "Clients must be cluster-aware, handle `MOVED` and `ASK` redirections. Many clients have built-in support (Jedis, Lettuce, redis-py, etc.)."],
  ["Redis", "What is the `ASK` redirection in Redis Cluster?", "ask-redirection", "Explain `ASK`.", "During slot migration, a node may temporarily have a slot. `ASK` tells client to query another node for that key, but not to update the slot mapping (like `MOVED` does)."],
  ["Redis", "How do you reshard a Redis Cluster?", "resharding", "Explain resharding.", "Use `redis-cli --cluster reshard` to move slots between nodes. Also use `redis-cli --cluster rebalance`. This is online and incremental."],
  ["Redis", "What are the limitations of Redis Cluster?", "cluster-limitations", "List limitations.", "Limited to 1,000 nodes. Transactions only work with keys in the same slot. Some commands (e.g., `SINTER` with keys across nodes) are not supported. More operational complexity."],

  // ==================== SECURITY (10) ====================
  ["Redis", "How do you secure a Redis deployment?", "redis-security", "Explain security measures.", "Enable authentication (`requirepass`). Use TLS/SSL for encryption. Bind to localhost or use firewall. Use rename-command to disable dangerous commands (e.g., `FLUSHALL`). Run with non-root user. Keep Redis updated."],
  ["Redis", "What is the `requirepass` configuration?", "requirepass", "Explain authentication.", "`requirepass` sets a password that clients must provide with `AUTH` command. It's a simple shared secret, but not sufficient for robust security."],
  ["Redis", "How do you enable TLS/SSL in Redis?", "redis-tls", "Explain TLS setup.", "Redis 6.0+ supports TLS. Configure `tls-port`, `tls-cert-file`, `tls-key-file`, `tls-ca-cert-file`. Use `--tls` in redis-cli. Also set `tls-auth-clients`."],
  ["Redis", "What is the `ACL` (Access Control List) in Redis?", "redis-acl", "Explain ACLs.", "Redis 6.0+ introduces ACLs for fine-grained access control. Define users with passwords and permissions (e.g., read, write, specific commands). Use `ACL SETUSER` and `ACL CAT`."],
  ["Redis", "How do you disable dangerous commands in Redis?", "disable-commands", "Explain command renaming.", "Use `rename-command CONFIG \"\"` to disable `CONFIG`, or rename to a obscure name. This prevents accidental or malicious use."],
  ["Redis", "What is the `protected-mode` in Redis?", "protected-mode", "Explain protected mode.", "Redis by default runs in protected mode, which only accepts connections from localhost if no password or bind configuration is set. It helps prevent unintended exposure."],
  ["Redis", "How do you audit Redis access?", "audit-access", "Explain auditing.", "Enable slow log to capture commands. Use `MONITOR` (with caution). In Redis Enterprise, there are audit logs. For open-source, use network logs or application-side logging."],
  ["Redis", "What are common Redis security vulnerabilities?", "redis-vulnerabilities", "List vulnerabilities.", "Unprotected exposure (no auth), command injection via Lua scripts, cross-script data leakage (with EVAL), denial of service (large keys, slow commands)."],
  ["Redis", "How do you set up Redis with a password in a client?", "client-auth", "Explain client authentication.", "Use `AUTH password` after connecting, or provide password in connection string (e.g., redis://:password@host:port)."],
  ["Redis", "What is the `redis-sentinel` security considerations?", "sentinel-security", "Explain Sentinel security.", "Sentinel also supports authentication and TLS. Use `requirepass` and `masterauth` for Sentinel to communicate with Redis instances."],

  // ==================== ADVANCED FEATURES (15) ====================
  ["Redis", "What is Redis Pub/Sub?", "pubsub", "Explain Pub/Sub.", "Redis Pub/Sub is a messaging system where publishers send messages to channels, and subscribers receive them. Commands: `PUBLISH`, `SUBSCRIBE`, `UNSUBSCRIBE`, `PSUBSCRIBE` (pattern-based)."],
  ["Redis", "What is the difference between Pub/Sub and Streams?", "pubsub-vs-streams", "Compare messaging paradigms.", "Pub/Sub is fire-and-forget; no persistence, no message history, no acknowledgment. Streams persist messages, support consumer groups, and allow replay. Streams are more robust for reliable messaging."],
  ["Redis", "What are Redis modules?", "redis-modules", "Explain modules.", "Modules extend Redis with new data types and commands. Examples: RediSearch (full-text search), RedisGraph (graph database), RedisJSON (JSON), RedisTimeSeries (time-series)."],
  ["Redis", "What is RediSearch and what does it offer?", "redisearch", "Explain RediSearch.", "RediSearch is a Redis module providing full-text search, indexing, and querying. It supports aggregation, geospatial filters, and scoring. It's faster than Redis' built-in `FT.SEARCH`."],
  ["Redis", "What is RedisJSON?", "redisjson", "Explain JSON module.", "RedisJSON allows storing and manipulating JSON documents in Redis. It provides commands like `JSON.SET`, `JSON.GET`, `JSON.ARRAPPEND`. Combines flexibility of JSON with Redis performance."],
  ["Redis", "What is RedisTimeSeries?", "redistimeseries", "Explain time-series module.", "RedisTimeSeries is a Redis module for handling time-series data (e.g., metrics, sensor data). It provides downsampling, aggregation, and queries over time."],
  ["Redis", "What is RedisGraph?", "redisgraph", "Explain graph database module.", "RedisGraph is a graph database module that uses the Cypher query language. It's built on the Property Graph model and is implemented on top of Redis."],
  ["Redis", "What is the `EVAL` command and how do you write Lua scripts?", "eval-command", "Explain Lua scripting.", "`EVAL script numkeys key [key ...] arg [arg ...]` executes a Lua script. The script can access keys and arguments. It runs atomically. Example: `EVAL \"return redis.call('SET', KEYS[1], ARGV[1])\" 1 key value`."],
  ["Redis", "What are the best practices for Lua scripting?", "lua-best-practices", "List best practices.", "Keep scripts small. Use `KEYS` and `ARGV` properly. Avoid heavy Lua operations. Use `SCRIPT LOAD` and `EVALSHA` for preloaded scripts to reduce bandwidth."],
  ["Redis", "What is the `SCRIPT` command?", "script-command", "Explain script management.", "Commands: `SCRIPT LOAD` loads script, returns SHA. `SCRIPT EXISTS` checks if script exists. `SCRIPT FLUSH` clears script cache. `SCRIPT KILL` kills a running script."],
  ["Redis", "What is the `FUNCTION` command (Redis 7.0)?", "function-command", "Explain functions.", "Redis 7.0 introduced functions as a managed way to run Lua scripts. Functions are stored in the server, versioned, and can be loaded via `FUNCTION LOAD`. They replace the deprecated `EVAL` in some cases."],
  ["Redis", "What is the difference between `EVAL` and `FUNCTION`?", "eval-vs-function", "Compare.", "`FUNCTION` offers better management, versioning, and security. `FUNCTION` scripts are stored in the Redis database and can be called with `FCALL`. `EVAL` is simpler but less manageable."],
  ["Redis", "What is the `Redis 7.0` new features?", "redis7-features", "List Redis 7.0 features.", "Redis 7.0 introduces Redis Functions (as above), ACL improvements, sharded pub/sub, and better memory management. Also, more observable metrics."],
  ["Redis", "What is the `Sharded Pub/Sub` in Redis 7.0?", "sharded-pubsub", "Explain sharded pub/sub.", "In Redis Cluster, Pub/Sub messages are broadcast to all nodes. Sharded Pub/Sub restricts messages to a subset of nodes (based on channel hash slot) to reduce network load."],
  ["Redis", "What is the `MEMORY DOCTOR` command?", "memory-doctor", "Explain memory advice.", "`MEMORY DOCTOR` analyzes memory usage and provides advice on optimizations. It helps identify fragmentation, large keys, etc."],

  // ==================== SCENARIO-BASED (20) ====================
  ["Redis", "How would you use Redis as a cache with a database?", "redis-cache-pattern", "Explain caching pattern.", "Use Redis for caching frequently accessed data. Implement cache-aside: read from Redis, if miss, read from DB, write to Redis. Use TTL to expire. Use write-through or write-behind for updates."],
  ["Redis", "How would you implement a distributed lock with Redis?", "distributed-lock", "Explain distributed lock.", "Use `SET key value NX EX timeout` (atomic) to acquire lock. Release with Lua script to check value before deleting. For robustness, use Redlock algorithm for multi-master."],
  ["Redis", "How would you implement a rate limiter with Redis?", "rate-limiter", "Explain rate limiting.", "Use `INCR` and `EXPIRE` for sliding window. For a fixed window, use `INCR` with `EXPIRE`. For token bucket, use sorted sets or Lua scripts."],
  ["Redis", "How would you implement a leaderboard using Redis?", "leaderboard-implementation", "Explain leaderboard.", "Use Sorted Sets. Add scores with `ZADD leaderboard user score`. Retrieve top N with `ZREVRANGE leaderboard 0 N-1 WITHSCORES`. Update with `ZINCRBY`."],
  ["Redis", "How would you implement a message queue with Redis?", "message-queue-implementation", "Explain message queue.", "Use Lists with `LPUSH`/`RPOP` (or `BRPOP` for blocking). For more features, use Streams with consumer groups (XADD, XREADGROUP, XACK)."],
  ["Redis", "How would you store session data in Redis?", "session-storage", "Explain session storage.", "Store session as a Hash with `HSET session:userid field value`. Set TTL with `EXPIRE` (e.g., 30 mins). Use `HGETALL` to retrieve."],
  ["Redis", "How would you handle real-time analytics with Redis?", "real-time-analytics-redis", "Explain real-time analytics.", "Use HyperLogLog for unique counts. Use sorted sets for time-series ranking. Use bitmaps for daily active users. Use Streams for event logging."],
  ["Redis", "How would you paginate through a large sorted set?", "sorted-set-pagination", "Explain pagination.", "Use `ZRANGE key start stop` for offset-based pagination. For efficient pagination with many items, use `ZRANK` to get rank of a starting element and then `ZRANGEBYSCORE`."],
  ["Redis", "How would you implement a search autocomplete with Redis?", "autocomplete-redis", "Explain autocomplete.", "Use sorted sets with all possible prefixes as scores, or use a trie stored as a sorted set. Alternatively, use RediSearch for full-text autocomplete."],
  ["Redis", "How would you handle data expiration in Redis?", "data-expiration", "Explain expiry handling.", "Use `EXPIRE`, `PEXPIRE`, `SETEX`, `PSETEX`. For hash fields, set TTL on the key only. For frequent updates, reset TTL. Use `TTL` to check remaining time."],
  ["Redis", "How would you design a follower-following relationship with Redis?", "social-graph-redis", "Explain social graph.", "Use Sets: `followers:userid` and `following:userid`. To get mutual followers, use `SINTER`. To suggest follows, use `SUNION` or `SDIFF`."],
  ["Redis", "How would you implement a job queue with priorities?", "priority-queue-redis", "Explain priority queue.", "Use multiple sorted sets for different priority levels, or use a single sorted set with score as priority. Pop the highest priority with `ZPOPMAX` or `BZPOPMAX`."],
  ["Redis", "How would you implement a simple countdown timer using Redis?", "countdown-timer", "Explain timer.", "Use `SET key value EX seconds` to set an expiry. Use `TTL` to check remaining time. For real-time updates, use Pub/Sub to notify when expired."],
  ["Redis", "How would you implement a notification system with Redis?", "notification-system", "Explain notification system.", "Use Pub/Sub to broadcast notifications to subscribers. For persistent notifications, use Streams with consumer groups. Use `XADD` and `XREAD`."],
  ["Redis", "How would you implement a shopping cart with Redis?", "shopping-cart", "Explain shopping cart.", "Store as a Hash: `HSET cart:userid productId quantity`. Use `HINCRBY` to update quantity. Use `HDEL` to remove items. Persist to database on checkout."],
  ["Redis", "How would you implement a global counter?", "global-counter", "Explain counter.", "Use `INCR` for atomic increments. For per-day counters, include date in key: `stats:page:2023-01-01`. Use `INCR` and `EXPIRE` if needed."],
  ["Redis", "How would you implement a top 10 trending topics with Redis?", "trending-topics", "Explain trending.", "Use sorted sets with a score representing trend (e.g., mentions). Increment score with `ZINCRBY`. Retrieve top 10 with `ZREVRANGE`. Decay scores over time using a script."],
  ["Redis", "How would you use Redis for geolocation-based recommendations?", "geo-recommendations", "Explain geo search.", "Use geospatial indexes with `GEOADD` to store locations. Use `GEORADIUS` or `GEORADIUSBYMEMBER` to find nearby places. Combine with other data for recommendations."],
  ["Redis", "How would you implement a distributed counter with Redis?", "distributed-counter", "Explain distributed counter.", "Use `INCR` on a key. For multi-instance, ensure atomicity. If using cluster, make sure the key is in one slot. For high contention, use `INCR` and rely on Redis atomicity."],
  ["Redis", "How would you handle database failover with Redis Cache?", "failover-cache", "Explain failover handling.", "Use Redis Sentinel or Cluster for automatic failover. The client should handle connection retries. Implement circuit breakers. In worst case, fallback to direct DB."],

  // ==================== MONITORING & ADMINISTRATION (10) ====================
  ["Redis", "How do you monitor Redis using `redis-cli`?", "monitor-cli", "Explain monitoring commands.", "Use `INFO` for stats. Use `MONITOR` to see commands in real-time (but heavy). Use `--stat` for live stats. Use `--intrinsic-latency` to test latency."],
  ["Redis", "What is the `redis-cli --stat`?", "stat-command", "Explain stat.", "`redis-cli --stat` continuously prints a summary of Redis statistics (ops/sec, hits, misses, memory, etc.). Useful for quick monitoring."],
  ["Redis", "How do you view slow queries in Redis?", "slow-query-monitoring", "Explain slow log.", "Use `SLOWLOG GET [count]` to retrieve slow queries. Use `SLOWLOG LEN` and `SLOWLOG RESET` to manage."],
  ["Redis", "What is `redis-check-rdb` and `redis-check-aof`?", "check-tools", "Explain recovery tools.", "`redis-check-rdb` checks RDB file integrity. `redis-check-aof` checks/fixes AOF file. They are used for data recovery."],
  ["Redis", "What is the `redis-sentinel` command?", "sentinel-command", "Explain Sentinel CLI.", "`redis-sentinel` is the binary to run Sentinel. It reads a sentinel.conf file. You can also use `redis-cli -p 26379` to interact with Sentinel."],
  ["Redis", "How do you perform a health check on Redis?", "health-check", "Explain health check.", "Use `PING` to check if server is responding. Use `INFO` to check memory, replication, and cluster health. Use `CLIENT LIST` to see connections."],
  ["Redis", "What are the key metrics to monitor in Redis?", "key-metrics", "List metrics.", "Memory usage, hit rate, ops/sec, replication lag, connected clients, command stats, eviction rate, and latency percentiles."],
  ["Redis", "How do you configure Redis logging?", "redis-logging", "Explain logging.", "Set `loglevel` (debug, verbose, notice, warning). Set `logfile` to a path. Use `syslog-enabled` for system logging. Log rotation can be handled externally."],
  ["Redis", "How do you perform a Redis upgrade with minimal downtime?", "redis-upgrade", "Explain upgrade strategy.", "For Sentinel: failover to a replica, upgrade old master, then rejoin. For Cluster: use online upgrade of each node (use `CLUSTER FAILOVER`). Ensure compatibility."],
  ["Redis", "What are the common Redis error messages and how to resolve them?", "common-errors", "List common errors.", "`OOM command not allowed when used memory > 'maxmemory'` (increase memory or evict). `MISCONF Redis is configured to save RDB snapshots` (fix disk space/permissions). `LOADING Redis is loading the dataset` (wait for loading)."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Redis concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Redis commands without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "redis" },
    update: { name: "Redis", group: "Technology", description: "Redis interview questions." },
    create: { name: "Redis", slug: "redis", group: "Technology", description: "Redis interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "redis" } },
    update: {},
    create: { name: "Redis", slug: "redis", categoryId: category.id },
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
        tags: ["Redis"],
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
        tags: ["Redis"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Redis questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");