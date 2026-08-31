import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/ui/container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StudyExercise } from "@/components/study/study-exercise";
import { TopicProgressActions } from "@/components/study/topic-progress-actions";
import { SaveTopicButton } from "@/components/study/save-topic-button";
import { getPublishedTopic, getOwnedTopicProgress, getAdjacentTopics } from "@/lib/study";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ category: string; topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, topic } = await params;
  const item = await getPublishedTopic(category, topic);
  if (!item) return {};
  return {
    title: item.seoTitle ?? item.title,
    description: item.seoDescription ?? item.shortDescription ?? `Free ${item.title} study guide with worked examples and practice exercises.`,
    alternates: { canonical: `/learn/${item.category.slug}/${item.slug}` },
  };
}

export default async function LearnTopicPage({ params }: Props) {
  const { category, topic } = await params;
  const item = await getPublishedTopic(category, topic);
  if (!item) notFound();

  const session = await getServerSession(authOptions);
  const [progress, savedTopic, adjacent] = await Promise.all([
    session?.user?.id ? getOwnedTopicProgress(session.user.id, item.id) : Promise.resolve(null),
    session?.user?.id ? prisma.savedStudyTopic.findUnique({ where: { userId_topicId: { userId: session.user.id, topicId: item.id } } }) : Promise.resolve(null),
    getAdjacentTopics(item.category.slug, item.id),
  ]);
  const progressStatus = progress?.status ?? "NOT_STARTED";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Learn", item: `${baseUrl}/learn` },
      { "@type": "ListItem", position: 3, name: item.category.name, item: `${baseUrl}/learn/${item.category.slug}` },
      { "@type": "ListItem", position: 4, name: item.title, item: `${baseUrl}/learn/${item.category.slug}/${item.slug}` },
    ],
  };

  const relatedQuestions = item.questionRelations
    .map(relation => relation.question)
    .filter(question => question.isPublished);

  return (
    <section className="py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link><span className="px-2">/</span>
          <Link href="/learn">Learn</Link><span className="px-2">/</span>
          <Link href={`/learn/${item.category.slug}`}>{item.category.name}</Link><span className="px-2">/</span>
          <span className="font-semibold text-ink">{item.title}</span>
        </nav>

        <div className="mt-12 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold">{item.module.studyPath.name}</span>
            {item.estimatedMinutes && <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/60">{item.estimatedMinutes} min read</span>}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl">{item.title}</h1>
          {item.shortDescription && <p className="mt-5 text-lg leading-8 text-ink/60">{item.shortDescription}</p>}
          {session?.user?.id ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <TopicProgressActions topicId={item.id} initialStatus={progressStatus} />
              <SaveTopicButton topicId={item.id} initialSaved={Boolean(savedTopic)} />
            </div>
          ) : (
            <p className="mt-6 text-sm text-ink/50">
              <Link href="/login?callbackUrl=/learn" className="font-bold text-coral">Log in</Link> to track your progress on this topic.
            </p>
          )}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="max-w-3xl space-y-12">
            {item.sections.map(section => (
              <div key={section.id}>
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <div className="prose prose-ink mt-4 max-w-none leading-8">
                  {section.content.split(/\n\n+/).map((paragraph, index) => (
                    <p key={`${section.id}-${index}`} className="text-ink/70">{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}

            {item.examples.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold">Examples</h2>
                <div className="mt-5 space-y-6">
                  {item.examples.map(example => (
                    <div key={example.id}>
                      {example.explanation && <p className="mb-3 text-sm leading-6 text-ink/60">{example.explanation}</p>}
                      <pre className="overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-6 text-paper">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.exercises.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold">Practice exercises</h2>
                <div className="mt-5 space-y-4">
                  {item.exercises.map(exercise => <StudyExercise key={exercise.id} exercise={exercise} />)}
                </div>
              </div>
            )}
          </article>

          <aside className="h-fit rounded-2xl bg-ink p-6 text-paper lg:sticky lg:top-6">
            <h2 className="font-display text-xl font-bold">In this guide</h2>
            <ul className="mt-4 space-y-2 text-sm text-paper/70">
              {item.sections.map(section => <li key={section.id}>{section.title}</li>)}
            </ul>
            {relatedQuestions.length > 0 && (
              <>
                <h2 className="mt-8 font-display text-xl font-bold">Practice this next</h2>
                <ul className="mt-4 space-y-3">
                  {relatedQuestions.map(question => (
                    <li key={question.id}>
                      <Link href={`/questions/${question.slug}`} className="text-sm leading-5 text-paper/80 hover:text-coral">
                        {question.question}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>

        <nav aria-label="Topic navigation" className="mt-14 flex max-w-3xl flex-col gap-3 border-t border-ink/10 pt-8 sm:flex-row sm:justify-between">
          {adjacent.previous ? (
            <Link
              href={`/learn/${item.category.slug}/${adjacent.previous.slug}`}
              className="flex flex-1 items-center gap-3 rounded-2xl border border-ink/10 p-4 transition-colors hover:border-coral sm:max-w-xs"
            >
              <ChevronLeft size={18} className="shrink-0 text-ink/40" />
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-ink/40">Previous</span>
                <span className="block font-semibold text-ink">{adjacent.previous.title}</span>
              </span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}

          {adjacent.next ? (
            <Link
              href={`/learn/${item.category.slug}/${adjacent.next.slug}`}
              className="flex flex-1 items-center justify-end gap-3 rounded-2xl border border-ink/10 p-4 text-right transition-colors hover:border-coral sm:max-w-xs"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-ink/40">Next</span>
                <span className="block font-semibold text-ink">{adjacent.next.title}</span>
              </span>
              <ChevronRight size={18} className="shrink-0 text-ink/40" />
            </Link>
          ) : (
            <Link
              href={`/learn/${item.category.slug}`}
              className="flex flex-1 items-center justify-end gap-3 rounded-2xl border border-coral/30 bg-coral/5 p-4 text-right text-coral transition-colors hover:border-coral sm:max-w-xs"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest">All done</span>
                <span className="block font-semibold">Back to {item.category.name}</span>
              </span>
              <ChevronRight size={18} className="shrink-0" />
            </Link>
          )}
        </nav>
      </Container>
    </section>
  );
}
