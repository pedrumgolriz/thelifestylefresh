import Link from "next/link";
import { CONTINENTAL_LINE } from "@/lib/house";
import { SHIPPING_SHORT } from "@/lib/us";
import { Mark } from "./mark";
import { NewsletterForm } from "./newsletter-form";

const columns = [
  {
    title: "The House",
    links: [
      { href: "/envelope", label: "The Envelope" },
      { href: "/house", label: "The House" },
      { href: "/journal", label: "The Journal" },
      { href: "/membership", label: "Membership" },
    ],
  },
  {
    title: "Correspondence",
    links: [
      { href: "/request", label: "Write to the house" },
      { href: "/join", label: "I have an invitation" },
      { href: "/account", label: "Your name" },
      { href: "/login", label: "Member sign-in" },
    ],
  },
  {
    title: "Notes",
    links: [
      { href: "/faq", label: "Questions" },
      { href: "/shipping", label: "Shipping" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-14 w-14" decorative={false} />
              <div>
                <p className="serif text-2xl tracking-[-0.02em]">The Lifestyle Fresh</p>
                <p className="eyebrow mt-1">Established 2019</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-ink-soft">
              Correspondence from the house, once each month. {CONTINENTAL_LINE}
            </p>
            <p className="mt-5 text-sm">
              <a className="link-quiet" href="mailto:hello@thelifestylefresh.com">
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
      </div>
      <div className="border-t border-[var(--rule)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="script text-3xl sm:text-4xl">A note, digitally</p>
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
          <p>{SHIPPING_SHORT}</p>
        </div>
      </div>
    </footer>
  );
}
