import modules from "..";
import { saveActiveModules, useScripts } from "../../global";
import { Module } from "../../module";

const SettingsDOM = {
  createModuleToggle(module: Module): Element {
    const moduleToggle = document.createElement("div");
    moduleToggle.classList.add("lichtSettingButton");
    if (useScripts[module.id]) {
      moduleToggle.classList.add("lichtActive");
    }
    moduleToggle.innerText = module.id;

    moduleToggle.addEventListener("click", () => {
      useScripts[module.id] = !useScripts[module.id];
      saveActiveModules();
      if (useScripts[module.id]) {
        moduleToggle.classList.add("lichtActive");
      } else {
        moduleToggle.classList.remove("lichtActive");
      }
    });

    return moduleToggle;
  },

  createSettingsContainer(): Element {
    const container = document.createElement("div");
    container.classList.add("lichtSettings");

    const heading = document.createElement("h2");
    heading.innerText = "lichtHikari";

    container.appendChild(heading);

    modules.forEach((module) => {
      container.appendChild(this.createModuleToggle(module));
    });

    return container;
  },

  addTo(target: Element) {
    target.appendChild(this.createSettingsContainer());
  },
};

export default SettingsDOM;
