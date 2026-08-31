# Production Audit — InterviewPrep

Audit date: 2026-08-28

## 1. Overall status

**READY WITH WARNINGS — contingent on completing the items marked "Needs
live verification" below.** This audit was done against a real checkout of
the repo (dependencies installed, a real local Postgres instance stood up,
lint/typecheck/unit tests actually executed), but a **sandbox network
restriction blocked `prisma generate`/`migrate deploy`** (see §14), which in
turn blocks a real `next build`, `next start`, and any live database
read/write. Every claim in this report is either (a) something I directly
executed and observed, or (b) explicitly marked as unverified. Nothing here
is fabricated traffic, indexing, deployment, or test output.

## 2. Features audited (static/code review)

Public: homepage, question listing, category pages, question detail pages,
search, practice setup/session, blog listing/detail, FAQ, about, contact,
legal pages (privacy, terms, disclaimer, cookie policy), resume builder
(editor, preview, PDF export).
Auth: registration, login (credentials + Google OAuth wiring), logout,
session handling.
User: dashboard, saved questions, resume CRUD, account page.
Admin: question CRUD, bulk publish/unpublish/delete, CSV/XLSX import,
template download, question export, AI question generation + draft
review/publish workflow.
Infra: sitemap, robots.txt, structured data, AdSense components, cron
cleanup job.

## 3. Features passing (verified via code + available tooling)

- Admin authorization is enforced server-side on every one of the 15 API
  routes under `app/api/admin/**` and `app/api/**` generally — confirmed by
  reading every route handler, not by inspecting the UI.
- Resume and saved-question ownership is enforced at the query level
  (`{ id, userId }`), preventing IDOR.
- AI question generation is admin-only, rate-limited, Zod-validated, and
  strictly draft-first (never auto-publishes).
- Resume PDF export correctly excludes the header, footer, and all ad slots
  via a `@media print` rule matched to the actual component tags — verified
  by tracing the CSS selector to the rendered elements.
- No hardcoded secrets anywhere in tracked source; `.env*` properly
  gitignored with no history leak.
- `eslint .` — 0 errors, 5 pre-existing warnings (all `<a>` vs `<Link>`).
- `npm audit` — 10 findings, all confined to dev-only tooling, none in the
  production runtime bundle.
- `vitest run` — 128 of 140 tests pass. The 12 failures are all in
  `tests/question-import.test.ts` and are traced to `Object.values(undefined)`
  on Prisma enums that don't exist until `prisma generate` succeeds — an
  environment artifact, not a demonstrated app bug (see §14).

## 4. Bugs found and fixed this session

1. Sitemap was fully static and omitted every question, category, and
   article page → rewritten to pull live, published content from the DB.
2. `robots.txt` didn't disallow `/account`, `/resume-builder`, `/login`,
   `/register` → added.
3. `/interview-questions` and `/search` passed unvalidated URL query values
   straight into Prisma enum filters, risking a crash on malformed input →
   added the same runtime allow-list guard already used correctly in
   `/api/practice/questions`.
4. About, Contact, Privacy, Terms, and Disclaimer pages had no per-page
   `<title>`/description, silently duplicating the homepage's metadata →
   added accurate metadata built from each page's own existing copy.
5. No site-wide `WebSite`/`Organization` structured data, and question/
   category pages lacked `BreadcrumbList` structured data that blog/FAQ
   pages already had → added, using the existing `siteConfig` constant and
   matching the established pattern.

Full detail and severity ratings for each: see `docs/SECURITY-AUDIT.md` and
`docs/SEO-AUDIT.md`.

## 5. Remaining issues (not fixed this session, by design)

- **In-memory rate limiting** won't reliably survive multi-instance/cold-start
  serverless deployment on Vercel. Needs a durable store (Redis/Vercel KV)
  before it can be trusted for abuse prevention — this is an infrastructure
  decision, not a one-line fix, so it wasn't made unilaterally.
- **Duplicate delivery folders** (`section_editors_delivery/`,
  `resume_wizard_preview_download/`) are confirmed-stale, already-superseded
  drafts (120KB + 80KB of dead code) — recommend deleting, left in place
  since you asked for comparison only, not deletion.
- **JSON-LD injection** doesn't escape `<` in `dangerouslySetInnerHTML` —
  low-risk (admin-only content today) but cheap to harden with a shared
  `safeJsonLd()` helper.
- **`POST /api/register`** returns a generic 500 instead of 409 under a rare
  concurrent-duplicate-email race — cosmetic.
- **Repo hygiene**: 14 `phase*.txt`/`pending.txt` build-prompt scratch files
  and two large CSV data files (784KB, 592KB) are committed at the repo
  root. Not a functional bug, but worth moving out of git before a public
  launch.

## 6. Security status

No critical or high-severity *exploitable* issues found in the code paths I
could review (auth, authorization, ownership checks, secret handling, AI
generation, XSS surface). See `docs/SECURITY-AUDIT.md` for the full table.
CSRF behavior, session cookie flags, and SQL-level query execution against
real data still need to be checked on a live deployment — I did not have a
way to observe these directly.

