import { PrismaClient, StudyLevel } from "@prisma/client";
import { ultraExplanationSection } from "./seed-topic-enrichment";

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

        const sections = [...topicSeed.sections, ultraExplanationSection(topicSeed, moduleSeed.title, pathSeed.name)];
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

async function seedApiWebServicesCategory() {
  const category: CategorySeed = {
    name: "API & Web Services",
    slug: "api-web-services",
    description: "Master API design, development, and management: REST, SOAP, GraphQL, gRPC, security, versioning, and microservices.",
    icon: "API",
    sortOrder: 23,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the fundamentals of APIs, HTTP, REST principles, and basic API design.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "API Fundamentals",
            slug: "api-fundamentals",
            description: "What APIs are, HTTP, REST, and best practices.",
            topics: [
              {
                title: "Introduction to APIs – The Building Blocks of Modern Software",
                slug: "intro-api",
                shortDescription: "Definition, types, and importance.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is an API?", content: "API stands for Application Programming Interface. It's a contract that allows different software applications to communicate with each other. Think of it as a waiter in a restaurant: you (the client) tell the waiter (the API) what you want, and the waiter takes your order to the kitchen (the server) and brings back the food (the response). The API defines the methods (e.g., `GET`, `POST`), the data formats (JSON, XML), and the endpoints (URLs). Without APIs, apps couldn't talk to each other." },
                  { title: "Types of APIs", content: "There are several styles:\n- **REST** (Representational State Transfer): Most common, uses HTTP methods, JSON/XML, stateless.\n- **SOAP** (Simple Object Access Protocol): XML‑based, strict standards, enterprise.\n- **GraphQL**: A query language that allows clients to ask for exactly what they need.\n- **gRPC**: High‑performance RPC using Protocol Buffers, often used for internal microservices.\n- **WebSockets**: Bidirectional, real‑time communication.\nEach has its strengths; REST is the default choice for public APIs." },
                  { title: "Why APIs Matter", content: "APIs are the glue that connects applications, enabling microservices, mobile apps, third‑party integrations, and cloud services. They allow teams to work independently and decouple frontend from backend. In the modern web, almost every app consumes or provides APIs." },
                  { title: "The API Economy", content: "Companies like Stripe, Twilio, and Google make billions by offering APIs. APIs are also key to opening data to partners and building ecosystems. Knowing how to design and consume APIs is a core skill for any developer." },
                ],
              },
              {
                title: "HTTP Fundamentals – The Language of the Web",
                slug: "http-basics",
                shortDescription: "Methods, status codes, headers, and request/response structure.",
                estimatedMinutes: 26,
                sections: [
                  { title: "HTTP Methods – The Actions", content: "HTTP defines a set of methods that indicate the desired action on a resource:\n- **GET**: Retrieve data (safe, idempotent).\n- **POST**: Create a new resource (not idempotent, may have side effects).\n- **PUT**: Replace an existing resource (idempotent).\n- **PATCH**: Partial update (not necessarily idempotent).\n- **DELETE**: Remove a resource (idempotent).\n\n**Idempotency** means that making the same request multiple times has the same effect as making it once. GET, PUT, DELETE are idempotent; POST is not. This matters for retries." },
                  { title: "Status Codes – The Result", content: "Status codes tell you the outcome of the request:\n- **1xx**: Informational (rarely used in APIs).\n- **2xx**: Success – 200 OK, 201 Created, 204 No Content.\n- **3xx**: Redirection – 301 Moved Permanently, 302 Found.\n- **4xx**: Client errors – 400 Bad Request (invalid input), 401 Unauthorized (missing auth), 403 Forbidden (no permission), 404 Not Found.\n- **5xx**: Server errors – 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.\nAlways return the most appropriate status code to help clients handle errors gracefully." },
                  { title: "Headers – The Metadata", content: "Headers provide context about the request/response. Key ones:\n- `Content‑Type`: What format the body is in (e.g., `application/json`).\n- `Accept`: What format the client wants (content negotiation).\n- `Authorization`: Credentials (e.g., `Bearer` token).\n- `Cache‑Control`: Caching policies.\n- `User‑Agent`: Identifies the client.\n- `CORS` headers: Control cross‑origin requests.\nHeaders are case‑insensitive but conventionally use Capital‑Hyphen format." },
                  { title: "Request/Response Body", content: "The body of a request (for POST/PUT/PATCH) or response contains the data payload. Most modern APIs use JSON because it's lightweight and easy for both humans and machines to read. XML is still used in SOAP and legacy systems. Use consistent field naming (e.g., `camelCase` or `snake_case`) and include schema documentation." },
                ],
              },
              {
                title: "REST Principles – The Philosophy Behind RESTful APIs",
                slug: "rest-principles",
                shortDescription: "Resources, URIs, statelessness, and HTTP verbs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "The Six Constraints", content: "REST is defined by six architectural constraints:\n1. **Client‑Server**: Separation of concerns – UI and data storage are independent.\n2. **Stateless**: Each request from client to server must contain all necessary information; the server doesn't store client state between requests (simplifies scaling).\n3. **Cacheable**: Responses must indicate whether they are cacheable; clients and intermediaries can cache to improve performance.\n4. **Layered**: A client cannot tell if it's talking to the end server or an intermediary (like a load balancer).\n5. **Uniform Interface**: The key to REST – identifies resources (nouns), uses representations, and uses standard methods.\n6. **Code‑on‑Demand (optional)**: Servers can extend functionality by sending code (e.g., JavaScript)." },
                  { title: "Resources and URIs", content: "Resources are the entities your API exposes – e.g., `User`, `Order`, `Product`. URIs (URLs) identify resources: `/users/123`, `/orders/456`. Use plural nouns for collections: `/users`, `/orders`. Avoid verbs in URIs – the HTTP method is the verb." },
                  { title: "Statelessness Explained", content: "In a stateless API, every request from the client must contain all information needed to process it – including authentication, user context, and parameters. This makes scaling horizontally easy (any server can handle any request). However, it means you can't rely on server‑side sessions; use tokens (JWT) or include session IDs in requests." },
                  { title: "Using HTTP Verbs Correctly", content: "Follow the semantics:\n- GET /users – list users (safe, cacheable).\n- GET /users/123 – get a user.\n- POST /users – create a user (provide data in body).\n- PUT /users/123 – replace entire user.\n- PATCH /users/123 – partially update user.\n- DELETE /users/123 – delete user.\nUsing verbs correctly improves predictability and allows infrastructure like CDNs to cache intelligently." },
                ],
              },
              {
                title: "API Design Best Practices – Crafting Good APIs",
                slug: "api-design",
                shortDescription: "Naming, consistency, versioning, and error handling.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Consistent Naming", content: "Use nouns, not verbs. Follow a pattern: `/resources`, `/resources/{id}`, `/resources/{id}/subresources`. Use kebab‑case or snake‑case consistently (e.g., `user‑profiles` or `user_profiles`). Be consistent across the whole API." },
                  { title: "Versioning – How to Evolve Your API", content: "APIs change over time. Common versioning strategies:\n- **URL versioning**: `/v1/users` – easy, visible, used widely.\n- **Header versioning**: `Accept‑Version: v1` – keeps URIs clean.\n- **Query parameter**: `/users?version=1` – less common.\n- **Content negotiation**: `Accept: application/vnd.company.v1+json`.\nURL versioning is the most straightforward; plan for backward compatibility and deprecate old versions gradually." },
                  { title: "Error Handling – Tell Clients What Went Wrong", content: "Return appropriate status codes and a consistent error structure. Example:\n```json\n{\n    \"error\": {\n        \"code\": \"INVALID_INPUT\",\n        \"message\": \"The email field is required\",\n        \"details\": { \"field\": \"email\", \"reason\": \"missing\" }\n    }\n}\n```\nInclude a unique error code for troubleshooting. Never expose internal stack traces or sensitive information." },
                  { title: "Pagination and Filtering", content: "For collections, implement pagination to avoid returning huge datasets. Common approaches: `limit` and `offset`, or `cursor`‑based pagination (more efficient for large data). Allow filtering with query parameters (e.g., `/users?status=active`). Sorting: `/users?sort=name:asc`." },
                  { title: "Idempotency – Ensuring Safe Retries", content: "Idempotent operations (GET, PUT, DELETE) can be retried without side effects. For POST (non‑idempotent), use an **Idempotency‑Key** header: the client sends a unique key; if the server receives the same key twice, it returns the same response without creating a duplicate. This is crucial for payment processing and other critical operations." },
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
        description: "Dive into API security, documentation, testing, and advanced REST patterns.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "API Security",
            slug: "api-security",
            description: "Authentication, authorization, and common attacks.",
            topics: [
              {
                title: "Authentication Methods – Who Are You?",
                slug: "auth-methods",
                shortDescription: "API keys, Basic Auth, JWT, OAuth2, OpenID Connect.",
                estimatedMinutes: 26,
                sections: [
                  { title: "API Keys – Simple but Risky", content: "API keys are a shared secret (like a password) that clients include in requests. They are easy to use but easy to leak. Use them only for low‑risk public APIs and rotate them regularly." },
                  { title: "Basic Authentication – Old but Works", content: "Base64 encode `username:password` in the `Authorization` header. Always use HTTPS! Not secure without encryption; avoid for production." },
                  { title: "JWT (JSON Web Tokens) – Stateless and Scalable", content: "A JWT is a signed token (with a secret or public/private key) that contains claims (user ID, roles, expiry). It's stateless – no server‑side session storage. Popular in modern APIs. Example format: `header.payload.signature`. Always use strong signing algorithms (e.g., RS256) and short expiration times." },
                  { title: "OAuth2 and OpenID Connect – Delegated Authorization", content: "OAuth2 allows a user to grant a third‑party app limited access to their data (e.g., 'login with Google'). OpenID Connect (OIDC) adds an identity layer. OAuth2 flows: Authorization Code (most secure), Implicit (deprecated), Client Credentials (machine‑to‑machine). Use with care; tokens should be short‑lived." },
                ],
              },
              {
                title: "Common API Attacks – Defending Your API",
                slug: "api-attacks",
                shortDescription: "Injection, broken authentication, excessive data exposure, and rate limiting.",
                estimatedMinutes: 24,
                sections: [
                  { title: "SQL Injection and Parameterized Queries", content: "Never concatenate user input directly into SQL queries. Use parameterized queries (with `?` placeholders) or ORMs to automatically escape input. This prevents attackers from injecting malicious SQL." },
                  { title: "Broken Object Level Authorization (BOLA)", content: "Ensure users can only access resources they are allowed to. For example, if a user has `user_id=5`, they should not be able to request `/users/6`. Always check permissions on the server side." },
                  { title: "Rate Limiting – Preventing Abuse", content: "Rate limiting restricts the number of requests a client can make in a given time window. This protects your API from DoS attacks and abuse. Implement algorithms like token bucket or fixed window. Return `429 Too Many Requests` with a `Retry‑After` header." },
                  { title: "Excessive Data Exposure", content: "Only return fields that the client needs. Avoid sending sensitive data (e.g., passwords, personal info) unless required. Use sparse fields (`?fields=id,name`) to allow clients to choose." },
                ],
              },
            ],
          },
          {
            title: "API Documentation",
            slug: "api-documentation",
            description: "OpenAPI/Swagger, Postman, and interactive docs.",
            topics: [
              {
                title: "OpenAPI (Swagger) – The Specification Standard",
                slug: "openapi",
                shortDescription: "The standard for describing REST APIs.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is OpenAPI?", content: "OpenAPI (formerly Swagger) is a specification for describing REST APIs in a human‑ and machine‑readable format (YAML or JSON). It defines endpoints, request/response schemas, parameters, authentication, and more." },
                  { title: "Key Components", content: "**Info**: API title, version, description. **Paths**: endpoints and operations. **Parameters**: query, path, header. **Request Body**: schema of expected data. **Responses**: status codes and schemas. **Security**: authentication methods. **Schemas**: data models (using JSON Schema)." },
                  { title: "Tools", content: "**Swagger UI**: Interactive documentation from your OpenAPI spec. **Swagger Editor**: Online editor to write specs. **Code Generators**: Generate client SDKs and server stubs from the spec (OpenAPI Generator, Swagger Codegen)." },
                  { title: "Writing a Simple OpenAPI Spec", content: "Example YAML:\n```yaml\nopenapi: 3.0.0\ninfo:\n  title: Sample API\n  version: 1.0.0\npaths:\n  /users:\n    get:\n      summary: List users\n      responses:\n        '200':\n          description: OK\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: '#/components/schemas/User'\n```" },
                ],
              },
              {
                title: "API Testing – Ensuring Reliability",
                slug: "api-testing",
                shortDescription: "Unit, integration, and contract testing.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Unit Tests", content: "Test individual components (e.g., service classes) in isolation using mocks. Use frameworks like JUnit (Java), pytest (Python), or Mocha (JavaScript)." },
                  { title: "Integration Tests", content: "Test the full stack – call real endpoints with a test database. Use tools like Testcontainers or in‑memory databases. Ensure your API behaves correctly with real dependencies." },
                  { title: "Contract Testing – Consumer‑Driven", content: "With microservices, consumer and provider must agree on the API contract. **Pact** is a tool where consumers write expectations, and providers verify them. This catches integration issues early and prevents breaking changes." },
                ],
              },
            ],
          },
          {
            title: "SOAP Web Services – XML‑Based Enterprise",
            slug: "soap",
            description: "XML‑based, WS‑* standards, and use cases.",
            topics: [
              {
                title: "SOAP Basics – The Old Guard",
                slug: "soap-basics",
                shortDescription: "Envelope, header, body, and WSDL.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is SOAP?", content: "SOAP (Simple Object Access Protocol) is an XML‑based messaging protocol used for web services. It's strict, extensible, and heavily standardised. A SOAP message is an XML document containing an **Envelope** (which contains a **Header** and a **Body**). It can be sent over any transport (HTTP, SMTP, etc.), but HTTP is most common." },
                  { title: "WSDL – The Service Contract", content: "WSDL (Web Services Description Language) is an XML document that describes the service: operations, input/output types, and binding. Clients use it to generate stubs. WSDL is often auto‑generated by the service." },
                  { title: "When to Use SOAP", content: "SOAP shines in enterprise environments where high security (WS‑Security), ACID transactions, and strict standards are required. Often used in banking, healthcare, and government systems. But it's heavy and complex compared to REST." },
                ],
              },
              {
                title: "SOAP vs REST – When to Choose",
                slug: "soap-vs-rest",
                shortDescription: "Comparison and selection criteria.",
                estimatedMinutes: 20,
                sections: [
                  { title: "SOAP", content: "**Pros**: Built‑in error handling, WS‑Security, ACID, stateful possible. **Cons**: XML only, heavy, slower." },
                  { title: "REST", content: "**Pros**: Lightweight, JSON, fast, stateless, easy to cache. **Cons**: No built‑in security (must be added), no standard transaction support." },
                  { title: "Decision Guide", content: "Use SOAP for banking, financial, and internal enterprise integrations that require high security and transactional guarantees. Use REST for public APIs, mobile apps, and microservices." },
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
        description: "GraphQL, gRPC, API gateways, event‑driven APIs, and microservices.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "GraphQL – Flexible Data Fetching",
            slug: "graphql",
            description: "Query language for APIs, with strong typing and flexible data fetching.",
            topics: [
              {
                title: "GraphQL Basics – Ask for What You Need",
                slug: "graphql-basics",
                shortDescription: "Schema, queries, mutations, and subscriptions.",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is GraphQL?", content: "GraphQL is a query language for APIs developed by Facebook. Instead of multiple REST endpoints, a GraphQL API has a single endpoint (usually `/graphql`). Clients send queries that specify exactly which fields they need. This reduces over‑fetching (getting too much data) and under‑fetching (not getting enough)." },
                  { title: "Schema Definition – The Contract", content: "The schema defines types, fields, and operations. Example:\n```graphql\ntype User {\n  id: ID!\n  name: String!\n  email: String\n}\ntype Query {\n  user(id: ID!): User\n}\ntype Mutation {\n  createUser(name: String!, email: String): User\n}\n```\nExclamation marks denote required fields." },
                  { title: "Resolvers – Filling the Fields", content: "Each field in the schema has a resolver function that fetches the data. Resolvers can be async and may call databases, REST APIs, or other services. GraphQL orchestrates the resolvers to build the complete response." },
                  { title: "Benefits and Trade‑offs", content: "**Benefits**: Flexible queries, single endpoint, strong typing, introspection. **Trade‑offs**: More complex to implement, harder to cache, potential for expensive nested queries (solve with query depth limiting and cost analysis)." },
                ],
              },
              {
                title: "GraphQL Advanced – Federation, Caching, and Security",
                slug: "graphql-advanced",
                shortDescription: "Federation, caching, and security.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Federation – Combining Services", content: "GraphQL Federation allows multiple GraphQL services to be combined into a single graph. Each service manages its own types and fields. The gateway composes them. This is great for microservices architectures." },
                  { title: "Caching", content: "Client‑side caching (Apollo Client) is easy: it uses normalized caches. Server‑side caching can be done at the CDN or with caching layers like Redis for expensive resolvers." },
                  { title: "Security", content: "Implement query depth limiting to prevent recursive attacks. Use query cost analysis to limit resource usage. Add authentication via JWT and authorization at the resolver level." },
                ],
              },
            ],
          },
          {
            title: "gRPC – High‑Performance RPC",
            slug: "grpc",
            description: "High‑performance RPC framework with Protocol Buffers.",
            topics: [
              {
                title: "gRPC Basics – Fast and Typed",
                slug: "grpc-basics",
                shortDescription: "Protocol Buffers, service definitions, and streaming.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is gRPC?", content: "gRPC is a modern RPC framework developed by Google. It uses **Protocol Buffers** (protobuf) for serialization, which is binary and much faster than JSON. It runs over HTTP/2, supporting multiplexing and streaming." },
                  { title: "Protocol Buffers – The Data Definition", content: "Define messages in `.proto` files. Example:\n```protobuf\nmessage User {\n  int32 id = 1;\n  string name = 2;\n}\n```\nThe `=1` is a field number for binary encoding. Code generators produce client and server stubs." },
                  { title: "Service Definition", content: "Define services with RPC methods:\n```protobuf\nservice UserService {\n  rpc GetUser (GetUserRequest) returns (User);\n  rpc ListUsers (Empty) returns (stream User);\n}\n```\nSupports unary (single request, single response), server streaming, client streaming, and bidirectional streaming." },
                  { title: "Benefits", content: "High performance (binary protocol), strong typing, cross‑language support (many languages), built‑in load balancing, and streaming." },
                ],
              },
              {
                title: "gRPC vs REST – When to Choose",
                slug: "grpc-vs-rest",
                shortDescription: "When to choose gRPC over REST.",
                estimatedMinutes: 20,
                sections: [
                  { title: "gRPC", content: "Faster, binary, supports streaming, strongly typed contracts. Good for microservices, real‑time systems, internal APIs." },
                  { title: "REST", content: "Simpler, human‑readable, broad tooling, easy for public APIs. Good for browser‑based apps and public APIs." },
                  { title: "Decision", content: "Use gRPC for internal, high‑throughput, low‑latency services. Use REST for public APIs where simplicity and tooling matter." },
                ],
              },
            ],
          },
          {
            title: "API Gateways and Management",
            slug: "api-gateways",
            description: "Kong, Apigee, AWS API Gateway – routing, rate limiting, and analytics.",
            topics: [
              {
                title: "API Gateway Functions – The Front Door",
                slug: "gateway-functions",
                shortDescription: "Routing, composition, rate limiting, authentication.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is an API Gateway?", content: "An API Gateway is a single entry point for all client requests. It handles:\n- **Routing**: Forwarding requests to the appropriate microservice.\n- **Authentication**: Validating tokens before passing the request.\n- **Rate Limiting**: Enforcing quotas.\n- **Response Aggregation**: Combining results from multiple services.\n- **Logging and Monitoring**: Collecting metrics." },
                  { title: "Routing and Load Balancing", content: "Gateways route requests based on path, headers, or other criteria. They can also perform load balancing among multiple instances of a service." },
                  { title: "Rate Limiting – Implementation", content: "The gateway can enforce rate limits per client (by API key, IP address, or user). Implement algorithms like token bucket or fixed window. Return `429 Too Many Requests` with `Retry-After`." },
                  { title: "Authentication and Authorization", content: "The gateway can validate JWT tokens, check API keys, or perform OAuth2 flows. It then forwards the user context to downstream services." },
                ],
              },
              {
                title: "Popular API Gateways",
                slug: "gateway-tools",
                shortDescription: "Kong, Tyk, Apigee, AWS API Gateway.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Kong", content: "Open‑source, plugin‑based (plugins for auth, rate limiting, logging). Built on Nginx. Highly extensible." },
                  { title: "AWS API Gateway", content: "Managed, fully integrated with AWS services (Lambda, Cognito, CloudWatch). Supports WebSocket and REST." },
                  { title: "Apigee", content: "Enterprise‑grade, Google Cloud. Provides analytics, monetization, and developer portal." },
                  { title: "Tyk", content: "Open‑source, supports both REST and GraphQL. Good for internal and public APIs." },
                ],
              },
            ],
          },
          {
            title: "Event‑Driven APIs",
            slug: "event-driven",
            description: "Webhooks, server‑sent events, and message queues.",
            topics: [
              {
                title: "Webhooks – Reverse APIs",
                slug: "webhooks",
                shortDescription: "Callbacks that are triggered by events.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What are Webhooks?", content: "A webhook is a user‑defined HTTP callback that is triggered by an event (e.g., payment success, order placed). Instead of the client polling for updates, the server sends a POST request to the client's URL." },
                  { title: "Implementation", content: "The client registers a URL with the API. When the event occurs, the API sends a POST with event data. Always use HTTPS and verify signatures (using HMAC) to ensure authenticity." },
                  { title: "Retry and Delivery", content: "Implement exponential backoff retries for failed deliveries. Use a queue (like RabbitMQ) to manage webhook delivery." },
                ],
              },
              {
                title: "Server‑Sent Events (SSE) and WebSockets",
                slug: "sse-websockets",
                shortDescription: "Real‑time communication patterns.",
                estimatedMinutes: 20,
                sections: [
                  { title: "SSE – Server to Client", content: "SSE allows the server to push events to the client over HTTP. The client opens a connection, and the server sends `text/event‑stream` messages. Simple, uses HTTP/2, works over HTTPS. Good for real‑time notifications and feeds." },
                  { title: "WebSockets – Bidirectional", content: "WebSockets provide a full‑duplex, persistent connection between client and server. Ideal for chat, gaming, and collaborative apps. More complex than SSE." },
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
        description: "Common API & Web Services interview questions, design problems, and comparisons.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "core-concepts-api",
            description: "REST, SOAP, GraphQL, and design principles.",
            topics: [
              {
                title: "REST vs SOAP vs GraphQL",
                slug: "rest-soap-graphql-interview",
                shortDescription: "Compare and contrast.",
                estimatedMinutes: 20,
                sections: [
                  { title: "REST", content: "Stateless, resource‑based, uses HTTP verbs, supports multiple formats. Best for public APIs." },
                  { title: "SOAP", content: "Strict, XML‑only, WS‑Security, stateful possible. Best for enterprise." },
                  { title: "GraphQL", content: "Flexible queries, single endpoint, strong typing. Best when clients need different data shapes." },
                ],
              },
              {
                title: "RESTful Design Principles",
                slug: "rest-design-interview",
                shortDescription: "Resources, URIs, methods, and status codes.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Resources", content: "Use nouns, not verbs. Collections: plural (e.g., `/users`). Item: `/users/{id}`." },
                  { title: "HTTP Methods", content: "GET (safe, idempotent), POST (create), PUT (replace), PATCH (partial), DELETE (idempotent)." },
                  { title: "Status Codes", content: "Use proper codes: 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 404 (Not Found), 500 (Server Error)." },
                ],
              },
              {
                title: "API Security",
                slug: "security-interview",
                shortDescription: "Authentication, authorization, and common attacks.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JWT vs OAuth2", content: "JWT is stateless, OAuth2 is a delegation framework. Often used together." },
                  { title: "Common Threats", content: "SQL Injection (use parameterized queries), BOLA (check permissions), DoS (rate limit), XSS (sanitise input)." },
                ],
              },
              {
                title: "Versioning and Caching",
                slug: "versioning-caching-interview",
                shortDescription: "How to version and cache APIs.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Versioning", content: "URL versioning (`/v1`) is most common. Also header or query parameter." },
                  { title: "Caching", content: "Use Cache‑Control headers, ETags, and CDNs. Understand when to invalidate." },
                ],
              },
            ],
          },
          {
            title: "Design Scenarios",
            slug: "design-scenarios-api",
            description: "Design APIs for real‑world problems.",
            topics: [
              {
                title: "Design a REST API for a Library System",
                slug: "library-api",
                shortDescription: "Books, users, borrowing.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Resources", content: "/books, /users, /loans." },
                  { title: "Endpoints", content: "GET /books, POST /loans, GET /users/{id}/loans, etc." },
                  { title: "Authentication", content: "JWT for users and admins." },
                ],
              },
              {
                title: "Design a GraphQL API for E‑Commerce",
                slug: "graphql-ecommerce",
                shortDescription: "Products, orders, cart.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Schema", content: "Product, Order, User types. Queries: product(id), products. Mutations: addToCart, checkout." },
                  { title: "Performance", content: "Use dataloaders to avoid N+1 queries." },
                ],
              },
              {
                title: "Design a Webhook System",
                slug: "webhook-design",
                shortDescription: "Allow external services to subscribe to events.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Registration", content: "Users register a URL and events they want to receive." },
                  { title: "Delivery", content: "Send POST requests with event payload. Use HMAC signatures." },
                  { title: "Retry", content: "Implement exponential backoff and a dead letter queue." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ API & Web Services category seeded (ultra‑detailed)");
}

async function main() {
  await seedApiWebServicesCategory();
}

main()
  .catch((error) => {
    console.error("API & Web Services seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });