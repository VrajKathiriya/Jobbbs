# Jobbbs — Feature Tracker

The single list of every feature and its status. Work is done through tasks in [10-task-tracker.md](10-task-tracker.md); each feature belongs to exactly one task.

## How to update (for Claude Code)

- When a task is finished and verified in production, set each of its features to `done` and fill in the date.
- Use `doing` while the task is in progress, `blocked` with a one-line reason in **Notes** when something external stops it, and `deferred` when the owner postpones it.
- Never mark a feature `done` because code exists. It must be deployed and verified (see the task's checklist).
- Keep the progress table at the top in sync.

**Status values:** `todo` · `doing` · `done` · `blocked` · `deferred`
**Release:** `v1` = personal edition · `v1.x` = improvements while you use it · `public` = Go-public phase · `later` = after public launch

## Progress

| Release | Features | Done |
|---|---|---|
| v1 (personal) | 62 | 0 |
| v1.x | 6 | 0 |
| public | 10 | 0 |
| later | 4 | 0 |

---

## Foundation

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| FND-01 | Monorepo scaffold (pnpm: `apps/web`, `packages/core`, `supabase/`) | — | v1 | T01 | todo | | |
| FND-02 | CI checks (lint, typecheck, test, build) | — | v1 | T01 | todo | | |
| FND-03 | Vercel deployment (Mumbai `bom1`, production + previews) | — | v1 | T01 | todo | | |
| FND-04 | Supabase dev/prod projects + migration pipeline | — | v1 | T02 | todo | | |
| FND-05 | Owner-only Google sign-in (sign-ups disabled, protected routes) | — | v1 | T02 | todo | | |
| FND-06 | Edge Function deploy pipeline + shared core running in Deno | — | v1 | T03 | todo | | |
| FND-07 | Supabase Cron every minute + heartbeat monitor | — | v1 | T03 | todo | | |
| FND-08 | Email to owner via Resend test sender | F9 | v1 | T03 | todo | | |
| FND-09 | Design tokens, fonts, dark mode, app shell | — | v1 | T04 | todo | | |
| FND-10 | Component sheet `/dev/ui` (JobRow, ScoreRing, FreshnessPill, chips, states) | — | v1 | T04 | todo | | |

## Job engine

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| ENG-01 | `companies` + `boards` schema | F15 | v1 | T05 | todo | | |
| ENG-02 | ATS detector script | F15 | v1 | T05 | todo | | |
| ENG-03 | Company seed (your targets as Tier A + India tech list) | — | v1 | T05 | todo | | |
| ENG-04 | `jobs` schema (FTS, trigram, indexes, RLS) | F1 | v1 | T06 | todo | | |
| ENG-05 | Greenhouse adapter | F1 | v1 | T06 | todo | | |
| ENG-06 | `ingest-tick` scheduler (tiers, leases, backoff, ETag) | F3 | v1 | T07 | todo | | |
| ENG-07 | Write-light polling + job lifecycle (missing → closed) | F3 | v1 | T07 | todo | | |
| ENG-08 | Lever adapter | F1 | v1 | T08 | todo | | |
| ENG-09 | Ashby adapter | F1 | v1 | T08 | todo | | |
| ENG-10 | India normalizers (location, salary, experience, title, seniority) | F2 | v1 | T08 | todo | | |
| ENG-11 | Cross-source de-duplication (fingerprint + fuzzy clusters) | F1 | v1 | T09 | todo | | |
| ENG-12 | Repost detection + tombstones | F3 | v1 | T09 | todo | | |
| ENG-13 | Maintenance job (pruning, re-tiering, DB size alert) | — | v1 | T09 | todo | | |
| ENG-14 | Source health admin page | F15 | v1 | T10 | todo | | |
| ENG-15 | Detection-latency metrics (H1) | F15 | v1 | T10 | todo | | |

## Aggregator sources

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| AGG-01 | Adzuna India adapter (quota-aware queries) | F1 | v1 | T14 | todo | | |
| AGG-02 | Remote feeds: Remotive, Arbeitnow, RemoteOK, Himalayas | F1 | v1 | T14 | todo | | |
| AGG-03 | Jooble adapter (needs API key) | F1 | v1 | T14 | todo | | |

## Feed and search

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| FEED-01 | Feed list (three-pane, keyset pagination, freshness) | F1, F3 | v1 | T11 | todo | | |
| FEED-02 | Job detail (both timestamps, "also listed on", apply link, phone sheet) | F1, F3 | v1 | T11 | todo | | |
| FEED-03 | Full-text + typo-tolerant search | F2 | v1 | T12 | todo | | |
| FEED-04 | Filters in URL + Newest sort | F2 | v1 | T12 | todo | | |
| FEED-05 | Keyboard navigation + hide job | F13 | v1 | T13 | todo | | |
| FEED-06 | Live "N new jobs" banner (Realtime) | F1 | v1 | T13 | todo | | |

## Profile and matching

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| MATCH-01 | Skills taxonomy v1 (~1,500 skills, aliases, parents) | F4 | v1 | T15 | todo | | |
| MATCH-02 | Profile editor | F4 | v1 | T15 | todo | | |
| MATCH-03 | Resume upload + parsing (PDF/DOCX, confirm, parse-and-discard) | F4 | v1 | T16 | todo | | |
| MATCH-04 | Job enrichment: skills, experience, salary, seniority | F5 | v1 | T17 | todo | | |
| MATCH-05 | Embeddings (gte-small) for jobs and profile | F5 | v1 | T17 | todo | | |
| MATCH-06 | Scoring engine (golden tests, confidence, versioned) | F5 | v1 | T18 | todo | | |
| MATCH-07 | Score ring + breakdown UI | F5 | v1 | T18 | todo | | |
| MATCH-08 | Weight sliders + dealbreakers | F6 | v1 | T19 | todo | | |
| MATCH-09 | Best match + Apply first sorts | F2 | v1 | T19 | todo | | |

## Alerts

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| ALR-01 | Saved searches (min score, frequency, quiet hours) | F7 | v1 | T20 | todo | | |
| ALR-02 | Company watchlist (+ add company by careers URL) | F8 | v1 | T20 | todo | | |
| ALR-03 | Match fan-out + notifications with idempotency | F7 | v1 | T21 | todo | | |
| ALR-04 | Email alerts: instant, 5-min bundling, daily cap, quiet hours | F9 | v1 | T22 | todo | | |
| ALR-05 | Smart Links in alert emails | F11 | v1 | T22 | todo | | |
| ALR-06 | Relevance feedback (email links + app buttons) | F14 | v1 | T22 | todo | | |
| ALR-07 | Daily summary email + alert latency metric | F7 | v1 | T23 | todo | | |

## Apply Kit

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| APL-01 | Rule-based Apply Kit (glance, fit, must/nice, keywords, timeline) | F10 | v1 | T24 | todo | | |
| APL-02 | Application questions (Greenhouse) + referral/recruiter links | F10 | v1 | T24 | todo | | |
| APL-03 | AI Apply Kit section via `LlmProvider` (Gemini free tier default) | F10 | v1 | T25 | todo | | |
| APL-04 | AI usage guard (daily request limit, caching, fallback) | F10 | v1 | T25 | todo | | |
| APL-05 | Smart Links panel on saved searches | F11 | v1 | T25 | todo | | |

## Tracker

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| TRK-01 | Save / Apply actions feeding the tracker | F12 | v1 | T26 | todo | | |
| TRK-02 | Kanban board + notes | F12 | v1 | T26 | todo | | |
| TRK-03 | Follow-up reminders by email | F12 | v1 | T26 | todo | | |

## Operations

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| OPS-01 | Sentry for web and Edge Functions | — | v1 | T27 | todo | | |
| OPS-02 | pgTAP RLS tests for every owner-only table | — | v1 | T27 | todo | | |
| OPS-03 | Nightly backup + restore test | — | v1 | T27 | todo | | |
| OPS-04 | Security review pass | — | v1 | T27 | todo | | |

## More sources (after v1)

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| SRC-01 | Workable adapter | F1 | v1.x | T28 | todo | | |
| SRC-02 | SmartRecruiters adapter | F1 | v1.x | T28 | todo | | |
| SRC-03 | Recruitee adapter | F1 | v1.x | T28 | todo | | |
| SRC-04 | Keka adapter (after terms review) | F1 | v1.x | T29 | todo | | |
| SRC-05 | Darwinbox adapter (after terms review) | F1 | v1.x | T29 | todo | | |
| SRC-06 | Zoho Recruit adapter (after terms review) | F1 | v1.x | T29 | todo | | |

## Go public

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| PUB-01 | Own domain + verified email sending + auth SMTP | F9 | public | T30 | todo | | |
| PUB-02 | Telegram bot alerts | F9 | public | T31 | todo | | |
| PUB-03 | Web Push + installable PWA | F9 | public | T32 | todo | | |
| PUB-04 | Open sign-ups + onboarding wizard | F4 | public | T33 | todo | | |
| PUB-05 | Landing page with live ticker | — | public | T34 | todo | | |
| PUB-06 | Public job pages + "How we get jobs" | F1 | public | T34 | todo | | |
| PUB-07 | Privacy policy, terms, consent screens | — | public | T35 | todo | | |
| PUB-08 | Data export + account deletion | F16 | public | T35 | todo | | |
| PUB-09 | Rate limits + security headers (CSP) | — | public | T36 | todo | | |
| PUB-10 | Product analytics + uptime monitors | — | public | T36 | todo | | |

## Later

| ID | Feature | PRD | Release | Task | Status | Done on | Notes |
|---|---|---|---|---|---|---|---|
| LTR-01 | Alert-email forwarding (LinkedIn/Naukri/Indeed) | F17 | later | T37 | todo | | |
| LTR-02 | Company pages (open roles, hiring velocity) | F18 | later | T38 | todo | | |
| LTR-03 | Weight suggestions from feedback | F14 | later | T38 | todo | | |
| LTR-04 | "Send to Jobbbs" browser button | F19 | later | T39 | todo | | |
