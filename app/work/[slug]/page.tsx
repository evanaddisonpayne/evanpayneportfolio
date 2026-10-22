import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern } from "@/components/ui";
import { cases, getCase, type Move, type Stat } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  return c ? { title: c.cardTitle.replace(/[.,]$/, ""), description: c.cardLine } : {};
}

/* Figma "Move" card: 1.2 rule + 0.6 inner rule, numeral, title, body */
function Moves({ moves }: { moves: Move[] }) {
  return (
    <div className="off cs-cards">
      {moves.map((m, i) => (
        <article className="cs-card" key={m.title}>
          <p className="cs-card-num">({["I", "II", "III"][i]})</p>
          <h3 className="cs-card-title">{m.title}</h3>
          <p className="cs-card-body">{m.body}</p>
        </article>
      ))}
    </div>
  );
}

/* Figma "Columns": rule, number, label */
function Numbers({ stats, note }: { stats: Stat[]; note?: string }) {
  return (
    <>
      <div className={`off cs-stats n${stats.length}`} style={{ "--n": stats.length } as CSSProperties}>
        {stats.map((s) => (
          <div className="cs-stat" key={s.num + s.label}>
            <p className={`cs-num${s.small ? " small" : ""}`}>{s.num}</p>
            <p className="cs-label">{s.label}</p>
          </div>
        ))}
      </div>
      {note && <p className="off cs-note">{note}</p>}
    </>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();
  const next = getCase(c.next.slug);

  return (
    <>
      <div className={`cs-page cs-${c.slug}`}>
      <section className="dark cs-hero">
        <div className="wrap cs-stack cs-hstack">
          <div className="off"><Eyebrow className="cs-hey">{c.eyebrow}</Eyebrow></div>
          <h1 className="cs-h1">{c.cardTitle}</h1>
          <dl className="off cs-meta">
            {c.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          <div className="off cs-scene">
            <div className="cs-frame">
              <img src={c.scene} alt="" width={2400} height={840} />
            </div>
          </div>
        </div>
      </section>

      {c.situation && (
        <section className="cs-sec cs-sit light">
          <Pattern kind="passport" />
          <div className="wrap cs-stack">
            <div className="off"><Eyebrow>{c.situation.label ? c.situation.label : "(I)   The situation"}</Eyebrow></div>
            <div className="cs-sit-row">
              <h2 className="cs-sit-h">{c.situation.title}</h2>
              <p className="cs-sit-body">{c.situation.body}</p>
            </div>
          </div>
        </section>
      )}

      {c.moves && (
        <section className="cs-sec cs-did dark">
          <div className="wrap cs-stack">
            <div className="off"><Eyebrow>(II)   What I did</Eyebrow></div>
            <h2 className="cs-h2">{c.movesTitle}</h2>
            <Moves moves={c.moves} />
          </div>
        </section>
      )}

      {c.stats && (
        <section className="cs-sec cs-res orange">
          <div className="wrap cs-stack cs-rstack">
            <div className="off"><Eyebrow>(III)   What came of it</Eyebrow></div>
            <h2 className="cs-h2 cs-res-h">{c.resultsTitle}</h2>
            <Numbers stats={c.stats} note={c.note} />
          </div>
        </section>
      )}

      {c.chapters?.map((ch, i) => (
        <div key={ch.eyebrow}>
          <section className="cs-sec cs-chap dark">
            <div className="wrap cs-stack">
              <div className="off"><Eyebrow>{ch.eyebrow}</Eyebrow></div>
              <h2 className="cs-chap-h">{ch.title}</h2>
              <p className="off cs-role">{ch.role}</p>
              <Moves moves={ch.moves} />
            </div>
          </section>
          <section className={`cs-sec cs-chres ${i % 2 ? "light" : "orange"}`}>
            {i % 2 ? <Pattern kind="passport" /> : null}
            <div className="wrap cs-stack cs-rstack">
              <Numbers stats={ch.stats} note={ch.note} />
            </div>
          </section>
        </div>
      ))}

      <section className="dark cs-next">
        <div className="wrap cs-stack">
          <Link href={`/work/${c.next.slug}`} className="cs-next-link">
            <span className="off"><Eyebrow as="span" className="cs-next-ey">Next case</Eyebrow></span>
            <span className="cs-next-h">{next ? `(${next.n})   ` : ""}{c.next.title}</span>
            <span className="off cs-next-sub">{c.next.sub}</span>
          </Link>
        </div>
      </section>
      </div>

      <Footer />
    </>
  );
}
