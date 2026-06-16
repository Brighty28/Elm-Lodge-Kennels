import { client } from "@/sanity/client";
import { priceListQuery } from "@/sanity/queries";
import type { PriceList } from "@/sanity/types";
import RichText from "@/components/RichText";

export default async function PricesPage() {
  const prices = await client.fetch<PriceList | null>(priceListQuery);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 text-center">
      <h1 className="mb-2 text-2xl font-bold">{prices?.title ?? "Prices"}</h1>
      <hr className="mx-auto mb-6 w-16 border-t-2 border-elk-gold" />
      <RichText value={prices?.mainContent} />

      {prices?.rows && prices.rows.length > 0 && (
        <table className="mx-auto mt-8 w-full max-w-2xl border border-zinc-200 text-left">
          {prices.tableTitle && (
            <caption className="mb-2 font-semibold text-elk-accent">{prices.tableTitle}</caption>
          )}
          <thead>
            <tr className="bg-zinc-50">
              <th className="border border-zinc-200 px-4 py-2">Item</th>
              <th className="border border-zinc-200 px-4 py-2">Price</th>
              <th className="border border-zinc-200 px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {prices.rows.map((row, i) => (
              <tr key={i}>
                <td className="border border-zinc-200 px-4 py-2">{row.label}</td>
                <td className="border border-zinc-200 px-4 py-2">{row.price}</td>
                <td className="border border-zinc-200 px-4 py-2">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
