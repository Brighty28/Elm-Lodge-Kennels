import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elm Lodge Kennels",
  description: "Boarding kennels you and your dog can trust.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery).catch(() => null);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-elk-cream font-body text-elk-body"
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader settings={settings} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
