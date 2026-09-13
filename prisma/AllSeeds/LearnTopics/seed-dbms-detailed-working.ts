import { PrismaClient, StudyLevel } from "@prisma/client";

const prisma = new PrismaClient();

type TopicSeed = {
  title: string;
  slug: string;
  description: string;
  estimatedMinutes: number;
  sections?: Array<{ title: string; content: string }>;
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

const paths: PathSeed[] = [
  {
    name: "DBMS Foundations",
    slug: "beginner",
    description: "Build a strong foundation in database concepts and relational design.",
    level: StudyLevel.BEGINNER,
    modules: [
      {
        title: "DBMS Foundations",
        slug: "dbms-foundations",
        description: "Core database concepts, abstraction, architecture, users, storage, and transaction fundamentals.",
        topics: [
          {
            title: "Data, Information, Database, And Dbms",
            slug: "data-information-database-and-dbms",
            description: "Learn data, information, database, and dbms with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 19,
            sections: [
              { title: "Detailed explanation", content: "Data, Information, Database, And Dbms is a focused DBMS learning topic. The main ideas to connect are DATA, INFORMATION, RECORD, TABLE / RELATION, STUDENT, Each row represents a student instance. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying data, information, database, and dbms. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice data, information, database, and dbms by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Database Applications",
            slug: "database-applications",
            description: "Learn database applications with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 17,
            sections: [
              { title: "Detailed explanation", content: "Database Applications is a focused DBMS learning topic. The main ideas to connect are BANKING, Customers, Accounts, Loans, Transactions, Statements. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying database applications. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice database applications by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Problems With File-Processing Systems",
            slug: "problems-with-file-processing-systems",
            description: "Learn problems with file-processing systems with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 19,
            sections: [
              { title: "Detailed explanation", content: "Problems With File-Processing Systems is a focused DBMS learning topic. The main ideas to connect are More storage, More maintenance, Greater chance of inconsistency, Payroll staff need salary information, A library clerk may need book and borrower information, A student may need access to their own grades. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use problems with file-processing systems to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply problems with file-processing systems to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Advantages Of Dbms",
            slug: "advantages-of-dbms",
            description: "Learn advantages of dbms with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Advantages Of Dbms is a focused DBMS learning topic. The main ideas to connect are DISADVANTAGES, Complexity, Memory and processing overhead, Administrative requirements, Dependence on centralized infrastructure, Cost of operation and maintenance. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying advantages of dbms. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice advantages of dbms by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "View Of Data And Data Abstraction",
            slug: "view-of-data-and-data-abstraction",
            description: "Learn view of data and data abstraction with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 17,
            sections: [
              { title: "Detailed explanation", content: "View Of Data And Data Abstraction is a focused DBMS learning topic. The main ideas to connect are PHYSICAL LEVEL, Storage pages, File organization, Index structures, Disk locations, Buffering. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice view of data and data abstraction, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice view of data and data abstraction with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Schema And Instance",
            slug: "schema-and-instance",
            description: "Learn schema and instance with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Schema And Instance is a focused DBMS learning topic. The main ideas to connect are SCHEMA, STUDENT(, INSTANCE. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for schema and instance. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply schema and instance during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Data Models",
            slug: "data-models",
            description: "Learn data models with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Data Models is a focused DBMS learning topic. The main ideas to connect are Data, Relationships, Meaning, Constraints, RELATIONAL MODEL, CUSTOMER. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for data models. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply data models during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Database Languages",
            slug: "database-languages",
            description: "Learn database languages with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Database Languages is a focused DBMS learning topic. The main ideas to connect are DDL \u2014 DATA DEFINITION LANGUAGE, CREATE TABLE, ALTER TABLE, DROP TABLE, DML \u2014 DATA MANIPULATION LANGUAGE, Retrieve. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying database languages. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice database languages by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Integrity Constraints",
            slug: "integrity-constraints",
            description: "Learn integrity constraints with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Integrity Constraints is a focused DBMS learning topic. The main ideas to connect are DOMAIN CONSTRAINT, KEY CONSTRAINT, REFERENTIAL INTEGRITY, DEPARTMENT, EMPLOYEE, ASSERTION. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying integrity constraints. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice integrity constraints by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Data Dictionary / System Catalog",
            slug: "data-dictionary-system-catalog",
            description: "Learn data dictionary / system catalog with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Data Dictionary / System Catalog is a focused DBMS learning topic. The main ideas to connect are Table names, Column names, Data types, Constraints, Indexes, Users. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying data dictionary / system catalog. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice data dictionary / system catalog by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Database Users",
            slug: "database-users",
            description: "Learn database users with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Database Users is a focused DBMS learning topic. The main ideas to connect are NAIVE USERS, APPLICATION PROGRAMMERS, SOPHISTICATED USERS, Data analysts, Database developers, Technical analysts. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying database users. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice database users by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Database Architecture",
            slug: "database-architecture",
            description: "Learn database architecture with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Database Architecture is a focused DBMS learning topic. The main ideas to connect are CENTRALIZED, CLIENT APPLICATION, DATABASE SERVER, USER INTERFACE, APPLICATION SERVER. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for database architecture. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply database architecture during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Query Processor",
            slug: "query-processor",
            description: "Learn query processor with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Query Processor is a focused DBMS learning topic. The main ideas to connect are DDL INTERPRETER, DML COMPILER, QUERY OPTIMIZER, QUERY EVALUATION ENGINE. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice query processor, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice query processor with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Storage Manager",
            slug: "storage-manager",
            description: "Learn storage manager with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Storage Manager is a focused DBMS learning topic. The main ideas to connect are AUTHORIZATION AND INTEGRITY MANAGER, TRANSACTION MANAGER, FILE MANAGER, BUFFER MANAGER, WHY BUFFERING MATTERS. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use storage manager to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply storage manager to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Transaction Management Introduction",
            slug: "transaction-management-introduction",
            description: "Learn transaction management introduction with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Transaction Management Introduction is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use transaction management introduction to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice transaction management introduction by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
        ],
      },
      {
        title: "ER and Relational Design",
        slug: "er-and-relational-design",
        description: "Conceptual modeling, attributes, relationships, cardinality, relational structures, and keys.",
        topics: [
          {
            title: "Er Modeling",
            slug: "er-modeling",
            description: "Learn er modeling with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Er Modeling is a focused DBMS learning topic. The main ideas to connect are ENTITY, Student, Employee, Product, Course, ENTITY INSTANCE. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for er modeling. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply er modeling during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Attributes",
            slug: "attributes",
            description: "Learn attributes with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 17,
            sections: [
              { title: "Detailed explanation", content: "Attributes is a focused DBMS learning topic. The main ideas to connect are STUDENT:, student_id, name, date_of_birth, department, DOMAIN. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for attributes. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply attributes during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Relationships",
            slug: "relationships",
            description: "Learn relationships with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Relationships is a focused DBMS learning topic. The main ideas to connect are RELATIONSHIP INSTANCE, DEGREE OF RELATIONSHIP, UNARY, BINARY, TERNARY. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for relationships. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply relationships during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Cardinality",
            slug: "cardinality",
            description: "Learn cardinality with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Cardinality is a focused DBMS learning topic. The main ideas to connect are N:1, M:N, RELATIONSHIP PARTICIPATION, TOTAL PARTICIPATION, PARTIAL PARTICIPATION. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for cardinality. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply cardinality during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Er Design Issues",
            slug: "er-design-issues",
            description: "Learn er design issues with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Er Design Issues is a focused DBMS learning topic. The main ideas to connect are An entity, An attribute, A relationship. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for er design issues. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply er design issues during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Conceptual Design Example \u2014 University",
            slug: "conceptual-design-example-university",
            description: "Learn conceptual design example \u2014 university with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Conceptual Design Example \u2014 University is a focused DBMS learning topic. The main ideas to connect are Student, Instructor, Department, Course, Classroom, Student enrolls in Course. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying conceptual design example \u2014 university. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice conceptual design example \u2014 university by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Relational Model",
            slug: "relational-model",
            description: "Learn relational model with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Relational Model is a focused DBMS learning topic. The main ideas to connect are Attributes, Tuples, Domains, Keys, Constraints, RELATION SCHEMA. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for relational model. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply relational model during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Keys",
            slug: "keys",
            description: "Learn keys with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Keys is a focused DBMS learning topic. The main ideas to connect are SUPER KEY, CANDIDATE KEY, PRIMARY KEY, ALTERNATE KEY, COMPOSITE KEY, FOREIGN KEY. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for keys. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply keys during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Schema Diagrams",
            slug: "schema-diagrams",
            description: "Learn schema diagrams with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Schema Diagrams is a focused DBMS learning topic. The main ideas to connect are CUSTOMER, ORDER, PRODUCT. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for schema diagrams. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply schema diagrams during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "DBMS Intermediate",
    slug: "intermediate",
    description: "Develop practical query and schema-design reasoning.",
    level: StudyLevel.INTERMEDIATE,
    modules: [
      {
        title: "Relational Operations and Calculus",
        slug: "relational-operations-and-calculus",
        description: "Relational algebra operators and the logical foundations of relational querying.",
        topics: [
          {
            title: "Relational Algebra",
            slug: "relational-algebra",
            description: "Learn relational algebra with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Relational Algebra is a focused DBMS learning topic. The main ideas to connect are Selection, Projection, Union, Intersection, Difference, Cross product. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying relational algebra. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice relational algebra by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Selection",
            slug: "selection",
            description: "Learn selection with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Selection is a focused DBMS learning topic. The main ideas to connect are EMPLOYEE. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice selection, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice selection with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Projection",
            slug: "projection",
            description: "Learn projection with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Projection is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice projection, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice projection with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Combining Selection And Projection",
            slug: "combining-selection-and-projection",
            description: "Learn combining selection and projection with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Combining Selection And Projection is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice combining selection and projection, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice combining selection and projection with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Union",
            slug: "union",
            description: "Learn union with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Union is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice union, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice union with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Intersection",
            slug: "intersection",
            description: "Learn intersection with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Intersection is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice intersection, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice intersection with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Set Difference",
            slug: "set-difference",
            description: "Learn set difference with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Set Difference is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice set difference, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice set difference with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Cartesian Product",
            slug: "cartesian-product",
            description: "Learn cartesian product with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Cartesian Product is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice cartesian product, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice cartesian product with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Renaming",
            slug: "renaming",
            description: "Learn renaming with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Renaming is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying renaming. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice renaming by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Joins",
            slug: "joins",
            description: "Learn joins with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Joins is a focused DBMS learning topic. The main ideas to connect are CONDITION JOIN, EQUIJOIN, NATURAL JOIN, THETA JOIN. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice joins, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice joins with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Join Example",
            slug: "join-example",
            description: "Learn join example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Join Example is a focused DBMS learning topic. The main ideas to connect are EMPLOYEE:, DEPARTMENT:. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice join example, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice join example with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Division",
            slug: "division",
            description: "Learn division with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Division is a focused DBMS learning topic. The main ideas to connect are SQL. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice division, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice division with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Relational Calculus",
            slug: "relational-calculus",
            description: "Learn relational calculus with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Relational Calculus is a focused DBMS learning topic. The main ideas to connect are Tuple Relational Calculus (TRC), Domain Relational Calculus (DRC). Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice relational calculus, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice relational calculus with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Tuple Relational Calculus",
            slug: "tuple-relational-calculus",
            description: "Learn tuple relational calculus with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Tuple Relational Calculus is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice tuple relational calculus, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice tuple relational calculus with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Domain Relational Calculus",
            slug: "domain-relational-calculus",
            description: "Learn domain relational calculus with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Domain Relational Calculus is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice domain relational calculus, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice domain relational calculus with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
        ],
      },
      {
        title: "SQL, Views and Triggers",
        slug: "sql-views-and-triggers",
        description: "Practical SQL constructs, subqueries, aggregation, views, and database triggers.",
        topics: [
          {
            title: "Sql Overview",
            slug: "sql-overview",
            description: "Learn sql overview with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Sql Overview is a focused DBMS learning topic. The main ideas to connect are SELECT, FROM, WHERE. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice sql overview, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice sql overview with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Select",
            slug: "select",
            description: "Learn select with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Select is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice select, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice select with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Distinct",
            slug: "distinct",
            description: "Learn distinct with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Distinct is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying distinct. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice distinct by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Where",
            slug: "where",
            description: "Learn where with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Where is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice where, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice where with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Aliases",
            slug: "aliases",
            description: "Learn aliases with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aliases is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying aliases. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice aliases by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Set Operations In Sql",
            slug: "set-operations-in-sql",
            description: "Learn set operations in sql with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Set Operations In Sql is a focused DBMS learning topic. The main ideas to connect are UNION, INTERSECT, EXCEPT. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice set operations in sql, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice set operations in sql with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Aggregate Functions",
            slug: "aggregate-functions",
            description: "Learn aggregate functions with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aggregate Functions is a focused DBMS learning topic. The main ideas to connect are COUNT, SUM, AVG, MIN, MAX. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying aggregate functions. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice aggregate functions by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Group By",
            slug: "group-by",
            description: "Learn group by with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Group By is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice group by, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice group by with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Having",
            slug: "having",
            description: "Learn having with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Having is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice having, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice having with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Nested Subqueries",
            slug: "nested-subqueries",
            description: "Learn nested subqueries with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Nested Subqueries is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying nested subqueries. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice nested subqueries by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "In Subquery",
            slug: "in-subquery",
            description: "Learn in subquery with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "In Subquery is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice in subquery, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice in subquery with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Exists",
            slug: "exists",
            description: "Learn exists with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Exists is a focused DBMS learning topic. The main ideas to connect are WHERE EXISTS (, SELECT 1. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice exists, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice exists with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Correlated Subquery",
            slug: "correlated-subquery",
            description: "Learn correlated subquery with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Correlated Subquery is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice correlated subquery, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice correlated subquery with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Aggregate + Subquery Example",
            slug: "aggregate-subquery-example",
            description: "Learn aggregate + subquery example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aggregate + Subquery Example is a focused DBMS learning topic. The main ideas to connect are Inner query finds maximum age, Outer query finds employee rows matching that age, If several people share the maximum age, all matching rows can be returned. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice aggregate + subquery example, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice aggregate + subquery example with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Views",
            slug: "views",
            description: "Learn views with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Views is a focused DBMS learning topic. The main ideas to connect are WHY VIEWS ARE USEFUL, Simplify repeated queries, Hide unnecessary columns, Provide a controlled interface, Support security, Present derived information. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice views, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice views with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "View Security Example",
            slug: "view-security-example",
            description: "Learn view security example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "View Security Example is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice view security example, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice view security example with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "View Update Issues",
            slug: "view-update-issues",
            description: "Learn view update issues with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "View Update Issues is a focused DBMS learning topic. The main ideas to connect are Multiple joins, Aggregation, GROUP BY, Derived expressions. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice view update issues, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice view update issues with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Triggers",
            slug: "triggers",
            description: "Learn triggers with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Triggers is a focused DBMS learning topic. The main ideas to connect are INSERT, UPDATE, DELETE, INSERT ORDER, TRIGGER FIRES, AUDIT RECORD CREATED. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice triggers, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice triggers with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Row-Level Vs Statement-Level Trigger Idea",
            slug: "row-level-vs-statement-level-trigger-idea",
            description: "Learn row-level vs statement-level trigger idea with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Row-Level Vs Statement-Level Trigger Idea is a focused DBMS learning topic. The main ideas to connect are Row-level trigger may fire 100 times, Statement-level trigger may fire once. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice row-level vs statement-level trigger idea, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice row-level vs statement-level trigger idea with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Trigger Design Cautions",
            slug: "trigger-design-cautions",
            description: "Learn trigger design cautions with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Trigger Design Cautions is a focused DBMS learning topic. The main ideas to connect are Audit insertion, Inventory update, Notification record, Validation. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice trigger design cautions, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice trigger design cautions with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
        ],
      },
      {
        title: "Normalization and Dependencies",
        slug: "normalization-and-dependencies",
        description: "Functional dependencies, keys, normal forms, decomposition, MVDs, and 5NF concepts.",
        topics: [
          {
            title: "Why Normalization Is Needed",
            slug: "why-normalization-is-needed",
            description: "Learn why normalization is needed with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Why Normalization Is Needed is a focused DBMS learning topic. The main ideas to connect are EMPLOYEE(, UPDATE ANOMALY, INSERTION ANOMALY, DELETION ANOMALY. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use why normalization is needed to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply why normalization is needed to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Functional Dependency",
            slug: "functional-dependency",
            description: "Learn functional dependency with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Functional Dependency is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use functional dependency to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply functional dependency to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Determinant",
            slug: "determinant",
            description: "Learn determinant with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Determinant is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use determinant to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply determinant to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Trivial Functional Dependency",
            slug: "trivial-functional-dependency",
            description: "Learn trivial functional dependency with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Trivial Functional Dependency is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use trivial functional dependency to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply trivial functional dependency to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Armstrong-Style Inference Rules",
            slug: "armstrong-style-inference-rules",
            description: "Learn armstrong-style inference rules with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Armstrong-Style Inference Rules is a focused DBMS learning topic. The main ideas to connect are REFLEXIVITY, AUGMENTATION, TRANSITIVITY, Decomposition, Union, Pseudotransitivity. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying armstrong-style inference rules. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice armstrong-style inference rules by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Attribute Closure",
            slug: "attribute-closure",
            description: "Learn attribute closure with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Attribute Closure is a focused DBMS learning topic. The main ideas to connect are ATTRIBUTE CLOSURE USES, Find candidate keys, Test whether an FD follows from known dependencies, Check normal forms. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use attribute closure to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply attribute closure to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Lossless Decomposition",
            slug: "lossless-decomposition",
            description: "Learn lossless decomposition with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Lossless Decomposition is a focused DBMS learning topic. The main ideas to connect are EMPLOYEE(. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use lossless decomposition to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply lossless decomposition to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Dependency Preservation",
            slug: "dependency-preservation",
            description: "Learn dependency preservation with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Dependency Preservation is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying dependency preservation. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice dependency preservation by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "First Normal Form \u2014 1Nf",
            slug: "first-normal-form-1nf",
            description: "Learn first normal form \u2014 1nf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "First Normal Form \u2014 1Nf is a focused DBMS learning topic. The main ideas to connect are STUDENT. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use first normal form \u2014 1nf to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply first normal form \u2014 1nf to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Second Normal Form \u2014 2Nf",
            slug: "second-normal-form-2nf",
            description: "Learn second normal form \u2014 2nf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Second Normal Form \u2014 2Nf is a focused DBMS learning topic. The main ideas to connect are ENROLLMENT(. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use second normal form \u2014 2nf to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply second normal form \u2014 2nf to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Third Normal Form \u2014 3Nf",
            slug: "third-normal-form-3nf",
            description: "Learn third normal form \u2014 3nf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Third Normal Form \u2014 3Nf is a focused DBMS learning topic. The main ideas to connect are EMPLOYEE(. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use third normal form \u2014 3nf to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply third normal form \u2014 3nf to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Boyce-Codd Normal Form \u2014 Bcnf",
            slug: "boyce-codd-normal-form-bcnf",
            description: "Learn boyce-codd normal form \u2014 bcnf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Boyce-Codd Normal Form \u2014 Bcnf is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use boyce-codd normal form \u2014 bcnf to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply boyce-codd normal form \u2014 bcnf to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "3Nf Vs Bcnf",
            slug: "3nf-vs-bcnf",
            description: "Learn 3nf vs bcnf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "3Nf Vs Bcnf is a focused DBMS learning topic. The main ideas to connect are BCNF:. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying 3nf vs bcnf. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice 3nf vs bcnf by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Normalization Worked Example",
            slug: "normalization-worked-example",
            description: "Learn normalization worked example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Normalization Worked Example is a focused DBMS learning topic. The main ideas to connect are Product name repeated across orders, Supplier name repeated for every product from that supplier, Updates can become inconsistent, PRODUCT(, SUPPLIER(, Product details stored once. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use normalization worked example to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply normalization worked example to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Minimal Cover",
            slug: "minimal-cover",
            description: "Learn minimal cover with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Minimal Cover is a focused DBMS learning topic. The main ideas to connect are Single attribute on the right side, No unnecessary attributes on left sides, No redundant dependencies. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use minimal cover to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply minimal cover to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "3Nf Decomposition Idea",
            slug: "3nf-decomposition-idea",
            description: "Learn 3nf decomposition idea with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "3Nf Decomposition Idea is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use 3nf decomposition idea to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply 3nf decomposition idea to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Bcnf Decomposition Idea",
            slug: "bcnf-decomposition-idea",
            description: "Learn bcnf decomposition idea with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Bcnf Decomposition Idea is a focused DBMS learning topic. The main ideas to connect are Decomposition should be lossless, Dependency preservation is not guaranteed. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use bcnf decomposition idea to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply bcnf decomposition idea to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Multivalued Dependencies",
            slug: "multivalued-dependencies",
            description: "Learn multivalued dependencies with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Multivalued Dependencies is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use multivalued dependencies to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply multivalued dependencies to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Fourth Normal Form \u2014 4Nf",
            slug: "fourth-normal-form-4nf",
            description: "Learn fourth normal form \u2014 4nf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Fourth Normal Form \u2014 4Nf is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use fourth normal form \u2014 4nf to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply fourth normal form \u2014 4nf to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Join Dependencies",
            slug: "join-dependencies",
            description: "Learn join dependencies with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Join Dependencies is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use join dependencies to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply join dependencies to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Fifth Normal Form \u2014 5Nf",
            slug: "fifth-normal-form-5nf",
            description: "Learn fifth normal form \u2014 5nf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Fifth Normal Form \u2014 5Nf is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use fifth normal form \u2014 5nf to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply fifth normal form \u2014 5nf to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "Normalization Decision Process",
            slug: "normalization-decision-process",
            description: "Learn normalization decision process with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Normalization Decision Process is a focused DBMS learning topic. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use normalization decision process to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply normalization decision process to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "DBMS Advanced",
    slug: "advanced",
    description: "Master transactions, recovery, optimization, and applied database analysis.",
    level: StudyLevel.ADVANCED,
    modules: [
      {
        title: "Transactions, Concurrency and Recovery",
        slug: "transactions-concurrency-and-recovery",
        description: "ACID, schedules, serializability, locking, deadlocks, timestamps, logging, checkpoints, and ARIES.",
        topics: [
          {
            title: "Transaction Concept",
            slug: "transaction-concept",
            description: "Learn transaction concept with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Transaction Concept is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use transaction concept to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice transaction concept by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Acid Properties",
            slug: "acid-properties",
            description: "Learn acid properties with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Acid Properties is a focused DBMS learning topic. The main ideas to connect are ATOMICITY, CONSISTENCY, ISOLATION, DURABILITY. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use acid properties to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice acid properties by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Transaction States",
            slug: "transaction-states",
            description: "Learn transaction states with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Transaction States is a focused DBMS learning topic. The main ideas to connect are ACTIVE, PARTIALLY COMMITTED, COMMITTED, FAILED, ABORTED. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use transaction states to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice transaction states by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Concurrent Execution",
            slug: "concurrent-execution",
            description: "Learn concurrent execution with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Concurrent Execution is a focused DBMS learning topic. The main ideas to connect are Throughput, Resource utilization, Response time, T1:, T2:. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying concurrent execution. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice concurrent execution by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Schedule",
            slug: "schedule",
            description: "Learn schedule with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Schedule is a focused DBMS learning topic. The main ideas to connect are SERIAL SCHEDULE, CONCURRENT SCHEDULE. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use schedule to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice schedule by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Serializability",
            slug: "serializability",
            description: "Learn serializability with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Serializability is a focused DBMS learning topic. The main ideas to connect are CONFLICT SERIALIZABILITY, They belong to different transactions, They access the same data item, At least one operation is a write, Read-write, Write-read. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use serializability to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice serializability by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Precedence / Serializability Graph",
            slug: "precedence-serializability-graph",
            description: "Learn precedence / serializability graph with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Precedence / Serializability Graph is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use precedence / serializability graph to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice precedence / serializability graph by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Testing Serializability",
            slug: "testing-serializability",
            description: "Learn testing serializability with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Testing Serializability is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use testing serializability to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice testing serializability by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Recoverability",
            slug: "recoverability",
            description: "Learn recoverability with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Recoverability is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying recoverability. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice recoverability by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Cascade And Cascadeless Execution",
            slug: "cascade-and-cascadeless-execution",
            description: "Learn cascade and cascadeless execution with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Cascade And Cascadeless Execution is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying cascade and cascadeless execution. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice cascade and cascadeless execution by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Lock-Based Concurrency Control",
            slug: "lock-based-concurrency-control",
            description: "Learn lock-based concurrency control with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Lock-Based Concurrency Control is a focused DBMS learning topic. The main ideas to connect are SHARED LOCK \u2014 S, EXCLUSIVE LOCK \u2014 X. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use lock-based concurrency control to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice lock-based concurrency control by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Two-Phase Locking \u2014 2Pl",
            slug: "two-phase-locking-2pl",
            description: "Learn two-phase locking \u2014 2pl with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Two-Phase Locking \u2014 2Pl is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use two-phase locking \u2014 2pl to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice two-phase locking \u2014 2pl by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Strict Two-Phase Locking",
            slug: "strict-two-phase-locking",
            description: "Learn strict two-phase locking with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Strict Two-Phase Locking is a focused DBMS learning topic. The main ideas to connect are Prevents other transactions from reading uncommitted writes, Simplifies recovery, Helps prevent cascading rollback. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use strict two-phase locking to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice strict two-phase locking by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Deadlock",
            slug: "deadlock",
            description: "Learn deadlock with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Deadlock is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use deadlock to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice deadlock by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Timestamp-Based Protocols",
            slug: "timestamp-based-protocols",
            description: "Learn timestamp-based protocols with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Timestamp-Based Protocols is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use timestamp-based protocols to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice timestamp-based protocols by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Validation-Based Concurrency Control",
            slug: "validation-based-concurrency-control",
            description: "Learn validation-based concurrency control with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Validation-Based Concurrency Control is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying validation-based concurrency control. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice validation-based concurrency control by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Multiple Granularity Locking",
            slug: "multiple-granularity-locking",
            description: "Learn multiple granularity locking with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Multiple Granularity Locking is a focused DBMS learning topic. The main ideas to connect are DATABASE. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use multiple granularity locking to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice multiple granularity locking by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Intention Locks",
            slug: "intention-locks",
            description: "Learn intention locks with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Intention Locks is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use intention locks to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice intention locks by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Top-Down Locking And Bottom-Up Unlocking",
            slug: "top-down-locking-and-bottom-up-unlocking",
            description: "Learn top-down locking and bottom-up unlocking with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Top-Down Locking And Bottom-Up Unlocking is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use top-down locking and bottom-up unlocking to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice top-down locking and bottom-up unlocking by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Atomicity And Recovery",
            slug: "atomicity-and-recovery",
            description: "Learn atomicity and recovery with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Atomicity And Recovery is a focused DBMS learning topic. The main ideas to connect are Power loss, Operating-system failure, Hardware failure, Software failure, Transaction errors. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use atomicity and recovery to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice atomicity and recovery by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Log-Based Recovery",
            slug: "log-based-recovery",
            description: "Learn log-based recovery with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Log-Based Recovery is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use log-based recovery to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice log-based recovery by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Undo",
            slug: "undo",
            description: "Learn undo with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Undo is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use undo to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice undo by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Redo",
            slug: "redo",
            description: "Learn redo with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Redo is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use redo to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice redo by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Write-Ahead Logging Idea",
            slug: "write-ahead-logging-idea",
            description: "Learn write-ahead logging idea with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Write-Ahead Logging Idea is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying write-ahead logging idea. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice write-ahead logging idea by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Checkpoints",
            slug: "checkpoints",
            description: "Learn checkpoints with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Checkpoints is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use checkpoints to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice checkpoints by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Buffer Management And Recovery",
            slug: "buffer-management-and-recovery",
            description: "Learn buffer management and recovery with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Buffer Management And Recovery is a focused DBMS learning topic. The main ideas to connect are Clean, Modified/dirty, Buffer contents, Log records, Committed transactions, Uncommitted transactions. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use buffer management and recovery to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice buffer management and recovery by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Log Record Buffering",
            slug: "log-record-buffering",
            description: "Learn log record buffering with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Log Record Buffering is a focused DBMS learning topic. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use log record buffering to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply log record buffering to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Recovery With Concurrent Transactions",
            slug: "recovery-with-concurrent-transactions",
            description: "Learn recovery with concurrent transactions with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Recovery With Concurrent Transactions is a focused DBMS learning topic. The main ideas to connect are Which transactions committed, Which were active, Which need undo, Which committed changes need redo. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use recovery with concurrent transactions to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice recovery with concurrent transactions by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Failure With Loss Of Nonvolatile Storage",
            slug: "failure-with-loss-of-nonvolatile-storage",
            description: "Learn failure with loss of nonvolatile storage with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Failure With Loss Of Nonvolatile Storage is a focused DBMS learning topic. The main ideas to connect are Another storage copy, Remote backup site, Periodic log shipping, Recovery procedures. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use failure with loss of nonvolatile storage to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply failure with loss of nonvolatile storage to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Remote Backup Systems",
            slug: "remote-backup-systems",
            description: "Learn remote backup systems with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Remote Backup Systems is a focused DBMS learning topic. The main ideas to connect are PRIMARY SITE, REMOTE BACKUP, FAILURE, TAKEOVER / RECOVERY, Recovery time, Data loss window. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying remote backup systems. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice remote backup systems by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Advanced Recovery And Aries",
            slug: "advanced-recovery-and-aries",
            description: "Learn advanced recovery and aries with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Advanced Recovery And Aries is a focused DBMS learning topic. The main ideas to connect are Logging, LSNs, Checkpoints, Analysis, Redo, Undo. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use advanced recovery and aries to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice advanced recovery and aries by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Aries Analysis Pass",
            slug: "aries-analysis-pass",
            description: "Learn aries analysis pass with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aries Analysis Pass is a focused DBMS learning topic. The main ideas to connect are Starting from the latest suitable checkpoint, Reconstructing the transaction table, Reconstructing the dirty page table, Determining a redo starting point, Identifying transactions requiring undo, CHECKPOINT. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use aries analysis pass to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice aries analysis pass by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Aries Redo",
            slug: "aries-redo",
            description: "Learn aries redo with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aries Redo is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use aries redo to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice aries redo by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Aries Undo",
            slug: "aries-undo",
            description: "Learn aries undo with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aries Undo is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use aries undo to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice aries undo by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Savepoints",
            slug: "savepoints",
            description: "Learn savepoints with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Savepoints is a focused DBMS learning topic. The main ideas to connect are Complex transactions, Partial rollback, Releasing locks in certain deadlock handling strategies, NOTE ABOUT SOURCE COVERAGE. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use savepoints to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice savepoints by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
        ],
      },
      {
        title: "Storage, Indexing and Query Processing",
        slug: "storage-indexing-and-query-processing",
        description: "File organization, indexes, query execution, cost, optimization, and relational operation processing.",
        topics: [
          {
            title: "File Organization",
            slug: "file-organization",
            description: "Learn file organization with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "File Organization is a focused DBMS learning topic. The main ideas to connect are Search speed, Insert speed, Delete speed, Sequential processing, Space usage, HEAP / UNORDERED. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use file organization to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply file organization to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Indexes",
            slug: "indexes",
            description: "Learn indexes with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Indexes is a focused DBMS learning topic. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use indexes to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply indexes to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Index Tradeoff",
            slug: "index-tradeoff",
            description: "Learn index tradeoff with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Index Tradeoff is a focused DBMS learning topic. The main ideas to connect are Faster lookup, Faster certain joins, Faster ordering/range access in suitable structures, Extra storage, Insert overhead, Update overhead. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use index tradeoff to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply index tradeoff to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Query Processing",
            slug: "query-processing",
            description: "Learn query processing with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Query Processing is a focused DBMS learning topic. The main ideas to connect are SQL QUERY, PARSE / VALIDATE, RELATIONAL REPRESENTATION, GENERATE ALTERNATIVE PLANS, ESTIMATE COST, CHOOSE PLAN. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice query processing, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice query processing with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Query Cost",
            slug: "query-cost",
            description: "Learn query cost with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Query Cost is a focused DBMS learning topic. The main ideas to connect are Number of pages read, Number of disk operations, Number of records processed, Available indexes, Buffer availability, Join strategy. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice query cost, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice query cost with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Selection Operation Processing",
            slug: "selection-operation-processing",
            description: "Learn selection operation processing with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Selection Operation Processing is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice selection operation processing, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice selection operation processing with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Projection Operation Processing",
            slug: "projection-operation-processing",
            description: "Learn projection operation processing with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Projection Operation Processing is a focused DBMS learning topic. The main ideas to connect are Scan records, Extract requested columns, Remove duplicates if DISTINCT is requested, Produce result pages. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice projection operation processing, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice projection operation processing with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Join Operation Processing",
            slug: "join-operation-processing",
            description: "Learn join operation processing with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Join Operation Processing is a focused DBMS learning topic. The main ideas to connect are HASH JOIN STYLE. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice join operation processing, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice join operation processing with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Set Operation Processing",
            slug: "set-operation-processing",
            description: "Learn set operation processing with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Set Operation Processing is a focused DBMS learning topic. The main ideas to connect are UNION, INTERSECT, EXCEPT, Sorting, Hashing, Duplicate elimination. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use set operation processing to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply set operation processing to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Aggregate Operation Processing",
            slug: "aggregate-operation-processing",
            description: "Learn aggregate operation processing with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Aggregate Operation Processing is a focused DBMS learning topic. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use aggregate operation processing to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply aggregate operation processing to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Relational Query Optimization",
            slug: "relational-query-optimization",
            description: "Learn relational query optimization with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Relational Query Optimization is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice relational query optimization, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice relational query optimization with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Push Selection Down",
            slug: "push-selection-down",
            description: "Learn push selection down with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Push Selection Down is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice push selection down, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice push selection down with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Push Projection Down",
            slug: "push-projection-down",
            description: "Learn push projection down with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Push Projection Down is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice push projection down, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice push projection down with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Equivalence Rules",
            slug: "equivalence-rules",
            description: "Learn equivalence rules with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Equivalence Rules is a focused DBMS learning topic. The main ideas to connect are Selection cascade, Selection pushdown, Projection simplification, Reordering certain joins, Combining compatible selections, Replacing equivalent expressions. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying equivalence rules. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice equivalence rules by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Cost Estimation",
            slug: "cost-estimation",
            description: "Learn cost estimation with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Cost Estimation is a focused DBMS learning topic. The main ideas to connect are Relation cardinality, Selectivity, Page counts, Intermediate result sizes, Join sizes, Index usefulness. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use cost estimation to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply cost estimation to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
        ],
      },
      {
        title: "Applied Database Design and Analysis",
        slug: "applied-database-design-and-analysis",
        description: "End-to-end designs, practical SQL reasoning, performance scenarios, comparisons, and troubleshooting patterns.",
        topics: [
          {
            title: "Transacting Sql Queries",
            slug: "transacting-sql-queries",
            description: "Learn transacting sql queries with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Transacting Sql Queries is a focused DBMS learning topic. The main ideas to connect are BEGIN, ROLLBACK, INTEGRATED PRACTICAL DATABASE DESIGN EXAMPLE. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice transacting sql queries, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice transacting sql queries with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Online Course Platform",
            slug: "online-course-platform",
            description: "Learn online course platform with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Online Course Platform is a focused DBMS learning topic. The main ideas to connect are REQUIREMENTS, Students, Instructors, Courses, Enrollments, Lessons. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying online course platform. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice online course platform by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Relational Design",
            slug: "relational-design",
            description: "Learn relational design with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Relational Design is a focused DBMS learning topic. The main ideas to connect are STUDENT, INSTRUCTOR, CATEGORY, COURSE, LESSON, ENROLLMENT. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for relational design. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply relational design during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Why This Design Is Better Than One Huge Table",
            slug: "why-this-design-is-better-than-one-huge-table",
            description: "Learn why this design is better than one huge table with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Why This Design Is Better Than One Huge Table is a focused DBMS learning topic. The main ideas to connect are Repetition, Update anomalies, Large rows, Difficult maintenance. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for why this design is better than one huge table. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply why this design is better than one huge table during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Sample Sql",
            slug: "sample-sql",
            description: "Learn sample sql with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 16,
            sections: [
              { title: "Detailed explanation", content: "Sample Sql is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice sample sql, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice sample sql with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Transaction Example",
            slug: "transaction-example",
            description: "Learn transaction example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Transaction Example is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use transaction example to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice transaction example by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Concurrency Example",
            slug: "concurrency-example",
            description: "Learn concurrency example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Concurrency Example is a focused DBMS learning topic. The main ideas to connect are Both may read available seats = 1, Both may proceed, Final count becomes invalid, One transaction obtains the required protection, The other waits or is rejected/retried, The constraint is preserved. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying concurrency example. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice concurrency example by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Index Design Example",
            slug: "index-design-example",
            description: "Learn index design example with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Index Design Example is a focused DBMS learning topic. Connect the logical request to the physical work needed to execute it. Consider data volume, selectivity, indexes, join methods, intermediate-result size, sorting, grouping, memory, statistics, and the execution plan. Optimization should be evidence-driven because an optimization that helps one workload can hurt another. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose a customer table has several million rows and an application frequently searches it. Use index design example to compare alternative execution choices, estimate which work is actually required, and validate the decision against the workload rather than assuming one technique is always faster." },
              { title: "Practical use", content: "Apply index design example to a realistic workload. Change one assumption at a time, inspect the logical and physical work involved, and record why the chosen strategy is appropriate for the observed data distribution." },
            ],
          },
          {
            title: "Database Vs Dbms",
            slug: "database-vs-dbms",
            description: "Learn database vs dbms with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Database Vs Dbms is a focused DBMS learning topic. The main ideas to connect are DBMS:. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying database vs dbms. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice database vs dbms by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Schema Vs Instance",
            slug: "schema-vs-instance",
            description: "Learn schema vs instance with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Schema Vs Instance is a focused DBMS learning topic. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for schema vs instance. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply schema vs instance during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Ddl Vs Dml",
            slug: "ddl-vs-dml",
            description: "Learn ddl vs dml with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Ddl Vs Dml is a focused DBMS learning topic. The main ideas to connect are DDL:, DML:. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying ddl vs dml. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice ddl vs dml by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Physical Vs Logical Vs View Level",
            slug: "physical-vs-logical-vs-view-level",
            description: "Learn physical vs logical vs view level with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Physical Vs Logical Vs View Level is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice physical vs logical vs view level, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice physical vs logical vs view level with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Entity Vs Attribute",
            slug: "entity-vs-attribute",
            description: "Learn entity vs attribute with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Entity Vs Attribute is a focused DBMS learning topic. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for entity vs attribute. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply entity vs attribute during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Primary Key Vs Foreign Key",
            slug: "primary-key-vs-foreign-key",
            description: "Learn primary key vs foreign key with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Primary Key Vs Foreign Key is a focused DBMS learning topic. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for primary key vs foreign key. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply primary key vs foreign key during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Selection Vs Projection",
            slug: "selection-vs-projection",
            description: "Learn selection vs projection with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Selection Vs Projection is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice selection vs projection, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice selection vs projection with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Where Vs Having",
            slug: "where-vs-having",
            description: "Learn where vs having with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Where Vs Having is a focused DBMS learning topic. The main ideas to connect are WHERE:, HAVING:. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice where vs having, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice where vs having with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "View Vs Table",
            slug: "view-vs-table",
            description: "Learn view vs table with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "View Vs Table is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice view vs table, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice view vs table with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Functional Vs Multivalued Dependency",
            slug: "functional-vs-multivalued-dependency",
            description: "Learn functional vs multivalued dependency with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Functional Vs Multivalued Dependency is a focused DBMS learning topic. The main ideas to connect are FD:, MVD:. Use dependencies to reason about whether a relation stores independent facts together. Identify candidate keys, determine what attributes depend on them, detect partial, transitive, or multivalued dependencies, and decompose when the design creates avoidable redundancy. After decomposition, check losslessness and dependency preservation where required. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an order-line relation repeats product and supplier details for every purchase. Use functional vs multivalued dependency to identify the dependency or redundancy involved, make the smallest logically justified decomposition, and then verify that the original business facts can still be reconstructed correctly." },
              { title: "Practical use", content: "Apply functional vs multivalued dependency to a deliberately redundant relation. Record the candidate key and dependencies, perform the required reasoning, decompose if necessary, and verify both correctness and the ability to preserve required rules." },
            ],
          },
          {
            title: "3Nf Vs Bcnf",
            slug: "3nf-vs-bcnf",
            description: "Learn 3nf vs bcnf with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "3Nf Vs Bcnf is a focused DBMS learning topic. The main ideas to connect are BCNF:. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying 3nf vs bcnf. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice 3nf vs bcnf by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "2Pl Vs Timestamp Ordering",
            slug: "2pl-vs-timestamp-ordering",
            description: "Learn 2pl vs timestamp ordering with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "2Pl Vs Timestamp Ordering is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use 2pl vs timestamp ordering to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice 2pl vs timestamp ordering by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Undo Vs Redo",
            slug: "undo-vs-redo",
            description: "Learn undo vs redo with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Undo Vs Redo is a focused DBMS learning topic. The main ideas to connect are UNDO:, REDO:. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use undo vs redo to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice undo vs redo by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Logging Vs Checkpoint",
            slug: "logging-vs-checkpoint",
            description: "Learn logging vs checkpoint with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Logging Vs Checkpoint is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use logging vs checkpoint to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice logging vs checkpoint by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Local Transaction Vs Remote Backup",
            slug: "local-transaction-vs-remote-backup",
            description: "Learn local transaction vs remote backup with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Local Transaction Vs Remote Backup is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use local transaction vs remote backup to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice local transaction vs remote backup by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Original Relation",
            slug: "original-relation",
            description: "Learn original relation with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Original Relation is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying original relation. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice original relation by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Identify Key",
            slug: "identify-key",
            description: "Learn identify key with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Identify Key is a focused DBMS learning topic. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for identify key. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply identify key during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Partial Dependencies",
            slug: "partial-dependencies",
            description: "Learn partial dependencies with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Partial Dependencies is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying partial dependencies. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice partial dependencies by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Decompose",
            slug: "decompose",
            description: "Learn decompose with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Decompose is a focused DBMS learning topic. The main ideas to connect are ORDER(, PRODUCT(, SUPPLIER(, CUSTOMER(. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying decompose. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice decompose by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Benefit",
            slug: "benefit",
            description: "Learn benefit with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Benefit is a focused DBMS learning topic. The main ideas to connect are Customer name stored once, Supplier name stored once, Product name stored once, Order information stored once, Quantity remains specific to an order/product pair. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying benefit. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice benefit by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Bank Transfer",
            slug: "bank-transfer",
            description: "Learn bank transfer with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Bank Transfer is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying bank transfer. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice bank transfer by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Concurrent Withdrawals",
            slug: "concurrent-withdrawals",
            description: "Learn concurrent withdrawals with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Concurrent Withdrawals is a focused DBMS learning topic. The main ideas to connect are QUERY WRITING PRACTICE. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying concurrent withdrawals. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice concurrent withdrawals by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Basic Filter",
            slug: "basic-filter",
            description: "Learn basic filter with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Basic Filter is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying basic filter. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice basic filter by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Sorting",
            slug: "sorting",
            description: "Learn sorting with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Sorting is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying sorting. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice sorting by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Grouping",
            slug: "grouping",
            description: "Learn grouping with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Grouping is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice grouping, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice grouping with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Group Filter",
            slug: "group-filter",
            description: "Learn group filter with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Group Filter is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice group filter, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice group filter with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Join",
            slug: "join",
            description: "Learn join with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Join is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice join, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice join with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Subquery",
            slug: "subquery",
            description: "Learn subquery with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Subquery is a focused DBMS learning topic. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice subquery, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice subquery with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Exists",
            slug: "exists",
            description: "Learn exists with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Exists is a focused DBMS learning topic. The main ideas to connect are WHERE EXISTS (, SELECT 1. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice exists, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice exists with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
          {
            title: "Set Operation",
            slug: "set-operation",
            description: "Learn set operation with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Set Operation is a focused DBMS learning topic. The main ideas to connect are UNION, RELATIONAL ALGEBRA PRACTICE. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying set operation. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice set operation by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Sample Relations",
            slug: "sample-relations",
            description: "Learn sample relations with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Sample Relations is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying sample relations. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice sample relations by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Find Cse Students",
            slug: "find-cse-students",
            description: "Learn find cse students with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Find Cse Students is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying find cse students. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice find cse students by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Return Only Names",
            slug: "return-only-names",
            description: "Learn return only names with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Return Only Names is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying return only names. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice return only names by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Cse Student Names",
            slug: "cse-student-names",
            description: "Learn cse student names with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Cse Student Names is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying cse student names. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice cse student names by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Find Enrolled Students With Course Details",
            slug: "find-enrolled-students-with-course-details",
            description: "Learn find enrolled students with course details with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Find Enrolled Students With Course Details is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying find enrolled students with course details. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice find enrolled students with course details by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Find Students Enrolled In Course 101",
            slug: "find-students-enrolled-in-course-101",
            description: "Learn find students enrolled in course 101 with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Find Students Enrolled In Course 101 is a focused DBMS learning topic. The main ideas to connect are TROUBLESHOOTING DATABASE DESIGN. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying find students enrolled in course 101. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice find students enrolled in course 101 by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Symptom: Duplicate Facts",
            slug: "symptom-duplicate-facts",
            description: "Learn symptom: duplicate facts with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Symptom: Duplicate Facts is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying symptom: duplicate facts. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice symptom: duplicate facts by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Symptom: Update Requires Many Rows",
            slug: "symptom-update-requires-many-rows",
            description: "Learn symptom: update requires many rows with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Symptom: Update Requires Many Rows is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying symptom: update requires many rows. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice symptom: update requires many rows by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Symptom: Data Disappears After Delete",
            slug: "symptom-data-disappears-after-delete",
            description: "Learn symptom: data disappears after delete with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Symptom: Data Disappears After Delete is a focused DBMS learning topic. Treat the topic as a modeling problem. Start with the business meaning, identify the objects or structures involved, define identifiers and relationships, state constraints, and check whether the representation matches the real requirement. A good design makes important rules visible instead of hiding them in application code. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider an online learning platform for symptom: data disappears after delete. Model Student, Course, Instructor, and Enrollment as needed, choose identifiers deliberately, and write down the relationship or structural rule before deciding how it will be represented in relations." },
              { title: "Practical use", content: "Apply symptom: data disappears after delete during schema design reviews. Write the business rule in plain language, represent it in the model, then test the model with at least one valid case and one boundary case." },
            ],
          },
          {
            title: "Symptom: Transaction Leaves Half A Change",
            slug: "symptom-transaction-leaves-half-a-change",
            description: "Learn symptom: transaction leaves half a change with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Symptom: Transaction Leaves Half A Change is a focused DBMS learning topic. Think in terms of a sequence of reads and writes that must remain correct despite concurrency and failures. Trace the transaction boundary, conflicting operations, commit or abort behavior, locking or ordering rules, and recovery information. The goal is a predictable database state, not merely successful individual statements. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Imagine two customers trying to reserve the final seat for an event while a service failure occurs during payment. Use symptom: transaction leaves half a change to trace the reads, writes, commit or abort decision, and the resulting database state." },
              { title: "Practical use", content: "Practice symptom: transaction leaves half a change by writing a short schedule of reads and writes. Mark conflicts, commit and abort points, locks or ordering information, and then determine whether the final outcome is safe and recoverable." },
            ],
          },
          {
            title: "Symptom: Lost Update",
            slug: "symptom-lost-update",
            description: "Learn symptom: lost update with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Symptom: Lost Update is a focused DBMS learning topic. Understand the concept as a database-system responsibility: what information is involved, why the concept exists, what problem it prevents, and where it fits between users, applications, and the DBMS. Focus on correctness, controlled sharing, integrity, security, and maintainability rather than memorizing a one-line definition. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Consider a university information system while studying symptom: lost update. The same underlying facts may be used by admissions, faculty, finance, and students, so the design must keep shared information meaningful while giving each activity an appropriate interface and access boundary." },
              { title: "Practical use", content: "Practice symptom: lost update by drawing the boundary between the application and DBMS, listing the rule being protected, and testing what would happen if multiple users or applications accessed the same information." },
            ],
          },
          {
            title: "Symptom: Query Is Slow",
            slug: "symptom-query-is-slow",
            description: "Learn symptom: query is slow with a detailed explanation, an original worked example, and practical learning guidance.",
            estimatedMinutes: 15,
            sections: [
              { title: "Detailed explanation", content: "Symptom: Query Is Slow is a focused DBMS learning topic. The main ideas to connect are Full scans, Missing indexes, Poor join order, Large intermediate relations, Low-selectivity indexes, Outdated statistics. Start with the desired result, then reason backward to the operations required to produce it. Identify input relations, predicates, projected attributes, joins, grouping, duplicate behavior, NULL behavior, and ordering requirements. Only after the logical result is clear should implementation and performance be considered. A useful mental model is to ask: what is the input, what rule or operation is applied, what result should appear, and what failure or edge case would prove that the model is incomplete?" },
              { title: "Example", content: "Suppose an online store contains Customer, Order, Product, and OrderItem relations. To practice symptom: query is slow, begin with a small dataset, state the exact rows and columns expected in the result, and then trace the operation step by step until the result is justified." },
              { title: "Practical use", content: "Practice symptom: query is slow with a small set of relations. Predict the result by hand, run an equivalent SQL query where applicable, and check duplicates, NULLs, join matches, and grouping behavior before looking at performance." },
            ],
          },
        ],
      },
    ],
  },
];

const categorySeed = {
  name: "Database Management Systems",
  slug: "database-management-systems",
  description: "A structured learning path covering database foundations, ER and relational modeling, SQL, normalization, transactions, concurrency, recovery, indexing, query processing, and optimization.",
  icon: "🗄️",
  sortOrder: 0,
};

async function main() {
  const category = await prisma.studyCategory.upsert({
    where: { slug: categorySeed.slug },
    update: {
      name: categorySeed.name,
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

  let topicCount = 0;
  let sectionCount = 0;

  for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
    const pathSeed = paths[pathIndex];

    const path = await prisma.studyPath.upsert({
      where: {
        categoryId_slug: {
          categoryId: category.id,
          slug: pathSeed.slug,
        },
      },
      update: {
        name: pathSeed.name,
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

    for (let moduleIndex = 0; moduleIndex < pathSeed.modules.length; moduleIndex++) {
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

      for (let topicIndex = 0; topicIndex < moduleSeed.topics.length; topicIndex++) {
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
            moduleId: studyModule.id,
            title: topicSeed.title,
            seoDescription: topicSeed.description,
            estimatedMinutes: topicSeed.estimatedMinutes,
            isPublished: true,
            sortOrder: topicIndex,
            prerequisiteIds: [],
            relatedTopicIds: [],
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

        for (let sectionIndex = 0; sectionIndex < (topicSeed.sections ?? []).length; sectionIndex++) {
          const section = topicSeed.sections![sectionIndex];

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

          sectionCount++;
        }

        topicCount++;
      }
    }
  }

  console.log(`DBMS seed complete: ${topicCount} learning topics, ${sectionCount} sections.`);
}

main()
  .catch((error) => {
    console.error("DBMS seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });