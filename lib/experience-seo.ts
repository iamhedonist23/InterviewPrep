import { ExperienceLevel } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const EXPERIENCE_LANDING_LEVELS = {
  freshers: { value: ExperienceLevel.FRESHER, label: "Freshers", singular: "fresher" },
  internship: { value: ExperienceLevel.INTERNSHIP, label: "Internships", singular: "intern" },
  "mid-level": { value: ExperienceLevel.MID_LEVEL, label: "Mid-Level Professionals", singular: "mid-level professional" },
  experienced: { value: ExperienceLevel.EXPERIENCED, label: "Experienced Professionals", singular: "experienced professional" },
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
  const where = { isPublished: true, experienceLevel: level.value, ...(categorySlug ? { category: { slug: categorySlug } } : {}) };
  const [total, questions, categories, learnCategories] = await Promise.all([
    prisma.interviewQuestion.count({ where }),
    prisma.interviewQuestion.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 12,
      select: {
        id: true,
        slug: true,
        question: true,
        shortDescription: true,
        difficulty: true,
        category: { select: { name: true, slug: true } },
      },
    }),
    prisma.category.findMany({
      where: { questions: { some: where } },
      orderBy: { name: "asc" },
      take: 12,
      select: {
        id: true,
        name: true,
        slug: true,
        _count: { select: { questions: { where } } },
      },
    }),
    prisma.studyCategory.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, slug: true, description: true },
    }),
  ]);
  if (total < (categorySlug ? TECHNOLOGY_EXPERIENCE_PAGE_MINIMUM : EXPERIENCE_PAGE_MINIMUM)) return null;
  const primaryName = categorySlug ? categories[0]?.name ?? categorySlug : "";
  return {
    level,
    total,
    questions,
    categories: categories.map((category) => ({ id: category.id, name: category.name, slug: category.slug, count: category._count.questions })),
    learnCategories: learnCategories
      .filter((category) => !categorySlug || learnMatches(primaryName, categorySlug, category))
      .slice(0, 4)
      .map(({ id, name, slug, description }) => ({ id, name, slug, description })),
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
  return prisma.category.findFirst({
    where: { slug: categorySlug, questions: { some: { isPublished: true } } },
    select: { name: true, slug: true },
  });
}

export async function getEligibleExperienceSitemapPaths() {
  const levels = Object.entries(EXPERIENCE_LANDING_LEVELS) as Array<[ExperienceSlug, (typeof EXPERIENCE_LANDING_LEVELS)[ExperienceSlug]]>;
  const counts = await prisma.interviewQuestion.groupBy({
    by: ["categoryId", "experienceLevel"],
    where: { isPublished: true },
    _count: { _all: true },
  });
  const categoryIds = [...new Set(counts.map((entry) => entry.categoryId))];
  const categories = await prisma.category.findMany({ where: { id: { in: categoryIds } }, select: { id: true, slug: true } });
  const categoryById = new Map(categories.map((category) => [category.id, category.slug]));
  const technologySlugs: Record<string, string> = { "java-developer": "java", "python-developer": "python", sql: "sql", "react-developer": "react" };
  const paths: string[] = [];
  for (const [experience, level] of levels) {
    const total = counts.filter((entry) => entry.experienceLevel === level.value).reduce((sum, entry) => sum + entry._count._all, 0);
    if (total >= EXPERIENCE_PAGE_MINIMUM) paths.push(`/interview-questions/${experience}`);
    for (const entry of counts) {
      const slug = categoryById.get(entry.categoryId);
      const publicSlug = slug ? technologySlugs[slug] : undefined;
      if (publicSlug && entry.experienceLevel === level.value && entry._count._all >= TECHNOLOGY_EXPERIENCE_PAGE_MINIMUM) paths.push(`/${publicSlug}-interview-questions/${experience}`);
    }
  }
  return [...new Set(paths)];
}
