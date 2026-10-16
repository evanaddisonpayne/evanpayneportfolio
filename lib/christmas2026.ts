// Steamboat · Christmas 2026 — private family trip page (/christmas2026, noindex).
// All times are Steamboat time (Mountain, UTC-7). Facts checked Oct 16, 2026; hours change, so reconfirm the week before.
// Nothing here is booked yet: flights, house and reservations are the plan, not confirmations.

export type Person = "Debbie" | "Brad" | "Brannen" | "Whitney" | "Addie" | "Prosper" | "Evan";
export const PEOPLE: Person[] = ["Debbie", "Brad", "Brannen", "Whitney", "Addie", "Prosper", "Evan"];
export const KID_CREW: Person[] = ["Addie", "Prosper", "Brannen", "Whitney", "Evan"];
export const FAMILY_SIX: Person[] = ["Debbie", "Brad", "Brannen", "Whitney", "Addie", "Prosper"];

export type Vibe = "christmas" | "snow" | "soak" | "food" | "cozy" | "gentle" | "travel";
export const VIBES: { id: Vibe; label: string }[] = [
  { id: "christmas", label: "Christmas" },
  { id: "snow", label: "Snow play" },
  { id: "soak", label: "Hot springs" },
  { id: "food", label: "Food" },
  { id: "cozy", label: "Cozy" },
  { id: "gentle", label: "Seated or flat" },
  { id: "travel", label: "Travel" },
];

/** Rough cost per person. */
export type Price = "free" | "$" | "$$" | "$$$";
export const PRICE_KEY: { id: Price; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "$", label: "Under $25" },
  { id: "$$", label: "$25–75" },
  { id: "$$$", label: "$75+" },
];

export type Stop = {
  time: string; // display time, e.g. "5:00 pm"
  start: string; // 24h "HH:MM" Steamboat time, for the "now" marker
  title: string;
  where?: string;
  map?: string; // Google Maps search query override
  why: string;
  tips?: string[];
  vibes?: Vibe[];
  who?: Person[]; // omitted = everyone
  must?: boolean;
  book?: string;
  link?: { href: string; label: string };
  price?: Price;
  optional?: boolean;
};

export type Day = {
  id: string;
  date: string; // ISO date in Steamboat
  dow: string;
  num: string;
  title: string;
  mood: string;
  intro: string;
  callout?: string;
  stops: Stop[];
  storm?: string;
  tag?: string;
};

/** First wheels down: Evan's planned AA 3586 into HDN. */
export const TRIP_START = "2026-12-18T12:01:00-07:00";
export const TRIP_END = "2026-12-22T23:59:00-07:00";

export const crew: { name: Person; role: string; from: string; room: string; legs: { label: string; when: string; detail: string }[] }[] = [
  {
    name: "Debbie",
    role: "Mom",
    from: "Fayetteville via Dallas",
    room: "Main-floor bedroom, with Brad",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:41 pm", detail: "American XNA → DFW → HDN (AA 2750 from DFW)" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "American HDN → DFW (AA 2750) → XNA" },
    ],
  },
  {
    name: "Brad",
    role: "Dad",
    from: "Fayetteville via Dallas",
    room: "Main-floor bedroom with an easy bathroom",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:41 pm", detail: "American XNA → DFW → HDN (AA 2750 from DFW)" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "American HDN → DFW (AA 2750) → XNA" },
    ],
  },
  {
    name: "Brannen",
    role: "Brother",
    from: "Fayetteville via Dallas",
    room: "Upstairs, once the house is booked",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:41 pm", detail: "American XNA → DFW → HDN (AA 2750 from DFW)" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "American HDN → DFW (AA 2750) → XNA" },
    ],
  },
  {
    name: "Whitney",
    role: "Sister-in-law",
    from: "Fayetteville via Dallas",
    room: "Upstairs, once the house is booked",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:41 pm", detail: "American XNA → DFW → HDN (AA 2750 from DFW)" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "American HDN → DFW (AA 2750) → XNA" },
    ],
  },
  {
    name: "Addie",
    role: "Age 11",
    from: "Fayetteville via Dallas",
    room: "Kids' room, once the house is booked",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:41 pm", detail: "With Mom and Dad on AA 2750 from DFW" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "Home to XNA for Christmas" },
    ],
  },
  {
    name: "Prosper",
    role: "Age 8",
    from: "Fayetteville via Dallas",
    room: "Kids' room, once the house is booked",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:41 pm", detail: "With Mom and Dad on AA 2750 from DFW" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "Home to XNA for Christmas" },
    ],
  },
  {
    name: "Evan",
    role: "The planner",
    from: "Chicago O'Hare, nonstop",
    room: "Wherever's left. It's fine.",
    legs: [
      { label: "In", when: "Fri Dec 18 · 12:01 pm", detail: "American 3586 ORD → HDN nonstop. Picks up the SUV" },
      { label: "Out", when: "Mon Dec 21 · 1:31 pm", detail: "With the family to XNA, then XNA → ORD on Mon Dec 28" },
    ],
  },
];

