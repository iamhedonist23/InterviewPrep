import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();
const sourceDirectory = path.join(
  projectRoot,
  "prisma",
  "ProductionReadyQuetionsAndANserr",
  "Quetions",
  "seeda",
);
const outputDirectory = path.join(projectRoot, "data", "interview-questions");

const SOURCE_FILES = [
  "AI_Done.ts",
  "Android_done.ts",
  "CPP_done.ts",
  "C_Done.ts",
  "DataScience_done.ts",
  "DigitalMarketing_Done.ts",
  "DOCKER.ts",
  "DSA_done.ts",
  "Graphics-done.ts",
  "HR_Production.ts",
  "Java_Done.ts",
  "ML_Done.ts",
  "MySql_Done.ts",
  "PreSales_done.ts",
  "Python_done.ts",
  "QA_updated.ts",
  "SystemDesign_Done.ts",
] as const;

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type RawQuestion = {
  question?: string;
  slug?: string;
  categoryName?: string;
  categorySlug?: string;
  subcategoryName?: string;
  subcategorySlug?: string;
  experienceLevel?: string;
  difficulty?: string;
  interviewType?: string;
  shortDescription?: string;
  explanation?: string;
  sampleAnswer?: string;
  detailedAnswer?: string;
  keyPoints?: JsonValue;
  commonMistakes?: JsonValue;
  followUpQuestions?: JsonValue;
  tags?: JsonValue;
  seoTitle?: string | null;
  seoDescription?: string | null;
  isPublished?: boolean;
};

type BackupMetadata = {
  id?: string;
  categoryId?: string;
  subcategoryId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  category?: { id?: string; name?: string; slug?: string; group?: string; description?: string | null };
  subcategory?: { id?: string; name?: string; slug?: string } | null;
};

type InterviewQuestion = RawQuestion & {
  id: string;
  categoryId: string;
  subcategoryId: string | null;
  slug: string;
  question: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
  subcategorySlug: string;
  experienceLevel: string;
  difficulty: string;
  interviewType: string;
  shortDescription: string;
  explanation: string;
  sampleAnswer: string;
  detailedAnswer: string;
  keyPoints: JsonValue[];
  commonMistakes: JsonValue[];
  followUpQuestions: JsonValue[];
  tags: JsonValue[];
  seoTitle: string | null;
  seoDescription: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category: { id: string; name: string; slug: string; group: string; description: string | null };
  subcategory: { id: string; name: string; slug: string } | null;
};

function identifierName(node: ts.Node): string | null {
  if (ts.isIdentifier(node)) return node.text;
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  return null;
}

function evaluate(node: ts.Node, values: Map<string, JsonValue>): JsonValue | undefined {
  if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isParenthesizedExpression(node)) {
    return evaluate(node.expression, values);
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node)) return values.get(node.text);
  if (ts.isPropertyAccessExpression(node)) {
    const target = evaluate(node.expression, values);
    if (target && typeof target === "object" && !Array.isArray(target)) {
      return target[node.name.text];
    }
    return node.name.text;
  }
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) {
    const value = evaluate(node.operand, values);
    return typeof value === "number" ? -value : undefined;
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.flatMap((element) => {
      if (ts.isSpreadElement(element)) {
        const value = evaluate(element.expression, values);
        return Array.isArray(value) ? value : [];
      }
      const value = evaluate(element, values);
      return value === undefined ? [] : [value];
    });
  }
  if (ts.isObjectLiteralExpression(node)) {
    const result: { [key: string]: JsonValue } = {};
    for (const property of node.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = evaluate(property.expression, values);
        if (spread && typeof spread === "object" && !Array.isArray(spread)) Object.assign(result, spread);
        continue;
      }
      if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) continue;
      const key = property.name && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
        ? property.name.text
        : null;
      if (!key) continue;
      const value = ts.isShorthandPropertyAssignment(property)
        ? values.get(property.name.text)
        : evaluate(property.initializer, values);
      if (value !== undefined) result[key] = value;
    }
    return result;
  }
  return undefined;
}

