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

export const GIFTS: Gift[] = [
  {
    id: "bag-jute-tote-8pk",
    category: "Bags",
    name: "DEAYOU jute burlap tote bags, natural (8 pack)",
    price: "$22.99",
    url: "https://www.amazon.com/dp/B094V94T5K",
    image: "https://m.media-amazon.com/images/I/91usSLRNDeS._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "8 per pack, about $2.87 a bag. 2 packs cover all 16 ($45.98). Lined, 9.8 × 11.8 × 3.9 in.",
    checked: "Oct 30, 2026",
  },
  {
    id: "bag-custom-canvas-tote",
    category: "Bags",
    name: "H-DEWALL custom canvas tote, make your own design",
    price: "$12.95",
    url: "https://www.amazon.com/dp/B0FKJYXPRP?psc=1",
    image: "https://m.media-amazon.com/images/I/71-hI9mYhtL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "Per bag, customized with your design (style 6 shown). About $207 for 16.",
    checked: "Oct 30, 2026",
  },
];

/** Bags to fill: Tanya + 15 friends. */
export const BAGS = 16;
