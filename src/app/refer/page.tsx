import type { Metadata } from "next";
import Link from "next/link";
import { SeatMeter } from "@/components/seat-meter";
import {
  CONTINENTAL_LINE,
  SHARE_CODES_PER_ENVELOPE,
  SHARE_CODE_PREFIX,
  capLine,
  invitationCta,
} from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";

export const metadata: Metadata = {
  title: "Pass an invitation — The Lifestyle Fresh",
  description:
    "Each envelope carries a few one-time invitations a member may pass to a friend. How the codes work, and what a friend does with one.",
  alternates: { canonical: "/refer" },
};

const steps = [
  {
    n: "01",
    title: "Find the codes in your envelope",
    lede: `Each month, alongside the letter, you will find ${SHARE_CODES_PER_ENVELOPE} invitation codes printed on a slip. They look like ${SHARE_CODE_PREFIX}-XXXXXX.`,
  },
  {
    n: "02",
    title: "Pass one to a friend",
    lede: "A code is personal to you in spirit, but not locked to an inbox. Hand one to someone you think belongs at the table.",
  },
  {
    n: "03",
    title: "Your friend redeems it",
    lede: `They visit /join, enter the code, and give a continental U.S. address. A code is one-time use, and it is only marked used once their payment succeeds.`,
  },
  {
    n: "04",
    title: "If the table is full",
    lede: "When the membership is full, a friend who redeems is placed on the wait; their code stays unused until a seat opens.",
  },
];

export default async function ReferPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="script text-4xl sm:text-5xl">Pass an invitation</p>
      <h1 className="serif mt-5 text-5xl sm:text-6xl">A code, slipped into a letter.</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-ink">
        Membership is by invitation, and the house trusts its members to choose the next names.
        Each envelope carries {SHARE_CODES_PER_ENVELOPE} one-time invitations you may pass along.
      </p>

      <section className="mt-12" aria-labelledby="how-heading">
        <h2 id="how-heading" className="serif text-3xl">How it works</h2>
        <ol className="mt-6 space-y-7">
          {steps.map((step) => (
            <li key={step.n} className="flex gap-5">
              <span className="serif text-2xl text-[var(--brass)]">{step.n}</span>
              <div>
                <p className="serif text-xl">{step.title}</p>
                <p className="mt-1 max-w-lg text-sm leading-6 text-ink-soft">{step.lede}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="invite-card mt-12 p-8">
        <p className="eyebrow">The house</p>
        <p className="serif mt-3 text-2xl">{capLine(seats.cap)}</p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{CONTINENTAL_LINE}</p>
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

      <p className="mt-8 max-w-lg text-sm leading-6 text-ink-soft">
        Codes are issued by the house and may be revoked if they appear to have been shared
        widely, sold, or misused. If a code does not work, write{" "}
        <a className="underline" href="mailto:hello@thelifestylefresh.com">
          hello@thelifestylefresh.com
        </a>
        .
      </p>
    </div>
  );
}
