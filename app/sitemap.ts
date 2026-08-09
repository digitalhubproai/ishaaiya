import type { MetadataRoute } from "next";
import { MENU_ITEMS, DEALS, menuItemSlug, dealSlug } from "@/lib/data";

const BASE = "https://ishaaiya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...MENU_ITEMS.map((item) => ({
      url: `${BASE}/item/${menuItemSlug(item)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...DEALS.map((deal) => ({
      url: `${BASE}/item/${dealSlug(deal)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}