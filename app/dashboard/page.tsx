import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { LogoutButton } from "@/components/auth/logout-button";
import { getUserProfile } from "@/lib/user-profile";
import { getContinueLearning, getRecommendedTopics, getStudyProgressTotals } from "@/lib/study";
import { getStreak, getWeakCategories } from "@/lib/analytics";
import { listResumesWithCompletion } from "@/lib/resume";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const profile = await getUserProfile(userId);
  if (profile && !profile.onboardingCompleted) redirect("/onboarding");

  const [completed, sessions, saved, recent, continueLearning, studyTotals, streak, weakCategories, resumes] = await Promise.all([
    prisma.practiceSession.count({ where: { userId, status: "COMPLETED" } }),
    prisma.practiceSession.findMany({ where: { userId }, orderBy: { startedAt: "desc" }, take: 5, select: { id: true, startedAt: true, status: true, score: true } }),
    prisma.savedQuestion.count({ where: { userId } }),
    prisma.interviewAnswer.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 5, include: { question: { select: { question: true, slug: true } } } }),
    getContinueLearning(userId, 3),
    getStudyProgressTotals(userId),
    getStreak(userId),
    getWeakCategories(userId, 3),
    listResumesWithCompletion(userId),
  ]);
  // Depends on weakCategories above, so it can't join the batch it's derived from.
  const recommendedTopics = await getRecommendedTopics(userId, profile?.preferredTechnologies ?? [], 4, weakCategories.map(category => category.slug));

  const scores = sessions.flatMap((item) => (item.score === null ? [] : [item.score]));
  const average = scores.length ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length) : null;

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your dashboard</p>
            <h1 className="mt-3 font-display text-4xl font-bold">Welcome back, {session.user.name?.split(" ")[0] ?? "there"}</h1>
            <p className="mt-3 text-ink/60">
              {profile?.targetRole ? `Preparing for ${profile.targetRole}.` : "A private space for your interview preparation."}
            </p>
            {streak.currentStreak > 0 && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-1.5 text-sm font-bold text-coral">
                🔥 {streak.currentStreak} day{streak.currentStreak === 1 ? "" : "s"} streak
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/daily-challenge" className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper hover:bg-coral">
              Daily challenge
            </Link>
            <Link href="/account" className="text-sm font-bold text-ink/50 hover:text-coral">
              Account settings
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Questions practiced", completed],
            ["Practice sessions", sessions.length],
            ["Average score", average === null ? "Not scored" : `${average}%`],
            ["Saved questions", saved],
            ["Topics completed", `${studyTotals.completed} / ${studyTotals.started || 0}`],
          ].map(([label, value]) => (
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-5" key={label as string}>
              <p className="text-sm text-ink/55">{label as string}</p>
              <p className="mt-3 font-display text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Continue learning</h2>
              <Link href="/learn" className="text-sm font-bold text-coral">Browse topics</Link>
            </div>
            <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-5">
              {continueLearning.length ? (
                continueLearning.map((item) => (
                  <Link
                    key={item.topicId}
                    href={`/learn/${item.topic.category.slug}/${item.topic.slug}`}
                    className="flex items-center justify-between border-b border-ink/10 py-3 text-sm last:border-0 hover:text-coral"
                  >
                    <span>
                      {item.topic.category.name} → {item.topic.title}
                    </span>
                    <span className="font-bold text-ink/50">In progress</span>
                  </Link>
                ))
              ) : (
                <div className="py-5">
                  <p className="text-sm text-ink/55">Start your first learning path.</p>
                  <Link href="/learn" className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper">
                    Explore study materials
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Recommended next</h2>
            </div>
            <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-5">
              {recommendedTopics.length ? (
                recommendedTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/learn/${topic.category.slug}/${topic.slug}`}
                    className="flex items-center justify-between gap-3 border-b border-ink/10 py-3 text-sm last:border-0 hover:text-coral"
                  >
                    <span>
                      <span className="block">{topic.title}</span>
                      <span className="block text-xs text-ink/45">
                        {topic.reason === "weakArea" ? "Recommended because you recently struggled with this topic" : topic.reason === "interest" ? `Matches your interest in ${topic.category.name}` : "Next in your path"}
                      </span>
                    </span>
                    {topic.estimatedMinutes && <span className="shrink-0 text-xs font-bold text-ink/40">{topic.estimatedMinutes} min</span>}
                  </Link>
                ))
              ) : (
                <p className="py-5 text-sm text-ink/55">No recommendations yet — study topics will appear here as they're published.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Practice sessions</h2>
              <Link href="/practice" className="text-sm font-bold text-coral">Start practice</Link>
            </div>
            <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-5">
              {sessions.length ? (
                sessions.map((item) => (
                  <div className="flex justify-between border-b border-ink/10 py-3 text-sm last:border-0" key={item.id}>
                    <span>{item.startedAt.toLocaleDateString()}</span>
                    <span className="font-bold">{item.score === null ? item.status.toLowerCase().replace("_", " ") : `${item.score}%`}</span>
                  </div>
                ))
              ) : (
                <div className="py-5">
                  <p className="text-sm text-ink/55">No practice activity yet.</p>
                  <Link href="/practice" className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper">
                    Start practicing
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Recent activity</h2>
              <Link href="/dashboard/saved" className="text-sm font-bold text-coral">Saved questions</Link>
            </div>
            <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-5">
              {recent.length ? (
                recent.map((item) => (
                  <Link href={`/questions/${item.question.slug}`} className="block border-b border-ink/10 py-3 text-sm last:border-0 hover:text-coral" key={item.question.slug}>
                    {item.question.question}
                  </Link>
                ))
              ) : (
                <p className="py-5 text-sm text-ink/55">Answer a question to see your recent activity.</p>
              )}
            </div>
          </div>
        </div>
        {weakCategories.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Weak areas</h2>
              <div className="flex gap-4">
                <Link href="/progress" className="text-sm font-bold text-coral">Full progress</Link>
                <Link href="/dashboard/review" className="text-sm font-bold text-coral">Review all</Link>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {weakCategories.map(category => (
                <Link
                  key={category.slug}
                  href={`/practice?category=${category.slug}`}
                  className="rounded-2xl border border-ink/10 bg-white/70 p-5 transition-colors hover:border-coral"
                >
                  <p className="font-display text-lg font-bold">{category.name}</p>
                  <p className="mt-1 text-sm text-ink/55">{category.averageScore}% average</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">My resume</h2>
            <Link href="/resume-builder" className="text-sm font-bold text-coral">
              {resumes.length ? "Manage resumes" : "View all"}
            </Link>
          </div>
          {resumes.length ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.slice(0, 3).map((resume) => (
                <div key={resume.id} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-lg font-bold">{resume.title}</p>
                    <span className="shrink-0 rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold capitalize">{resume.template}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink/50">Last edited {resume.lastEditedAt.toLocaleDateString()}</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-bold text-ink/50">
                      <span>Completeness</span>
                      <span>{resume.completionPercent}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                      <div className="h-full rounded-full bg-coral" style={{ width: `${resume.completionPercent}%` }} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm font-bold">
                    <Link href={`/resume-builder/${resume.id}`} className="text-coral">Edit</Link>
                    <Link href={`/resume-builder/${resume.id}/preview`} className="text-ink/60 hover:text-coral">Preview</Link>
                    <Link href={`/resume-builder/${resume.id}/preview`} className="text-ink/60 hover:text-coral">Download</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-ink/10 bg-white/70 p-5">
              <p className="text-sm text-ink/55">Create your professional resume.</p>
              <Link href="/resume-builder" className="mt-3 inline-block rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper">
                Create resume
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
