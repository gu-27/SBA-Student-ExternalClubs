# SBA Student External Engagement Framework

A small review site for Gonzaga's **School of Business Administration**. It presents a
policy framework for how student groups (clubs, consulting groups, and the like) should
engage with external entities (clients, partners, and the public) while representing the
university.

The framework has been drafted in **two competing structural versions**, and this site exists
so that administrators can read them and tell us **which architecture they prefer**. The two
versions are identical in philosophy, faculty role, requirements, and planning process; they
differ only in **how the framework is organized**, and that single difference lives in
**Section 3** of each document. A third page, the Perspectives view, is offered alongside them.

## The three cards

- **Option A – Engagement Tiers.** Sorts engagements by what the group is doing and builds
  three escalating tiers (exposure/public voice, research/consulting, binding/NDA). Reads as
  an on-ramp for a new group.
- **Option B – One Lifecycle + Classification.** Runs every engagement through a single
  lifecycle and manages risk by classifying information into sensitivity levels, scaling
  oversight with exposure.
- **Perspectives – Three Lenses.** Reads the framework from three seats (administrator,
  faculty, student), showing what each one gains and risks. It is a way to read the framework,
  not a competing structure: it pairs with Option A or Option B. This is stated plainly near
  the top of the Perspectives page, which presents the three lenses as an accessible tabbed
  view (one lens visible at a time; arrow-key, click, and swipe navigation).

The landing page summarizes all three as equal peers, without favoring any, and links to each
full page.

## Structure

```
SBA-Student-ExternalClubs/
├── index.html          Landing page: shared purpose + three equal peer cards
├── option-a.html       Reader page for Option A (renders content/option-a.md)
├── option-b.html       Reader page for Option B (renders content/option-b.md)
├── perspectives.html   Tabbed lens view (built from content/perspectives.md)
├── styles.css          Shared styles (SBA navy/red palette, Inter, mobile-first)
├── render.js           Fetches a source .md file and renders it into a reader page
├── perspectives.js     Parses perspectives.md into the accessible tab interface
├── content/
│   ├── option-a.md     Source of truth for Option A
│   ├── option-b.md     Source of truth for Option B
│   └── perspectives.md Source of truth for the Perspectives view
└── README.md
```

**The markdown files in `content/` are the single source of truth.** Every page is a thin
client of its `.md`, rendered in the browser with
[marked](https://github.com/markedjs/marked) (loaded from a CDN):

- Options A and B render their whole document as-is (`render.js`).
- Perspectives (`perspectives.js`) parses its markdown, which has a regular shape (three
  `## The X Lens` sections, each with an opportunity, exposure, considerations, reframe, and
  guiding question), into three tabs. If that shape ever fails to parse, the page falls back
  to rendering the whole document so no content is lost.

To change framework text, edit the markdown and the pages update automatically. The
landing-page copy lives in `index.html`.

## Stack

Static HTML, CSS, and vanilla JS. No build step and no framework: for a small review site
this is simpler and more portable than a full toolchain, and it matches the house
static-first convention. Intended to deploy on **Cloudflare Pages** (root directory, no build
command); currently served via GitHub Pages.

## Local preview

The reader pages use `fetch()` to load the markdown, which browsers block over `file://`, so
serve the folder over HTTP:

```bash
python3 -m http.server 8888
# then open http://localhost:8888/
```

## Notes

- Framework content is reproduced verbatim from the three source documents; nothing was
  invented or added. Dash-character glitches in the originals were normalized, and em-dashes
  are avoided in the site copy.
- Palette and type follow the Gonzaga SBA academic identity: navy dominant, red accent,
  Inter throughout.
