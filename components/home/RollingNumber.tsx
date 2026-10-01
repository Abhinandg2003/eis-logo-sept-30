"use client";
import { useEffect, useRef, useState } from "react";

// Odometer-style number. Digits roll up inside an overflow-hidden window; every other
// character (M, +, <, spaces, letters) stays static. Starts when scrolled into view, once.
const STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // two cycles, so every digit (even 0) visibly rolls
const CELL = 1.2; // height of one digit, in em. Keep the window and the cells in sync.

type Props = {
  value: string;     // e.g. "1M+", "<200 MS", "5+"
  duration?: number; // seconds each digit takes to roll
  delay?: number;    // seconds to wait after entering view (use it to stagger several numbers)
};

// Stats row. Edit the numbers and labels here.
const stats = [
  { value: "400M+", label: "queries processed daily" },
  { value: "200K", label: "GPUs in Colossus" },
  { value: "122", label: "Days to build in Colossus" },
];

export function RollingNumber({ value, duration = 1.4, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: jump straight to the final number
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setGo(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGo(true);
          io.disconnect(); // play once
        }
      },
      { threshold: 0.5 }, // starts when half of it is visible
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="inline-flex items-center tabular-nums" style={{ height: `${CELL}em`, lineHeight: 1 }}>
      <span className="sr-only">{value}</span> {/* real value for screen readers and search engines */}
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          // The window: shows exactly one digit, clips the rest
          <span key={i} aria-hidden className="inline-block overflow-hidden" style={{ height: `${CELL}em` }}>
            <span
              className="flex flex-col will-change-transform"
              style={{
                // Rolls from the first "0" to the second cycle's target digit. 5% = one cell (20 cells in the strip).
                transform: `translateY(-${go ? (10 + Number(ch)) * 5 : 0}%)`,
                transition: instant ? "none" : `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay + i * 0.08}s`,
              }}
            >
              {STRIP.map((n, k) => (
                <span key={k} className="flex items-center justify-center" style={{ height: `${CELL}em` }}>
                  {n}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="whitespace-pre">{ch}</span>
        ),
      )}
    </span>
  );
}