"use client";

import { useEffect, useState } from "react";

export default function ShareClient({ label, copy, copied: copiedLabel }: { label: string; copy: string; copied: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  return (
    <div className="share">
      <span className="caps">{label}</span>
      <a
        href={url ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url || window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked */
          }
        }}
      >
        {copied ? copiedLabel : copy}
      </button>
    </div>
  );
}
