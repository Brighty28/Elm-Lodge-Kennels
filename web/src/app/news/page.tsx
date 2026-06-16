import Link from "next/link";
import { client } from "@/sanity/client";
import { articleIndexQuery, articlesQuery } from "@/sanity/queries";
import type { ArticleIndex, ArticleSummary } from "@/sanity/types";
import RichText from "@/components/RichText";

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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">{index?.title ?? "News"}</h1>
      <hr className="mb-6 w-16 border-t-2 border-elk-gold" />
      <RichText value={index?.bodyText} />

      <ul className="mt-8 space-y-6">
        {pageItems.map((article) => (
          <li key={article.slug}>
            <h3 className="font-semibold">
              <Link href={`/news/${article.slug}`} className="text-elk-accent hover:underline">
                {article.title}
              </Link>
            </h3>
            <p className="text-xs text-zinc-500">
              {new Date(article.articleDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            {article.articleSummary && <p className="mt-1 text-sm text-zinc-700">{article.articleSummary}</p>}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <p className="mt-8 flex gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/news?page=${p}`}
              className={p === currentPage ? "font-bold text-elk-accent" : "text-zinc-600 hover:underline"}
            >
              {p}
            </Link>
          ))}
        </p>
      )}
    </div>
  );
}
