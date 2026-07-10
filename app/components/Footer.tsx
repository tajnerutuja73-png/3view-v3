"use client";

import Link from "next/link";
import Logo from "./Logo";
import { SECTORS } from "../../lib/data";

const navLinks = [
  { href: "/",         label: "Home" },
  { href: "/research", label: "Research Archive" },
  { href: "/briefing", label: "Briefing Room" },
  { href: "/about",    label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t" style={{ borderColor: "#2E2B27", background: "#111009" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Logo size="sm" />
            <p className="mt-5 leading-relaxed" style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem",
              color: "#7A766F", maxWidth: "28ch",
            }}>
              Independent institutional equity research. No conflicts of interest.
            </p>
          </div>

          <div>
            <p className="label mb-5">Coverage</p>
            <nav className="flex flex-col gap-3">
              {SECTORS.map((sector) => (
                <Link
                  key={sector}
                  href={`/research?sector=${encodeURIComponent(sector)}`}
                  className="footer-link transition-colors duration-150"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#7A766F" }}
                >
                  {sector}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="label mb-5">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="footer-link transition-colors duration-150"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "#7A766F" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: "#2E2B27" }}>
          <p className="label">© {new Date().getFullYear()} ThirdView Capital. All rights reserved.</p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.7rem",
            color: "#3E3B37", maxWidth: "52ch", lineHeight: 1.6,
          }}>
            This material is for informational purposes only and does not constitute investment advice.
            Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
