import { NextResponse } from "next/server";
import { z } from "zod";
import { adminOr401 } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(8),
  content: z.string().min(8),
  category: z.string().min(2),
  coverTone: z.string().min(2),
  published: z.boolean().optional(),
});

export async function POST(request: Request) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Incomplete essay." }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      ...parsed.data,
      published: Boolean(parsed.data.published),
      publishedAt: parsed.data.published ? new Date() : null,
    },
  });

  return NextResponse.json(post);
}
