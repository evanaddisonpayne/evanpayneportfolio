"use client";

import { useEffect, useRef, useState } from "react";

/** Embeds the live travel map (public/travel-map.html, a flat Mercator chart) and sizes the frame to its content. */
export default function Globe() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return;
      const h = (e.data as { globeHeight?: number })?.globeHeight;
      if (typeof h === "number" && h > 200) setHeight(Math.ceil(h));
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="globe-panel">
      <iframe
        ref={ref}
        src="/travel-map.html"
        title="Where I’ve been: an interactive map of flights and train trips from 2016 to 2026"
        loading="lazy"
        style={height ? { height, aspectRatio: "auto" } : undefined}
      />
    </div>
  );
}
