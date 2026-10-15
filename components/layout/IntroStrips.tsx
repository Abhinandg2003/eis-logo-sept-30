"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion"; // `m` works because MotionProvider (LazyMotion) wraps the app

// ---------- TWEAK THESE ----------
const INTRO_TOTAL = 1;
const INTRO_HOLD = 0.8;
const LOGO_FADE_IN = 0.2;                 // NEW: seconds for the logo to fade in
const LOGO_FADE_OUT = 0.2;
const STRIPS = 3;
const STAGGER = 0.08;
const EASE = [0.76, 0, 0.24, 1] as const;
const STRIP_DURATION = INTRO_TOTAL - STAGGER * (STRIPS - 1);

// Logo timeline: fade in -> hold -> fade out
const LOGO_TOTAL = INTRO_HOLD + LOGO_FADE_OUT;
const LOGO_TIMES = [0, LOGO_FADE_IN / LOGO_TOTAL, INTRO_HOLD / LOGO_TOTAL, 1];

// Logo timeline: fade in -> hold -> fade out, as one keyframe animation

export function IntroStrips() {
  const [done, setDone] = useState(false);

  useEffect(() => () => document.documentElement.classList.remove("intro-lock"), []);

  const finish = () => {
    document.documentElement.classList.remove("intro-lock");
    setDone(true);
  };
  if (done) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] grid"
      style={{ gridTemplateColumns: `repeat(${STRIPS}, 1fr)` }}
    >
      {Array.from({ length: STRIPS }, (_, i) => (
        <m.div
          key={i}
          className="h-full bg-gradient-to-b from-[#000] to-[#333]"
          style={{ transformOrigin: "top", width: "calc(100% + 1px)" }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            duration: STRIP_DURATION,
            delay: INTRO_HOLD + i * STAGGER, // strips wait for the hold before moving
            ease: EASE,
          }}
          onAnimationComplete={i === STRIPS - 1 ? finish : undefined}
        />
      ))}

      {/* Logo: fades in, holds, then fades out exactly when the strips start */}
<m.div
  className="absolute inset-0 flex items-center justify-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 1, 1, 0] }}
  transition={{
    duration: LOGO_TOTAL,
    times: LOGO_TIMES,
    ease: ["easeOut", "linear", "easeOut"],
  }}
>
  <Image
    src="/images/eis-icon-white.png"
    alt=""
    width={160}
    height={160}
    priority
    className="h-auto w-60 sm:w-50"
  />
</m.div>
    </div>
  );
}