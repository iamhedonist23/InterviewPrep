import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type SectionSeed = { title: string; content: string; };

type TopicSeed = { title: string; slug: string; description: string; estimatedMinutes: number; sections: SectionSeed[]; };

type ModuleSeed = { title: string; slug: string; description: string; topics: TopicSeed[]; };

type PathSeed = { name: string; slug: string; description: string; level: StudyLevel; modules: ModuleSeed[]; };

type CategorySeed = { name: string; slug: string; description: string; icon: string; sortOrder: number; paths: PathSeed[]; };

const modules: ModuleSeed[] = [
  {
    title: "Introduction To Spring Boot",
    slug: "introduction-to-spring-boot",
    description: "Learn introduction to spring boot through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "What Is Spring Boot?",
        slug: "what-is-spring-boot",
        description: "Spring Boot is a Java-based framework built on top of the Spring Framework. Its main purpose is to make it easier to create stand-alone, production-ready S.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot is a Java-based framework built on top of the Spring Framework. Its main purpose is to make it easier to create stand-alone, production-ready Spring applications with less manual configuration.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot is a Java-based framework built on top of the Spring Framework. Its main purpose is to make it easier to create stand-alone, production-ready Spring applications with less manual configuration.\n\nThe important word is simplification. Traditional Spring applications can require developers to configure many pieces themselves. Spring Boot provides sensible defaults, auto-configuration, starter dependencies, embedded servers, and production-oriented features so that the developer can concentrate more on application behavior.\n\nThink of it this way:\n\nTraditional approach:\n```java\nChoose libraries -> configure them -> configure the server -> wire components -> run application\n```\n\nSpring Boot approach:\n```java\nChoose starters -> write application code -> Boot configures common infrastructure -> run application\n```\n\nSpring Boot does not replace Spring Core. It builds on the Spring ecosystem and makes common Spring application setup much easier.\n\nA Spring Boot application can be packaged and run as an executable JAR. For web applications, an embedded server such as Tomcat can be included so the application can start without requiring a separately installed servlet container.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nChoose libraries -> configure them -> configure the server -> wire components -> run application\n```",
          },
          ],
      },
      {
        title: "Features Of Spring Boot",
        slug: "features-of-spring-boot",
        description: "Spring Boot examines the application classpath and configuration and automatically configures many common components. For example, adding web-related depen.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot examines the application classpath and configuration and automatically configures many common components. For example, adding web-related dependencies allows Boot to prepare the application for web development.",
          },
          {
            title: "Detailed explanation",
            content: "**Auto-Configuration**\n\nSpring Boot examines the application classpath and configuration and automatically configures many common components. For example, adding web-related dependencies allows Boot to prepare the application for web development.\n\n**Starter Dependencies**\n\nA starter groups dependencies for a common purpose. Instead of manually adding many related libraries, the application can depend on a starter such as spring-boot-starter-web or spring-boot-starter-data-jpa.\n\n**Stand-Alone Applications**\n\nApplications can run independently, commonly with an embedded server. A packaged application can be started with a command such as:\n\n```java\njava -jar app.jar\n```\n\n**Opinionated Defaults**\n\nSpring Boot follows conventions and provides default choices for common scenarios. You can override these choices when your application needs different behavior.\n\n**Production-Ready Features**\n\nSpring Boot Actuator provides endpoints and infrastructure for health checks, metrics, environment information, and other operational needs.\n\n**Reduced Boilerplate**\n\nThe combination of starters, auto-configuration, annotations, and sensible defaults reduces repetitive setup code.\n\n**Configuration Flexibility**\n\nApplication behavior can be configured with application.properties, application.yml, environment variables, command-line arguments, and profiles.\n\n**No Xml Required For Common Setups**\n\nSpring Boot encourages Java configuration and annotations, although the exact configuration style depends on the application.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```bash\njava -jar app.jar\n```",
          },
          ],
      },
      {
        title: "Advantages and Use Cases",
        slug: "advantages-and-use-cases",
        description: "Advantages include rapid development, embedded servers, simplified dependency management, easier microservice development, production-oriented features, fl.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Advantages include rapid development, embedded servers, simplified dependency management, easier microservice development, production-oriented features, flexible configuration, and integration with the wider Spring ecosystem.",
          },
          {
            title: "Detailed explanation",
            content: "Advantages include rapid development, embedded servers, simplified dependency management, easier microservice development, production-oriented features, flexible configuration, and integration with the wider Spring ecosystem.\n\nTypical use cases include:\n- REST APIs\n- Microservices\n- Enterprise web applications\n- Cloud-oriented backend services\n- Rapid prototypes\n- E-commerce systems\n- Banking and financial systems\n- Healthcare systems\n- Travel and booking platforms\n- Learning management systems\n- Logistics and supply-chain systems\n- CMS and HR/payroll systems\n- IoT backend services\n\nThe key idea is that Spring Boot is useful whenever a Java application needs a structured application framework with dependency management, web support, data access, security, testing, and operational tooling.",
          },
          {
            title: "Example",
            content: "**Example:** Advantages include rapid development, embedded servers, simplified dependency management, easier microservice development, production-oriented features, flexible configuration, and integration with the wider Spring ecosystem.",
          },
          ],
      },
      {
        title: "Spring Boot vs. Spring Framework",
        slug: "spring-boot-vs-spring-framework",
        description: "Spring Framework provides the underlying ecosystem and core capabilities such as dependency injection and application infrastructure. Spring Boot focuses o.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Framework provides the underlying ecosystem and core capabilities such as dependency injection and application infrastructure. Spring Boot focuses on simplifying the setup and operational packaging of Spring applications.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Framework provides the underlying ecosystem and core capabilities such as dependency injection and application infrastructure. Spring Boot focuses on simplifying the setup and operational packaging of Spring applications.\n\nA useful comparison:\n\nSpring Framework:\n- More manual configuration is possible.\n- Dependency choices are managed more directly by the developer.\n- External server setup may be required depending on the application.\n- Production monitoring usually requires additional setup.\n\nSpring Boot:\n- Auto-configuration reduces setup work.\n- Starters simplify dependency selection.\n- Embedded servers support stand-alone web applications.\n- Actuator provides production-oriented endpoints.\n- Executable JAR packaging is a common deployment model.\n\nDo not think of this as “Spring versus Boot.” Spring Boot is built around Spring capabilities and makes common Spring development faster and more convention-driven.",
          },
          {
            title: "Example",
            content: "**Example:** Spring Framework provides the underlying ecosystem and core capabilities such as dependency injection and application infrastructure. Spring Boot focuses on simplifying the setup and operational packaging of Spring applications.",
          },
          ],
      },
      {
        title: "Spring Boot Architecture",
        slug: "spring-boot-architecture",
        description: "this topic describes the main architectural building blocks as Spring Core, auto-configuration, starter dependencies, Spring Boot CLI, embedded servers, an.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic describes the main architectural building blocks as Spring Core, auto-configuration, starter dependencies, Spring Boot CLI, embedded servers, and Spring Boot Actuator. At the application level, a common request flow looks like: Client | | HTTP request v Controller | v Service layer | v Repository / data access | v Database Dependency injection connects the components.",
          },
          {
            title: "Detailed explanation",
            content: "this topic describes the main architectural building blocks as Spring Core, auto-configuration, starter dependencies, Spring Boot CLI, embedded servers, and Spring Boot Actuator.\n\nAt the application level, a common request flow looks like:\n\n```java\nClient\n   |\n   | HTTP request\n   v\nController\n   |\n   v\nService layer\n   |\n   v\nRepository / data access\n   |\n   v\nDatabase\n```\n\nDependency injection connects the components. The controller handles the web request, the service contains business rules, and the repository/data-access layer communicates with the database.\n\nThe architecture diagram in this topic also shows the client -> controller -> service -> model/database relationship and dependency injection between application components. The important lesson is separation of responsibilities rather than putting all logic into one controller.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nClient\n   |\n   | HTTP request\n   v\nController\n   |\n   v\nService layer\n   |\n   v\nRepository / data access\n   |\n   v\nDatabase\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Getting Started",
    slug: "getting-started",
    description: "Learn getting started through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Setting Up A Spring Boot Project",
        slug: "setting-up-a-spring-boot-project",
        description: "this topic introduces Spring Initializr as the starting point for creating a Spring Boot project. It also identifies Maven and Gradle as common build tools.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic introduces Spring Initializr as the starting point for creating a Spring Boot project. It also identifies Maven and Gradle as common build tools.",
          },
          {
            title: "Detailed explanation",
            content: "this topic introduces Spring Initializr as the starting point for creating a Spring Boot project. It also identifies Maven and Gradle as common build tools.\n\nTypical project choices include:\n- Build tool: Maven or Gradle\n- Language: Java, Kotlin, or Groovy\n- Project metadata: group and artifact\n- Spring Boot version\n- Dependencies required by the application\n\nThe important concept is that the build tool manages dependencies and packaging. Spring Initializr creates a project structure and build configuration so the developer can start writing application code quickly.",
          },
          {
            title: "Example",
            content: "**Example:** this topic introduces Spring Initializr as the starting point for creating a Spring Boot project. It also identifies Maven and Gradle as common build tools.",
          },
          ],
      },
      {
        title: "Project Structure Overview",
        slug: "project-structure-overview",
        description: "A typical Spring Boot project separates source code from resources and tests. A common structure is: src/ main/ java/ .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A typical Spring Boot project separates source code from resources and tests. A common structure is: src/ main/ java/ ...",
          },
          {
            title: "Detailed explanation",
            content: "A typical Spring Boot project separates source code from resources and tests.\n\nA common structure is:\n\nsrc/\nmain/\n```java\njava/\n  ... application packages ...\nresources/\n  application.properties or application.yml\n```\n\ntest/\n```java\njava/\n  ... test classes ...\n```\n\ntarget/\n... build output ...\n\nA layered application may contain packages such as:\n- controller: HTTP endpoints\n- service: business logic\n- repository or dao: persistence logic\n- model/entity: application and database objects\n\nThe exact package names can vary. The important point is to keep responsibilities understandable and keep the main application class in a package that allows component scanning to discover the application components.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\njava/\n  ... application packages ...\nresources/\n  application.properties or application.yml\n```",
          },
          ],
      },
      {
        title: "Application Entry Point: @SpringBootApplication",
        slug: "application-entry-point-springbootapplication",
        description: "@SpringBootApplication is the main convenience annotation used at the application entry point. this topic explains it as a combination of: @Configuration @.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@SpringBootApplication is the main convenience annotation used at the application entry point. this topic explains it as a combination of: @Configuration @EnableAutoConfiguration @ComponentScan @SpringBootApplication public class MyApplication { public static void main(String[] args) { SpringApplication.run(MyApplication.class, args); } } SpringApplication.run(...) starts the Spring application context and begins...",
          },
          {
            title: "Detailed explanation",
            content: "@SpringBootApplication is the main convenience annotation used at the application entry point. this topic explains it as a combination of:\n\n```java\n@Configuration\n@EnableAutoConfiguration\n@ComponentScan\n```\n\n**Example:**\n\n```java\n@SpringBootApplication\npublic class MyApplication {\npublic static void main(String[] args) {\n    SpringApplication.run(MyApplication.class, args);\n}\n}\n```\n\n**Conceptually:**\n\n- @Configuration tells Spring that the class can provide configuration.\n- @EnableAutoConfiguration enables Boot's automatic configuration mechanism.\n- @ComponentScan tells Spring to discover component classes in the relevant package hierarchy.\n\nSpringApplication.run(...) starts the Spring application context and begins application startup.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@SpringBootApplication is the main convenience annotation used at the application entry point. this topic explains it as a combination of:\n\n```java\n@Configuration\n@EnableAutoConfiguration\n@ComponentScan\n```",
          },
          ],
      },
      {
        title: "Running The Application",
        slug: "running-the-application",
        description: "The application can be started from an IDE, through the build tool, or from a packaged JAR. For a packaged application, this topic uses: java -jar target/m.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "The application can be started from an IDE, through the build tool, or from a packaged JAR. For a packaged application, this topic uses: java -jar target/myapp.jar During startup, Spring creates the application context, discovers configuration and components, creates beans, wires dependencies, and starts required infrastructure such as the embedded web server when the application is a web application.",
          },
          {
            title: "Detailed explanation",
            content: "The application can be started from an IDE, through the build tool, or from a packaged JAR.\n\nFor a packaged application, this topic uses:\n\n```java\njava -jar target/myapp.jar\n```\n\nDuring startup, Spring creates the application context, discovers configuration and components, creates beans, wires dependencies, and starts required infrastructure such as the embedded web server when the application is a web application.\n\nWhen startup succeeds, the console normally contains startup messages showing that the application has started and, for web applications, the server has been initialized.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```bash\njava -jar target/myapp.jar\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Core Concepts",
    slug: "core-concepts",
    description: "Learn core concepts through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Spring Boot Annotations",
        slug: "spring-boot-annotations",
        description: "Spring Boot applications use annotations to describe components, configuration, web endpoints, dependency injection, and other behavior. The important skil.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot applications use annotations to describe components, configuration, web endpoints, dependency injection, and other behavior. The important skill is knowing the role of an annotation rather than simply knowing its name.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot applications use annotations to describe components, configuration, web endpoints, dependency injection, and other behavior. The important skill is knowing the role of an annotation rather than simply knowing its name.\n\n```java\n@SpringBootApplication\n```\n\nThis is the application entry point and combines configuration, auto-configuration, and component scanning.\n\n**Interview point:**\n\nQ: What does @SpringBootApplication contain?\nA: @Configuration + @EnableAutoConfiguration + @ComponentScan.\n\n```java\n@Component\n```\n\n@Component marks a class as a Spring-managed component. It is a general-purpose stereotype used when a class does not more specifically represent a service, repository, or controller.\n\n**Example:**\n\n```java\n@Component\npublic class PriceCalculator {\npublic double calculate(double price) {\n    return price * 1.18;\n}\n}\n```\n\nOnce discovered by component scanning, Spring can create and manage this object as a bean.\n\n```java\n@Service\n```\n\n@Service is a specialization of @Component intended for service-layer classes. The service layer is where business rules are normally placed.\n\n**Example:**\n\n```java\n@Service\npublic class OrderService {\npublic void processOrder() {\n    // business logic\n}\n}\n```\n\nUsing @Service communicates intent. Another developer can immediately understand that the class represents business operations rather than HTTP handling or persistence.\n\n```java\n@Repository\n```\n\n@Repository identifies a data-access component. It is commonly used for classes or interfaces responsible for persistence operations. this topic also highlights exception translation into Spring's data-access exception hierarchy.\n\n**Example:**\n\n```java\n@Repository\npublic class ProductRepository {\npublic void save(Product product) {\n    // persistence logic\n}\n}\n```\n\nIn Spring Data applications, repository interfaces such as JpaRepository are commonly used instead of writing every CRUD operation manually.\n\n```java\n@Controller\n```\n\n@Controller is used in Spring MVC for web controllers that commonly return view names.\n\n**Example:**\n\n```java\n@Controller\npublic class HomeController {\n@GetMapping(\"/\")\npublic String index(Model model) {\n    model.addAttribute(\"message\", \"Welcome\");\n    return \"index\";\n}\n}\n```\n\nThe returned value represents a view name that a view resolver can use to locate a template.\n\n```java\n@RestController\n```\n\n@RestController is used for REST APIs. this topic describes it as:\n\n```java\n@Controller + @ResponseBody\n```\n\nThe important difference is that the returned object is written to the HTTP response body and can be serialized into formats such as JSON.\n\n**Example:**\n\n```java\n@RestController\n@RequestMapping(\"/users\")\npublic class UserController {\n@GetMapping\npublic List<User> getUsers() {\n    return userService.getAll();\n}\n}\n```\n\nA common interview question is: “What is the difference between @Controller and @RestController?” The short answer is that @Controller is commonly used for MVC views, while @RestController is designed for response bodies in REST-style APIs.\n\n@Autowired AND @Qualifier\n@Autowired asks Spring to inject a suitable bean. Injection can be performed through a constructor, setter, or field. this topic includes all three forms and uses constructor injection as an example.\n\nConstructor injection:\n\n```java\n@Service\npublic class OrderService {\nprivate final PaymentService paymentService;\n\n@Autowired\npublic OrderService(PaymentService paymentService) {\n    this.paymentService = paymentService;\n}\n}\n```\n\nThe dependency is explicit and the field can remain final.\n\n@Qualifier becomes important when more than one bean matches the same dependency type.\n\n```java\n@Component(\"dieselEngine\")\nclass DieselEngine implements Engine { }\n\n@Component(\"petrolEngine\")\nclass PetrolEngine implements Engine { }\n```\n\nThen:\n\n```java\n@Autowired\n@Qualifier(\"dieselEngine\")\nprivate Engine engine;\n```\n\nSpring now knows which Engine implementation should be injected.\n\n@Configuration AND @Bean\n@Configuration marks a class that contains configuration and bean definitions.\n\n@Bean is placed on a method to tell Spring that the object returned by the method should be managed as a bean.\n\n**Example:**\n\n```java\n@Configuration\npublic class AppConfig {\n\n@Bean\npublic UserRepository userRepository() {\n    return new InMemoryUserRepository();\n}\n\n@Bean\npublic UserService userService() {\n    return new UserServiceImpl(userRepository());\n}\n}\n```\n\nUse @Component when Spring can discover a class directly. Use @Bean when you want to create or configure an object explicitly, including objects from third-party libraries that you cannot annotate yourself.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@SpringBootApplication\n```",
          },
          ],
      },
      {
        title: "Dependency Injection (DI)",
        slug: "dependency-injection-di",
        description: "Dependency Injection means an object receives the objects it depends on instead of constructing those dependencies itself. Without DI: public class OrderSe.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Dependency Injection means an object receives the objects it depends on instead of constructing those dependencies itself. Without DI: public class OrderService { private PaymentService paymentService = new PaymentService(); } The class decides exactly which implementation to construct.",
          },
          {
            title: "Detailed explanation",
            content: "Dependency Injection means an object receives the objects it depends on instead of constructing those dependencies itself.\n\nWithout DI:\n\n```java\npublic class OrderService {\nprivate PaymentService paymentService = new PaymentService();\n}\n```\n\nThe class decides exactly which implementation to construct. That creates stronger coupling.\n\nWith DI:\n\n```java\npublic class OrderService {\nprivate final PaymentService paymentService;\n\npublic OrderService(PaymentService paymentService) {\n    this.paymentService = paymentService;\n}\n}\n```\n\nSpring can supply the dependency when it creates OrderService.\n\nWhy DI matters:\n- Loose coupling\n- Easier unit testing\n- Better maintainability\n- Easier replacement of implementations\n- Clearer dependencies\n- Better alignment with dependency inversion principles\n\n**Three Common Forms**",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\npublic class OrderService {\nprivate PaymentService paymentService = new PaymentService();\n}\n```",
          },
          ],
      },
      {
        title: "Inversion Of Control (IoC)",
        slug: "inversion-of-control-ioc",
        description: "IoC is the broader principle behind the container-managed model. Instead of application code controlling every object creation and dependency relationship,.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "IoC is the broader principle behind the container-managed model. Instead of application code controlling every object creation and dependency relationship, the Spring container takes responsibility for creating and wiring managed objects.",
          },
          {
            title: "Detailed explanation",
            content: "IoC is the broader principle behind the container-managed model. Instead of application code controlling every object creation and dependency relationship, the Spring container takes responsibility for creating and wiring managed objects.\n\nHigh-level flow:\n\nDI is one way IoC is implemented. A useful interview distinction is:\n\nIoC = principle\nDI = technique used to achieve IoC\n\nThe Spring container is therefore central to both concepts.",
          },
          {
            title: "Example",
            content: "**Example:** IoC is the broader principle behind the container-managed model. Instead of application code controlling every object creation and dependency relationship, the Spring container takes responsibility for creating and wiring managed objects.",
          },
          ],
      },
    ],
  },
  {
    title: "Configuration",
    slug: "configuration",
    description: "Learn configuration through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "application.properties vs. application.yml",
        slug: "application-properties-vs-application-yml",
        description: "Both formats can express Spring Boot configuration. Properties style: server.port=8081 spring.datasource.url=jdbc:mysql://localhost:3306/db spring.datasour.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Both formats can express Spring Boot configuration. Properties style: server.port=8081 spring.datasource.url=jdbc:mysql://localhost:3306/db spring.datasource.username=root spring.datasource.password=pass YAML style: server: port: 8081 spring: datasource: url: jdbc:mysql://localhost:3306/db username: root password: pass Properties uses key=value pairs.",
          },
          {
            title: "Detailed explanation",
            content: "Both formats can express Spring Boot configuration.\n\nProperties style:\n\nserver.port=8081\n```properties\nspring.datasource.url=jdbc:mysql://localhost:3306/db\nspring.datasource.username=root\nspring.datasource.password=pass\n```\n\nYAML style:\n\nserver:\nport: 8081\nspring:\ndatasource:\n```java\nurl: jdbc:mysql://localhost:3306/db\nusername: root\npassword: pass\n```\n\nProperties uses key=value pairs. YAML represents nested configuration hierarchically using indentation.\n\nThe choice is mostly about readability and team pguide. YAML can make deeply grouped settings easier to visualize, while properties is very direct for individual values.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.datasource.url=jdbc:mysql://localhost:3306/db\nspring.datasource.username=root\nspring.datasource.password=pass\n```",
          },
          ],
      },
      {
        title: "External Configuration",
        slug: "external-configuration",
        description: "Spring Boot supports configuration from several external sources. this topic emphasizes command-line arguments, environment variables, configuration files,.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot supports configuration from several external sources. this topic emphasizes command-line arguments, environment variables, configuration files, and profile-specific files.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot supports configuration from several external sources. this topic emphasizes command-line arguments, environment variables, configuration files, and profile-specific files.\n\nExample environment variable:\n\n```properties\nSPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/db\n```\n\nThis corresponds conceptually to:\n\nspring.datasource.url\n\nExample command-line override:\n\n```bash\njava -jar myapp.jar --server.port=9090 --logging.level.root=DEBUG\n```\n\nThe major benefit is separation of code from environment-specific values. The same application artifact can be deployed to different environments without changing source code.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nSPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/db\n```",
          },
          ],
      },
      {
        title: "Profiles",
        slug: "profiles",
        description: "Profiles allow an application to use different beans or settings for different environments such as development, testing, and production. Common files: app.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Profiles allow an application to use different beans or settings for different environments such as development, testing, and production. Common files: application-dev.properties application-prod.yml A profile can be activated using: spring.profiles.active=dev or through a command-line argument: java -jar app.jar --spring.profiles.active=prod @Profile can conditionally activate configuration or beans.",
          },
          {
            title: "Detailed explanation",
            content: "Profiles allow an application to use different beans or settings for different environments such as development, testing, and production.\n\nCommon files:\n\napplication-dev.properties\napplication-prod.yml\n\nA profile can be activated using:\n\n```properties\nspring.profiles.active=dev\n```\n\nor through a command-line argument:\n\n```bash\njava -jar app.jar --spring.profiles.active=prod\n\n@Profile can conditionally activate configuration or beans.\n\n@Configuration\n@Profile(\"dev\")\npublic class DevConfig {\n@Bean\npublic String dataSource() {\n    return \"H2 In-Memory DB for Dev\";\n}\n}\n```\n\nThe key idea is: one codebase, different environment behavior.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.profiles.active=dev\n```",
          },
          ],
      },
      {
        title: "@Value vs. @ConfigurationProperties",
        slug: "value-vs-configurationproperties",
        description: "@Value is convenient when you need one or a few individual configuration values. @Value(\"${server.port}\") private int port; It can also define a fallback: .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@Value is convenient when you need one or a few individual configuration values. @Value(\"${server.port}\") private int port; It can also define a fallback: @Value(\"${custom.message:Default Message}\") private String message; @ConfigurationProperties is better suited to a group of related settings.",
          },
          {
            title: "Detailed explanation",
            content: "@Value is convenient when you need one or a few individual configuration values.\n\n```java\n@Value(\"${server.port}\")\nprivate int port;\n```\n\nIt can also define a fallback:\n\n```java\n@Value(\"${custom.message:Default Message}\")\nprivate String message;\n```\n\n@ConfigurationProperties is better suited to a group of related settings.\n\nExample configuration:\n\napp:\nname: MyApp\nversion: 1.0\n\nA properties class can bind the group:\n\n```java\n@Component\n@ConfigurationProperties(prefix = \"app\")\npublic class AppProperties {\nprivate String name;\nprivate String version;\n}\n```\n\n**Mental model:**\n\n```java\n@Value -> “Give me this one value.”\n@ConfigurationProperties -> “Bind this configuration section into an object.”\n```\n\nThe grouped approach is especially useful when configuration grows and needs stronger structure and validation.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@Value is convenient when you need one or a few individual configuration values.\n\n```java\n@Value(\"${server.port}\")\nprivate int port;\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Spring Boot Starters",
    slug: "spring-boot-starters",
    description: "Learn spring boot starters through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "What Are Starters?",
        slug: "what-are-starters",
        description: "A starter is a predefined dependency bundle for a particular capability. Instead of manually selecting every library required for web development, JPA, sec.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A starter is a predefined dependency bundle for a particular capability. Instead of manually selecting every library required for web development, JPA, security, testing, and similar features, a starter gives the project a convenient dependency entry point.",
          },
          {
            title: "Detailed explanation",
            content: "A starter is a predefined dependency bundle for a particular capability. Instead of manually selecting every library required for web development, JPA, security, testing, and similar features, a starter gives the project a convenient dependency entry point.\n\n**Example:**\n\n```xml\n<dependency>\n<groupId>org.springframework.boot</groupId>\n<artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n```\n\n**Benefits:**\n\n- Less dependency configuration\n- Easier project setup\n- Related libraries are brought together\n- Version management is simplified by the Spring Boot dependency setup\n\nA starter does not mean “one library does everything.” It is a convenient way to bring in a compatible set of dependencies for a common use case.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```xml\n<dependency>\n<groupId>org.springframework.boot</groupId>\n<artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n```",
          },
          ],
      },
      {
        title: "Common Starters",
        slug: "common-starters",
        description: "spring-boot-starter-web Used for web applications and REST APIs. this topic identifies Spring MVC, Jackson, and an embedded Tomcat as important pieces.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "spring-boot-starter-web Used for web applications and REST APIs. this topic identifies Spring MVC, Jackson, and an embedded Tomcat as important pieces.",
          },
          {
            title: "Detailed explanation",
            content: "spring-boot-starter-web\nUsed for web applications and REST APIs. this topic identifies Spring MVC, Jackson, and an embedded Tomcat as important pieces.\n\nspring-boot-starter-data-jpa\nUsed for relational database access with Spring Data JPA. this topic identifies Spring Data JPA, Hibernate, and Spring ORM.\n\nspring-boot-starter-security\nAdds Spring Security support for authentication and authorization.\n\nspring-boot-starter-test\nProvides common testing tools such as JUnit, Mockito, Spring Test, and AssertJ.\n\nOther starters mentioned include Thymeleaf, Mail, Actuator, and Validation.\n\nInterview tip: Be able to explain why you would choose a starter rather than listing individual dependencies from memory.",
          },
          {
            title: "Example",
            content: "**Example:** spring-boot-starter-web Used for web applications and REST APIs. this topic identifies Spring MVC, Jackson, and an embedded Tomcat as important pieces.",
          },
          ],
      },
    ],
  },
  {
    title: "Web Development With Spring MVC",
    slug: "web-development-with-spring-mvc",
    description: "Learn web development with spring mvc through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Creating REST APIs",
        slug: "creating-rest-apis",
        description: "A REST controller maps HTTP requests to Java methods. @RestController @RequestMapping(\"/api/users\") public class UserController { @GetMapping(\"/{id}\") publ.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A REST controller maps HTTP requests to Java methods. @RestController @RequestMapping(\"/api/users\") public class UserController { @GetMapping(\"/{id}\") public User getUser(@PathVariable Long id) { return new User(id, \"John Doe\"); } } The request: GET /api/users/10 matches /{id}, and Spring binds 10 to the id method parameter.",
          },
          {
            title: "Detailed explanation",
            content: "A REST controller maps HTTP requests to Java methods.\n\n**Example:**\n\n```java\n@RestController\n@RequestMapping(\"/api/users\")\npublic class UserController {\n\n@GetMapping(\"/{id}\")\npublic User getUser(@PathVariable Long id) {\n    return new User(id, \"John Doe\");\n}\n}\n```\n\nThe request:\n\nGET /api/users/10\n\nmatches /{id}, and Spring binds 10 to the id method parameter.\n\nA typical layered API is:\n\nHTTP request\n```java\n-> Controller\n-> Service\n-> Repository\n-> Database\n```\n\nKeeping database operations out of the controller helps maintain a clean separation of responsibilities.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@RestController\n@RequestMapping(\"/api/users\")\npublic class UserController {\n\n@GetMapping(\"/{id}\")\npublic User getUser(@PathVariable Long id) {\n    return new User(id, \"John Doe\");\n}\n}\n```",
          },
          ],
      },
      {
        title: "Request Parameters: @PathVariable, @RequestParam, @RequestBody",
        slug: "request-parameters-pathvariable-requestparam-requestbody",
        description: "@PathVariable extracts a value from the URL path. GET /users/42 @GetMapping(\"/users/{id}\") public User get(@PathVariable Long id) { .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@PathVariable extracts a value from the URL path. GET /users/42 @GetMapping(\"/users/{id}\") public User get(@PathVariable Long id) { ...",
          },
          {
            title: "Detailed explanation",
            content: "@PathVariable extracts a value from the URL path.\n\nGET /users/42\n\n```java\n@GetMapping(\"/users/{id}\")\npublic User get(@PathVariable Long id) { ... }\n```\n\n@REQUESTPARAM extracts query parameters.\n\nGET /users?role=admin\n\n```java\n@GetMapping(\"/users\")\npublic List<User> find(@RequestParam String role) { ... }\n```\n\n@REQUESTBODY converts the HTTP request body into a Java object.\n\nPOST /users\nContent-Type: application/json\n\n{\n\"name\": \"Alice\"\n}\n\n```java\n@PostMapping(\"/users\")\npublic ResponseEntity<String> create(@RequestBody User user) { ... }\n```\n\nSimple memory rule:\n@PathVariable -> value inside the path\n@RequestParam -> value after ?\n@RequestBody -> data sent inside the request body",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@PathVariable extracts a value from the URL path.",
          },
          ],
      },
      {
        title: "ResponseEntity and Http Status Codes",
        slug: "responseentity-and-http-status-codes",
        description: "ResponseEntity gives explicit control over the response body, headers, and HTTP status. @GetMapping(\"/{id}\") public ResponseEntity<User> getUser(@PathVaria.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "ResponseEntity gives explicit control over the response body, headers, and HTTP status. @GetMapping(\"/{id}\") public ResponseEntity<User> getUser(@PathVariable Long id) { User user = userService.findById(id); if (user == null) { return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); } return ResponseEntity.ok(user); } The important lesson is that APIs should communicate outcome through appropriate HTTP status...",
          },
          {
            title: "Detailed explanation",
            content: "ResponseEntity gives explicit control over the response body, headers, and HTTP status.\n\n**Example:**\n\n```java\n@GetMapping(\"/{id}\")\npublic ResponseEntity<User> getUser(@PathVariable Long id) {\nUser user = userService.findById(id);\nif (user == null) {\n    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();\n}\nreturn ResponseEntity.ok(user);\n}\n```\n\nThe important lesson is that APIs should communicate outcome through appropriate HTTP status codes, not only through a text message.\n\n**Common examples:**\n\n200 OK -> successful request\n201 Created -> resource created\n400 Bad Request -> invalid client input\n401 Unauthorized -> authentication is required or failed\n403 Forbidden -> caller is not allowed\n404 Not Found -> requested resource does not exist\n500 Internal Server Error -> unexpected server-side problem",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@GetMapping(\"/{id}\")\npublic ResponseEntity<User> getUser(@PathVariable Long id) {\nUser user = userService.findById(id);\nif (user == null) {\n    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();\n}\nreturn ResponseEntity.ok(user);\n}\n```",
          },
          ],
      },
      {
        title: "Exception Handling",
        slug: "exception-handling",
        description: "@ExceptionHandler handles a particular exception. @ControllerAdvice allows exception handling to be centralized across controllers.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@ExceptionHandler handles a particular exception. @ControllerAdvice allows exception handling to be centralized across controllers.",
          },
          {
            title: "Detailed explanation",
            content: "@ExceptionHandler handles a particular exception. @ControllerAdvice allows exception handling to be centralized across controllers.\n\n**Example:**\n\n```java\n@ControllerAdvice\npublic class GlobalExceptionHandler {\n\n@ExceptionHandler(UserNotFoundException.class)\npublic ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {\n    return ResponseEntity\n        .status(HttpStatus.NOT_FOUND)\n        .body(ex.getMessage());\n}\n}\n```\n\nWithout centralized handling, every controller may repeat the same try/catch and response-building logic. Global handling creates consistent API behavior.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@ExceptionHandler handles a particular exception. @ControllerAdvice allows exception handling to be centralized across controllers.",
          },
          ],
      },
      {
        title: "Content Negotiation",
        slug: "content-negotiation",
        description: "Content negotiation allows the response representation to depend on the client's requested media type. For example, an endpoint can declare JSON and XML re.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Content negotiation allows the response representation to depend on the client's requested media type. For example, an endpoint can declare JSON and XML representations: @GetMapping(value = \"/info\", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}) public User getInfo() { return new User(1L, \"Alice\"); } If the client sends an Accept header requesting application/json, the response...",
          },
          {
            title: "Detailed explanation",
            content: "Content negotiation allows the response representation to depend on the client's requested media type.\n\nFor example, an endpoint can declare JSON and XML representations:\n\n```java\n@GetMapping(value = \"/info\",\nproduces = {MediaType.APPLICATION_JSON_VALUE,\n            MediaType.APPLICATION_XML_VALUE})\npublic User getInfo() {\nreturn new User(1L, \"Alice\");\n}\n```\n\nIf the client sends an Accept header requesting application/json, the response can be JSON. If it requests application/xml and the application supports the representation, XML can be selected.\n\nThe key concept is that the same logical resource can have more than one representation.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@GetMapping(value = \"/info\",\nproduces = {MediaType.APPLICATION_JSON_VALUE,\n            MediaType.APPLICATION_XML_VALUE})\npublic User getInfo() {\nreturn new User(1L, \"Alice\");\n}\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Data Access",
    slug: "data-access",
    description: "Learn data access through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Spring Data JPA",
        slug: "spring-data-jpa",
        description: "Spring Data JPA reduces persistence boilerplate by providing repository abstractions and query support. The typical relationship is: Entity -> represents p.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Data JPA reduces persistence boilerplate by providing repository abstractions and query support. The typical relationship is: Entity -> represents persisted data Repository -> performs data access Service -> applies business rules Controller -> exposes API @Entity marks a class as a persistent entity.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Data JPA reduces persistence boilerplate by providing repository abstractions and query support.\n\nThe typical relationship is:\n\nEntity -> represents persisted data\nRepository -> performs data access\nService -> applies business rules\nController -> exposes API\n\n@Entity marks a class as a persistent entity.\n\n```java\n@Entity\npublic class User {\n@Id\n@GeneratedValue\nprivate Long id;\nprivate String name;\n}\n```\n\nThe repository can extend JpaRepository:\n\n```java\npublic interface UserRepository extends JpaRepository<User, Long> {\nList<User> findByName(String name);\n}\n```\n\nSpring Data can derive queries from method names. This avoids writing repetitive CRUD implementation code.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@Entity marks a class as a persistent entity.\n\n```java\n@Entity\npublic class User {\n@Id\n@GeneratedValue\nprivate Long id;\nprivate String name;\n}\n```",
          },
          ],
      },
      {
        title: "Crud Repositories",
        slug: "crud-repositories",
        description: "CrudRepository provides common CRUD operations. JpaRepository builds on the repository abstraction and provides JPA-oriented capabilities.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "CrudRepository provides common CRUD operations. JpaRepository builds on the repository abstraction and provides JPA-oriented capabilities.",
          },
          {
            title: "Detailed explanation",
            content: "CrudRepository provides common CRUD operations. JpaRepository builds on the repository abstraction and provides JPA-oriented capabilities.\n\nTypical operations include:\n- save\n- findById\n- findAll\n- deleteById\n- delete\n\nThe developer describes the repository contract and Spring Data provides the implementation infrastructure.\n\nThis is one of the major productivity benefits of Spring Data: a repository interface can provide useful database operations without a large hand-written DAO class.",
          },
          {
            title: "Example",
            content: "**Example:** CrudRepository provides common CRUD operations. JpaRepository builds on the repository abstraction and provides JPA-oriented capabilities.",
          },
          ],
      },
      {
        title: "Custom Queries With @Query",
        slug: "custom-queries-with-query",
        description: "When a derived method name is not sufficient, @Query can define a query explicitly. @Query(\"SELECT u FROM User u WHERE u.name LIKE %:name%\") List<User> sea.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "When a derived method name is not sufficient, @Query can define a query explicitly. @Query(\"SELECT u FROM User u WHERE u.name LIKE %:name%\") List<User> searchByName(@Param(\"name\") String name); this topic describes support for JPQL and native SQL.",
          },
          {
            title: "Detailed explanation",
            content: "When a derived method name is not sufficient, @Query can define a query explicitly.\n\n**Example:**\n\n```java\n@Query(\"SELECT u FROM User u WHERE u.name LIKE %:name%\")\n```\n\nList<User> searchByName(@Param(\"name\") String name);\n\nthis topic describes support for JPQL and native SQL. The important distinction is that JPQL works with entity concepts and fields, while a native query can express database-specific SQL when required.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Query(\"SELECT u FROM User u WHERE u.name LIKE %:name%\")\n```",
          },
          ],
      },
      {
        title: "Pagination and Sorting",
        slug: "pagination-and-sorting",
        description: "Returning thousands of records in one request is inefficient. Pagination breaks a large result set into smaller pages.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Returning thousands of records in one request is inefficient. Pagination breaks a large result set into smaller pages.",
          },
          {
            title: "Detailed explanation",
            content: "Returning thousands of records in one request is inefficient. Pagination breaks a large result set into smaller pages.\n\n**Example:**\n\nPage<User> page = userRepository.findAll(\n```java\nPageRequest.of(0, 10, Sort.by(\"name\"))\n);\n```\n\nHere:\n- 0 is the page index.\n- 10 is the page size.\n- Sort.by(\"name\") requests ordering by name.\n\nThe practical benefit is lower memory use, smaller responses, and more predictable API behavior.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nPageRequest.of(0, 10, Sort.by(\"name\"))\n);\n```",
          },
          ],
      },
      {
        title: "JDBC With Spring Boot",
        slug: "jdbc-with-spring-boot",
        description: "JdbcTemplate provides more direct control over SQL. It is useful when you want to write SQL explicitly instead of relying on JPA entity mapping.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "JdbcTemplate provides more direct control over SQL. It is useful when you want to write SQL explicitly instead of relying on JPA entity mapping.",
          },
          {
            title: "Detailed explanation",
            content: "JdbcTemplate provides more direct control over SQL. It is useful when you want to write SQL explicitly instead of relying on JPA entity mapping.\n\n**Example:**\n\n```java\n@Repository\npublic class UserDao {\nprivate final JdbcTemplate jdbcTemplate;\n\npublic List<User> getUsers() {\n    return jdbcTemplate.query(\n        \"SELECT * FROM users\",\n        (rs, rowNum) -> new User(\n            rs.getLong(\"id\"),\n            rs.getString(\"name\")\n        )\n    );\n}\n}\n```\n\nJPA is generally more abstraction-oriented. JdbcTemplate is more SQL-oriented.\n\nInterview comparison:\nJPA -> entity/object model, repository abstraction, less SQL for common operations.\nJDBC -> direct SQL control, explicit result mapping, useful when fine-grained SQL is important.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Repository\npublic class UserDao {\nprivate final JdbcTemplate jdbcTemplate;\n\npublic List<User> getUsers() {\n    return jdbcTemplate.query(\n        \"SELECT * FROM users\",\n        (rs, rowNum) -> new User(\n            rs.getLong(\"id\"),\n            rs.getString(\"name\")\n        )\n    );\n}\n}\n```",
          },
          ],
      },
      {
        title: "Mongodb / NoSQL",
        slug: "mongodb-nosql",
        description: "this topic includes MongoDB integration through spring-boot-starter-data-mongodb. A MongoDB document can be represented with @Document: @Document public cl.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic includes MongoDB integration through spring-boot-starter-data-mongodb. A MongoDB document can be represented with @Document: @Document public class Product { @Id private String id; private String name; } A repository can extend MongoRepository: public interface ProductRepository extends MongoRepository<Product, String> { List<Product> findByName(String name); } The conceptual difference from JPA is...",
          },
          {
            title: "Detailed explanation",
            content: "this topic includes MongoDB integration through spring-boot-starter-data-mongodb.\n\nA MongoDB document can be represented with @Document:\n\n```java\n@Document\npublic class Product {\n@Id\nprivate String id;\nprivate String name;\n}\n```\n\nA repository can extend MongoRepository:\n\n```java\npublic interface ProductRepository extends MongoRepository<Product, String> {\nList<Product> findByName(String name);\n}\n```\n\nThe conceptual difference from JPA is that MongoDB is document-oriented rather than relational. The repository abstraction still provides a familiar application-level pattern.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Document\npublic class Product {\n@Id\nprivate String id;\nprivate String name;\n}\n```",
          },
          ],
      },
      {
        title: "Transactions With @Transactional",
        slug: "transactions-with-transactional",
        description: "A transaction groups related database operations so that they behave as one logical unit. @Transactional public void registerUser(User user) { userReposito.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A transaction groups related database operations so that they behave as one logical unit. @Transactional public void registerUser(User user) { userRepository.save(user); // additional database operations } The key idea is atomicity: if a sequence of related operations cannot be completed successfully, the transaction can be rolled back according to the transaction configuration and failure conditions.",
          },
          {
            title: "Detailed explanation",
            content: "A transaction groups related database operations so that they behave as one logical unit.\n\n**Example:**\n\n```java\n@Transactional\npublic void registerUser(User user) {\nuserRepository.save(user);\n// additional database operations\n}\n```\n\nThe key idea is atomicity: if a sequence of related operations cannot be completed successfully, the transaction can be rolled back according to the transaction configuration and failure conditions.\n\nthis topic also mentions:\n\n```java\n@Transactional(readOnly = true)\n```\n\nfor read-focused operations.\n\nInterview example:\nImagine transferring money:\n\nIf step 1 succeeds and step 2 fails, the system must avoid leaving the database in an inconsistent state. Transaction boundaries help solve this kind of problem.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Transactional\npublic void registerUser(User user) {\nuserRepository.save(user);\n// additional database operations\n}\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Database Configuration",
    slug: "database-configuration",
    description: "Learn database configuration through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "H2 In-memory Database",
        slug: "h2-in-memory-database",
        description: "H2 is an in-memory relational database used in this topic for development and testing. With an in-memory URL, the database exists in memory and is lost whe.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "H2 is an in-memory relational database used in this topic for development and testing. With an in-memory URL, the database exists in memory and is lost when the application stops.",
          },
          {
            title: "Detailed explanation",
            content: "H2 is an in-memory relational database used in this topic for development and testing. With an in-memory URL, the database exists in memory and is lost when the application stops.\n\nExample configuration:\n\n```properties\nspring.datasource.url=jdbc:h2:mem:testdb\nspring.datasource.driver-class-name=org.h2.Driver\nspring.datasource.username=sa\nspring.datasource.password=\nspring.h2.console.enabled=true\n```\n\nthis topic also shows the H2 console URL:\n\nhttp://localhost:8080/h2-console\n\nH2 is useful when you want a lightweight database without maintaining a separate database server during local development or tests.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.datasource.url=jdbc:h2:mem:testdb\nspring.datasource.driver-class-name=org.h2.Driver\nspring.datasource.username=sa\nspring.datasource.password=\nspring.h2.console.enabled=true\n```",
          },
          ],
      },
      {
        title: "Mysql / PostgreSQL",
        slug: "mysql-postgresql",
        description: "this topic provides examples for MySQL and PostgreSQL datasource configuration. MySQL: spring.datasource.url=jdbc:mysql://localhost:3306/mydb spring.dataso.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic provides examples for MySQL and PostgreSQL datasource configuration. MySQL: spring.datasource.url=jdbc:mysql://localhost:3306/mydb spring.datasource.username=root spring.datasource.password=your_password spring.jpa.hibernate.ddl-auto=update spring.jpa.show-sql=true PostgreSQL: spring.datasource.url=jdbc:postgresql://localhost:5432/mydb spring.datasource.username=postgres...",
          },
          {
            title: "Detailed explanation",
            content: "this topic provides examples for MySQL and PostgreSQL datasource configuration.\n\nMySQL:\n\n```properties\nspring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=root\nspring.datasource.password=your_password\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\n```\n\nPostgreSQL:\n\n```properties\nspring.datasource.url=jdbc:postgresql://localhost:5432/mydb\nspring.datasource.username=postgres\nspring.datasource.password=your_password\n```\n\nThe application needs the appropriate JDBC driver dependency. Spring Boot uses the datasource properties to create the database connection infrastructure.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=root\nspring.datasource.password=your_password\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\n```",
          },
          ],
      },
      {
        title: "Connection Pooling With HikariCP",
        slug: "connection-pooling-with-hikaricp",
        description: "Opening a new database connection for every request is expensive. A connection pool keeps a collection of reusable database connections.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Opening a new database connection for every request is expensive. A connection pool keeps a collection of reusable database connections.",
          },
          {
            title: "Detailed explanation",
            content: "Opening a new database connection for every request is expensive. A connection pool keeps a collection of reusable database connections.\n\nthis topic identifies HikariCP as the default connection pool and shows settings such as:\n\n```java\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.minimum-idle=5\nspring.datasource.hikari.idle-timeout=30000\n```\n\n**Mental model:**\n\nWithout pooling:\nrequest -> open connection -> query -> close connection\n\nWith pooling:\nrequest -> borrow connection -> query -> return connection to pool\n\nPooling improves efficiency because established connections can be reused.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.minimum-idle=5\nspring.datasource.hikari.idle-timeout=30000\n```",
          },
          ],
      },
      {
        title: "schema.sql and data.sql",
        slug: "schema-sql-and-data-sql",
        description: "this topic describes placing SQL initialization scripts in src/main/resources/. schema.sql -> creates database objects such as tables.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic describes placing SQL initialization scripts in src/main/resources/. schema.sql -> creates database objects such as tables.",
          },
          {
            title: "Detailed explanation",
            content: "this topic describes placing SQL initialization scripts in src/main/resources/.\n\nschema.sql -> creates database objects such as tables.\ndata.sql -> inserts initial data.\n\n**Example:**\n\nCREATE TABLE users (\n```java\nid BIGINT PRIMARY KEY AUTO_INCREMENT,\nname VARCHAR(100)\n);\n```\n\nThen:\n\nINSERT INTO users (name) VALUES ('John Doe'), ('Alice');\n\nThis approach is especially useful for predictable development/test initialization.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nid BIGINT PRIMARY KEY AUTO_INCREMENT,\nname VARCHAR(100)\n);\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Validation",
    slug: "validation",
    description: "Learn validation through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Bean Validation",
        slug: "bean-validation",
        description: "Validation prevents invalid input from entering application logic. this topic lists annotations such as: @NotNull -> value cannot be null @NotBlank -> stri.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Validation prevents invalid input from entering application logic. this topic lists annotations such as: @NotNull -> value cannot be null @NotBlank -> string cannot be null/empty/blank @Email -> value should satisfy email-format validation @Size(min, max) -> length or collection-size constraint @Min / @Max -> numeric limits public class User { @NotBlank private String name; @Email private String email; @Min(18)...",
          },
          {
            title: "Detailed explanation",
            content: "Validation prevents invalid input from entering application logic.\n\nthis topic lists annotations such as:\n```java\n@NotNull -> value cannot be null\n@NotBlank -> string cannot be null/empty/blank\n@Email -> value should satisfy email-format validation\n@Size(min, max) -> length or collection-size constraint\n@Min / @Max -> numeric limits\n```\n\n**Example:**\n\n```java\npublic class User {\n@NotBlank\nprivate String name;\n\n@Email\nprivate String email;\n\n@Min(18)\nprivate int age;\n}\n```\n\nThe main idea is declarative validation: the rules are written next to the fields instead of being repeated manually throughout controllers.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@NotNull -> value cannot be null\n@NotBlank -> string cannot be null/empty/blank\n@Email -> value should satisfy email-format validation\n@Size(min, max) -> length or collection-size constraint\n@Min / @Max -> numeric limits\n```",
          },
          ],
      },
      {
        title: "@Valid and @Validated",
        slug: "valid-and-validated",
        description: "@Valid is commonly used on controller parameters to trigger validation. @PostMapping public ResponseEntity<String> addUser( @Valid @RequestBody User user) .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@Valid is commonly used on controller parameters to trigger validation. @PostMapping public ResponseEntity<String> addUser( @Valid @RequestBody User user) { return ResponseEntity.ok(\"User is valid\"); } If the input violates the constraints, validation fails before the normal method logic completes.",
          },
          {
            title: "Detailed explanation",
            content: "@Valid is commonly used on controller parameters to trigger validation.\n\n```java\n@PostMapping\npublic ResponseEntity<String> addUser(\n    @Valid @RequestBody User user) {\nreturn ResponseEntity.ok(\"User is valid\");\n}\n```\n\nIf the input violates the constraints, validation fails before the normal method logic completes.\n\n@Validated is useful at the class level for method validation and for validation groups.\n\n**Example:**\n\n```java\n@Validated\n@Service\npublic class PaymentService {\npublic void process(@Min(100) int amount) {\n    // process payment\n}\n}\n```\n\nInterview distinction:\n```java\n@Valid -> triggers standard bean validation on an object or parameter.\n```\n\n@Validated -> Spring-specific variant that also supports validation groups and method-level validation scenarios.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@Valid is commonly used on controller parameters to trigger validation.\n\n```java\n@PostMapping\npublic ResponseEntity<String> addUser(\n    @Valid @RequestBody User user) {\nreturn ResponseEntity.ok(\"User is valid\");\n}\n```",
          },
          ],
      },
      {
        title: "Custom Validators",
        slug: "custom-validators",
        description: "Built-in annotations cannot express every business rule. For custom rules, define a custom constraint annotation and a ConstraintValidator implementation.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Built-in annotations cannot express every business rule. For custom rules, define a custom constraint annotation and a ConstraintValidator implementation.",
          },
          {
            title: "Detailed explanation",
            content: "Built-in annotations cannot express every business rule. For custom rules, define a custom constraint annotation and a ConstraintValidator implementation.\n\nExample annotation:\n\n```java\n@Constraint(validatedBy = UsernameValidator.class)\n@Target({FIELD})\n@Retention(RUNTIME)\npublic @interface ValidUsername {\nString message() default \"Invalid username\";\nClass<?>[] groups() default {};\nClass<? extends Payload>[] payload() default {};\n}\n```\n\nValidator:\n\n```java\npublic class UsernameValidator\n    implements ConstraintValidator<ValidUsername, String> {\n\n@Override\npublic boolean isValid(\n        String value,\n        ConstraintValidatorContext context) {\n    return value != null\n        && value.matches(\"^[a-zA-Z0-9_]{5,20}$\");\n}\n}\n```\n\nThen:\n\n```java\n@ValidUsername\nprivate String username;\n```\n\nThe pattern is:\nDefine rule -> implement validator -> attach annotation -> validation runs automatically.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Constraint(validatedBy = UsernameValidator.class)\n@Target({FIELD})\n@Retention(RUNTIME)\npublic @interface ValidUsername {\nString message() default \"Invalid username\";\nClass<?>[] groups() default {};\nClass<? extends Payload>[] payload() default {};\n}\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Security",
    slug: "security",
    description: "Learn security through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Spring Security Basics",
        slug: "spring-security-basics",
        description: "Spring Security provides authentication and authorization support for web applications, APIs, and microservices. this topic shows that adding spring-boot-s.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Security provides authentication and authorization support for web applications, APIs, and microservices. this topic shows that adding spring-boot-starter-security enables security infrastructure.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Security provides authentication and authorization support for web applications, APIs, and microservices.\n\nthis topic shows that adding spring-boot-starter-security enables security infrastructure. It describes the default behavior as securing endpoints, providing a login mechanism, and generating a password that is logged at startup.\n\nThe key lesson is that security should be explicit and intentional. Do not assume an endpoint is safe merely because the controller works correctly.",
          },
          {
            title: "Example",
            content: "**Example:** Spring Security provides authentication and authorization support for web applications, APIs, and microservices. this topic shows that adding spring-boot-starter-security enables security infrastructure.",
          },
          ],
      },
      {
        title: "Authentication vs. Authorization",
        slug: "authentication-vs-authorization",
        description: "Authentication answers: “Who are you?” Authorization answers: “What are you allowed to do?” A user logs in with credentials. Authentication establishes the.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Authentication answers: “Who are you?” Authorization answers: “What are you allowed to do?” A user logs in with credentials. Authentication establishes the user's identity.",
          },
          {
            title: "Detailed explanation",
            content: "Authentication answers:\n“Who are you?”\n\nAuthorization answers:\n“What are you allowed to do?”\n\n**Example:**\n\nA user logs in with credentials. Authentication establishes the user's identity. After that, authorization rules determine whether the user can access /admin/**.\n\nthis topic shows rules such as:\n\n.requestMatchers(\"/admin/**\").hasRole(\"ADMIN\")\n.requestMatchers(\"/user/**\").hasAnyRole(\"USER\", \"ADMIN\")\n.anyRequest().authenticated()\n\nThis creates a clear access policy.",
          },
          {
            title: "Example",
            content: "**Example:** Authentication answers: “Who are you?” Authorization answers: “What are you allowed to do?” A user logs in with credentials. Authentication establishes the user's identity.",
          },
          ],
      },
      {
        title: "Password Encoding",
        slug: "password-encoding",
        description: "Passwords should not be stored as plain text. this topic uses PasswordEncoder with BCrypt.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Passwords should not be stored as plain text. this topic uses PasswordEncoder with BCrypt.",
          },
          {
            title: "Detailed explanation",
            content: "Passwords should not be stored as plain text. this topic uses PasswordEncoder with BCrypt.\n\n```java\n@Bean\npublic PasswordEncoder passwordEncoder() {\nreturn new BCryptPasswordEncoder();\n}\n```\n\nString encoded = passwordEncoder.encode(\"mypassword\");\n\nThe important distinction is between a raw password supplied by a user and the encoded representation stored by the application.\n\nDuring login, the system should verify the supplied password against the stored encoded value rather than storing or comparing raw passwords directly.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Bean\npublic PasswordEncoder passwordEncoder() {\nreturn new BCryptPasswordEncoder();\n}\n```",
          },
          ],
      },
      {
        title: "JWT Token-based Security",
        slug: "jwt-token-based-security",
        description: "JWT is presented in this topic as a common approach for stateless REST API security. High-level flow: Typical header: Authorization: Bearer <token> this to.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "JWT is presented in this topic as a common approach for stateless REST API security. High-level flow: Typical header: Authorization: Bearer <token> this topic illustrates a JWT filter extending OncePerRequestFilter and reading the Authorization header before continuing the filter chain.",
          },
          {
            title: "Detailed explanation",
            content: "JWT is presented in this topic as a common approach for stateless REST API security.\n\nHigh-level flow:\n\nTypical header:\n\nAuthorization: Bearer <token>\n\nthis topic illustrates a JWT filter extending OncePerRequestFilter and reading the Authorization header before continuing the filter chain.\n\nThe most important concept is that authentication state is carried in the token rather than requiring a traditional server-side session for every API request.",
          },
          {
            title: "Example",
            content: "**Example:** JWT is presented in this topic as a common approach for stateless REST API security. High-level flow: Typical header: Authorization: Bearer <token> this topic illustrates a JWT filter extending OncePerRequestFilter and reading the Authorization header before continuing the filter chain.",
          },
          ],
      },
      {
        title: "Role-based Access Control",
        slug: "role-based-access-control",
        description: "Role-based access control restricts operations based on roles or authorities. @GetMapping(\"/admin/dashboard\") @PreAuthorize(\"hasRole('ADMIN')\") public Stri.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Role-based access control restricts operations based on roles or authorities. @GetMapping(\"/admin/dashboard\") @PreAuthorize(\"hasRole('ADMIN')\") public String adminDashboard() { return \"Admin area\"; } Method-level security is enabled in this topic using @EnableMethodSecurity.",
          },
          {
            title: "Detailed explanation",
            content: "Role-based access control restricts operations based on roles or authorities.\n\n**Example:**\n\n```java\n@GetMapping(\"/admin/dashboard\")\n@PreAuthorize(\"hasRole('ADMIN')\")\npublic String adminDashboard() {\nreturn \"Admin area\";\n}\n```\n\nMethod-level security is enabled in this topic using @EnableMethodSecurity.\n\nThink in layers:\nAuthentication -> identify the caller\nAuthorization -> check permissions\nRBAC -> express permissions through roles such as USER or ADMIN",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@GetMapping(\"/admin/dashboard\")\n@PreAuthorize(\"hasRole('ADMIN')\")\npublic String adminDashboard() {\nreturn \"Admin area\";\n}\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Testing",
    slug: "testing",
    description: "Learn testing through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Unit Testing With Junit",
        slug: "unit-testing-with-junit",
        description: "A unit test focuses on a small piece of behavior, often one class or method, without loading the entire application. class CalculatorService { int add(int .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A unit test focuses on a small piece of behavior, often one class or method, without loading the entire application. class CalculatorService { int add(int a, int b) { return a + b; } } @Test void testAdd() { CalculatorService calc = new CalculatorService(); assertEquals(5, calc.add(2, 3)); } The test is fast because it creates the object directly and does not require the Spring application context.",
          },
          {
            title: "Detailed explanation",
            content: "A unit test focuses on a small piece of behavior, often one class or method, without loading the entire application.\n\n**Example:**\n\n```java\nclass CalculatorService {\nint add(int a, int b) {\n    return a + b;\n}\n}\n\n@Test\n```\n\nvoid testAdd() {\n```java\nCalculatorService calc = new CalculatorService();\nassertEquals(5, calc.add(2, 3));\n}\n```\n\nThe test is fast because it creates the object directly and does not require the Spring application context.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nclass CalculatorService {\nint add(int a, int b) {\n    return a + b;\n}\n}\n\n@Test\n```",
          },
          ],
      },
      {
        title: "Mocking With Mockito",
        slug: "mocking-with-mockito",
        description: "Mockito allows a test to replace a real dependency with a controlled mock. Suppose OrderService depends on PaymentService.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Mockito allows a test to replace a real dependency with a controlled mock. Suppose OrderService depends on PaymentService.",
          },
          {
            title: "Detailed explanation",
            content: "Mockito allows a test to replace a real dependency with a controlled mock.\n\nSuppose OrderService depends on PaymentService. A unit test for OrderService should not need a real payment system.\n\n```java\n@Mock\n```\n\nPaymentService paymentService;\n\n```java\n@InjectMocks\n```\n\nOrderService orderService;\n\nwhen(paymentService.pay()).thenReturn(true);\n\nassertTrue(orderService.placeOrder());\n\nThe mock lets the test control the dependency's behavior. This makes the test deterministic and focused on the class being tested.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Mock\n```",
          },
          ],
      },
      {
        title: "Integration Testing",
        slug: "integration-testing",
        description: "Integration tests verify that multiple application components work together. this topic uses @SpringBootTest to load the application context.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Integration tests verify that multiple application components work together. this topic uses @SpringBootTest to load the application context.",
          },
          {
            title: "Detailed explanation",
            content: "Integration tests verify that multiple application components work together. this topic uses @SpringBootTest to load the application context.\n\n**Example:**\n\n```java\n@SpringBootTest\nclass UserServiceIntegrationTest {\n@Autowired UserService userService;\n\n@Test\nvoid testFindUser() {\n    User user = userService.findById(1L);\n    assertNotNull(user);\n}\n}\n```\n\nThe trade-off is that integration tests are usually slower than isolated unit tests because more infrastructure is involved.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@SpringBootTest\nclass UserServiceIntegrationTest {\n@Autowired UserService userService;\n\n@Test\nvoid testFindUser() {\n    User user = userService.findById(1L);\n    assertNotNull(user);\n}\n}\n```",
          },
          ],
      },
      {
        title: "@WebMvcTest",
        slug: "webmvctest",
        description: "@WebMvcTest focuses on the web layer. It is useful when you want to test controller behavior without loading the complete application context.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@WebMvcTest focuses on the web layer. It is useful when you want to test controller behavior without loading the complete application context.",
          },
          {
            title: "Detailed explanation",
            content: "@WebMvcTest focuses on the web layer. It is useful when you want to test controller behavior without loading the complete application context.\n\n**Example:**\n\n```java\n@WebMvcTest(UserController.class)\nclass UserControllerTest {\n@Autowired\nMockMvc mockMvc;\n\n@Test\nvoid testGetUser() throws Exception {\n    mockMvc.perform(get(\"/users/1\"))\n           .andExpect(status().isOk());\n}\n}\n```\n\nthis topic notes that service dependencies can be mocked for controller-focused tests.\n\n**Mental model:**\n\n@WebMvcTest -> controller/web behavior\n@DataJpaTest -> repository/data behavior\n\n```java\n@SpringBootTest -> broad application integration\n```",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@WebMvcTest focuses on the web layer. It is useful when you want to test controller behavior without loading the complete application context.",
          },
          ],
      },
      {
        title: "@DataJpaTest",
        slug: "datajpatest",
        description: "@DataJpaTest focuses on the JPA repository layer. @DataJpaTest class UserRepositoryTest { @Autowired UserRepository userRepository; @Test void testSaveUser.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@DataJpaTest focuses on the JPA repository layer. @DataJpaTest class UserRepositoryTest { @Autowired UserRepository userRepository; @Test void testSaveUser() { User user = new User(\"John\"); User saved = userRepository.save(user); assertNotNull(saved.getId()); } } this topic notes the use of an H2 in-memory database and transaction rollback after tests.",
          },
          {
            title: "Detailed explanation",
            content: "@DataJpaTest focuses on the JPA repository layer.\n\n**Example:**\n\n```java\n@DataJpaTest\nclass UserRepositoryTest {\n@Autowired\nUserRepository userRepository;\n\n@Test\nvoid testSaveUser() {\n    User user = new User(\"John\");\n    User saved = userRepository.save(user);\n    assertNotNull(saved.getId());\n}\n}\n```\n\nthis topic notes the use of an H2 in-memory database and transaction rollback after tests. This makes repository tests isolated and repeatable.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@DataJpaTest focuses on the JPA repository layer.",
          },
          ],
      },
    ],
  },
  {
    title: "Logging",
    slug: "logging",
    description: "Learn logging through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Slf4j and Logback",
        slug: "slf4j-and-logback",
        description: "SLF4J is a logging facade. It provides a common logging API while allowing the underlying logging implementation to vary.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "SLF4J is a logging facade. It provides a common logging API while allowing the underlying logging implementation to vary.",
          },
          {
            title: "Detailed explanation",
            content: "SLF4J is a logging facade. It provides a common logging API while allowing the underlying logging implementation to vary. this topic identifies Logback as the default implementation in Spring Boot.\n\n**Example:**\n\n```java\nprivate static final Logger logger =\nLoggerFactory.getLogger(DemoController.class);\n\nlogger.info(\"Request received\");\nlogger.warn(\"Potential problem\");\nlogger.error(\"Operation failed\");\n```\n\nLogging is useful for diagnosing failures, understanding application flow, monitoring important events, and investigating production issues.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nprivate static final Logger logger =\nLoggerFactory.getLogger(DemoController.class);\n\nlogger.info(\"Request received\");\nlogger.warn(\"Potential problem\");\nlogger.error(\"Operation failed\");\n```",
          },
          ],
      },
      {
        title: "Log Levels",
        slug: "log-levels",
        description: "this topic lists these levels: TRACE -> very detailed diagnostic information DEBUG -> development-oriented details INFO -> normal application events WARN -.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic lists these levels: TRACE -> very detailed diagnostic information DEBUG -> development-oriented details INFO -> normal application events WARN -> potential problems ERROR -> serious failures Example configuration: logging.level.root=INFO logging.level.com.example.demo=DEBUG logging.file.name=app.log A good strategy is to avoid excessive DEBUG/TRACE logging in production unless it is intentionally...",
          },
          {
            title: "Detailed explanation",
            content: "this topic lists these levels:\n\nTRACE -> very detailed diagnostic information\nDEBUG -> development-oriented details\nINFO  -> normal application events\nWARN  -> potential problems\nERROR -> serious failures\n\nExample configuration:\n\n```properties\nlogging.level.root=INFO\nlogging.level.com.example.demo=DEBUG\nlogging.file.name=app.log\n```\n\nA good strategy is to avoid excessive DEBUG/TRACE logging in production unless it is intentionally enabled for diagnosis.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nlogging.level.root=INFO\nlogging.level.com.example.demo=DEBUG\nlogging.file.name=app.log\n```",
          },
          ],
      },
      {
        title: "External Log Configuration",
        slug: "external-log-configuration",
        description: "For advanced logging, this topic describes logback-spring.xml. It can define appenders, patterns, rolling files, and profile-specific behavior.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "For advanced logging, this topic describes logback-spring.xml. It can define appenders, patterns, rolling files, and profile-specific behavior.",
          },
          {
            title: "Detailed explanation",
            content: "For advanced logging, this topic describes logback-spring.xml. It can define appenders, patterns, rolling files, and profile-specific behavior.\n\nA rolling file strategy prevents one log file from growing indefinitely. A timestamped file pattern can create a new compressed log file for different time periods.\n\nThe practical lesson is that logging is an operational feature, not just a println replacement. Logs should be structured enough to help answer: what happened, when did it happen, where did it happen, and how severe was it?",
          },
          {
            title: "Example",
            content: "**Example:** For advanced logging, this topic describes logback-spring.xml. It can define appenders, patterns, rolling files, and profile-specific behavior.",
          },
          ],
      },
    ],
  },
  {
    title: "Actuator And Monitoring",
    slug: "actuator-and-monitoring",
    description: "Learn actuator and monitoring through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Actuator Overview",
        slug: "actuator-overview",
        description: "Spring Boot Actuator provides operational endpoints for inspecting application health, metrics, environment information, beans, mappings, and other runtime.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot Actuator provides operational endpoints for inspecting application health, metrics, environment information, beans, mappings, and other runtime information. this topic uses the starter: spring-boot-starter-actuator It also demonstrates endpoint exposure through: management.endpoints.web.exposure.include=* In real applications, endpoint exposure should be considered carefully because operational...",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot Actuator provides operational endpoints for inspecting application health, metrics, environment information, beans, mappings, and other runtime information.\n\nthis topic uses the starter:\n\nspring-boot-starter-actuator\n\nIt also demonstrates endpoint exposure through:\n\n```properties\nmanagement.endpoints.web.exposure.include=*\n```\n\nIn real applications, endpoint exposure should be considered carefully because operational endpoints may reveal sensitive information.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nmanagement.endpoints.web.exposure.include=*\n```",
          },
          ],
      },
      {
        title: "Common Actuator Endpoints",
        slug: "common-actuator-endpoints",
        description: "this topic discusses endpoints including: /actuator/health -> health status /actuator/info -> application information /actuator/metrics -> available metric.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic discusses endpoints including: /actuator/health -> health status /actuator/info -> application information /actuator/metrics -> available metrics /actuator/env -> environment properties /actuator/beans -> Spring beans /actuator/mappings -> request mappings The purpose is observability: understanding whether the application is healthy and what is happening inside it.",
          },
          {
            title: "Detailed explanation",
            content: "this topic discusses endpoints including:\n\n/actuator/health -> health status\n/actuator/info -> application information\n/actuator/metrics -> available metrics\n/actuator/env -> environment properties\n/actuator/beans -> Spring beans\n/actuator/mappings -> request mappings\n\nThe purpose is observability: understanding whether the application is healthy and what is happening inside it.",
          },
          {
            title: "Example",
            content: "**Example:** this topic discusses endpoints including: /actuator/health -> health status /actuator/info -> application information /actuator/metrics -> available metrics /actuator/env -> environment properties /actuator/beans -> Spring beans /actuator/mappings -> request mappings The purpose is observability: understanding whether the application is healthy and what is happening inside it.",
          },
          ],
      },
      {
        title: "Custom Metrics",
        slug: "custom-metrics",
        description: "Custom metrics allow the application to record business or operational measurements. @Component public class VisitCounter { private final Counter counter; .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Custom metrics allow the application to record business or operational measurements. @Component public class VisitCounter { private final Counter counter; public VisitCounter(MeterRegistry registry) { this.counter = registry.counter(\"custom.visit.counter\"); } public void increment() { counter.increment(); } } The counter can then be inspected through the actuator metrics endpoint.",
          },
          {
            title: "Detailed explanation",
            content: "Custom metrics allow the application to record business or operational measurements.\n\n**Example:**\n\n```java\n@Component\npublic class VisitCounter {\nprivate final Counter counter;\n\npublic VisitCounter(MeterRegistry registry) {\n    this.counter = registry.counter(\"custom.visit.counter\");\n}\n\npublic void increment() {\n    counter.increment();\n}\n}\n```\n\nThe counter can then be inspected through the actuator metrics endpoint.\n\nUseful custom metrics might measure processed requests, successful payments, queue messages, or other business events.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Component\npublic class VisitCounter {\nprivate final Counter counter;\n\npublic VisitCounter(MeterRegistry registry) {\n    this.counter = registry.counter(\"custom.visit.counter\");\n}\n\npublic void increment() {\n    counter.increment();\n}\n}\n```",
          },
          ],
      },
      {
        title: "Prometheus and Grafana",
        slug: "prometheus-and-grafana",
        description: "this topic describes Micrometer as the metrics layer that can export measurements to systems such as Prometheus and others. High-level flow: Application ->.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic describes Micrometer as the metrics layer that can export measurements to systems such as Prometheus and others. High-level flow: Application -> Micrometer -> Prometheus endpoint/export -> Prometheus collects metrics -> Grafana visualizes metrics this topic shows /actuator/prometheus as the Prometheus endpoint and describes dashboards for CPU, memory, garbage collection, and custom metrics.",
          },
          {
            title: "Detailed explanation",
            content: "this topic describes Micrometer as the metrics layer that can export measurements to systems such as Prometheus and others.\n\nHigh-level flow:\n\nApplication\n-> Micrometer\n-> Prometheus endpoint/export\n-> Prometheus collects metrics\n-> Grafana visualizes metrics\n\nthis topic shows /actuator/prometheus as the Prometheus endpoint and describes dashboards for CPU, memory, garbage collection, and custom metrics.\n\nThe key concept is observability: metrics become useful when they are collected, stored, visualized, and used to identify trends or failures.",
          },
          {
            title: "Example",
            content: "**Example:** this topic describes Micrometer as the metrics layer that can export measurements to systems such as Prometheus and others. High-level flow: Application -> Micrometer -> Prometheus endpoint/export -> Prometheus collects metrics -> Grafana visualizes metrics this topic shows /actuator/prometheus as the Prometheus endpoint and describes dashboards for CPU, memory, garbage collection, and custom metrics.",
          },
          ],
      },
    ],
  },
  {
    title: "Error Handling",
    slug: "error-handling",
    description: "Learn error handling through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Default Error Handling",
        slug: "default-error-handling",
        description: "Spring Boot provides default error handling. For REST-style requests, an error response can contain fields such as timestamp, status, error, and path.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot provides default error handling. For REST-style requests, an error response can contain fields such as timestamp, status, error, and path.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot provides default error handling. For REST-style requests, an error response can contain fields such as timestamp, status, error, and path. Traditional web applications can show a default error page.\n\nExample shape:\n\n{\n\"timestamp\": \"...\",\n\"status\": 404,\n\"error\": \"Not Found\",\n\"path\": \"/api/users/100\"\n}\n\nThe purpose of the default mechanism is to provide a consistent fallback when an exception or error is not handled by application-specific logic.",
          },
          {
            title: "Example",
            content: "**Example:** Spring Boot provides default error handling. For REST-style requests, an error response can contain fields such as timestamp, status, error, and path.",
          },
          ],
      },
      {
        title: "Custom Error Pages",
        slug: "custom-error-pages",
        description: "For browser-oriented applications, this topic describes custom HTML error pages under error-specific resource paths such as: /resources/public/error/404.ht.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "For browser-oriented applications, this topic describes custom HTML error pages under error-specific resource paths such as: /resources/public/error/404.html /resources/public/error/500.html This allows the application to provide a user-friendly page instead of a generic error page.",
          },
          {
            title: "Detailed explanation",
            content: "For browser-oriented applications, this topic describes custom HTML error pages under error-specific resource paths such as:\n\n/resources/public/error/404.html\n/resources/public/error/500.html\n\nThis allows the application to provide a user-friendly page instead of a generic error page.",
          },
          {
            title: "Example",
            content: "**Example:** For browser-oriented applications, this topic describes custom HTML error pages under error-specific resource paths such as: /resources/public/error/404.html /resources/public/error/500.html This allows the application to provide a user-friendly page instead of a generic error page.",
          },
          ],
      },
      {
        title: "Global Exception Handling",
        slug: "global-exception-handling",
        description: "@ControllerAdvice and @ExceptionHandler can centralize error handling across controllers. @ControllerAdvice public class GlobalExceptionHandler { @Exceptio.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@ControllerAdvice and @ExceptionHandler can centralize error handling across controllers. @ControllerAdvice public class GlobalExceptionHandler { @ExceptionHandler(ResourceNotFoundException.class) public ResponseEntity<String> handleNotFound( ResourceNotFoundException ex) { return new ResponseEntity<>( \"Resource not found: \" + ex.getMessage(), HttpStatus.NOT_FOUND); } @ExceptionHandler(Exception.class) public...",
          },
          {
            title: "Detailed explanation",
            content: "@ControllerAdvice and @ExceptionHandler can centralize error handling across controllers.\n\n**Example:**\n\n```java\n@ControllerAdvice\npublic class GlobalExceptionHandler {\n\n@ExceptionHandler(ResourceNotFoundException.class)\npublic ResponseEntity<String> handleNotFound(\n        ResourceNotFoundException ex) {\n    return new ResponseEntity<>(\n        \"Resource not found: \" + ex.getMessage(),\n        HttpStatus.NOT_FOUND);\n}\n\n@ExceptionHandler(Exception.class)\npublic ResponseEntity<String> handleGeneral(Exception ex) {\n    return new ResponseEntity<>(\n        \"Internal error\",\n        HttpStatus.INTERNAL_SERVER_ERROR);\n}\n}\n```\n\nBest-practice concepts from this topic:\n- Use appropriate HTTP status codes.\n- Log useful exception information.\n- Do not expose sensitive stack traces to clients.\n- Keep error responses consistent.\n- Customize error attributes when necessary.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@ControllerAdvice and @ExceptionHandler can centralize error handling across controllers.",
          },
          ],
      },
    ],
  },
  {
    title: "Developer Tools",
    slug: "developer-tools",
    description: "Learn developer tools through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Spring Boot Devtools",
        slug: "spring-boot-devtools",
        description: "DevTools improves the development feedback loop. this topic identifies automatic restart, LiveReload, template cache disabling, and other development-orien.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "DevTools improves the development feedback loop. this topic identifies automatic restart, LiveReload, template cache disabling, and other development-oriented behavior.",
          },
          {
            title: "Detailed explanation",
            content: "DevTools improves the development feedback loop. this topic identifies automatic restart, LiveReload, template cache disabling, and other development-oriented behavior.\n\nMaven dependency:\n\n```xml\n<dependency>\n<groupId>org.springframework.boot</groupId>\n<artifactId>spring-boot-devtools</artifactId>\n<optional>true</optional>\n</dependency>\n```\n\nGradle example:\n\ndevelopmentOnly(\"org.springframework.boot:spring-boot-devtools\")",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```xml\n<dependency>\n<groupId>org.springframework.boot</groupId>\n<artifactId>spring-boot-devtools</artifactId>\n<optional>true</optional>\n</dependency>\n```",
          },
          ],
      },
      {
        title: "Auto Restart",
        slug: "auto-restart",
        description: "DevTools monitors classpath changes. When a relevant compiled class changes, the development application can restart automatically.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "DevTools monitors classpath changes. When a relevant compiled class changes, the development application can restart automatically.",
          },
          {
            title: "Detailed explanation",
            content: "DevTools monitors classpath changes. When a relevant compiled class changes, the development application can restart automatically.\n\nTypical flow:\n\nThis reduces the repetitive stop/start cycle during development.",
          },
          {
            title: "Example",
            content: "**Example:** DevTools monitors classpath changes. When a relevant compiled class changes, the development application can restart automatically.",
          },
          ],
      },
      {
        title: "Live Reload",
        slug: "live-reload",
        description: "LiveReload can refresh the browser when static resources or templates change. this topic describes: The purpose is developer productivity, not production r.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "LiveReload can refresh the browser when static resources or templates change. this topic describes: The purpose is developer productivity, not production runtime behavior.",
          },
          {
            title: "Detailed explanation",
            content: "LiveReload can refresh the browser when static resources or templates change.\n\nthis topic describes:\n- Add DevTools.\n- Install a LiveReload browser extension.\n- Modify HTML/CSS/template resources.\n- Browser refreshes automatically.\n\nThe purpose is developer productivity, not production runtime behavior.",
          },
          {
            title: "Example",
            content: "**Example:** LiveReload can refresh the browser when static resources or templates change. this topic describes: The purpose is developer productivity, not production runtime behavior.",
          },
          ],
      },
    ],
  },
  {
    title: "Caching",
    slug: "caching",
    description: "Learn caching through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "@Cacheable and @CacheEvict",
        slug: "cacheable-and-cacheevict",
        description: "Caching stores frequently used results so the application does not need to perform the expensive operation repeatedly. Enable caching: @EnableCaching Cache.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Caching stores frequently used results so the application does not need to perform the expensive operation repeatedly. Enable caching: @EnableCaching Cache a method: @Cacheable(\"products\") public Product getProductById(Long id) { return productRepository.findById(id).orElse(null); } First request for an id: method executes -> database lookup -> result stored in cache Later request for the same key: cache lookup...",
          },
          {
            title: "Detailed explanation",
            content: "Caching stores frequently used results so the application does not need to perform the expensive operation repeatedly.\n\nEnable caching:\n\n```java\n@EnableCaching\n```\n\nCache a method:\n\n```java\n@Cacheable(\"products\")\npublic Product getProductById(Long id) {\nreturn productRepository.findById(id).orElse(null);\n}\n```\n\nFirst request for an id:\nmethod executes -> database lookup -> result stored in cache\n\nLater request for the same key:\ncache lookup -> cached result returned\n\n```java\n@CacheEvict removes cached data when the underlying data changes.\n\n@CacheEvict(value = \"products\", key = \"#id\")\npublic void deleteProduct(Long id) {\nproductRepository.deleteById(id);\n}\n```\n\nImportant concept: a cache improves read performance only when its data remains sufficiently fresh for the application's requirements.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@EnableCaching\n```",
          },
          ],
      },
      {
        title: "Cache Providers",
        slug: "cache-providers",
        description: "this topic mentions: Ehcache -> Java/in-memory caching Caffeine -> fast Java-based caching Redis -> external/distributed cache Caffeine example: spring.cac.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic mentions: Ehcache -> Java/in-memory caching Caffeine -> fast Java-based caching Redis -> external/distributed cache Caffeine example: spring.cache.type=caffeine spring.cache.caffeine.spec=maximumSize=1000,expireAfterAccess=5m Redis example: spring.cache.type=redis spring.redis.host=localhost spring.redis.port=6379 A local in-memory cache is simple and fast, but each application instance has its own cache.",
          },
          {
            title: "Detailed explanation",
            content: "this topic mentions:\n\nEhcache -> Java/in-memory caching\nCaffeine -> fast Java-based caching\nRedis -> external/distributed cache\n\nCaffeine example:\n\n```properties\nspring.cache.type=caffeine\nspring.cache.caffeine.spec=maximumSize=1000,expireAfterAccess=5m\n```\n\nRedis example:\n\n```properties\nspring.cache.type=redis\nspring.redis.host=localhost\nspring.redis.port=6379\n```\n\nA local in-memory cache is simple and fast, but each application instance has its own cache. A distributed cache such as Redis can be shared by multiple instances.\n\nInterview question:\nWhy use Redis instead of only an in-memory cache in a multi-instance system?\nBecause a shared external cache can provide common cached state across application instances.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.cache.type=caffeine\nspring.cache.caffeine.spec=maximumSize=1000,expireAfterAccess=5m\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Scheduling And Asynchronous Execution",
    slug: "scheduling-and-asynchronous-execution",
    description: "Learn scheduling and asynchronous execution through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "@scheduled",
        slug: "scheduled",
        description: "@Scheduled runs methods periodically or according to a schedule. Enable scheduling: @EnableScheduling Fixed rate: @Scheduled(fixedRate = 5000) public void .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@Scheduled runs methods periodically or according to a schedule. Enable scheduling: @EnableScheduling Fixed rate: @Scheduled(fixedRate = 5000) public void reportStatus() { // every 5 seconds according to the scheduling rule } Fixed delay: The next execution is scheduled after the previous execution completes and the configured delay passes.",
          },
          {
            title: "Detailed explanation",
            content: "@Scheduled runs methods periodically or according to a schedule.\n\nEnable scheduling:\n\n```java\n@EnableScheduling\n```\n\nFixed rate:\n\n@Scheduled(fixedRate = 5000)\n\n```java\npublic void reportStatus() {\n// every 5 seconds according to the scheduling rule\n}\n```\n\nFixed delay:\nThe next execution is scheduled after the previous execution completes and the configured delay passes.\n\nCron:\n\n@Scheduled(cron = \"0 0 9 * * ?\")\n\n```java\npublic void dailyTask() {\n// daily task\n}\n```\n\nCommon use cases include cleanup jobs, periodic synchronization, report generation, and scheduled health/maintenance work.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@Scheduled runs methods periodically or according to a schedule.",
          },
          ],
      },
      {
        title: "@async",
        slug: "async",
        description: "@Async allows a method to execute asynchronously using a separate thread managed by Spring's async infrastructure. Enable it: @EnableAsync Use it: @Async p.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "@Async allows a method to execute asynchronously using a separate thread managed by Spring's async infrastructure. Enable it: @EnableAsync Use it: @Async public void sendEmail(String to) { // time-consuming work } A controller can call the method and return a response without waiting for the entire background operation to finish.",
          },
          {
            title: "Detailed explanation",
            content: "@Async allows a method to execute asynchronously using a separate thread managed by Spring's async infrastructure.\n\nEnable it:\n\n```java\n@EnableAsync\n```\n\nUse it:\n\n```java\n@Async\npublic void sendEmail(String to) {\n// time-consuming work\n}\n```\n\nA controller can call the method and return a response without waiting for the entire background operation to finish.\n\nImportant rule highlighted in this topic: async methods must be called through another Spring-managed bean rather than through a direct self-invocation in the same class, because the proxy-based interception mechanism is involved.\n\nUse asynchronous execution carefully. Background work introduces concurrency, thread-pool considerations, error-handling concerns, and ordering questions.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n@Async allows a method to execute asynchronously using a separate thread managed by Spring's async infrastructure.",
          },
          ],
      },
    ],
  },
  {
    title: "Messaging",
    slug: "messaging",
    description: "Learn messaging through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Rabbitmq",
        slug: "rabbitmq",
        description: "RabbitMQ is presented as a message broker using AMQP for asynchronous message delivery. Producer example: rabbitTemplate.convertAndSend(\"myQueue\", message).",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "RabbitMQ is presented as a message broker using AMQP for asynchronous message delivery. Producer example: rabbitTemplate.convertAndSend(\"myQueue\", message); Consumer example: @RabbitListener(queues = \"myQueue\") public void receive(String message) { System.out.println(\"Received: \" + message); } Producer -> Broker/Queue -> Consumer The producer does not need to perform the consumer's work immediately.",
          },
          {
            title: "Detailed explanation",
            content: "RabbitMQ is presented as a message broker using AMQP for asynchronous message delivery.\n\nProducer example:\n\n```java\nrabbitTemplate.convertAndSend(\"myQueue\", message);\n```\n\nConsumer example:\n\n```java\n@RabbitListener(queues = \"myQueue\")\npublic void receive(String message) {\nSystem.out.println(\"Received: \" + message);\n}\n```\n\n**Conceptually:**\n\nProducer -> Broker/Queue -> Consumer\n\nThe producer does not need to perform the consumer's work immediately. This helps decouple components and supports asynchronous processing.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nrabbitTemplate.convertAndSend(\"myQueue\", message);\n```",
          },
          ],
      },
      {
        title: "Apache Kafka",
        slug: "apache-kafka",
        description: "Kafka is presented as a distributed event-streaming platform suitable for high-throughput and fault-tolerant messaging. Producer: kafkaTemplate.send(\"myTop.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Kafka is presented as a distributed event-streaming platform suitable for high-throughput and fault-tolerant messaging. Producer: kafkaTemplate.send(\"myTopic\", message); Consumer: @KafkaListener(topics = \"myTopic\", groupId = \"my-group\") public void listen(String message) { // process event } A useful conceptual difference from a traditional queue mindset is that Kafka is commonly organized around topics and...",
          },
          {
            title: "Detailed explanation",
            content: "Kafka is presented as a distributed event-streaming platform suitable for high-throughput and fault-tolerant messaging.\n\nProducer:\n\n```java\nkafkaTemplate.send(\"myTopic\", message);\n```\n\nConsumer:\n\n```java\n@KafkaListener(topics = \"myTopic\", groupId = \"my-group\")\npublic void listen(String message) {\n// process event\n}\n```\n\nA useful conceptual difference from a traditional queue mindset is that Kafka is commonly organized around topics and consumer groups, with events retained according to broker configuration and consumption tracked through offsets.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nkafkaTemplate.send(\"myTopic\", message);\n```",
          },
          ],
      },
      {
        title: "JMS",
        slug: "jms",
        description: "JMS is a Java messaging API. this topic uses an Artemis starter and JmsTemplate/JmsListener examples.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "JMS is a Java messaging API. this topic uses an Artemis starter and JmsTemplate/JmsListener examples.",
          },
          {
            title: "Detailed explanation",
            content: "JMS is a Java messaging API. this topic uses an Artemis starter and JmsTemplate/JmsListener examples.\n\nProducer:\n\n```java\njmsTemplate.convertAndSend(\"queue.sample\", msg);\n```\n\nConsumer:\n\n```java\n@JmsListener(destination = \"queue.sample\")\npublic void receive(String msg) {\n// process message\n}\n```\n\nThe common pattern remains the same:\napplication -> messaging infrastructure -> another consumer.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\njmsTemplate.convertAndSend(\"queue.sample\", msg);\n```",
          },
          ],
      },
    ],
  },
  {
    title: "File Upload And Download",
    slug: "file-upload-and-download",
    description: "Learn file upload and download through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Multipart File Upload",
        slug: "multipart-file-upload",
        description: "Spring Boot can receive uploaded files through MultipartFile. Example endpoint shape: @PostMapping(\"/upload\") public ResponseEntity<String> handleFileUploa.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot can receive uploaded files through MultipartFile. Example endpoint shape: @PostMapping(\"/upload\") public ResponseEntity<String> handleFileUpload( @RequestParam(\"file\") MultipartFile file) throws IOException { String uploadDir = \"uploads/\"; Path path = Paths.get(uploadDir + file.getOriginalFilename()); Files.createDirectories(path.getParent()); Files.write(path, file.getBytes()); return...",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot can receive uploaded files through MultipartFile.\n\nExample endpoint shape:\n\n```java\n@PostMapping(\"/upload\")\npublic ResponseEntity<String> handleFileUpload(\n```\n\n    @RequestParam(\"file\") MultipartFile file) throws IOException {\n\n```java\nString uploadDir = \"uploads/\";\nPath path = Paths.get(uploadDir + file.getOriginalFilename());\nFiles.createDirectories(path.getParent());\nFiles.write(path, file.getBytes());\n\nreturn ResponseEntity.ok(\"File uploaded successfully\");\n}\n```\n\nThe client sends multipart/form-data. Postman can test this by choosing form-data and adding a field named file.\n\nThe important pieces are:\nMultipartFile -> receives the uploaded content\nPath/Files -> stores the file\nResponseEntity -> communicates success/failure",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@PostMapping(\"/upload\")\npublic ResponseEntity<String> handleFileUpload(\n```\n\n    @RequestParam(\"file\") MultipartFile file) throws IOException {\n\n```java\nString uploadDir = \"uploads/\";\nPath path = Paths.get(uploadDir + file.getOriginalFilename());\nFiles.createDirectories(path.getParent());\nFiles.write(path, file.getBytes());\n\nreturn ResponseEntity.ok(\"File uploaded successfully\");\n}\n```",
          },
          ],
      },
      {
        title: "Download and Security",
        slug: "download-and-security",
        description: "A download endpoint can return a Resource and set Content-Disposition so the browser treats the response as a downloadable file. Conceptual flow: this topi.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A download endpoint can return a Resource and set Content-Disposition so the browser treats the response as a downloadable file. Conceptual flow: this topic specifically highlights security checks: Example size settings: spring.servlet.multipart.max-file-size=5MB spring.servlet.multipart.max-request-size=10MB Do not trust the original filename from a client as a safe filesystem path.",
          },
          {
            title: "Detailed explanation",
            content: "A download endpoint can return a Resource and set Content-Disposition so the browser treats the response as a downloadable file.\n\nConceptual flow:\n\nthis topic specifically highlights security checks:\n- Validate file type.\n- Enforce file size limits.\n- Sanitize filenames and paths.\n- Prevent directory traversal.\n\nExample size settings:\n\n```java\nspring.servlet.multipart.max-file-size=5MB\nspring.servlet.multipart.max-request-size=10MB\n```\n\nDo not trust the original filename from a client as a safe filesystem path.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```properties\nspring.servlet.multipart.max-file-size=5MB\nspring.servlet.multipart.max-request-size=10MB\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Frontend Integration",
    slug: "frontend-integration",
    description: "Learn frontend integration through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Serving Static Files",
        slug: "serving-static-files",
        description: "Spring Boot can serve static resources from directories under src/main/resources such as static and public. src/main/resources/static/index.html can be ser.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot can serve static resources from directories under src/main/resources such as static and public. src/main/resources/static/index.html can be served as: http://localhost:8080/index.html Related CSS, JavaScript, and image files can be placed under corresponding directories.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot can serve static resources from directories under src/main/resources such as static and public.\n\n**Example:**\n\nsrc/main/resources/static/index.html\n\ncan be served as:\n\nhttp://localhost:8080/index.html\n\nRelated CSS, JavaScript, and image files can be placed under corresponding directories.",
          },
          {
            title: "Example",
            content: "**Example:** Spring Boot can serve static resources from directories under src/main/resources such as static and public. src/main/resources/static/index.html can be served as: http://localhost:8080/index.html Related CSS, JavaScript, and image files can be placed under corresponding directories.",
          },
          ],
      },
      {
        title: "Thymeleaf",
        slug: "thymeleaf",
        description: "Thymeleaf is a server-side template engine. A controller can place data in a Model and return a view name.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Thymeleaf is a server-side template engine. A controller can place data in a Model and return a view name.",
          },
          {
            title: "Detailed explanation",
            content: "Thymeleaf is a server-side template engine. A controller can place data in a Model and return a view name.\n\nController:\n\n```java\n@Controller\npublic class HomeController {\n@GetMapping(\"/home\")\npublic String home(Model model) {\n    model.addAttribute(\"message\", \"Welcome\");\n    return \"home\";\n}\n}\n```\n\nTemplate:\n\n<h1 th:text=\"${message}\"></h1>\n\n**Flow:**\n\nBrowser -> Controller -> Model data -> Thymeleaf template -> HTML response",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@Controller\npublic class HomeController {\n@GetMapping(\"/home\")\npublic String home(Model model) {\n    model.addAttribute(\"message\", \"Welcome\");\n    return \"home\";\n}\n}\n```",
          },
          ],
      },
      {
        title: "Cors",
        slug: "cors",
        description: "CORS controls whether a browser-based frontend from one origin can call an API hosted on another origin. this topic shows global configuration through WebM.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "CORS controls whether a browser-based frontend from one origin can call an API hosted on another origin. this topic shows global configuration through WebMvcConfigurer and controller-level @CrossOrigin.",
          },
          {
            title: "Detailed explanation",
            content: "CORS controls whether a browser-based frontend from one origin can call an API hosted on another origin.\n\nthis topic shows global configuration through WebMvcConfigurer and controller-level @CrossOrigin.\n\n**Example:**\n\nregistry.addMapping(\"/api/**\")\n```java\n    .allowedOrigins(\"http://localhost:4200\")\n    .allowedMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\");\n```\n\nController-level example:\n\n```java\n@CrossOrigin(origins = \"http://localhost:4200\")\n@RestController\npublic class ProductController { ... }\n```\n\nImportant distinction:\nCORS is primarily a browser-origin policy. It is not a replacement for authentication or authorization.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n.allowedOrigins(\"http://localhost:4200\")\n    .allowedMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\");\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Build And Deployment",
    slug: "build-and-deployment",
    description: "Learn build and deployment through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Jar and War",
        slug: "jar-and-war",
        description: "this topic presents executable JAR packaging as the default style and also describes WAR packaging for deployment to an external server. mvn clean package .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic presents executable JAR packaging as the default style and also describes WAR packaging for deployment to an external server. mvn clean package java -jar target/myapp-0.0.1-SNAPSHOT.jar Set packaging to war and extend SpringBootServletInitializer when required for the external-container deployment model described in this topic.",
          },
          {
            title: "Detailed explanation",
            content: "this topic presents executable JAR packaging as the default style and also describes WAR packaging for deployment to an external server.\n\n**Jar:**\n\n```bash\nmvn clean package\njava -jar target/myapp-0.0.1-SNAPSHOT.jar\n```\n\n**War:**\n\nSet packaging to war and extend SpringBootServletInitializer when required for the external-container deployment model described in this topic.\n\nThe main conceptual difference is:\nExecutable JAR -> application can carry its embedded server/runtime setup.\nWAR -> application can be deployed into a compatible external servlet container.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```bash\nmvn clean package\njava -jar target/myapp-0.0.1-SNAPSHOT.jar\n```",
          },
          ],
      },
      {
        title: "Dockerizing Spring Boot",
        slug: "dockerizing-spring-boot",
        description: "this topic gives a simple Dockerfile: FROM openjdk:21 COPY target/myapp.jar app.jar ENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"] Build: docker build -t myapp . .",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic gives a simple Dockerfile: FROM openjdk:21 COPY target/myapp.jar app.jar ENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"] Build: docker build -t myapp . Run: docker run -p 8080:8080 myapp The key Docker idea is packaging the application and its runtime environment into a repeatable container image.",
          },
          {
            title: "Detailed explanation",
            content: "this topic gives a simple Dockerfile:\n\n```dockerfile\nFROM openjdk:21\nCOPY target/myapp.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]\n```\n\nBuild:\n\n```bash\ndocker build -t myapp .\n```\n\nRun:\n\n```bash\ndocker run -p 8080:8080 myapp\n```\n\nThe key Docker idea is packaging the application and its runtime environment into a repeatable container image.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\nFROM openjdk:21\nCOPY target/myapp.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]\n```",
          },
          ],
      },
      {
        title: "Cloud Deployment",
        slug: "cloud-deployment",
        description: "this topic lists AWS, Azure, and GCP as deployment targets and gives examples involving Elastic Beanstalk, Azure App Service, and Google App Engine. The ge.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "this topic lists AWS, Azure, and GCP as deployment targets and gives examples involving Elastic Beanstalk, Azure App Service, and Google App Engine. The general deployment flow is: Build artifact -> configure environment -> provide application settings/secrets -> deploy -> monitor -> scale/maintain The exact cloud commands depend on the selected platform.",
          },
          {
            title: "Detailed explanation",
            content: "this topic lists AWS, Azure, and GCP as deployment targets and gives examples involving Elastic Beanstalk, Azure App Service, and Google App Engine.\n\nThe general deployment flow is:\nBuild artifact -> configure environment -> provide application settings/secrets -> deploy -> monitor -> scale/maintain\n\nThe exact cloud commands depend on the selected platform. The important Spring Boot concept is that the application can be packaged independently and deployed into many hosting environments.",
          },
          {
            title: "Example",
            content: "**Example:** this topic lists AWS, Azure, and GCP as deployment targets and gives examples involving Elastic Beanstalk, Azure App Service, and Google App Engine. The general deployment flow is: Build artifact -> configure environment -> provide application settings/secrets -> deploy -> monitor -> scale/maintain The exact cloud commands depend on the selected platform.",
          },
          ],
      },
      {
        title: "Ci/cd",
        slug: "ci-cd",
        description: "CI/CD automates building, testing, and deployment. A typical pipeline is: Developer pushes code | v Checkout source | v Compile/build | v Run tests | v Pac.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "CI/CD automates building, testing, and deployment. A typical pipeline is: Developer pushes code | v Checkout source | v Compile/build | v Run tests | v Package JAR | v Deploy this topic provides a GitHub Actions example that checks out the code, configures JDK 21, and runs mvn clean package.",
          },
          {
            title: "Detailed explanation",
            content: "CI/CD automates building, testing, and deployment.\n\nA typical pipeline is:\n\nDeveloper pushes code\n```java\n    |\n    v\n```\n\nCheckout source\n```java\n    |\n    v\n```\n\nCompile/build\n```java\n    |\n    v\n```\n\nRun tests\n```java\n    |\n    v\n```\n\nPackage JAR\n```java\n    |\n    v\n```\n\nDeploy\n\nthis topic provides a GitHub Actions example that checks out the code, configures JDK 21, and runs mvn clean package.\n\nOther tools mentioned include Jenkins, GitLab CI, CircleCI, Bitbucket Pipelines, and Azure DevOps.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n|\n    v\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Advanced Topics",
    slug: "advanced-topics",
    description: "Learn advanced topics through clear explanations, examples, and interview-focused practice.",
    topics: [
      {
        title: "Microservices With Spring Boot",
        slug: "microservices-with-spring-boot",
        description: "Spring Boot combined with Spring Cloud can support distributed systems and common microservice patterns. this topic introduces: A microservice architecture.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Boot combined with Spring Cloud can support distributed systems and common microservice patterns. this topic introduces: A microservice architecture may look like: Client | v Gateway | +------> Product Service | +------> Order Service | +------> Payment Service Supporting infrastructure can provide service discovery, centralized configuration, and resilience.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Boot combined with Spring Cloud can support distributed systems and common microservice patterns.\n\nthis topic introduces:\n- Spring Cloud\n- Eureka service discovery\n- Spring Cloud Gateway / Zuul\n- Circuit breakers such as Resilience4j\n- Config Server\n\nA microservice architecture may look like:\n\nClient\n|\nv\nGateway\n|\n+------> Product Service\n|\n+------> Order Service\n|\n+------> Payment Service\n\nSupporting infrastructure can provide service discovery, centralized configuration, and resilience.",
          },
          {
            title: "Example",
            content: "**Example:** Spring Boot combined with Spring Cloud can support distributed systems and common microservice patterns. this topic introduces: A microservice architecture may look like: Client | v Gateway | +------> Product Service | +------> Order Service | +------> Payment Service Supporting infrastructure can provide service discovery, centralized configuration, and resilience.",
          },
          ],
      },
      {
        title: "Spring Cloud",
        slug: "spring-cloud",
        description: "Spring Cloud is presented as a collection of tools for distributed-system patterns such as configuration, discovery, routing, load balancing, and resilienc.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Spring Cloud is presented as a collection of tools for distributed-system patterns such as configuration, discovery, routing, load balancing, and resilience. The important learning point is that microservices create problems that a single application does not have: locating services, handling network failures, managing configuration across many services, and routing requests.",
          },
          {
            title: "Detailed explanation",
            content: "Spring Cloud is presented as a collection of tools for distributed-system patterns such as configuration, discovery, routing, load balancing, and resilience.\n\nThe important learning point is that microservices create problems that a single application does not have: locating services, handling network failures, managing configuration across many services, and routing requests.",
          },
          {
            title: "Example",
            content: "**Example:** Spring Cloud is presented as a collection of tools for distributed-system patterns such as configuration, discovery, routing, load balancing, and resilience. The important learning point is that microservices create problems that a single application does not have: locating services, handling network failures, managing configuration across many services, and routing requests.",
          },
          ],
      },
      {
        title: "Eureka Service Discovery",
        slug: "eureka-service-discovery",
        description: "Service discovery allows services to find each other without hard-coding every service address. Product Service -> registers with Eureka Order Service -> r.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Service discovery allows services to find each other without hard-coding every service address. Product Service -> registers with Eureka Order Service -> registers with Eureka Client/Gateway -> asks Eureka where Product Service is this topic shows Eureka Server and Eureka Client examples.",
          },
          {
            title: "Detailed explanation",
            content: "Service discovery allows services to find each other without hard-coding every service address.\n\n**Conceptually:**\n\nProduct Service -> registers with Eureka\nOrder Service   -> registers with Eureka\nClient/Gateway  -> asks Eureka where Product Service is\n\nthis topic shows Eureka Server and Eureka Client examples.\n\nThe benefit is that service instances can be discovered dynamically rather than relying only on fixed hostnames and ports.",
          },
          {
            title: "Example",
            content: "**Example:** Service discovery allows services to find each other without hard-coding every service address. Product Service -> registers with Eureka Order Service -> registers with Eureka Client/Gateway -> asks Eureka where Product Service is this topic shows Eureka Server and Eureka Client examples.",
          },
          ],
      },
      {
        title: "Spring Cloud Gateway / Zuul",
        slug: "spring-cloud-gateway-zuul",
        description: "A gateway provides a single entry point for external clients and can route requests to internal services. Example route concept: Path=/products/** -> http:.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A gateway provides a single entry point for external clients and can route requests to internal services. Example route concept: Path=/products/** -> http://localhost:8081 this topic describes Spring Cloud Gateway as the modern replacement for Zuul in its discussion.",
          },
          {
            title: "Detailed explanation",
            content: "A gateway provides a single entry point for external clients and can route requests to internal services.\n\nExample route concept:\n\nPath=/products/**\n```java\n-> http://localhost:8081\n```\n\nthis topic describes Spring Cloud Gateway as the modern replacement for Zuul in its discussion.\n\nGateway responsibilities can include routing and, depending on configuration, cross-cutting concerns such as authentication, rate limiting, or request transformation.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n-> http://localhost:8081\n```",
          },
          ],
      },
      {
        title: "Circuit Breaker and Resilience4j",
        slug: "circuit-breaker-and-resilience4j",
        description: "Distributed calls can fail because another service is unavailable, slow, or overloaded. A circuit breaker prevents repeated failing calls from causing a wi.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "Distributed calls can fail because another service is unavailable, slow, or overloaded. A circuit breaker prevents repeated failing calls from causing a wider cascade of failures.",
          },
          {
            title: "Detailed explanation",
            content: "Distributed calls can fail because another service is unavailable, slow, or overloaded. A circuit breaker prevents repeated failing calls from causing a wider cascade of failures.\n\nthis topic shows Resilience4j and a fallback method:\n\n```java\n@CircuitBreaker(name = \"productService\", fallbackMethod = \"fallback\")\npublic String getProduct() {\nreturn restTemplate.getForObject(\n    \"http://product-service/api\", String.class);\n}\n\npublic String fallback(Throwable t) {\nreturn \"Fallback response\";\n}\n```\n\n**Mental model:**\n\nNormal -> repeated failures -> circuit opens -> calls fail fast/fallback -> after recovery conditions, calls can resume.\n\nThe purpose is resilience, not hiding every failure. The fallback should represent a meaningful degraded behavior.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n@CircuitBreaker(name = \"productService\", fallbackMethod = \"fallback\")\npublic String getProduct() {\nreturn restTemplate.getForObject(\n    \"http://product-service/api\", String.class);\n}\n\npublic String fallback(Throwable t) {\nreturn \"Fallback response\";\n}\n```",
          },
          ],
      },
      {
        title: "Config Server",
        slug: "config-server",
        description: "A centralized configuration server can provide configuration to multiple services. Conceptual architecture: Git/config repository | v Config Server / v v S.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "A centralized configuration server can provide configuration to multiple services. Conceptual architecture: Git/config repository | v Config Server / v v Service A Service B this topic shows a Config Server backed by a Git repository and client-side import configuration.",
          },
          {
            title: "Detailed explanation",
            content: "A centralized configuration server can provide configuration to multiple services.\n\nConceptual architecture:\n\nGit/config repository\n```java\n    |\n    v\n```\n\nConfig Server\n```java\n /           v         v\n```\n\nService A   Service B\n\nthis topic shows a Config Server backed by a Git repository and client-side import configuration.\n\nBenefits include centralized configuration management and reduced duplication across services. Secrets still require careful handling and should not simply be committed to an ordinary source repository.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\n|\n    v\n```",
          },
          ],
      },
      {
        title: "Application Events",
        slug: "application-events",
        description: "ApplicationEventPublisher and event listeners support event-driven communication inside the application. Define an event: public class UserCreatedEvent ext.",
        estimatedMinutes: 8,
        sections: [
          {
            title: "Concept",
            content: "ApplicationEventPublisher and event listeners support event-driven communication inside the application. Define an event: public class UserCreatedEvent extends ApplicationEvent { private String email; public UserCreatedEvent(Object source, String email) { super(source); this.email = email; } } Publish: publisher.publishEvent(new UserCreatedEvent(this, email)); Listen: @EventListener public void...",
          },
          {
            title: "Detailed explanation",
            content: "ApplicationEventPublisher and event listeners support event-driven communication inside the application.\n\nDefine an event:\n\n```java\npublic class UserCreatedEvent extends ApplicationEvent {\nprivate String email;\n\npublic UserCreatedEvent(Object source, String email) {\n    super(source);\n    this.email = email;\n}\n}\n```\n\nPublish:\n\npublisher.publishEvent(new UserCreatedEvent(this, email));\n\nListen:\n\n```java\n@EventListener\npublic void handleUserCreated(UserCreatedEvent event) {\nSystem.out.println(\"User created: \" + event.getEmail());\n}\n```\n\nThe advantage is loose coupling. The code that creates the user does not need to directly call every secondary action that should happen after user creation.",
          },
          {
            title: "Example",
            content: "A small example from this topic:\n\n```java\npublic class UserCreatedEvent extends ApplicationEvent {\nprivate String email;\n\npublic UserCreatedEvent(Object source, String email) {\n    super(source);\n    this.email = email;\n}\n}\n```",
          },
          ],
      },
      {
        title: "Creating Custom Starters",
        slug: "creating-custom-starters",
        description: "Create reusable Spring Boot infrastructure that can be added through a starter dependency.",
        estimatedMinutes: 12,
        sections: [
          {
            title: "Concept",
            content: "A custom starter packages reusable application infrastructure so another project can add one dependency and receive the associated auto-configuration.",
          },
          {
            title: "Detailed explanation",
            content: "A custom starter packages reusable application infrastructure so that another project can add one dependency and receive the associated auto-configuration.\n\nThe basic steps are:\n1. Create a separate starter module.\n2. Include spring-boot-autoconfigure.\n3. Register auto-configuration using the mechanism appropriate to the Spring Boot generation used by the project.\n4. Provide an auto-configuration class.\n5. Publish and use the starter as a dependency.\n\nExample idea:\n\n```java\n@Configuration\npublic class MyAutoConfiguration {\n    @Bean\n    public MyService myService() {\n        return new MyService();\n    }\n}\n```\n\nThe real value is packaging reusable configuration rather than forcing every application to repeat the same setup.",
          },
          {
            title: "Example",
            content: "A custom starter can expose an auto-configuration class that registers a reusable service when the starter is added to an application.\n\n```java\n@Configuration\npublic class MyAutoConfiguration {\n    @Bean\n    public MyService myService() {\n        return new MyService();\n    }\n}\n```",
          },
          ],
      },
    ],
  },
  {
    title: "Interview Revision",
    slug: "interview-revision",
    description: "Consolidate the main Spring Boot concepts with interview questions, project flow, and revision patterns.",
    topics: [
      {
        title: "Common Spring Boot Interview Questions",
        slug: "common-spring-boot-interview-questions",
        description: "Review the most important Spring Boot interview questions and concise answers.",
        estimatedMinutes: 20,
        sections: [
          {
            title: "Concept",
            content: "Interview preparation is strongest when you can explain a Spring Boot feature in your own words, describe why it exists, and connect it to a practical application scenario.",
          },
          {
            title: "Detailed explanation",
            content: "1\n.\n\nW\nh\na\nt\n\ni\ns\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nJ\na\nv\na\n\nf\nr\na\nm\ne\nw\no\nr\nk\n\nb\nu\ni\nl\nt\n\no\nn\n\nS\np\nr\ni\nn\ng\n\nt\nh\na\nt\n\ns\ni\nm\np\nl\ni\nf\ni\ne\ns\n\na\np\np\nl\ni\nc\na\nt\ni\no\nn\n\nd\ne\nv\ne\nl\no\np\nm\ne\nn\nt\n\nt\nh\nr\no\nu\ng\nh\n\na\nu\nt\no\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n,\n\ns\nt\na\nr\nt\ne\nr\ns\n,\n\ne\nm\nb\ne\nd\nd\ne\nd\n\ns\ne\nr\nv\ne\nr\ns\n,\n\na\nn\nd\n\np\nr\no\nd\nu\nc\nt\ni\no\nn\no\nr\ni\ne\nn\nt\ne\nd\n\nf\ne\na\nt\nu\nr\ne\ns\n.\n\n2\n.\n\nW\nh\na\nt\n\ni\ns\n\n@\nS\np\nr\ni\nn\ng\nB\no\no\nt\nA\np\np\nl\ni\nc\na\nt\ni\no\nn\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nc\no\nn\nv\ne\nn\ni\ne\nn\nc\ne\n\na\nn\nn\no\nt\na\nt\ni\no\nn\n\nc\no\nm\nb\ni\nn\ni\nn\ng\n\n@\nC\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n,\n\n@\nE\nn\na\nb\nl\ne\nA\nu\nt\no\nC\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n,\n\na\nn\nd\n\n@\nC\no\nm\np\no\nn\ne\nn\nt\nS\nc\na\nn\n.\n\n3\n.\n\nW\nh\na\nt\n\ni\ns\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ny\n\ni\nn\nj\ne\nc\nt\ni\no\nn\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nS\nu\np\np\nl\ny\ni\nn\ng\n\na\nn\n\no\nb\nj\ne\nc\nt\n'\ns\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ni\ne\ns\n\nf\nr\no\nm\n\no\nu\nt\ns\ni\nd\ne\n\ni\nn\ns\nt\ne\na\nd\n\no\nf\n\nh\na\nv\ni\nn\ng\n\nt\nh\ne\n\no\nb\nj\ne\nc\nt\n\nc\nr\ne\na\nt\ne\n\nt\nh\ne\nm\n\ni\nt\ns\ne\nl\nf\n.\n\n4\n.\n\nW\nh\na\nt\n\ni\ns\n\nI\no\nC\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\np\nr\ni\nn\nc\ni\np\nl\ne\n\nw\nh\ne\nr\ne\n\nc\no\nn\nt\nr\no\nl\n\no\nf\n\no\nb\nj\ne\nc\nt\n\nc\nr\ne\na\nt\ni\no\nn\n\na\nn\nd\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ny\n\nm\na\nn\na\ng\ne\nm\ne\nn\nt\n\ni\ns\n\nt\nr\na\nn\ns\nf\ne\nr\nr\ne\nd\n\nt\no\n\na\n\nc\no\nn\nt\na\ni\nn\ne\nr\n/\nf\nr\na\nm\ne\nw\no\nr\nk\n.\n\n5\n.\n\n@\nC\no\nm\np\no\nn\ne\nn\nt\n\nv\ns\n\n@\nS\ne\nr\nv\ni\nc\ne\n\nv\ns\n\n@\nR\ne\np\no\ns\ni\nt\no\nr\ny\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\nl\nl\n\na\nr\ne\n\nc\no\nm\np\no\nn\ne\nn\nt\n\ns\nt\ne\nr\ne\no\nt\ny\np\ne\ns\n,\n\nb\nu\nt\n\nt\nh\ne\ny\n\nc\no\nm\nm\nu\nn\ni\nc\na\nt\ne\n\nd\ni\nf\nf\ne\nr\ne\nn\nt\n\nr\ne\ns\np\no\nn\ns\ni\nb\ni\nl\ni\nt\ni\ne\ns\n:\n\ng\ne\nn\ne\nr\ni\nc\n\nc\no\nm\np\no\nn\ne\nn\nt\n,\n\nb\nu\ns\ni\nn\ne\ns\ns\n/\ns\ne\nr\nv\ni\nc\ne\n\nl\na\ny\ne\nr\n,\n\na\nn\nd\n\nd\na\nt\na\na\nc\nc\ne\ns\ns\n\nl\na\ny\ne\nr\n.\n\n6\n.\n\n@\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\nv\ns\n\n@\nR\ne\ns\nt\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\nc\no\nm\nm\no\nn\nl\ny\n\nw\no\nr\nk\ns\n\nw\ni\nt\nh\n\nM\nV\nC\n\nv\ni\ne\nw\ns\n;\n\n@\nR\ne\ns\nt\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\ni\ns\n\ni\nn\nt\ne\nn\nd\ne\nd\n\nf\no\nr\n\nR\nE\nS\nT\n\nr\ne\ns\np\no\nn\ns\ne\ns\n\na\nn\nd\n\ne\nf\nf\ne\nc\nt\ni\nv\ne\nl\ny\n\ni\nn\nc\nl\nu\nd\ne\ns\n\nr\ne\ns\np\no\nn\ns\ne\nb\no\nd\ny\n\nb\ne\nh\na\nv\ni\no\nr\n.\n\n7\n.\n\n@\nA\nu\nt\no\nw\ni\nr\ne\nd\n\nv\ns\n\n@\nQ\nu\na\nl\ni\nf\ni\ne\nr\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nA\nu\nt\no\nw\ni\nr\ne\nd\n\np\ne\nr\nf\no\nr\nm\ns\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ny\n\ni\nn\nj\ne\nc\nt\ni\no\nn\n;\n\n@\nQ\nu\na\nl\ni\nf\ni\ne\nr\n\ns\ne\nl\ne\nc\nt\ns\n\na\n\np\na\nr\nt\ni\nc\nu\nl\na\nr\n\nb\ne\na\nn\n\nw\nh\ne\nn\n\nm\nu\nl\nt\ni\np\nl\ne\n\nc\na\nn\nd\ni\nd\na\nt\ne\ns\n\ne\nx\ni\ns\nt\n.\n\n8\n.\n\n@\nB\ne\na\nn\n\nv\ns\n\n@\nC\no\nm\np\no\nn\ne\nn\nt\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nC\no\nm\np\no\nn\ne\nn\nt\n\ni\ns\n\np\nl\na\nc\ne\nd\n\no\nn\n\na\n\nc\nl\na\ns\ns\n\nf\no\nr\n\nc\no\nm\np\no\nn\ne\nn\nt\n\ns\nc\na\nn\nn\ni\nn\ng\n;\n\n@\nB\ne\na\nn\n\ni\ns\n\np\nl\na\nc\ne\nd\n\no\nn\n\na\n\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n\nm\ne\nt\nh\no\nd\n\nt\no\n\ne\nx\np\nl\ni\nc\ni\nt\nl\ny\n\nr\ne\ng\ni\ns\nt\ne\nr\n\nt\nh\ne\n\nr\ne\nt\nu\nr\nn\ne\nd\n\no\nb\nj\ne\nc\nt\n\na\ns\n\na\n\nb\ne\na\nn\n.\n\n9\n.\n\nW\nh\na\nt\n\ni\ns\n\na\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n\ns\nt\na\nr\nt\ne\nr\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nc\no\nn\nv\ne\nn\ni\ne\nn\nt\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ny\n\nb\nu\nn\nd\nl\ne\n\nf\no\nr\n\na\n\nc\no\nm\nm\no\nn\n\nc\na\np\na\nb\ni\nl\ni\nt\ny\n\ns\nu\nc\nh\n\na\ns\n\nw\ne\nb\n,\n\nJ\nP\nA\n,\n\ns\ne\nc\nu\nr\ni\nt\ny\n,\n\no\nr\n\nt\ne\ns\nt\ni\nn\ng\n.\n\n1\n0\n.\n\nW\nh\na\nt\n\ni\ns\n\na\nu\nt\no\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n\na\nu\nt\no\nm\na\nt\ni\nc\na\nl\nl\ny\n\nc\no\nn\nf\ni\ng\nu\nr\ne\ns\n\nc\no\nm\nm\no\nn\n\ni\nn\nf\nr\na\ns\nt\nr\nu\nc\nt\nu\nr\ne\n\nb\na\ns\ne\nd\n\no\nn\n\nt\nh\ne\n\na\np\np\nl\ni\nc\na\nt\ni\no\nn\n'\ns\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ni\ne\ns\n\na\nn\nd\n\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n.\n\n1\n1\n.\n\n@\nV\na\nl\nu\ne\n\nv\ns\n\n@\nC\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\nP\nr\no\np\ne\nr\nt\ni\ne\ns\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nV\na\nl\nu\ne\n\ni\ns\n\nc\no\nn\nv\ne\nn\ni\ne\nn\nt\n\nf\no\nr\n\ni\nn\nd\ni\nv\ni\nd\nu\na\nl\n\nv\na\nl\nu\ne\ns\n;\n\n@\nC\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\nP\nr\no\np\ne\nr\nt\ni\ne\ns\n\ni\ns\n\nd\ne\ns\ni\ng\nn\ne\nd\n\nf\no\nr\n\ns\nt\nr\nu\nc\nt\nu\nr\ne\nd\n\ng\nr\no\nu\np\ns\n\no\nf\n\nr\ne\nl\na\nt\ne\nd\n\ns\ne\nt\nt\ni\nn\ng\ns\n.\n\n1\n2\n.\n\nW\nh\na\nt\n\na\nr\ne\n\nS\np\nr\ni\nn\ng\n\nP\nr\no\nf\ni\nl\ne\ns\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nw\na\ny\n\nt\no\n\na\nc\nt\ni\nv\na\nt\ne\n\ne\nn\nv\ni\nr\no\nn\nm\ne\nn\nt\ns\np\ne\nc\ni\nf\ni\nc\n\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n\na\nn\nd\n\nb\ne\na\nn\ns\n,\n\ns\nu\nc\nh\n\na\ns\n\nd\ne\nv\n,\n\nt\ne\ns\nt\n,\n\na\nn\nd\n\np\nr\no\nd\n.\n\n1\n3\n.\n\n@\nP\na\nt\nh\nV\na\nr\ni\na\nb\nl\ne\n\nv\ns\n\n@\nR\ne\nq\nu\ne\ns\nt\nP\na\nr\na\nm\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nP\na\nt\nh\nV\na\nr\ni\na\nb\nl\ne\n\nr\ne\na\nd\ns\n\na\n\nv\na\nl\nu\ne\n\ne\nm\nb\ne\nd\nd\ne\nd\n\ni\nn\n\nt\nh\ne\n\nU\nR\nL\n\np\na\nt\nh\n;\n\n@\nR\ne\nq\nu\ne\ns\nt\nP\na\nr\na\nm\n\nr\ne\na\nd\ns\n\na\n\nq\nu\ne\nr\ny\n\np\na\nr\na\nm\ne\nt\ne\nr\n.\n\n1\n4\n.\n\nW\nh\ny\n\nu\ns\ne\n\nR\ne\ns\np\no\nn\ns\ne\nE\nn\nt\ni\nt\ny\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nT\no\n\ne\nx\np\nl\ni\nc\ni\nt\nl\ny\n\nc\no\nn\nt\nr\no\nl\n\nH\nT\nT\nP\n\nr\ne\ns\np\no\nn\ns\ne\n\ns\nt\na\nt\nu\ns\n,\n\nh\ne\na\nd\ne\nr\ns\n,\n\na\nn\nd\n\nb\no\nd\ny\n.\n\n1\n5\n.\n\nW\nh\na\nt\n\ni\ns\n\n@\nC\no\nn\nt\nr\no\nl\nl\ne\nr\nA\nd\nv\ni\nc\ne\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nc\ne\nn\nt\nr\na\nl\ni\nz\ne\nd\n\nm\ne\nc\nh\na\nn\ni\ns\nm\n\nf\no\nr\n\nc\no\nn\nt\nr\no\nl\nl\ne\nr\nr\ne\nl\na\nt\ne\nd\n\nc\nr\no\ns\ns\nc\nu\nt\nt\ni\nn\ng\n\nc\no\nn\nc\ne\nr\nn\ns\n,\n\nc\no\nm\nm\no\nn\nl\ny\n\ng\nl\no\nb\na\nl\n\ne\nx\nc\ne\np\nt\ni\no\nn\n\nh\na\nn\nd\nl\ni\nn\ng\n.\n\n1\n6\n.\n\nW\nh\na\nt\n\ni\ns\n\nS\np\nr\ni\nn\ng\n\nD\na\nt\na\n\nJ\nP\nA\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\nn\n\na\nb\ns\nt\nr\na\nc\nt\ni\no\nn\n\nt\nh\na\nt\n\ns\ni\nm\np\nl\ni\nf\ni\ne\ns\n\nJ\nP\nA\nb\na\ns\ne\nd\n\np\ne\nr\ns\ni\ns\nt\ne\nn\nc\ne\n\nt\nh\nr\no\nu\ng\nh\n\nr\ne\np\no\ns\ni\nt\no\nr\ni\ne\ns\n\na\nn\nd\n\nq\nu\ne\nr\ny\n\ns\nu\np\np\no\nr\nt\n.\n\n1\n7\n.\n\nJ\np\na\nR\ne\np\no\ns\ni\nt\no\nr\ny\n\nv\ns\n\nJ\nd\nb\nc\nT\ne\nm\np\nl\na\nt\ne\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nJ\np\na\nR\ne\np\no\ns\ni\nt\no\nr\ny\n\np\nr\no\nv\ni\nd\ne\ns\n\na\nn\n\no\nb\nj\ne\nc\nt\n/\ne\nn\nt\ni\nt\ny\no\nr\ni\ne\nn\nt\ne\nd\n\nr\ne\np\no\ns\ni\nt\no\nr\ny\n\na\nb\ns\nt\nr\na\nc\nt\ni\no\nn\n;\n\nJ\nd\nb\nc\nT\ne\nm\np\nl\na\nt\ne\n\ng\ni\nv\ne\ns\n\nm\no\nr\ne\n\nd\ni\nr\ne\nc\nt\n\nS\nQ\nL\n\nc\no\nn\nt\nr\no\nl\n.\n\n1\n8\n.\n\nW\nh\ny\n\nu\ns\ne\n\n@\nT\nr\na\nn\ns\na\nc\nt\ni\no\nn\na\nl\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nT\no\n\nd\ne\nf\ni\nn\ne\n\na\n\nt\nr\na\nn\ns\na\nc\nt\ni\no\nn\na\nl\n\nb\no\nu\nn\nd\na\nr\ny\n\na\nr\no\nu\nn\nd\n\nr\ne\nl\na\nt\ne\nd\n\no\np\ne\nr\na\nt\ni\no\nn\ns\n\ns\no\n\nt\nh\ne\ny\n\nc\na\nn\n\nb\ne\n\nt\nr\ne\na\nt\ne\nd\n\na\ns\n\no\nn\ne\n\nl\no\ng\ni\nc\na\nl\n\nd\na\nt\na\nb\na\ns\ne\n\nu\nn\ni\nt\n.\n\n1\n9\n.\n\nW\nh\na\nt\n\ni\ns\n\nc\no\nn\nn\ne\nc\nt\ni\no\nn\n\np\no\no\nl\ni\nn\ng\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nR\ne\nu\ns\ni\nn\ng\n\nd\na\nt\na\nb\na\ns\ne\n\nc\no\nn\nn\ne\nc\nt\ni\no\nn\ns\n\ni\nn\ns\nt\ne\na\nd\n\no\nf\n\no\np\ne\nn\ni\nn\ng\n\na\n\nn\ne\nw\n\nc\no\nn\nn\ne\nc\nt\ni\no\nn\n\nf\no\nr\n\ne\nv\ne\nr\ny\n\no\np\ne\nr\na\nt\ni\no\nn\n.\n\n2\n0\n.\n\nW\nh\na\nt\n\ni\ns\n\nt\nh\ne\n\nd\ni\nf\nf\ne\nr\ne\nn\nc\ne\n\nb\ne\nt\nw\ne\ne\nn\n\na\nu\nt\nh\ne\nn\nt\ni\nc\na\nt\ni\no\nn\n\na\nn\nd\n\na\nu\nt\nh\no\nr\ni\nz\na\nt\ni\no\nn\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\nu\nt\nh\ne\nn\nt\ni\nc\na\nt\ni\no\nn\n\ni\nd\ne\nn\nt\ni\nf\ni\ne\ns\n\nt\nh\ne\n\nu\ns\ne\nr\n;\n\na\nu\nt\nh\no\nr\ni\nz\na\nt\ni\no\nn\n\nd\ne\nt\ne\nr\nm\ni\nn\ne\ns\n\nw\nh\na\nt\n\nt\nh\ne\n\nu\ns\ne\nr\n\nc\na\nn\n\na\nc\nc\ne\ns\ns\n.\n\n2\n1\n.\n\nW\nh\na\nt\n\ni\ns\n\nJ\nW\nT\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nt\no\nk\ne\nn\n\nf\no\nr\nm\na\nt\n\nc\no\nm\nm\no\nn\nl\ny\n\nu\ns\ne\nd\n\nt\no\n\nc\na\nr\nr\ny\n\na\nu\nt\nh\ne\nn\nt\ni\nc\na\nt\ni\no\nn\nr\ne\nl\na\nt\ne\nd\n\nc\nl\na\ni\nm\ns\n\nb\ne\nt\nw\ne\ne\nn\n\na\n\nc\nl\ni\ne\nn\nt\n\na\nn\nd\n\ns\ne\nr\nv\ne\nr\n\ni\nn\n\ns\nt\na\nt\ne\nl\ne\ns\ns\n\nA\nP\nI\n\nd\ne\ns\ni\ng\nn\ns\n.\n\n2\n2\n.\n\nW\nh\ny\n\nu\ns\ne\n\nB\nC\nr\ny\np\nt\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nT\no\n\ns\nt\no\nr\ne\n\np\na\ns\ns\nw\no\nr\nd\ns\n\ni\nn\n\na\nn\n\ne\nn\nc\no\nd\ne\nd\n/\nh\na\ns\nh\ne\nd\n\nf\no\nr\nm\n\nr\na\nt\nh\ne\nr\n\nt\nh\na\nn\n\np\nl\na\ni\nn\n\nt\ne\nx\nt\n.\n\n2\n3\n.\n\n@\nS\np\nr\ni\nn\ng\nB\no\no\nt\nT\ne\ns\nt\n\nv\ns\n\n@\nW\ne\nb\nM\nv\nc\nT\ne\ns\nt\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nS\np\nr\ni\nn\ng\nB\no\no\nt\nT\ne\ns\nt\n\nl\no\na\nd\ns\n\na\n\nb\nr\no\na\nd\n\na\np\np\nl\ni\nc\na\nt\ni\no\nn\n\nc\no\nn\nt\ne\nx\nt\n\nf\no\nr\n\ni\nn\nt\ne\ng\nr\na\nt\ni\no\nn\ns\nt\ny\nl\ne\n\nt\ne\ns\nt\ni\nn\ng\n;\n\n@\nW\ne\nb\nM\nv\nc\nT\ne\ns\nt\n\nf\no\nc\nu\ns\ne\ns\n\no\nn\n\nt\nh\ne\n\nw\ne\nb\n\nl\na\ny\ne\nr\n.\n\n2\n4\n.\n\nW\nh\na\nt\n\ni\ns\n\nM\no\nc\nk\ni\nt\no\n\nu\ns\ne\nd\n\nf\no\nr\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nC\nr\ne\na\nt\ni\nn\ng\n\nc\no\nn\nt\nr\no\nl\nl\ne\nd\n\nm\no\nc\nk\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ni\ne\ns\n\ns\no\n\na\n\nu\nn\ni\nt\n\nt\ne\ns\nt\n\nc\na\nn\n\ni\ns\no\nl\na\nt\ne\n\nt\nh\ne\n\nc\nl\na\ns\ns\n\nu\nn\nd\ne\nr\n\nt\ne\ns\nt\n.\n\n2\n5\n.\n\nW\nh\na\nt\n\ni\ns\n\nA\nc\nt\nu\na\nt\no\nr\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n'\ns\n\no\np\ne\nr\na\nt\ni\no\nn\na\nl\n/\nm\no\nn\ni\nt\no\nr\ni\nn\ng\n\nf\ne\na\nt\nu\nr\ne\n\ns\ne\nt\n,\n\ni\nn\nc\nl\nu\nd\ni\nn\ng\n\ne\nn\nd\np\no\ni\nn\nt\ns\n\nf\no\nr\n\nh\ne\na\nl\nt\nh\n\na\nn\nd\n\nm\ne\nt\nr\ni\nc\ns\n.\n\n2\n6\n.\n\nW\nh\na\nt\n\ni\ns\n\nc\na\nc\nh\ni\nn\ng\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nR\ne\nu\ns\ni\nn\ng\n\np\nr\ne\nv\ni\no\nu\ns\nl\ny\n\nc\no\nm\np\nu\nt\ne\nd\n/\nf\ne\nt\nc\nh\ne\nd\n\nr\ne\ns\nu\nl\nt\ns\n\nt\no\n\nr\ne\nd\nu\nc\ne\n\ne\nx\np\ne\nn\ns\ni\nv\ne\n\nr\ne\np\ne\na\nt\ne\nd\n\nw\no\nr\nk\n.\n\n2\n7\n.\n\n@\nC\na\nc\nh\ne\na\nb\nl\ne\n\nv\ns\n\n@\nC\na\nc\nh\ne\nE\nv\ni\nc\nt\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nC\na\nc\nh\ne\na\nb\nl\ne\n\ns\nt\no\nr\ne\ns\n/\nr\ne\nu\ns\ne\ns\n\nm\ne\nt\nh\no\nd\n\nr\ne\ns\nu\nl\nt\ns\n;\n\n@\nC\na\nc\nh\ne\nE\nv\ni\nc\nt\n\nr\ne\nm\no\nv\ne\ns\n\nc\na\nc\nh\ne\n\ne\nn\nt\nr\ni\ne\ns\n.\n\n2\n8\n.\n\n@\nS\nc\nh\ne\nd\nu\nl\ne\nd\n\nv\ns\n\n@\nA\ns\ny\nn\nc\n?\n\nA\nn\ns\nw\ne\nr\n:\n\n@\nS\nc\nh\ne\nd\nu\nl\ne\nd\n\nc\no\nn\nt\nr\no\nl\ns\n\nw\nh\ne\nn\n\na\n\nm\ne\nt\nh\no\nd\n\nr\nu\nn\ns\n;\n\n@\nA\ns\ny\nn\nc\n\nc\nh\na\nn\ng\ne\ns\n\ne\nx\ne\nc\nu\nt\ni\no\nn\n\ns\no\n\nw\no\nr\nk\n\nc\na\nn\n\nr\nu\nn\n\na\ns\ny\nn\nc\nh\nr\no\nn\no\nu\ns\nl\ny\n.\n\n2\n9\n.\n\nW\nh\ny\n\nu\ns\ne\n\nm\ne\ns\ns\na\ng\ni\nn\ng\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nT\no\n\nd\ne\nc\no\nu\np\nl\ne\n\np\nr\no\nd\nu\nc\ne\nr\ns\n\na\nn\nd\n\nc\no\nn\ns\nu\nm\ne\nr\ns\n\na\nn\nd\n\ns\nu\np\np\no\nr\nt\n\na\ns\ny\nn\nc\nh\nr\no\nn\no\nu\ns\n/\ne\nv\ne\nn\nt\nd\nr\ni\nv\ne\nn\n\np\nr\no\nc\ne\ns\ns\ni\nn\ng\n.\n\n3\n0\n.\n\nW\nh\ny\n\nu\ns\ne\n\na\n\ng\na\nt\ne\nw\na\ny\n\ni\nn\n\nm\ni\nc\nr\no\ns\ne\nr\nv\ni\nc\ne\ns\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nT\no\n\np\nr\no\nv\ni\nd\ne\n\na\n\nc\no\nn\nt\nr\no\nl\nl\ne\nd\n\ne\nn\nt\nr\ny\n\np\no\ni\nn\nt\n\nf\no\nr\n\nr\no\nu\nt\ni\nn\ng\n\nr\ne\nq\nu\ne\ns\nt\ns\n\nt\no\n\ni\nn\nt\ne\nr\nn\na\nl\n\ns\ne\nr\nv\ni\nc\ne\ns\n\na\nn\nd\n\nh\na\nn\nd\nl\ni\nn\ng\n\nc\nr\no\ns\ns\nc\nu\nt\nt\ni\nn\ng\n\nc\no\nn\nc\ne\nr\nn\ns\n.\n\n3\n1\n.\n\nW\nh\na\nt\n\np\nr\no\nb\nl\ne\nm\n\nd\no\ne\ns\n\ns\ne\nr\nv\ni\nc\ne\n\nd\ni\ns\nc\no\nv\ne\nr\ny\n\ns\no\nl\nv\ne\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nI\nt\n\na\nl\nl\no\nw\ns\n\ns\ne\nr\nv\ni\nc\ne\ns\n\nt\no\n\nl\no\nc\na\nt\ne\n\na\nv\na\ni\nl\na\nb\nl\ne\n\ns\ne\nr\nv\ni\nc\ne\n\ni\nn\ns\nt\na\nn\nc\ne\ns\n\nw\ni\nt\nh\no\nu\nt\n\nh\na\nr\nd\nc\no\nd\ni\nn\ng\n\ne\nv\ne\nr\ny\n\na\nd\nd\nr\ne\ns\ns\n.\n\n3\n2\n.\n\nW\nh\na\nt\n\ni\ns\n\na\n\nc\ni\nr\nc\nu\ni\nt\n\nb\nr\ne\na\nk\ne\nr\n?\n\nA\nn\ns\nw\ne\nr\n:\n\nA\n\nr\ne\ns\ni\nl\ni\ne\nn\nc\ne\n\np\na\nt\nt\ne\nr\nn\n\nt\nh\na\nt\n\np\nr\ne\nv\ne\nn\nt\ns\n\nr\ne\np\ne\na\nt\ne\nd\n\nf\na\ni\nl\ni\nn\ng\n\nc\na\nl\nl\ns\n\nf\nr\no\nm\n\nc\no\nn\nt\ni\nn\nu\no\nu\ns\nl\ny\n\nc\no\nn\ns\nu\nm\ni\nn\ng\n\nr\ne\ns\no\nu\nr\nc\ne\ns\n\na\nn\nd\n\na\nl\nl\no\nw\ns\n\nf\na\nl\nl\nb\na\nc\nk\n/\nd\ne\ng\nr\na\nd\ne\nd\n\nb\ne\nh\na\nv\ni\no\nr\n.",
          },
          {
            title: "Practice",
            content: "For each question, answer without memorizing the wording. Start with the definition, explain the purpose, describe the high-level behavior, and then give a small example or comparison.",
          },
        ],
      },
      {
        title: "Practical Project Flow",
        slug: "practical-project-flow",
        description: "Trace a typical Spring Boot backend request from the client through controller, service, data access, and operational layers.",
        estimatedMinutes: 12,
        sections: [
          {
            title: "Concept",
            content: "A Spring Boot backend is easier to understand when each layer has one clear responsibility and the request moves through those responsibilities in a predictable order.",
          },
          {
            title: "Detailed explanation",
            content: "A\n\nt\ny\np\ni\nc\na\nl\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n\nb\na\nc\nk\ne\nn\nd\n\nc\na\nn\n\nb\ne\n\nu\nn\nd\ne\nr\ns\nt\no\no\nd\n\na\ns\n\na\n\nc\nh\na\ni\nn\n\no\nf\n\nr\ne\ns\np\no\nn\ns\ni\nb\ni\nl\ni\nt\ni\ne\ns\n:\n\n1\n.\n\nC\nl\ni\ne\nn\nt\n\ns\ne\nn\nd\ns\n\nH\nT\nT\nP\n\nr\ne\nq\nu\ne\ns\nt\n.\n\n2\n.\n\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\nr\ne\nc\ne\ni\nv\ne\ns\n\na\nn\nd\n\nv\na\nl\ni\nd\na\nt\ne\ns\n\nt\nh\ne\n\nr\ne\nq\nu\ne\ns\nt\n.\n\n3\n.\n\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\nc\na\nl\nl\ns\n\nt\nh\ne\n\ns\ne\nr\nv\ni\nc\ne\n.\n\n4\n.\n\nS\ne\nr\nv\ni\nc\ne\n\na\np\np\nl\ni\ne\ns\n\nb\nu\ns\ni\nn\ne\ns\ns\n\nr\nu\nl\ne\ns\n.\n\n5\n.\n\nS\ne\nr\nv\ni\nc\ne\n\nc\na\nl\nl\ns\n\nr\ne\np\no\ns\ni\nt\no\nr\ny\n/\nd\na\nt\na\na\nc\nc\ne\ns\ns\n\nc\no\nd\ne\n.\n\n6\n.\n\nR\ne\np\no\ns\ni\nt\no\nr\ny\n\nc\no\nm\nm\nu\nn\ni\nc\na\nt\ne\ns\n\nw\ni\nt\nh\n\nt\nh\ne\n\nd\na\nt\na\nb\na\ns\ne\n.\n\n7\n.\n\nS\ne\nr\nv\ni\nc\ne\n\nr\ne\nt\nu\nr\nn\ns\n\nt\nh\ne\n\nr\ne\ns\nu\nl\nt\n.\n\n8\n.\n\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\nb\nu\ni\nl\nd\ns\n\nt\nh\ne\n\nH\nT\nT\nP\n\nr\ne\ns\np\no\nn\ns\ne\n.\n\n9\n.\n\nE\nx\nc\ne\np\nt\ni\no\nn\n\nh\na\nn\nd\nl\ni\nn\ng\n\nc\no\nn\nv\ne\nr\nt\ns\n\nf\na\ni\nl\nu\nr\ne\ns\n\ni\nn\nt\no\n\nc\no\nn\ns\ni\ns\nt\ne\nn\nt\n\ne\nr\nr\no\nr\n\nr\ne\ns\np\no\nn\ns\ne\ns\n.\n\n1\n0\n.\n\nL\no\ng\ng\ni\nn\ng\n\nr\ne\nc\no\nr\nd\ns\n\ni\nm\np\no\nr\nt\na\nn\nt\n\ne\nv\ne\nn\nt\ns\n.\n\n1\n1\n.\n\nA\nc\nt\nu\na\nt\no\nr\n/\nm\ne\nt\nr\ni\nc\ns\n\np\nr\no\nv\ni\nd\ne\n\no\np\ne\nr\na\nt\ni\no\nn\na\nl\n\nv\ni\ns\ni\nb\ni\nl\ni\nt\ny\n.\n\n1\n2\n.\n\nS\ne\nc\nu\nr\ni\nt\ny\n\nc\no\nn\nt\nr\no\nl\ns\n\nw\nh\no\n\nc\na\nn\n\na\nc\nc\ne\ns\ns\n\ne\na\nc\nh\n\ne\nn\nd\np\no\ni\nn\nt\n.\n\n1\n3\n.\n\nC\na\nc\nh\ni\nn\ng\n\nc\na\nn\n\nr\ne\nd\nu\nc\ne\n\nr\ne\np\ne\na\nt\ne\nd\n\ne\nx\np\ne\nn\ns\ni\nv\ne\n\nr\ne\na\nd\ns\n.\n\n1\n4\n.\n\nM\ne\ns\ns\na\ng\ni\nn\ng\n\nc\na\nn\n\nm\no\nv\ne\n\nl\no\nn\ng\nr\nu\nn\nn\ni\nn\ng\n\no\nr\n\ne\nv\ne\nn\nt\nd\nr\ni\nv\ne\nn\n\nw\no\nr\nk\n\no\nu\nt\n\no\nf\n\nt\nh\ne\n\nr\ne\nq\nu\ne\ns\nt\n\np\na\nt\nh\n.\n\nA\n\nc\nl\ne\na\nn\n\na\nr\nc\nh\ni\nt\ne\nc\nt\nu\nr\ne\n\nt\nh\ne\nr\ne\nf\no\nr\ne\n\nk\ne\ne\np\ns\n\ne\na\nc\nh\n\nl\na\ny\ne\nr\n\nf\no\nc\nu\ns\ne\nd\n\ni\nn\ns\nt\ne\na\nd\n\no\nf\n\na\nl\nl\no\nw\ni\nn\ng\n\nc\no\nn\nt\nr\no\nl\nl\ne\nr\ns\n\nt\no\n\nc\no\nn\nt\na\ni\nn\n\nd\na\nt\na\nb\na\ns\ne\n\nq\nu\ne\nr\ni\ne\ns\n,\n\nb\nu\ns\ni\nn\ne\ns\ns\n\nr\nu\nl\ne\ns\n,\n\nv\na\nl\ni\nd\na\nt\ni\no\nn\n,\n\ns\ne\nc\nu\nr\ni\nt\ny\n\nd\ne\nc\ni\ns\ni\no\nn\ns\n,\n\na\nn\nd\n\ni\nn\nf\nr\na\ns\nt\nr\nu\nc\nt\nu\nr\ne\n\nc\no\nd\ne\n\na\nl\nl\n\na\nt\n\no\nn\nc\ne\n.",
          },
          ],
      },
      {
        title: "Final Revision Checklist",
        slug: "final-revision-checklist",
        description: "Use a complete checklist to verify that the core Spring Boot interview areas are understood.",
        estimatedMinutes: 15,
        sections: [
          {
            title: "Concept",
            content: "The checklist brings the major Spring Boot concepts together so you can identify gaps before an interview or project.",
          },
          {
            title: "Detailed explanation",
            content: "B\ne\nf\no\nr\ne\n\na\nn\n\ni\nn\nt\ne\nr\nv\ni\ne\nw\n\no\nr\n\np\nr\no\nj\ne\nc\nt\n,\n\nm\na\nk\ne\n\ns\nu\nr\ne\n\ny\no\nu\n\nc\na\nn\n\ne\nx\np\nl\na\ni\nn\n\ne\na\nc\nh\n\no\nf\n\nt\nh\ne\ns\ne\n\nw\ni\nt\nh\no\nu\nt\n\nm\ne\nm\no\nr\ni\nz\ni\nn\ng\n\na\n\nd\ne\nf\ni\nn\ni\nt\ni\no\nn\n\nw\no\nr\nd\nf\no\nr\nw\no\nr\nd\n:\n\n[\n\n]\n\nW\nh\na\nt\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n\ns\no\nl\nv\ne\ns\n\n[\n\n]\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n\nv\ns\n\nS\np\nr\ni\nn\ng\n\nF\nr\na\nm\ne\nw\no\nr\nk\n\n[\n\n]\n\nA\nu\nt\no\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n\n[\n\n]\n\nS\nt\na\nr\nt\ne\nr\n\nd\ne\np\ne\nn\nd\ne\nn\nc\ni\ne\ns\n\n[\n\n]\n\nE\nm\nb\ne\nd\nd\ne\nd\n\ns\ne\nr\nv\ne\nr\n\n[\n\n]\n\n@\nS\np\nr\ni\nn\ng\nB\no\no\nt\nA\np\np\nl\ni\nc\na\nt\ni\no\nn\n\na\nn\nd\n\ni\nt\ns\n\nt\nh\nr\ne\ne\n\nm\na\nj\no\nr\n\np\na\nr\nt\ns\n\n[\n\n]\n\nI\no\nC\n\na\nn\nd\n\nD\nI\n\n[\n\n]\n\nB\ne\na\nn\n\nl\ni\nf\ne\nc\ny\nc\nl\ne\n\na\nt\n\na\n\nh\ni\ng\nh\n\nl\ne\nv\ne\nl\n\n[\n\n]\n\n@\nC\no\nm\np\no\nn\ne\nn\nt\n\n/\n\n@\nS\ne\nr\nv\ni\nc\ne\n\n/\n\n@\nR\ne\np\no\ns\ni\nt\no\nr\ny\n\n[\n\n]\n\n@\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\n/\n\n@\nR\ne\ns\nt\nC\no\nn\nt\nr\no\nl\nl\ne\nr\n\n[\n\n]\n\n@\nA\nu\nt\no\nw\ni\nr\ne\nd\n\n/\n\n@\nQ\nu\na\nl\ni\nf\ni\ne\nr\n\n[\n\n]\n\n@\nC\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n\n/\n\n@\nB\ne\na\nn\n\n[\n\n]\n\na\np\np\nl\ni\nc\na\nt\ni\no\nn\n.\np\nr\no\np\ne\nr\nt\ni\ne\ns\n\nv\ns\n\na\np\np\nl\ni\nc\na\nt\ni\no\nn\n.\ny\nm\nl\n\n[\n\n]\n\nE\nx\nt\ne\nr\nn\na\nl\n\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n\n[\n\n]\n\nP\nr\no\nf\ni\nl\ne\ns\n\n[\n\n]\n\n@\nV\na\nl\nu\ne\n\nv\ns\n\n@\nC\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\nP\nr\no\np\ne\nr\nt\ni\ne\ns\n\n[\n\n]\n\nR\nE\nS\nT\n\nc\no\nn\nt\nr\no\nl\nl\ne\nr\n\nr\ne\nq\nu\ne\ns\nt\n\nf\nl\no\nw\n\n[\n\n]\n\n@\nP\na\nt\nh\nV\na\nr\ni\na\nb\nl\ne\n\n/\n\n@\nR\ne\nq\nu\ne\ns\nt\nP\na\nr\na\nm\n\n/\n\n@\nR\ne\nq\nu\ne\ns\nt\nB\no\nd\ny\n\n[\n\n]\n\nR\ne\ns\np\no\nn\ns\ne\nE\nn\nt\ni\nt\ny\n\na\nn\nd\n\ns\nt\na\nt\nu\ns\n\nc\no\nd\ne\ns\n\n[\n\n]\n\n@\nC\no\nn\nt\nr\no\nl\nl\ne\nr\nA\nd\nv\ni\nc\ne\n\n/\n\n@\nE\nx\nc\ne\np\nt\ni\no\nn\nH\na\nn\nd\nl\ne\nr\n\n[\n\n]\n\nC\no\nn\nt\ne\nn\nt\n\nn\ne\ng\no\nt\ni\na\nt\ni\no\nn\n\n[\n\n]\n\nJ\nP\nA\n\ne\nn\nt\ni\nt\ny\n\na\nn\nd\n\nr\ne\np\no\ns\ni\nt\no\nr\ny\n\n[\n\n]\n\nJ\np\na\nR\ne\np\no\ns\ni\nt\no\nr\ny\n\n/\n\nC\nr\nu\nd\nR\ne\np\no\ns\ni\nt\no\nr\ny\n\n[\n\n]\n\nD\ne\nr\ni\nv\ne\nd\n\nq\nu\ne\nr\ni\ne\ns\n\n/\n\n@\nQ\nu\ne\nr\ny\n\n[\n\n]\n\nP\na\ng\ni\nn\na\nt\ni\no\nn\n\na\nn\nd\n\ns\no\nr\nt\ni\nn\ng\n\n[\n\n]\n\nJ\nd\nb\nc\nT\ne\nm\np\nl\na\nt\ne\n\n[\n\n]\n\nM\no\nn\ng\no\nD\nB\n\nr\ne\np\no\ns\ni\nt\no\nr\ny\n\n[\n\n]\n\nT\nr\na\nn\ns\na\nc\nt\ni\no\nn\ns\n\n[\n\n]\n\nH\n2\n\n/\n\nM\ny\nS\nQ\nL\n\n/\n\nP\no\ns\nt\ng\nr\ne\nS\nQ\nL\n\nc\no\nn\nf\ni\ng\nu\nr\na\nt\ni\no\nn\n\n[\n\n]\n\nH\ni\nk\na\nr\ni\nC\nP\n\nc\no\nn\nn\ne\nc\nt\ni\no\nn\n\np\no\no\nl\ni\nn\ng\n\n[\n\n]\n\ns\nc\nh\ne\nm\na\n.\ns\nq\nl\n\n/\n\nd\na\nt\na\n.\ns\nq\nl\n\n[\n\n]\n\nB\ne\na\nn\n\nv\na\nl\ni\nd\na\nt\ni\no\nn\n\n[\n\n]\n\n@\nV\na\nl\ni\nd\n\n/\n\n@\nV\na\nl\ni\nd\na\nt\ne\nd\n\n[\n\n]\n\nC\nu\ns\nt\no\nm\n\nv\na\nl\ni\nd\na\nt\no\nr\ns\n\n[\n\n]\n\nA\nu\nt\nh\ne\nn\nt\ni\nc\na\nt\ni\no\nn\n\n/\n\na\nu\nt\nh\no\nr\ni\nz\na\nt\ni\no\nn\n\n[\n\n]\n\nP\na\ns\ns\nw\no\nr\nd\n\ne\nn\nc\no\nd\ni\nn\ng\n\n[\n\n]\n\nJ\nW\nT\n\nf\nl\no\nw\n\n[\n\n]\n\nR\nB\nA\nC\n\n[\n\n]\n\nJ\nU\nn\ni\nt\n\n/\n\nM\no\nc\nk\ni\nt\no\n\n[\n\n]\n\n@\nS\np\nr\ni\nn\ng\nB\no\no\nt\nT\ne\ns\nt\n\n/\n\n@\nW\ne\nb\nM\nv\nc\nT\ne\ns\nt\n\n/\n\n@\nD\na\nt\na\nJ\np\na\nT\ne\ns\nt\n\n[\n\n]\n\nS\nL\nF\n4\nJ\n\n/\n\nL\no\ng\nb\na\nc\nk\n\n[\n\n]\n\nL\no\ng\n\nl\ne\nv\ne\nl\ns\n\n[\n\n]\n\nA\nc\nt\nu\na\nt\no\nr\n\n[\n\n]\n\nC\nu\ns\nt\no\nm\n\nm\ne\nt\nr\ni\nc\ns\n\n[\n\n]\n\nP\nr\no\nm\ne\nt\nh\ne\nu\ns\n/\nG\nr\na\nf\na\nn\na\n\nf\nl\no\nw\n\n[\n\n]\n\nD\ne\nf\na\nu\nl\nt\n\na\nn\nd\n\ng\nl\no\nb\na\nl\n\ne\nr\nr\no\nr\n\nh\na\nn\nd\nl\ni\nn\ng\n\n[\n\n]\n\nD\ne\nv\nT\no\no\nl\ns\n\n[\n\n]\n\nC\na\nc\nh\ni\nn\ng\n\n[\n\n]\n\nS\nc\nh\ne\nd\nu\nl\ni\nn\ng\n\n[\n\n]\n\nA\ns\ny\nn\nc\n\ne\nx\ne\nc\nu\nt\ni\no\nn\n\n[\n\n]\n\nR\na\nb\nb\ni\nt\nM\nQ\n\n/\n\nK\na\nf\nk\na\n\n/\n\nJ\nM\nS\n\n[\n\n]\n\nF\ni\nl\ne\n\nu\np\nl\no\na\nd\n/\nd\no\nw\nn\nl\no\na\nd\n\ns\ne\nc\nu\nr\ni\nt\ny\n\n[\n\n]\n\nS\nt\na\nt\ni\nc\n\nr\ne\ns\no\nu\nr\nc\ne\ns\n\n/\n\nT\nh\ny\nm\ne\nl\ne\na\nf\n\n/\n\nC\nO\nR\nS\n\n[\n\n]\n\nJ\nA\nR\n\n/\n\nW\nA\nR\n\n[\n\n]\n\nD\no\nc\nk\ne\nr\n\n[\n\n]\n\nC\nl\no\nu\nd\n\nd\ne\np\nl\no\ny\nm\ne\nn\nt\n\n[\n\n]\n\nC\nI\n/\nC\nD\n\n[\n\n]\n\nS\np\nr\ni\nn\ng\n\nC\nl\no\nu\nd\n\n[\n\n]\n\nE\nu\nr\ne\nk\na\n\n[\n\n]\n\nG\na\nt\ne\nw\na\ny\n\n[\n\n]\n\nC\ni\nr\nc\nu\ni\nt\n\nb\nr\ne\na\nk\ne\nr\n\n[\n\n]\n\nC\no\nn\nf\ni\ng\n\nS\ne\nr\nv\ne\nr\n\n[\n\n]\n\nA\np\np\nl\ni\nc\na\nt\ni\no\nn\n\ne\nv\ne\nn\nt\ns\n\n[\n\n]\n\nC\nu\ns\nt\no\nm\n\ns\nt\na\nr\nt\ne\nr\ns",
          },
          {
            title: "Practice",
            content: "Pick each item and explain it aloud without reading the definition. If you cannot explain the purpose, high-level behavior, example, and trade-off, revisit that topic.",
          },
        ],
      },
      {
        title: "Interview Answer Pattern",
        slug: "interview-answer-pattern",
        description: "Use a repeatable structure to give clear, complete answers to Spring Boot interview questions.",
        estimatedMinutes: 10,
        sections: [
          {
            title: "Concept",
            content: "A strong technical answer moves from definition to purpose, behavior, example, use case, trade-off, and comparison.",
          },
          {
            title: "Detailed explanation",
            content: "W\nh\ne\nn\n\na\ns\nk\ne\nd\n\na\nb\no\nu\nt\n\na\n\nS\np\nr\ni\nn\ng\n\nB\no\no\nt\n\nf\ne\na\nt\nu\nr\ne\n,\n\na\nn\ns\nw\ne\nr\n\ni\nn\n\nt\nh\ni\ns\n\no\nr\nd\ne\nr\n:\n\n1\n.\n\nD\ne\nf\ni\nn\ni\nt\ni\no\nn\n\ni\nn\n\no\nn\ne\n\ns\ne\nn\nt\ne\nn\nc\ne\n.\n\n2\n.\n\nW\nh\ny\n\ni\nt\n\ne\nx\ni\ns\nt\ns\n.\n\n3\n.\n\nH\no\nw\n\ni\nt\n\nw\no\nr\nk\ns\n\na\nt\n\na\n\nh\ni\ng\nh\n\nl\ne\nv\ne\nl\n.\n\n4\n.\n\nS\nm\na\nl\nl\n\nc\no\nd\ne\n\ne\nx\na\nm\np\nl\ne\n.\n\n5\n.\n\nR\ne\na\nl\nw\no\nr\nl\nd\n\nu\ns\ne\n\nc\na\ns\ne\n.\n\n6\n.\n\nI\nm\np\no\nr\nt\na\nn\nt\n\nt\nr\na\nd\ne\no\nf\nf\n\no\nr\n\nc\no\nm\nm\no\nn\n\nm\ni\ns\nt\na\nk\ne\n.\n\n7\n.\n\nR\ne\nl\na\nt\ne\nd\n\ni\nn\nt\ne\nr\nv\ni\ne\nw\n\nc\no\nm\np\na\nr\ni\ns\no\nn\n.\n\nE\nx\na\nm\np\nl\ne\n:\n\n“\nW\nh\na\nt\n\ni\ns\n\n@\nT\nr\na\nn\ns\na\nc\nt\ni\no\nn\na\nl\n?\n”\n\nO\nn\ne\n\ns\ne\nn\nt\ne\nn\nc\ne\n:\n\nI\nt\n\nd\ne\nf\ni\nn\ne\ns\n\na\n\nt\nr\na\nn\ns\na\nc\nt\ni\no\nn\n\nb\no\nu\nn\nd\na\nr\ny\n\na\nr\no\nu\nn\nd\n\na\n\nm\ne\nt\nh\no\nd\n\no\nr\n\no\np\ne\nr\na\nt\ni\no\nn\n.\n\nW\nh\ny\n:\n\nT\no\n\nk\ne\ne\np\n\nr\ne\nl\na\nt\ne\nd\n\nd\na\nt\na\nb\na\ns\ne\n\no\np\ne\nr\na\nt\ni\no\nn\ns\n\nc\no\nn\ns\ni\ns\nt\ne\nn\nt\n.\n\nH\no\nw\n:\n\nS\np\nr\ni\nn\ng\n\nm\na\nn\na\ng\ne\ns\n\nt\nh\ne\n\nt\nr\na\nn\ns\na\nc\nt\ni\no\nn\n\na\nr\no\nu\nn\nd\n\nt\nh\ne\n\nm\ne\nt\nh\no\nd\n\ni\nn\nv\no\nc\na\nt\ni\no\nn\n.\n\nE\nx\na\nm\np\nl\ne\n:\n\nA\n\nt\nr\na\nn\ns\nf\ne\nr\n\nu\np\nd\na\nt\ne\ns\n\nt\nw\no\n\na\nc\nc\no\nu\nn\nt\ns\n\ni\nn\ns\ni\nd\ne\n\no\nn\ne\n\nt\nr\na\nn\ns\na\nc\nt\ni\no\nn\n.\n\nU\ns\ne\n\nc\na\ns\ne\n:\n\nF\ni\nn\na\nn\nc\ni\na\nl\n\nt\nr\na\nn\ns\nf\ne\nr\n,\n\no\nr\nd\ne\nr\n\nc\nr\ne\na\nt\ni\no\nn\n,\n\ni\nn\nv\ne\nn\nt\no\nr\ny\n\nu\np\nd\na\nt\ne\ns\n.\n\nT\nr\na\nd\ne\no\nf\nf\n:\n\nL\no\nn\ng\nr\nu\nn\nn\ni\nn\ng\n\nt\nr\na\nn\ns\na\nc\nt\ni\no\nn\ns\n\nc\na\nn\n\nh\no\nl\nd\n\nd\na\nt\na\nb\na\ns\ne\n\nr\ne\ns\no\nu\nr\nc\ne\ns\n\nf\no\nr\n\nt\no\no\n\nl\no\nn\ng\n.\n\nC\no\nm\np\na\nr\ni\ns\no\nn\n:\n\n@\nT\nr\na\nn\ns\na\nc\nt\ni\no\nn\na\nl\n\nv\ns\n\nm\na\nn\nu\na\nl\nl\ny\n\nc\no\nn\nt\nr\no\nl\nl\ni\nn\ng\n\nt\nr\na\nn\ns\na\nc\nt\ni\no\nn\n\nb\no\nu\nn\nd\na\nr\ni\ne\ns\n.\n\nT\nh\ni\ns\n\na\nn\ns\nw\ne\nr\n\ns\nt\nr\nu\nc\nt\nu\nr\ne\n\nd\ne\nm\no\nn\ns\nt\nr\na\nt\ne\ns\n\nu\nn\nd\ne\nr\ns\nt\na\nn\nd\ni\nn\ng\n\ni\nn\ns\nt\ne\na\nd\n\no\nf\n\nm\ne\nm\no\nr\ni\nz\na\nt\ni\no\nn\n.",
          },
          {
            title: "Practice",
            content: "Use the same seven-step pattern for annotations, configuration, data access, security, testing, and infrastructure questions.",
          },
        ],
      },
    ],
  },
];

