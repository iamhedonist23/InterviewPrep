import { unstable_cache } from "next/cache";
import type { InterviewQuestionData } from "@/lib/interview-data";
import { getArticleFromJson, getRelatedArticlesFromJson, listArticlesFromJson, type ArticleData } from "@/lib/article-data";

export const ARTICLE_PAGE_SIZE = 6;
const PUBLIC_CONTENT_CACHE_TAG = "public:content";
function reviveArticleDates<T extends { publishedAt: string | null; updatedAt: string }>(article: T): T & { publishedAt: Date | null; updatedAt: Date } {
  return {
    ...article,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
    updatedAt: new Date(String(article.updatedAt)),
  };
}
export async function listArticles(page = 1, category?: string) {
  const result = await unstable_cache(async () => listArticlesFromJson(page, category), ["public-articles-json", String(page), category?.trim().toLowerCase() || "all"], { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG] })();
  return { ...result, articles: result.articles.map(reviveArticleDates) };
}
export async function getArticle(slug: string) {
  const article = await unstable_cache(async () => getArticleFromJson(slug), ["public-article-json", slug], { revalidate: 3600, tags: [PUBLIC_CONTENT_CACHE_TAG] })();
  return article ? reviveArticleDates(article) : null;
}
export async function relatedArticles(article: Pick<ArticleData, "id" | "categoryId">) {
  const result = await unstable_cache(async () => getRelatedArticlesFromJson(article as ArticleData), ["public-related-articles-json", article.id, article.categoryId ?? "none"], { revalidate: 3600, tags: [PUBLIC_CONTENT_CACHE_TAG] })();
  return result.map(reviveArticleDates);
}
export async function relatedQuestions(_categoryId: string | null) {
  return unstable_cache(async (): Promise<InterviewQuestionData[]> => [], ["public-related-questions-json"], { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG] })();
}
