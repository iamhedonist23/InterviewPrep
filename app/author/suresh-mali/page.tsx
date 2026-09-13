import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Suresh Mali - Content Owner",
  description: "Suresh Mali is the owner and maintainer identified by InstantInterviewPrep.",
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
      lastUpdated="September 13, 2026"
      intro="Suresh Mali is the person identified by InstantInterviewPrep as responsible for ownership and maintenance of the site."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <h2>Role on InstantInterviewPrep</h2>
      <p>
        Suresh Mali oversees the website, its public interview-preparation content, and the systems used to organize questions, learning material, practice, and feedback. This page identifies the site owner and maintainer. It does not add years of experience, job titles, employers, degrees, certifications, or a separate expert-review panel.
      </p>
      <h2>What this profile confirms</h2>
      <p>
        The factual role stated here is ownership and maintenance of InstantInterviewPrep. Any information beyond that should be taken from the linked profile rather than inferred from this website.
      </p>
      <p><a href="https://www.linkedin.com/in/suresh-mali-640939128" target="_blank" rel="noreferrer" className="font-semibold text-coral hover:underline">View Suresh Mali&apos;s LinkedIn profile</a></p>
      <p>
        Learn how the site&apos;s content is selected, structured, checked, and corrected in the <Link href="/editorial-policy" className="font-semibold text-coral hover:underline">editorial policy</Link>.
      </p>
    </LegalPage>
  );
}