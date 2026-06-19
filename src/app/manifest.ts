import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nodebase",
    short_name: "Nodebase",
    description: "The ultimate workflow automation platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/logos/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
