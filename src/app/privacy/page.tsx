import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16">
      <p className="eyebrow">House rules</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.045em]">Privacy.</h1>
      <div className="prose-lf mt-8">
        <p>
          We keep what we need to post an envelope and run a membership: your name, email,
          continental US address, and Stripe identifiers. We do not sell the list.
        </p>
        <p>
          Payments are handled by Stripe. We never store a full card number. Invite requests,
          newsletter names, and cookie preferences live in our Postgres database on Railway.
        </p>
        <p>
          Write{" "}
          <a className="underline" href="mailto:hello@thelifestylefresh.com">
            hello@thelifestylefresh.com
          </a>{" "}
          to see, correct, or delete what we hold.
        </p>
      </div>
    </div>
  );
}
