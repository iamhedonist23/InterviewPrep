import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/ui/container";
import { DailyChallengeFlow } from "@/components/daily-challenge/daily-challenge-flow";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Daily challenge", robots: { index: false, follow: false } };

export default async function DailyChallengePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/daily-challenge");

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Today&apos;s challenge</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Daily challenge</h1>
        <p className="mt-3 text-ink/60">Three questions, once a day. Come back tomorrow for a fresh set.</p>
        <div className="mt-10">
          <DailyChallengeFlow />
        </div>
      </Container>
    </section>
  );
}
