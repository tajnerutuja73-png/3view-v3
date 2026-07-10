import { formatDate } from "../../../lib/data";
import { getResearchEntry, getResearchSlugs, getAllResearchReports, toResearchReport } from "../../../lib/content";
import MdxBody from "../../components/MdxBody";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getResearchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearchEntry(slug);
  if (!entry) return { title: "Report Not Found" };
  const report = toResearchReport(entry);
  return {
    title: `${report.ticker ? report.ticker + " — " : ""}${report.title}`,
    description: report.subtitle,
  };
}

function PrismMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="30,4 56,52 4,52" stroke="#C8C4BC" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <line x1="30" y1="4" x2="22" y2="52" stroke="#C8C4BC" strokeWidth="0.8" opacity="0.6" />
      <line x1="22" y1="52" x2="30" y2="38" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7" />
      <line x1="30" y1="38" x2="56" y2="52" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7" />
    </svg>
  );
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getResearchEntry(slug);
  if (!entry) notFound();
  const report = toResearchReport(entry);

  const related = getAllResearchReports()
    .filter((r) => r.slug !== slug && r.sector === report.sector)
    .slice(0, 2);

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "#2E2B27", background: "#111009" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center gap-3">
          <Link href="/research" className="label transition-colors duration-150 hover:text-silver">
            Research Archive
          </Link>
          <span className="label">→</span>
          <span className="label-accent">{report.type}</span>
        </div>
      </div>

      {/* Report header */}
      <section className="py-16 border-b" style={{ background: "#111009", borderColor: "#2E2B27" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="label-accent">{report.type}</span>
                <span className="label">{report.sector}</span>
                <span className="label">{formatDate(report.date)}</span>
                <span className="label">{report.readTime} min read</span>
              </div>

              {/* Ticker + company */}
              {report.ticker && (
                <div className="flex items-center gap-3 mb-4">
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.1rem", color: "#F5F3EE",
                  }}>
                    {report.exchange ? `${report.exchange}: ${report.ticker}` : report.ticker}
                  </span>
                  <span className="label">{report.company}</span>
                </div>
              )}

              {/* Title */}
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 400,
                color: "#F5F3EE", letterSpacing: "-0.025em",
                lineHeight: 1.05, marginBottom: "20px",
              }}>
                {report.title}
              </h1>

              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem",
                lineHeight: 1.7, color: "#7A766F", maxWidth: "62ch",
              }}>
                {report.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {report.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1" style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "#7A766F", border: "1px solid #2E2B27",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* PDF + MODEL download buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={report.pdfUrl || "#"}
                  aria-disabled={!report.pdfUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200"
                  style={{
                    border: "1px solid #2E2B27",
                    color: report.pdfUrl ? "#C8C4BC" : "#3E3B37",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem", letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: report.pdfUrl ? "pointer" : "default",
                    pointerEvents: report.pdfUrl ? "auto" : "none",
                  }}
                  {...(report.pdfUrl ? { download: true } : {})}
                >
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9v2a1 1 0 001 1h7a1 1 0 001-1V9M5.5 1v7M3 6l2.5 2.5L8 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  PDF
                </a>
                <a
                  href={report.modelUrl || "#"}
                  aria-disabled={!report.modelUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 transition-all duration-200"
                  style={{
                    border: "1px solid #2E2B27",
                    color: report.modelUrl ? "#C8C4BC" : "#3E3B37",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem", letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: report.modelUrl ? "pointer" : "default",
                    pointerEvents: report.modelUrl ? "auto" : "none",
                  }}
                  {...(report.modelUrl ? { download: true } : {})}
                >
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9v2a1 1 0 001 1h7a1 1 0 001-1V9M5.5 1v7M3 6l2.5 2.5L8 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Model
                </a>
              </div>
            </div>

            {/* Research info sidebar — replaces recommendation box */}
            <div
              className="p-6 self-start"
              style={{ border: "1px solid #2E2B27", background: "#13110E" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <PrismMark size={16} />
                <span className="label">Research Summary</span>
              </div>

              <div className="space-y-6">
                {/* Thesis */}
                <div>
                  <p className="label mb-2">Thesis</p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.0625rem", fontWeight: 400,
                    color: "#F5F3EE", lineHeight: 1.5,
                  }}>
                    {report.thesis}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid #2E2B27", paddingTop: "1.5rem" }}>
                  {/* Sector */}
                  <div className="mb-5">
                    <p className="label mb-2">Sector</p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem", color: "#C8C4BC",
                    }}>
                      {report.sector}
                    </p>
                  </div>

                  {/* Price at publication */}
                  <div className="mb-5">
                    <p className="label mb-2">Price at Publication</p>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1.125rem", color: "#F5F3EE",
                    }}>
                      {report.priceAtPublication}
                    </p>
                  </div>

                  {/* Publication date */}
                  <div>
                    <p className="label mb-2">Publication Date</p>
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.8125rem", color: "#C8C4BC",
                    }}>
                      {formatDate(report.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16" style={{ background: "#1A1815" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            <article className="lg:col-span-2">
              <MdxBody content={entry.content} />

              {/* Disclosure */}
              <div className="mt-16 p-6" style={{ border: "1px solid #2E2B27", background: "#131110" }}>
                <p className="label mb-2">Disclosure</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
                  color: "#3E3B37", lineHeight: 1.65,
                }}>
                  This report is for informational purposes only and does not constitute
                  investment advice. ThirdView Capital does not manage client funds and
                  does not hold positions in the securities discussed. All figures are as
                  of the publication date.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {related.length > 0 && (
                <div>
                  <p className="label-accent mb-4">Related Research</p>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/research/${r.slug}`} className="block">
                        <div className="research-card p-4">
                          <span className="label-accent" style={{ fontSize: "0.55rem" }}>{r.type}</span>
                          <p className="mt-1" style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.0625rem", color: "#F5F3EE", lineHeight: 1.3,
                          }}>
                            {r.title}
                          </p>
                          <p className="label mt-2">{formatDate(r.date)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="label-accent mb-4">Coverage Universe</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem",
                  color: "#7A766F", lineHeight: 1.65,
                }}>
                  ThirdView Capital publishes institutional research across technology,
                  financials, healthcare, and energy transition.
                </p>
                <Link href="/research" className="mt-4 inline-block" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                  letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A96E",
                }}>
                  View Archive →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
