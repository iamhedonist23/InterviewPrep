import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimit, tooManyRequests } from "@/lib/request-security";
import { onboardingSchema, completeOnboarding } from "@/lib/user-profile";

export async function PATCH(request: Request) {
  const limiter = rateLimit(request, "onboarding", 10, 15 * 60 * 1000);
  if (!limiter.allowed) return tooManyRequests(limiter.retryAfter);

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Authentication required." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid onboarding data.", issues: parsed.error.flatten() }, { status: 400 });

  const result = await completeOnboarding(session.user.id, parsed.data);
  return Response.json(result);
}
