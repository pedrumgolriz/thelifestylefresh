import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { publishedJournalPosts } from "@/lib/journal-posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description: "Lifestyle, wellness, recipes, and beauty from The Lifestyle Fresh.",
};

const categories = ["Lifestyle", "Wellness", "Recipes", "Beauty", "Journal"];

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

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16">
      <p className="script text-4xl">The journal</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.04em] sm:text-6xl">Letters, published.</h1>
      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Journal categories">
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
            {item}
          </Link>
        ))}
      </nav>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="stationery overflow-hidden"
          >
            <div className={`h-40 cover-${post.coverTone}`} aria-hidden="true" />
            <div className="p-6">
              <p className="eyebrow">{post.category}</p>
              <h2 className="serif mt-2 text-3xl tracking-[-0.03em]">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 ? (
        <p className="mt-10 text-ink-soft">The house is between issues.</p>
      ) : null}
    </div>
  );
}
