// Amsterdam · Thanksgiving 2026 — private group trip page (/amsterdam, noindex).
// All times are Amsterdam time (CET, UTC+1). Facts checked Oct 9, 2026; hours change, so reconfirm the week before.

export type Person = "Evan" | "Jarrod" | "Zak" | "Tyler";
export const PEOPLE: Person[] = ["Evan", "Jarrod", "Zak", "Tyler"];

export type Vibe = "food" | "local" | "pub" | "coffeeshop" | "queer" | "club" | "culture" | "chill";
export const VIBES: { id: Vibe; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "pub", label: "Moody pub" },
  { id: "local", label: "Local" },
  { id: "coffeeshop", label: "Coffeeshop" },
  { id: "culture", label: "Culture" },
  { id: "queer", label: "Queer" },
  { id: "club", label: "Club" },
  { id: "chill", label: "Chill option" },
];

export type Stop = {
  time: string; // display time, e.g. "5:45 pm"
  start: string; // 24h "HH:MM" Amsterdam time, for the "now" marker
  title: string;
  where?: string; // area or address, used for the map link
  map?: string; // Google Maps search query override
  why: string;
  tips?: string[];
  vibes?: Vibe[];
  who?: Person[]; // omitted = everyone
  must?: boolean;
  card?: string; // what the I amsterdam card covers here
  book?: string; // booking note
  link?: { href: string; label: string };
};

export type Day = {
  id: string;
  date: string; // ISO date in Amsterdam
  dow: string;
  num: string;
  title: string;
  mood: string;
  intro: string;
  cardDay?: string;
  stops: Stop[];
  rain?: string;
};

export const TRIP_START = "2026-11-24T10:40:00+01:00";
export const TRIP_END = "2026-11-30T23:59:00+00:00";

export const crew: { name: Person; room: string; from: string; legs: { label: string; when: string; detail: string }[] }[] = [
  {
    name: "Evan",
    room: "Room 1 · with Zak",
    from: "Chicago via Reykjavík",
    legs: [
      { label: "In", when: "Tue Nov 24 · 11:55 am", detail: "FI500 from Keflavík" },
      { label: "Out", when: "Sun Nov 29 · 8:20 pm", detail: "FI505 to Keflavík, then a night in Grindavík" },
    ],
  },
  {
    name: "Jarrod",
    room: "Room 2 · with Tyler",
    from: "Chicago via Reykjavík",
    legs: [
      { label: "In", when: "Tue Nov 24 · 11:55 am", detail: "FI500 from Keflavík" },
      { label: "Out", when: "Sun Nov 29 · 8:20 pm", detail: "FI505 to Keflavík, then a night in Grindavík" },
    ],
  },
  {
    name: "Zak",
    room: "Room 1 · with Evan",
    from: "Fayetteville via Atlanta",
    legs: [
      { label: "In", when: "Tue Nov 24 · 10:40 am", detail: "DL074 from Atlanta" },
      { label: "Out", when: "Sun Nov 29 · 10:00 am", detail: "KL623 to Atlanta. Leave the hotel at 6:30 am" },
    ],
  },
  {
    name: "Tyler",
    room: "Room 2 · with Jarrod",
    from: "Fayetteville via Atlanta",
    legs: [
      { label: "In", when: "Tue Nov 24 · 10:40 am", detail: "DL074 from Atlanta" },
      { label: "Out", when: "Sun Nov 29 · 10:00 am", detail: "KL623 to Atlanta. Leave the hotel at 6:30 am" },
    ],
  },
];

export const hotel = {
  name: "Sir Adam",
  address: "Overhoeksplein 7, Amsterdam-Noord",
  how: "Free ferry from behind Centraal Station to Buiksloterweg, 5 minutes, then a 2-minute walk. Runs all night.",
};

const MAP = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapUrl = MAP;

