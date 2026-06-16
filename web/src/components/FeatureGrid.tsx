import Image from "next/image";
import type { Feature } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "./RichText";

export default function FeatureGrid({ features }: { features?: Feature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {features.map((feature, i) => (
        <section key={i} className="rounded-lg border border-zinc-200 p-5">
          {feature.image && (
            <Image
              src={urlForImage(feature.image).width(400).height(260).url()}
              alt={feature.title ?? ""}
              width={400}
              height={260}
              className="mb-3 h-40 w-full rounded object-cover"
            />
          )}
          <h3 className="mb-1 font-semibold text-elk-accent">{feature.title}</h3>
          <RichText value={feature.description} />
        </section>
      ))}
    </div>
  );
}