export const house = {
  status: "Not booked yet",
  target: "One 4–5 bedroom house or townhome in Old Town, walking distance to Lincoln Avenue or on a free-bus route. About $1,500 a night before taxes and fees.",
  musts: [
    "Main-floor bedroom with its own bathroom and a walk-in or low-curb shower, for Brad",
    "Entry from a garage or a flat, cleared walk. No exterior stair climb",
    "Real beds for seven",
    "Under about 10 minutes' walk to Lincoln Ave, or a free bus stop at the door",
    "Parking for one big SUV",
    "Written OK for a 3-night stay (holiday minimums are common)",
  ],
  nice: ["Private hot tub", "Gas fireplace", "Big kitchen island for family breakfasts", "Bunk or game room for Addie and Prosper"],
};

const MAP = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapUrl = MAP;

export const days: Day[] = [
  {
    id: "fri",
    date: "2026-12-18",
    dow: "Fri",
    num: "18",
    title: "Land, groceries, go easy",
    mood: "Altitude day",
    intro:
      "Everyone lands within 40 minutes of each other, then it's 30–40 minutes to town. Today is deliberately light: groceries, the house, naps, and lots of water. Steamboat sits around 6,700 ft, so the first 24 hours are about letting bodies adjust.",
    callout: "Drink water from the plane onward, go easy on alcohol tonight, and nobody does anything strenuous today.",
    stops: [
      {
        time: "12:01 pm",
        start: "12:01",
        title: "Evan lands, picks up the SUV",
        where: "Yampa Valley Regional Airport, Hayden",
        map: "Yampa Valley Regional Airport",
        why: "American 3586 nonstop from O'Hare. Evan heads straight to the rental counter so the car is waiting when the family walks out.",
        who: ["Evan"],
        vibes: ["travel"],
        price: "free",
        tips: ["Confirm it's actually 4WD/AWD with snow-rated tires before driving off.", "Ask for a Suburban, Yukon XL or Expedition MAX class: 8 seats."],
      },
      {
        time: "12:41 pm",
        start: "12:41",
        title: "The family lands",
        where: "Yampa Valley Regional Airport, Hayden",
        map: "Yampa Valley Regional Airport",
        why: "American 2750 from Dallas (DFW), after the early morning hop from XNA. It's a small airport, so baggage claim is quick.",
        who: ["Debbie", "Brad", "Brannen", "Whitney", "Addie", "Prosper"],
        vibes: ["travel"],
        price: "free",
      },
      {
        time: "1:15 pm",
        start: "13:15",
        title: "Drive to Steamboat",
        where: "Steamboat Springs, CO",
        why: "About 25 miles and 30–40 minutes east on US 40. There's no public bus from the airport, which is why we have the SUV.",
        vibes: ["travel"],
        price: "free",
        tips: ["Water bottles for everyone in the car."],
      },
      {
        time: "1:45 pm",
        start: "13:45",
        title: "Grocery run at City Market",
        where: "City Market, Steamboat Springs",
        map: "City Market Steamboat Springs CO",
        why: "Breakfasts for three mornings, snacks, a case of water, and everything for a hot-cocoa bar at the house.",
        vibes: ["food"],
        price: "$$",
        tips: ["Brad and Debbie can wait in the warm car; this is a quick one."],
      },
      {
        time: "3:00 pm",
        start: "15:00",
        title: "Check in, unpack, nap",
        where: "Old Town, Steamboat Springs",
        map: "Old Town Steamboat Springs CO",
        why: "Claim rooms, unpack, rest. Headaches and tiredness are normal today at altitude; water and rest fix most of it.",
        vibes: ["cozy", "gentle"],
        price: "free",
      },
      {
        time: "5:30 pm",
        start: "17:30",
        title: "Short stroll under the Lincoln Ave lights",
        where: "Lincoln Avenue, Steamboat Springs",
        map: "Lincoln Avenue Steamboat Springs CO",
        why: "Only if everyone feels good. Downtown is lit up for the holidays and the main street is flat. Keep it short; the car can drop Brad and Debbie near the lights.",
        vibes: ["christmas", "gentle"],
        price: "free",
        optional: true,
        tips: ["Sidewalks refreeze after dark. Ice cleats on."],
      },
      {
        time: "6:30 pm",
        start: "18:30",
        title: "Easy dinner, early night",
        where: "Downtown Steamboat Springs",
        why: "Takeout at the house or something casual downtown. Bed early: tomorrow is the big day.",
        vibes: ["food", "cozy"],
        price: "$$",
      },
    ],
    storm:
      "If snow slows the airport or the drive, skip the evening stroll and stay in. If the flight diverts, the fallback is Denver, about 3.5–4 hours' drive.",
  },
  {
    id: "sat",
    date: "2026-12-19",
    dow: "Sat",
    num: "19",
    title: "Santa, hot springs, sleigh ride dinner",
    mood: "The big Christmas day",
    intro:
      "The whole family together all day. A slow morning, Santa downtown, a warm soak in the afternoon, a rest, then the splurge: a horse-drawn sleigh ride to dinner.",
    stops: [
      {
        time: "9:00 am",
        start: "09:00",
        title: "Slow breakfast at the house",
        where: "Old Town, Steamboat Springs",
        map: "Old Town Steamboat Springs CO",
        why: "No rush. Pancakes, coffee, cocoa.",
        vibes: ["cozy", "food"],
        price: "free",
      },
      {
        time: "11:00 am",
        start: "11:00",
        title: "Santa's study on the courthouse lawn",
        where: "Routt County Courthouse, Steamboat Springs",
        map: "Routt County Courthouse Steamboat Springs",
        why: "Santa has kept a little study on the courthouse lawn on December Saturdays, where kids share their wish lists and get a photo. Then browse the shops along Lincoln Ave.",
        vibes: ["christmas", "gentle"],
        must: true,
        price: "free",
        tips: ["2026 dates and times aren't posted yet. Confirm the week before.", "The car can drop Brad right at the lawn."],
        link: { href: "https://kidsintown.co/your-guide-to-christmas-events-for-kids-in-steamboat-springs/", label: "Christmas events" },
      },
      {
        time: "12:30 pm",
        start: "12:30",
        title: "Lunch downtown",
        where: "Lincoln Avenue, Steamboat Springs",
        map: "restaurants Lincoln Avenue Steamboat Springs",
        why: "A sit-down lunch to warm up before the hot springs.",
        vibes: ["food"],
        price: "$$",
      },
      {
        time: "2:00 pm",
        start: "14:00",
        title: "Old Town Hot Springs",
        where: "136 Lincoln Ave, Steamboat Springs",
        map: "Old Town Hot Springs Steamboat Springs",
        why: "Warm mineral pools right downtown, family-friendly, with handrails. Brad can soak comfortably; the kids will love being outside in the snow while warm.",
        vibes: ["soak", "gentle"],
        must: true,
        price: "$$",
        tips: [
          "Day passes: adults $35, seniors 65+ $32, youth 3–14 $27.",
          "No reservations, but admission is capacity-limited. Sign the waiver online the same day to skip the line.",
          "Water shoes for wet decks. Closed on Christmas Day only, so we're fine.",
        ],
        link: { href: "https://old.oldtownhotsprings.org/rates", label: "Rates" },
      },
      {
        time: "3:30 pm",
        start: "15:30",
        title: "Back to the house, rest",
        where: "Old Town, Steamboat Springs",
        map: "Old Town Steamboat Springs CO",
        why: "Dry off, nap, then dress in warm layers for the sleigh.",
        vibes: ["cozy", "gentle"],
        price: "free",
      },
      {
        time: "5:00 pm",
        start: "17:00",
        title: "Horse-drawn sleigh ride dinner",
        where: "Haymaker, Steamboat Springs",
        map: "Haymaker Steamboat Springs",
        why: "The splurge night. Hot cocoa or cider to take aboard, a sleigh ride under blankets, then a multi-course dinner with a proper kids' menu. Brad rides seated the whole way.",
        vibes: ["christmas", "food", "gentle"],
        must: true,
        price: "$$$",
        book: "Book on OpenTable for 7, Sat Dec 19 (runs Thu–Sun). One diner reported ~$130 per adult and a $25-per-person fee for cancelling within 48 hours",
        tips: [
          "Confirm it's running this season when you book.",
          "Backups: Bar Lazy L Ranch (they pick guests up in town) or Saddleback Ranch's tubing + sleigh dinner combo.",
        ],
        link: { href: "https://www.opentable.com/haymaker", label: "OpenTable" },
      },
    ],
    storm: "Hot springs are wonderful in falling snow. If the sleigh can't run, ask the restaurant about a dinner-only seating or move it to Sunday.",
  },
  {
    id: "sun",
    date: "2026-12-20",
    dow: "Sun",
    num: "20",
    title: "Tubing, downtime, gondola sunset",
    mood: "Split day",
    intro:
      "The kid crew goes tubing while Mom and Dad sleep in. Everyone regroups for lunch and a lazy afternoon, then rides the gondola up the mountain for sunset.",
    stops: [
      {
        time: "9:30 am",
        start: "09:30",
        title: "Sleep in, coffee downtown",
        where: "Lincoln Avenue, Steamboat Springs",
        map: "coffee Lincoln Avenue Steamboat Springs",
        why: "A slow morning: sleep in, a quiet coffee, maybe a massage.",
        who: ["Debbie", "Brad"],
        vibes: ["cozy", "gentle"],
        price: "$",
      },
      {
        time: "10:00 am",
        start: "10:00",
        title: "Tube Howelsen",
        where: "Howelsen Hill, Steamboat Springs",
        map: "Howelsen Hill Steamboat Springs",
        why: "The town ski hill has a tubing track with banked turns and a covered carpet lift back to the top, with a light show inside. One-hour slots.",
        who: ["Addie", "Prosper", "Brannen", "Whitney", "Evan"],
        vibes: ["snow"],
        must: true,
        price: "$$",
        book: "Reserve a 1-hour slot online for 5 riders once 2026 booking opens",
        tips: ["Riders must be at least 36 inches tall, one per tube.", "Past seasons: $30–35 per rider per hour."],
        link: { href: "https://www.steamboatchamber.com/blog/post/snow-tubing/", label: "Tubing info" },
      },
      {
        time: "11:15 am",
        start: "11:15",
        title: "Or add on: dog-sled ride",
        where: "Steamboat Springs, CO",
        map: "dog sled tours Steamboat Springs",
        why: "Local mushers run guided tours where you ride in the sled behind a team of huskies. A big kid memory if the group has energy left.",
        who: ["Addie", "Prosper", "Brannen", "Whitney", "Evan"],
        vibes: ["snow"],
        optional: true,
        price: "$$$",
        book: "Book ahead if you want it",
      },
      {
        time: "12:30 pm",
        start: "12:30",
        title: "Lunch together",
        where: "Downtown Steamboat Springs",
        map: "restaurants downtown Steamboat Springs",
        why: "Everyone regroups downtown and swaps tubing stories.",
        vibes: ["food"],
        price: "$$",
      },
      {
        time: "1:30 pm",
        start: "13:30",
        title: "Downtime at the house",
        where: "Old Town, Steamboat Springs",
        map: "Old Town Steamboat Springs CO",
        why: "Board games, a Christmas movie, the hot tub, naps. Nothing scheduled on purpose.",
        vibes: ["cozy", "gentle"],
        price: "free",
      },
      {
        time: "5:00 pm",
        start: "17:00",
        title: "Gondola up to Thunderhead for sunset",
        where: "Steamboat Gondola, Steamboat Square",
        map: "Steamboat Gondola Steamboat Square",
        why: "A seated ride up the mountain to Thunderhead Lodge, about 9,000 ft, with live music, snacks and the whole valley glowing below. Brad stays seated, then inside the lodge at the top.",
        vibes: ["christmas", "gentle"],
        must: true,
        price: "$$",
        tips: [
          "This season's Sunset Happy Hour: uploads from 5:00 pm, last upload 7:30, last download 9:15.",
          "$30 for ages 5+ without a pass, sold onsite by card only. Confirm which December evenings it runs.",
        ],
        link: {
          href: "https://koa.com/campgrounds/steamboat-springs/events/sunset-happy-hour_c3711b01-c00c-42f2-bbe6-a1f51479b352/",
          label: "Sunset Happy Hour",
        },
      },
      {
        time: "7:30 pm",
        start: "19:30",
        title: "Cozy dinner, cocoa bar, movie",
        where: "Downtown Steamboat Springs",
        why: "Dinner out downtown, or back to the house for the cocoa bar and a Christmas movie. Last night together in the mountains.",
        vibes: ["food", "cozy", "christmas"],
        price: "$$",
      },
    ],
    storm: "A snowy morning makes tubing better. If wind closes the gondola, go back to Old Town Hot Springs for an evening soak instead.",
  },
  {
    id: "mon",
    date: "2026-12-21",
    dow: "Mon",
    num: "21",
    title: "Fly home for Christmas",
    mood: "Travel day",
    intro: "One last breakfast, then the airport. Evan flies home with the family to XNA. Home by about 8 pm, with Tuesday still in hand as a spare.",
    stops: [
      {
        time: "8:30 am",
        start: "08:30",
        title: "Breakfast, pack, check out",
        where: "Old Town, Steamboat Springs",
        map: "Old Town Steamboat Springs CO",
        why: "Finish the groceries, strip the beds if the house asks, one last look around.",
        vibes: ["cozy"],
        price: "free",
      },
      {
        time: "10:45 am",
        start: "10:45",
        title: "Leave for the airport",
        where: "Yampa Valley Regional Airport, Hayden",
        map: "Yampa Valley Regional Airport",
        why: "Fill the tank on the way and return the SUV. Give it extra time: holiday week lines.",
        vibes: ["travel"],
        price: "free",
      },
      {
        time: "1:31 pm",
        start: "13:31",
        title: "American 2750 to Dallas, then home to XNA",
        where: "Yampa Valley Regional Airport, Hayden",
        map: "Yampa Valley Regional Airport",
        why: "Lands DFW 4:57 pm Central, then the short hop to XNA. Home by about 8 pm.",
        vibes: ["travel"],
        must: true,
        price: "free",
        tips: ["All seven on American, so a missed connection is the airline's to fix."],
      },
    ],
    storm: "If this flight cancels, the backups are American 2733 at 3:47 pm, United via Denver, or Tuesday. That's what Tuesday is for.",
  },
  {
    id: "tue",
    date: "2026-12-22",
    dow: "Tue",
    num: "22",
    title: "The spare day",
    mood: "Buffer",
    tag: "Buffer",
    intro: "Nothing planned. If Monday went to plan, everyone is already home. If it didn't, this is the day we still get home before Christmas.",
    stops: [
      {
        time: "Any",
        start: "08:00",
        title: "Backup ways home",
        where: "Yampa Valley Regional Airport, Hayden",
        map: "Yampa Valley Regional Airport",
        why: "American's second daily Dallas flight, 2733, leaves HDN at 3:47 pm (it runs Dec 17 – Jan 5). United flies HDN → Denver up to three times a day, and United serves XNA from Denver. Worst case, drive to Denver (3.5–4 hours) and fly from there.",
        vibes: ["travel"],
        price: "free",
      },
    ],
  },
];

