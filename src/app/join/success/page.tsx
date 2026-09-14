import type { Metadata } from "next";
import Link from "next/link";
import { Ornament } from "@/components/ornament";

export const metadata: Metadata = { title: "You are in" };

export default function JoinSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-24 text-center">
      <p className="script text-2xl">Welcome to the season</p>
      <Ornament className="mx-auto mt-5 max-w-xs" />
      <h1 className="serif mt-6 text-5xl tracking-[-0.04em]">A place has been set.</h1>
      <p className="mt-5 text-lg leading-8 text-ink-soft">
        The first month is confirmed. The correspondence will post to your contiguous
        United States address. Watch your inbox — and the house for the post.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/account" className="btn btn-ink">
          Your name
        </Link>
        <Link href="/envelope" className="btn btn-ghost">
          The envelope
        </Link>
      </div>
    </div>
  );
}
