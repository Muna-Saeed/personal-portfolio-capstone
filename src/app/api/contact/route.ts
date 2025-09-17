import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Accepts JSON { name, email, message } and performs minimal validation.
 * Assumptions:
 * - Consumer handles success UI; this endpoint only returns 200/400 JSON.
 * - No persistence or email sending is performed in this demo implementation.
 */

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const errors: Record<string, string> = {};
    if (!name || typeof name !== "string" || !name.trim()) errors.name = "Name is required";
    if (!email || typeof email !== "string" || !email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";
    if (!message || typeof message !== "string" || !message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // In a real app, send an email or persist to DB here.
    // For now, just respond success.
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
}


