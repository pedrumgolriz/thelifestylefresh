import type { Metadata } from "next";
import Link from "next/link";
import { InviteRequestForm } from "@/components/invite-request-form";
import { SeatMeter } from "@/components/seat-meter";
import { CONTINENTAL_LINE, capLine } from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptionsFor, titles } from "@/lib/seo";
import { SHIPPING_SHORT } from "@/lib/us";

export async function generateMetadata(): Promise<Metadata> {
  const seats = await getMembershipSnapshot();
  return {
    title: titles.request,
    description: descriptionsFor(seats.cap).request,
    alternates: { canonical: "/request" },
  };
}

export default async function RequestPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto grid max-w-5xl gap-16 px-5 pb-24 pt-20 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <p className="script text-4xl sm:text-5xl">Write to the house</p>
        <h1 className="serif mt-5 text-5xl sm:text-6xl">
          {seats.atCapacity ? "The table is full." : "Request an invitation."}
        </h1>
        <p className="mt-7 max-w-md text-lg leading-8 text-ink">
          {seats.atCapacity
            ? "Leave your name. When a place becomes available, the house writes. There is nothing to refresh."
            : "Tell us a little about why the post still matters. We keep the list intentionally short."}
        </p>
        <p className="mt-6 max-w-md text-sm leading-6 text-ink-soft">
          {capLine(seats.cap)} {CONTINENTAL_LINE} {SHIPPING_SHORT}
        </p>
        <div className="mt-8 max-w-sm">
          <SeatMeter seats={seats} />
        </div>
        <p className="mt-8">
          <Link href="/join" className="link-quiet">
            I have an invitation
          </Link>
        </p>
      </div>
      <div className="invite-card invite-arrive p-8 sm:p-10">
        <InviteRequestForm atCapacity={seats.atCapacity} remaining={seats.remaining} />
      </div>
    </div>
  );
}
