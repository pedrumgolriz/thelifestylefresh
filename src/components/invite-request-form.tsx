"use client";

import { FormEvent, useId, useState } from "react";
import { CONTINENTAL_STATES } from "@/lib/us";
import { FieldLabel } from "./field-label";

export function InviteRequestForm({
  atCapacity = false,
}: {
  atCapacity?: boolean;
  remaining?: number;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "waitlisted" | "error">("idle");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const errorId = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch("/api/invite-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        city: data.get("city"),
        state: data.get("state"),
        note: data.get("note"),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      setName(String(data.get("name") || ""));
      setStatus(payload.waitlisted ? "waitlisted" : "ok");
      setMessage("");
      return;
    }
    setStatus("error");
    setMessage(payload.error || "We could not take that just now.");
  }

  if (status === "ok" || status === "waitlisted") {
    return (
      <div className="status-wax" role="status">
        <p className="serif-italic text-3xl">
          {status === "waitlisted" ? "Your name is kept." : "We have your name."}
        </p>
        <p className="mt-5 text-sm leading-7 text-ink">
          {status === "waitlisted"
            ? name
              ? `${name}, the table is full. When a place opens, the house writes. There is nothing to refresh.`
              : "The table is full. When a place opens, the house writes. There is nothing to refresh."
            : name
              ? `${name}, thank you. If there is a place, we will send an invitation. There is nothing to refresh.`
              : "Thank you. If there is a place, we will send an invitation. There is nothing to refresh."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-7" noValidate={false}>
      <p className="serif-italic text-3xl">Write to the house.</p>

      <label className="grid gap-2 text-sm">
        <FieldLabel required>Your name</FieldLabel>
        <input className="field" name="name" required autoComplete="name" />
      </label>

      <label className="grid gap-2 text-sm">
        <FieldLabel required>Your email</FieldLabel>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <FieldLabel required>Your city</FieldLabel>
          <input className="field" name="city" required autoComplete="address-level2" />
        </label>
        <label className="grid gap-2 text-sm">
          <FieldLabel required>Your state</FieldLabel>
          <select className="field" name="state" required defaultValue="">
            <option value="" disabled>
              Continental U.S.
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
        <FieldLabel required>Why do you still wait for the post?</FieldLabel>
        <textarea
          className="field min-h-32"
          name="note"
          required
          minLength={8}
          placeholder="A line or two. The house reads every one."
        />
      </label>

      <button className="btn btn-ink justify-self-start" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : atCapacity ? "Leave your name →" : "Send your name →"}
      </button>
      {message ? (
        <p id={errorId} className="text-sm text-lilac-deep" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
