import { type Module } from "../../module";
import { waitForElement } from "../../utils";
import { defineSettingsElement } from "./Settings";

// eslint-disable-next-line unicorn/no-top-level-side-effects
defineSettingsElement();

const settings: Module = {
  id: "settings",
  description: "Shows userscript settings in Anilist App Settings",
  isDefault: true,
  urlMatch: (currentUrl: string) => /\/settings\/developer/.test(currentUrl),
  code: async () => {
    const target = await waitForElement((container) =>
      container.querySelector(":scope .settings > .content"));

    if (!target.querySelector(":scope licht-settings")) {
      const elemSettings = document.createElement("licht-settings");

      target.append(elemSettings);
    }
  },
};

export default settings;
