# jobbbs

**Jobs, the minute they go live.**

Jobbbs is a personal job radar. It watches company career boards and job feeds directly, scores every new job against your profile, emails you within minutes, and gives you what you need to apply before the listing spreads to the big job sites.

> **Status:** planning complete; building the **personal edition** (single user, email alerts) first, target 30 Dec 2026. A public edition with Telegram and push alerts comes later. See the [roadmap](docs/06-roadmap.md).

## Why it's faster

Most tech companies publish a job on their own applicant tracking system (Greenhouse, Lever, Ashby…) before it reaches LinkedIn, Naukri or Indeed. Jobbbs polls those public boards every 10–30 minutes and alerts matching users right away, so they can apply on the company's own site while the applicant pile is still small.

Jobbbs does **not** scrape LinkedIn, Naukri or Indeed. For those platforms it offers one-click "last hour" searches and, later, forwarding of your own alert emails. See [data sources](docs/04-data-sources-and-compliance.md).

## Planning documents

| # | Document | What's in it |
|---|---|---|
| 01 | [Product requirements](docs/01-product-requirements.md) | Problem, personas, features (MoSCoW), user stories, journeys, NFRs, metrics |
| 02 | [System design](docs/02-system-design.md) | Architecture, ingestion engine, de-duplication, scoring formula, alerts, data model, API, capacity |
| 03 | [Tech stack and deployment](docs/03-tech-stack-and-deployment.md) | Stack choices with alternatives, free-tier budget, costs by stage, CI/CD, environments |
| 04 | [Data sources and compliance](docs/04-data-sources-and-compliance.md) | Source catalog, ATS detection, Smart Links, polling etiquette, DPDP checklist |
| 05 | [Design system](docs/05-design-system.md) | Visual identity, tokens, components, layout, copy rules, how to avoid an AI-made look |
| 06 | [Roadmap](docs/06-roadmap.md) | 12-week plan, phases, milestones, definitions of done |
| 07 | [Claude Code playbook](docs/07-claude-code-playbook.md) | Plugins, MCP servers, skills, subagents, prompts per phase |
| 08 | [Decision log](docs/08-decision-log.md) | Owner decisions (D1–D5), accepted ADRs, spike results |
| 09 | [Feature tracker](docs/09-feature-tracker.md) | Every feature with release, task and status |
| 10 | [Task tracker](docs/10-task-tracker.md) | T01–T39: deployable tasks with build lists and production checklists |

## Stack in one line

Next.js + TypeScript + Tailwind on Vercel · Supabase (Postgres, Auth, Storage, Cron, Edge Functions, Queues) in Mumbai · Resend email alerts (Telegram + Web Push in the public edition) · Gemini free tier for the Apply Kit (Claude optional) · ₹0/month for the personal edition.

---

`JobRadar_Project_Requirements_and_Implementation_Plan.docx` holds the original raw notes. The documents above supersede it.
