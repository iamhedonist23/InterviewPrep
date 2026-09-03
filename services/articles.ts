import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const ARTICLE_PAGE_SIZE = 6;
const PUBLIC_CONTENT_CACHE_TAG = "public:content";
function reviveArticleDates<
  T extends { publishedAt: Date | null; updatedAt: Date },
>(article: T): T {
  return {
    ...article,
    publishedAt: article.publishedAt
      ? new Date(String(article.publishedAt))
      : null,
    updatedAt: new Date(String(article.updatedAt)),
  };
}
async function queryArticles(page = 1, category?: string) {
  const safePage = Math.max(1, page);
  const where: Prisma.ArticleWhereInput = { isPublished: true };
  if (category) where.category = { slug: category };
  const [articles, total] = await prisma.$transaction([
    prisma.article.findMany({
      where,
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      skip: (safePage - 1) * ARTICLE_PAGE_SIZE,
      take: ARTICLE_PAGE_SIZE,
    }),
    prisma.article.count({ where }),
  ]);
  return {
    articles,
    total,
    page: safePage,
    pageCount: Math.max(1, Math.ceil(total / ARTICLE_PAGE_SIZE)),
  };
}
export async function listArticles(page = 1, category?: string) {
  const result = await unstable_cache(
    queryArticles,
    ["public-articles", String(page), category?.trim().toLowerCase() || "all"],
    { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG] },
  )(page, category);
  return { ...result, articles: result.articles.map(reviveArticleDates) };
}
async function queryArticle(slug: string) {
  return prisma.article.findFirst({
    where: { slug, isPublished: true },
    include: { category: true },
  });
}
export async function getArticle(slug: string) {
  const article = await unstable_cache(queryArticle, ["public-article", slug], {
    revalidate: 3600,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  })(slug);
  return article ? reviveArticleDates(article) : null;
}
async function queryRelatedArticles(article: {
  id: string;
  categoryId: string | null;
}) {
  return prisma.article.findMany({
    where: {
      isPublished: true,
      id: { not: article.id },
      ...(article.categoryId ? { categoryId: article.categoryId } : {}),
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });
}
export async function relatedArticles(article: {
  id: string;
  categoryId: string | null;
}) {
  const result = await unstable_cache(
    queryRelatedArticles,
    ["public-related-articles", article.id, article.categoryId ?? "none"],
    { revalidate: 3600, tags: [PUBLIC_CONTENT_CACHE_TAG] },
  )(article);
  return result.map(reviveArticleDates);
}
async function queryRelatedQuestions(categoryId: string | null) {
  return prisma.interviewQuestion.findMany({
    where: {
      isPublished: true,
      ...(categoryId ? { categoryId } : {}),
    },
    include: { category: true, subcategory: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
}
export async function relatedQuestions(categoryId: string | null) {
  return unstable_cache(
    queryRelatedQuestions,
    ["public-related-questions", categoryId ?? "none"],
    { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG] },
  )(categoryId);
}
