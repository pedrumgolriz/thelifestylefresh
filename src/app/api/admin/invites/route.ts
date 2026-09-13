import { NextResponse } from "next/server";
import { adminOr401 } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { getAppUrl } from "@/lib/stripe";

function makeCode() {
  const fragment = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `FRESH-${fragment}`;
}

export async function POST(request: Request) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const form = await request.formData();
  const code = String(form.get("code") || "").trim().toUpperCase() || makeCode();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const note = String(form.get("note") || "").trim();
  const maxUses = Number(form.get("maxUses") || 1);

  await prisma.invite.create({
    data: {
      code,
      email: email || null,
      note: note || null,
      maxUses: Number.isFinite(maxUses) && maxUses > 0 ? maxUses : 1,
    },
  });

  return NextResponse.redirect(new URL("/admin/invites", getAppUrl()), { status: 303 });
}
