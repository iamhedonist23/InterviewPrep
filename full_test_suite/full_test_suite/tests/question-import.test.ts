import { describe, it, expect, vi, beforeEach } from "vitest";

const findMany = vi.fn();
const categoryFindMany = vi.fn();
const interviewQuestionFindUnique = vi.fn();
const interviewQuestionCreate = vi.fn();
const interviewQuestionUpdate = vi.fn();
const $transaction = vi.fn(async (fn: (tx: unknown) => unknown) =>
  fn({ interviewQuestion: { findUnique: interviewQuestionFindUnique, create: interviewQuestionCreate, update: interviewQuestionUpdate } }),
);

vi.mock("@/lib/prisma", () => ({
  prisma: {
    category: { findMany: categoryFindMany },
    interviewQuestion: { findMany },
    $transaction,
  },
}));

const { IMPORT_HEADERS, parseImportFile, validateImportRows, toQuestionData, commitImport, MAX_IMPORT_ROWS } = await import("@/lib/question-import");
type ImportRowShape = Record<(typeof IMPORT_HEADERS)[number], string> & { rowNumber: string };

function makeCsvFile(rows: string[][]): File {
  const csv = rows.map((row) => row.map((cell) => (cell.includes(",") || cell.includes('"') ? `"${cell.replace(/"/g, '""')}"` : cell)).join(",")).join("\n");
  return new File([csv], "questions.csv", { type: "text/csv" });
}

function validRow(overrides: Partial<Record<(typeof IMPORT_HEADERS)[number], string>> = {}) {
  const base: Record<(typeof IMPORT_HEADERS)[number], string> = {
    question: "What is a closure in JavaScript?",
    slug: "what-is-a-closure",
    category: "JavaScript",
    subcategory: "Fundamentals",
    experienceLevel: "MID_LEVEL",
    difficulty: "MEDIUM",
    interviewType: "TECHNICAL",
    shortDescription: "Explains closures",
    explanation: "A closure is a function bundled with its lexical scope.",
    sampleAnswer: "A closure lets an inner function access outer variables.",
    keyPoints: "lexical scope|inner function",
    commonMistakes: "",
    followUpQuestions: "",
    tags: "javascript|closures",
    seoTitle: "What is a Closure?",
    seoDescription: "Learn what closures are in JavaScript.",
    isPublished: "true",
  };
  return { ...base, ...overrides };
}

beforeEach(() => {
  findMany.mockReset();
  categoryFindMany.mockReset();
  interviewQuestionFindUnique.mockReset();
  interviewQuestionCreate.mockReset();
  interviewQuestionUpdate.mockReset();
  $transaction.mockClear();
});

describe("parseImportFile (CSV)", () => {
  it("parses a well-formed CSV with the required headers", async () => {
    const file = makeCsvFile([[...IMPORT_HEADERS], Object.values(validRow())]);
    const rows = (await parseImportFile(file)) as ImportRowShape[];
    expect(rows).toHaveLength(1);
    expect(rows[0].question).toBe("What is a closure in JavaScript?");
    expect(rows[0].rowNumber).toBe("2");
  });

  it("rejects a file with missing required columns", async () => {
    const file = makeCsvFile([["question", "slug"], ["Q1", "q1"]]);
    await expect(parseImportFile(file)).rejects.toThrow(/missing columns/i);
  });

  it("rejects a file over the 5MB size limit", async () => {
    const file = new File([new Uint8Array(5 * 1024 * 1024 + 1)], "big.csv");
    await expect(parseImportFile(file)).rejects.toThrow(/5 MB limit/i);
  });

  it("rejects a file that isn't .csv or .xlsx", async () => {
    const file = new File(["question,slug"], "questions.txt");
    await expect(parseImportFile(file)).rejects.toThrow(/csv and xlsx/i);
  });

  it("rejects a file with no data rows", async () => {
    const file = makeCsvFile([[...IMPORT_HEADERS]]);
    await expect(parseImportFile(file)).rejects.toThrow(/1-\d+ data rows/i);
  });

  it("rejects a file with more than MAX_IMPORT_ROWS data rows", async () => {
    const rows = [[...IMPORT_HEADERS], ...Array(MAX_IMPORT_ROWS + 1).fill(Object.values(validRow()))];
    const file = makeCsvFile(rows);
    await expect(parseImportFile(file)).rejects.toThrow(/data rows/i);
  });

  it("strips HTML tags and control characters from cell values", async () => {
    const file = makeCsvFile([[...IMPORT_HEADERS], Object.values(validRow({ shortDescription: "<b>Bold</b> text" }))]);
    const rows = (await parseImportFile(file)) as ImportRowShape[];
    expect(rows[0].shortDescription).toBe("Bold text");
  });

  it("correctly parses quoted cells containing commas", async () => {
    const file = makeCsvFile([[...IMPORT_HEADERS], Object.values(validRow({ tags: "a,b,c" }))]);
    const rows = (await parseImportFile(file)) as ImportRowShape[];
    expect(rows[0].tags).toBe("a,b,c");
  });

  it("assigns sequential row numbers starting at 2 (after the header row)", async () => {
    const file = makeCsvFile([[...IMPORT_HEADERS], Object.values(validRow()), Object.values(validRow({ slug: "second-slug" }))]);
    const rows = (await parseImportFile(file)) as ImportRowShape[];
    expect(rows.map((r) => r.rowNumber)).toEqual(["2", "3"]);
  });
});

