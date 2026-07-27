import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Page, SiteSettings } from "@/sanity/types";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Elm Lodge Kennels",
  description: "Get in touch with Elm Lodge Kennels. We aim to respond within 24 hours.",
};

/* ── icons ─────────────────────────────────────────────────── */
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-elk-gold">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-7-7.5-7-10.5a7 7 0 0 1 14 0C19 13.5 16 17 12 21Z" />
      <circle cx="12" cy="10.5" r="2.5" strokeLinecap="round" />
    </svg>
  );
}
function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-elk-gold">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="m2 7 10 7 10-7" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-elk-gold">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5 shrink-0 text-elk-gold-light">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
  );
}

/* ── default opening hours if none in Sanity ──────────────── */
const DEFAULT_HOURS = [
  { days: "Monday – Friday", hours: "9:00 AM – 5:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 5:00 PM" },
  { days: "Sunday", hours: "9:00 AM – 5:00 PM" },
];

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    client.fetch<Page | null>(pageBySlugQuery, { slug: "contact-us" }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ]);

  const hours = settings?.openingHours?.length ? settings.openingHours : DEFAULT_HOURS;
  const hoursNote = settings?.openingHoursNote ??
    "Please note: Drop-offs and collections are strictly within these hours to maintain the tranquillity of our guests.";

  return (
    <div className="bg-elk-cream px-6 py-20">
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_320px]">

        {/* ── Left: contact form ───────────────────────────── */}
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-bold text-zinc-900">Send an Inquiry</h1>
          <p className="mt-2 text-sm text-elk-body">
            We aim to respond to all digital inquiries within 24 hours.
          </p>
          <div className="mt-8">
            <ContactForm
              recipientEmailAddress={page?.recipientEmailAddress}
              emailSubject={page?.emailSubject}
              thankYouSlug={page?.thankYouSlug}
              subjects={settings?.contactSubjects}
            />
          </div>
        </div>

        {/* ── Right: details + hours ───────────────────────── */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Contact Details</h2>
            <ul className="mt-5 space-y-5">
              {settings?.address && (
                <li className="flex items-start gap-3">
                  <IconPin />
                  <div>
                    <p className="text-xs font-semibold text-elk-gold">Visit Us</p>
                    <p className="mt-0.5 text-sm text-elk-body whitespace-pre-line">
                      {settings.address}
                    </p>
                  </div>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-start gap-3">
                  <IconEmail />
                  <div>
                    <p className="text-xs font-semibold text-elk-gold">Email Us</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="mt-0.5 block text-sm text-elk-body transition hover:text-elk-forest"
                    >
                      {settings.email}
                    </a>
                  </div>
                </li>
              )}
              {settings?.telephone && (
                <li className="flex items-start gap-3">
                  <IconPhone />
                  <div>
                    <p className="text-xs font-semibold text-elk-gold">Call Us</p>
                    <a
                      href={`tel:${settings.telephone}`}
                      className="mt-0.5 block text-sm text-elk-body transition hover:text-elk-forest"
                    >
                      {settings.telephone}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Opening hours card */}
          <div className="rounded-2xl bg-elk-forest p-6 text-white">
            <div className="flex items-center gap-2">
              <IconClock />
              <h2 className="text-lg font-bold text-white">Opening Hours</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {hours.map((row) => (
                <li key={row.days} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-zinc-300">{row.days}</span>
                  <span className="font-medium text-white">{row.hours}</span>
                </li>
              ))}
            </ul>
            {hoursNote && (
              <p className="mt-5 border-t border-white/10 pt-4 text-xs italic leading-relaxed text-zinc-400">
                {hoursNote}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
