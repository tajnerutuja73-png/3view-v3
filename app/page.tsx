import Link from "next/link";
import { formatDate } from "../lib/data";
import { getAllResearchReports, getAllBriefingNotes } from "../lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThirdView Capital — Independent Equity Research",
};

function PrismDecoration() {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" aria-hidden="true">
      <polygon points="250,40 460,430 40,430" stroke="#C8C4BC" strokeWidth="0.6" fill="none" opacity="0.08" />
      <line x1="250" y1="40" x2="195" y2="430" stroke="#C8C4BC" strokeWidth="0.5" opacity="0.06" />
      <line x1="195" y1="430" x2="250" y2="310" stroke="#C8C4BC" strokeWidth="0.4" opacity="0.05" />
      <line x1="250" y1="310" x2="460" y2="430" stroke="#C8C4BC" strokeWidth="0.4" opacity="0.05" />
      <line x1="250" y1="40" x2="195" y2="430" stroke="#C9A96E" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

export default function HomePage() {
  const research = getAllResearchReports();
  const briefings = getAllBriefingNotes();
  const featuredResearch = research.filter((r) => r.featured).slice(0, 1);
  const latestResearch = research.slice(0, 4);
  const latestBriefings = briefings.slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#111009" }}>
        <PrismDecoration />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="label-accent">Independent Equity Research</span>
              <span className="accent-rule" />
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3.25rem, 7.5vw, 6.5rem)",
              fontWeight: 300, lineHeight: 1.0,
              letterSpacing: "-0.025em", color: "#F5F3EE",
            }}>
              The view<br />
              <em style={{ fontStyle: "italic", color: "#C8C4BC" }}>others miss.</em>
            </h1>

            <p className="mt-8 mb-12" style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem",
              lineHeight: 1.75, color: "#7A766F", maxWidth: "52ch",
            }}>
              Institutional-quality equity research focused on businesses, industries,
              and capital allocation. Deep dives, investment theses, and market
              commentary written for investors who do their own thinking.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/research"
                className="inline-flex items-center gap-3 px-7 py-3.5"
                style={{
                  background: "#C9A96E", color: "#111009",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
                }}>
                View Research Archive
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/briefing"
                className="inline-flex items-center gap-3 px-7 py-3.5 cta-outline"
                style={{
                  color: "#C8C4BC", fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
                }}>
                Briefing Room
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED RESEARCH (only shown when reports exist) ── */}
      {latestResearch.length > 0 && (
        <section className="py-24" style={{ background: "#1A1815" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-14">
              <div>
                <span className="label-accent">Featured Research</span>
                <h2 className="mt-3" style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "2.25rem", fontWeight: 400,
                  color: "#F5F3EE", letterSpacing: "-0.02em",
                }}>Recent Publications</h2>
              </div>
              <Link href="/research" className="hidden md:inline-flex nav-link" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A766F",
              }}>All Research →</Link>
            </div>

            {/* Featured card */}
            {featuredResearch[0] && (
              <Link href={`/research/${featuredResearch[0].slug}`} className="block mb-6">
                <div className="research-card p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="label-accent">{featuredResearch[0].type}</span>
                    <span className="label">{featuredResearch[0].sector}</span>
                    <span className="label">{formatDate(featuredResearch[0].date)}</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "#F5F3EE", fontWeight: 500 }}>
                          {featuredResearch[0].ticker}
                        </span>
                        <span className="label">{featuredResearch[0].company}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 400,
                        color: "#F5F3EE", letterSpacing: "-0.02em", lineHeight: 1.1,
                      }}>{featuredResearch[0].title}</h3>
                      <p className="mt-4" style={{
                        fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
                        color: "#7A766F", lineHeight: 1.7, maxWidth: "60ch",
                      }}>{featuredResearch[0].excerpt}</p>
                    </div>
                    <div className="flex flex-col justify-between gap-6 md:items-end md:text-right">
                      <div>
                        <p className="label mb-2">Thesis</p>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "0.9375rem", fontWeight: 400,
                          color: "#C8C4BC", lineHeight: 1.5,
                          maxWidth: "24ch", marginLeft: "auto",
                        }}>{featuredResearch[0].thesis}</p>
                      </div>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                        letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E",
                      }}>Read Report →</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Research grid */}
            {latestResearch.length > 1 && (
              <div className="grid md:grid-cols-3 gap-4">
                {latestResearch.slice(featuredResearch.length > 0 ? 1 : 0, featuredResearch.length > 0 ? 4 : 3).map((report) => (
                  <Link key={report.slug} href={`/research/${report.slug}`} className="block">
                    <div className="research-card p-6 h-full">
                      <div className="flex items-center justify-between mb-6">
                        <span className="label-accent">{report.type}</span>
                        <span className="label">{report.readTime} min</span>
                      </div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#C8C4BC" }}>
                        {report.ticker || "SECTOR"}
                      </p>
                      <h3 className="mt-2 mb-3" style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.375rem",
                        fontWeight: 400, color: "#F5F3EE", letterSpacing: "-0.01em", lineHeight: 1.25,
                      }}>{report.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#7A766F", lineHeight: 1.65 }}>
                        {report.excerpt.substring(0, 120)}…
                      </p>
                      <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid #2E2B27" }}>
                        <span className="label">{formatDate(report.date)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── BRIEFING ROOM PREVIEW (only shown when notes exist) ── */}
      {latestBriefings.length > 0 && (
        <section className="py-24" style={{ background: "#111009" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-14">
              <div>
                <span className="label-accent">Briefing Room</span>
                <h2 className="mt-3" style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.25rem",
                  fontWeight: 400, color: "#F5F3EE", letterSpacing: "-0.02em",
                }}>Market Notes &amp; Commentary</h2>
              </div>
              <Link href="/briefing" className="hidden md:block nav-link" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A766F",
              }}>All Notes →</Link>
            </div>
            <div>
              {latestBriefings.map((note) => (
                <Link key={note.slug} href={`/briefing/${note.slug}`} className="block">
                  <div className="briefing-row py-7 grid md:grid-cols-5 gap-4 items-start">
                    <div className="md:col-span-1">
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        color: "#C9A96E", display: "block", marginBottom: "4px",
                      }}>{note.category}</span>
                      <span className="label">{formatDate(note.date)}</span>
                    </div>
                    <div className="md:col-span-3">
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
                      <span className="label">{note.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT TEASER ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#1A1815" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 60% at 80% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="label-accent">About ThirdView</span>
            <h2 className="mt-4 mb-6" style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 300,
              color: "#F5F3EE", letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>
              Outside the consensus.<br />
              <em style={{ color: "#C8C4BC" }}>Not against it.</em>
            </h2>
            <p className="mb-8" style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem",
              lineHeight: 1.75, color: "#7A766F",
            }}>
              ThirdView Capital was founded on the conviction that rigorous independent
              research — free from institutional conflicts — serves investors better than
              consensus-driven coverage. We work with sophisticated investors across India
              who value depth over volume.
            </p>
            <Link href="/about" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
              letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E",
            }}>Our Approach →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
