import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/ui/container";
import { SaveQuestionButton } from "@/components/questions/save-question-button";
import { getStruggledQuestions, getWeakCategories, bucketFor } from "@/lib/analytics";

export const dynamic = "force-dynamic";
export const metadata = { title: "Review", robots: { index: false, follow: false } };

export default async function ReviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard/review");

  const [struggled, weakCategories] = await Promise.all([
    getStruggledQuestions(session.user.id, 10),
    getWeakCategories(session.user.id, 5),
  ]);

  const repeated = struggled.filter(item => item.attempts > 1);

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Review</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Questions to revisit</h1>
        <p className="mt-3 max-w-2xl text-ink/60">
          Based on your own practice history &mdash; lower-scoring or skipped answers, using the same simple self-check score you saw during practice. This is a study prompt, not a graded judgment.
        </p>

        {weakCategories.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold">Weak topics</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {weakCategories.map(category => (
                <Link
                  key={category.slug}
                  href={`/practice?category=${category.slug}`}
                  className="rounded-2xl border border-ink/10 bg-white/70 p-5 transition-colors hover:border-coral"
                >
                  <p className="font-display text-lg font-bold">{category.name}</p>
                  <p className="mt-1 text-sm text-ink/55">Average score {category.averageScore}% across {category.attempts} attempts</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold">Recently struggled with</h2>
          {struggled.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-ink/20 p-12 text-center">
              <p className="text-ink/60">No struggling answers yet &mdash; nice work, or you haven&apos;t practiced yet.</p>
              <Link href="/practice" className="mt-5 inline-block rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper">Start practicing</Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {struggled.map(item => (
                <div key={item.question.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white/70 p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-ink/40">{item.question.category.name}</p>
                    <Link href={`/questions/${item.question.slug}`} className="mt-1 block font-semibold text-ink hover:text-coral">
                      {item.question.question}
                    </Link>
                    <p className="mt-1 text-xs text-ink/50">
                      {item.lastSkipped ? "Skipped" : `Last score: ${item.lastScore}%`}
                      {item.attempts > 1 && ` \u00b7 attempted ${item.attempts} times`}
                      {!item.lastSkipped && item.lastScore !== null && ` \u00b7 ${bucketFor(item.lastScore) === "needsWork" ? "Needs work" : "Developing"}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link href={`/practice?category=${item.question.category.slug}`} className="rounded-full border border-ink/15 px-4 py-2 text-xs font-bold hover:border-coral hover:text-coral">
                      Practice again
                    </Link>
                    <SaveQuestionButton questionId={item.question.id} variant="inline" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {repeated.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold">Repeated mistakes</h2>
            <p className="mt-2 text-sm text-ink/55">Questions you&apos;ve attempted more than once and still scored low on &mdash; worth a closer look.</p>
            <ul className="mt-4 space-y-2">
              {repeated.map(item => (
                <li key={item.question.id}>
                  <Link href={`/questions/${item.question.slug}`} className="text-sm font-semibold text-ink hover:text-coral">
                    {item.question.question}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
