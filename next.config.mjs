/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The /amsterdam trip page is private: tell crawlers not to index it.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/amsterdam", headers: noindex },
      { source: "/amsterdam/:path*", headers: noindex },
    ];
  },
};
export default nextConfig;
