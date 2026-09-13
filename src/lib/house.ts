import { MEMBERSHIP_PRICE_LABEL } from "./catalog";

export const APPLICATIONS_OPEN = "October 12, 2026";
export const FIRST_CORRESPONDENCE = "January 2027";
export const FIRST_MAILING = "January 5, 2027";

export const PRICE_LINE = `${MEMBERSHIP_PRICE_LABEL}/month · Shipping included · Limited membership`;

export const PRODUCT_SENTENCE =
  "A monthly correspondence filled with beautiful paper goods, thoughtful little luxuries, and something worth keeping.";

export const WHAT_ARRIVES = [
  {
    title: "The Letter",
    lede: "A personal note from The House. Always. The month begins here.",
  },
  {
    title: "The Paper",
    lede: "A recipe, an art print, a postcard, stationery — something worth keeping.",
  },
  {
    title: "The Little Luxury",
    lede: "A beautiful, useful object chosen for the month. Meant to be used, not displayed in a drawer.",
  },
  {
    title: "The Delight",
    lede: "Something unexpected. A little smile tucked between the pages.",
  },
  {
    title: "The Invitation",
    lede: "Something that asks you to write, make, cook, keep, or send onward.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Apply",
    lede: "Tell us a little about yourself and why you would like to receive the correspondence.",
  },
  {
    n: "02",
    title: "Be invited",
    lede: "We keep the table intentionally small. When a place becomes available, we will be in touch.",
  },
  {
    n: "03",
    title: "Receive",
    lede: `Your correspondence is prepared by hand and posted once each month, beginning ${FIRST_CORRESPONDENCE}.`,
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
    colors: "Red & gold",
    tone: "winter",
  },
  {
    name: "Spring",
    months: "March–May",
    colors: "Powder blue & silver",
    tone: "spring",
  },
  {
    name: "Summer",
    months: "June–August",
    colors: "White & gold",
    tone: "summer",
  },
  {
    name: "Autumn",
    months: "September–November",
    colors: "Pink & gold",
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
  return atCapacity ? "Leave a name" : "Request an Invitation";
}
