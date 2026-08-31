import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { listPublishedStudyCategoriesForLearn } from "@/lib/study";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Learn", description: "Free, structured study guides to build the fundamentals behind your interview answers.", alternates: { canonical: "/learn" } };

const LEVEL_LABEL: Record<string, string> = { BEGINNER: "Beginner", INTERMEDIATE: "Intermediate", ADVANCED: "Advanced", INTERVIEW_PREP: "Interview prep" };

export default async function LearnPage() {
  const categories = await listPublishedStudyCategoriesForLearn();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Free study guides</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Learn the fundamentals, not just the answers.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">
          Structured lessons, worked examples, and practice exercises to build real understanding &mdash; then take it straight into practice questions.
        </p>

        {categories.length === 0 && (
          <p className="mt-14 text-ink/60">No study guides are published yet. Check back soon.</p>
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/learn/${category.slug}`}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white/70 p-6 transition-colors hover:border-coral"
            >
              <h2 className="font-display text-xl font-bold">{category.name}</h2>
              {category.description && <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">{category.description}</p>}
              <div className="mt-5 flex flex-wrap gap-2">
                {category.paths.map(path => (
                  <span key={path.id} className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-ink/70">
                    {LEVEL_LABEL[path.level] ?? path.level}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-ink/40">
                {category._count.topics} {category._count.topics === 1 ? "topic" : "topics"}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
