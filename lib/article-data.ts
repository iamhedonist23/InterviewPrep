import { articles as importedArticles } from "@/data/articles";

export type ArticleData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string | null;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  updatedAt: string;
  categoryId: string | null;
  category: { id: string; name: string; slug: string; group: string; description: string | null } | null;
  isPublished: boolean;
};

const ARTICLES = importedArticles as ArticleData[];

export function listArticlesFromJson(page = 1, category?: string) {
  const safePage = Math.max(1, page);
  const normalizedCategory = category?.trim().toLowerCase();
  const filtered = ARTICLES
    .filter((article) => article.isPublished)
    .filter((article) => {
      if (!normalizedCategory) return true;
      return article.category?.slug === normalizedCategory || article.category?.group.toLowerCase() === normalizedCategory;
    })
    .sort((left, right) => (right.publishedAt ?? "").localeCompare(left.publishedAt ?? ""));
  const pageSize = 6;
  return {
    articles: filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    total: filtered.length,
    page: safePage,
    pageCount: Math.max(1, Math.ceil(filtered.length / pageSize)),
  };
}

export function getArticleFromJson(slug: string) {
  return ARTICLES.find((article) => article.isPublished && article.slug === slug) ?? null;
}

export function getRelatedArticlesFromJson(article: ArticleData) {
  return ARTICLES
    .filter((candidate) => candidate.isPublished && candidate.id !== article.id && candidate.categoryId === article.categoryId)
    .sort((left, right) => (right.publishedAt ?? "").localeCompare(left.publishedAt ?? ""))
    .slice(0, 3);
}
