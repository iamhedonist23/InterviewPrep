import { describe, it, expect, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// In-memory fake of the slice of Prisma used by lib/resume.ts.
// This lets us verify ownership logic (the actual point of Phase 13)
// without a live Postgres connection.
// ---------------------------------------------------------------------------
type FakeResume = {
  id: string;
  userId: string;
  title: string;
  template: string;
  isDefault: boolean;
  sectionOrder: unknown;
  lastEditedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

let resumes: FakeResume[] = [];
let personalInfos: Record<string, Record<string, unknown>> = {};
let idCounter = 0;
const nextId = () => `resume_${++idCounter}`;

function makeChildStore() {
  const rows: Record<string, unknown>[] = [];
  return {
    findMany: vi.fn(async ({ where }: { where: { resumeId: string } }) =>
      rows.filter((r) => r.resumeId === where.resumeId),
    ),
    deleteMany: vi.fn(async ({ where }: { where: { resumeId: string } }) => {
      for (let i = rows.length - 1; i >= 0; i--) if (rows[i].resumeId === where.resumeId) rows.splice(i, 1);
    }),
    createMany: vi.fn(async ({ data }: { data: Record<string, unknown>[] }) => {
      rows.push(...data);
    }),
  };
}

const childStores = {
  resumeEducation: makeChildStore(),
  resumeExperience: makeChildStore(),
  resumeProject: makeChildStore(),
  resumeSkill: makeChildStore(),
  resumeCertification: makeChildStore(),
  resumeAchievement: makeChildStore(),
  resumeLanguage: makeChildStore(),
  resumeCustomSection: makeChildStore(),
};

const fakeTx = {
  resume: {
    findFirst: vi.fn(async ({ where }: { where: { id: string; userId: string } }) =>
      resumes.find((r) => r.id === where.id && r.userId === where.userId) ?? null,
    ),
    findFirstOrThrow: vi.fn(async ({ where }: { where: { id: string; userId: string } }) => {
      const found = resumes.find((r) => r.id === where.id && r.userId === where.userId);
      if (!found) throw new Error("not found");
      return { ...found, personalInfo: personalInfos[found.id] ?? null };
    }),
    update: vi.fn(async ({ where, data }: { where: { id: string }; data: Partial<FakeResume> }) => {
      const resume = resumes.find((r) => r.id === where.id)!;
      Object.assign(resume, Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)));
      return resume;
    }),
    updateMany: vi.fn(async ({ where, data }: { where: { userId: string; NOT?: { id: string } }; data: { isDefault: boolean } }) => {
      for (const r of resumes) if (r.userId === where.userId && r.id !== where.NOT?.id) r.isDefault = data.isDefault;
    }),
  },
  resumePersonalInfo: {
    upsert: vi.fn(async ({ where, create, update }: { where: { resumeId: string }; create: Record<string, unknown>; update: Record<string, unknown> }) => {
      personalInfos[where.resumeId] = { ...(personalInfos[where.resumeId] ?? create), ...update };
    }),
  },
  ...childStores,
};

