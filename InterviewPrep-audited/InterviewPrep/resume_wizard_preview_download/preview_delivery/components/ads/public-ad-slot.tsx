"use client";
import { usePathname } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-unit";

const privatePrefixes = ["/admin", "/dashboard", "/account", "/login", "/register", "/practice", "/resume-builder"];
export function PublicAdSlot() { const pathname = usePathname(); if (privatePrefixes.some(prefix => pathname.startsWith(prefix))) return null; return <AdBanner slot="interviewprep-public-banner" className="mx-auto max-w-5xl px-5" />; }
