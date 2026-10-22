# Jobbbs — Design System

| | |
|---|---|
| **Status** | Draft v1.0 — the reference for every UI change. Claude Code must follow this file (see [CLAUDE.md](../CLAUDE.md)). |
| **Date** | 22 Oct 2026 |

---

## 1. What Jobbbs should feel like

**A precise instrument, not a brochure.** Jobbbs is a tool people open several times a day to triage new jobs quickly. It should feel like a well-made email client or trading screen: dense, calm, fast and trustworthy. Every element shows real information.

Three words: **live, exact, calm.**

- **Live:** freshness is the product. Time is always visible, precise and in the user's timezone.
- **Exact:** numbers are real, aligned and explained. No vague marketing claims.
- **Calm:** one accent color, quiet surfaces, motion only when something actually changed.

## 2. Why sites look AI-made, and what we do instead

| Looks AI-generated | Jobbbs does this instead |
|---|---|
| Purple-to-blue gradient hero, gradient text | Flat surfaces. One green accent, used for actions and "live" only. |
| Centered hero with a vague headline ("Unlock your dream career ✨") | Left-aligned, specific headline ("Jobs, the minute they go live."), with a **live ticker of real detections** under it |
| Three feature cards with icons in a row | Real product UI crops showing the actual feature, with one sentence each |
| Glassmorphism, blur, glow, big soft shadows | 1 px borders; a single shadow, only for floating menus |
| `rounded-2xl` on everything | Radius scale 4 / 6 / 8 px; full rounding only for pills |
| Emoji as icons or section markers | Phosphor icons at 16/20 px, only where they help recognition |
| Inter + default shadcn look | Hanken Grotesk + JetBrains Mono; restyled components |
| Fake logos, testimonials, "10,000+ users" | Only real numbers from our own database ("1,482 career boards watched · updated 2 min ago") |
| Stock 3D illustrations | None. The product is the illustration. |
| Animations everywhere | One signature motion (new-job arrival) plus quick hover/press feedback |
| Generic copy | Specific, plain copy that names real sources, times and numbers |

## 3. Tokens

Tokens live in `apps/web/app/globals.css` as CSS variables and are mapped into Tailwind v4's `@theme`. Components never use raw hex values.

### 3.1 Color

| Token | Light | Dark | Use |
|---|---|---|---|
| `--canvas` | `#F4F6F4` | `#0D1210` | App background behind panels |
| `--paper` | `#FFFFFF` | `#141A17` | Panels, list, cards |
| `--ink` | `#111714` | `#E6ECE8` | Primary text |
| `--ink-2` | `#4A554F` | `#A7B2AC` | Secondary text, metadata |
| `--ink-3` | `#6B756F` | `#808B85` | Muted text, placeholders, "older" times (both pass 4.5:1 on `--paper`) |
| `--line` | `#E1E6E2` | `#26302B` | Borders, dividers |
| `--accent` | `#0B7A55` | `#4CC497` | Primary actions, focus, "live", strong scores |
| `--accent-ink` | `#FFFFFF` | `#06231A` | Text on accent backgrounds |
| `--accent-soft` | `#E2F2EA` | `#15392B` | Selected row, accent backgrounds |
| `--warm` | `#9A5B00` | `#E2A64A` | "Today" freshness (1–24 h), warnings |
| `--danger` | `#B42318` | `#F2836B` | Destructive actions, errors |

**Why green:** it reads as "new" and "go", it matches the radar idea, and it separates us from the blue of LinkedIn, Naukri and Indeed.

### 3.2 Typography

| Role | Face | Sizes / weights |
|---|---|---|
| UI and headings | **Hanken Grotesk** | 400 / 500 / 600 / 700 |
| Numbers, times, scores, codes | **JetBrains Mono** | 400 / 500, `font-variant-numeric: tabular-nums` |

Type scale (px): **12 · 13 · 14 · 16 · 20 · 24 · 32 · 44**
- App base size **14 px** (dense); marketing base **17 px**.
- Headings: weight 650–700, letter-spacing −0.01em to −0.02em, `text-wrap: balance`.
- Small uppercase labels: 11–12 px, weight 600, letter-spacing +0.06em.
- Line length at most 70 characters for reading text (job descriptions, Apply Kit).

### 3.3 Space, radius, elevation

- **Spacing:** 4 px base → `4, 8, 12, 16, 20, 24, 32, 48, 64`.
- **Radius:** `--r-1: 4px` (inputs, chips), `--r-2: 6px` (buttons), `--r-3: 8px` (panels, dialogs), `--r-pill: 999px` (status pills only).
- **Elevation:** borders first. One shadow token, `--shadow-pop`, for menus, popovers and toasts only.

