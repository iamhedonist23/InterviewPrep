import { revalidateTag, unstable_cache } from "next/cache";
import homeContent from "@/data/home-content.json";
import {
  LEARN_CACHE_TAG,
  listPublishedStudyCategoriesForLearn,
} from "@/lib/study-public";
import { isPublicQuestionQualityValid } from "@/lib/public-question-quality";
import { getAllQuestions, getInterviewCategories, getInterviewCategory } from "@/lib/interview-data";

export const PUBLIC_CONTENT_CACHE_TAG = "public:content";

type HomepageResource = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
  category: { name: string } | null;
};

type HomepageFaq = {
  id: string;
  question: string;
  answer: string;
};

export function invalidatePublicContentCache() {
  revalidateTag(PUBLIC_CONTENT_CACHE_TAG);
}

async function queryHomepagePublicContent() {
  const categoriesWithCounts = getInterviewCategories()
    .sort((left, right) => right.questionCount - left.questionCount)
    .slice(0, 8)
    .map((category) => ({ ...category, _count: { questions: category.questionCount } }));
  const popularQuestions = getAllQuestions().slice(0, 500);
  const [learnCategories] = await Promise.all([listPublishedStudyCategoriesForLearn()]);

  return {
    categoriesWithCounts,
    popularQuestions: popularQuestions.filter(isPublicQuestionQualityValid).slice(0, 6),
    resources: homeContent.resources as HomepageResource[],
    learnCategories,
    faqs: homeContent.faqs as HomepageFaq[],
  };
}

export async function getCachedHomepagePublicContent() {
  return unstable_cache(queryHomepagePublicContent, ["public-homepage-json"], {
    revalidate: 1800,
    tags: [PUBLIC_CONTENT_CACHE_TAG, LEARN_CACHE_TAG],
  })();
}

async function queryPublicCategories() {
  return getInterviewCategories().map((category) => ({ ...category, _count: { questions: category.questionCount } }));
}

export async function getCachedPublicCategories() {
  return unstable_cache(queryPublicCategories, ["public-categories-json"], {
    revalidate: 3600,
    tags: [PUBLIC_CONTENT_CACHE_TAG],
  })();
}

async function queryPublicQuestionCategory(categorySlug: string, page: number) {
  const pageSize = 12;
  const category = getInterviewCategory(categorySlug);
  const item = category
    ? {
        ...category,
        subcategories: category.subcategories.map((subcategory) => ({ ...subcategory, _count: { questions: subcategory.questionCount } })),
        questions: category.questions.slice((page - 1) * pageSize, page * pageSize),
      }
    : null;
  if (!category || !item) return null;
  return {
    item,
    totalQuestions: category.totalQuestions,
    experienceCounts: category.experienceCounts.map(({ experienceLevel, count }) => ({ experienceLevel, _count: { _all: count } })),
    relatedCategories: getInterviewCategories().filter((candidate) => candidate.group === item.group && candidate.slug !== item.slug).slice(0, 5),
    relatedArticles: [] as Array<{ id: string; title: string; slug: string; excerpt: string }>,
    learnCategories: [] as Array<{ id: string; name: string; slug: string; description: string | null }>,
    pageCount: Math.ceil(category.totalQuestions / pageSize),
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
      const categories = getInterviewCategories();
      const exact = categories.find((category) => category.name.toLowerCase() === categoryName.toLowerCase());
      if (exact || !searchTerm) return exact ? { name: exact.name, slug: exact.slug } : null;
      const match = categories.find((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
      return match ? { name: match.name, slug: match.slug } : null;
    },
    ["public-related-interview-category", categoryName.toLowerCase()],
    { revalidate: 3600, tags: [PUBLIC_CONTENT_CACHE_TAG] },
  )();
}
