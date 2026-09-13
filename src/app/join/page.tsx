import type { Metadata } from "next";
import Link from "next/link";
import { JoinForm } from "@/components/join-form";
import { Ornament } from "@/components/ornament";
import { getMembershipSnapshot } from "@/lib/membership";
import { descriptions, titles } from "@/lib/seo";

export const metadata: Metadata = {
  title: titles.join,
  description: descriptions.join,
  alternates: { canonical: "/join" },
};

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const seats = await getMembershipSnapshot();

  return (
    <div className="reveal-page mx-auto grid max-w-5xl gap-12 px-5 pb-24 pt-16 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="script ink-write text-4xl">You were asked</p>
        <Ornament className="ink-draw mt-5 max-w-xs" />
        <h1 className="serif mt-6 text-5xl">Redeem your card.</h1>
        <p className="mt-5 text-lg leading-8 text-ink">
          Your invitation is for you. Enter it and a contiguous U.S. address. Unused
          invitations are taken back.
        </p>
        {seats.atCapacity ? (
          <p className="mt-4 text-sm text-seal">
            The table is full. A card cannot seat you until someone leaves. You may{" "}
            <Link href="/request" className="underline">
              leave a name
            </Link>{" "}
            for the wait.
          </p>
        ) : null}
      </div>
      <div className="invite-card invite-arrive p-6 sm:p-8">
        {seats.atCapacity ? (
          <p className="text-sm leading-6">
            We are not taking seats. If you have a card, keep it. When a place opens, the
            house will write.
          </p>
        ) : (
          <JoinForm initialCode={code || ""} />
        )}
      </div>
    </div>
  );
}
