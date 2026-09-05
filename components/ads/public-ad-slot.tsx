"use client";
import { usePathname } from "next/navigation";
import { AdBanner, AdSidebar } from "@/components/ads/ad-unit";

const noAdPrefixes = [
  "/admin",
  "/dashboard",
  "/account",
  "/login",
  "/register",
  "/practice",
  "/mock-interview",
  "/resume-builder",
  "/about",
  "/contact",
  "/editorial-policy",
  "/faq",
  "/privacy",
  "/cookie-policy",
  "/terms",
  "/disclaimer",
  "/questions",
];

function shouldHideAds(pathname: string) {
  return noAdPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function PublicSidebarAd() {
  const pathname = usePathname();
  if (shouldHideAds(pathname)) return null;

  if (
    pathname !== "/" &&
    !pathname.startsWith("/learn") &&
    !pathname.startsWith("/categories") &&
    !pathname.startsWith("/interview-questions") &&
    !pathname.startsWith("/blog")
  ) return null;

  return <AdSidebar slot="interviewprep-sidebar" className="mt-4" />;
}

export function PublicBottomAd() {
  const pathname = usePathname();
  if (shouldHideAds(pathname)) return null;

  if (
    pathname !== "/" &&
    !pathname.startsWith("/learn") &&
    !pathname.startsWith("/categories") &&
    !pathname.startsWith("/interview-questions") &&
    !pathname.startsWith("/blog")
  ) return null;

  return <AdBanner slot="interviewprep-bottom-banner" className="mx-auto max-w-5xl px-5 pb-8" />;
}

export function PublicAdSlot() {
  return null;
}
