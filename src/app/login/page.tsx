"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldLabel } from "@/components/field-label";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    if (response.ok) {
      const data = await response.json();
      router.push(data.role === "ADMIN" ? "/admin" : "/account");
      router.refresh();
      return;
    }
    setError("Those credentials were not recognized.");
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-24 pt-20">
      <p className="script text-4xl">Members</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.04em]">Sign in.</h1>
      <form onSubmit={onSubmit} className="invite-card mt-8 grid gap-4 p-6">
        <label className="grid gap-2 text-sm">
          <FieldLabel required>Email</FieldLabel>
          <input className="field" type="email" name="email" required autoComplete="email" />
        </label>
        <label className="grid gap-2 text-sm">
          <FieldLabel required>Password</FieldLabel>
          <input
            className="field"
            type="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </label>
        <button className="btn btn-ink">Enter</button>
        {error ? (
          <p className="text-sm text-seal" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
