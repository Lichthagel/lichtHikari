import { type Component, For, Show } from "solid-js";

import { type AnimeTheme, artist_to_string } from "../models";
import styles from "./style.module.css";
import ThemeEntry from "./ThemeEntry";

type Props = {
  theme: AnimeTheme;
};

const Theme: Component<Props> = ({ theme }) => (
  <div class={styles.theme}>
    <div class={styles.heading}>
      <span class={styles.slug}>{theme.slug}</span>
      <span>{theme.song.title}</span>
    </div>
    <Show when={theme.group}>
      <div><b>{theme.group}</b></div>
    </Show>
    <Show when={theme.song.artists && theme.song.artists.length > 0}>
      <div>
        <b>Artist(s):</b>
        {" "}
        {theme.song.artists!.map((artist) => artist_to_string(artist)).join(", ")}
      </div>
    </Show>
    <For each={theme.animethemeentries}>
      {(entry) => (
        <ThemeEntry entry={entry} />
      )}
    </For>
  </div>
);

export default Theme;
