// English copy for the portfolio pages. This is the source the French and German files translate.
// Strings are verbatim from the approved pages: \u00a0 is a non-breaking space (the no-orphan rule), and the
// "   ·   " runs are the eyebrow separators (Eyebrow splits on them). Keep both in every language.
// Placeholders in {braces} are filled in by the page.

export const en = {
  locale: "en",
  langName: "English",

  meta: {
    defaultTitle: "Evan Addison Payne · Brand & Growth Strategy",
    description:
      "Evan Addison Payne is Director of Brand & Growth Strategy at The Starr Conspiracy in Chicago. He helps Work Tech, HR tech, and SaaS companies stop sounding like their competitors.",
    ogLocale: "en_US",
  },

  site: {
    title: "Director, Brand & Growth Strategy",
    city: "Chicago, IL",
  },

  common: {
    skip: "Skip to content",
    homeLabel: "{name}, home",
    readCase: "Read the case\u00a0\u00a0→",
    portraitAlt: "Engraved line portrait of Evan in a cap and aviator sunglasses, smiling",
    deskAlt:
      "Engraved line drawing of a desk at night: lamp, open notebook, record player, and the Chicago skyline through the window",
    languageLabel: "Language",
  },

  nav: {
    links: [
      { href: "/work", label: "Work" },
      { href: "/writing", label: "Writing" },
      { href: "/about", label: "About" },
      { href: "/resume", label: "Resume" },
    ],
    mainLabel: "Main",
    cta: "Let's talk",
    menu: "MENU",
    close: "CLOSE",
    menuLabel: "Menu",
  },

  footer: {
    eyebrow: "Let's talk",
    heading: "If you're tired of sounding like everyone else, pour something and tell me what's going\u00a0on.",
    button: "Let's talk",
    navLabel: "Footer",
  },

  home: {
    hero: {
      h1: "Somewhere under all that safe, sanded-down messaging is a company worth\u00a0remembering.",
      lede:
        "I’m Evan Addison Payne, and I run brand and growth strategy for Work Tech, HR tech, and SaaS companies. I dig through the decks, the positioning docs, and the sticky-note walls until I find the thing only you can say. Then I help you say it out loud, like you mean it, to buyers who’ve heard every version of “all-in-one platform” there\u00a0is.",
      cta: "Let’s talk",
      secondary: "Read Brand Therapy",
    },
    stances: {
      eyebrow: "What I believe",
      h2: "Five things I’ll argue about at the bar, at dinner, and in your quarterly planning\u00a0meeting.",
      tarotAlt: "Tarot card {n}, {name}",
      items: [
        {
          n: 1,
          name: "The Crowd",
          title: "Sameness is a revenue\u00a0problem.",
          body: "When buyers can’t tell you apart, they go with whoever’s cheapest or whoever they heard of first, and you end up paying full price for marketing nobody\u00a0remembers.",
        },
        {
          n: 2,
          name: "The Committee",
          title: "Consensus kills\u00a0brands.",
          body: "Every round of “can we soften this a little” sands off another edge, until you’re left with a message everyone signed off on and nobody can\u00a0repeat.",
        },
        {
          n: 3,
          name: "The Spark",
          title: "AI is an accelerant, not a\u00a0substitute.",
          body: "I use it every day, and it’s brilliant at going faster. It’s useless at deciding where you should be going in the first place, which is still your\u00a0job.",
        },
        {
          n: 4,
          name: "The Compass",
          title: "Positioning before demand\u00a0gen.",
          body: "When pipeline goes soft, the instinct is to spend more. Usually the problem sits upstream, in a story that never gave anyone a reason to pick\u00a0you.",
        },
        {
          n: 5,
          name: "The Ghost",
          title: "Safe is not low\u00a0risk.",
          body: "Playing it safe feels responsible right up until you realize nobody noticed you were in the\u00a0room.",
        },
      ],
    },
    newsletter: {
      eyebrow: "The newsletter   ·   On LinkedIn",
      name: "Brand Therapy",
      lede:
        "A newsletter for anyone who’s sat through one too many messaging workshops. Each issue takes one thing that’s quietly wrong with B2B brands, pulls it apart on the table, and tells you what I’d actually do about it. No framework with a cute acronym\u00a0required.",
      quote: "You’re not under-marketing. You’re\u00a0under-differentiating.",
      from: "From issue (I)",
      issueTitle: "You all sound the\u00a0same. It’s costing\u00a0millions.",
      read: "Read issue (I)",
      subscribe: "Subscribe on LinkedIn",
      tarotAlt: "Issue (I) card, You all sound the\u00a0same",
    },
    work: {
      eyebrow: "Selected work",
      h2: "The proof, with names where I’m allowed to use them and honest descriptions where I’m\u00a0not.",
      seeAll: "See all work\u00a0\u00a0→",
    },
    about: {
      eyebrow: "About",
      h2: "I’m the one in the strategy meeting who asks the question everyone hoped to skip. Then I stay and do the\u00a0work.",
      lede:
        "By day I’m Director of Brand & Growth Strategy at The Starr Conspiracy, an AI-native B2B agency. Most of my work is with Work Tech, HR tech, and SaaS companies that have a real product and a market that can’t tell them apart from the next vendor. I help them figure out why, then fix\u00a0it.",
      habits: ["Wrong out loud", "Diagnose, then spend", "I make the\u00a0thing"],
      italic:
        "Most of my time off goes to getting somewhere new. Twelve countries so far, and I’m nowhere near done. Back in Chicago, my favorite nights are the ones I\u00a0host.",
      more: "Read the long\u00a0version",
      stampsAlt: "Passport stamps: ORD, home base. AMS, someday. PRG, go here.",
    },
  },

  about: {
    title: "About",
    hero: {
      eyebrow: "About",
      h1: "I’m the one in the strategy meeting who asks the question everyone hoped to skip. Then I stay and do the\u00a0work.",
      lede:
        "I’m Evan Addison Payne, Director of Brand & Growth Strategy at The Starr Conspiracy, an AI-native B2B agency. I’m based in Chicago. Most of my work is with Work Tech, HR tech, and SaaS companies that have a real product and a market that can’t tell them apart from the next vendor. I help them figure out why, then fix\u00a0it.",
      cta: "Let’s talk",
      resume: "See the resume",
    },
    long: {
      eyebrow: "The long way here",
      h2: "Arkansas, then straight into the\u00a0work.",
      lede:
        "I went from the University of Arkansas straight into a production company, then into civic and nonprofit marketing, then B2B tech. Every one of those jobs answered to a number, and every one taught me something I still\u00a0use.",
      careerLabel: "Career",
      // [year, line 1, line 2] for the career strip. Org names stay as they are.
      stops: [
        ["2017", "Intercut", "Productions"],
        ["2020", "Bentonville", "Chamber"],
        ["2021", "The Starr", "Conspiracy"],
        ["2023", "SF AIDS", "Foundation"],
        ["2024", "hireEZ", ""],
        ["2025", "The Starr", "Conspiracy"],
        ["NOW", "Director,", "Brand & Growth"],
      ] as [string, string, string][],
      chapters: [
        {
          n: "I",
          title: "The room",
          meta: "2017 to 2020   ·   Production",
          body: "Three years as Chief of Staff at Intercut Productions, running accounts and turning Fortune 500 initiatives into stories people would actually sit through. Most of what I know about getting and keeping a room’s attention, I learned\u00a0there.",
          chips: ["Fortune 500 clients", "Emmy-nominated show"],
        },
        {
          n: "II",
          title: "The mission",
          meta: "2020 to 2024   ·   Civic and nonprofit",
          body: "A chamber of commerce competing nationally for talent, then a $10M nonprofit program where every dollar had to show up for the\u00a0mission. The work had to make sense to the people it was for, not just the people approving\u00a0it.",
          chips: ["+78% impressions", "$10M budget"],
        },
        {
          n: "III",
          title: "The number",
          meta: "2021 to now   ·   B2B SaaS and HR tech",
          body: "Marketing strategy at The Starr Conspiracy, a $2.2M monthly number at hireEZ, then back to TSC to lead brand and growth. Everything I touch now gets measured against pipeline and\u00a0revenue.",
          chips: ["$1.72M ARR", "+15–20% over target"],
        },
      ],
      education: "University of Arkansas, B.S. in Business Administration, marketing and\u00a0economics.",
      resumeLink: "See the full resume\u00a0\u00a0→",
    },
    how: {
      eyebrow: "How I work",
      h2: "What it’s like to work with\u00a0me.",
      habits: [
        {
          title: "Wrong out loud",
          body: "I’ll put a clear point of view on the table early, even if it turns out to be wrong. A team can react to something specific. It can’t do much with a deck that’s careful enough to agree with\u00a0everyone.",
        },
        {
          title: "Diagnose, then spend",
          body: "Before we add budget, I want to know what’s actually broken. Soft pipeline is often a positioning problem, and spending more on a message nobody remembers just makes it more\u00a0expensive.",
        },
        {
          title: "I make the\u00a0thing",
          body: "I can open Figma and build it myself, so the idea you approve is the one that ships. Nothing gets lost between the strategy deck and the\u00a0designer.",
        },
      ],
    },
    outside: {
      eyebrow: "Outside of work",
      h2: "I’m usually somewhere\u00a0else.",
      paragraphs: [
        "Most of my time off goes to getting somewhere new. Twelve countries so far, and I’m nowhere near done. Every new city starts the same way. I find the good bar, then I walk until I’m lost. If you ask me where to go next, I’ll say\u00a0Prague.",
        "Back in Chicago, my favorite nights are the ones I\u00a0host. A long table, a big dinner, and friends who stay a lot later than they planned. Lollapalooza is my festival. Industry is my show right now. And late at night it’s Charli XCX, John Summit or Slayyyter, usually while I’m working on something I couldn’t crack during the\u00a0day.",
      ],
      list: [
        ["On repeat", "Charli XCX, John Summit,\u00a0Slayyyter."],
        ["Watching", "Industry, on HBO."],
        ["Send a friend to", "Prague."],
        ["Someday", "A canal house in\u00a0Amsterdam."],
      ] as [string, string][],
      mapTitle: "Where I’ve been: an interactive map of flights and train trips from 2016 to 2026",
    },
  },

  work: {
    title: "Work",
    eyebrow: "Work",
    h1: "Ten years of work, sorted by the problem it solved instead of the logo on the\u00a0door.",
    lede:
      "Some of these are names you know and some sit under an NDA, but every one is real and every number is one I can stand behind. Where I led, I say so. Where I didn’t, I say that\u00a0too.",
    casesLabel: "Case studies",
  },

  caseStudy: {
    situation: "(I)   The situation",
    did: "(II)   What I did",
    result: "(III)   What came of it",
    next: "Next case",
  },

  writing: {
    title: "Writing",
    eyebrow: "Writing",
    h1: "Things I’d say in the meeting if we had more\u00a0time.",
    lede: "Short essays on positioning, brand, and what AI is actually good for. Mostly about B2B tech, occasionally about everything\u00a0else.",
    featured: {
      meta: "(I)\u00a0\u00a0\u00a0Positioning\u00a0\u00a0\u00a0·\u00a0\u00a0\u00a0Featured",
      title: "You all sound the same. It’s costing\u00a0millions.",
      dek: "The Work Tech industry has a sameness problem. And no, another messaging workshop isn’t going to fix\u00a0it.",
      date: "April 2026\u00a0\u00a0\u00a0·\u00a0\u00a0\u00a06 min read",
      read: "Read the piece ",
    },
  },

  share: {
    label: "Share",
    copy: "Copy link",
    copied: "Copied",
  },

  contact: {
    title: "Let’s talk",
    eyebrow: "Let’s talk",
    h1: "Tell me what’s going\u00a0on.",
    lede:
      "A brand that sounds like everyone else, a growth number that won’t move, or a role you’re trying to fill. Send me the short version, and I’ll take it from\u00a0there.",
    linkedin: {
      label: "LinkedIn",
      h: "The fastest way to reach\u00a0me.",
      d: "My profile is open, so you can message me directly, no connection needed. Tell me what’s going on and where you\u00a0work.",
      button: "Message me on LinkedIn\u00a0\u00a0→",
    },
    email: {
      label: "Email",
      h: "Rather\u00a0email?",
      d: "I reply just as fast either\u00a0way.",
      show: "Show email address",
      copy: "Copy",
      copied: "Copied",
    },
    nextLabel: "What happens next",
    steps: [
      ["I read it myself.", "No assistant, no routing, no ticket number."],
      ["I write back.", "Usually within two business days."],
      ["We get on a call.", "Thirty minutes, if it looks like a fit. If it isn’t, I’ll tell you, and point you somewhere better when I can."],
    ] as [string, string][],
    beforeLabel: "Before you write",
    resumeLink: "The full resume\u00a0\u00a0→",
    workLink: "Selected work\u00a0\u00a0→",
  },

  resume: {
    title: "Resume",
    kicker: "Resume",
    role: ["Director of Brand & Growth Strategy", "The Starr Conspiracy", "Chicago"],
    pos: "I lead brand and growth strategy for B2B SaaS and HR tech companies, from the positioning decision to the pipeline it has to\u00a0produce.",
    pdf: "Download the PDF",
    linkedin: "LinkedIn\u00a0\u00a0→",
    scope: [
      { num: "10+", label: "years in brand and growth" },
      { num: "7", label: "direct reports" },
      { num: "75 + 1,000", label: "colleagues and volunteers in cross-functional work" },
      { num: "3", label: "client regions: North America, EMEA, and APAC" },
    ],
    labels: { results: "Results", experience: "Experience", capabilities: "Capabilities", education: "Education" },
    results: [
      {
        num: "+15–20%",
        text: "Beat a $2.2M monthly revenue target by 15 to 20 percent, consistently, directing the SEO, paid media, and content team.",
        org: "hireEZ",
        year: "2024",
      },
      {
        num: "$10M",
        text: "Ran a $10M event and marketing budget end to end. Online store launches averaged more than $125K in their first 24 hours.",
        org: "San Francisco AIDS Foundation",
        year: "2023–24",
      },
      {
        num: "$1.72M",
        text: "Oversaw $1.72M in recurring annual revenue at a 9.75 NPS, and found $600K in upsell with the sales directors.",
        org: "The Starr Conspiracy",
        year: "2021–22",
      },
    ],
    jobs: [
      {
        org: "The Starr Conspiracy",
        when: "2025 – now",
        where: "Chicago",
        note: "Rejoined in February 2025 and promoted to Director 14 months later.",
        roles: [
          {
            title: "Director of Brand & Growth Strategy",
            when: "April 2026 – now",
            mandate:
              "Brand and growth strategy for B2B SaaS and HR tech clients, with a cross-functional team across content, design, digital, analytics, and client strategy.",
            bullets: [
              "Lead category positioning and messaging aimed at client win rates and executive engagement.",
              "Run executive thought leadership programs that grow share of voice in HR tech media and on LinkedIn.",
              "Own the attribution, reporting, and KPI dashboards used to optimize CAC and conversion.",
            ],
          },
          {
            title: "Marketing & Brand Strategist",
            when: "Feb 2025 – April 2026",
            mandate: "Enterprise B2B tech accounts, with a focus on AI-integrated growth and Answer Engine Optimization.",
            bullets: [
              "Moved enterprise clients from traditional search to Answer Engine Optimization to increase qualified lead\u00a0velocity.",
              "Ran in-person client events across North America, EMEA, and APAC that generated qualified leads.",
              "Held a 9.5 NPS across key client accounts, flagging at-risk accounts early and running the interventions that protected long-term revenue.",
            ],
          },
        ],
      },
      {
        org: "hireEZ",
        when: "2024 – 2025",
        where: "Mountain View, CA",
        roles: [
          {
            title: "Senior Manager, Digital Marketing",
            mandate: "HR tech. Led the SEO, paid media, and content team against a $2.2M monthly revenue target.",
            bullets: [
              "Beat the target by 15 to 20 percent, consistently.",
              "Introduced agile workflows and weekly performance sprints to find and scale winning campaigns.",
            ],
          },
        ],
      },
      {
        org: "San Francisco AIDS Foundation, AIDS/\u200bLifeCycle",
        when: "2023 – 2024",
        where: "San Francisco",
        roles: [
          {
            title: "Director of Marketing, Communications & Digital Engagement",
            mandate: "Led the marketing department across a $10M event and marketing budget, including about $200K a year in paid media.",
            bullets: [
              "Aligned multi-channel digital engagement with long-term revenue goals and built integrated plans for MQL and SQL conversion.",
              "Partnered with senior leadership on growth plans, and ran rollout and change management for third-party and custom platforms.",
              "Online store launches averaged more than $125K in revenue in the first 24 hours.",
            ],
          },
        ],
      },
      {
        org: "The Starr Conspiracy",
        when: "2021 – 2022",
        where: "Bentonville, AR",
        roles: [
          {
            title: "Marketing Strategist",
            mandate: "Product marketing and go-to-market for new software products across a key-account portfolio.",
            bullets: [
              "Oversaw $1.72M in recurring annual revenue at a 9.75 NPS, and added $600K in upsell and cross-sell with the sales directors.",
              "Led design sprints and go-to-market strategy for new software products, and built the sales, investor, and analyst decks myself.",
            ],
          },
        ],
      },
      {
        org: "Greater Bentonville Area Chamber of\u00a0Commerce",
        when: "2020 – 2021",
        where: "Bentonville, AR",
        roles: [
          {
            title: "Director of Marketing & Communications",
            mandate: "Brand, PR, social, and email for a regional chamber competing nationally for talent.",
            bullets: [
              "Rebuilt the brand so the Chamber could compete nationally for remote workers and relocating companies.",
              "Grew social impressions 78 percent in under six months with no paid push.",
            ],
          },
        ],
      },
      {
        org: "Intercut Productions",
        when: "2017 – 2020",
        where: "Bentonville, AR",
        roles: [
          {
            title: "Chief of Staff",
            mandate: "Account management, creative, and production for Fortune 500 clients.",
            bullets: [
              "Hired and oversaw the photographers, cinematographers, editors, and designers, and ran budgets and roadmaps.",
              "Helped make an Emmy-nominated TV show.",
            ],
          },
        ],
      },
    ] as ResumeJob[],
    capabilities: [
      { t: "Brand and category strategy", b: "Category positioning, messaging, and the executive thought leadership that carries it into the market." },
      { t: "Growth programs", b: "Multi-channel go-to-market across paid, organic, email, social, events, and partners, with the attribution to show what worked." },
      { t: "AI-era search and growth", b: "Answer Engine Optimization and AI-integrated growth programs for enterprise B2B." },
      {
        t: "Teams and budgets",
        b: "Player-coach for cross-functional teams, owner of revenue targets and an eight-figure budget, and the executive communication that gets a decision made.",
      },
      { t: "Hands on the work", b: "Figma, Adobe Creative Suite, and design sprints. I still build the decks, sites, and collateral myself." },
    ],
    education: {
      where: "Fayetteville, AR",
      school: "University of Arkansas",
      degree: "B.S. in Business Administration, marketing and economics",
      more: "References, letters, and certifications on request.\u00a0\u00a0",
      contact: "Get in touch\u00a0→",
    },
  },

  notFound: {
    tarotAlt: "Tarot card (404), The Ghost",
    eyebrow: "Error   ·   404",
    h1: ["This page ", "is invisible."],
    lede:
      "Which, as it happens, is the most expensive thing a brand can be. The page you wanted either moved or never existed. Either way, the good stuff is a click\u00a0away.",
    home: "Back to the homepage",
    work: "See the work",
  },
};

type ResumeRole = { title: string; when?: string; mandate: string; bullets: string[] };
type ResumeJob = { org: string; when: string; where: string; note?: string; roles: ResumeRole[] };

/** Every locale file has this exact shape. */
export type Dict = typeof en;
