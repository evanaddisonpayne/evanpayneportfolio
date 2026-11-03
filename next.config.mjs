/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The /amsterdam, /christmas2026, /tanyasbach, /tanyasbach-private and /turkscaicos trip pages are private: tell crawlers not to index them.
  // The /tanyasbach results page was taken down (Nov 2, 2026); send old links to the trip home page.
  async redirects() {
    return [{ source: "/tanyasbach/results", destination: "/tanyasbach", permanent: false }];
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/amsterdam", headers: noindex },
      { source: "/amsterdam/:path*", headers: noindex },
      { source: "/christmas2026", headers: noindex },
      { source: "/christmas2026/:path*", headers: noindex },
      { source: "/tanyasbach", headers: noindex },
      { source: "/tanyasbach/:path*", headers: noindex },
      { source: "/tanyasbach-private", headers: noindex },
      { source: "/tanyasbach-private/:path*", headers: noindex },
      { source: "/turkscaicos", headers: noindex },
      { source: "/turkscaicos/:path*", headers: noindex },
    ];
  },
};
export default nextConfig;
