import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScenarioDemo } from "@/components/home/ScenarioDemo";
import { InsightCard } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { insights } from "@/lib/cms";
import { site } from "@/lib/site";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { ScrollPoints } from "@/components/home/ScrollPoints";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { RollingNumber } from "@/components/home/RollingNumber";

const values = [
  {
    value: "1M+",
    sub: "API calls per day",
  },

  {
    value: "<200 MS",
    sub: "Latency",
  },

  {
    value: "5+",
    sub: "Model families",
  },
];

// All copy below is PLACEHOLDER: edit freely.
const views = [
  {
    title: "For employees",
    text: "See how you approach hard calls. Your score is a mirror for reflection and growth, not a ranking.",
  },
  {
    title: "For employers",
    text: "See patterns across scenarios: how people prioritise, communicate and handle trade-offs. Signals, not verdicts.",
  },
];
const steps = [
  {
    title: "A scenario appears",
    text: "Realistic, ambiguous situations drawn from real workplaces.",
  },
  {
    title: "Someone responds",
    text: "There is no single right answer. Every choice is meaningful.",
  },
  {
    title: "The score updates",
    text: "Each response moves several dimensions, read from either point of view.",
  },
];

const three = [
  {
    title: "Behavioural",
  },
  {
    title: "Contextual",
  },
  {
    title: "Capability",
  },
];

// Button styles. Add your own and reference them by name in `plans`.
const ctaStyles: Record<string, string> = {
  dark: "bg-black text-white hover:bg-neutral-800",
  outline: "border border-black/20 text-black hover:bg-black/5",
  brand: "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-ink)]",
};


// Cards in "Choose how to get started". Edit the copy here, not in the JSX.
const plans = [
  {
    title: "Build on your own",
    intro: "Launch your AI-powered product with:",
    ctas:   [{ label: "Book a demo", href: "#", variant: "brand" }],
    href: "#", // PLACEHOLDER
    points: [
      "Access to all Grok models",
      "Usage-based pricing",
      "Automatically increasing rate limits",
      "Comprehensive documentation and guides",
    ],
  },
  {
    title: "Work with our team", // PLACEHOLDER
    intro: "Scale with enterprise support and security:", // PLACEHOLDER
    ctas: [
  { label: "Contact sales", href: "#", variant: "dark" }   // PLACEHOLDER
     // PLACEHOLDER
],
    points: [
      "Dedicated onboarding support",
      "Custom rate limits",
      "Single sign-on and audit logging",
      "Data residency options",
    ],
  },
];

// Stats row. Edit the numbers and labels here.
const stats = [
  { value: "400M+", label: "queries processed daily" },
  { value: "200K", label: "GPUs in Colossus" },
  { value: "122", label: "Days to build in Colossus" },
];

const delay = (n: number) => ({ "--i": n }) as React.CSSProperties; // stagger for .rise

