import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import XmProvider from "@/components/christmas2026/XmProvider";
import "./christmas.css";

// Private family site: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: { default: "Steamboat · Christmas 2026", template: "%s · Steamboat 2026" },
  description: "Private trip site for the family's Christmas trip to Steamboat Springs, Dec 18–21, 2026.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: "Steamboat · Christmas 2026",
    description: "Three nights, seven of us, one sleigh ride, and everyone home for Christmas.",
  },
};

export const viewport: Viewport = { themeColor: "#0c1f16" };

export default function ChristmasLayout({ children }: { children: ReactNode }) {
  return <XmProvider>{children}</XmProvider>;
}
