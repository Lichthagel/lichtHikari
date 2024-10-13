import { customElement, noShadowDOM } from "solid-element";
import { Component, For, Show } from "solid-js";

import modules from "..";
import { activeModules, saveActiveModules, setActiveModules } from "../../global";
import { Module } from "../../module";
import styleText from "./style.css?inline";

type Props = object;

const toggleModule = (module: Module) => {
  setActiveModules((prev) => ({
    ...prev,
    [module.id]: !prev[module.id],
  }));
  saveActiveModules();
};

const Settings: Component<Props> = () => (
  <div class="licht-settings">
    <h2>lichtHikari</h2>
    <For each={modules}>
      {(module) => (
        <Show when={module.id !== "settings"}>
          <div
            class="button"
            classList={{ danger: activeModules[module.id] }}
            on:click={() => toggleModule(module)}
          >
            {module.id}
          </div>
        </Show>
      )}
    </For>
  </div>
);

export default Settings;

export const defineSettingsElement = () => {
  customElement<Props>("licht-settings", { dataAttrName: null }, (props) => {
    noShadowDOM();

    return (
      <>
        <style>{styleText}</style>
        <Settings {...props} />
      </>
    );
  });
};

export type SettingsElement = HTMLElement & Props;