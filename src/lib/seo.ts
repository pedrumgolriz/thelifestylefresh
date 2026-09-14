import { MEMBERSHIP_PRICE_LABEL } from "./catalog";
import {
  CONTINENTAL_LINE,
  HERO_HEADLINE,
  HOUSE_CAP,
  PRODUCT_SENTENCE,
  capLine,
} from "./house";

export function siteDescription(cap: number = HOUSE_CAP) {
  return `${PRODUCT_SENTENCE} ${MEMBERSHIP_PRICE_LABEL}/month, postage included. ${capLine(cap)} ${CONTINENTAL_LINE}`;
}

export const SITE = {
  name: "The Lifestyle Fresh",
  url: (process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com").replace(/\/$/, ""),
  email: "hello@thelifestylefresh.com",
  description: siteDescription(),
} as const;

export const titles = {
  home: "The Lifestyle Fresh — A little luxury, delivered by post.",
  house: "The house behind the correspondence",
  envelope: "The envelope",
  membership: "Membership",
  journal: "The Journal",
  request: "Write to the house",
  join: "I have an invitation",
  refer: "Pass an invitation",
  shipping: "Where the correspondence ships",
  privacy: "Privacy",
  cookies: "Cookies",
  terms: "Terms of membership",
} as const;

// Cap-dependent descriptions. Pass the live `seats.cap` from a page's
// generateMetadata(); defaults to HOUSE_CAP for any static caller.
export function descriptionsFor(cap: number = HOUSE_CAP) {
  const line = capLine(cap);
  return {
    home: `${PRODUCT_SENTENCE} ${MEMBERSHIP_PRICE_LABEL}/month, postage included. ${line} ${CONTINENTAL_LINE}`,
    house: `Established 2019. ${cap} names at a time. Hand assembled, individually addressed, and posted from the United States.`,
    envelope:
      "A letter, always. Then something for the table, the dressing table, something to send onward, and something unexpected. Never the whole table.",
    membership: `Membership — ${MEMBERSHIP_PRICE_LABEL}/month. Twelve envelopes a year. Postage included. ${line}`,
    journal: "Lifestyle, beauty, the table, and the house — from The Lifestyle Fresh journal.",
    request: `Write to the house. ${line} ${CONTINENTAL_LINE}`,
    join: "Your invitation is for you. Enter it and a continental U.S. address.",
    refer: "Each envelope carries a few one-time invitations a member may pass to a friend.",
  } as const;
}

// Backward-compatible default descriptions (HOUSE_CAP). Prefer
// descriptionsFor(seats.cap) from generateMetadata where the cap is known.
export const descriptions = descriptionsFor();

export function jsonLdGraph(cap: number = HOUSE_CAP) {
  const description = siteDescription(cap);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        description,
        logo: `${SITE.url}/crest-ivory.jpg`,
        foundingDate: "2019",
      },
      {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
        publisher: { "@type": "Organization", name: SITE.name },
      },
      {
        "@type": "Offer",
        name: "Monthly correspondence",
        price: "34.99",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        eligibleRegion: { "@type": "Country", name: "US" },
        description,
        url: `${SITE.url}/request`,
      },
    ],
  };
}

export { HERO_HEADLINE };
