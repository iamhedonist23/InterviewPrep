import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@prisma/client", () => ({
  ExperienceLevel: { FRESHER: "FRESHER", INTERNSHIP: "INTERNSHIP", MID_LEVEL: "MID_LEVEL", EXPERIENCED: "EXPERIENCED" },
  Difficulty: { EASY: "EASY", MEDIUM: "MEDIUM", HARD: "HARD" },
}));

const userFindUnique = vi.fn();
const userUpdate = vi.fn();
const studyProgressFindMany = vi.fn();
const studyProgressCount = vi.fn();
const studyTopicFindMany = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: { findUnique: userFindUnique, update: userUpdate },
    studyProgress: { findMany: studyProgressFindMany, count: studyProgressCount },
    studyTopic: { findMany: studyTopicFindMany },
  },
}));

const { onboardingSchema, completeOnboarding, getUserProfile, TARGET_ROLES, TECHNOLOGY_OPTIONS } = await import("@/lib/user-profile");
const { getStudyProgressTotals, getRecommendedTopics } = await import("@/lib/study");

beforeEach(() => {
  userFindUnique.mockReset();
  userUpdate.mockReset();
  studyProgressFindMany.mockReset();
  studyProgressCount.mockReset();
  studyTopicFindMany.mockReset();
});

describe("onboardingSchema", () => {
  it("accepts a fully valid onboarding submission", () => {
    const result = onboardingSchema.safeParse({
      targetRole: TARGET_ROLES[0],
      experienceLevel: "MID_LEVEL",
      preferredTechnologies: [TECHNOLOGY_OPTIONS[0], TECHNOLOGY_OPTIONS[1]],
      dailyGoalMinutes: 30,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a target role outside the fixed option list", () => {
    const result = onboardingSchema.safeParse({
      targetRole: "Made Up Role",
      experienceLevel: "MID_LEVEL",
      preferredTechnologies: [TECHNOLOGY_OPTIONS[0]],
      dailyGoalMinutes: 30,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty technologies array", () => {
    const result = onboardingSchema.safeParse({
      targetRole: TARGET_ROLES[0],
      experienceLevel: "MID_LEVEL",
      preferredTechnologies: [],
      dailyGoalMinutes: 30,
    });
    expect(result.success).toBe(false);
  });

  it("rejects a daily goal outside 5-240 minutes", () => {
    expect(
      onboardingSchema.safeParse({ targetRole: TARGET_ROLES[0], experienceLevel: "MID_LEVEL", preferredTechnologies: [TECHNOLOGY_OPTIONS[0]], dailyGoalMinutes: 0 }).success,
    ).toBe(false);
    expect(
      onboardingSchema.safeParse({ targetRole: TARGET_ROLES[0], experienceLevel: "MID_LEVEL", preferredTechnologies: [TECHNOLOGY_OPTIONS[0]], dailyGoalMinutes: 300 }).success,
    ).toBe(false);
  });

  it("rejects an invalid experience level", () => {
    const result = onboardingSchema.safeParse({
      targetRole: TARGET_ROLES[0],
      experienceLevel: "EXPERT",
      preferredTechnologies: [TECHNOLOGY_OPTIONS[0]],
      dailyGoalMinutes: 30,
    });
    expect(result.success).toBe(false);
  });
});

describe("completeOnboarding", () => {
  it("sets onboardingCompleted true and writes all provided fields for the given user", async () => {
    userUpdate.mockResolvedValue({ onboardingCompleted: true });
    const input = onboardingSchema.parse({
      targetRole: TARGET_ROLES[0],
      experienceLevel: "MID_LEVEL",
      preferredTechnologies: [TECHNOLOGY_OPTIONS[0]],
      dailyGoalMinutes: 30,
    });
    await completeOnboarding("user-1", input);
    expect(userUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "user-1" },
        data: expect.objectContaining({ onboardingCompleted: true, targetRole: TARGET_ROLES[0] }),
      }),
    );
  });
});

describe("getUserProfile", () => {
  it("looks up the profile by the given userId only", async () => {
    userFindUnique.mockResolvedValue({ onboardingCompleted: false });
    await getUserProfile("user-1");
    expect(userFindUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id: "user-1" } }));
  });
});

describe("getStudyProgressTotals", () => {
  it("returns started and completed counts scoped to the given user", async () => {
    studyProgressCount.mockResolvedValueOnce(10).mockResolvedValueOnce(4);
    const totals = await getStudyProgressTotals("user-1");
    expect(totals).toEqual({ started: 10, completed: 4 });
    expect(studyProgressCount).toHaveBeenNthCalledWith(1, { where: { userId: "user-1" } });
    expect(studyProgressCount).toHaveBeenNthCalledWith(2, { where: { userId: "user-1", status: "COMPLETED" } });
  });
});

