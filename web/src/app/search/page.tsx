import Link from "next/link";
import { client } from "@/sanity/client";
import { searchQuery } from "@/sanity/queries";
import PageHeader from "@/components/ui/PageHeader";

type SearchResult = {
  _type: "page" | "article" | "priceList";
  title: string;
  slug?: string;
  snippet?: string;
};

function hrefFor(result: SearchResult) {
  if (result._type === "priceList") return "/prices";
  if (result._type === "article") return `/news/${result.slug}`;
  return `/${result.slug}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const term = search?.trim() ?? "";

  const results = term
    ? await client.fetch<SearchResult[]>(searchQuery, { term })
    : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <PageHeader title="Search" />

      <form className="mt-8 flex gap-2" action="/search" role="search">
        <label htmlFor="search-input" className="sr-only">
          Search the site
        </label>
        <input
          id="search-input"
          name="search"
          defaultValue={term}
          placeholder="Search the site"
          className="flex-1 rounded-full border border-zinc-300 px-5 py-2.5 text-sm focus:border-elk-accent-deep focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-elk-accent-deep px-6 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:opacity-90"
        >
          Search
        </button>
      </form>

      {term && results.length === 0 && <p className="mt-8 text-sm text-elk-body">No results match your search.</p>}

      <ul className="mt-8 divide-y divide-zinc-200">
        {results.map((result, i) => (
          <li key={i} className="py-5 first:pt-0">
            <h3 className="text-lg">
              <Link href={hrefFor(result)} className="hover:text-elk-accent-deep">
                {result.title}
              </Link>
            </h3>
            {result.snippet && (
              <p className="mt-1 text-sm text-elk-body">{result.snippet.slice(0, 200)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
