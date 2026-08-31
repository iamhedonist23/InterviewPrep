# Security Audit — InterviewPrep

Audit date: 2026-08-28
Method: static code review of every API route, auth/authorization helper, and
data-access path, plus `npm audit`, `eslint`, `tsc --noEmit`, and `vitest`
run against a real local install. Live DB/migration testing was **not**
possible in the audit sandbox (see "Environment limitation" below) — items
marked "Needs live verification" should be re-checked after a real
`prisma generate`/`migrate deploy` and a manual pass against a running app.

## Environment limitation

Prisma 6.7's query-engine binaries are fetched from `binaries.prisma.sh` at
`generate`/`migrate` time. That domain was not reachable from the audit
sandbox's network allowlist, so `prisma generate`, `prisma migrate deploy`,
`next build`, and any live database read/write could not be executed here.
Everything below that depends on a running database is marked accordingly.
Typecheck output during the audit included several `Difficulty` /
`ExperienceLevel` / `InterviewType` / `Prisma.JsonValue` "not exported"
errors — these are artifacts of the missing generated client, not real bugs,
and should disappear once `prisma generate` succeeds on a machine with
network access.

## Findings

| # | Issue | Severity | Location | Status |
|---|---|---|---|---|
| 1 | `/interview-questions` and `/search` cast raw URL query params to Prisma enum types (`as ExperienceLevel`) with no runtime check, unlike `/api/practice/questions` which already validates. An invalid value (`?difficulty=xyz`) reaches Prisma's `where` clause, which throws a `PrismaClientValidationError` at render time, surfacing the generic error boundary instead of a graceful result. | Medium | `services/questions.ts`, `app/interview-questions/page.tsx`, `app/search/page.tsx` | **Fixed** — added a shared `validEnumFilters()` guard using the same allow-list pattern already used in the practice API route. |
| 2 | In-memory rate limiting (`lib/request-security.ts`) stores counters in a module-level `Map`. This project targets Vercel (`vercel.json` has a cron config). Serverless function instances are not guaranteed to be warm/shared across requests, so rate limits can be silently bypassed once traffic is spread across multiple instances or after a cold start. | Medium | `lib/request-security.ts` | **Not fixed** — recommend a durable store (Upstash Redis, Vercel KV, or a DB-backed counter) before relying on this for abuse prevention in production. Left in place because swapping it changes the architecture and needs a decision on which backing store to provision. |
| 3 | Two duplicate/superseded code trees exist alongside the live app: `section_editors_delivery/` and `resume_wizard_preview_download/preview_delivery/`. Every file that differs from the live `app/`/`lib/`/`components/` tree is an **earlier, less complete** version (confirmed by diff — e.g. `section_editors_delivery/lib/resume.ts` lacks the null-vs-undefined handling the live `lib/resume.ts` has). They aren't wired into routing or the Vitest glob, but `tsc --noEmit` does scan them, adding noise to the typecheck output. | Low | `section_editors_delivery/`, `resume_wizard_preview_download/` | **Not fixed** (compare-only per instruction) — recommend deleting both once confirmed unneeded. |
| 4 | JSON-LD blocks are injected via `dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}` in five places (layout, blog, FAQ, category, question pages). `JSON.stringify` does not escape `<`, so if any admin-entered title/question/category text ever contained the literal sequence `</script>`, it would prematurely close the script tag. All inputs are currently admin-authored content behind `requireAdminApi()`, so this is not exploitable by a public user today, but it's cheap, standard hardening to escape `<` as `\u003c` before injecting. | Low | `app/layout.tsx`, `app/blog/[slug]/page.tsx`, `app/faq/page.tsx`, `app/interview-questions/[category]/page.tsx`, `app/questions/[slug]/page.tsx` | **Not fixed** — recommend adding a small `safeJsonLd()` helper and using it everywhere JSON-LD is emitted. |
| 5 | `POST /api/register` has a narrow race: two concurrent signups with the same email can both pass the `findUnique` uniqueness pre-check before either `create` completes; the second `create` throws a Prisma unique-constraint error, which the route's generic `catch` turns into a `500` ("Unable to create your account right now") instead of the correct `409` ("account already exists"). Not a security hole — DB uniqueness is still enforced — just an imprecise status code under a race. | Low | `app/api/register/route.ts` | Not fixed — cosmetic, low priority. |

## What was verified and passed

- **Admin authorization**: every route under `app/api/admin/**` calls `requireAdminApi()` before touching the database (`app/api/admin/[resource]/route.ts`, `.../questions/bulk`, `.../questions/drafts/[id]`, `.../questions/export`, `.../questions/generate`, `.../questions/import`, `.../questions/template`). Authorization is enforced server-side, not just by hiding UI.
- **IDOR / ownership**: resume and saved-question routes scope every query by `{ id, userId }` (`lib/resume.ts` `getOwnedResume`, `app/api/saved-questions/route.ts`), so one user cannot read, edit, or delete another user's data via a guessed ID.
- **Practice-session tampering**: `POST /api/practice/session` re-validates that every submitted `questionId` corresponds to a real, published question before writing a session, preventing fabricated question IDs or unpublished-content leakage into a saved score.
- **Cron endpoint**: `/api/cron/cleanup-resumes` requires an exact `Authorization: Bearer <CRON_SECRET>` match and fails closed (500) if `CRON_SECRET` isn't configured, rather than silently allowing unauthenticated calls.
- **Password handling**: bcrypt with cost factor 12, disabled-account and null-hash checks in the credentials provider, all registration/login errors are generic and don't leak whether an email exists (registration does 409 on duplicate, which is intentional and industry-standard for this trade-off).
- **AI generation (Parts 17–18)**: admin-only, rate-limited (3 requests / 15 min), only ever called server-side, response is Zod-validated, results are written as `AiQuestionDraft` rows and require an explicit `publish` action to become a real, live `InterviewQuestion` — never auto-published. No API key is referenced in any client component.
- **Secrets**: no hardcoded API keys, DB passwords, or OAuth secrets found anywhere in the tracked source. `.env`, `.env.local`, `.env.*.local` are all gitignored; `git log --all -- .env` shows no history of a committed env file.
- **XSS**: the one place user/admin-authored rich text is rendered (`components/blog/article-content.tsx`) uses plain JSX interpolation, not `dangerouslySetInnerHTML`, so it's auto-escaped by React.
- **`npm audit`**: 10 known vulnerabilities, all in **dev-only tooling** (`vitest`, `vite`, `esbuild`, `tsx`, `postcss`'s dependents via the dev toolchain) — none are in a package that ships to the production runtime bundle. Still worth a `npm audit fix` pass before shipping, but none are exploitable in production as deployed.
- **Lint**: `eslint .` reports 0 errors, 5 warnings (all `<a>` vs `<Link>` navigation warnings, a performance/prefetch nit, not a security issue).

## Needs live verification (blocked by sandbox network access)

- CSRF behavior of NextAuth's built-in protections against the deployed origin.
- Actual SQL-level behavior of Prisma queries against a populated database (structurally reviewed and believed correct, but not executed).
- Session cookie flags (`Secure`, `HttpOnly`, `SameSite`) as actually set by NextAuth in this app's configuration — verify in browser dev tools against a deployed HTTPS origin.
- Full CSV/XLSX import path exercised end-to-end with real files.
