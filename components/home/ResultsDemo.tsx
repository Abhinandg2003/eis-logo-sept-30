"use client";
import { useEffect, useState } from "react";
import { CountUp } from "@/components/reactbits/CountUp";

// PLACEHOLDER CONTENT: sample scores. Same three traits as the scenario demo.
const TRAITS = [
  { label: "Capability", score: 82 },   // top corner
  { label: "Contextual", score: 64 },   // bottom-left corner
  { label: "Behavioural", score: 78 },  // bottom-right corner
];
const CHECKING_MS = 1600; // how long "Checking results" shows before the reveal

// Equilateral triangle: side 220, so height = 220 * 0.866 = 190.5
const TOP = { x: 160, y: 50 };
const BL = { x: 50, y: 240.5 };
const BR = { x: 270, y: 240.5 };
const C = { x: (TOP.x + BL.x + BR.x) / 3, y: (TOP.y + BL.y + BR.y) / 3 }; // centre
const VERTS = [TOP, BL, BR];

const toPoints = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");
// Scale a vertex towards the centre (0 = centre, 1 = the corner itself)
const towardsCentre = (v: { x: number; y: number }, k: number) => ({
  x: C.x + (v.x - C.x) * k,
  y: C.y + (v.y - C.y) * k,
});

export function ResultsDemo() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), CHECKING_MS);
    return () => clearTimeout(t);
  }, []);

  const total = Math.round(TRAITS.reduce((a, t) => a + t.score, 0) / TRAITS.length);
  const scorePoints = toPoints(VERTS.map((v, i) => towardsCentre(v, TRAITS[i].score / 100)));

  return (
    <div className="surface p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-medium leading-snug sm:text-xl">Your results</p>
        <span aria-live="polite" className="flex items-center gap-2 text-xs text-neutral-500">
          {revealed ? (
            "Results ready"
          ) : (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
              Checking results…
            </>
          )}
        </span>
      </div>

      <svg viewBox="0 0 320 290" role="img" aria-label="Triangle chart of three traits" className="mx-auto mt-3 w-full max-w-[380px]">
        {/* Outer triangle (solid) */}
        <polygon points={toPoints(VERTS)} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300" strokeLinejoin="round" />

        {/* Inner dotted triangles */}
        {[0.75, 0.5, 0.25].map((k) => (
          <polygon
            key={k}
            points={toPoints(VERTS.map((v) => towardsCentre(v, k)))}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="1 5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400"
          />
        ))}

        {/* Corner-to-centre guides */}
        {VERTS.map((v, i) => (
          <line key={i} x1={C.x} y1={C.y} x2={v.x} y2={v.y} stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" className="text-neutral-300" />
        ))}

        {/* Score shape: grows out of the centre when results are ready */}
        <polygon
          points={scorePoints}
          strokeLinejoin="round"
          strokeWidth="2"
          className="fill-brand/15 stroke-brand"
          style={{
            transformBox: "view-box",
            transformOrigin: `${C.x}px ${C.y}px`,
            transform: revealed ? "scale(1)" : "scale(0)",
            opacity: revealed ? 1 : 0,
            transition: "transform 1s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease-out",
          }}
        />
        {VERTS.map((v, i) => {
          const p = towardsCentre(v, TRAITS[i].score / 100);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4.5"
              className="fill-brand"
              style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.5s ease-out ${0.6 + i * 0.1}s` }}
            />
          );
        })}

        {/* Trait labels on each corner */}
        <g className="fill-neutral-800 text-[13px] font-medium" textAnchor="middle">
          <text x={TOP.x} y={TOP.y - 14}>{TRAITS[0].label}</text>
          <text x={BL.x} y={BL.y + 26}>{TRAITS[1].label}</text>
          <text x={BR.x} y={BR.y + 26}>{TRAITS[2].label}</text>
        </g>
        <g className="fill-neutral-500 text-[12px] tabular-nums" textAnchor="middle">
          <text x={BL.x} y={BL.y + 43}>{revealed ? TRAITS[1].score : "-"}</text>
          <text x={BR.x} y={BR.y + 43}>{revealed ? TRAITS[2].score : "-"}</text>
          <text x={TOP.x + 62} y={TOP.y - 14}>{revealed ? TRAITS[0].score : "-"}</text>
        </g>
      </svg>

      <div className="mt-2 flex items-end justify-between gap-4 border-t border-neutral-200 pt-4">
        <div>
          <div className="font-display text-4xl font-semibold tabular-nums">
            <CountUp value={revealed ? total : 0} />
          </div>
          <p className="text-xs text-neutral-500">Sample EIS</p>
        </div>
        <p className="max-w-[26ch] text-right text-sm leading-relaxed text-neutral-600">
          The further a point sits from the centre, the stronger the trait.
        </p>
      </div>
    </div>
  );
}