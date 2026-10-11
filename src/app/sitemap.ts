import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-11");

  return [
    { url: absoluteUrl("/"), lastModified },
    { url: absoluteUrl("/privacy"), lastModified },
    { url: absoluteUrl("/support"), lastModified },
    { url: absoluteUrl("/terms"), lastModified },
  ];
}