export const days: Day[] = [
  {
    id: "tue",
    date: "2026-11-24",
    dow: "Tue",
    num: "24",
    title: "Land, nap, Noord",
    mood: "Jet-lag day",
    intro:
      "Everyone lands after an overnight flight and the room may not be ready until the afternoon. Keep it light and stay in Noord. Don't start the I amsterdam card today; tap a contactless card on transport instead.",
    stops: [
      {
        time: "10:40 am",
        start: "10:40",
        title: "Zak & Tyler land",
        where: "Schiphol Airport",
        why: "Arriving from Atlanta means passport control. The EU's new Entry/Exit System takes fingerprints and a photo on a first visit, so allow extra time.",
        who: ["Zak", "Tyler"],
        tips: ["Grab coffee at Schiphol Plaza and wait for Evan & Jarrod there."],
      },
      {
        time: "11:55 am",
        start: "11:55",
        title: "Evan & Jarrod land",
        where: "Schiphol Airport",
        why: "Arriving from Iceland, so no passport control here. You already cleared it at Keflavík that morning.",
        who: ["Evan", "Jarrod"],
      },
      {
        time: "12:30 pm",
        start: "12:30",
        title: "Train → Centraal → free ferry to Noord",
        where: "Amsterdam Centraal",
        why: "The train is about 15–20 minutes. The I amsterdam card does not cover it, so tap in and out with a contactless card or phone.",
        tips: [
          "Walk out the back of Centraal (the IJ side) for the free ferry to Buiksloterweg.",
          "Drop bags at Sir Adam and ask about early check-in.",
        ],
      },
      {
        time: "2:00 pm",
        start: "14:00",
        title: "Lunch at The Butcher Social Club",
        where: "A'DAM Tower, Overhoeksplein",
        map: "The Butcher Social Club Amsterdam Noord",
        why: "It's in your own building. Burgers and beer, with no effort needed on day one.",
        vibes: ["food", "chill"],
      },
      {
        time: "3:00 pm",
        start: "15:00",
        title: "Nap, or a river walk to EYE",
        where: "EYE Filmmuseum, Amsterdam",
        why: "Sleep until about 5, or walk 10 minutes west along the IJ to the EYE Film Museum. The lobby is free and has the best river view in Noord. Sunset is around 4:40.",
        vibes: ["chill"],
      },
      {
        time: "7:00 pm",
        start: "19:00",
        title: "Dinner at Hotel de Goudfazant",
        where: "Aambeeldstraat 10H, Amsterdam-Noord",
        map: "Hotel de Goudfazant Amsterdam",
        why: "A candlelit restaurant in a converted garage with a French-leaning menu. It feels very Noord, about 15 minutes from the hotel by taxi or bus.",
        vibes: ["food", "pub", "local"],
        book: "Book a table for 4",
      },
      {
        time: "9:30 pm",
        start: "21:30",
        title: "One nightcap at the hotel, then bed",
        where: "Sir Adam Hotel Amsterdam",
        why: "Getting through jet lag tonight pays off for the rest of the week.",
        vibes: ["chill"],
      },
    ],
    rain: "Nothing changes. Today is already indoors and close to the hotel.",
  },
  {
    id: "wed",
    date: "2026-11-25",
    dow: "Wed",
    num: "25",
    title: "Windmills, Boerejongens, Van Kerkwijk",
    mood: "Classic Amsterdam",
    cardDay: "Start your I amsterdam card here. A 4-day card started Wednesday morning runs to Sunday morning and covers everything through Saturday night.",
    intro:
      "Use the early jet-lag wake-up for the windmills. Then a proper coffeeshop sit-down, the must-eat dinner on the Nes, and a brown-café crawl. The Light Festival isn't on yet tonight.",
    stops: [
      {
        time: "8:45 am",
        start: "08:45",
        title: "Ferry + train to Zaanse Schans",
        where: "Zaandijk Zaanse Schans station",
        why: "The train from Centraal to Zaandijk Zaanse Schans takes about 17 minutes, then it's a 15-minute walk over the bridge. The card does not cover this train; tap a contactless card.",
      },
      {
        time: "9:30 am",
        start: "09:30",
        title: "Zaanse Schans",
        where: "Zaanse Schans",
        why: "Windmills along the dike, a cheese farm and a clog workshop, and far fewer crowds in November. Two to three hours is plenty.",
        vibes: ["culture"],
        must: true,
        card: "Card covers the Zaans Museum + Verkade Experience, the Mill Museum and windmills, and the Time Museum.",
        tips: ["Some windmills and workshops close in winter.", "Activate the card at your first entry here."],
      },
      {
        time: "12:30 pm",
        start: "12:30",
        title: "Pancakes in the village",
        where: "Pannenkoekenrestaurant De Kraai, Zaanse Schans",
        map: "De Kraai pancakes Zaanse Schans",
        why: "Dutch pancakes (pannenkoeken) are the right lunch after a cold walk on the dike. Winter hours aren't confirmed, so if it's closed, eat at the cheese farm or back in the city.",
        vibes: ["food"],
      },
      {
        time: "3:00 pm",
        start: "15:00",
        title: "Boerejongens Centrum",
        where: "Utrechtsestraat 21, Amsterdam",
        map: "Boerejongens Utrechtsestraat 21 Amsterdam",
        why: "Often called the Apple Store of cannabis: marble counters, staff in bow ties, and people who actually know the menu. Non-smokers can just have a coffee.",
        vibes: ["coffeeshop", "local"],
        must: true,
        card: "Tram from Centraal is covered by the card.",
        tips: [
          "Open daily 7:00 am–12:45 am. 18+, so bring your passport.",
          "The red velvet space cake is famously strong. Reviewers say a quarter was too much, so share one.",
        ],
        link: { href: "https://www.boerejongens.com/", label: "boerejongens.com" },
      },
      {
        time: "4:45 pm",
        start: "16:45",
        title: "Walk the canals to the Nes",
        where: "Herengracht, Amsterdam",
        why: "From Utrechtsestraat it's a 15-minute walk along the Herengracht and past the Munttoren to the Nes. The canal houses are just lighting up at dusk.",
        vibes: ["chill", "local"],
      },
      {
        time: "5:45 pm",
        start: "17:45",
        title: "Dinner at Café Restaurant Van Kerkwijk",
        where: "Nes 41, Amsterdam",
        map: "Café Restaurant van Kerkwijk Nes 41 Amsterdam",
        why: "A cozy, packed little room near the Dam with no printed menu. The waiter recites the day's dishes at your table. It's unfussy and good, and a favorite with people who live here.",
        vibes: ["food", "local"],
        must: true,
        tips: [
          "Known as walk-in only, and it fills by 7. Arrive before 6, or call 020 620 3316 the week before to ask if they'll hold a table for 4.",
          "Listen closely when the menu is recited. Save room for the apple tart.",
          "Open daily 11:00 am–1:00 am.",
        ],
        link: { href: "https://www.vankerkwijk.com/", label: "vankerkwijk.com" },
      },
      {
        time: "8:00 pm",
        start: "20:00",
        title: "Brown-café crawl",
        where: "Café Hoppe, Spui, Amsterdam",
        map: "Café Hoppe Spui Amsterdam",
        why: "Start at Café Hoppe on the Spui, 5 minutes from dinner, with a sawdust floor and open since 1670. Then walk 15 minutes into the Jordaan.",
        vibes: ["pub", "local", "queer"],
        tips: [
          "Café Papeneiland: a 17th-century corner pub with Delft tiles.",
          "'t Smalle: tiny and candlelit, on the Egelantiersgracht.",
          "Café Saarein: an old-school queer brown café that welcomes everyone.",
          "Zak can call it after Hoppe. The ferry home runs all night.",
        ],
      },
    ],
    rain: "If it's pouring in the morning, swap Zaanse Schans for the Rijksmuseum (card, book a timeslot) and do the windmills Thursday morning instead.",
  },
  {
    id: "thu",
    date: "2026-11-26",
    dow: "Thu",
    num: "26",
    title: "Thanksgiving + Light Festival opening",
    mood: "The big group night",
    intro:
      "The Amsterdam Light Festival switches on for the first time tonight. The day builds toward it: an easy morning, sunset from the top of your own tower, the lights cruise, then a long dinner.",
    stops: [
      {
        time: "10:30 am",
        start: "10:30",
        title: "Slow brunch in De Pijp",
        where: "Bakers & Roasters, De Pijp, Amsterdam",
        map: "Bakers & Roasters De Pijp Amsterdam",
        why: "Big American-friendly plates at Bakers & Roasters, then a fresh stroopwafel at the Albert Cuyp Market around the corner.",
        vibes: ["food", "local", "chill"],
        card: "Tram is covered.",
      },
      {
        time: "1:00 pm",
        start: "13:00",
        title: "Rijksmuseum or Moco",
        where: "Museumplein, Amsterdam",
        why: "Both are a 10-minute walk from De Pijp and both are on the card. Go to the Rijksmuseum for the Night Watch, or Moco for Banksy and modern art. Evan can skip whatever he's seen.",
        vibes: ["culture"],
        card: "Both included. Book a timeslot in the I amsterdam app.",
        book: "Timeslot in the I amsterdam app",
      },
      {
        time: "4:00 pm",
        start: "16:00",
        title: "Sunset at A'DAM Lookout",
        where: "A'DAM Lookout, Overhoeksplein 5",
        map: "A'DAM Lookout Amsterdam",
        why: "It's on top of your hotel's tower. Catch the sunset around 4:35 from the roof, with the swing out over the edge for whoever is brave enough.",
        vibes: ["culture"],
        card: "Included (normally €18.50).",
      },
      {
        time: "5:30 pm",
        start: "17:30",
        title: "Light Festival canal cruise",
        where: "Amsterdam Light Festival",
        map: "Amsterdam Light Festival cruise",
        why: "Opening night, with the whole group and everyone sober. The lights switch on at 5:30 and the cruise is about 75 minutes. Pick a heated, covered boat, because it'll be 4–8°C.",
        vibes: ["culture"],
        must: true,
        book: "Book now: 4 people, around 5:30 pm",
        link: { href: "https://www.iamsterdam.com/en/whats-on/calendar/festivals/events/amsterdam-light-festival", label: "Festival info" },
        tips: ["One cruise option departs from the A'DAM Tower itself, so you can go straight from the Lookout to the boat."],
      },
      {
        time: "7:45 pm",
        start: "19:45",
        title: "Thanksgiving dinner",
        where: "Blauw Amsterdam",
        map: "Blauw restaurant Amsterdam",
        why: "Option A, recommended: rijsttafel at Blauw, 15–20 Indonesian dishes shared family-style. It's a feast without forcing turkey. Option B: an expat turkey dinner, but 2026 menus aren't posted yet, so check in early November.",
        vibes: ["food"],
        must: true,
        book: "Book now: 4 people, 7:45 pm",
      },
      {
        time: "10:00 pm",
        start: "22:00",
        title: "Walk a stretch of the light route",
        where: "Amsterdam Light Festival",
        why: "The artworks stay lit until 11 pm. Walk part of the route toward Centraal, have one nightcap, then go to bed. Friday is the big night.",
        vibes: ["chill"],
      },
    ],
    rain: "Rain doesn't change much: the Lookout is indoors, the cruise boat is covered, and the museums are indoors.",
  },
  {
    id: "fri",
    date: "2026-11-27",
    dow: "Fri",
    num: "27",
    title: "Daylight canals, Bulldog Boat, the big night",
    mood: "High energy",
    intro:
      "The night out. It's built so anyone can opt out at any point, because the club is in your hotel's own building, two minutes from bed.",
    stops: [
      {
        time: "11:00 am",
        start: "11:00",
        title: "Free daytime canal cruise (optional)",
        where: "Stromma canal cruise Amsterdam Centraal",
        map: "Stromma canal cruise Amsterdam",
        why: "It's free on the card. You see the canal houses in daylight, which is a different trip from the two night cruises.",
        vibes: ["culture", "chill"],
        card: "One cruise included (e.g. Stromma, Blue Boat, Circle Line). No booking; show the card.",
      },
      {
        time: "12:30 pm",
        start: "12:30",
        title: "NDSM wharf + lunch at Pllek",
        where: "Pllek, NDSM, Amsterdam",
        map: "Pllek Amsterdam NDSM",
        why: "Take the free ferry from behind Centraal to NDSM-werf, about 15 minutes. It's an old shipyard turned street-art quarter that tourists mostly skip. Pllek is a shipping-container café on the water with fireplaces in winter.",
        vibes: ["local", "food"],
      },
      {
        time: "3:00 pm",
        start: "15:00",
        title: "Rest at the hotel",
        where: "Sir Adam Hotel Amsterdam",
        why: "Tonight runs late.",
        vibes: ["chill"],
      },
      {
        time: "7:00 pm",
        start: "19:00",
        title: "Stock up for the boat",
        where: "Boerejongens Utrechtsestraat 21",
        map: "Boerejongens Utrechtsestraat 21 Amsterdam",
        why: "The Bulldog Boat doesn't sell anything, so buy beforehand. Go back to Boerejongens if Wednesday was a hit, or use any coffeeshop near Centraal. Bring snacks too.",
        vibes: ["coffeeshop"],
      },
      {
        time: "8:30 pm",
        start: "20:30",
        title: "The Bulldog Boat",
        where: "Stationsplein 30, Amsterdam",
        map: "The Bulldog Boat Stationsplein Amsterdam",
        why: "A smoke-friendly canal cruise: about 1 hour, covered and heated, two drinks included, bring your own. The 8:30 sailing finishes at Leidseplein, so you step straight into the night.",
        vibes: ["coffeeshop", "culture"],
        must: true,
        book: "Book ~2 weeks out (free cancellation to 24h)",
        link: { href: "https://bookings.thingstodoinamsterdam.com/cruise/shared-bulldog-boat", label: "Book" },
      },
      {
        time: "10:00 pm",
        start: "22:00",
        title: "Drinks toward Rembrandtplein",
        where: "Reguliersdwarsstraat, Amsterdam",
        why: "Start with a beer at Café de Spuyt, then head to Reguliersdwarsstraat, Amsterdam's main gay street. Crowds there are mixed and easygoing.",
        vibes: ["queer", "pub"],
      },
      {
        time: "12:00 am",
        start: "23:59",
        title: "Shelter",
        where: "Shelter, Overhoeksplein 3, Amsterdam",
        map: "Shelter club Amsterdam",
        why: "A DJ Mag Top 100 club in the basement of the A'DAM Tower, your building. It plays house and techno with a no-phones policy and runs until about 6 am. It turns 10 this November, so expect a strong lineup.",
        vibes: ["club"],
        book: "Tickets ~€22.50–25 once the lineup posts",
        tips: ["Late-night snack: a croquette from the wall at FEBO, a very Dutch 2 am ritual.", "Done for the night? Take the elevator."],
      },
    ],
    rain: "The Bulldog Boat has a roof. Skip the morning cruise and NDSM, and sleep in instead.",
  },
  {
    id: "sat",
    date: "2026-11-28",
    dow: "Sat",
    num: "28",
    title: "Market, jenever, farewell dinner",
    mood: "Last night together",
    intro:
      "Zak and Tyler leave at 6:30 Sunday morning, so tonight splits: an early farewell dinner as four, then Evan & Jarrod stay out (their flight isn't until 8:20 pm Sunday).",
    stops: [
      {
        time: "10:30 am",
        start: "10:30",
        title: "Noordermarkt + Winkel 43",
        where: "Noordermarkt, Amsterdam",
        why: "The Saturday farmers' market in the Jordaan has cheese, oysters and produce. On the same square, Winkel 43 makes the apple pie locals queue for. Order it met slagroom (with whipped cream).",
        vibes: ["food", "local"],
      },
      {
        time: "12:30 pm",
        start: "12:30",
        title: "Wander the Nine Streets",
        where: "De 9 Straatjes, Amsterdam",
        why: "Small shops, canal photos, and no plan needed.",
        vibes: ["local", "chill"],
      },
      {
        time: "3:00 pm",
        start: "15:00",
        title: "Wynand Fockink",
        where: "Pijlsteeg 31, Amsterdam",
        map: "Wynand Fockink Amsterdam",
        why: "A 1679 jenever tasting room in an alley behind the Dam. Custom says you sip the first glass bent over the bar without lifting it.",
        vibes: ["pub", "local"],
      },
      {
        time: "4:30 pm",
        start: "16:30",
        title: "In 't Aepjen",
        where: "Zeedijk 1, Amsterdam",
        map: "In 't Aepjen Amsterdam",
        why: "One of only two wooden houses left in the center. It's dark, crooked and full of old sailors' junk.",
        vibes: ["pub"],
      },
      {
        time: "6:30 pm",
        start: "18:30",
        title: "Farewell dinner at De Belhamel",
        where: "Brouwersgracht 60, Amsterdam",
        map: "De Belhamel Amsterdam",
        why: "An art-nouveau dining room on the corner of the Brouwersgracht with canal views. This is the last-night-together dinner.",
        vibes: ["food"],
        book: "Book now: 4 people, 6:30 pm",
      },
      {
        time: "9:00 pm",
        start: "21:00",
        title: "Light walk, then pack",
        where: "Amsterdam Light Festival",
        why: "One more lap of the light art, then back to Noord to pack. Set an alarm for 5:45 am.",
        who: ["Zak", "Tyler"],
        vibes: ["chill"],
      },
      {
        time: "9:00 pm",
        start: "21:00",
        title: "Queer-bar crawl",
        where: "Café 't Mandje, Zeedijk 63, Amsterdam",
        map: "Café 't Mandje Amsterdam",
        why: "Start at Café 't Mandje (Zeedijk 63), opened in 1927 by Bet van Beeren and Amsterdam's answer to Stonewall, with a jukebox and brown-café walls. Then Prik (Spuistraat 109) for cocktails and dancing in the back. Finish on Reguliersdwarsstraat, or go back to Shelter.",
        who: ["Evan", "Jarrod"],
        vibes: ["queer", "pub", "club"],
      },
    ],
    rain: "Swap the market for Moco or the Rijksmuseum (card) or the FOAM photo museum. The evening is all indoors anyway.",
  },
  {
    id: "sun",
    date: "2026-11-29",
    dow: "Sun",
    num: "29",
    title: "Departures",
    mood: "Goodbyes",
    intro: "Zak & Tyler fly out first thing. Evan & Jarrod get a slow last day before Iceland.",
    stops: [
      {
        time: "6:30 am",
        start: "06:30",
        title: "Leave Sir Adam",
        where: "Amsterdam Centraal",
        why: "Ferry, then train to Schiphol, arriving about 7:15 for the 10:00 KL623. US-bound flights go through passport control and extra security questions before boarding, so give it close to 3 hours.",
        who: ["Zak", "Tyler"],
        tips: [
          "Atlanta connection: 1h40 with customs, re-checking bags and security, on the busiest US travel Sunday of the year. Carry on if you can, and use Mobile Passport Control.",
          "Leave room keys; Evan & Jarrod handle checkout.",
        ],
      },
      {
        time: "11:00 am",
        start: "11:00",
        title: "Check out, late brunch",
        where: "The Butcher Social Club Amsterdam Noord",
        why: "Leave bags at the front desk and have a long, slow brunch downstairs.",
        who: ["Evan", "Jarrod"],
        vibes: ["food", "chill"],
      },
      {
        time: "1:00 pm",
        start: "13:00",
        title: "One last wander",
        where: "Jordaan, Amsterdam",
        why: "One more brown café, Café Chris (1624) or Papeneiland if you missed it, or a quiet canal walk. The card has likely run out by now, so tap contactless on trams.",
        who: ["Evan", "Jarrod"],
        vibes: ["pub", "local"],
      },
      {
        time: "5:30 pm",
        start: "17:30",
        title: "Collect bags → Schiphol",
        where: "Schiphol Airport",
        why: "Plan to reach Schiphol by about 6:20 for FI505 at 8:20 pm. It's a Schengen flight, so the airport is quick.",
        who: ["Evan", "Jarrod"],
        tips: ["You land in Keflavík at 10:50 pm, then pick up the Sixt car and drive to Harbour View, Grindavík."],
      },
    ],
  },
  {
    id: "mon",
    date: "2026-11-30",
    dow: "Mon",
    num: "30",
    title: "Blue Lagoon",
    mood: "Iceland epilogue",
    intro: "Evan & Jarrod only. It's dark until about 10:45 am, so the lagoon is lit by lamps and steam.",
    stops: [
      {
        time: "8:00 am",
        start: "08:00",
        title: "Blue Lagoon, Signature admission",
        where: "Blue Lagoon Iceland",
        why: "Leave Harbour View at 7:40. Reconfirm the day before, because volcanic closures near Grindavík happen with little notice.",
        who: ["Evan", "Jarrod"],
        vibes: ["chill"],
      },
      {
        time: "4:30 pm",
        start: "16:30",
        title: "FI853 home",
        where: "Keflavík International Airport",
        why: "Check out by 11, return the car at Keflavík by 1, and arrive at O'Hare at 5:20 pm.",
        who: ["Evan", "Jarrod"],
      },
    ],
  },
];

