export type CatalogEntry = {
  slug: string;
  name: string;
  category: string;
  description: string;
  monthly: boolean;
  featured: boolean;
};

export const MONTHLY_PILLARS = [
  {
    key: "Beauty",
    title: "For the glass",
    lede: "One finished ritual — a porcelain dish, a ribbon, something you will not leave in a drawer.",
  },
  {
    key: "Recipe",
    title: "For the table",
    lede: "A card written as if Sunday lunch were already laid on the lawn.",
  },
  {
    key: "Encouragement",
    title: "For the purse",
    lede: "A line to keep in a book, a wallet, the drawer you open when you need it.",
  },
  {
    key: "Letter",
    title: "The letter",
    lede: "The month, folded and sealed. Everything else is invited because this is.",
  },
  {
    key: "Stickers",
    title: "Seals & names",
    lede: "Wax, tape, a state, a word — meant for the next letter you send.",
  },
  {
    key: "Fun",
    title: "A private smile",
    lede: "The first thing you see: a bookmark, a scratch of silver, a joke kept between us.",
  },
  {
    key: "Art",
    title: "Paper with an opinion",
    lede: "A print, a fold, the ghost of a stamp. Something to pin above the kettle.",
  },
  {
    key: "Postcards",
    title: "To send onward",
    lede: "Blank on the reverse. The house likes to leave your desk.",
  },
  {
    key: "Crochet",
    title: "Two hearts",
    lede: "Blue and pink, worked by hand, small enough for a pocket.",
  },
  {
    key: "Inspiration",
    title: "To pin",
    lede: "A card, a verse, a question — for the fridge, the journal, the morning.",
  },
] as const;

