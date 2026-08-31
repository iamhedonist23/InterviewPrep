import { z } from "zod";
import { Difficulty } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Shared validation
// ---------------------------------------------------------------------------
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slug = z.string().trim().min(1).max(150).regex(slugPattern, "Slug must be lowercase, alphanumeric, and hyphen-separated");
const name = z.string().trim().min(1).max(150);
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));
const sortOrder = z.number().int().min(0).max(10000).default(0);
const isPublished = z.boolean().default(false);

export const STUDY_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "INTERVIEW_PREP"] as const;

export class StudyNotFoundError extends Error {
  constructor(message = "Study content not found.") {
    super(message);
    this.name = "StudyNotFoundError";
  }
}

// ---------------------------------------------------------------------------
// Admin input schemas
// ---------------------------------------------------------------------------
export const studyCategorySchema = z.object({
  name,
  slug,
  description: optionalText(500),
  icon: optionalText(100),
  isPublished,
  sortOrder,
});

export const studyPathSchema = z.object({
  categoryId: z.string().min(1),
  name,
  slug,
  description: optionalText(500),
  level: z.enum(STUDY_LEVELS),
  isPublished,
  sortOrder,
});

export const studyModuleSchema = z.object({
  studyPathId: z.string().min(1),
  title: name,
  slug,
  description: optionalText(500),
  isPublished,
  sortOrder,
});

export const studyTopicSchema = z.object({
  moduleId: z.string().min(1),
  categoryId: z.string().min(1),
  title: name,
  slug,
  shortDescription: optionalText(300),
  estimatedMinutes: z.number().int().min(1).max(600).optional(),
  isPublished,
  sortOrder,
  seoTitle: optionalText(70),
  seoDescription: optionalText(160),
});

export const studyTopicSectionSchema = z.object({
  topicId: z.string().min(1),
  title: name,
  // Sections store safe plain/markdown text authored by admins — never raw
  // HTML from a browser, and never rendered with dangerouslySetInnerHTML.
  content: z.string().trim().min(1).max(20000),
  sortOrder,
});

export const studyExampleSchema = z.object({
  topicId: z.string().min(1),
  language: z.string().trim().min(1).max(30),
  code: z.string().trim().min(1).max(10000),
  explanation: optionalText(1000),
  sortOrder,
});

export const studyExerciseSchema = z.object({
  topicId: z.string().min(1),
  question: z.string().trim().min(1).max(2000),
  difficulty: z.nativeEnum(Difficulty).default("EASY"),
  hint: optionalText(1000),
  solution: optionalText(5000),
  explanation: optionalText(2000),
  sortOrder,
});

export const studyTopicQuestionRelationSchema = z.object({
  topicId: z.string().min(1),
  questionId: z.string().min(1),
  sortOrder,
});

export const studyIdSchema = z.object({ id: z.string().min(1) });

// ---------------------------------------------------------------------------
// Admin content CRUD
//
// These functions do NOT check admin role themselves — callers (API routes)
// must gate with requireAdminApi() first, same pattern as
// app/api/admin/[resource]/route.ts. This mirrors the rest of the codebase
// rather than introducing a second authorization mechanism.
// ---------------------------------------------------------------------------

