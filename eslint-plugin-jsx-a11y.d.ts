declare module "eslint-plugin-jsx-a11y" {
  import type { Linter } from "eslint";

  const plugin: {
    flatConfigs: {
      recommended: Linter.FlatConfig;
      strict: Linter.FlatConfig;
    };
  };
  export default plugin;
}
