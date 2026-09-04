import Link from "next/link";
import { QuestionCard } from "@/components/questions/question-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { ExperienceLandingData } from "@/lib/experience-seo";

export function ExperienceLanding({ data, technology }: { data: ExperienceLandingData; technology?: { name: string; slug: string } }) {
  const subject = technology?.name ?? "Interview";
  const practiceHref = technology ? `/practice?category=${technology.slug}` : "/practice";
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link><span className="px-2">/</span>
          <Link href="/interview-questions">Interview questions</Link><span className="px-2">/</span>
          {technology ? <><Link href={`/interview-questions/${technology.slug}`}>{technology.name}</Link><span className="px-2">/</span></> : null}
          <span className="font-semibold text-ink">{data.level.label}</span>
        </nav>

        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-coral">Focused preparation</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold sm:text-5xl">
          {subject} Interview Questions for {data.level.label}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/60">
          Prepare for {subject.toLowerCase()} interviews with {data.total.toLocaleString()} published questions, practical answer guidance, and focused practice for {data.level.singular}s.
        </p>
        <Button href={practiceHref} className="mt-7">Practice {subject} questions</Button>

        {data.categories.length > 1 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold">Explore {data.level.label.toLowerCase()} question categories</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {data.categories.map((category) => (
                <Link key={category.id} href={`/interview-questions/${category.slug}`} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:border-coral hover:text-coral">
                  {category.name} ({category.count})
                </Link>
              ))}
            </div>
          </section>
        )}

        {data.learnCategories.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold">Learn before your {data.level.singular} interview</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.learnCategories.map((category) => (
                <Link key={category.id} href={`/learn/${category.slug}`} className="rounded-2xl border border-ink/10 bg-white/70 p-5 hover:border-coral">
                  <h3 className="font-display text-lg font-bold">{category.name} learning guide</h3>
                  {category.description && <p className="mt-2 text-sm leading-6 text-ink/60">{category.description}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Popular {subject.toLowerCase()} questions for {data.level.label.toLowerCase()}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.questions.map((question) => <QuestionCard key={question.id} question={question} />)}
          </div>
          <p className="mt-6 text-sm text-ink/60">Showing a selection of {data.total.toLocaleString()} published questions. <Link href={practiceHref} className="font-bold text-coral hover:underline">Practice this focus</Link>.</p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-bold">{subject} {data.level.label.toLowerCase()} interview FAQ</h2>
          <div className="mt-5 grid gap-4">
            <details className="rounded-2xl border border-ink/10 bg-white/70 p-5">
              <summary className="cursor-pointer font-display text-lg font-bold">How many {subject.toLowerCase()} questions are available?</summary>
              <p className="mt-3 leading-7 text-ink/70">This page includes {data.total.toLocaleString()} published questions for {data.level.label.toLowerCase()} candidates.</p>
            </details>
            <details className="rounded-2xl border border-ink/10 bg-white/70 p-5">
              <summary className="cursor-pointer font-display text-lg font-bold">How should I prepare?</summary>
              <p className="mt-3 leading-7 text-ink/70">Review questions by category, study the answer guidance, and practice explaining your reasoning clearly under realistic interview conditions.</p>
            </details>
          </div>
        </section>
      </Container>
    </section>
  );
}
