"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MockInterviewFlow } from "@/components/mock-interview/mock-interview-flow";
import type { PracticeQuestion } from "@/lib/practice";

type Category = { id: string; name: string; slug: string };
type Props = { categories: Category[] };

const EXPERIENCE_OPTIONS = [["", "Any experience"], ["FRESHER", "Fresher"], ["INTERNSHIP", "Internship"], ["MID_LEVEL", "Mid-level"], ["EXPERIENCED", "Experienced"]];
const DIFFICULTY_OPTIONS = [["", "Mixed difficulty"], ["EASY", "Easy"], ["MEDIUM", "Medium"], ["HARD", "Hard"]];
const COUNT_OPTIONS = [5, 10, 15, 20];
const TIME_LIMIT_OPTIONS = [15, 30, 45, 60];

export function MockInterviewSetup({ categories }: Props) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [count, setCount] = useState(10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(30);
  const [questions, setQuestions] = useState<PracticeQuestion[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    setError("");
    const query = new URLSearchParams({ count: String(count), ...(role ? { category: role } : {}), ...(experience ? { experience } : {}), ...(difficulty ? { difficulty } : {}) });
    try {
      const response = await fetch(`/api/practice/questions?${query}`);
      const data = await response.json();
      if (!response.ok || !data.questions?.length) throw new Error("No questions");
      setQuestions(data.questions);
    } catch {
      setError("No questions matched that combination. Try a broader role or difficulty.");
    } finally {
      setLoading(false);
    }
  }

  if (questions) return <MockInterviewFlow questions={questions} timeLimitMinutes={timeLimitMinutes} />;

  return (
    <div className="rounded-3xl border border-ink/10 bg-white/70 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Role / technology
          <select value={role} onChange={event => setRole(event.target.value)} className="mt-2 block h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal">
            <option value="">Any role</option>
            {categories.map(category => <option value={category.slug} key={category.id}>{category.name}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold">
          Experience
          <select value={experience} onChange={event => setExperience(event.target.value)} className="mt-2 block h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal">
            {EXPERIENCE_OPTIONS.map(([value, text]) => <option value={value} key={value}>{text}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold">
          Difficulty
          <select value={difficulty} onChange={event => setDifficulty(event.target.value)} className="mt-2 block h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal">
            {DIFFICULTY_OPTIONS.map(([value, text]) => <option value={value} key={value}>{text}</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold">
          Number of questions
          <select value={count} onChange={event => setCount(Number(event.target.value))} className="mt-2 block h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal">
            {COUNT_OPTIONS.map(value => <option value={value} key={value}>{value} questions</option>)}
          </select>
        </label>
        <label className="block text-sm font-bold sm:col-span-2">
          Time limit
          <select value={timeLimitMinutes} onChange={event => setTimeLimitMinutes(Number(event.target.value))} className="mt-2 block h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal sm:w-1/2">
            {TIME_LIMIT_OPTIONS.map(value => <option value={value} key={value}>{value} minutes</option>)}
          </select>
        </label>
      </div>
      {error && <p role="alert" className="mt-5 text-sm font-semibold text-coral">{error}</p>}
      <Button type="button" onClick={start} disabled={loading} className="mt-8">
        {loading ? "Building interview..." : "Start mock interview"} <ArrowRight size={17} />
      </Button>
      <p className="mt-4 text-xs text-ink/50">The timer is a guide to help you pace yourself &mdash; it does not automatically end the interview.</p>
    </div>
  );
}
