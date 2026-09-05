import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { ContentOwner } from "@/components/editorial/content-owner";

export const metadata: Metadata = { title: "About", description: "Learn what InstantInterviewPrep offers, who it is for, and how its interview-preparation content is organized.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <LegalPage title="About InstantInterviewPrep" lastUpdated="September 5, 2026" intro="InstantInterviewPrep is a free interview-preparation resource for people who want focused practice before a job conversation.">
    <ContentOwner />
    <h2>What the site is for</h2><p>The site is intended for students, freshers, career changers, and experienced candidates preparing for technical, behavioral, HR, situational, and role-specific interviews. It helps turn a broad preparation task into smaller study and practice sessions.</p>
    <h2>What you can use</h2><p>The public library organizes interview questions by category, experience level, difficulty, and interview type. Question pages can include a direct explanation, key points, a spoken sample answer, common mistakes, follow-up prompts, related questions, and links to learning material. You can also use guided practice, daily challenges, learning topics, and the resume builder.</p>
    <h2>How content is organized</h2><p>Categories group related roles and subjects. Experience and difficulty labels help you choose an appropriate starting point, while follow-up questions and related learning topics help you go deeper when a subject needs more preparation.</p>
    <h2>Our goal</h2><p>The goal is useful preparation, not memorization. Examples are starting points that candidates should adapt to their own experience, decisions, and results. Read how the content is created and maintained in our <a href="/editorial-policy">editorial policy</a>.</p>
    <h2>Ownership and feedback</h2><p>Content is owned and maintained by <a href="https://www.linkedin.com/in/suresh-mali-640939128" target="_blank" rel="noreferrer">Suresh Mali</a> through InstantInterviewPrep. The site does not claim a named expert-review panel or credentials that are not listed here. To report an unclear or incorrect page, use <a href="/contact">Contact</a>.</p>
  </LegalPage>;
}
