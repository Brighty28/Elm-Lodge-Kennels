import Link from "next/link";
import { client } from "@/sanity/client";
import { articleIndexQuery, articlesQuery } from "@/sanity/queries";
import type { ArticleIndex, ArticleSummary } from "@/sanity/types";
import RichText from "@/components/ui/RichText";
import PageHeader from "@/components/ui/PageHeader";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [index, articles] = await Promise.all([
    client.fetch<ArticleIndex | null>(articleIndexQuery),
    client.fetch<ArticleSummary[]>(articlesQuery),
  ]);

  const pageSize = index?.pageSize ?? 5;
  const totalPages = Math.max(1, Math.ceil(articles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = articles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader title={index?.title ?? "News"} />
      <div className="mt-8">
        <RichText value={index?.bodyText} />
      </div>

      <ul className="mt-8 divide-y divide-zinc-200">
        {pageItems.map((article) => (
          <li key={article.slug} className="py-6 first:pt-0">
            <p className="text-xs tracking-wide text-zinc-400">
              {new Date(article.articleDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h3 className="mt-1 text-lg">
              <Link href={`/news/${article.slug}`} className="hover:text-elk-accent-deep">
                {article.title}
              </Link>
            </h3>
            {article.articleSummary && <p className="mt-2 text-sm text-elk-body">{article.articleSummary}</p>}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <p className="mt-8 flex gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/news?page=${p}`}
              className={p === currentPage ? "font-bold text-elk-accent-deep" : "text-zinc-500 hover:underline"}
            >
              {p}
            </Link>
          ))}
        </p>
      )}
    </div>
  );
}