### 3.4 Motion

- Hover and press: 120 ms ease-out (color, background).
- Panels and sheets: 180 ms ease-out (transform + opacity).
- **Signature motion, new-job arrival:** the new row slides down 8 px and its background fades from `--accent-soft` to `--paper` over 1.2 s. Nowhere else.
- `prefers-reduced-motion`: no movement, color fade only.

## 4. Layout

**Desktop (≥ 1200 px): three panes, like a mail client.**

```
┌──────────────┬──────────────────────────────┬────────────────────────────────────┐
│ jobbbs       │ Search React, Bengaluru…   ⌘K│  Frontend Engineer                  │
│              │ [Remote ▾][2–4 yrs ▾][₹18L+▾]│  Kestrel Pay · Bengaluru · Hybrid   │
│ Feed      38 │ Sort: Apply first ▾  3 new ↑ │  ● Detected 7 min ago · Greenhouse  │
│ Alerts     4 │──────────────────────────────│  ┌──── 82 ────┐ Strong match         │
│ Watchlist 12 │▌Frontend Engineer       82  │  │ Skills     25.7/35  ✓ React ✓ TS │
│ Tracker    9 │ Kestrel Pay · BLR · Hybrid   │  │ Experience 20/20   2–4 yrs        │
│              │ ● 7m · Greenhouse  React TS  │  │ Salary     —       not listed     │
│ Saved        │──────────────────────────────│  └───────────────────────────────── │
│ · React BLR  │ Backend Engineer II     76  │  [Apply on Greenhouse ↗] [Save]      │
│ · Remote IN  │ Tidewater Health · Remote IN │                                      │
│              │ ● 18m · Lever      Go  gRPC  │  Apply Kit                            │
│              │──────────────────────────────│  Must-have  React, TypeScript, …     │
│ Settings     │ Data Engineer           71  │  You're missing  GraphQL              │
└──────────────┴──────────────────────────────┴────────────────────────────────────┘
   232 px            min 420 px                       flexible, max 760 px text
```

- **Tablet (768–1199 px):** two panes (list + detail); nav collapses to an icon rail.
- **Phone (< 768 px):** the list is full screen; a job opens as a full-screen sheet; bottom tab bar (Feed · Alerts · Tracker · Profile); filters open in a bottom sheet. Tap targets at least 44 px.

## 5. Components

### 5.1 Job row (the most important component)

```
▌ Frontend Engineer                                         82
  Kestrel Pay · Bengaluru · Hybrid · ₹18–28L · 2–4 yrs
  ● 7m · Greenhouse     React  TypeScript  +3        Save   Apply ↗
```

- Line 1: title (14 px, 600) and score (mono, right-aligned).
- Line 2: company · location · mode · salary · experience (13 px, `--ink-2`). Unknown values are left out, not shown as "N/A".
- Line 3: freshness pill, source, up to 3 matched skills (chips), actions on hover or focus (always visible on touch).
- Selected row: `--accent-soft` background + 2 px left bar in `--accent`.
- Seen rows: title weight drops to 500.
- Row height is fixed at 76 px on desktop for scan rhythm.

### 5.2 Score

- A number in JetBrains Mono plus a thin ring (2.5 px stroke). The ring fills in proportion to the score.
- Bands: **85–100 Strong** (ring `--accent`), **70–84 Good** (`--ink`), **50–69 Partial** (`--ink-2`), **< 50 Low** (`--ink-3`). No traffic-light red/green.
- A **confidence** dot sits beside it: filled = high, half = medium, outline = low. The tooltip explains it ("Salary not listed; scored on 90% of factors").
- The breakdown is a table, not a chart: factor · weight · points · reason.

### 5.3 Freshness pill

| Age | Display | Style |
|---|---|---|
| < 60 min | `● 7m` | `--accent` dot (pulses for the first 10 min), `--accent` text |
| 1–24 h | `3h` | `--warm` text |
| > 24 h | `2d` | `--ink-3` text |

The tooltip always shows both times: "Detected 10:42 IST · Posted at source 10:35 IST", or "Posted time not provided by source".

### 5.4 Other components

