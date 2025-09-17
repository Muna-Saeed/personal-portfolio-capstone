"use client";

import { useState } from "react";

/**
 * Contact form component with required-field validation and accessible errors.
 * Assumptions:
 * - Uses client-side validation before POSTing to `/api/contact`.
 * - Server response is not parsed here; success assumed when `fetch` resolves.
 * Edge cases:
 * - Whitespace-only inputs are treated as empty.
 * - Invalid email pattern shows a specific error.
 */

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Validate required fields from a form element and set error messages.
   * Returns true when valid, false otherwise.
   */
  function validate(form: HTMLFormElement) {
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Name is required";
    if (!email) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email";
    if (!message) nextErrors.message = "Message is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  /**
   * Handle submit: validate, then POST JSON to `/api/contact`.
   * On success, shows confirmation and resets the form; on failure,
   * returns to idle without surfacing an error banner (keep UX simple).
   */
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    setStatus("submitting");
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatus("submitted");
      form.reset();
    } catch (err) {
      setStatus("idle");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-2xl">
        <h2 id="contact-heading" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Contact</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Have a project in mind? Let’s talk.</p>

        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6" aria-describedby={status === "submitted" ? "contact-success" : undefined}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-800 dark:text-slate-200">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-800 dark:text-slate-200">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-800 dark:text-slate-200">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-70 dark:focus-visible:ring-offset-slate-900"
              aria-label="Send message"
            >
              {status === "submitting" ? "Sending…" : "Send"}
            </button>
            {status === "submitted" && (
              <p id="contact-success" role="status" className="text-sm text-green-700 dark:text-green-400">Thanks! I’ll get back to you soon.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}


