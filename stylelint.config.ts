import type { Config } from "stylelint";

/**
 * Tailwind-aware Stylelint. Prettier runs on CSS in lint-staged after Stylelint
 * (stylelint-config-prettier is not used; it targets Stylelint <15 and conflicts with v17).
 */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
} satisfies Config;
