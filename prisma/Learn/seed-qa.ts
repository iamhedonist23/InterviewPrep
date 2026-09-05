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

async function seedQACategory() {
  const category: CategorySeed = {
    name: "Quality Assurance (QA)",
    slug: "quality-assurance",
    description: "Master software testing: manual, automation, performance, security, and test management.",
    icon: "QA",
    sortOrder: 17,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Learn the fundamentals of QA, testing types, test case design, and bug reporting.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "QA Fundamentals – The Big Picture",
            slug: "qa-fundamentals",
            description: "Introduction to software testing, SDLC, and test types.",
            topics: [
              {
                title: "Introduction to Software Testing – Why Quality Matters",
                slug: "intro-testing",
                shortDescription: "What is testing? Why is it important?",
                estimatedMinutes: 26,
                sections: [
                  { title: "What is Software Testing?", content: "Software testing is the process of evaluating a system or its components to find whether it meets specified requirements and to detect defects. It ensures quality, reliability, and user satisfaction. Testing is not just about finding bugs – it's about building confidence in the product." },
                  { title: "Why Testing Matters – The Cost of Quality", content: "Testing saves costs by catching defects early, reduces business risks, protects brand reputation, and ensures compliance. The cost of fixing a bug increases exponentially the later it's found – a bug discovered in production can cost 100 times more to fix than one found during requirements analysis." },
                  { title: "Testing vs Debugging", content: "Testing finds defects; debugging fixes them. Testing is done by testers (or developers in unit testing); debugging is done by developers. Testing is a proactive activity; debugging is reactive." },
                  { title: "Quality Assurance vs Quality Control", content: "QA focuses on process (prevention) – ensuring the development process is correct. QC focuses on product (detection) – verifying the final product meets standards. QA is proactive, QC is reactive." },
                ],
              },
              {
                title: "Software Development Lifecycle (SDLC) and Testing – Where Testing Fits",
                slug: "sdlc-testing",
                shortDescription: "How testing fits into different SDLC models.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Testing in Waterfall", content: "In Waterfall, testing is a separate phase after development. This leads to late defect discovery and higher costs. Defects found late are expensive to fix and can delay release." },
                  { title: "Testing in Agile", content: "Testing is integrated throughout iterations. Continuous testing and early feedback are key. Testers work alongside developers, and testing is done in parallel with development." },
                  { title: "V‑Model – Testing in Parallel", content: "The V‑Model maps development phases to testing phases: unit testing corresponds to coding, integration to design, system to requirements, acceptance to user needs. It shows that testing should be planned from the start." },
                  { title: "Shift‑Left Testing – Start Early", content: "Shift‑left means starting testing as early as possible – in requirements and design stages. Involve testers from the beginning to prevent defects rather than just find them." },
                ],
              },
              {
                title: "Types of Testing – The Complete Picture",
                slug: "testing-types",
                shortDescription: "Functional, non‑functional, manual, and automated testing.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Functional Testing", content: "Tests what the system does – features, APIs, user interfaces. Includes unit (individual components), integration (component interactions), system (end‑to‑end), acceptance (user acceptance), regression (ensuring changes don't break existing features), and smoke testing (basic sanity check)." },
                  { title: "Non‑Functional Testing", content: "Tests how the system performs – performance (load, stress, endurance), usability (user experience), reliability (availability, MTBF), scalability (handling growth), security (vulnerabilities), and compatibility (browsers, devices, OS)." },
                  { title: "Manual vs Automated Testing", content: "Manual testing is performed by humans; automation uses scripts and tools. Manual is good for exploratory, usability, and ad‑hoc testing – it relies on human intuition. Automation is good for regression, performance, and repetitive tasks – it's fast and reliable but expensive to set up." },
                  { title: "Black‑Box vs White‑Box Testing", content: "Black‑box testing treats the system as a 'black box' – testers don't see internal code. White‑box testing examines internal structures, logic, and code paths. Grey‑box testing is a mix." },
                ],
              },
              {
                title: "Test Case Design Techniques – Smart Testing",
                slug: "test-case-design",
                shortDescription: "Equivalence partitioning, boundary value analysis, decision tables, state transition.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Equivalence Partitioning – Divide and Conquer", content: "Divide input data into equivalent classes – testing one value from each class is sufficient. Reduces test cases while maintaining coverage. For example, if a field accepts values 1‑100, the classes are: invalid (<1), valid (1‑100), invalid (>100)." },
                  { title: "Boundary Value Analysis – Edges Are Critical", content: "Test values at the edges of equivalence classes – these are where defects are most likely to occur. For a range 1‑100, test 0, 1, 100, 101 – the boundaries." },
                  { title: "Decision Table Testing – Complex Logic", content: "Create tables of conditions and actions for complex business logic. Ensures all combinations are considered. Useful for rules engines and decision logic." },
                  { title: "State Transition Testing – State‑Dependent Systems", content: "Test systems that have states and transitions (e.g., login, order status). Identify valid and invalid transitions." },
                  { title: "Use Case Testing – From User Stories", content: "Derive test cases from use cases – test each flow (happy path, alternate paths, exceptions)." },
                ],
              },
              {
                title: "Bug Reporting and Tracking – The Communication Hub",
                slug: "bug-reporting",
                shortDescription: "How to write effective bug reports and use tracking tools.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Anatomy of a Good Bug Report", content: "**Summary**: brief and clear. **Steps to Reproduce**: concise, step‑by‑step. **Expected vs Actual Result**. **Priority** (urgency) and **Severity** (impact). **Attachments** (screenshots, logs). Environment details (OS, browser, version)." },
                  { title: "Bug Lifecycle", content: "New → Assigned → Open → Fixed → Retested → Closed (or Reopened). Other statuses: Duplicate, Won't Fix, Deferred. Each status change should include a comment explaining the reason." },
                  { title: "Bug Tracking Tools", content: "JIRA (most common), Bugzilla, Trello, GitHub Issues, ClickUp. Know how to create, update, and query issues. Also understand workflows and permissions." },
                  { title: "Effective Communication", content: "Be precise, objective, and constructive. Avoid blaming. Provide enough detail for developers to reproduce and fix. Use clear language and include logs/screenshots." },
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
        description: "Automation testing, API testing, BDD, and CI/CD integration.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "Automation Testing – Speed and Reliability",
            slug: "automation",
            description: "Selenium, Playwright, and test automation frameworks.",
            topics: [
              {
                title: "Test Automation Fundamentals – When and What",
                slug: "automation-fundamentals",
                shortDescription: "When to automate, ROI, and framework design.",
                estimatedMinutes: 24,
                sections: [
                  { title: "When to Automate", content: "Automate repetitive, high‑volume, critical, and regression tests. Avoid automating unstable features or one‑off tests. Also consider: tests that are time‑consuming to run manually, tests that need to run on multiple environments, and tests that need to be run frequently." },
                  { title: "Automation ROI – The Business Case", content: "Calculate ROI: time saved vs development and maintenance effort. Tests that run many times pay off. Consider the cost of writing and maintaining the scripts versus the time saved in manual execution." },
                  { title: "Framework Types", content: "Modular (separate test scripts), Data‑Driven (external data), Keyword‑Driven (keywords for actions), Hybrid (combination). Choose based on project complexity and team skills." },
                  { title: "Page Object Model (POM) – The Best Practice", content: "Organise code into page classes that represent UI pages. Abstracts locators and actions, improves maintainability. When the UI changes, only the page class needs updating." },
                ],
              },
              {
                title: "Selenium WebDriver – Automating the Browser",
                slug: "selenium",
                shortDescription: "Automate web applications with Selenium.",
                estimatedMinutes: 30,
                sections: [
                  { title: "Selenium Architecture", content: "WebDriver API communicates with browser drivers (ChromeDriver, GeckoDriver) via the W3C WebDriver protocol. Supports multiple browsers and languages." },
                  { title: "Locators – Finding Elements", content: "ID, Name, ClassName, TagName, CSS Selector, XPath. XPath is powerful but slower; CSS is faster and simpler. Prefer ID and CSS for stability." },
                  { title: "WebDriver Commands", content: "`findElement`, `click`, `sendKeys`, `getText`, `getAttribute`, `navigate`, `manage` (cookies, timeouts). Use `WebDriverWait` for reliable interactions." },
                  { title: "Waits – Synchronisation", content: "**Implicit**: set globally; waits for elements to appear. **Explicit**: wait for a specific condition (e.g., element to be clickable). **Fluent**: more flexible polling. Avoid `Thread.sleep` – it's brittle." },
                  { title: "TestNG / JUnit Integration", content: "Use annotations (`@Test`, `@BeforeMethod`, `@AfterMethod`) for test lifecycle. Assertions, data providers, groups. Generate reports." },
                ],
              },
              {
                title: "Behavior‑Driven Development (BDD) – Collaboration",
                slug: "bdd",
                shortDescription: "BDD with Cucumber and Gherkin.",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is BDD?", content: "BDD is an agile practice that encourages collaboration between business, developers, and testers. It uses plain‑language specifications to define behaviour." },
                  { title: "Gherkin – The Language", content: "Feature: ... Scenario: ... Given ... When ... Then ... And ... Example: `Given I am on the login page When I enter valid credentials Then I should see the dashboard`." },
                  { title: "Cucumber – The Tool", content: "Cucumber executes Gherkin scenarios and maps steps to code. It bridges the gap between business requirements and automated tests." },
                  { title: "Benefits", content: "Living documentation, improved communication, and automated acceptance tests." },
                ],
              },
              {
                title: "API Testing – Beyond the UI",
                slug: "api-testing",
                shortDescription: "Test REST APIs with Postman, REST Assured, and automated assertions.",
                estimatedMinutes: 28,
                sections: [
                  { title: "API Testing Basics", content: "Verify request/response contracts, status codes, headers, payload structure, and performance. Focus on business logic and edge cases." },
                  { title: "Tools", content: "**Postman** – manual and collection‑based testing. **REST Assured** – Java library for automated API testing. **Insomnia**, **SoapUI** (SOAP). **Newman** – runs Postman collections in CI." },
                  { title: "Common Assertions", content: "Status codes (200, 201, 400, 404), JSON path validation, schema validation (using JSON Schema), response time, and headers." },
                  { title: "Contract Testing – Pact", content: "Ensure provider and consumer agree on the contract. Pact allows consumers to define expectations and providers to verify them. This catches integration issues early." },
                ],
              },
              {
                title: "CI/CD Integration – Automating the Pipeline",
                slug: "ci-cd-integration",
                shortDescription: "Integrate tests into pipelines (Jenkins, GitHub Actions, GitLab CI).",
                estimatedMinutes: 24,
                sections: [
                  { title: "Why CI/CD for Testing", content: "Ensures tests run automatically on every commit, providing fast feedback and preventing regressions. Catches issues early in the development cycle." },
                  { title: "Pipeline Stages", content: "Build → Unit Tests → Integration Tests → Deploy to Staging → E2E Tests → Deploy to Production. Tests should be fast and reliable." },
                  { title: "Running Tests in CI", content: "Use command‑line runners (e.g., `mvn test`, `npx cypress run`, `newman run`). Generate reports (JUnit XML, HTML)." },
                  { title: "Reporting and Dashboards", content: "Use Allure, ExtentReports, or built‑in test reports to visualise results. Integrate with monitoring tools like Grafana." },
                ],
              },
            ],
          },
          {
            title: "Performance Testing – Ensuring Scalability",
            slug: "performance",
            description: "Load, stress, endurance, and scalability testing.",
            topics: [
              {
                title: "Performance Testing Types – Know Your Goals",
                slug: "perf-types",
                shortDescription: "Load, stress, spike, endurance, and scalability testing.",
                estimatedMinutes: 26,
                sections: [
                  { title: "Load Testing", content: "Simulates expected user load to validate system behavior under normal conditions. Measures response times, throughput, and resource usage." },
                  { title: "Stress Testing", content: "Pushes beyond expected limits to find the breaking point and how the system recovers. Identifies bottlenecks and capacity limits." },
                  { title: "Spike Testing", content: "Sudden increases and decreases in load to test system resilience. Simulates flash crowds or traffic spikes." },
                  { title: "Endurance / Soak Testing", content: "Run with expected load for extended periods (hours or days) to detect memory leaks, performance degradation, and resource exhaustion." },
                  { title: "Scalability Testing", content: "Determines if the system can scale with increased resources (vertical or horizontal). Tests whether adding more capacity improves performance." },
                ],
              },
              {
                title: "JMeter – The Go‑To Tool",
                slug: "jmeter",
                shortDescription: "Create and run performance tests with Apache JMeter.",
                estimatedMinutes: 26,
                sections: [
                  { title: "JMeter Architecture", content: "Thread Groups (simulate users), Samplers (HTTP, JDBC, FTP), Listeners (View Results, Aggregate Report), Assertions. Uses a GUI or command line." },
                  { title: "Creating a Test Plan", content: "Add Thread Group → HTTP Request → Listener. Configure number of threads, ramp‑up, loop count. Use CSV data sets for parameterisation." },
                  { title: "Assertions", content: "Response Assertion (check content), Duration Assertion (response time), Size Assertion. Verify expected behaviour." },
                  { title: "Distributed Testing", content: "Use multiple JMeter instances (master‑slave) to generate higher load. Important for large‑scale tests." },
                  { title: "Analysis", content: "Use Listeners like Aggregate Report, Summary Report, and Visualiser. Analyse response times, error rates, and throughput. Look for outliers and degradation." },
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
        description: "Security testing, mobile testing, test strategy, metrics, and leading QA teams.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Security Testing – Finding Vulnerabilities",
            slug: "security",
            description: "OWASP, SAST, DAST, and security testing techniques.",
            topics: [
              {
                title: "Introduction to Security Testing",
                slug: "security-intro",
                shortDescription: "Vulnerabilities, OWASP Top 10, and security testing types.",
                estimatedMinutes: 26,
                sections: [
                  { title: "OWASP Top 10", content: "Injection, Broken Authentication, Sensitive Data Exposure, XXE, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Using Components with Known Vulnerabilities, Insufficient Logging & Monitoring. Understand each and how to test for them." },
                  { title: "SAST vs DAST", content: "SAST (Static Application Security Testing) scans source code – finds vulnerabilities early. DAST (Dynamic Application Security Testing) scans running applications – finds runtime issues. Both are complementary." },
                  { title: "Penetration Testing", content: "Ethical hacking to find vulnerabilities in a controlled manner. Should be done by experienced security professionals." },
                  { title: "Security Testing Tools", content: "OWASP ZAP (free DAST), Burp Suite (comprehensive), Snyk (dependency scanning), Veracode (SAST)." },
                ],
              },
            ],
          },
          // --- CORRECTED MODULE: Mobile Testing ---
          {
            title: "Mobile Testing – Apps on the Move",
            slug: "mobile-testing",
            description: "Test mobile applications on real devices and emulators.",
            topics: [
              {
                title: "Mobile Testing Challenges and Automation",
                slug: "mobile-testing-details",
                shortDescription: "Test mobile applications on real devices and emulators.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Mobile Testing Challenges", content: "Device fragmentation (screen sizes, OS versions), network conditions, battery consumption, and gestures. Testing on real devices is essential." },
                  { title: "Appium – Cross‑Platform Automation", content: "Appium is a popular tool for automating native, hybrid, and mobile web apps. It uses the WebDriver protocol and supports Android and iOS." },
                  { title: "Emulators vs Real Devices", content: "Emulators are fast and cheap for development, but real devices are needed for accurate performance, battery, and network tests." },
                  { title: "Cloud Services", content: "BrowserStack, Sauce Labs, and AWS Device Farm provide cloud‑based device farms for testing on many devices." },
                ],
              },
            ],
          },
          {
            title: "Test Strategy and Management – The Big Picture",
            slug: "test-management",
            description: "Define test strategy, metrics, and lead QA teams.",
            topics: [
              {
                title: "Test Strategy and Planning",
                slug: "test-strategy",
                shortDescription: "Define scope, approach, resources, and risks.",
                estimatedMinutes: 28,
                sections: [
                  { title: "Components of a Test Plan", content: "Scope (what to test), objectives, approach (manual/automated), resources (people, tools), schedule, entry/exit criteria, risks, and mitigation." },
                  { title: "Risk‑Based Testing", content: "Prioritise testing based on risk of failure and impact. Focus on critical functionalities and high‑risk areas." },
                  { title: "Metrics – Measure What Matters", content: "**Defect Density**: defects per module. **Test Coverage**: percentage of requirements or code tested. **Pass/Fail Rates**: stability. **Defect Detection Percentage (DDP)**: defects found by testing vs total defects. **Test Case Efficiency**: number of defects found per test case." },
                  { title: "Reporting", content: "Communicate test results and quality status to stakeholders. Use dashboards, charts, and clear summaries." },
                ],
              },
              {
                title: "Leading QA Teams – Building a Quality Culture",
                slug: "leading-qa",
                shortDescription: "Recruit, mentor, and scale QA teams.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Team Structure", content: "Mix of manual, automation, performance, and security testers. Define clear roles and responsibilities." },
                  { title: "Career Development", content: "Path from manual tester to automation to QA lead. Provide training and growth opportunities." },
                  { title: "Continuous Improvement", content: "Retrospectives, lessons learned, and process improvements. Encourage a culture of learning and sharing." },
                  { title: "Conflict Resolution", content: "Mediate disagreements between testers and developers. Focus on the problem, not the person. Encourage collaboration." },
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
        description: "Common QA interview questions, role‑plays, and case studies.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core QA Concepts",
            slug: "core-qa-interview",
            description: "Questions on testing types, test design, bug reports, and automation.",
            topics: [
              {
                title: "Testing Fundamentals",
                slug: "testing-fundamentals-interview",
                shortDescription: "Explain the testing pyramid, V‑model, and shift‑left.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Testing Pyramid", content: "Unit (base) → Integration (middle) → E2E (top). Explain why it's a pyramid – more unit tests, fewer E2E tests." },
                  { title: "V‑Model", content: "Mapping of development phases to testing levels." },
                  { title: "Shift‑Left", content: "Start testing early in the SDLC." },
                ],
              },
              {
                title: "Manual Testing Questions",
                slug: "manual-interview",
                shortDescription: "Test case design, exploratory testing, and bug reports.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Design Test Cases", content: "Given a scenario (e.g., login page), derive test cases using equivalence partitioning and boundary value." },
                  { title: "Exploratory Testing", content: "Simultaneous learning, test design, and execution. Example: test a feature without script." },
                ],
              },
              {
                title: "Automation Questions",
                slug: "automation-interview",
                shortDescription: "Selenium, frameworks, and CI integration.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Why Automation", content: "ROI, regression, repetitive tasks." },
                  { title: "Page Object Model", content: "Explain and give an example." },
                  { title: "Waits", content: "Implicit vs explicit vs fluent." },
                ],
              },
            ],
          },
          {
            title: "Advanced and Behavioral",
            slug: "advanced-behavioral",
            description: "Performance, security, and leadership questions.",
            topics: [
              {
                title: "Performance Testing Questions",
                slug: "perf-interview",
                shortDescription: "Explain load, stress, and spike testing.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Load vs Stress vs Spike", content: "Define and give examples." },
                  { title: "JMeter", content: "How you would create a test plan." },
                ],
              },
              {
                title: "Security Testing Questions",
                slug: "security-interview",
                shortDescription: "OWASP Top 10, SAST, DAST.",
                estimatedMinutes: 18,
                sections: [
                  { title: "OWASP Top 10", content: "Name a few and how to test for them." },
                  { title: "SQL Injection", content: "Explain and how to prevent." },
                ],
              },
              {
                title: "Leadership and Strategy",
                slug: "leadership-interview",
                shortDescription: "Team management, metrics, and decision‑making.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Test Metrics", content: "Which metrics matter and why." },
                  { title: "Handling Conflicts", content: "Between testers and developers." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(category);
  console.log("✅ QA category seeded (ultra‑detailed)");
}

async function main() {
  await seedQACategory();
}

main()
  .catch((error) => {
    console.error("QA seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });