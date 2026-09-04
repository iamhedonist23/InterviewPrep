import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { paginateItems } from "@/lib/learn-pagination";
import { listPublishedStudyCategoriesForLearn } from "@/lib/study-public";

export const revalidate = 86400;

const LEVEL_LABEL: Record<string, string> = { BEGINNER: "Beginner", INTERMEDIATE: "Intermediate", ADVANCED: "Advanced", INTERVIEW_PREP: "Interview prep" };
const PAGE_SIZE = 9;

type Props = { searchParams: Promise<{ q?: string | string[]; page?: string | string[] }> };
const one = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const hasQuery = Boolean(one(params.q) || one(params.page));
  return {
    title: "Learn",
    description: "Free, structured study guides to build the fundamentals behind your interview answers.",
    alternates: { canonical: "/learn" },
    robots: hasQuery ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function LearnPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = one(params.q) ?? "";
  const requestedPage = Number(one(params.page) ?? "1");
  const categories = await listPublishedStudyCategoriesForLearn();
  const visibleCategories = query
    ? categories.filter(category => `${category.name} ${category.slug}`.toLowerCase().includes(query.toLowerCase()))
    : categories;
  const { currentPage, pageCount, items: pageCategories } = paginateItems(visibleCategories, requestedPage, PAGE_SIZE);
  const createPageUrl = (nextPage: number) => {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (nextPage > 1) search.set("page", String(nextPage));
    const suffix = search.toString();
    return suffix ? `/learn?${suffix}` : "/learn";
  };

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Free study guides</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Learn the fundamentals, not just the answers.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">
          Structured lessons, worked examples, and practice exercises to build real understanding &mdash; then take it straight into practice questions.
        </p>
        <form action="/learn" method="get" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label htmlFor="learn-search" className="sr-only">Search courses</label>
          <input
            id="learn-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search courses, e.g. Java or SQL"
            className="h-11 min-w-0 flex-1 rounded-full border border-ink/15 bg-white/70 px-5 text-sm outline-none focus:border-coral"
          />
          <Button type="submit"><Search size={16} aria-hidden="true" /> Search</Button>
        </form>

        {visibleCategories.length === 0 && (
          <p className="mt-14 text-ink/60">
            {query ? `No courses matched “${query}”.` : "No study guides are published yet. Check back soon."}
          </p>
        )}

        {visibleCategories.length > 0 && (
          <>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageCategories.map(category => (
                <Link
                  key={category.id}
                  href={`/learn/${category.slug}`}
                  className="flex flex-col rounded-2xl border border-ink/10 bg-white/70 p-6 transition-colors hover:border-coral"
                >
                  <h2 className="font-display text-xl font-bold">{category.name}</h2>
                  {category.description && <p className="mt-2 flex-1 text-sm leading-6 text-ink/60">{category.description}</p>}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.paths.map(path => (
                      <span key={path.id} className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-ink/70">
                        {LEVEL_LABEL[path.level] ?? path.level}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-ink/40">
                    {category._count.topics} {category._count.topics === 1 ? "topic" : "topics"}
                  </p>
                </Link>
              ))}
            </div>

            {pageCount > 1 && (
              <nav aria-label="Learn pagination" className="mt-10 flex items-center justify-between gap-3">
                {currentPage > 1 ? (
                  <Link href={createPageUrl(currentPage - 1)} className="rounded-full border border-ink/15 px-5 py-3 text-sm font-bold text-ink hover:border-coral">Previous</Link>
                ) : (
                  <span />
                )}
                <p className="text-sm font-semibold text-ink/60">
                  Page {currentPage} of {pageCount}
                </p>
                {currentPage < pageCount ? (
                  <Link href={createPageUrl(currentPage + 1)} className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper hover:bg-coral">Next</Link>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
