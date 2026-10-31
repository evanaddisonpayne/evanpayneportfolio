// Tanya's bachelorette · May 2027 — private planning site (/tanyasbach, noindex).
// Nothing is booked. This site collects RSVPs and votes; forms post to a Google Sheet via Apps Script.
// Destination facts checked Oct 27, 2026. Entry rules change, so reconfirm before booking.

export const BASE = "/tanyasbach";

/**
 * Apps Script web-app URL (…/exec) for the "Tanya's Bach — Trip Planning" sheet. It's public by design (the browser posts to it),
 * and it only ever returns aggregate tallies. Override with NEXT_PUBLIC_TANYASBACH_SHEET_URL; set that to "demo" for sample data.
 */
const SHEET_DEFAULT = "https://script.google.com/macros/s/AKfycbwz9C6DwRDjcAw8o3qaxBTvMJg5MavAuz5yz3_3uuT51uCsv2b80v4oRXWX8B-eEcGM/exec";
const SHEET_ENV = process.env.NEXT_PUBLIC_TANYASBACH_SHEET_URL;
export const SHEET_URL = SHEET_ENV === "demo" ? "" : SHEET_ENV || SHEET_DEFAULT;

/** Firm guest list until RSVPs are in: Tanya plus 15 friends (16 travelers). */
export const INVITED = 15;

/** Destinations renamed after votes came in: old name → current name, merged in results. */
export const DEST_ALIASES: Record<string, string> = { "Tulum / Riviera Maya": "Cancún / Tulum" };
export const TRAVELERS = INVITED + 1;
export const GROUP_SIZE = String(INVITED);
/** Countdown target. May 1, 2027 until the group locks a weekend; then set this to the departure time. */
export const TRIP_TARGET = "2027-05-01T00:00:00-04:00";
export const TRIP_TARGET_LABEL = "until May 2027";

/** Voting (destination, dates, vibes) closes the night before Thanksgiving. Eastern time is EST (−05:00) by late November. */
export const VOTE_DEADLINE = "2026-11-25T23:59:59-05:00";
export const VOTE_DEADLINE_LABEL = "Wed, Nov 25 at 11:59 pm ET";
export const VOTE_FORMS: FormKind[] = ["final"];
export const votingOpen = (now = Date.now()) => now < new Date(VOTE_DEADLINE).getTime();

export const NO_REFUND = "Once you pay or commit, you're in. If you cancel after that, there are no refunds.";

export type FormKind = "rsvp" | "destination" | "dates" | "budget" | "vibes" | "final";

/** The planning passport: one stamp per form. */
export const STAMPS: { id: FormKind; label: string; short: string; href: string; motif: "hibiscus" | "palm" | "sun" | "shell" | "maraca" }[] = [
  { id: "rsvp", label: "RSVP & travel details", short: "RSVP", href: `${BASE}/rsvp#rsvp`, motif: "hibiscus" },
  { id: "destination", label: "Rank the destinations", short: "Destino", href: `${BASE}/vote#destination`, motif: "palm" },
  { id: "dates", label: "Pick your weekends", short: "Fechas", href: `${BASE}/vote#dates`, motif: "sun" },
  { id: "vibes", label: "Choose the vibes", short: "Vibe", href: `${BASE}/vote#vibes`, motif: "maraca" },
  { id: "budget", label: "Budget, privately", short: "Presupuesto", href: `${BASE}/rsvp#budget`, motif: "shell" },
];

export type Dest = {
  id: string;
  name: string;
  place: string;
  coords: string;
  tagline: string;
  pitch: string;
  lang: string;
  money: string;
  may: string;
  entry: string[];
  watch: string;
  cost: "$" | "$$" | "$$$" | "$$$$";
  costNote: string;
  bestFor: string[];
  oddOne?: string;
};

