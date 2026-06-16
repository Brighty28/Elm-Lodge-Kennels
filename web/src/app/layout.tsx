import type { Metadata } from "next";
import { Source_Sans_3, Montserrat } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  weight: ["600", "700"],
  subsets: ["latin"],
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
      className={`${sourceSans.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-body text-elk-body">
        <SiteHeader settings={settings} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
