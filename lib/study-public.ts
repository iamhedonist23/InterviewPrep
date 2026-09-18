import { revalidateTag, unstable_cache } from "next/cache";
import {
  getPublishedTopicsForQuestionData,
} from "@/lib/study";
import {
  getCatalogAdjacentTopics,
  getCatalogCategoryTree,
  getCatalogTopic,
  getCatalogTopicLinks,
  listCatalogCategories,
  searchCatalogTopics,
} from "@/lib/learn-catalog";

export const LEARN_CACHE_TAG = "learn:public";

export function invalidateLearnCache() {
  revalidateTag(LEARN_CACHE_TAG);
}

export async function getPublishedTopic(categorySlug: string, topicSlug: string) {
  return unstable_cache(getCatalogTopic, ["learn-topic", categorySlug, topicSlug], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(categorySlug, topicSlug);
}

export async function getAdjacentTopics(categorySlug: string, currentTopicId: string) {
  return unstable_cache(getCatalogAdjacentTopics, ["learn-adjacent", categorySlug, currentTopicId], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(categorySlug, currentTopicId);
}

export async function listPublishedStudyCategoriesForLearn() {
  return unstable_cache(listCatalogCategories, ["learn-categories"], { revalidate: 86400, tags: [LEARN_CACHE_TAG] })();
}

export async function searchPublishedStudyTopics(query: string) {
  const cacheKey = query.trim().toLowerCase() || "empty";
  return unstable_cache(searchCatalogTopics, ["learn-search", cacheKey], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(query);
}

export async function getPublishedStudyCategoryTree(categorySlug: string) {
  return unstable_cache(getCatalogCategoryTree, ["learn-category", categorySlug], { revalidate: 86400, tags: [LEARN_CACHE_TAG] })(categorySlug);
}

export async function getPublishedTopicLinks(topicIds: string[]) {
  const ids = [...new Set(topicIds)].sort();
  if (ids.length === 0) return [];
  return unstable_cache(getCatalogTopicLinks, ["learn-topic-links", ...ids], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(ids);
}

export async function getPublishedTopicsForQuestion(questionId: string) {
  return unstable_cache(getPublishedTopicsForQuestionData, ["learn-question-links", questionId], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(questionId);
}
