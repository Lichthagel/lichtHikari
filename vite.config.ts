import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import solidPlugin from "vite-plugin-solid";

import pkg from "./package.json";

export default defineConfig({
  plugins: [
    solidPlugin(),
    monkey({
      entry: "src/index.user.ts",
      userscript: {
        name: pkg.name,
        namespace: `${pkg.author}/${pkg.name}`,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        homepageURL: pkg.repository.url.replace("git+", "").replace(".git", ""),
        supportURL: pkg.bugs.url,
        downloadURL: "https://lichthagel.github.io/lichtHikari/lichtHikari.user.js",
        updateURL: "https://lichthagel.github.io/lichtHikari/lichtHikari.user.js",
        license: pkg.license,
        match: ["*://anilist.co/*"],
      },
    }),
    icons({
      compiler: "solid",
    }),
  ],
});
