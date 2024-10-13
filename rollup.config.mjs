import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";
import userscriptMeta from "rollup-plugin-userscript-metablock";

export default defineConfig({
  input: "src/index.user.ts",
  plugins: [
    babel({
      extensions: [
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
      ],
      babelHelpers: "bundled",
      presets: ["babel-preset-solid"],
    }),
    typescript(),
    nodeResolve(),
    postcss(),
    userscriptMeta({
      file: "meta.json",
    }),
  ],
  output: {
    format: "iife",
    file: "dist/lichtHikari.user.js",
  },
});
