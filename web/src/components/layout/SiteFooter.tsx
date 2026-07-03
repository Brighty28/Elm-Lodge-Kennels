import Link from "next/link";
import { FaPaw } from "react-icons/fa6";
import type { SiteSettings } from "@/sanity/types";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M22 5.92c-.74.33-1.53.55-2.36.65a4.1 4.1 0 0 0 1.8-2.27c-.8.47-1.69.81-2.63.99a4.07 4.07 0 0 0-6.93 3.71A11.55 11.55 0 0 1 3.4 4.6a4.07 4.07 0 0 0 1.26 5.43 4.04 4.04 0 0 1-1.84-.51 4.07 4.07 0 0 0 3.26 4.04 4.06 4.06 0 0 1-1.83.07 4.07 4.07 0 0 0 3.8 2.83A8.15 8.15 0 0 1 2 18.57a11.51 11.51 0 0 0 6.23 1.82c7.48 0 11.57-6.2 11.57-11.57l-.01-.53A8.18 8.18 0 0 0 22 5.92Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.06 2.02.25 2.76.54a5.6 5.6 0 0 1 2 1.3 5.6 5.6 0 0 1 1.3 2c.29.74.48 1.6.54 2.76.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.17-.25 2.02-.54 2.76a5.6 5.6 0 0 1-1.3 2 5.6 5.6 0 0 1-2 1.3c-.74.29-1.6.48-2.76.54-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.06-2.02-.25-2.76-.54a5.6 5.6 0 0 1-2-1.3 5.6 5.6 0 0 1-1.3-2c-.29-.74-.48-1.6-.54-2.76C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.17.25-2.02.54-2.76a5.6 5.6 0 0 1 1.3-2 5.6 5.6 0 0 1 2-1.3c.74-.29 1.6-.48 2.76-.54C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52 0-4.76.07-1 .04-1.55.21-1.91.35a3.8 3.8 0 0 0-1.38.9 3.8 3.8 0 0 0-.9 1.38c-.14.36-.31.9-.35 1.91C2.64 9.85 2.64 10.21 2.64 12s0 3.15.07 4.39c.04 1 .21 1.55.35 1.91.16.5.42.95.9 1.38.43.43.88.74 1.38.9.36.14.9.31 1.91.35 1.24.06 1.6.07 4.76.07s3.52 0 4.76-.07c1-.04 1.55-.21 1.91-.35a3.8 3.8 0 0 0 1.38-.9 3.8 3.8 0 0 0 .9-1.38c.14-.36.31-.9.35-1.91.06-1.24.07-1.6.07-4.39s0-3.15-.07-4.39c-.04-1-.21-1.55-.35-1.91a3.8 3.8 0 0 0-.9-1.38 3.8 3.8 0 0 0-1.38-.9c-.36-.14-.9-.31-1.91-.35C15.52 4 15.15 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.4-2.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z" />
    </svg>
  );
}

export default function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-zinc-900 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="inline-flex items-center gap-2 font-heading text-lg font-bold text-elk-gold">
            <FaPaw aria-hidden="true" />
            {settings?.title ?? "Elm Lodge Kennels"}
          </p>
          <p className="mt-3 text-sm text-zinc-400">
            Exercise Paddock &middot; Private Walks &middot; Undercover Runs
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-wide text-zinc-500">Get in Touch</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {settings?.address && <li>{settings.address}</li>}
            {settings?.telephone && <li>{settings.telephone}</li>}
            {settings?.email && <li>{settings.email}</li>}
          </ul>
        </div>

        <div className="sm:text-right">
          <h3 className="text-xs font-semibold tracking-wide text-zinc-500">Follow Us</h3>
          <div className="mt-3 flex gap-3 sm:justify-end">
            {settings?.facebookLink && (
              <a
                href={settings.facebookLink}
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-elk-accent-deep hover:text-white"
              >
                <FacebookIcon />
              </a>
            )}
            {settings?.twitterLink && (
              <a
                href={settings.twitterLink}
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-elk-accent-deep hover:text-white"
              >
                <TwitterIcon />
              </a>
            )}
            {settings?.instagramLink && (
              <a
                href={settings.instagramLink}
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-elk-accent-deep hover:text-white"
              >
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-6 py-5 text-center text-xs text-zinc-500">
        <p>
          {settings?.licenseNumber && <>License Number: {settings.licenseNumber} &middot; </>}
          &copy; {year} {settings?.copyrightText ?? settings?.title ?? "Elm Lodge Kennels"} &middot;{" "}
          <Link href="/sitemap" className="hover:text-zinc-300">
            Sitemap
          </Link>
          {settings?.creditText && (
            <>
              {" "}
              &middot;{" "}
              {settings.creditUrl ? (
                <a href={settings.creditUrl} className="hover:text-zinc-300">
                  {settings.creditText}
                </a>
              ) : (
                settings.creditText
              )}
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
