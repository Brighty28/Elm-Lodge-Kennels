"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Props = {
  recipientEmailAddress?: string;
  emailSubject?: string;
  thankYouSlug?: string;
  subjects?: string[];
};

const DEFAULT_SUBJECTS = [
  "General Enquiry",
  "Boarding Availability",
  "Cattery Availability",
  "Daycare",
  "Pricing",
  "Other",
];

const field =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-elk-forest placeholder:text-zinc-400 focus:border-elk-forest focus:outline-none focus:ring-1 focus:ring-elk-forest";
const label =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500";

export default function ContactForm({ recipientEmailAddress, emailSubject, thankYouSlug, subjects }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const subjectOptions = subjects?.length ? subjects : DEFAULT_SUBJECTS;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const get = (n: string) => (form.elements.namedItem(n) as HTMLInputElement).value;

    const body = {
      name: get("name"),
      email: get("email"),
      comment: `Subject: ${get("subject")}\n\n${get("comment")}`,
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>Your Name</label>
          <input
            id="contact-name"
            name="name"
            required
            placeholder="John Doe"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={label}>Subject</label>
        <select id="contact-subject" name="subject" required className={field}>
          <option value="">Select an option</option>
          {subjectOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-comment" className={label}>Your Message</label>
        <textarea
          id="contact-comment"
          name="comment"
          required
          rows={5}
          maxLength={800}
          placeholder="Tell us about your pet's needs…"
          className={field}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-elk-forest px-8 py-3 text-sm font-semibold text-white transition hover:bg-elk-forest-mid disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
