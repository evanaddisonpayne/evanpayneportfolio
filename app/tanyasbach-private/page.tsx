import Link from "next/link";
import { SECTIONS, type Tone } from "@/lib/tanyasbach-private";

const TONE_CLASS: Record<Tone, string> = {
  paper: "light",
  blush: "light tb-bg-blush",
  sky: "light tb-bg-sky",
  sun: "light tb-bg-sun",
  sea: "light tb-bg-sea",
  pink: "orange",
};

export default function TanyasBachPrivate() {
  return (
    <>
      <header className="tb-nav">
        <div className="wrap tb-nav-inner">
          <Link href="/tanyasbach-private" className="tb-nav-brand">
            <span className="tb-nav-x" aria-hidden>
              ✿ ✿ ✿
            </span>
            Tanya <em>’27</em>
          </Link>
        </div>
      </header>

      <section className="section light tb-pagehead tbp-head">
        <div className="wrap">
          <p className="eyebrow">
            Planners<span className="dot" aria-hidden>·</span>Evan + Tanya
          </p>
          <h1 className="h1">
            Just the <span className="italic">two of us.</span>
          </h1>
          <p className="lede">
            The behind-the-scenes page for the bachelorette: the money, the pairings and the surprises. It isn&apos;t linked from the group
            pages, so only people with the link will find it.
          </p>
          {SECTIONS.length > 1 && (
            <nav className="tbp-toc" aria-label="On this page">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.title}
                </a>
              ))}
            </nav>
          )}
          <div className="tb-hint tbp-links">
            Group site: <Link href="/tanyasbach">/tanyasbach</Link>
          </div>
        </div>
      </section>

      {SECTIONS.length === 0 ? (
        <section className="section light tb-bg-sky">
          <div className="wrap">
            <p className="lede">No sections yet. Ask Claude to add one.</p>
          </div>
        </section>
      ) : (
        SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className={`section tbp-section ${TONE_CLASS[s.tone ?? "paper"]}`}>
            <div className="wrap">
              <div className="section-head">
                {(s.eyebrow || s.updated) && (
                  <p className="eyebrow">
                    {s.eyebrow}
                    {s.eyebrow && s.updated && (
                      <span className="dot" aria-hidden>
                        ·
                      </span>
                    )}
                    {s.updated && <span className="tbp-updated">Updated {s.updated}</span>}
                  </p>
                )}
                <h2 className="h2">{s.title}</h2>
                {s.intro && <p className="lede">{s.intro}</p>}
              </div>
              {s.body && <div className="tbp-body">{s.body}</div>}
            </div>
          </section>
        ))
      )}

      <footer className="tbp-foot">
        <div className="wrap">
          <p className="tb-hint">For Evan and Tanya. Anyone with this link can open it, so please don&apos;t forward it.</p>
        </div>
      </footer>
    </>
  );
}