export const CATALOG: CatalogEntry[] = [
  { slug: "beauty-ritual", name: "A ritual for the glass", category: "Beauty", monthly: true, featured: true, description: "One finished habit — not a leftover from someone else’s box." },
  { slug: "recipe-card", name: "The month’s recipe", category: "Recipe", monthly: true, featured: true, description: "Printed to keep, to stain, to cook from on a Sunday." },
  { slug: "encouragement-note", name: "A note of nerve", category: "Encouragement", monthly: true, featured: true, description: "Written for the month you are actually in." },
  { slug: "monthly-letter", name: "The letter", category: "Letter", monthly: true, featured: true, description: "Folded at the desk. Always. The spine of the envelope." },
  { slug: "sticker-suite", name: "Seals and names", category: "Stickers", monthly: true, featured: false, description: "Wax, tape, a state, a word — for the next letter you send." },
  { slug: "fun-object", name: "A first smile", category: "Fun", monthly: true, featured: true, description: "Whatever makes you pause before you read." },
  { slug: "mixed-art", name: "A piece for the wall", category: "Art", monthly: true, featured: true, description: "Print, collage, or stamp — something to pin or frame." },
  { slug: "postcards", name: "Cards to send", category: "Postcards", monthly: true, featured: true, description: "Blank on the reverse. The house likes to travel." },
  { slug: "crochet-hearts", name: "Two hearts", category: "Crochet", monthly: true, featured: true, description: "Blue and pink. Worked by hand. Slightly imperfect on purpose." },
  { slug: "inspiration-cards", name: "A card to pin", category: "Inspiration", monthly: true, featured: false, description: "A line, a verse, a question for the kettle." },
  { slug: "mini-art-prints", name: "A small print", category: "Art", monthly: false, featured: true, description: "Desk-sized, and still a picture." },
  { slug: "origami", name: "A fold", category: "Art", monthly: false, featured: false, description: "Paper with a little architecture." },
  { slug: "puzzle-pieces", name: "A piece of a larger game", category: "Fun", monthly: false, featured: false, description: "Collected, quietly, across the year." },
  { slug: "quotes", name: "A line for the season", category: "Inspiration", monthly: false, featured: false, description: "Chosen, not scraped from a poster." },
  { slug: "confetti", name: "Paper weather", category: "Fun", monthly: false, featured: false, description: "A pinch when the flap lifts." },
  { slug: "ribbon-twine", name: "Ribbon, or twine", category: "Art", monthly: false, featured: false, description: "To retie a gift, a letter, a bunch of herbs." },
  { slug: "coloring-mandalas", name: "Quiet work", category: "Fun", monthly: false, featured: false, description: "A page for a Sunday table." },
  { slug: "gift-tags", name: "Tags, already cut", category: "Stickers", monthly: false, featured: false, description: "Ready for a name in your hand." },
  { slug: "seeds", name: "Seeds", category: "Inspiration", monthly: false, featured: true, description: "A future windowsill. The continent, considered." },
  { slug: "doilies", name: "A doily", category: "Art", monthly: false, featured: false, description: "Old-fashioned, and we mean it." },
  { slug: "die-cuts", name: "Cut paper", category: "Art", monthly: false, featured: false, description: "Shapes with a handmade edge." },
  { slug: "paper-clips", name: "A clip that refused to be plain", category: "Fun", monthly: false, featured: false, description: "For letters that deserve hardware." },
  { slug: "magazine-clippings", name: "A clipping", category: "Art", monthly: false, featured: false, description: "Already edited for your collage." },
  { slug: "stamped-images", name: "The ghost of a stamp", category: "Art", monthly: false, featured: false, description: "Ink, pressure, a little afterimage." },
  { slug: "tiny-envelopes", name: "A letter inside the letter", category: "Letter", monthly: false, featured: true, description: "A smaller flap, a hidden sentence." },
  { slug: "magnets", name: "A magnet", category: "Fun", monthly: false, featured: false, description: "For the fridge, the file, the studio wall." },
  { slug: "luggage-tags", name: "A tag for a journey", category: "Fun", monthly: false, featured: false, description: "Even if the trip is only to the next room." },
  { slug: "journaling-cards", name: "A page, begun", category: "Inspiration", monthly: false, featured: false, description: "The first line, already beautiful." },
  { slug: "library-pockets", name: "A library pocket", category: "Art", monthly: false, featured: false, description: "For the month’s smallest papers." },
  { slug: "felt-fabric", name: "A swatch", category: "Art", monthly: false, featured: false, description: "A little softness among the paper." },
  { slug: "postage-stamps", name: "Postage", category: "Postcards", monthly: false, featured: true, description: "New, used, or old — to send, or to keep." },
  { slug: "mini-playing-cards", name: "A card from a tiny deck", category: "Fun", monthly: false, featured: false, description: "One face, or a joke in miniature." },
  { slug: "address-labels", name: "Your name, already set", category: "Stickers", monthly: false, featured: false, description: "Pretty enough that you will use them." },
  { slug: "embossed-paper", name: "Paper you can feel", category: "Letter", monthly: false, featured: true, description: "Embossed. Read it with your eyes closed." },
  { slug: "friendship-bracelets", name: "A bracelet, tied by hand", category: "Encouragement", monthly: false, featured: false, description: "Meant to be given away." },
  { slug: "mini-puzzles", name: "Five quiet minutes", category: "Fun", monthly: false, featured: false, description: "A train, a porch, a lunch hour." },
  { slug: "journal-prompts", name: "A question, not a lecture", category: "Inspiration", monthly: false, featured: false, description: "For the page you have been avoiding." },
  { slug: "comic-strips", name: "A clipped laugh", category: "Fun", monthly: false, featured: false, description: "The old-fashioned way." },
  { slug: "polaroids", name: "A printed memory", category: "Art", monthly: false, featured: true, description: "Or a scene invented for the month." },
  { slug: "scratch-offs", name: "Silver, then a sentence", category: "Fun", monthly: false, featured: true, description: "No prize but the words underneath." },
  { slug: "mini-photo-album", name: "A few pages of pictures", category: "Art", monthly: false, featured: false, description: "Small enough to keep in a drawer." },
  { slug: "mini-journal", name: "A book already begun", category: "Letter", monthly: false, featured: true, description: "A hand on the first page, waiting." },
  { slug: "coasters", name: "A stamped coaster", category: "Art", monthly: false, featured: false, description: "Useful. A little bar, a little studio." },
  { slug: "scripture-cards", name: "The older language", category: "Inspiration", monthly: false, featured: false, description: "For those who still want it." },
  { slug: "dymo-stickers", name: "A word in punched tape", category: "Stickers", monthly: false, featured: false, description: "A name, a state, a single verb." },
  { slug: "patterned-bandaids", name: "A patterned kindness", category: "Fun", monthly: false, featured: false, description: "For a scrape no one else will see." },
  { slug: "maps", name: "A fragment of a place", category: "Art", monthly: false, featured: true, description: "Folded, marked, or invented." },
  { slug: "bookmark", name: "A place held", category: "Fun", monthly: false, featured: false, description: "Ribbon, paper, or something that waits in a book." },
];

export const MEMBERSHIP_PRICE = 19.99;
export const MEMBERSHIP_PRICE_LABEL = "$19.99";
export const MEMBERSHIP_CADENCE = "a month";
