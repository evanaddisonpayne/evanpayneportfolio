/**
 * /turkscaicos: the "if Turks and Caicos wins" microsite for Tanya's bachelorette.
 * Assumes the land dates from the latest poll: Thu May 27 – Mon May 31, 2027 (4 nights, Memorial Day weekend),
 * a villa for 16 on Providenciales ("Provo") and a private catamaran day.
 *
 * Nothing here is booked. Facts checked Nov 2, 2026 (sources at the bottom); re-check before anyone pays.
 * To change the plan, edit DAYS. To fill in the villa once it's booked, edit VILLA (everything marked TBD).
 */

export const BASE = "/turkscaicos";
export const TRIP_SITE = "/tanyasbach";
export const GROUP_SIZE = 16;

/** Wheels down in Provo: Thu May 27, 2027, noon (Turks and Caicos is on Eastern time). */
export const LAND_AT = "2027-05-27T12:00:00-04:00";

export const PAGES = [
  { href: BASE, label: "Itinerary", icon: "☀" },
  { href: `${BASE}/villa`, label: "The villa", icon: "⌂" },
  { href: `${BASE}/photos`, label: "Photos", icon: "◎" },
  { href: `${BASE}/fun`, label: "Fun", icon: "✦" },
  { href: `${BASE}/packing`, label: "Packing", icon: "✓" },
];

/* ------------------------------------------------------------------ */
/* The plan                                                            */
/* ------------------------------------------------------------------ */

export type Tone = "lagoon" | "scarlet" | "signal" | "orchid" | "mango";

export type Stop = {
  time: string;
  title: string;
  body: string;
  /** small print under a stop: what to bring, what it costs, what to book */
  tip?: string;
  /** a map pin id from PINS, if it happens somewhere specific */
  pin?: string;
  icon: string;
  /** the main event of the day gets a bigger card */
  big?: boolean;
};

export type Day = {
  id: string;
  n: number;
  date: string;
  weekday: string;
  name: string;
  kicker: string;
  line: string;
  tone: Tone;
  dress: { theme: string; girls: string; guys: string };
  sunset: string;
  stops: Stop[];
};

