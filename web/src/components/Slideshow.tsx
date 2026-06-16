"use client";

import { useState } from "react";
import Image from "next/image";
import type { Slide } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "./RichText";

export default function Slideshow({ slides }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const current = slides[index];

  return (
    <div className="relative">
      {current.image && (
        <Image
          src={urlForImage(current.image).width(900).height(420).url()}
          alt=""
          width={900}
          height={420}
          className="h-80 w-full rounded-lg object-cover"
          priority
        />
      )}
      <div className="mt-3">
        <RichText value={current.caption} />
      </div>
      {slides.length > 1 && (
        <div className="mt-3 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full ${
                i === index ? "bg-elk-accent" : "bg-zinc-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
