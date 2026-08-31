"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TARGET_ROLES, TECHNOLOGY_OPTIONS } from "@/lib/user-profile";

const EXPERIENCE_LEVELS = [
  { value: "FRESHER", label: "Fresher (0-1 yrs)" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "MID_LEVEL", label: "Mid-level (2-5 yrs)" },
  { value: "EXPERIENCED", label: "Experienced (5+ yrs)" },
] as const;

const GOAL_OPTIONS = [15, 30, 45, 60];

export function OnboardingForm() {
  const router = useRouter();
  const [targetRole, setTargetRole] = useState<string>(TARGET_ROLES[0]);
  const [experienceLevel, setExperienceLevel] = useState<string>("MID_LEVEL");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(30);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleTechnology(tech: string) {
    setTechnologies((current) => (current.includes(tech) ? current.filter((t) => t !== tech) : [...current, tech]));
  }

  async function handleSubmit() {
    if (technologies.length === 0) {
      setError("Pick at least one technology.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, experienceLevel, preferredTechnologies: technologies, dailyGoalMinutes }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Could not save your preferences.");
        setSaving(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="mt-10 space-y-8">
      <div>
        <h2 className="font-display text-lg font-bold">Target role</h2>
        <select
          className="mt-3 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"
          value={targetRole}
          onChange={(event) => setTargetRole(event.target.value)}
        >
          {TARGET_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">Experience level</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setExperienceLevel(level.value)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                experienceLevel === level.value ? "border-coral bg-coral/10 text-coral" : "border-ink/15 text-ink/70 hover:border-ink/30"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">Technologies you&apos;re focusing on</h2>
        <p className="mt-1 text-sm text-ink/50">Pick as many as apply.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {TECHNOLOGY_OPTIONS.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => toggleTechnology(tech)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                technologies.includes(tech) ? "border-coral bg-coral/10 text-coral" : "border-ink/15 text-ink/60 hover:border-ink/30"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">Daily study goal</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => setDailyGoalMinutes(minutes)}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
                dailyGoalMinutes === minutes ? "border-coral bg-coral/10 text-coral" : "border-ink/15 text-ink/60 hover:border-ink/30"
              }`}
            >
              {minutes} min
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-paper hover:bg-coral disabled:opacity-60"
        >
          {saving ? "Saving…" : "Start preparing"}
        </button>
        {error && <span className="text-sm font-semibold text-coral">{error}</span>}
      </div>
    </div>
  );
}
