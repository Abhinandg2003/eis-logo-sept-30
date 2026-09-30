import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScenarioDemo } from "@/components/home/ScenarioDemo";
import { InsightCard } from "@/components/insights/InsightCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { insights } from "@/lib/cms";
import { site } from "@/lib/site";
import { IoIosArrowRoundForward } from "react-icons/io";


// All copy below is PLACEHOLDER: edit freely.
const views = [
  { title: "For employees", text: "See how you approach hard calls. Your score is a mirror for reflection and growth, not a ranking." },
  { title: "For employers", text: "See patterns across scenarios: how people prioritise, communicate and handle trade-offs. Signals, not verdicts." },
];
const steps = [
  { title: "A scenario appears", text: "Realistic, ambiguous situations drawn from real workplaces." },
  { title: "Someone responds", text: "There is no single right answer. Every choice is meaningful." },
  { title: "The score updates", text: "Each response moves several dimensions, read from either point of view." },
];
const delay = (n: number) => ({ "--i": n }) as React.CSSProperties; // stagger for .rise

export default async function Home() {
  const latest = (await insights.list()).slice(0, 3); // CMS provider (static for now)

  return (
    <>
      {/* Hero: text + interactive scenario */}
      <section className="section h-[100vh] !pt-7 sm:!pt-10">
        {/* <div className="h-[140vh] absolute top-0 opacity-10 w-full bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,#FFA022_0%,#FFA022_10%,#fff_70%)]" /> */}
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16  justify-start items-start">
          <div className=" !flex !flex-col !items-start !justify-start pt-15">
            <h1 className="h-display rise">Measure how people decide, not just what they know.</h1>
            <p className="lead !text-black rise mt-6" style={delay(1)}>
              {site.fullName}Employee Index Scoring puts people in realistic situations, where every response reveals a measurable score.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={delay(2)}>
              <Button asChild><Link href={site.cta.href}>{site.cta.label} <span className="ml-1 my-auto justify-center flex items-center"> <IoIosArrowRoundForward/></span></Link></Button>
              <Button asChild variant="outline"><Link href="/insights">Read insights</Link></Button>
            </div>
          </div>
          <div className="rise" style={delay(3)}><ScenarioDemo /></div>
        </div>
      </section>

      {/* Two points of view */}
      <section className="section border-t border-neutral-200 bg-neutral-50">
        <div className="container-x">
          <h2 className="h-section max-w-[24ch]">One score, two ways of reading it</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {views.map((v) => (
              <div key={v.title} className="surface p-7">
                <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-neutral-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works: a real sequence, so numbering is meaningful here */}
      <section className="section">
        <div className="container-x">
          <h2 className="h-section">How it works</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-neutral-900 pt-5">
                <span className="text-sm font-medium text-brand">Step {i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-neutral-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Latest insights (from CMS layer) */}
      <section className="section !pt-0">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <h2 className="h-section">Latest insights</h2>
            <Link href="/insights" className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline">View all</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => <InsightCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
