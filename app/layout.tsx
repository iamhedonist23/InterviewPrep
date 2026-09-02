import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AdsenseScript } from "@/components/ads/adsense-script";
import { PublicBottomAd, PublicSidebarAd, PublicTopAd } from "@/components/ads/public-ad-slot";
import { SessionProvider } from "@/components/providers/session-provider";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "InterviewPrep | Prepare Smarter", template: "%s | InterviewPrep" },
  description: "Practice interview questions, improve your answers, and prepare for your next job completely free.",
  openGraph: { title: "InterviewPrep", description: "Prepare smarter. Interview with confidence.", type: "website" },
  twitter: { card: "summary_large_image", title: "InterviewPrep", description: "Free interview practice for your next opportunity." },
  robots: { index: true, follow: true },
};

const structuredData = [
  { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, description: siteConfig.description, url: siteConfig.url },
  { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AdsenseScript />
        <SessionProvider>
          <Header />
          <PublicTopAd />
          <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-4 sm:px-6 xl:px-8">
            <main className="min-w-0 flex-1">{children}</main>
            <aside className="hidden w-[220px] shrink-0 xl:block">
              <PublicSidebarAd />
            </aside>
          </div>
          <PublicBottomAd />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}