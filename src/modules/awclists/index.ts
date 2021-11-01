import { Module } from "../../module";
import { waitForElement } from "../../utils";
import AWCListsAPI from "./api";
import AWCListsDOM from "./dom";
import "./style.css";

async function launch(target: Element, mediaId: string) {
  // load cache
  const cache: string | null = sessionStorage.getItem("lichtAWCLists" + mediaId);

  // check if request needed
  if (!cache) {
    const lists = await AWCListsAPI.getListsString(parseInt(mediaId));

    sessionStorage.setItem("lichtAWCLists" + mediaId, lists);

    AWCListsDOM.addTo(target, lists);
  } else {
    console.log("lichtAWCLists: data in cache");

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
