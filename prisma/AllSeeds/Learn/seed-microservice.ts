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
  let deepDive = `Study ${title} as a practical microservices skill, not as a theoretical concept. Begin with the architectural problem it addresses: ${subject}. The critical questions are: what trade‑offs does it introduce (e.g., consistency, latency, complexity), how does it impact development and operations, and what are the fallback strategies when things go wrong?`;

  if (lowerTitle.includes("monolith") || lowerTitle.includes("microservices")) {
    deepDive += " Monolith: single deployable unit, simpler development and testing, but scaling and deployment become bottlenecks. Microservices: independently deployable services, each with its own data store, enabling team autonomy and technology heterogeneity. The trade‑off is increased operational complexity (networking, consistency, observability). Start with a monolith only if you can't justify the complexity—but design with modular boundaries to split later.";
  } else if (lowerTitle.includes("discovery")) {
    deepDive += " Service Discovery is how services find each other. Client‑side discovery (like Eureka, Consul) and server‑side (like Kubernetes Services). Pattern: registry (service registration and health checks). Use load balancing strategies (Round Robin, Random, Weighted). Ensure deregistration of unhealthy instances. In Kubernetes, Services and EndpointSlices provide built‑in discovery.";
  } else if (lowerTitle.includes("gateway")) {
    deepDive += " API Gateway is the entry point for external clients. Handles routing, authentication, rate limiting, caching, and can aggregate responses. Common implementations: Spring Cloud Gateway, Kong, NGINX, AWS API Gateway. It decouples clients from internal service topology. Be careful: it can become a bottleneck or single point of failure—deploy it as a cluster.";
  } else if (lowerTitle.includes("configuration")) {
    deepDive += " Configuration management in microservices: externalize configuration (environment variables, config servers). Use Spring Cloud Config, Consul, or Kubernetes ConfigMaps/Secrets. Refresh configuration without restart using actuator/refresh. Consider dynamic configuration with feature flags (LaunchDarkly). Keep environment‑specific configs separate.";
  } else if (lowerTitle.includes("rest") || lowerTitle.includes("gRPC") || lowerTitle.includes("kafka") || lowerTitle.includes("event-driven")) {
    deepDive += " Communication: REST (HTTP/JSON) is simple and widely used. gRPC (HTTP/2, Protobuf) is efficient for internal services, supports streaming and strong typing. Kafka (message broker) enables async, event‑driven communication—decouples producers and consumers, supports replay and ordering. Choose based on latency, throughput, and coupling needs.";
  } else if (lowerTitle.includes("transactions") || lowerTitle.includes("saga")) {
    deepDive += " Distributed transactions across services are hard. Avoid 2PC (XA) due to performance and blocking. Use Saga pattern: a sequence of local transactions with compensating actions. Coordination: orchestration (centralized controller) or choreography (event‑based). Ensure idempotency and eventual consistency. Design compensating actions to undo or mitigate failures.";
  } else if (lowerTitle.includes("circuit breaker") || lowerTitle.includes("retry") || lowerTitle.includes("rate limit")) {
    deepDive += " Resilience patterns: Circuit Breaker (fail fast, fallback, recover)—implement with Resilience4j, Hystrix. Retry with exponential backoff and jitter to avoid thundering herd. Rate limiting protects services from overload—use token bucket or leaky bucket algorithms. Combine with bulkhead to limit concurrency.";
  } else if (lowerTitle.includes("observability") || lowerTitle.includes("logging") || lowerTitle.includes("tracing")) {
    deepDive += " Observability is essential for microservices. Three pillars: metrics (Prometheus), logging (ELK, Loki), and distributed tracing (Jaeger, Zipkin). Use structured logging (JSON) with correlation IDs. Tracing propagates trace context across services to reconstruct request flow. Dashboards and alerts help detect anomalies. Set SLIs and SLOs.";
  }

  return `## Ultra explanation\n\n${deepDive}\n\n### How to learn it\n1. Define the core concept in one sentence.\n2. Identify the problem it solves and the alternatives.\n3. Understand the implementation trade‑offs (consistency, performance, complexity).\n4. Practice by building a small demo with Spring Boot / Node.js and related tools.\n5. Simulate failure scenarios to understand resilience.\n\n### Interview‑ready checklist\n- Explain the concept without relying on memorised definitions.\n- Describe a real‑world scenario where this pattern is needed.\n- Compare it with alternatives and justify your choice.\n- Mention common pitfalls and how to mitigate them.\n- Show how you would monitor or test this pattern.\n\n### Practice task\nCreate a small demonstration for **${title}** inside the **${module.title}** module of the **${path.name}** path. Write a code snippet or configuration, then simulate a failure and observe the behaviour. Document your findings.`;
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

