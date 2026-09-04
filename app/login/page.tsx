import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/ui/container";
export const metadata: Metadata = { title: "Log in", robots: { index: false, follow: false } };
export default function LoginPage() { return <section className="py-20"><Container><div className="mx-auto max-w-md"><p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your preparation space</p><h1 className="mt-3 font-display text-4xl font-bold">Welcome back</h1><p className="mt-4 text-ink/60">Sign in to keep your saved questions and practice history together.</p><div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 p-6"><LoginForm /></div><p className="mt-6 text-center text-sm text-ink/60">New here? <Link href="/register" className="font-bold text-coral">Create a free account</Link></p></div></Container></section>; }
