import { type Component, Show } from "solid-js";

import type { AnimeThemeEntry } from "../models";

import styles from "./style.module.css";
import Videos from "./Videos";

type Props = {
  entry: AnimeThemeEntry;
};

const ThemeEntry: Component<Props> = ({ entry }) => (
  <div class={styles.themeEntry}>
    <Show when={entry.version}>
      <div class={styles.tag}>{`v${entry.version}`}</div>
    </Show>
    <Show when={entry.episodes}>
      <div class={styles.tag}>{`Episode(s): ${entry.episodes}`}</div>
    </Show>
    <Show when={entry.nsfw}>
      <div class={styles.tag}>NSFW</div>
    </Show>
    <Show when={entry.spoiler}>
      <div class={styles.tag}>Spoiler</div>
    </Show>
    <Videos videos={entry.videos} />
  </div>
);

export default ThemeEntry;
