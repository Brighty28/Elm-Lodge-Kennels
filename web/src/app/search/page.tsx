import Link from "next/link";
import { client } from "@/sanity/client";
import { searchQuery } from "@/sanity/queries";

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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">Search</h1>
      <hr className="mb-6 w-16 border-t-2 border-elk-gold" />

      <form className="mb-8 flex gap-2" action="/search">
        <input
          name="search"
          defaultValue={term}
          placeholder="Search the site"
          className="flex-1 rounded border border-zinc-300 px-3 py-2"
        />
        <button type="submit" className="rounded bg-elk-accent px-5 py-2 text-white">
          Search
        </button>
      </form>

      {term && results.length === 0 && <p>No results match your search.</p>}

      <ul className="space-y-4">
        {results.map((result, i) => (
          <li key={i}>
            <h3 className="font-semibold">
              <Link href={hrefFor(result)} className="text-elk-accent hover:underline">
                {result.title}
              </Link>
            </h3>
            {result.snippet && (
              <p className="text-sm text-zinc-600">{result.snippet.slice(0, 200)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
