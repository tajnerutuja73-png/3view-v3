// ─────────────────────────────────────────────────────────────────────────────
// ThirdView Capital — Content Data Layer
//
// HOW TO ADD CONTENT:
//
// 1. New research report → add an object to the `research` array below.
//    Required fields: slug, ticker, company, sector, type, date, title,
//    subtitle, excerpt, readTime, thesis, priceAtPublication, tags.
//    Optional: featured (boolean), pdfUrl (string), modelUrl (string).
//
// 2. New briefing note → add an object to the `briefings` array below.
//    Required fields: slug, category, date, title, excerpt, readTime.
//    Optional: featured (boolean).
//
// 3. PDF attachment → set pdfUrl on the report (e.g. "/downloads/report.pdf").
//
// 4. Excel model attachment → set modelUrl on the report.
//
// 5. Sector classification → set the `sector` field to one of the values
//    in SECTORS below, or add a new sector string to that array.
//
// 6. Publication date → set the `date` field as "YYYY-MM-DD".
//
// All pages (homepage, archive, briefing room, coverage) update automatically.
// ─────────────────────────────────────────────────────────────────────────────

export type ResearchType = "Initiation" | "Deep Dive" | "Update" | "Sector";

export const SECTORS = [
  "Technology & Software",
  "Financial Services",
  "Healthcare & Biotech",
  "Energy Transition",
  "Consumer & Retail",
  "Metals & Mining — Recycling",
] as const;

export type Sector = typeof SECTORS[number];

export interface ResearchReport {
  slug: string;
  ticker: string;
  company: string;
  exchange?: string;
  sector: Sector | string;
  type: ResearchType;
  date: string;            // "YYYY-MM-DD"
  title: string;
  subtitle: string;
  excerpt: string;
  thesis: string;          // one-line thesis for the sidebar
  priceAtPublication: string; // e.g. "$27.40" — price on publication date, no target
  readTime: number;
  featured?: boolean;
  tags: string[];
  pdfUrl?: string;         // e.g. "/downloads/pltr-initiation.pdf"
  modelUrl?: string;       // e.g. "/downloads/pltr-model.xlsx"
}

export type BriefingCategory = "Market Note" | "Macro" | "Earnings" | "Industry" | "Opinion";

export interface BriefingNote {
  slug: string;
  category: BriefingCategory | string;
  date: string;
  title: string;
  excerpt: string;
  readTime: number;
  featured?: boolean;
}

// ─── RESEARCH REPORTS ────────────────────────────────────────────────────────
// Add new reports here. The homepage, archive, and coverage pages update
// automatically. Set featured: true to surface a report on the homepage.

export const research: ResearchReport[] = [
  // Example (remove when adding real content):
  // {
  //   slug: "company-name-report-type-year",
  //   ticker: "TICK",
  //   company: "Company Name",
  //   sector: "Technology & Software",
  //   type: "Initiation",
  //   date: "2025-01-15",
  //   title: "Report Title",
  //   subtitle: "A concise subtitle describing the core argument",
  //   excerpt: "Opening paragraph or summary shown in cards and archive listings.",
  //   thesis: "One-sentence summary of the investment thesis for the sidebar.",
  //   priceAtPublication: "$100.00",
  //   readTime: 20,
  //   featured: true,
  //   tags: ["Tag One", "Tag Two"],
  //   pdfUrl: "/downloads/report.pdf",
  //   modelUrl: "/downloads/model.xlsx",
  // },
];

// ─── BRIEFING NOTES ──────────────────────────────────────────────────────────
// Add new briefing notes here. Set featured: true for homepage/editor's pick.

export const briefings: BriefingNote[] = [
  // Example (remove when adding real content):
  // {
  //   slug: "note-slug",
  //   category: "Macro",
  //   date: "2025-01-10",
  //   title: "Note Title",
  //   excerpt: "A short summary of the note shown in listings.",
  //   readTime: 5,
  //   featured: true,
  // },
];

// ─── UTILITIES ───────────────────────────────────────────────────────────────

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
