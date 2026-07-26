"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Props = {
  recipientEmailAddress?: string;
  emailSubject?: string;
  thankYouSlug?: string;
};

export default function ContactForm({
  recipientEmailAddress,
  emailSubject,
  thankYouSlug,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      comment: (form.elements.namedItem("comment") as HTMLTextAreaElement).value,
      recipientEmailAddress,
      emailSubject,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      router.push(thankYouSlug ? `/${thankYouSlug}` : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold tracking-wide text-elk-body">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-elk-accent-deep focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold tracking-wide text-elk-body">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-elk-accent-deep focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-comment" className="mb-1 block text-xs font-semibold tracking-wide text-elk-body">
          Comment
        </label>
        <textarea
          id="contact-comment"
          name="comment"
          required
          maxLength={500}
          rows={5}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-elk-accent-deep focus:outline-none"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-elk-accent-deep px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
