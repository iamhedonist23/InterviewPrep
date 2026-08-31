import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";
import { createResumeSchema, listResumes, createResume, ResumeLimitError } from "@/lib/resume";

async function requireUser(request: Request, namespace: string, limit: number) {
  const limiter = rateLimit(request, namespace, limit, 15 * 60 * 1000);
  if (!limiter.allowed) return { userId: null, response: tooManyRequests(limiter.retryAfter) };
  if (!requestSizeLimit(request)) return { userId: null, response: Response.json({ error: "Request is too large." }, { status: 413 }) };
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { userId: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  return { userId: session.user.id, response: null };
}

export async function GET(request: Request) {
  const access = await requireUser(request, "resumes-list", 60);
  if (access.response) return access.response;
  const resumes = await listResumes(access.userId!);
  return Response.json({ resumes });
}

export async function POST(request: Request) {
  const access = await requireUser(request, "resumes-create", 20);
  if (access.response) return access.response;

  const body = await request.json().catch(() => null);
  const parsed = createResumeSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid resume data.", issues: parsed.error.flatten() }, { status: 400 });

  try {
    const resume = await createResume(access.userId!, parsed.data);
    return Response.json({ resume }, { status: 201 });
  } catch (error) {
    if (error instanceof ResumeLimitError) return Response.json({ error: error.message }, { status: 409 });
    throw error;
  }
}
