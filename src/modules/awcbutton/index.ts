import { Module } from "../../module";
import { waitForElement } from "../../utils";
import { createAWCButton } from "./dom";

import "./style.css";

const awcbutton: Module = {
  id: "awcbutton",
  description: "Add an AWC Button to the right of usernames on profile pages",
  isDefault: false,
  urlMatch: (currentUrl: string, oldUrl: string) => {
    return /\/user\/[^\/]*\/?/.test(currentUrl);
  },
  code: async () => {
    const matches = window.location.pathname.match(/\/user\/([^\/]*)\/?/);

    if (!matches) {
      return;
    }

    const actionsEl = await waitForElement((container) => {
      return container.querySelector(".banner-content > .actions");
    });

    for (let button of actionsEl.getElementsByClassName("lichtAWCButton")) {
      button.remove();
    }

    if (actionsEl.children.length == 0) {
      actionsEl.append(createAWCButton(matches[1]));
    } else {
      actionsEl.insertBefore(
        createAWCButton(matches[1]),
        actionsEl.children[0],
      );
    }
  },
};

export default awcbutton;
