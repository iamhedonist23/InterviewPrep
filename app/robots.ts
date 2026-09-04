import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin", "/dashboard", "/api/", "/account", "/resume-builder", "/login", "/register", "/onboarding", "/daily-challenge", "/progress"],
		},
		sitemap: `${base}/sitemap.xml`,
	};
}
