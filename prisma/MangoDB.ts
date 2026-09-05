// ---- 200+ MongoDB Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["MongoDB", "MongoDB"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["MongoDB", "What is MongoDB and what are its main features?", "mongodb-overview", "Define MongoDB and list its key features.", "MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents (BSON). It features a flexible schema, horizontal scaling via sharding, high availability with replica sets, an expressive query language, and aggregation pipeline for data processing. It is designed for modern application development."],
  ["MongoDB", "What is the difference between MongoDB and SQL databases?", "mongodb-vs-sql", "Compare MongoDB with relational databases.", "MongoDB is schema-flexible, uses documents (BSON) instead of tables, and supports embedded documents and arrays. SQL databases are relational, have fixed schemas, and use SQL. MongoDB trades joins for denormalization, offering better performance for certain workloads and easier horizontal scaling."],
  ["MongoDB", "What is BSON and how is it different from JSON?", "bson-vs-json", "Explain BSON and its advantages.", "BSON (Binary JSON) is a binary-encoded serialization of JSON-like documents. It supports additional data types like Date, Binary, and ObjectId. BSON is more efficient to traverse and encode/decode, and it's used by MongoDB for storage and over-the-wire transmission."],
  ["MongoDB", "What is a document in MongoDB?", "document-definition", "Define a MongoDB document.", "A document is a set of key-value pairs, analogous to a row in SQL. Documents are stored in collections, and they can have nested structures and arrays. Each document has a unique `_id` field (primary key)."],
  ["MongoDB", "What is a collection in MongoDB?", "collection-definition", "Define a collection.", "A collection is a group of documents, similar to a table in relational databases. Collections do not enforce a schema, allowing documents of different structures to coexist, though it's recommended to have a consistent structure."],
  ["MongoDB", "What is the default port for MongoDB?", "mongodb-port", "Specify the default port.", "MongoDB's default port is 27017. For sharded clusters, the default ports are 27018 for shards, 27019 for config servers."],
  ["MongoDB", "How do you start MongoDB?", "start-mongodb", "Explain how to start the MongoDB server.", "You can start MongoDB using the `mongod` command. You can specify options like `--dbpath` for data directory, `--port` for port, and `--logpath` for logs. Alternatively, use `mongod --config` with a configuration file."],
  ["MongoDB", "What is the role of the `_id` field?", "id-field", "Explain the `_id` field.", "`_id` is a unique identifier for each document. It is automatically generated as an ObjectId if not provided. It serves as the primary key and is indexed by default. You can also use custom values, but they must be unique."],
  ["MongoDB", "What is ObjectId in MongoDB?", "objectid", "Explain ObjectId.", "ObjectId is a 12-byte BSON type used as the default value for `_id`. It consists of a 4-byte timestamp, 5-byte random value, and 3-byte incrementing counter. It ensures uniqueness across machines and time."],
  ["MongoDB", "What are the data types supported by MongoDB?", "data-types", "List MongoDB data types.", "MongoDB supports String, Integer, Double, Boolean, Date, ObjectId, Array, Embedded Document, Null, Binary, Regular Expression, JavaScript, Timestamp, MaxKey, MinKey, and Decimal128."],
  ["MongoDB", "What is the difference between `null` and missing fields?", "null-vs-missing", "Explain the difference.", "A field set to `null` explicitly exists with a null value, while a missing field is not present in the document. Querying `{ field: null }` will match both null and missing fields unless you use `{ field: { $exists: true, $ne: null } }` to get only explicit nulls."],
  ["MongoDB", "What is a capped collection?", "capped-collection", "Define a capped collection.", "A capped collection is a fixed-size collection that automatically removes the oldest documents when the size limit is reached. They are useful for logs, caching, and real-time data. They preserve insertion order and support high-throughput operations."],
  ["MongoDB", "What is the MongoDB shell?", "mongo-shell", "Explain the MongoDB shell.", "The MongoDB shell (`mongosh`) is an interactive JavaScript interface to MongoDB. It allows you to query, update, and administer the database. It is used for debugging, administration, and ad-hoc queries."],
  ["MongoDB", "How do you connect to MongoDB from a Node.js application?", "nodejs-connect", "Explain connection in Node.js.", "You can use the official MongoDB Node.js driver or Mongoose ODM. Example using native driver: `const { MongoClient } = require('mongodb'); const client = new MongoClient(uri); await client.connect();`"],
  ["MongoDB", "What is Mongoose and why is it used?", "mongoose", "Explain Mongoose.", "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides schema validation, type casting, middleware (hooks), and query building. It helps structure code and enforce a schema-like definition."],
  ["MongoDB", "What is the difference between MongoDB and Mongoose?", "mongodb-vs-mongoose", "Compare the driver and ODM.", "MongoDB native driver is the low-level driver that provides connection and raw CRUD operations. Mongoose builds on top, adding schema definition, validation, and abstraction. Mongoose simplifies interaction but adds overhead and may hide some native features."],
  ["MongoDB", "What is the `find` method and how does it work?", "find-method", "Explain the find method.", "`db.collection.find(query, projection)` retrieves documents matching the query. It returns a cursor, not the actual documents. You can chain methods like `.limit()`, `.sort()`, `.skip()`. To get all documents, use `.toArray()` or iterate."],
  ["MongoDB", "What is the `insertOne` and `insertMany` methods?", "insert-methods", "Explain insertion methods.", "`insertOne` inserts a single document, `insertMany` inserts multiple. Both return an object with the inserted IDs. In case of errors, `insertMany` with ordered option can stop on first error or continue."],
  ["MongoDB", "What is the `updateOne` and `updateMany` methods?", "update-methods", "Explain update methods.", "`updateOne` updates the first document matching the filter, `updateMany` updates all matched documents. They require an update operator (e.g., `$set`, `$inc`) and return a `WriteResult` with modified count."],
  ["MongoDB", "What is the `deleteOne` and `deleteMany` methods?", "delete-methods", "Explain delete methods.", "`deleteOne` deletes the first matching document, `deleteMany` deletes all matching. They return a result with `deletedCount`. To remove all documents, use `deleteMany({})`."],

  // ==================== CRUD & QUERY OPERATORS (20) ====================
  ["MongoDB", "What are the comparison operators in MongoDB? Give examples.", "comparison-operators", "List and explain comparison operators.", "Comparison operators: `$eq` (equal), `$ne` (not equal), `$gt` (>), `$gte` (>=), `$lt` (<), `$lte` (<=), `$in` (matches any in array), `$nin` (not in array). Example: `{ age: { $gt: 18 } }` finds documents where age > 18."],
  ["MongoDB", "What are the logical operators in MongoDB?", "logical-operators", "Explain `$and`, `$or`, `$not`, `$nor`.", "Logical operators: `$and` (all conditions), `$or` (any condition), `$not` (negates a condition), `$nor` (none of the conditions). Example: `{ $or: [ { age: 18 }, { name: \"John\" } ] }`."],
  ["MongoDB", "What is the `$regex` operator and how is it used?", "regex-operator", "Explain regex queries.", "`$regex` allows pattern matching using regular expressions. It can be used for case-insensitive searches with `$options`. Example: `{ name: { $regex: /^J/, $options: 'i' } }` finds names starting with J (case-insensitive)."],
  ["MongoDB", "What are element operators like `$exists` and `$type`?", "element-operators", "Explain `$exists` and `$type`.", "`$exists` checks if a field exists in the document. `$type` matches documents where the field is of a specified BSON type (e.g., `{ age: { $type: \"int\" } }`)."],
  ["MongoDB", "What are array operators like `$all`, `$elemMatch`, `$size`?", "array-operators", "Explain array query operators.", "`$all` matches arrays that contain all specified elements. `$elemMatch` matches documents where an array contains at least one element matching all criteria. `$size` matches arrays of a given length."],
  ["MongoDB", "How do you query for embedded documents?", "query-embedded", "Explain querying nested fields.", "Use dot notation: `{ \"address.city\": \"New York\" }`. For exact matches on embedded documents, use the entire sub-document. For partial matches, use dot notation with operators."],
  ["MongoDB", "How do you sort, limit, and skip documents?", "sort-limit-skip", "Explain cursor methods.", "Use `.sort({ field: 1 })` for ascending, -1 for descending. `.limit(n)` restricts number of documents. `.skip(n)` skips a number of documents. They can be chained after `find()`."],
  ["MongoDB", "What is the `$project` operator in aggregation and how does it differ from projection in `find()`?", "project-vs-find-projection", "Compare projection in aggregation vs find.", "In `find()`, projection is simple inclusion/exclusion. In aggregation `$project`, you can reshape documents, compute new fields, rename, and more. It's more powerful."],
  ["MongoDB", "What is the difference between `find()` and `aggregate()`?", "find-vs-aggregate", "Compare the methods.", "`find()` is used for simple queries and returns a cursor. `aggregate()` is used for complex data processing, allowing transformations, grouping, and joins. Aggregation pipeline can handle multi-stage operations but may be slower."],
  ["MongoDB", "How do you perform a text search in MongoDB?", "text-search", "Explain text search.", "MongoDB supports text search using a text index. Use `$text` operator in query with `$search`. You can specify case sensitivity, language, and sorting by relevance. Example: `{ $text: { $search: \"coffee\" } }`."],
  ["MongoDB", "What is the `$lookup` stage in aggregation?", "lookup-stage", "Explain the join stage.", "`$lookup` performs a left outer join with another collection. It allows you to combine documents from two collections. Example: `{ $lookup: { from: \"orders\", localField: \"_id\", foreignField: \"customerId\", as: \"orders\" } }`."],
  ["MongoDB", "How do you update a field using the value of another field?", "update-other-field", "Explain updating using another field.", "You can use the aggregation pipeline in updates (MongoDB 4.2+). Example: `db.collection.updateMany({}, [{ $set: { fullName: { $concat: [\"$firstName\", \" \", \"$lastName\"] } } }])`."],
  ["MongoDB", "What is the `$inc` operator and how is it used?", "inc-operator", "Explain increment operation.", "`$inc` increments a numeric field by a specified value. It is atomic and useful for counters. Example: `db.collection.updateOne({ _id: 1 }, { $inc: { views: 1 } })`."],
  ["MongoDB", "What is the `$set` and `$unset` operators?", "set-unset", "Explain setting and removing fields.", "`$set` sets the value of a field (creates if not exists). `$unset` removes a field. They are used in update operations."],
  ["MongoDB", "What is the `$rename` operator?", "rename-operator", "Explain renaming fields.", "`$rename` renames a field. Example: `db.collection.updateMany({}, { $rename: { \"oldName\": \"newName\" } })`."],
  ["MongoDB", "What is the `$push` and `$addToSet` operators for arrays?", "push-addtoset", "Explain array update operators.", "`$push` appends a value to an array (or creates an array). `$addToSet` adds a value to an array only if it does not already exist. `$pop` removes first or last element."],
  ["MongoDB", "How do you find and update a document atomically?", "findAndModify", "Explain atomic updates.", "Use `findOneAndUpdate` with options to return the updated document or original. You can also use `findOneAndReplace` or `findOneAndDelete`. These are atomic."],
  ["MongoDB", "What is the difference between `findOneAndUpdate` and `updateOne`?", "findOneAndUpdate-vs-updateOne", "Compare update methods.", "`updateOne` only updates and returns a WriteResult. `findOneAndUpdate` updates and returns the document (either before or after update). It also allows sorting and projection."],
  ["MongoDB", "How do you perform bulk writes in MongoDB?", "bulk-writes", "Explain bulk operations.", "Use `bulkWrite` method to perform multiple operations in a single command. It supports insert, update, delete with ordered or unordered options. It improves performance by reducing round trips."],
  ["MongoDB", "What is the `$currentDate` operator?", "currentdate-operator", "Explain current date update.", "`$currentDate` sets the value of a field to the current date (as a Date or timestamp). Useful for timestamps like `lastModified`."],

  // ==================== INDEXING (15) ====================
  ["MongoDB", "What are indexes in MongoDB and why are they important?", "indexes-overview", "Explain indexes.", "Indexes are special data structures that store a portion of the data in an easy-to-traverse form, supporting efficient query execution. Without indexes, MongoDB must scan entire collections (collection scan). They improve read performance but add overhead on writes and storage."],
  ["MongoDB", "How do you create an index in MongoDB?", "create-index", "Explain index creation.", "Use `createIndex` method: `db.collection.createIndex({ field: 1 })` for ascending, -1 for descending. You can specify options like `unique`, `sparse`, `expireAfterSeconds`, etc."],
  ["MongoDB", "What is a compound index and how does it work?", "compound-index", "Explain compound indexes.", "A compound index is an index on multiple fields. The order of fields is important for query performance. It can support queries on the prefix of the index fields. Example: `createIndex({ a: 1, b: -1 })`."],
  ["MongoDB", "What is a unique index and when would you use it?", "unique-index", "Explain unique indexes.", "A unique index ensures that the indexed fields do not store duplicate values. It is used for fields like email, username. Cannot be applied to arrays unless using `unique: true` with `sparse` option."],
  ["MongoDB", "What is a sparse index?", "sparse-index", "Explain sparse indexes.", "A sparse index only indexes documents that contain the indexed field. It saves space and can improve performance for queries where the field exists. It can be combined with `unique` to allow multiple documents missing the field."],
  ["MongoDB", "What is a TTL index and how is it used?", "ttl-index", "Explain time-to-live index.", "A TTL (Time to Live) index automatically removes documents after a certain time. It is created with `expireAfterSeconds` option on a date field. It is used for session data, logs, or caching."],
  ["MongoDB", "What is a geospatial index?", "geospatial-index", "Explain geospatial indexes.", "MongoDB supports geospatial queries with 2dsphere (for GeoJSON) and 2d (legacy coordinates) indexes. They enable queries like finding nearby points, within a polygon, or intersection."],
  ["MongoDB", "What is a text index?", "text-index", "Explain text index.", "A text index enables full-text search on string content. You can create a text index on one or more fields. Supports language-specific stemming and stop words."],
  ["MongoDB", "How do you view the indexes on a collection?", "list-indexes", "Explain listing indexes.", "Use `db.collection.getIndexes()` to list all indexes on a collection. It returns an array of index specifications."],
  ["MongoDB", "How do you drop an index?", "drop-index", "Explain dropping indexes.", "Use `db.collection.dropIndex({ field: 1 })` or `dropIndex('indexName')`."],
  ["MongoDB", "What is the difference between a covered query and a non-covered query?", "covered-query", "Explain covered queries.", "A query is covered if all the fields in the query and projection are part of an index, and no document scanning is needed. It returns results directly from the index, improving performance."],
  ["MongoDB", "How can you analyze query performance?", "explain-query", "Explain the `explain()` method.", "Use `db.collection.find().explain('executionStats')` to get execution details, including index usage, number of documents scanned, and execution time. Helps in optimizing queries."],
  ["MongoDB", "What is the impact of indexing on write operations?", "index-write-overhead", "Explain write performance impact.", "Each index must be updated on every write (insert, update, delete). This causes overhead, increased memory, and slower writes. Indexes should be chosen carefully, balancing read and write needs."],
  ["MongoDB", "What are the best practices for indexing?", "indexing-best-practices", "List best practices.", "Create indexes that support frequent queries. Use compound indexes for queries with multiple fields. Avoid over-indexing. Use `explain()` to verify index usage. Consider selective indexes (sparse, partial)."],
  ["MongoDB", "What is a partial index?", "partial-index", "Explain partial indexes.", "A partial index only indexes documents that meet a specified filter expression. It reduces index size and improves performance for queries that target a subset of documents."],

  // ==================== AGGREGATION PIPELINE (15) ====================
  ["MongoDB", "What is the aggregation pipeline?", "aggregation-pipeline", "Define aggregation pipeline.", "The aggregation pipeline is a framework for data processing. It consists of stages that transform documents as they pass through the pipeline. Each stage performs an operation like filtering, grouping, sorting, or reshaping."],
  ["MongoDB", "What are the common stages in the aggregation pipeline?", "common-stages", "List common stages.", "Common stages: `$match` (filter), `$project` (reshape), `$group` (group by), `$sort` (sort), `$limit`, `$skip`, `$unwind` (deconstruct arrays), `$lookup` (join), `$addFields` (add computed fields), `$bucket`, `$facet`, `$graphLookup`."],
  ["MongoDB", "What is the `$match` stage and how is it used?", "match-stage", "Explain `$match`.", "`$match` filters documents, similar to `find()`. It should be placed early in the pipeline to reduce the number of documents processed in later stages."],
  ["MongoDB", "What is the `$group` stage and how does it work?", "group-stage", "Explain `$group`.", "`$group` groups documents by a specified key and can compute accumulations like `$sum`, `$avg`, `$max`, `$min`, `$push`, `$addToSet`. Example: `{ $group: { _id: \"$category\", total: { $sum: 1 } } }`."],
  ["MongoDB", "What is the `$unwind` stage and when is it useful?", "unwind-stage", "Explain `$unwind`.", "`$unwind` deconstructs an array field, creating one document per array element. It is useful for grouping or aggregating data inside arrays. It can be used with `preserveNullAndEmptyArrays` to keep documents without the array."],
  ["MongoDB", "What is the `$lookup` stage and how does it perform joins?", "lookup-stage-detail", "Explain `$lookup` in depth.", "`$lookup` performs a left outer join with a foreign collection. It matches documents based on local and foreign fields, and adds the joined results as an array. It can also use pipeline syntax for more complex joins."],
  ["MongoDB", "What is the `$addFields` stage?", "addFields-stage", "Explain `$addFields`.", "`$addFields` adds new fields to documents without changing existing ones. It can compute values using expressions. It is useful for adding derived data."],
  ["MongoDB", "What is the `$facet` stage?", "facet-stage", "Explain `$facet`.", "`$facet` allows multiple independent sub-pipelines within a single stage, returning a single document with results from each facet. Used for building dashboards or multi-dimensional analysis."],
  ["MongoDB", "What is the `$bucket` stage?", "bucket-stage", "Explain bucketing.", "`$bucket` groups documents into buckets based on a specified boundary. It's useful for histogram-like aggregation."],
  ["MongoDB", "What is the `$graphLookup` stage?", "graphLookup-stage", "Explain recursive lookup.", "`$graphLookup` performs a recursive search on a collection, following references. It's useful for hierarchical data (like parent-child relationships)."],
  ["MongoDB", "What is the difference between `$project` and `$addFields`?", "project-vs-addFields", "Compare `$project` and `$addFields`.", "`$project` reshapes the document, including or excluding fields, and can also add new fields. `$addFields` only adds new fields; it does not remove existing ones. `$addFields` is often more convenient when you just want to add computed fields."],
  ["MongoDB", "What is the `$merge` stage?", "merge-stage", "Explain `$merge`.", "`$merge` writes the results of the aggregation pipeline to a collection. It can merge with existing documents or replace them. It is used for materializing aggregated results."],
  ["MongoDB", "What is the `$replaceRoot` stage?", "replaceRoot-stage", "Explain `$replaceRoot`.", "`$replaceRoot` replaces the current document with a new document (often from an embedded field). Useful for promoting a sub-document to root."],
  ["MongoDB", "How do you debug an aggregation pipeline?", "debug-aggregation", "Explain debugging techniques.", "Use `$match` early to limit data. Use `$limit` to test with small data. Use `$project` to see intermediate fields. Use `explain()` on aggregation pipelines (if supported). Use `mongosh` to run pipeline step by step."],
  ["MongoDB", "What are the performance considerations for aggregation pipelines?", "aggregation-performance", "List performance tips.", "Place `$match` early. Use indexes when possible (e.g., for `$match` and `$sort`). Avoid large `$unwind` on huge arrays. Use `$limit` before `$skip` in pagination. Use `$project` to reduce data size early."],

  // ==================== SCHEMA DESIGN & DATA MODELING (10) ====================
  ["MongoDB", "What is the difference between embedding and referencing?", "embedding-vs-referencing", "Compare embedding and referencing.", "Embedding stores related data within the same document, improving read performance and atomicity. Referencing stores separate documents with links (like foreign keys), enabling more flexible queries and avoiding duplication. Choose embedding for one-to-one and one-to-many where the child is always accessed with parent."],
  ["MongoDB", "What is denormalization in MongoDB?", "denormalization", "Explain denormalization.", "Denormalization is the practice of storing redundant data to avoid joins. In MongoDB, embedding is a form of denormalization. It improves read performance but increases storage and update complexity."],
  ["MongoDB", "What are the anti-patterns in MongoDB schema design?", "schema-anti-patterns", "List anti-patterns.", "Massive arrays that exceed 16MB (use referencing). Too many indexes. Embedding large, unbounded arrays. Using separate collections for each logical entity without good reason. Not using `_id` effectively."],
  ["MongoDB", "How do you design for one-to-many relationships?", "one-to-many-design", "Explain design options.", "You can either embed the many side if the number is small and bounded, or reference them using an array of IDs or a foreign key field. Consider query patterns: if you always load the parent with its children, embedding is good."],
  ["MongoDB", "What is the 16MB document limit and how do you work around it?", "16mb-limit", "Explain document size limit.", "MongoDB has a 16MB BSON document limit. To work around, use referencing to split data across documents, or use GridFS for large files. Avoid storing large arrays or huge nested documents."],
  ["MongoDB", "What is GridFS and when is it used?", "gridfs", "Explain GridFS.", "GridFS is a specification for storing and retrieving large files (exceeding 16MB) in MongoDB. It splits the file into chunks and stores them in two collections: `fs.files` and `fs.chunks`. It's used for files like images, videos, documents."],
  ["MongoDB", "What is the difference between a document and a collection in terms of schema?", "document-vs-collection-schema", "Explain schema flexibility.", "Documents within a collection can have different fields and structures. This flexibility allows iterative development and polymorphism, but it's recommended to enforce validation rules using JSON Schema."],
  ["MongoDB", "What is MongoDB validation?", "validation", "Explain document validation.", "MongoDB supports schema validation using JSON Schema. You can define rules on a collection to enforce data types, required fields, and allowed values. This ensures data quality."],
  ["MongoDB", "How do you handle many-to-many relationships?", "many-to-many-design", "Explain many-to-many design.", "Typically, use referencing with an array of foreign keys on either side or a junction collection (like in SQL). In MongoDB, you can store an array of references on one side, and query using `$lookup` to join."],
  ["MongoDB", "What are the considerations for choosing shard key?", "shard-key-considerations", "Explain shard key selection.", "Shard key determines data distribution across shards. It should have high cardinality, low frequency, and be used in most queries to enable targeted operations. Choose a key that evenly distributes writes and reads."],

  // ==================== REPLICATION & HIGH AVAILABILITY (10) ====================
  ["MongoDB", "What is a replica set?", "replica-set", "Define replica set.", "A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability. It consists of a primary node (handles writes) and secondary nodes (replicate from primary)."],
  ["MongoDB", "How does failover work in a replica set?", "failover", "Explain automatic failover.", "If the primary fails, the secondary nodes detect the failure (after heartbeat timeouts) and hold an election to select a new primary. The election ensures that the new primary has the most recent data."],
  ["MongoDB", "What is an arbiter in a replica set?", "arbiter", "Explain arbiter.", "An arbiter is a MongoDB instance that participates in elections but does not hold data. It is used to break ties in elections when an even number of voting members exist. It reduces hardware cost while maintaining quorum."],
  ["MongoDB", "What is the oplog (operation log)?", "oplog", "Explain oplog.", "The oplog is a capped collection that records all write operations on the primary. Secondaries use the oplog to replicate data asynchronously. It is crucial for replication and recovery."],
  ["MongoDB", "What is the difference between a secondary and a primary?", "primary-vs-secondary", "Compare roles.", "Primary accepts all write operations; secondaries replicate data from the primary and can serve reads if configured. Primary is elected; secondaries can become primary in failover."],
  ["MongoDB", "What are read preferences in MongoDB?", "read-preferences", "Explain read preferences.", "Read preferences determine which replica set members are used for read operations. Options: `primary`, `primaryPreferred`, `secondary`, `secondaryPreferred`, `nearest`. Choose based on consistency and latency requirements."],
  ["MongoDB", "What is the `writeConcern` and how does it affect durability?", "write-concern", "Explain write concern.", "Write concern specifies the acknowledgment level of writes. `w: 1` (ack from primary), `w: majority` (ack from majority of voting nodes), `w: 0` (no ack). Higher levels increase durability but may increase latency."],
  ["MongoDB", "What is the `readConcern`?", "read-concern", "Explain read concern.", "Read concern determines the consistency and isolation level for reads. Options: `local` (default), `available`, `majority`, `linearizable`, `snapshot`. `majority` ensures data is durable and not rolled back."],
  ["MongoDB", "How do you configure a replica set?", "configure-replica-set", "Explain setup steps.", "Start multiple mongod instances with the same replica set name. Connect to one, initiate with `rs.initiate()`. Add members with `rs.add()`. Check status with `rs.status()`."],
  ["MongoDB", "What is the election process in a replica set?", "election-process", "Explain elections.", "When a primary becomes unavailable, secondaries use a priority and optime (last applied oplog entry) to determine eligibility. They vote for a candidate that has the latest data. The candidate with highest priority and up-to-date oplog wins."],

  // ==================== SHARDING (10) ====================
  ["MongoDB", "What is sharding in MongoDB?", "sharding", "Define sharding.", "Sharding is the process of distributing data across multiple machines (shards) to support horizontal scaling. It enables handling large datasets and high throughput. Each shard holds a subset of data."],
  ["MongoDB", "What are the components of a sharded cluster?", "sharded-cluster-components", "List components.", "A sharded cluster consists of: Shards (data nodes), Config Servers (store metadata and cluster configuration), and Mongos (query routers that route requests to appropriate shards)."],
  ["MongoDB", "What is a shard key?", "shard-key", "Explain shard key.", "A shard key is a field or set of fields used to distribute documents across shards. It determines the range of values that belong to each shard. Choosing a good shard key is critical for even distribution and query performance."],
  ["MongoDB", "What is a chunk in sharding?", "chunk", "Explain chunk.", "A chunk is a contiguous range of shard key values. The balancer redistributes chunks across shards to maintain balance. Chunks can be split when they grow too large."],
  ["MongoDB", "What is the balancer and how does it work?", "balancer", "Explain balancer.", "The balancer is a background process that moves chunks between shards to keep the distribution even. It runs periodically and uses the config servers' metadata."],
  ["MongoDB", "What are the different sharding strategies?", "sharding-strategies", "List strategies.", "Hashed sharding (distributes data based on hash of shard key, ensures even distribution). Ranged sharding (based on ranges of values, useful for range queries). Zone sharding for geographic distribution."],
  ["MongoDB", "What is a shard zone?", "shard-zone", "Explain zone.", "Zones allow you to associate a range of shard key values with specific shards. Useful for geo-partitioning or data locality (e.g., store US data in US shards)."],
  ["MongoDB", "How do you choose a shard key?", "choose-shard-key", "Explain selection criteria.", "Key should have high cardinality (many unique values) to distribute writes evenly. Should have low frequency (not too many documents per value) to avoid jumbo chunks. Should be used in most queries to enable targeted operations."],
  ["MongoDB", "What are the limitations of sharding?", "sharding-limitations", "List limitations.", "Not all queries can be targeted; some need scatter-gather. Sharding adds complexity in operations and management. Some features like transactions and `$lookup` may have restrictions across shards."],
  ["MongoDB", "How do you monitor a sharded cluster?", "monitor-sharding", "Explain monitoring.", "Use `sh.status()` to view cluster status. Monitor balancer activity, chunk distribution, and query performance. Use MongoDB Cloud Manager or Ops Manager for advanced monitoring."],

  // ==================== SECURITY (10) ====================
  ["MongoDB", "How do you secure a MongoDB deployment?", "mongodb-security", "Explain security measures.", "Enable authentication (SCRAM or x.509). Use TLS/SSL for encryption in transit. Enable authorization to restrict user access. Use network isolation (firewalls). Enable auditing. Encrypt data at rest (with enterprise feature or file system encryption)."],
  ["MongoDB", "What is authentication and authorization in MongoDB?", "authn-authz", "Explain the concepts.", "Authentication verifies user identity (e.g., username/password, x.509). Authorization determines what actions a user can perform (via built-in roles or custom roles)."],
  ["MongoDB", "What are the built-in roles in MongoDB?", "built-in-roles", "List common roles.", "`read`, `readWrite`, `dbAdmin`, `userAdmin`, `clusterAdmin`, `backup`, `restore`, `root`. They provide granular permissions on database and cluster operations."],
  ["MongoDB", "How do you enable TLS/SSL in MongoDB?", "enable-tls", "Explain TLS setup.", "Use `--tlsMode` and specify certificate key file, CA file, etc. Both server and client need to be configured. For production, always use TLS to encrypt data in transit."],
  ["MongoDB", "What is SCRAM authentication?", "scram", "Explain SCRAM.", "SCRAM (Salted Challenge Response Authentication Mechanism) is the default authentication mechanism. It uses a challenge-response protocol and stores hashed passwords for security."],
  ["MongoDB", "How do you manage users in MongoDB?", "user-management", "Explain user creation.", "Use `db.createUser({ user: 'username', pwd: 'password', roles: [...] })`. Manage in the admin database. Use `db.updateUser`, `db.dropUser`."],
  ["MongoDB", "What is the role of the `admin` database?", "admin-db", "Explain admin database.", "The admin database is used for authentication and authorization. It stores user credentials and roles. It also contains system collections for cluster-wide administration."],
  ["MongoDB", "What are the security best practices for MongoDB?", "security-best-practices", "List best practices.", "Use strong passwords, enable TLS, enable authentication, use role-based access control, network isolation, regular updates, audit logging, and backup encryption."],
  ["MongoDB", "How do you encrypt data at rest in MongoDB?", "encryption-at-rest", "Explain encryption at rest.", "MongoDB Enterprise offers native encryption at rest using the WiredTiger storage engine. It encrypts data files, indexes, and logs. Alternatively, use file system or disk encryption."],
  ["MongoDB", "What is the `$redact` operator and how is it used for data privacy?", "redact-operator", "Explain `$redact`.", "`$redact` restricts the content of documents based on user permissions. It's used in aggregation pipelines to redact sensitive data at the field level, integrating with role-based access."],

  // ==================== TRANSACTIONS (5) ====================
  ["MongoDB", "What are transactions in MongoDB?", "transactions", "Explain multi-document transactions.", "Transactions in MongoDB allow multiple operations across multiple documents and collections to be executed atomically (ACID). They are available in replica sets (4.0+) and sharded clusters (4.2+)."],
  ["MongoDB", "How do you implement a transaction in MongoDB?", "implement-transaction", "Explain transaction usage.", "Use the `session` object. Start a session, call `session.startTransaction()`, perform operations, then `session.commitTransaction()`. On error, `session.abortTransaction()`."],
  ["MongoDB", "What are the limitations of MongoDB transactions?", "transaction-limitations", "List limitations.", "Transactions can only be used with replica sets/sharded clusters. They have a 60-second timeout by default. They do not support all operations (e.g., `createIndex` is not allowed). They may affect performance."],
  ["MongoDB", "What is the difference between write concern and transactions?", "write-concern-vs-transaction", "Compare durability vs atomicity.", "Write concern ensures durability (data is persisted across nodes). Transactions provide atomicity (all-or-nothing) across multiple operations. They are complementary."],
  ["MongoDB", "How does MongoDB ensure isolation in transactions?", "transaction-isolation", "Explain isolation.", "Transactions use snapshot isolation. Each transaction sees a consistent snapshot of the data. Writes are not visible to other transactions until commit. Conflicts are detected and transactions may abort."],

  // ==================== PERFORMANCE & TUNING (10) ====================
  ["MongoDB", "How do you optimize query performance in MongoDB?", "query-optimization", "Explain optimization techniques.", "Create appropriate indexes. Use `explain()` to analyze queries. Avoid `$where` (JavaScript) as it's slow. Use projection to limit returned fields. Use proper query operators. Consider aggregation for complex operations."],
  ["MongoDB", "What is a slow query and how do you find it?", "slow-query", "Explain slow query detection.", "Enable the profiler: `db.setProfilingLevel(1, { slowms: 100 })`. Then query the `system.profile` collection. Use MongoDB logs with `slowOpSampleRate` to log slow operations."],
  ["MongoDB", "What is the MongoDB Query Optimizer?", "query-optimizer", "Explain the optimizer.", "The query optimizer evaluates multiple query plans and chooses the most efficient one. It uses indexes, statistics, and heuristics. Plans are cached for a while."],
  ["MongoDB", "What is the difference between collection scan and index scan?", "collection-scan-vs-index-scan", "Compare scans.", "Collection scan reads every document in the collection (slow). Index scan reads only index entries and retrieves matching documents (fast). Covered queries avoid document retrieval."],
  ["MongoDB", "How do you monitor MongoDB performance?", "monitor-performance", "Explain monitoring tools.", "Use `mongostat`, `mongotop`, and `db.currentOp()`. Use Cloud Monitoring (Atlas, Cloud Manager). Check metrics like connections, queries, memory, disk I/O, and replication lag."],
  ["MongoDB", "What is the WiredTiger cache and how does it affect performance?", "wiredtiger-cache", "Explain cache.", "WiredTiger uses an internal cache to hold data and indexes in memory. The cache size defaults to 50% of RAM minus 1GB. If the cache is too small, performance degrades due to excessive disk I/O."],
  ["MongoDB", "How do you handle high concurrency in MongoDB?", "concurrency", "Explain concurrency control.", "MongoDB uses multi-granularity locking (database, collection, document). WiredTiger uses optimistic concurrency control. Use appropriate write concerns, and avoid long-running transactions."],
  ["MongoDB", "What is the effect of `hint()` in queries?", "hint", "Explain forcing index usage.", "`hint()` forces MongoDB to use a specific index. Useful when the query optimizer chooses a suboptimal plan. Use with caution; not recommended for general use."],
  ["MongoDB", "How do you manage MongoDB memory usage?", "memory-management", "Explain memory usage.", "MongoDB uses memory-mapped files. The operating system handles caching. Ensure the WiredTiger cache is appropriately sized. Monitor memory usage with OS tools. Avoid swapping."],
  ["MongoDB", "What is the `$queryStats` command?", "query-stats", "Explain query statistics.", "`$queryStats` provides metrics about query execution patterns, helping identify slow or frequent queries. It is available in MongoDB 6.0+."],

  // ==================== ADMINISTRATION & BACKUP (10) ====================
  ["MongoDB", "How do you back up a MongoDB database?", "backup-methods", "Explain backup options.", "Use `mongodump` (logical backup) and `mongorestore`. Use file system snapshots (e.g., LVM, EBS) for physical backups. In Atlas, use continuous backups. For replica sets, backup from a secondary."],
  ["MongoDB", "What is the difference between `mongodump` and file system snapshot backup?", "mongodump-vs-snapshot", "Compare backup methods.", "`mongodump` creates a BSON dump of the data; it's portable but slower and may affect performance. File system snapshots are faster and capture the exact state but require coordination and are less portable."],
  ["MongoDB", "How do you restore a MongoDB database?", "restore-methods", "Explain restore options.", "Use `mongorestore` for logical backups. For snapshots, mount the snapshot and start mongod with the appropriate data directory. Ensure consistency."],
  ["MongoDB", "What is the `mongod` log file and what information does it contain?", "mongod-log", "Explain logs.", "The `mongod` log contains information about startup, connections, operations (with `slowms`), errors, and replication. It is crucial for troubleshooting."],
  ["MongoDB", "How do you check the status of a replica set?", "rs-status", "Explain `rs.status()`.", "`rs.status()` returns information about the replica set members, their health, last election, and replication progress. Useful for monitoring."],
  ["MongoDB", "What is the `db.stats()` command?", "db-stats", "Explain database stats.", "`db.stats()` provides statistics about a database: document count, index size, data size, storage size, etc. Useful for capacity planning."],
  ["MongoDB", "How do you compact a collection?", "compact-collection", "Explain compaction.", "Use `db.collection.compact()` to defragment the collection and reclaim disk space. This is a blocking operation and should be run during maintenance windows."],
  ["MongoDB", "What is the `collStats` command?", "coll-stats", "Explain collection stats.", "`db.collection.stats()` returns information about the collection: index sizes, document count, average document size, storage details."],
  ["MongoDB", "How do you rotate MongoDB logs?", "log-rotation", "Explain log rotation.", "Use logrotate tool (Unix) or send `SIGUSR1` signal to the mongod process to close and reopen log files. Configure log rotation in mongod.conf."],
  ["MongoDB", "What are the common MongoDB performance monitoring metrics?", "performance-metrics", "List key metrics.", "Ops/sec (operations per second), replication lag, cache usage, connections, queue length, disk I/O, memory usage, and CPU utilization."],

  // ==================== ADVANCED FEATURES (10) ====================
  ["MongoDB", "What are change streams?", "change-streams", "Explain change streams.", "Change streams allow applications to listen to real-time changes to collections, databases, or clusters. They are built on the oplog and provide a robust way to react to data changes."],
  ["MongoDB", "How do you use change streams in Node.js?", "change-streams-nodejs", "Explain usage.", "Use `collection.watch()` to get a change stream cursor. Iterate over events (insert, update, delete). Use `resumeToken` to resume from a point. Example: `const stream = collection.watch(); stream.on('change', (change) => { ... });`."],
  ["MongoDB", "What is the `$merge` stage used for?", "merge-stage-detail", "Explain `$merge` in detail.", "`$merge` writes the results of aggregation to a specified collection. It can merge (replace/update/insert) with existing documents. It's useful for creating materialized views."],
  ["MongoDB", "What is the `$out` stage?", "out-stage", "Explain `$out`.", "`$out` writes the results of an aggregation pipeline to a collection, replacing the collection if it exists. It is less flexible than `$merge` but simple for static exports."],
  ["MongoDB", "What is the `$facet` stage used for?", "facet-stage-detail", "Explain `$facet` in depth.", "`$facet` allows multiple independent sub-pipelines that run in parallel, each producing its own result set. Useful for generating multiple aggregations in one pass."],
  ["MongoDB", "What is the `$bucketAuto` stage?", "bucketAuto-stage", "Explain automatic bucketing.", "`$bucketAuto` automatically creates buckets based on a specified number of buckets, distributing documents evenly. Useful for histograms without specifying boundaries."],
  ["MongoDB", "What is the `$sortByCount` stage?", "sortByCount-stage", "Explain `$sortByCount`.", "`$sortByCount` groups documents by a field and sorts by count in descending order. It's a shorthand for `$group` + `$sort`."],
  ["MongoDB", "What is the `$regexFind` and `$regexFindAll`?", "regexFind", "Explain regex string operators.", "These are aggregation operators that find substrings matching a regex. They return the matched substring and index. Useful for text extraction."],
  ["MongoDB", "What is MongoDB Atlas?", "atlas", "Explain Atlas.", "MongoDB Atlas is a fully managed cloud database service. It provides automated provisioning, backups, scaling, monitoring, and security. It offers multi-cloud support (AWS, GCP, Azure)."],
  ["MongoDB", "What are the advantages of using Atlas over self-managed MongoDB?", "atlas-advantages", "List benefits.", "No operational overhead, automatic backups, scaling, security updates, performance monitoring, and integration with other cloud services. It also provides global clusters and fine-grained automation."],

  // ==================== SCENARIO-BASED (15) ====================
  ["MongoDB", "How would you design a schema for a blogging platform with comments?", "blog-schema-design", "Explain schema for blog.", "Store posts in a collection with fields: title, content, author, createdAt. For comments, you can embed comments as an array within the post document if the number of comments is limited (e.g., < 1000). For larger scale, reference comments in a separate collection with `postId`."],
  ["MongoDB", "How would you implement pagination in MongoDB?", "pagination", "Explain pagination techniques.", "Use `skip` and `limit` for simple pagination. For better performance with large datasets, use range-based pagination using `_id` or a timestamp field (e.g., `find({ _id: { $gt: lastId } }).limit(10)`)."],
  ["MongoDB", "How would you implement a leaderboard with scores?", "leaderboard-design", "Explain leaderboard.", "Store users with a `score` field and create an index on `score` descending. Query `find().sort({ score: -1 }).limit(10)` for top scores. Use aggregation with `$rank` for complex leaderboards."],
  ["MongoDB", "How would you handle real-time analytics with MongoDB?", "real-time-analytics", "Explain real-time data processing.", "Use change streams to listen to events and update aggregated views. Use aggregation pipelines with `$merge` to materialize aggregated results periodically. Use Atlas Search for full-text search."],
  ["MongoDB", "How would you migrate a large collection from one cluster to another?", "migration", "Explain migration strategy.", "Use `mongodump` and `mongorestore` (may be slow). Use file system snapshots for faster migration. Use MongoDB Atlas Live Migrate for zero-downtime. Also consider using `$merge` or change streams for continuous sync."],
  ["MongoDB", "How would you handle a sudden spike in reads?", "read-spike", "Explain handling read spike.", "Scale reads by adding more secondary nodes. Use read preferences to distribute reads across secondaries. Implement caching (like Redis) for frequently accessed data. Optimize indexes."],
  ["MongoDB", "How would you handle a sudden spike in writes?", "write-spike", "Explain handling write spike.", "Increase write concern? (may slow down). Shard the collection to distribute writes. Optimize indexes to reduce write overhead. Use batch inserts. Consider using bulk writes."],
  ["MongoDB", "How would you implement a user session store using MongoDB?", "session-store", "Explain session storage.", "Create a collection `sessions` with fields: `sessionId`, `userId`, `data`, `expiresAt`. Create a TTL index on `expiresAt` to auto-remove expired sessions. Use `findOneAndUpdate` with atomic updates."],
  ["MongoDB", "How would you implement a message queue using MongoDB?", "message-queue", "Explain queue using MongoDB.", "Use a collection with fields: status (pending, processing, done). Use `findAndModify` to atomically claim a message. With change streams, you can build a reliable queue."],
  ["MongoDB", "How would you implement full-text search in a MongoDB app?", "full-text-search-scenario", "Explain full-text search implementation.", "Create a text index on the fields you want to search. Use `$text` query with `$search`. To improve relevance, use aggregation with `$meta` for text score. For more advanced features, use Atlas Search (Lucene-based)."],
  ["MongoDB", "How would you monitor replication lag?", "replication-lag-scenario", "Explain monitoring lag.", "Use `rs.printSecondaryReplicationInfo()`. In MongoDB Atlas, use the monitoring interface. Set up alerts for lag exceeding a threshold (e.g., 10 seconds)."],
  ["MongoDB", "How would you handle schema changes in a production MongoDB database?", "schema-change", "Explain schema evolution.", "Because MongoDB is schema-flexible, you can add new fields without migration. For removing or renaming fields, you can write a script to update documents gradually. Use `$rename` in an update with multi: true. For large data, perform in batches."],
  ["MongoDB", "How would you design a logging system with MongoDB?", "logging-system", "Explain logging design.", "Use a capped collection for recent logs with high insertion rate. For long-term storage, use TTL index to auto-remove old logs. Consider sharding by date. Use indexes on fields like timestamp, level, service."],
  ["MongoDB", "How would you handle multi-tenancy in MongoDB?", "multi-tenancy", "Explain multi-tenant design.", "Options: 1) Use a separate database per tenant (good isolation). 2) Use a shared collection with a tenantId field and indexes. Use row-level access control. Ensure queries always filter by tenantId."],
  ["MongoDB", "How would you implement an audit trail in MongoDB?", "audit-trail", "Explain audit logging.", "Use MongoDB's auditing feature (Enterprise) or implement manually using change streams or pre/post hooks in application. Store audit events in a separate collection with fields: user, action, timestamp, details."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain MongoDB concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing MongoDB commands without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "mongodb" },
    update: { name: "MongoDB", group: "Technology", description: "MongoDB interview questions." },
    create: { name: "MongoDB", slug: "mongodb", group: "Technology", description: "MongoDB interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "mongodb" } },
    update: {},
    create: { name: "MongoDB", slug: "mongodb", categoryId: category.id },
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
        tags: ["MongoDB"],
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
        tags: ["MongoDB"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} MongoDB questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");