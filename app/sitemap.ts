import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getEligibleExperienceSitemapPaths } from "@/lib/experience-seo";
import { siteUrl } from "@/lib/site";

// Only ever list public, published, non-authenticated pages here. Admin,
// dashboard, auth, and resume routes must never appear in the sitemap.
const STATIC_PATHS = ["", "/interview-questions", "/practice", "/mock-interview", "/learn", "/blog", "/about", "/author/suresh-mali", "/contact", "/editorial-policy", "/faq", "/categories", "/privacy", "/terms", "/disclaimer", "/cookie-policy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl;

  const [categories, questions, articles, studyCategories, studyTopics, experiencePaths] = await Promise.all([
    prisma.category.findMany({ where: { questions: { some: { isPublished: true } } }, select: { slug: true, updatedAt: true } }),
    prisma.interviewQuestion.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.studyCategory.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.studyTopic.findMany({ where: { isPublished: true, category: { isPublished: true }, module: { isPublished: true, studyPath: { isPublished: true } } }, select: { slug: true, updatedAt: true, category: { select: { slug: true } } } }),
    getEligibleExperienceSitemapPaths(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(path => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${base}/interview-questions/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const questionEntries: MetadataRoute.Sitemap = questions.map(question => ({
    url: `${base}/questions/${question.slug}`,
    lastModified: question.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const studyCategoryEntries: MetadataRoute.Sitemap = studyCategories.map(studyCategory => ({
    url: `${base}/learn/${studyCategory.slug}`,
    lastModified: studyCategory.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const studyTopicEntries: MetadataRoute.Sitemap = studyTopics.map(studyTopic => ({
    url: `${base}/learn/${studyTopic.category.slug}/${studyTopic.slug}`,
    lastModified: studyTopic.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const experienceEntries: MetadataRoute.Sitemap = experiencePaths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const entries = [...staticEntries, ...categoryEntries, ...questionEntries, ...articleEntries, ...studyCategoryEntries, ...studyTopicEntries, ...experienceEntries];
  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}
