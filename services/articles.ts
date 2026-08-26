import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const ARTICLE_PAGE_SIZE = 6;
export async function listArticles(page = 1, category?: string) { const safePage = Math.max(1, page); const where: Prisma.ArticleWhereInput = { isPublished: true }; if (category) where.category = { slug: category }; const [articles, total] = await prisma.$transaction([prisma.article.findMany({ where, include: { category: true }, orderBy: { publishedAt: "desc" }, skip: (safePage - 1) * ARTICLE_PAGE_SIZE, take: ARTICLE_PAGE_SIZE }), prisma.article.count({ where })]); return { articles, total, page: safePage, pageCount: Math.max(1, Math.ceil(total / ARTICLE_PAGE_SIZE)) }; }
export async function getArticle(slug: string) { return prisma.article.findUnique({ where: { slug }, include: { category: true } }); }
export async function relatedArticles(article: { id: string; categoryId: string | null }) { return prisma.article.findMany({ where: { isPublished: true, id: { not: article.id }, ...(article.categoryId ? { categoryId: article.categoryId } : {}) }, orderBy: { publishedAt: "desc" }, take: 3, include: { category: true } }); }
