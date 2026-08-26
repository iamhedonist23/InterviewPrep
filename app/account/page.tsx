import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Container } from "@/components/ui/container";
import { LogoutButton } from "@/components/auth/logout-button";
export default async function AccountPage() { const session = await getServerSession(authOptions); if (!session?.user) redirect("/login"); return <section className="py-20"><Container><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Account</p><h1 className="mt-3 font-display text-4xl font-bold">Profile</h1><div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 p-6"><p className="text-sm text-ink/55">Name</p><p className="mt-1 font-semibold">{session.user.name ?? "Not provided"}</p><p className="mt-6 text-sm text-ink/55">Email</p><p className="mt-1 font-semibold">{session.user.email}</p><div className="mt-8 border-t border-ink/10 pt-5"><LogoutButton /></div></div></div></Container></section>; }
