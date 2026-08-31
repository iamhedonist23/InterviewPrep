import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/ui/container";
import { getStudyProgressTotals } from "@/lib/study";
import {
  getPracticeTotals,
  getCategoryPerformance,
  getDifficultyPerformance,
  getWeakCategories,
  getStrongCategories,
  getWeeklyActivity,
  getStreak,
} from "@/lib/analytics";

export const dynamic = "force-dynamic";
export const metadata = { title: "Progress", robots: { index: false, follow: false } };

const DAY_LABEL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DIFFICULTY_LABEL: Record<string, string> = { EASY: "Easy", MEDIUM: "Medium", HARD: "Hard" };

function Bar({ label, value, sublabel }: { label: string; value: number; sublabel?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="font-bold text-ink/60">{value}%{sublabel ? ` \u00b7 ${sublabel}` : ""}</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-mint">
        <div className="h-full rounded-full bg-coral" style={{ width: `${Math.max(4, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

export default async function ProgressPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/progress");
  const userId = session.user.id;

  const [practiceTotals, categoryPerformance, difficultyPerformance, weakCategories, strongCategories, weeklyActivity, studyTotals, streak] = await Promise.all([
    getPracticeTotals(userId),
    getCategoryPerformance(userId),
    getDifficultyPerformance(userId),
    getWeakCategories(userId, 5),
    getStrongCategories(userId, 5),
    getWeeklyActivity(userId),
    getStudyProgressTotals(userId),
    getStreak(userId),
  ]);

  const hasAnyActivity = practiceTotals.attempted > 0 || studyTotals.started > 0;
  const maxDayCount = Math.max(1, ...weeklyActivity.map(day => day.count));

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your progress</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Progress</h1>
        <p className="mt-3 max-w-2xl text-ink/60">
          A look at your practice and study activity over time. Scores come from the same simple self-check used during practice, not an authoritative grade.
        </p>

        {!hasAnyActivity ? (
          <div className="mt-10 rounded-2xl border border-dashed border-ink/20 p-12 text-center">
            <p className="text-ink/60">No activity yet. Practice a few questions or start a study topic to see your progress here.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/practice" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper">Start practicing</Link>
              <Link href="/learn" className="rounded-full border border-ink/15 px-5 py-3 text-sm font-bold">Explore study materials</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-4">
              {[
                ["Questions attempted", practiceTotals.attempted],
                ["Average score", practiceTotals.averageScore === null ? "\u2014" : `${practiceTotals.averageScore}%`],
                ["Study topics completed", studyTotals.completed],
                ["Longest streak", `${streak.longestStreak} day${streak.longestStreak === 1 ? "" : "s"}`],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
                  <p className="text-sm text-ink/55">{label}</p>
                  <p className="mt-2 font-display text-3xl font-bold">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold">This week</h2>
              <div className="mt-4 flex items-end gap-3 rounded-2xl border border-ink/10 bg-white/70 p-6">
                {weeklyActivity.map(day => (
                  <div key={day.date.toISOString()} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-24 w-full items-end">
                      <div
                        className={`w-full rounded-lg ${day.count > 0 ? "bg-coral" : "bg-mint"}`}
                        style={{ height: `${Math.max(8, (day.count / maxDayCount) * 100)}%` }}
                        title={`${day.count} activity${day.count === 1 ? "" : "ies"}`}
                      />
                    </div>
                    <span className="text-xs font-bold text-ink/50">{DAY_LABEL[day.date.getUTCDay()]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold">Category performance</h2>
                {categoryPerformance.length === 0 ? (
                  <p className="mt-4 text-sm text-ink/55">Practice a few categories to see a breakdown here.</p>
                ) : (
                  <div className="mt-5 space-y-5 rounded-2xl border border-ink/10 bg-white/70 p-6">
                    {categoryPerformance.map(category => (
                      <Bar key={category.slug} label={category.name} value={category.averageScore} sublabel={`${category.attempts} attempt${category.attempts === 1 ? "" : "s"}`} />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold">Difficulty performance</h2>
                {difficultyPerformance.length === 0 ? (
                  <p className="mt-4 text-sm text-ink/55">Answer some questions to see this breakdown.</p>
                ) : (
                  <div className="mt-5 space-y-5 rounded-2xl border border-ink/10 bg-white/70 p-6">
                    {difficultyPerformance.map(item => (
                      <Bar key={item.difficulty} label={DIFFICULTY_LABEL[item.difficulty] ?? item.difficulty} value={item.averageScore} sublabel={`${item.attempts} attempt${item.attempts === 1 ? "" : "s"}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-bold">Weak areas</h2>
                  <Link href="/dashboard/review" className="text-sm font-bold text-coral">Review</Link>
                </div>
                {weakCategories.length === 0 ? (
                  <p className="mt-4 text-sm text-ink/55">No clear weak areas yet.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {weakCategories.map(category => (
                      <li key={category.slug}>
                        <Link href={`/practice?category=${category.slug}`} className="flex items-center justify-between rounded-xl border border-ink/10 bg-white/70 p-4 hover:border-coral">
                          <span className="font-semibold">{category.name}</span>
                          <span className="text-sm font-bold text-ink/55">{category.averageScore}%</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold">Strong areas</h2>
                {strongCategories.length === 0 ? (
                  <p className="mt-4 text-sm text-ink/55">Keep practicing to build up your strong areas.</p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {strongCategories.map(category => (
                      <li key={category.slug} className="flex items-center justify-between rounded-xl border border-ink/10 bg-white/70 p-4">
                        <span className="font-semibold">{category.name}</span>
                        <span className="text-sm font-bold text-ink/55">{category.averageScore}%</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
