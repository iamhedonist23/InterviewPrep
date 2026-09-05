// ---- 200+ MySQL Interview Questions (Fresher to Advanced) ----
import { Difficulty, ExperienceLevel, InterviewType, PrismaClient } from "@prisma/client";

// ---- Categories ----
export const categories = [
  ["MySQL", "MySQL"]
] as const;

// ---- Topics ----
export const topics = [
  // ==================== BASICS (20) ====================
  ["MySQL", "What is MySQL and what are its main features?", "mysql-overview", "Define MySQL and list its key features.", "MySQL is an open‑source relational database management system (RDBMS) known for its speed, reliability, and ease of use. Key features include ACID compliance, support for multiple storage engines (InnoDB, MyISAM), foreign key constraints, replication, full‑text search, JSON support, and a rich set of SQL functions."],
  ["MySQL", "What is the difference between MySQL and PostgreSQL?", "mysql-vs-postgresql", "Compare the two popular RDBMS.", "MySQL is lighter and faster for read‑heavy OLTP workloads, with simpler configuration. PostgreSQL is more feature‑rich (advanced data types, MVCC, custom extensions) and better for complex analytical queries and data integrity. PostgreSQL is fully ACID with stricter compliance."],
  ["MySQL", "What are the default ports for MySQL?", "mysql-default-port", "Specify the default port.", "The default port for MySQL is 3306."],
  ["MySQL", "How do you connect to a MySQL database from the command line?", "mysql-connect-cli", "Explain the mysql command.", "Use `mysql -h host -P port -u username -p database_name`. You will be prompted for the password. For local connections, `mysql -u root -p`."],
  ["MySQL", "What is a storage engine in MySQL? Name some common ones.", "storage-engine", "Define and list engines.", "A storage engine handles the underlying data storage, indexing, and locking. Common engines: InnoDB (default, ACID, transactions, foreign keys), MyISAM (no transactions, full‑text, table‑level locking), MEMORY (in‑memory, fast), and ARCHIVE (compressed, append‑only)."],
  ["MySQL", "What is the difference between InnoDB and MyISAM?", "innodb-vs-myisam", "Compare the two main engines.", "InnoDB supports transactions, ACID, row‑level locking, foreign keys, and crash recovery. MyISAM does not support transactions or foreign keys, uses table‑level locking, and is faster for read‑only or low‑write workloads. InnoDB is recommended for most applications."],
  ["MySQL", "What is a primary key? What are its properties?", "primary-key", "Define and explain.", "A primary key is a unique identifier for each row in a table. It must contain unique, non‑NULL values. A table can have only one primary key, which may be a single column or a composite of multiple columns."],
  ["MySQL", "What is a foreign key and why is it important?", "foreign-key", "Define referential integrity.", "A foreign key is a column (or set of columns) that references the primary key of another table. It enforces referential integrity by ensuring that values in the foreign key column match existing values in the referenced table."],
  ["MySQL", "What is a unique key and how is it different from a primary key?", "unique-vs-primary", "Distinguish the two constraints.", "A unique key ensures that all values in a column (or combination) are distinct. Unlike a primary key, a unique key allows NULL values (one NULL per column) and a table can have multiple unique keys."],
  ["MySQL", "What is a NULL value in MySQL?", "null-value", "Explain the meaning of NULL.", "NULL represents an unknown or missing value. It is not equal to any value, including itself. Operations with NULL often return NULL, and you must use `IS NULL` or `IS NOT NULL` to test for it."],
  ["MySQL", "What is the `SELECT` statement? Write a basic query.", "select-statement", "Demonstrate basic usage.", "`SELECT` retrieves data from one or more tables. Example: `SELECT column1, column2 FROM table WHERE condition ORDER BY column1;`"],
  ["MySQL", "What is the difference between `DELETE` and `TRUNCATE`?", "delete-vs-truncate", "Compare the two removal commands.", "`DELETE` removes rows one by one (DML) and can be rolled back; it does not reset auto‑increment. `TRUNCATE` drops and recreates the table (DDL), is faster, cannot be rolled back (unless in a transaction), and resets auto‑increment."],
  ["MySQL", "What is the `DISTINCT` keyword used for?", "distinct-clause", "Explain its purpose.", "`DISTINCT` removes duplicate rows from the result set. It can be used on a single column or a combination of columns."],
  ["MySQL", "What is the `LIMIT` clause?", "limit-clause", "Explain pagination.", "`LIMIT` restricts the number of rows returned. Example: `SELECT * FROM table LIMIT 10 OFFSET 20;` (skips 20 rows, returns next 10)."],
  ["MySQL", "What is a comment in SQL? How do you write one in MySQL?", "sql-comments", "Show comment syntax.", "Single‑line comments: `-- comment` or `# comment`. Multi‑line: `/* comment */`."],
  ["MySQL", "What is a `SHOW` command in MySQL? Give examples.", "show-commands", "List useful SHOW statements.", "`SHOW DATABASES;`, `SHOW TABLES;`, `SHOW COLUMNS FROM table;`, `SHOW INDEX FROM table;`, `SHOW CREATE TABLE table;`, `SHOW STATUS;`."],
  ["MySQL", "What is the `DESCRIBE` command?", "describe-command", "Explain its usage.", "`DESCRIBE table_name;` (or `DESC`) displays the structure of a table, including column names, data types, and nullability."],
  ["MySQL", "What is a database and a schema in MySQL?", "db-vs-schema", "Clarify the terms.", "In MySQL, a database and a schema are synonymous – they are logical containers for tables, views, stored procedures, etc. You can use `CREATE DATABASE` or `CREATE SCHEMA` interchangeably."],
  ["MySQL", "What is the `USE` statement?", "use-statement", "Explain switching databases.", "`USE database_name;` selects the default database for subsequent queries."],
  ["MySQL", "What is the difference between a table and a view?", "table-vs-view", "Compare the two objects.", "A table stores physical data. A view is a virtual table defined by a query; it does not store data but presents a filtered or computed representation of underlying tables."],

  // ==================== DATA TYPES (15) ====================
  ["MySQL", "What are the common numeric data types in MySQL?", "mysql-numeric-types", "List and describe.", "Integer: `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `BIGINT`. Fixed‑point: `DECIMAL`/`NUMERIC`. Floating‑point: `FLOAT`, `DOUBLE`. `BIT` for bit values."],
  ["MySQL", "What is the difference between `CHAR` and `VARCHAR`?", "char-vs-varchar", "Compare fixed and variable length.", "`CHAR(n)` is fixed‑length (padded with spaces) and stores exactly n characters. `VARCHAR(n)` is variable‑length, uses 1 or 2 bytes for length prefix, and saves space for shorter strings. `VARCHAR` is generally preferred."],
  ["MySQL", "What is the `TEXT` data type? How does it differ from `VARCHAR`?", "text-vs-varchar", "Explain limitations.", "`TEXT` is a variable‑length string with a maximum size of 65,535 bytes (for `TEXT`), `MEDIUMTEXT` (16 MB), and `LONGTEXT` (4 GB). Unlike `VARCHAR`, `TEXT` columns cannot have a default value and are stored separately from the row, affecting performance."],
  ["MySQL", "What are the date and time data types?", "mysql-datetime-types", "List the types.", "`DATE` (YYYY‑MM‑DD), `TIME` (HH:MM:SS), `DATETIME` (YYYY‑MM‑DD HH:MM:SS), `TIMESTAMP` (YYYY‑MM‑DD HH:MM:SS, with timezone conversion), `YEAR`."],
  ["MySQL", "What is the difference between `DATETIME` and `TIMESTAMP`?", "datetime-vs-timestamp", "Compare the two.", "`TIMESTAMP` is affected by the server time zone and automatically converts to UTC for storage; it has a range from 1970 to 2038. `DATETIME` is time‑zone‑independent and has a wider range (1000‑9999)."],
  ["MySQL", "What is the `JSON` data type in MySQL?", "json-type", "Explain JSON storage.", "MySQL supports native JSON data type (introduced in 5.7). It allows efficient storage and querying of JSON documents, with functions like `JSON_EXTRACT`, `JSON_SET`, and indexing of generated columns."],
  ["MySQL", "What is the `ENUM` data type?", "enum-type", "Define and give usage.", "`ENUM` is a string object that can have only one value from a predefined list of allowed values. It is stored as an integer internally, saving space. Example: `ENUM('small','medium','large')`."],
  ["MySQL", "What is the `SET` data type?", "set-type", "Explain multiple-choice string.", "`SET` is a string object that can have zero or more values from a predefined set. It is stored as a bitmask, allowing up to 64 members. Example: `SET('a','b','c')`."],
  ["MySQL", "What is the `BOOLEAN` data type in MySQL?", "boolean-type", "Explain its implementation.", "`BOOLEAN` is a synonym for `TINYINT(1)`. A value of 0 is considered `FALSE`, non‑zero is `TRUE`."],
  ["MySQL", "What is the `BLOB` data type?", "blob-type", "Define binary storage.", "`BLOB` (Binary Large Object) stores binary data (e.g., images, files). Variants: `TINYBLOB`, `BLOB`, `MEDIUMBLOB`, `LONGBLOB`."],
  ["MySQL", "What is the `DECIMAL` data type and when would you use it?", "decimal-type", "Explain exact numeric storage.", "`DECIMAL(M,D)` stores exact numeric values with fixed precision. It is used for financial calculations where exact decimal representation is required (e.g., `DECIMAL(10,2)` for currency)."],
  ["MySQL", "What is the difference between `FLOAT` and `DOUBLE`?", "float-vs-double", "Compare precision and storage.", "`FLOAT` is a single‑precision (approx. 7 decimal digits) floating‑point number. `DOUBLE` is double‑precision (approx. 15 digits). Both are approximate and should not be used for monetary values."],
  ["MySQL", "What is the `BINARY` and `VARBINARY` type?", "binary-types", "Explain fixed and variable binary.", "`BINARY` and `VARBINARY` are similar to `CHAR` and `VARCHAR` but store byte strings rather than character strings. They are used for binary data that should not have character set conversion."],
  ["MySQL", "What is the `GEOMETRY` data type?", "geometry-type", "Explain spatial data.", "`GEOMETRY` is a base type for spatial data (points, lines, polygons). MySQL supports `POINT`, `LINESTRING`, `POLYGON`, and their collections. These types are used with GIS functions."],
  ["MySQL", "What is the `INET6` data type?", "inet6-type", "Explain IPv6 storage.", "`INET6` is a binary representation of IPv4 or IPv6 addresses. It provides efficient storage and allows functions like `INET6_ATON` and `INET6_NTOA`."],

  // ==================== DDL & DML (15) ====================
  ["MySQL", "What is the syntax to create a table? Provide an example.", "create-table", "Show basic table creation.", "`CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`"],
  ["MySQL", "What is the `ALTER TABLE` command used for?", "alter-table", "Explain schema modifications.", "`ALTER TABLE` changes the structure of an existing table: add/drop columns, change data type, add/drop constraints, rename table, etc. Example: `ALTER TABLE users ADD COLUMN age INT;`"],
  ["MySQL", "How do you add a foreign key constraint using `ALTER TABLE`?", "add-foreign-key", "Provide syntax.", "`ALTER TABLE orders ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;`"],
  ["MySQL", "What is a `DROP TABLE` command and what does it do?", "drop-table", "Explain removal.", "`DROP TABLE table_name;` permanently removes the table and its data. It cannot be rolled back (unless in a transaction with `DROP TABLE` is transactional in some engines)."],
  ["MySQL", "What is the difference between `DROP TABLE` and `TRUNCATE TABLE`?", "drop-vs-truncate", "Compare the two.", "`DROP TABLE` removes the table definition and data. `TRUNCATE TABLE` removes all rows but retains the table structure; it is faster and resets auto‑increment."],
  ["MySQL", "What is an `INSERT` statement? Write an example.", "insert-statement", "Show insertion syntax.", "`INSERT INTO users (name, age) VALUES ('John', 25);` or `INSERT INTO users SET name='John', age=25;`"],
  ["MySQL", "What is `INSERT INTO ... SELECT`?", "insert-select", "Explain copying data.", "`INSERT INTO table2 (col1, col2) SELECT col1, col2 FROM table1 WHERE condition;` inserts the result of a query into another table."],
  ["MySQL", "How do you update data in MySQL?", "update-statement", "Provide syntax.", "`UPDATE users SET age = 26 WHERE id = 1;` Always use a `WHERE` clause to avoid updating all rows."],
  ["MySQL", "How do you delete data? Give an example.", "delete-statement", "Provide syntax.", "`DELETE FROM users WHERE id = 1;` Without `WHERE`, all rows are deleted (similar to `TRUNCATE` but slower and can be rolled back)."],
  ["MySQL", "What is the `REPLACE` command?", "replace", "Explain insert or replace.", "`REPLACE INTO table (col1, col2) VALUES (1, 'a');` If a row with the same primary key exists, it is deleted and a new row is inserted; otherwise, it inserts. It is a combination of `DELETE` + `INSERT`."],
  ["MySQL", "What is `ON DUPLICATE KEY UPDATE`?", "on-duplicate-key", "Explain upsert.", "`INSERT INTO users (id, name) VALUES (1, 'John') ON DUPLICATE KEY UPDATE name = VALUES(name);` If a row with the same primary key exists, it updates the name; otherwise inserts."],
  ["MySQL", "What is a `SELECT ... FOR UPDATE`?", "select-for-update", "Explain row locking.", "`SELECT ... FOR UPDATE` locks the selected rows for updates, preventing other transactions from modifying them until the current transaction commits. Used in transactions for pessimistic locking."],
  ["MySQL", "What is a `SELECT ... LOCK IN SHARE MODE`?", "lock-in-share-mode", "Explain shared lock.", "This places a shared lock on the selected rows, allowing other transactions to read them but not modify them until the lock is released."],
  ["MySQL", "What is the `UNION` operator?", "union", "Explain combining result sets.", "`UNION` combines the results of two or more `SELECT` statements and removes duplicate rows. `UNION ALL` does not remove duplicates and is faster."],
  ["MySQL", "What is a `JOIN`? Explain the different types.", "join-types", "List and describe.", "`INNER JOIN` returns rows with matching keys in both tables. `LEFT JOIN` (or `RIGHT JOIN`) returns all rows from one side and matching rows from the other; non‑matching rows are `NULL`. `CROSS JOIN` returns the Cartesian product."],

  // ==================== JOINS & SUBQUERIES (15) ====================
  ["MySQL", "What is an `INNER JOIN`? Provide an example.", "inner-join", "Show usage.", "`SELECT o.id, c.name FROM orders o INNER JOIN customers c ON o.customer_id = c.id;` returns orders with existing customers."],
  ["MySQL", "What is a `LEFT JOIN`? When would you use it?", "left-join", "Explain its purpose.", "`LEFT JOIN` returns all rows from the left table, with matching rows from the right table. If no match, right columns are `NULL`. Used when you need all records from the left table regardless of matches."],
  ["MySQL", "What is a `RIGHT JOIN`?", "right-join", "Explain.", "Similar to `LEFT JOIN` but preserves all rows from the right table. `RIGHT JOIN` is less commonly used; you can achieve the same with `LEFT JOIN` by swapping tables."],
  ["MySQL", "What is a `CROSS JOIN`?", "cross-join", "Define Cartesian product.", "`CROSS JOIN` returns the Cartesian product of two tables (every row from the first combined with every row from the second). It is rarely used without a `WHERE` condition."],
  ["MySQL", "What is a self‑join? Give an example.", "self-join", "Explain joining a table with itself.", "A self‑join joins a table to itself. Example: `SELECT e1.name AS employee, e2.name AS manager FROM employees e1 LEFT JOIN employees e2 ON e1.manager_id = e2.id;`"],
  ["MySQL", "What is a subquery? Write an example.", "subquery", "Define and demonstrate.", "A subquery is a query nested inside another query. Example: `SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`"],
  ["MySQL", "What is a correlated subquery?", "correlated-subquery", "Explain dependencies.", "A correlated subquery references columns from the outer query. It is executed once for each row processed by the outer query. Example: `SELECT name FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE department = e.department);`"],
  ["MySQL", "What are the different types of subqueries? (scalar, row, table)", "subquery-types", "Categorize subqueries.", "Scalar subqueries return a single value; row subqueries return a single row; table subqueries return a result set (used in `FROM` or `EXISTS`)."],
  ["MySQL", "What is the `EXISTS` operator?", "exists", "Explain existence test.", "`EXISTS` tests whether a subquery returns any rows. Example: `SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);`"],
  ["MySQL", "What is the `ANY` and `ALL` operators?", "any-all", "Explain comparisons with subqueries.", "`ANY` (or `SOME`) returns true if the condition holds for at least one value from the subquery. `ALL` returns true if the condition holds for all values. Example: `SELECT name FROM products WHERE price > ANY (SELECT price FROM products WHERE category = 'electronics');`"],
  ["MySQL", "What is a derived table (inline view)?", "derived-table", "Define and give example.", "A derived table is a subquery used in the `FROM` clause. It must have an alias. Example: `SELECT * FROM (SELECT id, name FROM users WHERE age > 18) AS adult_users;`"],
  ["MySQL", "What is the difference between `JOIN` and `UNION`?", "join-vs-union", "Compare the two.", "`JOIN` combines columns from different tables based on a relationship. `UNION` combines rows from two or more queries, stacking results vertically."],
  ["MySQL", "What is the `USING` clause in joins?", "using-clause", "Explain shorthand for equality join.", "`JOIN ... USING (column)` is equivalent to `ON left.column = right.column` and merges the common column into a single column. Example: `SELECT * FROM orders JOIN customers USING (customer_id);`"],
  ["MySQL", "What is a `NATURAL JOIN`?", "natural-join", "Explain automatic join.", "`NATURAL JOIN` automatically joins tables on columns with the same name. It is risky because it depends on column names and can lead to unintended results; avoid it in production."],
  ["MySQL", "How do you write a query to find employees with salary greater than their manager's salary?", "query-manager-salary", "Practical join/subquery.", "Using a self‑join: `SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary;`"],

  // ==================== FUNCTIONS (15) ====================
  ["MySQL", "What are aggregate functions? Name a few.", "aggregate-functions", "List common aggregates.", "`COUNT()`, `SUM()`, `AVG()`, `MAX()`, `MIN()`. They operate on a set of rows and return a single value."],
  ["MySQL", "What is the `GROUP BY` clause?", "group-by", "Explain grouping.", "`GROUP BY` groups rows that have the same values in specified columns, allowing aggregate functions to be applied per group. Example: `SELECT department, AVG(salary) FROM employees GROUP BY department;`"],
  ["MySQL", "What is the `HAVING` clause?", "having-clause", "Explain filtering groups.", "`HAVING` filters groups after `GROUP BY`, similar to `WHERE` but for aggregate conditions. Example: `SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 50000;`"],
  ["MySQL", "What is the difference between `WHERE` and `HAVING`?", "where-vs-having", "Compare the two.", "`WHERE` filters rows before grouping; `HAVING` filters groups after grouping. `HAVING` can use aggregate functions; `WHERE` cannot."],
  ["MySQL", "What are string functions in MySQL? Give examples.", "string-functions", "List common string functions.", "`CONCAT()`, `SUBSTRING()`, `LENGTH()`, `UPPER()`, `LOWER()`, `TRIM()`, `REPLACE()`, `INSTR()`, `LOCATE()`, `LEFT()`, `RIGHT()`, `LPAD()`, `RPAD()`."],
  ["MySQL", "What is the `DATE_FORMAT` function?", "date-format", "Explain date formatting.", "`DATE_FORMAT(date, format)` formats a date according to a format string. Example: `SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s');`"],
  ["MySQL", "What are date and time functions? Provide examples.", "date-time-functions", "List common ones.", "`NOW()`, `CURDATE()`, `CURTIME()`, `DATE_ADD()`, `DATE_SUB()`, `DATEDIFF()`, `DAY()`, `MONTH()`, `YEAR()`, `UNIX_TIMESTAMP()`, `FROM_UNIXTIME()`."],
  ["MySQL", "What is the `IF` function in MySQL?", "if-function", "Explain conditional logic.", "`IF(condition, true_value, false_value)` returns the true or false value. Example: `SELECT IF(salary > 50000, 'High', 'Low') FROM employees;`"],
  ["MySQL", "What is `CASE` statement? Provide an example.", "case-statement", "Explain conditional expressions.", "`CASE WHEN condition THEN result ... ELSE default END`. Example: `SELECT CASE WHEN age < 18 THEN 'Minor' WHEN age < 65 THEN 'Adult' ELSE 'Senior' END FROM people;`"],
  ["MySQL", "What is the `COALESCE` function?", "coalesce", "Define and give usage.", "`COALESCE(value1, value2, ...)` returns the first non‑NULL value. Useful for providing defaults: `SELECT COALESCE(phone, 'No phone') FROM contacts;`"],
  ["MySQL", "What is the `NULLIF` function?", "nullif", "Explain its purpose.", "`NULLIF(expr1, expr2)` returns NULL if expr1 equals expr2, otherwise returns expr1. Example: `SELECT NULLIF(score, 0) FROM tests;` (treats 0 as NULL)."],
  ["MySQL", "What are the mathematical functions? Give examples.", "math-functions", "List common ones.", "`ABS()`, `CEIL()`, `FLOOR()`, `ROUND()`, `POW()`, `SQRT()`, `MOD()`, `RAND()`."],
  ["MySQL", "What is the `CONCAT` function?", "concat", "Explain string concatenation.", "`CONCAT(str1, str2, ...)` concatenates strings. Example: `SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;`"],
  ["MySQL", "What is the `SUBSTRING` function?", "substring", "Explain extracting substrings.", "`SUBSTRING(str, start, length)` extracts a substring. Example: `SELECT SUBSTRING('Hello World', 1, 5);` returns 'Hello'."],
  ["MySQL", "What is the `FIND_IN_SET` function?", "find-in-set", "Explain searching in SET.", "`FIND_IN_SET(str, strlist)` returns the position of the string within a comma‑separated list. Example: `SELECT FIND_IN_SET('b', 'a,b,c');` returns 2."],

  // ==================== INDEXES & PERFORMANCE (15) ====================
  ["MySQL", "What is an index in MySQL? Why is it important?", "mysql-index", "Define and explain benefits.", "An index is a data structure (typically B‑tree) that improves the speed of data retrieval. It is crucial for performance but adds overhead on DML operations. Indexes can be created on one or multiple columns."],
  ["MySQL", "What are the different types of indexes in MySQL?", "index-types", "List the types.", "`PRIMARY KEY` (unique, clustered), `UNIQUE` (ensures uniqueness), `INDEX` (regular B‑tree), `FULLTEXT` (for full‑text search), `SPATIAL` (for GIS data)."],
  ["MySQL", "What is a B‑Tree index and how does it work?", "btree-index", "Explain the structure.", "A B‑Tree index organizes data in a balanced tree structure, allowing efficient searches, range queries, and sorting. InnoDB uses B‑tree for its primary key and secondary indexes."],
  ["MySQL", "What is a composite index (multi‑column index)?", "composite-index", "Define and explain order importance.", "A composite index is an index on multiple columns. The order of columns matters: queries that filter on the leftmost prefix can use the index. Example: `INDEX(last_name, first_name)` supports searches on `last_name` and both."],
  ["MySQL", "When would you use a `UNIQUE` index?", "unique-index", "Explain uniqueness constraint.", "A `UNIQUE` index ensures that no two rows have the same value in the indexed column(s). It also speeds up lookups. Use it for alternate keys (e.g., email)."],
  ["MySQL", "What is a `FULLTEXT` index?", "fulltext-index", "Explain full‑text search.", "`FULLTEXT` indexes are used with `MATCH() AGAINST()` for natural‑language searches on text columns. They are available for `MyISAM` and `InnoDB` (since 5.6)."],
  ["MySQL", "What is a `SPATIAL` index?", "spatial-index", "Explain GIS indexing.", "`SPATIAL` index is used on `GEOMETRY` columns for efficient spatial queries (e.g., `ST_Contains`, `ST_Distance`). Available for InnoDB (5.7+) and MyISAM."],
  ["MySQL", "What is the difference between `INDEX` and `PRIMARY KEY` in terms of clustering?", "index-vs-primary-clustering", "Explain clustering.", "In InnoDB, the primary key is a clustered index, meaning the table data is stored in the order of the primary key. A secondary index (regular index) stores the primary key value as a pointer, so it requires an extra lookup."],
  ["MySQL", "How do you check if an index is being used?", "check-index-usage", "Explain `EXPLAIN`.", "Use `EXPLAIN SELECT ...` to see the execution plan. Look for `type` (e.g., `ref`, `range`, `index`) and `key` to see which index is used. If `type` is `ALL` (full table scan), the index is not used."],
  ["MySQL", "What is the `EXPLAIN` command? How do you read its output?", "explain-command", "Explain query analysis.", "`EXPLAIN` shows how MySQL executes a query. Key columns: `id`, `select_type`, `table`, `type` (access method), `possible_keys`, `key`, `key_len`, `ref`, `rows` (estimate), `Extra` (e.g., `Using index` for covering index)."],
  ["MySQL", "What is a covering index?", "covering-index", "Define index‑only scans.", "A covering index contains all the columns needed for a query, so MySQL can return data directly from the index without accessing the table rows. It improves performance. In `EXPLAIN`, you see `Using index`."],
  ["MySQL", "How do you create and drop an index?", "create-drop-index", "Provide syntax.", "`CREATE INDEX index_name ON table (column);`; `DROP INDEX index_name ON table;`. For primary keys: `ALTER TABLE table ADD PRIMARY KEY (col);`"],
  ["MySQL", "What is a `HASH` index in MySQL? When is it used?", "hash-index", "Explain memory engine usage.", "`HASH` indexes are only used by the `MEMORY` engine. They are fast for equality comparisons but do not support range queries. InnoDB does not support `HASH`; it uses B‑tree."],
  ["MySQL", "What is the effect of too many indexes on DML operations?", "index-overhead", "Explain trade‑offs.", "Each index adds overhead on `INSERT`, `UPDATE`, and `DELETE` because the index must be updated. Too many indexes can slow down write performance and increase storage. It's a balance."],
  ["MySQL", "What is the `OPTIMIZE TABLE` command?", "optimize-table", "Explain table maintenance.", "`OPTIMIZE TABLE` reorganizes the physical storage of a table and its indexes to reclaim unused space and defragment. It may use table‑locking (InnoDB supports online DDL)."],

  // ==================== TRANSACTIONS & LOCKING (15) ====================
  ["MySQL", "What is a transaction in MySQL?", "mysql-transaction", "Define ACID properties.", "A transaction is a unit of work that is atomic (all or nothing), consistent, isolated, and durable. InnoDB supports transactions. `START TRANSACTION`, `COMMIT`, `ROLLBACK`."],
  ["MySQL", "What are the transaction isolation levels in MySQL?", "isolation-levels", "List and explain.", "`READ UNCOMMITTED` (dirty reads), `READ COMMITTED` (non‑repeatable reads allowed), `REPEATABLE READ` (default, phantom reads possible), `SERIALIZABLE` (highest, prevents all concurrency issues)."],
  ["MySQL", "What is a dirty read?", "dirty-read", "Define the isolation issue.", "A dirty read occurs when a transaction reads data that has been modified by another transaction but not yet committed. It can lead to inconsistent results."],
  ["MySQL", "What is a non‑repeatable read?", "non-repeatable-read", "Explain.", "A non‑repeatable read happens when a transaction reads the same row twice and gets different data because another transaction updated it between reads."],
  ["MySQL", "What is a phantom read?", "phantom-read", "Explain.", "A phantom read occurs when a transaction executes a query twice and the result set differs because another transaction inserted or deleted rows that match the query condition."],
  ["MySQL", "How does InnoDB implement row‑level locking?", "innodb-row-locking", "Explain MVCC and locking.", "InnoDB uses multi‑version concurrency control (MVCC) for non‑locking reads. For writes, it uses row‑level locks (shared/exclusive) on index entries. It also supports gap locks and next‑key locks to prevent phantom reads."],
  ["MySQL", "What is a deadlock and how does MySQL handle it?", "mysql-deadlock", "Explain detection and resolution.", "A deadlock occurs when two or more transactions hold locks and wait for each other. MySQL detects deadlocks and rolls back one of the transactions (the one that has done the least work) to break the cycle."],
  ["MySQL", "What is the `AUTOCOMMIT` mode?", "autocommit", "Explain default behavior.", "In MySQL, `AUTOCOMMIT` is enabled by default, meaning each DML statement is automatically committed. You can disable it with `SET autocommit = 0;` and manually commit."],
  ["MySQL", "What is the `SAVEPOINT` feature?", "savepoint", "Explain partial rollback.", "`SAVEPOINT` creates a point within a transaction to which you can roll back without aborting the entire transaction. Use `ROLLBACK TO SAVEPOINT sp;`."],
  ["MySQL", "What is a lock wait timeout?", "lock-wait-timeout", "Define the setting.", "`innodb_lock_wait_timeout` is the time (in seconds) a transaction waits for a row lock before giving up. The default is 50 seconds. You can adjust it."],
  ["MySQL", "What is the difference between table‑level and row‑level locking?", "table-vs-row-locking", "Compare the two.", "Table‑level locks (MyISAM) lock the entire table, reducing concurrency. Row‑level locks (InnoDB) lock only specific rows, allowing higher concurrency but with more overhead."],
  ["MySQL", "What is the `GET_LOCK()` function?", "get-lock", "Explain advisory locks.", "`GET_LOCK(str, timeout)` acquires an advisory lock at the application level. It can be used for custom coordination between sessions."],
  ["MySQL", "How do you see current locks and transactions?", "view-locks", "Explain `INFORMATION_SCHEMA`.", "Query `INFORMATION_SCHEMA.INNODB_TRX`, `INNODB_LOCKS`, and `INNODB_LOCK_WAITS` to see active transactions and lock information."],
  ["MySQL", "What is the `SHOW ENGINE INNODB STATUS` output used for?", "show-engine-status", "Explain diagnostic output.", "This command provides a detailed report on InnoDB's internal state, including locks, transactions, and deadlock information. It is useful for troubleshooting."],
  ["MySQL", "What is the difference between `READ COMMITTED` and `REPEATABLE READ`?", "read-committed-vs-repeatable-read", "Compare the two.", "`READ COMMITTED` allows non‑repeatable reads (different results in the same transaction). `REPEATABLE READ` guarantees that within a transaction, repeated reads return the same data (using MVCC snapshots)."],

  // ==================== STORED PROCEDURES & FUNCTIONS (15) ====================
  ["MySQL", "What is a stored procedure in MySQL?", "stored-procedure", "Define and explain benefits.", "A stored procedure is a precompiled collection of SQL statements that can be called by name. It improves performance (less network traffic) and code reusability, and can be used for complex business logic."],
  ["MySQL", "What is the syntax to create a stored procedure?", "create-procedure", "Provide example.", "`CREATE PROCEDURE GetEmployees (IN dept_id INT) BEGIN SELECT * FROM employees WHERE department_id = dept_id; END;`"],
  ["MySQL", "How do you call a stored procedure?", "call-procedure", "Provide syntax.", "`CALL GetEmployees(5);`"],
  ["MySQL", "What is the difference between a stored procedure and a function?", "procedure-vs-function", "Compare the two.", "A function returns a single value and can be used in SQL expressions. A procedure does not return a value (but can have OUT parameters) and is called with `CALL`."],
  ["MySQL", "What are the parameters types in stored procedures?", "procedure-parameters", "Explain IN, OUT, INOUT.", "`IN` (input, default), `OUT` (output, returns a value), `INOUT` (both)."],
  ["MySQL", "What is a stored function? Give an example.", "stored-function", "Define and show usage.", "A stored function returns a scalar value. Example: `CREATE FUNCTION GetFullName (fname VARCHAR(50), lname VARCHAR(50)) RETURNS VARCHAR(100) RETURN CONCAT(fname, ' ', lname);`"],
  ["MySQL", "What is the difference between `CHAR` and `VARCHAR` in stored procedures?", "char-varchar-proc", "No difference in logic, but data types matter for parameters.", "In stored procedures, the data type of parameters matters for performance and storage. `CHAR` is fixed‑length and may pad with spaces, while `VARCHAR` is variable‑length. However, the logic for using them is the same as in table definitions. Choose based on the expected length of the input values."],
  ["MySQL", "What is a cursor in MySQL? How is it used?", "cursor", "Explain row‑by‑row processing.", "A cursor allows you to iterate through a result set row by row inside a stored procedure. Steps: `DECLARE`, `OPEN`, `FETCH`, `CLOSE`. Example: `DECLARE cur CURSOR FOR SELECT id FROM users;`"],
  ["MySQL", "What is the `DECLARE ... HANDLER` statement?", "handler", "Explain error handling.", "`DECLARE handler_type HANDLER FOR condition_value ...` defines how to handle errors or warnings. For example, `DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;`"],
  ["MySQL", "What is the `IF` and `CASE` statement in stored procedures?", "if-case-proc", "Explain control flow.", "Stored procedures support `IF ... THEN ... ELSEIF ... ELSE ... END IF;` and `CASE ... WHEN ... THEN ... ELSE ... END CASE;` for conditional logic."],
  ["MySQL", "What are loops in MySQL? (`WHILE`, `REPEAT`, `LOOP`)", "loops", "Explain loop constructs.", "`WHILE condition DO ... END WHILE;`, `REPEAT ... UNTIL condition END REPEAT;`, `LOOP ... END LOOP;` with `LEAVE` to exit."],
  ["MySQL", "What is a prepared statement in MySQL?", "prepared-statement", "Explain dynamic SQL.", "Prepared statements allow you to execute parameterized SQL statements for efficiency and security. They can be used inside stored procedures. Example: `PREPARE stmt FROM 'SELECT * FROM users WHERE id = ?'; EXECUTE stmt USING @id;`"],
  ["MySQL", "What is the `DELIMITER` command used for in stored procedures?", "delimiter", "Explain changing the statement delimiter.", "The `DELIMITER` command changes the default semicolon (;) to another character so that the entire procedure definition is sent as a single unit. Example: `DELIMITER // ... CREATE PROCEDURE ... //`"],
  ["MySQL", "How do you view existing stored procedures?", "show-procedures", "List them.", "`SHOW PROCEDURE STATUS;` or query `INFORMATION_SCHEMA.ROUTINES`."],
  ["MySQL", "How do you drop a stored procedure?", "drop-procedure", "Provide syntax.", "`DROP PROCEDURE IF EXISTS procedure_name;`"],

  // ==================== TRIGGERS & EVENTS (10) ====================
  ["MySQL", "What is a trigger in MySQL?", "trigger-definition", "Define and explain its purpose.", "A trigger is a set of SQL statements that automatically execute in response to an INSERT, UPDATE, or DELETE operation on a table. They are used for auditing, validation, and maintaining derived data."],
  ["MySQL", "What are the trigger events and timing?", "trigger-events", "Explain BEFORE/AFTER and events.", "Trigger timing: `BEFORE` or `AFTER`. Events: `INSERT`, `UPDATE`, `DELETE`. Example: `CREATE TRIGGER before_employee_insert BEFORE INSERT ON employees FOR EACH ROW ...`"],
  ["MySQL", "What is the difference between a `BEFORE` and `AFTER` trigger?", "before-vs-after-trigger", "Compare execution timing.", "`BEFORE` trigger executes before the operation, allowing modification of the new row. `AFTER` trigger executes after the operation, used for actions that should not alter the row."],
  ["MySQL", "Can you call a stored procedure from a trigger?", "trigger-call-procedure", "Yes, you can call a stored procedure from a trigger.", "Yes, you can call a stored procedure from a trigger using `CALL procedure_name();` inside the trigger body. This is useful for reusing complex business logic across multiple triggers. However, be cautious about performance and avoid recursive calls that may cause infinite loops or deadlocks. Always ensure the procedure does not perform DML on the same table that fired the trigger to prevent recursion. Test thoroughly in a staging environment."],
  ["MySQL", "What is an event scheduler in MySQL?", "event-scheduler", "Explain scheduled tasks.", "MySQL Event Scheduler allows you to schedule recurring tasks (e.g., daily backups, cleanup jobs). Use `CREATE EVENT` to define an event."],
  ["MySQL", "How do you create and start an event?", "create-event", "Provide syntax.", "`CREATE EVENT daily_cleanup ON SCHEDULE EVERY 1 DAY DO DELETE FROM logs WHERE created_at < NOW() - INTERVAL 30 DAY;`"],
  ["MySQL", "What is the difference between a trigger and an event?", "trigger-vs-event", "Compare the two.", "Triggers fire automatically on data changes. Events are scheduled and run based on time, not data changes."],
  ["MySQL", "How do you drop a trigger?", "drop-trigger", "Syntax: `DROP TRIGGER trigger_name;`", "To drop a trigger, use the command `DROP TRIGGER IF EXISTS trigger_name;`. It's good practice to use `IF EXISTS` to avoid errors if the trigger doesn't exist. You need the `TRIGGER` privilege on the table. Dropping a trigger removes it permanently; ensure it's not needed for any application logic."],
  ["MySQL", "Can you use `ROLLBACK` inside a trigger?", "trigger-rollback", "Yes, if the trigger is in a transaction, you can rollback to undo the triggering statement (InnoDB).", "Yes, you can use `ROLLBACK` inside a trigger if the trigger is executed within a transaction. For InnoDB tables, the triggering DML statement is part of a transaction, so you can roll back the entire transaction including the trigger's actions. However, be careful: rolling back in a trigger can be disruptive; use it only for critical validation failures. Also, `ROLLBACK` in a trigger will abort the entire transaction, not just the trigger."],
  ["MySQL", "What is the `NEW` and `OLD` pseudo‑records?", "new-old", "Explain accessing row values.", "In triggers, `NEW` refers to the new row (for INSERT/UPDATE), `OLD` refers to the old row (for DELETE/UPDATE). You can access columns like `NEW.name`."],

  // ==================== VIEWS (10) ====================
  ["MySQL", "What is a view in MySQL?", "view-definition", "Define virtual table.", "A view is a named, pre‑defined query that presents data from one or more tables as if it were a table. It does not store data but provides a filtered or aggregated perspective."],
  ["MySQL", "What is the difference between a view and a table?", "view-vs-table", "Compare storage and usage.", "A table stores physical data. A view is a virtual table defined by a query; changes to underlying tables are reflected in the view. Views can restrict access to sensitive columns."],
  ["MySQL", "What is a materialized view? Does MySQL support it?", "materialized-view", "Explain and mention workarounds.", "A materialized view stores the query result physically. MySQL does not natively support materialized views, but you can simulate them using a combination of tables and triggers or by using scheduled events to refresh."],
  ["MySQL", "How do you create a view? Provide an example.", "create-view", "Syntax: `CREATE VIEW view_name AS SELECT ...`; Example: `CREATE VIEW high_salary AS SELECT name, salary FROM employees WHERE salary > 100000;`", "To create a view, use `CREATE VIEW view_name AS SELECT ...`. For example, `CREATE VIEW high_salary AS SELECT name, salary FROM employees WHERE salary > 100000;` creates a view showing high‑salary employees. Views are virtual tables that improve security and simplify queries. They don’t store data; they are saved queries that reflect live data."],
  ["MySQL", "Can you insert/update/delete through a view?", "updatable-view", "Explain conditions.", "A view is updatable if it contains no joins, aggregates, `DISTINCT`, `GROUP BY`, `HAVING`, subqueries, etc. In many cases, updates are not allowed; you can use `WITH CHECK OPTION` to enforce constraints."],
  ["MySQL", "What is the `WITH CHECK OPTION` clause?", "with-check-option", "Explain its use.", "When creating a view, `WITH CHECK OPTION` prevents updates that would cause rows to disappear from the view. It ensures that any inserted or updated row satisfies the view's `WHERE` condition."],
  ["MySQL", "How do you drop a view?", "drop-view", "Syntax: `DROP VIEW view_name;`", "To drop a view, use `DROP VIEW IF EXISTS view_name;`. Using `IF EXISTS` avoids errors if the view doesn't exist. Dropping a view removes its definition but does not affect the underlying tables."],
  ["MySQL", "What is the `SHOW CREATE VIEW` command?", "show-create-view", "Display the view definition.", "`SHOW CREATE VIEW view_name;` shows the query that defines the view."],
  ["MySQL", "Can you use a view as a base for another view?", "nested-view", "Yes, views can be based on other views, though performance may suffer.", "Yes, you can create views on top of other views (nested views). However, this can degrade performance because the query must be executed for each nested level. It's generally better to flatten views for efficiency."],
  ["MySQL", "What are the advantages of using views?", "view-advantages", "List benefits.", "Views provide security (hide columns), simplification (hide complex joins), data abstraction (present only necessary data), and consistency (centralize logic)."],

  // ==================== BACKUP & RESTORE (10) ====================
  ["MySQL", "How do you backup a MySQL database?", "mysql-backup", "Explain `mysqldump`.", "Use `mysqldump -u username -p database_name > backup.sql`. For all databases: `mysqldump --all-databases > all_backup.sql`. Include options like `--single-transaction` for consistency."],
  ["MySQL", "How do you restore a backup?", "mysql-restore", "Explain restore methods.", "Use `mysql -u username -p database_name < backup.sql`. If the backup contains `CREATE DATABASE`, you can restore without specifying a database."],
  ["MySQL", "What is the difference between logical and physical backup?", "logical-vs-physical-backup", "Compare the two.", "Logical backup (mysqldump) exports SQL statements, is portable, but slower for large databases. Physical backup (copying data files) is faster but less portable and requires the server to be stopped."],
  ["MySQL", "What is `mysqldump` and what are its common options?", "mysqldump-options", "List useful options.", "`--single-transaction` (consistent snapshot for InnoDB), `--no-data` (schema only), `--no-create-info` (data only), `--add-drop-table`, `--routines`, `--triggers`, `--events`."],
  ["MySQL", "What is the `mysqlpump` utility?", "mysqlpump", "Explain the newer backup tool.", "`mysqlpump` is a newer backup utility that supports parallel backup and more efficient dumping of large databases. It provides similar functionality to `mysqldump`."],
  ["MySQL", "How do you backup a single table?", "backup-single-table", "Command: `mysqldump -u user -p db_name table_name > table.sql`", "To backup a single table, use `mysqldump -u username -p database_name table_name > backup.sql`. This creates a file containing the SQL statements to recreate that table and its data. It's useful for selective backups or migration of individual tables."],
  ["MySQL", "What is the purpose of the `binary log` (binlog) in backup?", "binary-log", "Explain point‑in‑time recovery.", "The binary log records all changes to the database. It enables point‑in‑time recovery: you can restore a full backup and then replay binlog events to reach a specific time."],
  ["MySQL", "What is `mysqlbinlog` used for?", "mysqlbinlog", "Explain the tool.", "`mysqlbinlog` is a utility to read the binary log files in a human‑readable format. It can be used to replay changes or to view transaction history."],
  ["MySQL", "How do you perform a point‑in‑time recovery?", "pitr", "Explain the process.", "1. Restore the last full backup. 2. Use `mysqlbinlog` to apply binary logs from the time of the backup up to the desired time: `mysqlbinlog --start-datetime=\"...\" binlog.000001 | mysql -u root -p`."],
  ["MySQL", "What is the `--single-transaction` option in mysqldump?", "single-transaction", "Explain its importance.", "It ensures a consistent snapshot of InnoDB tables by starting a transaction and using MVCC. It avoids locking tables and is essential for non‑blocking backups."],

  // ==================== SECURITY & USERS (10) ====================
  ["MySQL", "How do you create a new user in MySQL?", "create-user", "Provide syntax.", "`CREATE USER 'username'@'host' IDENTIFIED BY 'password';` Example: `CREATE USER 'john'@'localhost' IDENTIFIED BY 'securepass';`"],
  ["MySQL", "How do you grant privileges to a user?", "grant-privileges", "Explain `GRANT`.", "`GRANT SELECT, INSERT ON database.* TO 'username'@'host';` Use `ALL PRIVILEGES` for full access. Don't forget `FLUSH PRIVILEGES;` to apply."],
  ["MySQL", "How do you revoke privileges?", "revoke-privileges", "Explain `REVOKE`.", "`REVOKE SELECT ON database.* FROM 'username'@'host';`"],
  ["MySQL", "What are the different levels of privileges?", "privilege-levels", "Explain global, database, table, column.", "Global (`*.*`), database (`db.*`), table (`db.table`), column (specific columns), and routine (`PROCEDURE`, `FUNCTION`)."],
  ["MySQL", "What is the `root` user and why should you be careful with it?", "root-user", "Explain security.", "The `root` user has all privileges. It should have a strong password and be used sparingly. Create separate application users with minimal required privileges."],
  ["MySQL", "How do you change a user's password?", "change-password", "Syntax: `ALTER USER 'user'@'host' IDENTIFIED BY 'new_password';`", "To change a user's password, use `ALTER USER 'username'@'host' IDENTIFIED BY 'new_password';`. This updates the authentication credentials. You need the `UPDATE` privilege on `mysql.user` or the `CREATE USER` privilege. Always use strong passwords and consider using `IDENTIFIED WITH` for stronger authentication plugins. After changing, the new password takes effect immediately for new connections."],
  ["MySQL", "What is the difference between `DROP USER` and `DELETE FROM mysql.user`?", "drop-user-vs-delete", "Explain the proper way.", "Always use `DROP USER` to remove a user. Directly deleting from `mysql.user` may leave orphaned privileges and is not recommended."],
  ["MySQL", "What is the `mysql` system database used for?", "mysql-db", "Explain its purpose.", "The `mysql` database contains system tables that store user accounts, privileges, and server metadata. It is essential for authentication and authorization."],
  ["MySQL", "What is SSL/TLS encryption in MySQL?", "ssl-encryption", "Explain secure connections.", "MySQL supports encrypted connections using SSL/TLS to protect data in transit. You can require SSL for certain users with `REQUIRE SSL`."],
  ["MySQL", "What is the `FLUSH PRIVILEGES` command?", "flush-privileges", "Explain its use.", "`FLUSH PRIVILEGES` reloads the grant tables from the `mysql` database. It is needed after manually editing grant tables or when changes don't take effect."],

  // ==================== ADVANCED FEATURES (15) ====================
  ["MySQL", "What is JSON support in MySQL? What functions are available?", "mysql-json", "Explain JSON capabilities.", "MySQL supports JSON data type and many functions: `JSON_EXTRACT`, `JSON_UNQUOTE`, `JSON_KEYS`, `JSON_LENGTH`, `JSON_CONTAINS`, `JSON_ARRAY`, `JSON_OBJECT`, `JSON_TABLE` (8.0+), and generated columns on JSON fields for indexing."],
  ["MySQL", "How do you create an index on a JSON column?", "json-index", "Use generated columns.", "You can create a generated column that extracts a value from JSON and then index that column. Example: `ALTER TABLE t ADD COLUMN v INT GENERATED ALWAYS AS (JSON_EXTRACT(jdoc, '$.id')) STORED; CREATE INDEX idx_v ON t(v);`"],
  ["MySQL", "What is `WITH` clause (Common Table Expression) in MySQL 8.0?", "cte", "Explain CTEs.", "A Common Table Expression (CTE) is a named temporary result set defined with `WITH`. It improves readability and supports recursion. Example: `WITH cte AS (SELECT ...) SELECT * FROM cte;`"],
  ["MySQL", "What is recursive CTE and how is it used?", "recursive-cte", "Explain recursive queries.", "Recursive CTEs allow hierarchical queries (e.g., tree traversal). Syntax: `WITH RECURSIVE cte AS (SELECT ... UNION ALL SELECT ...)`. Used for organizational charts, bill of materials."],
  ["MySQL", "What is a window function? Provide an example.", "window-functions", "Explain and give example.", "Window functions perform calculations across a set of rows related to the current row without grouping. Examples: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LEAD()`, `LAG()`. Example: `SELECT id, sales, ROW_NUMBER() OVER (ORDER BY sales DESC) AS rank FROM orders;`"],
  ["MySQL", "What is the difference between `ROW_NUMBER()` and `RANK()`?", "row_number-vs-rank", "Compare the two.", "`ROW_NUMBER()` assigns a unique sequential number to each row in a partition. `RANK()` gives the same rank to equal values and skips subsequent ranks. `DENSE_RANK()` does not skip ranks."],
  ["MySQL", "What is `GROUP_CONCAT()` and when is it used?", "group-concat", "Explain string aggregation.", "`GROUP_CONCAT()` concatenates values from multiple rows into a single string, often used with `GROUP BY`. Example: `SELECT department, GROUP_CONCAT(name) FROM employees GROUP BY department;`"],
  ["MySQL", "What is `FULLTEXT` search and how do you use it?", "fulltext-search", "Explain natural language search.", "To use full‑text search, create a `FULLTEXT` index on text columns. Query with `MATCH(columns) AGAINST('search terms' IN NATURAL LANGUAGE MODE)`. Also supports boolean mode and query expansion."],
  ["MySQL", "What is `InnoDB`'s `memcached` plugin?", "memcached-plugin", "Explain NoSQL interface.", "InnoDB provides a memcached API that allows direct access to InnoDB tables via the memcached protocol, enabling in‑memory caching and persistence."],
  ["MySQL", "What is a `foreign key` and what are the actions `CASCADE`, `SET NULL`, `RESTRICT`, `NO ACTION`?", "foreign-key-actions", "Explain referential actions.", "`ON DELETE CASCADE` deletes child rows when parent is deleted. `SET NULL` sets foreign key to NULL. `RESTRICT` prevents deletion if child exists. `NO ACTION` is similar to RESTRICT."],
  ["MySQL", "What is the difference between `CHARACTER SET` and `COLLATION`?", "charset-vs-collation", "Explain encoding and sorting rules.", "Character set defines the set of symbols and their encoding (e.g., UTF8). Collation defines how strings are compared and sorted (e.g., `utf8_general_ci` for case‑insensitive)."],
  ["MySQL", "What is `utf8mb4` and why should you use it?", "utf8mb4", "Explain full Unicode support.", "`utf8mb4` is MySQL's true UTF‑8 encoding (4 bytes per character), supporting all Unicode characters including emojis. The older `utf8` only supports BMP (3 bytes)."],
  ["MySQL", "What is partitioning in MySQL? What are the types?", "partitioning-types", "Explain table partitioning.", "Partitioning splits a table into smaller segments based on a key. Types: `RANGE`, `LIST`, `HASH`, `KEY`. It can improve performance and manageability. Available in InnoDB."],
  ["MySQL", "What is a `Generated Column` in MySQL?", "generated-column", "Explain virtual and stored columns.", "A generated column's value is computed from other columns. It can be `VIRTUAL` (computed on read) or `STORED` (physically stored). Useful for indexing JSON values or derived data."],
  ["MySQL", "What is `XA` transactions?", "xa-transactions", "Explain distributed transactions.", "XA transactions allow multiple databases to participate in a single distributed transaction, using a two‑phase commit protocol. MySQL supports XA with InnoDB."],

["MySQL", "How do you kill a running query?", "kill-query", "Use `KILL [CONNECTION] thread_id;`. Find the thread ID from `SHOW PROCESSLIST`.", "To kill a running query, first identify the thread ID using `SHOW PROCESSLIST` or `SELECT * FROM information_schema.processlist`. Then execute `KILL thread_id;` or `KILL CONNECTION thread_id;` (the latter is the default). Use `KILL QUERY thread_id;` to terminate only the current query without dropping the connection. Killing a query can cause transactions to roll back, so use it carefully, especially in production."],
["MySQL", "How do you check the size of a database or table?", "table-size", "Query `information_schema.tables`. Example: `SELECT table_schema, SUM(data_length + index_length) FROM information_schema.tables GROUP BY table_schema;`", "To check the size of a database or table, query the `information_schema.tables` table. For a table, use `SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)' FROM information_schema.tables WHERE table_schema = 'your_db' AND table_name = 'your_table';`. For all tables in a database, aggregate by `table_schema`. This gives you the storage used by data and indexes. You can also use `SHOW TABLE STATUS` for a quick overview."],
["MySQL", "How do you handle a corrupted table?", "corrupted-table", "Use `CHECK TABLE` and `REPAIR TABLE` for MyISAM; for InnoDB, restore from backup or use `innodb_force_recovery`.", "For MyISAM tables, you can run `CHECK TABLE table_name;` to detect corruption, and `REPAIR TABLE table_name;` to fix it (though it may cause data loss). For InnoDB, corruption often requires restoring from a backup, as InnoDB does not support `REPAIR`. You can try setting `innodb_force_recovery` in the MySQL config to start the server and dump the data, but this is risky and should be used as a last resort. Always have a recent backup."],
["MySQL", "How do you monitor replication lag?", "replication-lag", "Check `Seconds_Behind_Master` from `SHOW SLAVE STATUS\\G`.", "To monitor replication lag, run `SHOW SLAVE STATUS\\G` on the replica and look at the `Seconds_Behind_Master` field – it indicates how many seconds the replica is behind the source. Also check `Slave_IO_Running` and `Slave_SQL_Running` to ensure replication is active. For more advanced monitoring, you can query `performance_schema.replication_applier_status` and `replication_connection_status` tables. High lag may indicate network issues or slow queries on the replica."],
["MySQL", "How do you import a large SQL file efficiently?", "import-large-file", "Use `mysql` with options `--max_allowed_packet` and `--net_buffer_length`. Also, consider using `SOURCE` command within mysql or splitting the file.", "To import a large SQL file, use the `mysql` client with `--max_allowed_packet=512M` (or larger) and `--net_buffer_length=16384` to avoid packet size errors. You can also use the `SOURCE` command inside the mysql shell: `SOURCE /path/to/large.sql;`. For very large files, consider splitting the file into smaller chunks using `split` or using tools like `pv` to monitor progress. Avoid using a GUI client; the command line is faster and more efficient."],
["MySQL", "What are the privileges needed to use `LOAD DATA INFILE`?", "load-data-privileges", "Requires `FILE` privilege or `SUPER` for local files.", "To use `LOAD DATA INFILE` to read files from the server, you need the `FILE` privilege (global). For loading local files (`LOAD DATA LOCAL INFILE`), you need the `FILE` privilege and also the `local_infile` system variable must be enabled. Additionally, the `--secure-file-priv` variable may restrict which directories can be read. For security, avoid granting `FILE` unless absolutely necessary, and consider using `LOAD DATA LOCAL INFILE` with proper user permissions."],
["MySQL", "How do you generate a CSV from a query?", "select-into-outfile", "Use `SELECT ... INTO OUTFILE '/path/file.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n' FROM table;`", "To export query results as a CSV, use `SELECT ... INTO OUTFILE '/path/to/file.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\\n' FROM your_table;`. Ensure the directory is writable by the MySQL server and the `--secure-file-priv` variable allows it. You can also use `mysqldump` with `--tab` or use `mysql -e \"SELECT ...\" > output.csv` with the appropriate options. Remember to escape special characters if needed."],
["MySQL", "How do you change the storage engine of a table?", "alter-engine", "Use `ALTER TABLE table_name ENGINE=InnoDB;`", "To change the storage engine, run `ALTER TABLE table_name ENGINE=InnoDB;` (or any other supported engine). This will rebuild the table, which can take time and lock the table (depending on the engine). For InnoDB, you can use `ALTER TABLE ... ENGINE=InnoDB;` to convert from MyISAM. Be aware that not all features are supported across engines (e.g., foreign keys only in InnoDB). Always test the conversion on a staging environment first."],
["MySQL", "How do you check the MySQL server version?", "mysql-version", "`SELECT VERSION();` or `mysql --version`.", "You can check the MySQL server version by running `SELECT VERSION();` in a SQL client, or from the command line with `mysql --version` (which shows the client version) or `mysqld --version` (server version). Also, `SHOW VARIABLES LIKE 'version';` provides the same. Knowing the version is important for compatibility and feature availability."],
["MySQL", "What is the `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` view used for?", "key-column-usage", "It provides information about key columns, including foreign keys and constraints.", "The `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` view shows which columns are part of constraints (like primary keys, unique keys, and foreign keys). It includes `CONSTRAINT_NAME`, `TABLE_NAME`, `COLUMN_NAME`, `REFERENCED_TABLE_NAME`, `REFERENCED_COLUMN_NAME`, etc. This is useful for exploring database relationships, documenting foreign key dependencies, and debugging constraint issues. For example, you can query it to see all foreign keys referencing a specific table."]
] as const;

const prisma = new PrismaClient();

const buildWhyInterviewersAsk = (question: string, shortDescription: string) =>
  `Interviewers ask this to check whether you can explain MySQL concepts clearly and connect them to practical engineering decisions. ${shortDescription} A strong response should address the purpose, the relevant trade‑offs, and how you would verify the result rather than reciting a command or definition.`;

const buildCommonMistakes = (question: string) => [
  `Giving a memorized definition without explaining how it applies to: ${question}`,
  "Listing MySQL commands without explaining the safety, performance, or operational trade‑off.",
  "Ignoring security boundaries, persistence, failure handling, or how the solution would be tested.",
];

async function main() {
  const category = await prisma.category.upsert({
    where: { slug: "mysql" },
    update: { name: "MySQL", group: "Technology", description: "MySQL interview questions." },
    create: { name: "MySQL", slug: "mysql", group: "Technology", description: "MySQL interview questions." },
  });
  const subcategory = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: category.id, slug: "mysql" } },
    update: {},
    create: { name: "MySQL", slug: "mysql", categoryId: category.id },
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
        tags: ["MySQL"],
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
        tags: ["MySQL"],
        isPublished: true,
      },
    });
  }

  console.log(`Imported ${topics.length} MySQL questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");