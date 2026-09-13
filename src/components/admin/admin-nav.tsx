"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-1.5" aria-label="The desk">
      {links.map((link) => {
        const current =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname?.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={
              current
                ? "btn btn-ink"
                : "btn btn-ghost"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
