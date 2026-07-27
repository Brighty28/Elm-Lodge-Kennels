import Image from "next/image";
import Link from "next/link";
import type { Slide } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";

export default function Hero({
  slides,
}: {
  title?: string;
  slides?: Slide[];
}) {
  const heroImage = slides?.[0]?.image ?? null;

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {heroImage ? (
        <Image
          src={urlForImage(heroImage).width(1920).height(1080).url()}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-elk-forest" aria-hidden="true" />
      )}

      {/* Dark gradient overlay — darker at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center text-white">
        <h1 className="text-balance text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          A Holiday Destination for Your Pet.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
          Premium 5-star boarding in the heart of Nottinghamshire. Where luxury
          meets the countryside, providing a stress-free haven for your furry companions.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/book"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-elk-heading transition hover:bg-elk-cream"
          >
            Book a Stay
          </Link>
          <Link
            href="/boarding"
            className="rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            View Our Facilities
          </Link>
        </div>
      </div>
    </section>
  );
}
