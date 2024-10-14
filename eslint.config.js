// @ts-check
import lichthagel from "@lichthagel/eslint-config";

/** @type {import("@lichthagel/eslint-config").FlatConfigItem[]} */
export default [
  ...(await lichthagel({
    solid: true,
    typescript: true,
  })),
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "no-console": "off", // TODO improve logging
    },
  },
  {
    ignores: ["dist/**/*"],
  },
];
