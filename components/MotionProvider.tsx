"use client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

// LazyMotion loads only the animation features we use (smaller bundle).
// Use the `m` component (not `motion`) anywhere inside. reducedMotion respects OS setting.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
