"use client";

import { FormEvent, useId, useState } from "react";
import { CONTINENTAL_STATES } from "@/lib/us";
import { FieldLabel } from "./field-label";

export function InviteRequestForm({
  atCapacity = false,
  remaining = 0,
}: {
  atCapacity?: boolean;
  remaining?: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "waitlisted" | "error">("idle");
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const errorId = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/invite-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      setCity(String(form.get("city") || ""));
      setStatus(data.waitlisted ? "waitlisted" : "ok");
      setMessage("");
      return;
    }
    setStatus("error");
    setMessage(data.error || "We could not take that just now.");
  }

  if (status === "ok" || status === "waitlisted") {
    return (
      <div className="status-wax" role="status">
        <p className="script text-3xl">{status === "waitlisted" ? "You wait." : "We have your name."}</p>
        <p className="mt-4 text-sm leading-6 text-ink">
          {status === "waitlisted"
            ? `${city || "Your city"} is noted. Do not write again. When a seat opens, the house writes.`
            : `${city || "Your city"} is noted. You are not a member. Do not write again.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Name</FieldLabel>
        <input className="field" name="name" required autoComplete="name" />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Email</FieldLabel>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <FieldLabel required>City</FieldLabel>
          <input className="field" name="city" required autoComplete="address-level2" />
        </label>
        <label className="grid gap-2 text-sm">
          <FieldLabel required>State</FieldLabel>
          <select className="field" name="state" required defaultValue="">
            <option value="" disabled>
              Select a continental state
            </option>
            {CONTINENTAL_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Why you still wait for the post</FieldLabel>
        <textarea className="field min-h-32" name="note" required minLength={8} />
      </label>
      <button className="btn btn-ink" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : atCapacity ? "Leave my name" : "Submit my name"}
      </button>
      {!atCapacity && remaining > 0 && remaining <= 10 ? (
        <p className="text-sm text-seal">
          {remaining} {remaining === 1 ? "place remains" : "places remain"} after this reading.
        </p>
      ) : null}
      {message ? (
        <p id={errorId} className="text-sm text-seal" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
