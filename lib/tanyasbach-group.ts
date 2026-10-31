// Per-person answers for /tanyasbach-private/group, copied from the "Tanya's Bach — Trip Planning" Google Sheet
// (Budget, Vibes and Rsvp tabs). Where someone submitted a form more than once, their latest answer is used
// (and their latest non-empty must-do idea). No emails or phone numbers here: this page is an open link.
//
// TO REFRESH: ask Claude to re-pull the sheet, or edit a person below. Comfort max is the form's bracket value in USD,
// excluding flights.

export const SNAPSHOT = "Oct 31, 2026";
export const INVITED = 15;
export const STILL_WAITING = "Tanya, Lina and 2 others";

export type RoomPref = "Need my own room" | "Share a room, own bed" | "Happy to share a bed";

export type Person = {
  name: string;
  budget: number; // comfort max, USD, excl. flights
  splurge: string[];
  budgetNote?: string;
  vibes: string[];
  mustDo?: string;
  room: RoomPref;
  roommateWish?: string;
};

export const PEOPLE: Person[] = [
  {
    name: "Evan Addison Payne",
    budget: 3500,
    splurge: ["Private boat", "Big group dinner", "Spa day"],
    vibes: ["Beach club day", "Catamaran / boat party", "Spa & pool day", "Rum or tequila tasting", "Themed dinner", "Big night out"],
    room: "Need my own room",
  },
  {
    name: "Ana Martinez",
    budget: 3500,
    splurge: ["Private boat"],
    vibes: ["Beach club day", "Catamaran / boat party", "Sunrise yoga", "Themed dinner"],
    room: "Share a room, own bed",
  },
  {
    name: "Cynthia Alarcon",
    budget: 2999,
    splurge: [],
    vibes: [
      "Beach club day", "Catamaran / boat party", "Salsa or bachata lesson", "Spa & pool day", "Rum or tequila tasting",
      "Snorkel or cenote swim", "Street food tour", "Group photoshoot", "Sunrise yoga", "Big night out",
    ],
    room: "Share a room, own bed",
    roommateWish: "Vanessa or Megan",
  },
  {
    name: "Vanessa Macias",
    budget: 2999,
    splurge: ["Gorgeous villa"],
    vibes: [
      "Rum or tequila tasting", "Street food tour", "Sunrise yoga", "Old town wander", "Themed dinner", "Group photoshoot",
      "Snorkel or cenote swim", "Catamaran / boat party", "Beach club day", "Salsa or bachata lesson", "Spa & pool day", "Big night out",
    ],
    room: "Happy to share a bed",
    roommateWish: "Megan and Cynthia",
  },
  {
    name: "Megan Alarcon",
    budget: 2999,
    splurge: [],
    vibes: ["Beach club day", "Catamaran / boat party", "Spa & pool day", "Street food tour", "Themed dinner", "Big night out", "Snorkel or cenote swim"],
    room: "Happy to share a bed",
    roommateWish: "Vanessa and Cynthia",
  },
  {
    name: "Mai Chanthaboune",
    budget: 2999,
    splurge: ["Gorgeous villa", "Spa day", "Private boat"],
    vibes: ["Catamaran / boat party", "Spa & pool day", "Rum or tequila tasting", "Street food tour"],
    mustDo: "Drankksss",
    room: "Happy to share a bed",
    roommateWish: "Suong, Lina, or Tanya",
  },
  {
    name: "Peighton Taylor",
    budget: 2999,
    splurge: ["Private boat", "Spa day", "Big group dinner"],
    vibes: [
      "Beach club day", "Catamaran / boat party", "Salsa or bachata lesson", "Spa & pool day", "Rum or tequila tasting",
      "Snorkel or cenote swim", "Street food tour", "Big night out", "Sunrise yoga", "Old town wander", "Themed dinner",
    ],
    mustDo: "Get her drunk and on a boat",
    room: "Share a room, own bed",
    roommateWish: "Lily and/or Evan",
  },
  {
    name: "Suong",
    budget: 1999,
    splurge: ["Gorgeous villa", "Private boat", "Big group dinner", "Spa day", "Club / bottle service", "Photographer"],
    budgetNote: "No hard cap: happy to pay whatever it costs.",
    vibes: [
      "Beach club day", "Catamaran / boat party", "Salsa or bachata lesson", "Spa & pool day", "Rum or tequila tasting",
      "Snorkel or cenote swim", "Street food tour", "Big night out", "Group photoshoot", "Sunrise yoga", "Old town wander", "Themed dinner",
    ],
    mustDo: "Should we take her to a strip club? Lol",
    room: "Happy to share a bed",
    roommateWish: "Her sisters, Mai and Lina",
  },
  {
    name: "Alexis Arenas Andrade",
    budget: 1999,
    splurge: ["Private boat", "Gorgeous villa", "Spa day"],
    budgetNote: "Can go higher if needed.",
    vibes: ["Catamaran / boat party", "Salsa or bachata lesson", "Street food tour", "Big night out", "Themed dinner"],
    room: "Share a room, own bed",
    roommateWish: "Evan (lol)",
  },
  {
    name: "Alejandra Rubio Villalobos",
    budget: 1999,
    splurge: ["Gorgeous villa", "Private boat"],
    budgetNote: "Asked about payment plans. Needs 2 months' notice at work for dates and location.",
    vibes: ["Beach club day", "Catamaran / boat party", "Snorkel or cenote swim", "Big night out", "Spa & pool day", "Themed dinner", "Old town wander"],
    mustDo: "A slideshow of memories with Tanya through the different phases of her life",
    room: "Happy to share a bed",
  },
  {
    name: "Lily Ho",
    budget: 1999,
    splurge: ["Spa day", "Private boat"],
    vibes: ["Catamaran / boat party", "Spa & pool day", "Old town wander", "Beach club day"],
    mustDo: "Tanya loves a museum",
    room: "Happy to share a bed",
    roommateWish: "Peighton",
  },
];

/** Count how many people picked each option, most popular first. */
export function tally(pick: (p: Person) => string[]): { label: string; count: number }[] {
  const m = new Map<string, number>();
  for (const p of PEOPLE) for (const v of pick(p)) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export const firstName = (n: string) => n.split(" ")[0];
export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
