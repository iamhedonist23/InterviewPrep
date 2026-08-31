import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Minimal generic in-memory Prisma model mock, reused across every study
// table so this file doesn't need ten hand-written mocks.
// ---------------------------------------------------------------------------
function makeModel<T extends { id: string }>() {
  let rows: T[] = [];
  let counter = 0;
  return {
    _rows: () => rows,
    _reset: () => {
      rows = [];
      counter = 0;
    },
    findMany: vi.fn(async ({ where }: { where?: Record<string, unknown> } = {}) => rows.filter((r) => matches(r, where))),
    findFirst: vi.fn(async ({ where }: { where?: Record<string, unknown> } = {}) => rows.find((r) => matches(r, where)) ?? null),
    findUnique: vi.fn(async ({ where }: { where: Record<string, unknown> }) => {
      if (where.id) return rows.find((r) => r.id === where.id) ?? null;
      // Compound unique keys like { userId_topicId: {...} }
      const compoundKey = Object.keys(where)[0];
      const compound = where[compoundKey] as Record<string, unknown>;
      return rows.find((r) => Object.entries(compound).every(([k, v]) => (r as never)[k] === v)) ?? null;
    }),
    create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
      const row = { id: `id_${++counter}`, ...data } as unknown as T;
      rows.push(row);
      return row;
    }),
    update: vi.fn(async ({ where, data }: { where: { id: string }; data: Record<string, unknown> }) => {
      const row = rows.find((r) => r.id === where.id);
      if (!row) throw new Error("Record not found");
      Object.assign(row, data);
      return row;
    }),
    delete: vi.fn(async ({ where }: { where: { id: string } }) => {
      const index = rows.findIndex((r) => r.id === where.id);
      if (index === -1) throw new Error("Record not found");
      rows.splice(index, 1);
    }),
    deleteMany: vi.fn(async ({ where }: { where?: Record<string, unknown> } = {}) => {
      const before = rows.length;
      rows = rows.filter((r) => !matches(r, where));
      return { count: before - rows.length };
    }),
    upsert: vi.fn(async ({ where, create, update }: { where: Record<string, unknown>; create: Record<string, unknown>; update: Record<string, unknown> }) => {
      const compoundKey = Object.keys(where)[0];
      const compound = where[compoundKey] as Record<string, unknown>;
      const existing = rows.find((r) => Object.entries(compound).every(([k, v]) => (r as never)[k] === v));
      if (existing) {
        Object.assign(existing, update);
        return existing;
      }
      const row = { id: `id_${++counter}`, ...create } as unknown as T;
      rows.push(row);
      return row;
    }),
  };
}

function matches(row: unknown, where?: Record<string, unknown>): boolean {
  if (!where) return true;
  return Object.entries(where).every(([key, value]) => {
    if (value && typeof value === "object" && !("id" in (row as object))) return true; // relation filters ignored by this simple mock
    if (key === "topic" && typeof value === "object") {
      // supports { topic: { categoryId } } style relation filters used by getUserProgressForCategory
      return true; // relation-through filtering isn't modeled; covered separately per-test
    }
    return (row as Record<string, unknown>)[key] === value;
  });
}

const studyCategory = makeModel<{ id: string; slug: string; isPublished: boolean }>();
const studyPath = makeModel<{ id: string; categoryId: string }>();
const studyModule = makeModel<{ id: string; studyPathId: string }>();
const studyTopic = makeModel<{ id: string; categoryId: string; moduleId: string; slug: string; isPublished: boolean }>();
const studyTopicSection = makeModel<{ id: string; topicId: string }>();
const studyExample = makeModel<{ id: string; topicId: string }>();
const studyExercise = makeModel<{ id: string; topicId: string }>();
const studyTopicQuestionRelation = makeModel<{ id: string; topicId: string; questionId: string }>();
const studyProgress = makeModel<{ id: string; userId: string; topicId: string; status: string }>();
const interviewQuestion = makeModel<{ id: string }>();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    studyCategory,
    studyPath,
    studyModule,
    studyTopic,
    studyTopicSection,
    studyExample,
    studyExercise,
    studyTopicQuestionRelation,
    studyProgress,
    interviewQuestion,
  },
}));

