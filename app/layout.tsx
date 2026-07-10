import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ThirdView Capital — Independent Equity Research",
    template: "%s — ThirdView Capital",
  },
  description:
    "Institutional-quality independent equity research. Deep dives, investment theses, and market commentary from a perspective outside the consensus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: "#1A1815" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
