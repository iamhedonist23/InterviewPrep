# SEO Audit — InterviewPrep

Audit date: 2026-08-28
Method: static review of `app/sitemap.ts`, `app/robots.ts`, every public
page's `metadata`/`generateMetadata`, and all JSON-LD emission. Could not
verify actual Google indexing, crawl behavior, or rendered `<head>` output in
a browser (no live build in this sandbox — see SECURITY-AUDIT.md's
"Environment limitation"). Findings below are from reading the code that
produces these outputs, not from observing them rendered.

## Findings

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | **Sitemap was fully static** — `app/sitemap.ts` returned only 7 hardcoded paths (home, interview-questions, practice, blog, about, contact, faq). None of the ~800 individual question pages, category pages, or article pages were included, meaning Google had no crawl path to most of the site's actual content beyond internal links. | Critical | **Fixed** — sitemap now queries `Category`, published `InterviewQuestion`, and published `Article` and includes each real URL with its `updatedAt` as `lastModified`. At current content volume (~800 questions) this comfortably fits in a single sitemap file well under the 50,000-URL limit. |
| 2 | `robots.txt` disallowed `/admin`, `/dashboard`, `/api/` but not `/account`, `/resume-builder`, `/login`, `/register` — all of which are authenticated/private routes that shouldn't be crawled. | Medium | **Fixed** — added all four to the disallow list. |
| 3 | No site-wide `WebSite`/`Organization` structured data existed anywhere (not even in the root layout). | Medium | **Fixed** — added both to `app/layout.tsx`, sourced from the existing `siteConfig` constant (no invented data). |
| 4 | Individual question pages and category pages had no `BreadcrumbList` JSON-LD, even though they render a visible breadcrumb nav and the blog/FAQ pages already had this pattern. | Medium | **Fixed** — added matching `BreadcrumbList` structured data to `app/questions/[slug]/page.tsx` and `app/interview-questions/[category]/page.tsx`, using the same shape already used on `app/blog/[slug]/page.tsx`. |
| 5 | About, Contact, Privacy, Terms, and Disclaimer pages exported no `metadata` at all, so each silently inherited the homepage's generic title/description via the layout's `template: "%s | InterviewPrep"` — i.e. duplicate titles/descriptions across five important pages, including all four legal pages a human or AdSense reviewer is likely to check first. | High | **Fixed** — added accurate, unique `title`/`description` to all five, built from each page's own existing copy (no fabricated content). |
| 6 | JSON-LD is injected with `JSON.stringify(...)` directly into `dangerouslySetInnerHTML`, with no escaping of `<`. Not an SEO defect per se, but a malformed `</script>` sequence in admin-entered content could corrupt the structured data block and take the whole page's SEO markup down with it. | Low | Not fixed — see SECURITY-AUDIT.md finding #4 for the recommended `safeJsonLd()` fix. |

## What was verified and passed

- **Canonical URLs**: question and category pages set `alternates: { canonical }`; the search page explicitly notes it intentionally has no canonical override reasoning documented in its comment (search results are query-driven — correct to leave un-canonicalized or point at itself, standard practice).
- **OpenGraph/Twitter**: set at the root layout level and per-article/per-question where relevant (`app/blog/[slug]/page.tsx`, `app/questions/[slug]/page.tsx`).
- **404 handling**: `notFound()` is called for unknown question slugs, category slugs, and article slugs, rendering the app's `not-found.tsx` rather than leaking a database error or a blank page.
- **`Article` structured data**: present and correctly populated on blog posts (headline, description, dates, author) — not fabricated (author falls back to "InterviewPrep team" only when `article.author` is null, never invents a name).
- **`FAQPage` structured data**: present on `/faq`, guarded so it's only emitted when real FAQ content exists (`{structuredData && ...}`) — no fake FAQ content risk.
- **Internal linking**: question pages link to their category, to `/practice`, and to related questions; category pages link to subcategories, related categories, related articles, and back to the listing; articles link to related questions and related articles. No orphaned public content type was found in the linking graph during review.
- **`isPublished` gating**: sitemap, listing pages, category pages, and search all filter on `isPublished: true` for questions and articles — draft content cannot leak into public/crawlable surfaces.
- **No fake content**: no Lorem ipsum, fake testimonials, fake review counts, or fake ratings were found anywhere in the reviewed templates.

## Needs live/manual verification

- Actual rendered `<head>` output per page (confirm no duplicate `<title>` tags slip through at the framework level) — requires a real `next build`/`next start`.
- Google Search Console indexing status, crawl stats, and any manual actions — cannot be fabricated or checked without a live, deployed, previously-submitted property.
- Core Web Vitals / Lighthouse scores — requires a rendered page to measure against, not available in this sandbox.
- Duplicate-content check across the ~800 question rows for near-identical wording (the task brief for question content review requires DB access to run; see PRODUCTION-AUDIT.md).
