# Jobbbs — Decision Log

Every significant decision gets a short entry: context, decision, consequences. Add new ones at the bottom of each section; never delete. Superseded entries are marked, not removed.

---

## Owner decisions (answered 22 Oct 2026)

| ID | Question | Answer | Consequence |
|---|---|---|---|
| **D1** | Commit to **not scraping** LinkedIn, Naukri or Indeed; use direct ATS boards + aggregator APIs + Smart Links + forwarded alert emails instead? | **Agreed** | Data strategy in [04](04-data-sources-and-compliance.md) is final. |
| **D2** | Focus on **India-based tech roles + remote roles open to India**? | **Yes** | Seed list, skills taxonomy and parsers target this. |
| **D3** | Which AI model for the Apply Kit? | **Gemini free tier** (revised the same day; first answer was `claude-opus-5-5`) | ₹0. Claude stays available behind the same interface. See ADR-016. |
| **D4** | Buy a domain? | **Not now.** The first version is for the owner only, with alerts by **email to the owner** (no Telegram). | Resend's test sender (`onboarding@resend.dev`) can send to the email on your own Resend account without a domain. Buy a domain when other people start using Jobbbs. See ADR-013, ADR-014. |
| **D5** | Charge money or show ads within 6 months? | **No** | Vercel Hobby (non-commercial) is fine. Revisit before any monetization. |

## Open questions

None right now. Add new ones here as they come up.

---

## Accepted decisions

### ADR-001 — Name and positioning
- **Decision:** The product is **Jobbbs**, a personal job radar (not a job board, not an auto-apply bot).
- **Consequences:** Feature priorities favor speed, explanation and alerts over listing volume.

### ADR-002 — Source-first ingestion
- **Context:** Being early is the product promise. Employers publish first on their own ATS.
- **Decision:** The primary data channel is direct polling of public ATS job boards (Greenhouse, Lever, Ashby first), tiered by importance.
- **Consequences:** Coverage depends on our company list; we invest in an ATS detector and self-growing discovery.

### ADR-003 — TypeScript monorepo with a pure core
- **Decision:** pnpm workspace: `apps/web`, `packages/core` (pure, runtime-agnostic), `supabase/`.
- **Consequences:** Scoring and adapters run identically in Next.js and Edge Functions; workers can move to any runtime later. Spike S2 confirms the import path.

### ADR-004 — Next.js on Vercel Hobby for build and beta
- **Decision:** Next.js App Router, hosted on Vercel Hobby with Mumbai functions.
- **Consequences:** Free and fast to ship, but non-commercial only (D5). No Vercel-only APIs, to keep the Cloudflare/OpenNext exit open.

### ADR-005 — Supabase as the backend platform
- **Decision:** Supabase Postgres (pgvector, pg_trgm, pgmq, pg_cron, pg_net), Auth, Storage, Realtime, Edge Functions. Region: Mumbai.
- **Consequences:** One vendor for data, auth and jobs; 500 MB DB limit means lean storage and pruning; free-plan pause and no backups are handled with cron activity and a nightly dump.

### ADR-006 — Background work on Supabase Cron + Edge Functions
- **Context:** Vercel Hobby cron is daily only; Cloudflare free allows 10 ms CPU and 50 subrequests; GitHub Actions schedules drift and are meant for CI.
- **Decision:** `ingest-tick` every 60 s; `pipeline` invoked on new jobs + 2-min sweeper; `digest` hourly; `maintenance` daily.
- **Consequences:** About 110k invocations/month of the 500k free. Revisit at more than 300k polls/day.

### ADR-007 — Deterministic, explainable scoring
- **Decision:** Weighted score in TypeScript with unknown-aware averaging and a confidence value; embeddings from Supabase's built-in `gte-small`; LLMs only on demand (Apply Kit).
- **Consequences:** Free to run, testable with golden cases, explainable in the UI.

### ADR-008 — Telegram and Web Push first, email for digests *(deferred to the Go-public phase; see ADR-014)*
- **Decision:** Instant alerts via Telegram and Web Push; email for weekly/daily digests and auth.
- **Consequences:** Email is the first paid line item (~600 users). Telegram linking flow needed in onboarding.

### ADR-009 — Postgres search
- **Decision:** FTS + pg_trgm + keyset pagination; no external search engine until more than 200k active jobs.

### ADR-010 — Visual identity
- **Decision:** Hanken Grotesk + JetBrains Mono; green accent `#0B7A55`; three-pane dense layout; restyled shadcn/ui; Phosphor icons. See [05](05-design-system.md).

### ADR-011 — Honesty rules
- **Decision:** Never show applicant counts; always show source and both timestamps; label predicted salaries; publish detection-latency claims only after measuring them.

### ADR-012 — Data retention
- **Decision:** Resume files not stored by default (parse and discard); closed jobs pruned after 30 days (fingerprint tombstones kept for repost detection); ingest logs 14 days; notifications 90 days.

### ADR-013 — Personal edition first
- **Context:** The owner wants to use Jobbbs personally first and decide on opening it to others later (D4).
- **Decision:** Build a **personal edition** (single owner) through Phase 5. Keep the multi-user schema and RLS exactly as designed, because they cost little now and avoid a rewrite later. Defer the public-facing work (landing page, public job pages, onboarding wizard, Telegram/Web Push, legal pages, data-rights screens, domain) to a **Go-public** phase.
- **Consequences:** Personal v1 is planned for 30 Dec 2026 instead of a public beta on 17 Jan 2027. After creating the owner's account, **turn off new sign-ups** in Supabase Auth so nobody else can register on the public URL. Sign in with Google, which needs no auth emails.

