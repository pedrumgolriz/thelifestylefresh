import type { Metadata } from "next";
import Link from "next/link";
import { SeatMeter } from "@/components/seat-meter";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import {
  CAP_LINE,
  CONTINENTAL_LINE,
  FIRST_CORRESPONDENCE,
  invitationCta,
} from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";

export const metadata: Metadata = {
  title: titles.membership,
  description: descriptions.membership,
  alternates: { canonical: "/membership" },
};

const experience = [
  "The monthly envelope, addressed to you by hand",
  "Private correspondence from the house",
  "Access to the journal",
  "Occasional invitations",
  "Special editions when appropriate",
];

export default async function MembershipPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="script text-4xl sm:text-5xl">Membership</p>
      <h1 className="serif mt-5 text-5xl sm:text-6xl">A small correspondence circle.</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-ink">
        Membership is by invitation. {CAP_LINE} When a place opens, the house writes.
      </p>

      <div className="invite-card mt-10 p-8">
        <p className="eyebrow">Membership</p>
        <p className="serif mt-3 text-4xl">
          {MEMBERSHIP_PRICE_LABEL}
          <span className="text-ink-soft"> /month</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Twelve envelopes a year. Postage included. No long-term commitment; cancel any month.
        </p>
        <SeatMeter seats={seats} />
        <div className="mt-7 flex flex-wrap gap-4">
          <Link href="/request" className="btn btn-ink">
            {invitationCta(seats.atCapacity)}
          </Link>
          <Link href="/join" className="btn btn-ghost">
            I have an invitation
          </Link>
        </div>
      </div>

      <section className="pt-16" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="serif text-3xl">The experience</h2>
        <ul className="mt-6 max-w-xl space-y-3 text-lg leading-7 text-ink">
          {experience.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-2 inline-block h-px w-6 bg-[var(--brass)]" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-lg text-sm leading-6 text-ink-soft">
          The first correspondence posts {FIRST_CORRESPONDENCE}. {CONTINENTAL_LINE}
        </p>
      </section>
    </div>
  );
}
