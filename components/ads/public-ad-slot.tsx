"use client";
import { usePathname } from "next/navigation";
import { AdBanner, AdSidebar } from "@/components/ads/ad-unit";

const privatePrefixes = ["/admin", "/dashboard", "/account", "/login", "/register", "/practice"];

function shouldHideAds(pathname: string) {
  return privatePrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function PublicTopAd() {
  const pathname = usePathname();
  if (shouldHideAds(pathname)) return null;

  return <AdBanner slot="interviewprep-top-banner" className="mx-auto max-w-5xl px-5 pt-4" />;
}

export function PublicSidebarAd() {
  const pathname = usePathname();
  if (shouldHideAds(pathname)) return null;

  return <AdSidebar slot="interviewprep-sidebar" className="mt-4" />;
}

export function PublicBottomAd() {
  const pathname = usePathname();
  if (shouldHideAds(pathname)) return null;

  return <AdBanner slot="interviewprep-bottom-banner" className="mx-auto max-w-5xl px-5 pb-8" />;
}

export function PublicAdSlot() {
  return null;
}
