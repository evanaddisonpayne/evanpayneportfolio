import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Case, Stat } from "@/lib/cases";
import { site } from "@/lib/site";

/** "A   ·   B" strings render with even dot spacing. */
export function Eyebrow({ children, as: Tag = "p" }: { children: string; as?: "p" | "h2" | "h3" | "span" }) {
  const parts = children.split(/\s+·\s+/);
  return (
    <Tag className="eyebrow">
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="dot" aria-hidden>·</span>}
          {p}
        </span>
      ))}
    </Tag>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <p className="chips">
      {items.map((t, i) => (
        <span key={t} style={{ display: "contents" }}>
          {i > 0 && <span className="pipe" aria-hidden>|</span>}
          <span>{t}</span>
        </span>
      ))}
    </p>
  );
}

export function Tape({ position }: { position: "top" | "bottom" }) {
  const unit = `EVAN ADDISON PAYNE   ·   ${site.coords}   ·   `;
  return (
    <div className={`tape tape-${position}`} aria-hidden>
      {unit.repeat(14)}
    </div>
  );
}

export function Pattern({ kind }: { kind: "passport" | "sunrise" | "rays" }) {
  return <div className={`pattern pattern-${kind}`} aria-hidden />;
}

export function Stats({ stats, cols = 3 }: { stats: Stat[]; cols?: number }) {
  return (
    <div className="stats" style={{ "--cols": cols, "--cols-md": Math.min(cols, 2) } as CSSProperties}>
      {stats.map((s) => (
        <div className="stat" key={s.num + s.label}>
          <p className="num">{s.num}</p>
          <p className="label">{s.label}</p>
          {s.org && <p className="org">{s.org}</p>}
        </div>
      ))}
    </div>
  );
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="h2">{title}</h2>
      {children}
    </div>
  );
}

export function CaseCard({ c, featured = false }: { c: Case; featured?: boolean }) {
  const href = `/work/${c.slug}`;
  return (
    <article className={`card case-card${featured ? " featured" : ""}`}>
      <Link href={href} className="art" tabIndex={-1} aria-hidden>
        <img src={c.art} alt="" loading="lazy" width={featured ? 560 : 532} height={featured ? 572 : 260} />
      </Link>
      <div className="content">
        <div className="meta">
          <div className="meta-left">
            <span className="numeral">({c.n})</span>
            <Eyebrow as="span">{c.client}</Eyebrow>
          </div>
          {c.tag && <span className="tag">{c.tag}</span>}
        </div>
        <h3 className="title">
          <Link href={href}>{c.cardTitle}</Link>
        </h3>
        <p className="body">{c.cardLine}</p>
        <Chips items={c.chips} />
        <Link href={href} className="link-arrow read">
          Read the case <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export function CaseRow({ c }: { c: Case }) {
  return (
    <Link href={`/work/${c.slug}`} className="case-row">
      <span className="numeral">({c.n})</span>
      <span className="who">{c.client}</span>
      <span className="what">{c.cardTitle}</span>
      <span className="go link-arrow">
        Read the case <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

export function Tarot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`tarot ${className}`}>
      <img src={src} alt={alt} width={432} height={720} loading="lazy" />
    </div>
  );
}

export function Portrait() {
  return (
    <div className="frame portrait">
      <div className="inner">
        <img src="/art/portrait.svg" alt="Engraved line portrait of Evan in a cap and aviator sunglasses, smiling" width={768} height={1024} />
      </div>
    </div>
  );
}
