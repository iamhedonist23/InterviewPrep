import Script from "next/script";

export function AdsenseScript() {
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);
  if (!enabled) return null;
  return <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`} crossOrigin="anonymous" />;
}
