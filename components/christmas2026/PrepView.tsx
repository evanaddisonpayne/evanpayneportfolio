"use client";

import { budget, checklist } from "@/lib/christmas2026";
import Packing from "./Packing";
import { useXm } from "./XmProvider";
import { money } from "./util";

export default function PrepView() {
  const { me, checks, toggleCheck } = useXm();
  const allItems = checklist.flatMap((g) => g.items);
  const done = allItems.filter((i) => checks[i.id]).length;
  const low = budget.reduce((a, b) => a + b.low, 0);
  const high = budget.reduce((a, b) => a + b.high, 0);

  return (
    <>
      <section className="section dark xm-pagehead">
        <div className="wrap">
          <p className="eyebrow">Before we go</p>
          <h1 className="h2">Prep</h1>
          <nav className="xm-jump" aria-label="On this page">
            <a href="#checklist">Booking checklist</a>
            <a href="#budget">Budget</a>
            <a href="#packing">Packing list</a>
          </nav>
        </div>
      </section>

      <section className="section light xm-check-sec" id="checklist">
        <div className="wrap">
          <div className="split-head xm-check-head">
            <div>
              <p className="eyebrow">Book it</p>
              <h2 className="h2">Booking checklist</h2>
            </div>
            <div className="xm-progress" aria-label={`${done} of ${allItems.length} done`}>
              <div className="xm-progress-num">
                {done}
                <span>/{allItems.length}</span>
              </div>
              <div className="xm-progress-bar">
                <span style={{ width: `${(done / allItems.length) * 100}%` }} />
              </div>
              <p className="xm-hint">Ticks save on this device only.</p>
            </div>
          </div>
          <div className="xm-check-grid">
            {checklist.map((g) => (
              <div key={g.group}>
                <p className="xm-check-group">{g.group}</p>
                <ul className="xm-checks">
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <label className={checks[it.id] ? "is-done" : undefined}>
                        <input type="checkbox" checked={!!checks[it.id]} onChange={() => toggleCheck(it.id)} />
                        <span>{it.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark xm-budget-sec" id="budget">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">What it costs</p>
            <h2 className="h2">
              {money(low)}–{money(high)} <span className="italic">for all seven.</span>
            </h2>
            <p className="lede">
              About {money(Math.round(low / 7 / 10) * 10)}–{money(Math.round(high / 7 / 10) * 10)} a person. That&apos;s roughly
              $2,500–6,000 more than a Denver-based trip at our usual prices, almost all in flights and the house. Worth it: it cuts 7–8 hours
              of winter mountain driving out of a 3-night trip and protects the Dec 22 deadline.
            </p>
          </div>
          <div className="xm-budget">
            <table>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Low</th>
                  <th scope="col">High</th>
                  <th scope="col" className="xm-budget-basis">Basis</th>
                </tr>
              </thead>
              <tbody>
                {budget.map((b) => (
                  <tr key={b.item}>
                    <th scope="row">{b.item}</th>
                    <td>{money(b.low)}</td>
                    <td>{money(b.high)}</td>
                    <td className="xm-budget-basis">{b.basis}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td>{money(low)}</td>
                  <td>{money(high)}</td>
                  <td className="xm-budget-basis" />
                </tr>
              </tfoot>
            </table>
            <p className="xm-hint">
              Activity math: hot springs = 3 adults × $35 + Debbie and Brad at the 65+ rate × $32 + 2 kids × $27; tubing = 5 riders × $35; gondola
              = 7 × $30; sleigh dinner $850–1,000 with tip. House and car are estimates until quoted.
            </p>
          </div>
        </div>
      </section>

      <section className="section dark xm-pack-sec" id="packing">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Pack for the cold</p>
            <h2 className="h2">
              Seven people, <span className="italic">one SUV.</span>
            </h2>
            <p className="lede">
              December in Steamboat is properly cold and snowy. Soft duffels and carry-on sizes fit the car best. Pick your name for your own
              list; ticks save on this device.
            </p>
          </div>
          <Packing me={me} />
        </div>
      </section>
    </>
  );
}
