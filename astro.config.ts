import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const getSite = () =>
  process.env.ASTRO_SITE?.trim() || "https://arielperez82.github.io";

const getBase = () =>
  process.env.ASTRO_BASE?.trim() || "/tierra-viva-public-site/";

export default defineConfig({
  output: "static",
  site: getSite(),
  base: getBase(),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
