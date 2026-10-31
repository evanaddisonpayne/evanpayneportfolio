// /tanyasbach-private — planners-only page for Evan and Tanya (password gate: lib/tanyasbach-private-auth.ts).
//
// HOW TO ADD A SECTION (this is the only file to touch):
//   1. Add an object to SECTIONS below. Order in the array = order on the page.
//   2. `id` is the anchor (#id) and the key; keep it short, lowercase, hyphenated, unique.
//   3. `tone` picks the background: "paper" | "blush" | "sky" | "sun" | "sea" | "pink". Alternate them so sections don't blur together.
//   4. `body` is plain JSX. Ready-made building blocks (styled in app/tanyasbach-private/tanyasbach-private.css):
//        <p>…</p>                         paragraph
//        <ul className="tbp-list">…</ul>    bulleted list
//        <dl className="tbp-facts">…</dl>   label/value pairs (<div><dt/><dd/></div>)
//        <div className="tbp-cards">…</div> grid of <article className="tbp-card"> cards
//        <table className="tbp-table">…</table>
//        <p className="tb-hint">…</p>       small muted note
//      For anything bigger (interactive, stateful), make a component in components/tanyasbach-private/ and put it in `body`.
//   5. `updated` (optional) shows a small "Updated Oct 30" stamp.
//
// This page is rendered on the server only after the password check, so anything here stays off the public site.
// Still: no full card numbers, passport numbers or passwords on this page.

import type { ReactNode } from "react";

export type Tone = "paper" | "blush" | "sky" | "sun" | "sea" | "pink";

export type PrivateSection = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  updated?: string;
  body?: ReactNode;
};

export const SECTIONS: PrivateSection[] = [
  {
    id: "open-questions",
    eyebrow: "Decide together",
    title: "Open questions",
    intro: "Things only the two of us can call. Delete a line once it's settled.",
    tone: "blush",
    updated: "Oct 30, 2026",
    body: (
      <ul className="tbp-list">
        <li>Which fare tier for the group: Essential or Premium?</li>
        <li>Does the group cover Tanya&apos;s share?</li>
        <li>Real deposit date (the cruise page says &ldquo;early December&rdquo;).</li>
        <li>Close the old Vote page, or turn it into something cruise-y?</li>
      </ul>
    ),
  },
];