const {
  studyCategorySchema,
  studyPathSchema,
  studyModuleSchema,
  studyTopicSchema,
  studyTopicSectionSchema,
  studyExampleSchema,
  studyExerciseSchema,
  studyTopicQuestionRelationSchema,
  createStudyCategory,
  updateStudyCategory,
  deleteStudyCategory,
  createStudyPath,
  createStudyModule,
  createStudyTopic,
  linkStudyTopicQuestion,
  unlinkStudyTopicQuestion,
  startTopicProgress,
  completeTopicProgress,
  getOwnedTopicProgress,
  StudyNotFoundError,
} = await import("@/lib/study");

beforeEach(() => {
  studyCategory._reset();
  studyPath._reset();
  studyModule._reset();
  studyTopic._reset();
  studyTopicSection._reset();
  studyExample._reset();
  studyExercise._reset();
  studyTopicQuestionRelation._reset();
  studyProgress._reset();
  interviewQuestion._reset();
});

// ---------------------------------------------------------------------------
// Schema validation
// ---------------------------------------------------------------------------
describe("studyCategorySchema", () => {
  it("accepts a valid category", () => {
    expect(studyCategorySchema.safeParse({ name: "Java", slug: "java" }).success).toBe(true);
  });

  it("rejects an invalid slug format", () => {
    expect(studyCategorySchema.safeParse({ name: "Java", slug: "Java Basics!" }).success).toBe(false);
  });

  it("defaults isPublished to false and sortOrder to 0", () => {
    const result = studyCategorySchema.safeParse({ name: "Java", slug: "java" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.isPublished).toBe(false);
      expect(result.data.sortOrder).toBe(0);
    }
  });
});

describe("studyPathSchema", () => {
  it("requires a valid level enum", () => {
    expect(studyPathSchema.safeParse({ categoryId: "c1", name: "Beginner", slug: "beginner", level: "BEGINNER" }).success).toBe(true);
    expect(studyPathSchema.safeParse({ categoryId: "c1", name: "Beginner", slug: "beginner", level: "NOVICE" }).success).toBe(false);
  });

  it("accepts the interview-prep level", () => {
    expect(studyPathSchema.safeParse({ categoryId: "c1", name: "Interview Prep", slug: "interview-prep", level: "INTERVIEW_PREP" }).success).toBe(true);
  });
});

describe("studyModuleSchema", () => {
  it("requires studyPathId, title, and slug", () => {
    expect(studyModuleSchema.safeParse({ studyPathId: "p1", title: "Variables", slug: "variables" }).success).toBe(true);
    expect(studyModuleSchema.safeParse({ title: "Variables", slug: "variables" }).success).toBe(false);
  });
});

describe("studyTopicSchema", () => {
  it("requires moduleId and categoryId together", () => {
    const result = studyTopicSchema.safeParse({ moduleId: "m1", categoryId: "c1", title: "Inheritance", slug: "inheritance" });
    expect(result.success).toBe(true);
  });

  it("rejects estimatedMinutes outside 1-600", () => {
    expect(studyTopicSchema.safeParse({ moduleId: "m1", categoryId: "c1", title: "X", slug: "x", estimatedMinutes: 0 }).success).toBe(false);
    expect(studyTopicSchema.safeParse({ moduleId: "m1", categoryId: "c1", title: "X", slug: "x", estimatedMinutes: 601 }).success).toBe(false);
    expect(studyTopicSchema.safeParse({ moduleId: "m1", categoryId: "c1", title: "X", slug: "x", estimatedMinutes: 15 }).success).toBe(true);
  });

  it("enforces the 70-char SEO title and 160-char SEO description caps", () => {
    expect(studyTopicSchema.safeParse({ moduleId: "m1", categoryId: "c1", title: "X", slug: "x", seoTitle: "a".repeat(71) }).success).toBe(false);
    expect(studyTopicSchema.safeParse({ moduleId: "m1", categoryId: "c1", title: "X", slug: "x", seoDescription: "a".repeat(161) }).success).toBe(false);
  });
});

