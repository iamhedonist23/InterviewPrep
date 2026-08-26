import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AdsenseScript } from "@/components/ads/adsense-script";
import { PublicAdSlot } from "@/components/ads/public-ad-slot";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "InterviewPrep | Prepare Smarter", template: "%s | InterviewPrep" },
  description: "Practice interview questions, improve your answers, and prepare for your next job completely free.",
  openGraph: { title: "InterviewPrep", description: "Prepare smarter. Interview with confidence.", type: "website" },
  twitter: { card: "summary_large_image", title: "InterviewPrep", description: "Free interview practice for your next opportunity." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body suppressHydrationWarning><AdsenseScript /><Header /><main>{children}</main><PublicAdSlot /><Footer /></body></html>;
}
