import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getMembershipSnapshot } from "@/lib/membership";
import { Mark } from "./mark";
import { NavLinks } from "./nav-links";

export async function SiteHeader() {
  const session = await getSession();
  const seats = await getMembershipSnapshot();

  const links = [
    { href: "/the-box", label: "The Envelope" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "The House" },
    session?.role === "ADMIN"
      ? { href: "/admin", label: "The desk" }
      : session
        ? { href: "/account", label: "Membership" }
        : { href: "/login", label: "Members" },
  ];

  return (
    <header className="sticky top-0 z-40">
      <div className="masthead glass-settle">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label="The Lifestyle Fresh, home">
            <Mark className="mark-seal h-12 w-12" />
            <span className="leading-none" aria-hidden="true">
              <span className="script block text-[1.05rem] leading-none">The</span>
              <span className="serif block text-[1.2rem] leading-none">Lifestyle Fresh</span>
            </span>
          </Link>
          <Link href="/request" className="btn btn-ink">
            {seats.atCapacity ? "Leave a name" : "Ask to be considered"}
          </Link>
        </div>
        <NavLinks
          links={links}
          label="House"
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 px-5 pb-2 text-[0.95rem]"
        />
      </div>
    </header>
  );
}
