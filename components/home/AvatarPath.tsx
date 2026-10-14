"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * AvatarPath
 * A thick pathway shaped like the left half of a fully rounded rectangle
 * (a stadium). The left end is a perfect semicircle, and the two straight
 * arms run right until they bleed off the edge of the screen. Round avatars
 * drift along it. Hovering one freezes the flow and opens a popup anchored to
 * that avatar with name, role and a quote.
 *
 * Overflow is visible, so the track escapes this component's box. Put
 * `overflow-x-clip` on the hero <section> so it doesn't create a horizontal
 * scrollbar.
 */

type Person = {
  name: string;
  role: string;
  quote: string;
  src: string;
};

// PLACEHOLDER copy and photos: swap for real people and your own images
const img = (n: number) => `https://i.pravatar.cc/160?img=${n}`;

const people: Person[] = [
  { name: "Aisha Rahman", role: "Head of People, Northwind", quote: "It finally showed us how our managers decide, not just what they know.", src: img(47) },
  { name: "Daniel Okafor", role: "VP Operations, Lumen", quote: "The scenarios feel like real Tuesdays at work. Our teams actually enjoy them.", src: img(12) },
  { name: "Priya Nair", role: "L&D Lead, Orbit", quote: "Signals, not verdicts. That framing changed how our leaders talk about growth.", src: img(32) },
  { name: "Marco Bellini", role: "COO, Fieldstone", quote: "We spotted trade-off patterns across teams in the first week.", src: img(15) },
  { name: "Sara Lindqvist", role: "Chief of Staff, Alder", quote: "The most useful thing we added to our performance toolkit this year.", src: img(45) },
  { name: "Kenji Watanabe", role: "Engineering Director, Halo", quote: "Our engineers saw their own blind spots without feeling ranked.", src: img(53) },
  { name: "Maya Thomas", role: "HR Business Partner, Vela", quote: "Clear, calm and surprisingly honest. Our people trust the results.", src: img(49) },
];

// ---- geometry (px) --------------------------------------------------------
const H = 560; // height of the stadium
const TRACK = 112; // thickness of the pathway
const AVATAR = 64;
const MARGIN = 70; // distance from the box edge to the path's centre line
const R = (H - MARGIN * 2) / 2; // fully rounded: radius is half the height
const LEFT = 80; // x of the left-most point of the centre line
const ARC_X = LEFT + R; // where the straight arms meet the semicircle
const SPEED = 28; // px per second: lower = slower
const SPACING = 175; // px between avatars along the path
const POPUP_W = 290;

