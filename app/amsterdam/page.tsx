import type { Metadata } from "next";
import Trip from "@/components/amsterdam/Trip";
import "./amsterdam.css";

// Private group page: kept out of search engines (meta robots here, X-Robots-Tag in next.config.mjs).
export const metadata: Metadata = {
  title: "Amsterdam · Thanksgiving 2026",
  description: "Private trip plan for four friends in Amsterdam, Nov 24–29, 2026.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  // Nice link preview when it's dropped in the group chat.
  openGraph: {
    type: "website",
    title: "Amsterdam · Thanksgiving 2026",
    description: "The plan: five nights, two canal cruises, one rijsttafel, zero regrets.",
  },
};

export default function AmsterdamPage() {
  return <Trip />;
}
