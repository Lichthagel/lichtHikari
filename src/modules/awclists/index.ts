import { Module } from "../../module";
import { waitForElement } from "../../utils";
import AWCListsAPI from "./api";
import AWCListsDOM from "./dom";
import "./style.css";

async function launch(target: Element, mediaId: string) {
  // load cache
  const cache: string | null = sessionStorage.getItem(`lichtAWCLists${mediaId}`);

  // check if request needed
  if (cache) {
    console.log("lichtAWCLists: data in cache");

    AWCListsDOM.addTo(target, cache);
  } else {
    const lists = await AWCListsAPI.getListsString(Number.parseInt(mediaId));

    sessionStorage.setItem(`lichtAWCLists${mediaId}`, lists);

    AWCListsDOM.addTo(target, lists);
  }
}

const awclists: Module = {
  id: "awclists",
  description: "Displays AWC Lists on Anime Pages",
  isDefault: false,
  urlMatch: (currentUrl: string) => /(anime|manga)\/([0-9]+)\/[^/]*\/?(.*)/.test(currentUrl),
  code: async () => {
    const pathname = globalThis.location.pathname;

    const matches = pathname.match(/(anime|manga)\/([0-9]+)\/[^/]*\/?(.*)/);

    if (matches) {
      const mediaType = matches[1];
      const mediaId = matches[2];
      // const loc = matches[3];

      const target = await waitForElement((container) => container.querySelector(".sidebar > .data"));

      if (mediaType === "anime") {
        AWCListsDOM.clean(target);
        void launch(target, mediaId);
      } else {
        AWCListsDOM.clean(target);
      }
    }
  },
};

export default awclists;
