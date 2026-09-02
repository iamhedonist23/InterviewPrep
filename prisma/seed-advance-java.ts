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

async function seedAdvanceJavaCategory() {
  const advanceJavaCategory: CategorySeed = {
    name: "Advance Java (Java EE)",
    slug: "advance-java",
    description: "Enterprise Java technologies including JDBC, Servlets, JSP, JPA, EJB, JMS, and Web Services.",
    icon: "AJ",
    sortOrder: 14,
    paths: [
      // -------------------- BEGINNER --------------------
      {
        name: "Beginner",
        slug: "beginner",
        description: "Get started with JDBC, Servlets, and JSP for web development.",
        level: StudyLevel.BEGINNER,
        modules: [
          {
            title: "JDBC (Java Database Connectivity)",
            slug: "jdbc",
            description: "Connect Java applications to relational databases.",
            topics: [
              {
                title: "JDBC Introduction – Bridging Java and Databases",
                slug: "jdbc-intro",
                shortDescription: "What is JDBC and why is it used?",
                estimatedMinutes: 25,
                sections: [
                  { title: "What is JDBC?", content: "JDBC (Java Database Connectivity) is a standard Java API that allows your Java applications to interact with relational databases. Think of it as a universal translator: you write Java code, JDBC turns it into SQL commands that the database understands, and then it brings the results back to Java. Without JDBC, every database vendor would require you to use their proprietary API – JDBC gives you a consistent interface regardless of whether you're using MySQL, Oracle, PostgreSQL, or any other relational database." },
                  { title: "Why JDBC Matters", content: "In the real world, almost every enterprise application needs to store and retrieve data from a database. JDBC is the bedrock for this interaction in the Java ecosystem. It provides a set of classes and interfaces that handle: connecting to the database, sending SQL queries, processing result sets, and managing transactions. By learning JDBC, you're learning the foundational pattern that frameworks like Hibernate, Spring Data JPA, and MyBatis build upon." },
                  { title: "JDBC Architecture – Two Layers", content: "JDBC is divided into two main layers:\n\n**1. The JDBC API** – This is the set of interfaces and classes you use in your code (e.g., `java.sql.Connection`, `java.sql.Statement`, `java.sql.ResultSet`). It's the 'face' of JDBC.\n\n**2. The JDBC Driver API** – This is the lower‑layer that communicates with the actual database. A driver is a vendor‑specific implementation that translates JDBC calls into the database's native protocol. The `DriverManager` class acts as a registry for these drivers.\n\nThis two‑layer design means you can switch databases simply by swapping the driver JAR and changing the connection URL – your Java code stays unchanged." },
                  { title: "The Four JDBC Driver Types", content: "JDBC drivers are classified into four types based on how they translate JDBC calls:\n\n- **Type 1: JDBC‑ODBC Bridge** – Uses ODBC (a C‑based API) as an intermediate layer. Deprecated since Java 8 because it's slow and requires native ODBC libraries.\n- **Type 2: Native‑API Driver** – Uses native C libraries provided by the database vendor. It's fast but platform‑specific (not pure Java).\n- **Type 3: Network Protocol Driver** – Pure Java driver that communicates with a middleware server (which then talks to the database). This is good for firewalled environments.\n- **Type 4: Thin Driver (Pure Java)** – The driver directly translates JDBC calls into the database's own network protocol. It's entirely in Java, has no native dependencies, and is recommended for all modern applications. Examples: `mysql‑connector‑java` for MySQL, `ojdbc` for Oracle." },
                  { title: "Setting Up JDBC – Dependencies", content: "To use JDBC, you must include the vendor‑specific JAR in your classpath. For a Maven project, add the dependency in your `pom.xml`:\n```xml\n<dependency>\n    <groupId>mysql</groupId>\n    <artifactId>mysql-connector-java</artifactId>\n    <version>8.0.33</version>\n</dependency>\n```\nWithout this, you'll get a `ClassNotFoundException` when trying to load the driver. For other databases, use the corresponding dependency (e.g., `org.postgresql:postgresql` for PostgreSQL)." },
                ],
              },
              {
                title: "Connecting to a Database – The First Step",
                slug: "jdbc-connection",
                shortDescription: "Establish a connection using DriverManager and DataSource.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Loading the Driver – Then and Now", content: "In older JDBC versions (Java 1.3 and earlier), you had to explicitly load the driver by calling `Class.forName(\"com.mysql.cj.jdbc.Driver\")`. This would force the driver's static initialiser to run and register itself with the `DriverManager`. Since JDBC 4.0 (Java 6), drivers are auto‑registered via the service provider mechanism – the JAR contains a file `META‑INF/services/java.sql.Driver` that tells the `DriverManager` which class to load. So in modern code, you can skip `Class.forName()` entirely." },
                  { title: "Getting a Connection with DriverManager", content: "The most straightforward way to get a connection is:\n```java\nString url = \"jdbc:mysql://localhost:3306/mydb?useSSL=false\";\nString user = \"root\";\nString password = \"secret\";\nConnection conn = DriverManager.getConnection(url, user, password);\n```\nThe URL format varies by database: `jdbc:mysql://host:port/database` for MySQL, `jdbc:postgresql://host:port/database` for PostgreSQL, `jdbc:oracle:thin:@host:port:sid` for Oracle. Additional parameters like `useSSL` can be appended. This method is simple but creates a new connection each time – which is expensive." },
                  { title: "DataSource and Connection Pooling – Production Must", content: "In any serious application, you should never use `DriverManager` directly. Instead, use a `DataSource` that provides connection pooling. A connection pool is a set of pre‑created connections that are reused, avoiding the overhead of establishing a new physical connection on every request. Popular connection pool implementations include HikariCP (fastest), Apache DBCP, and Tomcat JDBC. Example configuration with HikariCP:\n```java\nHikariConfig config = new HikariConfig();\nconfig.setJdbcUrl(url);\nconfig.setUsername(user);\nconfig.setPassword(password);\nconfig.setMaximumPoolSize(10);\nDataSource ds = new HikariDataSource(config);\ntry (Connection conn = ds.getConnection()) {\n    // use connection\n}\n```\nThe pool will handle connection creation, validation, and cleanup automatically." },
                  { title: "Handling Exceptions and Closing Resources", content: "`SQLException` is the main exception thrown by JDBC methods. It can contain chained exceptions, error codes, and SQL state. Always close `Connection`, `Statement`, and `ResultSet` – otherwise you'll leak database resources (connections, cursors). The best way is to use the try‑with‑resources statement introduced in Java 7:\n```java\ntry (Connection conn = ds.getConnection();\n     PreparedStatement stmt = conn.prepareStatement(\"SELECT * FROM users\");\n     ResultSet rs = stmt.executeQuery()) {\n    while (rs.next()) {\n        System.out.println(rs.getString(\"name\"));\n    }\n} catch (SQLException e) {\n    // Log and handle\n}\n```\nThis ensures all resources are automatically closed, even if an exception occurs." },
                ],
              },
              {
                title: "Statement and PreparedStatement – Safe vs Risky",
                slug: "jdbc-statements",
                shortDescription: "Execute SQL queries and updates with proper protection.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Statement – The Simplest but Dangerous", content: "A `Statement` is used to execute static SQL queries. Example:\n```java\nStatement stmt = conn.createStatement();\nResultSet rs = stmt.executeQuery(\"SELECT * FROM products\");\n```\nThe problem: if you concatenate user input, you open the door to SQL injection attacks. For instance, if someone enters `' OR '1'='1` as a user ID, your query becomes `SELECT * FROM users WHERE id = '' OR '1'='1'` – which returns all users. Never use `Statement` for queries with dynamic input." },
                  { title: "PreparedStatement – The Safe and Efficient Alternative", content: "`PreparedStatement` pre‑compiles the SQL and uses placeholders (`?`) for values. This has two major benefits:\n1. **Security**: The driver escapes the input values, making SQL injection impossible.\n2. **Performance**: The database can reuse the execution plan if the same query is run repeatedly.\nExample:\n```java\nString sql = \"INSERT INTO users (name, email) VALUES (?, ?)\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setString(1, \"Alice\");\nps.setString(2, \"alice@example.com\");\nps.executeUpdate();\n```\nAlways use `PreparedStatement` for any query that takes user input." },
                  { title: "Execute Methods – Know What You're Doing", content: "JDBC provides three execute methods:\n- **`executeQuery()`**: Used for `SELECT` statements. Returns a `ResultSet`.\n- **`executeUpdate()`**: Used for `INSERT`, `UPDATE`, `DELETE`, and DDL statements. Returns the number of rows affected (or 0 for DDL).\n- **`execute()`**: A general‑purpose method that returns `true` if there is a result set, `false` otherwise. You must then call `getResultSet()` or `getUpdateCount()`. This is rarely used – stick to the first two." },
                  { title: "Processing ResultSet – Reading Data", content: "The `ResultSet` is a cursor that points to the current row. Initially it's positioned before the first row. Use `next()` to move forward (returns `true` if there's a next row). Retrieve column values with getters like `getString()`, `getInt()`, `getLong()`, `getDate()`, etc. You can access columns by name (e.g., `rs.getString(\"name\")`) or by index (1‑based). Name is more readable and tolerant to column order changes." },
                ],
              },
              {
                title: "Transactions and Batch Updates – Grouping Operations",
                slug: "jdbc-transactions",
                shortDescription: "Manage transactions and batch processing.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Auto‑commit – The Default Behaviour", content: "By default, each SQL statement is automatically committed as soon as it's executed. This is fine for simple queries, but when you need to ensure a group of operations succeed or fail together (e.g., transferring money between accounts), you must disable auto‑commit and manage the transaction manually." },
                  { title: "Controlling Transactions", content: "Turn off auto‑commit with `conn.setAutoCommit(false)`. Then execute your statements. If everything succeeds, call `conn.commit()`. If an error occurs, call `conn.rollback()`. Example:\n```java\nConnection conn = ds.getConnection();\nconn.setAutoCommit(false);\ntry {\n    // debit account A\n    // credit account B\n    conn.commit();\n} catch (SQLException e) {\n    conn.rollback();\n    throw e;\n} finally {\n    conn.setAutoCommit(true); // reset for next use\n}\n```" },
                  { title: "Savepoints – Partial Rollback", content: "Savepoints allow you to roll back only a portion of a transaction. Use `Savepoint save = conn.setSavepoint();` and later `conn.rollback(save);`. This is useful for complex transactions where a sub‑operation fails but you don't want to discard all previous work." },
                  { title: "Batch Updates – Speeding Up Multiple Operations", content: "When you need to run many similar statements (e.g., inserting 1000 rows), use batch processing to reduce network round trips. Add each statement to a batch with `addBatch()`, then execute with `executeBatch()` – it sends all statements in one go.\n```java\nPreparedStatement ps = conn.prepareStatement(\"INSERT INTO logs (msg) VALUES (?)\");\nfor (String msg : messages) {\n    ps.setString(1, msg);\n    ps.addBatch();\n}\nint[] results = ps.executeBatch(); // returns row counts per statement\n```\nBatch processing can dramatically improve performance – often by a factor of 10x or more." },
                ],
              },
            ],
          },
          {
            title: "Servlets – The Backbone of Java Web Apps",
            slug: "servlets",
            description: "Build web applications using Java Servlets.",
            topics: [
              {
                title: "Servlet Basics – The Heart of Java Web",
                slug: "servlet-basics",
                shortDescription: "Understand the servlet lifecycle and HTTP handling.",
                estimatedMinutes: 25,
                sections: [
                  { title: "What is a Servlet?", content: "A servlet is a Java class that runs in a web server (like Apache Tomcat, Jetty, or WildFly) and handles HTTP requests. It's the fundamental building block of Java web applications. Servlets correspond to the 'Controller' in the Model‑View‑Controller (MVC) pattern – they receive requests from the browser, process them (calling business logic), and produce a response (often by forwarding to a JSP)." },
                  { title: "Servlet Container – The Engine", content: "The servlet container (e.g., Tomcat) is responsible for:\n- Managing the lifecycle of servlets (loading, instantiating, invoking, destroying).\n- Handling HTTP protocol details (parsing requests, formatting responses).\n- Providing services like session management, security, and concurrency.\nEach servlet is a singleton – a single instance handles all requests, so you must be careful with instance variables (use them only for thread‑safe resources)." },
                  { title: "Servlet Lifecycle – init, service, destroy", content: "1. **init()**: Called once when the servlet is first loaded. Use it to initialise resources (e.g., database connections, configuration).\n2. **service()**: Called for every request. It determines the HTTP method and calls `doGet()`, `doPost()`, etc.\n3. **destroy()**: Called when the servlet is unloaded (e.g., server shutdown). Clean up resources here.\nYou typically override `doGet` or `doPost` rather than `service`." },
                  { title: "HttpServlet and Annotations – Modern Mapping", content: "Extend `HttpServlet` and override the relevant methods. Use the `@WebServlet` annotation to map the servlet to a URL path.\n```java\n@WebServlet(\"/login\")\npublic class LoginServlet extends HttpServlet {\n    @Override\n    protected void doPost(HttpServletRequest req, HttpServletResponse resp) \n            throws ServletException, IOException {\n        String username = req.getParameter(\"username\");\n        String password = req.getParameter(\"password\");\n        if (authenticate(username, password)) {\n            resp.sendRedirect(\"/dashboard\");\n        } else {\n            req.setAttribute(\"error\", \"Invalid credentials\");\n            req.getRequestDispatcher(\"/login.jsp\").forward(req, resp);\n        }\n    }\n}\n```" },
                  { title: "Request and Response – The Communication Channels", content: "`HttpServletRequest` gives you access to:\n- Parameters (`getParameter()`)\n- Headers (`getHeader()`)\n- Session (`getSession()`)\n- Attributes (`getAttribute()` / `setAttribute()`)\n\n`HttpServletResponse` lets you:\n- Set status codes (`setStatus()`)\n- Add headers (`setHeader()`)\n- Write the response body (`getWriter()` for text, `getOutputStream()` for binary)\n- Redirect (`sendRedirect()`)" },
                  { title: "Deployment Descriptor (web.xml) – Legacy but Still Seen", content: "Before annotations, servlets were configured in `web.xml`. This is still used in many older or legacy projects. A typical mapping:\n```xml\n<servlet>\n    <servlet-name>LoginServlet</servlet-name>\n    <servlet-class>com.example.LoginServlet</servlet-class>\n</servlet>\n<servlet-mapping>\n    <servlet-name>LoginServlet</servlet-name>\n    <url-pattern>/login</url-pattern>\n</servlet-mapping>\n```\nModern projects prefer annotations for brevity, but knowing `web.xml` is useful for maintenance." },
                ],
              },
              {
                title: "Servlet Session Management – Keeping User State",
                slug: "servlet-session",
                shortDescription: "Maintain user state with sessions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "HttpSession – The User's Memory", content: "HTTP is stateless – each request is independent. To remember a user across multiple requests (e.g., after login), servlets provide `HttpSession`. Get the session with `request.getSession()` – this creates a new session if none exists. You can store attributes with `session.setAttribute(\"key\", value)` and retrieve them with `session.getAttribute(\"key\")`. The session is backed by a unique ID (`JSESSIONID`) that is sent to the client (usually as a cookie) and sent back with each request." },
                  { title: "Session Tracking Mechanisms – Cookies vs URL Rewriting", content: "The container uses **cookies** by default to track sessions. If cookies are disabled, it falls back to **URL rewriting**, where the session ID is appended to each URL (e.g., `http://site/page;jsessionid=123`). To support URL rewriting, use `response.encodeURL(url)` in your JSPs/servlets – this adds the session ID when cookies are absent." },
                  { title: "Session Timeout – Setting Expiry", content: "Sessions are finite. You can set a timeout in `web.xml`:\n```xml\n<session-config>\n    <session-timeout>30</session-timeout> <!-- minutes -->\n</session-config>\n```\nOr programmatically: `session.setMaxInactiveInterval(30 * 60)` (seconds). When a session expires, its attributes are removed." },
                  { title: "Invalidating Sessions – Logout", content: "To explicitly end a session (e.g., when a user logs out), call `session.invalidate()`. This clears all attributes and removes the session. After invalidation, any subsequent `getSession()` will create a new session." },
                ],
              },
              {
                title: "Servlet Filters and Listeners – Intercepting Requests",
                slug: "servlet-filters",
                shortDescription: "Intercept requests and responses for cross-cutting concerns.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Filters – The Gatekeepers", content: "Filters are components that intercept requests before they reach the servlet (and responses after). They are used for cross‑cutting concerns: logging, authentication, compression, character encoding, and security. Implement the `Filter` interface and its `doFilter()` method." },
                  { title: "Filter Chain – Passing the Baton", content: "In `doFilter()`, you receive a `FilterChain`. Call `chain.doFilter(request, response)` to pass the request to the next filter or to the servlet. If you don't call it, the request stops – useful for blocking unauthorised access." },
                  { title: "Example Filter – Logging", content: "```java\n@WebFilter(\"/*\")\npublic class LoggingFilter implements Filter {\n    @Override\n    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) \n            throws IOException, ServletException {\n        long start = System.currentTimeMillis();\n        chain.doFilter(req, resp);\n        long duration = System.currentTimeMillis() - start;\n        System.out.println(\"Request took \" + duration + \" ms\");\n    }\n}\n```" },
                  { title: "Listeners – Reacting to Lifecycle Events", content: "Listeners handle lifecycle events:\n- `ServletContextListener` – application start/stop (e.g., initialise connection pools).\n- `HttpSessionListener` – session creation/destruction (e.g., track active sessions).\n- `ServletRequestListener` – request start/end.\nThey are useful for setting up global resources and for monitoring." },
                ],
              },
            ],
          },
          {
            title: "JSP (JavaServer Pages) – Dynamic Views",
            slug: "jsp",
            description: "Create dynamic web content with JSP.",
            topics: [
              {
                title: "JSP Fundamentals – Java in HTML",
                slug: "jsp-basics",
                shortDescription: "Scriptlets, expressions, directives, and implicit objects.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is JSP?", content: "JSP (JavaServer Pages) is a technology that lets you embed Java code inside HTML pages. When a JSP is accessed, the web container compiles it into a servlet (on the first request). JSPs are typically used as the View in MVC, where the controller (servlet) forwards to a JSP to render the UI." },
                  { title: "Scriptlets – Embedding Java (Discouraged)", content: "Scriptlets (`<% ... %>`) allow you to write arbitrary Java code directly in the JSP. However, this mixes business logic with presentation, making pages hard to maintain, test, and understand. Modern practice strongly discourages scriptlets; use JSTL and EL instead." },
                  { title: "Expressions – Outputting Values", content: "`<%= expression %>` outputs the result of the expression (converted to a String). For example, `<%= user.getName() %>` prints the user's name. This is safer than scriptlets but still limited." },
                  { title: "Directives – Instructions for the JSP Engine", content: "Directives are processed at translation time. Common directives:\n- `<%@ page ... %>`: Sets page attributes (imports, content type, error page).\n- `<%@ include ... %>`: Static inclusion of another file.\n- `<%@ taglib ... %>`: Declares a custom tag library (like JSTL)." },
                  { title: "Implicit Objects – Ready‑to‑Use Variables", content: "JSP gives you several implicit objects without any declaration:\n- `request` – `HttpServletRequest`\n- `response` – `HttpServletResponse`\n- `session` – `HttpSession`\n- `application` – `ServletContext`\n- `out` – `JspWriter` (for output)\n- `pageContext` – Provides access to all scopes\n- `page`, `config`, `exception`\nThese are available anywhere in the JSP." },
                ],
              },
              {
                title: "Expression Language (EL) and JSTL – Clean Views",
                slug: "jsp-el-jstl",
                shortDescription: "Simplify JSP pages with EL and standard tags.",
                estimatedMinutes: 20,
                sections: [
                  { title: "EL (Expression Language) – Easy Access", content: "EL uses `${expression}` to access data from beans, maps, lists, and implicit objects. For example, `${user.name}` will call `user.getName()`. It's concise, safe (null values are ignored), and works with scopes (page, request, session, application). EL also supports arithmetic, logical comparisons, and function calls." },
                  { title: "JSTL Core Tags – Logic Without Scriptlets", content: "JSTL provides a set of tags for common tasks:\n- `<c:forEach>` – loops over collections.\n- `<c:if>` – conditional.\n- `<c:choose>`, `<c:when>`, `<c:otherwise>` – switch‑like logic.\n- `<c:set>` – sets a variable.\n- `<c:out>` – output with XML escaping (prevents XSS).\nExample:\n```jsp\n<c:forEach items=\"${users}\" var=\"user\">\n    <c:out value=\"${user.name}\"/><br/>\n</c:forEach>\n```" },
                  { title: "JSTL Formatting Tags", content: "`<fmt:formatDate>` and `<fmt:formatNumber>` handle locale‑specific formatting of dates and numbers. They are essential for internationalised applications." },
                  { title: "Why EL/JSTL Over Scriptlets?", content: "They separate presentation from logic, making JSPs readable, maintainable, and secure. They also encourage the MVC pattern, where the controller (servlet) handles business logic and the view (JSP) only displays data." },
                ],
              },
              {
                title: "MVC with Servlets and JSP",
                slug: "mvc-servlets-jsp",
                shortDescription: "Build MVC applications using Servlets as controllers and JSP as views.",
                estimatedMinutes: 20,
                sections: [
                  { title: "The MVC Pattern – Model, View, Controller", content: "MVC is a design pattern that separates concerns:\n- **Model**: The data and business logic (POJOs, DAOs).\n- **View**: The presentation (JSP).\n- **Controller**: The servlet that handles requests, updates the model, and selects the view." },
                  { title: "Controller Flow – Example", content: "1. The browser sends a request to `/login`.\n2. `LoginServlet` (controller) is invoked.\n3. It extracts parameters, calls business logic (e.g., authenticate).\n4. If success, it stores user data in the session and sends a redirect to `/dashboard`.\n5. If failure, it sets an error attribute and forwards to `login.jsp`.\nForwarding keeps the request data alive; redirect loses it but changes the URL." },
                  { title: "Forward vs Redirect – When to Use", content: "**Forward (`forward()`)** – server‑side, the URL stays the same, and request attributes are preserved. Use for internal navigation, like displaying a result after validation.\n\n**Redirect (`sendRedirect()`)** – client‑side, the browser sends a new request, the URL changes, and request attributes are lost. Use after a POST to prevent duplicate form submissions (Post‑Redirect‑Get pattern)." },
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
        description: "Dive into JPA, EJB, and JMS for enterprise applications.",
        level: StudyLevel.INTERMEDIATE,
        modules: [
          {
            title: "JPA (Java Persistence API)",
            slug: "jpa",
            description: "Object-Relational Mapping with JPA and Hibernate.",
            topics: [
              {
                title: "JPA Overview – ORM Done Right",
                slug: "jpa-overview",
                shortDescription: "What is JPA and its benefits.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is JPA?", content: "The Java Persistence API is a specification for Object‑Relational Mapping (ORM). It allows you to map Java objects to database tables and write database‑agnostic queries. Instead of writing SQL strings, you work with Java objects and annotations, and JPA translates everything to SQL at runtime. The most popular implementation is Hibernate." },
                  { title: "Entities – The Heart of ORM", content: "An entity is a plain Java class annotated with `@Entity`. Its fields map to columns. Each instance corresponds to a row. JPA uses a persistence context (managed by the `EntityManager`) to track changes and synchronise with the database. This provides a first‑level cache and lazy loading." },
                  { title: "Why ORM – The Benefits", content: "ORM eliminates repetitive JDBC boilerplate, reduces SQL errors, and makes your code more portable across databases. It also provides features like caching, lazy loading, and optimistic locking out‑of‑the‑box." },
                  { title: "Configuration – persistence.xml", content: "JPA configuration is defined in `META‑INF/persistence.xml`. It specifies the persistence unit name, the datasource JNDI name, provider (e.g., `org.hibernate.jpa.HibernatePersistenceProvider`), and properties (e.g., `hibernate.show_sql`). In Spring Boot, many of these are replaced by `application.properties`." },
                ],
              },
              {
                title: "Mapping Entities – Annotating for Success",
                slug: "jpa-mapping",
                shortDescription: "Define mappings between Java objects and database tables.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Basic Annotations – The Essentials", content: "`@Id` marks the primary key. `@GeneratedValue` defines the generation strategy: `IDENTITY` (auto‑increment), `SEQUENCE` (database sequence), `TABLE` (separate table), or `AUTO` (JPA chooses). `@Column` lets you override column name, length, nullable, etc. `@Enumerated` maps enums to ordinal (number) or string." },
                  { title: "Relationships – One‑to‑One, One‑to‑Many, Many‑to‑One, Many‑to‑Many", content: "**`@OneToMany`**: A parent has many children. Use `mappedBy` on the parent side to avoid creating a join table.\n**`@ManyToOne`**: The child points to the parent via a foreign key (`@JoinColumn`).\n**`@OneToOne`**: One‑to‑one relationship.\n**`@ManyToMany`**: Requires a join table (`@JoinTable`).\nAlways define relationships on both sides for consistency." },
                  { title: "Cascading – Propagating Operations", content: "`CascadeType` determines which operations cascade from parent to child: `PERSIST`, `MERGE`, `REMOVE`, `REFRESH`, `DETACH`, and `ALL`. For example, `@OneToMany(cascade = CascadeType.PERSIST)` will automatically save child entities when the parent is saved." },
                  { title: "Fetch Types – LAZY vs EAGER", content: "`FetchType.LAZY` loads the data only when accessed (good for performance). `FetchType.EAGER` loads immediately (use only when you're sure you'll need it). Over‑using EAGER can cause performance problems and cartesian products. The default is LAZY for collections, EAGER for single entities." },
                  { title: "Inheritance Strategies", content: "JPA supports three strategies:\n- **SINGLE_TABLE**: All classes in one table with a discriminator column – good performance, but columns are nullable.\n- **JOINED**: Each class has its own table, linked by foreign key – normalized, but more joins.\n- **TABLE_PER_CLASS**: Each concrete class has its own table – not recommended." },
                ],
              },
              {
                title: "JPQL and Criteria API – Queries Beyond SQL",
                slug: "jpa-queries",
                shortDescription: "Write queries using JPQL and Criteria API.",
                estimatedMinutes: 22,
                sections: [
                  { title: "JPQL – Object‑Oriented Query Language", content: "JPQL is like SQL but it operates on entities and their fields, not tables and columns. Example:\n```java\nQuery q = em.createQuery(\"SELECT e FROM Employee e WHERE e.salary > :min\");\nq.setParameter(\"min\", 50000);\nList<Employee> employees = q.getResultList();\n```\nThis is database‑independent and uses the entity model." },
                  { title: "Typed Queries – No Casting Required", content: "Use `TypedQuery` to avoid manual casting:\n```java\nTypedQuery<Employee> q = em.createQuery(\"SELECT e FROM Employee e\", Employee.class);\nList<Employee> employees = q.getResultList();\n```" },
                  { title: "Native Queries – When You Need SQL", content: "Sometimes you need database‑specific features. Use `@NamedNativeQuery` or `em.createNativeQuery(\"SELECT * FROM employees\")`. You can map the result to entity classes or use a result set mapping." },
                  { title: "Criteria API – Dynamic Queries Made Type‑Safe", content: "The Criteria API lets you build queries programmatically using a fluent API. This is useful when the query structure depends on runtime conditions (e.g., search filters).\n```java\nCriteriaBuilder cb = em.getCriteriaBuilder();\nCriteriaQuery<Employee> cq = cb.createQuery(Employee.class);\nRoot<Employee> root = cq.from(Employee.class);\nPredicate p = cb.gt(root.get(\"salary\"), 50000);\ncq.where(p);\nList<Employee> employees = em.createQuery(cq).getResultList();\n```" },
                ],
              },
              {
                title: "Entity Manager and Transactions",
                slug: "jpa-transactions",
                shortDescription: "Manage persistence context and transactions.",
                estimatedMinutes: 20,
                sections: [
                  { title: "EntityManager Operations", content: "`persist()` – makes an entity managed and will be inserted on flush/commit. `find()` – retrieves by primary key (uses cache if available). `merge()` – updates a detached entity (returns a managed version). `remove()` – deletes a managed entity. `refresh()` – reloads state from database." },
                  { title: "Transaction Management – Manual vs Container", content: "In Java SE, use `EntityTransaction`:\n```java\nem.getTransaction().begin();\nem.persist(entity);\nem.getTransaction().commit();\n```\nIn Java EE (or Spring), you can use declarative transactions with `@Transactional` (Spring) or `@TransactionAttribute` (EJB). This is cleaner and less error‑prone." },
                  { title: "Detached Entities – When They Become 'Orphaned'", content: "When the persistence context is closed (e.g., after a request ends), managed entities become detached. To reattach and apply changes, use `merge()`. This returns a managed copy; you should use the returned object, not the original." },
                ],
              },
            ],
          },
          {
            title: "EJB (Enterprise JavaBeans)",
            slug: "ejb",
            description: "Session beans, message-driven beans, and business logic.",
            topics: [
              {
                title: "Session Beans – The Business Logic Component",
                slug: "ejb-session",
                shortDescription: "Stateless and Stateful session beans.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is EJB?", content: "Enterprise JavaBeans (EJB) is a server‑side component model for building scalable, transactional, and secure business logic. EJBs run in an EJB container (part of the Java EE server) that provides services like pooling, transactions, and security automatically – you focus on business logic." },
                  { title: "Stateless Session Bean (SLSB) – Fast and Scalable", content: "`@Stateless` beans don't hold state for a specific client. Each method call can be handled by any available instance from a pool. They are ideal for stateless operations (e.g., calculations, validations, search). They are thread‑safe (the container ensures only one thread uses an instance at a time) and highly scalable." },
                  { title: "Stateful Session Bean (SFSB) – Remembering Clients", content: "`@Stateful` beans maintain conversational state across multiple method calls for a specific client. They are used for shopping carts, multi‑step wizards, or workflows. Each client gets its own instance, so they don't scale as well as stateless. They must be explicitly removed when no longer needed (to free resources)." },
                  { title: "Singleton Session Bean – Shared Across Application", content: "`@Singleton` beans have one instance per application. They are used for caches, counters, and shared configuration. They can be configured with `@ConcurrencyManagement` to control thread safety (e.g., `@Lock(READ)` for reads, `@Lock(WRITE)` for writes)." },
                ],
              },
              {
                title: "Message-Driven Beans (MDB) – Asynchronous Event Consumers",
                slug: "ejb-mdb",
                shortDescription: "Asynchronous messaging with JMS and MDB.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is an MDB?", content: "A Message‑Driven Bean is an EJB that listens to JMS destinations (queues or topics) and processes messages asynchronously. Unlike session beans, they have no client interface – they are triggered by incoming messages. This decouples the producer and consumer, making the system more reliable and scalable." },
                  { title: "JMS Messaging Models – Queue vs Topic", content: "**Point‑to‑Point (Queue)**: Each message is delivered to exactly one consumer. Used for reliable, one‑to‑one communication.\n**Publish‑Subscribe (Topic)**: Each message is delivered to all subscribers. Used for broadcast scenarios (e.g., event notifications)." },
                  { title: "MDB Lifecycle and Implementation", content: "Implement `MessageListener` (or `javax.jms.MessageListener`) and annotate with `@MessageDriven`. Override `onMessage()` to process the message. Example:\n```java\n@MessageDriven(activationConfig = {\n    @ActivationConfigProperty(propertyName = \"destination\", propertyValue = \"queue/OrderQueue\"),\n    @ActivationConfigProperty(propertyName = \"destinationType\", propertyValue = \"javax.jms.Queue\")\n})\npublic class OrderProcessor implements MessageListener {\n    @Override\n    public void onMessage(Message msg) {\n        TextMessage tm = (TextMessage) msg;\n        // process order\n    }\n}\n```" },
                ],
              },
              {
                title: "EJB Transactions and Security",
                slug: "ejb-transactions-security",
                shortDescription: "Container-managed transactions and declarative security.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Container‑Managed Transactions (CMT) – The Easy Way", content: "CMT is the default and preferred way. The container automatically manages transaction boundaries based on the `@TransactionAttribute` annotation:\n- `REQUIRED`: join existing or start new (default).\n- `REQUIRES_NEW`: suspend existing and start new.\n- `SUPPORTS`: join if exists, else no transaction.\n- `NOT_SUPPORTED`, `MANDATORY`, `NEVER`.\nYou don't write commit/rollback code – the container handles it." },
                  { title: "Bean‑Managed Transactions (BMT) – Full Control", content: "Use BMT when you need fine‑grained control, e.g., to manage multiple resources. You must acquire a `UserTransaction` and explicitly begin, commit, and rollback. This is more code and more error‑prone." },
                  { title: "Declarative Security – Role‑Based Access", content: "Use `@RolesAllowed` to specify which roles can invoke a method. Roles are defined in the application server (e.g., Tomcat's `tomcat‑users.xml`). Example: `@RolesAllowed({\"ADMIN\", \"MANAGER\"})`. You can also use `@PermitAll` and `@DenyAll`." },
                ],
              },
            ],
          },
          {
            title: "JMS (Java Message Service)",
            slug: "jms",
            description: "Messaging for loose coupling and async communication.",
            topics: [
              {
                title: "JMS Fundamentals – Messaging Primer",
                slug: "jms-basics",
                shortDescription: "Understand messaging models and JMS API.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is JMS?", content: "The Java Message Service is an API for sending and receiving messages between applications in a loosely coupled, asynchronous way. Instead of calling a service directly (synchronous), you send a message to a destination (queue or topic), and the receiver processes it at its own pace. This makes the system more resilient and scalable." },
                  { title: "Message Models", content: "**Point‑to‑Point (Queues)**: Each message is consumed by exactly one receiver. Good for workloads that need to be processed once (e.g., order processing).\n**Publish‑Subscribe (Topics)**: Each message is sent to all subscribers. Good for event broadcasting (e.g., price updates, notifications)." },
                  { title: "JMS API Components", content: "`ConnectionFactory` – creates connections (managed via JNDI). `Connection` – represents a virtual channel to the JMS provider. `Session` – a single‑threaded context for producing/consuming messages. `Destination` – queue or topic. `MessageProducer` – sends messages. `MessageConsumer` – receives messages." },
                  { title: "Message Types – Choosing the Right One", content: "`TextMessage` – plain text (JSON, XML). `MapMessage` – key‑value pairs. `BytesMessage` – raw bytes. `ObjectMessage` – serializable Java object. `StreamMessage` – stream of primitives. Use `TextMessage` for JSON or XML to keep it interoperable." },
                ],
              },
              {
                title: "Sending and Receiving Messages – Code in Action",
                slug: "jms-send-receive",
                shortDescription: "Produce and consume messages programmatically.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Sending a Message – The Producer", content: "```java\nConnection conn = cf.createConnection();\nSession session = conn.createSession(false, Session.AUTO_ACKNOWLEDGE);\nDestination dest = session.createQueue(\"queue/MyQueue\");\nMessageProducer producer = session.createProducer(dest);\nTextMessage msg = session.createTextMessage(\"Hello JMS\");\nproducer.send(msg);\n```\nAlways close resources in a `finally` block or use try‑with‑resources." },
                  { title: "Synchronous Receiving – Blocking", content: "`MessageConsumer consumer = session.createConsumer(dest);`\n`Message msg = consumer.receive();` // blocks until a message arrives, or use `receive(timeout)`." },
                  { title: "Asynchronous Receiving – Event‑Driven", content: "Implement `MessageListener` and its `onMessage()` method. Then set it on the consumer: `consumer.setMessageListener(this);`. The container will call `onMessage()` whenever a message arrives. This is the most common approach for enterprise applications." },
                  { title: "Acknowledgement – Controlling Message Delivery", content: "**AUTO_ACKNOWLEDGE**: The message is automatically acknowledged when received (default). **CLIENT_ACKNOWLEDGE**: You must call `msg.acknowledge()` explicitly; gives more control (e.g., after processing). **DUPS_OK_ACKNOWLEDGE**: Lazy acknowledgement; may result in duplicate deliveries." },
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
        description: "Web Services (SOAP/REST), Security, and Enterprise Integration.",
        level: StudyLevel.ADVANCED,
        modules: [
          {
            title: "Web Services",
            slug: "web-services",
            description: "SOAP-based and RESTful web services in Java EE.",
            topics: [
              {
                title: "JAX-WS (SOAP) – XML‑Based Enterprise Services",
                slug: "jax-ws",
                shortDescription: "Build SOAP web services with JAX-WS.",
                estimatedMinutes: 22,
                sections: [
                  { title: "What is JAX-WS?", content: "JAX‑WS (Java API for XML Web Services) is the standard for building SOAP‑based web services. It uses annotations to simplify the development of web service endpoints and clients. SOAP is XML‑based, highly extensible, and supports advanced features like WS‑Security, WS‑ReliableMessaging, and ACID transactions." },
                  { title: "Service Endpoint – Annotations and Implementation", content: "A JAX‑WS service is a Java class annotated with `@WebService`. Methods that are exposed as operations are annotated with `@WebMethod`. Example:\n```java\n@WebService\npublic class CalculatorService {\n    @WebMethod\n    public int add(int a, int b) {\n        return a + b;\n    }\n}\n```\nThe container publishes the service, and WSDL is automatically generated." },
                  { title: "WSDL – The Contract", content: "When you deploy a JAX‑WS service, its WSDL (Web Services Description Language) file is available at `http://service?wsdl`. The WSDL describes the operations, input/output types, and network location. Clients use this to generate stubs." },
                  { title: "Client Generation – `wsimport`", content: "To create a client, use the `wsimport` tool (included in the JDK) to generate Java classes from the WSDL. Then you can call the service like a local object. Example:\n```java\nCalculatorService service = new CalculatorService();\nCalculatorPort port = service.getCalculatorPort();\nint result = port.add(5, 3);\n```" },
                ],
              },
              {
                title: "JAX-RS (REST) – Lightweight and Agile",
                slug: "jax-rs",
                shortDescription: "Build RESTful APIs with JAX-RS (Jersey, RESTEasy).",
                estimatedMinutes: 24,
                sections: [
                  { title: "What is JAX-RS?", content: "JAX‑RS (Java API for RESTful Web Services) is a specification for building RESTful services using annotations. It is lightweight, uses standard HTTP verbs, and supports JSON/XML serialization automatically. Popular implementations include Jersey (reference), RESTEasy, and Apache CXF." },
                  { title: "Resource Classes – The Core", content: "A resource class is a POJO annotated with `@Path(\"/resource\")`. Methods are annotated with `@GET`, `@POST`, `@PUT`, `@DELETE`. Path parameters (`@PathParam`), query parameters (`@QueryParam`), and form parameters (`@FormParam`) bind request data.\n```java\n@Path(\"/users\")\npublic class UserResource {\n    @GET\n    @Path(\"/{id}\")\n    @Produces(MediaType.APPLICATION_JSON)\n    public User getUser(@PathParam(\"id\") int id) {\n        return userService.find(id);\n    }\n}\n```" },
                  { title: "Content Negotiation – JSON, XML, and More", content: "Use `@Produces` to specify the media types your method can return (e.g., `application/json`). Use `@Consumes` to specify the media types your method can accept. The JAX‑RS runtime automatically serializes Java objects to JSON/XML using providers like Jackson or JAXB." },
                  { title: "Client API – Consuming REST", content: "JAX‑RS also provides a client API for consuming REST services:\n```java\nClient client = ClientBuilder.newClient();\nUser user = client.target(\"http://api/users/1\")\n                   .request(MediaType.APPLICATION_JSON)\n                   .get(User.class);\n```" },
                ],
              },
              {
                title: "Java EE Security – Protecting Your Apps",
                slug: "java-ee-security",
                shortDescription: "Authentication, authorization, and secure communication.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Declarative Security – web.xml and Annotations", content: "You can define security constraints in `web.xml` using `<security‑constraint>` and `<login‑config>`. Roles are defined and users are mapped to roles in the application server. Annotations like `@RolesAllowed` and `@DeclareRoles` provide a more modern approach." },
                  { title: "Programmatic Security – Runtime Decisions", content: "Use `HttpServletRequest.isUserInRole()` to check if the current user has a specific role, and `getRemoteUser()` to get the authenticated user name. This is useful for fine‑grained control." },
                  { title: "Authentication Mechanisms – Form, Basic, Digest", content: "**Form‑based**: Custom login form, more user‑friendly. **Basic**: Uses HTTP basic authentication (popup). **Digest**: More secure than Basic (password hashed). Choose based on your security requirements." },
                  { title: "HTTPS and SSL/TLS", content: "Always use HTTPS in production to encrypt communication. You need to configure the application server's SSL connector (set up a keystore with `keytool`). Ensure all sensitive endpoints redirect to HTTPS." },
                ],
              },
            ],
          },
          {
            title: "Enterprise Integration Patterns",
            slug: "enterprise-integration",
            description: "Messaging, routing, and enterprise integration with Java EE.",
            topics: [
              {
                title: "Message Routing – Directing the Flow",
                slug: "message-routing",
                shortDescription: "Content-based router, message filter, splitter, aggregator.",
                estimatedMinutes: 22,
                sections: [
                  { title: "Content‑Based Router", content: "A router that inspects the message content and routes it to a different destination based on a rule. For example, orders with value > $1000 go to a 'high‑value' queue, others to 'standard'." },
                  { title: "Message Filter", content: "A filter that discards messages that don't meet a specific condition. This reduces noise and improves efficiency." },
                  { title: "Splitter", content: "Breaks a composite message (e.g., a list of order items) into individual messages, each processed separately." },
                  { title: "Aggregator", content: "Combines multiple related messages into a single message. Often used to collect all parts of an order before processing." },
                ],
              },
              {
                title: "Enterprise Service Bus (ESB) – Middleware Magic",
                slug: "esb",
                shortDescription: "Use ESB (e.g., Mule, Apache Camel) for integration.",
                estimatedMinutes: 20,
                sections: [
                  { title: "What is an ESB?", content: "An ESB is middleware that connects different applications and services, handling protocol translation, routing, transformation, and orchestration. It decouples systems and makes integration easier." },
                  { title: "Apache Camel – The Integration Framework", content: "Camel is a powerful, open‑source integration framework that implements many enterprise integration patterns (EIPs) using a Java DSL or XML. Example route:\n```java\nfrom(\"file:input\")\n    .split(body())\n    .to(\"activemq:queue/orders\");\n```\nCamel runs in various containers (Java SE, Spring Boot, etc.) and is widely adopted." },
                  { title: "Message Transformation – Changing Formats", content: "When systems speak different data formats (e.g., XML vs JSON, CSV vs XML), you need to transform messages. Camel provides support for data formats like JSON, XML, and Avro via data format components." },
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
        description: "Common Advance Java interview questions and design scenarios.",
        level: StudyLevel.INTERVIEW_PREP,
        modules: [
          {
            title: "Core Enterprise Java",
            slug: "enterprise-core-interview",
            description: "JDBC, Servlets, JSP, JPA questions.",
            topics: [
              {
                title: "JDBC Questions",
                slug: "jdbc-interview",
                shortDescription: "DriverManager vs DataSource, PreparedStatement vs Statement, batch processing.",
                estimatedMinutes: 20,
                sections: [
                  { title: "DataSource vs DriverManager", content: "DriverManager is the old way – simple but doesn't support pooling. DataSource is the modern approach: it provides connection pooling, distributed transactions, and is portable. In production, always use DataSource." },
                  { title: "PreparedStatement vs Statement", content: "PreparedStatement is superior: it prevents SQL injection by escaping input, precompiles the SQL for better performance on repeated executions, and handles special characters automatically. Statement should only be used for static, non‑parameterised queries." },
                  { title: "Batch Processing – When and Why", content: "Batch processing sends multiple SQL statements in one network round‑trip. It dramatically improves performance for bulk inserts/updates. Use `addBatch()` and `executeBatch()`. Ensure your database driver supports it." },
                ],
              },
              {
                title: "Servlets and JSP Questions",
                slug: "servlet-jsp-interview",
                shortDescription: "Servlet lifecycle, session management, MVC, EL/JSTL.",
                estimatedMinutes: 20,
                sections: [
                  { title: "Servlet Lifecycle", content: "`init()` – called once. `service()` – called per request. `destroy()` – on unload. The servlet instance is a singleton – avoid storing request‑specific data in instance variables." },
                  { title: "Session Management Techniques", content: "Cookies (default), URL rewriting (fallback), `HttpSession` (abstraction), and hidden form fields. HttpSession is the most reliable and secure." },
                  { title: "EL and JSTL", content: "EL simplifies data access in JSPs; JSTL provides tags for logic and iteration. They replace scriptlets, making JSPs cleaner and maintainable." },
                ],
              },
              {
                title: "JPA and Hibernate",
                slug: "jpa-interview",
                shortDescription: "Entity lifecycle, caching, lazy loading, N+1 problem.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Entity States", content: "New (not yet persisted), Managed (in persistence context), Detached (context closed), Removed. Use `persist()` to make a new entity managed; `merge()` to reattach a detached entity." },
                  { title: "Lazy vs Eager Loading", content: "LAZY loads on access (good for collections), EAGER loads immediately (use sparingly). EAGER can cause performance issues if overused." },
                  { title: "Solving the N+1 Problem", content: "When LAZY loading triggers additional queries for each row, use `JOIN FETCH` in JPQL or `@EntityGraph` to load everything in one query." },
                ],
              },
            ],
          },
          {
            title: "EJB and Web Services",
            slug: "ejb-ws-interview",
            description: "EJB types, JMS, SOAP vs REST.",
            topics: [
              {
                title: "EJB Types",
                slug: "ejb-interview",
                shortDescription: "Stateless, Stateful, Singleton, MDB.",
                estimatedMinutes: 18,
                sections: [
                  { title: "Stateless vs Stateful", content: "Stateless = no conversational state, pooled, scalable. Stateful = holds state per client, used for shopping carts. Use Stateless by default." },
                  { title: "Singleton", content: "One instance per application – ideal for caches or shared data. Handle concurrency with `@Lock`." },
                  { title: "Message‑Driven Bean", content: "Listens to JMS queues/topics, processes messages asynchronously – perfect for event‑driven architectures." },
                ],
              },
              {
                title: "SOAP vs REST",
                slug: "soap-rest-interview",
                shortDescription: "Compare SOAP and REST for web services.",
                estimatedMinutes: 20,
                sections: [
                  { title: "SOAP", content: "XML‑only, strict standards, WS‑Security, stateful possible, ACID transactions. Good for enterprise internal systems." },
                  { title: "REST", content: "Lightweight, JSON/XML, stateless, uses HTTP verbs, simple. Good for public APIs and microservices." },
                  { title: "When to Use", content: "SOAP for banking/financial systems that need WS‑Security and transactional guarantees. REST for everything else – especially when simplicity and scalability are key." },
                ],
              },
            ],
          },
          {
            title: "Design Scenarios",
            slug: "design-scenarios",
            description: "Solve real-world enterprise problems.",
            topics: [
              {
                title: "Design an E-Commerce Application",
                slug: "ecommerce-design",
                shortDescription: "Architecture choices: MVC, JPA, EJB, JMS.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Frontend", content: "Use Servlets/JSP or JSF as MVC. Servlets handle requests and forward to JSPs for rendering." },
                  { title: "Business Layer", content: "Stateless Session Beans (EJB) for business logic – they provide transactions, security, and pooling." },
                  { title: "Data Layer", content: "JPA (Hibernate) for ORM, with repositories/DAOs." },
                  { title: "Asynchronous Tasks", content: "Use JMS and Message‑Driven Beans for tasks like order confirmation emails, inventory updates, and log processing to offload the main flow." },
                ],
              },
              {
                title: "Design a Banking System",
                slug: "banking-design",
                shortDescription: "Transactions, security, and microservices vs monolith.",
                estimatedMinutes: 24,
                sections: [
                  { title: "Transaction Management", content: "Use container‑managed transactions (CMT) to ensure financial operations are atomic. Database must support ACID." },
                  { title: "Security", content: "Declarative security (roles) + HTTPS. For APIs, use JWT with OAuth2." },
                  { title: "Monolith or Microservices", content: "Start as a modular monolith (Java EE). When scaling requires separate teams, split into microservices based on bounded contexts." },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await ensureCategory(advanceJavaCategory);
  console.log("✅ Advance Java category seeded with ultra‑detailed content");
}

async function main() {
  await seedAdvanceJavaCategory();
}

main()
  .catch((error) => {
    console.error("Advance Java seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });