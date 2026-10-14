# SBA Student Group Standards

The School of Business Administration's standard for how student groups (clubs, consulting
groups, and the like) operate: what they may do, what planning each level of work requires, and
who approves it.

**Live:** https://gu-27.github.io/SBA-Student-ExternalClubs/ — shared by direct link and
carries `noindex`, so it will not turn up in search.

## What the page covers

- **Tiers of engagement.** Three levels, from internal events to client projects. Each tier
  reaches further outside the school, so each raises the planning and oversight to match.
  - *Tier 1 · Internal* — students working with students inside the business school.
  - *Tier 2 · External exposure* — guest speakers, outside trainers, public promotion. Goes
    through ZAG Activities; the dean approves.
  - *Tier 3 · External business* — work for an outside organization. The faculty advisor
    approves the client and the scope before anything is confirmed.
- **The process.** The same five steps for every activity; what changes by tier is how much the
  plan has to cover. A tabbed view shows what each tier asks for.
- **Roles and standards.** Students, faculty advisor, and the School of Business, plus the
  standards that hold at every tier: social media, email, name and logo, university resources,
  information and files, updates and records.

The governing principle: **freedom is earned by showing a plan.**

## History

This repo previously hosted a **review site** that presented the framework three ways — Option A
(engagement tiers), Option B (one lifecycle plus information classification), and a Perspectives
lens view — so administrators could say which structure they preferred.

That decision has been made. The tier structure won, and this single page is the standard that
resulted. The three review pages and their markdown sources were removed on 2026-10-14 and
remain in git history at commit `a42fcd5`.

## Build

One self-contained `index.html`: no build step, no framework, no dependencies to install. Styles
and the tab script are inline.

**Brand:** Gonzaga academic identity. Navy `#041E42` dominant, Gonzaga red `#C8102E` as a
sparing accent, silver neutral. Official GU typography through Adobe Typekit — Adelle for
headings, Proxima Nova for body and UI — with Figtree from Google Fonts as the free fallback.

**Local preview:** open `index.html` directly, or `python3 -m http.server 8888`.

**Deploy:** commit and push to `main`. GitHub Pages serves the repo root and rebuilds
automatically, usually live within a minute.
