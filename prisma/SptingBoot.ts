// ---- 200+ Spring Boot Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["Spring Boot", "Spring Boot"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["Spring Boot", "What is Spring Boot and why is it used?", "spring-boot-overview", "Define Spring Boot and its purpose.", "Spring Boot is a framework built on top of Spring that simplifies the development of stand-alone, production-grade Spring applications. It provides auto-configuration, embedded servers (Tomcat, Jetty, Undertow), and starter dependencies to get started quickly. It reduces boilerplate configuration and follows the convention-over-configuration principle."],
  ["Spring Boot", "How does Spring Boot differ from the Spring Framework?", "spring-vs-spring-boot", "Compare Spring Framework and Spring Boot.", "Spring Framework is a comprehensive programming and configuration model for Java applications, providing core features like DI and AOP. Spring Boot builds on Spring to create production-ready applications with minimal effort, offering auto-configuration, embedded servers, and production-ready features (Actuator, metrics)."],
  ["Spring Boot", "What are Spring Boot starters?", "starters", "Explain starter dependencies.", "Starters are dependency descriptors that bundle commonly used libraries for a specific purpose. For example, `spring-boot-starter-web` includes dependencies for building web applications (Spring MVC, Jackson, Tomcat). They simplify dependency management."],
  ["Spring Boot", "What is auto-configuration in Spring Boot?", "auto-configuration", "Explain auto-configuration.", "Auto-configuration is the process by which Spring Boot automatically configures beans based on classpath dependencies, property settings, and other conditions. It reduces the need for explicit XML or Java configuration. It is enabled via `@EnableAutoConfiguration` (included in `@SpringBootApplication`)."],
  ["Spring Boot", "What are embedded servers in Spring Boot?", "embedded-servers", "Explain embedded servers.", "Spring Boot embeds a server (Tomcat, Jetty, or Undertow) inside the application JAR, eliminating the need to deploy a WAR file to an external server. This simplifies development and deployment."],
  ["Spring Boot", "What is the `@SpringBootApplication` annotation?", "springbootapplication", "Explain the annotation.", "`@SpringBootApplication` is a convenience annotation that combines `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`. It marks the main class of a Spring Boot application."],
  ["Spring Boot", "How do you create a Spring Boot application?", "create-application", "Explain creation process.", "Use Spring Initializr (start.spring.io) or IDE (STS, IntelliJ) to generate a project with dependencies. Or use Spring Boot CLI. Then run the main class with `SpringApplication.run(Application.class, args)`."],
  ["Spring Boot", "What is the `SpringApplication` class?", "springapplication-class", "Explain the class.", "`SpringApplication` is a class that provides a convenient way to bootstrap a Spring application. It sets up default configuration, starts the embedded server, and runs the application."],
  ["Spring Boot", "What is the purpose of `application.properties` (or `application.yml`)?", "application-properties", "Explain configuration files.", "These files are used for external configuration of Spring Boot applications. They contain key-value pairs for properties like server port, database connection, logging levels, and custom properties. YAML is more readable for complex hierarchies."],
  ["Spring Boot", "What are the different ways to configure properties in Spring Boot?", "property-sources", "List property sources.", "Properties can be configured via: command-line arguments, `application.properties`/`.yml` files, OS environment variables, `@PropertySource` on configuration classes, and `@ConfigurationProperties` on beans. The order of precedence is defined by Spring Boot."],
  ["Spring Boot", "What are profiles in Spring Boot?", "profiles", "Explain profiles.", "Profiles allow you to define environment-specific configurations (e.g., dev, test, prod). Use `spring.profiles.active` to activate a profile. Configuration files can be named `application-{profile}.properties`."],
  ["Spring Boot", "What is the `@Value` annotation?", "value-annotation", "Explain `@Value`.", "`@Value` is used to inject values from property sources into Spring beans. It can be used on fields, constructor parameters, or setter methods. Supports SpEL expressions and default values."],
  ["Spring Boot", "What is `@ConfigurationProperties`?", "configurationproperties", "Explain the annotation.", "`@ConfigurationProperties` binds external properties to a Java bean. It provides type-safe configuration and supports validation. It's more flexible than `@Value` for complex nested structures."],
  ["Spring Boot", "What is the Spring Boot Actuator?", "actuator", "Explain Actuator.", "Actuator provides production-ready features to monitor and manage the application. It exposes endpoints like `/health`, `/info`, `/metrics`, `/env`, `/shutdown`, etc. It helps in monitoring and administration."],
  ["Spring Boot", "How do you enable the Actuator endpoints?", "enable-actuator", "Explain enabling Actuator.", "Add the `spring-boot-starter-actuator` dependency. By default, only `/health` and `/info` are exposed. To expose all or specific endpoints, set `management.endpoints.web.exposure.include=*`."],
  ["Spring Boot", "What is the `@RestController` annotation?", "restcontroller", "Explain `@RestController`.", "`@RestController` is a convenience annotation that combines `@Controller` and `@ResponseBody`. It indicates that the class is a controller where every method returns a domain object instead of a view (RESTful)."],
  ["Spring Boot", "What is the difference between `@Controller` and `@RestController`?", "controller-vs-restcontroller", "Compare the two.", "`@Controller` is used in traditional MVC for returning views. `@RestController` is a specialized version for REST APIs, where methods return data (JSON/XML) directly, serialized via `HttpMessageConverter`. `@RestController` implies `@ResponseBody` on every method."],
  ["Spring Boot", "How do you handle exceptions in Spring Boot REST APIs?", "exception-handling", "Explain exception handling.", "Use `@ControllerAdvice` with `@ExceptionHandler` to centralize exception handling across the application. Return `ResponseEntity` with appropriate HTTP status and error details. Use `@ResponseStatus` on custom exceptions."],
  ["Spring Boot", "What is the `@SpringBootTest` annotation?", "springboottest", "Explain testing annotation.", "`@SpringBootTest` is used for integration testing by loading the full application context. It can be combined with `@Test` and other annotations. It supports property overrides and `@MockBean` for mocking."],
  ["Spring Boot", "What are the common dependencies in `spring-boot-starter-web`?", "web-starter-deps", "List starter-web dependencies.", "It includes: Spring MVC, Jackson (for JSON serialization), Tomcat (embedded), and validation (Hibernate Validator)."],

  // ==================== CORE & CONFIGURATION (20) ====================
  ["Spring Boot", "What is the `@Bean` annotation?", "bean-annotation", "Explain `@Bean`.", "`@Bean` is a method-level annotation that tells Spring to instantiate, configure, and manage the returned object as a bean. It is used within `@Configuration` classes."],
  ["Spring Boot", "What is the `@Component` annotation?", "component-annotation", "Explain `@Component`.", "`@Component` is a class-level annotation that marks a class as a Spring-managed bean. It's a generic stereotype; use `@Service`, `@Repository`, or `@Controller` for more specific roles."],
  ["Spring Boot", "What is the difference between `@Component` and `@Bean`?", "component-vs-bean", "Compare the two.", "`@Component` is used on a class and relies on classpath scanning to create beans. `@Bean` is used on a method in a `@Configuration` class and gives fine-grained control over bean creation. `@Bean` is typically used for third-party classes that you can't annotate."],
  ["Spring Boot", "What is `@Autowired` and how does it work?", "autowired", "Explain dependency injection.", "`@Autowired` marks a constructor, field, or setter for automatic dependency injection. Spring resolves the dependency by type, optionally using `@Qualifier` for multiple beans."],
  ["Spring Boot", "What is `@Qualifier` and when is it used?", "qualifier", "Explain `@Qualifier`.", "`@Qualifier` is used along with `@Autowired` to specify which bean should be injected when multiple beans of the same type exist. It can be used with bean names or custom qualifiers."],
  ["Spring Boot", "What is `@Primary`?", "primary", "Explain `@Primary`.", "`@Primary` indicates that a bean should be given preference when multiple beans of the same type exist. Used with `@Autowired` to resolve ambiguity without `@Qualifier`."],
  ["Spring Boot", "What are the scopes of Spring beans?", "bean-scopes", "List scopes.", "Singleton (default): one instance per container. Prototype: new instance each request. Request: one per HTTP request (web). Session: one per HTTP session. Application: one per servlet context. Websocket: one per websocket."],
  ["Spring Boot", "What is lazy initialization in Spring?", "lazy-init", "Explain lazy loading.", "By default, singleton beans are eagerly instantiated at startup. Use `@Lazy` to defer bean creation until first requested. It can improve startup time but may hide issues."],
  ["Spring Boot", "How do you inject property values into a bean?", "inject-properties", "Explain property injection.", "Using `@Value` for individual properties, or `@ConfigurationProperties` to bind a group of properties to a bean. Also, Spring supports `@PropertySource` to load additional properties files."],
  ["Spring Boot", "What is the difference between `@RestController` and `@Controller` with `@ResponseBody`?", "restcontroller-detail", "Explain the difference.", "`@RestController` is a convenience annotation that includes `@Controller` and `@ResponseBody`. There is no functional difference; `@RestController` is just more concise."],
  ["Spring Boot", "What is the `@RequestMapping` annotation?", "requestmapping", "Explain `@RequestMapping`.", "`@RequestMapping` maps HTTP requests to handler methods. It can specify path, method (GET, POST, etc.), produces/consumes media types, headers, and parameters. More specific annotations exist: `@GetMapping`, `@PostMapping`, etc."],
  ["Spring Boot", "What is the difference between `@PathVariable` and `@RequestParam`?", "pathvariable-vs-requestparam", "Compare the two.", "`@PathVariable` extracts values from the URL path (e.g., `/users/{id}`). `@RequestParam` extracts query parameters (e.g., `?page=1`)."],
  ["Spring Boot", "How do you handle JSON requests and responses?", "json-handling", "Explain JSON binding.", "Spring Boot uses Jackson for JSON serialization/deserialization. Use `@RequestBody` to bind JSON to a Java object, and return objects from `@RestController` methods to be automatically serialized."],
  ["Spring Boot", "What is validation in Spring Boot?", "validation", "Explain validation.", "Validation uses Bean Validation (JSR-380) with Hibernate Validator. Annotate fields with `@NotNull`, `@Size`, `@Min`, etc., and use `@Valid` on the parameter in controller methods. Handle `MethodArgumentNotValidException`."],
  ["Spring Boot", "How do you customize the JSON serialization?", "json-customization", "Explain JSON customization.", "Use `@JsonIgnore`, `@JsonProperty`, `@JsonFormat` on fields. Configure Jackson via `spring.jackson.*` properties. Or provide a custom `ObjectMapper` bean."],
  ["Spring Boot", "What is the `@CrossOrigin` annotation?", "crossorigin", "Explain CORS handling.", "`@CrossOrigin` enables cross-origin requests for a controller method or class. It allows specifying origins, methods, headers, etc. Global CORS can be configured via `WebMvcConfigurer`."],
  ["Spring Boot", "How do you handle file uploads in Spring Boot?", "file-upload", "Explain file upload.", "Use `MultipartFile` as a parameter in a `@PostMapping` method. Configure `spring.servlet.multipart` properties for max file size, location, etc."],
  ["Spring Boot", "What is the `@Async` annotation?", "async", "Explain asynchronous processing.", "`@Async` makes a method execute asynchronously in a separate thread. Enable by adding `@EnableAsync` on a configuration class. Requires a thread pool (default is `SimpleAsyncTaskExecutor`)."],
  ["Spring Boot", "What is the `@Scheduled` annotation?", "scheduled", "Explain scheduling.", "`@Scheduled` is used to schedule tasks at fixed rates, delays, or cron expressions. Enable with `@EnableScheduling`. Supports cron syntax."],
  ["Spring Boot", "How do you use caching in Spring Boot?", "caching", "Explain caching.", "Enable caching with `@EnableCaching`. Use `@Cacheable` on methods to cache results. `@CacheEvict` to remove entries. Supports various cache providers (EhCache, Redis, Caffeine)."],

  // ==================== DATA ACCESS (20) ====================
  ["Spring Boot", "What is Spring Data JPA?", "spring-data-jpa", "Explain Spring Data JPA.", "Spring Data JPA is a part of Spring Data that simplifies JPA-based data access. It provides repository interfaces (`JpaRepository`, `CrudRepository`) with methods for CRUD operations, pagination, and query generation from method names."],
  ["Spring Boot", "How do you define a repository interface?", "repository-definition", "Explain repository.", "Extend `JpaRepository<T, ID>` or `CrudRepository<T, ID>`. Spring Data JPA automatically provides implementations. You can define custom query methods using naming conventions (e.g., `findByFirstName`)."],
  ["Spring Boot", "What is the `@Entity` annotation?", "entity-annotation", "Explain `@Entity`.", "`@Entity` marks a class as a JPA entity (table). It must have a primary key (`@Id`) and a no-arg constructor. It can be mapped to a database table."],
  ["Spring Boot", "What are the common annotations for entity mapping?", "jpa-annotations", "List JPA annotations.", "`@Table`, `@Column`, `@Id`, `@GeneratedValue`, `@OneToMany`, `@ManyToOne`, `@OneToOne`, `@ManyToMany`, `@JoinColumn`, `@Enumerated`, `@Temporal`, `@Transient`, etc."],
  ["Spring Boot", "What is the difference between `@OneToMany` and `@ManyToOne`?", "onetomany-vs-manytoone", "Compare relationship annotations.", "`@OneToMany` indicates a one-to-many relationship (parent to children). `@ManyToOne` indicates a many-to-one relationship (child to parent). They are opposites of the same relationship."],
  ["Spring Boot", "How do you write custom queries in Spring Data JPA?", "custom-queries", "Explain query methods.", "Use `@Query` with JPQL or native SQL on repository methods. Example: `@Query(\"SELECT u FROM User u WHERE u.email = :email\")`."],
  ["Spring Boot", "What is the `@Transactional` annotation?", "transactional", "Explain `@Transactional`.", "`@Transactional` manages transactions declaratively. It can be applied to methods or classes. It supports propagation, isolation, readOnly, timeout, and rollback rules."],
  ["Spring Boot", "What are the propagation levels in Spring Transactions?", "propagation-levels", "List propagation levels.", "`REQUIRED` (default), `SUPPORTS`, `MANDATORY`, `REQUIRES_NEW`, `NOT_SUPPORTED`, `NEVER`, `NESTED`. They define how transactions relate to existing ones."],
  ["Spring Boot", "What is the isolation level in transactions?", "isolation-levels", "Explain isolation.", "Isolation levels define how transaction concurrency is handled: `DEFAULT`, `READ_UNCOMMITTED`, `READ_COMMITTED`, `REPEATABLE_READ`, `SERIALIZABLE`. They affect locking and consistency."],
  ["Spring Boot", "What is the difference between `@Modifying` and `@Query`?", "modifying-vs-query", "Compare annotations.", "`@Query` is used for SELECT queries. For UPDATE or DELETE operations, add `@Modifying` to the `@Query` method, and the transaction must be marked for modification."],
  ["Spring Boot", "How do you implement pagination and sorting?", "pagination", "Explain pagination.", "Use `Pageable` and `Page<T>` in repository methods. Example: `Page<User> findAll(Pageable pageable)`. Also `Sort` for sorting. Controllers accept `PageRequest`."],
  ["Spring Boot", "What is the difference between `Save` and `SaveAll`?", "save-vs-saveall", "Compare save methods.", "`save` persists a single entity, returning the persisted entity (with generated ID). `saveAll` persists a collection, returning a list of entities. Both are transactional."],
  ["Spring Boot", "How do you handle optimistic locking?", "optimistic-locking", "Explain optimistic locking.", "Use `@Version` on a version field (Integer or Long). When updating, the version is checked. If it has changed, an `OptimisticLockException` is thrown."],
  ["Spring Boot", "How do you handle pessimistic locking?", "pessimistic-locking", "Explain pessimistic locking.", "Use `@Lock` annotation on repository methods with lock types: `PESSIMISTIC_READ`, `PESSIMISTIC_WRITE`. It acquires database locks."],
  ["Spring Boot", "What is the difference between JPA and Hibernate?", "jpa-vs-hibernate", "Compare the two.", "JPA is a specification (Java Persistence API). Hibernate is an implementation of JPA (and more). Spring Data JPA uses Hibernate as the default provider but can use others."],
  ["Spring Boot", "What is the `@Data` annotation from Lombok and how does it help?", "lombok-data", "Explain Lombok's `@Data`.", "Lombok is not a Spring feature but is commonly used to reduce boilerplate. `@Data` generates getters, setters, `equals`, `hashCode`, `toString`, and a constructor. It helps with entity/DTO classes."],
  ["Spring Boot", "How do you configure multiple data sources?", "multiple-datasources", "Explain multi-datasource setup.", "Define separate `DataSource`, `EntityManagerFactory`, and `TransactionManager` beans for each data source. Use `@Primary` for the main one. Use `@Qualifier` to inject specific managers."],
  ["Spring Boot", "What is the `@Enumerated` annotation?", "enumerated", "Explain enum mapping.", "`@Enumerated(EnumType.STRING)` stores the enum name; `EnumType.ORDINAL` stores the index (not recommended). Can also use `@Convert` for custom conversion."],
  ["Spring Boot", "How do you handle database migrations?", "database-migrations", "Explain migration tools.", "Use Flyway or Liquibase. They manage schema changes via versioned scripts. Spring Boot auto-configures Flyway/Liquibase when dependencies are present."],
  ["Spring Boot", "What is the difference between JPA and JDBC?", "jpa-vs-jdbc", "Compare JPA and JDBC.", "JDBC is a low-level API for executing SQL statements and handling result sets. JPA is a higher-level ORM that maps Java objects to database tables, reducing boilerplate and providing persistence features."],

  // ==================== SECURITY (15) ====================
  ["Spring Boot", "What is Spring Security?", "spring-security", "Explain Spring Security.", "Spring Security is a powerful framework for authentication, authorization, and protection against common attacks (CSRF, session fixation, etc.). It integrates with Spring Boot via auto-configuration."],
  ["Spring Boot", "How do you add Spring Security to a Spring Boot project?", "add-security", "Explain adding security.", "Add `spring-boot-starter-security` dependency. By default, it enables basic authentication with a generated password. Customize by providing a `SecurityFilterChain` bean."],
  ["Spring Boot", "What is the `@EnableWebSecurity` annotation?", "enablewebsecurity", "Explain the annotation.", "`@EnableWebSecurity` enables Spring Security's web security support. In Spring Boot, it's often included via `SecurityFilterChain` configuration without explicit annotation."],
  ["Spring Boot", "How do you configure user authentication?", "authentication-config", "Explain authentication.", "Use `AuthenticationManagerBuilder` to configure in-memory, JDBC, or custom `UserDetailsService`. Or use `UserDetailsService` bean. Password encoding with `PasswordEncoder` (e.g., `BCryptPasswordEncoder`)."],
  ["Spring Boot", "What is the `UserDetailsService` interface?", "userdetailsservice", "Explain `UserDetailsService`.", "`UserDetailsService` loads user-specific data. It has a method `loadUserByUsername` that returns a `UserDetails` object containing username, password, and authorities."],
  ["Spring Boot", "How do you implement JWT-based authentication?", "jwt-authentication", "Explain JWT implementation.", "Use `jjwt` or `Nimbus JOSE`. Create a filter to validate JWT tokens from `Authorization` header, set authentication in `SecurityContextHolder`. Configure `SecurityFilterChain` to permit public endpoints and secure others."],
  ["Spring Boot", "What is the `@PreAuthorize` annotation?", "preauthorize", "Explain method-level security.", "`@PreAuthorize` is used to restrict access to methods based on expressions (e.g., `hasRole('ADMIN')`, `hasPermission`). It is evaluated before method execution."],
  ["Spring Boot", "What is the difference between `@Secured` and `@PreAuthorize`?", "secured-vs-preauthorize", "Compare annotations.", "`@Secured` is a simpler annotation requiring roles. `@PreAuthorize` is more powerful, supporting SpEL expressions, method arguments, and permission evaluation. `@PreAuthorize` is preferred in modern Spring Security."],
  ["Spring Boot", "How do you enable method-level security?", "method-security", "Explain enabling.", "Add `@EnableGlobalMethodSecurity(prePostEnabled = true)` to a configuration class. Then use `@PreAuthorize` or `@PostAuthorize` on methods."],
  ["Spring Boot", "What is CSRF protection and when to disable it?", "csrf-protection", "Explain CSRF.", "CSRF (Cross-Site Request Forgery) protection is enabled by default in Spring Security (for state-changing methods). For REST APIs using JWT tokens, CSRF is often disabled because tokens are not stored in cookies."],
  ["Spring Boot", "How do you configure CORS in Spring Security?", "cors-security", "Explain CORS configuration.", "CORS can be configured in the `SecurityFilterChain` using `http.cors()`. Provide a `CorsConfigurationSource` bean or add `@CrossOrigin` on controllers."],
  ["Spring Boot", "What is the `SecurityContextHolder`?", "securitycontextholder", "Explain the context holder.", "`SecurityContextHolder` stores the current security context of the thread. It holds the `Authentication` object. It can be accessed anywhere to get the current user details."],
  ["Spring Boot", "How do you hash passwords in Spring Security?", "password-hashing", "Explain password encoding.", "Use a `PasswordEncoder` like `BCryptPasswordEncoder`, `Pbkdf2PasswordEncoder`, `SCryptPasswordEncoder`. They are one-way and salted. Never store plain text."],
  ["Spring Boot", "What is the `AuthenticationManager`?", "authenticationmanager", "Explain `AuthenticationManager`.", "`AuthenticationManager` is the interface that processes authentication requests. The default implementation is `ProviderManager`, which delegates to a list of `AuthenticationProvider`."],
  ["Spring Boot", "How do you handle session management in Spring Security?", "session-management", "Explain session handling.", "Configure `http.sessionManagement()` to set `SessionCreationPolicy`: `STATELESS` for REST APIs (no session), `ALWAYS`, `NEVER`, `IF_REQUIRED`. Also handle concurrency control."],

  // ==================== TESTING (15) ====================
  ["Spring Boot", "What is the `@SpringBootTest` annotation used for?", "springboottest-detail", "Explain integration test annotation.", "`@SpringBootTest` loads the full application context for integration tests. It can be used with `@Test` to test the entire application. It supports web environment configurations."],
  ["Spring Boot", "What is `@WebMvcTest`?", "webmvctest", "Explain slice test for web layer.", "`@WebMvcTest` tests only the web layer (controllers). It auto-configures `MockMvc` and scans `@Controller`, `@ControllerAdvice`, etc. It does not load other beans, making it faster."],
  ["Spring Boot", "What is `@DataJpaTest`?", "datajpatest", "Explain slice test for JPA.", "`@DataJpaTest` tests only the JPA layer. It configures an in-memory database, scans `@Entity` and `@Repository`, and auto-configures `TestEntityManager`. It does not load full context."],
  ["Spring Boot", "How do you use `MockMvc`?", "mockmvc", "Explain `MockMvc`.", "`MockMvc` is used to test web endpoints without a running server. Perform requests and assert responses. Use `@AutoConfigureMockMvc` to inject it."],
  ["Spring Boot", "What is the `@MockBean` annotation?", "mockbean", "Explain `@MockBean`.", "`@MockBean` creates a mock of a Spring bean (using Mockito) and replaces the actual bean in the context. Used in tests to isolate the component under test."],
  ["Spring Boot", "What is the difference between `@MockBean` and `@Mock`?", "mockbean-vs-mock", "Compare mocking annotations.", "`@Mock` is a Mockito annotation to create a mock object (not injected in Spring context). `@MockBean` is a Spring Boot test annotation that adds a mock to the application context."],
  ["Spring Boot", "How do you test REST APIs with `TestRestTemplate`?", "testresttemplate", "Explain `TestRestTemplate`.", "`TestRestTemplate` is a convenience client for testing REST endpoints in integration tests. It can be used with `@SpringBootTest(webEnvironment = RANDOM_PORT)` to make actual HTTP calls."],
  ["Spring Boot", "What is the `@Transactional` annotation in tests?", "transactional-test", "Explain transactional tests.", "When `@Transactional` is used on a test method, the test runs within a transaction that is rolled back after the test. This ensures the database remains clean."],
  ["Spring Boot", "How do you test exception handling?", "exception-testing", "Explain exception testing.", "Use `assertThrows` for expected exceptions in unit tests. For REST endpoints, use `MockMvc` to check status and error response bodies."],
  ["Spring Boot", "What is the `@TestPropertySource` annotation?", "testpropertysource", "Explain test properties.", "`@TestPropertySource` allows overriding property sources for a test. It can be used to set specific properties for the test context."],
  ["Spring Boot", "What are the best practices for testing Spring Boot applications?", "testing-best-practices", "List testing best practices.", "Use slice tests for specific layers to keep tests fast. Use `@SpringBootTest` for integration tests sparingly. Mock external dependencies. Use `@TestPropertySource` for configurations. Write unit tests with JUnit and Mockito."],
  ["Spring Boot", "How do you test security configurations?", "security-testing", "Explain security testing.", "Use `@WithMockUser` to simulate authenticated users. Use `@WithAnonymousUser`. Test secured endpoints with `MockMvc` and appropriate authorization headers."],
  ["Spring Boot", "What is the `@Sql` annotation?", "sql-annotation", "Explain database initialization.", "`@Sql` executes SQL scripts before or after test methods. Useful for setting up test data."],
  ["Spring Boot", "How do you test asynchronous methods?", "async-testing", "Explain async testing.", "Use `@Test` with `@Async` methods. Use `CountDownLatch` or `CompletableFuture` to wait for completion. Or use `@Timed` and assertions."],
  ["Spring Boot", "What is the `@Repeat` annotation (JUnit)?", "repeat-test", "Explain repeating tests.", "`@RepeatedTest` runs a test multiple times. Useful for stress testing or when dealing with flaky tests."],

  // ==================== MICROSERVICES & SPRING CLOUD (15) ====================
  ["Spring Boot", "What is Spring Cloud?", "spring-cloud", "Explain Spring Cloud.", "Spring Cloud is a set of frameworks for building distributed systems and microservices. It provides tools for service discovery, configuration management, circuit breakers, intelligent routing, and distributed tracing."],
  ["Spring Boot", "What is service discovery and how is it implemented in Spring Cloud?", "service-discovery", "Explain service discovery.", "Service discovery allows services to find each other. In Spring Cloud, use Netflix Eureka (or Consul/Zookeeper). Services register with a Eureka server, and clients look up services via the server."],
  ["Spring Boot", "What is the `@EnableDiscoveryClient` annotation?", "enablediscoveryclient", "Explain the annotation.", "`@EnableDiscoveryClient` enables service discovery in a Spring Boot application. It makes the application register with a discovery service (e.g., Eureka)."],
  ["Spring Boot", "What is an API Gateway in microservices?", "api-gateway", "Explain API Gateway.", "An API Gateway is a single entry point for clients, routing requests to appropriate microservices. It handles cross-cutting concerns like authentication, logging, rate limiting, and load balancing. Spring Cloud Gateway is the modern replacement for Zuul."],
  ["Spring Boot", "What is the difference between Zuul and Spring Cloud Gateway?", "zuul-vs-gateway", "Compare the two.", "Zuul 1.x is blocking, based on servlet. Spring Cloud Gateway is non-blocking, based on Spring WebFlux and Reactor, offering better performance and modern features. Spring Cloud Gateway is preferred for new projects."],
  ["Spring Boot", "What is a circuit breaker and how does Resilience4j work?", "circuit-breaker", "Explain circuit breaker pattern.", "A circuit breaker prevents cascading failures. Resilience4j is a lightweight library for fault tolerance. It provides circuit breaker, retry, rate limiter, bulkhead, and fallback mechanisms. Use `@CircuitBreaker` annotation."],
  ["Spring Boot", "What is the `@LoadBalanced` annotation?", "loadbalanced", "Explain load balancing.", "`@LoadBalanced` marks a `RestTemplate` or `WebClient` bean to be used with client-side load balancing. It intercepts service names and resolves to actual instances using a `ServiceInstanceListSupplier`."],
  ["Spring Boot", "What is Spring Cloud Config?", "spring-cloud-config", "Explain Config Server.", "Spring Cloud Config provides server and client support for externalized configuration in a distributed system. Configuration is served from a Git repository or other backends. Clients fetch configuration on startup."],
  ["Spring Boot", "What is the `@RefreshScope` annotation?", "refreshscope", "Explain `@RefreshScope`.", "`@RefreshScope` allows beans to be refreshed when configuration changes (e.g., from Config Server). It uses a proxy and recreates the bean when `refresh` is triggered."],
  ["Spring Boot", "What is distributed tracing and how is it implemented?", "distributed-tracing", "Explain tracing.", "Distributed tracing tracks requests across multiple services. Spring Cloud Sleuth adds tracing identifiers (traceId, spanId) to logs. Zipkin can be used to visualize traces."],
  ["Spring Boot", "What is the difference between `@FeignClient` and `RestTemplate`?", "feign-vs-resttemplate", "Compare HTTP clients.", "Feign is a declarative REST client. You define an interface with annotations, and Feign generates the implementation. It integrates with load balancing and circuit breakers. `RestTemplate` is a lower-level client."],
  ["Spring Boot", "What is the `@EnableFeignClients` annotation?", "enablefeignclients", "Explain Feign enabling.", "`@EnableFeignClients` enables Feign client scanning. It must be placed on the application class. It scans for interfaces annotated with `@FeignClient`."],
  ["Spring Boot", "How do you implement messaging with Spring Cloud Stream?", "spring-cloud-stream", "Explain Spring Cloud Stream.", "Spring Cloud Stream simplifies event-driven microservices by providing a programming model over message brokers (Kafka, RabbitMQ). It uses binders and `@EnableBinding` (deprecated in favor of functional programming)."],
  ["Spring Boot", "What is a `@MessageMapping` in Spring WebSocket?", "message-mapping", "Explain WebSocket messaging.", "`@MessageMapping` maps WebSocket messages to methods (similar to `@RequestMapping`). Used in `@Controller` classes with `@EnableWebSocketMessageBroker`."],
  ["Spring Boot", "What is the role of `@EventListener`?", "eventlistener", "Explain event listening.", "`@EventListener` marks a method to listen to application events (e.g., `ApplicationReadyEvent`, custom events). It supports asynchronous processing with `@Async`."],

  // ==================== ACTUATOR & MONITORING (10) ====================
  ["Spring Boot", "What endpoints does Actuator provide?", "actuator-endpoints", "List Actuator endpoints.", "Common endpoints: `/health`, `/info`, `/metrics`, `/env`, `/loggers`, `/mappings`, `/configprops`, `/heapdump`, `/threaddump`, `/shutdown` (if enabled)."],
  ["Spring Boot", "How do you customize the `/health` endpoint?", "health-custom", "Explain custom health checks.", "Implement `HealthIndicator` interface and override `health()`. Return `Health.up()` or `Health.down().withDetail(...)`. The status is aggregated into the overall health."],
  ["Spring Boot", "How do you expose custom metrics?", "custom-metrics", "Explain custom metrics.", "Use `MeterRegistry` to register counters, gauges, timers, etc. Use `@Timed` or `@Counted` AOP annotations. Also, use `Micrometer` for integration with monitoring systems (Prometheus, Graphite)."],
  ["Spring Boot", "What is the `/info` endpoint used for?", "info-endpoint", "Explain info.", "The `/info` endpoint exposes arbitrary application information. You can contribute via `InfoContributor` beans or add `info.*` properties in the config."],
  ["Spring Boot", "How do you enable the `/shutdown` endpoint?", "shutdown-endpoint", "Explain shutdown.", "`/shutdown` is disabled by default. Enable it by setting `management.endpoint.shutdown.enabled=true` and exposing it via `management.endpoints.web.exposure.include=shutdown`."],
  ["Spring Boot", "What is the purpose of the `/loggers` endpoint?", "loggers-endpoint", "Explain loggers.", "`/loggers` allows viewing and changing logging levels at runtime. Useful for debugging."],
  ["Spring Boot", "How do you secure Actuator endpoints?", "actuator-security", "Explain securing Actuator.", "Add Spring Security and configure `http.authorizeRequests().requestMatchers(EndpointRequest.toAnyEndpoint()).hasRole('ADMIN')`."],
  ["Spring Boot", "What is the difference between `@Endpoint` and `@WebEndpoint`?", "endpoint-annotation", "Compare endpoint annotations.", "`@Endpoint` is a generic endpoint for all technologies (JMX, web). `@WebEndpoint` is specifically for web exposure. Both are used to create custom Actuator endpoints."],
  ["Spring Boot", "How do you create a custom Actuator endpoint?", "custom-actuator-endpoint", "Explain custom endpoint creation.", "Annotate a class with `@Endpoint(id=\"myendpoint\")`. Add methods with `@ReadOperation`, `@WriteOperation`, or `@DeleteOperation`. The endpoint will be exposed if the path is included."],
  ["Spring Boot", "What is Micrometer and why is it used?", "micrometer", "Explain Micrometer.", "Micrometer is a facade for application metrics, similar to SLF4J for logging. It supports various monitoring systems (Prometheus, Datadog, etc.). Spring Boot uses Micrometer for actuator metrics."],

  // ==================== ADVANCED FEATURES (10) ====================
  ["Spring Boot", "What is aspect-oriented programming (AOP) in Spring?", "aop", "Explain AOP.", "AOP allows separating cross-cutting concerns (logging, security, transactions) from business logic. Use `@Aspect` to define aspects and advice (`@Before`, `@After`, `@Around`, etc.)."],
  ["Spring Boot", "What is the `@Aspect` annotation?", "aspect-annotation", "Explain `@Aspect`.", "`@Aspect` marks a class as an aspect (containing advice and pointcuts). Enable AOP with `@EnableAspectJAutoProxy`."],
  ["Spring Boot", "What is the difference between `@Before`, `@After`, `@Around`?", "advice-types", "Compare advice types.", "`@Before` runs before method execution. `@After` runs after (whether success or exception). `@AfterReturning` runs after successful return. `@AfterThrowing` on exception. `@Around` wraps the entire method, allowing custom logic before and after."],
  ["Spring Boot", "How do you use `@EventListener` for asynchronous events?", "eventlistener-async", "Explain async events.", "Annotate a method with `@EventListener` and `@Async` to make it asynchronous. The event is published, and the listener executes in a separate thread."],
  ["Spring Boot", "What is Spring Boot's support for WebFlux?", "webflux", "Explain reactive support.", "Spring Boot supports reactive programming with Spring WebFlux. It provides `spring-boot-starter-webflux` for building non-blocking, reactive web applications using Reactor."],
  ["Spring Boot", "What is the difference between `@RestController` and `@Controller` in WebFlux?", "restcontroller-webflux", "Compare in reactive context.", "The same annotations apply. In WebFlux, you can return `Mono<T>` or `Flux<T>` for reactive types. The framework handles the async behavior."],
  ["Spring Boot", "How do you use `@Conditional` annotations?", "conditional", "Explain conditional configuration.", "`@Conditional` and its meta-annotations (`@ConditionalOnClass`, `@ConditionalOnProperty`, etc.) are used to conditionally enable bean configuration based on certain criteria."],
  ["Spring Boot", "What is the `@Profile` annotation?", "profile-annotation", "Explain `@Profile`.", "`@Profile` indicates that a component is eligible for registration when the specified profile is active. It can be used on beans or configurations."],
  ["Spring Boot", "What is the difference between `@Configuration` and `@Component`?", "configuration-vs-component", "Compare the two.", "`@Configuration` is a specialized `@Component` that indicates the class contains `@Bean` methods. It is processed by CGLIB proxies to ensure singleton behavior."],
  ["Spring Boot", "How do you create a custom starter?", "custom-starter", "Explain creating a starter.", "A custom starter bundles dependencies and auto-configuration. Create a module with a `META-INF/spring.factories` file containing `org.springframework.boot.autoconfigure.EnableAutoConfiguration` pointing to your configuration class."],

  // ==================== DEPLOYMENT & PERFORMANCE (10) ====================
  ["Spring Boot", "How do you package a Spring Boot application?", "packaging", "Explain packaging options.", "Use Maven/Gradle to build a JAR (fat jar) or WAR file. The JAR includes all dependencies and the embedded server. Use `mvn package` or `gradle bootJar`."],
  ["Spring Boot", "What is the difference between JAR and WAR deployment?", "jar-vs-war", "Compare deployment methods.", "JAR is self-contained with embedded server; WAR is deployed to an external servlet container (Tomcat, Jetty). JAR is simpler and recommended for modern microservices."],
  ["Spring Boot", "How do you run a Spring Boot application?", "run-application", "Explain running.", "Use `java -jar myapp.jar` for JAR. For development, use `mvn spring-boot:run` or IDE run. For WAR, deploy to a server."],
  ["Spring Boot", "What is the `spring-boot-maven-plugin`?", "maven-plugin", "Explain the plugin.", "The plugin provides goals like `spring-boot:run`, `spring-boot:repackage` (to create executable JAR), and `spring-boot:start`/`stop`. It's essential for building Spring Boot apps with Maven."],
  ["Spring Boot", "How do you optimize Spring Boot startup time?", "startup-optimization", "Explain startup optimization.", "Use `spring.jmx.enabled=false`, `spring.main.lazy-initialization=true`, and exclude unused auto-configuration. Also, use `-Dspring.profiles.active` to load only necessary beans."],
  ["Spring Boot", "What are the best practices for configuration management?", "config-best-practices", "List configuration best practices.", "Use profiles for environments. Externalize configuration. Use `@ConfigurationProperties` for type-safe binding. Keep secrets in environment variables or secrets management systems."],
  ["Spring Boot", "How do you handle logging in Spring Boot?", "logging", "Explain logging.", "Spring Boot uses Logback by default. Configure via `application.properties` (`logging.level.*`, `logging.file.*`). Can also use Log4j2 by excluding Logback."],
  ["Spring Boot", "What is the `spring-boot-devtools` module?", "devtools", "Explain DevTools.", "DevTools provides development-time features: automatic restart on code changes, LiveReload for browser refresh, and improved logging. It is disabled in production."],
  ["Spring Boot", "How do you configure a custom banner?", "custom-banner", "Explain banner customization.", "Place a `banner.txt` in `src/main/resources` or set `spring.banner.location`. Use ASCII art or Spring Boot's `Banner` interface."],
  ["Spring Boot", "What is the `@ConditionalOnMissingBean` annotation?", "conditional-on-missing-bean", "Explain condition.", "This annotation ensures that a bean is only created if another bean of the same type is not already present. Useful for providing default implementations."],

  // ==================== SCENARIO-BASED (15) ====================
  ["Spring Boot", "How would you design a RESTful API with Spring Boot for a library management system?", "library-api-design", "Explain designing a library API.", "Define entities (Book, Author, Member). Use Spring Data JPA repositories. Create REST controllers with endpoints: GET /books, POST /books, PUT /books/{id}, DELETE /books/{id}. Implement validation, exception handling, and DTOs for responses."],
  ["Spring Boot", "How would you implement authentication and authorization with JWT in Spring Boot?", "jwt-implementation-scenario", "Explain JWT implementation.", "Create a `UserDetailsService`. Generate JWT token on login. Add a filter that validates the token and sets `Authentication` in `SecurityContext`. Configure `SecurityFilterChain` to permit `/login` and secure others. Use `@PreAuthorize` for method-level security."],
  ["Spring Boot", "How would you handle distributed transactions in a microservices architecture?", "distributed-transactions", "Explain handling distributed transactions.", "Use the Saga pattern (or two-phase commit if possible). Implement compensating actions. Use event-driven communication with messages (Kafka) and orchestration/choreography."],
  ["Spring Boot", "How would you optimize a slow database query in a Spring Boot application?", "query-optimization", "Explain query optimization.", "Use `@Query` with native SQL to tune. Add indexes on frequently queried columns. Use pagination and projection to limit data. Enable query logging to see generated SQL. Consider caching with `@Cacheable`."],
  ["Spring Boot", "How would you secure a Spring Boot application against XSS and CSRF?", "xss-csrf", "Explain security measures.", "For XSS: use output encoding (Spring provides default in templates), and validate user input. For CSRF: Spring Security enables it by default; if using JWT (stateless), disable CSRF. Also use `Content-Security-Policy` headers."],
  ["Spring Boot", "How would you implement file upload and download in Spring Boot?", "file-upload-download-scenario", "Explain file handling.", "Use `MultipartFile` for upload. Save files to disk or cloud storage. For download, return `ResponseEntity` with `InputStreamResource` and set content-disposition header."],
  ["Spring Boot", "How would you implement caching for expensive method calls?", "caching-scenario", "Explain caching implementation.", "Enable caching with `@EnableCaching`. Annotate the method with `@Cacheable(value = \"books\", key = \"#id\")`. Use a cache manager (EhCache, Caffeine) and configure TTL."],
  ["Spring Boot", "How would you handle logging in a microservices architecture?", "logging-microservices", "Explain logging strategy.", "Use structured logging (JSON) with correlation IDs (traceId, spanId). Use Sleuth and Zipkin for tracing. Aggregate logs in a central system (ELK stack) and set up alerts."],
  ["Spring Boot", "How would you implement scheduled tasks with dynamic schedules?", "dynamic-scheduling", "Explain dynamic scheduling.", "Use `@Scheduled` with cron expression from properties. Or implement `SchedulingConfigurer` to programmatically set schedules. Use `ThreadPoolTaskScheduler` for dynamic scheduling."],
  ["Spring Boot", "How would you handle large file uploads without memory issues?", "large-file-upload", "Explain handling large files.", "Stream the file using `InputStream` and save in chunks. Configure `spring.servlet.multipart.file-size-threshold` and `max-file-size`. Use `StreamingMultipartFile` or process in chunks."],
  ["Spring Boot", "How would you implement database auditing (created by, modified by)?", "auditing", "Explain auditing.", "Use Spring Data JPA auditing with `@CreatedDate`, `@LastModifiedDate`, `@CreatedBy`, `@LastModifiedBy`. Enable auditing with `@EnableJpaAuditing`. Provide a `AuditorAware` bean to return the current user."],
  ["Spring Boot", "How would you design a retry mechanism for external API calls?", "retry-mechanism", "Explain retries.", "Use `spring-retry` with `@Retryable` annotation. Configure max attempts, backoff, and exceptions to retry. Also use Resilience4j for more advanced retry policies."],
  ["Spring Boot", "How would you implement a custom validation for a REST API?", "custom-validation", "Explain custom validation.", "Create a custom annotation with `@Constraint(validatedBy = MyValidator.class)`. Implement `ConstraintValidator` with validation logic. Use it on DTO fields."],
  ["Spring Boot", "How would you handle internationalization (i18n) in a Spring Boot application?", "i18n", "Explain i18n.", "Use `MessageSource` and `ResourceBundleMessageSource`. Create properties files (messages_en.properties, messages_fr.properties). Use `MessageSource` to resolve messages. In REST, use `Accept-Language` header."],
  ["Spring Boot", "How would you implement a health check for a dependent service?", "health-check-dependent", "Explain dependent health check.", "Implement a custom `HealthIndicator` that checks the external service (e.g., via HTTP ping). Return `Health.up()` if reachable, else `Health.down()` with details."],
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain Spring Boot concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing Spring Boot annotations without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "spring-boot" },
    update: { name: "Spring Boot", group: "Technology", description: "Spring Boot interview questions." },
    create: { name: "Spring Boot", slug: "spring-boot", group: "Technology", description: "Spring Boot interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "spring-boot" } },
    update: {},
    create: { name: "Spring Boot", slug: "spring-boot", categoryId: category.id },
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
        tags: ["Spring Boot"],
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
        tags: ["Spring Boot"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} Spring Boot questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");