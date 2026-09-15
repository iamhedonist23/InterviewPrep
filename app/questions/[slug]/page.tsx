import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
} from "lucide-react";
import { QuestionCard } from "@/components/questions/question-card";
import { RelatedQuestionsSection } from "@/components/questions/related-questions-section";
import { AnswerSection } from "@/components/questions/answer-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFollowUpQuestionLinks, getQuestion, relatedQuestions } from "@/services/questions";
import { siteUrl } from "@/lib/site";
import { getPublishedTopicsForQuestion } from "@/lib/study-public";
import { getRelatedInterviewCategory } from "@/lib/public-content";
import { ContentOwner } from "@/components/editorial/content-owner";
import { OfficialSources } from "@/components/editorial/official-sources";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question) notFound();
  return {
    title: question.seoTitle ?? question.question,
    description: question.seoDescription ?? question.shortDescription,
    alternates: { canonical: `/questions/${question.slug}` },
    openGraph: {
      title: question.seoTitle ?? question.question,
      description: question.seoDescription ?? question.shortDescription,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: question.question }],
    },
  };
}

const list = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const normalizeQuestionText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const stripBullet = (item: string) =>
  item.replace(/^[\s•\-*]+/, "").replace(/\s*[-–—]\s*$/, "").trim();

const formatMetadataValue = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question) notFound();

  const followUps = list(question.followUpQuestions);
  const [related, learnTopics, learnCategory, followUpQuestionRows] = await Promise.all([
    relatedQuestions(question),
    getPublishedTopicsForQuestion(question.id),
    getRelatedInterviewCategory(question.category.name),
    getFollowUpQuestionLinks(followUps),
  ]);
  const keyPoints = list(question.keyPoints);
  const strongCandidateChecklist = keyPoints.length
    ? keyPoints.map(stripBullet)
    : [question.shortDescription];
  const questionMetadata = [
    { label: "Category", value: question.category.name },
    { label: "Difficulty", value: formatMetadataValue(question.difficulty) },
    { label: "Interview format", value: formatMetadataValue(question.interviewType) },
    ...(question.subcategory ? [{ label: "Topic", value: question.subcategory.name }] : []),
    { label: "Experience level", value: formatMetadataValue(question.experienceLevel) },
  ];
  const followUpLinks = new Map(
    followUpQuestionRows.map((item) => [normalizeQuestionText(item.question), item.slug]),
  );

  const baseUrl = siteUrl;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Interview questions",
        item: `${baseUrl}/interview-questions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: question.category.name,
        item: `${baseUrl}/interview-questions/${question.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: question.question,
        item: `${baseUrl}/questions/${question.slug}`,
      },
    ],
  };

  return (
    <article className="overflow-x-hidden py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 text-sm text-ink/55">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/interview-questions">Interview questions</Link>
          <span>/</span>
          <Link href={`/interview-questions/${question.category.slug}`}>
            {question.category.name}
          </Link>
          <span>/</span>
          <span className="font-semibold text-ink">Question</span>
        </nav>

        <div className="mt-12 max-w-5xl min-w-0">
          <header className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold">
                {question.category.name}
              </span>
              <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/60">
                {question.difficulty}
              </span>
              <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/60">
                {question.interviewType}
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl break-words font-display text-3xl font-bold leading-[0.95] sm:text-4xl lg:text-5xl">
              {question.question}
            </h1>

            <p className="mt-5 max-w-3xl break-words text-base leading-7 text-ink/60 sm:text-lg">
              {question.shortDescription}
            </p>

          </header>

          <details className="mt-8 rounded-2xl border border-ink/10 bg-white/70 p-4 lg:hidden">
            <summary className="cursor-pointer list-none font-display text-lg font-bold">
              Question Details
            </summary>
            <dl className="mt-4 grid gap-3 border-t border-ink/10 pt-4 sm:grid-cols-2">
              {questionMetadata.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink/50">{item.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </details>

          <div className="mt-6 lg:hidden">
            <ContentOwner updatedAt={question.updatedAt} />
          </div>

          <div className="mt-12 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
            <div className="min-w-0 space-y-8">
              <AnswerSection
                key={question.slug}
                sampleAnswer={question.sampleAnswer}
                detailedAnswer={question.detailedAnswer ?? null}
              />

              {followUps.length > 0 && (
                <section className="rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">
                    Follow-up questions
                  </h2>
                  <ul className="mt-4 grid gap-3">
                    {followUps.map((followUp) => {
                      const followUpSlug = followUpLinks.get(normalizeQuestionText(followUp));

                      return (
                        <li
                          key={followUp}
                          className="rounded-xl border border-ink/10 bg-ink/5 transition-colors hover:border-coral/50 hover:bg-coral/5"
                        >
                          {followUpSlug ? (
                            <Link
                              href={`/questions/${followUpSlug}`}
                              className="flex min-w-0 items-center justify-between gap-3 p-4 text-base font-medium text-ink/75 hover:text-coral"
                            >
                              <span className="break-words">{followUp}</span>
                              <ArrowRight size={16} className="shrink-0 text-coral" />
                            </Link>
                          ) : (
                            <Link
                              href={`/search?q=${encodeURIComponent(followUp)}`}
                              className="flex min-w-0 items-center justify-between gap-3 p-4 text-base font-medium text-ink/75 hover:text-coral"
                            >
                              <span className="break-words">{followUp}</span>
                              <ArrowRight size={16} className="shrink-0 text-coral" />
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              <details open className="rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-coral" />
                    <h2 className="font-display text-xl font-bold sm:text-2xl">
                      Practice your answer
                    </h2>
                  </div>
                  <ChevronDown size={18} className="shrink-0 text-ink/60" />
                </summary>
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink/65">
                    <Clock3 className="h-4 w-4 text-coral" />
                    You have 90 seconds.
                  </div>
                  <p className="mt-4 text-base leading-8 text-ink/70">
                    “{question.question}”
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button href={`/practice?question=${question.slug}`} className="bg-coral hover:bg-ink">
                      Start Practice
                      <ArrowRight size={17} />
                    </Button>
                    <Link
                      href="/practice"
                      className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 text-sm font-bold text-ink transition hover:border-coral hover:text-coral"
                    >
                      Open practice room
                    </Link>
                  </div>

                  <div className="mt-6 rounded-xl bg-mint/40 p-4">
                    <p className="text-sm font-bold text-ink">Did you cover?</p>
                    <ul className="mt-3 grid gap-2">
                      {strongCandidateChecklist.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-ink/70">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-coral" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              <OfficialSources category={question.category.name} />

              <p className="border-t border-ink/10 pt-6 text-sm leading-6 text-ink/60">
                Found incorrect information, broken code, an outdated statement, a broken link, or a typo?{" "}
                <Link
                  href={`mailto:instantinterviewprep@gmail.com?subject=Correction%20for%20${encodeURIComponent(question.slug)}`}
                  className="font-semibold text-coral hover:underline"
                >
                  Suggest a correction
                </Link>
                .
              </p>
            </div>

            <aside className="sticky top-6 hidden rounded-2xl border border-ink/10 bg-white/70 p-5 lg:block">
              <h2 className="font-display text-lg font-bold">Question details</h2>
              <dl className="mt-5 space-y-4">
                {questionMetadata.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/50">{item.label}</dt>
                    <dd className="mt-1 text-sm font-semibold leading-6 text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-ink/10 pt-5">
                <ContentOwner updatedAt={question.updatedAt} />
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <RelatedQuestionsSection
            items={related.map((item) => {
              const relatedTags = list(item.tags);
              return {
                ...item,
                relevanceText: relatedTags.length
                  ? `Tests: ${relatedTags.slice(0, 3).join(" + ")}`
                  : `Related to ${question.category.name}`,
              };
            })}
          />
        )}
        {learnTopics.length > 0 && (
          <section className="mt-20 max-w-5xl">
            <h2 className="font-display text-3xl font-bold">Learn {question.category.name}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink/60">
              Build the concepts behind this question with a focused learning topic.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learnTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/learn/${topic.category.slug}/${topic.slug}`}
                  className="rounded-2xl border border-ink/10 bg-white/70 p-5 hover:border-coral"
                >
                  <span className="font-display text-lg font-bold">{topic.title}</span>
                  <span className="mt-3 block text-sm font-bold text-coral">Open learning topic</span>
                </Link>
              ))}
            </div>
            {learnCategory && (
              <p className="mt-5 text-sm text-ink/60">
                Browse the full{" "}
                <Link href={`/learn/${learnCategory.slug}`} className="font-bold text-coral hover:underline">
                  {learnCategory.name} learning course
                </Link>{" "}
                for more topics.
              </p>
            )}
          </section>
        )}
      </Container>
    </article>
  );
}