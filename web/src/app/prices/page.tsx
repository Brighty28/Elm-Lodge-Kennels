import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { priceListQuery } from "@/sanity/queries";
import type { PriceList } from "@/sanity/types";
import RichText from "@/components/ui/RichText";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prices | Elm Lodge Kennels",
  description: "Transparent, competitive pricing for boarding, daycare, and grooming at Elm Lodge Kennels.",
};

function IconPaw() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-elk-gold-light">
      <path d="M12 13.5c-2.33 0-7 1.17-7 3.5v1.5h14V17c0-2.33-4.67-3.5-7-3.5zm-3.5-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1 5c.34 0 .67.02 1 .05a3.9 3.9 0 0 0-1.5 1.2A5.4 5.4 0 0 0 5 17.1V18H2v-1.5c0-2.33 2.67-3.5 5.5-3.5zm9 0c2.83 0 5.5 1.17 5.5 3.5V18h-3v-.9a5.4 5.4 0 0 0-2-2.35 3.9 3.9 0 0 0-1.5-1.2c.33-.03.66-.05 1-.05zm1-5a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-8-2a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
    </svg>
  );
}

export default async function PricesPage() {
  const prices = await client.fetch<PriceList | null>(priceListQuery);

  return (
    <div className="bg-elk-cream">
      {/* Page header */}
      <div className="bg-elk-forest px-6 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elk-gold">Transparent Pricing</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          {prices?.title ?? "Our Prices"}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-300">
          All prices are per night unless otherwise stated. Discounts available for multiple pets.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

          {/* Body text */}
          {prices?.mainContent && (
            <div className="order-2 lg:order-1 prose prose-sm prose-zinc max-w-none leading-relaxed text-elk-body">
              <RichText value={prices.mainContent} />
            </div>
          )}

          {/* Price list card — matches Opening Hours widget style */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl bg-elk-forest p-8 text-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-white/10 pb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-elk-gold-light">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path strokeLinecap="round" d="M16 3v4M8 3v4" />
                </svg>
                <h2 className="text-lg font-bold text-white">
                  {prices?.tableTitle ?? "Price List – Per Night"}
                </h2>
              </div>

              {prices?.rows && prices.rows.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {prices.rows.map((row, i) => (
                    <li key={i} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-sm text-zinc-300">
                        <IconPaw />
                        {row.label}
                      </span>
                      <span className="shrink-0 font-semibold text-white">{row.price}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-zinc-400">
                  Pricing information coming soon. Please{" "}
                  <Link href="/contact-us" className="underline underline-offset-2 hover:text-white">
                    contact us
                  </Link>{" "}
                  for a quote.
                </p>
              )}

              {prices?.rows?.some((r) => r.notes) && (
                <ul className="mt-5 space-y-1 border-t border-white/10 pt-5">
                  {prices.rows.filter((r) => r.notes).map((row, i) => (
                    <li key={i} className="text-xs italic leading-relaxed text-zinc-400">
                      {row.label}: {row.notes}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/book"
                className="inline-block rounded-full bg-elk-forest px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-elk-forest-mid"
              >
                Book a Stay
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