async function seedMicroservicesCategory() {
  const microservicesCategory: CategorySeed = {
    name: "Microservices",
    slug: "microservices",
    description: "Master microservices architecture: from monolith trade‑offs to service discovery, API gateways, communication patterns, resilience (circuit breaker, retry, rate limiting), distributed transactions (Saga), and observability (logging, tracing).",
    icon: "MICROSERVICES",
    sortOrder: 0,
    paths: [
      {
        name: "Fundamentals",
        slug: "fundamentals",
        description: "Core concepts and patterns in microservices architecture.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Foundations",
            slug: "foundations",
            description: "Monolith vs Microservices, Configuration Management.",
            topics: [
              {
                title: "Monolith vs Microservices – Trade‑offs",
                slug: "monolith-vs-microservices",
                description: "Understanding the architectural decision and its implications.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Monolith Characteristics", content: "Single codebase, single deployable unit. Simpler development, testing, and deployment. Scaling requires scaling the whole app. Technology stack is uniform. Good for early stages or small teams." },
                  { title: "Microservices Characteristics", content: "Independent deployable services, each with its own database. Enables team autonomy, scalable per service, polyglot tech stack. Adds complexity: network latency, distributed data management, observability." },
                  { title: "When to Choose", content: "Start with monolith if uncertain; but design modularly. Migrate to microservices when team size grows, need independent scaling, or multiple teams work on different parts." },
                ],
              },
              {
                title: "Configuration Management in Microservices",
                slug: "config-mgmt",
                description: "Externalizing and managing configuration across environments.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Externalized Configuration", content: "Use environment variables, config files, or config servers (Spring Cloud Config)." },
                  { title: "Refresh and Dynamic Updates", content: "Spring Boot Actuator's /refresh endpoint, or use Spring Cloud Bus for broadcast." },
                  { title: "Feature Flags", content: "Enable/disable features without redeployment. Tools: LaunchDarkly, Flagsmith." },
                ],
              },
            ],
          },
          {
            title: "Service Discovery and API Gateway",
            slug: "discovery-gateway",
            description: "Service registration, discovery, and routing.",
            topics: [
              {
                title: "Service Discovery – Client‑side vs Server‑side",
                slug: "service-discovery",
                description: "Registry, health checks, and load balancing.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Service Registry", content: "Eureka, Consul, Kubernetes Services. Services register themselves, others query for instances." },
                  { title: "Client‑side Discovery", content: "Client (e.g., Ribbon) queries registry and selects instance. More control but client‑side complexity." },
                  { title: "Server‑side Discovery", content: "Proxy (like NGINX, AWS ALB) routes requests. Simpler for clients." },
                ],
              },
              {
                title: "API Gateway – Routing and Cross‑cutting Concerns",
                slug: "api-gateway",
                description: "Authentication, rate limiting, request aggregation.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Gateway Responsibilities", content: "Route requests to appropriate microservices; handle cross‑cutting concerns: authentication, logging, rate limiting, caching." },
                  { title: "Implementations", content: "Spring Cloud Gateway, Kong, AWS API Gateway, NGINX. Use routes and filters." },
                  { title: "Gateway Patterns", content: "Edge service (front end), aggregator (compose responses), or protocol translation." },
                ],
              },
            ],
          },
          {
            title: "Inter‑service Communication",
            slug: "communication",
            description: "REST, gRPC, Kafka, and event‑driven architecture.",
            topics: [
              {
                title: "REST and gRPC – Contrasting Styles",
                slug: "rest-grpc",
                description: "HTTP/JSON vs HTTP/2 Protobuf.",
                estimatedMinutes: 22,
                sections: [
                  { title: "REST", content: "Simple, human‑readable, widely supported. Stateless, uses HTTP verbs. Good for public APIs." },
                  { title: "gRPC", content: "High performance, strongly typed, supports streaming (unary, server/client/bidirectional). Uses Protobuf for serialization. Better for internal services." },
                  { title: "Choice", content: "Use gRPC for low‑latency, high‑throughput internal services; REST for external APIs." },
                ],
              },
              {
                title: "Event‑driven Architecture with Kafka",
                slug: "event-driven-kafka",
                description: "Asynchronous messaging for decoupling.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Kafka Basics", content: "Distributed log, partitioned, persistent. Topics, producers, consumers." },
                  { title: "Event‑driven Benefits", content: "Decouples publishers and subscribers, enables replayability, scales with partitions." },
                  { title: "Use Cases", content: "Order processing, notifications, microservices choreography." },
                ],
              },
            ],
          },
          {
            title: "Resilience and Distributed Transactions",
            slug: "resilience-transactions",
            description: "Circuit Breaker, Retry, Rate Limiting, Distributed Transactions, Saga.",
            topics: [
              {
                title: "Distributed Transactions and the Saga Pattern",
                slug: "saga",
                description: "Managing data consistency across services.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Problem", content: "Two‑Phase Commit (2PC) is blocking and not suitable for microservices." },
                  { title: "Saga Pattern", content: "A sequence of local transactions with compensating actions. Orchestration (centralised) vs Choreography (event‑based)." },
                  { title: "Implementation", content: "Use event‑driven (Kafka) or orchestration frameworks (Camunda, Temporal). Ensure idempotency." },
                ],
              },
              {
                title: "Resilience Patterns – Circuit Breaker, Retry, Rate Limiting",
                slug: "resilience",
                description: "Handling failures and overload.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Circuit Breaker", content: "Prevents cascading failures. States: Closed, Open, Half‑Open. Implement with Resilience4j." },
                  { title: "Retry with Backoff", content: "Exponential backoff with jitter avoids thundering herd. Set max attempts." },
                  { title: "Rate Limiting", content: "Controls request rate to protect services. Token bucket or leaky bucket." },
                ],
              },
            ],
          },
          {
            title: "Observability",
            slug: "observability",
            description: "Distributed logging, tracing, and metrics.",
            topics: [
              {
                title: "Distributed Logging and Tracing",
                slug: "logging-tracing",
                description: "Correlation IDs, structured logging, and distributed tracing.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Structured Logging", content: "Use JSON format with correlation IDs (traceId, spanId). Centralize logs (ELK, Loki)." },
                  { title: "Distributed Tracing", content: "Propagate trace context across services. Tools: Jaeger, Zipkin. Annotate spans." },
                  { title: "Integration", content: "Use OpenTelemetry for vendor‑agnostic instrumentation." },
                ],
              },
              {
                title: "Metrics and Monitoring",
                slug: "metrics",
                description: "Prometheus, Grafana, and SLIs/SLOs.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Key Metrics", content: "Latency, traffic, errors, saturation (USE method)." },
                  { title: "Dashboards", content: "Grafana dashboards to visualise service health." },
                  { title: "Alerting", content: "Alert on SLO breaches (e.g., error rate > 1%)." },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common microservices interview questions and scenario‑based discussions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-interview",
            description: "Design and trade‑offs.",
            topics: [
              {
                title: "How would you migrate from Monolith to Microservices?",
                slug: "migration-strategy",
                description: "Step‑by‑step approach.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Identify Boundaries", content: "Domain‑driven design (DDD) to define bounded contexts." },
                  { title: "Strangler Pattern", content: "Gradually replace monolith functionality with services." },
                  { title: "Database Split", content: "Decouple databases gradually using patterns like shared database, then split." },
                ],
              },
              {
                title: "How to handle eventual consistency?",
                slug: "eventual-consistency",
                description: "Examples and compensation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Eventual Consistency", content: "System becomes consistent over time." },
                  { title: "Techniques", content: "Sagas, compensating transactions, idempotency." },
                  { title: "Monitoring", content: "Check reconciliation jobs." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(microservicesCategory);
  console.log("✅ Microservices category seeded (ultra‑detailed)");
}

async function main() {
  await seedMicroservicesCategory();
}

main()
  .catch((error) => {
    console.error("Microservices seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });