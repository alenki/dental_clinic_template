import type { NextConfig } from "next";

/**
 * The site has no server behind it — no route handlers, no server actions, no
 * runtime data. So it ships as a folder of static files, which is what reg.ru
 * shared hosting serves and the only thing every plan there can run.
 *
 * `npm run build` writes `out/`; upload its contents to `public_html`.
 */
const nextConfig: NextConfig = {
  output: "export",

  /* Directory-per-route (`about/index.html`) instead of `about.html`, so any
     web server resolves /about/ through its own DirectoryIndex. The flat
     alternative does not resolve at all without an .htaccess rewrite, and
     shared hosting is the wrong place to depend on one. */
  trailingSlash: true,

  images: {
    /* Image optimisation is a Node service, and a static export has no Node.
       Photographs arrive already sized and compressed by the Unsplash CDN
       through the query string in lib/images.ts. */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
