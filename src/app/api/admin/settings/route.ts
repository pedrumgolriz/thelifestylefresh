import { NextResponse } from "next/server";
import { adminOr401 } from "@/lib/admin-guard";
import { getMembershipSnapshot, promoteWaitlist, setMemberCap } from "@/lib/membership";
import { getAppUrl } from "@/lib/stripe";

export async function POST(request: Request) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const form = await request.formData();
  const cap = Number(form.get("memberCap"));
  if (!Number.isFinite(cap) || cap < 1) {
    return NextResponse.redirect(new URL("/admin/settings", getAppUrl()), { status: 303 });
  }

  await setMemberCap(cap);
  const seats = await getMembershipSnapshot();
  if (seats.remaining > 0) {
    await promoteWaitlist(seats.remaining);
  }
  return NextResponse.redirect(new URL("/admin/settings", getAppUrl()), { status: 303 });
}
