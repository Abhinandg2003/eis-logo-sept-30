import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: `About ${site.fullName}.` };

// PLACEHOLDER copy throughout.
const principles = [
  { title: "Many right answers", text: "Work rarely has one correct move. We score the reasoning, not a key." },
  { title: "Both sides of the desk", text: "The same responses are framed for the person who gave them and for the team around them." },
  { title: "Context over trivia", text: "Scenarios reveal priorities that knowledge tests can't reach." },
];

export default function About() {
  return (
    <>
      <section className="section !pb-12">
        <div className="container-x">
          <h1 className="h-display max-w-[20ch] rise">We built EIS to see what résumés and reviews miss.</h1>
          <p className="lead rise mt-6" style={{ "--i": 1 } as React.CSSProperties}>
            PLACEHOLDER: Tell the story behind {site.fullName}: who it's for, the problem with how people are assessed today, and what you're changing.
          </p>
        </div>
      </section>
      <section className="pb-20 sm:pb-28">
        <div className="container-x grid gap-4 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="surface p-7">
              <h2 className="font-display text-lg font-semibold">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-neutral-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
