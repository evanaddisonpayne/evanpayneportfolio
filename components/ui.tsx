import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Case, Stat } from "@/lib/cases";
import { site } from "@/lib/site";

/**
 * "A   ·   B" strings. Each part stays on one line. When the line wraps, the part that
 * starts a new line carries its separator into a clipped gutter, so no line ever starts
 * or ends with a dot (Figma: "break at a separator and drop the dot at the line end").
 */
export function Eyebrow({ children, as: Tag = "p", className = "" }: { children: string; as?: "p" | "h2" | "h3" | "span"; className?: string }) {
  const parts = children.split(/\s+·\s+/);
  return (
    <Tag className={`eyebrow ${className}`.trim()}>
      <span className="ey-in">
        {parts.map((p, i) => (
          <span className="ey-seg" key={i}>
            <span className="ey-sep" aria-hidden>
              {"   ·   "}
            </span>
            <span className="ey-txt">{p}</span>
          </span>
        ))}
      </span>
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
    <article className={`case-card${featured ? " featured" : ""}`}>
      <Link href={href} className="cc-art" tabIndex={-1} aria-hidden>
        <img src={c.art} alt="" loading="lazy" width={featured ? 560 : 532} height={featured ? 572 : 260} />
      </Link>
      <div className="cc-body">
        <div className="cc-main">
          <div className="cc-meta">
            <p className="cc-label">
              <span className="cc-num">({c.n})</span>
              <span className="cc-client">
                <span className="ey-in">
                  {c.client.split(/\s+·\s+/).map((part, i) => (
                    <span className="ey-seg" key={i}>
                      <span className="ey-sep" aria-hidden>{"   ·   "}</span>
                      <span className="ey-txt">{part}</span>
                    </span>
                  ))}
                </span>
              </span>
            </p>
            {c.tag && <span className="cc-tag">{c.tag}</span>}
          </div>
          <h3 className="cc-title">
            <Link href={href}>{c.cardTitle}</Link>
          </h3>
          <p className="cc-line">{c.cardLine}</p>
          <Chips items={c.chips} />
        </div>
        <p className="cc-read">
          <Link href={href}>Read the case&nbsp;&nbsp;→</Link>
        </p>
      </div>
    </article>
  );
}

export function CaseRow({ c }: { c: Case }) {
  return (
    <Link href={`/work/${c.slug}`} className="case-row">
      <span className="cr-num">({c.n})</span>
      <span className="cr-who">{c.client.split(/\s+·\s+/)[0]}</span>
      <span className="cr-what">{c.cardTitle}</span>
      <span className="cr-go">Read the case&nbsp;&nbsp;→</span>
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
    <div className="portrait">
      <div className="inner">
        <img src="/art/portrait.svg" alt="Engraved line portrait of Evan in a cap and aviator sunglasses, smiling" width={768} height={1024} />
      </div>
    </div>
  );
}
