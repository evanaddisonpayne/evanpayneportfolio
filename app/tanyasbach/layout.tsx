import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ENVELOPE_GATE } from "@/components/tanyasbach/envelope-gate";
import TbProvider from "@/components/tanyasbach/TbProvider";
import "./tanyasbach.css";

// Private group site: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: { default: "¡Vamos, Tanya! · Bachelorette 2027", template: "%s · Tanya ’27" },
  description: "Private planning site for Tanya's bachelorette, May 2027. RSVP and cast the final vote: villa or cruise.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: "¡Vamos, Tanya! · Bachelorette 2027",
    description: "Villa or cruise? One bride, one final vote. Come vote.",
  },
};

export const viewport: Viewport = { themeColor: "#fff8f0" };

export default function TanyasBachLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* First-visit envelope: hide it before paint for anyone who has already opened it. */}
      <script dangerouslySetInnerHTML={{ __html: ENVELOPE_GATE }} />
      <TbProvider>{children}</TbProvider>
    </>
  );
}
