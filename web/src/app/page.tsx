import Link from "next/link";
import { client } from "@/sanity/client";
import { homePageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { HomePage, SiteSettings } from "@/sanity/types";
import Hero from "@/components/layout/Hero";

/* ── inline icons ──────────────────────────────────────────── */
function IconThermometer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M9 3h6M9 7.5h6M9 12h4m-1 0v5m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}
function IconHeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <rect x="2" y="7" width="5" height="10" rx="1" />
      <rect x="9.5" y="7" width="5" height="10" rx="1" />
      <rect x="17" y="7" width="5" height="10" rx="1" />
    </svg>
  );
}
function IconFloor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
      <line x1="2" y1="6" x2="22" y2="6" strokeLinecap="round" />
      <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
      <line x1="2" y1="18" x2="22" y2="18" strokeLinecap="round" />
      <line x1="7" y1="3" x2="3" y2="21" strokeLinecap="round" />
      <line x1="13" y1="3" x2="9" y2="21" strokeLinecap="round" />
      <line x1="19" y1="3" x2="15" y2="21" strokeLinecap="round" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0 text-elk-gold">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elk-gold">
      {children}
    </p>
  );
}

const DEFAULT_FEATURES = [
  {
    icon: <IconThermometer />,
    title: "Climate Control",
    desc: "Eco-friendly air filtration and climate management ensuring a steady, comfortable temperature regardless of the British weather.",
  },
  {
    icon: <IconHeat />,
    title: "Heated Runs",
    desc: "Individual heated sleeping quarters and exercise runs that allow for movement without the chill of the morning frost.",
  },
  {
    icon: <IconFloor />,
    title: "Stone Flooring",
    desc: "Stone-mimetic flooring that is naturally antimicrobial, slip-resistant, and maintains a gentle warmth for paws.",
  },
];

export default async function Home() {
  const [home] = await Promise.all([
    client.fetch<HomePage | null>(homePageQuery),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  const sanityFeatures = home?.featuresList ?? [];

  return (
    <div>
      {/* 1. Full-bleed hero */}
      <Hero slides={home?.slideshow} />

      {/* 2. Architecture of Calm */}
      <section className="bg-elk-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Thoughtful Design</Eyebrow>
          <h2 className="mt-3 max-w-lg text-4xl font-bold text-elk-heading">
            The Architecture of Calm
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm sm:flex">
            <div className="flex-1 p-8 sm:p-10">
              <p className="leading-relaxed text-elk-body">
                Our facility isn&apos;t just a kennel; it&apos;s a meticulously designed
                sanctuary. The{" "}
                <strong className="font-semibold text-elk-heading">angled layout</strong>{" "}
                ensures pets don&apos;t experience direct eye contact with others,
                significantly reducing territorial stress and noise levels. Large vistas
                of the Nottinghamshire landscape provide constant visual enrichment.
              </p>
            </div>
            <div className="flex w-64 shrink-0 items-center justify-center bg-elk-cream-mid p-8 max-sm:hidden">
              <p className="text-center font-heading text-xl font-bold text-elk-forest opacity-40">
                Elm Lodge<br />Kennels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Country-Luxe feature cards */}
      <section className="bg-elk-cream-mid px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-elk-heading">Country-Luxe Experience</h2>
            <p className="mt-3 italic text-elk-gold">
              Uncompromising comfort in a rustic setting, utilising modern technology
              to maintain a perfect climate year-round.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(sanityFeatures.length > 0
              ? sanityFeatures.slice(0, 3).map((f, i) => ({
                  icon: [<IconThermometer key={0} />, <IconHeat key={1} />, <IconFloor key={2} />][i],
                  title: f.title ?? "",
                  desc: (() => {
                    const block = f.description?.[0];
                    if (!block || !("children" in block)) return "";
                    return (block as { children: Array<{ text?: string }> }).children
                      .map((c) => c.text ?? "")
                      .join("");
                  })(),
                }))
              : DEFAULT_FEATURES
            ).map((card) => (
              <div key={card.title} className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
                <div className="text-elk-gold">{card.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-elk-heading">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-elk-body">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WhatsApp Pet Updates */}
      <section className="bg-elk-cream px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="w-52 overflow-hidden rounded-3xl border-4 border-elk-forest bg-white shadow-2xl">
              <div className="flex items-center justify-between bg-elk-forest px-4 py-2 text-white">
                <span className="font-heading text-xs font-semibold leading-tight">Elm Lodge Kennels</span>
                <div className="h-2 w-2 rounded-full bg-green-400" />
              </div>
              <div className="space-y-3 p-3">
                <div className="max-w-[90%] rounded-2xl rounded-tl-none bg-zinc-100 px-3 py-2.5">
                  <p className="text-[11px] leading-relaxed text-zinc-700">
                    Good morning! Barnaby just finished his woodland walk and is enjoying his breakfast.
                  </p>
                </div>
                <div className="aspect-[4/3] w-full rounded-xl bg-elk-cream-mid" />
                <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-none bg-elk-forest px-3 py-2.5">
                  <p className="text-[11px] leading-relaxed text-white">
                    He&apos;s been such a good boy today!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold text-elk-heading">WhatsApp Pet Updates</h2>
            <p className="mt-4 leading-relaxed text-elk-gold">
              Distance shouldn&apos;t mean disconnect. We provide daily high-definition photo
              and video updates directly to your WhatsApp, so you can enjoy your holiday
              knowing your pet is enjoying theirs.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Real-time status reports",
                "Video clips of play sessions",
                "Direct line to our caregivers",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-elk-body">
                  <IconCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Expert Care — dark section */}
      <section className="bg-elk-forest px-6 py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">Expert Care, Guaranteed</h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              Our team consists of certified animal behaviourists and first-aid trained
              specialists. We don&apos;t just watch your pets; we understand them. From
              tailored exercise regimes to medication administration, your pet is in the
              safest hands in the region.
            </p>
            <div className="mt-8 flex gap-10 border-t border-white/20 pt-8">
              <div>
                <p className="font-heading text-3xl font-bold text-elk-gold-light">5-Star</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">Council License</p>
              </div>
              <div className="border-l border-white/20 pl-10">
                <p className="font-heading text-3xl font-bold text-elk-gold-light">100%</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">Vet Recommended</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl bg-white/10" />
            <div className="aspect-[3/4] translate-y-6 rounded-2xl bg-white/10" />
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-elk-cream px-6 py-24 text-center">
        <h2 className="text-4xl font-bold text-elk-heading">Ready to Book a 5-Star Stay?</h2>
        <p className="mt-3 italic text-elk-gold">
          Limited suites available for seasonal holidays. Secure your pet&apos;s luxury retreat today.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/book"
            className="rounded-full bg-elk-forest px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-elk-forest-mid"
          >
            Book a Stay
          </Link>
          <Link
            href="/prices"
            className="rounded-full border border-elk-gold px-8 py-3.5 text-sm font-semibold text-elk-gold transition hover:bg-elk-gold hover:text-white"
          >
            View Rates
          </Link>
        </div>
      </section>
    </div>
  );
}
