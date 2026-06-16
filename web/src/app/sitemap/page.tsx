import Link from "next/link";
import { client } from "@/sanity/client";
import { siteMapQuery } from "@/sanity/queries";

type SiteMapResult = {
  pages: { title: string; slug: string }[];
  priceList: { title?: string } | null;
  articleIndex: { title?: string } | null;
};

export default async function SitemapPage() {
  const data = await client.fetch<SiteMapResult>(siteMapQuery);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">Sitemap</h1>
      <hr className="mb-6 w-16 border-t-2 border-elk-gold" />
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-elk-accent hover:underline">
            Home
          </Link>
        </li>
        {data.priceList && (
          <li>
            <Link href="/prices" className="text-elk-accent hover:underline">
              {data.priceList.title ?? "Prices"}
            </Link>
          </li>
        )}
        {data.articleIndex && (
          <li>
            <Link href="/news" className="text-elk-accent hover:underline">
              {data.articleIndex.title ?? "News"}
            </Link>
          </li>
        )}
        {data.pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`} className="text-elk-accent hover:underline">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
