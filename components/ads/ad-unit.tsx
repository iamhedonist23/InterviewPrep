"use client";
import { useEffect, useRef } from "react";

type Props = { slot?: string; format?: "auto" | "rectangle" | "horizontal"; className?: string };
export function AdUnit({ slot, format = "auto", className = "" }: Props) { const ref = useRef<HTMLModElement>(null); const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID); useEffect(() => { if (!enabled || !ref.current || !slot) return; try { ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ??= []).push({}); } catch { /* AdSense may be unavailable; keep the content usable. */ } }, [enabled, slot]); if (!enabled) return null; return <aside className={`my-8 overflow-hidden text-center ${className}`} aria-label="Advertisement"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink/40">Advertisement</p><ins ref={ref} className="adsbygoogle block min-h-[90px]" style={{ display: "block" }} data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID} data-ad-slot={slot} data-ad-format={format} data-full-width-responsive="true" /></aside>; }
export function AdBanner(props: Props) { return <AdUnit {...props} format="horizontal" />; }
export function AdInArticle(props: Props) { return <AdUnit {...props} format="auto" />; }
export function AdSidebar(props: Props) { return <AdUnit {...props} format="rectangle" className="lg:sticky lg:top-6" />; }
export function AdResponsive(props: Props) { return <AdUnit {...props} />; }