### ADR-014 — Alerts by email to the owner, no domain
- **Context:** The owner wants email alerts only, sent to themselves.
- **Decision:** Send from Resend's test sender `onboarding@resend.dev` to the owner's Resend account email (`ALERT_EMAIL_TO`). Resend allows this without a verified domain; sending to anyone else returns a 403.
- **Batching rule:** send as soon as a match is found; matches found within 5 minutes of the previous email join the next one; hard cap 80 emails/day (Resend free allows 100/day, 3,000/month), after which alerts roll into an hourly digest until midnight IST. Quiet hours hold alerts for a morning bundle.
- **Phone setup:** a Gmail filter on the sender (never send to spam, mark important, label "Jobbbs") with notifications on for that label gives near-instant phone alerts.
- **Consequences:** No domain cost. Going public later requires a domain, Resend domain verification (SPF/DKIM), and Telegram/Web Push (ADR-008).

### ADR-015 — Apply Kit AI on Claude Opus 5.5 *(superseded by ADR-016; notes apply only if `AI_PROVIDER=anthropic`)*
- **Decision:** `AI_MODEL=claude-opus-5-5` with `AI_MONTHLY_BUDGET_USD=10` enforced via `ai_usage`.
- **Implementation notes (Phase 5, use the `claude-api` skill):** set `output_config.effort` explicitly (Opus 5.5 defaults to `medium`); use structured outputs for the JSON parts; stream the response; check `stop_reason` for `refusal` and enable server-side fallbacks; cache job-level output in `apply_kits`.
- **Consequences:** About $0.05 per kit, so 100 kits ≈ $5/month. The Claude API is billed separately from a Claude Code subscription and needs prepaid API credits. The rule-based kit keeps working if the cap is reached.

### ADR-016 — Apply Kit AI on the Gemini free tier, behind a provider interface
- **Context:** The owner asked to use a free Gemini API key instead of paying for the Claude API.
- **Decision:** `packages/core` defines an `LlmProvider` interface. Default `AI_PROVIDER=gemini` with a free-tier Flash model (`AI_MODEL`, chosen from what Google AI Studio offers free at setup time), called through the official `@google/genai` SDK. `AI_PROVIDER=anthropic` with `claude-opus-5-5` remains a one-variable switch (ADR-015 notes apply).
- **Data rule:** on Gemini's free tier, Google may use prompts and responses to improve its products, and human reviewers may read them (EEA/UK/Swiss users are treated differently; India is not). So the Apply Kit sends **only the public job text plus your skills, years of experience and target titles**, never your name, contact details or resume text. Resume parsing stays non-AI (T16).
- **Limits:** free quotas are set per project, shown in AI Studio, and have changed several times in 2026. Set `AI_DAILY_REQUEST_LIMIT` below the shown quota; on a 429 or the limit, the AI section says it's unavailable and the rule-based kit still works. Pro models may not be free; use a Flash model.
- **Consequences:** The personal edition costs ₹0 to run. Draft quality may be lower than Opus 5.5 but is enough for summaries and first drafts. Before going public, revisit: one free quota shared by all users won't scale, and other people's data needs a paid tier with no-training terms.

### ADR-017 — Work in deployable tasks
- **Decision:** The roadmap is broken into tasks in [10-task-tracker.md](10-task-tracker.md); each task holds 2–3 small or 1–2 big features from [09-feature-tracker.md](09-feature-tracker.md) and ends with a production deploy plus a verification checklist.
- **Consequences:** Something new works in production after every task. A feature is `done` only when its task is verified in production.

### ADR-018 — Toolchain versions and scaffold conventions (T01)
- **Decision:** Node **24 LTS** everywhere (`.nvmrc`, CI, `engines` for Vercel); **pnpm 10.34.7** pinned in `packageManager` (pnpm 12 is out, but Corepack's bundled loader can't run it yet); **TypeScript 6.0** (not 7: `typescript-eslint` supports only `<6.1`); **ESLint 9** flat config (not 10: `eslint-plugin-react` supports only up to 9); Next.js 16.4, React 19, Tailwind 4.3, Vitest 5. GitHub Actions are pinned to commit SHAs.
- **Conventions:** relative imports inside `packages/core` include the `.ts` extension so the same source can run in Deno. Core's tsconfig loads no Node or DOM types, and its ESLint config rejects Node built-ins and the `process`, `Deno` and `Buffer` globals in `src/`. Root `pnpm lint` runs `prettier --check` (Markdown excluded) and then ESLint in each package. The web `typecheck` runs `next typegen` first, so it works on a clean checkout.
- **Consequences:** Move to TypeScript 7 and ESLint 10 once the lint plugins support them, and record that move here.

---

## Spike results (fill in during Phase 0)

| Spike | Result | Date | Follow-up |
|---|---|---|---|
| S1 Edge Function polling throughput | | | |
| S2 Shared core in Node + Deno | | | |
| S3 Cron reliability (24 h) | | | |
| S4 Resend email to self arrives on phone (Gmail label notification) | | | |
| S5 ATS endpoints and terms verified | | | |
| S6 Indian employers on public ATS (H2) | | | |

## Free-tier verification (fill in during Phase 0)

| Provider | Limit assumed in docs | Verified value | Date |
|---|---|---|---|
| Supabase | 500 MB DB · 5 GB egress · 500k function invocations · 1 GB storage · 50k MAU · pauses after ~7 days idle | | |
| Vercel Hobby | Non-commercial · 1M invocations · 4 CPU-h · 100 GB transfer · daily cron only | | |
| Resend | 3,000/mo · 100/day | | |
| Adzuna | ~1,000 calls/mo | | |