export const DESTS: Dest[] = [
  {
    id: "ctg",
    name: "Cartagena, Colombia",
    place: "Old City + Rosario Islands",
    coords: "10.39° N · 75.51° W",
    tagline: "Bougainvillea balconies and a boat to the islands.",
    pitch:
      "A walled colonial city made for golden-hour photos, rooftop bars, and late dinners, with a day on the Rosario Islands by private boat. The most romantic city on the ballot.",
    lang: "Spanish",
    money: "Colombian peso; cards widely taken, carry cash for boats",
    may: "Hot and humid, highs near 88 °F. May is the start of the rainy season, mostly tropical bursts that pass quickly.",
    entry: [
      "Passport, no visa (up to 90 days)",
      "Free Check-MIG form on migracioncolombia.gov.co within 72 hours of your flight",
      "Plan on 6 months of passport validity",
    ],
    watch: "Fill in Check-MIG only on the official government site. Look-alike sites charge for it.",
    cost: "$$",
    costNote: "Big colonial houses for 16 are good value; boats and nightlife add up.",
    bestFor: ["Old town wander", "Photoshoot", "Big night out"],
  },
  {
    id: "tulum",
    name: "Cancún / Tulum",
    place: "Cancún & Tulum, Mexico",
    coords: "21.16° N · 86.85° W",
    tagline: "Big nights in Cancún, cenotes and beach clubs in Tulum.",
    pitch:
      "The best of both: Cancún's hotel zone for pool days and nightlife, and Tulum about two hours south for cenote swims, Maya ruins over the sea, and golden-hour beach clubs. Cancún has the most direct flights of anywhere on the list, and Tulum now has its own airport too.",
    lang: "Spanish",
    money: "Mexican peso; many hotels and beach clubs price in dollars",
    may: "Hot, highs around 90 °F, with warm, clear water in the cenotes.",
    entry: ["Passport, no visa", "No paper form when you land at Cancún; immigration stamps your passport"],
    watch:
      "Local officials put sargassum (seaweed) season at May–November, and it can reach both Cancún and Tulum beaches. Cenotes and pools are unaffected.",
    cost: "$$$",
    costNote: "Cancún resorts can be good value for a group; Tulum's boutique hotels and beach-club minimums run higher.",
    bestFor: ["Beach club", "Cenotes", "Big night out"],
  },
  {
    id: "cruise",
    name: "Virgin Voyages cruise",
    place: "Miami round trip · Valiant Lady",
    coords: "25.77° N · 80.17° W",
    tagline: "Adults only, five nights, and the islands come to us.",
    pitch:
      "Every Virgin Voyages sailing is 18 and over. Five nights round trip from Miami: two sea days of pool decks and parties (including Scarlet Night, the ship-wide party in red), a Caribbean port, and a beach day at Virgin's private Bimini Beach Club. One booking covers the room, every restaurant, and the nightlife.",
    lang: "English onboard",
    money: "US dollars, charged to your cabin",
    may: "Five-night sailings leave Miami May 1, 10, 15, 24 and 29. Each stops at Bimini plus Grand Turk or Grand Cayman, depending on the date.",
    entry: [
      "Round trip from a US port: a passport is strongly recommended, though US citizens can sail with a birth certificate and photo ID",
      "Fly into Miami (MIA) or Fort Lauderdale (FLL), ideally the day before",
      "18+ only on every sailing",
    ],
    watch:
      "Sailings run Saturday to Thursday or Monday to Saturday, not Thursday to Sunday, so a cruise means picking one of its dates. Cabins are compact, so plan on two to a room.",
    cost: "$$",
    costNote:
      "Listed May fares start around $730–$1,350 depending on date and cabin. Restaurants and basic Wi-Fi are included; drinks, gratuities and excursions are extra.",
    bestFor: ["Party at sea", "Pool decks", "One easy booking"],
  },
  {
    id: "tci",
    name: "Turks and Caicos",
    place: "Grace Bay, Providenciales",
    coords: "21.79° N · 72.17° W",
    tagline: "The bluest water on the list, no contest.",
    pitch:
      "Grace Bay is the postcard: calm turquoise water, white sand, and big beachfront villas with a chef. Slower, quieter, and the most luxurious of the four.",
    lang: "English",
    money: "US dollars",
    may: "About 82 °F with water near 80 °F. May is shoulder season, and hurricane season doesn't start until June 1.",
    entry: ["Passport, no visa", "Passport valid for your whole stay (6 months recommended)"],
    watch: "May villa rates run 30–40% below peak, but it's still the priciest island here.",
    cost: "$$$$",
    costNote: "Villas and boats in dollars; the most expensive pick on the list.",
    bestFor: ["Villa life", "Snorkel", "Private boat"],
    oddOne: "The one not in Spanish: a British territory that speaks English and spends dollars.",
  },
];

