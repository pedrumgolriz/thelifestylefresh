import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Journal</p>
          <h1 className="serif mt-3 text-4xl tracking-[-0.04em]">Essays.</h1>
        </div>
        <Link href="/admin/posts/new" className="btn btn-ink">
          New essay
        </Link>
      </div>
      <div className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
        {posts.map((post) => (
          <Link key={post.id} href={`/admin/posts/${post.id}`} className="block py-5">
            <p className="serif text-2xl tracking-[-0.03em]">{post.title}</p>
            <p className="text-sm text-ink-soft">
              {post.category} · {post.published ? "Published" : "Draft"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
