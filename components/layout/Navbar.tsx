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

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 80); // hide only after leaving the top area
  });

  return (
    <m.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)} // keyboard users always see it
      className="fixed inset-x-0 top-0 z-50   bg-white/60 backdrop-blur-md"
    >
      <nav aria-label="Main" className="container-x !max-w-[90vw] flex h-16  items-center justify-between">
        <Link href="/" className="flex relative items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <img src="/images/ei-web-2.png"  className="relative h-[30px]" alt="" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          
          <Button asChild size="nav" className="ml-1">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-2.5 py-3 text-[0.9rem] text-neutral-600 transition-colors hover:text-neutral-900 sm:px-3">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </m.header>
  );
}
