"use client";

import { useEffect, useState } from "react";

export default function Share() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  return (
    <div className="share">
      <span className="caps">Share</span>
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
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
