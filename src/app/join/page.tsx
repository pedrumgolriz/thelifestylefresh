import type { Metadata } from "next";
import Link from "next/link";
import { JoinForm } from "@/components/join-form";
import { CAP_LINE } from "@/lib/house";
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
    <div className="reveal-page mx-auto grid max-w-5xl gap-16 px-5 pb-24 pt-20 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="script text-4xl sm:text-5xl">I have a card</p>
        <h1 className="serif mt-5 text-5xl sm:text-6xl">Redeem your card.</h1>
        <p className="mt-7 max-w-md text-lg leading-8 text-ink">
          Your invitation is for you. Enter it and a continental U.S. address. Unused cards
          are taken back.
        </p>
        <p className="mt-6 max-w-md text-sm leading-6 text-ink-soft">{CAP_LINE}</p>
        {seats.atCapacity ? (
          <p className="mt-6 max-w-md text-sm text-lilac-deep">
            The table is full. A card cannot seat you until someone leaves. You may{" "}
            <Link href="/request" className="underline">
              leave a name
            </Link>{" "}
            for the wait.
          </p>
        ) : null}
      </div>
      <div className="invite-card invite-arrive p-8 sm:p-10">
        {seats.atCapacity ? (
          <p className="text-sm leading-7 text-ink">
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
