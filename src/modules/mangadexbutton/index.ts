import { Module } from "../../module";
import { getDataAttrName, waitForElement } from "../../utils";
import { defineMangadexButtonElement, MangadexButtonElement } from "./MangadexButton";

defineMangadexButtonElement();

async function getNativeTitle(): Promise<string> {
  const target = await waitForElement((container) => {
    for (const dataSet of container.querySelectorAll(".sidebar .data-set")) {
      if (dataSet.children[0] && dataSet.children[0].textContent === "Native") {
        console.log(dataSet.children[1]);
        return dataSet.children[1];
      }
    }

    return null;
  });

  console.log(target);

  return target.textContent!;
}

// async function getTitle(): Promise<string> {
//   const target = await waitForElement((container) =>
//     container.querySelector(".header .content h1"));

//   return target.textContent!.slice(0, -1);
// }

const mangadexbutton: Module = {
  id: "mangadexbutton",
  description: "Adds a MangaDex button to manga pages",
  isDefault: true,
  urlMatch: (currentUrl: string) => /(anime|manga)\/([0-9]+)\/[^/]*\/?(.*)/.test(currentUrl),
  code: async () => {
    const pathname = globalThis.location.pathname;

    const matches = pathname.match(/(anime|manga)\/([0-9]+)\/[^/]*\/?(.*)/);

    if (!matches) {
      return;
    }
    const mediaType = matches[1];
    const mediaId = matches[2];
    // const loc = matches[3];

    const target = await waitForElement((container) => container.querySelector(".external-links-wrap"));

    for (const e of target.querySelectorAll("licht-mangadex-button")) {
      e.remove();
    }

    const title = await getNativeTitle();
    const dataAttrName = getDataAttrName(target);

    console.log(target.attributes);

    if (mediaType === "manga") {
      const elemMangadexButton = document.createElement("licht-mangadex-button") as MangadexButtonElement;

      elemMangadexButton.title = title;
      elemMangadexButton.mediaId = mediaId;
      elemMangadexButton.dataAttrName = dataAttrName;

      target.append(elemMangadexButton);
    }
  },
};

export default mangadexbutton;
