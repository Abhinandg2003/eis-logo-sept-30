"use client";
import { useEffect, useRef } from "react";
import { animate } from "framer-motion/dom";

// ReactBits-style CountUp (rewritten on framer-motion's tiny `animate` to avoid extra deps).
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);
  useEffect(() => {
    const c = animate(from.current, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = String(Math.round(v)); },
    });
    from.current = value;
    return () => c.stop();
  }, [value]);
  return <span ref={ref}>{value}</span>;
}
