import { type Component, Show } from "solid-js";

import type { AnimeThemeEntry } from "../models";

import Videos from "./Videos";

type Props = {
  entry: AnimeThemeEntry;
};

const ThemeEntry: Component<Props> = ({ entry }) => (
  <div class="theme-entry">
    <Show when={entry.version}>
      <div class="tag">{`v${entry.version}`}</div>
    </Show>
    <Show when={entry.episodes}>
      <div class="tag">{`Episode(s): ${entry.episodes}`}</div>
    </Show>
    <Show when={entry.nsfw}>
      <div class="tag">NSFW</div>
    </Show>
    <Show when={entry.spoiler}>
      <div class="tag">Spoiler</div>
    </Show>
    <Videos videos={entry.videos} />
  </div>
);

export default ThemeEntry;
