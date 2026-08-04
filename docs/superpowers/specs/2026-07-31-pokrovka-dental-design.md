# Стоматология «Покровка»: Design Spec

**Date:** 2026-07-31
**Status:** Built and verified
**Language:** Russian (`lang="ru"`). This document is English because it is developer
documentation; every user-facing string on the site is Russian.

A marketing website for a fictional dental practice, built as a portfolio piece and as a
re-skinnable template. Every name, address, phone number, and testimonial is invented. Reference
point for tone and structure: prismoralsurgery.com.

> **History.** The site was first built in English as "Northvale Dental Studio" and then localised
> into Russian as «Покровка». The localisation was not a translation pass. The typefaces, the
> insurance model, the payment options, the social channels, the map provider, the URL scheme and
> the contact form's required fields all changed. Section 12 records what and why.

---

## 1. Thesis

Patients do not fear dentistry so much as being *rushed*: the conveyor belt, the upsell, the
ten-minute appointment. The clinic's promise is the opposite, and the site argues it through pace
rather than adjectives. The hero line is **«Стоматология без спешки.»** Whitespace, long easing
curves, and restraint are the argument; nothing on the page should feel like it is shouting.

Copy follows from this: plain verbs, sentence case, specifics over adjectives, no exclamation
marks anywhere on the site, no «Добро пожаловать», no «команда профессионалов». Where a claim can
be a number, it is a number. Address is «вы», lowercase.

---

## 2. Brand

- **Name:** Стоматологическая студия «Покровка»
- **Legal:** ООО «Покровка Дентал»
- **Wordmark:** `ПОКРОВКА` in Onest, uppercase, 0.2em tracking, preceded by a 6px solid `scrub`
  square. «Стоматологическая студия» sits beneath at 9px. That sub-line is the one sanctioned
  exception to the tracking scale; at 0.22em it overran the wordmark block, so it runs at 0.1em.
- **Address:** Покровский бульвар, 8, строение 1, офис 3, Москва, 109028 (м. Чистые пруды)
- **Phone:** +7 (495) 120-14-80 · on-call +7 (495) 120-14-81
- **Email:** info@pokrovka-clinic.ru
- **Hours:** Пн-Чт 9:00-20:00 · Пт 9:00-18:00 · Сб по записи · Вс выходной
- **Established:** 2011

Russia has no reserved-for-fiction telephone range equivalent to the US 555-01xx block, so the
numbers above are plausible rather than provably unassigned. The footer states plainly that the
practice, its address and its phone numbers are invented.

---

## 3. Color

Six tokens, named from dentistry's own materials rather than from mood words. The naming is
deliberate, since it makes the token system read as authored rather than generated.

| Token | Hex | Role |
| --- | --- | --- |
| `bone` | `#F6F4F0` | page canvas |
| `enamel` | `#FDFCFA` | surfaces that lift off the canvas |
| `dentin` | `#C9BFAE` | hairlines, muted text, warm end of the shade scale |
| `ink` | `#14161A` | primary type |
| `scrub` | `#0E4F4A` | surgical-scrub teal accent |
| `chair` | `#2B3A38` | deep green-slate for inverted sections |

Derived: `ink/60` for secondary prose, `ink/12` for hairlines on light, `enamel/60` on dark.

**Constraint:** the accent is teal, never terracotta or orange. A warm-cream canvas paired with a
terracotta accent is the current default look of machine-generated design; this palette
deliberately steps away from it while keeping the warm ground the direction calls for.

---

## 4. Typography

Two families. No third. Both carry full Cyrillic. This is a hard requirement, not a preference.

**Display: Playfair Display** (variable, via `next/font/google`, subsets `latin` + `cyrillic`).
High-contrast transitional serif. Its Cyrillic is properly drawn rather than mechanically
extended, which matters at 7rem.

- `display-xl`: clamp(3rem, 7.5vw, 7rem) / 0.95 / -0.02em / weight 400
- `display-l`: clamp(2.25rem, 4.6vw, 4.25rem) / 1.04 / -0.015em / weight 400
- `display-m`: clamp(1.625rem, 2.8vw, 2.5rem) / 1.14 / -0.01em / weight 400
- `display-s`: clamp(1.25rem, 1.9vw, 1.625rem) / 1.25 / -0.005em / weight 500

**Body: Onest** (variable, `latin` + `cyrillic`). A contemporary Cyrillic-first grotesk, so the
Russian text is set in a face drawn for it rather than one extended to it.

