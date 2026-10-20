# Build Notes: SBA Student Organization Standards

> ## RETIRED. The page moved on 2026-10-20.
>
> **It now lives at https://gu-sba.pages.dev/student-organizations/**, built from
> `~/projects/gu-sba/student-organizations/`. This repo serves a redirect stub and nothing
> else. Edit the page at its new home. Changes made here are not published.
>
> Everything below is kept as the build history of the page up to the move. It is accurate
> about how the page was built and why. It is no longer accurate about where it lives.

Working notes from when this repo published the page. For the public-facing description, see
[README.md](README.md).

**Last updated:** 2026-10-20 (retired)

---

## Snapshot

| | |
|---|---|
| **Purpose** | The School of Business Administration's standard for how student **organizations** operate. One page, two audiences: faculty/administration, and students deciding whether to propose a new organization. |
| **Live** | https://gu-sba.pages.dev/student-organizations/ (moved 2026-10-20) |
| **Was live at** | https://gu-27.github.io/SBA-Student-ExternalClubs/, now a redirect stub |
| **Page source** | `~/projects/gu-sba/student-organizations/index.html` |
| **This repo** | gu-27/SBA-Student-ExternalClubs. Retired. Redirect only. |
| **Visibility** | The page is **`noindex, nofollow`**, link-only, per the SBA/GSCG convention set 2026-09-13. Verified still true at the new home on 2026-10-20. |
| **Status** | Retired. All content carried over to the new home, verified live. |

---

## Decisions

### Designation, tier, and leadership model: who decides, and what students do about it (2026-10-18)

**Designation is set during the proposal review**, by the faculty advisor and SBA leadership
together, based on scope, activities, and how often the organization works with outside people.
**Students do not decide designation.** The same holds for tier and for the leadership model.

When a student disagrees, there is an escalation path and it ends:

1. Students raise concerns with their faculty advisor.
2. The advisor evaluates the concern against the organization's scope, activities, and level of
   outside exposure.
3. If needed, the advisor brings it to SBA leadership for review.
4. SBA leadership's decision is final.

The same four steps cover a concern about the leadership model and a request to change tier.

**There is deliberately no voting and no tie-break mechanism** (John, 2026-10-18). The earlier
note in this file asked what happens if the advisor and SBA leadership disagree, which framed
them as two parties needing a referee. They are not. SBA leadership decides, and step 4 says so.
Do not add a mechanism here.

The process appears twice on the page, with identical steps: in the Tier 2 panel, where a
student meets the designation question, and in the Start a new organization section, where they
meet it again while writing a proposal. Keep the two copies in step.

---

## What changed on 2026-10-18

A content update. The design system, `noindex`, and the accessibility work (keyboard tabs,
visible focus, the table's hidden corner header) were all kept as they were.

**1. Terminology.** "Student organization" is now the umbrella term. **Club** and **Group** are
*designations* under it, decided by tier:

| Tier | Designation |
|---|---|
| Tier 1 · Internal | Club |
| Tier 2 · External exposure | Club or Group, set during the proposal review by the advisor and SBA leadership (see Decisions) |
| Tier 3 · External business | Group |

This is the easiest thing to get wrong when editing. **A bare lowercase "group" in the copy is
almost always a bug** now, because it reads as the designation. The two that survive on purpose
are in the Tier 2 and Tier 3 panel intros, where the designation is what is meant. A note to
that effect sits in the HTML header comment.

**2. Leadership is a faculty decision, stated openly.** The page no longer implies students lead
by default. Three models are defined (student-led, faculty-guided, faculty-directed), a
**Leadership model** row was added to the tier table, and the models are spelled out under the
table with the reasoning: greater exposure means greater risk, that risk sits with the faculty
member, so the advisor decides how much to take on. Defaults are Tier 1 student-led, Tier 2
either, Tier 3 faculty-directed with delegation as readiness shows.

Tied back to the existing principle: a paragraph after "Freedom is earned by showing a plan" now
says the principle also governs how much students lead.

**3. Tier 3 gained "What the faculty advisor oversees"** — eleven areas, each of which the
advisor either directs, reviews, or delegates. One plain sentence carries the why. All existing
Tier 3 rules were kept, including the NDA callout.

**4. Roles.** Students reframed from "Lead and do the work" to "Do the work and grow into
leadership". The advisor gained the leadership-model decision and the risk call. The third card
is now "School of Business leadership" and gained approving new organizations, confirming fit
with the vision, and recruiting an advisor for an approved proposal.

**5. New final section, "Start a new organization"**, plus a fourth entry card. Two paths side by
side (faculty member already in mind, or not), then the proposal checklist with a **Copy
outline** button. It is last on the page on purpose: a student reads top to bottom, gets the
whole picture, and ends on how to propose one.

**6. The Next step box** is now explicitly for *existing* organizations, and `Due: [date]` became
`Due: set by your faculty advisor`, which removes the last placeholder.

### Implementation notes

- **The copy button builds its text from the list in the DOM**, not a second hard-coded copy, so
  the button and the page cannot drift apart. Clipboard access fails on insecure origins and when
  permission is refused, so there is a fallback that selects the list and says so in a
  `role="status"` line.
- **"SBA leadership (to be confirmed)"** is rendered exactly that way in Path B. It is the one
  unresolved fact on the page.
- **No individuals are named anywhere**, by instruction.
- **Card grid** is 4 across, stepping 4 → 2 (≤1080px) → 1 (≤620px). `.paths` and `.models` stack
  at 860px; `.oversight` is two columns down to 480px.

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

**Page shape:** preamble (the two purposes, the governing principle, and how it sets leadership)
→ four entry cards → four full sections (Tiers, Process, Roles and standards, Start a new
organization), with the Next step box for existing organizations between the last two → footer.

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

- **"SBA leadership (to be confirmed)"** in Path B needs confirming. Most likely the dean's
  office, but the page says "to be confirmed" rather than guessing.
*(The Tier 2 designation question that sat here is answered. See Decisions below.)*
- **Terminology.** The page uses "advisor" throughout. Earlier drafts in this repo used
  "adviser", and the wider SBA docs also use "faculty champion". Three terms for one role.
- **Custom domain.** Still a `github.io` URL. Cloudflare Pages on a real domain is available if
  this becomes something sent to students formally.

---

## Changelog

| Date | Change |
|---|---|
| 2026-10-18 | Designation set at proposal review, students do not decide it; added the "Concerns about designation or tier" escalation to the Tier 2 panel and the Start section; no voting or tie-break |
| 2026-10-18 | Club/Group designations, leadership models, Tier 3 faculty oversight areas, roles rewrite, new "Start a new organization" section with a copy-outline button |
| 2026-10-14 | Rebuilt as a single **SBA Student Group Standards** page from John's finished source; retired the three review pages; moved to the official GU Typekit stack |
| 2026-09-13 | `noindex, nofollow` added to every page (SBA/GSCG link-only sweep, from another session) |
| 2026-07-28 | Renamed the role figure from "professional" to "faculty adviser" in the naming references |
| 2026-07-28 | Replaced "adult" with "professional" throughout |
| 2026-07-19 | Added the Perspectives lens view as a third peer card and a tabbed page |
| 2026-07-17 | Added `.nojekyll` so Pages serves `content/*.md` raw; made repo public; enabled Pages |
| 2026-07-17 | Initial build: landing page plus Option A and Option B reader pages |
