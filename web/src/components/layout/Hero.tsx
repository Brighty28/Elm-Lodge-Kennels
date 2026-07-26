import Image from "next/image";
import Link from "next/link";
import { FaPaw } from "react-icons/fa6";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slide } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";

/*
  The real photos recovered from the legacy site are old camera shots
  (2014), topping out around 350px on the long edge. A full-bleed hero
  banner would need to upscale them 4-5x and look soft, so instead this
  renders them as a collage sized close to their native resolution —
  sharp, and it shows all three captions as real text rather than
  hiding them behind an auto-advancing carousel (which also sidesteps
  the WCAG 2.2.2 concern with auto-updating content).
*/
const LARGE_TILE = { width: 420, height: 315 };
const SMALL_TILE = { width: 220, height: 165 };

function textOf(block?: PortableTextBlock) {
  if (!block || !("children" in block)) return "";
  return block.children
    .map((c) => ("text" in c && typeof c.text === "string" ? c.text : ""))
    .join("");
}

function Caption({ caption, size }: { caption?: Slide["caption"]; size: "lg" | "sm" }) {
  const [heading, ...rest] = caption ?? [];
  if (!heading) return null;

  return (
    <figcaption className="mt-3">
      <p className={size === "lg" ? "text-base font-semibold" : "text-sm font-semibold"}>
        {textOf(heading)}
      </p>
      {size === "lg" &&
        rest.map((block, i) => (
          <p key={i} className="mt-1 text-sm text-elk-body">
            {textOf(block)}
          </p>
        ))}
    </figcaption>
  );
}

export default function Hero({
  title,
  slides,
}: {
  title?: string;
  slides?: Slide[];
}) {
  const [big, ...small] = slides ?? [];

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <FaPaw aria-hidden="true" className="text-xl text-elk-accent" />
          <h1 className="mt-4 text-3xl sm:text-4xl">{title ?? "Elm Lodge Kennels"}</h1>
          <p className="mt-3 text-sm font-semibold tracking-wide text-elk-body">
            Exercise Paddock &middot; Private Walks &middot; Undercover Runs
          </p>
          <Link
            href="/contact-us"
            className="mt-6 inline-block rounded-full bg-elk-accent-deep px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition hover:opacity-90"
          >
            Book Your Dog&apos;s Stay
          </Link>
        </div>

        {slides && slides.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {big.image && (
              <figure className="sm:col-span-2">
                <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-2xl shadow-sm">
                  <Image
                    src={urlForImage(big.image).width(LARGE_TILE.width).height(LARGE_TILE.height).url()}
                    alt=""
                    fill
                    sizes={`${LARGE_TILE.width}px`}
                    className="object-cover"
                  />
                </div>
                <Caption caption={big.caption} size="lg" />
              </figure>
            )}
            {small.map((slide, i) => (
              <figure key={i}>
                {slide.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
                    <Image
                      src={urlForImage(slide.image).width(SMALL_TILE.width).height(SMALL_TILE.height).url()}
                      alt=""
                      fill
                      sizes={`${SMALL_TILE.width}px`}
                      className="object-cover"
                    />
                  </div>
                )}
                <Caption caption={slide.caption} size="sm" />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