const prismaMock = {
  resume: {
    findMany: vi.fn(async ({ where }: { where: { userId: string } }) => resumes.filter((r) => r.userId === where.userId)),
    findFirst: vi.fn(async ({ where }: { where: { id: string; userId: string } }) =>
      resumes.find((r) => r.id === where.id && r.userId === where.userId) ?? null,
    ),
    count: vi.fn(async ({ where }: { where: { userId: string } }) => resumes.filter((r) => r.userId === where.userId).length),
    create: vi.fn(async ({ data }: { data: Partial<FakeResume> & { userId: string; title: string } }) => {
      const resume: FakeResume = {
        id: nextId(),
        userId: data.userId,
        title: data.title,
        template: data.template ?? "classic",
        isDefault: Boolean(data.isDefault),
        sectionOrder: [],
        lastEditedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      resumes.push(resume);
      personalInfos[resume.id] = {};
      return { ...resume, personalInfo: personalInfos[resume.id] };
    }),
    delete: vi.fn(async ({ where }: { where: { id: string } }) => {
      resumes = resumes.filter((r) => r.id !== where.id);
    }),
    deleteMany: vi.fn(async ({ where }: { where: { lastEditedAt: { lt: Date } } }) => {
      const before = resumes.length;
      resumes = resumes.filter((r) => r.lastEditedAt >= where.lastEditedAt.lt);
      return { count: before - resumes.length };
    }),
  },
  $transaction: vi.fn(async (fn: (tx: typeof fakeTx) => unknown) => fn(fakeTx)),
};

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

const { createResume, getOwnedResume, updateResume, deleteResume, listResumes, deleteInactiveResumes, ResumeNotFoundError, ResumeLimitError, RESUME_LIMITS } = await import(
  "@/lib/resume"
);

const USER_A = "user_a";
const USER_B = "user_b";

beforeEach(() => {
  resumes = [];
  personalInfos = {};
  idCounter = 0;
  vi.clearAllMocks();
});

describe("resume ownership and CRUD", () => {
  it("creates a resume for the authenticated user", async () => {
    const resume = await createResume(USER_A, { title: "Software Developer Resume", template: "classic" });
    expect(resume.userId).toBe(USER_A);
    expect(resume.title).toBe("Software Developer Resume");
    expect(resume.isDefault).toBe(true); // first resume becomes default
  });

  it("allows a user to have multiple resumes", async () => {
    await createResume(USER_A, { title: "Software Developer Resume", template: "classic" });
    await createResume(USER_A, { title: "Android Developer Resume", template: "modern" });
    await createResume(USER_A, { title: "Java Developer Resume", template: "modern" });
    const list = await listResumes(USER_A);
    expect(list).toHaveLength(3);
  });

  it("enforces a maximum number of resumes per user", async () => {
    for (let i = 0; i < RESUME_LIMITS.maxResumesPerUser; i++) {
      await createResume(USER_A, { title: `Resume ${i}`, template: "classic" });
    }
    await expect(createResume(USER_A, { title: "One too many", template: "classic" })).rejects.toBeInstanceOf(ResumeLimitError);
  });

  it("lets a user read their own resume", async () => {
    const created = await createResume(USER_A, { title: "My Resume", template: "classic" });
    const found = await getOwnedResume(USER_A, created.id);
    expect(found.id).toBe(created.id);
  });

  it("prevents a user from reading another user's resume", async () => {
    const created = await createResume(USER_A, { title: "My Resume", template: "classic" });
    await expect(getOwnedResume(USER_B, created.id)).rejects.toBeInstanceOf(ResumeNotFoundError);
  });

  it("lets a user update their own resume", async () => {
    const created = await createResume(USER_A, { title: "Old Title", template: "classic" });
    const updated = await updateResume(USER_A, created.id, { title: "New Title" });
    expect(updated.title).toBe("New Title");
  });

  it("prevents a user from updating another user's resume", async () => {
    const created = await createResume(USER_A, { title: "My Resume", template: "classic" });
    await expect(updateResume(USER_B, created.id, { title: "Hacked" })).rejects.toBeInstanceOf(ResumeNotFoundError);
  });

  it("lets a user delete their own resume", async () => {
    const created = await createResume(USER_A, { title: "My Resume", template: "classic" });
    await deleteResume(USER_A, created.id);
    await expect(getOwnedResume(USER_A, created.id)).rejects.toBeInstanceOf(ResumeNotFoundError);
  });

  it("prevents a user from deleting another user's resume", async () => {
    const created = await createResume(USER_A, { title: "My Resume", template: "classic" });
    await expect(deleteResume(USER_B, created.id)).rejects.toBeInstanceOf(ResumeNotFoundError);
    const stillThere = await getOwnedResume(USER_A, created.id);
    expect(stillThere.id).toBe(created.id);
  });

  it("updates personal info and section order together", async () => {
    const created = await createResume(USER_A, { title: "My Resume", template: "classic" });
    const updated = await updateResume(USER_A, created.id, {
      sectionOrder: ["summary", "skills", "experience", "education"],
      personalInfo: { fullName: "Jane Doe", email: "jane@example.com" },
    });
    expect(updated.sectionOrder).toEqual(["summary", "skills", "experience", "education"]);
    expect(personalInfos[created.id]).toMatchObject({ fullName: "Jane Doe", email: "jane@example.com" });
  });
});

describe("inactive resume cleanup", () => {
  it("deletes resumes not edited within the inactivity window and keeps recent ones", async () => {
    const stale = await createResume(USER_A, { title: "Stale Resume", template: "classic" });
    const fresh = await createResume(USER_A, { title: "Fresh Resume", template: "classic" });

    const staleRecord = resumes.find((r) => r.id === stale.id)!;
    staleRecord.lastEditedAt = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // 10 days ago

    const deletedCount = await deleteInactiveResumes(7);

    expect(deletedCount).toBe(1);
    await expect(getOwnedResume(USER_A, stale.id)).rejects.toBeInstanceOf(ResumeNotFoundError);
    const stillThere = await getOwnedResume(USER_A, fresh.id);
    expect(stillThere.id).toBe(fresh.id);
  });

  it("does not delete anything when all resumes are recently edited", async () => {
    await createResume(USER_A, { title: "Active Resume", template: "classic" });
    const deletedCount = await deleteInactiveResumes(7);
    expect(deletedCount).toBe(0);
  });
});
