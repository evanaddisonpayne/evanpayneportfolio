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
  {
    id: "towel-turkish-red-4pk",
    category: "Towel",
    name: "9Threads cotton Turkish beach towels, tomato red (4 pack)",
    price: "$22.95",
    url: "https://www.amazon.com/dp/B0D8H448Y8?th=1",
    image: "https://m.media-amazon.com/images/I/71R8U5UFl1L._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "4 per pack, about $5.74 a towel. 4 packs cover all 16 ($91.80). Oversized 36 × 72 in, quick dry.",
    checked: "Oct 30, 2026",
  },
  {
    id: "towel-wetcat-turkish-blue",
    category: "Towel",
    name: "WETCAT Turkish beach towel, dark blue",
    price: "$27.20",
    url: "https://www.amazon.com/dp/B07MKRD54F",
    image: "https://m.media-amazon.com/images/I/91Xm62WYlbL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "Per towel, 100% Turkish cotton, 38 × 71 in, sand-free. About $435 for 16.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-neutrogena-wipes",
    category: "Misc",
    name: "Neutrogena makeup remover towelettes, individually wrapped (20 ct)",
    price: "$6.99",
    url: "https://www.amazon.com/dp/B07GKVBQDG",
    image: "https://m.media-amazon.com/images/I/71XBVncqBGL._SL1500_.jpg",
    shop: "Amazon",
    note: "20 singles, about $0.35 each. One box gives every bag one; 2 boxes ($13.98) for two each.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-acetaminophen-packets",
    category: "Misc",
    name: "Amazon Basic Care extra strength acetaminophen, 2-caplet packets (50 ct)",
    price: "$7.19",
    url: "https://www.amazon.com/dp/B087D3SML2?psc=1",
    image: "https://m.media-amazon.com/images/I/71DU6ladRfL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "50 travel packets of 2 caplets. One box covers 3 packets per bag.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-waterboy-electrolytes",
    category: "Misc",
    name: "WaterBoy Weekend Recovery electrolytes, sugar free, variety (12 ct)",
    price: "$23.74",
    url: "https://www.amazon.com/dp/B0FKL2M4GH?psc=1",
    image: "https://m.media-amazon.com/images/I/81-OwAhdQQL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "12 sticks, about $1.98 each. 2 boxes ($47.48) give every bag one.",
    checked: "Oct 30, 2026",
  },
];

/** Bags to fill: Tanya + 15 friends. */
export const BAGS = 16;
