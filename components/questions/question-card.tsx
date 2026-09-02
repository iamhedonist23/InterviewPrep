import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type Question = { id: string; slug: string; question: string; shortDescription: string; difficulty: string; category: { name: string } };
export function QuestionCard({ question }: { question: Question }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white/70 p-6 transition duration-200 hover:-translate-y-1 hover:border-coral/50 hover:shadow-sm">
      <div className="flex flex-wrap gap-2">
        <Badge>{question.category.name}</Badge>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink/60">
          {question.difficulty}
        </span>
      </div>

      <h2 className="mt-5 text-base font-semibold leading-relaxed text-ink sm:text-lg">
        <Link href={`/questions/${question.slug}`} className="block transition-colors hover:text-coral line-clamp-3">
          {question.question}
        </Link>
      </h2>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/60">{question.shortDescription}</p>

      <Link href={`/questions/${question.slug}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-coral">
        Read answer guide <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
