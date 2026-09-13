"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const KEY = "lf_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- banner must appear only after hydration to avoid mismatch
    if (!stored) setVisible(true);
  }, []);

  function choose(value: "all" | "essential") {
    window.localStorage.setItem(KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div
        className="glass-strong cookie-rise mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
        role="region"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div>
          <p id={titleId} className="serif text-lg">
            Cookies
          </p>
          <p id={descId} className="mt-1 max-w-xl text-sm leading-6 text-ink">
            Essential cookies keep you signed in. Optional cookies help the house.{" "}
            <Link href="/cookies" className="underline">
              Read the cookie note
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" className="btn btn-ghost" onClick={() => choose("essential")}>
            Essential only
          </button>
          <button type="button" className="btn btn-ink" onClick={() => choose("all")}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
