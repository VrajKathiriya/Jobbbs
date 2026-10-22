# Jobbbs — Task Tracker

The whole project split into small tasks. **Each task ends with a production deploy that you can see working.** A task holds 2–3 small features or 1–2 big ones; feature IDs refer to [09-feature-tracker.md](09-feature-tracker.md).

## How to use this file (for Claude Code)

1. **Pick the task.** Take the first task with status `todo` whose dependencies are all `done`, unless the owner names one. Set it to `doing`, along with its features in the feature tracker.
2. **Plan.** Read the task, the linked doc sections and `CLAUDE.md`. For tasks marked **Plan first**, show the plan and wait for approval.
3. **Build** only what the task lists. If something outside the task is needed, add it to the task's **Notes** and tell the owner; don't widen the task silently.
4. **Check.** Run `pnpm lint && pnpm typecheck && pnpm test` (plus `supabase test db` when SQL changed). Run `/code-review` on the diff.
5. **Deploy** using the standard deploy below.
6. **Verify** every box in the task's *Verify in production* list. Tick the boxes in this file.
7. **Close.** Set the task to `done` with the date, set its features to `done`, update the progress table in the feature tracker, and record any decision or spike result in [08-decision-log.md](08-decision-log.md). Commit with `chore(tasks): close Txx`.

If verification fails, the task stays `doing`. Fix and redeploy; don't start the next task.

**Status values:** `todo` · `doing` · `done` · `blocked` (with reason) · `deferred`
**Size:** S (≤ 1 session) · M (2–3 sessions) · L (4–6 sessions). A session is one focused sitting with Claude Code.

### Standard deploy

| Step | Available from |
|---|---|
| Push the branch and open a PR; CI (lint, typecheck, test, build) must pass | T01 |
| Merge to `main` → Vercel deploys production automatically | T01 |
| On `main`, a GitHub Action applies new migrations to prod (`supabase db push`) | T02 |
| On `main`, a GitHub Action deploys changed Edge Functions | T03 |
| Set any new secrets in Vercel / Supabase **before** merging (names are in `.env.example`) | always |

Before T01 there is no repo, so T01's deploy is the first Vercel import.

---

## Overview

| Task | Title | Features | Depends on | Size | Milestone | Status |
|---|---|---|---|---|---|---|
| T01 | Scaffold, CI and first deploy | FND-01, FND-02, FND-03 | — | M | | doing |
| T02 | Supabase and owner-only sign-in | FND-04, FND-05 | T01 | M | | todo |
| T03 | Background plumbing: cron, heartbeat, email | FND-06, FND-07, FND-08 | T02 | M | | todo |
| T04 | Design foundation | FND-09, FND-10 | T02 | L | | todo |
| T05 | Companies, boards and ATS detector | ENG-01, ENG-02, ENG-03 | T02 | M | | todo |
| T06 | Jobs table and Greenhouse adapter | ENG-04, ENG-05 | T03, T05 | L | | todo |
| T07 | Scheduler and job lifecycle | ENG-06, ENG-07 | T06 | L | | todo |
| T08 | Lever, Ashby and India normalizers | ENG-08, ENG-09, ENG-10 | T06 | L | | todo |
| T09 | De-duplication, reposts, maintenance | ENG-11, ENG-12, ENG-13 | T07, T08 | M | | todo |
| T10 | Source health and detection latency | ENG-14, ENG-15 | T04, T09 | M | **M1** | todo |
| T11 | Feed list and job detail | FEED-01, FEED-02 | T04, T09 | L | | todo |
| T12 | Search, filters and sorting | FEED-03, FEED-04 | T11 | L | | todo |
| T13 | Keyboard, hide and live updates | FEED-05, FEED-06 | T12 | M | | todo |
| T14 | Aggregator sources | AGG-01, AGG-02, AGG-03 | T09 | M | **M2** | todo |
| T15 | Skills taxonomy and profile | MATCH-01, MATCH-02 | T04 | M | | todo |
| T16 | Resume upload and parsing | MATCH-03 | T15 | M | | todo |
| T17 | Job enrichment and embeddings | MATCH-04, MATCH-05 | T09, T15 | L | | todo |
| T18 | Scoring engine and score UI | MATCH-06, MATCH-07 | T17 | L | | todo |
| T19 | Weights, dealbreakers, match sorts | MATCH-08, MATCH-09 | T18 | M | **M3** | todo |
| T20 | Saved searches and watchlist | ALR-01, ALR-02 | T19 | M | | todo |
| T21 | Match fan-out and notifications | ALR-03 | T20 | L | | todo |
| T22 | Email alerts | ALR-04, ALR-05, ALR-06 | T21 | L | | todo |
| T23 | Daily summary and alert soak | ALR-07 | T22 | M | **M4** | todo |
| T24 | Apply Kit (rule-based) | APL-01, APL-02 | T18 | L | | todo |
| T25 | AI Apply Kit | APL-03, APL-04, APL-05 | T24 | L | | todo |
| T26 | Application tracker | TRK-01, TRK-02, TRK-03 | T11, T23 | L | | todo |
| T27 | Personal v1 hardening | OPS-01–04 | T22, T25, T26 | M | **M5** | todo |
| T28 | More ATS sources | SRC-01, SRC-02, SRC-03 | T27 | M | | todo |
| T29 | India ATS sources | SRC-04, SRC-05, SRC-06 | T27 | M | | todo |
| T30 | Own domain and real email | PUB-01 | T27 | S | | todo |
| T31 | Telegram alerts | PUB-02 | T30 | M | | todo |
| T32 | Web Push and PWA | PUB-03 | T30 | M | | todo |
| T33 | Sign-ups and onboarding | PUB-04 | T30 | M | | todo |
| T34 | Landing and public pages | PUB-05, PUB-06 | T33 | M | | todo |
| T35 | Privacy and data rights | PUB-07, PUB-08 | T33 | M | | todo |
| T36 | Public hardening | PUB-09, PUB-10 | T31–T35 | M | **Public beta** | todo |
| T37 | Alert-email forwarding | LTR-01 | T36 | L | | todo |
| T38 | Company pages and weight suggestions | LTR-02, LTR-03 | T36 | M | | todo |
| T39 | "Send to Jobbbs" browser button | LTR-04 | T36 | M | | todo |

