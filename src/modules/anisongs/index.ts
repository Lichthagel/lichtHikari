import localforage from "localforage";
import { Module } from "../../module";
import { waitForElement } from "../../utils";
import AnisongsAPI from "./api";
import AnisongsDOM from "./dom";
import { themes_to_data } from "./models";
import "./style.css";

const cacheTTL = 604800000;

async function launch(target: Element, mediaId: string) {
  // load cache
  const cache: any = await localforage.getItem(mediaId) || { time: 0 };

  // check if request needed
  if ((cache.time + cacheTTL) < +new Date()) {
    const themes = await AnisongsAPI.getThemes(mediaId);

    if (!themes) {
      console.log("lichtAnisongs: not found on AnimeThemes");
      return;
    }

    const data = themes_to_data(themes);

    await localforage.setItem(mediaId, data);

    AnisongsDOM.addTo(target, data);
  } else {
    console.log("lichtAnisongs: data in cache");

    AnisongsDOM.addTo(target, cache);
  }
}

const anisongs: Module = {
  id: "anisongs",
  description: "Adds songs from AnimeThemes.moe to Anime Pages",
  isDefault: true,
  urlMatch: (currentUrl: string, oldUrl: string) => {
    return /(anime|manga)\/([0-9]+)\/[^\/]*\/?(.*)/.test(currentUrl);
  },
  code: async () => {
    const pathname = window.location.pathname;

    const matches = pathname.match(/(anime|manga)\/([0-9]+)\/[^\/]*\/?(.*)/);

    if (matches) {
      const mediaType = matches[1];
      const mediaId = matches[2];
      const loc = matches[3];

      const target = await waitForElement((container) => {
        return container.querySelectorAll(".grid-section-wrap")[2];
      });

      if (mediaType === "anime" && loc === "") {
        AnisongsDOM.clean(target);
        launch(target, mediaId);
      } else {
        AnisongsDOM.clean(target);
      }
    }
  },
};

export default anisongs;
