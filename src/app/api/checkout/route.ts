import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { enqueueWaitlist, getMembershipSnapshot } from "@/lib/membership";
import { getAppUrl, getStripe } from "@/lib/stripe";
import { isContinentalState } from "@/lib/us";

const schema = z.object({
  code: z.string().min(4),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  addressLine1: z.string().min(3),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the invitation, address, and a password of at least eight characters." },
      { status: 400 },
    );
  }

  const state = parsed.data.state.toUpperCase();
  if (!isContinentalState(state)) {
    return NextResponse.json(
      { error: "Membership currently ships within the contiguous United States, including D.C." },
      { status: 400 },
    );
  }

  const code = parsed.data.code.trim().toUpperCase();
  const invite = await prisma.invite.findUnique({ where: { code } });
  if (!invite || invite.usedCount >= invite.maxUses) {
    return NextResponse.json({ error: "That invitation is not valid." }, { status: 400 });
  }
  if (invite.expiresAt && invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "That invitation has expired." }, { status: 400 });
  }
  if (invite.email && invite.email.toLowerCase() !== parsed.data.email.toLowerCase()) {
    return NextResponse.json({ error: "This invitation belongs to another inbox." }, { status: 400 });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment yet." },
      { status: 503 },
    );
  }

  const seats = await getMembershipSnapshot();
  if (seats.atCapacity) {
    await enqueueWaitlist({
      name: parsed.data.name,
      email: parsed.data.email,
      city: parsed.data.city,
      state,
      note: `Tried to redeem ${code} while the table was full.`,
    });
    return NextResponse.json(
      {
        error: "The table is full. Your name is on the wait. A seat will be offered when one opens.",
        waitlisted: true,
      },
      { status: 409 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const passwordHash = await hashPassword(parsed.data.password);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name: parsed.data.name,
      passwordHash,
      addressLine1: parsed.data.addressLine1,
      addressLine2: parsed.data.addressLine2 || null,
      city: parsed.data.city,
      state,
      postalCode: parsed.data.postalCode,
      country: "US",
    },
    create: {
      email,
      name: parsed.data.name,
      passwordHash,
      role: "MEMBER",
      addressLine1: parsed.data.addressLine1,
      addressLine2: parsed.data.addressLine2 || null,
      city: parsed.data.city,
      state,
      postalCode: parsed.data.postalCode,
      country: "US",
    },
  });

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${getAppUrl()}/join/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getAppUrl()}/join?code=${encodeURIComponent(code)}`,
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US"] },
    custom_text: {
      shipping_address: {
        message:
          "We currently ship within the contiguous United States (the lower 48 and Washington, D.C.). Alaska, Hawaii, territories, and international addresses cannot be fulfilled.",
      },
    },
    metadata: {
      userId: user.id,
      inviteCode: code,
      state,
      fulfillmentCountry: "US",
    },
    subscription_data: {
      metadata: { userId: user.id, inviteCode: code },
    },
  });

  return NextResponse.json({ url: session.url });
}
