"use client";

import { useEffect, useMemo, useState } from "react";
import { PEOPLE, type Person } from "@/lib/amsterdam";

const KEY = "ams26-pack";

/** Wearing days to cover with no laundry: Z&T are away Tue–Sun, E&J Tue–Mon (with Iceland). */
const WEAR_DAYS: Record<Person, number> = { Evan: 7, Jarrod: 7, Tyler: 6, Zak: 6 };
const ICELAND: Person[] = ["Evan", "Jarrod"];
const CARRYON: Person[] = ["Tyler", "Zak"];

type Item = {
  id: string;
  label: string;
  note?: string;
  /** Who needs it. Omitted means all four. */
  who?: Person[];
  /** How many, given wearing days n. */
  qty?: (n: number) => number;
};
type Group = { group: string; items: Item[] };

const GROUPS: Group[] = [
  {
    group: "Documents & money",
    items: [
      { id: "passport", label: "Passport", note: "Valid for at least 3 months past your return date. Photo of it in your phone too." },
      { id: "etias", label: "Check the EU entry rules before you fly", note: "Passport control now takes fingerprints and a photo on a first visit. Check whether the new ETIAS pre-authorisation applies yet (planned for late 2026)." },
      { id: "cards", label: "Contactless debit or credit card with no foreign-transaction fee", note: "Trams, trains and most places are tap-only. Visa or Mastercard; Amex is patchy." },
      { id: "cash", label: "€100–150 in cash", note: "Many coffeeshops, market stalls and small bars are cash or Dutch-debit only." },
      { id: "docs", label: "Screenshots of every booking: flights, hotel, Light Festival cruise, Blauw, Bulldog boat, Anne Frank House", note: "Works with no signal and no battery drama." },
      { id: "insurance", label: "Travel insurance details and your card's emergency number" },
      { id: "licence", label: "US driver's licence and the credit card the car is booked on", who: ICELAND, note: "For the Sixt pickup at Keflavík on Sunday night." },
    ],
  },
  {
    group: "Clothes: late-November Amsterdam",
    items: [
      { id: "shell", label: "Waterproof jacket with a hood", note: "Not an umbrella. Wind and bike lanes wreck them, and a hood keeps your hands free." },
      { id: "warm", label: "Warm mid layer: fleece, light puffer or a heavy sweater", note: "Canal cruises and the A'DAM Lookout are windy. 4–8°C is normal." },
      { id: "sweaters", label: "Sweaters", qty: () => 2, note: "Wool or similar. You'll wear them more than once." },
      { id: "tops", label: "T-shirts / long-sleeves", qty: (n) => n - 1, note: "Layer under the sweaters. Re-wear one." },
      { id: "base", label: "Thermal base layer top and bottom", qty: () => 1, note: "For cold nights on the boat deck and the Light Festival walk." },
      { id: "pants", label: "Jeans or chinos", qty: () => 3, note: "Wear a pair twice, no one will know." },
      { id: "underwear", label: "Underwear", qty: (n) => n + 1, note: "One a day plus a spare." },
      { id: "socks", label: "Socks, mostly wool", qty: (n) => n + 1, note: "Wet cobblestones kill cotton socks quickly." },
      { id: "shoes", label: "Waterproof walking shoes or boots, already broken in", note: "15–20k steps a day on cobblestones. This is the one thing not to skimp on." },
      { id: "shoes2", label: "A second pair of shoes", qty: () => 1, note: "So one pair can dry. Clean sneakers cover the nicer dinners too." },
      { id: "hat", label: "Beanie, scarf and thin gloves", note: "Cheap, light, and the difference between enjoying the cruise and surviving it." },
      { id: "nice", label: "One nicer outfit for Thanksgiving dinner and a table at Goudfazant", qty: () => 1, note: "Smart casual: dark jeans or chinos and a good sweater or collared shirt." },
      { id: "sleep", label: "Sleepwear", qty: () => 1 },
    ],
  },
  {
    group: "Toiletries & health",
    items: [
      { id: "toiletries", label: "Toothbrush, toothpaste, deodorant, razor, and your own hair products", note: "Check what the hotel supplies and don't double up." },
      { id: "meds", label: "Prescription meds in the original bottles, plus a few days extra" },
      { id: "pain", label: "Ibuprofen or paracetamol, antacids, and electrolyte packets", note: "Late nights, jet lag, and a lot of stroopwafels." },
      { id: "plugs", label: "Earplugs and an eye mask", note: "Jet lag, early lights and roommate snoring. Everyone will thank you." },
      { id: "lip", label: "Lip balm and hand cream", note: "Cold wind and dry hotel air." },
      { id: "blister", label: "Blister plasters", note: "Day-two blisters from new shoes are the classic trip-ruiner." },
    ],
  },
  {
    group: "Tech",
    items: [
      { id: "adapter", label: "Type C/F plug adapter, or a charger that's already EU-friendly", note: "US plugs don't fit. Bring a multi-port USB charger for the room." },
      { id: "bank", label: "Power bank", note: "Maps, tickets and photos all day on a cold phone." },
      { id: "cable", label: "Phone cable and headphones" },
      { id: "esim", label: "eSIM or international plan, set up before you fly", note: "Then you can order a ride or look up the tram without hunting for Wi-Fi." },
      { id: "apps", label: "Apps: I amsterdam, GVB or your bank's tap-to-pay, Google Maps offline for Amsterdam", note: "Download the offline map on Wi-Fi at home." },
    ],
  },
  {
    group: "Night out",
    items: [
      { id: "night", label: "A dark outfit for Shelter and the Saturday bars", qty: () => 1, note: "Shelter is a basement club, but you'll walk there in the cold. Keep the jacket handy." },
      { id: "smoke", label: "Leave all cannabis behind before you leave the Netherlands", note: "Don't fly with any, including to Iceland or the US. Finish it or leave it in Amsterdam. Smoke at the coffeeshop or on the Bulldog boat, and check the hotel's rules before lighting anything in the room." },
      { id: "water", label: "Reusable water bottle", note: "Water between rounds is how you do the Saturday plan on Sunday." },
    ],
  },
  {
    group: "Iceland: Evan & Jarrod only",
    items: [
      { id: "swim", label: "Swimsuit and flip-flops or sandals", who: ICELAND, note: "Blue Lagoon is at 8:00 am Monday, in the dark and the cold." },
      { id: "cond", label: "Hair conditioner (and leave-in if you have it)", who: ICELAND, note: "The silica water dries hair out. Condition before you get in." },
      { id: "towel", label: "Towel: confirm what your Blue Lagoon booking includes", who: ICELAND, note: "Bring a quick-dry towel if it doesn't." },
      { id: "wind", label: "Windproof outer layer and a warm hat", who: ICELAND, note: "Around 0–4°C and windy near Grindavík." },
      { id: "dry", label: "Waterproof phone pouch", who: ICELAND },
      { id: "bag", label: "A bag for wet clothes", who: ICELAND, note: "Ziploc or a small dry bag, for the flight home." },
    ],
  },
  {
    group: "Flying home: Zak & Tyler",
    items: [
      { id: "carryon", label: "Pack carry-on only, if at all possible", who: CARRYON, note: "Atlanta connection is 1h40 with customs, re-check and security. Checking a bag adds risk. Leave ~25% of the bag free for souvenirs." },
      { id: "mpc", label: "Download Mobile Passport Control for the Atlanta arrival", who: CARRYON },
    ],
  },
  {
    group: "One of us brings (shared)",
    items: [
      { id: "strip", label: "Multi-plug power strip with USB ports", note: "Two guys, one outlet, four chargers." },
      { id: "kit", label: "Small first-aid kit: plasters, antiseptic wipes, tape", note: "" },
      { id: "bags", label: "Ziploc bags and a laundry bag", note: "For wet shoes, wet clothes and souvenirs." },
    ],
  },
];

