import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Suresh Mali - Content Owner",
  description: "Meet Suresh Mali, the content owner and maintainer of InstantInterviewPrep.",
  alternates: { canonical: "/author/suresh-mali" },
};

export default function SureshMaliPage() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Suresh Mali",
    url: "https://instantinterviewprep.com/author/suresh-mali",
    sameAs: ["https://www.linkedin.com/in/suresh-mali-640939128"],
    worksFor: { "@type": "Organization", name: "InstantInterviewPrep", url: "https://instantinterviewprep.com" },
  };

  return (
    <LegalPage
      title="Suresh Mali"
      intro="Suresh Mali is the person responsible for the ownership and maintenance of InstantInterviewPrep, a resource for structured interview preparation."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <h2>Role on InstantInterviewPrep</h2>
      <p>
        Suresh Mali oversees the website, its public interview-preparation content, and the systems used to organize questions, learning material, practice, and feedback. This page identifies ownership; it does not claim a separate expert-review panel or professional credentials that are not listed here.
      </p>
      <h2>Professional profile</h2>
      <p>
        <a href="https://www.linkedin.com/in/suresh-mali-640939128" target="_blank" rel="noreferrer" className="font-semibold text-coral hover:underline">
          View Suresh Mali&apos;s professional profile on LinkedIn
        </a>
      </p>
      <p>
        Learn how the site&apos;s content is selected, structured, checked, and corrected in the <Link href="/editorial-policy" className="font-semibold text-coral hover:underline">editorial policy</Link>.
      </p>
    </LegalPage>
  );
}