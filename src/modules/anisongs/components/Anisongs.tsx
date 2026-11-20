import { customElement, noShadowDOM } from "@solidjs/element";
import {
  type Component, createMemo, Errored, Loading, Show,
} from "solid-js";

import AnisongsAPI from "../api";
import { type AnisongsData, themes_to_data } from "../models";
import styles from "./style.module.css";
import Themes from "./Themes";

type Props = {
  mediaId: string | null;
};

const Anisongs: Component<Props> = (props) => {
  const data = createMemo(async () => {
    const mediaId = props.mediaId;
    if (!mediaId) {
      return;
    }

    const cache = sessionStorage.getItem(`lichtSong${mediaId}`);

    // check if request needed
    if (cache) {
      console.log("lichtAnisongs: data in cache");

      return JSON.parse(cache) as AnisongsData; // TODO validate
    }

    const themes = await AnisongsAPI.getThemes(mediaId);

    const data = themes_to_data(themes);

    sessionStorage.setItem(`lichtSong${mediaId}`, JSON.stringify(data));

    return data;
  });

  return (
    <Errored fallback={(error) => <div>{`Error: ${String(error())}`}</div>}>
      <Loading fallback={<div>Loading...</div>}>
        <Show when={data()}>
          {(result) => (
            <div class={styles.anisongs}>
              <Themes heading="Openings" themes={result().ops} />
              <Themes heading="Endings" themes={result().eds} />
            </div>
          )}
        </Show>
      </Loading>
    </Errored>
  );
};

export default Anisongs;

export type AnisongsElement = HTMLElement & Props;

export const defineAnisongsElement = () => {
  customElement<Props>("licht-anisongs", { mediaId: null }, (props) => {
    noShadowDOM();

    return <Anisongs {...props} />;
  });
};

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLElementTagNameMap {
    "licht-anisongs": AnisongsElement;
  }
}
