export const SITE = {
  name: "The Lifestyle Fresh",
  url: (process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com").replace(/\/$/, ""),
  email: "hello@thelifestylefresh.com",
  description:
    "A letter and a little for the table, posted once a month. By card only. The continent. We are not taking many more.",
} as const;

export const titles = {
  home: "The Lifestyle Fresh — The list is nearly closed",
  about: "The house behind the monthly correspondence",
  envelope: "What’s enclosed in the monthly envelope",
  journal: "Letters from the journal",
  request: "Ask to be considered for the correspondence",
  join: "Redeem your card",
  shipping: "Where the monthly envelope posts",
  privacy: "Privacy for the private list",
  cookies: "Cookies used by the house",
  terms: "Terms of membership and invitation",
} as const;

export const descriptions = {
  home: SITE.description,
  about:
    "The Lifestyle Fresh posts a letter each month to names it already keeps. By card only. Continental United States.",
  envelope:
    "What the month is permitted: a letter, a place setting, then an edited handful. Never the whole house.",
  journal: "Published letters on paper and the month — from The Lifestyle Fresh journal.",
  request:
    "Write once. Name, city, why you still wait for the post. We decline more than we ask. The continent only.",
  join: "Your card is for you. Enter it and a continental address.",
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
        availability: "https://schema.org/LimitedAvailability",
        eligibleRegion: { "@type": "Country", name: "US" },
        description: "A sealed envelope each month. By card. Continental United States.",
        url: `${SITE.url}/request`,
      },
    ],
  };
}
