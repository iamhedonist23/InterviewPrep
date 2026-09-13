/**
 * MySQL + SQL + DBMS Interview Questions — Verified Source-Based Seed
 *
 * Source-derived content is preserved from the supplied interview bank.
 * The source explicitly states that questions are not guaranteed to appear
 * in every interview. No synthetic interview question has been added.
 *
 * Generated structure follows the same interview-question seed pattern:
 * question, slug, shortDescription, explanation, sampleAnswer, detailedAnswer,
 * keyPoints, commonMistakes, followUpQuestions, tags, subcategorySlug,
 * experienceLevel, difficulty, interviewType.
 */

import { PrismaClient, ExperienceLevel, Difficulty, InterviewType } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [

  {
    "question": "What is the difference between SQL and MySQL?",
    "slug": "what-is-the-difference-between-sql-and-mysql",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "SQL\n(Structured Query Language) is a standardized language used to define,\nquery, manipulate, and control data in relational databases. MySQL is a\nrelational database management system (RDBMS) that implements SQL and\nadds its own storage engines, optimizer behavior, administrative\nfeatures, and configuration options. In simple terms, SQL is the\nlanguage; MySQL is a database product that understands that language.\nSQL concepts such as SELECT, JOIN, GROUP BY, constraints, and\ntransactions are broadly portable, although exact syntax and features\ncan differ between database products.",
    "detailedAnswer": "Source question #1.\n\nAnswer:\nSQL\n(Structured Query Language) is a standardized language used to define,\nquery, manipulate, and control data in relational databases. MySQL is a\nrelational database management system (RDBMS) that implements SQL and\nadds its own storage engines, optimizer behavior, administrative\nfeatures, and configuration options. In simple terms, SQL is the\nlanguage; MySQL is a database product that understands that language.\nSQL concepts such as SELECT, JOIN, GROUP BY, constraints, and\ntransactions are broadly portable, although exact syntax and features\ncan differ between database products.\n\nExample:\nSQL: SELECT name FROM employees WHERE salary > 50000; MySQL:\nthe above statement can be executed against a MySQL database containing\nan employees table. MySQL also provides product-specific features such\nas InnoDB and MySQL-specific functions.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "What is a primary key?",
    "slug": "what-is-a-primary-key",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A primary key is a column or\nset of columns that uniquely identifies each row in a table. A primary\nkey must be unique and cannot contain NULL values. A table has one\nprimary-key constraint, although that constraint can contain multiple\ncolumns as a composite primary key. The primary key is used to enforce\nentity identity and is commonly referenced by foreign keys. In MySQL\nInnoDB, the primary key also has an important physical-storage role\nbecause table rows are organized around the clustered primary-key index.",
    "detailedAnswer": "Source question #2.\n\nAnswer:\nA primary key is a column or\nset of columns that uniquely identifies each row in a table. A primary\nkey must be unique and cannot contain NULL values. A table has one\nprimary-key constraint, although that constraint can contain multiple\ncolumns as a composite primary key. The primary key is used to enforce\nentity identity and is commonly referenced by foreign keys. In MySQL\nInnoDB, the primary key also has an important physical-storage role\nbecause table rows are organized around the clustered primary-key index.\n\nExample:\nCREATE TABLE employees ( employee_id INT PRIMARY KEY, name\nVARCHAR(100) ); Two employees cannot have the same employee_id, and\nemployee_id cannot be NULL.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "Primary key vs unique key?",
    "slug": "primary-key-vs-unique-key",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "Both primary-key and\nUNIQUE constraints enforce uniqueness, but they have different purposes.\nA table has one primary-key constraint, and its columns cannot be NULL.\nA table can have multiple UNIQUE constraints. NULL handling for a UNIQUE\nconstraint is database-specific; in MySQL, a UNIQUE index can contain\nmultiple NULL values because NULL is not considered equal to another\nNULL. The primary key normally represents the row’s main identity, while\nUNIQUE is useful for alternate identifiers such as email addresses.",
    "detailedAnswer": "Source question #3.\n\nAnswer:\nBoth primary-key and\nUNIQUE constraints enforce uniqueness, but they have different purposes.\nA table has one primary-key constraint, and its columns cannot be NULL.\nA table can have multiple UNIQUE constraints. NULL handling for a UNIQUE\nconstraint is database-specific; in MySQL, a UNIQUE index can contain\nmultiple NULL values because NULL is not considered equal to another\nNULL. The primary key normally represents the row’s main identity, while\nUNIQUE is useful for alternate identifiers such as email addresses.\n\nExample:\nemployee_id INT PRIMARY KEY, email VARCHAR(255) UNIQUE Here\nemployee_id identifies the row, while email prevents two rows from\nhaving the same non-NULL email.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "What is a foreign key?",
    "slug": "what-is-a-foreign-key",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A foreign key is a constraint\nthat links a column or group of columns in one table to a candidate key,\nnormally a primary key or UNIQUE key, in another table. It helps prevent\ninvalid references and enforces relationships between tables. Depending\non the design, actions such as ON DELETE CASCADE, RESTRICT, SET NULL, or\ncorresponding update behavior can define what happens when the\nreferenced row changes.",
    "detailedAnswer": "Source question #4.\n\nAnswer:\nA foreign key is a constraint\nthat links a column or group of columns in one table to a candidate key,\nnormally a primary key or UNIQUE key, in another table. It helps prevent\ninvalid references and enforces relationships between tables. Depending\non the design, actions such as ON DELETE CASCADE, RESTRICT, SET NULL, or\ncorresponding update behavior can define what happens when the\nreferenced row changes.\n\nExample:\ncustomers(id, name) and orders(id, customer_id). If\norders.customer_id is a foreign key referencing customers.id, an order\ncannot normally reference a customer ID that does not exist.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "What is referential integrity?",
    "slug": "what-is-referential-integrity",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Referential integrity\nmeans relationships between related tables remain valid. A foreign-key\nvalue must either match an allowed referenced key or be NULL when the\nrelationship permits NULL. This prevents orphaned child rows and\nprotects the consistency of relationships. Referential actions such as\nCASCADE or RESTRICT determine what happens when a parent row is updated\nor deleted.",
    "detailedAnswer": "Source question #5.\n\nAnswer:\nReferential integrity\nmeans relationships between related tables remain valid. A foreign-key\nvalue must either match an allowed referenced key or be NULL when the\nrelationship permits NULL. This prevents orphaned child rows and\nprotects the consistency of relationships. Referential actions such as\nCASCADE or RESTRICT determine what happens when a parent row is updated\nor deleted.\n\nExample:\nIf orders.customer_id references customers.id, deleting\ncustomer 10 is rejected when dependent orders exist if the relationship\nuses RESTRICT. With CASCADE, the related orders could be deleted\nautomatically.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "What is a composite key?",
    "slug": "what-is-a-composite-key",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A composite key is a key\nmade from two or more columns. It is useful when no single column\nnaturally identifies a row and the combination represents uniqueness.\nThe uniqueness applies to the combination, not necessarily to each\nindividual column. Composite keys are common in junction tables\nrepresenting many-to-many relationships.",
    "detailedAnswer": "Source question #6.\n\nAnswer:\nA composite key is a key\nmade from two or more columns. It is useful when no single column\nnaturally identifies a row and the combination represents uniqueness.\nThe uniqueness applies to the combination, not necessarily to each\nindividual column. Composite keys are common in junction tables\nrepresenting many-to-many relationships.\n\nExample:\nCREATE TABLE student_course ( student_id INT, course_id INT,\nPRIMARY KEY (student_id, course_id) ); A student can take many courses\nand a course can have many students, but the same student-course pair\ncannot be inserted twice.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "NULL vs zero vs empty string?",
    "slug": "null-vs-zero-vs-empty-string",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "NULL means the value\nis missing, unknown, or not applicable; it is not the same as zero or an\nempty string. Zero is a numeric value with mathematical meaning. An\nempty string is a character value containing no characters. NULL\nparticipates in SQL’s three-valued logic, so comparisons such as value =\nNULL do not return TRUE. Correct NULL testing uses IS NULL or IS NOT\nNULL.",
    "detailedAnswer": "Source question #7.\n\nAnswer:\nNULL means the value\nis missing, unknown, or not applicable; it is not the same as zero or an\nempty string. Zero is a numeric value with mathematical meaning. An\nempty string is a character value containing no characters. NULL\nparticipates in SQL’s three-valued logic, so comparisons such as value =\nNULL do not return TRUE. Correct NULL testing uses IS NULL or IS NOT\nNULL.\n\nExample:\nsalary = 0 means the stored numeric salary is zero. name = ’’\nmeans a known string with no characters. phone IS NULL means no phone\nvalue was supplied or the value is unknown.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "Why does column = NULL not work?",
    "slug": "why-does-column-null-not-work",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "NULL represents the\nabsence or unknown state of a value, so SQL does not treat NULL as an\nordinary value that can be compared with =. A comparison such as column\n= NULL evaluates to UNKNOWN rather than TRUE. WHERE filters keep rows\nwhose condition is TRUE, so those rows are not returned. Use IS NULL or\nIS NOT NULL for NULL checks.",
    "detailedAnswer": "Source question #8.\n\nAnswer:\nNULL represents the\nabsence or unknown state of a value, so SQL does not treat NULL as an\nordinary value that can be compared with =. A comparison such as column\n= NULL evaluates to UNKNOWN rather than TRUE. WHERE filters keep rows\nwhose condition is TRUE, so those rows are not returned. Use IS NULL or\nIS NOT NULL for NULL checks.\n\nExample:\nWrong: SELECT * FROM employees WHERE manager_id = NULL;\nCorrect: SELECT * FROM employees WHERE manager_id IS NULL;\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "WHERE vs HAVING?",
    "slug": "where-vs-having",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "WHERE filters individual rows\nbefore grouping and aggregation. HAVING filters groups after GROUP BY\nand aggregation. WHERE is generally preferable for conditions that do\nnot depend on aggregate results because it can reduce the number of rows\nthat must be grouped. HAVING is used for conditions such as COUNT(*) > 5\nor AVG(salary) > 50000.",
    "detailedAnswer": "Source question #9.\n\nAnswer:\nWHERE filters individual rows\nbefore grouping and aggregation. HAVING filters groups after GROUP BY\nand aggregation. WHERE is generally preferable for conditions that do\nnot depend on aggregate results because it can reduce the number of rows\nthat must be grouped. HAVING is used for conditions such as COUNT(*) > 5\nor AVG(salary) > 50000.\n\nExample:\nSELECT department_id, AVG(salary) FROM employees WHERE status =\n‘ACTIVE’ GROUP BY department_id HAVING AVG(salary) > 50000; WHERE\nremoves inactive employees first; HAVING keeps only departments whose\naverage salary exceeds 50,000.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "GROUP BY vs DISTINCT?",
    "slug": "group-by-vs-distinct",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "DISTINCT removes duplicate\ncombinations from the selected result. GROUP BY forms groups and is\nprimarily used when you need aggregation such as COUNT, SUM, AVG, MIN,\nor MAX. A GROUP BY query can sometimes produce a distinct-looking\nresult, but the concepts have different purposes and grouping becomes\nessential when aggregate calculations are involved.",
    "detailedAnswer": "Source question #10.\n\nAnswer:\nDISTINCT removes duplicate\ncombinations from the selected result. GROUP BY forms groups and is\nprimarily used when you need aggregation such as COUNT, SUM, AVG, MIN,\nor MAX. A GROUP BY query can sometimes produce a distinct-looking\nresult, but the concepts have different purposes and grouping becomes\nessential when aggregate calculations are involved.\n\nExample:\nSELECT DISTINCT department_id FROM employees; returns each\ndepartment once. SELECT department_id, COUNT(*) FROM employees GROUP BY\ndepartment_id; returns one row per department plus its employee count.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "INNER JOIN vs LEFT JOIN?",
    "slug": "inner-join-vs-left-join",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "INNER JOIN returns only\nrows that satisfy the join condition on both sides. LEFT JOIN returns\nevery row from the left table and matching rows from the right table;\nwhen no match exists, right-side columns are NULL. Use INNER JOIN when\nunmatched rows should be excluded and LEFT JOIN when the left-side\nentities must be retained even without related records.",
    "detailedAnswer": "Source question #11.\n\nAnswer:\nINNER JOIN returns only\nrows that satisfy the join condition on both sides. LEFT JOIN returns\nevery row from the left table and matching rows from the right table;\nwhen no match exists, right-side columns are NULL. Use INNER JOIN when\nunmatched rows should be excluded and LEFT JOIN when the left-side\nentities must be retained even without related records.\n\nExample:\ncustomers LEFT JOIN orders can show every customer, including\ncustomers with no orders. customers INNER JOIN orders shows only\ncustomers who have at least one matching order.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Joins"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "LEFT JOIN vs RIGHT JOIN?",
    "slug": "left-join-vs-right-join",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "LEFT JOIN preserves all\nrows from the left table; RIGHT JOIN preserves all rows from the right\ntable. They are logically equivalent if the table order is reversed, so\nmany teams prefer LEFT JOIN because it is easier to read consistently.\nThe important interview point is which side must be preserved.",
    "detailedAnswer": "Source question #12.\n\nAnswer:\nLEFT JOIN preserves all\nrows from the left table; RIGHT JOIN preserves all rows from the right\ntable. They are logically equivalent if the table order is reversed, so\nmany teams prefer LEFT JOIN because it is easier to read consistently.\nThe important interview point is which side must be preserved.\n\nExample:\nA LEFT JOIN from departments to employees keeps departments\nwith zero employees. The equivalent RIGHT JOIN can be written by placing\ndepartments on the right side.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Joins"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "JOIN vs subquery?",
    "slug": "join-vs-subquery",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "A JOIN combines rows from\nmultiple tables as part of a relational query, while a subquery is a\nquery nested inside another query. Both can express many of the same\nrequirements. JOINs are often natural for returning columns from related\ntables, while subqueries can be clearer for existence checks, scalar\ncalculations, or logically isolated conditions. The optimizer may\ntransform equivalent forms, so performance should be evaluated using\nEXPLAIN rather than assumed from syntax alone.",
    "detailedAnswer": "Source question #13.\n\nAnswer:\nA JOIN combines rows from\nmultiple tables as part of a relational query, while a subquery is a\nquery nested inside another query. Both can express many of the same\nrequirements. JOINs are often natural for returning columns from related\ntables, while subqueries can be clearer for existence checks, scalar\ncalculations, or logically isolated conditions. The optimizer may\ntransform equivalent forms, so performance should be evaluated using\nEXPLAIN rather than assumed from syntax alone.\n\nExample:\nTo find employees belonging to active departments, you can JOIN\nemployees to departments, or use WHERE department_id IN (SELECT id FROM\ndepartments WHERE status=‘ACTIVE’).\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Joins",
      "Query Optimization"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "UNION vs UNION ALL?",
    "slug": "union-vs-union-all",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "UNION combines result sets and\nremoves duplicate rows. UNION ALL combines result sets without removing\nduplicates. Because duplicate elimination requires additional work such\nas sorting or hashing, UNION ALL is usually faster when duplicates are\nvalid or impossible by design. Both queries must have compatible numbers\nand types of columns in corresponding positions.",
    "detailedAnswer": "Source question #14.\n\nAnswer:\nUNION combines result sets and\nremoves duplicate rows. UNION ALL combines result sets without removing\nduplicates. Because duplicate elimination requires additional work such\nas sorting or hashing, UNION ALL is usually faster when duplicates are\nvalid or impossible by design. Both queries must have compatible numbers\nand types of columns in corresponding positions.\n\nExample:\nSELECT email FROM customers UNION SELECT email FROM leads;\nremoves duplicate emails. UNION ALL keeps every occurrence.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "COUNT() vs COUNT(column)?",
    "slug": "count-vs-count-column",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "COUNT() counts rows\nproduced by the query, including rows where individual columns are NULL.\nCOUNT(column) counts only rows where that expression is non-NULL. This\ndistinction is important with LEFT JOINs and nullable columns. COUNT(*)\nanswers ‘how many rows?’, while COUNT(column) often answers ‘how many\nrows have a non-NULL value for this expression?’.",
    "detailedAnswer": "Source question #15.\n\nAnswer:\nCOUNT() counts rows\nproduced by the query, including rows where individual columns are NULL.\nCOUNT(column) counts only rows where that expression is non-NULL. This\ndistinction is important with LEFT JOINs and nullable columns. COUNT(*)\nanswers ‘how many rows?’, while COUNT(column) often answers ‘how many\nrows have a non-NULL value for this expression?’.\n\nExample:\nFor a table with three rows and salaries 50000, NULL, 60000,\nCOUNT(*) returns 3 while COUNT(salary) returns 2.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "EXISTS vs IN?",
    "slug": "exists-vs-in",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "EXISTS checks whether the subquery\nreturns at least one matching row and is especially natural for\ncorrelated existence tests. IN compares a value against the set returned\nby a subquery. Modern MySQL can optimize many equivalent forms, so\nneither is universally faster. A major correctness issue is NULL\nbehavior with NOT IN: if the subquery can produce NULL, NOT IN can yield\nUNKNOWN and unexpectedly return no rows. NOT EXISTS is often safer for\nanti-joins.",
    "detailedAnswer": "Source question #16.\n\nAnswer:\nEXISTS checks whether the subquery\nreturns at least one matching row and is especially natural for\ncorrelated existence tests. IN compares a value against the set returned\nby a subquery. Modern MySQL can optimize many equivalent forms, so\nneither is universally faster. A major correctness issue is NULL\nbehavior with NOT IN: if the subquery can produce NULL, NOT IN can yield\nUNKNOWN and unexpectedly return no rows. NOT EXISTS is often safer for\nanti-joins.\n\nExample:\nSELECT c.id FROM customers c WHERE EXISTS (SELECT 1 FROM orders\no WHERE o.customer_id = c.id); returns customers having at least one\norder.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "How do you find the second-highest salary?",
    "slug": "how-do-you-find-the-second-highest-salary",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "First\nclarify whether ‘second-highest’ means the second distinct salary or the\nsecond row after sorting. For the second distinct salary, a common\napproach is to find the maximum salary below the overall maximum. This\nhandles duplicate highest salaries correctly. Another robust approach is\nDENSE_RANK over salary and select rank 2.",
    "detailedAnswer": "Source question #17.\n\nAnswer:\nFirst\nclarify whether ‘second-highest’ means the second distinct salary or the\nsecond row after sorting. For the second distinct salary, a common\napproach is to find the maximum salary below the overall maximum. This\nhandles duplicate highest salaries correctly. Another robust approach is\nDENSE_RANK over salary and select rank 2.\n\nExample:\nSELECT MAX(salary) AS second_highest FROM employees WHERE\nsalary < (SELECT MAX(salary) FROM employees); If salaries are 100, 100,\n90, 80, the answer is 90.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "How do you find the Nth-highest salary?",
    "slug": "how-do-you-find-the-nth-highest-salary",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "For the Nth\ndistinct salary, DENSE_RANK is often the clearest approach because equal\nsalaries receive the same rank without gaps. The query should define how\nties are treated and what should happen if fewer than N distinct\nsalaries exist. In MySQL 8+, window functions make this straightforward.",
    "detailedAnswer": "Source question #18.\n\nAnswer:\nFor the Nth\ndistinct salary, DENSE_RANK is often the clearest approach because equal\nsalaries receive the same rank without gaps. The query should define how\nties are treated and what should happen if fewer than N distinct\nsalaries exist. In MySQL 8+, window functions make this straightforward.\n\nExample:\nWITH ranked AS ( SELECT salary, DENSE_RANK() OVER (ORDER BY\nsalary DESC) AS rnk FROM employees ) SELECT salary FROM ranked WHERE rnk\n= 3; This returns the third distinct salary.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "How do you find duplicate rows?",
    "slug": "how-do-you-find-duplicate-rows",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Identify the\ncolumns that define a duplicate, then GROUP BY those columns and use\nHAVING COUNT(*) > 1. Do not automatically group by every column if some\ncolumns are intentionally different. In production, first determine\nwhether duplicates are true data errors or legitimate repeated records.",
    "detailedAnswer": "Source question #19.\n\nAnswer:\nIdentify the\ncolumns that define a duplicate, then GROUP BY those columns and use\nHAVING COUNT(*) > 1. Do not automatically group by every column if some\ncolumns are intentionally different. In production, first determine\nwhether duplicates are true data errors or legitimate repeated records.\n\nExample:\nSELECT email, COUNT() AS cnt FROM customers GROUP BY email\nHAVING COUNT() > 1; This finds duplicate email values.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "How do you delete duplicate rows safely?",
    "slug": "how-do-you-delete-duplicate-rows-safely",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "First\ndefine the duplicate key and the row that should survive. Back up or\ntest the operation, preferably inside an appropriate transaction, and\nverify the rows to be deleted with a SELECT before running DELETE. A\ncommon MySQL pattern is to use ROW_NUMBER() to assign one row to keep\nand delete the others, or use a self-join when a stable unique ID\nexists. After cleanup, add a UNIQUE constraint when business rules\nrequire uniqueness so the problem cannot recur.",
    "detailedAnswer": "Source question #20.\n\nAnswer:\nFirst\ndefine the duplicate key and the row that should survive. Back up or\ntest the operation, preferably inside an appropriate transaction, and\nverify the rows to be deleted with a SELECT before running DELETE. A\ncommon MySQL pattern is to use ROW_NUMBER() to assign one row to keep\nand delete the others, or use a self-join when a stable unique ID\nexists. After cleanup, add a UNIQUE constraint when business rules\nrequire uniqueness so the problem cannot recur.\n\nExample:\nWITH ranked AS ( SELECT id, ROW_NUMBER() OVER (PARTITION BY\nemail ORDER BY id) AS rn FROM customers ) DELETE c FROM customers c JOIN\nranked r ON r.id = c.id WHERE r.rn > 1; Test the corresponding SELECT\nfirst and adapt the exact DELETE syntax to the MySQL version and\ntransaction strategy.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "How do you find the highest-paid employee in each\ndepartment?",
    "slug": "how-do-you-find-the-highest-paid-employee-in-each-department",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Use a window function when you need the employee\nrow, not only the maximum salary. DENSE_RANK or ROW_NUMBER can rank\nemployees within each department. DENSE_RANK returns all employees tied\nfor the highest salary; ROW_NUMBER returns one row per department\naccording to the chosen tie-breaker.",
    "detailedAnswer": "Source question #21.\n\nAnswer:\nUse a window function when you need the employee\nrow, not only the maximum salary. DENSE_RANK or ROW_NUMBER can rank\nemployees within each department. DENSE_RANK returns all employees tied\nfor the highest salary; ROW_NUMBER returns one row per department\naccording to the chosen tie-breaker.\n\nExample:\nSELECT FROM ( SELECT e., DENSE_RANK() OVER (PARTITION BY\ndepartment_id ORDER BY salary DESC) rnk FROM employees e ) x WHERE rnk =\n1; If two employees tie for highest salary, both are returned.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How do you find employees earning more than their\ndepartment average?",
    "slug": "how-do-you-find-employees-earning-more-than-their-department-average",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Calculate the average salary for each\ndepartment and compare each employee’s salary with the average of that\nemployee’s department. A correlated subquery is easy to understand; a\nwindow function can calculate the departmental average in the same\nresult set. The window approach is often convenient when the employee\nrow and aggregate both need to be returned.",
    "detailedAnswer": "Source question #22.\n\nAnswer:\nCalculate the average salary for each\ndepartment and compare each employee’s salary with the average of that\nemployee’s department. A correlated subquery is easy to understand; a\nwindow function can calculate the departmental average in the same\nresult set. The window approach is often convenient when the employee\nrow and aggregate both need to be returned.\n\nExample:\nSELECT FROM ( SELECT e., AVG(salary) OVER (PARTITION BY\ndepartment_id) dept_avg FROM employees e ) x WHERE salary > dept_avg;\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How do you find the top three salaries per department?",
    "slug": "how-do-you-find-the-top-three-salaries-per-department",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Use a window function partitioned by department and ordered by\nsalary descending. Choose ROW_NUMBER when exactly three rows per\ndepartment are required, or DENSE_RANK when ‘top three salaries’ means\nthe top three distinct salary levels and ties should be included. State\nthe tie requirement explicitly in an interview.",
    "detailedAnswer": "Source question #23.\n\nAnswer:\nUse a window function partitioned by department and ordered by\nsalary descending. Choose ROW_NUMBER when exactly three rows per\ndepartment are required, or DENSE_RANK when ‘top three salaries’ means\nthe top three distinct salary levels and ties should be included. State\nthe tie requirement explicitly in an interview.\n\nExample:\nSELECT FROM ( SELECT e., DENSE_RANK() OVER ( PARTITION BY\ndepartment_id ORDER BY salary DESC ) rnk FROM employees e ) x WHERE rnk\n<= 3;\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How do you find rows present in one table but not another?",
    "slug": "how-do-you-find-rows-present-in-one-table-but-not-another",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "This is an anti-join problem. Common solutions are NOT EXISTS,\nLEFT JOIN with a NULL check, or EXCEPT where supported by the database.\nNOT EXISTS is often a clear and NULL-safe choice when comparing related\nkeys. When using LEFT JOIN, make sure the NULL test is on the joined\ntable’s key and that additional predicates do not accidentally turn the\nouter join into an inner join.",
    "detailedAnswer": "Source question #24.\n\nAnswer:\nThis is an anti-join problem. Common solutions are NOT EXISTS,\nLEFT JOIN with a NULL check, or EXCEPT where supported by the database.\nNOT EXISTS is often a clear and NULL-safe choice when comparing related\nkeys. When using LEFT JOIN, make sure the NULL test is on the joined\ntable’s key and that additional predicates do not accidentally turn the\nouter join into an inner join.\n\nExample:\nSELECT c.id FROM customers c WHERE NOT EXISTS ( SELECT 1 FROM\norders o WHERE o.customer_id = c.id ); This finds customers with no\norders.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How do you calculate a running total?",
    "slug": "how-do-you-calculate-a-running-total",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "A running\ntotal is a cumulative aggregate ordered by a business-defined sequence\nsuch as transaction date and ID. A window SUM with ORDER BY is the\nstandard approach in MySQL 8+. The ordering must be deterministic when\nmultiple rows share the same timestamp; otherwise the cumulative result\ncan be ambiguous.",
    "detailedAnswer": "Source question #25.\n\nAnswer:\nA running\ntotal is a cumulative aggregate ordered by a business-defined sequence\nsuch as transaction date and ID. A window SUM with ORDER BY is the\nstandard approach in MySQL 8+. The ordering must be deterministic when\nmultiple rows share the same timestamp; otherwise the cumulative result\ncan be ambiguous.\n\nExample:\nSELECT order_date, order_id, amount, SUM(amount) OVER (ORDER BY\norder_date, order_id) AS running_total FROM orders ORDER BY order_date,\norder_id;\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "RANK vs DENSE_RANK vs ROW_NUMBER?",
    "slug": "rank-vs-dense-rank-vs-row-number",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "ROW_NUMBER\nassigns a unique sequential number, even when values tie. RANK gives\ntied rows the same rank and leaves gaps after ties. DENSE_RANK also\ngives tied rows the same rank but does not leave gaps. Choose based on\nwhether ties should consume positions. This is a frequent interview\ndistinction for top-N queries.",
    "detailedAnswer": "Source question #26.\n\nAnswer:\nROW_NUMBER\nassigns a unique sequential number, even when values tie. RANK gives\ntied rows the same rank and leaves gaps after ties. DENSE_RANK also\ngives tied rows the same rank but does not leave gaps. Choose based on\nwhether ties should consume positions. This is a frequent interview\ndistinction for top-N queries.\n\nExample:\nFor salaries 100, 100, 90: ROW_NUMBER: 1,2,3 RANK: 1,1,3\nDENSE_RANK: 1,1,2.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "What is a window function?",
    "slug": "what-is-a-window-function",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A window function\ncalculates a value across a related set of rows while keeping the\nindividual rows in the result. Unlike GROUP BY, it does not collapse the\nrows into one row per group. Window functions support ranking, running\ntotals, moving calculations, and comparisons with group-level values.\nCommon functions include ROW_NUMBER, RANK, DENSE_RANK, SUM, AVG, LAG,\nand LEAD.",
    "detailedAnswer": "Source question #27.\n\nAnswer:\nA window function\ncalculates a value across a related set of rows while keeping the\nindividual rows in the result. Unlike GROUP BY, it does not collapse the\nrows into one row per group. Window functions support ranking, running\ntotals, moving calculations, and comparisons with group-level values.\nCommon functions include ROW_NUMBER, RANK, DENSE_RANK, SUM, AVG, LAG,\nand LEAD.\n\nExample:\nSELECT employee_id, department_id, salary, AVG(salary) OVER\n(PARTITION BY department_id) AS dept_avg FROM employees; Each employee\nremains visible while the department average is added.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Window Functions"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "What is a CTE?",
    "slug": "what-is-a-cte",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A Common Table Expression (CTE) is a\nnamed temporary result defined with WITH and used by a single SQL\nstatement. It improves readability by breaking a complex query into\nlogical stages and can support recursive queries. A CTE is a query\nconstruct, not automatically a permanent table. Its optimization and\nmaterialization behavior depends on the database and query, so it should\nnot be assumed to be faster than an equivalent query.",
    "detailedAnswer": "Source question #28.\n\nAnswer:\nA Common Table Expression (CTE) is a\nnamed temporary result defined with WITH and used by a single SQL\nstatement. It improves readability by breaking a complex query into\nlogical stages and can support recursive queries. A CTE is a query\nconstruct, not automatically a permanent table. Its optimization and\nmaterialization behavior depends on the database and query, so it should\nnot be assumed to be faster than an equivalent query.\n\nExample:\nWITH active_users AS ( SELECT id, name FROM users WHERE status\n= ‘ACTIVE’ ) SELECT * FROM active_users WHERE name LIKE ‘A%’;\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "CTE"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "CTE vs subquery?",
    "slug": "cte-vs-subquery",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "Both can express an intermediate\nquery. A subquery is nested directly inside another query, while a CTE\ngives the intermediate result a name and can make multi-stage logic\neasier to read. CTEs are especially useful when the same logical result\nis referenced or when recursion is required. Performance should be\nmeasured; choosing a CTE is primarily a clarity and maintainability\ndecision unless the optimizer treats the forms differently.",
    "detailedAnswer": "Source question #29.\n\nAnswer:\nBoth can express an intermediate\nquery. A subquery is nested directly inside another query, while a CTE\ngives the intermediate result a name and can make multi-stage logic\neasier to read. CTEs are especially useful when the same logical result\nis referenced or when recursion is required. Performance should be\nmeasured; choosing a CTE is primarily a clarity and maintainability\ndecision unless the optimizer treats the forms differently.\n\nExample:\nWITH dept_totals AS ( SELECT department_id, SUM(salary)\ntotal_salary FROM employees GROUP BY department_id ) SELECT * FROM\ndept_totals WHERE total_salary > 1000000;\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "CTE",
      "Query Optimization"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "When would you use a recursive CTE?",
    "slug": "when-would-you-use-a-recursive-cte",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Use a recursive\nCTE when data has a hierarchical or graph-like relationship and the\ndepth is not known in advance. It has an anchor query that selects\nstarting rows and a recursive query that repeatedly finds the next\nlevel. Typical cases include organization charts, category trees, folder\nstructures, and bill-of-materials relationships. The query must have a\ntermination condition to avoid infinite recursion.",
    "detailedAnswer": "Source question #30.\n\nAnswer:\nUse a recursive\nCTE when data has a hierarchical or graph-like relationship and the\ndepth is not known in advance. It has an anchor query that selects\nstarting rows and a recursive query that repeatedly finds the next\nlevel. Typical cases include organization charts, category trees, folder\nstructures, and bill-of-materials relationships. The query must have a\ntermination condition to avoid infinite recursion.\n\nExample:\nWITH RECURSIVE org AS ( SELECT id, manager_id, name, 0 AS level\nFROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id,\ne.manager_id, e.name, o.level + 1 FROM employees e JOIN org o ON\ne.manager_id = o.id ) SELECT * FROM org;\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "CTE"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "DELETE vs TRUNCATE vs DROP?",
    "slug": "delete-vs-truncate-vs-drop",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "DELETE removes selected\nrows and supports a WHERE clause. It is a DML operation and can be used\nwhen row-level selection is needed. TRUNCATE removes all rows from a\ntable as a DDL-style operation in MySQL and is generally intended for\nquickly emptying the table; its transactional/rollback behavior and\nidentity behavior depend on the database engine and version, so do not\ndescribe it as simply ‘DELETE but faster’ in every database. DROP\nremoves the table object itself, including its definition. All three\nshould be used carefully in production.",
    "detailedAnswer": "Source question #31.\n\nAnswer:\nDELETE removes selected\nrows and supports a WHERE clause. It is a DML operation and can be used\nwhen row-level selection is needed. TRUNCATE removes all rows from a\ntable as a DDL-style operation in MySQL and is generally intended for\nquickly emptying the table; its transactional/rollback behavior and\nidentity behavior depend on the database engine and version, so do not\ndescribe it as simply ‘DELETE but faster’ in every database. DROP\nremoves the table object itself, including its definition. All three\nshould be used carefully in production.\n\nExample:\nDELETE FROM logs WHERE created_at < ‘2025-01-01’; TRUNCATE\nTABLE staging_logs; DROP TABLE obsolete_logs;\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "DDL vs DML vs DCL vs TCL?",
    "slug": "ddl-vs-dml-vs-dcl-vs-tcl",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "DDL defines or changes\ndatabase objects, such as CREATE, ALTER, and DROP. DML changes table\ndata, commonly INSERT, UPDATE, and DELETE. DCL controls privileges, such\nas GRANT and REVOKE. TCL refers to transaction-control statements such\nas COMMIT and ROLLBACK, with exact supported commands depending on the\ndatabase. In interviews, emphasize that classification describes the\npurpose of the statement rather than its business meaning.",
    "detailedAnswer": "Source question #32.\n\nAnswer:\nDDL defines or changes\ndatabase objects, such as CREATE, ALTER, and DROP. DML changes table\ndata, commonly INSERT, UPDATE, and DELETE. DCL controls privileges, such\nas GRANT and REVOKE. TCL refers to transaction-control statements such\nas COMMIT and ROLLBACK, with exact supported commands depending on the\ndatabase. In interviews, emphasize that classification describes the\npurpose of the statement rather than its business meaning.\n\nExample:\nCREATE TABLE users (…) is DDL. INSERT INTO users … is DML.\nGRANT SELECT ON app_db.users TO ‘reporter’ is DCL. COMMIT is transaction\ncontrol.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "What is normalization?",
    "slug": "what-is-normalization",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Normalization is the process\nof structuring relational data to reduce unnecessary redundancy and\nprevent update, insert, and delete anomalies. It usually involves\ndecomposing tables according to functional dependencies while preserving\nrequired relationships. Normalization improves consistency, but\nexcessive decomposition can increase join complexity, so practical\ndesigns balance normalization with performance and workload\nrequirements.",
    "detailedAnswer": "Source question #33.\n\nAnswer:\nNormalization is the process\nof structuring relational data to reduce unnecessary redundancy and\nprevent update, insert, and delete anomalies. It usually involves\ndecomposing tables according to functional dependencies while preserving\nrequired relationships. Normalization improves consistency, but\nexcessive decomposition can increase join complexity, so practical\ndesigns balance normalization with performance and workload\nrequirements.\n\nExample:\nInstead of storing customer address repeatedly on every order,\nkeep customer information in customers and reference it from orders.\nThis prevents inconsistent copies of the same customer data.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Normalization"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "Explain 1NF, 2NF and 3NF.",
    "slug": "explain-1nf-2nf-and-3nf",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "1NF requires atomic\nvalues and no repeating groups in the relational model. 2NF builds on\n1NF and requires every non-key attribute to depend on the whole\ncandidate key, so it mainly matters when a key is composite. 3NF further\nremoves transitive dependencies: non-key attributes should not depend on\nanother non-key attribute. The goal is to reduce redundancy and\nanomalies, not to blindly split every table.",
    "detailedAnswer": "Source question #34.\n\nAnswer:\n1NF requires atomic\nvalues and no repeating groups in the relational model. 2NF builds on\n1NF and requires every non-key attribute to depend on the whole\ncandidate key, so it mainly matters when a key is composite. 3NF further\nremoves transitive dependencies: non-key attributes should not depend on\nanother non-key attribute. The goal is to reduce redundancy and\nanomalies, not to blindly split every table.\n\nExample:\nIf Enrollment(student_id, course_id, student_name, course_name)\nhas a composite key, student_name depends only on student_id and\ncourse_name only on course_id, violating 2NF. Split student and course\ndetails into their own tables.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "When would you denormalize?",
    "slug": "when-would-you-denormalize",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Denormalization\nintentionally introduces controlled redundancy to improve read\nperformance, simplify frequently executed queries, or support reporting\nand analytical workloads. It should be based on measured bottlenecks\nrather than guesswork because duplicated data increases storage, write\ncomplexity, and consistency risk. Common techniques include summary\ntables, cached aggregates, or storing a frequently needed derived value\nwith a defined update strategy.",
    "detailedAnswer": "Source question #35.\n\nAnswer:\nDenormalization\nintentionally introduces controlled redundancy to improve read\nperformance, simplify frequently executed queries, or support reporting\nand analytical workloads. It should be based on measured bottlenecks\nrather than guesswork because duplicated data increases storage, write\ncomplexity, and consistency risk. Common techniques include summary\ntables, cached aggregates, or storing a frequently needed derived value\nwith a defined update strategy.\n\nExample:\nAn order-reporting workload repeatedly joins many tables to\ncalculate daily totals. A maintained daily_sales_summary table may\nreduce expensive repeated aggregation.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "What is an index?",
    "slug": "what-is-an-index",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "An index is an auxiliary data\nstructure that helps the database locate rows without scanning the\nentire table. Indexes can greatly improve selective lookups, joins,\nordering, and grouping when the indexed columns match the query pattern.\nThey consume storage and must be maintained on writes, so adding indexes\nindiscriminately can hurt INSERT, UPDATE, and DELETE performance.",
    "detailedAnswer": "Source question #36.\n\nAnswer:\nAn index is an auxiliary data\nstructure that helps the database locate rows without scanning the\nentire table. Indexes can greatly improve selective lookups, joins,\nordering, and grouping when the indexed columns match the query pattern.\nThey consume storage and must be maintained on writes, so adding indexes\nindiscriminately can hurt INSERT, UPDATE, and DELETE performance.\n\nExample:\nCREATE INDEX idx_orders_customer_date ON orders(customer_id,\norder_date); A query filtering by customer_id and ordering/filtering by\ndate can benefit from this index.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "Clustered vs secondary index in InnoDB?",
    "slug": "clustered-vs-secondary-index-in-innodb",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "In InnoDB,\nthe primary key is the clustered index: the table’s rows are organized\naccording to the primary-key B-tree. Secondary indexes contain their\nindexed columns plus the primary-key value used to locate the full row.\nConsequently, a long primary key increases the size of every secondary\nindex. If a query can be satisfied entirely from a secondary index, it\nmay avoid an additional lookup to the clustered record.",
    "detailedAnswer": "Source question #37.\n\nAnswer:\nIn InnoDB,\nthe primary key is the clustered index: the table’s rows are organized\naccording to the primary-key B-tree. Secondary indexes contain their\nindexed columns plus the primary-key value used to locate the full row.\nConsequently, a long primary key increases the size of every secondary\nindex. If a query can be satisfied entirely from a secondary index, it\nmay avoid an additional lookup to the clustered record.\n\nExample:\nIf orders has PRIMARY KEY(order_id) and INDEX(customer_id), the\nsecondary index stores customer_id with order_id as the row locator. A\nlookup by customer_id can then use order_id to reach the clustered row\nwhen needed.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "What is a composite index?",
    "slug": "what-is-a-composite-index",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "A composite index\ncontains multiple columns in a defined order. It is useful when queries\ncommonly filter, join, or sort by that combination. The order matters\nbecause B-tree indexes are organized from the first indexed column\nonward. A composite index can sometimes satisfy several query predicates\nand may also act as a covering index if it contains all columns needed\nby the query.",
    "detailedAnswer": "Source question #38.\n\nAnswer:\nA composite index\ncontains multiple columns in a defined order. It is useful when queries\ncommonly filter, join, or sort by that combination. The order matters\nbecause B-tree indexes are organized from the first indexed column\nonward. A composite index can sometimes satisfy several query predicates\nand may also act as a covering index if it contains all columns needed\nby the query.\n\nExample:\nCREATE INDEX idx_orders_customer_status ON orders(customer_id,\nstatus); This can support queries that start with customer_id and then\nconstrain status.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "How does column order matter in a composite index?",
    "slug": "how-does-column-order-matter-in-a-composite-index",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "Column order determines which leftmost search patterns the B-tree can\nefficiently use. An index on (customer_id, status, created_at) is\nnaturally useful for queries beginning with customer_id, and often\ncustomer_id plus status. A query filtering only status generally cannot\nuse the index as effectively for direct lookup because the first indexed\ncolumn is not constrained. Selectivity, common predicates, sorting, and\nrange conditions all influence the best order.",
    "detailedAnswer": "Source question #39.\n\nAnswer:\nColumn order determines which leftmost search patterns the B-tree can\nefficiently use. An index on (customer_id, status, created_at) is\nnaturally useful for queries beginning with customer_id, and often\ncustomer_id plus status. A query filtering only status generally cannot\nuse the index as effectively for direct lookup because the first indexed\ncolumn is not constrained. Selectivity, common predicates, sorting, and\nrange conditions all influence the best order.\n\nExample:\nIndex (customer_id, status) is well suited to WHERE customer_id\n= 10 AND status = ‘PAID’. It is not equivalent to an index on (status,\ncustomer_id) for all query patterns.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "Why can an index make writes slower?",
    "slug": "why-can-an-index-make-writes-slower",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Every index is\nanother structure that must be maintained when indexed data changes.\nINSERT may add entries; DELETE removes them; UPDATE can require old\nindex entries to be changed or relocated. Index pages may also need\nsplitting and extra I/O. Therefore, indexes trade write cost and storage\nfor faster reads. The goal is to maintain useful indexes rather than\nindexing every column.",
    "detailedAnswer": "Source question #40.\n\nAnswer:\nEvery index is\nanother structure that must be maintained when indexed data changes.\nINSERT may add entries; DELETE removes them; UPDATE can require old\nindex entries to be changed or relocated. Index pages may also need\nsplitting and extra I/O. Therefore, indexes trade write cost and storage\nfor faster reads. The goal is to maintain useful indexes rather than\nindexing every column.\n\nExample:\nA table with eight unnecessary indexes can make a high-volume\nINSERT workload significantly more expensive because each insert must\nupdate those index structures.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "Why might MySQL ignore an index?",
    "slug": "why-might-mysql-ignore-an-index",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "The optimizer\nchooses the access path it estimates will have the lowest cost. It may\nprefer a table scan when a predicate matches a large percentage of rows,\nwhen an index is poorly selective, when statistics are inaccurate, or\nwhen the query applies an expression/function that prevents efficient\nindex use. Data type mismatches, leading wildcards, implicit\nconversions, and unsuitable composite-index order can also contribute.\nUse EXPLAIN and current statistics rather than assuming the index must\nbe used.",
    "detailedAnswer": "Source question #41.\n\nAnswer:\nThe optimizer\nchooses the access path it estimates will have the lowest cost. It may\nprefer a table scan when a predicate matches a large percentage of rows,\nwhen an index is poorly selective, when statistics are inaccurate, or\nwhen the query applies an expression/function that prevents efficient\nindex use. Data type mismatches, leading wildcards, implicit\nconversions, and unsuitable composite-index order can also contribute.\nUse EXPLAIN and current statistics rather than assuming the index must\nbe used.\n\nExample:\nWHERE LOWER(email) = ‘a@x.com’ may not use a normal index on\nemail efficiently. A suitable generated/functional indexing strategy,\nwhere supported, can address the expression.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "What is EXPLAIN used for?",
    "slug": "what-is-explain-used-for",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "EXPLAIN shows how MySQL\nplans to execute a query, including access type, possible and chosen\nindexes, estimated rows, join order, and other optimizer information. It\nis a primary diagnostic tool for slow queries. The estimates are not the\nsame as actual runtime behavior, so EXPLAIN ANALYZE can be useful where\nsupported to compare estimates with observed execution. Look for\nunnecessary full scans, poor join strategies, large row estimates, and\nmissing or ineffective indexes.",
    "detailedAnswer": "Source question #42.\n\nAnswer:\nEXPLAIN shows how MySQL\nplans to execute a query, including access type, possible and chosen\nindexes, estimated rows, join order, and other optimizer information. It\nis a primary diagnostic tool for slow queries. The estimates are not the\nsame as actual runtime behavior, so EXPLAIN ANALYZE can be useful where\nsupported to compare estimates with observed execution. Look for\nunnecessary full scans, poor join strategies, large row estimates, and\nmissing or ineffective indexes.\n\nExample:\nEXPLAIN SELECT * FROM orders WHERE customer_id = 42; If the\nplan shows an appropriate index and a small estimated row count, the\nlookup is likely efficient; if it scans millions of rows, investigate\nthe predicate, index, and statistics.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "How would you troubleshoot a slow query?",
    "slug": "how-would-you-troubleshoot-a-slow-query",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Start by\nreproducing and measuring the problem rather than immediately adding an\nindex. Inspect EXPLAIN/EXPLAIN ANALYZE, row counts, predicates, joins,\nsorting, grouping, and whether the query scans far more rows than it\nreturns. Check indexes and statistics, data growth, lock waits, CPU/I/O\npressure, and application behavior such as repeated queries. Then make\none targeted change at a time and compare latency and resource usage.\nFor production systems, consider query frequency and impact, not just\none execution.",
    "detailedAnswer": "Source question #43.\n\nAnswer:\nStart by\nreproducing and measuring the problem rather than immediately adding an\nindex. Inspect EXPLAIN/EXPLAIN ANALYZE, row counts, predicates, joins,\nsorting, grouping, and whether the query scans far more rows than it\nreturns. Check indexes and statistics, data growth, lock waits, CPU/I/O\npressure, and application behavior such as repeated queries. Then make\none targeted change at a time and compare latency and resource usage.\nFor production systems, consider query frequency and impact, not just\none execution.\n\nExample:\nA report query joins orders and customers and sorts millions of\nrows. EXPLAIN may reveal a full scan plus filesort; a better predicate,\ncomposite index, pre-aggregation, or pagination may be more appropriate\ndepending on the workload.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Query Optimization"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "What is a covering index?",
    "slug": "what-is-a-covering-index",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A covering index contains\nall columns required by a query, so the database can obtain the needed\nresult from the index without fetching the full table row. This can\nreduce I/O, especially for large tables. Whether a query is actually\ncovered depends on the selected columns and the optimizer’s chosen\naccess path. Covering indexes increase index size, so they should be\njustified by important query patterns.",
    "detailedAnswer": "Source question #44.\n\nAnswer:\nA covering index contains\nall columns required by a query, so the database can obtain the needed\nresult from the index without fetching the full table row. This can\nreduce I/O, especially for large tables. Whether a query is actually\ncovered depends on the selected columns and the optimizer’s chosen\naccess path. Covering indexes increase index size, so they should be\njustified by important query patterns.\n\nExample:\nCREATE INDEX idx_orders_customer_date_amount ON\norders(customer_id, order_date, amount); A query selecting customer_id,\norder_date, amount with matching predicates may be satisfied entirely\nfrom the index.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Indexes"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "What is a transaction?",
    "slug": "what-is-a-transaction",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A transaction is a logical\nunit of database work that should be completed according to the\ndatabase’s transactional guarantees. It typically contains one or more\nstatements and ends with COMMIT or ROLLBACK. Transactions are important\nwhen several changes must remain consistent as a unit, such as\ntransferring money by debiting one account and crediting another.",
    "detailedAnswer": "Source question #45.\n\nAnswer:\nA transaction is a logical\nunit of database work that should be completed according to the\ndatabase’s transactional guarantees. It typically contains one or more\nstatements and ends with COMMIT or ROLLBACK. Transactions are important\nwhen several changes must remain consistent as a unit, such as\ntransferring money by debiting one account and crediting another.\n\nExample:\nSTART TRANSACTION; UPDATE accounts SET balance = balance - 100\nWHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT; If a required step fails, the application can roll back the\ntransaction.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Transactions"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "Explain ACID.",
    "slug": "explain-acid",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "ACID describes key transaction\nproperties. Atomicity means a transaction’s changes are treated as a\nunit. Consistency means committed work preserves defined database\nconstraints and invariants. Isolation controls how concurrent\ntransactions interact and what intermediate states they can observe.\nDurability means committed changes survive failures according to the\ndatabase’s durability mechanisms. The exact behavior depends on the\nstorage engine, isolation level, configuration, and failure model.",
    "detailedAnswer": "Source question #46.\n\nAnswer:\nACID describes key transaction\nproperties. Atomicity means a transaction’s changes are treated as a\nunit. Consistency means committed work preserves defined database\nconstraints and invariants. Isolation controls how concurrent\ntransactions interact and what intermediate states they can observe.\nDurability means committed changes survive failures according to the\ndatabase’s durability mechanisms. The exact behavior depends on the\nstorage engine, isolation level, configuration, and failure model.\n\nExample:\nIn a bank transfer, atomicity prevents only the debit from\nbeing committed if the credit fails; durability means a successfully\ncommitted transfer is expected to survive a server restart.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-indexing-performance-optimization"
  },
  {
    "question": "What are transaction isolation levels?",
    "slug": "what-are-transaction-isolation-levels",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "Isolation\nlevels define how much one transaction can observe or be affected by\nconcurrent transactions. The commonly discussed levels are READ\nUNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE. Higher\nisolation generally provides stronger consistency but can increase\nlocking or concurrency costs. MySQL InnoDB commonly uses REPEATABLE READ\nby default, but interview answers should distinguish the SQL standard\nconcepts from engine-specific implementation details.",
    "detailedAnswer": "Source question #47.\n\nAnswer:\nIsolation\nlevels define how much one transaction can observe or be affected by\nconcurrent transactions. The commonly discussed levels are READ\nUNCOMMITTED, READ COMMITTED, REPEATABLE READ, and SERIALIZABLE. Higher\nisolation generally provides stronger consistency but can increase\nlocking or concurrency costs. MySQL InnoDB commonly uses REPEATABLE READ\nby default, but interview answers should distinguish the SQL standard\nconcepts from engine-specific implementation details.\n\nExample:\nAt READ UNCOMMITTED, one transaction may see another\ntransaction’s uncommitted change. At SERIALIZABLE, concurrent access is\nconstrained to provide the strongest standard isolation semantics.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Transactions"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "What is a dirty read?",
    "slug": "what-is-a-dirty-read",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "A dirty read occurs when one\ntransaction reads data written by another transaction before that other\ntransaction commits. If the writer later rolls back, the reader has\nobserved a value that was never committed. Dirty reads are possible at\nREAD UNCOMMITTED and are prevented by stronger isolation levels.",
    "detailedAnswer": "Source question #48.\n\nAnswer:\nA dirty read occurs when one\ntransaction reads data written by another transaction before that other\ntransaction commits. If the writer later rolls back, the reader has\nobserved a value that was never committed. Dirty reads are possible at\nREAD UNCOMMITTED and are prevented by stronger isolation levels.\n\nExample:\nTransaction A updates balance from 100 to 0 but has not\ncommitted. Transaction B reads 0. If A rolls back, B read a dirty value.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "What is a non-repeatable read?",
    "slug": "what-is-a-non-repeatable-read",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "A non-repeatable\nread occurs when a transaction reads the same existing row twice and\ngets different committed values because another transaction updated and\ncommitted that row between the reads. The issue concerns changes to an\nexisting row, unlike a phantom read, which concerns rows appearing or\ndisappearing from a range result.",
    "detailedAnswer": "Source question #49.\n\nAnswer:\nA non-repeatable\nread occurs when a transaction reads the same existing row twice and\ngets different committed values because another transaction updated and\ncommitted that row between the reads. The issue concerns changes to an\nexisting row, unlike a phantom read, which concerns rows appearing or\ndisappearing from a range result.\n\nExample:\nTransaction A reads salary = 50,000. Transaction B changes it\nto 60,000 and commits. A reads the same employee again and gets 60,000.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "What is a phantom read?",
    "slug": "what-is-a-phantom-read",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "A phantom read occurs when\nthe same range query is executed twice within a transaction and the\nsecond execution sees a different set of rows because another\ntransaction inserted, deleted, or changed rows into the relevant range\nand committed. It differs from a non-repeatable read, which is typically\nabout the value of an already-existing row. Actual behavior depends on\nthe database’s isolation and concurrency implementation.",
    "detailedAnswer": "Source question #50.\n\nAnswer:\nA phantom read occurs when\nthe same range query is executed twice within a transaction and the\nsecond execution sees a different set of rows because another\ntransaction inserted, deleted, or changed rows into the relevant range\nand committed. It differs from a non-repeatable read, which is typically\nabout the value of an already-existing row. Actual behavior depends on\nthe database’s isolation and concurrency implementation.\n\nExample:\nA transaction queries all orders WHERE amount > 100 and gets 20\nrows. Another transaction inserts a qualifying order and commits. A\nlater range query may see 21 rows under an isolation level that permits\nthat change to become visible.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "What is MVCC?",
    "slug": "what-is-mvcc",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "MVCC, or Multi-Version Concurrency\nControl, allows readers and writers to operate with reduced blocking by\nmaintaining multiple logical versions of rows. A transaction reads a\nversion appropriate to its isolation and snapshot while another\ntransaction may create a newer version. InnoDB uses MVCC together with\nlocking. MVCC does not mean ‘no locks’; writes and certain locking reads\ncan still require locks.",
    "detailedAnswer": "Source question #51.\n\nAnswer:\nMVCC, or Multi-Version Concurrency\nControl, allows readers and writers to operate with reduced blocking by\nmaintaining multiple logical versions of rows. A transaction reads a\nversion appropriate to its isolation and snapshot while another\ntransaction may create a newer version. InnoDB uses MVCC together with\nlocking. MVCC does not mean ‘no locks’; writes and certain locking reads\ncan still require locks.\n\nExample:\nA reporting transaction can read a consistent snapshot while\nanother transaction updates an order. The reader can continue using the\nappropriate older version rather than simply waiting for the writer to\nfinish.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "What is a deadlock?",
    "slug": "what-is-a-deadlock",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A deadlock occurs when\ntransactions wait for each other in a cycle and none can proceed. For\nexample, transaction A holds a lock needed by B while B holds a lock\nneeded by A. Databases such as InnoDB detect deadlocks and normally roll\nback one transaction so the other can continue. Applications should be\nprepared to retry safe transactions after a deadlock error.",
    "detailedAnswer": "Source question #52.\n\nAnswer:\nA deadlock occurs when\ntransactions wait for each other in a cycle and none can proceed. For\nexample, transaction A holds a lock needed by B while B holds a lock\nneeded by A. Databases such as InnoDB detect deadlocks and normally roll\nback one transaction so the other can continue. Applications should be\nprepared to retry safe transactions after a deadlock error.\n\nExample:\nT1 locks account 1 then requests account 2. T2 locks account 2\nthen requests account 1. Neither can proceed until the database detects\nthe cycle and aborts one transaction.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "How would you investigate a production deadlock?",
    "slug": "how-would-you-investigate-a-production-deadlock",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Collect the database deadlock diagnostic information, identify the\ntransactions, SQL statements, indexes, and locks involved, and\nreconstruct the wait-for cycle. Then examine application transaction\nboundaries, query order, isolation level, indexes, and whether\ntransactions stay open longer than necessary. Fix the underlying\nordering or access pattern and add safe retry handling. Avoid simply\nincreasing timeouts because that does not remove the cycle.",
    "detailedAnswer": "Source question #53.\n\nAnswer:\nCollect the database deadlock diagnostic information, identify the\ntransactions, SQL statements, indexes, and locks involved, and\nreconstruct the wait-for cycle. Then examine application transaction\nboundaries, query order, isolation level, indexes, and whether\ntransactions stay open longer than necessary. Fix the underlying\nordering or access pattern and add safe retry handling. Avoid simply\nincreasing timeouts because that does not remove the cycle.\n\nExample:\nIf diagnostics show one code path updates orders then inventory\nwhile another updates inventory then orders, standardizing both paths to\nlock orders before inventory can remove the cycle.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "How can consistent lock ordering reduce deadlocks?",
    "slug": "how-can-consistent-lock-ordering-reduce-deadlocks",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "If all transactions acquire the same set of resources in the same\ndeterministic order, a circular wait becomes much harder or impossible\nto form. For example, always lock the lower account ID before the higher\naccount ID. This is a design discipline: transaction code should follow\nthe same ordering rule everywhere that the same resources can be\nupdated.",
    "detailedAnswer": "Source question #54.\n\nAnswer:\nIf all transactions acquire the same set of resources in the same\ndeterministic order, a circular wait becomes much harder or impossible\nto form. For example, always lock the lower account ID before the higher\naccount ID. This is a design discipline: transaction code should follow\nthe same ordering rule everywhere that the same resources can be\nupdated.\n\nExample:\nInstead of T1 locking account 10 then 20 while T2 locks 20 then\n10, both transactions first lock the smaller ID, 10, and then 20.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "What is SELECT … FOR UPDATE?",
    "slug": "what-is-select-for-update",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "SELECT … FOR UPDATE is\na locking read used inside a transaction to lock qualifying rows so\nconcurrent transactions cannot modify them in conflicting ways until the\ntransaction ends, subject to the storage engine and isolation semantics.\nIt is useful when an application reads a value and then intends to\nupdate it and needs the read-to-update sequence protected. The exact\nlocked range can depend on the query, indexes, isolation level, and\nInnoDB locking rules.",
    "detailedAnswer": "Source question #55.\n\nAnswer:\nSELECT … FOR UPDATE is\na locking read used inside a transaction to lock qualifying rows so\nconcurrent transactions cannot modify them in conflicting ways until the\ntransaction ends, subject to the storage engine and isolation semantics.\nIt is useful when an application reads a value and then intends to\nupdate it and needs the read-to-update sequence protected. The exact\nlocked range can depend on the query, indexes, isolation level, and\nInnoDB locking rules.\n\nExample:\nSTART TRANSACTION; SELECT balance FROM accounts WHERE id = 10\nFOR UPDATE; UPDATE accounts SET balance = balance - 50 WHERE id = 10;\nCOMMIT;\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "sql-queries-problem-solving"
  },
  {
    "question": "What is optimistic locking?",
    "slug": "what-is-optimistic-locking",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Optimistic locking\nassumes conflicts are relatively uncommon. A row carries a version\nnumber or comparable token. The application reads the version and\nincludes it in the UPDATE condition; if no row is updated, another\ntransaction changed the record first and the application detects a\nconflict. It avoids holding database locks throughout the business\noperation and is useful for many web workloads.",
    "detailedAnswer": "Source question #56.\n\nAnswer:\nOptimistic locking\nassumes conflicts are relatively uncommon. A row carries a version\nnumber or comparable token. The application reads the version and\nincludes it in the UPDATE condition; if no row is updated, another\ntransaction changed the record first and the application detects a\nconflict. It avoids holding database locks throughout the business\noperation and is useful for many web workloads.\n\nExample:\nUPDATE products SET price = 120, version = version + 1 WHERE id\n= 5 AND version = 7; If affected rows = 0, the application knows version\n7 is no longer current.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Locking"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "What is pessimistic locking?",
    "slug": "what-is-pessimistic-locking",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Pessimistic locking\nassumes conflicts are likely and protects data by acquiring locks before\nmaking the change. SELECT … FOR UPDATE is a common database technique.\nIt can provide strong coordination but reduces concurrency when locks\nare held too long and can contribute to deadlocks. Use it when the\nbusiness operation truly needs serialized access to the selected data.",
    "detailedAnswer": "Source question #57.\n\nAnswer:\nPessimistic locking\nassumes conflicts are likely and protects data by acquiring locks before\nmaking the change. SELECT … FOR UPDATE is a common database technique.\nIt can provide strong coordination but reduces concurrency when locks\nare held too long and can contribute to deadlocks. Use it when the\nbusiness operation truly needs serialized access to the selected data.\n\nExample:\nAn inventory service starts a transaction, locks the product\nrow, checks stock, decrements it, and commits. Concurrent transactions\nmust respect the lock rather than independently consuming the same\nstock.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Locking"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  },
  {
    "question": "What is replication?",
    "slug": "what-is-replication",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Replication copies database\nchanges from a source to one or more replicas. It can improve read\nscalability, provide a standby for availability, and separate some\nworkloads. Replication is not automatically synchronous, so replicas may\ntemporarily lag. Applications must understand which reads require the\nfreshest data and how failover is handled.",
    "detailedAnswer": "Source question #58.\n\nAnswer:\nReplication copies database\nchanges from a source to one or more replicas. It can improve read\nscalability, provide a standby for availability, and separate some\nworkloads. Replication is not automatically synchronous, so replicas may\ntemporarily lag. Applications must understand which reads require the\nfreshest data and how failover is handled.\n\nExample:\nAn application writes orders to the primary and sends analytics\nSELECT queries to read replicas. If a user immediately reads their newly\ncreated order, the system may need a primary read or another consistency\nstrategy.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Replication"
    ],
    "subcategorySlug": "mysql-replication-scaling-reliability"
  },
  {
    "question": "What is replication lag?",
    "slug": "what-is-replication-lag",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Replication lag is the\ndelay between a change being committed on the source and becoming\nvisible or fully applied on a replica. Causes can include heavy write\nvolume, slow replica I/O, long-running transactions, network delays, or\ninsufficient replica resources. Lag can produce stale reads and\ncomplicate failover. Monitoring should track replication health and\nworkload, not only a single lag number.",
    "detailedAnswer": "Source question #59.\n\nAnswer:\nReplication lag is the\ndelay between a change being committed on the source and becoming\nvisible or fully applied on a replica. Causes can include heavy write\nvolume, slow replica I/O, long-running transactions, network delays, or\ninsufficient replica resources. Lag can produce stale reads and\ncomplicate failover. Monitoring should track replication health and\nworkload, not only a single lag number.\n\nExample:\nA payment is committed on the primary at 10:00:00, but a\nreplica applies the change at 10:00:03. A read routed to that replica\nduring the interval may not see the payment.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Replication"
    ],
    "subcategorySlug": "mysql-replication-scaling-reliability"
  },
  {
    "question": "Why is replication not a backup?",
    "slug": "why-is-replication-not-a-backup",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "Replication\nprimarily creates additional copies of current database state; it does\nnot provide protection against every logical error. If an application\naccidentally deletes millions of rows and that delete is replicated,\nreplicas can receive the same bad change. Backups provide historical\nrecovery points and should be protected, tested, and retained according\nto recovery objectives.",
    "detailedAnswer": "Source question #60.\n\nAnswer:\nReplication\nprimarily creates additional copies of current database state; it does\nnot provide protection against every logical error. If an application\naccidentally deletes millions of rows and that delete is replicated,\nreplicas can receive the same bad change. Backups provide historical\nrecovery points and should be protected, tested, and retained according\nto recovery objectives.\n\nExample:\nAn accidental DELETE runs on the primary and is replicated. A\nreplica does not automatically restore the deleted rows. A point-in-time\nbackup/recovery strategy is needed.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Replication"
    ],
    "subcategorySlug": "mysql-replication-scaling-reliability"
  },
  {
    "question": "What is partitioning?",
    "slug": "what-is-partitioning",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "Partitioning divides one\nlogical table into multiple physical partitions according to a\npartitioning rule such as RANGE, LIST, HASH, or KEY. It can help manage\nvery large tables, make lifecycle operations easier, and enable\npartition pruning for suitable queries. Partitioning is not a substitute\nfor good indexing, and it does not automatically make every query\nfaster. The partition key and workload must match the intended access\npattern.",
    "detailedAnswer": "Source question #61.\n\nAnswer:\nPartitioning divides one\nlogical table into multiple physical partitions according to a\npartitioning rule such as RANGE, LIST, HASH, or KEY. It can help manage\nvery large tables, make lifecycle operations easier, and enable\npartition pruning for suitable queries. Partitioning is not a substitute\nfor good indexing, and it does not automatically make every query\nfaster. The partition key and workload must match the intended access\npattern.\n\nExample:\nA time-series events table can be RANGE partitioned by month so\nold monthly partitions can be managed independently. Queries restricted\nto a month may benefit from partition pruning.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Partitioning"
    ],
    "subcategorySlug": "mysql-replication-scaling-reliability"
  },
  {
    "question": "OFFSET pagination vs keyset pagination?",
    "slug": "offset-pagination-vs-keyset-pagination",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "OFFSET\npagination asks the database to skip a number of ordered rows and return\nthe next page. Keyset pagination uses the last seen ordering key as the\nstarting point, such as WHERE id > :last_id ORDER BY id LIMIT 50. OFFSET\nis simple and useful for shallow pages; keyset is generally more\nefficient and stable for deep pagination over large datasets, provided\nan appropriate ordering index exists.",
    "detailedAnswer": "Source question #62.\n\nAnswer:\nOFFSET\npagination asks the database to skip a number of ordered rows and return\nthe next page. Keyset pagination uses the last seen ordering key as the\nstarting point, such as WHERE id > :last_id ORDER BY id LIMIT 50. OFFSET\nis simple and useful for shallow pages; keyset is generally more\nefficient and stable for deep pagination over large datasets, provided\nan appropriate ordering index exists.\n\nExample:\nOFFSET: SELECT * FROM orders ORDER BY id LIMIT 50 OFFSET\n500000; Keyset: SELECT * FROM orders WHERE id > 500000 ORDER BY id LIMIT\n50;\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "Why can large OFFSET values be slow?",
    "slug": "why-can-large-offset-values-be-slow",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "To return a\ndeep page, the database may still need to locate and process the\npreceding rows before discarding them. As OFFSET grows, more work can be\nrequired even though the client receives the same small page size.\nKeyset pagination avoids repeatedly skipping old rows by using the last\nretrieved key as a boundary.",
    "detailedAnswer": "Source question #63.\n\nAnswer:\nTo return a\ndeep page, the database may still need to locate and process the\npreceding rows before discarding them. As OFFSET grows, more work can be\nrequired even though the client receives the same small page size.\nKeyset pagination avoids repeatedly skipping old rows by using the last\nretrieved key as a boundary.\n\nExample:\nA request for page 10,000 with 50 rows can require processing a\nvery large prefix of the ordered result, whereas keyset pagination can\nseek from the last known ID.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "What is SQL injection?",
    "slug": "what-is-sql-injection",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "SQL injection is an attack\nin which untrusted input changes the structure or meaning of a SQL\nstatement. It commonly occurs when application code concatenates user\ninput directly into SQL text. Consequences can include unauthorized data\naccess, modification, or destructive operations. The primary defense is\nparameterized queries/prepared statements, combined with least-privilege\ndatabase accounts and appropriate validation.",
    "detailedAnswer": "Source question #64.\n\nAnswer:\nSQL injection is an attack\nin which untrusted input changes the structure or meaning of a SQL\nstatement. It commonly occurs when application code concatenates user\ninput directly into SQL text. Consequences can include unauthorized data\naccess, modification, or destructive operations. The primary defense is\nparameterized queries/prepared statements, combined with least-privilege\ndatabase accounts and appropriate validation.\n\nExample:\nUnsafe: “SELECT * FROM users WHERE name = ’” + input + “’”; If\ninput contains SQL syntax, it can alter the query. A prepared statement\nkeeps the input as data rather than SQL syntax.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "SQL Security"
    ],
    "subcategorySlug": "sql-security-access-control"
  },
  {
    "question": "How do parameterized queries prevent SQL injection?",
    "slug": "how-do-parameterized-queries-prevent-sql-injection",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "Parameterized queries separate SQL code from user-supplied values. The\nSQL statement is parsed with placeholders, and the parameter values are\ntransmitted separately, so characters inside a value are not interpreted\nas part of the SQL structure. Parameters should be used for values;\ndynamic identifiers such as column names need controlled allow-listing\nbecause they generally cannot be safely substituted as ordinary value\nparameters.",
    "detailedAnswer": "Source question #65.\n\nAnswer:\nParameterized queries separate SQL code from user-supplied values. The\nSQL statement is parsed with placeholders, and the parameter values are\ntransmitted separately, so characters inside a value are not interpreted\nas part of the SQL structure. Parameters should be used for values;\ndynamic identifiers such as column names need controlled allow-listing\nbecause they generally cannot be safely substituted as ordinary value\nparameters.\n\nExample:\nSELECT * FROM users WHERE email = ?; The application binds the\nuser’s email as the parameter instead of concatenating it into the SQL\nstring.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "SQL Security"
    ],
    "subcategorySlug": "sql-security-access-control"
  },
  {
    "question": "What is a view?",
    "slug": "what-is-a-view",
    "shortDescription": "Beginner / Intermediate • Conceptual",
    "sampleAnswer": "A view is a named query that\npresents data as a virtual table. It can simplify complex queries,\nprovide a stable interface over underlying tables, and help expose only\nselected columns or rows. A normal view does not necessarily store its\nresult as independent data; its behavior and updatability depend on the\ndatabase and view definition. Views should not be treated as an\nautomatic performance optimization.",
    "detailedAnswer": "Source question #66.\n\nAnswer:\nA view is a named query that\npresents data as a virtual table. It can simplify complex queries,\nprovide a stable interface over underlying tables, and help expose only\nselected columns or rows. A normal view does not necessarily store its\nresult as independent data; its behavior and updatability depend on the\ndatabase and view definition. Views should not be treated as an\nautomatic performance optimization.\n\nExample:\nCREATE VIEW active_customers AS SELECT id, name FROM customers\nWHERE status = ‘ACTIVE’; Applications can query active_customers instead\nof repeating the filter.\n\nInterview Tip:\nAvoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat Interviewer Is Testing:\nWhether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?\n\nCommon Mistakes:\nConfusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.\n\nDifficulty:\nBeginner / Intermediate\n\nInterview Focus:\nConceptual\n\nBest Answer Strategy:\nGive a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "explanation": "Avoid a one-line definition. Explain what the database\nguarantees and when you would use the feature.\n\nWhat the interviewer is testing: Whether you understand the underlying\ndatabase concept rather than memorizing terminology.\n\nBest answer strategy: Give a precise definition first, explain how it works,\nmention the main use case and limitation, then give a compact example.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Confusing a database product with the SQL language, or\nstating a rule without mentioning important engine-specific behavior.",
    "followUpQuestions": "What is the main use case? What is the\ntrade-off? How does MySQL/InnoDB implement or behave in this case?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "When would you use a stored procedure?",
    "slug": "when-would-you-use-a-stored-procedure",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "A stored\nprocedure is database-side programmable logic that can accept parameters\nand execute multiple SQL statements. It can be useful for centralized\ndatabase operations, administrative workflows, or logic that benefits\nfrom running close to the data. Trade-offs include deployment\ncomplexity, database-specific code, testing/version-control concerns,\nand coupling application behavior to the database. The choice should\nreflect the team’s architecture rather than a blanket rule that\nprocedures are good or bad.",
    "detailedAnswer": "Source question #67.\n\nAnswer:\nA stored\nprocedure is database-side programmable logic that can accept parameters\nand execute multiple SQL statements. It can be useful for centralized\ndatabase operations, administrative workflows, or logic that benefits\nfrom running close to the data. Trade-offs include deployment\ncomplexity, database-specific code, testing/version-control concerns,\nand coupling application behavior to the database. The choice should\nreflect the team’s architecture rather than a blanket rule that\nprocedures are good or bad.\n\nExample:\nA controlled monthly settlement operation involving several\nrelated database statements can be implemented as a procedure when\ncentral database execution and permission boundaries are valuable.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Stored Procedures"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "What is a trigger and what trade-offs does it introduce?",
    "slug": "what-is-a-trigger-and-what-trade-offs-does-it-introduce",
    "shortDescription": "Intermediate • Conceptual / SQL",
    "sampleAnswer": "A trigger is database logic that automatically executes in\nresponse to events such as INSERT, UPDATE, or DELETE. Triggers can\nenforce certain auditing or derived-data rules close to the data, but\nthey also create implicit side effects: application developers may not\nrealize extra work occurs, debugging becomes harder, and bulk operations\ncan become expensive. Triggers should be used selectively and documented\nclearly.",
    "detailedAnswer": "Source question #68.\n\nAnswer:\nA trigger is database logic that automatically executes in\nresponse to events such as INSERT, UPDATE, or DELETE. Triggers can\nenforce certain auditing or derived-data rules close to the data, but\nthey also create implicit side effects: application developers may not\nrealize extra work occurs, debugging becomes harder, and bulk operations\ncan become expensive. Triggers should be used selectively and documented\nclearly.\n\nExample:\nAn AFTER INSERT trigger can write an audit record whenever an\nemployee record changes. The application does not need a separate audit\nINSERT, but the hidden side effect must be understood by maintainers.\n\nInterview Tip:\nState the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat Interviewer Is Testing:\nWhether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?\n\nCommon Mistakes:\nGiving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.\n\nDifficulty:\nIntermediate\n\nInterview Focus:\nConceptual / SQL\n\nBest Answer Strategy:\nStart with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "explanation": "State the semantic difference first, then show SQL and\ncall out NULL, tie, ordering, or performance edge cases when relevant.\n\nWhat the interviewer is testing: Whether you can distinguish similar SQL\nconcepts and apply them correctly.\n\nBest answer strategy: Start with the distinction or rule, explain the\nexecution/behavior, then use a small SQL example and mention the\nimportant edge case.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Giving syntactically valid SQL that has incorrect\nsemantics for NULLs, ties, duplicates, or join filtering.",
    "followUpQuestions": "What happens with NULLs or duplicates? What\nindex would you add? How would you verify the query plan?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Triggers"
    ],
    "subcategorySlug": "database-design-constraints"
  },
  {
    "question": "How would you safely add a NOT NULL column to a very large\ntable?",
    "slug": "how-would-you-safely-add-a-not-null-column-to-a-very-large-table",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "On a large production table, avoid assuming that ALTER\nTABLE will be instantaneous or harmless. First determine the MySQL\nversion, storage-engine behavior, table size, workload, and whether the\ndesired ALTER can use an online/in-place operation. A common safe\nrollout is: add the column in a compatible form, deploy application code\nthat can handle it, backfill existing rows in small batches, monitor\nlocks/replication/load, then enforce NOT NULL after all rows are valid.\nThe exact DDL should be tested on a production-like copy before\nexecution.",
    "detailedAnswer": "Source question #69.\n\nAnswer:\nOn a large production table, avoid assuming that ALTER\nTABLE will be instantaneous or harmless. First determine the MySQL\nversion, storage-engine behavior, table size, workload, and whether the\ndesired ALTER can use an online/in-place operation. A common safe\nrollout is: add the column in a compatible form, deploy application code\nthat can handle it, backfill existing rows in small batches, monitor\nlocks/replication/load, then enforce NOT NULL after all rows are valid.\nThe exact DDL should be tested on a production-like copy before\nexecution.\n\nExample:\nFor a new status column, add it in a way compatible with the\nrollout, deploy code that writes valid values, backfill rows in batches\nsuch as 10,000 at a time, verify no NULLs remain, and then apply the\nfinal constraint during an approved change window.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you archive hundreds of millions of old rows?",
    "slug": "how-would-you-archive-hundreds-of-millions-of-old-rows",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Treat archival as a workload and lifecycle problem, not as one\ngiant DELETE. Define the retention rule, archive destination, legal\nrequirements, indexes, foreign-key dependencies, and recovery plan. Move\ndata in controlled batches, verify each batch, throttle the operation,\nmonitor replication and transaction-log growth, and remove archived rows\nin manageable chunks. Partitioning by time can make future retention\noperations much easier when the schema and workload support it.",
    "detailedAnswer": "Source question #70.\n\nAnswer:\nTreat archival as a workload and lifecycle problem, not as one\ngiant DELETE. Define the retention rule, archive destination, legal\nrequirements, indexes, foreign-key dependencies, and recovery plan. Move\ndata in controlled batches, verify each batch, throttle the operation,\nmonitor replication and transaction-log growth, and remove archived rows\nin manageable chunks. Partitioning by time can make future retention\noperations much easier when the schema and workload support it.\n\nExample:\nFor events older than seven years, copy a bounded date range to\nan archive store, validate counts/checksums as appropriate, then delete\nsmall batches from the hot table. Repeat while monitoring database and\nreplica health.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you diagnose database CPU suddenly reaching 100%?",
    "slug": "how-would-you-diagnose-database-cpu-suddenly-reaching-100",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "First determine whether the CPU is database process CPU, host\nCPU, or another process. Identify queries that became expensive or much\nmore frequent, using query monitoring, process lists, performance\ninstrumentation, and slow-query information where available. Check for\nplan changes, missing/stale statistics, data growth, inefficient joins,\nscans, sorting, lock-related workload, or a traffic spike. Mitigate\ncarefully—such as reducing traffic or disabling a harmful query—then\naddress the root cause and verify recovery.",
    "detailedAnswer": "Source question #71.\n\nAnswer:\nFirst determine whether the CPU is database process CPU, host\nCPU, or another process. Identify queries that became expensive or much\nmore frequent, using query monitoring, process lists, performance\ninstrumentation, and slow-query information where available. Check for\nplan changes, missing/stale statistics, data growth, inefficient joins,\nscans, sorting, lock-related workload, or a traffic spike. Mitigate\ncarefully—such as reducing traffic or disabling a harmful query—then\naddress the root cause and verify recovery.\n\nExample:\nIf CPU jumps immediately after a deployment, compare the new\nquery patterns with the previous version. EXPLAIN may reveal a plan that\nchanged from an indexed lookup to a large scan.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you diagnose connection-pool exhaustion when\ndatabase CPU is low?",
    "slug": "how-would-you-diagnose-connection-pool-exhaustion-when-database-cpu-is-low",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Low CPU does not mean the database is\nhealthy from the application’s perspective. Inspect pool metrics such as\nactive, idle, pending, and acquisition wait time; database connection\ncounts; long-running or idle-in-transaction sessions; network latency;\nlock waits; and application code that fails to return connections. Also\ncheck whether pool size is inappropriate for the database’s capacity.\nIncreasing the pool blindly can make overload worse.",
    "detailedAnswer": "Source question #72.\n\nAnswer:\nLow CPU does not mean the database is\nhealthy from the application’s perspective. Inspect pool metrics such as\nactive, idle, pending, and acquisition wait time; database connection\ncounts; long-running or idle-in-transaction sessions; network latency;\nlock waits; and application code that fails to return connections. Also\ncheck whether pool size is inappropriate for the database’s capacity.\nIncreasing the pool blindly can make overload worse.\n\nExample:\nIf the application pool has 100 connections all waiting while\nthe database is at low CPU, inspect blocked transactions or network\nwaits. A transaction holding a lock can make many requests wait without\nconsuming much CPU.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you handle a query that is fast for 1,000 rows\nbut slow for 100 million?",
    "slug": "how-would-you-handle-a-query-that-is-fast-for-1-000-rows-but-slow-for-100-million",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Small-data performance can hide\nscalability problems. Test with production-like cardinality and inspect\nEXPLAIN/EXPLAIN ANALYZE. Check whether predicates are selective, whether\nindexes match the access path, whether joins multiply rows, and whether\nsorting or grouping requires large temporary work. Consider keyset\npagination, pre-aggregation, partition pruning, archival, or query\nredesign where appropriate. The goal is to reduce the amount of data\nprocessed, not merely increase hardware.",
    "detailedAnswer": "Source question #73.\n\nAnswer:\nSmall-data performance can hide\nscalability problems. Test with production-like cardinality and inspect\nEXPLAIN/EXPLAIN ANALYZE. Check whether predicates are selective, whether\nindexes match the access path, whether joins multiply rows, and whether\nsorting or grouping requires large temporary work. Consider keyset\npagination, pre-aggregation, partition pruning, archival, or query\nredesign where appropriate. The goal is to reduce the amount of data\nprocessed, not merely increase hardware.\n\nExample:\nA query filtering by customer_id is fast on 1,000 rows but slow\nafter growth because the index is missing or poorly ordered. Adding a\nsuitable composite index may reduce millions of examined rows to a small\nrange.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Query Optimization"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you investigate replication lag after a large\nDELETE?",
    "slug": "how-would-you-investigate-replication-lag-after-a-large-delete",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "A large DELETE can generate substantial redo/binlog work\nand cause the replica to spend significant time applying changes. Check\nreplication status and lag metrics, source transaction volume, replica\nSQL/applier activity, I/O, long-running transactions, and whether the\nreplica is constrained by CPU or disk. Determine whether the delete was\none huge transaction or smaller batches. For future cleanup, batch\ndeletes and schedule them to control write volume, while considering\npartitioning for time-based retention.",
    "detailedAnswer": "Source question #74.\n\nAnswer:\nA large DELETE can generate substantial redo/binlog work\nand cause the replica to spend significant time applying changes. Check\nreplication status and lag metrics, source transaction volume, replica\nSQL/applier activity, I/O, long-running transactions, and whether the\nreplica is constrained by CPU or disk. Determine whether the delete was\none huge transaction or smaller batches. For future cleanup, batch\ndeletes and schedule them to control write volume, while considering\npartitioning for time-based retention.\n\nExample:\nDeleting 200 million rows in one transaction can create a large\nreplication backlog. Smaller batches with pauses and monitoring can\nreduce the instantaneous pressure on the replica.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview",
      "Replication"
    ],
    "subcategorySlug": "mysql-replication-scaling-reliability"
  },
  {
    "question": "How would you design a database for attendance tracking?",
    "slug": "how-would-you-design-a-database-for-attendance-tracking",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "Start from the business rules: employees/students, dates or\nshifts, attendance events, statuses, corrections, and audit\nrequirements. A normalized design could contain person, schedule/shift,\nand attendance tables. Use a stable primary key, foreign keys,\ntimestamps, and a uniqueness rule appropriate to the business—for\nexample one attendance record per person per shift, if that is truly the\nrule. Index common queries such as person plus date and date plus\norganization. Keep corrections auditable when attendance changes are\nsensitive.",
    "detailedAnswer": "Source question #75.\n\nAnswer:\nStart from the business rules: employees/students, dates or\nshifts, attendance events, statuses, corrections, and audit\nrequirements. A normalized design could contain person, schedule/shift,\nand attendance tables. Use a stable primary key, foreign keys,\ntimestamps, and a uniqueness rule appropriate to the business—for\nexample one attendance record per person per shift, if that is truly the\nrule. Index common queries such as person plus date and date plus\norganization. Keep corrections auditable when attendance changes are\nsensitive.\n\nExample:\nemployees(id, name) shifts(id, start_time, end_time)\nattendance(id, employee_id, shift_id, attendance_date, status, check_in,\ncheck_out) A UNIQUE constraint on (employee_id, shift_id,\nattendance_date) can prevent accidental duplicate records if the\nbusiness rule requires it.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you model users, roles and permissions?",
    "slug": "how-would-you-model-users-roles-and-permissions",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "A\ncommon relational model separates users, roles, and permissions and\nconnects them with many-to-many junction tables. For example: users,\nroles, permissions, user_roles, and role_permissions. This avoids\nrepeating permission lists and allows a role to be assigned to many\nusers. If direct user-specific permissions are required, a\nuser_permissions table can be added. The design should also address\nunique identifiers, foreign keys, revocation, auditing, and least\nprivilege.",
    "detailedAnswer": "Source question #76.\n\nAnswer:\nA\ncommon relational model separates users, roles, and permissions and\nconnects them with many-to-many junction tables. For example: users,\nroles, permissions, user_roles, and role_permissions. This avoids\nrepeating permission lists and allows a role to be assigned to many\nusers. If direct user-specific permissions are required, a\nuser_permissions table can be added. The design should also address\nunique identifiers, foreign keys, revocation, auditing, and least\nprivilege.\n\nExample:\nusers(id, …) roles(id, name) permissions(id, name)\nuser_roles(user_id, role_id) role_permissions(role_id, permission_id) A\nuser assigned to the ADMIN role receives the permissions associated with\nthat role.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "mysql-dbms-fundamentals"
  },
  {
    "question": "How would you prevent lost updates on an account balance?",
    "slug": "how-would-you-prevent-lost-updates-on-an-account-balance",
    "shortDescription": "Intermediate / Advanced • Problem Solving /\nDesign / Scenario",
    "sampleAnswer": "A lost update occurs when concurrent transactions read the same\nold value and then overwrite each other’s changes. For financial\nbalances, prefer an atomic database operation or explicit transactional\nlocking rather than read-modify-write in application memory. Techniques\ninclude UPDATE … SET balance = balance + :amount, SELECT … FOR UPDATE\ninside a transaction, or optimistic version checking. Also enforce\nconstraints such as preventing invalid balances where required and make\nthe operation idempotent when requests can be retried.",
    "detailedAnswer": "Source question #77.\n\nAnswer:\nA lost update occurs when concurrent transactions read the same\nold value and then overwrite each other’s changes. For financial\nbalances, prefer an atomic database operation or explicit transactional\nlocking rather than read-modify-write in application memory. Techniques\ninclude UPDATE … SET balance = balance + :amount, SELECT … FOR UPDATE\ninside a transaction, or optimistic version checking. Also enforce\nconstraints such as preventing invalid balances where required and make\nthe operation idempotent when requests can be retried.\n\nExample:\nInstead of reading balance=100 and later writing 150, use:\nUPDATE accounts SET balance = balance + 50 WHERE id = 1; For more\ncomplex validation, lock the row in a transaction, validate, update, and\ncommit.\n\nInterview Tip:\nDo not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat Interviewer Is Testing:\nWhether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nKey Points to Remember:\n- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.\n\nCommon Follow-up Questions:\nWhat happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?\n\nCommon Mistakes:\nUsing a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.\n\nDifficulty:\nIntermediate / Advanced\n\nInterview Focus:\nProblem Solving /\nDesign / Scenario\n\nBest Answer Strategy:\nState the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.\n\n\n============================================================ SOURCE\nBASIS ============================================================ 1.\nMAQ Software interview experience — GeeksforGeeks: second-highest\nsalary, normalization, ACID and SQL/DBMS. 2. Modak Analytics interview\nexperience — GeeksforGeeks: nth-highest salary, CTE vs temporary table,\nWHERE vs HAVING, joins and window functions. 3. Loyalty Juggernaut\ninterview experience — GeeksforGeeks: highest salary, GROUP BY, INNER vs\nLEFT JOIN and normalization. 4. Database Administrator interview\nquestions — GeeksforGeeks: subqueries, AVG salary, second-highest salary\nand HAVING. 5. Current SQL/MySQL interview-question references —\nGeeksforGeeks.",
    "explanation": "Do not jump directly to code. Clarify assumptions,\npropose the safest approach, and discuss failure modes and monitoring.\n\nWhat the interviewer is testing: Whether you can reason about correctness,\nscalability, concurrency, and operational risk in a real database\nsystem.\n\nBest answer strategy: State the goal, explain the\nreasoning, show a safe SQL or design approach, then discuss performance,\nconcurrency, edge cases, and operational trade-offs.\n\n\n============================================================ SOURCE\nBASIS ============================================================ 1.\nMAQ Software interview experience — GeeksforGeeks: second-highest\nsalary, normalization, ACID and SQL/DBMS. 2. Modak Analytics interview\nexperience — GeeksforGeeks: nth-highest salary, CTE vs temporary table,\nWHERE vs HAVING, joins and window functions. 3. Loyalty Juggernaut\ninterview experience — GeeksforGeeks: highest salary, GROUP BY, INNER vs\nLEFT JOIN and normalization. 4. Database Administrator interview\nquestions — GeeksforGeeks: subqueries, AVG salary, second-highest salary\nand HAVING. 5. Current SQL/MySQL interview-question references —\nGeeksforGeeks.",
    "keyPoints": "- Answer the exact question before adding\nadvanced details. - Explain the behavior, not only the syntax. - Mention\nthe most relevant edge case or trade-off.",
    "commonMistakes": "Using a single giant transaction, adding indexes\nblindly, ignoring concurrency/replication, or proposing a change without\na rollback/monitoring plan.",
    "followUpQuestions": "What happens at large scale? How do you\nhandle concurrency/failure? How would you monitor and roll out the\nchange safely?",
    "tags": [
      "MySQL",
      "SQL",
      "DBMS",
      "Database",
      "Database Interview"
    ],
    "subcategorySlug": "transactions-concurrency-locking"
  }
];