Milestones match the [roadmap](06-roadmap.md): **M1** engine running · **M2** feed · **M3** scored feed · **M4** you get alerts · **M5** personal v1.

---

## Personal edition

### T01 — Scaffold, CI and first deploy
**Status:** doing · **Size:** M · **Depends on:** — · **Features:** FND-01, FND-02, FND-03 · **Plan first**
**Goal:** An empty but real Jobbbs app on Vercel, with the repo layout every later task builds on.
**Build**
- `git init`, `.gitignore`, pnpm workspace: `apps/web` (Next.js App Router, TypeScript strict, Tailwind v4), `packages/core` (TypeScript, Vitest, one sample test), `supabase/` placeholder. Layout per [02 §12](02-system-design.md#12-repository-layout).
- ESLint + Prettier; root scripts `lint`, `typecheck`, `test`, `build`.
- `.github/workflows/ci.yml`: install → lint → typecheck → test → build, on PRs and `main`.
- `.env.example` (names only); placeholder home page showing the `jobbbs` wordmark only.

**Deploy:** create a private GitHub repo, push, import into Vercel (functions region `bom1`).
**Verify in production**
- [ ] `https://<project>.vercel.app` shows the placeholder
- [ ] CI is green on `main`

### T02 — Supabase and owner-only sign-in
**Status:** todo · **Size:** M · **Depends on:** T01 · **Features:** FND-04, FND-05
**Goal:** You can sign in with Google on production; nobody else can.
**Build**
- Supabase CLI init; dev and prod projects in Mumbai; local stack with `supabase start`.
- Migration: `profiles` (user_id → auth.users, display_name, role default `user`, timestamps), RLS + explicit grants, trigger that creates a profile on sign-up.
- `@supabase/ssr` server and browser clients in `apps/web/lib/supabase/`; middleware session refresh; `(app)` route group requires auth; `/login` with Google; sign-out.
- `.github/workflows/deploy-supabase.yml`: `supabase db push` to prod on `main`.
- Generated types → `apps/web/lib/database.types.ts`.

**Owner does by hand:** create the Google OAuth client; add it in Supabase Auth; set Site URL and redirect URLs (localhost + Vercel); after your first prod sign-in set your `role = 'admin'` and **turn off "Allow new users to sign up"**.
**Tests:** pgTAP: a user can read only their own profile.
**Verify in production**
- [ ] Google sign-in works and lands on an empty `/feed`
- [ ] A different Google account cannot get in
- [ ] The migration was applied by the GitHub Action

### T03 — Background plumbing: cron, heartbeat, email
**Status:** todo · **Size:** M · **Depends on:** T02 · **Features:** FND-06, FND-07, FND-08
**Goal:** Code runs every minute in production, can use `packages/core`, can email you, and you hear about it if it stops.
**Build**
- Edge Function `heartbeat` that imports a function from `packages/core` (spike S2; fallback: esbuild bundle into `supabase/functions/_shared/core.js`) and pings `HEALTHCHECKS_PING_URL`.
- Migration: enable `pg_cron`, `pg_net`; store function URL and `CRON_SHARED_SECRET` in Vault; cron job every minute. Functions reject calls without the secret header.
- Email helper in core (plain text + simple HTML) and an admin-only function `send-test-email` using Resend from `onboarding@resend.dev` to `ALERT_EMAIL_TO`.
- GitHub Action step: deploy changed Edge Functions on `main`.
- healthchecks.io check with a 3-minute grace period, alerting your email.

**Verify in production**
- [ ] healthchecks.io shows a ping every minute for 24 hours (S3)
- [ ] Test email arrives; Gmail filter + label notification set up on your phone (S4)
- [ ] S2, S3, S4 results written in the decision log

### T04 — Design foundation
**Status:** todo · **Size:** L · **Depends on:** T02 · **Features:** FND-09, FND-10
**Goal:** The Jobbbs look exists as reusable parts before any real screen is built.
**Build**
- Tokens from [05 §3](05-design-system.md#3-tokens) in `globals.css` + Tailwind `@theme`; Hanken Grotesk + JetBrains Mono via `next/font`; theme cookie (light / dark / system) with no flash.
- shadcn/ui init, then restyle Button, Input, Popover, Dialog, Sheet, Tooltip, DropdownMenu, Tabs and Toast to the tokens; Phosphor icons.
- App shell: left nav (Feed, Alerts, Watchlist, Tracker, Profile, Admin), header search slot, three-pane layout; tablet two-pane; phone bottom tabs.
- `/dev/ui` (admin only): JobRow (selected/seen/hover), ScoreRing (4 bands + confidence), FreshnessPill (3 states + tooltip), SkillChip, SourceChip, FilterChip, Breakdown table, empty/loading/error states, all with data labelled as sample.

**Tests:** Playwright screenshots of `/dev/ui` at 1440 and 390 px in light and dark (saved for review); axe reports no violations.
**Verify in production**
- [ ] `/dev/ui` matches [05](05-design-system.md) in both themes and at phone width
- [ ] Nothing from the "looks AI-made" list ([05 §2](05-design-system.md#2-why-sites-look-ai-made-and-what-we-do-instead))

### T05 — Companies, boards and ATS detector
**Status:** todo · **Size:** M · **Depends on:** T02 · **Features:** ENG-01, ENG-02, ENG-03
**Goal:** Jobbbs knows which companies to watch and where their job boards are.
**Build**
- Migration: `companies`, `boards` per [02 §7](02-system-design.md#7-data-model) (tier, next_poll_at, lease_until, etag, failure fields); companies public-read, boards admin-only.
- `scripts/ats-detect.ts`: read careers URLs from CSV, follow redirects, match the patterns in [04 §3](04-data-sources-and-compliance.md#3-building-the-company-list), confirm by calling the board endpoint, write a CSV (company, ats, token, open_jobs).
- `scripts/seed-companies.ts`: upsert companies and boards; `data/companies/targets.csv` (your list) → Tier A; `data/companies/india-tech.csv` → Tier B/C.

**Tests:** detector unit tests for every URL pattern; seeding twice changes nothing.
**Verify in production**
- [ ] Boards are in the prod database
- [ ] Detector report saved to `data/companies/report.md`; detection rate recorded (S6)
- [ ] Greenhouse, Lever and Ashby endpoints and terms checked and recorded (S5)

### T06 — Jobs table and Greenhouse adapter
**Status:** todo · **Size:** L · **Depends on:** T03, T05 · **Features:** ENG-04, ENG-05 · **Plan first**
**Goal:** Real Greenhouse jobs land in the production database.
**Build**
- Migration: `jobs` per [02 §7.2](02-system-design.md#72-core-ddl-sketch-refined-in-phase-1) (tsvector, trigram, indexes), `ingest_runs`, `job_tombstones`; RLS + grants.
- Core: `SourceAdapter`, `NormalizedJob`, Zod payload schemas, HTML → text, fingerprint, content hash; Greenhouse adapter (list + detail with `questions=true`).
- Fixtures: 3+ recorded Greenhouse responses (normal, empty, edge case).
- Edge Function `ingest-tick` v0: run manually for given boards, insert new jobs, write `ingest_runs`.
- Spike S1: one invocation polling 150 boards; record wall time and CPU.

**Tests:** fixtures → expected jobs; malformed payload → ZodError; 429/5xx → error result.
**Verify in production**
- [ ] A manual run inserts jobs for 5 boards; `ingest_runs` rows look right
- [ ] S1 result recorded

### T07 — Scheduler and job lifecycle
**Status:** todo · **Size:** L · **Depends on:** T06 · **Features:** ENG-06, ENG-07 · **Plan first**
**Goal:** Every board is polled on its tier schedule automatically, writing only what changed.
**Build**
- `claim_due_boards(limit)` with leases; tier intervals + jitter; exponential backoff; `Retry-After`; per-host limit 1 req/s; concurrency 10; ETag / `If-None-Match`.
- Write-light polling per [02 §2.4](02-system-design.md#24-write-light-polling): insert new, update on content-hash change, `missing_since` on first miss, close on second, `last_seen_at` at most every 6 h; enqueue `job_events` (pgmq).
- Cron runs `ingest-tick` every minute; the heartbeat ping moves into it.

**Tests:** lifecycle transitions (pure core tests); concurrent `claim_due_boards` calls never claim the same board.
**Verify in production**
- [ ] Over 24 h, Tier-A boards are polled about every 10 min (query `ingest_runs`)
- [ ] A job removed from its board is closed after two polls

### T08 — Lever, Ashby and India normalizers
**Status:** todo · **Size:** L · **Depends on:** T06 · **Features:** ENG-08, ENG-09, ENG-10
**Goal:** Two more ATS sources, and clean location, salary and experience data.
**Build**
- Lever and Ashby adapters with fixtures (Ashby `includeCompensation=true` → structured salary). Follow the `add-job-source` skill.
- Core normalizers: India locations and aliases (Bengaluru/Bangalore/BLR, Gurugram/Gurgaon, "Remote (India)"), country codes, work mode; salary (LPA, lakhs, INR monthly, USD/EUR, ranges); experience ("3+ yrs", "3-5 years"); title normalization + seniority.

**Tests:** table-driven, 50+ real strings each for location and salary.
**Verify in production**
- [ ] Lever and Ashby boards from your list are ingesting
- [ ] Spot-check 20 jobs: location, mode, salary and experience are right

### T09 — De-duplication, reposts, maintenance
**Status:** todo · **Size:** M · **Depends on:** T07, T08 · **Features:** ENG-11, ENG-12, ENG-13
**Goal:** One job shows up once, reposts are flagged, and the database stays small.
**Build**
- Clustering on insert per [02 §2.6](02-system-design.md#26-de-duplication): fingerprint, then fuzzy (trigram > 0.85, same company, 14 days); canonical = ATS-direct.
- Repost detection against closed jobs and tombstones (90 days).
- `maintenance` function, daily 03:00 IST: closed jobs > 30 days → tombstones; delete `ingest_runs` > 14 days; re-tier boards; email you when the DB passes 70% of 500 MB.

**Tests:** same job from two sources; similar titles that are different jobs; same title in two cities; repost case.
**Verify in production**
- [ ] No duplicate canonical jobs in a sample of 100
- [ ] Maintenance run logged with DB size

### T10 — Source health and detection latency
**Status:** todo · **Size:** M · **Depends on:** T04, T09 · **Features:** ENG-14, ENG-15
**Goal:** You can see at a glance which sources work and how early Jobbbs is.
**Build**
- `/admin/sources`: per source and board — polls in 24 h, success %, last error, consecutive failures, new jobs/day; enable/disable; change tier.
- Detection latency (`first_seen_at − posted_at`) p50/p95 per source as a SQL view + chart (use the `dataviz` skill).
- Auto-disable a board after 20 consecutive parse errors and email you.

**Verify in production**
- [ ] Page works on your phone; numbers match a manual SQL check
- [ ] First H1 numbers recorded in the decision log → **M1 Engine running**

### T11 — Feed list and job detail
**Status:** todo · **Size:** L · **Depends on:** T04, T09 · **Features:** FEED-01, FEED-02
**Goal:** Browse real, fresh jobs on laptop and phone.
**Build**
- `/feed`: canonical active jobs, newest first, keyset pagination (30 per page), JobRow with freshness, source, company, location, mode, salary, experience. Card queries select card columns only.
- Detail pane (desktop) / full-screen sheet (phone): description as safe plain text, both timestamps, "Also listed on", repost count, **Apply on {source}**.
- Skeleton loading, empty state with next action, error with retry.

**Tests:** Playwright: open feed → open job → apply link points to the source.
**Verify in production**
- [ ] Feed loads in under 1 s on your phone over 4G
- [ ] Detail and apply link work on phone and laptop

### T12 — Search, filters and sorting
**Status:** todo · **Size:** L · **Depends on:** T11 · **Features:** FEED-03, FEED-04
**Goal:** Narrow the feed to exactly the jobs you'd apply for.
**Build**
- Search: full-text (`websearch_to_tsquery`) with trigram fallback for typos.
- Filter bar with URL state: work mode, locations (with aliases), experience range, minimum salary (+ "hide jobs without salary"), company, source, detected within (1 h / 24 h / 7 d), employment type.
- SQL function `feed_candidates(filters, cursor, limit)`; sort Newest.

**Tests:** 10+ SQL tests for filter combinations; unknown values included by default.
**Verify in production**
- [ ] "React · Bengaluru or Remote · 2–4 yrs · last 24 h" returns sensible results

### T13 — Keyboard, hide and live updates
**Status:** todo · **Size:** M · **Depends on:** T12 · **Features:** FEED-05, FEED-06
**Goal:** Triage fast, and see new jobs arrive without refreshing.
**Build**
- Shortcuts from [05 §6](05-design-system.md#6-keyboard) (`j`/`k`, `o`, `x`, `/`, `f`, `g f`, `?`) + help dialog.
- Hide job: `hidden_jobs` (owner-only) + undo toast.
- Realtime: "N new · Show" banner that never reorders the list under you; `aria-live` announcement.

**Verify in production**
- [ ] A full triage pass works with the keyboard only
- [ ] A newly ingested job shows up in the banner within a minute

### T14 — Aggregator sources
**Status:** todo · **Size:** M · **Depends on:** T09 · **Features:** AGG-01, AGG-02, AGG-03
**Goal:** Broader coverage beyond the boards you poll directly.
**Build**
- Adzuna India adapter with a quota-aware plan (~25 queries/day from your interests); predicted salaries flagged as estimates. Aggregator queries live in `boards` as tier Q.
- Remote feeds: Remotive, Arbeitnow, RemoteOK, Himalayas, honoring each one's attribution and rate rules.
- Jooble adapter if you have a key; otherwise mark AGG-03 `blocked`.
- Discovery: an aggregator job whose apply URL is Greenhouse/Lever/Ashby proposes that board in an admin approval list.

**Verify in production**
- [ ] Aggregator jobs appear with "Estimated by Adzuna" labels where relevant
- [ ] Aggregator copies of ATS jobs are clustered, not duplicated → **M2 Feed**

### T15 — Skills taxonomy and profile
**Status:** todo · **Size:** M · **Depends on:** T04 · **Features:** MATCH-01, MATCH-02
**Goal:** Jobbbs knows what you're looking for.
**Build**
- `skills` table seeded from `packages/core/src/skills/taxonomy.json` (~1,500 tech skills: slug, name, aliases, category, parent).
- Profile columns per [02 §7.1](02-system-design.md#71-tables) and `user_skills`.
- `/profile`: target titles, years, locations, work modes, relocation, minimum salary + currency, notice period, skills picker with levels.

**Tests:** alias resolution (React.js → react, Golang → go).
**Verify in production**
- [ ] Your profile is saved; skill search finds aliases

### T16 — Resume upload and parsing
**Status:** todo · **Size:** M · **Depends on:** T15 · **Features:** MATCH-03
**Goal:** Fill your profile from your resume in one step.
**Build**
- Upload PDF/DOCX (≤ 5 MB, MIME + magic-byte checks); parse with unpdf / mammoth in a route handler; extract skills, total years, titles; "confirm and edit" screen that merges into the profile.
- Parse-and-discard by default; optional private storage with owner-only policy.
- **No AI here:** resume text never leaves our servers.

**Tests:** 3 anonymized resume fixtures → expected skills and years.
**Verify in production**
- [ ] Your real resume produces a sensible profile

### T17 — Job enrichment and embeddings
**Status:** todo · **Size:** L · **Depends on:** T09, T15 · **Features:** MATCH-04, MATCH-05 · **Plan first**
**Goal:** Every job carries structured skills, experience and salary, plus an embedding.
**Build**
- `pipeline` Edge Function v1 reading `job_events`: section-aware skill extraction → `job_skills` (required / preferred); experience and salary from the description when missing; seniority.
- `gte-small` embeddings for jobs (title + skills + first 1,500 chars) and your profile; `vector(384)` columns + index.
- `ingest-tick` invokes `pipeline` when there are new jobs; a sweeper cron runs every 2 min; a backfill script handles existing jobs.

**Tests:** extraction on fixture descriptions; re-processing the same event changes nothing.
**Verify in production**
- [ ] 95% of new jobs have skills within 2 minutes of detection

### T18 — Scoring engine and score UI
**Status:** todo · **Size:** L · **Depends on:** T17 · **Features:** MATCH-06, MATCH-07 · **Plan first**
**Goal:** Every job shows an explained 0–100 match score.
**Build**
- `packages/core/scoring` per [02 §3](02-system-design.md#3-matching-and-scoring): factors, unknown handling, confidence, `scorer_version`. Write the 30+ golden cases **first** and show them before implementing.
- Feed rows show ScoreRing; detail shows the breakdown table with reasons and matched/missing skills.
- Server-side scoring of feed candidates with a 60 s cache.

**Tests:** golden cases; under 1 ms per job.
**Verify in production**
- [ ] Every score explains itself; your top 10 matches look right to you

### T19 — Weights, dealbreakers, match sorts
**Status:** todo · **Size:** M · **Depends on:** T18 · **Features:** MATCH-08, MATCH-09
**Goal:** Tune the score to your priorities and sort by what matters.
**Build**
- Weight sliders on `/profile` (always sum to 100, reset to defaults); dealbreakers (excluded companies and keywords, work modes, strict minimum salary, maximum experience required) hide jobs.
- Sorts: **Best match** (vector prefilter + score) and **Apply first** (priority formula).

**Tests:** weight normalization; dealbreaker cases; priority formula.
**Verify in production**
- [ ] Changing weights reorders the feed right away → **M3 Scored feed**

### T20 — Saved searches and watchlist
**Status:** todo · **Size:** M · **Depends on:** T19 · **Features:** ALR-01, ALR-02
**Goal:** Tell Jobbbs what to watch for.
**Build**
- `saved_searches` (owner-only): "Save this search" from current filters; name, min score (default 70), frequency (instant / hourly / daily), quiet hours, active toggle; `/alerts` page.
- `watchlist`: follow / unfollow from job detail; `/watchlist` page; "Add company by careers URL" runs the ATS detector and creates a Tier-A board.

**Verify in production**
- [ ] One saved search and three followed companies exist
- [ ] A company added by URL starts being polled

### T21 — Match fan-out and notifications
**Status:** todo · **Size:** L · **Depends on:** T20 · **Features:** ALR-03 · **Plan first**
**Goal:** Every new job is checked against your searches and watchlist exactly once.
**Build**
- `pipeline` stage per [02 §4.2–4.3](02-system-design.md#42-finding-who-to-alert-cheaply): SQL prefilter of candidate searches + watchlist followers → score → `notifications` with idempotency key `sha256(user|cluster|channel)` and `ON CONFLICT DO NOTHING`.
- `notify` queue; statuses pending / sent / failed / skipped; retries at 1, 5 and 30 min.
- "Alert log" on `/alerts`: what matched and when.

**Tests:** replay the same job event 10× → exactly one notification; watchlist bypass; below-minimum skipped.
**Verify in production**
- [ ] Real new jobs create notification rows (no email yet)

### T22 — Email alerts
**Status:** todo · **Size:** L · **Depends on:** T21 · **Features:** ALR-04, ALR-05, ALR-06
**Goal:** Matching jobs reach your inbox within minutes.
**Build**
- Sender per [02 §4.5](02-system-design.md#45-personal-edition-email-to-the-owner): send immediately, 5-minute bundling, 80/day cap then hourly digest, quiet-hours bundle.
- Template: plain-text first + simple HTML. Per job: score, title, company, location, salary if listed, "detected N min ago", **Apply on company site**, **Open in Jobbbs**. Footer: Smart Links for the matching search (LinkedIn last hour, Naukri last day, Indeed last day) per [04 §5](04-data-sources-and-compliance.md#5-smart-links).
- Feedback: signed one-click "Relevant" / "Not relevant" links → `match_feedback`; same buttons in the app.

**Tests:** bundling and cap logic with a fake clock (pure core); signed link verification.
**Verify in production**
- [ ] A real alert email reaches your phone within 5 minutes of detection
- [ ] Feedback links record your answer

### T23 — Daily summary and alert soak
**Status:** todo · **Size:** M · **Depends on:** T22 · **Features:** ALR-07
**Goal:** Prove alerts are reliable before building more.
**Build**
- `digest` function (cron hourly): one daily summary at your chosen time with top unopened matches and applications needing follow-up.
- Alert latency (detected → email sent) on `/admin`.
- Run a 7-day soak and watch duplicates, latency and failures.

**Verify in production**
- [ ] 7 days: p95 detection → email under 5 min, zero duplicates → **M4 You get alerts**

### T24 — Apply Kit (rule-based)
**Status:** todo · **Size:** L · **Depends on:** T18 · **Features:** APL-01, APL-02
**Goal:** Everything you need to apply, on one screen, without AI.
**Build**
- Apply Kit panel in job detail: at a glance; your fit (matched / missing); must-haves vs nice-to-haves; resume keywords missing from your profile; timeline (posted / detected / reposted).
- Greenhouse application questions saved on detail fetch and shown; LinkedIn people-search links for recruiters and engineering managers at the company.

**Verify in production**
- [ ] Kit renders in under 1 s for Greenhouse, Lever, Ashby and Adzuna jobs

### T25 — AI Apply Kit
**Status:** todo · **Size:** L · **Depends on:** T24 · **Features:** APL-03, APL-04, APL-05 · **Plan first**
**Goal:** A short AI summary, interview topics and a cover-note draft, at no cost.
**Build**
- `LlmProvider` interface in core; Gemini provider via `@google/genai` (free tier, model from `AI_MODEL`); Claude provider optional (`AI_PROVIDER=anthropic`). See ADR-016.
- `/api/jobs/[id]/apply-kit`: job-level summary + interview topics (cached in `apply_kits`); cover-note draft on click (cached per user and job); JSON-schema output; streamed.
- **Data rule:** send only the job text plus your skills, years and target titles. Never send your name, contact details or resume text.
- Guard: `ai_usage` table, `AI_DAILY_REQUEST_LIMIT` set below the free daily quota shown in AI Studio; on 429 or limit, show "AI section unavailable today" while the rule-based kit keeps working.
- Smart Links panel on each saved search.

**Verify in production**
- [ ] AI section works; the guard stops at the limit; the rule-based kit is unaffected
- [ ] Log inspection confirms no personal fields in the request payload

### T26 — Application tracker
**Status:** todo · **Size:** L · **Depends on:** T11, T23 · **Features:** TRK-01, TRK-02, TRK-03
**Goal:** Know where every application stands.
**Build**
- `applications` (owner-only): Saved → Applying → Applied → Interviewing → Offer / Rejected. `s` saves; `a` opens the apply link and marks Applying.
- `/tracker` kanban (drag on desktop, status menu on phone), notes, next-action date.
- Follow-ups: Applied sets a reminder for +7 days, included in the daily summary email.

**Verify in production**
- [ ] Track 3 real applications from save to applied, and see the reminder

### T27 — Personal v1 hardening
**Status:** todo · **Size:** M · **Depends on:** T22, T25, T26 · **Features:** OPS-01, OPS-02, OPS-03, OPS-04
**Goal:** Safe and recoverable enough to rely on every day.
**Build**
- Sentry for web and Edge Functions.
- pgTAP tests for every owner-only table (cross-user access must fail).
- Nightly GitHub Action: encrypted `pg_dump` of user tables; one restore into dev.
- Run `/security-review` and fix findings; confirm sign-ups are off; check the client bundle has no service-role key.

**Verify in production**
- [ ] All checks green; a test error shows up in Sentry; restore worked → **M5 Personal v1**

## While you use it (v1.x)

### T28 — More ATS sources
**Status:** todo · **Size:** M · **Depends on:** T27 · **Features:** SRC-01, SRC-02, SRC-03
**Goal:** Cover companies on Workable, SmartRecruiters and Recruitee.
**Build:** three adapters via the `add-job-source` skill, with fixtures; detector patterns already exist.
**Verify in production**
- [ ] At least one board per source is ingesting with ≥ 98% success over 48 h

### T29 — India ATS sources
**Status:** todo · **Size:** M · **Depends on:** T27 · **Features:** SRC-04, SRC-05, SRC-06
**Goal:** Cover Indian employers on Keka, Darwinbox and Zoho Recruit.
**Build:** for each source, **first** record a terms review in the decision log; build the adapter only if the endpoint is public and meant for careers pages. Mark a source `deferred` if it fails review.
**Verify in production**
- [ ] Approved sources ingesting; rejected ones documented

## Go public (when you decide)

These tasks are outlined, not detailed. Refine each one with Claude Code (plan mode) before starting.

### T30 — Own domain and real email
**Status:** todo · **Size:** S · **Depends on:** T27 · **Features:** PUB-01
Buy the domain; verify it in Resend (SPF, DKIM, DMARC); send from `alerts@yourdomain`; set Supabase Auth custom SMTP; add an unsubscribe link.
- [ ] Email to a second address of yours arrives in the inbox, not spam

### T31 — Telegram alerts
**Status:** todo · **Size:** M · **Depends on:** T30 · **Features:** PUB-02
Bot, `/start <token>` linking, `/pause`, `/resume`, `/stop`, `telegram-webhook` function with secret header, 403 handling, channel settings.
- [ ] Alert arrives on Telegram within 2 min of detection

### T32 — Web Push and PWA
**Status:** todo · **Size:** M · **Depends on:** T30 · **Features:** PUB-03
Manifest, service worker, VAPID keys, subscribe flow, iOS "add to home screen" hint.
- [ ] Push arrives on Android Chrome and on iOS (installed)

### T33 — Sign-ups and onboarding
**Status:** todo · **Size:** M · **Depends on:** T30 · **Features:** PUB-04
Turn sign-ups on; onboarding wizard (resume → confirm → preferences → first alert → channel); per-user limits.
- [ ] A new test account reaches a scored feed in under 3 minutes

### T34 — Landing and public pages
**Status:** todo · **Size:** M · **Depends on:** T33 · **Features:** PUB-05, PUB-06
Landing page with a live ticker of real detections ([05 §8](05-design-system.md#8-landing-page)); public job pages (excerpt + source link); "How we get jobs".
- [ ] Lighthouse ≥ 90; no invented numbers anywhere

### T35 — Privacy and data rights
**Status:** todo · **Size:** M · **Depends on:** T33 · **Features:** PUB-07, PUB-08
Privacy policy, terms, consent screens (alerts, AI processing), export JSON, delete account within 24 h ([04 §8](04-data-sources-and-compliance.md#8-privacy-and-legal-checklist-india-dpdp-act-2023--rules-2025)).
- [ ] Export and delete tested on a throwaway account

### T36 — Public hardening
**Status:** todo · **Size:** M · **Depends on:** T31, T32, T33, T34, T35 · **Features:** PUB-09, PUB-10
Rate limits, CSP and security headers, PostHog, uptime monitors, accessibility audit, load test on the feed; production readiness checklist in [03 §9](03-tech-stack-and-deployment.md#9-production-readiness-checklist).
- [ ] Checklist fully ticked → **Public beta**

## Later

### T37 — Alert-email forwarding
**Status:** todo · **Size:** L · **Depends on:** T36 · **Features:** LTR-01
Domain on Cloudflare, Email Routing + Email Worker → `inbound-email` function; parse LinkedIn, Naukri and Indeed alert formats into private leads ([04 §6](04-data-sources-and-compliance.md#6-forwarded-alert-emails-phase-7)).

### T38 — Company pages and weight suggestions
**Status:** todo · **Size:** M · **Depends on:** T36 · **Features:** LTR-02, LTR-03
Company pages (open roles, hiring velocity); suggest weight changes from relevance feedback.

### T39 — "Send to Jobbbs" browser button
**Status:** todo · **Size:** M · **Depends on:** T36 · **Features:** LTR-04
User-initiated only: sends the current page's URL and selected text to Jobbbs for a score and Apply Kit. No automated reading of third-party sites.
