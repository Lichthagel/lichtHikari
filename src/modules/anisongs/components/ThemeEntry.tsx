import { type Component, Show } from "solid-js";

import type { AnimeThemeEntry } from "../models";

import styles from "./style.module.css";
import Videos from "./Videos";

type Props = {
  entry: AnimeThemeEntry;
};

const ThemeEntry: Component<Props> = (props) => (
  <div class={styles.themeEntry}>
    <Show when={props.entry.version}>
      <div class={styles.tag}>{`v${props.entry.version}`}</div>
    </Show>
    <Show when={props.entry.episodes}>
      <div class={styles.tag}>{`Episode(s): ${props.entry.episodes}`}</div>
    </Show>
    <Show when={props.entry.nsfw}>
      <div class={styles.tag}>NSFW</div>
    </Show>
    <Show when={props.entry.spoiler}>
      <div class={styles.tag}>Spoiler</div>
    </Show>
    <Videos videos={props.entry.videos} />
  </div>
);

export default ThemeEntry;
