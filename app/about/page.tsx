import type { Metadata } from "next";
import Link from "next/link";
import CoverageLinks from "../components/CoverageLinks";

export const metadata: Metadata = {
  title: "About",
  description: "ThirdView Capital — independent institutional equity research founded by CA Rajat Jain and Ms. Rutuja Tajne.",
};

function PrismLarge() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" aria-hidden="true">
      <polygon points="200,30 370,350 30,350" stroke="#C8C4BC" strokeWidth="0.8" fill="none" opacity="0.15" />
      <line x1="200" y1="30" x2="160" y2="350" stroke="#C8C4BC" strokeWidth="0.6" opacity="0.1" />
      <line x1="160" y1="350" x2="200" y2="260" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" />
      <line x1="200" y1="260" x2="370" y2="350" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" />
      <polygon points="200,10 390,370 10,370" stroke="#C8C4BC" strokeWidth="0.4" fill="none" opacity="0.06" />
    </svg>
  );
}

const principles = [
  {
    label: "No Conflicts",
    body: "We do not underwrite securities, manage client money, or maintain trading relationships with the companies we cover. Our only obligation is to the accuracy of our analysis.",
  },
  {
    label: "Structural Conviction",
    body: "Every report begins with a structural question: what does the competitive landscape look like in five years, and who wins? Our analysis follows from that framework.",
  },
  {
    label: "The Third View",
    body: "The consensus long and the consensus short are known quantities. We look for the third view — the framework, asymmetry, or misclassified risk that the market has not yet priced.",
  },
  {
    label: "Institutional Rigour",
    body: "We write the same analysis we would want to receive as a sophisticated investor. That means primary research, detailed model work, and explicit reasoning about what would change our thesis.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Hero */}
      <section className="relative py-24 min-h-96 flex items-center overflow-hidden" style={{ background: "#111009" }}>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none">
          <PrismLarge />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <span className="label-accent">About Us</span>
          <h1 className="mt-4" style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.5rem, 5.5vw, 5rem)", fontWeight: 300,
            color: "#F5F3EE", letterSpacing: "-0.025em", lineHeight: 1.05, maxWidth: "18ch",
          }}>
            Research without<br /><em>compromise.</em>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 border-b" style={{ background: "#1A1815", borderColor: "#2E2B27" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="label-accent mb-6 block">Our Mission</span>
              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 300,
                color: "#F5F3EE", lineHeight: 1.3, letterSpacing: "-0.015em",
              }}>
                &ldquo;The best investment analysis doesn&apos;t come from the most access
                or the most data. It comes from the best questions and the willingness
                to follow them where they lead.&rdquo;
              </p>
            </div>

            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1.0625rem",
              lineHeight: 1.8, color: "#7A766F",
            }}>
              <p>
                ThirdView Capital is an independent equity research platform founded on
                a simple conviction: the most valuable research is research free from
                institutional conflicts. We write without a banking relationship to
                protect, a trading desk to feed, or a ratings committee to satisfy.
              </p>
              <p className="mt-5">
                Our work is aimed at sophisticated investors — family offices, HNIs,
                UHNIs, and institutional clients — who have already read the consensus
                and are looking for the analytical layer beneath it.
              </p>
              <p className="mt-5">
                We are a research platform, not a newsletter. We treat every report
                with the rigour that implies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 border-b" style={{ background: "#111009", borderColor: "#2E2B27" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="label-accent mb-12 block">How We Think</span>
          <div className="grid md:grid-cols-2 gap-0">
            {principles.map((p, i) => (
              <div key={p.label} className="p-8" style={{
                borderTop: "1px solid #2E2B27",
                borderRight: i % 2 === 0 ? "1px solid #2E2B27" : "none",
              }}>
                <p className="mb-4" style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.5rem", fontWeight: 400,
                  color: "#F5F3EE", letterSpacing: "-0.01em",
                }}>{p.label}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem",
                  color: "#7A766F", lineHeight: 1.75,
                }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 border-b" style={{ background: "#1A1815", borderColor: "#2E2B27" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="label-accent mb-12 block">Founders</span>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Rutuja Tajne",
                initials: "RT",
                bio: "Seasoned Research Analyst with experience working alongside high-net-worth individuals (HNIs) and family offices in India. Her expertise spans quantitative and fundamental research, with a particular focus on the energy sector. She specializes in transforming complex financial and industry data into actionable investment insights through rigorous, research-driven analysis.",
              },
              {
                name: "Rajat Jain",
                initials: "RJ",
                bio: "Chartered Accountant with extensive experience advising high-net-worth individuals (HNIs) and family offices in India. His expertise encompasses both fundamental and technical analysis across equities and derivatives, with a strong focus on options markets. He combines financial discipline with market insight to develop robust, data-driven investment perspectives.",
              },
            ].map((founder) => (
              <div key={founder.name} className="p-8" style={{ border: "1px solid #2E2B27", background: "#131110" }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ border: "1px solid #2E2B27", background: "#1A1815" }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.0625rem", color: "#C9A96E",
                  }}>{founder.initials}</span>
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.5rem", fontWeight: 400, color: "#F5F3EE",
                  letterSpacing: "-0.01em", marginBottom: "16px",
                }}>{founder.name}</p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.875rem",
                  color: "#7A766F", lineHeight: 1.75,
                }}>
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-24" style={{ background: "#111009" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="label-accent mb-8 block">Coverage Universe</span>
              <CoverageLinks />
            </div>

            <div>
              <span className="label-accent mb-8 block">Our Methodology</span>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem",
                lineHeight: 1.8, color: "#7A766F",
              }}>
                <p>
                  Every initiation begins with primary research: understanding the
                  competitive landscape, customer dynamics, regulatory environment,
                  and capital allocation history.
                </p>
                <p className="mt-4">
                  We build financial models from the ground up, driven by unit
                  economics and structural analysis rather than consensus extrapolation.
                </p>
                <p className="mt-4">
                  We update our views when the facts change — not on a quarterly
                  schedule. A thesis that remains intact does not need a new report.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/research"
                  className="inline-flex items-center gap-3 px-6 py-3"
                  style={{
                    background: "#C9A96E", color: "#111009",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  }}>
                  Read Our Research →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
