import { createEffect, createRoot, createSignal } from "solid-js";

import modules from "./modules";

type Config = { [key: string]: boolean };

const storageKey = "lichtActiveModules";

function loadActiveModules(): Config {
  const stored = localStorage.getItem(storageKey);

  const config: Config = stored ? JSON.parse(stored) as Config : {}; // TODO validate

  for (const module of modules) {
    if (config[module.id] === undefined) {
      config[module.id] = module.isDefault;
    }
  }

  return config;
}

export const [activeModules, setActiveModules] = createRoot(() => {
  const state = createSignal(loadActiveModules());

  createEffect(state[0], (config) => {
    localStorage.setItem(storageKey, JSON.stringify(config));
  });

  return state;
});
