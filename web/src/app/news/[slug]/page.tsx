import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/client";
import { articleBySlugQuery } from "@/sanity/queries";
import type { Article } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/RichText";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await client.fetch<Article | null>(articleBySlugQuery, { slug });

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-1 text-2xl font-bold">{article.title}</h1>
      <p className="mb-6 text-xs text-zinc-500">
        {new Date(article.articleDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      {article.image && (
        <Image
          src={urlForImage(article.image).width(800).height(420).url()}
          alt={article.title}
          width={800}
          height={420}
          className="mb-6 w-full rounded-lg object-cover"
        />
      )}
      <RichText value={article.body} />
    </div>
  );
}
