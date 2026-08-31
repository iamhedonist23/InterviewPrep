import { prisma } from "@/lib/prisma";
import { todayUtc, utcDayStart, utcDaysBetween } from "@/lib/date";

// ---------------------------------------------------------------------------
// Practice analytics.
//
// Important, deliberate scoping note: practice answers here are open-ended
// free text, self-checked by lib/practice.ts's simpleScore() heuristic
// (0-100), which the product already and correctly labels to users as
// "a simple answer-length and key-point check... not a scientifically
// accurate evaluation." There is no ground-truth right/wrong for an
// open-ended interview answer, so this module deliberately does NOT report
// a fabricated "correct answers / incorrect answers" binary count — doing so
// would misrepresent a soft heuristic as a graded, authoritative judgment.
// Instead it reports the real, honest signals the data actually supports:
// attempted / skipped / scored counts, an average, and a descriptive
// strength bucket (Strong / Developing / Needs work) for breakdowns.
// ---------------------------------------------------------------------------

export type StrengthBucket = "strong" | "developing" | "needsWork";

function bucketFor(score: number): StrengthBucket {
  if (score >= 70) return "strong";
  if (score >= 40) return "developing";
  return "needsWork";
}

export async function getPracticeTotals(userId: string) {
  const [attempted, skipped, scoreAgg] = await Promise.all([
    prisma.practiceResponse.count({ where: { session: { userId } } }),
    prisma.practiceResponse.count({ where: { session: { userId }, skipped: true } }),
    prisma.practiceResponse.aggregate({
      where: { session: { userId }, skipped: false, score: { not: null } },
      _avg: { score: true },
      _count: { score: true },
    }),
  ]);
  return {
    attempted,
    skipped,
    scored: scoreAgg._count.score,
    averageScore: scoreAgg._avg.score === null ? null : Math.round(scoreAgg._avg.score),
  };
}

// A single, narrow, selective fetch of one user's own response history.
// Prisma's groupBy can't group by a related table's column (category,
// difficulty live on InterviewQuestion, not PracticeResponse), and this data
// is bounded to one person's own practice history — not "every question" —
// so a scoped select is the right tool here rather than N+1 per-category
// aggregate queries or a raw SQL join.
async function getOwnResponseBreakdownRows(userId: string) {
  return prisma.practiceResponse.findMany({
    where: { session: { userId } },
    select: {
      score: true,
      skipped: true,
      question: { select: { difficulty: true, category: { select: { name: true, slug: true } } } },
    },
  });
}

export async function getCategoryPerformance(userId: string) {
  const rows = await getOwnResponseBreakdownRows(userId);
  const byCategory = new Map<string, { name: string; slug: string; scores: number[] }>();
  for (const row of rows) {
    if (row.skipped || row.score === null) continue;
    const key = row.question.category.slug;
    const bucket = byCategory.get(key) ?? { name: row.question.category.name, slug: key, scores: [] };
    bucket.scores.push(row.score);
    byCategory.set(key, bucket);
  }
  return [...byCategory.values()]
    .map(entry => ({
      name: entry.name,
      slug: entry.slug,
      averageScore: Math.round(entry.scores.reduce((sum, value) => sum + value, 0) / entry.scores.length),
      attempts: entry.scores.length,
    }))
    .sort((a, b) => a.averageScore - b.averageScore);
}

export async function getDifficultyPerformance(userId: string) {
  const rows = await getOwnResponseBreakdownRows(userId);
  const byDifficulty = new Map<string, number[]>();
  for (const row of rows) {
    if (row.skipped || row.score === null) continue;
    const key = row.question.difficulty;
    byDifficulty.set(key, [...(byDifficulty.get(key) ?? []), row.score]);
  }
  return [...byDifficulty.entries()].map(([difficulty, scores]) => ({
    difficulty,
    averageScore: Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length),
    attempts: scores.length,
  }));
}

// Weak areas: categories where the average score falls in the "needs work"
// bucket, worst first. Only surfaces a category once it has at least 2
// scored attempts, so a single unlucky answer doesn't brand a whole topic.
export async function getWeakCategories(userId: string, limit = 3) {
  const categories = await getCategoryPerformance(userId);
  return categories.filter(category => category.attempts >= 2 && bucketFor(category.averageScore) === "needsWork").slice(0, limit);
}

// Strong areas: the mirror of getWeakCategories, best-scoring first. Same
// minimum-attempts guard so a single lucky answer doesn't brand a category
// "strong" off one data point.
export async function getStrongCategories(userId: string, limit = 3) {
  const categories = await getCategoryPerformance(userId);
  return categories.filter(category => category.attempts >= 2 && bucketFor(category.averageScore) === "strong").sort((a, b) => b.averageScore - a.averageScore).slice(0, limit);
}

