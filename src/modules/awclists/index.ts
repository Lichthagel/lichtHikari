import localforage from "localforage";
import { Module } from "../../module";
import { waitForElement } from "../../utils";
import AWCListsAPI from "./api";
import AWCListsDOM from "./dom";
import "./style.css";

const cacheTTL = 604800000;

async function launch(target: Element, mediaId: string) {
  // load cache
  const cache: any = await localforage.getItem("awclists" + mediaId) ||
    { time: 0 };

  // check if request needed
  if ((cache.time + cacheTTL) < +new Date()) {
    const lists = await AWCListsAPI.getLists(parseInt(mediaId));

    if (!lists) {
      console.log("lichtAWCLists: not found");
      return;
    }

    await localforage.setItem("awclists" + mediaId, lists);

    AWCListsDOM.addTo(target, lists);
  } else {
    console.log("lichtAnisongs: data in cache");

    AWCListsDOM.addTo(target, cache);
  }
}

const awclists: Module = {
  id: "awclists",
  description: "Displays AWC Lists on Anime Pages",
  isDefault: false,
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
        return container.querySelector(".sidebar > .data");
      });

      if (mediaType === "anime" && loc === "") {
        AWCListsDOM.clean(target);
        launch(target, mediaId);
      } else {
        AWCListsDOM.clean(target);
      }
    }
  },
};

export default awclists;
