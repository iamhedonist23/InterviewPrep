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
        detailedAnswer: "**Direct answer:**\n\nI would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL. Store the mapping in a durable database, cache hot mappings, and put the redirect service behind load balancers. The short key can be generated from a unique numeric ID encoded with Base62. Before choosing storage, I would first clarify expiration, abuse protection, analytics, and availability requirements.\n\n**Example:**\n\nA user submits https://example.com/products/123 and receives /aB7kQ. A later GET /aB7kQ first checks the cache; on a miss it reads the URL mapping from the database, stores the result in cache, and returns an HTTP redirect.",
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
        detailedAnswer: "**Direct answer:**\n\nI would design the service around a write path that creates a unique short key and a read path that resolves that key to the original URL. Store the mapping in a durable database, cache hot mappings, and put the redirect service behind load balancers. The short key can be generated from a unique numeric ID encoded with Base62. Before choosing storage, I would first clarify expiration, abuse protection, analytics, and availability requirements.\n\n**Example:**\n\nA user submits https://example.com/products/123 and receives /aB7kQ. A later GET /aB7kQ first checks the cache; on a miss it reads the URL mapping from the database, stores the result in cache, and returns an HTTP redirect.",
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
        detailedAnswer: "**Direct answer:**\n\nA sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.\n\n**Example:**\n\nIf ID 125000 is assigned to a new URL, Base62 encodes that numeric ID into a short key. With a hash-based design, two different URLs producing the same truncated hash would need collision handling rather than silently overwriting the existing mapping.",
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
        detailedAnswer: "**Direct answer:**\n\nA sequential numeric ID followed by Base62 encoding is simple and avoids collisions when the ID is unique. Hashing a long URL can create collisions unless the hash is sufficiently controlled and collision handling is added. Random keys also require uniqueness checks. In an interview, I would compare predictability, key length, coordination, and collision behavior rather than assuming hashing is automatically better.\n\n**Example:**\n\nIf ID 125000 is assigned to a new URL, Base62 encodes that numeric ID into a short key. With a hash-based design, two different URLs producing the same truncated hash would need collision handling rather than silently overwriting the existing mapping.",
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
        detailedAnswer: "**Direct answer:**\n\nI would treat a viral URL as a hot key. Cache the short-key-to-long-URL mapping close to the redirect service, use CDN/edge caching where appropriate, and protect the database with cache-aside or read-through behavior. Replicas and horizontal scaling can absorb sustained load; request coalescing can reduce a thundering herd when a hot cache entry expires.\n\n**Example:**\n\nSuppose a campaign link suddenly receives 200,000 redirects per second. Keep the mapping for that hot key in Redis or an edge cache, let most requests avoid the primary database, and use request coalescing when the cache entry expires.",
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
        detailedAnswer: "**Direct answer:**\n\nI would treat a viral URL as a hot key. Cache the short-key-to-long-URL mapping close to the redirect service, use CDN/edge caching where appropriate, and protect the database with cache-aside or read-through behavior. Replicas and horizontal scaling can absorb sustained load; request coalescing can reduce a thundering herd when a hot cache entry expires.\n\n**Example:**\n\nSuppose a campaign link suddenly receives 200,000 redirects per second. Keep the mapping for that hot key in Redis or an edge cache, let most requests avoid the primary database, and use request coalescing when the cache entry expires.",
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
        detailedAnswer: "**Direct answer:**\n\nDecide whether duplicate long URLs should return the same short key or receive separate keys. If deduplication is required, enforce it with a normalized URL representation plus a uniqueness constraint. Expiration can be represented by an expiry timestamp, while deletion should define whether the key is permanently invalid or reusable. Avoid reusing keys casually because stale caches and old links can create ambiguity.\n\n**Example:**\n\nIf the same long URL is submitted twice, the service can either return the existing short key or intentionally create a new one. An expired link can return 410 Gone, while an administrator delete can mark the mapping inactive instead of immediately destroying audit data.",
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
        detailedAnswer: "**Direct answer:**\n\nDecide whether duplicate long URLs should return the same short key or receive separate keys. If deduplication is required, enforce it with a normalized URL representation plus a uniqueness constraint. Expiration can be represented by an expiry timestamp, while deletion should define whether the key is permanently invalid or reusable. Avoid reusing keys casually because stale caches and old links can create ambiguity.\n\n**Example:**\n\nIf the same long URL is submitted twice, the service can either return the existing short key or intentionally create a new one. An expired link can return 410 Gone, while an administrator delete can mark the mapping inactive instead of immediately destroying audit data.",
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
        detailedAnswer: "**Direct answer:**\n\nA strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and failure modes, then discuss scaling, consistency, availability, security, observability, and trade-offs.\n\n**Example:**\n\nFor an API limited to 100 requests per minute per user, requests 1\u2013100 are accepted. Request 101 receives a 429 response with a useful retry indication, while the limiter records usage independently of which application server handled the request.",
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
        detailedAnswer: "**Direct answer:**\n\nA strong answer should begin with requirements and scale assumptions, define APIs/data model, propose the high-level architecture, identify bottlenecks and failure modes, then discuss scaling, consistency, availability, security, observability, and trade-offs.\n\n**Example:**\n\nFor an API limited to 100 requests per minute per user, requests 1\u2013100 are accepted. Request 101 receives a 429 response with a useful retry indication, while the limiter records usage independently of which application server handled the request.",
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
        detailedAnswer: "**Direct answer:**\n\nA token bucket has a maximum capacity and a refill rate. Each request consumes one or more tokens; if enough tokens exist, the request is allowed, otherwise it is rejected or delayed. Because tokens accumulate up to the bucket capacity, short bursts can be accepted while the long-term average remains bounded.\n\n**Example:**\n\nA client starts with 10 tokens and sends five requests in a burst. Five tokens are consumed immediately; later requests wait or are rejected until tokens are replenished at the configured rate.",
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
        detailedAnswer: "**Direct answer:**\n\nA token bucket has a maximum capacity and a refill rate. Each request consumes one or more tokens; if enough tokens exist, the request is allowed, otherwise it is rejected or delayed. Because tokens accumulate up to the bucket capacity, short bursts can be accepted while the long-term average remains bounded.\n\n**Example:**\n\nA client starts with 10 tokens and sends five requests in a burst. Five tokens are consumed immediately; later requests wait or are rejected until tokens are replenished at the configured rate.",
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
        detailedAnswer: "**Direct answer:**\n\nToken bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traffic. Choose token bucket when burst tolerance matters and leaky-bucket-style shaping when a steadier output rate is more important.\n\n**Example:**\n\nFor a public API where short bursts are acceptable, token bucket is usually a natural fit. For a worker that must process work at a steady pace, a leaky-bucket-style queue can smooth the output instead of allowing bursts through at once.",
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
        detailedAnswer: "**Direct answer:**\n\nToken bucket controls the allowed rate while permitting bounded bursts; leaky bucket models a queue drained at a relatively fixed rate, which smooths traffic. Choose token bucket when burst tolerance matters and leaky-bucket-style shaping when a steadier output rate is more important.\n\n**Example:**\n\nFor a public API where short bursts are acceptable, token bucket is usually a natural fit. For a worker that must process work at a steady pace, a leaky-bucket-style queue can smooth the output instead of allowing bursts through at once.",
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
        detailedAnswer: "**Direct answer:**\n\nUse a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota. Redis is common because atomic commands/Lua scripts can update counters or token-bucket state. Define the consistency expectation and behavior when the shared limiter is unavailable: fail closed for sensitive APIs or fail open for lower-risk traffic.\n\n**Example:**\n\nWith six API servers, all of them consult the same Redis-backed counter for a user such as user-4821. The request is accepted only when the atomic increment keeps the counter within the configured window, so each server sees the same limit.",
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
        detailedAnswer: "**Direct answer:**\n\nUse a shared state store or an algorithm designed for distributed coordination so multiple application servers enforce the same logical quota. Redis is common because atomic commands/Lua scripts can update counters or token-bucket state. Define the consistency expectation and behavior when the shared limiter is unavailable: fail closed for sensitive APIs or fail open for lower-risk traffic.\n\n**Example:**\n\nWith six API servers, all of them consult the same Redis-backed counter for a user such as user-4821. The request is accepted only when the atomic increment keeps the counter within the configured window, so each server sees the same limit.",
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
        detailedAnswer: "**Direct answer:**\n\nRedis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows. If Redis fails, the design needs an explicit policy: reject requests, temporarily use local limits, or allow traffic with reduced protection. The correct choice depends on the risk of abuse versus the risk of denying legitimate traffic.\n\n**Example:**\n\nIf Redis becomes unavailable, the team must choose deliberately: fail closed for a sensitive login endpoint, fail open for a low-risk read API, or temporarily use a local limiter. The important point is to make the degraded behavior explicit rather than accidentally removing protection.",
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
        detailedAnswer: "**Direct answer:**\n\nRedis provides low-latency shared state and atomic operations suitable for counters, token buckets, and sliding windows. If Redis fails, the design needs an explicit policy: reject requests, temporarily use local limits, or allow traffic with reduced protection. The correct choice depends on the risk of abuse versus the risk of denying legitimate traffic.\n\n**Example:**\n\nIf Redis becomes unavailable, the team must choose deliberately: fail closed for a sensitive login endpoint, fail open for a low-risk read API, or temporarily use a local limiter. The important point is to make the degraded behavior explicit rather than accidentally removing protection.",
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
        detailedAnswer: "**Direct answer:**\n\nUse an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.\n\n**Example:**\n\nA paste service can expose POST /pastes, GET /pastes/{id}, and DELETE /pastes/{id}. Metadata such as owner, created_at, expiry time, and content location can live in a database while the actual text is stored in durable storage when size warrants it.",
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
        detailedAnswer: "**Direct answer:**\n\nUse an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.\n\n**Example:**\n\nA paste service can expose POST /pastes, GET /pastes/{id}, and DELETE /pastes/{id}. Metadata such as owner, created_at, expiry time, and content location can live in a database while the actual text is stored in durable storage when size warrants it.",
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
        detailedAnswer: "**Direct answer:**\n\nSmall, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage. The application can keep metadata and a content object key together, while object storage handles large payload durability and scaling.\n\n**Example:**\n\nFor small snippets such as a 2 KB code sample, a database row may be simplest. For a 20 MB diagnostic log, object storage is a better fit, with the database retaining metadata and a pointer to the object.",
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
        detailedAnswer: "**Direct answer:**\n\nSmall, transactional metadata belongs naturally in a database; large immutable paste bodies are often better suited to object/blob storage. The application can keep metadata and a content object key together, while object storage handles large payload durability and scaling.\n\n**Example:**\n\nFor small snippets such as a 2 KB code sample, a database row may be simplest. For a 20 MB diagnostic log, object storage is a better fit, with the database retaining metadata and a pointer to the object.",
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
        detailedAnswer: "**Direct answer:**\n\nStore an expiresAt timestamp and treat expired content as unavailable. A background worker can asynchronously delete or archive expired objects, while reads still enforce expiration immediately. For large systems, partition cleanup work by time ranges rather than scanning the entire dataset.\n\n**Example:**\n\nA paste created with expires_at=2026-09-20 is served until that time. A background worker periodically finds expired records in batches, deletes or tombstones the content, and removes the associated metadata without requiring a user request to trigger cleanup.",
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
        detailedAnswer: "**Direct answer:**\n\nStore an expiresAt timestamp and treat expired content as unavailable. A background worker can asynchronously delete or archive expired objects, while reads still enforce expiration immediately. For large systems, partition cleanup work by time ranges rather than scanning the entire dataset.\n\n**Example:**\n\nA paste created with expires_at=2026-09-20 is served until that time. A background worker periodically finds expired records in batches, deletes or tombstones the content, and removes the associated metadata without requiring a user request to trigger cleanup.",
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
        detailedAnswer: "**Direct answer:**\n\nUse an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.\n\n**Example:**\n\nGive each account a storage quota, reject uploads that would exceed it, and track usage transactionally. A user with a 100 MB quota who has already stored 96 MB should not be allowed to upload another 10 MB simply because two upload requests arrived at different application servers.",
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
        detailedAnswer: "**Direct answer:**\n\nUse an API that creates and retrieves pastes, a metadata store for IDs, owners, timestamps, visibility and expiration, and durable storage for content. A short random ID or encoded unique ID identifies each paste. Cache frequently read public pastes and enforce size, rate, retention, and abuse limits.\n\n**Example:**\n\nGive each account a storage quota, reject uploads that would exceed it, and track usage transactionally. A user with a 100 MB quota who has already stored 96 MB should not be allowed to upload another 10 MB simply because two upload requests arrived at different application servers.",
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
        detailedAnswer: "**Direct answer:**\n\nCAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consistency and availability for every operation. During the partition, the design must choose which guarantee to sacrifice for the affected operation. CAP is about partitioned distributed systems; it is not simply a three-way feature checklist.\n\n**Example:**\n\nImagine two database replicas lose network connectivity with each other while clients continue writing. A system that favors consistency may reject or delay some writes until it can establish a valid ordering, while a system that favors availability may accept conflicting updates and reconcile them later.",
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
        detailedAnswer: "**Direct answer:**\n\nCAP states that when a network partition prevents nodes from communicating reliably, a distributed system cannot simultaneously guarantee both strong consistency and availability for every operation. During the partition, the design must choose which guarantee to sacrifice for the affected operation. CAP is about partitioned distributed systems; it is not simply a three-way feature checklist.\n\n**Example:**\n\nImagine two database replicas lose network connectivity with each other while clients continue writing. A system that favors consistency may reject or delay some writes until it can establish a valid ordering, while a system that favors availability may accept conflicting updates and reconcile them later.",
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
        detailedAnswer: "**Direct answer:**\n\nReplication improves read capacity and availability and can provide failover options. Read replicas can lag behind the primary, causing stale reads, read-after-write surprises, and inconsistent views across requests. Applications that require read-your-write semantics may route critical reads to the primary or use a consistency mechanism.\n\n**Example:**\n\nA primary database handles writes while read replicas serve reporting queries. If a user changes their email and immediately refreshes a page that reads from a lagging replica, the old email may briefly appear even though the write succeeded.",
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
        detailedAnswer: "**Direct answer:**\n\nReplication improves read capacity and availability and can provide failover options. Read replicas can lag behind the primary, causing stale reads, read-after-write surprises, and inconsistent views across requests. Applications that require read-your-write semantics may route critical reads to the primary or use a consistency mechanism.\n\n**Example:**\n\nA primary database handles writes while read replicas serve reporting queries. If a user changes their email and immediately refreshes a page that reads from a lagging replica, the old email may briefly appear even though the write succeeded.",
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
        detailedAnswer: "**Direct answer:**\n\nChoose a shard key that distributes load evenly while keeping common queries targeted. Avoid monotonically hot keys and values that create one overloaded shard. Evaluate cardinality, query patterns, growth, rebalancing, and whether important transactions span shards.\n\n**Example:**\n\nFor a customer database, shard by customer_id if most queries are scoped to one customer. If one customer is far larger than the rest, add a strategy for hot tenants so a single shard does not become the bottleneck.",
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
        detailedAnswer: "**Direct answer:**\n\nChoose a shard key that distributes load evenly while keeping common queries targeted. Avoid monotonically hot keys and values that create one overloaded shard. Evaluate cardinality, query patterns, growth, rebalancing, and whether important transactions span shards.\n\n**Example:**\n\nFor a customer database, shard by customer_id if most queries are scoped to one customer. If one customer is far larger than the rest, add a strategy for hot tenants so a single shard does not become the bottleneck.",
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
        detailedAnswer: "**Direct answer:**\n\nUse an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backfill incrementally, validate, switch reads/writes, and remove the old representation only after all old application versions are gone. Throttle backfills and monitor replication, locks, latency, and error rates.\n\n**Example:**\n\nFor a multi-terabyte production database, first add backward-compatible schema changes, then copy historical data in batches while production continues. Use change capture or replication to keep the target current, validate it, switch reads/writes gradually, and keep a rollback path.",
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
        detailedAnswer: "**Direct answer:**\n\nUse an expand-and-contract migration: introduce backward-compatible schema changes, deploy code that can read/write both old and new representations, backfill incrementally, validate, switch reads/writes, and remove the old representation only after all old application versions are gone. Throttle backfills and monitor replication, locks, latency, and error rates.\n\n**Example:**\n\nFor a multi-terabyte production database, first add backward-compatible schema changes, then copy historical data in batches while production continues. Use change capture or replication to keep the target current, validate it, switch reads/writes gradually, and keep a rollback path.",
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
        detailedAnswer: "**Direct answer:**\n\nPartition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership changes. The core design needs a partitioning strategy, replication protocol, request routing, failure detection, repair/recovery, and durable storage.\n\n**Example:**\n\nA key-value store can partition keys across nodes, replicate each partition, and route requests using a consistent hashing or partition map. The design must also define what happens when a node fails, a replica is stale, or a partition becomes unavailable.",
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
        detailedAnswer: "**Direct answer:**\n\nPartition keys across nodes, replicate data for availability, define read/write consistency, detect node failures, and rebalance ownership as membership changes. The core design needs a partitioning strategy, replication protocol, request routing, failure detection, repair/recovery, and durable storage.\n\n**Example:**\n\nA key-value store can partition keys across nodes, replicate each partition, and route requests using a consistent hashing or partition map. The design must also define what happens when a node fails, a replica is stale, or a partition becomes unavailable.",
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
        detailedAnswer: "**Direct answer:**\n\nUse a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow. A lock needs ownership, expiration/lease semantics, renewal, safe release, and protection against stale owners. Network partitions and process pauses can cause a client to believe it still owns a lock when it does not, so fencing tokens or equivalent safeguards may be necessary.\n\n**Example:**\n\nA distributed lock can protect a job so only one worker performs a singleton task. The design must consider lock expiry, worker crashes, network partitions, duplicate execution, and fencing or idempotency so an old lock holder cannot safely continue after its lease should have ended.",
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
        detailedAnswer: "**Direct answer:**\n\nUse a distributed lock only when mutual exclusion cannot be achieved more simply through an atomic database operation or idempotent workflow. A lock needs ownership, expiration/lease semantics, renewal, safe release, and protection against stale owners. Network partitions and process pauses can cause a client to believe it still owns a lock when it does not, so fencing tokens or equivalent safeguards may be necessary.\n\n**Example:**\n\nA distributed lock can protect a job so only one worker performs a singleton task. The design must consider lock expiry, worker crashes, network partitions, duplicate execution, and fencing or idempotency so an old lock holder cannot safely continue after its lease should have ended.",
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
