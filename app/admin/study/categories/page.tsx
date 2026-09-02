import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { AdminAction } from "@/components/admin/admin-action";

export const dynamic = "force-dynamic";

export default async function AdminStudyCategoriesPage() {
  await requireAdmin();

  const categories = await prisma.studyCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { paths: true, topics: true } } },
  });

  return (
    <section className="py-16">
      <Container>
        <Link href="/admin" className="text-sm font-bold text-ink/55">
          ← Admin dashboard
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold">Study categories</h1>
            <p className="mt-3 text-ink/60">Organize learning paths for technologies.</p>
          </div>
          <Link
            href="/admin/study/categories/new"
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper"
          >
            Create category
          </Link>
        </div>

        {categories.length === 0 && (
          <p className="mt-14 text-ink/60">No study categories yet. Create one to get started.</p>
        )}

        <div className="mt-8 space-y-3 rounded-2xl border border-ink/10 bg-white/70">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 p-5 last:border-0 sm:gap-8"
            >
              <div className="flex-1">
                <p className="font-bold">{category.name}</p>
                <p className="mt-1 text-xs text-ink/50">
                  {category._count.paths} learning paths • {category._count.topics} topics
                </p>
                {category.description && (
                  <p className="mt-2 text-sm text-ink/60">{category.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ink/55">
                  {category.isPublished ? "Published" : "Draft"}
                </span>
                <Link
                  href={`/admin/study/categories/${category.id}`}
                  className="text-sm font-bold text-coral hover:text-ink"
                >
                  Edit
                </Link>
                <AdminAction
                  resource="study/categories"
                  id={category.id}
                  action="toggle"
                  value={category.isPublished}
                  label={category.isPublished ? "Unpublish" : "Publish"}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
