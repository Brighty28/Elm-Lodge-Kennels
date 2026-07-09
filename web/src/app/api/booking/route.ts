import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/write-client";

type BookingBody = {
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  dogName?: string;
  dogBreed?: string;
  dogSize?: string;
  numberOfDogs?: number;
  checkIn?: string;
  checkOut?: string;
  specialRequirements?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as BookingBody;
  const { ownerName, ownerEmail, ownerPhone, dogName, dogSize, checkIn, checkOut } = body;

  if (!ownerName || !ownerEmail || !ownerPhone || !dogName || !dogSize || !checkIn || !checkOut) {
    return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(ownerEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (checkIn >= checkOut) {
    return NextResponse.json({ error: "Check-out date must be after check-in date." }, { status: 400 });
  }

  // Write booking to Sanity if a write token is configured.
  const writeToken = process.env.SANITY_WRITE_TOKEN;
  if (writeToken) {
    try {
      await writeClient.create({
        _type: "booking",
        status: "pending",
        submittedAt: new Date().toISOString(),
        ownerName: body.ownerName,
        ownerEmail: body.ownerEmail,
        ownerPhone: body.ownerPhone,
        dogName: body.dogName,
        dogBreed: body.dogBreed ?? "",
        dogSize: body.dogSize,
        numberOfDogs: body.numberOfDogs ?? 1,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        specialRequirements: body.specialRequirements ?? "",
      });
    } catch (err) {
      console.error("Failed to write booking to Sanity:", err);
      // Non-fatal — still send the email.
    }
  }

  // Send email notification via Resend.
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (apiKey && recipient) {
    const text = [
      `New booking request from elmlodgekennels.co.uk`,
      ``,
      `Owner: ${ownerName}`,
      `Email: ${ownerEmail}`,
      `Phone: ${ownerPhone}`,
      ``,
      `Dog name(s): ${dogName}`,
      `Breed: ${body.dogBreed || "Not specified"}`,
      `Size: ${dogSize}`,
      `Number of dogs: ${body.numberOfDogs ?? 1}`,
      ``,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      ``,
      `Special requirements: ${body.specialRequirements || "None"}`,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FORM_SENDER ?? "no-reply@elmlodgekennels.co.uk",
        to: recipient,
        subject: `Booking request — ${dogName} (${checkIn} to ${checkOut})`,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send booking email:", await res.text());
    }
  }

  return NextResponse.json({ ok: true });
}
