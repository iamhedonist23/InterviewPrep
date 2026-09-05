"use client";

import { FormEvent, useState } from "react";

const issueTypes = [
  "Incorrect technical information",
  "Broken code example",
  "Outdated information",
  "Broken link",
  "Typographical error",
  "Other suggestion",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error ?? "We could not send your message.");
      form.reset();
      setStatus("success");
      setMessage(result.message ?? "Thanks. Your message was sent.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send your message.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold">Name<span className="sr-only"> (optional)</span>
          <input name="name" maxLength={80} className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal" placeholder="Your name" />
        </label>
        <label className="text-sm font-bold">Email
          <input required type="email" name="email" maxLength={160} className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal" placeholder="you@example.com" />
        </label>
      </div>
      <label className="text-sm font-bold">What is this about?
        <select required name="issueType" className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal">
          <option value="">Select an option</option>
          {issueTypes.map((issueType) => <option key={issueType}>{issueType}</option>)}
        </select>
      </label>
      <label className="text-sm font-bold">Page URL<span className="sr-only"> (optional)</span>
        <input name="pageUrl" type="url" maxLength={500} className="mt-2 h-11 w-full rounded-xl border border-ink/15 bg-paper px-3 font-normal" placeholder="https://instantinterviewprep.com/..." />
      </label>
      <label className="text-sm font-bold">Message
        <textarea required name="message" minLength={10} maxLength={5000} className="mt-2 min-h-32 w-full rounded-xl border border-ink/15 bg-paper p-3 font-normal" placeholder="Describe the issue or suggestion." />
      </label>
      <label className="hidden" aria-hidden="true">Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" disabled={status === "submitting"} className="min-h-11 rounded-xl bg-coral px-5 py-3 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60">
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
      {message && <p role={status === "error" ? "alert" : "status"} className={`text-sm leading-6 ${status === "error" ? "text-error" : "text-ink/65"}`}>{message}</p>}
    </form>
  );
}