export type CheckItem = { id: string; label: string };
export const checklist: { group: string; items: CheckItem[] }[] = [
  {
    group: "Now",
    items: [
      { id: "school", label: "Is Fri Dec 18 a school day for Addie and Prosper? (Decides Fri vs Sat departure)" },
      { id: "flights", label: "Family flights: American XNA → DFW → HDN Dec 18, back Dec 21" },
      { id: "evan", label: "Evan's American multi-city: ORD → HDN Dec 18, HDN → XNA Dec 21, XNA → ORD Dec 28" },
      { id: "house", label: "House: main-floor bedroom and bath, no entry stairs, 3-night stay OK in writing" },
      { id: "suv", label: "8-seat AWD SUV at HDN, Dec 18–21" },
    ],
  },
  {
    group: "This month",
    items: [
      { id: "sleigh", label: "Sleigh ride dinner for 7 · Sat Dec 19 (confirm it's running this season)" },
      { id: "tubing", label: "Tube Howelsen · Sun Dec 20, ~10 am · 5 riders, once booking opens" },
      { id: "dogsled", label: "Decide on the dog-sled add-on for the kid crew" },
    ],
  },
  {
    group: "Two weeks out",
    items: [
      { id: "surgeon", label: "Brad: surgeon OK for hot-spring soaking and walking on snow and ice" },
      { id: "doctor", label: "Debbie and Brad: ask the doctor about altitude" },
      { id: "dates", label: "Check 2026 dates for Santa's study and the gondola Sunset Happy Hour" },
      { id: "cleats", label: "Order ice cleats for Brad and Debbie" },
    ],
  },
  {
    group: "Day before",
    items: [
      { id: "weather", label: "Check the Steamboat forecast and HDN flight status" },
      { id: "waiver", label: "Sat morning: sign the Old Town Hot Springs waiver online" },
      { id: "apps", label: "American app with everyone's boarding passes; OpenTable confirmation saved" },
    ],
  },
];

