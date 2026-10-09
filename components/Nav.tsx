"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, roman, site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const brand = (
    <Link href="/" className="brand" aria-label={`${site.name}, home`}>
      <img src="/art/seal.webp" alt="" width={44} height={44} />
      <span>
        <span className="brand-name">{site.name}</span>
        <span className="brand-coords">{site.coords}</span>
      </span>
    </Link>
  );

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        {brand}
        <nav className="nav-links" aria-label="Main">
          {navLinks.map((l, i) => (
            <span key={l.href} style={{ display: "contents" }}>
              {i > 0 && <span className="diamond" aria-hidden />}
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            </span>
          ))}
          <Link href="/contact" className="btn btn-outline-signal nav-cta">
            Let&apos;s talk
          </Link>
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
          MENU
        </button>
      </div>

      <div id="site-menu" className="menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="nav">
          <div className="wrap nav-inner">
            {brand}
            <button className="menu-btn" onClick={() => setOpen(false)}>
              CLOSE
            </button>
          </div>
        </div>
        <nav className="menu-links" aria-label="Menu">
          {navLinks.map((l, i) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
              <span>({roman[i]})</span>
            </Link>
          ))}
        </nav>
        <div className="menu-cta">
          <Link href="/contact" className="btn btn-outline-signal">
            Let&apos;s talk
          </Link>
          <span className="brand-coords">{site.coords}</span>
        </div>
      </div>
    </header>
  );
}
