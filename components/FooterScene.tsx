"use client";

import { useEffect } from "react";
import { pickFooterScene } from "@/lib/footers";

// The head script picks a scene on every full page load. Each page renders its own <Footer>, so this
// mounts again on every in-site navigation and picks a new scene for the new page. The path check
// skips the first mount after a full load (and React's dev double-run), so the scene doesn't change
// under the reader on the page they just opened.
export default function FooterScene() {
  useEffect(() => {
    const w = window as Window & { __eapFooterPath?: string };
    if (w.__eapFooterPath === location.pathname) return;
    w.__eapFooterPath = location.pathname;
    pickFooterScene();
  }, []);
  return (
    <>
      <div className="ft-art" aria-hidden />
      <div className="ft-ground" aria-hidden />
    </>
  );
}
