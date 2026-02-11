"use client";

/**
 * Radial burst icon matching the Dkapture logo motif.
 * Dense lines emanating from center forming a spherical burst pattern,
 * similar to the actual brand mark.
 *
 * Props:
 *  - className: sizing / color overrides
 *  - color: stroke color (default #FF4500)
 *  - lineCount: number of radial lines (default 48 for dense burst)
 */
export function ShutterIcon({
  className = "",
  color = "#FF4500",
  lineCount = 48,
}: {
  className?: string;
  color?: string;
  lineCount?: number;
}) {
  const cx = 50;
  const cy = 50;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Dense radial burst lines – varying lengths for organic feel */}
      {Array.from({ length: lineCount }).map((_, i) => {
        const angle = (i * 360) / lineCount;
        const rad = (angle * Math.PI) / 180;

        // Vary inner/outer radii for the organic burst shape from the logo
        const wobble = Math.sin(angle * 0.08) * 4 + Math.cos(angle * 0.15) * 3;
        const innerR = 6;
        const outerR = 38 + wobble + (i % 3 === 0 ? 4 : 0);

        const x1 = cx + innerR * Math.cos(rad);
        const y1 = cy + innerR * Math.sin(rad);
        const x2 = cx + outerR * Math.cos(rad);
        const y2 = cy + outerR * Math.sin(rad);

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
