import { NextResponse } from "next/server";
import { adminOr401 } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";

function csv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const edition = await prisma.edition.findUnique({ where: { id } });
  if (!edition) {
    return new NextResponse("Not found", { status: 404 });
  }

  const invites = await prisma.invite.findMany({
    where: { issuedByEditionId: id },
    orderBy: { createdAt: "asc" },
    include: { redeemedBy: { select: { email: true } } },
  });

  const header = ["code", "createdAt", "maxUses", "usedCount", "redeemedByEmail"];
  const rows = invites.map((i) =>
    [
      i.code,
      i.createdAt.toISOString(),
      String(i.maxUses),
      String(i.usedCount),
      i.redeemedBy?.email ?? "",
    ]
      .map(csv)
      .join(","),
  );

  const body = [header.join(","), ...rows].join("\n");
  const filename = `lf-share-codes-${edition.year}-${String(edition.month).padStart(2, "0")}.csv`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
