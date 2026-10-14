import Link from "next/link";
import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import ArrowButton from "@/components/ui/Arrowbutton";
import { site } from "@/lib/site";

// Edit links here. Add a page by adding a line.
const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Why EIF", href: "/about" },
      { label: "Latest news", href: "/insights" },
    ],
  },
  {
    title: "Legal", // PLACEHOLDER: point these at real pages once they exist
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },   // PLACEHOLDER urls
  { label: "X", href: "#", icon: FaXTwitter },
  { label: "Instagram", href: "#", icon: FaInstagram },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-black/10 bg-[#fdfdfd]">
      <div className="mx-auto max-w-[80vw] px-5 pb-8 pt-16">
        {/* Top: brand + pitch + columns */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex max-w-sm flex-col items-start gap-5">
            <img
              src="/images/eis-logo-apple-podcast-text.png"
              className="h-14 w-auto"
              alt={site.name}
            />
            <p className="text-[0.95rem] leading-relaxed text-neutral-600">
              Measure how people decide, not just what they know. Scenario-based
              insights for employees and employers.
            </p>
            <ArrowButton href={site.cta.href} variant="ghost" className="!px-5 !py-2.5 !text-sm">
              {site.cta.label}
            </ArrowButton>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-medium text-neutral-900">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-neutral-500 transition-colors duration-300 hover:text-neutral-900"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-black/10 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-black/5 text-neutral-600 transition-all duration-300 hover:bg-[var(--color-brand)] hover:text-white"
              >
                <Icon aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}