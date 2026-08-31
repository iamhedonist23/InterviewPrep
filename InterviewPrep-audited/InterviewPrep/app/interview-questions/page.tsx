import type { Metadata } from "next";
import type { Difficulty, ExperienceLevel, InterviewType } from "@prisma/client";
import Link from "next/link";
import { QuestionCard } from "@/components/questions/question-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { listQuestions } from "@/services/questions";

export const dynamic = "force-dynamic";
// Canonical points at the unfiltered listing so that filter/pagination query
// strings (?difficulty=..., ?page=2, etc.) don't get indexed as separate
// duplicate pages.
export const metadata: Metadata = { title: "Interview Questions", description: "Browse free interview questions across every category, difficulty, and experience level.", alternates: { canonical: "/interview-questions" } };
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
export default async function QuestionsPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = one(params.q); const category = one(params.category);
  const experience = one(params.experience) as ExperienceLevel | undefined; const difficulty = one(params.difficulty) as Difficulty | undefined; const interviewType = one(params.type) as InterviewType | undefined; const page = Number(one(params.page) ?? 1);
  const result = await listQuestions({ query, category, experience, difficulty, interviewType, page: Number.isFinite(page) ? page : 1 });
  const makeUrl = (nextPage: number) => { const next = new URLSearchParams(); if (query) next.set("q", query); if (category) next.set("category", category); if (experience) next.set("experience", experience); if (difficulty) next.set("difficulty", difficulty); if (interviewType) next.set("type", interviewType); next.set("page", String(nextPage)); return `/interview-questions?${next}`; };
  return <section className="py-16 sm:py-20"><Container><p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Question library</p><h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Interview questions, made useful</h1><p className="mt-4 max-w-2xl leading-7 text-ink/60">Search practical prompts and read the thinking behind a strong answer. Everything here is free to explore.</p><form className="mt-8 grid gap-3 rounded-2xl border border-ink/10 bg-white/70 p-4 md:grid-cols-[1fr_auto_auto_auto_auto_auto]"><label className="sr-only" htmlFor="q">Search questions</label><input id="q" name="q" defaultValue={query} placeholder="Search questions" className="h-11 rounded-xl border border-ink/15 bg-paper px-4" /><select name="difficulty" defaultValue={difficulty ?? ""} className="h-11 rounded-xl border border-ink/15 bg-paper px-3"><option value="">Difficulty</option><option value="EASY">Easy</option><option value="MEDIUM">Medium</option><option value="HARD">Hard</option></select><select name="experience" defaultValue={experience ?? ""} className="h-11 rounded-xl border border-ink/15 bg-paper px-3"><option value="">Experience</option><option value="FRESHER">Fresher</option><option value="INTERNSHIP">Internship</option><option value="MID_LEVEL">Mid-level</option><option value="EXPERIENCED">Experienced</option></select><select name="type" defaultValue={interviewType ?? ""} className="h-11 rounded-xl border border-ink/15 bg-paper px-3"><option value="">Type</option><option value="TECHNICAL">Technical</option><option value="BEHAVIORAL">Behavioral</option><option value="HR">HR</option><option value="CASE_STUDY">Case study</option><option value="SITUATIONAL">Situational</option></select><Button type="submit">Filter</Button><Link href="/interview-questions" className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-bold text-ink/60 hover:text-coral">Clear</Link></form><p className="mt-8 text-sm font-bold text-ink/55">{result.total} published questions</p>{result.questions.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{result.questions.map(question => <QuestionCard key={question.id} question={question} />)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/60">No questions matched those filters.</div>}<div className="mt-10 flex justify-between">{result.page > 1 ? <Button href={makeUrl(result.page - 1)} variant="outline">Previous</Button> : <span />}{result.page < result.pageCount && <Button href={makeUrl(result.page + 1)} variant="outline">Next</Button>}</div></Container></section>;
}
