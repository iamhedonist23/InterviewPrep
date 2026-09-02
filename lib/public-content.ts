import { revalidateTag, unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { LEARN_CACHE_TAG, listPublishedStudyCategoriesForLearn } from "@/lib/study-public";

export const PUBLIC_CONTENT_CACHE_TAG = "public:content";

export function invalidatePublicContentCache() {
  revalidateTag(PUBLIC_CONTENT_CACHE_TAG);
}

async function queryHomepagePublicContent() {
  const [categoriesWithCounts, popularQuestions, resources, learnCategories, faqs] = await Promise.all([
    prisma.category.findMany({
      where: { questions: { some: { isPublished: true } } },
      include: { _count: { select: { questions: { where: { isPublished: true } } } } },
      orderBy: { questions: { _count: "desc" } },
      take: 8,
    }),
    prisma.interviewQuestion.findMany({
      where: { isPublished: true },
      select: { id: true, slug: true, question: true, shortDescription: true, category: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.article.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true, category: { select: { name: true } } },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    listPublishedStudyCategoriesForLearn(),
    prisma.fAQ.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" }, take: 3 }),
  ]);

  return { categoriesWithCounts, popularQuestions, resources, learnCategories, faqs };
}

export async function getCachedHomepagePublicContent() {
  return unstable_cache(queryHomepagePublicContent, ["public-homepage"], { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG, LEARN_CACHE_TAG] })();
}

async function queryPublicCategories() {
  return prisma.category.findMany({
    where: { questions: { some: { isPublished: true } } },
    orderBy: [{ group: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true, slug: true, group: true, _count: { select: { questions: { where: { isPublished: true } } } } },
  });
}

export async function getCachedPublicCategories() {
  return unstable_cache(queryPublicCategories, ["public-categories"], { revalidate: 3600, tags: [PUBLIC_CONTENT_CACHE_TAG] })();
}

async function queryPublicQuestionCategory(categorySlug: string, page: number) {
  const pageSize = 12;
  const item = await prisma.category.findFirst({
    where: { slug: categorySlug, questions: { some: { isPublished: true } } },
    select: {
      id: true, name: true, slug: true, group: true, description: true,
      subcategories: { select: { id: true, name: true, slug: true } },
      questions: {
        where: { isPublished: true },
        include: { category: true, subcategory: true },
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!item) return null;
  const [totalQuestions, relatedCategories, relatedArticles] = await Promise.all([
    prisma.interviewQuestion.count({ where: { categoryId: item.id, isPublished: true } }),
    prisma.category.findMany({ where: { group: item.group, id: { not: item.id }, questions: { some: { isPublished: true } } }, orderBy: { name: "asc" }, take: 5, select: { id: true, name: true, slug: true } }),
    prisma.article.findMany({ where: { isPublished: true, categoryId: item.id }, orderBy: { publishedAt: "desc" }, take: 3, select: { id: true, title: true, slug: true, excerpt: true } }),
  ]);
  return { item, totalQuestions, relatedCategories, relatedArticles, pageCount: Math.ceil(totalQuestions / pageSize) };
}

export async function getCachedPublicQuestionCategory(categorySlug: string, page: number) {
  const safePage = Math.max(1, page);
  return unstable_cache(queryPublicQuestionCategory, ["public-question-category", categorySlug, String(safePage)], { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG] })(categorySlug, safePage);
}
