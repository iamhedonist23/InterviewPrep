"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AnswerSectionProps {
  sampleAnswer: string;
  detailedAnswer?: string | null;
}

export function AnswerSection({
  sampleAnswer,
  detailedAnswer,
}: AnswerSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const answerToShow = detailedAnswer?.trim() || sampleAnswer;

  return (
    <div className="rounded-2xl bg-mint/60 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-bold sm:text-2xl">
          Sample answer
        </h2>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 rounded-lg bg-mint/40 px-4 py-2 text-sm font-bold text-ink transition hover:bg-mint/60"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Hide Answer" : "Show Answer"}

          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="text-base leading-8 text-ink/75">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 mt-6 text-2xl font-bold text-ink first:mt-0">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-3 mt-6 text-xl font-bold text-ink">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-3 mt-5 text-lg font-bold text-ink">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-4 leading-8 text-ink/75">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-5 ml-6 list-disc space-y-2">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-5 ml-6 list-decimal space-y-2">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="pl-1 leading-7 text-ink/75">
                    {children}
                  </li>
                ),

                strong: ({ children }) => (
                  <strong className="font-bold text-ink">
                    {children}
                  </strong>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-5 border-l-4 border-coral pl-4 italic text-ink/70">
                    {children}
                  </blockquote>
                ),

                pre: ({ children }) => (
                  <pre className="my-5 overflow-x-auto rounded-xl bg-ink p-4 text-sm leading-6 text-paper">
                    {children}
                  </pre>
                ),

                code: ({ children, className }) => {
                  const isInline = !className;

                  if (isInline) {
                    return (
                      <code className="rounded bg-ink/10 px-1.5 py-0.5 text-sm font-semibold text-coral">
                        {children}
                      </code>
                    );
                  }

                  return <code className={className}>{children}</code>;
                },
              }}
            >
              {answerToShow}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {!isExpanded && (
        <p className="mt-4 text-sm italic text-ink/60">
          Click "Show Answer" to reveal the detailed interview answer.
        </p>
      )}
    </div>
  );
}