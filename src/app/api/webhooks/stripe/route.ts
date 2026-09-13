import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import { promoteWaitlist } from "@/lib/membership";
import { getStripe } from "@/lib/stripe";
import { isContinentalState } from "@/lib/us";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret missing." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillCheckout(session);
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status,
        currentPeriodEnd: periodEnd(subscription),
      },
    });
    if (subscription.status === "canceled" || event.type === "customer.subscription.deleted") {
      await promoteWaitlist(1);
    }
  }

  return NextResponse.json({ received: true });
}

function periodEnd(subscription: Stripe.Subscription) {
  const end = (
    subscription as Stripe.Subscription & { current_period_end?: number }
  ).current_period_end;
  return end ? new Date(end * 1000) : null;
}

async function fulfillCheckout(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId || session.client_reference_id;
  const inviteCode = session.metadata?.inviteCode;
  if (!userId) return;

  const shippingState =
    session.customer_details?.address?.state ||
    (session as { shipping_details?: { address?: { state?: string | null } } }).shipping_details
      ?.address?.state ||
    session.metadata?.state ||
    "";
  const normalized = shippingState.toUpperCase();
  const eligible = !normalized || isContinentalState(normalized);

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      stripeCustomerId: String(session.customer || ""),
      stripeSubscriptionId: String(session.subscription || ""),
      stripePriceId: process.env.STRIPE_PRICE_ID,
      status: eligible ? "active" : "hold",
    },
    create: {
      userId,
      stripeCustomerId: String(session.customer || ""),
      stripeSubscriptionId: String(session.subscription || ""),
      stripePriceId: process.env.STRIPE_PRICE_ID,
      status: eligible ? "active" : "hold",
    },
  });

  if (inviteCode) {
    const invite = await prisma.invite.findUnique({ where: { code: inviteCode } });
    if (invite && invite.usedCount < invite.maxUses) {
      await prisma.invite.update({
        where: { id: invite.id },
        data: {
          usedCount: { increment: 1 },
          redeemedById: invite.redeemedById ?? userId,
        },
      });
    }
  }
}