- `body-l`: 1.125rem / 1.62 / 0em
- `body`: 1rem / 1.65
- `body-s`: 0.875rem / 1.6
- `utility`: 0.6875rem / uppercase / 0.16em tracking / weight 500 / tabular figures

**Tracking is looser than the English build throughout.** Cyrillic lowercase is wider and more
even than Latin; the aggressive negative tracking that flatters a Latin display line reads as a
setting fault in Russian. `body-l` lost its negative tracking entirely.

Utility covers hours, shade codes, form labels, eyebrows. Long-form prose maxes at 62ch.

---

## 5. Signature: the Enamel Scale

Dentists match a tooth against a **VITA shade guide**: a physical fan of ceramic tabs running
lightest to warmest, each stamped with a code. It is the most visually iconic and least publicly
known artifact in the field. It becomes the site's navigation.

A fixed rail on the left edge of the viewport (desktop ≥1280px) holds one ceramic tab per page
section, filled with a true enamel hue and labeled with its shade code plus the section name.

| Code | Fill | Раздел |
| --- | --- | --- |
| B1 | `#F4F1E6` | Начало |
| A1 | `#EFEADC` | Подход |
| B2 | `#EAE3D1` | Услуги |
| D2 | `#E2DAC8` | Метод |
| A2 | `#DCD2BC` | Врачи |
| C1 | `#D3C8B1` | Приём |
| C2 | `#C9BCA3` | Отзывы |

The VITA codes stay Latin. Russian dentists use the same guide, so translating them would have
been wrong.

Behavior:

- Tabs are 28×10px, stacked with 4px gaps, right-aligned to a hairline spine.
- The tab for the section in view widens to 44px, gains a `scrub` left border, and unfurls its
  label to the right. Transition 0.4s on the approved easing.
- Clicking a tab smooth-scrolls to that section. Tabs are real `<button>`s in a labeled `<nav>`,
  reachable by keyboard with a visible focus ring.
- Below 1280px the rail collapses to a 3px horizontal strip pinned under the header, the same tabs
  laid end to end, filling as the reader descends.
- Under `prefers-reduced-motion` the widths and fills still update (they carry information) but
  without transition.

This replaces `01 / 02 / 03` section markers. Numbered markers are decoration unless the content
is genuinely a sequence; scroll position *is* a sequence, and the shade scale encodes it in the
subject's own vocabulary.

**Gutters.** From 1280px the left gutter opens to 14rem to give the rail a home; the right stays
at 5rem. The asymmetry is applied site-wide so header, body and footer stay aligned on every page,
rail or no rail.

---

## 6. The risk

On first load, the line **без спешки** animates its letter-spacing from `-0.03em` to `+0.015em`
over 1.4s on `[0.22, 1, 0.36, 1]`. The line visibly relaxes as it is read, copy and motion doing
the same job. It fires once per session, is skipped entirely under reduced motion, and nothing
else on the page competes with it.

The range is gentler than the English build's `-0.04em → 0.02em` for the reason given in §4.

---

## 7. Motion

Framer Motion (`motion/react`). Tokens live in `lib/motion.ts`.

- **Easing:** `ease = [0.22, 1, 0.36, 1]`, `easeInOut = [0.65, 0, 0.35, 1]`
- **Duration:** fast 0.35 · base 0.6 · slow 1.0 · hero 1.4
- **Load sequence** (once, home only, ~1.2s): hairline rules draw left→right → display type rises
  16px → shade tabs illuminate top-to-bottom on a 60ms stagger.
- **Scroll reveal:** y 16→0, opacity 0→1, duration 0.7, `once: true`, `margin: "-12% 0px"`,
  children staggered 0.08s.
- **Hover:** link underlines draw left→right over 0.35s; service rows shift 8px and fade in a
  thumbnail; buttons take a `scrub` fill sweep from the left.
- **Prohibited:** parallax, scroll-jacking, counters, marquees, blob gradients, spring physics on
  layout. Boldness is spent in §5 and §6 only.
- **Reduced motion:** a single `useReducedMotion()` check collapses every variant to an
  opacity-only or static form. No animation is load-bearing for comprehension.

---

## 8. Routes

| Route | Contents |
| --- | --- |
| `/` | Начало · Подход · Услуги · Метод · Врачи · Приём · Отзывы |
| `/services` | Витрина шести услуг, редакционные блоки с фотографиями |
| `/services/[slug]` | Кому это нужно · Как проходит приём · Вопросы · Смотрите также |
| `/about` | История, цифры, пять врачей, помещение, «Чего мы не делаем» |
| `/patients` | Первичный приём, бланки, ДМС, оплата, вопросы |
| `/contact` | Форма записи, часы, как добраться, дежурный телефон, карта |

