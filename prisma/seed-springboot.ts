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
      // -------------------- BEGINNER --------------------
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

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Data access, security, and testing in Spring Boot.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Data Access with Spring Data JPA",
            slug: "spring-data-jpa",
            description: "Repositories, entities, and transaction management.",
            topics: [
              {
                title: "JPA Entities and Relationships",
                slug: "spring-jpa-entities",
                shortDescription: "Map Java objects to database tables and define associations.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Entity annotations", content: "@Entity, @Table, @Id, @GeneratedValue." },
                  { title: "Basic mappings", content: "@Column, @Enumerated, @Temporal." },
                  { title: "Relationships", content: "@OneToMany, @ManyToOne, @ManyToMany, @OneToOne." },
                  { title: "Cascade and fetch types", content: "CascadeType, FetchType.LAZY vs EAGER." },
                  { title: "Inheritance strategies", content: "SINGLE_TABLE, JOINED, TABLE_PER_CLASS." },
                ],
              },
              {
                title: "Spring Data JPA Repositories",
                slug: "spring-repositories",
                shortDescription: "Use repository interfaces for CRUD and custom queries.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Repository hierarchy", content: "CrudRepository, JpaRepository." },
                  { title: "Query methods", content: "Derived queries from method names (findBy...)." },
                  { title: "Custom queries with @Query", content: "JPQL and native SQL." },
                  { title: "Paging and sorting", content: "Pageable, Sort." },
                  { title: "Projections", content: "Interface-based and class-based projections." },
                ],
              },
              {
                title: "Transactions",
                slug: "spring-transactions",
                shortDescription: "Declarative transaction management with @Transactional.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Declarative transactions", content: "@Transactional on methods or classes." },
                  { title: "Propagation levels", content: "REQUIRED, REQUIRES_NEW, SUPPORTS, etc." },
                  { title: "Isolation levels", content: "READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE." },
                  { title: "Rollback rules", content: "rollbackFor and noRollbackFor." },
                  { title: "Transaction managers", content: "PlatformTransactionManager." },
                ],
              },
            ],
          },
          {
            title: "Security",
            slug: "spring-security",
            description: "Authentication and authorization with Spring Security.",
            topics: [
              {
                title: "Spring Security Basics",
                slug: "spring-security-basics",
                shortDescription: "Configure authentication and role-based access.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Auto-configuration", content: "Default basic auth and user." },
                  { title: "Password encoding", content: "BCryptPasswordEncoder." },
                  { title: "In-memory and JDBC users", content: "UserDetailsService." },
                  { title: "WebSecurityConfigurerAdapter (or SecurityFilterChain)", content: "Configure paths and roles." },
                  { title: "Method-level security", content: "@PreAuthorize, @RolesAllowed." },
                ],
              },
              {
                title: "JWT Authentication",
                slug: "spring-security-jwt",
                shortDescription: "Stateless authentication with JSON Web Tokens.",
                estimatedMinutes: 24,
                sections: [
                  { title: "JWT structure", content: "Header, payload, signature." },
                  { title: "Generating JWT", content: "Using JJWT or Nimbus." },
                  { title: "Filter chain", content: "OncePerRequestFilter to validate token." },
                  { title: "AuthenticationManager", content: "Provider and authentication object." },
                  { title: "Securing endpoints", content: "Configure public and protected paths." },
                ],
              },
            ],
          },
          {
            title: "Testing",
            slug: "spring-testing",
            description: "Unit and integration tests for Spring Boot applications.",
            topics: [
              {
                title: "Unit Testing with JUnit and Mockito",
                slug: "spring-testing-unit",
                shortDescription: "Test service and controller layers in isolation.",
                estimatedMinutes: 20,
                sections: [
                  { title: "JUnit 5 basics", content: "@Test, @BeforeEach, assertions." },
                  { title: "Mockito mocks", content: "@Mock, @InjectMocks, when, verify." },
                  { title: "Testing service layer", content: "Mock repository, test business logic." },
                  { title: "Testing controller with MockMvc", content: "Standalone setup." },
                ],
              },
              {
                title: "Integration Testing",
                slug: "spring-testing-integration",
                shortDescription: "Test full application context and database.",
                estimatedMinutes: 20,
                sections: [
                  { title: "@SpringBootTest", content: "Load full context." },
                  { title: "@DataJpaTest", content: "Slice for JPA repositories." },
                  { title: "@WebMvcTest", content: "Slice for controllers." },
                  { title: "Testcontainers", content: "Use real database in tests." },
                  { title: "Mocking beans", content: "@MockBean for external dependencies." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- ADVANCED --------------------
      {
        name: "Advanced",
        slug: "advanced",
        description: "Reactive programming, microservices, and cloud patterns.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Reactive Spring",
            slug: "reactive-spring",
            description: "Non‑blocking APIs with Spring WebFlux and Reactor.",
            topics: [
              {
                title: "Reactive Core with Reactor",
                slug: "reactor-core",
                shortDescription: "Mono, Flux, and operators.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Reactive streams", content: "Publisher, Subscriber, Processor." },
                  { title: "Mono and Flux", content: "0–1 and 0–N publishers." },
                  { title: "Operators", content: "map, flatMap, filter, zip, merge." },
                  { title: "Error handling", content: "onErrorResume, onErrorReturn." },
                  { title: "Schedulers", content: "Schedulers.parallel(), .immediate(), etc." },
                ],
              },
              {
                title: "Spring WebFlux",
                slug: "spring-webflux",
                shortDescription: "Build reactive REST endpoints and WebClient.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Controller with RouterFunctions", content: "Functional endpoints." },
                  { title: "Reactive repositories", content: "R2DBC or MongoDB reactive." },
                  { title: "WebClient", content: "Reactive HTTP client." },
                  { title: "Testing WebFlux", content: "WebTestClient." },
                ],
              },
            ],
          },
          {
            title: "Microservices with Spring Cloud",
            slug: "spring-cloud",
            description: "Service discovery, configuration, and gateway.",
            topics: [
              {
                title: "Service Discovery (Eureka)",
                slug: "spring-eureka",
                shortDescription: "Register and discover services.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Eureka Server", content: "Enable via @EnableEurekaServer." },
                  { title: "Eureka Client", content: "@EnableDiscoveryClient and configuration." },
                  { title: "Feign Clients", content: "Declarative REST with @FeignClient." },
                  { title: "Load balancing", content: "Spring Cloud LoadBalancer." },
                ],
              },
              {
                title: "Configuration and Gateway",
                slug: "spring-config-gateway",
                shortDescription: "Externalized configuration and API gateway.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Spring Cloud Config", content: "Config server and client." },
                  { title: "Spring Cloud Gateway", content: "Route definition and filters." },
                  { title: "Circuit Breaker", content: "Resilience4j integration." },
                ],
              },
            ],
          },
          {
            title: "Event-Driven Architecture",
            slug: "spring-event-driven",
            description: "Messaging with Spring Cloud Stream and Kafka.",
            topics: [
              {
                title: "Spring Cloud Stream",
                slug: "spring-cloud-stream",
                shortDescription: "Binder abstraction for message brokers.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Channels and bindings", content: "Input and output." },
                  { title: "Message payload conversion", content: "@Payload." },
                  { title: "Partitioning and groups", content: "Consumer groups." },
                ],
              },
              {
                title: "Apache Kafka Integration",
                slug: "spring-kafka",
                shortDescription: "Produce and consume messages with Kafka.",
                estimatedMinutes: 18,
                sections: [
                  { title: "KafkaTemplate", content: "Sending messages." },
                  { title: "@KafkaListener", content: "Consuming messages." },
                  { title: "Serializers and deserializers", content: "JSON, Avro." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERVIEW PREP --------------------
      {
        name: "Interview Prep",
        slug: "interview-prep",
        description: "Common Spring Boot interview questions and deep dives.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "spring-core-interview",
            description: "IoC, DI, beans, and auto‑configuration.",
            topics: [
              {
                title: "Inversion of Control and Dependency Injection",
                slug: "spring-ioc-di",
                shortDescription: "How Spring manages dependencies.",
                estimatedMinutes: 18,
                sections: [
                  { title: "What is IoC", content: "Container controls object creation." },
                  { title: "DI types", content: "Constructor, setter, field injection." },
                  { title: "Bean scopes", content: "Singleton, prototype, request, session." },
                  { title: "Lifecycle callbacks", content: "@PostConstruct, @PreDestroy." },
                ],
              },
              {
                title: "Auto‑configuration and Starters",
                slug: "spring-auto-config",
                shortDescription: "How Spring Boot configures itself automatically.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Auto‑configuration classes", content: "@ConditionalOnClass, @ConditionalOnMissingBean." },
                  { title: "Spring Boot starters", content: "Dependency bundles." },
                  { title: "Custom auto‑configuration", content: "Create your own starter." },
                ],
              },
              {
                title: "Bean Definition and Wiring",
                slug: "spring-bean-wiring",
                shortDescription: "Different ways to define and wire beans.",
                estimatedMinutes: 18,
                sections: [
                  { title: "XML, annotations, Java config", content: "Three approaches." },
                  { title: "@ComponentScan", content: "How Spring finds beans." },
                  { title: "Qualifiers", content: "@Primary and @Qualifier." },
                ],
              },
            ],
          },
          {
            title: "Common Interview Questions",
            slug: "spring-common-questions",
            description: "Frequently asked questions in Spring Boot interviews.",
            topics: [
              {
                title: "Spring Boot vs Spring",
                slug: "spring-boot-vs-spring",
                shortDescription: "Compare and contrast.",
                estimatedMinutes: 14,
                sections: [
                  { title: "Configuration", content: "Boot simplifies setup." },
                  { title: "Embedded server", content: "Boot provides Tomcat/Jetty." },
                  { title: "Auto‑configuration", content: "Boot decides defaults." },
                ],
              },
              {
                title: "Profiles and Environment",
                slug: "spring-profiles",
                shortDescription: "Handle environment-specific configurations.",
                estimatedMinutes: 16,
                sections: [
                  { title: "Active profiles", content: "spring.profiles.active." },
                  { title: "@Profile", content: "Conditional beans." },
                  { title: "Property sources", content: "application-{profile}.properties." },
                ],
              },
              {
                title: "AOP in Spring",
                slug: "spring-aop",
                shortDescription: "Aspect‑oriented programming.",
                estimatedMinutes: 18,
                sections: [
                  { title: "AOP concepts", content: "Aspect, advice, pointcut." },
                  { title: "@Aspect and @Before/@After", content: "Common advices." },
                  { title: "Use cases", content: "Logging, performance monitoring." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(springBootCategory);
  console.log("✓ Spring Boot Fundamentals category seeded (all levels)");
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