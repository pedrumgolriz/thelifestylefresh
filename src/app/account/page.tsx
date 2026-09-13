import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "ADMIN") redirect("/admin");

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: { subscription: true },
  });

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16">
      <p className="eyebrow">Membership</p>
      <h1 className="serif mt-4 text-5xl tracking-[-0.04em]">Your place at the table.</h1>
      <div className="glass mt-8 p-6">
        <p className="serif text-2xl">{user?.name || user?.email}</p>
        <p className="mt-1 text-sm text-ink-soft">{user?.email}</p>
        <p className="mt-4 text-sm text-ink-soft">
          {[user?.addressLine1, user?.city, user?.state, user?.postalCode].filter(Boolean).join(", ")}
        </p>
        <p className="mt-6 eyebrow">Status</p>
        <p className="mt-2 serif text-3xl capitalize tracking-[-0.03em]">
          {user?.subscription?.status || "none"}
        </p>
        <form action="/api/portal" method="post" className="mt-6">
          <button className="btn btn-ink">Manage billing in Stripe</button>
        </form>
        <form action="/api/auth/logout" method="post" className="mt-3">
          <button className="btn btn-ghost">Sign out</button>
        </form>
      </div>
      <p className="mt-6 text-sm text-ink-soft">
        Shipping is continental US only. Update the address in Stripe if you move within
        the lower forty-eight or D.C.{" "}
        <Link href="/shipping" className="underline">
          Shipping note
        </Link>
        .
      </p>
    </div>
  );
}
