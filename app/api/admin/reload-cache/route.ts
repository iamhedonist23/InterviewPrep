import { requireAdminApi } from "@/lib/admin";
import { invalidateLearnCache } from "@/lib/study-public";
import { invalidatePublicContentCache } from "@/lib/public-content";

export async function GET() {
  return POST();
}

export async function POST() {
  const guard = await requireAdminApi();
  if (guard.response) return guard.response;

  invalidateLearnCache();
  invalidatePublicContentCache();

  return Response.json({
    ok: true,
    message: "Caches refreshed.",
    tags: ["learn:public", "public:content"],
  });
}
