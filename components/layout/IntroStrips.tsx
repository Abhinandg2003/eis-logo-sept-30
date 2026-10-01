"use client";
import { useEffect, useState } from "react";
import { m } from "framer-motion"; // `m` works because MotionProvider (LazyMotion) wraps the app

// ---------- TWEAK THESE ----------
const INTRO_TOTAL = 1;                    // total seconds for the whole animation
const STRIPS = 6;                         // number of strips
const STAGGER = 0.08;                     // delay between one strip and the next (seconds)
const EASE = [0.76, 0, 0.24, 1] as const; // ease-in-out; try [0.22, 1, 0.36, 1] for a softer landing
// Each strip's own duration is derived so the LAST strip finishes exactly at INTRO_TOTAL.
// Keep STAGGER * (STRIPS - 1) smaller than INTRO_TOTAL, or the duration goes negative.
const STRIP_DURATION = INTRO_TOTAL - STAGGER * (STRIPS - 1);

// Full-screen overlay of brand-colour strips. Each strip shrinks toward the bottom edge, left to right.
export function IntroStrips() {
  const [done, setDone] = useState(false);

  // Safety: if the component ever unmounts early, never leave the page locked
  useEffect(() => () => document.documentElement.classList.remove("intro-lock"), []);

  // Called when the last strip finishes: unlock scrolling, and the scrollbar appears
  const finish = () => {
    document.documentElement.classList.remove("intro-lock");
    setDone(true);
  };
  if (done) return null; // remove from the DOM once finished

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] grid"
      style={{ gridTemplateColumns: `repeat(${STRIPS}, 1fr)` }}
    >
      {Array.from({ length: STRIPS }, (_, i) => (
        <m.div
          key={i}
          className="h-full bg-brand"
          // transform-origin at the bottom makes the top edge slide down. The +1px overlap
          // between neighbours prevents hairline seams (no borders between strips).
          style={{ transformOrigin: "bottom", width: "calc(100% + 1px)" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: STRIP_DURATION, delay: i * STAGGER, ease: EASE }}
          onAnimationComplete={i === STRIPS - 1 ? finish : undefined}
        />
      ))}
    </div>
  );
}