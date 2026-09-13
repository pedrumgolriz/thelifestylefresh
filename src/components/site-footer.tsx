import Link from "next/link";
import { Mark } from "./mark";
import { NewsletterForm } from "./newsletter-form";
import { Ornament } from "./ornament";

const columns = [
  {
    title: "House",
    links: [
      { href: "/the-box", label: "The Envelope" },
      { href: "/journal", label: "Journal" },
      { href: "/about", label: "The House" },
      { href: "/request", label: "Request an invitation" },
    ],
  },
  {
    title: "Journal",
    links: [
      { href: "/journal?category=Lifestyle", label: "Lifestyle" },
      { href: "/journal?category=Wellness", label: "Wellness" },
      { href: "/journal?category=Recipes", label: "Recipes" },
      { href: "/journal?category=Beauty", label: "Beauty" },
    ],
  },
  {
    title: "Notes",
    links: [
      { href: "/shipping", label: "The post" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-6xl px-5 pt-12">
        <Ornament />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Mark className="h-14 w-14" decorative={false} />
            <div>
              <p className="serif text-2xl tracking-[-0.03em]">The Lifestyle Fresh</p>
              <p className="eyebrow mt-1">Established 2019</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-soft">
            A sealed envelope, once a month. The list is nearly closed. The continent only.
          </p>
          <p className="mt-6 text-sm">
            <a className="underline" href="mailto:hello@thelifestylefresh.com">
              hello@thelifestylefresh.com
            </a>
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="eyebrow">{column.title}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="nav-ink text-ink-soft hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="script text-3xl">A note, digitally</p>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              Occasional letters from the house. Never daily.
            </p>
          </div>
          <NewsletterForm source="footer" />
        </div>
      </div>
      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-ink-soft sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} The Lifestyle Fresh. All rights reserved.</p>
          <p>Posted from the continental United States.</p>
        </div>
      </div>
    </footer>
  );
}
