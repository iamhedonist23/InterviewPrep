import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCategory = await prisma.category.findFirst({ where: { OR: [{ slug: "system-design" }, { name: "System Design" }] } });
  const category = existingCategory
    ? await prisma.category.update({ where: { id: existingCategory.id }, data: { name: "System Design", slug: "system-design", group: "Technology" } })
    : await prisma.category.create({ data: { name: "System Design", slug: "system-design", group: "Technology" } });

  const subcategory_caching = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "caching" } }, update: { name: "Caching" }, create: { name: "Caching", slug: "caching", categoryId: category.id } });
  const subcategory_collaborative_systems = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "collaborative-systems" } }, update: { name: "Collaborative Systems" }, create: { name: "Collaborative Systems", slug: "collaborative-systems", categoryId: category.id } });
  const subcategory_database_migration = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "database-migration" } }, update: { name: "Database Migration" }, create: { name: "Database Migration", slug: "database-migration", categoryId: category.id } });
  const subcategory_databases_and_consistency = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "databases-and-consistency" } }, update: { name: "Databases and Consistency" }, create: { name: "Databases and Consistency", slug: "databases-and-consistency", categoryId: category.id } });
  const subcategory_distributed_consensus = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "distributed-consensus" } }, update: { name: "Distributed Consensus" }, create: { name: "Distributed Consensus", slug: "distributed-consensus", categoryId: category.id } });
  const subcategory_distributed_coordination = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "distributed-coordination" } }, update: { name: "Distributed Coordination" }, create: { name: "Distributed Coordination", slug: "distributed-coordination", categoryId: category.id } });
  const subcategory_location_based_systems = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "location-based-systems" } }, update: { name: "Location-Based Systems" }, create: { name: "Location-Based Systems", slug: "location-based-systems", categoryId: category.id } });
  const subcategory_messaging_systems = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "messaging-systems" } }, update: { name: "Messaging Systems" }, create: { name: "Messaging Systems", slug: "messaging-systems", categoryId: category.id } });
  const subcategory_multi_region_systems = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "multi-region-systems" } }, update: { name: "Multi-Region Systems" }, create: { name: "Multi-Region Systems", slug: "multi-region-systems", categoryId: category.id } });
  const subcategory_observability = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "observability" } }, update: { name: "Observability" }, create: { name: "Observability", slug: "observability", categoryId: category.id } });
  const subcategory_payment_systems = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "payment-systems" } }, update: { name: "Payment Systems" }, create: { name: "Payment Systems", slug: "payment-systems", categoryId: category.id } });
  const subcategory_rate_limiting = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "rate-limiting" } }, update: { name: "Rate Limiting" }, create: { name: "Rate Limiting", slug: "rate-limiting", categoryId: category.id } });
  const subcategory_resilience_and_reliability = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "resilience-and-reliability" } }, update: { name: "Resilience and Reliability" }, create: { name: "Resilience and Reliability", slug: "resilience-and-reliability", categoryId: category.id } });
  const subcategory_scalability_and_traffic_management = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "scalability-and-traffic-management" } }, update: { name: "Scalability and Traffic Management" }, create: { name: "Scalability and Traffic Management", slug: "scalability-and-traffic-management", categoryId: category.id } });
  const subcategory_social_feed_design = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "social-feed-design" } }, update: { name: "Social Feed Design" }, create: { name: "Social Feed Design", slug: "social-feed-design", categoryId: category.id } });
  const subcategory_system_design_fundamentals = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "system-design-fundamentals" } }, update: { name: "System Design Fundamentals" }, create: { name: "System Design Fundamentals", slug: "system-design-fundamentals", categoryId: category.id } });
  const subcategory_web_services = await prisma.subcategory.upsert({ where: { categoryId_slug: { categoryId: category.id, slug: "web-services" } }, update: { name: "Web Services" }, create: { name: "Web Services", slug: "web-services", categoryId: category.id } });

  let successCount = 0;
  let failedCount = 0;

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-url-shortening-service-what-are-the-requirements-data-model-short-key-generation-strategy-and-redirec" },
      update: {
        question: "Design a URL shortening service. What are the requirements, data model, short-key generation strategy, and redirect flow?",
        categoryId: category.id,
        subcategoryId: subcategory_web_services.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "I would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "I would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL. Store the mapping in a durable database, cache hot mappings, and put the redirect service behind load balancers. The short key can be generated from a unique numeric ID encoded with Base62. Before choosing storage, I would first clarify expiration, abuse protection, analytics, and availability requirements.",
        detailedAnswer: "A URL shortening service converts a long URL such as https://example.com/products/category/item?id=12345 into a compact URL such as https://short.ly/aZ91xK. The core operation is write once and read many times, so the redirect path should be extremely fast.\n\nRequirements:\n1. Create a short URL from a valid long URL.\n2. Redirect a short URL to the original URL with very low latency.\n3. Generate globally unique short keys.\n4. Support optional expiration.\n5. Support deletion or disabling of URLs.\n6. Handle duplicate long URLs according to the product requirement: either return the existing short URL or create a new one.\n7. Handle very high read traffic because redirects can be much more frequent than URL creation.\n8. Provide abuse protection, rate limiting, URL validation, and monitoring.\n9. Optionally support analytics such as click count, referrer, country, device, and timestamps.\n\nA simple data model could be:\n\nUrlMapping {\n  id: BIGINT PRIMARY KEY,\n  shortKey: VARCHAR(16) UNIQUE NOT NULL,\n  longUrl: TEXT NOT NULL,\n  createdAt: TIMESTAMP NOT NULL,\n  expiresAt: TIMESTAMP NULL,\n  status: VARCHAR(20) NOT NULL,\n  ownerId: BIGINT NULL\n}\n\nFor analytics, I would normally avoid updating clickCount synchronously on every redirect because a popular URL could create a write hotspot. Instead, redirect first and publish an event asynchronously to Kafka or another queue. Analytics consumers can aggregate those events separately.\n\nShort-key generation:\nA practical approach is to generate a unique numeric ID and encode it using Base62. Base62 uses 62 characters: a-z, A-Z, and 0-9. For example, ID 125 becomes a short Base62 string. The database can generate the unique ID using an auto-increment/sequence, or a distributed ID generator can be used at large scale.\n\nCreate flow:\n1. Client sends POST /urls with the long URL.\n2. Validate the URL and enforce security/abuse policies.\n3. Optionally check whether the same URL already has a mapping.\n4. Generate a unique ID.\n5. Encode the ID using Base62.\n6. Store the mapping in the database with a UNIQUE constraint on shortKey.\n7. Return https://short.ly/{shortKey}.\n\nRedirect flow:\n1. Client requests GET /aZ91xK.\n2. Application first checks Redis/cache using the short key.\n3. On a cache hit, return an HTTP redirect immediately.\n4. On a cache miss, query the database.\n5. Check that the mapping exists, is active, and has not expired.\n6. Put the result into Redis with an appropriate TTL.\n7. Return 301/302/307 depending on product requirements.\n8. Publish analytics asynchronously rather than blocking the redirect.\n\nFor example:\nGET /aZ91xK\n       |\n       v\nLoad Balancer\n       |\n       v\nRedirect Service\n       |\n   Redis Cache\n    /       \\\n hit        miss\n |            |\n v            v\nRedirect     Database\n              |\n              v\n          Redis + Redirect\n\nThe important design principle is that the redirect path should not require the database for every request. Redis/CDN caching protects the database and gives low latency for popular URLs.\n\nFor availability, run multiple stateless application instances behind a load balancer. Redis can be deployed with replication/cluster support, and the database should use replication and backups. Database constraints remain the final protection against duplicate short keys even if multiple application instances generate keys concurrently.\n\nInterview takeaway: I would use a distributed unique ID or database-generated ID, encode it with Base62, store the mapping in a durable database, and put Redis/CDN caching in front of the redirect path. The write path can be strongly consistent, while the read path is optimized for extremely high traffic.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Pastebin-like service. What are the API, data model, and storage choices?", "How would you handle duplicate long URLs, URL expiration, and deletion?", "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?"],
        tags: ["system-design", "web-services"],
        isPublished: true,
        seoTitle: "Design a URL shortening service. What are the requirements, data  - Interview Question",
        seoDescription: "I would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL. Store the mappin."
      },
      create: {
        question: "Design a URL shortening service. What are the requirements, data model, short-key generation strategy, and redirect flow?",
        slug: "design-a-url-shortening-service-what-are-the-requirements-data-model-short-key-generation-strategy-and-redirec",
        categoryId: category.id,
        subcategoryId: subcategory_web_services.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "I would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "I would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL. Store the mapping in a durable database, cache hot mappings, and put the redirect service behind load balancers. The short key can be generated from a unique numeric ID encoded with Base62. Before choosing storage, I would first clarify expiration, abuse protection, analytics, and availability requirements.",
        detailedAnswer: "A URL shortening service converts a long URL such as https://example.com/products/category/item?id=12345 into a compact URL such as https://short.ly/aZ91xK. The core operation is write once and read many times, so the redirect path should be extremely fast.\n\nRequirements:\n1. Create a short URL from a valid long URL.\n2. Redirect a short URL to the original URL with very low latency.\n3. Generate globally unique short keys.\n4. Support optional expiration.\n5. Support deletion or disabling of URLs.\n6. Handle duplicate long URLs according to the product requirement: either return the existing short URL or create a new one.\n7. Handle very high read traffic because redirects can be much more frequent than URL creation.\n8. Provide abuse protection, rate limiting, URL validation, and monitoring.\n9. Optionally support analytics such as click count, referrer, country, device, and timestamps.\n\nA simple data model could be:\n\nUrlMapping {\n  id: BIGINT PRIMARY KEY,\n  shortKey: VARCHAR(16) UNIQUE NOT NULL,\n  longUrl: TEXT NOT NULL,\n  createdAt: TIMESTAMP NOT NULL,\n  expiresAt: TIMESTAMP NULL,\n  status: VARCHAR(20) NOT NULL,\n  ownerId: BIGINT NULL\n}\n\nFor analytics, I would normally avoid updating clickCount synchronously on every redirect because a popular URL could create a write hotspot. Instead, redirect first and publish an event asynchronously to Kafka or another queue. Analytics consumers can aggregate those events separately.\n\nShort-key generation:\nA practical approach is to generate a unique numeric ID and encode it using Base62. Base62 uses 62 characters: a-z, A-Z, and 0-9. For example, ID 125 becomes a short Base62 string. The database can generate the unique ID using an auto-increment/sequence, or a distributed ID generator can be used at large scale.\n\nCreate flow:\n1. Client sends POST /urls with the long URL.\n2. Validate the URL and enforce security/abuse policies.\n3. Optionally check whether the same URL already has a mapping.\n4. Generate a unique ID.\n5. Encode the ID using Base62.\n6. Store the mapping in the database with a UNIQUE constraint on shortKey.\n7. Return https://short.ly/{shortKey}.\n\nRedirect flow:\n1. Client requests GET /aZ91xK.\n2. Application first checks Redis/cache using the short key.\n3. On a cache hit, return an HTTP redirect immediately.\n4. On a cache miss, query the database.\n5. Check that the mapping exists, is active, and has not expired.\n6. Put the result into Redis with an appropriate TTL.\n7. Return 301/302/307 depending on product requirements.\n8. Publish analytics asynchronously rather than blocking the redirect.\n\nFor example:\nGET /aZ91xK\n       |\n       v\nLoad Balancer\n       |\n       v\nRedirect Service\n       |\n   Redis Cache\n    /       \\\n hit        miss\n |            |\n v            v\nRedirect     Database\n              |\n              v\n          Redis + Redirect\n\nThe important design principle is that the redirect path should not require the database for every request. Redis/CDN caching protects the database and gives low latency for popular URLs.\n\nFor availability, run multiple stateless application instances behind a load balancer. Redis can be deployed with replication/cluster support, and the database should use replication and backups. Database constraints remain the final protection against duplicate short keys even if multiple application instances generate keys concurrently.\n\nInterview takeaway: I would use a distributed unique ID or database-generated ID, encode it with Base62, store the mapping in a durable database, and put Redis/CDN caching in front of the redirect path. The write path can be strongly consistent, while the read path is optimized for extremely high traffic.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Pastebin-like service. What are the API, data model, and storage choices?", "How would you handle duplicate long URLs, URL expiration, and deletion?", "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?"],
        tags: ["system-design", "web-services"],
        isPublished: true,
        seoTitle: "Design a URL shortening service. What are the requirements, data  - Interview Question",
        seoDescription: "I would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL. Store the mappin."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 1: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-generate-unique-short-urls-using-sequential-ids-base62-or-hashing-what-collision-issues-arise" },
      update: {
        question: "How would you generate unique short URLs using sequential IDs, Base62, or hashing? What collision issues arise?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.",
        detailedAnswer: "There are three common approaches: sequential IDs encoded with Base62, random keys, and hashes of the original URL. They have different trade-offs.\n\n1. Sequential ID + Base62\n\nSuppose the database generates:\n1, 2, 3, 4, ...\n\nConvert the numeric ID to Base62:\n1 -> 1\n61 -> Z\n62 -> 10\n63 -> 11\n\nThe resulting key is compact and guaranteed unique as long as the source ID is unique.\n\nThe main problem is predictability. If /1, /2, /3 exist, someone can potentially enumerate URLs. This can expose information about creation volume or private mappings. A common improvement is to use a distributed ID generator or transform/obfuscate the numeric ID before Base62 encoding.\n\nAnother issue is distributed generation. A single database sequence is simple but can become a bottleneck at very large write volumes. Alternatives include Snowflake-style IDs or range allocation.\n\n2. Random Base62 key\n\nGenerate a random string such as:\naZ91xK2\n\nIf the key space is large enough, collisions become unlikely. For example, a 7-character Base62 key has 62^7 possible combinations, which is roughly 3.5 trillion possibilities.\n\nHowever, collisions are still mathematically possible. The service should therefore enforce a UNIQUE constraint on shortKey and retry generation when an insert fails due to a collision.\n\nRandom keys also have an operational cost because the system must handle collision retries. With a sufficiently large key space, the probability remains very small at normal scale.\n\n3. Hash of the long URL\n\nWe can calculate something such as:\nSHA-256(longUrl)\n\nand use part of the hash as the short key.\n\nThe problem is that the full SHA-256 hash is too long for a normal short URL, so we usually truncate it or encode only part of it. Once truncated, collisions become possible. Even with a strong hash, using only a small prefix reduces the collision resistance.\n\nHashing also creates an important product decision: should identical long URLs always produce the same short URL? If yes, hashing can naturally support deterministic deduplication. But URL canonicalization becomes difficult. For example:\nhttps://example.com?a=1&b=2\nand\nhttps://example.com?b=2&a=1\nmay be semantically equivalent but produce different hashes unless canonicalized.\n\nI would not rely only on a hash for uniqueness. I would still maintain a database UNIQUE constraint and handle collisions safely.\n\nCollision probability can be understood using the birthday paradox: collisions become relevant much earlier than the total key-space size might suggest. Therefore, the system should never assume that a generated random or truncated hash is guaranteed unique.\n\nA production design could use:\nunique distributed ID -> Base62 encoding -> database UNIQUE(shortKey)\n\nThis gives deterministic uniqueness and compact keys. If enumeration is a concern, I would obfuscate the ID or use a sufficiently random key instead.\n\nAnother important point is that Base62 itself does not provide uniqueness. It is only an encoding. If two different IDs are generated, their Base62 representations are different, but Base62 cannot prevent two requests from being assigned the same underlying ID or random value.\n\nInterview takeaway: sequential ID + Base62 is simple and collision-free when the ID source is unique; random keys require collision detection and retry; hashes can support deterministic deduplication but truncated hashes can collide. In every design, enforce uniqueness at the database level.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a URL shortening service. What are the requirements, data model, short-key generation strategy, and redirect flow?", "How would you handle duplicate long URLs, URL expiration, and deletion?", "How would you prevent users from consuming unlimited storage in Pastebin?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you generate unique short URLs using sequential IDs, Ba - Interview Question",
        seoDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless ."
      },
      create: {
        question: "How would you generate unique short URLs using sequential IDs, Base62, or hashing? What collision issues arise?",
        slug: "how-would-you-generate-unique-short-urls-using-sequential-ids-base62-or-hashing-what-collision-issues-arise",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.",
        detailedAnswer: "There are three common approaches: sequential IDs encoded with Base62, random keys, and hashes of the original URL. They have different trade-offs.\n\n1. Sequential ID + Base62\n\nSuppose the database generates:\n1, 2, 3, 4, ...\n\nConvert the numeric ID to Base62:\n1 -> 1\n61 -> Z\n62 -> 10\n63 -> 11\n\nThe resulting key is compact and guaranteed unique as long as the source ID is unique.\n\nThe main problem is predictability. If /1, /2, /3 exist, someone can potentially enumerate URLs. This can expose information about creation volume or private mappings. A common improvement is to use a distributed ID generator or transform/obfuscate the numeric ID before Base62 encoding.\n\nAnother issue is distributed generation. A single database sequence is simple but can become a bottleneck at very large write volumes. Alternatives include Snowflake-style IDs or range allocation.\n\n2. Random Base62 key\n\nGenerate a random string such as:\naZ91xK2\n\nIf the key space is large enough, collisions become unlikely. For example, a 7-character Base62 key has 62^7 possible combinations, which is roughly 3.5 trillion possibilities.\n\nHowever, collisions are still mathematically possible. The service should therefore enforce a UNIQUE constraint on shortKey and retry generation when an insert fails due to a collision.\n\nRandom keys also have an operational cost because the system must handle collision retries. With a sufficiently large key space, the probability remains very small at normal scale.\n\n3. Hash of the long URL\n\nWe can calculate something such as:\nSHA-256(longUrl)\n\nand use part of the hash as the short key.\n\nThe problem is that the full SHA-256 hash is too long for a normal short URL, so we usually truncate it or encode only part of it. Once truncated, collisions become possible. Even with a strong hash, using only a small prefix reduces the collision resistance.\n\nHashing also creates an important product decision: should identical long URLs always produce the same short URL? If yes, hashing can naturally support deterministic deduplication. But URL canonicalization becomes difficult. For example:\nhttps://example.com?a=1&b=2\nand\nhttps://example.com?b=2&a=1\nmay be semantically equivalent but produce different hashes unless canonicalized.\n\nI would not rely only on a hash for uniqueness. I would still maintain a database UNIQUE constraint and handle collisions safely.\n\nCollision probability can be understood using the birthday paradox: collisions become relevant much earlier than the total key-space size might suggest. Therefore, the system should never assume that a generated random or truncated hash is guaranteed unique.\n\nA production design could use:\nunique distributed ID -> Base62 encoding -> database UNIQUE(shortKey)\n\nThis gives deterministic uniqueness and compact keys. If enumeration is a concern, I would obfuscate the ID or use a sufficiently random key instead.\n\nAnother important point is that Base62 itself does not provide uniqueness. It is only an encoding. If two different IDs are generated, their Base62 representations are different, but Base62 cannot prevent two requests from being assigned the same underlying ID or random value.\n\nInterview takeaway: sequential ID + Base62 is simple and collision-free when the ID source is unique; random keys require collision detection and retry; hashes can support deterministic deduplication but truncated hashes can collide. In every design, enforce uniqueness at the database level.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a URL shortening service. What are the requirements, data model, short-key generation strategy, and redirect flow?", "How would you handle duplicate long URLs, URL expiration, and deletion?", "How would you prevent users from consuming unlimited storage in Pastebin?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you generate unique short URLs using sequential IDs, Ba - Interview Question",
        seoDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 2: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "a-shortened-url-becomes-extremely-popular-how-would-you-keep-redirects-fast-and-protect-the-database" },
      update: {
        question: "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "I would treat a viral URL as a hot key.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "I would treat a viral URL as a hot key. Cache the short-key-to-long-URL mapping close to the redirect service, use CDN/edge caching where appropriate, and protect the database with cache-aside or read-through behavior. Replicas and horizontal scaling can absorb sustained load; request coalescing can reduce a thundering herd when a hot cache entry expires.",
        detailedAnswer: "A viral short URL can receive millions of requests while the underlying mapping is only one database row. The biggest mistake would be querying the database for every redirect. I would make the redirect path cache-first.\n\nRequest flow:\nClient -> CDN/Load Balancer -> Redirect Service -> Redis -> Database only on cache miss\n\nFor a popular URL, the mapping should stay in Redis so most requests never reach the database.\n\nExample Redis entry:\nurl:aZ91xK -> https://example.com/very/long/url\n\nThe redirect service can return the destination directly after a cache hit.\n\nKey techniques:\n\n1. Redis caching\nStore shortKey -> longUrl with a TTL. Popular entries can remain cached for a long time depending on expiration and deletion requirements.\n\n2. CDN/edge caching\nIf the product and HTTP redirect semantics allow it, cache redirects at the edge/CDN. This moves traffic closer to users and can reduce requests reaching the application completely.\n\n3. Cache-aside strategy\nOn a cache miss:\n- Query the database.\n- Validate expiration/status.\n- Populate Redis.\n- Return the redirect.\n\n4. Protect against cache stampede\nIf a very popular key expires simultaneously across many application instances, thousands of requests could hit the database. Use techniques such as jittered TTLs, request coalescing/single-flight, locks for cache population, or proactive refresh.\n\n5. Negative caching\nIf attackers repeatedly request a nonexistent short key, the application could repeatedly query the database. Cache known misses for a short TTL. This should be used carefully because newly created keys must become visible quickly.\n\n6. Read replicas\nIf database reads are still necessary at scale, read replicas can absorb lookup traffic. However, Redis should still be the primary protection for hot mappings.\n\n7. Avoid synchronous analytics writes\nDo not execute:\nUPDATE url_mapping SET click_count = click_count + 1\nfor every redirect.\n\nA viral URL would turn one database row into a write hotspot. Instead, publish an event such as:\n{ shortKey, timestamp, userAgent, referrer }\n\nto Kafka or a queue and aggregate analytics asynchronously.\n\n8. Rate limiting and abuse protection\nAttackers may deliberately generate huge redirect traffic or scan random keys. Apply rate limits at the edge/API gateway and use WAF/bot protection where appropriate.\n\n9. Stateless redirect servers\nRun multiple instances behind a load balancer. The application should not keep important redirect state only in local memory because requests can land on any instance.\n\n10. Database protection\nUse connection pooling, proper indexes, read replicas where appropriate, query timeouts, and circuit-breaking/fail-safe behavior. The critical database index would normally be on shortKey, ideally through a UNIQUE constraint.\n\nOne important trade-off is deletion. If a URL is deleted while its old value is still cached, users could temporarily receive the old redirect. Therefore, deletion should invalidate the corresponding Redis/CDN cache or use a short cache TTL when immediate revocation is required.\n\nInterview takeaway: for a hot URL, the database should ideally see almost none of the redirect traffic. Redis and potentially CDN caching handle the hot read path, while asynchronous analytics prevents database write amplification.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["When would you store paste content in a database versus object/blob storage?", "How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "A shortened URL becomes extremely popular. How would you keep red - Interview Question",
        seoDescription: "I would treat a viral URL as a hot key. Cache the short-key-to-long-URL mapping close to the redirect service, use CDN/edge caching where appropriate, and ."
      },
      create: {
        question: "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?",
        slug: "a-shortened-url-becomes-extremely-popular-how-would-you-keep-redirects-fast-and-protect-the-database",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "I would treat a viral URL as a hot key.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "I would treat a viral URL as a hot key. Cache the short-key-to-long-URL mapping close to the redirect service, use CDN/edge caching where appropriate, and protect the database with cache-aside or read-through behavior. Replicas and horizontal scaling can absorb sustained load; request coalescing can reduce a thundering herd when a hot cache entry expires.",
        detailedAnswer: "A viral short URL can receive millions of requests while the underlying mapping is only one database row. The biggest mistake would be querying the database for every redirect. I would make the redirect path cache-first.\n\nRequest flow:\nClient -> CDN/Load Balancer -> Redirect Service -> Redis -> Database only on cache miss\n\nFor a popular URL, the mapping should stay in Redis so most requests never reach the database.\n\nExample Redis entry:\nurl:aZ91xK -> https://example.com/very/long/url\n\nThe redirect service can return the destination directly after a cache hit.\n\nKey techniques:\n\n1. Redis caching\nStore shortKey -> longUrl with a TTL. Popular entries can remain cached for a long time depending on expiration and deletion requirements.\n\n2. CDN/edge caching\nIf the product and HTTP redirect semantics allow it, cache redirects at the edge/CDN. This moves traffic closer to users and can reduce requests reaching the application completely.\n\n3. Cache-aside strategy\nOn a cache miss:\n- Query the database.\n- Validate expiration/status.\n- Populate Redis.\n- Return the redirect.\n\n4. Protect against cache stampede\nIf a very popular key expires simultaneously across many application instances, thousands of requests could hit the database. Use techniques such as jittered TTLs, request coalescing/single-flight, locks for cache population, or proactive refresh.\n\n5. Negative caching\nIf attackers repeatedly request a nonexistent short key, the application could repeatedly query the database. Cache known misses for a short TTL. This should be used carefully because newly created keys must become visible quickly.\n\n6. Read replicas\nIf database reads are still necessary at scale, read replicas can absorb lookup traffic. However, Redis should still be the primary protection for hot mappings.\n\n7. Avoid synchronous analytics writes\nDo not execute:\nUPDATE url_mapping SET click_count = click_count + 1\nfor every redirect.\n\nA viral URL would turn one database row into a write hotspot. Instead, publish an event such as:\n{ shortKey, timestamp, userAgent, referrer }\n\nto Kafka or a queue and aggregate analytics asynchronously.\n\n8. Rate limiting and abuse protection\nAttackers may deliberately generate huge redirect traffic or scan random keys. Apply rate limits at the edge/API gateway and use WAF/bot protection where appropriate.\n\n9. Stateless redirect servers\nRun multiple instances behind a load balancer. The application should not keep important redirect state only in local memory because requests can land on any instance.\n\n10. Database protection\nUse connection pooling, proper indexes, read replicas where appropriate, query timeouts, and circuit-breaking/fail-safe behavior. The critical database index would normally be on shortKey, ideally through a UNIQUE constraint.\n\nOne important trade-off is deletion. If a URL is deleted while its old value is still cached, users could temporarily receive the old redirect. Therefore, deletion should invalidate the corresponding Redis/CDN cache or use a short cache TTL when immediate revocation is required.\n\nInterview takeaway: for a hot URL, the database should ideally see almost none of the redirect traffic. Redis and potentially CDN caching handle the hot read path, while asynchronous analytics prevents database write amplification.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["When would you store paste content in a database versus object/blob storage?", "How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "A shortened URL becomes extremely popular. How would you keep red - Interview Question",
        seoDescription: "I would treat a viral URL as a hot key. Cache the short-key-to-long-URL mapping close to the redirect service, use CDN/edge caching where appropriate, and ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 3: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-handle-duplicate-long-urls-url-expiration-and-deletion" },
      update: {
        question: "How would you handle duplicate long URLs, URL expiration, and deletion?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Decide whether duplicate long URLs should return the same short key or receive separate keys.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Decide whether duplicate long URLs should return the same short key or receive separate keys. If deduplication is required, enforce it with a normalized URL representation plus a uniqueness constraint. Expiration can be represented by an expiry timestamp, while deletion should define whether the key is permanently invalid or reusable. Avoid reusing keys casually because stale caches and old links can create ambiguity.",
        detailedAnswer: "These are separate product requirements and should be represented explicitly rather than handled only through application logic.\n\nDuplicate long URLs:\nThere are two valid product models.\n\nOption 1: Deduplicate globally.\nIf the same canonical long URL already exists, return the existing short URL.\n\nFor example:\nhttps://example.com/products/10\n-> abc123\n\nA second request for the same URL returns abc123.\n\nThis requires a unique representation of the long URL. A common approach is to store a normalized/canonical URL or a cryptographic hash of it and enforce uniqueness on that value.\n\nHowever, URL normalization must be carefully designed. Automatically changing URLs can alter semantics, especially query parameters, encoding, fragments, or signed URLs. Therefore, I would define exactly what canonicalization is allowed to do.\n\nOption 2: Allow multiple short URLs.\nDifferent users or campaigns may intentionally want different short URLs for the same destination so that analytics can distinguish them.\n\nIn that case, do not make longUrl globally unique. Each create request gets its own short key.\n\nExpiration:\nStore an expiresAt timestamp:\nexpiresAt TIMESTAMP NULL\n\nOn redirect:\n1. Load mapping.\n2. If status != ACTIVE, reject.\n3. If expiresAt is non-null and expiresAt <= current time, treat it as expired.\n4. Return an appropriate response, such as 404 or 410 depending on product semantics.\n\nI would enforce expiration during the redirect itself rather than relying only on a background job. A scheduled cleanup job can remove old records later, but it should not be the only mechanism because the job may run late.\n\nRedis TTL can also be aligned with expiresAt. For example, if a URL expires in 20 minutes, its cache entry should not remain valid beyond that point.\n\nDeletion:\nInstead of immediately physically deleting the row, I would often use a soft-delete/status model:\nstatus = ACTIVE | DELETED | EXPIRED\n\nThis preserves auditability and prevents accidental data loss. A separate cleanup process can physically delete old records later if required by retention policy.\n\nWhen deleting:\n1. Mark the mapping as deleted in the database.\n2. Invalidate the Redis cache.\n3. Purge/invalidate CDN cache if used.\n4. Prevent future redirects.\n5. Optionally record who deleted it and when.\n\nThere is a consistency issue here. Suppose Redis contains:\naZ91xK -> old URL\n\nand the database row is deleted. If Redis is not invalidated, users may continue being redirected. Therefore, cache invalidation is part of the deletion operation.\n\nFor high-value URLs requiring immediate revocation, I would consider a cache design where deletion/version information can be checked or where cache TTLs are kept within an acceptable revocation window.\n\nConcurrency is also important. If creation and deletion happen simultaneously, database transactions and clear state transitions should determine the final state. Unique constraints should protect against duplicate short keys.\n\nInterview takeaway: duplicate handling is a product decision, expiration should be checked at read time, deletion should invalidate caches, and soft deletion is often preferable when auditability matters.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you implement paste expiration and automatic cleanup?", "How would you generate unique short URLs using sequential IDs, Base62, or hashing? What collision issues arise?", "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you handle duplicate long URLs, URL expiration, and del - Interview Question",
        seoDescription: "Decide whether duplicate long URLs should return the same short key or receive separate keys. If deduplication is required, enforce it with a normalized UR."
      },
      create: {
        question: "How would you handle duplicate long URLs, URL expiration, and deletion?",
        slug: "how-would-you-handle-duplicate-long-urls-url-expiration-and-deletion",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Decide whether duplicate long URLs should return the same short key or receive separate keys.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Decide whether duplicate long URLs should return the same short key or receive separate keys. If deduplication is required, enforce it with a normalized URL representation plus a uniqueness constraint. Expiration can be represented by an expiry timestamp, while deletion should define whether the key is permanently invalid or reusable. Avoid reusing keys casually because stale caches and old links can create ambiguity.",
        detailedAnswer: "These are separate product requirements and should be represented explicitly rather than handled only through application logic.\n\nDuplicate long URLs:\nThere are two valid product models.\n\nOption 1: Deduplicate globally.\nIf the same canonical long URL already exists, return the existing short URL.\n\nFor example:\nhttps://example.com/products/10\n-> abc123\n\nA second request for the same URL returns abc123.\n\nThis requires a unique representation of the long URL. A common approach is to store a normalized/canonical URL or a cryptographic hash of it and enforce uniqueness on that value.\n\nHowever, URL normalization must be carefully designed. Automatically changing URLs can alter semantics, especially query parameters, encoding, fragments, or signed URLs. Therefore, I would define exactly what canonicalization is allowed to do.\n\nOption 2: Allow multiple short URLs.\nDifferent users or campaigns may intentionally want different short URLs for the same destination so that analytics can distinguish them.\n\nIn that case, do not make longUrl globally unique. Each create request gets its own short key.\n\nExpiration:\nStore an expiresAt timestamp:\nexpiresAt TIMESTAMP NULL\n\nOn redirect:\n1. Load mapping.\n2. If status != ACTIVE, reject.\n3. If expiresAt is non-null and expiresAt <= current time, treat it as expired.\n4. Return an appropriate response, such as 404 or 410 depending on product semantics.\n\nI would enforce expiration during the redirect itself rather than relying only on a background job. A scheduled cleanup job can remove old records later, but it should not be the only mechanism because the job may run late.\n\nRedis TTL can also be aligned with expiresAt. For example, if a URL expires in 20 minutes, its cache entry should not remain valid beyond that point.\n\nDeletion:\nInstead of immediately physically deleting the row, I would often use a soft-delete/status model:\nstatus = ACTIVE | DELETED | EXPIRED\n\nThis preserves auditability and prevents accidental data loss. A separate cleanup process can physically delete old records later if required by retention policy.\n\nWhen deleting:\n1. Mark the mapping as deleted in the database.\n2. Invalidate the Redis cache.\n3. Purge/invalidate CDN cache if used.\n4. Prevent future redirects.\n5. Optionally record who deleted it and when.\n\nThere is a consistency issue here. Suppose Redis contains:\naZ91xK -> old URL\n\nand the database row is deleted. If Redis is not invalidated, users may continue being redirected. Therefore, cache invalidation is part of the deletion operation.\n\nFor high-value URLs requiring immediate revocation, I would consider a cache design where deletion/version information can be checked or where cache TTLs are kept within an acceptable revocation window.\n\nConcurrency is also important. If creation and deletion happen simultaneously, database transactions and clear state transitions should determine the final state. Unique constraints should protect against duplicate short keys.\n\nInterview takeaway: duplicate handling is a product decision, expiration should be checked at read time, deletion should invalidate caches, and soft deletion is often preferable when auditability matters.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you implement paste expiration and automatic cleanup?", "How would you generate unique short URLs using sequential IDs, Base62, or hashing? What collision issues arise?", "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you handle duplicate long URLs, URL expiration, and del - Interview Question",
        seoDescription: "Decide whether duplicate long URLs should return the same short key or receive separate keys. If deduplication is required, enforce it with a normalized UR."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 4: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-rate-limiter-for-an-http-api-what-happens-when-a-client-exceeds-its-limit" },
      update: {
        question: "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and failure modes, then discuss scaling, consistency, availability, security, observability, and trade-offs.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "A strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and failure modes, then discuss scaling, consistency, availability, security, observability, and trade-offs.",
        detailedAnswer: "A rate limiter controls how many requests a client can make within a defined period. It protects services from abuse, accidental traffic spikes, and resource exhaustion.\n\nFor example:\nPOST /payments\nLimit: 10 requests per minute per user\n\nIf the user sends the 11th request within the applicable window, the service should reject it with HTTP 429 Too Many Requests.\n\nRequirements:\n1. Define the identity being limited: user ID, API key, IP address, tenant, or endpoint.\n2. Define the limit, such as 100 requests/minute.\n3. Work across multiple application instances.\n4. Add very little latency.\n5. Avoid race conditions under concurrent requests.\n6. Support different limits for different APIs/users/tiers.\n7. Provide useful retry information.\n\nI would generally implement a distributed rate limiter using Redis when the application runs on multiple instances.\n\nCommon algorithms:\n\n1. Fixed window\nFor example, 100 requests from 10:00:00 to 10:00:59.\n\nA Redis key could be:\nrate:user123:2026-09-15T10:00\n\nIncrement the counter atomically and set an expiration.\n\nIt is simple and efficient but has a boundary problem. A client could send 100 requests at 10:00:59 and another 100 at 10:01:00, effectively making 200 requests within roughly two seconds.\n\n2. Sliding window\nTrack requests over a moving time interval. This gives more accurate control but requires more state and processing. Redis sorted sets can be used to store timestamps, although memory usage must be considered.\n\n3. Token bucket\nA bucket has a maximum capacity and tokens are replenished at a fixed rate. Each request consumes a token.\n\nFor example:\ncapacity = 100 tokens\nrefill = 10 tokens/second\n\nThis allows controlled bursts up to 100 while maintaining an average rate of 10 requests/second.\n\n4. Leaky bucket\nRequests are processed at a controlled rate, effectively smoothing bursts. It is useful when downstream processing needs a predictable rate.\n\nFor a typical HTTP API, token bucket is a strong general-purpose choice because it supports bursts while enforcing an average rate.\n\nDistributed flow:\nClient\n  |\n  v\nAPI Gateway / Load Balancer\n  |\n  v\nRate Limiter\n  |\n Redis atomic operation\n  |\n  +---- allowed ----> Application\n  |\n  +---- rejected ---> HTTP 429\n\nThe Redis operation must be atomic. Multiple application instances cannot independently read and update a counter because concurrent requests could bypass the limit. Lua scripts, Redis atomic commands, or a dedicated gateway rate limiter can provide the required atomicity.\n\nWhen the client exceeds the limit:\nReturn:\nHTTP 429 Too Many Requests\n\nOptionally include:\nRetry-After: 10\n\nThe exact Retry-After value should represent when the client can reasonably retry. The response body can contain a machine-readable error such as:\n{\n  \"error\": \"rate_limit_exceeded\",\n  \"message\": \"Too many requests\"\n}\n\nFor APIs where retries are appropriate, clients should use exponential backoff with jitter rather than immediately retrying in a tight loop.\n\nI would also distinguish between different kinds of limits. For example:\n- Per-IP limit to protect against unauthenticated abuse.\n- Per-user/API-key limit for authenticated clients.\n- Per-tenant quota for multi-tenant systems.\n- Endpoint-specific limits for expensive operations.\n- Global service protection limits.\n\nFor expensive APIs, a simple request-count limit may not be enough. A search request costing 10x the resources of a health-check request may need weighted tokens.\n\nFail-open vs fail-closed is an important production decision. If Redis is unavailable, failing closed protects the service but can block legitimate traffic. Failing open preserves availability but removes the protection. For security-sensitive or expensive APIs, I would usually prefer fail-closed or a local fallback with conservative limits. For less critical APIs, a bounded local fallback may be preferable.\n\nThe rate limiter itself should be monitored: allowed requests, rejected requests, Redis latency/errors, hot keys, limit configuration, and per-tenant usage.\n\nInterview takeaway: use a distributed token-bucket or sliding-window limiter for horizontally scaled APIs, make the state update atomic, return HTTP 429 when the limit is exceeded, provide Retry-After where useful, and place coarse-grained protection at the API gateway/edge before traffic reaches the application.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you implement a distributed rate limiter across multiple application servers?", "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?", "Compare token bucket and leaky bucket. When would you choose each?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "Design a rate limiter for an HTTP API. What happens when a client - Interview Question",
        seoDescription: "A strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and."
      },
      create: {
        question: "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?",
        slug: "design-a-rate-limiter-for-an-http-api-what-happens-when-a-client-exceeds-its-limit",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and failure modes, then discuss scaling, consistency, availability, security, observability, and trade-offs.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "A strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and failure modes, then discuss scaling, consistency, availability, security, observability, and trade-offs.",
        detailedAnswer: "A rate limiter controls how many requests a client can make within a defined period. It protects services from abuse, accidental traffic spikes, and resource exhaustion.\n\nFor example:\nPOST /payments\nLimit: 10 requests per minute per user\n\nIf the user sends the 11th request within the applicable window, the service should reject it with HTTP 429 Too Many Requests.\n\nRequirements:\n1. Define the identity being limited: user ID, API key, IP address, tenant, or endpoint.\n2. Define the limit, such as 100 requests/minute.\n3. Work across multiple application instances.\n4. Add very little latency.\n5. Avoid race conditions under concurrent requests.\n6. Support different limits for different APIs/users/tiers.\n7. Provide useful retry information.\n\nI would generally implement a distributed rate limiter using Redis when the application runs on multiple instances.\n\nCommon algorithms:\n\n1. Fixed window\nFor example, 100 requests from 10:00:00 to 10:00:59.\n\nA Redis key could be:\nrate:user123:2026-09-15T10:00\n\nIncrement the counter atomically and set an expiration.\n\nIt is simple and efficient but has a boundary problem. A client could send 100 requests at 10:00:59 and another 100 at 10:01:00, effectively making 200 requests within roughly two seconds.\n\n2. Sliding window\nTrack requests over a moving time interval. This gives more accurate control but requires more state and processing. Redis sorted sets can be used to store timestamps, although memory usage must be considered.\n\n3. Token bucket\nA bucket has a maximum capacity and tokens are replenished at a fixed rate. Each request consumes a token.\n\nFor example:\ncapacity = 100 tokens\nrefill = 10 tokens/second\n\nThis allows controlled bursts up to 100 while maintaining an average rate of 10 requests/second.\n\n4. Leaky bucket\nRequests are processed at a controlled rate, effectively smoothing bursts. It is useful when downstream processing needs a predictable rate.\n\nFor a typical HTTP API, token bucket is a strong general-purpose choice because it supports bursts while enforcing an average rate.\n\nDistributed flow:\nClient\n  |\n  v\nAPI Gateway / Load Balancer\n  |\n  v\nRate Limiter\n  |\n Redis atomic operation\n  |\n  +---- allowed ----> Application\n  |\n  +---- rejected ---> HTTP 429\n\nThe Redis operation must be atomic. Multiple application instances cannot independently read and update a counter because concurrent requests could bypass the limit. Lua scripts, Redis atomic commands, or a dedicated gateway rate limiter can provide the required atomicity.\n\nWhen the client exceeds the limit:\nReturn:\nHTTP 429 Too Many Requests\n\nOptionally include:\nRetry-After: 10\n\nThe exact Retry-After value should represent when the client can reasonably retry. The response body can contain a machine-readable error such as:\n{\n  \"error\": \"rate_limit_exceeded\",\n  \"message\": \"Too many requests\"\n}\n\nFor APIs where retries are appropriate, clients should use exponential backoff with jitter rather than immediately retrying in a tight loop.\n\nI would also distinguish between different kinds of limits. For example:\n- Per-IP limit to protect against unauthenticated abuse.\n- Per-user/API-key limit for authenticated clients.\n- Per-tenant quota for multi-tenant systems.\n- Endpoint-specific limits for expensive operations.\n- Global service protection limits.\n\nFor expensive APIs, a simple request-count limit may not be enough. A search request costing 10x the resources of a health-check request may need weighted tokens.\n\nFail-open vs fail-closed is an important production decision. If Redis is unavailable, failing closed protects the service but can block legitimate traffic. Failing open preserves availability but removes the protection. For security-sensitive or expensive APIs, I would usually prefer fail-closed or a local fallback with conservative limits. For less critical APIs, a bounded local fallback may be preferable.\n\nThe rate limiter itself should be monitored: allowed requests, rejected requests, Redis latency/errors, hot keys, limit configuration, and per-tenant usage.\n\nInterview takeaway: use a distributed token-bucket or sliding-window limiter for horizontally scaled APIs, make the state update atomic, return HTTP 429 when the limit is exceeded, provide Retry-After where useful, and place coarse-grained protection at the API gateway/edge before traffic reaches the application.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you implement a distributed rate limiter across multiple application servers?", "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?", "Compare token bucket and leaky bucket. When would you choose each?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "Design a rate limiter for an HTTP API. What happens when a client - Interview Question",
        seoDescription: "A strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 5: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-does-a-token-bucket-algorithm-work-and-how-does-it-handle-bursts" },
      update: {
        question: "How does a token-bucket algorithm work, and how does it handle bursts?",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A token bucket has a maximum capacity and a refill rate.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A token bucket has a maximum capacity and a refill rate. Each request consumes one or more tokens; if enough tokens exist, the request is allowed, otherwise it is rejected or delayed. Because tokens accumulate up to the bucket capacity, short bursts can be accepted while the long-term average remains bounded.",
        detailedAnswer: "The token-bucket algorithm limits the average request rate while allowing controlled bursts.\n\nThe bucket has two main parameters:\n1. Capacity: maximum number of tokens the bucket can hold.\n2. Refill rate: number of tokens added per second.\n\nEach request consumes one or more tokens. If enough tokens are available, the request is allowed. If there are not enough tokens, the request is rejected or delayed, depending on the implementation.\n\nFor example:\ncapacity = 100 tokens\nrefill rate = 10 tokens/second\n\nIf a client is idle for several seconds, tokens accumulate until the bucket reaches 100. The client can then immediately send up to 100 requests because 100 tokens are available. After that, tokens are replenished at 10 per second.\n\nThis is how the algorithm handles bursts: unused capacity is effectively saved as tokens, allowing short bursts above the average rate without allowing unlimited traffic.\n\nA conceptual implementation is:\n\nonRequest():\n  now = currentTime()\n  elapsed = now - lastRefillTime\n\n  tokens = min(\n      capacity,\n      tokens + elapsed * refillRate\n  )\n\n  lastRefillTime = now\n\n  if tokens >= requestCost:\n      tokens -= requestCost\n      allow request\n  else:\n      reject request\n\nIn a distributed system, the calculation and update must be atomic. Otherwise, two application servers could both observe the same number of tokens and allow requests that should have been rejected.\n\nFor example, Redis can store:\nrate:user123 -> {\n  tokens: 37,\n  lastRefill: timestamp\n}\n\nA Redis Lua script can calculate the refill, determine whether the request is allowed, subtract tokens, and update the state atomically.\n\nToken bucket is particularly useful for APIs because it separates burst capacity from sustained throughput. For example, a client might be allowed to make 20 requests immediately but only sustain 5 requests per second afterward.\n\nThe bucket can also support weighted requests. A cheap API request might cost one token while an expensive report-generation request could cost 10 tokens.\n\nImportant edge cases include clock differences across servers, integer versus fractional token calculations, TTL/cleanup of inactive clients, and extremely high-cardinality client keys. In distributed implementations, it is preferable for the rate-limiting state calculation to happen against one authoritative store rather than relying on each server's local clock/state independently.\n\nInterview takeaway: token bucket allows controlled bursts up to the bucket capacity while enforcing a long-term average rate through token replenishment.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Compare token bucket and leaky bucket. When would you choose each?", "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?", "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "How does a token-bucket algorithm work, and how does it handle bu - Interview Question",
        seoDescription: "A token bucket has a maximum capacity and a refill rate. Each request consumes one or more tokens; if enough tokens exist, the request is allowed, otherwis."
      },
      create: {
        question: "How does a token-bucket algorithm work, and how does it handle bursts?",
        slug: "how-does-a-token-bucket-algorithm-work-and-how-does-it-handle-bursts",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A token bucket has a maximum capacity and a refill rate.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A token bucket has a maximum capacity and a refill rate. Each request consumes one or more tokens; if enough tokens exist, the request is allowed, otherwise it is rejected or delayed. Because tokens accumulate up to the bucket capacity, short bursts can be accepted while the long-term average remains bounded.",
        detailedAnswer: "The token-bucket algorithm limits the average request rate while allowing controlled bursts.\n\nThe bucket has two main parameters:\n1. Capacity: maximum number of tokens the bucket can hold.\n2. Refill rate: number of tokens added per second.\n\nEach request consumes one or more tokens. If enough tokens are available, the request is allowed. If there are not enough tokens, the request is rejected or delayed, depending on the implementation.\n\nFor example:\ncapacity = 100 tokens\nrefill rate = 10 tokens/second\n\nIf a client is idle for several seconds, tokens accumulate until the bucket reaches 100. The client can then immediately send up to 100 requests because 100 tokens are available. After that, tokens are replenished at 10 per second.\n\nThis is how the algorithm handles bursts: unused capacity is effectively saved as tokens, allowing short bursts above the average rate without allowing unlimited traffic.\n\nA conceptual implementation is:\n\nonRequest():\n  now = currentTime()\n  elapsed = now - lastRefillTime\n\n  tokens = min(\n      capacity,\n      tokens + elapsed * refillRate\n  )\n\n  lastRefillTime = now\n\n  if tokens >= requestCost:\n      tokens -= requestCost\n      allow request\n  else:\n      reject request\n\nIn a distributed system, the calculation and update must be atomic. Otherwise, two application servers could both observe the same number of tokens and allow requests that should have been rejected.\n\nFor example, Redis can store:\nrate:user123 -> {\n  tokens: 37,\n  lastRefill: timestamp\n}\n\nA Redis Lua script can calculate the refill, determine whether the request is allowed, subtract tokens, and update the state atomically.\n\nToken bucket is particularly useful for APIs because it separates burst capacity from sustained throughput. For example, a client might be allowed to make 20 requests immediately but only sustain 5 requests per second afterward.\n\nThe bucket can also support weighted requests. A cheap API request might cost one token while an expensive report-generation request could cost 10 tokens.\n\nImportant edge cases include clock differences across servers, integer versus fractional token calculations, TTL/cleanup of inactive clients, and extremely high-cardinality client keys. In distributed implementations, it is preferable for the rate-limiting state calculation to happen against one authoritative store rather than relying on each server's local clock/state independently.\n\nInterview takeaway: token bucket allows controlled bursts up to the bucket capacity while enforcing a long-term average rate through token replenishment.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Compare token bucket and leaky bucket. When would you choose each?", "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?", "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "How does a token-bucket algorithm work, and how does it handle bu - Interview Question",
        seoDescription: "A token bucket has a maximum capacity and a refill rate. Each request consumes one or more tokens; if enough tokens exist, the request is allowed, otherwis."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 6: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "compare-token-bucket-and-leaky-bucket-when-would-you-choose-each" },
      update: {
        question: "Compare token bucket and leaky bucket. When would you choose each?",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Token bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traffic.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "Token bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traffic. Choose token bucket when burst tolerance matters and leaky-bucket-style shaping when a steadier output rate is more important.",
        detailedAnswer: "Both algorithms control traffic, but they optimize for different behavior.\n\nToken bucket models permission to send requests. Tokens accumulate up to a maximum capacity, and each request consumes tokens. This means short bursts are allowed when tokens have accumulated.\n\nLeaky bucket models a queue or controlled output rate. Incoming requests are placed into a bucket/queue and are processed at a relatively constant rate. If the bucket becomes full, additional requests are rejected or dropped.\n\nExample:\nSuppose the configured rate is 10 requests/second.\n\nToken bucket:\n- Capacity = 100.\n- Refill = 10 tokens/second.\n- An idle client can accumulate tokens.\n- It can potentially send a burst of 100 requests immediately.\n- Sustained traffic is limited to approximately 10 requests/second after the burst is consumed.\n\nLeaky bucket:\n- Incoming traffic may arrive in bursts.\n- Requests enter a queue.\n- The service drains the queue at approximately 10 requests/second.\n- The output is therefore smoothed.\n- If the queue is full, new requests are rejected or dropped.\n\nA simplified comparison:\n\nToken Bucket:\n- Primary goal: rate limiting with controlled bursts.\n- Burst support: strong.\n- Output smoothing: not necessarily.\n- Good for: public HTTP APIs, user requests, API gateways.\n\nLeaky Bucket:\n- Primary goal: smooth traffic/output.\n- Burst support: absorbed into a queue rather than immediately released.\n- Output smoothing: strong.\n- Good for: protecting downstream systems that require a predictable processing rate.\n\nI would choose token bucket when I want to say, \"This client may occasionally send a burst, but its long-term rate must stay within this limit.\" For example, an API might allow 100 requests immediately and refill at 10 requests/second.\n\nI would choose leaky bucket when the downstream service cannot tolerate bursts and I want traffic to leave at a controlled rate. For example, an integration with a fragile external API might need requests serialized or smoothed to a predictable rate.\n\nThere is an important implementation distinction for HTTP APIs. A leaky-bucket design that actually queues requests can increase latency significantly. For a synchronous API, I would usually prefer rejecting excess requests with HTTP 429 rather than allowing an unbounded queue to build.\n\nIn practice, token bucket is often the more flexible default for API rate limiting because it provides both sustained-rate control and bounded bursts. Leaky bucket becomes attractive when smoothing is itself the primary requirement.\n\nInterview takeaway: token bucket controls how much traffic a client is permitted to send and naturally supports bursts; leaky bucket focuses on smoothing traffic to a controlled output rate.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["How does a token-bucket algorithm work, and how does it handle bursts?", "How would you implement a distributed rate limiter across multiple application servers?", "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "Compare token bucket and leaky bucket. When would you choose each - Interview Question",
        seoDescription: "Token bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traff."
      },
      create: {
        question: "Compare token bucket and leaky bucket. When would you choose each?",
        slug: "compare-token-bucket-and-leaky-bucket-when-would-you-choose-each",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Token bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traffic.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "Token bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traffic. Choose token bucket when burst tolerance matters and leaky-bucket-style shaping when a steadier output rate is more important.",
        detailedAnswer: "Both algorithms control traffic, but they optimize for different behavior.\n\nToken bucket models permission to send requests. Tokens accumulate up to a maximum capacity, and each request consumes tokens. This means short bursts are allowed when tokens have accumulated.\n\nLeaky bucket models a queue or controlled output rate. Incoming requests are placed into a bucket/queue and are processed at a relatively constant rate. If the bucket becomes full, additional requests are rejected or dropped.\n\nExample:\nSuppose the configured rate is 10 requests/second.\n\nToken bucket:\n- Capacity = 100.\n- Refill = 10 tokens/second.\n- An idle client can accumulate tokens.\n- It can potentially send a burst of 100 requests immediately.\n- Sustained traffic is limited to approximately 10 requests/second after the burst is consumed.\n\nLeaky bucket:\n- Incoming traffic may arrive in bursts.\n- Requests enter a queue.\n- The service drains the queue at approximately 10 requests/second.\n- The output is therefore smoothed.\n- If the queue is full, new requests are rejected or dropped.\n\nA simplified comparison:\n\nToken Bucket:\n- Primary goal: rate limiting with controlled bursts.\n- Burst support: strong.\n- Output smoothing: not necessarily.\n- Good for: public HTTP APIs, user requests, API gateways.\n\nLeaky Bucket:\n- Primary goal: smooth traffic/output.\n- Burst support: absorbed into a queue rather than immediately released.\n- Output smoothing: strong.\n- Good for: protecting downstream systems that require a predictable processing rate.\n\nI would choose token bucket when I want to say, \"This client may occasionally send a burst, but its long-term rate must stay within this limit.\" For example, an API might allow 100 requests immediately and refill at 10 requests/second.\n\nI would choose leaky bucket when the downstream service cannot tolerate bursts and I want traffic to leave at a controlled rate. For example, an integration with a fragile external API might need requests serialized or smoothed to a predictable rate.\n\nThere is an important implementation distinction for HTTP APIs. A leaky-bucket design that actually queues requests can increase latency significantly. For a synchronous API, I would usually prefer rejecting excess requests with HTTP 429 rather than allowing an unbounded queue to build.\n\nIn practice, token bucket is often the more flexible default for API rate limiting because it provides both sustained-rate control and bounded bursts. Leaky bucket becomes attractive when smoothing is itself the primary requirement.\n\nInterview takeaway: token bucket controls how much traffic a client is permitted to send and naturally supports bursts; leaky bucket focuses on smoothing traffic to a controlled output rate.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["How does a token-bucket algorithm work, and how does it handle bursts?", "How would you implement a distributed rate limiter across multiple application servers?", "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "Compare token bucket and leaky bucket. When would you choose each - Interview Question",
        seoDescription: "Token bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traff."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 7: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-implement-a-distributed-rate-limiter-across-multiple-application-servers" },
      update: {
        question: "How would you implement a distributed rate limiter across multiple application servers?",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Use a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota. Redis is common because atomic commands/Lua scripts can update counters or token-bucket state. Define the consistency expectation and behavior when the shared limiter is unavailable: fail closed for sensitive APIs or fail open for lower-risk traffic.",
        detailedAnswer: "The main challenge is that multiple application servers must share the same rate-limit state. A local in-memory counter on each server is incorrect because a client could bypass the limit simply by having requests routed to different instances.\n\nFor example, with a limit of 100 requests/minute and five application servers, if every server independently allows 100 requests, the client could effectively make 500 requests.\n\nI would introduce a shared rate-limiting layer, commonly Redis or an API gateway.\n\nArchitecture:\n\nClient\n  |\n  v\nLoad Balancer / API Gateway\n  |\n  v\nRate Limiter\n  |\n  v\nRedis Cluster\n  |\n  v\nApplication Servers\n\nThe identity might be:\nrate:{userId}:{endpoint}\n\nor:\nrate:{apiKey}:{endpoint}\n\nDepending on the product requirements, the limiter can operate at multiple levels:\n- Per IP.\n- Per user.\n- Per API key.\n- Per tenant.\n- Per endpoint.\n- Global service limit.\n\nFor a token bucket, the Redis state could conceptually contain:\n{\n  tokens: 47,\n  lastRefillTimestamp: 1726400000\n}\n\nThe request executes an atomic operation:\n1. Read current tokens and last refill time.\n2. Calculate elapsed time.\n3. Refill tokens up to bucket capacity.\n4. Check whether enough tokens exist.\n5. If yes, subtract request cost.\n6. Store the new state and expiration.\n7. Return allowed/rejected and optionally retry information.\n\nSteps 1-6 must be atomic. A Redis Lua script is a common solution because the entire calculation can execute atomically on the Redis server.\n\nFor a simpler fixed-window limiter, Redis INCR plus an expiration can sometimes be sufficient. However, fixed windows have boundary effects, so token bucket or sliding-window approaches are often preferable when traffic control needs to be more accurate.\n\nExample request:\nPOST /orders\nAuthorization: Bearer ...\n\nThe gateway identifies user123 and calls the rate limiter.\n\nIf allowed:\n-> forward request to application.\n\nIf rejected:\n-> return HTTP 429 Too Many Requests.\n\nA Retry-After header can tell the client when it should retry if that information can be calculated reliably.\n\nI would also avoid placing an expensive rate-limit operation after the request has already reached the business service. Gateway-level limits can reject abusive traffic earlier and reduce application/database load.\n\nFor very large systems, the design may use multiple levels:\nEdge/CDN/WAF -> global protection -> gateway per-client limit -> application-specific limit.\n\nOperational considerations:\n- Redis latency must be monitored.\n- Rate-limit keys should expire so inactive clients do not consume memory forever.\n- Hot keys can occur for extremely popular users/API keys.\n- Redis Cluster can distribute keys, although multi-key algorithms need careful hash-slot design.\n- Limits should be configurable without requiring application redeployment.\n- Metrics should include allowed requests, rejected requests, limiter latency, Redis errors, and usage by tenant/API.\n\nThe key requirement is correctness under concurrency. If two servers simultaneously check the same user's remaining quota, they must not both make decisions using stale state.\n\nInterview takeaway: use a shared atomic store such as Redis or enforce limits at a distributed API gateway, identify clients consistently, make the state transition atomic, and reject excess requests before they consume expensive application resources.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?", "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?", "Design logging, metrics, tracing, and monitoring for a large distributed system."],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "How would you implement a distributed rate limiter across multipl - Interview Question",
        seoDescription: "Use a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota. Redis is com."
      },
      create: {
        question: "How would you implement a distributed rate limiter across multiple application servers?",
        slug: "how-would-you-implement-a-distributed-rate-limiter-across-multiple-application-servers",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Use a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota. Redis is common because atomic commands/Lua scripts can update counters or token-bucket state. Define the consistency expectation and behavior when the shared limiter is unavailable: fail closed for sensitive APIs or fail open for lower-risk traffic.",
        detailedAnswer: "The main challenge is that multiple application servers must share the same rate-limit state. A local in-memory counter on each server is incorrect because a client could bypass the limit simply by having requests routed to different instances.\n\nFor example, with a limit of 100 requests/minute and five application servers, if every server independently allows 100 requests, the client could effectively make 500 requests.\n\nI would introduce a shared rate-limiting layer, commonly Redis or an API gateway.\n\nArchitecture:\n\nClient\n  |\n  v\nLoad Balancer / API Gateway\n  |\n  v\nRate Limiter\n  |\n  v\nRedis Cluster\n  |\n  v\nApplication Servers\n\nThe identity might be:\nrate:{userId}:{endpoint}\n\nor:\nrate:{apiKey}:{endpoint}\n\nDepending on the product requirements, the limiter can operate at multiple levels:\n- Per IP.\n- Per user.\n- Per API key.\n- Per tenant.\n- Per endpoint.\n- Global service limit.\n\nFor a token bucket, the Redis state could conceptually contain:\n{\n  tokens: 47,\n  lastRefillTimestamp: 1726400000\n}\n\nThe request executes an atomic operation:\n1. Read current tokens and last refill time.\n2. Calculate elapsed time.\n3. Refill tokens up to bucket capacity.\n4. Check whether enough tokens exist.\n5. If yes, subtract request cost.\n6. Store the new state and expiration.\n7. Return allowed/rejected and optionally retry information.\n\nSteps 1-6 must be atomic. A Redis Lua script is a common solution because the entire calculation can execute atomically on the Redis server.\n\nFor a simpler fixed-window limiter, Redis INCR plus an expiration can sometimes be sufficient. However, fixed windows have boundary effects, so token bucket or sliding-window approaches are often preferable when traffic control needs to be more accurate.\n\nExample request:\nPOST /orders\nAuthorization: Bearer ...\n\nThe gateway identifies user123 and calls the rate limiter.\n\nIf allowed:\n-> forward request to application.\n\nIf rejected:\n-> return HTTP 429 Too Many Requests.\n\nA Retry-After header can tell the client when it should retry if that information can be calculated reliably.\n\nI would also avoid placing an expensive rate-limit operation after the request has already reached the business service. Gateway-level limits can reject abusive traffic earlier and reduce application/database load.\n\nFor very large systems, the design may use multiple levels:\nEdge/CDN/WAF -> global protection -> gateway per-client limit -> application-specific limit.\n\nOperational considerations:\n- Redis latency must be monitored.\n- Rate-limit keys should expire so inactive clients do not consume memory forever.\n- Hot keys can occur for extremely popular users/API keys.\n- Redis Cluster can distribute keys, although multi-key algorithms need careful hash-slot design.\n- Limits should be configurable without requiring application redeployment.\n- Metrics should include allowed requests, rejected requests, limiter latency, Redis errors, and usage by tenant/API.\n\nThe key requirement is correctness under concurrency. If two servers simultaneously check the same user's remaining quota, they must not both make decisions using stale state.\n\nInterview takeaway: use a shared atomic store such as Redis or enforce limits at a distributed API gateway, identify clients consistently, make the state transition atomic, and reject excess requests before they consume expensive application resources.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?", "Design a rate limiter for an HTTP API. What happens when a client exceeds its limit?", "Design logging, metrics, tracing, and monitoring for a large distributed system."],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "How would you implement a distributed rate limiter across multipl - Interview Question",
        seoDescription: "Use a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota. Redis is com."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 8: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-might-redis-be-used-for-distributed-rate-limiting-and-what-happens-if-redis-is-unavailable" },
      update: {
        question: "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Redis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Redis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows. If Redis fails, the design needs an explicit policy: reject requests, temporarily use local limits, or allow traffic with reduced protection. The correct choice depends on the risk of abuse versus the risk of denying legitimate traffic.",
        detailedAnswer: "Redis is a common choice for distributed rate limiting because rate-limit state is typically small, frequently accessed, short-lived, and needs fast atomic updates.\n\nReasons to use Redis:\n1. Low latency: Redis operates in memory and can handle high request rates.\n2. Shared state: multiple application servers can use the same counters/buckets.\n3. Atomic operations: INCR, SET, Lua scripts, and other operations help prevent race conditions.\n4. Expiration: keys can automatically expire after an inactivity period.\n5. Data structures: strings, hashes, sorted sets, and scripts support fixed-window, sliding-window, and token-bucket implementations.\n6. Horizontal scalability: Redis Cluster can distribute keys across nodes.\n\nFor example, a token bucket might maintain:\nrate:user123 -> tokens + lastRefillTimestamp\n\nA Lua script can atomically calculate the new token count and determine whether the request is allowed.\n\nThe difficult production question is: what happens when Redis is unavailable?\n\nThere are two primary choices.\n\nFail-open:\nIf Redis cannot be contacted, allow the request.\n\nAdvantages:\n- Application remains available.\n- A Redis outage does not automatically become an application outage.\n\nDisadvantages:\n- Rate limiting is temporarily bypassed.\n- An attacker can potentially overload the service during the outage.\n\nFail-closed:\nIf Redis cannot be contacted, reject the request.\n\nAdvantages:\n- Protection remains strict.\n- Useful for expensive or security-sensitive operations.\n\nDisadvantages:\n- Redis outage can cause legitimate traffic to fail.\n- A dependency outage becomes a user-facing availability problem.\n\nThe right choice depends on the API. For a password-reset, payment, login, or expensive resource-intensive endpoint, I would generally favor stronger protection and potentially fail closed. For a less sensitive read-only API, availability may be more important, so fail-open or a local fallback may be reasonable.\n\nA practical design can use a bounded local fallback. For example:\n1. Try Redis.\n2. If Redis is healthy, use the distributed limiter.\n3. If Redis is unavailable, use a conservative local rate limit.\n4. Emit alerts and metrics.\n5. Recover automatically when Redis becomes available.\n\nHowever, a local fallback is not globally accurate because every application server maintains its own state. It should therefore be treated as emergency protection, not as an equivalent replacement for the distributed limiter.\n\nOther production considerations include Redis high availability, replication/failover, connection pooling, timeouts, circuit breakers, avoiding excessive retry storms, and capacity planning. The rate limiter should have a very small timeout because waiting hundreds of milliseconds for Redis on every API request can itself become a performance problem.\n\nI would also distinguish rate limiting from quotas. A rate limiter controls short-term request frequency, while a quota may represent something like 1 million API calls per month. Quotas often require durable accounting and should not depend solely on ephemeral Redis state.\n\nInterview takeaway: Redis is attractive because it provides fast shared state, atomic operations, and expiration. Redis failure requires an explicit availability-versus-protection decision; for critical APIs, use strong protection, while less critical APIs may use fail-open or a conservative local fallback.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How would you implement a distributed rate limiter across multiple application servers?", "When do you need a distributed lock, and what failure modes must you handle?", "How would you design a highly available distributed key-value store?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "Why might Redis be used for distributed rate limiting, and what h - Interview Question",
        seoDescription: "Redis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows. If Redis fails, the design needs a."
      },
      create: {
        question: "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?",
        slug: "why-might-redis-be-used-for-distributed-rate-limiting-and-what-happens-if-redis-is-unavailable",
        categoryId: category.id,
        subcategoryId: subcategory_rate_limiting.id,
        experienceLevel: "FRESHER",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Redis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Redis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows. If Redis fails, the design needs an explicit policy: reject requests, temporarily use local limits, or allow traffic with reduced protection. The correct choice depends on the risk of abuse versus the risk of denying legitimate traffic.",
        detailedAnswer: "Redis is a common choice for distributed rate limiting because rate-limit state is typically small, frequently accessed, short-lived, and needs fast atomic updates.\n\nReasons to use Redis:\n1. Low latency: Redis operates in memory and can handle high request rates.\n2. Shared state: multiple application servers can use the same counters/buckets.\n3. Atomic operations: INCR, SET, Lua scripts, and other operations help prevent race conditions.\n4. Expiration: keys can automatically expire after an inactivity period.\n5. Data structures: strings, hashes, sorted sets, and scripts support fixed-window, sliding-window, and token-bucket implementations.\n6. Horizontal scalability: Redis Cluster can distribute keys across nodes.\n\nFor example, a token bucket might maintain:\nrate:user123 -> tokens + lastRefillTimestamp\n\nA Lua script can atomically calculate the new token count and determine whether the request is allowed.\n\nThe difficult production question is: what happens when Redis is unavailable?\n\nThere are two primary choices.\n\nFail-open:\nIf Redis cannot be contacted, allow the request.\n\nAdvantages:\n- Application remains available.\n- A Redis outage does not automatically become an application outage.\n\nDisadvantages:\n- Rate limiting is temporarily bypassed.\n- An attacker can potentially overload the service during the outage.\n\nFail-closed:\nIf Redis cannot be contacted, reject the request.\n\nAdvantages:\n- Protection remains strict.\n- Useful for expensive or security-sensitive operations.\n\nDisadvantages:\n- Redis outage can cause legitimate traffic to fail.\n- A dependency outage becomes a user-facing availability problem.\n\nThe right choice depends on the API. For a password-reset, payment, login, or expensive resource-intensive endpoint, I would generally favor stronger protection and potentially fail closed. For a less sensitive read-only API, availability may be more important, so fail-open or a local fallback may be reasonable.\n\nA practical design can use a bounded local fallback. For example:\n1. Try Redis.\n2. If Redis is healthy, use the distributed limiter.\n3. If Redis is unavailable, use a conservative local rate limit.\n4. Emit alerts and metrics.\n5. Recover automatically when Redis becomes available.\n\nHowever, a local fallback is not globally accurate because every application server maintains its own state. It should therefore be treated as emergency protection, not as an equivalent replacement for the distributed limiter.\n\nOther production considerations include Redis high availability, replication/failover, connection pooling, timeouts, circuit breakers, avoiding excessive retry storms, and capacity planning. The rate limiter should have a very small timeout because waiting hundreds of milliseconds for Redis on every API request can itself become a performance problem.\n\nI would also distinguish rate limiting from quotas. A rate limiter controls short-term request frequency, while a quota may represent something like 1 million API calls per month. Quotas often require durable accounting and should not depend solely on ephemeral Redis state.\n\nInterview takeaway: Redis is attractive because it provides fast shared state, atomic operations, and expiration. Redis failure requires an explicit availability-versus-protection decision; for critical APIs, use strong protection, while less critical APIs may use fail-open or a conservative local fallback.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How would you implement a distributed rate limiter across multiple application servers?", "When do you need a distributed lock, and what failure modes must you handle?", "How would you design a highly available distributed key-value store?"],
        tags: ["system-design", "rate-limiting"],
        isPublished: true,
        seoTitle: "Why might Redis be used for distributed rate limiting, and what h - Interview Question",
        seoDescription: "Redis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows. If Redis fails, the design needs a."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 9: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-pastebin-like-service-what-are-the-api-data-model-and-storage-choices" },
      update: {
        question: "Design a Pastebin-like service. What are the API, data model, and storage choices?",
        categoryId: category.id,
        subcategoryId: subcategory_web_services.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.",
        detailedAnswer: "A Pastebin-like service allows users to submit text, receive a short identifier or URL, and retrieve the stored content later. The design is primarily write-once/read-many, with potentially large amounts of relatively immutable text data.\n\nCore requirements:\n1. Create a paste containing text.\n2. Generate a unique short ID.\n3. Retrieve a paste by its ID.\n4. Support optional expiration.\n5. Optionally support public, unlisted, or private visibility.\n6. Optionally support syntax/language metadata.\n7. Optionally allow deletion by the owner or authorized user.\n8. Handle large read traffic efficiently.\n9. Protect the service from spam, abuse, and extremely large payloads.\n10. Automatically clean up expired content.\n\nA simple API could be:\n\nPOST /api/pastes\nRequest:\n{\n  \"content\": \"public class HelloWorld { ... }\",\n  \"language\": \"java\",\n  \"visibility\": \"unlisted\",\n  \"expiresIn\": 86400\n}\n\nResponse:\n{\n  \"id\": \"aZ91xK\",\n  \"url\": \"https://paste.example/aZ91xK\",\n  \"expiresAt\": \"...\"\n}\n\nRetrieve:\nGET /api/pastes/{id}\n\nResponse:\n{\n  \"id\": \"aZ91xK\",\n  \"content\": \"...\",\n  \"language\": \"java\",\n  \"createdAt\": \"...\",\n  \"expiresAt\": \"...\"\n}\n\nDelete:\nDELETE /api/pastes/{id}\n\nIf authentication is supported, ownership should be checked before deletion.\n\nA relational metadata model could be:\n\nPaste {\n  id: BIGINT PRIMARY KEY,\n  shortId: VARCHAR(16) UNIQUE NOT NULL,\n  contentKey: VARCHAR(255) NULL,\n  content: TEXT NULL,\n  language: VARCHAR(50) NULL,\n  visibility: VARCHAR(20) NOT NULL,\n  ownerId: BIGINT NULL,\n  status: VARCHAR(20) NOT NULL,\n  createdAt: TIMESTAMP NOT NULL,\n  expiresAt: TIMESTAMP NULL\n}\n\nThe exact storage design depends heavily on paste size and scale.\n\nOption 1: Store content directly in a relational database.\n\nFor moderate traffic and relatively small pastes, MySQL or PostgreSQL can store the text in TEXT/LONGTEXT-style columns.\n\nAdvantages:\n- Simple architecture.\n- Transactions and metadata are easy.\n- Strong consistency.\n- Easy ownership/deletion queries.\n\nDisadvantages:\n- Large text content increases database storage and backup size.\n- High read traffic can put pressure on the database.\n\nOption 2: Store metadata in SQL and content in object storage.\n\nFor a larger system, I would prefer:\n\nSQL database:\nshortId -> metadata + objectKey\n\nObject storage:\nobjectKey -> actual paste content\n\nFor example:\nPaste row:\nshortId = aZ91xK\ncontentKey = pastes/2026/09/aZ91xK.txt\n\nObject storage contains the actual content.\n\nAdvantages:\n- Object storage is inexpensive and highly durable.\n- Large content does not consume database capacity.\n- Database remains focused on metadata and indexing.\n- Storage can scale independently.\n\nDisadvantages:\n- Retrieval requires an additional storage operation.\n- Deletion and expiration require coordination.\n- Access control must be designed carefully.\n\nFor extremely high scale, a NoSQL database could also store paste metadata/content, but I would not introduce it without a clear scaling requirement. A relational database plus object storage is often a simpler and robust design.\n\nRead flow:\n\nGET /aZ91xK\n       |\n       v\nLoad Balancer\n       |\n       v\nPaste Service\n       |\n       v\nRedis Cache\n    /       \\\n  hit       miss\n   |          |\n   v          v\n return     SQL metadata\n              |\n              v\n        Object Storage\n              |\n              v\n         Redis + return\n\nBecause pastes are generally immutable after creation, caching is particularly effective. A Redis entry could contain the paste content or a rendered response, depending on size and memory constraints.\n\nExpiration should be enforced during reads. If expiresAt has passed, return an appropriate response such as 404 or 410. A background cleanup job can asynchronously delete expired metadata and objects.\n\nFor object storage, lifecycle rules can automatically remove objects after a retention period, which is useful for very large volumes of expiring pastes.\n\nShort ID generation can use a unique numeric ID encoded using Base62, or a random identifier. If privacy/unlisted semantics matter, predictable sequential IDs may be undesirable because users could enumerate pastes. In that case, a sufficiently large random ID is preferable. The database should still enforce UNIQUE(shortId).\n\nSecurity and abuse controls are important for a public Pastebin service:\n- Maximum paste size.\n- Request rate limiting.\n- Authentication for private pastes.\n- Authorization on deletion.\n- Malware/phishing/abuse detection where appropriate.\n- Content-type handling to prevent stored XSS.\n- Escape user content when rendering HTML.\n- Avoid executing pasted code.\n- Prevent object-storage URLs from bypassing application authorization for private pastes.\n\nFor syntax highlighting, store a language identifier such as java, python, or javascript. The frontend can use a syntax-highlighting library to render it. The raw content should remain treated as untrusted text.\n\nFor high availability, run stateless Paste Service instances behind a load balancer, use replicated SQL storage, durable object storage, and replicated/cacheable Redis. Backups should cover the metadata database, while object storage should have its own durability and recovery strategy.\n\nInterview takeaway: for a small Pastebin service, SQL can store both metadata and content. At larger scale, I would separate metadata from content: SQL for searchable/transactional metadata and object storage for the paste body, with Redis caching for hot immutable pastes and background lifecycle cleanup for expiration.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a URL shortening service. What are the requirements, data model, short-key generation strategy, and redirect flow?", "How would you prevent users from consuming unlimited storage in Pastebin?", "When would you store paste content in a database versus object/blob storage?"],
        tags: ["system-design", "web-services"],
        isPublished: true,
        seoTitle: "Design a Pastebin-like service. What are the API, data model, and - Interview Question",
        seoDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A s."
      },
      create: {
        question: "Design a Pastebin-like service. What are the API, data model, and storage choices?",
        slug: "design-a-pastebin-like-service-what-are-the-api-data-model-and-storage-choices",
        categoryId: category.id,
        subcategoryId: subcategory_web_services.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.",
        detailedAnswer: "A Pastebin-like service allows users to submit text, receive a short identifier or URL, and retrieve the stored content later. The design is primarily write-once/read-many, with potentially large amounts of relatively immutable text data.\n\nCore requirements:\n1. Create a paste containing text.\n2. Generate a unique short ID.\n3. Retrieve a paste by its ID.\n4. Support optional expiration.\n5. Optionally support public, unlisted, or private visibility.\n6. Optionally support syntax/language metadata.\n7. Optionally allow deletion by the owner or authorized user.\n8. Handle large read traffic efficiently.\n9. Protect the service from spam, abuse, and extremely large payloads.\n10. Automatically clean up expired content.\n\nA simple API could be:\n\nPOST /api/pastes\nRequest:\n{\n  \"content\": \"public class HelloWorld { ... }\",\n  \"language\": \"java\",\n  \"visibility\": \"unlisted\",\n  \"expiresIn\": 86400\n}\n\nResponse:\n{\n  \"id\": \"aZ91xK\",\n  \"url\": \"https://paste.example/aZ91xK\",\n  \"expiresAt\": \"...\"\n}\n\nRetrieve:\nGET /api/pastes/{id}\n\nResponse:\n{\n  \"id\": \"aZ91xK\",\n  \"content\": \"...\",\n  \"language\": \"java\",\n  \"createdAt\": \"...\",\n  \"expiresAt\": \"...\"\n}\n\nDelete:\nDELETE /api/pastes/{id}\n\nIf authentication is supported, ownership should be checked before deletion.\n\nA relational metadata model could be:\n\nPaste {\n  id: BIGINT PRIMARY KEY,\n  shortId: VARCHAR(16) UNIQUE NOT NULL,\n  contentKey: VARCHAR(255) NULL,\n  content: TEXT NULL,\n  language: VARCHAR(50) NULL,\n  visibility: VARCHAR(20) NOT NULL,\n  ownerId: BIGINT NULL,\n  status: VARCHAR(20) NOT NULL,\n  createdAt: TIMESTAMP NOT NULL,\n  expiresAt: TIMESTAMP NULL\n}\n\nThe exact storage design depends heavily on paste size and scale.\n\nOption 1: Store content directly in a relational database.\n\nFor moderate traffic and relatively small pastes, MySQL or PostgreSQL can store the text in TEXT/LONGTEXT-style columns.\n\nAdvantages:\n- Simple architecture.\n- Transactions and metadata are easy.\n- Strong consistency.\n- Easy ownership/deletion queries.\n\nDisadvantages:\n- Large text content increases database storage and backup size.\n- High read traffic can put pressure on the database.\n\nOption 2: Store metadata in SQL and content in object storage.\n\nFor a larger system, I would prefer:\n\nSQL database:\nshortId -> metadata + objectKey\n\nObject storage:\nobjectKey -> actual paste content\n\nFor example:\nPaste row:\nshortId = aZ91xK\ncontentKey = pastes/2026/09/aZ91xK.txt\n\nObject storage contains the actual content.\n\nAdvantages:\n- Object storage is inexpensive and highly durable.\n- Large content does not consume database capacity.\n- Database remains focused on metadata and indexing.\n- Storage can scale independently.\n\nDisadvantages:\n- Retrieval requires an additional storage operation.\n- Deletion and expiration require coordination.\n- Access control must be designed carefully.\n\nFor extremely high scale, a NoSQL database could also store paste metadata/content, but I would not introduce it without a clear scaling requirement. A relational database plus object storage is often a simpler and robust design.\n\nRead flow:\n\nGET /aZ91xK\n       |\n       v\nLoad Balancer\n       |\n       v\nPaste Service\n       |\n       v\nRedis Cache\n    /       \\\n  hit       miss\n   |          |\n   v          v\n return     SQL metadata\n              |\n              v\n        Object Storage\n              |\n              v\n         Redis + return\n\nBecause pastes are generally immutable after creation, caching is particularly effective. A Redis entry could contain the paste content or a rendered response, depending on size and memory constraints.\n\nExpiration should be enforced during reads. If expiresAt has passed, return an appropriate response such as 404 or 410. A background cleanup job can asynchronously delete expired metadata and objects.\n\nFor object storage, lifecycle rules can automatically remove objects after a retention period, which is useful for very large volumes of expiring pastes.\n\nShort ID generation can use a unique numeric ID encoded using Base62, or a random identifier. If privacy/unlisted semantics matter, predictable sequential IDs may be undesirable because users could enumerate pastes. In that case, a sufficiently large random ID is preferable. The database should still enforce UNIQUE(shortId).\n\nSecurity and abuse controls are important for a public Pastebin service:\n- Maximum paste size.\n- Request rate limiting.\n- Authentication for private pastes.\n- Authorization on deletion.\n- Malware/phishing/abuse detection where appropriate.\n- Content-type handling to prevent stored XSS.\n- Escape user content when rendering HTML.\n- Avoid executing pasted code.\n- Prevent object-storage URLs from bypassing application authorization for private pastes.\n\nFor syntax highlighting, store a language identifier such as java, python, or javascript. The frontend can use a syntax-highlighting library to render it. The raw content should remain treated as untrusted text.\n\nFor high availability, run stateless Paste Service instances behind a load balancer, use replicated SQL storage, durable object storage, and replicated/cacheable Redis. Backups should cover the metadata database, while object storage should have its own durability and recovery strategy.\n\nInterview takeaway: for a small Pastebin service, SQL can store both metadata and content. At larger scale, I would separate metadata from content: SQL for searchable/transactional metadata and object storage for the paste body, with Redis caching for hot immutable pastes and background lifecycle cleanup for expiration.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a URL shortening service. What are the requirements, data model, short-key generation strategy, and redirect flow?", "How would you prevent users from consuming unlimited storage in Pastebin?", "When would you store paste content in a database versus object/blob storage?"],
        tags: ["system-design", "web-services"],
        isPublished: true,
        seoTitle: "Design a Pastebin-like service. What are the API, data model, and - Interview Question",
        seoDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A s."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 10: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "when-would-you-store-paste-content-in-a-database-versus-object-blob-storage" },
      update: {
        question: "When would you store paste content in a database versus object/blob storage?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Small, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Small, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage. The application can keep metadata and a content object key together, while object storage handles large payload durability and scaling.",
        detailedAnswer: "The choice depends mainly on paste size, access patterns, query requirements, consistency needs, and expected scale.\n\nI would store paste content directly in a relational database when pastes are relatively small and the service is moderate in scale. For example, a MySQL or PostgreSQL table could contain the paste body in a TEXT column along with metadata such as shortId, ownerId, language, createdAt, and expiresAt.\n\nThis approach is simple because metadata and content are stored together. A single transaction can create or delete everything, backups are straightforward, and retrieving a paste requires only one database lookup.\n\nHowever, storing large amounts of text directly in the database has drawbacks. Large content increases database size, backup/restore time, replication traffic, storage cost, and potentially the amount of I/O competing with transactional queries.\n\nI would prefer object/blob storage when:\n- Paste content can be large.\n- The number of pastes is very high.\n- Content is mostly immutable.\n- The application does not need to query inside the paste body using SQL.\n- Storage needs to scale independently from transactional metadata.\n- Long-term or inexpensive storage is important.\n\nThe architecture becomes:\n\nSQL database:\nshortId -> ownerId, language, status, expiresAt, contentObjectKey\n\nObject storage:\ncontentObjectKey -> actual paste content\n\nFor example:\nshortId = aZ91xK\ncontentObjectKey = pastes/2026/09/aZ91xK.txt\n\nThe database remains responsible for metadata, authorization, expiration state, and indexing, while object storage holds the large immutable payload.\n\nObject storage also works well with lifecycle policies. If a paste should expire after seven days, the object can potentially be automatically deleted after that retention period.\n\nThere is a trade-off: object storage introduces another network operation and requires careful handling of authorization and consistency between the metadata row and the object.\n\nFor example, during creation:\n1. Generate a unique paste ID.\n2. Write the content to object storage.\n3. Store the metadata and object key in SQL.\n4. Return the paste URL only after both operations succeed.\n\nIf step 2 succeeds but step 3 fails, an orphaned object may exist. A cleanup process can identify and remove such objects.\n\nFor small content at moderate scale, SQL is usually the simpler choice. For a large-scale Pastebin-like service, I would generally use SQL for metadata and object storage for the paste body.\n\nInterview takeaway: use a database when simplicity, transactional behavior, and small content matter; use object storage when content is large, immutable, high-volume, and does not need relational querying.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?", "Why replicate a database, and what problems can occur when reads use replicas?", "Explain CAP theorem using a distributed database during a network partition."],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "When would you store paste content in a database versus object/bl - Interview Question",
        seoDescription: "Small, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage. The application."
      },
      create: {
        question: "When would you store paste content in a database versus object/blob storage?",
        slug: "when-would-you-store-paste-content-in-a-database-versus-object-blob-storage",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Small, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Small, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage. The application can keep metadata and a content object key together, while object storage handles large payload durability and scaling.",
        detailedAnswer: "The choice depends mainly on paste size, access patterns, query requirements, consistency needs, and expected scale.\n\nI would store paste content directly in a relational database when pastes are relatively small and the service is moderate in scale. For example, a MySQL or PostgreSQL table could contain the paste body in a TEXT column along with metadata such as shortId, ownerId, language, createdAt, and expiresAt.\n\nThis approach is simple because metadata and content are stored together. A single transaction can create or delete everything, backups are straightforward, and retrieving a paste requires only one database lookup.\n\nHowever, storing large amounts of text directly in the database has drawbacks. Large content increases database size, backup/restore time, replication traffic, storage cost, and potentially the amount of I/O competing with transactional queries.\n\nI would prefer object/blob storage when:\n- Paste content can be large.\n- The number of pastes is very high.\n- Content is mostly immutable.\n- The application does not need to query inside the paste body using SQL.\n- Storage needs to scale independently from transactional metadata.\n- Long-term or inexpensive storage is important.\n\nThe architecture becomes:\n\nSQL database:\nshortId -> ownerId, language, status, expiresAt, contentObjectKey\n\nObject storage:\ncontentObjectKey -> actual paste content\n\nFor example:\nshortId = aZ91xK\ncontentObjectKey = pastes/2026/09/aZ91xK.txt\n\nThe database remains responsible for metadata, authorization, expiration state, and indexing, while object storage holds the large immutable payload.\n\nObject storage also works well with lifecycle policies. If a paste should expire after seven days, the object can potentially be automatically deleted after that retention period.\n\nThere is a trade-off: object storage introduces another network operation and requires careful handling of authorization and consistency between the metadata row and the object.\n\nFor example, during creation:\n1. Generate a unique paste ID.\n2. Write the content to object storage.\n3. Store the metadata and object key in SQL.\n4. Return the paste URL only after both operations succeed.\n\nIf step 2 succeeds but step 3 fails, an orphaned object may exist. A cleanup process can identify and remove such objects.\n\nFor small content at moderate scale, SQL is usually the simpler choice. For a large-scale Pastebin-like service, I would generally use SQL for metadata and object storage for the paste body.\n\nInterview takeaway: use a database when simplicity, transactional behavior, and small content matter; use object storage when content is large, immutable, high-volume, and does not need relational querying.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?", "Why replicate a database, and what problems can occur when reads use replicas?", "Explain CAP theorem using a distributed database during a network partition."],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "When would you store paste content in a database versus object/bl - Interview Question",
        seoDescription: "Small, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage. The application."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 11: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-implement-paste-expiration-and-automatic-cleanup" },
      update: {
        question: "How would you implement paste expiration and automatic cleanup?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Store an expiresAt timestamp and treat expired content as unavailable.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Store an expiresAt timestamp and treat expired content as unavailable. A background worker can asynchronously delete or archive expired objects, while reads still enforce expiration immediately. For large systems, partition cleanup work by time ranges rather than scanning the entire dataset.",
        detailedAnswer: "I would implement expiration as both a read-time rule and a background cleanup process. The read-time check guarantees that an expired paste is not served even if cleanup has not run yet. The background process removes expired data and controls storage growth.\n\nThe data model could contain:\n\nexpiresAt TIMESTAMP NULL\nstatus VARCHAR(20)\n\nOn retrieval:\n1. Find the paste metadata by shortId.\n2. Verify that the paste is active.\n3. Check whether expiresAt is non-null and is earlier than or equal to the current time.\n4. If expired, return 404 or 410 according to the API contract.\n5. Otherwise retrieve and return the content.\n\nThis is important because a scheduled cleanup job might run late. Expiration must not depend on the scheduler being perfectly punctual.\n\nFor automatic cleanup, run a scheduled worker such as:\n\nDELETE/mark expired records where expiresAt <= NOW()\n\nFor a large database, I would not execute one huge DELETE because it can create long transactions, lock contention, excessive undo/redo activity, and replication lag.\n\nInstead, process in batches:\n\n1. Select a limited number of expired IDs using an index on expiresAt.\n2. Mark/delete them in small batches.\n3. Delete associated objects from object storage asynchronously.\n4. Continue until the backlog is reduced.\n\nFor example, an index on expiresAt allows the cleanup worker to efficiently locate old records.\n\nIf content is stored in object storage, lifecycle policies can provide an additional cleanup mechanism. The application database can mark the paste expired, while the object store automatically deletes the object after the configured retention period.\n\nI would also consider Redis caching. If an expired paste is cached, the cache entry must not survive beyond the paste's expiration. Therefore, its Redis TTL should be no longer than the remaining lifetime of the paste. When a paste is explicitly deleted, its cache entry should be invalidated immediately.\n\nFor reliability, the cleanup operation should be idempotent. If a worker crashes halfway through processing, another worker should safely retry the same paste.\n\nIn a distributed environment, multiple workers may run concurrently. Options include partitioning work by ID/time range, using a queue, or using a carefully designed distributed lease/lock. I would avoid a single global lock around the entire cleanup job because it limits scalability.\n\nMonitoring should include:\n- Number of expired pastes waiting for cleanup.\n- Cleanup processing rate.\n- Oldest cleanup backlog age.\n- Failed object deletions.\n- Database deletion latency.\n- Storage utilization.\n\nA good design therefore has two layers:\n\nRead path -> enforce expiration immediately.\nBackground path -> physically clean expired data and reclaim storage.\n\nInterview takeaway: never rely solely on a cron job for correctness. Check expiration during reads, then asynchronously clean expired records and objects in small, retryable batches.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["When would you store paste content in a database versus object/blob storage?", "How would you handle duplicate long URLs, URL expiration, and deletion?", "Design a Pastebin-like service. What are the API, data model, and storage choices?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you implement paste expiration and automatic cleanup - Interview Question",
        seoDescription: "Store an expiresAt timestamp and treat expired content as unavailable. A background worker can asynchronously delete or archive expired objects, while read."
      },
      create: {
        question: "How would you implement paste expiration and automatic cleanup?",
        slug: "how-would-you-implement-paste-expiration-and-automatic-cleanup",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Store an expiresAt timestamp and treat expired content as unavailable.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Store an expiresAt timestamp and treat expired content as unavailable. A background worker can asynchronously delete or archive expired objects, while reads still enforce expiration immediately. For large systems, partition cleanup work by time ranges rather than scanning the entire dataset.",
        detailedAnswer: "I would implement expiration as both a read-time rule and a background cleanup process. The read-time check guarantees that an expired paste is not served even if cleanup has not run yet. The background process removes expired data and controls storage growth.\n\nThe data model could contain:\n\nexpiresAt TIMESTAMP NULL\nstatus VARCHAR(20)\n\nOn retrieval:\n1. Find the paste metadata by shortId.\n2. Verify that the paste is active.\n3. Check whether expiresAt is non-null and is earlier than or equal to the current time.\n4. If expired, return 404 or 410 according to the API contract.\n5. Otherwise retrieve and return the content.\n\nThis is important because a scheduled cleanup job might run late. Expiration must not depend on the scheduler being perfectly punctual.\n\nFor automatic cleanup, run a scheduled worker such as:\n\nDELETE/mark expired records where expiresAt <= NOW()\n\nFor a large database, I would not execute one huge DELETE because it can create long transactions, lock contention, excessive undo/redo activity, and replication lag.\n\nInstead, process in batches:\n\n1. Select a limited number of expired IDs using an index on expiresAt.\n2. Mark/delete them in small batches.\n3. Delete associated objects from object storage asynchronously.\n4. Continue until the backlog is reduced.\n\nFor example, an index on expiresAt allows the cleanup worker to efficiently locate old records.\n\nIf content is stored in object storage, lifecycle policies can provide an additional cleanup mechanism. The application database can mark the paste expired, while the object store automatically deletes the object after the configured retention period.\n\nI would also consider Redis caching. If an expired paste is cached, the cache entry must not survive beyond the paste's expiration. Therefore, its Redis TTL should be no longer than the remaining lifetime of the paste. When a paste is explicitly deleted, its cache entry should be invalidated immediately.\n\nFor reliability, the cleanup operation should be idempotent. If a worker crashes halfway through processing, another worker should safely retry the same paste.\n\nIn a distributed environment, multiple workers may run concurrently. Options include partitioning work by ID/time range, using a queue, or using a carefully designed distributed lease/lock. I would avoid a single global lock around the entire cleanup job because it limits scalability.\n\nMonitoring should include:\n- Number of expired pastes waiting for cleanup.\n- Cleanup processing rate.\n- Oldest cleanup backlog age.\n- Failed object deletions.\n- Database deletion latency.\n- Storage utilization.\n\nA good design therefore has two layers:\n\nRead path -> enforce expiration immediately.\nBackground path -> physically clean expired data and reclaim storage.\n\nInterview takeaway: never rely solely on a cron job for correctness. Check expiration during reads, then asynchronously clean expired records and objects in small, retryable batches.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["When would you store paste content in a database versus object/blob storage?", "How would you handle duplicate long URLs, URL expiration, and deletion?", "Design a Pastebin-like service. What are the API, data model, and storage choices?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you implement paste expiration and automatic cleanup - Interview Question",
        seoDescription: "Store an expiresAt timestamp and treat expired content as unavailable. A background worker can asynchronously delete or archive expired objects, while read."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 12: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-prevent-users-from-consuming-unlimited-storage-in-pastebin" },
      update: {
        question: "How would you prevent users from consuming unlimited storage in Pastebin?",
        categoryId: category.id,
        subcategoryId: subcategory_web_services.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.",
        detailedAnswer: "I would treat storage consumption as a quota and abuse-prevention problem rather than relying only on a maximum paste size.\n\nThere are several controls I would combine.\n\n1. Maximum paste size\nReject individual pastes above a configured limit, for example 1 MB or 10 MB depending on the product.\n\nThis prevents a single request from consuming excessive resources.\n\n2. Per-user quota\nGive each user a storage quota such as:\nFree user -> 100 MB\nPaid user -> 10 GB\n\nBefore accepting a paste, verify that the user's allocated storage is not exceeded.\n\n3. Rate limiting\nLimit paste creation requests. A user should not be able to create thousands of pastes per second even if every paste is small.\n\nFor example:\n- 20 create requests/minute.\n- Separate limits for authenticated and anonymous users.\n\n4. Anonymous-user restrictions\nUnauthenticated users can receive much smaller limits than authenticated users. This reduces abuse from disposable accounts and automated clients.\n\n5. Expiration policies\nRequire or strongly encourage expiration for anonymous pastes. For example, anonymous content might automatically expire after a limited period.\n\n6. Storage accounting\nMaintain usage information such as:\nUserStorage {\n  userId,\n  bytesUsed,\n  quotaBytes\n}\n\nWhen creating content, the service reserves the required amount before writing the content. After a successful write, the usage is committed. If the write fails, the reservation must be released.\n\nAt scale, I would be careful about updating one user's storage counter under heavy concurrency. A simple read-check-write can race. The quota update should be atomic or transactional.\n\nFor example, conceptually:\nUPDATE user_storage\nSET bytesUsed = bytesUsed + :size\nWHERE userId = :userId\n  AND bytesUsed + :size <= quotaBytes;\n\nIf zero rows are updated, the quota has been exceeded.\n\n7. Global service quota\nPer-user limits are not enough. The service should also have global capacity protection. If storage utilization approaches a safe threshold, new uploads can be restricted, pricing can be adjusted, or additional capacity can be provisioned.\n\n8. Deduplication where appropriate\nIf exact duplicate content is common and the product allows deduplication, content hashing can identify identical blobs. However, deduplication should not accidentally bypass user-level quota or ownership semantics.\n\n9. Abuse detection\nMonitor unusual patterns such as huge numbers of pastes, repeated uploads, automated account creation, suspicious content, and unusually high bandwidth consumption.\n\n10. Lifecycle cleanup\nExpiration and deletion must actually reclaim storage. Otherwise, a quota system can appear correct while physical storage continues growing because deleted metadata leaves blobs behind.\n\n11. Backpressure\nIf object storage or downstream systems are under pressure, reject or slow new uploads rather than allowing queues to grow without bounds.\n\nA robust create flow would therefore be:\n\nValidate request\n   |\nRate limit\n   |\nCheck user quota\n   |\nReserve storage\n   |\nWrite content\n   |\nCommit metadata + usage\n   |\nReturn paste URL\n\nIf content storage succeeds but metadata commit fails, a retry/cleanup mechanism must remove the orphaned object.\n\nInterview takeaway: combine maximum object size, per-user quotas, rate limits, expiration, anonymous restrictions, atomic storage accounting, global capacity limits, and cleanup. No single mechanism is sufficient.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Pastebin-like service. What are the API, data model, and storage choices?", "When would you store paste content in a database versus object/blob storage?", "How would you implement paste expiration and automatic cleanup?"],
        tags: ["system-design", "web-services"],
        isPublished: true,
        seoTitle: "How would you prevent users from consuming unlimited storage in P - Interview Question",
        seoDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A s."
      },
      create: {
        question: "How would you prevent users from consuming unlimited storage in Pastebin?",
        slug: "how-would-you-prevent-users-from-consuming-unlimited-storage-in-pastebin",
        categoryId: category.id,
        subcategoryId: subcategory_web_services.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.",
        detailedAnswer: "I would treat storage consumption as a quota and abuse-prevention problem rather than relying only on a maximum paste size.\n\nThere are several controls I would combine.\n\n1. Maximum paste size\nReject individual pastes above a configured limit, for example 1 MB or 10 MB depending on the product.\n\nThis prevents a single request from consuming excessive resources.\n\n2. Per-user quota\nGive each user a storage quota such as:\nFree user -> 100 MB\nPaid user -> 10 GB\n\nBefore accepting a paste, verify that the user's allocated storage is not exceeded.\n\n3. Rate limiting\nLimit paste creation requests. A user should not be able to create thousands of pastes per second even if every paste is small.\n\nFor example:\n- 20 create requests/minute.\n- Separate limits for authenticated and anonymous users.\n\n4. Anonymous-user restrictions\nUnauthenticated users can receive much smaller limits than authenticated users. This reduces abuse from disposable accounts and automated clients.\n\n5. Expiration policies\nRequire or strongly encourage expiration for anonymous pastes. For example, anonymous content might automatically expire after a limited period.\n\n6. Storage accounting\nMaintain usage information such as:\nUserStorage {\n  userId,\n  bytesUsed,\n  quotaBytes\n}\n\nWhen creating content, the service reserves the required amount before writing the content. After a successful write, the usage is committed. If the write fails, the reservation must be released.\n\nAt scale, I would be careful about updating one user's storage counter under heavy concurrency. A simple read-check-write can race. The quota update should be atomic or transactional.\n\nFor example, conceptually:\nUPDATE user_storage\nSET bytesUsed = bytesUsed + :size\nWHERE userId = :userId\n  AND bytesUsed + :size <= quotaBytes;\n\nIf zero rows are updated, the quota has been exceeded.\n\n7. Global service quota\nPer-user limits are not enough. The service should also have global capacity protection. If storage utilization approaches a safe threshold, new uploads can be restricted, pricing can be adjusted, or additional capacity can be provisioned.\n\n8. Deduplication where appropriate\nIf exact duplicate content is common and the product allows deduplication, content hashing can identify identical blobs. However, deduplication should not accidentally bypass user-level quota or ownership semantics.\n\n9. Abuse detection\nMonitor unusual patterns such as huge numbers of pastes, repeated uploads, automated account creation, suspicious content, and unusually high bandwidth consumption.\n\n10. Lifecycle cleanup\nExpiration and deletion must actually reclaim storage. Otherwise, a quota system can appear correct while physical storage continues growing because deleted metadata leaves blobs behind.\n\n11. Backpressure\nIf object storage or downstream systems are under pressure, reject or slow new uploads rather than allowing queues to grow without bounds.\n\nA robust create flow would therefore be:\n\nValidate request\n   |\nRate limit\n   |\nCheck user quota\n   |\nReserve storage\n   |\nWrite content\n   |\nCommit metadata + usage\n   |\nReturn paste URL\n\nIf content storage succeeds but metadata commit fails, a retry/cleanup mechanism must remove the orphaned object.\n\nInterview takeaway: combine maximum object size, per-user quotas, rate limits, expiration, anonymous restrictions, atomic storage accounting, global capacity limits, and cleanup. No single mechanism is sufficient.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Pastebin-like service. What are the API, data model, and storage choices?", "When would you store paste content in a database versus object/blob storage?", "How would you implement paste expiration and automatic cleanup?"],
        tags: ["system-design", "web-services"],
        isPublished: true,
        seoTitle: "How would you prevent users from consuming unlimited storage in P - Interview Question",
        seoDescription: "Use an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A s."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 13: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "explain-cap-theorem-using-a-distributed-database-during-a-network-partition" },
      update: {
        question: "Explain CAP theorem using a distributed database during a network partition.",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "CAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consistency and availability for every operation.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "CAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consistency and availability for every operation. During the partition, the design must choose which guarantee to sacrifice for the affected operation. CAP is about partitioned distributed systems; it is not simply a three-way feature checklist.",
        detailedAnswer: "CAP theorem states that a distributed data system cannot simultaneously guarantee all three of these properties during a network partition:\n\nC = Consistency\nEvery successful read sees the appropriate latest value according to the system's consistency model. In the simplified CAP discussion, all clients see a single consistent view.\n\nA = Availability\nEvery request to a non-failing node receives a successful response, even if some other nodes cannot communicate.\n\nP = Partition tolerance\nThe system continues operating despite a communication failure that splits nodes into separate groups.\n\nThe important point is that a network partition is not something a distributed system can simply choose to ignore. In a real distributed environment, partitions can occur because of network failures, routing problems, overloaded links, or infrastructure issues. Therefore, when a partition occurs, the system must choose how to trade consistency and availability.\n\nConsider two database nodes:\n\nNode A <---- network failure ----> Node B\n\nBefore the failure:\naccount balance = 100\n\nDuring the partition, a client sends a write to Node A:\nset balance = 50\n\nAnother client sends a write/read to Node B.\n\nIf Node B continues accepting operations independently, the system remains available. But Node B cannot immediately coordinate with Node A, so both sides can potentially develop conflicting state. This favors availability during the partition at the cost of strong consistency.\n\nAlternatively, the system can refuse operations that require agreement while the partition exists. This preserves consistency but sacrifices availability for affected operations.\n\nTherefore:\n\nCP-style behavior:\nPartition occurs -> nodes cannot safely agree -> reject/block some operations -> consistency is preserved.\n\nAP-style behavior:\nPartition occurs -> nodes continue serving requests independently -> availability is preserved -> data may temporarily diverge and must later reconcile.\n\nA common misunderstanding is that CAP means a system permanently chooses exactly two letters. The key statement is about behavior specifically when a network partition occurs. In normal operation, a system can often provide both strong consistency and high availability when communication is healthy.\n\nAnother important distinction is that CAP consistency is not the same as the C in ACID. CAP consistency is about the behavior of distributed replicas and whether clients observe a consistent system-wide view. ACID consistency is about preserving database/application invariants across transactions.\n\nIn an interview, I would explain that the correct design depends on business requirements. A financial system may prefer rejecting operations during a partition rather than accepting conflicting balances. A shopping cart or social feed may tolerate temporary divergence and reconcile later.\n\nInterview takeaway: partitions force a distributed system to choose between continuing to serve requests independently and preserving immediate system-wide consistency. CAP is fundamentally about this trade-off during partitions.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Explain CAP theorem using a distributed database during a network - Interview Question",
        seoDescription: "CAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consi."
      },
      create: {
        question: "Explain CAP theorem using a distributed database during a network partition.",
        slug: "explain-cap-theorem-using-a-distributed-database-during-a-network-partition",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "CAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consistency and availability for every operation.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "CAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consistency and availability for every operation. During the partition, the design must choose which guarantee to sacrifice for the affected operation. CAP is about partitioned distributed systems; it is not simply a three-way feature checklist.",
        detailedAnswer: "CAP theorem states that a distributed data system cannot simultaneously guarantee all three of these properties during a network partition:\n\nC = Consistency\nEvery successful read sees the appropriate latest value according to the system's consistency model. In the simplified CAP discussion, all clients see a single consistent view.\n\nA = Availability\nEvery request to a non-failing node receives a successful response, even if some other nodes cannot communicate.\n\nP = Partition tolerance\nThe system continues operating despite a communication failure that splits nodes into separate groups.\n\nThe important point is that a network partition is not something a distributed system can simply choose to ignore. In a real distributed environment, partitions can occur because of network failures, routing problems, overloaded links, or infrastructure issues. Therefore, when a partition occurs, the system must choose how to trade consistency and availability.\n\nConsider two database nodes:\n\nNode A <---- network failure ----> Node B\n\nBefore the failure:\naccount balance = 100\n\nDuring the partition, a client sends a write to Node A:\nset balance = 50\n\nAnother client sends a write/read to Node B.\n\nIf Node B continues accepting operations independently, the system remains available. But Node B cannot immediately coordinate with Node A, so both sides can potentially develop conflicting state. This favors availability during the partition at the cost of strong consistency.\n\nAlternatively, the system can refuse operations that require agreement while the partition exists. This preserves consistency but sacrifices availability for affected operations.\n\nTherefore:\n\nCP-style behavior:\nPartition occurs -> nodes cannot safely agree -> reject/block some operations -> consistency is preserved.\n\nAP-style behavior:\nPartition occurs -> nodes continue serving requests independently -> availability is preserved -> data may temporarily diverge and must later reconcile.\n\nA common misunderstanding is that CAP means a system permanently chooses exactly two letters. The key statement is about behavior specifically when a network partition occurs. In normal operation, a system can often provide both strong consistency and high availability when communication is healthy.\n\nAnother important distinction is that CAP consistency is not the same as the C in ACID. CAP consistency is about the behavior of distributed replicas and whether clients observe a consistent system-wide view. ACID consistency is about preserving database/application invariants across transactions.\n\nIn an interview, I would explain that the correct design depends on business requirements. A financial system may prefer rejecting operations during a partition rather than accepting conflicting balances. A shopping cart or social feed may tolerate temporary divergence and reconcile later.\n\nInterview takeaway: partitions force a distributed system to choose between continuing to serve requests independently and preserving immediate system-wide consistency. CAP is fundamentally about this trade-off during partitions.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Explain CAP theorem using a distributed database during a network - Interview Question",
        seoDescription: "CAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consi."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 14: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "give-an-example-where-consistency-is-more-important-than-availability-and-explain-why" },
      update: {
        question: "Give an example where consistency is more important than availability and explain why.",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A financial balance or unique inventory allocation is a typical consistency-first",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A financial balance or unique inventory allocation is a typical consistency-first",
        detailedAnswer: "**Direct answer:**\n\nA financial balance or unique inventory allocation is a typical consistency-first\n\n**Example:**\n\nFor an account balance or inventory reservation, serving stale data can lead to an incorrect business decision. It is reasonable to prefer a consistent read even if a temporary outage means the operation must wait or fail.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What consistency and durability requirements differ between a payment ledger and notifications?", "Compare strong consistency and eventual consistency with practical examples.", "A network partition separates two active regions. What behavior and consistency trade-off do you choose?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Give an example where consistency is more important than availabi - Interview Question",
        seoDescription: "A financial balance or unique inventory allocation is a typical consistency-first"
      },
      create: {
        question: "Give an example where consistency is more important than availability and explain why.",
        slug: "give-an-example-where-consistency-is-more-important-than-availability-and-explain-why",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "FRESHER",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A financial balance or unique inventory allocation is a typical consistency-first",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A financial balance or unique inventory allocation is a typical consistency-first",
        detailedAnswer: "**Direct answer:**\n\nA financial balance or unique inventory allocation is a typical consistency-first\n\n**Example:**\n\nFor an account balance or inventory reservation, serving stale data can lead to an incorrect business decision. It is reasonable to prefer a consistent read even if a temporary outage means the operation must wait or fail.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What consistency and durability requirements differ between a payment ledger and notifications?", "Compare strong consistency and eventual consistency with practical examples.", "A network partition separates two active regions. What behavior and consistency trade-off do you choose?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Give an example where consistency is more important than availabi - Interview Question",
        seoDescription: "A financial balance or unique inventory allocation is a typical consistency-first"
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 15: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "explain-vertical-versus-horizontal-scaling-and-the-main-limitations-of-each" },
      update: {
        question: "Explain vertical versus horizontal scaling and the main limitations of each.",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Vertical scaling increases the capacity of one machine; horizontal scaling adds machines.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Vertical scaling increases the capacity of one machine; horizontal scaling adds machines. Vertical scaling is operationally simple but has hardware ceilings and can leave a large failure domain. Horizontal scaling provides more capacity and resilience but introduces distributed coordination, load balancing, data partitioning, and operational complexity.",
        detailedAnswer: "**Direct answer:**\n\nVertical scaling increases the capacity of one machine; horizontal scaling adds machines. Vertical scaling is operationally simple but has hardware ceilings and can leave a large failure domain. Horizontal scaling provides more capacity and resilience but introduces distributed coordination, load balancing, data partitioning, and operational complexity.\n\n**Example:**\n\nVertical scaling means moving from 8 CPU cores to 32 cores on one machine; it is straightforward but eventually hits hardware and cost limits. Horizontal scaling adds more application servers, which improves capacity and resilience but introduces coordination, routing, and distributed-state concerns.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How does a CDN reduce video latency and origin load?", "What is a reverse proxy and what problems does it solve?", "What responsibilities would you put in an API gateway?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "Explain vertical versus horizontal scaling and the main limitatio - Interview Question",
        seoDescription: "Vertical scaling increases the capacity of one machine; horizontal scaling adds machines. Vertical scaling is operationally simple but has hardware ceiling."
      },
      create: {
        question: "Explain vertical versus horizontal scaling and the main limitations of each.",
        slug: "explain-vertical-versus-horizontal-scaling-and-the-main-limitations-of-each",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Vertical scaling increases the capacity of one machine; horizontal scaling adds machines.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Vertical scaling increases the capacity of one machine; horizontal scaling adds machines. Vertical scaling is operationally simple but has hardware ceilings and can leave a large failure domain. Horizontal scaling provides more capacity and resilience but introduces distributed coordination, load balancing, data partitioning, and operational complexity.",
        detailedAnswer: "**Direct answer:**\n\nVertical scaling increases the capacity of one machine; horizontal scaling adds machines. Vertical scaling is operationally simple but has hardware ceilings and can leave a large failure domain. Horizontal scaling provides more capacity and resilience but introduces distributed coordination, load balancing, data partitioning, and operational complexity.\n\n**Example:**\n\nVertical scaling means moving from 8 CPU cores to 32 cores on one machine; it is straightforward but eventually hits hardware and cost limits. Horizontal scaling adds more application servers, which improves capacity and resilience but introduces coordination, routing, and distributed-state concerns.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How does a CDN reduce video latency and origin load?", "What is a reverse proxy and what problems does it solve?", "What responsibilities would you put in an API gateway?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "Explain vertical versus horizontal scaling and the main limitatio - Interview Question",
        seoDescription: "Vertical scaling increases the capacity of one machine; horizontal scaling adds machines. Vertical scaling is operationally simple but has hardware ceiling."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 16: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "you-have-one-backend-server-and-traffic-is-growing-how-would-you-scale-it" },
      update: {
        question: "You have one backend server and traffic is growing. How would you scale it?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.",
        detailedAnswer: "**Direct answer:**\n\nFirst make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.\n\n**Example:**\n\nStart by putting the application behind a load balancer and add a second server. Move sessions out of process, externalize shared state, add database connection pooling, and then scale the application tier horizontally as traffic continues to grow.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How should a load balancer react when one backend server becomes unhealthy?", "How would you scale a very large group chat?", "How would you partition a ride-sharing system geographically at large scale?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "You have one backend server and traffic is growing. How would you - Interview Question",
        seoDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce cachi."
      },
      create: {
        question: "You have one backend server and traffic is growing. How would you scale it?",
        slug: "you-have-one-backend-server-and-traffic-is-growing-how-would-you-scale-it",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.",
        detailedAnswer: "**Direct answer:**\n\nFirst make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.\n\n**Example:**\n\nStart by putting the application behind a load balancer and add a second server. Move sessions out of process, externalize shared state, add database connection pooling, and then scale the application tier horizontally as traffic continues to grow.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How should a load balancer react when one backend server becomes unhealthy?", "How would you scale a very large group chat?", "How would you partition a ride-sharing system geographically at large scale?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "You have one backend server and traffic is growing. How would you - Interview Question",
        seoDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce cachi."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 17: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-does-a-load-balancer-do-when-several-application-servers-handle-the-same-api" },
      update: {
        question: "What does a load balancer do when several application servers handle the same API?",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routing.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routing. It can terminate TLS, perform health checks, support retries carefully, and route around unhealthy instances. Avoid blind retries for non-idempotent operations.",
        detailedAnswer: "**Direct answer:**\n\nA load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routing. It can terminate TLS, perform health checks, support retries carefully, and route around unhealthy instances. Avoid blind retries for non-idempotent operations.\n\n**Example:**\n\nA load balancer receives /orders requests and distributes them across app-1, app-2, and app-3. It can perform health checks, TLS termination, connection management, and routing while keeping individual clients from needing to know which server handled a request.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How should a load balancer react when one backend server becomes unhealthy?", "How does a CDN reduce video latency and origin load?", "What responsibilities would you put in an API gateway?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "What does a load balancer do when several application servers han - Interview Question",
        seoDescription: "A load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routi."
      },
      create: {
        question: "What does a load balancer do when several application servers handle the same API?",
        slug: "what-does-a-load-balancer-do-when-several-application-servers-handle-the-same-api",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routing.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routing. It can terminate TLS, perform health checks, support retries carefully, and route around unhealthy instances. Avoid blind retries for non-idempotent operations.",
        detailedAnswer: "**Direct answer:**\n\nA load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routing. It can terminate TLS, perform health checks, support retries carefully, and route around unhealthy instances. Avoid blind retries for non-idempotent operations.\n\n**Example:**\n\nA load balancer receives /orders requests and distributes them across app-1, app-2, and app-3. It can perform health checks, TLS termination, connection management, and routing while keeping individual clients from needing to know which server handled a request.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How should a load balancer react when one backend server becomes unhealthy?", "How does a CDN reduce video latency and origin load?", "What responsibilities would you put in an API gateway?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "What does a load balancer do when several application servers han - Interview Question",
        seoDescription: "A load balancer distributes incoming requests across healthy backend instances using an algorithm such as round robin, least connections, or weighted routi."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 18: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-should-a-load-balancer-react-when-one-backend-server-becomes-unhealthy" },
      update: {
        question: "How should a load balancer react when one backend server becomes unhealthy?",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.",
        detailedAnswer: "**Direct answer:**\n\nFirst make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.\n\n**Example:**\n\nIf app-2 stops responding to health checks, the load balancer removes it from rotation. Existing connections may drain or fail according to policy, while new requests are sent to healthy instances until app-2 recovers.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["You have one backend server and traffic is growing. How would you scale it?", "What does a load balancer do when several application servers handle the same API?", "How does a CDN reduce video latency and origin load?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "How should a load balancer react when one backend server becomes  - Interview Question",
        seoDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce cachi."
      },
      create: {
        question: "How should a load balancer react when one backend server becomes unhealthy?",
        slug: "how-should-a-load-balancer-react-when-one-backend-server-becomes-unhealthy",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.",
        detailedAnswer: "**Direct answer:**\n\nFirst make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce caching, move slow work to queues, add observability, and partition services only when there is a clear bottleneck. Scale based on measured CPU, memory, latency, database load, and traffic rather than adding components prematurely.\n\n**Example:**\n\nIf app-2 stops responding to health checks, the load balancer removes it from rotation. Existing connections may drain or fail according to policy, while new requests are sent to healthy instances until app-2 recovers.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["You have one backend server and traffic is growing. How would you scale it?", "What does a load balancer do when several application servers handle the same API?", "How does a CDN reduce video latency and origin load?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "How should a load balancer react when one backend server becomes  - Interview Question",
        seoDescription: "First make the application stateless where practical, place it behind a load balancer, and run multiple instances. Then scale the database, introduce cachi."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 19: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "where-would-you-introduce-caching-in-a-simple-web-application-and-what-would-you-cache" },
      update: {
        question: "Where would you introduce caching in a simple web application and what would you cache?",
        categoryId: category.id,
        subcategoryId: subcategory_caching.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Cache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Cache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results. Define TTL, invalidation, cache-key design, and behavior on cache misses. Do not cache sensitive responses without considering authorization and isolation.",
        detailedAnswer: "**Direct answer:**\n\nCache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results. Define TTL, invalidation, cache-key design, and behavior on cache misses. Do not cache sensitive responses without considering authorization and isolation.\n\n**Example:**\n\nIn an online store, cache product details, configuration, and other read-heavy data that changes infrequently. Do not blindly cache a user's current account balance or another value where stale data could cause a business error.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What is a cache avalanche and how can staggered TTLs help?", "What is a cache stampede and how would you prevent it?", "Why is expand-and-contract useful when old and new application versions coexist?"],
        tags: ["system-design", "caching"],
        isPublished: true,
        seoTitle: "Where would you introduce caching in a simple web application and - Interview Question",
        seoDescription: "Cache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results. Def."
      },
      create: {
        question: "Where would you introduce caching in a simple web application and what would you cache?",
        slug: "where-would-you-introduce-caching-in-a-simple-web-application-and-what-would-you-cache",
        categoryId: category.id,
        subcategoryId: subcategory_caching.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Cache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Cache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results. Define TTL, invalidation, cache-key design, and behavior on cache misses. Do not cache sensitive responses without considering authorization and isolation.",
        detailedAnswer: "**Direct answer:**\n\nCache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results. Define TTL, invalidation, cache-key design, and behavior on cache misses. Do not cache sensitive responses without considering authorization and isolation.\n\n**Example:**\n\nIn an online store, cache product details, configuration, and other read-heavy data that changes infrequently. Do not blindly cache a user's current account balance or another value where stale data could cause a business error.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What is a cache avalanche and how can staggered TTLs help?", "What is a cache stampede and how would you prevent it?", "Why is expand-and-contract useful when old and new application versions coexist?"],
        tags: ["system-design", "caching"],
        isPublished: true,
        seoTitle: "Where would you introduce caching in a simple web application and - Interview Question",
        seoDescription: "Cache expensive, frequently read, relatively stable data: product details, public profiles, configuration, computed results, or database query results. Def."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 20: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "when-would-you-choose-sql-over-nosql-for-a-new-system" },
      update: {
        question: "When would you choose SQL over NoSQL for a new system?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Choose SQL when relational integrity, joins, transactions, and flexible querying are central.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Choose SQL when relational integrity, joins, transactions, and flexible querying are central. Choose a NoSQL model when the access pattern favors massive horizontal scale, simple key-based access, flexible schema, or specialized distribution characteristics. The decision should start from workload and consistency requirements, not from the popularity of a database brand.",
        detailedAnswer: "**Direct answer:**\n\nChoose SQL when relational integrity, joins, transactions, and flexible querying are central. Choose a NoSQL model when the access pattern favors massive horizontal scale, simple key-based access, flexible schema, or specialized distribution characteristics. The decision should start from workload and consistency requirements, not from the popularity of a database brand.\n\n**Example:**\n\nFor an order-management system with transactions, foreign keys, and reporting queries, SQL is a strong default because relationships and transactional guarantees are central. A document or key-value store may be a better fit when access patterns are simple and flexible schema or very large horizontal scale is the dominant requirement.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What problems can replication lag create for an application?", "Give an example where consistency is more important than availability and explain why.", "What consistency and durability requirements differ between a payment ledger and notifications?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "When would you choose SQL over NoSQL for a new system - Interview Question",
        seoDescription: "Choose SQL when relational integrity, joins, transactions, and flexible querying are central. Choose a NoSQL model when the access pattern favors massive h."
      },
      create: {
        question: "When would you choose SQL over NoSQL for a new system?",
        slug: "when-would-you-choose-sql-over-nosql-for-a-new-system",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Choose SQL when relational integrity, joins, transactions, and flexible querying are central.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Choose SQL when relational integrity, joins, transactions, and flexible querying are central. Choose a NoSQL model when the access pattern favors massive horizontal scale, simple key-based access, flexible schema, or specialized distribution characteristics. The decision should start from workload and consistency requirements, not from the popularity of a database brand.",
        detailedAnswer: "**Direct answer:**\n\nChoose SQL when relational integrity, joins, transactions, and flexible querying are central. Choose a NoSQL model when the access pattern favors massive horizontal scale, simple key-based access, flexible schema, or specialized distribution characteristics. The decision should start from workload and consistency requirements, not from the popularity of a database brand.\n\n**Example:**\n\nFor an order-management system with transactions, foreign keys, and reporting queries, SQL is a strong default because relationships and transactional guarantees are central. A document or key-value store may be a better fit when access patterns are simple and flexible schema or very large horizontal scale is the dominant requirement.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What problems can replication lag create for an application?", "Give an example where consistency is more important than availability and explain why.", "What consistency and durability requirements differ between a payment ledger and notifications?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "When would you choose SQL over NoSQL for a new system - Interview Question",
        seoDescription: "Choose SQL when relational integrity, joins, transactions, and flexible querying are central. Choose a NoSQL model when the access pattern favors massive h."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 21: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-replicate-a-database-and-what-problems-can-occur-when-reads-use-replicas" },
      update: {
        question: "Why replicate a database, and what problems can occur when reads use replicas?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Replication improves read capacity and availability and can provide failover options.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Replication improves read capacity and availability and can provide failover options. Read replicas can lag behind the primary, causing stale reads, read-after-write surprises, and inconsistent views across requests. Applications that require read-your-write semantics may route critical reads to the primary or use a consistency mechanism.",
        detailedAnswer: "Database replication maintains one or more copies of database data on other database servers. The primary database typically handles writes, while replicas can handle reads and provide additional availability or disaster-recovery options.\n\nCommon reasons for replication:\n\n1. Read scaling\nIf the application has far more reads than writes, read replicas can distribute query traffic.\n\n2. High availability\nA replica can potentially be promoted if the primary fails, depending on the replication and failover architecture.\n\n3. Workload isolation\nReporting or analytics queries can be routed to replicas so they do not compete directly with transactional workloads on the primary.\n\n4. Disaster recovery\nReplicas in another availability zone or region can reduce recovery time after infrastructure failures. However, replication alone is not a substitute for backups.\n\nA typical architecture is:\n\nApplication\n   |\n   +---- writes ----> Primary\n   |\n   +---- reads -----> Replica 1\n   |\n   +---- reads -----> Replica 2\n\nThe major problem with replicas is replication lag.\n\nSuppose a user creates an order:\nPOST /orders\n\nThe write is committed on the primary. Immediately afterward the client calls:\nGET /orders/123\n\nIf the read is routed to a replica that has not yet applied the write, the application may return 404 or stale data.\n\nThis is called a read-after-write consistency problem.\n\nOther issues include:\n- Stale reads after updates.\n- Deleted records temporarily appearing.\n- Old configuration values being returned.\n- Replica lag during heavy write workloads.\n- Failover complexity.\n- Different read results depending on which replica receives the request.\n\nPossible solutions:\n\n1. Read-after-write routing\nAfter a write, route related reads to the primary for a short period.\n\n2. Session stickiness\nA user session can remain associated with a sufficiently up-to-date replica, although this becomes more complicated in distributed systems.\n\n3. Lag-aware routing\nDo not route traffic to replicas whose replication lag exceeds a configured threshold.\n\n4. Causal/session consistency mechanisms\nTrack a replication position or commit marker and only read from a replica that has caught up sufficiently.\n\n5. Accept eventual consistency\nFor pages such as analytics dashboards or non-critical lists, stale data may be acceptable.\n\nAnother problem is that adding replicas does not automatically increase write capacity. All writes may still go through the primary, which can become the bottleneck.\n\nReplication also requires careful handling during failover. The system must determine which node is authoritative and avoid split-brain scenarios.\n\nInterview takeaway: replication provides read scaling, availability, workload isolation, and DR benefits, but introduces consistency and operational complexity. The application must explicitly decide where stale reads are acceptable and where reads must reflect recent writes.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Explain CAP theorem using a distributed database during a network partition.", "How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Why replicate a database, and what problems can occur when reads  - Interview Question",
        seoDescription: "Replication improves read capacity and availability and can provide failover options. Read replicas can lag behind the primary, causing stale reads, read-a."
      },
      create: {
        question: "Why replicate a database, and what problems can occur when reads use replicas?",
        slug: "why-replicate-a-database-and-what-problems-can-occur-when-reads-use-replicas",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Replication improves read capacity and availability and can provide failover options.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Replication improves read capacity and availability and can provide failover options. Read replicas can lag behind the primary, causing stale reads, read-after-write surprises, and inconsistent views across requests. Applications that require read-your-write semantics may route critical reads to the primary or use a consistency mechanism.",
        detailedAnswer: "Database replication maintains one or more copies of database data on other database servers. The primary database typically handles writes, while replicas can handle reads and provide additional availability or disaster-recovery options.\n\nCommon reasons for replication:\n\n1. Read scaling\nIf the application has far more reads than writes, read replicas can distribute query traffic.\n\n2. High availability\nA replica can potentially be promoted if the primary fails, depending on the replication and failover architecture.\n\n3. Workload isolation\nReporting or analytics queries can be routed to replicas so they do not compete directly with transactional workloads on the primary.\n\n4. Disaster recovery\nReplicas in another availability zone or region can reduce recovery time after infrastructure failures. However, replication alone is not a substitute for backups.\n\nA typical architecture is:\n\nApplication\n   |\n   +---- writes ----> Primary\n   |\n   +---- reads -----> Replica 1\n   |\n   +---- reads -----> Replica 2\n\nThe major problem with replicas is replication lag.\n\nSuppose a user creates an order:\nPOST /orders\n\nThe write is committed on the primary. Immediately afterward the client calls:\nGET /orders/123\n\nIf the read is routed to a replica that has not yet applied the write, the application may return 404 or stale data.\n\nThis is called a read-after-write consistency problem.\n\nOther issues include:\n- Stale reads after updates.\n- Deleted records temporarily appearing.\n- Old configuration values being returned.\n- Replica lag during heavy write workloads.\n- Failover complexity.\n- Different read results depending on which replica receives the request.\n\nPossible solutions:\n\n1. Read-after-write routing\nAfter a write, route related reads to the primary for a short period.\n\n2. Session stickiness\nA user session can remain associated with a sufficiently up-to-date replica, although this becomes more complicated in distributed systems.\n\n3. Lag-aware routing\nDo not route traffic to replicas whose replication lag exceeds a configured threshold.\n\n4. Causal/session consistency mechanisms\nTrack a replication position or commit marker and only read from a replica that has caught up sufficiently.\n\n5. Accept eventual consistency\nFor pages such as analytics dashboards or non-critical lists, stale data may be acceptable.\n\nAnother problem is that adding replicas does not automatically increase write capacity. All writes may still go through the primary, which can become the bottleneck.\n\nReplication also requires careful handling during failover. The system must determine which node is authoritative and avoid split-brain scenarios.\n\nInterview takeaway: replication provides read scaling, availability, workload isolation, and DR benefits, but introduces consistency and operational complexity. The application must explicitly decide where stale reads are acceptable and where reads must reflect recent writes.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Explain CAP theorem using a distributed database during a network partition.", "How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Why replicate a database, and what problems can occur when reads  - Interview Question",
        seoDescription: "Replication improves read capacity and availability and can provide failover options. Read replicas can lag behind the primary, causing stale reads, read-a."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 22: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "compare-strong-consistency-and-eventual-consistency-with-practical-examples" },
      update: {
        question: "Compare strong consistency and eventual consistency with practical examples.",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Strong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "Strong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract. Eventual consistency permits temporary divergence but converges if updates stop. A social-media like counter can often tolerate eventual consistency, while a financial authorization decision may require stronger guarantees.",
        detailedAnswer: "**Direct answer:**\n\nStrong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract. Eventual consistency permits temporary divergence but converges if updates stop. A social-media like counter can often tolerate eventual consistency, while a financial authorization decision may require stronger guarantees.\n\n**Example:**\n\nAfter a user changes a profile photo, an immediate read from the primary can show the new value, while a replica may still show the previous image URL for a short period. That illustrates why strong and eventual consistency are different application choices, not merely performance settings.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["Give an example where consistency is more important than availability and explain why.", "A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "What consistency and durability requirements differ between a payment ledger and notifications?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Compare strong consistency and eventual consistency with practica - Interview Question",
        seoDescription: "Strong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract. Eventual consistency permits temporary d."
      },
      create: {
        question: "Compare strong consistency and eventual consistency with practical examples.",
        slug: "compare-strong-consistency-and-eventual-consistency-with-practical-examples",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Strong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "Strong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract. Eventual consistency permits temporary divergence but converges if updates stop. A social-media like counter can often tolerate eventual consistency, while a financial authorization decision may require stronger guarantees.",
        detailedAnswer: "**Direct answer:**\n\nStrong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract. Eventual consistency permits temporary divergence but converges if updates stop. A social-media like counter can often tolerate eventual consistency, while a financial authorization decision may require stronger guarantees.\n\n**Example:**\n\nAfter a user changes a profile photo, an immediate read from the primary can show the new value, while a replica may still show the previous image URL for a short period. That illustrates why strong and eventual consistency are different application choices, not merely performance settings.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["Give an example where consistency is more important than availability and explain why.", "A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "What consistency and durability requirements differ between a payment ledger and notifications?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "Compare strong consistency and eventual consistency with practica - Interview Question",
        seoDescription: "Strong consistency makes a read reflect the latest committed state according to the system\u2019s consistency contract. Eventual consistency permits temporary d."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 23: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-twitter-x-style-newsfeed-for-users-following-thousands-of-accounts" },
      update: {
        question: "Design a Twitter/X-style newsfeed for users following thousands of accounts.",
        categoryId: category.id,
        subcategoryId: subcategory_social_feed_design.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage. A common baseline is fan-out-on-write for ordinary users and a hybrid strategy for high-follower accounts. Store feed entries by user and paginate with a cursor rather than repeatedly scanning all followed accounts.",
        detailedAnswer: "**Direct answer:**\n\nUse a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage. A common baseline is fan-out-on-write for ordinary users and a hybrid strategy for high-follower accounts. Store feed entries by user and paginate with a cursor rather than repeatedly scanning all followed accounts.\n\n**Example:**\n\nFor a feed with 50 million users, store each user's following relationships separately from feed entries. A home-feed request can combine precomputed recent posts with a smaller amount of on-demand work, rather than scanning every followed account at request time.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you rank posts instead of simply showing them chronologically?", "How would you handle a celebrity with tens of millions of followers?", "Compare fan-out-on-write and fan-out-on-read for a social-media feed."],
        tags: ["system-design", "social-feed-design"],
        isPublished: true,
        seoTitle: "Design a Twitter/X-style newsfeed for users following thousands o - Interview Question",
        seoDescription: "Use a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage. A common baseline is fan-out-on-write for ordinary u."
      },
      create: {
        question: "Design a Twitter/X-style newsfeed for users following thousands of accounts.",
        slug: "design-a-twitter-x-style-newsfeed-for-users-following-thousands-of-accounts",
        categoryId: category.id,
        subcategoryId: subcategory_social_feed_design.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage. A common baseline is fan-out-on-write for ordinary users and a hybrid strategy for high-follower accounts. Store feed entries by user and paginate with a cursor rather than repeatedly scanning all followed accounts.",
        detailedAnswer: "**Direct answer:**\n\nUse a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage. A common baseline is fan-out-on-write for ordinary users and a hybrid strategy for high-follower accounts. Store feed entries by user and paginate with a cursor rather than repeatedly scanning all followed accounts.\n\n**Example:**\n\nFor a feed with 50 million users, store each user's following relationships separately from feed entries. A home-feed request can combine precomputed recent posts with a smaller amount of on-demand work, rather than scanning every followed account at request time.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you rank posts instead of simply showing them chronologically?", "How would you handle a celebrity with tens of millions of followers?", "Compare fan-out-on-write and fan-out-on-read for a social-media feed."],
        tags: ["system-design", "social-feed-design"],
        isPublished: true,
        seoTitle: "Design a Twitter/X-style newsfeed for users following thousands o - Interview Question",
        seoDescription: "Use a post store, follow graph, feed-generation pipeline, ranking service, cache, and durable storage. A common baseline is fan-out-on-write for ordinary u."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 24: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "compare-fan-out-on-write-and-fan-out-on-read-for-a-social-media-feed" },
      update: {
        question: "Compare fan-out-on-write and fan-out-on-read for a social-media feed.",
        categoryId: category.id,
        subcategoryId: subcategory_social_feed_design.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Fan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "Fan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers. Fan-out-on-read computes the feed at request time, reducing write amplification but increasing read latency and query complexity. A hybrid design uses write fan-out for normal accounts and read-time merging for celebrities.",
        detailedAnswer: "**Direct answer:**\n\nFan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers. Fan-out-on-read computes the feed at request time, reducing write amplification but increasing read latency and query complexity. A hybrid design uses write fan-out for normal accounts and read-time merging for celebrities.\n\n**Example:**\n\nFan-out-on-write pushes a new post into followers' feed storage when the post is created, making reads fast but creating heavy write amplification. Fan-out-on-read stores the post once and assembles feeds when users open the app, reducing write work but making reads more expensive.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["Design a Twitter/X-style newsfeed for users following thousands of accounts.", "How would you rank posts instead of simply showing them chronologically?", "How would you handle a celebrity with tens of millions of followers?"],
        tags: ["system-design", "social-feed-design"],
        isPublished: true,
        seoTitle: "Compare fan-out-on-write and fan-out-on-read for a social-media f - Interview Question",
        seoDescription: "Fan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers. Fan-out-on-rea."
      },
      create: {
        question: "Compare fan-out-on-write and fan-out-on-read for a social-media feed.",
        slug: "compare-fan-out-on-write-and-fan-out-on-read-for-a-social-media-feed",
        categoryId: category.id,
        subcategoryId: subcategory_social_feed_design.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Fan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "Fan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers. Fan-out-on-read computes the feed at request time, reducing write amplification but increasing read latency and query complexity. A hybrid design uses write fan-out for normal accounts and read-time merging for celebrities.",
        detailedAnswer: "**Direct answer:**\n\nFan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers. Fan-out-on-read computes the feed at request time, reducing write amplification but increasing read latency and query complexity. A hybrid design uses write fan-out for normal accounts and read-time merging for celebrities.\n\n**Example:**\n\nFan-out-on-write pushes a new post into followers' feed storage when the post is created, making reads fast but creating heavy write amplification. Fan-out-on-read stores the post once and assembles feeds when users open the app, reducing write work but making reads more expensive.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["Design a Twitter/X-style newsfeed for users following thousands of accounts.", "How would you rank posts instead of simply showing them chronologically?", "How would you handle a celebrity with tens of millions of followers?"],
        tags: ["system-design", "social-feed-design"],
        isPublished: true,
        seoTitle: "Compare fan-out-on-write and fan-out-on-read for a social-media f - Interview Question",
        seoDescription: "Fan-out-on-write creates feed entries when a post is published, making reads fast but making writes expensive for users with many followers. Fan-out-on-rea."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 25: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-handle-a-celebrity-with-tens-of-millions-of-followers" },
      update: {
        question: "How would you handle a celebrity with tens of millions of followers?",
        categoryId: category.id,
        subcategoryId: subcategory_social_feed_design.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Do not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Do not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds. Keep the celebrity\u2019s posts in a separate source and merge them into follower feeds at read time or through an asynchronous prioritized pipeline. Cache popular content and apply backpressure to fan-out workers.",
        detailedAnswer: "**Direct answer:**\n\nDo not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds. Keep the celebrity\u2019s posts in a separate source and merge them into follower feeds at read time or through an asynchronous prioritized pipeline. Cache popular content and apply backpressure to fan-out workers.\n\n**Example:**\n\nA celebrity posts a photo to 30 million followers. Instead of writing 30 million feed records synchronously, treat the celebrity as a hot source: keep the post in shared storage/cache and merge it into followers' feeds when they read or through controlled asynchronous fan-out.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Compare fan-out-on-write and fan-out-on-read for a social-media feed.", "Design a Twitter/X-style newsfeed for users following thousands of accounts.", "How would you rank posts instead of simply showing them chronologically?"],
        tags: ["system-design", "social-feed-design"],
        isPublished: true,
        seoTitle: "How would you handle a celebrity with tens of millions of followe - Interview Question",
        seoDescription: "Do not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds. Keep the celebrity\u2019s posts in a separate source and merge them into."
      },
      create: {
        question: "How would you handle a celebrity with tens of millions of followers?",
        slug: "how-would-you-handle-a-celebrity-with-tens-of-millions-of-followers",
        categoryId: category.id,
        subcategoryId: subcategory_social_feed_design.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Do not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Do not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds. Keep the celebrity\u2019s posts in a separate source and merge them into follower feeds at read time or through an asynchronous prioritized pipeline. Cache popular content and apply backpressure to fan-out workers.",
        detailedAnswer: "**Direct answer:**\n\nDo not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds. Keep the celebrity\u2019s posts in a separate source and merge them into follower feeds at read time or through an asynchronous prioritized pipeline. Cache popular content and apply backpressure to fan-out workers.\n\n**Example:**\n\nA celebrity posts a photo to 30 million followers. Instead of writing 30 million feed records synchronously, treat the celebrity as a hot source: keep the post in shared storage/cache and merge it into followers' feeds when they read or through controlled asynchronous fan-out.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Compare fan-out-on-write and fan-out-on-read for a social-media feed.", "Design a Twitter/X-style newsfeed for users following thousands of accounts.", "How would you rank posts instead of simply showing them chronologically?"],
        tags: ["system-design", "social-feed-design"],
        isPublished: true,
        seoTitle: "How would you handle a celebrity with tens of millions of followe - Interview Question",
        seoDescription: "Do not synchronously copy one celebrity\u2019s post into tens of millions of follower feeds. Keep the celebrity\u2019s posts in a separate source and merge them into."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 26: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-rank-posts-instead-of-simply-showing-them-chronologically" },
      update: {
        question: "How would you rank posts instead of simply showing them chronologically?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Separate candidate generation from ranking.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Separate candidate generation from ranking. Candidate sources can include recent posts, followed accounts, and recommended content; a ranking stage scores candidates using freshness, relevance, engagement, relationship signals, and policy constraints. Paginate with a stable cursor and make ranking deterministic enough to avoid excessive reshuffling between requests.",
        detailedAnswer: "**Direct answer:**\n\nSeparate candidate generation from ranking. Candidate sources can include recent posts, followed accounts, and recommended content; a ranking stage scores candidates using freshness, relevance, engagement, relationship signals, and policy constraints. Paginate with a stable cursor and make ranking deterministic enough to avoid excessive reshuffling between requests.\n\n**Example:**\n\nA feed can rank posts using signals such as recency, relationship strength, predicted engagement, and content quality. For example, a relevant post from a close colleague may appear above an older post with more total likes.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you handle a celebrity with tens of millions of followers?", "Compare fan-out-on-write and fan-out-on-read for a social-media feed.", "Design a Twitter/X-style newsfeed for users following thousands of accounts."],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you rank posts instead of simply showing them chronolog - Interview Question",
        seoDescription: "Separate candidate generation from ranking. Candidate sources can include recent posts, followed accounts, and recommended content; a ranking stage scores ."
      },
      create: {
        question: "How would you rank posts instead of simply showing them chronologically?",
        slug: "how-would-you-rank-posts-instead-of-simply-showing-them-chronologically",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Separate candidate generation from ranking.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Separate candidate generation from ranking. Candidate sources can include recent posts, followed accounts, and recommended content; a ranking stage scores candidates using freshness, relevance, engagement, relationship signals, and policy constraints. Paginate with a stable cursor and make ranking deterministic enough to avoid excessive reshuffling between requests.",
        detailedAnswer: "**Direct answer:**\n\nSeparate candidate generation from ranking. Candidate sources can include recent posts, followed accounts, and recommended content; a ranking stage scores candidates using freshness, relevance, engagement, relationship signals, and policy constraints. Paginate with a stable cursor and make ranking deterministic enough to avoid excessive reshuffling between requests.\n\n**Example:**\n\nA feed can rank posts using signals such as recency, relationship strength, predicted engagement, and content quality. For example, a relevant post from a close colleague may appear above an older post with more total likes.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you handle a celebrity with tens of millions of followers?", "Compare fan-out-on-write and fan-out-on-read for a social-media feed.", "Design a Twitter/X-style newsfeed for users following thousands of accounts."],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you rank posts instead of simply showing them chronolog - Interview Question",
        seoDescription: "Separate candidate generation from ranking. Candidate sources can include recent posts, followed accounts, and recommended content; a ranking stage scores ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 27: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-the-backend-for-a-ride-hailing-service-that-finds-a-nearby-available-driver" },
      update: {
        question: "Design the backend for a ride-hailing service that finds a nearby available driver.",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Model riders, drivers, trips, locations, and trip state separately.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Model riders, drivers, trips, locations, and trip state separately. A location service maintains recent driver positions; a matching service finds nearby eligible drivers; a trip service owns the state machine; and asynchronous events handle notifications and analytics. Use geographic partitioning and a consistent source of truth for assignment.",
        detailedAnswer: "**Direct answer:**\n\nModel riders, drivers, trips, locations, and trip state separately. A location service maintains recent driver positions; a matching service finds nearby eligible drivers; a trip service owns the state machine; and asynchronous events handle notifications and analytics. Use geographic partitioning and a consistent source of truth for assignment.\n\n**Example:**\n\nWhen a rider requests a car, the service checks the rider's location, finds nearby available drivers, ranks candidates by distance and other constraints, reserves one driver, and creates the trip. Location updates and trip state changes are handled separately from the initial matching request.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you find nearby drivers efficiently without scanning every driver?", "Two riders request the same driver simultaneously. How do you prevent double assignment?", "How would you update driver locations in near real time?"],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "Design the backend for a ride-hailing service that finds a nearby - Interview Question",
        seoDescription: "Model riders, drivers, trips, locations, and trip state separately. A location service maintains recent driver positions; a matching service finds nearby e."
      },
      create: {
        question: "Design the backend for a ride-hailing service that finds a nearby available driver.",
        slug: "design-the-backend-for-a-ride-hailing-service-that-finds-a-nearby-available-driver",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Model riders, drivers, trips, locations, and trip state separately.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Model riders, drivers, trips, locations, and trip state separately. A location service maintains recent driver positions; a matching service finds nearby eligible drivers; a trip service owns the state machine; and asynchronous events handle notifications and analytics. Use geographic partitioning and a consistent source of truth for assignment.",
        detailedAnswer: "**Direct answer:**\n\nModel riders, drivers, trips, locations, and trip state separately. A location service maintains recent driver positions; a matching service finds nearby eligible drivers; a trip service owns the state machine; and asynchronous events handle notifications and analytics. Use geographic partitioning and a consistent source of truth for assignment.\n\n**Example:**\n\nWhen a rider requests a car, the service checks the rider's location, finds nearby available drivers, ranks candidates by distance and other constraints, reserves one driver, and creates the trip. Location updates and trip state changes are handled separately from the initial matching request.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you find nearby drivers efficiently without scanning every driver?", "Two riders request the same driver simultaneously. How do you prevent double assignment?", "How would you update driver locations in near real time?"],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "Design the backend for a ride-hailing service that finds a nearby - Interview Question",
        seoDescription: "Model riders, drivers, trips, locations, and trip state separately. A location service maintains recent driver positions; a matching service finds nearby e."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 28: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-find-nearby-drivers-efficiently-without-scanning-every-driver" },
      update: {
        question: "How would you find nearby drivers efficiently without scanning every driver?",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Index driver locations using geohash cells, an R-tree, S2 cells, or another spatial index.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Index driver locations using geohash cells, an R-tree, S2 cells, or another spatial index. Search the rider\u2019s cell and neighboring cells, then filter candidates by exact distance, availability, vehicle type, and other constraints. This avoids scanning every driver in the system.",
        detailedAnswer: "**Direct answer:**\n\nIndex driver locations using geohash cells, an R-tree, S2 cells, or another spatial index. Search the rider\u2019s cell and neighboring cells, then filter candidates by exact distance, availability, vehicle type, and other constraints. This avoids scanning every driver in the system.\n\n**Example:**\n\nStore active driver locations in a geospatial index such as geohash-based cells or another spatial structure. A search for drivers within 2 km examines nearby cells rather than scanning every driver in the city.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design the backend for a ride-hailing service that finds a nearby available driver.", "Two riders request the same driver simultaneously. How do you prevent double assignment?", "How would you update driver locations in near real time?"],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "How would you find nearby drivers efficiently without scanning ev - Interview Question",
        seoDescription: "Index driver locations using geohash cells, an R-tree, S2 cells, or another spatial index. Search the rider\u2019s cell and neighboring cells, then filter candi."
      },
      create: {
        question: "How would you find nearby drivers efficiently without scanning every driver?",
        slug: "how-would-you-find-nearby-drivers-efficiently-without-scanning-every-driver",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Index driver locations using geohash cells, an R-tree, S2 cells, or another spatial index.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Index driver locations using geohash cells, an R-tree, S2 cells, or another spatial index. Search the rider\u2019s cell and neighboring cells, then filter candidates by exact distance, availability, vehicle type, and other constraints. This avoids scanning every driver in the system.",
        detailedAnswer: "**Direct answer:**\n\nIndex driver locations using geohash cells, an R-tree, S2 cells, or another spatial index. Search the rider\u2019s cell and neighboring cells, then filter candidates by exact distance, availability, vehicle type, and other constraints. This avoids scanning every driver in the system.\n\n**Example:**\n\nStore active driver locations in a geospatial index such as geohash-based cells or another spatial structure. A search for drivers within 2 km examines nearby cells rather than scanning every driver in the city.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design the backend for a ride-hailing service that finds a nearby available driver.", "Two riders request the same driver simultaneously. How do you prevent double assignment?", "How would you update driver locations in near real time?"],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "How would you find nearby drivers efficiently without scanning ev - Interview Question",
        seoDescription: "Index driver locations using geohash cells, an R-tree, S2 cells, or another spatial index. Search the rider\u2019s cell and neighboring cells, then filter candi."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 29: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-update-driver-locations-in-near-real-time" },
      update: {
        question: "How would you update driver locations in near real time?",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Drivers send periodic location updates over a persistent or efficient connection.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Drivers send periodic location updates over a persistent or efficient connection. A location service stores recent positions with short-lived state and publishes changes to matching consumers. Throttle updates based on movement and accuracy requirements, and expire stale driver locations so disconnected drivers are not offered rides.",
        detailedAnswer: "**Direct answer:**\n\nDrivers send periodic location updates over a persistent or efficient connection. A location service stores recent positions with short-lived state and publishes changes to matching consumers. Throttle updates based on movement and accuracy requirements, and expire stale driver locations so disconnected drivers are not offered rides.\n\n**Example:**\n\nA driver app sends location updates every few seconds while a trip is active. The backend writes the latest position to a fast location store, expires stale drivers, and publishes updates needed by matching or tracking services.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you find nearby drivers efficiently without scanning every driver?", "Design the backend for a ride-hailing service that finds a nearby available driver.", "Two riders request the same driver simultaneously. How do you prevent double assignment?"],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "How would you update driver locations in near real time - Interview Question",
        seoDescription: "Drivers send periodic location updates over a persistent or efficient connection. A location service stores recent positions with short-lived state and pub."
      },
      create: {
        question: "How would you update driver locations in near real time?",
        slug: "how-would-you-update-driver-locations-in-near-real-time",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Drivers send periodic location updates over a persistent or efficient connection.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Drivers send periodic location updates over a persistent or efficient connection. A location service stores recent positions with short-lived state and publishes changes to matching consumers. Throttle updates based on movement and accuracy requirements, and expire stale driver locations so disconnected drivers are not offered rides.",
        detailedAnswer: "**Direct answer:**\n\nDrivers send periodic location updates over a persistent or efficient connection. A location service stores recent positions with short-lived state and publishes changes to matching consumers. Throttle updates based on movement and accuracy requirements, and expire stale driver locations so disconnected drivers are not offered rides.\n\n**Example:**\n\nA driver app sends location updates every few seconds while a trip is active. The backend writes the latest position to a fast location store, expires stale drivers, and publishes updates needed by matching or tracking services.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you find nearby drivers efficiently without scanning every driver?", "Design the backend for a ride-hailing service that finds a nearby available driver.", "Two riders request the same driver simultaneously. How do you prevent double assignment?"],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "How would you update driver locations in near real time - Interview Question",
        seoDescription: "Drivers send periodic location updates over a persistent or efficient connection. A location service stores recent positions with short-lived state and pub."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 30: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "two-riders-request-the-same-driver-simultaneously-how-do-you-prevent-double-assignment" },
      update: {
        question: "Two riders request the same driver simultaneously. How do you prevent double assignment?",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Make driver assignment an atomic state transition.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Make driver assignment an atomic state transition. For example, change a driver from AVAILABLE to RESERVED only if the current state is still AVAILABLE, using a transactional conditional update or an equivalent coordination mechanism. The winning request gets the driver; competing requests retry matching.",
        detailedAnswer: "**Direct answer:**\n\nMake driver assignment an atomic state transition. For example, change a driver from AVAILABLE to RESERVED only if the current state is still AVAILABLE, using a transactional conditional update or an equivalent coordination mechanism. The winning request gets the driver; competing requests retry matching.\n\n**Example:**\n\nTwo riders select driver D17 at nearly the same time. Both requests attempt an atomic reservation on D17; only one succeeds, and the other request receives a retry or alternative-driver response instead of creating two active trips.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you update driver locations in near real time?", "How would you find nearby drivers efficiently without scanning every driver?", "Design the backend for a ride-hailing service that finds a nearby available driver."],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "Two riders request the same driver simultaneously. How do you pre - Interview Question",
        seoDescription: "Make driver assignment an atomic state transition. For example, change a driver from AVAILABLE to RESERVED only if the current state is still AVAILABLE, us."
      },
      create: {
        question: "Two riders request the same driver simultaneously. How do you prevent double assignment?",
        slug: "two-riders-request-the-same-driver-simultaneously-how-do-you-prevent-double-assignment",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Make driver assignment an atomic state transition.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Make driver assignment an atomic state transition. For example, change a driver from AVAILABLE to RESERVED only if the current state is still AVAILABLE, using a transactional conditional update or an equivalent coordination mechanism. The winning request gets the driver; competing requests retry matching.",
        detailedAnswer: "**Direct answer:**\n\nMake driver assignment an atomic state transition. For example, change a driver from AVAILABLE to RESERVED only if the current state is still AVAILABLE, using a transactional conditional update or an equivalent coordination mechanism. The winning request gets the driver; competing requests retry matching.\n\n**Example:**\n\nTwo riders select driver D17 at nearly the same time. Both requests attempt an atomic reservation on D17; only one succeeds, and the other request receives a retry or alternative-driver response instead of creating two active trips.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you update driver locations in near real time?", "How would you find nearby drivers efficiently without scanning every driver?", "Design the backend for a ride-hailing service that finds a nearby available driver."],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "Two riders request the same driver simultaneously. How do you pre - Interview Question",
        seoDescription: "Make driver assignment an atomic state transition. For example, change a driver from AVAILABLE to RESERVED only if the current state is still AVAILABLE, us."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 31: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-partition-a-ride-sharing-system-geographically-at-large-scale" },
      update: {
        question: "How would you partition a ride-sharing system geographically at large scale?",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Partition by geography so most matching traffic remains local.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Partition by geography so most matching traffic remains local. Each region can own a set of cells and maintain local driver state, with controlled handoff for boundary areas. Cross-region coordination should be minimized because it adds latency and failure coupling.",
        detailedAnswer: "**Direct answer:**\n\nPartition by geography so most matching traffic remains local. Each region can own a set of cells and maintain local driver state, with controlled handoff for boundary areas. Cross-region coordination should be minimized because it adds latency and failure coupling.\n\n**Example:**\n\nDivide a ride-sharing deployment into geographic partitions such as city or region. Mumbai traffic is handled primarily by the Mumbai partition, while inter-region services share only the data that genuinely needs global visibility.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you scale a very large group chat?", "You have one backend server and traffic is growing. How would you scale it?", "Explain CAP theorem using a distributed database during a network partition."],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "How would you partition a ride-sharing system geographically at l - Interview Question",
        seoDescription: "Partition by geography so most matching traffic remains local. Each region can own a set of cells and maintain local driver state, with controlled handoff ."
      },
      create: {
        question: "How would you partition a ride-sharing system geographically at large scale?",
        slug: "how-would-you-partition-a-ride-sharing-system-geographically-at-large-scale",
        categoryId: category.id,
        subcategoryId: subcategory_location_based_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Partition by geography so most matching traffic remains local.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Partition by geography so most matching traffic remains local. Each region can own a set of cells and maintain local driver state, with controlled handoff for boundary areas. Cross-region coordination should be minimized because it adds latency and failure coupling.",
        detailedAnswer: "**Direct answer:**\n\nPartition by geography so most matching traffic remains local. Each region can own a set of cells and maintain local driver state, with controlled handoff for boundary areas. Cross-region coordination should be minimized because it adds latency and failure coupling.\n\n**Example:**\n\nDivide a ride-sharing deployment into geographic partitions such as city or region. Mumbai traffic is handled primarily by the Mumbai partition, while inter-region services share only the data that genuinely needs global visibility.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you scale a very large group chat?", "You have one backend server and traffic is growing. How would you scale it?", "Explain CAP theorem using a distributed database during a network partition."],
        tags: ["system-design", "location-based-systems"],
        isPublished: true,
        seoTitle: "How would you partition a ride-sharing system geographically at l - Interview Question",
        seoDescription: "Partition by geography so most matching traffic remains local. Each region can own a set of cells and maintain local driver state, with controlled handoff ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 32: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-one-to-one-chat-how-does-a-message-travel-from-sender-to-recipient" },
      update: {
        question: "Design one-to-one chat. How does a message travel from sender to recipient?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous delivery workers.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous delivery workers. The sender submits a message, the service assigns an ID/sequence, persists it, and routes it to the recipient\u2019s active connection or offline queue.",
        detailedAnswer: "**Direct answer:**\n\nUse a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous delivery workers. The sender submits a message, the service assigns an ID/sequence, persists it, and routes it to the recipient\u2019s active connection or offline queue.\n\n**Example:**\n\nAlice sends 'Can you review this?' to Bob. The chat service authenticates Alice, assigns a message ID, persists the message, publishes it to the delivery layer, and pushes it over Bob's active connection. The message remains durable even if Bob disconnects immediately afterward.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why introduce a message queue between services instead of synchronous calls?", "How would you handle message ordering, retries, and delivery status?", "How do you deliver messages when the recipient is offline?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "Design one-to-one chat. How does a message travel from sender to  - Interview Question",
        seoDescription: "Use a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous deli."
      },
      create: {
        question: "Design one-to-one chat. How does a message travel from sender to recipient?",
        slug: "design-one-to-one-chat-how-does-a-message-travel-from-sender-to-recipient",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous delivery workers.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous delivery workers. The sender submits a message, the service assigns an ID/sequence, persists it, and routes it to the recipient\u2019s active connection or offline queue.",
        detailedAnswer: "**Direct answer:**\n\nUse a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous delivery workers. The sender submits a message, the service assigns an ID/sequence, persists it, and routes it to the recipient\u2019s active connection or offline queue.\n\n**Example:**\n\nAlice sends 'Can you review this?' to Bob. The chat service authenticates Alice, assigns a message ID, persists the message, publishes it to the delivery layer, and pushes it over Bob's active connection. The message remains durable even if Bob disconnects immediately afterward.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why introduce a message queue between services instead of synchronous calls?", "How would you handle message ordering, retries, and delivery status?", "How do you deliver messages when the recipient is offline?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "Design one-to-one chat. How does a message travel from sender to  - Interview Question",
        seoDescription: "Use a connection gateway for persistent client connections, a message service for validation and sequencing, durable message storage, and asynchronous deli."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 33: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-use-websockets-or-another-persistent-connection-for-chat" },
      update: {
        question: "Why use WebSockets or another persistent connection for chat?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately. WebSockets are a common choice, although other protocols can be appropriate. At scale, connection servers should be horizontally scalable and decoupled from durable message storage.",
        detailedAnswer: "**Direct answer:**\n\nA persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately. WebSockets are a common choice, although other protocols can be appropriate. At scale, connection servers should be horizontally scalable and decoupled from durable message storage.\n\n**Example:**\n\nA browser-based support chat needs low-latency server-to-client delivery, so a WebSocket can keep one connection open instead of polling every few seconds. The server can push a new message as soon as it is available.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Design one-to-one chat. How does a message travel from sender to recipient?", "How would you scale a very large group chat?", "What is the difference between a task queue and an event stream such as Kafka?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "Why use WebSockets or another persistent connection for chat - Interview Question",
        seoDescription: "A persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately. WebSockets are a common choice, alth."
      },
      create: {
        question: "Why use WebSockets or another persistent connection for chat?",
        slug: "why-use-websockets-or-another-persistent-connection-for-chat",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately. WebSockets are a common choice, although other protocols can be appropriate. At scale, connection servers should be horizontally scalable and decoupled from durable message storage.",
        detailedAnswer: "**Direct answer:**\n\nA persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately. WebSockets are a common choice, although other protocols can be appropriate. At scale, connection servers should be horizontally scalable and decoupled from durable message storage.\n\n**Example:**\n\nA browser-based support chat needs low-latency server-to-client delivery, so a WebSocket can keep one connection open instead of polling every few seconds. The server can push a new message as soon as it is available.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Design one-to-one chat. How does a message travel from sender to recipient?", "How would you scale a very large group chat?", "What is the difference between a task queue and an event stream such as Kafka?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "Why use WebSockets or another persistent connection for chat - Interview Question",
        seoDescription: "A persistent connection avoids repeatedly opening HTTP connections and allows the server to push messages immediately. WebSockets are a common choice, alth."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 34: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-do-you-deliver-messages-when-the-recipient-is-offline" },
      update: {
        question: "How do you deliver messages when the recipient is offline?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Persist the message before acknowledging durable acceptance.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Persist the message before acknowledging durable acceptance. If the recipient is offline, retain an undelivered state and deliver when the client reconnects. Use message IDs and acknowledgments so reconnects do not create duplicates.",
        detailedAnswer: "**Direct answer:**\n\nPersist the message before acknowledging durable acceptance. If the recipient is offline, retain an undelivered state and deliver when the client reconnects. Use message IDs and acknowledgments so reconnects do not create duplicates.\n\n**Example:**\n\nBob's phone is offline when Alice sends a message. The service stores the message durably, marks Bob as offline, and delivers it when his client reconnects; a push-notification service can separately alert him that unread messages exist.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design one-to-one chat. How does a message travel from sender to recipient?", "Why use WebSockets or another persistent connection for chat?", "What is the difference between a task queue and an event stream such as Kafka?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How do you deliver messages when the recipient is offline - Interview Question",
        seoDescription: "Persist the message before acknowledging durable acceptance. If the recipient is offline, retain an undelivered state and deliver when the client reconnect."
      },
      create: {
        question: "How do you deliver messages when the recipient is offline?",
        slug: "how-do-you-deliver-messages-when-the-recipient-is-offline",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Persist the message before acknowledging durable acceptance.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Persist the message before acknowledging durable acceptance. If the recipient is offline, retain an undelivered state and deliver when the client reconnects. Use message IDs and acknowledgments so reconnects do not create duplicates.",
        detailedAnswer: "**Direct answer:**\n\nPersist the message before acknowledging durable acceptance. If the recipient is offline, retain an undelivered state and deliver when the client reconnects. Use message IDs and acknowledgments so reconnects do not create duplicates.\n\n**Example:**\n\nBob's phone is offline when Alice sends a message. The service stores the message durably, marks Bob as offline, and delivers it when his client reconnects; a push-notification service can separately alert him that unread messages exist.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design one-to-one chat. How does a message travel from sender to recipient?", "Why use WebSockets or another persistent connection for chat?", "What is the difference between a task queue and an event stream such as Kafka?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How do you deliver messages when the recipient is offline - Interview Question",
        seoDescription: "Persist the message before acknowledging durable acceptance. If the recipient is offline, retain an undelivered state and deliver when the client reconnect."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 35: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-handle-message-ordering-retries-and-delivery-status" },
      update: {
        question: "How would you handle message ordering, retries, and delivery status?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Assign a logical sequence or message ID per conversation and make consumers idempotent.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Assign a logical sequence or message ID per conversation and make consumers idempotent. Retries can produce duplicates, so the recipient should deduplicate by message ID. Define whether ordering is per conversation, per sender, or globally; global ordering is much more expensive.",
        detailedAnswer: "**Direct answer:**\n\nAssign a logical sequence or message ID per conversation and make consumers idempotent. Retries can produce duplicates, so the recipient should deduplicate by message ID. Define whether ordering is per conversation, per sender, or globally; global ordering is much more expensive.\n\n**Example:**\n\nEach message gets a monotonically increasing sequence number within a conversation or partition. If a client receives 42 before 41, it can buffer 42 briefly and request the missing range; duplicate delivery is handled using the message ID.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why introduce a message queue between services instead of synchronous calls?", "Design one-to-one chat. How does a message travel from sender to recipient?", "How do you deliver messages when the recipient is offline?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How would you handle message ordering, retries, and delivery stat - Interview Question",
        seoDescription: "Assign a logical sequence or message ID per conversation and make consumers idempotent. Retries can produce duplicates, so the recipient should deduplicate."
      },
      create: {
        question: "How would you handle message ordering, retries, and delivery status?",
        slug: "how-would-you-handle-message-ordering-retries-and-delivery-status",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Assign a logical sequence or message ID per conversation and make consumers idempotent.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Assign a logical sequence or message ID per conversation and make consumers idempotent. Retries can produce duplicates, so the recipient should deduplicate by message ID. Define whether ordering is per conversation, per sender, or globally; global ordering is much more expensive.",
        detailedAnswer: "**Direct answer:**\n\nAssign a logical sequence or message ID per conversation and make consumers idempotent. Retries can produce duplicates, so the recipient should deduplicate by message ID. Define whether ordering is per conversation, per sender, or globally; global ordering is much more expensive.\n\n**Example:**\n\nEach message gets a monotonically increasing sequence number within a conversation or partition. If a client receives 42 before 41, it can buffer 42 briefly and request the missing range; duplicate delivery is handled using the message ID.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why introduce a message queue between services instead of synchronous calls?", "Design one-to-one chat. How does a message travel from sender to recipient?", "How do you deliver messages when the recipient is offline?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How would you handle message ordering, retries, and delivery stat - Interview Question",
        seoDescription: "Assign a logical sequence or message ID per conversation and make consumers idempotent. Retries can produce duplicates, so the recipient should deduplicate."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 36: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-scale-a-very-large-group-chat" },
      update: {
        question: "How would you scale a very large group chat?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Avoid creating an independent synchronous delivery operation for every member.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Avoid creating an independent synchronous delivery operation for every member. Persist once, publish through a scalable fan-out mechanism, and deliver according to member presence and device state. For very large groups, separate message persistence from notification fan-out and use batching/backpressure.",
        detailedAnswer: "**Direct answer:**\n\nAvoid creating an independent synchronous delivery operation for every member. Persist once, publish through a scalable fan-out mechanism, and deliver according to member presence and device state. For very large groups, separate message persistence from notification fan-out and use batching/backpressure.\n\n**Example:**\n\nFor a 100,000-member group, do not synchronously send one database write per recipient for every message. Persist the message once, partition delivery work, maintain per-user cursors or offsets, and use fan-out strategies appropriate to active versus inactive members.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you partition a ride-sharing system geographically at large scale?", "Why use WebSockets or another persistent connection for chat?", "You have one backend server and traffic is growing. How would you scale it?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How would you scale a very large group chat - Interview Question",
        seoDescription: "Avoid creating an independent synchronous delivery operation for every member. Persist once, publish through a scalable fan-out mechanism, and deliver acco."
      },
      create: {
        question: "How would you scale a very large group chat?",
        slug: "how-would-you-scale-a-very-large-group-chat",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Avoid creating an independent synchronous delivery operation for every member.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Avoid creating an independent synchronous delivery operation for every member. Persist once, publish through a scalable fan-out mechanism, and deliver according to member presence and device state. For very large groups, separate message persistence from notification fan-out and use batching/backpressure.",
        detailedAnswer: "**Direct answer:**\n\nAvoid creating an independent synchronous delivery operation for every member. Persist once, publish through a scalable fan-out mechanism, and deliver according to member presence and device state. For very large groups, separate message persistence from notification fan-out and use batching/backpressure.\n\n**Example:**\n\nFor a 100,000-member group, do not synchronously send one database write per recipient for every message. Persist the message once, partition delivery work, maintain per-user cursors or offsets, and use fan-out strategies appropriate to active versus inactive members.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you partition a ride-sharing system geographically at large scale?", "Why use WebSockets or another persistent connection for chat?", "You have one backend server and traffic is growing. How would you scale it?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How would you scale a very large group chat - Interview Question",
        seoDescription: "Avoid creating an independent synchronous delivery operation for every member. Persist once, publish through a scalable fan-out mechanism, and deliver acco."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 37: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-introduce-a-message-queue-between-services-instead-of-synchronous-calls" },
      update: {
        question: "Why introduce a message queue between services instead of synchronous calls?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior. It also introduces eventual processing, duplicate-delivery considerations, and operational complexity, so it should be used where asynchronous semantics are acceptable.",
        detailedAnswer: "**Direct answer:**\n\nA queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior. It also introduces eventual processing, duplicate-delivery considerations, and operational complexity, so it should be used where asynchronous semantics are acceptable.\n\n**Example:**\n\nAn order service should not wait synchronously for email, analytics, and search indexing before returning success. It can publish an OrderCreated event to a durable queue so those consumers process their work independently and can retry failures.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How would you handle message ordering, retries, and delivery status?", "What is the difference between a task queue and an event stream such as Kafka?", "Design one-to-one chat. How does a message travel from sender to recipient?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "Why introduce a message queue between services instead of synchro - Interview Question",
        seoDescription: "A queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior. It also intro."
      },
      create: {
        question: "Why introduce a message queue between services instead of synchronous calls?",
        slug: "why-introduce-a-message-queue-between-services-instead-of-synchronous-calls",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior. It also introduces eventual processing, duplicate-delivery considerations, and operational complexity, so it should be used where asynchronous semantics are acceptable.",
        detailedAnswer: "**Direct answer:**\n\nA queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior. It also introduces eventual processing, duplicate-delivery considerations, and operational complexity, so it should be used where asynchronous semantics are acceptable.\n\n**Example:**\n\nAn order service should not wait synchronously for email, analytics, and search indexing before returning success. It can publish an OrderCreated event to a durable queue so those consumers process their work independently and can retry failures.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How would you handle message ordering, retries, and delivery status?", "What is the difference between a task queue and an event stream such as Kafka?", "Design one-to-one chat. How does a message travel from sender to recipient?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "Why introduce a message queue between services instead of synchro - Interview Question",
        seoDescription: "A queue decouples producers from consumers, absorbs traffic spikes, enables asynchronous processing, and provides retry/dead-letter behavior. It also intro."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 38: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-is-the-difference-between-a-task-queue-and-an-event-stream-such-as-kafka" },
      update: {
        question: "What is the difference between a task queue and an event stream such as Kafka?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A task queue usually represents work that should be processed by workers, such as sending an email or resizing an image.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "A task queue usually represents work that should be processed by workers, such as sending an email or resizing an image. An event stream represents an ordered, durable sequence of events that multiple consumers may independently replay or process. The distinction is conceptual rather than a claim that one specific product can only implement one model.",
        detailedAnswer: "**Direct answer:**\n\nA task queue usually represents work that should be processed by workers, such as sending an email or resizing an image. An event stream represents an ordered, durable sequence of events that multiple consumers may independently replay or process. The distinction is conceptual rather than a claim that one specific product can only implement one model.\n\n**Example:**\n\nA task queue might contain 'generate invoice PDF' jobs where one worker should perform each task. Kafka-style event streaming is better when several independent consumers\u2014billing, analytics, notifications, and auditing\u2014each need to read the same ordered event history.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["Why introduce a message queue between services instead of synchronous calls?", "How would you handle message ordering, retries, and delivery status?", "How do you deliver messages when the recipient is offline?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "What is the difference between a task queue and an event stream s - Interview Question",
        seoDescription: "A task queue usually represents work that should be processed by workers, such as sending an email or resizing an image. An event stream represents an orde."
      },
      create: {
        question: "What is the difference between a task queue and an event stream such as Kafka?",
        slug: "what-is-the-difference-between-a-task-queue-and-an-event-stream-such-as-kafka",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A task queue usually represents work that should be processed by workers, such as sending an email or resizing an image.",
        explanation: "Comparison questions reveal whether the candidate understands why an architectural choice matters rather than memorizing technology definitions.",
        sampleAnswer: "A task queue usually represents work that should be processed by workers, such as sending an email or resizing an image. An event stream represents an ordered, durable sequence of events that multiple consumers may independently replay or process. The distinction is conceptual rather than a claim that one specific product can only implement one model.",
        detailedAnswer: "**Direct answer:**\n\nA task queue usually represents work that should be processed by workers, such as sending an email or resizing an image. An event stream represents an ordered, durable sequence of events that multiple consumers may independently replay or process. The distinction is conceptual rather than a claim that one specific product can only implement one model.\n\n**Example:**\n\nA task queue might contain 'generate invoice PDF' jobs where one worker should perform each task. Kafka-style event streaming is better when several independent consumers\u2014billing, analytics, notifications, and auditing\u2014each need to read the same ordered event history.",
        keyPoints: ["Whether the candidate can distinguish the relevant approaches, explain their trade-offs, and choose an option based on workload and business requirements."],
        commonMistakes: [],
        followUpQuestions: ["Why introduce a message queue between services instead of synchronous calls?", "How would you handle message ordering, retries, and delivery status?", "How do you deliver messages when the recipient is offline?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "What is the difference between a task queue and an event stream s - Interview Question",
        seoDescription: "A task queue usually represents work that should be processed by workers, such as sending an email or resizing an image. An event stream represents an orde."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 39: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-is-consistent-hashing-and-why-is-it-useful-when-servers-are-added-or-removed" },
      update: {
        question: "What is consistent hashing and why is it useful when servers are added or removed?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.",
        detailedAnswer: "**Direct answer:**\n\nA sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.\n\n**Example:**\n\nSuppose 10 cache nodes serve user profiles. With consistent hashing, adding an 11th node moves only a subset of keys instead of remapping nearly every key, reducing cache churn during scaling events.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Why is expand-and-contract useful when old and new application versions coexist?", "What does a load balancer do when several application servers handle the same API?", "How would you generate unique short URLs using sequential IDs, Base62, or hashing? What collision issues arise?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "What is consistent hashing and why is it useful when servers are  - Interview Question",
        seoDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless ."
      },
      create: {
        question: "What is consistent hashing and why is it useful when servers are added or removed?",
        slug: "what-is-consistent-hashing-and-why-is-it-useful-when-servers-are-added-or-removed",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.",
        detailedAnswer: "**Direct answer:**\n\nA sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.\n\n**Example:**\n\nSuppose 10 cache nodes serve user profiles. With consistent hashing, adding an 11th node moves only a subset of keys instead of remapping nearly every key, reducing cache churn during scaling events.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Why is expand-and-contract useful when old and new application versions coexist?", "What does a load balancer do when several application servers handle the same API?", "How would you generate unique short URLs using sequential IDs, Base62, or hashing? What collision issues arise?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "What is consistent hashing and why is it useful when servers are  - Interview Question",
        seoDescription: "A sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 40: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-shard-a-database-and-choose-a-shard-key" },
      update: {
        question: "How would you shard a database and choose a shard key?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Choose a shard key that distributes load evenly while keeping common queries targeted.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Choose a shard key that distributes load evenly while keeping common queries targeted. Avoid monotonically hot keys and values that create one overloaded shard. Evaluate cardinality, query patterns, growth, rebalancing, and whether important transactions span shards.",
        detailedAnswer: "Database sharding horizontally partitions data across multiple database nodes. Instead of every database server storing every row, each shard stores a subset of the rows.\n\nFor example:\n\nShard 1 -> users 1-1,000,000\nShard 2 -> users 1,000,001-2,000,000\nShard 3 -> users 2,000,001-3,000,000\n\nThe most important design decision is the shard key because it determines where data is stored and how traffic is distributed.\n\nA good shard key should generally provide:\n1. High cardinality.\n2. Even distribution.\n3. Stable values.\n4. Predictable routing.\n5. Alignment with common query patterns.\n\nSuppose the application is a multi-tenant SaaS system. tenantId can be an excellent shard key if most queries are scoped to a tenant:\n\ntenantId -> shard\n\nThen:\nGET /tenants/123/orders\n\ncan be routed directly to the shard containing tenant 123.\n\nAdvantages include avoiding scatter-gather queries and keeping related data together.\n\nHowever, tenantId can be problematic if one tenant is much larger or more active than others. One large customer could create a hot shard.\n\nAnother common choice is userId. It works well when most operations are user-centric. But if the main query is by orderId or tenantId, userId may force cross-shard queries.\n\nHash-based sharding can distribute keys more evenly:\nshard = hash(userId) % N\n\nThis reduces hotspots but makes range queries and shard expansion harder with simple modulo hashing.\n\nRange-based sharding might use:\nuserId 0-999999 -> shard 1\nuserId 1000000-1999999 -> shard 2\n\nThis makes range queries efficient but can create hotspots if new IDs are continuously generated in the latest range.\n\nThe shard key should be chosen based on access patterns, not simply on which column is unique.\n\nI would analyze:\n- Most frequent queries.\n- Data growth rate.\n- Tenant/user distribution.\n- Write distribution.\n- Read distribution.\n- Required transactions.\n- Cross-entity query patterns.\n- Future growth.\n\nCross-shard joins and transactions are expensive and complex. Therefore, related data that is commonly accessed together should often share a shard key when possible.\n\nFor example, if an order belongs to a tenant and nearly every query is tenant-scoped, storing orders by tenantId can be better than distributing orders independently by orderId.\n\nA production system also needs a routing layer:\n\nClient\n  |\n  v\nApplication / Shard Router\n  |\n  +----> Shard 1\n  +----> Shard 2\n  +----> Shard 3\n\nThe router determines the destination shard from the shard key.\n\nShard rebalancing is another major concern. If one shard becomes too large, data may need to be moved. This is why consistent hashing, virtual shards, or a metadata-based shard map can be useful.\n\nInterview takeaway: choose a shard key that balances data and traffic while matching the application's most common query boundary. Avoid keys that create hot shards or require frequent cross-shard operations.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why replicate a database, and what problems can occur when reads use replicas?", "How would you migrate a very large production database without downtime?", "Explain CAP theorem using a distributed database during a network partition."],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "How would you shard a database and choose a shard key - Interview Question",
        seoDescription: "Choose a shard key that distributes load evenly while keeping common queries targeted. Avoid monotonically hot keys and values that create one overloaded s."
      },
      create: {
        question: "How would you shard a database and choose a shard key?",
        slug: "how-would-you-shard-a-database-and-choose-a-shard-key",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Choose a shard key that distributes load evenly while keeping common queries targeted.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Choose a shard key that distributes load evenly while keeping common queries targeted. Avoid monotonically hot keys and values that create one overloaded shard. Evaluate cardinality, query patterns, growth, rebalancing, and whether important transactions span shards.",
        detailedAnswer: "Database sharding horizontally partitions data across multiple database nodes. Instead of every database server storing every row, each shard stores a subset of the rows.\n\nFor example:\n\nShard 1 -> users 1-1,000,000\nShard 2 -> users 1,000,001-2,000,000\nShard 3 -> users 2,000,001-3,000,000\n\nThe most important design decision is the shard key because it determines where data is stored and how traffic is distributed.\n\nA good shard key should generally provide:\n1. High cardinality.\n2. Even distribution.\n3. Stable values.\n4. Predictable routing.\n5. Alignment with common query patterns.\n\nSuppose the application is a multi-tenant SaaS system. tenantId can be an excellent shard key if most queries are scoped to a tenant:\n\ntenantId -> shard\n\nThen:\nGET /tenants/123/orders\n\ncan be routed directly to the shard containing tenant 123.\n\nAdvantages include avoiding scatter-gather queries and keeping related data together.\n\nHowever, tenantId can be problematic if one tenant is much larger or more active than others. One large customer could create a hot shard.\n\nAnother common choice is userId. It works well when most operations are user-centric. But if the main query is by orderId or tenantId, userId may force cross-shard queries.\n\nHash-based sharding can distribute keys more evenly:\nshard = hash(userId) % N\n\nThis reduces hotspots but makes range queries and shard expansion harder with simple modulo hashing.\n\nRange-based sharding might use:\nuserId 0-999999 -> shard 1\nuserId 1000000-1999999 -> shard 2\n\nThis makes range queries efficient but can create hotspots if new IDs are continuously generated in the latest range.\n\nThe shard key should be chosen based on access patterns, not simply on which column is unique.\n\nI would analyze:\n- Most frequent queries.\n- Data growth rate.\n- Tenant/user distribution.\n- Write distribution.\n- Read distribution.\n- Required transactions.\n- Cross-entity query patterns.\n- Future growth.\n\nCross-shard joins and transactions are expensive and complex. Therefore, related data that is commonly accessed together should often share a shard key when possible.\n\nFor example, if an order belongs to a tenant and nearly every query is tenant-scoped, storing orders by tenantId can be better than distributing orders independently by orderId.\n\nA production system also needs a routing layer:\n\nClient\n  |\n  v\nApplication / Shard Router\n  |\n  +----> Shard 1\n  +----> Shard 2\n  +----> Shard 3\n\nThe router determines the destination shard from the shard key.\n\nShard rebalancing is another major concern. If one shard becomes too large, data may need to be moved. This is why consistent hashing, virtual shards, or a metadata-based shard map can be useful.\n\nInterview takeaway: choose a shard key that balances data and traffic while matching the application's most common query boundary. Avoid keys that create hot shards or require frequent cross-shard operations.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why replicate a database, and what problems can occur when reads use replicas?", "How would you migrate a very large production database without downtime?", "Explain CAP theorem using a distributed database during a network partition."],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "How would you shard a database and choose a shard key - Interview Question",
        seoDescription: "Choose a shard key that distributes load evenly while keeping common queries targeted. Avoid monotonically hot keys and values that create one overloaded s."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 41: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-problems-can-replication-lag-create-for-an-application" },
      update: {
        question: "What problems can replication lag create for an application?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Lag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between primary and replica.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Lag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between primary and replica. Mitigations include primary reads for critical paths, session consistency, bounded-staleness policies, or waiting until a replica catches up.",
        detailedAnswer: "**Direct answer:**\n\nLag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between primary and replica. Mitigations include primary reads for critical paths, session consistency, bounded-staleness policies, or waiting until a replica catches up.\n\n**Example:**\n\nA write reaches the primary, but a read immediately goes to a replica that is two seconds behind. The user may see an older order status, so critical read-after-write paths may need a primary read or another consistency mechanism.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["When would you choose SQL over NoSQL for a new system?", "Compare strong consistency and eventual consistency with practical examples.", "Why replicate a database, and what problems can occur when reads use replicas?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "What problems can replication lag create for an application - Interview Question",
        seoDescription: "Lag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between."
      },
      create: {
        question: "What problems can replication lag create for an application?",
        slug: "what-problems-can-replication-lag-create-for-an-application",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Lag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between primary and replica.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Lag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between primary and replica. Mitigations include primary reads for critical paths, session consistency, bounded-staleness policies, or waiting until a replica catches up.",
        detailedAnswer: "**Direct answer:**\n\nLag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between primary and replica. Mitigations include primary reads for critical paths, session consistency, bounded-staleness policies, or waiting until a replica catches up.\n\n**Example:**\n\nA write reaches the primary, but a read immediately goes to a replica that is two seconds behind. The user may see an older order status, so critical read-after-write paths may need a primary read or another consistency mechanism.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["When would you choose SQL over NoSQL for a new system?", "Compare strong consistency and eventual consistency with practical examples.", "Why replicate a database, and what problems can occur when reads use replicas?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "What problems can replication lag create for an application - Interview Question",
        seoDescription: "Lag can cause stale reads, read-after-write failures, incorrect decisions based on old data, and confusing user experiences when requests alternate between."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 42: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-stop-one-slow-downstream-service-from-blocking-every-incoming-request" },
      update: {
        question: "How would you stop one slow downstream service from blocking every incoming request?",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_coordination.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.",
        detailedAnswer: "**Direct answer:**\n\nBound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.\n\n**Example:**\n\nIf a payment service starts responding in 8 seconds instead of 200 ms, the checkout service should not allow every request to wait indefinitely. Set bounded timeouts, isolate the dependency, and return a controlled response while protecting resources for unrelated traffic.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How can one slow downstream service cause a cascading failure?", "How would you design an active-active service across two regions?", "Payment succeeds at the provider but your service times out. How do you reconcile the transaction?"],
        tags: ["system-design", "distributed-coordination"],
        isPublished: true,
        seoTitle: "How would you stop one slow downstream service from blocking ever - Interview Question",
        seoDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests."
      },
      create: {
        question: "How would you stop one slow downstream service from blocking every incoming request?",
        slug: "how-would-you-stop-one-slow-downstream-service-from-blocking-every-incoming-request",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_coordination.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.",
        detailedAnswer: "**Direct answer:**\n\nBound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.\n\n**Example:**\n\nIf a payment service starts responding in 8 seconds instead of 200 ms, the checkout service should not allow every request to wait indefinitely. Set bounded timeouts, isolate the dependency, and return a controlled response while protecting resources for unrelated traffic.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How can one slow downstream service cause a cascading failure?", "How would you design an active-active service across two regions?", "Payment succeeds at the provider but your service times out. How do you reconcile the transaction?"],
        tags: ["system-design", "distributed-coordination"],
        isPublished: true,
        seoTitle: "How would you stop one slow downstream service from blocking ever - Interview Question",
        seoDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 43: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-is-a-cache-stampede-and-how-would-you-prevent-it" },
      update: {
        question: "What is a cache stampede and how would you prevent it?",
        categoryId: category.id,
        subcategoryId: subcategory_caching.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A cache stampede occurs when many requests miss or simultaneously refresh the same expired key.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A cache stampede occurs when many requests miss or simultaneously refresh the same expired key. Use request coalescing/single-flight, jittered TTLs, stale-while-revalidate, early refresh, or a distributed lock when appropriate.",
        detailedAnswer: "**Direct answer:**\n\nA cache stampede occurs when many requests miss or simultaneously refresh the same expired key. Use request coalescing/single-flight, jittered TTLs, stale-while-revalidate, early refresh, or a distributed lock when appropriate.\n\n**Example:**\n\nA popular product expires from cache on 10,000 application servers at once. They all hit the database simultaneously. A lock or single-flight mechanism can let one request refresh the value while others reuse the refreshed result.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Where would you introduce caching in a simple web application and what would you cache?", "What is a cache avalanche and how can staggered TTLs help?", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "caching"],
        isPublished: true,
        seoTitle: "What is a cache stampede and how would you prevent it - Interview Question",
        seoDescription: "A cache stampede occurs when many requests miss or simultaneously refresh the same expired key. Use request coalescing/single-flight, jittered TTLs, stale-."
      },
      create: {
        question: "What is a cache stampede and how would you prevent it?",
        slug: "what-is-a-cache-stampede-and-how-would-you-prevent-it",
        categoryId: category.id,
        subcategoryId: subcategory_caching.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A cache stampede occurs when many requests miss or simultaneously refresh the same expired key.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A cache stampede occurs when many requests miss or simultaneously refresh the same expired key. Use request coalescing/single-flight, jittered TTLs, stale-while-revalidate, early refresh, or a distributed lock when appropriate.",
        detailedAnswer: "**Direct answer:**\n\nA cache stampede occurs when many requests miss or simultaneously refresh the same expired key. Use request coalescing/single-flight, jittered TTLs, stale-while-revalidate, early refresh, or a distributed lock when appropriate.\n\n**Example:**\n\nA popular product expires from cache on 10,000 application servers at once. They all hit the database simultaneously. A lock or single-flight mechanism can let one request refresh the value while others reuse the refreshed result.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Where would you introduce caching in a simple web application and what would you cache?", "What is a cache avalanche and how can staggered TTLs help?", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "caching"],
        isPublished: true,
        seoTitle: "What is a cache stampede and how would you prevent it - Interview Question",
        seoDescription: "A cache stampede occurs when many requests miss or simultaneously refresh the same expired key. Use request coalescing/single-flight, jittered TTLs, stale-."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 44: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-is-a-cache-avalanche-and-how-can-staggered-ttls-help" },
      update: {
        question: "What is a cache avalanche and how can staggered TTLs help?",
        categoryId: category.id,
        subcategoryId: subcategory_caching.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend. Stagger TTLs with jitter, warm critical entries, use layered caches, and protect the origin with rate limits or circuit breakers.",
        detailedAnswer: "**Direct answer:**\n\nA cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend. Stagger TTLs with jitter, warm critical entries, use layered caches, and protect the origin with rate limits or circuit breakers.\n\n**Example:**\n\nIf a cache cluster loses many keys at once because of a configuration error or mass expiration, traffic can suddenly hit the origin. Staggering TTLs and warming important keys reduces the chance that every key becomes invalid at the same moment.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["What is a cache stampede and how would you prevent it?", "Where would you introduce caching in a simple web application and what would you cache?", "How do timeouts, retries, circuit breakers, bulkheads, and queues work together?"],
        tags: ["system-design", "caching"],
        isPublished: true,
        seoTitle: "What is a cache avalanche and how can staggered TTLs help - Interview Question",
        seoDescription: "A cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend. Stagger TTLs with ."
      },
      create: {
        question: "What is a cache avalanche and how can staggered TTLs help?",
        slug: "what-is-a-cache-avalanche-and-how-can-staggered-ttls-help",
        categoryId: category.id,
        subcategoryId: subcategory_caching.id,
        experienceLevel: "MID_LEVEL",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend. Stagger TTLs with jitter, warm critical entries, use layered caches, and protect the origin with rate limits or circuit breakers.",
        detailedAnswer: "**Direct answer:**\n\nA cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend. Stagger TTLs with jitter, warm critical entries, use layered caches, and protect the origin with rate limits or circuit breakers.\n\n**Example:**\n\nIf a cache cluster loses many keys at once because of a configuration error or mass expiration, traffic can suddenly hit the origin. Staggering TTLs and warming important keys reduces the chance that every key becomes invalid at the same moment.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["What is a cache stampede and how would you prevent it?", "Where would you introduce caching in a simple web application and what would you cache?", "How do timeouts, retries, circuit breakers, bulkheads, and queues work together?"],
        tags: ["system-design", "caching"],
        isPublished: true,
        seoTitle: "What is a cache avalanche and how can staggered TTLs help - Interview Question",
        seoDescription: "A cache avalanche occurs when many cache entries expire or become unavailable around the same time, pushing a large load to the backend. Stagger TTLs with ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 45: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-responsibilities-would-you-put-in-an-api-gateway" },
      update: {
        question: "What responsibilities would you put in an API gateway?",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "An API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes response aggregation.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "An API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes response aggregation. Keep business logic out of the gateway when possible so it does not become a monolithic bottleneck.",
        detailedAnswer: "**Direct answer:**\n\nAn API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes response aggregation. Keep business logic out of the gateway when possible so it does not become a monolithic bottleneck.\n\n**Example:**\n\nAn API gateway can authenticate requests, apply rate limits, route /payments to one service and /catalog to another, enforce request-size limits, and attach tracing information. Business logic such as calculating an order total should remain in the relevant service.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What does a load balancer do when several application servers handle the same API?", "Explain vertical versus horizontal scaling and the main limitations of each.", "What is a reverse proxy and what problems does it solve?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "What responsibilities would you put in an API gateway - Interview Question",
        seoDescription: "An API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes ."
      },
      create: {
        question: "What responsibilities would you put in an API gateway?",
        slug: "what-responsibilities-would-you-put-in-an-api-gateway",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "An API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes response aggregation.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "An API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes response aggregation. Keep business logic out of the gateway when possible so it does not become a monolithic bottleneck.",
        detailedAnswer: "**Direct answer:**\n\nAn API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes response aggregation. Keep business logic out of the gateway when possible so it does not become a monolithic bottleneck.\n\n**Example:**\n\nAn API gateway can authenticate requests, apply rate limits, route /payments to one service and /catalog to another, enforce request-size limits, and attach tracing information. Business logic such as calculating an order total should remain in the relevant service.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["What does a load balancer do when several application servers handle the same API?", "Explain vertical versus horizontal scaling and the main limitations of each.", "What is a reverse proxy and what problems does it solve?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "What responsibilities would you put in an API gateway - Interview Question",
        seoDescription: "An API gateway can centralize routing, authentication, authorization checks, rate limiting, request shaping, TLS termination, observability, and sometimes ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 46: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-is-a-reverse-proxy-and-what-problems-does-it-solve" },
      update: {
        question: "What is a reverse proxy and what problems does it solve?",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A reverse proxy sits in front of backend servers and receives client requests on their behalf.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A reverse proxy sits in front of backend servers and receives client requests on their behalf. It can provide TLS termination, routing, caching, compression, load balancing, security filtering, and connection management. Unlike a forward proxy, it represents the server side to clients.",
        detailedAnswer: "**Direct answer:**\n\nA reverse proxy sits in front of backend servers and receives client requests on their behalf. It can provide TLS termination, routing, caching, compression, load balancing, security filtering, and connection management. Unlike a forward proxy, it represents the server side to clients.\n\n**Example:**\n\nA reverse proxy such as an Nginx-like layer can terminate TLS, route traffic to application servers, compress responses, and serve static content. It gives the application tier a controlled entry point without requiring each app instance to implement those concerns itself.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Explain vertical versus horizontal scaling and the main limitations of each.", "What responsibilities would you put in an API gateway?", "How would you partition a ride-sharing system geographically at large scale?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "What is a reverse proxy and what problems does it solve - Interview Question",
        seoDescription: "A reverse proxy sits in front of backend servers and receives client requests on their behalf. It can provide TLS termination, routing, caching, compressio."
      },
      create: {
        question: "What is a reverse proxy and what problems does it solve?",
        slug: "what-is-a-reverse-proxy-and-what-problems-does-it-solve",
        categoryId: category.id,
        subcategoryId: subcategory_scalability_and_traffic_management.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A reverse proxy sits in front of backend servers and receives client requests on their behalf.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "A reverse proxy sits in front of backend servers and receives client requests on their behalf. It can provide TLS termination, routing, caching, compression, load balancing, security filtering, and connection management. Unlike a forward proxy, it represents the server side to clients.",
        detailedAnswer: "**Direct answer:**\n\nA reverse proxy sits in front of backend servers and receives client requests on their behalf. It can provide TLS termination, routing, caching, compression, load balancing, security filtering, and connection management. Unlike a forward proxy, it represents the server side to clients.\n\n**Example:**\n\nA reverse proxy such as an Nginx-like layer can terminate TLS, route traffic to application servers, compress responses, and serve static content. It gives the application tier a controlled entry point without requiring each app instance to implement those concerns itself.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Explain vertical versus horizontal scaling and the main limitations of each.", "What responsibilities would you put in an API gateway?", "How would you partition a ride-sharing system geographically at large scale?"],
        tags: ["system-design", "scalability-and-traffic-management"],
        isPublished: true,
        seoTitle: "What is a reverse proxy and what problems does it solve - Interview Question",
        seoDescription: "A reverse proxy sits in front of backend servers and receives client requests on their behalf. It can provide TLS termination, routing, caching, compressio."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 47: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-youtube-netflix-style-video-streaming-platform-from-upload-through-global-playback" },
      update: {
        question: "Design a YouTube/Netflix-style video streaming platform from upload through global playback.",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Separate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Separate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics. Uploaded content is stored durably, transcoded asynchronously into multiple representations, packaged into streaming segments, and served through a CDN. The origin should not handle every playback byte directly.",
        detailedAnswer: "**Direct answer:**\n\nSeparate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics. Uploaded content is stored durably, transcoded asynchronously into multiple representations, packaged into streaming segments, and served through a CDN. The origin should not handle every playback byte directly.\n\n**Example:**\n\nA video upload first lands in durable object storage. A processing pipeline creates multiple encoded renditions, generates thumbnails and manifests, stores metadata, and publishes the video only after required processing completes.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Google Docs-style collaborative document editor.", "How would adaptive bitrate streaming react to changing network bandwidth?", "Why transcode one uploaded video into multiple resolutions and bitrates?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "Design a YouTube/Netflix-style video streaming platform from uplo - Interview Question",
        seoDescription: "Separate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics. Uploaded content is stored durably,."
      },
      create: {
        question: "Design a YouTube/Netflix-style video streaming platform from upload through global playback.",
        slug: "design-a-youtube-netflix-style-video-streaming-platform-from-upload-through-global-playback",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Separate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Separate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics. Uploaded content is stored durably, transcoded asynchronously into multiple representations, packaged into streaming segments, and served through a CDN. The origin should not handle every playback byte directly.",
        detailedAnswer: "**Direct answer:**\n\nSeparate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics. Uploaded content is stored durably, transcoded asynchronously into multiple representations, packaged into streaming segments, and served through a CDN. The origin should not handle every playback byte directly.\n\n**Example:**\n\nA video upload first lands in durable object storage. A processing pipeline creates multiple encoded renditions, generates thumbnails and manifests, stores metadata, and publishes the video only after required processing completes.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Google Docs-style collaborative document editor.", "How would adaptive bitrate streaming react to changing network bandwidth?", "Why transcode one uploaded video into multiple resolutions and bitrates?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "Design a YouTube/Netflix-style video streaming platform from uplo - Interview Question",
        seoDescription: "Separate upload, metadata, transcoding, packaging, object storage, CDN delivery, playback authorization, and analytics. Uploaded content is stored durably,."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 48: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-transcode-one-uploaded-video-into-multiple-resolutions-and-bitrates" },
      update: {
        question: "Why transcode one uploaded video into multiple resolutions and bitrates?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Different devices and networks need different resolutions, codecs, bitrates, and frame characteristics.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Different devices and networks need different resolutions, codecs, bitrates, and frame characteristics. Multiple representations allow the player to select a suitable stream. Transcoding is CPU/GPU intensive, so it is normally asynchronous and backed by a durable job queue.",
        detailedAnswer: "**Direct answer:**\n\nDifferent devices and networks need different resolutions, codecs, bitrates, and frame characteristics. Multiple representations allow the player to select a suitable stream. Transcoding is CPU/GPU intensive, so it is normally asynchronous and backed by a durable job queue.\n\n**Example:**\n\nA 4K source might be encoded into 2160p, 1080p, 720p, and lower-bitrate variants. A viewer on a strong connection can receive higher quality, while a phone on a congested network can use a smaller representation without requiring a new upload.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Design a YouTube/Netflix-style video streaming platform from upload through global playback.", "How would you stop one slow downstream service from blocking every incoming request?", "How can one slow downstream service cause a cascading failure?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "Why transcode one uploaded video into multiple resolutions and bi - Interview Question",
        seoDescription: "Different devices and networks need different resolutions, codecs, bitrates, and frame characteristics. Multiple representations allow the player to select."
      },
      create: {
        question: "Why transcode one uploaded video into multiple resolutions and bitrates?",
        slug: "why-transcode-one-uploaded-video-into-multiple-resolutions-and-bitrates",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Different devices and networks need different resolutions, codecs, bitrates, and frame characteristics.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Different devices and networks need different resolutions, codecs, bitrates, and frame characteristics. Multiple representations allow the player to select a suitable stream. Transcoding is CPU/GPU intensive, so it is normally asynchronous and backed by a durable job queue.",
        detailedAnswer: "**Direct answer:**\n\nDifferent devices and networks need different resolutions, codecs, bitrates, and frame characteristics. Multiple representations allow the player to select a suitable stream. Transcoding is CPU/GPU intensive, so it is normally asynchronous and backed by a durable job queue.\n\n**Example:**\n\nA 4K source might be encoded into 2160p, 1080p, 720p, and lower-bitrate variants. A viewer on a strong connection can receive higher quality, while a phone on a congested network can use a smaller representation without requiring a new upload.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["Design a YouTube/Netflix-style video streaming platform from upload through global playback.", "How would you stop one slow downstream service from blocking every incoming request?", "How can one slow downstream service cause a cascading failure?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "Why transcode one uploaded video into multiple resolutions and bi - Interview Question",
        seoDescription: "Different devices and networks need different resolutions, codecs, bitrates, and frame characteristics. Multiple representations allow the player to select."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 49: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-does-a-cdn-reduce-video-latency-and-origin-load" },
      update: {
        question: "How does a CDN reduce video latency and origin load?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A CDN caches popular video segments at edge locations near viewers.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A CDN caches popular video segments at edge locations near viewers. Requests can be served without traveling to the origin, reducing latency, backbone traffic, and origin bandwidth. Cacheability works especially well for immutable video segments.",
        detailedAnswer: "**Direct answer:**\n\nA CDN caches popular video segments at edge locations near viewers. Requests can be served without traveling to the origin, reducing latency, backbone traffic, and origin bandwidth. Cacheability works especially well for immutable video segments.\n\n**Example:**\n\nIf 100,000 viewers in Singapore request the same movie segment, an edge cache can serve most copies locally instead of sending every request to the origin in the United States. The origin therefore handles far fewer repeated reads.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How should a load balancer react when one backend server becomes unhealthy?", "What does a load balancer do when several application servers handle the same API?", "What is a reverse proxy and what problems does it solve?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How does a CDN reduce video latency and origin load - Interview Question",
        seoDescription: "A CDN caches popular video segments at edge locations near viewers. Requests can be served without traveling to the origin, reducing latency, backbone traf."
      },
      create: {
        question: "How does a CDN reduce video latency and origin load?",
        slug: "how-does-a-cdn-reduce-video-latency-and-origin-load",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A CDN caches popular video segments at edge locations near viewers.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A CDN caches popular video segments at edge locations near viewers. Requests can be served without traveling to the origin, reducing latency, backbone traffic, and origin bandwidth. Cacheability works especially well for immutable video segments.",
        detailedAnswer: "**Direct answer:**\n\nA CDN caches popular video segments at edge locations near viewers. Requests can be served without traveling to the origin, reducing latency, backbone traffic, and origin bandwidth. Cacheability works especially well for immutable video segments.\n\n**Example:**\n\nIf 100,000 viewers in Singapore request the same movie segment, an edge cache can serve most copies locally instead of sending every request to the origin in the United States. The origin therefore handles far fewer repeated reads.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How should a load balancer react when one backend server becomes unhealthy?", "What does a load balancer do when several application servers handle the same API?", "What is a reverse proxy and what problems does it solve?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How does a CDN reduce video latency and origin load - Interview Question",
        seoDescription: "A CDN caches popular video segments at edge locations near viewers. Requests can be served without traveling to the origin, reducing latency, backbone traf."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 50: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-adaptive-bitrate-streaming-react-to-changing-network-bandwidth" },
      update: {
        question: "How would adaptive bitrate streaming react to changing network bandwidth?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "The player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "The player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations. It should avoid selecting a bitrate that the current network cannot sustain, while also avoiding unnecessary quality oscillation.",
        detailedAnswer: "**Direct answer:**\n\nThe player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations. It should avoid selecting a bitrate that the current network cannot sustain, while also avoiding unnecessary quality oscillation.\n\n**Example:**\n\nA viewer starts on Wi-Fi and receives 1080p segments. Bandwidth drops when the viewer enters a crowded train, so the player measures throughput and buffer health and switches to a lower-bitrate rendition before the buffer runs empty.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a YouTube/Netflix-style video streaming platform from upload through global playback.", "A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "How should a load balancer react when one backend server becomes unhealthy?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would adaptive bitrate streaming react to changing network ba - Interview Question",
        seoDescription: "The player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations. It should avoid selecting a ."
      },
      create: {
        question: "How would adaptive bitrate streaming react to changing network bandwidth?",
        slug: "how-would-adaptive-bitrate-streaming-react-to-changing-network-bandwidth",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "The player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "The player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations. It should avoid selecting a bitrate that the current network cannot sustain, while also avoiding unnecessary quality oscillation.",
        detailedAnswer: "**Direct answer:**\n\nThe player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations. It should avoid selecting a bitrate that the current network cannot sustain, while also avoiding unnecessary quality oscillation.\n\n**Example:**\n\nA viewer starts on Wi-Fi and receives 1080p segments. Bandwidth drops when the viewer enters a crowded train, so the player measures throughput and buffer health and switches to a lower-bitrate rendition before the buffer runs empty.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a YouTube/Netflix-style video streaming platform from upload through global playback.", "A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "How should a load balancer react when one backend server becomes unhealthy?"],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would adaptive bitrate streaming react to changing network ba - Interview Question",
        seoDescription: "The player measures throughput, buffer health, and sometimes latency, then switches between available bitrate representations. It should avoid selecting a ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 51: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-distributed-payment-processing-system-and-prevent-duplicate-charges" },
      update: {
        question: "Design a distributed payment-processing system and prevent duplicate charges.",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Separate the payment intent/order from the external provider call and maintain a durable transaction state machine.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Separate the payment intent/order from the external provider call and maintain a durable transaction state machine. Use idempotency keys, unique transaction identifiers, durable event records, reconciliation, and an auditable ledger. Never rely solely on an HTTP timeout to conclude that a payment failed.",
        detailedAnswer: "**Direct answer:**\n\nSeparate the payment intent/order from the external provider call and maintain a durable transaction state machine. Use idempotency keys, unique transaction identifiers, durable event records, reconciliation, and an auditable ledger. Never rely solely on an HTTP timeout to conclude that a payment failed.\n\n**Example:**\n\nA checkout request includes an idempotency key such as pay-7f92. The payment service stores the key with the final outcome and provider reference, so a retry with the same key returns the original result instead of creating another charge.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "How would payment, order creation, and notification failures recover independently?", "How do idempotency keys work in a payment API, and where do you store the result?"],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "Design a distributed payment-processing system and prevent duplic - Interview Question",
        seoDescription: "Separate the payment intent/order from the external provider call and maintain a durable transaction state machine. Use idempotency keys, unique transactio."
      },
      create: {
        question: "Design a distributed payment-processing system and prevent duplicate charges.",
        slug: "design-a-distributed-payment-processing-system-and-prevent-duplicate-charges",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Separate the payment intent/order from the external provider call and maintain a durable transaction state machine.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Separate the payment intent/order from the external provider call and maintain a durable transaction state machine. Use idempotency keys, unique transaction identifiers, durable event records, reconciliation, and an auditable ledger. Never rely solely on an HTTP timeout to conclude that a payment failed.",
        detailedAnswer: "**Direct answer:**\n\nSeparate the payment intent/order from the external provider call and maintain a durable transaction state machine. Use idempotency keys, unique transaction identifiers, durable event records, reconciliation, and an auditable ledger. Never rely solely on an HTTP timeout to conclude that a payment failed.\n\n**Example:**\n\nA checkout request includes an idempotency key such as pay-7f92. The payment service stores the key with the final outcome and provider reference, so a retry with the same key returns the original result instead of creating another charge.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "How would payment, order creation, and notification failures recover independently?", "How do idempotency keys work in a payment API, and where do you store the result?"],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "Design a distributed payment-processing system and prevent duplic - Interview Question",
        seoDescription: "Separate the payment intent/order from the external provider call and maintain a durable transaction state machine. Use idempotency keys, unique transactio."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 52: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-do-idempotency-keys-work-in-a-payment-api-and-where-do-you-store-the-result" },
      update: {
        question: "How do idempotency keys work in a payment API, and where do you store the result?",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "An idempotency key lets repeated requests represent one logical operation.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "An idempotency key lets repeated requests represent one logical operation. Persist the key with the request/result and return the same result for safe retries. The uniqueness constraint must be enforced durably, and the stored result should distinguish successful, failed, and in-progress states as required.",
        detailedAnswer: "**Direct answer:**\n\nAn idempotency key lets repeated requests represent one logical operation. Persist the key with the request/result and return the same result for safe retries. The uniqueness constraint must be enforced durably, and the stored result should distinguish successful, failed, and in-progress states as required.\n\n**Example:**\n\nFor a payment API, store the idempotency key, request fingerprint, status, provider transaction ID, and response data in durable storage with a uniqueness constraint. A retry can then return the same result without executing the charge again.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How would payment, order creation, and notification failures recover independently?", "Payment succeeds at the provider but your service times out. How do you reconcile the transaction?", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "How do idempotency keys work in a payment API, and where do you s - Interview Question",
        seoDescription: "An idempotency key lets repeated requests represent one logical operation. Persist the key with the request/result and return the same result for safe retr."
      },
      create: {
        question: "How do idempotency keys work in a payment API, and where do you store the result?",
        slug: "how-do-idempotency-keys-work-in-a-payment-api-and-where-do-you-store-the-result",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "An idempotency key lets repeated requests represent one logical operation.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "An idempotency key lets repeated requests represent one logical operation. Persist the key with the request/result and return the same result for safe retries. The uniqueness constraint must be enforced durably, and the stored result should distinguish successful, failed, and in-progress states as required.",
        detailedAnswer: "**Direct answer:**\n\nAn idempotency key lets repeated requests represent one logical operation. Persist the key with the request/result and return the same result for safe retries. The uniqueness constraint must be enforced durably, and the stored result should distinguish successful, failed, and in-progress states as required.\n\n**Example:**\n\nFor a payment API, store the idempotency key, request fingerprint, status, provider transaction ID, and response data in durable storage with a uniqueness constraint. A retry can then return the same result without executing the charge again.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How would payment, order creation, and notification failures recover independently?", "Payment succeeds at the provider but your service times out. How do you reconcile the transaction?", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "How do idempotency keys work in a payment API, and where do you s - Interview Question",
        seoDescription: "An idempotency key lets repeated requests represent one logical operation. Persist the key with the request/result and return the same result for safe retr."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 53: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "payment-succeeds-at-the-provider-but-your-service-times-out-how-do-you-reconcile-the-transaction" },
      update: {
        question: "Payment succeeds at the provider but your service times out. How do you reconcile the transaction?",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Treat the payment as UNKNOWN rather than automatically failed.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Treat the payment as UNKNOWN rather than automatically failed. Query the provider using a durable provider transaction ID or reconciliation API, and process asynchronous provider notifications where available. A reconciliation job should find transactions stuck in intermediate states and converge them to a final state.",
        detailedAnswer: "**Direct answer:**\n\nTreat the payment as UNKNOWN rather than automatically failed. Query the provider using a durable provider transaction ID or reconciliation API, and process asynchronous provider notifications where available. A reconciliation job should find transactions stuck in intermediate states and converge them to a final state.\n\n**Example:**\n\nThe provider reports payment P123 as successful, but the client-facing request times out. A reconciliation worker queries the provider or consumes its webhook, finds P123 as successful, and updates the internal payment state rather than charging again.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How do idempotency keys work in a payment API, and where do you store the result?", "How would payment, order creation, and notification failures recover independently?", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "Payment succeeds at the provider but your service times out. How  - Interview Question",
        seoDescription: "Treat the payment as UNKNOWN rather than automatically failed. Query the provider using a durable provider transaction ID or reconciliation API, and proces."
      },
      create: {
        question: "Payment succeeds at the provider but your service times out. How do you reconcile the transaction?",
        slug: "payment-succeeds-at-the-provider-but-your-service-times-out-how-do-you-reconcile-the-transaction",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Treat the payment as UNKNOWN rather than automatically failed.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Treat the payment as UNKNOWN rather than automatically failed. Query the provider using a durable provider transaction ID or reconciliation API, and process asynchronous provider notifications where available. A reconciliation job should find transactions stuck in intermediate states and converge them to a final state.",
        detailedAnswer: "**Direct answer:**\n\nTreat the payment as UNKNOWN rather than automatically failed. Query the provider using a durable provider transaction ID or reconciliation API, and process asynchronous provider notifications where available. A reconciliation job should find transactions stuck in intermediate states and converge them to a final state.\n\n**Example:**\n\nThe provider reports payment P123 as successful, but the client-facing request times out. A reconciliation worker queries the provider or consumes its webhook, finds P123 as successful, and updates the internal payment state rather than charging again.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How do idempotency keys work in a payment API, and where do you store the result?", "How would payment, order creation, and notification failures recover independently?", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "Payment succeeds at the provider but your service times out. How  - Interview Question",
        seoDescription: "Treat the payment as UNKNOWN rather than automatically failed. Query the provider using a durable provider transaction ID or reconciliation API, and proces."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 54: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-payment-order-creation-and-notification-failures-recover-independently" },
      update: {
        question: "How would payment, order creation, and notification failures recover independently?",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently. Use an outbox/event mechanism so a committed state change is not lost before its event is published. Each consumer should be idempotent.",
        detailedAnswer: "**Direct answer:**\n\nUse a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently. Use an outbox/event mechanism so a committed state change is not lost before its event is published. Each consumer should be idempotent.\n\n**Example:**\n\nIf payment succeeds but notification fails, the payment record remains successful while a notification job is retried independently. If order creation fails, a durable workflow or reconciliation process can resume from the known payment state instead of repeating the charge.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Payment succeeds at the provider but your service times out. How do you reconcile the transaction?", "How do idempotency keys work in a payment API, and where do you store the result?", "What consistency and durability requirements differ between a payment ledger and notifications?"],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "How would payment, order creation, and notification failures reco - Interview Question",
        seoDescription: "Use a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently. Use an outbox."
      },
      create: {
        question: "How would payment, order creation, and notification failures recover independently?",
        slug: "how-would-payment-order-creation-and-notification-failures-recover-independently",
        categoryId: category.id,
        subcategoryId: subcategory_payment_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently. Use an outbox/event mechanism so a committed state change is not lost before its event is published. Each consumer should be idempotent.",
        detailedAnswer: "**Direct answer:**\n\nUse a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently. Use an outbox/event mechanism so a committed state change is not lost before its event is published. Each consumer should be idempotent.\n\n**Example:**\n\nIf payment succeeds but notification fails, the payment record remains successful while a notification job is retried independently. If order creation fails, a durable workflow or reconciliation process can resume from the known payment state instead of repeating the charge.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Payment succeeds at the provider but your service times out. How do you reconcile the transaction?", "How do idempotency keys work in a payment API, and where do you store the result?", "What consistency and durability requirements differ between a payment ledger and notifications?"],
        tags: ["system-design", "payment-systems"],
        isPublished: true,
        seoTitle: "How would payment, order creation, and notification failures reco - Interview Question",
        seoDescription: "Use a durable state machine and asynchronous events so payment processing, order creation, and notification delivery can retry independently. Use an outbox."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 55: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-consistency-and-durability-requirements-differ-between-a-payment-ledger-and-notifications" },
      update: {
        question: "What consistency and durability requirements differ between a payment ledger and notifications?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A payment ledger requires strong integrity, durability, auditability, and carefully controlled updates.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A payment ledger requires strong integrity, durability, auditability, and carefully controlled updates. Notifications can usually tolerate retries, duplication with deduplication, and eventual delivery. Do not model a financial ledger as if it were an ordinary cache or transient message stream.",
        detailedAnswer: "**Direct answer:**\n\nA payment ledger requires strong integrity, durability, auditability, and carefully controlled updates. Notifications can usually tolerate retries, duplication with deduplication, and eventual delivery. Do not model a financial ledger as if it were an ordinary cache or transient message stream.\n\n**Example:**\n\nA payment ledger needs durable, auditable state and carefully controlled consistency because money cannot safely disappear during a failover. An email notification can usually tolerate delay and retries, so it can use a more asynchronous delivery model.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Compare strong consistency and eventual consistency with practical examples.", "Give an example where consistency is more important than availability and explain why.", "How would payment, order creation, and notification failures recover independently?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "What consistency and durability requirements differ between a pay - Interview Question",
        seoDescription: "A payment ledger requires strong integrity, durability, auditability, and carefully controlled updates. Notifications can usually tolerate retries, duplica."
      },
      create: {
        question: "What consistency and durability requirements differ between a payment ledger and notifications?",
        slug: "what-consistency-and-durability-requirements-differ-between-a-payment-ledger-and-notifications",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "A payment ledger requires strong integrity, durability, auditability, and carefully controlled updates.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "A payment ledger requires strong integrity, durability, auditability, and carefully controlled updates. Notifications can usually tolerate retries, duplication with deduplication, and eventual delivery. Do not model a financial ledger as if it were an ordinary cache or transient message stream.",
        detailedAnswer: "**Direct answer:**\n\nA payment ledger requires strong integrity, durability, auditability, and carefully controlled updates. Notifications can usually tolerate retries, duplication with deduplication, and eventual delivery. Do not model a financial ledger as if it were an ordinary cache or transient message stream.\n\n**Example:**\n\nA payment ledger needs durable, auditable state and carefully controlled consistency because money cannot safely disappear during a failover. An email notification can usually tolerate delay and retries, so it can use a more asynchronous delivery model.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Compare strong consistency and eventual consistency with practical examples.", "Give an example where consistency is more important than availability and explain why.", "How would payment, order creation, and notification failures recover independently?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "What consistency and durability requirements differ between a pay - Interview Question",
        seoDescription: "A payment ledger requires strong integrity, durability, auditability, and carefully controlled updates. Notifications can usually tolerate retries, duplica."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 56: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-a-google-docs-style-collaborative-document-editor" },
      update: {
        question: "Design a Google Docs-style collaborative document editor.",
        categoryId: category.id,
        subcategoryId: subcategory_collaborative_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a document service, persistent operation/history storage, and a real-time synchronization layer.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a document service, persistent operation/history storage, and a real-time synchronization layer. Clients maintain local state and send operations to a server that orders or merges them. The system must define conflict resolution, reconnect behavior, authorization, versioning, and durable snapshots.",
        detailedAnswer: "**Direct answer:**\n\nUse a document service, persistent operation/history storage, and a real-time synchronization layer. Clients maintain local state and send operations to a server that orders or merges them. The system must define conflict resolution, reconnect behavior, authorization, versioning, and durable snapshots.\n\n**Example:**\n\nTwo editors open the same document. Alice changes line 10 while Bob changes line 12; the collaboration layer merges concurrent operations so both users eventually see a coherent document rather than one edit silently overwriting the other.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you persist document state and edit history efficiently?", "What problem do Operational Transformation and CRDTs solve?", "Design a YouTube/Netflix-style video streaming platform from upload through global playback."],
        tags: ["system-design", "collaborative-systems"],
        isPublished: true,
        seoTitle: "Design a Google Docs-style collaborative document editor. - Interview Question",
        seoDescription: "Use a document service, persistent operation/history storage, and a real-time synchronization layer. Clients maintain local state and send operations to a ."
      },
      create: {
        question: "Design a Google Docs-style collaborative document editor.",
        slug: "design-a-google-docs-style-collaborative-document-editor",
        categoryId: category.id,
        subcategoryId: subcategory_collaborative_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use a document service, persistent operation/history storage, and a real-time synchronization layer.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use a document service, persistent operation/history storage, and a real-time synchronization layer. Clients maintain local state and send operations to a server that orders or merges them. The system must define conflict resolution, reconnect behavior, authorization, versioning, and durable snapshots.",
        detailedAnswer: "**Direct answer:**\n\nUse a document service, persistent operation/history storage, and a real-time synchronization layer. Clients maintain local state and send operations to a server that orders or merges them. The system must define conflict resolution, reconnect behavior, authorization, versioning, and durable snapshots.\n\n**Example:**\n\nTwo editors open the same document. Alice changes line 10 while Bob changes line 12; the collaboration layer merges concurrent operations so both users eventually see a coherent document rather than one edit silently overwriting the other.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you persist document state and edit history efficiently?", "What problem do Operational Transformation and CRDTs solve?", "Design a YouTube/Netflix-style video streaming platform from upload through global playback."],
        tags: ["system-design", "collaborative-systems"],
        isPublished: true,
        seoTitle: "Design a Google Docs-style collaborative document editor. - Interview Question",
        seoDescription: "Use a document service, persistent operation/history storage, and a real-time synchronization layer. Clients maintain local state and send operations to a ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 57: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-problem-do-operational-transformation-and-crdts-solve" },
      update: {
        question: "What problem do Operational Transformation and CRDTs solve?",
        categoryId: category.id,
        subcategoryId: subcategory_collaborative_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Operational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collaborative result.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Operational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collaborative result. CRDTs use data structures and merge rules designed so replicas can converge without a single central transformation step. Both address concurrent edits; their complexity, metadata costs, and implementation trade-offs differ.",
        detailedAnswer: "**Direct answer:**\n\nOperational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collaborative result. CRDTs use data structures and merge rules designed so replicas can converge without a single central transformation step. Both address concurrent edits; their complexity, metadata costs, and implementation trade-offs differ.\n\n**Example:**\n\nOperational Transformation can transform concurrent operations against a shared document state. CRDTs structure data so concurrent updates can converge under defined rules. The interview point is that both address concurrent editing; the trade-offs involve algorithms, data models, metadata, and implementation complexity.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How would you persist document state and edit history efficiently?", "Design a Google Docs-style collaborative document editor.", "What problem does leader election solve?"],
        tags: ["system-design", "collaborative-systems"],
        isPublished: true,
        seoTitle: "What problem do Operational Transformation and CRDTs solve - Interview Question",
        seoDescription: "Operational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collabora."
      },
      create: {
        question: "What problem do Operational Transformation and CRDTs solve?",
        slug: "what-problem-do-operational-transformation-and-crdts-solve",
        categoryId: category.id,
        subcategoryId: subcategory_collaborative_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Operational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collaborative result.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Operational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collaborative result. CRDTs use data structures and merge rules designed so replicas can converge without a single central transformation step. Both address concurrent edits; their complexity, metadata costs, and implementation trade-offs differ.",
        detailedAnswer: "**Direct answer:**\n\nOperational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collaborative result. CRDTs use data structures and merge rules designed so replicas can converge without a single central transformation step. Both address concurrent edits; their complexity, metadata costs, and implementation trade-offs differ.\n\n**Example:**\n\nOperational Transformation can transform concurrent operations against a shared document state. CRDTs structure data so concurrent updates can converge under defined rules. The interview point is that both address concurrent editing; the trade-offs involve algorithms, data models, metadata, and implementation complexity.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How would you persist document state and edit history efficiently?", "Design a Google Docs-style collaborative document editor.", "What problem does leader election solve?"],
        tags: ["system-design", "collaborative-systems"],
        isPublished: true,
        seoTitle: "What problem do Operational Transformation and CRDTs solve - Interview Question",
        seoDescription: "Operational Transformation transforms concurrent operations so they can be applied against changing document states while preserving the intended collabora."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 58: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-do-clients-receive-edits-in-real-time-and-how-do-you-handle-reconnects" },
      update: {
        question: "How do clients receive edits in real time, and how do you handle reconnects?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Give each operation a durable sequence/version and let a reconnecting client identify the version it has seen.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Give each operation a durable sequence/version and let a reconnecting client identify the version it has seen. The server can then send missing operations or a snapshot plus later operations. Clients should retry safely and deduplicate acknowledged operations.",
        detailedAnswer: "**Direct answer:**\n\nGive each operation a durable sequence/version and let a reconnecting client identify the version it has seen. The server can then send missing operations or a snapshot plus later operations. Clients should retry safely and deduplicate acknowledged operations.\n\n**Example:**\n\nA document server assigns each edit an operation ID and broadcasts it to connected clients. After a network drop, a reconnecting client sends its last acknowledged operation ID so the server can replay the missing changes before normal live delivery resumes.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you update driver locations in near real time?", "What is consistent hashing and why is it useful when servers are added or removed?", "Design logging, metrics, tracing, and monitoring for a large distributed system."],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How do clients receive edits in real time, and how do you handle  - Interview Question",
        seoDescription: "Give each operation a durable sequence/version and let a reconnecting client identify the version it has seen. The server can then send missing operations ."
      },
      create: {
        question: "How do clients receive edits in real time, and how do you handle reconnects?",
        slug: "how-do-clients-receive-edits-in-real-time-and-how-do-you-handle-reconnects",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Give each operation a durable sequence/version and let a reconnecting client identify the version it has seen.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Give each operation a durable sequence/version and let a reconnecting client identify the version it has seen. The server can then send missing operations or a snapshot plus later operations. Clients should retry safely and deduplicate acknowledged operations.",
        detailedAnswer: "**Direct answer:**\n\nGive each operation a durable sequence/version and let a reconnecting client identify the version it has seen. The server can then send missing operations or a snapshot plus later operations. Clients should retry safely and deduplicate acknowledged operations.\n\n**Example:**\n\nA document server assigns each edit an operation ID and broadcasts it to connected clients. After a network drop, a reconnecting client sends its last acknowledged operation ID so the server can replay the missing changes before normal live delivery resumes.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you update driver locations in near real time?", "What is consistent hashing and why is it useful when servers are added or removed?", "Design logging, metrics, tracing, and monitoring for a large distributed system."],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How do clients receive edits in real time, and how do you handle  - Interview Question",
        seoDescription: "Give each operation a durable sequence/version and let a reconnecting client identify the version it has seen. The server can then send missing operations ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 59: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-persist-document-state-and-edit-history-efficiently" },
      update: {
        question: "How would you persist document state and edit history efficiently?",
        categoryId: category.id,
        subcategoryId: subcategory_collaborative_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Store periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Store periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log. Use asynchronous compaction and retain enough history to satisfy product requirements. Separate current-state reads from historical audit/version queries.",
        detailedAnswer: "**Direct answer:**\n\nStore periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log. Use asynchronous compaction and retain enough history to satisfy product requirements. Separate current-state reads from historical audit/version queries.\n\n**Example:**\n\nPersist periodic document snapshots plus a compact edit log. If the document has 50,000 edits, a snapshot can avoid replaying the entire history on every open while the edit log remains available for recovery or version history.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Google Docs-style collaborative document editor.", "What problem do Operational Transformation and CRDTs solve?", "How would you find nearby drivers efficiently without scanning every driver?"],
        tags: ["system-design", "collaborative-systems"],
        isPublished: true,
        seoTitle: "How would you persist document state and edit history efficiently - Interview Question",
        seoDescription: "Store periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log. Use asynchronous compaction ."
      },
      create: {
        question: "How would you persist document state and edit history efficiently?",
        slug: "how-would-you-persist-document-state-and-edit-history-efficiently",
        categoryId: category.id,
        subcategoryId: subcategory_collaborative_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Store periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Store periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log. Use asynchronous compaction and retain enough history to satisfy product requirements. Separate current-state reads from historical audit/version queries.",
        detailedAnswer: "**Direct answer:**\n\nStore periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log. Use asynchronous compaction and retain enough history to satisfy product requirements. Separate current-state reads from historical audit/version queries.\n\n**Example:**\n\nPersist periodic document snapshots plus a compact edit log. If the document has 50,000 edits, a snapshot can avoid replaying the entire history on every open while the edit log remains available for recovery or version history.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Design a Google Docs-style collaborative document editor.", "What problem do Operational Transformation and CRDTs solve?", "How would you find nearby drivers efficiently without scanning every driver?"],
        tags: ["system-design", "collaborative-systems"],
        isPublished: true,
        seoTitle: "How would you persist document state and edit history efficiently - Interview Question",
        seoDescription: "Store periodic document snapshots plus compact edit operations rather than reconstructing every version from an unbounded log. Use asynchronous compaction ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 60: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-do-distributed-systems-need-consensus-algorithms-such-as-raft-or-paxos" },
      update: {
        question: "Why do distributed systems need consensus algorithms such as Raft or Paxos?",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_consensus.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Consensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Consensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays. Raft and Paxos are protocols for reaching agreement under defined failure assumptions. They are useful for replicated state machines, leader election, and metadata that must remain consistent across nodes.",
        detailedAnswer: "**Direct answer:**\n\nConsensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays. Raft and Paxos are protocols for reaching agreement under defined failure assumptions. They are useful for replicated state machines, leader election, and metadata that must remain consistent across nodes.\n\n**Example:**\n\nThree replicas need to agree on which leader is authoritative before accepting a sequence of state changes. A consensus protocol such as Raft provides a defined way to elect a leader and replicate a log despite failures, subject to its fault assumptions.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["When do you need a distributed lock, and what failure modes must you handle?", "How would you design a highly available distributed key-value store?", "Design logging, metrics, tracing, and monitoring for a large distributed system."],
        tags: ["system-design", "distributed-consensus"],
        isPublished: true,
        seoTitle: "Why do distributed systems need consensus algorithms such as Raft - Interview Question",
        seoDescription: "Consensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays. Raft and Paxos are protocols for reaching agr."
      },
      create: {
        question: "Why do distributed systems need consensus algorithms such as Raft or Paxos?",
        slug: "why-do-distributed-systems-need-consensus-algorithms-such-as-raft-or-paxos",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_consensus.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Consensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Consensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays. Raft and Paxos are protocols for reaching agreement under defined failure assumptions. They are useful for replicated state machines, leader election, and metadata that must remain consistent across nodes.",
        detailedAnswer: "**Direct answer:**\n\nConsensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays. Raft and Paxos are protocols for reaching agreement under defined failure assumptions. They are useful for replicated state machines, leader election, and metadata that must remain consistent across nodes.\n\n**Example:**\n\nThree replicas need to agree on which leader is authoritative before accepting a sequence of state changes. A consensus protocol such as Raft provides a defined way to elect a leader and replicate a log despite failures, subject to its fault assumptions.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["When do you need a distributed lock, and what failure modes must you handle?", "How would you design a highly available distributed key-value store?", "Design logging, metrics, tracing, and monitoring for a large distributed system."],
        tags: ["system-design", "distributed-consensus"],
        isPublished: true,
        seoTitle: "Why do distributed systems need consensus algorithms such as Raft - Interview Question",
        seoDescription: "Consensus lets distributed nodes agree on a value or ordered log despite certain failures and message delays. Raft and Paxos are protocols for reaching agr."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 61: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "what-problem-does-leader-election-solve" },
      update: {
        question: "What problem does leader election solve?",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_consensus.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Leader election selects one node to coordinate writes or other serialized decisions.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Leader election selects one node to coordinate writes or other serialized decisions. A robust protocol uses terms/epochs and majority-based agreement so an old leader cannot continue safely after losing authority. The exact mechanics depend on the consensus protocol.",
        detailedAnswer: "**Direct answer:**\n\nLeader election selects one node to coordinate writes or other serialized decisions. A robust protocol uses terms/epochs and majority-based agreement so an old leader cannot continue safely after losing authority. The exact mechanics depend on the consensus protocol.\n\n**Example:**\n\nIf the current leader crashes, followers start an election and one eligible node becomes the new leader. Clients then route writes to the new leader instead of allowing multiple nodes to independently accept conflicting commands.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "What problem do Operational Transformation and CRDTs solve?", "What is a reverse proxy and what problems does it solve?"],
        tags: ["system-design", "distributed-consensus"],
        isPublished: true,
        seoTitle: "What problem does leader election solve - Interview Question",
        seoDescription: "Leader election selects one node to coordinate writes or other serialized decisions. A robust protocol uses terms/epochs and majority-based agreement so an."
      },
      create: {
        question: "What problem does leader election solve?",
        slug: "what-problem-does-leader-election-solve",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_consensus.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Leader election selects one node to coordinate writes or other serialized decisions.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Leader election selects one node to coordinate writes or other serialized decisions. A robust protocol uses terms/epochs and majority-based agreement so an old leader cannot continue safely after losing authority. The exact mechanics depend on the consensus protocol.",
        detailedAnswer: "**Direct answer:**\n\nLeader election selects one node to coordinate writes or other serialized decisions. A robust protocol uses terms/epochs and majority-based agreement so an old leader cannot continue safely after losing authority. The exact mechanics depend on the consensus protocol.\n\n**Example:**\n\nIf the current leader crashes, followers start an election and one eligible node becomes the new leader. Clients then route writes to the new leader instead of allowing multiple nodes to independently accept conflicting commands.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "What problem do Operational Transformation and CRDTs solve?", "What is a reverse proxy and what problems does it solve?"],
        tags: ["system-design", "distributed-consensus"],
        isPublished: true,
        seoTitle: "What problem does leader election solve - Interview Question",
        seoDescription: "Leader election selects one node to coordinate writes or other serialized decisions. A robust protocol uses terms/epochs and majority-based agreement so an."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 62: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-design-an-active-active-service-across-two-regions" },
      update: {
        question: "How would you design an active-active service across two regions?",
        categoryId: category.id,
        subcategoryId: subcategory_multi_region_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Both regions accept traffic, with global routing directing users to healthy regions.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Both regions accept traffic, with global routing directing users to healthy regions. The design must specify data ownership, replication, conflict resolution, failover, and consistency guarantees. Stateless compute is straightforward to make active-active; multi-writer data is the difficult part.",
        detailedAnswer: "**Direct answer:**\n\nBoth regions accept traffic, with global routing directing users to healthy regions. The design must specify data ownership, replication, conflict resolution, failover, and consistency guarantees. Stateless compute is straightforward to make active-active; multi-writer data is the difficult part.\n\n**Example:**\n\nRun the service in Region A and Region B with independent compute capacity and replicated data. Global traffic management sends users to a healthy region, while writes use a clearly defined conflict and ownership strategy rather than assuming two independent primaries will always agree.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "How would you stop one slow downstream service from blocking every incoming request?", "How can one slow downstream service cause a cascading failure?"],
        tags: ["system-design", "multi-region-systems"],
        isPublished: true,
        seoTitle: "How would you design an active-active service across two regions - Interview Question",
        seoDescription: "Both regions accept traffic, with global routing directing users to healthy regions. The design must specify data ownership, replication, conflict resoluti."
      },
      create: {
        question: "How would you design an active-active service across two regions?",
        slug: "how-would-you-design-an-active-active-service-across-two-regions",
        categoryId: category.id,
        subcategoryId: subcategory_multi_region_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Both regions accept traffic, with global routing directing users to healthy regions.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Both regions accept traffic, with global routing directing users to healthy regions. The design must specify data ownership, replication, conflict resolution, failover, and consistency guarantees. Stateless compute is straightforward to make active-active; multi-writer data is the difficult part.",
        detailedAnswer: "**Direct answer:**\n\nBoth regions accept traffic, with global routing directing users to healthy regions. The design must specify data ownership, replication, conflict resolution, failover, and consistency guarantees. Stateless compute is straightforward to make active-active; multi-writer data is the difficult part.\n\n**Example:**\n\nRun the service in Region A and Region B with independent compute capacity and replicated data. Global traffic management sends users to a healthy region, while writes use a clearly defined conflict and ownership strategy rather than assuming two independent primaries will always agree.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["A network partition separates two active regions. What behavior and consistency trade-off do you choose?", "How would you stop one slow downstream service from blocking every incoming request?", "How can one slow downstream service cause a cascading failure?"],
        tags: ["system-design", "multi-region-systems"],
        isPublished: true,
        seoTitle: "How would you design an active-active service across two regions - Interview Question",
        seoDescription: "Both regions accept traffic, with global routing directing users to healthy regions. The design must specify data ownership, replication, conflict resoluti."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 63: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "a-network-partition-separates-two-active-regions-what-behavior-and-consistency-trade-off-do-you-choose" },
      update: {
        question: "A network partition separates two active regions. What behavior and consistency trade-off do you choose?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "First define which operations can continue independently and which require cross-region agreement.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "First define which operations can continue independently and which require cross-region agreement. A consistency-first design may reject conflicting writes during the partition; an availability-first design may accept writes and reconcile conflicts later. The choice should be tied to business semantics rather than a generic preference.",
        detailedAnswer: "**Direct answer:**\n\nFirst define which operations can continue independently and which require cross-region agreement. A consistency-first design may reject conflicting writes during the partition; an availability-first design may accept writes and reconcile conflicts later. The choice should be tied to business semantics rather than a generic preference.\n\n**Example:**\n\nIf Region A and Region B cannot communicate, an active-active design must choose behavior. A low-risk profile update may accept writes in both regions and reconcile later; an inventory reservation may instead reject one side to prevent overselling.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Explain CAP theorem using a distributed database during a network partition.", "How would you design an active-active service across two regions?", "How would you partition a ride-sharing system geographically at large scale?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "A network partition separates two active regions. What behavior a - Interview Question",
        seoDescription: "First define which operations can continue independently and which require cross-region agreement. A consistency-first design may reject conflicting writes."
      },
      create: {
        question: "A network partition separates two active regions. What behavior and consistency trade-off do you choose?",
        slug: "a-network-partition-separates-two-active-regions-what-behavior-and-consistency-trade-off-do-you-choose",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "First define which operations can continue independently and which require cross-region agreement.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "First define which operations can continue independently and which require cross-region agreement. A consistency-first design may reject conflicting writes during the partition; an availability-first design may accept writes and reconcile conflicts later. The choice should be tied to business semantics rather than a generic preference.",
        detailedAnswer: "**Direct answer:**\n\nFirst define which operations can continue independently and which require cross-region agreement. A consistency-first design may reject conflicting writes during the partition; an availability-first design may accept writes and reconcile conflicts later. The choice should be tied to business semantics rather than a generic preference.\n\n**Example:**\n\nIf Region A and Region B cannot communicate, an active-active design must choose behavior. A low-risk profile update may accept writes in both regions and reconcile later; an inventory reservation may instead reject one side to prevent overselling.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Explain CAP theorem using a distributed database during a network partition.", "How would you design an active-active service across two regions?", "How would you partition a ride-sharing system geographically at large scale?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "A network partition separates two active regions. What behavior a - Interview Question",
        seoDescription: "First define which operations can continue independently and which require cross-region agreement. A consistency-first design may reject conflicting writes."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 64: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-can-one-slow-downstream-service-cause-a-cascading-failure" },
      update: {
        question: "How can one slow downstream service cause a cascading failure?",
        categoryId: category.id,
        subcategoryId: subcategory_resilience_and_reliability.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.",
        detailedAnswer: "**Direct answer:**\n\nBound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.\n\n**Example:**\n\nA checkout service waits on a slow inventory dependency while holding threads and connections. As more requests queue behind it, the checkout service exhausts its own resources, causing unrelated operations to fail\u2014the classic shape of a cascading failure.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How would you stop one slow downstream service from blocking every incoming request?", "When do you need a distributed lock, and what failure modes must you handle?", "How do timeouts, retries, circuit breakers, bulkheads, and queues work together?"],
        tags: ["system-design", "resilience-and-reliability"],
        isPublished: true,
        seoTitle: "How can one slow downstream service cause a cascading failure - Interview Question",
        seoDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests."
      },
      create: {
        question: "How can one slow downstream service cause a cascading failure?",
        slug: "how-can-one-slow-downstream-service-cause-a-cascading-failure",
        categoryId: category.id,
        subcategoryId: subcategory_resilience_and_reliability.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.",
        detailedAnswer: "**Direct answer:**\n\nBound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests consume threads/connections, causing upstream queues to grow and eventually exhausting resources across the system.\n\n**Example:**\n\nA checkout service waits on a slow inventory dependency while holding threads and connections. As more requests queue behind it, the checkout service exhausts its own resources, causing unrelated operations to fail\u2014the classic shape of a cascading failure.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["How would you stop one slow downstream service from blocking every incoming request?", "When do you need a distributed lock, and what failure modes must you handle?", "How do timeouts, retries, circuit breakers, bulkheads, and queues work together?"],
        tags: ["system-design", "resilience-and-reliability"],
        isPublished: true,
        seoTitle: "How can one slow downstream service cause a cascading failure - Interview Question",
        seoDescription: "Bound downstream work with timeouts, concurrency limits, circuit breakers, bulkheads, queues, and sensible retry policies. Without limits, blocked requests."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 65: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-do-timeouts-retries-circuit-breakers-bulkheads-and-queues-work-together" },
      update: {
        question: "How do timeouts, retries, circuit breakers, bulkheads, and queues work together?",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Timeouts cap how long a caller waits.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Timeouts cap how long a caller waits. Retries can recover transient failures but amplify load, so they need bounded attempts and backoff with jitter. Circuit breakers stop repeated calls to an unhealthy dependency, bulkheads isolate resource pools, and queues move acceptable work out of the request path. Together they prevent a local slowdown from consuming the entire system.",
        detailedAnswer: "**Direct answer:**\n\nTimeouts cap how long a caller waits. Retries can recover transient failures but amplify load, so they need bounded attempts and backoff with jitter. Circuit breakers stop repeated calls to an unhealthy dependency, bulkheads isolate resource pools, and queues move acceptable work out of the request path. Together they prevent a local slowdown from consuming the entire system.\n\n**Example:**\n\nUse a short timeout to bound waiting, a circuit breaker to stop repeatedly calling a failing dependency, bulkheads to isolate resource pools, retries only for transient and safe operations, and queues when work can be processed asynchronously.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["When do you need a distributed lock, and what failure modes must you handle?", "How can one slow downstream service cause a cascading failure?", "How would you handle message ordering, retries, and delivery status?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How do timeouts, retries, circuit breakers, bulkheads, and queues - Interview Question",
        seoDescription: "Timeouts cap how long a caller waits. Retries can recover transient failures but amplify load, so they need bounded attempts and backoff with jitter. Circu."
      },
      create: {
        question: "How do timeouts, retries, circuit breakers, bulkheads, and queues work together?",
        slug: "how-do-timeouts-retries-circuit-breakers-bulkheads-and-queues-work-together",
        categoryId: category.id,
        subcategoryId: subcategory_messaging_systems.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Timeouts cap how long a caller waits.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Timeouts cap how long a caller waits. Retries can recover transient failures but amplify load, so they need bounded attempts and backoff with jitter. Circuit breakers stop repeated calls to an unhealthy dependency, bulkheads isolate resource pools, and queues move acceptable work out of the request path. Together they prevent a local slowdown from consuming the entire system.",
        detailedAnswer: "**Direct answer:**\n\nTimeouts cap how long a caller waits. Retries can recover transient failures but amplify load, so they need bounded attempts and backoff with jitter. Circuit breakers stop repeated calls to an unhealthy dependency, bulkheads isolate resource pools, and queues move acceptable work out of the request path. Together they prevent a local slowdown from consuming the entire system.\n\n**Example:**\n\nUse a short timeout to bound waiting, a circuit breaker to stop repeatedly calling a failing dependency, bulkheads to isolate resource pools, retries only for transient and safe operations, and queues when work can be processed asynchronously.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["When do you need a distributed lock, and what failure modes must you handle?", "How can one slow downstream service cause a cascading failure?", "How would you handle message ordering, retries, and delivery status?"],
        tags: ["system-design", "messaging-systems"],
        isPublished: true,
        seoTitle: "How do timeouts, retries, circuit breakers, bulkheads, and queues - Interview Question",
        seoDescription: "Timeouts cap how long a caller waits. Retries can recover transient failures but amplify load, so they need bounded attempts and backoff with jitter. Circu."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 66: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-migrate-a-very-large-production-database-without-downtime" },
      update: {
        question: "How would you migrate a very large production database without downtime?",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backfill incrementally, validate, switch reads/writes, and remove the old representation only after all old application versions are gone.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backfill incrementally, validate, switch reads/writes, and remove the old representation only after all old application versions are gone. Throttle backfills and monitor replication, locks, latency, and error rates.",
        detailedAnswer: "For a very large production database, I would use an expand-and-contract migration rather than stopping the application and performing a long blocking migration.\n\nThe main principle is to make schema and application changes backward compatible so old and new application versions can coexist during the migration.\n\nSuppose we want to rename:\ncustomer.name\n\nto:\ncustomer.display_name\n\nI would not immediately rename or drop the old column while production traffic is active.\n\nPhase 1: Expand\nAdd the new column:\ndisplay_name\n\nAdding the column should be performed using an online/non-blocking mechanism supported by the specific database and version, and I would verify its locking behavior before production.\n\nPhase 2: Backward-compatible application deployment\nDeploy code that can work with both columns. New writes can populate both fields.\n\nFor example:\nwrite name = value\ndisplay_name = value\n\nThe application should remain compatible with the old schema because multiple application instances may run different versions during deployment.\n\nPhase 3: Backfill\nCopy existing data in controlled batches:\n\nUPDATE customer\nSET display_name = name\nWHERE ...\nLIMIT batch_size\n\nThe exact SQL depends on the database because LIMIT-based updates may not be appropriate everywhere. I would use stable primary-key ranges or another indexed batching strategy.\n\nThe backfill should:\n- Run in small transactions.\n- Throttle itself.\n- Monitor database CPU, I/O, locks, replication lag, and application latency.\n- Be restartable and idempotent.\n\nPhase 4: Verify\nCompare old and new columns, ideally using checksums/counts or targeted consistency checks. Monitor the new application behavior.\n\nPhase 5: Read from the new column\nOnce the new column is populated and verified, deploy code that reads from display_name.\n\nPhase 6: Stop writing the old column\nAfter all application instances use the new field and the rollback window has passed, stop maintaining the old column.\n\nPhase 7: Contract\nOnly later remove the old column, again using an online migration mechanism where possible.\n\nFor extremely large tables, I would also consider dual writes, change-data-capture, online schema-change tooling, partitioning, or creating a new table and incrementally synchronizing it depending on the migration.\n\nFor database-engine changes or migrations between database technologies, the architecture may look like:\n\nProduction DB\n     |\n     | CDC / replication\n     v\nNew DB\n     |\n     v\nValidation\n     |\n     v\nControlled traffic switch\n\nBefore the cutover, I would verify row counts, checksums, important business queries, indexes, constraints, performance, and replication lag.\n\nThe cutover should be short and reversible. For example, switch application configuration or routing so new requests use the new database. If validation fails, route traffic back to the old system according to the rollback plan.\n\nI would also prepare for dual-write inconsistencies. If both databases receive writes during migration, partial failures can leave them different. This is why CDC, reconciliation, idempotency, and explicit ownership of the source of truth are important.\n\nImportant production safeguards:\n- Take and verify backups before migration.\n- Test the exact migration against production-scale data.\n- Measure locks and query plans.\n- Monitor replication lag.\n- Have a rollback strategy.\n- Avoid large unbounded transactions.\n- Schedule expensive backfills during lower-load periods when possible.\n- Keep schema changes backward compatible.\n\nInterview takeaway: for large zero-downtime migrations, use expand-and-contract: add new structures, deploy backward-compatible code, backfill incrementally, validate, switch reads/writes, and remove old structures only after the migration is proven stable.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you shard a database and choose a shard key?", "Why replicate a database, and what problems can occur when reads use replicas?", "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "How would you migrate a very large production database without do - Interview Question",
        seoDescription: "Use an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backf."
      },
      create: {
        question: "How would you migrate a very large production database without downtime?",
        slug: "how-would-you-migrate-a-very-large-production-database-without-downtime",
        categoryId: category.id,
        subcategoryId: subcategory_databases_and_consistency.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Use an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backfill incrementally, validate, switch reads/writes, and remove the old representation only after all old application versions are gone.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Use an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backfill incrementally, validate, switch reads/writes, and remove the old representation only after all old application versions are gone. Throttle backfills and monitor replication, locks, latency, and error rates.",
        detailedAnswer: "For a very large production database, I would use an expand-and-contract migration rather than stopping the application and performing a long blocking migration.\n\nThe main principle is to make schema and application changes backward compatible so old and new application versions can coexist during the migration.\n\nSuppose we want to rename:\ncustomer.name\n\nto:\ncustomer.display_name\n\nI would not immediately rename or drop the old column while production traffic is active.\n\nPhase 1: Expand\nAdd the new column:\ndisplay_name\n\nAdding the column should be performed using an online/non-blocking mechanism supported by the specific database and version, and I would verify its locking behavior before production.\n\nPhase 2: Backward-compatible application deployment\nDeploy code that can work with both columns. New writes can populate both fields.\n\nFor example:\nwrite name = value\ndisplay_name = value\n\nThe application should remain compatible with the old schema because multiple application instances may run different versions during deployment.\n\nPhase 3: Backfill\nCopy existing data in controlled batches:\n\nUPDATE customer\nSET display_name = name\nWHERE ...\nLIMIT batch_size\n\nThe exact SQL depends on the database because LIMIT-based updates may not be appropriate everywhere. I would use stable primary-key ranges or another indexed batching strategy.\n\nThe backfill should:\n- Run in small transactions.\n- Throttle itself.\n- Monitor database CPU, I/O, locks, replication lag, and application latency.\n- Be restartable and idempotent.\n\nPhase 4: Verify\nCompare old and new columns, ideally using checksums/counts or targeted consistency checks. Monitor the new application behavior.\n\nPhase 5: Read from the new column\nOnce the new column is populated and verified, deploy code that reads from display_name.\n\nPhase 6: Stop writing the old column\nAfter all application instances use the new field and the rollback window has passed, stop maintaining the old column.\n\nPhase 7: Contract\nOnly later remove the old column, again using an online migration mechanism where possible.\n\nFor extremely large tables, I would also consider dual writes, change-data-capture, online schema-change tooling, partitioning, or creating a new table and incrementally synchronizing it depending on the migration.\n\nFor database-engine changes or migrations between database technologies, the architecture may look like:\n\nProduction DB\n     |\n     | CDC / replication\n     v\nNew DB\n     |\n     v\nValidation\n     |\n     v\nControlled traffic switch\n\nBefore the cutover, I would verify row counts, checksums, important business queries, indexes, constraints, performance, and replication lag.\n\nThe cutover should be short and reversible. For example, switch application configuration or routing so new requests use the new database. If validation fails, route traffic back to the old system according to the rollback plan.\n\nI would also prepare for dual-write inconsistencies. If both databases receive writes during migration, partial failures can leave them different. This is why CDC, reconciliation, idempotency, and explicit ownership of the source of truth are important.\n\nImportant production safeguards:\n- Take and verify backups before migration.\n- Test the exact migration against production-scale data.\n- Measure locks and query plans.\n- Monitor replication lag.\n- Have a rollback strategy.\n- Avoid large unbounded transactions.\n- Schedule expensive backfills during lower-load periods when possible.\n- Keep schema changes backward compatible.\n\nInterview takeaway: for large zero-downtime migrations, use expand-and-contract: add new structures, deploy backward-compatible code, backfill incrementally, validate, switch reads/writes, and remove old structures only after the migration is proven stable.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you shard a database and choose a shard key?", "Why replicate a database, and what problems can occur when reads use replicas?", "A shortened URL becomes extremely popular. How would you keep redirects fast and protect the database?"],
        tags: ["system-design", "databases-and-consistency"],
        isPublished: true,
        seoTitle: "How would you migrate a very large production database without do - Interview Question",
        seoDescription: "Use an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backf."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 67: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "why-is-expand-and-contract-useful-when-old-and-new-application-versions-coexist" },
      update: {
        question: "Why is expand-and-contract useful when old and new application versions coexist?",
        categoryId: category.id,
        subcategoryId: subcategory_database_migration.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Expand adds new schema/code paths while keeping old versions functional.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Expand adds new schema/code paths while keeping old versions functional. Migrate or backfill data, switch traffic gradually, then contract by removing obsolete columns and code after compatibility is no longer required. This supports rolling deployments where old and new application instances coexist.",
        detailedAnswer: "**Direct answer:**\n\nExpand adds new schema/code paths while keeping old versions functional. Migrate or backfill data, switch traffic gradually, then contract by removing obsolete columns and code after compatibility is no longer required. This supports rolling deployments where old and new application instances coexist.\n\n**Example:**\n\nDuring a column rename, first add the new column, then deploy code that can read/write both old and new columns, backfill existing rows, switch all traffic to the new field, and only later remove the old column after old application versions are gone.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?", "Why replicate a database, and what problems can occur when reads use replicas?"],
        tags: ["system-design", "database-migration"],
        isPublished: true,
        seoTitle: "Why is expand-and-contract useful when old and new application ve - Interview Question",
        seoDescription: "Expand adds new schema/code paths while keeping old versions functional. Migrate or backfill data, switch traffic gradually, then contract by removing obso."
      },
      create: {
        question: "Why is expand-and-contract useful when old and new application versions coexist?",
        slug: "why-is-expand-and-contract-useful-when-old-and-new-application-versions-coexist",
        categoryId: category.id,
        subcategoryId: subcategory_database_migration.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "MEDIUM",
        interviewType: "TECHNICAL",
        shortDescription: "Expand adds new schema/code paths while keeping old versions functional.",
        explanation: "Conceptual questions expose gaps in first principles and show whether the candidate can reason from underlying system behavior.",
        sampleAnswer: "Expand adds new schema/code paths while keeping old versions functional. Migrate or backfill data, switch traffic gradually, then contract by removing obsolete columns and code after compatibility is no longer required. This supports rolling deployments where old and new application instances coexist.",
        detailedAnswer: "**Direct answer:**\n\nExpand adds new schema/code paths while keeping old versions functional. Migrate or backfill data, switch traffic gradually, then contract by removing obsolete columns and code after compatibility is no longer required. This supports rolling deployments where old and new application instances coexist.\n\n**Example:**\n\nDuring a column rename, first add the new column, then deploy code that can read/write both old and new columns, backfill existing rows, switch all traffic to the new field, and only later remove the old column after old application versions are gone.",
        keyPoints: ["Whether the candidate can explain the core concept accurately and connect it to a practical distributed-system decision."],
        commonMistakes: [],
        followUpQuestions: ["How would you migrate a very large production database without downtime?", "How would you shard a database and choose a shard key?", "Why replicate a database, and what problems can occur when reads use replicas?"],
        tags: ["system-design", "database-migration"],
        isPublished: true,
        seoTitle: "Why is expand-and-contract useful when old and new application ve - Interview Question",
        seoDescription: "Expand adds new schema/code paths while keeping old versions functional. Migrate or backfill data, switch traffic gradually, then contract by removing obso."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 68: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "how-would-you-design-a-highly-available-distributed-key-value-store" },
      update: {
        question: "How would you design a highly available distributed key-value store?",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Partition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership changes.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Partition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership changes. The core design needs a partitioning strategy, replication protocol, request routing, failure detection, repair/recovery, and durable storage.",
        detailedAnswer: "A distributed key-value store provides operations such as:\nPUT(key, value)\nGET(key)\nDELETE(key)\n\nFor high availability, the system should continue serving requests even when individual nodes fail.\n\nA high-level architecture is:\n\nClients\n   |\n   v\nRouter / Coordinator\n   |\n   +----------------------+\n   |          |           |\n   v          v           v\nPartition 1 Partition 2 Partition 3\n   |          |           |\n replicas   replicas    replicas\n\nThe first design decision is partitioning. I would use consistent hashing or a logical partition/shard map to distribute keys across nodes.\n\nFor example:\nhash(key) -> partition\n\nEach partition can have multiple replicas:\nPartition 10:\n  Replica A\n  Replica B\n  Replica C\n\nIf one replica fails, another can serve requests.\n\nReplication factor might be 3. The exact consistency model determines how many replicas must acknowledge writes and how reads are performed.\n\nFor stronger consistency, the system may use quorum-style rules or a consensus protocol such as Raft for replicated partitions.\n\nA simplified quorum model is:\nN = 3 replicas\nW = 2 write acknowledgements\nR = 2 read responses\n\nBecause R + W > N, reads and writes have an overlapping replica set, which can support stronger consistency under the appropriate protocol/assumptions. However, quorum arithmetic alone does not guarantee all desired consistency properties; versioning, membership, failure handling, and conflict resolution still matter.\n\nFor strict leader-based consistency, each partition can have a leader:\n\nPartition 1:\nLeader A\nFollowers B, C\n\nWrites go through the leader, which replicates them to followers using the replication protocol. If A fails, a new leader is elected.\n\nRaft-like systems are useful because they provide a well-defined mechanism for leader election, log replication, and membership changes.\n\nData model:\nKeyValue {\n  key,\n  value,\n  version,\n  timestamp/tombstone metadata\n}\n\nVersioning is important because distributed replicas can encounter concurrent updates or delayed messages. A system may use logical versions, sequence numbers, vector clocks, or another conflict-resolution mechanism depending on the consistency model.\n\nDeletes also need special handling. Simply deleting a key locally can allow an old replica to reintroduce it later. A tombstone or deletion version is often required so replicas understand that the key was intentionally deleted.\n\nThe system also needs failure detection and rebalancing. When a node fails:\n1. Detect the failure.\n2. Route requests to healthy replicas.\n3. If necessary, promote another replica.\n4. Re-replicate partitions to restore the desired replication factor.\n5. Rebalance when nodes are added or removed.\n\nFor durability, data should be persisted to disk/WAL rather than relying only on RAM. Periodic snapshots can reduce recovery time.\n\nCaching can improve read latency, but cache invalidation must be coordinated with the chosen consistency model.\n\nThe API should also define behavior under partial failure. For example, if a write cannot achieve the required acknowledgement level, should the system reject it or accept it with weaker durability? That is a business/system-level decision.\n\nMonitoring should cover:\n- Read/write latency.\n- Error rate.\n- Replication lag.\n- Leader elections.\n- Partition distribution.\n- Disk usage.\n- Hot keys.\n- Rebalancing progress.\n- Failed replicas.\n\nA production implementation might therefore use:\n- Consistent hashing/logical partitions for distribution.\n- Replication for fault tolerance.\n- Raft or another consensus mechanism for strongly consistent replicated partitions.\n- WAL and snapshots for durability.\n- Automatic failover and rebalancing.\n- Health checks and monitoring.\n\nInterview takeaway: high availability comes from partitioning plus replication and automated failure handling. The design must explicitly choose its consistency model, durability guarantees, conflict-resolution strategy, and failover behavior.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "Design logging, metrics, tracing, and monitoring for a large distributed system.", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you design a highly available distributed key-value sto - Interview Question",
        seoDescription: "Partition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership ch."
      },
      create: {
        question: "How would you design a highly available distributed key-value store?",
        slug: "how-would-you-design-a-highly-available-distributed-key-value-store",
        categoryId: category.id,
        subcategoryId: subcategory_system_design_fundamentals.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Partition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership changes.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "Partition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership changes. The core design needs a partitioning strategy, replication protocol, request routing, failure detection, repair/recovery, and durable storage.",
        detailedAnswer: "A distributed key-value store provides operations such as:\nPUT(key, value)\nGET(key)\nDELETE(key)\n\nFor high availability, the system should continue serving requests even when individual nodes fail.\n\nA high-level architecture is:\n\nClients\n   |\n   v\nRouter / Coordinator\n   |\n   +----------------------+\n   |          |           |\n   v          v           v\nPartition 1 Partition 2 Partition 3\n   |          |           |\n replicas   replicas    replicas\n\nThe first design decision is partitioning. I would use consistent hashing or a logical partition/shard map to distribute keys across nodes.\n\nFor example:\nhash(key) -> partition\n\nEach partition can have multiple replicas:\nPartition 10:\n  Replica A\n  Replica B\n  Replica C\n\nIf one replica fails, another can serve requests.\n\nReplication factor might be 3. The exact consistency model determines how many replicas must acknowledge writes and how reads are performed.\n\nFor stronger consistency, the system may use quorum-style rules or a consensus protocol such as Raft for replicated partitions.\n\nA simplified quorum model is:\nN = 3 replicas\nW = 2 write acknowledgements\nR = 2 read responses\n\nBecause R + W > N, reads and writes have an overlapping replica set, which can support stronger consistency under the appropriate protocol/assumptions. However, quorum arithmetic alone does not guarantee all desired consistency properties; versioning, membership, failure handling, and conflict resolution still matter.\n\nFor strict leader-based consistency, each partition can have a leader:\n\nPartition 1:\nLeader A\nFollowers B, C\n\nWrites go through the leader, which replicates them to followers using the replication protocol. If A fails, a new leader is elected.\n\nRaft-like systems are useful because they provide a well-defined mechanism for leader election, log replication, and membership changes.\n\nData model:\nKeyValue {\n  key,\n  value,\n  version,\n  timestamp/tombstone metadata\n}\n\nVersioning is important because distributed replicas can encounter concurrent updates or delayed messages. A system may use logical versions, sequence numbers, vector clocks, or another conflict-resolution mechanism depending on the consistency model.\n\nDeletes also need special handling. Simply deleting a key locally can allow an old replica to reintroduce it later. A tombstone or deletion version is often required so replicas understand that the key was intentionally deleted.\n\nThe system also needs failure detection and rebalancing. When a node fails:\n1. Detect the failure.\n2. Route requests to healthy replicas.\n3. If necessary, promote another replica.\n4. Re-replicate partitions to restore the desired replication factor.\n5. Rebalance when nodes are added or removed.\n\nFor durability, data should be persisted to disk/WAL rather than relying only on RAM. Periodic snapshots can reduce recovery time.\n\nCaching can improve read latency, but cache invalidation must be coordinated with the chosen consistency model.\n\nThe API should also define behavior under partial failure. For example, if a write cannot achieve the required acknowledgement level, should the system reject it or accept it with weaker durability? That is a business/system-level decision.\n\nMonitoring should cover:\n- Read/write latency.\n- Error rate.\n- Replication lag.\n- Leader elections.\n- Partition distribution.\n- Disk usage.\n- Hot keys.\n- Rebalancing progress.\n- Failed replicas.\n\nA production implementation might therefore use:\n- Consistent hashing/logical partitions for distribution.\n- Replication for fault tolerance.\n- Raft or another consensus mechanism for strongly consistent replicated partitions.\n- WAL and snapshots for durability.\n- Automatic failover and rebalancing.\n- Health checks and monitoring.\n\nInterview takeaway: high availability comes from partitioning plus replication and automated failure handling. The design must explicitly choose its consistency model, durability guarantees, conflict-resolution strategy, and failover behavior.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "Design logging, metrics, tracing, and monitoring for a large distributed system.", "Design a distributed payment-processing system and prevent duplicate charges."],
        tags: ["system-design", "system-design-fundamentals"],
        isPublished: true,
        seoTitle: "How would you design a highly available distributed key-value sto - Interview Question",
        seoDescription: "Partition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership ch."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 69: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "when-do-you-need-a-distributed-lock-and-what-failure-modes-must-you-handle" },
      update: {
        question: "When do you need a distributed lock, and what failure modes must you handle?",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_coordination.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Use a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Use a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow. A lock needs ownership, expiration/lease semantics, renewal, safe release, and protection against stale owners. Network partitions and process pauses can cause a client to believe it still owns a lock when it does not, so fencing tokens or equivalent safeguards may be necessary.",
        detailedAnswer: "A distributed lock is needed when multiple processes or machines may concurrently access the same shared resource and the business requirement requires mutual exclusion across those machines.\n\nA Java synchronized block is not sufficient in a distributed deployment because it only coordinates threads inside one JVM. If five application instances are running, each JVM can independently enter the synchronized section.\n\nTypical use cases include:\n- Ensuring only one worker runs a singleton scheduled job.\n- Preventing concurrent processing of the same resource when serialization is required.\n- Coordinating a short-lived maintenance operation.\n- Protecting a critical operation where database constraints or optimistic concurrency are not sufficient.\n\nHowever, I would first ask whether a lock is actually necessary. A unique database constraint, atomic UPDATE, optimistic locking, queue partitioning, or idempotency key can often provide stronger and simpler correctness.\n\nImportant failure modes:\n\n1. Lock holder crashes\nIf a process acquires a lock and crashes, the lock cannot remain forever. Use a lease/TTL so ownership eventually expires.\n\n2. Lease expires while the process is still running\nThis is one of the most dangerous cases. Suppose Server A receives a 30-second lease but pauses for 40 seconds. Server B can acquire the lock after 30 seconds while Server A resumes and continues operating as if it still owns the lock.\n\nTherefore, for correctness-critical operations, a lock alone may not be enough.\n\n3. Network partition\nA client may lose communication with the lock service and be unable to determine whether it still owns the lock. Another client may acquire the lock after the original lease expires.\n\n4. Unsafe unlock\nA stale process must not delete another process's lock. Therefore, the lock should contain a unique ownership token and release should verify the token atomically.\n\nConceptually:\nSET lock:resource uniqueToken NX PX 30000\n\nRelease only if:\ncurrentLockToken == myToken\n\nThe comparison and deletion should be atomic, for example through a server-side script.\n\n5. Lock service failure\nIf Redis, ZooKeeper, or another coordination service becomes unavailable, the system must define whether operations should fail, retry, or use another mechanism.\n\n6. Long-running operations\nA fixed TTL may be shorter than the operation. Lease renewal can help, but renewal itself can fail, so the protected resource should not blindly trust an expired lease holder.\n\n7. Clock-related problems\nDistributed systems should avoid relying on unsynchronized local wall clocks for correctness decisions. Lease calculations should be designed around the coordination system's semantics.\n\n8. Fencing problem\nFor high-value resources, use fencing tokens. Each successful lock acquisition gets an increasing token:\nA -> token 10\nB -> token 11\n\nIf A pauses and later resumes, its token 10 is older than B's token 11. The protected resource can reject operations carrying token 10.\n\nThis prevents an old lock holder from modifying the resource after another process has legitimately acquired the lease.\n\nInterview takeaway: use distributed locks only when cross-process mutual exclusion is genuinely required. Handle crashes, lease expiry, network partitions, unsafe unlocks, coordination-service failures, and stale owners. For critical correctness, combine leases with fencing or prefer a stronger transactional/concurrency mechanism.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "How would you design a highly available distributed key-value store?", "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?"],
        tags: ["system-design", "distributed-coordination"],
        isPublished: true,
        seoTitle: "When do you need a distributed lock, and what failure modes must  - Interview Question",
        seoDescription: "Use a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow. A lock needs ."
      },
      create: {
        question: "When do you need a distributed lock, and what failure modes must you handle?",
        slug: "when-do-you-need-a-distributed-lock-and-what-failure-modes-must-you-handle",
        categoryId: category.id,
        subcategoryId: subcategory_distributed_coordination.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "Use a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow.",
        explanation: "Interviewers ask this to test practical reasoning and understand how the candidate would make the decision in a real system.",
        sampleAnswer: "Use a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow. A lock needs ownership, expiration/lease semantics, renewal, safe release, and protection against stale owners. Network partitions and process pauses can cause a client to believe it still owns a lock when it does not, so fencing tokens or equivalent safeguards may be necessary.",
        detailedAnswer: "A distributed lock is needed when multiple processes or machines may concurrently access the same shared resource and the business requirement requires mutual exclusion across those machines.\n\nA Java synchronized block is not sufficient in a distributed deployment because it only coordinates threads inside one JVM. If five application instances are running, each JVM can independently enter the synchronized section.\n\nTypical use cases include:\n- Ensuring only one worker runs a singleton scheduled job.\n- Preventing concurrent processing of the same resource when serialization is required.\n- Coordinating a short-lived maintenance operation.\n- Protecting a critical operation where database constraints or optimistic concurrency are not sufficient.\n\nHowever, I would first ask whether a lock is actually necessary. A unique database constraint, atomic UPDATE, optimistic locking, queue partitioning, or idempotency key can often provide stronger and simpler correctness.\n\nImportant failure modes:\n\n1. Lock holder crashes\nIf a process acquires a lock and crashes, the lock cannot remain forever. Use a lease/TTL so ownership eventually expires.\n\n2. Lease expires while the process is still running\nThis is one of the most dangerous cases. Suppose Server A receives a 30-second lease but pauses for 40 seconds. Server B can acquire the lock after 30 seconds while Server A resumes and continues operating as if it still owns the lock.\n\nTherefore, for correctness-critical operations, a lock alone may not be enough.\n\n3. Network partition\nA client may lose communication with the lock service and be unable to determine whether it still owns the lock. Another client may acquire the lock after the original lease expires.\n\n4. Unsafe unlock\nA stale process must not delete another process's lock. Therefore, the lock should contain a unique ownership token and release should verify the token atomically.\n\nConceptually:\nSET lock:resource uniqueToken NX PX 30000\n\nRelease only if:\ncurrentLockToken == myToken\n\nThe comparison and deletion should be atomic, for example through a server-side script.\n\n5. Lock service failure\nIf Redis, ZooKeeper, or another coordination service becomes unavailable, the system must define whether operations should fail, retry, or use another mechanism.\n\n6. Long-running operations\nA fixed TTL may be shorter than the operation. Lease renewal can help, but renewal itself can fail, so the protected resource should not blindly trust an expired lease holder.\n\n7. Clock-related problems\nDistributed systems should avoid relying on unsynchronized local wall clocks for correctness decisions. Lease calculations should be designed around the coordination system's semantics.\n\n8. Fencing problem\nFor high-value resources, use fencing tokens. Each successful lock acquisition gets an increasing token:\nA -> token 10\nB -> token 11\n\nIf A pauses and later resumes, its token 10 is older than B's token 11. The protected resource can reject operations carrying token 10.\n\nThis prevents an old lock holder from modifying the resource after another process has legitimately acquired the lease.\n\nInterview takeaway: use distributed locks only when cross-process mutual exclusion is genuinely required. Handle crashes, lease expiry, network partitions, unsafe unlocks, coordination-service failures, and stale owners. For critical correctness, combine leases with fencing or prefer a stronger transactional/concurrency mechanism.",
        keyPoints: ["Whether the candidate can explain the concept accurately and apply it to a realistic production scenario."],
        commonMistakes: [],
        followUpQuestions: ["Why do distributed systems need consensus algorithms such as Raft or Paxos?", "How would you design a highly available distributed key-value store?", "Why might Redis be used for distributed rate limiting, and what happens if Redis is unavailable?"],
        tags: ["system-design", "distributed-coordination"],
        isPublished: true,
        seoTitle: "When do you need a distributed lock, and what failure modes must  - Interview Question",
        seoDescription: "Use a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow. A lock needs ."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 70: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await prisma.interviewQuestion.upsert({
      where: { slug: "design-logging-metrics-tracing-and-monitoring-for-a-large-distributed-system" },
      update: {
        question: "Design logging, metrics, tracing, and monitoring for a large distributed system.",
        categoryId: category.id,
        subcategoryId: subcategory_observability.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "I would design observability around logs, metrics, and distributed traces.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "I would design observability around logs, metrics, and distributed traces. Services should emit structured logs and propagate a correlation or trace ID across service boundaries. Metrics should cover request rate, latency, errors, saturation, and important business signals; traces should show the path of a request across services. I would add SLO-based alerting, dashboards, sampling and cardinality controls, retention policies, access controls, and a failure strategy for the observability pipeline itself. At large scale, cost and data volume are first-class design constraints.",
        detailedAnswer: "**Direct answer:**\n\nI would design observability around logs, metrics, and distributed traces. Services should emit structured logs and propagate a correlation or trace ID across service boundaries. Metrics should cover request rate, latency, errors, saturation, and important business signals; traces should show the path of a request across services. I would add SLO-based alerting, dashboards, sampling and cardinality controls, retention policies, access controls, and a failure strategy for the observability pipeline itself. At large scale, cost and data volume are first-class design constraints.\n\n**Example:**\n\nInstrument an order request with a trace ID and propagate it through the API gateway, checkout, inventory, payment, and database calls. Metrics show latency and error rates, logs provide event details, and traces reveal which downstream span is responsible for a slow request.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you design a highly available distributed key-value store?", "How would you implement a distributed rate limiter across multiple application servers?", "When do you need a distributed lock, and what failure modes must you handle?"],
        tags: ["system-design", "observability"],
        isPublished: true,
        seoTitle: "Design logging, metrics, tracing, and monitoring for a large dist - Interview Question",
        seoDescription: "I would design observability around logs, metrics, and distributed traces. Services should emit structured logs and propagate a correlation or trace ID acr."
      },
      create: {
        question: "Design logging, metrics, tracing, and monitoring for a large distributed system.",
        slug: "design-logging-metrics-tracing-and-monitoring-for-a-large-distributed-system",
        categoryId: category.id,
        subcategoryId: subcategory_observability.id,
        experienceLevel: "EXPERIENCED",
        difficulty: "HARD",
        interviewType: "TECHNICAL",
        shortDescription: "I would design observability around logs, metrics, and distributed traces.",
        explanation: "System-design questions test how the candidate structures an ambiguous problem and connects architecture choices to real operating constraints.",
        sampleAnswer: "I would design observability around logs, metrics, and distributed traces. Services should emit structured logs and propagate a correlation or trace ID across service boundaries. Metrics should cover request rate, latency, errors, saturation, and important business signals; traces should show the path of a request across services. I would add SLO-based alerting, dashboards, sampling and cardinality controls, retention policies, access controls, and a failure strategy for the observability pipeline itself. At large scale, cost and data volume are first-class design constraints.",
        detailedAnswer: "**Direct answer:**\n\nI would design observability around logs, metrics, and distributed traces. Services should emit structured logs and propagate a correlation or trace ID across service boundaries. Metrics should cover request rate, latency, errors, saturation, and important business signals; traces should show the path of a request across services. I would add SLO-based alerting, dashboards, sampling and cardinality controls, retention policies, access controls, and a failure strategy for the observability pipeline itself. At large scale, cost and data volume are first-class design constraints.\n\n**Example:**\n\nInstrument an order request with a trace ID and propagate it through the API gateway, checkout, inventory, payment, and database calls. Metrics show latency and error rates, logs provide event details, and traces reveal which downstream span is responsible for a slow request.",
        keyPoints: ["Whether the candidate can break the problem into clear components, define the important data flow, and make practical decisions about scaling, reliability, consistency, and failure handling."],
        commonMistakes: [],
        followUpQuestions: ["How would you design a highly available distributed key-value store?", "How would you implement a distributed rate limiter across multiple application servers?", "When do you need a distributed lock, and what failure modes must you handle?"],
        tags: ["system-design", "observability"],
        isPublished: true,
        seoTitle: "Design logging, metrics, tracing, and monitoring for a large dist - Interview Question",
        seoDescription: "I would design observability around logs, metrics, and distributed traces. Services should emit structured logs and propagate a correlation or trace ID acr."
      }
    });
    successCount++;
  } catch (error) {
    failedCount++;
    console.error(`Failed question 71: ${error instanceof Error ? error.message : error}`);
  }

  console.log(`System Design seed completed. Success: ${successCount}, Failed: ${failedCount}`);
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