| Component | Notes |
|---|---|
| **Filter bar** | Chips that open popovers; active chips show their value ("2–4 yrs"); "Clear all" appears when any filter is set. Filters live in the URL. |
| **Source chip** | Neutral outline chip with the source name. "Also on Adzuna" chips use `--ink-3`. |
| **Skill chip** | Matched = `--accent-soft` background; missing = dashed outline; neutral = `--line` outline. |
| **Apply Kit** | Sections with small uppercase labels. AI-written blocks carry a quiet "Written by AI from the job description" label and a regenerate button. |
| **Tracker** | Kanban columns of compact cards; drag on desktop, status menu on mobile. Follow-up date shown in mono. |
| **Empty states** | Say what will appear and the next action: "No jobs match yet. Jobbbs checks 1,482 boards every 10–30 minutes. Widen the salary filter or add Remote." |
| **Loading** | Skeleton rows at the real row height. No spinners in lists. |
| **Errors** | Inline, specific, with a retry: "Couldn't load jobs. Your filters are saved. Retry." |
| **Toasts** | Bottom-left, 4 s, past tense: "Saved", "Alert created", "Moved to Applied". |

## 6. Keyboard

| Key | Action | | Key | Action |
|---|---|---|---|---|
| `j` / `k` | Next / previous job | | `/` | Focus search |
| `o` / `Enter` | Open job | | `f` | Open filters |
| `s` | Save | | `g f` / `g t` | Go to Feed / Tracker |
| `a` | Apply (opens link, marks Applying) | | `?` | Show shortcuts |
| `x` | Hide job | | `Esc` | Close panel |

Shortcut hints appear in tooltips and menus (`Save  S`), so they're discoverable.

## 7. Writing style

- Second person, present tense, plain words. Specific beats clever.
- Name real things: "Greenhouse", "10:42 IST", "₹18–28 LPA", "every 10 minutes".
- Buttons say exactly what happens: "Apply on Greenhouse", "Create alert", "Connect Telegram".
- Errors say what happened and what to do; no apologies, no "Oops".
- Indian conventions: LPA for salaries in India, lakh/crore digit grouping (₹1,20,000), IST by default for Indian users; city names as people say them (Bengaluru, Gurugram), with aliases searchable.
- Never: "unlock", "supercharge", "dream job", "AI-powered" as a headline, exclamation marks in UI, emoji in product UI.

## 8. Landing page

1. **Hero (left-aligned):** "Jobs, the minute they go live." + one sentence: "Jobbbs watches company career pages directly and alerts you within minutes, before the listing spreads to the big job sites." + **Start free** + a **live ticker** of the latest real detections (title · company · "4 min ago").
2. **How it works:** three real UI crops: the feed with freshness, the score breakdown, a Telegram alert.
3. **Coverage, live from the database:** boards watched, jobs detected today, median detection time (published only once H1 is measured).
4. **Honest FAQ:** "Do you scrape LinkedIn?" "No. Here's how we stay fast…"; "Is the score my chance of getting hired?" "No. It measures fit with what you told us."
5. **Footer:** How we get jobs · Privacy · Terms · Contact.

## 9. Brand

- **Wordmark:** lowercase **jobbbs** in Hanken Grotesk 700, tight tracking. The three ascenders of "bbb" rise 0 / +1 / +2 px like a signal-strength meter, the one playful detail.
- **App icon:** a rounded-square `--accent` tile with the three-bar "bbb" glyph in `--accent-ink`.
- **Favicon:** the glyph alone.

## 10. Accessibility (WCAG 2.2 AA)

- Text contrast ≥ 4.5:1 (body) and ≥ 3:1 (large text and UI parts), in both themes.
- Visible focus: 2 px `--accent` outline, 2 px offset, on every interactive element.
- Never color alone: scores have numbers, freshness has text, skill state has icons (✓ / dashed).
- New-job announcements use `aria-live="polite"` ("3 new jobs. Press Shift+N to show.").
- Hit targets ≥ 24 px desktop, ≥ 44 px touch.
- Full keyboard operation; skip link; landmarks (`nav`, `main`, `aside`).

## 11. Implementation notes

- Initialize shadcn/ui, then edit the generated components to use Jobbbs tokens, radius scale and Phosphor icons. Remove default shadows and ring colors.
- Use `next/font/google` for both families with `display: swap` and fallback stacks (`ui-sans-serif, system-ui` / `ui-monospace, SFMono-Regular, Menlo`).
- Store theme in a cookie (`light` / `dark` / `system`) to avoid a flash of the wrong theme.
- Build these components first in an internal `/dev/ui` page (Phase 2): JobRow, ScoreRing, FreshnessPill, SkillChip, SourceChip, FilterChip, Breakdown table. Every later screen is assembled from them.
- References worth studying (for craft, not to copy): Linear (density, keyboard), Superhuman (triage flow), Hacker News (information density), Stripe Docs (typography), Raycast (command palette).
