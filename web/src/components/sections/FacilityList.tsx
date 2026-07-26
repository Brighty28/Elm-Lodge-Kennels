import Image from "next/image";
import type { FacilitySection } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/ui/RichText";

const MAX_SOURCE_WIDTH = 450;
const MAX_SOURCE_HEIGHT = 338;

export default function FacilityList({ facilities }: { facilities?: FacilitySection[] }) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <div className="space-y-12">
      {facilities.map((facility, i) => (
        <section key={i}>
          <h2 className="text-2xl">{facility.title}</h2>
          {facility.description && (
            <div className="mt-2">
              <RichText value={facility.description} />
            </div>
          )}
          {facility.images && facility.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {facility.images.map((image, j) => (
                <div key={j} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={urlForImage(image).width(MAX_SOURCE_WIDTH).height(MAX_SOURCE_HEIGHT).url()}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
