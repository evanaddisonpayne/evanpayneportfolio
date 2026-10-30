import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../tanyasbach/tanyasbach.css";
import "./virgincruise.css";

// Private group page: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: { default: "¡Al barco, Tanya! · The bach cruise", template: "%s · S.S. Tanya ’27" },
  description: "It's official: Tanya's bachelorette is a Virgin Voyages cruise to Turks and Caicos and Bimini, May 29 – Jun 3, 2027.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: "¡Al barco, Tanya! · The bach cruise",
    description: "Miami → Grand Turk → Bimini. May 29 – Jun 3, 2027. Wear red.",
  },
};

export const viewport: Viewport = { themeColor: "#fbf4ea" };

export default function VirginCruiseLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
