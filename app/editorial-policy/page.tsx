import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { ContentOwner } from "@/components/editorial/content-owner";

export const metadata: Metadata = { title: "Editorial Policy", description: "How InstantInterviewPrep selects, writes, checks, and updates interview-preparation content.", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return <LegalPage title="Editorial policy" lastUpdated="September 5, 2026" intro="This page explains how InstantInterviewPrep approaches interview-preparation content and how readers can help us improve it.">
    <ContentOwner showPolicyLink={false} />
    <h2>What we publish</h2><p>The site organizes interview questions by category, experience level, difficulty, and interview type. Question pages may include an explanation, key points, a sample spoken answer, common mistakes, follow-up questions, practice links, and learning resources. The depth depends on the topic and the information available; sections are not added merely to make a page longer.</p>
    <h2>How questions are selected</h2><p>Questions are chosen to cover recurring interview concepts, practical workplace decisions, role-specific knowledge, and behavioral situations. We keep existing questions when improving the library, and we aim to reduce near-duplicate wording so each page gives the candidate a distinct reason to study it.</p>
    <h2>How answers are structured</h2><p>Answers start with the main idea, then add the reasoning an interviewer is likely to test. Technical topics may include a small example, trade-offs, production considerations, or code when code makes the concept clearer. Behavioral answers focus on a specific situation, action, and result rather than a memorized script.</p>
    <h2>Checking and updating information</h2><p>Technical content is checked against established language, framework, platform, or standards documentation when version-specific or safety-sensitive details matter. We look for outdated guidance when a reader reports an issue, a dependency changes, or maintenance work revisits a topic. We do not claim that every page has been individually reviewed by a named expert.</p>
    <h2>Corrections</h2><p>If you find incorrect information, broken code, an outdated statement, a broken link, or a typo, contact us with the page URL and a concise description. We investigate reports, correct content when appropriate, and update the page&apos;s recorded modification date when a change is made.</p><p>Send reports to <a href="mailto:instantinterviewprep@gmail.com?subject=Content%20correction%20report">instantinterviewprep@gmail.com</a> or use the correction link on a question page.</p>
  </LegalPage>;
}