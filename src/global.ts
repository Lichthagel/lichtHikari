import localforage from "localforage";
import modules from "./modules";

localforage.config({
  name: "lichtHikari",
});

function loadActiveModules(): { [k: string]: boolean } {
  const stored = localStorage.getItem("lichtActiveModules");

  let config = stored ? JSON.parse(stored) : {};

  modules.forEach((module) => {
    if (config[module.id] === undefined) {
      config[module.id] = module.isDefault;
    }
  });

  localStorage.setItem("lichtActiveModules", JSON.stringify(config));

  return config;
}

export function saveActiveModules() {
  localStorage.setItem("lichtActiveModules", JSON.stringify(useScripts));
}

export let useScripts = loadActiveModules();
