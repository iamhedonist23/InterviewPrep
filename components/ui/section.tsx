import type { ReactNode } from "react";
import { Container } from "./container";
export function Section({ eyebrow, title, children, className = "" }: { eyebrow?: string; title: string; children: ReactNode; className?: string }) { return <section className={`py-16 sm:py-20 ${className}`}><Container>{eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">{eyebrow}</p>}<h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2><div className="mt-8">{children}</div></Container></section>; }
