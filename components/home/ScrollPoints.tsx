"use client";
import { useEffect, useRef } from "react";

// Only the hyphens show at first. While the section is pinned, each text slides in
// from the left, clipped by an overflow-hidden wrapper (it emerges from behind the hyphen).
export function ScrollPoints({ points }: { points: { title: string }[] }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-point]");

    // Reduced motion: show the text, no pinning, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((i) => (i.style.opacity = "1"));
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      // Loaded on demand so GSAP stays out of the initial bundle
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const section = el.closest("section") ?? el; // the whole section is what sticks

      ctx = gsap.context(() => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * 1.5}`, // how long it stays stuck
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          // Start state (visible, pushed fully left, clipped) and end state in ONE tween
          .fromTo(
            items,
            { xPercent: -100, opacity: 1 },
            { xPercent: 0, opacity: 1, duration: 1, stagger: 1 },
          )
          .to({}, { duration: 0.4 }); // short rest before the section unsticks
      }, el);

      // Fonts load after first paint and change the page height above this section.
      // Re-measure once they're ready so the pin position is exact (prevents a late "snap").
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <ol ref={root} className="mt-5 grid md:grid-cols-1">
      {points.map((p) => (
        <li key={p.title} className="pt-3">
          <h3 className="flex items-baseline gap-2 font-display text-xl text-black">
            <span aria-hidden className="font-black">-</span>
            {/* overflow-hidden clips the text while it's still to the left */}
            <span className="-my-1 overflow-hidden py-1">
              <span data-point className="block font-light" style={{ opacity: 0 }}>
                {p.title}
              </span>
            </span>
          </h3>
        </li>
      ))}
    </ol>
  );
}