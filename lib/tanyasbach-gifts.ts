// Bach gift bag ideas for /tanyasbach-private ("Bach Gift Bags" section).
//
// HOW TO ADD AN ITEM: append to GIFTS. Categories show in the order they first appear here, so keep items grouped by category.
//   id        short, lowercase, hyphenated, unique. Tanya's reaction is saved under it, so never rename or reuse one.
//   category  one of: Bags, Towel, Hat, Sun & beach, Morning after, Party games (or a new one). Same spelling = same group.
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
    id: "hat-custom-trucker-red",
    category: "Hat",
    name: "Custom embroidered two-tone trucker hat, red/natural",
    price: "$28.99",
    url: "https://www.amazon.com/dp/B0GPB5CK1W?th=1",
    image: "https://m.media-amazon.com/images/I/71LrKPoy+aL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "Per hat, your text embroidered (upside-down style). Adjustable snapback. About $464 for 16.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-vacation-spf50-minis",
    category: "Sun & beach",
    name: "Vacation Mini Classic SPF 50 sunscreen spray, 1.7 oz (6 pack)",
    price: "$42.00",
    url: "https://www.amazon.com/dp/B0FL4RX21R?psc=1",
    image: "https://m.media-amazon.com/images/I/71CMKp6jN+L._SL1500_.jpg",
    shop: "Amazon",
    note: "6 travel sprays, $7 each. 3 packs ($126) cover all 16 with 2 spare.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-mini-fans-6pk",
    category: "Sun & beach",
    name: "Rossesay mini handheld fans, rechargeable, blue (6 pack)",
    price: "$26.99",
    url: "https://www.amazon.com/dp/B0D7PSZP8B",
    image: "https://m.media-amazon.com/images/I/71w6Uv+FSFL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "6 fans, about $4.50 each, 3 speeds. 3 packs ($80.97) cover all 16 with 2 spare.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-spf30-lip-balm-40pk",
    category: "Sun & beach",
    name: "SPF 30 sunscreen lip balm, 10 flavors (40 pack)",
    price: "$17.99",
    url: "https://www.amazon.com/dp/B0GG3J5L6H?psc=1",
    image: "https://m.media-amazon.com/images/I/61ojGS7NwUL._SL1500_.jpg",
    shop: "Amazon",
    note: "40 balms, about $0.45 each, clear. One pack gives every bag 2, with 8 spare.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-aloe-gel-packets",
    category: "Sun & beach",
    name: "KONEUK aloe vera gel packets (200 pack)",
    price: "$29.15",
    url: "https://www.amazon.com/dp/B0DSZHG378",
    image: "https://m.media-amazon.com/images/I/71g4CgAIstL._SL1500_.jpg",
    shop: "Amazon",
    note: "200 single-use packets, about $0.15 each. Way more than 16 bags need (12 each); look for a smaller pack.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-mifoci-water-bottles-20pk",
    category: "Sun & beach",
    name: "Mifoci reusable water bottles, 17 oz, assorted colors (20 pack)",
    price: "$34.99",
    url: "https://www.amazon.com/dp/B0DCBPJCFD?th=1",
    image: "https://m.media-amazon.com/images/I/71huHvtIfFL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "20 flip-top bottles, about $1.75 each, in pink, rose, yellow, green and sky blue. One pack covers all 16 with 4 spare.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-neutrogena-wipes",
    category: "Morning after",
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
    category: "Morning after",
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
    category: "Morning after",
    name: "WaterBoy Weekend Recovery electrolytes, sugar free, variety (12 ct)",
    price: "$23.74",
    url: "https://www.amazon.com/dp/B0FKL2M4GH?psc=1",
    image: "https://m.media-amazon.com/images/I/81-OwAhdQQL._AC_SL1500_.jpg",
    shop: "Amazon",
    note: "12 sticks, about $1.98 each. 2 boxes ($47.48) give every bag one.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-grace-stella-eye-patches",
    category: "Morning after",
    name: "grace & stella under-eye patches, gold (6 pairs)",
    price: "$9.86",
    url: "https://www.amazon.com/dp/B0C4G1YZY4?th=1",
    image: "https://m.media-amazon.com/images/I/71R0OnwZsaL._SL1500_.jpg",
    shop: "Amazon",
    note: "6 pairs, about $1.64 a pair. 3 packs ($29.58) give every bag a pair.",
    checked: "Oct 30, 2026",
  },
  {
    id: "misc-dare-scratch-cards",
    category: "Party games",
    name: "Bachelorette dare cards, scratch & reveal (20 cards)",
    price: "$9.99",
    url: "https://www.amazon.com/dp/B01EQ3U39O",
    image: "https://m.media-amazon.com/images/I/61-2CryqJ6L._AC_SL1000_.jpg",
    shop: "Amazon",
    note: "20 numbered dares with a key, so you can pull any too risqué. One pack gives every bag a card.",
    checked: "Oct 30, 2026",
  },
];

/** Bags to fill: Tanya + 15 friends. */
export const BAGS = 16;
