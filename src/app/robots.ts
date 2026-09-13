import type { MetadataRoute } from "next";

const host = (process.env.NEXT_PUBLIC_APP_URL || "https://thelifestylefresh.com").replace(
  /\/$/,
  "",
);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/account", "/login", "/join/success", "/api/"],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
