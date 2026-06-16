import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { pageBySlugQuery } from "@/sanity/queries";
import type { Page } from "@/sanity/types";
import RichText from "@/components/RichText";
import FeatureGrid from "@/components/FeatureGrid";
import ContactForm from "@/components/ContactForm";

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

  // Note: this is a faithful-rebuild placeholder. Production login-gating
  // for isMembersOnly pages should be enforced via middleware/auth, not just UI.

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-10 sm:grid-cols-3">
        {page.contentPanels && page.contentPanels.length > 0 && (
          <aside className="space-y-6 sm:col-span-1">
            {page.contentPanels.map((panel, i) => (
              <section key={i}>
                <h3 className="mb-2 font-semibold text-elk-accent">{panel.heading}</h3>
                <RichText value={panel.content} />
              </section>
            ))}
          </aside>
        )}

        <article className={page.contentPanels?.length ? "sm:col-span-2" : "sm:col-span-3"}>
          <h1 className="mb-4 text-2xl font-bold">{page.title}</h1>
          <hr className="mb-6 w-16 border-t-2 border-elk-gold" />
          <RichText value={page.bodyText} />
          <div className="mt-8">
            <FeatureGrid features={page.featuresList} />
          </div>

          {page.isContactPage && (
            <div className="mt-8">
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
