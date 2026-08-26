import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { QuestionCard } from "@/components/questions/question-card";
export const dynamic = "force-dynamic";
export default async function SavedPage() { const session = await getServerSession(authOptions); if (!session?.user?.id) redirect("/login"); const saved = await prisma.savedQuestion.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, include: { question: { include: { category: true, subcategory: true } } } }); return <section className="py-16"><Container><p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your library</p><h1 className="mt-3 font-display text-4xl font-bold">Saved questions</h1><p className="mt-3 text-ink/60">Keep the questions you want to revisit close by.</p>{saved.length ? <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{saved.map(item => <QuestionCard key={item.id} question={item.question} />)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-ink/20 p-12 text-center"><p className="text-ink/60">You have not saved any questions yet.</p><a href="/interview-questions" className="mt-5 inline-block rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper">Browse questions</a></div>}</Container></section>; }
