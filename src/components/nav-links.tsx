"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({
  links,
  label,
  className,
}: {
  links: { href: string; label: string }[];
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className={className}>
      {links.map((link) => {
        const current = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="nav-ink"
            aria-current={current ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
