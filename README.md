# evanpayneportfolio

Portfolio site for Evan Addison Payne, built from the Figma file (pages **03 Homepage** for the 1440 designs and **04 Responsive** for 1024 / 768 / 390).

## Stack

- Next.js (App Router), React, TypeScript
- Plain CSS in `app/globals.css`, no CSS framework
- Fonts: Fraunces, Cormorant SC, DM Sans (Google Fonts)
- Static content, so every page pre-renders at build time

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploy on Vercel with the default Next.js settings.

## Breakpoints

| Range | Design |
| --- | --- |
| under 768 | Mobile 390 |
| 768 to 1023 | Tablet 768 |
| 1024 to 1279 | Laptop 1024 |
| 1280 and up | Desktop 1440 (1200 content column) |

Side margins step 20 / 40 / 64 / 120. Type scales with `clamp()` between the Figma sizes. Card grids go 3 up, then 2 up, then 1 up, and an odd last card centers.

## Pages

- `/` home
- `/about`
- `/work` and `/work/[slug]` for the five case studies (content in `lib/cases.ts`)
- `/resume`
- `/contact`
- `/writing` and `/writing/you-all-sound-the-same`
- 404 (`app/not-found.tsx`)
- the same pages in French and German under `/fr` and `/de` (`app/[locale]`)

## Languages (English, French, German)

English stays at the existing URLs. French lives under `/fr` and German under `/de` (`/fr/work/hireez`, `/de/about`, and so on), with the same slugs in every language. The EN · FR · DE switch in the nav, the mobile menu and the footer goes to the same page in the other language.

- **Copy lives in dictionaries, not in the pages.** `content/en.ts` holds every string on the portfolio pages; `content/fr.ts` and `content/de.ts` have the same shape (TypeScript enforces it). Case studies are `lib/cases.ts` (English) plus `content/cases/fr.ts` and `content/cases/de.ts`. Pages are shared components in `components/pages/` that take a locale.
- **Change copy in all three.** When English copy changes, update the same key in `fr.ts` and `de.ts`, or the translated page keeps the old meaning.
- **The article** is one component per language: the English page `app/writing/you-all-sound-the-same/page.tsx` is untouched, and the translations are `content/articles/you-all-sound-the-same.fr.tsx` and `.de.tsx`.
- **The travel map** reads `?lang=fr` or `?lang=de` and swaps in strings from `public/map/i18n.js` (kilometers instead of miles). That file is generated: edit `content/map/fr.json` or `de.json`, then run `node scripts/build-map-i18n.mjs`.
- **No-orphan rule, every language.** `\u00a0` (no-break space) goes between the last two words of headings and paragraph endings, and `\u2060` (word joiner) after a hyphen in a last word. French also uses `\u202f` (narrow no-break space) before ; ! ? and inside « ».
- **Brief and notes.** `content/TRANSLATION-BRIEF.md` is the brief the French and German translations were written to (voice, hard rules, typography, layout limits). `content/TRANSLATION-NOTES.fr.md` and `.de.md` record each translator's decisions and open questions. `tsc -p content/tsconfig.check.json` typechecks the dictionaries on their own.
- **SEO.** Each page declares its `hreflang` alternates and canonical URL when `NEXT_PUBLIC_SITE_URL` is set. The root layout renders `lang="en"`; a small head script sets `lang="fr"` or `"de"` before first paint, and the localized content is wrapped in an element with the right `lang`.

## Settings (Vercel → Project → Environment Variables)

See `.env.example`.

- `NEXT_PUBLIC_LINKEDIN_URL`: optional override for the LinkedIn profile (defaults to linkedin.com/in/evanaddison).
- `NEXT_PUBLIC_NEWSLETTER_URL`: Brand Therapy on LinkedIn. The "Subscribe on LinkedIn" button stays hidden until this is set.
- `NEXT_PUBLIC_SITE_URL`: the production URL, for social previews and the `hreflang` links between languages.

## Art

All art lives in `public/art`, exported from Figma at 2x:

- Line-art patterns (`passport`, `rays`, `sunrise`, `canal`) are alpha masks, tinted per section with CSS `mask-image`.
- The hero portrait is a vector SVG.
- The travel globe is the live component in `public/globe.html`, embedded on About. It reports its own height to the page.

## Not in the build yet

- No hosted resume PDF. "Download the PDF" opens the print dialog with a print stylesheet.
- The five unwritten essays are left off the Writing page until they exist.
