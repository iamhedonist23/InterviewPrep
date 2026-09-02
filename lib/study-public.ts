import { revalidateTag, unstable_cache } from "next/cache";
import {
  getAdjacentTopicsData,
  getPublishedStudyCategoryTreeData,
  getPublishedTopicData,
  getPublishedTopicLinksData,
  listPublishedStudyCategoriesForLearnData,
  searchPublishedStudyTopicsData,
} from "@/lib/study";

export const LEARN_CACHE_TAG = "learn:public";

export function invalidateLearnCache() {
  revalidateTag(LEARN_CACHE_TAG);
}

export async function getPublishedTopic(categorySlug: string, topicSlug: string) {
  return unstable_cache(getPublishedTopicData, ["learn-topic", categorySlug, topicSlug], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(categorySlug, topicSlug);
}

export async function getAdjacentTopics(categorySlug: string, currentTopicId: string) {
  return unstable_cache(getAdjacentTopicsData, ["learn-adjacent", categorySlug, currentTopicId], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(categorySlug, currentTopicId);
}

export async function listPublishedStudyCategoriesForLearn() {
  return unstable_cache(listPublishedStudyCategoriesForLearnData, ["learn-categories"], { revalidate: 86400, tags: [LEARN_CACHE_TAG] })();
}

export async function searchPublishedStudyTopics(query: string) {
  const cacheKey = query.trim().toLowerCase() || "empty";
  return unstable_cache(searchPublishedStudyTopicsData, ["learn-search", cacheKey], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(query);
}

export async function getPublishedStudyCategoryTree(categorySlug: string) {
  return unstable_cache(getPublishedStudyCategoryTreeData, ["learn-category", categorySlug], { revalidate: 86400, tags: [LEARN_CACHE_TAG] })(categorySlug);
}

export async function getPublishedTopicLinks(topicIds: string[]) {
  const ids = [...new Set(topicIds)].sort();
  if (ids.length === 0) return [];
  return unstable_cache(getPublishedTopicLinksData, ["learn-topic-links", ...ids], { revalidate: 3600, tags: [LEARN_CACHE_TAG] })(ids);
}
