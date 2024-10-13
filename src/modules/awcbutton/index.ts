import { Module } from "../../module";
import { waitForElement } from "../../utils";
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

    const actionsEl = await waitForElement((container) => container.querySelector(".banner-content > .actions"));

    for (const e of actionsEl.querySelectorAll("licht-awc-button")) {
      e.remove();
    }

    const elemAwcButton = document.createElement("licht-awc-button") as AwcButtonElement;

    elemAwcButton.username = matches[1];

    if (actionsEl.children.length === 0) {
      actionsEl.append(elemAwcButton);
    } else {
      actionsEl.insertBefore(
        elemAwcButton,
        actionsEl.children[0],
      );
    }
  },
};

export default awcbutton;
