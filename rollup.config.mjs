import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";
import userscriptMeta from "rollup-plugin-userscript-metablock";

export default defineConfig({
  input: "src/index.user.ts",
  plugins: [
    typescript(),
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
