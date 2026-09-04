import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
	const base = siteUrl.replace(/\/+$/, "");

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin", "/dashboard", "/api/", "/account", "/resume-builder", "/login", "/register", "/onboarding", "/daily-challenge", "/progress"],
		},
		sitemap: `${base}/sitemap.xml`,
	};
}
