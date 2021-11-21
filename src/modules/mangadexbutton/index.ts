import { Module } from "../../module";
import { waitForElement } from "../../utils";
import MangaDexButtonDOM from "./dom";
import "./style.css";

async function launch(target: Element, mediaTitle: string, mediaId: string) {
  // load cache
  MangaDexButtonDOM.addTo(target, mediaTitle);
}

async function getNativeTitle(): Promise<string> {
  const target = await waitForElement((container) => {
    container.querySelectorAll(".sidebar .data-set").forEach(dataSet => {
      if (dataSet.children[0] && dataSet.children[0].textContent === "Native") {
        console.log(dataSet.children[1]);
        return dataSet.children[1];
      };
    });

    return null;
  });

  console.log(target);

  return target.textContent!;
}

async function getTitle(): Promise<string> {
  const target = await waitForElement((container) =>
    container.querySelector(".header .content h1")
  );

  return target.textContent!.slice(0, -1);
}

const mangadexbutton: Module = {
  id: "mangadexbutton",
  description: "Adds a MangaDex button to manga pages",
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
        return container.querySelector(".sidebar");
      });

      const title = await getTitle();

      if (mediaType === "manga" && loc === "") {
        MangaDexButtonDOM.clean(target);
        launch(target, title, mediaId);
      } else {
        MangaDexButtonDOM.clean(target);
      }
    }
  },
};

export default mangadexbutton;