function extractFile(filePath: string): RawQuestion[] {
  const source = ts.createSourceFile(filePath, fs.readFileSync(filePath, "utf8"), ts.ScriptTarget.Latest, true);
  const values = new Map<string, JsonValue>();
  const arrays: JsonValue[][] = [];
  const upserts: JsonValue[] = [];

  function visit(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const value = evaluate(node.initializer, values);
      if (value !== undefined) {
        values.set(node.name.text, value);
        if (Array.isArray(value) && ["questions", "QUESTIONS", "interviewQuestions"].includes(node.name.text)) arrays.push(value);
      }
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "upsert") {
      const argument = node.arguments[0];
      if (argument) {
        const value = evaluate(argument, values);
        if (value && typeof value === "object" && !Array.isArray(value)) {
          const create = value.create;
          const update = value.update;
          if (create && typeof create === "object" && !Array.isArray(create) && "question" in create) upserts.push(create);
          else if (update && typeof update === "object" && !Array.isArray(update) && "question" in update) upserts.push(update);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);

  const records = [...arrays.flat(), ...upserts].filter(
    (value): value is { [key: string]: JsonValue } => Boolean(value && typeof value === "object" && !Array.isArray(value)),
  );
  return records as RawQuestion[];
}

const FILE_CATEGORY_FALLBACKS: Record<string, { name: string; slug: string }> = {
  "AI_Done.ts": { name: "AI Engineer", slug: "ai-ai-engineer" },
  "Android_done.ts": { name: "Android", slug: "android" },
  "CPP_done.ts": { name: "C++ Programming", slug: "cpp-programming" },
  "C_Done.ts": { name: "C Programming", slug: "c-programming" },
  "DataScience_done.ts": { name: "Data Science", slug: "data-science" },
  "DigitalMarketing_Done.ts": { name: "Digital Marketing", slug: "digital-marketing" },
  "DOCKER.ts": { name: "DevOps, Docker & Kubernetes", slug: "devops-docker-and-kubernetes" },
  "DSA_done.ts": { name: "Data Structures and Algorithms", slug: "data-structures-and-algorithms" },
  "Graphics-done.ts": { name: "Graphic Designer", slug: "graphic-designer" },
  "HR_Production.ts": { name: "Behavioral and HR", slug: "behavioral-and-hr" },
  "Java_Done.ts": { name: "Java", slug: "java" },
  "ML_Done.ts": { name: "Machine Learning", slug: "machine-learning" },
  "MySql_Done.ts": { name: "MySQL and SQL DBMS", slug: "mysql-sql-dbms" },
  "PreSales_done.ts": { name: "Pre-Sales", slug: "pre-sales" },
  "Python_done.ts": { name: "Python", slug: "python" },
  "QA_updated.ts": { name: "QA Software Testing", slug: "qa-software-testing" },
  "SystemDesign_Done.ts": { name: "System Design", slug: "system-design" },
};

function normalize(raw: RawQuestion, sourceFile?: string, backup?: BackupMetadata): InterviewQuestion {
  const fallback = sourceFile ? FILE_CATEGORY_FALLBACKS[sourceFile] : undefined;
  const slug = String(raw.slug ?? "").trim();
  const sourceCategorySlug = String(raw.categorySlug ?? "").trim();
  const categorySlug = fallback?.slug ?? sourceCategorySlug.split("/")[0];
  const subcategorySlug = String(raw.subcategorySlug ?? "").trim();
  const categoryName = String(fallback?.name ?? raw.categoryName ?? categorySlug).trim();
  const subcategoryName = String(raw.subcategoryName ?? subcategorySlug).trim();
  return {
    ...raw,
    id: backup?.id ?? `json-${slug}`,
    slug,
    question: String(raw.question ?? "").trim(),
    categoryName,
    categorySlug,
    subcategoryName,
    subcategorySlug,
    experienceLevel: String(raw.experienceLevel ?? "").trim(),
    difficulty: String(raw.difficulty ?? "").trim(),
    interviewType: String(raw.interviewType ?? "").trim(),
    shortDescription: String(raw.shortDescription ?? "").trim(),
    explanation: String(raw.explanation ?? "").trim(),
    sampleAnswer: String(raw.sampleAnswer ?? "").trim(),
    detailedAnswer: String(raw.detailedAnswer ?? "").trim(),
    keyPoints: Array.isArray(raw.keyPoints) ? raw.keyPoints : [],
    commonMistakes: Array.isArray(raw.commonMistakes) ? raw.commonMistakes : [],
    followUpQuestions: Array.isArray(raw.followUpQuestions) ? raw.followUpQuestions : [],
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    seoTitle: raw.seoTitle ?? null,
    seoDescription: raw.seoDescription ?? null,
    isPublished: raw.isPublished !== false,
    categoryId: backup?.categoryId ?? `json-category-${categorySlug}`,
    subcategoryId: backup?.subcategoryId ?? (subcategorySlug ? `json-subcategory-${categorySlug}-${subcategorySlug}` : null),
    createdAt: backup?.createdAt ?? "2026-01-01T00:00:00.000Z",
    updatedAt: backup?.updatedAt ?? "2026-01-01T00:00:00.000Z",
    category: {
      id: backup?.category?.id ?? `json-category-${categorySlug}`,
      name: backup?.category?.name ?? categoryName,
      slug: backup?.category?.slug ?? categorySlug,
      group: backup?.category?.group ?? "Technology",
      description: backup?.category?.description ?? `Focused ${categoryName} interview preparation.`,
    },
    subcategory: backup?.subcategory
      ? { id: backup.subcategory.id ?? `json-subcategory-${categorySlug}-${subcategorySlug}`, name: backup.subcategory.name ?? subcategoryName, slug: backup.subcategory.slug ?? subcategorySlug }
      : subcategorySlug
        ? { id: `json-subcategory-${categorySlug}-${subcategorySlug}`, name: subcategoryName, slug: subcategorySlug }
        : null,
  };
}

function validate(questions: InterviewQuestion[]) {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const texts = new Set<string>();
  const categorySlugs = new Set(questions.map((question) => question.categorySlug));
  const subcategoryByCategory = new Map<string, Set<string>>();
  for (const question of questions) {
    if (!question.slug) errors.push("missing slug");
    if (slugs.has(question.slug)) errors.push(`duplicate slug: ${question.slug}`);
    slugs.add(question.slug);
    const normalizedQuestion = question.question.toLowerCase().trim();
    if (!question.question) errors.push(`missing question for ${question.slug}`);
    if (!question.detailedAnswer) errors.push(`missing detailedAnswer for ${question.slug}`);
    if (texts.has(normalizedQuestion)) errors.push(`duplicate question: ${question.question}`);
    texts.add(normalizedQuestion);
    if (!question.categorySlug) errors.push(`missing categorySlug for ${question.slug}`);
    if (question.subcategorySlug) {
      const subcategories = subcategoryByCategory.get(question.categorySlug) ?? new Set<string>();
      subcategories.add(question.subcategorySlug);
      subcategoryByCategory.set(question.categorySlug, subcategories);
    }
  }
  if (categorySlugs.has("")) errors.push("invalid empty categorySlug");
  if (errors.length) throw new Error(`Interview question validation failed:\n${errors.slice(0, 20).join("\n")}${errors.length > 20 ? `\n...and ${errors.length - 20} more` : ""}`);
}

const backupPath = path.join(projectRoot, "interview-questions-backup.json");
const backupBySlug = new Map<string, BackupMetadata>();
if (fs.existsSync(backupPath)) {
  const backupRecords = JSON.parse(fs.readFileSync(backupPath, "utf8")) as Array<BackupMetadata & { slug?: string }>;
  for (const record of backupRecords) if (record.slug) backupBySlug.set(record.slug, record);
}
const extractedByFile = SOURCE_FILES.map((file) => ({ file, questions: extractFile(path.join(sourceDirectory, file)) }));
const extractedQuestions = extractedByFile.flatMap(({ file, questions: fileQuestions }) => fileQuestions.map((question) => ({ question, file })))
  .map(({ question, file }) => normalize(question, file, backupBySlug.get(String(question.slug ?? ""))))
  .filter((question) => question.slug !== "slug" && question.question !== "question")
  .filter((question) => question.isPublished);

// Some legacy banks repeat the same prompt under different categories. Keep the
// first source-file occurrence so the public corpus has one canonical question.
const seenQuestionText = new Set<string>();
const questions = extractedQuestions.filter((question) => {
  const key = question.question.toLowerCase().trim();
  if (seenQuestionText.has(key)) return false;
  seenQuestionText.add(key);
  return true;
});
validate(questions);

const byCategory = new Map<string, InterviewQuestion[]>();
for (const question of questions) {
  const items = byCategory.get(question.categorySlug) ?? [];
  items.push(question);
  byCategory.set(question.categorySlug, items);
}

if (process.argv.includes("--write")) {
  fs.rmSync(outputDirectory, { recursive: true, force: true });
  fs.mkdirSync(outputDirectory, { recursive: true });
  const imports: string[] = [];
  const entries: string[] = [];
  for (const [categorySlug, items] of byCategory) {
    fs.writeFileSync(path.join(outputDirectory, `${categorySlug}.json`), `${JSON.stringify(items, null, 2)}\n`);
    const variable = categorySlug.replace(/[^a-zA-Z0-9]+(.)/g, (_match, character: string) => character.toUpperCase());
    imports.push(`import ${variable} from "./${categorySlug}.json";`);
    entries.push(`  ${variable},`);
  }
  fs.writeFileSync(
    path.join(outputDirectory, "index.ts"),
    `${imports.join("\n")}\n\nconst interviewQuestionBanks = [\n${entries.join("\n")}\n];\n\nexport default interviewQuestionBanks;\n`,
  );
}

console.log(`Extracted ${questions.length} published interview questions from ${SOURCE_FILES.length} production seed files.`);
console.log(`Categories: ${byCategory.size}${process.argv.includes("--write") ? `; wrote ${outputDirectory}` : " (dry run)"}.`);
