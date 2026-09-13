import type { Metadata } from "next";
import { InviteRequestForm } from "@/components/invite-request-form";
import { Ornament } from "@/components/ornament";
import { SeatMeter } from "@/components/seat-meter";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_COPY } from "@/lib/us";

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
        <p className="script ink-write text-4xl">{seats.atCapacity ? "The wait" : "A private list"}</p>
        <Ornament className="ink-draw mt-5 max-w-xs" />
        <h1 className="serif mt-6 text-5xl">
          {seats.atCapacity ? "The table is full." : "Ask to be considered."}
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink">
          {seats.atCapacity
            ? "Leave your name. When a seat opens — someone leaves, or we raise the table — we write. There is nothing to refresh."
            : "Write once. Name, city, why you still wait for the post. We decline more than we ask. A card, if it comes, is good for one seat."}
        </p>
        {seats.atCapacity || seats.state === "last" ? <SeatMeter seats={seats} /> : null}
        <p className="mt-4 text-sm leading-6 text-ink-soft">{SHIPPING_COPY}</p>
      </div>
      <div className="invite-card invite-arrive p-6 sm:p-8">
        <InviteRequestForm atCapacity={seats.atCapacity} remaining={seats.remaining} />
      </div>
    </div>
  );
}
