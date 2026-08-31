import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type Question = { id: string; slug: string; question: string; shortDescription: string; difficulty: string; category: { name: string } };
export function QuestionCard({ question }: { question: Question }) {
  return <article className="rounded-2xl border border-ink/10 bg-white/70 p-6 transition hover:-translate-y-1 hover:border-coral/50"><div className="flex flex-wrap gap-2"><Badge>{question.category.name}</Badge><span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/60">{question.difficulty}</span></div><h2 className="mt-5 font-display text-xl font-bold leading-tight"><Link href={`/questions/${question.slug}`} className="hover:text-coral">{question.question}</Link></h2><p className="mt-3 line-clamp-2 text-sm leading-6 text-ink/60">{question.shortDescription}</p><Link href={`/questions/${question.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-coral">Read answer guide <ArrowUpRight size={16} /></Link></article>;
}
