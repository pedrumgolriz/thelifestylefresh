"use client";

import { FormEvent, useState } from "react";
import { CONTINENTAL_STATES, SHIPPING_COPY } from "@/lib/us";
import { FieldLabel } from "./field-label";

export function JoinForm({ initialCode = "" }: { initialCode?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "waitlisted">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.url) {
      window.location.href = data.url;
      return;
    }
    if (data.waitlisted || response.status === 409) {
      setStatus("waitlisted");
      setMessage(
        data.error ||
          "The table is full. Your name is on the wait. A seat will be offered when one opens.",
      );
      return;
    }
    setStatus("error");
    setMessage(data.error || "Checkout could not start.");
  }

  if (status === "waitlisted") {
    return (
      <div className="status-wax" role="status">
        <p className="script text-3xl">You wait.</p>
        <p className="mt-4 text-sm leading-6 text-ink">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Invitation code</FieldLabel>
        <input
          className="field uppercase tracking-[0.12em]"
          name="code"
          required
          defaultValue={initialCode}
          autoComplete="off"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Full name</FieldLabel>
        <input className="field" name="name" required autoComplete="name" />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Email</FieldLabel>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Password for the membership page</FieldLabel>
        <input
          className="field"
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Address</FieldLabel>
        <input className="field" name="addressLine1" required autoComplete="address-line1" />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel>Apartment, suite</FieldLabel>
        <input className="field" name="addressLine2" autoComplete="address-line2" />
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm sm:col-span-1">
          <FieldLabel required>City</FieldLabel>
          <input className="field" name="city" required autoComplete="address-level2" />
        </label>
        <label className="grid gap-2 text-sm">
          <FieldLabel required>State</FieldLabel>
          <select className="field" name="state" required defaultValue="">
            <option value="" disabled>
              Contiguous U.S. only
            </option>
            {CONTINENTAL_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          <FieldLabel required>ZIP</FieldLabel>
          <input className="field" name="postalCode" required autoComplete="postal-code" />
        </label>
      </div>
      <p className="text-sm leading-6 text-ink-soft">{SHIPPING_COPY}</p>
      <button className="btn btn-ink" disabled={status === "loading"}>
        {status === "loading" ? "Opening your card" : "Redeem your card →"}
      </button>
      {message ? (
        <p className="text-sm text-seal" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
