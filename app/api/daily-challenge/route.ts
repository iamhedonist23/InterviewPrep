import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";
import { getUserProfile } from "@/lib/user-profile";
import { completeDailyChallenge, DailyChallengeNotFoundError, getTodayChallengeWithQuestions } from "@/lib/daily-challenge";

async function requireSession(request: Request, namespace: string, limit: number) {
  const limiter = rateLimit(request, namespace, limit, 15 * 60 * 1000);
  if (!limiter.allowed) return { session: null, response: tooManyRequests(limiter.retryAfter) };
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { session: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  return { session, response: null };
}

export async function GET(request: Request) {
  const access = await requireSession(request, "daily-challenge-get", 30);
  if (access.response) return access.response;
  const profile = await getUserProfile(access.session!.user.id);
  const result = await getTodayChallengeWithQuestions(access.session!.user.id, profile?.preferredTechnologies ?? []);
  if (!result) return Response.json({ error: "No published questions are available for a challenge yet." }, { status: 404 });
  return Response.json({
    challengeId: result.challenge.id,
    completedAt: result.challenge.completedAt,
    score: result.challenge.score,
    questions: result.questions,
  });
}

const completeSchema = z.object({ score: z.number().int().min(0).max(100) });

export async function POST(request: Request) {
  const access = await requireSession(request, "daily-challenge-complete", 10);
  if (access.response) return access.response;
  if (!requestSizeLimit(request)) return Response.json({ error: "Request is too large." }, { status: 413 });
  const parsed = completeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });
  try {
    const result = await completeDailyChallenge(access.session!.user.id, parsed.data.score);
    return Response.json({ completedAt: result.completedAt, score: result.score });
  } catch (error) {
    if (error instanceof DailyChallengeNotFoundError) return Response.json({ error: "Start today's challenge before completing it." }, { status: 404 });
    throw error;
  }
}
