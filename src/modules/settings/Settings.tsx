import { customElement, noShadowDOM } from "solid-element";
import { type Component, For, Show } from "solid-js";

import modules from "..";
import { activeModules, saveActiveModules, setActiveModules } from "../../global";
import { type Module } from "../../module";
import styles from "./style.module.css";

type Props = object;

const toggleModule = (module: Module) => {
  setActiveModules((prev) => ({
    ...prev,
    [module.id]: !prev[module.id],
  }));
  saveActiveModules();
};

const Settings: Component<Props> = () => (
  <div class={styles.settings}>
    <h2>lichtHikari</h2>
    <For each={modules}>
      {(module) => (
        <Show when={module.id !== "settings"}>
          <div
            class="button"
            classList={{ danger: activeModules()[module.id] }}
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

    return <Settings {...props} />;
  });
};

export type SettingsElement = HTMLElement & Props;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLElementTagNameMap {
    "licht-settings": SettingsElement;
  }
}
