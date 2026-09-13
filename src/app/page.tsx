import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { SeatMeter } from "@/components/seat-meter";
import { prisma } from "@/lib/db";
import {
  ARCHIVE,
  CAP_LINE,
  CONTINENTAL_LINE,
  ENVELOPE_CATEGORIES,
  PRODUCT_SENTENCE,
  invitationCta,
  shelfLabel,
} from "@/lib/house";
import { publishedJournalPosts } from "@/lib/journal-posts";
import { getMembershipSnapshot } from "@/lib/membership";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let posts: { slug: string; title: string; excerpt: string; category: string; coverTone: string }[] =
    [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 2,
      select: { slug: true, title: true, excerpt: true, category: true, coverTone: true },
    });
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    posts = publishedJournalPosts()
      .slice(0, 2)
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
      {/* Hero — the envelope is the visual hero. */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-10 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal-invite">
          <p className="script ink-write text-4xl sm:text-5xl">
            {closed ? "The first table is full" : "The first table is forming"}
          </p>
          <Ornament className="ink-draw mt-5 max-w-xs" />
          <h1 className="serif mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-7xl">
            <span className="block">A little luxury,</span>
            <span className="serif-italic text-plum">delivered by post.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink">{PRODUCT_SENTENCE}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/request" className="btn btn-ink">
              {invitationCta(closed)}
            </Link>
            <Link href="/envelope" className="link-quiet">
              Explore the envelope
            </Link>
          </div>
          <p className="mt-7 max-w-md text-sm leading-6 text-ink-soft">
            {CAP_LINE} {CONTINENTAL_LINE}
          </p>
        </div>
        <figure className="invite-arrive product-frame">
          <Image
            src="/hero-envelope.jpg"
            alt="A flat lay of The Lifestyle Fresh correspondence on marble: an ivory envelope sealed with a lilac wax monogram and tied in silk ribbon, a letter signed 'The House' in cursive, a brass fountain pen, and a postage stamp in soft natural light."
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </figure>
      </section>

      {/* 250 names — the membership cap, stated plainly. */}
      <section className="mx-auto max-w-6xl px-5 pt-20" aria-labelledby="house-heading">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="script text-4xl sm:text-5xl">The house</p>
            <h2 id="house-heading" className="serif mt-4 max-w-2xl text-4xl sm:text-5xl">
              {CAP_LINE}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-8 text-ink">
              Membership is by invitation, and the list is short on purpose. When a place
              opens, the house writes. There is nothing to refresh.
            </p>
          </div>
          <div className="invite-card p-7">
            <SeatMeter seats={seats} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/request" className="btn btn-ink">
                {invitationCta(closed)}
              </Link>
              <Link href="/house" className="btn btn-ghost">
                The house
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The character of the envelope — categories, not an inventory. */}
      <section className="mx-auto max-w-6xl px-5 pt-28" aria-labelledby="envelope-heading">
        <p className="script text-4xl sm:text-5xl">The envelope</p>
        <h2 id="envelope-heading" className="serif mt-4 max-w-2xl text-4xl sm:text-5xl">
          Edited. Never the whole table.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-8 text-ink">
          A sealed envelope, once a month. The exact contents are never announced in advance.
          That is part of the correspondence.
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

      {/* From the archive — real previous envelopes. */}
      <section className="mx-auto max-w-6xl px-5 pt-28" aria-labelledby="archive-heading">
        <div className="flex items-end justify-between gap-4">
        <div>
          <p className="script text-4xl sm:text-5xl">From the archive</p>
          <h2 id="archive-heading" className="serif mt-4 text-4xl sm:text-5xl">
            Previous envelopes
          </h2>
        </div>
        </div>
        <p className="mt-5 max-w-lg text-lg leading-8 text-ink">
          A record of what the house has sent. The archive shows the character of the
          envelope without spoiling the next one.
        </p>
        <ul className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {ARCHIVE.map((entry) => (
            <li key={`${entry.month}-${entry.year}`} className="stationery overflow-hidden">
              <div className={`relative h-44 cover-${entry.tone}`} aria-hidden="true">
                <span className="serif-italic absolute bottom-3 left-4 text-lg text-paper-lift">
                  {entry.month}
                </span>
              </div>
              <div className="p-5">
                <p className="eyebrow">{entry.year}</p>
                <h3 className="serif mt-2 text-xl">{entry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{entry.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* The journal — fewer, larger stories. */}
      {posts.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pt-28" aria-labelledby="journal-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="script text-4xl sm:text-5xl">The journal</p>
              <h2 id="journal-heading" className="serif mt-4 text-4xl sm:text-5xl">
                From the house
              </h2>
            </div>
            <Link href="/journal" className="link-quiet">
              All essays
            </Link>
          </div>
          <div className="mt-12 grid gap-px md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="stationery overflow-hidden"
              >
                <div className={`h-56 cover-${post.coverTone}`} aria-hidden="true" />
                <div className="p-7">
                  <p className="eyebrow">{shelfLabel(post.category)}</p>
                  <h3 className="serif mt-3 text-3xl">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* A quiet close. */}
      <section className="mx-auto max-w-3xl px-5 pt-32 text-center" aria-labelledby="close-heading">
        <h2 id="close-heading" className="serif text-4xl sm:text-5xl">
          There is a house. It sends an envelope.
        </h2>
        <p className="mt-5 text-lg leading-8 text-ink">
          There are only 250 names. Perhaps yours might be one of them.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/request" className="btn btn-ink">
            {invitationCta(closed)}
          </Link>
          <Link href="/join" className="btn btn-ghost">
            I have an invitation
          </Link>
        </div>
      </section>
    </div>
  );
}
