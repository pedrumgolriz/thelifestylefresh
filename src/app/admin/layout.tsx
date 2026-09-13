import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "The desk",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/invites", label: "Invites" },
  { href: "/admin/subscribers", label: "Members" },
  { href: "/admin/posts", label: "Journal" },
  { href: "/admin/editions", label: "Editions" },
  { href: "/admin/waitlist", label: "Wait" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/settings", label: "The table" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-8">
      <nav className="glass mb-8 flex flex-wrap gap-2 p-2" aria-label="The desk">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="btn btn-ghost">
            {link.label}
          </Link>
        ))}
        <form action="/api/auth/logout" method="post" className="ml-auto">
          <button className="btn btn-ghost">Sign out</button>
        </form>
      </nav>
      {children}
    </div>
  );
}
