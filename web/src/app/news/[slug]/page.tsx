import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/client";
import { articleBySlugQuery } from "@/sanity/queries";
import type { Article } from "@/sanity/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/ui/RichText";

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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs tracking-wide text-zinc-400">
        {new Date(article.articleDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-1 text-3xl">{article.title}</h1>
      {article.image && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={urlForImage(article.image).width(900).height(506).url()}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="mt-8">
        <RichText value={article.body} />
      </div>
    </div>
  );
}
