import Image from "next/image";
import type { Feature } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/ui/RichText";

const MAX_W = 500;
const MAX_H = 375;

export default function FeatureGrid({ features }: { features?: Feature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => (
        <article
          key={i}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
        >
          {feature.image && (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={urlForImage(feature.image).width(MAX_W).height(MAX_H).url()}
                alt={feature.title ?? ""}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            {feature.title && (
              <h3 className="mb-2 text-base font-bold text-elk-heading">{feature.title}</h3>
            )}
            <div className="text-sm leading-relaxed text-elk-body">
              <RichText value={feature.description} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
