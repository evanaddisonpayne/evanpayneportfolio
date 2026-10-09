import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: "Evan Addison Payne · Brand & Growth Strategy",
    template: "%s · Evan Addison Payne",
  },
  description:
    "Evan Addison Payne is Director of Brand & Growth Strategy at The Starr Conspiracy in Chicago. He helps Work Tech, HR tech, and SaaS companies stop sounding like their competitors.",
  icons: { icon: "/art/seal.webp" },
  openGraph: { type: "website", siteName: "Evan Addison Payne" },
};

export const viewport: Viewport = { themeColor: "#2b0b10" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@500;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="sr-only">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
