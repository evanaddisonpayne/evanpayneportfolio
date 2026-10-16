"use client";

import { useEffect, useMemo, useState } from "react";
import { KID_CREW, PEOPLE, type Person } from "@/lib/christmas2026";

const KEY = "xm26-pack";

/** Wearing days with no laundry: everyone Fri–Mon; Evan stays on in Arkansas until Dec 28. */
const WEAR_DAYS: Record<Person, number> = { Debbie: 4, Brad: 4, Brannen: 4, Whitney: 4, Addie: 4, Prosper: 4, Evan: 11 };
const ADULTS: Person[] = ["Debbie", "Brad", "Brannen", "Whitney", "Evan"];
const KIDS: Person[] = ["Addie", "Prosper"];
const MOM_DAD: Person[] = ["Debbie", "Brad"];

type Item = {
  id: string;
  label: string;
  note?: string;
  /** Who needs it. Omitted means everyone. */
  who?: Person[];
  /** How many, given wearing days n. */
  qty?: (n: number) => number;
};
type Group = { group: string; items: Item[] };

const GROUPS: Group[] = [
  {
    group: "Documents & money",
    items: [
      { id: "id", label: "REAL ID driver's license or passport", who: ADULTS, note: "Adults need a REAL ID-compliant ID to fly. Kids under 18 flying with an adult don't need one." },
      { id: "cards", label: "Credit or debit card, and a little cash for tips", who: ADULTS },
      { id: "docs", label: "Screenshots of every booking: flights, the house, sleigh dinner, tubing", who: ADULTS, note: "Works with no signal at a small mountain airport." },
      { id: "insurance", label: "Health insurance cards", who: ADULTS },
      { id: "licence", label: "Driver's license and the credit card the SUV is booked on", who: ["Evan"], note: "For the rental counter at Hayden." },
    ],
  },
  {
    group: "Clothes: December in the mountains",
    items: [
      { id: "coat", label: "Warm, waterproof winter coat with a hood", note: "Highs hover around freezing and nights drop near 0°F." },
      { id: "snowpants", label: "Snow pants", who: KID_CREW, note: "For tubing on Sunday. Jeans get soaked and freeze." },
      { id: "boots", label: "Waterproof, insulated boots with good grip", note: "The one thing not to skimp on. Snowy sidewalks and the sleigh-ride barn." },
      { id: "sweaters", label: "Warm sweaters or fleeces", qty: () => 2 },
      { id: "tops", label: "Long-sleeve tops", qty: (n) => Math.max(3, n - 1) },
      { id: "base", label: "Thermal base layer, top and bottom", qty: () => 1, note: "For the sleigh ride, the gondola at sunset and the tubing hill." },
      { id: "pants", label: "Pants or jeans", qty: (n) => (n > 6 ? 3 : 2) },
      { id: "underwear", label: "Underwear", qty: (n) => n + 1, note: "One a day plus a spare." },
      { id: "socks", label: "Wool socks", qty: (n) => n + 1, note: "Wet cotton socks in snow boots are miserable." },
      { id: "hat", label: "Warm hat, gloves or mittens, and a scarf or neck gaiter", note: "Waterproof gloves for the kid crew." },
      { id: "pjs", label: "Pajamas", qty: () => 2, note: "Matching Christmas pajamas are entirely optional and entirely encouraged." },
      { id: "nice", label: "One warm, nicer outfit for the sleigh ride dinner", qty: () => 1, note: "Dinner is indoors after the ride. Warm layers on top of it for the sleigh." },
    ],
  },
  {
    group: "Hot springs",
    items: [
      { id: "swim", label: "Swimsuit" },
      { id: "watershoes", label: "Water shoes or sandals with grip", note: "Wet pool decks in winter are slick. Especially for Brad." },
      { id: "towel", label: "Quick-dry towel", note: "In case towels aren't included with the day pass." },
      { id: "bag", label: "A bag for wet things", note: "Ziploc or a small dry bag for the walk back." },
    ],
  },
  {
    group: "Mom & Dad",
    items: [
      { id: "cleats", label: "Slip-on ice cleats (Yaktrax-style)", who: MOM_DAD, note: "Sidewalks refreeze after dark. They slip on over boots in seconds." },
      { id: "meds", label: "Prescription meds in the original bottles, plus a few days extra", who: MOM_DAD },
      { id: "cane", label: "Cane or walking pole, if Brad uses one", who: ["Brad"], note: "Worth having for snowy curbs, even if it stays in the car." },
      { id: "doc", label: "Doctor's OK on hot springs and altitude", who: MOM_DAD, note: "Ask before the trip, not after." },
    ],
  },
  {
    group: "Toiletries & health",
    items: [
      { id: "toiletries", label: "Toothbrush, toothpaste, deodorant, hair things", note: "Check what the house supplies." },
      { id: "sunscreen", label: "Sunscreen and SPF lip balm", note: "Mountain sun is strong even in December, and snow reflects it." },
      { id: "lotion", label: "Lotion", note: "The air is very dry at altitude." },
      { id: "pain", label: "Pain reliever and electrolyte packets", who: ADULTS, note: "For altitude headaches the first day. Kids' versions too." },
      { id: "kidmeds", label: "Kids' pain reliever", who: ["Brannen", "Whitney"] },
    ],
  },
  {
    group: "Tech & the plane",
    items: [
      { id: "charger", label: "Phone charger and a power bank", note: "Cold drains batteries fast." },
      { id: "tablet", label: "Tablet or book, plus headphones, for the flights", who: KIDS },
      { id: "bottle", label: "Refillable water bottle", note: "Water is the altitude fix. Fill it after security." },
    ],
  },
  {
    group: "Evan: after the trip",
    items: [{ id: "xmas", label: "Clothes and gifts for Christmas week in Arkansas", who: ["Evan"], note: "You're away Dec 18–28. Trim the counts if you'll have a washer." }],
  },
  {
    group: "One of us brings (shared)",
    items: [
      { id: "warmers", label: "A pack of hand and toe warmers", note: "For the sleigh ride and tubing." },
      { id: "games", label: "A couple of board games or a deck of cards", note: "For Sunday afternoon's downtime." },
      { id: "kit", label: "Small first-aid kit: bandages, wipes, blister pads" },
      { id: "ziplocs", label: "Ziploc bags and a laundry bag" },
    ],
  },
];

