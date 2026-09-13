import type { Metadata } from "next";
import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { APPLICATIONS_OPEN, FIRST_CORRESPONDENCE, invitationCta } from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_SHORT } from "@/lib/us";

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
      <h1 className="serif mt-6 text-5xl">Made by hand. Sent by post.</h1>
      <div className="prose-lf mt-8">
        <p>
          Established in 2019 as an editorial project; now becoming a physical
          correspondence. The Lifestyle Fresh began as a journal. The work now is an
          envelope assembled by hand, tied in ribbon, and posted once a month.
        </p>
        <p>
          The world became very good at putting everything on a screen. We wanted to make
          something you could hold. A letter. A recipe. A beautiful little thing. Something
          worth sending onward.
        </p>
        <p>
          Membership is by invitation. We keep the table intentionally small so the
          envelope can stay honest. When a place becomes available, we write. Applications
          for the first table open {APPLICATIONS_OPEN}. The first correspondence posts{" "}
          {FIRST_CORRESPONDENCE}.
        </p>
        <p>{SHIPPING_SHORT}</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/request" className="btn btn-ink">
          {invitationCta(seats.atCapacity)}
        </Link>
        <Link href="/the-box" className="btn btn-ghost">
          What’s inside
        </Link>
      </div>
    </div>
  );
}
