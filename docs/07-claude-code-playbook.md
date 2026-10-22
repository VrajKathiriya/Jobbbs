# Jobbbs — Claude Code Playbook

How to build Jobbbs with Claude Code: what to install, which skills and tools to use at each step, and how to keep quality high while moving fast.

| | |
|---|---|
| **Status** | Draft v1.0 |
| **Date** | 22 Oct 2026 |

---

## 1. Principles

1. **Docs first, then code.** `CLAUDE.md` points Claude at these docs. When a decision changes, update the doc in the same pull request.
2. **One slice per session.** Ask for one small, testable change ("Greenhouse adapter + fixtures + tests"), not "build the backend". Use `/clear` between unrelated tasks.
3. **Plan before building.** Use plan mode (Shift+Tab to cycle modes, or ask "plan first") for anything touching the schema, scoring or alerts.
4. **Tests are the contract.** Core logic (adapters, normalizers, dedupe, scoring) is written test-first with recorded fixtures.
5. **Review everything.** `/code-review` before every merge; `/security-review` for anything touching auth, RLS, storage or secrets.
6. **Never paste secrets into chat.** Keys live in `.env.local` and provider secret settings. Claude reads names from `.env.example`.

## 2. Setup checklist (Phase 0)

| # | What | How |
|---|---|---|
| 1 | Project memory | `CLAUDE.md` already exists at the repo root (don't run `/init` over it). Keep it under ~150 lines; it links to `docs/`. |
| 2 | Official **frontend-design** plugin | Run `/plugin`, open Anthropic's official marketplace, install **frontend-design**. It pushes Claude away from generic AI-looking UI; pair it with [05-design-system.md](05-design-system.md) so it follows *our* direction instead of inventing one. |
| 3 | **Playwright MCP** (browser control for UI checks) | `claude mcp add playwright -- npx @playwright/mcp@latest` |
| 4 | **Supabase MCP** (schema inspection, SQL, logs) | Add with a personal access token, scoped to the **dev** project and **read-only** by default, e.g. `claude mcp add supabase -e SUPABASE_ACCESS_TOKEN=… -- npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=<dev-ref>`. Never connect it to prod with write access. Check Supabase's MCP docs for current flags. |
| 5 | **Context7** (up-to-date library docs) | `claude mcp add --transport http context7 https://mcp.context7.com/mcp`. Then prompts can say "use context7 for Next.js and Supabase docs". |
| 6 | GitHub | Use the `gh` CLI (Claude Code drives it well). Optional: GitHub's MCP server. |
| 7 | Vercel and Sentry (later) | Both offer official remote MCP servers; add when deploy and error triage start (Phase 6). |
| 8 | Figma (optional) | The claude.ai Figma connector must be authorized in your claude.ai connector settings before Claude can use it. |
| 9 | Hooks | Ask Claude: *"Use update-config to add a hook that runs Prettier and ESLint --fix on any file after Edit/Write."* The built-in **update-config** skill writes the correct `settings.json` for your OS. Add a pre-commit (lefthook) for typecheck + tests. |
| 10 | Fewer permission prompts | After a week of work, run `/fewer-permission-prompts` to allowlist the safe read-only commands you use often. |

## 3. Skills and commands to use, and when

### Built into this Claude Code install

| Skill / command | Use it for | Phase |
|---|---|---|
| `/code-review` | Review the current diff for bugs before every merge (`/code-review high` for scoring/alert code) | All |
| `/security-review` | Auth, RLS policies, storage, secrets, webhooks | 3, 4, 6 |
| `/simplify` | Clean up after a feature lands (reuse, dead code, over-abstraction) | All |
| `/run` | Launch the app and check a change actually works in the browser | 2–6 |
| `claude-api` | Only if you switch the Apply Kit to Claude (`AI_PROVIDER=anthropic`): model IDs, structured outputs, streaming | 5 |
| `dataviz` | Admin charts (detection latency, source health, quotas) | 1, 6 |
| `skill-creator` | Writing Jobbbs's own skills (§4) and testing that they trigger | 0 |
| `/loop` | Repeat a check on an interval, e.g. "every 5 min check the soak-test metrics" | 1, 4 |
| `/schedule` | Cloud routines, e.g. a weekly agent that checks each source's docs and terms for changes and opens an issue | 7 |
| `artifact-design` | Shareable pages (investor or friend demos, beta announcements) | 6 |

### From Anthropic's public skills repository

| Skill | Use |
|---|---|
| **webapp-testing** | Lets Claude drive your local app with Playwright to verify UI behavior and take screenshots |
| **frontend-design** (plugin above) | Distinctive UI generation |

Review the source of any third-party skill or plugin before installing it.

## 4. Jobbbs's own skills (create in Phase 0 with `skill-creator`)

Project skills live in `.claude/skills/<name>/SKILL.md` and load automatically when relevant.

### `add-job-source`
> Use when adding or changing a job source adapter.

Steps it encodes:
1. Read [04-data-sources-and-compliance.md](04-data-sources-and-compliance.md). Confirm the endpoint is public and permitted; record the verification in the decision log.
2. Record 3+ real fixtures (normal, empty, edge case) into `packages/core/test/fixtures/<source>/`.
3. Implement `SourceAdapter` with a Zod schema for the payload; `normalize` must be pure.
4. Tests: fixtures → expected `NormalizedJob`s; malformed payload → ZodError; 429/5xx handling.
5. Register the adapter, add a `boards` seed row, run one live poll in dev, and check `ingest_runs`.

### `jobbbs-ui`
> Use for any UI work in `apps/web`.

Encodes: tokens only (no hex in components), Hanken Grotesk + JetBrains Mono, radius 4/6/8, borders over shadows, Phosphor icons, the job-row anatomy, freshness and score rules, the copy rules, keyboard shortcuts, the "looks AI-made" list from [05 §2](05-design-system.md#2-why-sites-look-ai-made-and-what-we-do-instead), and a final check: screenshot at 1440 px and 390 px in light and dark.

### `db-change`
> Use for any schema change.

Encodes: `supabase migration new <name>`; RLS + explicit `GRANT`s for every new table; indexes for new filters; a pgTAP test for owner-only access; `supabase gen types typescript` into `apps/web/lib/database.types.ts`; never edit applied migrations.

### `release-check`
> Use before merging to main or deploying.

Runs: lint, typecheck, unit tests, build, `supabase db lint`, a grep of build output for the service-role key, then `/code-review`, and `/security-review` when auth, RLS or storage changed.

## 5. Subagents (`.claude/agents/`)

| Agent | Job | Tools |
|---|---|---|
| `source-adapter-engineer` | Builds one adapter end-to-end using the `add-job-source` skill | Read, Edit, Write, Bash, WebFetch |
| `ui-reviewer` | Opens pages with Playwright MCP at desktop and phone widths, compares them against `05-design-system.md`, reports concrete issues | Read, Playwright MCP |
| `rls-auditor` | Reads migrations and policies, writes pgTAP tests that try cross-user access | Read, Write, Bash |
| `test-writer` | Turns real bug reports and fixtures into regression tests | Read, Edit, Write, Bash |

You can run independent slices in parallel using **git worktrees**, e.g. a Lever adapter in one worktree while the feed UI is built in another.

## 6. Working from the trackers

All implementation work goes through [10-task-tracker.md](10-task-tracker.md). Each task ends with a production deploy and a verification checklist, then both trackers are updated.

**Next task**
> Read CLAUDE.md and docs/10-task-tracker.md. Start the next task whose dependencies are done, following "How to use this file". Plan first if the task says so.

**A specific task**
> Do T12 from docs/10-task-tracker.md.

**Close a task after you've verified it**
> T12 is verified in production. Close it: tick its checklist, update both trackers, record anything new in the decision log, and commit.

**Status check**
> Summarize project status from docs/09-feature-tracker.md and docs/10-task-tracker.md: done, in progress, blocked, and what's next.

## 7. Prompt library

Copy, paste, adjust. Each assumes `CLAUDE.md` is loaded.

**Phase 0: scaffold**
> Read CLAUDE.md and docs/03 and docs/02 §12. Plan the Phase 0 scaffold: pnpm workspace with apps/web (Next.js App Router, TypeScript strict, Tailwind v4), packages/core (pure TS, Vitest), supabase/ (CLI init). Add ESLint, Prettier, CI workflow and .env.example. Don't add features. Show me the plan first.

**Phase 0: spike S1**
> Write a throwaway Supabase Edge Function in supabase/functions/spike-poll that fetches the Greenhouse board list for the tokens in spike-tokens.json with concurrency 10, and returns wall time, number of postings and bytes. No database writes. I'll deploy it to dev and run it.

**Phase 1: first adapter**
> Use the add-job-source skill to implement the Greenhouse adapter. The fixtures are in packages/core/test/fixtures/greenhouse/. Follow the SourceAdapter interface in docs/02 §2.2 exactly.

**Phase 1: ingest**
> Plan the ingest-tick Edge Function from docs/02 §2.1–2.5: claim_due_boards, write-light polling, lifecycle, backoff, ingest_runs. Put all logic that can be pure into packages/core; the function should be a thin runner.

**Phase 2: UI foundation**
> Use the jobbbs-ui skill. Build /dev/ui with JobRow, ScoreRing, FreshnessPill, SkillChip, SourceChip and FilterChip in all states, using sample data marked as sample. Screenshot at 1440 and 390 px in light and dark.

**Phase 3: scoring**
> Implement packages/core/scoring from docs/02 §3 test-first. Start by writing the 30 golden cases as a table-driven Vitest file; show me the cases before implementing.

**Phase 4: email alerts**
> Plan the pipeline function's match → notify path from docs/02 §4 and the personal-edition email rules in §4.5: Resend test sender to ALERT_EMAIL_TO, 5-minute bundling, 80/day cap with hourly-digest fallback, quiet hours, idempotency key. Include a replay test that pushes the same job event 10 times and expects exactly one email.

**Phase 5: Apply Kit AI (T25)**
> Plan T25 from docs/10-task-tracker.md. Add an LlmProvider interface in packages/core and a Gemini provider using the official @google/genai SDK (check its current docs with context7). Use JSON-schema structured output, stream the response, cache the job-level part in apply_kits, and enforce AI_DAILY_REQUEST_LIMIT via ai_usage. Send only the job text plus my skills, years and target titles, never name, contact details or resume text (ADR-016).

**Any phase: review**
> /code-review high

## 8. Definition of done for any change

- [ ] Matches the relevant doc (or the doc is updated in the same PR)
- [ ] Tests added or updated and passing; typecheck and lint clean
- [ ] New tables have RLS + grants + a pgTAP test
- [ ] UI follows `05-design-system.md`; checked at phone width and in dark mode
- [ ] No secrets in code, logs or client bundles
- [ ] `/code-review` run, and findings fixed or explicitly deferred
