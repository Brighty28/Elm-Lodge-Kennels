import { client } from "@/sanity/client";
import { homePageQuery } from "@/sanity/queries";
import type { HomePage } from "@/sanity/types";
import RichText from "@/components/RichText";
import Slideshow from "@/components/Slideshow";
import FeatureGrid from "@/components/FeatureGrid";

export default async function Home() {
  const home = await client.fetch<HomePage | null>(homePageQuery);

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <section>
        <h1 className="mb-2 text-3xl font-bold">Welcome</h1>
        <hr className="mb-6 w-16 border-t-2 border-elk-gold" />
        <RichText value={home?.bodyText} />
      </section>

      <Slideshow slides={home?.slideshow} />

      <FeatureGrid features={home?.featuresList} />
    </div>
  );
}
