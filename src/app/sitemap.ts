import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { publishedJournalPosts } from "@/lib/journal-posts";

const BASE = (process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com").replace(
  /\/$/,
  "",
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: Date; publishedAt: Date | null }[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
    });
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    posts = publishedJournalPosts().map((post) => ({
      slug: post.slug,
      updatedAt: new Date(post.publishedAt),
      publishedAt: new Date(post.publishedAt),
    }));
  }

  const staticPaths = [
    ["", 1],
    ["/the-box", 0.9],
    ["/request", 0.85],
    ["/about", 0.8],
    ["/journal", 0.8],
    ["/join", 0.4],
    ["/shipping", 0.4],
    ["/privacy", 0.3],
    ["/cookies", 0.3],
    ["/terms", 0.3],
  ] as const;

  return [
    ...staticPaths.map(([path, priority]) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${BASE}/journal/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
