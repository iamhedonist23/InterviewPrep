"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PracticeQuestion } from "@/lib/practice";
import { simpleScore } from "@/lib/practice";

type Props = { questions: PracticeQuestion[]; timeLimitMinutes: number };
type Result = { questionId: string; answer: string; skipped: boolean; score: number | null; category: { name: string; slug: string }; difficulty?: string; interviewType?: string };

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(Math.abs(totalSeconds) / 60);
  const seconds = Math.abs(totalSeconds) % 60;
  return `${totalSeconds < 0 ? "-" : ""}${minutes}:${String(seconds).padStart(2, "0")}`;
}

function average(scores: number[]) {
  return scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : null;
}

export function MockInterviewFlow({ questions, timeLimitMinutes }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [skipped, setSkipped] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [startedAt] = useState(() => new Date().toISOString());

  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => setSecondsElapsed(value => value + 1), 1000);
    return () => clearInterval(interval);
  }, [finished]);

  const remainingSeconds = timeLimitMinutes * 60 - secondsElapsed;
  const question = questions[current];
  const answer = answers[question.id] ?? "";

  function updateAnswer(value: string) {
    setAnswers(previous => ({ ...previous, [question.id]: value }));
    setSkipped(previous => ({ ...previous, [question.id]: false }));
  }
  function toggleSkip() {
    setSkipped(previous => ({ ...previous, [question.id]: !previous[question.id] }));
  }

  const results = useMemo<Result[]>(
    () =>
      questions.map(item => ({
        questionId: item.id,
        answer: answers[item.id] ?? "",
        skipped: Boolean(skipped[item.id]),
        score: answers[item.id]?.trim() ? simpleScore(answers[item.id], item.keyPoints) : null,
        category: item.category,
        difficulty: item.difficulty,
        interviewType: item.interviewType,
      })),
    [questions, answers, skipped],
  );

  async function finish() {
    const completedAt = new Date().toISOString();
    const overallScore = average(results.flatMap(item => (item.score === null ? [] : [item.score])));
    try {
      const response = await fetch("/api/practice/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses: results.map(({ questionId, answer, skipped, score }) => ({ questionId, answer, skipped, score })),
          score: overallScore,
          startedAt,
          completedAt,
        }),
      });
      if (!response.ok) throw new Error("save failed");
      setSaved(true);
    } catch {
      setSaveError("Your results are shown below, but could not be saved to your dashboard.");
    }
    setFinished(true);
  }

  if (finished) {
    const scored = results.filter((item): item is Result & { score: number } => item.score !== null);
    const overallScore = average(scored.map(item => item.score));
    const technicalScores = scored.filter(item => item.interviewType === "TECHNICAL").map(item => item.score);
    const technicalScore = average(technicalScores);

    const byCategory = new Map<string, { name: string; scores: number[] }>();
    for (const item of scored) {
      const bucket = byCategory.get(item.category.slug) ?? { name: item.category.name, scores: [] };
      bucket.scores.push(item.score);
      byCategory.set(item.category.slug, bucket);
    }
    const categoryScores = [...byCategory.entries()].map(([slug, bucket]) => ({ slug, name: bucket.name, score: average(bucket.scores) ?? 0 }));
    const weakCategories = categoryScores.filter(item => item.score < 50).sort((a, b) => a.score - b.score);

    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-ink p-8 text-paper sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Mock interview complete</p>
          <h1 className="mt-4 font-display text-4xl font-bold">Here's how it went.</h1>
          <p className="mt-3 max-w-xl leading-7 text-paper/65">
            Scored with the same simple self-check used in regular practice &mdash; a study aid, not a graded or AI-evaluated interview.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Overall score", overallScore === null ? "\u2014" : `${overallScore}%`],
              ["Technical score", technicalScore === null ? "N/A" : `${technicalScore}%`],
              ["Time used", formatClock(secondsElapsed)],
            ].map(([label, value]) => (
              <div className="rounded-2xl bg-paper/10 p-4" key={label}>
                <p className="text-sm text-paper/60">{label}</p>
                <p className="mt-2 font-display text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-ink/10 bg-white/70 p-6">
          <h2 className="font-display text-2xl font-bold">Category scores</h2>
          {categoryScores.length === 0 ? (
            <p className="mt-3 text-ink/60">No answers were scored.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {categoryScores.map(item => (
                <div key={item.slug}>
                  <div className="flex justify-between text-sm font-semibold"><span>{item.name}</span><span>{item.score}%</span></div>
                  <div className="mt-1.5 h-2 rounded-full bg-mint"><div className="h-full rounded-full bg-coral" style={{ width: `${Math.max(4, item.score)}%` }} /></div>
                </div>
              ))}
            </div>
          )}

          {weakCategories.length > 0 && (
            <div className="mt-6 rounded-xl bg-coral/5 p-4">
              <p className="text-sm font-bold text-coral">Weak areas from this session</p>
              <p className="mt-1 text-sm text-ink/60">{weakCategories.map(item => item.name).join(", ")} scored lowest &mdash; worth another pass.</p>
            </div>
          )}

          {saveError && <p role="alert" className="mt-4 text-sm font-semibold text-coral">{saveError}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/dashboard/review">Review weak areas</Button>
            <Button href="/mock-interview" variant="outline">Run another mock interview</Button>
          </div>
          {saved && <p className="mt-4 text-sm font-semibold text-ink/55">Saved to your dashboard.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Mock interview</p>
          <p className="mt-2 text-sm font-semibold text-ink/55">Question {current + 1} of {questions.length}</p>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${remainingSeconds < 0 ? "bg-coral/10 text-coral" : "bg-ink/5 text-ink/70"}`}>
          <Clock size={16} /> {remainingSeconds < 0 ? `${formatClock(remainingSeconds)} over` : formatClock(remainingSeconds)}
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-mint">
        <div className="h-full rounded-full bg-coral transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="mt-8 rounded-3xl border border-ink/10 bg-white/70 p-6 sm:p-10">
        <div className="flex flex-wrap gap-2 text-xs font-bold text-ink/55">
          <span className="rounded-full bg-mint px-3 py-1">{question.category.name}</span>
          {question.difficulty && <span className="rounded-full bg-ink/5 px-3 py-1">{question.difficulty}</span>}
        </div>
        <h1 className="mt-7 font-display text-3xl font-bold leading-tight sm:text-4xl">{question.question}</h1>
        <button type="button" onClick={() => setShowExplanation(value => !value)} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-coral">
          <Lightbulb size={17} /> {showExplanation ? "Hide guidance" : "Show guidance"}
        </button>
        {showExplanation && (
          <div className="mt-4 rounded-2xl bg-mint/60 p-5 text-sm leading-7 text-ink/70">
            {question.explanation}
            <p className="mt-3 font-bold">Think about: {question.keyPoints.join("; ")}</p>
          </div>
        )}
        <label className="mt-8 block text-sm font-bold" htmlFor="mock-answer">
          Your answer
          <textarea
            id="mock-answer"
            value={answer}
            onChange={event => updateAnswer(event.target.value)}
            placeholder="Write your answer in your own words..."
            className="mt-2 min-h-44 w-full resize-y rounded-2xl border border-ink/15 bg-paper p-4 font-normal leading-7"
          />
        </label>
        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button type="button" variant="outline" onClick={() => setCurrent(value => Math.max(0, value - 1))} className={current === 0 ? "invisible" : ""}>
            <ArrowLeft size={16} /> Previous
          </Button>
          <button type="button" onClick={toggleSkip} className={`rounded-full border px-5 py-2 text-sm font-bold ${skipped[question.id] ? "border-coral text-coral" : "border-ink/15 text-ink/65"}`}>
            {skipped[question.id] ? "Unskip" : "Skip"}
          </button>
          {current === questions.length - 1 ? (
            <Button type="button" onClick={finish}>Finish <Check size={16} /></Button>
          ) : (
            <Button type="button" onClick={() => { setShowExplanation(false); setCurrent(value => value + 1); }}>Next <ArrowRight size={16} /></Button>
          )}
        </div>
      </div>
    </div>
  );
}
