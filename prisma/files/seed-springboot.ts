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

async function seedSpringBootCategory() {
  const springBootCategory = {
    name: "Spring Boot Fundamentals",
    slug: "spring-boot-fundamentals",
    description: "Learn the Spring Boot application model, dependency injection, and backend structure.",
    icon: "SB",
    sortOrder: 6,
    paths: [
      {
        name: "Beginner",
        slug: "beginner",
        description: "Understand backend building blocks in Spring Boot.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Spring Boot Basics",
            slug: "spring-boot-basics",
            description: "Core application startup and service patterns.",
            topics: [
              {
                title: "Application Structure",
                slug: "spring-boot-application-structure",
                shortDescription: "Understand Spring Boot startup, configuration, and service layers.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What Spring Boot gives you", content: "Spring Boot reduces setup friction by providing sensible defaults, embedded runtime support (Tomcat by default), and auto-configuration for common backend concerns like databases and security." },
                  { title: "The @SpringBootApplication entry point", content: "Example:\n@SpringBootApplication\npublic class MyApp {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApp.class, args);\n    }\n}" },
                  { title: "Dependency injection", content: "Spring wires dependencies through inversion of control: instead of a class creating its own dependencies, Spring creates and injects them, keeping code modular and testable." },
                  { title: "Layered architecture", content: "A typical Spring Boot app separates concerns into a Controller layer (HTTP), Service layer (business logic), and Repository layer (data access), each depending only on the layer below it." },
                  { title: "The Spring container", content: "The ApplicationContext manages the lifecycle of all beans (managed objects), creating them, injecting dependencies, and making them available wherever needed via @Autowired." },
                ],
              },
              {
                title: "Annotations and Configuration",
                slug: "spring-boot-annotations",
                shortDescription: "Use annotations to declare components and behavior.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Common stereotype annotations", content: "@Component marks a general Spring-managed bean, @Service marks business logic, @Repository marks data-access classes (and translates persistence exceptions), and @Controller/@RestController marks web layer classes." },
                  { title: "@Autowired", content: "@Autowired injects a required dependency, resolved by type (and by qualifier/name if multiple beans of that type exist).\n\nExample:\n@Service\npublic class OrderService {\n    private final OrderRepository repo;\n    @Autowired\n    public OrderService(OrderRepository repo) { this.repo = repo; }\n}" },
                  { title: "@Bean and @Configuration", content: "@Configuration classes define beans manually with @Bean-annotated methods, useful for wiring third-party classes you don't control (and thus can't annotate)." },
                  { title: "application.properties / application.yml", content: "These files externalize configuration values (database URL, server port, feature flags) so behavior can change per environment without recompiling code." },
                  { title: "Spring profiles", content: "Profiles (like @Profile(\"dev\")) activate different configurations or beans depending on the active environment, letting the same codebase behave differently in dev, test, and production." },
                ],
              },
              {
                title: "REST Endpoints and Web Layer",
                slug: "spring-boot-rest-web",
                shortDescription: "Build HTTP endpoints with @RestController.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Routing with mapping annotations", content: "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping bind HTTP methods to controller methods. Path variables and query parameters are automatically extracted.\n\nExample:\n@GetMapping(\"/users/{id}\")\npublic User getUser(@PathVariable Long id) { return service.find(id); }" },
                  { title: "Request bodies", content: "@RequestBody deserializes the incoming JSON payload directly into a Java object using Jackson.\n\nExample:\n@PostMapping(\"/users\")\npublic User create(@RequestBody UserDto dto) { return service.create(dto); }" },
                  { title: "Response handling", content: "Methods can return plain objects (automatically serialized to JSON), ResponseEntity<T> for full control over status codes and headers, or custom response wrappers for consistent API shapes." },
                  { title: "Validation", content: "Adding @Valid to a request body parameter, combined with annotations like @NotNull and @Size on the DTO fields, triggers automatic validation and returns a 400 response on failure." },
                  { title: "Exception handling", content: "@ExceptionHandler methods (often grouped in an @ControllerAdvice class) catch exceptions thrown anywhere in the request-handling chain and convert them into consistent error responses." },
                ],
              },
            ],
          }
        ],
      },
    ],
  };

  await ensureCategory(springBootCategory);
  console.log("✓ Spring Boot Fundamentals category seeded");
}

async function main() {
  await seedSpringBootCategory();
}

main()
  .catch((error) => {
    console.error("Spring Boot seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
