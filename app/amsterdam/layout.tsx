import type { Metadata } from "next";
import type { ReactNode } from "react";
import AmsProvider from "@/components/amsterdam/AmsProvider";
import "./amsterdam.css";

// Private group site: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: { default: "Amsterdam · Thanksgiving 2026", template: "%s · Amsterdam 2026" },
  description: "Private trip site for four friends in Amsterdam, Nov 24–29, 2026.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: {
    type: "website",
    title: "Amsterdam · Thanksgiving 2026",
    description: "The plan: five nights, two canal cruises, one rijsttafel, zero regrets.",
  },
};

export default function AmsterdamLayout({ children }: { children: ReactNode }) {
  return <AmsProvider>{children}</AmsProvider>;
}
