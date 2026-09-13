import type { Metadata } from "next";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import { SHIPPING_COPY } from "@/lib/us";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="eyebrow-brass">House rules</p>
      <h1 className="serif mt-5 text-5xl tracking-[-0.02em]">Terms.</h1>
      <div className="prose-lf mt-8">
        <p>
          Membership is {MEMBERSHIP_PRICE_LABEL} each month, billed by Stripe, and available
          only with a valid invitation. Contents vary. We promise a point of view, not a
          fixed inventory.
        </p>
        <p>{SHIPPING_COPY}</p>
        <p>
          You may cancel from the membership page. The current month’s envelope, once
          sealed, still posts. Invitations are personal and may be revoked if unused.
        </p>
      </div>
    </div>
  );
}
