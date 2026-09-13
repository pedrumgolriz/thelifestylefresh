import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import {
  FIRST_CORRESPONDENCE,
  PRICE_LINE,
  PRODUCT_SENTENCE,
  SEASONS,
  WHAT_ARRIVES,
} from "@/lib/house";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_SHORT } from "@/lib/us";

export const metadata: Metadata = {
  title: titles.envelope,
  description: descriptions.envelope,
  alternates: { canonical: "/the-box" },
};

export default function TheBoxPage() {
  return (
    <div className="reveal-page mx-auto max-w-6xl px-5 pb-24 pt-16">
      <div className="reveal-invite grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="script ink-write text-4xl sm:text-5xl">The correspondence</p>
          <Ornament className="ink-draw mt-5 max-w-xs" />
          <h1 className="serif mt-6 max-w-3xl text-5xl leading-[0.95] sm:text-6xl">
            Never the whole pantry.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink">{PRODUCT_SENTENCE}</p>
          <p className="mt-4 text-sm text-ink-soft">{PRICE_LINE}</p>
        </div>
        <figure className="invite-arrive product-frame">
          <Image
            src="/correspondence-opened.jpg"
            alt="Opened monthly correspondence: a letter, recipe card, postcard, ribbon, and small objects on linen."
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </figure>
      </div>

      <section className="pt-24" aria-labelledby="arrives-heading">
        <p className="script text-3xl">What arrives</p>
        <h2 id="arrives-heading" className="serif mt-2 text-4xl sm:text-5xl">
          Every month begins with a letter.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {WHAT_ARRIVES.map((item, index) => (
            <article key={item.title} className="stationery p-7">
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="serif mt-3 text-3xl">{item.title}</h3>
              <p className="mt-3 text-[1.05rem] leading-7 text-ink">{item.lede}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-ink">
          The exact contents are never announced in advance. That is part of the
          correspondence. You will not receive the pantry. That is the courtesy.
        </p>
      </section>

      <section className="pt-24" aria-labelledby="includes-heading">
        <h2 id="includes-heading" className="serif text-4xl">
          Membership includes
        </h2>
        <ul className="mt-6 max-w-xl space-y-2 text-lg leading-8 text-ink">
          <li>The monthly correspondence — a letter, always, then an edited handful</li>
          <li>Curated paper goods worth keeping</li>
          <li>One or more small luxuries chosen for the month</li>
          <li>Shipping within the contiguous United States</li>
        </ul>
        <p className="mt-6 text-sm text-ink-soft">
          {MEMBERSHIP_PRICE_LABEL} a month. No long-term commitment. Cancel anytime. First
          mailing {FIRST_CORRESPONDENCE}.
        </p>
      </section>

      <section className="pt-24" aria-labelledby="season-heading">
        <h2 id="season-heading" className="serif text-4xl">
          The envelope changes with the year.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink">
          Four dresses. One house. You should be able to recognise a Lifestyle Fresh
          envelope from across the hall.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((season) => (
            <li key={season.name} className="stationery overflow-hidden">
              <div className={`h-20 season-${season.tone}`} aria-hidden="true" />
              <div className="p-5">
                <p className="eyebrow">{season.months}</p>
                <p className="serif mt-2 text-2xl">{season.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{season.colors}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 max-w-2xl text-sm leading-7 text-ink-soft">{SHIPPING_SHORT}</p>
      <Link href="/request" className="btn btn-ink mt-8">
        Request an Invitation
      </Link>
    </div>
  );
}
