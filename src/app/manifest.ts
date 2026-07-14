import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Utkarsh — Full-Stack Developer & Product Engineer",
    short_name: "Utkarsh",
    description:
      "Full-stack developer and product engineer — designing, building, and shipping products end to end.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#090d19",
    theme_color: "#6366f1",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { src: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
