// /tanyasbach-private — planners page for Evan and Tanya. Open link (no password), unlisted and noindex.
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
// Anyone with the link can read this page, so keep it to things that are fine if it gets forwarded:
// no contact details, card or passport numbers, or passwords.

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
    id: "where-it-stands",
    eyebrow: "TLDR · nothing booked",
    title: "Where it stands",
    intro:
      "Turks and Caicos won the vote, but the villa-and-private-boat version costs more than most of the group said they can spend. The cruise fits every budget, but its dates and length don't work for most people. Nothing is decided.",
    tone: "sky",
    updated: "Oct 30, 2026",
    body: (
      <>
        <dl className="tbp-facts">
          <div>
            <dt>The vote</dt>
            <dd>
              Turks and Caicos wins under every scoring method, but narrowly: 5 of 11 first-place votes, and 6–5 over the cruise head to
              head. 4 invitees (including Tanya) haven&apos;t voted yet, enough to flip it.
            </dd>
          </div>
          <div>
            <dt>Budgets</dt>
            <dd>
              About a third said ~$2,000, nearly half ~$3,000, two said $3,500. Median about $3,000 before flights. A couple of people at
              $2,000 can&apos;t go higher; one asked about payment plans.
            </dd>
          </div>
          <div>
            <dt>Dates</dt>
            <dd>
              Most people said 4 nights max. A land trip May 27–31 works for 10 of 11. The cruise (May 29–Jun 3, ~6 nights with travel)
              works for 8 of 11, and is longer than 7 people&apos;s max.
            </dd>
          </div>
          <div>
            <dt>Passports</dt>
            <dd>
              3 people would need a new or renewed passport for any land option. The cruise doesn&apos;t need one (round trip from Miami).
            </dd>
          </div>
        </dl>

        <table className="tbp-table">
          <thead>
            <tr>
              <th>Option (per person, no flights)</th>
              <th>Rough cost</th>
              <th>Fits the budgets?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Turks and Caicos, villa for 16 + private catamaran day</td>
              <td>$2,900–$4,400</td>
              <td>Only the top budgets; not the ~$2k group</td>
            </tr>
            <tr>
              <td>Turks and Caicos, hotels/condos + shared boat trip</td>
              <td>$1,700–$2,000</td>
              <td>Everyone, but no villa or private boat</td>
            </tr>
            <tr>
              <td>Virgin cruise from Miami (stops at Grand Turk + Bimini)</td>
              <td>$1,800–$2,300 all in</td>
              <td>Everyone; food and beach days included</td>
            </tr>
          </tbody>
        </table>
        <p className="tb-hint">
          If the group covers Tanya&apos;s share, add about 7%. Cancún/Tulum and Cartagena trailed in the vote (20 points each vs. 33 and
          29) and weren&apos;t costed. From the planning sheet, 11 of 15 responses, Oct 30.
        </p>

        <ul className="tbp-list">
          <li>Before Nov 25: ask the three people who can&apos;t make May 29–Jun 3 whether it could work.</li>
          <li>Check for a shorter Virgin sailing (3–4 nights) near Memorial Day.</li>
          <li>Get the last 4 votes in; 6–5 is close enough to flip.</li>
        </ul>
      </>
    ),
  },
  {
    id: "open-questions",
    eyebrow: "Decide together",
    title: "Open questions",
    intro: "Things only the two of us can call. Delete a line once it's settled.",
    tone: "blush",
    updated: "Oct 30, 2026",
    body: (
      <ul className="tbp-list">
        <li>Where: Turks and Caicos (villa or budget version), the cruise, or something else?</li>
        <li>When and how long: a 4-night land trip May 27–31, or the 5-night cruise May 29–Jun 3?</li>
        <li>How do we handle the gap between the ~$2,000 and ~$3,500 budgets (payment plans, a cheaper version, optional splurges)?</li>
        <li>Does the group cover Tanya&apos;s share?</li>
        <li>When do deposits go out, and how much?</li>
        <li>Keep the Vote page open until everyone has voted, then close it or reframe it.</li>
      </ul>
    ),
  },
];
