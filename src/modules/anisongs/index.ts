import type { Module } from "../../module";

import { waitForElement } from "../../utils";
import { defineAnisongsElement } from "./components/Anisongs";

// eslint-disable-next-line unicorn/no-top-level-side-effects
defineAnisongsElement();

const anisongs: Module = {
  id: "anisongs",
  description: "Adds songs from AnimeThemes.moe to Anime Pages",
  isDefault: true,
  urlMatch: (currentUrl: string) => /(anime|manga)\/([0-9]+)\/[^/]*\/?(.*)/.test(currentUrl),
  code: async () => {
    const pathname = globalThis.location.pathname;

    const matches = pathname.match(/(anime|manga)\/([0-9]+)\/[^/]*\/?(.*)/);

    if (matches) {
      const mediaType = matches[1];
      const mediaId = matches[2];
      const loc = matches[3];

      const target = await waitForElement((container) => container.querySelectorAll(":scope .grid-section-wrap")[2]);

      for (const e of target.querySelectorAll(":scope licht-anisongs")) {
        e.remove();
      }

      if (mediaType === "anime" && loc === "") {
        const anisongsElement = document.createElement("licht-anisongs");

        anisongsElement.mediaId = mediaId;
        anisongsElement.style.gridColumn = "span 2";

        target.insertBefore(anisongsElement, target.firstElementChild);
      }
    }
  },
};

export default anisongs;
