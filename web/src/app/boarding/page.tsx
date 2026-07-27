import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import type { Page } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Boarding | Elm Lodge Kennels",
  description:
    "Elite canine boarding in the heart of Nottinghamshire. Individually heated suites, angled acoustic design, and expert 24/7 care.",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elk-gold">
      {children}
    </p>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-elk-gold">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default async function BoardingPage() {
  const page = await client.fetch<Page | null>(pageBySlugQuery, { slug: "boarding" });

  const features = page?.featuresList ?? [];
  const [feat0, feat1, feat2, feat3] = features;

  return (
    <div>
      {/* ── Hero split ──────────────────────────────────────── */}
      <section className="bg-elk-cream px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Elite Canine Retreat</Eyebrow>
            <h1 className="mt-3 text-balance text-5xl font-bold leading-tight text-elk-heading">
              {page?.title ?? "Boarding Excellence & Architectural Serenity"}
            </h1>
            <p className="mt-5 max-w-lg leading-relaxed text-elk-body">
              Discover a pet retreat where medical-grade hygiene meets country-luxe
              hospitality. Our facilities are designed from the ground up to prioritise
              your dog&apos;s emotional and physical well-being.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="rounded-full bg-elk-forest px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-elk-forest-mid"
              >
                Reserve a Suite
              </Link>
              <Link
                href="#gallery"
                className="rounded-full border border-elk-heading/30 px-7 py-3.5 text-sm font-semibold text-elk-heading transition hover:border-elk-heading"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Hero image — uses first feature image or placeholder */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            {feat0?.image ? (
              <Image
                src={urlForImage(feat0.image).width(800).height(600).url()}
                alt="Boarding facility"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-elk-forest/20" />
            )}
          </div>
        </div>

        {/* Booking requirements notice */}
        <div className="mx-auto mt-10 max-w-6xl rounded-xl border border-amber-200 bg-amber-50 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Booking Requirements
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800">
            Please note: A minimum{" "}
            <strong className="font-semibold">14-day lead time</strong> is required
            for the Kennel Cough vaccination prior to boarding. We cannot accept pets
            without valid certification.
          </p>
        </div>
      </section>

      {/* ── Feature cards row 1 ─────────────────────────────── */}
      <section className="bg-elk-cream-mid px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {/* Heated Accommodations */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="relative aspect-video w-full">
              {feat1?.image ? (
                <Image
                  src={urlForImage(feat1.image).width(600).height(338).url()}
                  alt={feat1.title ?? "Heated accommodations"}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-elk-cream-mid" />
              )}
            </div>
            <div className="p-7">
              <h2 className="text-xl font-bold text-elk-heading">
                {feat1?.title ?? "Heated Accommodations"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-elk-body">
                Every canine guest enjoys an individual, climate-controlled kennel.
                Our underfloor heating and individual radiators ensure a cosy
                environment regardless of the British weather outside.
              </p>
              <ul className="mt-4 space-y-2">
                {["Private Outdoor Exercise Runs", "24/7 Temperature Monitoring"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-elk-body">
                    <IconCheck /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stress-Free Acoustic Design */}
          <div className="flex flex-col justify-center rounded-2xl bg-elk-forest p-8 text-white shadow-sm">
            <div className="mb-4 flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`w-1 rounded-full bg-elk-gold-light opacity-70 ${i % 2 === 0 ? "h-5" : "h-8"}`} />
              ))}
            </div>
            <h2 className="text-xl font-bold">
              {feat2?.title ?? "Stress-Free Acoustic Design"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Traditional kennel layouts encourage &ldquo;chain-reaction barking.&rdquo; Our
              facility features an innovative angled design that prevents direct
              line-of-sight between dogs, significantly reducing noise levels and
              environmental stress.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature cards row 2 ─────────────────────────────── */}
      <section className="bg-elk-cream px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {/* Hygiene & Comfort */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-elk-heading">
              {feat3?.title ?? "Hygiene & Comfort"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-elk-body">
              We utilise medical-grade, non-slip epoxy flooring that is non-porous
              and anti-microbial. Coupled with our eco-friendly climate control, we
              maintain a sterile yet comfortable atmosphere.
            </p>
            <div className="mt-5 aspect-video w-full overflow-hidden rounded-xl">
              {feat3?.image ? (
                <div className="relative h-full w-full">
                  <Image
                    src={urlForImage(feat3.image).width(600).height(338).url()}
                    alt={feat3.title ?? "Hygiene and comfort"}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-full w-full bg-elk-cream-mid" />
              )}
            </div>
          </div>

          {/* A Day at Elm Lodge */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
            <div className="mb-1 flex items-center gap-2 text-elk-gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <h2 className="text-xl font-bold text-elk-heading">A Day at Elm Lodge</h2>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
              {[
                {
                  heading: "Morning & Afternoon Play",
                  body: "Three dedicated off-lead exercise sessions in our secure paddocks, ensuring natural movement and mental stimulation.",
                },
                {
                  heading: "Diet & Medical Care",
                  body: "Professional diet management and precise administration of medications, including insulin for diabetic guests.",
                },
                {
                  heading: "Individual Attention",
                  body: "One-on-one “cuddle time” for every guest, mirroring the affection they receive at home.",
                },
                {
                  heading: "Sleep Protocol",
                  body: "Settling-down routine with soft classical music and dimmable lighting to ensure deep recovery sleep.",
                },
              ].map((item) => (
                <div key={item.heading}>
                  <p className="text-xs font-semibold text-elk-gold">{item.heading}</p>
                  <p className="mt-1 text-xs leading-relaxed text-elk-body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ─────────────────────────────────────────── */}
      <section id="gallery" className="bg-elk-cream-mid px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-elk-heading">Inside the Retreat</h2>
            <p className="mt-2 text-sm text-elk-body">
              Explore our modern interiors and spacious facilities designed for the discerning pet owner.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {features.slice(0, 4).map((f, i) =>
              f.image ? (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={urlForImage(f.image).width(400).height(400).url()}
                    alt={f.title ?? `Gallery image ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div key={i} className="aspect-square rounded-2xl bg-elk-cream" />
              )
            )}
            {/* Fill empty slots if fewer than 4 features */}
            {Array.from({ length: Math.max(0, 4 - features.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-elk-cream" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark CTA ─────────────────────────────────────────── */}
      <section className="bg-elk-forest px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-bold">Ready to Book a Stay?</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-zinc-300">
          Experience the peace of mind that comes with knowing your pet is in the safest,
          most comfortable hands in Retford.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-block rounded-full border border-elk-gold-light px-8 py-3.5 text-sm font-semibold text-elk-gold-light transition hover:bg-elk-gold hover:text-white hover:border-elk-gold"
        >
          Reserve Your Suite
        </Link>
      </section>
    </div>
  );
}
