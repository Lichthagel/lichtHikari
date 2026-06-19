import { type Module } from "../../module";
import { getDataAttrName, waitForElement } from "../../utils";
import { defineAwcButtonElement } from "./AwcButton";

// eslint-disable-next-line unicorn/no-top-level-side-effects
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

    const target = await waitForElement((container) => container.querySelector(":scope .banner-content > .actions"));
    const dataAttrName = getDataAttrName(target);

    for (const e of target.querySelectorAll(":scope licht-awc-button")) {
      e.remove();
    }

    const elemAwcButton = document.createElement("licht-awc-button");

    elemAwcButton.username = matches[1];
    elemAwcButton.dataAttrName = dataAttrName;

    if (target.children.length === 0) {
      target.append(elemAwcButton);
    } else {
      target.insertBefore(
        elemAwcButton,
        target.firstElementChild,
      );
    }
  },
};

export default awcbutton;
