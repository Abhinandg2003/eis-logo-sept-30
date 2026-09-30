import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10">
      <div className="container-x flex flex-col gap-4 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.fullName}. {/* PLACEHOLDER: legal entity name */}</p>
        <div className="flex gap-5">
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-neutral-900">{l.label}</Link>
          ))}
          {/* PLACEHOLDER: add Privacy / Terms / Contact links */}
        </div>
      </div>
    </footer>
  );
}
