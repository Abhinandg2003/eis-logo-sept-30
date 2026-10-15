import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";

export type BentoItem = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  image?: string;
  bg: string;      // main pastel fill
  frame: string;   // CHANGED: layer under the fill, any CSS background (use a linear-gradient)
  arrow: string;   // NEW: arrow circle color
  color: string;   // text and icon color
  span?: string;
  href?: string;
};

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function BentoGrid({
  items,
  className = "",
}: {
  items: BentoItem[];
  className?: string;
}) {
  return (
    <div
      className={`mx-auto grid max-w-[90vw] auto-rows-[16vh] grid-cols-1 gap-4 md:grid-cols-6 ${className}`}
    >
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href ?? "#"}
          style={{ color: item.color }}
          className={`group relative flex min-h-[260px] flex-col overflow-hidden rounded-3xl p-7 md:min-h-0 ${item.span ?? ""}`}
        >
          {/* Bottom layer: gradient frame, hidden at rest, fades in on hover */}
<span
  aria-hidden
  style={{ background: item.frame }}
  className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${EASE} group-hover:opacity-100`}
/>

{/* Top layer: main fill, shrinks on hover so the frame shows around it */}
<span
  aria-hidden
  style={{ background: item.bg }}
  className={`absolute inset-0 rounded-3xl transition-all duration-500 ${EASE} group-hover:inset-1 group-hover:rounded-[20px]`}
/>

         <span
  style={{ background: item.arrow }}
  className="absolute right-5 top-5 z-10 flex size-9 items-center justify-center overflow-hidden rounded-full"
>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${EASE} group-hover:translate-x-full`}
            >
              <FiArrowRight aria-hidden />
            </span>
            <span
              className={`absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-500 ${EASE} group-hover:translate-x-0`}
            >
              <FiArrowRight aria-hidden />
            </span>
          </span>

          {/* Content */}
          <div className="relative z-10 flex items-center gap-2.5 pr-12">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-2xl font-medium">{item.title}</h3>
          </div>
          <p className="relative z-10 mt-2 max-w-[44ch] text-[1.05rem] leading-snug opacity-80">
            {item.subtitle}
          </p>

          {item.image && (
            <div className="relative z-10 mt-6 min-h-0 flex-1">
              <img
                src={item.image}
                alt={item.image}
                className={`mx-auto h-full -mb-5  object-cover  mt-8 min-w-[80%] overflow-visible origin-top transition-transform duration-700 ${EASE} group-hover:scale-102`}
              />
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}