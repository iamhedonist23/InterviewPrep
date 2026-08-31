import { describe, it, expect, vi, beforeEach } from "vitest";
import { utcDayStart, isSameUtcDay, utcDaysBetween, todayUtc } from "@/lib/date";

describe("date utilities", () => {
  it("truncates a date to UTC midnight", () => {
    const truncated = utcDayStart(new Date("2026-08-29T23:59:59.999Z"));
    expect(truncated.toISOString()).toBe("2026-08-29T00:00:00.000Z");
  });

  it("treats two timestamps on the same UTC day as the same day", () => {
    expect(isSameUtcDay(new Date("2026-08-29T00:00:01Z"), new Date("2026-08-29T23:59:59Z"))).toBe(true);
    expect(isSameUtcDay(new Date("2026-08-29T23:59:59Z"), new Date("2026-08-30T00:00:01Z"))).toBe(false);
  });

  it("counts whole UTC days between two dates", () => {
    expect(utcDaysBetween(new Date("2026-08-27T10:00:00Z"), new Date("2026-08-29T02:00:00Z"))).toBe(2);
  });

  it("returns a UTC-midnight Date for today", () => {
    expect(todayUtc().getUTCHours()).toBe(0);
  });
});

const practiceSessionFindMany = vi.fn();
const studyProgressFindMany = vi.fn();
const dailyChallengeFindMany = vi.fn();
const practiceResponseCount = vi.fn();
const practiceResponseAggregate = vi.fn();
const dailyChallengeFindUnique = vi.fn();
const dailyChallengeCreate = vi.fn();
const interviewQuestionFindMany = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    practiceSession: { findMany: practiceSessionFindMany },
    studyProgress: { findMany: studyProgressFindMany },
    dailyChallenge: { findMany: dailyChallengeFindMany, findUnique: dailyChallengeFindUnique, create: dailyChallengeCreate },
    practiceResponse: { count: practiceResponseCount, aggregate: practiceResponseAggregate, findMany: vi.fn() },
    interviewQuestion: { findMany: interviewQuestionFindMany },
  },
}));

const { getStreak, getPracticeTotals, bucketFor } = await import("@/lib/analytics");
const { getOrCreateTodayChallenge } = await import("@/lib/daily-challenge");

beforeEach(() => {
  practiceSessionFindMany.mockReset().mockResolvedValue([]);
  studyProgressFindMany.mockReset().mockResolvedValue([]);
  dailyChallengeFindMany.mockReset().mockResolvedValue([]);
  practiceResponseCount.mockReset();
  practiceResponseAggregate.mockReset();
  dailyChallengeFindUnique.mockReset();
  dailyChallengeCreate.mockReset();
  interviewQuestionFindMany.mockReset();
});

describe("bucketFor", () => {
  it("classifies scores into strong / developing / needsWork", () => {
    expect(bucketFor(85)).toBe("strong");
    expect(bucketFor(70)).toBe("strong");
    expect(bucketFor(55)).toBe("developing");
    expect(bucketFor(20)).toBe("needsWork");
  });
});

describe("getStreak", () => {
  it("returns zero streaks when there is no activity", async () => {
    const result = await getStreak("user-1");
    expect(result).toEqual({ currentStreak: 0, longestStreak: 0, lastActiveDate: null });
  });

  it("counts consecutive days ending today as the current streak", async () => {
    const today = todayUtc();
    const yesterday = new Date(today.getTime() - 86400000);
    const twoDaysAgo = new Date(today.getTime() - 2 * 86400000);
    practiceSessionFindMany.mockResolvedValue([{ completedAt: today }, { completedAt: yesterday }, { completedAt: twoDaysAgo }]);
    const result = await getStreak("user-1");
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
  });

  it("resets current streak to zero if the last activity was more than a day ago, but keeps the longest streak", async () => {
    const today = todayUtc();
    const fiveDaysAgo = new Date(today.getTime() - 5 * 86400000);
    const sixDaysAgo = new Date(today.getTime() - 6 * 86400000);
    practiceSessionFindMany.mockResolvedValue([{ completedAt: fiveDaysAgo }, { completedAt: sixDaysAgo }]);
    const result = await getStreak("user-1");
    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(2);
  });

  it("counts activity from study progress and daily challenges too, deduplicating same-day activity across sources", async () => {
    const today = todayUtc();
    practiceSessionFindMany.mockResolvedValue([{ completedAt: today }]);
    studyProgressFindMany.mockResolvedValue([{ updatedAt: today }]);
    dailyChallengeFindMany.mockResolvedValue([{ completedAt: today }]);
    const result = await getStreak("user-1");
    expect(result.currentStreak).toBe(1);
  });
});

describe("getPracticeTotals", () => {
  it("scopes every count and aggregate to the given user", async () => {
    practiceResponseCount.mockResolvedValueOnce(20).mockResolvedValueOnce(3);
    practiceResponseAggregate.mockResolvedValue({ _avg: { score: 64.4 }, _count: { score: 17 } });
    const totals = await getPracticeTotals("user-1");
    expect(totals).toEqual({ attempted: 20, skipped: 3, scored: 17, averageScore: 64 });
    expect(practiceResponseCount).toHaveBeenNthCalledWith(1, { where: { session: { userId: "user-1" } } });
    expect(practiceResponseCount).toHaveBeenNthCalledWith(2, { where: { session: { userId: "user-1" }, skipped: true } });
  });

  it("returns a null average when nothing has been scored yet", async () => {
    practiceResponseCount.mockResolvedValue(0);
    practiceResponseAggregate.mockResolvedValue({ _avg: { score: null }, _count: { score: 0 } });
    const totals = await getPracticeTotals("user-1");
    expect(totals.averageScore).toBeNull();
  });
});

describe("getOrCreateTodayChallenge", () => {
  it("returns the existing challenge for today without creating a new one", async () => {
    const existing = { id: "c1", userId: "user-1", questionIds: ["q1", "q2", "q3"] };
    dailyChallengeFindUnique.mockResolvedValue(existing);
    const result = await getOrCreateTodayChallenge("user-1", []);
    expect(result).toBe(existing);
    expect(dailyChallengeCreate).not.toHaveBeenCalled();
  });

  it("creates a new challenge deterministically from the published question pool when none exists yet", async () => {
    dailyChallengeFindUnique.mockResolvedValue(null);
    interviewQuestionFindMany.mockResolvedValue(Array.from({ length: 10 }, (_, index) => ({ id: `q${index}` })));
    dailyChallengeCreate.mockImplementation(async ({ data }) => ({ id: "new", ...data }));
    const result = await getOrCreateTodayChallenge("user-1", []);
    expect(dailyChallengeCreate).toHaveBeenCalledTimes(1);
    expect(result?.questionIds).toHaveLength(3);
  });

  it("falls back to the winning row if creation loses a race against a concurrent request", async () => {
    dailyChallengeFindUnique.mockResolvedValueOnce(null);
    interviewQuestionFindMany.mockResolvedValue(Array.from({ length: 10 }, (_, index) => ({ id: `q${index}` })));
    dailyChallengeCreate.mockRejectedValue(new Error("unique constraint"));
    const winner = { id: "winner", userId: "user-1", questionIds: ["q0", "q7", "q4"] };
    dailyChallengeFindUnique.mockResolvedValueOnce(winner);
    const result = await getOrCreateTodayChallenge("user-1", []);
    expect(result).toBe(winner);
  });
});
