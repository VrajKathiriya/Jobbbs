# Jobbbs

Personal job radar: polls company ATS boards and job feeds, scores new jobs against a user's profile, alerts within minutes, and gives an Apply Kit. India-first, tech roles, plus remote roles open to India.

**Current scope: personal edition (ADR-013).** One owner; new sign-ups disabled in Supabase Auth. Alerts go **by email to the owner only**, via Resend's test sender `onboarding@resend.dev` → `ALERT_EMAIL_TO` (no domain; ADR-014). Don't build Telegram, Web Push, onboarding wizard, landing/public pages or legal pages until the Go-public phase in `docs/06-roadmap.md`. Keep the schema multi-user with RLS anyway. Apply Kit AI goes through `LlmProvider` with Gemini's free tier by default (ADR-016); never send name, contact details or resume text to any LLM.

## Read before working

- **What to build next:** `docs/10-task-tracker.md` (deployable tasks) and `docs/09-feature-tracker.md` (feature status)
- Product scope and priorities: `docs/01-product-requirements.md`
- Architecture, data model, scoring, alerts: `docs/02-system-design.md`
- Stack, environments, env vars, free-tier limits: `docs/03-tech-stack-and-deployment.md`
- Sources and what we may fetch or show: `docs/04-data-sources-and-compliance.md`
- UI rules (mandatory for any UI change): `docs/05-design-system.md`
- Current phase and definitions of done: `docs/06-roadmap.md`
- Decisions and open questions: `docs/08-decision-log.md`

If a task conflicts with these docs, stop and say so instead of guessing. If a decision changes, update the doc in the same change.

## Stack

TypeScript (strict) · pnpm workspaces · Next.js App Router on Vercel · Tailwind v4 + restyled shadcn/ui + Phosphor icons · Supabase (Postgres + pgvector, pg_trgm, pgmq, pg_cron, pg_net; Auth; Storage; Realtime; Edge Functions in Deno) · Zod · Vitest · Playwright · pgTAP.

## Layout

```
apps/web/          Next.js app (marketing, app, admin, api)
packages/core/     pure TS: adapters, normalize, dedupe, skills, scoring (+ test/fixtures)
supabase/          migrations/, functions/, tests/ (pgTAP), seed.sql
scripts/           ats-detect.ts, seed scripts
docs/              planning docs (source of truth for decisions)
```

## Commands (available after Phase 0 scaffolding)

```
pnpm install
pnpm --filter web dev            # web on :3000
pnpm test                        # vitest, all packages
pnpm lint && pnpm typecheck
supabase start                   # local stack (Docker)
supabase db reset                # migrations + seed
supabase migration new <name>
supabase gen types typescript --local > apps/web/lib/database.types.ts
supabase functions serve
supabase test db                 # pgTAP RLS tests
```

## Rules

### Data and honesty
- Never scrape LinkedIn, Naukri or Indeed, and never fetch pages behind a login. New sources follow the `add-job-source` skill and `docs/04`.
- Keep `posted_at` (from source, nullable) and `first_seen_at` (ours) separate. Never present detection time as posting time.
- Never show or estimate applicant counts. Label predicted salaries as estimates.
- No fake data in production UI: no invented stats, testimonials or logos. Sample data in dev pages is labelled as sample.

### Architecture
- `packages/core` is pure: no I/O, no `process`, no `Deno`, no Node built-ins. Inject `fetch` and the clock. It must run in Node and Deno.
- Edge Functions are thin runners around core. Business logic lives in core with tests.
- Validate every external payload and every request body with Zod.
- Polling writes only on change (see `docs/02` §2.4). Never update every row on every poll.
- Notifications must use the idempotency key; inserts use `ON CONFLICT DO NOTHING`.

### Database and security
- Every table: RLS enabled + explicit `GRANT`s + (for user data) a pgTAP test proving cross-user access fails.
- Migrations are forward-only; never edit an applied migration.
- The service-role key is used only in Edge Functions and server-only modules (`import 'server-only'`). Never in client code, logs or commits.
- Secrets come from env vars; update `.env.example` (names only) when adding one.

### UI
- Follow `docs/05-design-system.md`: tokens only (no raw hex in components), Hanken Grotesk + JetBrains Mono (numbers and times), radius 4/6/8, borders over shadows, one accent.
- Avoid: gradients, glassmorphism, emoji in UI, centered-everything layouts, generic marketing copy, decorative animation.
- Every list needs loading (skeleton), empty (with next action) and error (with retry) states.
- Check UI at 1440 px and 390 px, in light and dark, and with keyboard only.

### Testing
- Core: test-first with recorded fixtures in `packages/core/test/fixtures/<source>/`.
- Scoring: golden cases table; any change bumps `scorer_version`.
- Don't claim a source integration works until it has run against the real endpoint in dev and logged to `ingest_runs`.

## Workflow

1. Work task by task from `docs/10-task-tracker.md`, following its "How to use this file" steps. Build only what the task lists.
2. Plan first for tasks marked **Plan first** and for any schema, scoring, ingestion or alert change.
3. Run lint, typecheck and tests; `/code-review` before merge; `/security-review` when auth, RLS, storage or secrets change.
4. A task is done only when it's deployed and its production checklist is verified. Then update both trackers.
5. Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
