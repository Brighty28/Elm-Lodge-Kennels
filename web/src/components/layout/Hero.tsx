import Image from "next/image";
import Link from "next/link";

/* Stock countryside photo — client can replace by uploading a hero image
   to Sanity Studio (slideshow field on the Home page document). */
const STOCK_HERO =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1920&q=80";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      <Image
        src={STOCK_HERO}
        alt="Golden retriever running through a green countryside field"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Heavier overlay so white text is always legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/65" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
        <h1 className="text-balance text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          A Holiday Destination for Your Pet.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
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
