import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type SectionSeed = { title: string; content: string };
type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections: SectionSeed[];
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
type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  paths: PathSeed[];
};

const modules: ModuleSeed[] = [
    {
      title: "Introduction To Microservices",
      slug: "1-introduction-to-microservices",
      description: "Introduction To Microservices explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "What Is Microservices Architecture?",
          slug: "1-1-what-is-microservices-architecture",
          description: "Microservices architecture is an application design approach in which a large application is divided into multiple independently deployable services. Each service owns a...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservices architecture is an application design approach in which a large application is divided into multiple independently deployable services. Each service owns a clearly defined business capability and communicates with other services through explicit interfaces.\n\nThe important idea is not simply \"make services small.\" The real goal is to create boundaries that allow teams to understand, develop, deploy, scale, and evolve parts of a system independently.\n\nA useful mental model is:\n\n```text\nClient\n   |\n   v\n```\n  API Gateway\n```text\n     |\n+----+-----------------------------+\n|          |          |            |\n```\n  v          v          v            v\nCustomer   Order      Payment     Notification\nService    Service     Service       Service\n```text\n|          |           |             |\n```\n DB         DB          DB            DB\n\nEach service can contain its own business logic, integration adapters, and persistence mechanism. The service exposes an API or participates in asynchronous messaging.\n\nA microservice should normally represent a meaningful business responsibility rather than an arbitrary technical layer.\n\nExamples of useful boundaries include:\n\n- Customer management\n- Product catalog\n- Order management\n- Payment processing\n- Inventory\n- Shipping\n- Notification\n- Trip management\n- Driver management\n\nThe boundary should be driven by business responsibility, ownership, change patterns, and data ownership.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **What Is Microservices Architecture?**:\n\n```text\nClient\n   |\n   v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **What Is Microservices Architecture?** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Monolithic Architecture",
          slug: "1-2-monolithic-architecture",
          description: "A monolithic application may still be logically modular internally. It can contain modules for customers, orders, billing, notifications, payments, and other capabilities.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A monolithic application may still be logically modular internally. It can contain modules for customers, orders, billing, notifications, payments, and other capabilities. The important difference is that these modules are packaged and deployed as one application.\n\nFor a Java application, the deployment unit might be a JAR or WAR. Other platforms use their own packaging mechanisms.\n\nA monolith has several attractive properties during the early stages of development:\n\n- One deployment unit\n- Simple local development\n- Straightforward debugging\n- Easy end-to-end testing\n- Simple communication between modules\n- One database can make transactions and queries convenient\n- Few operational components are required\n\nA small application can therefore be very successful as a monolith.\n\nThe problem appears when the application continuously grows.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Monolithic Architecture**. A monolithic application may still be logically modular internally. It can contain modules for customers, orders, billing, notifications, payments, and other capabilities. The important difference is that these modules are packaged and deployed as one application.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Why a Monolith Can Become Difficult",
          slug: "1-3-why-a-monolith-can-become-difficult",
          description: "As features accumulate, the codebase becomes harder to understand. Developers may need knowledge of many modules before making a seemingly local change.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "As features accumulate, the codebase becomes harder to understand. Developers may need knowledge of many modules before making a seemingly local change.\n\nTypical consequences include:\n\n- Longer development cycles\n- More difficult debugging\n- Larger regression risk\n- Longer build and startup times\n- More difficult deployments\n- Difficulty scaling individual capabilities\n- Difficulty adopting new technologies\n- Greater coordination between teams\n\nA change to one module can require rebuilding and redeploying the complete application.\n\nSuppose image processing consumes significant CPU while customer management mainly needs memory. With one deployment unit, both capabilities may have to run on the same infrastructure profile. You cannot independently scale the image processing capability without also scaling unrelated functionality.\n\nReliability can also become coupled. A memory leak in one module can consume resources belonging to the complete application process.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why a Monolith Can Become Difficult**. As features accumulate, the codebase becomes harder to understand. Developers may need knowledge of many modules before making a seemingly local change. Typical consequences include: Longer development cycles More difficult debugging Larger regression risk Longer build and startup times More difficult deployments Difficulty scaling individual capabilities Difficulty adopting new technologies Greater coordination between teams A change to one module can require rebuilding and redeploying the complete application.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Monolithic Hell",
          slug: "1-4-monolithic-hell",
          description: "The term \"monolithic hell\" describes the situation where a once-manageable application becomes so large and interconnected that development and deployment become painful....",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The term \"monolithic hell\" describes the situation where a once-manageable application becomes so large and interconnected that development and deployment become painful.\n\nCommon symptoms are:\n\n- Nobody understands the complete system\n- Small changes have unpredictable side effects\n- Releases require extensive coordination\n- Deployment takes too long\n- Testing becomes increasingly expensive\n- Teams are blocked by unrelated changes\n- Old technology choices become difficult to replace\n- Scaling is performed for the whole application instead of individual capabilities\n\nThe important lesson is that the problem is not that monoliths are inherently bad. The problem is allowing a growing system to become tightly coupled and difficult to evolve.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Monolithic Hell**. The term \"monolithic hell\" describes the situation where a once-manageable application becomes so large and interconnected that development and deployment become painful. Common symptoms are: Nobody understands the complete system Small changes have unpredictable side effects Releases require extensive coordination Deployment takes too long Testing becomes increasingly expensive Teams are blocked by unrelated changes Old technology choices become difficult to replace Scaling is performed for the whole application instead of individual capabilities The important lesson is that the problem is not that monoliths are inherently bad. The problem is allowing a growing system to become tightly coupled and difficult to evolve.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Microservices as a Complexity Management Strategy",
          slug: "1-5-microservices-as-a-complexity-management-strategy",
          description: "Microservices attack complexity by decomposing the application into manageable services. The total business functionality does not disappear.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservices attack complexity by decomposing the application into manageable services.\n\nThe total business functionality does not disappear. Instead, it is divided into boundaries.\n\nFor example:\n\n```text\nLarge Application\n    |\n    +-- Customer Management\n    +-- Driver Management\n    +-- Trip Management\n    +-- Billing\n    +-- Payments\n    +-- Notifications\n```\nEach capability becomes a separate service.\n\nThe result is a distributed system rather than a single process.\n\nThis introduces new complexity:\n\n- Network communication\n- Service discovery\n- Partial failures\n- Distributed data\n- Deployment coordination\n- Monitoring\n- API compatibility\n- Operational automation\n\nTherefore, microservices trade one kind of complexity for another. They are most useful when the benefits of independent evolution and scaling outweigh the additional distributed-system complexity.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Microservices as a Complexity Management Strategy**:\n\n```text\nLarge Application\n    |\n    +-- Customer Management\n    +-- Driver Management\n    +-- Trip Management\n    +-- Billing\n    +-- Payments\n    +-- Notifications\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Microservices as a Complexity Management Strategy** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Service Boundaries",
          slug: "1-6-service-boundaries",
          description: "A good service boundary should isolate a coherent business capability. A useful boundary normally has: A clear responsibility A clear owner Its own business rules A...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A good service boundary should isolate a coherent business capability.\n\nA useful boundary normally has:\n\n- A clear responsibility\n- A clear owner\n- Its own business rules\n- A well-defined API\n- Controlled access to its data\n- A manageable rate of change\n- A meaningful deployment boundary\n\nAvoid creating services solely because a class or database table exists.\n\nFor example, creating separate services for CustomerNameService, CustomerAddressService, and CustomerPhoneService may produce excessive network communication and operational overhead.\n\nA better boundary might be Customer Management if those capabilities normally change and operate together.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Service Boundaries**. A good service boundary should isolate a coherent business capability. A useful boundary normally has: A clear responsibility A clear owner Its own business rules A well-defined API Controlled access to its data A manageable rate of change A meaningful deployment boundary Avoid creating services solely because a class or database table exists. For example, creating separate services for CustomerNameService, CustomerAddressService, and CustomerPhoneService may produce excessive network communication and operational overhead.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Service Boundaries** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Each Service as a Mini-Application",
          slug: "1-7-each-service-as-a-mini-application",
          description: "A service can have its own internal architecture. For example: The service may also contain adapters for external systems, messaging brokers, payment providers, email systems,...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A service can have its own internal architecture.\n\nFor example:\n\n```text\nREST / Messaging API\n        |\n        v\nApplication / Domain Logic\n        |\n        v\nPersistence Adapter\n        |\n        v\n   Service Database\n```\nThe service may also contain adapters for external systems, messaging brokers, payment providers, email systems, or other infrastructure.\n\nThis keeps implementation details behind the service boundary.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Each Service as a Mini-Application**:\n\n```text\nREST / Messaging API\n        |\n        v\nApplication / Domain Logic\n        |\n        v\nPersistence Adapter\n        |\n        v\n   Service Database\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Each Service as a Mini-Application** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Independent Deployment",
          slug: "1-8-independent-deployment",
          description: "One of the strongest benefits is independent deployment. If the Order Service changes but the Customer Service does not, the Order Service can be built, tested, and deployed...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "One of the strongest benefits is independent deployment.\n\nIf the Order Service changes but the Customer Service does not, the Order Service can be built, tested, and deployed without redeploying the Customer Service.\n\nThis enables:\n\n- Smaller releases\n- Faster feedback\n- Reduced deployment coordination\n- Safer incremental changes\n- Continuous delivery\n- Team autonomy\n\nIndependent deployment only works when service contracts are designed for compatibility.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Independent Deployment**. One of the strongest benefits is independent deployment. If the Order Service changes but the Customer Service does not, the Order Service can be built, tested, and deployed without redeploying the Customer Service. This enables: Smaller releases Faster feedback Reduced deployment coordination Safer incremental changes Continuous delivery Team autonomy Independent deployment only works when service contracts are designed for compatibility.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Independent Deployment** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Independent Scaling",
          slug: "1-9-independent-scaling",
          description: "Services can be scaled according to their own demand. For example: If Order processing receives a traffic spike, additional Order instances can be started without duplicating...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Services can be scaled according to their own demand.\n\nFor example:\n\n```text\nCatalog:       3 instances\nOrder:         8 instances\nPayment:       4 instances\nNotification: 2 instances\n```\nIf Order processing receives a traffic spike, additional Order instances can be started without duplicating unrelated services.\n\nThis can also allow different infrastructure profiles for different services.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Independent Scaling**:\n\n```text\nCatalog:       3 instances\nOrder:         8 instances\nPayment:       4 instances\nNotification: 2 instances\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Independent Scaling** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "The Scale Cube",
          slug: "1-10-the-scale-cube",
          description: "The Scale Cube describes three dimensions of scaling: X-axis — horizontal duplication Y-axis — functional decomposition Z-axis — data partitioning Microservices primarily...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The Scale Cube describes three dimensions of scaling:\n\nX-axis — horizontal duplication\n```text\nRun multiple identical copies of a service or application.\n```\nY-axis — functional decomposition\n```text\nSplit the application according to business capabilities.\n```\nZ-axis — data partitioning\n```text\nRoute or partition data based on a meaningful attribute such as customer identity or another key.\n```\nMicroservices primarily correspond to Y-axis scaling.\n\nX-axis scaling example:\n\n```text\nLoad Balancer\n  /   |   \\\n```\n   App1 App2 App3\n\nY-axis scaling example:\n\n```text\n Gateway\n   |\n+--+---------+\n|    |       |\n```\n Order Catalog Payment\n\nZ-axis scaling example:\n\n```text\n Customer ID\n    |\n+---+---+\n|       |\n```\nShard A  Shard B\n\nReal systems can combine these approaches.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **The Scale Cube**:\n\n```text\nRun multiple identical copies of a service or application.\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **The Scale Cube** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Database per Service",
          slug: "1-11-database-per-service",
          description: "A core microservices principle is that each service owns its data. Instead of: prefer: The data is private to the owning service and should normally be accessed through its API...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A core microservices principle is that each service owns its data.\n\nInstead of:\n\n```text\nAll Services -> One Shared Database\n```\nprefer:\n\n```text\nOrder Service    -> Order Database\nCustomer Service -> Customer Database\nPayment Service  -> Payment Database\n```\nThe data is private to the owning service and should normally be accessed through its API or events.\n\nThis creates loose coupling.\n\nIf every service directly queries another service's tables, the services become coupled to the database schema and independent deployment becomes much harder.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Database per Service**:\n\n```text\nAll Services -> One Shared Database\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Database per Service** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Polyglot Persistence",
          slug: "1-12-polyglot-persistence",
          description: "Different services may use different storage technologies. Examples: Relational database for transactional orders Search engine for full- search Graph database for...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Different services may use different storage technologies.\n\nExamples:\n\n- Relational database for transactional orders\n- Search engine for full- search\n- Graph database for relationship-heavy data\n- Document database for flexible documents\n- Key-value store for fast lookups\n\nThis is called polyglot persistence.\n\nThe benefit is that each service can choose storage according to its workload.\n\nThe cost is operational complexity: the organization must understand and manage multiple technologies.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Polyglot Persistence**. Different services may use different storage technologies. Examples: Relational database for transactional orders Search engine for full- search Graph database for relationship-heavy data Document database for flexible documents Key-value store for fast lookups This is called polyglot persistence. The benefit is that each service can choose storage according to its workload.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Polyglot Persistence** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Microservices and Service-Oriented Architecture",
          slug: "1-13-microservices-and-service-oriented-architecture",
          description: "Microservices and SOA share the idea of composing applications from services. The approach described here emphasizes: Smaller autonomous services Lightweight communication...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservices and SOA share the idea of composing applications from services.\n\nThe approach described here emphasizes:\n\n- Smaller autonomous services\n- Lightweight communication\n- Strong service ownership\n- Independent deployment\n- Service-specific data\n- Avoiding unnecessary centralized infrastructure\n\nThe important distinction is architectural discipline, not simply the name used for the style.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Microservices and Service-Oriented Architecture**. Microservices and SOA share the idea of composing applications from services. The approach described here emphasizes: Smaller autonomous services Lightweight communication Strong service ownership Independent deployment Service-specific data Avoiding unnecessary centralized infrastructure The important distinction is architectural discipline, not simply the name used for the style.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Microservices and Service-Oriented Architecture** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Benefits of Microservices",
          slug: "1-14-benefits-of-microservices",
          description: "Major benefits include: Complexity management Large systems are divided into understandable units. Team autonomy Teams can focus on individual services.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Major benefits include:\n\n1. Complexity management\n   Large systems are divided into understandable units.\n\n2. Team autonomy\n   Teams can focus on individual services.\n\n3. Independent deployment\n   Services can be released independently.\n\n4. Independent scaling\n   High-demand services can be scaled separately.\n\n5. Technology flexibility\n   Different services can use suitable implementation technologies.\n\n6. Better fault isolation\n   Failure in one service does not automatically require every service to stop.\n\n7. Easier modernization\n   A service can be replaced or rewritten independently.\n\n8. Organizational alignment\n   Service ownership can match team ownership.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Benefits of Microservices**. Major benefits include: Complexity management Large systems are divided into understandable units. Team autonomy Teams can focus on individual services. Independent deployment Services can be released independently.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Benefits of Microservices** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Drawbacks of Microservices",
          slug: "1-15-drawbacks-of-microservices",
          description: "Microservices introduce significant challenges: Distributed-system complexity Network latency Partial failures Service discovery Distributed tracing and monitoring Data...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservices introduce significant challenges:\n\n- Distributed-system complexity\n- Network latency\n- Partial failures\n- Service discovery\n- Distributed tracing and monitoring\n- Data consistency\n- More deployments\n- More runtime instances\n- More infrastructure\n- API compatibility management\n- More complex integration testing\n- Coordinating changes across services\n\nA service that is too small can be worse than a larger service because the communication and operational overhead becomes disproportionate.\n\nThe objective is not minimum code size. The objective is useful independence.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Drawbacks of Microservices**. Microservices introduce significant challenges: Distributed-system complexity Network latency Partial failures Service discovery Distributed tracing and monitoring Data consistency More deployments More runtime instances More infrastructure API compatibility management More complex integration testing Coordinating changes across services A service that is too small can be worse than a larger service because the communication and operational overhead becomes disproportionate. The objective is not minimum code size. The objective is useful independence.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Drawbacks of Microservices** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "When Microservices Make Sense",
          slug: "1-16-when-microservices-make-sense",
          description: "Microservices are particularly attractive when: The application is large and evolving Different capabilities have different scaling needs Multiple teams need independent...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservices are particularly attractive when:\n\n- The application is large and evolving\n- Different capabilities have different scaling needs\n- Multiple teams need independent ownership\n- Frequent independent releases are important\n- Different capabilities have different technology requirements\n- The organization can operate distributed systems\n\nThey may be unnecessary for a small application with a small team and limited deployment complexity.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When Microservices Make Sense**. Microservices are particularly attractive when: The application is large and evolving Different capabilities have different scaling needs Multiple teams need independent ownership Frequent independent releases are important Different capabilities have different technology requirements The organization can operate distributed systems They may be unnecessary for a small application with a small team and limited deployment complexity.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **When Microservices Make Sense** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Reverse Proxy and Load Balancer Role",
          slug: "1-17-reverse-proxy-and-load-balancer-role",
          description: "A reverse proxy can sit in front of services and provide common infrastructure capabilities. Typical responsibilities include: Routing Load balancing TLS termination Access...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A reverse proxy can sit in front of services and provide common infrastructure capabilities.\n\nTypical responsibilities include:\n\n- Routing\n- Load balancing\n- TLS termination\n- Access control\n- Caching\n- Health checks\n- Monitoring\n- Traffic management\n\nThis allows application services to concentrate on business responsibilities.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Reverse Proxy and Load Balancer Role**. A reverse proxy can sit in front of services and provide common infrastructure capabilities. Typical responsibilities include: Routing Load balancing TLS termination Access control Caching Health checks Monitoring Traffic management This allows application services to concentrate on business responsibilities.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Reverse Proxy and Load Balancer Role** when deciding how a service should be structured or integrated with the rest of the system.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
      ],
    },
    {
      title: "Api Gateway",
      slug: "2-api-gateway",
      description: "Api Gateway explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Why Clients Have a Problem in Microservices",
          slug: "2-1-why-clients-have-a-problem-in-microservices",
          description: "A monolithic application often exposes one broad API. A microservices application may expose many fine-grained APIs.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A monolithic application often exposes one broad API.\n\nA microservices application may expose many fine-grained APIs.\n\nImagine a product page requiring:\n\n- Product information\n- Cart count\n- Order history\n- Reviews\n- Inventory\n- Shipping\n- Recommendations\n\nIf the mobile application calls seven services directly, it must understand seven endpoints and manage seven network interactions.\n\nThat creates unnecessary client complexity.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why Clients Have a Problem in Microservices**. A monolithic application often exposes one broad API. A microservices application may expose many fine-grained APIs. Imagine a product page requiring: Product information Cart count Order history Reviews Inventory Shipping Recommendations If the mobile application calls seven services directly, it must understand seven endpoints and manage seven network interactions.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Clients Have a Problem in Microservices** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Direct Client-to-Service Communication",
          slug: "2-2-direct-client-to-service-communication",
          description: "In direct communication: Problems include: Many network round trips Client knowledge of internal architecture More complicated client error handling Exposure of internal...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "In direct communication:\n\n```text\nClient\n  |----> Product Service\n  |----> Review Service\n  |----> Order Service\n  |----> Inventory Service\n  |----> Shipping Service\n```\nProblems include:\n\n- Many network round trips\n- Client knowledge of internal architecture\n- More complicated client error handling\n- Exposure of internal protocols\n- Difficulty changing service boundaries\n- Increased dependency on service locations\n\nA future refactoring from seven services to five can force client changes.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Direct Client-to-Service Communication**:\n\n```text\nClient\n  |----> Product Service\n  |----> Review Service\n  |----> Order Service\n  |----> Inventory Service\n  |----> Shipping Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Direct Client-to-Service Communication** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "API Gateway Pattern",
          slug: "2-3-api-gateway-pattern",
          description: "An API Gateway provides a single entry point. Product Review Order Service Service Service The gateway hides internal topology.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "An API Gateway provides a single entry point.\n\n```text\nMobile/Web Client\n        |\n        v\n   API Gateway\n   /   |   \\\n  v    v    v\n```\n Product Review Order\n Service Service Service\n\nThe gateway hides internal topology.\n\nIt can:\n\n- Route requests\n- Aggregate responses\n- Translate protocols\n- Authenticate requests\n- Authorize access\n- Apply rate limits\n- Cache responses\n- Monitor traffic\n- Shape requests\n- Provide client-specific APIs",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **API Gateway Pattern**:\n\n```text\nMobile/Web Client\n        |\n        v\n   API Gateway\n   /   |   \\\n  v    v    v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **API Gateway Pattern** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "API Composition",
          slug: "2-4-api-composition",
          description: "Suppose a client requests: The gateway may internally perform: It then combines their responses into one response. This reduces client-side round trips.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Suppose a client requests:\n\n```text\nGET /product-details?id=100\n```\nThe gateway may internally perform:\n\n```text\nProduct Service\nReview Service\nInventory Service\nRecommendation Service\nShipping Service\n```\nIt then combines their responses into one response.\n\nThis reduces client-side round trips.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **API Composition**:\n\n```text\nGET /product-details?id=100\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **API Composition** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Client-Specific APIs",
          slug: "2-5-client-specific-apis",
          description: "Different clients have different requirements. A mobile client may need a compact response.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Different clients have different requirements.\n\nA mobile client may need a compact response.\n\nA desktop web application may need richer information.\n\nAn IoT device may need only a small subset.\n\nThe gateway can expose APIs optimized for each client without forcing backend services to understand every client type.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Client-Specific APIs**. Different clients have different requirements. A mobile client may need a compact response. A desktop web application may need richer information.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Client-Specific APIs** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Benefits of an API Gateway",
          slug: "2-6-benefits-of-an-api-gateway",
          description: "Benefits include: Hides internal architecture Simplifies clients Reduces network round trips Centralizes cross-cutting concerns Supports protocol translation Supports response...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Benefits include:\n\n- Hides internal architecture\n- Simplifies clients\n- Reduces network round trips\n- Centralizes cross-cutting concerns\n- Supports protocol translation\n- Supports response composition\n- Makes backend refactoring easier",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Benefits of an API Gateway**. Benefits include: Hides internal architecture Simplifies clients Reduces network round trips Centralizes cross-cutting concerns Supports protocol translation Supports response composition Makes backend refactoring easier\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Benefits of an API Gateway** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "API Gateway Drawbacks",
          slug: "2-7-api-gateway-drawbacks",
          description: "The gateway is another critical component. Problems can include: It must be highly available It can become a bottleneck Poorly designed aggregation can increase latency Too...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The gateway is another critical component.\n\nProblems can include:\n\n- It must be highly available\n- It can become a bottleneck\n- Poorly designed aggregation can increase latency\n- Too much business logic can accumulate there\n- Every backend API change may require gateway changes\n\nA gateway should coordinate access rather than become a giant replacement for backend services.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **API Gateway Drawbacks**. The gateway is another critical component. Problems can include: It must be highly available It can become a bottleneck Poorly designed aggregation can increase latency Too much business logic can accumulate there Every backend API change may require gateway changes A gateway should coordinate access rather than become a giant replacement for backend services.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **API Gateway Drawbacks** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Gateway Performance",
          slug: "2-8-gateway-performance",
          description: "An API gateway may process a large amount of traffic, so efficient I/O is important. For independent backend calls, the gateway should issue calls concurrently where appropriate.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "An API gateway may process a large amount of traffic, so efficient I/O is important.\n\nFor independent backend calls, the gateway should issue calls concurrently where appropriate.\n\nSequential processing:\n\n```text\nA -> B -> C -> D\n```\ncan create unnecessary latency.\n\nConcurrent processing:\n\n```text\nA -> B\nA -> C\nA -> D\n```\ncan reduce overall waiting time when calls are independent.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Gateway Performance**:\n\n```text\nA -> B -> C -> D\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Reactive Programming for Aggregation",
          slug: "2-9-reactive-programming-for-aggregation",
          description: "Traditional nested callbacks can become difficult to understand. Reactive programming or future/promise abstractions allow asynchronous operations to be composed more...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Traditional nested callbacks can become difficult to understand.\n\nReactive programming or future/promise abstractions allow asynchronous operations to be composed more declaratively.\n\nUseful abstractions include:\n\n- Futures\n- CompletableFuture\n- Promises\n- Reactive streams\n\nThe key principle is to avoid blocking threads while waiting for independent remote operations.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Reactive Programming for Aggregation**. Traditional nested callbacks can become difficult to understand. Reactive programming or future/promise abstractions allow asynchronous operations to be composed more declaratively. Useful abstractions include: Futures CompletableFuture Promises Reactive streams The key principle is to avoid blocking threads while waiting for independent remote operations.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Service Invocation from the Gateway",
          slug: "2-10-service-invocation-from-the-gateway",
          description: "The gateway may communicate with services through: HTTP/REST RPC Messaging Different backend services can use different communication mechanisms. The gateway therefore needs an...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The gateway may communicate with services through:\n\n- HTTP/REST\n- RPC\n- Messaging\n\nDifferent backend services can use different communication mechanisms.\n\nThe gateway therefore needs an intentional strategy for each type.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Service Invocation from the Gateway**. The gateway may communicate with services through: HTTP/REST RPC Messaging Different backend services can use different communication mechanisms. The gateway therefore needs an intentional strategy for each type.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Service Invocation from the Gateway** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Service Discovery in the Gateway",
          slug: "2-11-service-discovery-in-the-gateway",
          description: "A gateway should not normally depend on permanently hard-coded service instance addresses. Service instances may change because of: Scaling Failure Deployment Infrastructure...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A gateway should not normally depend on permanently hard-coded service instance addresses.\n\nService instances may change because of:\n\n- Scaling\n- Failure\n- Deployment\n- Infrastructure changes\n\nThe gateway can use service discovery to find currently available instances.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Service Discovery in the Gateway**. A gateway should not normally depend on permanently hard-coded service instance addresses. Service instances may change because of: Scaling Failure Deployment Infrastructure changes The gateway can use service discovery to find currently available instances.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Service Discovery in the Gateway** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Partial Failure at the Gateway",
          slug: "2-12-partial-failure-at-the-gateway",
          description: "Suppose a product page depends on five services and one recommendation service fails. Not every failure should make the entire response unusable.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Suppose a product page depends on five services and one recommendation service fails.\n\nNot every failure should make the entire response unusable.\n\n**Possible strategy**\n\n```text\nProduct information -> required\nPrice              -> required\nInventory          -> required\nRecommendations    -> optional\n```\nIf recommendations fail, return the product without recommendations.\n\nIf the product service fails, return an error because the primary function cannot be completed.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Partial Failure at the Gateway**:\n\n```text\nProduct information -> required\nPrice              -> required\nInventory          -> required\nRecommendations    -> optional\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Partial Failure at the Gateway** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Timeouts",
          slug: "2-13-timeouts",
          description: "Every remote request should have a finite timeout. Without a timeout: Enough blocked operations can consume all available resources.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Every remote request should have a finite timeout.\n\nWithout a timeout:\n\n```text\nGateway -> Service\n          waits forever\n```\nEnough blocked operations can consume all available resources.\n\nWith a timeout:\n\n```text\nGateway -> Service\n          |\n          +-- timeout\n          |\n          +-- fallback / error\n```\nTimeouts should be chosen according to realistic service latency and user requirements.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Timeouts**:\n\n```text\nGateway -> Service\n          waits forever\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Timeouts** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Fallbacks",
          slug: "2-14-fallbacks",
          description: "Fallbacks can include: Cached information Default values Empty optional sections A degraded response A clear error Fallbacks should only be used when returning degraded data is...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Fallbacks can include:\n\n- Cached information\n- Default values\n- Empty optional sections\n- A degraded response\n- A clear error\n\nFallbacks should only be used when returning degraded data is semantically safe.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Fallbacks**. Fallbacks can include: Cached information Default values Empty optional sections A degraded response A clear error Fallbacks should only be used when returning degraded data is semantically safe.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Circuit Breaker",
          slug: "2-15-circuit-breaker",
          description: "A circuit breaker prevents repeated calls to a failing dependency. Typical states: failures HALF-OPEN success failure CLOSED OPEN When failure rate becomes too high, the...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A circuit breaker prevents repeated calls to a failing dependency.\n\nTypical states:\n\n```text\nCLOSED\n  |\n```\n   failures\n```text\n  v\nOPEN\n  |\nwait\n  v\n```\n  HALF-OPEN\n```text\n/     \\\n```\n success  failure\n```text\n|        |\n```\n CLOSED    OPEN\n\nWhen failure rate becomes too high, the circuit opens and calls fail quickly.\n\nAfter a recovery period, limited calls are attempted. If the dependency has recovered, normal operation resumes.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Circuit Breaker**:\n\n```text\nCLOSED\n  |\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Rate and Concurrency Limits",
          slug: "2-16-rate-and-concurrency-limits",
          description: "A client should not create unlimited outstanding requests to a failing dependency. A concurrency limit protects resources and reduces cascading failure.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A client should not create unlimited outstanding requests to a failing dependency.\n\nA concurrency limit protects resources and reduces cascading failure.\n\nFor example:\n\n```text\nMaximum outstanding calls to Inventory = 100\n```\nWhen the limit is reached, new work can fail immediately or be queued according to the design.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Rate and Concurrency Limits**:\n\n```text\nMaximum outstanding calls to Inventory = 100\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
      ],
    },
    {
      title: "Inter-Process Communication",
      slug: "3-inter-process-communication",
      description: "Inter-Process Communication explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Why IPC Is Necessary",
          slug: "3-1-why-ipc-is-necessary",
          description: "Inside a monolith, modules can call each other's methods directly. In microservices, services are separate processes, often running on different machines.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Inside a monolith, modules can call each other's methods directly.\n\nIn microservices, services are separate processes, often running on different machines.\n\nTherefore communication must cross a process or network boundary.\n\nThis introduces:\n\n- Network latency\n- Serialization\n- Connection failures\n- Timeouts\n- Authentication\n- Retries\n- Version compatibility\n\nA remote call is fundamentally different from a local method call.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why IPC Is Necessary**. Inside a monolith, modules can call each other's methods directly. In microservices, services are separate processes, often running on different machines. Therefore communication must cross a process or network boundary.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why IPC Is Necessary** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Interaction Styles",
          slug: "3-2-interaction-styles",
          description: "Service interactions can be classified using two dimensions: Dimension 1: One-to-one One-to-many Dimension 2: Synchronous Asynchronous This creates several useful interaction...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Service interactions can be classified using two dimensions:\n\nDimension 1:\n- One-to-one\n- One-to-many\n\nDimension 2:\n- Synchronous\n- Asynchronous\n\nThis creates several useful interaction patterns.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Interaction Styles**. Service interactions can be classified using two dimensions: Dimension 1: One-to-one One-to-many Dimension 2: Synchronous Asynchronous This creates several useful interaction patterns.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Interaction Styles** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Request/Response",
          slug: "3-3-request-response",
          description: "A client sends a request and waits for a response. **Example** This is common for operations where the caller needs an immediate result.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A client sends a request and waits for a response.\n\n**Example**\n\n```text\nOrder Service\n    |\n    | GET customer\n    v\nCustomer Service\n    |\n    | customer data\n    v\nOrder Service\n```\nThis is common for operations where the caller needs an immediate result.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Request/Response**:\n\n```text\nOrder Service\n    |\n    | GET customer\n    v\nCustomer Service\n    |\n    | customer data\n    v\nOrder Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Request/Response** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Notification",
          slug: "3-4-notification",
          description: "The caller sends a one-way request and does not expect a response. **Example** This is useful when acknowledgement is not part of the business interaction.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The caller sends a one-way request and does not expect a response.\n\n**Example**\n\n```text\nOrder Service\n    |\n    | OrderPlaced\n    v\nNotification Service\n```\nThis is useful when acknowledgement is not part of the business interaction.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Notification**:\n\n```text\nOrder Service\n    |\n    | OrderPlaced\n    v\nNotification Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Notification** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Request/Asynchronous Response",
          slug: "3-5-request-asynchronous-response",
          description: "The client sends a request but receives the response later. This is useful for operations that may take a long time.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The client sends a request but receives the response later.\n\nThis is useful for operations that may take a long time.\n\nThe caller can continue other work while waiting for the eventual response.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Request/Asynchronous Response**. The client sends a request but receives the response later. This is useful for operations that may take a long time. The caller can continue other work while waiting for the eventual response.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Publish/Subscribe",
          slug: "3-6-publish-subscribe",
          description: "One producer publishes an event and multiple interested consumers receive it. Email Audit Analytics The publisher does not need to know every consumer.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "One producer publishes an event and multiple interested consumers receive it.\n\n```text\nOrder Service\n     |\n     v\n  Channel\n  / | \\\n v  v  v\n```\n  Email Audit Analytics\n\nThe publisher does not need to know every consumer.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Publish/Subscribe**:\n\n```text\nOrder Service\n     |\n     v\n  Channel\n  / | \\\n v  v  v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Publish/Asynchronous Responses",
          slug: "3-7-publish-asynchronous-responses",
          description: "A requester publishes a request and multiple interested services may produce responses asynchronously. This is useful when several services contribute independent information.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A requester publishes a request and multiple interested services may produce responses asynchronously.\n\nThis is useful when several services contribute independent information.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Publish/Asynchronous Responses**. A requester publishes a request and multiple interested services may produce responses asynchronously. This is useful when several services contribute independent information.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Publish/Asynchronous Responses** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Combining Interaction Styles",
          slug: "3-8-combining-interaction-styles",
          description: "A real application can combine patterns. **Example** Mobile client sends a trip request.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A real application can combine patterns.\n\n**Example**\n\n1. Mobile client sends a trip request.\n2. Trip service performs request/response to validate the passenger.\n3. Trip service creates the trip.\n4. Trip service publishes TripCreated.\n5. Dispatcher consumes the event.\n6. Dispatcher publishes DriverProposed.\n7. Notification service consumes the proposal.\n\nNo single communication style is ideal for every interaction.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Combining Interaction Styles**. A real application can combine patterns. **Example** Mobile client sends a trip request. Trip service performs request/response to validate the passenger.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Combining Interaction Styles** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "API as a Contract",
          slug: "3-9-api-as-a-contract",
          description: "An API is a contract between a service and its clients. It should define: Operations Inputs Outputs Errors Data structures Compatibility rules Security expectations API design...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "An API is a contract between a service and its clients.\n\nIt should define:\n\n- Operations\n- Inputs\n- Outputs\n- Errors\n- Data structures\n- Compatibility rules\n- Security expectations\n\nAPI design should ideally happen before implementation is complete.\n\nAn API-first approach allows service developers and client developers to agree on the contract early.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **API as a Contract**. An API is a contract between a service and its clients. It should define: Operations Inputs Outputs Errors Data structures Compatibility rules Security expectations API design should ideally happen before implementation is complete. An API-first approach allows service developers and client developers to agree on the contract early.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **API as a Contract** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "API Definition for Messaging",
          slug: "3-10-api-definition-for-messaging",
          description: "For messaging, the API includes: Channel names Message types Message fields Delivery expectations Error handling Ordering requirements Consumer behavior",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "For messaging, the API includes:\n\n- Channel names\n- Message types\n- Message fields\n- Delivery expectations\n- Error handling\n- Ordering requirements\n- Consumer behavior",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **API Definition for Messaging**. For messaging, the API includes: Channel names Message types Message fields Delivery expectations Error handling Ordering requirements Consumer behavior\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "API Definition for HTTP",
          slug: "3-11-api-definition-for-http",
          description: "For HTTP, the API includes: URLs HTTP methods Query parameters Request bodies Response bodies Status codes Headers Error formats",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "For HTTP, the API includes:\n\n- URLs\n- HTTP methods\n- Query parameters\n- Request bodies\n- Response bodies\n- Status codes\n- Headers\n- Error formats",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **API Definition for HTTP**. For HTTP, the API includes: URLs HTTP methods Query parameters Request bodies Response bodies Status codes Headers Error formats\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "API Evolution",
          slug: "3-12-api-evolution",
          description: "Microservice clients cannot always be upgraded simultaneously. During rolling deployment, old and new service versions may coexist.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservice clients cannot always be upgraded simultaneously.\n\nDuring rolling deployment, old and new service versions may coexist.\n\nTherefore API changes should be backward compatible whenever practical.\n\nA safe additive change might be:\n\n```text\nExisting response:\n{\n  \"id\": 10,\n  \"name\": \"Alice\"\n}\n\nNew response:\n{\n  \"id\": 10,\n  \"name\": \"Alice\",\n  \"preferredLanguage\": \"en\"\n}\n```\nOld clients should ignore unknown fields.\n\nA new service version should provide sensible defaults for missing fields when appropriate.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **API Evolution**:\n\n```text\nExisting response:\n{\n  \"id\": 10,\n  \"name\": \"Alice\"\n}\n\nNew response:\n{\n  \"id\": 10,\n  \"name\": \"Alice\",\n  \"preferredLanguage\": \"en\"\n}\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **API Evolution** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Breaking API Changes",
          slug: "3-13-breaking-api-changes",
          description: "For incompatible changes, options include: Versioning Supporting old and new contracts temporarily Deploying separate service versions Migration periods Compatibility adapters...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "For incompatible changes, options include:\n\n- Versioning\n- Supporting old and new contracts temporarily\n- Deploying separate service versions\n- Migration periods\n- Compatibility adapters\n\nFor HTTP APIs, versioning can be represented in the URL or another contract mechanism.\n\nThe key principle is to avoid forcing every consumer to upgrade at exactly the same moment.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Breaking API Changes**. For incompatible changes, options include: Versioning Supporting old and new contracts temporarily Deploying separate service versions Migration periods Compatibility adapters For HTTP APIs, versioning can be represented in the URL or another contract mechanism. The key principle is to avoid forcing every consumer to upgrade at exactly the same moment.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Breaking API Changes** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Partial Failure",
          slug: "3-14-partial-failure",
          description: "A distributed call can fail because: Service is down Network is unavailable Service is overloaded Service responds slowly DNS or routing fails Connection pool is exhausted...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A distributed call can fail because:\n\n- Service is down\n- Network is unavailable\n- Service is overloaded\n- Service responds slowly\n- DNS or routing fails\n- Connection pool is exhausted\n- Dependency itself has failed\n\nThe caller must assume that remote operations can fail.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Partial Failure**. A distributed call can fail because: Service is down Network is unavailable Service is overloaded Service responds slowly DNS or routing fails Connection pool is exhausted Dependency itself has failed The caller must assume that remote operations can fail.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Partial Failure** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Network Timeouts",
          slug: "3-15-network-timeouts",
          description: "Never wait indefinitely for a remote service. Use explicit connection and response timeouts.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Never wait indefinitely for a remote service.\n\nUse explicit connection and response timeouts.\n\nA timeout prevents one dependency from holding resources forever.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Network Timeouts**. Never wait indefinitely for a remote service. Use explicit connection and response timeouts. A timeout prevents one dependency from holding resources forever.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Network Timeouts** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Limit Outstanding Requests",
          slug: "3-16-limit-outstanding-requests",
          description: "Use concurrency limits to avoid overwhelming a dependency. This also prevents a failing downstream service from causing the caller's thread pool to become exhausted.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Use concurrency limits to avoid overwhelming a dependency.\n\nThis also prevents a failing downstream service from causing the caller's thread pool to become exhausted.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Limit Outstanding Requests**. Use concurrency limits to avoid overwhelming a dependency. This also prevents a failing downstream service from causing the caller's thread pool to become exhausted.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Limit Outstanding Requests** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Circuit Breaker Pattern",
          slug: "3-17-circuit-breaker-pattern",
          description: "Track failures and open the circuit when failure becomes persistent. The purpose is not to \"fix\" the downstream service.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Track failures and open the circuit when failure becomes persistent.\n\nThe purpose is not to \"fix\" the downstream service. It is to stop repeatedly sending requests that are unlikely to succeed.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Circuit Breaker Pattern**. Track failures and open the circuit when failure becomes persistent. The purpose is not to \"fix\" the downstream service. It is to stop repeatedly sending requests that are unlikely to succeed.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Circuit Breaker Pattern** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Fallbacks",
          slug: "3-18-fallbacks",
          description: "Fallbacks should be designed per business capability. Examples: Recommendations: return empty list Cached catalog: return last known data Optional analytics: skip analytics...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Fallbacks should be designed per business capability.\n\nExamples:\n\n- Recommendations: return empty list\n- Cached catalog: return last known data\n- Optional analytics: skip analytics\n- Payment authorization: fail safely rather than pretending payment succeeded\n\nA fallback should never create false business state.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Fallbacks**. Fallbacks should be designed per business capability. Examples: Recommendations: return empty list Cached catalog: return last known data Optional analytics: skip analytics Payment authorization: fail safely rather than pretending payment succeeded A fallback should never create false business state.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Asynchronous Messaging",
          slug: "3-19-asynchronous-messaging",
          description: "In messaging-based communication, producers send messages to channels and consumers process them independently. A message commonly contains: Headers/metadata Payload/body...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "In messaging-based communication, producers send messages to channels and consumers process them independently.\n\nA message commonly contains:\n\n- Headers/metadata\n- Payload/body\n\nChannels can be:\n\n- Point-to-point\n- Publish/subscribe",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Asynchronous Messaging**. In messaging-based communication, producers send messages to channels and consumers process them independently. A message commonly contains: Headers/metadata Payload/body Channels can be: Point-to-point Publish/subscribe\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Point-to-Point Messaging",
          slug: "3-20-point-to-point-messaging",
          description: "A message placed on a point-to-point channel is processed by one consumer. This is useful for distributing work among service instances.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A message placed on a point-to-point channel is processed by one consumer.\n\nThis is useful for distributing work among service instances.\n\n**Example**\n\n```text\n Order Queue\n   |\n+--+--+\n|     |\n```\nWorker1 Worker2\n\nEach message should be handled by one worker according to broker semantics.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Point-to-Point Messaging**:\n\n```text\nOrder Queue\n   |\n+--+--+\n|     |\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Point-to-Point Messaging** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Publish/Subscribe Messaging",
          slug: "3-21-publish-subscribe-messaging",
          description: "Each interested consumer receives the event. **Example** Email Audit Analytics This is useful for notifying multiple independent capabilities.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Each interested consumer receives the event.\n\n**Example**\n\n```text\nOrderPlaced\n    |\n  Topic\n  / | \\\n v  v  v\n```\n   Email Audit Analytics\n\nThis is useful for notifying multiple independent capabilities.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Publish/Subscribe Messaging**:\n\n```text\nOrderPlaced\n    |\n  Topic\n  / | \\\n v  v  v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Messaging Brokers",
          slug: "3-22-messaging-brokers",
          description: "Examples discussed in this architectural approach include: RabbitMQ Apache Kafka Apache ActiveMQ NSQ Different brokers provide different guarantees and delivery models. The...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Examples discussed in this architectural approach include:\n\n- RabbitMQ\n- Apache Kafka\n- Apache ActiveMQ\n- NSQ\n\nDifferent brokers provide different guarantees and delivery models.\n\nThe important design question is not \"which broker is best?\" but:\n\n- What delivery guarantee is required?\n- What ordering is required?\n- What throughput is required?\n- How should consumers scale?\n- How should failures be handled?\n- How long should messages be retained?",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Messaging Brokers**. Examples discussed in this architectural approach include: RabbitMQ Apache Kafka Apache ActiveMQ NSQ Different brokers provide different guarantees and delivery models. The important design question is not \"which broker is best?\" but: What delivery guarantee is required? What ordering is required?\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Benefits of Messaging",
          slug: "3-23-benefits-of-messaging",
          description: "Messaging can provide: Decoupling Producers do not need to know service instance addresses. Buffering Messages can wait while consumers are temporarily unavailable.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Messaging can provide:\n\n1. Decoupling\n   Producers do not need to know service instance addresses.\n\n2. Buffering\n   Messages can wait while consumers are temporarily unavailable.\n\n3. Flexible interactions\n```text\nNotifications, asynchronous responses, and publish/subscribe are natural.\n```\n4. Explicit distributed communication\n   The asynchronous boundary makes remote communication visible.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Benefits of Messaging**:\n\n```text\nNotifications, asynchronous responses, and publish/subscribe are natural.\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Benefits of Messaging** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Messaging Drawbacks",
          slug: "3-24-messaging-drawbacks",
          description: "Messaging adds: Broker infrastructure Operational responsibility Monitoring requirements Delivery semantics Retry handling Duplicate-message handling More complicated...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Messaging adds:\n\n- Broker infrastructure\n- Operational responsibility\n- Monitoring requirements\n- Delivery semantics\n- Retry handling\n- Duplicate-message handling\n- More complicated request/response flows\n\nWhen implementing request/response over messaging, correlation identifiers and reply channels may be required.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Messaging Drawbacks**. Messaging adds: Broker infrastructure Operational responsibility Monitoring requirements Delivery semantics Retry handling Duplicate-message handling More complicated request/response flows When implementing request/response over messaging, correlation identifiers and reply channels may be required.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Synchronous Request/Response",
          slug: "3-25-synchronous-request-response",
          description: "The caller sends a request and waits for a response. Common technologies include: HTTP/REST Thrift Synchronous communication is convenient when the result is required immediately.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The caller sends a request and waits for a response.\n\nCommon technologies include:\n\n- HTTP/REST\n- Thrift\n\nSynchronous communication is convenient when the result is required immediately.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Synchronous Request/Response**. The caller sends a request and waits for a response. Common technologies include: HTTP/REST Thrift Synchronous communication is convenient when the result is required immediately.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "REST",
          slug: "3-26-rest",
          description: "REST commonly uses HTTP and models business objects as resources. Examples: The representation may use JSON or another format.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "REST commonly uses HTTP and models business objects as resources.\n\nExamples:\n\n```text\nGET    /customers/10\nPOST   /orders\nPUT    /orders/100\nDELETE /orders/100\n```\nThe representation may use JSON or another format.\n\nREST is useful because HTTP infrastructure is widely understood and supported.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **REST**:\n\n```text\nGET    /customers/10\nPOST   /orders\nPUT    /orders/100\nDELETE /orders/100\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "REST Maturity Levels",
          slug: "3-27-rest-maturity-levels",
          description: "A useful maturity model progresses from simple HTTP tunneling toward resource-oriented APIs and hypermedia. Level 0: A single endpoint receives commands, often through POST.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A useful maturity model progresses from simple HTTP tunneling toward resource-oriented APIs and hypermedia.\n\nLevel 0:\nA single endpoint receives commands, often through POST.\n\nLevel 1:\nResources are introduced.\n\nLevel 2:\nHTTP methods are used according to resource operations, such as GET, POST, PUT, and DELETE.\n\nLevel 3:\nResponses contain links that describe available next actions. This is associated with HATEOAS.\n\nThe levels are useful for evaluating how resource-oriented an API is.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **REST Maturity Levels**. A useful maturity model progresses from simple HTTP tunneling toward resource-oriented APIs and hypermedia. Level 0: A single endpoint receives commands, often through POST. Level 1: Resources are introduced.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "HTTP Advantages",
          slug: "3-28-http-advantages",
          description: "HTTP provides: Familiar semantics Broad tooling Browser compatibility Firewall compatibility Native request/response support Easy testing with command-line and API tools No...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "HTTP provides:\n\n- Familiar semantics\n- Broad tooling\n- Browser compatibility\n- Firewall compatibility\n- Native request/response support\n- Easy testing with command-line and API tools\n- No mandatory message broker",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **HTTP Advantages**. HTTP provides: Familiar semantics Broad tooling Browser compatibility Firewall compatibility Native request/response support Easy testing with command-line and API tools No mandatory message broker\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "HTTP Limitations",
          slug: "3-29-http-limitations",
          description: "HTTP request/response has limitations: Both sides generally need to participate during the exchange Direct clients need a service location Pure HTTP request/response does not...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "HTTP request/response has limitations:\n\n- Both sides generally need to participate during the exchange\n- Direct clients need a service location\n- Pure HTTP request/response does not naturally provide durable message buffering\n- Long synchronous dependency chains can increase latency\n- Poor timeout and retry design can create cascading failures",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **HTTP Limitations**. HTTP request/response has limitations: Both sides generally need to participate during the exchange Direct clients need a service location Pure HTTP request/response does not naturally provide durable message buffering Long synchronous dependency chains can increase latency Poor timeout and retry design can create cascading failures\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **HTTP Limitations** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "REST API Description Languages",
          slug: "3-30-rest-api-description-languages",
          description: "API description approaches can define: Endpoints Parameters Request schemas Response schemas Examples include Swagger/OpenAPI-style descriptions and RAML. Such specifications...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "API description approaches can define:\n\n- Endpoints\n- Parameters\n- Request schemas\n- Response schemas\n\nExamples include Swagger/OpenAPI-style descriptions and RAML.\n\nSuch specifications can support documentation and code generation.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **REST API Description Languages**. API description approaches can define: Endpoints Parameters Request schemas Response schemas Examples include Swagger/OpenAPI-style descriptions and RAML. Such specifications can support documentation and code generation.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Thrift",
          slug: "3-31-thrift",
          description: "Thrift is an RPC framework designed for cross-language communication. It uses an interface definition language and can generate client and server code for multiple programming...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Thrift is an RPC framework designed for cross-language communication.\n\nIt uses an interface definition language and can generate client and server code for multiple programming languages.\n\nA Thrift service resembles a strongly typed interface.\n\nMethods can support:\n\n- Request/response\n- One-way operations",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Thrift**. Thrift is an RPC framework designed for cross-language communication. It uses an interface definition language and can generate client and server code for multiple programming languages. A Thrift service resembles a strongly typed interface.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Thrift** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Thrift Serialization and Transport",
          slug: "3-32-thrift-serialization-and-transport",
          description: "Thrift can work with different encodings and transports. Binary encodings are generally more compact and efficient to process than verbose human-readable representations.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Thrift can work with different encodings and transports.\n\nBinary encodings are generally more compact and efficient to process than verbose human-readable representations.\n\nHTTP can be useful where network compatibility is important, while direct transports may provide different performance characteristics.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Thrift Serialization and Transport**. Thrift can work with different encodings and transports. Binary encodings are generally more compact and efficient to process than verbose human-readable representations. HTTP can be useful where network compatibility is important, while direct transports may provide different performance characteristics.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Message Formats",
          slug: "3-33-message-formats",
          description: "Two broad categories are: Human-readable formats Binary formats Human-readable examples: JSON XML Binary examples: Protocol Buffers Avro Binary RPC encodings",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Two broad categories are:\n\n- Human-readable formats\n- Binary formats\n\nHuman-readable examples:\n\n- JSON\n- XML\n\nBinary examples:\n\n- Protocol Buffers\n- Avro\n- Binary RPC encodings",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Message Formats**. Two broad categories are: Human-readable formats Binary formats Human-readable examples: JSON XML Binary examples: Protocol Buffers Avro Binary RPC encodings\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "JSON and XML",
          slug: "3-34-json-and-xml",
          description: "**Advantages** Easy to inspect Self-describing Broad language support Easy integration Natural handling of additive fields Disadvantages: Larger payloads Parsing overhead...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Advantages**\n\n- Easy to inspect\n- Self-describing\n- Broad language support\n- Easy integration\n- Natural handling of additive fields\n\nDisadvantages:\n\n- Larger payloads\n- Parsing overhead\n- Potentially higher bandwidth usage",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **JSON and XML**. **Advantages** Easy to inspect Self-describing Broad language support Easy integration Natural handling of additive fields Disadvantages: Larger payloads Parsing overhead Potentially higher bandwidth usage\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **JSON and XML** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Protocol Buffers",
          slug: "3-35-protocol-buffers",
          description: "Protocol Buffers use a schema and tagged fields. Tagged fields make it possible for consumers to recognize fields without depending on a fixed physical order.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Protocol Buffers use a schema and tagged fields.\n\nTagged fields make it possible for consumers to recognize fields without depending on a fixed physical order.\n\nThis can support API evolution when schemas are carefully managed.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Protocol Buffers**. Protocol Buffers use a schema and tagged fields. Tagged fields make it possible for consumers to recognize fields without depending on a fixed physical order. This can support API evolution when schemas are carefully managed.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Apache Avro",
          slug: "3-36-apache-avro",
          description: "Avro also uses schemas but has different schema-resolution characteristics. Consumers need appropriate schema information to interpret records.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Avro also uses schemas but has different schema-resolution characteristics.\n\nConsumers need appropriate schema information to interpret records.\n\nThe choice between Protobuf, Avro, JSON, and other formats should depend on compatibility, performance, ecosystem, and operational requirements.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Apache Avro**. Avro also uses schemas but has different schema-resolution characteristics. Consumers need appropriate schema information to interpret records. The choice between Protobuf, Avro, JSON, and other formats should depend on compatibility, performance, ecosystem, and operational requirements.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Apache Avro** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Four-Tier Application Architecture",
          slug: "3-37-four-tier-application-architecture",
          description: "A useful architecture separates: Client tier Delivery tier Aggregation/data tier Services tier The delivery tier can handle routing, load balancing, caching, and security. The...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A useful architecture separates:\n\n1. Client tier\n2. Delivery tier\n3. Aggregation/data tier\n4. Services tier\n\nThe delivery tier can handle routing, load balancing, caching, and security.\n\nThe aggregation tier can expose high-performance APIs and coordinate access to backend services.\n\nThe services tier contains business capabilities and service-specific data.\n\nThis structure helps keep client concerns separate from backend implementation details.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Four-Tier Application Architecture**. A useful architecture separates: Client tier Delivery tier Aggregation/data tier Services tier The delivery tier can handle routing, load balancing, caching, and security. The aggregation tier can expose high-performance APIs and coordinate access to backend services. The services tier contains business capabilities and service-specific data.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Four-Tier Application Architecture** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
      ],
    },
    {
      title: "Service Discovery",
      slug: "4-service-discovery",
      description: "Service Discovery explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Why Service Discovery Is Necessary",
          slug: "4-1-why-service-discovery-is-necessary",
          description: "Microservice instances often have dynamic network locations. Instances can be: Started Stopped Replaced Rescheduled Scaled Moved Hard-coding: is fragile in a dynamic environment.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservice instances often have dynamic network locations.\n\nInstances can be:\n\n- Started\n- Stopped\n- Replaced\n- Rescheduled\n- Scaled\n- Moved\n\nHard-coding:\n\n```text\norder-service = 10.4.3.10:8080\n```\nis fragile in a dynamic environment.\n\nThe system needs a way to discover currently available instances.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Why Service Discovery Is Necessary**:\n\n```text\norder-service = 10.4.3.10:8080\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Service Discovery Is Necessary** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Service Registry",
          slug: "4-2-service-registry",
          description: "A service registry maintains information about service instances. A conceptual registry entry may contain: The registry normally needs: Registration API Deregistration...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A service registry maintains information about service instances.\n\nA conceptual registry entry may contain:\n\n```text\nService: order-service\nHost: 10.4.3.20\nPort: 8080\nHealth: available\nMetadata: version, zone, region\n```\nThe registry normally needs:\n\n- Registration API\n- Deregistration capability\n- Query API\n- Health/heartbeat mechanism\n- High availability\n- Consistency appropriate to the environment",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Service Registry**:\n\n```text\nService: order-service\nHost: 10.4.3.20\nPort: 8080\nHealth: available\nMetadata: version, zone, region\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Service Registry** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Registration Lifecycle",
          slug: "4-3-registration-lifecycle",
          description: "Typical lifecycle: Service starts. Service registers its address.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Typical lifecycle:\n\n1. Service starts.\n2. Service registers its address.\n3. Service sends heartbeats or health information.\n4. Clients discover it.\n5. Service is stopped or becomes unhealthy.\n6. Registry removes or marks the instance unavailable.\n\nThis prevents stale instances from receiving traffic.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Registration Lifecycle**. Typical lifecycle: Service starts. Service registers its address. Service sends heartbeats or health information.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Registration Lifecycle** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Client-Side Discovery",
          slug: "4-4-client-side-discovery",
          description: "With client-side discovery: The client obtains available instances and performs load balancing itself.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "With client-side discovery:\n\n```text\nClient\n  |\n  | query registry\n  v\nRegistry\n  |\n  | instances\n  v\nClient\n  |\n  | choose instance\n  v\nService\n```\nThe client obtains available instances and performs load balancing itself.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Client-Side Discovery**:\n\n```text\nClient\n  |\n  | query registry\n  v\nRegistry\n  |\n  | instances\n  v\nClient\n  |\n  | choose instance\n  v\nService\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Client-Side Discovery Benefits",
          slug: "4-5-client-side-discovery-benefits",
          description: "**Advantages** Simple architecture Client can use application-specific load-balancing logic No mandatory discovery proxy Fewer infrastructure components A client can implement...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Advantages**\n\n- Simple architecture\n- Client can use application-specific load-balancing logic\n- No mandatory discovery proxy\n- Fewer infrastructure components\n\nA client can implement strategies such as:\n\n- Round robin\n- Random selection\n- Consistent hashing\n- Zone-aware routing",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Client-Side Discovery Benefits**. **Advantages** Simple architecture Client can use application-specific load-balancing logic No mandatory discovery proxy Fewer infrastructure components A client can implement strategies such as: Round robin Random selection Consistent hashing Zone-aware routing\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Client-Side Discovery Drawbacks",
          slug: "4-6-client-side-discovery-drawbacks",
          description: "The client becomes coupled to discovery infrastructure. Each programming language and client framework may need its own discovery implementation.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The client becomes coupled to discovery infrastructure.\n\nEach programming language and client framework may need its own discovery implementation.\n\nThat can increase development and maintenance cost.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Client-Side Discovery Drawbacks**. The client becomes coupled to discovery infrastructure. Each programming language and client framework may need its own discovery implementation. That can increase development and maintenance cost.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Server-Side Discovery",
          slug: "4-7-server-side-discovery",
          description: "With server-side discovery: Service Instance The client only knows the load balancer. The router finds a suitable service instance.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "With server-side discovery:\n\n```text\n Client\n   |\n   v\nLoad Balancer / Router\n   |\n   | query registry\n   v\n Registry\n   |\n   v\n```\n   Service Instance\n\nThe client only knows the load balancer.\n\nThe router finds a suitable service instance.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Server-Side Discovery**:\n\n```text\nClient\n   |\n   v\nLoad Balancer / Router\n   |\n   | query registry\n   v\n Registry\n   |\n   v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Server-Side Discovery** when deciding how a service should be structured or integrated with the rest of the system.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Server-Side Discovery Benefits",
          slug: "4-8-server-side-discovery-benefits",
          description: "**Advantages** Client is independent of registry implementation Discovery logic is centralized Multiple client languages can use the same mechanism Infrastructure can provide...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Advantages**\n\n- Client is independent of registry implementation\n- Discovery logic is centralized\n- Multiple client languages can use the same mechanism\n- Infrastructure can provide discovery automatically\n\nThis is especially useful when the deployment platform already supplies routing.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Server-Side Discovery Benefits**. **Advantages** Client is independent of registry implementation Discovery logic is centralized Multiple client languages can use the same mechanism Infrastructure can provide discovery automatically This is especially useful when the deployment platform already supplies routing.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Server-Side Discovery Drawbacks",
          slug: "4-9-server-side-discovery-drawbacks",
          description: "If the platform does not provide the router, it becomes another highly available component to operate. The router must also be scalable and resilient.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "If the platform does not provide the router, it becomes another highly available component to operate.\n\nThe router must also be scalable and resilient.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Server-Side Discovery Drawbacks**. If the platform does not provide the router, it becomes another highly available component to operate. The router must also be scalable and resilient.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Service Registry Availability",
          slug: "4-10-service-registry-availability",
          description: "A registry is critical infrastructure. If it becomes unavailable, new service discovery operations can fail.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A registry is critical infrastructure.\n\nIf it becomes unavailable, new service discovery operations can fail.\n\nTherefore registries are commonly deployed redundantly.\n\nClients may also cache previously discovered locations, but cached information eventually becomes stale.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Service Registry Availability**. A registry is critical infrastructure. If it becomes unavailable, new service discovery operations can fail. Therefore registries are commonly deployed redundantly.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Service Registry Availability** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Registry Examples and Infrastructure Integration",
          slug: "4-11-registry-examples-and-infrastructure-integration",
          description: "Common technologies and environments associated with service discovery include: Eureka Consul etcd ZooKeeper Kubernetes service discovery Cloud load-balancing infrastructure The...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Common technologies and environments associated with service discovery include:\n\n- Eureka\n- Consul\n- etcd\n- ZooKeeper\n- Kubernetes service discovery\n- Cloud load-balancing infrastructure\n\nThe implementation varies, but the architectural purpose is the same: map logical service names to currently usable service instances.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Registry Examples and Infrastructure Integration**. Common technologies and environments associated with service discovery include: Eureka Consul etcd ZooKeeper Kubernetes service discovery Cloud load-balancing infrastructure The implementation varies, but the architectural purpose is the same: map logical service names to currently usable service instances.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Registry Examples and Infrastructure Integration** when deciding how a service should be structured or integrated with the rest of the system.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Health and Heartbeats",
          slug: "4-12-health-and-heartbeats",
          description: "Registration alone is insufficient. A service may register successfully and later become unavailable.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Registration alone is insufficient.\n\nA service may register successfully and later become unavailable.\n\nA heartbeat or health-check process can detect this.\n\n**Example**\n\n```text\nService A\n   |\n   | heartbeat\n   v\nRegistry\n```\nIf heartbeats stop for an appropriate period, the registry can remove or disable the instance.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Health and Heartbeats**:\n\n```text\nService A\n   |\n   | heartbeat\n   v\nRegistry\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Health and Heartbeats** when deciding how a service should be structured or integrated with the rest of the system.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Self-Registration Pattern",
          slug: "4-13-self-registration-pattern",
          description: "With self-registration, each service manages its own registration. The service performs: **Advantages** Straightforward No separate registrar is required Works across...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "With self-registration, each service manages its own registration.\n\nThe service performs:\n\n```text\nregister()\nheartbeat()\nunregister()\n```\n**Advantages**\n\n- Straightforward\n- No separate registrar is required\n- Works across environments when client libraries exist\n\nDrawback:\n\n- Service code becomes coupled to the registry\n- Every language/framework needs registration support",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Self-Registration Pattern**:\n\n```text\nregister()\nheartbeat()\nunregister()\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Self-Registration Pattern** when deciding how a service should be structured or integrated with the rest of the system.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Third-Party Registration",
          slug: "4-14-third-party-registration",
          description: "A separate component manages registration. Deployment Platform The registrar can watch the deployment environment and register or unregister services automatically.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A separate component manages registration.\n\n```text\nService starts\n     |\n     v\n```\n   Deployment Platform\n```text\n     |\n     v\nRegistrar\n     |\n     v\n Registry\n```\nThe registrar can watch the deployment environment and register or unregister services automatically.\n\n**Advantages**\n\n- Service code remains independent\n- Registration logic is centralized\n- Works well with standardized deployment infrastructure\n\nDrawback:\n\n- Registrar becomes another component unless the platform provides it.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Third-Party Registration**:\n\n```text\nService starts\n     |\n     v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Third-Party Registration** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Service Discovery and Load Balancing",
          slug: "4-15-service-discovery-and-load-balancing",
          description: "Discovery answers: Load balancing answers: These concerns are related but distinct.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Discovery answers:\n\n```text\n\"Where are the available instances?\"\n```\nLoad balancing answers:\n\n```text\n\"Which available instance should receive this request?\"\n```\nThese concerns are related but distinct.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Service Discovery and Load Balancing**:\n\n```text\n\"Where are the available instances?\"\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Zone and Failure-Domain Awareness",
          slug: "4-16-zone-and-failure-domain-awareness",
          description: "In a distributed environment, selecting an instance in the same availability zone can reduce latency and cross-zone traffic. A robust strategy can prefer: Healthy local-zone...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "In a distributed environment, selecting an instance in the same availability zone can reduce latency and cross-zone traffic.\n\nA robust strategy can prefer:\n\n1. Healthy local-zone instances\n2. Healthy nearby instances\n3. Healthy remote instances as fallback",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Zone and Failure-Domain Awareness**. In a distributed environment, selecting an instance in the same availability zone can reduce latency and cross-zone traffic. A robust strategy can prefer: Healthy local-zone instances Healthy nearby instances Healthy remote instances as fallback\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Zone and Failure-Domain Awareness** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
      ],
    },
    {
      title: "Event-Driven Data Management",
      slug: "5-event-driven-data-management",
      description: "Event-Driven Data Management explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Why Distributed Data Is Difficult",
          slug: "5-1-why-distributed-data-is-difficult",
          description: "In a monolith, a transaction can update several tables in one database. **Example** The database provides ACID guarantees.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "In a monolith, a transaction can update several tables in one database.\n\n**Example**\n\n```text\nBEGIN TRANSACTION\n  update customer\n  insert order\n  update inventory\nCOMMIT\n```\nThe database provides ACID guarantees.\n\nWith microservices, each service may own a different database.\n\nNow a business operation may require:\n\n```text\nCustomer DB\n    +\nOrder DB\n    +\nInventory DB\n    +\nPayment DB\n```\nA single local database transaction cannot automatically cover all of them.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Why Distributed Data Is Difficult**:\n\n```text\nBEGIN TRANSACTION\n  update customer\n  insert order\n  update inventory\nCOMMIT\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Distributed Data Is Difficult** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "ACID",
          slug: "5-2-acid",
          description: "ACID represents: Atomicity: All changes in a transaction succeed together or are rolled back. Consistency: A successful transaction leaves the database in a valid state.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "ACID represents:\n\nAtomicity:\nAll changes in a transaction succeed together or are rolled back.\n\nConsistency:\nA successful transaction leaves the database in a valid state.\n\nIsolation:\nConcurrent transactions do not expose invalid intermediate states as if they were committed results.\n\nDurability:\nCommitted data survives normal failures according to the database's durability guarantees.\n\nACID makes multi-row, multi-table changes relatively straightforward inside one database boundary.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **ACID**. ACID represents: Atomicity: All changes in a transaction succeed together or are rolled back. Consistency: A successful transaction leaves the database in a valid state. Isolation: Concurrent transactions do not expose invalid intermediate states as if they were committed results.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **ACID** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Why Shared Databases Are Tempting",
          slug: "5-3-why-shared-databases-are-tempting",
          description: "A shared database makes cross-service queries and transactions convenient. But it creates coupling.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A shared database makes cross-service queries and transactions convenient.\n\nBut it creates coupling.\n\nIf multiple services depend on the same schema:\n\n- Schema changes require coordination\n- Services can bypass each other's business rules\n- Independent deployment becomes harder\n- Database performance becomes shared infrastructure\n- Ownership becomes ambiguous",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why Shared Databases Are Tempting**. A shared database makes cross-service queries and transactions convenient. But it creates coupling. If multiple services depend on the same schema: Schema changes require coordination Services can bypass each other's business rules Independent deployment becomes harder Database performance becomes shared infrastructure Ownership becomes ambiguous\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Shared Databases Are Tempting** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Private Data Ownership",
          slug: "5-4-private-data-ownership",
          description: "In a strong service boundary: Other services obtain information through APIs or events. This preserves ownership.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "In a strong service boundary:\n\n```text\nOrder Service -> owns orders\nCustomer Service -> owns customers\nInventory Service -> owns inventory\n```\nOther services obtain information through APIs or events.\n\nThis preserves ownership.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Private Data Ownership**:\n\n```text\nOrder Service -> owns orders\nCustomer Service -> owns customers\nInventory Service -> owns inventory\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Private Data Ownership** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Polyglot Data",
          slug: "5-5-polyglot-data",
          description: "A service can choose storage appropriate for its needs. Examples: SQL for transactional records Search engine for search-heavy workloads Graph storage for relationship queries...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A service can choose storage appropriate for its needs.\n\nExamples:\n\n- SQL for transactional records\n- Search engine for search-heavy workloads\n- Graph storage for relationship queries\n- Document storage for document-oriented data\n\nThis improves flexibility but increases operational responsibility.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Polyglot Data**. A service can choose storage appropriate for its needs. Examples: SQL for transactional records Search engine for search-heavy workloads Graph storage for relationship queries Document storage for document-oriented data This improves flexibility but increases operational responsibility.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Polyglot Data** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Cross-Service Business Transactions",
          slug: "5-6-cross-service-business-transactions",
          description: "Suppose placing an order requires: Create order Reserve inventory Authorize payment These steps may belong to three services. A distributed transaction coordinator is one...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Suppose placing an order requires:\n\n1. Create order\n2. Reserve inventory\n3. Authorize payment\n\nThese steps may belong to three services.\n\nA distributed transaction coordinator is one theoretical solution, but many modern architectures avoid tightly coupled distributed transactions.\n\nInstead, event-driven workflows can provide eventual consistency.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Cross-Service Business Transactions**. Suppose placing an order requires: Create order Reserve inventory Authorize payment These steps may belong to three services. A distributed transaction coordinator is one theoretical solution, but many modern architectures avoid tightly coupled distributed transactions. Instead, event-driven workflows can provide eventual consistency.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Cross-Service Business Transactions** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Event-Driven Architecture",
          slug: "5-7-event-driven-architecture",
          description: "Services communicate state changes as events. **Example** Inventory Payment Service Service Each consumer updates its own state.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Services communicate state changes as events.\n\n**Example**\n\n```text\nOrder Service\n    |\n    | OrderCreated\n    v\nMessage Broker\n   /      \\\n  v        v\n```\nInventory   Payment\n Service     Service\n\nEach consumer updates its own state.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Event-Driven Architecture**:\n\n```text\nOrder Service\n    |\n    | OrderCreated\n    v\nMessage Broker\n   /      \\\n  v        v\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Event-Driven Architecture** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Events vs Commands",
          slug: "5-8-events-vs-commands",
          description: "A command generally asks a specific component to perform an action. Examples: An event describes something that has already happened.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A command generally asks a specific component to perform an action.\n\nExamples:\n\n```text\nReserveInventory\nAuthorizePayment\n```\nAn event describes something that has already happened.\n\nExamples:\n\n```text\nOrderCreated\nPaymentAuthorized\nInventoryReserved\n```\nThe distinction improves coupling because event consumers can independently decide what to do with an occurrence.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Events vs Commands**:\n\n```text\nReserveInventory\nAuthorizePayment\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Eventual Consistency",
          slug: "5-9-eventual-consistency",
          description: "With event-driven data management, all services may not observe a change at exactly the same moment. **Example** For a short period, one service may show the old state while...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "With event-driven data management, all services may not observe a change at exactly the same moment.\n\n**Example**\n\n```text\nOrder created\n    |\n    +--> Inventory receives event\n    |\n    +--> Payment receives event\n```\nFor a short period, one service may show the old state while another has already updated.\n\nThis is eventual consistency.\n\nThe system is designed so that, assuming successful processing, related state converges over time.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Eventual Consistency**:\n\n```text\nOrder created\n    |\n    +--> Inventory receives event\n    |\n    +--> Payment receives event\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Eventual Consistency** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "BASE Model",
          slug: "5-10-base-model",
          description: "The architecture described uses weaker consistency guarantees than a single ACID transaction. The BASE style is commonly associated with: Basically available behavior Soft...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The architecture described uses weaker consistency guarantees than a single ACID transaction.\n\nThe BASE style is commonly associated with:\n\n- Basically available behavior\n- Soft state\n- Eventual consistency\n\nThe trade-off is improved availability and service independence at the cost of immediate global consistency.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **BASE Model**. The architecture described uses weaker consistency guarantees than a single ACID transaction. The BASE style is commonly associated with: Basically available behavior Soft state Eventual consistency The trade-off is improved availability and service independence at the cost of immediate global consistency.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **BASE Model** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Materialized Views",
          slug: "5-11-materialized-views",
          description: "A query may need information owned by multiple services. Instead of directly joining private databases, build a dedicated read model.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A query may need information owned by multiple services.\n\nInstead of directly joining private databases, build a dedicated read model.\n\n**Example**\n\n```text\nCustomer Service ----\\\n                      \\\n                       -> Customer Order View\n                      /\nOrder Service -------/\n```\nThe view updater consumes events and maintains a denormalized representation.\n\nQueries can then read the view directly.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Materialized Views**:\n\n```text\nCustomer Service ----\\\n                      \\\n                       -> Customer Order View\n                      /\nOrder Service -------/\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Materialized Views** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Why Materialized Views Help",
          slug: "5-12-why-materialized-views-help",
          description: "**Benefits** Avoid cross-service database joins Fast read operations Service data remains private Read models can be optimized for specific use cases Multiple services can...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Benefits**\n\n- Avoid cross-service database joins\n- Fast read operations\n- Service data remains private\n- Read models can be optimized for specific use cases\n- Multiple services can contribute information\n\nThe cost is synchronization complexity and eventual consistency.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why Materialized Views Help**. **Benefits** Avoid cross-service database joins Fast read operations Service data remains private Read models can be optimized for specific use cases Multiple services can contribute information The cost is synchronization complexity and eventual consistency.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Materialized Views Help** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Achieving Atomicity",
          slug: "5-13-achieving-atomicity",
          description: "The central challenge is making sure a state change and the corresponding event are not separated by a failure. Bad sequence: Or: Both can create inconsistency.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The central challenge is making sure a state change and the corresponding event are not separated by a failure.\n\nBad sequence:\n\n```text\n1. Update database\n2. Crash\n3. Event never published\n```\nOr:\n\n```text\n1. Publish event\n2. Crash before database update\n```\nBoth can create inconsistency.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Achieving Atomicity**:\n\n```text\n1. Update database\n2. Crash\n3. Event never published\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Local Transaction with Event Publication",
          slug: "5-14-local-transaction-with-event-publication",
          description: "One approach is to store the business update and an event record in the same local transaction. **Example** A separate publisher then finds unpublished events and sends them to...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "One approach is to store the business update and an event record in the same local transaction.\n\n**Example**\n\n```text\nBEGIN\n   UPDATE Order\n   INSERT OrderCreated into Event table\nCOMMIT\n```\nA separate publisher then finds unpublished events and sends them to the broker.\n\nThis gives the database atomicity between state and event record.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Local Transaction with Event Publication**:\n\n```text\nBEGIN\n   UPDATE Order\n   INSERT OrderCreated into Event table\nCOMMIT\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Event Publishing Process",
          slug: "5-15-event-publishing-process",
          description: "**Conceptual flow** The publisher can retry events if delivery fails. This is commonly known as an outbox-style approach.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Conceptual flow**\n\n```text\nBusiness Transaction\n      |\n      +--> Domain State\n      |\n      +--> Outbox/Event Record\n                   |\n                   v\n            Event Publisher\n                   |\n                   v\n             Message Broker\n```\nThe publisher can retry events if delivery fails.\n\nThis is commonly known as an outbox-style approach.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Event Publishing Process**:\n\n```text\nBusiness Transaction\n      |\n      +--> Domain State\n      |\n      +--> Outbox/Event Record\n                   |\n                   v\n            Event Publisher\n                   |\n                   v\n             Message Broker\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Advantages of Local Transaction Publishing",
          slug: "5-16-advantages-of-local-transaction-publishing",
          description: "It avoids requiring a global two-phase transaction. It also allows the application to explicitly create business events rather than trying to infer them later.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It avoids requiring a global two-phase transaction.\n\nIt also allows the application to explicitly create business events rather than trying to infer them later.\n\nPotential challenges include:\n\n- Publisher reliability\n- Duplicate delivery\n- Idempotent consumers\n- Additional event storage\n- Operational monitoring",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Advantages of Local Transaction Publishing**. It avoids requiring a global two-phase transaction. It also allows the application to explicitly create business events rather than trying to infer them later. Potential challenges include: Publisher reliability Duplicate delivery Idempotent consumers Additional event storage Operational monitoring\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Transaction Log Mining",
          slug: "5-17-transaction-log-mining",
          description: "Another approach is to derive events from the database's transaction or commit log. Conceptually: The application performs only its database update.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Another approach is to derive events from the database's transaction or commit log.\n\nConceptually:\n\n```text\nApplication\n    |\n    v\n Database\n    |\n Transaction Log\n    |\n    v\nLog Miner\n    |\n    v\nMessage Broker\n```\nThe application performs only its database update.\n\nA separate process observes committed changes and publishes corresponding events.\n\nThe main benefit is that the database commit itself becomes the source of truth for detecting changes.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Transaction Log Mining**:\n\n```text\nApplication\n    |\n    v\n Database\n    |\n Transaction Log\n    |\n    v\nLog Miner\n    |\n    v\nMessage Broker\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Event Sourcing",
          slug: "5-18-event-sourcing",
          description: "Event sourcing stores state changes as events rather than storing only the current state. Traditional approach: Event-sourced approach: The current state can be reconstructed...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Event sourcing stores state changes as events rather than storing only the current state.\n\nTraditional approach:\n\n```text\nOrder row\nOrder line rows\nCurrent status\n```\nEvent-sourced approach:\n\n```text\nOrderCreated\nOrderApproved\nOrderShipped\nOrderCancelled\n```\nThe current state can be reconstructed by replaying events.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Event Sourcing**:\n\n```text\nOrder row\nOrder line rows\nCurrent status\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Event Store",
          slug: "5-19-event-store",
          description: "An event store keeps the event history for an entity. Conceptually: The sequence provides a historical record of how the entity changed.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "An event store keeps the event history for an entity.\n\nConceptually:\n\n```text\nOrder 100\n  |\n  +-- Created\n  +-- Approved\n  +-- Shipped\n```\nThe sequence provides a historical record of how the entity changed.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Event Store**:\n\n```text\nOrder 100\n  |\n  +-- Created\n  +-- Approved\n  +-- Shipped\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Benefits of Event Sourcing",
          slug: "5-20-benefits-of-event-sourcing",
          description: "Benefits include: Reliable event history Strong audit trail Ability to reconstruct state Historical/temporal queries Natural event publication Looser coupling between business...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Benefits include:\n\n- Reliable event history\n- Strong audit trail\n- Ability to reconstruct state\n- Historical/temporal queries\n- Natural event publication\n- Looser coupling between business components\n\nIt can also support migration because business changes become explicit events.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Benefits of Event Sourcing**. Benefits include: Reliable event history Strong audit trail Ability to reconstruct state Historical/temporal queries Natural event publication Looser coupling between business components It can also support migration because business changes become explicit events.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Event Sourcing Drawbacks",
          slug: "5-21-event-sourcing-drawbacks",
          description: "Challenges include: Different programming model Learning curve Event schema evolution Event replay requirements Query complexity Need for read models Eventual consistency Event...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Challenges include:\n\n- Different programming model\n- Learning curve\n- Event schema evolution\n- Event replay requirements\n- Query complexity\n- Need for read models\n- Eventual consistency\n\nEvent stores are not automatically optimized for arbitrary business queries.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Event Sourcing Drawbacks**. Challenges include: Different programming model Learning curve Event schema evolution Event replay requirements Query complexity Need for read models Eventual consistency Event stores are not automatically optimized for arbitrary business queries.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "CQRS",
          slug: "5-22-cqrs",
          description: "CQRS means Command Query Responsibility Segregation. The idea is to separate: With event sourcing, a read model can be built by consuming events.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "CQRS means Command Query Responsibility Segregation.\n\nThe idea is to separate:\n\n```text\nCommands -> change state\nQueries  -> read optimized state\n```\nWith event sourcing, a read model can be built by consuming events.\n\n**Example**\n\n```text\nEvent Store\n    |\n    v\nProjection\n    |\n    v\nQuery Database\n```\nThis lets read storage be optimized independently from write storage.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **CQRS**:\n\n```text\nCommands -> change state\nQueries  -> read optimized state\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Idempotent Consumers",
          slug: "5-23-idempotent-consumers",
          description: "Messages can sometimes be delivered more than once. Therefore consumers should be designed so repeated processing does not corrupt business state.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Messages can sometimes be delivered more than once.\n\nTherefore consumers should be designed so repeated processing does not corrupt business state.\n\nFor example, if Inventory receives:\n\n```text\nInventoryReserved(order=100)\n```\ntwice, the second processing should recognize that reservation 100 has already been applied.\n\nCommon techniques include:\n\n- Idempotency keys\n- Processed-event tables\n- Unique constraints\n- State checks",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Idempotent Consumers**:\n\n```text\nInventoryReserved(order=100)\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Distributed Transaction Mental Model",
          slug: "5-24-distributed-transaction-mental-model",
          description: "Instead of thinking: think: The system progresses through a chain of reliable local operations.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Instead of thinking:\n\n```text\nOne transaction updates everything\n```\nthink:\n\n```text\nLocal transaction\n    -> event\n    -> consumer\n    -> local transaction\n    -> event\n    -> next consumer\n```\nThe system progresses through a chain of reliable local operations.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Distributed Transaction Mental Model**:\n\n```text\nOne transaction updates everything\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Distributed Transaction Mental Model** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Failure Handling",
          slug: "5-25-failure-handling",
          description: "A robust event-driven system needs: Retries Dead-letter handling Idempotency Monitoring Correlation identifiers Event versioning Replay strategies The goal is to make failure...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A robust event-driven system needs:\n\n- Retries\n- Dead-letter handling\n- Idempotency\n- Monitoring\n- Correlation identifiers\n- Event versioning\n- Replay strategies\n\nThe goal is to make failure recoverable rather than exceptional.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Failure Handling**. A robust event-driven system needs: Retries Dead-letter handling Idempotency Monitoring Correlation identifiers Event versioning Replay strategies The goal is to make failure recoverable rather than exceptional.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
      ],
    },
    {
      title: "Deployment Strategies",
      slug: "6-deployment-strategies",
      description: "Deployment Strategies explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Why Deployment Is More Difficult",
          slug: "6-1-why-deployment-is-more-difficult",
          description: "A monolith may have a small number of identical runtime instances. A microservices application may have: Many services Multiple instances per service Different languages...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A monolith may have a small number of identical runtime instances.\n\nA microservices application may have:\n\n- Many services\n- Multiple instances per service\n- Different languages\n- Different frameworks\n- Different resource requirements\n- Different scaling policies\n- Different deployment schedules\n\nAutomation therefore becomes essential.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why Deployment Is More Difficult**. A monolith may have a small number of identical runtime instances. A microservices application may have: Many services Multiple instances per service Different languages Different frameworks Different resource requirements Different scaling policies Different deployment schedules Automation therefore becomes essential.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Deployment Is More Difficult** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Multiple Service Instances per Host",
          slug: "6-2-multiple-service-instances-per-host",
          description: "Several service instances can run on the same physical or virtual host. **Example**",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Several service instances can run on the same physical or virtual host.\n\n**Example**\n\n```text\nHost A\n  - Service A instance\n  - Service B instance\n  - Service C instance\n\nHost B\n  - Service A instance\n  - Service B instance\n  - Service C instance\n```",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Multiple Service Instances per Host**:\n\n```text\nHost A\n  - Service A instance\n  - Service B instance\n  - Service C instance\n\nHost B\n  - Service A instance\n  - Service B instance\n  - Service C instance\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Multiple Service Instances per Host** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Benefits",
          slug: "6-3-benefits",
          description: "**Advantages** Efficient resource utilization Low infrastructure overhead Fast deployment Familiar operational model Multiple services can share the operating system and...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Advantages**\n\n- Efficient resource utilization\n- Low infrastructure overhead\n- Fast deployment\n- Familiar operational model\n\nMultiple services can share the operating system and infrastructure.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Benefits**. **Advantages** Efficient resource utilization Low infrastructure overhead Fast deployment Familiar operational model Multiple services can share the operating system and infrastructure.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Benefits** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Drawbacks",
          slug: "6-4-drawbacks",
          description: "Problems include: Weak isolation One service may consume too many resources Shared runtime failures Deployment complexity Operations must understand each service's runtime...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Problems include:\n\n- Weak isolation\n- One service may consume too many resources\n- Shared runtime failures\n- Deployment complexity\n- Operations must understand each service's runtime requirements\n\nIf several services share the same process, isolation becomes even weaker.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Drawbacks**. Problems include: Weak isolation One service may consume too many resources Shared runtime failures Deployment complexity Operations must understand each service's runtime requirements If several services share the same process, isolation becomes even weaker.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Drawbacks** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Service Instance per Host",
          slug: "6-5-service-instance-per-host",
          description: "Each service instance runs independently on its own host. Two major variants are: Service instance per virtual machine Service instance per container",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Each service instance runs independently on its own host.\n\nTwo major variants are:\n\n- Service instance per virtual machine\n- Service instance per container",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Service Instance per Host**. Each service instance runs independently on its own host. Two major variants are: Service instance per virtual machine Service instance per container\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Service Instance per Host** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Virtual Machine Deployment",
          slug: "6-6-virtual-machine-deployment",
          description: "Each service is packaged into a VM image. **Example** The VM becomes the deployment boundary.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Each service is packaged into a VM image.\n\n**Example**\n\n```text\nOrder Service\n    |\n    v\nVM Image\n    |\n    +-- VM instance 1\n    +-- VM instance 2\n    +-- VM instance 3\n```\nThe VM becomes the deployment boundary.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Virtual Machine Deployment**:\n\n```text\nOrder Service\n    |\n    v\nVM Image\n    |\n    +-- VM instance 1\n    +-- VM instance 2\n    +-- VM instance 3\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Virtual Machine Deployment** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "VM Benefits",
          slug: "6-7-vm-benefits",
          description: "Benefits include: Strong isolation Fixed resource allocation Mature infrastructure Clear deployment interface Mature load balancing Autoscaling support Technology encapsulation...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Benefits include:\n\n- Strong isolation\n- Fixed resource allocation\n- Mature infrastructure\n- Clear deployment interface\n- Mature load balancing\n- Autoscaling support\n- Technology encapsulation\n\nThe operations platform does not need to know every internal implementation detail after the image is built.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **VM Benefits**. Benefits include: Strong isolation Fixed resource allocation Mature infrastructure Clear deployment interface Mature load balancing Autoscaling support Technology encapsulation The operations platform does not need to know every internal implementation detail after the image is built.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "VM Drawbacks",
          slug: "6-8-vm-drawbacks",
          description: "Costs include: Operating system overhead Lower resource density Slower startup compared with containers Potential overprovisioning VM-based infrastructure costs A VM can be...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Costs include:\n\n- Operating system overhead\n- Lower resource density\n- Slower startup compared with containers\n- Potential overprovisioning\n- VM-based infrastructure costs\n\nA VM can be mostly idle while still consuming infrastructure resources.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **VM Drawbacks**. Costs include: Operating system overhead Lower resource density Slower startup compared with containers Potential overprovisioning VM-based infrastructure costs A VM can be mostly idle while still consuming infrastructure resources.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Immutable VM Images",
          slug: "6-9-immutable-vm-images",
          description: "A useful deployment principle is to build a complete image and deploy that artifact consistently. Conceptually: This reduces differences between environments.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A useful deployment principle is to build a complete image and deploy that artifact consistently.\n\nConceptually:\n\n```text\nSource\n  |\n  v\nBuild\n  |\n  v\nTested Image\n  |\n  v\nDeployment\n```\nThis reduces differences between environments.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Immutable VM Images**:\n\n```text\nSource\n  |\n  v\nBuild\n  |\n  v\nTested Image\n  |\n  v\nDeployment\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Container Deployment",
          slug: "6-10-container-deployment",
          description: "A container packages the service and its runtime dependencies into an isolated unit. **Example** Containers share the host kernel but isolate processes and filesystems.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A container packages the service and its runtime dependencies into an isolated unit.\n\n**Example**\n\n```text\nHost\n  |\n  +-- Container: Order\n  +-- Container: Payment\n  +-- Container: Catalog\n```\nContainers share the host kernel but isolate processes and filesystems.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Container Deployment**:\n\n```text\nHost\n  |\n  +-- Container: Order\n  +-- Container: Payment\n  +-- Container: Catalog\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Container Deployment** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Container Benefits",
          slug: "6-11-container-benefits",
          description: "**Advantages** Lightweight Fast startup Fast image creation Good isolation Portable packaging Clear management API Efficient resource utilization A cluster manager can place...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Advantages**\n\n- Lightweight\n- Fast startup\n- Fast image creation\n- Good isolation\n- Portable packaging\n- Clear management API\n- Efficient resource utilization\n\nA cluster manager can place containers across hosts based on available resources.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Container Benefits**. **Advantages** Lightweight Fast startup Fast image creation Good isolation Portable packaging Clear management API Efficient resource utilization A cluster manager can place containers across hosts based on available resources.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Container Orchestration",
          slug: "6-12-container-orchestration",
          description: "A cluster manager treats infrastructure as a pool of resources. It decides: Where a container runs When to restart it How many replicas are needed How resources are allocated...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A cluster manager treats infrastructure as a pool of resources.\n\nIt decides:\n\n- Where a container runs\n- When to restart it\n- How many replicas are needed\n- How resources are allocated\n- How services are exposed\n\nExamples include Kubernetes and other cluster schedulers.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Container Orchestration**. A cluster manager treats infrastructure as a pool of resources. It decides: Where a container runs When to restart it How many replicas are needed How resources are allocated How services are exposed Examples include Kubernetes and other cluster schedulers.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Container Orchestration** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Container Drawbacks",
          slug: "6-13-container-drawbacks",
          description: "Challenges include: Container infrastructure complexity Security considerations Image management Registry management Host administration Networking Observability Storage...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Challenges include:\n\n- Container infrastructure complexity\n- Security considerations\n- Image management\n- Registry management\n- Host administration\n- Networking\n- Observability\n- Storage management\n\nContainers share the host kernel, so the isolation model differs from a full VM.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Container Drawbacks**. Challenges include: Container infrastructure complexity Security considerations Image management Registry management Host administration Networking Observability Storage management Containers share the host kernel, so the isolation model differs from a full VM.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Serverless Deployment",
          slug: "6-14-serverless-deployment",
          description: "Serverless deployment removes much of the infrastructure management from the application team. A function is deployed, and the platform creates runtime instances as requests...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Serverless deployment removes much of the infrastructure management from the application team.\n\nA function is deployed, and the platform creates runtime instances as requests arrive.\n\nConceptually:\n\n```text\nEvent\n  |\n  v\nFunction\n  |\n  +--> Database\n  +--> Queue\n  +--> External Service\n```\nThe platform manages the underlying servers.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Serverless Deployment**:\n\n```text\nEvent\n  |\n  v\nFunction\n  |\n  +--> Database\n  +--> Queue\n  +--> External Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Stateless Functions",
          slug: "6-15-stateless-functions",
          description: "A serverless function should generally be designed as stateless. Do not rely on a local process remaining alive for a later request.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A serverless function should generally be designed as stateless.\n\nDo not rely on a local process remaining alive for a later request.\n\nPersistent state should live in an external service such as a database or object store.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Stateless Functions**. A serverless function should generally be designed as stateless. Do not rely on a local process remaining alive for a later request. Persistent state should live in an external service such as a database or object store.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Stateless Functions** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Function Invocation Styles",
          slug: "6-16-function-invocation-styles",
          description: "A function can be invoked: Directly by an API In response to an infrastructure event Through an API gateway On a schedule Examples of events include object creation, database...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A function can be invoked:\n\n- Directly by an API\n- In response to an infrastructure event\n- Through an API gateway\n- On a schedule\n\nExamples of events include object creation, database changes, or queue messages.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Function Invocation Styles**. A function can be invoked: Directly by an API In response to an infrastructure event Through an API gateway On a schedule Examples of events include object creation, database changes, or queue messages.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Benefits of Serverless",
          slug: "6-17-benefits-of-serverless",
          description: "Benefits include: Minimal infrastructure management Automatic scaling Pay-for-use pricing models Fast deployment Good fit for event-driven workloads",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Benefits include:\n\n- Minimal infrastructure management\n- Automatic scaling\n- Pay-for-use pricing models\n- Fast deployment\n- Good fit for event-driven workloads",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Benefits of Serverless**. Benefits include: Minimal infrastructure management Automatic scaling Pay-for-use pricing models Fast deployment Good fit for event-driven workloads\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Serverless Limitations",
          slug: "6-18-serverless-limitations",
          description: "Important limitations include: Execution time limits Cold starts Stateless execution model Runtime restrictions Limited suitability for long-running workloads Dependency on...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Important limitations include:\n\n- Execution time limits\n- Cold starts\n- Stateless execution model\n- Runtime restrictions\n- Limited suitability for long-running workloads\n- Dependency on platform-specific capabilities\n\nServerless is therefore not a universal replacement for containers or VMs.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Serverless Limitations**. Important limitations include: Execution time limits Cold starts Stateless execution model Runtime restrictions Limited suitability for long-running workloads Dependency on platform-specific capabilities Serverless is therefore not a universal replacement for containers or VMs.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Deployment Automation",
          slug: "6-19-deployment-automation",
          description: "A microservices organization should automate: Build Testing Packaging Image creation Deployment Scaling Health checks Rollback Monitoring Manual operations do not scale well...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A microservices organization should automate:\n\n- Build\n- Testing\n- Packaging\n- Image creation\n- Deployment\n- Scaling\n- Health checks\n- Rollback\n- Monitoring\n\nManual operations do not scale well when the number of services becomes large.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Deployment Automation**. A microservices organization should automate: Build Testing Packaging Image creation Deployment Scaling Health checks Rollback Monitoring Manual operations do not scale well when the number of services becomes large.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Deployment Automation** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Platform as a Service",
          slug: "6-20-platform-as-a-service",
          description: "A platform can provide: Runtime provisioning Service deployment Scaling Networking Health management Infrastructure abstraction This reduces the operational burden on...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A platform can provide:\n\n- Runtime provisioning\n- Service deployment\n- Scaling\n- Networking\n- Health management\n- Infrastructure abstraction\n\nThis reduces the operational burden on development teams.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Platform as a Service**. A platform can provide: Runtime provisioning Service deployment Scaling Networking Health management Infrastructure abstraction This reduces the operational burden on development teams.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Platform as a Service** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Multi-Environment Deployment",
          slug: "6-21-multi-environment-deployment",
          description: "A service should ideally be deployable consistently across: Development Test Staging Production The deployment artifact should remain predictable while environment-specific...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A service should ideally be deployable consistently across:\n\n- Development\n- Test\n- Staging\n- Production\n\nThe deployment artifact should remain predictable while environment-specific configuration is supplied separately.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Multi-Environment Deployment**. A service should ideally be deployable consistently across: Development Test Staging Production The deployment artifact should remain predictable while environment-specific configuration is supplied separately.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Multi-Environment Deployment** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Scaling Across Environments",
          slug: "6-22-scaling-across-environments",
          description: "A deployment architecture can use multiple infrastructure environments. For example: This can provide flexibility for traffic spikes when the architecture and networking...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A deployment architecture can use multiple infrastructure environments.\n\nFor example:\n\n```text\nOn-Premise capacity\n      |\n   capacity limit\n      |\n      v\n   Cloud capacity\n```\nThis can provide flexibility for traffic spikes when the architecture and networking strategy support it.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Scaling Across Environments**:\n\n```text\nOn-Premise capacity\n      |\n   capacity limit\n      |\n      v\n   Cloud capacity\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
      ],
    },
    {
      title: "Refactoring A Monolith Into Microservices",
      slug: "7-refactoring-a-monolith-into-microservices",
      description: "Refactoring A Monolith Into Microservices explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Do Not Rewrite Everything at Once",
          slug: "7-1-do-not-rewrite-everything-at-once",
          description: "A large existing application should generally not be rewritten from scratch merely to adopt microservices. A complete rewrite creates a large period where: Existing features...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A large existing application should generally not be rewritten from scratch merely to adopt microservices.\n\nA complete rewrite creates a large period where:\n\n- Existing features still need maintenance\n- New features still need delivery\n- The replacement system is incomplete\n- Teams must understand old and new systems\n- Business risk increases\n\nIncremental migration is safer.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Do Not Rewrite Everything at Once**. A large existing application should generally not be rewritten from scratch merely to adopt microservices. A complete rewrite creates a large period where: Existing features still need maintenance New features still need delivery The replacement system is incomplete Teams must understand old and new systems Business risk increases Incremental migration is safer.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Do Not Rewrite Everything at Once** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "The Strangler-Style Mental Model",
          slug: "7-2-the-strangler-style-mental-model",
          description: "A useful migration strategy is: The old application gradually becomes smaller.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A useful migration strategy is:\n\n```text\nExisting Application\n      |\n   Extract one capability\n      |\n      v\nExisting + New Service\n      |\n   Extract another\n      |\n      v\nSmaller Existing Application\n      |\n      v\nMore Independent Services\n```\nThe old application gradually becomes smaller.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **The Strangler-Style Mental Model**:\n\n```text\nExisting Application\n      |\n   Extract one capability\n      |\n      v\nExisting + New Service\n      |\n   Extract another\n      |\n      v\nSmaller Existing Application\n      |\n      v\nMore Independent Services\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Strategy 1 — Stop Digging",
          slug: "7-3-strategy-1-stop-digging",
          description: "When new functionality is needed, implement that functionality as a new service rather than adding more code to the existing monolith. **Example** **Benefits** Monolith stops...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "When new functionality is needed, implement that functionality as a new service rather than adding more code to the existing monolith.\n\n**Example**\n\n```text\nExisting Monolith\n   |\n   +-- old capabilities\n\nNew functionality\n   |\n   v\nNew Service\n```\n**Benefits**\n\n- Monolith stops growing\n- New service gets independent deployment\n- New functionality can use modern technology\n- Teams gain microservice experience\n\n**Limitation**\n\nThe old monolith remains.\n\nThis strategy prevents the problem from getting worse but does not immediately remove existing complexity.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Strategy 1 — Stop Digging**:\n\n```text\nExisting Monolith\n   |\n   +-- old capabilities\n\nNew functionality\n   |\n   v\nNew Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Strategy 1 — Stop Digging** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Strategy 2 — Split Frontend and Backend",
          slug: "7-4-strategy-2-split-frontend-and-backend",
          description: "Many enterprise applications have three broad areas: Presentation Business logic Data access A natural boundary often exists between presentation and backend functionality....",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Many enterprise applications have three broad areas:\n\n1. Presentation\n2. Business logic\n3. Data access\n\nA natural boundary often exists between presentation and backend functionality.\n\nMigration:\n\n```text\nBefore:\n\nBrowser\n   |\nMonolithic Application\n   |\nDatabase\n\nAfter:\n\nBrowser\n   |\nPresentation Application\n   |\n   | API\n   v\nBusiness/Data Application\n   |\nDatabase\n```\n**Benefits**\n\n- UI can evolve independently\n- UI deployment becomes independent\n- Backend gets a remote API\n- A useful boundary is created for later extraction\n\n**Limitation**\n\nThe backend may still be a large monolith.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Strategy 2 — Split Frontend and Backend**:\n\n```text\nBefore:\n\nBrowser\n   |\nMonolithic Application\n   |\nDatabase\n\nAfter:\n\nBrowser\n   |\nPresentation Application\n   |\n   | API\n   v\nBusiness/Data Application\n   |\nDatabase\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Strategy 2 — Split Frontend and Backend** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Strategy 3 — Extract Services",
          slug: "7-5-strategy-3-extract-services",
          description: "Existing modules can gradually become independent services. **Example** Extract Inventory: The monolith becomes smaller after every extraction.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Existing modules can gradually become independent services.\n\n**Example**\n\n```text\nMonolith\n  |\n  +-- Customer\n  +-- Order\n  +-- Inventory\n  +-- Reporting\n```\nExtract Inventory:\n\n```text\nMonolith\n  |\n  +-- Customer\n  +-- Order\n  +-- Reporting\n\nInventory Service\n  |\nInventory DB\n```\nThe monolith becomes smaller after every extraction.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Strategy 3 — Extract Services**:\n\n```text\nMonolith\n  |\n  +-- Customer\n  +-- Order\n  +-- Inventory\n  +-- Reporting\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Strategy 3 — Extract Services** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Choosing the First Module",
          slug: "7-6-choosing-the-first-module",
          description: "Not every module is equally valuable to extract first. Good candidates often have: Frequent changes Clear boundaries Independent business responsibility Distinct scaling...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Not every module is equally valuable to extract first.\n\nGood candidates often have:\n\n- Frequent changes\n- Clear boundaries\n- Independent business responsibility\n- Distinct scaling requirements\n- Strong resource requirements\n- Existing coarse-grained interfaces\n- Asynchronous communication boundaries\n\nStart with a manageable extraction to gain experience.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Choosing the First Module**. Not every module is equally valuable to extract first. Good candidates often have: Frequent changes Clear boundaries Independent business responsibility Distinct scaling requirements Strong resource requirements Existing coarse-grained interfaces Asynchronous communication boundaries Start with a manageable extraction to gain experience.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Frequently Changing Modules",
          slug: "7-7-frequently-changing-modules",
          description: "If a module changes frequently, extracting it can reduce release coordination. Instead of: the new service can be: This can accelerate delivery.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "If a module changes frequently, extracting it can reduce release coordination.\n\nInstead of:\n\n```text\nChange module\n   |\nRebuild entire monolith\n   |\nDeploy everything\n```\nthe new service can be:\n\n```text\nChange\n  |\nTest service\n  |\nDeploy service\n```\nThis can accelerate delivery.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Frequently Changing Modules**:\n\n```text\nChange module\n   |\nRebuild entire monolith\n   |\nDeploy everything\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Frequently Changing Modules** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Resource-Intensive Modules",
          slug: "7-8-resource-intensive-modules",
          description: "A module with unusual resource requirements is another good candidate. Examples: CPU-intensive processing Memory-intensive processing High network usage Specialized storage...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A module with unusual resource requirements is another good candidate.\n\nExamples:\n\n- CPU-intensive processing\n- Memory-intensive processing\n- High network usage\n- Specialized storage requirements\n\nExtraction allows the capability to be deployed on infrastructure suited to its workload.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Resource-Intensive Modules**. A module with unusual resource requirements is another good candidate. Examples: CPU-intensive processing Memory-intensive processing High network usage Specialized storage requirements Extraction allows the capability to be deployed on infrastructure suited to its workload.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Coarse-Grained Seams",
          slug: "7-9-coarse-grained-seams",
          description: "A seam is a boundary across which interaction is already relatively well isolated. Examples: Existing API Message-based integration Clear module interface Separate database...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A seam is a boundary across which interaction is already relatively well isolated.\n\nExamples:\n\n- Existing API\n- Message-based integration\n- Clear module interface\n- Separate database access layer\n\nA coarse-grained seam makes extraction cheaper and safer.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Coarse-Grained Seams**. A seam is a boundary across which interaction is already relatively well isolated. Examples: Existing API Message-based integration Clear module interface Separate database access layer A coarse-grained seam makes extraction cheaper and safer.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Coarse-Grained Seams** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Defining the Extraction API",
          slug: "7-10-defining-the-extraction-api",
          description: "Before moving a module, define how the monolith will communicate with the future service. Suppose Module Z is being extracted.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Before moving a module, define how the monolith will communicate with the future service.\n\nSuppose Module Z is being extracted.\n\nBefore:\n\n```text\nModule X -> Module Z -> Module Y\n```\nDuring extraction:\n\n```text\nModule X -> API -> Module Z\n                   |\n                   API\n                   v\n                Module Y\n```\nAfter extraction:\n\n```text\nModule X -> Service Z -> Module Y\n```\nThe interfaces should be coarse-grained rather than exposing every internal method.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Defining the Extraction API**:\n\n```text\nModule X -> Module Z -> Module Y\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Defining the Extraction API** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Inbound and Outbound Interfaces",
          slug: "7-11-inbound-and-outbound-interfaces",
          description: "The extracted service may need two directions of communication. Inbound: Outbound: The interfaces isolate the extracted component from the rest of the old system.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The extracted service may need two directions of communication.\n\nInbound:\n\n```text\nMonolith -> Service\n```\nOutbound:\n\n```text\nService -> Monolith\n```\nThe interfaces isolate the extracted component from the rest of the old system.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Inbound and Outbound Interfaces**:\n\n```text\nMonolith -> Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Inbound and Outbound Interfaces** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Anti-Corruption Layer",
          slug: "7-12-anti-corruption-layer",
          description: "If the new service uses a redesigned domain model, the integration layer can translate between the old model and the new model. **Example** This prevents legacy concepts from...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "If the new service uses a redesigned domain model, the integration layer can translate between the old model and the new model.\n\n**Example**\n\n```text\nOld Customer Model\n      |\nTranslation Layer\n      |\n      v\nNew Customer Model\n```\nThis prevents legacy concepts from contaminating the new service's internal design.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Anti-Corruption Layer**:\n\n```text\nOld Customer Model\n      |\nTranslation Layer\n      |\n      v\nNew Customer Model\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Anti-Corruption Layer** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Communication During Migration",
          slug: "7-13-communication-during-migration",
          description: "During migration, the service may use: REST Messaging RPC The choice should depend on interaction requirements and failure characteristics.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "During migration, the service may use:\n\n- REST\n- Messaging\n- RPC\n\nThe choice should depend on interaction requirements and failure characteristics.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Communication During Migration**. During migration, the service may use: REST Messaging RPC The choice should depend on interaction requirements and failure characteristics.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Communication During Migration** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Data Ownership During Migration",
          slug: "7-14-data-ownership-during-migration",
          description: "One of the hardest problems is data. Initially, the new service may need to coexist with the monolith's database.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "One of the hardest problems is data.\n\nInitially, the new service may need to coexist with the monolith's database.\n\nA migration can proceed through stages:\n\n1. Identify data owned by the future service.\n2. Define a stable API.\n3. Move write ownership.\n4. Synchronize or migrate required data.\n5. Update consumers.\n6. Remove old direct database access.\n\nThe objective is eventually to give the service clear ownership.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Data Ownership During Migration**. One of the hardest problems is data. Initially, the new service may need to coexist with the monolith's database. A migration can proceed through stages: Identify data owned by the future service.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Data Ownership During Migration** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Avoid Shared Database Coupling",
          slug: "7-15-avoid-shared-database-coupling",
          description: "If the new service directly modifies tables that remain controlled by the monolith, the migration has not created true independence. A better target is: Temporary shared access...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "If the new service directly modifies tables that remain controlled by the monolith, the migration has not created true independence.\n\nA better target is:\n\n```text\nService -> owns service data\nOther systems -> use service API/events\n```\nTemporary shared access may be necessary during migration, but it should be treated as transitional coupling.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Avoid Shared Database Coupling**:\n\n```text\nService -> owns service data\nOther systems -> use service API/events\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Avoid Shared Database Coupling** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Incremental Extraction Workflow",
          slug: "7-16-incremental-extraction-workflow",
          description: "A practical workflow is: Step 1: Identify a candidate capability. Step 2: Map dependencies.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A practical workflow is:\n\nStep 1:\nIdentify a candidate capability.\n\nStep 2:\nMap dependencies.\n\nStep 3:\nIdentify data ownership.\n\nStep 4:\nDefine a coarse-grained API.\n\nStep 5:\nIntroduce the integration boundary.\n\nStep 6:\nMove implementation behind the boundary.\n\nStep 7:\nDeploy the service independently.\n\nStep 8:\nMove consumers to the service.\n\nStep 9:\nRemove obsolete monolith code.\n\nStep 10:\nRemove obsolete data dependencies.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Incremental Extraction Workflow**. A practical workflow is: Step 1: Identify a candidate capability. Step 2: Map dependencies. Step 3: Identify data ownership.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Incremental Extraction Workflow** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Testing an Extracted Service",
          slug: "7-17-testing-an-extracted-service",
          description: "Tests should cover: Service behavior API contract Integration with legacy components Failure scenarios Data migration Compatibility Deployment behavior Contract testing is...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Tests should cover:\n\n- Service behavior\n- API contract\n- Integration with legacy components\n- Failure scenarios\n- Data migration\n- Compatibility\n- Deployment behavior\n\nContract testing is particularly useful when the service and consumers evolve independently.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Testing an Extracted Service**. Tests should cover: Service behavior API contract Integration with legacy components Failure scenarios Data migration Compatibility Deployment behavior Contract testing is particularly useful when the service and consumers evolve independently.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Testing an Extracted Service** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Observability During Migration",
          slug: "7-18-observability-during-migration",
          description: "Migration adds distributed interactions. Monitor: Request latency Error rate Dependency failures Event processing Database operations Traffic volume Service health Without...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Migration adds distributed interactions.\n\nMonitor:\n\n- Request latency\n- Error rate\n- Dependency failures\n- Event processing\n- Database operations\n- Traffic volume\n- Service health\n\nWithout visibility, it becomes difficult to determine whether the new architecture actually improves the system.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Observability During Migration**. Migration adds distributed interactions. Monitor: Request latency Error rate Dependency failures Event processing Database operations Traffic volume Service health Without visibility, it becomes difficult to determine whether the new architecture actually improves the system.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Observability During Migration** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Rollback Strategy",
          slug: "7-19-rollback-strategy",
          description: "Every extraction should have a rollback plan. Possible mechanisms: Feature flags Traffic switching Versioned deployments Reversible routing Data migration safeguards A...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Every extraction should have a rollback plan.\n\nPossible mechanisms:\n\n- Feature flags\n- Traffic switching\n- Versioned deployments\n- Reversible routing\n- Data migration safeguards\n\nA migration should not depend on an irreversible \"big bang\" cutover.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Rollback Strategy**. Every extraction should have a rollback plan. Possible mechanisms: Feature flags Traffic switching Versioned deployments Reversible routing Data migration safeguards A migration should not depend on an irreversible \"big bang\" cutover.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Microservice Chassis",
          slug: "7-20-microservice-chassis",
          description: "When many services need the same cross-cutting capabilities, a reusable service foundation can help. Common cross-cutting concerns include: Service discovery Configuration...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "When many services need the same cross-cutting capabilities, a reusable service foundation can help.\n\nCommon cross-cutting concerns include:\n\n- Service discovery\n- Configuration\n- Logging\n- Metrics\n- Health checks\n- Security\n- Communication\n- Resilience\n\nA shared service foundation reduces duplicated infrastructure code.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Microservice Chassis**. When many services need the same cross-cutting capabilities, a reusable service foundation can help. Common cross-cutting concerns include: Service discovery Configuration Logging Metrics Health checks Security Communication Resilience A shared service foundation reduces duplicated infrastructure code.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Microservice Chassis** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Why Incremental Migration Works",
          slug: "7-21-why-incremental-migration-works",
          description: "Each successful extraction provides: Operational experience Better understanding of service boundaries Reusable deployment patterns Better monitoring Reduced monolith size...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Each successful extraction provides:\n\n- Operational experience\n- Better understanding of service boundaries\n- Reusable deployment patterns\n- Better monitoring\n- Reduced monolith size\n- Faster independent delivery\n\nThe organization learns while migrating rather than betting everything on one large rewrite.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why Incremental Migration Works**. Each successful extraction provides: Operational experience Better understanding of service boundaries Reusable deployment patterns Better monitoring Reduced monolith size Faster independent delivery The organization learns while migrating rather than betting everything on one large rewrite.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why Incremental Migration Works** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
      ],
    },
    {
      title: "Cross-Cutting Architectural Concepts",
      slug: "8-cross-cutting-architectural-concepts",
      description: "Cross-Cutting Architectural Concepts explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Loose Coupling",
          slug: "8-1-loose-coupling",
          description: "Loose coupling means one component can change without requiring simultaneous changes elsewhere. Achieve it through: Clear APIs Private data Events Backward-compatible contracts...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Loose coupling means one component can change without requiring simultaneous changes elsewhere.\n\nAchieve it through:\n\n- Clear APIs\n- Private data\n- Events\n- Backward-compatible contracts\n- Coarse-grained interfaces",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Loose Coupling**. Loose coupling means one component can change without requiring simultaneous changes elsewhere. Achieve it through: Clear APIs Private data Events Backward-compatible contracts Coarse-grained interfaces\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "High Cohesion",
          slug: "8-2-high-cohesion",
          description: "A service should contain functionality that belongs together. A highly cohesive service has a focused business purpose.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A service should contain functionality that belongs together.\n\nA highly cohesive service has a focused business purpose.\n\nLow cohesion often results in a \"miscellaneous service\" containing unrelated responsibilities.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **High Cohesion**. A service should contain functionality that belongs together. A highly cohesive service has a focused business purpose. Low cohesion often results in a \"miscellaneous service\" containing unrelated responsibilities.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **High Cohesion** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Remote Calls Are Expensive",
          slug: "8-3-remote-calls-are-expensive",
          description: "A remote call has costs that a local method call does not: Serialization Network latency Connection management Failure Retries Authentication Monitoring Therefore service...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A remote call has costs that a local method call does not:\n\n- Serialization\n- Network latency\n- Connection management\n- Failure\n- Retries\n- Authentication\n- Monitoring\n\nTherefore service boundaries should minimize unnecessary chatty communication.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Remote Calls Are Expensive**. A remote call has costs that a local method call does not: Serialization Network latency Connection management Failure Retries Authentication Monitoring Therefore service boundaries should minimize unnecessary chatty communication.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Remote Calls Are Expensive** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Avoid Chatty APIs",
          slug: "8-4-avoid-chatty-apis",
          description: "Bad design: Better: The API should expose meaningful business operations.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Bad design:\n\n```text\nClient -> Service\nClient -> Service\nClient -> Service\nClient -> Service\nClient -> Service\n```\nBetter:\n\n```text\nClient -> Coarse-grained API\n             |\n             +--> internal operations\n```\nThe API should expose meaningful business operations.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Avoid Chatty APIs**:\n\n```text\nClient -> Service\nClient -> Service\nClient -> Service\nClient -> Service\nClient -> Service\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "Idempotency",
          slug: "8-5-idempotency",
          description: "An operation is idempotent if repeating it produces the same intended final state. For distributed systems, idempotency is critical because retries can cause duplicate requests.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "An operation is idempotent if repeating it produces the same intended final state.\n\nFor distributed systems, idempotency is critical because retries can cause duplicate requests.\n\n**Example**\n\n```text\nPUT /customers/10\nsame request repeated\n```\ncan safely produce the same customer state.\n\nFor payment operations, idempotency keys are especially important so a retry does not accidentally charge twice.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Idempotency**:\n\n```text\nPUT /customers/10\nsame request repeated\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Retry Strategy",
          slug: "8-6-retry-strategy",
          description: "Retries should be used carefully. Retrying a failed request may help with transient errors, but unlimited retries can amplify failures.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Retries should be used carefully.\n\nRetrying a failed request may help with transient errors, but unlimited retries can amplify failures.\n\nA safer approach includes:\n\n- Small retry counts\n- Backoff\n- Jitter\n- Timeouts\n- Circuit breakers\n- Idempotency",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Retry Strategy**. Retries should be used carefully. Retrying a failed request may help with transient errors, but unlimited retries can amplify failures. A safer approach includes: Small retry counts Backoff Jitter Timeouts Circuit breakers Idempotency\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Cascading Failure",
          slug: "8-7-cascading-failure",
          description: "A failure can spread through a dependency chain. **Example** If Inventory becomes slow, Order can accumulate waiting requests.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A failure can spread through a dependency chain.\n\n**Example**\n\n```text\nGateway\n   |\nOrder\n   |\nInventory\n   |\nDatabase\n```\nIf Inventory becomes slow, Order can accumulate waiting requests. Order then consumes all its threads and becomes slow. The gateway starts waiting on Order, and the entire system can degrade.\n\nControls include:\n\n- Timeouts\n- Bulkheads\n- Concurrency limits\n- Circuit breakers\n- Backpressure\n- Graceful degradation",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Cascading Failure**:\n\n```text\nGateway\n   |\nOrder\n   |\nInventory\n   |\nDatabase\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Bulkhead Concept",
          slug: "8-8-bulkhead-concept",
          description: "A bulkhead isolates resource pools. For example: If Payment becomes unhealthy, it should not consume every resource required by Catalog.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A bulkhead isolates resource pools.\n\nFor example:\n\n```text\nOrder -> separate connection pool\nPayment -> separate connection pool\nCatalog -> separate connection pool\n```\nIf Payment becomes unhealthy, it should not consume every resource required by Catalog.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Bulkhead Concept**:\n\n```text\nOrder -> separate connection pool\nPayment -> separate connection pool\nCatalog -> separate connection pool\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Bulkhead Concept** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Backpressure",
          slug: "8-9-backpressure",
          description: "Backpressure prevents producers from overwhelming consumers. In asynchronous systems, this may involve: Bounded queues Rate limits Consumer scaling Flow control",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Backpressure prevents producers from overwhelming consumers.\n\nIn asynchronous systems, this may involve:\n\n- Bounded queues\n- Rate limits\n- Consumer scaling\n- Flow control",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Backpressure**. Backpressure prevents producers from overwhelming consumers. In asynchronous systems, this may involve: Bounded queues Rate limits Consumer scaling Flow control\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Version Compatibility",
          slug: "8-10-version-compatibility",
          description: "Compatibility should be considered at every boundary: API schema Event schema Database migration Deployment version Client library Prefer additive changes where possible.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Compatibility should be considered at every boundary:\n\n- API schema\n- Event schema\n- Database migration\n- Deployment version\n- Client library\n\nPrefer additive changes where possible.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Version Compatibility**. Compatibility should be considered at every boundary: API schema Event schema Database migration Deployment version Client library Prefer additive changes where possible.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Version Compatibility** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Observability",
          slug: "8-11-observability",
          description: "A distributed application needs visibility across service boundaries. Useful signals include: Logs Metrics Traces Health checks Dependency latency Error rates Queue depth...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A distributed application needs visibility across service boundaries.\n\nUseful signals include:\n\n- Logs\n- Metrics\n- Traces\n- Health checks\n- Dependency latency\n- Error rates\n- Queue depth\n\nCorrelation IDs help connect operations across services.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Observability**. A distributed application needs visibility across service boundaries. Useful signals include: Logs Metrics Traces Health checks Dependency latency Error rates Queue depth Correlation IDs help connect operations across services.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Observability** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Security Boundaries",
          slug: "8-12-security-boundaries",
          description: "Each service boundary is a potential security boundary. Consider: Authentication Authorization TLS Secrets Service identity Network policy API gateway protection Rate limiting...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Each service boundary is a potential security boundary.\n\nConsider:\n\n- Authentication\n- Authorization\n- TLS\n- Secrets\n- Service identity\n- Network policy\n- API gateway protection\n- Rate limiting\n\nSecurity should not depend only on the assumption that internal traffic is trusted.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Security Boundaries**. Each service boundary is a potential security boundary. Consider: Authentication Authorization TLS Secrets Service identity Network policy API gateway protection Rate limiting Security should not depend only on the assumption that internal traffic is trusted.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Security Boundaries** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
      ],
    },
    {
      title: "Architectural Decision Guide",
      slug: "9-architectural-decision-guide",
      description: "Architectural Decision Guide explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "When to Prefer Synchronous Communication",
          slug: "9-1-when-to-prefer-synchronous-communication",
          description: "Synchronous communication is useful when: The caller needs an immediate result The operation is short Failure should be visible immediately The dependency is part of the...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Synchronous communication is useful when:\n\n- The caller needs an immediate result\n- The operation is short\n- Failure should be visible immediately\n- The dependency is part of the request's critical path\n\n**Example**\n\n```text\nCheckout -> Payment Authorization\n```",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **When to Prefer Synchronous Communication**:\n\n```text\nCheckout -> Payment Authorization\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "When to Prefer Asynchronous Communication",
          slug: "9-2-when-to-prefer-asynchronous-communication",
          description: "Asynchronous messaging is useful when: Work can happen later The producer should not wait Temporary consumer unavailability should be tolerated Multiple consumers need the same...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Asynchronous messaging is useful when:\n\n- Work can happen later\n- The producer should not wait\n- Temporary consumer unavailability should be tolerated\n- Multiple consumers need the same event\n- Work should be buffered\n\n**Example**\n\n```text\nOrderCreated -> Email + Analytics + Inventory\n```",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **When to Prefer Asynchronous Communication**:\n\n```text\nOrderCreated -> Email + Analytics + Inventory\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "When to Use an API Gateway",
          slug: "9-3-when-to-use-an-api-gateway",
          description: "Use a gateway when: Many services are exposed to clients Clients need aggregated responses Client-specific APIs are useful Authentication and routing need central control...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Use a gateway when:\n\n- Many services are exposed to clients\n- Clients need aggregated responses\n- Client-specific APIs are useful\n- Authentication and routing need central control\n- Internal topology should remain hidden",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When to Use an API Gateway**. Use a gateway when: Many services are exposed to clients Clients need aggregated responses Client-specific APIs are useful Authentication and routing need central control Internal topology should remain hidden\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **When to Use an API Gateway** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.",
            },
          ],
        },
        {
          title: "When Service Discovery Is Needed",
          slug: "9-4-when-service-discovery-is-needed",
          description: "Service discovery is particularly important when: Instances are dynamically created Addresses change Autoscaling is used Services run across multiple hosts Deployment replaces...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Service discovery is particularly important when:\n\n- Instances are dynamically created\n- Addresses change\n- Autoscaling is used\n- Services run across multiple hosts\n- Deployment replaces instances frequently",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When Service Discovery Is Needed**. Service discovery is particularly important when: Instances are dynamically created Addresses change Autoscaling is used Services run across multiple hosts Deployment replaces instances frequently\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **When Service Discovery Is Needed** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "When Event-Driven Data Management Is Useful",
          slug: "9-5-when-event-driven-data-management-is-useful",
          description: "It is valuable when: Multiple services react to business events Immediate global consistency is not mandatory Data must remain service-owned Read models need information from...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It is valuable when:\n\n- Multiple services react to business events\n- Immediate global consistency is not mandatory\n- Data must remain service-owned\n- Read models need information from multiple services\n- Work should be decoupled",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When Event-Driven Data Management Is Useful**. It is valuable when: Multiple services react to business events Immediate global consistency is not mandatory Data must remain service-owned Read models need information from multiple services Work should be decoupled\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **When Event-Driven Data Management Is Useful** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "When Containers Are Attractive",
          slug: "9-6-when-containers-are-attractive",
          description: "Containers are attractive when: Fast startup is important High service density is desired Deployment portability matters Orchestration infrastructure is available Services need...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Containers are attractive when:\n\n- Fast startup is important\n- High service density is desired\n- Deployment portability matters\n- Orchestration infrastructure is available\n- Services need isolated runtime environments",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When Containers Are Attractive**. Containers are attractive when: Fast startup is important High service density is desired Deployment portability matters Orchestration infrastructure is available Services need isolated runtime environments\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **When Containers Are Attractive** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "When Serverless Is Attractive",
          slug: "9-7-when-serverless-is-attractive",
          description: "Serverless works well for: Event handlers Short-lived APIs Scheduled jobs Bursty workloads Infrastructure-light applications It is less suitable for long-running stateful...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Serverless works well for:\n\n- Event handlers\n- Short-lived APIs\n- Scheduled jobs\n- Bursty workloads\n- Infrastructure-light applications\n\nIt is less suitable for long-running stateful processes.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When Serverless Is Attractive**. Serverless works well for: Event handlers Short-lived APIs Scheduled jobs Bursty workloads Infrastructure-light applications It is less suitable for long-running stateful processes.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "When Not to Split a Service",
          slug: "9-8-when-not-to-split-a-service",
          description: "Avoid extraction when: The boundary is unclear The services would constantly call each other Data is inseparable Independent deployment provides no meaningful benefit The...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Avoid extraction when:\n\n- The boundary is unclear\n- The services would constantly call each other\n- Data is inseparable\n- Independent deployment provides no meaningful benefit\n- The operational cost exceeds the business benefit",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **When Not to Split a Service**. Avoid extraction when: The boundary is unclear The services would constantly call each other Data is inseparable Independent deployment provides no meaningful benefit The operational cost exceeds the business benefit\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **When Not to Split a Service** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
      ],
    },
    {
      title: "End-To-End Microservices Example",
      slug: "10-end-to-end-microservices-example",
      description: "End-To-End Microservices Example explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Request Flow",
          slug: "10-1-request-flow",
          description: "Client: Gateway: Order Service: Inventory Service: Payment Service: Shipping Service: Notification Service:",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Client:\n\n```text\nPOST /orders\n```\nGateway:\n\n```text\nauthenticate\nvalidate request\nroute to Order Service\n```\nOrder Service:\n\n```text\ncreate order\npublish OrderCreated\n```\nInventory Service:\n\n```text\nconsume OrderCreated\nreserve inventory\npublish InventoryReserved\n```\nPayment Service:\n\n```text\nconsume OrderCreated\nauthorize payment\npublish PaymentAuthorized\n```\nShipping Service:\n\n```text\nconsume successful business events\nprepare shipment\n```\nNotification Service:\n\n```text\nconsume relevant events\nsend customer notification\n```",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Request Flow**:\n\n```text\nPOST /orders\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Request Flow** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Data Ownership",
          slug: "10-2-data-ownership",
          description: "Customer -> Customer DB No service directly modifies another service's database.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Customer -> Customer DB\n```text\nCatalog  -> Catalog DB\nOrder    -> Order DB\nInventory -> Inventory DB\nPayment  -> Payment DB\nShipping -> Shipping DB\n```\nNo service directly modifies another service's database.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Data Ownership**:\n\n```text\nCatalog  -> Catalog DB\nOrder    -> Order DB\nInventory -> Inventory DB\nPayment  -> Payment DB\nShipping -> Shipping DB\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Data Ownership** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Failure Example",
          slug: "10-3-failure-example",
          description: "Suppose Inventory is unavailable. Order Service may still record the order and publish the event.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Suppose Inventory is unavailable.\n\nOrder Service may still record the order and publish the event.\n\nThe Inventory Service processes the event later.\n\nThis creates eventual consistency.\n\nIf the business requires the order to remain pending until inventory is confirmed, the Order Service can represent states such as:\n\n```text\nPENDING\n   |\ninventory reserved\n   |\nCONFIRMED\n```\nThe state machine makes asynchronous progress explicit.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Failure Example**:\n\n```text\nPENDING\n   |\ninventory reserved\n   |\nCONFIRMED\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Failure Example** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Payment Failure",
          slug: "10-4-payment-failure",
          description: "If payment authorization fails: The Order Service can move the order to a failed or payment-required state. The correct response depends on business rules.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "If payment authorization fails:\n\n```text\nPaymentFailed\n```\nThe Order Service can move the order to a failed or payment-required state.\n\nThe correct response depends on business rules.\n\nThe important architectural point is that services communicate state changes rather than sharing database transactions.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Payment Failure**:\n\n```text\nPaymentFailed\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Payment Failure** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
      ],
    },
    {
      title: "Common Design Mistakes",
      slug: "11-common-design-mistakes",
      description: "Common Design Mistakes explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Making Services Too Small",
          slug: "11-1-making-services-too-small",
          description: "A service should not be split merely because a class exists. Too many tiny services create: Network overhead Deployment overhead More monitoring More discovery entries More...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A service should not be split merely because a class exists.\n\nToo many tiny services create:\n\n- Network overhead\n- Deployment overhead\n- More monitoring\n- More discovery entries\n- More failure points",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Making Services Too Small**. A service should not be split merely because a class exists. Too many tiny services create: Network overhead Deployment overhead More monitoring More discovery entries More failure points\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Making Services Too Small** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "Shared Database as a Permanent Architecture",
          slug: "11-2-shared-database-as-a-permanent-architecture",
          description: "If every service reads and writes all tables, service boundaries become mostly organizational labels. True independence requires meaningful data ownership.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "If every service reads and writes all tables, service boundaries become mostly organizational labels.\n\nTrue independence requires meaningful data ownership.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Shared Database as a Permanent Architecture**. If every service reads and writes all tables, service boundaries become mostly organizational labels. True independence requires meaningful data ownership.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Shared Database as a Permanent Architecture** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "Ignoring Partial Failure",
          slug: "11-3-ignoring-partial-failure",
          description: "Assuming a remote service always responds leads to thread exhaustion and cascading failures. Always consider: Timeout Retry Circuit breaker Fallback Concurrency limit",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Assuming a remote service always responds leads to thread exhaustion and cascading failures.\n\nAlways consider:\n\n- Timeout\n- Retry\n- Circuit breaker\n- Fallback\n- Concurrency limit",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Ignoring Partial Failure**. Assuming a remote service always responds leads to thread exhaustion and cascading failures. Always consider: Timeout Retry Circuit breaker Fallback Concurrency limit\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Ignoring Partial Failure** when deciding how a service should be structured or integrated with the rest of the system.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Synchronous Chains That Are Too Long",
          slug: "11-4-synchronous-chains-that-are-too-long",
          description: "**Example** Each dependency adds latency and failure probability. Prefer asynchronous communication or composition strategies where appropriate.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Example**\n\n```text\nGateway -> A -> B -> C -> D -> E\n```\nEach dependency adds latency and failure probability.\n\nPrefer asynchronous communication or composition strategies where appropriate.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Synchronous Chains That Are Too Long**:\n\n```text\nGateway -> A -> B -> C -> D -> E\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "Putting Business Logic in the Gateway",
          slug: "11-5-putting-business-logic-in-the-gateway",
          description: "The gateway should generally focus on: Routing Authentication Composition Protocol adaptation Cross-cutting traffic concerns Business ownership should remain inside services.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "The gateway should generally focus on:\n\n- Routing\n- Authentication\n- Composition\n- Protocol adaptation\n- Cross-cutting traffic concerns\n\nBusiness ownership should remain inside services.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Putting Business Logic in the Gateway**. The gateway should generally focus on: Routing Authentication Composition Protocol adaptation Cross-cutting traffic concerns Business ownership should remain inside services.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Putting Business Logic in the Gateway** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "No API Versioning Strategy",
          slug: "11-6-no-api-versioning-strategy",
          description: "Old and new service versions can coexist during deployment. Contracts must tolerate this transition.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Old and new service versions can coexist during deployment.\n\nContracts must tolerate this transition.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **No API Versioning Strategy**. Old and new service versions can coexist during deployment. Contracts must tolerate this transition.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **No API Versioning Strategy** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Non-Idempotent Event Processing",
          slug: "11-7-non-idempotent-event-processing",
          description: "Consumers should assume duplicates can occur unless the messaging infrastructure provides stronger guarantees and the business logic can rely on them.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Consumers should assume duplicates can occur unless the messaging infrastructure provides stronger guarantees and the business logic can rely on them.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Non-Idempotent Event Processing**. Consumers should assume duplicates can occur unless the messaging infrastructure provides stronger guarantees and the business logic can rely on them.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Non-Idempotent Event Processing** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Treating Events as Commands",
          slug: "11-8-treating-events-as-commands",
          description: "An event should describe something that happened. A command asks a specific service to do something.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "An event should describe something that happened.\n\nA command asks a specific service to do something.\n\nMixing these semantics creates unnecessary coupling.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Treating Events as Commands**. An event should describe something that happened. A command asks a specific service to do something. Mixing these semantics creates unnecessary coupling.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Treating Events as Commands** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Ignoring Operational Complexity",
          slug: "11-9-ignoring-operational-complexity",
          description: "A microservices architecture needs: Automated deployment Monitoring Centralized logging Service discovery Health checks Incident response Distributed tracing Architecture is...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A microservices architecture needs:\n\n- Automated deployment\n- Monitoring\n- Centralized logging\n- Service discovery\n- Health checks\n- Incident response\n- Distributed tracing\n\nArchitecture is not complete when the code compiles.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Ignoring Operational Complexity**. A microservices architecture needs: Automated deployment Monitoring Centralized logging Service discovery Health checks Incident response Distributed tracing Architecture is not complete when the code compiles.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Ignoring Operational Complexity** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
      ],
    },
    {
      title: "Revision Questions",
      slug: "12-revision-questions",
      description: "Revision Questions explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "What problem do microservices solve?",
          slug: "12-1-what-problem-do-microservices-solve",
          description: "They primarily help manage complexity and enable independent development, deployment, and scaling of business capabilities.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "They primarily help manage complexity and enable independent development, deployment, and scaling of business capabilities.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What problem do microservices solve?**. They primarily help manage complexity and enable independent development, deployment, and scaling of business capabilities.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Are microservices simply small services?",
          slug: "12-2-are-microservices-simply-small-services",
          description: "No. Small size is not the primary goal.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "No. Small size is not the primary goal. Meaningful independence and useful boundaries are more important.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Are microservices simply small services?**. No. Small size is not the primary goal. Meaningful independence and useful boundaries are more important.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Are microservices simply small services?** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Why does each service usually own its data?",
          slug: "12-3-why-does-each-service-usually-own-its-data",
          description: "Private data ownership reduces coupling and allows services to evolve independently.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Private data ownership reduces coupling and allows services to evolve independently.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why does each service usually own its data?**. Private data ownership reduces coupling and allows services to evolve independently.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why does each service usually own its data?** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "What is an API Gateway?",
          slug: "12-4-what-is-an-api-gateway",
          description: "It is an intermediary entry point that hides internal service topology and can perform routing, composition, authentication, caching, traffic management, and protocol translation.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It is an intermediary entry point that hides internal service topology and can perform routing, composition, authentication, caching, traffic management, and protocol translation.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is an API Gateway?**. It is an intermediary entry point that hides internal service topology and can perform routing, composition, authentication, caching, traffic management, and protocol translation.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **What is an API Gateway?** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Why not let clients call every service directly?",
          slug: "12-5-why-not-let-clients-call-every-service-directly",
          description: "That exposes internal architecture, creates many network calls, increases client complexity, and makes service refactoring harder.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "That exposes internal architecture, creates many network calls, increases client complexity, and makes service refactoring harder.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why not let clients call every service directly?**. That exposes internal architecture, creates many network calls, increases client complexity, and makes service refactoring harder.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why not let clients call every service directly?** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "What is service discovery?",
          slug: "12-6-what-is-service-discovery",
          description: "It is the mechanism used to locate currently available service instances in a dynamic environment.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It is the mechanism used to locate currently available service instances in a dynamic environment.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is service discovery?**. It is the mechanism used to locate currently available service instances in a dynamic environment.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **What is service discovery?** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Client-side vs server-side discovery?",
          slug: "12-7-client-side-vs-server-side-discovery",
          description: "Client-side discovery makes the client query the registry and select an instance. Server-side discovery puts the selection responsibility in a router or load balancer.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Client-side discovery makes the client query the registry and select an instance. Server-side discovery puts the selection responsibility in a router or load balancer.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Client-side vs server-side discovery?**. Client-side discovery makes the client query the registry and select an instance. Server-side discovery puts the selection responsibility in a router or load balancer.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "What is eventual consistency?",
          slug: "12-8-what-is-eventual-consistency",
          description: "It means related distributed state may temporarily differ but is expected to converge after successful propagation and processing.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It means related distributed state may temporarily differ but is expected to converge after successful propagation and processing.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is eventual consistency?**. It means related distributed state may temporarily differ but is expected to converge after successful propagation and processing.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **What is eventual consistency?** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Why is distributed data difficult?",
          slug: "12-9-why-is-distributed-data-difficult",
          description: "A single database transaction cannot automatically span independent service-owned databases without introducing distributed transaction coordination.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "A single database transaction cannot automatically span independent service-owned databases without introducing distributed transaction coordination.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why is distributed data difficult?**. A single database transaction cannot automatically span independent service-owned databases without introducing distributed transaction coordination.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Why is distributed data difficult?** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
        {
          title: "What is event sourcing?",
          slug: "12-10-what-is-event-sourcing",
          description: "It stores state-changing events as the primary historical record so current state can be reconstructed by replaying those events.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It stores state-changing events as the primary historical record so current state can be reconstructed by replaying those events.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is event sourcing?**. It stores state-changing events as the primary historical record so current state can be reconstructed by replaying those events.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "What is CQRS?",
          slug: "12-11-what-is-cqrs",
          description: "It separates command-side state changes from query-side read models.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It separates command-side state changes from query-side read models.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is CQRS?**. It separates command-side state changes from query-side read models.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **What is CQRS?** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Why are timeouts important?",
          slug: "12-12-why-are-timeouts-important",
          description: "Without timeouts, unavailable dependencies can hold resources indefinitely and cause cascading failures.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Without timeouts, unavailable dependencies can hold resources indefinitely and cause cascading failures.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why are timeouts important?**. Without timeouts, unavailable dependencies can hold resources indefinitely and cause cascading failures.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Include explicit failure handling because remote dependencies can become slow, unavailable, or partially failed.",
            },
          ],
        },
        {
          title: "What does a circuit breaker do?",
          slug: "12-13-what-does-a-circuit-breaker-do",
          description: "It stops sending requests to a dependency that is consistently failing and allows controlled recovery attempts later.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It stops sending requests to a dependency that is consistently failing and allows controlled recovery attempts later.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What does a circuit breaker do?**. It stops sending requests to a dependency that is consistently failing and allows controlled recovery attempts later.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **What does a circuit breaker do?** as part of the architectural decision process for a distributed application.\n- Connect the idea to service ownership, communication, failure handling, and operational needs before applying it.",
            },
          ],
        },
        {
          title: "Why is idempotency important?",
          slug: "12-14-why-is-idempotency-important",
          description: "Distributed retries and duplicate messages can otherwise cause the same business operation to be applied multiple times.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Distributed retries and duplicate messages can otherwise cause the same business operation to be applied multiple times.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Why is idempotency important?**. Distributed retries and duplicate messages can otherwise cause the same business operation to be applied multiple times.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "What is polyglot persistence?",
          slug: "12-15-what-is-polyglot-persistence",
          description: "It is the use of different storage technologies for different service workloads.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It is the use of different storage technologies for different service workloads.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is polyglot persistence?**. It is the use of different storage technologies for different service workloads.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **What is polyglot persistence?** when deciding how a service should be structured or integrated with the rest of the system.",
            },
          ],
        },
        {
          title: "Containers vs VMs?",
          slug: "12-16-containers-vs-vms",
          description: "VMs provide stronger machine-level isolation with more overhead. Containers provide lighter isolation and faster startup while sharing the host kernel.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "VMs provide stronger machine-level isolation with more overhead. Containers provide lighter isolation and faster startup while sharing the host kernel.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Containers vs VMs?**. VMs provide stronger machine-level isolation with more overhead. Containers provide lighter isolation and faster startup while sharing the host kernel.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "What is serverless?",
          slug: "12-17-what-is-serverless",
          description: "It is a deployment model where the platform manages the underlying server infrastructure and executes application functions on demand.",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "It is a deployment model where the platform manages the underlying server infrastructure and executes application functions on demand.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **What is serverless?**. It is a deployment model where the platform manages the underlying server infrastructure and executes application functions on demand.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "How should a monolith be migrated?",
          slug: "12-18-how-should-a-monolith-be-migrated",
          description: "Prefer incremental extraction over a complete rewrite. Stop adding unnecessary functionality to the monolith, establish boundaries, split presentation where useful, and extract...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Prefer incremental extraction over a complete rewrite. Stop adding unnecessary functionality to the monolith, establish boundaries, split presentation where useful, and extract well-defined modules one at a time.",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **How should a monolith be migrated?**. Prefer incremental extraction over a complete rewrite. Stop adding unnecessary functionality to the monolith, establish boundaries, split presentation where useful, and extract well-defined modules one at a time.\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
      ],
    },
    {
      title: "Revision Questions",
      slug: "13-final-mental-model",
      description: "Revision Questions explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Final Mental Model",
          slug: "13-final-mental-model",
          description: "A complete microservices architecture can be understood as a set of connected responsibilities: The most important architectural principles are: Split by meaningful business capabi",
          estimatedMinutes: 6,
          sections: [
            {
              title: "Detailed explanation",
              content: "A complete microservices architecture can be understood as a set of connected responsibilities:\n\n```text\nBUSINESS BOUNDARIES\n      |\n      v\nINDEPENDENT SERVICES\n      |\n      +------------------+\n      |                  |\n      v                  v\n  SYNCHRONOUS        ASYNCHRONOUS\n  COMMUNICATION      COMMUNICATION\n      |                  |\n      +--------+---------+\n               |\n               v\n         SERVICE DISCOVERY\n               |\n               v\n          DATA OWNERSHIP\n               |\n               v\n      EVENTUAL CONSISTENCY\n               |\n               v\n          DEPLOYMENT\n               |\n      +--------+---------+\n      |        |         |\n      v        v         v\n     VM     Container  Serverless\n               |\n               v\n          AUTOMATION\n               |\n               v\n          OBSERVABILITY\n               |\n               v\n         RESILIENT SYSTEM\n```\nThe most important architectural principles are:\n\n1. Split by meaningful business capability.\n2. Give services clear ownership.\n3. Keep data private to the owning service.\n4. Communicate through explicit contracts.\n5. Expect network calls to fail.\n6. Use timeouts and resilience mechanisms.\n7. Use asynchronous events where decoupling is valuable.\n8. Design APIs for independent evolution.\n9. Automate deployment and operations.\n10. Scale services according to their individual needs.\n11. Do not create tiny services simply for the sake of size.\n12. Migrate large existing applications incrementally.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Final Mental Model**:\n\n```text\nBUSINESS BOUNDARIES\n      |\n      v\nINDEPENDENT SERVICES\n      |\n      +------------------+\n      |                  |\n      v                  v\n  SYNCHRONOUS        ASYNCHRONOUS\n  COMMUNICATION      COMMUNICATION\n      |                  |\n      +--------+---------+\n               |\n               v\n         SERVICE DISCOVERY\n               |\n               v\n          DATA OWNERSHIP\n               |\n               v\n      EVENTUAL CONSISTENCY\n               |\n               v\n          DEPLOYMENT\n               |\n      +--------+---------+\n      |        |         |\n      v        v         v\n     VM     Container  Serverless\n               |\n               v\n          AUTOMATION\n               |\n               v\n          OBSERVABILITY\n               |\n               v\n         RESILIENT SYSTEM\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Final Mental Model** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
      ],
    },
    {
      title: "Revision Questions",
      slug: "14-practical-checklist",
      description: "Revision Questions explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Practical Checklist",
          slug: "14-practical-checklist",
          description: "**Architecture** [ ] Are service boundaries based on business capabilities? [ ] Does each service have a clear owner?",
          estimatedMinutes: 6,
          sections: [
            {
              title: "Detailed explanation",
              content: "**Architecture**\n[ ] Are service boundaries based on business capabilities?\n[ ] Does each service have a clear owner?\n[ ] Can services be deployed independently?\n[ ] Are unnecessary synchronous dependencies avoided?\n\n**Communication**\n[ ] Are APIs explicitly defined?\n[ ] Are contracts backward compatible?\n[ ] Are timeouts configured?\n[ ] Are retries limited and safe?\n[ ] Are circuit breakers or equivalent protections used where needed?\n[ ] Are operations idempotent?\n\n**Data**\n[ ] Does each service own its data?\n[ ] Are cross-service joins avoided?\n[ ] Are events used for required propagation?\n[ ] Are eventual consistency requirements understood?\n[ ] Are duplicate events handled safely?\n\n**Discovery**\n[ ] Can instances change location?\n[ ] Is service discovery available?\n[ ] Are health checks implemented?\n[ ] Is registry infrastructure highly available?\n\n**Deployment**\n[ ] Are builds automated?\n[ ] Are deployments repeatable?\n[ ] Are service instances isolated appropriately?\n[ ] Is scaling automated?\n[ ] Is rollback possible?\n\n**Operations**\n[ ] Are logs centralized?\n[ ] Are metrics collected?\n[ ] Are traces or correlation identifiers available?\n[ ] Are service health and dependency health visible?\n[ ] Are alerts tied to meaningful user impact?\n\nMigration:\n[ ] Is the monolith being changed incrementally?\n[ ] Is a clear extraction candidate selected?\n[ ] Are dependencies mapped?\n[ ] Is a coarse-grained API defined?\n[ ] Is data ownership moving toward the extracted service?\n[ ] Can the old code be removed after migration?",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Practical Checklist**. **Architecture** [ ] Are service boundaries based on business capabilities? [ ] Does each service have a clear owner? [ ] Can services be deployed independently?\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Practical Checklist** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
      ],
    },
    {
      title: "Quick Comparison Tables",
      slug: "15-quick-comparison-tables",
      description: "Quick Comparison Tables explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Monolith vs Microservices",
          slug: "15-1-monolith-vs-microservices",
          description: "Monolith: One primary deployment unit Local method calls Often shared database Simple initial operations Scaling usually affects the application as a whole Technology changes...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Monolith:\n- One primary deployment unit\n- Local method calls\n- Often shared database\n- Simple initial operations\n- Scaling usually affects the application as a whole\n- Technology changes can be difficult across the whole codebase\n\nMicroservices:\n- Multiple deployment units\n- Network or messaging communication\n- Service-owned data\n- More operational complexity\n- Independent scaling\n- Independent technology evolution",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Monolith vs Microservices**. Monolith: One primary deployment unit Local method calls Often shared database Simple initial operations Scaling usually affects the application as a whole Technology changes can be difficult across the whole codebase Microservices: Multiple deployment units Network or messaging communication Service-owned data More operational complexity Independent scaling Independent technology evolution\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Monolith vs Microservices** when deciding how a service should be structured or integrated with the rest of the system.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.\n- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.\n- Apply the incremental approach when moving an existing application toward independently deployable services.",
            },
          ],
        },
        {
          title: "Synchronous vs Asynchronous",
          slug: "15-2-synchronous-vs-asynchronous",
          description: "Synchronous: Immediate response expected Caller usually waits Simple request/response semantics Direct dependency on availability Useful for immediate decisions Asynchronous:...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Synchronous:\n- Immediate response expected\n- Caller usually waits\n- Simple request/response semantics\n- Direct dependency on availability\n- Useful for immediate decisions\n\nAsynchronous:\n- Caller does not need immediate response\n- Work can be buffered\n- Better decoupling\n- Natural support for events\n- Requires more careful message processing",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Synchronous vs Asynchronous**. Synchronous: Immediate response expected Caller usually waits Simple request/response semantics Direct dependency on availability Useful for immediate decisions Asynchronous: Caller does not need immediate response Work can be buffered Better decoupling Natural support for events Requires more careful message processing\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the described communication approach when decoupling, buffering, or event propagation is important.",
            },
          ],
        },
        {
          title: "Client-Side vs Server-Side Discovery",
          slug: "15-3-client-side-vs-server-side-discovery",
          description: "Client-side: Client queries registry Client selects instance More client responsibility Application-specific load balancing is possible Server-side: Router selects instance...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Client-side:\n- Client queries registry\n- Client selects instance\n- More client responsibility\n- Application-specific load balancing is possible\n\nServer-side:\n- Router selects instance\n- Client remains unaware of registry\n- Centralized infrastructure\n- Platform can provide the capability",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Client-Side vs Server-Side Discovery**. Client-side: Client queries registry Client selects instance More client responsibility Application-specific load balancing is possible Server-side: Router selects instance Client remains unaware of registry Centralized infrastructure Platform can provide the capability\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use discovery and health information instead of relying on fixed service-instance locations.",
            },
          ],
        },
        {
          title: "VM vs Container",
          slug: "15-4-vm-vs-container",
          description: "VM: Full guest operating system Strong isolation More overhead Mature infrastructure Container: Shared host kernel Lightweight Fast startup High deployment density Requires...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "VM:\n- Full guest operating system\n- Strong isolation\n- More overhead\n- Mature infrastructure\n\nContainer:\n- Shared host kernel\n- Lightweight\n- Fast startup\n- High deployment density\n- Requires container management infrastructure",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **VM vs Container**. VM: Full guest operating system Strong isolation More overhead Mature infrastructure Container: Shared host kernel Lightweight Fast startup High deployment density Requires container management infrastructure\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use the deployment guidance to choose an appropriate runtime boundary and automate repeatable delivery.",
            },
          ],
        },
        {
          title: "Event-Driven vs Shared Database",
          slug: "15-5-event-driven-vs-shared-database",
          description: "Event-driven: Service-owned data Loose coupling Eventual consistency More complex synchronization Better independent evolution Shared database: Easy joins Easy ACID...",
          estimatedMinutes: 5,
          sections: [
            {
              title: "Detailed explanation",
              content: "Event-driven:\n- Service-owned data\n- Loose coupling\n- Eventual consistency\n- More complex synchronization\n- Better independent evolution\n\nShared database:\n- Easy joins\n- Easy ACID transactions\n- Strong coupling\n- Schema coordination\n- Limits service autonomy",
            },
            {
              title: "Example",
              content: "Suppose a system needs to apply the situation described for **Event-Driven vs Shared Database**. Event-driven: Service-owned data Loose coupling Eventual consistency More complex synchronization Better independent evolution Shared database: Easy joins Easy ACID transactions Strong coupling Schema coordination Limits service autonomy\n\nThe example should be evaluated using the same ownership, communication, failure, and deployment considerations described in the topic.",
            },
            {
              title: "Practical use",
              content: "- Use **Event-Driven vs Shared Database** when deciding how a service should be structured or integrated with the rest of the system.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
      ],
    },
    {
      title: "Quick Comparison Tables",
      slug: "16-final-revision-summary",
      description: "Quick Comparison Tables explained through clear architectural concepts, examples, trade-offs, and practical guidance.",
      topics: [
        {
          title: "Final Revision Summary",
          slug: "16-final-revision-summary",
          description: "Microservices are best understood as an architectural approach for controlling complexity in large, continuously evolving applications. The architecture begins with meaningful busi",
          estimatedMinutes: 6,
          sections: [
            {
              title: "Detailed explanation",
              content: "Microservices are best understood as an architectural approach for controlling complexity in large, continuously evolving applications.\n\nThe architecture begins with meaningful business boundaries. Each service owns a focused capability and normally controls its own data.\n\nBecause services run as independent processes, communication must be designed deliberately. Synchronous request/response is useful when an immediate result is required. Asynchronous messaging is useful for decoupling, buffering, event propagation, and one-to-many communication.\n\nAn API Gateway can provide a stable client-facing entry point while hiding internal service structure. Service discovery solves the problem of dynamically locating service instances.\n\nPrivate service-owned databases improve independence but create distributed data-management challenges. Event-driven architecture, local transactions, event records, transaction-log techniques, event sourcing, CQRS, and materialized views provide different ways to manage those challenges.\n\nDeployment must be automated because a real microservices system can contain many services and many runtime instances. Virtual machines, containers, and serverless functions represent different deployment trade-offs.\n\nWhen starting with an existing monolith, incremental migration is safer than a complete rewrite. New functionality can be built separately, presentation and backend layers can be separated, and existing modules can be extracted one at a time.\n\nThe central lesson is:\n\n```text\nMicroservices are not primarily about making things small.\n\nThey are about creating boundaries that allow software\nto evolve, deploy, scale, and fail independently.\n```\nA successful architecture balances:\n\n```text\nBusiness boundaries\n+ API design\n+ Communication\n+ Data ownership\n+ Resilience\n+ Discovery\n+ Deployment\n+ Automation\n+ Observability\n```\nWhen these concerns are designed together, microservices can provide the organizational and technical independence needed by large, evolving applications.",
            },
            {
              title: "Example",
              content: "Consider the following flow related to **Final Revision Summary**:\n\n```text\nMicroservices are not primarily about making things small.\n\nThey are about creating boundaries that allow software\nto evolve, deploy, scale, and fail independently.\n```\n\nThe flow illustrates the relationship described in the explanation. The important part is to understand what crosses the service boundary and which component owns the responsibility.",
            },
            {
              title: "Practical use",
              content: "- Use **Final Revision Summary** when deciding how a service should be structured or integrated with the rest of the system.\n- Treat the interface as an explicit contract so consumers can evolve without depending on internal implementation details.\n- Use the described communication approach when decoupling, buffering, or event propagation is important.\n- Apply the data-ownership guidance when deciding where state should live and how changes should propagate between services.",
            },
          ],
        },
      ],
    },
];

