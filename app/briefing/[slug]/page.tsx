import { formatDate } from "../../../lib/data";
import { getAllBriefingNotes, getBriefingEntry, getBriefingSlugs, toBriefingNote } from "../../../lib/content";
import MdxBody from "../../components/MdxBody";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getBriefingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBriefingEntry(slug);
  if (!entry) return { title: "Note Not Found" };
  const note = toBriefingNote(entry);
  return { title: note.title, description: note.excerpt };
}

const categoryColors: Record<string, string> = {
  "Market Note": "#C9A96E",
  "Macro":       "#7A9BB8",
  "Earnings":    "#4A9B6F",
  "Industry":    "#9B7AC9",
  "Opinion":     "#C8C4BC",
};

export default async function BriefingNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getBriefingEntry(slug);
  if (!entry) notFound();
  const note = toBriefingNote(entry);

  const related = getAllBriefingNotes().filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "#2E2B27", background: "#111009" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center gap-3">
          <Link href="/briefing" className="label transition-colors duration-150">
            Briefing Room
          </Link>
          <span className="label">→</span>
          <span className="label-accent">{note.category}</span>
        </div>
      </div>

      {/* Article header */}
      <section className="py-20 border-b" style={{ background: "#111009", borderColor: "#2E2B27" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: categoryColors[note.category] || "#C9A96E",
            }}>{note.category}</span>
            <span className="label">{formatDate(note.date)}</span>
            <span className="label">{note.readTime} min read</span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 400,
            color: "#F5F3EE", letterSpacing: "-0.025em",
            lineHeight: 1.1, marginBottom: "20px",
          }}>{note.title}</h1>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1.125rem",
            lineHeight: 1.7, color: "#7A766F",
          }}>{note.excerpt}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16" style={{ background: "#1A1815" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-16">
            <article className="lg:col-span-2">
              <MdxBody content={entry.content} />

              <div className="mt-12 pt-12" style={{ borderTop: "1px solid #2E2B27" }}>
                <Link href="/briefing" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem",
                  letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E",
                }}>
                  ← Back to Briefing Room
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            {related.length > 0 && (
              <aside>
                <p className="label-accent mb-6">More from the Briefing Room</p>
                <div className="space-y-5">
                  {related.map((b) => (
                    <Link key={b.slug} href={`/briefing/${b.slug}`} className="block">
                      <div className="research-card p-5">
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
                          letterSpacing: "0.16em", textTransform: "uppercase",
                          color: categoryColors[b.category] || "#C9A96E",
                          display: "block", marginBottom: "6px",
                        }}>{b.category}</span>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "1.0625rem", color: "#F5F3EE", lineHeight: 1.3,
                        }}>{b.title}</p>
                        <p className="label mt-2">{formatDate(b.date)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
