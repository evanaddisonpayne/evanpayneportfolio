"use client";

import { Bingo, CocoaBuilder, CowboyNames, SnowGlobe } from "./Fun";
import { useXm } from "./XmProvider";

export default function FunView() {
  const { me, sweater, snow, sleigh } = useXm();
  return (
    <>
      <section className="section dark xm-pagehead">
        <div className="wrap">
          <p className="eyebrow">The silly part</p>
          <h1 className="h2">Fun</h1>
        </div>
      </section>

      <section className="section orange xm-bingo-sec">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Steamboat Bingo</p>
            <h2 className="h2">Spot it, tap it, win the remote.</h2>
            <p className="lede">Things to find between the airport and the gondola. First line wins: the winner picks Sunday night&apos;s movie.</p>
          </div>
          <Bingo />
        </div>
      </section>

      <section className="section dark xm-weird-sec">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Settle it</p>
            <h2 className="h2">
              Shake the <span className="italic">Snow Globe of Fate.</span>
            </h2>
            <p className="lede">Can&apos;t agree on the movie, the hot tub order or who does dishes? Shake it. The snow globe is binding.</p>
          </div>
          <SnowGlobe />

          <div className="xm-egos-head">
            <p className="eyebrow">Your Steamboat cowboy names</p>
            <h3 className="h3">It&apos;s a cattle town. You&apos;ll need one.</h3>
          </div>
          <CowboyNames me={me} />

          <div className="xm-egos-head">
            <p className="eyebrow">The Cocoa Bar Builder</p>
            <h3 className="h3">Three dice. One very good mug.</h3>
          </div>
          <CocoaBuilder me={me} />

          <button className="xm-rain-btn" onClick={snow}>
            Let it snow{sweater ? " (sweaters too)" : ""}
          </button>
          <p className="xm-hint">Or type “snow” anywhere on the site. Tap the ornament on the home page five times for something itchier.</p>

          <button className="xm-shelter-open" onClick={sleigh}>
            Do not press this
          </button>
          <p className="xm-hint">Something flies by. Bells are optional and off until you ask. (Konami code works too.)</p>
        </div>
      </section>
    </>
  );
}
