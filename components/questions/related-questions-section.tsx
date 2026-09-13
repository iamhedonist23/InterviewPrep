"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { QuestionCard } from "@/components/questions/question-card";

type RelatedQuestionItem = {
  id: string;
  slug: string;
  question: string;
  shortDescription: string;
  difficulty: string;
  category: { name: string };
  relevanceText?: string;
};

export function RelatedQuestionsSection({
  items,
}: {
  items: RelatedQuestionItem[];
}) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const visibleItems = items.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  if (!items.length) {
    return null;
  }

  return (
    <section className="mt-20 rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-3xl font-bold">Related questions</h2>

        {pageCount > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 0))}
              disabled={page === 0}
              aria-label="Previous related questions"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(current + 1, pageCount - 1))}
              disabled={page >= pageCount - 1}
              aria-label="Next related questions"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-coral hover:text-coral disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <QuestionCard
            key={item.id}
            question={item}
            relevanceText={item.relevanceText}
          />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Go to related questions page ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === page ? "bg-coral" : "bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
