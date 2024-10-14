import { type Component, For, Show } from "solid-js";

import { type AnimeTheme, artist_to_string } from "../models";
import styles from "./style.module.css";
import ThemeEntry from "./ThemeEntry";

type Props = {
  theme: AnimeTheme;
};

const Theme: Component<Props> = (props) => (
  <div class={styles.theme}>
    <div class={styles.heading}>
      <span class={styles.slug}>{props.theme.slug}</span>
      <span>{props.theme.song.title}</span>
    </div>
    <Show when={props.theme.group}>
      <div><b>{props.theme.group}</b></div>
    </Show>
    <Show when={props.theme.song.artists && props.theme.song.artists.length > 0}>
      <div>
        <b>Artist(s):</b>
        {" "}
        {props.theme.song.artists!.map((artist) => artist_to_string(artist)).join(", ")}
      </div>
    </Show>
    <For each={props.theme.animethemeentries}>
      {(entry) => (
        <ThemeEntry entry={entry} />
      )}
    </For>
  </div>
);

export default Theme;
