const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://instantinterviewprep.com";
const canonicalSiteUrl = new URL(configuredSiteUrl);
canonicalSiteUrl.protocol = "https:";
canonicalSiteUrl.hostname = canonicalSiteUrl.hostname.replace(/^www\./i, "");
canonicalSiteUrl.pathname = "";
canonicalSiteUrl.search = "";
canonicalSiteUrl.hash = "";

export const siteUrl = canonicalSiteUrl.origin;

export const siteConfig = {
  name: "InstantInterviewPrep",
  description: "Practice interview questions, improve your answers, and prepare for your next job completely free.",
  url: siteUrl,
};
