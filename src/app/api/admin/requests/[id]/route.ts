import { NextResponse } from "next/server";
import { adminOr401 } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { getMembershipSnapshot } from "@/lib/membership";
import { getAppUrl } from "@/lib/stripe";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const inviteRequest = await prisma.inviteRequest.findUnique({ where: { id } });
  if (!inviteRequest) {
    return NextResponse.redirect(new URL("/admin/requests", getAppUrl()), { status: 303 });
  }

  const seats = await getMembershipSnapshot();
  const back =
    inviteRequest.status === "waitlisted" ? "/admin/waitlist" : "/admin/requests";
  if (seats.atCapacity) {
    return NextResponse.redirect(new URL(back, getAppUrl()), { status: 303 });
  }

  const code = `FRESH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  await prisma.invite.create({
    data: {
      code,
      email: inviteRequest.email,
      note: `Issued for ${inviteRequest.name}`,
      maxUses: 1,
    },
  });
  await prisma.inviteRequest.update({
    where: { id },
    data: { status: "invited" },
  });

  return NextResponse.redirect(new URL(back, getAppUrl()), { status: 303 });
}
