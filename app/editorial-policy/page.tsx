import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { ContentOwner } from "@/components/editorial/content-owner";

export const metadata: Metadata = { title: "Editorial Policy", description: "How InstantInterviewPrep selects, structures, checks, corrects, and updates interview-preparation content.", alternates: { canonical: "/editorial-policy" } };

export default function EditorialPolicyPage() {
  return <LegalPage title="Editorial policy" lastUpdated="September 13, 2026" intro="This page explains who maintains InstantInterviewPrep, how content moves from draft to publication, what checks are actually performed, and how readers can report a problem.">
    <ContentOwner showPolicyLink={false} />
    <h2>Editorial ownership</h2>
    <p>InstantInterviewPrep is owned and maintained by <a href="/author/suresh-mali">Suresh Mali</a>. This is a description of site ownership and maintenance, not a claim that every page was written personally or reviewed by an outside specialist.</p>
    <h2>How we create interview content</h2>
    <p>Questions and learning materials are added through seed data, administrator imports, and the site&apos;s learning-content workflows. The workflow can include selecting a topic, assigning category and interview metadata, structuring answer guidance, checking the record, and publishing it. The exact depth of each page depends on its subject and available supporting material.</p>
    <p>Optional AI generation is restricted to the administrator area and creates unpublished drafts only when explicitly enabled and configured. Drafts must be reviewed, edited, approved, and published by an administrator. AI assistance can help with a starting draft or structure; it does not replace editorial judgment or technical verification. AI-generated drafts are not automatically published and are not treated as authoritative without that process.</p>
    <h2>Editorial standards</h2>
    <p>The site organizes interview questions by category, experience level, difficulty, and interview type. Pages may include an explanation, key points, a sample spoken answer, common mistakes, follow-up questions, practice links, learning topics, and selected official references. The depth depends on the subject; sections are not added only to increase word count.</p>
    <h2>How answers are structured</h2>
    <p>Answers begin with the main idea and then explain the reasoning an interviewer is likely to test. Technical pages may include examples, code, trade-offs, production considerations, or authoritative further reading when those details genuinely help. Behavioral answers are intended as adaptable guidance, not scripts or promises of a particular interview result.</p>
    <h2>Technical accuracy and version changes</h2>
    <p>Automated checks help validate required fields, publication state, formatting, duplicate slugs, and potentially similar questions. These checks improve consistency; they do not establish that an answer is technically correct. When version-specific or safety-sensitive details matter, maintainers use relevant language, framework, platform, or standards documentation as a reference. Behavior can vary by version or provider, so readers should verify important implementation details against the linked official documentation and the version they use.</p>
    <h2>Corrections and updates</h2>
    <p>Reports about incorrect answers, broken code, outdated guidance, broken links, missing information, or typographical errors can be submitted through the <a href="/contact">Contact page</a>. Include the page URL, describe the problem, and suggest a correction when possible. The form records the issue type, page URL when supplied, explanation, suggested correction, and contact email for editorial follow-up.</p>
    <p>Reports are assessed individually. A report may result in a correction, an update, a request for more information, or no change when the claim cannot be verified. A submission does not guarantee that a page will change. When a published record is materially edited, its stored modification date changes. A date labeled Published or Last modified describes stored content metadata; it is not an expert-reviewed or reviewed-on label.</p>
    <h2>What we do not claim</h2>
    <p>InstantInterviewPrep does not claim that every page is manually reviewed, expert certified, error-free, written by a named specialist, or checked by an independent review panel. The site identifies its content owner, describes the checks it performs, links to official references where available, and invites readers to report issues.</p>
  </LegalPage>;
}
