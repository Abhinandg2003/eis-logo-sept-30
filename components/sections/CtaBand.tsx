import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

// Dark closing band. id="join" is the temporary target of the navbar CTA.
export function CtaBand() {
  return (
    <section id="join" className="pb-20 sm:pb-28">
      <div className="container-x">
        <div className="rounded-3xl bg-neutral-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={{ textWrap: "balance" }}>
            Find out how your team really decides.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-neutral-400">
            Start free. {/* PLACEHOLDER: pricing / plan details */}
          </p>
          <Button asChild className="mt-8">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
