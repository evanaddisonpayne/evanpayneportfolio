import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import TbProvider from "@/components/tanyasbach/TbProvider";
import "./tanyasbach.css";

// Private group site: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: { default: "¡Vamos, Tanya! · Bachelorette 2027", template: "%s · Tanya ’27" },
  description: "Private planning site for Tanya's bachelorette, May 2027. RSVP, rank the destinations, pick the weekend.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: "¡Vamos, Tanya! · Bachelorette 2027",
    description: "Four destinations, one bride, a long weekend in May. Come vote.",
  },
};

export const viewport: Viewport = { themeColor: "#fff8f0" };

export default function TanyasBachLayout({ children }: { children: ReactNode }) {
  return <TbProvider>{children}</TbProvider>;
}
