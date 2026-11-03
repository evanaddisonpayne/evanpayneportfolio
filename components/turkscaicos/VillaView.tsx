"use client";

import { useState, type CSSProperties } from "react";
import { VILLA } from "@/lib/turkscaicos";
import { Sticker } from "@/components/tanyasbach/Breaks";
import { VillaArt } from "./TcArt";
import { useTc } from "./TcShell";

export default function VillaView() {
  const { flash, confetti } = useTc();
  const [knocks, setKnocks] = useState(0);

  // Easter egg: knock on the door three times.
  const knock = () => {
    const n = knocks + 1;
    setKnocks(n);
    if (n % 3 === 0) {
      confetti(["🔑", "🌺", "🍾", "🏝"]);
      flash("Who's there? Sixteen people and a speaker. Come on in.");
    }
  };

  return (
    <>
      <section className="section light tb-hero tc-pagehead tc-villa-hero">
        <div className="wrap tc-villa-hero-grid">
          <div className="tb-hero-copy">
            <p className="eyebrow">
              Home base<span className="dot" aria-hidden>·</span>
              {VILLA.area}
            </p>
            <h1 className="h1">
              {VILLA.booked ? VILLA.name : "The villa"} <span className="italic">a.k.a. {VILLA.nickname}.</span>
            </h1>
            <p className="lede">
              One house, sixteen beds, a pool big enough for everyone and a table long enough for the chef dinner. Four nights of breakfast in
              swimsuits and after-parties that don&apos;t need an Uber.
            </p>
            {!VILLA.booked && (
              <p className="tc-status">
                <b>Not booked yet.</b> This page is the shopping list and the plan. Once we book, the listing, address and check-in details land here.
              </p>
            )}
            <div className="btns tb-hero-btns">
              {VILLA.listingUrl ? (
                <a className="btn btn-signal tb-big-btn" href={VILLA.listingUrl} target="_blank" rel="noopener noreferrer">
                  See the Airbnb ↗
                </a>
              ) : (
                <span className="btn tb-big-btn tc-ghost is-disabled" aria-disabled="true">
                  Airbnb link coming soon
                </span>
              )}
              <a className="btn tb-big-btn tc-ghost" href="#rooms">
                Who sleeps where
              </a>
            </div>
          </div>
          <button type="button" className="tc-villa-frame" onClick={knock} aria-label="Knock on the villa door">
            <VillaArt />
            <span className="tc-villa-caption">Knock, knock</span>
          </button>
        </div>
      </section>

      <section className="section tb-bg-blush" id="details">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The details</p>
            <h2 className="h2">
              Everything you&apos;d text the planners at 11 pm. <span className="italic">Answered.</span>
            </h2>
          </div>
          <ul className="tc-keycards">
            {[
              { k: "Check in", v: VILLA.checkIn, s: "sparkle" as const },
              { k: "Check out", v: VILLA.checkOut, s: "shades" as const },
              { k: "Address", v: VILLA.address, s: "palm" as const },
              { k: "Wi-Fi", v: `${VILLA.wifi.network} · ${VILLA.wifi.password}`, s: "disco" as const },
              { k: "Door code", v: VILLA.doorCode, s: "lips" as const },
              { k: "Sleeps", v: "16, in real beds", s: "coupe" as const },
            ].map((c, i) => (
              <li key={c.k} style={{ "--tilt": `${i % 2 ? 1 : -1}deg` } as CSSProperties}>
                <Sticker kind={c.s} className="tc-keycard-sticker" />
                <p className="tc-k">{c.k}</p>
                <p className="tc-keycard-v">{c.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section light" id="wishlist">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">What we&apos;re shopping for</p>
            <h2 className="h2">
              The villa has to <span className="italic">earn us.</span>
            </h2>
            <p className="lede">The non-negotiables while we compare listings. If you find one that ticks every box, send it to Evan.</p>
          </div>
          <ol className="tc-wish">
            {VILLA.wishlist.map((w, i) => (
              <li key={w.k}>
                <span className="tc-wish-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="tc-wish-k">{w.k}</p>
                  <p className="tc-body">{w.v}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tb-bg-sky" id="rooms">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Who sleeps where</p>
            <h2 className="h2">
              Eight rooms, <span className="italic">sixteen opinions.</span>
            </h2>
            <p className="lede">
              The shape of the plan. Actual pairings live with Evan and Tanya and get announced closer to the trip. Requests welcome; bribes welcomer.
            </p>
          </div>
          <ul className="tc-rooms">
            {VILLA.rooms.map((r, i) => (
              <li key={r.name} className={i === 0 ? "is-bride" : r.name.includes("boys") ? "is-boys" : undefined}>
                <p className="tc-room-door" aria-hidden>
                  {i === 0 ? "♛" : i + 1}
                </p>
                <p className="tc-room-name">{r.name}</p>
                <p className="tc-room-beds">{r.beds}</p>
                <p className="tc-room-who">{r.who}</p>
                {r.note && <p className="tc-room-note">{r.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section tc-rules-sec" id="rules">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">House rules</p>
            <h2 className="h2">
              We want our deposit back. <span className="italic">And to be invited again.</span>
            </h2>
          </div>
          <ol className="tb-rules-grid">
            {VILLA.houseRules.map((r, i) => (
              <li key={r.k}>
                <span className="tb-rule-n">{i + 1}</span>
                <strong>{r.k}</strong>
                <span>{r.v}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tb-bg-sun" id="stocked">
        <div className="wrap tc-stock-grid">
          <div className="section-head">
            <p className="eyebrow">Stocked on arrival</p>
            <h2 className="h2">
              The fridge, <span className="italic">the bar, the vibe.</span>
            </h2>
            <p className="lede">What&apos;s waiting when we walk in Thursday, so nobody spends the first hour in a grocery store.</p>
          </div>
          <div className="tc-receipt" role="list" aria-label="Shopping list">
            <p className="tc-receipt-head">Casa Tanya · Provisions</p>
            {[
              ["Water, by the case", "×6"],
              ["Coconut water", "×24"],
              ["Limes", "a lot"],
              ["Rum (for the punch)", "×4"],
              ["Bubbly for the toast", "×6"],
              ["Turk's Head beer", "×2 cases"],
              ["Eggs, bread, fruit, bacon", "4 days"],
              ["Chips, salsa, snacks", "∞"],
              ["Electrolytes", "×32"],
              ["Ice", "always more"],
            ].map(([a, b]) => (
              <p key={a} role="listitem" className="tc-receipt-row">
                <span>{a}</span>
                <span>{b}</span>
              </p>
            ))}
            <p className="tc-receipt-total">
              <span>Split</span>
              <span>÷ 16</span>
            </p>
            <p className="tc-receipt-thanks">¡Gracias! Come back soon ♥</p>
          </div>
        </div>
      </section>
    </>
  );
}
