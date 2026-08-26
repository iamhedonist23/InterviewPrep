import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) { return <section className="py-16 sm:py-20"><Container><article className="prose prose-lg prose-ink mx-auto max-w-3xl prose-headings:font-display prose-headings:tracking-tight"><p className="not-prose text-xs font-bold uppercase tracking-[.18em] text-coral">InterviewPrep</p><h1>{title}</h1><p className="lead">{intro}</p>{children}</article></Container></section>; }
