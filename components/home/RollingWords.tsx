"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * RollingWords
 * Cycles through a list of words inline. On each change every letter rolls on
 * its own: the old letter slides up and out while the new one rises in from
 * below, left to right with a small stagger. The width of each letter slot
 * animates too, so the text after the word glides instead of jumping when the
 * new word is wider or narrower.
 *
 *   <RollingWords words={["know", "show"]} />
 *
 * Words can be different lengths. Add as many as you like.
 */

type Props = {
  words: string[];
  /** ms between the start of one change and the next */
  interval?: number;
  /** ms each letter takes to roll */
  duration?: number;
  /** ms delay between one letter and the next */
  stagger?: number;
  className?: string;
};

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)"; // eased in and out, smooth
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function RollingWords({
  words,
  interval = 3200,
  duration = 800,
  stagger = 70,
  className = "",
}: Props) {
  const n = words.length;
  const key = words.join("|");
  const maxLen = Math.max(...words.map((w) => w.length));

  // slots[i][k] = the letter shown in slot i at step k.
  // Step n repeats word 0, so the loop can wrap around with no visible jump.
  const slots = useMemo(
    () =>
      Array.from({ length: maxLen }, (_, i) =>
        Array.from({ length: n + 1 }, (_, k) => {
          const ch = words[k % n][i] ?? "";
          return ch === " " ? "\u00A0" : ch;
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [widths, setWidths] = useState<number[][] | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Measure every letter so slot widths can be animated
  useIsoLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      setWidths(
        Array.from(el.children).map((row) =>
          Array.from(row.children).map((c) => c.getBoundingClientRect().width),
        ),
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [slots]);

  // The loop
  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const total = duration + (maxLen - 1) * stagger;
    const gap = Math.max(interval, total + 400);
    let s = 0;
    let tick: ReturnType<typeof setTimeout>;
    let reset: ReturnType<typeof setTimeout>;

    const run = () => {
      s += 1;
      setStep(s);
      if (s === n) {
        // We're now showing the repeated first word: snap back to the start
        reset = setTimeout(() => {
          setAnimate(false);
          setStep(0);
          s = 0;
          requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
        }, total + 60);
      }
      tick = setTimeout(run, gap);
    };

    tick = setTimeout(run, gap);
    return () => {
      clearTimeout(tick);
      clearTimeout(reset);
    };
  }, [n, maxLen, interval, duration, stagger]);

  const transition = (prop: string, i: number) =>
    animate ? `${prop} ${duration}ms ${EASE} ${i * stagger}ms` : "none";

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-flex", verticalAlign: "bottom", height: "1lh", whiteSpace: "nowrap" }}
    >
      {/* Screen readers get the first word; the animation is decorative */}
      <span className="sr-only">{words[0]}</span>

      {/* Hidden measuring layer */}
      <span
        ref={measureRef}
        aria-hidden
        style={{ position: "absolute", left: 0, top: 0, visibility: "hidden", pointerEvents: "none", whiteSpace: "pre" }}
      >
        {slots.map((row, i) => (
          <span key={i}>
            {row.map((ch, k) => (
              <span key={k} style={{ display: "inline-block" }}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>

      {/* The rolling letters */}
      <span aria-hidden  className="text-brand" style={{ display: "inline-flex", height: "1lh" }}>
        {slots.map((row, i) => (
          <span
            key={i}
            style={{
              display: "block",
              overflow: "hidden",
              height: "1lh",
              width: widths ? widths[i]?.[step] : undefined,
              transition: transition("width", i),
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                transform: `translateY(calc(-1lh * ${step}))`,
                transition: transition("transform", i),
              }}
            >
              {row.map((ch, k) => (
                <span key={k} style={{ display: "block", height: "1lh", whiteSpace: "pre" }}>
                  {ch}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}