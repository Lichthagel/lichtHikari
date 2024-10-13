import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(),
    monkey({
      entry: "src/index.user.ts",
      build: {
        fileName: "lichtHikari.user.js",
      },
      userscript: {
        name: "lichtHikari",
        namespace: `Lichthagel/lichtHikari`,
        downloadURL: "https://lichthagel.github.io/lichtHikari/lichtHikari.user.js",
        updateURL: "https://lichthagel.github.io/lichtHikari/lichtHikari.user.js",
        match: ["*://anilist.co/*"],
      },
    }),
    icons({
      compiler: "solid",
    }),
  ],
});
