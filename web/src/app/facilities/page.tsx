import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageBySlugQuery, priceListQuery } from "@/sanity/queries";
import type { Page, PriceList } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/ui/RichText";

export const metadata: Metadata = {
  title: "Facilities | Elm Lodge Kennels",
  description: "Tour our modern, purpose-built facilities — undercover runs, exercise paddocks, and a state-of-the-art reception area.",
};

/* Small dog silhouette for price rows */
function IconDog() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-elk-gold-light">
      <path d="M4.5 11h-.7L2 7.5 3.5 6l.8 1.6H5l.8-3.2h3.5L10 6l3-2 1.5 1-1.2 2.4h1.2l1.2-1 .8 1.3L14.5 10H13v6h-1.5v-3.5h-3V16H7v-6H4.5Zm7-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
    </svg>
  );
}

export default async function FacilitiesPage() {
  const [page, prices] = await Promise.all([
    client.fetch<Page | null>(pageBySlugQuery, { slug: "facilities" }),
    client.fetch<PriceList | null>(priceListQuery),
  ]);

  const facilities = page?.facilities ?? [];
  const features = page?.featuresList ?? [];

  return (
    <div className="bg-elk-cream">
      {/* Page title bar */}
      <div className="bg-elk-forest px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elk-gold">
            Explore the Retreat
          </p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            {page?.title ?? "Our Facilities"}
          </h1>
        </div>
      </div>

      {/* Two-column body */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[280px_1fr]">

        {/* ── LEFT sidebar: sticky price list ──────────────────── */}
        <aside>
          <div className="sticky top-24 rounded-2xl bg-elk-forest p-7 text-white shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 text-elk-gold-light">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path strokeLinecap="round" d="M16 3v4M8 3v4" />
              </svg>
              <h2 className="text-sm font-bold text-white">
                {prices?.tableTitle ?? "Price List – Per Night"}
              </h2>
            </div>

            {prices?.rows && prices.rows.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {prices.rows.map((row, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-zinc-300">
                      <IconDog />
                      {row.label}
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-white">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-zinc-400">
                <Link href="/contact-us" className="underline underline-offset-2 hover:text-white">
                  Contact us
                </Link>{" "}
                for pricing.
              </p>
            )}

            <Link
              href="/book"
              className="mt-6 block rounded-full border border-elk-gold-light px-5 py-2.5 text-center text-sm font-semibold text-elk-gold-light transition hover:border-elk-gold hover:bg-elk-gold hover:text-white"
            >
              Book a Stay
            </Link>
          </div>
        </aside>

        {/* ── RIGHT: alternating facility sections ──────────────── */}
        <main className="space-y-16">
          {page?.bodyText && (
            <div className="prose prose-sm prose-zinc max-w-none leading-relaxed text-elk-body">
              <RichText value={page.bodyText} />
            </div>
          )}

          {/* Facilities (each with its own images array) */}
          {facilities.map((facility, i) => {
            const imgs = facility.images ?? [];
            const isImgLeft = i % 2 === 0;
            return (
              <section key={i} className="grid items-center gap-8 sm:grid-cols-2">
                {/* Image column */}
                {imgs.length > 0 && (
                  <div className={isImgLeft ? "" : "sm:order-2"}>
                    {imgs.length === 1 ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
                        <Image
                          src={urlForImage(imgs[0]).width(560).height(420).url()}
                          alt={facility.title ?? ""}
                          fill
                          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {imgs.slice(0, 4).map((img, j) => (
                          <div key={j} className="relative aspect-square overflow-hidden rounded-xl shadow-sm">
                            <Image
                              src={urlForImage(img).width(300).height(300).url()}
                              alt={`${facility.title} – ${j + 1}`}
                              fill
                              sizes="25vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Text column */}
                <div className={isImgLeft ? "" : "sm:order-1"}>
                  <h2 className="text-2xl font-bold text-elk-heading">{facility.title}</h2>
                  {facility.description && (
                    <div className="mt-3 text-sm leading-relaxed text-elk-body">
                      <RichText value={facility.description} />
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Feature items (single-image fallback when facilities[] is empty) */}
          {facilities.length === 0 && features.map((f, i) => {
            const desc = (() => {
              const block = f.description?.[0];
              if (!block || !("children" in block)) return "";
              return (block as { children: Array<{ text?: string }> }).children
                .map((c) => c.text ?? "")
                .join("");
            })();
            const isImgLeft = i % 2 === 0;
            return (
              <section key={i} className="grid items-center gap-8 sm:grid-cols-2">
                {f.image && (
                  <div className={isImgLeft ? "" : "sm:order-2"}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm">
                      <Image
                        src={urlForImage(f.image).width(560).height(420).url()}
                        alt={f.title ?? ""}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className={isImgLeft ? "" : "sm:order-1"}>
                  <h2 className="text-2xl font-bold text-elk-heading">{f.title}</h2>
                  {desc && <p className="mt-3 text-sm leading-relaxed text-elk-body">{desc}</p>}
                </div>
              </section>
            );
          })}
        </main>

      </div>
    </div>
  );
}
