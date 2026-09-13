import Link from "next/link";
import { getSession } from "@/lib/auth";
import { invitationCta } from "@/lib/house";
import { getMembershipSnapshot } from "@/lib/membership";
import { Mark } from "./mark";
import { NavLinks } from "./nav-links";

export async function SiteHeader() {
  const session = await getSession();
  const seats = await getMembershipSnapshot();

  const links = [
    { href: "/envelope", label: "The Envelope" },
    { href: "/house", label: "The House" },
    { href: "/journal", label: "The Journal" },
    { href: "/membership", label: "Membership" },
    ...(session?.role === "ADMIN"
      ? [{ href: "/admin", label: "The desk" }]
      : session
        ? [{ href: "/account", label: "Your name" }]
        : []),
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="masthead glass-settle">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label="The Lifestyle Fresh, home">
            <Mark className="mark-seal h-11 w-11" />
            <span className="leading-none" aria-hidden="true">
              <span className="script block text-[1.25rem] leading-none">The</span>
              <span className="serif block text-[1.15rem] tracking-[-0.01em]">Lifestyle Fresh</span>
            </span>
          </Link>
          <Link href="/request" className="btn btn-ink">
            {invitationCta(seats.atCapacity)}
          </Link>
        </div>
        <NavLinks
          links={links}
          label="House"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 px-5 pb-2"
        />
      </div>
    </header>
  );
}
