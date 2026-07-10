import { getAllResearchReports } from "../../lib/content";
import ResearchArchiveWrapper from "../components/ResearchArchiveWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Archive",
  description: "Institutional equity research covering technology, financials, healthcare, and energy transition.",
};

export default function ResearchPage() {
  const research = getAllResearchReports();
  return (
    <div style={{ paddingTop: "64px" }}>
      <section className="py-20 border-b" style={{ borderColor: "#2E2B27", background: "#111009" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="label-accent">Archive</span>
          <h1 className="mt-4 mb-4" style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.75rem, 5vw, 4.5rem)", fontWeight: 300,
            color: "#F5F3EE", letterSpacing: "-0.025em", lineHeight: 1.05,
          }}>Research Archive</h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "#7A766F", maxWidth: "50ch", lineHeight: 1.7,
          }}>
            {research.length > 0
              ? `${research.length} report${research.length === 1 ? "" : "s"} across technology, financials, healthcare, and energy transition.`
              : "Institutional research across technology, financials, healthcare, and energy transition."}
          </p>
        </div>
      </section>

      <ResearchArchiveWrapper reports={research} />
    </div>
  );
}