export function AvatarPath({ className = "" }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [reach, setReach] = useState(0); // x (in box coords) of the screen's right edge
  const [active, setActive] = useState<number | null>(null);
  const [side, setSide] = useState<"left" | "right">("right");

  // Measure how far the arms must run to reach the right edge of the screen
  useEffect(() => {
    const measure = () => {
      const left = boxRef.current?.getBoundingClientRect().left ?? 0;
      setReach(Math.ceil(document.documentElement.clientWidth - left));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { d, length, count, duration } = useMemo(() => {
    const end = Math.max(reach, ARC_X + 200);
    const arm = end - ARC_X;
    const len = arm * 2 + Math.PI * R;
    return {
      // start top-right, run left, round the end, run back right along the bottom
      d: `M ${end} ${MARGIN} H ${ARC_X} A ${R} ${R} 0 0 0 ${ARC_X} ${H - MARGIN} H ${end}`,
      length: len,
      count: Math.max(people.length, Math.round(len / SPACING)),
      duration: len / SPEED,
    };
  }, [reach]);

  const activate = (i: number, el: HTMLElement) => {
    const a = el.getBoundingClientRect();
    const room = document.documentElement.clientWidth - a.right;
    setSide(room < POPUP_W + 30 ? "left" : "right");
    setActive(i);
  };

  const end = Math.max(reach, ARC_X + 200);

  return (
    <div className={className}>
      <style>{`
        @keyframes ap-flow {
          0%   { offset-distance: 0%;   opacity: 0; }
          3%   { opacity: 1; }
          97%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes ap-pop {
          from { opacity: 0; transform: translateY(-50%) scale(.6); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
        .ap-av {
          position: absolute; left: 0; top: 0;
          width: ${AVATAR}px; height: ${AVATAR}px;
          offset-rotate: 0deg;
          offset-anchor: 50% 50%;
          animation: ap-flow var(--ap-dur) linear infinite;
          z-index: 1;
        }
        .ap-track[data-paused="true"] .ap-av { animation-play-state: paused; }
        .ap-av[data-active="true"] { z-index: 50; }
        .ap-face {
          width: 100%; height: 100%; border-radius: 9999px; overflow: hidden;
          background: #eee;
          border: 3px solid #fff;
          box-shadow: 0 6px 18px rgba(0,0,0,.14);
          transition: transform .25s ease, box-shadow .25s ease;
          cursor: pointer;
        }
        .ap-av[data-active="true"] .ap-face {
          transform: scale(1.12);
          box-shadow: 0 10px 28px rgba(0,0,0,.22);
        }
        .ap-face img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ap-pop {
          position: absolute; top: 50%; width: ${POPUP_W}px; cursor: default;
          animation: ap-pop .22s ease-out both;
        }
        .ap-pop[data-side="right"] { left: 100%; padding-left: 14px; transform-origin: left center; }
        .ap-pop[data-side="left"]  { right: 100%; padding-right: 14px; transform-origin: right center; }
        .ap-card {
          position: relative; background: #fff; border: 1px solid rgba(0,0,0,.08);
          border-radius: 16px; padding: 16px 18px;
          box-shadow: 0 16px 40px rgba(0,0,0,.16); text-align: left;
        }
        .ap-card::before {
          content: ""; position: absolute; top: 50%; width: 12px; height: 12px;
          background: #fff; transform: translateY(-50%) rotate(45deg);
        }
        .ap-pop[data-side="right"] .ap-card::before {
          left: -6px; border-left: 1px solid rgba(0,0,0,.08); border-bottom: 1px solid rgba(0,0,0,.08);
        }
        .ap-pop[data-side="left"] .ap-card::before {
          right: -6px; border-right: 1px solid rgba(0,0,0,.08); border-top: 1px solid rgba(0,0,0,.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .ap-av { animation-duration: calc(var(--ap-dur) * 4); }
        }
      `}</style>

      <div
        ref={boxRef}
        className="ap-track relative"
        style={
          {
            width: 460,
            height: H,
            overflow: "visible",
            "--ap-dur": `${duration}s`,
          } as React.CSSProperties
        }
        data-paused={active !== null}
      >
        {/* The pathway: overflow visible so it runs off to the screen edge */}
        {reach > 0 && (
          <svg
            width={end}
            height={H}
            viewBox={`0 0 ${end} ${H}`}
            fill="none"
            aria-hidden
            className="absolute left-0 top-0 pointer-events-none"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="ap-fill" gradientUnits="userSpaceOnUse" x1={LEFT - TRACK / 2} y1="0" x2={end} y2="0">
                <stop offset="0%" stopColor="#CAF5EF" />
                <stop offset="55%" stopColor="#F4F8DE" />
                <stop offset="100%" stopColor="#FEEDFF" />
              </linearGradient>
            </defs>
            <path d={d} stroke="rgba(0,0,0,.08)" strokeWidth={TRACK + 2} strokeLinecap="butt" />
            <path d={d} stroke="url(#ap-fill)" strokeWidth={TRACK} strokeLinecap="butt" />
          </svg>
        )}

        {/* Avatars riding the path */}
        {reach > 0 &&
          Array.from({ length: count }).map((_, i) => {
            const p = people[i % people.length];
            return (
              <div
                key={i}
                className="ap-av"
                data-active={active === i}
                style={{
                  offsetPath: `path("${d}")`,
                  animationDelay: `${-(i / count) * duration}s`,
                }}
                onMouseEnter={(e) => activate(i, e.currentTarget)}
                onMouseLeave={() => setActive(null)}
                onFocus={(e) => activate(i, e.currentTarget)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={`${p.name}, ${p.role}`}
              >
                <div className="ap-face">
                  <img src={p.src} alt={p.name} draggable={false} />
                </div>

                {active === i && (
                  <div className="ap-pop" data-side={side}>
                    <div className="ap-card">
                      <p className="text-[0.95rem] font-medium text-black">{p.name}</p>
                      <p className="text-[0.78rem] text-black/50">{p.role}</p>
                      <p className="mt-3 text-[0.85rem] leading-relaxed text-black/80">
                        &ldquo;{p.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}