import type { NextConfig } from "next";

// Static-generation-friendly CSP: no per-request nonce (which would force
// dynamic rendering), so inline scripts (theme no-flash, analytics) rely on
// 'unsafe-inline'. Sources are still restricted to the hosts we actually use.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://static.hotjar.com https://script.hotjar.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.clarity.ms https://*.hotjar.com",
  "font-src 'self' https://*.hotjar.com",
  "connect-src 'self' blob: data: https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://*.hotjar.com https://api.github.com https://*.googleapis.com https://fcm.googleapis.com https://fcmregistrations.googleapis.com",
  "worker-src 'self' blob:",
  "frame-src 'self' https://vars.hotjar.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Static assets under /public are served with `max-age=0` by default, so
      // every repeat visit re-downloads ~19MB of GLB models. These filenames
      // aren't content-hashed, so this is a long max-age rather than
      // `immutable` — replacing a file propagates within the window, and a
      // hard refresh always bypasses it.
      {
        source: "/models/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" }, // 30d
        ],
      },
      {
        source: "/products/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" }, // 30d
        ],
      },
    ];
  },
};

export default nextConfig;
