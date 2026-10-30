"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { DEADLINES, GROUP_SIZE, ITINERARY, PRICE, SAIL_AT, SHIP, TRIP_SITE, sources } from "@/lib/virgincruise";
import { Marquee, Neon, Sticker, type StickerKind } from "@/components/tanyasbach/Breaks";
import { Bunting, FlagWord, LifeRing, RouteMap, Ship, Tattoo, Waves } from "./VcArt";

const STEPS_KEY = "vc27-steps";

const TABS = [
  { href: "#news", label: "The news", icon: "⚓" },
  { href: "#route", label: "Route", icon: "⛴" },
  { href: "#guide", label: "How to cruise", icon: "☀" },
  { href: "#next", label: "Next steps", icon: "✓" },
];

export default function VcView() {
  const [toast, setToast] = useState<string | null>(null);
  const [confettiTick, setConfettiTick] = useState(0);
  const [honk, setHonk] = useState(false);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2800);
  }, []);

  const horn = useCallback(() => {
    playHorn();
    setHonk(true);
    window.setTimeout(() => setHonk(false), 1600);
    setConfettiTick((t) => t + 1);
    flash("📯 Toot toot. The S.S. Tanya is leaving the port.");
  }, [flash]);

  // Easter egg: type "ahoy" anywhere to sound the horn.
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buf = (buf + e.key.toLowerCase()).slice(-4);
      if (buf === "ahoy") horn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [horn]);

  return (
    <div className="tb vc" id="top">
      {toast && (
        <div className="tb-toast" role="status">
          {toast}
        </div>
      )}

      <header className="tb-nav">
        <div className="wrap tb-nav-inner">
          <a href="#top" className="tb-nav-brand" aria-label="Back to top">
            <span className="tb-nav-x" aria-hidden>
              ⚓ ♥ ⚓
            </span>
            <span>
              S.S. Tanya <em>’27</em>
            </span>
          </a>
          <nav className="tb-nav-links" aria-label="Page sections">
            {TABS.map((t) => (
              <a key={t.href} href={t.href}>
                {t.label}
              </a>
            ))}
            <Link href={TRIP_SITE} className="vc-nav-trip">
              Trip site ↗
            </Link>
          </nav>
        </div>
      </header>

      <Hero onHorn={horn} honk={honk} />

      <Marquee a={["It’s official", "S.S. Tanya", "May 29 – Jun 3", "Miami → Grand Turk → Bimini", "Adults only", "Wear red", "Salud, sailor"]} />

      <News />
      <Route />
      <Guide />
      <Scarlet />
      <NextSteps />

      <Neon kicker="Regla del barco" line="Lo que pasa en el mar, se queda en el mar." />

      <Rope />
      <footer className="footer tb-footer vc-footer">
        <div className="wrap tb-foot">
          <div>
            <p className="eyebrow">Sources</p>
            <ul className="tb-sources">
              {sources.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tb-hint">
              Cruise facts checked {PRICE.checked}. Nothing is booked yet. Fares, port times and Virgin&apos;s rules can change, so we&apos;ll reconfirm
              everything before anyone pays. Not affiliated with Virgin Voyages, just big fans. This page isn&apos;t indexed; share it with the group
              only. Planned by Evan and Tanya.
            </p>
            <p className="vc-foot-links">
              <Link href={TRIP_SITE}>← Back to the trip site</Link>
              <button type="button" className="tb-replay" onClick={horn}>
                📯 Sound the horn
              </button>
            </p>
          </div>
        </div>
      </footer>

      <nav className="tb-tabbar" aria-label="Page sections">
        {TABS.map((t) => (
          <a key={t.href} href={t.href}>
            <span className="tb-tabbar-icon" aria-hidden>
              {t.icon}
            </span>
            <span>{t.label}</span>
          </a>
        ))}
      </nav>

      <Confetti trigger={confettiTick} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: the announcement + a boarding pass                            */
/* ------------------------------------------------------------------ */

function Hero({ onHorn, honk }: { onHorn: () => void; honk: boolean }) {
  return (
    <section className="section light tb-hero vc-hero">
      <Bunting repeat={6} />
      <div className="tb-tape" aria-hidden>
        {"ALL ABOARD   ·   S.S. TANYA   ·   MIAMI · GRAND TURK · BIMINI   ·   MAYO 2027   ·   ".repeat(10)}
      </div>
      <div className="wrap tb-hero-grid vc-hero-grid">
        <div className="tb-hero-copy">
          <p className="eyebrow">
            It&apos;s official<span className="dot" aria-hidden>·</span>Virgin Voyages<span className="dot" aria-hidden>·</span>May 29 – Jun 3, 2027
          </p>
          <h1 className="h1">
            ¡Al barco, <span className="italic">Tanya!</span>
          </h1>
          <p className="lede">
            The bride has spoken. We&apos;re setting sail: five nights on Virgin Voyages&apos; <strong>{SHIP}</strong>, round trip from Miami, with a
            beach day in <strong>Turks and Caicos</strong> and another at Bimini. Adults only. {GROUP_SIZE} of us. Zero formal nights. One very red
            party.
          </p>
          <div className="btns tb-hero-btns">
            <a className="btn btn-signal tb-big-btn" href="#next">
              What I do next
            </a>
            <a className="btn btn-ghost tb-big-btn vc-ghost" href="#guide">
              How cruising works
            </a>
          </div>
          <Countdown />
        </div>
        <BoardingPass />
      </div>

      <div className="vc-horizon">
        <button type="button" className={`vc-ship-btn${honk ? " is-honk" : ""}`} onClick={onHorn} aria-label="Sound the ship's horn">
          <Ship />
          <span className="vc-puff" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </button>
        <Waves />
      </div>
    </section>
  );
}

function BoardingPass() {
  const rows: [string, ReactNode][] = [
    ["Sailors", `Tanya + 15`],
    ["Ship", SHIP],
    ["Departs", "Sat, May 29 · 5:00 pm"],
    ["Returns", "Thu, Jun 3 · 6:30 am"],
    ["Cabin", "Bring a buddy"],
    ["Dress code", "Red, eventually"],
  ];
  return (
    <div className="vc-pass-wrap">
      <article className="vc-pass" aria-label="Boarding pass">
        <header className="vc-pass-head">
          <span>Boarding pass</span>
          <span>Adults only · 18+</span>
        </header>
        <div className="vc-pass-route">
          <div>
            <b>MIA</b>
            <small>Miami</small>
          </div>
          <span className="vc-pass-arrow" aria-hidden>
            ⛴ · · · ♥ · · · ⛴
          </span>
          <div>
            <b>GDT</b>
            <small>Grand Turk</small>
          </div>
        </div>
        <dl className="vc-pass-grid">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="vc-pass-stub">
          <LifeRing className="vc-pass-ring" />
          <div className="vc-pass-bars" aria-hidden />
          <p className="vc-pass-seat">
            Gate: PortMiami
            <br />
            Group: La Novia
          </p>
        </div>
      </article>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  if (now === null) return <div className="tb-count" aria-hidden />;
  const diff = new Date(SAIL_AT).getTime() - now;
  if (diff <= 0) return <p className="tb-count-live">¡Zarpamos! We&apos;re at sea.</p>;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const cells: [number, string][] = [
    [d, d === 1 ? "day" : "days"],
    [h, h === 1 ? "hour" : "hours"],
    [m, "min"],
    [s, "sec"],
  ];
  return (
    <div className="tb-count">
      <div className="tb-count-row" role="timer" aria-live="off" aria-label={`${d} days, ${h} hours, ${m} minutes until sail-away`}>
        {cells.map(([v, l]) => (
          <div key={l} className="tb-count-cell">
            <span className="tb-count-num">{l.startsWith("day") ? v : String(v).padStart(2, "0")}</span>
            <span className="tb-count-label">{l}</span>
          </div>
        ))}
      </div>
      <p className="tb-count-cap">until sail-away · Sat, May 29 · 5 pm</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The news: the four facts everyone asks first                        */
/* ------------------------------------------------------------------ */

function News() {
  const cards: { k: string; title: string; body: ReactNode; sticker: StickerKind; tone: string }[] = [
    {
      k: "Where",
      title: "Turks and Caicos, plus a bonus Bahamas day",
      body: (
        <>
          A full day on <b>Grand Turk</b> (Turks and Caicos), then <b>The Beach Club at Bimini</b>, Virgin&apos;s private-ish Bahamas beach club. Two
          sea days for pools and recovery.
        </>
      ),
      sticker: "palm",
      tone: "lagoon",
    },
    {
      k: "When",
      title: "Sat, May 29 – Thu, Jun 3, 2027",
      body: (
        <>
          Five nights over <b>Memorial Day weekend</b>, so most of us only burn three or four PTO days. Fly into Miami Friday, May 28.
        </>
      ),
      sticker: "sparkle",
      tone: "mango",
    },
    {
      k: "Who",
      title: `Tanya + her 15 closest friends`,
      body: (
        <>
          {GROUP_SIZE} sailors, about eight cabins. Virgin is <b>adults only</b> (18+), so the only screaming on deck will be ours.
        </>
      ),
      sticker: "lips",
      tone: "signal",
    },
    {
      k: "Ballpark",
      title: `From about $${PRICE.fromPerPerson.toLocaleString()} a person`,
      body: (
        <>
          The cheapest cabins were listed from ${PRICE.fromPerCabin.toLocaleString()} for two. Add taxes and port fees, tips (${PRICE.tipsPerDay}/day
          prepaid), drinks, and your flight. We&apos;ll send real numbers before anyone pays.
        </>
      ),
      sticker: "coupe",
      tone: "orchid",
    },
  ];
  return (
    <section className="section light vc-news" id="news">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The announcement</p>
          <h2 className="h2">
            Four destinations went in. <span className="italic">One ship came out.</span>
          </h2>
          <p className="lede">
            Cartagena was hot, Cancún was tempting, Turks was gorgeous. Then we realized one cruise gets us Turks and Caicos, a beach club, a floating
            nightclub and nobody has to plan dinner. Sold.
          </p>
        </div>
        <ul className="vc-news-grid">
          {cards.map((c, i) => (
            <li key={c.k} className="vc-news-card" style={{ "--tone": `var(--${c.tone})`, "--tilt": `${i % 2 ? 1.2 : -1.2}deg` } as CSSProperties}>
              <Sticker kind={c.sticker} className="vc-news-sticker" />
              <p className="vc-k">{c.k}</p>
              <h3 className="h3">{c.title}</h3>
              <p className="vc-body">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Route: map + day-by-day                                              */
/* ------------------------------------------------------------------ */

function Route() {
  return (
    <section className="section tb-bg-sky vc-route-sec" id="route">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The route</p>
          <h2 className="h2">
            Six days, three ports, <span className="italic">zero dishes.</span>
          </h2>
        </div>
        <div className="vc-route-grid">
          <figure className="vc-map-frame">
            <RouteMap />
            <figcaption className="tb-hint">Round trip from Miami on the {SHIP}. Port times as listed for this sailing; Virgin can change them.</figcaption>
          </figure>
          <ol className="vc-days">
            {ITINERARY.map((d) => (
              <li key={d.day} className={`vc-day is-${d.kind}`}>
                <span className="vc-day-n">{d.day}</span>
                <div className="vc-day-body">
                  <p className="vc-day-date">{d.date}</p>
                  <p className="vc-day-place">
                    {d.place} <small>{d.where}</small>
                  </p>
                  <p className="vc-day-time">{d.time}</p>
                  <p className="vc-day-line">{d.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How to cruise: the guide                                            */
/* ------------------------------------------------------------------ */

const CHAPTERS: { n: string; title: string; kicker: string; items: ReactNode[] }[] = [
  {
    n: "01",
    kicker: "Before you book",
    title: "Fares, tips, and the fine print",
    items: [
      <>
        Virgin sells three fares. <b>Base</b> is cheapest but fully non-refundable with no changes. <b>Essential</b> lets you move dates to a future
        cruise credit. <b>Premium</b> adds a drinks credit, better Wi-Fi and name changes.
      </>,
      <>Evan and Tanya will pick one fare for the whole group, so we&apos;re all on the same rules. You&apos;ll hear which before deposits.</>,
      <>
        Tips aren&apos;t in the fare anymore: <b>${PRICE.tipsPerDay} a person per day</b> if you prepay, ${PRICE.tipsOnboard} if you pay on board. Prepay.
      </>,
      <>Virgin takes a 20% deposit at booking and the rest 120 days before sailing.</>,
    ],
  },
  {
    n: "02",
    kicker: "Papers, please",
    title: "Passport, ID, and being 18+",
    items: [
      <>
        Bring a <b>passport valid through at least December 2027</b>. On round-trip cruises like this, U.S. citizens can technically sail on a birth
        certificate plus photo ID.
      </>,
      <>But if you miss the ship in Grand Turk or need to fly home early, you&apos;ll want that passport. Just bring it.</>,
      <>Everyone on board is 18+. Pack your ID for the bars anyway.</>,
    ],
  },
  {
    n: "03",
    kicker: "Boarding day · Sat, May 29",
    title: "How embarkation works",
    items: [
      <>
        <b>Fly in Friday.</b> Never fly in the morning of a cruise. Flights get delayed; ships don&apos;t wait.
      </>,
      <>Check in on the Virgin app ahead of time and pick an arrival slot at the terminal at PortMiami.</>,
      <>Hand your big suitcase to the porters at the curb; it shows up at your cabin later. Keep a day bag with passport, meds, chargers and a swimsuit.</>,
      <>Then lunch, a drink, and the sail-away party on deck at 5. Virgin pours bubbly at sail-away. We&apos;ll be there.</>,
    ],
  },
  {
    n: "04",
    kicker: "On board",
    title: "Food, drinks, and getting around",
    items: [
      <>
        <b>No buffet, no assigned dining room.</b> 20+ restaurants are included, plus The Galley food court for snacks and late-night pizza.
      </>,
      <>Book group dinners in the app as soon as reservations open. Tables for 16 go fast, so the planners will grab those.</>,
      <>Wi-Fi, soda, drip coffee, tea and water are included. Cocktails, wine and mocktails are extra.</>,
      <>A prepaid <b>Bar Tab</b> comes with bonus credit, which beats paying drink by drink. Spa, excursions and laundry cost extra.</>,
    ],
  },
  {
    n: "05",
    kicker: "Port days",
    title: "Grand Turk and Bimini",
    items: [
      <>Grand Turk: 8 am to 5 pm on Mon, May 31. Bimini: 8 am to 6 pm on Wed, Jun 2.</>,
      <>
        <b>&ldquo;All aboard&rdquo; is earlier than departure.</b> Check the app for the exact time, and set two alarms. Ships really do leave without you.
      </>,
      <>Excursions are called Shore Things. Book them in the app; we&apos;ll share a few picks for the group.</>,
      <>Reef-safe sunscreen, water shoes, a cover-up and your cruise card. That&apos;s the whole beach bag.</>,
    ],
  },
  {
    n: "06",
    kicker: "Last morning · Thu, Jun 3",
    title: "Getting home",
    items: [
      <>The ship docks in Miami at 6:30 am. Expect to be off by mid-morning.</>,
      <>
        Book flights home <b>after noon</b>. Earlier is risky; later is relaxed.
      </>,
      <>Pack the night before, and keep tomorrow&apos;s outfit and your passport out of the big suitcase.</>,
    ],
  },
];

const INCLUDED = ["All the restaurants (20+)", "The Galley food court", "Wi-Fi", "Soda, drip coffee, tea, water", "Fitness classes", "Shows, DJs and parties", "Bubbly at sail-away"];
const EXTRA = ["Cocktails, beer, wine", "Mocktails and smoothies", `Tips ($${PRICE.tipsPerDay}/day prepaid)`, "Spa", "Shore Things (excursions)", "Laundry", "Faster Wi-Fi tiers"];

const GLOSSARY: [string, string][] = [
  ["Sailor", "You. Virgin doesn't say passenger."],
  ["Sea day", "No port. Pool, spa, brunch, nap, repeat."],
  ["All aboard", "The time you must be back on the ship. Not the sail time."],
  ["Shore Things", "Virgin's word for excursions."],
  ["Bar Tab", "Prepaid drinks credit with a bonus on top."],
  ["The Galley", "Casual food court. Your 2 am friend."],
  ["RockStar", "The suites. A girl can dream."],
  ["Scarlet Night", "The night the whole ship wears red."],
];

function Guide() {
  return (
    <section className="section light vc-guide" id="guide">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">How to cruise</p>
          <h2 className="h2">
            First cruise? <span className="italic">Here&apos;s the whole thing.</span>
          </h2>
          <p className="lede">
            Everything we wish someone had told us, in the order you&apos;ll need it. Five minutes now saves a missed ship later.
          </p>
        </div>

        <ol className="vc-chapters">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="vc-chapter">
              <div className="vc-porthole" aria-hidden>
                <span>{c.n}</span>
              </div>
              <p className="vc-k">{c.kicker}</p>
              <h3 className="h3">{c.title}</h3>
              <ul className="vc-list">
                {c.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="vc-ledger">
          <div className="vc-ledger-col is-in">
            <p className="vc-ledger-k">In the fare</p>
            <ul>
              {INCLUDED.map((x) => (
                <li key={x}>
                  <span aria-hidden>♥</span> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="vc-ledger-col is-out">
            <p className="vc-ledger-k">Costs extra</p>
            <ul>
              {EXTRA.map((x) => (
                <li key={x}>
                  <span aria-hidden>$</span> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="vc-glossary">
          <div className="vc-glossary-head">
            <p className="eyebrow">Speak sailor</p>
            <h3 className="h3">A tiny phrasebook</h3>
            <p className="tb-hint">
              Bonus: the flags across the top of this page are real maritime signal flags. They spell <FlagWord />
            </p>
          </div>
          <dl className="vc-gloss">
            {GLOSSARY.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Scarlet Night + what to pack                                        */
/* ------------------------------------------------------------------ */

function Scarlet() {
  const pack = [
    "One red look for Scarlet Night (more is fine)",
    "Pajamas you'd let people see",
    "Three swimsuits, because wet ones never dry",
    "A cover-up: no swimsuits in the restaurants",
    "Sandals plus one pair you can dance in",
    "Passport, meds, chargers in your carry-on",
  ];
  return (
    <section className="section vc-scarlet" id="scarlet">
      <div className="wrap vc-scarlet-grid">
        <div className="vc-scarlet-art">
          <Tattoo word="TANYA" />
        </div>
        <div className="vc-scarlet-copy">
          <p className="eyebrow">Dress code</p>
          <h2 className="h2">
            Scarlet Night. <span className="italic">Wear red. That&apos;s the rule.</span>
          </h2>
          <p className="lede">
            Virgin has no formal nights and no dress code, except for the one night the whole ship turns red. Any red counts: a slip dress, a jumpsuit,
            a lip. The bride picks her look first; the rest of us coordinate around her.
          </p>
          <p className="vc-pack-k">Pack this</p>
          <ul className="vc-pack">
            {pack.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Next steps: a tickable checklist, saved on this device               */
/* ------------------------------------------------------------------ */

type Step = { id: string; title: string; line: ReactNode; when: string; cta?: { href: string; label: string; ext?: boolean } };

const STEPS: Step[] = [
  {
    id: "rsvp",
    title: "Say you're in",
    line: "RSVP on the trip site so we know how many cabins to hold. Takes two minutes.",
    when: `By ${DEADLINES.rsvp}`,
    cta: { href: `${TRIP_SITE}/rsvp`, label: "RSVP now" },
  },
  {
    id: "buddy",
    title: "Pick your cabin buddy",
    line: "Most cabins are built for two. Text Evan who you want to bunk with. Flying solo? We'll match you.",
    when: `By ${DEADLINES.rsvp}`,
  },
  {
    id: "passport",
    title: "Check your passport",
    line: "It should be valid through December 2027. If not, renew now; it can take weeks.",
    when: "This week",
    cta: { href: "https://travel.state.gov/content/travel/en/passports.html", label: "Passport info", ext: true },
  },
  {
    id: "deposit",
    title: "Pay your deposit",
    line: "When we text the booking details, pay your share of the deposit (Virgin takes 20% of the fare). Once you pay, you're in, and there are no refunds from the group.",
    when: "Early December · we'll text",
  },
  {
    id: "final",
    title: "Make the final payment",
    line: "Virgin wants the full fare 120 days before sailing. We'll collect a few days earlier so nobody's cabin gets dropped.",
    when: `By ${DEADLINES.finalPayment}`,
  },
  {
    id: "flights",
    title: "Book flights to Miami",
    line: "Land Friday, May 28. Fly home Thursday, June 3 after noon. Drop your flight in the group chat.",
    when: "By the end of February",
  },
  {
    id: "app",
    title: "Get the app and check in",
    line: "Download the Virgin Voyages app, check in, pick an arrival time, and book a Shore Thing if you want one.",
    when: "Spring 2027",
  },
  {
    id: "red",
    title: "Find something red",
    line: "Scarlet Night outfit, sorted. Bonus points for matching the bride.",
    when: "Before May",
  },
];

function NextSteps() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STEPS_KEY);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      /* storage blocked: ticks just won't persist */
    }
  }, []);
  const toggle = (id: string) =>
    setDone((cur) => {
      const next = { ...cur, [id]: !cur[id] };
      try {
        window.localStorage.setItem(STEPS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  const count = STEPS.filter((s) => done[s.id]).length;
  const nextId = STEPS.find((s) => !done[s.id])?.id;

  return (
    <section className="section tb-bg-blush vc-next" id="next">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">What happens next</p>
          <h2 className="h2">
            Eight little steps <span className="italic">to the sail-away party.</span>
          </h2>
          <p className="lede">Tick them off as you go. The first two are the only urgent ones.</p>
        </div>
        <p className="vc-progress" aria-live="polite">
          <span className="vc-progress-bar" aria-hidden>
            <span style={{ width: `${(count / STEPS.length) * 100}%` }} />
          </span>
          <span>
            {count} of {STEPS.length} done{count === STEPS.length ? " · ¡lista para zarpar!" : ""}
          </span>
        </p>
        <ol className="vc-steps">
          {STEPS.map((s, i) => {
            const isDone = Boolean(done[s.id]);
            return (
              <li key={s.id} className={`vc-step${isDone ? " is-done" : ""}${s.id === nextId ? " is-next" : ""}`}>
                <button type="button" className="vc-check" aria-pressed={isDone} onClick={() => toggle(s.id)} aria-label={`Mark "${s.title}" ${isDone ? "not done" : "done"}`}>
                  <span aria-hidden>{isDone ? "✓" : i + 1}</span>
                </button>
                <div className="vc-step-body">
                  <p className="vc-step-when">{s.when}</p>
                  <h3 className="vc-step-title">{s.title}</h3>
                  <p className="vc-step-line">{s.line}</p>
                  {s.cta &&
                    (s.cta.ext ? (
                      <a className="vc-step-cta" href={s.cta.href} target="_blank" rel="noopener noreferrer">
                        {s.cta.label} ↗
                      </a>
                    ) : (
                      <Link className="vc-step-cta" href={s.cta.href}>
                        {s.cta.label} →
                      </Link>
                    ))}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="tb-hint">Ticks are saved on this phone only. They&apos;re for you; the planners track the real list.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Little bits                                                         */
/* ------------------------------------------------------------------ */

function Rope() {
  return <div className="vc-rope" aria-hidden />;
}

const BITS = ["♥", "⚓", "✦", "☀", "❀", "♥"];
const COLORS = ["var(--scarlet)", "var(--signal)", "var(--mango)", "var(--lagoon)", "var(--navy)", "var(--orchid)"];

function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; delay: number; dur: number; size: number; bit: string; color: string }[]>([]);
  useEffect(() => {
    if (!trigger) return;
    setPieces(
      Array.from({ length: 50 }, (_, i) => ({
        id: trigger * 1000 + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.9,
        dur: 2.4 + Math.random() * 2.2,
        size: 14 + Math.random() * 18,
        bit: BITS[i % BITS.length],
        color: COLORS[i % COLORS.length],
      })),
    );
    const t = window.setTimeout(() => setPieces([]), 5600);
    return () => window.clearTimeout(t);
  }, [trigger]);
  if (!pieces.length) return null;
  return (
    <div className="tb-confetti" aria-hidden>
      {pieces.map((p) => (
        <span key={p.id} style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, fontSize: p.size, color: p.color }}>
          {p.bit}
        </span>
      ))}
    </div>
  );
}

/** A ship's horn, synthesized: two low detuned saws through a lowpass. No audio files. */
function playHorn() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const out = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    out.connect(ctx.destination);
    lp.connect(out);
    const blast = (start: number, len: number) => {
      [110, 138.6].forEach((f) => {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = f;
        o.connect(lp);
        o.start(ctx.currentTime + start);
        o.stop(ctx.currentTime + start + len);
      });
      out.gain.setValueAtTime(0, ctx.currentTime + start);
      out.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.08);
      out.gain.setValueAtTime(0.18, ctx.currentTime + start + len - 0.12);
      out.gain.linearRampToValueAtTime(0, ctx.currentTime + start + len);
    };
    blast(0, 0.7);
    blast(0.9, 1.1);
    window.setTimeout(() => ctx.close(), 2400);
  } catch {
    /* no audio: the confetti still fires */
  }
}

