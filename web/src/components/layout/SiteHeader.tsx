"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPaw } from "react-icons/fa6";
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
    <header className="sticky top-0 z-50 bg-elk-tan/95 backdrop-blur supports-[backdrop-filter]:bg-elk-tan/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-heading text-xl font-bold tracking-wide text-elk-gold-deep"
        >
          <FaPaw aria-hidden="true" />
          {settings?.title ?? "Elm Lodge Kennels"}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-7 text-sm font-medium text-zinc-600">
            {links.map((link) => (
              <li key={link.slug}>
                <Link href={hrefFor(link)} className="transition hover:text-elk-accent-deep">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
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
        className="border-t border-zinc-300/50 px-6 pb-4 md:hidden"
      >
        <ul className="flex flex-col gap-3 pt-3 text-sm font-medium text-zinc-600">
          {links.map((link) => (
            <li key={link.slug}>
              <Link href={hrefFor(link)} onClick={() => setOpen(false)} className="block py-1">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
