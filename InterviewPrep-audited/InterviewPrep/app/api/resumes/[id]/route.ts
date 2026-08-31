import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";
import { updateResumeSchema, getOwnedResume, updateResume, deleteResume, ResumeNotFoundError } from "@/lib/resume";

async function requireUser(request: Request, namespace: string, limit: number) {
  const limiter = rateLimit(request, namespace, limit, 15 * 60 * 1000);
  if (!limiter.allowed) return { userId: null, response: tooManyRequests(limiter.retryAfter) };
  if (!requestSizeLimit(request, 512 * 1024)) return { userId: null, response: Response.json({ error: "Request is too large." }, { status: 413 }) };
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { userId: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  return { userId: session.user.id, response: null };
}

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams) {
  const access = await requireUser(request, "resumes-get", 60);
  if (access.response) return access.response;
  const { id } = await params;

  try {
    const resume = await getOwnedResume(access.userId!, id);
    return Response.json({ resume });
  } catch (error) {
    if (error instanceof ResumeNotFoundError) return Response.json({ error: "Resume not found." }, { status: 404 });
    throw error;
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const access = await requireUser(request, "resumes-update", 60);
  if (access.response) return access.response;
  const { id } = await params;

  const body = await request.json().catch(() => null);
  const parsed = updateResumeSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid resume data.", issues: parsed.error.flatten() }, { status: 400 });

  try {
    const resume = await updateResume(access.userId!, id, parsed.data);
    return Response.json({ resume });
  } catch (error) {
    if (error instanceof ResumeNotFoundError) return Response.json({ error: "Resume not found." }, { status: 404 });
    throw error;
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const access = await requireUser(request, "resumes-delete", 30);
  if (access.response) return access.response;
  const { id } = await params;

  try {
    await deleteResume(access.userId!, id);
    return Response.json({ deleted: true });
  } catch (error) {
    if (error instanceof ResumeNotFoundError) return Response.json({ error: "Resume not found." }, { status: 404 });
    throw error;
  }
}
