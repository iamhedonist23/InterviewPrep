import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getPublishedStudyCategoryTree } from "@/lib/study-public";

export const revalidate = 86400;
type Props = { params: Promise<{ category: string }> };

const LEVEL_LABEL: Record<string, string> = { BEGINNER: "Beginner", INTERMEDIATE: "Intermediate", ADVANCED: "Advanced", INTERVIEW_PREP: "Interview prep" };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = await getPublishedStudyCategoryTree(category);
  if (!item) return {};
  return {
    title: `${item.name} study guide`,
    description: item.description ?? `Free ${item.name} study guide with lessons, examples, and practice exercises.`,
    alternates: { canonical: `/learn/${item.slug}` },
  };
}

export default async function LearnCategoryPage({ params }: Props) {
  const { category } = await params;
  const item = await getPublishedStudyCategoryTree(category);
  if (!item) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Learn", item: `${baseUrl}/learn` },
      { "@type": "ListItem", position: 3, name: item.name, item: `${baseUrl}/learn/${item.slug}` },
    ],
  };

  return (
    <section className="py-16 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link><span className="px-2">/</span>
          <Link href="/learn">Learn</Link><span className="px-2">/</span>
          <span className="font-semibold text-ink">{item.name}</span>
        </nav>

        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-coral">Study guide</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{item.name}</h1>
        {item.description && <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">{item.description}</p>}

        {item.paths[0]?.modules[0]?.topics[0] && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/learn/${item.slug}/${item.paths[0].modules[0].topics[0].slug}`}
              className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper hover:bg-coral"
            >
              Start learning
            </Link>
          </div>
        )}

        {item.paths.length === 0 && (
          <p className="mt-14 text-ink/60">No lessons are published in this guide yet. Check back soon.</p>
        )}

        <div className="mt-14 space-y-12">
          {item.paths.map(path => (
            <div key={path.id}>
              <div className="flex items-center gap-3">
                <h2 className="font-display text-2xl font-bold">{path.name}</h2>
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-ink/70">{LEVEL_LABEL[path.level] ?? path.level}</span>
              </div>
              {path.description && <p className="mt-2 max-w-2xl text-ink/60">{path.description}</p>}

              <div className="mt-6 space-y-8">
                {path.modules.map(learnModule => (
                  <div key={learnModule.id}>
                    <h3 className="font-display text-lg font-bold text-ink/80">{learnModule.title}</h3>
                    {learnModule.description && <p className="mt-1 text-sm text-ink/55">{learnModule.description}</p>}
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {learnModule.topics.map(topic => (
                        <li key={topic.id}>
                          <Link
                            href={`/learn/${item.slug}/${topic.slug}`}
                            className="group flex flex-col rounded-xl border border-ink/10 p-4 leading-6 transition-colors hover:border-coral hover:bg-coral/5"
                          >
                            <div>
                              <span className="font-semibold text-ink">{topic.title}</span>
                              {topic.shortDescription && <span className="mt-1 block text-sm text-ink/55">{topic.shortDescription}</span>}
                              {topic.estimatedMinutes && <span className="mt-2 block text-xs font-bold uppercase tracking-widest text-ink/40">{topic.estimatedMinutes} min</span>}
                            </div>
                            <span className="mt-4 inline-flex items-center text-sm font-semibold text-coral">
                              Learn in Detail <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
