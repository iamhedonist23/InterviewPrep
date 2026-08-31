import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/lib/user-profile";
import { Container } from "@/components/ui/container";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export const metadata: Metadata = { title: "Set up your profile", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/onboarding");

  const profile = await getUserProfile(session.user.id);
  if (profile?.onboardingCompleted) redirect("/dashboard");

  return (
    <section className="py-16">
      <Container className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Quick setup</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Let&apos;s personalize your prep</h1>
        <p className="mt-3 text-ink/60">Takes under a minute. You can change this later from your dashboard.</p>
        <OnboardingForm />
      </Container>
    </section>
  );
}