/** Thursday-to-Sunday blocks in May 2027. */
export const WEEKENDS: { id: string; label: string; note?: string }[] = [
  { id: "apr29", label: "Apr 29 – May 2" },
  { id: "may06", label: "May 6 – 9", note: "Mother's Day Sun" },
  { id: "may13", label: "May 13 – 16" },
  { id: "may20", label: "May 20 – 23" },
  { id: "may27", label: "May 27 – 31", note: "Memorial Day Mon" },
];

/** Virgin Voyages Valiant Lady, 5 nights round trip from Miami (fixed dates; listed Oct 2026). */
export const SAILINGS: { id: string; label: string; note: string }[] = [
  { id: "vv0501", label: "Cruise May 1 – 6", note: "Sat–Thu · Grand Turk" },
  { id: "vv0510", label: "Cruise May 10 – 15", note: "Mon–Sat · Grand Cayman" },
  { id: "vv0515", label: "Cruise May 15 – 20", note: "Sat–Thu · Grand Turk" },
  { id: "vv0524", label: "Cruise May 24 – 29", note: "Mon–Sat · Grand Cayman" },
  { id: "vv0529", label: "Cruise May 29 – Jun 3", note: "Sat–Thu · Grand Turk" },
];

export const NIGHTS = ["3 nights", "4 nights", "5 nights", "6+ nights"];

export const VIBES: { id: string; label: string; icon: string }[] = [
  { id: "beachclub", label: "Beach club day", icon: "☀" },
  { id: "boat", label: "Catamaran / boat party", icon: "⛵" },
  { id: "salsa", label: "Salsa or bachata lesson", icon: "♪" },
  { id: "spa", label: "Spa & pool day", icon: "✿" },
  { id: "rum", label: "Rum or tequila tasting", icon: "◈" },
  { id: "snorkel", label: "Snorkel or cenote swim", icon: "≈" },
  { id: "food", label: "Street food tour", icon: "✦" },
  { id: "night", label: "Big night out", icon: "☾" },
  { id: "photo", label: "Group photoshoot", icon: "◎" },
  { id: "yoga", label: "Sunrise yoga", icon: "☼" },
  { id: "oldtown", label: "Old town wander", icon: "⌂" },
  { id: "dinner", label: "Themed dinner", icon: "✶" },
];

export const SPLURGE = ["Gorgeous villa", "Private boat", "Big group dinner", "Spa day", "Club / bottle service", "Photographer"];
export const ROOMING = ["Happy to share a bed", "Share a room, own bed", "Need my own room"];

export const BUDGET = { min: 500, max: 3500, step: 100, start: 1500 };

/** Budget as simple choices. Values land in the Budget tab as "up to" amounts and fall into the right result bands. */
export const BUDGET_CHOICES: { label: string; value: number }[] = [
  { label: "Under $1,000", value: 999 },
  { label: "$1,000 to $1,500", value: 1499 },
  { label: "$1,500 to $2,000", value: 1999 },
  { label: "$2,000 to $3,000", value: 2999 },
  { label: "$3,000 or more", value: 3500 },
  { label: "Rather not say", value: 0 },
];

export const PASSPORT_CHOICES = ["Good through Dec 2027 or later", "Expires before Dec 2027", "I don't have one yet", "Not sure"];
export const BUDGET_BANDS = ["Under $1k", "$1k–1.5k", "$1.5k–2k", "$2k+"];

export type Results = {
  rsvps: number;
  destination: Record<string, number>;
  dates: Record<string, number>;
  vibes: Record<string, number>;
  budgetBands: Record<string, number>;
  /** Final vote: option id → reaction label → count (latest answer per person). */
  final?: Record<string, Record<string, number>>;
};

