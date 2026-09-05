import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Suresh Mali - Content Owner",
  description: "Meet Suresh Mali, the content owner and maintainer of InstantInterviewPrep.",
  alternates: { canonical: "/author/suresh-mali" },
};

export default function SureshMaliPage() {
  return (
    <LegalPage
      title="Suresh Mali"
      intro="Suresh Mali is the content owner and maintainer of InstantInterviewPrep."
    >
      <h2>Role on InstantInterviewPrep</h2>
      <p>
        Suresh Mali maintains the website and its interview-preparation content. This page identifies ownership; it does not claim a separate expert-review panel or professional credentials that are not listed here.
      </p>
      <h2>Professional profile</h2>
      <p>
        <a href="https://www.linkedin.com/in/suresh-mali-640939128" target="_blank" rel="noreferrer" className="font-semibold text-coral hover:underline">
          View Suresh Mali&apos;s LinkedIn profile
        </a>
      </p>
      <p>
        Learn how the site&apos;s content is selected, structured, checked, and corrected in the <Link href="/editorial-policy" className="font-semibold text-coral hover:underline">editorial policy</Link>.
      </p>
    </LegalPage>
  );
}