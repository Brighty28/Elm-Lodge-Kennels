import { NextResponse } from "next/server";

type ContactRequestBody = {
  name?: string;
  email?: string;
  comment?: string;
  recipientEmailAddress?: string;
  emailSubject?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as ContactRequestBody;
  const { name, email, comment, recipientEmailAddress, emailSubject } = body;

  if (!name || !email || !comment) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (comment.length > 500) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const recipient = recipientEmailAddress || process.env.CONTACT_FORM_RECIPIENT;
  const apiKey = process.env.RESEND_API_KEY;

  if (!recipient || !apiKey) {
    console.error("Contact form is not configured: missing recipient or RESEND_API_KEY.");
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FORM_SENDER ?? "no-reply@elmlodgekennels.co.uk",
      to: recipient,
      subject: emailSubject || "New enquiry from elmlodgekennels.co.uk",
      text: `Name: ${name}\nEmail: ${email}\n\n${comment}`,
    }),
  });

  if (!res.ok) {
    console.error("Failed to send contact form email", await res.text());
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
