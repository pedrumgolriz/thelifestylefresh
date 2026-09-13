import type { Metadata } from "next";
import Image from "next/image";
import { Ornament } from "@/components/ornament";
import { CATALOG, MONTHLY_PILLARS } from "@/lib/catalog";
import { descriptions, titles } from "@/lib/seo";
import { SHIPPING_COPY } from "@/lib/us";

export const metadata: Metadata = {
  title: titles.envelope,
  description: descriptions.envelope,
  alternates: { canonical: "/the-box" },
};

export default function TheBoxPage() {
  return (
    <div className="reveal-page mx-auto max-w-6xl px-5 pb-24 pt-16">
      <div className="reveal-invite grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="script ink-write text-4xl sm:text-5xl">Tied in lilac</p>
          <Ornament className="ink-draw mt-5 max-w-xs" />
          <h1 className="serif mt-6 max-w-3xl text-5xl leading-[0.95] sm:text-6xl">
            Never the whole house.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink">
            Ten things we always consider. Then an edited handful — as if the table were
            set for four, not forty. You will not receive the pantry. That is the courtesy.
          </p>
        </div>
        <figure className="invite-arrive mx-auto w-52 sm:w-64 lg:w-80">
          <div className="cameo">
            <Image
              src="/crest-ivory.jpg"
              alt="Ivory house crest: brass LF monogram, hanging wisteria, and a cream envelope tied in lilac. Established 2019."
              width={640}
              height={640}
              priority
            />
          </div>
        </figure>
      </div>

      <section className="pt-24" aria-labelledby="setting-heading">
        <p className="script text-3xl">The place setting</p>
        <h2 id="setting-heading" className="serif mt-2 text-4xl sm:text-5xl">
          Always considered. Never all at once.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {MONTHLY_PILLARS.map((pillar, index) => (
            <article key={pillar.key} className="stationery p-7">
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="serif mt-3 text-3xl">{pillar.title}</h3>
              <p className="mt-3 text-[1.05rem] leading-7 text-ink">{pillar.lede}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-24" aria-labelledby="pantry-heading">
        <p className="script text-3xl">From the pantry</p>
        <h2 id="pantry-heading" className="serif mt-2 text-4xl sm:text-5xl">
          What may visit.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink">
          A rotation, not a catalogue. Some months a stamp. Some months a seed. You will
          not know which until the ribbon is undone.
        </p>
        <div className="ledger mt-12">
          {CATALOG.map((item) => (
            <div key={item.slug} className="ledger-row grid gap-3 py-6 md:grid-cols-[8rem_1fr_7rem]">
              <p className="eyebrow pt-1">{item.category}</p>
              <div>
                <p className="serif text-2xl">{item.name}</p>
                <p className="mt-2 text-[1.02rem] leading-7 text-ink-soft">{item.description}</p>
              </div>
              <p className="text-sm text-ink md:text-right">
                {item.monthly ? "Each month, considered" : "When the house chooses"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-16 max-w-2xl text-sm leading-7 text-ink-soft">{SHIPPING_COPY}</p>
    </div>
  );
}