describe("validateImportRows", () => {
  const categories = [{ id: "cat1", name: "JavaScript", subcategories: [{ id: "sub1", name: "Fundamentals" }] }];

  beforeEach(() => {
    categoryFindMany.mockResolvedValue(categories);
    findMany.mockResolvedValue([]);
  });

  it("accepts a fully valid row with no errors", async () => {
    const [result] = await validateImportRows([{ ...validRow(), rowNumber: "2" }]);
    expect(result.errors).toEqual([]);
    expect(result.categoryId).toBe("cat1");
    expect(result.subcategoryId).toBe("sub1");
  });

  it("flags a question that is too short", async () => {
    const [result] = await validateImportRows([{ ...validRow({ question: "Short?" }), rowNumber: "2" }]);
    expect(result.errors).toContain("Missing question or question is too short");
  });

  it("flags a question over 500 characters", async () => {
    const [result] = await validateImportRows([{ ...validRow({ question: "a".repeat(501) }), rowNumber: "2" }]);
    expect(result.errors).toContain("Question exceeds 500 characters");
  });

  it("flags an unknown category", async () => {
    const [result] = await validateImportRows([{ ...validRow({ category: "Nonexistent" }), rowNumber: "2" }]);
    expect(result.errors).toContain("Invalid or missing category");
  });

  it("flags an unknown subcategory under a valid category", async () => {
    const [result] = await validateImportRows([{ ...validRow({ subcategory: "Nonexistent" }), rowNumber: "2" }]);
    expect(result.errors).toContain("Invalid subcategory");
  });

  it("flags invalid enum values", async () => {
    const [result] = await validateImportRows([{ ...validRow({ experienceLevel: "GURU" }), rowNumber: "2" }]);
    expect(result.errors).toContain("Invalid experience level");
  });

  it("flags an invalid slug format", async () => {
    const [result] = await validateImportRows([{ ...validRow({ slug: "Not A Valid Slug!" }), rowNumber: "2" }]);
    expect(result.errors).toContain("Invalid slug");
  });

  it("warns (not errors) on a duplicate slug within the same file", async () => {
    const rows = [
      { ...validRow(), rowNumber: "2" },
      { ...validRow({ question: "A different question here?" }), rowNumber: "3" },
    ];
    const results = await validateImportRows(rows);
    expect(results[1].warnings).toContain("Duplicate slug");
    expect(results[1].errors).toEqual([]);
  });

  it("warns on a slug that already exists in the database", async () => {
    findMany.mockResolvedValue([{ slug: "what-is-a-closure", question: "Existing question" }]);
    const [result] = await validateImportRows([{ ...validRow(), rowNumber: "2" }]);
    expect(result.warnings).toContain("Duplicate slug");
  });

  it("flags missing required text fields", async () => {
    const [result] = await validateImportRows([{ ...validRow({ explanation: "" }), rowNumber: "2" }]);
    expect(result.errors).toContain("Missing explanation");
  });

  it("flags an SEO title over 70 characters", async () => {
    const [result] = await validateImportRows([{ ...validRow({ seoTitle: "a".repeat(71) }), rowNumber: "2" }]);
    expect(result.errors).toContain("SEO title exceeds 70 characters");
  });

  it("flags an SEO description over 160 characters", async () => {
    const [result] = await validateImportRows([{ ...validRow({ seoDescription: "a".repeat(161) }), rowNumber: "2" }]);
    expect(result.errors).toContain("SEO description exceeds 160 characters");
  });
});

