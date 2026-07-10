"use client";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  markOnly?: boolean;
}

export default function Logo({ variant = "dark", size = "md", markOnly = false }: LogoProps) {
  const markColor = variant === "dark" ? "#C8C4BC" : "#1A1815";
  const titleColor = variant === "dark" ? "#F5F3EE" : "#1A1815";
  const subColor = variant === "dark" ? "#7A766F" : "#7A766F";

  const markSize = size === "sm" ? 28 : size === "lg" ? 52 : 38;

  return (
    <div className="flex items-center gap-3" aria-label="ThirdView Capital">
      {/* The prism mark — derived from logo geometry */}
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer triangle */}
        <polygon
          points="30,4 56,52 4,52"
          stroke={markColor}
          strokeWidth="1.2"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Internal plane — the third face */}
        <line x1="30" y1="4" x2="22" y2="52" stroke={markColor} strokeWidth="0.8" opacity="0.6" />
        <line x1="22" y1="52" x2="56" y2="52" stroke={markColor} strokeWidth="0" />
        {/* Bottom inner line suggesting 3D depth */}
        <line x1="22" y1="52" x2="30" y2="38" stroke={markColor} strokeWidth="0.7" opacity="0.5" />
        <line x1="30" y1="38" x2="56" y2="52" stroke={markColor} strokeWidth="0.7" opacity="0.5" />
      </svg>

      {!markOnly && (
        <div className="flex flex-col leading-none">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: size === "sm" ? "0.9rem" : size === "lg" ? "1.4rem" : "1.1rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: titleColor,
              textTransform: "uppercase",
            }}
          >
            Thirdview
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: size === "sm" ? "0.48rem" : size === "lg" ? "0.65rem" : "0.55rem",
              fontWeight: 400,
              letterSpacing: "0.35em",
              color: subColor,
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            Capital
          </span>
        </div>
      )}
    </div>
  );
}
