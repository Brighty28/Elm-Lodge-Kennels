"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavLink, SiteSettings } from "@/sanity/types";

function hrefFor(link: NavLink) {
  if (link._type === "homePage") return "/";
  if (link._type === "priceList") return "/prices";
  if (link._type === "articleIndex") return "/news";
  return `/${link.slug}`;
}

export default function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const [open, setOpen] = useState(false);
  const links = settings?.primaryNavigation ?? [];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-elk-heading"
        >
          {settings?.title ?? "Elm Lodge Kennels"}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          <ul className="flex gap-7 text-sm font-medium text-zinc-500">
            {links.map((link) => (
              <li key={link.slug}>
                <Link href={hrefFor(link)} className="transition hover:text-elk-heading">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            className="rounded-full bg-elk-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-elk-forest-mid"
          >
            Book Now
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-zinc-700 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-zinc-700 transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-zinc-700 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-zinc-100 px-6 pb-4 md:hidden"
      >
        <ul className="flex flex-col gap-3 pt-3 text-sm font-medium text-zinc-600">
          {links.map((link) => (
            <li key={link.slug}>
              <Link href={hrefFor(link)} onClick={() => setOpen(false)} className="block py-1">
                {link.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full bg-elk-forest px-5 py-2 text-sm font-semibold text-white transition hover:bg-elk-forest-mid"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
