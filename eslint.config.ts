import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      "**/.astro/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/test-reports/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked.flat().map((c) => ({
    ...c,
    files: ["src/**/*.ts", "src/**/*.tsx"],
  })),
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir,
      },
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    ...jsxA11y.flatConfigs.recommended,
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
      },
    },
  },
];