export const iamsterdam = {
  summary:
    "The group has I amsterdam City Cards. Here is what they cover on this trip and what they don't.",
  covered: [
    "GVB trams, metro and city buses, unlimited for the card's duration",
    "One canal cruise (e.g. Stromma, Blue Boat, Circle Line), no booking needed",
    "A'DAM Lookout, in your hotel's tower",
    "Rijksmuseum and Moco (book timeslots in the I amsterdam app)",
    "Zaanse Schans: Zaans Museum + Verkade Experience, Mill Museum and windmills, Time Museum",
    "One 24-hour bike rental",
  ],
  notCovered: [
    "NS trains, including Schiphol ⇄ Centraal and the train to Zaanse Schans. Tap a contactless card for these",
    "Van Gogh Museum, Anne Frank House",
    "The Light Festival cruise and the Bulldog Boat",
    "The IJ ferries, which are free for everyone anyway",
  ],
  activation:
    "The card starts on first use. Start it Wednesday morning: a 4-day card then runs until Sunday morning and covers every card stop in this plan.",
  source: { href: "https://www.amsterdamtips.com/iamsterdam-city-card", label: "AmsterdamTips, updated Jan 2026" },
};

export type CheckItem = { id: string; label: string; when: string };
export const checklist: { group: string; items: CheckItem[] }[] = [
  {
    group: "Now",
    items: [
      { id: "lf-cruise", label: "Light Festival cruise · Thu Nov 26, ~5:30 pm · 4 people", when: "now" },
      { id: "tday", label: "Thanksgiving dinner · Thu Nov 26, 7:45 pm · Blauw (or hold for a turkey menu)", when: "now" },
      { id: "goudfazant", label: "Hotel de Goudfazant · Tue Nov 24, 7 pm · 4 people", when: "now" },
      { id: "belhamel", label: "De Belhamel · Sat Nov 28, 6:30 pm · 4 people", when: "now" },
      { id: "harbour", label: "Decide on Harbour View, Grindavík: free cancellation ends Oct 30, 2 pm Iceland time", when: "now" },
    ],
  },
  {
    group: "Two weeks out",
    items: [
      { id: "bulldog", label: "Bulldog Boat · Fri Nov 27, 8:30 pm · 4 people", when: "2w" },
      { id: "shelter", label: "Shelter tickets for Fri Nov 27 once the lineup posts", when: "2w" },
      { id: "kerkwijk", label: "Call Van Kerkwijk (020 620 3316): will they hold a table for 4 on Wed Nov 25?", when: "2w" },
      { id: "card", label: "I amsterdam cards loaded in the app (4-day, start Wednesday)", when: "2w" },
      { id: "mpc", label: "Zak & Tyler: set up Mobile Passport Control for the Atlanta connection", when: "2w" },
      { id: "passport", label: "Passports valid 3+ months past Nov 30; check ETIAS status for your dates", when: "2w" },
    ],
  },
  {
    group: "One week out",
    items: [
      { id: "timeslots", label: "Book Rijksmuseum or Moco timeslot for Thu Nov 26 in the I amsterdam app", when: "1w" },
      { id: "weather", label: "Check the forecast. Pack a waterproof shell, warm layers and cobblestone-proof shoes", when: "1w" },
      { id: "apps", label: "Apps: NS, GVB, 9292, I amsterdam, Light Festival, Sixt", when: "1w" },
      { id: "bank", label: "Tell your bank you're traveling. One Visa/Mastercard + a little euro cash", when: "1w" },
    ],
  },
  {
    group: "Day before",
    items: [
      { id: "lockbox", label: "Evan & Jarrod: screenshot the Harbour View lockbox email", when: "0" },
      { id: "swim", label: "Evan & Jarrod: swimsuit + flip-flops for the Blue Lagoon", when: "0" },
      { id: "lagoon", label: "Reconfirm the Blue Lagoon is open", when: "0" },
    ],
  },
];

