"use client";

// Gift bag ideas grouped by category, each with Tanya's three-way reaction.
// Reactions are saved like reply boxes (key "gift-<id>"), so they show up live for both of us.
import { useState } from "react";
import { GIFTS, type Gift } from "@/lib/tanyasbach-gifts";
import { useReplies } from "./Replies";

const REACTIONS = [
  { key: "love", emoji: "😍", label: "Love it" },
  { key: "maybe", emoji: "🤔", label: "Maybe" },
  { key: "pass", emoji: "🙅‍♀️", label: "Pass" },
] as const;
type ReactionKey = (typeof REACTIONS)[number]["key"];

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function GiftCard({ g }: { g: Gift }) {
  const { enabled, replies, save } = useReplies();
  const saved = replies[`gift-${g.id}`]?.text as ReactionKey | "" | undefined;
  const [pending, setPending] = useState<ReactionKey | "" | null>(null);
  const [err, setErr] = useState("");
  const [imgOk, setImgOk] = useState(true);
  const current = pending ?? saved ?? "";

  const react = async (k: ReactionKey) => {
    const next = current === k ? "" : k; // tap the same one again to clear
    setPending(next);
    setErr("");
    try {
      await save(`gift-${g.id}`, next);
    } catch {
      setErr("Didn't save. Try again?");
    } finally {
      setPending(null);
    }
  };

  const picked = REACTIONS.find((r) => r.key === current);

  return (
    <article className={`tbp-gift${picked ? ` is-${picked.key}` : ""}`}>
      <a className="tbp-gift-img" href={g.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
        {g.image && imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={g.image} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setImgOk(false)} />
        ) : (
          <span className="tbp-gift-ph">🎁</span>
        )}
        {picked && <span className="tbp-gift-badge">{picked.emoji}</span>}
      </a>
      <div className="tbp-gift-info">
        <h4 className="tbp-gift-name">
          <a href={g.url} target="_blank" rel="noopener noreferrer">
            {g.name}
          </a>
        </h4>
        <p className="tbp-gift-meta">
          <strong>{g.price}</strong>
          <span> · {g.shop || host(g.url)}</span>
        </p>
        {g.note && <p className="tbp-gift-note">{g.note}</p>}
      </div>
      <div className="tbp-react" role="group" aria-label={`Tanya's reaction to ${g.name}`}>
        {REACTIONS.map((r) => (
          <button
            key={r.key}
            type="button"
            className="tbp-react-btn"
            aria-pressed={current === r.key}
            disabled={enabled !== true}
            onClick={() => react(r.key)}
          >
            <span aria-hidden>{r.emoji}</span>
            <span className="tbp-react-label">{r.label}</span>
          </button>
        ))}
      </div>
      {err && (
        <p className="tbp-gift-err" role="alert">
          {err}
        </p>
      )}
    </article>
  );
}

export default function GiftBags() {
  const { replies } = useReplies();

  if (GIFTS.length === 0) {
    return <p className="tbp-gift-empty">No items yet. Evan&apos;s adding them now. 🎀</p>;
  }

  const categories = [...new Set(GIFTS.map((g) => g.category))];
  const tally = (key: ReactionKey) => GIFTS.filter((g) => replies[`gift-${g.id}`]?.text === key).length;
  const undecided = GIFTS.length - REACTIONS.reduce((n, r) => n + tally(r.key), 0);

  return (
    <div className="tbp-gifts">
      <p className="tbp-gift-tally" aria-live="polite">
        {REACTIONS.map((r) => (
          <span key={r.key}>
            {r.emoji} {tally(r.key)}
          </span>
        ))}
        <span>Not yet: {undecided}</span>
      </p>
      {categories.map((c) => (
        <div key={c} className="tbp-gift-cat">
          <h3 className="tbp-gift-cat-title">{c}</h3>
          <div className="tbp-gift-grid">
            {GIFTS.filter((g) => g.category === c).map((g) => (
              <GiftCard key={g.id} g={g} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
