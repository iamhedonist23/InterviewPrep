import { prisma } from "@/lib/prisma";
import { todayUtc } from "@/lib/date";

const QUESTIONS_PER_CHALLENGE = 3;

export class DailyChallengeNotFoundError extends Error {
  constructor() {
    super("Daily challenge not found.");
    this.name = "DailyChallengeNotFoundError";
  }
}

// Returns today's challenge for this user, creating it on first request of
// the day. The unique (userId, challengeDate) constraint plus this upsert
// guarantees a refresh never reshuffles the questions, and a race between
// two near-simultaneous first-visits-of-the-day resolves to the same row
// rather than creating a duplicate.
export async function getOrCreateTodayChallenge(userId: string, preferredTechnologies: string[]) {
  const challengeDate = todayUtc();

  const existing = await prisma.dailyChallenge.findUnique({ where: { userId_challengeDate: { userId, challengeDate } } });
  if (existing) return existing;

  const categoryFilter =
    preferredTechnologies.length > 0
      ? { category: { name: { in: preferredTechnologies, mode: "insensitive" as const } } }
      : {};

  // Pick from a pool sized well beyond what's needed, then take a
  // deterministic slice keyed on the date so re-running this on the same
  // day (e.g. after the upsert race below) is stable rather than random.
  const pool = await prisma.interviewQuestion.findMany({
    where: { isPublished: true, ...categoryFilter },
    select: { id: true },
    take: 50,
    orderBy: { id: "asc" },
  });
  const source = pool.length >= QUESTIONS_PER_CHALLENGE ? pool : await prisma.interviewQuestion.findMany({ where: { isPublished: true }, select: { id: true }, take: 50, orderBy: { id: "asc" } });
  if (source.length === 0) return null;

  const seed = challengeDate.getTime() + userId.length;
  const questionIds = Array.from({ length: Math.min(QUESTIONS_PER_CHALLENGE, source.length) }, (_, index) => source[(seed + index * 7) % source.length].id);

  try {
    return await prisma.dailyChallenge.create({ data: { userId, challengeDate, questionIds } });
  } catch {
    // Lost a create race against another request for the same user/day —
    // the row now exists, so fetch and return the one that won.
    const winner = await prisma.dailyChallenge.findUnique({ where: { userId_challengeDate: { userId, challengeDate } } });
    if (!winner) throw new DailyChallengeNotFoundError();
    return winner;
  }
}

export async function getTodayChallengeWithQuestions(userId: string, preferredTechnologies: string[]) {
  const challenge = await getOrCreateTodayChallenge(userId, preferredTechnologies);
  if (!challenge) return null;
  const ids = Array.isArray(challenge.questionIds) ? (challenge.questionIds as string[]) : [];
  const questions = await prisma.interviewQuestion.findMany({
    where: { id: { in: ids }, isPublished: true },
    select: { id: true, question: true, explanation: true, keyPoints: true, category: { select: { name: true, slug: true } } },
  });
  // Preserve the persisted order rather than whatever order the DB returns.
  const ordered = ids.map(id => questions.find(question => question.id === id)).filter((question): question is (typeof questions)[number] => Boolean(question));
  return { challenge, questions: ordered };
}

export async function completeDailyChallenge(userId: string, score: number) {
  const challengeDate = todayUtc();
  const existing = await prisma.dailyChallenge.findUnique({ where: { userId_challengeDate: { userId, challengeDate } } });
  if (!existing) throw new DailyChallengeNotFoundError();
  return prisma.dailyChallenge.update({
    where: { id: existing.id },
    data: { completedAt: existing.completedAt ?? new Date(), score },
  });
}