describe("toQuestionData", () => {
  it("converts a validated row into question data, parsing pipe-delimited lists", () => {
    const data = toQuestionData({ row: { ...validRow(), rowNumber: "2" }, errors: [], warnings: [], categoryId: "cat1", subcategoryId: "sub1" });
    expect(data.keyPoints).toEqual(["lexical scope", "inner function"]);
    expect(data.tags).toEqual(["javascript", "closures"]);
    expect(data.isPublished).toBe(true);
    expect(data.categoryId).toBe("cat1");
  });

  it("parses a JSON array string for list fields instead of pipe-delimiting", () => {
    const data = toQuestionData({
      row: { ...validRow({ keyPoints: '["one", "two"]' }), rowNumber: "2" },
      errors: [],
      warnings: [],
      categoryId: "cat1",
      subcategoryId: "sub1",
    });
    expect(data.keyPoints).toEqual(["one", "two"]);
  });

  it("treats a non-'true' isPublished value as false", () => {
    const data = toQuestionData({ row: { ...validRow({ isPublished: "no" }), rowNumber: "2" }, errors: [], warnings: [], categoryId: "cat1", subcategoryId: undefined });
    expect(data.isPublished).toBe(false);
  });

  it("stores empty SEO fields as null rather than empty strings", () => {
    const data = toQuestionData({ row: { ...validRow({ seoTitle: "", seoDescription: "" }), rowNumber: "2" }, errors: [], warnings: [], categoryId: "cat1", subcategoryId: undefined });
    expect(data.seoTitle).toBeNull();
    expect(data.seoDescription).toBeNull();
  });
});

describe("commitImport", () => {
  function questionData(slug: string) {
    return toQuestionData({ row: { ...validRow({ slug }), rowNumber: "2" }, errors: [], warnings: [], categoryId: "cat1", subcategoryId: "sub1" });
  }

  it("creates new questions that don't already exist", async () => {
    interviewQuestionFindUnique.mockResolvedValue(null);
    const result = await commitImport([questionData("new-question")], "skip");
    expect(result).toEqual({ imported: 1, updated: 0, skipped: 0, processed: 1 });
    expect(interviewQuestionCreate).toHaveBeenCalledOnce();
  });

  it("skips existing questions in 'skip' mode", async () => {
    interviewQuestionFindUnique.mockResolvedValue({ id: "existing-id" });
    const result = await commitImport([questionData("existing-question")], "skip");
    expect(result).toEqual({ imported: 0, updated: 0, skipped: 1, processed: 1 });
    expect(interviewQuestionUpdate).not.toHaveBeenCalled();
  });

  it("updates existing questions in 'update' mode", async () => {
    interviewQuestionFindUnique.mockResolvedValue({ id: "existing-id" });
    const result = await commitImport([questionData("existing-question")], "update");
    expect(result).toEqual({ imported: 0, updated: 1, skipped: 0, processed: 1 });
    expect(interviewQuestionUpdate).toHaveBeenCalledWith({ where: { id: "existing-id" }, data: expect.objectContaining({ slug: "existing-question" }) });
  });

  it("processes items in batches without losing any records", async () => {
    interviewQuestionFindUnique.mockResolvedValue(null);
    const items = Array.from({ length: 250 }, (_, i) => questionData(`slug-${i}`));
    const result = await commitImport(items, "skip");
    expect(result.processed).toBe(250);
    expect(result.imported).toBe(250);
    expect($transaction).toHaveBeenCalledTimes(3); // batches of 100
  });
});