const microservicesCategory: CategorySeed = {
  name: "Microservices",
  slug: "microservices",
  description: "Learn microservices architecture through service boundaries, communication, data management, discovery, deployment, migration, resilience, and practical architectural decisions.",
  icon: "MICROSERVICES",
  sortOrder: 0,
  paths: [
    {
      name: "Microservices",
      slug: "microservices",
      description: "A structured learning path covering the architecture and practical design of microservices systems.",
      level: StudyLevel.INTERMEDIATE,
      modules,
    },
  ],
};

async function ensureCategory(categorySeed: CategorySeed) {
  const category = await prisma.studyCategory.upsert({
    where: { name: categorySeed.name },
    update: {
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
    create: {
      name: categorySeed.name,
      slug: categorySeed.slug,
      description: categorySeed.description,
      icon: categorySeed.icon,
      isPublished: true,
      sortOrder: categorySeed.sortOrder,
    },
  });

  for (let pathIndex = 0; pathIndex < categorySeed.paths.length; pathIndex += 1) {
    const pathSeed = categorySeed.paths[pathIndex];

    const path = await prisma.studyPath.upsert({
      where: {
        categoryId_level: {
          categoryId: category.id,
          level: pathSeed.level,
        },
      },
      update: {
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: pathIndex,
      },
      create: {
        categoryId: category.id,
        name: pathSeed.name,
        slug: pathSeed.slug,
        description: pathSeed.description,
        level: pathSeed.level,
        isPublished: true,
        sortOrder: pathIndex,
      },
    });

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex += 1) {
      const moduleSeed = pathSeed.modules[moduleIndex];

      const studyModule = await prisma.studyModule.upsert({
        where: {
          studyPathId_slug: {
            studyPathId: path.id,
            slug: moduleSeed.slug,
          },
        },
        update: {
          title: moduleSeed.title,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
        create: {
          studyPathId: path.id,
          title: moduleSeed.title,
          slug: moduleSeed.slug,
          description: moduleSeed.description,
          sortOrder: moduleIndex,
          isPublished: true,
        },
      });

      for (let topicIndex = 0; topicIndex < moduleSeed.topics.length; topicIndex += 1) {
        const topicSeed = moduleSeed.topics[topicIndex];
        const topicSlug = `${pathSeed.slug}-${topicSeed.slug}`;

        const topic = await prisma.studyTopic.upsert({
          where: {
            categoryId_slug: {
              categoryId: category.id,
              slug: topicSlug,
            },
          },
          update: {
            title: topicSeed.title,
            moduleId: studyModule.id,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
          },
          create: {
            categoryId: category.id,
            moduleId: studyModule.id,
            title: topicSeed.title,
            slug: topicSlug,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
          },
        });

        for (let sectionIndex = 0; sectionIndex < topicSeed.sections.length; sectionIndex += 1) {
          const section = topicSeed.sections[sectionIndex];

          await prisma.studyTopicSection.upsert({
            where: {
              id: `${topic.id}-section-${sectionIndex}`,
            },
            update: {
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
            create: {
              id: `${topic.id}-section-${sectionIndex}`,
              topicId: topic.id,
              title: section.title,
              content: section.content,
              sortOrder: sectionIndex,
            },
          });
        }
      }
    }
  }

  return category;
}

async function main() {
  const category = await ensureCategory(microservicesCategory);
  const pathCount = microservicesCategory.paths.length;
  const moduleCount = modules.length;
  const topicCount = modules.reduce((total, module) => total + module.topics.length, 0);
  const sectionCount = modules.reduce(
    (total, module) =>
      total +
      module.topics.reduce(
        (moduleTotal, topic) => moduleTotal + topic.sections.length,
        0
      ),
    0
  );

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