export default async function Home() {
  const latest = (await insights.list()).slice(0, 4); // CMS provider (static for now)

  return (
    <>
      {/* Hero: text + interactive scenario */}
      <section className="section h-auto !pt-0 sm:!pt-0 !pb-0">
        {/* <div className="h-[140vh] absolute top-0 opacity-10 w-full bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,#FFA022_0%,#FFA022_10%,#fff_70%)]" /> */}
        <div className="container-x flex flex-col items-center gap-12 pt-10 lg:grid-cols-2 lg:gap-16  justify-center mx-auto">
          <div className=" !flex !flex-col !items-center !justify-center pt-5">
            <div className="flex gap-2 relative items-center pl-3 pr-[0.4rem] py-[0.4rem] border border-black/8 rounded-full mb-10">
              <p className="rounded-full bg-[var(--color-brand)]/10 text-[0.8rem] text-[var(--color-brand)] px-2">
                New
              </p>
              <p className="flex items-center gap-2 text-center text-[0.9rem] ">
                Meet Ei 1.1 <span className="font-light">Our new model</span>{" "}
                <MdOutlineArrowOutward className="bg-black/5 h-[25px] w-[25px] rounded-full p-[0.4rem] text-sm " />
              </p>
            </div>
            <h1 className="h-display !text-center !flex !justify-center rise">
              Measure how people decide, not just what they know.
            </h1>
            <p
              className="lead !text-black text-center rise mt-6"
              style={delay(1)}
            >
              {site.fullName} Measure how people make better decisions.
            </p>
            <div
              className="rise mt-8 mb-10 flex flex-wrap gap-3"
              style={delay(2)}
            >
              <Button className="group" asChild>
                <Link href={site.cta.href}>
                  {site.cta.label}{" "}
                  <span className="ml-1 my-auto justify-center flex items-center">
                    {" "}
                    <IoIosArrowRoundForward className="group-hover:translate-x-1 ease-out transition-all duration-200" />
                  </span>
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/insights">Read insights</Link>
              </Button>
            </div>

            <div className="w-[70%] rounded-3xl h-[60vh] mt-10  overflow-hidden">
              <img
                src="/images/hero.jpg"
                className="w-full object-cover "
                alt=""
              />
            </div>
          </div>
          <div className="rise" style={delay(3)}>
            {/* <ScenarioDemo /> */}
          </div>
        </div>
      </section>

      {/* Two points of view */}
      {/* <section className="section  bg-neutral-50">
        <div className="container-x">
          <h2 className="h-section max-w-[24ch]">
            One score, two ways of reading it
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {views.map((v) => (
              <div key={v.title} className="surface p-7">
                <h3 className="font-display text-xl font-semibold">
                  {v.title}
                </h3>
                <p className="mt-3 leading-relaxed text-neutral-600">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How it works: a real sequence, so numbering is meaningful here */}
      <div className="my-5 mx-auto !max-w-[90vw]">
        <section className="section h-[80vh]  !mx-auto flex items-center">
          <div className="container-x !px-0">
            <div className="grid grid-cols-2 w-full ">
              <div>
                <p className="text-start text-black/50 text-sm mb-3">
                  The new Standard
                </p>
                <h2 className="h-section !text-start !text-5xl font-normal">
                  One Test <br /> Every Aspect
                </h2>
                {/* <ScrollPoints points={three} /> */}

                <p className="text-md text-black mt-5 pr-40">
                  Text, code, voice, images, and video — all through a single
                  unified API. Start building in seconds.
                </p>

                <div
                  className="rise mt-8 mb-10 flex flex-wrap gap-3"
                  style={delay(2)}
                >
                  <Button className="group" asChild>
                    <Link href={site.cta.href}>
                      {site.cta.label}{" "}
                      <span className="ml-1 my-auto justify-center flex items-center">
                        {" "}
                        <IoIosArrowRoundForward className="group-hover:translate-x-1 ease-out transition-all duration-200" />
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/insights">Read insights</Link>
                  </Button>
                </div>

                <div className="flex gap-8 w-full">
                  {values.map((p) => (
                    <div key={p.value} className="flex flex-col">
                      <p className="text-[.9rem] font-medium">{p.value}</p>
                      <p className="text-[0.8rem] font-normal text-black/30">
                        {p.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black relative h-full w-full ">
                <div>
                  <img
                    src="/images/eyes.jpg"
                    className="object-cover  absolute inset-0 h-full w-full  z-1"
                    alt=""
                  />
                  <div className="absolute left-0 bottom-0  bg-white h-4 w-4 z-5"></div>
                  <div className="absolute left-4 bottom-4  bg-white h-4 w-4 z-5"></div>

                  <div className="absolute left-0 top-0  bg-white h-4 w-4 z-5"></div>
                  <div className="absolute left-4 top-4  bg-white h-4 w-4 z-5"></div>

                  <div className="absolute right-0 top-0  bg-white h-4 w-4 z-5"></div>
                  <div className="absolute right-4 top-4  bg-white h-4 w-4 z-5"></div>

                  <div className="absolute right-0 bottom-0  bg-white h-4 w-4 z-5"></div>
                  <div className="absolute right-4 bottom-4  bg-white h-4 w-4 z-5"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-[80vw] mb-40 mx-auto">
  <div className="flex justify-between border-y border-black/10 py-10">
    {stats.map((s, i) => (
      <div
        key={s.label}
        // The first column has no left border or padding; the others keep your divider
        className={`flex min-w-[25vw] flex-col justify-start gap-3 ${i > 0 ? "border-l border-black/10 pl-10" : ""}`}
      >
        {/* text-5xl sets the size. The roll scales with it automatically */}
        <p className="text-5xl">
          <RollingNumber value={s.value} delay={i * 0.15} />
        </p>
        <p className="text-[0.9rem] text-black/70">{s.label}</p>
      </div>
    ))}
  </div>
</section>

      {/* Latest insights (from CMS layer) */}
      <section className="section  !pt-0 ">
        <div className="container-xc !px-0 !max-w-[80vw] mx-auto !py-25 border-b border-black/10">
          <div className="flex items-end justify-between gap-4 !mb-10">
            <h2 className="h-section  !font-normal ">Latest news</h2>
            <Link
              href="/insights"
              className="text-sm flex items-center gap-1 text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
            >
              View all <IoIosArrowForward />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p) => (
              <InsightCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* <CtaBand /> */}

      <section className="mt-10 ">
        <div className="max-w-[80vw] mx-auto mb-20 ">
          <h2 className="h-section text-center  mb-10 !font-normal ">
            Choose how to get started
          </h2>

          <div className="flex flex-col gap-5 md:flex-row">
  {plans.map((plan) => (
    <div
      key={plan.title}
      className="flex min-h-[60vh] w-full flex-col gap-4 rounded-xl bg-[#F9F8F6] p-[3vw]"
    >
      <h3 className="text-start text-2xl text-black">{plan.title}</h3>
      <p className="text-md w-full border-b border-black/10 pb-7">{plan.intro}</p>

      {/* The list sits between the heading and the CTA */}
      <ul className="flex flex-col gap-3 pt-3">
        {plan.points.map((pt) => (
          <li key={pt} className="flex items-start gap-3 text-[0.9rem] text-black font-light">
            {/* Tick before each point. Change the colour class to text-black for pure monochrome */}
            <IoMdCheckmark aria-hidden className="mt-1 shrink-0 text-black/30" />
            {pt}
          </li>
        ))}
      </ul>

      {/* mt-auto pushes the CTA to the bottom of the card */}
      {/* mt-auto keeps the buttons at the bottom of the card */}
<div className="mt-auto flex flex-col gap-2">
  {plan.ctas.map((c) => (
    <a
      key={c.label}
      href={c.href}
      className={`w-full rounded-full px-[18px] py-[10px] text-center text-[.875rem] transition-colors ${ctaStyles[c.variant]}`}
    >
      {c.label}
    </a>
  ))}
</div>
    </div>
  ))}
</div>
        </div>
      </section>
    </>
  );
}