describe("getRecommendedTopics", () => {
  it("excludes topics the user already has progress on", async () => {
    studyProgressFindMany.mockResolvedValue([{ topicId: "topic-in-progress" }]);
    studyTopicFindMany.mockResolvedValue([]);
    await getRecommendedTopics("user-1", ["Java"], 4);
    expect(studyTopicFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ id: { notIn: ["topic-in-progress"] } }) }),
    );
  });

  it("filters by the user's preferred technologies, case-insensitively", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    studyTopicFindMany.mockResolvedValue([]);
    await getRecommendedTopics("user-1", ["java", "Python"], 4);
    expect(studyTopicFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ category: { isPublished: true, name: { in: ["java", "Python"], mode: "insensitive" } } }),
      }),
    );
  });

  it("falls back to any published category when the user has no preferred technologies", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    studyTopicFindMany.mockResolvedValue([]);
    await getRecommendedTopics("user-1", [], 4);
    expect(studyTopicFindMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ category: { isPublished: true } }) }));
  });

  it("only recommends topics whose module and study path are also published", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    studyTopicFindMany.mockResolvedValue([]);
    await getRecommendedTopics("user-1", [], 4);
    expect(studyTopicFindMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ module: { isPublished: true, studyPath: { isPublished: true } } }) }),
    );
  });
});

describe("getRecommendedTopics with weak-area boosting", () => {
  it("tags weak-area topics with a 'weakArea' reason and surfaces them first", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    studyTopicFindMany
      .mockResolvedValueOnce([{ id: "regular-1", title: "Regular topic", slug: "regular-1", estimatedMinutes: 5, category: { slug: "java", name: "Java" } }])
      .mockResolvedValueOnce([{ id: "weak-1", title: "Weak topic", slug: "weak-1", estimatedMinutes: 5, category: { slug: "sql", name: "SQL" } }]);
    const result = await getRecommendedTopics("user-1", ["Java"], 4, ["sql"]);
    expect(result[0]).toMatchObject({ id: "weak-1", reason: "weakArea" });
    expect(result[1]).toMatchObject({ id: "regular-1", reason: "interest" });
  });

  it("does not query for weak-area topics when no weak categories are given, and every recommendation is not tagged weakArea", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    studyTopicFindMany.mockResolvedValueOnce([{ id: "regular-1", title: "Regular topic", slug: "regular-1", estimatedMinutes: null, category: { slug: "java", name: "Java" } }]);
    const result = await getRecommendedTopics("user-1", ["Java"], 4);
    expect(studyTopicFindMany).toHaveBeenCalledTimes(1);
    expect(result.every(topic => topic.reason !== "weakArea")).toBe(true);
  });

  it("deduplicates a topic that appears in both the weak-area and regular candidate lists", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    const sharedTopic = { id: "shared-1", title: "Shared topic", slug: "shared-1", estimatedMinutes: 5, category: { slug: "sql", name: "SQL" } };
    studyTopicFindMany.mockResolvedValueOnce([sharedTopic]).mockResolvedValueOnce([sharedTopic]);
    const result = await getRecommendedTopics("user-1", ["SQL"], 4, ["sql"]);
    expect(result.filter(topic => topic.id === "shared-1")).toHaveLength(1);
    expect(result[0].reason).toBe("weakArea");
  });

  it("caps the merged result at the requested limit", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    const weak = Array.from({ length: 3 }, (_, i) => ({ id: `weak-${i}`, title: `Weak ${i}`, slug: `weak-${i}`, estimatedMinutes: null, category: { slug: "sql", name: "SQL" } }));
    const regular = Array.from({ length: 3 }, (_, i) => ({ id: `reg-${i}`, title: `Reg ${i}`, slug: `reg-${i}`, estimatedMinutes: null, category: { slug: "java", name: "Java" } }));
    studyTopicFindMany.mockResolvedValueOnce(regular).mockResolvedValueOnce(weak);
    const result = await getRecommendedTopics("user-1", ["Java"], 4, ["sql"]);
    expect(result).toHaveLength(4);
  });

  it("labels recommendations as 'nextUp' rather than 'interest' when the user has no preferred technologies", async () => {
    studyProgressFindMany.mockResolvedValue([]);
    studyTopicFindMany.mockResolvedValueOnce([{ id: "topic-1", title: "Topic", slug: "topic-1", estimatedMinutes: null, category: { slug: "java", name: "Java" } }]);
    const result = await getRecommendedTopics("user-1", [], 4);
    expect(result[0].reason).toBe("nextUp");
  });
});