export const DAYS: Day[] = [
  {
    id: "thu",
    n: 1,
    weekday: "Thursday",
    date: "May 27",
    name: "Wheels down",
    kicker: "Arrival + Island Fish Fry",
    line: "Planes land, bikinis come out, and the island throws us a street party on night one. Literally: Thursday is Fish Fry night.",
    tone: "mango",
    dress: { theme: "Linen & gold", girls: "White or cream linen, gold jewelry, flat sandals (it's a parking lot party)", guys: "Linen shirt, shorts, gold chain if you dare" },
    sunset: "7:25 pm",
    stops: [
      {
        time: "Morning",
        icon: "✈",
        title: "Fly into Provo (PLS)",
        body: "Everyone aims to land by about 2 pm. Most of us connect through Miami or fly direct from a big East Coast hub. We'll do airport pickups in two waves.",
        tip: "Bring a pen. You fill out a paper immigration form on the plane, in black or blue ink. Passport plus your return ticket at the desk.",
        pin: "pls",
      },
      {
        time: "~4:00 pm",
        icon: "⌂",
        title: "Villa check-in",
        body: "Doors open, shoes off, pick your bed (it's already picked, see the villa page). Your PR box is waiting on your pillow. Do not open it until the toast.",
        pin: "villa",
      },
      {
        time: "4:30 pm",
        icon: "🛒",
        title: "Provisions run",
        body: "Two cars, one list. Water by the case, limes, coconut water, breakfast stuff, and whatever the rum punch committee demands. Everyone else gets in the pool.",
        tip: "Groceries on the island cost a lot more than at home. We split one big shop instead of sixteen little ones.",
      },
      {
        time: "6:15 pm",
        icon: "🥂",
        title: "Welcome toast + PR box reveal",
        body: "Bubbles by the pool, Evan says something sappy, everyone opens their boxes at once. Gold hoops on, rhinestone hearts on, photo against the sunset.",
        big: true,
        pin: "villa",
      },
      {
        time: "7:30 pm",
        icon: "🐟",
        title: "Island Fish Fry",
        body: "Provo's weekly street party: vendors frying fish and conch, conch salad, live bands on a stage, local art, Turk's Head beer and the Gully Wash cocktail. Around 8 pm the Junkanoo band rushes through the crowd and you're allowed (encouraged) to join.",
        tip: "Starts at 6 pm in The Bight. Free to get in, but bring cash: lots of vendors don't take cards, and food runs about restaurant prices.",
        pin: "fishfry",
        big: true,
      },
      {
        time: "Late",
        icon: "🌙",
        title: "Night swim",
        body: "Back to the villa. Speaker on, lights low, someone falls in fully clothed. It's a tradition now.",
        pin: "villa",
      },
    ],
  },
  {
    id: "fri",
    n: 2,
    weekday: "Friday",
    date: "May 28",
    name: "Boat day",
    kicker: "Private catamaran + Scarlet Night",
    line: "A whole boat, just us. Sandbars, iguanas, reef, rum punch. Then everybody showers, puts on red and sits down to a private chef dinner.",
    tone: "scarlet",
    dress: { theme: "Scarlet Night", girls: "Red. Any red. A red slip dress, a red set, red lips at minimum", guys: "Red shirt, red swim trunks, or a red linen button-down open one button too far" },
    sunset: "7:25 pm",
    stops: [
      {
        time: "8:30 am",
        icon: "☕",
        title: "Coffee, eggs, sunscreen station",
        body: "Mineral sunscreen on everyone, especially the backs of knees. Boat bags packed: towel, cover-up, GoPro, water.",
        pin: "villa",
      },
      {
        time: "9:30 am",
        icon: "⛵",
        title: "Private catamaran, all 16 of us",
        body: "A half-day private charter through the Caicos Cays. Half Moon Bay's shallow turquoise lagoon (the sandbar photo), Little Water Cay to see the rock iguanas, then a snorkel stop on the reef: stingrays, parrotfish, maybe a turtle. Rum punch comes out after the snorkel, not before.",
        tip: "A shared cruise runs about $150 a person; for a group our size a private boat can come in cheaper per person. Tip the crew 15–20% and check whether the 12% tourism tax is in the quote.",
        pin: "halfmoon",
        big: true,
      },
      {
        time: "1:30 pm",
        icon: "😴",
        title: "Back to land, mandatory nap",
        body: "Post-boat nap is part of the itinerary, not a failure. Pool floats for the people who don't nap.",
        pin: "villa",
      },
      {
        time: "6:30 pm",
        icon: "💋",
        title: "Scarlet hour",
        body: "Everyone in red by the pool for golden-hour photos. The bride picks the playlist. Sunset is around 7:25.",
        pin: "villa",
      },
      {
        time: "7:30 pm",
        icon: "🍽",
        title: "Private chef dinner at the villa",
        body: "One long table for sixteen, a chef in our kitchen, conch fritters, fresh local fish, island sides, a dessert with sparklers. Nobody has to drive and nobody has to find a table for 16 on a Friday.",
        tip: "Book the chef when we book the villa. Ask for a family-style menu and a signature cocktail named after Tanya.",
        big: true,
        pin: "villa",
      },
      {
        time: "9:30 pm",
        icon: "🎤",
        title: "Toasts, roasts, then the dance floor",
        body: "Two-minute toasts, one roast each (Tanya can veto), then the living room becomes a club. See the Fun page for the Villa Court and the dares.",
        pin: "villa",
      },
    ],
  },
  {
    id: "sat",
    n: 3,
    weekday: "Saturday",
    date: "May 29",
    name: "The big night",
    kicker: "Grace Bay day + the night out",
    line: "Slow morning, one of the best beaches on the planet, a proper photo shoot, a big dinner out, and then we go out out.",
    tone: "signal",
    dress: { theme: "Bride in white, crew in hot pink", girls: "Tanya: white, the sexier the better. Everyone else: hot pink, any shade from flamingo to fuchsia", guys: "Pink linen shirt or a pink suit if you want to be famous" },
    sunset: "7:26 pm",
    stops: [
      {
        time: "10:00 am",
        icon: "🍾",
        title: "Mimosa bar + recovery station",
        body: "Electrolytes, Advil, a bagel spread, and mimosas for the brave. Hair appointments start for anyone who booked one.",
        pin: "villa",
      },
      {
        time: "11:30 am",
        icon: "🏖",
        title: "Grace Bay beach day",
        body: "Twelve miles of white powder sand and water that looks fake. Rent loungers and umbrellas, float, paddleboard. Optional add-ons for the restless: jet skis, parasailing, a beachfront massage.",
        tip: "Wind is common in late May. If it's blowing, a kitesurfing lesson on Long Bay is the move.",
        pin: "gracebay",
        big: true,
      },
      {
        time: "3:30 pm",
        icon: "💄",
        title: "Glam hour",
        body: "Back to the villa. Getting-ready playlist, a steamer, one shared lash glue. The two guys are in charge of drinks and the ring light.",
        pin: "villa",
      },
      {
        time: "6:15 pm",
        icon: "📸",
        title: "Golden-hour shoot on the beach",
        body: "Bride in white, everyone else in pink, barefoot at the water's edge. Book a photographer for 45 minutes so nobody has to hold the phone.",
        pin: "gracebay",
        big: true,
      },
      {
        time: "7:45 pm",
        icon: "🍸",
        title: "Big dinner out",
        body: "A long table at a Grace Bay restaurant, sixteen of us, one very loud toast. We'll pick the spot once the destination is official.",
        tip: "A table for 16 on Memorial Day weekend has to be booked the day reservations open. Expect a 15–20% service charge on the bill.",
        pin: "gracebay",
      },
      {
        time: "10:00 pm",
        icon: "🪩",
        title: "Out out",
        body: "Grace Bay bars, then back to the villa for the after-party. Provo is more beach bar than nightclub, so the villa is the club. We'll book drivers so nobody drives (they drive on the left here, anyway).",
        pin: "gracebay",
      },
    ],
  },
  {
    id: "sun",
    n: 4,
    weekday: "Sunday",
    date: "May 30",
    name: "Sunday funday",
    kicker: "Conch, Chalk Sound + satin pajamas",
    line: "Feet in the sand, a lagoon so blue it glows, a sunset on the quiet side of the island, and a pajama party that gets a little out of hand.",
    tone: "lagoon",
    dress: { theme: "Satin & sunset", girls: "Day: bikini and a sarong. Night: satin or silk pajamas (matching sets encouraged)", guys: "Day: trunks and a camp shirt. Night: a satin pajama set, no exceptions" },
    sunset: "7:26 pm",
    stops: [
      {
        time: "11:00 am",
        icon: "🥞",
        title: "Hangover brunch",
        body: "Pancakes, eggs, bacon, a Bloody Mary bar. Read the group chat from last night out loud.",
        pin: "villa",
      },
      {
        time: "1:00 pm",
        icon: "🐚",
        title: "Da Conch Shack, Blue Hills",
        body: "The classic: conch every way, rum punch, picnic tables on the sand. Weekend afternoons often have local musicians.",
        tip: "No dress code. Swimsuit under a cover-up is perfect.",
        pin: "conchshack",
        big: true,
      },
      {
        time: "3:30 pm",
        icon: "🛶",
        title: "Chalk Sound + Sapodilla Bay",
        body: "Chalk Sound is the electric-turquoise lagoon on the southwest side; we'll take clear kayaks or just stare at it. Sapodilla Bay next door is calm, shallow and warm, built for floating with a drink.",
        pin: "chalksound",
      },
      {
        time: "6:45 pm",
        icon: "🌅",
        title: "Sunset on the south side",
        body: "Taylor Bay or Sapodilla for sunset, or sundowners at a feet-in-the-sand spot in Five Cays. Sunset around 7:26.",
        pin: "fivecays",
      },
      {
        time: "8:30 pm",
        icon: "🌙",
        title: "Satin pajama party",
        body: "Face masks, the lip masks from your PR box, the How Well Do You Know Tanya quiz, and letters to the bride read out loud. Ends with a slow dance. Probably ends with a fast one, too.",
        pin: "villa",
        big: true,
      },
    ],
  },
  {
    id: "mon",
    n: 5,
    weekday: "Monday",
    date: "May 31",
    name: "Memorial Day",
    kicker: "Last swim + flights home",
    line: "One more swim, one more group photo, hugs at the airport, and a nap on the plane. Hurricane season starts June 1. We're out May 31. Planning.",
    tone: "orchid",
    dress: { theme: "Airport chic", girls: "Matching sweatsuit, sunglasses on indoors", guys: "Same. Matching sets look great in the group photo" },
    sunset: "7:27 pm",
    stops: [
      {
        time: "8:00 am",
        icon: "🌊",
        title: "Last swim",
        body: "Coffee in the pool. Find your other sandal.",
        pin: "villa",
      },
      {
        time: "10:00 am",
        icon: "🧳",
        title: "Pack, tidy, check out",
        body: "Checkout is usually around 10 or 11. Fridge emptied, dishes done, nothing left in the safe. Group photo on the front steps.",
        pin: "villa",
      },
      {
        time: "Midday",
        icon: "✈",
        title: "Airport runs",
        body: "Flights out in the afternoon, in waves. Get to PLS at least 2.5 hours early on a holiday Monday.",
        tip: "Leftover cash goes to the drivers and the housekeeper.",
        pin: "pls",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Provo map (stylized, not to scale)                                  */
/* ------------------------------------------------------------------ */

export type Pin = { id: string; label: string; x: number; y: number; note: string };

export const PINS: Pin[] = [
  { id: "villa", label: "The villa", x: 640, y: 196, note: "Grace Bay side (address once we book)" },
  { id: "gracebay", label: "Grace Bay", x: 700, y: 158, note: "The famous beach" },
  { id: "fishfry", label: "Fish Fry", x: 560, y: 186, note: "The Bight, Thursday nights" },
  { id: "halfmoon", label: "Half Moon Bay", x: 905, y: 92, note: "Sandbar + iguanas, by boat" },
  { id: "conchshack", label: "Da Conch Shack", x: 395, y: 176, note: "Blue Hills" },
  { id: "pls", label: "Airport (PLS)", x: 455, y: 250, note: "Providenciales International" },
  { id: "chalksound", label: "Chalk Sound", x: 210, y: 300, note: "The glowing lagoon" },
  { id: "fivecays", label: "Five Cays", x: 360, y: 322, note: "South-side sunsets" },
];

/* ------------------------------------------------------------------ */
/* The villa (fill these in once it's booked)                          */
/* ------------------------------------------------------------------ */

export const VILLA = {
  booked: false,
  name: "Villa TBD",
  nickname: "Casa Tanya",
  area: "Grace Bay, Providenciales",
  listingUrl: "", // paste the Airbnb link here
  checkIn: "Thu, May 27 · usually 3–4 pm",
  checkOut: "Mon, May 31 · usually 10–11 am",
  address: "Shared with the group once we book",
  wifi: { network: "TBD", password: "Posted in the group chat once we book" },
  doorCode: "Never on this page. Group chat only.",
  /** The must-haves we're shopping for. */
  wishlist: [
    { k: "Sleeps 16 in real beds", v: "No sofa beds, no air mattresses. Eight bedrooms, or seven plus a bunk room." },
    { k: "A pool we can all fit in", v: "Ideally with a swim-up ledge, loungers for everyone, and some shade." },
    { k: "Walk to the beach", v: "Grace Bay or Long Bay. Bonus if the catamaran can pick us up from the villa's own beach or dock." },
    { k: "A table for 16", v: "Inside or out, for the private chef dinner and the Sunday brunch." },
    { k: "A kitchen a chef can work in", v: "Two ovens, a big fridge, a second drinks fridge if we're dreaming." },
    { k: "Allowed: a loud-ish bachelorette", v: "We message the host before booking, say exactly who we are and ask about noise rules. No surprises." },
  ],
  /** Rough shape of the sleeping plan. Names stay off this page; the room list lives with the planners. */
  rooms: [
    { name: "The bride's suite", beds: "King + ensuite", who: "Tanya + her pick", note: "Best view in the house. Not up for debate." },
    { name: "Room 2", beds: "King", who: "2 girls", note: "" },
    { name: "Room 3", beds: "King", who: "2 girls", note: "" },
    { name: "Room 4", beds: "Queen", who: "2 girls", note: "" },
    { name: "Room 5", beds: "Queen", who: "2 girls", note: "" },
    { name: "Room 6", beds: "Two queens or twins", who: "2 girls", note: "" },
    { name: "Room 7", beds: "Two queens or twins", who: "2 girls", note: "" },
    { name: "The boys' room", beds: "Two beds", who: "The 2 guys", note: "Closest to the bar, by design." },
  ],
  houseRules: [
    { k: "Quiet-ish after midnight outside", v: "The party moves indoors so we don't get a call from the host. The speaker goes in with it." },
    { k: "No glass in the pool", v: "Cans, acrylic cups, or the pool gets drained. That's a real thing hosts charge for." },
    { k: "Shoes by the door", v: "Sand is forever." },
    { k: "Lock up when you leave", v: "Doors and sliders. Valuables in the safe." },
    { k: "Leave it how we found it", v: "Dishes before bed, trash out daily, towels in one pile on Monday." },
    { k: "Everyone on the booking", v: "Airbnb's guest count tops out at 16. That's exactly us, so no plus-ones staying over." },
  ],
};

/* ------------------------------------------------------------------ */
/* Packing                                                             */
/* ------------------------------------------------------------------ */

export type PackGroup = { title: string; items: { id: string; label: string; note?: string }[] };

export const PACK_EVERYONE: PackGroup[] = [
  {
    title: "Papers + money",
    items: [
      { id: "e-passport", label: "Passport", note: "Valid for the whole trip; six months left is the safe rule" },
      { id: "e-return", label: "Return flight confirmation", note: "They can ask for it at immigration" },
      { id: "e-pen", label: "A pen for the plane", note: "Paper immigration form, black or blue ink" },
      { id: "e-cash", label: "$150–200 in small US bills", note: "Fish Fry vendors, tips, drivers. They use US dollars" },
      { id: "e-card", label: "A card with no foreign transaction fees" },
      { id: "e-license", label: "Driver's license", note: "Bar ID, and in case you drive (on the left)" },
    ],
  },
  {
    title: "Sun + water",
    items: [
      { id: "e-spf", label: "Mineral sunscreen, SPF 30+", note: "Zinc or titanium. Kinder to the reef" },
      { id: "e-aloe", label: "Aloe for the one who forgets" },
      { id: "e-hat", label: "Hat + sunglasses" },
      { id: "e-bottle", label: "Refillable water bottle" },
      { id: "e-drybag", label: "Dry bag or phone pouch", note: "For the boat" },
      { id: "e-bug", label: "Bug spray", note: "Sunset at the lagoon = no-see-ums" },
    ],
  },
  {
    title: "Tech + small stuff",
    items: [
      { id: "e-charger", label: "Phone charger + a long cable" },
      { id: "e-battery", label: "Portable battery" },
      { id: "e-speaker", label: "One person: the good speaker" },
      { id: "e-meds", label: "Meds, Advil, Dramamine for the boat" },
      { id: "e-electrolytes", label: "Electrolyte packets", note: "For everybody. Trust us" },
      { id: "e-earplugs", label: "Earplugs + sleep mask" },
    ],
  },
];

export const PACK_GIRLS: PackGroup[] = [
  {
    title: "Swim",
    items: [
      { id: "g-swim", label: "3–4 swimsuits", note: "One per day, plus a backup for boat day" },
      { id: "g-cover", label: "2 cover-ups or sarongs" },
      { id: "g-boatbag", label: "Beach tote for the boat" },
      { id: "g-slides", label: "Slides or flip-flops" },
    ],
  },
  {
    title: "The night looks",
    items: [
      { id: "g-thu", label: "Thursday: white or cream linen + gold", note: "Flat sandals; the Fish Fry is a parking lot" },
      { id: "g-fri", label: "Friday: something red", note: "Scarlet Night" },
      { id: "g-sat", label: "Saturday: hot pink (Tanya: white)", note: "Shoes that can walk on a path" },
      { id: "g-sun", label: "Sunday: satin or silk pajamas" },
      { id: "g-mon", label: "Monday: a matching travel set" },
      { id: "g-heels", label: "One pair of block heels or wedges", note: "Stilettos and sand don't mix" },
    ],
  },
  {
    title: "Hair, face + body",
    items: [
      { id: "g-clips", label: "Claw clips + hair ties", note: "The box has pearl ones. Bring backups" },
      { id: "g-frizz", label: "Anti-frizz and a leave-in", note: "It's humid" },
      { id: "g-glow", label: "Body glow or shimmer oil" },
      { id: "g-tint", label: "Waterproof mascara + tinted SPF" },
      { id: "g-lash", label: "Lashes + glue" },
      { id: "g-afterSun", label: "After-sun lotion" },
      { id: "g-tampons", label: "Period stuff, just in case" },
    ],
  },
];

export const PACK_GUYS: PackGroup[] = [
  {
    title: "Swim",
    items: [
      { id: "b-trunks", label: "3 pairs of swim trunks", note: "One red. You know why" },
      { id: "b-rash", label: "A rash guard or sun shirt", note: "For the boat and the snorkel" },
      { id: "b-slides", label: "Slides or flip-flops" },
    ],
  },
  {
    title: "The night looks",
    items: [
      { id: "b-thu", label: "Thursday: linen shirt + shorts" },
      { id: "b-fri", label: "Friday: red shirt (or red everything)" },
      { id: "b-sat", label: "Saturday: a pink linen button-down" },
      { id: "b-sun", label: "Sunday: satin pajama set", note: "Non-negotiable. The girls checked" },
      { id: "b-mon", label: "Monday: matching travel set" },
      { id: "b-shoes", label: "Loafers or clean sneakers" },
    ],
  },
  {
    title: "Grooming + duties",
    items: [
      { id: "b-razor", label: "Razor, deodorant, the basics" },
      { id: "b-cologne", label: "One good cologne" },
      { id: "b-bracelet", label: "Wear the Cuban link from the box" },
      { id: "b-ringlight", label: "Phone tripod or ring light", note: "You are the official photographers on Saturday" },
      { id: "b-opener", label: "A bottle opener on your keychain", note: "You are also the bartenders" },
    ],
  },
];

export const LEAVE_HOME = [
  "Glass bottles for the pool",
  "Anything you'd cry about losing on a boat",
  "Stilettos (sand)",
  "A heavy jacket (it's 86°F)",
  "Your work laptop. Please.",
];

/* ------------------------------------------------------------------ */
/* Fun page                                                            */
/* ------------------------------------------------------------------ */

export const FATES = [
  "The bride decides. The bride always decides.",
  "Whoever has the most sand on them buys the next round.",
  "Group vote by screaming. Loudest side wins.",
  "The guys pay. Both of them. Split it.",
  "Rum punch for everyone, then ask again.",
  "Whoever booked the latest flight home has to do it.",
  "Ask the iguana. (The iguana says yes.)",
  "Rock, paper, scissors, best of five, winner picks.",
  "The person wearing the most gold decides.",
  "Whoever fell in the pool fully clothed is exempt. Everyone else: yes.",
  "Do it, and post it to the shared album.",
  "Nap first. Decide after.",
];

export const EGO_FIRST = [
  "Lady", "Captain", "Duchess", "Señorita", "Madame", "Baroness", "DJ", "Admiral", "Princess", "Queen", "Dame", "Miss",
];
export const EGO_MID = [
  "Rum Punch", "Conch Fritter", "Sandbar", "Low Tide", "Tan Line", "Coconut", "Flamingo", "Gully Wash", "Sea Glass", "Golden Hour", "Mango", "Turquoise",
];
export const EGO_PLACE = [
  "of Grace Bay", "of Chalk Sound", "of the Fish Fry", "of Half Moon Bay", "of Iguana Island", "of the Swim-Up Ledge", "of Long Bay", "of the Bight", "of Blue Hills", "of the Catamaran", "of Five Cays", "of Sapodilla Bay",
];
export const EGO_BIO = [
  "Arrived by catamaran. Will leave by catamaran. Has never seen a shoe.",
  "Known on three islands for her rum punch and on a fourth for something nobody will repeat.",
  "Owns twelve sarongs and wears them as gowns, capes and once, briefly, a hat.",
  "Has a standing table at the Fish Fry and a standing feud with a seagull.",
  "Speaks fluent iguana. Refuses to translate.",
  "Once outswam a stingray to get to happy hour first.",
  "Says 'one more song' at 1 am every night. It is never one more song.",
  "Tan lines so crisp they have their own Instagram.",
  "Will take your photo, then 40 more, then show you one.",
  "Lives on the sandbar at low tide and in your DMs at high tide.",
];

export const OFFENCES = [
  "Took the good pool float and pretended not to hear",
  "Used all the hot water before boat day",
  "Ate the last conch fritter",
  "Played the same song four times in a row",
  "Fell asleep during the toasts",
  "Brought sand into the bed. Again.",
  "Stole the bride's spotlight in the group photo",
  "Said 'last drink' and lied",
  "Left a wet swimsuit on a wooden table",
  "Kept everyone up laughing (guilty as charged, honestly)",
  "Booked a flight that leaves at 11 am Monday",
  "Didn't wear red on Scarlet Night",
];

export const RULINGS = [
  "Sentenced to make the next round of rum punch for the whole villa.",
  "Must serenade the bride with a song of the bride's choosing.",
  "Loses float privileges until sunset.",
  "Must do the Junkanoo shuffle down the hallway. With commitment.",
  "Owes the group one (1) excellent toast at dinner.",
  "Must wear the sombrero of shame until midnight. Yes, we brought one.",
  "Gets the last shower on Saturday. Cold.",
  "Charges dropped. The court was bribed with a conch fritter.",
];

export const DARES = [
  "Ask a stranger to take a photo, then direct a full shoot",
  "Do your best Junkanoo dance for 20 seconds",
  "Toast the bride in your worst accent",
  "Text your ex 'sending love from Turks' (just kidding, text your mom)",
  "Let the bride choose your next drink",
  "Swap one piece of clothing with the person to your left",
  "Teach the group a dance move, then make them do it",
  "Give a 30-second TED talk on conch",
  "Serenade the nearest iguana",
  "Say something nice about every person in the room",
];
export const DRINKS = ["rum punch", "Gully Wash", "Turk's Head", "pina colada", "mimosa", "coconut water (hydrate!)", "bubbly", "a mystery shot the guys made"];
export const CONSEQUENCES = [
  "or wear your swimsuit to dinner",
  "or do 10 pool jumping jacks",
  "or carry the bride's bag for an hour",
  "or be on dishes tonight",
  "or let Tanya post a photo of your choosing",
  "or sing the next song, solo",
];

export const IGUANA_LINES = [
  "Hello. I live here. You're on my island.",
  "I have seen many bachelorettes. This one is my favorite.",
  "Wear sunscreen. I'm cold-blooded and even I know that.",
  "Please do not feed me rum punch.",
  "I approve of the bride. That is all.",
];

/* ------------------------------------------------------------------ */
/* Quick facts + sources                                               */
/* ------------------------------------------------------------------ */

export const FACTS = [
  { k: "Weather", v: "Highs around 86°F, lows around 77°F, mostly sunny and often breezy" },
  { k: "Sunset", v: "About 7:25 pm" },
  { k: "Time zone", v: "Eastern time. One hour ahead of Chicago" },
  { k: "Money", v: "US dollars. Bring small bills for tips and the Fish Fry" },
  { k: "Driving", v: "On the left. We're booking drivers anyway" },
  { k: "Hurricane season", v: "Starts June 1. We fly home May 31" },
];

export const sources = [
  { label: "TCI Border Force: entry", href: "https://borderforce.gov.tc/entry-requirements" },
  { label: "Visit TCI: entry requirements", href: "https://visittci.com/travel-info/entry-requirements" },
  { label: "Visit TCI: Island Fish Fry", href: "https://www.visittci.com/events/fish-fry" },
  { label: "Visit TCI: island hopping cruises", href: "https://visittci.com/providenciales/things-to-do/island-hopping-and-beach-bbq-cruises" },
  { label: "Visit TCI: live music", href: "https://visittci.com/providenciales/restaurants-and-dining/live-music" },
  { label: "Providenciales May averages", href: "https://www.holiday-weather.com/providenciales/averages/may/" },
];