/** Shown until the Sheet is connected, clearly labeled as sample data. */
export const SAMPLE: Results = {
  rsvps: 11,
  destination: { "Cartagena, Colombia": 31, "Cancún / Tulum": 27, "Virgin Voyages cruise": 22, "Turks and Caicos": 18 },
  dates: { "May 13 – 16": 9, "May 20 – 23": 8, "May 27 – 31": 6, "Apr 29 – May 2": 4, "May 6 – 9": 3 },
  vibes: { "Catamaran / boat party": 10, "Beach club day": 9, "Salsa or bachata lesson": 7, "Big night out": 7, "Spa & pool day": 5, "Street food tour": 4 },
  budgetBands: { "Under $1k": 2, "$1k–1.5k": 5, "$1.5k–2k": 3, "$2k+": 1 },
  final: {
    villa: { "🔥 Obsessed": 4, "🙌 I'm in": 3, "🤷‍♀️ Could work": 1, "🙅‍♀️ Can't make it": 0 },
    cruise: { "🔥 Obsessed": 3, "🙌 I'm in": 2, "🤷‍♀️ Could work": 2, "🙅‍♀️ Can't make it": 1 },
  },
};

export const sources: { label: string; href: string }[] = [
  { label: "Virgin Voyages May 2027 sailings", href: "https://www.taoticket.com/en_US/co/virgin-voyages/de/caribbean/may" },
  { label: "Family Vacationist · Virgin, adults only", href: "https://familyvacationist.com/virgin-voyages-cruises-adults-only-review/" },
  { label: "Cruise Mummy · Virgin, what's included", href: "https://www.cruisemummy.co.uk/?p=27699" },
  { label: "AAA · closed-loop cruises", href: "https://cluballiance.aaa.com/the-extra-mile/advice/travel/closed-loop-cruise" },
  { label: "Migración Colombia (Check-MIG)", href: "https://www.migracioncolombia.gov.co/" },
  { label: "TCI Border Force · entry", href: "https://borderforce.gov.tc/entry-requirements" },
  { label: "Mexico News Daily · sargassum", href: "https://mexiconewsdaily.com/news/sargassum-riviera-maya-increase-seaweed-beaches" },
  { label: "TravelPulse · Cancún arrivals", href: "https://www.travelpulse.com/news/destinations/cancun-eliminates-mandatory-customs-forms-for-arriving-tourists" },
  { label: "TC Villas · T&C by month", href: "https://tcvillas.com/en/the-best-time-to-visit-turks-caicos-a-month-by-month-weather-price-crowd-guide-2026" },
];

/* ------------------------------------------------------------------ */
/* Final vote (Oct 31, 2026): two options, voted with emoji reactions. */
/* Estimates are per person for a moderately boozy bach. Flights extra. */
/* ------------------------------------------------------------------ */

/** One reaction per option. Points decide the winner; "Can't make it" also tells us who'd miss out. */
export const REACTIONS: { emoji: string; word: string; label: string; pts: number }[] = [
  { emoji: "🔥", word: "Obsessed", label: "🔥 Obsessed", pts: 3 },
  { emoji: "🙌", word: "I'm in", label: "🙌 I'm in", pts: 2 },
  { emoji: "🤷‍♀️", word: "Could work", label: "🤷‍♀️ Could work", pts: 1 },
  { emoji: "🙅‍♀️", word: "Can't make it", label: "🙅‍♀️ Can't make it", pts: 0 },
];
export const CANT = REACTIONS[3].label;

/** Headcount the villa math is split by (the listing sleeps 14 at most). */
export const VILLA_GUESTS = 13;
export const VILLA_TOTAL = 9400;

export type CostLine = { item: string; note: string; amount: number };
export type FinalOption = {
  id: "villa" | "cruise";
  name: string;
  short: string;
  kicker: string;
  when: string;
  nights: string;
  where: string;
  url?: string;
  low: number;
  high: number;
  lines: CostLine[];
  extra?: { item: string; amount: string };
  perks: string[];
  heads: string[];
};

const perHead = Math.round(VILLA_TOTAL / VILLA_GUESTS);

