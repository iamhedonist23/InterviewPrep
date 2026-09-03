import React from "react";
import ReactMarkdown from "react-markdown";

export function LearnMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-lg mt-4 max-w-none text-ink/70 prose-headings:font-display prose-headings:text-ink prose-p:leading-8 prose-strong:text-ink prose-a:text-coral prose-code:rounded prose-code:bg-ink/5 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:text-ink prose-pre:rounded-xl prose-pre:border prose-pre:border-ink/10 prose-pre:bg-ink/5 prose-pre:p-4 prose-pre:text-ink prose-li:leading-8">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4 leading-8 text-ink/75">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
          a: ({ children, href }) => (
            <a href={href} className="font-semibold text-coral underline-offset-4 hover:underline">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="mb-5 ml-6 list-disc space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="mb-5 ml-6 list-decimal space-y-2">{children}</ol>,
          li: ({ children }) => <li className="pl-1 leading-7 text-ink/75">{children}</li>,
          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-xl border border-ink/10 bg-ink/5 p-4 text-sm leading-6 text-ink">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const isInline = !className;

            if (isInline) {
              return <code className="rounded bg-ink/5 px-1.5 py-0.5 text-sm font-semibold text-coral">{children}</code>;
            }

            return <code className={className}>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
