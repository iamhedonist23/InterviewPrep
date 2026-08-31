import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { QuestionCard } from "@/components/questions/question-card";
import { SavedTabs } from "@/components/dashboard/saved-tabs";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ tab?: string }> };

export default async function SavedPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const { tab } = await searchParams;
  const activeTab = tab === "topics" ? "topics" : tab === "questions" ? "questions" : "all";

  const [saved, savedTopics] = await Promise.all([
    prisma.savedQuestion.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, include: { question: { include: { category: true, subcategory: true } } } }),
    prisma.savedStudyTopic.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, include: { topic: { select: { title: true, slug: true, shortDescription: true, category: { select: { slug: true, name: true } } } } } }),
  ]);

  const showQuestions = activeTab !== "topics";
  const showTopics = activeTab !== "questions";
  const isEmpty = (!showQuestions || saved.length === 0) && (!showTopics || savedTopics.length === 0);

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your library</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Saved</h1>
        <p className="mt-3 text-ink/60">Keep the questions and study topics you want to revisit close by.</p>

        <SavedTabs active={activeTab} questionCount={saved.length} topicCount={savedTopics.length} />

        {isEmpty ? (
          <div className="mt-8 rounded-2xl border border-dashed border-ink/20 p-12 text-center">
            <p className="text-ink/60">You have not saved any questions yet.</p>
            <Link href="/interview-questions" className="mt-5 inline-block rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper">
              Browse questions
            </Link>
          </div>
        ) : (
          <>
            {showQuestions && saved.length > 0 && (
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {saved.map(item => <QuestionCard key={item.id} question={item.question} />)}
              </div>
            )}
            {showTopics && savedTopics.length > 0 && (
              <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${showQuestions && saved.length > 0 ? "mt-6" : "mt-8"}`}>
                {savedTopics.map(item => (
                  <Link
                    key={item.id}
                    href={`/learn/${item.topic.category.slug}/${item.topic.slug}`}
                    className="rounded-2xl border border-ink/10 bg-white/70 p-5 transition-colors hover:border-coral"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-ink/40">{item.topic.category.name}</p>
                    <p className="mt-2 font-display text-lg font-bold">{item.topic.title}</p>
                    {item.topic.shortDescription && <p className="mt-2 text-sm leading-6 text-ink/60">{item.topic.shortDescription}</p>}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
