"use client";

import { useState } from "react";
import { cases } from "@/lib/cases";
import { CaseCard } from "./ui";

const filters = [
  { key: "all", label: "All" },
  { key: "positioning", label: "Positioning" },
  { key: "growth", label: "Growth" },
  { key: "campaigns", label: "Campaigns & content" },
] as const;

export default function WorkGrid() {
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");
  const shown = cases.filter((c) => active === "all" || c.category === active);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter work">
        {filters.map((f, i) => (
          <span key={f.key} style={{ display: "contents" }}>
            {i > 0 && <span className="pipe" aria-hidden>|</span>}
            <button aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
              {f.label}
            </button>
          </span>
        ))}
      </div>
      <div className="work-grid" style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
        {shown.map((c) => (
          <div key={c.slug} className={c.category === "featured" ? "featured" : undefined}>
            <CaseCard c={c} featured={c.category === "featured"} />
          </div>
        ))}
      </div>
    </>
  );
}
