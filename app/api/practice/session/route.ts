import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";

const responseSchema = z.object({ questionId: z.string().min(1), answer: z.string().max(10000).optional().default(""), skipped: z.boolean(), score: z.number().int().min(0).max(100).nullable() });
const schema = z.object({ responses: z.array(responseSchema).min(1).max(20), score: z.number().int().min(0).max(100).nullable(), startedAt: z.string().datetime(), completedAt: z.string().datetime() });
export async function POST(request: Request) {
  const limiter = rateLimit(request, "practice-session", 30, 15 * 60 * 1000);
  if (!limiter.allowed) return tooManyRequests(limiter.retryAfter);
  if (!requestSizeLimit(request)) return Response.json({ error: "Request is too large." }, { status: 413 });
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ saved: false, message: "Anonymous sessions are not stored." });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "The practice session data is invalid." }, { status: 400 });
  const data = parsed.data;
  const questionIds = [...new Set(data.responses.map(response => response.questionId))];
  const validQuestions = await prisma.interviewQuestion.findMany({ where: { id: { in: questionIds }, isPublished: true }, select: { id: true } });
  if (validQuestions.length !== questionIds.length) return Response.json({ error: "One or more practice questions are unavailable." }, { status: 400 });
  const practiceSession = await prisma.practiceSession.create({ data: { userId: session.user.id, status: "COMPLETED", score: data.score, startedAt: new Date(data.startedAt), completedAt: new Date(data.completedAt), responses: { create: data.responses.map(response => ({ questionId: response.questionId, answer: response.answer, skipped: response.skipped, score: response.score })) } }, select: { id: true } });
  return Response.json({ saved: true, sessionId: practiceSession.id });
}
