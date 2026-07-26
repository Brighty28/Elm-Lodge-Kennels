import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Page, SiteSettings } from "@/sanity/types";
import RichText from "@/components/ui/RichText";
import FeatureGrid from "@/components/sections/FeatureGrid";
import FacilityList from "@/components/sections/FacilityList";
import LocationMap from "@/components/sections/LocationMap";
import ContactForm from "@/components/ui/ContactForm";
import PageHeader from "@/components/ui/PageHeader";

export default async function StandardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await client.fetch<Page | null>(pageBySlugQuery, { slug });

  if (!page) {
    notFound();
  }

  const settings = page.showMap
    ? await client.fetch<SiteSettings | null>(siteSettingsQuery)
    : null;

  // Note: this is a faithful-rebuild placeholder. Production login-gating
  // for isMembersOnly pages should be enforced via middleware/auth, not just UI.

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 sm:grid-cols-3">
        {page.contentPanels && page.contentPanels.length > 0 && (
          <aside className="space-y-8 sm:col-span-1">
            {page.contentPanels.map((panel, i) => (
              <section key={i} className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <h2 className="mb-2 text-sm">{panel.heading}</h2>
                <RichText value={panel.content} />
              </section>
            ))}
          </aside>
        )}

        <article className={page.contentPanels?.length ? "sm:col-span-2" : "sm:col-span-3"}>
          <PageHeader title={page.title} />
          <div className="mt-8">
            <RichText value={page.bodyText} />
          </div>
          <div className="mt-10">
            <FeatureGrid features={page.featuresList} />
          </div>

          <div className="mt-10">
            <FacilityList facilities={page.facilities} />
          </div>

          {page.showMap && (
            <div className="mt-10">
              <LocationMap
                latitude={settings?.latitude}
                longitude={settings?.longitude}
                address={settings?.address}
              />
            </div>
          )}

          {page.isContactPage && (
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
              <ContactForm
                recipientEmailAddress={page.recipientEmailAddress}
                emailSubject={page.emailSubject}
                thankYouSlug={page.thankYouSlug}
              />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
