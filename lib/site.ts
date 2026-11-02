export const site = {
  name: "Evan Addison Payne",
  title: "Director, Brand & Growth Strategy",
  city: "Chicago, IL",
  coords: "41.8923° N   ·   87.6354° W",
  // Optional overrides in Vercel → Project → Environment Variables (see .env.example).
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/evanaddison/",
  newsletter: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
};

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];