async function main() {
  for (const item of questions) {
    const category = await prisma.category.upsert({
      where: { slug: "mysql-sql-dbms" },
      update: { name: "MySQL + SQL + DBMS" },
      create: {
      group: "Technology", name: "MySQL + SQL + DBMS", slug: "mysql-sql-dbms" },
    });

    const subcategory = await prisma.subcategory.upsert({
      where: {
        categoryId_slug: {
          categoryId: category.id,
          slug: item.subcategorySlug,
        },
      },
      update: {},
      create: {
        name: item.subcategorySlug
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        slug: item.subcategorySlug,
        categoryId: category.id,
      },
    });

    await prisma.interviewQuestion.upsert({
      where: { slug: item.slug },
      update: {
        question: item.question,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription: item.shortDescription,
        explanation: item.explanation,
        sampleAnswer: item.sampleAnswer,
        detailedAnswer: item.detailedAnswer,
        keyPoints: item.keyPoints,
        commonMistakes: item.commonMistakes,
        followUpQuestions: item.followUpQuestions,
        tags: item.tags,
        isPublished: true,
      },
      create: {
        question: item.question,
        slug: item.slug,
        categoryId: category.id,
        subcategoryId: subcategory.id,
        experienceLevel: ExperienceLevel.MID_LEVEL,
        difficulty: Difficulty.MEDIUM,
        interviewType: InterviewType.TECHNICAL,
        shortDescription: item.shortDescription,
        explanation: item.explanation,
        sampleAnswer: item.sampleAnswer,
        detailedAnswer: item.detailedAnswer,
        keyPoints: item.keyPoints,
        commonMistakes: item.commonMistakes,
        followUpQuestions: item.followUpQuestions,
        tags: item.tags,
        isPublished: true,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("MySQL + SQL + DBMS interview-question seed completed successfully.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
