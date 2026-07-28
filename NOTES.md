# Build Notes: SBA Student External Engagement Framework

Working notes and current state for this repo, so the build can be picked back up later.
For the public-facing description of the repo, see [README.md](README.md).

**Last updated:** 2026-07-28

---

## Snapshot

| | |
|---|---|
| **Purpose** | A review site presenting a Gonzaga SBA policy framework in three ways, so administrators can read them and say which structure they prefer. |
| **Live** | https://gu-27.github.io/SBA-Student-ExternalClubs/ |
| **Repo** | gu-27/SBA-Student-ExternalClubs (GitHub) |
| **Visibility** | Public |
| **Hosting** | GitHub Pages, source = `main` branch root, auto-rebuilds on push (usually live in 15 to 35 seconds) |
| **Status** | Complete and deployed. No work in progress. |

---

## What it is

Three pages, all built from the same source framework:

- **Landing** (`index.html`): shared purpose, then three visually equal peer cards (Option A, Option B, Perspectives). Cards are deliberately identical in anatomy so none reads as the default.
- **Option A** (`option-a.html`): the framework organized as escalating engagement tiers.
- **Option B** (`option-b.html`): the framework as one lifecycle plus information classification.
- **Perspectives** (`perspectives.html`): the framework read through three lenses (administrator, faculty, student), shown as an accessible tabbed view.

Options A and B are identical except for their Section 3. The Perspectives view is a lens layer that pairs with either one, not a competing structure (stated plainly near the top of that page).

---

## Architecture

**The three markdown files in `content/` are the single source of truth.** Every page is a thin client that fetches its `.md` and renders it in the browser with [marked](https://github.com/markedjs/marked) (pinned to `marked@12.0.0` from jsDelivr). To change framework wording, edit the markdown only; the pages update on their own.

- Options A and B render their whole document as-is via `render.js`.
- Perspectives is built by `perspectives.js`, which parses the regular shape of `perspectives.md` (three `## The X Lens` sections, each with five bold-led fields: opportunity, exposure, considerations, reframe, guiding question) into three tabs. If that shape ever fails to parse, the page falls back to rendering the whole document so nothing is lost.

`.nojekyll` at the repo root tells GitHub Pages to serve `content/*.md` as raw static assets (otherwise Jekyll can interfere with the fetch).

### File map

```
index.html          Landing page (three equal peer cards)
option-a.html        Reader page  -> content/option-a.md   (via render.js)
option-b.html        Reader page  -> content/option-b.md   (via render.js)
perspectives.html    Tabbed view  -> content/perspectives.md (via perspectives.js)
styles.css           Shared styles (SBA navy/red, Inter, mobile-first)
render.js            Fetch a .md and render it into a reader page
perspectives.js      Parse perspectives.md into the accessible tab interface
content/*.md         Source of truth for all framework text
.nojekyll            Serve .md files raw on GitHub Pages
README.md            Repo purpose + structure
NOTES.md             This file
```

---

## Key decisions

- **Static, no build step, no framework.** For a small review site this is simpler and more portable than Astro, and it matches the house static-first convention. Deployable on Cloudflare Pages later with no changes (root dir, no build command).
- **Brand:** SBA academic identity. Navy `#041E42` dominant, red `#C8102E` accent, silver neutral, **Inter** throughout (the academic/course-property font; the Outfit + Libre pair is reserved for slide/presentation sites, which this is not).
- **Three equal cards.** Uniform line-icon badges (ascending bars / lifecycle loop / three lenses) and identical card anatomy, so no option looks favored. Verified equal widths on desktop and stacked-equal on mobile.
- **Fairness.** Each card has a short summary plus a parallel Good-at / Strains line. The Perspectives card honestly notes it is not a structure and that engagements still run through Option A or B.
- **Perspectives tabs** are keyboard accessible (arrow keys, Home, End, roving tabindex, proper roles and `aria-selected`), swipeable on touch, and the tablist scrolls horizontally on narrow screens.
- **No em-dashes** anywhere in the copy (house preference).
- **Content is verbatim** from the three source documents. The only cleanup was normalizing dash-character glitches in the originals.

---

## Terminology history

The wording for the responsible-adult figure changed twice, by request:

1. Original source said "adult" / "an adult in the room".
2. Changed all "adult" to "professional" (2026-07-28).
3. Changed the references that **name the role figure** to "faculty adviser" (2026-07-28): "a faculty adviser in the room", "the faculty adviser role", "the faculty adviser absorbs the gap", "burns out its faculty adviser".

**Left as "professional"** because they are not the figure: "the professional bar", "professionalism", "look like professionals", and "Vet with professional decision authority" (its own sentence scopes that to the leadership plus faculty layer, not the adviser alone).

Spelling note: used **"adviser"** to match existing doc usage ("champion or adviser", "faculty/adviser practice").

---

## How to work on it

**Local preview** (the pages fetch markdown, which browsers block over `file://`):

```bash
cd ~/projects/SBA-Student-ExternalClubs
python3 -m http.server 8888
# open http://localhost:8888/
```

**Common edits**

- Change framework text: edit the relevant `content/*.md`. That is the whole change.
- Change landing-page copy or card summaries: edit `index.html`.
- Restyle: `styles.css` (colors are CSS variables in `:root`).

**Deploy:** commit and push to `main`. GitHub Pages rebuilds automatically. Confirm live by curling `https://gu-27.github.io/SBA-Student-ExternalClubs/content/option-a.md` (cache-bust with `?v=N`).

**How this build was verified:** the Perspectives parser was tested in Node against the real markdown (all 3 lenses, 15 fields), and the full site was driven in a real browser with Playwright (tab click, arrow-key and Home/End navigation, panel visibility, equal card widths, zero console errors).

---

## Open items and possible next steps

None are required; the site is done. These are options if you want them later:

- **Privacy:** the repo and site are public. If you want it visible only to specific people, switch to a private repo plus a Cloudflare Pages deploy behind Cloudflare Access.
- **Custom domain:** GitHub Pages gives a `github.io` URL. For a branded URL, deploy on Cloudflare Pages (you own `inlandnw.ai`).
- **Terminology consistency:** the docs still use "faculty champion" as the primary term elsewhere, so "faculty champion" and "faculty adviser" now coexist. Unify to one term if desired.
- **"Vet with professional decision authority":** left as "professional". Change to "faculty adviser" if you decide that spot should name the adviser after all.
- **Spelling:** currently "adviser". Switch everything to "advisor" if you prefer that spelling.
- **First-load warmth:** GitHub Pages can be briefly slow to warm its CDN on the very first hit after a deploy; a refresh resolves it.

---

## Changelog

| Date | Change |
|---|---|
| 2026-07-28 | Renamed the role figure from "professional" to "faculty adviser" in the naming references |
| 2026-07-28 | Replaced "adult" with "professional" throughout |
| 2026-07-19 | Added the Perspectives lens view as a third peer card and a tabbed page |
| 2026-07-17 | Added `.nojekyll` so Pages serves `content/*.md` raw; made repo public; enabled Pages |
| 2026-07-17 | Initial build: landing page plus Option A and Option B reader pages |
