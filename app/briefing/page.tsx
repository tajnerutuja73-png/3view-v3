import { getAllBriefingNotes } from "../../lib/content";
import BriefingArchive from "../components/BriefingArchive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Briefing Room",
  description: "Market notes, macro commentary, earnings analysis, and industry observations.",
};

export default function BriefingPage() {
  const briefings = getAllBriefingNotes();
  return (
    <div style={{ paddingTop: "64px" }}>
      <section className="py-20 border-b" style={{ borderColor: "#2E2B27", background: "#111009" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="label-accent">Briefing Room</span>
          <h1 className="mt-4 mb-4" style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.75rem, 5vw, 4.5rem)", fontWeight: 300,
            color: "#F5F3EE", letterSpacing: "-0.025em", lineHeight: 1.05,
          }}>
            Market Notes<br />
            <em style={{ color: "#C8C4BC" }}>&amp; Commentary</em>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "#7A766F", maxWidth: "50ch", lineHeight: 1.7,
          }}>
            Short-form analysis, macro observations, and timely takes on market-moving events.
          </p>
        </div>
      </section>

      <BriefingArchive notes={briefings} />
    </div>
  );
}
