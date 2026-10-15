"use client";

import { useAms } from "./AmsProvider";
import { AlterEgos, BadDecisions, Complaints, RoastBooth, Windmill } from "./Fun";

export default function FunView() {
  const { me, nasty, rain, shelter } = useAms();
  return (
    <>
      <section className="section dark ams-pagehead">
        <div className="wrap">
          <p className="eyebrow">The weird part</p>
          <h1 className="h2">Fun</h1>
        </div>
      </section>

      <section className="section orange ams-complaint-sec">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Sir Adam Grievance Office</p>
            <h2 className="h2">File an official roommate complaint.</h2>
            <p className="lede">Pick the accused, pick the crimes, get a formal notice to send to the group chat. Rulings are final.</p>
          </div>
          <Complaints me={me} nasty={nasty} />
        </div>
      </section>

      <section className="section dark ams-weird-sec">
        <div className="pattern pattern-passport" aria-hidden />
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Settle it</p>
            <h2 className="h2">
              Consult the <span className="italic">Windmill of Fate.</span>
            </h2>
            <p className="lede">Can&apos;t agree on the next bar, who&apos;s paying or whether Tyler can go to bed? Spin it. The windmill is binding.</p>
          </div>
          <Windmill nasty={nasty} />

          <div className="ams-egos-head">
            <p className="eyebrow">Your Dutch alter egos</p>
            <h3 className="h3">Who you really are over here.</h3>
          </div>
          <AlterEgos me={me} />

          <div className="ams-egos-head">
            <p className="eyebrow">The Bad Decisions Generator</p>
            <h3 className="h3">Three dice. Zero accountability.</h3>
          </div>
          <BadDecisions me={me} nasty={nasty} />

          {nasty && (
            <>
              <div className="ams-egos-head">
                <p className="eyebrow">The Roast Booth</p>
                <h3 className="h3">Consent given. Zero mercy.</h3>
              </div>
              <RoastBooth me={me} />
            </>
          )}

          <button className="ams-rain-btn" onClick={rain}>
            Make it rain {nasty ? "eggplants" : "cheese"}
          </button>
          <p className="ams-hint">Or type “gezellig” anywhere on the site.</p>

          <button className="ams-shelter-open" onClick={shelter}>
            Do not press this
          </button>
          <p className="ams-hint">Opens a full-screen club. It flashes, so it asks first. (Konami code works too.)</p>
        </div>
      </section>
    </>
  );
}
