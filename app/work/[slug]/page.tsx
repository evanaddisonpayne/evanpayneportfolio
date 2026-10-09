import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Eyebrow, Pattern, Stats } from "@/components/ui";
import { cases, getCase, type Move } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  return c ? { title: c.cardTitle.replace(/[.,]$/, ""), description: c.cardLine } : {};
}

function Moves({ moves }: { moves: Move[] }) {
  return (
    <div className="cards c3">
      {moves.map((m, i) => (
        <article className="card move-card" key={m.title}>
          <p className="card-num">({["I", "II", "III"][i]})</p>
          <h3 className="card-title">{m.title}</h3>
          <p className="body">{m.body}</p>
        </article>
      ))}
    </div>
  );
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <>
      <section className="dark cs-hero" style={{ position: "relative", overflow: "hidden" }}>
        <div className="wrap">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="h1" style={{ marginTop: 24, maxWidth: 1050 }}>{c.cardTitle}</h1>
          <dl className="cs-meta">
            {c.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value.replace(/   ·   /g, "\n")}</dd>
              </div>
            ))}
          </dl>
          <div className="cs-scene">
            <div className="frame">
              <img src={c.scene} alt="" width={2400} height={840} />
            </div>
          </div>
        </div>
      </section>

      {c.situation && (
        <section className="section light">
          <Pattern kind="passport" />
          <div className="wrap">
            <Eyebrow>{c.situation.label ? c.situation.label : "(I)   The situation"}</Eyebrow>
            <div className="cs-prose" style={{ marginTop: 20 }}>
              <h2 className="h2">{c.situation.title}</h2>
              <p className="lede">{c.situation.body}</p>
            </div>
          </div>
        </section>
      )}

      {c.moves && (
        <section className="section dark">
          <div className="wrap">
            <div className="section-head">
              <Eyebrow>(II)   What I did</Eyebrow>
              <h2 className="h2">{c.movesTitle}</h2>
            </div>
            <Moves moves={c.moves} />
          </div>
        </section>
      )}

      {c.stats && (
        <section className="section light">
          <Pattern kind="passport" />
          <div className="wrap">
            <div className="section-head">
              <Eyebrow>(III)   What came of it</Eyebrow>
              <h2 className="h2">{c.resultsTitle}</h2>
            </div>
            <Stats stats={c.stats} cols={c.stats.length} />
            {c.note && <p className="cs-note">{c.note}</p>}
          </div>
        </section>
      )}

      {c.chapters?.map((ch) => (
        <div key={ch.eyebrow}>
          <section className="section dark">
            <div className="wrap">
              <div className="chapter-head">
                <Eyebrow>{ch.eyebrow}</Eyebrow>
                <h2 className="h2" style={{ maxWidth: 980 }}>{ch.title}</h2>
                <p className="role-label">{ch.role}</p>
              </div>
              <Moves moves={ch.moves} />
            </div>
          </section>
          <section className="section light" style={{ paddingBlock: "calc(var(--section-y) * .75)" }}>
            <Pattern kind="passport" />
            <div className="wrap">
              <Stats stats={ch.stats} cols={3} />
              {ch.note && <p className="cs-note">{ch.note}</p>}
            </div>
          </section>
        </div>
      ))}

      <section className="dark">
        <div className="wrap">
          <Link href={`/work/${c.next.slug}`} className="next-case">
            <Eyebrow>Next case</Eyebrow>
            <p className="what">{c.next.title}</p>
            <p className="sub">{c.next.sub}</p>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
