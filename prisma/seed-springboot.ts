import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  shortDescription: string;
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

        const sections = [...(topicSeed.sections ?? []), ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedSpringBootCategory() {
  const springBootCategory: CategorySeed = {
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
            title: "Spring Boot Basics – The Foundation",
            slug: "spring-boot-basics",
            description: "Core application startup and service patterns.",
            topics: [
              {
                title: "Application Structure – The Starting Point",
                slug: "spring-boot-application-structure",
                shortDescription: "Understand Spring Boot startup, configuration, and service layers.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What Spring Boot Gives You", content: "Spring Boot reduces setup friction by providing sensible defaults, embedded runtime support (Tomcat by default), and auto‑configuration for common backend concerns like databases and security. It's built on top of Spring Framework, removing the need for tedious XML configuration." },
                  { title: "The @SpringBootApplication Entry Point", content: "```java\n@SpringBootApplication\npublic class MyApp {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApp.class, args);\n    }\n}\n```\nThis annotation combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`. It tells Spring Boot to scan the current package for components, enable auto‑configuration, and start the application." },
                  { title: "Dependency Injection (DI) – The Core", content: "Spring wires dependencies through inversion of control: instead of a class creating its own dependencies, Spring creates and injects them, keeping code modular and testable. Use `@Autowired` to inject dependencies." },
                  { title: "Layered Architecture – Separation of Concerns", content: "A typical Spring Boot app separates concerns into a Controller layer (HTTP), Service layer (business logic), and Repository layer (data access), each depending only on the layer below it. This promotes maintainability." },
                  { title: "The Spring Container – ApplicationContext", content: "The `ApplicationContext` manages the lifecycle of all beans (managed objects), creating them, injecting dependencies, and making them available wherever needed via `@Autowired`." },
                ],
              },
              {
                title: "Annotations and Configuration – The Declarative Way",
                slug: "spring-boot-annotations",
                shortDescription: "Use annotations to declare components and behavior.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Common Stereotype Annotations", content: "`@Component` marks a general Spring‑managed bean, `@Service` marks business logic, `@Repository` marks data‑access classes (and translates persistence exceptions), and `@Controller`/`@RestController` marks web layer classes." },
                  { title: "@Autowired – Wiring Dependencies", content: "`@Autowired` injects a required dependency, resolved by type (and by qualifier/name if multiple beans of that type exist).\n```java\n@Service\npublic class OrderService {\n    private final OrderRepository repo;\n    @Autowired\n    public OrderService(OrderRepository repo) { this.repo = repo; }\n}\n```" },
                  { title: "@Bean and @Configuration – Manual Wiring", content: "`@Configuration` classes define beans manually with `@Bean`-annotated methods, useful for wiring third‑party classes you don't control (and thus can't annotate)." },
                  { title: "application.properties / application.yml – External Configuration", content: "These files externalize configuration values (database URL, server port, feature flags) so behavior can change per environment without recompiling code." },
                  { title: "Spring Profiles – Environment‑Specific Config", content: "Profiles (like `@Profile(\"dev\")`) activate different configurations or beans depending on the active environment, letting the same codebase behave differently in dev, test, and production." },
                ],
              },
              {
                title: "REST Endpoints and Web Layer – Building APIs",
                slug: "spring-boot-rest-web",
                shortDescription: "Build HTTP endpoints with @RestController.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Routing with Mapping Annotations", content: "`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` bind HTTP methods to controller methods. Path variables and query parameters are automatically extracted.\n```java\n@GetMapping(\"/users/{id}\")\npublic User getUser(@PathVariable Long id) { return service.find(id); }\n```" },
                  { title: "Request Bodies – @RequestBody", content: "`@RequestBody` deserializes the incoming JSON payload directly into a Java object using Jackson.\n```java\n@PostMapping(\"/users\")\npublic User create(@RequestBody UserDto dto) { return service.create(dto); }\n```" },
                  { title: "Response Handling – ResponseEntity", content: "Methods can return plain objects (automatically serialized to JSON), `ResponseEntity<T>` for full control over status codes and headers, or custom response wrappers for consistent API shapes." },
                  { title: "Validation – @Valid", content: "Adding `@Valid` to a request body parameter, combined with annotations like `@NotNull` and `@Size` on the DTO fields, triggers automatic validation and returns a 400 response on failure." },
                  { title: "Exception Handling – @ControllerAdvice", content: "`@ExceptionHandler` methods (often grouped in an `@ControllerAdvice` class) catch exceptions thrown anywhere in the request‑handling chain and convert them into consistent error responses." },
                ],
              },
            ],
          },
        ],
      },

      // -------------------- INTERMEDIATE --------------------
      {
        name: "Intermediate",
        slug: "intermediate",
        description: "Data access, security, testing, and actuator.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Data Access with Spring Data JPA",
            slug: "spring-data-jpa",
            description: "Repositories, entities, and transaction management.",
            topics: [
              {
                title: "JPA Entities and Relationships – Mapping Objects to Tables",
                slug: "spring-jpa-entities",
                shortDescription: "Map Java objects to database tables and define associations.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Entity Annotations", content: "`@Entity`, `@Table`, `@Id`, `@GeneratedValue` – define the primary key and generation strategy." },
                  { title: "Basic Mappings", content: "`@Column` (name, nullable, length), `@Enumerated` (ORDINAL or STRING), `@Temporal` (Date/Time)." },
                  { title: "Relationships", content: "`@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@OneToOne` with `mappedBy` and `@JoinColumn`. Understand cascade and fetch types." },
                  { title: "Cascade and Fetch Types", content: "`CascadeType` (PERSIST, MERGE, REMOVE, etc.) and `FetchType.LAZY` vs `EAGER`. Lazy is preferred for performance." },
                  { title: "Inheritance Strategies", content: "`SINGLE_TABLE`, `JOINED`, `TABLE_PER_CLASS` – choose based on performance and schema needs." },
                ],
              },
              {
                title: "Spring Data JPA Repositories – Query Methods",
                slug: "spring-repositories",
                shortDescription: "Use repository interfaces for CRUD and custom queries.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Repository Hierarchy", content: "`CrudRepository` (basic CRUD), `JpaRepository` (adds JPA‑specific methods), `PagingAndSortingRepository`." },
                  { title: "Query Methods", content: "Derived queries from method names: `findByFirstName(String name)`, `findByAgeBetween(int from, int to)`. Spring Data parses the method name and generates JPQL." },
                  { title: "Custom Queries with @Query", content: "Use `@Query` with JPQL or native SQL for complex queries. Example: `@Query(\"SELECT u FROM User u WHERE u.email = :email\")`." },
                  { title: "Paging and Sorting", content: "Pass `Pageable` and `Sort` to repository methods for pagination and ordering." },
                  { title: "Projections – DTOs and Interfaces", content: "Use interface‑based or class‑based projections to return only specific fields, reducing payload." },
                ],
              },
              {
                title: "Transactions – @Transactional",
                slug: "spring-transactions",
                shortDescription: "Declarative transaction management with @Transactional.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Declarative Transactions", content: "`@Transactional` on methods or classes. Spring wraps the method in a transaction." },
                  { title: "Propagation Levels", content: "`REQUIRED`, `REQUIRES_NEW`, `SUPPORTS`, `MANDATORY`, `NEVER`, `NOT_SUPPORTED`. Choose based on transaction boundaries." },
                  { title: "Isolation Levels", content: "`READ_UNCOMMITTED`, `READ_COMMITTED`, `REPEATABLE_READ`, `SERIALIZABLE`. Trade‑off between consistency and performance." },
                  { title: "Rollback Rules", content: "`rollbackFor` and `noRollbackFor` – specify which exceptions trigger rollback." },
                ],
              },
              {
                title: "Spring Boot Actuator – Monitoring",
                slug: "spring-actuator",
                shortDescription: "Production‑ready monitoring and management.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Actuator?", content: "Spring Boot Actuator provides built‑in endpoints for monitoring: health, info, metrics, and environment." },
                  { title: "Common Endpoints", content: "`/actuator/health` (service status), `/actuator/info` (custom metadata), `/actuator/metrics` (performance data)." },
                  { title: "Customizing Actuator", content: "Add custom health indicators and info contributors. Secure endpoints with Spring Security." },
                ],
              },
            ],
          },
          {
            title: "Spring Security – Authentication and Authorization",
            slug: "spring-security",
            description: "Secure your application with Spring Security.",
            topics: [
              {
                title: "Spring Security Basics – Authentication",
                slug: "spring-security-basics",
                shortDescription: "Configure authentication and role‑based access.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Auto‑configuration", content: "Spring Security provides default basic authentication with a generated password." },
                  { title: "Password Encoding", content: "Use `BCryptPasswordEncoder` for secure password hashing." },
                  { title: "UserDetailsService", content: "Load users from a database or in‑memory store. Implement custom `UserDetailsService`." },
                  { title: "SecurityFilterChain", content: "Configure which paths are secured and which are public." },
                  { title: "Method‑Level Security", content: "`@PreAuthorize`, `@RolesAllowed` for fine‑grained access control." },
                ],
              },
              {
                title: "JWT Authentication – Stateless Security",
                slug: "spring-security-jwt",
                shortDescription: "Stateless authentication with JSON Web Tokens.",
                estimatedMinutes: 26,
                sections: [
                  { title: "JWT Structure", content: "Header, payload, signature. Typically signed with HMAC or RSA." },
                  { title: "Generating JWT", content: "Use libraries like JJWT or Nimbus to create and validate tokens." },
                  { title: "Filter Chain", content: "Implement a `OncePerRequestFilter` to validate the token on each request." },
                  { title: "AuthenticationManager", content: "Configure an `AuthenticationManager` that uses the token for authentication." },
                  { title: "Securing Endpoints", content: "Configure public endpoints (e.g., `/login`) and protected endpoints using `SecurityFilterChain`." },
                ],
              },
            ],
          },
          {
            title: "Testing Spring Boot Applications",
            slug: "spring-testing",
            description: "Unit and integration tests for Spring Boot applications.",
            topics: [
              {
                title: "Unit Testing with JUnit and Mockito",
                slug: "spring-testing-unit",
                shortDescription: "Test service and controller layers in isolation.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JUnit 5 Basics", content: "`@Test`, `@BeforeEach`, assertions." },
                  { title: "Mockito Mocks", content: "`@Mock`, `@InjectMocks`, `when`, `verify`." },
                  { title: "Testing Service Layer", content: "Mock the repository, test business logic." },
                  { title: "Testing Controller with MockMvc", content: "Use `MockMvc` to test controllers without starting the server." },
                ],
              },
              {
                title: "Integration Testing – @SpringBootTest",
                slug: "spring-testing-integration",
                shortDescription: "Test full application context and database.",
                estimatedMinutes: 24,
                sections: [
                  { title: "@SpringBootTest", content: "Loads the full application context." },
                  { title: "@DataJpaTest", content: "Slice for JPA repositories – loads only JPA components." },
                  { title: "@WebMvcTest", content: "Slice for controllers – loads only web components." },
                  { title: "Testcontainers", content: "Use real databases in tests with Testcontainers." },
                  { title: "Mocking Beans", content: "Use `@MockBean` to mock external dependencies." },
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
        description: "Microservices, observability, cloud, and reactive Spring.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Spring Cloud – Microservices",
            slug: "spring-cloud",
            description: "Service discovery, configuration, gateway, and circuit breaker.",
            topics: [
              {
                title: "Service Discovery (Eureka)",
                slug: "spring-eureka",
                shortDescription: "Register and discover services.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Eureka Server", content: "Enable with `@EnableEurekaServer`." },
                  { title: "Eureka Client", content: "`@EnableDiscoveryClient` and configuration." },
                  { title: "Feign Clients", content: "Declarative REST with `@FeignClient`." },
                  { title: "Load Balancing", content: "Spring Cloud LoadBalancer." },
                ],
              },
              {
                title: "Configuration and Gateway",
                slug: "spring-config-gateway",
                shortDescription: "Externalized configuration and API gateway.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Spring Cloud Config", content: "Config server and client for centralised configuration." },
                  { title: "Spring Cloud Gateway", content: "Route definition and filters." },
                  { title: "Circuit Breaker", content: "Resilience4j integration for fault tolerance." },
                ],
              },
            ],
          },
          {
            title: "Reactive Spring – WebFlux",
            slug: "spring-webflux",
            description: "Non‑blocking APIs with Spring WebFlux and Reactor.",
            topics: [
              {
                title: "Reactive Core with Reactor",
                slug: "reactor-core",
                shortDescription: "Mono, Flux, and operators.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Reactive Streams", content: "Publisher, Subscriber, Processor." },
                  { title: "Mono and Flux", content: "0–1 and 0–N publishers." },
                  { title: "Operators", content: "map, flatMap, filter, zip, merge." },
                  { title: "Error Handling", content: "onErrorResume, onErrorReturn." },
                  { title: "Schedulers", content: "Schedulers.parallel(), .immediate(), etc." },
                ],
              },
              {
                title: "Spring WebFlux – Reactive Endpoints",
                slug: "spring-webflux",
                shortDescription: "Build reactive REST endpoints and WebClient.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Controller with RouterFunctions", content: "Functional endpoints." },
                  { title: "Reactive Repositories", content: "R2DBC or MongoDB reactive." },
                  { title: "WebClient", content: "Reactive HTTP client." },
                  { title: "Testing WebFlux", content: "WebTestClient." },
                ],
              },
            ],
          },
          {
            title: "Observability – Metrics, Logs, Traces",
            slug: "observability",
            description: "Monitor Spring Boot applications with Micrometer, Prometheus, and distributed tracing.",
            topics: [
              {
                title: "Metrics with Micrometer",
                slug: "micrometer",
                shortDescription: "Collect application metrics.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is Micrometer?", content: "A metrics facade for Prometheus, Graphite, etc." },
                  { title: "Common Metrics", content: "Counter, Timer, Gauge, DistributionSummary." },
                  { title: "Prometheus Integration", content: "Expose metrics at `/actuator/prometheus`." },
                ],
              },
              {
                title: "Distributed Tracing with Sleuth and Zipkin",
                slug: "distributed-tracing",
                shortDescription: "Trace requests across services.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Spring Cloud Sleuth", content: "Adds trace and span IDs to logs." },
                  { title: "Zipkin Integration", content: "Send traces to Zipkin for visualisation." },
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
                estimatedMinutes: 20,
                sections: [
                  { title: "What is IoC", content: "Container controls object creation." },
                  { title: "DI Types", content: "Constructor, setter, field injection." },
                  { title: "Bean Scopes", content: "Singleton, prototype, request, session." },
                  { title: "Lifecycle Callbacks", content: "@PostConstruct, @PreDestroy." },
                ],
              },
              {
                title: "Auto‑configuration and Starters",
                slug: "spring-auto-config",
                shortDescription: "How Spring Boot configures itself automatically.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Auto‑configuration Classes", content: "`@ConditionalOnClass`, `@ConditionalOnMissingBean`." },
                  { title: "Spring Boot Starters", content: "Dependency bundles." },
                  { title: "Custom Auto‑configuration", content: "Create your own starter." },
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
                estimatedMinutes: 16,
                sections: [
                  { title: "Configuration", content: "Boot simplifies setup." },
                  { title: "Embedded Server", content: "Boot provides Tomcat/Jetty." },
                  { title: "Auto‑configuration", content: "Boot decides defaults." },
                ],
              },
              {
                title: "Profiles and Environment",
                slug: "spring-profiles",
                shortDescription: "Handle environment-specific configurations.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Active Profiles", content: "`spring.profiles.active`." },
                  { title: "@Profile", content: "Conditional beans." },
                  { title: "Property Sources", content: "`application-{profile}.properties`." },
                ],
              },
              {
                title: "AOP in Spring",
                slug: "spring-aop",
                shortDescription: "Aspect‑oriented programming.",
                estimatedMinutes: 20,
                sections: [
                  { title: "AOP Concepts", content: "Aspect, advice, pointcut." },
                  { title: "@Aspect and @Before/@After", content: "Common advices." },
                  { title: "Use Cases", content: "Logging, performance monitoring." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(springBootCategory);
  console.log("✅ Spring Boot Fundamentals category seeded (ultra‑detailed)");
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