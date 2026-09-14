import { MEMBERSHIP_PRICE_LABEL } from "./catalog";

export const APPLICATIONS_OPEN = "October 12, 2026";
export const FIRST_CORRESPONDENCE = "January 2027";
export const FIRST_MAILING = "January 5, 2027";

export const PRODUCT_SENTENCE =
  "A letter, a small pleasure, and something worth keeping — sent once a month to a very small circle of names.";

export const HERO_HEADLINE = "Correspondence, sealed.";
export const HERO_LABEL = "The Lifestyle Fresh";

export const HOUSE_CAP = 250;

// Cap-dependent copy. Use the functions with the live `seats.cap` on pages that
// fetch the snapshot; the string constants below fall back to HOUSE_CAP for
// static contexts (SEO metadata, JSON-LD) where the cap isn't known yet.
export function capLine(cap: number = HOUSE_CAP) {
  return `${cap} names. One envelope each month.`;
}
export function capLineLong(cap: number = HOUSE_CAP) {
  return `The house keeps ${cap} names at a time.`;
}
export function priceLine(cap: number = HOUSE_CAP) {
  return `${MEMBERSHIP_PRICE_LABEL}/month · Postage included · ${cap} names at a time`;
}

export const PRICE_LINE = priceLine();
export const CAP_LINE = capLine();
export const CAP_LINE_LONG = capLineLong();

export const CONTINENTAL_LINE = "Posted from the continental United States.";

// The shareable invitation — codes members pass to friends inside each envelope.
export const SHARE_CODES_PER_ENVELOPE = 5;
export const SHARE_CODE_PREFIX = "LF-SHARE";
export const SHARE_LINE = `Each envelope carries ${SHARE_CODES_PER_ENVELOPE} one-time invitations a member may pass to a friend.`;

// The character of the envelope — categories, not an inventory.
export const ENVELOPE_CATEGORIES = [
  {
    title: "A letter, always.",
    lede: "The month begins here. Everything else is invited because this is.",
  },
  {
    title: "Something for the table.",
    lede: "A recipe, a card, a small provision for the kitchen.",
  },
  {
    title: "Something for the dressing table.",
    lede: "A quiet beauty piece. Meant to be used, not displayed.",
  },
  {
    title: "Something to send onward.",
    lede: "Blank on the reverse. The house likes to leave your desk.",
  },
  {
    title: "Something unexpected.",
    lede: "A small smile tucked between the pages. Never announced.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Write to the house",
    lede: "Leave your name and a line about why the post still matters to you.",
  },
  {
    n: "02",
    title: "Receive an invitation",
    lede: "When a place opens, the house writes. There is nothing to refresh.",
  },
  {
    n: "03",
    title: "The envelope arrives",
    lede: `Posted once each month, beginning ${FIRST_CORRESPONDENCE}. Addressed to you by hand.`,
  },
  {
    n: "04",
    title: "Keep the tradition",
    lede: "Read it. Use it. Send something onward. Cancel any month you wish.",
  },
] as const;

export const SEASONS = [
  {
    name: "Winter",
    months: "December–February",
    colors: "Oxblood & brass",
    tone: "winter",
  },
  {
    name: "Spring",
    months: "March–May",
    colors: "Lilac & ivory",
    tone: "spring",
  },
  {
    name: "Summer",
    months: "June–August",
    colors: "Ivory & brass",
    tone: "summer",
  },
  {
    name: "Autumn",
    months: "September–November",
    colors: "Amber & ink",
    tone: "autumn",
  },
] as const;

export const INTERESTS = [
  "Beauty",
  "Cooking",
  "Stationery",
  "Home",
  "Fashion",
  "Wellness",
  "Travel",
  "Gardening",
  "Reading",
  "Entertaining",
] as const;

export const JOURNAL_SHELVES = [
  { key: "Lifestyle", label: "Lifestyle", lede: "The beautiful ordinary life." },
  { key: "Beauty", label: "Beauty", lede: "Rituals, products, dressing tables." },
  { key: "Recipes", label: "Table", lede: "Recipes, entertaining, seasonal food." },
  { key: "Wellness", label: "Wellness", lede: "Quiet habits, without the noise." },
  { key: "Journal", label: "House", lede: "Behind the correspondence." },
] as const;

export function shelfLabel(category: string) {
  return JOURNAL_SHELVES.find((shelf) => shelf.key === category)?.label ?? category;
}

export function invitationCta(atCapacity: boolean) {
  return atCapacity ? "Leave a name" : "Request an invitation";
}
