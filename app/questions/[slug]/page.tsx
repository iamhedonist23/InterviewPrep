import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/questions/question-card";
import { AnswerSection } from "@/components/questions/answer-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getQuestion, relatedQuestions } from "@/services/questions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question) return {};
  return {
    title: question.seoTitle ?? question.question,
    description: question.seoDescription ?? question.shortDescription,
    alternates: { canonical: `/questions/${question.slug}` },
    openGraph: {
      title: question.seoTitle ?? question.question,
      description: question.seoDescription ?? question.shortDescription,
      type: "article",
    },
  };
}

const list = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const question = await getQuestion(slug);
  if (!question) notFound();

  const related = await relatedQuestions(question);
  const keyPoints = list(question.keyPoints);
  const mistakes = list(question.commonMistakes);
  const followUps = list(question.followUpQuestions);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
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
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link>
          <span className="px-2">/</span>
          <Link href="/interview-questions">Interview questions</Link>
          <span className="px-2">/</span>
          <Link href={`/interview-questions/${question.category.slug}`}>
            {question.category.name}
          </Link>
          <span className="px-2">/</span>
          <span className="font-semibold text-ink">Question</span>
        </nav>

        <div className="mt-12 max-w-5xl">
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

          <h1 className="mt-6 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {question.question}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-ink/60 sm:text-lg">
            {question.shortDescription}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-10">
            <article className="space-y-8">
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Why interviewers ask this
                </h2>
                <p className="mt-3 text-base leading-8 text-ink/70">
                  {question.explanation}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  What the interviewer wants
                </h2>
                <ul className="mt-4 grid gap-3">
                  {keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-base leading-7 text-ink/70"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <AnswerSection
                sampleAnswer={question.sampleAnswer}
                detailedAnswer={question.detailedAnswer ?? null}
              />

              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Common mistakes
                </h2>
                <ul className="mt-4 grid gap-3">
                  {mistakes.map((mistake) => (
                    <li
                      key={mistake}
                      className="flex gap-3 text-base leading-7 text-ink/70"
                    >
                      <span className="text-coral">×</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Follow-up questions
                </h2>
                <ul className="mt-4 grid gap-3">
                  {followUps.map((followUp) => (
                    <li
                      key={followUp}
                      className="rounded-xl border border-ink/10 p-4 text-base text-ink/70"
                    >
                      {followUp}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="h-fit self-start rounded-2xl bg-ink p-5 text-paper sm:p-6 lg:sticky lg:top-24 lg:max-w-[280px] lg:justify-self-end">
              <h2 className="text-lg font-bold sm:text-xl">Ready to practice?</h2>
              <p className="mt-3 text-sm leading-6 text-paper/65 sm:text-[15px]">
                Turn this guide into a clear answer in your own voice.
              </p>
              <Button
                href="/practice"
                className="mt-6 w-full bg-coral hover:bg-paper hover:text-ink"
              >
                Start practicing
              </Button>
            </aside>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-bold">
              Related questions
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <QuestionCard key={item.id} question={item} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}