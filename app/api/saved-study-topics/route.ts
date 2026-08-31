import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";

const schema = z.object({ topicId: z.string().min(1).max(100) });

async function guard(request: Request) {
  const limiter = rateLimit(request, "saved-study-topic", 60, 15 * 60 * 1000);
  if (!limiter.allowed) return { session: null, response: tooManyRequests(limiter.retryAfter) };
  if (!requestSizeLimit(request)) return { session: null, response: Response.json({ error: "Request is too large." }, { status: 413 }) };
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { session: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  return { session, response: null };
}

export async function POST(request: Request) {
  const access = await guard(request);
  if (access.response) return access.response;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid topic." }, { status: 400 });
  const topic = await prisma.studyTopic.findFirst({ where: { id: parsed.data.topicId, isPublished: true }, select: { id: true } });
  if (!topic) return Response.json({ error: "Topic not found." }, { status: 404 });
  await prisma.savedStudyTopic.upsert({
    where: { userId_topicId: { userId: access.session!.user.id, topicId: topic.id } },
    create: { userId: access.session!.user.id, topicId: topic.id },
    update: {},
  });
  return Response.json({ saved: true });
}

export async function DELETE(request: Request) {
  const access = await guard(request);
  if (access.response) return access.response;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: "Invalid topic." }, { status: 400 });
  await prisma.savedStudyTopic.deleteMany({ where: { userId: access.session!.user.id, topicId: parsed.data.topicId } });
  return Response.json({ saved: false });
}
