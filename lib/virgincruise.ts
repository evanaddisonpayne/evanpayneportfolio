/**
 * /virgincruise: the "it's official" announcement for Tanya's bachelorette cruise.
 * Facts checked Oct 30, 2026 against Virgin Voyages' own pages and VV Insider. Re-check before anyone pays.
 */

export const BASE = "/virgincruise";
export const TRIP_SITE = "/tanyasbach";

export const SHIP = "Valiant Lady";
export const GROUP_SIZE = 16;

/** Sail-away: Sat May 29, 2027, 5:00 pm in Miami (EDT). */
export const SAIL_AT = "2027-05-29T17:00:00-04:00";

export type Day = {
  day: string;
  date: string;
  place: string;
  where: string;
  time: string;
  line: string;
  kind: "port" | "sea" | "island";
};

export const ITINERARY: Day[] = [
  { day: "Day 1", date: "Sat · May 29", place: "Miami", where: "Florida", time: "All aboard by afternoon · sails 5:00 pm", line: "Board, drop bags, first cocktail, sail-away party on deck.", kind: "port" },
  { day: "Day 2", date: "Sun · May 30", place: "At sea", where: "Atlantic", time: "Sea day", line: "Pool, spa, brunch that turns into a nap. Pace yourself.", kind: "sea" },
  { day: "Day 3", date: "Mon · May 31", place: "Grand Turk", where: "Turks and Caicos", time: "8:00 am – 5:00 pm", line: "Our Turks and Caicos day. Clear water, white sand, Memorial Day off.", kind: "island" },
  { day: "Day 4", date: "Tue · Jun 1", place: "At sea", where: "Atlantic", time: "Sea day", line: "Recovery by day, a long dinner and a longer night.", kind: "sea" },
  { day: "Day 5", date: "Wed · Jun 2", place: "Bimini", where: "The Beach Club, Bahamas", time: "8:00 am – 6:00 pm", line: "Virgin's own beach club. Loungers, pool, sunset back on board.", kind: "island" },
  { day: "Day 6", date: "Thu · Jun 3", place: "Miami", where: "Florida", time: "Docks 6:30 am", line: "Off the ship by mid-morning. Fly home in the afternoon.", kind: "port" },
];

export const PRICE = {
  fromPerCabin: 2290,
  fromPerPerson: 1145,
  tipsPerDay: 20,
  tipsOnboard: 22,
  checked: "October 30, 2026",
};

export const DEADLINES = {
  rsvp: "Wed, Nov 25",
  finalPayment: "Fri, Jan 29, 2027",
  diningEssential: "Wed, Apr 14, 2027",
};

export const sources = [
  { label: "VV Insider: May 29, 2027 sailing", href: "https://vvinsider.com/voyage/grand-turk-and-bimini-beach-club-29-may-2027-on-valiant-lady/" },
  { label: "Virgin Voyages: what's included", href: "https://www.virginvoyages.com/ahoy/stories/whats-included-on-a-virgin-voyages-cruise" },
  { label: "Virgin Voyages: payments", href: "https://www.virginvoyages.com/faq/before-you-sail/payments" },
  { label: "Virgin Voyages: pre-voyage policies", href: "https://www.virginvoyages.com/faq/before-you-sail/pre-voyage-policies" },
  { label: "Virgin Voyages: what to wear", href: "https://www.virginvoyages.com/ahoy/stories/what-to-wear-on-a-cruise" },
  { label: "Cruise.Blog: 2025 fare changes", href: "https://cruise.blog/2025/09/virgin-voyages-overhauls-cruise-fares-adds-no-frills-option" },
  { label: "U.S. passports", href: "https://travel.state.gov/content/travel/en/passports.html" },
];
