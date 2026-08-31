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

const {
  createResume,
  getOwnedResume,
  updateResume,
  deleteResume,
  listResumes,
  deleteInactiveResumes,
  updateResumeSchema,
  createResumeSchema,
  sectionOrderSchema,
  educationSchema,
  experienceSchema,
  projectSchema,
  skillSchema,
  certificationSchema,
  achievementSchema,
  languageSchema,
  customSectionSchema,
  ResumeNotFoundError,
  ResumeLimitError,
  RESUME_LIMITS,
} = await import("@/lib/resume");

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

describe("personalInfo validation accepts DB-shaped payloads", () => {
  it("accepts null values for optional fields (as returned by Prisma for unset columns)", () => {
    const result = updateResumeSchema.safeParse({
      title: "Suresh",
      template: "classic",
      personalInfo: {
        id: "cmtb5kttx0002ffq4c30tcwjl",
        resumeId: "cmtb5kttx0001ffq4j2d8156c",
        fullName: "Suresh Mali",
        professionalTitle: "Android developer",
        email: "suresh.mali@6dtech.co.in",
        phone: "7016226816",
        location: "Udaipur",
        website: "https://mail.google.com/",
        linkedin: "https://mail.google.com/",
        github: null,
        portfolio: null,
        summary: "Test",
        createdAt: "2026-08-27T06:39:55.653Z",
        updatedAt: "2026-08-27T06:39:55.653Z",
      },
    });
    expect(result.success).toBe(true);
  });

  it("accepts undefined and empty-string optional fields the same way", () => {
    const result = updateResumeSchema.safeParse({
      personalInfo: { fullName: "Jane", email: "", github: undefined, portfolio: null },
    });
    expect(result.success).toBe(true);
  });

  it("still rejects a genuinely invalid email", () => {
    const result = updateResumeSchema.safeParse({ personalInfo: { email: "not-an-email" } });
    expect(result.success).toBe(false);
  });

  it("still rejects a genuinely invalid URL", () => {
    const result = updateResumeSchema.safeParse({ personalInfo: { website: "not a url at all" } });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// createResumeSchema
// ---------------------------------------------------------------------------
describe("createResumeSchema", () => {
  it("accepts a valid title and defaults the template to classic", () => {
    const result = createResumeSchema.safeParse({ title: "Frontend Developer Resume" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.template).toBe("classic");
  });

  it("rejects an empty title", () => {
    expect(createResumeSchema.safeParse({ title: "" }).success).toBe(false);
  });

  it("rejects a missing title", () => {
    expect(createResumeSchema.safeParse({}).success).toBe(false);
  });

  it("rejects a title over 150 characters", () => {
    expect(createResumeSchema.safeParse({ title: "a".repeat(151) }).success).toBe(false);
  });

  it("accepts a custom template name", () => {
    const result = createResumeSchema.safeParse({ title: "My Resume", template: "modern" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.template).toBe("modern");
  });
});

// ---------------------------------------------------------------------------
// sectionOrderSchema
// ---------------------------------------------------------------------------
describe("sectionOrderSchema", () => {
  it("accepts a valid reordering of known sections", () => {
    expect(sectionOrderSchema.safeParse(["summary", "skills", "experience", "education"]).success).toBe(true);
  });

  it("rejects an unknown section name", () => {
    expect(sectionOrderSchema.safeParse(["summary", "hobbies"]).success).toBe(false);
  });

  it("rejects more than 20 entries", () => {
    expect(sectionOrderSchema.safeParse(Array(21).fill("summary")).success).toBe(false);
  });

  it("accepts an empty order", () => {
    expect(sectionOrderSchema.safeParse([]).success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Per-section schema validation
// ---------------------------------------------------------------------------
describe("educationSchema", () => {
  it("accepts a minimal valid entry with institution provided", () => {
    expect(educationSchema.safeParse({ institution: "MIT" }).success).toBe(true);
  });

  it("accepts an entry with no fields at all — no resume field is mandatory", () => {
    expect(educationSchema.safeParse({}).success).toBe(true);
    expect(educationSchema.safeParse({ degree: "B.Tech" }).success).toBe(true);
  });

  it("accepts an empty institution string", () => {
    expect(educationSchema.safeParse({ institution: "" }).success).toBe(true);
  });

  it("coerces valid date strings", () => {
    const result = educationSchema.safeParse({ institution: "MIT", startDate: "2020-01-01", endDate: "2024-01-01" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.startDate).toBeInstanceOf(Date);
  });

  it("accepts null dates", () => {
    expect(educationSchema.safeParse({ institution: "MIT", startDate: null, endDate: null }).success).toBe(true);
  });

  it("rejects an unparseable date string", () => {
    expect(educationSchema.safeParse({ institution: "MIT", startDate: "not-a-date" }).success).toBe(false);
  });

  it("defaults isCurrent to false and sortOrder to 0", () => {
    const result = educationSchema.safeParse({ institution: "MIT" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.isCurrent).toBe(false);
      expect(result.data.sortOrder).toBe(0);
    }
  });
});

describe("experienceSchema", () => {
  it("does not require company or jobTitle — no resume field is mandatory", () => {
    expect(experienceSchema.safeParse({ company: "Acme" }).success).toBe(true);
    expect(experienceSchema.safeParse({ jobTitle: "Engineer" }).success).toBe(true);
    expect(experienceSchema.safeParse({}).success).toBe(true);
    expect(experienceSchema.safeParse({ company: "Acme", jobTitle: "Engineer" }).success).toBe(true);
  });

  it("accepts a list of achievement bullets", () => {
    const result = experienceSchema.safeParse({
      company: "Acme",
      jobTitle: "Engineer",
      achievements: ["Shipped feature X", "Reduced latency by 30%"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects more than maxBulletsPerEntry achievements", () => {
    const tooMany = Array(RESUME_LIMITS.maxBulletsPerEntry + 1).fill("Did something");
    expect(experienceSchema.safeParse({ company: "Acme", jobTitle: "Engineer", achievements: tooMany }).success).toBe(false);
  });

  it("rejects a single achievement bullet over 500 characters", () => {
    const result = experienceSchema.safeParse({ company: "Acme", jobTitle: "Engineer", achievements: ["a".repeat(501)] });
    expect(result.success).toBe(false);
  });

  it("rejects a description over 2000 characters", () => {
    const result = experienceSchema.safeParse({ company: "Acme", jobTitle: "Engineer", description: "a".repeat(2001) });
    expect(result.success).toBe(false);
  });
});

describe("projectSchema", () => {
  it("does not require a project name — no resume field is mandatory", () => {
    expect(projectSchema.safeParse({}).success).toBe(true);
    expect(projectSchema.safeParse({ name: "Portfolio Site" }).success).toBe(true);
  });

  it("auto-prefixes a bare domain URL with https://", () => {
    const result = projectSchema.safeParse({ name: "API", projectUrl: "github.com/me/api" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.projectUrl).toBe("https://github.com/me/api");
  });

  it("rejects a genuinely invalid project URL", () => {
    expect(projectSchema.safeParse({ name: "API", projectUrl: "not a url" }).success).toBe(false);
  });

  it("accepts a technologies array and rejects more than 30 entries", () => {
    expect(projectSchema.safeParse({ name: "API", technologies: ["Node.js", "PostgreSQL"] }).success).toBe(true);
    expect(projectSchema.safeParse({ name: "API", technologies: Array(31).fill("x") }).success).toBe(false);
  });
});

describe("skillSchema", () => {
  it("does not require a name — no resume field is mandatory", () => {
    expect(skillSchema.safeParse({}).success).toBe(true);
    expect(skillSchema.safeParse({ name: "React" }).success).toBe(true);
  });

  it("accepts a valid level enum value", () => {
    expect(skillSchema.safeParse({ name: "React", level: "ADVANCED" }).success).toBe(true);
  });

  it("rejects an invalid level value", () => {
    expect(skillSchema.safeParse({ name: "React", level: "GODLIKE" }).success).toBe(false);
  });

  it("accepts a null level", () => {
    expect(skillSchema.safeParse({ name: "React", level: null }).success).toBe(true);
  });
});

describe("certificationSchema", () => {
  it("does not require a name — no resume field is mandatory", () => {
    expect(certificationSchema.safeParse({}).success).toBe(true);
    expect(certificationSchema.safeParse({ name: "AWS Certified" }).success).toBe(true);
  });

  it("auto-prefixes credentialUrl and validates it", () => {
    const result = certificationSchema.safeParse({ name: "AWS Certified", credentialUrl: "aws.amazon.com/verify/123" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.credentialUrl).toBe("https://aws.amazon.com/verify/123");
  });
});

describe("achievementSchema", () => {
  it("does not require a title — no resume field is mandatory", () => {
    expect(achievementSchema.safeParse({}).success).toBe(true);
    expect(achievementSchema.safeParse({ title: "Employee of the Month" }).success).toBe(true);
  });

  it("rejects a description over 1000 characters", () => {
    expect(achievementSchema.safeParse({ title: "Award", description: "a".repeat(1001) }).success).toBe(false);
  });
});

describe("languageSchema", () => {
  it("does not require a name, and defaults proficiency to CONVERSATIONAL", () => {
    const result = languageSchema.safeParse({ name: "Spanish" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.proficiency).toBe("CONVERSATIONAL");
    expect(languageSchema.safeParse({}).success).toBe(true);
  });

  it("rejects an invalid proficiency value", () => {
    expect(languageSchema.safeParse({ name: "Spanish", proficiency: "EXPERT" }).success).toBe(false);
  });
});

describe("customSectionSchema", () => {
  it("does not require a title — no resume field is mandatory", () => {
    expect(customSectionSchema.safeParse({}).success).toBe(true);
    expect(customSectionSchema.safeParse({ title: "Volunteer Work" }).success).toBe(true);
  });

  it("rejects content over 5000 characters", () => {
    expect(customSectionSchema.safeParse({ title: "Volunteer Work", content: "a".repeat(5001) }).success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Array-level caps enforced through updateResumeSchema (mirrors what the
// PATCH /api/resumes/:id route actually validates against)
// ---------------------------------------------------------------------------
describe("updateResumeSchema array limits", () => {
  const cases: Array<[string, number]> = [
    ["education", RESUME_LIMITS.maxEducation],
    ["experience", RESUME_LIMITS.maxExperience],
    ["projects", RESUME_LIMITS.maxProjects],
    ["skills", RESUME_LIMITS.maxSkills],
    ["certifications", RESUME_LIMITS.maxCertifications],
    ["achievements", RESUME_LIMITS.maxAchievements],
    ["languages", RESUME_LIMITS.maxLanguages],
    ["customSections", RESUME_LIMITS.maxCustomSections],
  ];

  const minimalItem: Record<string, Record<string, unknown>> = {
    education: { institution: "X" },
    experience: { company: "X", jobTitle: "X" },
    projects: { name: "X" },
    skills: { name: "X" },
    certifications: { name: "X" },
    achievements: { title: "X" },
    languages: { name: "X" },
    customSections: { title: "X" },
  };

  it.each(cases)("accepts exactly the max number of %s entries", (section, max) => {
    const result = updateResumeSchema.safeParse({ [section]: Array(max).fill(minimalItem[section]) });
    expect(result.success).toBe(true);
  });

  it.each(cases)("rejects one more than the max number of %s entries", (section, max) => {
    const result = updateResumeSchema.safeParse({ [section]: Array(max + 1).fill(minimalItem[section]) });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// End-to-end persistence: updateResume() actually writes every section
// through the (mocked) transaction, scoped to the correct resume.
// ---------------------------------------------------------------------------
describe("updateResume persists all sections", () => {
  it("writes experience, education, skills, and other sections for the owning user", async () => {
    const created = await createResume(USER_A, { title: "Full Resume", template: "classic" });

    const parsed = updateResumeSchema.parse({
      experience: [{ company: "Acme", jobTitle: "Engineer", achievements: ["Did a thing"] }],
      education: [{ institution: "MIT", degree: "B.Tech" }],
      skills: [{ name: "TypeScript" }, { name: "React" }],
      projects: [{ name: "Portfolio" }],
      certifications: [{ name: "AWS Certified" }],
      achievements: [{ title: "Award" }],
      languages: [{ name: "Spanish" }],
      customSections: [{ title: "Volunteer Work", content: "Helped out" }],
    });
    await updateResume(USER_A, created.id, parsed);

    expect(await childStores.resumeExperience.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
    expect(await childStores.resumeEducation.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
    expect(await childStores.resumeSkill.findMany({ where: { resumeId: created.id } })).toHaveLength(2);
    expect(await childStores.resumeProject.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
    expect(await childStores.resumeCertification.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
    expect(await childStores.resumeAchievement.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
    expect(await childStores.resumeLanguage.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
    expect(await childStores.resumeCustomSection.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
  });

  it("fully replaces a section's contents on the next save rather than appending", async () => {
    const created = await createResume(USER_A, { title: "Resume", template: "classic" });

    await updateResume(USER_A, created.id, updateResumeSchema.parse({ skills: [{ name: "React" }, { name: "Vue" }] }));
    expect(await childStores.resumeSkill.findMany({ where: { resumeId: created.id } })).toHaveLength(2);

    await updateResume(USER_A, created.id, updateResumeSchema.parse({ skills: [{ name: "TypeScript" }] }));
    const skills = await childStores.resumeSkill.findMany({ where: { resumeId: created.id } });
    expect(skills).toHaveLength(1);
    expect(skills[0]).toMatchObject({ name: "TypeScript" });
  });

  it("clears a section entirely when given an empty array", async () => {
    const created = await createResume(USER_A, { title: "Resume", template: "classic" });
    await updateResume(USER_A, created.id, updateResumeSchema.parse({ skills: [{ name: "React" }] }));
    await updateResume(USER_A, created.id, updateResumeSchema.parse({ skills: [] }));
    expect(await childStores.resumeSkill.findMany({ where: { resumeId: created.id } })).toHaveLength(0);
  });

  it("does not touch a section that wasn't included in the update", async () => {
    const created = await createResume(USER_A, { title: "Resume", template: "classic" });
    await updateResume(USER_A, created.id, updateResumeSchema.parse({ skills: [{ name: "React" }] }));
    await updateResume(USER_A, created.id, updateResumeSchema.parse({ title: "Renamed Resume" })); // no `skills` key at all
    expect(await childStores.resumeSkill.findMany({ where: { resumeId: created.id } })).toHaveLength(1);
  });

  it("scopes section writes to the correct resume when a user has multiple resumes", async () => {
    const resumeOne = await createResume(USER_A, { title: "Resume One", template: "classic" });
    const resumeTwo = await createResume(USER_A, { title: "Resume Two", template: "classic" });

    await updateResume(USER_A, resumeOne.id, updateResumeSchema.parse({ skills: [{ name: "React" }] }));
    await updateResume(USER_A, resumeTwo.id, updateResumeSchema.parse({ skills: [{ name: "Vue" }, { name: "Svelte" }] }));

    expect(await childStores.resumeSkill.findMany({ where: { resumeId: resumeOne.id } })).toHaveLength(1);
    expect(await childStores.resumeSkill.findMany({ where: { resumeId: resumeTwo.id } })).toHaveLength(2);
  });
});
