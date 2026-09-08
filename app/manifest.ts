import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** ホーム画面に追加したときのアプリ情報（PWA マニフェスト）。 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.fullName}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F5F7",
    theme_color: "#F4F5F7",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
