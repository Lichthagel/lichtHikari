import { createSignal } from "solid-js";

import modules from "./modules";

type Config = Record<string, boolean>;

function loadActiveModules(): Config {
  const stored = localStorage.getItem("lichtActiveModules");

  const config: Config = stored ? JSON.parse(stored) as Config : {}; // TODO validate

  for (const module of modules) {
    if (config[module.id] === undefined) {
      config[module.id] = module.isDefault;
    }
  }

  localStorage.setItem("lichtActiveModules", JSON.stringify(config));

  return config;
}

export const [activeModules, setActiveModules] = createSignal(loadActiveModules());

export function saveActiveModules() {
  localStorage.setItem("lichtActiveModules", JSON.stringify(activeModules()));
}