const springBootCategory: CategorySeed = {
  name: "Spring Boot",
  slug: "spring-boot",
  description: "A practical Spring Boot learning path covering core concepts, web development, data access, security, testing, operations, deployment, and advanced application patterns.",
  icon: "SPRING",
  sortOrder: 0,
  paths: [
    {
      name: "Spring Boot",
      slug: "spring-boot",
      description: "Learn Spring Boot from fundamentals through advanced application patterns.",
      level: StudyLevel.INTERMEDIATE,
      modules,
    },
  ],
};

async function ensureCategory(categorySeed: CategorySeed) {
  const category = await prisma.studyCategory.upsert({
    where: { name: categorySeed.name },
    update: {
      name: categorySeed.name, slug: categorySeed.slug, description: categorySeed.description, icon: categorySeed.icon, isPublished: true, sortOrder: categorySeed.sortOrder,
    },
    create: {
      name: categorySeed.name, slug: categorySeed.slug, description: categorySeed.description, icon: categorySeed.icon, isPublished: true, sortOrder: categorySeed.sortOrder,
    },
  });

  for (let pathIndex = 0; pathIndex < categorySeed.paths.length; pathIndex += 1) {
    const pathSeed = categorySeed.paths[pathIndex];
    const path = await prisma.studyPath.upsert({
      where: { categoryId_level: { categoryId: category.id, level: pathSeed.level } },
      update: { name: pathSeed.name, slug: pathSeed.slug, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: pathIndex },
      create: { categoryId: category.id, name: pathSeed.name, slug: pathSeed.slug, description: pathSeed.description, level: pathSeed.level, isPublished: true, sortOrder: pathIndex },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex += 1) {
      const moduleSeed = pathSeed.modules[moduleIndex];
      const studyModule = await prisma.studyModule.upsert({
        where: { studyPathId_slug: { studyPathId: path.id, slug: moduleSeed.slug } },
        update: { title: moduleSeed.title, description: moduleSeed.description, sortOrder: moduleIndex, isPublished: true },
        create: { studyPathId: path.id, title: moduleSeed.title, slug: moduleSeed.slug, description: moduleSeed.description, sortOrder: moduleIndex, isPublished: true },
      });

      for (let topicIndex = 0; topicIndex < moduleSeed.topics.length; topicIndex += 1) {
        const topicSeed = moduleSeed.topics[topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;
        const topic = await prisma.studyTopic.upsert({
          where: { categoryId_slug: { categoryId: category.id, slug: topicSlug } },
          update: { title: topicSeed.title, moduleId: studyModule.id, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: topicIndex },
          create: { categoryId: category.id, moduleId: studyModule.id, title: topicSeed.title, slug: topicSlug, seoDescription: topicSeed.description, estimatedMinutes: topicSeed.estimatedMinutes, isPublished: true, sortOrder: topicIndex, prerequisiteIds: [], relatedTopicIds: [] },
        });

        for (let sectionIndex = 0; sectionIndex < topicSeed.sections.length; sectionIndex += 1) {
          const section = topicSeed.sections[sectionIndex];
          await prisma.studyTopicSection.upsert({
            where: { id: `${topic.id}-section-${sectionIndex}` },
            update: { title: section.title, content: section.content, sortOrder: sectionIndex },
            create: { id: `${topic.id}-section-${sectionIndex}`, topicId: topic.id, title: section.title, content: section.content, sortOrder: sectionIndex },
          });
        }
      }
    }

    if (pathSeed.modules.length === 0) {
      console.log(`No modules configured for ${pathSeed.name}`);
    }
  }

  return category;
}

async function main() {
  const category = await ensureCategory(springBootCategory);
  const pathCount = springBootCategory.paths.length;
  const moduleCount = modules.length;
  const topicCount = modules.reduce((total, module) => total + module.topics.length, 0);
  const sectionCount = modules.reduce((total, module) => total + module.topics.reduce((moduleTotal, topic) => moduleTotal + topic.sections.length, 0), 0);
  console.log(`Seeded ${category.name}`);
  console.log(`Paths: ${pathCount}, modules: ${moduleCount}, topics: ${topicCount}, sections: ${sectionCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
