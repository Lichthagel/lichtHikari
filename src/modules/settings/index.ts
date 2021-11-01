import { Module } from "../../module";
import { waitForElement } from "../../utils";
import SettingsDOM from "./dom";
import "./style.css";

const settings: Module = {
  id: "settings",
  description: "Shows userscript settings in Anilist App Settings",
  isDefault: true,
  urlMatch: (currentUrl: string, oldUrl: string) => {
    return /\/settings\/developer/.test(currentUrl);
  },
  code: async () => {
    const target = await waitForElement((container) =>
      container.querySelector(".settings > .content")
    );

    if (!target.querySelector(".lichtSettings")) {
      SettingsDOM.addTo(target);
    }
  },
};

export default settings;
