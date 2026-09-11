# Dhatri Patel — Portfolio

Portfolio and lead site for **Dhatri Patel**, freelance Flutter & React
developer based in Bhavnagar, Gujarat, India — building mobile apps, websites
and MVPs for startups, growing businesses and local businesses, and remotely
worldwide.

Live at **<https://www.dhatrii.me>** · dhatripatel67@gmail.com

Built on the Next.js App Router, statically prerendered and deployed to Vercel.
The home page carries the full pitch as one scroll; `/about`, `/services` and
the case studies under `/projects` are separate routes.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 3 · Framer Motion 12 ·
Lenis · Lucide React

Fonts are **Poppins** (UI + headings), **Inter** (fallback body) and
**Handjet** (the pixel-block face used for the big stat and score numerals).
All three are loaded through `next/font/google` in
[layout.jsx](src/app/layout.jsx), so they are self-hosted at build time — no
request to `fonts.googleapis.com` and no swap-in layout shift.

## Structure

```
src/
  app/
    layout.jsx        html shell, fonts, root metadata, page chrome
    page.jsx          the 13 home sections in render order + home JSON-LD
    about/page.jsx    /about — client-facing introduction
    services/page.jsx /services — the four services in full
    projects/         /projects index and /projects/[slug] case studies
    opengraph-image.js  1200x630 social card, generated at build time
    globals.css       base layer, .shell / .section rhythm, helpers
    robots.js         generated /robots.txt
    sitemap.js        generated /sitemap.xml
  components/
    JsonLd.jsx        renders one or more schema graphs as a script tag
    layout/           chrome rendered by layout.jsx, not by the page
      Header.jsx        centred wordmark + pill nav + accent Contact
      Footer.jsx        wordmark, nav, socials, back-to-top
      SmoothScroll.jsx  starts Lenis; renders nothing
    sections/         one file per page section, in render order
      Hero.jsx          device frame: portrait, Hello, name, intro
      Brands.jsx        certifications marquee
      Journey.jsx       "My journey in Numbers" + pixel stat tiles
      Projects.jsx      sticky-stacked image cards
      Experience.jsx    dotted-arc career timeline
      Services.jsx      tabbed panel with ghost numeral + action cards
      Tools.jsx         capsule tool grid
      WorkProcess.jsx   four process cards
      Testimonials.jsx  awards card with pixel score + dots
      Pricing.jsx       four fixed-scope package tabs + plan card
      FAQ.jsx           accordion
      Contact.jsx       validated mailto form
      Closing.jsx       Instagram card + "Why choose" panel
    ui/               shared primitives
      Reveal.jsx        fade-up on scroll into view
      Stagger.jsx       sequenced reveals, 0.2s apart
      Magnetic.jsx      magnetic hover, clamped to 6px
      Marquee.jsx       seamless edge-faded marquee
      SmartImage.jsx    next/image + placeholder fallback
      ArrowButton.jsx   accent pill with circular arrow badge
      TwoTone.jsx       "Projects **Done**" section heading
      GalaxyBackground.jsx  fixed canvas starfield
  data/content.js     all copy, projects, plans, FAQs, links
  lib/
    site.js           SITE_URL and everything derived from it
    seo.js            buildMetadata() — one metadata shape per route
    schema.js         JSON-LD builders (Person, ProfessionalService, FAQ, …)
    motion.js         easing, springs, timing constants
    lenis.js          scroll instance handle + scrollToSection
    icons.js          social icon lookup
```

### Server / client split

`layout.jsx`, `page.jsx` and the sections with no interactive state
(`Brands`, `Journey`, `Projects`, `Tools`, `WorkProcess`) are Server Components
and ship no
JS of their own. `'use client'` sits on the leaves that need it — anything
using `useState`, a Framer Motion hook or a canvas.

Imports use the `@/*` alias mapped to `src/` in [jsconfig.json](jsconfig.json).

## Design tokens

All in [tailwind.config.mjs](tailwind.config.mjs) — no hard-coded hex in
components.

| Token | Value |
| --- | --- |
| `bg` | `#111111` |
| `surface` | `#1A1A1A` |
| `sunken` | `#0A0A0A` |
| `raised` | `#222222` |
| `line` | `rgba(255,255,255,0.08)` |
| `text` | `#F5F5F5` |
| `muted` | `#A1A1AA` |
| `accent` | `#4CC9FF` |
| `rounded-card` | 32px |
| `shadow-card` | `0 20px 60px rgba(0,0,0,0.45)` |
| `.section` | 64 / 88 / 120px vertical rhythm |
| `.shell` | 736px max width (640px content + gutters) |

Signature helpers live in [globals.css](src/app/globals.css): `.glass` (nav
pill), `.pinstripe` (pricing card texture), `.grain`, `.mask-fade-x` and
`.link-underline`.

## Images

Files go in `public/images/` and are served through the Next image optimizer
(AVIF/WebP, responsive `srcset`). Missing files render as labelled gradient
placeholders, so the layout never collapses.

Currently present:

```
public/images/portrait-illustration.png   # hero portrait, 4:5
public/images/jobzeecover.png             # project card
public/images/agreecarecover.png          # project card
public/images/mindheal.png                # project card
public/images/learnnova.png               # project card
public/images/shiftlycover.png            # project card
```

There is no social-card file to add. The 1200x630 Open Graph image is
generated at build time by [src/app/opengraph-image.js](src/app/opengraph-image.js)
and served from `/opengraph-image`.

## Domain and SEO

[src/lib/site.js](src/lib/site.js) is the single source of truth. `SITE_URL`
feeds `metadataBase`, the canonical link, Open Graph, the JSON-LD graphs in
[src/lib/schema.js](src/lib/schema.js), the sitemap and `robots.txt` — change it in one place and everything follows.

Google Search Console verification is declared through Next's metadata API
(`verification.google`), which renders the `google-site-verification` meta tag.
That satisfies a **URL-prefix** property. A **Domain** property is DNS-only:
add a TXT record on `dhatrii.me` with the same token.

## Contact form

No backend — validates, then hands a pre-filled message to the visitor's mail
client via `mailto:`. Swap the `window.location.href = ...` line in
[Contact.jsx](src/components/sections/Contact.jsx) for a `fetch()` when you add
an endpoint.

## Deploying to Vercel

Vercel auto-detects the Next.js preset; there is no `vercel.json`. Security
headers and the `/images` cache policy are declared in
[next.config.mjs](next.config.mjs) so they travel with the app rather than the
host.

```bash
# either: connect github.com/Dhatripatel06/dhatrii in the Vercel dashboard
# or:
npx vercel        # preview
npx vercel --prod # production
```

## Accessibility & motion

- Single `<h1>`, semantic landmarks, labelled sections, skip link
- Tabs use `role="tablist"` / `aria-selected` / `aria-controls`
- Timeline announces the active role via `aria-live`
- Every animation checks `prefers-reduced-motion`; Lenis does not start at all
- Form fields have labels, `aria-invalid` and linked error messages