export const FINAL_OPTIONS: FinalOption[] = [
  {
    id: "villa",
    name: "The Turks and Caicos villa",
    short: "Villa",
    kicker: "Option A · Providenciales",
    when: "Thu May 27 – Mon May 31",
    nights: "4 nights, Memorial Day weekend",
    where: "Leeward Jewel Villa, a canal-front villa in Leeward, Providenciales",
    url: "https://www.airbnb.com/rooms/1228191996070103290",
    low: 1450,
    high: 1850,
    lines: [
      { item: "The villa", note: `$${VILLA_TOTAL.toLocaleString("en-US")} total ÷ ${VILLA_GUESTS} of us, 4 nights`, amount: perHead },
      { item: "Groceries", note: "Breakfasts, lunches and snacks at the house. Island prices run high.", amount: 175 },
      { item: "Drinks", note: "A stocked bar at the house plus rounds when we go out", amount: 300 },
      { item: "Dinners out", note: "3 nights, service charge included", amount: 300 },
      { item: "Getting around", note: "Rental vans or taxis, plus airport rides", amount: 100 },
    ],
    extra: { item: "Optional private boat day (half day)", amount: "+ about $300" },
    perks: [
      "The whole house is ours: pool, hot tub, full bar, fire pits, a big kitchen",
      "Kayaks and paddle boards on the canal",
      "Rated 5.0 on Airbnb (12 reviews), Guest Favorite",
      "Grace Bay's turquoise water: Turks and Caicos won Round 1",
    ],
    heads: [
      "Passport needed (international flight into Providenciales, PLS)",
      "7 bedrooms and 8 beds for 13 of us, so some of us share beds",
      "Sleeps 14 at most",
      "We cook, clean up and plan the days ourselves",
    ],
  },
  {
    id: "cruise",
    name: "The Virgin Voyages cruise",
    short: "Cruise",
    kicker: "Option B · Miami round trip",
    when: "Sat May 29 – Thu Jun 3",
    nights: "5 nights at sea, plus a night in Miami before",
    where: "Valiant Lady from Miami: Grand Turk (Mon) and The Beach Club at Bimini (Wed)",
    low: 1900,
    high: 2400,
    lines: [
      { item: "Cruise fare", note: "Cheapest cabin, two to a room. The price changes daily.", amount: 1145 },
      { item: "Taxes and port fees", note: "Estimate", amount: 175 },
      { item: "Crew tips", note: "$20 a day, prepaid", amount: 100 },
      { item: "Drinks", note: "Around 5 a day at onboard bar prices", amount: 375 },
      { item: "Dinners", note: "Included: 20+ restaurants", amount: 0 },
      { item: "Groceries", note: "Included: all meals on board", amount: 0 },
      { item: "Grand Turk excursion", note: "A beach or snorkel trip in port", amount: 100 },
      { item: "Night in Miami before", note: "Shared hotel room, dinner, ride to the port", amount: 200 },
    ],
    perks: [
      "Adults only, with Scarlet Night (everyone in red) and pool parties",
      "A day on Grand Turk plus a beach club day at Bimini",
      "Every meal is included, with no cooking or cleanup",
      "One booking covers the room, food and nightlife",
    ],
    heads: [
      "Passport recommended (a birth certificate and photo ID also work)",
      "Longer: 5 nights plus a travel day, home Thursday afternoon",
      "Fewer people could make these dates in Round 1",
      "Cabins are small, two to a room",
    ],
  },
];

/** Round 1 date availability (11 people answered) for each option's dates. */
export const FINAL_FACTS: { k: string; villa: string; cruise: string }[] = [
  { k: "Dates", villa: "Thu May 27 – Mon May 31", cruise: "Sat May 29 – Thu Jun 3" },
  { k: "Time away", villa: "4 nights", cruise: "5 nights + 1 in Miami" },
  { k: "Est. per person", villa: "$1,450 – $1,850", cruise: "$1,900 – $2,400" },
  { k: "Dinners & groceries", villa: "We pay", cruise: "Included" },
  { k: "Passport", villa: "Required", cruise: "Recommended" },
  { k: "Could make these dates (Round 1)", villa: "10 of 11", cruise: "8 of 11" },
];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
