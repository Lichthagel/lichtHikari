import { Module } from "../../module";
import { getDataAttrName, waitForElement } from "../../utils";
import { AwcButtonElement, defineAwcButtonElement } from "./AwcButton";

defineAwcButtonElement();

const awcbutton: Module = {
  id: "awcbutton",
  description: "Add an AWC Button to the right of usernames on profile pages",
  isDefault: false,
  urlMatch: (currentUrl: string) => /\/user\/[^/]*\/?/.test(currentUrl),
  code: async () => {
    const matches = globalThis.location.pathname.match(/\/user\/([^/]*)\/?/);

    if (!matches) {
      return;
    }

    const target = await waitForElement((container) => container.querySelector(".banner-content > .actions"));
    const dataAttrName = getDataAttrName(target);

    for (const e of target.querySelectorAll("licht-awc-button")) {
      e.remove();
    }

    const elemAwcButton = document.createElement("licht-awc-button") as AwcButtonElement;

    elemAwcButton.username = matches[1];
    elemAwcButton.dataAttrName = dataAttrName;

    if (target.children.length === 0) {
      target.append(elemAwcButton);
    } else {
      target.insertBefore(
        elemAwcButton,
        target.children[0],
      );
    }
  },
};

export default awcbutton;
