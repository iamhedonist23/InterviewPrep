import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about using InterviewPrep, a free interview preparation platform.",
};

const faqs = [
  {
    id: "what-is-interviewprep",
    question: "What is InterviewPrep?",
    answer:
      "InterviewPrep is a free resource for practicing interview questions, learning interview concepts, and preparing for job conversations.",
  },
  {
    id: "is-interviewprep-free",
    question: "Is InterviewPrep free?",
    answer:
      "Yes. The public question library and preparation resources are free to use. Some account features require registration so your progress can be saved.",
  },
  {
    id: "how-do-i-practice",
    question: "How do I practice interview questions?",
    answer:
      "Choose a category, open a question, and use the answer guidance to build your own response. You can also use the practice and daily challenge features to build a regular routine.",
  },
  {
    id: "do-i-need-account",
    question: "Do I need an account?",
    answer:
      "You can browse public questions and resources without an account. An account is useful for saving questions, tracking progress, and using other personalized features.",
  },
  {
    id: "what-is-saved",
    question: "What can I save in an account?",
    answer:
      "Signed-in users can save interview questions, track learning progress, record practice responses and results, and keep resume-builder information. Account data is associated with your user profile rather than being public.",
  },
  {
    id: "are-practice-drafts-saved",
    question: "What happens to an unfinished practice session?",
    answer:
      "The practice workflow keeps an in-progress draft in your browser's local storage so a refresh or navigation does not immediately lose it. Submitted results can also be saved to your account when you are signed in.",
  },
  {
    id: "are-sample-answers-scripts",
    question: "Should I memorize the sample answers?",
    answer:
      "No. Sample answers are starting points. Use the explanation, key points, and follow-up questions to build a response that reflects your own experience and judgment.",
  },
  {
    id: "how-delete-data",
    question: "How do I request deletion of my account data?",
    answer:
      "Email instantinterviewprep@gmail.com with a deletion request. We may ask for information needed to verify that you control the account, and we retain limited records where required for security, legal, or backup reasons.",
  },
  {
    id: "contact-help",
    question: "How can I get help?",
    answer:
      "Visit the contact page and send us your question. Please do not include passwords, API keys, or other sensitive information.",
  },
];

export default function FaqPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Keep structured data aligned with the questions rendered on this page.
  const structuredData = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
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
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink/55">
          <Link href="/">Home</Link>
          <span className="px-2">/</span>
          <span className="font-semibold text-ink">FAQ</span>
        </nav>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-coral">
          Need to know more?
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Frequently asked questions
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">
          Answers to the questions we hear most about using InterviewPrep.
        </p>
        {faqs.length ? (
          <div className="mt-12 grid max-w-3xl gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-2xl border border-ink/10 bg-white/70 p-5"
              >
                <summary className="cursor-pointer list-none font-display text-lg font-bold marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-ink/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        ) : (
          <p className="mt-12 max-w-2xl text-ink/60">
            We&apos;re still writing up answers to common questions. In the
            meantime,{" "}
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
