# Стоматология «Покровка» (Pokrovka Dental Studio)

A Russian-language marketing website for a dental practice, built as a portfolio piece and as a
re-skinnable template. Everything on it is invented: the practice, the address, the phone numbers,
the team, the patient comments.

This README is in English because it is developer documentation. Every user-facing string on the
site is Russian.

**Thesis.** Patients do not fear dentistry so much as being rushed. The clinic's promise is the
opposite, and the site argues it through pace rather than adjectives: long easing curves, wide
margins, and copy that states facts instead of selling. The hero reads
**«Стоматология без спешки.»**

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion · TypeScript

---

## Re-skinning it

Three files carry almost everything.

| Change | Edit |
| --- | --- |
| Practice name, address, phone, hours, figures | `content/clinic.ts` |
| Services and every word of their detail pages | `content/services.ts` |
| Photography | `lib/images.ts` |
| Team, bios, portraits | `content/team.ts` |
| First visit, ДМС partners, financing, FAQs | `content/patients.ts` |
| Colour, type and spacing tokens | `app/globals.css` (`@theme`) |

Photography is hotlinked from Unsplash through `next/image`. Every id in `lib/images.ts` has been
checked to return HTTP 200. To use your own images, either swap the ids or point `unsplashUrl()`
at your own CDN; nothing else references image URLs.

---

## Localisation notes

This is a localisation, not a translation. The following were rebuilt for Russia rather than
converted word-for-word:

- **Typefaces.** Fraunces and Instrument Sans, used in the English build, ship Latin only, so every
  Russian word would have fallen back to a system font. Replaced with **Playfair Display**
  (display, full Cyrillic) and **Onest** (body, a contemporary Cyrillic-first grotesk).
- **Tracking.** Cyrillic lowercase is wider and more even than Latin, so the display sizes carry
  noticeably less negative tracking, and `body-l` lost its negative tracking entirely. The hero's
  letter-spacing animation runs `-0.03em → 0.015em` rather than the Latin `-0.04em → 0.02em`.
- **Insurance.** American carriers replaced with Russian ДМС partners (СОГАЗ, «Ингосстрах»,
  «РЕСО-Гарантия» and so on).
- **Money.** Prices in ₽, plus **налоговый вычет 13%**, the tax deduction a Russian dental patient
  actively looks for on a clinic site, and one with no equivalent in the English version.
- **HIPAA** → согласие на обработку персональных данных (152-ФЗ).
- **Social links.** Instagram and Facebook replaced with Telegram, ВКонтакте and Яндекс Карты.
- **The map** links to Яндекс Карты, not Google Maps.
- **The contact form** makes the phone number required and the email optional. That is the reverse
  of the English build, because a Russian clinic calls back rather than writes.
- **URLs** are transliterated (`/services/implantaciya`), which is the Russian convention.

The glossary the localisation was built against (brand facts, term-by-term mappings, price bands,
and the banned-cliché list) is worth keeping if the site is ever extended.

---

## Design system

**Colour.** Six tokens, named from dentistry's own materials so the system reads as authored
rather than generated.

| Token | Hex | Role |
| --- | --- | --- |
| `bone` | `#F6F4F0` | page canvas |
| `enamel` | `#FDFCFA` | surfaces that lift off the canvas |
| `dentin` | `#C9BFAE` | drawn illustration fills |
| `ink` | `#14161A` | primary type |
| `scrub` | `#0E4F4A` | surgical-scrub teal accent |
| `chair` | `#2B3A38` | inverted sections |

**Text has exactly three steps, and there is no fourth.** An earlier build set type in eleven
different ink opacities — `/70 /65 /60 /55 /50 /45 /40 /35 /30 /25 /20`. Nobody could see the
difference between neighbours, and everything below `ink/60` missed 4.5:1, so a good half of the
page was set in grey that did not meet contrast. Hierarchy is now carried by size and space, which
is what a minimal system is supposed to do with it.

The steps are flat colours rather than opacities, so they render identically over `bone` and over
`enamel` and the question "what percentage is this?" cannot come up.

| Token | Hex | On `bone` | Role |
| --- | --- | --- | --- |
| `ink` | `#14161A` | 16.5:1 | headings, figures, links |
| `ink-soft` | `#58595A` | 6.4:1 | body prose |
| `ink-mute` | `#6E6F70` | 4.6:1 | captions, eyebrows, labels, small text |
| `bone` / `bone-soft` | `#F6F4F0` / `#BDC0BC` | 10.8:1 / 6.5:1 | the same two steps on the `chair` band |

