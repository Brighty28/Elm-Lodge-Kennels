"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const SIZES = ["Daycare", "Small", "Medium", "Large", "Extra Large"] as const;

const fieldClass =
  "w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-elk-accent-deep focus:outline-none";
const labelClass = "mb-1 block text-xs font-semibold tracking-wide text-elk-body";

export default function BookingForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value;

    const body = {
      ownerName: get("ownerName"),
      ownerEmail: get("ownerEmail"),
      ownerPhone: get("ownerPhone"),
      dogName: get("dogName"),
      dogBreed: get("dogBreed"),
      dogSize: get("dogSize"),
      numberOfDogs: Number(get("numberOfDogs")) || 1,
      checkIn: get("checkIn"),
      checkOut: get("checkOut"),
      specialRequirements: (form.elements.namedItem("specialRequirements") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-base font-semibold text-elk-heading">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ownerName" className={labelClass}>Full name *</label>
            <input id="ownerName" name="ownerName" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="ownerPhone" className={labelClass}>Phone number *</label>
            <input id="ownerPhone" name="ownerPhone" type="tel" required className={fieldClass} />
          </div>
        </div>
        <div>
          <label htmlFor="ownerEmail" className={labelClass}>Email address *</label>
          <input id="ownerEmail" name="ownerEmail" type="email" required className={fieldClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-base font-semibold text-elk-heading">About your dog</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dogName" className={labelClass}>Dog name(s) *</label>
            <input id="dogName" name="dogName" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="dogBreed" className={labelClass}>Breed</label>
            <input id="dogBreed" name="dogBreed" className={fieldClass} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dogSize" className={labelClass}>Size *</label>
            <select id="dogSize" name="dogSize" required className={fieldClass}>
              <option value="">Please select…</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="numberOfDogs" className={labelClass}>Number of dogs *</label>
            <input
              id="numberOfDogs"
              name="numberOfDogs"
              type="number"
              min={1}
              max={10}
              defaultValue={1}
              required
              className={fieldClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-base font-semibold text-elk-heading">Stay dates</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkIn" className={labelClass}>Check-in date *</label>
            <input id="checkIn" name="checkIn" type="date" required className={fieldClass} />
          </div>
          <div>
            <label htmlFor="checkOut" className={labelClass}>Check-out date *</label>
            <input id="checkOut" name="checkOut" type="date" required className={fieldClass} />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="specialRequirements" className={labelClass}>
          Special requirements or medication notes
        </label>
        <textarea
          id="specialRequirements"
          name="specialRequirements"
          rows={4}
          maxLength={800}
          className={fieldClass}
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
        className="rounded-full bg-elk-accent-deep px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Booking Request"}
      </button>
      <p className="text-xs text-zinc-400">
        * Required. We&apos;ll confirm availability by email or phone within one working day.
      </p>
    </form>
  );
}
