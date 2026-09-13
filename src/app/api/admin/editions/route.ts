import { NextResponse } from "next/server";
import { adminOr401 } from "@/lib/admin-guard";
import { prisma } from "@/lib/db";
import { getAppUrl } from "@/lib/stripe";

export async function POST(request: Request) {
  const admin = await adminOr401();
  if (admin instanceof NextResponse) return admin;

  const form = await request.formData();
  const month = Number(form.get("month"));
  const year = Number(form.get("year"));
  const title = String(form.get("title") || "");
  const letter = String(form.get("letter") || "");
  const published = form.get("published") === "on";
  const items = String(form.get("items") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, sortOrder) => {
      const [category, name, description] = line.split("|").map((part) => part.trim());
      return { category: category || "Letter", name: name || category, description, sortOrder };
    });

  const edition = await prisma.edition.upsert({
    where: { month_year: { month, year } },
    update: { title, letter, published },
    create: { month, year, title, letter, published },
  });

  if (items.length) {
    await prisma.editionItem.deleteMany({ where: { editionId: edition.id } });
    await prisma.editionItem.createMany({
      data: items.map((item) => ({ ...item, editionId: edition.id })),
    });
  }

  return NextResponse.redirect(new URL("/admin/editions", getAppUrl()), { status: 303 });
}
