import Image from "next/image";
import type { Feature } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/ui/RichText";

/*
  The source photography recovered from the legacy site tops out around
  300-500px on the long edge (old camera, 2014). Requesting anything
  larger than that from Sanity just upscales and blurs, so we cap the
  request at the real ceiling instead of a "nice round number" like 600/800.
*/
const MAX_SOURCE_WIDTH = 500;
const MAX_SOURCE_HEIGHT = 375;

export default function FeatureGrid({ features }: { features?: Feature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => (
        <article
          key={i}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
        >
          {feature.image && (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={urlForImage(feature.image).width(MAX_SOURCE_WIDTH).height(MAX_SOURCE_HEIGHT).url()}
                alt={feature.title ?? ""}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-5">
            <h3 className="mb-2 text-base">{feature.title}</h3>
            <RichText value={feature.description} />
          </div>
        </article>
      ))}
    </div>
  );
}
