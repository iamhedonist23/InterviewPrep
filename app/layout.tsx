import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AdsenseScript } from "@/components/ads/adsense-script";
import { PublicBottomAd, PublicSidebarAd, PublicTopAd } from "@/components/ads/public-ad-slot";
import { SessionProvider } from "@/components/providers/session-provider";
import { siteConfig, siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "InterviewPrep | Prepare Smarter", template: "%s | InterviewPrep" },
  description: "Practice interview questions, improve your answers, and prepare for your next job completely free.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "InterviewPrep",
    description: "Prepare smarter. Interview with confidence.",
    type: "website",
    siteName: "InstantInterviewPrep",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Free Interview Practice - InterviewPrep" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewPrep",
    description: "Free interview practice for your next opportunity.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AdsenseScript />
        <SessionProvider>
          <Header />
          <PublicTopAd />
          <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-4 sm:px-6 xl:px-8">
            <main className="app-main min-w-0 flex-1">{children}</main>
            <aside className="hidden w-[220px] shrink-0 xl:block">
              <PublicSidebarAd />
            </aside>
          </div>
          <PublicBottomAd />
          <Footer />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}