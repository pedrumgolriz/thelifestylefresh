import type { Metadata } from "next";
import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_COPY } from "@/lib/us";

export const metadata: Metadata = {
  title: titles.about,
  description: descriptions.about,
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto max-w-3xl px-5 pb-24 pt-16">
      <p className="script ink-write text-4xl">The house</p>
      <Ornament className="ink-draw mt-5 max-w-xs" />
      <h1 className="serif mt-6 text-5xl">The house behind the monthly correspondence</h1>
      <div className="prose-lf mt-8">
        <p>
          The Lifestyle Fresh began as an editorial house in 2019. The work now is
          physical: an envelope assembled by hand, tied in ribbon, and posted once a month
          to names we already keep.
        </p>
        <p>
          Membership is not offered in public. If we send a card, you may take a seat. We
          keep the table small — {seats.cap} at a time — and raise it only when the house
          can still be honest. When the table is full, names wait.
        </p>
        <p>{SHIPPING_COPY}</p>
        <p>
          Inside: a letter, always. Then an edited handful. You will not get the pantry.
          That is the point.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/request" className="btn btn-ink">
          {seats.atCapacity ? "Leave a name" : "Ask to be considered"}
        </Link>
        <Link href="/the-box" className="btn btn-ghost">
          See what is sent
        </Link>
      </div>
    </div>
  );
}
