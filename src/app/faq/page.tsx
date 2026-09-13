import type { Metadata } from "next";
import Link from "next/link";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import { APPLICATIONS_OPEN, FIRST_CORRESPONDENCE, FIRST_MAILING } from "@/lib/house";
import { SHIPPING_SHORT } from "@/lib/us";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Price, shipping, what arrives, and how membership works.",
  alternates: { canonical: "/faq" },
};

const questions = [
  {
    q: "How much is membership?",
    a: `${MEMBERSHIP_PRICE_LABEL} a month. Shipping within the contiguous United States is included. There is no long-term commitment.`,
  },
  {
    q: "When does it ship?",
    a: `Once a month. The first correspondence leaves the desk ${FIRST_MAILING}. Applications open ${APPLICATIONS_OPEN}.`,
  },
  {
    q: "What is included?",
    a: "A letter, always. Then an edited handful: paper worth keeping, a little luxury chosen for the month, a delight, and something that asks you to write, cook, make, or send. You will not receive everything we keep.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Cancel any month from your membership page. If that month’s envelope has already been sealed, it still posts.",
  },
  {
    q: "Do I receive the same things as other members?",
    a: "The letter is shared. The rest is curated for the table that month. We do not take requests for specific objects, and we do not announce the contents in advance.",
  },
  {
    q: "Where do you ship?",
    a: `${SHIPPING_SHORT} Alaska, Hawaii, territories, military addresses, and international destinations are not available yet.`,
  },
  {
    q: "Can I give a membership as a gift?",
    a: "Not yet. Write to hello@thelifestylefresh.com if you would like to be told when gifts open.",
  },
  {
    q: "Can I send it to someone else?",
    a: "The invitation is personal. The envelope posts to the member’s address. If you move within the contiguous United States, update the address before the next seal.",
  },
  {
    q: "What happens after I apply?",
    a: "We read your note. If there is a place, we send an invitation with the next step. If the table is full, we keep your name and write when a place opens. There is nothing to refresh.",
  },
  {
    q: "Is invitation only real?",
    a: "Yes. Membership is not sold on the public house. A card is issued when there is a seat. Most months, that is a short list.",
  },
  {
    q: "Is everything edible, or beauty, or paper?",
    a: "No. The month is mixed on purpose: a letter, paper, a useful object, a small surprise. Beauty pieces are not guaranteed full-size. Food, when it appears, is a recipe you cook — not a perishable parcel.",
  },
] as const;

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16">
      <p className="script text-4xl">Questions</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.045em]">Asked, plainly.</h1>
      <dl className="mt-12 space-y-10">
        {questions.map((item) => (
          <div key={item.q}>
            <dt className="serif text-2xl">{item.q}</dt>
            <dd className="mt-3 text-lg leading-8 text-ink">{item.a}</dd>
          </div>
        ))}
      </dl>
      <Link href="/request" className="btn btn-ink mt-12">
        Request an Invitation
      </Link>
    </div>
  );
}
