import Link from "next/link";
import { client } from "@/sanity/client";
import { siteMapQuery } from "@/sanity/queries";
import PageHeader from "@/components/ui/PageHeader";

type SiteMapResult = {
  pages: { title: string; slug: string }[];
  priceList: { title?: string } | null;
  articleIndex: { title?: string } | null;
};

export default async function SitemapPage() {
  const data = await client.fetch<SiteMapResult>(siteMapQuery);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader title="Sitemap" />
      <ul className="mt-8 divide-y divide-zinc-200 text-sm">
        <li className="py-3 first:pt-0">
          <Link href="/" className="hover:text-elk-accent-deep">
            Home
          </Link>
        </li>
        {data.priceList && (
          <li className="py-3">
            <Link href="/prices" className="hover:text-elk-accent-deep">
              {data.priceList.title ?? "Prices"}
            </Link>
          </li>
        )}
        {data.articleIndex && (
          <li className="py-3">
            <Link href="/news" className="hover:text-elk-accent-deep">
              {data.articleIndex.title ?? "News"}
            </Link>
          </li>
        )}
        {data.pages.map((page) => (
          <li key={page.slug} className="py-3">
            <Link href={`/${page.slug}`} className="hover:text-elk-accent-deep">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