Anything lighter is not text: `ink/12` is the hairline, `ink/30` is an `aria-hidden` mark. One
hairline weight site-wide, one control-edge weight (`ink-mute`, which clears the 3:1 that WCAG
asks of a form field's boundary — the old `ink/20` sat at 1.5:1).

**Type.** Two families, no third. Playfair Display for display; Onest for body and for the
uppercase `u-label` utility that sets hours, form labels, and eyebrows.

**Layout.** Square corners, hairline rules, no cards, no shadows, and no rounded geometry anywhere
— including the focus ring, which used to be the one exception. Sections are separated by vertical
rhythm rather than by boxes, hairlines are always `ink/12`, and from 1280px the left gutter opens
to 14rem to give the Enamel Scale a home; the asymmetry applies site-wide so every page stays
aligned.

**Vertical rhythm is four utilities, not sixteen margins.** Spacing used to come from sixteen
different `mt-*` values chosen on a wide screen and frozen there, which is how the mobile home page
reached 17 000px. Each of these scales with the viewport, so the phone layout tightens on its own:

| Utility | Range | Between |
| --- | --- | --- |
| `u-section` | 60 → 144px | sections |
| `u-lede` | 40 → 80px | a section header and its content |
| `u-block` | 32 → 56px | sibling blocks inside a section |
| `u-close` | 48 → 80px | a section and its closing line |

Two related rules keep the hairlines honest: a **ruled list never closes itself** — whatever comes
next supplies the next rule, otherwise a list ending in a rule and a section opening with one read
as an empty row across the gap — while a **`DataRow` table always closes**, because a table of four
rules that stops without one looks unfinished. Lists and tables are different objects; each is
internally consistent.

**Photography has two registers.** Team portraits are set in warm monochrome (`u-portrait-tone`,
applied automatically from `tone: "portrait"` in the image manifest); environment and clinical
shots stay in colour. Stock portraiture arrives from a dozen photographers with a dozen different
colour worlds; one tonal treatment makes them read as a single commissioned series, which is what
a practice's team page should look like.

**Buttons that sit on the dark `chair` band use their own variants** (`solidOnDark`,
`outlineOnDark`) rather than className overrides. `cn()` is a plain join, not a Tailwind merge, so
an override like `bg-bone` does not beat the variant's `bg-scrub`: the winner is decided by
stylesheet order. Anything needing a different look gets a real variant.

### The Enamel Scale

The site's signature. Dentists match a tooth against a VITA shade guide, a fan of ceramic tabs
running lightest to warmest, each stamped with a code. Here that guide becomes the home page's
position indicator and section navigation: a fixed rail of real enamel hues on the left edge at
≥1280px. The active tab widens, gains a scrub edge, and unfurls its label:
Начало · Подход · Услуги · Метод · Врачи · Приём · Отзывы.

Below 1280px it lies on its side as a strip under the header — and that strip is not a progress
bar. It used to be: visited tabs took their VITA colour, unvisited ones sat at `opacity-0`. The
lightest ceramic, B1 `#F4F1E6`, differs from the `bone` canvas by about four units of luminance,
so on every phone and tablet the site's signature element was invisible, an empty strip replaced by
a near-identical empty strip. Filling it against a track only inverted the reading, because the
ceramics are all *lighter* than any track you could put behind them.

A fan does not fill. A dentist's shade guide is open all the way, all the time, and the matched tab
is simply pointed at. So all seven tabs are always drawn, lightest to warmest — together they read
as the strip — and the current one turns `scrub`. That is the same thing the desktop rail does when
it gives the active tab a scrub edge.

The VITA codes themselves stay Latin (B1, A1, B2, D2, A2, C1, C2). Russian dentists use the same
guide, so translating them would have been wrong.

It replaces `01 / 02 / 03` section markers. Numbered markers are decoration unless the content is
genuinely a sequence, and scroll position is one. See `components/enamel-scale.tsx`.

### Motion

Tokens live in `lib/motion.ts`; every animation resolves to one of them.

- One orchestrated load sequence on the home page, roughly 1.2s, once.
- Scroll reveals: 16px rise plus fade, 0.7s, `once: true`, children staggered 0.08s.
- On load the line **без спешки** releases its letter-spacing over 1.4s. It relaxes as it is
  read. That is the one deliberate risk in the design.
- No parallax, scroll-jacking, counters, or marquees.
- `useReducedMotion()` collapses everything to static. No animation carries meaning on its own.

---

## Structure

```
app/
  layout.tsx              fonts, metadata, JSON-LD, header/footer shell
  page.tsx                главная: Начало · Подход · Услуги · Метод · Врачи · Приём · Отзывы
  services/               витрина и [slug] (6 static pages)
  about/  patients/  contact/
  globals.css             @theme tokens and utilities
components/
  enamel-scale.tsx        the signature navigation
  site-header.tsx         sticky header, services dropdown, mobile menu
  site-footer.tsx         closing CTA band and footer
  contact-form.tsx        client-side validation and success state
  sections/               home page sections
  ui/                     button · field · photo · primitives
  motion/                 Reveal · Stagger · StaggerItem · DrawRule
content/                  clinic · services · team · patients
lib/                      motion · images · cn · typo
docs/superpowers/specs/   the design spec this was built from
```

Server Components by default. `"use client"` appears only where state or effects are genuinely
required: the header, the Enamel Scale, the hover-preview services list, the reveal wrappers, and
the contact form.

---

## Deploying to shared hosting (reg.ru)

Nothing here needs a server at runtime — no route handlers, no server actions, no data fetched
per request — so `next.config.ts` sets `output: "export"` and `npm run build` writes a folder of
plain files to `out/`. That runs on the cheapest reg.ru plan, and on any other web server too.

```bash
npm run build     # → out/
```

Upload **the contents** of `out/` into `public_html` (or `www/<domain>/` on reg.ru's older
layout) — not the `out` folder itself. Through the control panel's file manager the fastest route
is to upload a zip of the contents and unpack it there; over SFTP or FTP, drag the contents in.
Either way, `.htaccess` must come with it. FTP clients hide dotfiles by default, so check the
setting before assuming it transferred.

Two config choices are load-bearing:

- **`trailingSlash: true`.** Each route exports as `about/index.html` instead of `about.html`,
  so the server resolves `/about/` through its own DirectoryIndex and needs no rewrite rules to
  serve a single page. Without it, nothing but the home page loads.
- **`images.unoptimized: true`.** `next/image` optimises through a Node service that a static
  export does not have. Photographs are sized and compressed by the Unsplash CDN instead, via the
  query string in `lib/images.ts`.

`public/.htaccess` ships with the build and carries the parts a static host cannot infer: the
404 document, gzip, and cache lifetimes — a year for hashed assets under `/_next/static/`,
revalidate-always for HTML and for the `.txt` payloads the router fetches when moving between
pages. It also holds a commented-out https redirect. Turn that on only after the certificate is
issued in the reg.ru panel; before that it redirects visitors to an address that will not open.

The photographs are hotlinked from `images.unsplash.com` and load from the visitor's browser, not
from the hosting. If the site must survive without that dependency, download the twenty files
listed in `lib/images.ts` into `public/photos/` and point `unsplashUrl()` there.

---

## Not included

No backend: the contact form validates and shows a success state without sending anything, and
says so on the page. No CMS, blog, analytics, cookie banner, or online payment. `robots` is set to
`noindex` in `app/layout.tsx`; remove that before a real launch.

For a real Russian deployment you would also need a privacy policy and a 152-ФЗ consent flow
before the form can legally collect anything, and the phone numbers and address replaced, since
they are invented and the footer says so.

## Checked, not asserted

Claims here are ones a script can re-check against a running dev server, because the previous
version of this file asserted 4.5:1 contrast that the build did not actually meet.

- **Contrast.** All 203 text elements on the home page resolve to a measurable colour and none
  falls below its WCAG AA threshold, across six routes at 390 / 768 / 1440px. The earlier build
  could not even be measured this way: Tailwind v4 compiles `text-ink/55` to `oklab(… / 0.55)`, so
  a naive audit silently skips every tinted element and reports a clean sheet. Flat tokens made the
  check real.
- **No horizontal overflow** on any of the six routes at 360 / 390 / 430 / 768 / 1280 / 1512px.
- **The mobile menu fits 360×640** — the narrowest screen the site claims to support — without
  scrolling, so the clinic's phone number stays on screen. A `short` variant
  (`@media (height < 44rem)`) tightens it there and nowhere else.
- **Focus cannot leave the open menu.** The closing CTA now lives inside `<footer>`; as a sibling
  of it, the header's `inert` guard over `main, footer` missed it, and the thirteenth Tab escaped
  behind the overlay and scrolled the frozen page to the bottom.
- **Touch devices get a resting underline.** `u-underline` draws on hover, which never fires on a
  phone, so inline links were cued by tone alone. Under `@media (hover: none)` the line is simply
  always there.
- **No `href="#"`.** The four form rows on `/patients` were anchors to nowhere: the largest tap
  targets in their section, and tapping one smooth-scrolled the page back to the hero. They arrive
  by email, per the section's own heading, so they are no longer links.

Also: responsive from 360px, visible keyboard focus throughout, semantic landmarks, one `h1` per
route, reduced motion respected.

Russian short words are bound to what follows them with a non-breaking space (`lib/typo.ts`), so a
one- or two-letter preposition never ends a line — most visible in Playfair at display sizes, where
«Что происходит и» hanging on its own read as a typesetting fault.
