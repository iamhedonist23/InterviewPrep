import { PrismaClient, Difficulty, ExperienceLevel, InterviewType } from "@prisma/client";
import { articleSeeds } from "./article-seed";
import { categories, originalTopics, topics, situationalContexts, slugify } from "./question-data";
const prisma = new PrismaClient();

// ---- UPDATED CATEGORIES (added 11 new) ----
// (categories, originalTopics, topics, situationalContexts, slugify now live
// in ./question-data.ts - shared with prisma/cleanup-old-questions.ts)
/* const categories = [
  // Existing categories
  ["Software Developer", "Technology"], ["Android Developer", "Technology"], ["Java Developer", "Technology"], ["Kotlin Developer", "Technology"], ["Python Developer", "Technology"], ["JavaScript Developer", "Technology"], ["React Developer", "Technology"], ["Web Developer", "Technology"], ["SQL", "Technology"], ["QA Tester", "Technology"], ["Data Analyst", "Technology"], ["Sales", "Business"], ["Marketing", "Business"], ["Human Resources", "Business"], ["Customer Support", "Business"], ["Accountant", "Finance"], ["Banking", "Finance"], ["Finance", "Finance"], ["Fresher", "General"], ["Internship", "General"], ["HR", "General"], ["Behavioral", "General"], ["Situational", "General"],
  // ---- NEW CATEGORIES ----
  ["Presales", "Business"],
  ["Digital Marketing", "Business"],
  ["API & Web Services", "Technology"],
  ["Computer Science", "Technology"],
  ["Cybersecurity", "Technology"],
  ["Generative AI", "Technology"],
  ["Data Science", "Technology"],
  ["DevOps", "Technology"],
  ["HTML & CSS", "Technology"],
  ["Software Engineer", "Technology"],
  ["Machine Learning", "Technology"],
] as const;

// ---- Original 24 topics (kept intact) ----
const originalTopics = [
  ["Software Developer", "How would you design a reliable service that processes customer requests?", "architecture", "Describe the trade-offs behind your design and how you would keep it observable.", "A strong answer starts with clear requirements, separated responsibilities, and failure handling...", "I would start by clarifying the functional and non-functional requirements..."],
  ["Android Developer", "How would you make an Android screen load quickly on a slow connection?", "performance", "Explain the measurements and improvements you would make before release.", "I would measure the current load time under throttled network conditions...", "I would first measure the screen load time and identify the bottlenecks..."],
  ["Java Developer", "What makes a Java application maintainable as its team grows?", "maintainability", "Connect design choices to testing and team communication.", "Maintainability comes from clean boundaries, clear conventions, and automated confidence...", "A maintainable Java application is built around clear boundaries..."],
  ["Kotlin Developer", "When would you use a sealed class in Kotlin?", "language", "Give a practical example and acknowledge alternatives.", "I would use a sealed class when a value can only be one of a known set of related types...", "I would use a sealed class when I need a closed set of related types..."],
  ["Python Developer", "How do you investigate a Python function that has become slow?", "debugging", "Walk through a measured investigation rather than guessing.", "I would reproduce the issue and profile it first...", "I would start by reproducing the slowdown and measuring the actual bottleneck..."],
  ["JavaScript Developer", "How do you prevent an asynchronous JavaScript feature from showing stale data?", "async", "Explain the race condition and the control you would introduce.", "I would prevent stale results by tracking request versions...", "The key is to make each request or state update traceable..."],
  ["React Developer", "How do you decide where state should live in a React application?", "state", "Compare local, shared, and server state with a concrete example.", "I would keep state close to where it is used and only lift it when multiple components need to share it...", "I keep state as close as possible to the component or feature that owns it..."],
  ["Web Developer", "What makes a web form accessible and resilient?", "accessibility", "Describe how you build and test it.", "Accessibility comes from clear labels, logical focus flow, and validation...", "A good form is understandable, keyboard-friendly, and resilient to real user error..."],
  ["SQL", "How would you find and fix a slow SQL query?", "databases", "Explain the evidence you would gather before changing the query.", "I would inspect the execution plan, spot expensive operations...", "I would start with the execution plan and query timing..."],
  ["QA Tester", "How do you choose a useful regression test suite?", "quality", "Balance risk, coverage, maintenance, and feedback speed.", "I would prioritize scenarios that cover core user journeys and previously broken areas...", "I would prioritize areas that carry the most user or business risk..."],
  ["Data Analyst", "How do you explain an unexpected change in a business metric?", "analysis", "Show how you separate data quality issues from real behavior.", "I would validate the data source and metric definition first...", "I would first validate whether the metric definition or pipeline changed..."],
  ["Sales", "How would you prepare for a discovery call with a new prospect?", "discovery", "Show how preparation helps you listen instead of forcing a pitch.", "I would learn the company’s context and prepare a few thoughtful questions...", "I would research the company, understand its industry and likely pain points..."],
  ["Marketing", "How do you decide whether a marketing campaign worked?", "measurement", "Describe a measurement plan before looking at results.", "I would decide the objective first and match it to the right metrics...", "I would define the campaign objective first..."],
  ["Human Resources", "How would you improve an inconsistent hiring process?", "process", "Discuss fairness, speed, candidate experience, and evidence.", "I would standardize the evaluation criteria and train interviewers on the same rubric...", "I would start by mapping the current hiring process..."],
  ["Customer Support", "How do you respond when you cannot solve a customer issue immediately?", "service", "Demonstrate ownership without making promises you cannot keep.", "I would acknowledge the issue, explain the next step, and give a realistic timeline...", "I would acknowledge the issue, show empathy, and be transparent..."],
  ["Accountant", "How do you protect accuracy during a busy close?", "accuracy", "Explain controls that help you work quickly without cutting corners.", "I would put controls in place such as reconciliations, review checkpoints...", "I would build a structured close process with reconciliations..."],
  ["Banking", "How do you evaluate risk in a customer-facing banking decision?", "risk", "Balance policy, evidence, customer needs, and escalation.", "I would look at the facts, the policy, and the customer context together...", "I would start by collecting the relevant facts and checking whether the customer meets the policy requirements..."],
  ["Finance", "How would you explain a forecast variance to a non-finance partner?", "communication", "Turn the variance into a useful decision conversation.", "I would explain the headline, identify the main drivers, and connect the variance to the action needed...", "I would start with the headline: what changed, how big it was, and why it matters..."],
  ["Fresher", "Tell me about a project where you had to learn something quickly.", "learning", "Use a specific story from study, work, or personal projects.", "I would describe what I needed to learn, how I structured my learning...", "I would describe a project where I had to learn a new tool or concept quickly..."],
  ["Internship", "How would you contribute during your first month on a new team?", "onboarding", "Show curiosity paired with useful action.", "I would learn the workflows, ask focused questions, and take on a small improvement...", "In my first month, I would focus on learning the business context, the team workflows..."],
  ["HR", "How do you prepare for the question 'Why do you want this role?'", "motivation", "Connect your interests to the actual role rather than generic enthusiasm.", "I would explain why this role fits my goals and why the company or team is appealing...", "I would explain why the role fits my interests, strengths, and long-term goals..."],
  ["Behavioral", "Tell me about a time you received difficult feedback.", "feedback", "Show reflection without blaming the person who gave it.", "I would explain the situation, the feedback, and the behavior change that followed...", "I would give a concise example of a situation where feedback was difficult..."],
  ["Situational", "What would you do if two urgent stakeholders needed your time at once?", "prioritization", "Explain how you would make the trade-off visible.", "I would clarify impact and deadlines, communicate clearly with both sides...", "I would first clarify the urgency, impact, and deadlines of each request..."],
  ["Software Developer", "How would you review a pull request that works but is difficult to maintain?", "code review", "Balance correctness, risk, and respect for the author.", "I would focus on maintainability, clarity, and future change cost...", "I would call out the functional correctness first and then focus on maintainability concerns..."],
  ["Android Developer", "How would you handle state restoration after an Android process is killed?", "lifecycle", "Distinguish transient UI state from durable application data.", "I would restore only the essential state and rely on persistent sources...", "I would separate transient screen state from durable business data..."],
  ["Java Developer", "What would you look for when diagnosing a memory leak in Java?", "diagnostics", "Describe tools and a narrowing strategy.", "I would look for long-lived references and retention paths...", "I would start by checking heap usage trends, garbage collection behavior..."],
  ["Kotlin Developer", "How do coroutines change the way you structure asynchronous work?", "concurrency", "Explain structured concurrency in practical terms.", "Coroutines make async code easier to read, but the real win is structured cancellation...", "Coroutines make asynchronous code read more like synchronous code..."],
  ["Python Developer", "How would you make a Python data-processing script safe to rerun?", "reliability", "Discuss partial failures and duplicate work.", "I would make the script idempotent and checkpoint progress...", "I would make the script idempotent by writing output to a predictable location..."],
  ["JavaScript Developer", "How do you decide whether a browser task belongs in a web worker?", "browser", "Explain the cost of moving work away from the main thread.", "I would move CPU-heavy work to a worker when it would otherwise block the UI...", "I would move work to a web worker when the task is CPU-intensive..."],
  ["React Developer", "How would you test a React component that depends on loading and error states?", "testing", "Focus on user-observable behavior.", "I would test the rendered UI states and the user interaction flows...", "I would test the component through the UI, checking how it behaves when the data is loading..."],
];

// ---- Existing advanced topics (36) ----
const existingAdvancedTopics = [
  // Software Developer
  ["Software Developer", "How would you design a microservices architecture with eventual consistency?", "microservices", "Discuss trade-offs between consistency, availability, and latency.", "I would use event-driven communication and CQRS to handle eventual consistency...", "I would start by identifying bounded contexts and defining clear service boundaries..."],
  ["Software Developer", "How would you implement a circuit breaker pattern in a distributed system?", "resilience", "Explain how it prevents cascading failures.", "I would use a circuit breaker to stop calls to a failing service after a threshold...", "I would implement the circuit breaker using a library like Resilience4j or Hystrix..."],
  ["Software Developer", "How would you design a logging and monitoring strategy for a large‑scale system?", "observability", "Cover metrics, logs, and distributed tracing.", "I would use Prometheus for metrics, ELK for logs, and Jaeger for tracing...", "I would define SLIs and SLOs, and set up dashboards and alerts..."],
  ["Software Developer", "How would you handle database migrations in a zero‑downtime deployment?", "deployment", "Explain strategies like blue‑green or canary.", "I would use a blue‑green deployment with backward‑compatible schema changes...", "I would apply schema changes in phases: add new columns, deploy code, then remove old columns..."],
  // Android Developer
  ["Android Developer", "How would you optimize an Android app for battery life and network usage?", "optimization", "Identify the biggest consumers and mitigation techniques.", "I would use WorkManager for deferred tasks, batch network requests, and use efficient data formats...", "I would profile with Battery Historian and Android Studio profiler..."],
  ["Android Developer", "How would you implement a secure Android app with biometric authentication?", "security", "Discuss encryption, secure storage, and authentication.", "I would use the Android Keystore for cryptographic keys and BiometricPrompt for authentication...", "I would encrypt sensitive data with AES/GCM and store it in EncryptedSharedPreferences..."],
  ["Android Developer", "How would you implement dependency injection in a large Android project?", "architecture", "Compare Dagger/Hilt vs Koin vs manual DI.", "I would use Hilt for its compile‑time safety and built‑in support for Android components...", "I would set up Hilt modules for each feature and use @Inject for constructor injection..."],
  // Java Developer
  ["Java Developer", "How would you tune JVM garbage collection for a low‑latency application?", "jvm", "Explain GC algorithms and tuning parameters.", "I would choose a low‑pause collector like G1GC or ZGC and tune heap size and region size...", "I would monitor GC logs and use tools like JMC to analyse pauses..."],
  ["Java Developer", "How would you implement a thread‑safe cache in Java?", "concurrency", "Discuss ConcurrentHashMap, Guava, or Caffeine.", "I would use Caffeine for its advanced eviction policies and concurrency support...", "I would create a loading cache with refresh‑after‑write and size‑based eviction..."],
  ["Java Developer", "How would you design a Java classloader to load plugins dynamically?", "classloading", "Explain parent‑delegation model and custom classloaders.", "I would extend ClassLoader and override findClass to load bytecode from a custom source...", "I would use a separate classloader for each plugin to isolate dependencies..."],
  // Kotlin Developer
  ["Kotlin Developer", "How would you use Kotlin Flow for reactive streams?", "flow", "Compare Flow with RxJava and LiveData.", "I would use Flow for its cold stream nature and integration with coroutines...", "I would use operators like map, filter, and combine, and collect in lifecycle‑aware scopes..."],
  ["Kotlin Developer", "How would you design a DSL for a configuration file in Kotlin?", "dsl", "Explain lambda with receiver and type‑safe builders.", "I would use higher‑order functions with receivers to create a type‑safe builder pattern...", "I would define a sealed class hierarchy for the configuration elements and use infix functions..."],
  // Python Developer
  ["Python Developer", "How would you implement a parallel data pipeline in Python?", "parallelism", "Compare threading, multiprocessing, and asyncio.", "I would use multiprocessing for CPU‑bound tasks and asyncio for I/O‑bound tasks...", "I would design a producer‑consumer pattern with queues and process pools..."],
  ["Python Developer", "How would you profile and optimize memory usage in a Python application?", "memory", "Use tools like memory_profiler, tracemalloc, and pympler.", "I would use tracemalloc to track allocations and identify leaks...", "I would use __slots__ to reduce object overhead and use generators for large data..."],
  // JavaScript Developer
  ["JavaScript Developer", "How would you implement a robust error handling strategy in a Node.js service?", "error-handling", "Cover synchronous and asynchronous errors, logging, and recovery.", "I would use try/catch for sync errors, unhandled rejection handlers, and a global error middleware...", "I would define custom error classes with error codes and statuses, and log with correlation IDs..."],
  ["JavaScript Developer", "How would you optimize a JavaScript bundle for faster load times?", "bundling", "Discuss code splitting, tree shaking, and compression.", "I would use Webpack/Rollup with dynamic imports for code splitting and Terser for minification...", "I would analyse the bundle with Webpack Bundle Analyzer and reduce dependency size..."],
  // React Developer
  ["React Developer", "How would you implement server‑side rendering with React?", "ssr", "Explain hydration, data fetching, and caching strategies.", "I would use Next.js or Remix for built‑in SSR and data fetching...", "I would ensure the server and client render the same tree to avoid hydration mismatches..."],
  ["React Developer", "How would you implement a virtualized list that handles thousands of items?", "performance", "Use react‑window or react‑virtualized.", "I would use react‑window's FixedSizeList or VariableSizeList to render only visible rows...", "I would measure item heights and use overscan to prevent blank space on scroll..."],
  // Web Developer
  ["Web Developer", "How would you implement a progressive web app (PWA) with offline support?", "pwa", "Cover service workers, cache strategies, and manifest.", "I would register a service worker with a stale‑while‑revalidate strategy for assets...", "I would use Workbox to simplify caching and a manifest.json for home screen installation..."],
  ["Web Developer", "How would you implement a Content Security Policy (CSP) to prevent XSS?", "security", "Explain CSP directives and nonce generation.", "I would set a strict CSP with default‑src 'self', script‑src with nonce, and object‑src 'none'...", "I would generate a random nonce per request and add it to inline scripts..."],
  // SQL
  ["SQL", "How would you design a database for a multi‑tenant SaaS application?", "database-design", "Discuss row‑level security, partitioning, and schema isolation.", "I would use a shared database with a tenant_id column and row‑level security policies...", "I would use schema‑per‑tenant for isolation and partitioning by tenant_id for performance..."],
  ["SQL", "How would you migrate a large table with minimal downtime?", "migration", "Explain online schema change tools like pt‑online‑schema‑change.", "I would use a tool like gh‑ost to create a shadow table and apply changes incrementally...", "I would use triggers to capture changes during the migration and switch tables at the end..."],
  // QA Tester
  ["QA Tester", "How would you implement a test automation strategy for a microservices architecture?", "automation", "Cover contract testing, integration testing, and end‑to‑end testing.", "I would use Pact for contract testing, Testcontainers for integration, and Selenium for E2E...", "I would run tests in a CI pipeline with parallel execution and reporting..."],
  ["QA Tester", "How would you performance test a real‑time application?", "performance", "Explain load, stress, and soak testing.", "I would use JMeter or Gatling to simulate user load and measure response times...", "I would test with peak loads and monitor resource usage to identify bottlenecks..."],
  // Data Analyst
  ["Data Analyst", "How would you build a data pipeline for streaming analytics?", "data-engineering", "Discuss Kafka, Spark Streaming, and real‑time dashboards.", "I would use Kafka for ingestion, Spark Streaming for processing, and Druid for real‑time queries...", "I would design a pipeline with windowed aggregations and alerting on anomalies..."],
  ["Data Analyst", "How would you implement data governance and quality checks in a data warehouse?", "data-governance", "Cover data cataloging, lineage, and validation.", "I would use Great Expectations for data quality checks and Apache Atlas for lineage...", "I would define data quality rules (null checks, uniqueness, range) and monitor violations..."],
  // Sales (advanced strategic)
  ["Sales", "How would you develop a value‑based selling strategy for a complex enterprise solution?", "strategy", "Identify business value and quantify ROI.", "I would map the customer's business outcomes to specific capabilities and build an ROI model...", "I would create a business case with financial impact (cost savings, revenue increase)..."],
  // Marketing (advanced)
  ["Marketing", "How would you design a multi‑channel attribution model?", "attribution", "Compare last‑click, linear, and data‑driven models.", "I would use a data‑driven approach using Markov chains or Shapley value for fair attribution...", "I would analyse channel paths and assign fractional credit based on contribution..."],
  // HR (advanced)
  ["Human Resources", "How would you implement a diversity, equity, and inclusion (DEI) strategy in hiring?", "diversity", "Discuss blind recruitment, diverse panels, and outcome measurement.", "I would use anonymised applications, structured interviews, and track DEI metrics...", "I would also train interviewers on unconscious bias and measure hiring outcomes..."],
  // Customer Support (advanced)
  ["Customer Support", "How would you design a customer support automation system using AI?", "automation", "Cover chatbots, NLP, and escalation rules.", "I would use an NLP‑based chatbot for FAQs and route complex cases to human agents...", "I would analyse support tickets to identify automation opportunities and measure deflection rate..."],
  // Finance (advanced)
  ["Finance", "How would you build a financial forecast model using machine learning?", "forecasting", "Discuss feature engineering, model selection, and validation.", "I would use time‑series models (ARIMA, Prophet) or XGBoost with lag features...", "I would validate with backtesting and compare to business drivers..."],
  // Banking (advanced)
  ["Banking", "How would you implement a real‑time fraud detection system?", "fraud", "Cover model, low‑latency inference, and explainability.", "I would use a gradient‑boosting model with high‑velocity feature extraction...", "I would deploy using a streaming platform (Kafka) and a rules engine for overrides..."],
  // Accountant (advanced)
  ["Accountant", "How would you ensure compliance with IFRS 16 (lease accounting) in a large organisation?", "compliance", "Explain lease classification and calculation requirements.", "I would use a lease accounting software that automates the calculations and provide audit trails...", "I would coordinate with legal and procurement to gather lease data..."],
  // Behavioral (advanced)
  ["Behavioral", "How have you influenced a decision without direct authority?", "influence", "Explain how you built consensus and drove change.", "I would describe a situation where I used data, persuasion, and stakeholder alignment to push a decision..."],
  ["Behavioral", "Tell me about a time you managed a conflict between two team members.", "conflict", "Show mediation and resolution skills.", "I would describe how I facilitated a meeting, listened to both sides, and found a compromise..."],
  // Situational (advanced)
  ["Situational", "What would you do if a critical production bug was found during a major release?", "incident", "Explain escalation, triage, and communication.", "I would assess the severity, decide on rollback or hotfix, communicate to stakeholders, and follow up with a post‑mortem..."],
];

// ---- NEW TOPICS FOR NEW CATEGORIES (43 topics) ----
const newCategoryTopics = [
  // ---- Presales (5) ----
  ["Presales", "How would you qualify a lead during a discovery call?", "qualification", "Explain BANT and other qualification frameworks.", "I would use BANT (Budget, Authority, Need, Timeline) to assess if the prospect is a good fit...", "I would ask open-ended questions to understand pain points and decision-making process..."],
  ["Presales", "How would you handle a technical objection from a prospect?", "objection-handling", "Describe how you would respond to a 'it doesn't do X' objection.", "I would acknowledge the concern, clarify the requirement, and either show a workaround or explain the roadmap...", "I would focus on the business outcome and align with the prospect's needs..."],
  ["Presales", "How would you tailor a product demo for a specific industry?", "demo-customization", "Explain how you would adapt your demo for e‑commerce vs healthcare.", "I would research the industry’s pain points, regulations, and use cases, and use industry‑specific data and scenarios in the demo...", "I would also use language and examples familiar to that industry..."],
  ["Presales", "How would you build a business case for a solution?", "business-case", "Describe the components of a compelling business case.", "I would quantify the ROI: cost savings, revenue increase, efficiency gains, and include a total cost of ownership analysis...", "I would also address risks and mitigation, and timeline for implementation..."],
  ["Presales", "How would you manage a proof of concept (PoC) with a demanding customer?", "poc-management", "Explain how you would scope and execute a successful PoC.", "I would define clear success criteria and timeline, involve customer stakeholders, and communicate progress regularly...", "I would also document lessons learned and use them to improve the final proposal..."],
  // ---- Digital Marketing (5) ----
  ["Digital Marketing", "How would you create a content marketing strategy for a B2B SaaS product?", "content-strategy", "Cover content types, distribution, and measurement.", "I would map content to the buyer’s journey: blogs for awareness, case studies for consideration, and webinars for decision...", "I would distribute via SEO, social, email, and paid promotion, and track engagement and conversion metrics..."],
  ["Digital Marketing", "How would you set up a Google Ads campaign for a new product launch?", "google-ads", "Explain campaign structure, targeting, and bidding.", "I would start with a Search campaign with relevant keywords, set up ad groups by theme, and use exact match for initial targeting...", "I would use manual CPC initially, then shift to automated bidding once data is gathered..."],
  ["Digital Marketing", "How would you measure the effectiveness of a social media campaign?", "social-media-metrics", "Discuss key metrics and attribution.", "I would track reach, engagement, click‑through rate, and conversion rate. Use UTM parameters for attribution...", "I would also monitor sentiment and brand mentions to gauge brand awareness..."],
  ["Digital Marketing", "How would you build an email marketing automation sequence?", "email-automation", "Describe a drip campaign for lead nurturing.", "I would set up a welcome series, then a nurture sequence based on behaviour (e.g., whitepaper downloads), and finally a sales‑ready handoff...", "I would personalize content based on segment and past interactions..."],
  ["Digital Marketing", "How would you optimize a landing page for conversion?", "landing-page-optimization", "Explain A/B testing and CRO principles.", "I would A/B test headlines, CTAs, forms, and images. Also improve page load speed, mobile responsiveness, and trust signals (testimonials, social proof)...", "I would use heatmaps and session recordings to identify friction points..."],
  // ---- API & Web Services (5) ----
  ["API & Web Services", "How would you design a versioning strategy for a REST API?", "api-versioning", "Compare URL, header, and query parameter versioning.", "I would prefer URL versioning (/v1/users) for simplicity and discoverability. Also support header versioning for more flexibility...", "I would maintain backward compatibility and deprecate old versions gradually..."],
  ["API & Web Services", "How would you secure a GraphQL API?", "graphql-security", "Discuss authentication, depth limiting, and query cost analysis.", "I would use JWT or OAuth2 for authentication, implement depth limiting to prevent nested queries, and use query cost analysis to limit resource usage...", "I would also use persisted queries and allowlist for production..."],
  ["API & Web Services", "How would you handle pagination in a REST API?", "pagination", "Compare offset‑limit vs cursor‑based pagination.", "I would use cursor‑based pagination for large datasets to avoid performance issues with high offsets...", "For simple use cases, offset‑limit with a total count is fine. I'd also include metadata like next/prev links in the response..."],
  ["API & Web Services", "How would you design a webhook system for external services?", "webhook-design", "Explain registration, delivery, and security.", "I would let users register a URL and events they want to receive. I'd use HMAC signatures to verify authenticity...", "I'd implement exponential backoff retries and a dead letter queue for failed deliveries..."],
  ["API & Web Services", "How would you migrate a REST API to gRPC?", "grpc-migration", "Explain the challenges and strategy.", "I would start by identifying high‑throughput, low‑latency services, and define proto files. Then implement a gRPC gateway to serve REST clients temporarily...", "I would also monitor performance and gradually switch clients..."],
  // ---- Computer Science (5) ----
  ["Computer Science", "How would you design a thread‑safe blocking queue?", "concurrency", "Explain using locks or semaphores.", "I would use a ReentrantLock with conditions (not full/not empty) or a BlockingQueue implementation like ArrayBlockingQueue...", "I would ensure the methods are atomic and handle spurious wakeups..."],
  ["Computer Science", "How would you implement a LRU cache?", "data-structures", "Use a hash map and doubly linked list.", "I would combine a HashMap for O(1) lookups and a doubly linked list to maintain order of usage. On access, move the node to the head; on insert, add to head and evict from tail if capacity exceeded..."],
  ["Computer Science", "How would you handle deadlock in a distributed system?", "deadlock", "Explain detection, avoidance, and recovery.", "I would use timeout and retry mechanisms, and implement a distributed lock manager or use consensus algorithms like Raft...", "For prevention, I would enforce lock ordering and use deadlock detection with graph algorithms..."],
  ["Computer Science", "How would you design a consistent hashing system for load balancing?", "consistent-hashing", "Explain virtual nodes and handling of node failures.", "I would hash both keys and nodes onto a ring. Each key is assigned to the first node clockwise. Use virtual nodes to distribute load evenly...", "When a node fails, reassign only its keys to adjacent nodes..."],
  ["Computer Science", "How would you implement a garbage collector?", "gc", "Discuss mark‑sweep, copying, and generational collection.", "I would design a generational collector: young generation (copying), old generation (mark‑sweep‑compact). Use barriers for incremental collection...", "I would also consider concurrency (like G1) to minimize pauses..."],
  // ---- Cybersecurity (5) ----
  ["Cybersecurity", "How would you protect a web application from SQL injection?", "sql-injection", "Explain parameterized queries and input validation.", "I would use parameterized queries (PreparedStatement in Java) and stored procedures. Also validate and sanitize all input...", "I would use ORM frameworks that handle escaping and deploy a WAF for additional protection..."],
  ["Cybersecurity", "How would you design a zero‑trust architecture for an enterprise?", "zero-trust", "Explain the principles and implementation.", "I would implement identity‑based access, micro‑segmentation, and continuous verification. Use strong authentication (MFA) and least privilege...", "I would also monitor all network traffic and use policies based on user context and device health..."],
  ["Cybersecurity", "How would you respond to a ransomware attack?", "incident-response", "Describe the steps to contain and recover.", "I would isolate affected systems, identify the ransomware variant, and decide whether to pay or restore from backups (prefer restore)...", "Then I would perform a root cause analysis, patch vulnerabilities, and improve backup and monitoring..."],
  ["Cybersecurity", "How would you secure an API against OWASP Top 10 risks?", "api-security", "Cover common risks like BOLA, excessive data exposure.", "I would implement proper authorization (e.g., OAuth2 scopes), validate input, limit data exposure, use rate limiting, and monitor logs...", "I would also use security scanning tools (SAST/DAST) and implement a CSP for XSS mitigation..."],
  ["Cybersecurity", "How would you implement a secure password storage system?", "password-storage", "Explain hashing, salting, and key derivation functions.", "I would use a strong key derivation function like bcrypt, Argon2, or PBKDF2 with a random salt per user...", "I would also enforce strong password policies and use MFA..."],
  // ---- Generative AI (5) ----
  ["Generative AI", "How would you reduce hallucination in a large language model?", "hallucination", "Discuss RAG, fine‑tuning, and prompt engineering.", "I would use Retrieval‑Augmented Generation (RAG) to ground the model with factual data, and fine‑tune on domain‑specific data...", "I would also craft prompts that ask the model to cite sources or provide a confidence score..."],
  ["Generative AI", "How would you design a prompt engineering strategy for a customer service chatbot?", "prompt-engineering", "Cover system prompts, few‑shot examples, and context management.", "I would define a system prompt that sets the role and rules, provide few‑shot examples for common intents, and manage conversation history to maintain context...", "I would also include fallback responses and escalate to human agents when confidence is low..."],
  ["Generative AI", "How would you evaluate the quality of a text generation model?", "model-evaluation", "Compare automated metrics (BLEU, ROUGE) with human evaluation.", "I would use BLEU/ROUGE for fluency and overlap, but also conduct human evaluation for coherence, relevance, and creativity...", "I would also use LLM‑as‑a‑judge with clear rubrics and calculate inter‑rater reliability..."],
  ["Generative AI", "How would you fine‑tune a pre‑trained LLM for a specific domain?", "fine-tuning", "Explain data preparation, training, and hyperparameter tuning.", "I would curate a high‑quality dataset of (prompt, response) pairs, use LoRA for parameter‑efficient tuning, and tune learning rate and batch size...", "I would also evaluate on a held‑out validation set and avoid catastrophic forgetting..."],
  ["Generative AI", "How would you build a RAG system for a knowledge base?", "rag", "Cover retrieval, chunking, and generation.", "I would break documents into chunks, embed them using a sentence transformer, and use a vector database (e.g., Pinecone) for similarity search...", "Then I would retrieve relevant chunks, inject them into the prompt, and generate a grounded response..."],
  // ---- Data Science (5) ----
  ["Data Science", "How would you handle class imbalance in a classification problem?", "imbalanced-data", "Discuss resampling, cost‑sensitive learning, and algorithmic approaches.", "I would use SMOTE for oversampling, undersampling, or a combination. Also use class weights in the loss function...", "I would choose evaluation metrics like precision‑recall AUC instead of accuracy..."],
  ["Data Science", "How would you build a recommendation system?", "recommendation", "Compare collaborative filtering, content‑based, and hybrid methods.", "I would start with collaborative filtering (user‑user or item‑item similarity), then add content‑based features for cold‑start, and finally a hybrid model using matrix factorization...", "I would evaluate with RMSE and precision@k..."],
  ["Data Science", "How would you detect outliers in a dataset?", "outlier-detection", "Discuss statistical methods, clustering, and isolation forest.", "I would use Z‑score or IQR for univariate outliers, DBSCAN for spatial outliers, and isolation forest for high‑dimensional data...", "I would also consider domain context before removing outliers..."],
  ["Data Science", "How would you design an A/B testing platform?", "ab-testing", "Explain randomisation, statistical significance, and sample size.", "I would allocate users randomly to control and treatment, track defined metrics, and use a t‑test or Bayesian approach to determine significance...", "I would also compute sample size based on desired power and effect size, and monitor for peeking..."],
  ["Data Science", "How would you interpret a logistic regression model?", "logistic-regression", "Explain coefficients, odds ratios, and significance.", "I would interpret coefficients as log‑odds changes. Exponentiating gives odds ratios. I would also use p‑values and confidence intervals to assess significance...", "I would use feature importance from coefficients and consider multicollinearity..."],
  // ---- DevOps (5) ----
  ["DevOps", "How would you design a CI/CD pipeline for a microservices application?", "cicd", "Cover building, testing, and deployment strategies.", "I would use a pipeline that builds each service independently, runs unit and integration tests, scans for vulnerabilities, packages into containers, and deploys with canary or blue‑green...", "I would also include rollback and monitoring stages..."],
  ["DevOps", "How would you implement infrastructure as code for a cloud deployment?", "iac", "Compare Terraform and CloudFormation.", "I would use Terraform for its multi‑cloud support and state management. I would version the config files and run them in CI...", "I would also use modules for reusability and remote state storage..."],
  ["DevOps", "How would you monitor a Kubernetes cluster?", "kubernetes-monitoring", "Discuss Prometheus, Grafana, and logging.", "I would use Prometheus for metrics (CPU, memory, request rate), Grafana for dashboards, and Loki/EFK for logs...", "I would set up alerts for high error rates, latency, and resource saturation..."],
  ["DevOps", "How would you handle secrets management in a distributed system?", "secrets", "Compare HashiCorp Vault, AWS Secrets Manager, and Kubernetes secrets.", "I would use a dedicated secret store like Vault with dynamic secrets and access policies. In Kubernetes, I'd use external‑secrets to sync secrets from Vault...", "I would never hardcode secrets; always retrieve them at runtime..."],
  ["DevOps", "How would you reduce Docker image size?", "docker-optimization", "Explain multi‑stage builds, slim base images, and layer caching.", "I would use multi‑stage builds to separate build and runtime environments, use Alpine or distroless images, and combine RUN commands to reduce layers...", "I would also use .dockerignore to exclude unnecessary files..."],
  // ---- HTML & CSS (5) ----
  ["HTML & CSS", "How would you create a responsive navbar with CSS Flexbox?", "flexbox", "Explain how to achieve a mobile‑first design.", "I would use display:flex on the container, with justify‑content:space‑between for desktop, and a media query to change to a column layout with a hamburger menu on small screens...", "I would also use a button to toggle the menu visibility..."],
  ["HTML & CSS", "How would you implement a CSS Grid layout for a magazine‑style page?", "css-grid", "Explain grid‑template‑areas and responsive breakpoints.", "I would define grid‑template‑areas for header, sidebar, main, footer, and use media queries to rearrange areas for different screen sizes...", "I would use auto‑fit and minmax for flexible columns..."],
  ["HTML & CSS", "How would you make a web page accessible using ARIA?", "aria", "Discuss roles, states, and properties.", "I would add role attributes (e.g., role='banner', role='navigation'), aria‑label for non‑text elements, aria‑expanded for collapsible menus, and aria‑live for dynamic content updates...", "I would test with screen readers..."],
  ["HTML & CSS", "How would you implement a dark/light theme toggle using CSS variables?", "css-variables", "Explain switching themes with JavaScript.", "I would define CSS custom properties for colors (e.g., --bg, --text) and toggle a class on the body (e.g., .dark) using JavaScript to override the variable values...", "I would also persist the preference in localStorage..."],
  ["HTML & CSS", "How would you animate a modal dialog entrance and exit?", "animations", "Use transitions and keyframes.", "I would use @keyframes for fade‑in and slide‑in effects, and apply them with animation property. For exit, I would use a class that triggers a reverse animation and then remove the element with JS after animationend...", "I would also consider performance (use opacity and transform)..."],
  // ---- Software Engineer (5) ----
  ["Software Engineer", "How would you improve code quality in a legacy codebase?", "code-quality", "Discuss refactoring, testing, and tooling.", "I would start by adding unit tests to critical paths, then incrementally refactor with small, safe changes. Use static analysis tools to identify hotspots...", "I would also establish coding standards and use code reviews to enforce them..."],
  ["Software Engineer", "How would you estimate the effort for a software project?", "estimation", "Cover story points, T‑shirt sizing, and risk.", "I would break down the work into user stories, assign story points based on complexity and uncertainty, and use historical velocity to forecast...", "I would also add a buffer for unknown unknowns and involve the team in estimation..."],
  ["Software Engineer", "How would you design a scalable notification system?", "notification-system", "Explain delivery, queueing, and templates.", "I would use a message queue (e.g., RabbitMQ) to decouple producers and consumers, support multiple channels (email, SMS, push), and use templates with dynamic data...", "I would also handle retries and failure logging..."],
  ["Software Engineer", "How would you handle a production outage as a lead developer?", "incident-response", "Describe the communication and technical steps.", "I would first assess the impact, rollback if necessary, communicate status to stakeholders, and lead the team in root cause analysis...", "After resolution, I would write a post‑mortem and action items to prevent recurrence..."],
  ["Software Engineer", "How would you drive an engineering culture of quality and ownership?", "engineering-culture", "Discuss practices like TDD, code reviews, and blameless post‑mortems.", "I would promote TDD and pair programming, ensure code reviews are constructive, and hold blameless post‑mortems to learn from failures...", "I would also encourage knowledge sharing through tech talks and internal documentation..."],
  // ---- Machine Learning (5) ----
  ["Machine Learning", "How would you choose between a deep learning model and a traditional ML model?", "model-selection", "Explain data size, interpretability, and hardware constraints.", "I would choose deep learning if I have large data, complex patterns, and enough compute. Traditional models like random forest for small data or when interpretability is critical...", "I would also consider training time and deployment constraints..."],
  ["Machine Learning", "How would you prevent overfitting in a neural network?", "overfitting", "Discuss regularization, dropout, and early stopping.", "I would use L1/L2 regularization, dropout layers, data augmentation, and early stopping based on validation loss...", "I would also use cross‑validation and simplify the architecture if needed..."],
  ["Machine Learning", "How would you handle missing data in a dataset?", "missing-data", "Compare imputation, deletion, and model‑based methods.", "I would use mean/median imputation for numeric, mode for categorical, or more advanced methods like KNN imputation...", "If missingness is not random, I might use model‑based imputation or include a 'missing' indicator..."],
  ["Machine Learning", "How would you evaluate a clustering model?", "clustering-evaluation", "Discuss silhouette score, Davies‑Bouldin, and internal vs external validation.", "I would use silhouette score to measure compactness and separation, Davies‑Bouldin for within‑cluster similarity...", "If labels exist, I would use adjusted Rand index or mutual information..."],
  ["Machine Learning", "How would you deploy a machine learning model in production?", "ml-deployment", "Cover model serialization, serving, monitoring, and retraining.", "I would serialise the model (pickle, ONNX), serve it via a REST API (Flask/FastAPI) or use TensorFlow Serving, and monitor for drift...", "I would set up a retraining pipeline triggered by new data or scheduled intervals..."],
];

// ---- Additional advanced topics for existing categories (20 more) ----
const extraAdvancedTopics = [
  // Advance Java (Java EE) - adding under Java Developer
  ["Java Developer", "How would you implement a distributed transaction using the Saga pattern in Java?", "saga", "Explain choreography vs orchestration.", "I would use the Saga pattern with choreography: each service publishes events and listens for events to trigger compensating actions...", "In orchestration, a central coordinator would manage the sequence and compensation..."],
  ["Java Developer", "How would you design a REST API with Spring Boot and JWT authentication?", "spring-boot-jwt", "Explain filters and security config.", "I would use Spring Security with a filter to validate JWT tokens, configure stateless session management, and use @PreAuthorize for method‑level security...", "I would also implement custom authentication entry points and exception handling..."],
  ["Java Developer", "How would you use the Stream API to process large datasets efficiently?", "stream-api", "Discuss parallel streams and collect‑and‑batch.", "I would use parallelStream() for CPU‑bound operations on large collections, and use custom collectors to batch results...", "I would also avoid stateful operations and use short‑circuiting where possible..."],
  ["Java Developer", "How would you optimize a Spring Boot application for startup time?", "spring-boot-optimization", "Cover lazy initialization, AOT, and classpath scanning.", "I would use spring.main.lazy‑initialization=true, enable AOT with GraalVM, and reduce component scanning scope...", "I would also use spring‑boot‑starter‑webflux for reactive if appropriate..."],
  // JavaScript Developer (advance)
  ["JavaScript Developer", "How would you implement a real‑time application with WebSockets?", "websockets", "Explain Socket.io or raw WebSocket API.", "I would use Socket.io for fallback and event handling. For raw WebSocket, I would handle connection, message parsing, and reconnection...", "I would implement authentication and authorization on connection..."],
  ["JavaScript Developer", "How would you implement a service worker for offline support in a PWA?", "service-worker", "Explain caching strategies and background sync.", "I would use a service worker to cache static assets and API responses with a stale‑while‑revalidate strategy...", "I would also use background sync to queue requests when offline..."],
  // React Developer (advance)
  ["React Developer", "How would you implement global state management with Zustand or Jotai?", "state-management", "Compare with Redux and Context.", "I would use Zustand for its simple API and non‑boilerplate approach. Jotai is also good for atomic state...", "Both are easier than Redux for most use cases, while still being performant..."],
  ["React Developer", "How would you implement code splitting with React.lazy and Suspense?", "code-splitting", "Explain dynamic imports and loading states.", "I would use React.lazy to dynamically import components and wrap them in Suspense with a fallback. This reduces initial bundle size...", "I would also use error boundaries for failed imports..."],
  // Web Developer (advance)
  ["Web Developer", "How would you implement a custom web component with vanilla JavaScript?", "web-components", "Explain custom elements, shadow DOM, and templates.", "I would use customElements.define() to create a new HTML tag, use shadow DOM for encapsulation, and <template> for markup...", "This allows reuse across frameworks..."],
  ["Web Developer", "How would you handle cross‑origin requests in a secure way?", "cors", "Explain CORS headers and preflight.", "I would configure the server to send Access‑Control‑Allow‑Origin and other headers. I'd also handle preflight OPTIONS requests...", "I would avoid using '*' for credentials and use a whitelist of origins..."],
  // SQL (advance)
  ["SQL", "How would you perform a recursive query to traverse a tree structure?", "recursive-cte", "Explain with recursive CTE.", "I would use a recursive CTE with a base case and a recursive join to traverse the tree. This is useful for organizational charts...", "I would also handle cycles if present..."],
  ["SQL", "How would you design a database schema for a voting system?", "schema-design", "Cover normalization and indexing.", "I would have tables: users, topics, votes. votes would have a composite key (user_id, topic_id) with a check constraint to allow only +1 or -1...", "I would use indexes on user_id and topic_id..."],
  // QA (advance)
  ["QA Tester", "How would you implement visual regression testing?", "visual-testing", "Explain tools like Percy and BackstopJS.", "I would use Percy to capture and compare screenshots of UI components across different resolutions. I would integrate it into the CI pipeline...", "I would also use visual diffing to detect unintended changes..."],
  ["QA Tester", "How would you test a mobile application?", "mobile-testing", "Cover simulators, real devices, and Appium.", "I would use Appium for cross‑platform automation, test on both simulators and real devices, and use cloud services (BrowserStack) for device coverage...", "I would also test network conditions and interruptions..."],
  // Data Analyst (advance)
  ["Data Analyst", "How would you build a dashboard with real‑time data using Power BI?", "power-bi", "Explain data sources, DAX, and refresh.", "I would connect to streaming data sources, use DAX for measures, and set up scheduled or live refresh...", "I would also apply row‑level security if needed..."],
  ["Data Analyst", "How would you perform cohort analysis to measure customer retention?", "cohort-analysis", "Explain cohort definition and metrics.", "I would define cohorts by sign‑up month, then calculate retention rates for each cohort over subsequent periods...", "This helps identify trends and impact of changes..."],
  // DevOps (advance) - adding more under DevOps
  ["DevOps", "How would you set up a GitOps workflow with ArgoCD?", "gitops", "Explain declarative config and sync.", "I would store Kubernetes manifests in a Git repo, configure ArgoCD to watch that repo, and automatically sync changes to the cluster...", "This ensures the cluster state matches the Git source of truth..."],
  ["DevOps", "How would you implement a service mesh with Istio?", "service-mesh", "Explain traffic management, security, and observability.", "I would use Istio to manage traffic routing, implement mTLS for security, and collect telemetry for monitoring...", "This also enables canary deployments and fault injection..."],
  // Computer Science (advance)
  ["Computer Science", "How would you design a distributed cache using consistent hashing?", "consistent-hashing-cache", "Explain virtual nodes and replication.", "I would use consistent hashing to distribute keys across cache nodes, with virtual nodes for load balancing, and replicate data on next N nodes for fault tolerance...", "When a node fails, only a fraction of keys need remapping..."],
  ["Computer Science", "How would you implement a priority queue with a binary heap?", "binary-heap", "Explain heap operations and array representation.", "I would implement a binary heap as an array, with operations like insert (bubble up), extract‑max (bubble down), and heapify. This gives O(log n) for insert/remove and O(1) for peek...", "I would also implement a heap sort..."],
];

// Combine all topics
export const topics = [...originalTopics, ...existingAdvancedTopics, ...newCategoryTopics, ...extraAdvancedTopics] as const;

// ---- Situational contexts ----
// Previously these were appended to the base question to mass-produce a
// separate page per combination (141 questions x 14 angles = 1,974 pages).
// That produced near-duplicate pages with identical boilerplate sections
// and even a grammar bug (a "?" question followed by another "?" suffix).
// Instead, each topic now gets exactly ONE page, and two of these contexts
// are surfaced as genuine follow-up questions on that single page - real
// depth without duplicate, thin URLs.
const situationalContexts = [
  "for a small team",
  "when requirements are unclear",
  "under a tight deadline",
  "with a focus on accessibility",
  "with limited operational budget",
  "when a previous solution failed",
  "for a high-risk release",
  "when explaining your decision to a non-specialist",
  "while mentoring a junior teammate",
  "after measuring an unexpected result",
  "for a large‑scale production system",
  "with strict security and compliance requirements",
  "when scalability is a critical concern",
  "for a global team with distributed members",
] as const;

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); */

