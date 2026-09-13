import type { Metadata } from "next";
import Link from "next/link";
import { InviteRequestForm } from "@/components/invite-request-form";
import { Ornament } from "@/components/ornament";
import { APPLICATIONS_OPEN, FIRST_CORRESPONDENCE, PRICE_LINE } from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_SHORT } from "@/lib/us";

export const metadata: Metadata = {
  title: titles.request,
  description: descriptions.request,
  alternates: { canonical: "/request" },
};

export default async function RequestPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto grid max-w-5xl gap-12 px-5 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="script ink-write text-4xl">
          {seats.atCapacity ? "The wait" : "The first table"}
        </p>
        <Ornament className="ink-draw mt-5 max-w-xs" />
        <h1 className="serif mt-6 text-5xl">
          {seats.atCapacity ? "The table is full." : "Request an invitation."}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink">
          {seats.atCapacity
            ? "Leave your name. When a place becomes available, we will be in touch. There is nothing to refresh."
            : `Tell us a little about yourself. Applications open ${APPLICATIONS_OPEN}. The first correspondence posts ${FIRST_CORRESPONDENCE}. We keep the table intentionally small.`}
        </p>
        <p className="mt-4 text-sm leading-6 text-ink-soft">{PRICE_LINE}</p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{SHIPPING_SHORT}</p>
        <p className="mt-6">
          <Link href="/join" className="inline-flex min-h-11 items-center text-sm underline">
            I already have an invitation
          </Link>
        </p>
      </div>
      <div className="invite-card invite-arrive p-6 sm:p-8">
        <InviteRequestForm atCapacity={seats.atCapacity} remaining={seats.remaining} />
      </div>
    </div>
  );
}
