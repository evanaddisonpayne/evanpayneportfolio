/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The /amsterdam, /christmas2026, /tanyasbach and /virgincruise trip pages are private: tell crawlers not to index them.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/amsterdam", headers: noindex },
      { source: "/amsterdam/:path*", headers: noindex },
      { source: "/christmas2026", headers: noindex },
      { source: "/christmas2026/:path*", headers: noindex },
      { source: "/tanyasbach", headers: noindex },
      { source: "/tanyasbach/:path*", headers: noindex },
      { source: "/virgincruise", headers: noindex },
      { source: "/virgincruise/:path*", headers: noindex },
    ];
  },
};
export default nextConfig;