const WEATHER = [
  { label: "Typical high", value: "Around 30°F / -1°C" },
  { label: "Typical low", value: "Near 0–5°F / -17°C" },
  { label: "Snow", value: "Likely. Steamboat is known for it" },
  { label: "Daylight", value: "Sunrise ~7:25 am, sunset ~4:35 pm" },
  { label: "Elevation", value: "~6,700 ft in town, ~9,000 ft up the gondola" },
];

export default function Packing({ me }: { me: Person | null }) {
  const [who, setWho] = useState<Person>(me ?? "Evan");
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hide, setHide] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    if (me) setWho(me);
  }, [me]);

  const n = WEAR_DAYS[who];
  const groups = useMemo(
    () => GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => !i.who || i.who.includes(who)) })).filter((g) => g.items.length),
    [who],
  );
  const all = groups.flatMap((g) => g.items);
  const packed = all.filter((i) => done[`${who}:${i.id}`]).length;

  function persist(next: Record<string, boolean>) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }
  function toggle(id: string) {
    setDone((d) => {
      const next = { ...d, [`${who}:${id}`]: !d[`${who}:${id}`] };
      persist(next);
      return next;
    });
  }
  function reset() {
    setDone((d) => {
      const next = { ...d };
      Object.keys(next).forEach((k) => k.startsWith(`${who}:`) && delete next[k]);
      persist(next);
      return next;
    });
  }
  function copy() {
    const text = groups
      .map((g) => `${g.group}\n${g.items.map((i) => `- [${done[`${who}:${i.id}`] ? "x" : " "}] ${i.qty ? `${i.qty(n)}× ` : ""}${i.label}`).join("\n")}`)
      .join("\n\n");
    navigator.clipboard
      ?.writeText(`Packing list for ${who}\n\n${text}`)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  }

  return (
    <div className="xm-pack">
      <div className="xm-pack-weather" aria-label="Typical weather in late December">
        {WEATHER.map((w) => (
          <div key={w.label}>
            <span>{w.label}</span>
            <strong>{w.value}</strong>
          </div>
        ))}
      </div>
      <p className="xm-pack-note">
        Typical December climate, not a forecast. Check the forecast a week out and adjust. Quantities below cover {n} days with no laundry
        {who === "Evan" ? ", since you stay on through Christmas" : ""}.
      </p>

      <div className="xm-who-mini" role="group" aria-label="Whose list">
        {PEOPLE.map((p) => (
          <button key={p} className={who === p ? "is-on" : undefined} onClick={() => setWho(p)} aria-pressed={who === p}>
            {p}
          </button>
        ))}
      </div>

      <div className="xm-pack-bar">
        <div className="xm-pack-meter" role="progressbar" aria-valuemin={0} aria-valuemax={all.length} aria-valuenow={packed} aria-label="Packed">
          <span style={{ width: `${all.length ? (packed / all.length) * 100 : 0}%` }} />
        </div>
        <p>
          {packed} of {all.length} packed
        </p>
        <button onClick={() => setHide((h) => !h)} aria-pressed={hide}>
          {hide ? "Show packed" : "Hide packed"}
        </button>
        <button onClick={copy}>{copied ? "Copied" : "Copy list"}</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="xm-pack-grid">
        {groups.map((g) => {
          const items = hide ? g.items.filter((i) => !done[`${who}:${i.id}`]) : g.items;
          if (!items.length) return null;
          return (
            <div key={g.group}>
              <p className="xm-check-group">{g.group}</p>
              <ul className="xm-checks">
                {items.map((it) => {
                  const isDone = !!done[`${who}:${it.id}`];
                  return (
                    <li key={it.id}>
                      <label className={isDone ? "is-done" : undefined}>
                        <input type="checkbox" checked={isDone} onChange={() => toggle(it.id)} />
                        <span>
                          {it.qty && <b className="xm-pack-qty">{it.qty(n)}×</b>} {it.label}
                          {it.note ? <em className="xm-pack-why">{it.note}</em> : null}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
