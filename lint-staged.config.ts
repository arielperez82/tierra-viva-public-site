/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
import type { Configuration } from "lint-staged";
/**
 * When TS/JS/Astro files are staged: full-project type-check, then ESLint fix
 * and Prettier fix on staged files. Function form passes staged filenames to each fix command.
 */
const config: Configuration = {
  "*.{ts,tsx,js,jsx,mjs}": (filenames: readonly string[]) => [
    "pnpm check",
    `pnpm lint:fix ${filenames.join(" ")}`,
    `pnpm lint:format:fix ${filenames.join(" ")}`,
  ],
  "*.json": (filenames) => [`pnpm lint:format:fix ${filenames.join(" ")}`],
  "*.astro": (filenames: readonly string[]) => [
    "pnpm check",
    `pnpm lint:fix ${filenames.join(" ")}`,
    `pnpm lint:format:fix ${filenames.join(" ")}`,
  ],
  "*.md": (filenames) => [
    `pnpm lint:md:fix ${filenames.join(" ")}`,
    `pnpm lint:format:fix ${filenames.join(" ")}`,
  ],
  "*.css": (filenames: readonly string[]) => [
    `pnpm lint:css:fix ${filenames.join(" ")}`,
    `pnpm lint:format:fix ${filenames.join(" ")}`,
  ],
};

export default config;
