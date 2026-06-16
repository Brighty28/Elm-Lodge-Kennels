import Link from "next/link";
import type { NavLink, SiteSettings } from "@/sanity/types";

function hrefFor(link: NavLink) {
  if (link._type === "homePage") return "/";
  if (link._type === "priceList") return "/prices";
  if (link._type === "articleIndex") return "/news";
  return `/${link.slug}`;
}

export default function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const links = settings?.primaryNavigation ?? [];

  return (
    <header className="bg-elk-tan text-center">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <Link
          href="/"
          className="font-heading text-2xl font-bold tracking-wide text-elk-gold normal-case"
        >
          {settings?.title ?? "Elm Lodge Kennels"}
        </Link>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Exercise Paddock - Private Walks - Undercover Runs
        </p>
        <nav className="mt-4">
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium uppercase text-zinc-500">
            {links.map((link) => (
              <li key={link.slug}>
                <Link href={hrefFor(link)} className="hover:text-elk-accent">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
