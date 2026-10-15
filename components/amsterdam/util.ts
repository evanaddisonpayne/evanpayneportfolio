import type { Day, Person, Price, Stop } from "@/lib/amsterdam";

export const TZ = "Europe/Amsterdam";

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: state just won't persist */
  }
}

/** Amsterdam-local date (YYYY-MM-DD) and minutes since midnight. */
export function amsNow(d: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, mins: Number(get("hour")) * 60 + Number(get("minute")) };
}
export const toMins = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const forYou = (s: Stop, me: Person | null) => !me || !s.who || s.who.includes(me);
export const whoLabel = (who: Person[]) => (who.length === 2 ? `${who[0]} & ${who[1]}` : who.join(", "));
export const priceLabel = (p: Price) => (p === "free" ? "Free" : p === "card" ? "Card" : p);

export const stopId = (d: Day, s: Stop) => `${d.id}-${s.start}-${s.title}`;
/** Deep link to one stop on its day page. */
export const stopHref = (d: Day, s: Stop) => `/amsterdam/plan/${d.id}#${encodeURIComponent(stopId(d, s))}`;
