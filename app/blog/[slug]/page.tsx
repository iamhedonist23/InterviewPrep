import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blog/article-content";
import { QuestionCard } from "@/components/questions/question-card";
import { Container } from "@/components/ui/container";
import {
  getArticle,
  relatedArticles,
  relatedQuestions,
} from "@/services/articles";

export const revalidate = 1800;
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: article.author ? [article.author] : undefined,
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const [related, questions] = await Promise.all([
    relatedArticles(article),
    relatedQuestions(article.categoryId),
  ]);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${baseUrl}/blog/${article.slug}`,
      },
    ],
  };
  const structuredArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Person", name: article.author ?? "InterviewPrep team" },
    mainEntityOfPage: `${baseUrl}/blog/${article.slug}`,
  };
  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link>
          <span className="px-2">/</span>
          <Link href="/blog">Resources</Link>
          <span className="px-2">/</span>
          <span className="font-semibold text-ink">Article</span>
        </nav>
        <article className="mx-auto mt-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">
            {article.category?.name ?? "Interview guide"}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-ink/60">
            {article.excerpt}
          </p>
          <p className="mt-5 text-sm text-ink/50">
            By {article.author ?? "InterviewPrep team"}
            {article.publishedAt
              ? ` · ${article.publishedAt.toLocaleDateString("en-US", { dateStyle: "long" })}`
              : ""}
          </p>
          <div className="mt-12">
            <ArticleContent content={article.content} />
          </div>
        </article>
        {questions.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl">
            <h2 className="font-display text-3xl font-bold">
              Practice these questions next
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </section>
        )}
        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl">
            <h2 className="font-display text-3xl font-bold">
              Related resources
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  href={`/blog/${item.slug}`}
                  className="rounded-2xl border border-ink/10 bg-white/70 p-5 hover:border-coral"
                  key={item.id}
                >
                  <h3 className="font-display text-lg font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-ink/60">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </section>
  );
}
