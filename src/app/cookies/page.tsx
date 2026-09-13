import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16">
      <p className="eyebrow">House rules</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.045em]">Cookies.</h1>
      <div className="prose-lf mt-8">
        <p>
          Essential cookies keep you signed in to the desk and to membership. They are a
          signed, HTTP-only session — not an advertising profile.
        </p>
        <p>
          If you accept all cookies, we may use a light analytics cookie to understand which
          rooms of the house are visited. You can refuse those and still request an invite,
          subscribe, and read the journal.
        </p>
        <p>
          Your choice is stored locally in the browser as <code>lf_cookie_consent</code>.
        </p>
      </div>
    </div>
  );
}
