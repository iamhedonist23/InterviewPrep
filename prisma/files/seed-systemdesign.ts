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
                  { title: "What scalability means", content: "Scalability is about handling more users, more requests, or larger data volume without invalidating the architecture. It often requires deliberate trade-offs in cost, latency, and complexity." },
                  { title: "Vertical vs horizontal scaling", content: "Vertical scaling adds more power (CPU, RAM) to a single machine — simple but has a hard ceiling and a single point of failure. Horizontal scaling adds more machines and distributes load — more complex but nearly unbounded." },
                  { title: "Stateless services", content: "A stateless service doesn't store session data locally between requests, so any instance can handle any request — this is what makes horizontal scaling behind a load balancer straightforward." },
                  { title: "System boundaries", content: "Good system design begins by defining users, traffic shape (read-heavy vs write-heavy), data flow, bottlenecks, and reliability requirements before choosing components." },
                  { title: "Estimating scale (back-of-envelope)", content: "Interviewers expect rough math: e.g. 10M daily active users × 5 requests/day ≈ 50M requests/day ≈ ~580 requests/second average, informing whether a single server or a distributed system is needed." },
                ],
              },
              {
                title: "Load Balancing and Caching",
                slug: "load-balancing-caching",
                shortDescription: "Distribute work and reduce database load.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Load balancing", content: "A load balancer distributes incoming requests across multiple servers. Different strategies (round-robin, least-connections, consistent hashing) suit different workloads and session requirements." },
                  { title: "Health checks and failover", content: "Load balancers continuously health-check backend servers and route traffic away from unhealthy ones, improving availability without manual intervention." },
                  { title: "Caching layers", content: "Caching stores frequently accessed data in memory (e.g. Redis, Memcached, or a CDN for static assets). It reduces database queries and speeds up responses, at the cost of potential staleness." },
                  { title: "Cache invalidation strategies", content: "Time-based expiry (TTL) is simple but can serve stale data; write-through/write-behind caching keeps the cache in sync with the database at write time; cache-aside lets the application manage cache population on misses." },
                  { title: "CDNs", content: "A Content Delivery Network caches static assets (images, JS, CSS) at edge locations close to users geographically, reducing latency and offloading traffic from origin servers." },
                ],
              },
              {
                title: "Database Design",
                slug: "system-design-database",
                shortDescription: "Choose between relational and NoSQL, and partition data.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Relational vs NoSQL", content: "Relational databases enforce schema and support ACID transactions, ideal for structured data with strong consistency needs. NoSQL databases trade some consistency and structure for flexibility and horizontal scale." },
                  { title: "CAP theorem", content: "In a distributed system, you can only fully guarantee two of Consistency, Availability, and Partition tolerance at once — since network partitions are unavoidable in practice, real systems choose between prioritizing consistency (CP) or availability (AP)." },
                  { title: "Partitioning (sharding)", content: "Horizontal partitioning (sharding) splits data across multiple databases by a shard key (e.g. user ID range or hash), distributing storage and query load. Vertical partitioning splits by feature/table responsibility instead." },
                  { title: "Replication", content: "Replication copies data across multiple nodes for redundancy and read scalability. Leader-follower replication routes writes to one primary and reads can be served from replicas, with some replication lag." },
                  { title: "Choosing an approach", content: "Favor a relational database with proper indexing until you hit a specific, measured scaling bottleneck; premature sharding or NoSQL adoption adds operational complexity that often isn't justified early on." },
                ],
              },
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
