import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit, requestSizeLimit, tooManyRequests } from "@/lib/request-security";
import { createResumeSchema, listResumes, createResume, ResumeLimitError } from "@/lib/resume";
import { prisma } from "@/lib/prisma"; // import prisma

async function requireUser(request: Request, namespace: string, limit: number) {
  const limiter = rateLimit(request, namespace, limit, 15 * 60 * 1000);
  if (!limiter.allowed) return { userId: null, response: tooManyRequests(limiter.retryAfter) };
  if (!requestSizeLimit(request)) return { userId: null, response: Response.json({ error: "Request is too large." }, { status: 413 }) };
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { userId: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  return { userId: session.user.id, response: null };
}

export async function GET(request: Request) {
  try {
    const access = await requireUser(request, "resumes-list", 60);
    if (access.response) return access.response;
    const resumes = await listResumes(access.userId!);
    return Response.json({ resumes });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('GET /api/resumes error:', error);
    return Response.json({ error: 'Failed to fetch resumes. Please try again.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const access = await requireUser(request, "resumes-create", 20);
    if (access.response) return access.response;

    // --- ADD: Verify user exists ---
    const user = await prisma.user.findUnique({
      where: { id: access.userId! }
    });
    if (!user) {
      return Response.json({ error: "User account not found. Please log out and log in again." }, { status: 404 });
    }

    const body = await request.json().catch(() => null);
    const parsed = createResumeSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Invalid resume data.", issues: parsed.error.flatten() }, { status: 400 });
    }

    const resume = await createResume(access.userId!, parsed.data);
    return Response.json({ resume }, { status: 201 });
  } catch (error) {
    // Handle known limit error
    if (error instanceof ResumeLimitError) {
      return Response.json({ error: error.message }, { status: 409 });
    }
    // Handle Prisma foreign key error (P2003) – just in case the user check fails
    if (error instanceof Error && 'code' in error && error.code === 'P2003') {
      // eslint-disable-next-line no-console
      console.error('POST /api/resumes - P2003 error:', error);
      return Response.json({ error: "User account not found. Please log out and log in again." }, { status: 404 });
    }
    // eslint-disable-next-line no-console
    console.error('POST /api/resumes error:', error);
    return Response.json({ error: 'Failed to create resume. Please try again later.' }, { status: 500 });
  }
}