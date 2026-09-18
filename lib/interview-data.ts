import importedQuestionBanks from "@/data/interview-questions";

export type InterviewQuestionData = {
  id: string;
  question: string;
  slug: string;
  categoryId: string;
  subcategoryId: string | null;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string | null;
  subcategorySlug: string | null;
  experienceLevel: string;
  difficulty: string;
  interviewType: string;
  shortDescription: string;
  explanation: string;
  sampleAnswer: string;
  detailedAnswer: string;
  keyPoints: unknown[];
  commonMistakes: unknown[];
  followUpQuestions: unknown[];
  tags: unknown[];
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
  category: { id: string; name: string; slug: string; group: string; description: string | null };
  subcategory: { id: string; name: string; slug: string } | null;
};

const ALL_QUESTIONS: InterviewQuestionData[] = importedQuestionBanks
  .flat()
  .filter((question) => question.isPublished);

const EXPERIENCE_LEVELS = ["FRESHER", "INTERNSHIP", "MID_LEVEL", "EXPERIENCED"] as const;
const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;
const INTERVIEW_TYPES = ["TECHNICAL", "BEHAVIORAL", "HR", "CASE_STUDY", "SITUATIONAL"] as const;

export type InterviewExperience = (typeof EXPERIENCE_LEVELS)[number];
export type InterviewDifficulty = (typeof DIFFICULTIES)[number];
export type InterviewTypeValue = (typeof INTERVIEW_TYPES)[number];

const newestFirst = (left: InterviewQuestionData, right: InterviewQuestionData) =>
  right.createdAt.localeCompare(left.createdAt) || right.slug.localeCompare(left.slug);

const asArray = (value?: string | string[]) => (value ? (Array.isArray(value) ? value : [value]) : []);

export function getAllQuestions() {
  return ALL_QUESTIONS;
}

export function getQuestionBySlug(slug: string) {
  return ALL_QUESTIONS.find((question) => question.slug === slug) ?? null;
}

export function getQuestionById(id: string) {
  return ALL_QUESTIONS.find((question) => question.id === id) ?? null;
}

export function getQuestionsByCategory(categorySlug: string) {
  return ALL_QUESTIONS.filter((question) => question.categorySlug === categorySlug);
}

export function getQuestionsBySubcategory(subcategorySlug: string) {
  return ALL_QUESTIONS.filter((question) => question.subcategorySlug === subcategorySlug);
}

export function getQuestionsByExperienceLevel(level: string) {
  return ALL_QUESTIONS.filter((question) => question.experienceLevel === level);
}

export function getQuestionsByInterviewType(type: string) {
  return ALL_QUESTIONS.filter((question) => question.interviewType === type);
}

export function getInterviewCategories() {
  const categories = new Map<string, { id: string; name: string; slug: string; group: string; description: string | null; questionCount: number }>();
  for (const question of ALL_QUESTIONS) {
    const existing = categories.get(question.categorySlug);
    if (existing) existing.questionCount += 1;
    else categories.set(question.categorySlug, { ...question.category, questionCount: 1 });
  }
  return [...categories.values()].sort((left, right) => left.name.localeCompare(right.name));
}

export function getInterviewCategory(categorySlug: string) {
  const questions = getQuestionsByCategory(categorySlug);
  if (!questions.length) return null;
  const first = questions[0];
  const subcategories = new Map<string, { id: string; name: string; slug: string; questionCount: number }>();
  const experienceCounts = new Map<string, number>();
  for (const question of questions) {
    if (question.subcategory) {
      const current = subcategories.get(question.subcategory.slug);
      if (current) current.questionCount += 1;
      else subcategories.set(question.subcategory.slug, { ...question.subcategory, questionCount: 1 });
    }
    experienceCounts.set(question.experienceLevel, (experienceCounts.get(question.experienceLevel) ?? 0) + 1);
  }
  return {
    ...first.category,
    questions,
    subcategories: [...subcategories.values()].sort((left, right) => left.name.localeCompare(right.name)),
    experienceCounts: [...experienceCounts.entries()].map(([experienceLevel, count]) => ({ experienceLevel, count })),
    totalQuestions: questions.length,
  };
}

export function getRelatedQuestions(question: InterviewQuestionData, limit = 4) {
  return ALL_QUESTIONS
    .filter((candidate) => candidate.categorySlug === question.categorySlug && candidate.id !== question.id)
    .sort(newestFirst)
    .slice(0, limit);
}

export function getFollowUpQuestionLinks(followUps: string[]) {
  const wanted = new Set(followUps.map((followUp) => followUp.toLowerCase().trim()));
  return ALL_QUESTIONS
    .filter((question) => wanted.has(question.question.toLowerCase().trim()))
    .map(({ question, slug }) => ({ question, slug }));
}

export function listInterviewQuestions(filters: {
  query?: string;
  category?: string;
  subcategory?: string;
  experience?: string | string[];
  difficulty?: string | string[];
  interviewType?: string | string[];
  page?: number;
  pageSize?: number;
  sort?: "relevance" | "newest";
}) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const experience = asArray(filters.experience).filter((value) => (EXPERIENCE_LEVELS as readonly string[]).includes(value));
  const difficulty = asArray(filters.difficulty).filter((value) => (DIFFICULTIES as readonly string[]).includes(value));
  const interviewType = asArray(filters.interviewType).filter((value) => (INTERVIEW_TYPES as readonly string[]).includes(value));
  const filtered = ALL_QUESTIONS.filter((question) => {
    if (filters.category && question.categorySlug !== filters.category) return false;
    if (filters.subcategory && question.subcategorySlug !== filters.subcategory) return false;
    if (experience.length && !experience.includes(question.experienceLevel)) return false;
    if (difficulty.length && !difficulty.includes(question.difficulty)) return false;
    if (interviewType.length && !interviewType.includes(question.interviewType)) return false;
    if (query && !`${question.question} ${question.shortDescription} ${question.explanation}`.toLowerCase().includes(query)) return false;
    return true;
  });
  const ordered = [...filtered].sort(filters.sort === "newest" ? newestFirst : (left, right) => left.question.localeCompare(right.question));
  const pageSize = filters.pageSize ?? 12;
  const page = Math.max(1, filters.page ?? 1);
  return { questions: ordered.slice((page - 1) * pageSize, page * pageSize), total: ordered.length, page, pageCount: Math.max(1, Math.ceil(ordered.length / pageSize)) };
}

export function getInterviewExperienceData(level: string, categorySlug?: string) {
  const questions = listInterviewQuestions({ experience: level, category: categorySlug, pageSize: Number.MAX_SAFE_INTEGER }).questions;
  if (!questions.length) return null;
  const categories = new Map<string, { id: string; name: string; slug: string; count: number }>();
  for (const question of questions) {
    const current = categories.get(question.categorySlug);
    if (current) current.count += 1;
    else categories.set(question.categorySlug, { id: question.category.id, name: question.category.name, slug: question.category.slug, count: 1 });
  }
  return { questions: questions.slice(0, 12), total: questions.length, categories: [...categories.values()].sort((left, right) => left.name.localeCompare(right.name)) };
}

export function getInterviewQuestionSlugs() {
  return ALL_QUESTIONS.map((question) => ({ slug: question.slug }));
}

export function getInterviewCategorySlugs() {
  return getInterviewCategories().map((category) => ({ category: category.slug }));
}