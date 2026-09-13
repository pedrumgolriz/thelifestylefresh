import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { shelfLabel } from "@/lib/house";
import { journalPostBySlug } from "@/lib/journal-posts";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (post?.published) return { title: post.title, description: post.excerpt };
  } catch {
    /* fall through to the house archive */
  }
  const archived = journalPostBySlug(slug);
  if (archived) return { title: archived.title, description: archived.excerpt };
  return { title: "Journal" };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.post.findUnique({ where: { slug } });
  } catch {
    post = null;
  }
  if (!post?.published) {
    const archived = journalPostBySlug(slug);
    if (!archived) notFound();
    post = {
      ...archived,
      published: true,
      publishedAt: new Date(archived.publishedAt),
    };
  }

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-20">
      <Link href="/journal" className="eyebrow-brass">
        The journal
      </Link>
      <p className="mt-8 eyebrow">{shelfLabel(post.category)}</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.02em]">{post.title}</h1>
      <p className="mt-5 text-lg leading-8 text-ink-soft">{post.excerpt}</p>
      <div className={`mt-10 h-56 cover-${post.coverTone}`} aria-hidden="true" />
      <div
        className="prose-lf mt-12"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </article>
  );
}
