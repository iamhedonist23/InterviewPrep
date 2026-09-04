import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() { return <div className="grid min-h-[55vh] place-items-center px-5 text-center"><div><p className="text-sm font-bold uppercase tracking-widest text-coral">404</p><h1 className="mt-3 font-display text-4xl font-bold">This page took a wrong turn.</h1><p className="mt-3 text-ink/60">The page you are looking for does not exist.</p><Link className="mt-6 inline-block rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper" href="/">Back home</Link></div></div>; }
