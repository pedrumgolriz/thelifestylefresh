import { MEMBERSHIP_PRICE_LABEL } from "./catalog";
import { APPLICATIONS_OPEN, FIRST_CORRESPONDENCE, PRODUCT_SENTENCE } from "./house";

export const SITE = {
  name: "The Lifestyle Fresh",
  url: (process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com").replace(/\/$/, ""),
  email: "hello@thelifestylefresh.com",
  description: `${PRODUCT_SENTENCE} ${MEMBERSHIP_PRICE_LABEL}/month, shipping included. Applications open ${APPLICATIONS_OPEN}. First correspondence ${FIRST_CORRESPONDENCE}.`,
} as const;

export const titles = {
  home: "The Lifestyle Fresh — A little luxury, delivered by post",
  about: "The house behind the monthly correspondence",
  envelope: "What’s inside the monthly correspondence",
  journal: "The Journal",
  request: "Request an invitation",
  join: "Redeem your invitation",
  shipping: "Where the correspondence ships",
  privacy: "Privacy",
  cookies: "Cookies",
  terms: "Terms of membership",
} as const;

export const descriptions = {
  home: SITE.description,
  about:
    "Established in 2019 as an editorial project; now a physical monthly correspondence. Made by hand. Sent by post.",
  envelope:
    "A letter, always. Then paper, a little luxury, a delight, and something that asks you to send onward.",
  journal: "Lifestyle, beauty, the table, and the house — from The Lifestyle Fresh journal.",
  request: `Applications open ${APPLICATIONS_OPEN}. Tell us why the post still matters.`,
  join: "Your invitation is for you. Enter it and a contiguous U.S. address.",
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
