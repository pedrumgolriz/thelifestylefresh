import { NextResponse } from "next/server";
import { adminOr401 } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { generateShareCodes } from "@/lib/invite-codes";
import { getAppUrl } from "@/lib/stripe";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const edition = await prisma.edition.findUnique({ where: { id } });
  if (!edition) {
    return NextResponse.redirect(new URL("/admin/editions", getAppUrl()), { status: 303 });
  }

  const form = await request.formData();
  const perMember = Number(form.get("codesPerMember") || 5);
  const safePerMember = Number.isFinite(perMember) && perMember > 0 ? Math.floor(perMember) : 5;

  const memberCount = await prisma.user.count({ where: { role: "MEMBER" } });
  const total = memberCount * safePerMember;
  if (total <= 0) {
    return NextResponse.redirect(new URL("/admin/editions", getAppUrl()), { status: 303 });
  }

  await generateShareCodes(total, edition.id);

  return NextResponse.redirect(new URL("/admin/editions", getAppUrl()), { status: 303 });
}
