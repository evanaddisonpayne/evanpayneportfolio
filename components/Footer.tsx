import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Eyebrow } from "./ui";

export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className={`footer${cta ? "" : " no-cta"}`}>
      <div className="canal" aria-hidden />
      <div className="wrap ft-stack">
        {cta && (
          <>
            <Eyebrow className="off">Let&apos;s talk</Eyebrow>
            <p className="ft-h">If you&apos;re tired of sounding like everyone else, pour something and tell me what&apos;s going&nbsp;on.</p>
            <div className="ft-btn off">
              <Link href="/contact" className="btn btn-signal">
                Let&apos;s talk
              </Link>
            </div>
          </>
        )}
        <div className="ft-bar off">
          <div className="ft-id">
            <span className="name">{site.name}</span>
            <span className="meta">
              {site.city}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;© {new Date().getFullYear()}
            </span>
          </div>
          <nav className="ft-links" aria-label="Footer">
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
