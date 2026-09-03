import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Only ever list public, published, non-authenticated pages here. Admin,
// dashboard, auth, and resume routes must never appear in the sitemap.
const STATIC_PATHS = ["", "/interview-questions", "/practice", "/mock-interview", "/learn", "/blog", "/about", "/contact", "/faq", "/categories", "/privacy", "/terms", "/disclaimer", "/cookie-policy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://instantinterviewprep.com/";

  const [categories, questions, articles, studyCategories, studyTopics] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.interviewQuestion.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.article.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.studyCategory.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.studyTopic.findMany({ where: { isPublished: true, category: { isPublished: true }, module: { isPublished: true, studyPath: { isPublished: true } } }, select: { slug: true, updatedAt: true, category: { select: { slug: true } } } }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
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

  return [...staticEntries, ...categoryEntries, ...questionEntries, ...articleEntries, ...studyCategoryEntries, ...studyTopicEntries];
}
