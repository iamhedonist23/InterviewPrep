import { Difficulty, ExperienceLevel, InterviewType } from "@prisma/client";
import {
  getFollowUpQuestionLinks as getJsonFollowUpQuestionLinks,
  getQuestionBySlug,
  getRelatedQuestions,
  getInterviewCategories,
  listInterviewQuestions,
  type InterviewQuestionData,
} from "@/lib/interview-data";

export type QuestionFilters = {
  query?: string;
  category?: string;
  subcategory?: string;
  experience?: ExperienceLevel | ExperienceLevel[];
  difficulty?: Difficulty | Difficulty[];
  interviewType?: InterviewType | InterviewType[];
  page?: number;
};

export const PAGE_SIZE = 12;
export const SEARCH_PAGE_SIZE = 10;

export function listQuestions(filters: QuestionFilters) {
  return Promise.resolve(listInterviewQuestions({ ...filters, pageSize: PAGE_SIZE }));
}

export function getQuestion(slug: string) {
  return Promise.resolve(getQuestionBySlug(slug));
}

export function getFollowUpQuestionLinks(questions: string[]) {
  return Promise.resolve(getJsonFollowUpQuestionLinks(questions));
}

export function relatedQuestions(question: InterviewQuestionData) {
  return Promise.resolve(getRelatedQuestions(question));
}

export async function searchContent(filters: QuestionFilters & { sort?: "relevance" | "newest" }) {
  const questionResults = listInterviewQuestions({ ...filters, pageSize: SEARCH_PAGE_SIZE });
  const query = filters.query?.trim().toLowerCase() ?? "";
  const categories = getInterviewCategories()
    .filter((category) => !query || `${category.name} ${category.description ?? ""}`.toLowerCase().includes(query))
    .slice(0, 6);
  const articles: Array<{ id: string; title: string; slug: string; excerpt: string }> = [];
  const articleTotal = 0;
  return {
    questions: questionResults.questions,
    categories,
    articles,
    total: questionResults.total + articleTotal,
    questionTotal: questionResults.total,
    articleTotal,
    page: questionResults.page,
    pageCount: Math.max(questionResults.pageCount, Math.ceil(articleTotal / SEARCH_PAGE_SIZE), 1),
  };
}

export const enumLabels = { ExperienceLevel, Difficulty, InterviewType };