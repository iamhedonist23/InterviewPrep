"use client";
import { useState } from "react";

type Exercise = { id: string; question: string; difficulty: string; hint?: string | null; solution?: string | null; explanation?: string | null };

export function StudyExercise({ exercise }: { exercise: Exercise }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="rounded-2xl border border-ink/10 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="font-semibold leading-6 text-ink">{exercise.question}</p>
        <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/60">{exercise.difficulty}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {exercise.hint && (
          <button
            type="button"
            onClick={() => setShowHint(value => !value)}
            className="rounded-full border border-ink/15 px-4 py-2 text-xs font-bold hover:border-coral hover:text-coral"
            aria-expanded={showHint}
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>
        )}
        {(exercise.solution || exercise.explanation) && (
          <button
            type="button"
            onClick={() => setShowSolution(value => !value)}
            className="rounded-full border border-ink/15 px-4 py-2 text-xs font-bold hover:border-coral hover:text-coral"
            aria-expanded={showSolution}
          >
            {showSolution ? "Hide solution" : "Show solution"}
          </button>
        )}
      </div>

      {showHint && exercise.hint && (
        <p className="mt-4 rounded-xl bg-mint/50 p-4 text-sm leading-6 text-ink/70">{exercise.hint}</p>
      )}
      {showSolution && (
        <div className="mt-4 space-y-3">
          {exercise.solution && <pre className="overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-6 text-paper"><code>{exercise.solution}</code></pre>}
          {exercise.explanation && <p className="text-sm leading-6 text-ink/70">{exercise.explanation}</p>}
        </div>
      )}
    </div>
  );
}
