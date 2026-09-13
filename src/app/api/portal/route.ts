import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getAppUrl, getStripe } from "@/lib/stripe";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", getAppUrl()), { status: 303 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { subscription: true },
  });

  if (!user?.subscription?.stripeCustomerId) {
    return NextResponse.redirect(new URL("/account", getAppUrl()), { status: 303 });
  }

  const portal = await getStripe().billingPortal.sessions.create({
    customer: user.subscription.stripeCustomerId,
    return_url: `${getAppUrl()}/account`,
  });

  return NextResponse.redirect(portal.url, { status: 303 });
}
