"use client";

import ReactMarkdown from "react-markdown";

export function DetailedAnswer({
  content,
}: {
  content: string;
}) {
  return (
    <div className="prose prose-lg max-w-none text-ink/75
      prose-headings:font-display
      prose-headings:font-bold
      prose-strong:text-ink
      prose-p:leading-8
      prose-li:leading-7
      prose-ul:my-4
      prose-ol:my-4
      prose-code:text-coral
      prose-pre:rounded-xl
      prose-pre:bg-ink
      prose-pre:text-paper">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}