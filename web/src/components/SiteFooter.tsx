import type { SiteSettings } from "@/sanity/types";

export default function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-elk-body">
        <div className="grid gap-8 sm:grid-cols-2">
          <ul className="space-y-1">
            {settings?.address && <li>{settings.address}</li>}
            {settings?.telephone && <li>{settings.telephone}</li>}
            {settings?.email && <li>{settings.email}</li>}
          </ul>
          <ul className="flex gap-4 sm:justify-end">
            {settings?.facebookLink && (
              <li>
                <a href={settings.facebookLink} className="hover:text-elk-accent">
                  Facebook
                </a>
              </li>
            )}
            {settings?.twitterLink && (
              <li>
                <a href={settings.twitterLink} className="hover:text-elk-accent">
                  Twitter
                </a>
              </li>
            )}
            {settings?.instagramLink && (
              <li>
                <a href={settings.instagramLink} className="hover:text-elk-accent">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
        <p className="mt-6 text-xs text-zinc-500">
          &copy; {year} {settings?.copyrightText ?? settings?.title ?? "Elm Lodge Kennels"}
        </p>
      </div>
    </footer>
  );
}
