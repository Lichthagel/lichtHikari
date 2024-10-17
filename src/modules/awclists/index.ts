import { Module } from "../../module";
import { getDataAttrName, waitForElement } from "../../utils";
import { defineAwcListsElement } from "./AwcLists";

defineAwcListsElement();

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
      const targetChild = target.childElementCount > 0 ? target.children[0] : target;
      const dataAttrName = getDataAttrName(targetChild);

      for (const e of target.querySelectorAll("licht-awc-lists")) {
        e.remove();
      }

      if (mediaType !== "anime") {
        return;
      }

      const elemAwcLists = document.createElement("licht-awc-lists");

      elemAwcLists.mediaId = mediaId;
      elemAwcLists.dataAttrName = dataAttrName;

      target.append(elemAwcLists);
    }
  },
};

export default awclists;