### Услуги

Slugs are transliterated Latin, the Russian convention:

`profilaktika` · `implantaciya` · `elayneri` · `estetika` · `lechenie` · `sedaciya`

«Седация и комфорт» is included in place of the more common «Неотложная помощь» because it carries
the thesis; acute pain is handled on `/contact`.

### Врачи

Осипова Анна Ильинична (основатель, ортопед-имплантолог) · Марченко Илья Сергеевич (хирург,
пародонтолог) · Хайдарова Нурия Ринатовна (ортодонт) · Рагозина Полина Андреевна (старший
гигиенист) · Уварова Евгения Викторовна (управляющая).

---

## 9. Architecture

```
app/
  layout.tsx            fonts, metadata, JSON-LD, header/footer shell
  page.tsx              home
  services/page.tsx     index
  services/[slug]/page.tsx
  about/page.tsx  patients/page.tsx  contact/page.tsx
  globals.css           Tailwind v4 @theme tokens
components/
  enamel-scale.tsx  site-header.tsx  site-footer.tsx  contact-form.tsx
  ui/               button, eyebrow, rule, field, photo, primitives
  motion/           reveal, stagger
  sections/         home section components
lib/
  motion.ts  images.ts  cn.ts
content/
  clinic.ts  services.ts  team.ts  patients.ts
```

Server Components by default. `"use client"` only where motion or interactivity requires it,
namely the Enamel Scale, the header, the hover-preview services list, reveal wrappers, the contact
form.

Content is typed TypeScript modules, not MDX or a CMS. Swapping the clinic means editing
`content/clinic.ts` and the image manifest.

---

## 10. Imagery

Curated Unsplash photography, hotlinked through `next/image` with `images.unsplash.com` allowed in
`next.config.ts`. Every photo ID was verified to return HTTP 200 before it shipped; a 404 in a
client demo is fatal. The manifest in `lib/images.ts` is the single swap point, each entry
carrying id, Russian alt text, and focal point.

Selection rules: cool, quiet, architectural interiors; real human faces in natural light, never
stock-grin close-ups; no gloved-hands-in-mouth clinical shots; desaturated enough to sit against
`bone` without fighting the palette.

The hero opens on the waiting room rather than on equipment. The page promises an unhurried
appointment; a chair bristling with instruments would argue the opposite before a word is read.

---

## 11. Quality floor

Responsive to 360px with no horizontal scroll at any width, verified at 390/768/1440/1920.
Visible keyboard focus on every interactive element. Semantic landmarks and one `h1` per route.
Reduced motion respected throughout, with all content visible without scrolling. Text contrast
≥ 4.5:1. Images carry explicit dimensions. Per-route Russian metadata plus `Dentist` JSON-LD with
`addressCountry: "RU"`. `npm run build` and `tsc --noEmit` both clean.

---

## 12. Localisation decisions

Rebuilt for Russia rather than translated word-for-word:

| Area | Decision |
| --- | --- |
| Typefaces | Fraunces and Instrument Sans are Latin-only, so every Russian word would have fallen back to a system font. Replaced with Playfair Display + Onest. |
| Tracking | Loosened across the display scale; `body-l` negative tracking removed. See §4. |
| Insurance | American carriers → Russian ДМС partners (СОГАЗ, «Ингосстрах», «РЕСО-Гарантия», …). |
| Payment | ₽ prices throughout, plus **налоговый вычет 13%** as its own financing option. It is the thing a Russian dental patient actively looks for, with no English-version equivalent. |
| Legal | HIPAA → согласие на обработку персональных данных (152-ФЗ). |
| Social | Instagram/Facebook → Telegram, ВКонтакте, Яндекс Карты. |
| Map | Links to Яндекс Карты; the CSS street grid is labelled in Cyrillic. |
| Contact form | Phone became required and email optional. That reverses the English build, because a Russian clinic calls back rather than writes. |
| URLs | Transliterated (`/services/implantaciya`). |
| VITA codes | Left in Latin. Russian dentists use the same shade guide. |

---

## 13. Out of scope

No backend: the contact form validates and shows a success state without sending. No CMS, no
blog, no analytics, no cookie banner, no online payment. `robots` is `noindex`; remove before a
real launch.

For a real Russian deployment the site would additionally need a privacy policy and a 152-ФЗ
consent flow before the form may lawfully collect anything, and the invented phone numbers and
address replaced.
