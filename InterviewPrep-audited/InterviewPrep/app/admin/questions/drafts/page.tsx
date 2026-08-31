import Link from "next/link";
import { DraftActions } from "@/components/admin/draft-actions";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
export const dynamic = "force-dynamic";
export default async function DraftsPage() { await requireAdmin(); const drafts = await prisma.aiQuestionDraft.findMany({ where: { isPublished: false }, orderBy: { createdAt: "desc" }, take: 100 }); return <section className="py-16"><Container><Link href="/admin/questions" className="text-sm font-bold text-ink/55">← Questions</Link><h1 className="mt-6 font-display text-4xl font-bold">AI draft review</h1><p className="mt-3 text-warning">AI-generated content must be reviewed before publishing.</p><div className="mt-8 grid gap-4">{drafts.length ? drafts.map(draft => <article className="rounded-2xl border border-ink/10 bg-white/70 p-6" key={draft.id}><h2 className="font-display text-xl font-bold">{draft.question}</h2><p className="mt-3 text-sm leading-6 text-ink/60">{draft.shortDescription}</p><p className="mt-4 text-sm leading-6">{draft.explanation}</p><DraftActions id={draft.id} /></article>) : <div className="rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/55">No unpublished AI drafts.</div>}</div></Container></section>; }
