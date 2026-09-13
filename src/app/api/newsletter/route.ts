import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  try {
    await prisma.newsletterSignup.upsert({
      where: { email: parsed.data.email.toLowerCase() },
      update: { source: parsed.data.source },
      create: { email: parsed.data.email.toLowerCase(), source: parsed.data.source },
    });
  } catch {
    return NextResponse.json(
      { error: "The list is unavailable until the database is connected." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
