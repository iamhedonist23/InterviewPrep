import { revalidateTag, unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  LEARN_CACHE_TAG,
  listPublishedStudyCategoriesForLearn,
} from "@/lib/study-public";
import { isPublicQuestionQualityValid } from "@/lib/public-question-quality";

export const PUBLIC_CONTENT_CACHE_TAG = "public:content";

export function invalidatePublicContentCache() {
  revalidateTag(PUBLIC_CONTENT_CACHE_TAG);
}

async function queryHomepagePublicContent() {
  const [
    categoriesWithCounts,
    popularQuestions,
    resources,
    learnCategories,
    faqs,
  ] = await Promise.all([
    prisma.category.findMany({
      where: { questions: { some: { isPublished: true } } },
      include: {
        _count: { select: { questions: { where: { isPublished: true } } } },
      },
      orderBy: { questions: { _count: "desc" } },
      take: 8,
    }),
    prisma.interviewQuestion.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        slug: true,
        question: true,
        shortDescription: true,
        explanation: true,
        sampleAnswer: true,
        category: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    }),
    prisma.article.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        category: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    listPublishedStudyCategoriesForLearn(),
    prisma.fAQ.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      take: 3,
    }),
  ]);

  return {
    categoriesWithCounts,
    popularQuestions: popularQuestions.filter(isPublicQuestionQualityValid).slice(0, 6),
    resources,
    learnCategories,
    faqs,
  };
}

export async function getCachedHomepagePublicContent() {
  return unstable_cache(queryHomepagePublicContent, ["public-homepage"], {
    revalidate: 1800,
    tags: [PUBLIC_CONTENT_CACHE_TAG, LEARN_CACHE_TAG],
  })();
}

async function queryPublicCategories() {
  return prisma.category.findMany({
    where: { questions: { some: { isPublished: true } } },
    orderBy: [{ group: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      group: true,
      _count: { select: { questions: { where: { isPublished: true } } } },
    },
  });
}

export async function getCachedPublicCategories() {
  return unstable_cache(queryPublicCategories, ["public-categories-v2"], {
    revalidate: 3600,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  })();
}

async function queryPublicQuestionCategory(categorySlug: string, page: number) {
  const pageSize = 12;
  const item = await prisma.category.findFirst({
    where: { slug: categorySlug, questions: { some: { isPublished: true } } },
    select: {
      id: true,
      name: true,
      slug: true,
      group: true,
      description: true,
      subcategories: {
        select: {
          id: true,
          name: true,
          slug: true,
          _count: { select: { questions: { where: { isPublished: true } } } },
        },
        orderBy: { name: "asc" },
      },
      questions: {
        where: { isPublished: true },
        select: {
          id: true,
          slug: true,
          question: true,
          shortDescription: true,
          difficulty: true,
          category: { select: { name: true } },
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!item) return null;
  const learnTerm = item.name.replace(/\b(developer|engineer|tester|professional|specialist)\b/gi, "").trim();
  const [totalQuestions, experienceCounts, relatedCategories, relatedArticles, learnCategories] =
    await Promise.all([
      prisma.interviewQuestion.count({
        where: { categoryId: item.id, isPublished: true },
      }),
      prisma.interviewQuestion.groupBy({
        by: ["experienceLevel"],
        where: { categoryId: item.id, isPublished: true },
        _count: { _all: true },
      }),
      prisma.category.findMany({
        where: {
          group: item.group,
          id: { not: item.id },
          questions: { some: { isPublished: true } },
        },
        orderBy: { name: "asc" },
        take: 5,
        select: { id: true, name: true, slug: true },
      }),
      prisma.article.findMany({
        where: { isPublished: true, categoryId: item.id },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: { id: true, title: true, slug: true, excerpt: true },
      }),
      prisma.studyCategory.findMany({
        where: {
          isPublished: true,
          OR: [
            { name: { contains: learnTerm, mode: "insensitive" } },
            { slug: { contains: learnTerm, mode: "insensitive" } },
          ],
        },
        orderBy: { sortOrder: "asc" },
        take: 3,
        select: { id: true, name: true, slug: true, description: true },
      }),
    ]);
  return {
    item,
    totalQuestions,
    experienceCounts,
    relatedCategories,
    relatedArticles,
    learnCategories,
    pageCount: Math.ceil(totalQuestions / pageSize),
  };
}

export async function getCachedPublicQuestionCategory(
  categorySlug: string,
  page: number,
) {
  const safePage = Math.max(1, page);
  return unstable_cache(
    queryPublicQuestionCategory,
    ["public-question-category", categorySlug, String(safePage)],
    { revalidate: 1800, tags: [PUBLIC_CONTENT_CACHE_TAG] },
  )(categorySlug, safePage);
}

export async function getRelatedInterviewCategory(categoryName: string) {
  const searchTerm = categoryName
    .replace(/\b(core|fundamentals|concepts|basics|advanced|essentials)\b/gi, "")
    .replace(/\([^)]*\)/g, "")
    .trim();
  return unstable_cache(
    async () => {
      const exact = await prisma.category.findFirst({
        where: { questions: { some: { isPublished: true } }, name: { equals: categoryName, mode: "insensitive" } },
        select: { name: true, slug: true },
      });
      if (exact || !searchTerm) return exact;
      return prisma.category.findFirst({
        where: { questions: { some: { isPublished: true } }, name: { contains: searchTerm, mode: "insensitive" } },
        orderBy: { name: "asc" },
        select: { name: true, slug: true },
      });
    },
    ["public-related-interview-category", categoryName.toLowerCase()],
    { revalidate: 3600, tags: [PUBLIC_CONTENT_CACHE_TAG] },
  )();
}
