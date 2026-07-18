# SBA Student External Engagement Framework

A small review site for Gonzaga's **School of Business Administration**. It presents a
policy framework for how student groups (clubs, consulting groups, and the like) should
engage with external entities (clients, partners, and the public) while representing the
university.

The framework has been drafted in **two competing structural versions**. This site exists so
that administrators can read both and tell us **which architecture they prefer**. The two
versions are identical in philosophy, faculty role, requirements, and planning process; they
differ only in **how the framework is organized**, and that single difference lives in
**Section 3** of each document.

## The two options

- **Option A – Organized by Engagement Type.** Sorts engagements by what the group is doing
  and builds three escalating tiers (exposure/public voice, research/consulting,
  binding/NDA). Reads as an on-ramp for a new group.
- **Option B – One Lifecycle + Information Classification.** Runs every engagement through a
  single lifecycle and manages risk by classifying information into sensitivity levels,
  scaling oversight with exposure.

The landing page summarizes both side by side without favoring either and links to each full
document.

## Structure

```
SBA-Student-ExternalClubs/
├── index.html          Landing page: shared purpose + fair side-by-side comparison
├── option-a.html       Reader page for Option A (renders content/option-a.md)
├── option-b.html       Reader page for Option B (renders content/option-b.md)
├── styles.css          Shared styles (SBA navy/red palette, Inter, mobile-first)
├── render.js           Fetches a source .md file and renders it into the reader page
├── content/
│   ├── option-a.md     Source of truth for Option A
│   └── option-b.md     Source of truth for Option B
└── README.md
```

**The markdown files in `content/` are the single source of truth.** The two reader pages are
thin clients: each fetches its `.md` and renders it in the browser with
[marked](https://github.com/markedjs/marked) (loaded from a CDN). To change framework text,
edit the markdown and the pages update automatically. The landing-page copy lives in
`index.html`.

## Stack

Static HTML, CSS, and vanilla JS. No build step and no framework: for a three-page review
site this is simpler and more portable than a full toolchain, and it matches the house
static-first convention. Intended to deploy on **Cloudflare Pages** (root directory, no build
command).

## Local preview

The reader pages use `fetch()` to load the markdown, which browsers block over `file://`, so
serve the folder over HTTP:

```bash
python3 -m http.server 8888
# then open http://localhost:8888/
```

## Notes

- Framework content is reproduced verbatim from the two source documents; nothing was
  invented or added. A dash-character encoding glitch in the originals was cleaned up.
- Palette and type follow the Gonzaga SBA academic identity: navy dominant, red accent,
  Inter throughout.
