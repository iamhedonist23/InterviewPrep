import { PrismaClient, StudyLevel } from "@prisma/client";

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

        const sections = topicSeed.sections ?? [];
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

async function seedSoftwareEngineerCategory() {
  const category: CategorySeed = {
    name: "Software Engineer",
    slug: "software-engineer",
    description: "Master the core skills of a software engineer: SDLC, Agile, version control, testing, design patterns, and architecture.",
    icon: "SE",
    sortOrder: 15,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the foundations: SDLC, Agile, Git, basic testing, and problem‑solving.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "Software Development Lifecycle (SDLC)",
            slug: "sdlc",
            description: "Understand the phases of building software from requirements to maintenance.",
            topics: [
              {
                title: "SDLC Overview – The Blueprint",
                slug: "sdlc-overview",
                shortDescription: "Waterfall, Agile, and incremental models.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is SDLC", content: "The Software Development Lifecycle (SDLC) is a structured process for planning, creating, testing, and deploying software. It provides a framework for managing projects and ensuring quality. The core phases are: Requirement Analysis, Design, Implementation, Testing, Deployment, and Maintenance. Each phase may have specific deliverables and reviews. The choice of SDLC model depends on project size, complexity, and uncertainty." },
                  { title: "Phases in Detail", content: "**Requirement Analysis**: Gather and document what the system should do. Involves stakeholders, user stories, and acceptance criteria. **Design**: Architecture and detailed design – databases, APIs, UI, security. **Implementation**: Write code according to design, with code reviews and version control. **Testing**: Unit, integration, system, and acceptance testing. **Deployment**: Release to production, often via CI/CD pipelines. **Maintenance**: Bug fixes, enhancements, and monitoring." },
                  { title: "Waterfall Model – Sequential and Rigid", content: "A linear, sequential approach where each phase must be completed before the next begins. Strengths: simple, clear milestones, good for well‑understood requirements. Weaknesses: inflexible, late testing, high risk of failure if requirements change. Best used for projects with stable requirements and low uncertainty (e.g., government contracts)." },
                  { title: "Agile Model – Iterative and Adaptive", content: "An iterative approach with cross‑functional teams, adaptive planning, and early delivery. The Agile Manifesto values individuals and interactions, working software, customer collaboration, and responding to change. Common frameworks: Scrum, Kanban, XP. Strengths: flexibility, fast feedback, continuous improvement. Weaknesses: less predictable, requires close customer involvement." },
                  { title: "Other Models – V‑Model, Spiral, Lean, DevOps", content: "**V‑Model**: Verification and validation – each development phase has a corresponding testing phase. **Spiral**: Combines waterfall and prototyping, with risk analysis at each iteration. **Lean**: Focuses on eliminating waste, fast delivery, and continuous improvement. **DevOps**: Extends Agile to operations, emphasizing automation, monitoring, and collaboration between dev and ops." },
                ],
              },
              {
                title: "Agile and Scrum – The Framework",
                slug: "agile-scrum",
                shortDescription: "Scrum roles, ceremonies, and artifacts.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Agile Manifesto – The Values", content: "Four values: Individuals and interactions over processes and tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan. Twelve principles include early delivery, welcome changing requirements, deliver frequently, business and developers work together, motivated individuals, face‑to‑face conversation, working software as primary measure, sustainable pace, technical excellence, simplicity, self‑organizing teams, and reflect and adjust regularly." },
                  { title: "Scrum Roles – Accountabilities", content: "**Product Owner**: Represents stakeholders, prioritizes the Product Backlog, ensures value. **Scrum Master**: Facilitates Scrum, removes impediments, coaches team. **Development Team**: Cross‑functional professionals who deliver the Increment. Self‑organizing, typically 3‑9 members." },
                  { title: "Scrum Events – The Rhythm", content: "**Sprint**: Time‑boxed (1‑4 weeks) to produce a potentially shippable Increment. **Sprint Planning**: Define the Sprint Goal and select backlog items. **Daily Scrum**: 15‑min stand‑up for the team to synchronise. **Sprint Review**: Inspect the Increment and adapt the Product Backlog. **Sprint Retrospective**: Reflect on the Sprint and plan improvements." },
                  { title: "Scrum Artifacts – The Records", content: "**Product Backlog**: Ordered list of everything needed in the product – owned by Product Owner. **Sprint Backlog**: Items selected for the Sprint, plus a plan to deliver them. **Increment**: The sum of all completed backlog items at the end of a Sprint – must be in a usable condition." },
                  { title: "Estimation and Velocity", content: "Teams estimate work using story points (relative sizing). Velocity is the average number of story points completed per Sprint. Used for forecasting. Planning Poker is a common estimation technique. Avoid over‑committing; use historical velocity to set realistic Sprint goals." },
                  { title: "Scaling Agile – SAFe, LeSS, Nexus", content: "For large organisations, frameworks like SAFe (Scaled Agile Framework), LeSS (Large‑Scale Scrum), and Nexus provide additional structures. They introduce roles like Release Train Engineer, Product Management, and Architecture Epic Owner to coordinate multiple teams." },
                ],
              },
              {
                title: "Version Control (Git) – The Backbone of Collaboration",
                slug: "git-basics",
                shortDescription: "Essential Git commands and workflows.",
                estimatedMinutes: 30,
                sections: [
                  { title: "What is Git", content: "Git is a distributed version control system (DVCS) that tracks changes in source code. Each developer has a full copy of the repository, enabling offline work and fast operations. Commits form a directed acyclic graph (DAG) of snapshots." },
                  { title: "Core Commands", content: "**init**: Create a new repository. **clone**: Copy a remote repository. **add**: Stage changes for commit. **commit**: Save staged changes with a message. **status**: Show current state. **log**: View commit history. **diff**: Show changes between commits, branches, or working tree. **branch**: List, create, or delete branches. **checkout/switch**: Change branches or restore files. **merge**: Combine branches. **rebase**: Reapply commits on top of another base tip. **pull**: Fetch and merge from remote. **push**: Upload changes to remote. **stash**: Save uncommitted changes temporarily." },
                  { title: "Branching Strategies – Organising Work", content: "**Git Flow**: Uses two main branches (main and develop), feature branches, release branches, and hotfixes. Provides a structured model for releases. **GitHub Flow**: Simpler – main branch is always deployable; feature branches are merged via pull requests after review. **Trunk‑Based Development**: Developers merge small changes frequently into main (or trunk). Release branches are created for releases. Promotes continuous integration and reduces merge conflicts." },
                  { title: "Merge vs Rebase – History Management", content: "**Merge**: Combines two branches by creating a merge commit, preserving history as it happened. Simple and safe for collaborative branches. **Rebase**: Moves or reapplies commits to a new base, creating a linear history. Makes history cleaner but rewrites commit hashes, so use only for local branches. Best practice: rebase feature branches before merging to main, but avoid rebasing shared branches." },
                  { title: "Pull Requests (PRs) – Code Review", content: "PRs are a mechanism for code review before merging. Open a PR from a feature branch to the target branch. Reviewers comment on code, request changes, and approve. Automated CI checks run. Once approved, merge with options: merge commit, squash merge, or rebase and merge. PRs also serve as documentation of changes and decisions." },
                  { title: "Advanced Git – Cherry‑pick, Bisect, Hooks", content: "**Cherry‑pick**: Apply a specific commit from another branch. **Bisect**: Use binary search to find which commit introduced a bug. **Hooks**: Scripts that run on events (pre‑commit, pre‑push) for linting, testing. **Submodules**: Include another repository as a subfolder. **Rebase interactive**: Squash, reword, or reorder commits before sharing." },
                  { title: "Common Git Workflows", content: "**Solo developer**: One branch (main) with commits. **Team with PR**: Feature branches → PR → main. **Release branches**: Maintain a stable release branch (e.g., release/v1.0) for bug fixes while developing new features in main. **Hotfix**: Branch from main to fix critical production issues, then merge into both main and develop." },
                ],
              },
            ],
          },
          {
            title: "Problem Solving and Debugging",
            slug: "problem-solving",
            description: "Techniques to approach problems and debug code effectively.",
            topics: [
              {
                title: "Systematic Debugging – The Process",
                slug: "debugging",
                shortDescription: "Reproduce, isolate, fix, and verify.",
                estimatedMinutes: 22,
                sections: [
                  { title: "The Debugging Cycle", content: "1. **Reproduce**: Ensure you can consistently trigger the bug – get a reliable test case. 2. **Isolate**: Narrow down the location using logs, breakpoints, binary search (comment out code), or delta debugging. 3. **Fix**: Apply minimal changes to correct the issue; consider the root cause. 4. **Verify**: Test the fix thoroughly and ensure no regression. 5. **Learn**: Document the root cause and how to prevent it." },
                  { title: "Debugging Tools", content: "**IDE Debuggers**: Set breakpoints, step through code, inspect variables. **Logging**: Use levels (debug, info, error). Structured logging (JSON) for easier parsing. **Stack Traces**: Read them to see the call path and line numbers. **Profilers**: For performance issues (CPU, memory). **Network Tools**: Wireshark, browser dev tools for network requests." },
                  { title: "Common Debugging Techniques", content: "**Print Debugging**: Insert print statements to trace execution – simple but effective. **Rubber Duck Debugging**: Explain the code line‑by‑line to someone (or an object) – often reveals the issue. **Binary Search**: Comment out half the code to narrow down. **Log Analysis**: Aggregate logs, search for errors, patterns, or anomalies. **Reproduce in a Test**: Write a failing unit test that reproduces the bug, then fix until the test passes." },
                  { title: "Preventing Bugs – Proactive Measures", content: "**TDD**: Write tests before code. **Code Reviews**: Catch issues early. **Static Analysis**: Linters (ESLint, SonarQube) catch style and potential bugs. **Automated Testing**: Unit, integration, and E2E tests. **Defensive Programming**: Validate inputs, use assertions, handle errors gracefully." },
                ],
              },
              {
                title: "Algorithmic Thinking – Problem‑Solving Mindset",
                slug: "algorithmic-thinking",
                shortDescription: "Break problems into smaller subproblems and find efficient solutions.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Understanding the Problem", content: "Restate in your own words. Identify inputs, outputs, and constraints. Ask clarifying questions (e.g., sorted? duplicates? large input?). Consider edge cases: empty, single element, negative numbers, extreme values." },
                  { title: "Brute Force – Start Simple", content: "Start with a naive solution – often the simplest (e.g., nested loops). It helps you understand the problem. Then analyze its complexity. Once you have a baseline, look for optimisations." },
                  { title: "Optimization Strategies", content: "**Use appropriate data structures**: Hash maps for O(1) lookup, heaps for top‑k, tries for prefix search, graphs for relationships. **Divide and Conquer**: Split problem into sub‑problems (e.g., merge sort). **Dynamic Programming**: Store results of sub‑problems to avoid recomputation (memoization or tabulation). **Greedy**: Make locally optimal choices (e.g., interval scheduling). **Two‑pointers, Sliding Window**: For arrays/strings. **Binary Search**: For sorted data." },
                  { title: "Testing Your Solution", content: "Test with the given examples, then with edge cases. Use a mental or actual dry‑run. Think about invariants. If possible, write a brute‑force verifier to test against random inputs." },
                  { title: "Thinking in Trade‑offs", content: "Often there is a trade‑off between time and space (e.g., caching vs recomputation). Also between complexity and readability – sometimes a simpler solution is preferred unless performance is critical." },
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
        description: "Dive into testing, CI/CD, design patterns, and software architecture principles.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Software Testing – Quality Assurance",
            slug: "testing",
            description: "Unit, integration, functional, and performance testing.",
            topics: [
              {
                title: "Testing Pyramid – The Strategy",
                slug: "testing-pyramid",
                shortDescription: "Unit tests (most), integration tests, end‑to‑end tests (fewest).",
                estimatedMinutes: 22,
                sections: [
                  { title: "Concept", content: "The testing pyramid recommends a large number of fast, cheap unit tests, a moderate number of integration tests, and few slow, expensive end‑to‑end tests. This balances speed, confidence, and cost." },
                  { title: "Unit Tests – The Foundation", content: "Test individual units (functions, classes) in isolation. Mock dependencies. Fast (milliseconds), easy to write, and give fine‑grained feedback. Use a test framework (JUnit, pytest, Mocha)." },
                  { title: "Integration Tests – Interaction Checks", content: "Test interactions between components: database, external APIs, file system. Slower but catch integration issues. Use test containers, embedded databases, or real test environments." },
                  { title: "End‑to‑End (E2E) Tests – User Journeys", content: "Test full user flows through the entire system. Often use tools like Selenium, Cypress, Playwright. Fragile (flaky), slow, but provide high confidence that the system works from a user perspective." },
                  { title: "Test Doubles – Mocks, Stubs, Fakes", content: "**Mocks**: Objects with pre‑programmed expectations (verify interactions). **Stubs**: Provide canned answers to calls. **Fakes**: Lightweight implementations (e.g., in‑memory database). **Spies**: Wrap real objects to record calls. Choose based on what you need to test." },
                  { title: "Test Coverage – Quantity vs Quality", content: "Measures the percentage of code exercised by tests. **Line coverage**, **branch coverage**, **function coverage**. High coverage doesn't guarantee good tests – focus on meaningful assertions. Use tools like JaCoCo, Istanbul, Coverage.py. Aim for 70‑80%, but quality over quantity." },
                ],
              },
              {
                title: "Test‑Driven Development (TDD)",
                slug: "tdd",
                shortDescription: "Red‑Green‑Refactor cycle.",
                estimatedMinutes: 24,
                sections: [
                  { title: "TDD Cycle", content: "**Red**: Write a failing test that defines a new feature or fixes a bug. **Green**: Write the simplest code to pass the test. **Refactor**: Improve the code while keeping tests green. Repeat. This builds confidence and forces good design." },
                  { title: "Benefits", content: "**Improves design**: Forces modular, testable code. **Reduces bugs**: Catches issues early. **Living documentation**: Tests describe how the system works. **Regression prevention**: When you refactor, tests catch breaks." },
                  { title: "When to Use TDD", content: "TDD is excellent for new code, bug fixes, and complex logic. It's less suitable for exploratory programming (e.g., prototypes) or when the requirements are unclear. Many teams practice TDD for critical core modules." },
                  { title: "ATDD and BDD", content: "**Acceptance Test‑Driven Development (ATDD)**: Write tests based on acceptance criteria before implementation. **Behavior‑Driven Development (BDD)**: Uses Given‑When‑Then to describe behavior in plain language (e.g., Cucumber, SpecFlow). Integrates with TDD." },
                ],
              },
              {
                title: "CI/CD – Continuous Integration and Delivery",
                slug: "ci-cd",
                shortDescription: "Continuous Integration and Continuous Delivery/Deployment.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Continuous Integration (CI)", content: "Developers frequently merge code into a shared mainline (often multiple times a day). Each merge triggers an automated build and test suite to catch integration issues quickly. Benefits: early bug detection, reduced merge conflicts, faster feedback." },
                  { title: "Continuous Delivery (CD)", content: "Extends CI – after passing tests, the software is automatically deployed to a staging environment, making it production‑ready. The final deployment to production is manual or requires approval. This ensures that any commit can be released at any time." },
                  { title: "Continuous Deployment", content: "Every change that passes the pipeline is automatically deployed to production. Requires high confidence in tests, monitoring, and rollback procedures. Common in SaaS companies with strong DevOps culture." },
                  { title: "CI/CD Pipeline Stages", content: "**Source**: Version control (Git). **Build**: Compile, lint, package. **Test**: Unit, integration, security scans. **Deploy**: Deploy to staging, run smoke tests, then deploy to production (if continuous deployment). **Post‑Deploy**: Monitor, health checks, rollback if needed." },
                  { title: "Deployment Strategies – Blue‑Green, Canary, Feature Flags", content: "**Blue‑Green**: Two identical environments; route traffic to the new version after validation. **Canary**: Gradually roll out to a small subset of users. **Feature Flags**: Enable/disable features in production without redeploying. **Rolling**: Incrementally update instances." },
                  { title: "CI/CD Tools – Jenkins, GitHub Actions, GitLab CI", content: "**Jenkins**: Popular open‑source automation server. **GitHub Actions**: Integrated with GitHub. **GitLab CI**: Built‑in GitLab. **CircleCI**: Cloud‑based. **Travis CI**: Early cloud CI. Choose based on your repository hosting, ease of use, and required integrations." },
                ],
              },
            ],
          },
          {
            title: "Design Patterns – Reusable Solutions",
            slug: "design-patterns",
            description: "Creational, structural, and behavioral patterns.",
            topics: [
              {
                title: "Creational Patterns – Object Creation",
                slug: "creational-patterns",
                shortDescription: "Singleton, Factory, Builder, Prototype.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Singleton", content: "Ensures a class has only one instance and provides a global access point. Use for logging, configuration, thread pools, or database connection pools. Implementation: private constructor, static method to get instance, careful with multithreading (use double‑checked locking or enum in Java). Drawbacks: global state, hard to test." },
                  { title: "Factory Method", content: "Defines an interface for creating an object, but lets subclasses decide which class to instantiate. Encapsulates object creation. Example: Document creator with different document types (Word, PDF). Promotes loose coupling." },
                  { title: "Abstract Factory", content: "Provides an interface for creating families of related or dependent objects without specifying concrete classes. Example: UI toolkit – create Windows or Mac‑style widgets." },
                  { title: "Builder", content: "Separates the construction of a complex object from its representation. Useful when there are many optional parameters (e.g., pizza builder). Fluent interface (method chaining) is common. Benefits: immutability, clearer construction." },
                  { title: "Prototype", content: "Creates new objects by cloning an existing object. Used when object creation is expensive or when the system should be independent of how its objects are created. In Java, implement Cloneable. In JavaScript, use Object.create()." },
                ],
              },
              {
                title: "Structural Patterns – Composing Classes and Objects",
                slug: "structural-patterns",
                shortDescription: "Adapter, Decorator, Facade, Proxy.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Adapter", content: "Allows incompatible interfaces to work together. Wraps an existing class with a new interface. Example: you have a legacy system with a different API – you create an adapter to match the new interface. Used in integration." },
                  { title: "Decorator", content: "Adds additional responsibilities to objects dynamically. Used to extend functionality without subclassing. Example: Java I/O – BufferedInputStream is a decorator. Also used for logging, caching, authentication." },
                  { title: "Facade", content: "Provides a simplified interface to a complex subsystem. Used to reduce complexity and dependency. Example: a library with many classes – the facade provides a single entry point. Often used in API design." },
                  { title: "Proxy", content: "Controls access to another object. Can be used for lazy initialization, access control, logging, or caching. Types: **Virtual Proxy** (load on demand), **Protection Proxy** (access control), **Remote Proxy** (local representation of a remote object)." },
                  { title: "Bridge", content: "Decouples abstraction from implementation so that both can vary independently. Useful when you have multiple dimensions of variability (e.g., shapes and rendering engines)." },
                ],
              },
              {
                title: "Behavioral Patterns – Communication and Responsibility",
                slug: "behavioral-patterns",
                shortDescription: "Observer, Strategy, Command, State.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Observer", content: "Defines a one‑to‑many dependency so that when one object changes state, all dependents are notified. Used in event‑driven systems, pub‑sub, MVC. In Java: Observer/Observable (deprecated), use PropertyChangeListener or custom." },
                  { title: "Strategy", content: "Encapsulates interchangeable algorithms and allows the algorithm to be selected at runtime. Example: sorting strategies (bubble, merge, quick), compression strategies (zip, gzip). Avoids conditional statements." },
                  { title: "Command", content: "Encapsulates a request as an object, allowing parameterization, queuing, and undo/redo. Example: GUI buttons – each button has a command. In some languages, use lambda functions to simplify." },
                  { title: "State", content: "Allows an object to alter its behavior when its internal state changes. The object appears to change its class. Example: vending machine states (idle, coin inserted, dispensing). Replaces large conditional logic." },
                  { title: "Template Method", content: "Defines the skeleton of an algorithm, deferring some steps to subclasses. Used to avoid code duplication. Common in frameworks (e.g., JUnit’s setUp/tearDown)." },
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
        description: "System architecture, scalability, distributed systems, microservices, cloud, and DevSecOps.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Software Architecture",
            slug: "architecture",
            description: "Monoliths, microservices, event‑driven, and serverless.",
            topics: [
              {
                title: "Monolithic vs Microservices – The Spectrum",
                slug: "monolith-vs-microservices",
                shortDescription: "Trade‑offs between simplicity and scalability.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Monolith", content: "A single deployable unit containing all modules. Pros: simple to develop, deploy, debug. Cons: grows large, slows down CI/CD, scaling requires scaling the whole app, coupling between modules. Often a good starting point." },
                  { title: "Microservices", content: "Each service is independently deployable, runs its own process, and communicates via lightweight protocols (REST, gRPC, messaging). Pros: independent teams, scaling per service, technology diversity. Cons: distributed complexity, network latency, data consistency, monitoring, and testing." },
                  { title: "When to Choose", content: "Start with a modular monolith. Split when you have multiple teams, scaling bottlenecks, or need to deploy parts independently. Use Domain‑Driven Design (DDD) to define bounded contexts, which become natural service boundaries." },
                  { title: "Modular Monolith", content: "A monolith with well‑defined module boundaries, separate namespaces/packages, and clear interfaces. Allows many benefits of microservices (modularity) without the distribution overhead. Can be split later if needed." },
                ],
              },
              {
                title: "Event‑Driven Architecture – Asynchronous Communication",
                slug: "event-driven",
                shortDescription: "Asynchronous communication via events.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Concept", content: "Components communicate by emitting events (domain events) and consuming them. Event producers and consumers are decoupled. Event store (like Kafka) keeps events." },
                  { title: "Event Sourcing", content: "The state of an entity is stored as a sequence of events. Rebuild state by replaying events. Benefits: audit trail, temporal queries, ability to reconstruct state at any point. Complexity: event versioning, eventual consistency." },
                  { title: "CQRS – Command Query Responsibility Segregation", content: "Separate read and write models. Use different data stores and optimise each. Works well with event sourcing. Complexity increases, but can improve performance and scalability." },
                  { title: "Messaging Patterns – Pub‑Sub, Routing, Idempotency", content: "**Publish‑Subscribe**: One event goes to many consumers. **Message Routing**: Content‑based routing, splitter, aggregator. **Dead Letter Queue**: Handle failures. **Idempotent Consumers**: Ensure messages are processed once." },
                ],
              },
              {
                title: "Designing for Scalability",
                slug: "scalability",
                shortDescription: "Horizontal vs vertical scaling, caching, load balancing.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Vertical Scaling – Adding Power", content: "Add more resources (CPU, RAM, disk) to a single machine. Simple but has a hard limit and often expensive. Useful for small to medium workloads." },
                  { title: "Horizontal Scaling – Adding Machines", content: "Add more machines to distribute the load. Requires a stateless service (or stateful with careful management). Benefits: virtually unlimited scale, redundancy, cost‑effective." },
                  { title: "Caching Strategies", content: "**Cache‑Aside**: App checks cache, if miss, reads DB and writes to cache. **Read‑Through**: Cache acts as the primary data source. **Write‑Through**: Writes go to cache and DB synchronously. **Write‑Behind**: Writes go to cache, then asynchronously to DB. Choose based on consistency and performance needs." },
                  { title: "Load Balancing", content: "Distributes incoming requests across multiple servers. Algorithms: round‑robin, least connections, IP hash, weighted. At different levels: DNS, application load balancer (e.g., NGINX, AWS ALB). Also health checks, session stickiness if needed." },
                  { title: "Database Sharding – Partitioning Data", content: "Partition data across multiple databases (shards) based on a shard key (e.g., user ID, geographical region). Challenges: cross‑shard queries, rebalancing, and hot shards. Use consistent hashing to reduce rebalancing impact." },
                ],
              },
              {
                title: "Distributed Systems – Coordination and Consistency",
                slug: "distributed-systems",
                shortDescription: "Consistency, consensus, and failure handling.",
                estimatedMinutes: 30,
                sections: [
                  { title: "CAP Theorem – The Trade‑off", content: "In a distributed system, you can only achieve two of Consistency, Availability, and Partition tolerance simultaneously. Network partitions (Partition tolerance) are unavoidable, so you must choose between Consistency (CP) and Availability (AP). Many systems choose AP for better availability, accepting eventual consistency." },
                  { title: "Consistency Models", content: "**Strong Consistency**: All clients see the same data immediately – hard to achieve in practice. **Eventual Consistency**: Data will become consistent eventually – used in many distributed databases. **Monotonic Reads**: Once you see a value, you never see an older version. **Read‑Your‑Writes**: After writing, you can read your own write." },
                  { title: "Consensus Algorithms – Raft, Paxos, Zab", content: "**Raft**: Easier to understand than Paxos. Uses leader election, log replication, and safety. **Paxos**: Classic, but complex. **Zab**: Used in Zookeeper. These algorithms ensure agreement among nodes despite failures." },
                  { title: "Distributed Transactions – 2PC and Saga", content: "**Two‑Phase Commit (2PC)**: Coordinator manages prepare and commit phases – blocking, not resilient. **Saga**: Compensating actions – each step has a compensating transaction. Used in microservices for eventual consistency. **Outbox Pattern**: For reliable messaging." },
                  { title: "Idempotency – Safe Retries", content: "An operation that can be applied multiple times without changing the result beyond the first application. Essential for retries in distributed systems. Implement with unique request IDs, version checks, or state machines." },
                ],
              },
            ],
          },
          // --- CORRECTED: DevOps and Cloud is now a separate module ---
          {
            title: "DevOps and Cloud – The Operations Side",
            slug: "devops-cloud",
            description: "Infrastructure as Code, containers, orchestration, and monitoring.",
            topics: [
              {
                title: "Containers (Docker) – Packaging Applications",
                slug: "docker",
                shortDescription: "Package applications with dependencies into lightweight containers.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is a Container", content: "A lightweight, standalone executable package that includes everything needed to run an application: code, runtime, system tools, libraries, and settings. Containers share the host OS kernel, making them more efficient than virtual machines." },
                  { title: "Dockerfile – Building Images", content: "Defines how to build an image. Common instructions: **FROM** (base image), **RUN** (execute commands), **COPY/ADD** (copy files), **EXPOSE** (port), **CMD/ENTRYPOINT** (start command). Best practices: use specific tags, minimize layers, run as non‑root." },
                  { title: "Docker Compose – Multi‑Container Apps", content: "Define and run multi‑container applications with a YAML file. Services, networks, volumes. Example: web app + database + cache. Great for local development and CI." },
                  { title: "Container Security", content: "Scan images for vulnerabilities (Trivy, Clair). Use minimal base images (Alpine, Distroless). Avoid running as root. Use secrets management (Docker secrets, Kubernetes secrets)." },
                ],
              },
              {
                title: "Orchestration (Kubernetes) – Managing Containers at Scale",
                slug: "kubernetes",
                shortDescription: "Automate deployment, scaling, and management of containerized applications.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Key Concepts", content: "**Pod**: Smallest deployable unit – one or more containers. **Service**: Stable network endpoint for a set of pods. **Deployment**: Manages rollout and rollback of Pods. **ConfigMap**: External configuration. **Secret**: Sensitive data. **Ingress**: HTTP routing to services. **PersistentVolume**: Storage." },
                  { title: "Scaling and Self‑Healing", content: "**Horizontal Pod Autoscaler (HPA)**: Scales pods based on CPU/memory or custom metrics. **Vertical Pod Autoscaler (VPA)**: Adjusts resource requests/limits. **Self‑Healing**: Restarts failed pods, reschedules on node failures, replaces nodes." },
                  { title: "Deployment Strategies – RollingUpdate, Blue‑Green, Canary", content: "**RollingUpdate**: Incrementally replace old pods with new ones – minimal downtime. **Recreate**: Stop all old pods, then start new – downtime. **Blue‑Green**: Run two versions, switch traffic. **Canary**: Gradually increase traffic to new version." },
                ],
              },
              {
                title: "Infrastructure as Code (IaC) – Declarative Infrastructure",
                slug: "iac",
                shortDescription: "Manage infrastructure declaratively with code.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is IaC", content: "Manage and provision infrastructure (servers, networks, databases) using machine‑readable definition files. Allows version control, consistency, and automation. Replaces manual configurations." },
                  { title: "Tools – Terraform, CloudFormation, Pulumi, Ansible", content: "**Terraform**: Multi‑cloud, declarative, uses HCL. **AWS CloudFormation**: AWS‑specific. **Pulumi**: Use general‑purpose programming languages. **Ansible**: Configuration management (also used for application deployment). **Chef/Puppet**: Older, Ruby‑based." },
                  { title: "Benefits", content: "**Consistency**: Same configuration everywhere. **Versioning**: Track infrastructure changes. **Automation**: CI/CD for infrastructure. **Disaster Recovery**: Easily recreate infrastructure." },
                ],
              },
              {
                title: "Monitoring and Observability – Understanding Systems",
                slug: "monitoring",
                shortDescription: "Metrics, logs, and traces for understanding system behavior.",
                estimatedMinutes: 26,
                sections: [
                  { title: "The Three Pillars – Metrics, Logs, Traces", content: "**Metrics**: Numeric time‑series data (e.g., request rate, CPU usage). **Logs**: Detailed event records (structured or unstructured). **Traces**: End‑to‑end view of a request across services." },
                  { title: "Metrics and Alerting – Prometheus, Grafana", content: "Collect with **Prometheus**, visualize with **Grafana**. Define SLIs (Service Level Indicators) and SLOs (Service Level Objectives). Alert on error rates, latency, saturation. Use **Alertmanager** for routing." },
                  { title: "Logging – ELK, Loki", content: "Aggregate logs with **ELK** (Elasticsearch, Logstash, Kibana) or **Loki**. Use structured logging (JSON) for better parsing. Log levels: debug, info, warn, error. Be mindful of sensitive data." },
                  { title: "Distributed Tracing – Jaeger, Zipkin", content: "Use **Jaeger** or **Zipkin**. Each request gets a trace ID, propagated across services. Each service creates spans with timing and metadata. Useful for identifying bottlenecks in microservices." },
                ],
              },
            ],
          },
          // --- CORRECTED: DevSecOps module ---
          {
            title: "DevSecOps – Security in the Pipeline",
            slug: "devsecops",
            description: "Integrate security into the SDLC.",
            topics: [
              {
                title: "DevSecOps Implementation",
                slug: "devsecops-details",
                shortDescription: "Integrate security into the SDLC.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Shift‑Left Security", content: "Start security early – in design, code, and testing. Use threat modeling, secure coding guidelines, and automated security scanning." },
                  { title: "SAST, DAST, SCA – Automated Security Tools", content: "**SAST**: Static Application Security Testing – code analysis. **DAST**: Dynamic Application Security Testing – runtime. **SCA**: Software Composition Analysis – dependencies. **Container Scanning**: Scan images for vulnerabilities." },
                  { title: "Secrets Management", content: "Never hardcode secrets. Use tools like HashiCorp Vault, AWS Secrets Manager, or Kubernetes Secrets (with external‑secrets). Rotate credentials regularly." },
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
        description: "Common Software Engineering interview questions, system design, and behavioural scenarios.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Concepts",
            slug: "se-core-concepts",
            description: "SDLC, Agile, CI/CD, testing, and design patterns.",
            topics: [
              {
                title: "SDLC and Agile",
                slug: "sdlc-agile-interview",
                shortDescription: "Compare Waterfall and Agile; explain Scrum.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Waterfall vs Agile", content: "Waterfall is sequential, rigid, with late testing; Agile is iterative, flexible, with early and frequent feedback. Waterfall is better for projects with stable requirements; Agile for evolving requirements." },
                  { title: "Scrum in Depth", content: "Explain the roles, events, artifacts, and how they work together. Mention estimation (story points), velocity, and how to handle changing priorities." },
                  { title: "Common Interview Questions", content: "'How would you handle scope creep?' – use Agile to prioritise backlog. 'What's a successful Sprint?' – delivering a valuable increment that meets the Sprint Goal." },
                ],
              },
              {
                title: "Testing Strategies",
                slug: "testing-interview",
                shortDescription: "Unit vs integration vs E2E; TDD.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Testing Pyramid", content: "Explain why unit tests are the foundation, integration tests validate interactions, and E2E tests are the thin top. Discuss trade‑offs in speed, cost, and confidence." },
                  { title: "TDD and BDD", content: "Describe the Red‑Green‑Refactor cycle. Explain how BDD uses Given‑When‑Then to define behavior. Mention that TDD drives design and provides documentation." },
                ],
              },
              {
                title: "Design Patterns",
                slug: "design-patterns-interview",
                shortDescription: "Explain Singleton, Factory, Observer, and their use cases.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Singleton", content: "Used for logging, configuration, connection pools. Explain double‑checked locking and enum implementation." },
                  { title: "Factory", content: "Used when object creation is complex or should be decoupled. Example: dependency injection frameworks." },
                  { title: "Observer", content: "Used for event handling, pub‑sub. In Java, use PropertyChangeListener. In JavaScript, custom event emitters." },
                  { title: "Strategy", content: "Used to swap algorithms at runtime. Example: payment processors (credit card, PayPal)." },
                ],
              },
            ],
          },
          {
            title: "System Design",
            slug: "system-design-interview",
            description: "Design scalable systems like URL shortener, chat app, or e‑commerce.",
            topics: [
              {
                title: "Design a URL Shortener",
                slug: "url-shortener",
                shortDescription: "Hashing, scaling, caching, and database design.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Requirements", content: "Functional: shorten long URLs, redirect to original. Non‑functional: low latency, high availability, durable, handle millions of URLs." },
                  { title: "API Design", content: "POST /shorten (longUrl) -> shortCode; GET /{shortCode} -> redirect." },
                  { title: "Encoding", content: "Use Base62 (a‑z, A‑Z, 0‑9) to generate short codes. Collision handling: check if code already exists, generate new. Alternatively, use a unique ID generator (Snowflake) and encode." },
                  { title: "Database", content: "Key‑value store: DynamoDB or Redis (with persistence). Shard by shortCode hash. Use a relational DB for analytics." },
                  { title: "Caching", content: "Cache frequent redirects in Redis with TTL." },
                  { title: "Scaling", content: "Load balancers, multiple read replicas, CDN for static assets. Consider a separate service for analytics." },
                ],
              },
              {
                title: "Design a Chat System",
                slug: "chat-system",
                shortDescription: "WebSockets, message queues, and presence.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Requirements", content: "Real‑time messaging (1‑1, group), read receipts, online/offline, history." },
                  { title: "High‑Level Design", content: "Client → WebSocket Gateway → Message Service → Storage (Cassandra, Redis)." },
                  { title: "WebSocket Connections", content: "Use a load balancer with session affinity. Handle reconnections gracefully." },
                  { title: "Message Storage", content: "Cassandra for high write throughput. Use a time‑ordered partition (e.g., user_id + timestamp)." },
                  { title: "Presence", content: "Store online status in Redis with TTL. Update on connect/disconnect." },
                  { title: "Scaling", content: "Horizontal scaling of gateways and message services. Use Kafka for message queuing between services." },
                ],
              },
              {
                title: "Design an E‑Commerce System",
                slug: "ecommerce-design",
                shortDescription: "Inventory, orders, payments, and microservices.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Requirements", content: "Product catalog, shopping cart, order placement, payment, inventory management." },
                  { title: "Service Decomposition", content: "Product Service, Cart Service, Order Service, Payment Service, Inventory Service, Notification Service." },
                  { title: "Data Consistency", content: "Use Saga pattern for order processing: Reserve inventory → Process payment → Update order status → Notify. Each step has a compensating action." },
                  { title: "Caching", content: "Cache product details in Redis. Use a CDN for images." },
                  { title: "Scaling", content: "Use event‑driven messaging (Kafka) to decouple services. Shard databases by region or product category." },
                ],
              },
            ],
          },
          {
            title: "Behavioral and Leadership",
            slug: "behavioral-interview",
            description: "Answer questions about teamwork, conflict, failure, and mentorship.",
            topics: [
              {
                title: "Handling Conflict",
                slug: "conflict",
                shortDescription: "STAR method for resolving disagreements.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Situation", content: "Set the scene – what was happening? Who was involved?" },
                  { title: "Task", content: "What needed to be resolved? What were the stakes?" },
                  { title: "Action", content: "What steps did you take to address it? How did you communicate?" },
                  { title: "Result", content: "What was the outcome? What did you learn?" },
                  { title: "Tips", content: "Focus on collaboration, not blame. Emphasize listening and finding common ground." },
                ],
              },
              {
                title: "Technical Leadership",
                slug: "tech-leadership",
                shortDescription: "Mentoring, code reviews, and driving technical decisions.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Code Reviews", content: "Focus on readability, maintainability, security. Provide constructive, actionable feedback. Balance speed and quality." },
                  { title: "Mentoring", content: "Pair programming, knowledge sharing sessions, gradually increase responsibility." },
                  { title: "Technical Decision Making", content: "Gather data, consider trade‑offs, involve stakeholders, document decisions. Use ADRs (Architecture Decision Records)." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ Software Engineer category seeded (ultra‑detailed)");
}

async function main() {
  await seedSoftwareEngineerCategory();
}

main()
  .catch((error) => {
    console.error("Software Engineer seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });