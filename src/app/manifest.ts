import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Join Giddens",
    short_name: "Join Giddens",
    description:
      "Explore a performance-based life insurance career with structured training, remote flexibility, leadership development, and uncapped earning potential.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
  };
}
