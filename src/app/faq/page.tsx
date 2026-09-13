import type { Metadata } from "next";
import Link from "next/link";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import { APPLICATIONS_OPEN, FIRST_MAILING, invitationCta } from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { SHIPPING_SHORT } from "@/lib/us";

export const metadata: Metadata = {
  title: "Questions",
  description: "Price, shipping, what arrives, and how membership works.",
  alternates: { canonical: "/faq" },
};

const questions = [
  {
    q: "How much is membership?",
    a: `${MEMBERSHIP_PRICE_LABEL} a month. Postage within the continental United States is included. Twelve envelopes a year. No long-term commitment.`,
  },
  {
    q: "When does it post?",
    a: `Once a month. The first correspondence leaves the desk ${FIRST_MAILING}. Applications open ${APPLICATIONS_OPEN}.`,
  },
  {
    q: "What is included?",
    a: "A letter, always. Then something for the table, the dressing table, something to send onward, and something unexpected. You will not receive the whole table. That is the courtesy.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Cancel any month from your membership page. If that month's envelope has already been sealed, it still posts.",
  },
  {
    q: "Do I receive the same things as other members?",
    a: "The letter is shared. The rest is edited for the month. We do not take requests for specific objects, and we do not announce the contents in advance.",
  },
  {
    q: "Where do you post?",
    a: `${SHIPPING_SHORT} Alaska, Hawaii, territories, military addresses, and international destinations are not available yet.`,
  },
  {
    q: "Can I give a membership as a gift?",
    a: "Not yet. Write to hello@thelifestylefresh.com if you would like to be told when gifts open.",
  },
  {
    q: "Can I send it to someone else?",
    a: "The invitation is personal. The envelope posts to the member's address. If you move within the continental United States, update the address before the next seal.",
  },
  {
    q: "What happens after I write to the house?",
    a: "We read your note. If there is a place, we send an invitation with the next step. If the table is full, we keep your name and write when a place opens. There is nothing to refresh.",
  },
  {
    q: "Is invitation only real?",
    a: "Yes. Membership is not sold on the public house. An invitation is issued when there is a seat. The house keeps 250 names at a time.",
  },
] as const;

export default async function FaqPage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-20">
      <p className="script text-4xl sm:text-5xl">Questions</p>
      <h1 className="serif mt-5 text-5xl sm:text-6xl">Asked, plainly.</h1>
      <dl className="mt-12 space-y-10">
        {questions.map((item) => (
          <div key={item.q}>
            <dt className="serif text-2xl">{item.q}</dt>
            <dd className="mt-3 text-lg leading-8 text-ink">{item.a}</dd>
          </div>
        ))}
      </dl>
      <Link href="/request" className="btn btn-ink mt-12">
        {invitationCta(seats.atCapacity)}
      </Link>
    </div>
  );
}
