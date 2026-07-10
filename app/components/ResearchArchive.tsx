"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatDate, type ResearchReport, type ResearchType } from "../../lib/data";

const TYPE_FILTERS = ["All", "Initiation", "Deep Dive", "Update", "Sector"] as const;
type TypeFilter = typeof TYPE_FILTERS[number];

interface Props {
  reports: ResearchReport[];
}

export default function ResearchArchive({ reports }: Props) {
  const searchParams = useSearchParams();
  const [activeType, setActiveType] = useState<TypeFilter>("All");

  // Derive sector directly from URL param — no setState needed, avoids effect
  const sectorParam = searchParams.get("sector");
  const activeSector = sectorParam ? decodeURIComponent(sectorParam) : "All";

  const visible = reports.filter((r) => {
    const typeMatch = activeType === "All" || r.type === (activeType as ResearchType);
    const sectorMatch = activeSector === "All" || r.sector === activeSector;
    return typeMatch && sectorMatch;
  });

  const clearType = () => setActiveType("All");

  return (
    <>
      {/* Filter bar */}
      <div
        className="border-b sticky top-16 z-30"
        style={{ background: "#131110", borderColor: "#2E2B27" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-8 py-4 overflow-x-auto">
            <span className="label whitespace-nowrap">Type:</span>
            {TYPE_FILTERS.map((f) => {
              const isActive = f === activeType;
              return (
                <button
                  key={f}
                  onClick={() => setActiveType(f)}
                  className="whitespace-nowrap transition-colors duration-150"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "#C9A96E" : "#7A766F",
                    background: "none",
                    border: "none",
                    borderBottom: isActive ? "1px solid #C9A96E" : "1px solid transparent",
                    cursor: "pointer",
                    padding: "4px 0",
                    lineHeight: 1,
                  }}
                >
                  {f}
                </button>
              );
            })}

            {/* Active sector badge */}
            {activeSector !== "All" && (
              <span
                className="flex items-center gap-2 px-2 py-1"
                style={{
                  border: "1px solid #C9A96E44",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                }}
              >
                {activeSector}
                <Link
                  href="/research"
                  style={{ color: "#C9A96E", lineHeight: 1, textDecoration: "none" }}
                  aria-label="Clear sector filter"
                >
                  ×
                </Link>
              </span>
            )}

            {/* Live count */}
            <span
              className="ml-auto whitespace-nowrap"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: "#3E3B37",
              }}
            >
              {visible.length} / {reports.length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="py-12" style={{ background: "#1A1815" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {reports.length === 0 ? (
            /* No content yet */
            <div className="py-32 flex flex-col items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8" aria-hidden="true">
                <polygon points="30,4 56,52 4,52" stroke="#2E2B27" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
                <line x1="30" y1="4" x2="22" y2="52" stroke="#2E2B27" strokeWidth="0.8" />
              </svg>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#3E3B37",
                letterSpacing: "-0.01em",
              }}>
                No research reports published yet.
              </p>
              <p className="label mt-3">Check back soon.</p>
            </div>
          ) : visible.length === 0 ? (
            /* Filter produces no results */
            <div className="py-24 flex flex-col items-center justify-center" style={{ borderBottom: "1px solid #2E2B27" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 300,
                color: "#3E3B37",
                letterSpacing: "-0.01em",
              }}>
                No reports match the current filter.
              </p>
              <button
                onClick={clearType}
                className="mt-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear filters →
              </button>
            </div>
          ) : (
            <>
              {/* Column headers */}
              <div
                className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-2"
                style={{ borderBottom: "1px solid #2E2B27" }}
              >
                <div className="col-span-1"><span className="label">Ticker</span></div>
                <div className="col-span-4"><span className="label">Company / Title</span></div>
                <div className="col-span-2"><span className="label">Type / Sector</span></div>
                <div className="col-span-2"><span className="label">Price at Publication</span></div>
                <div className="col-span-2"><span className="label">Date</span></div>
                <div className="col-span-1"></div>
              </div>

              <div>
                {visible.map((report) => (
                  <Link key={report.slug} href={`/research/${report.slug}`} className="block">
                    <div className="briefing-row py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-1">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.875rem", color: "#F5F3EE" }}>
                          {report.ticker || "—"}
                        </span>
                      </div>
                      <div className="md:col-span-4">
                        {report.company && <p className="label mb-1">{report.company}</p>}
                        <p style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1.2rem", fontWeight: 400,
                          color: "#F5F3EE", letterSpacing: "-0.01em", lineHeight: 1.25,
                        }}>{report.title}</p>
                      </div>
                      <div className="md:col-span-2 hidden md:block">
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                          letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E",
                        }}>{report.type}</span>
                        <p className="label mt-1">{report.sector}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8125rem", color: "#C8C4BC" }}>
                          {report.priceAtPublication}
                        </span>
                      </div>
                      <div className="md:col-span-2 hidden md:block">
                        <span className="label">{formatDate(report.date)}</span>
                        <p className="label mt-1">{report.readTime} min</p>
                      </div>
                      <div className="md:col-span-1 hidden md:flex justify-end">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#7A766F" }}>→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
