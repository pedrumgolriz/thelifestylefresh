import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { JOURNAL_SHELVES, shelfLabel } from "@/lib/house";
import { publishedJournalPosts } from "@/lib/journal-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Journal",
  description: "Lifestyle, beauty, the table, and the house — from The Lifestyle Fresh journal.",
  alternates: { canonical: "/journal" },
};

const categories = JOURNAL_SHELVES.map((shelf) => shelf.key);

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const selected = categories.find((item) => item === category);

  let posts: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverTone: string;
    publishedAt: Date | null;
  }[] = [];

  try {
    posts = await prisma.post.findMany({
      where: { published: true, ...(selected ? { category: selected } : {}) },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    posts = publishedJournalPosts(selected).map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      coverTone: post.coverTone,
      publishedAt: new Date(post.publishedAt),
    }));
  }

  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-20">
      <p className="script text-2xl">The journal</p>
      <h1 className="serif mt-5 text-5xl tracking-[-0.02em] sm:text-6xl">
        A magazine you can keep.
      </h1>

      <nav className="mt-9 flex flex-wrap gap-2" aria-label="Journal categories">
        <Link
          href="/journal"
          className={`btn ${!selected ? "btn-ink" : "btn-ghost"}`}
          aria-current={!selected ? "page" : undefined}
        >
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item}
            href={`/journal?category=${item}`}
            className={`btn ${selected === item ? "btn-ink" : "btn-ghost"}`}
            aria-current={selected === item ? "page" : undefined}
          >
            {shelfLabel(item)}
          </Link>
        ))}
      </nav>

      {lead ? (
        <Link
          href={`/journal/${lead.slug}`}
          className="stationery mt-12 grid overflow-hidden md:grid-cols-2"
        >
          <div className={`min-h-64 cover-${lead.coverTone}`} aria-hidden="true" />
          <div className="p-8 sm:p-10">
            <p className="eyebrow">{shelfLabel(lead.category)}</p>
            <h2 className="serif mt-3 text-3xl tracking-[-0.02em] sm:text-4xl">{lead.title}</h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">{lead.excerpt}</p>
            <span className="link-quiet mt-6">Read the essay</span>
          </div>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <div className="mt-px grid gap-px md:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="stationery overflow-hidden"
            >
              <div className={`h-48 cover-${post.coverTone}`} aria-hidden="true" />
              <div className="p-7">
                <p className="eyebrow">{shelfLabel(post.category)}</p>
                <h2 className="serif mt-3 text-2xl tracking-[-0.02em]">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      {posts.length === 0 ? (
        <p className="mt-12 text-ink-soft">The house is between issues.</p>
      ) : null}
    </div>
  );
}
