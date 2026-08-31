import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === "ADMIN") redirect("/admin");

  return (
    <section className="min-h-screen bg-ink py-20">
      <Container>
        <div className="mx-auto max-w-md">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Restricted area</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-paper">Admin sign in</h1>
          <p className="mt-4 text-paper/60">This area is for site administrators only.</p>
          <div className="mt-8 rounded-2xl border border-paper/10 bg-white/5 p-6">
            <AdminLoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
