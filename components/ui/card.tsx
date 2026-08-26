import type { ReactNode } from "react";
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`rounded-2xl border border-ink/10 bg-white/70 p-6 ${className}`}>{children}</div>; }
