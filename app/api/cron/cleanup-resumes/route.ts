import { deleteInactiveResumes, RESUME_INACTIVITY_DAYS } from "@/lib/resume";

// Vercel Cron calls this on a schedule (see vercel.json). It sends an
// "Authorization: Bearer <CRON_SECRET>" header automatically when CRON_SECRET
// is set as an env var on the project, so this endpoint can't be triggered
// by anyone else.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    return Response.json({ error: "CRON_SECRET is not configured." }, { status: 500 });
  }
  if (authHeader !== `Bearer ${expected}`) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const deletedCount = await deleteInactiveResumes(RESUME_INACTIVITY_DAYS);
  return Response.json({ deletedCount, inactivityDays: RESUME_INACTIVITY_DAYS });
}
