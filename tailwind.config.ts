import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1815",
        "ink-deep": "#111009",
        paper: "#F5F3EE",
        "paper-warm": "#EDE9E1",
        silver: "#C8C4BC",
        "silver-dim": "#7A766F",
        accent: "#C9A96E",
        "accent-dim": "#9A7A4A",
        rule: "#2E2B27",
        "rule-light": "#E2DED6",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,7vw,6rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.25rem,5vw,4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.75rem,3.5vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.375rem,2.5vw,1.875rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        widest: "0.2em",
        "ultra-wide": "0.3em",
      },
      borderColor: {
        DEFAULT: "#2E2B27",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "line-grow": "lineGrow 0.8s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
