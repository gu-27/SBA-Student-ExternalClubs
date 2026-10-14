# Build Notes: SBA Student Group Standards

Working notes and current state for this repo, so the build can be picked back up later.
For the public-facing description, see [README.md](README.md).

**Last updated:** 2026-10-14

---

## Snapshot

| | |
|---|---|
| **Purpose** | The School of Business Administration's standard for how student groups operate. One page, published for student group leaders and their advisors. |
| **Live** | https://gu-27.github.io/SBA-Student-ExternalClubs/ |
| **Repo** | gu-27/SBA-Student-ExternalClubs (GitHub) |
| **Visibility** | Public repo. The page is **`noindex, nofollow`** — link-only, per the SBA/GSCG convention set 2026-09-13. |
| **Hosting** | GitHub Pages, source = `main` branch root, auto-rebuilds on push |
| **Status** | Complete and deployed. |

---

## What changed on 2026-10-14

The repo used to host a **review site**: the framework written three ways (Option A engagement
tiers, Option B one lifecycle plus information classification, and a Perspectives lens view) so
administrators could choose a structure.

**That choice has been made.** The tier structure won. John supplied the finished standard, and
the site was rebuilt as a single page.

Removed, and recoverable from git history at commit **`a42fcd5`**:
`option-a.html`, `option-b.html`, `perspectives.html`, `render.js`, `perspectives.js`,
`styles.css`, `content/option-a.md`, `content/option-b.md`, `content/perspectives.md`.

They were removed rather than left in place because a superseded policy still reachable at a
live URL is worse than one that 404s. Someone would eventually find Option B and follow it.

**Also gone: the markdown-as-source-of-truth architecture.** The old pages were thin clients
that fetched `content/*.md` and rendered it with `marked`. The standard is a hand-built page with
its content inline, so there is no longer a markdown layer, no `marked` dependency, and no
reason for the `.nojekyll` file beyond harmlessness (kept, since removing it only invites
Jekyll surprises).

---

## Architecture

One self-contained `index.html`. No build step, no framework, no fetches. Styles are in a single
`<style>` block and the tab interaction is one inline IIFE.

```
index.html   The whole site
.nojekyll    Vestigial; kept so Jekyll stays out of the way
README.md    Repo purpose + structure
NOTES.md     This file
```

**Page shape:** preamble (the two purposes, then the governing principle) → three entry cards →
three full sections (Tiers, Process, Roles and standards) → next step → footer.

---

## Brand

Gonzaga **academic** identity, not the GSCG one. Per the `gonzaga-brand` standard, SBA properties
are **navy dominant with red as the accent**; red-dominant is the GSCG/athletic register and
would be wrong here.

| Token | Value | Role |
|---|---|---|
| `--navy` | `#041E42` (PMS 282 C) | Dominant: identity bar, labels, links, active tab, card tops |
| `--gu-blue` | `#06274F` (PMS 540) | Body text |
| `--red` | `#C8102E` (PMS 186 C) | Accent only: the principle rule, the NDA callout, Tier 3, the due date |
| `--silver` | `#C3C6C8` (PMS 428 C) | Neutral |
| `--t1/t2/t3` | River Blue `#5E8AB4` / darkened Sunflower `#a9711a` / Red `#C8102E` | Escalating tier ramp from the GU secondary palette |

**Typography is the official GU stack**, loaded from Adobe Typekit (`zaj3ayb`): **Adelle**
(serif) for headings, **Proxima Nova** (sans) for body and UI, with **Figtree** from Google Fonts
as the free fallback when Typekit is unavailable.

**This replaced Inter**, which the previous build used and this file previously prescribed. The
reason: John asked for "the gonzaga branding", and Typekit Adelle + Proxima Nova *is* the
official institutional stack — Inter is the convention on John's own web properties, not
Gonzaga's. It also now matches `gscg.pages.dev`. Reverting is a two-line change if preferred.

**Note on the incoming design.** The supplied code used Archivo (sans) for headings and Source
Serif 4 (serif) for body — the opposite pairing to GU's. The swap means the UI elements that
were set in the display face (`.label`, `.tab`, `.back`, `.card .go`, `.cols h4`, row headers)
are now set in Proxima Nova at weight 600–700, because Adelle on a pill button reads as a
mistake. Headings, the principle line, `summary b` and `.callout strong` keep the serif.

**Dark mode** is supported (both `prefers-color-scheme` and `[data-theme]`), carried over from
the supplied design and re-tinted to the navy palette.

---

## Copy

**Verbatim from John's source**, with no edits. Two things worth a decision rather than a silent
fix:

- **`Due: [date]`** in the Next step box is an unfilled placeholder. It is styled in red so it
  cannot ship unnoticed, but it will go out as `[date]` if nobody fills it.
- **"1–2 weeks" vs "one to two weeks."** The tier table writes the lead time with an en dash; the
  Tier 2 panel spells it out. The repo's house style is no dash punctuation in copy, so the table
  is the odd one out. Left alone because changing John's wording was not the ask.

---

## How to work on it

**Local preview:** open `index.html` directly (no fetches, so `file://` works), or
`python3 -m http.server 8888`.

**Common edits**

- Change the standard's wording: edit `index.html`. There is no separate content file any more.
- Restyle: the `:root` block at the top of the `<style>` section holds every colour and font.

**Deploy:** commit and push to `main`. GitHub Pages rebuilds automatically.

---

## Open items

- **`Due: [date]`** needs a real date before this is sent to group leaders.
- **Terminology.** The page uses "advisor" throughout. Earlier drafts in this repo used
  "adviser", and the wider SBA docs also use "faculty champion". Three terms for one role.
- **Custom domain.** Still a `github.io` URL. Cloudflare Pages on a real domain is available if
  this becomes something sent to students formally.

---

## Changelog

| Date | Change |
|---|---|
| 2026-10-14 | Rebuilt as a single **SBA Student Group Standards** page from John's finished source; retired the three review pages; moved to the official GU Typekit stack |
| 2026-09-13 | `noindex, nofollow` added to every page (SBA/GSCG link-only sweep, from another session) |
| 2026-07-28 | Renamed the role figure from "professional" to "faculty adviser" in the naming references |
| 2026-07-28 | Replaced "adult" with "professional" throughout |
| 2026-07-19 | Added the Perspectives lens view as a third peer card and a tabbed page |
| 2026-07-17 | Added `.nojekyll` so Pages serves `content/*.md` raw; made repo public; enabled Pages |
| 2026-07-17 | Initial build: landing page plus Option A and Option B reader pages |
