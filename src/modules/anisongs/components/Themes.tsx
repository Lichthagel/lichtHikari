import { type Component, For, Show } from "solid-js";

import type { AnimeTheme } from "../models";

import Theme from "./Theme";

type Props = {
  themes: AnimeTheme[];
  heading: string;
};

const Themes: Component<Props> = (props) => (
  <div>
    <h2>{props.heading}</h2>
    <Show when={!props.themes || props.themes.length === 0}>
      <div>Nothing found</div>
    </Show>
    <For each={props.themes}>
      {(theme) => (
        <Theme theme={theme} />
      )}
    </For>
  </div>
);

export default Themes;
