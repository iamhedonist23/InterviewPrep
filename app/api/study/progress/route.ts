import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit, tooManyRequests } from "@/lib/request-security";
import { startTopicProgress, completeTopicProgress, StudyNotFoundError } from "@/lib/study";

const bodySchema = z.object({
  topicId: z.string().min(1),
  action: z.enum(["start", "complete"]),
});

export async function POST(request: Request) {
  const limiter = rateLimit(request, "study-progress", 60, 15 * 60 * 1000);
  if (!limiter.allowed) return tooManyRequests(limiter.retryAfter);

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Authentication required." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid request." }, { status: 400 });

  try {
    const progress =
      parsed.data.action === "start"
        ? await startTopicProgress(session.user.id, parsed.data.topicId)
        : await completeTopicProgress(session.user.id, parsed.data.topicId);
    return Response.json({ progress });
  } catch (error) {
    if (error instanceof StudyNotFoundError) return Response.json({ error: "Topic not found." }, { status: 404 });
    throw error;
  }
}
