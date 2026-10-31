// Bach gift bag ideas for /tanyasbach-private ("Bach Gift Bags" section).
//
// HOW TO ADD AN ITEM: append to GIFTS. Categories show in the order they first appear here.
//   id        short, lowercase, hyphenated, unique. Tanya's reaction is saved under it, so never rename or reuse one.
//   category  e.g. "Hangover kit". Same spelling = same group.
//   name      product name as the shop lists it (shortened if long)
//   price     as listed, with currency, e.g. "$12.99" or "$24 for 12"; per-bag cost in `note` if it's a pack
//   url       the product page
//   image     the product's main image URL (the page's og:image works)
//   shop      optional display name for the store, e.g. "Amazon"
//   note      optional one-liner (pack size, per-bag cost, colors)
//   checked   date the price was looked up

export type Gift = {
  id: string;
  category: string;
  name: string;
  price: string;
  url: string;
  image?: string;
  shop?: string;
  note?: string;
  checked?: string;
};

export const GIFTS: Gift[] = [];

/** Bags to fill: Tanya + 15 friends. */
export const BAGS = 16;
