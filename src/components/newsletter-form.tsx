"use client";

import { FormEvent, useId, useState } from "react";
import { FieldLabel } from "./field-label";

export function NewsletterForm({ source = "site" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const fieldId = useId();
  const statusId = useId();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      setStatus("ok");
      setMessage("You are on the list.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label className="grid w-full gap-2 text-sm" htmlFor={fieldId}>
        <FieldLabel required>Email address</FieldLabel>
        <input
          id={fieldId}
          className="field"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          aria-describedby={message ? statusId : undefined}
          aria-invalid={status === "error"}
        />
      </label>
      <button className="btn btn-ink shrink-0 self-end" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : "Send me the note"}
      </button>
      {message ? (
        <p
          id={statusId}
          className="w-full text-sm text-ink"
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
