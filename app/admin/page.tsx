import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  const [questions, categories, articles, faqs, users, contacts, studyCategories, studyTopics] = await Promise.all([
    prisma.interviewQuestion.count(),
    prisma.category.count(),
    prisma.article.count(),
    prisma.fAQ.count(),
    prisma.user.count(),
    prisma.contactMessage.count(),
    prisma.studyCategory.count(),
    prisma.studyTopic.count(),
  ]);

const cards: Array<[label: string, count: number, href: string]> = [
  ["Interview Questions", questions, "/admin/questions"],
  ["Question Categories", categories, "/admin/categories"],
  ["Study Topics", studyTopics, "/admin/study/topics"],
  ["Learning Categories", studyCategories, "/admin/study/categories"],
  ["Articles", articles, "/admin/articles"],
  ["FAQs", faqs, "/admin/faqs"],
  ["Users", users, "/admin/users"],
  ["Contact messages", contacts, "/admin/contacts"],
];

  return (
    <section className="py-16">
      <Container>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Restricted workspace</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Admin dashboard</h1>
        <p className="mt-3 text-ink/60">Manage the content and accounts behind InstantInterviewPrep.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/questions/import" className="rounded-full bg-coral px-5 py-3 text-sm font-bold text-white">
            Upload CSV / Excel
          </Link>
          <Link href="/admin/questions/generate" className="rounded-full border border-ink/15 px-5 py-3 text-sm font-bold">
            Generate AI drafts
          </Link>
          <Link href="/admin/study/topics/new" className="rounded-full border border-coral px-5 py-3 text-sm font-bold text-coral">
            Create study topic
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([label, count, href]) => (
            <Link
              href={href}
              className="rounded-2xl border border-ink/10 bg-white/70 p-6 hover:border-coral"
              key={label}
            >
              <p className="text-sm text-ink/55">{label}</p>
              <p className="mt-3 font-display text-4xl font-bold">{count}</p>
              <p className="mt-5 text-sm font-bold text-coral">Manage {label} →</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
