import Link from "next/link";
import { QuestionGenerator } from "@/components/admin/question-generator";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
export const dynamic = "force-dynamic";
export default async function GeneratePage() { await requireAdmin(); const categories = await prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }); return <section className="py-16"><Container><Link href="/admin/questions" className="text-sm font-bold text-ink/55">← Questions</Link><h1 className="mt-6 font-display text-4xl font-bold">AI question drafts</h1><p className="mt-3 max-w-2xl text-ink/60">Generate reviewable drafts for admin content creation. Nothing is published automatically.</p><div className="mt-8"><QuestionGenerator categories={categories} /></div><p className="mt-6 text-sm text-ink/50">AI is disabled unless `AI_ENABLED=true` and a server-side `AI_API_KEY` are configured.</p></Container></section>; }
