import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../tanyasbach/tanyasbach.css";
import "./tanyasbach-private.css";

// Planners page (Evan + Tanya). Open link, not password-protected; kept out of search engines.
export const metadata: Metadata = {
  title: { default: "Planners · Tanya ’27", template: "%s · Tanya ’27" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "no-referrer",
};

export const viewport: Viewport = { themeColor: "#fff8f0" };

export default function TanyasBachPrivateLayout({ children }: { children: ReactNode }) {
  return <div className="tb tbp">{children}</div>;
}
