import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "The desk",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-8">
      <header className="mb-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow-brass">The desk</p>
            <p className="serif mt-2 text-3xl tracking-[-0.02em]">Signed in as {admin.email}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button className="btn btn-ghost">Sign out</button>
          </form>
        </div>
        <div className="mt-6 border-y border-[var(--rule)] py-3">
          <AdminNav />
        </div>
      </header>
      {children}
    </div>
  );
}