export const budget: { item: string; low: number; high: number; basis: string }[] = [
  { item: "Family flights (6)", low: 3900, high: 4800, basis: "$650–800 each vs ~$400 to Denver" },
  { item: "Evan's multi-city ticket", low: 650, high: 900, basis: "ORD → HDN → XNA → ORD" },
  { item: "House, 3 nights, all-in", low: 4500, high: 7000, basis: "~$1,200–1,800/night plus 25–35% taxes and fees" },
  { item: "AWD 8-seat SUV, 4 days", low: 900, high: 1300, basis: "~$200/day plus taxes and airport fees" },
  { item: "Activities", low: 1460, high: 1610, basis: "Sleigh dinner, hot springs, tubing for 5, gondola sunset" },
  { item: "Food and groceries", low: 1200, high: 1800, basis: "House breakfasts, a mix of meals out" },
];

export const lingo: { word: string; say: string; means: string }[] = [
  { word: "Champagne Powder®", say: "sham-PAIN POW-der", means: "Steamboat's trademark name for its light, dry snow." },
  { word: "Ski Town, USA®", say: "the town motto", means: "Steamboat's trademarked nickname, earned by generations of ski racers and Olympians." },
  { word: "The Boat", say: "what locals say", means: "Short for Steamboat. Named for the chugging sound early settlers heard from a hot spring." },
  { word: "Yampa", say: "YAM-puh", means: "The river that runs right through town, past the hot springs." },
  { word: "Sleeping Giant", say: "look northwest", means: "The mountain northwest of town that looks like a giant lying on his back." },
  { word: "Bluebird day", say: "BLOO-bird", means: "A clear, sunny day right after fresh snow. The best kind." },
];

