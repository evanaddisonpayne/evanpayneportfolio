export const site = {
  name: "Evan Addison Payne",
  title: "Director, Brand & Growth Strategy",
  city: "Chicago, IL",
  coords: "41.8923° N   ·   87.6354° W",
  // Set these in Vercel → Project → Environment Variables (see .env.example).
  // LinkedIn links stay hidden until they are set, so nothing on the site points nowhere.
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  newsletter: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
};

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];
