import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { MockInterviewSetup } from "@/components/mock-interview/mock-interview-setup";

export const metadata: Metadata = {
  title: "Mock interview",
  description: "Run a timed, structured mock interview built from real interview questions, then see where you stood strongest and weakest.",
  alternates: { canonical: "/mock-interview" },
};

export default async function MockInterviewPage() {
  const categories = await prisma.category.findMany({ orderBy: [{ group: "asc" }, { name: "asc" }], select: { id: true, name: true, slug: true } });
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Mock interview</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Run a full mock interview.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/60">
            Pick a role and difficulty, set a time budget, and go through a longer set of questions back to back &mdash; then see a breakdown by interview type and difficulty.
          </p>
          <p className="mt-3 text-sm text-ink/50">
            Scoring uses the same simple self-check as regular practice, not a human or AI interviewer. Sign in to save your results and see them on your dashboard.
          </p>
          <div className="mt-10">
            <MockInterviewSetup categories={categories} />
          </div>
        </div>
      </Container>
    </section>
  );
}
