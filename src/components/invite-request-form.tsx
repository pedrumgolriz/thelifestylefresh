"use client";

import { FormEvent, useId, useState } from "react";
import { INTERESTS } from "@/lib/house";
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
  const [city, setCity] = useState("");
  const errorId = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);
    const interests = data.getAll("interest").map(String);
    if (interests.length === 0) {
      setStatus("error");
      setMessage("Choose at least one thing you are drawn to.");
      return;
    }

    const response = await fetch("/api/invite-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        city: data.get("city"),
        state: data.get("state"),
        note: data.get("note"),
        love: data.get("love"),
        special: data.get("special"),
        interests: interests.join(", "),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (response.ok) {
      setCity(String(data.get("city") || ""));
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
        <p className="script text-3xl">{status === "waitlisted" ? "Your name is kept." : "We have your name."}</p>
        <p className="mt-4 text-sm leading-6 text-ink">
          {status === "waitlisted"
            ? `${city || "Your city"} is noted. When a place opens, the house writes.`
            : `${city || "Your city"} is noted. If there is a place, we will send an invitation. There is nothing to refresh.`}
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
              Contiguous U.S. only
            </option>
            {CONTINENTAL_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="grid gap-3">
        <legend className="text-sm">
          <FieldLabel required>What are you drawn to?</FieldLabel>
        </legend>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {INTERESTS.map((interest) => (
            <label key={interest} className="flex min-h-11 items-center gap-2">
              <input type="checkbox" name="interest" value={interest} />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Tell us one small thing you love</FieldLabel>
        <input className="field" name="love" required minLength={2} />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>What would make a letter in the mail feel special?</FieldLabel>
        <textarea className="field min-h-24" name="special" required minLength={8} />
      </label>
      <label className="grid gap-2 text-sm">
        <FieldLabel required>Why you still wait for the post</FieldLabel>
        <textarea className="field min-h-24" name="note" required minLength={8} />
      </label>
      <button className="btn btn-ink" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : atCapacity ? "Leave my name" : "Request an Invitation"}
      </button>
      {message ? (
        <p id={errorId} className="text-sm text-seal" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