// ---- Clear, ultra-detailed interview answer builder ----
// Creates a learner-friendly answer with explanation, example, trade-offs,
// testing, and an interview-ready response. The supplied seed explanation
// and sample answer remain the core source for the question.
const buildUltraDetailedAnswer = (
  categoryName: string,
  baseQuestion: string,
  tag: string,
  explanation: string,
  sampleAnswer: string,
) => {
  const normalized = baseQuestion.toLowerCase();

  // Java maintainability question: provide the concrete, easy-to-understand
  // answer expected for this topic rather than a generic template.
  if (
    normalized.includes("what makes a java application maintainable") &&
    categoryName === "Java Developer"
  ) {
    return `**What makes a Java application maintainable as its team grows?**

A Java application remains maintainable as the development team grows when the codebase has **clear architecture, well-defined responsibilities, consistent coding standards, automated tests, good documentation, manageable dependencies, and effective code-review practices**.

As more developers work on the same application, the challenge is not simply writing more code. The team needs to make sure developers can understand existing code, make changes safely, avoid regressions, and work on different parts of the application without constantly affecting each other.

### 1. Use a clear architecture

The application should have clearly separated responsibilities.

For example:

\`\`\`
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
\`\`\`

A controller should mainly handle request-related concerns. Business logic should belong in the service layer, while database access should be handled by the repository/data-access layer.

For example:

\`\`\`java
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
}
\`\`\`

The controller should not contain complex business rules or direct database logic.

This separation makes the application easier to understand, test, and modify.

### 2. Follow SOLID principles

SOLID principles help prevent classes from becoming too large and difficult to change.

For example, the **Single Responsibility Principle** means a class should have one primary responsibility.

Instead of putting user business logic, email sending, reporting, database operations, and file processing into one class, separate those responsibilities:

\`\`\`
UserService
EmailService
ReportService
UserRepository
FileService
\`\`\`

This allows different developers to work on different components with less risk of creating conflicts.

### 3. Keep classes and methods focused

Large classes and methods become difficult for new developers to understand.

Instead of having one method with hundreds of lines, break the work into meaningful methods:

\`\`\`java
public void processUser(User user) {
    validateUser(user);
    saveUser(user);
    sendWelcomeEmail(user);
}
\`\`\`

A developer joining the team can understand the high-level flow quickly and inspect individual methods when necessary.

### 4. Use meaningful naming conventions

Names should communicate intent.

Prefer:

\`\`\`java
calculateOrderTotal()
findActiveUsers()
validatePayment()
\`\`\`

rather than vague names such as:

\`\`\`java
doProcess()
handleData()
execute()
\`\`\`

The team should also agree on consistent conventions for:
- **Classes**
- **Methods**
- **Variables**
- **Packages**
- **Exceptions**
- **Constants**
- **APIs**

### 5. Maintain automated tests

Automated tests become increasingly important as the team grows.

A useful test strategy can include:

\`\`\`
Unit Tests
    ↓
Integration Tests
    ↓
API Tests
    ↓
End-to-End Tests
\`\`\`

Tests should cover valid input, invalid input, business rules, exceptions, and important boundary conditions.

Good test coverage gives developers confidence that changes will not unexpectedly break existing functionality.

### 6. Use code reviews

Important changes should go through code review.

Reviewers can check:

- **Correctness**
- **Business logic**
- **Security**
- **Performance**
- **Test coverage**
- **Error handling**
- **Maintainability**
- **Naming and readability**

The goal is not to criticize the developer. The goal is to keep the codebase consistent, reliable, and easy for the whole team to maintain.

### 7. Manage dependencies carefully

A growing Java application can become difficult to maintain if it contains unnecessary or outdated dependencies.

The team should:

- Remove unused libraries.
- Keep dependencies updated.
- Avoid unnecessary third-party libraries.
- Monitor security vulnerabilities.
- Keep versions consistent.
- Use Maven or Gradle dependency management properly.

### 8. Use consistent exception handling

The application should have a predictable approach to errors.

For example, define clear handling for:
- **Validation errors**
- **Business exceptions**
- **Database errors**
- **External API failures**
- **Unexpected system errors**

In Spring Boot, centralized exception handling can be implemented using \`@ControllerAdvice\`.

This makes API behavior more predictable and easier to troubleshoot.

### 9. Use logging and monitoring

As the application grows, developers need to understand what happens in production.

Useful observability includes:

- **Structured logging**
- **Error tracking**
- **Metrics**
- **Health checks**
- **Performance monitoring**
- **Distributed tracing when required**

Logs should provide enough context to diagnose problems without exposing sensitive information.

### 10. Maintain useful documentation

Documentation becomes especially important when new developers join the team.

Useful documentation includes:

\`\`\`
README
Architecture documentation
API documentation
Database documentation
Development setup
Deployment process
Coding standards
Troubleshooting guide
\`\`\`

Good documentation reduces onboarding time and prevents developers from repeatedly having to discover how the system works.

### 11. Use CI/CD

A growing team benefits from automated quality checks.

A typical pipeline can look like:

\`\`\`
Developer creates PR
        ↓
Code Review
        ↓
Build
        ↓
Unit Tests
        ↓
Integration Tests
        ↓
Security / Quality Checks
        ↓
Deployment
\`\`\`

This provides fast feedback and reduces the chance of broken code reaching production.

### 12. Avoid unnecessary complexity

Maintainability does not mean creating the most complicated architecture possible.

For example, a team should not introduce microservices simply because the team is getting larger.

If a well-structured modular monolith satisfies the requirements, it may be easier and cheaper to maintain.

Architecture should evolve based on actual requirements such as scale, deployment needs, reliability, performance, and team ownership.

## Example of a maintainable Java project

A Spring Boot application could use a structure such as:

\`\`\`
src/main/java/com/example/app/

├── controller/
│   └── UserController.java
├── service/
│   └── UserService.java
├── repository/
│   └── UserRepository.java
├── model/
│   └── User.java
├── dto/
│   └── UserResponse.java
├── exception/
│   └── UserNotFoundException.java
├── config/
│   └── SecurityConfig.java
└── util/
    └── DateUtils.java
\`\`\`

The exact structure can vary, but the important principle is that responsibilities and boundaries are clear.

## Trade-offs

There is no single technique that makes an application maintainable. More abstraction, documentation, testing, and automation can improve safety, but they also require time and effort.

The goal is to find the right balance for the team's size, product complexity, risk, and expected growth.

## Interview-ready answer

> "As the team grows, I focus on making the Java application easy to understand and safe to change. I would establish clear architectural boundaries, follow SOLID principles, keep classes focused, use consistent coding standards, and maintain strong automated test coverage. I would also use code reviews, centralized exception handling, proper logging and monitoring, dependency management, CI/CD, and useful documentation. Most importantly, I would avoid unnecessary complexity and evolve the architecture based on actual business and technical requirements."

**Key takeaway**

**Maintainability is not one specific Java feature.** It comes from combining good architecture, clean code, testing, documentation, consistent engineering practices, and clear team ownership.`;
  }

  return `**Detailed Answer**

This is a ${categoryName} interview question about **${tag}**. The key is to understand the actual requirement and constraints before choosing a technology or implementation, and to be able to explain the reasoning behind that choice out loud.

**What the interviewer is looking for**

The interviewer wants to see whether you can explain your reasoning clearly, make practical decisions, identify risks, and connect your technical choice to the expected business or user outcome.

**Explanation**

${explanation}

**Practical approach**

${sampleAnswer}

I would start by clarifying the requirements, constraints, expected scale, dependencies, and success criteria. Then I would choose the simplest approach that satisfies those requirements and explain why.

**Important considerations**

I would consider correctness, maintainability, performance, scalability, security, reliability, testing, and operational impact. I would also identify edge cases and define how the application should behave when dependencies fail or unexpected input is received.

**Testing and validation**

I would validate the implementation with appropriate unit, integration, API, and end-to-end tests. For performance-sensitive functionality, I would establish a baseline and measure the effect of any optimization rather than relying on assumptions.

**Trade-offs**

There is rarely one perfect solution. I would explain the advantages and disadvantages of the chosen approach and compare reasonable alternatives. I would avoid unnecessary complexity and evolve the solution when actual requirements justify it.

**Interview-ready answer**

${sampleAnswer}

**Key takeaway**

A strong interview answer should explain **what you would do, why you would do it, how you would validate it, and what trade-offs you considered**.`;
};

