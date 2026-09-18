import { unstable_cache } from "next/cache";
import { getInterviewCategories, getInterviewExperienceData } from "@/lib/interview-data";

export const EXPERIENCE_LANDING_LEVELS = {
  freshers: { value: "FRESHER", label: "Freshers", singular: "fresher" },
  internship: { value: "INTERNSHIP", label: "Internships", singular: "intern" },
  "mid-level": { value: "MID_LEVEL", label: "Mid-Level Professionals", singular: "mid-level professional" },
  experienced: { value: "EXPERIENCED", label: "Experienced Professionals", singular: "experienced professional" },
} as const;

export type ExperienceSlug = keyof typeof EXPERIENCE_LANDING_LEVELS;
export const EXPERIENCE_PAGE_MINIMUM = 24;
export const TECHNOLOGY_EXPERIENCE_PAGE_MINIMUM = 12;

export type ExperienceLandingData = {
  level: (typeof EXPERIENCE_LANDING_LEVELS)[ExperienceSlug];
  questions: Array<{
    id: string;
    slug: string;
    question: string;
    shortDescription: string;
    difficulty: string;
    category: { name: string; slug: string };
  }>;
  total: number;
  categories: Array<{ id: string; name: string; slug: string; count: number }>;
  learnCategories: Array<{ id: string; name: string; slug: string; description: string | null }>;
};

function getLevel(slug: string) {
  return EXPERIENCE_LANDING_LEVELS[slug as ExperienceSlug] ?? null;
}

function learnMatches(categoryName: string, categorySlug: string, learnCategory: { name: string; slug: string }) {
  const terms = [categoryName, categorySlug.replace(/-developer|-engineer|-tester|-professional/g, "")]
    .map((term) => term.trim().toLowerCase())
    .filter((term) => term.length > 2);
  const haystack = `${learnCategory.name} ${learnCategory.slug}`.toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

async function queryExperienceLanding(levelSlug: string, categorySlug?: string): Promise<ExperienceLandingData | null> {
  const level = getLevel(levelSlug);
  if (!level) return null;
  const jsonCategorySlug = categorySlug === "java-developer" ? "java" : categorySlug === "python-developer" ? "python" : categorySlug === "react-developer" ? "react" : categorySlug;
  const data = getInterviewExperienceData(level.value, jsonCategorySlug);
  if (!data) return null;
  const total = data.total;
  const questions = data.questions;
  const categories = data.categories;
  const learn: ExperienceLandingData["learnCategories"] = [];
  if (total < (categorySlug ? TECHNOLOGY_EXPERIENCE_PAGE_MINIMUM : EXPERIENCE_PAGE_MINIMUM)) return null;
  return {
    level,
    total,
    questions,
    categories,
    learnCategories: learn,
  };
}

export async function getExperienceLanding(levelSlug: string) {
  return unstable_cache(queryExperienceLanding, ["experience-landing", levelSlug], { revalidate: 1800 })(levelSlug);
}

export async function getTechnologyExperienceLanding(technologySlug: string, levelSlug: string) {
  return unstable_cache(queryExperienceLanding, ["technology-experience-landing", technologySlug, levelSlug], { revalidate: 1800 })(levelSlug, technologySlug);
}

export async function resolveTechnologySlug(slug: string) {
  const aliases: Record<string, string> = {
    java: "java-developer",
    python: "python-developer",
    react: "react-developer",
    javascript: "javascript-developer",
  };
  const categorySlug = aliases[slug] ?? slug;
  const category = getInterviewCategories().find((item) => item.slug === categorySlug);
  return category ? { name: category.name, slug: category.slug } : null;
}

export async function getEligibleExperienceSitemapPaths() {
  const levels = Object.entries(EXPERIENCE_LANDING_LEVELS) as Array<[ExperienceSlug, (typeof EXPERIENCE_LANDING_LEVELS)[ExperienceSlug]]>;
  const technologySlugs: Record<string, string> = { "java-developer": "java", "python-developer": "python", sql: "sql", "react-developer": "react" };
  const paths: string[] = [];
  for (const [experience, level] of levels) {
    const total = getInterviewExperienceData(level.value)?.total ?? 0;
    if (total >= EXPERIENCE_PAGE_MINIMUM) paths.push(`/interview-questions/${experience}`);
    for (const [technologySlug, publicSlug] of Object.entries(technologySlugs)) {
      const count = getInterviewExperienceData(level.value, technologySlug)?.total ?? 0;
      if (count >= TECHNOLOGY_EXPERIENCE_PAGE_MINIMUM) paths.push(`/${publicSlug}-interview-questions/${experience}`);
    }
  }
  return [...new Set(paths)];
}
