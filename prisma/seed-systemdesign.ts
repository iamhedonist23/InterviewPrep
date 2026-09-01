import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections: Array<{ title: string; content: string }>;
};

type ModuleSeed = {
  title: string;
  slug: string;
  description: string;
  topics: TopicSeed[];
};

type PathSeed = {
  name: string;
  slug: string;
  description: string;
  level: StudyLevel;
  modules: ModuleSeed[];
};

async function ensureCategory(category: {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
}) {
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

      for (const topicSeed of moduleSeed.topics) {
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

        for (let index = 0; index < topicSeed.sections.length; index += 1) {
          const section = topicSeed.sections[index];
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
  const systemDesignCategory = {
    name: "System Design Fundamentals",
    slug: "system-design-fundamentals",
    description: "Learn how scalable systems are structured, partitioned, and reasoned about in production.",
    icon: "SD",
    sortOrder: 8,
    paths: [
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
                title: "Scalability",
                slug: "scalability",
                shortDescription: "Design systems that absorb growth without collapsing.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What scalability means", content: "Handle more traffic/data." },
                  { title: "Vertical vs horizontal scaling", content: "Add power vs add machines." },
                  { title: "Stateless services", content: "Any instance can handle request." },
                  { title: "System boundaries", content: "Define users, traffic." },
                  { title: "Estimating scale", content: "Back-of-envelope math." }
                ]
              },
              {
                title: "Load Balancing and Caching",
                slug: "load-balancing-caching",
                shortDescription: "Distribute work and reduce database load.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Load balancing", content: "Round-robin, least-connections." },
                  { title: "Health checks", content: "Failover." },
                  { title: "Caching layers", content: "Redis, CDN." },
                  { title: "Cache invalidation", content: "TTL, write-through." },
                  { title: "CDNs", content: "Edge caching." }
                ]
              },
              {
                title: "Database Design",
                slug: "system-design-database",
                shortDescription: "Choose between relational and NoSQL, and partition data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Relational vs NoSQL", content: "ACID vs scale." },
                  { title: "CAP theorem", content: "Consistency, Availability, Partition tolerance." },
                  { title: "Partitioning (sharding)", content: "Shard key." },
                  { title: "Replication", content: "Leader-follower." },
                  { title: "Choosing an approach", content: "Start with SQL." }
                ]
              },
            ],
          }
        ],
      },
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Message queues, microservices, and eventual consistency.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Communication and Coordination",
            slug: "system-design-communication",
            description: "Message queues, pub/sub, and RPC.",
            topics: [
              {
                title: "Message Queues",
                slug: "message-queues",
                shortDescription: "Decouple producers and consumers.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Use cases", content: "Background tasks, buffering." },
                  { title: "Queue types", content: "RabbitMQ, Kafka." },
                  { title: "Dead letter queues", content: "Handle failures." }
                ]
              },
              {
                title: "Microservices",
                slug: "microservices",
                shortDescription: "Decentralized services, API gateway.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Pros and cons", content: "Scalability vs complexity." },
                  { title: "Service discovery", content: "Eureka, Consul." },
                  { title: "API Gateway", content: "Routing, rate limiting." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Advanced",
        slug: "advanced",
        description: "Distributed consensus, event sourcing, and data pipelines.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Distributed Systems",
            slug: "distributed-systems",
            description: "Consensus, replication, and eventual consistency.",
            topics: [
              {
                title: "Consensus Algorithms",
                slug: "consensus",
                shortDescription: "Paxos, Raft.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Paxos", content: "Consensus with majority." },
                  { title: "Raft", content: "Easier to understand." },
                  { title: "Leader election", content: "Key component." }
                ]
              },
              {
                title: "Event Sourcing and CQRS",
                slug: "event-sourcing-cqrs",
                shortDescription: "Store events, query via separate models.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Event sourcing", content: "State from events." },
                  { title: "CQRS", content: "Separate read/write models." },
                  { title: "Benefits and tradeoffs", content: "Audit, but complex." }
                ]
              }
            ]
          }
        ],
      },
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common system design interview questions.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "System Design Interview Topics",
            slug: "sd-interview",
            description: "Frequently asked design problems.",
            topics: [
              {
                title: "Design a URL Shortener",
                slug: "sd-url-shortener",
                shortDescription: "Key aspects: hashing, scaling.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Requirements", content: "Shorten, resolve." },
                  { title: "Hashing", content: "Base62." },
                  { title: "Database", content: "Key-value store." },
                  { title: "Scaling", content: "Sharding, caching." }
                ]
              },
              {
                title: "Design a Chat System",
                slug: "sd-chat",
                shortDescription: "Real-time messaging, presence.",
                estimatedMinutes: 26,
                sections: [
                  { title: "WebSockets", content: "Persistent connection." },
                  { title: "Message delivery", content: "Queue per user." },
                  { title: "Scaling", content: "Horizontal scaling." }
                ]
              }
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(systemDesignCategory);
  console.log("✓ System Design Fundamentals category seeded");
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