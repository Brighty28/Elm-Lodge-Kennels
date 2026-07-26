import Link from "next/link";
import { client } from "@/sanity/client";
import { homePageQuery, siteSettingsQuery } from "@/sanity/queries";
import type { HomePage, SiteSettings } from "@/sanity/types";
import { FaPaw } from "react-icons/fa6";
import RichText from "@/components/ui/RichText";
import Hero from "@/components/layout/Hero";
import FeatureGrid from "@/components/sections/FeatureGrid";

export default async function Home() {
  const [home, settings] = await Promise.all([
    client.fetch<HomePage | null>(homePageQuery),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  return (
    <div>
      <Hero title={settings?.title} slides={home?.slideshow} />

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <FaPaw aria-hidden="true" className="mx-auto text-xl text-elk-accent" />
        <h2 className="mt-3 text-3xl">Welcome</h2>
        <div className="mt-6 text-left">
          <RichText value={home?.bodyText} />
        </div>
      </section>

      {home?.featuresList && home.featuresList.length > 0 && (
        <section className="bg-zinc-50 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <FaPaw aria-hidden="true" className="mx-auto text-xl text-elk-accent" />
              <h2 className="mt-3 text-3xl">Why Choose Us</h2>
            </div>
            <FeatureGrid features={home.featuresList} />
          </div>
        </section>
      )}

      <section className="bg-elk-tan px-6 py-14 text-center">
        <h2 className="text-2xl text-zinc-700">Ready to Book Your Dog&apos;s Stay?</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-zinc-600">
          Get in touch and we&apos;ll be happy to answer any questions about boarding with us.
        </p>
        <Link
          href="/contact-us"
          className="mt-6 inline-block rounded-full bg-elk-accent-deep px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition hover:opacity-90"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
