# InterviewPrep

A free interview preparation platform built with Next.js, TypeScript, Tailwind CSS, and the App Router.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Keep secrets only in local environment files or your deployment provider. Public questions, resources, and basic practice remain free.

## Commands

- `npm run dev` starts local development.
- `npm run typecheck` runs TypeScript validation.
- `npm run lint` checks the project with ESLint.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run format` formats project files with Prettier.
- `npm run db:validate` validates the Prisma schema.
- `npm run db:migrate` creates a development migration.
- `npm run db:seed` seeds the categories, 300 questions, and 10 articles.

## Production

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain, install dependencies with `npm ci`, then run `npm run typecheck`, `npm run lint`, and `npm run build`. For production databases, use `npx prisma migrate deploy`; never reset a production database. Development is for local iteration, staging mirrors production with test data, and production contains live users and must use reviewed migrations.

## Environment

Copy `.env.example` to `.env.local`. Configure `DATABASE_URL`, `AUTH_SECRET`/`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and Google OAuth variables for accounts. Set `ADMIN_EMAIL` only when promoting an existing account, then run the seed command. Keep `AI_ENABLED=false` unless a server-side `AI_API_KEY` and `AI_MODEL` are configured. Ads require both `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and `NEXT_PUBLIC_ADSENSE_ENABLED=true`; they are disabled by default.

## Admin question workflows

An administrator uses `/admin/questions/import` to upload CSV or XLSX files. The importer accepts the documented columns shown on the page, limits files to 5 MB and 2,000 rows, validates every row before writing, and defaults to skipping duplicate slugs. The preview must be reviewed before importing valid rows. For 100, 500, or 1,000 questions, split larger files into reviewed batches rather than sending unlimited data in one request. Imported questions are drafts unless `isPublished` is explicitly true, and publishing remains an admin action.

AI generation is optional and server-only. `/admin/questions/generate` creates unpublished drafts only when `AI_ENABLED=true` and credentials exist. Review, edit, approve, and publish drafts manually; generated content is not guaranteed to be correct and is never auto-published.

## Vercel checklist

1. Create a managed PostgreSQL database and configure `DATABASE_URL` in Vercel.
2. Configure `AUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`, and Google OAuth redirect URLs.
3. Run `npx prisma migrate deploy` against production. Do not use `migrate reset`.
4. Deploy and verify HTTPS, login, admin authorization, public questions, search, practice, sitemap, and robots.
5. Keep `AI_ENABLED=false` unless the provider is reviewed and configured. Keep ads disabled until the publisher ID and site are ready.
6. Add the HTTPS sitemap to Google Search Console and configure the production domain.
7. Review privacy, cookie, terms, disclaimer, about, and contact pages before any advertising configuration.
