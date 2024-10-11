// @ts-check
import lichthagel from "@lichthagel/eslint-config";

/** @type {import("@lichthagel/eslint-config").FlatConfigItem[]} */
export default [
  ...(await lichthagel({
    typescript: true,
  })),
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  {
    ignores: ["dist/**/*", "webpack.config.js"],
  },
];
