"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MultiSelectDropdown } from "@/components/ui/multi-select-dropdown";
import { PracticeSession } from "@/components/practice/practice-session";
import type { PracticeQuestion } from "@/lib/practice";

type Category = { id: string; name: string; slug: string };
type Props = { categories: Category[] };
const options = {
  experience: [
    ["", "Any experience"],
    ["FRESHER", "Fresher"],
    ["INTERNSHIP", "Internship"],
    ["MID_LEVEL", "Mid-level"],
    ["EXPERIENCED", "Experienced"],
  ],
  difficulty: [
    ["EASY", "Easy"],
    ["MEDIUM", "Medium"],
    ["HARD", "Hard"],
  ],
  type: [
    ["TECHNICAL", "Technical"],
    ["BEHAVIORAL", "Behavioral"],
    ["HR", "HR"],
    ["CASE_STUDY", "Case study"],
    ["SITUATIONAL", "Situational"],
  ],
};
export function PracticeSetup({ categories }: Props) {
  const [filters, setFilters] = useState({
    category: "",
    experience: "",
    difficulty: [] as string[],
    type: [] as string[],
  });
  const [questions, setQuestions] = useState<PracticeQuestion[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function start() {
    setLoading(true);
    setError("");
    const query = new URLSearchParams();
    if (filters.category) query.set("category", filters.category);
    if (filters.experience) query.set("experience", filters.experience);
    filters.difficulty.forEach((difficulty) =>
      query.append("difficulty", difficulty),
    );
    filters.type.forEach((type) => query.append("type", type));
    try {
      const response = await fetch(`/api/practice/questions?${query}`);
      const data = await response.json();
      if (!response.ok || !data.questions?.length)
        throw new Error("No questions");
      setQuestions(data.questions);
    } catch {
      setError(
        "No questions matched that combination. Try broadening your choices.",
      );
    } finally {
      setLoading(false);
    }
  }
  if (questions) return <PracticeSession questions={questions} />;
  return (
    <div className="rounded-3xl border border-ink/10 bg-white/70 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="text-sm font-bold">
          Category
          <select
            value={filters.category}
            onChange={(event) =>
              setFilters({ ...filters, category: event.target.value })
            }
            className="mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal"
          >
            <option value="">Any category</option>
            {categories.map((category) => (
              <option value={category.slug} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm font-bold">
          Experience level
          <select
            value={filters.experience}
            onChange={(event) =>
              setFilters({ ...filters, experience: event.target.value })
            }
            className="mt-2 h-12 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal"
          >
            {options.experience.map(([value, text]) => (
              <option value={value} key={value}>
                {text}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0 text-sm font-bold">
          Difficulty
          <MultiSelectDropdown
            label="Difficulty"
            options={options.difficulty.map(([value, label]) => ({
              value,
              label,
            }))}
            value={filters.difficulty}
            onChange={(difficulty) => setFilters({ ...filters, difficulty })}
          />
        </div>
        <div className="min-w-0 text-sm font-bold">
          Interview type
          <MultiSelectDropdown
            label="Interview type"
            options={options.type.map(([value, label]) => ({ value, label }))}
            value={filters.type}
            onChange={(type) => setFilters({ ...filters, type })}
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-5 text-sm font-semibold text-coral">
          {error}
        </p>
      )}
      <Button type="button" onClick={start} className="mt-8">
        {loading ? "Finding questions..." : "Start practice"}{" "}
        <ArrowRight size={17} />
      </Button>
      <p className="mt-4 text-xs text-ink/50">
        A session contains up to five questions. Sign in only if you want to
        save your results.
      </p>
    </div>
  );
}
