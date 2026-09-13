import { MEMBERSHIP_PRICE_LABEL } from "./catalog";
import {
  CAP_LINE,
  CONTINENTAL_LINE,
  HERO_HEADLINE,
  PRODUCT_SENTENCE,
} from "./house";

export const SITE = {
  name: "The Lifestyle Fresh",
  url: (process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com").replace(/\/$/, ""),
  email: "hello@thelifestylefresh.com",
  description: `${PRODUCT_SENTENCE} ${MEMBERSHIP_PRICE_LABEL}/month, postage included. ${CAP_LINE} ${CONTINENTAL_LINE}`,
} as const;

export const titles = {
  home: "The Lifestyle Fresh — A little luxury, delivered by post.",
  house: "The house behind the correspondence",
  envelope: "The envelope",
  membership: "Membership",
  journal: "The Journal",
  request: "Write to the house",
  join: "I have an invitation",
  shipping: "Where the correspondence ships",
  privacy: "Privacy",
  cookies: "Cookies",
  terms: "Terms of membership",
} as const;

export const descriptions = {
  home: SITE.description,
  house:
    "Established 2019. Two hundred and fifty names at a time. Hand assembled, individually addressed, and posted from the continental United States.",
  envelope:
    "A letter, always. Then something for the table, the dressing table, something to send onward, and something unexpected. Never the whole table.",
  membership: `Membership — ${MEMBERSHIP_PRICE_LABEL}/month. Twelve envelopes a year. Postage included. ${CAP_LINE}`,
  journal: "Lifestyle, beauty, the table, and the house — from The Lifestyle Fresh journal.",
  request: `Write to the house. ${CAP_LINE} ${CONTINENTAL_LINE}`,
  join: "Your invitation is for you. Enter it and a continental U.S. address.",
} as const;

export function jsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        description: SITE.description,
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
        description: SITE.description,
        url: `${SITE.url}/request`,
      },
    ],
  };
}

export { HERO_HEADLINE };
