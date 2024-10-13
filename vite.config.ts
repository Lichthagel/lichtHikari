import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import monkey, { ViolentmonkeyUserScript } from "vite-plugin-monkey";
import solidPlugin from "vite-plugin-solid";

import meta from "./meta.json";

export default defineConfig({
  plugins: [
    solidPlugin(),
    monkey({
      entry: "src/index.user.ts",
      userscript: meta as ViolentmonkeyUserScript,
    }),
    icons({
      compiler: "solid",
    }),
  ],
});