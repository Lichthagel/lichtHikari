import { type Component, For, Show } from "solid-js";

import type { AnimeTheme } from "../models";

import Theme from "./Theme";

type Props = {
  themes: AnimeTheme[];
  heading: string;
};

const Themes: Component<Props> = ({ themes, heading }) => (
  <div class="lichtThemes">
    <h2>{heading}</h2>
    <Show when={!themes || themes.length === 0}>
      <div>Nothing found</div>
    </Show>
    <For each={themes}>
      {(theme) => (
        <Theme theme={theme} />
      )}
    </For>
  </div>
);

export default Themes;