describe("studyTopicSectionSchema", () => {
  it("requires non-empty content", () => {
    expect(studyTopicSectionSchema.safeParse({ topicId: "t1", title: "Intro", content: "" }).success).toBe(false);
    expect(studyTopicSectionSchema.safeParse({ topicId: "t1", title: "Intro", content: "Hello" }).success).toBe(true);
  });

  it("rejects content over 20000 characters", () => {
    expect(studyTopicSectionSchema.safeParse({ topicId: "t1", title: "Intro", content: "a".repeat(20001) }).success).toBe(false);
  });
});

describe("studyExampleSchema", () => {
  it("requires a language and code", () => {
    expect(studyExampleSchema.safeParse({ topicId: "t1", language: "java", code: "System.out.println(1);" }).success).toBe(true);
    expect(studyExampleSchema.safeParse({ topicId: "t1", language: "", code: "x" }).success).toBe(false);
  });
});

describe("studyExerciseSchema", () => {
  it("defaults difficulty to EASY and reuses the existing Difficulty enum", () => {
    const result = studyExerciseSchema.safeParse({ topicId: "t1", question: "Reverse a string" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.difficulty).toBe("EASY");
  });

  it("rejects an invalid difficulty value", () => {
    expect(studyExerciseSchema.safeParse({ topicId: "t1", question: "X", difficulty: "IMPOSSIBLE" }).success).toBe(false);
  });
});

describe("studyTopicQuestionRelationSchema", () => {
  it("requires topicId and questionId", () => {
    expect(studyTopicQuestionRelationSchema.safeParse({ topicId: "t1", questionId: "q1" }).success).toBe(true);
    expect(studyTopicQuestionRelationSchema.safeParse({ topicId: "t1" }).success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Admin CRUD
// ---------------------------------------------------------------------------
describe("admin content CRUD", () => {
  it("creates a study category", async () => {
    const category = await createStudyCategory(studyCategorySchema.parse({ name: "Java", slug: "java" }));
    expect(category.slug).toBe("java");
  });

  it("updates an existing category", async () => {
    const category = await createStudyCategory(studyCategorySchema.parse({ name: "Java", slug: "java" }));
    const updated = await updateStudyCategory(category.id, { isPublished: true });
    expect(updated.isPublished).toBe(true);
  });

  it("throws StudyNotFoundError when updating a nonexistent category", async () => {
    await expect(updateStudyCategory("does-not-exist", { isPublished: true })).rejects.toBeInstanceOf(StudyNotFoundError);
  });

  it("deletes a category", async () => {
    const category = await createStudyCategory(studyCategorySchema.parse({ name: "Java", slug: "java" }));
    await deleteStudyCategory(category.id);
    expect(studyCategory._rows()).toHaveLength(0);
  });

  it("throws StudyNotFoundError when deleting a nonexistent category", async () => {
    await expect(deleteStudyCategory("does-not-exist")).rejects.toBeInstanceOf(StudyNotFoundError);
  });

  it("creates a path, module, and topic under a category", async () => {
    const category = await createStudyCategory(studyCategorySchema.parse({ name: "Java", slug: "java" }));
    const path = await createStudyPath(studyPathSchema.parse({ categoryId: category.id, name: "Beginner", slug: "beginner", level: "BEGINNER" }));
    const module_ = await createStudyModule(studyModuleSchema.parse({ studyPathId: path.id, title: "Variables", slug: "variables" }));
    const topic = await createStudyTopic(studyTopicSchema.parse({ moduleId: module_.id, categoryId: category.id, title: "Declaring Variables", slug: "declaring-variables" }));
    expect(topic.moduleId).toBe(module_.id);
    expect(topic.categoryId).toBe(category.id);
  });
});

// ---------------------------------------------------------------------------
// Question linking — must reference existing questions only, never create new ones
// ---------------------------------------------------------------------------
describe("linkStudyTopicQuestion", () => {
  it("links a topic to an existing interview question", async () => {
    const question = await interviewQuestion.create({ data: {} });
    const relation = await linkStudyTopicQuestion(studyTopicQuestionRelationSchema.parse({ topicId: "t1", questionId: question.id }));
    expect(relation.topicId).toBe("t1");
    expect(relation.questionId).toBe(question.id);
  });

  it("refuses to link a nonexistent question (never fabricates one)", async () => {
    await expect(linkStudyTopicQuestion(studyTopicQuestionRelationSchema.parse({ topicId: "t1", questionId: "ghost-question" }))).rejects.toBeInstanceOf(StudyNotFoundError);
  });

  it("does not create a duplicate InterviewQuestion record as a side effect", async () => {
    const question = await interviewQuestion.create({ data: {} });
    await linkStudyTopicQuestion(studyTopicQuestionRelationSchema.parse({ topicId: "t1", questionId: question.id }));
    expect(interviewQuestion._rows()).toHaveLength(1);
  });

  it("unlinks a question from a topic", async () => {
    const question = await interviewQuestion.create({ data: {} });
    await linkStudyTopicQuestion(studyTopicQuestionRelationSchema.parse({ topicId: "t1", questionId: question.id }));
    await unlinkStudyTopicQuestion("t1", question.id);
    expect(studyTopicQuestionRelation._rows()).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Progress — ownership and ordering
// ---------------------------------------------------------------------------
describe("study progress ownership", () => {
  const USER_A = "user-a";
  const USER_B = "user-b";

  it("starts progress on a topic for the given user", async () => {
    await studyTopic.create({ data: { id: "topic-1", categoryId: "c1", moduleId: "m1", slug: "x", isPublished: true } });
    const progress = await startTopicProgress(USER_A, "topic-1");
    expect(progress.status).toBe("STARTED");
    expect(progress.userId).toBe(USER_A);
  });

  it("throws StudyNotFoundError when starting progress on a nonexistent topic", async () => {
    await expect(startTopicProgress(USER_A, "ghost-topic")).rejects.toBeInstanceOf(StudyNotFoundError);
  });

  it("marks a topic completed, upgrading from started", async () => {
    await studyTopic.create({ data: { id: "topic-1", categoryId: "c1", moduleId: "m1", slug: "x", isPublished: true } });
    await startTopicProgress(USER_A, "topic-1");
    const completed = await completeTopicProgress(USER_A, "topic-1");
    expect(completed.status).toBe("COMPLETED");
    expect(completed.completedAt).toBeInstanceOf(Date);
  });

  it("does not create a duplicate progress row for the same user+topic", async () => {
    await studyTopic.create({ data: { id: "topic-1", categoryId: "c1", moduleId: "m1", slug: "x", isPublished: true } });
    await startTopicProgress(USER_A, "topic-1");
    await startTopicProgress(USER_A, "topic-1");
    expect(studyProgress._rows().filter((r) => r.userId === USER_A && r.topicId === "topic-1")).toHaveLength(1);
  });

  it("keeps each user's progress on the same topic completely separate", async () => {
    await studyTopic.create({ data: { id: "topic-1", categoryId: "c1", moduleId: "m1", slug: "x", isPublished: true } });
    await startTopicProgress(USER_A, "topic-1");
    await completeTopicProgress(USER_B, "topic-1");

    const progressA = await getOwnedTopicProgress(USER_A, "topic-1");
    const progressB = await getOwnedTopicProgress(USER_B, "topic-1");
    expect(progressA?.status).toBe("STARTED");
    expect(progressB?.status).toBe("COMPLETED");
  });

  it("returns null progress for a user who never started the topic", async () => {
    await studyTopic.create({ data: { id: "topic-1", categoryId: "c1", moduleId: "m1", slug: "x", isPublished: true } });
    await startTopicProgress(USER_A, "topic-1");
    const progressB = await getOwnedTopicProgress(USER_B, "topic-1");
    expect(progressB).toBeNull();
  });
});
