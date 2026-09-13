import { notFound } from "next/navigation";
import { PostForm } from "@/components/post-form";
import { prisma } from "@/lib/db";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <p className="eyebrow">Journal</p>
      <h1 className="serif mt-3 text-4xl tracking-[-0.04em]">Edit essay.</h1>
      <div className="mt-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
