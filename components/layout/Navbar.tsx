"use client";
import { useState } from "react";
import Link from "next/link";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// Fixed navbar: slides up out of view when scrolling down, returns when scrolling up.
export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Seconds to wait before the wordmark slides out. Match it to the intro strips
// (INTRO_HOLD + INTRO_TOTAL, e.g. 0.4 + 1 = 1.4) so it starts as they clear.
const LOGO_DELAY = 1.2;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 80); // hide only after leaving the top area
  });


  return (
    <m.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)} // keyboard users always see it
      className="fixed inset-x-0 top-0 z-50 border-b border-2px border-black/0   bg-white/60 backdrop-blur-md"
    >
      <nav aria-label="Main" className="container-x !max-w-[90vw] flex h-16   items-center justify-between">
        <Link href="/" aria-label={site.name} className="relative flex items-center gap-1">
  {/* Icon sits on top (z-10) so the wordmark appears to come out from behind it */}
  <img src="/images/eis-web7.svg" className="relative z-10 h-[25px]" alt="" />

  {/* Mask: clips the wordmark while it's still to the left, so nothing shows before it slides out */}
  <span className="flex items-center overflow-hidden">
    <m.img
      src="/images/frameworks.svg"
      alt=""
      className="h-[30px]"
      initial={{ x: "-110%" }}   // fully hidden, behind the icon side of the mask
      animate={{ x: "0%" }}      // final resting place, same as your current layout
      transition={{ duration: 0.8, delay: LOGO_DELAY, ease: [0.22, 1, 0.36, 1] }}
    />
  </span>
</Link>
        <div className="flex items-center gap-1 sm:gap-3">
          
          <Button asChild size="nav" className="ml-1">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-2.5 py-3 text-[1rem] text-black transition-colors hover:text-neutral-700 sm:px-3">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </m.header>
  );
}
