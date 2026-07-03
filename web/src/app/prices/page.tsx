import { client } from "@/sanity/client";
import { priceListQuery } from "@/sanity/queries";
import type { PriceList } from "@/sanity/types";
import RichText from "@/components/ui/RichText";
import PageHeader from "@/components/ui/PageHeader";

export default async function PricesPage() {
  const prices = await client.fetch<PriceList | null>(priceListQuery);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <PageHeader title={prices?.title ?? "Prices"} align="center" />
      <div className="mt-8 text-left">
        <RichText value={prices?.mainContent} />
      </div>

      {prices?.rows && prices.rows.length > 0 && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 text-left shadow-sm">
          {prices.tableTitle && (
            <div className="bg-elk-tan px-6 py-3">
              <p className="text-sm font-semibold tracking-wide text-zinc-700">
                {prices.tableTitle}
              </p>
            </div>
          )}
          <table className="w-full">
            <caption className="sr-only">{prices.tableTitle ?? "Prices"}</caption>
            <thead>
              <tr>
                <th scope="col" className="sr-only">
                  Dog size
                </th>
                <th scope="col" className="sr-only">
                  Price per night
                </th>
                <th scope="col" className="sr-only">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {prices.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
                  <th scope="row" className="px-6 py-3 text-left font-medium text-zinc-700">
                    {row.label}
                  </th>
                  <td className="px-6 py-3 text-elk-accent-deep font-semibold">{row.price}</td>
                  <td className="px-6 py-3 text-sm text-zinc-500">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
