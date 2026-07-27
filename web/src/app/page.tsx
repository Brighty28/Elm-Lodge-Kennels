import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";
import type { HomePage } from "@/sanity/types";
import Hero from "@/components/layout/Hero";
import { urlForImage } from "@/sanity/image";

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

const CARD_ICONS = [<IconThermometer key={0} />, <IconHeat key={1} />, <IconFloor key={2} />];

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

const DEFAULT_CHECKLIST = [
  "Real-time status reports",
  "Video clips of play sessions",
  "Direct line to our caregivers",
];

export default async function Home() {
  const home = await client.fetch<HomePage | null>(homePageQuery);

  const sanityFeatures = home?.featuresList ?? [];
  const checklist = home?.whatsappChecklist?.length ? home.whatsappChecklist : DEFAULT_CHECKLIST;

  return (
    <div>
      {/* 1. Full-bleed hero */}
      <Hero
        headline={home?.heroHeadline}
        subtext={home?.heroSubtext}
      />

      {/* 2. Architecture of Calm */}
      <section className="bg-elk-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>{home?.architectureEyebrow ?? "Thoughtful Design"}</Eyebrow>
          <h2 className="mt-3 max-w-lg text-4xl font-bold text-elk-heading">
            {home?.architectureHeading ?? "The Architecture of Calm"}
          </h2>
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm sm:flex">
            <div className="flex-1 p-8 sm:p-10">
              <p className="leading-relaxed text-elk-body">
                {home?.architectureBody ??
                  "Our facility isn't just a kennel; it's a meticulously designed sanctuary. The angled layout ensures pets don't experience direct eye contact with others, significantly reducing territorial stress and noise levels. Large vistas of the Nottinghamshire landscape provide constant visual enrichment."}
              </p>
            </div>
            <div className="relative w-64 shrink-0 overflow-hidden bg-elk-cream-mid max-sm:hidden">
              {home?.architectureImage ? (
                <Image
                  src={urlForImage(home.architectureImage).width(256).height(256).url()}
                  alt="Elm Lodge Kennels facility"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <p className="text-center font-heading text-xl font-bold text-elk-forest opacity-40">
                    Elm Lodge<br />Kennels
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Country-Luxe feature cards */}
      <section className="bg-elk-cream-mid px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-elk-heading">
              {home?.countryLuxeHeading ?? "Country-Luxe Experience"}
            </h2>
            <p className="mt-3 italic text-elk-gold">
              {home?.countryLuxeSubtext ??
                "Uncompromising comfort in a rustic setting, utilising modern technology to maintain a perfect climate year-round."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sanityFeatures.length > 0
              ? sanityFeatures.slice(0, 3).map((f, i) => {
                  const desc = (() => {
                    const block = f.description?.[0];
                    if (!block || !("children" in block)) return "";
                    return (block as { children: Array<{ text?: string }> }).children
                      .map((c) => c.text ?? "")
                      .join("");
                  })();
                  return (
                    <div key={f.title ?? i} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                      {f.image ? (
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={urlForImage(f.image).width(500).height(375).url()}
                            alt={f.title ?? ""}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-36 items-center justify-center bg-elk-cream-mid text-elk-gold">
                          {CARD_ICONS[i] ?? CARD_ICONS[0]}
                        </div>
                      )}
                      <div className="p-7">
                        <h3 className="text-lg font-bold text-elk-heading">{f.title}</h3>
                        {desc && <p className="mt-2 text-sm leading-relaxed text-elk-body">{desc}</p>}
                      </div>
                    </div>
                  );
                })
              : DEFAULT_FEATURES.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
                    <div className="text-elk-gold">{card.icon}</div>
                    <h3 className="mt-4 text-lg font-bold text-elk-heading">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-elk-body">{card.desc}</p>
                  </div>
                ))
            }
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
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80"
                    alt="Happy dog enjoying their stay"
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                </div>
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
            <h2 className="text-4xl font-bold text-elk-heading">
              {home?.whatsappHeading ?? "WhatsApp Pet Updates"}
            </h2>
            <p className="mt-4 leading-relaxed text-elk-gold">
              {home?.whatsappSubtext ??
                "Distance shouldn't mean disconnect. We provide daily high-definition photo and video updates directly to your WhatsApp, so you can enjoy your holiday knowing your pet is enjoying theirs."}
            </p>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-elk-body">
                  <IconCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-elk-cream px-6 py-24 text-center">
        <h2 className="text-4xl font-bold text-elk-heading">
          {home?.ctaHeading ?? "Ready to Book a 5-Star Stay?"}
        </h2>
        <p className="mt-3 italic text-elk-gold">
          {home?.ctaSubtext ??
            "Limited suites available for seasonal holidays. Secure your pet's luxury retreat today."}
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
