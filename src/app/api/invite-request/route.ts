import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getMembershipSnapshot } from "@/lib/membership";
import { isContinentalState } from "@/lib/us";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  city: z.string().min(2),
  state: z.string().min(2),
  note: z.string().min(8),
  love: z.string().min(2),
  special: z.string().min(8),
  interests: z.string().min(2),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please complete every line." }, { status: 400 });
  }
  if (!isContinentalState(parsed.data.state)) {
    return NextResponse.json(
      { error: "We currently ship within the contiguous United States." },
      { status: 400 },
    );
  }

  try {
    const seats = await getMembershipSnapshot();
    const waitlisted = seats.atCapacity;
    await prisma.inviteRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        city: parsed.data.city,
        state: parsed.data.state.toUpperCase(),
        note: [
          parsed.data.note,
          `Drawn to: ${parsed.data.interests}`,
          `Loves: ${parsed.data.love}`,
          `Mail: ${parsed.data.special}`,
        ].join("\n\n"),
        status: waitlisted ? "waitlisted" : "pending",
      },
    });
    return NextResponse.json({
      ok: true,
      waitlisted,
      remaining: seats.remaining,
    });
  } catch {
    return NextResponse.json(
      { error: "The house cannot take names just now. Write again this evening." },
      { status: 503 },
    );
  }
}
