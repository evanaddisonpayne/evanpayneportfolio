"use client";

import { useState } from "react";

// The address is never in the HTML or in readable form in the bundle: it's stored as XOR'd char codes, reversed,
// and only decoded after a click. Scrapers that read page source or grep scripts for "@" find nothing.
const K = [23, 91, 7, 140, 55];
const D = [106, 52, 116, 25, 224, 110, 58, 122, 80, 204, 98, 53, 110, 86, 252, 41, 53, 120, 68, 229, 99, 63, 118, 25, 226, 102, 45, 114];
const decode = () => D.slice().reverse().map((n, i) => String.fromCharCode(n ^ K[i % K.length])).join("");

export default function EmailReveal() {
  const [addr, setAddr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!addr) {
    return (
      <button type="button" className="btn btn-ghost" onClick={() => setAddr(decode())}>
        Show email address
      </button>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(addr!);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="ct-email">
      <a href={`mailto:${addr}`} className="ct-addr">{addr}</a>
      <button type="button" className="ct-copy" onClick={copy} aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
