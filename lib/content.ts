// ─────────────────────────────────────────────────────────────────────────────
// ThirdView Capital — MDX Content Loader
//
// Reads research reports and briefing notes from content/research/*.mdx and
// content/briefing/*.mdx respectively, parses their YAML frontmatter, and
// maps them onto the ResearchReport / BriefingNote types used throughout the
// app. Server-only (uses `fs`) — import only from Server Components.
//
// HOW TO ADD CONTENT:
//   1. Research report → add a new .mdx file to content/research/. Required
//      frontmatter: title, slug, ticker, company, sector, reportType,
//      publicationDate, priceAtPublication, thesis, excerpt, tags, readTime.
//      Optional: exchange, subtitle, featured, pdf, model.
//      Set `pdf: "your-file.pdf"` and place the matching file in
//      public/downloads/pdf/your-file.pdf to enable the PDF download button.
//   2. Briefing note → add a new .mdx file to content/briefing/. Required
//      frontmatter: title, slug, category, publicationDate, excerpt.
//      Optional: featured, tags, readTime.
// ─────────────────────────────────────────────────────────────────────────────

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ResearchReport, ResearchType, BriefingNote } from "./data";

const RESEARCH_DIR = path.join(process.cwd(), "content", "research");
const BRIEFING_DIR = path.join(process.cwd(), "content", "briefing");

function mdxFilesIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".mdx"))
    .sort();
}

// ─── RESEARCH ────────────────────────────────────────────────────────────────

export interface ResearchFrontmatter {
  title: string;
  slug: string;
  ticker: string;
  company: string;
  exchange?: string;
  sector: string;
  reportType: ResearchType;
  publicationDate: string;
  priceAtPublication: string;
  thesis: string;
  subtitle?: string;
  excerpt: string;
  featured?: boolean;
  tags?: string[];
  pdf?: string;
  model?: string;
  readTime?: number;
}

export interface ResearchEntry {
  slug: string;
  frontmatter: ResearchFrontmatter;
  content: string;
}

export function getResearchSlugs(): string[] {
  return mdxFilesIn(RESEARCH_DIR).map((f) => f.replace(/\.mdx$/i, ""));
}

export function getResearchEntry(fileSlug: string): ResearchEntry | null {
  const filePath = path.join(RESEARCH_DIR, `${fileSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ResearchFrontmatter;
  // The route slug is the filename; frontmatter.slug is used as a descriptive
  // identifier/title-slug but the URL is always derived from the filename so
  // that routing never depends on frontmatter being kept in sync.
  return { slug: fileSlug, frontmatter, content };
}

export function toResearchReport(entry: ResearchEntry): ResearchReport {
  const fm = entry.frontmatter;
  return {
    slug: entry.slug,
    ticker: fm.ticker,
    company: fm.company,
    exchange: fm.exchange,
    sector: fm.sector,
    type: fm.reportType,
    date: fm.publicationDate,
    title: fm.title,
    subtitle: fm.subtitle || fm.thesis,
    excerpt: fm.excerpt,
    thesis: fm.thesis,
    priceAtPublication: fm.priceAtPublication,
    readTime: fm.readTime ?? estimateReadTime(entry.content),
    featured: fm.featured,
    tags: fm.tags ?? [],
    pdfUrl: fm.pdf ? `/downloads/pdf/${fm.pdf}` : undefined,
    modelUrl: fm.model ? `/downloads/pdf/${fm.model}` : undefined,
  };
}

export function getAllResearchReports(): ResearchReport[] {
  return getResearchSlugs()
    .map((slug) => getResearchEntry(slug))
    .filter((e): e is ResearchEntry => e !== null)
    .map(toResearchReport)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ─── BRIEFING ────────────────────────────────────────────────────────────────

export interface BriefingFrontmatter {
  title: string;
  slug: string;
  category: string;
  publicationDate: string;
  excerpt: string;
  featured?: boolean;
  tags?: string[];
  readTime?: number;
}

export interface BriefingEntry {
  slug: string;
  frontmatter: BriefingFrontmatter;
  content: string;
}

export function getBriefingSlugs(): string[] {
  return mdxFilesIn(BRIEFING_DIR).map((f) => f.replace(/\.mdx$/i, ""));
}

export function getBriefingEntry(fileSlug: string): BriefingEntry | null {
  const filePath = path.join(BRIEFING_DIR, `${fileSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as BriefingFrontmatter;
  return { slug: fileSlug, frontmatter, content };
}

export function toBriefingNote(entry: BriefingEntry): BriefingNote {
  const fm = entry.frontmatter;
  return {
    slug: entry.slug,
    category: fm.category,
    date: fm.publicationDate,
    title: fm.title,
    excerpt: fm.excerpt,
    readTime: fm.readTime ?? estimateReadTime(entry.content),
    featured: fm.featured,
  };
}

export function getAllBriefingNotes(): BriefingNote[] {
  return getBriefingSlugs()
    .map((slug) => getBriefingEntry(slug))
    .filter((e): e is BriefingEntry => e !== null)
    .map(toBriefingNote)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
