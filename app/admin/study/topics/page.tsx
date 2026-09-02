import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { AdminAction } from "@/components/admin/admin-action";

export const dynamic = "force-dynamic";

const LEVEL_LABEL: Record<string, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  INTERVIEW_PREP: "Interview prep",
};

export default async function AdminStudyTopicsPage() {
  await requireAdmin();

  const categories = await prisma.studyCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      paths: {
        orderBy: { sortOrder: "asc" },
        include: {
          modules: {
            orderBy: { sortOrder: "asc" },
            include: {
              topics: {
                orderBy: { sortOrder: "asc" },
                select: {
                  id: true,
                  title: true,
                  slug: true,
                  isPublished: true,
                  estimatedMinutes: true,
                  _count: { select: { sections: true, examples: true, exercises: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <section className="py-16">
      <Container>
        <Link href="/admin" className="text-sm font-bold text-ink/55">
          ← Admin dashboard
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold">Study topics</h1>
            <p className="mt-3 text-ink/60">Create and manage lessons organized by category, path, and module.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/admin/study/categories"
              className="rounded-full border border-ink/15 px-4 py-2 font-bold hover:border-ink/30"
            >
              Categories
            </Link>
            <Link
              href="/admin/study/paths"
              className="rounded-full border border-ink/15 px-4 py-2 font-bold hover:border-ink/30"
            >
              Paths
            </Link>
          </div>
        </div>

        {categories.length === 0 && (
          <p className="mt-14 text-ink/60">No categories yet. Create one to get started.</p>
        )}

        <div className="mt-8 space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold">{category.name}</h2>
                  {category.description && (
                    <p className="mt-1 text-sm text-ink/60">{category.description}</p>
                  )}
                </div>
                <span className="text-xs font-bold text-ink/55">
                  {category.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {category.paths.map((path) => (
                  <div key={path.id} className="rounded-xl border border-ink/5 bg-ink/2 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-ink">{path.name}</h3>
                        <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-bold">
                          {LEVEL_LABEL[path.level] || path.level}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-ink/55">
                        {path.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {path.modules.map((module) => (
                        <div key={module.id} className="rounded-lg border border-ink/10 bg-white p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-ink/80">{module.title}</p>
                              <p className="text-xs text-ink/50">
                                {module.topics.length} topics
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-ink/55">
                                {module.isPublished ? "Published" : "Draft"}
                              </span>
                              <Link
                                href={`/admin/study/modules/${module.id}`}
                                className="text-xs font-bold text-coral hover:text-ink"
                              >
                                Edit
                              </Link>
                            </div>
                          </div>

                          {/* Topics list */}
                          {module.topics.length > 0 && (
                            <div className="mt-3 space-y-2 border-t border-ink/5 pt-3">
                              {module.topics.map((topic) => (
                                <div key={topic.id} className="flex items-center justify-between text-sm">
                                  <div className="flex-1">
                                    <Link
                                      href={`/admin/study/topics/${topic.id}`}
                                      className="text-ink hover:text-coral"
                                    >
                                      {topic.title}
                                    </Link>
                                    <p className="text-xs text-ink/50">
                                      {topic._count.sections} sections • {topic._count.examples} examples •{" "}
                                      {topic._count.exercises} exercises
                                      {topic.estimatedMinutes && ` • ${topic.estimatedMinutes}min`}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-ink/55">
                                      {topic.isPublished ? "Published" : "Draft"}
                                    </span>
                                    <AdminAction
                                      resource="study/topics"
                                      id={topic.id}
                                      action="toggle"
                                      value={topic.isPublished}
                                      label={topic.isPublished ? "Unpublish" : "Publish"}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {module.topics.length === 0 && (
                            <p className="mt-2 text-xs text-ink/50">No topics yet</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {path.modules.length === 0 && (
                      <p className="text-sm text-ink/50">No modules yet</p>
                    )}
                  </div>
                ))}
              </div>

              {category.paths.length === 0 && (
                <p className="text-sm text-ink/50">No paths yet</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
