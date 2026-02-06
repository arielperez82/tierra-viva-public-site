import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  site: "https://tierraviva.github.io",
  base: "/tierra-viva-public-site/",

  vite: {
    plugins: [tailwindcss()],
  },
});
