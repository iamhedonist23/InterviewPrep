import { Difficulty, ExperienceLevel, InterviewType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type QuestionFilters = {
  query?: string; category?: string; experience?: ExperienceLevel; difficulty?: Difficulty; interviewType?: InterviewType; page?: number;
};
export const PAGE_SIZE = 12;
export const SEARCH_PAGE_SIZE = 10;
export async function listQuestions(filters: QuestionFilters) {
  const page = Math.max(1, filters.page ?? 1);
  const where: Prisma.InterviewQuestionWhereInput = { isPublished: true };
  if (filters.category) where.category = { slug: filters.category };
  if (filters.experience) where.experienceLevel = filters.experience;
  if (filters.difficulty) where.difficulty = filters.difficulty;
  if (filters.interviewType) where.interviewType = filters.interviewType;
  if (filters.query) where.OR = [{ question: { contains: filters.query, mode: "insensitive" } }, { shortDescription: { contains: filters.query, mode: "insensitive" } }];
  const [questions, total] = await prisma.$transaction([
    prisma.interviewQuestion.findMany({ where, include: { category: true, subcategory: true }, orderBy: { createdAt: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    prisma.interviewQuestion.count({ where }),
  ]);
  return { questions, total, page, pageCount: Math.ceil(total / PAGE_SIZE) };
}
export async function getQuestion(slug: string) { return prisma.interviewQuestion.findUnique({ where: { slug }, include: { category: true, subcategory: true } }); }
export async function relatedQuestions(question: { id: string; categoryId: string; tags: Prisma.JsonValue }) { return prisma.interviewQuestion.findMany({ where: { isPublished: true, categoryId: question.categoryId, id: { not: question.id } }, include: { category: true }, take: 4, orderBy: { createdAt: "desc" } }); }
export async function searchContent(filters: QuestionFilters & { sort?: "relevance" | "newest" }) {
  const page = Math.max(1, filters.page ?? 1);
  const query = filters.query?.trim() ?? "";
  const questionWhere: Prisma.InterviewQuestionWhereInput = { isPublished: true };
  if (filters.category) questionWhere.category = { slug: filters.category };
  if (filters.experience) questionWhere.experienceLevel = filters.experience;
  if (filters.difficulty) questionWhere.difficulty = filters.difficulty;
  if (filters.interviewType) questionWhere.interviewType = filters.interviewType;
  if (query) questionWhere.OR = [{ question: { contains: query, mode: "insensitive" } }, { shortDescription: { contains: query, mode: "insensitive" } }, { explanation: { contains: query, mode: "insensitive" } }];
  const articleWhere: Prisma.ArticleWhereInput = { isPublished: true };
  if (query) articleWhere.OR = [{ title: { contains: query, mode: "insensitive" } }, { excerpt: { contains: query, mode: "insensitive" } }, { content: { contains: query, mode: "insensitive" } }];
  const orderBy = filters.sort === "newest" ? { createdAt: "desc" as const } : { question: "asc" as const };
  const [questions, questionTotal, categories, articles, articleTotal] = await prisma.$transaction([
    prisma.interviewQuestion.findMany({ where: questionWhere, include: { category: true, subcategory: true }, orderBy, skip: (page - 1) * SEARCH_PAGE_SIZE, take: SEARCH_PAGE_SIZE }),
    prisma.interviewQuestion.count({ where: questionWhere }),
    query ? prisma.category.findMany({ where: { OR: [{ name: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] }, take: 6, orderBy: { name: "asc" } }) : prisma.category.findMany({ take: 6, orderBy: { name: "asc" } }),
    prisma.article.findMany({ where: articleWhere, include: { category: true }, orderBy: { publishedAt: "desc" }, take: 6 }),
    prisma.article.count({ where: articleWhere }),
  ]);
  return { questions, categories, articles, total: questionTotal + articleTotal, questionTotal, articleTotal, page, pageCount: Math.max(1, Math.ceil(questionTotal / SEARCH_PAGE_SIZE)) };
}
export const enumLabels = { ExperienceLevel, Difficulty, InterviewType };
