import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/questions/question-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getCachedPublicQuestionCategory } from "@/lib/public-content";
import { siteUrl } from "@/lib/site";

export const revalidate = 1800;
type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};
const EXPERIENCE_LEVELS = [
  ["FRESHER", "Freshers"],
  ["INTERNSHIP", "Internships"],
  ["MID_LEVEL", "Mid-level developers"],
  ["EXPERIENCED", "Experienced developers"],
] as const;
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { category } = await params;
  const { page } = await searchParams;
  const result = await getCachedPublicQuestionCategory(category, 1);
  const item = result?.item;
  const subtopics = item?.subcategories.filter((subcategory) => subcategory._count.questions > 0) ?? [];
  const description = item
    ? `Practice ${item.name} interview questions and answers with practical guidance for your next interview.${subtopics.length ? ` Topics include ${subtopics.slice(0, 3).map((subcategory) => subcategory.name).join(", ")}.` : ""}`
    : undefined;
  return item
    ? {
        title: `${item.name} Interview Questions & Answers | InstantInterviewPrep`,
        description,
        alternates: { canonical: `/interview-questions/${item.slug}` },
        openGraph: {
          title: `${item.name} Interview Questions & Answers | InstantInterviewPrep`,
          description,
          type: "website",
          url: `/interview-questions/${item.slug}`,
          siteName: "InstantInterviewPrep",
          locale: "en_US",
          images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${item.name} interview questions and answers` }],
        },
        robots: page ? { index: false, follow: true } : { index: true, follow: true },
      }
    : {};
}
export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const result = await getCachedPublicQuestionCategory(category, page);
  if (!result) notFound();
  const { item, totalQuestions, experienceCounts, relatedCategories, relatedArticles, learnCategories, pageCount } = result;
  if (page > pageCount) notFound();
  const baseUrl = siteUrl;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Interview questions",
        item: `${baseUrl}/interview-questions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.name,
        item: `${baseUrl}/interview-questions/${item.slug}`,
      },
    ],
  };
  const subtopics = item.subcategories.filter((subcategory) => subcategory._count.questions > 0);
  const experienceLinks = EXPERIENCE_LEVELS.map(([value, label]) => ({
    value,
    label,
    count: experienceCounts.find((entry) => entry.experienceLevel === value)?._count._all ?? 0,
  })).filter((entry) => entry.count > 0);
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${item.name} interview questions`,
    description: item.description ?? `Practice ${item.name} interview questions with useful answer guidance.`,
    url: `${baseUrl}/interview-questions/${item.slug}`,
    isPartOf: { "@type": "WebSite", name: "InstantInterviewPrep", url: baseUrl },
    numberOfItems: totalQuestions,
  };
  const faqItems = totalQuestions > 0 ? [
    {
      question: `What ${item.name} interview topics are covered?`,
      answer: `This category includes published questions for ${subtopics.map((subcategory) => subcategory.name).join(", ")}.`,
    },
    {
      question: `How should I prepare for ${item.name} interviews?`,
      answer: `Start with the topic areas that match your role, review the answer guidance, and practice explaining your reasoning clearly under interview conditions.`,
    },
  ] : [];
  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link>
          <span className="px-2">/</span>
          <Link href="/interview-questions">Interview questions</Link>
          <span className="px-2">/</span>
          <span className="font-semibold text-ink">{item.name}</span>
        </nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-coral">
          Category
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
          {item.name} Interview Questions and Answers
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">
          {item.description ?? `Prepare for ${item.name} interviews with published questions, practical answer guidance, and focused practice.`}
        </p>
        <Button href={`/practice?category=${item.slug}`} className="mt-7">
          Practice this category
        </Button>
        {subtopics.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold">{item.name} interview topics</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subtopics.map((subcategory) => (
                <Link key={subcategory.id} href={`/interview-questions?category=${item.slug}&subcategory=${subcategory.slug}`} className="rounded-2xl border border-ink/10 bg-white/70 p-5 hover:border-coral">
                  <h3 className="font-display text-lg font-bold">{subcategory.name} interview questions</h3>
                  <p className="mt-2 text-sm text-ink/60">{subcategory._count.questions} published questions with answer guidance.</p>
                  <span className="mt-4 inline-block text-sm font-bold text-coral">Explore this topic</span>
                </Link>
              ))}
            </div>
          </div>
        )}
        {experienceLinks.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold">{item.name} questions by experience level</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {experienceLinks.map((entry) => (
                <Link key={entry.value} href={`/interview-questions?category=${item.slug}&experience=${entry.value}`} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:border-coral hover:text-coral">
                  {entry.label} ({entry.count})
                </Link>
              ))}
            </div>
          </section>
        )}
        <h2 className="mt-14 font-display text-2xl font-bold">
          Popular questions
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {item.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
        <div className="mt-10 flex justify-between">
          {page > 1 ? (
            <Button
              href={`/interview-questions/${item.slug}?page=${page - 1}`}
              variant="outline"
            >
              Previous
            </Button>
          ) : (
            <span />
          )}
          {page < pageCount && (
            <Button
              href={`/interview-questions/${item.slug}?page=${page + 1}`}
              variant="outline"
            >
              Next
            </Button>
          )}
        </div>
        {learnCategories.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold">Learn {item.name} concepts</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learnCategories.map((learnCategory) => (
                <Link key={learnCategory.id} href={`/learn/${learnCategory.slug}`} className="rounded-2xl border border-ink/10 bg-white/70 p-5 hover:border-coral">
                  <h3 className="font-display text-lg font-bold">{learnCategory.name}</h3>
                  {learnCategory.description && <p className="mt-2 text-sm leading-6 text-ink/60">{learnCategory.description}</p>}
                  <span className="mt-4 inline-block text-sm font-bold text-coral">Open study guide</span>
                </Link>
              ))}
            </div>
          </section>
        )}
        {relatedCategories.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">
              Related categories
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {relatedCategories.map((related) => (
                <Link
                  href={`/interview-questions/${related.slug}`}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm font-bold hover:border-coral hover:text-coral"
                  key={related.id}
                >
                  {related.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold">
              Related resources
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <Link
                  href={`/blog/${article.slug}`}
                  className="rounded-2xl border border-ink/10 bg-white/70 p-5 hover:border-coral"
                  key={article.id}
                >
                  <h3 className="font-display text-lg font-bold">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
        {faqItems.length > 0 && (
          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">{item.name} interview questions FAQ</h2>
            <div className="mt-5 grid gap-4">
              {faqItems.map((faq) => (
                <details key={faq.question} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
                  <summary className="cursor-pointer font-display text-lg font-bold">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </Container>
    </section>
  );
}
