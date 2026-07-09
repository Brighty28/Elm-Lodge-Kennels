import PageHeader from "@/components/ui/PageHeader";
import BookingForm from "@/components/ui/BookingForm";

export const metadata = {
  title: "Book a Stay | Elm Lodge Kennels",
  description: "Request a boarding stay for your dog at Elm Lodge Kennels, Wisbech. Fill in your dog's details and preferred dates and we'll confirm availability.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <PageHeader title="Book a Stay" />
      <p className="mt-4 text-elk-body">
        Fill in the form below and we&apos;ll get back to you within one working day to confirm
        availability and answer any questions. We can also administer medication at no extra charge.
      </p>

      <div className="mt-10">
        <BookingForm />
      </div>
    </div>
  );
}
