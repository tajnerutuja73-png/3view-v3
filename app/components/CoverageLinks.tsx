"use client";

import Link from "next/link";
import { SECTORS } from "../../lib/data";

const sectorCounts: Record<string, string> = {
  "Technology & Software": "",
  "Financial Services": "",
  "Healthcare & Biotech": "",
  "Energy Transition": "",
  "Consumer & Retail": "Coming Soon",
};

export default function CoverageLinks() {
  return (
    <div className="space-y-0">
      {SECTORS.map((sector) => (
        <Link
          key={sector}
          href={`/research?sector=${encodeURIComponent(sector)}`}
          className="block"
        >
          <div
            className="flex items-center justify-between py-4 transition-all duration-150"
            style={{ borderBottom: "1px solid #2E2B27" }}
            onMouseEnter={(e) => {
              (e.currentTarget.querySelector(".sector-arrow") as HTMLElement).style.color = "#C9A96E";
              (e.currentTarget.querySelector(".sector-label") as HTMLElement).style.color = "#F5F3EE";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.querySelector(".sector-arrow") as HTMLElement).style.color = "#3E3B37";
              (e.currentTarget.querySelector(".sector-label") as HTMLElement).style.color = "#C8C4BC";
            }}
          >
            <span
              className="sector-label transition-colors duration-150"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "#C8C4BC",
              }}
            >
              {sector}
            </span>
            <div className="flex items-center gap-4">
              {sectorCounts[sector] && (
                <span className="label">{sectorCounts[sector]}</span>
              )}
              <span
                className="sector-arrow transition-colors duration-150"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#3E3B37",
                }}
              >
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