export async function listStudyCategories(options: { includeUnpublished?: boolean } = {}) {
  return prisma.studyCategory.findMany({
    where: options.includeUnpublished ? {} : { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createStudyCategory(input: z.infer<typeof studyCategorySchema>) {
  return prisma.studyCategory.create({ data: input });
}

export async function updateStudyCategory(id: string, input: Partial<z.infer<typeof studyCategorySchema>>) {
  try {
    return await prisma.studyCategory.update({ where: { id }, data: input });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function deleteStudyCategory(id: string) {
  try {
    await prisma.studyCategory.delete({ where: { id } });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function createStudyPath(input: z.infer<typeof studyPathSchema>) {
  return prisma.studyPath.create({ data: input });
}

export async function updateStudyPath(id: string, input: Partial<z.infer<typeof studyPathSchema>>) {
  try {
    return await prisma.studyPath.update({ where: { id }, data: input });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function deleteStudyPath(id: string) {
  try {
    await prisma.studyPath.delete({ where: { id } });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function createStudyModule(input: z.infer<typeof studyModuleSchema>) {
  return prisma.studyModule.create({ data: input });
}

export async function updateStudyModule(id: string, input: Partial<z.infer<typeof studyModuleSchema>>) {
  try {
    return await prisma.studyModule.update({ where: { id }, data: input });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function deleteStudyModule(id: string) {
  try {
    await prisma.studyModule.delete({ where: { id } });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function createStudyTopic(input: z.infer<typeof studyTopicSchema>) {
  return prisma.studyTopic.create({ data: input });
}

export async function updateStudyTopic(id: string, input: Partial<z.infer<typeof studyTopicSchema>>) {
  try {
    return await prisma.studyTopic.update({ where: { id }, data: input });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function deleteStudyTopic(id: string) {
  try {
    await prisma.studyTopic.delete({ where: { id } });
  } catch {
    throw new StudyNotFoundError();
  }
}

export async function createStudyTopicSection(input: z.infer<typeof studyTopicSectionSchema>) {
  return prisma.studyTopicSection.create({ data: input });
}

export async function createStudyExample(input: z.infer<typeof studyExampleSchema>) {
  return prisma.studyExample.create({ data: input });
}

export async function createStudyExercise(input: z.infer<typeof studyExerciseSchema>) {
  return prisma.studyExercise.create({ data: input });
}

// Links an existing InterviewQuestion to a study topic. Never creates a new
// question record — the doc is explicit that question data must not be
// duplicated, only referenced by ID.
export async function linkStudyTopicQuestion(input: z.infer<typeof studyTopicQuestionRelationSchema>) {
  const question = await prisma.interviewQuestion.findUnique({ where: { id: input.questionId }, select: { id: true } });
  if (!question) throw new StudyNotFoundError("That interview question does not exist.");
  return prisma.studyTopicQuestionRelation.upsert({
    where: { topicId_questionId: { topicId: input.topicId, questionId: input.questionId } },
    create: input,
    update: { sortOrder: input.sortOrder },
  });
}

export async function unlinkStudyTopicQuestion(topicId: string, questionId: string) {
  await prisma.studyTopicQuestionRelation.deleteMany({ where: { topicId, questionId } });
}

// ---------------------------------------------------------------------------
// Public reads (published content only — used by /learn pages in Phase 21+)
// ---------------------------------------------------------------------------

export async function getPublishedTopic(categorySlug: string, topicSlug: string) {
  return prisma.studyTopic.findFirst({
    where: {
      slug: topicSlug,
      isPublished: true,
      category: { slug: categorySlug, isPublished: true },
      // A topic being published isn't enough on its own — its parent module
      // and path must also still be published, or unpublishing a whole
      // module/level would silently fail to hide its topics from direct URL
      // access (and from the sitemap, which reuses this same filter shape).
      module: { isPublished: true, studyPath: { isPublished: true } },
    },
    include: {
      category: true,
      module: { include: { studyPath: true } },
      sections: { orderBy: { sortOrder: "asc" } },
      examples: { orderBy: { sortOrder: "asc" } },
      exercises: { orderBy: { sortOrder: "asc" } },
      questionRelations: { include: { question: { select: { id: true, question: true, slug: true, isPublished: true } } }, orderBy: { sortOrder: "asc" } },
    },
  });
}

// Previous/Next navigation on the topic page. "Next" walks the whole
// category's published path -> module -> topic tree in display order (the
// same order shown on the category page), not just siblings within one
// module, so finishing the last topic in a module continues straight into
// the next module/path rather than dead-ending.
export async function getAdjacentTopics(categorySlug: string, currentTopicId: string) {
  const category = await prisma.studyCategory.findFirst({
    where: { slug: categorySlug, isPublished: true },
    include: {
      paths: {
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
        include: {
          modules: {
            where: { isPublished: true },
            orderBy: { sortOrder: "asc" },
            include: { topics: { where: { isPublished: true }, orderBy: { sortOrder: "asc" }, select: { id: true, slug: true, title: true } } },
          },
        },
      },
    },
  });
  if (!category) return { previous: null, next: null };

  const flattened = category.paths.flatMap(path => path.modules.flatMap(learnModule => learnModule.topics));
  const currentIndex = flattened.findIndex(topic => topic.id === currentTopicId);
  if (currentIndex === -1) return { previous: null, next: null };

  return {
    previous: currentIndex > 0 ? flattened[currentIndex - 1] : null,
    next: currentIndex < flattened.length - 1 ? flattened[currentIndex + 1] : null,
  };
}


// published-topic count per path so /learn can show real progress markers
// (e.g. "12 topics") without a separate query per card.
export async function listPublishedStudyCategoriesForLearn() {
  return prisma.studyCategory.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: {
      paths: {
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
        include: { _count: { select: { modules: true } } },
      },
      _count: { select: { topics: { where: { isPublished: true, module: { isPublished: true, studyPath: { isPublished: true } } } } } },
    },
  });
}

// Public category page: the category plus its full published path -> module
// -> topic tree, so /learn/[category] can render one nested outline.
export async function getPublishedStudyCategoryTree(categorySlug: string) {
  return prisma.studyCategory.findFirst({
    where: { slug: categorySlug, isPublished: true },
    include: {
      paths: {
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
        include: {
          modules: {
            where: { isPublished: true },
            orderBy: { sortOrder: "asc" },
            include: {
              topics: {
                where: { isPublished: true },
                orderBy: { sortOrder: "asc" },
                select: { id: true, title: true, slug: true, shortDescription: true, estimatedMinutes: true },
              },
            },
          },
        },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Progress — always scoped to an explicit, server-derived userId. Never
// accept a userId from request bodies or query params.
// ---------------------------------------------------------------------------

export async function startTopicProgress(userId: string, topicId: string) {
  const topic = await prisma.studyTopic.findUnique({ where: { id: topicId }, select: { id: true } });
  if (!topic) throw new StudyNotFoundError();
  return prisma.studyProgress.upsert({
    where: { userId_topicId: { userId, topicId } },
    create: { userId, topicId, status: "STARTED" },
    update: {},
  });
}

export async function completeTopicProgress(userId: string, topicId: string) {
  const topic = await prisma.studyTopic.findUnique({ where: { id: topicId }, select: { id: true } });
  if (!topic) throw new StudyNotFoundError();
  return prisma.studyProgress.upsert({
    where: { userId_topicId: { userId, topicId } },
    create: { userId, topicId, status: "COMPLETED", completedAt: new Date() },
    update: { status: "COMPLETED", completedAt: new Date() },
  });
}

export async function getUserProgressForCategory(userId: string, categoryId: string) {
  return prisma.studyProgress.findMany({
    where: { userId, topic: { categoryId } },
    select: { topicId: true, status: true, completedAt: true },
  });
}

export async function getOwnedTopicProgress(userId: string, topicId: string) {
  return prisma.studyProgress.findUnique({ where: { userId_topicId: { userId, topicId } } });
}

// ---------------------------------------------------------------------------
// Dashboard integration (personalization Phase A). Deliberately simple and
// honest: StudyProgress only tracks STARTED/COMPLETED, so this never
// fabricates a fractional "65%" completion number for an individual topic —
// only real counts and status.
// ---------------------------------------------------------------------------

export async function getContinueLearning(userId: string, limit = 3) {
  return prisma.studyProgress.findMany({
    where: { userId, status: "STARTED" },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      topicId: true,
      updatedAt: true,
      topic: {
        select: {
          title: true,
          slug: true,
          estimatedMinutes: true,
          category: { select: { slug: true, name: true } },
          module: { select: { title: true } },
        },
      },
    },
  });
}

export type RecommendedTopic = { id: string; title: string; slug: string; estimatedMinutes: number | null; category: { slug: string; name: string }; reason: "weakArea" | "interest" | "nextUp" };

// Recommends published, not-yet-started topics. Base candidates come from the
// user's chosen technologies (falling back to any published category if they
// have none set). When weakCategorySlugs is provided (from
// lib/analytics.ts's getWeakCategories — real, observed low scores, not a
// guess), topics from those categories are surfaced first and tagged
// "weakArea" so the UI can show *why* something was recommended, per the
// product spec's "Recommended because you recently struggled with this
// topic." weakCategorySlugs defaults to [] so existing callers/tests that
// don't pass it behave exactly as before. Respects the same module/path
// publish-status gating as getPublishedTopic.
export async function getRecommendedTopics(userId: string, preferredTechnologies: string[], limit = 4, weakCategorySlugs: string[] = []): Promise<RecommendedTopic[]> {
  const inProgressOrDone = await prisma.studyProgress.findMany({ where: { userId }, select: { topicId: true } });
  const excludeIds = inProgressOrDone.map((p) => p.topicId);

  const categoryFilter =
    preferredTechnologies.length > 0
      ? { category: { isPublished: true, name: { in: preferredTechnologies, mode: "insensitive" as const } } }
      : { category: { isPublished: true } };

  const [candidates, weakAreaTopics] = await Promise.all([
    prisma.studyTopic.findMany({
      where: {
        isPublished: true,
        id: { notIn: excludeIds },
        module: { isPublished: true, studyPath: { isPublished: true } },
        ...categoryFilter,
      },
      orderBy: { sortOrder: "asc" },
      take: limit,
      select: { id: true, title: true, slug: true, estimatedMinutes: true, category: { select: { slug: true, name: true } } },
    }),
    weakCategorySlugs.length > 0
      ? prisma.studyTopic.findMany({
          where: {
            isPublished: true,
            id: { notIn: excludeIds },
            module: { isPublished: true, studyPath: { isPublished: true } },
            category: { isPublished: true, slug: { in: weakCategorySlugs } },
          },
          orderBy: { sortOrder: "asc" },
          take: limit,
          select: { id: true, title: true, slug: true, estimatedMinutes: true, category: { select: { slug: true, name: true } } },
        })
      : Promise.resolve([]),
  ]);

  const seen = new Set<string>();
  const merged: RecommendedTopic[] = [];
  for (const topic of weakAreaTopics) {
    if (seen.has(topic.id)) continue;
    seen.add(topic.id);
    merged.push({ ...topic, reason: "weakArea" });
  }
  for (const topic of candidates) {
    if (seen.has(topic.id) || merged.length >= limit) continue;
    seen.add(topic.id);
    merged.push({ ...topic, reason: preferredTechnologies.length > 0 ? "interest" : "nextUp" });
  }
  return merged.slice(0, limit);
}

export async function getStudyProgressTotals(userId: string) {
  const [started, completed] = await Promise.all([
    prisma.studyProgress.count({ where: { userId } }),
    prisma.studyProgress.count({ where: { userId, status: "COMPLETED" } }),
  ]);
  return { started, completed };
}
