import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import SkipLink from "@/components/SkipLink";
import { en } from "@/content/en";
import { footerSceneScript } from "@/lib/footers";
import { chromeLabels } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: en.meta.defaultTitle,
    template: "%s · Evan Addison Payne",
  },
  description: en.meta.description,
  icons: { icon: "/art/seal.webp" },
  openGraph: { type: "website", siteName: "Evan Addison Payne" },
};

export const viewport: Viewport = { themeColor: "#2b0b10" };

// French and German pages live under /fr and /de and share this root layout, so the server renders lang="en"
// and this sets the right language before first paint. Each locale layout also wraps its content in lang="fr|de".
const langScript = `(function(){var m=location.pathname.match(/^\\/(fr|de)(?=\\/|$)/);if(m)document.documentElement.lang=m[1];})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const labels = chromeLabels();
  return (
    <html lang="en" data-footer="canal" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        {/* picks the footer skyline before first paint (see lib/footers.ts) */}
        <script dangerouslySetInnerHTML={{ __html: footerSceneScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@500;700&family=DM+Sans:ital,opsz,wght@0,14,400;0,14,500;1,14,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&display=swap"
        />
      </head>
      <body>
        <SkipLink labels={labels} />
        <Nav labels={labels} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
