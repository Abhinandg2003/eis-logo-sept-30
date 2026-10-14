"use client";
import { useState } from "react";
import ArrowButton from "@/components/ui/Arrowbutton";
import { cn } from "@/lib/utils";

export type Testimonial = {
  name: string;
  position: string;
  photo: string;      // e.g. "/images/testimonials/priya.jpg"
  quote: string;
  stat: string;       // e.g. "42%"
  statLabel: string;  // explanation under the stat
  ctaLabel: string;
  href: string;
};



// PLACEHOLDER CONTENT: edit freely. Add or remove cards here.
const TESTIMONIALS: Testimonial[] = [
  { name: "Priya Nair", position: "Head of People, Northwind", photo: "https://img.magnific.com/free-photo/woman-doing-close-up-photoshoot-studio_53876-14476.jpg?semt=ais_hybrid&w=740&q=80",
    quote: "We finally see how our managers decide under pressure, not just what they say in interviews.",
    stat: "42%", statLabel: "42% faster promotion decisions after rolling out EIS", ctaLabel: "Read the story", href: "#" },
  { name: "Daniel Okafor", position: "VP Operations, Lumen Freight", photo: "https://img.magnific.com/free-photo/young-male-posing-isolated-against-blank-studio-wall_273609-12356.jpg?semt=ais_hybrid&w=740&q=80",
    quote: "The scenarios feel like real Mondays. People engaged with them instead of rushing through a test.",
    stat: "3.1x", statLabel: "3.1x higher completion rate than our old assessment", ctaLabel: "Read the story", href: "#" },
  { name: "Meera Iyer", position: "CHRO, Kestrel Health", photo: "https://img.magnific.com/premium-photo/portrait-young-beautiful-cute-cheerful-girl-smiling-gray-wall_136354-3057.jpg?semt=ais_hybrid&w=740&q=80",
    quote: "The results gave our leaders a language for judgement calls. Coaching conversations got specific.",
    stat: "28%", statLabel: "28% drop in regretted hires within the first year", ctaLabel: "Read the story", href: "#" },
  { name: "Tom Becker", position: "Talent Lead, Arcadia", photo: "https://img.magnific.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?semt=ais_hybrid&w=740&q=80",
    quote: "It surfaced strengths we would have missed on a CV. Two of our best hires came from it.",
    stat: "6 wks", statLabel: "saved 6 weeks per hiring cycle on average", ctaLabel: "Read the story", href: "#" },
  { name: "Aisha Rahman", position: "COO, Brightpath", photo: "https://img.magnific.com/premium-photo/headshot-portrait-happy-millennial-indian-woman-look-camera-posing-own-house-apartment-profile-picture-smiling-young-mixed-race-female-renter-tenant-rent-real-estate-concept_656932-3507.jpg?semt=ais_hybrid&w=740&q=80",
    quote: "Employees see their own score as a mirror, not a ranking. That changed how they talk about growth.",
    stat: "91%", statLabel: "91% of employees said the feedback was useful", ctaLabel: "Read the story", href: "#" },
  { name: "Lucas Martin", position: "Director of L&D, Halden", photo: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    quote: "Setup took days, not months, and the insights were in front of our leadership team the same week.",
    stat: "5 days", statLabel: "5 days from kickoff to the first team report", ctaLabel: "Read the story", href: "#" },
];

const STAY_MS = 3000;  // how long a card rests before sliding on
const SLIDE_MS = 900;  // slide duration
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; // fast start, soft magnetic settle
const GAP = "1.25rem";
const CARD_W = "40%";


export function TestimonialCarousel({
  items = TESTIMONIALS,
  className,
}: {
  items?: Testimonial[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Customer stories"
      className={cn("mx-auto w-full ", className)}

    >
      <div className="overflow-hidden">
        <div
          className="flex w-full"
          style={{
            gap: GAP,
            transform: `translateX(calc((100% - ${CARD_W}) / 2 - ${index} * (${CARD_W} + ${GAP})))`,
            transition: `transform ${SLIDE_MS}ms ${EASE}`,
          }}
        >
          {items.map((t, i) => (
            <article
              key={t.name}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              onFocusCapture={() => { setIndex(i); setPaused(true); }}
              onBlurCapture={() => setPaused(false)}
              className={cn(
  "flex h-[60vh] min-h-[360px] flex-none flex-col rounded-3xl border border-[#cfe0ff] bg-[#eaf2ff]/80 p-3",
  i === index ? "bg-[#eaf2ff]/80" : "bg-[#fbeaff]/50"
)}
              style={{ width: CARD_W, transition: `opacity ${SLIDE_MS}ms ${EASE}` }}
            >
              {/* Photo fills the free space */}
              <div className="flex h-[30%] min-h-0 gap-4">
  {/* Square photo: the height comes from the row, the width follows from aspect-square */}
  <div className="aspect-square h-full flex-none overflow-hidden rounded-2xl bg-white/60">
    <img src={t.photo} alt="" className="h-full w-full object-cover" />
  </div>

  {/* Name and position take all the remaining width */}
  <div className="flex min-w-0 flex-1 flex-col justify-center px-2">
    <p className="text-lg font-medium text-[#273145]">{t.name}</p>
    <p className="text-sm font-medium text-[#273145]/80">{t.position}</p>
  </div>
</div>
              {/* Name and position */}
              

              {/* Quote | stat, separated by low-opacity borders */}
              <div className="grid  md:grid-cols-2">
                <blockquote className="px-3 py-6 text-xl leading-snug text-[#273145] md:pr-8 lg:text-xl">
                  “{t.quote}”
                </blockquote>

                <div className="flex flex-col items-start gap-2  px-3 py-6  md:pl-8">
                  <p className="text-6xl font-normal text-[#273145] tracking-tight tabular-nums lg:text-6xl">
                    {t.stat}
                  </p>
                  <p className="max-w-[32ch] text-md text-[#273145]/80">{t.statLabel}</p>
                  <ArrowButton href={t.href} className="mt-3 ">
                    {t.ctaLabel}
                  </ArrowButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Indicator: dots, current one is a pill that fills as it counts down */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((t, i) => {
          const active = i === index;
          return (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to story ${i + 1}`}
              aria-current={active}
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-2.5 overflow-hidden rounded-full transition-[width,background-color] duration-700",
                active ? "w-14 bg-[#d6e4ff]" : "w-2.5 bg-black/15 hover:bg-black/30"
              )}
              style={{ transitionTimingFunction: EASE }}
            >
              {active && (
                <span
                  // key restarts the fill whenever the active card changes
                  key={index}
                  className="carousel-fill absolute inset-0 origin-left rounded-full bg-[#2f6bff]"
                  style={{
                    animation: `carousel-fill ${STAY_MS}ms linear ${SLIDE_MS}ms both`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                  onAnimationEnd={next}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}