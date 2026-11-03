import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import TcShell from "@/components/turkscaicos/TcShell";
import "../tanyasbach/tanyasbach.css";
import "./turkscaicos.css";

// Private group page: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: { default: "Tanya takes Turks · May 27–31, 2027", template: "%s · Tanya × Turks ’27" },
  description: "If Turks and Caicos wins: four nights in a villa on Providenciales, a private catamaran, Scarlet Night and the Fish Fry. May 27–31, 2027.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: "Tanya takes Turks",
    description: "Provo, May 27–31, 2027. One villa, one boat, sixteen of us. Wear red Friday.",
  },
};

export const viewport: Viewport = { themeColor: "#fbf4ea" };

export default function TurksCaicosLayout({ children }: { children: ReactNode }) {
  return <TcShell>{children}</TcShell>;
}
