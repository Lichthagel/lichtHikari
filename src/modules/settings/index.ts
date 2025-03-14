import { type Module } from "../../module";
import { waitForElement } from "../../utils";
import { defineSettingsElement } from "./Settings";

defineSettingsElement();

const settings: Module = {
  id: "settings",
  description: "Shows userscript settings in Anilist App Settings",
  isDefault: true,
  urlMatch: (currentUrl: string) => /\/settings\/developer/.test(currentUrl),
  code: async () => {
    const target = await waitForElement((container) =>
      container.querySelector(".settings > .content"));

    if (!target.querySelector("licht-settings")) {
      const elemSettings = document.createElement("licht-settings");

      target.append(elemSettings);
    }
  },
};

export default settings;
