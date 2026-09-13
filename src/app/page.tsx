import Image from "next/image";
import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { SeatMeter } from "@/components/seat-meter";
import { MONTHLY_PILLARS } from "@/lib/catalog";
import { prisma } from "@/lib/db";
import { publishedJournalPosts } from "@/lib/journal-posts";
import { getMembershipSnapshot } from "@/lib/membership";

export const dynamic = "force-dynamic";

const covers = ["cover-blush", "cover-hydrangea", "cover-wisteria", "cover-sage"];

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
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-12 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
        <figure className="invite-arrive order-1 mx-auto w-44 sm:w-56 lg:order-2 lg:w-auto">
          <div className="cameo">
            <Image
              src="/crest-ivory.jpg"
              alt="Ivory house crest: brass LF monogram, hanging wisteria, and a cream envelope tied in lilac. Established 2019."
              width={640}
              height={640}
              priority
              loading="eager"
            />
          </div>
        </figure>
        <div className="reveal-invite order-2 lg:order-1">
          <p className="script ink-write text-4xl sm:text-5xl">
            {closed ? "The list is being put away" : "The list is nearly closed"}
          </p>
          <Ornament className="ink-draw mt-5 max-w-xs" />
          <h1 className="serif mt-6 max-w-4xl text-5xl leading-[0.95] sm:text-7xl">
            <span className="block">The Lifestyle Fresh</span>
            <span className="italic text-seal">Correspondence, sealed.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink">
            A letter, something for tea, a small beauty for the dressing table — posted once
            a month to names we already keep. The continent only. Most who write will not be
            asked.
          </p>
          {closed || seats.state === "last" ? <SeatMeter seats={seats} /> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/request" className="btn btn-ink">
              {closed ? "Leave a name" : "Ask to be considered"}
            </Link>
            <Link href="/join" className="btn btn-ghost">
              I have a card
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5" aria-label="How the house keeps the list">
        <div className="invite-card invite-arrive grid gap-6 px-6 py-6 sm:grid-cols-3">
          {[
            [
              closed ? "Wait" : "Nearly spoken for",
              closed
                ? "The table is full. Names are kept."
                : "We close the list when the table is full.",
            ],
            ["Tied in ribbon", "A letter, always. Then an edited handful."],
            ["The continent", "Forty-eight states and D.C. No exceptions."],
          ].map(([label, detail]) => (
            <div key={label}>
              <p className="serif text-xl">{label}</p>
              <p className="mt-1 text-sm text-ink-soft">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="enclosed-heading">
        <p className="script text-3xl">What’s enclosed</p>
        <h2 id="enclosed-heading" className="serif mt-2 text-4xl sm:text-5xl">
          Edited. Never the whole table.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {MONTHLY_PILLARS.slice(0, 6).map((pillar, index) => (
            <article key={pillar.key} className="stationery overflow-hidden">
              <div className={`h-20 ${covers[index % covers.length]}`} aria-hidden="true" />
              <div className="p-6">
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="serif mt-2 text-3xl">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{pillar.lede}</p>
              </div>
            </article>
          ))}
        </div>
        <Link href="/the-box" className="mt-6 inline-flex min-h-11 items-center text-sm underline">
          See the monthly envelope
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="ritual-heading">
        <h2 id="ritual-heading" className="serif text-4xl">
          How a name is taken
        </h2>
        <ol className="ritual mt-8 grid list-none gap-6 p-0 md:grid-cols-3">
          {[
            ["01", "Write", "Your name, your city, and why you still wait for the post."],
            ["02", "A card", "If there is a seat, and if we ask. Most we do not."],
            ["03", "The envelope", "Once a month. The continent. Until you leave the table."],
          ].map(([n, title, copy]) => (
            <li key={n} className="stationery p-5">
              <p className="eyebrow">{n}</p>
              <h3 className="serif mt-3 text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      {posts.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pt-24" aria-labelledby="journal-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="journal-heading" className="serif text-4xl">
              Letters from the journal
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
                  <p className="eyebrow">{post.category}</p>
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
