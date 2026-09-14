import type { Metadata } from "next";
import Link from "next/link";
import { SeatMeter } from "@/components/seat-meter";
import {
  CONTINENTAL_LINE,
  capLine,
  invitationCta,
} from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptionsFor, titles } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seats = await getMembershipSnapshot();
  return {
    title: titles.house,
    description: descriptionsFor(seats.cap).house,
    alternates: { canonical: "/house" },
  };
}

const facts = [
  { label: "Established", value: "2019" },
  { label: "Assembled", value: "By hand" },
  { label: "Posted from", value: "The United States" },
  { label: "Addressed", value: "Individually, to you" },
];

export default async function HousePage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="script text-2xl">The house</p>
      <h1 className="serif mt-5 text-5xl sm:text-6xl">A small correspondence house.</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-ink">
        Established in 2019 as an editorial project, now a physical correspondence. The
        Lifestyle Fresh began as a journal. The work now is an envelope — assembled by hand,
        tied in ribbon, and posted once a month to a very small circle of names.
      </p>

      <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        <li className="flex items-baseline justify-between gap-6 py-4">
          <span className="eyebrow">The list</span>
          <span className="serif text-xl text-ink">{seats.cap} names at a time</span>
        </li>
        {facts.map((fact) => (
          <li key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
            <span className="eyebrow">{fact.label}</span>
            <span className="serif text-xl text-ink">{fact.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <p className="serif-italic text-2xl text-ink">{capLine(seats.cap)}</p>
        <p className="mt-4 max-w-lg text-lg leading-8 text-ink">
          Membership is by invitation. We keep the list intentionally short so the envelope
          can stay honest. {CONTINENTAL_LINE}
        </p>
        <SeatMeter seats={seats} />
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/request" className="btn btn-ink">
          {invitationCta(seats.atCapacity)}
        </Link>
        <Link href="/envelope" className="btn btn-ghost">
          Explore the envelope
        </Link>
      </div>
    </div>
  );
}
