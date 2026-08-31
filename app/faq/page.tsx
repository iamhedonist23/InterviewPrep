import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about using InterviewPrep, a free interview preparation platform." };

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Only emit FAQPage structured data when there is real, published content
  // behind it — never fabricate questions/answers just to populate schema.
  const structuredData = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${baseUrl}/faq` },
    ],
  };

  return (
    <section className="py-16 sm:py-20">
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link>
          <span className="px-2">/</span>
          <span className="font-semibold text-ink">FAQ</span>
        </nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-coral">Need to know more?</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Frequently asked questions</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">
          Answers to the questions we hear most about using InterviewPrep.
        </p>
        {faqs.length ? (
          <div className="mt-12 grid max-w-3xl gap-4">
            {faqs.map(faq => (
              <details key={faq.id} className="group rounded-2xl border border-ink/10 bg-white/70 p-5">
                <summary className="cursor-pointer list-none font-display text-lg font-bold marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="mt-12 max-w-2xl text-ink/60">
            We&apos;re still writing up answers to common questions. In the meantime,{" "}
            <Link href="/contact" className="font-bold text-coral">
              contact us
            </Link>{" "}
            with anything you&apos;d like to know.
          </p>
        )}
      </Container>
    </section>
  );
}