export const knowhow: { title: string; items: string[] }[] = [
  {
    title: "Altitude",
    items: [
      "Town is about 6,700 ft; the top of the gondola is about 9,000 ft. That's about 3,000 ft lower than Breckenridge, one reason we picked Steamboat.",
      "Mild symptoms are common the first 24–48 hours: headache, nausea, tiredness, dizziness, poor sleep, low appetite. Kids may just seem cranky or not hungry.",
      "Rest, water and an over-the-counter pain reliever fix most of it. Don't go higher until it passes.",
      "Get medical care right away for confusion, unsteady walking, breathlessness at rest, or a wet cough. Steamboat has a full hospital in town.",
    ],
  },
  {
    title: "Brad's hip",
    items: [
      "Every group plan here can be done seated or on flat, cleared ground. Tubing is for the kid crew only.",
      "Ice cleats for short walks; sidewalks refreeze after dark. The SUV drops him at every door.",
      "Old Town Hot Springs is the easy soak. Skip Strawberry Park Hot Springs for him: a 2-mile unpaved road and uneven stone paths.",
      "Check with his surgeon before the trip about soaking and walking on snow.",
    ],
  },
  {
    title: "Getting around",
    items: [
      "The free Steamboat Springs Transit bus runs between downtown, the mountain base and most lodging, about every 20 minutes.",
      "Downtown along Lincoln Avenue is flat and walkable. The car is mostly for the airport, groceries and drop-offs.",
      "The airport is about 25 miles west of town, 30–40 minutes on US 40.",
    ],
  },
  {
    title: "Cold, snow and sun",
    items: [
      "Expect highs around freezing and nights near 0°F. Layers, waterproof boots, gloves and hats for everyone.",
      "The sun is strong at altitude, even in winter. Sunscreen and lip balm, especially on the gondola and tubing hill.",
      "Dry air: lotion, lip balm and a refillable water bottle each.",
    ],
  },
  {
    title: "Holiday travel",
    items: [
      "The Friday and Saturday before Christmas week are among the busiest flying days of the year. Be at XNA 2 hours early.",
      "HDN is a mountain airport: snow can delay or divert flights. Coming home Monday leaves Tuesday as a full spare day.",
      "Everyone's on American, so a missed connection is rebooked by the airline.",
    ],
  },
];

