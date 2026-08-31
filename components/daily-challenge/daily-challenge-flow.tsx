"use client";
import { useEffect, useState } from "react";
import { Check, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simpleScore } from "@/lib/practice";

type ChallengeQuestion = { id: string; question: string; explanation: string; keyPoints: string[]; category: { name: string; slug: string } };
type ChallengeState = { questions: ChallengeQuestion[]; completedAt: string | null; score: number | null };

export function DailyChallengeFlow() {
  const [state, setState] = useState<ChallengeState | "loading" | "error">("loading");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/daily-challenge")
      .then(response => (response.ok ? response.json() : Promise.reject()))
      .then(data => setState(data))
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") return <p className="text-ink/55">Loading today&apos;s challenge...</p>;
  if (state === "error") return <p className="text-coral">Could not load today&apos;s challenge. Please try again shortly.</p>;

  if (state.completedAt || finished) {
    const score = finalScore ?? state.score;
    return (
      <div className="rounded-3xl bg-ink p-8 text-paper sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Challenge complete</p>
        <h2 className="mt-4 font-display text-3xl font-bold">Nice work today.</h2>
        <p className="mt-3 text-paper/65">{score === null ? "No answer was scored." : `${score}% based on the same simple self-check used in practice.`}</p>
        <p className="mt-2 text-sm text-paper/50">Come back tomorrow for a new set of questions.</p>
      </div>
    );
  }

  const questions = state.questions;
  if (questions.length === 0) return <p className="text-ink/55">No questions are available for today&apos;s challenge yet.</p>;
  const question = questions[current];

  async function finish() {
    setSubmitting(true);
    const scores = questions.map(item => (answers[item.id]?.trim() ? simpleScore(answers[item.id], item.keyPoints) : null)).filter((value): value is number => value !== null);
    const score = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0;
    try {
      await fetch("/api/daily-challenge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ score }) });
    } finally {
      setFinalScore(score);
      setFinished(true);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink/55">Question {current + 1} of {questions.length}</p>
      <div className="mt-4 h-2 rounded-full bg-mint">
        <div className="h-full rounded-full bg-coral transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="mt-8 rounded-3xl border border-ink/10 bg-white/70 p-6 sm:p-10">
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold">{question.category.name}</span>
        <h2 className="mt-6 font-display text-2xl font-bold leading-tight sm:text-3xl">{question.question}</h2>

        <button type="button" onClick={() => setShowExplanation(value => !value)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-coral">
          <Lightbulb size={16} /> {showExplanation ? "Hide guidance" : "Show guidance"}
        </button>
        {showExplanation && (
          <div className="mt-4 rounded-2xl bg-mint/60 p-5 text-sm leading-7 text-ink/70">
            {question.explanation}
            <p className="mt-3 font-bold">Think about: {question.keyPoints.join("; ")}</p>
          </div>
        )}

        <label className="mt-7 block text-sm font-bold" htmlFor="challenge-answer">
          Your answer
          <textarea
            id="challenge-answer"
            value={answers[question.id] ?? ""}
            onChange={event => setAnswers(current => ({ ...current, [question.id]: event.target.value }))}
            placeholder="Write your answer in your own words..."
            className="mt-2 min-h-36 w-full resize-y rounded-2xl border border-ink/15 bg-paper p-4 font-normal leading-7"
          />
        </label>

        <div className="mt-7 flex justify-end">
          {current === questions.length - 1 ? (
            <Button type="button" onClick={finish} disabled={submitting}>
              {submitting ? "Finishing..." : "Finish"} <Check size={16} />
            </Button>
          ) : (
            <Button type="button" onClick={() => { setShowExplanation(false); setCurrent(value => value + 1); }}>
              Next question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