export const phrases: { nl: string; say: string; en: string }[] = [
  { nl: "Proost!", say: "prohst", en: "Cheers!" },
  { nl: "Dank je wel", say: "dahnk yuh vel", en: "Thank you" },
  { nl: "Gezellig", say: "khuh-ZEL-ikh", en: "That warm, cozy feeling brown cafés are built for" },
  { nl: "Met slagroom", say: "met SLAKH-rohm", en: "With whipped cream. Say it at Winkel 43" },
  { nl: "Nog een rondje?", say: "nokh un RON-chuh", en: "Another round?" },
  { nl: "Pinnen?", say: "PIN-nuh", en: "Card? (pin = pay by card)" },
];

export const knowhow: { title: string; items: string[] }[] = [
  {
    title: "Getting around",
    items: [
      "The ferries across the IJ from behind Centraal to Noord are free and run all night. Noord to the center is quicker by ferry and a walk than by taxi.",
      "Bike lanes are red asphalt. Never stand or walk in them; cyclists will not stop.",
      "Trains (NS) aren't on the I amsterdam card. Tap the same contactless card or phone in and out.",
    ],
  },
  {
    title: "Cannabis",
    items: [
      "Buy only inside licensed coffeeshops. Bring your passport (18+). You can smoke inside the shop or on the Bulldog Boat.",
      "Smoking on the street in the Red Light District is banned and fined. Elsewhere, be discreet.",
      "Go slow with edibles. Dutch ones are strong and take an hour or more to kick in. Anyone selling on the street is a scam or worse.",
    ],
  },
  {
    title: "Money & tipping",
    items: [
      "Cards work nearly everywhere and some places are card-only. Tip by rounding up or about 5–10% for good table service. It's not expected at bars.",
    ],
  },
  {
    title: "Weather & light",
    items: [
      "Expect 4–8°C (39–46°F), wind and drizzle. Sunrise is around 8:20 am and it's dark by 4:45 pm. Layers plus a waterproof shell beat a heavy coat.",
    ],
  },
  {
    title: "Skip",
    items: [
      "Madame Tussauds, the Heineken Experience, the Sex Museum, and any bar on Damrak or right on Leidseplein.",
    ],
  },
];

export const sources: { href: string; label: string }[] = [
  { href: "https://www.amsterdamtips.com/iamsterdam-city-card", label: "I amsterdam City Card (AmsterdamTips)" },
  { href: "https://www.vankerkwijk.com/", label: "Café Restaurant Van Kerkwijk" },
  { href: "https://www.boerejongens.com/", label: "Boerejongens" },
  { href: "https://www.iamsterdam.com/en/whats-on/calendar/festivals/events/amsterdam-light-festival", label: "Amsterdam Light Festival" },
  { href: "https://bookings.thingstodoinamsterdam.com/cruise/shared-bulldog-boat", label: "The Bulldog Boat" },
  { href: "https://djmag.com/top100clubs/2026/90/shelter-amsterdam", label: "Shelter (DJ Mag)" },
  { href: "https://www.iamsterdam.com/en/see-and-do/restaurant-and-bars/lgbtqi-bars-and-cafes-in-amsterdam", label: "LGBTQI+ bars (I amsterdam)" },
];
