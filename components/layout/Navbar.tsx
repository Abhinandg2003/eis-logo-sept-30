"use client";
import Link from "next/link";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import ArrowButton from "../ui/Arrowbutton";

// Fixed, static navbar.
export function Navbar() {
  // Seconds to wait before the wordmark slides out. Match it to the intro strips
  // (INTRO_HOLD + INTRO_TOTAL, e.g. 0.4 + 1 = 1.4) so it starts as they clear.
  const LOGO_DELAY = 1.4;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-2px border-black/10 bg-white">
      <nav
        aria-label="Main"
        className="container-x !max-w-[90vw] flex h-16 relative items-center justify-between"
      >
        <Link
          href="/"
          aria-label={site.name}
          className="relative flex items-center gap-1"
        >
          {/* Icon sits on top (z-10) so the wordmark appears to come out from behind it */}
          <img
            src="/images/eis-web7.svg"
            className="relative z-10 h-7"
            alt=""
          />

          {/* Mask: clips the wordmark while it's still to the left */}
          <span className="flex items-center overflow-hidden">
            <m.img
              src="/images/frameworks.svg"
              alt=""
              className="h-8"
              initial={{ x: "-110%" }}
              animate={{ x: "0%" }}
              transition={{
                duration: 1,
                delay: LOGO_DELAY,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          <ArrowButton href={site.cta.href} className="!py-2.5">
                          {site.cta.label}
                        </ArrowButton>
        </div>
        <div className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
          {site.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-2.5 py-3 text-[1rem] text-black transition-colors hover:text-neutral-700 sm:px-3"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}