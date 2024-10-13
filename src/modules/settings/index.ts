import { Module } from "../../module";
import { waitForElement } from "../../utils";
import { defineSettingsElement, SettingsElement } from "./Settings";

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
      const elemSettings = document.createElement("licht-settings") as SettingsElement;

      target.append(elemSettings);
    }
  },
};

export default settings;
