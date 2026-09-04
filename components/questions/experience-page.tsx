import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceLanding } from "@/components/questions/experience-landing";
import { getExperienceLanding, getTechnologyExperienceLanding, type ExperienceSlug } from "@/lib/experience-seo";
import { siteUrl } from "@/lib/site";

export async function experienceMetadata(experience: ExperienceSlug): Promise<Metadata> {
  const data = await getExperienceLanding(experience);
  if (!data) return {};
  const title = `Interview Questions for ${data.level.label} | InstantInterviewPrep`;
  const description = `Practice ${data.total.toLocaleString()} interview questions and answers for ${data.level.label.toLowerCase()} candidates across software, data, QA, sales, and more.`;
  return {
    title,
    description,
    alternates: { canonical: `/interview-questions/${experience}` },
    openGraph: { title, description, type: "website", url: `/interview-questions/${experience}`, siteName: "InstantInterviewPrep", locale: "en_US" },
    robots: { index: true, follow: true },
  };
}

export async function technologyExperienceMetadata(technologySlug: string, experience: ExperienceSlug): Promise<Metadata> {
  const data = await getTechnologyExperienceLanding(technologySlug, experience);
  const level = data?.level;
  if (!data || !level) return {};
  const technology = data.categories.find((category) => category.slug === technologySlug);
  if (!technology) return {};
  const title = `${technology.name} Interview Questions for ${level.label} | InstantInterviewPrep`;
  const description = `Practice ${data.total.toLocaleString()} ${technology.name} interview questions and answers for ${level.label.toLowerCase()} candidates.`;
  const publicSlug = technologySlug === "java-developer" ? "java" : technologySlug === "python-developer" ? "python" : technologySlug === "react-developer" ? "react" : technologySlug;
  return {
    title,
    description,
    alternates: { canonical: `/${publicSlug}-interview-questions/${experience}` },
    openGraph: { title, description, type: "website", url: `/${publicSlug}-interview-questions/${experience}`, siteName: "InstantInterviewPrep", locale: "en_US" },
    robots: { index: true, follow: true },
  };
}

export async function ExperiencePage({ experience }: { experience: ExperienceSlug }) {
  const data = await getExperienceLanding(experience);
  if (!data) notFound();
  const canonicalUrl = `${siteUrl}/interview-questions/${experience}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Interview questions", item: `${siteUrl}/interview-questions` },
      { "@type": "ListItem", position: 3, name: data.level.label, item: canonicalUrl },
    ],
  };
  const collection = { "@context": "https://schema.org", "@type": "CollectionPage", name: `${data.level.label} interview questions`, description: `Published interview questions for ${data.level.label.toLowerCase()} candidates.`, url: canonicalUrl, numberOfItems: data.total };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} /><ExperienceLanding data={data} /></>;
}

export async function TechnologyExperiencePage({ technologySlug, experience, publicSlug }: { technologySlug: string; experience: ExperienceSlug; publicSlug: string }) {
  const data = await getTechnologyExperienceLanding(technologySlug, experience);
  if (!data) notFound();
  const technology = data.categories.find((category) => category.slug === technologySlug);
  if (!technology) notFound();
  const canonicalUrl = `${siteUrl}/${publicSlug}-interview-questions/${experience}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Interview questions", item: `${siteUrl}/interview-questions` },
      { "@type": "ListItem", position: 3, name: technology.name, item: `${siteUrl}/interview-questions/${technology.slug}` },
      { "@type": "ListItem", position: 4, name: data.level.label, item: canonicalUrl },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><ExperienceLanding data={data} technology={technology} /></>;
}
