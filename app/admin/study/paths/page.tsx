import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { AdminAction } from "@/components/admin/admin-action";
import { STUDY_LEVELS } from "@/lib/study";

export const dynamic = "force-dynamic";

const LEVEL_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  INTERVIEW_PREP: "Interview prep",
};

export default async function AdminStudyPathsPage() {
  await requireAdmin();

  const paths = await prisma.studyPath.findMany({
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    include: {
      category: true,
      _count: { select: { modules: true } },
    },
  });

  const categories = await prisma.studyCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="py-16">
      <Container>
        <Link href="/admin" className="text-sm font-bold text-ink/55">
          ← Admin dashboard
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold">Learning paths</h1>
            <p className="mt-3 text-ink/60">Define difficulty levels within categories.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/study/categories"
              className="rounded-full border border-ink/15 px-5 py-3 text-sm font-bold"
            >
              Manage categories
            </Link>
            <Link
              href="/admin/study/paths/new"
              className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper"
            >
              Create path
            </Link>
          </div>
        </div>

        {paths.length === 0 && (
          <p className="mt-14 text-ink/60">No learning paths yet. Create a category first, then a path.</p>
        )}

        <div className="mt-8 space-y-3 rounded-2xl border border-ink/10 bg-white/70">
          {paths.map((path) => (
            <div
              key={path.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 p-5 last:border-0 sm:gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-bold">{path.name}</p>
                  <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold">
                    {LEVEL_LABEL[path.level] || path.level}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink/50">
                  {path.category.name} • {path._count.modules} modules
                </p>
                {path.description && (
                  <p className="mt-2 text-sm text-ink/60">{path.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ink/55">
                  {path.isPublished ? "Published" : "Draft"}
                </span>
                <Link
                  href={`/admin/study/paths/${path.id}`}
                  className="text-sm font-bold text-coral hover:text-ink"
                >
                  Edit
                </Link>
                <AdminAction
                  resource="study/paths"
                  id={path.id}
                  action="toggle"
                  value={path.isPublished}
                  label={path.isPublished ? "Unpublish" : "Publish"}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
