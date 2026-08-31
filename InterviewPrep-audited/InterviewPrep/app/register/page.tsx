import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Container } from "@/components/ui/container";
export default function RegisterPage() { return <section className="py-20"><Container><div className="mx-auto max-w-md"><p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Free account</p><h1 className="mt-3 font-display text-4xl font-bold">Make practice yours</h1><p className="mt-4 text-ink/60">Save useful questions and pick up where you left off.</p><div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 p-6"><RegisterForm /></div><p className="mt-6 text-center text-sm text-ink/60">Already have an account? <Link href="/login" className="font-bold text-coral">Log in</Link></p></div></Container></section>; }