export const sources: { href: string; label: string }[] = [
  { href: "https://flysteamboat.com/flight-schedule/", label: "HDN winter 2026/27 flight schedule" },
  { href: "https://www.steamboatradio.com/2026/08/17/winter-air-service-from-hayden-to-fly-to-18-airports-nonstop/", label: "HDN nonstops (Steamboat Radio)" },
  { href: "https://www.aa.com/en-us/flights-to-hayden", label: "American fares to Hayden" },
  { href: "https://old.oldtownhotsprings.org/rates", label: "Old Town Hot Springs rates" },
  { href: "https://strawberryhotsprings.com/faq/", label: "Strawberry Park Hot Springs FAQ" },
  { href: "https://www.steamboatchamber.com/blog/post/snow-tubing/", label: "Snow tubing (Steamboat Chamber)" },
  { href: "https://www.opentable.com/haymaker", label: "Haymaker sleigh dinner (OpenTable)" },
  { href: "https://koa.com/campgrounds/steamboat-springs/events/sunset-happy-hour_c3711b01-c00c-42f2-bbe6-a1f51479b352/", label: "Gondola Sunset Happy Hour" },
  { href: "https://kidsintown.co/your-guide-to-christmas-events-for-kids-in-steamboat-springs/", label: "Christmas events for kids" },
  { href: "https://co-steamboatsprings.civicplus.com/1240/Getting-Around", label: "Getting around (City of Steamboat)" },
  { href: "https://villarental.com/villa/colorado/steamboat-springs/capitol-house", label: "Holiday minimum-stay example" },
];
