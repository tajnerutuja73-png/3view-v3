import type { Metadata } from "next";
import Link from "next/link";
import CoverageLinks from "../components/CoverageLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "ThirdView Capital is an independent equity research platform focused on long-form fundamental research, capital allocation, and structural investment analysis.",
};

function PrismLarge() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <polygon
        points="200,30 370,350 30,350"
        stroke="#C8C4BC"
        strokeWidth="0.8"
        fill="none"
        opacity="0.15"
      />
      <line
        x1="200"
        y1="30"
        x2="160"
        y2="350"
        stroke="#C8C4BC"
        strokeWidth="0.6"
        opacity="0.1"
      />
      <line
        x1="160"
        y1="350"
        x2="200"
        y2="260"
        stroke="#C9A96E"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <line
        x1="200"
        y1="260"
        x2="370"
        y2="350"
        stroke="#C9A96E"
        strokeWidth="0.8"
        opacity="0.4"
      />
      <polygon
        points="200,10 390,370 10,370"
        stroke="#C8C4BC"
        strokeWidth="0.4"
        fill="none"
        opacity="0.06"
      />
    </svg>
  );
}

const principles = [
  {
    label: "Independent Thinking",
    body: "Our work begins where consensus ends. Every report is built from first principles rather than inherited market narratives."
  },
  {
    label: "Long-Term Perspective",
    body: "We study businesses through capital allocation, competitive advantages, industry structure and management decisions—not quarterly earnings noise."
  },
  {
    label: "Evidence Before Opinion",
    body: "Investment conclusions are supported by financial models, industry research, primary sources and measurable operating data."
  },
  {
    label: "Intellectual Honesty",
    body: "A good research process accepts uncertainty. We update our views whenever evidence changes rather than defending previous conclusions."
  }
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "64px" }}>

      {/* Hero */}
      <section
        className="relative py-24 min-h-96 flex items-center overflow-hidden"
        style={{ background: "#111009" }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none">
          <PrismLarge />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <span className="label-accent">About</span>

          <h1
            className="mt-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.5rem,5.5vw,5rem)",
              fontWeight: 300,
              color: "#F5F3EE",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "14ch",
            }}
          >
            Looking beyond
            <br />
            <em>consensus.</em>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="py-24 border-b"
        style={{ background: "#1A1815", borderColor: "#2E2B27" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid lg:grid-cols-2 gap-20">

            <div>

              <span className="label-accent mb-6 block">
                Our Philosophy
              </span>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.6rem,2.7vw,2.4rem)",
                  fontWeight: 300,
                  lineHeight: 1.3,
                  color: "#F5F3EE",
                }}
              >
                "Markets reward independent thinking long before they reward
                consensus."
              </p>

            </div>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#7A766F",
              }}
            >
              <p>
                ThirdView Capital is an independent equity research platform
                dedicated to producing deep fundamental research on listed
                businesses.
              </p>

              <p className="mt-5">
                We focus on understanding businesses rather than predicting
                share prices. Every report is built around industry structure,
                competitive positioning, management quality, capital allocation,
                financial modelling and long-term earnings power.
              </p>

              <p className="mt-5">
                Our objective is simple: publish research that remains valuable
                years after it is written—not just until the next quarterly
                result.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Principles */}

      <section
        className="py-24 border-b"
        style={{ background: "#111009", borderColor: "#2E2B27" }}
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <span className="label-accent mb-12 block">
            Investment Principles
          </span>

          <div className="grid md:grid-cols-2 gap-0">

            {principles.map((p, i) => (

              <div
                key={p.label}
                className="p-8"
                style={{
                  borderTop: "1px solid #2E2B27",
                  borderRight: i % 2 === 0 ? "1px solid #2E2B27" : "none",
                }}
              >

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.6rem",
                    color: "#F5F3EE",
                    marginBottom: "18px",
                  }}
                >
                  {p.label}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#7A766F",
                    lineHeight: 1.8,
                  }}
                >
                  {p.body}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Research Process */}

      <section
        className="py-24 border-b"
        style={{ background: "#1A1815", borderColor: "#2E2B27" }}
      >

        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <span className="label-accent mb-10 block">
            Our Research Process
          </span>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              "Industry Mapping",
              "Business Analysis",
              "Financial Modelling",
              "Investment Thesis",
            ].map((step, index) => (

              <div
                key={step}
                className="p-8"
                style={{
                  border: "1px solid #2E2B27",
                  background: "#131110",
                }}
              >

                <div
                  style={{
                    color: "#C9A96E",
                    fontSize: "0.75rem",
                    letterSpacing: "0.2em",
                    marginBottom: "18px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  0{index + 1}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.4rem",
                    color: "#F5F3EE",
                  }}
                >
                  {step}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

{/* Leadership */}

<section
  className="py-24 border-b"
  style={{
    background: "#111009",
    borderColor: "#2E2B27",
  }}
>
  <div className="max-w-5xl mx-auto px-6 lg:px-12">

    <span className="label-accent mb-10 block">
      Leadership
    </span>

    <div
      className="p-10 transition-all duration-300 hover:border-[#C9A96E]"
      style={{
        border: "1px solid #2E2B27",
        background: "#131110",
      }}
    >

      <div
        className="w-14 h-14 flex items-center justify-center mb-8"
        style={{
          border: "1px solid #2E2B27",
          background: "#1A1815",
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "#C9A96E",
            fontSize: "1.2rem",
          }}
        >
          RJ
        </span>
      </div>

      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "2.1rem",
          fontWeight: 400,
          color: "#F5F3EE",
        }}
      >
        Rajat Jain
      </h2>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: "#C9A96E",
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginTop: "12px",
          marginBottom: "30px",
        }}
      >
        Founder & Head of Research
      </p>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "#7A766F",
          lineHeight: 1.9,
          fontSize: "1rem",
        }}
      >
        <p>
          Rajat Jain is a Chartered Accountant with experience working with
          high-net-worth individuals, family offices and sophisticated
          investors across Indian capital markets. His research combines
          rigorous fundamental analysis, financial modelling and capital
          allocation with a long-term investment philosophy.
        </p>

        <p className="mt-5">
          He founded ThirdView Capital to build an independent research
          platform focused on publishing high-quality, long-form equity
          research free from investment banking relationships, sponsored
          coverage and short-term market narratives.
        </p>

        <p className="mt-5">
          Every report published by ThirdView reflects the firm's philosophy
          of evidence-driven research, intellectual honesty and long-term
          thinking.
        </p>
      </div>

    </div>

  </div>
</section>
      
      {/* Coverage */}

      <section
        className="py-24"
        style={{ background: "#111009" }}
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid lg:grid-cols-2 gap-16">

            <div>

              <span className="label-accent mb-8 block">
                Coverage Universe
              </span>

              <CoverageLinks />

            </div>

            <div>

              <span className="label-accent mb-8 block">
                Research Archive
              </span>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#7A766F",
                  lineHeight: 1.9,
                }}
              >
                Our published reports include initiation coverage, deep-dive
                industry studies, thematic research and company updates across
                sectors of the Indian equity market.
              </p>

              <div className="mt-10">

                <Link
                  href="/research"
                  className="inline-flex items-center gap-3 px-6 py-3"
                  style={{
                    background: "#C9A96E",
                    color: "#111009",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Explore Research →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
