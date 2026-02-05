import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintPluginAstro from "eslint-plugin-astro";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default [
  { ignores: ["**/dist/**", "**/.astro/**", "**/node_modules/**"] },
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
  ...eslintPluginAstro.configs.recommended,
];