## 7. SEO status

Was **not launch-ready at audit start** — a fully static sitemap would have
kept ~800 content pages out of Google's crawl path entirely, and five
important pages (including all legal pages) had duplicate metadata. Both are
now fixed. Structured data coverage extended to match the site's existing
pattern. See `docs/SEO-AUDIT.md`.

## 8. Database status

Schema, relations, and query patterns were reviewed by reading
`prisma/schema.prisma` and every `services/*.ts` file — enum-scoped fields,
required foreign keys with `categoryId`, unique constraints on `slug`
fields, and `isPublished` gating all look structurally correct. **Could not
be exercised against a live database** in this sandbox — run
`npx prisma migrate deploy` (never `migrate reset` against production) and
`npx prisma db seed` on a machine with normal internet access, then verify
CRUD, transactions, and cascade behavior directly.

## 9. AdSense readiness

Implementation looks correct on inspection: publisher ID and enable flag
both come from environment variables (never hardcoded), ads are disabled by
default, explicitly excluded from admin/dashboard/account/login/register/
practice/resume-builder routes, labeled "Advertisement," and the resume PDF
export path is confirmed ad-free via print CSS. **Actual AdSense approval
cannot be verified, predicted, or fabricated** — that depends on Google's
review of the live, deployed site with real content and traffic.

## 10. Performance status

Not independently measured (no live build to profile in this sandbox).
Code-level review found consistent pagination patterns (`PAGE_SIZE`,
`SEARCH_PAGE_SIZE` constants in `services/questions.ts`) and no obvious N+1
query patterns in the list/detail service functions reviewed — but this
needs confirmation with real query logs against a populated database.

## 11. Testing status

- `npm install` — succeeded.
- `eslint .` — 0 errors, 5 pre-existing warnings.
- `tsc --noEmit` — clean aside from errors traced to the missing generated
  Prisma client (resolves once `prisma generate` succeeds elsewhere).
- `vitest run` — 128/140 passing; the 12 failures are the same Prisma-client
  artifact, not a newly discovered defect.
- `next build` / `next start` — **could not run** (blocked by §14).
- Manual browser QA (mobile breakpoints, click-through flows, screen reader
  behavior) — **not performed**; this sandbox has no browser. Needs a
  manual pass per Parts 6, 9–13, 30–31 of the original brief.

## 12. Deployment checklist

- [ ] Run `prisma generate` and `prisma migrate deploy` against the real
      production database from an environment with normal network access.
- [ ] Run `npm run build` and `npm run start` and confirm a clean production
      boot.
- [ ] Set all required env vars from `.env.example` in the hosting
      provider's dashboard (never commit `.env`).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real production domain (sitemap and
      robots.txt both read from it — no localhost URLs in production).
- [ ] Provision a durable rate-limit store before relying on abuse
      protection at scale.
- [ ] Delete (or explicitly archive outside the repo) the two stale delivery
      folders and the `phase*.txt`/`pending.txt` scratch files.
- [ ] Submit `/sitemap.xml` to Google Search Console after deploy.
- [ ] Do a manual mobile/responsive and keyboard-navigation pass across the
      breakpoints and flows listed in Parts 30–31 of the original brief.
- [ ] Apply for AdSense only after the above are live and the site has real,
      indexed content.

## 13. Exact commands used for verification

```
git clone https://github.com/iamhedonist23/InterviewPrep.git
apt-get install -y postgresql postgresql-contrib
service postgresql start
npm install
npx eslint .
npx tsc --noEmit
npx vitest run
npx prisma generate            # failed — see §14
npx prisma migrate deploy      # failed — see §14
```

## 14. Environment limitation (why some parts are unverified, not fabricated)

Prisma 6.7 downloads its query-engine binary from `binaries.prisma.sh` at
`generate`/`migrate` time. That domain is not on this sandbox's network
allowlist, so every command that needs a generated Prisma client
(`prisma generate`, `prisma migrate deploy`, `next build`, `next start`, and
any live DB read/write) returned a 403 and could not complete. This is a
sandbox limitation, not a defect in the project — on a normal machine or CI
runner with standard internet access, this step should succeed without
changes. Everything gated on it is marked "Needs live verification" above
rather than reported as passing.

## 15. Final recommendation

**READY WITH WARNINGS.**

Not "READY" outright, because the build itself was never actually executed
in this audit and manual browser/device QA was not performed — both are
required by the brief's own gating criteria and I won't claim a passing
build or passing manual QA I didn't observe. Not "NOT READY" either: no
critical, unresolved security or architectural defect was found in the code
that was reviewed, admin/auth/ownership authorization is sound, monetization
is correctly free-only, and every confirmed bug found this session was
fixed in place using the app's own existing patterns. Complete the
deployment checklist in §12 — starting with a real `prisma generate` +
`next build` on a machine with normal network access — before treating this
as launch-ready.
