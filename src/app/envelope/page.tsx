import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ENVELOPE_CATEGORIES,
  PRODUCT_SENTENCE,
  SEASONS,
  invitationCta,
} from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_SHORT } from "@/lib/us";

export const metadata: Metadata = {
  title: titles.envelope,
  description: descriptions.envelope,
  alternates: { canonical: "/envelope" },
};

export default async function EnvelopePage() {
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto max-w-6xl px-5 pb-24 pt-20">
      <div className="reveal-invite grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="script text-2xl">The envelope</p>
          <h1 className="serif mt-5 max-w-3xl text-5xl leading-[0.98] sm:text-6xl">
            Correspondence, sealed.
          </h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-ink">{PRODUCT_SENTENCE}</p>
          <p className="mt-5 max-w-md text-sm leading-6 text-ink-soft">
            You will not receive the pantry. That is the courtesy.
          </p>
        </div>
        <figure className="invite-arrive product-frame">
          <Image
            src="/envelope-flatlay.jpg"
            alt="A flat lay of The Lifestyle Fresh correspondence on marble: an ivory invitation card with a sketched manor in gold and calligraphy, a wax-seal stamper, forget-me-not-lined envelopes, lavender ribbon, alliums, and a cameo brooch in soft natural light."
            width={1024}
            height={682}
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </figure>
      </div>

      <section className="pt-28" aria-labelledby="character-heading">
        <p className="script text-2xl">The character</p>
        <h2 id="character-heading" className="serif mt-4 max-w-2xl text-4xl sm:text-5xl">
          Every month begins with a letter.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-ink">
          The rest is edited. We do not send everything we keep. The exact contents are never
          announced in advance.
        </p>
        <div className="mt-12 grid gap-px md:grid-cols-2">
          {ENVELOPE_CATEGORIES.map((item) => (
            <article key={item.title} className="stationery p-8">
              <h3 className="serif text-3xl">{item.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">{item.lede}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-28" aria-labelledby="year-heading">
        <p className="script text-2xl">Through the year</p>
        <h2 id="year-heading" className="serif mt-4 max-w-2xl text-4xl sm:text-5xl">
          The envelope changes with the seasons.
        </h2>
        <ul className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((season) => (
            <li key={season.name} className="stationery overflow-hidden">
              <div className={`h-24 season-${season.tone}`} aria-hidden="true" />
              <div className="p-5">
                <p className="eyebrow">{season.months}</p>
                <p className="serif mt-2 text-2xl">{season.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{season.colors}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-28" aria-labelledby="post-heading">
        <p className="script text-2xl">The post</p>
        <h2 id="post-heading" className="serif mt-4 max-w-2xl text-4xl">
          {SHIPPING_SHORT}
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-ink">
          Posted once each month. Addressed to you by hand. {SHIPPING_SHORT}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/request" className="btn btn-ink">
            {invitationCta(seats.atCapacity)}
          </Link>
          <Link href="/membership" className="btn btn-ghost">
            Membership
          </Link>
        </div>
      </section>
    </div>
  );
}