const WEATHER = [
  { label: "Typical high", value: "46°F / 8°C" },
  { label: "Typical low", value: "37°F / 3°C" },
  { label: "Rain", value: "More than half the days, mostly drizzle" },
  { label: "Daylight", value: "Sunrise ~7:40 am, sunset ~4:35 pm" },
  { label: "Feels like", value: "Colder by the water and in wind" },
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
    () =>
      GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => !i.who || i.who.includes(who)) })).filter((g) => g.items.length),
    [who],
  );
  const all = groups.flatMap((g) => g.items);
  const packed = all.filter((i) => done[`${who}:${i.id}`]).length;

  function toggle(id: string) {
    setDone((d) => {
      const next = { ...d, [`${who}:${id}`]: !d[`${who}:${id}`] };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }
  function reset() {
    setDone((d) => {
      const next = { ...d };
      Object.keys(next).forEach((k) => k.startsWith(`${who}:`) && delete next[k]);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
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
    <div className="ams-pack">
      <div className="ams-pack-weather" aria-label="Typical weather in late November">
        {WEATHER.map((w) => (
          <div key={w.label}>
            <span>{w.label}</span>
            <strong>{w.value}</strong>
          </div>
        ))}
      </div>
      <p className="ams-pack-note">
        Typical late-November Amsterdam climate, not a forecast. Check the forecast a week out and adjust. Four guys, no laundry: the quantities
        below cover {n} wearing days, with sweaters, jeans and a jacket re-worn.
      </p>

      <div className="ams-bad-who" role="group" aria-label="Whose list">
        {PEOPLE.map((p) => (
          <button key={p} className={who === p ? "is-on" : undefined} onClick={() => setWho(p)} aria-pressed={who === p}>
            {p}
          </button>
        ))}
      </div>

      <div className="ams-pack-bar">
        <div className="ams-pack-meter" role="progressbar" aria-valuemin={0} aria-valuemax={all.length} aria-valuenow={packed} aria-label="Packed">
          <span style={{ width: `${all.length ? (packed / all.length) * 100 : 0}%` }} />
        </div>
        <p>
          {packed} of {all.length} packed
        </p>
        <button onClick={() => setHide((h) => !h)} aria-pressed={hide}>{hide ? "Show packed" : "Hide packed"}</button>
        <button onClick={copy}>{copied ? "Copied" : "Copy list"}</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="ams-pack-grid">
        {groups.map((g) => {
          const items = hide ? g.items.filter((i) => !done[`${who}:${i.id}`]) : g.items;
          if (!items.length) return null;
          return (
            <div key={g.group}>
              <p className="ams-check-group">{g.group}</p>
              <ul className="ams-checks">
                {items.map((it) => {
                  const isDone = !!done[`${who}:${it.id}`];
                  return (
                    <li key={it.id}>
                      <label className={isDone ? "is-done" : undefined}>
                        <input type="checkbox" checked={isDone} onChange={() => toggle(it.id)} />
                        <span>
                          {it.qty && <b className="ams-pack-qty">{it.qty(n)}×</b>} {it.label}
                          {it.note ? <em className="ams-pack-why">{it.note}</em> : null}
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
