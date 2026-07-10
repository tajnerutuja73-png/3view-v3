"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate, type BriefingNote } from "../../lib/data";

const CATEGORIES = ["All", "Market Note", "Macro", "Earnings", "Industry", "Opinion"] as const;
type CategoryFilter = typeof CATEGORIES[number];

const categoryColors: Record<string, string> = {
  "Market Note": "#C9A96E",
  "Macro":       "#7A9BB8",
  "Earnings":    "#4A9B6F",
  "Industry":    "#9B7AC9",
  "Opinion":     "#C8C4BC",
};

interface Props {
  notes: BriefingNote[];
}

export default function BriefingArchive({ notes }: Props) {
  const [active, setActive] = useState<CategoryFilter>("All");

  const visible = active === "All" ? notes : notes.filter((n) => n.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="border-b" style={{ background: "#131110", borderColor: "#2E2B27" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-8 py-4">
            <span className="label whitespace-nowrap">Filter:</span>
            {CATEGORIES.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
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
                  {cat}
                </button>
              );
            })}
            <span className="ml-auto label">{visible.length} / {notes.length}</span>
          </div>
        </div>
      </div>

      <section className="py-16" style={{ background: "#1A1815" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {notes.length === 0 ? (
            /* No content yet */
            <div className="py-32 flex flex-col items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8" aria-hidden="true">
                <polygon points="30,4 56,52 4,52" stroke="#2E2B27" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
                <line x1="30" y1="4" x2="22" y2="52" stroke="#2E2B27" strokeWidth="0.8" />
              </svg>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 300,
                color: "#3E3B37", letterSpacing: "-0.01em",
              }}>
                No briefing notes published yet.
              </p>
              <p className="label mt-3">Check back soon.</p>
            </div>
          ) : visible.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center" style={{ borderBottom: "1px solid #2E2B27" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 300,
                color: "#3E3B37", letterSpacing: "-0.01em",
              }}>
                No notes in this category yet.
              </p>
              <button
                onClick={() => setActive("All")}
                className="mt-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#C9A96E", background: "none", border: "none", cursor: "pointer",
                }}
              >
                Show all →
              </button>
            </div>
          ) : (
            <>
              {/* Featured cards (only when showing all or category has featured items) */}
              {active === "All" && visible.some((n) => n.featured) && (
                <div className="mb-16">
                  <span className="label-accent mb-8 block">Editor&apos;s Pick</span>
                  <div className="grid md:grid-cols-2 gap-6">
                    {visible.filter((n) => n.featured).map((note) => (
                      <Link key={note.slug} href={`/briefing/${note.slug}`} className="block">
                        <div className="research-card p-8 h-full">
                          <div className="flex items-center gap-3 mb-6">
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem",
                              letterSpacing: "0.18em", textTransform: "uppercase",
                              color: categoryColors[note.category] || "#C9A96E",
                            }}>{note.category}</span>
                            <span className="label">{formatDate(note.date)}</span>
                          </div>
                          <h2 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.625rem",
                            fontWeight: 400, color: "#F5F3EE", letterSpacing: "-0.015em",
                            lineHeight: 1.2, marginBottom: "12px",
                          }}>{note.title}</h2>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "#7A766F", lineHeight: 1.7 }}>
                            {note.excerpt}
                          </p>
                          <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid #2E2B27" }}>
                            <span className="label">{note.readTime} min read</span>
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                              letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E",
                            }}>Read →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Full list */}
              <div>
                <div className="flex items-center gap-4 pb-6 mb-2" style={{ borderBottom: "1px solid #2E2B27" }}>
                  <span className="label-accent">
                    {active === "All" ? "All Notes" : active}
                  </span>
                  <span className="label">— {visible.length} {visible.length === 1 ? "entry" : "entries"}</span>
                </div>
                {visible.map((note) => (
                  <Link key={note.slug} href={`/briefing/${note.slug}`} className="block">
                    <div className="briefing-row py-7 grid md:grid-cols-6 gap-6 items-start">
                      <div className="md:col-span-1">
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem",
                          letterSpacing: "0.16em", textTransform: "uppercase",
                          color: categoryColors[note.category] || "#C9A96E",
                          display: "block", marginBottom: "4px",
                        }}>{note.category}</span>
                        <span className="label">{formatDate(note.date)}</span>
                      </div>
                      <div className="md:col-span-4">
                        <h3 style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem",
                          fontWeight: 400, color: "#F5F3EE", letterSpacing: "-0.01em",
                          lineHeight: 1.3, marginBottom: "8px",
                        }}>{note.title}</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#7A766F", lineHeight: 1.65 }}>
                          {note.excerpt}
                        </p>
                      </div>
                      <div className="md:col-span-1 md:text-right">
                        <span className="label">{note.readTime} min</span>
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