// One entry per of the last 7 UTC days (oldest first), each with whether the
// user did anything that day and a rough count of activity. Same three
// sources and day-boundary rule as getStreak, kept separate because this is
// about the last week specifically, not the historical streak.
export async function getWeeklyActivity(userId: string) {
  const today = todayUtc();
  const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

  const [sessions, studyTouches, challenges] = await Promise.all([
    prisma.practiceSession.findMany({ where: { userId, status: "COMPLETED", completedAt: { gte: sevenDaysAgo } }, select: { completedAt: true } }),
    prisma.studyProgress.findMany({ where: { userId, updatedAt: { gte: sevenDaysAgo } }, select: { updatedAt: true } }),
    prisma.dailyChallenge.findMany({ where: { userId, completedAt: { gte: sevenDaysAgo } }, select: { completedAt: true } }),
  ]);

  const counts = new Map<number, number>();
  const bump = (date: Date | null) => {
    if (!date) return;
    const key = utcDayStart(date).getTime();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  };
  for (const item of sessions) bump(item.completedAt);
  for (const item of studyTouches) bump(item.updatedAt);
  for (const item of challenges) bump(item.completedAt);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(sevenDaysAgo.getTime() + index * 24 * 60 * 60 * 1000);
    return { date, count: counts.get(date.getTime()) ?? 0 };
  });
}


// recent low-scoring or skipped attempts, one row per question (their most
// recent attempt on it), worst-scoring first. Deliberately named "struggled
// with" rather than "incorrect" for the same honesty reason as the rest of
// this module — see the module-level comment above.
export async function getStruggledQuestions(userId: string, limit = 10) {
  const rows = await prisma.practiceResponse.findMany({
    where: { session: { userId }, OR: [{ skipped: true }, { score: { lt: 50 } }] },
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      questionId: true,
      score: true,
      skipped: true,
      createdAt: true,
      question: { select: { id: true, question: true, slug: true, difficulty: true, category: { select: { name: true, slug: true } } } },
    },
  });

  const byQuestion = new Map<string, { question: (typeof rows)[number]["question"]; attempts: number; lastScore: number | null; lastSkipped: boolean; lastAttemptAt: Date }>();
  for (const row of rows) {
    const existing = byQuestion.get(row.questionId);
    if (existing) {
      existing.attempts += 1;
      continue;
    }
    byQuestion.set(row.questionId, { question: row.question, attempts: 1, lastScore: row.score, lastSkipped: row.skipped, lastAttemptAt: row.createdAt });
  }

  return [...byQuestion.values()]
    .sort((a, b) => (a.lastScore ?? -1) - (b.lastScore ?? -1))
    .slice(0, limit);
}

export { bucketFor };


// ---------------------------------------------------------------------------
// Streak. Counts a UTC calendar day as "active" if the user completed a
// practice session, touched a study topic (started or completed), or
// completed a daily challenge that day. See lib/date.ts for why UTC.
// ---------------------------------------------------------------------------

export async function getStreak(userId: string) {
  const [sessions, studyTouches, challenges] = await Promise.all([
    prisma.practiceSession.findMany({ where: { userId, status: "COMPLETED", completedAt: { not: null } }, select: { completedAt: true } }),
    prisma.studyProgress.findMany({ where: { userId }, select: { updatedAt: true } }),
    prisma.dailyChallenge.findMany({ where: { userId, completedAt: { not: null } }, select: { completedAt: true } }),
  ]);

  const activeDays = new Set<number>();
  for (const item of sessions) if (item.completedAt) activeDays.add(utcDayStart(item.completedAt).getTime());
  for (const item of studyTouches) activeDays.add(utcDayStart(item.updatedAt).getTime());
  for (const item of challenges) if (item.completedAt) activeDays.add(utcDayStart(item.completedAt).getTime());

  const sortedDays = [...activeDays].sort((a, b) => b - a);
  if (sortedDays.length === 0) return { currentStreak: 0, longestStreak: 0, lastActiveDate: null as Date | null };

  const lastActiveDate = new Date(sortedDays[0]);
  const today = todayUtc();
  const daysSinceLastActive = utcDaysBetween(lastActiveDate, today);

  let currentStreak = 0;
  if (daysSinceLastActive <= 1) {
    currentStreak = 1;
    for (let i = 1; i < sortedDays.length; i++) {
      if (sortedDays[i - 1] - sortedDays[i] === 24 * 60 * 60 * 1000) currentStreak++;
      else break;
    }
  }

  let longestStreak = 1;
  let run = 1;
  for (let i = 1; i < sortedDays.length; i++) {
    if (sortedDays[i - 1] - sortedDays[i] === 24 * 60 * 60 * 1000) run++;
    else run = 1;
    longestStreak = Math.max(longestStreak, run);
  }

  return { currentStreak, longestStreak, lastActiveDate };
}
