import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Contact", description: "Contact InstantInterviewPrep to report incorrect information, broken code or links, and suggest improvements.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <LegalPage title="Contact InstantInterviewPrep" lastUpdated="September 5, 2026" intro="Use the form or email to report a content problem, ask a site question, or suggest a practical improvement.">
    <h2>Get in touch</h2>
    <p>Email <a href="mailto:instantinterviewprep@gmail.com">instantinterviewprep@gmail.com</a>. Please include the page URL and do not send passwords, API keys, or other sensitive information.</p>
    <h2>What to report</h2>
    <ul><li>Incorrect technical information or a broken code example</li><li>Outdated guidance or a broken external link</li><li>Typographical or formatting errors</li><li>Suggestions for clearer explanations or useful features</li><li>Questions about account or site functionality</li></ul>
    <h2>Send a correction or suggestion</h2>
    <p>Include the page URL when your message is about a specific question or resource. Messages are stored for site support and editorial follow-up.</p>
    <ContactForm />
  </LegalPage>;
}
