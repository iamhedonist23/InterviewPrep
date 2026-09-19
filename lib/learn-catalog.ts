import { catalogMetadata } from "@/data/learn-courses/catalog-metadata";

type CatalogSection = { id: string; title: string; content: string; sortOrder: number };
type CatalogExample = { id: string; language: string; code: string; explanation: string | null; sortOrder: number };
type CatalogExercise = { id: string; question: string; difficulty: string; hint: string | null; solution: string | null; explanation: string | null; sortOrder: number };
type CatalogQuestionRelation = { question: { id: string; question: string; slug: string } };
type CatalogTopic = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  estimatedMinutes: number;
  sections: CatalogSection[];
  examples: CatalogExample[];
  exercises: CatalogExercise[];
  questionRelations: CatalogQuestionRelation[];
  prerequisiteIds: string[];
  relatedTopicIds: string[];
};
type CatalogModule = { id: string; title: string; slug: string; description: string; topics: CatalogTopic[] };
type CatalogPath = { id: string; name: string; slug: string; description: string; level: string; modules: CatalogModule[] };
type CatalogCategory = { id: string; name: string; slug: string; description: string; icon: string; sortOrder: number; paths: CatalogPath[] };

type LearnTopic = CatalogTopic & {
  updatedAt: string;
  seoTitle: null;
  seoDescription: string;
  category: Pick<CatalogCategory, "id" | "name" | "slug">;
  module: { studyPath: Pick<CatalogPath, "name" | "level"> };
};

const legacyTopicAliases: Record<string, Record<string, string>> = {
  "core-java": {
    "core-java-java-overview-and-use-cases": "core-java-introduction-to-java",
    "core-java-installing-java-and-checking-the-version": "core-java-jdk-jre-and-jvm",
  },
};

const categoryLoaders: Record<string, () => Promise<CatalogCategory>> = {
  "data-structures-algorithms": async () => (await import("@/data/learn-courses/data-structures-algorithms.json")).default as CatalogCategory,
  "database-management-systems": async () => (await import("@/data/learn-courses/database-management-systems.json")).default as CatalogCategory,
  "machine-learning": async () => (await import("@/data/learn-courses/machine-learning.json")).default as CatalogCategory,
  microservices: async () => (await import("@/data/learn-courses/microservices.json")).default as CatalogCategory,
  "spring-ai": async () => (await import("@/data/learn-courses/spring-ai.json")).default as CatalogCategory,
  "spring-boot": async () => (await import("@/data/learn-courses/spring-boot.json")).default as CatalogCategory,
  "advanced-java": async () => (await import("@/data/learn-courses/advanced-java.json")).default as CatalogCategory,
  "aws-cloud-engineering": async () => (await import("@/data/learn-courses/aws-cloud-engineering.json")).default as CatalogCategory,
  "c-programming": async () => (await import("@/data/learn-courses/c-programming.json")).default as CatalogCategory,
  "cpp-programming": async () => (await import("@/data/learn-courses/cpp-programming.json")).default as CatalogCategory,
  "core-java": async () => (await import("@/data/learn-courses/core-java.json")).default as CatalogCategory,
  "digital-marketing": async () => (await import("@/data/learn-courses/digital-marketing.json")).default as CatalogCategory,
  kubernetes: async () => (await import("@/data/learn-courses/kubernetes.json")).default as CatalogCategory,
  python: async () => (await import("@/data/learn-courses/python.json")).default as CatalogCategory,
  redis: async () => (await import("@/data/learn-courses/redis.json")).default as CatalogCategory,
  "system-design": async () => (await import("@/data/learn-courses/system-design.json")).default as CatalogCategory,
  "generative-ai-machine-learning": async () => (await import("@/data/learn-courses/generative-ai-machine-learning.json")).default as CatalogCategory,
  "machine-learning-data-science": async () => (await import("@/data/learn-courses/machine-learning-data-science.json")).default as CatalogCategory,
  "prompt-engineering": async () => (await import("@/data/learn-courses/prompt-engineering.json")).default as CatalogCategory,
};

async function getCategory(categorySlug: string) {
  const loader = categoryLoaders[categorySlug];
  return loader ? loader() : null;
}

async function categories() {
  return Promise.all(catalogMetadata.map((metadata) => getCategory(metadata.slug)));
}

function topics(category: CatalogCategory) {
  return category.paths.flatMap((learnPath) => learnPath.modules.flatMap((learnModule) => learnModule.topics.map((topic) => ({ topic, learnPath, learnModule }))));
}

function toLearnTopic(category: CatalogCategory, learnPath: CatalogPath, learnModule: CatalogModule, topic: CatalogTopic): LearnTopic {
  return {
    ...topic,
    updatedAt: "2026-01-01T00:00:00.000Z",
    seoTitle: null,
    seoDescription: topic.description,
    category: { id: category.id, name: category.name, slug: category.slug },
    module: { studyPath: { name: learnPath.name, level: learnPath.level } },
  };
}

export async function getCatalogTopic(categorySlug: string, topicSlug: string) {
  const category = await getCategory(categorySlug);
  if (!category) return null;
  const canonicalSlug = legacyTopicAliases[categorySlug]?.[topicSlug] ?? topicSlug;
  const match = topics(category).find(({ topic }) => topic.slug === canonicalSlug);
  return match ? toLearnTopic(category, match.learnPath, match.learnModule, match.topic) : null;
}

export async function listCatalogCategories() {
  return catalogMetadata.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    paths: category.paths.map((learnPath, index) => ({ id: `${category.slug}-${index}`, level: learnPath.level, _count: { modules: learnPath.moduleCount } })),
    _count: { topics: category.topicCount },
  }));
}

export async function getCatalogCategoryTree(categorySlug: string) {
  return getCategory(categorySlug);
}

export async function getCatalogAdjacentTopics(categorySlug: string, currentTopicId: string) {
  const category = await getCategory(categorySlug);
  if (!category) return { previous: null, next: null };
  const flattened = topics(category).map(({ topic }) => ({ id: topic.id, slug: topic.slug, title: topic.title }));
  const currentIndex = flattened.findIndex((topic) => topic.id === currentTopicId);
  if (currentIndex === -1) return { previous: null, next: null };
  return {
    previous: currentIndex > 0 ? flattened[currentIndex - 1] : null,
    next: currentIndex < flattened.length - 1 ? flattened[currentIndex + 1] : null,
  };
}

export async function searchCatalogTopics(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const loadedCategories = (await categories()).filter((category): category is CatalogCategory => category !== null);
  return loadedCategories.flatMap((category) => topics(category)
    .filter(({ topic }) => `${topic.title} ${topic.shortDescription}`.toLowerCase().includes(normalized))
    .map(({ topic }) => ({ id: topic.id, title: topic.title, slug: topic.slug, shortDescription: topic.shortDescription, estimatedMinutes: topic.estimatedMinutes, category: { name: category.name, slug: category.slug } })))
    .sort((left, right) => left.title.localeCompare(right.title))
    .slice(0, 30);
}

export async function getCatalogTopicLinks(topicIds: string[]) {
  const requested = new Set(topicIds);
  const loadedCategories = (await categories()).filter((category): category is CatalogCategory => category !== null);
  return loadedCategories.flatMap((category) => topics(category)
    .filter(({ topic }) => requested.has(topic.id))
    .map(({ topic }) => ({ id: topic.id, title: topic.title, slug: topic.slug, category: { slug: category.slug } })));
}
