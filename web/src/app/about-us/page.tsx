import Image from "next/image";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Page, SiteSettings } from "@/sanity/types";
import RichText from "@/components/ui/RichText";
import LocationMap from "@/components/sections/LocationMap";

export const metadata: Metadata = {
  title: "About Us | Elm Lodge Kennels",
  description: "Learn about Elm Lodge Kennels — a family-run 5-star pet retreat in Retford, Nottinghamshire.",
};

const STOCK_HERO =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80";

/* Default directions shown until a Content Panel is added in Sanity */
const DEFAULT_DIRECTIONS = {
  heading: "Directions from the Cromwell Rd Roundabout",
  steps: [
    "Take the 3rd exit onto Redmoor Ln.",
    "Keep right to continue toward Belt Drove.",
    "Turn right onto Belt Drove.",
    "We are approximately 300 yards along the road.",
  ],
};

export default async function AboutUsPage() {
  const [page, settings] = await Promise.all([
    client.fetch<Page | null>(pageBySlugQuery, { slug: "about-us" }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  const hasContentPanels = (page?.contentPanels?.length ?? 0) > 0;

  return (
    <div className="bg-elk-cream">
      {/* Hero banner */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <Image
          src={STOCK_HERO}
          alt="A group of happy dogs running together through green fields"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 px-8 py-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">About Us</h1>
        </div>
      </div>

      {/* Body — always two columns on md+ */}
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">

        {/* ── LEFT sidebar: directions card ──────────────────── */}
        <aside className="space-y-6">
          {hasContentPanels ? (
            page!.contentPanels!.map((panel, i) => (
              <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                {panel.heading && (
                  <p className="mb-3 text-sm font-semibold italic leading-snug text-elk-gold">
                    {panel.heading}
                  </p>
                )}
                <div className="text-sm leading-relaxed text-elk-body">
                  <RichText value={panel.content} />
                </div>
              </div>
            ))
          ) : (
            /* Fallback directions card until Sanity is populated */
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold italic leading-snug text-elk-gold">
                {DEFAULT_DIRECTIONS.heading}
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-elk-body">
                {DEFAULT_DIRECTIONS.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* ── RIGHT: body text + map ─────────────────────────── */}
        <main>
          {page?.bodyText ? (
            <div className="prose prose-sm prose-zinc max-w-none leading-relaxed text-elk-body">
              <RichText value={page.bodyText} />
            </div>
          ) : (
            <div className="space-y-4 text-sm leading-relaxed text-elk-body">
              <p>
                We are open Monday to Sunday. Please do not arrive after 8pm. We charge for
                day of arrival and day of collection. However, there is a reduction for
                multiple dogs and any pet not collected by 5pm will be subject to a charge
                of one extra day&apos;s boarding.
              </p>
              <p>
                Payment may be made by cheque accompanied by a cheque guarantee card or cash.
              </p>
              <p>Please contact us to arrange a visit.</p>
            </div>
          )}

          {settings?.latitude && settings?.longitude && (
            <div className="mt-10">
              <LocationMap
                latitude={settings.latitude}
                longitude={settings.longitude}
                address={settings.address}
              />
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
