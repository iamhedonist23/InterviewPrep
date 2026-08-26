import Link from "next/link";
import type { ReactNode } from "react";

type Props = { children: ReactNode; href?: string; variant?: "primary" | "outline" | "text"; type?: "button" | "submit"; className?: string; onClick?: () => void };
export function Button({ children, href, variant = "primary", type = "button", className = "", onClick }: Props) {
  const styles = { primary: "bg-ink text-paper hover:bg-coral", outline: "border border-ink/20 bg-transparent hover:border-coral hover:text-coral", text: "text-ink hover:text-coral" }[variant];
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${styles} ${className}`;
  return href ? <Link href={href} className={classes}>{children}</Link> : <button type={type} onClick={onClick} className={classes}>{children}</button>;
}
