"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import type { Insight } from "@/lib/cms/types";
import { fmtDate } from "@/components/insights/InsightCard";
import { FiArrowRight } from "react-icons/fi";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function InsightsScroll({ posts }: { posts: Insight[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // Whichever text block crosses the middle of the screen becomes active
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [posts.length]);

  return (
    <section className="section !pt-0">
      <div className="flex w-full max-w-[80vw]  mx-auto ">
        <div className="flex flex-col gap-3">
          <h2 className="h-display !font-normal">Latest news</h2>
          <Link
            href="/insights"
            className="flex items-center gap-1 text-sm text-neutral-600 "
          >
            <span className="group mb-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#6161ff]/10 py-2 pl-4 pr-2 text-[0.9rem] font-medium text-[#3a3ac4]">
              View all
              <span className="relative flex size-6 items-center justify-center overflow-hidden rounded-full bg-[#6161ff]/25">
                <span className="absolute inset-0 flex items-center justify-center text-[0.7rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full">
                  <FiArrowRight aria-hidden />
                </span>
                <span className="absolute inset-0 flex -translate-x-full items-center justify-center text-[0.7rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0">
                  <FiArrowRight aria-hidden />
                </span>
              </span>
            </span>
          </Link>
        </div>
        <div className="flex w-1/2 ml-auto  justify-end">
          <p className="max-w-[440px] text-start text-[1.4rem] leading-8 text-black md:justify-self-end">
            {/* PLACEHOLDER copy */}
            One platform, three lenses on how people decide. See behaviour,
            context and capability side by side, for individuals and for whole
            teams.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[80vw] ">
        {/* Left: pinned, vertically centred image stack */}
        {/* Left: pinned image stack with clip-path wipe */}
        <div className="sticky top-0 hidden h-screen w-1/2 items-center justify-center self-start md:flex">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl bg-neutral-100">
            {posts.map((p, i) => {
              const clip =
                i === active
                  ? "inset(0% 0% 0% 0%)" // fully shown
                  : i < active
                    ? "inset(0% 0% 0% 100%)" // already passed: collapsed to the right edge
                    : "inset(0% 100% 0% 0%)"; // waiting: collapsed to the left edge
              return (
                <img
                  key={p.slug}
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    clipPath: clip,
                    zIndex: i === active ? 10 : 0,
                    // power2.out at 0.35s, same as the reference. The outgoing image waits
                    // for the incoming one to cover it, so no gap ever shows.
                    transition: `clip-path 350ms cubic-bezier(0.5, 1, 0.89, 1) ${i === active ? 0 : 350}ms`,
                    willChange: "clip-path",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Right: scrolling text */}
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex items-end justify-between gap-4 pt-20 md:pl-[4vw]">
            {/* <h2 className="h-section !font-normal">Latest news</h2>
            <Link
              href="/insights"
              className="flex items-center gap-1 text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
            >
              View all <IoIosArrowForward />
            </Link> */}
          </div>

          {posts.map((p, i) => (
            <article
              key={p.slug}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`flex flex-col justify-center py-16 transition-opacity duration-500 md:min-h-[70vh] md:pl-[4vw] ${
                i === active ? "opacity-100" : "md:opacity-30"
              }`}
            >
              {/* Mobile: image sits inline since there's no pinned column */}
              <img
                src={p.image}
                alt={p.title}
                className="mb-6 aspect-[4/5] w-full rounded-3xl object-cover md:hidden"
              />

              <p className="text-[1rem] text-black">
                {p.category}
                <span className="mx-3 text-[0.7rem] opacity-20">•</span>
                {fmtDate(p.publishedAt)}
              </p>

              <h3 className="font-display mt-4 text-[clamp(30px,3vw,46px)] font-normal leading-[1.1] tracking-tight">
                {p.title}
              </h3>

              {/* "excerpt" is an assumed field name: rename to match your Insight type */}
              <p className="mt-5 max-w-[42ch] text-[clamp(14px,1.2vw,17px)] leading-[1.7] text-black/70">
                {p.excerpt}
              </p>

              <Link
                href={`/insights/${p.slug}`}
                className="group mt-8 flex w-fit items-center gap-2 text-md text-black"
              >
                Read article
                <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}

          <div className="hidden h-[25vh] md:block" />
        </div>
      </div>
    </section>
  );
}
