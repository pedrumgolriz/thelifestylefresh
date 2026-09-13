import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { MEMBERSHIP_PRICE_LABEL } from "@/lib/catalog";
import { prisma } from "@/lib/db";
import {
  APPLICATIONS_OPEN,
  FIRST_CORRESPONDENCE,
  HOW_IT_WORKS,
  PRICE_LINE,
  PRODUCT_SENTENCE,
  SEASONS,
  WHAT_ARRIVES,
  invitationCta,
  shelfLabel,
} from "@/lib/house";
import { publishedJournalPosts } from "@/lib/journal-posts";
import { getMembershipSnapshot } from "@/lib/membership";
import { SHIPPING_SHORT } from "@/lib/us";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let posts: { slug: string; title: string; excerpt: string; category: string; coverTone: string }[] =
    [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { slug: true, title: true, excerpt: true, category: true, coverTone: true },
    });
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    posts = publishedJournalPosts()
      .slice(0, 3)
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        coverTone: post.coverTone,
      }));
  }

  const seats = await getMembershipSnapshot();
  const closed = seats.atCapacity;

  return (
    <div className="reveal-page">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-12 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal-invite">
          <p className="script ink-write text-4xl sm:text-5xl">
            {closed ? "The first table is full" : "The first table is forming"}
          </p>
          <Ornament className="ink-draw mt-5 max-w-xs" />
          <h1 className="serif mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-7xl">
            <span className="block">A little luxury,</span>
            <span className="italic text-seal">delivered by post.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink">{PRODUCT_SENTENCE}</p>
          <p className="mt-4 text-sm tracking-[0.04em] text-ink-soft">{PRICE_LINE}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request" className="btn btn-ink">
              {invitationCta(closed)}
            </Link>
            <Link href="/join" className="btn btn-ghost">
              I have an invitation
            </Link>
          </div>
          <p className="mt-4">
            <Link href="/the-box" className="inline-flex min-h-11 items-center text-sm underline">
              What’s inside
            </Link>
          </p>
          <p className="mt-5 text-sm leading-6 text-ink-soft">
            Applications open {APPLICATIONS_OPEN}. First correspondence: {FIRST_CORRESPONDENCE}.
          </p>
        </div>
        <figure className="invite-arrive product-frame">
          <Image
            src="/envelope-sealed.jpg"
            alt="A sealed ivory envelope tied in gold ribbon, with a wax seal and a postage stamp, on a writing desk."
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-5" aria-label="Membership at a glance">
        <div className="invite-card invite-arrive grid gap-6 px-6 py-6 sm:grid-cols-3">
          {[
            [MEMBERSHIP_PRICE_LABEL, "Each month. Cancel whenever you like."],
            ["Shipping included", SHIPPING_SHORT],
            [FIRST_CORRESPONDENCE, `The first mailing leaves the desk January 5.`],
          ].map(([label, detail]) => (
            <div key={label}>
              <p className="serif text-xl">{label}</p>
              <p className="mt-1 text-sm text-ink-soft">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="idea-heading">
        <p className="script text-3xl">The idea</p>
        <h2 id="idea-heading" className="serif mt-2 max-w-3xl text-4xl sm:text-5xl">
          The mailbox deserves better.
        </h2>
        <div className="prose-lf mt-6 max-w-2xl">
          <p>A letter should not feel like a bill. A recipe should not live only on a screen. A little beauty should arrive unexpectedly.</p>
          <p>
            The world became very good at putting everything on a screen. We wanted to make
            something you could hold. The Lifestyle Fresh is that answer: a monthly
            correspondence, not a box of leftovers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="receive-heading">
        <p className="script text-3xl">What you receive</p>
        <h2 id="receive-heading" className="serif mt-2 text-4xl sm:text-5xl">
          Never the whole pantry.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink">
          A letter, always. Then an edited handful — chosen, not announced. You will not
          receive everything we keep. That is the point.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {WHAT_ARRIVES.map((item, index) => (
            <article key={item.title} className="stationery p-6">
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="serif mt-2 text-3xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.lede}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm leading-6 text-ink-soft">
          The exact contents are never announced in advance. That is part of the
          correspondence.
        </p>
        <Link href="/the-box" className="mt-4 inline-flex min-h-11 items-center text-sm underline">
          See the monthly correspondence
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="product-heading">
        <h2 id="product-heading" className="serif text-4xl sm:text-5xl">
          What opening it feels like.
        </h2>
        <figure className="product-frame mt-8">
          <Image
            src="/correspondence-opened.jpg"
            alt="An opened Lifestyle Fresh correspondence: letter, recipe card, postcard, ribbon, and small objects laid on linen."
            width={1600}
            height={1200}
            sizes="(max-width: 1024px) 100vw, 72rem"
          />
        </figure>
        <ul className="mt-8 grid gap-4 sm:grid-cols-4" aria-label="The envelope through the year">
          {SEASONS.map((season) => (
            <li key={season.name} className="stationery overflow-hidden">
              <div className={`h-16 season-${season.tone}`} aria-hidden="true" />
              <div className="p-4">
                <p className="eyebrow">{season.months}</p>
                <p className="serif mt-1 text-xl">{season.colors}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="works-heading">
        <h2 id="works-heading" className="serif text-4xl">
          How it works
        </h2>
        <ol className="ritual mt-8 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.n} className="stationery p-5">
              <p className="eyebrow">{step.n}</p>
              <h3 className="serif mt-3 text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{step.lede}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="table-heading">
        <div className="invite-card px-6 py-10 sm:px-10">
          <p className="script text-3xl">The first table</p>
          <h2 id="table-heading" className="serif mt-3 text-4xl sm:text-5xl">
            {FIRST_CORRESPONDENCE}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink">
            The first correspondence will be limited. Applications open {APPLICATIONS_OPEN}.
            We keep the table intentionally small. When a place becomes available, we will
            be in touch.
          </p>
          <p className="mt-4 text-sm text-ink-soft">{PRICE_LINE}</p>
          <Link href="/request" className="btn btn-ink mt-8">
            {invitationCta(closed)}
          </Link>
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="journal-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="journal-heading" className="serif text-4xl">
              From the journal
            </h2>
            <Link href="/journal" className="inline-flex min-h-11 items-center text-sm underline">
              All essays
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="stationery overflow-hidden">
                <div className={`h-36 cover-${post.coverTone}`} aria-hidden="true" />
                <div className="p-5">
                  <p className="eyebrow">{shelfLabel(post.category)}</p>
                  <h3 className="serif mt-2 text-2xl">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
