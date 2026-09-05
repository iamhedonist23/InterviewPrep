import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { ContentOwner } from "@/components/editorial/content-owner";

export const metadata: Metadata = { title: "Editorial Policy", description: "How InstantInterviewPrep selects, writes, checks, and updates interview-preparation content.", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return <LegalPage title="Editorial policy" lastUpdated="September 5, 2026" intro="This page explains who maintains InstantInterviewPrep, how content moves from draft to publication, and how readers can report a problem.">
    <ContentOwner showPolicyLink={false} />
    <h2>How we maintain our content</h2>
    <p>Questions and learning materials are added through reviewed seed data, administrator imports, and the site&apos;s learning-content workflows. Existing answers are improved when content is edited, a technical detail changes, a broken example is found, or a reader reports a problem.</p>
    <p>Automated checks help validate required fields, publication state, formatting, duplicate slugs, and potentially similar questions. These checks improve consistency; they do not establish that an answer is technically correct.</p>
    <p>Optional AI generation is restricted to the administrator area and creates unpublished drafts only when explicitly enabled and configured. Drafts must be reviewed, edited, approved, and published by an administrator. AI-generated drafts are not automatically published and are not treated as authoritative without that process.</p>
    <h2>What we publish</h2>
    <p>The site organizes interview questions by category, experience level, difficulty, and interview type. Pages may include an explanation, key points, a sample spoken answer, common mistakes, follow-up questions, practice links, learning topics, and selected official references. The depth depends on the subject; sections are not added only to increase word count.</p>
    <h2>How answers are structured</h2>
    <p>Answers begin with the main idea and then explain the reasoning an interviewer is likely to test. Technical pages may include examples, code, trade-offs, production considerations, or authoritative further reading when those details genuinely help. Behavioral answers are intended as adaptable guidance, not scripts or promises of a particular interview result.</p>
    <h2>Technical accuracy and version changes</h2>
    <p>When version-specific or safety-sensitive details matter, maintainers use relevant language, framework, platform, or standards documentation as a reference. Behavior can vary by version or provider, so readers should verify important implementation details against the linked official documentation and the version they use.</p>
    <h2>Corrections and outdated information</h2>
    <p>Reports about incorrect answers, broken code, outdated guidance, broken links, missing information, or typographical errors can be submitted through the <a href="/contact">Contact page</a>. The form records the issue type, page URL when supplied, explanation, and contact email for editorial follow-up. Reports are assessed individually; a submission does not guarantee that a page will change.</p>
    <p>When a published record is materially edited, its stored modification date changes. The site does not display an expert-reviewed or reviewed-on label unless a separate review record exists. Current dates labeled Published or Last modified describe stored content metadata, not a claim that every page was manually checked on that date.</p>
    <h2>What we do not claim</h2>
    <p>InstantInterviewPrep does not claim that every page is manually reviewed, expert certified, error-free, or written by a named specialist. The content owner is identified on this page and users are encouraged to verify important technical information and report issues.</p>
  </LegalPage>;
}
