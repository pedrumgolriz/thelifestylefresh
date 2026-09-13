import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { getAppUrl } from "@/lib/stripe";

export async function POST() {
  await destroySession();
  return NextResponse.redirect(new URL("/", getAppUrl()), { status: 303 });
}