async function main() {
  const categoryMap = new Map<string, string>();
  for (const [name, group] of categories) {
    const category = await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name), group, description: `Focused ${name} interview preparation.` }
    });
    categoryMap.set(name, category.id);
    await prisma.subcategory.upsert({
      where: { categoryId_slug: { categoryId: category.id, slug: slugify(name) } },
      update: {},
      create: { name, slug: slugify(name), categoryId: category.id }
    });
  }

  // One published page per real, distinct question - no angle multiplication.
  // This replaces the previous 141 x 14 = 1,974 near-duplicate pages with
  // 141 pages, each with unique, specific content and no grammar bug from
  // concatenating a second "?" onto a question that already ends in one.
  for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
    const [categoryName, baseQuestion, tag, explanation, sampleAnswer] = topics[topicIndex];
    const categoryId = categoryMap.get(categoryName)!;
    const subcategory = await prisma.subcategory.findFirst({ where: { categoryId } });

    const question = baseQuestion;
    const slug = slugify(baseQuestion);

    // Bias difficulty toward HARD for the advanced topic pools.
    const isAdvancedPool = topicIndex >= originalTopics.length;
    const difficulty: Difficulty = isAdvancedPool
      ? [Difficulty.MEDIUM, Difficulty.HARD, Difficulty.HARD][topicIndex % 3]
      : [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD][topicIndex % 3];

    const experienceLevel = [ExperienceLevel.FRESHER, ExperienceLevel.INTERNSHIP, ExperienceLevel.MID_LEVEL, ExperienceLevel.EXPERIENCED][topicIndex % 4];
    const interviewType = categoryName === "Behavioral" || categoryName === "HR" ? InterviewType.BEHAVIORAL : categoryName === "Situational" ? InterviewType.SITUATIONAL : InterviewType.TECHNICAL;

    // Pick two distinct situational contexts deterministically per topic so
    // every page gets real, varied follow-up questions instead of the same
    // two generic lines repeated on every page.
    const contextA = situationalContexts[topicIndex % situationalContexts.length];
    const contextB = situationalContexts[(topicIndex + 5) % situationalContexts.length];

    await prisma.interviewQuestion.upsert({
      where: { slug },
      update: {
        question,
        categoryId,
        subcategoryId: subcategory?.id,
        experienceLevel,
        difficulty,
        interviewType,
        shortDescription: `A practical ${tag} question for ${categoryName} interviews.`,
        explanation,
        sampleAnswer,
        detailedAnswer: buildUltraDetailedAnswer(categoryName, baseQuestion, tag, explanation, sampleAnswer),
        keyPoints: ["State your assumptions", "Use a specific example", "Explain the trade-off", "Close with the result or next step"],
        commonMistakes: ["Starting without clarifying the goal", "Listing tools without explaining judgment", "Making claims without evidence"],
        followUpQuestions: [
          `How would your answer change ${contextA}?`,
          `How would your answer change ${contextB}?`,
          "What would you measure after making that decision?",
        ],
        tags: [tag, slugify(categoryName)],
        isPublished: true,
        seoTitle: question,
        seoDescription: `Learn how to answer "${question}" with a clear, practical, interview-ready response.`
      },
      create: {
        question,
        slug,
        categoryId,
        subcategoryId: subcategory?.id,
        experienceLevel,
        difficulty,
        interviewType,
        shortDescription: `A practical ${tag} question for ${categoryName} interviews.`,
        explanation,
        sampleAnswer,
        detailedAnswer: buildUltraDetailedAnswer(categoryName, baseQuestion, tag, explanation, sampleAnswer),
        keyPoints: ["State your assumptions", "Use a specific example", "Explain the trade-off", "Close with the result or next step"],
        commonMistakes: ["Starting without clarifying the goal", "Listing tools without explaining judgment", "Making claims without evidence"],
        followUpQuestions: [
          `How would your answer change ${contextA}?`,
          `How would your answer change ${contextB}?`,
          "What would you measure after making that decision?",
        ],
        tags: [tag, slugify(categoryName)],
        isPublished: true,
        seoTitle: question,
        seoDescription: `Learn how to answer "${question}" with a clear, practical, interview-ready response.`
      }
    });
  }

  for (const article of articleSeeds) {
    const category = article.slug.includes("technical") ? categoryMap.get("Software Developer") : categoryMap.get("General");
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { ...article, categoryId: category, isPublished: true, publishedAt: new Date() },
      create: { ...article, categoryId: category, isPublished: true, publishedAt: new Date() }
    });
  }

  if (process.env.ADMIN_EMAIL) {
    await prisma.user.updateMany({
      where: { email: process.env.ADMIN_EMAIL.toLowerCase().trim() },
      data: { role: "ADMIN" }
    });
  }

  console.log(`Seeded ${topics.length} interview questions and ${articleSeeds.length} articles.`);
}

main().catch(error => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());