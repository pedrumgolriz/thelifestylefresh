import { NextResponse } from "next/server";
import { requireAdmin } from "./auth";

export async function adminOr401() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return admin;
}
