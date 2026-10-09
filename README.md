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

## Settings (Vercel → Project → Environment Variables)

See `.env.example`.

- `NEXT_PUBLIC_LINKEDIN_URL`: LinkedIn profile. The LinkedIn links stay hidden until this is set.
- `NEXT_PUBLIC_NEWSLETTER_URL`: Brand Therapy on LinkedIn. The "Subscribe on LinkedIn" button stays hidden until this is set.
- `NEXT_PUBLIC_CONTACT_ENDPOINT`: where the contact form posts JSON (Formspree, Basin, or your own function). Until it's set, the form says it isn't switched on yet.
- `NEXT_PUBLIC_SITE_URL`: the production URL, for social previews.

## Art

All art lives in `public/art`, exported from Figma at 2x:

- Line-art patterns (`passport`, `rays`, `sunrise`, `canal`) are alpha masks, tinted per section with CSS `mask-image`.
- The hero portrait is a vector SVG.
- The travel globe is the live component in `public/globe.html`, embedded on About. It reports its own height to the page.

## Not in the build yet

- No hosted resume PDF. "Download the PDF" opens the print dialog with a print stylesheet.
- The five unwritten essays are left off the Writing page until they exist.
