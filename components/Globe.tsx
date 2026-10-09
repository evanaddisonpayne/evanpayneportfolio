"use client";

import { useEffect, useRef, useState } from "react";

/** Embeds the live travel globe (public/globe.html) and sizes the frame to its content. */
export default function Globe() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>(900);

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
        src="/globe.html"
        title="Where I’ve been: an interactive globe of flights and train trips from 2016 to 2026"
        loading="lazy"
        style={{ height }}
      />
    </div>
  );
}
