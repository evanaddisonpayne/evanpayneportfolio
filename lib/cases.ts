export type Stat = { num: string; label: string; org?: string };
export type Move = { title: string; body: string };
export type Chapter = {
  eyebrow: string;
  title: string;
  role: string;
  moves: Move[];
  stats: Stat[];
  note?: string;
};
export type Case = {
  slug: string;
  n: string;
  client: string; // card meta line
  tag?: string; // filter category
  category: "positioning" | "growth" | "campaigns" | "featured";
  cardTitle: string;
  cardLine: string;
  chips: string[];
  art: string;
  scene: string;
  eyebrow: string;
  meta: { label: string; value: string }[];
  situation?: { title: string; body: string; label?: string };
  movesTitle?: string;
  moves?: Move[];
  resultsTitle?: string;
  stats?: Stat[];
  note?: string;
  chapters?: Chapter[];
  next: { slug: string; title: string; sub: string };
};

export const cases: Case[] = [
  {
    slug: "the-starr-conspiracy",
    n: "I",
    client: "The Starr Conspiracy   ·   Two tours   ·   Featured",
    category: "featured",
    cardTitle: "Two tours at the same agency, from key accounts to the director’s chair.",
    cardLine:
      "Three chapters: taking new software products to market for key accounts, coming back to move enterprise clients from search to AI-generated answers, and now directing brand and growth strategy across B2B SaaS and HR tech.",
    chips: ["$1.72M ARR", "9.75 NPS", "9.5 NPS", "+$600K"],
    art: "/art/art_tsc.webp",
    scene: "/art/scene_tsc.webp",
    eyebrow: "(I)   ·   Case study   ·   The Starr Conspiracy   ·   B2B SaaS and HR tech",
    meta: [
      { label: "Roles", value: "Marketing Strategist, Key Accounts   ·   Marketing & Brand Strategist   ·   Director of Brand & Growth" },
      { label: "When", value: "2021 to 2022, and 2025 to now" },
      { label: "Where", value: "Bentonville, AR\nSan Francisco, CA\nChicago, IL" },
      { label: "What I led", value: "Go-to-market, AEO, brand and growth strategy" },
    ],
    situation: {
      label: "The short version",
      title: "Two tenures, three roles, more responsibility each time.",
      body:
        "My first tenure at The Starr Conspiracy focused on key accounts, taking new software products to market across a client portfolio. I returned in 2025 as a strategist, moving enterprise clients from traditional search to AI-generated answers, and in April 2026 was promoted to direct brand and growth strategy across our B2B SaaS and HR tech clients.",
    },
    chapters: [
      {
        eyebrow: "Chapter (I)   ·   April 2021 to November 2022   ·   Bentonville, AR",
        title: "Key accounts: new software products, and the accounts that had to buy them.",
        role: "Marketing Strategist, Key Accounts",
        moves: [
          { title: "Ran the sprints and the launch", body: "I led collaborative design sprints and go-to-market strategy for new software products, and managed product marketing across the whole client portfolio." },
          { title: "Made the materials myself", body: "I researched the issues facing each client and turned them into sales strategy, then built the sales decks, investor and analyst decks, websites, and collateral to match." },
          { title: "Found the next deal", body: "I worked with the sales directors to spot upsell and cross-sell openings, and planned and tracked budgets across several projects at once." },
        ],
        stats: [
          { num: "$1.72M", label: "recurring annual revenue overseen" },
          { num: "9.75", label: "NPS" },
          { num: "+$600K", label: "in upsell and cross-sell" },
        ],
      },
      {
        eyebrow: "Chapter (II)   ·   February 2025 to April 2026   ·   San Francisco, CA and Chicago, IL",
        title: "The comeback: getting B2B brands found in the answers, not just the search results.",
        role: "Marketing & Brand Strategist",
        moves: [
          { title: "Moved programs from search to answers", body: "I built AI-integrated growth programs and Answer Engine Optimization, moving clients from traditional search to AI-generated answers to speed up qualified lead velocity." },
          { title: "Translated the data for executives", body: "I turned messy AI performance data into executive-ready frameworks that high-growth SaaS leaders could actually make decisions with." },
          { title: "Took it into the room", body: "I built and ran in-person client events across North America, EMEA, and APAC that generated qualified leads, and caught at-risk accounts early enough to keep them." },
        ],
        stats: [
          { num: "9.5", label: "NPS across key enterprise accounts" },
          { num: "3", label: "regions of client events" },
          { num: "AEO", label: "programs, live for enterprise SaaS" },
        ],
        note: "Client names and pipeline figures are under NDA. Details on request.",
      },
      {
        eyebrow: "Chapter (III)   ·   April 2026 to now   ·   Chicago, IL",
        title: "Now: running brand and growth for the whole client roster.",
        role: "Director of Brand & Growth Strategy",
        moves: [
          { title: "Positioning that wins deals", body: "I lead category positioning and messaging work for B2B SaaS and HR tech clients, aimed at win rates and executive engagement, not just awareness." },
          { title: "Campaigns across every channel", body: "I build the campaigns that carry it across paid, organic, email, social, events, and partner ecosystems, and run thought leadership programs that grow share of voice in HR tech media and on LinkedIn." },
          { title: "A team and a scoreboard", body: "I lead a cross-functional team across content, design, digital, analytics, and client strategy, and own the attribution and dashboards that tell us whether any of it worked." },
        ],
        stats: [
          { num: "6", label: "channels in the mix" },
          { num: "5", label: "disciplines on the team" },
          { num: "B2B SaaS", label: "and HR tech clients" },
        ],
        note: "Results from this chapter are still coming in. I’ll add the numbers once I can share them.",
      },
    ],
    next: { slug: "hireez", title: "A $2.2M monthly number, and a team that kept clearing it.", sub: "hireEZ   ·   HR tech   ·   Read the case  →" },
  },
  {
    slug: "hireez",
    n: "II",
    client: "hireEZ   ·   HR tech",
    tag: "Growth",
    category: "growth",
    cardTitle: "A $2.2M monthly number, and a team that kept clearing it.",
    cardLine: "I led the SEO, paid media, and content team on weekly sprints.",
    chips: ["$2.2M monthly target", "Beat by 15 to 20%"],
    art: "/art/art_hireez.webp",
    scene: "/art/scene_hireez.webp",
    eyebrow: "(II)   ·   Case study   ·   hireEZ   ·   HR tech",
    meta: [
      { label: "Role", value: "Sr. Manager, Digital Marketing" },
      { label: "When", value: "August 2024 to January 2025" },
      { label: "Where", value: "Mountain View, CA" },
      { label: "What I led", value: "SEO, paid media, content" },
    ],
    situation: {
      title: "A revenue target that big leaves no room for a slow month.",
      body:
        "hireEZ ran a full-funnel digital program against a $2.2M monthly revenue target. A number that size means you can’t wait a quarter to find out a channel is underperforming, so the real job was finding what worked fast enough to put more behind it while it was still working.",
    },
    movesTitle: "Three moves.",
    moves: [
      { title: "Built one team around the funnel", body: "I directed a cross-functional team of SEO, paid media, and content specialists, and built a culture where everyone owned a number instead of a task list." },
      { title: "Ran it in weekly sprints", body: "I put the team on agile workflows and weekly performance sprints, so we spotted the campaigns that were pulling their weight and scaled them quickly." },
      { title: "Optimized the whole funnel", body: "I pushed hard on full-funnel optimization, from the first click through to revenue, instead of treating each channel as its own island." },
    ],
    resultsTitle: "The numbers.",
    stats: [
      { num: "$2.2M", label: "monthly revenue target" },
      { num: "+15–20%", label: "above target, consistently" },
      { num: "3", label: "disciplines on one team" },
      { num: "Weekly", label: "performance sprints" },
    ],
    note: "Not one lucky month. Most of them.",
    next: { slug: "sfaf", title: "A $10M program that had to keep earning its keep.", sub: "San Francisco AIDS Foundation   ·   AIDS/LifeCycle   ·   Read the case  →" },
  },
  {
    slug: "sfaf",
    n: "III",
    client: "San Francisco AIDS Foundation",
    tag: "Campaigns & content",
    category: "campaigns",
    cardTitle: "A $10M program that had to keep earning its keep.",
    cardLine: "I ran marketing, communications, and digital engagement for AIDS/LifeCycle.",
    chips: ["$10M budget", "$125K in 24 hours"],
    art: "/art/art_sfaf.webp",
    scene: "/art/scene_sfaf.webp",
    eyebrow: "(III)   ·   Case study   ·   San Francisco AIDS Foundation   ·   AIDS/LifeCycle",
    meta: [
      { label: "Role", value: "Director of Marketing, Communications & Digital Engagement" },
      { label: "When", value: "February 2023 to August 2024" },
      { label: "Where", value: "San Francisco, CA" },
      { label: "What I led", value: "Marketing, comms, digital" },
    ],
    situation: {
      title: "Every dollar had to show up for the mission.",
      body:
        "AIDS/LifeCycle runs on a $10M event and marketing budget, and in a nonprofit every line of that budget has to prove it moves the mission forward. Marketing, communications, digital, and the platforms underneath them all had to pull in the same direction.",
    },
    movesTitle: "Three moves.",
    moves: [
      { title: "Tied the channels to revenue", body: "I aligned multi-channel digital engagement with long-term revenue goals and ran integrated plans built to convert, with about $200K a year in paid media behind them." },
      { title: "Ran the platforms", body: "I oversaw the rollout and ongoing change management of the third-party and custom-built platforms the program depends on." },
      { title: "Made launches into moments", body: "I curated and merchandised the online store, and launches averaged more than $125K in revenue within the first 24 hours." },
    ],
    resultsTitle: "The numbers.",
    stats: [
      { num: "$10M", label: "event and marketing budget" },
      { num: "$200K", label: "annual paid media" },
      { num: "$125K+", label: "store revenue in the first 24 hours of a launch" },
    ],
    note: "I also led the marketing team and worked with senior leadership on the organization’s growth plans.",
    next: { slug: "bentonville", title: "A regional chamber that wanted to compete for national talent.", sub: "Greater Bentonville Area Chamber of Commerce   ·   Positioning   ·   Read the case  →" },
  },
  {
    slug: "bentonville",
    n: "IV",
    client: "Bentonville Chamber of Commerce",
    tag: "Positioning",
    category: "positioning",
    cardTitle: "A regional chamber that wanted to compete for national talent.",
    cardLine: "I led the rebrand, the social strategy, and the PR behind it.",
    chips: ["+78% impressions", "+22.5% engagement"],
    art: "/art/art_bentonville.webp",
    scene: "/art/scene_bentonville.webp",
    eyebrow: "(IV)   ·   Case study   ·   Greater Bentonville Area Chamber of Commerce",
    meta: [
      { label: "Role", value: "Director of Marketing & Communications" },
      { label: "When", value: "March 2020 to April 2021" },
      { label: "Where", value: "Bentonville, AR" },
      { label: "What I led", value: "Brand, social, PR" },
    ],
    situation: {
      title: "A small-city business group, asked to play on a national field.",
      body:
        "The Chamber wanted to compete nationally for remote workers and for companies deciding where to relocate. That’s a different audience than the members who already knew it, and a different job for the brand. The story had to land with people who had never thought about Northwest Arkansas at all, and still mean something to the businesses paying dues.",
    },
    movesTitle: "Three moves, in order.",
    moves: [
      { title: "Rebuilt the brand", body: "I led the overhaul that let the Chamber compete on a national scale for remote talent and relocating companies, instead of only speaking to the members it already had." },
      { title: "Pointed social at the value", body: "I built the social strategy around the unique value of Chamber membership, so every post earned its place instead of filling a calendar." },
      { title: "Ran PR end to end", body: "I led the PR strategy, traditional and digital, from the day-to-day programs through the high-profile launch campaigns and partnerships." },
    ],
    resultsTitle: "In under six months.",
    stats: [
      { num: "+78%", label: "social impressions" },
      { num: "+22.5%", label: "social engagement" },
      { num: "+6%", label: "email open rate over the industry average" },
      { num: "+3%", label: "click-through over the industry average" },
    ],
    note: "The email numbers were organic, with no paid push behind them.",
    next: { slug: "intercut", title: "Turning Fortune 500 initiatives into stories worth watching.", sub: "Intercut Productions   ·   Read the case  →" },
  },
  {
    slug: "intercut",
    n: "V",
    client: "Intercut Productions",
    tag: "Campaigns & content",
    category: "campaigns",
    cardTitle: "Turning Fortune 500 initiatives into stories worth watching.",
    cardLine: "As Chief of Staff I ran the accounts and steered the creative behind Fortune 500 brand stories.",
    chips: ["Fortune 500 clients", "Emmy-nominated show"],
    art: "/art/art_intercut.webp",
    scene: "/art/scene_intercut.webp",
    eyebrow: "(V)   ·   Case study   ·   Intercut Productions",
    meta: [
      { label: "Role", value: "Chief of Staff" },
      { label: "When", value: "July 2017 to March 2020" },
      { label: "Where", value: "Bentonville, AR" },
      { label: "What I led", value: "Accounts, creative, crew" },
    ],
    situation: {
      title: "Fortune 500 stories that deserved an audience.",
      body:
        "Intercut made content for Fortune 500 companies about brand innovation, corporate social responsibility, and the initiatives they were proudest of. Those stories are easy to make well and hard to make people care about. My job sat between the clients, the creative, and the business, keeping all three pointed at a story worth telling.",
    },
    movesTitle: "Three moves.",
    moves: [
      { title: "Steered the creative", body: "I led creative concepts and content development so each piece actually communicated the brand’s innovation and its social responsibility work, instead of just describing it." },
      { title: "Protected the positioning", body: "I was the key stakeholder for clarifying and protecting brand positioning across every piece of content and customer touchpoint, in partnership with Creative." },
      { title: "Built the crew and the machine", body: "I oversaw and hired the photographers, cinematographers, editors, and designers, and wrote the operating policies that kept the whole operation efficient." },
    ],
    resultsTitle: "What it added up to.",
    stats: [
      { num: "Fortune 500", label: "clients, telling brand innovation and CSR stories" },
      { num: "4", label: "crafts on the crew I hired and ran: photo, film, edit, design" },
      { num: "Emmy", label: "nominated show I helped make at Intercut" },
    ],
    note: "That show’s Nielsen ratings climbed from 0.1 to 2.3 and from 5.1 to 7.7 in a single sixteen-week season.",
    next: { slug: "the-starr-conspiracy", title: "Two tours at the same agency, from key accounts to the director’s chair.", sub: "The Starr Conspiracy   ·   Two tours   ·   Read the case  →" },
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
