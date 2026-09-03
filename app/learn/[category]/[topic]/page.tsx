import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/ui/container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StudyExercise } from "@/components/study/study-exercise";
import { LearnMarkdown } from "@/components/learn/learn-markdown";
import { TopicProgressActions } from "@/components/study/topic-progress-actions";
import { SaveTopicButton } from "@/components/study/save-topic-button";
import { getOwnedTopicProgress } from "@/lib/study";
import { getPublishedTopic, getAdjacentTopics, getPublishedTopicLinks } from "@/lib/study-public";
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
  const prerequisiteIds = Array.isArray(item.prerequisiteIds) ? item.prerequisiteIds.filter((id): id is string => typeof id === "string") : [];
  const relatedTopicIds = Array.isArray(item.relatedTopicIds) ? item.relatedTopicIds.filter((id): id is string => typeof id === "string") : [];
  const [progress, savedTopic, adjacent, prerequisiteLinks, relatedTopicLinks] = await Promise.all([
    session?.user?.id ? getOwnedTopicProgress(session.user.id, item.id) : Promise.resolve(null),
    session?.user?.id ? prisma.savedStudyTopic.findUnique({ where: { userId_topicId: { userId: session.user.id, topicId: item.id } } }) : Promise.resolve(null),
    getAdjacentTopics(item.category.slug, item.id),
    getPublishedTopicLinks(prerequisiteIds),
    getPublishedTopicLinks(relatedTopicIds),
  ]);
  const prerequisites = prerequisiteLinks.sort((left, right) => prerequisiteIds.indexOf(left.id) - prerequisiteIds.indexOf(right.id));
  const relatedTopics = relatedTopicLinks.sort((left, right) => relatedTopicIds.indexOf(left.id) - relatedTopicIds.indexOf(right.id));
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

  const relatedQuestions = item.questionRelations.map(relation => relation.question);

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

        {/* Prerequisites */}
        {prerequisites.length > 0 && (
          <div className="mt-12 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-amber-900">
              <span>📚</span> Prerequisites
            </h2>
            <p className="mt-2 text-sm text-amber-800">Make sure you understand these concepts before continuing:</p>
            <ul className="mt-4 space-y-2">
              {prerequisites.map(prereq => (
                <li key={prereq.id}>
                  <Link
                    href={`/learn/${prereq.category.slug}/${prereq.slug}`}
                    className="text-sm font-semibold text-amber-900 hover:text-coral"
                  >
                    → {prereq.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="max-w-3xl space-y-12">
            {item.sections.map(section => (
              <div key={section.id} id={section.id}>
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <LearnMarkdown content={section.content} />
              </div>
            ))}

            {item.examples.length > 0 && (
              <div id="examples">
                <h2 className="font-display text-2xl font-bold">Code examples</h2>
                <div className="mt-5 space-y-6">
                  {item.examples.map((example, idx) => (
                    <div key={example.id}>
                      <div className="mb-3 flex items-center justify-between">
                        {example.explanation && <p className="text-sm leading-6 text-ink/60">{example.explanation}</p>}
                        <span className="rounded-md bg-ink/5 px-2 py-1 text-xs font-bold uppercase text-ink/60">
                          {example.language}
                        </span>
                      </div>
                      <pre className="overflow-x-auto rounded-xl border border-ink/10 bg-ink p-4 text-sm leading-6 text-paper">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.exercises.length > 0 && (
              <div id="exercises">
                <h2 className="font-display text-2xl font-bold">Knowledge check</h2>
                <p className="mt-2 text-ink/60">Test your understanding with these practice exercises:</p>
                <div className="mt-5 space-y-4">
                  {item.exercises.map(exercise => <StudyExercise key={exercise.id} exercise={exercise} />)}
                </div>
              </div>
            )}

            {relatedQuestions.length > 0 && (
              <div className="rounded-2xl border-2 border-coral/30 bg-coral/5 p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-coral">Ready to practice?</h2>
                <p className="mt-2 text-ink/70">
                  You've learned the fundamentals. Now test yourself with real interview questions on this topic.
                </p>
                <div className="mt-6 space-y-3">
                  {relatedQuestions.slice(0, 5).map(question => (
                    <Link
                      key={question.id}
                      href={`/questions/${question.slug}`}
                      className="block rounded-lg border border-coral/20 bg-white p-3 hover:border-coral hover:bg-coral/5 sm:p-4"
                    >
                      <p className="font-semibold text-ink">{question.question}</p>
                    </Link>
                  ))}
                </div>
                {relatedQuestions.length > 5 && (
                  <Link
                    href={`/questions?search=${encodeURIComponent(item.title)}`}
                    className="mt-4 inline-block rounded-full bg-coral px-5 py-2 text-sm font-bold text-white hover:bg-coral/90"
                  >
                    View all {relatedQuestions.length} questions
                  </Link>
                )}
              </div>
            )}

            {/* Related topics */}
            {relatedTopics.length > 0 && (
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
                <h2 className="font-display text-2xl font-bold">Related topics</h2>
                <p className="mt-2 text-ink/60">Deepen your knowledge with these related subjects:</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {relatedTopics.map(related => (
                    <Link
                      key={related.id}
                      href={`/learn/${related.category.slug}/${related.slug}`}
                      className="rounded-lg border border-ink/10 p-4 hover:border-coral hover:bg-coral/5"
                    >
                      <p className="font-semibold text-ink">{related.title}</p>
                      <p className="text-xs text-ink/50">→ Continue learning</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-6">
            {/* Table of contents */}
            <div className="h-fit rounded-2xl bg-ink p-6 text-paper lg:sticky lg:top-6">
              <h2 className="font-display text-lg font-bold">Contents</h2>
              <ul className="mt-4 space-y-2 text-sm text-paper/70">
                {item.sections.map(section => (
                  <li key={section.id} className="hover:text-coral">
                    <a href={`#${section.id}`} className="block">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>

              {item.examples.length > 0 && (
                <div className="mt-4 border-t border-paper/20 pt-4">
                  <a href="#examples" className="block text-sm text-paper/80 hover:text-coral">
                    Code examples
                  </a>
                </div>
              )}

              {item.exercises.length > 0 && (
                <div className="mt-2">
                  <a href="#exercises" className="block text-sm text-paper/80 hover:text-coral">
                    Knowledge check
                  </a>
                </div>
              )}
            </div>

            {/* Learning progress */}
            {session?.user?.id && (
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
                <h3 className="font-semibold text-ink">Your progress</h3>
                <div className="mt-4">
                  <div className="text-sm text-ink/60">
                    {progressStatus === "COMPLETED" ? (
                      <p className="font-bold text-mint">✓ Completed</p>
                    ) : progressStatus === "STARTED" ? (
                      <p className="font-bold text-coral">In progress</p>
                    ) : (
                      <p>Not started</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Info card */}
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/60">About this lesson</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink/60">Difficulty</dt>
                  <dd className="mt-1 font-bold capitalize text-ink">
                    {item.module.studyPath.level.toLowerCase().replace(/_/g, ' ')}
                  </dd>
                </div>
                {item.estimatedMinutes && (
                  <div>
                    <dt className="font-semibold text-ink/60">Reading time</dt>
                    <dd className="mt-1 font-bold text-ink">{item.estimatedMinutes} minutes</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold text-ink/60">Content sections</dt>
                  <dd className="mt-1 font-bold text-ink">{item.sections.length}</dd>
                </div>
              </dl>
            </div>
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
